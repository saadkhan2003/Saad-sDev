# Saad.dev - Blog WordPress Integration

A modern React-based frontend for WordPress, using Vite, TypeScript, and Tailwind CSS.

## Branch Structure

This repository follows a structured branching strategy as outlined in the documentation:

- `main` - Production branch
- `development` - Development branch
  - `feature/*` - Feature branches
  - `bugfix/*` - Bug fix branches
  - `hotfix/*` - Critical production fixes
  - `docs/*` - Documentation updates

## Development Workflow

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd blogwordpressnitegration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout development
   git checkout -b feature/your-feature-name
   ```

4. **Implement your changes and commit**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

5. **Push your branch**
   ```bash
   git push -u origin feature/your-feature-name
   ```

6. **Create a pull request**
   - Create a PR to merge your feature branch into the `development` branch
   - Get code reviews and address feedback
   - Once approved, merge the PR

7. **Promote to production**
   - Create a PR from `development` to `main` when features are ready for production

## Deployment

This project is deployed to Netlify from GitHub:

✅ GitHub repository is connected to Netlify
✅ Build settings configured:
   - Build command: `npm run build`
   - Publish directory: `dist`
✅ Environment variables set up in Netlify:
   - `VITE_WORDPRESS_API_URL`: URL to WordPress API
   - `VITE_USE_MOCK_DATA`: "false" for production

The site is live at: [Netlify-generated URL]

For deployment details, see the [Deployment Guide](docs/deployment-guide.md).

## Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

For more details, refer to the documentation in the `docs` folder.
```
