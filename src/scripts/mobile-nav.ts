/**
 * Mobile Navigation: hamburger toggle, focus trapping, aria states, responsive dismiss
 */
export function initMobileNav(): void {
  const toggleBtn = document.querySelector<HTMLButtonElement>('#mobile-menu-toggle');
  const navMenu = document.querySelector<HTMLElement>('#mobile-nav-drawer');
  const overlay = document.querySelector<HTMLElement>('#mobile-nav-overlay');
  const menuLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-nav-link');

  if (!toggleBtn || !navMenu) return;

  const openMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
    if (overlay) overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';

    // Focus first link in drawer
    const firstLink = navMenu.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();
  };

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    toggleBtn.focus();
  };

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
}
