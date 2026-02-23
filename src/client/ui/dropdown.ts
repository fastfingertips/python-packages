export function initDropdowns() {
  const dropdowns = document.querySelectorAll('.custom-dropdown');

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const items = dropdown.querySelectorAll('.dropdown-item');
    const currentValue = dropdown.querySelector('.current-value');

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = dropdown.classList.contains('active');
      // Close others
      document.querySelectorAll('.custom-dropdown').forEach((d) => {
        if (d !== dropdown) d.classList.remove('active');
      });
      dropdown.classList.toggle('active');
    });

    items.forEach((item) => {
      item.addEventListener('click', () => {
        if (currentValue && item.textContent) {
          currentValue.textContent = item.textContent;
        }
        dropdown.classList.remove('active');
      });
    });
  });

  window.addEventListener('click', () => {
    document.querySelectorAll('.custom-dropdown').forEach((d) => d.classList.remove('active'));
  });
}
