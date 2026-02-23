import { REGISTRY_CONFIG } from '../config';

export function updateLibraryDOM(item: HTMLElement, data: any) {
  const id = item.getAttribute('data-id');

  try {
    const starsCell = item.querySelector('.stars-val');
    const releaseCell = item.querySelector('.release-val');
    const updateCell = item.querySelector('.update-val');
    const badgeContainer = item.querySelector('.rec-badge-container');
    const descCell = item.querySelector('.lib-desc');

    if (descCell && data.description) {
      descCell.textContent = data.description;
    }

    if (starsCell && data.stars !== undefined) starsCell.textContent = data.stars.toLocaleString();

    if (releaseCell && data.lastRelease !== undefined) {
      if (data.lastRelease === null) {
        releaseCell.textContent = '--';
      } else {
        releaseCell.textContent = formatExactTime(data.lastRelease);
        if (data.daysSinceRelease > REGISTRY_CONFIG.thresholds.staleReleaseDays)
          releaseCell.classList.add('stale');
      }
    }

    if (updateCell && data.lastUpdate !== undefined) {
      updateCell.textContent = formatExactTime(data.lastUpdate);
      if (data.daysSinceUpdate > REGISTRY_CONFIG.thresholds.staleUpdateDays)
        updateCell.classList.add('stale');
    }

    if (data.recommendationDetails && data.recommendationDetails.badge && badgeContainer) {
      const breakdown = `\n\nScore Breakdown:\n${data.recommendationDetails.reasons.join('\n')}\nTotal Score: ${data.recommendationDetails.score}`;

      if (data.recommendationDetails.badge === 'REC') {
        const tooltip = `Recommended Library${breakdown}`;
        badgeContainer.innerHTML = `<span class="badge-recommended" title="${tooltip}">REC</span>`;
        item.classList.add('recommended-row');
      } else if (data.recommendationDetails.badge === 'WARN') {
        const tooltip = `Outdated/Legacy Library${breakdown}`;
        badgeContainer.innerHTML = `<span class="badge-warn" title="${tooltip}">WARN</span>`;
        item.classList.add('warn-row');
      }
    }

    // Dynamic Cache Tooltips
    if (data.timestamps) {
      const getAgeText = (ts: number | undefined) => {
        if (!ts) return '';
        const ageMins = Math.floor((Date.now() - ts) / 60000);
        if (ageMins < 1) return 'live data';
        if (ageMins < 60) return `${ageMins}m ago`;
        return `${Math.floor(ageMins / 60)}h ${ageMins % 60}m ago`;
      };

      const appendTitle = (cell: Element | null, defaultTitle: string, timestamp?: number) => {
        if (cell && timestamp) {
          const age = getAgeText(timestamp);
          const staleText = data.isStale ? `\n(Served from stale fallback due to API limits)` : ``;
          cell.setAttribute('title', `${defaultTitle}\n(Data: ${age})${staleText}`);
        }
      };

      if (starsCell)
        appendTitle(
          starsCell.parentElement || starsCell,
          'Stargazers count on GitHub',
          data.timestamps.stars
        );
      if (updateCell) appendTitle(updateCell, 'Last Repository Push', data.timestamps.commit);
      if (releaseCell)
        appendTitle(releaseCell, 'Latest GitHub Release/Tag', data.timestamps.shipment);
      if (descCell && data.description)
        appendTitle(descCell, data.description, data.timestamps.description);

      // Mutate UI DOM with live recalculations for System Monitor
      let oldestTimestamp = data.timestamps.shipment || 0;
      let oldestPart = 'shipment';
      if ((data.timestamps.commit || 0) < oldestTimestamp) {
        oldestTimestamp = data.timestamps.commit;
        oldestPart = 'commit';
      }
      if ((data.timestamps.stars || 0) < oldestTimestamp) {
        oldestTimestamp = data.timestamps.stars;
        oldestPart = 'stars';
      }
      if ((data.timestamps.description || 0) < oldestTimestamp) {
        oldestTimestamp = data.timestamps.description;
        oldestPart = 'description';
      }

      item.setAttribute('data-cache-age', oldestTimestamp.toString());
      item.setAttribute('data-oldest-part', oldestPart);
    }

    if (data.stars !== undefined && data.stars !== null) {
      item.setAttribute('data-stars', data.stars.toString());
    }
    if (data.lastUpdate) {
      item.setAttribute('data-updated', new Date(data.lastUpdate).getTime().toString());
    }
    item.classList.remove('no-repo');
  } catch (e) {
    console.error(`[DOM Updater] Failed for ${id}:`, e);
  }
}

export function handleStatsError(item: HTMLElement, message: string) {
  const id = item.getAttribute('data-id');
  if (message.includes('No stats available')) {
    console.warn(`[Stats] ${id} - ${message}`);
  } else {
    console.error(`[Stats] Failed for ${id}:`, message);
  }

  item.querySelectorAll('.skeleton').forEach((s) => {
    const parent = s.parentElement;
    if (parent) parent.textContent = '-';
  });
}

function formatExactTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins || 1}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}
