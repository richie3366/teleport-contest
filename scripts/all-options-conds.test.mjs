import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { CONDITION_COUNT } from "../js/const.js";
import { condtests, opt_next_cond } from "../js/botl.js";
import { strbuf_init, all_options_conds } from "../js/options.js";

// C refs: botl.c opt_next_cond `:1456–1490` (D-campaign 3/7, extern.h `:291`)
// + options.c all_options_conds `:9551–9591`. Pins the #saveoptions cond
// writer headless: no RNG, no display, no filesystem on either path.
// condtests[].enabled is module state — saved/restored per test.
describe("saveoptions cond writer port (botl.c + options.c)", () => {
  let savedEnabled;
  beforeEach(() => {
    savedEnabled = condtests.map((ct) => ct.enabled);
  });
  afterEach(() => {
    condtests.forEach((ct, i) => {
      ct.enabled = savedEnabled[i];
    });
  });

  const freshBuf = () => {
    const sbuf = {};
    strbuf_init(sbuf);
    return sbuf;
  };

  it("opt_next_cond past the table returns null (C :1463–1464 FALSE)", () => {
    assert.equal(opt_next_cond(CONDITION_COUNT), null);
    assert.equal(opt_next_cond(CONDITION_COUNT + 5), null);
  });

  it("default table yields all-empty strings (C :1462 pre-clear)", () => {
    assert.equal(condtests.length, CONDITION_COUNT);
    for (let i = 0; i < CONDITION_COUNT; i++) {
      assert.equal(opt_next_cond(i), "", `idx ${i} (${condtests[i].useroption})`);
    }
  });

  it("non-default entries emit [!]cond_name (C :1484–1488)", () => {
    condtests[0].enabled = true; // opt_in barehanded, default off
    assert.equal(opt_next_cond(0), "cond_barehanded"); // C `:1486` enabled → no bang
    condtests[1].enabled = false; // opt_out blind, default on
    assert.equal(opt_next_cond(1), "!cond_blind"); // C `:1486` !enabled → bang
    condtests[8].enabled = true; // opt_in glowhands, default off
    assert.equal(opt_next_cond(8), "cond_glowhands");
  });

  it("all_options_conds emits nothing at defaults (C :9583–9589)", () => {
    const sbuf = freshBuf();
    all_options_conds(sbuf);
    assert.equal(sbuf.str, null); // buf stayed "OPTIONS=" → strcmp equal → no append
  });

  it("non-defaults join one OPTIONS= line with no leading comma (C :9574–9579)", () => {
    condtests[0].enabled = true;
    condtests[1].enabled = false;
    const sbuf = freshBuf();
    all_options_conds(sbuf);
    assert.equal(sbuf.str, "OPTIONS=cond_barehanded,!cond_blind\n");
  });

  it("lone late non-default has no leading comma (gotone, C :9574)", () => {
    condtests[1].enabled = false; // idx 0 stays default: gotone false at idx 1
    const sbuf = freshBuf();
    all_options_conds(sbuf);
    assert.equal(sbuf.str, "OPTIONS=!cond_blind\n");
  });

  it("long lists wrap with backslash-newline + 8-space indent (C :9568–9573)", () => {
    for (const ct of condtests) ct.enabled = !ct.enabled; // default → non-default, every entry
    const sbuf = freshBuf();
    all_options_conds(sbuf);
    const out = sbuf.str;
    assert.ok(out.endsWith("\n"), "final newline (C :9588)");
    assert.ok(out.includes(",\\\n        "), "comma + backslash-newline + 8 spaces");
    const lines = out.slice(0, -1).split("\n");
    assert.ok(lines[0].startsWith("OPTIONS="), "first line opens OPTIONS=");
    for (const ln of lines.slice(1)) {
      assert.ok(ln.startsWith("        "), `continuation indented: ${JSON.stringify(ln)}`);
      assert.ok(!ln.startsWith("         "), "exactly 8 spaces, not 9");
    }
    for (const ln of lines) assert.ok(ln.length <= 78, `no runaway line (${ln.length})`);
    const logical = out.replace(/,\\\n        /g, ",").trim();
    const tokens = logical.slice("OPTIONS=".length).split(",");
    assert.equal(tokens.length, CONDITION_COUNT);
    assert.equal(tokens[0], "cond_barehanded");
    assert.equal(tokens[1], "!cond_blind");
    for (const tok of tokens) assert.match(tok, /^!?cond_/);
  });
});
