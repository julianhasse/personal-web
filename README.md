# Julian Hasse | Creator — GitHub Markdown Edition

This version uses GitHub as a lightweight, read-only content API. There is no CMS, PHP, Node build, database, or manually maintained article array.

## One-time setup

Open `assets/config.js` and enter:

```js
window.JH_SITE_CONFIG = {
  github: {
    owner: 'julianhasse',
    repo: 'your-repository-name',
    branch: 'main',
    contentPath: 'content'
  },
  articlesPerPage: 50
};
```

The repository must be public. Never place a GitHub personal access token in browser JavaScript.

## Publish an article

1. Add a `.md` file to `/content` in the configured GitHub repository.
2. Commit it through GitHub.com, GitHub Desktop, or Git.
3. Refresh the website.

The homepage and search discover the file automatically.

## Markdown format

```md
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

# Git for Designers

Your article begins here.
```

Only `title` and `date` are recommended. Missing description and reading time are generated automatically. The filename becomes the article slug unless `slug` is supplied.

## Images

Commit images to the repository and reference them with a URL the deployed website can reach. For a site hosted from the repository root:

```md
![Diagram](assets/images/git-for-designers/diagram.jpg)
```

A remote image URL also works:

```md
![Diagram](https://example.com/image.jpg)
```

## Important limitations

- GitHub's unauthenticated REST API has a rate limit. This implementation loads the directory once and fetches each Markdown file for the homepage. It is ideal for a modest personal publication, not a high-traffic news site.
- Because credentials cannot safely live in client-side JavaScript, the repository must be public.
- GitHub Pages may take a short time to publish a commit. Raw GitHub content can also be briefly cached.
- The GitHub Contents API returns up to 1,000 files in a directory. That is far above the expected size of this site.

## Local testing

Because the site calls GitHub directly, any simple local server works:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Hosting

Upload the static files to your current host or serve them through GitHub Pages. The content may live in the same public repository or a separate public content repository.
