import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { serMon, deserMonList } from "../js/lev_json.js";
import { W_WEP, NEED_WEAPON } from "../js/const.js";
import { mons, monsterNames } from "../js/monsters.js";
import { objectNames } from "../js/objects.js";

// C ref: save.c:834 savemon (Sfo_monst writes the raw mw pointer — only its
// null/non-null bit is load-bearing) + restore.c:432-444 restmonchn
// (relink mw to the minvent member carrying W_WEP, else MON_NOWEP).
// Cliff: scen-ranged-Rogue-94008 + scen-town-Tourist-94062 both restore a
// segment with a wielding monster; JS dropped mw (serMon skips
// object-valued fields) while the W_WEP mask survived, so the restored
// monster re-wielded ("wields ... (weapon in right hand)!") instead of
// attacking (rnd(20) @ mattacku).
const PM_HILL_ORC = monsterNames.indexOf("PM_HILL_ORC");
const ORCISH_DAGGER = objectNames.indexOf("ORCISH_DAGGER");

const dagger = (mask) => ({
  otyp: ORCISH_DAGGER, quan: 1, owornmask: mask, o_id: 77, nobj: null,
});
const orc = (mask) => ({
  mnum: PM_HILL_ORC, data: mons(PM_HILL_ORC),
  mx: 5, my: 14, mux: 6, muy: 13, mpeaceful: 0,
  weapon_check: NEED_WEAPON, minvent: dagger(mask), mw: null, m_id: 75,
});

describe("mon mw save/restore (restore.c:432-444)", () => {
  it("serMon persists the mw non-null flag", () => {
    const wielding = orc(W_WEP);
    wielding.mw = wielding.minvent;
    assert.equal(serMon(wielding).mw, 1);
    assert.equal(serMon(orc(0)).mw, 0);
  });

  it("deserMon relinks mw to the W_WEP minvent member", () => {
    const wielding = orc(W_WEP);
    wielding.mw = wielding.minvent;
    const back = deserMonList([serMon(wielding)])[0];
    assert.equal(back.mw, back.minvent);
    assert.equal(back.mw.otyp, ORCISH_DAGGER);
  });

  it("deserMon leaves mw empty when nothing was wielded", () => {
    const back = deserMonList([serMon(orc(0))])[0];
    assert.ok(!back.mw);
  });

  it("deserMon MON_NOWEPs a stale flag with no W_WEP member", () => {
    const raw = serMon(orc(0));
    raw.mw = 1; // corrupt-save shape: flag set, mask lost
    const back = deserMonList([raw])[0];
    assert.ok(!back.mw);
  });
});
