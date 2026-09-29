import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { bind_mousebtn, cmdq_print } from "../js/cmd.js";
import { game } from "../js/gstate.js";
import { getmsghistory } from "../js/display.js";
import { pushKeys, resetInputState } from "../js/input.js";
import {
  CMDQ_KEY, CMDQ_EXTCMD, CMDQ_DIR, CMDQ_USER_INPUT, CMDQ_INT,
  CQ_CANNED, MOUSECMD, INTERNALCMD, NUM_MOUSE_BUTTONS,
} from "../js/const.js";

// C refs: cmd.c bind_mousebtn `:2624–2659` + cmdq_print `:220–249`.
// bind_mousebtn pins the whole body in C order: range gate, "nothing"
// unbind, ef_txt walk with the MOUSECMD gate (no INTERNALCMD skip —
// clicklook carries it), FALSE when nothing matches. cmdq_print pins
// the debug dump arm per node type through the message history.
function drainHistory() {
  // getmsghistory(true) snapshots AND returns snap[0]; collect it too.
  const lines = [];
  let line = getmsghistory(true);
  while (line !== null) {
    lines.push(line);
    line = getmsghistory(false);
  }
  return lines;
}

describe("bind_mousebtn (cmd.c:2624-2659)", () => {
  let savedCmd;
  beforeEach(() => {
    savedCmd = game.Cmd;
    delete game.Cmd;
  });
  afterEach(() => {
    if (savedCmd === undefined) delete game.Cmd;
    else game.Cmd = savedCmd;
  });

  it("rejects out-of-range buttons without touching the table (C :2628-2631)", () => {
    assert.equal(bind_mousebtn(0, "clicklook"), false);
    assert.equal(bind_mousebtn(3, "clicklook"), false);
    assert.equal(bind_mousebtn(-1, "clicklook"), false);
    assert.equal(game.Cmd?.mousebtn, undefined);
  });

  it("binds the commands_init defaults (C :2758-2759)", () => {
    assert.equal(bind_mousebtn(1, "therecmdmenu"), true);
    assert.equal(bind_mousebtn(2, "clicklook"), true);
    assert.equal(game.Cmd.mousebtn.length, NUM_MOUSE_BUTTONS);
    assert.equal(game.Cmd.mousebtn[0].txt, "therecmdmenu");
    assert.equal(game.Cmd.mousebtn[1].txt, "clicklook");
  });

  it("skips non-MOUSECMD rows, binds despite INTERNALCMD (C :2644-2646)", () => {
    assert.equal(bind_mousebtn(1, "throw"), false); // flags 0, no MOUSECMD
    assert.equal(game.Cmd.mousebtn[0], null);
    // clicklook carries INTERNALCMD and still binds: no such skip in C.
    assert.equal(bind_mousebtn(2, "clicklook"), true);
    assert.notEqual((game.Cmd.mousebtn[1].flags | 0) & INTERNALCMD, 0);
    assert.notEqual((game.Cmd.mousebtn[1].flags | 0) & MOUSECMD, 0);
  });

  it("'nothing' unbinds case-insensitively (C :2636-2638)", () => {
    assert.equal(bind_mousebtn(1, "therecmdmenu"), true);
    assert.equal(bind_mousebtn(1, "NOTHING"), true);
    assert.equal(game.Cmd.mousebtn[0], null);
  });

  it("returns FALSE for an unknown command (C :2659)", () => {
    assert.equal(bind_mousebtn(1, "no-such-command"), false);
    assert.equal(game.Cmd.mousebtn[0], null);
  });
});

describe("cmdq_print (cmd.c:220-249)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      canned: game._cmdq_canned,
      repeat: game._cmdq_repeat,
      iflags: game.iflags,
    };
    game._cmdq_canned = [];
    game._cmdq_repeat = [];
    // vpline drops text pre-window (C :243 raw path); window_inited routes
    // through putmesg into the message ring getmsghistory walks.
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    resetInputState();
    pushKeys([" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]);
  });
  afterEach(() => {
    game._cmdq_canned = saved.canned;
    game._cmdq_repeat = saved.repeat;
    game.iflags = saved.iflags;
    resetInputState();
  });

  it("prints every node in C order, queue untouched (C :225-248)", async () => {
    game._cmdq_canned = [
      { typ: CMDQ_KEY, key: " " },
      { typ: CMDQ_EXTCMD, txt: "clicklook", ec_entry: null },
      { typ: CMDQ_DIR, dirx: 1, diry: -1, dirz: 0 },
      { typ: CMDQ_USER_INPUT, key: "\0" },
      { typ: CMDQ_INT, intval: 42 },
      { typ: 99 },
    ];
    const nodes = game._cmdq_canned.slice();
    const before = drainHistory().length;
    await cmdq_print(CQ_CANNED);
    // tty toplines join short plines with two spaces (update_topl); the
    // 67-char run breaks before (int:42) at the CO-8 bound.
    assert.deepEqual(drainHistory().slice(before), [
      "CQ:0  (key:<space>)  (extcmd:#clicklook)  (dir:1,-1,0)  (userinput)",
      "(int:42)  (ERROR:99)",
    ]);
    assert.deepEqual(game._cmdq_canned, nodes); // read-only walk, C :226
  });

  it("prefers ec_entry ef_txt over the wrapper txt (C :232)", async () => {
    game._cmdq_canned = [
      { typ: CMDQ_EXTCMD, txt: "wrapper", ec_entry: { txt: "therecmdmenu" } },
    ];
    const before = drainHistory().length;
    await cmdq_print(CQ_CANNED);
    assert.deepEqual(drainHistory().slice(before), [
      "CQ:0  (extcmd:#therecmdmenu)",
    ]);
  });
});
