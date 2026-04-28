---
targets: ["Claude Code", "Windsurf"]
description: Responsive design and mobile-first development practices
globs: ["**/*.css", "**/*.module.css", "**/*.tsx", "src/styles/**"]
tags: ["responsive", "mobile-first", "design", "ux"]
---

# Responsive Design & Mobile-First

## Rule
Design and implement features with mobile-first approach, ensuring proper responsiveness across all device sizes.

## Implementation
- Use mobile-first CSS approach (start with mobile, expand to larger screens)
- Use flexible layouts (Flexbox, Grid)
- Use relative units (rem, em, %) instead of fixed pixels
- Test on actual devices and various screen sizes
- Use semantic breakpoints based on content, not devices

## Breakpoints
```css
/* Mobile first */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 720px;
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}

/* Large desktop */
@media (min-width: 1280px) {
  .container {
    width: 1200px;
  }
}
```

## Best Practices
- Use viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Test with actual mobile devices
- Optimize images for different screen densities
- Ensure touch targets are at least 44×44 pixels
