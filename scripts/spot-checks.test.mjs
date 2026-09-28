import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { spot_checks, dump_weights_lines, dump_weights } from "../js/hack.js";
import {
  ICE, DRAWBRIDGE_UP, ROOM, PIT, DB_ICE, MELT_ICE_AWAY, TIMER_LEVEL,
} from "../js/const.js";
import { spot_time_left } from "../js/mkobj.js";
import { objectNames, objectNameStrs } from "../js/generated/objects_data.js";
import { pmnames } from "../js/generated/monsters_data.js";
import { the, an, simple_typename } from "../js/objnam.js";
import { game } from "../js/gstate.js";

// C ref: hack.c spot_checks `:4525–4547` (DRAWBRIDGE_UP fallthrough into
// ICE, MELT_ICE_AWAY stop + obj_ice_effects on vanished ice or a dry
// re-examined drawbridge) and dump_weights `:4421–4483` via
// dump_weights_lines() (monster loop minus LONG_WORM_TAIL, object loop
// `wt && oc_name` gate + `oc_name_known = 1`, strcmp sort, `%7u` +
// `/* %*s */` rows). Headless notes: the level is a locations fixture;
// timers are injected as TIMER_LEVEL nodes (`timer_base()` is `game`
// with `_timer_base`); objects are dense fixtures so `objs[i]` is never
// a hole (C `objects[]` is dense post-init_objects). `dump_weights()`
// itself is not called here — it re-inits globals (decl_globals_init +
// init_objects) like C, and its raw_printf sink drops text in JS
// (display.js vraw_printf omit); lines() carries the pins.

const pack = (x, y) => ((((x | 0) & 0xffff) << 16) | ((y | 0) & 0xffff));

function setLevel(typ, mask = 0) {
  const locations = [];
  locations[5] = [];
  locations[5][5] = { typ, drawbridgemask: mask };
  locations[9] = [];
  locations[9][9] = { typ: ROOM, drawbridgemask: 0 };
  game.level = { locations, objects: [] };
}

function meltTimer(x, y, timeout = 100) {
  const where = pack(x, y);
  game._timer_base = {
    kind: TIMER_LEVEL, action: MELT_ICE_AWAY, a_long: where,
    timeout, next: game._timer_base || null,
  };
}

