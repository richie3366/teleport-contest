import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { rnd_otyp_by_namedesc } from "../js/readobjnam.js";
import {
    objectNames, objectNameStrs, objectDescrs, RING_CLASS, MAXOCLASSES,
} from "../js/objects.js";

// C ref: objnam.c rnd_otyp_by_namedesc `:3455–3529` + objclass.h:190-191 —
// OBJ_NAME/OBJ_DESCR read obj_descr[] via oc_name_idx/oc_descr_idx, and
// o_init.c shuffle() reassigns oc_descr_idx at game start. JS read the
// unshuffled slots (objectNameStrs[i]/objectDescrs[i]), so after a shuffle
// "shiny" matched the wrong ring: scen-sweep-Caveman-95348 step 408 C
// `rn2(40)@migrate_orc` (leader's ring was a short-circuit named ring) vs
// JS `rn2(9)@mksobj_init` (ring arm evaluating `!rn2(9)` for another ring).
// Single-match cases are rn2-independent (C `:3523–3526` returns
// valid[last] without consuming prob), so these pin the index headless.
const saved = {
    objects: game.objects, bases: game.bases,
    coreCtx: game.coreCtx, dispCtx: game.dispCtx,
};
afterEach(() => {
    game.objects = saved.objects; game.bases = saved.bases;
    game.coreCtx = saved.coreCtx; game.dispCtx = saved.dispCtx;
});
// (initRng runs in useTable: single-match picks ignore the value;
// rn2 still needs a live ctx, and afterEach restores the saved one)

const A = objectNames.indexOf("RIN_TELEPORTATION");
const B = objectNames.indexOf("RIN_TELEPORT_CONTROL");
const C = objectNames.indexOf("RIN_POLYMORPH");
const SHINY = objectDescrs.indexOf("shiny");
const PLAIN = objectDescrs.indexOf("wooden");

function useTable(descrOf) {
    initRng(1);
    assert.ok(A >= 0 && SHINY >= 0 && PLAIN >= 0);
    assert.ok(B === A + 1 && C === A + 2); // contiguous ring slice
    const bases = new Array(MAXOCLASSES + 2).fill(0);
    bases[RING_CLASS] = A;
    bases[RING_CLASS + 1] = C + 1;
    game.bases = bases;
    const objects = [];
    for (const t of [A, B, C]) {
        objects[t] = {
            oc_prob: 10, oc_name_idx: t, oc_descr_idx: descrOf(t),
            oc_uname: 0,
        };
    }
    game.objects = objects;
}

describe("rnd_otyp_by_namedesc shuffled descr_idx", () => {
    it("matches 'shiny' via oc_descr_idx, not the otyp slot", () => {
        useTable((t) => (t === A ? SHINY : PLAIN));
        assert.strictEqual(objectDescrs[A] === "shiny", false); // unshuffled differs
        assert.strictEqual(rnd_otyp_by_namedesc("shiny", RING_CLASS, 0), A);
    });
    it("reversed shuffle matches the other ring", () => {
        useTable((t) => (t === C ? SHINY : PLAIN));
        assert.strictEqual(rnd_otyp_by_namedesc("shiny", RING_CLASS, 0), C);
    });
    it("matches names via oc_name_idx", () => {
        useTable(() => PLAIN);
        game.objects[A].oc_name_idx = C; // A carries C's name slot
        game.objects[C].oc_name_idx = A;
        assert.strictEqual(objectNameStrs[C], "polymorph");
        assert.strictEqual(
            rnd_otyp_by_namedesc("polymorph", RING_CLASS, 0), A);
    });
});
