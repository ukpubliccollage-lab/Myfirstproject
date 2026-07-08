# WordPress Conversion Guide

Convert your DigitalGrow website to WordPress for easier content management and scalability.

## Why Convert to WordPress?

**Advantages:**
- Easy content updates without coding
- Built-in plugin ecosystem
- Better SEO capabilities
- User management
- Media library
- Easier maintenance

**Disadvantages:**
- Slightly slower than static HTML
- Requires database
- More security considerations
- Learning curve

## Quick Comparison

| Aspect | Static HTML | WordPress |
|--------|------------|-----------|
| Setup Time | 5 minutes | 30 minutes |
| Hosting Cost | $5-15/month | $10-30/month |
| Content Updates | Code editing | Admin dashboard |
| Plugins | None | Thousands available |
| Performance | Very fast | Good (with optimization) |
| Security | Minimal attack surface | Requires updates |
| SEO | Manual | Built-in tools |
| Learning Curve | None | Low |

---

## Installation

### Step 1: Get WordPress Hosting

**Recommended Providers:**
- Bluehost (official WordPress recommendation)
- SiteGround (excellent performance)
- WP Engine (managed WordPress)
- Kinsta (premium managed)

### Step 2: Install WordPress

**Via cPanel (Most Common):**
1. Log into cPanel
2. Find "WordPress" or "Website Installers"
3. Click "Install"
4. Select domain
5. Choose admin username/password
6. Install
7. Admin URL: `yourdomain.com/wp-admin`

**Manual Installation:**
1. Download WordPress from wordpress.org
2. Upload via FTP to `public_html/`
3. Create database in cPanel
4. Run installation wizard
5. Complete setup

### Step 3: Initial Configuration

1. Log into WordPress admin dashboard
2. Set site title and tagline
3. Configure URL structure: Settings → Permalinks → "Post name"
4. Disable comments if not needed
5. Set timezone and date format

---

## Converting HTML to WordPress Theme

### Option 1: Use Existing Theme (Easiest)

1. Find suitable theme (Astra, GeneratePress, OceanWP)
2. Customize with Elementor or Visual Builder
3. Import demo content as starting point
4. Customize colors/fonts/layout
5. Add your content

**Best Theme Builder:** Elementor Pro
- Drag-and-drop interface
- Pre-made templates
- Professional results
- 1-day learning curve

### Option 2: Convert HTML to Custom Theme

#### File Structure:
```
your-theme-name/
├── style.css           (Theme info + main styles)
├── functions.php       (PHP functions)
├── index.php          (Main template)
├── header.php         (Header section)
├── footer.php         (Footer section)
├── front-page.php     (Homepage)
├── page.php           (Page template)
├── single.php         (Blog post template)
├── archive.php        (Blog archive)
├── 404.php            (Error page)
├── js/
│   └── script.js
├── css/
│   └── styles.css
├── images/
└── screenshot.png     (Theme preview)
```

#### Step 1: Create style.css

```css
/*!
Theme Name: DigitalGrow
Theme URI: https://yourdomain.com
Author: Your Name
Author URI: https://yourdomain.com
Description: Professional Digital Marketing Website
Version: 1.0.0
License: GPL-2.0
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: digitalgrow
Domain Path: /languages
*/

/* Your CSS here - copy from styles.css */
```

#### Step 2: Create functions.php

