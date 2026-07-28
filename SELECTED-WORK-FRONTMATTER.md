# Selected Work frontmatter guide

Use one Markdown file per project. Store each published project in `content/work/`. The homepage and search load that directory automatically.

## Complete template

```yaml
---
title: "Project title"
slug: "project-title"
type: "Product"
status: "Ongoing"
year: "2026"
featured: true
order: 1
categories:
  - Product Design
  - Healthcare
  - AI
summary: "A concise one-sentence explanation of the project and its value."
role: "Lead Product Designer"
client: "Organization or Independent"
duration: "2024–Present"
cover: "images/work/project-title-cover.jpg"
cover_alt: "Accessible description of the project cover image"
accent: "#ffd4d8"
text_color: "#5b1534"
external_url: ""
---

# Project title

A brief project introduction.

## Context

Explain the situation, audience, organization, or problem space.

## Challenge

Describe the problem, constraints, and why the work mattered.

## Approach

Explain your process, decisions, collaboration, research, design, development, or production work.

## Outcome

Describe what changed, what shipped, what was learned, or what impact the project created.

## Responsibilities

- Product strategy
- UX and interaction design
- Prototyping
- Front-end development

## Tools

Figma, HTML, CSS, JavaScript, Git, AI tools
```

## Field reference

- `title` — Display name of the project.
- `slug` — URL-safe unique identifier. Use lowercase words separated by hyphens.
- `type` — Primary badge, such as `Product`, `Publication`, `Media`, `Music`, or `Experiment`.
- `status` — Secondary badge, such as `Ongoing`, `Published`, `Shipped`, or `Album`.
- `year` — Four-digit year or a useful label such as `2024–Present`.
- `featured` — Set to `true` for projects shown on the homepage.
- `order` — Numeric display priority. Lower numbers appear first.
- `categories` — Searchable disciplines shown beneath the project title.
- `summary` — One clear sentence for cards, search results, and social metadata.
- `role` — Your contribution or title on the project.
- `client` — Employer, client, publication, or `Independent`.
- `duration` — Project timeframe.
- `cover` — Relative path or full URL for the project image.
- `cover_alt` — Meaningful alternative text for accessibility.
- `accent` — Optional card background color.
- `text_color` — Optional contrasting foreground color.
- `external_url` — Optional destination outside the website.

## Recommended minimum

For a card to work well, always include `title`, `slug`, `type`, `status`, `year`, `featured`, `order`, `categories`, and `summary`. Add the remaining fields when publishing a full case study. Project pages are available at `article.html?type=work&post=project-slug`.
