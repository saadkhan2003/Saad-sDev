# Saad.dev - Tech News Blog Website

A professional tech news blog website built with React, TypeScript, and Tailwind CSS. This website features the latest articles in the tech industry, with a clean and modern user interface.

## Features

- **Clean, Modern Design** - Mobile-responsive layout built with Tailwind CSS
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Content Management** - Ready for WordPress headless CMS integration
- **Article Pages** - Featured posts, category sections, and post details
- **Search Functionality** - Find content quickly with search capabilities
- **Newsletter Signup** - Collect emails for your newsletter
- **Developer-friendly** - Built with TypeScript, path aliases, and clean architecture

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui inspiration
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Backend**: Ready for WordPress as a headless CMS

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/saad-dev-blog.git
cd saad-dev-blog
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```
```

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components for different routes
- `src/hooks/` - Custom React hooks
- `src/services/` - API services including WordPress API
- `src/types/` - TypeScript type definitions
- `src/lib/` - Utility functions and helpers
- `src/data/` - Mock data for development

## WordPress Integration

The blog is designed to work with WordPress as a headless CMS. To connect to your WordPress site:

1. Update the API base URL in `src/services/wordpress-api.ts`
2. Set `USE_MOCK_DATA` to `false` in `src/hooks/use-wordpress.ts`
3. Ensure your WordPress site has the WP REST API and CORS properly configured

## Upcoming Features

- Comments system integration (Supabase or Disqus)
- Mailchimp or Buttondown newsletter integration
- Author profiles
- Related posts
- Social sharing
- Analytics integration

## License

MIT

---

Created by Saad Khan | June 2025
  },
})
```
