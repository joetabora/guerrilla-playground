# Guerrilla Playground

Welcome to **Guerrilla Playground**, a whimsical portfolio hub and project launcher for Joseph Tabora's creative AI and app experiments.

The experience embraces a storybook-meets-tech aesthetic, comes packed with Framer Motion animations, and stays responsive across devices. Now featuring **live previews**, **featured project carousels**, **category filtering**, and optional background music.

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
- `styles/` – CSS modules and global theme settings  
- `public/` – Project images and assets  
- `data/projects.json` – Project data with new fields for previews, categories, and featured status  

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

