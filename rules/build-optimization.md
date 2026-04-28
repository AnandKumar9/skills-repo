---
targets: ["Claude Code", "Windsurf"]
description: Build process optimization and deployment best practices
globs: ["**/*.config.ts", "**/*.config.js", "package.json", "astro.config.mjs"]
tags: ["build", "performance", "deployment", "bundling"]
---

# Build Optimization & Deployment

## Rule
Optimize build output for minimal bundle size and fast deployment.

## Implementation
- Enable minification and compression
- Remove unused code (tree-shaking)
- Optimize images and assets
- Implement incremental static generation where possible
- Use environment variables for configuration
- Monitor bundle size with tools

## Build Configuration
```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'ES2020',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
});
```

## Optimization Strategies
- Code splitting by route
- Lazy loading components
- Image optimization (WebP, AVIF)
- CSS purging
- Remove source maps from production
- Use CDN for static assets
- Enable compression (gzip, brotli)

## Monitoring
- Use lighthouse-ci for performance tracking
- Monitor Core Web Vitals
- Analyze bundle size trends
- Set up performance budgets
