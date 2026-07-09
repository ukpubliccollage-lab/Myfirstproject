# Deployment Guide

## Deploy to Netlify
1. Push files to GitHub
2. Connect repo to Netlify
3. Auto-deploys on every push

## Deploy to Vercel
1. Import project to Vercel
2. No build step needed
3. Instant deployment

## Deploy to GitHub Pages
1. Create repository
2. Push files to main branch
3. Enable GitHub Pages in settings
4. Site goes live at `username.github.io/repository`

## Deploy to Traditional Hosting
1. Connect via FTP
2. Upload all files to `public_html/`
3. Verify files are in root directory

## Form Handling for Production

### Option 1: Formspree
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms
```html
<form name="contact" method="POST" netlify>
```

### Option 3: Backend API
Replace `fetch()` in `script.js` with your API endpoint.

## Performance Checklist
- ✓ No external dependencies
- ✓ Single CSS file (~15KB)
- ✓ Single JS file (~6KB)
- ✓ Optimized for Core Web Vitals
- ✓ Mobile responsive
- ✓ SEO-friendly

## SEO & Analytics
- Add Google Analytics tracking code
- Add schema markup for rich snippets
- Update meta descriptions for each section
- Set up sitemap.xml
