// Symset loader: read_sym_file/parse_sym_line load dat/symbols into the
// primary/rogue carriers with the entry's handling, and map_glyphinfo's
// :2653 arm renders them per wintty.c g_putch + recorder capture.
// Covers the cliffs-head `welcome` writer: 95 scen-symset sessions failed
// at step 0 with C stripped-high-bit cells (IBMGraphics_2 'ZD+DDD?',
// RogueEpyx 'IMMMMMMN;') vs JS ASCII, because optfn_symset carried the
// read_sym_file arm as a named omission.
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";
import { SYMBOLS_TEXT } from "../js/generated/symbols_text.js";
import {
    read_sym_file, parse_sym_line, optfn_symset, allopt_idx,
} from "../js/options.js";
import {
    init_symbols, symset_slot, symset_render_char, map_glyphinfo, cmap_to_glyph,
} from "../js/display.js";
import {
    PRIMARYSET, ROGUESET, H_IBM, H_DEC, H_UTF8,
    S_vwall, S_hwall, S_tlcorn, S_trcorn, S_room, S_corr,
    S_upladder, S_dnladder,
} from "../js/const.js";
import { fill_glyphid_cache, glyphid_cache_status, match_glyph, apply_customizations, free_all_glyphmap_u } from "../js/glyphs.js";

// options.js module-locals (not exported): REQ_DO_SET 2, EMPTY_OPTSTR '',
// OPTN_OK 1, OPTN_ERR 0 (options.js:12514-12518).
const REQ_DO_SET = 2, EMPTY_OPTSTR = "", OPTN_OK = 1, OPTN_ERR = 0;

const SET_NAMES = [...SYMBOLS_TEXT.matchAll(/^start: (\S+)/gm)].map((m) => m[1]);

function freshSymState() {
    game.gs = null;
    game.gc = {};
    game.go = {};
    game.iflags = {};
    game.currentgraphics = PRIMARYSET;
    init_symbols();
    if (!glyphid_cache_status())
        fill_glyphid_cache();
}

function loadPrimary(name) {
    symset_slot(PRIMARYSET).name = name;
    return read_sym_file(PRIMARYSET);
}

