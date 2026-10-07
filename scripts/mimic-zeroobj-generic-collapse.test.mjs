import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { obj_glyph, GLYPH_OBJ_OFF } from "../js/display.js";
import { GEM_CLASS, ILLOBJ_CLASS, objectNames } from "../js/objects.js";

// C ref: display.c display_monster M_AP_OBJECT `:564–575` builds its fake
// from cg.zeroobj WITHOUT setting oclass (stays 0); display.h
// obj_is_generic (!dknown + gem range) still fires for a !dknown gem, so
// generic_obj_to_glyph yields GLYPH_OBJ_OFF+0 — the STRANGE_OBJECT glyph,
// outside generic range, rendered ']' via objects[0] (ILLOBJ). JS used the
// otyp's class for the generic glyph ('*') and gated observe on the obj,
// so it showed '*' and wrongly observed+discovered the fake
// (scen-genesis-Healer-92189 step 89: C `]` + «strange object» vs JS `*` +
// «green gem»; mapappearance JADE).
const JADE = objectNames.indexOf("JADE"); // 460, FIRST_REAL_GEM..LAST_GLASS_GEM

describe("mimic zeroobj fake generic collapse (display.h obj_to_glyph)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, objects: game.objects, level: game.level };
    game.u = {};
    game.level = {};
    game.objects = {
      0: { oc_class: ILLOBJ_CLASS, oc_color: 0 }, // C objects.h STRANGE_OBJECT
      [GEM_CLASS]: { oc_class: GEM_CLASS, oc_color: 7 }, // GENERIC_GEM (gray)
      [JADE]: { oc_class: GEM_CLASS, oc_color: 2 },
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.objects = saved.objects;
    game.level = saved.level;
  });

  it("!dknown gem mimic fake (oclass 0) collapses to STRANGE_OBJECT glyph", () => {
    const og = obj_glyph({
      ox: 48, oy: 18, otyp: JADE, oclass: 0, dknown: 0, where: 0, corpsenm: 0,
    });
    assert.equal(og.glyph, GLYPH_OBJ_OFF + 0);
    assert.equal(og.ch, "]");
    assert.equal(og.color, 0);
  });

  it("real !dknown gem stays generic (shared arm unregressed)", () => {
    const og = obj_glyph({
      ox: 1, oy: 1, otyp: JADE, oclass: GEM_CLASS, dknown: 0, where: 0,
    });
    assert.equal(og.glyph, GLYPH_OBJ_OFF + GEM_CLASS);
    assert.equal(og.ch, "*");
  });

  it("dknown gem is specific", () => {
    const og = obj_glyph({
      ox: 1, oy: 1, otyp: JADE, oclass: GEM_CLASS, dknown: 1, where: 0,
    });
    assert.equal(og.glyph, GLYPH_OBJ_OFF + JADE);
    assert.equal(og.ch, "*");
  });

  it("oclass-0 normal arm renders the otyp class sym, not ']'", () => {
    const og = obj_glyph({
      ox: 1, oy: 1, otyp: JADE, oclass: 0, dknown: 1, where: 0,
    });
    assert.equal(og.glyph, GLYPH_OBJ_OFF + JADE);
    assert.equal(og.ch, "*");
  });
});