```php
<?php
/**
 * DigitalGrow Theme Functions
 */

// Add theme support
function digitalgrow_setup() {
    // Add theme support features
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo' );
    
    // Register menus
    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'digitalgrow' ),
        'footer'  => esc_html__( 'Footer Menu', 'digitalgrow' ),
    ) );
}
add_action( 'after_setup_theme', 'digitalgrow_setup' );

// Enqueue scripts and styles
function digitalgrow_scripts() {
    // Main stylesheet
    wp_enqueue_style( 'digitalgrow-style', get_stylesheet_uri() );
    
    // Google Fonts
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;500;600;700&display=swap' );
    
    // Custom CSS
    wp_enqueue_style( 'digitalgrow-custom', get_template_directory_uri() . '/css/styles.css', array(), '1.0.0' );
    
    // Custom JS
    wp_enqueue_script( 'digitalgrow-script', get_template_directory_uri() . '/js/script.js', array(), '1.0.0', true );
    
    // HTML5 shiv for older browsers
    wp_enqueue_script( 'html5shiv', 'https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js' );
}
add_action( 'wp_enqueue_scripts', 'digitalgrow_scripts' );

// Custom logo support
function digitalgrow_custom_logo() {
    $defaults = array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    );
    add_theme_support( 'custom-logo', $defaults );
}
add_action( 'after_setup_theme', 'digitalgrow_custom_logo' );

// Content width
if ( ! isset( $content_width ) ) {
    $content_width = 1200;
}

// Widget areas
function digitalgrow_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Sidebar', 'digitalgrow' ),
        'id'            => 'primary-sidebar',
        'description'   => esc_html__( 'Primary Sidebar', 'digitalgrow' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'digitalgrow_widgets_init' );

// Custom excerpt length
function digitalgrow_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'digitalgrow_excerpt_length' );

// Custom excerpt more
function digitalgrow_excerpt_more( $more ) {
    return '... <a href="' . get_the_permalink() . '">Read More →</a>';
}
add_filter( 'excerpt_more', 'digitalgrow_excerpt_more' );
```

#### Step 3: Create header.php

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    
    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="logo">
                <?php
                if ( has_custom_logo() ) {
                    the_custom_logo();
                } else {
                    echo '<h1>' . get_bloginfo( 'name' ) . '</h1>';
                }
                ?>
            </div>
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'menu_class'     => 'nav-links',
                'fallback_cb'    => 'wp_page_menu',
            ) );
            ?>
        </div>
    </nav>
```

#### Step 4: Create footer.php

```php
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. All rights reserved.</p>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
```

#### Step 5: Create front-page.php

```php
<?php
get_header();
?>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="hero-content">
            <h1><?php bloginfo( 'description' ); ?></h1>
            <p>Data-driven digital marketing strategies that deliver real results.</p>
            <a href="<?php echo site_url( '/contact' ); ?>" class="cta-btn">Get Started Today</a>
        </div>
    </div>
</section>

<!-- Services Section -->
<section class="services">
    <div class="container">
        <h2>Our Services</h2>
        <?php
        // Display services from custom post type or hardcoded
        // This is where you'd add service cards dynamically
        ?>
    </div>
</section>

<?php get_footer(); ?>
```

---

## Essential WordPress Plugins

### Security
- **Wordfence Security** - Firewall & malware scanning
- **Sucuri Security** - Monitoring & cleanup

### Performance
- **WP Super Cache** - Caching plugin
- **Imagify** - Image optimization
- **WP Rocket** - Performance optimization

### SEO
- **Yoast SEO** - On-page SEO optimization
- **Google XML Sitemaps** - Automated sitemaps

### Backup
- **UpdraftPlus** - Automated backups
- **BackWPup** - Additional backup options

### Content
- **Elementor** - Page builder
- **Contact Form 7** - Contact forms
- **Testimonials** - Client testimonials

### Analytics
- **MonsterInsights** - Google Analytics integration
- **Hotjar** - Heatmaps & recordings

### Development
- **Code Snippets** - Add code without editing functions.php
- **Query Monitor** - Debug WordPress issues

---

## WordPress Security Best Practices

### Essential Steps

1. **Update Everything**
   - Keep WordPress updated
   - Update all plugins and themes
   - Update PHP version

2. **Strong Admin Password**
   - Minimum 16 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Change default admin username (create new admin, delete default)

3. **SSL Certificate**
   - Enable HTTPS on Settings → General
   - Install SSL certificate (usually free via hosting)

4. **Limit Login Attempts**
   - Use Wordfence plugin
   - Block after 5 failed attempts

5. **Disable File Editing**
   Add to wp-config.php:
   ```php
   define( 'DISALLOW_FILE_EDIT', true );
   ```

6. **Regular Backups**
   - Automated daily backups
   - Test restore process monthly

7. **Security Plugin**
   - Install Wordfence or similar
   - Enable firewall
   - Monitor for attacks

### wp-config.php Hardening

```php
// Disable file editing
define( 'DISALLOW_FILE_EDIT', true );

