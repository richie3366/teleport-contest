import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const display = await import("../js/display.js");
const {
    GLYPH_INVISIBLE, GLYPH_MON_MALE_OFF, GLYPH_MON_FEM_OFF,
    GLYPH_PET_MALE_OFF, GLYPH_DETECT_FEM_OFF, GLYPH_RIDDEN_MALE_OFF,
    glyph_is_monster,
} = display;
const { PM_LONG_WORM_TAIL, NUMMONS } = await import("../js/generated/monsters_data.js");

// C ref: detect.c do_vicinity_map 2nd loop (:1567-1573) — the wormtail
// exclusion reads the DISPLAYED glyph's mon (glyph_to_mon(glyph_at)),
// not m_at's mnum. Under hallucination map_monst paints
// what_mon(random), so a hallucinated long-worm-tail paint skips the
// I-replace while m_at still finds the real monster. JS checked
// mtmp.mnum, so it painted MEM-'I' where C kept floor
// (scen-sweep-Samurai-49956004 s830 cell (64,13): C mem 3993 floor
// vs JS 1532 'I', TEMP-C measured D-4064).
const ID = "scen-sweep-Samurai-49956004";
const STEP = 830;
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

describe("vicinity 2nd loop reads the displayed glyph's mon (detect.c:1567-1573)", () => {
    it("glyph_to_mon peels every monster bank (display.h:776)", () => {
        assert.equal(typeof display.glyph_to_mon, "function");
        const g2m = display.glyph_to_mon;
        assert.equal(g2m(GLYPH_MON_MALE_OFF + PM_LONG_WORM_TAIL), PM_LONG_WORM_TAIL);
        assert.equal(g2m(GLYPH_MON_FEM_OFF + 12), 12);
        assert.equal(g2m(GLYPH_PET_MALE_OFF + 7), 7);
        assert.equal(g2m(GLYPH_DETECT_FEM_OFF + 3), 3);
        assert.equal(g2m(GLYPH_RIDDEN_MALE_OFF + 9), 9);
        // C else-arm: non-monster glyphs (and missing ids) are NUMMONS.
        assert.equal(g2m(GLYPH_INVISIBLE), NUMMONS);
        assert.equal(g2m(undefined), NUMMONS);
        assert.ok(glyph_is_monster(GLYPH_MON_MALE_OFF + PM_LONG_WORM_TAIL));
    });

    it(`${ID}: prefix replay to step ${STEP} keeps C's floor memory`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const moves = seg.steps.slice(1, STEP + 1).map((s) => s.key || "").join("");
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves,
            storage: sharedStorage(),
        });
        // Import after the run: start() rebinds the singleton (D-4014 pattern).
        const { game } = await import("../js/gstate.js");
        const mem = game.level.at(64, 13)?.remembered_glyph?.glyph;
        const ctl = game.level.at(64, 12)?.remembered_glyph?.glyph;
        console.log(`mem(64,13)=${mem} mem(64,12)=${ctl} (C: 3993 floor / 1532 I, D-4064)`);
        // Control first: the neighbouring I-memory both sides agree on.
        assert.equal(ctl, 1532);
        // The cliff cell: C keeps floor (TEMP-C dumped D-4064).
        assert.notEqual(mem, GLYPH_INVISIBLE);
        assert.equal(mem, 3993);
    });
});
