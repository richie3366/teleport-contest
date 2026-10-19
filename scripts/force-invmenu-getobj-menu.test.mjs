import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// C ref: optlist.h:336–337 NHOPTB(force_invmenu … &iflags.force_invmenu)
// — invent.c getobj reads iflags, which JS's option tables stored under
// flags, so the toggle never reached getobj. With it on, getobj opens
// display_pickinv titled "What do you want to drop?", and tty_end_menu
// prepends blank then prompt (wintty.c:2685–2689, tty_add_menu
// prepends at :2621–2622): the prompt is row 0
// (scen-options-Archeologist-50457000 s133, D-4102). Single prefix per
// file (multi-prefix runSegment leaks module state).
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

describe("force_invmenu reaches getobj; menu prompt on row 0 (optlist.h/wintty.c)", () => {
  it("50457000 step 133 draws the drop menu title on row 0", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-options-Archeologist-50457000", 134);
    const row0 = String(screens[133]).split("\n")[0];
    assert.ok(row0.includes("What do you want to drop?"), JSON.stringify(row0));
    assert.ok(!row0.includes("[a-i or ?*]"), JSON.stringify(row0));
  });
});
