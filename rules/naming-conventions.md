---
targets: ["Claude Code", "Windsurf"]
description: Consistent naming conventions for variables, functions, and files
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
---

# Naming Conventions

## Rule
Use consistent naming patterns across the codebase for clarity and maintainability.

## Implementation

### Variables & Constants
- Use camelCase for variables and functions
- Use UPPER_SNAKE_CASE for constants
- Use PascalCase for classes and components
- Boolean variables should start with `is`, `has`, or `can`

### Files & Directories
- Component files: PascalCase (Button.tsx, UserProfile.tsx)
- Utility files: camelCase (formatDate.ts, parseJson.ts)
- Directories: kebab-case (my-components, utils-helpers)

### Functions
- Use descriptive verbs: `getUser()`, `formatDate()`, `handleClick()`
- Event handlers: `handleClick()`, `onSubmit()`, `onChange()`

## Examples
```typescript
// Variables
const userCount = 42;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const isLoading = false;

// Components
export function UserCard() {}

// Files
UserCard.tsx
useUserData.ts
```
