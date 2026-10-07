import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: trap.c trapeffect_anti_magic `:2347–2371` Antimagic implosion arm.
// C `Antimagic` (youprop.h:57 HAntimagic||EAntimagic ≡
// uprops[ANTIMAGIC]) is true for a cloak-of-MR wearer, so C draws
// `rnd(4)` first and prints "sluggish". JS confer_oc_oprop writes worn
// cloak MR only to uprops[ANTIMAGIC].extrinsic (do_wear.js, D-1089
// dual representation); trap.js Antimagic_prop read the flats only and
// skipped the arm, drawing d(2,6) first. Pins the machine-recorded C
// expectation at scen-trap-Wizard-94001 step 178 (C rnd(4)=1 +
// "sluggish") via the committed recipe prefix (moves 178 = first drain
// message, wizard still wears CLOAK_OF_MAGIC_RESISTANCE).
describe("trapeffect_anti_magic Antimagic arm (trap.c:2347-2371)", () => {
  it("cloak-wearing hero draws C's rnd(4) first + sluggish", { timeout: 180000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-trap-Wizard-94001.recipe.json", import.meta.url), "utf8"));
    const seg = raw.segments[0];
    const { runSegment } = await import("../js/jsmain.js");
    const { enableRngLog, getRngLog } = await import("../js/rng.js");
    globalThis.__NH_RNG_TRACE = true;
    enableRngLog();
    try {
      const m = new Map();
      const storage = {
        getItem: (k) => (m.has(k) ? m.get(k) : null),
        setItem: (k, v) => m.set(k, String(v)),
        removeItem: (k) => m.delete(k),
        get length() { return m.size; },
        key: (i) => [...m.keys()][i] ?? null,
      };
      const game = await runSegment({
        seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
        moves: seg.moves.slice(0, 178), storage,
      });
      const log = getRngLog();
      const idx = log.findIndex((l) => l.includes("trapeffect_anti_magic"));
      assert.ok(idx >= 0, "expected trapeffect_anti_magic draws in the log");
      assert.match(log[idx], /^rnd\(4\)=1 @ trapeffect_anti_magic\(/,
        `first trap draw is C's rnd(4)=1 (got ${JSON.stringify(log[idx])})`);
      const screens = (game.getScreens?.() || []).join("\n");
      assert.ok(screens.includes("sluggish"), "C's sluggish message painted");
    } finally {
      globalThis.__NH_RNG_TRACE = false;
    }
  });
});
