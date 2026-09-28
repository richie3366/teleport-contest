import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { NH_BASIC_COLOR } from "../js/const.js";
import { COLORTABLE } from "../js/generated/colortable_data.js";
import {
  colortable_to_int32,
  check_enhanced_colors,
  onlyhexdigits,
  rgbstr_to_int32,
  set_map_customcolor,
  unicode_val,
  set_map_u,
  parsesymbols,
} from "../js/options.js";
import {
  glyphrep_to_custom_map_entries,
  apply_customizations,
  add_custom_urep_entry,
  add_custom_nhcolor_entry,
  find_matching_customization,
  purge_all_custom_entries,
} from "../js/glyphs.js";

// C ref: coloratt.c colortable_to_int32 `:237–246`, check_enhanced_colors
// `:723–760`, onlyhexdigits `:801–810`, rgbstr_to_int32 `:813–865`,
// set_map_customcolor `:868–883`; utf8map.c unicode_val `:18–34`,
// set_map_u `:37–56`, add_custom_urep_entry `:148–207`; glyphs.c
// to_custom_symset_entry_callback `:53–104` (file-local, reached via
// glyphrep), glyphrep_to_custom_map_entries `:112–181`,
// apply_customizations `:531–574`.
describe("glyphs.c customization pipeline (11 fns)", () => {
  let saved;
  beforeEach(() => {
    saved = { gs: game.gs, iflags: game.iflags, glyphmap: game.glyphmap };
    purge_all_custom_entries();
  });
  afterEach(() => {
    purge_all_custom_entries();
    game.gs = saved.gs;
    game.iflags = saved.iflags;
    game.glyphmap = saved.glyphmap;
  });

  function chainLen(head) {
    let n = 0;
    for (let d = head; d; d = d.next) n++;
    return n;
  }

  it("onlyhexdigits: hex/dash/empty true, other letters false", () => {
    assert.equal(onlyhexdigits("0123abCD-9"), true);
    assert.equal(onlyhexdigits(""), true); // C :805 loop never runs
    assert.equal(onlyhexdigits("12g"), false);
    assert.equal(onlyhexdigits("red"), false);
  });

  it("rgbstr_to_int32: triples pack, shapes fail, names fall back", () => {
    assert.equal(rgbstr_to_int32("255-0-0"), 0xff0000);
    assert.equal(rgbstr_to_int32("1-2-3"), 0x010203);
    assert.equal(rgbstr_to_int32("1-2"), -1);
    assert.equal(rgbstr_to_int32("12"), -1);
    assert.equal(rgbstr_to_int32("ff-00-11"), -1); // hex letters rejected
    assert.equal(rgbstr_to_int32(""), -1);
    assert.equal(rgbstr_to_int32("1-2-3-4"), 0x010204); // C middle cell ignored
    assert.equal(rgbstr_to_int32("999-0-0"), 999 << 16); // no clamp in C
    assert.equal(rgbstr_to_int32("-1-2"), -1);
    assert.equal(rgbstr_to_int32("1--2"), -1);
    assert.equal(rgbstr_to_int32("red"), 1 | NH_BASIC_COLOR); // name fallback
    assert.equal(rgbstr_to_int32("notacolor"), -1);
  });

  it("check_enhanced_colors: basic, #hex, junk, table, grey alias", () => {
    assert.equal(check_enhanced_colors("red"), 1 | NH_BASIC_COLOR);
    assert.equal(check_enhanced_colors("#ff0000"), 0xff0000);
    assert.equal(check_enhanced_colors("#FF0000"), 0xff0000);
    assert.equal(check_enhanced_colors("#ff0000x"), -1); // trailing junk
    assert.equal(check_enhanced_colors("#12345"), 0x123405); // short last cell
    assert.equal(check_enhanced_colors("#fff"), -1); // only 2 conversions
    assert.equal(check_enhanced_colors("maroon"), 0x800000); // rgb table row
    assert.equal(check_enhanced_colors("grey"), 7 | NH_BASIC_COLOR); // gray alias
    assert.equal(check_enhanced_colors("no-such-color-zz"), -1);
  });

  it("colortable_to_int32 folds rows; table has 155 entries", () => {
    assert.equal(COLORTABLE.length, 155);
    assert.equal(COLORTABLE[16].name, "maroon");
    assert.equal(colortable_to_int32({ colortyp: 2, r: 1, g: 2, b: 3 }), 0x010203);
    assert.equal(colortable_to_int32({ colortyp: 1, tableindex: 5 }), 5 | NH_BASIC_COLOR);
    assert.equal(colortable_to_int32({ colortyp: 0 }), 8 | NH_BASIC_COLOR);
  });

  it("unicode_val parses U+ hex, caps at 8 digits, 0 on mismatch", () => {
    assert.equal(unicode_val("U+41"), 65);
    assert.equal(unicode_val("u+1F600"), 0x1f600);
    assert.equal(unicode_val("U+4"), 4);
    assert.equal(unicode_val("U+4123456789"), 0x4123456); // first + 7 more
    assert.equal(unicode_val("U+ZZ"), 0);
    assert.equal(unicode_val("U+"), 0);
    assert.equal(unicode_val("41"), 0);
    assert.equal(unicode_val(null), 0);
  });

  it("set_map_u guards null/zero, allocates once, overwrites", () => {
    assert.equal(set_map_u(null, 65, "A"), 0);
    assert.equal(set_map_u({}, 0, "A"), 0);
    const gm = {};
    assert.equal(set_map_u(gm, 65, "A"), 1);
    assert.equal(gm.u.utf8str, "A");
    assert.equal(gm.u.utf32ch, 65);
    const first = gm.u;
    assert.equal(set_map_u(gm, 66, "B"), 1);
    assert.equal(gm.u, first); // same record, no realloc
    assert.equal(gm.u.utf8str, "B");
  });

  it("set_map_customcolor stamps color and resolves the 256 index", () => {
    assert.equal(set_map_customcolor(null, 5), 0);
    const gm = {};
    assert.equal(set_map_customcolor(gm, 0xff0000), 1);
    assert.equal(gm.customcolor, 0xff0000);
    assert.ok(Number.isInteger(gm.color256idx));
    const gm2 = {};
    set_map_customcolor(gm2, 0xff0000);
    assert.equal(gm2.color256idx, gm.color256idx); // deterministic
  });

  it("add_custom_urep_entry creates, refreshes, appends, clears", () => {
    assert.equal(add_custom_urep_entry("T", 10, 65, "A", 0), 1);
    let d = find_matching_customization("T", 2, 0);
    assert.ok(d && chainLen(d) === 1);
    assert.equal(d.content.urep.glyphidx, 10);
    assert.equal(add_custom_urep_entry("T", 10, 66, "B", 0), 1); // refresh
    d = find_matching_customization("T", 2, 0);
    assert.ok(d && chainLen(d) === 1);
    assert.equal(d.content.urep.u.utf32ch, 66);
    assert.equal(d.content.urep.u.utf8str, "B");
    assert.equal(add_custom_urep_entry("T", 11, 67, "C", 0), 1);
    assert.equal(chainLen(find_matching_customization("T", 2, 0)), 2);
    assert.equal(add_custom_urep_entry("T", 10, 0, "B", 0), 1); // clear pair
    d = find_matching_customization("T", 2, 0);
    assert.equal(d.content.urep.u.utf8str, null);
    assert.equal(d.content.urep.u.utf32ch, 0);
    assert.equal(find_matching_customization("other", 2, 0), null);
  });

  it("glyphrep files urep+color entries and reports the glyph", () => {
    game.gs = { symset: [{ name: "T", handling: 5, nocolor: 0 }], symset_which_set: 0 };
    const box = { v: -1 };
    assert.equal(glyphrep_to_custom_map_entries("G_nothing:U+41/255-0-0", box), 1);
    assert.ok(box.v >= 0);
    const urep = find_matching_customization("T", 2, 0);
    assert.ok(urep);
    assert.equal(urep.content.urep.glyphidx, box.v);
    assert.equal(urep.content.urep.u.utf32ch, 65);
    assert.equal(urep.content.urep.u.utf8str, "A");
    const col = find_matching_customization("T", 3, 0);
    assert.ok(col);
    assert.equal(col.content.ccolor.glyphidx, box.v);
    assert.equal(col.content.ccolor.nhcolor, 0xff0000);
  });

  it("glyphrep marks color 0, drops bad arms, 0 on unknown id", () => {
    game.gs = { symset: [{ name: "T", handling: 5, nocolor: 0 }], symset_which_set: 0 };
    const box = { v: -1 };
    assert.equal(glyphrep_to_custom_map_entries("G_nothing/0-0-0", box), 1);
    assert.equal(find_matching_customization("T", 3, 0).content.ccolor.nhcolor, NH_BASIC_COLOR);
    purge_all_custom_entries();
    assert.equal(glyphrep_to_custom_map_entries("G_nothing/notacolor", box), 1);
    assert.equal(box.v >= 0, true);
    assert.equal(find_matching_customization("T", 3, 0), null); // -1 arm skips
    assert.equal(find_matching_customization("T", 2, 0), null);
    purge_all_custom_entries();
    assert.equal(glyphrep_to_custom_map_entries("G_nothing:U+ZZ", box), 1);
    assert.equal(find_matching_customization("T", 2, 0), null); // uval 0 skips
    assert.equal(glyphrep_to_custom_map_entries("G_zzz_no_such_id", box), 0);
  });

  it("apply_customizations stamps glyphmap cells and pends shuffle", () => {
    game.gs = { symset: [{ name: "T", handling: 5, nocolor: 0 }], symset_which_set: 0 };
    game.iflags = { customsymbols: 1, customcolors: 1 };
    add_custom_nhcolor_entry("T", 10, 0x112233, 0);
    add_custom_urep_entry("T", 11, 65, "A", 0);
    apply_customizations(0, 3);
    assert.equal(game.glyphmap[10].customcolor, 0x112233);
    assert.equal(game.glyphmap[11].u.utf32ch, 65);
    assert.equal(game.glyphmap[11].u.utf8str, "A");
    assert.equal(game.iflags.pending_customizations, true);
    purge_all_custom_entries();
    apply_customizations(0, 3);
    assert.equal(game.iflags.pending_customizations, false); // no surviving cell
  });

  it("apply_customizations honors the H_UTF8 gate and color-only masks", () => {
    game.gs = { symset: [{ name: "T", handling: 0, nocolor: 0 }], symset_which_set: 0 };
    game.iflags = { customsymbols: 1, customcolors: 1 };
    add_custom_nhcolor_entry("T", 10, 0x112233, 0);
    add_custom_urep_entry("T", 11, 65, "A", 0);
    apply_customizations(0, 3);
    assert.equal(game.glyphmap[10].customcolor, 0x112233);
    assert.equal(game.glyphmap[11].u, null); // non-UTF8 handling skips urep
    purge_all_custom_entries();
    game.gs.symset[0].handling = 5;
    add_custom_nhcolor_entry("T", 10, 0x112233, 0);
    add_custom_urep_entry("T", 11, 65, "A", 0);
    game.glyphmap[10].customcolor = 0;
    apply_customizations(0, 1); // colors only
    assert.equal(game.glyphmap[10].customcolor, 0x112233);
    assert.equal(game.glyphmap[11].u, null); // symbols mask off
  });

  it("parsesymbols :837 files entries through the wired glyphrep call", () => {
    game.gs = { symset: [{ name: "W", handling: 5, nocolor: 0 }], symset_which_set: 0 };
    assert.equal(parsesymbols("S_stone:u+0041", 0), true);
    const urep = find_matching_customization("W", 2, 0);
    assert.ok(urep);
    assert.equal(urep.content.urep.u.utf32ch, 65);
  });
});
