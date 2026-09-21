import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { monhp_per_lvl } from "../js/makemon.js";
import { pluslvl } from "../js/exper.js";
import { monsterNames } from "../js/generated/monsters_data.js";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { MAXULEV } from "../js/const.js";

// C ref: makemon.c monhp_per_lvl `:986–1007` + exper.c pluslvl `:317–324`.
// C draws the default d8 unconditionally, then the golem / high-mlevel /
// adult-dragon / level-0 arms overwrite it (each keeping C's extra draw).
// The old JS body drew only the arm die (one draw short on every non-default
// arm), and pluslvl skipped the Upolyd arm entirely (`newhp` ran first),
// which blocked scen-poly-Caveman-92202 at step 197 (C `rnd(4)=3` in
// monhp_per_lvl vs JS `rnd(1)=1` from newhp). This file pins the draw
// envelope per arm plus the pluslvl Upolyd ordering; the full session is
// covered by `verify --fn monhp_per_lvl`.
const PM_GRAY_DRAGON = monsterNames.indexOf("PM_GRAY_DRAGON");
const PM_STONE_GOLEM = monsterNames.indexOf("PM_STONE_GOLEM");

const val = (entry) => Number(entry.split("=")[1]);
const fresh = (seed) => {
    initRng(seed);
    enableRngLog();
};

describe("monhp_per_lvl C draw order (makemon.c:986-1007)", () => {
    it("level-0 monster draws rnd(8) then rnd(4)", () => {
        fresh(9187);
        const mon = { data: { mlevel: 0, mlet: "S_BAT", mndx: 3 }, m_lev: 0 };
        const hp = monhp_per_lvl(mon);
        const log = getRngLog();
        assert.equal(log.length, 2);
        assert.match(log[0], /^rnd\(8\)=[1-8]$/);
        assert.match(log[1], /^rnd\(4\)=[1-4]$/);
        assert.equal(hp, val(log[1]));
    });

    it("ordinary monster draws a single rnd(8)", () => {
        fresh(9187);
        const mon = { data: { mlevel: 5, mlet: "S_ORC", mndx: 9 }, m_lev: 5 };
        const hp = monhp_per_lvl(mon);
        const log = getRngLog();
        assert.equal(log.length, 1);
        assert.match(log[0], /^rnd\(8\)=[1-8]$/);
        assert.equal(hp, val(log[0]));
    });

    it("mlevel>49 draws rnd(8) then rnd(4)", () => {
        fresh(9187);
        const mon = { data: { mlevel: 50, mlet: "S_LICH", mndx: 11 }, m_lev: 20 };
        const hp = monhp_per_lvl(mon);
        const log = getRngLog();
        assert.equal(log.length, 2);
        assert.match(log[0], /^rnd\(8\)=[1-8]$/);
        assert.match(log[1], /^rnd\(4\)=[1-4]$/);
        assert.equal(hp, 4 + val(log[1]));
    });

    it("adult dragon draws rnd(8) then rn2(5)", () => {
        fresh(9187);
        const mon = { data: { mlevel: 10, mlet: "S_DRAGON", mndx: PM_GRAY_DRAGON }, m_lev: 10 };
        const hp = monhp_per_lvl(mon);
        const log = getRngLog();
        assert.equal(log.length, 2);
        assert.match(log[0], /^rnd\(8\)=[1-8]$/);
        assert.match(log[1], /^rn2\(5\)=[0-4]$/);
        assert.equal(hp, 4 + val(log[1]));
    });

    it("golem draws only the leading rnd(8); golemhp has no RNG", () => {
        fresh(9187);
        const mon = { data: { mlevel: 12, mlet: "S_GOLEM", mndx: PM_STONE_GOLEM }, m_lev: 12 };
        const hp = monhp_per_lvl(mon);
        const log = getRngLog();
        assert.equal(log.length, 1);
        assert.match(log[0], /^rnd\(8\)=[1-8]$/);
        assert.equal(hp, Math.trunc(100 / 12));
    });
});

describe("pluslvl Upolyd arm (exper.c:319-322)", () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u,
            youmonst: game.youmonst,
            urole: game.urole,
            urace: game.urace,
            flags: game.flags,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.urole = saved.urole;
        game.urace = saved.urace;
        game.flags = saved.flags;
    });

    // MAXULEV skips the Welcome/adjabil/achievement tail so the arm runs
    // headless; hirnd 0 keeps newhp draw-free so the monhp prefix is exact.
    it("polymorphed level-up draws monhp_per_lvl before newhp/newpw", async () => {
        game.u = {
            ulevel: MAXULEV, ulevelmax: MAXULEV, ulevelpeak: MAXULEV,
            umonnum: 1, umonster: 0,
            mh: 10, mhmax: 40, uhp: 20, uhpmax: 25,
            uhpinc: [], ueninc: [], uen: 5, uenmax: 10, uenpeak: 10, uexp: 0,
        };
        game.youmonst = { data: { mlevel: 0, mlet: "S_BAT", mndx: 3 }, m_lev: 0 };
        game.urole = { hpadv: { hifix: 3, hirnd: 0 }, enadv: { hifix: 1, hirnd: 0 }, xlev: 14 };
        game.urace = { hpadv: { hifix: 1, hirnd: 0 }, enadv: { hifix: 1, hirnd: 0 } };
        fresh(5511);
        await pluslvl(true);
        const log = getRngLog();
        assert.match(log[0], /^rnd\(8\)=[1-8]$/);
        assert.match(log[1], /^rnd\(4\)=[1-4]$/);
        assert.equal(game.u.mh, 10 + val(log[1]));
        assert.equal(game.flags?.botl, true);
    });
});
