---
targets: ["Claude Code", "Windsurf"]
description: Performance optimization practices for fast page load and runtime
globs: ["**/*.tsx", "**/*.ts", "**/*.jsx", "src/**"]
tags: ["performance", "optimization", "react", "metrics"]
---

# Performance Optimization

## Rule
Optimize for fast initial page load, runtime performance, and memory efficiency.

## Implementation
- Use code splitting for route-based components
- Implement lazy loading for images and components
- Memoize expensive computations with useMemo
- Prevent unnecessary re-renders with memo and useMemo
- Bundle only required dependencies
- Use Web Vitals (LCP, FID, CLS) as metrics

## Example Patterns
```typescript
// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Memoize expensive computation
const expensiveValue = useMemo(() => {
  return computeComplexData(data);
}, [data]);

// Prevent unnecessary re-renders
const MemoizedComponent = memo(({ user }: Props) => {
  return <div>{user.name}</div>;
});

// Lazy load image
<img loading="lazy" src="image.jpg" alt="description" />
```

## Tools
- Lighthouse for performance audits
- React DevTools Profiler
- Bundle analyzer tools
