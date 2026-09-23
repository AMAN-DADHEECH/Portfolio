# 🚀 Free Deployment Guide: Aman Dadheech Portfolio

This portfolio is built with Next.js App Router and is 100% optimized for free static & edge hosting on **Vercel** (recommended) or **Netlify**. Both platforms offer:
- **100% Free Forever Tier**
- **Automatic HTTPS / SSL certificates**
- **Instant CI/CD**: every time you push code to GitHub, your portfolio updates automatically in seconds.
- **Custom Domain Support**: attach `amandadheech.dev` or use your free `.vercel.app` / `.netlify.app` subdomain.

---

## Option 1: Deploy to Vercel (Recommended — 2 Minutes)

Vercel is created by the makers of Next.js and requires zero configuration.

### Step 1: Push your code to GitHub
1. Create a new repository on [GitHub](https://github.com/new) named `portfolio` (or `aman-portfolio`).
2. Run the following commands in your terminal:
   ```bash
   git init
   git add .
   git commit -m "feat: complete modern full-stack developer portfolio"
   git branch -M main
   git remote add origin https://github.com/AMAN-DADHEECH/portfolio.git
   git push -u origin main
   ```

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your `portfolio` repository and click **"Import"**.
4. Vercel automatically detects **Next.js** framework preset. Keep default settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Click **"Deploy"**.
6. In ~45 seconds, your site is live! You will receive a URL like `https://aman-portfolio.vercel.app`.

---

## Option 2: Deploy to Netlify

1. Push your repository to GitHub (same as Step 1 above).
2. Go to [netlify.com](https://www.netlify.com) and sign up/log in with GitHub.
3. Click **"Add new site"** → **"Import an existing project"**.
4. Choose **GitHub** and select your portfolio repository.
5. Netlify will auto-detect Next.js:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
### Step 3: Add Environment Variables in Netlify (Essential for Contact Form)
Before or immediately after deploying, add your contact form email variables:
1. Go to your site dashboard in Netlify.
2. Navigate to **Site configuration** (or **Site settings**) → **Environment variables**.
3. Click **"Add a variable"** → **"Import from a .env file"** (or add one by one):
   ```env
   SMTP_USER=work.amandadheech2005@gmail.com
   SMTP_PASS=wbsx accf miwe igiv
   CONTACT_RECEIVER_EMAIL=work.amandadheech2005@gmail.com
   ```
4. Set Scopes to: **All scopes** (Builds, Functions, Post-processing).
5. If the site was already built, click **"Trigger deploy"** → **"Clear cache and deploy site"** so Netlify loads the new variables into the Next.js serverless functions.

---

## Adding Custom Domain (Optional & Free)
Once deployed on Vercel:
1. Go to your Project Dashboard → **Settings** → **Domains**.
2. Type your domain (e.g. `amandadheech.com`) and click **Add**.
3. Follow the simple DNS CNAME/A record instructions provided by Vercel. Vercel will automatically generate and renew an SSL certificate for free.

---

## Updating Your Portfolio Data Anytime
All your personal details, featured projects, career milestones, and skill categories are centralized in one file:
- `src/data/portfolioData.ts`

Whenever you want to add a new project, update your resume, or tweak your bio:
1. Edit `src/data/portfolioData.ts`.
2. Run `git commit -am "update projects"` and `git push`.
3. Vercel will automatically rebuild and deploy your changes live within seconds!
