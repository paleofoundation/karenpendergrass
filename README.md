# karenpendergrass.com

Personal website and knowledge base for Karen Pendergrass. Built with Next.js 14, Tailwind CSS, and MDX content files. Deployed on Vercel.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Content:** MDX files with gray-matter frontmatter
- **Fonts:** Newsreader (display), Source Sans 3 (body), JetBrains Mono (code)
- **Deployment:** Vercel
- **Repository:** GitHub

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── about/              # Origin story & full bio
│   ├── ventures/           # Five organizations
│   ├── writing/            # Article index + [slug] pages
│   ├── research/           # Research portfolio & frameworks
│   ├── speaking/           # Speaking topics & availability
│   └── contact/            # Contact info & availability
├── components/             # Shared React components
├── content/
│   ├── writing/            # Published articles (MDX)
│   ├── drafts/             # Unpublished drafts (MDX)
│   ├── pages/              # Static page content (MDX)
│   ├── ventures/           # Venture descriptions (MDX)
│   └── research/           # Research project details (MDX)
├── lib/
│   └── content.ts          # Content reading utilities
└── public/
    └── images/             # Static assets
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Content

### New article

Create a new `.mdx` file in `content/writing/`:

```mdx
---
title: "Your Article Title"
date: "2026-04-01"
slug: "your-article-slug"
category: "microbiome-research"
originalCategories: []
tags: []
status: "publish"
excerpt: "Brief description for cards and meta tags."
---

Your article content in Markdown...
```

Categories: `microbiome-research`, `analysis`, `essays`

### New venture

Add to the `getVentures()` array in `lib/content.ts`.

## Deployment

Push to GitHub. Vercel auto-deploys from the main branch.

## WordPress Migration

This site was migrated from WordPress. The `image-manifest.json` file in the project root contains URLs for all original WordPress media attachments. Old WordPress URLs (date-based paths) are redirected via `next.config.js`.

## Content Roadmap

- [ ] Replace generic WordPress images with original assets
- [ ] Expand About page with more personal narrative
- [ ] Add podcast/video embeds to Speaking page
- [ ] Create "Principles" page
- [ ] Create "Now" page (updated monthly)
- [ ] Add newsletter signup integration
- [ ] Upgrade markdown renderer to full next-mdx-remote for MDX component support
