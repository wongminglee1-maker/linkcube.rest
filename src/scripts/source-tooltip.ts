/**
 * Source Tooltip & Modal details viewer
 */
export function initSourceTooltip(): void {
  const triggerButtons = document.querySelectorAll<HTMLElement>('.source-tooltip-trigger');
  const modal = document.querySelector<HTMLElement>('#source-modal');
  const modalClose = document.querySelector<HTMLElement>('#source-modal-close');
  const modalContent = document.querySelector<HTMLElement>('#source-modal-body');

  if (!triggerButtons.length || !modal) return;

  const openModal = (data: Record<string, string>) => {
    if (modalContent) {
      modalContent.innerHTML = `
        <div class="source-modal-header">
          <span class="status-badge ${data.statusClass || 'status-reference'}">${data.status || '待核验'}</span>
          <h3 style="margin-top:0.75rem; color:var(--text-light); font-size:1.15rem;">${data.title || '数据来源明细'}</h3>
        </div>
        <div style="margin-top:1rem; display:flex; flex-direction:column; gap:0.6rem; font-size:0.875rem;">
          <div><strong style="color:var(--accent-cyan);">来源站点：</strong>${data.source || '公开文档'}</div>
          <div><strong style="color:var(--accent-cyan);">原始链接：</strong><a href="${data.url}" target="_blank" rel="noopener noreferrer" style="word-break:break-all;">${data.url}</a></div>
          <div><strong style="color:var(--accent-cyan);">核验时间：</strong>${data.verifiedDate || '2026-10-31'}</div>
          <div><strong style="color:var(--accent-cyan);">字段说明：</strong>${data.fields || '通用网络拓扑与场景参考'}</div>
          <div><strong style="color:var(--accent-cyan);">适用限制：</strong>${data.limits || '仅供参考，不作为本站节点实测凭证'}</div>
        </div>
      `;
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modalClose?.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  triggerButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dataset = btn.dataset;
      openModal({
        title: dataset.sourceTitle || '',
        source: dataset.sourceName || '',
        url: dataset.sourceUrl || '',
        verifiedDate: dataset.sourceDate || '',
        status: dataset.sourceStatus || '',
        statusClass: dataset.sourceStatusClass || '',
        fields: dataset.sourceFields || '',
        limits: dataset.sourceLimits || ''
      });
    });
  });

  modalClose?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSourceTooltip);
  } else {
    initSourceTooltip();
  }
}
