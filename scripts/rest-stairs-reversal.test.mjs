// Level-restore stairs reversal (scen-sweep-Healer-50055044 writer):
// C restore.c rest_stairs :955-985 rebuilds gs.stairs from file order via
// one stairway_add per node (:978-979), whose prepend (stairs.c :22-23)
// leaves the restored chain REVERSED vs the saved one — on every getlev
// (sole caller :1113), i.e. every level revisit, not just save/load.
// JS stashed/restored the live chain by pointer, never reversing, so after
// an odd number of round-trips the first same-dnum stair differed and
// makemon_rnd_goodpos's stairway fallback (makemon.c :1114-1128) planted
// the randomly generated ape on the down stair (47,18) where C planted it
// on the up stair (73,4).
// Covers: scen-sweep-Healer-50055044 step 1195 (map row 5 col 72 Y).
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";
import { monsterNames } from "../js/generated/monsters_data.js";

const PM_APE = monsterNames.indexOf("PM_APE");

const { runSegment } = await import("../js/jsmain.js");

const id = "scen-sweep-Healer-50055044";
const at = 1195;
const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    "utf8"));
const seg = sess.segments[0];

// Truncated replay (screen[N] state = after N keys).
const moves = [...seg.moves].slice(0, at).join("");
const g = await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves, storage: undefined,
});
const { game } = await import("../js/gstate.js");

// Stairs chain is the restored (reversed) order: up stair first.
const stairs = [];
for (let s = game.stairs; s; s = s.next) stairs.push([s.sx, s.sy, !!s.up]);
assert.deepEqual(stairs.map(([x, y]) => [x, y]), [[73, 4], [47, 18]],
    `${id}@${at}: want restored stairs order [(73,4),(47,18)], got ${JSON.stringify(stairs)}`);
assert.equal(stairs[0][2], true, `${id}@${at}: (73,4) is the up stair`);
assert.equal(stairs[1][2], false, `${id}@${at}: (47,18) is the down stair`);

// The randomly generated ape shares the up-stair cell, like C.
const apes = (game.fmon || []).filter((m) => (m.data?.mndx ?? m.mnum) === PM_APE);
assert.ok(apes.length >= 1, `${id}@${at}: want >=1 ape, got ${apes.length}`);
assert.ok(apes.some((m) => m.mx === 73 && m.my === 4),
    `${id}@${at}: want an ape at (73,4), got ${apes.map((m) => `(${m.mx},${m.my})`).join(" ")}`);

// Screen agrees with C: Y (not <) at map (73,4) = screen row 5 col 72.
const screens = g.getScreens?.() || [];
assert.ok(screens.length > at, `${id}: want screen ${at}, got ${screens.length}`);
const grid = decodeScreen(screens[at]);
assert.equal(grid[5][72].ch, "Y",
    `${id}@${at}: want Y at screen(72,5), got ${JSON.stringify(grid[5][72].ch)}`);
