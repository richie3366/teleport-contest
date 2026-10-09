import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: artifact.c touch_artifact `:953` dmg = d((Antimagic ? 2 : 4), ...).
// C `Antimagic` (youprop.h:57 HAntimagic||EAntimagic ≡
// uprops[ANTIMAGIC]) is true for a cloak-of-MR wearer, so C draws
// `d(2,4)` for the blast. JS confer_oc_oprop writes worn cloak MR only
// to uprops[ANTIMAGIC].extrinsic (do_wear.js, D-1089 dual
// representation); artifact.js Antimagic_hero read the flats only and
// drew d(4,4). Pins the machine-recorded C expectation at
// scen-worldtour-Wizard-95213 step 129 (C d(2,4)=8 + blast message)
// via the committed recipe prefix (wizard wears the wished blessed +3
// cloak of magic resistance).
describe("touch_artifact blast Antimagic arm (artifact.c:953)", () => {
  it("cloak-wearing hero draws C's d(2,4)=8 + blast message", { timeout: 180000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-worldtour-Wizard-95213.recipe.json", import.meta.url), "utf8"));
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
        moves: seg.moves.slice(0, 130), storage,
      });
      const log = getRngLog();
      const idx = log.findIndex((l) => l.startsWith("d(") && l.includes("touch_artifact(artifact.js:"));
      assert.ok(idx >= 0, "expected touch_artifact blast draw in the log");
      assert.match(log[idx], /^d\(2,4\)=8 @ touch_artifact\(artifact\.js:/,
        `blast draw is C's d(2,4)=8 (got ${JSON.stringify(log[idx])})`);
      const screens = (game.getScreens?.() || []).join("\n");
      assert.ok(screens.includes("blasted by the war hammer named Mjollnir"),
        "C's blast message painted");
    } finally {
      globalThis.__NH_RNG_TRACE = false;
    }
  });
});
