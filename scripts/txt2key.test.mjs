import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  txt2key,
  regex_init,
  regex_compile,
  regex_error_desc,
} from "../js/options.js";

// C refs: options.c txt2key `:6971–7067`; sys/share/posixregex.c
// regex_error_desc `:76–89`.
// Pins the whole txt2key restart in C order: trimspaces is space/tab
// only (a lone '\n' survives to the single-char arm), the specials are
// case-sensitive strcmp, M- stays pending through ^/C- processing, the
// digit arm reads exactly three chars with uchar wrap and no txt[3]
// check. And the three regex_error_desc arms over the SyntaxError text
// regex_compile captures.
describe("txt2key port (options.c)", () => {
  it("empty/blank/null → NUL (C :6976–6978)", () => {
    assert.equal(txt2key(""), 0);
    assert.equal(txt2key("  \t  "), 0);
    assert.equal(txt2key(null), 0);
  });

  it("trimspaces is space/tab only — lone newline survives (C :6976)", () => {
    assert.equal(txt2key("\n"), 10);
    assert.equal(txt2key("  a  "), 97);
  });

  it("single char returns itself (C :6981–6982)", () => {
    assert.equal(txt2key("a"), 97);
    assert.equal(txt2key("?"), 63);
    assert.equal(txt2key("M"), 77);
  });

  it("specials are case-sensitive strcmp (C :6985–6990)", () => {
    assert.equal(txt2key("<enter>"), 10);
    assert.equal(txt2key("<space>"), 32);
    assert.equal(txt2key("<esc>"), 27);
    assert.equal(txt2key("<ENTER>"), 0);
    assert.equal(txt2key("<Space>"), 0);
  });

  it("backslash decodes via escapes, first char wins (C :6993–6999)", () => {
    assert.equal(txt2key("\\n"), 10);
    assert.equal(txt2key("\\t"), 9);
    assert.equal(txt2key("\\t" + "x".repeat(200)), 9);
  });

  it("M- singletons incl bare M-'-' (C :7003–7019)", () => {
    assert.equal(txt2key("M-x"), 0x80 | 120);
    assert.equal(txt2key("m-x"), 0x80 | 120);
    assert.equal(txt2key("Mx"), 0x80 | 120);
    assert.equal(txt2key("M-"), 0x80 | 45);
    assert.equal(txt2key("M-^"), 0x80 | 94);
  });

  it("C-/^- forms incl bare and rubout (C :7022–7043)", () => {
    assert.equal(txt2key("^X"), 24);
    assert.equal(txt2key("C-x"), 24);
    assert.equal(txt2key("Cx"), 24);
    assert.equal(txt2key("^-x"), 24);
    assert.equal(txt2key("^"), 94);
    assert.equal(txt2key("C"), 67);
    assert.equal(txt2key("^?"), 0x7f);
    assert.equal(txt2key("C-?"), 0x7f);
  });

  it("M- stays pending through ^/C- processing (C :7020–7046)", () => {
    assert.equal(txt2key("M-^X"), 0x80 | 24);
    assert.equal(txt2key("M-C-x"), 0x80 | 24);
    assert.equal(txt2key("M-^?"), 0xff);
    assert.equal(txt2key("M-ab"), 0x80 | 97);
  });

  it("digit arm: three chars, uchar wrap, no txt[3] check (C :7054–7063)", () => {
    assert.equal(txt2key("160"), 160);
    assert.equal(txt2key("065"), 65);
    assert.equal(txt2key("999"), 999 & 0xff);
    assert.equal(txt2key("1234"), 123);
    assert.equal(txt2key("12"), 0);
    assert.equal(txt2key("1a3"), 0);
    assert.equal(txt2key("12a"), 0);
  });

  it("anything else → NUL (C :7066)", () => {
    assert.equal(txt2key("xyz"), 0);
    assert.equal(txt2key("'a'"), 0);
  });
});

describe("regex_error_desc port (posixregex.c)", () => {
  it("null re → 'no regexp' (C :78–79)", () => {
    assert.equal(regex_error_desc(null), "no regexp");
  });

  it("err 0 → 'no explanation' (C :80–81)", () => {
    assert.equal(regex_error_desc(regex_init()), "no explanation");
    const re = regex_init();
    assert.equal(regex_compile("ok.*", re), true);
    assert.equal(regex_error_desc(re), "no explanation");
  });

  it("failed compile → captured engine text (C :83–84)", () => {
    const re = regex_init();
    assert.equal(regex_compile("(", re), false);
    const desc = regex_error_desc(re);
    assert.equal(typeof desc, "string");
    assert.ok(desc.length > 0);
    assert.notEqual(desc, "no regexp");
    assert.notEqual(desc, "no explanation");
    assert.notEqual(desc, "unspecified regexp error");
  });

  it("err set but empty message → fallback (C :85–86)", () => {
    assert.equal(
      regex_error_desc({ jsre: null, err: 1, errdesc: "" }),
      "unspecified regexp error"
    );
  });
});
