import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: wintty.c tty_end_menu `:2728–2733` — "cut off any lines that are
// too long": len = strlen(str)+2; if (len > cols) str[cols-2] = 0.
// The death-disclosure #overview cemetery epitaph for a doppelganger
// imitating Yeenoghu is 81 chars, so C stores and paints 78 (' ' +
// 78 chars at cols 0..78, 79-char row ending "...Yeenog"); JS painted
// the uncut item through paint_overlay's `< cols` bound (80-char row
// ending "...Yeenogh"). This test replays that segment and pins C's
// step-103 row 3.
const ID = "scen-wish-Priest-92179";
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

describe("tty_end_menu long-line cutoff (wintty.c:2728-2733)", () => {
    it(`${ID}: step-103 row 3 matches C (79 cols, ends Yeenog)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 104, `screens ${screens.length} < 104`);
        assert.equal(
            rowText(screens, 103, 3),
            "          you, killed by a hallucinogen-distorted doppelganger imitating Yeenog",
        );
    });
});
