import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: mcastu.c cursetxt `:75–76` — `else if (Displaced && (mtmp->mux
// != u.ux || mtmp->muy != u.uy))` reads the youprop.h Displaced macro
// (HDisplaced || EDisplaced over u.uprops[DISPLACED]). JS read the
// phantom u.Displaced/HDisplaced/EDisplaced flats, which a worn cloak of
// displacement never sets, so a caster aiming at the displaced image
// printed «points at you, then curses» (scen-shop-Ranger-50850021 s461,
// D-4074). Single prefix per file (multi-prefix runSegment leaks module
// state).
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

describe("cursetxt reads the live Displaced macro (mcastu.c)", () => {
  it("50850021 step 461 curses at the displaced image", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-shop-Ranger-50850021", 462);
    const top = String(screens[461]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(top.includes("points and curses at your displaced image"), JSON.stringify(top.slice(0, 80)));
  });
});
