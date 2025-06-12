import { useState, useEffect } from 'react';
import { wordpressApi } from '../services/wordpress-api';
import type { Post, Category } from '../types/blog';
import { mockPosts } from '../data/mockData';

// Use environment variable for controlling mock data, fallback to false
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

/**
 * Custom hook for fetching posts from WordPress
 */
export function usePosts(page: number = 1, options: { featured?: boolean, useMock?: boolean } = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const useMockData = options.useMock !== undefined ? options.useMock : USE_MOCK_DATA;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        if (useMockData) {
          // Use mock data for development
          let filteredPosts = [...mockPosts];
          
          if (options.featured) {
            filteredPosts = filteredPosts.filter(post => post.isFeatured);
          }
          
          // Simple pagination for mock data
          const postsPerPage = 6;
          const startIndex = (page - 1) * postsPerPage;
          const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
          
          setTotalPages(Math.ceil(filteredPosts.length / postsPerPage));
          setPosts(paginatedPosts);
        } else {
          // Use WordPress API
          const result = await wordpressApi.getPosts(page, { 
            featured: options.featured 
          });
          setPosts(result);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, options.featured, useMockData]);

  return { posts, loading, error, totalPages, currentPage: page };
}

/**
 * Custom hook for fetching a single post by slug
 */
export function usePost(slug: string | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        // For development with mock data, use the following line instead:
        // const result = getPostBySlug(slug);
        const result = await wordpressApi.getPostBySlug(slug);
        
        if (!result) {
          setError(new Error('Post not found'));
          setPost(null);
        } else {
          setPost(result);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch post'));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}

/**
 * Custom hook for fetching posts by category
 */
export function usePostsByCategory(categorySlug: string | undefined, page: number = 1) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categorySlug) {
      setLoading(false);
      return;
    }

    const fetchCategoryPosts = async () => {
      try {
        setLoading(true);
        // For development with mock data, use the following line instead:
        // const result = getPostsByCategory(categorySlug);
        const result = await wordpressApi.getPostsByCategory(categorySlug, page);
        setPosts(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch category posts'));
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [categorySlug, page]);

  return { posts, loading, error };
}

/**
 * Custom hook for searching posts
 */
export function useSearchPosts(query: string, page: number = 1) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setPosts([]);
      return;
    }

    const searchForPosts = async () => {
      try {
        setLoading(true);
        // For development with mock data, use the following line instead:
        // const result = searchPosts(query);
        const result = await wordpressApi.searchPosts(query, page);
        setPosts(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to search posts'));
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      searchForPosts();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, page]);

  return { posts, loading, error };
}

/**
 * Custom hook for fetching all categories
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await wordpressApi.getCategories();
        setCategories(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
