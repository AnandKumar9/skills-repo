---
targets: ["Claude Code", "Windsurf"]
description: Documentation standards for code, components, and APIs
globs: ["**/*.md", "**/*.tsx", "src/**/*.ts", "README.md"]
---

# Documentation Standards

## Rule
Every public component, function, and module must have clear, concise documentation.

## Implementation
- Write JSDoc comments for functions and exports
- Include component prop documentation
- Keep README files updated in component directories
- Use markdown for detailed documentation
- Include usage examples in comments

## Examples

### Component Documentation
```typescript
/**
 * UserCard - Displays user information in a card format
 * 
 * @component
 * @example
 * const user = { id: '1', name: 'John', email: 'john@example.com' };
 * return <UserCard user={user} onSelect={() => {}} />
 * 
 * @param {User} user - The user object to display
 * @param {function} onSelect - Callback when card is clicked
 * @returns {ReactElement} The rendered user card
 */
export function UserCard({ user, onSelect }: UserCardProps) {}
```

### README Template
```markdown
# ComponentName

Brief description of the component.

## Usage
\`\`\`tsx
import { ComponentName } from './ComponentName';
\`\`\`

## Props
| Name | Type | Required | Description |
```
