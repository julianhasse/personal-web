(() => {
  const github = window.JH_SITE_CONFIG?.github || {};
  const required = ['owner', 'repo', 'branch'];

  function configured() {
    return required.every((key) => github[key] && !String(github[key]).startsWith('YOUR_'));
  }

  function contentPath(type = 'writing') {
    const paths = github.contentPaths || {};
    return paths[type] || (type === 'writing' ? github.contentPath : '') || `content/${type}`;
  }

  function apiUrl(path = '') {
    const encodedPath = path.split('/').filter(Boolean).map(encodeURIComponent).join('/');
    return `https://api.github.com/repos/${encodeURIComponent(github.owner)}/${encodeURIComponent(github.repo)}/contents/${encodedPath}?ref=${encodeURIComponent(github.branch)}`;
  }

  function rawUrl(path, fresh = false) {
    const base = `https://raw.githubusercontent.com/${encodeURIComponent(github.owner)}/${encodeURIComponent(github.repo)}/${encodeURIComponent(github.branch)}/${path.split('/').map(encodeURIComponent).join('/')}`;
    return fresh ? `${base}?v=${Date.now()}` : base;
  }

  async function request(url) {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) {
      const message = response.status === 403
        ? 'GitHub API rate limit reached. Try again later.'
        : response.status === 404
          ? 'Content file or folder not found.'
          : `GitHub request failed (${response.status}).`;
      throw new Error(message);
    }
    return response;
  }

  function unquote(value) {
    const trimmed = value.trim();
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    return trimmed;
  }

  function parseValue(value) {
    const clean = unquote(value);
    if (clean === 'true') return true;
    if (clean === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(clean)) return Number(clean);
    if (clean.startsWith('[') && clean.endsWith(']')) {
      return clean.slice(1, -1).split(',').map((item) => unquote(item)).filter(Boolean);
    }
    return clean;
  }

  function normalizeList(value) {
    if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
    return String(value || '')
      .split(/\s*(?:,|·|\|)\s*/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function parseMarkdown(markdown, fallbackSlug = '', type = 'writing') {
    const normalized = markdown.replace(/^\uFEFF/, '');
    const lines = normalized.split(/\r?\n/);
    const data = {};
    let body = normalized;

    if (lines[0]?.trim() === '---') {
      const closing = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
      if (closing > 0) {
        let activeList = null;
        for (const line of lines.slice(1, closing)) {
          const listMatch = line.match(/^\s*-\s+(.+)$/);
          if (listMatch && activeList) {
            data[activeList].push(parseValue(listMatch[1]));
            continue;
          }
          const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
          if (!field) continue;
          const [, key, value] = field;
          if (!value.trim()) {
            data[key] = [];
            activeList = key;
          } else {
            data[key] = parseValue(value);
            activeList = null;
          }
        }
        body = lines.slice(closing + 1).join('\n').trim();
      }
    }

    const firstHeading = body.match(/^#\s+(.+)$/m)?.[1]?.trim();
    const plain = body
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[#>*_`~-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const wordCount = plain ? plain.split(/\s+/).length : 0;

    return {
      ...data,
      contentType: type,
      slug: data.slug || fallbackSlug,
      title: data.title || firstHeading || fallbackSlug.replace(/-/g, ' '),
      description: data.description || data.summary || data.excerpt || `${plain.slice(0, 180)}${plain.length > 180 ? '…' : ''}`,
      summary: data.summary || data.description || data.excerpt || `${plain.slice(0, 180)}${plain.length > 180 ? '…' : ''}`,
      tags: normalizeList(data.tags),
      categories: normalizeList(data.categories),
      reading: data.reading || `${Math.max(1, Math.ceil(wordCount / 220))} min read`,
      body
    };
  }

  async function listContent(type = 'writing') {
    if (!configured()) throw new Error('GitHub repository is not configured yet. Edit assets/config.js once.');
    const folder = contentPath(type);
    const response = await request(apiUrl(folder));
    const entries = await response.json();
    if (!Array.isArray(entries)) throw new Error(`The configured ${type} path is not a directory.`);

    const files = entries.filter((entry) => entry.type === 'file' && entry.name.toLowerCase().endsWith('.md'));
    const items = await Promise.all(files.map(async (file) => {
      const slug = file.name.replace(/\.md$/i, '');
      const markdownResponse = await request(file.download_url || rawUrl(file.path));
      const markdown = await markdownResponse.text();
      return { ...parseMarkdown(markdown, slug, type), path: file.path, sha: file.sha };
    }));

    return items.filter((item) => item.draft !== true && item.status !== 'draft');
  }

  async function listArticles() {
    const articles = await listContent('writing');
    return articles.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  async function listProjects() {
    const projects = await listContent('work');
    return projects
      .filter((project) => project.featured !== false)
      .sort((a, b) => Number(a.order ?? 999) - Number(b.order ?? 999));
  }

  async function getContent(type = 'writing', slug = '') {
    if (!configured()) throw new Error('GitHub repository is not configured yet. Edit assets/config.js once.');
    const safeType = ['writing', 'work', 'music', 'talks'].includes(type) ? type : 'writing';
    const safeSlug = String(slug || '').replace(/[^a-z0-9-_]/gi, '');
    if (!safeSlug) throw new Error('Invalid content name.');
    const path = `${contentPath(safeType).replace(/\/$/, '')}/${safeSlug}.md`;
    const response = await request(rawUrl(path, true));
    return parseMarkdown(await response.text(), safeSlug, safeType);
  }

  const getArticle = (slug) => getContent('writing', slug);

  window.JH_CONTENT = {
    configured,
    listContent,
    listArticles,
    listProjects,
    getContent,
    getArticle,
    parseMarkdown,
    rawUrl,
    contentPath
  };
})();
