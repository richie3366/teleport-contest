import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: vision.c vision_recalc `:531–534` — `gi.in_mklev ||
// program_state.in_getlev || !iflags.vision_inited` returns before the
// update loop; end.c really_done `:1151–1152` clears vision_inited at
// gameover ("render vision subsystem inoperative"). TEMP-C measured on
// scen-impaired-Rogue-94310 (vinit=0 at the disclose docrt, zero loop
// visits, zero newsyms): C never rewrites hero memory post-gameover, so
// the lit corridor cell (map (30,14), screen r15c29) replays from memory
// as S_litcorr (`#`/CLR_WHITE). JS's extracted loop
// (vision_off_newsym_gbuf, called by docrt's Hallu arm) bypassed that
// gate, newsymed the cell with swapped-dark viz, and the newsym
// !cansee arm (dark_room default on) rewrote memory S_litcorr→S_corr,
// so the disclose docrt replayed `#`/NO_COLOR. Pre-fix, step 260 row 15
// col 29 is `#`/8 (C `#`/15). This test pins the recorded C paint.
const ID = "scen-impaired-Rogue-94310";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));

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

describe("vision_off loop honors !vision_inited (vision.c:533 gate)", () => {
    it(`${ID}: disclose docrt keeps litcorr memory (step 260)`, { timeout: 300000 }, async () => {
        const storage = sharedStorage();
        const screens = [];
        for (const seg of SESS.segments) {
            const g = await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves: seg.moves,
                storage,
            });
            for (const s of (g.getScreens?.() || [])) screens.push(s || "");
        }
        assert.ok(screens.length > 260, `only ${screens.length} screens`);
        // Control: live paint at the attributes prompt already matches C.
        const live = decodeScreen(screens[256]);
        assert.equal(live[15][29].ch, "#");
        assert.equal(live[15][29].color, 15);
        // The disclose docrt replays memory without rewriting it.
        const grid = decodeScreen(screens[260]);
        assert.equal(grid[15][29].ch, "#", "row15 col29 corridor");
        assert.equal(grid[15][29].color, 15, "S_litcorr white, not S_corr gray");
    });
});
