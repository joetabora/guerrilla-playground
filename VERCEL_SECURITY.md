# Vercel Security Guide for Open Source Projects

## 🔒 Your Deployment Is Secure

### Key Principle
**Your GitHub repo being public does NOT compromise your Vercel deployment.**

Here's why:

```
GitHub (Public)          Vercel (Private)
├─ Source Code          ├─ Your Account (authenticated)
├─ Documentation        ├─ Environment Variables (encrypted)
├─ Issues/PRs          ├─ Deployment Settings (access-controlled)
└─ Anyone can read     └─ Only YOU can deploy
```

---

## ✅ Current Security Status

### What's Already Protected

1. **Your Vercel Account**
   - Protected by your login credentials
   - 2FA recommended (but your choice)
   - GitHub repo access ≠ Vercel access

2. **Production Deployment**
   - Only authorized accounts can deploy
   - Environment variables never exposed in Git
   - Domain controlled by your Vercel account

3. **Environment Variables**
   - Stored encrypted in Vercel
   - Never visible in GitHub
   - Not included in client-side bundles (for server-side vars)

4. **Domain & DNS**
   - Controlled through your Vercel account
   - Nobody can deploy to YOUR domain
   - SSL certificates managed by Vercel

---

## 🛡️ Recommended Vercel Settings

### 1. Enable Vercel Authentication (Optional)
For preview deployments (not production):

**Settings → Deployment Protection**
- ☐ Enable Protection: Password protection for all preview deployments
- This prevents random people from viewing your preview builds
- Production remains publicly accessible (as intended)

**Our Recommendation:** Skip this. Your site is meant to be public.

---

### 2. Configure Git Integration

**Settings → Git → Connected Git Repository**

Current status should show:
- ✅ Repository: [your-username]/guerrilla-playground
- ✅ Production Branch: main
- ✅ Auto-deploy: Enabled

**Production Branch Protection:**
- [x] Only deploy main branch to production
- [ ] Allow preview deployments from PRs (recommended!)
  
This means:
- PRs from contributors create preview deployments (safe)
- Only merged PRs go to production (after your review)

---

### 3. Environment Variables (Future-Proofing)

Currently: You have none (static site).

**If you add them in the future:**

Navigate to: Settings → Environment Variables

**Best Practices:**
```bash
# Good Examples:
NEXT_PUBLIC_SITE_URL=https://guerrillasocialclub.com  # Safe (public)
DATABASE_URL=postgresql://...                          # Secret (server-only)
API_SECRET_KEY=sk_live_...                            # Secret (server-only)

# Mark Sensitivity:
DATABASE_URL → Set as "Sensitive" (hides from logs)
API_SECRET_KEY → Set as "Sensitive"
```

**Key Rules:**
- Variables prefixed with `NEXT_PUBLIC_` are included in client bundle
- Variables without prefix stay server-side only (in API routes)
- NEVER commit `.env` files to Git (already in .gitignore ✅)

---

### 4. Deployment Hooks (Optional)

**Settings → Git → Deploy Hooks**

You can create webhooks for:
- Build notifications
- Deployment triggers
- Integration with external services

**Our Recommendation:** Not needed yet. Add later if you integrate CI/CD.

---

## 🚨 What Happens When Someone Forks Your Repo?

Let's walk through the scenario:

### Scenario: Malicious Actor Forks Your Repo

1. **They fork the repo** ✅ This is fine
   - They get a copy of the code
   - They do NOT get your Vercel account
   - They do NOT get your environment variables

2. **They modify their fork** ✅ This is fine
   - Their changes are in THEIR fork
   - Does not affect YOUR repo
   - Does not affect YOUR deployment

3. **They try to deploy** ✅ This is fine
   - They can deploy to THEIR Vercel account
   - They CANNOT deploy to YOUR Vercel account
   - They CANNOT access YOUR domain
   - They get their own separate instance

4. **They submit a malicious PR** ✅ You're protected
   - You review the PR before merging
   - Vercel can create preview deployment (sandbox)
   - You reject the PR if malicious
   - Production remains untouched

---

## 🎯 Attack Vectors & Defenses

### Attack: "I'll steal your domain!"
**Defense:** Impossible. Domain is tied to your Vercel account.

### Attack: "I'll inject malicious code!"
**Defense:** PRs require your review and approval before merging.

### Attack: "I'll access your environment variables!"
**Defense:** They're encrypted in Vercel, never in Git.

### Attack: "I'll deploy to your production!"
**Defense:** Requires authentication to your Vercel account.

### Attack: "I'll DoS your API!"
**Defense:** You don't have an API yet. When you do, Vercel has rate limiting.

### Attack: "I'll copy your site!"
**Defense:** That's actually a compliment! MIT license allows it.

---

## ✅ Pre-Open-Source Vercel Checklist

### Verify These Settings Now

1. **Check Authentication**
   ```
   Settings → General → Account
   - ✅ You're logged in
   - ✅ Connected to correct GitHub account
   - ☐ Consider enabling 2FA (optional)
   ```

