"""Seed project data — 2 placeholder projects per category (10 total).

Colors are drawn from a fixed palette that avoids pure black/white so book
spines read against the black Project Shelf. Frontend randomizes on top of this
only if it wants; the color here is the source of truth.
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

_CATEGORIES = [
    ("SQL", [
        ("Retail Insights Warehouse", ["PostgreSQL", "dbt", "Python"]),
        ("Query Performance Optimizer", ["SQL", "Indexing", "EXPLAIN"]),
    ]),
    ("Machine Learning", [
        ("Customer Churn Predictor", ["scikit-learn", "pandas", "XGBoost"]),
        ("Dynamic Price Forecaster", ["scikit-learn", "Prophet", "NumPy"]),
    ]),
    ("Deep Learning", [
        ("Vision Defect Detector", ["PyTorch", "CNN", "OpenCV"]),
        ("Audio Event Tagger", ["TensorFlow", "Librosa", "CRNN"]),
    ]),
    ("NLP", [
        ("Sentiment Analysis Engine", ["Transformers", "BERT", "spaCy"]),
        ("Document Summarizer", ["Hugging Face", "T5", "LangChain"]),
    ]),
    ("AI Agents", [
        ("Autonomous Task Orchestrator", ["LangGraph", "OpenAI", "FastAPI"]),
        ("Research Copilot Agent", ["CrewAI", "RAG", "Chroma"]),
    ]),
]


def _slugify(title: str) -> str:
    return "".join(c if c.isalnum() else "-" for c in title.lower()).strip("-").replace("--", "-")


def build_projects():
    projects = []
    idx = 0
    for category, items in _CATEGORIES:
        for title, tech in items:
            idx += 1
            projects.append({
                "id": idx,
                "title": title,
                "slug": _slugify(title),
                "category": category,
                "color": PALETTE[(idx - 1) % len(PALETTE)],
                "thumbnail": f"https://placehold.co/600x400/{PALETTE[(idx - 1) % len(PALETTE)].lstrip('#')}/171717?text={category.replace(' ', '+')}",
                "description": (
                    f"{title} is a {category} project exploring practical, "
                    "real-world problem solving. Full write-up and imagery will "
                    "be added in a later pass."
                ),
                "images": [],
                "project_url": f"/projects/{_slugify(title)}",
                "tech_stack": tech,
            })
    return projects


PROJECTS = build_projects()
