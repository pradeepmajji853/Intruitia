# Vercel Deployment Troubleshooting Guide

## Common Issues and Solutions

### Issue: Blank Page or 404 Error When Accessing Routes Directly

**Symptoms:**
- The home page (/) loads correctly
- Accessing routes like `/cancellation-policy` directly results in a blank page or 404 error
- Error in browser console: "Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of 'text/html'"

**Solutions:**

1. **Update Vercel Configuration:**
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

2. **Create a `_redirects` File:**
   Create a file in the `public` directory named `_redirects` with:
   ```
   /* /index.html 200
   ```

3. **Add a Base Tag to index.html:**
   Add `<base href="/" />` to the `<head>` section of your index.html file.

4. **Check the Build Output:**
   Ensure your `dist` directory contains:
   - An `index.html` file
   - An `assets` directory with your CSS and JS files
   - Proper asset paths in the generated HTML

### Issue: Assets Not Loading (CSS/JS Missing)

**Symptoms:**
- Page structure loads but with no styling
- Functionality doesn't work
- Console errors about missing .js or .css files

**Solutions:**

1. **Check Asset Paths:**
   Make sure your Vite configuration has the correct base path:
   ```js
   export default defineConfig({
     base: '/',
     // other config
   });
   ```

2. **Configure Proper Caching:**
   Add headers for asset caching:
   ```json
   {
     "headers": [
       {
         "source": "/assets/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           }
         ]
       }
     ]
   }
   ```

3. **Try Absolute URLs:**
   For critical assets, consider using absolute URLs in your HTML.

### Issue: API or Backend Connectivity Problems

**Symptoms:**
- Frontend loads but API calls fail
- CORS errors in the console

**Solutions:**

1. **Configure CORS Headers:**
   Make sure your backend allows requests from your Vercel domain.

2. **Check Environment Variables:**
   Ensure proper API URLs are set in Vercel environment variables.

## Vercel-Specific Solutions

### Override Build Command

If issues persist, override the build command in the Vercel dashboard:

1. Go to your project settings in Vercel
2. Navigate to "Build & Development Settings"
3. Set Build Command to: `npm run build && cp dist/index.html dist/200.html`
4. Set Output Directory to: `dist`

### Deploy from Local

If GitHub integration has issues, deploy directly from local:

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

## Testing After Deployment

After deploying to Vercel, test the following:

1. **Direct URL Access:**
   - Home page: `https://your-domain.vercel.app/`
   - Policy pages: 
     - `https://your-domain.vercel.app/privacy-policy`
     - `https://your-domain.vercel.app/terms-and-conditions`
     - `https://your-domain.vercel.app/refund-policy`
     - `https://your-domain.vercel.app/cancellation-policy`

2. **Browser Refresh:**
   Navigate to a page and refresh the browser to ensure it still loads correctly.

3. **Asset Loading:**
   Check browser console for any missing asset errors.

## Getting Help

If you continue to experience issues:

1. Check Vercel deployment logs for specific errors
2. Refer to [Vite's deployment guide](https://vitejs.dev/guide/static-deploy.html)
3. Look at [Vercel's troubleshooting documentation](https://vercel.com/docs/concepts/deployments/troubleshooting)
