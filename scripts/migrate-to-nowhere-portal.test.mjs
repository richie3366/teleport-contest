import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dog.c migrate_to_level `:887-932` + dungeon.c ledger_no `:1376`.
// A wizard-wished MAGIC_PORTAL keeps dst {-1,-1} (C wizterrainwish never
// assigns dst, objnam.c:3573 — "to nowhere"). C ledger_no on it reads
// svd.dungeons[-1].ledger_start (OOB): the pinned recorder lays svd right
// after svc, and 92-84=8 bytes back from svd is context.jingle[0..4]
// (the improvised instrument tune, music.c:741-747; BSS zeros until first
// played). N = (xint16)(-1 + LE32) keeps only bytes 0,1, which the JS
// tune string mirrors exactly. Valid N migrates (50456037 s802: tune "A"
// → N=64 → dnum 3 dlev 3); invalid N panics exactly like C (95244,
// jingle never played → -1 → matching Oops). D-4003.
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
  const seg = raw.segments[0];
  const { runSegment } = await import("../js/jsmain.js");
  const m = new Map();
  const storage = {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
  };
  const moves = nmoves == null ? seg.moves : seg.moves.slice(0, nmoves);
  const nhGame = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves, storage,
  });
  const gstate = await import("../js/gstate.js");
  return { nhGame, game: gstate.game };
}

describe("to-nowhere portal migration follows the C OOB rule (dog.c:908)", () => {
  it("ghoul through wished portal migrates to jingle ledger 64 (50456037)", { timeout: 180000 }, async () => {
    const { nhGame, game } = await runPrefix("scen-sweep-Archeologist-50456037", 805);
    assert.equal(
      nhGame._panicStack ?? null, null,
      `valid jingle ledger must not panic (got ${String(nhGame._panicStack).split("\n")[0]})`,
    );
    assert.equal(game.context?.jingle, "A", "improvised tune is the last play");
    const { monsterNames } = await import("../js/generated/monsters_data.js");
    const PM_GHOUL = monsterNames.indexOf("PM_GHOUL");
    const onLevel = (game.fmon || []).filter((mt) => mt.data?.mndx === PM_GHOUL);
    assert.equal(onLevel.length, 0, "ghoul left the level");
    const migrant = (game.migrating_mons || []).find((mt) => mt.data?.mndx === PM_GHOUL);
    assert.ok(migrant, "ghoul retired to migrating_mons");
    assert.equal(migrant.mux | 0, 3, "migrant dnum from ledger 64");
    assert.equal(migrant.muy | 0, 3, "migrant dlev from ledger 64");
  });

  it("unplayed jingle panics exactly like C (95244 troll, matching Oops)", { timeout: 180000 }, async () => {
    const { nhGame, game } = await runPrefix("scen-worldtour-Wizard-95244", null);
    assert.equal(game.context?.jingle || "", "", "jingle never played");
    assert.ok(
      String(nhGame._panicStack || "").startsWith(
        "NhPanic: level number out of range [ledger_to_dnum(-1)]",
      ),
      `must panic like C (got ${String(nhGame._panicStack).split("\n")[0]})`,
    );
  });
});
