# TikTok Auto-Fetch Setup Guide

This guide will help you set up automatic TikTok video fetching for your site.

## ⚠️ IMPORTANT: Subscribe to the API First!

Your API key is set, but you need to **subscribe to the TikTok Scraper API** on RapidAPI for it to work.

### Step 0: Subscribe to the API (REQUIRED)

1. Go to [RapidAPI](https://rapidapi.com/)
2. Search for **"TikTok Scraper"** or go to the API you're using
3. Click **"Subscribe"** or **"Subscribe to Test"** (many have free tiers)
4. Choose a plan (usually there's a free tier with limited requests)
5. Once subscribed, your API key will work

**Current Issue:** The API is returning `403 - "You are not subscribed to this API"` - you need to subscribe first!

---

## ✅ Quick Setup (After Subscribing)

You're using **tiktok-scraper7.p.rapidapi.com**. Here's how to set it up:

### Step 1: Add Environment Variables

**Local (.env.local):**
```bash
TIKTOK_API_KEY=86efff1ae2msh512ff901d78e8e0p182eb8jsnd76bad523cd5
TIKTOK_USER_ID=7128593328456041478
```

**Vercel:**
1. Go to your Vercel project → Settings → Environment Variables
2. Add these two variables:
   - **Name:** `TIKTOK_API_KEY`
     **Value:** `86efff1ae2msh512ff901d78e8e0p182eb8jsnd76bad523cd5`
     **Environments:** All (Production, Preview, Development)
   
   - **Name:** `TIKTOK_USER_ID`
     **Value:** `7128593328456041478`
     **Environments:** All (Production, Preview, Development)

### Step 2: The API Will Try Multiple Endpoints

The code automatically tries these endpoints in order:
1. `/user/posts?username=suchgrime&count=6` (for videos)
2. `/user/profile?username=suchgrime` (profile with videos)
3. `/user/story?user_id=7128593328456041478` (stories/videos)

It will use whichever one works and return your latest 6 videos!

---

## Option 2: TikTok Business API (More Complex)

If you have a TikTok Business account:

1. Go to [TikTok Developers](https://developers.tiktok.com/)
2. Create an app and get your credentials
3. Add to environment variables:
   ```bash
   TIKTOK_CLIENT_KEY=your_client_key
   TIKTOK_CLIENT_SECRET=your_client_secret
   TIKTOK_ACCESS_TOKEN=your_access_token
   ```

---

## Option 3: Manual Video IDs (Fallback)

If you don't want to use an API, you can manually update video IDs in the code:

1. Go to your TikTok videos
2. Copy the video IDs from the URLs (e.g., `tiktok.com/@suchgrime/video/7234567890123456789`)
3. Update `data/tiktok-videos.json` with the latest 6 video IDs

The site will automatically use these as a fallback.

---

## Testing

After setting up, test the API:

```bash
# Local
curl http://localhost:3000/api/tiktok/videos

# Production
curl https://your-site.vercel.app/api/tiktok/videos
```

You should see JSON with your latest TikTok videos!

---

## Troubleshooting

**No videos showing?**
- Check that your API key is correct
- Verify the API service is working (test in RapidAPI dashboard)
- Check browser console for errors
- The site will fall back to mock data if API fails

**Rate limits?**
- Most free APIs have rate limits (e.g., 100 requests/day)
- The site caches videos for 10 minutes to reduce API calls
- Consider upgrading to a paid plan if you need more requests

**Still having issues?**
- Check the API route logs: `app/api/tiktok/videos/route.ts`
- Verify your TikTok username is correct (@suchgrime)
- Make sure your TikTok account is public

