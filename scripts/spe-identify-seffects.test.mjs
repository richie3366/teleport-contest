import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: read.c seffects `:2256–2259` — SCR_IDENTIFY and SPE_IDENTIFY share
// one arm (seffect_identify(&sobj)); spell.c `:1516–1531` routes the cast
// through (void) seffects(pseudo) with skilled-bless. JS spell.js routes
// SPE_IDENTIFY to seffects (live) but the seffects switch lacked the
// SPE_IDENTIFY label, so the cast hit default: «That scroll is not
// implemented yet.» while C drew the cval rn2(5) and prompted «What would
// you like to identify first?» (scen-worldtour-Tourist-50358021 step 338,
// scen-zapfest-Priest-50161019 step 219). Single prefix per file
// (multi-prefix runSegment leaks module state).
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
  return { screens: handle.getScreens?.() || [] };
}

describe("SPE_IDENTIFY cast reaches seffect_identify via seffects (read.c:2256-2259)", () => {
  it("50358021 step 338 prompts identify, not the unimplemented stub", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-worldtour-Tourist-50358021", 338);
    assert.ok(screens.length > 338, `expected 339+ screens, got ${screens.length}`);
    const top338 = String(screens[338]).split("\n")[0];
    assert.ok(!top338.includes("not implemented yet"),
      `step 338 stubbed: ${JSON.stringify(top338.slice(0, 100))}`);
    assert.ok(top338.includes("What would you like to identify first?"),
      `step 338 topline: ${JSON.stringify(top338.slice(0, 100))}`);
  });
});
