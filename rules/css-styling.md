---
targets: ["Claude Code", "Windsurf"]
description: CSS and styling guidelines for consistent visual design
globs: ["**/*.css", "**/*.scss", "**/*.module.css", "src/styles/**"]
tags: ["css", "styling", "design", "visual"]
---

# CSS & Styling Guidelines

## Rule
Use a component-scoped CSS approach with consistent naming patterns and avoid global style pollution.

## Implementation
- Use CSS Modules for component-specific styles
- Use Tailwind CSS utility classes for layout and spacing (if configured)
- Avoid inline styles; use classes instead
- Keep related styles colocated with components
- Use consistent color variables and design tokens

## Example
```css
/* Button.module.css */
.button {
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: background-color 200ms ease;
}

.button:hover {
  background-color: var(--color-primary-dark);
}

.button.variant-secondary {
  background-color: var(--color-secondary);
}
```

## Design Tokens
- Use CSS custom properties for colors, spacing, and typography
- Define all tokens in a central location
- Document color palette and spacing scale
