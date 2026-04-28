---
layout: ../layouts/MarkdownPageLayout.astro
title: Useful Resources
description: Reference links, examples, and operating notes for working with this repository.
---

This page collects sample resource content that can be maintained as Markdown while still appearing as a first-class item in the main website sidebar.

## Repository Areas

Use these folders as the primary source of truth for catalog content:

- `skills/` contains reusable skill instructions.
- `subagents/` contains subagent definitions and related Markdown files.
- `website/` contains the Astro site that reads and presents repository content.

Website-only guide pages can live under `website/src/pages/` when they are not part of the root catalog itself.

## Authoring References

The repository works best when Markdown files are consistent and easy to parse. These conventions help keep pages readable:

1. Start with a short summary of the resource.
2. Use descriptive section headings.
3. Prefer examples that show real folder and file shapes.
4. Keep long operational notes in dedicated pages instead of crowding catalog cards.

## Example Skill Skeleton

```md
# Skill Name

Briefly describe what this skill helps with and when it should be used.

## Inputs

- Source files, logs, screenshots, or design notes.
- Any constraints the agent should respect.

## Output

A concise, actionable result that fits the requested workflow.
```

## Maintenance Notes

| Task | Where to update | Notes |
| --- | --- | --- |
| Add a skill | `skills/<name>/SKILL.md` | Keep the folder name short and descriptive. |
| Add a subagent | `subagents/` | Use clear boundaries and responsibilities. |
| Add a website guide | `website/src/pages/` | Use a Markdown page layout when it belongs in the main sidebar. |

## Helpful Checks

Before publishing changes, run the site build from the `website/` folder:

```sh
npm run build
```

That confirms the Markdown page routes, Astro pages, and Starlight content can all be generated together.
