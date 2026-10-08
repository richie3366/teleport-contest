import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: invent.c display_pickinv `:3140–3143` — n==0 (empty invent, no
// lets, no xtra) prints pline("%s.", not_carrying_anything), i.e. exactly
// "Not carrying anything.". C has no "appropriate" variant of this message
// (the string appears nowhere in upstream src/); the JS reply half printed
// the fabrication on the n==0 arm, the lets[0]-absent arm (`:3162–3170`
// is silent there), and the empty-menu arm (`:3378–3415` runs
// end_menu/select_menu with no pline). This test replays the probe segment
// and pins C's step-78 topline.
const ID = "scen-tutorial-Samurai-94239";
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

describe("display_pickinv empty-inventory message (invent.c:3140-3143)", () => {
    it(`${ID}: step-78 topline matches C (no "appropriate")`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 79, `screens ${screens.length} < 79`);
        const top = rowText(screens, 78, 0);
        assert.ok(
            top.includes("Not carrying anything."),
            `step-78 topline lacks C's message: ${JSON.stringify(top)}`,
        );
        assert.ok(
            !top.includes("appropriate"),
            `step-78 topline still has the fabricated variant: ${JSON.stringify(top)}`,
        );
    });
});
