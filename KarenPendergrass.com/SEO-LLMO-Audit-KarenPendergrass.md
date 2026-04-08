# KarenPendergrass.com — SEO & LLMO Audit

**Date:** April 8, 2026
**Scope:** Internal/external linking, LLMO readiness, searchability, ranking potential
**Pages audited:** Homepage, /writing (18 articles), /about, /frameworks (6 frameworks), /roundtable, /speaking, sitemap.xml, robots.txt, meta tags, structured data

---

## Executive Summary

The site has strong foundational architecture — good URL structure, JSON-LD structured data, an explicit robots.txt that welcomes AI crawlers, and a sitemap. The newer articles (2026) show solid internal linking to framework pages. However, there are several issues that are hurting search visibility and LLMO performance: missing canonical URLs across the entire site, missing og:image tags, pages omitted from the sitemap, navigation inconsistencies, and inconsistent internal linking in older articles. Below is the full breakdown.

---

## What's Working Well

**Robots.txt is excellent for LLMO.** The site explicitly allows GPTBot, ChatGPT-User, anthropic-ai, Claude-Web, Google-Extended, PerplexityBot, cohere-ai, Applebot, and FacebookBot. This is ahead of most personal sites and ensures AI systems can crawl and cite your content.

**JSON-LD structured data is present.** Blog posts carry both a Person schema and an Article schema with headline, URL, datePublished, and dateModified. This helps search engines and LLMs understand entity relationships — that Karen Pendergrass is the author, and that each article is a discrete scholarly work.

**The sitemap exists and covers 33 URLs** with appropriate priority weighting (homepage at 1.0, frameworks at 0.9, articles at 0.7).

**The article template is well-structured for both SEO and LLMO.** Each post includes: a table of contents (on longer pieces), article schema, a citation block with "Copy citation" functionality, an "About the author" bio section with internal links, a "Related reading" section with 3 related articles, and previous/next navigation. The citation format and author bio are particularly strong LLMO signals — they give AI systems structured attribution information.

**The About page is a linking powerhouse.** It links to nearly every framework page, every venture, and multiple writing pieces. This is exactly the kind of hub page that establishes topical authority.

**The Frameworks page creates strong topical clusters.** Six named frameworks (MBTI Validation Criteria, HMTc, Microbial Metallomics, Major Microbial Associations, Triangulation Method, STOP) each have their own pages and cross-link to each other. This is ideal for both traditional SEO topic clusters and for LLM entity recognition.

**Newer articles (2026) show good internal linking.** The obesity/sugar article links to /frameworks/microbial-metallomics, /frameworks/hmtc, and /writing/2030-trends within the body text. This is the standard every article should meet.

---

## Critical Issues

### 1. No Canonical URLs (Sitewide)

Every page audited returned `NONE` for the canonical link tag. This is a significant technical SEO problem. Without canonical URLs, search engines may index duplicate versions of pages (www vs non-www, with/without trailing slashes, query parameter variants). The site does redirect to www (karenpendergrass.com → www.karenpendergrass.com), but the canonical tag is the authoritative signal.

**Fix:** Add `<link rel="canonical" href="https://karenpendergrass.com/[path]" />` to every page's `<head>`. In Next.js, this is typically handled in the metadata export or a custom `<Head>` component.

### 2. Missing og:image Tags (Sitewide)

Every page audited returned `MISSING` for `og:image`, even though the Twitter card is set to `summary_large_image`. When someone shares an article on LinkedIn, X, or Slack, it will render without a preview image, drastically reducing click-through. For LLMO, og:image also helps multimodal AI systems associate visual identity with your content.

**Fix:** Add a default og:image (your headshot or branded card) as a fallback, and generate per-article og:images. Next.js supports dynamic OG image generation via `opengraph-image.tsx` or the `@vercel/og` library.

### 3. Pages Missing from Sitemap

