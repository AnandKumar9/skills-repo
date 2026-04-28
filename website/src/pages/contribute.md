---
layout: ../layouts/MarkdownPageLayout.astro
title: Contribute
description: Guidelines for adding and improving repository content without duplicating source folders.
---

This page is authored as Markdown and rendered by Astro through the main site layout. Use it for contribution guidance that belongs to the website itself, while keeping source content in the repository root folders.

## What to Contribute

Contributions can improve the catalog in a few different ways:

- Add a new skill folder under `skills/` with a clear `SKILL.md`.
- Add or refine subagent content under `subagents/`.
- Improve metadata, descriptions, and tags so the website can present items more clearly.
- Add website-only guidance pages when the content explains how to use or maintain the repository.

The website should read from root-level content folders instead of copying those folders into a Starlight docs area. If a page is only explanatory website content, placing Markdown under `website/src/pages/` is appropriate.

## Skill Checklist

Before adding a skill, make sure it has enough structure for both people and tooling:

1. Use a short, descriptive folder name.
2. Put the primary instructions in `SKILL.md`.
3. Include a concise description near the top of the Markdown.
4. Add tags only when they match the shared tag vocabulary.
5. Keep examples focused on the workflow the skill is meant to support.

## Subagent Checklist

Subagent content should be easy to scan and specific about the work the agent is expected to do.

- Name the responsibility clearly.
- Explain when the subagent should be used.
- Define inputs, outputs, and boundaries.
- Avoid overlapping heavily with another subagent unless the distinction is explicit.

## Markdown Examples

Markdown pages can include normal formatting:

> Keep source content in the root folders. Use website pages for website-specific guidance.

Inline code such as `skills/api-design/SKILL.md` renders correctly, and fenced code blocks work too:

```md
---
name: api-design
description: Helps review API shape, naming, versioning, and error behavior.
tags:
  - api
  - design
---
```

Tables are supported by the page styling:

| Content type | Source location | Website behavior |
| --- | --- | --- |
| Skills | `skills/` | Listed from root folder content |
| Subagents | `subagents/` | Listed from root folder content |
| Contribution guide | `website/src/pages/contribute.md` | Rendered as a top-level Markdown page |

## Review Expectations

A good contribution should keep the repository easy to browse and the generated website predictable. Prefer small, focused changes, and update the sample content or metadata when the public catalog would otherwise become confusing.
