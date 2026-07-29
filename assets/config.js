/**
 * One-time publishing configuration.
 * After this is set, publish by adding .md files to the configured folder.
 */
window.JH_SITE_CONFIG = {
  siteUrl: 'https://www.julianhasse.com',
  github: {
    owner: 'julianhasse',
    repo: 'personal-web',
    branch: 'main',
    contentPaths: {
      writing: 'content/writing',
      work: 'content/work'
    }
  },
  articlesPerPage: 25,
  projectsPerPage: 12
};