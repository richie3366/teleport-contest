import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  optfn_map_mode,
  optfn_menu_headings,
  optfn_pettype,
  color_attr_to_str,
  allopt_idx,
  parseNethackrc,
} from "../js/options.js";
import { game } from "../js/gstate.js";

// C refs: options.c optfn_map_mode `:1962–2047` (do_set `:1972–2026`,
// get_val `:2028–2045`); optfn_menu_headings `:2182–2222` (do_set
// `:2191–2208`, get_val `:2209–2216`);
// coloratt.c color_attr_to_str `:249–257`;
// options.c optfn_pettype `:3196–3253` (do_set `:3204–3235`, get_val
// `:3237–3243`, get_cnf_val `:3245–3250`).
// Req/result literals mirror the file's REQ_/OPTN_ consts (1/2/4/5,
// 1/0/-1). menu_headings do_handler is async-split into
// doset_optfn_do_handler (no branch in the sync optfn) and is not
// pinned here. No RNG is drawn on any pinned arm.
const REQ_DO_INIT = 1, REQ_DO_SET = 2, REQ_GET_VAL = 4, REQ_GET_CNF_VAL = 5;
const OPTN_OK = 1, OPTN_ERR = 0, OPTN_SILENTERR = -1;

describe("optfn_map_mode port (options.c)", () => {
  it("do_init returns optn_ok (C :1969–1971)", () => {
    assert.equal(optfn_map_mode(86, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set matches tiles exactly, ascii names by prefix, case-insensitively (C :1983–2011)", () => {
    const store = {};
    assert.equal(optfn_map_mode(86, REQ_DO_SET, false, "map_mode:tiles", "", store), OPTN_OK);
    assert.equal(store.wc_map_mode, 0);
    assert.equal(optfn_map_mode(86, REQ_DO_SET, false, "map_mode:ascii8x8", "", store), OPTN_OK);
    assert.equal(store.wc_map_mode, 3);
    assert.equal(optfn_map_mode(86, REQ_DO_SET, false, "map_mode:ascii8x8foo", "", store), OPTN_OK);
    assert.equal(store.wc_map_mode, 3);
    assert.equal(optfn_map_mode(86, REQ_DO_SET, false, "map_mode:TILES", "", store), OPTN_OK);
    assert.equal(store.wc_map_mode, 0);
    assert.equal(optfn_map_mode(86, REQ_DO_SET, false, "map_mode:tiles_fit_to_screen", "", store), OPTN_OK);
    assert.equal(store.wc_map_mode, 11);
  });

  it("do_set rejects near-tiles, unknown names and negation (C :2012–2024)", () => {
    const store = { wc_map_mode: 3 };
    assert.equal(optfn_map_mode(86, REQ_DO_SET, false, "map_mode:tilesx", "", store), OPTN_ERR);
    assert.equal(store.wc_map_mode, 3);
    assert.equal(optfn_map_mode(86, REQ_DO_SET, false, "map_mode:bogus", "", store), OPTN_ERR);
    assert.equal(store.wc_map_mode, 3);
    assert.equal(optfn_map_mode(86, REQ_DO_SET, true, "map_mode:tiles", "", store), OPTN_ERR);
    assert.equal(store.wc_map_mode, 3);
  });

  it("get_val names modes; 11 and unknown fall to default (C :2031–2043)", () => {
    for (const [mode, name] of [[0, "tiles"], [3, "ascii8x8"], [10, "fit_to_screen"], [11, "default"], [99, "default"]]) {
      for (const req of [REQ_GET_VAL, REQ_GET_CNF_VAL]) {
        const holder = { buf: "" };
        assert.equal(optfn_map_mode(86, req, false, holder, "", { wc_map_mode: mode }), OPTN_OK);
        assert.equal(holder.buf, name);
      }
    }
  });
});

describe("optfn_menu_headings + color_attr_to_str port (options.c, coloratt.c)", () => {
  it("do_init returns optn_ok (C :2188–2190)", () => {
    assert.equal(optfn_menu_headings(93, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("empty do_set stores C-domain inverse/none + NO_COLOR (C :2194–2199)", () => {
    const bare = {};
    assert.equal(optfn_menu_headings(93, REQ_DO_SET, false, "menu_headings", "", bare), OPTN_OK);
    assert.deepEqual(bare.menu_headings, { attr: 7, color: 8 });
    const neg = {};
    assert.equal(optfn_menu_headings(93, REQ_DO_SET, true, "menu_headings", "", neg), OPTN_OK);
    assert.deepEqual(neg.menu_headings, { attr: 0, color: 8 });
  });

  it("negated valued do_set is silenterr; bad value is err (C :2200–2205)", () => {
    assert.equal(optfn_menu_headings(93, REQ_DO_SET, true, "menu_headings", "red", {}), OPTN_SILENTERR);
    const store = {};
    assert.equal(optfn_menu_headings(93, REQ_DO_SET, false, "menu_headings", "notacolor&notanattr", store), OPTN_ERR);
    assert.equal(store.menu_headings, undefined);
  });

  it("valued do_set parses color&attr whole-struct (C :2204–2206)", () => {
    const store = {};
    assert.equal(optfn_menu_headings(93, REQ_DO_SET, false, "menu_headings", "red&bold", store), OPTN_OK);
    assert.equal(store.menu_headings.color, 1);
    assert.equal(store.menu_headings.attr, 1);
  });

  it("color_attr_to_str joins clr2colorname & attr2attrname (C :249–257)", () => {
    assert.equal(color_attr_to_str({ color: 8, attr: 7 }), "no color&inverse");
    assert.equal(color_attr_to_str({ color: 1, attr: 1 }), "red&bold");
  });

  it("get_val hyphenates spaces: no-color&inverse (C :2212–2214)", () => {
    for (const req of [REQ_GET_VAL, REQ_GET_CNF_VAL]) {
      const holder = { buf: "" };
      const store = { menu_headings: { color: 8, attr: 7 } };
      assert.equal(optfn_menu_headings(93, req, false, holder, "", store), OPTN_OK);
      assert.equal(holder.buf, "no-color&inverse");
    }
  });
});

describe("optfn_pettype port (options.c)", () => {
  it("do_init returns optn_ok (C :3201–3203)", () => {
    assert.equal(optfn_pettype(130, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set maps first letters incl feline/quadruped/star (C :3207–3227)", () => {
    for (const [val, pet] of [["dog", "d"], ["d", "d"], ["cat", "c"], ["feline", "c"], ["horse", "h"], ["quadruped", "h"], ["none", "n"], ["random", ""], ["*", ""]]) {
      const store = {};
      assert.equal(optfn_pettype(130, REQ_DO_SET, false, `pettype:${val}`, "", store, true), OPTN_OK);
      assert.equal(store.preferred_pet, pet);
    }
  });

  it("do_set rejects unknown, honors negation rules (C :3228–3234)", () => {
    const store = {};
    assert.equal(optfn_pettype(130, REQ_DO_SET, false, "pettype:xx", "", store, true), OPTN_ERR);
    assert.equal(store.preferred_pet, undefined);
    // Negated with a value parses the value (C :3206 gate order).
    assert.equal(optfn_pettype(130, REQ_DO_SET, true, "pettype:cat", "", store, true), OPTN_OK);
    assert.equal(store.preferred_pet, "c");
    // Valueless negated selects 'n'; bare is a no-op.
    const neg = {};
    assert.equal(optfn_pettype(130, REQ_DO_SET, true, "pettype", "", neg, true), OPTN_OK);
    assert.equal(neg.preferred_pet, "n");
    const bare = {};
    assert.equal(optfn_pettype(130, REQ_DO_SET, false, "pettype", "", bare, true), OPTN_OK);
    assert.equal(bare.preferred_pet, undefined);
  });

  it("get_val spells names, get_cnf_val the letter or empty (C :3237–3250)", () => {
    for (const [pet, name] of [["c", "cat"], ["d", "dog"], ["h", "horse"], ["n", "none"], ["", "random"], [undefined, "random"]]) {
      const holder = { buf: "" };
      assert.equal(optfn_pettype(130, REQ_GET_VAL, false, holder, "", { preferred_pet: pet }), OPTN_OK);
      assert.equal(holder.buf, name);
    }
    for (const [pet, cnf] of [["d", "d"], ["h", "h"], ["", ""], [undefined, ""]]) {
      const holder = { buf: "" };
      assert.equal(optfn_pettype(130, REQ_GET_CNF_VAL, false, holder, "", { preferred_pet: pet }), OPTN_OK);
      assert.equal(holder.buf, cnf);
    }
  });
});

describe("optfn wiring (allopt + rc)", () => {
  let savedIflags, savedPet;
  beforeEach(() => {
    savedIflags = game.iflags;
    savedPet = game.preferred_pet;
  });
  afterEach(() => {
    game.iflags = savedIflags;
    game.preferred_pet = savedPet;
  });

  it("allopt rows dispatch through the new optfns (C :8496–8498)", async () => {
    const { get_option_value } = await import("../js/options.js");
    game.iflags = { wc_map_mode: 3, menu_headings: { color: 8, attr: 7 } };
    game.preferred_pet = "d";
    assert.equal(get_option_value("map_mode"), "ascii8x8");
    assert.equal(get_option_value("menu_headings"), "no-color&inverse");
    assert.equal(get_option_value("pettype"), "dog");
  });

  it("rc pettype:none selects 'n' (seed8000 OPTIONS shape)", () => {
    const r = parseNethackrc("OPTIONS=!autopickup,pettype:none");
    assert.equal(r.preferred_pet, "n");
  });

  it("rc routes map_mode and menu_headings through the optfns", () => {
    const r = parseNethackrc("OPTIONS=map_mode:ascii16x8,menu_headings");
    assert.equal(r.iflags.wc_map_mode, 4);
    assert.deepEqual(r.iflags.menu_headings, { attr: 7, color: 8 });
    const n = parseNethackrc("OPTIONS=!menu_headings");
    assert.deepEqual(n.iflags.menu_headings, { attr: 0, color: 8 });
  });
});
