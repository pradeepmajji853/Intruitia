# Vercel Deployment Guide for Vite + React Router

## The Issue

When deploying a Vite + React Router application to Vercel, you may encounter:
- Blank pages when accessing routes directly
- Module loading errors with MIME type issues
- Routes working from the homepage but not when accessed directly

## Solution: Use this Step-by-Step Process

### 1. Update your Project Configuration

1. **Add a base tag to index.html**:
   ```html
   <head>
     <!-- other head content -->
     <base href="/" />
   </head>
   ```

2. **Set the base URL in vite.config.ts**:
   ```js
   export default defineConfig({
     base: '/',
     // other config
   });
   ```

3. **Create a Vercel configuration file**:
   Create a file named `vercel.json` with:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

### 2. Special Build Process

Perform these steps after your normal build process:

```bash
# Build the project
npm run build

# Create a fallback page for SPA routing
cp dist/index.html dist/200.html

# Create redirects for client-side routing
mkdir -p dist/public
echo "/* /index.html 200" > dist/public/_redirects
```

### 3. Deploy to Vercel

#### Option A: Deploy via Git Repository

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build && cp dist/index.html dist/200.html`
   - Output Directory: `dist`

#### Option B: Deploy via Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Run: `vercel --prod`

### 4. Verify Your Deployment

Test all routes by accessing them directly:
- Home: `https://your-domain.vercel.app/`
- Policies: 
  - `https://your-domain.vercel.app/privacy-policy`
  - `https://your-domain.vercel.app/cancellation-policy`
  - `https://your-domain.vercel.app/refund-policy`
  - `https://your-domain.vercel.app/terms-and-conditions`

### 5. Troubleshooting

If issues persist, refer to the detailed `VERCEL_TROUBLESHOOTING.md` file for more advanced solutions.

## Why This Works

This configuration tells Vercel to:
1. Serve your `index.html` file for all routes
2. Properly handle client-side routing
3. Preserve correct paths for loading JavaScript modules

The combination of base tag, Vercel rewrites, and SPA fallbacks ensures that your React Router application works correctly regardless of how users access your site.
