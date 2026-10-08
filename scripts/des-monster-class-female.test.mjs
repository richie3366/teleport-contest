import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: sp_lev.c create_monster `:2125` (`mtmp->female = m->female`) +
// lspo_monster `:3230` (`tmpmons.female = 0` default for 1-char class
// letters, no rn2(2)). des.monster("L", x, y) fixed-coord class placements
// run through create_monster, so C clobbers the makemon birth draw RNG-free.
// The loader-local placeClassAt clones called makemon directly and kept the
// birth value: on wizard3 (wizard3.lua:59) the (10,07) L drew arch-lich with
// rn2(2)=1, so JS printed "she's" at the step-71 death touch while C prints
// "he's". This test replays that segment and pins C's step-71 topline.
const ID = "scen-tour-Tourist-92134";
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

function rowText(screens, step, r) {
    const g = decodeScreen(screens[step] || "");
    return g[r].map(renderCell).join("").trimEnd();
}

describe("des.monster class-letter female clobber (sp_lev.c:2125)", () => {
    it(`${ID}: step-71 topline matches C (he's, not she's)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 72, `screens ${screens.length} < 72`);
        const top = rowText(screens, 71, 0);
        assert.ok(
            top.includes("he's using the touch of death!"),
            `step-71 topline lacks C's pronoun: ${JSON.stringify(top)}`,
        );
        assert.ok(
            !top.includes("she's using the touch of death!"),
            `step-71 topline still has the birth-draw pronoun: ${JSON.stringify(top)}`,
        );
    });
});
