import { REGISTRY_CONFIG } from '../config';
import { applySort } from './sorter';
import { formatExactTime, getCacheAgeText } from './utils/formatters';

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
      const appendTitle = (cell: Element | null, defaultTitle: string, timestamp?: number) => {
        if (cell && timestamp) {
          const age = getCacheAgeText(timestamp);
          const staleText = data.isStale ? `\n(Served from stale fallback due to API limits)` : ``;
          cell.setAttribute('title', `${defaultTitle}\n(Data: ${age})${staleText}`);
        }
      };

      if (starsCell) appendTitle(starsCell.parentElement || starsCell, 'Stargazers count on GitHub', data.timestamps.stars);
      if (updateCell) appendTitle(updateCell, 'Last Repository Push', data.timestamps.commit);
      if (releaseCell) appendTitle(releaseCell, 'Latest GitHub Release/Tag', data.timestamps.shipment);
      if (descCell && data.description) appendTitle(descCell, data.description, data.timestamps.description);

      // Mutate UI DOM for persistence
      let oldestTimestamp = data.timestamps.shipment || 0;
      if ((data.timestamps.commit || 0) < oldestTimestamp) oldestTimestamp = data.timestamps.commit;
      if ((data.timestamps.stars || 0) < oldestTimestamp) oldestTimestamp = data.timestamps.stars;
      if ((data.timestamps.description || 0) < oldestTimestamp) oldestTimestamp = data.timestamps.description;

      item.setAttribute('data-cache-age', oldestTimestamp.toString());
    }

    if (data.stars !== undefined && data.stars !== null) {
      item.setAttribute('data-stars', data.stars.toString());
    }
    if (data.lastUpdate) {
      item.setAttribute('data-updated', new Date(data.lastUpdate).getTime().toString());
    }
    item.classList.remove('no-repo');
    applySort();
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
