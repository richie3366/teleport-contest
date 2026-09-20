import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { COLNO, ROWNO, SEL_GRADIENT_RADIAL, SEL_GRADIENT_SQUARE } from "../js/const.js";
import { selection_new, selection_getpoint, selection_do_gradient } from "../js/mklev.js";
import { initRng } from "../js/rng.js";

// C ref: selvar.c selection_do_gradient `:569-622` + staticfn
// line_dist_coord `:541-566` — radial/square probability gradient over the
// whole map. mind==maxd makes every cell deterministic (dofs clamps to 1
// per C `:586-587`, and C short-circuit `:599-600` never reaches rn2),
// so these pins hold regardless of RNG state. Display/corpus behavior is
// covered by `verify --fn selection_do_gradient`, not here.
function fullScan(sel) {
    const pts = [];
    for (let x = 0; x < COLNO; x++)
        for (let y = 0; y < ROWNO; y++)
            if (selection_getpoint(x, y, sel)) pts.push([x, y]);
    return pts;
}

afterEach(() => {
    if (game.program_state) game.program_state.in_impossible = 0;
});

describe("selection_do_gradient radial (point center, mind==maxd)", () => {
    it("sets exactly the cells within mind of the center", () => {
        const cx = 40, cy = 10, m = 3;
        const sel = selection_new();
        selection_do_gradient(sel, cx, cy, cx, cy, SEL_GRADIENT_RADIAL, m, m);
        for (const [x, y] of fullScan(sel)) {
            const d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
            assert.ok(d <= m * m, `(${x},${y}) d=${d} set but beyond mind`);
        }
        // Every within-mind cell must be set (no RNG arm reachable).
        for (let x = 0; x < COLNO; x++)
            for (let y = 0; y < ROWNO; y++) {
                const d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
                assert.equal(selection_getpoint(x, y, sel), d <= m * m ? 1 : 0,
                    `(${x},${y}) d=${d}`);
            }
    });

    it("pins line_dist_coord segment projection (mind==maxd==0)", () => {
        const sel = selection_new();
        selection_do_gradient(sel, 10, 10, 20, 10, SEL_GRADIENT_RADIAL, 0, 0);
        for (let x = 10; x <= 20; x++)
            assert.equal(selection_getpoint(x, 10, sel), 1, `on-segment (${x},10)`);
        assert.equal(selection_getpoint(15, 11, sel), 0, "off-segment (15,11)");
        assert.equal(selection_getpoint(9, 10, sel), 0, "past endpoint (9,10)");
    });

    it("pins lu clamping past the segment end", () => {
        const sel = selection_new();
        // (20,10) projects past (12,10): d0 = 64; mind==maxd==8 keeps it.
        selection_do_gradient(sel, 10, 10, 12, 10, SEL_GRADIENT_RADIAL, 8, 8);
        assert.equal(selection_getpoint(20, 10, sel), 1, "clamped (20,10) d=64<=64");
        assert.equal(selection_getpoint(20, 11, sel), 0, "(20,11) d=65>64");
    });
});

describe("selection_do_gradient square (point center, mind==maxd)", () => {
    it("sets center, axis-adjacent, and diagonal cells per C :613", () => {
        const cx = 40, cy = 10;
        const sel = selection_new();
        selection_do_gradient(sel, cx, cy, cx, cy, SEL_GRADIENT_SQUARE, 2, 2);
        assert.equal(selection_getpoint(cx, cy, sel), 1, "center");
        assert.equal(selection_getpoint(cx + 2, cy, sel), 1, "(42,10) d0=4<=4");
        assert.equal(selection_getpoint(cx + 3, cy, sel), 0, "(43,10) d0=9>4");
        assert.equal(selection_getpoint(cx + 2, cy + 2, sel), 1, "(42,12) d0=4<=4");
        assert.equal(selection_getpoint(0, 0, sel), 0, "far corner");
    });
});

describe("selection_do_gradient edges", () => {
    it("unknown type falls through to radial (C :590-594)", () => {
        // Guard the impossible plines; the fallthrough still runs.
        if (!game.program_state) game.program_state = {};
        game.program_state.in_impossible = 1;
        const cx = 30, cy = 12, m = 2;
        const a = selection_new();
        selection_do_gradient(a, cx, cy, cx, cy, 99, m, m);
        const b = selection_new();
        selection_do_gradient(b, cx, cy, cx, cy, SEL_GRADIENT_RADIAL, m, m);
        assert.deepEqual(fullScan(a), fullScan(b));
    });

    it("mind>maxd swaps without throwing; center set, far corner clear", () => {
        initRng(12345);
        const sel = selection_new();
        selection_do_gradient(sel, 40, 10, 40, 10, SEL_GRADIENT_RADIAL, 6, 2);
        assert.equal(selection_getpoint(40, 10, sel), 1, "center");
        assert.equal(selection_getpoint(0, 0, sel), 0, "far corner");
    });
});
