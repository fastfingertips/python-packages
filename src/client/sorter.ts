export function initSorter() {
  const sortButtons = document.querySelectorAll('.sort-btn');
  const sections = document.querySelectorAll('.list');

  sortButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sortType = btn.getAttribute('data-sort');
      sortButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      sections.forEach((section) => {
        const items = Array.from(section.querySelectorAll('.lib-item')) as HTMLElement[];

        items.sort((a, b) => {
          if (sortType === 'name') {
            return (a.getAttribute('data-name') || '').localeCompare(
              b.getAttribute('data-name') || ''
            );
          }

          if (sortType === 'stars') {
            return Number(b.getAttribute('data-stars')) - Number(a.getAttribute('data-stars'));
          }

          if (sortType === 'newest') {
            return Number(b.getAttribute('data-updated')) - Number(a.getAttribute('data-updated'));
          }

          if (sortType === 'oldest') {
            const valA = Number(a.getAttribute('data-updated')) || Infinity;
            const valB = Number(b.getAttribute('data-updated')) || Infinity;
            return valA - valB;
          }

          // Default: Preferred first
          return Number(a.getAttribute('data-status')) - Number(b.getAttribute('data-status'));
        });

        items.forEach((item) => section.appendChild(item));
      });
    });
  });
}
