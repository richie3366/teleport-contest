import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  num_extinct,
  num_gone,
  genocided_prompt,
  genocided_title,
  genocided_line,
} from "../js/insight.js";
import { G_GENOD, G_EXTINCT, G_GONE } from "../js/const.js";
import { NUMMONS, mons, G_UNIQ, monsterNames } from "../js/monsters.js";
import { game } from "../js/gstate.js";

// C ref: insight.c list_genocided `:3007–3131` — the ngone>0 menu arm
// (queue row: scen-wish-Samurai-92088 step 272 asks the genocided-list yn
// where JS asked the conduct yn). This file pins the headless envelope:
// census masks, prompt/title/line strings. The yn + NHW_MENU display and
// set_vanq_order pick-one menu are covered by corpus verify
// (`--fn list_genocided`), not here.
const PM_HIGH_CLERIC = monsterNames.indexOf("PM_HIGH_CLERIC");

function uniqIndex() {
  for (let i = 0; i < NUMMONS; i++) {
    if (i === PM_HIGH_CLERIC) continue;
    if ((mons(i)?.geno ?? 0) & G_UNIQ) return i;
  }
  throw new Error("no unique monster in data");
}

describe("genocided census (insight.c:2952-3002)", () => {
  let savedMvitals;
  beforeEach(() => {
    savedMvitals = game.mvitals;
    game.mvitals = [];
  });
  afterEach(() => {
    game.mvitals = savedMvitals;
  });

  const flag = (i, f) => {
    game.mvitals[i] = { mvflags: f, died: 0 };
  };

  it("num_extinct counts exactly-extinct non-uniques only", () => {
    const u = uniqIndex();
    flag(0, G_EXTINCT);
    flag(1, G_EXTINCT);
    flag(2, G_GENOD); // genocided, not extinct
    flag(3, G_GENOD | G_EXTINCT); // G_GONE != G_EXTINCT: not counted
    flag(u, G_EXTINCT); // uniques never reported extinct
    assert.equal(num_extinct(), 2);
  });

  it("num_gone collects mask hits in index order, skipping uniques", () => {
    const u = uniqIndex();
    flag(0, G_EXTINCT);
    flag(1, G_EXTINCT);
    flag(2, G_GENOD);
    flag(3, G_GENOD | G_EXTINCT);
    flag(u, G_GENOD);
    assert.deepEqual(num_gone(G_GENOD), [2, 3]);
    assert.deepEqual(num_gone(G_GONE), [0, 1, 2, 3]);
  });

  it("num_gone is empty when nothing matches", () => {
    assert.deepEqual(num_gone(G_GENOD), []);
    assert.equal(num_extinct(), 0);
  });
});

describe("genocided strings (insight.c:3043-3103)", () => {
  let savedMvitals;
  beforeEach(() => {
    savedMvitals = game.mvitals;
    game.mvitals = [];
  });
  afterEach(() => {
    game.mvitals = savedMvitals;
  });

  it("prompt names genocided, extinct, or both", () => {
    assert.equal(
      genocided_prompt(0, 2),
      "Do you want a list of species genocided?",
    );
    assert.equal(
      genocided_prompt(3, 0),
      "Do you want a list of extinct species?",
    );
    assert.equal(
      genocided_prompt(3, 2),
      "Do you want a list of species genocided and extinct?",
    );
  });

  it("title names Genocided, Extinct, or both", () => {
    assert.equal(genocided_title(2, 0), "Genocided species:");
    assert.equal(genocided_title(0, 3), "Extinct species:");
    assert.equal(genocided_title(2, 3), "Genocided or extinct species:");
  });

  it("line is the plural name, (extinct) only when GENOD is clear", () => {
    game.mvitals[0] = { mvflags: G_GENOD, died: 0 };
    assert.equal(genocided_line(0), " giant ants");
    game.mvitals[0] = { mvflags: G_EXTINCT, died: 0 };
    assert.equal(genocided_line(0), " giant ants (extinct)");
    game.mvitals[0] = { mvflags: G_GENOD | G_EXTINCT, died: 0 };
    assert.equal(genocided_line(0), " giant ants");
  });
});
