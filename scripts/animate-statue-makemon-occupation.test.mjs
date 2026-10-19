import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: trap.c animate_statue `:786–788` makemon → makemon.c `:1502–1503`
// `if (go.occupation) (void) dochugw(mtmp, FALSE);` — the freshly made
// hostile stops a counted search before animate_statue's «You find %s
// posing as a statue.». JS's two animate_statue makemon calls never ran
// the deferred makemon_appear_msg tail, so the stop came later, from
// animate_statue's own stop_occupation (scen-worldtour-Wizard-610120 s88,
// D-4080). Single prefix per file (multi-prefix runSegment leaks module
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

describe("animate_statue runs makemon's occupation check (trap.c/makemon.c)", () => {
  it("610120 step 88 stops searching before finding the statue", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Wizard-610120", 89);
    const top = String(screens[88]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(/You stop searching\. +You find a jabberwock posing as a statue\./.test(top), JSON.stringify(top.slice(0, 80)));
  });
});
