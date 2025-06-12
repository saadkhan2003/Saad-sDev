import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { getPostBySlug, mockPosts } from '../data/mockData';
import { NewsletterSignup } from '../components/newsletter-signup';
import { PostCard } from '../components/post-card';

export function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  
  // Get related posts based on categories
  const relatedPosts = post 
    ? mockPosts
        .filter(p => 
          p.id !== post.id && 
          p.categories.some(c => 
            post.categories.some(pc => pc.id === c.id)
          )
        )
        .slice(0, 3)
    : [];

  if (!post) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post not found</h1>
        <Link to="/" className="mt-4 text-primary hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>
        
        {/* Meta info */}
        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
        </div>
        
        {/* Featured image */}
        {post.featuredImage && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        {/* Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-12">
            <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/tag/${tag.slug}`}
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:underline"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
        
        {/* Author bio */}
        <div className="border-t border-b border-gray-200 dark:border-gray-800 py-8 my-12">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img
                src={post.author.profileImage}
                alt={post.author.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {post.author.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {post.author.bio}
              </p>
              <div className="flex space-x-4 mt-4">
                {post.author.socialLinks?.twitter && (
                  <a
                    href={post.author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    Twitter
                  </a>
                )}
                {post.author.socialLinks?.github && (
                  <a
                    href={post.author.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    GitHub
                  </a>
                )}
                {post.author.socialLinks?.linkedin && (
                  <a
                    href={post.author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="my-12">
          <NewsletterSignup />
        </div>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="my-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} variant="compact" />
              ))}
            </div>
          </div>
        )}
        
        {/* Comments section - placeholder for future integration */}
        <div className="my-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Comments
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Comments will be available soon. Check back later!
          </p>
        </div>
      </div>
    </div>
  );
}
