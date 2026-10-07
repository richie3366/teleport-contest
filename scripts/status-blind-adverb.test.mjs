import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: insight.c status_enlightenment Blind arm `:1059–1072` +
// youprop.h `:97` — Blindfolded_only ≡ (EBlinded && !(HBlinded &&
// !BBlinded)). A worn blindfold alone reads "deliberately blind";
// timed/intrinsic blindness — even combined with a blindfold —
// reads "temporarily blind". JS used a worn-BLINDFOLD-otyp check, so
// scen-impaired-Rogue-94030 (timed blindness + blindfold) printed
// "deliberately" at step 64 where C prints "temporarily".
const ID = "scen-impaired-Rogue-94030";
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

describe("status_enlightenment Blind adverb (insight.c:1065)", () => {
    it(`${ID}: step-64 timed+blindfold reads temporarily, not deliberately`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 65, `screens ${screens.length} < 65`);
        assert.equal(
            rowText(screens, 64, 4),
            " You were temporarily blind because of your blindfold.",
        );
    });
});
