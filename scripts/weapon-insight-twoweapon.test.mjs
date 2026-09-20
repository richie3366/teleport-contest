import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { WEAPON_CLASS } from "../js/objects.js";
import {
  P_LONG_SWORD, P_TWO_WEAPON_COMBAT,
  P_BASIC, P_UNSKILLED, P_ISRESTRICTED,
} from "../js/const.js";
import { weapon_insight } from "../js/invent.js";

// C ref: insight.c weapon_insight `:1352–1369` (D-2609 fix) — the primary
// two-weapon compare builds sfx with a leading space (`" limited by ..."`)
// because enlght_line is plain `%s%s%s%s.` concat. D-2609 shipped both
// primary literals without it, printing `islimited`/`waslimited by`.
// These pins run the live export headless with mocked skill state; extra
// enhance-tip lines are tolerated, the spacing assertion is exact.
const FAKE_OTYP = 9001;

function mockTwoWeapon(primarySkill, twoSkill) {
  game.objects = {
    [FAKE_OTYP]: { oc_class: WEAPON_CLASS, oc_skill: P_LONG_SWORD },
  };
  game.u = {
    uwep: { otyp: FAKE_OTYP, quan: 1 },
    uswapwep: { otyp: FAKE_OTYP, quan: 1 },
    twoweap: true,
    weapon_skills: {
      [P_LONG_SWORD]: { skill: primarySkill, max_skill: 0, advance: 0 },
      [P_TWO_WEAPON_COMBAT]: { skill: twoSkill, max_skill: 0, advance: 0 },
    },
  };
}

describe("weapon_insight primary two-weapon compare spacing (insight.c:1355-1369)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, objects: game.objects };
  });
  afterEach(() => {
    game.u = saved.u;
    game.objects = saved.objects;
  });

  it("twoskl < sklvl arm keeps the space: 'is limited by being ...'", () => {
    mockTwoWeapon(P_BASIC, P_UNSKILLED);
    const lines = weapon_insight(0, {});
    assert.ok(
      lines.some((l) => l.includes("is limited by being unskilled with two weapons")),
      `expected spaced sfx, got: ${JSON.stringify(lines)}`,
    );
    assert.ok(
      !lines.some((l) => l.includes("islimited") || l.includes("waslimited")),
      `missing-space regression: ${JSON.stringify(lines)}`,
    );
  });

  it("twoskl > sklvl arm keeps the space: 'is limited by having no skill ...'", () => {
    mockTwoWeapon(P_ISRESTRICTED, P_BASIC);
    const lines = weapon_insight(0, {});
    assert.ok(
      lines.some((l) => l.includes("is limited by having no skill")),
      `expected spaced sfx, got: ${JSON.stringify(lines)}`,
    );
    assert.ok(
      !lines.some((l) => l.includes("islimited") || l.includes("waslimited")),
      `missing-space regression: ${JSON.stringify(lines)}`,
    );
  });

  it("final tense keeps the space: 'was limited by ...'", () => {
    mockTwoWeapon(P_BASIC, P_UNSKILLED);
    const lines = weapon_insight(1, {});
    assert.ok(
      lines.some((l) => l.includes("was limited by being unskilled with two weapons")),
      `expected spaced sfx, got: ${JSON.stringify(lines)}`,
    );
    assert.ok(
      !lines.some((l) => l.includes("islimited") || l.includes("waslimited")),
      `missing-space regression: ${JSON.stringify(lines)}`,
    );
  });
});
