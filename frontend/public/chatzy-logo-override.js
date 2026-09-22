/*
 * JIYA branding override for the Chatzy chat-widget launcher.
 *
 * The Chatzy widget renders its launcher inside an OPEN shadow DOM on
 * #chatzy-shadow-host. IMPORTANT: the widget attaches the launcher's
 * click handler INSIDE the <img>'s own `onload` handler, so mutating
 * that <img> (e.g. swapping its src) re-fires `onload` and stacks a
 * SECOND click listener — every click then toggles the chat open AND
 * closed again, which looks like "clicking does nothing".
 *
 * This script therefore NEVER mutates the widget's DOM nodes. It only
 * injects a stylesheet into the shadow root that paints the launcher
 * button with the in-house "JIYA" avatar and hides the original <img>
 * served by Chatzy. All click behaviour is left entirely to the widget.
 *
 * To change the icon permanently at the source, upload the same image in
 * the Chatzy dashboard (Bot Interface settings).
 */
(function () {
  "use strict";

  var STYLE_ATTR = "data-jiya-style";
  var JIYA_CSS =
    ".chatzy-chatbot-icon {" +
    "background-image: url('/images/jiya-avatar.svg') !important;" +
    "background-size: cover !important;" +
    "background-position: center !important;" +
    "background-repeat: no-repeat !important;" +
    "}" +
    ".chatzy-chatbot-icon img { display: none !important; }";

  function injectStyle(root) {
    if (!root || root.querySelector("style[" + STYLE_ATTR + "]")) return;
    try {
      var style = document.createElement("style");
      style.setAttribute(STYLE_ATTR, "1");
      style.textContent = JIYA_CSS;
      root.appendChild(style);

      var btn = root.querySelector(".chatzy-chatbot-icon");
      if (btn && !btn.getAttribute("aria-label")) {
        btn.setAttribute("aria-label", "Open the JIYA chat assistant");
        btn.setAttribute("title", "Chat with JIYA");
      }
    } catch (e) {
      /* shadow root not ready yet */
    }
  }

  function watchShadowRoot(root) {
    if (!root) return;
    injectStyle(root);
    try {
      new MutationObserver(function () {
        injectStyle(root);
      }).observe(root, { childList: true, subtree: true });
    } catch (e2) {
      /* ignore */
    }
  }

  function hostReady() {
    var host = document.getElementById("chatzy-shadow-host");
    return host && host.shadowRoot ? host.shadowRoot : null;
  }

  function waitForHost() {
    var root = hostReady();
    if (root) {
      watchShadowRoot(root);
      return true;
    }
    return false;
  }

  function start() {
    if (waitForHost()) return;

    if (document.body) {
      var bodyObserver = new MutationObserver(function () {
        if (waitForHost()) bodyObserver.disconnect();
      });
      bodyObserver.observe(document.body, { childList: true });
    }

    /* Safety-net polling in case the observer misses the host insertion */
    var tries = 0;
    var timer = setInterval(function () {
      if (waitForHost() || ++tries >= 150) clearInterval(timer);
    }, 200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
