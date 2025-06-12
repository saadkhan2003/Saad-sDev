import { useState } from 'react';
import { Search, Filter, SortAsc, Grid, List, Sparkles, TrendingUp } from 'lucide-react';
import { useSearchPosts } from '../hooks/use-wordpress';
import { PostCard } from '../components/post-card';
import { LoadingSpinner } from '../components/loading-spinner';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { posts: searchResults, loading, error } = useSearchPosts(debouncedQuery);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setDebouncedQuery(searchQuery);
      setHasSearched(true);
    }
  };

  const popularSearches = [
    'React', 'TypeScript', 'Design', 'AI', 'Web Development', 'UI/UX'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Search Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-20 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fadeIn">
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Discover Knowledge</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 animate-slideUp">
              Find What You're
              <br />
              <span className="text-gradient">Looking For</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fadeIn">
              Search through our extensive collection of articles, tutorials, and insights
            </p>
            
            {/* Enhanced Search Form */}
            <div className="max-w-3xl mx-auto animate-fadeIn">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 pl-16 pr-32 text-lg rounded-2xl border-2 shadow-lg focus:shadow-xl transition-all duration-300"
                    placeholder="Search for articles, topics, or keywords..."
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="absolute right-2 top-2 h-12 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </form>
              
              {/* Popular Searches */}
              {!hasSearched && (
                <div className="mt-8 animate-fadeIn">
                  <p className="text-sm text-muted-foreground mb-4">Popular searches:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {popularSearches.map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(term);
                          setDebouncedQuery(term);
                          setHasSearched(true);
                        }}
                        className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      {hasSearched && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="text-center">
                  <LoadingSpinner size="large" />
                  <p className="text-muted-foreground mt-4">Searching for "{debouncedQuery}"...</p>
                </div>
              </div>
            ) : error ? (
              <Card className="max-w-2xl mx-auto border-destructive/20">
                <CardContent className="text-center p-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Search className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Search Error</h3>
                  <p className="text-destructive mb-6">{error.message}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setDebouncedQuery('');
                      setHasSearched(false);
                    }}
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {searchResults.length > 0 
                          ? `Found ${searchResults.length} results` 
                          : 'No results found'}
                      </h2>
                      <p className="text-muted-foreground">
                        for "{debouncedQuery}"
                      </p>
                    </div>
                  </div>

                  {searchResults.length > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 border rounded-lg p-1">
                        <Button
                          variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                          className="w-8 h-8 p-0"
                        >
                          <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('list')}
                          className="w-8 h-8 p-0"
                        >
                          <List className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <SortAsc className="w-4 h-4 mr-2" />
                        Sort
                      </Button>
                    </div>
                  )}
                </div>

                {/* Results Grid/List */}
                {searchResults.length > 0 ? (
                  <div className={
                    viewMode === 'grid' 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                      : "space-y-6"
                  }>
                    {searchResults.map((post, index) => (
                      <div
                        key={post.id}
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <PostCard 
                          post={post} 
                          variant={viewMode === 'list' ? 'compact' : 'default'} 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="max-w-2xl mx-auto">
                    <CardContent className="text-center p-12">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                        <Search className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">No Results Found</h3>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find any articles matching "{debouncedQuery}". 
                        Try different keywords or browse our categories.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button 
                          onClick={() => {
                            setSearchQuery('');
                            setDebouncedQuery('');
                            setHasSearched(false);
                          }}
                        >
                          Clear Search
                        </Button>
                        <Button variant="outline">
                          Browse Categories
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Suggestions Section (when no search performed) */}
      {!hasSearched && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground mb-4">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Trending Topics</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Popular This Week</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover what other readers are exploring and find inspiration for your next read
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Web Development", posts: "127 articles", trend: "+12%" },
                { title: "Design Systems", posts: "89 articles", trend: "+8%" },
                { title: "AI & Machine Learning", posts: "156 articles", trend: "+24%" },
                { title: "React & TypeScript", posts: "203 articles", trend: "+15%" },
                { title: "Mobile Development", posts: "94 articles", trend: "+6%" },
                { title: "DevOps & Cloud", posts: "78 articles", trend: "+18%" }
              ].map((topic, index) => (
                <Card 
                  key={topic.title} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => {
                    setSearchQuery(topic.title);
                    setDebouncedQuery(topic.title);
                    setHasSearched(true);
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {topic.trend}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{topic.posts}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
