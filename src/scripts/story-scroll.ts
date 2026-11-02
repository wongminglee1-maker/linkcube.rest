/**
 * Story Scroll: Tracks scrolling through regions and updates active story step and sticky nav tabs
 */
export function initStoryScroll(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll<HTMLElement>('.region-story-card');
  const tabs = document.querySelectorAll<HTMLElement>('.region-nav-tab');

  if (!cards.length) return;

  const setActiveRegion = (regionId: string) => {
    // Update card styling
    cards.forEach((card) => {
      const match = card.getAttribute('data-region') === regionId;
      card.classList.toggle('is-active', match);
    });

    // Update nav tab styling
    tabs.forEach((tab) => {
      const match = tab.getAttribute('data-target-region') === regionId;
      tab.classList.toggle('is-active', match);
      tab.setAttribute('aria-selected', match ? 'true' : 'false');
    });
  };

  // Click handler on navigation tabs
  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-target-region');
      if (!targetId) return;

      setActiveRegion(targetId);

      const targetCard = document.getElementById(`story-${targetId}`);
      if (targetCard) {
        const navHeight = 120; // accounts for main header + sticky sub-nav
        const elementPosition = targetCard.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  // IntersectionObserver to spy on scroll position
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const regionId = entry.target.getAttribute('data-region');
            if (regionId) {
              setActiveRegion(regionId);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.15
      }
    );

    cards.forEach((card) => observer.observe(card));
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoryScroll);
  } else {
    initStoryScroll();
  }
}
