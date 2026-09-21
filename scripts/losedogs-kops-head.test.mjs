import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { losedogs } from "../js/dog.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";

// C ref: dog.c losedogs `:303–415`, kops-dismiss head `:310–356`.
// A returning shopkeeper on migrating_mons whose dismiss_kops is set votes
// to dismiss the kops (flag reset as read); an unpacified returning shk
// vetoes, as does any hostile shk accompanying the hero on mydogs — and the
// first loop keeps scanning after a veto so later voters still get their
// ESHK reset. The old JS body skipped the head entirely (doc-named
// omission), so a paid-off shk's kops were never dismissed on arrival.
// This file pins the vote/veto/reset contract; the full session is covered
// by `verify --fn losedogs`.
const shk = (opts = {}) => ({
    mux: 0,
    muy: 0,
    isshk: true,
    mpeaceful: 1,
    mhp: 10,
    mtrack: [{ x: 1 }], // != MIGR_EXACT_XY: placement takes the After_you arm
    mextra: { eshk: { dismiss_kops: false } },
    ...opts,
});
const kop = () => ({ mhp: 5, mstate: 0, data: { mlet: "S_KOP" } });

beforeEach(() => {
    initRng(92042);
    game.u = { uz: { dnum: 0, dlevel: 0 } };
    game.migrating_mons = [];
    game.mydogs = [];
    game.fmon = [];
});

describe("losedogs kops-dismiss head (dog.c:310-356)", () => {
    it("empty lists: head no-ops, body returns cleanly", async () => {
        await losedogs();
        assert.deepEqual(game.migrating_mons, []);
        assert.deepEqual(game.mydogs, []);
    });

    it("pacified voter: flag reset and kops dismissed", async () => {
        const voter = shk({ mextra: { eshk: { dismiss_kops: true } } });
        const k = kop();
        game.migrating_mons = [voter];
        game.fmon = [k];
        await losedogs();
        assert.equal(voter.mextra.eshk.dismiss_kops, false);
        assert.ok(!game.fmon.includes(k));
    });

    it("unpacified veto: later voter flag still reset, kops kept", async () => {
        const vetoer = shk({ mpeaceful: 0 });
        const voter = shk({ mextra: { eshk: { dismiss_kops: true } } });
        const k = kop();
        game.migrating_mons = [vetoer, voter];
        game.fmon = [k];
        await losedogs();
        assert.equal(voter.mextra.eshk.dismiss_kops, false);
        assert.ok(game.fmon.includes(k));
    });

    it("hostile shk on mydogs vetoes the dismissal", async () => {
        const follower = shk({ mpeaceful: 0 });
        const k = kop();
        game.mydogs = [follower];
        game.fmon = [k];
        await losedogs();
        assert.ok(game.fmon.includes(k));
    });
});
