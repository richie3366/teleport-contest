import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { parsebindings, handler_versinfo } from "../js/options.js";
import { bind_specialkey } from "../js/cmd.js";
import { game } from "../js/gstate.js";
import { bind_param_get } from "../js/dokeylist.js";
import { pushKeys, resetInputState } from "../js/input.js";
import {
  NHKF_GETPOS_MENU,
  MENU_SELECT_ALL,
  VI_BRANCH,
} from "../js/const.js";

// C refs: options.c parsebindings `:7596–7674`, cmd.c bind_specialkey
// `:3194–3205`, options.c handler_versinfo `:6572–6617`.
// Pins the parsebindings restart in C order: quote-aware comma scan,
// tail-first recursion with ret aggregation, first-colon split, the
// mouse1/mouse2 arm (failure falls through to txt2key), txt2key,
// bind_specialkey, the menu-command arm, and the extcmd overlay arm
// (miss records an error and returns FALSE, C :7670-7671). The extcmd
// overlay Map is the
// pre-existing JS keymap-write channel (D-0897/D-2550); mouse, special
// keys, menu aliases and bind params go to their live stores like C.

// Live stores touched: game.Cmd (mousebtn/spkeys/_bindParam),
// game.mappedMenu, game.flags.versinfo.
describe("parsebindings (options.c:7596-7674)", () => {
  let savedCmd, savedMenu, savedFlags;
  beforeEach(() => {
    savedCmd = game.Cmd;
    savedMenu = game.mappedMenu;
    savedFlags = game.flags;
    delete game.Cmd;
    delete game.mappedMenu;
    delete game.flags;
    resetInputState();
  });
  afterEach(() => {
    if (savedCmd === undefined) delete game.Cmd;
    else game.Cmd = savedCmd;
    if (savedMenu === undefined) delete game.mappedMenu;
    else game.mappedMenu = savedMenu;
    if (savedFlags === undefined) delete game.flags;
    else game.flags = savedFlags;
  });

  it("binds one extcmd into the overlay, TRUE (C :7667-7673)", () => {
    const m = new Map();
    assert.equal(parsebindings("a:kick", m), true);
    assert.equal(m.get(97), "kick");
  });

  it("unknown command records an error and returns FALSE (C :7670-7671)", () => {
    const m = new Map();
    assert.equal(parsebindings("a:boguscmd", m), false);
    assert.equal(m.has(97), false);
  });

  it("missing colon returns FALSE outright (C :7631-7632)", () => {
    const m = new Map();
    assert.equal(parsebindings("akick", m), false);
  });

  it("recursion is tail-first: the first binding wins (C :7621-7627)", () => {
    const m = new Map();
    assert.equal(parsebindings("a:kick,a:help", m), true);
    assert.equal(m.get(97), "kick");
  });

  it("a FALSE tail poisons ret but the head still binds (C :7623-7626)", () => {
    const m = new Map();
    assert.equal(parsebindings("a:kick,zzz", m), false);
    assert.equal(m.get(97), "kick");
  });

  it("quoted comma key \\, survives the separator scan (C :7616-7619)", () => {
    const m = new Map();
    assert.equal(parsebindings("a:kick,\\,:help", m), true);
    assert.equal(m.get(97), "kick");
    assert.equal(m.get(44), "help");
  });

  it("quote-quoted comma still fails txt2key like C (FIXME :7048-7051)", () => {
    const m = new Map();
    assert.equal(parsebindings("',':help", m), false);
    assert.equal(m.size, 0);
  });

  it("mouse1 arm writes the live table, TRUE (C :7636-7643)", () => {
    const m = new Map();
    assert.equal(parsebindings("mouse1:clicklook", m), true);
    assert.equal(game.Cmd.mousebtn[0].txt, "clicklook");
    assert.equal(m.size, 0);
  });

  it("failed mouse bind falls through, extcmd miss returns FALSE (C :7638, :7670-7671)", () => {
    // txt2key("mouse1") is M-'o' (239), nonzero, so the fall-through runs
    // the later arms: "boguscmd" misses everywhere, error sunk, FALSE.
    const m = new Map();
    assert.equal(parsebindings("mouse1:boguscmd", m), false);
    assert.equal(game.Cmd?.mousebtn?.[0] ?? null, null);
    assert.equal(m.size, 0);
  });

  it("mouse fall-through can still bind the meta key (C :7638)", () => {
    // "help" lacks MOUSECMD so the mouse arm fails; M-'o' then binds help.
    const m = new Map();
    assert.equal(parsebindings("mouse1:help", m), true);
    assert.equal(game.Cmd?.mousebtn?.[0] ?? null, null);
    assert.equal(m.get(0x80 | 0x6f), "help");
  });

  it("special-key arm writes live spkeys, TRUE (C :7651-7652)", () => {
    const m = new Map();
    assert.equal(parsebindings("x:getpos.menu", m), true);
    assert.equal(game.Cmd.spkeys[NHKF_GETPOS_MENU], 120);
    assert.equal(m.size, 0);
  });

  it("menu-cmd arm with a legal key aliases, TRUE (C :7654-7665)", () => {
    const m = new Map();
    assert.equal(parsebindings("@:menu_select_all", m), true);
    assert.equal(game.mappedMenu.cmds.includes("@"), true);
    assert.equal(
      game.mappedMenu.ops[game.mappedMenu.cmds.indexOf("@")],
      MENU_SELECT_ALL,
    );
    assert.equal(m.size, 0);
  });

  it("menu-cmd arm with an illegal key returns FALSE (C :7657-7658)", () => {
    const m = new Map();
    assert.equal(parsebindings("x:menu_select_all", m), false);
  });

  it("nothing unbinds via the overlay null (C bind_key :2668-2671)", () => {
    const m = new Map();
    assert.equal(parsebindings("a:nothing", m), true);
    assert.equal(m.has(97), true);
    assert.equal(m.get(97), null);
  });

  it("param cuts at the first paren C-exactly, param stored (C :2680-2686)", () => {
    const m = new Map();
    assert.equal(parsebindings("a:toggle(foo)x", m), true);
    assert.equal(m.get(97), "toggle");
    assert.equal(bind_param_get(97), "foo");
  });

  it("rebind clears a stale param (C :2694 via cmdbind_add)", () => {
    const m = new Map();
    assert.equal(parsebindings("a:kick,a:toggle(foo)", m), true);
    assert.equal(m.get(97), "kick");
    assert.equal(bind_param_get(97), null);
  });

  it("nothing clears the param too (C :2670 via cmdbind_remove)", () => {
    const m = new Map();
    assert.equal(parsebindings("a:nothing,a:toggle(foo)", m), true);
    assert.equal(m.get(97), null);
    assert.equal(bind_param_get(97), null);
  });
});

