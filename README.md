# Siddharth Dongardive — Portfolio

An animated portfolio site for a Data Science / AI engineering student, styled
after [nithinmwarrier.com](https://www.nithinmwarrier.com/): a warm cream
dot-grid canvas framed by two full-height vertical hairlines, a self-drawing
signature intro, and a scroll-linked "Project Shelf" stage.

- **Frontend** — React 18 + Vite, Tailwind CSS, Framer Motion. See [`frontend/`](frontend/).
- **Backend** — FastAPI serving project data + a contact endpoint. See [`backend/`](backend/).

## Layout

```
Portfolio/
├── frontend/        # React + Vite app
│   ├── src/
│   │   ├── components/   # Hero, Signature, MenuPill, ProjectShelf, Book*, Footer, ContactModal…
│   │   ├── pages/        # Home, ProjectDetail
│   │   ├── data/         # fallback project data (used if the API is down)
│   │   └── api.js        # fetch helpers
│   └── …
└── backend/         # FastAPI app
    ├── main.py          # routes + CORS
    └── data.py          # seed projects (2 per category, 10 total)
```

## Running both

Open two terminals.

### 1. Backend (FastAPI)

```bash
cd backend
uv venv .venv                       # or: python3 -m venv .venv
uv pip install -r requirements.txt  # or: .venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn main:app --reload --port 8000
```

- `GET  /api/projects` — projects grouped by category (`{ categories, projects, grouped }`)
- `POST /api/contact` — `{ name, email, message }`; validated, then logged and
  appended to `backend/contact_messages.jsonl` (send/store is stubbed).
- `GET  /api/health` — liveness check.

CORS is enabled for the Vite dev origin (`http://localhost:5173`).

### 2. Frontend (Vite)

```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173**. Vite proxies `/api/*` to the backend on port
8000 (see `frontend/vite.config.js`), so no CORS config is needed in dev. To
point at a deployed API instead, set `VITE_API_BASE`.

The shelf populates from `GET /api/projects` on mount; if the backend is
unreachable it falls back to bundled placeholder data so the UI never breaks.

## What's built

- **Hero** — signature draws itself in (SVG `pathLength`) while side hairlines
  extend to center; the signature then lifts and shrinks to the top, and the
  hero text (`SIDDHARTH / DONGARDIVE`) staggers in. A blue "Hey there!" badge
  follows the cursor over the hero (typed out with a blinking caret). The
  mustard **Menu** pill morphs (Framer Motion `layoutId`) into a black nav
  panel with Home / Works / Contact.
- **Project Shelf** — scroll-linked stage transition: the hero is pinned and
  sinks/fades while the black shelf's stepped podium edge rises over it. A
  data-driven bookshelf: one shelf per category (SQL, Machine Learning, Deep
  Learning, NLP, AI Agents), two colored book spines each (varied sizes, one
  leaning per shelf). Hover shows a custom "Click" cursor; clicking plays a
  real book-opening animation — the closed book flies in, its cover flips
  around the spine into a two-page spread (image left, writeup right) — and
  closing reverses it.
- **Footer** — revealed beneath the page as it scrolls away: mustard-yellow
  with a giant ghost name, socials + email top bar, "MEANINGFUL AND MEMORABLE"
  strip with Reach out icons, live India clock, and an
  "Inspired by Nithin M Warrier" credit linking to the reference site.
- **Contact** — the footer's **@** button opens a modal form that posts to the
  backend.
- **Routing** — `/projects/:slug` renders a placeholder detail page (the real
  case-study layout is a later phase).

## Notes / next phase

- Project images are placeholder color blocks — real imagery swaps in per project.
- The individual project detail page is a wired-up placeholder, not the final design.
- More books can be added per shelf just by extending the seed array in
  `backend/data.py` — the shelf layout is data-driven.
