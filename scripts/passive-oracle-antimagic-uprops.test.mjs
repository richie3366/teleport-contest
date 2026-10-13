import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: uhitm.c passive `:5980–5991` — the Oracle-wrath AD_MAGM arm reads
// `Antimagic`, which is youprop.h:55-57 `u.uprops[ANTIMAGIC].intrinsic ||
// .extrinsic`. JS passive read only the `u.Antimagic/H/E` flats, which the
// worn-cloak-of-MR confer path (confer_oc_oprop, uprops-only per the
// sit.js D-1089 idiom) never sets — so a cloak-wearing hero was hit
// ("You are hit by magic missiles appearing from thin air!" + mdamageu,
// which then shifted the stream via regen_hp's rn2(100)) where C,
// magic-protected, saw "A hail of magic missiles narrowly misses you!".
// In scen-worldtour-Wizard-587319 the Oracle melee lands at step 295
// behind a --More-- and the wrath message shows at step 296. This test
// pins C's recorded 295/296 toplines.
const ID = "scen-worldtour-Wizard-587319";
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

describe("passive Oracle-wrath AD_MAGM with cloak of MR (uhitm.c:5982)", () => {
    it(`${ID}: miss message, not hit, at steps 295-296`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 297, `screens ${screens.length} < 297`);
        assert.equal(
            rowText(screens, 295, 0),
            "You hit the Oracle.  The Oracle gets angry!  The djinni gets angry!--More--",
        );
        assert.equal(
            rowText(screens, 296, 0),
            "A hail of magic missiles narrowly misses you!",
        );
    });
});
