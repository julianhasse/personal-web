(() => {
  'use strict';

  const config = window.JH_SITE_CONFIG?.github;
  if (!config) return;

  const state = {
    type: 'writing', entries: [], filtered: [], current: null,
    token: sessionStorage.getItem('jh_editor_token') || '', dirty: false, mode: 'write'
  };

  const $ = (selector) => document.querySelector(selector);
  const els = {
    list: $('#entry-list'), search: $('#entry-search'), welcome: $('#welcome-panel'), panel: $('#editing-panel'),
    title: $('#field-title'), description: $('#field-description'), date: $('#field-date'), tags: $('#field-tags'),
    cover: $('#field-cover'), coverAlt: $('#field-cover-alt'), draft: $('#field-draft'), featured: $('#field-featured'),
    projectFields: $('#project-fields'), role: $('#field-role'), client: $('#field-client'), duration: $('#field-duration'),
    status: $('#field-status'), projectType: $('#field-project-type'), order: $('#field-order'), externalUrl: $('#field-external-url'),
    year: $('#field-year'), accent: $('#field-accent'), textColor: $('#field-text-color'), monogram: $('#field-monogram'),
    body: $('#markdown-editor'), preview: $('#article-preview'), reading: $('#reading-time'), validation: $('#validation-message'),
    live: $('#view-live-link'), connect: $('#connect-button'), dialog: $('#connect-dialog'), token: $('#github-token'),
    remember: $('#remember-token'), connectSubmit: $('#dialog-connect-button'), connectError: $('#connect-error'),
    saveDraft: $('#save-draft-button'), publish: $('#publish-button'), saveStatus: $('#save-status'), workspace: $('#workspace'),
    documentStatus: $('#document-status'), history: $('#view-history-link')
  };

  const apiBase = `https://api.github.com/repos/${config.owner}/${config.repo}`;
  const pathFor = (type) => config.contentPaths[type];
  const headers = (write = false) => ({
    Accept: 'application/vnd.github+json',
    ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
    ...(write ? { 'Content-Type': 'application/json' } : {}),
    'X-GitHub-Api-Version': '2022-11-28'
  });

  function decodeBase64(value) {
    const bytes = Uint8Array.from(atob(value.replace(/\n/g, '')), c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }
  function encodeBase64(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }
  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[c]);
  }
  function slugify(value) {
    return String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 90) || 'untitled';
  }
  function normalizeDate(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  }
  function displayDate(value) {
    if (!value) return '';
    const text = String(value);
    const d = new Date(text.includes('T') ? text : `${text}T12:00:00`);
    return Number.isNaN(d.getTime()) ? '' : new Intl.DateTimeFormat('en-US', {month:'short', day:'numeric', year:'numeric'}).format(d);
  }
  function localIsoForDate(dateOnly, useCurrentTime = false) {
    const now = new Date();
    const [year, month, day] = String(dateOnly).split('-').map(Number);
    const date = new Date(year, month - 1, day, useCurrentTime ? now.getHours() : 12, useCurrentTime ? now.getMinutes() : 0, useCurrentTime ? now.getSeconds() : 0);
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const pad = value => String(Math.abs(value)).padStart(2, '0');
    return `${dateOnly}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${sign}${pad(Math.trunc(offsetMinutes / 60))}:${pad(offsetMinutes % 60)}`;
  }
  function publicationDate(originalValue, dateOnly, isNew) {
    if (originalValue && String(originalValue).slice(0, 10) === dateOnly && String(originalValue).includes('T')) return originalValue;
    const today = new Date().toLocaleDateString('en-CA');
    return localIsoForDate(dateOnly, Boolean(isNew && dateOnly === today));
  }
  function resolveAssetUrl(value) {
    const path = String(value || '').trim();
    if (!path || /^(?:https?:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) return path;
    const base = String(window.JH_SITE_CONFIG?.siteUrl || window.location.origin).replace(/\/$/, '');
    return `${base}/${path.replace(/^\.?\//, '')}`;
  }
  function parseScalar(value) {
    const v = value.trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1,-1).replace(/\\"/g,'"');
    if (/^(true|false)$/i.test(v)) return v.toLowerCase() === 'true';
    return v;
  }
  function parseDocument(text) {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (!match) return { data: {}, body: text };
    const data = {};
    match[1].split('\n').forEach(line => {
      const i = line.indexOf(':');
      if (i < 0) return;
      data[line.slice(0,i).trim()] = parseScalar(line.slice(i+1));
    });
    return { data, body: match[2] };
  }
  function yamlString(value) { return `"${String(value ?? '').replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,' ')}"`; }
  function serializeDocument(data, body) {
    const preferred = ['title','date','updated_at','tags','description','reading','author','cover','cover_alt','draft','featured'];
    if (state.type === 'work') preferred.push('summary','categories','role','client','duration','year','status','external_url','type','order','accent','text_color','monogram');
    const lines = [];
    const seen = new Set();
    preferred.forEach(key => {
      if (!(key in data) || data[key] === '' || data[key] === null || data[key] === undefined) return;
      seen.add(key);
      lines.push(`${key}: ${typeof data[key] === 'boolean' ? data[key] : yamlString(data[key])}`);
    });
    Object.keys(data).forEach(key => {
      if (seen.has(key) || data[key] === '' || data[key] === null || data[key] === undefined) return;
      lines.push(`${key}: ${typeof data[key] === 'boolean' ? data[key] : yamlString(data[key])}`);
    });
    return `---\n${lines.join('\n')}\n---\n\n${body.trim()}\n`;
  }

  async function api(url, options = {}) {
    const response = await fetch(url, { ...options, headers: { ...headers(Boolean(options.body)), ...(options.headers || {}) } });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.message || `GitHub request failed (${response.status})`);
    }
    return response.status === 204 ? null : response.json();
  }

  async function loadEntries() {
    els.list.innerHTML = '<p class="empty-state">Loading content…</p>';
    try {
      const files = await api(`${apiBase}/contents/${pathFor(state.type)}?ref=${encodeURIComponent(config.branch)}`);
      const markdownFiles = files.filter(item => item.type === 'file' && item.name.endsWith('.md') && !item.name.startsWith('_'));
      const details = await Promise.all(markdownFiles.map(async item => {
        try {
          const file = await api(`${apiBase}/contents/${item.path}?ref=${encodeURIComponent(config.branch)}`);
          const parsed = parseDocument(decodeBase64(file.content));
          return { name:item.name, path:item.path, sha:file.sha, title:parsed.data.title || item.name.replace(/\.md$/,''), date:parsed.data.date || '', draft:Boolean(parsed.data.draft), featured:Boolean(parsed.data.featured), data:parsed.data, body:parsed.body };
        } catch { return null; }
      }));
      state.entries = details.filter(Boolean).sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0));
      filterEntries();
    } catch (error) {
      els.list.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
    }
  }

  function filterEntries() {
    const q = els.search.value.trim().toLowerCase();
    state.filtered = state.entries.filter(entry => !q || entry.title.toLowerCase().includes(q) || String(entry.data.tags || '').toLowerCase().includes(q));
    renderList();
  }
  function renderList() {
    if (!state.filtered.length) { els.list.innerHTML = '<p class="empty-state">No matching entries.</p>'; return; }
    els.list.innerHTML = state.filtered.map(entry => `
      <button class="entry-button ${state.current?.path === entry.path ? 'is-active' : ''}" data-path="${escapeHtml(entry.path)}" type="button">
        <span class="entry-title">${escapeHtml(entry.title)}</span>
        <span class="entry-meta">${entry.draft ? '<span class="entry-draft">Draft</span>' : '<span>Published</span>'}<span>${escapeHtml(displayDate(entry.date))}</span></span>
      </button>`).join('');
    els.list.querySelectorAll('.entry-button').forEach(button => button.addEventListener('click', () => selectEntry(button.dataset.path)));
  }

  function selectEntry(path) {
    if (state.dirty && !confirm('Discard unsaved changes?')) return;
    const entry = state.entries.find(item => item.path === path);
    if (!entry) return;
    state.current = { ...entry, isNew:false };
    fillForm(entry.data, entry.body);
    renderList();
  }
  function newEntry() {
    if (state.dirty && !confirm('Discard unsaved changes?')) return;
    state.current = { path:'', sha:'', isNew:true, data:{} };
    fillForm({ date:new Date().toISOString().slice(0,10), draft:true, author:'Julian Hasse' }, '');
    els.title.focus();
  }
  function fillForm(data, body) {
    els.welcome.hidden = true; els.panel.hidden = false;
    els.title.value = data.title || '';
    els.description.value = data.description || data.summary || '';
    els.date.value = normalizeDate(data.date) || new Date().toISOString().slice(0,10);
    els.tags.value = data.tags || data.categories || '';
    els.cover.value = data.cover || '';
    els.coverAlt.value = data.cover_alt || '';
    els.draft.checked = Boolean(data.draft);
    els.featured.checked = Boolean(data.featured);
    els.projectFields.hidden = state.type !== 'work';
    els.role.value = data.role || '';
    els.client.value = data.client || '';
    els.duration.value = data.duration || '';
    els.status.value = data.status || '';
    els.projectType.value = data.type || data.project_type || '';
    els.order.value = data.order ?? '';
    els.externalUrl.value = data.external_url || '';
    els.year.value = data.year || '';
    els.accent.value = data.accent || '';
    els.textColor.value = data.text_color || '';
    els.monogram.value = data.monogram || '';
    els.body.value = body || '';
    updateDocumentStatus();
    autoGrowTitle();
    state.dirty = false;
    updateStatus(); updatePreview(); updateButtons();
  }

  function getWordCount() { return els.body.value.trim() ? els.body.value.trim().split(/\s+/).length : 0; }
  function getReadingTime() { return Math.max(1, Math.ceil(getWordCount()/220)); }
  function collectData(forceDraft) {
    const original = { ...(state.current?.data || {}) };
    const data = {
      ...original,
      title: els.title.value.trim(),
      date: publicationDate(original.date, els.date.value, Boolean(state.current?.isNew)),
      updated_at: new Date().toISOString(),
      tags: els.tags.value.trim(),
      description: els.description.value.trim(),
      reading: `${getReadingTime()} min read`,
      author: original.author || 'Julian Hasse',
      cover: els.cover.value.trim(),
      cover_alt: els.coverAlt.value.trim(),
      draft: forceDraft ?? els.draft.checked,
      featured: els.featured.checked
    };
    if (state.type === 'work') {
      data.summary = data.description;
      data.categories = data.tags;
      data.role = els.role.value.trim();
      data.client = els.client.value.trim();
      data.duration = els.duration.value.trim();
      data.status = els.status.value.trim();
      data.type = els.projectType.value.trim();
      data.order = els.order.value === '' ? '' : Number(els.order.value);
      data.external_url = els.externalUrl.value.trim();
      data.year = els.year.value.trim();
      data.accent = els.accent.value.trim();
      data.text_color = els.textColor.value.trim();
      data.monogram = els.monogram.value.trim();
    }
    return data;
  }
  function validate() {
    const issues = [];
    if (!els.title.value.trim()) issues.push('Add a title');
    if (!els.date.value) issues.push('Add a publication date');
    if (!els.body.value.trim()) issues.push('Article body is empty');
    if (els.cover.value.trim() && !els.coverAlt.value.trim()) issues.push('Add alt text for the cover image');
    return issues;
  }
  function updateDocumentStatus() {
    if (!state.current) return;
    const published = !els.draft.checked && !state.current.isNew;
    els.documentStatus.textContent = state.current.isNew ? 'New entry' : (published ? 'Published' : 'Draft');
    els.documentStatus.classList.toggle('is-published', published);
    els.publish.textContent = state.current.isNew ? 'Publish' : (published ? 'Update article' : 'Publish');
    els.saveDraft.textContent = state.current.isNew ? 'Save draft' : 'Save changes';
  }
  function updateButtons() {
    const connected = Boolean(state.token);
    els.saveDraft.disabled = !connected || !state.current;
    els.publish.disabled = !connected || !state.current;
    els.connect.textContent = connected ? 'GitHub connected' : 'Connect GitHub';
    updateDocumentStatus();
  }
  function updateStatus(message) {
    els.saveStatus.textContent = message || (state.token ? (state.dirty ? 'Unsaved changes' : 'All changes saved') : 'Not connected');
  }
  function markDirty() { state.dirty = true; updateStatus(); updatePreview(); }
  function autoGrowTitle() { els.title.style.height = 'auto'; els.title.style.height = `${els.title.scrollHeight}px`; }

  function updatePreview() {
    const title = escapeHtml(els.title.value.trim() || 'Untitled');
    const deck = escapeHtml(els.description.value.trim());
    const date = escapeHtml(displayDate(els.date.value));
    const tags = escapeHtml(els.tags.value.trim());
    const cover = resolveAssetUrl(els.cover.value.trim());
    const coverAlt = escapeHtml(els.coverAlt.value.trim());
    const html = window.marked ? marked.parse(els.body.value || '') : `<pre>${escapeHtml(els.body.value)}</pre>`;
    els.preview.innerHTML = `<header><p class="eyebrow">${tags || (state.type === 'work' ? 'Project' : 'Writing')}</p><h1>${title}</h1>${deck ? `<p class="preview-deck">${deck}</p>`:''}<p class="preview-meta">Julian Hasse · ${date} · ${getReadingTime()} min read</p></header>${cover ? `<img src="${escapeHtml(cover)}" alt="${coverAlt}">` : ''}${html}`;
    els.reading.textContent = `${getWordCount().toLocaleString()} words · ${getReadingTime()} min read`;
    const issues = validate();
    els.validation.textContent = issues.length ? issues.join(' · ') : 'Ready to publish';
    const slug = state.current?.path ? state.current.path.split('/').pop().replace(/\.md$/,'') : slugify(els.title.value);
    els.live.href = `article.html?${state.type === 'work' ? 'type=work&' : ''}post=${encodeURIComponent(slug)}`;
    els.live.hidden = Boolean(state.current?.isNew);
    if (state.current?.path) {
      els.history.href = `https://github.com/${config.owner}/${config.repo}/commits/${config.branch}/${state.current.path}`;
      els.history.hidden = false;
    } else {
      els.history.hidden = true;
    }
  }

  async function save(forceDraft) {
    if (!state.token) return openConnect();
    const issues = validate();
    if (issues.length && !forceDraft) { alert(`Before publishing:\n\n${issues.join('\n')}`); return; }
    const data = collectData(forceDraft);
    if (forceDraft) els.draft.checked = true;
    else { data.draft = false; els.draft.checked = false; }
    const slug = state.current.path ? state.current.path.split('/').pop().replace(/\.md$/,'') : slugify(data.title);
    const path = state.current.path || `${pathFor(state.type)}/${slug}.md`;
    const content = serializeDocument(data, els.body.value);
    const payload = { message: `${forceDraft ? 'Save draft' : 'Publish'}: ${data.title}`, content: encodeBase64(content), branch: config.branch };
    if (state.current.sha) payload.sha = state.current.sha;
    updateStatus(forceDraft ? 'Saving draft…' : 'Publishing…');
    els.saveDraft.disabled = els.publish.disabled = true;
    try {
      const result = await api(`${apiBase}/contents/${path}`, { method:'PUT', body:JSON.stringify(payload) });
      state.current = { ...state.current, path, sha:result.content.sha, data, body:els.body.value, title:data.title, date:data.date, draft:data.draft, isNew:false };
      state.dirty = false;
      updateStatus(forceDraft ? 'Draft saved' : 'Published');
      await loadEntries();
      updateDocumentStatus();
      updatePreview();
      setTimeout(() => updateStatus(), 1800);
    } catch (error) {
      updateStatus('Save failed'); alert(error.message);
    } finally { updateButtons(); }
  }

  function formatSelection(type) {
    const textarea = els.body;
    const start = textarea.selectionStart, end = textarea.selectionEnd;
    const selected = textarea.value.slice(start,end) || ({link:'link text',image:'Alt text',code:'code'}[type] || 'text');
    const wrappers = {
      h2:[`## `,''], h3:[`### `,''], bold:['**','**'], italic:['_','_'],
      link:['[','](https://)'], quote:['> ',''], list:['- ',''], image:['![','](image-url)'], code:['`','`']
    };
    const [before,after] = wrappers[type];
    textarea.setRangeText(before + selected + after, start, end, 'select');
    textarea.focus(); markDirty();
  }

  function openConnect() { els.connectError.textContent=''; els.token.value=state.token; els.dialog.showModal(); }
  async function connect() {
    const token = els.token.value.trim();
    if (!token) { els.connectError.textContent='Enter a token.'; return; }
    state.token = token;
    try {
      await api('https://api.github.com/user');
      if (els.remember.checked) sessionStorage.setItem('jh_editor_token', token); else sessionStorage.removeItem('jh_editor_token');
      els.dialog.close(); updateButtons(); updateStatus('GitHub connected'); await loadEntries();
    } catch (error) { state.token=''; els.connectError.textContent=error.message; updateButtons(); }
  }

  document.querySelectorAll('.content-tab').forEach(tab => tab.addEventListener('click', async () => {
    if (tab.dataset.type === state.type) return;
    if (state.dirty && !confirm('Discard unsaved changes?')) return;
    state.type = tab.dataset.type; state.current=null; state.dirty=false;
    document.querySelectorAll('.content-tab').forEach(t => t.classList.toggle('is-active', t===tab));
    els.panel.hidden=true; els.welcome.hidden=false; await loadEntries();
  }));
  document.querySelectorAll('.workspace-tab').forEach(tab => tab.addEventListener('click', () => {
    state.mode=tab.dataset.mode;
    document.querySelectorAll('.workspace-tab').forEach(t => t.classList.toggle('is-active',t===tab));
    els.workspace.className=`workspace mode-${state.mode}`; updatePreview();
  }));
  document.querySelectorAll('[data-format]').forEach(button => button.addEventListener('click', () => formatSelection(button.dataset.format)));
  [els.title,els.description,els.date,els.tags,els.cover,els.coverAlt,els.draft,els.featured,els.body,els.role,els.client,els.duration,els.status,els.projectType,els.order,els.externalUrl,els.year,els.accent,els.textColor,els.monogram].forEach(input => input.addEventListener('input', () => { if (input===els.title) autoGrowTitle(); markDirty(); }));
  els.search.addEventListener('input', filterEntries);
  $('#new-entry-button').addEventListener('click', newEntry);
  els.connect.addEventListener('click', openConnect);
  els.connectSubmit.addEventListener('click', connect);
  els.saveDraft.addEventListener('click', () => save(true));
  els.publish.addEventListener('click', () => save(false));
  window.addEventListener('beforeunload', event => { if (state.dirty) { event.preventDefault(); event.returnValue=''; } });

  updateButtons();
  if (state.token) updateStatus('GitHub connected');
  loadEntries();
})();
