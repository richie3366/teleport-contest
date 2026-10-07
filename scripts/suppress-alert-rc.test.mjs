import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseNethackrc,
  optfn_suppress_alert,
  allopt_idx,
} from "../js/options.js";
import { game } from "../js/gstate.js";

// C refs: options.c optfn_suppress_alert `:4134–4161` + feature_alert_opts
// `:7557–7585` + parseoptions `:626` (negateok-No). Pins the startup rc
// reader's suppress_alert arm: the value tail must be packed via
// get_feature_notice_ver (version.c), not stored as a raw string — the raw
// string reads back as 0 (`>>> 0` of "3.4.3") so doset showed [(none)]
// instead of [3.4.3] (scen-options-Tourist-94111 step 21).
const REQ_GET_VAL = 4;
const OPTN_OK = 1;
const PACKED_3_4_3 = ((3 << 24) | (4 << 16) | (3 << 8)) >>> 0;

describe("suppress_alert rc parse (options.c feature_alert_opts)", () => {
  it("packs OPTIONS=suppress_alert:3.4.3 to the numeric version (C :7576)", () => {
    const rc = parseNethackrc("OPTIONS=suppress_alert:3.4.3");
    assert.equal(typeof rc.flags.suppress_alert, "number");
    assert.equal(rc.flags.suppress_alert, PACKED_3_4_3);
  });

  it("get_val reports the packed version (C :4156–4157)", async () => {
    const saved = game.flags?.suppress_alert;
    if (!game.flags) game.flags = {};
    game.flags.suppress_alert = PACKED_3_4_3;
    try {
      const holder = { buf: "" };
      const r = await optfn_suppress_alert(
        allopt_idx("suppress_alert"), REQ_GET_VAL, false, holder, "");
      assert.equal(r, OPTN_OK);
      assert.equal(holder.buf, "3.4.3");
    } finally {
      if (saved === undefined) delete game.flags.suppress_alert;
      else game.flags.suppress_alert = saved;
    }
  });

  it("negated / unparseable / future tails keep the prior value (C :626/:7563/:7565)", () => {
    const neg = parseNethackrc("OPTIONS=!suppress_alert");
    assert.equal(neg.flags.suppress_alert, undefined);
    const bare = parseNethackrc("OPTIONS=suppress_alert");
    assert.equal(bare.flags.suppress_alert, undefined); // C `:4146` empty op
    const bad = parseNethackrc("OPTIONS=suppress_alert:foo");
    assert.equal(bad.flags.suppress_alert, undefined);
    const future = parseNethackrc("OPTIONS=suppress_alert:9.9.9");
    assert.equal(future.flags.suppress_alert, undefined);
  });
});
