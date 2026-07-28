(async () => {
  const target = document.querySelector('#article-content');
  if (!target || !window.JH_CONTENT) return;

  const params = new URLSearchParams(location.search);
  const post = params.get('post') || '';
  const type = params.get('type') === 'work' ? 'work' : 'writing';
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);
  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
  };

  function setNavigation(contentType) {
    const navLink = document.querySelector('.article-nav a');
    if (!navLink) return;
    navLink.href = contentType === 'work' ? 'index.html#work' : 'index.html#writing';
    navLink.textContent = contentType === 'work' ? 'All work' : 'All writing';
  }

  function renderWriting(article) {
    return `
      <header class="article-header">
        <p class="article-kicker">${escapeHtml(article.tags.join(' · ') || 'Writing')}</p>
        <h1>${escapeHtml(article.title)}</h1>
        <p class="article-deck">${escapeHtml(article.description || '')}</p>
        <div class="article-byline"><span>${escapeHtml(article.author || 'Julian Hasse')}</span><time datetime="${escapeHtml(article.date || '')}">${escapeHtml(formatDate(article.date))}</time><span>${escapeHtml(article.reading)}</span></div>
      </header>
      ${article.cover ? `<figure class="article-cover"><img src="${escapeHtml(article.cover)}" alt="${escapeHtml(article.cover_alt || '')}"></figure>` : ''}
      <article class="article-body">${marked.parse(article.body)}</article>`;
  }

  function renderWork(project) {
    const facts = [
      ['Role', project.role],
      ['Client', project.client],
      ['Duration', project.duration || project.year],
      ['Status', project.status]
    ].filter(([, value]) => value);
    const categories = project.categories.length ? project.categories : [project.type || 'Selected work'];
    const coverStyle = [
      project.accent ? `--project-accent:${escapeHtml(project.accent)}` : '',
      project.text_color ? `--project-text:${escapeHtml(project.text_color)}` : ''
    ].filter(Boolean).join(';');

    return `
      <header class="article-header work-header">
        <p class="article-kicker">${escapeHtml(categories.join(' · '))}</p>
        <h1>${escapeHtml(project.title)}</h1>
        <p class="article-deck">${escapeHtml(project.summary || project.description || '')}</p>
        ${facts.length ? `<dl class="project-facts">${facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>` : ''}
      </header>
      <figure class="article-cover work-cover" style="${coverStyle}">
        ${project.cover ? `<img src="${escapeHtml(project.cover)}" alt="${escapeHtml(project.cover_alt || '')}">` : `<span class="project-monogram">${escapeHtml(project.monogram || project.title.slice(0, 2).toUpperCase())}</span>`}
      </figure>
      <article class="article-body work-body">${marked.parse(project.body)}</article>
      ${project.external_url ? `<p class="work-cta"><a class="text-link" href="${escapeHtml(project.external_url)}" target="_blank" rel="noreferrer">Visit project <span>↗</span></a></p>` : ''}`;
  }

  try {
    const content = await window.JH_CONTENT.getContent(type, post);
    setNavigation(type);
    document.title = `${content.title} | Julian Hasse`;
    const description = document.querySelector('meta[name="description"]') || document.head.appendChild(document.createElement('meta'));
    description.name = 'description';
    description.content = content.description || content.summary || '';
    target.innerHTML = type === 'work' ? renderWork(content) : renderWriting(content);
  } catch (error) {
    const label = type === 'work' ? 'Project' : 'Article';
    target.innerHTML = `<div class="article-loading"><h1>${label} unavailable</h1><p>${escapeHtml(error.message)}</p><p><a href="index.html#${type === 'work' ? 'work' : 'writing'}">Return to ${type === 'work' ? 'work' : 'writing'}</a></p></div>`;
  }
})();