describe("bind_specialkey (cmd.c:3194-3205)", () => {
  let savedCmd;
  beforeEach(() => {
    savedCmd = game.Cmd;
    delete game.Cmd;
  });
  afterEach(() => {
    if (savedCmd === undefined) delete game.Cmd;
    else game.Cmd = savedCmd;
  });

  it("named special key writes spkeys[nhkf], TRUE (C :3201-3202)", () => {
    assert.equal(bind_specialkey(120, "getpos.menu"), true);
    assert.equal(game.Cmd.spkeys[NHKF_GETPOS_MENU], 120);
  });

  it("unknown name returns FALSE (C :3204)", () => {
    assert.equal(bind_specialkey(120, "getpos.bogus"), false);
  });

  it("name match is case-sensitive strcmp (C :3199)", () => {
    assert.equal(bind_specialkey(120, "GETPOS.MENU"), false);
  });
});

describe("handler_versinfo branch gacc (options.c:6593-6601)", () => {
  let savedFlags;
  beforeEach(() => {
    savedFlags = game.flags;
    delete game.flags;
    resetInputState();
  });
  afterEach(() => {
    if (savedFlags === undefined) delete game.flags;
    else game.flags = savedFlags;
  });

  it("'4' (n+'0', n=VI_BRANCH) toggles the branch row", async () => {
    pushKeys(["4", "\r"]);
    assert.equal(await handler_versinfo(), 1); // OPTN_OK (optn_ok, options.c:84)
    assert.equal((game.flags.versinfo & VI_BRANCH) !== 0, true);
  });

  it("'3' matches no row, branch stays clear", async () => {
    pushKeys(["3", "\r"]);
    assert.equal(await handler_versinfo(), 1); // OPTN_OK
    assert.equal(((game.flags.versinfo | 0) & VI_BRANCH), 0);
  });
});
