import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { fmt_elapsed_time } from "../js/insight.js";
import { getnow } from "../js/calendar.js";

// C ref: insight.c fmt_elapsed_time `:313–358` — the elapsed-playing-time
// field of the enlightenment Miscellaneous section (`:448–449`), wired at
// both JS builders (invent.js `enlightenment` final path, `doattributes`
// ^X overlay). The final path is a pure function of urealtime.realtime;
// the in-progress path adds timet_delta(getnow(), start_timing), pinned
// here via a fixed game.datetime so no wall clock leaks in. Shapes below
// are the C `:300–312` doc-comment examples. Display/menu plumbing is
// covered by corpus verify (`--fn fmt_elapsed_time`), not here.
describe("fmt_elapsed_time (insight.c:313-358)", () => {
  let saved;
  beforeEach(() => {
    saved = { urealtime: game.urealtime, datetime: game.datetime };
  });
  afterEach(() => {
    game.urealtime = saved.urealtime;
    if (saved.datetime === undefined) delete game.datetime;
    else game.datetime = saved.datetime;
  });

  it("zero fields give ' none' (C :334, should never happen)", () => {
    game.urealtime = { realtime: 0, start_timing: 0 };
    assert.equal(fmt_elapsed_time(1), " none");
  });

  it("C doc-comment shapes (C :300-312)", () => {
    game.urealtime = { realtime: 0, start_timing: 0 };
    const set = (s) => { game.urealtime = { realtime: s, start_timing: 0 }; };
    set(20);
    assert.equal(fmt_elapsed_time(1), " 20 seconds");
    set(15 * 60 + 5);
    assert.equal(fmt_elapsed_time(1), " 15 minutes and 5 seconds");
    set(16 * 60);
    assert.equal(fmt_elapsed_time(1), " 16 minutes");
    set(3600 + 15 * 60 + 10);
    assert.equal(fmt_elapsed_time(1), " 1 hour, 15 minutes and 10 seconds");
    set(2 * 3600 + 1);
    assert.equal(fmt_elapsed_time(1), " 2 hours and 1 second");
    set(3 * 86400 + 25 * 60 + 40);
    assert.equal(fmt_elapsed_time(1), " 3 days, 25 minutes and 40 seconds");
  });

  it("two fields join with ' and', three with ',' then ' and' (C :335-352)", () => {
    game.urealtime = { realtime: 0, start_timing: 0 };
    const set = (s) => { game.urealtime = { realtime: s, start_timing: 0 }; };
    set(86400);
    assert.equal(fmt_elapsed_time(2), " 1 day");
    set(86400 + 3600);
    assert.equal(fmt_elapsed_time(1), " 1 day and 1 hour");
    // The " and" here comes from the hours arm (fieldcnt == 2 after the
    // day decrement, C :341-346); the minutes arm adds nothing more.
    set(86400 + 3600 + 60);
    assert.equal(fmt_elapsed_time(1), " 1 day, 1 hour and 1 minute");
    set(2 * 86400 + 3 * 3600 + 4 * 60 + 5);
    assert.equal(fmt_elapsed_time(1), " 2 days, 3 hours, 4 minutes and 5 seconds");
  });

  it("in-progress adds the live delta (C :324-325)", () => {
    // Fixed contest clock so getnow() is deterministic.
    game.datetime = "20200115060000";
    const now = getnow();
    game.urealtime = { realtime: 100, start_timing: now - 90 };
    // etim = 100 + 90 = 190.
    assert.equal(fmt_elapsed_time(0), " 3 minutes and 10 seconds");
  });
});
