// This file ensures Vercel uses the correct build configuration
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the build command
console.log('Starting build process...');
execSync('npm run build', { stdio: 'inherit' });
console.log('Build completed successfully!');

// Make sure the public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a _redirects file to handle client-side routing
const redirectsPath = path.join(publicDir, '_redirects');
fs.writeFileSync(redirectsPath, '/*    /index.html   200');
console.log('Created _redirects file for SPA routing');

// Copy redirects to dist folder for Vercel
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.copyFileSync(redirectsPath, path.join(distDir, '_redirects'));
  console.log('Copied _redirects to dist folder');
}

// Create a simple vercel.json in the dist directory
const vercelConfig = {
  "routes": [
    { "handle": "filesystem" },
    { "src": "/assets/(.*)", "headers": { "cache-control": "public, max-age=31536000, immutable" } },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
};

fs.writeFileSync(
  path.join(distDir, 'vercel.json'), 
  JSON.stringify(vercelConfig, null, 2)
);
console.log('Created vercel.json in dist directory');
