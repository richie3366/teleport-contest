import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: do.c doaltarobj `:380–382` — `There("is %s flash as %s %s the
// altar.", an(hcolor(obj->blessed ? NH_AMBER : NH_BLACK)), ...)`; do_name.c
// hcolor `:1461–1466` draws `rn2_on_display_rng(SIZE(hcolors)=74)` under
// Hallucination. js/do.js:496 kept a local no-draw `hcolor` clone ("Hallu
// synonym deferred", D-3640 class) that returned the pref always, so a
// hallucinating hero saw «black» where C recorded «bistre». This test
// replays the Valkyrie segment and pins C's recorded step-984 topline.
const ID = "scen-sweep-Valkyrie-50156016";
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

describe("doaltarobj hcolor display draw (do.c:381)", () => {
    it(`${ID}: step-984 altar flash matches C (bistre)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 985, `screens ${screens.length} < 985`);
        // C recorded row 0 @984: «There is a bistre flash as a poisoned
        // orcish arrow hits the altar.--More--» (prefix pinned; More
        // rendering is the shared formatter's, stable pre/post fix).
        assert.ok(
            rowText(screens, 984, 0).startsWith(
                "There is a bistre flash as a poisoned orcish arrow hits the altar.",
            ),
            `got: ${JSON.stringify(rowText(screens, 984, 0).slice(0, 90))}`,
        );
    });
});
