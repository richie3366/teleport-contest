import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { strbuf_init, all_options_statushilites } from "../js/options.js";
import {
    init_blstats, status_hilite_linestr_gather,
} from "../js/botl.js";
import {
    BL_STR, BL_TITLE, BL_MASK_BLIND, BL_MASK_CONF,
    GE_VALUE, TXT_VALUE, BL_TH_VAL_ABSOLUTE, BL_TH_TEXTMATCH,
} from "../js/const.js";
import { stripchars } from "../js/hacklib.js";

// C refs: botl.c STATUS_HILITES linestr store `:3403–3459`, gather chain
// `:3488–3587` + status_hilite2str `:3590–3670`, writer
// all_options_statushilites `:4477–4495` (D-campaign 6/7).
// Pins the #saveoptions hilites writer headless: no RNG, no display, no
// filesystem on either path. Threshold chains (game.gb.blstats[0][i]) and
// cond colors (game.gc.cond_hilites) are module state — saved/restored.
describe("saveoptions statushilites writer port (botl.c)", () => {
    init_blstats();
    let savedThreshold, savedGc;
    beforeEach(() => {
        savedThreshold = game.gb.blstats[0][BL_STR].thresholds;
        savedGc = game.gc;
        game.gc = undefined;
    });
    afterEach(() => {
        game.gb.blstats[0][BL_STR].thresholds = savedThreshold;
        game.gb.blstats[0][BL_TITLE].thresholds = null;
        game.gc = savedGc;
    });

    const freshBuf = () => {
        const sbuf = {};
        strbuf_init(sbuf);
        return sbuf;
    };

    it("dormant store emits nothing and stays empty (C :4487 loop skipped)", () => {
        const sbuf = freshBuf();
        all_options_statushilites(sbuf);
        assert.equal(sbuf.str, null);
        assert.equal(status_hilite_linestr_gather(), null);
    });

    it("threshold line is field/behavior/color (C :3580, :3665–3667)", () => {
        game.gb.blstats[0][BL_STR].thresholds = {
            rel: GE_VALUE, behavior: BL_TH_VAL_ABSOLUTE,
            value: { a_int: 5, a_ulong: 0 }, textmatch: "",
            coloridx: 1, fld: BL_STR, next: null,
        };
        const sbuf = freshBuf();
        all_options_statushilites(sbuf);
        assert.equal(sbuf.str, "OPTIONS=hilite_status: strength/>=5/red\n");
    });

    it("condition union merges same color+attr (C :3524–3530, :3560–3563)", () => {
        game.gc = { cond_hilites: [] };
        game.gc.cond_hilites[1] = BL_MASK_BLIND | BL_MASK_CONF; // red
        const sbuf = freshBuf();
        all_options_statushilites(sbuf);
        assert.equal(sbuf.str, "OPTIONS=hilite_status: condition/Blind+Conf/red&normal\n");
    });

    it("BL_TITLE keeps spaces, other fields strip them (C :3433–3435)", () => {
        game.gb.blstats[0][BL_TITLE].thresholds = {
            rel: TXT_VALUE, behavior: BL_TH_TEXTMATCH,
            value: { a_int: 0, a_ulong: 0 }, textmatch: "a b",
            coloridx: 1, fld: BL_TITLE, next: null,
        };
        const sbuf = freshBuf();
        all_options_statushilites(sbuf);
        assert.equal(sbuf.str, "OPTIONS=hilite_status: title/a b/red\n");
    });

    it("long lines truncate to the C precision (C :4488–4490, 230 chars)", () => {
        game.gb.blstats[0][BL_STR].thresholds = {
            rel: TXT_VALUE, behavior: BL_TH_TEXTMATCH,
            value: { a_int: 0, a_ulong: 0 }, textmatch: "x".repeat(300),
            coloridx: 1, fld: BL_STR, next: null,
        };
        const sbuf = freshBuf();
        all_options_statushilites(sbuf);
        const line = sbuf.str.slice("OPTIONS=hilite_status: ".length, -1);
        assert.equal(line.length, 230);
    });

    it("stripchars drops the strip set under BUFSZ-1 (hacklib.c :499–517)", () => {
        assert.equal(stripchars("", " ", "a b c"), "abc");
        assert.equal(stripchars("", " ", "  lead trail  "), "leadtrail");
        assert.equal(stripchars("", "%<>=+", "a<b>c"), "abc");
    });
});
