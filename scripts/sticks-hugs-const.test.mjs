import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: mondata.c sticks `:653–659` — AD_STCK, non-engulf AD_WRAP, or
// AT_HUGS (monattk.h: AT_HUGS=7, AT_ENGL=11, AD_STCK=19, AD_WRAP=28).
// js/monmove.js carried a wrong-const twin (hugs tested as 6, engl as 7),
// so a hug-form hero read as non-sticky: monflee's release_hero printed
// "You get released!" where C stays silent (scen-sweep-Archeologist-95310
// step 205: dog flees while the hug-form hero holds it). monmove now
// re-exports the C-exact engrave.js sticks (D-1849: import the export).
// Pins the predicate values plus the machine-recorded C topline.
// Single prefix per file (multi-prefix runSegment leaks module state).
import { sticks as monmoveSticks } from "../js/monmove.js";
import { sticks as engraveSticks } from "../js/engrave.js";

const form = (aatyp, adtyp) => ({ mattk: [{ aatyp, adtyp, damn: 1, damp: 4 }] });

describe("monmove sticks is the C-exact predicate (mondata.c:653-659)", () => {
  it("hug-form sticks (AT_HUGS=7, no wrap needed)", () => {
    assert.equal(monmoveSticks(form(7, 0)), true);
  });
  it("engulf-wrap does not stick (AT_ENGL=11 + AD_WRAP)", () => {
    assert.equal(monmoveSticks(form(11, 28)), false);
  });
  it("sting does not stick (AT_STNG=6)", () => {
    assert.equal(monmoveSticks(form(6, 0)), false);
  });
  it("mimic-stick sticks (AD_STCK=19)", () => {
    assert.equal(monmoveSticks(form(5, 19)), true);
  });
  it("monmove re-exports the canonical engrave sticks", () => {
    assert.equal(monmoveSticks, engraveSticks);
  });
  it("95310 step 205 matches C, no invented release", { timeout: 180000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-sweep-Archeologist-95310.recipe.json", import.meta.url), "utf8"));
    const sess = JSON.parse(readFileSync(
      new URL("../.cache/hidden/sessions/scen-sweep-Archeologist-95310.session.json", import.meta.url), "utf8"));
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
    assert.equal(row0(204), cRow0(204), "step 204 grab setup intact");
    assert.equal(row0(205), cRow0(205), "step 205 matches C");
    assert.ok(!row0(205).includes("released"), "no invented release message");
  });
});
