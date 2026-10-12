import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: uhitm.c hmon_hitmon_misc_obj `:1273` — a thrown/spit blinding
// venom that hits (can_blnd true) prints "Splash!" when the hero is Blind
// (youprop.h:103 `(HBlinded||EBlinded)&&!BBlinded`), "The venom blinds X!"
// otherwise. JS read a stale `game.Blind || game.u?.Blind` snapshot
// (written only at save time, do.js:3797) instead of the live Blind()
// import, so a blind hero always took the sighted branch.
// scen-sweep-Samurai-585501: blind cobra-hero `#monster`-spits venom
// north at step 600; C shows "Splash! ...", JS showed
// "The venom blinds it! ...". This test pins C's step-600 topline.
const ID = "scen-sweep-Samurai-585501";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));

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

function rowText(screens, step, r) {
    const g = decodeScreen(screens[step] || "");
    return g[r].map(renderCell).join("").trimEnd();
}

describe("spit venom hit while blind prints Splash (uhitm.c:1273)", () => {
    it(`${ID}: C step-600 topline`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 600, `screens ${screens.length} < 600`);
        assert.equal(
            rowText(screens, 599, 0),
            "Splash!  It hits!  It hits again!  It bites!  It hits!  It hits!",
        );
    });
});
