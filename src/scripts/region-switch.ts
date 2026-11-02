/**
 * Region Switcher: handles tabs, accessible keyboard arrow navigation, and data updates
 */
export function initRegionSwitch(): void {
  const tabList = document.querySelector<HTMLElement>('[role="tablist"].data-panel-tabs');
  if (!tabList) return;

  const tabs = Array.from(tabList.querySelectorAll<HTMLElement>('[role="tab"]'));

  tabs.forEach((tab, index) => {
    tab.addEventListener('keydown', (e: KeyboardEvent) => {
      let targetIndex: number | null = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = tabs.length - 1;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        tabs[targetIndex].focus();
        tabs[targetIndex].click();
      }
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRegionSwitch);
  } else {
    initRegionSwitch();
  }
}
