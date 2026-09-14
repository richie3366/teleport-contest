# Review 1253 — f08d0f46 — set_moreluck + bless-family luck arms + dipfountain residuals

Metadata: SHA `f08d0f46`, D-2287, queue row `fountain.c dipfountain
residuals`. js/: 3 files, +60/−20 (attrib.js new export, mkobj.js 4 luck
arms, fountain.js awaits + body_part).

Intent vs deliverable: subject promises `set_moreluck`, luck wiring into
bless/curse/unbless/uncurse, dip awaits, case-26 `body_part`. Diff delivers
all four, nothing else.

Inventory: new `set_moreluck` (`js/attrib.js`); luck heads added to
`curse`/`bless`/`unbless`/`uncurse` (`js/mkobj.js:525–611`); 4 fountain
call sites `curse/bless/uncurse(obj)` → `await` + case-26 template. No
deleted symbols.

## C ↔ JS fidelity

- `set_moreluck` vs C `attrib.c:440–451` (`csym`, 12 lines): `stone_luck
  (TRUE)` first, `!luckbon && !carrying(LUCKSTONE)` → 0, else ±LUCKADD by
  sign — verbatim, including short-circuit order. ✓
- bless vs C `mkobj.c:1744–1764`: C chain is luck → else bag → else
  figurine; JS ports luck → else figurine (bag stays a pre-existing named
  omit in the doc comment). curse vs C `:1782–1819`: C chain luck → else
  bag → else figurine-attach → else spellbook; JS ports luck → else
  figurine-attach (bag/bimanual/uswapwep/book_cursed/COIN stay named).
  uncurse vs C `:1821–1838`: luck → else bag → else figurine — all three
  live, C order ✓. unbless vs C `:1766–1780`: luck arm added; bag stays
  named. In every function the new luck head preserves C's own else-if
  mutual exclusion among the live arms (a luckstone is never a timed
  figurine; no obj is both luck-conferrer and figurine). `carried(otmp)` ≡
  `where===OBJ_INVENT` ✓.
- dipfountain: C calls `bless/curse/uncurse(obj)` (csym hits at lines
  26/43/70/80 of the body) and case 26 prints `body_part(ARM)` (line 105).
  bless/curse/uncurse were already async in mkobj.js — fountain was
  floating the promises; awaiting is a genuine (if low-impact) fix since
  state changes precede the first await. Hardcoded "arm" → canonical
  `body_part(ARM)` (already imported, `js/fountain.js:109`; humanoid
  default identical, poly forms live) — strictly more C-faithful. ✓

Callee closure: `confers_luck` LIVE (artifact.js:615, sync),
`stone_luck` same-file, `carrying` LIVE (hack.js:2665, sync),
`body_part` LIVE (polyself.js:538, sync). New-edge audit:
`imports.mjs --can attrib.js hack.js carrying` → ALREADY;
`--can mkobj.js attrib.js set_moreluck` → ALREADY;
`--can mkobj.js artifact.js confers_luck` → ALREADY. No CLONE, no STUB.
Remaining gaps are pre-existing named omits retained in doc comments, not
Must-fix. No RNG in any shipped arm.

Hallucinations / overclaim: none.

Density: one luck family across its 4 callers + new export, 60
insertions — §2b right-sized.

Verification: re-measured `hidden-proxy verify set_moreluck
--base f08d0f46~1` → 0 blocked at baseline and working (D-log's vacuous
note is honest; row cited no N blocks). Diff grep: no
FORCE/DIAG/seed/coordinate/RNG-index reads. Rule #2 covered by the
iteration-wide rulecheck.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
