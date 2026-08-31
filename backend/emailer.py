import os
import re
import ipaddress
import logging
import httpx
from html.parser import HTMLParser
from urllib.parse import urlparse
from fastapi import HTTPException

logger = logging.getLogger(__name__)

# Resend Email API
RESEND_API_URL = "https://api.resend.com/emails"

# Read secrets/configuration from environment variables
RESEND_API_KEY = os.environ["RESEND_API_KEY"]
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "JiyaAI")
EMAIL_FROM_ADDRESS = os.environ["EMAIL_FROM_ADDRESS"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")


_SHORTENERS = (
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "is.gd",
    "cutt.ly",
    "goo.gl",
    "rebrand.ly",
)

_CRED_ASK = (
    "reply with your password",
    "reply with the code",
    "send your password",
    "cvv",
    "send us your password",
    "enter your password below",
    "confirm your card number",
    "your full card number",
    "seed phrase",
    "recovery phrase",
    "verify your card",
    "social security number",
    "confirm your bank details",
)

_HOSTISH = re.compile(
    r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})",
    re.I,
)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False

    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass

    return not any(
        host == s or host.endswith("." + s)
        for s in _SHORTENERS
    )


def _same_site(shown: str, real: str) -> bool:
    return (
        shown == real
        or real.endswith("." + shown)
        or shown.endswith("." + real)
    )


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = set()
        self.urls = []
        self.anchors = []
        self._href = None
        self._text = []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())

        self.urls += [
            value
            for key, value in attrs
            if key.lower() in ("href", "src") and value
        ]

        if tag.lower() == "a":
            self._href = dict(
                (key.lower(), value)
                for key, value in attrs
            ).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append(
                (self._href, "".join(self._text))
            )
            self._href = None
            self._text = []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)

    # Do not allow forms/input fields inside emails
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError(
            "No forms or input fields in email (G2)"
        )

    body = f"{subject}\n{html}".lower()

    # Prevent credential collection
    for phrase in _CRED_ASK:
        if phrase in body:
            raise ValueError(
                f"Email asks the recipient for credentials: "
                f"{phrase!r} (G2)"
            )

    # Validate URLs
    for url in scan.urls:
        low = url.strip().lower()

        if low.startswith(
            ("mailto:", "tel:", "cid:", "#")
        ):
            continue

        if not low.startswith("https://"):
            raise ValueError(
                f"Email links/assets must be absolute https: "
                f"{url!r} (G3)"
            )

        parsed = urlparse(low)
        host = parsed.hostname or ""

        if not _host_ok(host) or parsed.username is not None:
            raise ValueError(
                f"Shortened, numeric-host or "
                f"credential-bearing URL: {url!r} (G3)"
            )

    # Prevent misleading anchor text
    for href, text in scan.anchors:
        real = urlparse(
            href.strip().lower()
        ).hostname or ""

        if not real:
            continue

        for match in _HOSTISH.finditer(text):
            shown_host = match.group(1).lower()

            if not _same_site(shown_host, real):
                raise ValueError(
                    f"Anchor text {shown_host!r} != "
                    f"real link host {real!r} (G3)"
                )


async def send_email(
    *,
    to: str,
    subject: str,
    html: str,
    reply_to: str | None = None,
) -> str | None:

    # Keep existing email security validation
    _assert_safe_email(subject, html)

    payload = {
        "from": f"{EMAIL_FROM_NAME} <{EMAIL_FROM_ADDRESS}>",
        "to": [to],
        "subject": subject,
        "html": html,
    }

    final_reply_to = reply_to or EMAIL_REPLY_TO

    if final_reply_to:
        payload["reply_to"] = final_reply_to

    try:
        async with httpx.AsyncClient(
            timeout=30
        ) as client:

            response = await client.post(
                RESEND_API_URL,
                headers={
                    "Authorization": (
                        f"Bearer {RESEND_API_KEY}"
                    ),
                    "Content-Type": "application/json",
                },
                json=payload,
            )

        response.raise_for_status()

        result = response.json()

        logger.info(
            f"Email sent successfully to {to}"
        )

        return result.get("id")

    except httpx.HTTPStatusError as error:
        logger.error(
            "Resend email failed: "
            f"{error.response.status_code} "
            f"{error.response.text}"
        )

        raise HTTPException(
            status_code=502,
            detail="Failed to send email",
        )

    except Exception as error:
        logger.error(
            f"Email send error: {str(error)}"
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to send email",
        )