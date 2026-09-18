import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
  MAXBLSTATS,
  BL_TITLE, BL_STR, BL_GOLD, BL_ENE, BL_ENEMAX, BL_XP, BL_AC, BL_HD,
  BL_HP, BL_HPMAX, BL_EXP, BL_CONDITION, BL_WEAPON, BL_ARMOR, BL_TERRAIN,
  BL_VERS, BL_SCORE, BL_TIME,
  ANY_INT, ANY_LONG, ANY_ULONG, ANY_STR, ANY_MASK32,
} from "../js/const.js";
import {
  init_blstats, compare_blstats, anything_to_s, percentage, exp_percentage,
  eval_notify_windowport_field, evaluate_and_notify_windowport,
} from "../js/botl.js";
import { newuexp } from "../js/exper.js";

// C ref: botl.c evaluate_and_notify_windowport `:1621-1680` (D-2498) with
// eval_notify_windowport_field `:1492-1618` + pure helpers. Pins the newly
// ported machinery headless: no RNG on any of these paths.
//
// blstats buffers persist across its in one file (init_blstats refuses a
// second build, C :1765-1768), so mutation-free its run before mutation
// ones; game scalar state is saved/restored per it.
describe("botl windowport-notify port (botl.c)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u, flags: game.flags, iflags: game.iflags,
      gu: game.gu, gc: game.gc, svc: game.svc, gs: game.gs,
    };
    game.u = { ulevel: 5, uexp: 0, umonnum: 0, umonster: 0 };
    game.flags = {};
    game.iflags = {};
    game.gu = {};
    game.gc = undefined;
    game.svc = undefined;
    game.gs = undefined;
  });
  afterEach(() => {
    Object.assign(game, saved);
  });

  it("statusfields enum matches C botl.h:44-61", () => {
    assert.equal(BL_TITLE, 0);
    assert.equal(BL_GOLD, 10);
    assert.equal(BL_ENE, 11);
    assert.equal(BL_CONDITION, 22);
    assert.equal(BL_WEAPON, 23);
    assert.equal(BL_ARMOR, 24);
    assert.equal(BL_TERRAIN, 25);
    assert.equal(BL_VERS, 26);
    assert.equal(MAXBLSTATS, 27);
  });

  it("init_blstats builds 2x27 C-order buffers", () => {
    init_blstats();
    assert.equal(game.gb.blstats[0].length, MAXBLSTATS);
    assert.equal(game.gb.blstats[1].length, MAXBLSTATS);
    // C :704/:723/:727/:735/:741 spot checks.
    assert.equal(game.gb.blstats[0][0].fld, BL_TITLE);
    assert.equal(game.gb.blstats[0][0].fldname, "title");
    const hp = game.gb.blstats[0][BL_HP];
    assert.equal(hp.fld, BL_HP);
    assert.equal(hp.idxmax, BL_HPMAX);
    assert.equal(hp.percent_matters, true);
    const cond = game.gb.blstats[0][BL_CONDITION];
    assert.equal(cond.anytype, ANY_MASK32);
    assert.equal(cond.val, null); // C :1777-1781 valwidth 0 → NULL
    // C template/field-id crossing (table :732-740 vs enum botl.h:52-60):
    // array position 23 holds the version template, 24 weapon, 25 armor,
    // 26 terrain. Fill and eval both index by field id so behavior stays
    // consistent; only template cosmetics cross. Pinned, not "fixed".
    assert.equal(game.gb.blstats[0][23].fldname, "version");
    assert.equal(game.gb.blstats[0][24].fldname, "weapon");
    assert.equal(game.gb.blstats[0][25].fldname, "armor");
    assert.equal(game.gb.blstats[0][26].fldname, "terrain");
    assert.equal(game.gb.blstats[0][BL_HP].val, "");
  });

  it("clean notify pass pushes nothing, clears botl flags (C :1678-1679)", () => {
    init_blstats();
    game.flags = { botl: true, botlx: true, time_botl: true };
    const valset = new Array(MAXBLSTATS).fill(false);
    evaluate_and_notify_windowport(valset, 0); // must not throw: no windowport traffic
    assert.equal(game.flags.botl, false);
    assert.equal(game.flags.botlx, false);
    assert.equal(game.flags.time_botl, false);
    assert.equal(game.gu.update_all, false); // C :1679 gu.update_all = FALSE
  });

  it("option gates skip hidden fields; Upolyd flips XP/EXP vs HD (C :1632-1642)", () => {
    init_blstats();
    // Dirty exactly one field-indexed buffer, run the real outer function:
    // a skipped field returns cleanly, a processed one reaches the loud
    // windowport omit. Buffers restore to equal after each sub-case.
    // Dirties BOTH the string and numeric channels: which member governs
    // depends on the template/field-id crossing (the VERS pass at blstats
    // [26] compares a_int via the terrain cheat, C :1827-1829).
    const setField = (fld, n0, n1, s0, s1) => {
      for (const [idx, n, s] of [[0, n0, s0], [1, n1, s1]]) {
        const b = game.gb.blstats[idx][fld];
        b.val = s;
        b.a.a_int = n; b.a.a_long = n; b.a.a_uint = n; b.a.a_ulong = n;
        b.rawval.a_int = n; b.rawval.a_long = n;
      }
    };
    const scrubField = (fld) => {
      for (let idx = 0; idx <= 1; idx++) {
        const b = game.gb.blstats[idx][fld];
        b.val = b.val === null ? null : "";
        b.a.a_int = b.a.a_long = b.a.a_uint = b.a.a_ulong = 0;
        b.rawval.a_int = b.rawval.a_long = 0;
      }
    };
    const probe = (fld, n0, n1, s0, s1, flagPatch) => {
      const keepFlags = game.flags;
      game.flags = { ...keepFlags, ...flagPatch };
      setField(fld, n0, n1, s0, s1);
      let threw = false;
      try {
        evaluate_and_notify_windowport(new Array(MAXBLSTATS).fill(false), 0);
      } catch (e) {
        threw = /not yet ported/.test(e.message);
        if (!threw) throw e;
      }
      scrubField(fld);
      game.flags = keepFlags;
      return threw;
    };
    const N = (fld, a, b, patch, msg) => assert.equal(probe(fld, a, b, String(a), String(b), patch), false, msg);
    const NS = (fld, s0, s1, patch, msg) => assert.equal(probe(fld, 0, 0, s0, s1, patch), false, msg);
    // All gates default Off (optlist.h) — every row both directions.
    N(BL_SCORE, 100, 90, undefined, "score gated");
    assert.equal(probe(BL_SCORE, 100, 90, "100", "90", { showscore: true }), true, "score shown");
    N(BL_TIME, 500, 499, undefined, "time gated");
    assert.equal(probe(BL_TIME, 500, 499, "500", "499", { time: true }), true, "time shown");
    assert.equal(probe(BL_VERS, 7, 6, "v7", "v6", undefined), false, "vers gated");
    assert.equal(probe(BL_VERS, 7, 6, "v7", "v6", { showvers: true }), true, "vers shown");
    NS(BL_WEAPON, "sword", "axe", undefined, "weapon gated");
    assert.equal(probe(BL_WEAPON, 0, 0, "sword", "axe", { weaponstatus: true }), true, "weapon shown");
    NS(BL_ARMOR, "mail", "cloak", undefined, "armor gated");
    assert.equal(probe(BL_ARMOR, 0, 0, "mail", "cloak", { armorstatus: true }), true, "armor shown");
    NS(BL_TERRAIN, "maze", "hell", undefined, "terrain gated");
    assert.equal(probe(BL_TERRAIN, 0, 0, "maze", "hell", { terrainstatus: true }), true, "terrain shown");
    N(BL_HD, 8, 7, undefined, "human HD skipped");
    assert.equal(probe(BL_XP, 5, 4, "5", "4", undefined), true, "human Xp processed");
    N(BL_EXP, 900, 800, undefined, "human Exp gated by showexp");
    assert.equal(probe(BL_EXP, 900, 800, "900", "800", { showexp: true }), true, "human Exp shown");
    // Polyself inverts the XP/EXP-vs-HD pair (C :1636-1637).
    game.u = { ulevel: 5, uexp: 0, umonnum: 1, umonster: 0 };
    assert.equal(probe(BL_XP, 5, 4, "5", "4", undefined), false, "poly Xp skipped");
    assert.equal(probe(BL_EXP, 900, 800, "900", "800", { showexp: true }), false, "poly Exp skipped");
    assert.equal(probe(BL_HD, 8, 7, "8", "7", undefined), true, "poly HD processed");
  });

  it("compare_blstats direction + rawval + mask + terrain cheat", () => {
    init_blstats();
    const [curr, prev] = [game.gb.blstats[0][BL_HP], game.gb.blstats[1][BL_HP]];
    assert.equal(compare_blstats(prev, curr), 0); // C :1833 same → 0
    curr.rawval.a_int = 20; curr.a.a_int = 20;
    prev.rawval.a_int = 10; prev.a.a_int = 10;
    assert.equal(compare_blstats(prev, curr), 1); // C :1800 prev < new → 1
    assert.equal(compare_blstats(curr, prev), -1); // C :1803 prev > new → -1
    // ANY_MASK32: 0 same / 1 changed (C :1877-1878).
    const [mc, mp] = [game.gb.blstats[0][BL_CONDITION], game.gb.blstats[1][BL_CONDITION]];
    mc.a.a_ulong = 5; mp.a.a_ulong = 5;
    assert.equal(compare_blstats(mc, mp), 0);
    mp.a.a_ulong = 6;
    assert.equal(compare_blstats(mc, mp), 1);
    // BL_TERRAIN cheat (C :1827-1829) is dead by the template crossing
    // above: blstats[][25] carries fld BL_ARMOR, so `bl1->fld == BL_TERRAIN`
    // never fires and string comparison governs (the fill keeps val in sync
    // via terrain_descr, so detection still works in C).
    const [tc, tp] = [game.gb.blstats[0][BL_TERRAIN], game.gb.blstats[1][BL_TERRAIN]];
    tc.a.a_int = 3; tp.a.a_int = 3;
    tc.val = "in hell"; tp.val = "in hell";
    assert.equal(compare_blstats(tc, tp), 0);
    tp.val = "in a maze";
    assert.notEqual(compare_blstats(tc, tp), 0);
    // null pointers abort like C panic (C :1814-1816).
    assert.throws(() => compare_blstats(null, tp), /bad istat pointer/);
  });

  it("anything_to_s renders per anytype (C :1886-1923)", () => {
    assert.equal(anything_to_s("", { a_int: -42 }, ANY_INT), "-42");
    assert.equal(anything_to_s("", { a_long: 123456789012 }, ANY_LONG), "123456789012");
    assert.equal(anything_to_s("", { a_ulong: 255 }, ANY_ULONG), "255");
    assert.equal(anything_to_s("", { a_ulong: 255 }, ANY_MASK32), "ff"); // C :1897 %lx
    assert.equal(anything_to_s("keep", {}, ANY_STR), "keep"); // C :1915 no-op
    assert.equal(anything_to_s("x", {}, 9999), ""); // C :1919 default empties
    assert.equal(anything_to_s(null, {}, ANY_INT), null); // C :1889 NULL
  });

  it("percentage integer shares + truncation-to-one (C :1977-2050)", () => {
    init_blstats();
    const [hp, max] = [game.gb.blstats[0][BL_HP], game.gb.blstats[0][BL_HPMAX]];
    hp.rawval.a_int = 20; max.rawval.a_int = 40; // C :1992 rawval for HP
    hp.a.a_int = 20; max.a.a_int = 40; // C bot() fills display `a` alongside rawval
    assert.equal(percentage(hp, max), 50);
    hp.rawval.a_int = 1; max.rawval.a_int = 200;
    assert.equal(percentage(hp, max), 1); // C :2043 nonzero never truncates to 0
    assert.equal(percentage(null, max), 0); // C :1985 impossible arm returns 0
  });

  it("exp_percentage level-drain hook: one short of next is 100 (C :2062-2074)", () => {
    // ulevel/uexp read live from game.u via the live newuexp (exper.js).
    game.u = { ulevel: 5, uexp: newuexp(5) - 1, umonnum: 0, umonster: 0 };
    assert.equal(exp_percentage(), 100);
  });

  it("changed field reaches the named windowport omit loudly", () => {
    init_blstats();
    game.gb.blstats[0][BL_HP].rawval.a_int = 20;
    game.gb.blstats[1][BL_HP].rawval.a_int = 10;
    const valset = new Array(MAXBLSTATS).fill(false);
    // chg != 0 → notify arm → get_hilite/status_update unwired: loud, never silent.
    assert.throws(
      () => eval_notify_windowport_field(BL_HP, valset, 0),
      /not yet ported/,
    );
  });
});
