export function applySort(sortType?: string | null) {
  const activeSort = sortType || localStorage.getItem('registry-sort') || 'default';
  const sections = document.querySelectorAll('.list');

  sections.forEach((section) => {
    const items = Array.from(section.querySelectorAll('.lib-item')) as HTMLElement[];
    if (items.length === 0) return;

    items.sort((a, b) => {
      if (activeSort === 'name') {
        return (a.getAttribute('data-name') || '').localeCompare(
          b.getAttribute('data-name') || ''
        );
      }

      if (activeSort === 'stars') {
        return Number(b.getAttribute('data-stars')) - Number(a.getAttribute('data-stars'));
      }

      if (activeSort === 'newest') {
        return Number(b.getAttribute('data-updated')) - Number(a.getAttribute('data-updated'));
      }

      if (activeSort === 'oldest') {
        const valA = Number(a.getAttribute('data-updated')) || Infinity;
        const valB = Number(b.getAttribute('data-updated')) || Infinity;
        return valA - valB;
      }

      // Default: Preferred first
      return Number(a.getAttribute('data-status')) - Number(b.getAttribute('data-status'));
    });

    items.forEach((item) => section.appendChild(item));
  });
}

export function initSorter() {
  const sortButtons = document.querySelectorAll('.sort-btn');

  // Handle sort button clicks
  sortButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sortType = btn.getAttribute('data-sort');
      const label = btn.textContent;
      const currentLabelEl = document.getElementById('current-sort');

      if (currentLabelEl && label) currentLabelEl.textContent = label;

      sortButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (sortType) {
        localStorage.setItem('registry-sort', sortType);
        applySort(sortType);
      }
    });
  });

  // Initial state setup
  const savedSort = localStorage.getItem('registry-sort') || 'default';
  const activeBtn = document.querySelector(`.sort-btn[data-sort="${savedSort}"]`);
  if (activeBtn) {
    const currentLabelEl = document.getElementById('current-sort');
    if (currentLabelEl) currentLabelEl.textContent = activeBtn.textContent;
    sortButtons.forEach((b) => b.classList.remove('active'));
    activeBtn.classList.add('active');
  }
  applySort(savedSort);
}
