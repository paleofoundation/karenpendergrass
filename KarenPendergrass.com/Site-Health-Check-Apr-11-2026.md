# KarenPendergrass.com — Health Check & Gap Analysis
**Date:** April 11, 2026  
**Latest deployment:** `dpl_5tg9xhoBoW6NUvxJwVTmwcPTacAo` (READY)  
**Stack:** Next.js 14.2.15 on Vercel | 42 static pages | 18 articles

---

## BUILD & LINT STATUS

**Build:** Clean — compiled successfully, 0 warnings, 0 errors. Linting and type checking passed on Vercel.

**Local lint:** The deploy-files directory contains a partial checkout (8 files). No TypeScript or logic errors detected in the available source. SidebarNav uses styled-jsx (`<style jsx global>`) which is valid in Next.js but flags outside the framework.

**Deployment history:** 20 recent deployments, 18 READY, 2 ERROR (both older — one hero image commit, one SEO frontmatter commit). Current production is stable.

---

## WHAT'S WORKING WELL

- **Sitemap:** Complete — 34 URLs covering all pages, frameworks, and articles with proper `lastmod`, `changefreq`, and `priority` values.
- **Robots.txt:** Well-configured — allows all major crawlers (Googlebot, GPTBot, ChatGPT-User, anthropic-ai, Claude-Web, PerplexityBot, Applebot, cohere-ai, Google-Extended). Blocks `/api/` and `/_next/`.
- **llms.txt:** Excellent — well-structured with expertise, frameworks, organizations, publications, ORCID, and citation format. This is a strong LLMO asset.
- **Person JSON-LD:** Comprehensive — includes name, jobTitle, description, worksFor, knowsAbout (18 areas), sameAs (8 URLs), founder (6 organizations), address (Cyprus).
- **Canonical URLs:** Present and correct on all pages checked.
- **Open Graph tags:** Present on homepage and most pages (title, description, URL, site_name, locale, type, image).
- **Twitter Cards:** `summary_large_image` with image on homepage.
- **Meta descriptions:** Present and unique across pages.
- **Homepage H1:** Single, compelling: "I build the frameworks that become the standard before there's a market."
- **Image optimization:** Next.js Image component with proper srcsets, alt text on all images.
- **Page sizes:** Lean — homepage 99.8 kB first-load JS, articles ~97 kB. Shared JS bundle is 87.3 kB.
- **Navigation:** 8-page sidebar nav with staggered animations, keyboard support (Escape to close), route-change auto-close.
- **Contact form:** Full implementation with Resend API, input sanitization, error states.
- **www redirect:** karenpendergrass.com → www.karenpendergrass.com working correctly (307).

---

## ISSUES FOUND

### Critical (Fix Now)

1. **Missing favicon.ico** — returns 404. Every browser tab shows a generic icon. Google Search Console will flag this.

2. **Missing apple-touch-icon.png** — returns 404. iOS bookmarks and home screen shortcuts show no icon.

3. **/research route is a dead 404** — The build generates a `/research` page, the footer links to it, but the page just says "This page doesn't exist." This is a broken internal link. Either remove it from the footer or create the page (likely should redirect to `/writing` or `/publications`).

4. **Articles missing og:image** — The article at `/writing/2030-trends` (and likely all 18 articles) has no og:image meta tag. When shared on social media, LinkedIn, or Slack, articles will show no preview image. This is a major social sharing gap for content that's meant to establish authority.

5. **Articles missing Article JSON-LD** — Only Person schema is present. Articles should have their own `Article` or `ScholarlyArticle` structured data (headline, author, datePublished, dateModified, description). This is what enables Google's article rich results and improves SERP visibility.

### Important (Fix Soon)

6. **Homepage title is generic** — Just "Karen Pendergrass" with no keywords. Should be something like "Karen Pendergrass — Standards Developer & Microbiome Researcher" for better SERP click-through.

7. **/about page has no H1 tag** — Every other page has an H1, but /about is missing one. This hurts the page's SEO signal.

8. **No `<header>` semantic element** — The site uses `<nav>`, `<main>`, and `<footer>`, but there's no `<header>` wrapping the top of the page. Screen readers and crawlers benefit from proper landmark elements.

9. **No skip-to-content link** — There's no `<a href="#main-content">Skip to content</a>` for keyboard/screen reader users. This is a WCAG 2.1 Level A requirement.

10. **No manifest.json or service worker** — Not critical, but means no PWA capabilities and no install prompt on mobile.

