---
targets: ["Claude Code", "Windsurf"]
description: Testing strategy covering unit, integration, and E2E tests
globs: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "tests/**"]
tags: ["testing", "quality-assurance", "jest", "coverage"]
---

# Testing Strategy

## Rule
Test coverage should follow a pyramid: many unit tests, fewer integration tests, minimal E2E tests.

## Implementation
- Unit tests: Test individual functions and components in isolation
- Integration tests: Test how components work together
- E2E tests: Test critical user workflows
- Aim for 70%+ code coverage on critical paths

## Test Structure
```typescript
describe('UserCard', () => {
  it('renders user name correctly', () => {
    const { getByText } = render(<UserCard user={{ name: 'John' }} />);
    expect(getByText('John')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<UserCard user={{ name: 'John' }} onSelect={onSelect} />);
    fireEvent.click(getByRole('button'));
    expect(onSelect).toHaveBeenCalled();
  });
});
```

## Tools
- Unit testing: Jest, Vitest
- Component testing: React Testing Library, Cypress Component Testing
- E2E testing: Playwright, Cypress
