import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `getpos.c` cliff writer (same class as D-2081 monster_detect, D-2242
// object_detect, D-3769 display_trap_map): C detect.c gold_detect prints
// You_feel("very greedy, and sense gold!") then calls browse_map with no
// more() between, so getpos.c:843-846's verbose pline appends
// "(For instructions ...)" on the same topline (topl.c NEED_MORE + room
// → two-space join). A flush between paints a spurious --More--.
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

describe("getpos cliff writer: gold-detect topline join", () => {
    it("scen-sweep-Valkyrie-610121 step 309: sense-gold topline joins getpos hint, no --More--", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Valkyrie-610121");
        assert.ok(screens.length > 309, `only ${screens.length} screens`);
        const row0 = decodeScreen(screens[309])[0].map((c) => c.ch).join("").trimEnd();
        // C rendered row (hidden-proxy rowDiff): two-space join, no More.
        assert.equal(row0, "You feel very greedy, and sense gold!  (For instructions type a '?')");
    });
});
