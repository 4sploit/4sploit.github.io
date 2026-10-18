<div align="center">

# Mahmoud Mahajna

**Software Engineer · Security Researcher**

Personal portfolio, blog, and project showcase.

[![Website](https://img.shields.io/badge/website-mahajnam.com-0a0a0a?style=flat-square)](https://mahajnam.com)
[![Deploy](https://img.shields.io/github/actions/workflow/status/4sploit/4sploit.github.io/deploy.yml?branch=main&style=flat-square&label=deploy)](https://github.com/4sploit/4sploit.github.io/actions/workflows/deploy.yml)
[![Built with Astro](https://img.shields.io/badge/built%20with-Astro-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

[Website](https://mahajnam.com) · [Blog](https://mahajnam.com/blog) · [Projects](https://mahajnam.com/projects) · [LinkedIn](https://www.linkedin.com/in/4sploit)

</div>

---

## About

This repository contains the source of [mahajnam.com](https://mahajnam.com), where I write about software engineering, offensive security, reverse engineering, and malware analysis, and showcase the projects I work on.

## Features

- **Blog** with Markdown/MDX, tags, pagination, reading time, table of contents, and an RSS feed
- **Projects** showcase with dedicated detail pages
- **About, Resume & Uses** pages driven by a single config file
- **Full-text search** powered by [Pagefind](https://pagefind.app), built at compile time
- **Syntax highlighting** via [Expressive Code](https://expressive-code.com) with titles, line highlights, and copy buttons
- **Dark / light theme** with no flash on load
- **SEO-ready**: Open Graph metadata, sitemap, `robots.txt`, and canonical URLs
- **Fast by default**: static output, minimal client-side JavaScript, viewport prefetching

## Tech Stack

| Area      | Technology                                                                       |
| --------- | -------------------------------------------------------------------------------- |
| Framework | [Astro](https://astro.build) (static site generation)                            |
| Content   | Markdown, MDX, Astro Content Collections                                         |
| Styling   | [Tailwind CSS](https://tailwindcss.com) v4 + Typography plugin                   |
| Language  | TypeScript                                                                       |
| Search    | Pagefind                                                                         |
| Tooling   | ESLint, Prettier, `astro check`                                                  |
| Hosting   | GitHub Pages, deployed with GitHub Actions, served on a custom domain            |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) **22.12.0** or later
- npm

### Installation

```bash
git clone https://github.com/4sploit/4sploit.github.io.git
cd 4sploit.github.io
npm install
npm run dev
```

The development server runs at `http://localhost:4321`.

### Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the local development server            |
| `npm run build`   | Build the production site into `dist/`        |
| `npm run preview` | Preview the production build locally          |
| `npm run check`   | Run Astro and TypeScript diagnostics          |
| `npm run lint`    | Lint the codebase with ESLint                 |
| `npm run format`  | Format the codebase with Prettier             |

## Project Structure

```text
.
├── .github/workflows/   # GitHub Pages deployment pipeline
├── public/              # Static assets (images, favicon, CNAME)
└── src/
    ├── components/      # UI, layout, blog, and project components
    ├── config/          # Site-wide settings (site.ts) and resume data (resume.ts)
    ├── dev-pages/       # Local-only routes (e.g. /docs), served by `npm run dev` only
    ├── content/
    │   ├── blog/        # Blog posts (.md / .mdx)
    │   └── projects/    # Project entries (.md / .mdx)
    ├── layouts/         # Page layouts
    ├── lib/             # Content, SEO, and utility helpers
    ├── pages/           # File-based routes
    └── styles/          # Global and typography styles
```

## Writing Content

Add a new blog post by creating a `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: 'Post title'
description: 'A short summary used in listings and metadata.'
publishedAt: 2026-01-01
tags: ['Security', 'Reverse Engineering']
category: 'Security'
featured: false
draft: false
---

Your content here.
```

Projects follow the same approach in `src/content/projects/`. The frontmatter schemas live in [`src/content.config.ts`](src/content.config.ts).

> Files whose name starts with `_` or that end in a trailing underscore (e.g. `post.md_`) are ignored by the content loader and are useful for drafts and examples.

## Configuration

Site metadata, navigation, social links, hero content, skills, and feature toggles all live in [`src/config/site.ts`](src/config/site.ts). Resume content lives in [`src/config/resume.ts`](src/config/resume.ts).

## Deployment

Every push to `main` triggers the [deploy workflow](.github/workflows/deploy.yml), which builds the site with [`withastro/action`](https://github.com/withastro/action) and publishes it to GitHub Pages. The custom domain is configured through [`public/CNAME`](public/CNAME).

## Acknowledgements

Built on top of [astro-dev-theme](https://github.com/milinddethe15/astro-dev-theme) by Milind Dethe.

## License

The source code is released under the [MIT License](LICENSE). Blog posts and other written content are © Mahmoud Mahajna. All rights reserved.

## Contact

- **Website:** [mahajnam.com](https://mahajnam.com)
- **GitHub:** [@4sploit](https://github.com/4sploit)
- **LinkedIn:** [in/4sploit](https://www.linkedin.com/in/4sploit)
- **Email:** [mahmod.mahajnaa@outlook.com](mailto:mahmod.mahajnaa@outlook.com)
