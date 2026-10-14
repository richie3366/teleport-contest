import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: invent.c getobj `:2049` — `disp.botl = TRUE` ("May have changed
// the amount of money") after every pick, before the verify. The #dip
// clone getobj_dip (potion.js) replicated the pick loop without it, so a
// run-stale status stayed stale: scen-descend-Samurai-50251007 step 10
// takes 2 travel turns (moves 2→4, time_botl suppressed under run), the
// display sits at T:3 through step 21, and C's dip-prompt pick at step 22
// repaints to T:4 while JS kept T:3.
const ID = "scen-descend-Samurai-50251007";
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

describe("getobj_dip pick sets botl (invent.c:2049)", () => {
    it(`${ID}: step-22 dip pick repaints run-stale T:3 to T:4`, { timeout: 180000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 22, `screens ${screens.length} <= 22`);
        assert.ok(
            rowText(screens, 22, 0).includes("don't have anything to dip"),
            `step-22 topline drifted: ${JSON.stringify(rowText(screens, 22, 0))}`,
        );
        assert.ok(
            rowText(screens, 22, 23).includes("T:4"),
            `step-22 status still stale: ${JSON.stringify(rowText(screens, 22, 23))}`,
        );
    });
});
