import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

function findRepoRoot(startDir) {
  let currentDir = startDir;

  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, "tags.yml")) && fs.existsSync(path.join(currentDir, "website"))) {
      return currentDir;
    }

    currentDir = path.dirname(currentDir);
  }

  return path.resolve(startDir, "..");
}

const repoRoot = findRepoRoot(process.cwd());
const tagsPath = path.join(repoRoot, "tags.yml");

function normalizeTag(tag) {
  return tag.trim().toLowerCase();
}

function getRawTags(metadata) {
  if (!("tags" in metadata)) {
    return [];
  }

  if (typeof metadata.tags === "string") {
    return metadata.tags.split(",");
  }

  if (Array.isArray(metadata.tags)) {
    return metadata.tags.filter((tag) => typeof tag === "string");
  }

  return [];
}

export function getRepoPath(...segments) {
  return path.join(repoRoot, ...segments);
}

export function getDeclaredTags() {
  if (!fs.existsSync(tagsPath)) {
    return [];
  }

  const tags = yaml.load(fs.readFileSync(tagsPath, "utf-8"));

  if (!Array.isArray(tags)) {
    return [];
  }

  return [...new Set(tags.filter((tag) => typeof tag === "string").map((tag) => tag.trim()).filter(Boolean))];
}

export function getMarkdownMetadata(markdownPath, declaredTags = getDeclaredTags()) {
  const markdown = fs.readFileSync(markdownPath, "utf-8");
  const frontmatter = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
  const metadata = frontmatter ? yaml.load(frontmatter[1]) : null;
  const validTags = new Map(declaredTags.map((tag) => [normalizeTag(tag), tag]));

  if (!metadata || typeof metadata !== "object") {
    return {
      description: "",
      tags: [],
    };
  }

  const description =
    "description" in metadata && typeof metadata.description === "string" ? metadata.description.trim() : "";

  const tags = getRawTags(metadata)
    .map((tag) => validTags.get(normalizeTag(tag)))
    .filter(Boolean);

  return {
    description,
    tags: [...new Set(tags)],
  };
}

export function getSkills() {
  const skillsDir = getRepoPath("skills");
  const declaredTags = getDeclaredTags();

  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const skillPath = path.join(skillsDir, entry.name, "SKILL.md");
      const metadata = fs.existsSync(skillPath)
        ? getMarkdownMetadata(skillPath, declaredTags)
        : { description: "", tags: [] };

      return {
        name: entry.name,
        description: metadata.description,
        tags: metadata.tags,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getSubagents() {
  const subagentsDir = getRepoPath("subagents");
  const declaredTags = getDeclaredTags();

  return fs
    .readdirSync(subagentsDir, { withFileTypes: true })
    .filter((entry) => {
      if (entry.isDirectory()) return true;
      if (entry.isFile() && entry.name.endsWith(".md")) return true;
      return false;
    })
    .map((entry) => {
      const subagentPath = path.join(subagentsDir, entry.name);
      const metadata =
        entry.isFile() && entry.name.endsWith(".md")
          ? getMarkdownMetadata(subagentPath, declaredTags)
          : { description: "", tags: [] };

      return {
        name: entry.name,
        description: metadata.description,
        tags: metadata.tags,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
