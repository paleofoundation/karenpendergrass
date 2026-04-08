import type { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Articles on microbiome research, microbial metallomics, food safety, causal reasoning, and systems thinking by Karen Pendergrass.',
  alternates: {
    canonical: '/writing',
  },
};

const categoryLabels: Record<string, string> = {
  'microbiome-research': 'Microbiome Research',
  analysis: 'Analysis',
  essays: 'Essays',
};

export default function WritingPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  // Group posts by category
  const grouped: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    if (!grouped[post.meta.category]) {
      grouped[post.meta.category] = [];
    }
    grouped[post.meta.category].push(post);
  });

  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Writing"
        title="Articles & essays"
        description={`${posts.length} published pieces on microbiome science, metallomics, food safety, causal reasoning, and the things I can't stop thinking about.`}
      />

      {/* Category overview */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={`#${cat.name}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink/10 text-xs font-medium text-ink-light hover:border-accent/30 hover:text-accent transition-colors"
          >
            <span>{categoryLabels[cat.name] || cat.name}</span>
            <span className="text-ink-muted">{cat.count}</span>
          </a>
        ))}
      </div>

      {/* All posts, grouped by category */}
      {Object.entries(grouped).map(([category, catPosts]) => (
        <section key={category} id={category} className="mb-14">
          <h3
            className="text-lg font-medium text-ink mb-1 scroll-mt-24"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {categoryLabels[category] || category}
          </h3>
          <p className="text-sm text-ink-muted mb-4">
            {catPosts.length} article{catPosts.length !== 1 ? 's' : ''}
          </p>
          <div>
            {catPosts.map((post) => (
              <ArticleCard
                key={post.meta.slug}
                title={post.meta.title}
                slug={post.meta.slug}
                date={post.meta.date}
                category={post.meta.category}
                excerpt={post.meta.excerpt}
                content={post.content}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
