import { updateLibraryDOM, handleStatsError } from './domUpdater';

export async function fetchStats(item: HTMLElement) {
  const id = item.getAttribute('data-id');
  try {
    const res = await fetch(`/api/lib-stats?id=${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!data || data.error) throw new Error(data?.error || 'Unknown error');
    if (data.stars === undefined) throw new Error('No stats available (Rate limited & no cache)');

    // Delegate mapping properties directly to UI DOM layer
    updateLibraryDOM(item, data);
  } catch (e: any) {
    handleStatsError(item, e.message);
  }
}

// Priority Scheduler: Fetch oldest cache first
export const initStatsFetcher = async () => {
  const items = Array.from(
    document.querySelectorAll('.lib-item:not(.stats-loaded)')
  ) as HTMLElement[];
  if (items.length === 0) return;

  // Sort items: -1 (no cache) comes first, then lowest timestamp (oldest)
  items.sort((a, b) => {
    const attrA = a.getAttribute('data-cache-age');
    const attrB = b.getAttribute('data-cache-age');
    const ageA = attrA !== null ? Number(attrA) : -1;
    const ageB = attrB !== null ? Number(attrB) : -1;
    return ageA - ageB;
  });

  for (const item of items) {
    item.classList.add('stats-loaded');
    await fetchStats(item);
    await new Promise((r) => setTimeout(r, 50));
  }
};
