import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  randomkey,
  reset_randomkey,
  random_response,
  pgetchar,
} from "../js/cmd.js";
import { cmd_from_dir } from "../js/dokeylist.js";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { pushKey } from "../js/input.js";
import { MV_WALK, MV_RUN, MV_RUSH } from "../js/const.js";

// C ref: cmd.c randomkey `:3517–3578` + cmd_from_dir `:3029–3032` (D-2480).
// Debug-fuzzer-only code (iflags.debug_fuzzer, never set in sessions), so
// the test pins the C-order RNG stream and key tables headless: dispatch
// rn2(16) then arm draws, ^A/^P repeat gate, extcmdlist cycle with the
// donull sentinel, and (dir, mode) → bound movement key.
describe("randomkey (cmd.c:3517-3578)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      program_state: game.program_state,
      iflags: game.iflags,
      trace: globalThis.__NH_RNG_TRACE,
    };
    game.program_state = { input_state: 0 };
    game.iflags = {};
    globalThis.__NH_RNG_TRACE = true;
    reset_randomkey();
  });
  afterEach(() => {
    game.program_state = saved.program_state;
    game.iflags = saved.iflags;
    globalThis.__NH_RNG_TRACE = saved.trace;
    reset_randomkey();
  });

  it("cmd_from_dir returns the bound movement key per mode", () => {
    assert.equal(cmd_from_dir(0, MV_WALK), 104); // h
    assert.equal(cmd_from_dir(4, MV_WALK), 108); // l
    assert.equal(cmd_from_dir(0, MV_RUN), 72); // H = highc(h)
    assert.equal(cmd_from_dir(0, MV_RUSH), 8); // ^H = C(h)
    assert.equal(cmd_from_dir(8, MV_WALK), 0); // off-table guard
    assert.equal(cmd_from_dir(0, 9), 0); // off-mode guard
  });

  it("draws the C-order stream headless (dispatch then arm)", () => {
    initRng(12345);
    enableRngLog();
    const vals = [];
    for (let k = 0; k < 8; k++) vals.push(randomkey());
    // case9 '#', case5 tab, case7 'A', case5 space, case7 'Z',
    // case5 space, case13 '6', case0 '\n'
    assert.deepEqual(vals, [35, 9, 65, 32, 90, 32, 54, 10]);
    const log = getRngLog();
    assert.match(log[0], /^rn2\(16\)=9 @ randomkey\(/);
    assert.match(log[2], /^rn2\(2\)=1 @ randomkey\(/);
    assert.match(log[4], /^rn2\(26\)=0 @ randomkey\(/);
  });

  it("stays in key-code range and always draws", () => {
    initRng(999);
    enableRngLog();
    const before = getRngLog().length;
    for (let k = 0; k < 500; k++) {
      const v = randomkey();
      assert.ok(Number.isInteger(v) && v >= 0 && v <= 255, `key ${v}`);
    }
    assert.ok(getRngLog().length - before > 500);
  });

  it("repeats ^A/^P under commandInp (C-order gate)", () => {
    game.program_state = { input_state: 1 }; // commandInp
    initRng(7);
    enableRngLog();
    let first = -1;
    for (let k = 0; k < 2000 && first < 0; k++) {
      const v = randomkey();
      if (v === 1 || v === 16) first = v;
    }
    assert.equal(first, 16); // case14 rnd(127) lands ^P first (seed 7)
    const follow = [];
    for (let k = 0; k < 6; k++) follow.push(randomkey());
    assert.deepEqual(follow, [16, 16, 16, 16, 16, 16]);
  });

  it("random_response terminates with at most sz-1 chars", () => {
    initRng(4242);
    enableRngLog();
    reset_randomkey();
    const out = random_response(10);
    assert.equal(typeof out, "string");
    assert.ok(out.length <= 9);
    assert.ok(getRngLog().length > 0);
  });

  it("pgetchar serves the fuzzer arm or the queued key", async () => {
    game.iflags = { debug_fuzzer: 1 };
    initRng(1);
    reset_randomkey();
    const fuzz = await pgetchar();
    assert.ok(Number.isInteger(fuzz) && fuzz >= 0 && fuzz <= 255);
    game.iflags = {};
    pushKey(65);
    assert.equal(await pgetchar(), 65);
  });
});
