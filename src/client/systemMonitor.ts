export function analyzeSystem() {
  const items = Array.from(document.querySelectorAll('.lib-item'));
  const total = items.length;
  if (total === 0) return;

  let synced = 0;
  let oldestAge = Infinity;
  let oldestName = '-';
  let oldestPartDesc = '';

  items.forEach((item) => {
    if (item.classList.contains('stats-loaded')) synced++;

    const age = Number(item.getAttribute('data-cache-age')) || 0;
    if (age > 0 && age < oldestAge) {
      oldestAge = age;
      oldestName = item.getAttribute('data-name') || '-';
      oldestPartDesc = item.getAttribute('data-oldest-part') || 'data';
    }
  });

  const statusText = document.querySelector('.status-text span');
  const indicator = document.querySelector('.status-indicator');
  const syncedEl = document.getElementById('synced-count');
  const oldestEl = document.getElementById('oldest-node');

  if (syncedEl) syncedEl.textContent = `${synced}/${total}`;

  if (oldestEl) {
    if (oldestAge === Infinity) {
      oldestEl.textContent = 'None';
    } else {
      const minAgo = Math.floor((Date.now() - oldestAge) / 60000);
      let timeStr = minAgo < 60 ? `${minAgo}m` : `${Math.floor(minAgo / 60)}h`;
      oldestEl.textContent = `${oldestName} [${oldestPartDesc}] (${timeStr})`;
    }
  }

  if (statusText && indicator) {
    if (synced === total) {
      statusText.textContent = 'IDLE (Monitoring)';
      (indicator as HTMLElement).style.backgroundColor = 'var(--text)';
      (indicator as HTMLElement).style.animation = 'none';
    } else {
      statusText.textContent = 'HYDRATING...';
      (indicator as HTMLElement).style.backgroundColor = '#eab308';
    }
  }

  // Keep polling forever to update relative timestamps live
  if (synced < total) {
    setTimeout(analyzeSystem, 500); // Fast pulse during hydration
  } else {
    setTimeout(analyzeSystem, 10000); // 10s relaxed polling when idle
  }
}

export function initSystemMonitor() {
  setTimeout(analyzeSystem, 1000);
}
