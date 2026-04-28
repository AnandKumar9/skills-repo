---
targets: ["Claude Code", "Windsurf"]
description: API integration and data fetching best practices
globs: ["**/*.ts", "**/*.tsx", "src/api/**", "src/hooks/**"]
tags: ["api", "data-fetching", "http", "async"]
---

# API Integration & Data Fetching

## Rule
Use consistent patterns for making API calls, handling responses, and managing async data.

## Implementation
- Use a dedicated HTTP client (fetch API, axios, or similar)
- Implement centralized error handling
- Use loading and error states
- Implement request/response interceptors
- Cache data appropriately
- Add request timeout handling

## Example Pattern
```typescript
// API client setup
const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// Custom hook for data fetching
export function useFetchUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}
```

## Considerations
- Implement request deduplication
- Add retry logic with exponential backoff
- Handle pagination properly
- Validate response data
