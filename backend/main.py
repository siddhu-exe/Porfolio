"""FastAPI backend for the portfolio site.

Endpoints:
  GET  /api/projects  -> project data grouped by category
  POST /api/contact   -> validates + stubs a contact message (logs + local file)
"""

import json
import logging
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

from data import PROJECTS, SHELVES, _CATEGORIES

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("portfolio")

app = FastAPI(title="Siddharth Dongardive — Portfolio API", version="0.1.0")

# CORS for the Vite dev server (default 5173) + a couple of common fallbacks.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",  # vite preview
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONTACT_LOG = Path(__file__).parent / "contact_messages.jsonl"
CATEGORY_ORDER = [name for name, _sub, _items in _CATEGORIES]


class ContactMessage(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


@app.get("/api/projects")
def get_projects():
    """Return the flat project list plus a category-grouped view."""
    grouped = {cat: [] for cat in CATEGORY_ORDER}
    for p in PROJECTS:
        grouped.setdefault(p["category"], []).append(p)
    return {
        "categories": CATEGORY_ORDER,
        "shelves": SHELVES,
        "projects": PROJECTS,
        "grouped": grouped,
    }


@app.get("/api/projects/{slug}")
def get_project(slug: str):
    """Return a single project (full case-study detail) by slug."""
    for p in PROJECTS:
        if p["slug"] == slug:
            return p
    raise HTTPException(status_code=404, detail="Project not found")


@app.post("/api/contact")
def post_contact(msg: ContactMessage):
    """Stub the send/store: log it and append to a local JSONL file."""
    record = {
        "received_at": datetime.now(timezone.utc).isoformat(),
        **msg.model_dump(),
    }
    logger.info("New contact message from %s <%s>", msg.name, msg.email)
    with CONTACT_LOG.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(record) + "\n")
    return {"ok": True, "message": "Message received. Thanks for reaching out!"}


@app.get("/api/health")
def health():
    return {"status": "ok"}
