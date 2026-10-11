import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: uhitm.c passive `:6037` — the floating-eye gaze arm reads
// `Free_action`, which is youprop.h:383 `u.uprops[FREE_ACTION].extrinsic`
// (conferred by setworn for a worn ring, worn.c:124-125). JS passive read
// only the `u.Free_action/H/E` flats, which no ring path sets, so a hero
// wearing a ring of free action was frozen ("You are frozen by ... gaze!")
// where C stiffens ("You momentarily stiffen under ... gaze!") and the
// nomul aborted the turn. In scen-worldtour-Monk-578305 (ring wished and
// put on at step 108) C shows the stiffen message at step 392 behind a
// --More-- at 391; JS froze at 391. This test pins C's 391/392 toplines.
const ID = "scen-worldtour-Monk-578305";
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

describe("passive floating-eye gaze with ring of free action (uhitm.c:6037)", () => {
    it(`${ID}: stiffen, not freeze, at steps 391-392`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 393, `screens ${screens.length} < 393`);
        assert.equal(
            rowText(screens, 391, 0),
            "You hit the floating eye!--More--",
        );
        assert.equal(
            rowText(screens, 392, 0),
            "You momentarily stiffen under the floating eye's gaze!",
        );
    });
});
