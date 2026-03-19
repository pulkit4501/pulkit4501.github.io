# Pulkit Agarwal — Portfolio Website

A personal portfolio website built with pure HTML, CSS, and JavaScript. Designed with a modern cyber-tech aesthetic featuring glassmorphism navigation, scroll-reveal animations, particle network backgrounds, and responsive design across all device sizes.


## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS (custom properties, media queries, animations) |
| Logic | Vanilla JavaScript (canvas, IntersectionObserver, scroll events) |
| Fonts | Google Fonts (Syne, JetBrains Mono, Inter) |
| Hosting | GitHub Pages |

## 📁 Project Structure

```
├── index.html              ← Main page
├── styles.css              ← All styling + responsive breakpoints
├── main.js                 ← Animations, cursor, theme toggle, scroll effects
├── assets/
│   ├── images/
│   │   ├── profile.png     ← About section portrait
│   │   ├── imda-showcase.png
│   │   ├── vietnam-pitch.png
│   │   └── malaysia-pitch.png
│   └── docs/
│       └── cv.pdf          ← Downloadable CV
├── .gitignore
├── .nojekyll               ← Tells GitHub Pages to skip Jekyll
├── README.md
└── DEPLOY.md               ← Hosting guide
```

## ✏️ Customization

### Change Name & Content
Edit `index.html` — search for text you want to change (name, role, bio, etc.)

### Change Colors
Edit the CSS custom properties at the top of `styles.css`:
```css
:root {
  --accent: #2563eb;      /* Primary blue */
  --accent2: #7c9aff;     /* Light blue */
  --neon: #60a5fa;         /* Neon accent */
  --bg: #050810;           /* Dark background */
}
```

### Change Profile Photo
Replace `assets/images/profile.png` with your own photo (transparent background recommended, ~800px wide).

### Change CV
Replace `assets/docs/cv.pdf` with your own CV file.

### Add Showcase Items
In `index.html`, add new `<a class="gc">` cards inside the `.gallery` div. Each card needs:
- An `<img>` with class `gimg`
- A `.gi` overlay div with `.gi-t` (title), `.gi-s` (subtitle), and `.gi-link` (link text)

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| `≤ 960px` | Tablets / small laptops |
| `≤ 768px` | Narrow tablets |
| `≤ 480px` | Phones |


## 📄 License

This project is for personal use. Feel free to use the structure as inspiration for your own portfolio.
