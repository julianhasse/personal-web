(() => {
  const config = window.JH_SITE_CONFIG?.github || {};
  const required = ['owner', 'repo', 'branch', 'contentPath'];

  function configured() {
    return required.every((key) => config[key] && !String(config[key]).startsWith('YOUR_'));
  }

  function apiUrl(path = '') {
    const encodedPath = path.split('/').filter(Boolean).map(encodeURIComponent).join('/');
    return `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${encodedPath}?ref=${encodeURIComponent(config.branch)}`;
  }

  function rawUrl(path) {
    return `https://raw.githubusercontent.com/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/${encodeURIComponent(config.branch)}/${path.split('/').map(encodeURIComponent).join('/')}`;
  }

  async function request(url) {
    const response = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) {
      const message = response.status === 403
        ? 'GitHub API rate limit reached. Try again later.'
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

  function parseMarkdown(markdown, fallbackSlug = '') {
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
    const tags = Array.isArray(data.tags)
      ? data.tags
      : String(data.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean);

    return {
      ...data,
      slug: data.slug || fallbackSlug,
      title: data.title || firstHeading || fallbackSlug.replace(/-/g, ' '),
      description: data.description || data.excerpt || `${plain.slice(0, 180)}${plain.length > 180 ? '…' : ''}`,
      tags,
      reading: data.reading || `${Math.max(1, Math.ceil(wordCount / 220))} min read`,
      body
    };
  }

  async function listArticles() {
    if (!configured()) throw new Error('GitHub repository is not configured yet. Edit assets/config.js once.');
    const response = await request(apiUrl(config.contentPath));
    const entries = await response.json();
    if (!Array.isArray(entries)) throw new Error('The configured content path is not a directory.');

    const files = entries.filter((entry) => entry.type === 'file' && entry.name.toLowerCase().endsWith('.md'));
    const articles = await Promise.all(files.map(async (file) => {
      const slug = file.name.replace(/\.md$/i, '');
      const markdownResponse = await request(file.download_url || rawUrl(file.path));
      const markdown = await markdownResponse.text();
      return { ...parseMarkdown(markdown, slug), path: file.path, sha: file.sha };
    }));

    return articles
      .filter((article) => article.draft !== true && article.status !== 'draft')
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  async function getArticle(slug) {
    if (!configured()) throw new Error('GitHub repository is not configured yet. Edit assets/config.js once.');
    const safeSlug = String(slug || '').replace(/[^a-z0-9-_]/gi, '');
    if (!safeSlug) throw new Error('Invalid article name.');
    const path = `${config.contentPath.replace(/\/$/, '')}/${safeSlug}.md`;
    const response = await request(rawUrl(path));
    const markdown = await response.text();
    return parseMarkdown(markdown, safeSlug);
  }

  window.JH_CONTENT = { configured, listArticles, getArticle, parseMarkdown, rawUrl };
})();
