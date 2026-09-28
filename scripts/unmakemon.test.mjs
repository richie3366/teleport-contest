import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { unmakemon } from "../js/makemon.js";
import { G_EXTINCT, MM_NOCOUNTBIRTH, NO_MM_FLAGS } from "../js/const.js";
import { G_UNIQ } from "../js/monsters.js";
import { game } from "../js/gstate.js";

// C ref: makemon.c unmakemon `:1514–1539`. Headless notes: the mon carries
// no minvent (discard loop no-ops) and mx=0 (mongone skips newsym), so no
// display or worn machinery runs. mvitals entries are ensured like C's
// always-present svm.mvitals[].

const MNDX = 10;

function mkmon(geno = 0) {
    return { data: { mndx: MNDX, geno }, mhp: 10, mx: 0, my: 0, minvent: null };
}

describe("makemon.c unmakemon", () => {
    let saved;
    beforeEach(() => {
        saved = { mvitals: game.mvitals, fmon: game.fmon };
        game.mvitals = [];
        game.fmon = [];
    });
    afterEach(() => {
        game.mvitals = saved.mvitals;
        game.fmon = saved.fmon;
    });

    it("unmakes: null return, mhp 0, off fmon, birth untallied (`:1519–1539`)", async () => {
        game.mvitals[MNDX] = { mvflags: 0, born: 5, died: 0 };
        const mon = mkmon();
        game.fmon.push(mon);
        const ret = await unmakemon(mon, NO_MM_FLAGS);
        assert.equal(ret, null); // C `:1539` returns 0
        assert.equal(mon.mhp, 0); // C `:1532`
        assert.equal(game.fmon.includes(mon), false); // mongone `:1538`
        assert.equal(game.mvitals[MNDX].born, 4); // C `:1525–1528`
    });

    it("keeps the tally under MM_NOCOUNTBIRTH (`:1519`)", async () => {
        game.mvitals[MNDX] = { mvflags: 0, born: 5, died: 0 };
        const mon = mkmon();
        game.fmon.push(mon);
        await unmakemon(mon, MM_NOCOUNTBIRTH);
        assert.equal(game.mvitals[MNDX].born, 5);
        assert.equal(game.fmon.includes(mon), false);
    });

    it("leaves born 0 and the 255 cap untouched (`:1525–1528`)", async () => {
        game.mvitals[MNDX] = { mvflags: 0, born: 0, died: 0 };
        await unmakemon(mkmon(), NO_MM_FLAGS);
        assert.equal(game.mvitals[MNDX].born, 0);
        game.mvitals[MNDX].born = 255;
        await unmakemon(mkmon(), NO_MM_FLAGS);
        assert.equal(game.mvitals[MNDX].born, 255);
    });

    it("un-extincts a unique (`:1529–1530`)", async () => {
        game.mvitals[MNDX] = { mvflags: G_EXTINCT, born: 1, died: 0 };
        await unmakemon(mkmon(G_UNIQ), NO_MM_FLAGS);
        assert.equal(game.mvitals[MNDX].mvflags & G_EXTINCT, 0);
        assert.equal(game.mvitals[MNDX].born, 0);
    });
});
