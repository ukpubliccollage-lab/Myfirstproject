# Deployment Guide

Complete guide to deploy your DigitalGrow website to production hosting.

## Table of Contents

1. [Quick Deployment](#quick-deployment)
2. [Platform-Specific Guides](#platform-specific-guides)
3. [Custom Domain Setup](#custom-domain-setup)
4. [SSL/HTTPS Configuration](#ssltls-configuration)
5. [Performance Optimization](#performance-optimization)
6. [Analytics & Tracking](#analytics--tracking)
7. [SEO Configuration](#seo-configuration)
8. [Troubleshooting](#troubleshooting)

---

## Quick Deployment

### Netlify (Recommended - Easiest)

**Option A: Connect GitHub**
1. Push your files to GitHub
2. Visit [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git"
4. Select your repository
5. Build command: (leave empty - static site)
6. Publish directory: `.` (or `/`)
7. Deploy

**Option B: Drag & Drop**
1. Create a folder with `index.html`, `styles.css`, `script.js`, `blog.html`, `services-seo.html`
2. Visit [netlify.com](https://netlify.com)
3. Drag the folder onto the page
4. Done! Your site is live

### Vercel (Very Fast)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Auto-deployed on every push

### GitHub Pages (Free)

1. Create a GitHub repository named `username.github.io`
2. Push all files to main branch
3. Site goes live at `https://username.github.io`

---

## Platform-Specific Guides

### Netlify Configuration

Create `netlify.toml` in your root directory:

```toml
[build]
  command = ""
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Vercel Configuration

Create `vercel.json` in your root directory:

```json
{
  "buildCommand": "",
  "outputDirectory": ".",
  "public": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        }
      ]
    }
  ]
}
```

### Traditional Web Hosting (cPanel)

1. **Connect via FTP**
   - Get FTP credentials from your host
   - Use FileZilla or similar FTP client
   - Upload files to `public_html/` folder

2. **SSH Upload** (if available)
   ```bash
   scp -r ./* user@yourhost.com:/home/user/public_html/
   ```

3. **Create .htaccess** (for Apache servers)
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### AWS S3 + CloudFront

1. Create S3 bucket
2. Upload all files
3. Enable "Static website hosting"
4. Create CloudFront distribution
5. Point domain to CloudFront

---

## Custom Domain Setup

### Connecting Your Domain

#### Netlify
1. In Netlify dashboard → Domain settings
2. Add custom domain
3. Update DNS records at your domain registrar
4. Follow Netlify's DNS instructions

#### Vercel
1. In project settings → Domains
2. Add your domain
3. Update nameservers or DNS records
4. Wait for DNS propagation (up to 48 hours)

#### GoDaddy / Namecheap
1. Log into your domain registrar
2. Find DNS/Nameserver settings
3. Update to:
   - **Netlify:** `dns1.netlify.com` and `dns2.netlify.com`
   - **Vercel:** `ns1.vercel.com`, `ns2.vercel.com`
4. Save changes
5. Wait for DNS propagation

### DNS Records (If Not Using Nameservers)

Add these A records (if using traditional DNS):

```
Type: A
Name: @ (or your domain)
Value: 76.76.19.165 (or your provider's IP)
```

---

## SSL/TLS Configuration

### Automatic (Recommended)

Most platforms handle SSL automatically:
- ✅ Netlify: Automatic via Let's Encrypt
- ✅ Vercel: Automatic via Let's Encrypt
- ✅ GitHub Pages: Automatic HTTPS
- ⚠️ Traditional hosting: Usually auto with cPanel

### Manual SSL Certificate

If needed, request free certificate from Let's Encrypt:

```bash
# Using Certbot
certbot certonly --standalone -d yourdomain.com
```

Then install on your server per host's instructions.

---

## Performance Optimization

### Enable Caching

**Netlify Cache Settings:**
```toml
[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

### Image Optimization

1. Compress images before upload using:
   - TinyPNG
   - ImageOptim
   - Squoosh

2. Use modern formats (WebP)

3. Serve appropriately sized images

### Minification

Netlify and Vercel auto-minify. For manual minification:

**CSS:**
```bash
npm install -g cssnano-cli
cssnano styles.css -o styles.min.css
```

**JavaScript:**
```bash
npm install -g terser
terser script.js -o script.min.js
```

### CDN Distribution

- **Netlify:** Built-in global CDN
- **Vercel:** Built-in global CDN
- **Traditional:** Use Cloudflare (free tier)

---

## Analytics & Tracking

### Google Analytics 4 Setup

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create new property
3. Copy Measurement ID (G-XXXXXXXXXX)
4. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Track Form Submissions

Add to your form success handler in `script.js`:

```javascript
gtag('event', 'form_submission', {
  'event_category': 'engagement',
  'event_label': 'Contact Form'
});
```

### Hotjar Heatmaps

1. Sign up at [hotjar.com](https://hotjar.com)
2. Get tracking code
3. Add to `<head>` before `</head>`:

```html
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:SITE_ID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

---

## SEO Configuration

### Meta Tags

Add to `index.html` `<head>`:

```html
<meta name="description" content="Professional digital marketing agency...">
<meta name="keywords" content="digital marketing, SEO, social media marketing">
<meta name="author" content="DigitalGrow">
<meta name="robots" content="index, follow">

<!-- Open Graph (Social Sharing) -->
<meta property="og:title" content="Digital Marketing Agency - Grow Your Business Online">
<meta property="og:description" content="Data-driven digital marketing strategies...">
<meta property="og:image" content="https://yourdomain.com/og-image.png">
<meta property="og:url" content="https://yourdomain.com">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Digital Marketing Agency">
<meta name="twitter:description" content="Data-driven digital marketing strategies...">
<meta name="twitter:image" content="https://yourdomain.com/og-image.png">
```

### Sitemap

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-07-08</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/blog.html</loc>
    <lastmod>2026-07-08</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/services-seo.html</loc>
    <lastmod>2026-07-08</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Robots.txt

Create `robots.txt`:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://yourdomain.com/sitemap.xml
```

### Google Search Console

1. Go to [search.google.com/searchconsole](https://search.google.com/searchconsole)
2. Add your domain
3. Verify ownership (DNS or HTML file)
4. Submit sitemap.xml
5. Monitor search performance

### Structured Data (Schema.org)

Add to `index.html` before `</body>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DigitalGrow",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/logo.png",
  "description": "Professional digital marketing agency",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+1-555-123-4567",
    "email": "hello@digitalgrow.com"
  }
}
</script>
```

---

## Troubleshooting

### Site Not Loading

**Check:**
1. Files uploaded correctly
2. index.html is in root directory
3. DNS propagation complete (24-48 hours)
4. HTTPS enabled
5. No 404 errors in browser console

**Solution:**
```bash
# Check file structure
ls -la
# Should show: index.html, styles.css, script.js, blog.html, services-seo.html
```

### Styling Not Loading

**Causes:**
- CSS file not found (check file path)
- Browser cache (Ctrl+Shift+Delete)
- Incorrect relative path

**Solution:**
Check browser DevTools → Network tab for 404 errors on CSS/JS files.

### Form Not Working

If form shows success but doesn't send:
1. Add backend URL or use Formspree/Netlify Forms
2. Check console for JavaScript errors
3. Test form submission in browser

### Slow Performance

1. Compress images
2. Enable caching
3. Use CDN (Cloudflare)
4. Minify CSS/JS
5. Check PageSpeed Insights

---

## Post-Deployment Checklist

- [ ] Domain connected and resolving
- [ ] HTTPS working (green padlock)
- [ ] All pages loading correctly
- [ ] Contact form functional
- [ ] Mobile responsive (test on phone)
- [ ] Google Analytics tracking
- [ ] Google Search Console set up
- [ ] Sitemap submitted
- [ ] SSL certificate valid
- [ ] Performance optimized (PageSpeed 90+)
- [ ] Backup system in place

---

## Ongoing Maintenance

### Weekly
- Check analytics for traffic
- Monitor Google Search Console for errors
- Test contact form

### Monthly
- Update content/blog posts
- Review Google Analytics
- Check Core Web Vitals
- Monitor backups

### Quarterly
- SEO audit
- Competitor analysis
- Update service offerings
- Review and update testimonials

---

## Need Help?

- **Netlify Support:** [support.netlify.com](https://support.netlify.com)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Google Analytics Help:** [support.google.com/analytics](https://support.google.com/analytics)
- **DNS/Domain Help:** Contact your domain registrar

**Last Updated:** July 2026