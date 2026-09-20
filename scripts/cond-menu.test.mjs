import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { pushKeys, resetInputState } from "../js/input.js";
import { cond_menu, condtests } from "../js/botl.js";
import { CONDITION_COUNT } from "../js/const.js";

// C ref: botl.c cond_menu `:1376–1454` (D-this-iter):
//  PICK_ANY status-conditions toggle menu; true iff any enabled changed.
//  Sort-change row (a_int 1, 'S') rebuilds under the other comparator;
//  ESC (res -1) discards everything; finish-empty (res 0) disables all
//  still unpicked via the choice reset. Final loop clears test on the
//  leftover idx, not i (C `:1449`).
// Drives the exported menu headless with scripted keys (nhgetch throws
// on an empty queue, so an unexpected extra prompt fails loudly).
// Default order is alphabetical (sortorder 0 → menualpha_cmp): 'a' is
// barehanded (idx 0, disabled); under ranking (sortorder 1 → cond_cmp)
// 'a' is grab (idx 9, ranking 2 — lowest, enabled).
const ESC = 27;

const snapConds = () => condtests.map((c) => [c.enabled, c.choice, c.test]);

describe("cond_menu toggle menu (botl.c:1376-1454)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      flags: game.flags, iflags: game.iflags, gc: game.gc, disp: game.disp,
      conds: snapConds(),
    };
    game.flags = {};
    game.iflags = {};
    game.gc = undefined;
    game.disp = undefined;
    for (const c of condtests) c.choice = false;
    resetInputState();
  });
  afterEach(() => {
    saved.conds.forEach(([enabled, choice, test], i) => {
      condtests[i].enabled = enabled;
      condtests[i].choice = choice;
      condtests[i].test = test;
    });
    game.flags = saved.flags;
    game.iflags = saved.iflags;
    game.gc = saved.gc;
    game.disp = saved.disp;
    resetInputState();
  });

  it("table shape matches C (30 condtests, CONDITION_COUNT 30)", () => {
    assert.equal(CONDITION_COUNT, 30);
    assert.equal(condtests.length, 30);
    assert.equal(condtests[0].useroption, "barehanded");
    assert.equal(condtests[9].useroption, "grab");
  });

  it("ESC at once returns false, changes nothing", async () => {
    pushKeys([ESC]);
    assert.equal(await cond_menu(), false);
    assert.deepEqual(snapConds(), saved.conds);
    assert.equal((game.gc?.condmenu_sortorder | 0), 0);
    // Exactly one key consumed: no rebuilt menu awaiting a 2nd key.
    await assert.rejects(cond_menu(), /Input queue empty/);
  });

  it("'a' + Enter enables barehanded, sets botl", async () => {
    pushKeys(["a", "\r"]);
    assert.equal(await cond_menu(), true);
    assert.equal(condtests[0].enabled, true);
    saved.conds.forEach(([enabled], i) => {
      if (i !== 0) assert.equal(condtests[i].enabled, enabled);
    });
    assert.equal(game.flags.botl, true);
  });

  it("sort toggle rebuilds by ranking; 'a' then disables grab", async () => {
    pushKeys(["S", "\r", "a", "\r"]);
    assert.equal(await cond_menu(), true);
    assert.equal((game.gc?.condmenu_sortorder | 0), 1);
    assert.equal(condtests[9].enabled, false);
    saved.conds.forEach(([enabled], i) => {
      if (i !== 9) assert.equal(condtests[i].enabled, enabled);
    });
  });

  it("sort toggle then ESC returns false but keeps the new order", async () => {
    pushKeys(["S", "\r", ESC]);
    assert.equal(await cond_menu(), false);
    assert.equal((game.gc?.condmenu_sortorder | 0), 1);
    assert.deepEqual(
      condtests.map((c) => c.enabled),
      saved.conds.map(([enabled]) => enabled),
    );
  });
});
