# Deployment Guide - Visual Product Matcher

This guide provides detailed instructions for deploying the Visual Product Matcher app to Vercel.

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- GitHub account (for GitHub integration with Vercel)
- Vercel account (free tier available)

## Quick Deploy Button

You can deploy directly to Vercel with a single click:

```
Deploying via CLI or GitHub integration (see options below)
```

## Deployment Options

### Option 1: Vercel CLI (Recommended for Quick Testing)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate.

#### Step 3: Deploy
```bash
# From project root directory
vercel
```

For production deployment:
```bash
vercel --prod
```

Or use the npm script:
```bash
npm run deploy
```

✅ Your app will be live at a URL like: `https://visual-product-matcher.vercel.app`

---

### Option 2: GitHub Integration (Recommended for Production)

This option provides automatic deployments whenever you push to GitHub.

#### Step 1: Push Code to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Visual Product Matcher app"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/visual-product-matcher.git
git push -u origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "Add New Project"
4. Select your `visual-product-matcher` repository
5. Vercel will auto-detect:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click "Deploy"

#### Step 3: Configure Environment (Optional)
If you need environment variables:
1. Go to project Settings → Environment Variables
2. Add any `.env` variables
3. Redeploy

✅ Your app will auto-deploy with every GitHub push!

---

### Option 3: Manual Upload via Web UI

#### Step 1: Build Locally
```bash
npm run build
```
This creates a `dist/` folder with production-ready files.

#### Step 2: Upload to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select "Other"
4. Upload the `dist/` folder or connect your Git repository
5. Click "Deploy"

---

## Configuration Files for Deployment

The project includes configuration files for optimal Vercel deployment:

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev"
}
```

### vite.config.js
Pre-configured for production builds with:
- Tailwind CSS optimization
- React plugin for JSX support
- Automatic code splitting

---

## Post-Deployment

### Domain Configuration
1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain (e.g., `productmatcher.yourdomain.com`)
3. Follow DNS configuration steps

### Environment & Secrets
- No secrets needed for free tier (app uses public data)
- For future API integrations, add via Vercel dashboard

### Monitoring
- Vercel provides:
  - Build logs
  - Deployment history
  - Performance metrics
  - Error tracking

---

## Troubleshooting

### Build Fails
Check the build logs in Vercel dashboard. Common issues:
- Missing dependencies → Run `npm install`
- Node version mismatch → Use Node 18+ (set in `engines` in package.json)

### App Shows 404
- Verify `dist/` folder has `index.html`
- Check `vercel.json` output directory is set to `dist`

### Image URLs Fail
- External image URLs (Unsplash) work fine
- If using local images, place them in `public/` folder

### Styling Issues
- Tailwind CSS is compiled in build
- If styles missing, rebuild and redeploy: `npm run build`

---

## Performance Tips

✅ Already optimized in this build:
- Vite fast builds
- Tailwind CSS purging (unused styles removed)
- Code splitting with React
- Image optimization with error fallbacks

### Further Optimization (Optional)
- Use Vercel EdgeCache for static assets
- Enable Vercel Firewall
- Set up Analytics in Vercel dashboard

---

## Continuous Deployment (GitHub Integration)

Once connected to GitHub, your workflow is:
```
1. Make code changes locally
2. Commit and push to GitHub
3. Vercel automatically:
   - Triggers build
   - Runs tests (if configured)
   - Deploys to production
4. See build status in Vercel dashboard
```

No manual redeploys needed!

---

## Rollback

To rollback to a previous deployment:
1. Vercel Dashboard → Deployments
2. Find the deployment you want
3. Click "Redeploy"

---

## Getting Help

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **React Docs**: [react.dev](https://react.dev)
- **Tailwind CSS Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**Deployment Status**: ✅ Ready for production

Your app is optimized and ready to deploy!
