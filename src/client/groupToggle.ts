import { applySort } from './sorter';

export function initGroupToggle() {
  const groupToggle = document.getElementById('group-toggle');
  const main = document.getElementById('registry-main');
  const flatList = document.getElementById('flat-list');
  const sections = document.querySelectorAll('main section');

  if (!groupToggle || !main || !flatList) return;

  const iconGrouped = groupToggle.querySelector('.icon-grouped') as HTMLElement;
  const iconFlat = groupToggle.querySelector('.icon-flat') as HTMLElement;

  function updateLayout(isFlat: boolean) {
    const allItems = Array.from(document.querySelectorAll('.lib-item'));

    if (isFlat) {
      if (iconGrouped) iconGrouped.style.display = 'none';
      if (iconFlat) iconFlat.style.display = 'block';
      groupToggle?.classList.remove('active');
      main?.classList.add('is-flat');
      flatList!.style.display = 'flex';
      
      // Move items to flat list if needed
      allItems.forEach(item => {
        if (item.parentElement !== flatList) flatList!.appendChild(item);
      });
      sections.forEach(s => (s as HTMLElement).style.display = 'none');
    } else {
      if (iconGrouped) iconGrouped.style.display = 'block';
      if (iconFlat) iconFlat.style.display = 'none';
      groupToggle?.classList.add('active');
      main?.classList.remove('is-flat');
      flatList!.style.display = 'none';

      // Move items back to original sections if needed
      allItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        const targetList = document.querySelector(`.list[data-category="${cat}"]`);
        if (targetList && item.parentElement !== targetList) {
          targetList.appendChild(item);
        }
      });
      sections.forEach(s => (s as HTMLElement).style.display = 'block');
    }
    
    // Ensure sorting is preserved after move
    applySort();
  }

  // Retrieve previous state
  const isFlat = localStorage.getItem('is-flat') === 'true';
  updateLayout(isFlat);

  groupToggle.addEventListener('click', () => {
    const flatActive = !main.classList.contains('is-flat');
    localStorage.setItem('is-flat', flatActive ? 'true' : 'false');
    updateLayout(flatActive);
  });
}
