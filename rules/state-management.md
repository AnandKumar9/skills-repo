---
targets: ["Claude Code", "Windsurf"]
description: State management patterns and best practices
globs: ["**/*.tsx", "**/*.ts", "src/store/**", "src/hooks/**"]
tags: ["state-management", "react-hooks", "patterns", "architecture"]
---

# State Management

## Rule
Use appropriate state management patterns based on scope and complexity.

## Implementation
- Use React hooks (useState, useReducer) for local component state
- Use Context API for shared state across component trees
- Consider Redux or Zustand for complex global state
- Keep state as close to where it's used as possible
- Avoid prop drilling; use context for deeply nested components

## Patterns

### Local State
```typescript
const [count, setCount] = useState(0);
```

### Shared State with Context
```typescript
const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
```

### Custom Hooks for State Logic
```typescript
export function useUserData(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // fetch logic
  }, [userId]);
  
  return { user, loading };
}
```
