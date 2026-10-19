import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: uhitm.c hmon_hitmon_do_hit `:1410–1411` — saved_oname =
// cxname(obj) runs before the misc_obj venom/pie arm, and objnam.c
// xname_flags `:628` observe_object()s the object (!Blind), adding a
// thrown splash of venom to disco[]. JS's early pie/venom block in
// hmon_hitmon skipped that snapshot, so `\` never listed «Venoms /
// splash of venom» after Grimtooth's #invoke (scen-sweep-Caveman-50050055
// s565, D-4093). Single prefix per file (multi-prefix runSegment leaks
// module state).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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

describe("hmon venom/pie arm observes the object (uhitm.c/objnam.c)", () => {
  it("50050055 step 565 discoveries list the splash of venom", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Caveman-50050055", 566);
    const rows = String(screens[565]).split("\n");
    assert.ok(rows.some((r) => r.includes("splash of venom")), JSON.stringify(rows.slice(13, 18)));
  });
});