describe("symset loader (files.c read_sym_file + symbols.c parse_sym_line)", () => {
    beforeEach(() => {
        freshSymState();
    });

    it("loads IBMGraphics_2 carriers + handling (50058507 step-0 writer)", () => {
        assert.equal(loadPrimary("IBMGraphics_2"), 1);
        const slot = symset_slot(PRIMARYSET);
        assert.equal(slot.name, "IBMGraphics_2");
        assert.equal(slot.handling, H_IBM);
        assert.equal(slot.explicitly, true);
        const car = game.gs.primary_syms;
        assert.equal(car[S_hwall], 0xc4); // S_hwall: \xc4
        assert.equal(car[S_tlcorn], 0xda); // S_tlcorn: \xda
        assert.equal(car[S_trcorn], 0xbf); // S_trcorn: \xbf
        assert.equal(car[S_vwall], 0xb3); // S_vwall: \xb3
        // No S_room line in IBMGraphics_2: default '.' survives the load.
        assert.equal(car[S_room], 0x2e);
        // Rendered per g_putch IBM row + capture strip: 'ZD+DDD?' cells.
        assert.deepEqual(symset_render_char(car[S_tlcorn], slot.handling), { ch: "Z", dec: false });
        assert.deepEqual(symset_render_char(car[S_hwall], slot.handling), { ch: "D", dec: false });
        assert.deepEqual(symset_render_char(car[S_trcorn], slot.handling), { ch: "?", dec: false });
    });

    it("loads RogueEpyx double-line walls (50058509 step-0 writer)", () => {
        assert.equal(loadPrimary("RogueEpyx"), 1);
        const slot = symset_slot(PRIMARYSET);
        assert.equal(slot.handling, H_IBM);
        assert.equal(slot.nocolor, 0); // Color: Yes
        const car = game.gs.primary_syms;
        assert.equal(car[S_tlcorn], 0xc9);
        assert.equal(car[S_hwall], 0xcd);
        assert.deepEqual(symset_render_char(car[S_tlcorn], slot.handling), { ch: "I", dec: false });
        assert.deepEqual(symset_render_char(car[S_hwall], slot.handling), { ch: "M", dec: false });
        // Traps are \x04 (EOT): capture-ignored → cleared space.
        assert.deepEqual(symset_render_char(0x04, slot.handling), { ch: " ", dec: false });
    });

    it("loads DECgraphics exactly (fortress shape)", () => {
        assert.equal(loadPrimary("DECgraphics"), 1);
        const slot = symset_slot(PRIMARYSET);
        assert.equal(slot.handling, H_DEC);
        const car = game.gs.primary_syms;
        assert.equal(car[S_hwall], 0xf1); // meta-q
        assert.equal(car[S_vwall], 0xf8); // meta-x
        assert.equal(car[S_room], 0xfe); // meta-~ (middle dot)
        assert.equal(car[S_corr], 0x23); // no S_corr line: default '#'
        assert.deepEqual(symset_render_char(car[S_hwall], slot.handling), { ch: "q", dec: true });
        assert.deepEqual(symset_render_char(car[S_room], slot.handling), { ch: "~", dec: true });
    });

    it("name matching is case-insensitive (C strcmpi)", () => {
        assert.equal(loadPrimary("ibmgraphics_2"), 1);
        assert.equal(symset_slot(PRIMARYSET).handling, H_IBM);
    });

    it("unknown names fail (caller clears); default names clear + succeed", () => {
        symset_slot(PRIMARYSET).name = "NoSuchSet";
        assert.equal(read_sym_file(PRIMARYSET), 0);
        // C :2661-2663: name stays set, explicitly FALSE (optfn clears).
        assert.equal(symset_slot(PRIMARYSET).name, "NoSuchSet");
        assert.equal(symset_slot(PRIMARYSET).explicitly, false);
        symset_slot(PRIMARYSET).name = "default";
        assert.equal(read_sym_file(PRIMARYSET), 1);
        assert.equal(symset_slot(PRIMARYSET).name, null);
    });

    it("UTF8 sets parse to glyphrep rows, carriers keep defaults", () => {
        assert.equal(loadPrimary("Enhanced2"), 1);
        const slot = symset_slot(PRIMARYSET);
        assert.equal(slot.handling, H_UTF8);
        // H_UTF8 S_ lines route to glyphrep, not the carriers.
        assert.equal(game.gs.primary_syms[S_hwall], 0x2d); // default '-'
    });

    it("Enhanced1 stamps glyphmap u for walls+room (50059006 step-0 writer)", () => {
        // C initoptions_finish `:7376–7381` (options.js:9299): after the
        // load, apply_customizations stamps the filed urep rows onto
        // glyphmap u under the H_UTF8 gate (glyphs.c `:552–560`).
        assert.equal(loadPrimary("Enhanced1"), 1);
        assert.equal(symset_slot(PRIMARYSET).handling, H_UTF8);
        game.iflags.customsymbols = true; // optlist initval true (options.js:12133)
        game.iflags.customcolors = true; // optlist initval true (options.js:12131)
        apply_customizations(PRIMARYSET, 2 | 1); // do_custom_symbols | do_custom_colors
        assert.equal(game.glyphmap?.[cmap_to_glyph(S_hwall)]?.u?.utf8str, "─"); // U+2500
        assert.equal(game.glyphmap?.[cmap_to_glyph(S_vwall)]?.u?.utf8str, "│"); // U+2502
        assert.equal(game.glyphmap?.[cmap_to_glyph(S_tlcorn)]?.u?.utf8str, "┌"); // U+250C
        assert.equal(game.glyphmap?.[cmap_to_glyph(S_room)]?.u?.utf8str, "·"); // U+00B7
        free_all_glyphmap_u(); // clear_symsetentry `:345` teardown; later tests start clean
    });

    it("G_ rows resolve through match_glyph with the startup cache", () => {
        assert.notEqual(match_glyph("G_vwall_sokoban: /blue"), 0);
    });

    it("ROGUESET loads into the rogue carrier (RogueIBM doors/stairs)", () => {
        symset_slot(ROGUESET).name = "RogueIBM";
        assert.equal(read_sym_file(ROGUESET), 1);
        assert.equal(symset_slot(ROGUESET).handling, H_IBM);
        assert.equal(game.gs.rogue_syms[S_hwall], 0xcd);
        // PRIMARYSET carrier untouched by the rogue load.
        assert.equal(game.gs.primary_syms[S_hwall], 0x2d);
    });

    it("optfn_symset do_set runs the C load + failure arms", () => {
        const rc = {};
        const ok = optfn_symset(
            allopt_idx("symset"), REQ_DO_SET, false, "OPTIONS=symset:IBMgraphics",
            "IBMgraphics", rc, true);
        assert.equal(ok, OPTN_OK);
        assert.equal(rc.symset, "IBMgraphics");
        assert.equal(symset_slot(PRIMARYSET).handling, H_IBM);
        const rc2 = {};
        const bad = optfn_symset(
            allopt_idx("symset"), REQ_DO_SET, false, "OPTIONS=symset:Nope",
            "Nope", rc2, true);
        assert.equal(bad, OPTN_ERR);
        assert.equal(symset_slot(PRIMARYSET).name, null);
        const empty = optfn_symset(
            allopt_idx("symset"), REQ_DO_SET, false, "", EMPTY_OPTSTR, {}, true);
        assert.equal(empty, OPTN_ERR); // valueless → OPTN_ERR
    });

    it("every embedded symset renders wire-safe cells (no C0 controls)", () => {
        assert.ok(SET_NAMES.length >= 14);
        for (const name of SET_NAMES) {
            freshSymState();
            symset_slot(PRIMARYSET).name = name;
            assert.equal(read_sym_file(PRIMARYSET), 1, `load ${name}`);
            const h = symset_slot(PRIMARYSET).handling | 0;
            // H_UNK sets (plain, AmigaFont) keep handling 0 — no Handling: line.
            for (const v of game.gs.primary_syms) {
                const r = symset_render_char(v, h);
                const code = r.ch.charCodeAt(0);
                assert.ok(code >= 32,
                    `${name}: carrier byte renders control ${code}`);
            }
            // Rogue load of the same set (parse path only).
            freshSymState();
            symset_slot(ROGUESET).name = name;
            assert.equal(read_sym_file(ROGUESET), 1, `rogue load ${name}`);
        }
    });

    it("DECgraphics ladders keep the judge-flat y/z (Ranger-95303 s839)", () => {
        // LADDER base arm (display.js) emits the raw letter with dec:false:
        // C sends DEC y/z (0xf9/0xfa) but the frozen comparison has no y/z
        // DEC mapping, so C's cell compares as the raw letter. The loaded
        // carrier arm must preserve that — dec:true renders ≤/≥ via
        // terminal.js DEC_TO_UNICODE (Must-fix y/≤ regression).
        assert.equal(loadPrimary("DECgraphics"), 1);
        const up = map_glyphinfo(1, 1,
            { ch: "y", color: 0, dec: false, glyph: cmap_to_glyph(S_upladder) }, 0);
        assert.equal(up.ch, "y");
        assert.equal(up.dec, false);
        const dn = map_glyphinfo(1, 1,
            { ch: "z", color: 0, dec: false, glyph: cmap_to_glyph(S_dnladder) }, 0);
        assert.equal(dn.ch, "z");
        assert.equal(dn.dec, false);
        // Non-ladder DEC cells still take the carrier render (walls stay dec).
        const w = map_glyphinfo(1, 1,
            { ch: "x", color: 0, dec: true, glyph: cmap_to_glyph(S_vwall) }, 0);
        assert.equal(w.ch, "x");
        assert.equal(w.dec, true);
    });

    it("parse_sym_line rejects unknown keywords, honors bare finish", () => {
        symset_slot(PRIMARYSET).name = "IBMGraphics_2";
        game.gc.chosen_symset_start = true;
        assert.equal(parse_sym_line("S_hwall: \\xc4", PRIMARYSET), 1);
        assert.equal(game.gs.primary_syms[S_hwall], 0xc4);
        assert.equal(parse_sym_line("S_bogus_xyz: q", PRIMARYSET), 0);
        assert.equal(parse_sym_line("finish", PRIMARYSET), 1);
        assert.equal(game.gc.chosen_symset_start, false);
        assert.equal(game.gc.chosen_symset_end, true);
    });
});

