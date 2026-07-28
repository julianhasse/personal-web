(() => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('jh-theme');
  root.dataset.theme = storedTheme || 'light';

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('jh-theme', root.dataset.theme);
    });
  });

  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#site-nav');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
  });

  let searchable = [];
  let loadedArticles = [];
  let loadedProjects = [];

  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);

  function formatDate(value) {
    if (!value) return '';
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  }


  function projectHref(project) {
    return project.external_url || `article.html?type=work&post=${encodeURIComponent(project.slug)}`;
  }

  function projectAccent(project) {
    if (project.card_accent) return project.card_accent;
    const terms = [project.type, ...(project.categories || [])].join(' ').toLowerCase();
    if (terms.includes('health')) return '#7d93ad';
    if (terms.includes('music') || terms.includes('album')) return '#ad906f';
    if (terms.includes('ai') || terms.includes('technology')) return '#8b82a8';
    if (terms.includes('writing') || terms.includes('publication')) return '#858581';
    return '#8d9690';
  }

  function projectCategories(project) {
    const values = [project.type, ...(project.categories || [])]
      .map((value) => String(value || '').trim())
      .filter(Boolean);
    return [...new Set(values.map((value) => value.toUpperCase()))].join(' · ');
  }


  async function loadWork() {
    const grid = document.querySelector('#project-grid');
    if (!grid || !window.JH_CONTENT) return;
    try {
      const projects = await window.JH_CONTENT.listProjects();
      loadedProjects = projects;
      if (!projects.length) {
        grid.innerHTML = '<p class="content-status">No featured work projects found.</p>';
        return;
      }
      const limit = window.JH_SITE_CONFIG?.projectsPerPage || projects.length;
      grid.innerHTML = projects.slice(0, limit).map((project) => {
        const href = projectHref(project);
        const summary = project.card_summary || project.summary || project.description || '';
        const footerLabel = project.year || project.status || 'View project';
        return `
        <article class="project-card" data-filter="${escapeHtml([project.type, ...(project.categories || [])].join(' '))}" style="--project-accent:${escapeHtml(projectAccent(project))}">
          <a class="project-card-link" href="${escapeHtml(href)}" aria-label="Open ${escapeHtml(project.title)} project">
            <p class="project-categories">${escapeHtml(projectCategories(project))}</p>
            <div class="project-rule" aria-hidden="true"></div>
            <h3>${escapeHtml(project.title)}</h3>
            ${summary ? `<p class="project-summary">${escapeHtml(summary)}</p>` : ''}
            <div class="project-footer">
              <span>${escapeHtml(footerLabel)}</span>
              <span class="project-arrow" aria-hidden="true">→</span>
            </div>
          </a>
        </article>`;
      }).join('');
      rebuildSearch();
    } catch (error) {
      grid.innerHTML = `<div class="content-error"><strong>Projects could not load.</strong><p>${escapeHtml(error.message)}</p></div>`;
    }
  }

  function rebuildSearch() {
    searchable = [
      ...loadedArticles.map((article) => ({
        title: article.title,
        type: `Writing${article.tags[0] ? ` · ${article.tags[0]}` : ''}`,
        tags: article.tags.join(' '),
        href: `article.html?post=${encodeURIComponent(article.slug)}`
      })),
      ...loadedProjects.map((project) => ({
        title: project.title,
        type: `Work${project.type ? ` · ${project.type}` : ''}`,
        tags: project.categories.join(' '),
        href: projectHref(project)
      }))
    ];
  }

  async function loadWriting() {
    const list = document.querySelector('#article-list');
    if (!list || !window.JH_CONTENT) return;
    try {
      const articles = await window.JH_CONTENT.listArticles();
      loadedArticles = articles;
      if (!articles.length) {
        list.innerHTML = '<p class="content-status">No published Markdown articles found.</p>';
        return;
      }
      const limit = window.JH_SITE_CONFIG?.articlesPerPage || articles.length;
      list.innerHTML = articles.slice(0, limit).map((article, index) => `
        <article class="article-row" data-title="${escapeHtml(article.title)}" data-tags="${escapeHtml(article.tags.join(' '))}">
          <a href="article.html?post=${encodeURIComponent(article.slug)}">
            <span class="article-index">${String(index + 1).padStart(2, '0')}</span>
            <h3>${escapeHtml(article.title)}</h3>
            <time datetime="${escapeHtml(article.date || '')}">${escapeHtml(formatDate(article.date))}</time>
            <span class="article-arrow">↗</span>
          </a>
        </article>`).join('');
      rebuildSearch();
    } catch (error) {
      list.innerHTML = `<div class="content-error"><strong>Writing could not load.</strong><p>${escapeHtml(error.message)}</p></div>`;
    }
  }

  const searchDialog = document.querySelector('#search-dialog');
  const searchInput = document.querySelector('#site-search');
  const resultsNode = document.querySelector('#search-results');
  function renderSearch(query = '') {
    if (!resultsNode) return;
    const normalized = query.trim().toLowerCase();
    const matches = searchable.filter((item) => `${item.title} ${item.type} ${item.tags}`.toLowerCase().includes(normalized));
    resultsNode.innerHTML = matches.length
      ? matches.map((item) => `<a class="search-result" href="${item.href}"><span>${escapeHtml(item.title)}</span><small>${escapeHtml(item.type)}</small></a>`).join('')
      : '<p class="empty-state">No results. Try another word.</p>';
  }

  document.querySelectorAll('[data-open-search]').forEach((button) => button.addEventListener('click', () => {
    renderSearch();
    searchDialog?.showModal();
    setTimeout(() => searchInput?.focus(), 50);
  }));
  document.querySelector('[data-close-search]')?.addEventListener('click', () => searchDialog?.close());
  searchDialog?.addEventListener('click', (event) => { if (event.target === searchDialog) searchDialog.close(); });
  searchInput?.addEventListener('input', (event) => renderSearch(event.target.value));

  const newsletter = document.querySelector('#newsletter-form');
  newsletter?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = newsletter.querySelector('.form-status');
    const email = new FormData(newsletter).get('email');
    status.textContent = `Thanks — ${email} has been added to the prototype list.`;
    newsletter.reset();
  });

  const terminal = document.querySelector('#terminal-panel');
  const terminalOutput = document.querySelector('#terminal-output');
  const terminalInput = document.querySelector('#terminal-command');
  const terminalForm = document.querySelector('#terminal-form');
  const commands = {
    help: 'Commands: about, work, writing, music, random, clear, close',
    about: 'Julian is a designer, developer, writer, and musician based in North Carolina.',
    work: 'Opening projects…',
    writing: 'Opening writing archive…',
    music: 'Neon Transit — composition, production, and art direction.'
  };
  const openTerminal = () => { terminal?.classList.add('is-open'); terminal?.setAttribute('aria-hidden', 'false'); setTimeout(() => terminalInput?.focus(), 50); };
  const closeTerminal = () => { terminal?.classList.remove('is-open'); terminal?.setAttribute('aria-hidden', 'true'); };
  document.querySelectorAll('[data-terminal-toggle]').forEach((button) => button.addEventListener('click', openTerminal));
  document.querySelector('[data-terminal-close]')?.addEventListener('click', closeTerminal);
  terminalForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const command = terminalInput.value.trim().toLowerCase();
    if (!command) return;
    terminalOutput.insertAdjacentHTML('beforeend', `<p><b>$ ${escapeHtml(command)}</b></p>`);
    if (command === 'clear') terminalOutput.innerHTML = '';
    else if (command === 'close') closeTerminal();
    else if (command === 'random') {
      const articles = searchable.filter((item) => item.type.startsWith('Writing'));
      const article = articles[Math.floor(Math.random() * articles.length)];
      terminalOutput.insertAdjacentHTML('beforeend', `<p>${article ? `Random article: <a href="${article.href}">${escapeHtml(article.title)}</a>` : 'No articles loaded yet.'}</p>`);
    } else {
      terminalOutput.insertAdjacentHTML('beforeend', `<p>${commands[command] || `Command not found: ${escapeHtml(command)}`}</p>`);
      if (command === 'work') document.querySelector('#work')?.scrollIntoView();
      if (command === 'writing') document.querySelector('#writing')?.scrollIntoView();
    }
    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });

  loadWriting();
  loadWork();
})();
