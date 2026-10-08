import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const { decodeScreen } = await import("../frozen/screen-decode.mjs");

// C ref: display.h random_obj_to_glyph `:933–936` — a hallucinated
// random-object roll of CORPSE burns random_monster for the mnum and
// yields mnum + GLYPH_BODY_OFF. display.c reset_glyphmap `:3004–3010`
// (BODY) renders that glyph with objects[CORPSE].oc_class (FOOD `%`)
// and mon_color(mnum) — NOT the monster letter.
// scen-impaired-Knight-94330 step 121: the hallucinated boulder at game
// (17,17) rolls CORPSE + mnum 56 (blue jelly), so C paints `%`/blue.
// JS painted the monster letter `j`.
const ID = "scen-impaired-Knight-94330";
const STEP = 121, ROW = 18, COL = 16;

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

describe("hallucinated corpse-body renders CORPSE oclass % (display.c:3004-3010)", () => {
    it(`${ID}: step ${STEP} body-of-jelly paints % like C`, { timeout: 300000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
        ));
        const seg = sess.segments[0];
        const recCell = (decodeScreen(seg.steps[STEP].screen || "")[ROW] || [])[COL] || {};
        assert.equal(recCell.ch, "%", "recorded C paints the hallucinated corpse-body as %");
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        const jsCell = (decodeScreen(screens[STEP] || "")[ROW] || [])[COL] || {};
        assert.equal(jsCell.ch, recCell.ch, "JS must paint the hallucinated corpse-body as % like C");
        assert.equal(jsCell.color, recCell.color, "body color stays the monster color (blue jelly)");
    });
});
