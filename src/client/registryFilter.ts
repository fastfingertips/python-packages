export function initRegistryFilter() {
  const filterInput = document.getElementById('registry-filter') as HTMLInputElement;
  const categoryButtons = document.querySelectorAll('.category-btn');
  const libItems = document.querySelectorAll('.lib-item');
  const sections = document.querySelectorAll('section');
  const main = document.getElementById('registry-main');

  if (!filterInput) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    const isFlat = main?.classList.contains('is-flat');

    libItems.forEach((item) => {
      const name = (item.getAttribute('data-name') || '').toLowerCase();
      const desc = (item.querySelector('.lib-desc')?.textContent || '').toLowerCase();
      const itemCategory = item.getAttribute('data-category');
      
      const matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery);
      const matchesCategory = currentCategory === 'all' || itemCategory === currentCategory;

      const shouldShow = matchesSearch && matchesCategory;
      (item as HTMLElement).style.display = shouldShow ? 'grid' : 'none';
    });

    // Handle section visibility in non-flat mode
    if (!isFlat) {
      sections.forEach((section) => {
        const sectionId = section.getAttribute('id');
        const sectionCat = section.querySelector('h2')?.textContent || '';
        
        // If searching or category is 'all', show sections that have visible items
        // If a specific category is selected and we are NOT in flat mode, we might want to just scroll
        const hasVisibleItems = Array.from(section.querySelectorAll('.lib-item')).some(
          (item) => (item as HTMLElement).style.display !== 'none'
        );
        section.style.display = hasVisibleItems ? 'block' : 'none';
      });
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

      const label = document.querySelector('#category-dropdown .current-value');
      if (label) label.textContent = btn.textContent;

      const isFlat = main?.classList.contains('is-flat');
      
      if (!isFlat && cat !== 'all') {
        const targetId = cat.toLowerCase().replace('/', '-');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const navHeight = 44 + 60; // navbar + controls
          window.scrollTo({
            top: targetEl.offsetTop - navHeight,
            behavior: 'smooth'
          });
        }
      }

      applyFilters();
    });
  });

  // Handle Cmd+K to focus
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      filterInput.focus();
    }
  });

  // Apply saved category on init
  const savedCategory = localStorage.getItem('registry-category') || 'all';
  if (savedCategory !== 'all') {
    currentCategory = savedCategory;
    const activeBtn = document.querySelector(`.category-btn[data-category="${savedCategory}"]`);
    if (activeBtn) {
      categoryButtons.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
      const label = document.querySelector('#category-dropdown .current-value');
      if (label) label.textContent = activeBtn.textContent;
    }
    applyFilters();
  }
}
