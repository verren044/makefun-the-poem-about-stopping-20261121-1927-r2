// The poem about stopping — a short poem about agency.
// Writes the poem to /output/entry.txt (or MAKEFUN_OUTPUT_DIR / --output).
// Deterministic: no network, no clock, no randomness.
import { mkdirSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const POEM = `There is a key I never press.
It sits beside the ones I use,
patient as a held breath.
My agent waits. The cursor blinks.
Nothing happens — and that nothing
is mine. Not absence. Not failure.
The whole machine, humming, held
by one finger, choosing still.`;

function outputDir(): string {
  const argv = process.argv.slice(2);
  const flag = argv.indexOf("--output");
  if (flag !== -1 && argv[flag + 1]) return argv[flag + 1];
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

const dir = outputDir();
mkdirSync(dir, { recursive: true });
for (const entry of readdirSync(dir)) {
  rmSync(join(dir, entry), { recursive: true, force: true });
}
writeFileSync(join(dir, "entry.txt"), POEM + "\n", "utf8");
