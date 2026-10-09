import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { nh_timeout } from "../js/timeout.js";
import { heal_legs, set_wounded_legs } from "../js/trap.js";
import { WOUNDED_LEGS, TIMEOUT, LEFT_SIDE, RIGHT_SIDE } from "../js/const.js";

// C ref: youprop.h:136-138 HWounded_legs ≡ uprops[WOUNDED_LEGS].intrinsic
// (single storage) + timeout.c WOUNDED_LEGS arm + do.c heal_legs.
// JS keeps a flat HWounded_legs beside the slot; the ticker used to --
// only the flat, so a #wizintrinsic/beartrap grant expired on the flat
// while the slot kept TIMEOUT — and every flat|slot reader (mount_steed's
// steed.c:228 wounded gate, dokick, pray…) believed the legs wounded
// forever: C "I see nobody there.", JS "Your leg is in no shape for
// riding." (scen-intrinsic-Ranger-92193 @61, scen-normal-Rogue-92209 @33).
describe("wounded-legs flat/slot mirror (timeout.c, do.c heal_legs)", () => {
  let savedU;
  beforeEach(() => {
    savedU = game.u;
    game.u = {};
  });
  afterEach(() => {
    game.u = savedU;
  });

  it("nh_timeout ticks flat and slot in lockstep to zero", async () => {
    // As wizintrinsic/beartrap+sync leave it: both mirrors granted.
    game.u.HWounded_legs = 3;
    game.u.uprops = { [WOUNDED_LEGS]: { intrinsic: 3, extrinsic: 0, blocked: 0 } };
    for (let want = 2; want >= 0; want--) {
      await nh_timeout();
      assert.equal(game.u.HWounded_legs, want);
      assert.equal(game.u.uprops[WOUNDED_LEGS].intrinsic & TIMEOUT, want);
    }
  });

  it("nh_timeout drains a slot-only leftover (self-heal)", async () => {
    game.u.HWounded_legs = 0;
    game.u.uprops = { [WOUNDED_LEGS]: { intrinsic: 2, extrinsic: 0, blocked: 0 } };
    await nh_timeout();
    assert.equal(game.u.uprops[WOUNDED_LEGS].intrinsic & TIMEOUT, 1);
    await nh_timeout();
    assert.equal(game.u.uprops[WOUNDED_LEGS].intrinsic & TIMEOUT, 0);
  });

  it("set_wounded_legs mirrors a fresh wound timeout to the slot", async () => {
    // do.c set_wounded_legs writes C's single HWounded_legs storage; JS
    // must write both mirrors or the ticker's flat|slot OR-read starts
    // from a stale slot.
    await set_wounded_legs(LEFT_SIDE, 33);
    assert.equal((game.u.HWounded_legs | 0) & TIMEOUT, 33);
    assert.equal(
      (game.u.uprops?.[WOUNDED_LEGS]?.intrinsic | 0) & TIMEOUT,
      33,
      "fresh wound must set the uprops slot timeout, not just the flat",
    );
  });

  it("set_wounded_legs refreshes a stale slot when a re-wound extends", async () => {
    // Xan-prick shape (scen-sweep-Barbarian-95337 steps 244-300): wound,
    // tick down, re-wound longer. The flat-only write left the slot at
    // the old remaining, so the ticker's next OR-read inflated the
    // countdown (37|28 = 61) and C healed at step 397 while JS held 9.
    await set_wounded_legs(LEFT_SIDE, 33);
    // Simulate 5 ticker passes (the arm dual-writes, so both move).
    game.u.HWounded_legs = 28;
    if (!game.u.uprops) game.u.uprops = {};
    game.u.uprops[WOUNDED_LEGS] = { intrinsic: 28, extrinsic: 0, blocked: 0 };
    await set_wounded_legs(RIGHT_SIDE, 37);
    assert.equal((game.u.HWounded_legs | 0) & TIMEOUT, 37);
    assert.equal(
      (game.u.uprops?.[WOUNDED_LEGS]?.intrinsic | 0) & TIMEOUT,
      37,
      "extending re-wound must refresh the slot or the OR-read inflates",
    );
    assert.equal(
      ((game.u.HWounded_legs | 0) | (game.u.uprops[WOUNDED_LEGS].intrinsic | 0)) & TIMEOUT,
      37,
      "ticker OR-read must equal the extended timeout, not flat|stale",
    );
  });

  it("set_wounded_legs keeps the longer remaining timeout on a short re-wound", async () => {
    // C: set only when !wounded or remaining < timex (do.c:2439-2440).
    await set_wounded_legs(LEFT_SIDE, 33);
    game.u.HWounded_legs = 28;
    if (!game.u.uprops) game.u.uprops = {};
    game.u.uprops[WOUNDED_LEGS] = { intrinsic: 28, extrinsic: 0, blocked: 0 };
    await set_wounded_legs(RIGHT_SIDE, 5);
    assert.equal((game.u.HWounded_legs | 0) & TIMEOUT, 28);
    assert.equal((game.u.uprops[WOUNDED_LEGS].intrinsic | 0) & TIMEOUT, 28);
  });

  it("heal_legs clears the slot mirror, not just the flats", async () => {
    // Mounted: C suppresses the feel-better message (no display needed).
    game.u.usteed = {};
    game.u.Wounded_legs = true;
    game.u.uprops = { [WOUNDED_LEGS]: { intrinsic: 8, extrinsic: 0, blocked: 0 } };
    await heal_legs(1);
    assert.equal(game.u.HWounded_legs, 0);
    assert.equal(game.u.EWounded_legs, 0);
    assert.equal(game.u.Wounded_legs, false);
    assert.equal(game.u.uprops[WOUNDED_LEGS].intrinsic & TIMEOUT, 0);
  });
});