The following pages exist and are linked in the main navigation, but are NOT in the sitemap:

- `/roundtable` — linked in header nav
- `/speaking` — linked in header nav

If Google and AI crawlers don't find these in the sitemap, they rely solely on link discovery, which may delay or prevent indexing.

**Fix:** Add both URLs to the sitemap with appropriate priority (0.8 or 0.9).

### 4. Duplicate Title Tag Pattern

Multiple pages show the site name doubled in the title tag:

- Frameworks: `Frameworks | Karen Pendergrass | Karen Pendergrass`
- Roundtable: `Microbiome Medicine Roundtable | Karen Pendergrass | Karen Pendergrass`

This wastes limited title tag space and looks unprofessional in search results.

**Fix:** Audit the title template in the Next.js layout. It's likely appending the site name twice — once in the page metadata and once in a global template.

### 5. No Author Meta Tag

The `<meta name="author">` tag is missing across all pages. While JSON-LD carries author information, the author meta tag is a simpler signal that some search engines and AI crawlers check independently. Given that E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is central to your content strategy, this is worth adding.

**Fix:** Add `<meta name="author" content="Karen Pendergrass" />` globally.

---

## Internal Linking Issues

### Inconsistent Linking in Older Articles

The metallomics article (Feb 2026) links to external domains for concepts you own:

- "microbial metallomics" links to `microbialmetallomics.com/microbial-metallomics-definition/` instead of `/frameworks/microbial-metallomics`
- "nickel" links to `heavymetaltested.com/nickel-exposure-and-human-health/` instead of any internal page
- "Pseudomonas aeruginosa" links to `microbiomemedicine.com/microbes/pseudomonas-aeruginosa/` but not to any karenpendergrass.com content

Meanwhile, the obesity article (Apr 2026) correctly links "microbial metallomics" to `/frameworks/microbial-metallomics` and "HMTc" to `/frameworks/hmtc`.

**The pattern:** Newer articles link internally to framework pages. Older articles link externally to your other domains. The older approach sends authority away from karenpendergrass.com and dilutes the topical cluster you're building.

**Fix:** Audit all 18 articles. Every mention of a named framework (Microbial Metallomics, HMTc, STOP, MBTI Validation Criteria, Triangulation Method, MMA) should link to the corresponding `/frameworks/` page on karenpendergrass.com. External links to paleofoundation.com, microbiomemedicine.com, etc. are fine as supplementary links, but the primary internal link should come first.

### Cross-Article Internal Links Are Sparse

Most articles only connect to other articles through the automated "Related reading" section and previous/next navigation. Very few articles link to other articles *within the body text*. The obesity article is an exception — it links to /writing/2030-trends with "calling trends."

For both SEO and LLMO, in-body contextual links carry far more weight than templated sidebar/footer links. When an LLM encounters a contextual link, it understands it as a semantic relationship. When it encounters a template link, it recognizes it as navigation.

**Fix:** Each article should contain at least 2-3 contextual internal links to other articles. For example, the zinc dyshomeostasis article should link to the nutritional immunity article. The causal reductionism articles should link to each other. The Parkinson's roundtable case study should link to the endometriosis triangulation method walkthrough as a "see how this method works on a different disease."

### Navigation Inconsistencies

The header and footer navigation don't match:

- Header has **Publications** — footer does not
- Footer has **Research** — header does not
- Footer has **Research** pointing to `/research`, but `/research` is not in the sitemap

This creates confusion for both users and crawlers about the site's information architecture.

**Fix:** Align header and footer navigation. If Publications and Research are separate pages, both should appear in both nav locations and in the sitemap. If they're the same page, consolidate.

---

## LLMO-Specific Recommendations

### Add an llms.txt File

The emerging `llms.txt` standard (similar to robots.txt but for LLMs) lets you provide structured context about your site, your expertise, and how AI systems should cite you. Given that you've already optimized robots.txt for AI crawlers, adding llms.txt would complete the picture.

