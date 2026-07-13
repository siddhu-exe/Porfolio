# Adding Books (Projects) and Shelves (Categories)

This guide explains how to add a new **book** (project) to an existing shelf, and
how to add a whole new **shelf** (category), to the Project Shelf section. It is
written so any developer or AI agent can follow it without reading the whole
codebase.

## Mental model

The site is a library.

- A **shelf** = a project **category** (e.g. `Machine Learning`). Each shelf has
  a number label ("Shelf 3"), a title, and a one-line subtitle.
- A **book** = a single **project**, shown as a colored spine on its shelf.
- Clicking a book opens the **book preview** — a modal that flips open like a
  real book and shows the project's image, description, tech stack, and a
  **View Full Project** button.
- **View Full Project** navigates (with a full-page book-cover transition) to the
  **Chapter page** at `/projects/:slug` — the full case study.

**The backend is the single source of truth for project content.** The frontend
fetches it and renders it. There is also a small **frontend fallback** used only
when the backend is unreachable, so the shelf never renders empty.

## Files you will touch

| File | Purpose |
|------|---------|
| `backend/data.py` | **Primary.** Categories, per-project content, approach steps, colors. |
| `frontend/src/data/fallbackProjects.js` | Offline fallback list (keep roughly in sync). |
| `frontend/src/components/ProjectShelf.jsx` | The `SHELVES` array (shelf order + subtitles) — only edit when adding/removing a shelf. |

You do **not** need to touch the book spine, modal, or Chapter page components —
they are data-driven and render whatever the backend returns.

> For the Chapter page's gallery sections specifically (images, layout rules,
> `emoji`/`year`, chapter nav), see [`CHAPTER_PAGE.md`](CHAPTER_PAGE.md).

---

## The project data shape

Every project the API returns looks like this (built in `backend/data.py`):

```jsonc
{
  "id": 3,
  "title": "FIFA World Cup Predictor",
  "slug": "fifa-world-cup-predictor",      // auto-generated from title
  "category": "Machine Learning",           // MUST match a shelf name exactly
  "color": "#7FA98F",                        // spine + cover + gallery-placeholder color
  "emoji": "⚽",                             // shown next to the title on the Chapter page header
  "year": 2026,                              // shown top-right on the Chapter page header
  "subtitle": "Forecasting matches from decades of form.",
  "thumbnail": "https://.../...",            // small shelf/preview image
  "heroImage": "https://.../...",            // (legacy) large image, no longer shown on the Chapter page
  "description": "…",                         // shown in the book-preview modal AND the Chapter page intro
  "problem": "…",                             // (legacy, kept for the book-preview modal / API consumers)
  "data": { "text": "…", "visual": null },    // (legacy, same as above)
  "approach": { "steps": [{ "label": "Train" }, …] }, // (legacy, same as above)
  "result": { "metric": "0.91", "label": "ROC-AUC", "visual": null }, // (legacy)
  "reflection": "…",                          // (legacy)
  "links": { "github": "https://…", "demo": null }, // Chapter page closing row
  "gallery": [                                // Chapter page gallery sections, IN ORDER
    { "key": "architecture", "heading": "Architecture", "subtitle": "…", "images": ["https://…"] },
    { "key": "pipeline",     "heading": "Data Pipeline", "subtitle": "…", "images": ["https://…", "https://…"] },
    { "key": "ml",           "heading": "Machine Learning", "subtitle": "…", "images": ["…", "…", "…"] },
    { "key": "platform",     "heading": "Platform", "subtitle": "…", "images": ["…", "…"] },
    { "key": "results",      "heading": "Results", "subtitle": "…", "images": ["…"] }
  ],
  "prev": { "slug": "loan-approval-predictor", "title": "Loan Approval Predictor" }, // or null
  "next": { "slug": "alzheimer-s-mri-detection", "title": "Alzheimer's MRI Detection" }, // or null
  "images": [],
  "tech_stack": ["scikit-learn", "XGBoost", "Pandas"]
}
```

- `visual`/`gallery[].images` entries are the only "optional media" fields —
  `null`/empty renders as a placeholder block in the project's `color`, so
  nothing ever looks broken before real images are ready.
- `slug`, `thumbnail`, `heroImage`, `gallery[].images` placeholders, and
  `prev`/`next` are **all generated automatically**. You normally only write
  the text fields (title, tech, description, and the optional `_DETAILS` copy).
- `problem`, `data`, `approach`, `result`, `reflection` are **legacy fields**
  kept in the API response for any older consumer, but the current Chapter
  page (see below) does **not** render them — it renders `gallery` instead.
  You can still fill `_DETAILS` for them (harmless), but they're not required.

> 📖 **For a full walkthrough of the Chapter page's exact layout, the gallery
> image-count rules, and how to customize per-project galleries**, see
> [`CHAPTER_PAGE.md`](CHAPTER_PAGE.md) in this folder. This file (`ADDING_PROJECTS.md`)
> covers the shelf/book side; that one covers the full case-study page you land
> on after clicking **View Full Project**.

---

## How to add a NEW BOOK to an existing shelf

Everything happens in **`backend/data.py`**.

### 1. Add the project to its category

Find the `_CATEGORIES` list. Each entry is
`(category_name, subtitle, [ (title, [tech...], description), ... ])`.
Add a new `(title, tech, description)` tuple to the right category's list:

