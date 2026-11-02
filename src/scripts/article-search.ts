/**
 * Article Search & Filtering for Guides Center
 */
export function initArticleSearch(): void {
  const searchInput = document.querySelector<HTMLInputElement>('#article-search-input');
  const articleCards = document.querySelectorAll<HTMLElement>('.article-card-item');
  const countIndicator = document.querySelector<HTMLElement>('#article-match-count');
  const emptyState = document.querySelector<HTMLElement>('#article-empty-search');

  if (!searchInput || !articleCards.length) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let matches = 0;

    articleCards.forEach((card) => {
      const title = card.getAttribute('data-article-title')?.toLowerCase() || '';
      const summary = card.getAttribute('data-article-summary')?.toLowerCase() || '';
      const tag = card.getAttribute('data-article-tags')?.toLowerCase() || '';

      const isMatch = !query || title.includes(query) || summary.includes(query) || tag.includes(query);
      card.style.display = isMatch ? '' : 'none';
      if (isMatch) matches++;
    });

    if (countIndicator) {
      countIndicator.textContent = query ? `匹配到 ${matches} 篇相关文章` : `全部 ${articleCards.length} 篇技术指南`;
    }

    if (emptyState) {
      emptyState.style.display = matches === 0 ? 'block' : 'none';
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArticleSearch);
  } else {
    initArticleSearch();
  }
}
