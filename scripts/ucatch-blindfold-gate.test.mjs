import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: mthrowu.c u_catch_thrown_obj `:532–550` — the `:538–541` catch
// gates probe live prop macros (`Blind`, `Fumbling`), not sticky mirrors.
// JS read the sticky `u.Blind` (synced only in make_blinded): a worn
// blindfold's EBlinded never sets it, so 95345@962 drew a catch rn2(87)
// C skips — shifting bottlename's rn2(7) ("flagon" vs C "vial") and every
// later draw. `u.Fumbling` has no writers at all: same dead gate.
// Pins the machine-recorded C topline at step 963.
// Single prefix per file (multi-prefix runSegment leaks module state).
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
  const game = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return game.getScreens?.() || [];
}

describe("u_catch_thrown_obj probes live Blind/Fumbling (mthrowu.c:538-541)", () => {
  it("95345 step 963 matches C: vial (no catch roll while blindfolded)", { timeout: 180000 }, async () => {
    // C-side vacuity pin: the recording really says "vial" here.
    const rec = JSON.parse(readFileSync(
      new URL("../.cache/hidden/sessions/scen-sweep-Priest-95345.session.json", import.meta.url), "utf8"));
    const cTop963 = String(rec.segments[0].steps[963].screen).split("\n")[0];
    assert.ok(cTop963.includes("The vial crashes on your head"),
      `C step 963 topline: ${JSON.stringify(cTop963)}`);

    const screens = await runPrefix("scen-sweep-Priest-95345", 964);
    assert.ok(screens.length > 963, `expected 964+ screens, got ${screens.length}`);
    const row = (i, r) => String(screens[i]).split("\n")[r];
    // Premise: the hero wears the blindfold (status shows Blind in C and JS).
    assert.ok(row(962, 23).includes("Blind"),
      `step 962 status: ${JSON.stringify(row(962, 23))}`);
    // The catch roll is skipped, so bottlename draws C's word, not the shifted one.
    assert.ok(row(963, 0).includes("The vial crashes on your head and breaks into shards."),
      `step 963 topline: ${JSON.stringify(row(963, 0))}`);
  });
});