### Minor / Nice-to-Have

11. **/karens-brain in sitemap** — This is a hidden/experimental page that probably shouldn't be indexed. Consider adding `noindex` or removing from sitemap.

12. **All sitemap `lastmod` dates are identical** — Pages and frameworks all show `2026-04-11T08:30:45.418Z` (build time). Google prefers actual content modification dates. Consider tracking real lastmod per page.

13. **Minimal ARIA attributes** — Only 2 `aria-label` attributes found sitewide. The hamburger menu button, form inputs, and navigation could benefit from more descriptive ARIA labels.

14. **Sitemap URLs use non-www** — Sitemap shows `https://karenpendergrass.com/...` but the site redirects to `https://www.karenpendergrass.com/...`. While Google follows redirects, consistency is better. Either the sitemap should use www URLs, or the canonical should match.

---

## GAP ANALYSIS: What We Haven't Thought About

### LLMO / AI Visibility Gaps

15. **No llms-full.txt** — The llms.txt is good but brief. Consider a `llms-full.txt` with article summaries, key claims, and citation-ready excerpts. LLMs that consume this will be more likely to cite Karen's work with accurate detail.

16. **No structured FAQ or Q&A schema** — Karen's frameworks answer specific questions (What is Microbial Metallomics? What is the Triangulation Method?). Adding `FAQPage` schema to framework pages would make them eligible for Google's FAQ rich results AND make them more quotable by LLMs.

17. **No .well-known/ai-plugin.json** — Some AI systems look for this file to understand site capabilities.

### SEO Gaps

18. **No breadcrumb navigation or BreadcrumbList schema** — Framework pages and articles sit 2-3 levels deep. Breadcrumbs help both users and Google understand hierarchy. Google shows breadcrumbs in search results.

19. **No `hreflang` tag** — Karen is based in Cyprus and may have international audience. If content is English-only, `<link rel="alternate" hreflang="en" />` signals this explicitly.

20. **No `datePublished` / `dateModified` visible on articles** — While the sitemap has dates, the actual article pages should show publication dates. Google uses visible dates for freshness signals, and users trust dated research more.

21. **No 404 page with search or suggestions** — The custom 404 just says the page doesn't exist. A better 404 would suggest similar pages or link to key sections.

22. **No Google Search Console verification meta tag visible** — Assuming it's set up via DNS, but worth confirming.

### Content & Authority Gaps

23. **No `/press` or `/media` page** — Karen has significant media-worthy credentials (6 organizations, original frameworks). A press page with headshot downloads, bio snippets, and media mentions would make it easier for journalists and podcasters to feature her.

24. **No `/testimonials` or social proof page** — The homepage mentions testimonials in a commit message, but there's no dedicated page. Third-party validation is powerful for advisory/speaking credibility.

25. **Missing article cross-links to external validation** — Articles should link to PubMed, DOI records, and other external sources that validate claims. This builds E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

### Performance & Technical Gaps

26. **Next.js 14.2.15 is outdated** — Next.js 15.x has been out for months with improved image optimization, faster builds, and better SEO defaults. Consider upgrading.

27. **No caching headers beyond Vercel defaults** — Static assets get Vercel's default cache headers, but explicit `Cache-Control` for images and fonts could improve performance.

28. **81.8 MB build cache** — This is large for a mostly-static site. May indicate oversized images in `/public`. Worth auditing image sizes and converting to WebP/AVIF.

---

## PRIORITY ACTION LIST

| # | Issue | Impact | Effort |
|---|-------|--------|--------|
| 1 | Add favicon + apple-touch-icon | High | 15 min |
| 2 | Fix /research dead link (redirect or remove) | High | 5 min |
| 3 | Add og:image to all articles | High | 30 min |
| 4 | Add Article JSON-LD to writing pages | High | 1 hr |
| 5 | Add H1 to /about page | Medium | 5 min |
| 6 | Improve homepage title tag | Medium | 5 min |
| 7 | Add skip-to-content link | Medium | 10 min |
| 8 | Add `<header>` semantic element | Medium | 10 min |
| 9 | Add FAQPage schema to framework pages | Medium | 2 hrs |
| 10 | Fix sitemap www consistency | Low | 10 min |
| 11 | Add BreadcrumbList schema | Low | 1 hr |
| 12 | Create llms-full.txt | Low | 2 hrs |
| 13 | Remove /karens-brain from sitemap | Low | 5 min |
