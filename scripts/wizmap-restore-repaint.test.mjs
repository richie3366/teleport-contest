import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// `do_statusline2` cliff writer: C map_redisplay (detect.c:94–102) is
// reconstrain + docrt + underwater/buried — NO flush. docrt only sets
// disp.botlx ("caller needs to call bot()", display.c:1769–1770), so the
// status repaint lands AFTER wiz_map restores conf/hallu
// (wizcmds.c:194–195). JS's retained flush_screen(1) (D-0128 inertia)
// committed status inside wiz_map's zero-window and consumed botlx, so
// the restore set no flag and the no-Hallu/no-Conf status survived
// until the next turn repaint (D-3785).
//
// scen-sweep-Caveman-95343: ^F at 680 browses the map with hallu zeroed,
// `,` at 682 exits; pre-fix screens 682–684 showed
// `... Xp:30 TermIll` (Hallu missing), back at 685.
// scen-worldtour-Caveman-95226 step 482 (`.` exits the ^F browse):
// same shape with Conf (`... Burdened Stun` pre-fix).
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

async function replay(id) {
    const sess = JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
    const seg = sess.segments[0];
    const g = await runSegment({
        seed: seg.seed, datetime: seg.datetime,
        nethackrc: seg.nethackrc, moves: seg.moves,
        storage: sharedStorage(),
    });
    return g.getScreens?.() || [];
}

function rowN(screens, n, r) {
    return decodeScreen(screens[n])[r].map((c) => c.ch).join("");
}

describe("wizmap exit repaints restored conf/hallu (map_redisplay: no flush)", () => {
    it("95343 step 682 row 23: Hallu survives the ^F-browse exit", { timeout: 300000 }, async () => {
        const screens = await replay("scen-sweep-Caveman-95343");
        assert.ok(screens.length > 685, `only ${screens.length} screens`);
        // C recorded `Water $:0 HP:56(180) Pw:110(123) AC:10 Xp:30 TermIll Hallu`;
        // pre-fix JS committed `... TermIll` (no Hallu) on 682–684.
        for (const n of [682, 683, 684, 685]) {
            assert.ok(rowN(screens, n, 23).includes("TermIll Hallu"),
                `step ${n} lost Hallu: ${JSON.stringify(rowN(screens, n, 23).slice(0, 70))}`);
        }
    });

    it("95226 step 482 row 23: Conf survives the ^F-browse exit", { timeout: 300000 }, async () => {
        const screens = await replay("scen-worldtour-Caveman-95226");
        assert.ok(screens.length > 482, `only ${screens.length} screens`);
        // C recorded `... Xp:30 Burdened Conf Stun`;
        // pre-fix JS committed `... Burdened Stun` (no Conf).
        assert.ok(rowN(screens, 482, 23).includes("Burdened Conf Stun"),
            `step 482 lost Conf: ${JSON.stringify(rowN(screens, 482, 23).slice(0, 70))}`);
    });
});
