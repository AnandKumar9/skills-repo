import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

function findRepoRoot(startDir) {
  let currentDir = startDir;

  while (currentDir !== path.dirname(currentDir)) {
    if (
      fs.existsSync(path.join(currentDir, "website")) &&
      fs.existsSync(path.join(currentDir, "website", "content-tags.yml"))
    ) {
      return currentDir;
    }

    currentDir = path.dirname(currentDir);
  }

  return path.resolve(startDir, "..");
}

const repoRoot = findRepoRoot(process.cwd());
const tagsPath = path.join(repoRoot, "website", "content-tags.yml");
const contentUpdatesPath = path.join(repoRoot, "website", "content-updates.yml");

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

function normalizeContentDate(value) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString();
  }

  if (typeof value !== "string") {
    return null;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString();
}

function getContentDateTimestamp(value) {
  const normalizedDate = normalizeContentDate(value);
  return normalizedDate ? Date.parse(normalizedDate) : null;
}

function normalizeAuthor(value) {
  if (typeof value !== "string") {
    return "";
  }

  const author = value.trim();
  return /^[A-Za-z]{3}\d{3}$/.test(author) ? author : "";
}

function normalizeMarkdownAuthors(metadata) {
  if ("author" in metadata && typeof metadata.author === "string") {
    return metadata.author.trim();
  }

  if ("authors" in metadata) {
    if (typeof metadata.authors === "string") {
      return metadata.authors
        .split(",")
        .map((author) => author.trim())
        .filter(Boolean)
        .join(", ");
    }

    if (Array.isArray(metadata.authors)) {
      return metadata.authors
        .filter((author) => typeof author === "string")
        .map((author) => author.trim())
        .filter(Boolean)
        .join(", ");
    }
  }

  return "";
}

function normalizeContentUpdateEntry(entry) {
  if (entry instanceof Date || typeof entry === "string") {
    return {
      createdAt: normalizeContentDate(entry),
      author: "",
    };
  }

  if (!entry || typeof entry !== "object") {
    return {
      createdAt: null,
      author: "",
    };
  }

  return {
    createdAt: normalizeContentDate(entry.createdAt),
    author: normalizeAuthor(entry.author),
  };
}

function normalizeContentUpdates(updates) {
  return Object.fromEntries(
    Object.entries(updates).map(([collectionName, collectionUpdates]) => {
      if (!collectionUpdates || typeof collectionUpdates !== "object") {
        return [collectionName, {}];
      }

      return [
        collectionName,
        Object.fromEntries(
          Object.entries(collectionUpdates).map(([itemName, entry]) => [itemName, normalizeContentUpdateEntry(entry)]),
        ),
      ];
    }),
  );
}

export function getContentUpdates() {
  if (!fs.existsSync(contentUpdatesPath)) {
    return {};
  }

  const updates = yaml.load(fs.readFileSync(contentUpdatesPath, "utf-8"));

  if (!updates || typeof updates !== "object") {
    return {};
  }

  return normalizeContentUpdates(updates);
}

export function sortByRecentUpdate(items, collectionName, updates = getContentUpdates()) {
  const collectionUpdates =
    updates && typeof updates === "object" && updates[collectionName] && typeof updates[collectionName] === "object"
      ? updates[collectionName]
      : {};

  return [...items].sort((a, b) => {
    const aCreatedAt = getContentDateTimestamp(collectionUpdates[a.name]?.createdAt);
    const bCreatedAt = getContentDateTimestamp(collectionUpdates[b.name]?.createdAt);

    if (aCreatedAt !== null && bCreatedAt !== null && aCreatedAt !== bCreatedAt) {
      return bCreatedAt - aCreatedAt;
    }

    if (aCreatedAt !== null && bCreatedAt === null) {
      return -1;
    }

    if (aCreatedAt === null && bCreatedAt !== null) {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });
}

function getContentEntry(collectionName, itemName, updates = getContentUpdates()) {
  return updates?.[collectionName]?.[itemName] ?? { createdAt: null, author: "" };
}

export function getMarkdownMetadata(markdownPath, declaredTags = getDeclaredTags()) {
  const markdown = fs.readFileSync(markdownPath, "utf-8");
  const frontmatter = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
  const metadata = frontmatter ? yaml.load(frontmatter[1]) : null;
  const validTags = new Map(declaredTags.map((tag) => [normalizeTag(tag), tag]));

  if (!metadata || typeof metadata !== "object") {
    return {
      author: "",
      description: "",
      tags: [],
    };
  }

  const author = normalizeMarkdownAuthors(metadata);
  const description =
    "description" in metadata && typeof metadata.description === "string" ? metadata.description.trim() : "";

  const tags = getRawTags(metadata)
    .map((tag) => validTags.get(normalizeTag(tag)))
    .filter(Boolean);

  return {
    author,
    description,
    tags: [...new Set(tags)],
  };
}

export function getSkills() {
  const skillsDir = getRepoPath("skills");
  const declaredTags = getDeclaredTags();
  const updates = getContentUpdates();

  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const skillPath = path.join(skillsDir, entry.name, "SKILL.md");
      const metadata = fs.existsSync(skillPath)
        ? getMarkdownMetadata(skillPath, declaredTags)
        : { author: "", description: "", tags: [] };
      const contentEntry = getContentEntry("skills", entry.name, updates);

      return {
        name: entry.name,
        description: metadata.description,
        tags: metadata.tags,
        author: metadata.author || contentEntry.author,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getSubagents() {
  const subagentsDir = getRepoPath("subagents");
  const declaredTags = getDeclaredTags();
  const updates = getContentUpdates();

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
          : { author: "", description: "", tags: [] };
      const contentEntry = getContentEntry("subagents", entry.name, updates);

      return {
        name: entry.name,
        description: metadata.description,
        tags: metadata.tags,
        author: metadata.author || contentEntry.author,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
