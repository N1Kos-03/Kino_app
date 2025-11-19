
export async function movieLoader({ params }) {
  const { id } = params;

  const res = await fetch(`https://search.imdbot.workers.dev/?tt=${id}`);
  const data = await res.json();

  return data.short || {};
}
