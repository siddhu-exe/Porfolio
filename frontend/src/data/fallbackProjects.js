// Used only if the backend is unreachable, so the shelf never renders empty.
const PALETTE = ['#D9834A', '#E4A356', '#7FA98F', '#6C8EBF', '#B5729B', '#C9695A', '#5C9EAD', '#D4A24E'];

const CATS = [
  { category: 'SQL', titles: ['Retail Insights', 'Query Optimizer'] },
  { category: 'Machine Learning', titles: ['Churn Predictor', 'Price Forecaster'] },
  { category: 'Deep Learning', titles: ['Vision Net', 'Audio Tagger'] },
  { category: 'NLP', titles: ['Sentiment Engine', 'Doc Summarizer'] },
  { category: 'AI Agents', titles: ['Task Orchestrator', 'Research Copilot'] },
];

let counter = 0;
export const fallbackProjects = CATS.flatMap(({ category, titles }) =>
  titles.map((title) => {
    const id = ++counter;
    return {
      id,
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      category,
      color: PALETTE[(id - 1) % PALETTE.length],
      thumbnail: null,
      description: `${title} is a placeholder ${category} project. A real description and imagery will be added in a later pass.`,
      images: [],
      project_url: '#',
      tech_stack: ['Python', 'FastAPI'],
    };
  })
);
