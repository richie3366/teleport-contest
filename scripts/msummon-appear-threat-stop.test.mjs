import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `msummon` cliff writer: C makemon's in-body tail (makemon.c:1502–1504 —
// `if (go.occupation) dochugw(mtmp, FALSE)`, "stop fiddling while Rome
// burns") runs INSIDE makemon, so a summoned threat stops a searching
// hero BEFORE msummon's "appears" pline. JS defers that tail to the async
// makemon_appear_msg, which msummon/summon_minion never awaited: the
// search survived until the next hitmu tail stop, shifting "You stop
// searching." two messages late.
//
// scen-sweep-Caveman-95343 step 404 (T19): hero starts `20s`; a hezrou
// summons Juiblex then lands claw/claw/bite. C order is stop, summon,
// hit, hit-again, bite; JS printed summon, hit, stop, hit-again, bite.
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

async function replay(id) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves,
        storage: sharedStorage(),
    });
    return g.getScreens?.() || [];
}

function row0(screens, n) {
    return decodeScreen(screens[n])[0].map((c) => c.ch).join("").trimEnd();
}

describe("msummon makemon in-body threat stop before appears pline (95343)", () => {
    it("step 404: stop-searching precedes the summon line", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Caveman-95343");
        assert.ok(screens.length > 404, `only ${screens.length} screens`);
        // C recorded row: the in-body dochugw(FALSE) stop fires inside
        // makemon, ahead of msummon's "appears" pline.
        assert.equal(row0(screens, 404), "You stop searching.  Juiblex appears in a cloud of smoke!--More--");
    });

    it("step 405: More overflow shows the hezrou attack trio", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Caveman-95343");
        assert.ok(screens.length > 405, `only ${screens.length} screens`);
        assert.equal(row0(screens, 405), "The hezrou hits!  The hezrou hits again!  The hezrou bites!");
    });
});
