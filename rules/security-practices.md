---
targets: ["Claude Code", "Windsurf"]
description: Security best practices to prevent common vulnerabilities
globs: ["**/*.tsx", "**/*.ts", "src/**"]
tags: ["security", "vulnerability", "owasp", "best-practices"]
---

# Security Best Practices

## Rule
Implement security practices to prevent common web vulnerabilities (XSS, CSRF, injection attacks).

## Implementation
- Sanitize user input before displaying it
- Use Content Security Policy (CSP) headers
- Avoid dangerouslySetInnerHTML unless absolutely necessary
- Use parameterized queries for database operations
- Keep dependencies up to date
- Use HTTPS for all communications
- Implement CSRF tokens for state-changing operations

## Common Vulnerabilities to Avoid

### XSS (Cross-Site Scripting)
```typescript
// ❌ Bad
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Good
import DOMPurify from 'dompurify';
<div>{DOMPurify.sanitize(userContent)}</div>
```

### SQL Injection
```typescript
// ❌ Bad
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Good
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

### CSRF Protection
- Use SameSite cookies
- Implement CSRF tokens
- Use POST for state-changing operations
