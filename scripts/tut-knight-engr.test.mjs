import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const gstate = await import("../js/gstate.js");

// C ref: dat/tut-1.lua:83-85 — knight-only engraving at map-relative
// (12,1): `if (u.role == "Knight") then des.engraving({ coord = { 12,1 },
// type = "engrave", text = "Knights can jump with '" .. tut_key("jump")
// .. "'", degrade = false })`. load_tut1 deferred it ("role gate"), so
// JS painted floor at map (15,4) where C paints the bright-blue S_engroom
// backtick — failing scen-tutorial-Knight-94259 at step 4 with RNG fully
// matched (owner read_engr_at is faithful per D-3236; the paint path —
// newsym reveal, _map_location engraving arm, map_engraving — was already
// whole; only the data was missing). C's text is byte-pinned by the
// TEMP-C dump in D-3670: "Knights can jump with 'M-j'".
// Truncated replay: 5 keys ("  y  ") enter the tutorial, then input exhausts.
const KNIGHT = "scen-tutorial-Knight-94259";
const CAVEMAN = "scen-tutorial-Caveman-94179";

function loadSeg(id) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    return sess.segments[0];
}

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

async function enterTutorial(id, nkeys) {
    const seg = loadSeg(id);
    // Truncated replay: input usually exhausts (throw), but a prefix
    // that ends exactly at a step boundary resolves — either way the
    // hero-pos assertion below proves tutorial entry happened.
    try {
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc,
            moves: (seg.moves || "").slice(0, nkeys),
            storage: sharedStorage(),
        });
    } catch (e) {
        assert.match(String(e?.message || e), /Input queue empty/,
            `unexpected throw for ${id}: ${e?.message || e}`);
    }
    return gstate.game;
}

function engrAt(game, x, y) {
    for (let ep = game.head_engr; ep; ep = ep.nxt_engr) {
        if (ep.engr_x === x && ep.engr_y === y) return ep;
    }
    return null;
}

describe("tut-1 knight-only engraving (tut-1.lua:83-85)", () => {
    it(`${KNIGHT}: knight engraving exists with C's exact text`, { timeout: 120000 }, async () => {
        const game = await enterTutorial(KNIGHT, 5);
        assert.equal(game.u?.ux, 12, "hero x after tutorial entry");
        assert.equal(game.u?.uy, 6, "hero y after tutorial entry");
        const ep = engrAt(game, 15, 4);
        assert.ok(ep, "knight engraving at map (15,4) = des (12,1)");
        assert.equal(ep.engr_type, 2, "type ENGRAVE");
        assert.equal(ep.engr_txt?.actual_text, "Knights can jump with 'M-j'");
        assert.equal(ep.nowipeout, 1, "degrade=false");
        assert.equal(ep.erevealed, 1, "revealed via newsym cansee arm");
    });

    it(`${CAVEMAN}: no knight engraving for other roles`, { timeout: 120000 }, async () => {
        const game = await enterTutorial(CAVEMAN, 6);
        assert.equal(game.u?.ux, 12, "hero x after tutorial entry");
        assert.equal(game.u?.uy, 6, "hero y after tutorial entry");
        assert.equal(engrAt(game, 15, 4), null, "no engraving at (15,4) for non-Knight");
    });
});
