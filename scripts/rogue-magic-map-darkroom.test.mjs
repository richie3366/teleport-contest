import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: display.c magic_map_background `:233–258` + sym.h:96 DARKROOMSYM
// (S_stone on the Rogue level, S_darkroom elsewhere) + display.c:1850–1853
// reglyph_darkroom equate. Out-of-sight unlit ROOM floors map to DARKROOMSYM
// when dark_room+color: on the Rogue level that glyph is stone and paints
// blank, elsewhere it paints as room floor. JS stored the stone glyph id
// but kept terrain_glyph's floor paint, so a Rogue-level wizmap showed '.'
// where C shows ' ' (scen-tour-Archeologist-92023 step 85, dlvl 18 Rogue).
// This test replays that fork and pins C's step-85 row 2.
const ID = "scen-tour-Archeologist-92023";
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

describe("rogue-level magic mapping darkroom (sym.h:96 DARKROOMSYM)", () => {
    it(`${ID}: step-85 row 2 matches C (blank dark rooms, not floor)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const fork = seg.moves.slice(0, seg.moves.indexOf("\u0006") + 1);
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: fork,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 86, `screens ${screens.length} < 86`);
        const row2 = rowText(screens, 85, 2);
        assert.equal(
            row2,
            "            |    |               |      +#######",
            `step-85 row 2 is not C's blank dark room: ${JSON.stringify(row2)}`,
        );
    });
});
