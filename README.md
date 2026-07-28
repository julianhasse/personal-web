# Julian Hasse | Design Technologist — GitHub Markdown Edition

This site uses GitHub as a lightweight, read-only content source. Writing and portfolio projects are stored as separate content types, with no CMS, PHP, Node build, database, or manually maintained article/project arrays.

## Content structure

```text
content/
├── writing/    Essays and articles
└── work/       Portfolio projects and case studies
```

The separation allows each type to use its own frontmatter and rendering while preserving one Markdown-based publishing workflow.

## One-time setup

Open `assets/config.js` and enter your public repository details:

```js
window.JH_SITE_CONFIG = {
  github: {
    owner: 'julianhasse',
    repo: 'your-repository-name',
    branch: 'main',
    contentPaths: {
      writing: 'content/writing',
      work: 'content/work'
    }
  },
  articlesPerPage: 50,
  projectsPerPage: 12
};
```

Never place a GitHub personal access token in browser JavaScript.

## Publish writing

1. Add a `.md` file to `/content/writing`.
2. Commit and push it to GitHub.
3. Refresh the website.

Article URLs remain:

```text
article.html?post=article-slug
```

## Publish selected work

1. Copy `/content/work/_work-template.md`.
2. Rename it using the project slug, such as `new-project.md`.
3. Set `draft: false` or remove the `draft` field.
4. Set `featured: true` for homepage visibility.
5. Commit and push.

Project URLs use:

```text
article.html?type=work&post=project-slug
```

The homepage and search discover both writing and work automatically.

## Writing frontmatter

```yaml
---
title: "Git for Designers"
date: "2026-07-27"
description: "A practical introduction to Git for designers."
tags:
  - Design
  - Git
cover: "assets/images/git-for-designers/cover.jpg"
author: "Julian Hasse"
featured: true
---
```

The filename becomes the slug unless `slug` is supplied. Missing descriptions and reading times are generated automatically.

## Selected Work frontmatter

See `SELECTED-WORK-FRONTMATTER.md` for the full reference. A copy-ready draft template lives at `/content/work/_work-template.md`.

## Images

Commit images to the repository and reference them with a site-accessible path:

```md
![Diagram](assets/images/git-for-designers/diagram.jpg)
```

Remote image URLs also work.

## Limitations

- The repository must be public because credentials cannot safely live in client-side JavaScript.
- GitHub's unauthenticated REST API is rate-limited.
- The Contents API returns up to 1,000 files in a directory.
- This approach is well suited to a personal publication and portfolio, not a high-traffic news site.

## Local testing

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Hosting

Upload the static frontend files to your existing IONOS hosting. The Markdown content is read from the configured GitHub repository.
