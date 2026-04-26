---
name: swift-concurrency-refactor
description: Refactor Swift code to use async/await and actors safely
tags: iOS
tools: [codebase, edit]
---

## Goal
Convert legacy callback-based or GCD code into modern Swift concurrency.

## Steps
1. Identify completion handlers or DispatchQueue usage
2. Replace with async/await
3. Ensure proper actor isolation
4. Add Sendable where required

## Constraints
- Preserve existing behavior
- Avoid force unwraps
- Keep main-thread UI updates explicit (@MainActor)