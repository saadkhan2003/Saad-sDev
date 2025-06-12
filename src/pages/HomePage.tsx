import { useState } from 'react';
import { TrendingUp, Zap, Users } from 'lucide-react';
import { PostCard } from '../components/post-card';
import { NewsletterSignup } from '../components/newsletter-signup';
import { Pagination } from '../components/ui/pagination';
import { PostSkeleton } from '../components/ui/post-skeleton';
import { usePosts } from '../hooks/use-wordpress';
import { mockPosts } from '../data/mockData';

export function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, loading, error, totalPages } = usePosts(currentPage, { useMock: true });
  
  // Get featured posts (posts marked as featured)
  const featuredPosts = mockPosts.filter((post) => post.isFeatured);
  const latestPosts = posts || mockPosts.slice(0, 6);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-primary/5 dark:from-primary/10 dark:via-gray-950 dark:to-primary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Stay Ahead in the{' '}
              <span className="text-primary">Tech World</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Get the latest insights, trends, and analysis from the tech industry. 
              From AI breakthroughs to startup stories, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#latest-posts"
                className="inline-flex items-center justify-center px-8 py-3 text-white font-medium bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Explore Articles
              </a>
              <a
                href="#newsletter"
                className="inline-flex items-center justify-center px-8 py-3 text-primary font-medium border border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                Subscribe Newsletter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-300">Tech Articles Published</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">10K+</h3>
              <p className="text-gray-600 dark:text-gray-300">Monthly Readers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Daily</h3>
              <p className="text-gray-600 dark:text-gray-300">Fresh Content Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Stories
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Don't miss these handpicked articles covering the most important 
                developments in technology today.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section id="latest-posts" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with our newest content covering AI, programming, 
              startups, and the latest tech trends.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 dark:text-red-400">Failed to load posts. Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
