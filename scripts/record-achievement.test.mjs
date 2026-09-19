import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { record_achievement } from "../js/insight.js";
import { ACH_MINE, ACH_RNK1, N_ACH } from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: insight.c record_achievement `:2407–2472` — append unless duplicate
// abs, sound (compile-time no-op here), livelog unless gameover, impossible
// on out-of-range. This file pins the headless envelope: list membership,
// 0-termination, duplicate suppression (incl. negative rank complements),
// the gameover livelog skip, and the out-of-range no-record arm. Rank-title
// wording and prize names ride on roles/object tables, covered by corpus
// verify (`--fn record_achievement`), not here.
describe("record_achievement (insight.c:2407-2472)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      gamelog: game.gamelog,
      program_state: game.program_state,
      context: game.context,
      moves: game.moves,
    };
    game.u = { ulevel: 5 };
    game.gamelog = [];
    game.program_state = {};
    game.context = { achieveo: {} };
    game.moves = 1;
  });
  afterEach(() => {
    game.u = saved.u;
    game.gamelog = saved.gamelog;
    game.program_state = saved.program_state;
    game.context = saved.context;
    game.moves = saved.moves;
  });

  const ach = () => game.u.uachieved || [];
  const texts = () => (game.gamelog || []).map((e) => e.text);

  it("records a fresh achievement and livelogs its message", () => {
    record_achievement(ACH_MINE);
    assert.deepEqual(ach(), [ACH_MINE, 0]);
    assert.deepEqual(texts(), ["entered the Gnomish Mines"]);
  });

  it("suppresses duplicates by abs value without a second livelog", () => {
    record_achievement(ACH_MINE);
    record_achievement(ACH_MINE);
    assert.deepEqual(ach(), [ACH_MINE, 0]);
    assert.equal(texts().length, 1);
  });

  it("treats a negative rank complement as the same achievement", () => {
    record_achievement(-ACH_RNK1);
    assert.deepEqual(ach(), [-ACH_RNK1, 0]);
    assert.match(texts()[0], /attained the rank of .* \(level 5\)/);
    record_achievement(ACH_RNK1); // abs match: repeat
    assert.deepEqual(ach(), [-ACH_RNK1, 0]);
    assert.equal(texts().length, 1);
  });

  it("records during final disclosure without livelogging", () => {
    game.program_state.gameover = 1;
    record_achievement(ACH_MINE);
    assert.deepEqual(ach(), [ACH_MINE, 0]);
    assert.deepEqual(texts(), []);
  });

  it("out-of-range records nothing and livelogs nothing", async () => {
    const before = ach().slice();
    record_achievement(0);
    record_achievement(N_ACH);
    record_achievement(-99);
    // C `:2419` impossible() is fire-and-forget from sync callers; let it settle.
    await new Promise((r) => setTimeout(r, 50));
    assert.deepEqual(ach(), before);
    assert.deepEqual(texts(), []);
  });
});
