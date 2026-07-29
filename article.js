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
    navLink.textContent = contentType === 'work' ? 'All projects' : 'All writing';
  }

  const displayText = (value) => {
    if (value === null || value === undefined) return '';
    const text = String(value).trim();
    return /^(?:nan|null|none|undefined)$/i.test(text) ? '' : text;
  };

  function renderWriting(article) {
    const deck = displayText(article.description);
    return `
      <header class="article-header">
        <p class="article-kicker">${escapeHtml(article.tags.join(' · ') || 'Writing')}</p>
        <h1>${escapeHtml(article.title)}</h1>
        ${deck ? `<p class="article-deck">${escapeHtml(deck)}</p>` : ''}
        <div class="article-byline"><span>${escapeHtml(article.author || 'Julian Hasse')}</span><time datetime="${escapeHtml(article.date || '')}">${escapeHtml(formatDate(article.date))}</time><span>${escapeHtml(article.reading)}</span></div>
      </header>
      ${article.cover ? `<figure class="article-cover"><img src="${escapeHtml(article.cover)}" alt="${escapeHtml(article.cover_alt || '')}"></figure>` : ''}
      <article class="article-body">${marked.parse(article.body)}</article>
      <footer class="article-end">
        <span class="article-end-mark" aria-hidden="true">✳</span>
        <p>Thanks for reading.</p>
        <a class="text-link" href="index.html#writing">Explore more writing <span>↗</span></a>
      </footer>`;
  }

  function renderWork(project) {
    const deck = displayText(project.summary) || displayText(project.description);
    const facts = [
      ['Role', project.role],
      ['Client', project.client],
      ['Duration', project.duration || project.year],
      ['Status', project.status]
    ].filter(([, value]) => displayText(value));
    const categories = project.categories.length ? project.categories : [project.type || 'Project'];
    const hero = displayText(project.cover);
    const heroAlt = displayText(project.cover_alt) || project.title;

    return `
      <div class="work-layout">
        <aside class="work-sidebar">
          <header class="article-header work-header">
            <p class="article-kicker">${escapeHtml(categories.join(' · '))}</p>
            <h1>${escapeHtml(project.title)}</h1>
            ${deck ? `<p class="article-deck">${escapeHtml(deck)}</p>` : ''}
          </header>
          ${facts.length ? `<dl class="project-facts">${facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(displayText(value))}</dd></div>`).join('')}</dl>` : ''}
        </aside>

        <main class="work-main">
          ${hero ? `<figure class="article-cover work-cover"><img src="${escapeHtml(hero)}" alt="${escapeHtml(heroAlt)}"></figure>` : ''}
          <article class="article-body work-body">${marked.parse(project.body)}</article>
          ${project.external_url ? `<p class="work-cta"><a class="text-link" href="${escapeHtml(project.external_url)}" target="_blank" rel="noreferrer">Visit project <span>↗</span></a></p>` : ''}
        </main>
      </div>`;
  }

  function initializeReadingProgress() {
    const bar = document.querySelector('.reading-progress span');
    const article = document.querySelector('.article-body');
    if (!bar || !article) return;

    const update = () => {
      const start = article.offsetTop;
      const end = start + article.offsetHeight - window.innerHeight;
      const progress = end <= start ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      bar.style.transform = `scaleX(${progress})`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  try {
    const content = await window.JH_CONTENT.getContent(type, post);
    setNavigation(type);
    document.title = `${content.title} | Julian Hasse`;
    const description = document.querySelector('meta[name="description"]') || document.head.appendChild(document.createElement('meta'));
    description.name = 'description';
    description.content = content.description || content.summary || '';
    target.classList.toggle('work-page', type === 'work');
    document.body.classList.toggle('work-reading-mode', type === 'work');
    target.innerHTML = type === 'work' ? renderWork(content) : renderWriting(content);
    if (type === 'writing') initializeReadingProgress();
  } catch (error) {
    const label = type === 'work' ? 'Project' : 'Article';
    target.innerHTML = `<div class="article-loading"><h1>${label} unavailable</h1><p>${escapeHtml(error.message)}</p><p><a href="index.html#${type === 'work' ? 'work' : 'writing'}">Return to ${type === 'work' ? 'projects' : 'writing'}</a></p></div>`;
  }
})();
