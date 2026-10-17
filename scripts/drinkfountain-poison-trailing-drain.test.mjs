import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: fountain.c drinkfountain case 21 `:300–309` — the non-poison-
// resistant arm: pline, then poison_strdmg (losestr + TRAILING losehp).
// C losehp→done is noreturn-or-survive: wizard "Die?" decline returns
// to exercise/dryup. JS bailed on the trailing losehp's gameover marker
// without draining finish_losehp_done, so done()/Die? never ran and the
// run ended at the step (241 screens, 14380 RNG). Drain-first (losestr
// D-3782 shape) lets the wizard lifesave through: contaminated+More,
// You-die+More, Die?/n, OK-don't-die, then the turn completes.
// Pins the machine-recorded C expectation for the full session.
const ID = "scen-shop-Wizard-50057049";

function sharedStorage() {
  const mem = new Map();
  return {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
    get length() { return mem.size; },
    key: (i) => [...mem.keys()][i] ?? null,
  };
}

function row0(screens, i) {
  return String(screens[i]).replace(/\x1b\[[0-9;]*m/g, "").split("\n")[0];
}

describe("drinkfountain case-21 trailing losehp drains to done()/Die?", () => {
  it(`${ID}: wizard lifesaves the poisoning, session runs to the end`, { timeout: 180000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL(`../hidden-corpus/recipes/${ID}.recipe.json`, import.meta.url), "utf8"));
    const seg = raw.segments[0];
    const { runSegment } = await import("../js/jsmain.js");
    const game = await runSegment({
      seed: seg.seed, datetime: seg.datetime,
      nethackrc: seg.nethackrc, moves: seg.moves,
      storage: sharedStorage(),
    });
    const screens = game.getScreens?.() || [];
    assert.equal(row0(screens, 241), "The water is contaminated!--More--");
    assert.equal(row0(screens, 242), "You die...--More--");
    assert.ok(row0(screens, 243).startsWith("Die? [yn]"),
      `step 243 asks Die?, got ${JSON.stringify(row0(screens, 243))}`);
    assert.ok(row0(screens, 244).startsWith("OK, so you don't die."),
      `step 244 lifesaves, got ${JSON.stringify(row0(screens, 244))}`);
    assert.equal(screens.length, 579);
    assert.equal(game.getRngLog().length, 30841);
  });
});
