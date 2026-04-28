---
targets: ["Claude Code", "Windsurf"]
description: Component structure and organization conventions for reusable UI components
globs: ["**/*.tsx", "**/*.jsx", "src/components/**"]
tags: ["components", "architecture", "structure", "organization"]
---

# Component Structure Guidelines

## Rule
Every component should follow a consistent file structure with collocated styles, tests, and documentation.

## Implementation
- Place component file alongside its test file
- Keep component-specific styles in the same directory
- Use index.ts for directory exports
- Include a README.md for complex components

## Example Structure
```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.module.css
│   └── README.md
└── index.ts
```