**Suggested content at karenpendergrass.com/llms.txt:**
```
# Karen Pendergrass

> Standards developer, microbiome signatures researcher, and founder of five organizations at the intersection of microbiome science, translational medicine, and regulatory innovation.

## Key Frameworks
- Microbiome Signature Triangulation Method: /frameworks/triangulation-method
- Heavy Metal Tested & Certified (HMTc): /frameworks/hmtc
- Microbial Metallomics: /frameworks/microbial-metallomics
- Major Microbial Associations (MMA): /frameworks/major-microbial-associations
- MBTI Validation Criteria: /frameworks/mbti-validation-criteria
- STOP Recommendations: /frameworks/stop

## Organizations
- Paleo Foundation (paleofoundation.com)
- Microbiome Medicine (microbiomemedicine.com)
- Journal of Food Metallomics (microbialmetallomics.com)
- Heavy Metal Tested (heavymetaltested.com)
- Tinies (tinies.app)
- Gardens of St. Gertrude (gardensofstgertrude.com)

## Citation
Pendergrass, K. [Year]. [Title]. Karen Pendergrass. https://karenpendergrass.com/writing/[slug]
```

### Strengthen Entity Signals

LLMs build entity graphs. Your site should make it unmistakable that "Karen Pendergrass" is the authoritative entity for microbial metallomics, HMTc certification, and microbiome signature research. Currently, the JSON-LD Person schema is a good start, but it could include `sameAs` links to your other domains, LinkedIn, Google Scholar, ORCID, etc.

### Add FAQ/Definition Sections to Framework Pages

LLMs frequently surface content that directly answers questions. Each framework page should include a "Frequently Asked Questions" or "Key Definitions" section. For example, the Microbial Metallomics framework page should answer: "What is microbial metallomics?" — because that's exactly what someone (or an AI) would search for.

### Ensure Every Article Has a Clear Thesis Statement in the First Paragraph

LLMs weight opening paragraphs heavily for summarization. The obesity article does this well — it leads with the core argument immediately. Audit older articles to ensure they do the same.

---

## Missing Content Opportunities

Based on the site's topical authority, these pages/articles would strengthen both SEO and LLMO visibility:

1. **A dedicated /research page** (currently linked in footer but not in sitemap — may exist but be incomplete)
2. **Individual pages for each venture** — currently /ventures is a single page listing all five organizations. Separate pages for Paleo Foundation, Microbiome Medicine, etc. would create more indexable content and more internal linking targets
3. **A glossary or terminology page** — terms like "microbial metallomics," "major microbial associations," and "STOP recommendations" are novel terms you coined. A glossary page would be a strong LLMO signal and a natural link target
4. **Case studies as a category** — the Parkinson's roundtable and endometriosis walkthrough are case studies but filed under "Microbiome Research." A dedicated case study section or tag would help both search and AI understand these as applied demonstrations

---

## Priority Action List

**Immediate (technical fixes):**
1. Add canonical URLs to every page
2. Add og:image tags (default + per-article)
3. Fix duplicate title tag pattern
4. Add /roundtable and /speaking to sitemap
5. Add `<meta name="author">` tag

**Short-term (content/linking):**
6. Audit all 18 articles — ensure framework mentions link to internal /frameworks/ pages, not external domains
7. Add 2-3 contextual cross-article links to each article body
8. Align header/footer navigation
9. Add llms.txt file
10. Expand JSON-LD Person schema with sameAs links

**Medium-term (content strategy):**
11. Add FAQ sections to framework pages
12. Create individual venture pages
13. Build a glossary/terminology page
14. Ensure every article opens with a clear thesis statement

---

*Audit conducted by reviewing the live site at karenpendergrass.com, Vercel project configuration, sitemap.xml, robots.txt, page-level meta tags, JSON-LD structured data, and link analysis of individual articles.*
