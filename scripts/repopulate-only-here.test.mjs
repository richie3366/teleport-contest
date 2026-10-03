import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { nhgetch, pushKeys, resetInputState } from "../js/input.js";
import { repopulate_perminvent, display_binventory } from "../js/invent.js";
import { WIN_ERR, InvOptNone } from "../js/const.js";
import { objectNames, FOOD_CLASS } from "../js/objects.js";

// C ref: invent.c repopulate_perminvent `:3455–3460` + only_here `:5476–5480`
// (D-3392): the (void) display_pickinv(NULL,0,0,FALSE,FALSE,0) dispatch
// (`:3094` wizid || WIN_INVEN==WIN_ERR → cached menu branch, else the
// WIN_INVEN PERMINV branch) and the display_binventory `:5541` buried
// filter (go.only set/filter/reset `:5536–5543`).
// Headless coverage: dispatch routing + gi epilogue state + return counts
// + go.only lifecycle (untouched on n==0, reset on n>0). Menu paint
// content is a headless no-op (display() null); it stays session-gated,
// like the D-1444 binventory path itself.
const RATION = objectNames.indexOf("FOOD_RATION");
const WIN_INVEN_OK = 20; // WIN_INVEN_ID, local const js/invent.js:442

const mkburied = (ox, oy, nobj = null) => ({
  otyp: RATION,
  oclass: FOOD_CLASS,
  quan: 1,
  ox,
  oy,
  nobj,
});

describe("repopulate_perminvent dispatch + only_here wiring (invent.c)", () => {
  let saved;
  beforeEach(() => {
    assert.ok(RATION >= 0, "FOOD_RATION otyp exists");
    saved = {
      flags: game.flags,
      iflags: game.iflags,
      invent: game.invent,
      level: game.level,
      gi: game.gi,
      only: game.only,
      winInven: game.WIN_INVEN,
    };
    game.flags = {};
    game.iflags = {};
    game.invent = [];
    game.level = undefined;
    game.gi = {};
    game.only = undefined;
    game.WIN_INVEN = WIN_ERR;
    resetInputState();
  });
  afterEach(() => {
    game.flags = saved.flags;
    game.iflags = saved.iflags;
    game.invent = saved.invent;
    game.level = saved.level;
    game.gi = saved.gi;
    game.only = saved.only;
    game.WIN_INVEN = saved.winInven;
    resetInputState();
  });

  it("binventory: no buried → 0, game.only untouched (C :5535 if(n) gate)", async () => {
    game.only = { x: 9, y: 9 };
    assert.equal(await display_binventory(5, 5, false), 0);
    assert.deepEqual(game.only, { x: 9, y: 9 });
    await assert.rejects(nhgetch(), /Input queue empty/);
  });

  it("binventory: 2 buried here + 1 elsewhere → 2, only reset, one prompt", async () => {
    const away = mkburied(7, 7);
    const here2 = mkburied(5, 5, away);
    const here1 = mkburied(5, 5, here2);
    game.level = { buriedobjlist: here1, at: () => null };
    pushKeys([" "]);
    assert.equal(await display_binventory(5, 5, false), 2);
    assert.deepEqual(game.only, { x: 0, y: 0 });
    await assert.rejects(nhgetch(), /Input queue empty/);
  });

  it("repopulate: PERMINV branch stores gi epilogue, in_sync restored", async () => {
    game.WIN_INVEN = WIN_INVEN_OK;
    game.iflags = { perminv_mode: InvOptNone };
    // Headless has no terminal, so ttyinv_create_window takes its
    // too-small path with a fire-and-forget `void tty_wait_synch()`
    // (pre-existing D-1646 plumbing, not this port): feed its getret
    // one space, then drain a macrotask so the floated chain (dynamic
    // import + nhgetch) settles before the exact-consumption assert.
    pushKeys([" "]);
    await repopulate_perminvent();
    assert.ok(Array.isArray(game.gi.perminvent_entries));
    assert.ok(Array.isArray(game.gi.perminvent_listed));
    assert.equal(game.gi.in_sync_perminvent, 0);
    await new Promise((r) => setTimeout(r, 25));
    await assert.rejects(nhgetch(), /Input queue empty/);
  });

  it("repopulate: WIN_INVEN==WIN_ERR → cached branch, empty invent, no throw", async () => {
    game.WIN_INVEN = WIN_ERR;
    assert.equal(await repopulate_perminvent(), undefined);
  });

  it("repopulate: wizid alone takes the cached branch (valid WIN_INVEN)", async () => {
    game.WIN_INVEN = WIN_INVEN_OK;
    game.flags = { wizard: true };
    game.iflags = { override_ID: 1 };
    assert.equal(await repopulate_perminvent(), undefined);
  });
});
