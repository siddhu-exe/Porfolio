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


# Per-category step flow for "The Approach" (data-driven; count varies).
_APPROACH_STEPS = {
    "Data Analytics": ["Collect", "Clean", "Explore", "Insight"],
    "Data Visualization": ["Model Data", "Design", "Build", "Publish"],
    "Machine Learning": ["Data Prep", "Features", "Train", "Evaluate", "Tune"],
    "Deep Learning": ["Collect", "Augment", "Build CNN", "Train", "Validate"],
    "AI Applications": ["Ingest", "Embed", "Retrieve", "Generate", "Serve"],
}

# Per-project case-study copy, keyed by title. Every field is optional; the
# builder fills sensible defaults so the page always renders.
_DETAILS = {
    "Customer Churn Analysis": {
        "subtitle": "Finding why customers leave — before they do.",
        "problem": "A subscription business was shedding customers without knowing why. "
        "Retention calls were made on gut feel, and no one could name the behaviours that "
        "reliably preceded a cancellation.",
        "data_text": "Twelve months of anonymised account activity — logins, feature usage, "
        "support tickets and billing events — joined across three tables into a single "
        "per-customer view of roughly 40k records.",
        "data_visual": True,
        "metric": "23%",
        "metric_label": "of churn traced to three behaviours",
        "result_visual": False,
        "reflection": "The hardest part wasn't the analysis — it was resisting the urge to "
        "over-explain. One clear chart moved the retention team more than a page of "
        "statistics ever could.",
    },
    "Retail Sales Analysis": {
        "subtitle": "Turning a year of receipts into a plan.",
        "problem": "A multi-store retailer had rich sales history but no shared read on what "
        "was actually driving revenue — seasonality, region and category effects were all "
        "tangled together.",
        "data_text": "Point-of-sale exports across stores and quarters, normalised into a "
        "tidy fact table with date, store, category and margin dimensions.",
        "data_visual": False,
        "metric": "3x",
        "metric_label": "faster monthly reporting cycle",
        "result_visual": True,
        "reflection": "Good analysis is mostly good bookkeeping. Once the data model was "
        "honest, the insights almost wrote themselves.",
    },
    "Sales Dashboard (Tableau)": {
        "subtitle": "One source of truth stakeholders actually open.",
        "problem": "Leadership was drowning in spreadsheets that never agreed with each "
        "other. Every meeting started by arguing about whose numbers were right.",
        "data_text": "A modelled sales mart feeding Tableau, with row-level security so each "
        "region sees only its own performance against target.",
        "data_visual": True,
        "metric": "40%",
        "metric_label": "fewer ad-hoc report requests",
        "result_visual": True,
        "reflection": "A dashboard succeeds when it becomes boring — when people stop "
        "asking for numbers because they already trust the ones on screen.",
    },
    "IPL Data Visualization": {
        "subtitle": "A decade of cricket, told visually.",
        "problem": "Ten seasons of match data held great stories, but they were buried in "
        "rows and columns no fan would ever scroll through.",
        "data_text": "Ball-by-ball and match-level datasets covering teams, venues and "
        "players, reshaped for interactive exploration.",
        "data_visual": False,
        "metric": "10",
        "metric_label": "seasons made explorable at a glance",
        "result_visual": True,
        "reflection": "Charts are an argument. The moment I stopped decorating and started "
        "pointing at one idea per view, the whole thing clicked.",
    },
    "Loan Approval Predictor": {
        "subtitle": "A fairer, faster first look at applications.",
        "problem": "Manual loan screening was slow and inconsistent, and the rare approvals "
        "in the data made naive models look accurate while being useless.",
        "data_text": "Applicant records with income, credit history and demographics — "
        "carefully split to prevent leakage, with class imbalance handled explicitly.",
        "data_visual": False,
        "metric": "0.91",
        "metric_label": "ROC-AUC on held-out applicants",
        "result_visual": True,
        "reflection": "Chasing accuracy on an imbalanced set taught me to distrust a single "
        "number. The threshold, not the model, was where the real decisions lived.",
    },
    "FIFA World Cup Predictor": {
        "subtitle": "Forecasting matches from decades of form.",
        "problem": "Predicting knockout football is hard: upsets are the point of the sport, "
        "and history is noisy and unbalanced across teams.",
        "data_text": "Historical international fixtures with scores, tournament context and "
        "engineered team-strength and recent-form features.",
        "data_visual": False,
        "metric": "68%",
        "metric_label": "match-outcome accuracy",
        "result_visual": False,
        "reflection": "The model was most useful when it was uncertain — its close calls "
        "mapped almost perfectly onto the games everyone found thrilling.",
    },
    "Alzheimer's MRI Detection": {
        "subtitle": "Reading brain scans stage by stage.",
        "problem": "Distinguishing early stages of Alzheimer's from MRI is subtle work, and "
        "the available scans were limited and unevenly distributed across classes.",
        "data_text": "Labelled brain-MRI images across four stages, standardised and heavily "
        "augmented to help the network generalise beyond the training set.",
        "data_visual": True,
        "metric": "94%",
        "metric_label": "validation accuracy across 4 stages",
        "result_visual": True,
        "reflection": "Augmentation did more than any architecture tweak. Teaching the model "
        "what didn't matter was how it learned what did.",
    },
    "Plant Disease Detection": {
        "subtitle": "Diagnosing crops from a single leaf.",
        "problem": "A model that only works on clean lab photos is useless in a field. Real "
        "leaves come with messy light, backgrounds and angles.",
        "data_text": "Thousands of leaf images spanning healthy and diseased classes, "
        "augmented for lighting and orientation robustness.",
        "data_visual": False,
        "metric": "96%",
        "metric_label": "accuracy on unseen field images",
        "result_visual": True,
        "reflection": "The lab-to-field gap humbled me. The win came from making the data "
        "harder, not the model bigger.",
    },
    "RAG Chatbot": {
        "subtitle": "Answers grounded in your own documents.",
        "problem": "General chatbots confidently invent answers. For a private knowledge "
        "base, a plausible-sounding hallucination is worse than no answer at all.",
        "data_text": "A corpus of internal documents chunked, embedded and stored in a vector "
        "index, retrieved at query time to ground every response.",
        "data_visual": True,
        "metric": "100%",
        "metric_label": "of answers returned with citations",
        "result_visual": False,
        "reflection": "Retrieval quality, not the language model, decided everything. Get the "
        "right paragraph in front of the model and the hard part is already done.",
    },
    "AI Research Assistant": {
        "subtitle": "An agent that plans, reads and cites.",
        "problem": "Synthesising research by hand is slow and easy to bias. I wanted a system "
        "that could gather sources and show its work, not just its conclusions.",
        "data_text": "Live retrieval over web and document sources, orchestrated as a "
        "multi-step LangGraph workflow that plans before it writes.",
        "data_visual": False,
        "metric": "5",
        "metric_label": "sources synthesised per briefing, with citations",
        "result_visual": False,
        "reflection": "Giving the agent a plan step changed its character entirely — it went "
        "from a fast guesser to something that could actually be reviewed.",
    },
}


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
            slug = _slugify(title)
            bare = color.lstrip("#")
            d = _DETAILS.get(title, {})

            def _img(label, w=1200, h=675):
                text = label.replace(" ", "+")
                return f"https://placehold.co/{w}x{h}/{bare}/F7F1ED?text={text}"

            steps = _APPROACH_STEPS.get(category, ["Explore", "Build", "Ship"])

            projects.append({
                "id": idx,
                "title": title,
                "slug": slug,
                "category": category,
                "color": color,
                "subtitle": d.get("subtitle", description.split(".")[0] + "."),
                "thumbnail": (
                    f"https://placehold.co/600x400/{bare}/171717"
                    f"?text={category.replace(' ', '+')}"
                ),
                "heroImage": _img(title),
                "description": description,
                "problem": d.get("problem", description),
                "data": {
                    "text": d.get("data_text", "A curated dataset assembled and cleaned for "
                            "this project, shaped into an analysis-ready form."),
                    "visual": _img(f"{category} — Data", 900, 640) if d.get("data_visual") else None,
                },
                "approach": {"steps": [{"label": s} for s in steps]},
                "result": {
                    "metric": d.get("metric", "—"),
                    "label": d.get("metric_label", "headline outcome"),
                    "visual": _img(f"{title} — Result", 1000, 620) if d.get("result_visual") else None,
                },
                "reflection": d.get("reflection", "Every project on the shelf leaves a lesson "
                        "behind — this one sharpened how I think about the problem."),
                "links": {
                    "github": "https://github.com/",
                    "demo": None,
                },
                "images": [],
                "project_url": f"/projects/{slug}",
                "tech_stack": tech,
            })
    return projects


def build_shelves():
    return [{"name": name, "subtitle": subtitle} for name, subtitle, _ in _CATEGORIES]


PROJECTS = build_projects()
SHELVES = build_shelves()
