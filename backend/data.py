"""Seed project data — 2 placeholder projects per category (10 total).

Colors are drawn from a fixed palette that avoids pure black/white so book
spines read against the shelf. The color here is the source of truth; the
frontend renders it directly.

Each category carries a subtitle used as the shelf's small caption.
"""

PALETTE = [
    "#D9834A",  # terracotta
    "#E4A356",  # amber
    "#7FA98F",  # sage
    "#6C8EBF",  # slate blue
    "#B5729B",  # mauve
    "#C9695A",  # clay red
    "#5C9EAD",  # teal
    "#D4A24E",  # mustard-gold
    "#8A7FB5",  # violet
    "#A9884E",  # bronze
]

# (name, subtitle, [(title, [tech...], description)])
_CATEGORIES = [
    (
        "Data Analytics",
        "Extracting insights from data to drive better decisions.",
        [
            (
                "Customer Churn Analysis",
                ["Pandas", "SQL", "Matplotlib"],
                "An exploratory analysis of customer behaviour that identifies the "
                "drivers of churn and quantifies their impact, turning raw activity "
                "logs into retention recommendations.",
            ),
            (
                "Retail Sales Analysis",
                ["Pandas", "NumPy", "Seaborn"],
                "A deep dive into multi-store retail sales — seasonality, category "
                "performance and regional trends — surfaced through clear, "
                "decision-ready summaries.",
            ),
        ],
    ),
    (
        "Data Visualization",
        "Transforming complex data into clear and interactive stories.",
        [
            (
                "Sales Dashboard (Tableau)",
                ["Tableau", "SQL", "Excel"],
                "An interactive Tableau dashboard tracking revenue, targets and KPIs "
                "across regions, letting stakeholders slice the numbers without "
                "touching a spreadsheet.",
            ),
            (
                "IPL Data Visualization",
                ["Python", "Plotly", "Pandas"],
                "A visual exploration of a decade of IPL cricket data — player form, "
                "team match-ups and venue effects — rendered as interactive charts "
                "that tell the story at a glance.",
            ),
        ],
    ),
    (
        "Machine Learning",
        "Building predictive models that learn from data.",
        [
            (
                "Loan Approval Predictor",
                ["scikit-learn", "XGBoost", "Pandas"],
                "A classification model that estimates loan-approval likelihood from "
                "applicant features, with careful handling of class imbalance and "
                "explainable feature importance.",
            ),
            (
                "FIFA World Cup Predictor",
                ["scikit-learn", "Pandas", "NumPy"],
                "A model trained on historical international fixtures to forecast "
                "World Cup match outcomes, blending team strength ratings with "
                "recent form.",
            ),
        ],
    ),
    (
        "Deep Learning",
        "Solving complex problems using neural networks and computer vision.",
        [
            (
                "Alzheimer's MRI Detection",
                ["TensorFlow", "CNN", "OpenCV"],
                "A convolutional neural network that classifies brain-MRI scans "
                "across stages of Alzheimer's, built with strong preprocessing and "
                "augmentation for reliable results.",
            ),
            (
                "Plant Disease Detection",
                ["PyTorch", "CNN", "OpenCV"],
                "A vision model that identifies crop diseases from leaf images, "
                "trained to generalise across lighting and background so it works in "
                "the field, not just the lab.",
            ),
        ],
    ),
    (
        "AI Applications",
        "Creating intelligent systems powered by modern AI.",
        [
            (
                "RAG Chatbot",
                ["LangChain", "FastAPI", "OpenAI"],
                "A retrieval-augmented chatbot that answers questions grounded in a "
                "private document set, served through a FastAPI backend with "
                "citations for every response.",
            ),
            (
                "AI Research Assistant",
                ["LangGraph", "RAG", "Chroma"],
                "An agentic research assistant that plans, searches and synthesises "
                "sources into cited briefings, orchestrated as a multi-step "
                "LangGraph workflow.",
            ),
        ],
    ),
]


def _slugify(title: str) -> str:
    slug = "".join(c if c.isalnum() else "-" for c in title.lower())
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")


def build_projects():
    projects = []
    idx = 0
    for category, _subtitle, items in _CATEGORIES:
        for title, tech, description in items:
            idx += 1
            color = PALETTE[(idx - 1) % len(PALETTE)]
            projects.append({
                "id": idx,
                "title": title,
                "slug": _slugify(title),
                "category": category,
                "color": color,
                "thumbnail": (
                    f"https://placehold.co/600x400/{color.lstrip('#')}/171717"
                    f"?text={category.replace(' ', '+')}"
                ),
                "description": description,
                "images": [],
                "project_url": f"/projects/{_slugify(title)}",
                "tech_stack": tech,
            })
    return projects


def build_shelves():
    return [{"name": name, "subtitle": subtitle} for name, subtitle, _ in _CATEGORIES]


PROJECTS = build_projects()
SHELVES = build_shelves()
