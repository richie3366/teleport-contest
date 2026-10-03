import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { tricked_fileremoved } from "../js/save.js";
import { clear_nhwindow_message, getmsghistory } from "../js/display.js";
import { pushKeys, resetInputState } from "../js/input.js";
import { KILLED_BY_AN } from "../js/const.js";

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

// C ref: save.c tricked_fileremoved `:336–347` — vanished-file guard.
// `!nhfp` (C `:339`): pline1(whynot) + pline "Probably someone removed
// it." + Strcpy svk.killer.name + done(TRICKED), returning TRUE; a live
// handle returns FALSE (C `:346`). The TRUE arm is unreachable from
// goto_level (LFILE_EXISTS ⟹ openable), so the wizard path of
// done(TRICKED) — which spares wizards and returns — pins the messages,
// the killer write, and the return value.
describe("tricked_fileremoved (save.c:336-347)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      flags: game.flags,
      iflags: game.iflags,
      killer: game.killer,
      pending: game._pending_message,
      program_state: game.program_state,
    };
    clear_nhwindow_message();
    resetInputState();
    // Three plines (whynot + removed-it + tricky-wizard) overflow the
    // topline into --More--; feed the dismiss key.
    pushKeys(["\n"]);
    game.flags = { wizard: true };
    game.iflags = { window_inited: true };
    game.killer = { name: "", format: 0 };
    game._pending_message = "";
  });
  afterEach(() => {
    game.flags = saved.flags;
    game.iflags = saved.iflags;
    game.killer = saved.killer;
    game._pending_message = saved.pending;
    game.program_state = saved.program_state;
  });

  it("returns false for a live handle without messaging (C :346)", async () => {
    const r = await tricked_fileremoved({ fd: 0 }, "unused whynot");
    assert.equal(r, false);
    assert.equal(game.killer.name, "");
    assert.equal(game._pending_message || "", "");
  });

  it("null handle prints whynot + removed-it and returns true (C :339-344)", async () => {
    const r = await tricked_fileremoved(null, "Cannot open level file.");
    assert.equal(r, true);
    // The three plines overflow the topline; earlier ones scroll into
    // history while the last stays pending.
    const seen = [...drainHistory(), game._pending_message || ""].join("\n");
    assert.match(
      seen,
      /Cannot open level file\./,
      "C :340 pline1(whynot) must print the reason",
    );
    assert.match(
      seen,
      /Probably someone removed it\./,
      "C :341 must print the removed-it follow-up",
    );
  });

  it("killer write is visible to done(TRICKED), which clears it for wizards (C :342-343)", async () => {
    await tricked_fileremoved(null, "Cannot open level file.");
    // C :342 Strcpy lands on svk.killer.name; C done(TRICKED) paniclogs
    // then clears it (JS: end.js clears + wizard pline + return).
    assert.equal(game.killer.name, "");
    assert.equal(game.killer.format, KILLED_BY_AN);
    assert.match(
      game._pending_message || "",
      /very tricky wizard/,
      "wizard must survive done(TRICKED) with the tricky-wizard pline",
    );
  });
});
