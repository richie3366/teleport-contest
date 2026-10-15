import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BLINDED } from "../js/const.js";

// C ref: do_wear.c Blindf_off `:1495–1534` + youprop.h:103 Blind
// ((HBlinded||EBlinded)&&!BBlinded). Removing a blindfold clears EBlinded
// via setworn; C then reads live props ("can see again") and runs
// toggle_blindness (vision recalc → IN_SIGHT). JS do_wear Blind() read the
// sticky u.Blind mirror first (synced only in make_blinded), so it stayed
// true: "still cannot see", no toggle, stale viz — and makemon's cansee
// gate accepted a candidate C rejects (Samurai-50156038@186: C rn2(77)
// @ makemon_rnd_goodpos:1087 vs JS rn2(3) @ rndmonst_adj). D-3995 ports
// the D-0716 live-props shape and re-syncs u.Blind at the end of
// Blindf_off. Single prefix per file (multi-prefix runSegment leaks
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
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("Blindf_off sees again after blindfold removal (youprop.h:103, no sticky u.Blind)", () => {
  it("50156038 step 186 prints see-again; mirror re-synced, props clear", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Samurai-50156038", 187);
    assert.ok(screens.length > 186, `expected 187+ screens, got ${screens.length}`);
    const top186 = String(screens[186]).split("\n")[0];
    assert.equal(top186, "You were wearing an uncursed blindfold.  You can see again.",
      `step 186 topline: ${JSON.stringify(top186)}`);
    // Mechanism: eyewear slot cleared, live props clear, sticky mirror re-synced.
    assert.equal(game.u.ublindf, null, "ublindf slot cleared by setworn");
    assert.equal(game.u.HBlinded | 0, 0, "no intrinsic blindness");
    assert.equal(game.u.EBlinded | 0, 0, "blindfold extrinsic cleared");
    assert.equal(game.u.uprops?.[BLINDED]?.extrinsic | 0, 0, "uprops[BLINDED] extrinsic cleared");
    assert.equal(game.u.Blind, false, "sticky u.Blind re-synced by Blindf_off");
  });
});
