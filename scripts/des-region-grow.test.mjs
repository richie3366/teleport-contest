import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: sp_lev.c lspo_region `:5613–5631` — des.region(selection, "lit")
// grows the selection one cell (selection_do_grow W_ANY, `:5624–5625`)
// before sel_set_lit `:5539` (lava-or-rlit, numeric). Fifteen hand-ported
// level gens in js/mklev.js inlined the rect without the grow, so cells
// on the grown border stayed dark. On Mon-strt (region area(00,00,75,19)
// at xstart=3,ystart=1) game cell (2,6) is inside the grown rect but
// outside the ungrown one: C lights it at gen (lev->lit=1, IN_SIGHT),
// JS left it dark (COULD_SEE-only), hiding the earth elemental that
// arrives there at step 324 of scen-questtour-Monk-50557003 (S1 map-E:
// C `E` vs JS rock at screen row 7 col 1). Single prefix per file
// (multi-prefix runSegment leaks module state).
async function runPrefix(recipeName, nsteps) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
  const seg = raw.segments[0];
  const { runSegment } = await import("../js/jsmain.js");
  const NS = await import("../js/gstate.js");
  const m = new Map();
  const storage = {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
  };
  // nsteps counts session steps; slice moves to the key-length of the
  // first nsteps steps (rloc-to-mstate-floor precedent).
  const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${recipeName}.session.json`, import.meta.url), "utf8"));
  const keys = sess.segments[0].steps.map((s) => (s.key == null ? "" : s.key));
  const klen = keys.slice(0, nsteps).join("").length;
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, klen), storage,
  });
  return { screens: handle.getScreens?.() || [], game: NS.game };
}

// Expand cursor-forward codes to spaces and strip SGR so a map row
// compares as plain text.
function plainRow(s) {
  return String(s)
    .replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(Number(n)))
    .replace(/\x1b\[[0-9;]*m/g, "")
    .replace(/\x0e/g, "")
    .replace(/\x0f/g, "");
}

describe("des.region(selection, lit) grows one cell (sp_lev.c:5624-5626)", () => {
  it("50557003: (2,6) lit + E shown at step 324, (1,5) dark (grow boundary)", { timeout: 300000 }, async () => {
    const { screens, game } = await runPrefix("scen-questtour-Monk-50557003", 325);
    const lit26 = game.level.locations[2][6].lit;
    const lit15 = game.level.locations[1][5].lit;
    assert.ok(lit26, `grown-border (2,6) lit like C (got ${lit26})`);
    assert.ok(!lit15, `outside-grown (1,5) stays dark like C (got ${lit15})`);
    assert.ok(screens.length > 324, `expected 325+ screens, got ${screens.length}`);
    const rows = String(screens[324]).split("\n").map(plainRow);
    assert.equal(rows[7][1], "E",
      `step 324 row 7 col 1 shows E like C (got: ${JSON.stringify(rows[7]?.slice(0, 12))})`);
  });
});
