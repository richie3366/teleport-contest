import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { monmulti } from "../js/weapon.js";
import { matching_launcher, ammo_and_launcher } from "../js/wield.js";
import { objectNames, WEAPON_CLASS } from "../js/objects.js";
import { monsterNames, M2_ELF } from "../js/monsters.js";
import { P_BOW, P_DAGGER } from "../js/const.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";

// C ref: mthrowu.c monmulti `:199–258` + obj.h matching_launcher.
// Guard / is_mplayer / racial arms. Runs headless; the monshoot caller
// (mthrowu.c `:268`, js/mthrowu.js:1464) is covered by session verify.
const DAGGER = objectNames.indexOf("DAGGER");
const ELVEN_ARROW = objectNames.indexOf("ELVEN_ARROW");
const ELVEN_BOW = objectNames.indexOf("ELVEN_BOW");
const PM_PONY = monsterNames.indexOf("PM_PONY");
const PM_WIZARD = monsterNames.indexOf("PM_WIZARD");

game.objects = game.objects ?? {};
game.objects[DAGGER] = { ...(game.objects[DAGGER] ?? {}), oc_skill: P_DAGGER };
game.objects[ELVEN_ARROW] = { ...(game.objects[ELVEN_ARROW] ?? {}), oc_skill: -P_BOW };
game.objects[ELVEN_BOW] = { ...(game.objects[ELVEN_BOW] ?? {}), oc_skill: P_BOW };

const pony = { mndx: PM_PONY };
const daggerStack = () => ({ otyp: DAGGER, quan: 8, oclass: WEAPON_CLASS });

describe("matching_launcher (obj.h:242)", () => {
  const arrow = { otyp: ELVEN_ARROW, oclass: WEAPON_CLASS };
  const bow = { otyp: ELVEN_BOW, oclass: WEAPON_CLASS };
  const dagger = { otyp: DAGGER, oclass: WEAPON_CLASS };

  it("rejects a missing side", () => {
    assert.equal(matching_launcher(null, bow), false);
    assert.equal(matching_launcher(arrow, null), false);
  });

  it("mirrors elven arrow / elven bow skills", () => {
    assert.equal(matching_launcher(arrow, bow), true);
  });

  it("rejects mismatched skills", () => {
    assert.equal(matching_launcher(dagger, bow), false);
  });

  it("ammo_and_launcher still requires ammo", () => {
    assert.equal(ammo_and_launcher(dagger, bow), false);
    assert.equal(ammo_and_launcher(arrow, bow), true);
  });
});

describe("monmulti guard (mthrowu.c:214-220)", () => {
  it("a single missile never multishots", () => {
    assert.equal(
      monmulti({ data: pony, mconf: 0 }, { otyp: DAGGER, quan: 1, oclass: WEAPON_CLASS }, null),
      1,
    );
  });

  it("a confused monster never multishots", () => {
    assert.equal(monmulti({ data: pony, mconf: 1 }, daggerStack(), null), 1);
  });

  it("ammo without its launcher never multishots", () => {
    assert.equal(
      monmulti(
        { data: pony, mconf: 0 },
        { otyp: ELVEN_ARROW, quan: 8, oclass: WEAPON_CLASS },
        null,
      ),
      1,
    );
  });

  it("a plain stackable weapon rolls exactly 1 (rnd(1))", () => {
    initRng(99);
    for (let i = 0; i < 20; i++) {
      assert.equal(monmulti({ data: pony, mconf: 0 }, daggerStack(), null), 1);
    }
  });
});

describe("monmulti is_mplayer arm (mthrowu.c:227-229)", () => {
  it("fake players volley: rnd(2) range, and 2 is reachable", () => {
    initRng(1234);
    const seen = new Set();
    for (let i = 0; i < 60; i++) {
      const n = monmulti({ data: { mndx: PM_WIZARD }, mconf: 0 }, daggerStack(), null);
      assert.ok(n === 1 || n === 2, `mplayer dagger volley in 1..2, got ${n}`);
      seen.add(n);
    }
    assert.ok(seen.has(2), "mplayer +1 arm must fire (2 reachable in seeded stream)");
  });
});

describe("monmulti racial arm (mthrowu.c:251-257)", () => {
  const elf = { mndx: PM_PONY, mflags2: M2_ELF };
  const arrow = () => ({ otyp: ELVEN_ARROW, quan: 8, oclass: WEAPON_CLASS, cursed: false });
  const bow = (spe = 0) => ({
    otyp: ELVEN_BOW, quan: 1, oclass: WEAPON_CLASS, cursed: false, spe,
  });

  it("elf + elven arrow + elven bow never drops to 1", () => {
    initRng(777);
    let min = 99;
    let max = 0;
    for (let i = 0; i < 80; i++) {
      const n = monmulti({ data: elf, mconf: 0 }, arrow(), bow());
      min = Math.min(min, n);
      max = Math.max(max, n);
    }
    // pre-rnd 3 (arrow + bow, lord skipped), rnd(3) in 1..3, +1 racial
    assert.ok(min >= 2, `racial floor is 2, got min ${min}`);
    assert.ok(max <= 4, `racial cap is 4, got max ${max}`);
  });

  it("an enchanted launcher adds rounddiv(spe,3)", () => {
    initRng(4242);
    let min = 99;
    let max = 0;
    for (let i = 0; i < 80; i++) {
      const n = monmulti({ data: elf, mconf: 0 }, arrow(), bow(4));
      min = Math.min(min, n);
      max = Math.max(max, n);
    }
    // pre-rnd 3 + rounddiv(4,3)=1 = 4, rnd(4) in 1..4, +1 racial
    assert.ok(min >= 2 && max <= 5, `enchant volley in 2..5, got ${min}..${max}`);
  });

  it("quan still clamps the volley", () => {
    initRng(777);
    for (let i = 0; i < 80; i++) {
      const n = monmulti(
        { data: elf, mconf: 0 },
        { otyp: ELVEN_ARROW, quan: 2, oclass: WEAPON_CLASS, cursed: false },
        bow(),
      );
      assert.ok(n >= 1 && n <= 2, `clamped to 1..2, got ${n}`);
    }
  });
});
