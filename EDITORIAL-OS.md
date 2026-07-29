# Editorial OS v1.1

Editorial OS is the design and publishing language for julianhasse.com.

## Architecture

- `assets/styles.css` — ordered stylesheet manifest
- `assets/css/core.css` — foundations and established site components
- `assets/css/projects.css` — homepage project cards
- `assets/css/articles.css` — long-form writing refinements
- `assets/css/work.css` — project case-study refinements
- `assets/css/utilities.css` — shared utilities

## Component contract

Homepage project cards are rendered by `assets/site.js` using:

- `.project-card`
- `.project-card-link`
- `.project-categories`
- `.project-rule`
- `.project-summary`
- `.project-footer`
- `.project-arrow`

Keeping the renderer and component stylesheet aligned prevents article or case-study changes from breaking the homepage cards.

## Design foundation

- Display: Newsreader
- Interface/body: Manrope
- Metadata/code: DM Mono
- Paper: `#f2f0e9`
- Ink: `#11110f`
- Accent: `#ff5a36`
