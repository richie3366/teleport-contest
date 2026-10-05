import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");

// C ref: allmain.c moveloop_core `:514–531` — a count on a non-occupation
// command (E.g. "5h") survives rhack as multi>0. Counted walks (mv=1,
// cmd.c:3786) replay domove() directly per tick (`:524–528`: short counts
// tick down with end_running at 0; run-sized counts ride); other commands
// replay the stored key (`--multi; rhack(cmd_key)`). A bump stops the
// count at once (nomul(0), hack.c:2848), spending no turn. Seed 8000
// tourist starts at (37,6) with a wall at x=34: "5h" must end exactly
// where "hhh" ends — (35,6), 2 turns — not where "h" ends.
const NETHACKRC = "OPTIONS=name:Contestant,role:Tourist,race:human,gender:female,align:neutral\nOPTIONS=!autopickup,!legacy,!tutorial,!splash_screen,pettype:none\nOPTIONS=pushweapon,showexp,time,color,suppress_alert:3.3.1\nOPTIONS=symset:DECgraphics\n";

function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

async function boot(moves) {
    await runSegment({
        seed: 8000,
        datetime: "20260401090000",
        nethackrc: NETHACKRC,
        moves,
        storage: freshStorage(),
    });
    return {
        ux: game.u.ux, uy: game.u.uy, multi: game.multi, moves: game.moves,
        mv: game.context?.mv | 0, attempting: game.domove_attempting | 0,
        succeeded: game.domove_succeeded | 0,
    };
}

describe("moveloop_core multi>0 !mv replay (allmain.c:514-531)", () => {
    it("single step control: h moves once", { timeout: 60000 }, async () => {
        const s = await boot("h");
        assert.equal(s.ux, 36);
        assert.equal(s.uy, 6);
        assert.equal(s.multi, 0);
        assert.equal(s.moves, 2);
    });

    it("5h spends the count like hhh: (35,6), 2 turns, multi 0", { timeout: 60000 }, async () => {
        const s = await boot("5h");
        assert.equal(s.ux, 35);
        assert.equal(s.uy, 6);
        assert.equal(s.multi, 0);
        assert.equal(s.moves, 3);
    });

    it("9h ends where 5h ends (bumps spend count, not turns)", { timeout: 60000 }, async () => {
        const s = await boot("9h");
        assert.equal(s.ux, 35);
        assert.equal(s.uy, 6);
        assert.equal(s.multi, 0);
        assert.equal(s.moves, 3);
    });

    // C: the first domove clears attempting (hack.c:2706), so replay steps
    // run with attempting=0 and leave domove_succeeded=0 (no smudge past
    // step 1); end_running at count 0 clears mv (allmain.c:524-528). The
    // old rhack-replay path re-armed WALK every step (succeeded != 0).
    it("2h in the open: mv path leaves attempting/succeeded/mv at 0", { timeout: 60000 }, async () => {
        const s = await boot("2h");
        assert.equal(s.ux, 35);
        assert.equal(s.uy, 6);
        assert.equal(s.multi, 0);
        assert.equal(s.mv, 0);
        assert.equal(s.attempting, 0);
        assert.equal(s.succeeded, 0);
    });
});
