---
targets: ["Claude Code", "Windsurf"]
description: TypeScript strict mode enforcement for type safety
globs: ["**/*.ts", "**/*.tsx", "tsconfig.json"]
tags: ["typescript", "type-safety", "strict", "quality"]
---

# TypeScript Strict Mode

## Rule
All TypeScript files must be written with strict mode enabled. No implicit `any` types allowed.

## Implementation
- Enable `strict: true` in tsconfig.json
- Use explicit type annotations for function parameters and return types
- Avoid `as any` casts except in well-documented edge cases
- Use type guards instead of type assertions

## Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```
