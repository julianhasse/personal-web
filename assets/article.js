(async () => {
  const target = document.querySelector('#article-content');
  if (!target || !window.JH_CONTENT) return;
  const params = new URLSearchParams(location.search);
  const post = params.get('post') || '';
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);
  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
  };

  try {
    const article = await window.JH_CONTENT.getArticle(post);
    document.title = `${article.title} | Julian Hasse`;
    const description = document.querySelector('meta[name="description"]') || document.head.appendChild(document.createElement('meta'));
    description.name = 'description';
    description.content = article.description || '';
    target.innerHTML = `
      <header class="article-header">
        <p class="article-kicker">${escapeHtml(article.tags.join(' · ') || 'Writing')}</p>
        <h1>${escapeHtml(article.title)}</h1>
        <p class="article-deck">${escapeHtml(article.description || '')}</p>
        <div class="article-byline"><span>${escapeHtml(article.author || 'Julian Hasse')}</span><time datetime="${escapeHtml(article.date || '')}">${escapeHtml(formatDate(article.date))}</time><span>${escapeHtml(article.reading)}</span></div>
      </header>
      ${article.cover ? `<figure class="article-cover"><img src="${escapeHtml(article.cover)}" alt=""></figure>` : ''}
      <article class="article-body">${marked.parse(article.body)}</article>`;
  } catch (error) {
    target.innerHTML = `<div class="article-loading"><h1>Article unavailable</h1><p>${escapeHtml(error.message)}</p><p><a href="index.html#writing">Return to writing</a></p></div>`;
  }
})();
