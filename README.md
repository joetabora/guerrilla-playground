# Guerrilla Playground

Welcome to **Guerrilla Playground**, a modern, futuristic portfolio hub and project launcher for Joseph Tabora's creative AI and app experiments.

The experience features a sleek dark mode aesthetic with neon accents, glassmorphism effects, and smooth Framer Motion animations. Includes **live previews**, **featured project carousels**, **category filtering**, and optional background music.

---

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000` to explore the playground.

---

## Project Structure

- `pages/index.js` – Homepage with featured carousel, filterable project grid, and music player  
- `pages/projects.js` – Full project gallery with category filtering  
- `pages/login.js` – Mock login/sign-up flow for future gated demos  
- `components/ProjectCard.jsx` – Animated project card with expandable live preview  
- `components/FeaturedCarousel.jsx` – Rotating carousel for featured projects  
- `components/FilterBar.jsx` – Category filter buttons with smooth animations  
- `components/MusicPlayer.jsx` – Optional background music player with mute toggle  
- `components/Navbar.jsx` – Minimal navigation bar with glassmorphism  
- `styles/` – CSS modules and global theme settings  
- `public/` – Project images and assets  
- `data/projects.json` – Project data with new fields for previews, categories, and featured status  

---

## 🎨 Customization Guide

The design uses CSS variables for easy customization. All colors, fonts, and effects can be adjusted in one place.

### Changing Colors

Edit `/styles/globals.css` and update the CSS variables in the `:root` selector:

```css
:root {
  /* Dark Background Colors */
  --bg-primary: #0a0a0f;        /* Main dark background */
  --bg-secondary: #141420;      /* Card backgrounds */
  --bg-tertiary: #1a1a2e;        /* Darker sections */
  
  /* Neon Accent Colors */
  --accent-primary: #00d4ff;    /* Electric blue - primary accent */
  --accent-secondary: #ff00ff;  /* Magenta - secondary accent */
  --accent-cyan: #00ffff;        /* Cyan - alternative accent */
  --accent-magenta: #ff00ff;     /* Magenta - alternative accent */
  
  /* Text Colors */
  --text-primary: #ffffff;       /* Main text (white) */
  --text-secondary: #a0a0b0;     /* Muted text (light gray) */
  --text-muted: #6b6b7a;         /* Very muted text */
  
  /* Glassmorphism */
  --glass-bg: rgba(20, 20, 32, 0.6);      /* Glass background */
  --glass-border: rgba(255, 255, 255, 0.1); /* Glass border */
  
  /* Shadows & Glows */
  --glow-primary: 0 0 20px rgba(0, 212, 255, 0.3);    /* Blue glow */
  --glow-secondary: 0 0 20px rgba(255, 0, 255, 0.3);   /* Magenta glow */
  --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);        /* Large shadow */
}
```

**Example:** To change the primary accent color to green:
```css
--accent-primary: #00ff88;
--accent-cyan: #00ff88;
```

### Changing Fonts

The project uses **Inter** font by default. To change it:

1. **Update the Google Fonts import** in `/styles/globals.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
   ```

2. **Update the font-family** in the `body` selector:
   ```css
   font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
   ```

**Popular alternatives:**
- **Poppins**: `family=Poppins:wght@300;400;500;600;700`
- **Space Grotesk**: `family=Space+Grotesk:wght@300;400;500;600;700`
- **DM Sans**: `family=DM+Sans:wght@400;500;600;700`

### Adjusting Hover Effects

#### Card Hover Effect
Edit `/components/ProjectCard.module.css`:

```css
.card:hover {
  transform: translateY(-8px) scale(1.02);  /* Adjust lift amount */
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.6),         /* Shadow intensity */
    0 0 0 1px rgba(0, 212, 255, 0.3),       /* Border glow */
    var(--glow-primary);                     /* Neon glow */
}
```

**To make cards lift more:** Change `translateY(-8px)` to `translateY(-12px)`  
**To remove scale effect:** Remove `scale(1.02)`

#### Button Hover Glow
Edit button styles in `/components/ProjectCard.module.css`:

```css
.launchButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.6);  /* Adjust glow intensity */
}
```

**To increase glow:** Change `0.6` to `0.8` or `1.0`  
**To change glow color:** Replace `rgba(0, 212, 255, 0.6)` with your color

### Adjusting Glassmorphism

Glassmorphism (frosted glass effect) is controlled by:

```css
--glass-bg: rgba(20, 20, 32, 0.6);      /* Background opacity: 0.0-1.0 */
--glass-border: rgba(255, 255, 255, 0.1); /* Border opacity: 0.0-1.0 */
```

**To make glass more transparent:** Lower the opacity (e.g., `0.4`)  
**To make glass more opaque:** Increase the opacity (e.g., `0.8`)  
**To adjust blur:** Change `backdrop-filter: blur(20px)` to your desired value

### Customizing Animations

All animations use Framer Motion. To adjust:

1. **Card fade-in speed:** Edit `ProjectCard.jsx`:
   ```jsx
   transition={{ duration: 0.6, ease: 'easeOut' }}  // Change 0.6 to your value
   ```

2. **Hover animation speed:** Edit CSS transitions:
   ```css
   transition: all 0.3s ease;  // Change 0.3s to your value
   ```

3. **Filter transition:** Edit `pages/index.js`:
   ```jsx
   transition={{ duration: 0.4 }}  // Change 0.4 to your value
   ```

### Quick Color Scheme Examples

**Purple Theme:**
```css
--accent-primary: #a855f7;
--accent-cyan: #c084fc;
```

**Green Theme:**
```css
--accent-primary: #10b981;
--accent-cyan: #34d399;
```

**Orange Theme:**
```css
--accent-primary: #f97316;
--accent-cyan: #fb923c;
```

---

## 🚀 Quick Guide: Adding New Projects

**The homepage automatically displays all projects from `data/projects.json`!** Just add a new project to the JSON file and it will appear on the homepage as an interactive card.

### Step-by-Step Instructions:

1. **Open the projects file:**
   - Navigate to `/data/projects.json` in your project folder

2. **Add your project:**
   - Copy the template below and paste it into the JSON array (inside the `[ ]` brackets)
   - Fill in your project details

   ```json
   {
     "title": "My Awesome Project",
     "description": "A brief description of what your project does.",
     "tech": ["React", "Node.js", "MongoDB"],
     "image": "/my-project.png",
     "url": "https://my-project.vercel.app",
     "liveUrl": "https://my-project.vercel.app",
     "category": "Web App",
     "featured": false
   }
   ```

3. **Add your project image:**
   - Place your image file in the `/public/` folder
   - Use the same filename you referenced in the JSON (e.g., `my-project.png`)
   - Recommended size: 600×400 pixels (PNG or JPG)

4. **Save and deploy:**
   - Save the `projects.json` file
   - Commit your changes and push to your repository
   - Your new project will automatically appear on the homepage!

### Field Explanations:

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ Yes | The name of your project (shown as heading) |
| `description` | ✅ Yes | Short description (1-2 sentences) |
| `tech` | ✅ Yes | Array of technologies used (e.g., `["React", "Firebase"]`) |
| `image` | ✅ Yes | Path to image in `/public/` folder (e.g., `"/my-image.png"`) |
| `url` | ✅ Yes | Main URL where project is deployed |
| `liveUrl` | ❌ Optional | URL for live preview iframe. If provided, shows "Preview" button |
| `category` | ❌ Optional | Category for filtering (e.g., "AI", "Web App", "Game") |
| `featured` | ❌ Optional | Set to `true` to show in homepage carousel |

### Example Project Entry:

```json
{
  "title": "Bedtime Beacon",
  "description": "An AI bedtime story generator with interactive tales for children.",
  "tech": ["Next.js", "Vercel", "OpenRouter"],
  "image": "/bedtimebeacon.png",
  "url": "https://bedtime-beacon.vercel.app",
  "liveUrl": "https://bedtime-beacon.vercel.app",
  "category": "AI",
  "featured": true
}
```

### What Happens Automatically:

✅ Project card appears on homepage  
✅ Card shows title, description, tech badges, and image  
✅ "Launch" button links to your project  
✅ "Preview" button appears if `liveUrl` is provided  
✅ Project appears in category filter if `category` is set  
✅ Featured projects rotate in carousel if `featured: true`  
✅ Smooth animations and hover effects applied automatically  

**That's it! No code changes needed - just update the JSON file.**

---

## Setting Up Live Previews

To enable live previews for a project:

1. Ensure your project is publicly accessible via HTTPS.
2. Add the `liveUrl` field to the project in `projects.json`:
   ```json
   {
     "liveUrl": "https://your-deployed-project.vercel.app"
   }
   ```
3. The preview button will automatically appear on the project card.
4. When clicked, it expands to show an embedded iframe with your live site.

**Note:** Some sites may block iframe embedding due to X-Frame-Options headers. If your preview doesn't load, check your site's security headers.

---

## Marking Projects as Featured

To feature a project in the homepage carousel:

1. Set `"featured": true` in the project's JSON entry.
2. The carousel automatically cycles through all featured projects every 5 seconds.
3. Users can manually navigate using arrow buttons or dot indicators.

**Tip:** Feature 3-5 projects for the best visual experience. Too many featured projects may make the carousel feel cluttered.

---

## Adding Background Music (Optional)

The music player is included but requires an audio file:

1. Add your background music file to the `public/` folder (e.g., `public/background-music.mp3`).
2. Open `components/MusicPlayer.jsx`.
3. Uncomment and update the audio source:
   ```jsx
   <audio
     ref={audioRef}
     loop
     muted={isMuted}
     preload="none"
     src="/background-music.mp3"
   />
   ```
4. The music player appears in the top-right corner with play/pause and mute controls.

**Note:** Background music is muted by default to respect user preferences. Users can enable it manually.

---

## Category Filtering

Projects are automatically organized by category:

- Categories are extracted from the `category` field in each project.
- The filter bar appears on both the homepage and projects page.
- Click any category pill to filter projects.
- Click "All" to show all projects again.
- Filter transitions are animated with Framer Motion.

**Adding New Categories:** Simply use a new category name in a project's JSON. The filter bar will automatically include it.

---

## Future Enhancements

- Integrate authentication (Clerk, Supabase, or Auth0) inside `pages/login.js`.
- Add analytics for project launches and preview interactions.
- Expand project JSON schema with tags, date fields, or media galleries.
- Layer in additional Framer Motion transitions for routing.
- Add search functionality for projects.

---

## Deployment Notes

- The project uses standard Next.js scripts:
  - `npm run dev` – Development server
  - `npm run build` – Production build
  - `npm run start` – Start the production server
- Environment variables (if any) should be stored in `.env.local`. The `.gitignore` already excludes common env files.
- For best performance, optimize images before adding them to `public/`.
- Ensure all `liveUrl` values point to HTTPS-enabled sites for secure iframe embedding.

Enjoy building out the playground and launching new creative experiments!

