# Review 2872 — 0a69afa1c — pile-inverse from the glyph bank + engrcorr carrier

## Metadata

- SHA: `0a69afa1c37726af49bf999a19e272cce3880b91` (D-4031)
- Cliff: `invent.c` look_here row, 8 sessions
  (parent-block row 4, first live row; RNG full in all 8)
- js/ diff: `js/display.js` +62/-42 (new
  `glyph_bank_attr`, newsym/docrt/engrcorr rework),
  `js/detect.js` +7/-4 (restore attr + import);
  `scripts/pile-attr-glyph-bank.test.mjs` (5 its)
- Method: full per-function (cliff commit + measurement)

## Intent vs deliverable

Promise: (1–2) memory paints derived pile-inverse from
live floor objects / a coarse id range — wrong both ways
(Knight s720 missed inverse on a remembered piletop;
Monk s86 + Wizard s187 added inverse under remembered
non-object glyphs). New `glyph_bank_attr(gid)` ports C's
painted-id flag rule; newsym, docrt, and the show_map_spot
restore use it. (3) The MG_BW_ENGR collision test read
stale showsyms instead of the loaded Amiga carrier
(Valkyrie s133). (4) The 2 fountain residuals are tooling
(extracolor capture gap) — measured and writer-parked, no
port. 6/8 moved.

Diff actually: the bank + 3 call sites + the carrier read.
Promise == diff.

## Inventory

- `glyph_bank_attr` (`js/display.js:423`, NEW sync export;
  `sym.mjs` shows the single definition): pile ⟺ the 5
  piletop-bank predicates + hilite_pile + use_inverse;
  female statue → `wizmgender_inverse`.
- `newsym` memory arm (`:6669`), `show_memory_glyph`
  (`:6936`): attr from the bank; legacy field/live read
  kept only for `NO_GLYPH` ids.
- `show_map_spot` restore (`js/detect.js:985`): paints
  `glyph_bank_attr(oldglyph)` instead of hardcoded 0.
- `engrcorr_map_attr` (`:529`): `ov ?: live carrier`
  when a symset is loaded, stale showsyms otherwise.

## C ↔ JS fidelity

- Attr rule: C `win/tty/wintty.c:3930-3936` (read) is
  `use_inverse && (OBJPILE&&hilite_pile ||
  FEMALE&&wizard&&wizmgender || DETECT/BW_*)` → INVERSE.
  JS reproduces the first two disjuncts; DETECT/BW_* are
  named omits (same standing as `obj_map_attr`).
- OBJPILE banks: C `display.c:2788-2821` stamps OBJPILE on
  exactly the fem/male-statue-piletop, body-piletop, and
  obj-piletop banks — the JS 5-predicate OR. The one
  glyph the C `glyph_is_*_piletop` macros exclude
  (`OFF+FIRST_OBJECT-1` = the `OBJCLASS_HACK` marker,
  `objects.h:111`, not a paintable object) is excluded by
  the mirrored JS predicates too — the bank matches C's
  own classification, not just the stamp loop.
- Female statue: C sets MG_FEMALE on both fem banks; JS
  `glyph_is_fem_statue` covers both, and
  `wizmgender_inverse` gates on debug+wzmgender+inverse —
  the full C conjunction. Pile-first ordering is
  outcome-neutral (both arms yield INVERSE).
- showsyms semantic: C `symbols.c:257-260` (read) is `ov
  ? ov : carrier` — the JS `live()` reader; the collision
  rule C `display.c:2941-2946` (S_engrcorr vs corr/litcorr
  showsyms → MG_BW_ENGR) matches the kept comparison. The
  `ov[i] || car[i]` helpers are pre-existing same-file
  locals (`map_glyphinfo` pattern), no new edge.
- Restore: C `detect.c:1410-1411` repaints the id via
  `show_glyph(x, y, oldglyph)` — flags ride the id, so
  the bank read (not 0) is the faithful port.
- `imports.mjs --can detect.js display.js glyph_bank_attr`:
  ALREADY. Grep of both hunks: no FORCE/DIAG/RNG/seed/
  coords. Rule #2 clean (HEAD).

## Fountain measurement (no port — verified, not trusted)

- C gate `wintty.c:3899-3908`: WC2_EXTRACOLORS &&
  customcolor && colorcount>=256 → `term_start_extracolor`
  (non-BASIC); `termcap.c` hardcodes `ESC[38;5;Nm`.
- Patch 006 hooks `term_start_attr`/`term_start_color`
  only — **zero** `38;5`/`extracolor` mentions (counted).
- `dat/symbols:856` carries the Enhanced1 `G_fountain`
  RGB triple. The writer-park (paint NO SGR where nomux
  drops it, honoring the NH_BASIC sub-arm + colorcount)
  follows D-3963 doctrine; the Parked line is on disk
  (`LOOP-QUEUE.md`, WRITER D-4031). No captureDrop shipped
  — correct restraint for a colorcount-modeling gap.

## Hallucinations / overclaim

None. "Owner = region heuristic" is stated up front;
the two unchanged sessions are presented as parked
tooling, not movement; the NO_GLYPH legacy fallback and
the 4 other Named items bound the claim. `Ledger:` lists
all 5 touched functions (3 ported, 2 partial).

## Density

Legitimate head work: parent-block row 4 is look_here,
rows 1–3 dupe-rc kin, row 5 the 95340 park (all
re-verified in-commit). One cliff row, one cause family
(memory attr), its tooling residual measured in the same
commit — not another file's work. Shared-file gates ran
(full 44/44 per the D-log).

## Verification

Re-measured `--base 0a69afa1c~1 --no-reach`: `verify
look_here: 5 PASS, 1 moved past, 2 unchanged, 0 worse →
PROGRESS` — exact match (5 named PASS; 51150047 86→357;
fountain pair still look_here at 320/404). Caution
audited: my run's stdout line reads `moved → js-throw at
step 357`, but the stored row has `owner: null, error:
null`, RNG 10808/10808 — the `js-throw` text is the
tool's null-owner display fallback
(`hidden-proxy.mjs:947`, `${r.owner || 'js-throw'}`),
exactly as the D-log's D-2193 note says. No throw.
Focused test 5/5 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
