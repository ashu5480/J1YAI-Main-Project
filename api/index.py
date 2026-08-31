"""Vercel Python serverless entry point.

Vercel routes every `/api/*` request to this file. It exposes the existing
FastAPI application (defined in `backend/server.py`) as an ASGI `app`, which
the @vercel/python runtime serves directly. The backend directory is added to
the import path so `server` and `emailer` resolve unchanged.
"""

import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(BACKEND_DIR))

from server import app  # noqa: E402  (path setup must run first)

# Vercel's ASGI handler looks for a module-level `app`.
__all__ = ["app"]
