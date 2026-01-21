# 🔄 Connect GitHub + Netlify for Auto-Deploy

## 🎯 Goal
Set up automatic deployments: Every time you `git push` to GitHub, Netlify automatically rebuilds and deploys your app!

---

## ✅ Current Status
- ✅ Deployment successful: https://YOUR_SITE_NAME.netlify.app
- ✅ Latest fix deployed (no more duplicates!)
- ⏳ **Next:** Connect to GitHub for CI/CD

---

## 📋 Prerequisites

Before starting, you need:
1. ✅ Code pushed to GitHub
2. ✅ Netlify account (you already have this)
3. ✅ Site already deployed manually (YOUR_SITE_NAME)

---

## 🚀 Step-by-Step Setup

### Step 1: Push Code to GitHub (If Not Done Yet)

If you haven't pushed to GitHub yet:

```powershell
# 1. Create repo at https://github.com/new (name: tripmaster)
# 2. Run these commands:

git remote add origin https://github.com/YOUR_USERNAME/tripmaster.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

---

### Step 2: Connect Netlify to GitHub

#### Option A: Link Existing Site to GitHub (Recommended)

1. **Go to Netlify Dashboard**
   - Open https://app.netlify.com/sites/YOUR_SITE_NAME

2. **Site Settings → Build & deploy**
   - Click **"Link site to Git"** or **"Link repository"**

3. **Connect to Git provider**
   - Click **"GitHub"**
   - Authorize Netlify to access your GitHub account

4. **Select repository**
   - Choose your `tripmaster` repository

5. **Configure build settings**
   ```
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: out
   ```

6. **Set environment variables**
   - Click **"Environment variables"**
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = your_supabase_url
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your_supabase_key

7. **Save and Deploy**
   - Click **"Save"**
   - Netlify will trigger the first build automatically

---

#### Option B: Create New Site from GitHub (Alternative)

If you prefer to start fresh:

1. **Go to Netlify**
   - https://app.netlify.com/

2. **Add new site → Import an existing project**

3. **Connect to Git provider**
   - Select **GitHub**
   - Authorize if needed

4. **Pick repository**
   - Select `tripmaster`

5. **Configure build settings**
   ```
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: out
   Branch to deploy: main
   ```

6. **Add environment variables**
   - Click **"Show advanced"** → **"New variable"**
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

7. **Deploy site**

8. **Update custom domain (if needed)**
   - Go to **Domain settings**
   - Point to your existing domain: `YOUR_SITE_NAME.netlify.app`

---

## ✅ Verify CI/CD is Working

After connecting, test it:

### Test 1: Make a Small Change

```powershell
# 1. Make a small change (e.g., update a text)
# 2. Commit and push

git add .
git commit -m "test: verify auto-deploy"
git push
```

### Test 2: Check Netlify

1. Go to https://app.netlify.com/sites/YOUR_SITE_NAME/deploys
2. You should see a **new deploy triggered automatically**!
3. Wait for it to finish (usually 1-2 minutes)
4. Visit https://YOUR_SITE_NAME.netlify.app to see your changes

---

## 🎉 What You Get

After setup, your workflow becomes:

```bash
# 1. Make changes locally
# 2. Test locally (npm run dev)
# 3. Commit
git add .
git commit -m "feat: add new feature"

# 4. Push to GitHub
git push

# 5. Netlify auto-deploys! 🚀
# (No manual build or deploy needed!)
```

---

## 📊 Deploy Status

You can monitor deployments at:
- **Deploy Dashboard:** https://app.netlify.com/sites/YOUR_SITE_NAME/deploys
- **Build logs:** Click on any deploy to see logs
- **Deploy notifications:** Netlify will email you on success/failure

---

## 🔧 Build Settings Reference

For your reference, here are the correct settings:

| Setting | Value |
|---------|-------|
| Repository | `YOUR_USERNAME/tripmaster` |
| Branch | `main` |
| Base directory | (empty) |
| Build command | `npm run build` |
| Publish directory | `out` |
| Node version | 18.x (auto-detected) |

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## ⚠️ Important Notes

1. **Branch Protection:** Only pushes to `main` will trigger deploys (configurable)
2. **Build Time:** Builds typically take 1-2 minutes
3. **Deploy Previews:** Netlify can also create preview deploys for pull requests
4. **Rollback:** You can roll back to any previous deploy in the Netlify dashboard

---

## 🆘 Troubleshooting

### Build fails?
- Check build logs in Netlify dashboard
- Verify environment variables are set correctly
- Make sure `npm run build` works locally first

### Deploy not triggered after push?
- Check repository connection in Netlify settings
- Verify you pushed to the correct branch (`main`)
- Check webhook settings in GitHub repo settings

### Old version showing?
- Clear browser cache
- Check deploy status in Netlify dashboard
- Wait a few minutes for CDN to update

---

## 🎯 Next Steps

1. ✅ Push code to GitHub
2. ✅ Connect Netlify to GitHub repository
3. ✅ Test by making a small change and pushing
4. 🎉 Enjoy automatic deployments!

**Your modern CI/CD pipeline is ready! 🚀**
