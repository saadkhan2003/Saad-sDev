# Deployment Guide for Saad.dev WordPress Integration

This document provides a step-by-step guide for deploying the Saad.dev WordPress Integration to Netlify from GitHub.

## GitHub Setup

The project has been pushed to GitHub with the following branch structure:

- `main` - Production branch
- `development` - Development branch
- `feature/wordpress-integration` - Feature branch for WordPress API integration

GitHub Repository: [https://github.com/saadkhan2003/Saad-sDev](https://github.com/saadkhan2003/Saad-sDev)

## Netlify Deployment

### Initial Setup

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub as your Git provider
4. Select the repository `saadkhan2003/Saad-sDev`
5. Configure build settings:
   - Branch to deploy: `main`
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Environment Variables

The following environment variables are automatically set based on the `netlify.toml` configuration:

- **Production (main branch):**
  - `VITE_WORDPRESS_API_URL`: "https://saad.catchitagency.com/wp-json"
  - `VITE_USE_MOCK_DATA`: "false"

- **Deploy Preview (PR):**
  - `VITE_WORDPRESS_API_URL`: "https://saad.catchitagency.com/wp-json"
  - `VITE_USE_MOCK_DATA`: "false"

- **Branch Deploy (other branches):**
  - `VITE_WORDPRESS_API_URL`: "https://saad.catchitagency.com/wp-json"
  - `VITE_USE_MOCK_DATA`: "true"

### Custom Domain Setup (Future)

1. In the Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `blog.saad.dev`)
4. Follow the DNS configuration instructions

## Continuous Deployment

The project is set up for continuous deployment with the following workflow:

1. Changes to `feature/*` branches trigger branch deploys (for testing)
2. Pull requests to `development` trigger deploy previews
3. Merges to `main` trigger production deployments

## Deployment Checklist

Before merging to `main` for production deployment:

- [ ] All tests pass
- [ ] Code has been reviewed
- [ ] WordPress API integration is verified with live data
- [ ] Performance optimizations are applied
- [ ] SEO metadata is properly configured

## Rollback Procedure

If issues occur after deployment:

1. In the Netlify dashboard, go to "Deploys"
2. Find the last working deploy
3. Click the three dots (⋮) next to it
4. Select "Publish deploy"
