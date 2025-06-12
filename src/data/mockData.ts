import type { Post, Author, Category, Tag } from '../types/blog';
import { authorImage, images } from './images';

export const author: Author = {
  id: '1',
  name: 'Saad Khan',
  bio: 'Tech enthusiast and developer passionate about AI, startups, and the future of technology. I write about the latest trends and insights in the tech industry.',
  profileImage: authorImage,
  email: 'saad@saad.dev',
  socialLinks: {
    twitter: 'https://twitter.com/saadkhan',
    github: 'https://github.com/saadkhan',
    linkedin: 'https://linkedin.com/in/saadkhan',
  },
};

export const categories: Category[] = [
  { id: '1', name: 'AI', slug: 'ai', description: 'Artificial Intelligence and Machine Learning' },
  { id: '2', name: 'Gadgets', slug: 'gadgets', description: 'Latest tech gadgets and reviews' },
  { id: '3', name: 'Startups', slug: 'startups', description: 'Startup news and entrepreneurship' },
  { id: '4', name: 'Programming', slug: 'programming', description: 'Software development and coding' },
  { id: '5', name: 'Industry', slug: 'industry', description: 'Tech industry news and analysis' },
];

export const tags: Tag[] = [
  { id: '1', name: 'Machine Learning', slug: 'machine-learning' },
  { id: '2', name: 'React', slug: 'react' },
  { id: '3', name: 'TypeScript', slug: 'typescript' },
  { id: '4', name: 'OpenAI', slug: 'openai' },
  { id: '5', name: 'Web Development', slug: 'web-development' },
  { id: '6', name: 'Mobile', slug: 'mobile' },
  { id: '7', name: 'Cloud', slug: 'cloud' },
  { id: '8', name: 'Security', slug: 'security' },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of AI in Web Development: What Developers Need to Know',
    slug: 'future-of-ai-web-development',
    excerpt: 'Explore how artificial intelligence is revolutionizing web development and what it means for developers in 2025.',
    content: `
      <p>Artificial Intelligence is rapidly transforming the landscape of web development. From automated code generation to intelligent debugging, AI tools are becoming indispensable for modern developers.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Tools like GitHub Copilot, Tabnine, and ChatGPT are changing how we write code. These AI assistants can:</p>
      <ul>
        <li>Generate boilerplate code automatically</li>
        <li>Suggest optimizations and improvements</li>
        <li>Help debug complex issues</li>
        <li>Translate code between different languages</li>
      </ul>
      
      <h2>The Impact on Developer Workflow</h2>
      <p>AI is not replacing developers but augmenting their capabilities. By automating repetitive tasks, developers can focus on more creative and strategic aspects of software development.</p>
      
      <h2>What's Next?</h2>
      <p>As AI continues to evolve, we can expect even more sophisticated tools that understand context better and provide more intelligent suggestions. The key is to embrace these tools while continuing to develop fundamental programming skills.</p>
    `,
    featuredImage: images['ai-web-dev'],
    publishedDate: '2025-06-10T10:00:00Z',
    author,
    categories: [categories[0], categories[3]],
    tags: [tags[0], tags[4]],
    readingTime: 5,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Building Modern React Applications with TypeScript: Best Practices',
    slug: 'modern-react-typescript-best-practices',
    excerpt: 'Learn the essential best practices for building scalable React applications with TypeScript in 2025.',
    content: `
      <p>TypeScript has become the de facto standard for building large-scale React applications. Here are the best practices you should follow.</p>
      
      <h2>Project Structure</h2>
      <p>Organize your project with a clear folder structure that scales:</p>
      <ul>
        <li>Components organized by feature</li>
        <li>Shared utilities and hooks in dedicated folders</li>
        <li>Type definitions in a centralized location</li>
      </ul>
      
      <h2>Type Safety</h2>
      <p>Leverage TypeScript's type system to catch errors early and improve developer experience.</p>
      
      <h2>Performance Optimization</h2>
      <p>Use React's built-in optimization techniques along with TypeScript for maximum performance.</p>
    `,
    featuredImage: images['react-typescript'],
    publishedDate: '2025-06-08T14:30:00Z',
    author,
    categories: [categories[3]],
    tags: [tags[1], tags[2], tags[4]],
    readingTime: 8,
  },
  {
    id: '3',
    title: 'Top 10 Tech Gadgets That Will Define 2025',
    slug: 'top-tech-gadgets-2025',
    excerpt: 'Discover the most innovative gadgets and devices that are set to make a significant impact this year.',
    content: `
      <p>2025 is shaping up to be an exciting year for technology enthusiasts. Here are the top gadgets that are defining the year.</p>
      
      <h2>1. Next-Generation VR Headsets</h2>
      <p>Virtual reality is finally reaching mainstream adoption with lighter, more powerful headsets.</p>
      
      <h2>2. AI-Powered Smart Homes</h2>
      <p>Home automation is getting smarter with AI that truly understands your preferences.</p>
      
      <h2>3. Foldable Smartphones</h2>
      <p>The third generation of foldable phones finally gets it right with improved durability and software.</p>
      
      <h2>And More...</h2>
      <p>From wearable health monitors to autonomous delivery drones, technology continues to amaze us.</p>
    `,
    featuredImage: images['tech-gadgets-2025'],
    publishedDate: '2025-06-05T09:15:00Z',
    author,
    categories: [categories[1]],
    tags: [tags[5], tags[0]],
    readingTime: 6,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'The Rise of Edge Computing: Why It Matters for Your Applications',
    slug: 'rise-of-edge-computing',
    excerpt: 'Understanding edge computing and its implications for modern application development and user experience.',
    content: `
      <p>Edge computing is transforming how we think about application architecture and data processing.</p>
      
      <h2>What is Edge Computing?</h2>
      <p>Edge computing brings computation and data storage closer to the sources of data to improve response times and save bandwidth.</p>
      
      <h2>Benefits for Developers</h2>
      <ul>
        <li>Reduced latency</li>
        <li>Improved performance</li>
        <li>Better user experience</li>
        <li>Reduced bandwidth costs</li>
      </ul>
      
      <h2>Implementation Strategies</h2>
      <p>Learn how to architect your applications to take advantage of edge computing platforms.</p>
    `,
    featuredImage: images['edge-computing'],
    publishedDate: '2025-06-03T16:45:00Z',
    author,
    categories: [categories[4], categories[3]],
    tags: [tags[6], tags[4]],
    readingTime: 7,
  },
  {
    id: '5',
    title: 'Startup Spotlight: 5 Companies Disrupting Traditional Industries',
    slug: 'startup-spotlight-disrupting-industries',
    excerpt: 'Meet the innovative startups that are challenging established players and creating new markets.',
    content: `
      <p>These startups are not just creating new products—they're reimagining entire industries.</p>
      
      <h2>1. FinTech Revolution</h2>
      <p>How new financial technology companies are making banking more accessible and efficient.</p>
      
      <h2>2. HealthTech Innovation</h2>
      <p>Startups using AI and wearables to revolutionize healthcare delivery.</p>
      
      <h2>3. EdTech Transformation</h2>
      <p>Companies making education more personalized and accessible through technology.</p>
      
      <h2>4. CleanTech Solutions</h2>
      <p>Startups tackling climate change with innovative clean technology solutions.</p>
      
      <h2>5. FoodTech Disruption</h2>
      <p>How technology is changing the way we produce, distribute, and consume food.</p>
    `,
    featuredImage: images['startup-spotlight'],
    publishedDate: '2025-06-01T11:20:00Z',
    author,
    categories: [categories[2]],
    tags: [tags[0]],
    readingTime: 9,
  },
];

// Helper functions
export function getPostBySlug(slug: string): Post | undefined {
  return mockPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return mockPosts.filter(post => 
    post.categories.some(category => category.slug === categorySlug)
  );
}

export function getFeaturedPosts(): Post[] {
  return mockPosts.filter(post => post.isFeatured);
}

export function searchPosts(query: string): Post[] {
  const searchTerm = query.toLowerCase();
  return mockPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm))
  );
}
