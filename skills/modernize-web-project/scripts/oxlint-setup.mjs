#!/usr/bin/env node
// Writes a temporary oxlint toolbox for one package: <toolDir>/package.json and <toolDir>/oxlintrc.json.
// Usage: node oxlint-setup.mjs <packageDir> <toolDir> [tailwindEntryCss]
// Plugins and settings follow the package's dependencies. Nothing is written inside the package.
import { existsSync, globSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

// jsPlugins is alpha in oxlint, so these stay pinned; bump them together when updating the skill.
const OXLINT = "1.94.0";
const TSGOLINT = "7.0.2007";
const BETTER_TAILWIND = "4.11.0";

const [projectArg, toolArg, tailwindArg] = process.argv.slice(2);
if (!projectArg || !toolArg) {
  console.error("Usage: node oxlint-setup.mjs <packageDir> <toolDir> [tailwindEntryCss]");
  process.exit(2);
}
if (!existsSync(toolArg) || !statSync(toolArg).isDirectory()) {
  console.error("toolDir must be an existing folder; create it with mktemp -d");
  process.exit(2);
}
const project = realpathSync(projectArg);
const toolDir = realpathSync(toolArg);
if (toolDir === project || toolDir.startsWith(project + sep)) {
  console.error("toolDir must be outside the package");
  process.exit(2);
}

const pkg = JSON.parse(readFileSync(join(project, "package.json"), "utf8"));
const deps = { ...pkg.peerDependencies, ...pkg.devDependencies, ...pkg.dependencies };
const has = (name) => name in deps;
// Only what is installed counts; a range in package.json says nothing about what the rules can load.
// Walks up like Node does, so packages hoisted to a workspace root are found from a child package.
const installedVersion = (name) => {
  for (let dir = project; ; dir = dirname(dir)) {
    const manifest = join(dir, "node_modules", name, "package.json");
    if (existsSync(manifest)) return JSON.parse(readFileSync(manifest, "utf8")).version;
    if (dirname(dir) === dir) return undefined;
  }
};
const major = (version) => Number.parseInt(version, 10);
const notes = [];

const workspaceRoot = Boolean(pkg.workspaces) ||
  (existsSync(join(project, "pnpm-workspace.yaml")) && /^packages:/m.test(readFileSync(join(project, "pnpm-workspace.yaml"), "utf8")));
// Child packages get their own pass with their own config; the root pass ignores them.
// shortcut: only the workspace root ignores descendants, so a package nested inside a child is linted twice
// (duplicate hits); ignore descendants on every pass if nested workspaces show up in real audits.
const childPackages = workspaceRoot
  ? globSync("**/package.json", { cwd: project, exclude: (p) => /(^|[\\/])(node_modules|dist|build|\.\w+)$/.test(p) })
      .map((file) => dirname(file))
      .filter((dir) => dir !== ".")
  : [];
if (workspaceRoot) notes.push(`Workspace root: lint the root with --ignore-pattern for each child package (see rootIgnorePatterns), then run this setup and oxlint once in each child folder with a fresh toolbox.`);

const typescript = has("typescript") || existsSync(join(project, "tsconfig.json"));
const react = has("react") || has("preact");
const ui = react || ["vue", "nuxt", "svelte", "@sveltejs/kit", "solid-js", "astro"].some(has);
const server = ["express", "fastify", "hono", "koa", "@hapi/hapi", "next", "nuxt", "@tanstack/react-start", "@sveltejs/kit", "astro", "@remix-run/node", "@react-router/node"].some(has);

const plugins = ["eslint", "unicorn", "oxc", "import", "promise"];
const why = { eslint: "always", unicorn: "always", oxc: "always", import: "always", promise: "always" };
const add = (name, reason) => { plugins.push(name); why[name] = reason; };
if (typescript) add("typescript", "TypeScript project");
if (!typescript) add("jsdoc", "JavaScript project, types live in JSDoc");
if (react) add("react", "react/preact");
if (react || has("solid-js")) add("jsx-a11y", "JSX UI");
if (has("next")) add("nextjs", "next");
if (has("vue") || has("nuxt")) add("vue", "vue/nuxt");
if (!ui || server || pkg.bin) add("node", "runs on Node");
if (has("vitest")) add("vitest", "vitest");
if (has("jest")) add("jest", "jest");

const settings = {};
const reactVersion = has("react") ? installedVersion("react") : undefined;
if (reactVersion) settings.react = { version: reactVersion };
const jestVersion = has("jest") ? installedVersion("jest") : undefined;
if (jestVersion) settings.jest = { version: major(jestVersion) };

// Tailwind v4: the canonical-class rule loads the package's own tailwindcss and needs the CSS entry as an absolute path.
const tailwindVersion = has("tailwindcss") ? installedVersion("tailwindcss") : undefined;
let tailwindEntry;
let tailwindCandidates = [];
if (has("tailwindcss") && !tailwindVersion) {
  notes.push("tailwindcss is declared but not installed in node_modules; the canonical-class check is skipped. Install dependencies in the audit copy and rerun.");
} else if (tailwindVersion && major(tailwindVersion) !== 4) {
  notes.push(`Tailwind ${tailwindVersion} is not v4; the canonical-class check is skipped.`);
} else if (tailwindVersion) {
  if (tailwindArg) {
    const entry = resolve(tailwindArg);
    if (existsSync(entry) && statSync(entry).isFile()) tailwindCandidates = [entry];
    else notes.push(`Tailwind entry ${entry} is not a readable file; the canonical-class check is skipped.`);
  } else {
    const importsTailwind = (file) =>
      /@import\s+(url\(\s*)?["']tailwindcss["']/.test(readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, ""));
    tailwindCandidates = globSync("**/*.css", { cwd: project, exclude: (p) => /(^|[\\/])(node_modules|dist|build|\.\w+)$/.test(p) })
      .map((file) => join(project, file))
      .filter(importsTailwind);
  }
  tailwindEntry = tailwindCandidates[0];
  if (!tailwindEntry && !tailwindArg) notes.push("No CSS file imports tailwindcss; pass the entry CSS as the third argument and rerun.");
  if (tailwindCandidates.length > 1) notes.push("Several CSS files import tailwindcss; the first is used. Pass the right one as the third argument if it is not.");
}
const jsPlugins = [];
if (tailwindEntry) {
  jsPlugins.push("eslint-plugin-better-tailwindcss");
  settings["better-tailwindcss"] = { entryPoint: tailwindEntry, rootFontSize: 16 };
}

const modernRules = {
  eslint: ["no-var", "prefer-const", "eqeqeq", "prefer-object-has-own", "prefer-object-spread", "prefer-rest-params", "prefer-spread", "prefer-exponentiation-operator", "logical-assignment-operators", "no-console"],
  unicorn: ["prefer-node-protocol", "prefer-string-replace-all", "prefer-at", "prefer-structured-clone", "prefer-array-flat", "prefer-array-flat-map", "prefer-array-find", "prefer-modern-dom-apis", "prefer-dom-node-append", "prefer-dom-node-remove", "prefer-query-selector", "prefer-global-this", "no-instanceof-array", "prefer-object-from-entries", "prefer-includes", "prefer-string-slice", "prefer-date-now", "no-new-buffer", "prefer-optional-catch-binding", "prefer-modern-math-apis", "prefer-number-properties", "prefer-response-static-json", "prefer-class-fields", "prefer-import-meta-properties"],
  typescript: ["consistent-type-imports", "no-namespace", "no-require-imports", "prefer-for-of"],
  react: ["rules-of-hooks"],
};
const rules = {};
for (const [plugin, names] of Object.entries(modernRules)) {
  if (plugins.includes(plugin)) for (const name of names) rules[`${plugin}/${name}`] = "warn";
}
if (tailwindEntry) rules["better-tailwindcss/enforce-canonical-classes"] = "warn";
// Noise for a modernization audit: CSS side-effect imports, framework-mandated _names, and the JSX scope rule
// that only React before 17 (classic runtime) needs.
Object.assign(rules, { "import/no-unassigned-import": "off", "eslint/no-underscore-dangle": "off" });
const automaticJsx = has("@vitejs/plugin-react") || has("next") ||
  (existsSync(join(project, "tsconfig.json")) && /"jsx"\s*:\s*"react-jsx/.test(readFileSync(join(project, "tsconfig.json"), "utf8")));
if (plugins.includes("react") && (automaticJsx || !(reactVersion && major(reactVersion) < 17))) rules["react/react-in-jsx-scope"] = "off";

// CommonJS is a finding only in files Node treats as ESM; .cjs and .cts stay CommonJS by design.
const esmFiles = pkg.type === "module" ? ["**/*.{js,jsx,mjs,ts,tsx,mts}"] : ["**/*.{mjs,mts}"];
const overrides = [{ files: esmFiles, rules: { "import/no-commonjs": "warn" } }];

const config = {
  plugins,
  ...(jsPlugins.length && { jsPlugins }),
  categories: { correctness: "warn", suspicious: "warn", perf: "warn" },
  ...(typescript && { options: { typeAware: true } }),
  settings,
  rules,
  overrides,
};
const toolDeps = { oxlint: OXLINT };
if (typescript) toolDeps["oxlint-tsgolint"] = TSGOLINT;
if (tailwindEntry) Object.assign(toolDeps, { "eslint-plugin-better-tailwindcss": BETTER_TAILWIND, tailwindcss: tailwindVersion });

writeFileSync(join(toolDir, "package.json"), JSON.stringify({ private: true, devDependencies: toolDeps }, null, 2) + "\n");
writeFileSync(join(toolDir, "oxlintrc.json"), JSON.stringify(config, null, 2) + "\n");
const rootIgnorePatterns = childPackages.map((dir) => `${relative(project, join(project, dir)).split(sep).join("/")}/**`);
console.log(JSON.stringify({ toolDir, plugins: why, typeAware: typescript, tailwindEntry: tailwindEntry ?? null, tailwindCandidates, rootIgnorePatterns, notes, devDependencies: toolDeps }, null, 2));
