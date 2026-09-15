import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { InMemoryStorage, vfsWriteFile } from "../js/storage.js";
import { topten } from "../js/topten.js";

// C ref: topten.c outentry `:946–1107` (D-2122-named residual: the
// choked/poisoned/crushed/petrified first-line arms `:992–999` and the
// astral-plane location arm `:1004–1035`). Exercised end-to-end through the
// exported `topten()` (outentry itself is C-static, so it stays local):
// record entries with distinct uids (PERS_IS_UID) seed every arm, a display
// mock captures the panel, and wrapped continuation lines are re-joined
// before asserting. RNG-free; runs headless.
function rec(uid, points, name, deathdnum, deathlev, maxlvl, plgend, death) {
  return `3.6.7 ${points} ${deathdnum} ${deathlev} ${maxlvl} 10 20 0 `
    + `20200101 20200101 ${uid} Bar Hum ${plgend} Neu ${name},${death}\n`;
}

function mockDisplay() {
  const cells = new Map();
  return {
    clearScreen() { cells.clear(); },
    setCell(x, row, ch) {
      if (!cells.has(row)) cells.set(row, []);
      cells.get(row)[x] = ch;
    },
    setCursor() {},
    dump() {
      return [...cells.keys()]
        .sort((a, b) => a - b)
        .map((r) => {
          const arr = cells.get(r) || [];
          let s = "";
          for (let i = 0; i < arr.length; i++) s += arr[i] ?? " ";
          return s.replace(/\s+$/, "");
        });
    },
  };
}

describe("outentry death arms (topten.c:946-1107)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      dungeons: game.dungeons,
      astral_level: game.astral_level,
      knox_level: game.knox_level,
      quest_dnum: game.quest_dnum,
      u: game.u,
      urole: game.urole,
      urace: game.urace,
      plname: game.plname,
      flags: game.flags,
      program_state: game.program_state,
      nhDisplay: game.nhDisplay,
      mockStorage: game.mockStorage,
    };
    game.dungeons = [
      { dname: "The Dungeons of Doom", depth_start: 1, dunlev_ureached: 5 },
      { dname: "Gehennom", depth_start: 1, dunlev_ureached: 0 },
      { dname: "The Elemental Planes", depth_start: 1, dunlev_ureached: 0 },
    ];
    game.astral_level = { dnum: 2, dlevel: 1 };
    game.knox_level = { dnum: 9, dlevel: 1 };
    game.quest_dnum = 7;
    game.u = {
      urexp: 5,
      uz: { dnum: 0, dlevel: 1 },
      uhp: 8,
      uhpmax: 12,
      umortality: 0,
      ualign: { type: 1 },
    };
    game.urole = { filecode: "Bar" };
    game.urace = { filecode: "Hum" };
    game.plname = "Probe";
    game.flags = { end_top: 30, end_around: 30, end_own: false };
    game.program_state = {};
    game.mockStorage = new InMemoryStorage();
  });
  afterEach(() => {
    for (const k of Object.keys(saved)) game[k] = saved[k];
  });

  // Render one panel from record lines; collapse C's 15-space wraps.
  function panel(recordBody) {
    vfsWriteFile("record", recordBody);
    const disp = mockDisplay();
    game.nhDisplay = disp;
    topten(0, 0, "died");
    return disp.dump().join("\n").replace(/\n\s+/g, " ");
  }

  it("chokes with his/her food and keeps the dungeon suffix", () => {
    const text = panel(
      rec(11, 900, "ChokeM", 0, 3, 5, "Mal", "choked on a food ration")
      + rec(12, 890, "ChokeF", 0, 3, 3, "Fem", "choked on a tripe ration"),
    );
    // C `:997–999` — gendered first line, second_line stays TRUE so the
    // location append and the capitalized death second line follow.
    assert.ok(
      text.includes("choked on his food in The Dungeons of Doom on level 3 [max 5]."),
      "male choked arm",
    );
    assert.ok(
      text.includes("choked on her food in The Dungeons of Doom on level 3."),
      "female choked arm",
    );
    assert.ok(text.includes("Choked on a food ration."), "choked second line");
    assert.ok(text.includes("Choked on a tripe ration."), "choked second line F");
  });

  it("ports poisoned/crushed/petrified first lines verbatim", () => {
    const text = panel(
      rec(13, 880, "Poison", 0, 3, 3, "Mal", "poisoned by a rotted corpse")
      + rec(14, 870, "Crush", 0, 3, 3, "Mal", "crushed to death by a boulder")
      + rec(15, 860, "Petri", 0, 3, 3, "Mal", "petrified by a cockatrice"),
    );
    // C `:1000–1005` — fixed strings, not "died".
    assert.ok(
      text.includes("was poisoned in The Dungeons of Doom on level 3."),
      "poisoned arm",
    );
    assert.ok(
      text.includes("was crushed to death in The Dungeons of Doom on level 3."),
      "crushed arm",
    );
    assert.ok(
      text.includes("turned to stone in The Dungeons of Doom on level 3."),
      "petrified arm",
    );
    assert.ok(text.includes("Poisoned by a rotted corpse."), "poisoned second line");
    assert.ok(text.includes("Crushed to death by a boulder."), "crushed second line");
    assert.ok(text.includes("Petrified by a cockatrice."), "petrified second line");
  });

  it("names the astral plane, never dungeon/level", () => {
    const text = panel(
      rec(16, 850, "Astr", 2, -5, -5, "Mal", "killed by a soldier")
      + rec(17, 840, "Watr", 2, -4, -4, "Mal", "killed by a soldier")
      + rec(18, 830, "Fire", 2, -3, -3, "Mal", "killed by a soldier")
      + rec(19, 820, "Air", 2, -2, -2, "Mal", "killed by a soldier")
      + rec(20, 810, "Earth", 2, -1, -1, "Mal", "killed by a soldier")
      + rec(21, 800, "Void", 2, 7, 7, "Mal", "killed by a soldier"),
    );
    // C `:1004–1033` — -5 uses "on the %s Plane", the rest
    // "on the Plane of %s", default Void.
    for (const want of [
      "died on the Astral Plane.",
      "died on the Plane of Water.",
      "died on the Plane of Fire.",
      "died on the Plane of Air.",
      "died on the Plane of Earth.",
      "died on the Plane of Void.",
    ]) assert.ok(text.includes(want), want);
    assert.ok(!text.includes("Elemental Planes"), "no dungeon name on astral rows");
    assert.ok(!text.includes("on level -"), "no level suffix on astral rows");
  });

  it("leaves the ordinary dungeon death line untouched", () => {
    const text = panel(
      rec(22, 790, "Kob", 0, 3, 3, "Mal", "killed by a kobold"),
    );
    // C `:1034–1041` — dname + level + [max] still apply off-astral.
    assert.ok(
      text.includes("died in The Dungeons of Doom on level 3.  Killed by a kobold."),
      "ordinary died line",
    );
  });
});
