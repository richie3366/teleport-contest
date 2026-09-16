import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { wakeup } from "../js/mon.js";

// C ref: mon.c wakeup `:4349` — `finish_meating(mtmp)` runs unconditionally
// after the mimic/undetected block (D-2417: the hero missing a mid-meal pet
// ends the meal via uhitm.c missum `:5215` → wakeup, so the pet's dog_invent
// rates underfoot food on its next turn instead of sitting out a meating
// countdown it should never have kept).
// This file pins that arm headless: an awake mid-meal mock (tame or wild)
// comes out of wakeup with meating cleared, whether or not the wakeup came
// from an attack.
const mockMon = (over = {}) => ({
  msleeping: 0,
  meating: 1,
  mpeaceful: 1,
  mtame: 0,
  m_ap_type: 0,
  mx: 33,
  my: 13,
  data: { mlet: "S_UNICORN" },
  ...over,
});

describe("wakeup ends meals (mon.c:4349 finish_meating)", () => {
  it("clears a tame pet's meal on an attack wakeup (missum shape)", async () => {
    const mon = mockMon({ mtame: 11 });
    await wakeup(mon, true);
    assert.equal(mon.meating, 0);
    assert.equal(mon.mtame, 11);
  });

  it("clears a meal even without an attack", async () => {
    const mon = mockMon({ meating: 3 });
    await wakeup(mon, false);
    assert.equal(mon.meating, 0);
  });

  it("leaves a non-eating monster's state alone", async () => {
    const mon = mockMon({ meating: 0, msleeping: 0 });
    await wakeup(mon, true);
    assert.equal(mon.meating, 0);
    assert.equal(mon.msleeping, 0);
  });
});
