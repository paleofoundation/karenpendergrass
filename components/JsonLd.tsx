import type { PostMeta } from '@/lib/content';

// Person schema for Karen Pendergrass - appears on every page via layout
export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Karen Pendergrass',
    url: 'https://karenpendergrass.com',
    jobTitle: 'Standards Developer & Microbiome Signatures Researcher',
    description:
      'Founder and CEO of the Paleo Foundation. Standards developer, microbiome signatures researcher, and microbial metallomics pioneer. Creator of the MBTI Validation Framework, HMTc certification standards, and the Microbiome Signatures Database.',
    knowsAbout: [
      'Microbiome Signatures',
      'Microbiome-Targeted Interventions',
      'Microbial Metallomics',
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
      'https://paleofoundation.com',
      'https://microbiomemedicine.com',
      'https://microbialmetallomics.com',
      'https://tinies.app',
      'https://gardensofstgertrude.com',
      'https://heavymetaltested.com',
    ],
    founder: [
      {
        '@type': 'Organization',
        name: 'Paleo Foundation',
        url: 'https://paleofoundation.com',
        description:
          'Food certification standards organization for Paleo, Keto, Grain-Free, and Heavy Metal Tested & Certified (HMTc) programs.',
      },
      {
        '@type': 'Organization',
        name: 'Microbiome Medicine',
        url: 'https://microbiomemedicine.com',
        description:
          'Clinician-facing database formalizing disease-associated microbiome patterns through Major Microbial Associations (MMAs).',
      },
      {
        '@type': 'Organization',
        name: 'Journal of Food Metallomics',
        url: 'https://microbialmetallomics.com',
        description:
          'Research publication integrating trace metal analysis into microbiome and food safety research.',
      },
      {
        '@type': 'Organization',
        name: 'Tinies',
        url: 'https://tinies.app',
        description:
          'Platform connecting animal sanctuaries with sponsors and supporters worldwide.',
      },
      {
        '@type': 'Organization',
        name: 'Gardens of St. Gertrude',
        url: 'https://gardensofstgertrude.com',
        description: 'Cat sanctuary in Parekklisia, Cyprus, caring for 92 cats.',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Parekklisia',
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
}: {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    url: `https://karenpendergrass.com/writing/${slug}`,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: 'Karen Pendergrass',
      url: 'https://karenpendergrass.com',
    },
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
