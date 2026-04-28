---
targets: ["Claude Code", "Windsurf"]
description: Git workflow and commit message conventions
globs: [".git/**", "**/*.md"]
---

# Git Workflow & Commit Messages

## Rule
Follow a consistent git workflow with descriptive commit messages for clarity in project history.

## Implementation
- Use meaningful branch names: feature/*, bugfix/*, hotfix/*
- Write clear, descriptive commit messages
- Follow the Conventional Commits specification
- Keep commits atomic and focused
- Use pull requests for code review before merging

## Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, missing semicolons)
- **refactor**: Code change that doesn't fix a bug or add a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **ci**: CI/CD configuration changes

### Example
```
feat(auth): add JWT token refresh mechanism

Implement automatic token refresh on token expiration.
Adds refresh token rotation for improved security.

Fixes #123
```

## Branch Naming
- feature/user-authentication
- bugfix/login-button-alignment
- hotfix/critical-security-patch
