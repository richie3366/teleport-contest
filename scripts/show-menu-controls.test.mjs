import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { show_menu_controls } from "../js/dokeylist.js";
import {
  default_menu_cmd_info, get_menu_cmd_key, wc2_supported,
} from "../js/options.js";
import { WC2_MENU_SHIFT } from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: options.c show_menu_controls `:9070–9174` + callees
// get_menu_cmd_key `:8093–8104` and wc2_supported `:9965–9976`.
// Pure text builders over game.windowprocs/game.mappedMenu, so they run
// without a session. Session verify covers the ?j/?l screens.
describe("show_menu_controls", () => {
  let savedWindowprocs;
  let savedMappedMenu;
  beforeEach(() => {
    savedWindowprocs = game.windowprocs;
    savedMappedMenu = game.mappedMenu;
    delete game.windowprocs;
    delete game.mappedMenu;
  });
  afterEach(() => {
    if (savedWindowprocs === undefined) delete game.windowprocs;
    else game.windowprocs = savedWindowprocs;
    if (savedMappedMenu === undefined) delete game.mappedMenu;
    else game.mappedMenu = savedMappedMenu;
  });

  it("dolist lists 11 mapped rows plus 5 hardcoded, no shift (tty)", () => {
    const lines = [];
    show_menu_controls(lines, true);
    assert.equal(lines[0], "Menu control keys:");
    // 11 non-shift entries of default_menu_cmd_info + 5 hardcoded
    assert.equal(lines.length, 1 + 11 + 5);
    assert.match(lines[1], /^> {6} Go to next page$/);
    assert.ok(!lines.some((l) => l.includes("{") || l.includes("}")));
    assert.equal(lines[12], "Return  Accept current choice(s) and dismiss menu");
  });

  it("non-dolist paints headers, groups, search typo, Other prefix", () => {
    const lines = [];
    show_menu_controls(lines, false);
    assert.equal(lines[0], "Menu control keys:");
    assert.equal(lines[1], "");
    assert.ok(lines[2].endsWith("Whole  Current") || lines[2].includes("Whole"));
    assert.ok(lines.some((l) => l.startsWith("  Select")));
    assert.ok(lines.some((l) => l.startsWith("   Go to")));
    assert.ok(!lines.some((l) => l.includes("Pan view")));
    // C typo "Exter" is verbatim upstream (:9147)
    assert.ok(lines.some((l) => l.includes("Exter a target string")));
    assert.ok(lines.some((l) => l.startsWith("   Other ")));
  });

  it("menu_shift capability adds shift rows and Pan view", () => {
    game.windowprocs = { wincap2: WC2_MENU_SHIFT };
    assert.equal(wc2_supported("menu_shift"), true);
    const listed = [];
    show_menu_controls(listed, true);
    assert.equal(listed.length, 1 + 13 + 5);
    assert.ok(listed.some((l) => l.includes("}") && l.includes("Pan")));
    const helped = [];
    show_menu_controls(helped, false);
    assert.ok(helped.some((l) => l.includes("Pan view")));
  });

  it("get_menu_cmd_key honors the rebound map, else identity", () => {
    assert.equal(get_menu_cmd_key(">"), ">");
    game.mappedMenu = { cmds: "x", ops: ">" };
    assert.equal(get_menu_cmd_key(">"), "x");
    assert.equal(get_menu_cmd_key("<"), "<");
    const lines = [];
    show_menu_controls(lines, true);
    assert.ok(lines.some((l) => l.startsWith("x ") && l.includes("Go to next page")));
  });

  it("wc2_supported is false for unknown names", () => {
    assert.equal(wc2_supported("no_such_cap"), false);
    assert.equal(default_menu_cmd_info.length, 13);
  });
});
