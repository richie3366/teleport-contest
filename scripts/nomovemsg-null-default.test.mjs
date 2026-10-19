import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// C ref: sounds.c domonnoise MS_BONES `:970–975` — "You freeze for a
// moment." then nomul(-2) with gn.nomovemsg = 0 (NULL), so hack.c unmul
// `:4181–4184` falls back to "You can move again.". JS stored the number
// 0, which unmul's `== null` default skips and `*nomovemsg` treats as
// empty, so the line never printed (scen-worldtour-Archeologist-610028
// s158, D-4101). Single prefix per file (multi-prefix runSegment leaks
// module state).
function recipePath(name) {
  for (const d of ["recipes", "recipes-reserve", "recipes-archive"]) {
    const u = new URL(`../hidden-corpus/${d}/${name}.recipe.json`, import.meta.url);
    if (existsSync(u)) return u;
  }
  throw new Error(`no recipe ${name}`);
}
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(recipePath(recipeName), "utf8"));
  const seg = raw.segments[0];
  const { runSegment } = await import("../js/jsmain.js");
  const m = new Map();
  const storage = {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
  };
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return handle.getScreens?.() || [];
}

describe("rattle freeze ends with unmul's default message (sounds.c/hack.c)", () => {
  it("610028 step 158 prints 'You can move again.'", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Archeologist-610028", 159);
    const row = String(screens[158]).split("\n")[0];
    assert.ok(row.includes("You can move again."), JSON.stringify(row));
  });
});
