# Editorial OS v1

Editorial OS is a browser-based Markdown editor for this website. It lives at:

```text
https://julianhasse.com/editor.html
```

It does not replace the public site or its renderer. It reads and writes the existing Markdown files in:

```text
content/writing/
content/work/
```

## What v1 includes

- Browse and search articles and projects
- Create new entries
- Edit title, description, date, topics, cover image, alt text, draft and featured metadata
- Markdown formatting toolbar
- Write, Preview and Split modes
- Reading-time calculation
- Frontmatter validation
- Save draft or publish directly to GitHub
- Existing unknown frontmatter fields are preserved
- No database and no build process

## GitHub authentication

This first version uses a fine-grained personal access token because a fully static site cannot safely store a GitHub OAuth client secret.

Create a token in GitHub with:

- Repository access: `julianhasse/personal-web` only
- Repository permission: **Contents: Read and write**

When Editorial OS asks for the token, it is used only for requests to `api.github.com`. If “Keep token for this browser session” is selected, it is stored in `sessionStorage` and disappears when that browser session ends.

Never commit a token into `config.js`, JavaScript, HTML, or Markdown.

## Publishing behavior

**Save draft** writes `draft: true` to the frontmatter.

**Publish** writes `draft: false` and commits the Markdown file to the configured GitHub branch.

The current public website may still display draft entries unless its listing code explicitly filters `draft: true`. That filtering can be added as the next improvement.

## Recommended deployment

Upload these new files with the rest of the site:

```text
editor.html
assets/editor.css
assets/editor.js
EDITORIAL-OS-SETUP.md
```

The editor page includes `noindex,nofollow` to discourage search-engine indexing. The token is still the real security boundary, so do not share it.

## Planned next versions

- Image upload and optimization
- Autosave and revision history
- Draft filtering on the public website
- Exact public-site preview styles
- Link checker and SEO checks
- Buttondown newsletter publishing
- GitHub OAuth through a small secure serverless endpoint
- AI-assisted editing
