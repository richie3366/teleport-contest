import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { InMemoryStorage, vfsWriteFile, vfsReadFile } from "../js/storage.js";
import { yyyymmdd } from "../js/calendar.js";
import { topten } from "../js/topten.js";

// C ref: topten.c topten `:628–926` — the rank-message ordin suffix
// (`:836–837`), the ubirthday birthdate (`:695`), and the HANGUPHANDLING
// HUP gates (`:659–661`, wizard arm `:725–736`). Exercised end-to-end
// through the exported `topten()` with the outentry.test.mjs panel idiom:
// record lines seed the rank loop, a display mock captures the panel.
// RNG-free; runs headless.
function rec(uid, points, name, death) {
  return `3.6.7 ${points} 0 3 3 10 20 0 `
    + `20200101 20200101 ${uid} Bar Hum Mal Neu ${name},${death}\n`;
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

describe("topten rank message + entry fields (topten.c:628-926)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      dungeons: game.dungeons,
      astral_level: game.astral_level,
      knox_level: game.knox_level,
      u: game.u,
      urole: game.urole,
      urace: game.urace,
      plname: game.plname,
      ubirthday: game.ubirthday,
      flags: game.flags,
      program_state: game.program_state,
      nhDisplay: game.nhDisplay,
      mockStorage: game.mockStorage,
    };
    game.dungeons = [
      { dname: "The Dungeons of Doom", depth_start: 1, dunlev_ureached: 5 },
    ];
    game.astral_level = { dnum: 2, dlevel: 1 };
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
    game.ubirthday = 1234567890;
    game.flags = { end_top: 30, end_around: 30, end_own: false };
    game.program_state = {};
    game.mockStorage = new InMemoryStorage();
  });
  afterEach(() => {
    for (const k of Object.keys(saved)) game[k] = saved[k];
  });

  // Render one panel from record lines; collapse C's 15-space wraps.
  function panel(recordBody, how = 0) {
    vfsWriteFile("record", recordBody);
    const disp = mockDisplay();
    game.nhDisplay = disp;
    topten(how, 0, "died");
    return disp.dump().join("\n").replace(/\n\s+/g, " ");
  }

  function tower(n) {
    let body = "";
    for (let i = 0; i < n; i++) {
      body += rec(100 + i, 900 - i * 10, `Hero${i}`, "killed by a kobold");
    }
    return body;
  }

  it("spells the rank>10 place with ordin (13th, 23rd)", () => {
    // C `:836–837` — "You reached the %d%s place", ordin st/nd/rd/th.
    const t13 = panel(tower(12));
    assert.ok(
      t13.includes("You reached the 13th place on the top 100 list."),
      "13th with ordin suffix",
    );
    const t23 = panel(tower(22));
    assert.ok(
      t23.includes("You reached the 23rd place on the top 100 list."),
      "23rd with ordin suffix",
    );
  });

  it("records birthdate from ubirthday, not now", () => {
    // C `:695` — birthdate = yyyymmdd(ubirthday), game-start time.
    panel(tower(2));
    const lines = String(vfsReadFile("record")).split("\n").filter(Boolean);
    const own = lines.find((l) => l.includes("Probe,"));
    assert.ok(own, "player entry was written to the record");
    const parts = own.split(" ");
    assert.strictEqual(Number(parts[9]), yyyymmdd(1234567890), "birthdate");
  });

  it("gates the wizard message on done_hup", () => {
    // C `:725–736` — the wizard/discover message is HUP-gated.
    game.flags = { wizard: true, end_top: 30, end_around: 30, end_own: false };
    const shown = panel("");
    assert.ok(
      shown.includes("score list will not be checked"),
      "wizard message without hangup",
    );
    game.program_state = { done_hup: true };
    vfsWriteFile("record", "");
    const disp = mockDisplay();
    game.nhDisplay = disp;
    topten(0, 0, "died");
    assert.deepStrictEqual(disp.dump(), [], "hung-up wizard prints nothing");
  });
});
