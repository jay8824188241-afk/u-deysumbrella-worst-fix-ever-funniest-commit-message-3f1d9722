import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One original commit message (64 chars) for a bug fix that made things
// worse: the off-by-one error is now off by two, in the other direction.
const ENTRY =
  "fix: off-by-one error, now off by two but in the other direction";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Self-check: read the file back and verify the gate's rules.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("entry.txt does not match the expected line");
}
if (back.length < 1 || back.length > 100) {
  throw new Error(`entry length ${back.length} is outside 1..100`);
}
if (back.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (back.includes("\n")) {
  throw new Error("entry must be a single line");
}
console.log(`wrote /output/entry.txt (${back.length} chars): ${back}`);
