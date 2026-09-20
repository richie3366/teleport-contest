import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { racial_exception } from "../js/worn.js";
import { raceptr } from "../js/mondata.js";
import { mons, monsterNames } from "../js/monsters.js";
import { objectNames } from "../js/objects.js";

// C ref: worn.c racial_exception `:1359–1373` + mondata.c raceptr
// `:1359–1365`. Pins the race-vs-form distinction: a non-polymorphed
// hobbit hero reads mons[urace] (`:1362–1363`), not the role form in
// mon.data — C `:1366` compares the race pointer.
const PM_HOBBIT = monsterNames.indexOf("PM_HOBBIT");
const PM_HUMAN = monsterNames.indexOf("PM_HUMAN");
const PM_DWARF = monsterNames.indexOf("PM_DWARF");
const ELVEN_MITHRIL_COAT = objectNames.indexOf("ELVEN_MITHRIL_COAT");
const LEATHER_GLOVES = objectNames.indexOf("LEATHER_GLOVES");

describe("racial_exception hobbit/elven gate (worn.c:1359-1373)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, urace: game.urace, youmonst: game.youmonst };
  });
  afterEach(() => {
    game.u = saved.u;
    game.urace = saved.urace;
    game.youmonst = saved.youmonst;
  });

  // Non-polymorphed hobbit hero whose current form is the human role.
  const hobbitHero = () => {
    game.u = { umonnum: PM_HUMAN, umonster: PM_HUMAN };
    game.urace = { mnum: PM_HOBBIT };
    game.youmonst = { data: mons(PM_HUMAN) };
    return game.youmonst;
  };

  it("non-poly hobbit hero in role form keeps elven armor (race, not form)", () => {
    const hero = hobbitHero();
    assert.equal(raceptr(hero)?.mndx, PM_HOBBIT);
    assert.equal(
      racial_exception(hero, { otyp: ELVEN_MITHRIL_COAT }),
      1
    );
  });

  it("non-poly hobbit hero still refused non-elven armor", () => {
    const hero = hobbitHero();
    assert.equal(racial_exception(hero, { otyp: LEATHER_GLOVES }), 0);
  });

  it("poly'd hobbit hero uses the current form, not the race", () => {
    game.u = { umonnum: PM_DWARF, umonster: PM_HUMAN };
    game.urace = { mnum: PM_HOBBIT };
    game.youmonst = { data: mons(PM_DWARF) };
    assert.equal(raceptr(game.youmonst)?.mndx, PM_DWARF);
    assert.equal(
      racial_exception(game.youmonst, { otyp: ELVEN_MITHRIL_COAT }),
      0
    );
  });

  it("plain hobbit monster keeps elven armor; human hero does not", () => {
    game.u = { umonnum: PM_HUMAN, umonster: PM_HUMAN };
    game.urace = { mnum: PM_HUMAN };
    game.youmonst = { data: mons(PM_HUMAN) };
    const pet = { data: mons(PM_HOBBIT) };
    assert.equal(raceptr(pet)?.mndx, PM_HOBBIT);
    assert.equal(racial_exception(pet, { otyp: ELVEN_MITHRIL_COAT }), 1);
    assert.equal(
      racial_exception(game.youmonst, { otyp: ELVEN_MITHRIL_COAT }),
      0
    );
  });
});