describe("hack.c spot_checks / dump_weights_lines", () => {
  let saved;
  beforeEach(() => {
    saved = {
      level: game.level, moves: game.moves,
      timers: game._timer_base, objects: game.objects,
    };
    game.moves = 0;
    game._timer_base = null;
  });
  afterEach(() => {
    game.level = saved.level;
    game.moves = saved.moves;
    game._timer_base = saved.timers;
    game.objects = saved.objects;
  });

  it("spot_checks: non-ice old_typ is a no-op, other timers kept", () => {
    setLevel(ROOM);
    meltTimer(9, 9);
    spot_checks(5, 5, ROOM);
    assert.equal(spot_time_left(9, 9, MELT_ICE_AWAY), 100);
    assert.equal(spot_time_left(5, 5, MELT_ICE_AWAY), 0);
  });

  it("spot_checks: vanished ICE stops the MELT_ICE_AWAY timer", () => {
    setLevel(PIT);
    meltTimer(5, 5);
    assert.equal(spot_time_left(5, 5, MELT_ICE_AWAY), 100);
    spot_checks(5, 5, ICE);
    assert.equal(spot_time_left(5, 5, MELT_ICE_AWAY), 0);
  });

  it("spot_checks: unchanged ICE keeps the timer", () => {
    setLevel(ICE);
    meltTimer(5, 5);
    spot_checks(5, 5, ICE);
    assert.equal(spot_time_left(5, 5, MELT_ICE_AWAY), 100);
  });

  it("spot_checks: dry DRAWBRIDGE_UP fires even when unchanged", () => {
    setLevel(DRAWBRIDGE_UP, 0);
    meltTimer(5, 5);
    spot_checks(5, 5, DRAWBRIDGE_UP);
    assert.equal(spot_time_left(5, 5, MELT_ICE_AWAY), 0);
  });

  it("spot_checks: icy DRAWBRIDGE_UP unchanged keeps the timer", () => {
    setLevel(DRAWBRIDGE_UP, DB_ICE);
    meltTimer(5, 5);
    spot_checks(5, 5, DRAWBRIDGE_UP);
    assert.equal(spot_time_left(5, 5, MELT_ICE_AWAY), 100);
  });

  it("spot_checks: changed DRAWBRIDGE_UP stops the timer", () => {
    setLevel(ROOM, 0);
    meltTimer(5, 5);
    spot_checks(5, 5, DRAWBRIDGE_UP);
    assert.equal(spot_time_left(5, 5, MELT_ICE_AWAY), 0);
  });

  it("spot_checks: null level is a headless no-op", () => {
    game.level = null;
    meltTimer(5, 5);
    spot_checks(5, 5, ICE);
    assert.equal(spot_time_left(5, 5, MELT_ICE_AWAY), 100);
  });

  function fixtureObjects() {
    const nullIdx = objectNameStrs.indexOf(null);
    const slime = objectNames.indexOf("SLIME_MOLD");
    const objs = Array.from({ length: objectNames.length }, () => ({
      oc_weight: 0, oc_unique: 0, oc_name_known: 0, oc_name_idx: 0,
    }));
    // SLIME_MOLD with a null name slot: included via the C `:4455` literal.
    objs[slime] = { oc_weight: 5, oc_unique: 0, oc_name_known: 0, oc_name_idx: nullIdx };
    objs[30] = { oc_weight: 42, oc_unique: 0, oc_name_known: 0, oc_name_idx: 0 };
    objs[31] = { oc_weight: 7, oc_unique: 1, oc_name_known: 0, oc_name_idx: 1 };
    // Heavy but nameless: excluded by the `:4459` oc_name gate.
    objs[32] = { oc_weight: 99, oc_unique: 0, oc_name_known: 0, oc_name_idx: nullIdx };
    game.objects = objs;
    return { slime, nullIdx };
  }

  function entryWts(lines) {
    return lines.slice(1, -2).map((l) => l.slice(4, 11).trim());
  }

  it("dump_weights_lines: header, footer, count, separators", () => {
    fixtureObjects();
    const lines = dump_weights_lines();
    const monCount = pmnames.length - 1; // LONG_WORM_TAIL skipped
    assert.equal(lines[0], "int all_weights[] = {");
    assert.equal(lines[lines.length - 2], "};");
    assert.equal(lines[lines.length - 1], "");
    assert.equal(lines.length, 1 + monCount + 3 + 2);
    const entries = lines.slice(1, -2);
    assert.ok(entries.length > 0);
    for (const l of entries.slice(0, -1)) assert.equal(l.slice(11, 12), ",");
    assert.equal(entries[entries.length - 1].slice(11, 12), " ");
  });

  it("dump_weights_lines: entries sorted, worm tail absent, slime present", () => {
    const { slime } = fixtureObjects();
    const lines = dump_weights_lines();
    const entries = lines.slice(1, -2);
    // Sort keys mirror nm order: `%7u` space-pad orders like `%07u` at
    // fixed width, and the last line's ' ' separator (C `:4474`) sorts
    // before ',' — C output shares that wrinkle, so normalize it out.
    const key = (l) => l.slice(0, 11) + "," + l.slice(12);
    for (let i = 0; i + 1 < entries.length; i++) {
      assert.ok(key(entries[i]) <= key(entries[i + 1]), `unsorted at ${i}`);
    }
    assert.ok(!lines.some((l) => l.includes("long worm tail")));
    assert.ok(lines.some((l) => l.includes("the body of a long worm")));
    const slimeBase = simple_typename(slime);
    const slimeLine = `    ${"5".padStart(7, " ")}`
      + `, /* ${an(slimeBase).padEnd(49, " ")} */`;
    assert.ok(lines.includes(slimeLine), "slime mold row");
    assert.ok(slimeLine.includes("slime mold"));
  });

  it("dump_weights_lines: the/an nest and oc_name_known stores", () => {
    fixtureObjects();
    const lines = dump_weights_lines();
    const wts = entryWts(lines);
    assert.ok(!wts.includes("99"), "nameless 99 excluded");
    const line42 = lines.find((l) => l.slice(4, 11).trim() === "42");
    const line7 = lines.find((l) => l.slice(4, 11).trim() === "7");
    assert.ok(line42 && !line42.includes(" the "), "non-unique uses an()");
    assert.equal(line42, `    ${"42".padStart(7, " ")}, /* ${an(simple_typename(30)).padEnd(49, " ")} */`);
    assert.ok(line7 && line7.includes(" the "), "unique uses the()");
    assert.equal(game.objects[30].oc_name_known, 1);
    assert.equal(game.objects[31].oc_name_known, 1);
    assert.equal(game.objects[32].oc_name_known, 0);
    assert.equal(game.objects[33].oc_name_known, 0);
  });

  it("dump_weights is exported (re-init emitter, unpinned)", () => {
    assert.equal(typeof dump_weights, "function");
  });
});
