import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: display.c reset_glyphmap `:2941–2946` (S_engrcorr + sym shows '#'
// like S_corr/S_litcorr → MG_BW_ENGR) + wintty.c tty_print_glyph
// `:3930–3936` (MG_BW_ENGR && use_inverse → ATR_INVERSE). A corridor
// engraving shares the '#' ttychar with plain corridor, so C paints it
// inverse to stay distinguishable; a room engraving (backtick) has no
// such collision and paints plain. JS painted both plain.
// In scen-engrave-Archeologist-94198 the hero burns "Elbereth" onto the
// corridor square (9,7) then steps east; at step 95 C shows that '#'
// inverse bright-blue while the room backtick stays plain. RNG is in
// full lockstep (3049/3049) — pure paint, owner null.
const ID = "scen-engrave-Archeologist-94198";
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

function cellAt(screens, step, r, c) {
    return decodeScreen(screens[step] || "")[r][c];
}

describe("engrcorr BW inverse (display.c:2941-2946)", () => {
    it(`${ID}: step-95 corridor engraving (row 8 col 8) paints inverse`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 96, `screens ${screens.length} < 96`);
        const cell = cellAt(screens, 95, 8, 8);
        assert.equal(cell.ch, "#");
        assert.equal(cell.color, 12); // CLR_BRIGHT_BLUE, both sides
        assert.equal(cell.attr & 1, 1); // ATR_INVERSE bit, C `\E[7m`
    });

    it(`${ID}: step-95 room engraving backtick (row 8 col 4) stays plain`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        const cell = cellAt(screens, 95, 8, 4);
        assert.equal(cell.ch, "`");
        assert.equal(cell.color, 12);
        assert.equal(cell.attr & 1, 0); // no MG_BW flag for S_engroom
    });
});
