import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const gstate = await import("../js/gstate.js");

// C ref: sp_lev.c lspo_region `:5619–5637` — the (selection, "lit")
// arm grows the selection by one cell (selection_do_grow W_ANY,
// `:5624–5626`) before sel_set_lit. dat/tut-1.lua:55 lights
// area(01,01,73,16), so the grown rect (0,0)-(74,17) lights the
// map's wall ring too — including the room's top wall above the
// hero's arrival square. The baked load_tut1 loop lit only the
// ungrown rect, leaving the top wall (level y=3, x=8..16) unlit:
// C shows `┌───────┐` at tty row 4 while JS showed blank, failing
// 9 scen-tutorial sessions at their read_engr_at --More-- step
// (RNG fully matched; owner read_engr_at is faithful per D-3236).
// This test pins the grown ring lit via a truncated replay:
// 5 keys ("   y ") enter the tutorial, then input exhausts.
const ID = "scen-tutorial-Archeologist-94059";
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

describe("tut-1 lit region grows one cell (lspo_region W_ANY)", () => {
    it(`${ID}: top wall ring lit after tutorial entry`, { timeout: 120000 }, async () => {
        const seg = SESS.segments[0];
        await assert.rejects(
            runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc,
                moves: (seg.moves || "").slice(0, 5),
                storage: sharedStorage(),
            }),
            /Input queue empty/,
            "truncated replay should exhaust input after 5 keys",
        );
        const game = gstate.game;
        assert.equal(game.u?.ux, 12, "hero x after tutorial entry");
        assert.equal(game.u?.uy, 6, "hero y after tutorial entry");
        const unlit = [];
        for (let x = 8; x <= 16; x++) {
            const loc = game.level?.at(x, 3);
            if (!loc?.lit) unlit.push(x);
        }
        assert.deepEqual(unlit, [], `top wall cells unlit at y=3: ${unlit}`);
    });
});
