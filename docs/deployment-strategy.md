# 📄 Deployment Strategy

## Deployment Environments

### 1. Development (Dev)

* **Purpose**: Active development and integration testing
* **URL**: `dev.saad.dev`
* **Update Frequency**: Automatic on every push to `development` branch
* **Content**: Connected to development WordPress instance
* **Environment Variables**:
  * `VITE_WORDPRESS_API_URL=https://dev-wp.saad.dev/wp-json`
  * `VITE_USE_MOCK_DATA=false`

### 2. Staging

* **Purpose**: QA, client review, pre-production testing
* **URL**: `staging.saad.dev`
* **Update Frequency**: Manual promotion from Development
* **Content**: Connected to staging WordPress instance (mirror of production)
* **Environment Variables**:
  * `VITE_WORDPRESS_API_URL=https://staging-wp.saad.dev/wp-json`
  * `VITE_USE_MOCK_DATA=false`

### 3. Production

* **Purpose**: Live site for public access
* **URL**: `saad.dev`
* **Update Frequency**: Manual promotion from Staging after QA approval
* **Content**: Connected to production WordPress instance
* **Environment Variables**:
  * `VITE_WORDPRESS_API_URL=https://wp.saad.dev/wp-json`
  * `VITE_USE_MOCK_DATA=false`
  * `VITE_GA_TRACKING_ID=UA-XXXXXXX-1`

## CI/CD Pipeline Configuration

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches:
      - development
      - main
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Lint
        run: npm run lint
        
      - name: Build
        run: npm run build
        env:
          VITE_WORDPRESS_API_URL: ${{ github.ref == 'refs/heads/main' && secrets.PROD_WP_API_URL || secrets.DEV_WP_API_URL }}
          VITE_USE_MOCK_DATA: 'false'
          VITE_GA_TRACKING_ID: ${{ github.ref == 'refs/heads/main' && secrets.PROD_GA_ID || '' }}
          
      - name: Deploy to Development
        if: github.ref == 'refs/heads/development'
        uses: netlify/actions/cli@master
        with:
          args: deploy --dir=dist --prod
        env:
          NETLIFY_SITE_ID: ${{ secrets.DEV_NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          
      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        uses: netlify/actions/cli@master
        with:
          args: deploy --dir=dist --prod
        env:
          NETLIFY_SITE_ID: ${{ secrets.PROD_NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

## Manual Deployment Steps

If not using CI/CD, follow these steps for manual deployment:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to hosting platform**:
   
   **Netlify CLI**:
   ```bash
   netlify deploy --dir=dist --prod
   ```
   
   **Vercel CLI**:
   ```bash
   vercel --prod
   ```
   
   **AWS S3 + CloudFront**:
   ```bash
   aws s3 sync dist/ s3://saad-dev-bucket --delete
   aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
   ```

## Hosting Recommendations

### Recommended Platform: Netlify

* **Benefits**:
  * Global CDN
  * Easy SSL setup
  * Branch deploys
  * Deploy previews for PRs
  * Form handling for newsletter integration
  * Serverless functions if needed

### Alternative Options:

* **Vercel**: Similar features to Netlify, excellent for React apps
* **Cloudflare Pages**: Fast global CDN, generous free tier
* **AWS Amplify**: Good option if already using AWS ecosystem

## DNS Configuration

* Point `saad.dev` to the production Netlify/Vercel site
* Create CNAME records for `dev.saad.dev` and `staging.saad.dev`
* Set up HTTPS for all environments

## Post-Deployment Verification

After each deployment, verify:

1. **Site functionality**:
   * Homepage loads
   * Posts are fetched from WordPress
   * Images display correctly
   * Links work

2. **Performance**:
   * Run Lighthouse audit
   * Check page load times

3. **Analytics and Monitoring**:
   * Verify Google Analytics is tracking
   * Set up uptime monitoring with Pingdom, UptimeRobot, or similar

## Rollback Strategy

In case of issues:

1. **Netlify/Vercel**: Roll back to previous deployment via dashboard
2. **Manual**: Keep previous build artifacts and redeploy if needed

## Monitoring and Maintenance

* Set up uptime monitoring with alerts
* Configure error tracking with Sentry
* Schedule regular WordPress updates
* Monitor API performance and response times
