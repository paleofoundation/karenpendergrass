import { ventures } from '@/lib/ventures';

// Person schema for Karen Pendergrass - appears on every page via layout
export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Karen Pendergrass',
    url: 'https://karenpendergrass.com',
    jobTitle:
      'Standards Developer and Microbiome Signatures Researcher',
    description:
      'Founder and CEO of the Paleo Foundation. Standards developer, microbiome signatures researcher, and microbial metallomics pioneer. Creator of the MBTI Validation Framework, HMTc certification standards, and the Microbiome Signatures Database.',
    worksFor: {
      '@type': 'Organization',
      name: 'Paleo Foundation',
    },
    knowsAbout: [
      'Microbial Metallomics',
      'Microbiome Signatures',
      'Heavy Metal Certification',
      'Food Safety Standards',
      'Paleo Certification',
      'Phage Therapy',
      'Bacteriophage Cocktails',
      'Antimicrobial Resistance',
      'Translational Microbiome Medicine',
      'Microbiome-Targeted Interventions',
      'Heavy Metal Testing and Certification',
      'Food Safety Certification Standards',
      'ALARA Principles in Food Safety',
      'Nickel-Dependent Pathogenesis',
      'Endometriosis Microbiome Research',
      'Bradford Hill Criteria',
      'Systems Thinking in Translational Medicine',
      'Fecal Microbiota Transplantation',
      'Major Microbial Associations',
      'Trace Metal Dysregulation',
    ],
    sameAs: [
      'https://orcid.org/0000-0002-2348-7259',
      'https://www.linkedin.com/in/karenpendergras/',
      'https://x.com/micrometalomics',
      'https://www.instagram.com/micrometallomics',
      'https://www.facebook.com/karen.pendergrass/',
      'https://paleofoundation.com',
      'https://microbiomemedicine.com',
      'https://microbialmetallomics.com',
      'https://wikibiome.com',
      'https://tinies.app',
      'https://gardensofstgertrude.com',
      'https://heavymetaltested.com',
      'https://heavymetalindex.com',
      'https://phagecocktails.com',
    ],
    founder: ventures.map((v) => ({
      '@type': 'Organization',
      name: v.name,
      url: v.url,
      description: v.schemaDescription,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Parekklisia',
      addressRegion: 'Limassol',
      addressCountry: 'CY',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite schema - appears on homepage
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Karen Pendergrass',
    url: 'https://karenpendergrass.com',
    description:
      'Standards developer, microbiome signatures researcher, and founder at the intersection of microbiome science, translational medicine, and regulatory innovation.',
    author: {
      '@type': 'Person',
      name: 'Karen Pendergrass',
      url: 'https://karenpendergrass.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article schema - appears on individual article pages
export function ArticleSchema({
  title,
  slug,
  date,
  excerpt,
  coverImage,
  author,
}: {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  /** Overrides the article author (defaults to Karen Pendergrass). */
  author?: { name: string; url?: string };
}) {
  const articleAuthor = author
    ? { '@type': 'Person', name: author.name, ...(author.url ? { url: author.url } : {}) }
    : { '@type': 'Person', name: 'Karen Pendergrass', url: 'https://karenpendergrass.com' };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    url: `https://karenpendergrass.com/writing/${slug}`,
    datePublished: date,
    dateModified: date,
    author: articleAuthor,
    publisher: {
      '@type': 'Person',
      name: 'Karen Pendergrass',
      url: 'https://karenpendergrass.com',
    },
    description: excerpt || title,
    ...(coverImage
      ? { image: `https://karenpendergrass.com${coverImage}` }
      : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://karenpendergrass.com/writing/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Framework/concept schema - for standalone framework pages
export function FrameworkSchema({
  name,
  slug,
  description,
  alternateName,
}: {
  name: string;
  slug: string;
  description: string;
  alternateName?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name,
    url: `https://karenpendergrass.com/frameworks/${slug}`,
    description,
    ...(alternateName ? { alternateName } : {}),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Karen Pendergrass Research Frameworks',
      url: 'https://karenpendergrass.com/frameworks',
    },
    creator: {
      '@type': 'Person',
      name: 'Karen Pendergrass',
      url: 'https://karenpendergrass.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Professional service schema for advisory/board page
export function AdvisorySchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Karen Pendergrass Advisory & Board Services',
    url: 'https://karenpendergrass.com/advisory',
    description:
      'Board advisory services, consulting, and expert guidance in microbiome science, food safety certification, heavy metal risk assessment, and AI-first operations design.',
    provider: {
      '@type': 'Person',
      name: 'Karen Pendergrass',
      url: 'https://karenpendergrass.com',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Advisory Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Board of Directors / Advisory Board',
            description:
              'Strategic advisory on microbiome science, food safety, heavy metal certification, and regulatory innovation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Expert Consultation',
            description:
              'Specialized consulting on HMTc standards, MBTI validation, microbial metallomics, and certification program design.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Speaking & Keynote',
            description:
              'Conference presentations and keynotes on microbiome-targeted interventions, heavy metal certification, and systems thinking in translational medicine.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
