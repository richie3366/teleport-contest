import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: zap.c dobuzz `:4966` — the hero-hit branch tests `Reflecting`,
// which is youprop.h:379-381 `u.uprops[REFLECTING].intrinsic || .extrinsic`
// (conferred by worn.c setworn for amulet/shield/silver-dragon-mail, all
// oc_oprop REFLECTING, and by polyself.c:106 PROPSET for silver-dragon
// form). JS dobuzz read zap.js Reflecting(), whose worn-otyp / polyform
// stand-ins fired even when C's extrinsic was 0.
//
// In scen-worldtour-Ranger-578308 the hero wears an amulet of reflection
// from step 111, but nhlua.c nhl_gamestate's save side runs setnotworn()
// over the whole inventory (clearing every extrinsic) BEFORE memcpy'ing
// `u`, so the stored `u` carries extrinsic 0; the restore side ("Resetting
// time to move #99" at step 599) re-wears (re-setting extrinsic) and then
// memcpy's the stored `u` back over it. Net C effect: worn amulet,
// EReflecting 0 (temp C dump at the gate: uamul=208 umask=10000 E=0, and
// endgame enlightenment shows no reflection). C's breath bolt therefore
// reaches zhitu (d(4,6)) at step 813; JS reflected ("But it reflects from
// your medallion!"). This test pins C's 813 topline (damage + wail).
const ID = "scen-worldtour-Ranger-578308";
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

describe("dobuzz hero-hit Reflecting after gamestate extrinsic loss (zap.c:4966)", () => {
    it(`${ID}: breath hits at step 813, no reflection`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 814, `screens ${screens.length} < 814`);
        assert.equal(
            rowText(screens, 813, 0),
            "The blast of missiles hits you!  Elf, your life force is running out.--More--",
        );
    });
});
