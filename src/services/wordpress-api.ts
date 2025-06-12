import type { Author, Category, Post, Tag } from '../types/blog';

// Use the WordPress API URL from environment variables
const API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://saad.catchitagency.com/wp-json';

interface WordPressPostResponse {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: 'category' | 'post_tag';
    }>>;
    'author'?: Array<{
      id: number;
      name: string;
      description: string;
      avatar_urls: {
        [key: string]: string;
      };
    }>;
  };
}

// Default values for fallback if WordPress API fails
const fallbackAuthor: Author = {
  id: '1',
  name: 'Saad Khan',
  bio: 'Tech enthusiast and developer.',
  profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&auto=format&fit=crop',
};

class WordPressApiService {
  private apiBase: string;
  private perPage: number;

  constructor(apiBase: string = `${API_URL}/wp/v2`, perPage: number = 10) {
    this.apiBase = apiBase;
    this.perPage = perPage;
  }

  // Helper method to transform WordPress response to our Post type
  private transformPost(wpPost: WordPressPostResponse): Post {
    // Extract featured image
    const featuredImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    
    // Extract categories
    const categories: Category[] = (wpPost._embedded?.['wp:term']?.[0] || [])
      .filter(term => term.taxonomy === 'category')
      .map(term => ({
        id: String(term.id),
        name: term.name,
        slug: term.slug,
      }));
    
    // Extract tags
    const tags: Tag[] = (wpPost._embedded?.['wp:term']?.[1] || [])
      .filter(term => term.taxonomy === 'post_tag')
      .map(term => ({
        id: String(term.id),
        name: term.name,
        slug: term.slug,
      }));
    
    // Extract author
    const wpAuthor = wpPost._embedded?.author?.[0];
    const author: Author = wpAuthor ? {
      id: String(wpAuthor.id),
      name: wpAuthor.name,
      bio: wpAuthor.description,
      profileImage: wpAuthor.avatar_urls['96'] || '',
    } : fallbackAuthor;
    
    // Calculate estimated reading time (rough approximation)
    const wordCount = wpPost.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Assuming 200 words per minute
    
    return {
      id: String(wpPost.id),
      title: wpPost.title.rendered,
      slug: wpPost.slug,
      excerpt: wpPost.excerpt.rendered.replace(/<[^>]*>/g, ''),
      content: wpPost.content.rendered,
      featuredImage,
      publishedDate: wpPost.date,
      updatedDate: wpPost.modified,
      author,
      categories,
      tags,
      readingTime,
      isFeatured: false, // This would be determined by your WordPress setup (custom field, etc.)
    };
  }

  /**
   * Fetch posts from WordPress API
   */
  async getPosts(page: number = 1, options: { featured?: boolean } = {}): Promise<Post[]> {
    try {
      let url = `${this.apiBase}/posts?_embed&page=${page}&per_page=${this.perPage}`;
      
      // Add featured filter if needed
      if (options.featured) {
        // Assuming you have ACF field for featured posts
        url += '&acf_filter[featured]=true';
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const posts: WordPressPostResponse[] = await response.json();
      return posts.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [];
    }
  }

  /**
   * Get a single post by slug
   */
  async getPostBySlug(slug: string): Promise<Post | null> {
    try {
      const response = await fetch(
        `${this.apiBase}/posts?_embed&slug=${slug}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const posts: WordPressPostResponse[] = await response.json();
      
      if (posts.length === 0) {
        return null;
      }
      
      return this.transformPost(posts[0]);
    } catch (error) {
      console.error(`Failed to fetch post ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(categorySlug: string, page: number = 1): Promise<Post[]> {
    try {
      // First get the category ID from slug
      const categoryResponse = await fetch(
        `${this.apiBase}/categories?slug=${categorySlug}`
      );
      
      if (!categoryResponse.ok) {
        throw new Error(`API error: ${categoryResponse.status}`);
      }
      
      const categories = await categoryResponse.json();
      
      if (categories.length === 0) {
        return [];
      }
      
      const categoryId = categories[0].id;
      
      // Then get posts with this category
      const response = await fetch(
        `${this.apiBase}/posts?_embed&categories=${categoryId}&page=${page}&per_page=${this.perPage}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const posts: WordPressPostResponse[] = await response.json();
      return posts.map(post => this.transformPost(post));
    } catch (error) {
      console.error(`Failed to fetch posts for category ${categorySlug}:`, error);
      return [];
    }
  }

  /**
   * Search posts
   */
  async searchPosts(query: string, page: number = 1): Promise<Post[]> {
    try {
      const response = await fetch(
        `${this.apiBase}/posts?_embed&search=${encodeURIComponent(query)}&page=${page}&per_page=${this.perPage}`
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const posts: WordPressPostResponse[] = await response.json();
      return posts.map(post => this.transformPost(post));
    } catch (error) {
      console.error(`Failed to search posts for "${query}":`, error);
      return [];
    }
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(
        `${this.apiBase}/categories?per_page=100` // Adjust if you have more than 100 categories
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const wpCategories = await response.json();
      
      return wpCategories.map((cat: any) => ({
        id: String(cat.id),
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      }));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  }
}

// Create a singleton instance
export const wordpressApi = new WordPressApiService();

export default WordPressApiService;