describe("symset step-0 screens (hidden-proxy probes)", () => {
    for (const [id, row, want] of [
        ["scen-symset-Archeologist-50058507", 15, "ZD+DDD?"],
        ["scen-symset-Archeologist-50058509", 12, "IMMMMMMN;"],
    ]) {
        it(`${id} step 0 shows C's stripped cells`, async () => {
            const { runSegment } = await import("../js/jsmain.js");
            const sess = JSON.parse(readFileSync(
                new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url),
                "utf8"));
            const seg = sess.segments[0];
            const g = await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves: seg.moves, storage: undefined,
            });
            const grid = decodeScreen((g.getScreens?.() || [])[0]);
            const text = grid[row].map((x) => renderCell(x)).join("").replace(/\s+$/, "");
            assert.ok(text.endsWith(want),
                `${id} row ${row}: want tail ${JSON.stringify(want)}, got ${JSON.stringify(text)}`);
        });
    }

    it("scen-symset-Archeologist-50059006 step 0 paints C's UTF8 room (raw-terminal oracle)", async () => {
        // Oracle is NOT the board payload (recorder blank — D-3944): it is
        // C's measured raw terminal bytes for this exact seg-0 recipe
        // (─ ×19, │ ×5, ┌┐└┘ ×1 each, · ×28 in the step-0 room).
        const { runSegment } = await import("../js/jsmain.js");
        const sess = JSON.parse(readFileSync(
            new URL("../.cache/hidden/sessions/scen-symset-Archeologist-50059006.session.json", import.meta.url),
            "utf8"));
        const seg = sess.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves, storage: undefined,
        });
        const grid = decodeScreen((g.getScreens?.() || [])[0]);
        const text = grid[15].map((x) => renderCell(x)).join("");
        assert.ok(text.includes("─"),
            `50059006 row 15: want C's U+2500 wall, got ${JSON.stringify(text)}`);
        assert.ok(!text.includes("---------.--"),
            `50059006 row 15: ASCII fallback must be gone, got ${JSON.stringify(text)}`);
        // The recipe's O-menu toggles (customsymbols off at key 41, plus a
        // later customcolors off) unstamp via the doset_simple `:8727`
        // reset (C options.c:8994-8996): no custom data survives, so
        // post-toggle paints fall back to the ASCII ttychar like C.
        assert.equal(game.iflags?.customsymbols, false);
        assert.equal(game.iflags?.customcolors, false);
        let stamped = 0, colored = 0;
        for (const cell of game.glyphmap || []) {
            if (cell?.u?.utf8str != null) stamped++;
            if (cell?.customcolor) colored++;
        }
        assert.equal(stamped, 0);
        assert.equal(colored, 0);
    });
});
console.log("PASS symset-loader");
