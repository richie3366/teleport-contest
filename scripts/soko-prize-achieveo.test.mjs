// Sokoban prize must record achieveo: C dat/soko1-1.lua:103-109 and
// dat/soko1-2.lua:105-111 place the prize (bag of holding vs amulet of
// reflection) with achievement=1, so create_object records
// soko_prize_oid/otyp + nomerge (sp_lev.c:2404-2412). The JS soko1 loaders
// placed the prize but never stamped it (unlike the three minend loaders),
// so is_soko_prize stayed false and monsters chased the prize: at
// scen-sweep-Knight-585504 step 841 the elf took the amulet instead of the
// ration (C '@' vs JS '$' at (33,17)).
// Covers: Knight-585504@840 (stamp linkage) + @841 (C map row).
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

const id = "scen-sweep-Knight-585504";
const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    "utf8"));
const seg = sess.segments[0];
const strip = (s) => String(s || "").replace(/\u001b\[[0-9;]*[A-Za-z]/g, "")
    .replace(/\u000e|\u000f/g, "");

// Truncated replay (screen[N] state = after N keys): Sokoban prize level.
await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves: [...seg.moves].slice(0, 840).join(""),
    storage: undefined,
});
// NB: destructure game AFTER the run — runSegment reassigns the export.
const { game } = await import("../js/gstate.js");
const { is_soko_prize } = await import("../js/mkobj.js");

// The prize linkage is recorded (D-3904: C soko_oid=950=amu_oid).
const ao = game.context?.achieveo;
assert.ok(ao && (ao.soko_prize_oid | 0) !== 0,
    `${id}@840: want soko_prize_oid recorded, got ${ao && ao.soko_prize_oid}`);
let prize = null;
for (let o = game.fobj; o; o = o.nobj) {
    if ((o.ox | 0) === 36 && (o.oy | 0) === 17
        && (o.o_id | 0) === (ao.soko_prize_oid | 0)) prize = o;
}
assert.ok(prize, `${id}@840: want prize o_id=${ao.soko_prize_oid} on floor at (36,17)`);
assert.equal(prize.otyp | 0, ao.soko_prize_otyp | 0,
    `${id}@840: want prize otyp=${ao.soko_prize_otyp}, got ${prize.otyp}`);
assert.ok(is_soko_prize(prize), `${id}@840: want is_soko_prize true`);
assert.equal(prize.nomerge | 0, 1, `${id}@840: want nomerge=1`);
console.log(`ok ${id}@840 prize oid=${ao.soko_prize_oid}`);

// One more key: the elf takes the ration trail, matching C's map row.
const g = await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves: [...seg.moves].slice(0, 841).join(""),
    storage: undefined,
});
const screens = g.getScreens?.() || [];
assert.ok(strip(screens[841]).includes("pb$@Qg"),
    `${id}@841: want C map row 'pb$@Qg', got ${JSON.stringify(strip(screens[841]).split("\n")[18])}`);
console.log(`ok ${id}@841`);
console.log("PASS soko-prize-achieveo");
