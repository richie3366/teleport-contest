import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// C ref: display.c reset_glyphmap `:2796–2797` / `:3004–3005` — body
// glyphs (corpses) map to objects[CORPSE].oc_class + SYM_OFF_O, the food
// '%'; only statues use the monster letter. pager.c do_screen_description
// compares that sym against the object classes, so autodescribe names
// the corpse. JS gave bodies the monster letter, the object arm never
// matched, and getpos kept the instructions line (#terrain, '@' onto a
// monk corpse: scen-sweep-Barbarian-50456033 s218, D-4098). Single prefix
// per file (multi-prefix runSegment leaks module state).
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

describe("autodescribe names a corpse via the food symbol (display.c/pager.c)", () => {
  it("50456033 step 218 describes 'a monk corpse'", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Barbarian-50456033", 219);
    const row = String(screens[218]).split("\n")[0];
    assert.ok(row.includes("a monk corpse"), JSON.stringify(row));
  });
});
