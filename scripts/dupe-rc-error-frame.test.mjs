import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { parseNethackrc, get_configfile, set_configfile_name } from "../js/options.js";
import { game } from "../js/gstate.js";
import { reset_display_messages } from "../js/display.js";
import { flush_pending_config_frame } from "../js/cfgfiles.js";

// C refs: options.c parseoptions `:619–623` (duplicate detection before the
// optfn) + `:6782–6809` (duplicate_opt_detection/complain_about_duplicate),
// cfgfiles.c rcfile `:1943–1945` (config-error frame bracket) +
// parse_conf_buf `:1730` (nextline per physical line) + config_erradd
// `:1577–1588` (origline + ` * Line N:` paints) + config_error_done
// `:1609–1615` (`N error(s) in <configfile>` + wait_synch), pline.c vpline
// `:239` (pre-window pline is raw_print), wintty.c tty_wait_synch
// `:3628–3631` → getret → getline.c xwaitforspace `:230–257` (swallow to
// return). Pins the dupe-rc writer (scen-symset msg_window×2 family, head
// scen-symset-Rogue-50059025): C prints the error frame pre-window, the
// recorder captures it as the step-0 screen, and the prompt eats input to
// the first return — JS must count, paint, and report the same.
function makeDisplay() {
  const cells = new Map();
  return {
    cells,
    clearScreen() { cells.clear(); },
    setCell(x, y, ch) { cells.set(x + "," + y, ch); },
    setCursor() {},
  };
}

function rowText(disp, y) {
  let s = "";
  for (let x = 0; x < 80; x++) {
    const ch = disp.cells.get(x + "," + y);
    if (ch === undefined) break;
    s += ch;
  }
  return s;
}

describe("dupe-rc error frame (parseoptions :621-623 + rcfile :1943-1945)", () => {
  beforeEach(() => {
    reset_display_messages();
    if (!game.iflags) game.iflags = {};
    game.iflags.window_inited = false; // pre-window: C pline is raw_print
    game.nhDisplay = makeDisplay();
  });

  it("counts a repeated compound option and paints the C frame", () => {
    set_configfile_name("/tmp/x"); // short path: the full summary fits 80 cols
    try {
      const rc = parseNethackrc(
        "OPTIONS=msg_window:reversed\nOPTIONS=msg_window:reversed");
      assert.equal(rc.config_errors, 1); // C done :1599 returns n
      const disp = game.nhDisplay;
      assert.equal(rowText(disp, 0), ""); // C :1579 pline("\n%s")
      assert.equal(rowText(disp, 1), "OPTIONS=msg_window:reversed");
      assert.equal(rowText(disp, 2), // C :1587 tag + Line + punct
        " * Line 2: compound option specified multiple times: msg_window.");
      assert.equal(rowText(disp, 3), ""); // C done :1610 pline("\n...")
      assert.equal(rowText(disp, 4), // C done :1610-1612, source NULL → configfile
        "1 error in /tmp/x.");
    } finally {
      set_configfile_name(null); // back to the §1.2 default
    }
  });

  it("reports the default configfile path (env:config-path side)", () => {
    const rc = parseNethackrc(
      "OPTIONS=msg_window:reversed\nOPTIONS=msg_window:reversed");
    assert.equal(rc.config_errors, 1);
    // The 80-col shadow truncates the long default path; the prefix pins it.
    assert.ok(rowText(game.nhDisplay, 4).startsWith("1 error in /Users/"));
    assert.equal(get_configfile().length > 60, true);
  });

  it("single occurrences and dupeok repeats stay silent", () => {
    const single = parseNethackrc("OPTIONS=msg_window:reversed");
    assert.equal(single.config_errors, 0);
    assert.equal(game.nhDisplay.cells.size, 0);
    const dupeok = parseNethackrc("OPTIONS=role:wizard\nOPTIONS=role:priest");
    assert.equal(dupeok.config_errors, 0); // C optlist dupeok-Yes
  });

  it("counts alias spellings under the canonical row (C :602-611)", () => {
    // colour is the alias of color (optlist); both sightings count.
    const rc = parseNethackrc("OPTIONS=color\nOPTIONS=colour");
    assert.equal(rc.config_errors, 1);
    assert.equal(rowText(game.nhDisplay, 2),
      " * Line 2: boolean option specified multiple times: color (via alias: colour).");
  });

  it("counts same-line repeats (C :513-520 comma recursion)", () => {
    const rc = parseNethackrc("OPTIONS=time,time");
    assert.equal(rc.config_errors, 1);
    assert.equal(rowText(game.nhDisplay, 2),
      " * Line 1: boolean option specified multiple times: time.");
  });

  it("counts every physical line incl. blanks (C :1730 before ignoreline)", () => {
    const rc = parseNethackrc("OPTIONS=time\n\nOPTIONS=time");
    assert.equal(rc.config_errors, 1);
    assert.equal(rowText(game.nhDisplay, 2),
      " * Line 3: boolean option specified multiple times: time.");
  });

  it("buffers paints before the display exists, replays on flush (jsmain order)", () => {
    game.nhDisplay = null; // startup rc parse precedes the display install
    const rc = parseNethackrc("OPTIONS=time\nOPTIONS=time");
    assert.equal(rc.config_errors, 1);
    const disp = makeDisplay();
    game.nhDisplay = disp;
    flush_pending_config_frame();
    assert.equal(rowText(disp, 1), "OPTIONS=time");
    assert.equal(rowText(disp, 2),
      " * Line 2: boolean option specified multiple times: time.");
    assert.ok(rowText(disp, 4).startsWith("1 error in "));
  });
});
