/**
 * Chart Filter: handles view toggle (SVG Chart vs Table), and metric/timeslot filters
 */
export function initChartFilters(): void {
  // Toggle between Graphic View and Table View
  const viewToggles = document.querySelectorAll<HTMLElement>('.chart-view-toggle');

  viewToggles.forEach((container) => {
    const buttons = container.querySelectorAll<HTMLButtonElement>('.toggle-view-btn');
    const parentCard = container.closest<HTMLElement>('.chart-card');
    if (!parentCard) return;

    const graphicView = parentCard.querySelector<HTMLElement>('.chart-viewport');
    const tableView = parentCard.querySelector<HTMLElement>('.chart-table-container');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        buttons.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        if (view === 'table') {
          if (graphicView) graphicView.style.display = 'none';
          if (tableView) tableView.style.display = 'block';
        } else {
          if (graphicView) graphicView.style.display = 'flex';
          if (tableView) tableView.style.display = 'none';
        }
      });
    });
  });

  // Filter dropdown listeners (Region / TimeSlot / Metric)
  const regionSelect = document.querySelector<HTMLSelectElement>('#filter-region-select');
  const slotSelect = document.querySelector<HTMLSelectElement>('#filter-slot-select');
  const metricSelect = document.querySelector<HTMLSelectElement>('#filter-metric-select');

  const onFilterChange = () => {
    const regionVal = regionSelect ? regionSelect.value : 'all';
    const slotVal = slotSelect ? slotSelect.value : 'all';
    const metricVal = metricSelect ? metricSelect.value : 'latency';

    const rows = document.querySelectorAll<HTMLElement>('.chart-data-table tbody tr');
    let visibleCount = 0;

    rows.forEach((row) => {
      const rowRegion = row.getAttribute('data-row-region');
      const rowSlot = row.getAttribute('data-row-slot');

      const matchesRegion = regionVal === 'all' || rowRegion === regionVal;
      const matchesSlot = slotVal === 'all' || rowSlot === slotVal;

      if (matchesRegion && matchesSlot) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    // Update empty notice if visible
    const emptyNotice = document.querySelector<HTMLElement>('#filter-empty-message');
    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  if (regionSelect) regionSelect.addEventListener('change', onFilterChange);
  if (slotSelect) slotSelect.addEventListener('change', onFilterChange);
  if (metricSelect) metricSelect.addEventListener('change', onFilterChange);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChartFilters);
  } else {
    initChartFilters();
  }
}
