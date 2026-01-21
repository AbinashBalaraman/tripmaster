# ✅ Quick Setup: Connect Netlify to GitHub

## 🎉 Your GitHub Repo is Ready!
**Repository:** https://github.com/AbinashBalaraman/tripmaster

---

## 🔗 Connect to Netlify (2 Minutes)

### Step 1: Go to Netlify Site Settings
Open: https://app.netlify.com/sites/YOUR_SITE_NAME/settings/deploys

### Step 2: Link to Git
1. Scroll to **"Build & deploy"** section
2. Click **"Link site to Git"** or **"Link repository"**

### Step 3: Connect GitHub
1. Click **"GitHub"**
2. Authorize Netlify (if prompted)
3. Select **"AbinashBalaraman/tripmaster"**

### Step 4: Configure Build
Should auto-fill, but verify:
- **Branch:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `out`

### Step 5: Add Environment Variables
Click **"Add environment variables"**:
- `NEXT_PUBLIC_SUPABASE_URL` = (your Supabase project URL)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your Supabase anon key)

### Step 6: Save
Click **"Save"** - Netlify will trigger first build automatically!

---

## ✅ Test Auto-Deploy

After setup, test it:

```powershell
# Make a small change
git add .
git commit -m "test: verify auto-deploy"
git push
```

Watch it auto-deploy at: https://app.netlify.com/sites/YOUR_SITE_NAME/deploys

---

## 🎯 From Now On

Your workflow is simple:

```powershell
# 1. Make changes
# 2. Commit
git add .
git commit -m "feat: your feature"

# 3. Push → Auto-deploys! 🚀
git push
```

**That's it! No manual builds or deploys needed!**
