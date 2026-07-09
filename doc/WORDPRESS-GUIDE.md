# WordPress Integration Guide

## Overview
Integrate this DigitalGrow website with WordPress for flexible content management.

## Installation

### Step 1: Create Custom Theme
1. Create `/wp-content/themes/digitalgrow/`
2. Add `style.css` header:
```css
/*
Theme Name: DigitalGrow
Theme URI: https://yoursite.com
Description: Professional digital marketing theme
Author: Your Name
Version: 1.0
*/
```

### Step 2: Copy Files
- Copy `index.html` content to `index.php`
- Copy `styles.css` as-is
- Copy `script.js` to `/js/main.js`

### Step 3: WordPress Functions
Create `functions.php`:
```php
<?php
// Enqueue styles & scripts
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('digitalgrow', get_stylesheet_uri());
    wp_enqueue_script('digitalgrow', get_template_directory_uri() . '/js/main.js', array(), '1.0', true);
});

// Add theme support
add_theme_support('title-tag');
add_theme_support('custom-logo');
?>
```

## Converting Sections to Dynamic Content

### Services Section
Use custom post type:
```php
register_post_type('service', array(
    'public' => true,
    'has_archive' => true,
    'label' => 'Services'
));
```

### Portfolio Section
Use portfolio custom post type:
```php
register_post_type('portfolio', array(
    'public' => true,
    'label' => 'Portfolio'
));
```

### Contact Form
Use Contact Form 7 plugin or built-in WordPress form.

## Setup Checklist
- [ ] Create theme directory
- [ ] Add style.css header
- [ ] Create index.php from HTML
- [ ] Add functions.php
- [ ] Enqueue assets correctly
- [ ] Test responsive design
- [ ] Set up custom post types
- [ ] Configure contact form
- [ ] Enable permalink structure
- [ ] Add theme to WordPress

## Recommended Plugins
- Yoast SEO
- Jetpack
- Contact Form 7
- Akismet
- WP Fastest Cache

## Performance Tips
- Enable caching (WP Fastest Cache)
- Optimize images
- Use CDN (Jetpack or Cloudflare)
- Minify CSS/JS
- Remove unused plugins
