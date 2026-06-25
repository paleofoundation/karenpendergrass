# karenpendergrass.com — working notes for Claude

Next.js 14 (App Router) site for Karen Pendergrass. Content is MDX under
`content/writing/` (gray-matter frontmatter, rendered with remark). Verify every
change with `npm run build` before committing.

## Writing in Karen's voice (READ THIS BEFORE EDITING OR WRITING ARTICLES)

These are hard rules. Karen has corrected each of them more than once.

- **No "It's not X, it's Y." And no "It's X, not Y."** This antithesis/negation
  construction is a tell — it reads like a machine wrote it. Default to stating
  the positive claim directly and stopping there. It almost always hits harder.
  - Bad: "That is a mechanism, measured in clinical trials, not a vibe."
  - Good: "That is a mechanism, measured in clinical trials."
  - Bad: "It is not a funding gap; it is a design flaw."
  - Good (only when the beat is clearly earned): a standalone line — "That is not
    a funding gap." then, on its own line, "It is a design flaw."
- **Exception:** a standalone negation is allowed ONLY when it is a deliberate,
  earned mic-drop that lands on its **own line** as punctuation (e.g.
  "It is the opposite of modesty." / "Read the trials, not the cap table.").
  When in doubt, cut the negation and state the positive. Reserve it for when it
  is clearly called for, not as a default rhythm.
- **Em dashes: sparing.** Prefer commas, colons, periods, parentheses. Keep a
  dash only where it genuinely earns its place (a sharp aside, a headline turn).
- **"less than"** over "fewer than" — her spoken register, even where "fewer" is
  grammatically correct.
- Her register has bite ("hard nah" energy) but stays composed and accurate. She
  is "weird about accuracy": every factual claim must survive the literature.
  When writing science pieces, verify claims against primary sources and
  hyperlink them. Flag figures you could not verify rather than guessing.
- She is uncredentialed by choice and proud of it ("no luxury to be wrong").
  Her work **is** ingredient policing / standards (15 years), which is how she
  learned the science — do not frame it as the opposite.

## Series & sections
- **Brass Tacks** (`category: "brass-tacks"`): the recurring "online food fights,
  settled with the literature attached" series. Science-forward, hyperlinked, no
  named sparring partner.
- **Essays by Claude** (`category: "essays-by-claude"`): authored by Claude at
  Karen's direction; she remains publisher.

## Conventions
- Canonical host is **karenpendergrass.com**. Never display Karen's email
  publicly (the contact form delivers to karen@paleofoundation.com silently).
- Articles auto-derive social hashtags from their `tags` (or a curated
  `hashtags:` frontmatter override). Full SEO/LLMO metadata + JSON-LD ship per
  article; the sitemap (`app/sitemap.ts`) auto-includes every post.
