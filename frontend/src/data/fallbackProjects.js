// Used only if the backend is unreachable, so the shelf never renders empty.
const PALETTE = ['#D9834A', '#E4A356', '#7FA98F', '#6C8EBF', '#B5729B', '#C9695A', '#5C9EAD', '#D4A24E'];

const CATS = [
  {
    category: 'Data Analytics',
    projects: [
      { title: 'Customer Churn Analysis', tech: ['Pandas', 'SQL', 'Matplotlib'] },
      { title: 'Retail Sales Analysis', tech: ['Pandas', 'NumPy', 'Seaborn'] },
    ],
  },
  {
    category: 'Data Visualization',
    projects: [
      { title: 'Sales Dashboard (Tableau)', tech: ['Tableau', 'SQL', 'Excel'] },
      { title: 'IPL Data Visualization', tech: ['Python', 'Plotly', 'Pandas'] },
    ],
  },
  {
    category: 'Machine Learning',
    projects: [
      { title: 'Loan Approval Predictor', tech: ['scikit-learn', 'XGBoost', 'Pandas'] },
      { title: 'FIFA World Cup Predictor', tech: ['scikit-learn', 'Pandas', 'NumPy'] },
    ],
  },
  {
    category: 'Deep Learning',
    projects: [
      { title: "Alzheimer's MRI Detection", tech: ['TensorFlow', 'CNN', 'OpenCV'] },
      { title: 'Plant Disease Detection', tech: ['PyTorch', 'CNN', 'OpenCV'] },
    ],
  },
  {
    category: 'AI Applications',
    projects: [
      { title: 'RAG Chatbot', tech: ['LangChain', 'FastAPI', 'OpenAI'] },
      { title: 'AI Research Assistant', tech: ['LangGraph', 'RAG', 'Chroma'] },
    ],
  },
];

let counter = 0;
const projects = CATS.flatMap(({ category, projects: catProjects }) =>
  catProjects.map(({ title, tech }) => {
    const id = ++counter;
    return {
      id,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
      category,
      color: PALETTE[(id - 1) % PALETTE.length],
      thumbnail: null,
      description: `${title} is a placeholder ${category} project. A real description and imagery will be added in a later pass.`,
      images: [],
      project_url: '#',
      tech_stack: tech,
    };
  })
);

// Chapter nav: adjacent projects in flat order, same convention as the backend.
projects.forEach((p, i) => {
  const prevP = projects[i - 1];
  const nextP = projects[i + 1];
  p.prev = prevP ? { slug: prevP.slug, title: prevP.title } : null;
  p.next = nextP ? { slug: nextP.slug, title: nextP.title } : null;
});

export const fallbackProjects = projects;
