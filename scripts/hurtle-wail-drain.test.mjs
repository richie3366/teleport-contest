import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dothrow.c hurtle_step `:834–839` — collision losehp runs
// hack.c losehp `:4289–4291` maybe_wail INLINE (the You_hear low-HP wail
// may `--More--` wait, suspending the knockback chain before the stun
// roll and mdamageu). JS losehp is sync and defers the wail in
// `_needs_maybe_wail`; hurtle_step must drain it before wake_nearto
// (dig.js falling-rock shape), and run the fatal done-gate (C done(DIED)
// noreturns past wake_nearto). Without the drain, the wail never
// printed, no More-wait suspended the chain, and the attack damage
// landed one screen early (scen-sweep-Healer-50055087 step 577:
// HP:2 instead of C's HP:12, D-3949). Single runSegment per file
// (multi-prefix runSegment leaks module state).
async function runFull(recipeName) {
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
    moves: seg.moves, storage,
  });
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("hurtle_step drains the losehp wail inline (dothrow.c:836)", () => {
  it("Healer-50055087: s577 HP:12 pre-mdamageu, howling at s578", { timeout: 180000 }, async () => {
    const { screens, game } = await runFull("scen-sweep-Healer-50055087");
    assert.ok(screens.length > 578, `expected 579+ screens, got ${screens.length}`);
    // The knockback page itself is unchanged (C-recorded topline).
    const top577 = String(screens[577]).split("\n")[0];
    assert.equal(top577,
      "The earth elemental knocks you backward with a forceful blow!  Ouch!--More--",
      `step 577 topline: ${JSON.stringify(top577.slice(0, 100))}`);
    // Only the hurtle collision damage (rnd(3)=2) has landed; the
    // d(4,6)=10 attack damage waits past the wail More (C HP:12).
    const row577 = String(screens[577]).split("\n")[23];
    assert.ok(row577.includes("HP:12(140)"),
      `step 577 row23 (pre-mdamageu HP): ${JSON.stringify(row577)}`);
    // The deferred wail printed (C: "You hear the howling of the
    // CwnAnnwn...") and the attack damage landed at step 578.
    const top578 = String(screens[578]).split("\n")[0];
    assert.ok(top578.includes("howling of the CwnAnnwn"),
      `step 578 topline carries the wail: ${JSON.stringify(top578.slice(0, 100))}`);
    const row578 = String(screens[578]).split("\n")[23];
    assert.ok(row578.includes("HP:2(140)"),
      `step 578 row23 (post-mdamageu HP): ${JSON.stringify(row578)}`);
    // Mechanism: the deferred flag drained inline, wail throttled.
    assert.equal(game._needs_maybe_wail || false, false, "no wail left pending");
    assert.ok((game.wailmsg | 0) > 0, "maybe_wail ran (wailmsg stamped)");
  });
});
