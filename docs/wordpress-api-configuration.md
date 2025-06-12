# 📄 WordPress API Configuration Guide

## Setting Up WordPress as a Headless CMS

### Prerequisites

* WordPress instance (v5.9+)
* Administrative access to the WordPress site
* The following plugins installed and activated:
  * [JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
  * [WP REST API Menus](https://wordpress.org/plugins/wp-rest-api-menus/)
  * [Advanced Custom Fields (ACF)](https://wordpress.org/plugins/advanced-custom-fields/) (optional, for extended content fields)
  * [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/) (if using ACF)

### WordPress Configuration Steps

1. **Enable REST API**

   * Go to Settings > Permalinks
   * Select a permalink structure (anything except "Plain")
   * Save changes

2. **Configure JWT Authentication**

   * Add to your WordPress `.htaccess` file:
   ```
   RewriteEngine on
   RewriteCond %{HTTP:Authorization} ^(.*)
   RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
   ```
   
   * Add to your `wp-config.php` file:
   ```php
   define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
   define('JWT_AUTH_CORS_ENABLE', true);
   ```

3. **Create Custom Post Types** (Optional)

   * If needed, define custom post types for specialized content types
   * Ensure they're configured to be shown in the REST API

4. **Configure CORS**

   * Add to your `functions.php` or create a custom plugin:
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

## API Endpoints

### Key Endpoints

* **Posts**: `/wp-json/wp/v2/posts`
* **Categories**: `/wp-json/wp/v2/categories`
* **Tags**: `/wp-json/wp/v2/tags`
* **Media**: `/wp-json/wp/v2/media`
* **Users**: `/wp-json/wp/v2/users`
* **Menus**: `/wp-json/wp-api-menus/v2/menus`

### Common Query Parameters

* `_embed=true` - Include embedded resources (e.g. featured images, authors)
* `per_page=10` - Number of items per page
* `page=1` - Page number
* `categories=1,2,3` - Filter by category IDs
* `tags=4,5,6` - Filter by tag IDs
* `search=keyword` - Search posts by keyword

### Authentication

For public content like posts and categories, no authentication is required. 
For admin actions (creating/updating content), use the JWT authentication:

```javascript
// Login to get token
const response = await fetch('https://your-wp-site.com/wp-json/jwt-auth/v1/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'your-username',
    password: 'your-password',
  }),
});

const { token } = await response.json();

// Use the token for authenticated requests
const protectedResponse = await fetch('https://your-wp-site.com/wp-json/wp/v2/posts', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

## Rate Limits and Performance Considerations

* WordPress REST API doesn't have built-in rate limiting, but hosting providers might
* Consider caching strategies for frequent API calls
* Use query parameters efficiently to reduce response size
* Implement server-side caching with page caching plugins for WordPress

## Custom Endpoints

If needed, create custom endpoints for specialized functionality:

```php
add_action('rest_api_init', function() {
  register_rest_route('saad/v1', '/featured-posts', array(
    'methods' => 'GET',
    'callback' => 'get_featured_posts',
    'permission_callback' => '__return_true'
  ));
});

function get_featured_posts() {
  // Custom logic to return featured posts
}

```
*newe
## Troubleshooting Common Issues

* **CORS errors**: Verify CORS headers are properly set up
* **Authentication failures**: Check JWT secret key and credentials
* **Missing content**: Ensure post types are configured to show in REST API
* **Empty responses**: Check user permissions and visibility settings
* **Slow responses**: Consider optimizing WordPress with caching plugins
