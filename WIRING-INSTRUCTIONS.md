# Wiring Instructions for New Components

## These components are ready to use. Follow these steps in Cursor to wire them in.

---

## 1. Homepage (app/page.tsx)

Add these imports at the top:

```tsx
import ImpactSection from '@/components/ImpactSection';
import Testimonials from '@/components/Testimonials';
```

Then add these two components between the Ventures section and the Featured Writing section:

```tsx
<ImpactSection />
<Testimonials />
```

---

## 2. Advisory page (app/advisory/page.tsx)

Add this import at the top:

```tsx
import IntakeForm from '@/components/IntakeForm';
```

Then replace the existing CTA section at the bottom (the dark bg-ink div with
"Interested in working together?") with:

```tsx
{/* Intake form */}
<section className="max-w-3xl mx-auto px-6 pb-20">
  <IntakeForm />
</section>
```

---

## 3. Update sitemap (app/sitemap.ts)

Add the Roundtable page to the static pages array:

```tsx
{ url: `${baseUrl}/roundtable`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
```

---

## 4. Update footer (components/Footer.tsx)

Add to the Navigate section links array:

```tsx
{ href: '/roundtable', label: 'Roundtable' },
```

---

## 5. Remove Karen's Brain from nav (optional)

The Karen's Brain page is a product teaser. Now that you have the Roundtable
(which is a real, sellable service with a proof case), Karen's Brain can move
to a less prominent position. Consider keeping it accessible via the homepage
or a link from the Frameworks page, but removing it from the top navigation
to keep the nav focused on revenue-generating pages.
