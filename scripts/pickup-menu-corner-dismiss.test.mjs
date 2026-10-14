import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `botl.c` cliff writer (D-3940): C wintty.c erase_menu_or_text `:965–984`
// destroys a corner NHW_MENU via docorner (gbuf resend, status untouched
// unless the menu wrecked rows 22+, `:3716–3720`) — never docrt. The
// query_objlist_pickup inline menu dismissed with docrt()+flush, whose
// botlx+bot() freshened stale botl (T:+1) on the menu key. Corner
// dismissal must keep the stale status row; fullscreen keeps docrt+fresh.
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

async function statusRow23(id, step) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves,
        storage: sharedStorage(),
    });
    const screens = g.getScreens?.() || [];
    assert.ok(screens.length > step, `${id}: only ${screens.length} screens`);
    return decodeScreen(screens[step])[23].map((c) => c.ch).join("").trimEnd();
}

describe("pickup menu corner dismiss keeps stale botl", () => {
    it("scen-shop-Barbarian-49959646 step 557: stale T:91, not fresh T:92", { timeout: 300000 }, async () => {
        assert.equal(
            await statusRow23("scen-shop-Barbarian-49959646", 557),
            "Dlvl:4 $:8000 HP:4(37) Pw:8(8) AC:10 Xp:4/132 T:91",
        );
    });
    it("scen-shop-Barbarian-49959646 step 558: post-menu T:93 converges", { timeout: 300000 }, async () => {
        assert.equal(
            await statusRow23("scen-shop-Barbarian-49959646", 558),
            "Dlvl:4 $:8000 HP:4(37) Pw:8(8) AC:10 Xp:4/132 T:93",
        );
    });
    it("scen-shop-Monk-49959641 step 300 (ESC): stale T:77, not fresh T:78", { timeout: 300000 }, async () => {
        assert.equal(
            await statusRow23("scen-shop-Monk-49959641", 300),
            "Dlvl:5 $:5000 HP:10(19) Pw:11(11) AC:0 Xp:2/36 T:77",
        );
    });
    it("scen-shop-Rogue-49959603 step 219 (letter): stale T:68, not fresh T:69", { timeout: 300000 }, async () => {
        assert.equal(
            await statusRow23("scen-shop-Rogue-49959603", 219),
            "Dlvl:6 $:2000 HP:16(17) Pw:3(3) AC:3 Xp:2/39 T:68",
        );
    });
});
