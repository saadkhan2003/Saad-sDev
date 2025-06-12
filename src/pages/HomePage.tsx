import { useState } from 'react';
import { Search, TrendingUp, BookOpen, Sparkles, ArrowRight, Filter } from 'lucide-react';
import { usePosts, useCategories } from '../hooks/use-wordpress';
import { PostCard } from '../components/post-card';
import { LoadingSpinner } from '../components/loading-spinner';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Pagination } from '../components/ui/pagination';

export function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { posts, loading, error, totalPages } = usePosts(currentPage);
  const { posts: featuredPosts, loading: featuredLoading } = usePosts(1, { featured: true });
  const { categories, loading: categoriesLoading } = useCategories();

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fadeIn">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Welcome to our blog</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-slideUp">
              <span className="text-gradient">Discover</span> Amazing
              <br />
              Stories & Insights
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn">
              Explore thought-provoking articles, tutorials, and insights from our community of writers and experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeIn">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10 h-12 text-lg border-2 focus:border-primary"
                />
              </div>
              <Button size="lg" className="h-12 px-8 font-semibold">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fadeIn">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Daily</div>
                <div className="text-sm text-muted-foreground">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {!featuredLoading && featuredPosts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Featured Stories</h2>
                <p className="text-muted-foreground">Hand-picked articles just for you</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <PostCard key={post.id} post={post} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {!categoriesLoading && categories.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Filter className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Explore Categories</h2>
                  <p className="text-muted-foreground">Find content by topic</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button 
                variant={selectedCategory === null ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                All Posts
              </Button>
              {categories.slice(0, 8).map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.slug)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-secondary/10">
              <BookOpen className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Latest Articles</h2>
              <p className="text-muted-foreground">Stay updated with our newest content</p>
            </div>
          </div>

          {error ? (
            <Card className="p-8 text-center border-destructive/20">
              <CardContent>
                <p className="text-destructive mb-4">{error.message}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="animate-fadeIn"
                  />
                </div>
              )}
            </>
          )}

          {loading && currentPage > 1 && (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="large" />
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Get the latest articles and updates delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" size="lg" className="font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
