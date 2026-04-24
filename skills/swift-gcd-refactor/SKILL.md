---
name: swift-gcd-refactor
description: Refactor Swift code to use Grand Central Dispatch (GCD) safely
tools: [codebase, edit]
---

## Goal
Convert Swift concurrency based code to use GCD for asynchronous tasks while ensuring thread safety and performance.


## Steps
1. Identify async/await usage and actor isolation
2. Replace with GCD operations
3. Ensure proper thread safety

## Constraints
- Preserve existing behavior
- Avoid force unwraps
- Keep main-thread UI updates explicit (DispatchQueue.main.async)