import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: getpos.c getpos `:1144–1148` (nxtc) + `:862–867` (loop top) —
// every pass that updates (cx,cy) ends at nxtc with
// curs(WIN_MAP,cx,cy)+flush BEFORE the next pass's loop-top
// auto_describe(cx,cy). When that describe misses (here: wizmap's
// browse_map runs terrainmode TER_DETECT|TER_MAP|TER_TRP|TER_OBJ with
// no TER_MON, so pager.c `:1328` skips the monster arm on the live
// 'o' at (72,6)), C prints nothing but keeps the nxtc cursor on the
// cycled cell. JS shifted nxtc's curs to the loop top and only curses
// inside auto_describe on a hit — on a miss the cursor stayed stale
// on the hero. Monk-578214 step 434 ('m' cycle hero→(72,6)):
// C [71,7], JS [71,6].
const ID = "scen-sweep-Monk-578214";
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

describe("getpos nxtc curs before loop-top auto_describe (getpos.c:1144-1148)", () => {
    it(`${ID}: post-'m' cursor on the cycled monster, not the hero`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        // Anchor: ^F wizmap, 'm' monster-cycle, '.' pick.
        assert.equal(seg.moves[431], "\x06", "moves[431] is ^F (wizmap)");
        assert.equal(seg.moves[432], "m", "moves[432] is 'm' (cycle)");
        assert.equal(seg.moves[433], ".", "moves[433] is '.' (pick)");
        assert.deepEqual(SESS.segments[0].steps[433].cursor, [71, 7, 1], "C post-'m' cursor");
        // Through the 'm' key; the run ends awaiting '.' inside getpos.
        const prefix = seg.moves.slice(0, 433);
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: prefix,
            storage: sharedStorage(),
        });
        const cursors = g.getCursors?.() || [];
        assert.ok(cursors.length >= 2, `only ${cursors.length} cursors captured`);
        assert.deepEqual(cursors[cursors.length - 2]?.slice(0, 2), [71, 6], "pre-'m' cursor on hero (control)");
        assert.deepEqual(cursors[cursors.length - 1]?.slice(0, 2), [71, 7], "post-'m' cursor on (72,6) 'o'");
    });
});
