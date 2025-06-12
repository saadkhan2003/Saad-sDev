import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';
import { formatDate } from '../lib/helpers';
import type { Post } from '../types/blog';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  if (isFeatured) {
    return (
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 hover:shadow-2xl transition-all duration-500 animate-fadeIn">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Featured Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-0 shadow-lg">
                ✨ Featured
              </Badge>
            </div>

            {/* Engagement Stats */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="glass-effect rounded-full px-3 py-1 text-sm text-white/90 flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {Math.floor(Math.random() * 5000) + 1000}
              </div>
              <div className="glass-effect rounded-full px-3 py-1 text-sm text-white/90 flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {Math.floor(Math.random() * 500) + 50}
              </div>
            </div>
          </div>

          <CardHeader className="relative pb-2">
            <div className="flex items-center gap-2 mb-3">
              {post.categories.slice(0, 2).map((category) => (
                <Badge key={category.id} variant="secondary" className="text-xs">
                  {category.name}
                </Badge>
              ))}
            </div>

            <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
              <Link to={`/post/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>

            <p className="text-muted-foreground text-base line-clamp-2 mt-2">
              {post.excerpt}
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  src={post.author.profileImage}
                  fallback={post.author.name}
                  className="w-10 h-10"
                />
                <div>
                  <p className="font-medium text-sm">{post.author.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.publishedDate)}
                    <Clock className="w-3 h-3 ml-1" />
                    {post.readingTime} min read
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="sm" className="group/btn">
                Read More
                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  if (isCompact) {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 animate-fadeIn">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {post.categories[0]?.name}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                <Link to={`/post/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <User className="w-3 h-3 mr-1" />
                {post.author.name}
                <span className="mx-1">•</span>
                {formatDate(post.publishedDate)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 border-border/50 animate-slideUp">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" variant="secondary" className="glass-effect border-0 shadow-lg">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          {post.categories.slice(0, 2).map((category) => (
            <Badge key={category.id} variant="outline" className="text-xs border-primary/20 text-primary">
              {category.name}
            </Badge>
          ))}
        </div>

        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-300">
          <Link to={`/post/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {post.excerpt}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              src={post.author.profileImage}
              fallback={post.author.name}
              className="w-8 h-8"
            />
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <div className="flex items-center text-xs text-muted-foreground gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedDate)}
              </div>
            </div>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {post.readingTime} min read
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
