import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const replacements = [
  ["bg-[length:200%_200%]", "bg-size-[200%_200%]"],
  ["max-w-[784px]", "max-w-196"],
  ["max-w-[1072px]", "max-w-268"],
  ["max-w-[800px]", "max-w-200"],
  ["max-w-[520px]", "max-w-130"],
  ["max-w-[477px]", "max-w-119.25"],
  ["max-w-[260px]", "max-w-65"],
  ["md:w-[70px]", "md:w-17.5"],
  ["md:h-[55px]", "md:h-13.75"],
  ["lg:h-[400px]", "lg:h-100"],
  ["lg:max-w-[460px]", "lg:max-w-115"],
  ["lg:max-w-[316px]", "lg:max-w-79"],
  ["after:w-[2px]", "after:w-0.5"],
  [
    "group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
    "group-data-[collapsible=offcanvas]:-right-(--sidebar-width)",
  ],
  ["-scale-x-[1]", "scale-x-[-1]"],
  ["-tracking-[1.32px]", "tracking-[-1.32px]"],
  ["-tracking-[1.44px]", "tracking-[-1.44px]"],
  ["-tracking-[0.8px]", "tracking-[-0.8px]"],
  ["-tracking-[0.64px]", "tracking-[-0.64px]"],
  ["-tracking-[0.54px]", "tracking-[-0.54px]"],
  ["-tracking-[0.48px]", "tracking-[-0.48px]"],
  ["-tracking-[0.36px]", "tracking-[-0.36px]"],
  ["-tracking-[0.28px]", "tracking-[-0.28px]"],
  ["decoration-[1px]", "decoration-1"],
  ["flex-shrink-0", "shrink-0"],
  ["py-[3px]", "py-0.75"],
];

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".sanity",
  "dist",
  "node_modules",
  "private",
]);

const checkedExtensions = new Set([
  ".css",
  ".cjs",
  ".js",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
]);

const args = process.argv.slice(2);
const shouldFix = args.includes("--fix");
const targets = args.filter((arg) => arg !== "--fix");
const root = process.cwd();
const scriptPath = fileURLToPath(import.meta.url);

const defaultTargets = [
  "app",
  "components",
  "hooks",
  "lib",
  "sanity",
  "scripts",
  "styles",
];

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(targetPath) {
  const absolutePath = path.resolve(root, targetPath);

  if (!(await pathExists(absolutePath))) {
    return [];
  }

  const stats = await fs.stat(absolutePath);

  if (stats.isFile()) {
    return checkedExtensions.has(path.extname(absolutePath))
      ? [absolutePath]
      : [];
  }

  if (!stats.isDirectory()) {
    return [];
  }

  const directoryName = path.basename(absolutePath);
  if (ignoredDirectories.has(directoryName)) {
    return [];
  }

  const entries = await fs.readdir(absolutePath, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => collectFiles(path.join(absolutePath, entry.name))),
  );

  return nestedFiles.flat();
}

function getLocation(source, index) {
  const beforeMatch = source.slice(0, index);
  const lines = beforeMatch.split("\n");

  return {
    line: lines.length,
    column: lines.at(-1).length + 1,
  };
}

function findIssues(source, filePath) {
  const issues = [];

  for (const [from, to] of replacements) {
    let index = source.indexOf(from);

    while (index !== -1) {
      issues.push({
        filePath,
        from,
        to,
        ...getLocation(source, index),
      });

      index = source.indexOf(from, index + from.length);
    }
  }

  return issues;
}

function applyFixes(source) {
  return replacements.reduce(
    (updatedSource, [from, to]) => updatedSource.split(from).join(to),
    source,
  );
}

const files = [
  ...new Set(
    (
      await Promise.all(
        (targets.length ? targets : defaultTargets).map(collectFiles),
      )
    ).flat(),
  ),
];

const allIssues = [];
let changedFileCount = 0;

for (const filePath of files) {
  if (filePath === scriptPath) {
    continue;
  }

  const source = await fs.readFile(filePath, "utf8");
  const issues = findIssues(source, filePath);

  if (issues.length === 0) {
    continue;
  }

  allIssues.push(...issues);

  if (shouldFix) {
    await fs.writeFile(filePath, applyFixes(source));
    changedFileCount += 1;
  }
}

if (allIssues.length === 0) {
  console.log("No non-canonical Tailwind classes found.");
  process.exit(0);
}

if (shouldFix) {
  console.log(
    `Fixed ${allIssues.length} non-canonical Tailwind class${
      allIssues.length === 1 ? "" : "es"
    } in ${changedFileCount} file${changedFileCount === 1 ? "" : "s"}.`,
  );
  process.exit(0);
}

console.error("Found non-canonical Tailwind classes:");

for (const issue of allIssues) {
  console.error(
    `${path.relative(root, issue.filePath)}:${issue.line}:${issue.column} ` +
      `${issue.from} -> ${issue.to}`,
  );
}

console.error("\nRun `bun run fix:tailwind-canonical` to apply fixes.");
process.exit(1);
