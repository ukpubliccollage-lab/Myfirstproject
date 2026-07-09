# Quick Start Guide

## Method 1: Local Development
1. Clone or download this project
2. Open `index.html` in your web browser
3. Site is ready to view

## Method 2: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"
3. Site opens with live reload

## Method 3: Python HTTP Server
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

## Initial Customization

### 1. Change Brand Name
Edit `index.html`:
```html
<h1>DigitalGrow</h1>  <!-- Change to your name -->
```

### 2. Update Contact Info
```html
<p>
    <strong>Email:</strong> hello@digitalgrow.com<br>
    <strong>Phone:</strong> (555) 123-4567<br>
    <strong>Address:</strong> 123 Digital Street, Tech City, TC 12345
</p>
```

### 3. Customize Colors
Edit `styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #00d9ff;
    --dark-bg: #0a0e27;
    --light-text: #f0f0f0;
    --gray-text: #b0b0b0;
    --card-bg: #1a1f3a;
    --accent: #ff6b6b;
}
```

### 4. Add Services & Portfolio
Duplicate cards in `index.html` and update text/icons.

## Next Steps
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for going live
- Check [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md) for architecture details
