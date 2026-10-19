import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: hack.c losehp `:4280–4291` — `else if (n > 0 && u.uhp * 10 <
// u.uhpmax) maybe_wail();` runs inline, so the wail joins the damage
// message on the same topline. JS losehp was sync and deferred the wail
// to callers that had to drain it; pickup.c do_loot_cont's bag-of-tricks
// bite (`:2152–2157`) never drained, dropping «Elf is about to die.»
// (scen-sweep-Priest-50456019 step 500, D-4058). Single prefix per file
// (multi-prefix runSegment leaks module state).
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

describe("losehp runs maybe_wail inline (hack.c:4289-4291)", () => {
  it("50456019 step 500 bag-of-tricks bite carries the elven wail", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Priest-50456019", 501);
    assert.ok(screens.length > 500, `expected 501+ screens, got ${screens.length}`);
    const top = String(screens[500]).split("\n")[0];
    assert.equal(top, "It develops a huge set of teeth and bites you!  Elf is about to die.",
      `step 500 topline: ${JSON.stringify(top.slice(0, 90))}`);
  });
});
