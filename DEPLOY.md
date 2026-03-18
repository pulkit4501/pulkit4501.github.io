# Deploying to GitHub Pages

Step-by-step guide to host your portfolio website on GitHub Pages for free.

---

## Prerequisites

- A [GitHub](https://github.com) account
- [Git](https://git-scm.com/downloads) installed on your computer
- Terminal / Command Prompt access

---

## Step 1: Create a GitHub Repository

### Option A: Personal Site (`username.github.io`)
1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `<your-username>.github.io` (e.g., `pulkit4501.github.io`)
3. Set to **Public**
4. Do NOT initialize with README (we already have one)
5. Click **Create repository**

### Option B: Project Site (`username.github.io/repo-name`)
1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: any name (e.g., `portfolio`)
3. Set to **Public**
4. Click **Create repository**

---

## Step 2: Push Your Code

Open Terminal, navigate to this project folder, and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial portfolio deployment"

# Set the main branch
git branch -M main

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and REPO_NAME:
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon in the top menu)
3. In the left sidebar, click **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select `main` and `/ (root)`
6. Click **Save**

Your site will be live within 1–2 minutes at:
- **Personal site**: `https://<your-username>.github.io`
- **Project site**: `https://<your-username>.github.io/<repo-name>`

---

## Step 4: Custom Domain (Optional)

If you own a domain (e.g., `pulkitagarwal.com`):

1. In **Settings → Pages**, enter your domain under **Custom domain**
2. In your DNS provider, add:
   - **A records** pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME record**: `www` → `<your-username>.github.io`
3. Check **Enforce HTTPS** in GitHub Pages settings

---

## Updating Your Site

After making changes locally, push updates:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Pages will automatically redeploy within ~60 seconds.

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| 404 Page Not Found | Ensure `index.html` is in the root of the repo |
| CSS/JS not loading | Check that paths are relative (no leading `/`) |
| Images not showing | Verify image files are committed and paths match |
| Changes not appearing | Hard refresh (`Cmd+Shift+R`) or wait 2 minutes |
| Custom domain not working | DNS propagation takes up to 48 hours |
| Jekyll processing errors | `.nojekyll` file must exist in root |
