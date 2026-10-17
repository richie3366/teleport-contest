import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: windows.c add_menu `:1803–1807` (menu-color patterns replace the
// caller color/attr when use_menu_color, matched against the bare str) +
// wintty.c process_menu_window `:1442–1447` attr_n (the `X - ` selector
// prefix paints plain) + toggle_menu_attr `:1315–1325` (term color/attr
// on at attr_n, off after). The symset probe rc carries
// MENUCOLOR="uncursed"=green, so C's pickinv item rows carry green SGR:
// `b - \x1b[32man uncursed +0 leather jacket (being worn)\x1b[39m`.
// JS painted the whole row plain (no get_menu_coloring at the pickinv
// entry builders). This test pins the colored bytes on the recorded screen.
function loadSession(id) {
    return JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
    ));
}

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

async function replayScreens(sess) {
    const storage = sharedStorage();
    const out = [];
    for (const seg of sess.segments || []) {
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves, storage,
        });
        out.push(...(g.getScreens?.() || []));
    }
    return out;
}

// C ref: objnam.c doname `:1406` Concat(bp, 1, "; slippery)") — Strncat
// is plain strncat (`:70`), which appends at the NUL: the worn paren is
// kept, "(being worn); slippery)". JS sliced the paren (following the
// stale `:72–74` header comment), costing the worldtour-Monk disclosure
// menu one offx column. Pins C's exact bytes on the recorded screen.
describe("display_pickinv MENUCOLOR (windows.c add_menu:1803 + wintty attr_n)", () => {
    it("worldtour-Monk-50056062 step-800 disclose: slippery keeps worn paren", { timeout: 180000 }, async () => {
        const screens = await replayScreens(loadSession("scen-worldtour-Monk-50056062"));
        assert.ok(screens.length > 800, "short replay");
        const s = screens[800];
        const want = "a - a cursed burnt +2 pair of leather gloves (being worn); slippery)";
        assert.ok(
            s.includes(want),
            `slippery bytes wrong (have: ${JSON.stringify(s.split("\n").find((r) => r.includes("leather gloves"))?.slice(0, 130))})`,
        );
    });

    it("Archeologist-50058507 step-23 inventory: uncursed row carries green SGR", { timeout: 180000 }, async () => {
        const screens = await replayScreens(loadSession("scen-symset-Archeologist-50058507"));
        const inv = screens.filter((s) => s.includes("Weapons") && s.includes("(end)"));
        assert.ok(inv.length >= 1, "no inventory screen replayed");
        const want = "b - \x1b[32man uncursed +0 leather jacket (being worn)\x1b[39m";
        for (const s of inv) {
            assert.ok(
                s.includes(want),
                `menu-color SGR missing on pickinv row (have: ${JSON.stringify(s.split("\n").find((r) => r.includes("leather jacket"))?.slice(0, 120))})`,
            );
        }
    });
});
