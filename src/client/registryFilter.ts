export function initRegistryFilter() {
  const filterInput = document.getElementById('registry-filter') as HTMLInputElement;
  const categoryButtons = document.querySelectorAll('.category-btn');
  const libItems = document.querySelectorAll('.lib-item');
  const sections = document.querySelectorAll('section');
  const main = document.getElementById('registry-main');

  if (!filterInput) return;

  let currentCategory = localStorage.getItem('registry-category') || 'all';
  let searchQuery = '';

  function applyFilters() {
    const isFlat = main?.classList.contains('is-flat');

    libItems.forEach((item) => {
      const name = (item.getAttribute('data-name') || '').toLowerCase();
      const desc = (item.querySelector('.lib-desc')?.textContent || '').toLowerCase();
      const itemCategory = item.getAttribute('data-category');
      
      const matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery);
      const matchesCategory = currentCategory === 'all' || itemCategory === currentCategory;

      (item as HTMLElement).style.display = (matchesSearch && matchesCategory) ? 'grid' : 'none';
    });

    if (!isFlat) {
      sections.forEach((section) => {
        const hasVisibleItems = Array.from(section.querySelectorAll('.lib-item')).some(
          (item) => (item as HTMLElement).style.display !== 'none'
        );
        section.style.display = hasVisibleItems ? 'block' : 'none';
      });
    }
  }

  function scrollToCategory(cat: string) {
    const targetId = cat.toLowerCase().replace('/', '-');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navHeight = 44 + 60; // navbar + controls
      window.scrollTo({ top: targetEl.offsetTop - navHeight, behavior: 'smooth' });
    }
  }

  // Text Filter
  filterInput.addEventListener('input', () => {
    searchQuery = filterInput.value.toLowerCase().trim();
    applyFilters();
  });

  // Category Filter
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category') || 'all';
      currentCategory = cat;
      localStorage.setItem('registry-category', cat);

      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (!main?.classList.contains('is-flat') && cat !== 'all') {
        scrollToCategory(cat);
      }

      applyFilters();
    });
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      filterInput.focus();
    }
  });

  // Initialize from saved state
  if (currentCategory !== 'all') {
    const activeBtn = document.querySelector(`.category-btn[data-category="${currentCategory}"]`);
    if (activeBtn) {
      categoryButtons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const label = document.querySelector('#category-dropdown .current-value');
      if (label) label.textContent = activeBtn.textContent;
    }
    applyFilters();
  }
}
