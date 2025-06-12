# Troubleshooting Guide

## WordPress API Integration Issues

### Posts Not Displaying on the Website

If your posts are not displaying on the website, here are some common issues and solutions:

#### 1. Mock Data is Being Used Instead of WordPress API

**Issue**: The application is configured to use mock data instead of fetching from the WordPress API.

**Solution**:
- Check the `USE_MOCK_DATA` constant in `src/hooks/use-wordpress.ts`
- It should be set to use the environment variable: 
  ```typescript
  const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
  ```
- Make sure your environment variables are properly set:
  - Local development: Set `VITE_USE_MOCK_DATA=false` in your `.env` file
  - Netlify: Check that `VITE_USE_MOCK_DATA=false` is set in `netlify.toml` for the production context

#### 2. WordPress API URL is Incorrect

**Issue**: The API URL for WordPress is incorrect or WordPress is not accessible.

**Solution**:
- Verify your WordPress site URL by testing it directly:
  ```bash
  curl -s "https://your-wordpress-site.com/wp-json/wp/v2/posts?_embed&per_page=1" | head
  ```
- Update the API URL in your environment variables:
  - Local: `VITE_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json` in `.env`
  - Netlify: Update in `netlify.toml`

#### 3. CORS Issues

**Issue**: WordPress API is not allowing cross-origin requests.

**Solution**:
- Add CORS headers to your WordPress installation as described in `wordpress-api-configuration.md`
- The key is adding this to your WordPress `functions.php` or a custom plugin:
  ```php
  add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
    if ('OPTIONS' == $_SERVER['REQUEST_METHOD']) {
      status_header(200);
      exit();
    }
  });
  ```

#### 4. No Posts Published in WordPress

**Issue**: There are no published posts in your WordPress site.

**Solution**:
- Log in to your WordPress admin dashboard
- Create and publish at least one post
- Ensure it has a title, content, and featured image if possible
- Check if the post appears in the API response:
  ```bash
  curl -s "https://your-wordpress-site.com/wp-json/wp/v2/posts?_embed&per_page=1" | head
  ```

## Netlify Deployment Issues

### Environment Variables Not Working

**Issue**: Environment variables are not being applied on Netlify.

**Solution**:
- Check your `netlify.toml` file to ensure variables are correctly set
- Redeploy your site after making changes
- You can also set environment variables in the Netlify UI:
  1. Go to your site settings in Netlify
  2. Navigate to "Build & deploy" > "Environment"
  3. Add your environment variables there

### Build Fails on Netlify

**Issue**: The build process is failing on Netlify.

**Solution**:
- Check your build logs in the Netlify dashboard
- Make sure all dependencies are correctly specified in `package.json`
- Verify your build command is correct (`npm run build` or `yarn build`)
- Ensure that your Node.js version is compatible (set in `netlify.toml` or in the UI)

## Local Development Troubleshooting

### Running with Live WordPress Data

To test your application with live WordPress data locally:

1. Create or update your `.env` file:
   ```
   VITE_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json
   VITE_USE_MOCK_DATA=false
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. If posts still don't appear, check the browser console for errors

### Verifying API Responses

Use browser developer tools to inspect network requests:

1. Open your application in Chrome or Firefox
2. Open DevTools (F12)
3. Go to the Network tab
4. Filter for "fetch" or "XHR" requests
5. Look for requests to your WordPress API
6. Examine the responses for errors or unexpected data
