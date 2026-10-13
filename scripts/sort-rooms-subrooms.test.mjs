// sort_rooms must preserve subrooms: C mklev.c:210-228 qsorts only the
// first nroom entries of svr.rooms IN PLACE, so subrooms at
// rooms[MAXNROFROOMS+1 ..] (levl roomnos 44+) survive. JS slice-assigned
// rooms[0..nroom), deleting them: in_rooms/IS_SHOP/shop_keeper/costly_spot
// then saw no shop, so arrival in a subroom shop printed no greeting and
// no "(for sale)" price (scen-sweep-Healer-585512 step 669: C greets
// Jonzac behind --More--, JS concatenated "You see here a crude dagger").
// Covers: Healer-585512@669 (rooms[41]/[42] shop linkage + arrival More).
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

const id = "scen-sweep-Healer-585512";
const at = 669;
const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    "utf8"));
const seg = sess.segments[0];

// Truncated replay (screen[N] state = after N keys): arrival on level 7.
const g = await runSegment({
    seed: seg.seed, datetime: seg.datetime,
    nethackrc: seg.nethackrc, moves: [...seg.moves].slice(0, at).join(""),
    storage: undefined,
});
const { game } = await import("../js/gstate.js");
const { SHOPBASE } = await import("../js/const.js");
const { in_rooms } = await import("../js/hack.js");

// Subroom shops survive sort_rooms in the flat C-indexed table.
for (const idx of [41, 42]) {
    const r = game.level.rooms[idx];
    assert.ok(r && (r.rtype | 0) >= SHOPBASE,
        `${id}@${at}: want rooms[${idx}] shop rtype>=${SHOPBASE}, got ${r && r.rtype}`);
}
// Arrival square resolves into the shop; shop-entry state is set.
assert.ok((in_rooms(69, 3, SHOPBASE) || "") !== "",
    `${id}@${at}: want in_rooms(69,3,SHOPBASE) non-empty`);
assert.ok((game.u?.ushops || "") !== "",
    `${id}@${at}: want u.ushops non-empty, got ${JSON.stringify(game.u?.ushops)}`);
// User-visible symptom: the shop greeting queues behind --More--.
const screens = g.getScreens?.() || [];
const top = String(screens[at] || "").replace(/\u001b\[[0-9;]*[A-Za-z]/g, "")
    .replace(/\u000e|\u000f/g, "").split("\n")[0];
assert.equal(top, "You materialize on a different level!--More--",
    `${id}@${at}: want arrival More, got ${JSON.stringify(top)}`);
console.log(`ok ${id}@${at}`);
console.log("PASS sort-rooms-subrooms");
