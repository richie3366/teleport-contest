import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");

// C ref: allmain.c moveloop_core `:514–531` — a count on a non-occupation
// command (E.g. "5h") survives rhack as multi>0, and each moveloop tick
// replays the stored key (`--multi; rhack(cmd_key)`) until the count is
// spent. Bumps spend count without spending turns, like repeated keys.
// Seed 8000 tourist starts at (37,6) with a wall at x=34: "5h" must end
// exactly where "hhh" ends — (35,6), 2 turns — not where "h" ends.
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
    return { ux: game.u.ux, uy: game.u.uy, multi: game.multi, moves: game.moves };
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
});
