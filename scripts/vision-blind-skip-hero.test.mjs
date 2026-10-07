import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: vision.c vision_recalc `skip:` — every path (including the blind
// branch's goto-skip) ends with `newsym(u.ux, u.uy)` ("Make sure the hero
// shows up!", unless panicking). JS vision_recalc's blind branch returned
// early without it, so each blind recalc burned one fewer display-RNG
// (hallu hero-object repaint) than C. In scen-impaired-Healer-94190 the two
// docrts around the second #wizintrinsic drew 3+3 where C drew 4+4,
// shifting the object_detect mapping draws by 2: step 198 showed JS
// `+`/`%`/`)` where C shows `?`/`/`/`*` (all hallu-random classes).
// This test replays that segment and pins C's step-198 cells.
const ID = "scen-impaired-Healer-94190";
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

function cellAt(screens, step, r, c) {
    const g = decodeScreen(screens[step] || "");
    return renderCell(g[r][c]);
}

describe("vision_recalc blind skip-label hero newsym (vision.c skip:)", () => {
    it(`${ID}: step-198 detect glyphs match C (? / *)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 199, `screens ${screens.length} < 199`);
        assert.equal(cellAt(screens, 198, 2, 17), "?");
        assert.equal(cellAt(screens, 198, 3, 35), "/");
        assert.equal(cellAt(screens, 198, 5, 54), "*");
    });
});
