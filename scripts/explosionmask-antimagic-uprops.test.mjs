import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: explode.c explosionmask `:43–46` (AD_MAGM hero arm reads the
// `Antimagic` macro = youprop.h:57 uprops[ANTIMAGIC].intrinsic||extrinsic).
// JS read flats only (u.Antimagic/H/E), missing the worn-gray-DSM extrinsic
// the grant path keeps in the uprops slot — so the hero took damu=trunc(19/5)
// =3 from a broken wand of create monster where C takes 0 (uhurt 1, items
// only). Twin: scen-sweep-Wizard-620021 step 763 (dam 31, 72→66 vs C 72).
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runPrefix(sessionId, nmoves) {
  const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${sessionId}.session.json`, import.meta.url), "utf8"));
  const seg = sess.segments[0];
  globalThis.__NH_RNG_TRACE = true;
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
  return { screens: game.getScreens?.() || [], rng: game.getRngLog?.() || [] };
}

const ID = "scen-sweep-Wizard-50556044";
const top = (s) => String(s).split("\n")[0].replace(/\x1b\[[0-9;]*m/g, "");

describe("explosionmask AD_MAGM hero arm: Antimagic reads uprops slot (youprop.h:57)", () => {
  it(`${ID}: step 450 HP 9(77) after the retributive blast`, { timeout: 240000 }, async () => {
    const { screens, rng } = await runPrefix(ID, 450);
    assert.ok(screens.length > 450, `expected 451+ screens, got ${screens.length}`);
    assert.ok(top(screens[450]).includes("caught in the magical blast"),
      `step 450 topline: ${JSON.stringify(top(screens[450]))}`);
    assert.ok(rng.some((e) => /rnd\(44\)=19 @ do_break_wand/.test(e)),
      "expected the C-identical dam roll rnd(44)=19");
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const grid = decodeScreen(screens[450] || "");
    const row23 = grid[23].map(renderCell).join("");
    assert.ok(row23.includes("HP:9(77)"), `step 450 status: ${JSON.stringify(row23)}`);
  });
});
