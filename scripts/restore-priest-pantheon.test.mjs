import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C refs: restore.c restgamestate — Sfi_flag(nhfp, &flags,
// "gamestate-flags") `:571` restores flags (incl. pantheon) BEFORE
// role_init() `:596`, so role_init sees the RESTORED pantheon (never -1)
// and skips its new-game arms (role.c `:2009` gender re-check,
// `:2064–2077` pantheon re-roll). Priest has no fixed deities
// (role.c `:285`: 0,0,0 "deities from a randomly chosen other role will
// be used"), so forcing pantheon to -1 before role_init makes JS burn a
// spurious randrole rn2(13) on every Priest restore while C draws
// nothing there — and C's restore_luadata then re-inits luacore in the
// fresh process (nhlua.c `:1357–1358`), drawing the nhlib align shuffle
// (rn2(3), rn2(2)), which JS draws one slot late. 4 Priest sessions,
// ~1.4k RNG lost (D-3668 Next (2)).
// This test replays the biggest probe's both segments and pins C's
// recorded seg1 step-0 draws.
const ID = "scen-descend-Priest-94107";

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

function isRngCall(entry) {
    return typeof entry === "string" && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry);
}

function normalizeRng(entry) {
    return String(entry).replace(/^\d+\s+/, "").replace(/\s*@\s.*$/, "").trim();
}

describe("Priest restore pantheon (restore.c:571/:596, role.c:2064)", () => {
    it(`${ID}: seg1 opens with C's align shuffle, no randrole`, { timeout: 300000 }, async () => {
        const r = JSON.parse(readFileSync(
            new URL(`../hidden-corpus/recipes/${ID}.recipe.json`, import.meta.url),
        ));
        const storage = freshStorage();
        await runSegment({
            seed: r.segments[0].seed, datetime: r.segments[0].datetime,
            timezone: r.segments[0].timezone, nethackrc: r.segments[0].nethackrc,
            moves: r.segments[0].moves, storage,
        });
        const g1 = await runSegment({
            seed: r.segments[1].seed, datetime: r.segments[1].datetime,
            timezone: r.segments[1].timezone, nethackrc: r.segments[1].nethackrc,
            moves: r.segments[1].moves, storage,
        });
        const jsAll = (g1.getRngLog?.() || [])
            .map((e) => normalizeRng(typeof e === "string" ? e : String(e)))
            .filter(isRngCall);
        assert.ok(jsAll.length >= 2, `seg1 rng draws ${jsAll.length} < 2`);
        assert.equal(jsAll[0], "rn2(3)=0");
        assert.equal(jsAll[1], "rn2(2)=0");
    });
});
