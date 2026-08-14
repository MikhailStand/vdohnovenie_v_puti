import { readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDirectory = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages-export", Date.now().toString());

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Не удалось создать index.html: ${response.status}`);
}

const githubPagesBasePath =
  process.env.GITHUB_PAGES === "true" ? "/vdohnovenie_v_puti" : "";

const withBasePath = (text) => {
  if (!githubPagesBasePath) return text;

  return text
    .replaceAll('"/_next/', `"${githubPagesBasePath}/_next/`)
    .replaceAll("'/_next/", `'${githubPagesBasePath}/_next/`)
    .replaceAll("`/_next/", `\`${githubPagesBasePath}/_next/`)
    .replaceAll(
      'href="/favicon.svg"',
      `href="${githubPagesBasePath}/favicon.svg"`,
    )
    .replaceAll(
      'content="/og-v21.png"',
      `content="${githubPagesBasePath}/og-v21.png"`,
    );
};

await writeFile(
  new URL("index.html", outputDirectory),
  withBasePath(await response.text()),
  "utf8",
);

async function patchClientAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await patchClientAssets(path);
      continue;
    }
    if (![".js", ".json", ".html"].includes(extname(entry.name))) continue;
    const original = await readFile(path, "utf8");
    const patched = withBasePath(original);
    if (patched !== original) await writeFile(path, patched, "utf8");
  }
}

await patchClientAssets(fileURLToPath(new URL("_next/", outputDirectory)));
await writeFile(new URL(".nojekyll", outputDirectory), "", "utf8");
