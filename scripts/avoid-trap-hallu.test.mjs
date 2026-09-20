import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { pushKeys, resetInputState } from "../js/input.js";
import { avoid_trap_andor_region } from "../js/hack.js";
import { PARANOID_TRAP, ROOM, BEAR_TRAP } from "../js/const.js";
import { MZ_MEDIUM } from "../js/monsters.js";

// C ref: hack.c avoid_trap_andor_region `:2553–2580` (trap arm).
// C names the prompt with defsyms[trap_to_defsym(traptype)].explanation
// (`:2571`) — under Hallucination traptype is C's own rnd(TRAPNUM-1) pick
// (`:2565`) and the name is NOT re-rolled: C trapname(t, TRUE) is the
// identical expression (override skips the hallu branch). The pre-fix JS
// called trapname(traptype) without override, so a hallucinating hero was
// asked about display-RNG garbage («whoopie cushion», «imperial fleet»)
// instead of the picked trap. Pins the headless envelope: timeout
// hallucination (HHallucination, the flavor both Hallucination() readers
// honor), one tseen bear trap, ParanoidTrap on, decline with 'n' → TRUE,
// move = 0, exact C prompt, exactly one core draw.
describe("avoid_trap_andor_region trap prompt (hack.c:2553-2580)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      youmonst: game.youmonst,
      flags: game.flags,
      context: game.context,
      moves: game.moves,
      fmon: game.fmon,
      objects: game._objects_at,
      regions: game.regions,
      level: game.level,
      pending: game._pending_message,
    };
    resetInputState();
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.flags = saved.flags;
    game.context = saved.context;
    game.moves = saved.moves;
    game.fmon = saved.fmon;
    game._objects_at = saved.objects;
    game.regions = saved.regions;
    game.level = saved.level;
    game._pending_message = saved.pending;
    resetInputState();
  });

  const setup = ({ seed, hallu }) => {
    initRng(seed);
    enableRngLog();
    game.u = {
      ux: 10, uy: 10, dx: 1, dy: 0,
      uz: { dnum: 0, dlevel: 1 },
      ...(hallu ? { HHallucination: 1 } : {}),
    };
    // Medium, solid, grounded hero: not TRAP_CLEARLY_IMMUNE to the bear
    // trap, so the `:2560` gate passes on immunity grounds alone (an
    // empty data {} reads as tiny → C would skip the prompt too).
    game.youmonst = { data: { msize: MZ_MEDIUM } };
    game.flags = { paranoia_bits: PARANOID_TRAP };
    game.context = {};
    game.moves = 100;
    game.fmon = [];
    game._objects_at = new Map();
    game.regions = [];
    game._pending_message = "";
    game.level = {
      at: () => ({ typ: ROOM, doormask: 0, roomno: 0, flags: 0, seenv: 1 }),
      flags: {},
      traps: [{ tx: 11, ty: 10, ttyp: BEAR_TRAP, tseen: 1, madeby_u: 0 }],
      rooms: [],
    };
  };

  it("hallucinating: prompt names C's rnd pick, one core draw, move stopped", async () => {
    setup({ seed: 4242, hallu: true });
    pushKeys(["n"]);
    const ret = await avoid_trap_andor_region(11, 10);
    // Decline → C TRUE + nomul(0), move = 0 (`:2574–2577`).
    assert.equal(ret, true);
    assert.equal(game.context.move, 0);
    // C `:2571`: defsym explanation of rnd(25)=11 → 'pit' (into); the
    // pre-fix trapname(traptype) re-roll asked about 'whoopie cushion'.
    assert.equal(game._pending_message, "Really step into that pit? [yn] (n) ");
    // C draws exactly once on core (the `:2565` rnd); the re-roll burned
    // display RNG which also shifted nothing here but misnamed the prompt.
    assert.deepEqual(getRngLog(), ["rnd(25)=11"]);
  });

  it("sober: prompt names the seen trap, no hallu involvement", async () => {
    setup({ seed: 4242, hallu: false });
    pushKeys(["n"]);
    const ret = await avoid_trap_andor_region(11, 10);
    assert.equal(ret, true);
    assert.equal(game.context.move, 0);
    assert.equal(
      game._pending_message,
      "Really step into that bear trap? [yn] (n) ",
    );
    assert.deepEqual(getRngLog(), []);
  });
});
