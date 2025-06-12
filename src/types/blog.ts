export interface Author {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  email?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  publishedDate: string;
  updatedDate?: string;
  author: Author;
  categories: Category[];
  tags: Tag[];
  readingTime: number;
  isFeatured?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
  timestamp: string;
  isApproved: boolean;
}
