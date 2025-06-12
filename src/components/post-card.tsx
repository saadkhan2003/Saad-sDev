import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Post } from '../types/blog';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (variant === 'featured') {
    return (
      <article className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {post.featuredImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            <Link to={`/post/${post.slug}`} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <Link
            to={`/post/${post.slug}`}
            className="inline-flex items-center space-x-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            <span>Read more</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="flex space-x-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
        {post.featuredImage && (
          <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>{formatDate(post.publishedDate)}</span>
            <span>•</span>
            <span>{post.readingTime} min</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            <Link to={`/post/${post.slug}`} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          <Link to={`/post/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <Link
          to={`/post/${post.slug}`}
          className="inline-flex items-center space-x-2 text-primary font-medium hover:text-primary/80 transition-colors"
        >
          <span>Read more</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