2. **Verify Domain Ownership**
   ```
   Settings → Domains
   - ✅ guerrillasocialclub.com points to your project
   - ✅ SSL enabled (automatic)
   - ✅ No extra domains configured
   ```

3. **Review Team Access**
   ```
   Settings → Team
   - ✅ You're the only member (unless you added others)
   - If others exist: Review their permissions
   ```

4. **Check Build Settings**
   ```
   Settings → Build & Development Settings
   - ✅ Framework Preset: Next.js
   - ✅ Build Command: next build
   - ✅ Output Directory: .next
   - ✅ Install Command: npm install
   ```

5. **Environment Variables Check**
   ```
   Settings → Environment Variables
   - ✅ Should be empty (you have none)
   - Future: Always use "Sensitive" for secrets
   ```

---

## 🔍 Monitoring & Alerts

### Set Up Vercel Notifications

**Settings → Notifications**

Recommended settings:
- [x] Email on deployment failure
- [x] Email on security alerts
- [ ] Slack integration (optional)

This helps you catch issues immediately.

---

## 📊 What Preview Deployments Are

When someone submits a PR:

```
PR Submitted → Vercel Creates Preview → You Review → Merge or Reject
                        ↓
                Temporary URL
                (e.g., guerrilla-playground-abc123.vercel.app)
                        ↓
                Isolated environment
                NOT your production site
```

**Preview Deployments Are Safe:**
- Separate URL (not your main domain)
- Isolated environment
- Deleted when PR is closed
- You control what gets merged

---

## 🆘 Emergency Procedures

### If Something Goes Wrong

#### 1. Rollback Deployment
Vercel allows instant rollbacks:

1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"
4. Previous version is live instantly

#### 2. Pause Auto-Deploy
If you need to stop automatic deployments:

Settings → Git → **Disconnect Repository** (temporary)

This stops Vercel from auto-deploying while you fix issues.

#### 3. Revoke Access
If someone gained unauthorized access:

Settings → Team → **Remove Member**
Settings → Tokens → **Revoke All Tokens**

Then change your password.

---

## 🎓 Best Practices Going Forward

### As Your Project Grows

1. **Keep Secrets Secret**
   - Always use Vercel env vars, never commit to Git
   - Rotate keys periodically
   - Mark sensitive variables as "Sensitive"

2. **Review All PRs Carefully**
   - Check preview deployment before merging
   - Look for suspicious changes
   - Test functionality

3. **Monitor Deployments**
   - Watch for unexpected deployments
   - Review deployment logs
   - Set up alerts

4. **Document Changes**
   - Keep CHANGELOG.md updated
   - Tag releases in Git
   - Use semantic versioning

---

## 💡 Real-World Example

Let's say someone finds your repo and wants to steal it:

```
❌ Hacker's Goal: Deploy malicious code to guerrillasocialclub.com

Attempt 1: "I'll fork and deploy!"
→ They deploy to THEIR Vercel, not yours
→ FAILED

Attempt 2: "I'll submit a malicious PR!"
→ You review and reject the PR
→ FAILED

Attempt 3: "I'll guess the Vercel password!"
→ That's not how GitHub integration works
→ FAILED

Attempt 4: "I'll find secrets in Git history!"
→ No secrets were ever committed (verified ✅)
→ FAILED

Attempt 5: "I'll just copy the site!"
→ That's legal under MIT license
→ Doesn't affect your deployment
→ Actually validates your work!
```

**Result:** Your deployment remains secure.

---

## 🎯 Bottom Line

### You Are Protected By

1. **Authentication Layer**
   - Vercel login required for deployment
   - GitHub access ≠ Vercel access

2. **Code Review Process**
   - All PRs reviewed before merging
   - Preview deployments are isolated

3. **Environment Variable Security**
   - Encrypted in Vercel
   - Never exposed in Git

4. **Domain Control**
   - Tied to your Vercel account
   - Nobody can hijack it

5. **Deployment Control**
   - You approve all production changes
   - Instant rollback available

### You Are NOT At Risk From

- ❌ Someone forking your repo
- ❌ Someone cloning your code
- ❌ Someone submitting PRs
- ❌ Someone copying your design
- ❌ Making the repo public

### You WOULD Be At Risk If

- ⚠️ You commit secrets to Git (you haven't ✅)
- ⚠️ You share your Vercel password (don't do this)
- ⚠️ You merge PRs without review (don't do this)
- ⚠️ You disable security features (keep them on)

---

## ✅ Final Verdict: SAFE TO OPEN SOURCE

Your Vercel deployment is **completely secure** for open-sourcing because:

1. ✅ No secrets in code
2. ✅ Authentication required for deployment
3. ✅ PR review process protects production
4. ✅ Domain tied to your account
5. ✅ Environment variables encrypted
6. ✅ Instant rollback available
7. ✅ Preview deployments isolated

**Go ahead and make it public with confidence!** 🚀

---

**Questions?**
- Vercel Documentation: https://vercel.com/docs
- Vercel Security: https://vercel.com/security
- Support: help@vercel.com

**Created:** December 26, 2025  
**For:** Guerrilla Social Club Open Source Launch

