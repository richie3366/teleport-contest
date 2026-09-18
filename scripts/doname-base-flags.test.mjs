import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
// First js import: do_name carries an eval-time set_y_monnam into objnam,
// so it must lead — every back-path to it then skips (in progress) and
// objnam completes before its body runs. objnam-first entry throws (TDZ).
import "../js/do_name.js";
import {
  doname, doname_base, doname_vague_quan,
  DONAME_WITH_PRICE, DONAME_VAGUE_QUAN, DONAME_FOR_MENU,
} from "../js/objnam.js";
import { record_price_quote } from "../js/shk.js";
// Side-effect import: registers do_wear's doffing/donning into objnam's
// doname_base ARMOR arm (top-level runs after the objnam import completes).
import "../js/do_wear.js";
import { objects_globals_init } from "../js/objects.js";
import { game } from "../js/gstate.js";
import {
  COIN_CLASS, TOOL_CLASS, ARMOR_CLASS, objectNames,
} from "../js/generated/objects_data.js";
import { W_ARMOR, WORN_ARMOR } from "../js/const.js";

// C ref: objnam.c doname_base `:1223–1751` (D-2497: flags, override_ID,
// vague "some ", bag-of-tricks "empty ", ARMOR worn variants, trailing
// pricequotes arm, farlook with_price/vague wiring, end.c with_price).
// Pins the new arms headless: no RNG anywhere on these paths.
const GOLD_PIECE = objectNames.indexOf("GOLD_PIECE");
const BAG_OF_TRICKS = objectNames.indexOf("BAG_OF_TRICKS");
const PLATE_MAIL = objectNames.indexOf("PLATE_MAIL");

const baseObj = (over) => ({
  otyp: GOLD_PIECE,
  oclass: COIN_CLASS,
  quan: 1,
  known: 0, dknown: 0, cknown: 0, bknown: 0, lknown: 0,
  spe: 0, owornmask: 0, oextra: null, unpaid: 0, cobj: null,
  ...over,
});

describe("doname_base flags and arms (objnam.c:1223-1751)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      iflags: game.iflags,
      objects: game.objects,
      context: game.context,
      afternmv: game.afternmv,
      distantname: game.distantname,
    };
    game.u = null;
    game.iflags = {};
    game.context = {};
    game.afternmv = 0;
    game.distantname = 0;
  });
  afterEach(() => {
    game.u = saved.u;
    game.iflags = saved.iflags;
    game.objects = saved.objects;
    game.context = saved.context;
    game.afternmv = saved.afternmv;
    game.distantname = saved.distantname;
  });

  it("flag values match C objnam.c:1217-1219", () => {
    assert.equal(DONAME_WITH_PRICE, 1);
    assert.equal(DONAME_VAGUE_QUAN, 2);
    assert.equal(DONAME_FOR_MENU, 4);
  });

  it("vague_quan prints 'some ' without dknown, count with it", () => {
    // Fresh object per call: near doname observes (dknown=1, like C xname),
    // so reuse would pin the count path for every later call.
    assert.match(doname(baseObj({ quan: 5, dknown: 0 })), /^5 /);
    // C farlook: distant_name holds gd.distantname so near-observe (which
    // would set dknown) is skipped — the pile stays vague.
    game.distantname = (game.distantname | 0) + 1;
    try {
      assert.match(
        doname_vague_quan(baseObj({ quan: 5, dknown: 0 })), /^some /);
      assert.match(
        doname_vague_quan(baseObj({ quan: 5, dknown: 1 })), /^5 /);
    } finally {
      game.distantname = (game.distantname | 0) - 1;
    }
  });

  it("bag of tricks prints 'empty ' only when spe==0 and !known", () => {
    const bag = (over) => baseObj({
      otyp: BAG_OF_TRICKS, oclass: TOOL_CLASS, cknown: 1, ...over,
    });
    // Base name is bare "bag"; the C `:1302` prefix adds "empty ".
    assert.match(doname_base(bag(), 0), /^an empty bag$/);
    assert.match(doname_base(bag({ spe: 3 }), 0), /^a bag$/);
    assert.match(doname_base(bag({ known: 1 }), 0), /^a bag$/);
    assert.match(doname_base(bag({ quan: 2 }), 0), /^2 empty bags$/);
  });

  it("worn armor names doffing in progress, else being worn", () => {
    const armor = baseObj({
      otyp: PLATE_MAIL, oclass: ARMOR_CLASS, known: 1, owornmask: W_ARMOR,
    });
    game.u = { uarm: armor, uskin: null, uarmg: null };
    game.context.takeoff = { what: 0 };
    assert.match(doname(armor), /\(being worn\)/);
    game.context.takeoff = { what: WORN_ARMOR };
    assert.match(doname(armor), /\(being doffed\)/);
  });

  it("plain doname appends a recorded price quote (trailing arm)", () => {
    objects_globals_init();
    const oc = game.objects[GOLD_PIECE];
    const savedOc = {
      buyMin: oc.oc_buy_minseen, buyMax: oc.oc_buy_maxseen,
      sellMin: oc.oc_sell_minseen, sellMax: oc.oc_sell_maxseen,
      nameKnown: oc.oc_name_known,
    };
    try {
      oc.oc_name_known = 0;
      record_price_quote(GOLD_PIECE, 50, true);
      record_price_quote(GOLD_PIECE, 70, true);
      game.iflags.pricequotes = true;
      assert.match(doname(baseObj({})), / \{buy 50-70\}/);
    } finally {
      oc.oc_buy_minseen = savedOc.buyMin;
      oc.oc_buy_maxseen = savedOc.buyMax;
      oc.oc_sell_minseen = savedOc.sellMin;
      oc.oc_sell_maxseen = savedOc.sellMax;
      oc.oc_name_known = savedOc.nameKnown;
    }
  });
});
