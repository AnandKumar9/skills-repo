---
title: Agents
description: Notes on building, using, and evaluating agentic workflows.
---

Agentic systems combine model reasoning with tools, memory, and iterative control flow.

Use this page for documentation about tool boundaries, delegation patterns, validation steps, and operational safeguards.

## Design Notes

- Keep tool responsibilities narrow.
- Make state transitions observable.
- Verify outputs before taking irreversible actions.
- Prefer bounded workflows when reliability matters.