```python
_CATEGORIES = [
    # …
    ("Machine Learning", "Building predictive models that learn from data.", [
        ("Loan Approval Predictor", ["scikit-learn", "XGBoost", "Pandas"], "…"),
        ("FIFA World Cup Predictor", ["scikit-learn", "Pandas", "NumPy"], "…"),
        # 👇 NEW BOOK — just add a tuple here
        ("Spam Email Classifier", ["scikit-learn", "NLTK", "Pandas"],
         "A short one-sentence description used as a fallback."),
    ]),
    # …
]
```

That alone is enough to make the book appear on the shelf. The `id`, `slug`,
`color`, and placeholder images are generated for you.

### 2. (Recommended) Add the full case-study copy

In the same file, add an entry to the `_DETAILS` dict, keyed by the **exact
title**. Any field you omit falls back to a sensible default.

```python
_DETAILS = {
    # …
    "Spam Email Classifier": {
        "subtitle": "Catching junk before it reaches the inbox.",
        "problem": "Two-to-three sentences on the real-world problem.",
        "data_text": "What data you used and how you shaped it.",
        "data_visual": True,        # True -> show a placeholder data image; omit/False -> text only
        "metric": "98.4%",           # the big number on the Chapter page
        "metric_label": "precision on held-out mail",
        "result_visual": False,      # True -> show a placeholder result image
        "reflection": "A short, personal takeaway.",
    },
}
```

### 3. Keep the shelf balanced (optional)

The shelf centers its category label and splits books evenly to the left and
right. It handles any number of books, but **2 or an even number per shelf**
looks most balanced.

### 4. Mirror it in the fallback (optional but nice)

Edit `frontend/src/data/fallbackProjects.js` and add the same title/tech to the
matching category in the `CATS` array, so the offline view matches.

### 5. Restart the backend

```bash
cd backend && .venv/bin/uvicorn main:app --reload --port 8000
```

The shelf fetches `/api/projects` on load; the new book appears.

---

## How to add a NEW SHELF (category)

This takes two files, because the frontend owns the **shelf order + subtitle**
used for the on-screen label, and the backend owns the **projects**.

### 1. Backend — add the category

In `backend/data.py`, add a new entry to `_CATEGORIES` (name, subtitle, and at
least one project). Put it in the position you want it to appear:

```python
("Computer Vision", "Teaching machines to see.", [
    ("Object Counter", ["PyTorch", "OpenCV"], "…"),
    ("Pose Estimator", ["MediaPipe", "OpenCV"], "…"),
]),
```

If this category needs its own **approach-step flow** (the horizontal steps on
the Chapter page), add it to `_APPROACH_STEPS`, keyed by the exact category name:

```python
_APPROACH_STEPS = {
    # …
    "Computer Vision": ["Collect", "Label", "Train", "Evaluate", "Deploy"],
}
```

If you skip this, a generic 3-step flow is used.

### 2. Frontend — register the shelf label

Open `frontend/src/components/ProjectShelf.jsx` and add the category to the
`SHELVES` array **in the same order** as the backend, with its subtitle:

```js
const SHELVES = [
  { key: 'Data Analytics',     subtitle: '…' },
  // …
  { key: 'Computer Vision',    subtitle: 'Teaching machines to see.' }, // 👈 NEW
];
```

> ⚠️ The `key` here **must exactly match** the category name in `backend/data.py`
> (same spelling, spacing, capitalization). This string is how books are matched
> to their shelf. The shelf number ("Shelf N") is derived from array position.

### 3. Frontend fallback (optional)

Add the category to `CATS` in `frontend/src/data/fallbackProjects.js` too.

### 4. Restart the backend and reload.

---

## The book preview (modal) and Chapter page — what shows where

You don't edit these, but here's what each field maps to so you know what to
write:

**Book preview modal** (opens on book click):
- cover: `title`, `category`, `color`
- inside: `thumbnail`/`heroImage`, `description`, `tech_stack`
- button: **View Full Project** → `/projects/{slug}`

**Chapter page** (`/projects/:slug`) — see [`CHAPTER_PAGE.md`](CHAPTER_PAGE.md) for
the full breakdown, summarized here:
| Section | Field |
|---------|-------|
| Header | `emoji`, `title`, `category`, `year` |
| Description | `description` |
| Stack row | `tech_stack[]` |
| Gallery sections (×5, in order) | `gallery[]` — each `{ heading, subtitle, images[] }` |
| Closing row | `links.github`, `links.demo` (optional) |
| Chapter nav | `prev` / `next` (auto-computed) |

---

## Colors

Spine/cover colors come from `PALETTE` in `backend/data.py`, assigned by order.
They deliberately avoid pure black/white so spines read on any background. To
force a specific color for a project, set `color` explicitly on that project in
`build_projects()`.

## Real images later

`thumbnail`, `heroImage`, and every `gallery[].images` entry currently use
`placehold.co` placeholders tinted to the project color. Replace them with real
image URLs (or local `/public` paths) when available — the layout already
supports them; see [`CHAPTER_PAGE.md`](CHAPTER_PAGE.md) for exactly how the
gallery's image count controls its layout.

## Quick checklist for a new book

- [ ] Added `(title, tech, description)` to the right category in `_CATEGORIES`
- [ ] Added a `_DETAILS[title]` entry with the case-study copy
- [ ] (optional) Mirrored it in `fallbackProjects.js`
- [ ] Restarted the backend and confirmed the book appears + opens

## Quick checklist for a new shelf

- [ ] Added the category (+ projects) to `_CATEGORIES`
- [ ] (optional) Added `_APPROACH_STEPS[category]`
- [ ] Added `{ key, subtitle }` to `SHELVES` in `ProjectShelf.jsx` (exact name match)
- [ ] (optional) Mirrored in `fallbackProjects.js`
- [ ] Restarted the backend and confirmed the shelf appears in the right order
