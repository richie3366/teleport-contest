import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");

// C ref: timeout.c nh_timeout `:670–672` runs ONE loop in property index
// order (for upp = u.uprops; upp < u.uprops + SIZE; upp++): each property's
// -- and expiry arm run at its index. STRANGLED (=19) deaths block on the
// Die? prompt before FAST (=64) prints "slow down" — never the reverse.
// scen-sweep-Ranger-95303 step 957: C «Die? [yn] (n)» vs order-swapped JS
// «You feel yourself slow down.--More--» (D-3789).
const ID = "scen-sweep-Ranger-95303";
const SESS_PATH = new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url);

function sharedStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

function rowText(grid, r) {
    let s = "";
    for (let x = 0; x < 80; x++) s += renderCell(grid[r][x]);
    return s.trimEnd();
}

describe("nh_timeout countdown fires in property index order (timeout.c:670)", () => {
    it(`${ID}: step 957 is the Die? prompt, slow-down follows the 'n' answer`, { timeout: 180000 }, async () => {
        assert.ok(existsSync(SESS_PATH),
            `missing ${ID} session; record it with hidden-proxy record`);
        const SESS = JSON.parse(readFileSync(SESS_PATH, "utf8"));
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length > 958,
            `seg0 replay produced ${screens.length} screens, need step 958`);
        const top957 = rowText(decodeScreen(screens[957]), 0);
        assert.ok(top957.startsWith("Die? [yn] (n)"),
            `step 957 topline is not the Die? prompt: ${JSON.stringify(top957)}`);
        const top958 = rowText(decodeScreen(screens[958]), 0);
        assert.ok(top958.startsWith("OK, so you don't die."),
            `step 958 topline is not the survived prompt: ${JSON.stringify(top958)}`);
    });
});
