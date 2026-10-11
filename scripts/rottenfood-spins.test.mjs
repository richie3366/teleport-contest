import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: eat.c rottenfood `:1834–1841` — spin-faint what/where triple:
// sighted "goes dark", Blind+airborne "you lose control of yourself",
// Blind+grounded "you slap against the <saddle|surface>".
// js/eat.js hardcoded the sighted arm, so a Blind grounded hero printed
// "goes dark" where C prints the slap arm (scen-sweep-Archeologist-95349
// step 1297). Also wires foodword(obj) into the Blecch pline (C `:1815–1816`,
// D-3293 deferral lifted) and disp.botl (C `:1843`).
// Single prefix per file (multi-prefix runSegment leaks module state).

describe("rottenfood spin-faint triple (eat.c:1834-1841)", () => {
  it("95349 step 1297 matches C slap arm", { timeout: 240000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-sweep-Archeologist-95349.recipe.json", import.meta.url), "utf8"));
    const sess = JSON.parse(readFileSync(
      new URL("../.cache/hidden/sessions/scen-sweep-Archeologist-95349.session.json", import.meta.url), "utf8"));
    const { runSegment } = await import("../js/jsmain.js");
    const m = new Map();
    const storage = {
      getItem: (k) => (m.has(k) ? m.get(k) : null),
      setItem: (k, v) => m.set(k, String(v)),
      removeItem: (k) => m.delete(k),
      get length() { return m.size; },
      key: (i) => [...m.keys()][i] ?? null,
    };
    const seg = raw.segments[0];
    const game = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: seg.moves, storage,
    });
    const screens = game.getScreens?.() || [];
    const row0 = (i) => String(screens[i]).split("\n")[0];
    const cRow0 = (i) => String(sess.segments[0].steps[i].screen).split("\n")[0];
    assert.equal(row0(1296), cRow0(1296), "step 1296 setup intact");
    assert.equal(row0(1297), cRow0(1297), "step 1297 matches C");
    assert.ok(row0(1297).includes("slap against the floor"), "slap arm, not goes-dark");
  });
});
