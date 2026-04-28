---
targets: ["Claude Code", "Windsurf"]
description: Consistent error handling and validation patterns
globs: ["**/*.ts", "**/*.tsx", "src/**/*.ts"]
tags: ["error-handling", "validation", "debugging", "robustness"]
---

# Error Handling & Validation

## Rule
All errors must be properly caught, logged, and communicated to users in a meaningful way.

## Implementation
- Use try-catch blocks for async operations
- Provide user-friendly error messages
- Log errors with context information
- Validate input at system boundaries
- Create custom error classes for specific error types

## Example Pattern
```typescript
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

async function fetchUserData(userId: string) {
  try {
    if (!userId) throw new ValidationError('User ID is required', 'userId');
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```
