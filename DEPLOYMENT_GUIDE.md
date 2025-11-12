# 🚀 Deployment Guide: GitHub to Vercel

This guide walks you through deploying your Guerrilla Playground updates to GitHub and Vercel.

---

## ✅ Step 1: Commit and Push Your Changes

I've already completed this step for you! Here's what was done:

```bash
# Added all changes to staging
git add .

# Committed with a descriptive message
git commit -m "Update homepage project cards and interactive previews"

# Pushed to GitHub
git push origin main
```

**Status:** ✅ Changes have been pushed to GitHub successfully!

---

## 🔄 Step 2: Vercel Automatic Deployment

**Good news:** Since your Vercel project is already connected to your GitHub repository, Vercel will **automatically detect** the push and start deploying your changes!

### What Happens Automatically:

1. **Vercel detects the push** - Within seconds of pushing to GitHub
2. **Build starts** - Vercel runs `npm install` and `npm run build`
3. **Deployment begins** - Your site is being updated with the new changes
4. **Preview URL created** - You can see the deployment progress in Vercel dashboard

### Typical Deployment Time:
- **Build time:** 1-3 minutes
- **Total time:** 2-5 minutes

---

## 👀 Step 3: View Your Live Site

### Option A: Check Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on your **guerrilla-playground** project
3. You'll see the latest deployment at the top
4. Click the deployment to see:
   - **Status** (Building, Ready, or Error)
   - **Preview URL** (temporary link to test)
   - **Production URL** (your live site)

### Option B: Visit Your Production URL

Your live site is typically available at:
```
https://guerrilla-playground.vercel.app
```
*(or your custom domain if you've set one up)*

### Option C: Check GitHub Actions (if enabled)

1. Go to your GitHub repo: https://github.com/joetabora/guerrilla-playground
2. Click the **"Actions"** tab
3. You'll see deployment status if GitHub Actions are configured

---

## ⚠️ Step 4: If Deployment Fails

### How to Check Deployment Logs:

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on **guerrilla-playground** project

2. **Find the Failed Deployment:**
   - Look for a deployment with a red ❌ or "Error" status
   - Click on it to see details

3. **View Build Logs:**
   - Scroll down to see the **Build Logs** section
   - Look for error messages (usually in red)
   - Common issues:
     - **Build errors:** Syntax errors in code
     - **Missing dependencies:** Package not installed
     - **Environment variables:** Missing required env vars

### Common Issues & Solutions:

| Error | Solution |
|-------|----------|
| `Module not found` | Run `npm install` locally to check for missing packages |
| `Build failed` | Check for syntax errors in your code |
| `Environment variable missing` | Add required env vars in Vercel project settings |
| `Deployment timeout` | Try redeploying (sometimes Vercel has temporary issues) |

### How to Redeploy:

1. In Vercel dashboard, click **"Redeploy"** on the failed deployment
2. Or make a small change and push again:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push origin main
   ```

---

## 📝 Step 5: Future Updates - Quick Reference

### Adding New Projects (No Deployment Needed!)

When you want to add a new project, you **don't need to redeploy manually** - just:

1. **Edit `data/projects.json`:**
   ```json
   {
     "title": "My New Project",
     "description": "Description here",
     "tech": ["React", "Node.js"],
     "image": "/my-project.png",
     "url": "https://my-project.com",
     "liveUrl": "https://my-project.com",
     "category": "Web App",
     "featured": false
   }
   ```

2. **Add your image to `/public/` folder**

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add new project: My New Project"
   git push origin main
   ```

4. **Vercel automatically deploys** - Your new project appears on the homepage in 2-5 minutes!

---

## 🎯 Quick Command Reference

For future updates, use these commands in Cursor's terminal:

```bash
# Navigate to project folder (if not already there)
cd guerrilla-playground

# Check what files changed
git status

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Your update description here"

# Push to GitHub (triggers Vercel deployment)
git push origin main
```

---

## 📊 Deployment Checklist

Before pushing, make sure:

- [ ] All code changes are saved
- [ ] No syntax errors (check for red underlines in Cursor)
- [ ] `projects.json` is valid JSON (no trailing commas)
- [ ] Images are in `/public/` folder
- [ ] Test locally with `npm run dev` (optional but recommended)

---

## 🆘 Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Repo:** https://github.com/joetabora/guerrilla-playground
- **Check deployment status:** Always check Vercel dashboard first

---

**Your changes have been pushed!** 🎉 

Vercel is now building and deploying your updated Guerrilla Playground. Check your Vercel dashboard in a few minutes to see your live site!

