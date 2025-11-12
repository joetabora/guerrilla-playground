# Guerrilla Playground

Welcome to **Guerrilla Playground**, a whimsical portfolio hub and project launcher for Joseph Tabora’s creative AI and app experiments.

The experience embraces a storybook-meets-tech aesthetic, comes packed with Framer Motion animations, and stays responsive across devices.

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

- `pages/index.js` – Hero landing page and social links  
- `pages/projects.js` – Lists projects from `data/projects.json`  
- `pages/login.js` – Mock login/sign-up flow for future gated demos  
- `components/ProjectCard.jsx` – Animated project preview card  
- `styles/` – CSS modules and global theme settings  
- `public/` – Placeholder imagery used in the cards  

---

## Adding New Projects

1. Open `data/projects.json`.
2. Add a new object using the template below:
   ```json
   {
     "title": "Your Project Name",
     "description": "One or two sentences describing the experience.",
     "tech": ["Stack Item 1", "Stack Item 2"],
     "image": "/your-image.png",
     "url": "https://your-live-site.com"
   }
   ```
3. Save the file.
4. Place a matching image inside the `public/` folder.  
   - Recommended size: 600×400 PNG or JPG  
   - Use a descriptive filename so it’s easy to reference.
5. Commit your changes and redeploy (e.g., push to your hosting provider such as Vercel).  
   - On Vercel, simply pushing to the connected branch triggers a fresh build.

---

## Future Enhancements

- Integrate authentication (Clerk, Supabase, or Auth0) inside `pages/login.js`.
- Add analytics for project launches.
- Expand the project JSON schema with categories or media galleries.
- Layer in additional Framer Motion transitions for routing.

---

## Deployment Notes

- The project uses standard Next.js scripts:
  - `npm run dev` – Development server
  - `npm run build` – Production build
  - `npm run start` – Start the production server
- Environment variables (if any) should be stored in `.env.local`. The `.gitignore` already excludes common env files.

Enjoy building out the playground and launching new creative experiments!

