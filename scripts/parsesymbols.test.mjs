import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { PRIMARYSET, ROGUESET } from "../js/const.js";
import { game } from "../js/gstate.js";
import {
  strbuf_init,
  savedsym_free,
  savedsym_strbuf,
  match_sym,
  sym_val,
  parsesymbols,
} from "../js/options.js";

// C refs: symbols.c parsesymbols `:773–848` (D-campaign 5/7) + match_sym
// `:852–901` + savedsym_add/free `:712–754` + options.c sym_val
// `:9385–9426` (+ escapes `:6896–6966`). Pins the SYMBOLS producer
// headless: no RNG, no display, no filesystem on any path. game.go
// override tables and the savedSymbols registry are module state —
// snapshotted/freed per test.
describe("SYMBOLS producer port (symbols.c + options.c sym_val)", () => {
  let hadGo, savedPrimary, savedRogue;
  beforeEach(() => {
    hadGo = !!game.go;
    savedPrimary = game.go?.ov_primary_syms?.slice();
    savedRogue = game.go?.ov_rogue_syms?.slice();
    savedsym_free();
  });
  afterEach(() => {
    savedsym_free();
    if (!hadGo) {
      delete game.go;
    } else {
      if (savedPrimary) game.go.ov_primary_syms = savedPrimary;
      else delete game.go.ov_primary_syms;
      if (savedRogue) game.go.ov_rogue_syms = savedRogue;
      else delete game.go.ov_rogue_syms;
    }
  });

  const freshBuf = () => {
    const sbuf = {};
    strbuf_init(sbuf);
    return sbuf;
  };

  it("match_sym resolves PCHAR rows with C idx (S_bars 17)", () => {
    assert.deepEqual(match_sym("S_bars"), { range: 2, idx: 17, name: "S_bars" });
    // C `:885` strncmpi: case-insensitive.
    assert.deepEqual(match_sym("S_BARS"), { range: 2, idx: 17, name: "S_bars" });
  });

  it("match_sym resolves alternates to the canonical row (C :889-899)", () => {
    // S_armour -> S_armor is the OBJCLASS row (idx 3 + SYM_OFF_O 105).
    assert.deepEqual(match_sym("S_armour"), { range: 3, idx: 108, name: "S_armor" });
    assert.deepEqual(match_sym("S_explode5"), { range: 2, idx: 100, name: "S_expl_mc" });
  });

  it("match_sym rejects G_ lines, unknowns, overlong names (C :871-873)", () => {
    assert.equal(match_sym("G_cmap_wall"), null);
    assert.equal(match_sym("g_x"), null);
    assert.equal(match_sym("bogus"), null);
    // C strncmpi compares len chars incl. NUL: trailing space misses.
    assert.equal(match_sym("S_pool "), null);
  });

  it("match_sym hits CONTROL rows (range only, no idx use)", () => {
    assert.equal(match_sym("handling")?.range, 1);
  });

  it("sym_val decodes chars, quotes and escapes (C :9391-9425)", () => {
    assert.equal(sym_val("~"), 126);
    assert.equal(sym_val(""), 0);
    assert.equal(sym_val(" "), 0); // C :9393 whitespace-only stays empty
    assert.equal(sym_val("'~'"), 126);
    assert.equal(sym_val("'\\\\'"), 92); // C :9403-9406 backslash quote
    assert.equal(sym_val("\\n"), 10);
    assert.equal(sym_val("^C"), 3);
    assert.equal(sym_val("\\o101"), 65);
    assert.equal(sym_val("\\x41"), 65);
  });

  it("parsesymbols parses comma lists into ov slots + registry (C :804-848)", () => {
    assert.equal(parsesymbols("S_pool:~,S_fountain:{", PRIMARYSET), true);
    // PCHAR idx from the generated triple: S_pool 38, S_fountain 37.
    assert.equal(game.go.ov_primary_syms[38], "~");
    assert.equal(game.go.ov_primary_syms[37], "{");
    const sbuf = freshBuf();
    savedsym_strbuf(sbuf);
    // C order: the tail recurses first, then the head prepends — the
    // first segment prints first.
    assert.equal(sbuf.str, "SYMBOLS=S_pool:~\nSYMBOLS=S_fountain:{\n");
  });

  it("parsesymbols routes ROGUESET to the rogue table", () => {
    assert.equal(parsesymbols("S_pool:@", ROGUESET), true);
    assert.equal(game.go.ov_rogue_syms[38], "@");
    assert.equal(game.go.ov_primary_syms?.[38] ?? 0, 0);
  });

  it("parsesymbols rejects valueless and unknown names (C :817-829)", () => {
    assert.equal(parsesymbols("S_pool", PRIMARYSET), false);
    assert.equal(parsesymbols("bogus:x", PRIMARYSET), false);
    assert.equal(game.go?.ov_primary_syms?.[38] ?? 0, 0);
    const sbuf = freshBuf();
    savedsym_strbuf(sbuf);
    assert.equal(sbuf.str, null);
  });

  it("parsesymbols upserts re-parsed names (C savedsym_find :726-737)", () => {
    assert.equal(parsesymbols("S_pool:~", PRIMARYSET), true);
    assert.equal(parsesymbols("S_pool:!", PRIMARYSET), true);
    assert.equal(game.go.ov_primary_syms[38], "!");
    const sbuf = freshBuf();
    savedsym_strbuf(sbuf);
    assert.equal(sbuf.str, "SYMBOLS=S_pool:!\n");
  });
});
