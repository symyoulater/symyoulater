# HashCraft — AI Hashtag Generator

## Deploy to Vercel (5 steps)

### 1. Get an Anthropic API key
Go to https://console.anthropic.com, sign up, and create an API key.

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
```
Create a new repo at https://github.com/new, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/hashcraft.git
git push -u origin main
```

### 3. Import to Vercel
- Go to https://vercel.com and sign in (free account works)
- Click **Add New Project** and import your GitHub repo
- Click **Deploy**

### 4. Add your API key
- In your Vercel project go to **Settings → Environment Variables**
- Add: Name = `ANTHROPIC_API_KEY`, Value = your key from step 1
- Click **Save**

### 5. Redeploy
- Go to the **Deployments** tab
- Click the three dots on the latest deploy → **Redeploy**

Your app is live at `https://your-project.vercel.app`

---

## Run locally
```bash
npm install
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
npm run dev
```
Open http://localhost:3000
