// In dev, Vite proxies /api -> http://localhost:8000 (see vite.config.js).
// Override with VITE_API_BASE for a deployed backend.
const BASE = import.meta.env.VITE_API_BASE || '';

export async function fetchProjects() {
  const res = await fetch(`${BASE}/api/projects`);
  if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
  const data = await res.json();
  // Backend returns { categories, projects, grouped }; the shelf wants the flat list.
  return Array.isArray(data) ? data : data.projects;
}

export async function fetchProject(slug) {
  const res = await fetch(`${BASE}/api/projects/${slug}`);
  if (res.status === 404) throw new Error('not-found');
  if (!res.ok) throw new Error(`Failed to load project (${res.status})`);
  return res.json();
}

export async function sendContact(payload) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || 'Failed to send message');
  return data;
}
