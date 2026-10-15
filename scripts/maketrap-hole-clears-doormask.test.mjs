import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");
const { DOOR, D_NODOOR, HOLE } = await import("../js/const.js");

// `trap.c` maketrap HOLE/TRAPDOOR/PIT/SPIKED_PIT arm (`:529–564`): C ends
// with `lev->flags = 0`, and rm.h aliases doormask/altarmask/wall_info/
// drawbridgemask/looted/icedpool/ladder/emptygrave ALL onto flags — one
// union clear. JS split the mirrors, so `lev.flags = 0` alone left
// doormask stale. Proved by scen-shop-Valkyrie-50455535 (minetn-6):
// ensure_way_out dug a HOLE on the (49,7) D_CLOSED des door; C cleared
// it to D_NODOOR (lock.c:1165 documents this), JS kept doormask=4, so
// the fi14 gnome's mfndpos counted 4 candidates where C counted 5 and
// the distfleeck@110 RNG forked by one draw (D-3975 measured).
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

const ID = "scen-shop-Valkyrie-50455535";

function loadSeg() {
    return JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
    )).segments[0];
}

describe("maketrap HOLE clears the door union (distfleeck@110 writer)", () => {
    it("minetn-6 (49,7): HOLE trap on the D_CLOSED des door leaves D_NODOOR", { timeout: 300000 }, async () => {
        const seg = loadSeg();
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 96),
            storage: sharedStorage(),
        });
        const loc = game.level.at(49, 7);
        assert.equal(loc.typ, DOOR);
        assert.equal(loc.flags, D_NODOOR);
        assert.equal(loc.doormask, D_NODOOR);
        const trap = (game.level.traps || []).find((t) => t.tx === 49 && t.ty === 7);
        assert.ok(trap, "HOLE trap at (49,7)");
        assert.equal(trap.ttyp, HOLE);
    });

    it("step-110 RNG slice matches C (fi14 cnt=5, no one-draw offset)", { timeout: 300000 }, async () => {
        const seg = loadSeg();
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 111),
            storage: sharedStorage(),
        });
        const jsSlices = g.getRngSlices();
        assert.ok(jsSlices.length > 110, `only ${jsSlices.length} slices`);
        const norm = (e) => String(e).replace(/ @ .*$/, "");
        assert.deepEqual(jsSlices[110].map(norm), seg.steps[110].rng.map(norm));
    });
});