// Disable plugin/theme installation
define( 'DISALLOW_FILE_MODS', true );

// Set proper permissions
define( 'FS_CHMOD_DIR', 0755 );
define( 'FS_CHMOD_FILE', 0644 );

// Debug mode off in production
define( 'WP_DEBUG', false );
define( 'WP_DEBUG_LOG', false );
define( 'WP_DEBUG_DISPLAY', false );
```

---

## Migrating Content from HTML to WordPress

### Method 1: Manual Entry (Best Control)
1. Create pages in WordPress for each HTML page
2. Copy content to page editor
3. Format with WordPress editor
4. Set featured images
5. Configure SEO

### Method 2: WordPress Importer
1. Export your site structure
2. Use WordPress Importer plugin
3. Map content to pages
4. Review and clean up

### Method 3: Custom Import Script
```php
<?php
// Add to functions.php temporarily
function import_services() {
    $services = array(
        array(
            'title' => 'SEO Optimization',
            'content' => '...',
        ),
        // More services
    );
    
    foreach ( $services as $service ) {
        wp_insert_post( array(
            'post_title'   => $service['title'],
            'post_content' => $service['content'],
            'post_type'    => 'service',
            'post_status'  => 'publish',
        ) );
    }
}
// Run once, then remove
?>
```

---

## Performance Optimization

### Caching
1. Install WP Super Cache
2. Enable caching
3. Set 1-week expiration
4. Clear cache after updates

### Images
1. Install Imagify
2. Compress all images
3. Lazy load enabled
4. Modern formats (WebP)

### Database
1. Install WP-Optimize
2. Clean revisions weekly
3. Remove spam comments
4. Optimize tables

### CDN
1. Sign up for Cloudflare (free)
2. Add domain
3. Update nameservers
4. Enable caching

---

## WordPress SEO Checklist

- [ ] Install Yoast SEO
- [ ] Configure site meta
- [ ] Enable XML sitemaps
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Configure breadcrumbs
- [ ] Set up focus keywords per page
- [ ] Enable social sharing
- [ ] Configure structured data
- [ ] Test with Google Rich Results

---

## Comparison: Keep Static HTML vs Switch to WordPress

### Keep Static HTML If:
- Simple site (5-10 pages)
- Infrequent updates
- Don't need user management
- Want maximum speed
- Limited budget
- Technical skills available

### Switch to WordPress If:
- Growing content needs
- Frequent updates required
- Need user management
- Want plugin ecosystem
- Team collaboration needed
- Less technical team members
- Blog/news updates planned

---

## Migration Checklist

- [ ] Set up WordPress hosting
- [ ] Install WordPress
- [ ] Migrate content
- [ ] Install essential plugins
- [ ] Configure SEO
- [ ] Test all pages
- [ ] Set up analytics
- [ ] Update DNS/domain
- [ ] Set up backups
- [ ] Configure security
- [ ] Performance testing
- [ ] SSL certificate installed
- [ ] Mobile responsive check
- [ ] Form testing
- [ ] Analytics verification

---

## Quick Decision Tree

```
Is your website content heavy?
├─ YES → WordPress ✓
└─ NO → Static HTML works fine

Do you update content frequently?
├─ YES → WordPress ✓
└─ NO → Either works

Do you have a large team managing content?
├─ YES → WordPress ✓
└─ NO → Static HTML simpler

Do you need plugins for functionality?
├─ YES → WordPress ✓
└─ NO → Static HTML faster

Is performance critical?
├─ YES → Static HTML ✓
└─ NO → WordPress fine
```

---

## Resources

- **WordPress Codex:** https://codex.wordpress.org
- **WordPress Documentation:** https://developer.wordpress.org
- **Theme Development:** https://developer.wordpress.org/themes
- **Plugin Development:** https://developer.wordpress.org/plugins
- **Security Guide:** https://wordpress.org/support/article/hardening-wordpress

**Last Updated:** July 2026
