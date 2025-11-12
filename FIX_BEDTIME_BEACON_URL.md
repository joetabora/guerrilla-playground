# 🔧 Fix Bedtime Beacon URL

The Bedtime Beacon project is currently showing a 404 error. Here's how to fix it:

## Step 1: Find the Correct URL

### Option A: Check Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Look for your Bedtime Beacon / StoryNest project
3. Click on it to see the deployment
4. Copy the **Production URL** (it will look like `https://something.vercel.app`)

### Option B: Check GitHub
1. Go to your GitHub repo for Bedtime Beacon/StoryNest
2. Check if there's a Vercel deployment badge or link in the README
3. Or check the repository settings for deployment URLs

## Step 2: Update the URL

1. Open `/data/projects.json`
2. Find the Bedtime Beacon entry
3. Update both `url` and `liveUrl` fields with the correct URL:

```json
{
  "title": "Bedtime Beacon",
  "description": "An AI bedtime story generator with interactive tales for children.",
  "tech": ["Next.js", "Vercel", "OpenRouter"],
  "image": "/bedtimebeacon.png",
  "url": "https://YOUR-CORRECT-URL-HERE.vercel.app",
  "liveUrl": "https://YOUR-CORRECT-URL-HERE.vercel.app",
  "category": "AI",
  "featured": true
}
```

## Step 3: If Project Isn't Deployed Yet

If Bedtime Beacon isn't deployed to Vercel yet, you can:

### Option A: Remove liveUrl (temporarily)
```json
{
  "title": "Bedtime Beacon",
  "url": "https://storynest.vercel.app",
  // Remove liveUrl or set to empty string
  "liveUrl": "",
  ...
}
```

### Option B: Comment it out
Remove the project from the featured carousel by setting `featured: false`:

```json
{
  "title": "Bedtime Beacon",
  ...
  "featured": false  // This removes it from carousel
}
```

## Step 4: Test and Deploy

1. Save the `projects.json` file
2. Test locally: `npm run dev` (optional)
3. Commit and push:
   ```bash
   git add data/projects.json
   git commit -m "Fix Bedtime Beacon URL"
   git push origin main
   ```

## Current Status

I've temporarily updated the URL to `https://storynest.vercel.app` based on your project folder name. 

**Please verify this is correct** by:
- Checking your Vercel dashboard
- Or testing the URL in your browser

If `https://storynest.vercel.app` doesn't work, follow Step 1 above to find the correct URL.

