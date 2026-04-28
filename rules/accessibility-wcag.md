---
targets: ["Claude Code", "Windsurf"]
description: WCAG 2.1 AA compliance for web accessibility
globs: ["**/*.tsx", "**/*.jsx", "**/*.html", "src/components/**"]
tags: ["accessibility", "wcag", "a11y", "compliance"]
---

# Accessibility & WCAG Compliance

## Rule
All interactive components and pages must meet WCAG 2.1 AA standards.

## Implementation
- Use semantic HTML elements (button, nav, main, article, etc.)
- Include proper ARIA labels for screen readers
- Ensure keyboard navigation works for all interactive elements
- Maintain adequate color contrast ratios (4.5:1 for text)
- Provide alt text for all images

## Checklist
- [ ] Tab order is logical and visible
- [ ] Focus indicators are clearly visible
- [ ] Form fields have associated labels
- [ ] Error messages are descriptive
- [ ] Images have appropriate alt text
