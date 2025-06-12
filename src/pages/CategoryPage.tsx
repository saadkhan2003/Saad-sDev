import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Hash, TrendingUp, Calendar, Users } from 'lucide-react';
import { usePostsByCategory, useCategories } from '../hooks/use-wordpress';
import { PostCard } from '../components/post-card';
import { LoadingSpinner } from '../components/loading-spinner';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import type { Category as CategoryType } from '../types/blog';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { posts: categoryPosts, loading, error } = usePostsByCategory(slug);
  const { categories } = useCategories();
  const category = categories.find((c: CategoryType) => c.slug === slug);

  // Show loading indicator
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="text-muted-foreground mt-4">Loading category...</p>
        </div>
      </div>
    );
  }

  // Show error or category not found
  if (error || !category) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto border-destructive/20">
            <CardContent className="text-center p-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                <Hash className="w-8 h-8 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold mb-3">Category Not Found</h1>
              <p className="text-muted-foreground mb-6">
                {error ? error.message : "The category you're looking for doesn't exist."}
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/">
                  <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="outline">Browse Categories</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-20 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="relative container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8 animate-fadeIn">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fadeIn">
              <Hash className="w-4 h-4" />
              <span className="text-sm font-medium">Category</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 animate-slideUp">
              {category.name}
            </h1>
            
            {category.description && (
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn">
                {category.description}
              </p>
            )}

            {/* Category Stats */}
            <div className="flex flex-wrap gap-6 justify-center mb-8 animate-fadeIn">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border shadow-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {categoryPosts.length} {categoryPosts.length === 1 ? 'Article' : 'Articles'}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border shadow-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Trending</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border shadow-sm">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Popular</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      {categories.length > 1 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Explore More Categories</h2>
              <Link to="/categories">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories
                .filter(cat => cat.slug !== slug)
                .slice(0, 6)
                .map((cat) => (
                  <Link key={cat.id} to={`/category/${cat.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {cat.name}
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {categoryPosts.length > 0 ? (
            <>
              <div className="flex items-center gap-3 mb-12">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Latest in {category.name}</h2>
                  <p className="text-muted-foreground">
                    {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'} available
                  </p>
                </div>
              </div>

              {/* Featured Article */}
              {categoryPosts.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-xl font-semibold mb-6">Featured Article</h3>
                  <PostCard post={categoryPosts[0]} variant="featured" />
                </div>
              )}

              {/* Articles Grid */}
              {categoryPosts.length > 1 && (
                <>
                  <h3 className="text-xl font-semibold mb-8">More Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryPosts.slice(1).map((post, index) => (
                      <div
                        key={post.id}
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <PostCard post={post} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="text-center p-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">No Articles Yet</h3>
                <p className="text-muted-foreground mb-6">
                  There are no articles in this category yet. Check back soon for new content!
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/">
                    <Button>
                      Browse All Articles
                    </Button>
                  </Link>
                  <Link to="/categories">
                    <Button variant="outline">
                      Other Categories
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Get notified when we publish new articles in {category.name} and other categories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" size="lg" className="font-semibold whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
