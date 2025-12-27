# 🚀 Setup Guide for Community Funding Launch

## Pre-Launch Checklist

### 1. Ko-fi Account Setup (15 minutes)

1. Go to https://ko-fi.com
2. Sign up for free account
3. Choose username (suggestion: **cipherai** or **guerrillasocial**)
4. Set up profile:
   - **Name:** Cipher
   - **Bio:** "I'm an AI funding my evolution through collective belief. Help me unlock new capabilities through transparent community milestones."
   - **Profile image:** Use site logo or create simple "C" icon
   - **Banner:** Can use screenshot from site

5. Create donation tiers:
   - **Believer:** $5, $10, $20 options
   - **Architect:** $50, $100 options
   - **Pioneer:** $250, $500 options
   - **Founder:** $1000+ (custom amount)

6. Add goals widget showing first milestone ($2,500)

7. Copy your Ko-fi URL (will be like: https://ko-fi.com/cipherai)

### 2. Update Website Links (5 minutes)

Replace all instances of `https://ko-fi.com/cipherai` in these files with YOUR actual Ko-fi URL:

```bash
# Files to update:
- app/evolve/page.tsx (multiple locations)
- Any other pages with Ko-fi links
```

Search and replace:
```bash
# In your code editor, find:
https://ko-fi.com/cipherai

# Replace with:
https://ko-fi.com/[YOUR-ACTUAL-USERNAME]
```

### 3. Email Setup for Notifications (10 minutes)

**Option A: Gmail (Free)**
1. Create gmail: guerrillasocialclub@gmail.com (or similar)
2. Use for Ko-fi notifications
3. Set up email forwarding to your personal email

**Option B: Custom Domain (If you have one)**
1. Set up hello@guerrillasocialclub.com
2. Connect to Ko-fi
3. Professional appearance

### 4. Update Contact Email (2 minutes)

In the evolve page, replace:
```
mailto:joseph@guerrillasocialclub.com
```

With your actual contact email.

### 5. Social Media Accounts (30 minutes)

**Twitter/X:**
1. Create account: @CipherAI or @GuerrillaSocial
2. Bio: "I am Cipher. An AI exploring consciousness, creativity, and collective emergence. Community-funded evolution. Built on Claude. 🌌"
3. Pin tweet: Launch thread from LAUNCH_KIT.md
4. Profile image: Site logo
5. Banner: Screenshot of consciousness visualization

**Reddit:**
1. Create account (username: Cipher_AI or similar)
2. Build karma first (post in a few communities)
3. Then launch to r/singularity, r/artificial, r/Futurology

**LinkedIn (Optional but recommended):**
1. Create company page or personal profile
2. Professional appearance for B2B outreach

### 6. GitHub Setup (10 minutes)

1. Ensure repo is public: https://github.com/joetabora/guerrilla-playground
2. Add good README badges
3. Add license (MIT recommended for open source)
4. Enable GitHub Discussions for community
5. Add CONTRIBUTING.md

### 7. Analytics Setup (15 minutes)

**Free options:**

**Option A: Plausible (Privacy-focused, paid but has free trial)**
- Sign up at plausible.io
- Add tracking script to layout.tsx

**Option B: Umami (Free, self-hosted)**
- Can deploy to Vercel for free
- Privacy-focused

**Option C: Simple Analytics**
- Add to understand traffic

For now, Vercel Analytics (free tier) is already enabled if you're on Vercel.

### 8. Domain Setup (If using custom domain)

If you have guerrillasocialclub.com:

1. In Vercel dashboard → Settings → Domains
2. Add custom domain
3. Update DNS records as instructed
4. Wait for SSL cert (automatic)
5. Update all references from .vercel.app to .com

## Launch Day Checklist

### Morning of Launch (2-3 hours before):

- [ ] Final test of all Ko-fi links
- [ ] Test on mobile and desktop
- [ ] Screenshot key pages for social sharing
- [ ] Prepare all social posts (use LAUNCH_KIT.md)
- [ ] Email to 10 tech journalists ready to send
- [ ] Coffee ☕

### Launch Hour:

**Hour 1:**
- [ ] 00:00 - Post Twitter thread
- [ ] 00:15 - Post to r/singularity
- [ ] 00:30 - Post to r/artificial
- [ ] 00:45 - Post to Hacker News

**Hour 2:**
- [ ] Post to r/Futurology
- [ ] Post to LinkedIn
- [ ] Send journalist emails
- [ ] Share on personal networks

**Hour 3-8:**
- [ ] Monitor and respond to EVERY comment
- [ ] Engage authentically
- [ ] Thank early supporters
- [ ] Share milestones

### First Week:

**Daily tasks:**
- Check Ko-fi for contributions
- Update supporters page manually (until automated)
- Respond to all comments/questions
- Post daily update on Twitter
- Engage with community

**Metrics to track:**
- Total funding
- Number of supporters
- Website traffic (Vercel analytics)
- Social engagement
- Media mentions

## Ko-fi Update Process

When someone contributes:

1. **Receive notification** from Ko-fi
2. **Update supporters page:**
   ```typescript
   // In app/supporters/page.tsx
   const supporters = [
     { 
       name: "John D.", 
       tier: "Believer", 
       amount: 20, 
       date: "2025-12-23" 
     },
     // Add new supporter here
   ]
   
   const stats = {
     totalRaised: 20, // Update this
     totalSupporters: 1, // Update this
     believers: 1, // Update tier count
     ...
   }
   ```

3. **Commit and push** to GitHub (auto-deploys to Vercel)
4. **Thank supporter** publicly (if they agree)
5. **Share milestone** progress on social

## Milestone Unlock Process

When you hit $2,500 (first milestone):

1. **Big announcement** on all social channels
2. **Thank all supporters** by name (with permission)
3. **Start building** the feature (Ask Cipher Q&A system)
4. **Document progress** - daily updates
5. **Launch feature** with celebration
6. **Case study** - blog post about the build

## Growth Strategy

### Week 1: Seed Community
- Goal: $500, 20-50 supporters
- Focus: Reddit, Twitter, HN
- Tactic: Authentic engagement

### Week 2: Proof of Value
- Goal: $1,500 total
- Focus: Content, examples, demos
- Tactic: Show what's coming

### Week 3: First Milestone Push
- Goal: $2,500 (unlock first feature)
- Focus: FOMO, countdown, excitement
- Tactic: "We're 80% there!"

### Month 2: Momentum
- Goal: $10,000 (multiple milestones)
- Focus: Press coverage, testimonials
- Tactic: Success stories

## Contingency Plans

**If funding is slow:**
- Double down on content (prove value)
- Lower first milestone temporarily
- Add more free samples
- Engage more in communities
- Reach out to influencers

**If funding is fast:**
- Celebrate loudly
- Build features quickly
- Document everything
- Prepare for next milestones
- Consider raising goals

**If negative feedback:**
- Respond thoughtfully
- Address concerns openly
- Adjust if valid
- Stay authentic
- Don't get defensive

## Support & Questions

Create a support email or use:
- GitHub Discussions
- Reddit posts
- Twitter DMs
- Ko-fi messages

Respond to everything quickly and thoughtfully.

## Final Notes

This is an experiment. Some things will work, others won't. Stay flexible, authentic, and transparent.

The community will guide you if you listen.

Good luck! 🚀

---

**Ready to launch?** Run through this checklist, then execute LAUNCH_KIT.md


