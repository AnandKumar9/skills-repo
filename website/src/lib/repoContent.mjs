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
const announcementsPath = path.join(repoRoot, "website", "announcements.yml");
const repositoryUrl = (process.env.PUBLIC_REPOSITORY_URL ?? "https://github.com/AnandKumar9/skills-repo").replace(
  /\/$/,
  "",
);
const repositoryRef = process.env.PUBLIC_REPOSITORY_REF ?? "main";

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

function normalizeAnnouncementDate(value) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : new Date(timestamp);
}

function normalizeAnnouncementPart(part) {
  if (!part || typeof part !== "object" || typeof part.text !== "string") {
    return null;
  }

  const text = part.text;
  const href = typeof part.href === "string" ? part.href.trim() : "";

  if (!text.trim()) {
    return null;
  }

  return href ? { text, href } : { text };
}

function normalizeAnnouncement(announcement) {
  if (!announcement || typeof announcement !== "object" || announcement.enabled === false) {
    return null;
  }

  const parts = Array.isArray(announcement.parts)
    ? announcement.parts.map(normalizeAnnouncementPart).filter(Boolean)
    : [];

  if (parts.length === 0) {
    return null;
  }

  const title = typeof announcement.title === "string" ? announcement.title.trim() : "";
  const tone = typeof announcement.tone === "string" ? announcement.tone.trim().toLowerCase() : "info";
  const startsAt = normalizeAnnouncementDate(announcement.startsAt);
  const expiresAt = normalizeAnnouncementDate(announcement.expiresAt);

  return {
    title,
    parts,
    tone: ["info", "success", "warning"].includes(tone) ? tone : "info",
    startsAt,
    expiresAt,
  };
}

function isActiveAnnouncement(announcement, now = new Date()) {
  if (!announcement) {
    return false;
  }

  if (announcement.startsAt && announcement.startsAt > now) {
    return false;
  }

  if (announcement.expiresAt && announcement.expiresAt < now) {
    return false;
  }

  return true;
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

export function getActiveAnnouncements({ limit = 2, now = new Date() } = {}) {
  if (!fs.existsSync(announcementsPath)) {
    return [];
  }

  const data = yaml.load(fs.readFileSync(announcementsPath, "utf-8"));
  const announcements = Array.isArray(data?.announcements) ? data.announcements : [];

  return announcements
    .map(normalizeAnnouncement)
    .filter((announcement) => isActiveAnnouncement(announcement, now))
    .slice(0, limit)
    .map((announcement) => {
      const { startsAt, expiresAt, ...publicAnnouncement } = announcement;
      return publicAnnouncement;
    });
}

export function getActiveAnnouncement(now = new Date()) {
  return getActiveAnnouncements({ limit: 1, now })[0] ?? null;
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

function encodeSourcePath(sourcePath) {
  return sourcePath
    .split(path.sep)
    .join("/")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function getSourceUrls(sourcePath) {
  const encodedPath = encodeSourcePath(sourcePath);
  const githubUrl = `${repositoryUrl}/blob/${repositoryRef}/${encodedPath}`;
  const downloadUrl = repositoryUrl.includes("github.com")
    ? `${repositoryUrl.replace("github.com", "raw.githubusercontent.com")}/${repositoryRef}/${encodedPath}`
    : githubUrl;

  return {
    downloadUrl,
    githubUrl,
  };
}

function getMarkdownBodyExcerpt(markdownPath, lineCount = 10) {
  const markdown = fs.readFileSync(markdownPath, "utf-8");
  const body = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*/, "");

  return body.split(/\r?\n/).slice(0, lineCount).join("\n").trim();
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

export function getRules() {
  const rulesDir = getRepoPath("rules");
  const declaredTags = getDeclaredTags();
  const updates = getContentUpdates();

  if (!fs.existsSync(rulesDir)) {
    return [];
  }

  return fs
    .readdirSync(rulesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => {
      const sourcePath = path.join("rules", entry.name);
      const rulePath = path.join(rulesDir, entry.name);
      const metadata = getMarkdownMetadata(rulePath, declaredTags);
      const contentEntry = getContentEntry("rules", entry.name, updates);
      const sourceUrls = getSourceUrls(sourcePath);

      return {
        name: entry.name,
        description: metadata.description,
        dialogDescription: getMarkdownBodyExcerpt(rulePath),
        downloadCommand: `curl -L ${sourceUrls.downloadUrl} -o ${entry.name}`,
        downloadDialogTitle: "Download",
        tags: metadata.tags,
        author: metadata.author || contentEntry.author,
        ...sourceUrls,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
