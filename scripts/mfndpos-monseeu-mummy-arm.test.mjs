import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { mfndpos } from "../js/mon.js";
import { Invis } from "../js/timeout.js";
import { INVIS, NOTONL, ROOM } from "../js/const.js";
import { objectNames } from "../js/generated/objects_data.js";

const MUMMY_WRAPPING = objectNames.indexOf("MUMMY_WRAPPING");

// C ref: mon.c mfndpos `monseeu` (:2261-2262,
// mon->mcansee && (!Invis || perceives(mdat))) + youprop.h:198
// (Invis = (HInvis||EInvis)&&!BInvis, live) + worn.c:39 W_BLOCKS (worn
// mummy wrapping on W_ARMC blocks INVIS) + the :2339 NOTONL gate
// (monseeu && monlineu -> hero-line candidates skipped under NOTONL).
// D-3874 replaced mfndpos's stale-flat Invis read with a 5-line inline
// that was value-right for the worn-ring case but omitted the B half's
// worn-mummy-wrapping arm (canonical BInvis(), timeout.js): with
// wrapping worn + invisibility from another source + desynced B, C
// reads Invis=FALSE while the inline read TRUE -- monseeu FALSE,
// hero-line candidates kept where C drops them (the D-3874 class
// inverted, review 2734). mfndpos now calls the canonical Invis()
// export; this test pins the arm through mfndpos itself. A cansee
// unicorn (no M1_SEE_INVIS, so monseeu == !Invis) at (59,7) with the
// hero on-line at (73,6), flag NOTONL, all-floor neighbourhood:
// wrapping case must NOTONL-reject exactly the 3 hero-row cells
// (cnt 5); the no-wrapping control keeps all 8 (cnt 8).
describe("mfndpos monseeu honors the BInvis mummy-wrapping arm (worn.c:39)", () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u,
            youmonst: game.youmonst,
            moves: game.moves,
            fmon: game.fmon,
            level: game.level,
            regions: game.regions,
            objects: game._objects_at,
            engr: game.head_engr,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.moves = saved.moves;
        game.fmon = saved.fmon;
        game.level = saved.level;
        game.regions = saved.regions;
        game._objects_at = saved.objects;
        game.head_engr = saved.engr;
    });

    const setup = ({ wrapping }) => {
        game.u = {
            ux: 73, uy: 6,
            uz: { dnum: 0, dlevel: 1 },
            // Ring-class invisibility, B desynced (no BInvis flat,
            // blocked 0 -- the reset-time extrinsic-drop class).
            uprops: { [INVIS]: { intrinsic: 0, extrinsic: 1, blocked: 0 } },
            uarmc: wrapping ? { otyp: MUMMY_WRAPPING } : null,
        };
        game.youmonst = { data: {} };
        game.moves = 100;
        game.fmon = [];
        game.regions = [];
        game._objects_at = new Map();
        game.head_engr = null;
        game.level = {
            at: () => ({ typ: ROOM, doormask: 0, roomno: 0, flags: 0, seenv: 1 }),
            flags: {},
            traps: [],
            rooms: [],
        };
    };

    const unicorn = () => ({
        mx: 59, my: 7, mux: 73, muy: 6,
        mcansee: 1, mconf: 0, mpeaceful: 0, mtame: 0,
        mnum: -1, mhp: 10,
        data: { mlet: "u", mndx: -1, mflags1: 0, mflags2: 0, mflags3: 0 },
    });

    const possOf = (data, cnt) => data.poss.slice(0, cnt)
        .map((p) => `${p.x},${p.y}`).sort();

    it("worn wrapping + ring invis + desynced B: Invis FALSE, hero-row trio rejected", () => {
        setup({ wrapping: true });
        assert.equal(Invis(), false);
        const data = {};
        const cnt = mfndpos(unicorn(), data, NOTONL);
        assert.equal(cnt, 5);
        assert.equal(data.cnt, 5);
        assert.deepEqual(possOf(data, cnt),
            ["58,7", "58,8", "59,8", "60,7", "60,8"]);
    });

    it("control, no wrapping: Invis TRUE, all 8 neighbours kept", () => {
        setup({ wrapping: false });
        assert.equal(Invis(), true);
        const data = {};
        const cnt = mfndpos(unicorn(), data, NOTONL);
        assert.equal(cnt, 8);
        assert.equal(data.cnt, 8);
        assert.deepEqual(possOf(data, cnt),
            ["58,6", "58,7", "58,8", "59,6", "59,8", "60,6", "60,7", "60,8"]);
    });
});
