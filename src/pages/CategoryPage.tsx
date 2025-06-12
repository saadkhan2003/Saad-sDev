import { useParams, Link } from 'react-router-dom';
import { getPostsByCategory, categories } from '../data/mockData';
import { PostCard } from '../components/post-card';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryPosts = slug ? getPostsByCategory(slug) : [];
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Category not found</h1>
        <Link to="/" className="mt-4 text-primary hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
            Category
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {category.description}
            </p>
          )}
        </div>

        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No posts found in this category yet.
            </p>
            <Link to="/" className="mt-4 inline-block text-primary hover:underline">
              Browse all articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
