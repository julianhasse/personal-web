# Editorial Dashboard

This repository is configured for Pages CMS, a browser-based editorial dashboard that edits the Markdown files in GitHub directly.

## What this adds

- A searchable article and project dashboard
- A WYSIWYG-style editor with optional Markdown source mode
- Cover-image and inline-image uploads
- Draft and featured controls
- Frontmatter fields and validation
- Automatic Git commits whenever an entry is saved
- No database and no proprietary content format

Your public website remains unchanged: it still reads Markdown from `content/writing` and `content/work`.

## First-time setup

1. Commit and push `.pages.yml` to the root of the `personal-web` repository.
2. Open the hosted Pages CMS application at `app.pagescms.org`.
3. Sign in with GitHub.
4. Install the Pages CMS GitHub App and grant it access to `julianhasse/personal-web`.
5. Select the repository and the `main` branch.
6. Open **Editorial → Articles** or **Editorial → Projects**.

## Publishing an article

1. Select **Articles → New**.
2. Enter the title. Pages CMS generates a URL-safe Markdown filename from it.
3. Enter the publication date, description, and topics.
4. Upload an optional cover image and write useful alt text.
5. Write in the visual editor. Use the **Source** switch when direct Markdown editing is useful.
6. Keep **Draft** enabled while working.
7. Save as often as needed. Each save becomes a Git commit.
8. Disable **Draft** and save when the article is ready to publish.

The public URL uses the generated filename:

```text
https://julianhasse.com/article.html?post=article-slug
```

## Images

Uploaded images are stored in the repository:

```text
assets/images/writing/
assets/images/projects/
```

Pages CMS writes public paths beginning with `/assets/images/`, which work from both the homepage and article pages.

## Draft behavior

The website already excludes entries with either:

```yaml
draft: true
```

or:

```yaml
status: draft
```

A draft can therefore remain safely in GitHub without appearing in the public lists.

## Reading time

Leave **Reading time override** blank. The website calculates reading time automatically at roughly 220 words per minute. Use the field only when you deliberately want a custom value.

## Cache freshness

`assets/github-content.js` now requests article data with browser caching disabled and adds a unique query value when loading an individual Markdown file. A newly published article should therefore appear without waiting for a stale browser or raw-content cache to expire.

## Important limitation

Saving in Pages CMS commits directly to GitHub. Because the live site reads the `main` branch, disabling **Draft** publishes immediately. A later phase can introduce an editorial branch and pull-request approval workflow if you want a separate Review → Publish step.
