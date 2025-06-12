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

This project is set up for deployment to Netlify from GitHub:

1. Connect your GitHub repository to Netlify
2. Configure the following build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set up environment variables in the Netlify dashboard
   - `VITE_WORDPRESS_API_URL`: URL to your WordPress API (e.g., https://saad.catchitagency.com/wp-json)
   - `VITE_USE_MOCK_DATA`: Set to "false" for production

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
