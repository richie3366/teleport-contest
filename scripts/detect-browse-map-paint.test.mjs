import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// Two `getpos.c` cliff writers (same owner, one C file — detect.c):
//
// 1. display_trap_map: C detect.c:998 prints You_feel("very greedy" /
//    "entrapped") then calls browse_map (:1000) with no more() between,
//    so getpos.c:843-846's verbose pline appends "(For instructions ...)"
//    on the same topline (topl.c NEED_MORE + room → two-space join).
//    A flush between paints a spurious --More-- (same class as D-2081
//    monster_detect / D-2242 object_detect).
//
// 2. reveal_terrain_getglyph: C classifies the DISPLAYED glyph
//    (detect.c:2225 `!keep_objs && glyph_is_object(glyph)` → strip to
//    back_to_glyph). A remembered food glyph with no live object must
//    strip to terrain in object-excluded views ('b' = terrain+traps),
//    not leak through as `%`.
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

describe("getpos cliff writers: trap-map topline join + reveal obj strip", () => {
    it("scen-sweep-Knight-95311 step 440: greedy topline joins getpos hint, no --More--", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Knight-95311");
        assert.ok(screens.length > 440, `only ${screens.length} screens`);
        const row0 = decodeScreen(screens[440])[0].map((c) => c.ch).join("").trimEnd();
        // C rendered row (hidden-proxy rowDiff): two-space join, no More.
        assert.equal(row0, "You feel very greedy.  (For instructions type a '?')");
    });

    it("scen-trek-Wizard-95506 step 691: terrain view strips remembered food to corridor", { timeout: 300000 }, async () => {
        const screens = await replay("scen-trek-Wizard-95506");
        assert.ok(screens.length > 691, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[691]);
        // C row 5: `##` ... `#`; JS painted `#%` ... `%` (stale food memory
        // leaking through the object-excluded 'b' view unstripped).
        assert.equal(grid[5][23].ch, "#", "row5 col23 corridor (control)");
        assert.equal(grid[5][24].ch, "#", "row5 col24 corridor, not remembered %");
        assert.equal(grid[5][33].ch, "#", "row5 col33 corridor, not remembered %");
    });
});
