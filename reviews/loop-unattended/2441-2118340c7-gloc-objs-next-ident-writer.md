# Review 2441 — 2118340c7 — gather_locs GLOC_OBJS writer (next_ident cliff)

**Metadata.** SHA `2118340c7` (2026-10-06, D-3557). Type: **cliff** (first
§10.18 commit): writer port for the cliffs head `mkobj.c next_ident`
(14 blocked). `js/` insertions: 17 (`js/getpos.js` GLOC_OBJS arm + 2 import
names). HEAD `js/getpos.js` is byte-identical to at-SHA for this region (no
later touches), so HEAD reads are at-SHA reads.

## Intent vs deliverable

Promise: GLOC_OBJS arm cycles displayed object glyphs (live + remembered)
via `glyph_at` + live `glyph_is_object` + `objnum_to_glyph` boulder/rock
exclusion, mirroring GLOC_MONS; other arms byte-identical; 6 PASS + 8 moved.

Diff actually adds: exactly that arm (+12/−5) and 2 names on the pre-existing
display.js import edge. No other JS touched. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `gather_locs_interesting` (GLOC_OBJS arm; rest pre-existing) | ported | [getpos.js](/home/debian/dev/teleport-contest/js/getpos.js:928) (`:949–964` this arm) | getpos.c:437–507 (`csym.mjs`) |

## C ↔ JS fidelity

Walked the whole C body (getpos.c:437–507) against the JS: GFILTER_VIEW and
GFILTER_AREA 5-cell gates ✓; GLOC_MONS ✓ (worm-tail exclusions
`(PM_LONG_WORM_TAIL)+GLYPH_MON_MALE/FEM_OFF` ≡ C `monnum_to_glyph`
display.h:639–641 — the D-log's "MONS verified equivalent" holds);
**GLOC_OBJS** ≡ C `:461–464` (`glyph_is_object(glyph) && ≠boulder && ≠rock`)
via live `glyph_at` (display.js:886, reads `disp_glyph` = displayed gbuf,
live and remembered alike — same source as MONS) ✓; `objnum_to_glyph` ≡ C
display.h:638 ✓; BOULDER/ROCK indices measured 475/474 (guards fire) ✓;
GLOC_VALID fallthrough ✓ (`:487` cite); callers wired: C getpos.c:536 →
js/getpos.js:1014, C :488 self-recursion → :991, C cmd.c:1351 →
js/cmd.js:4427 ✓. No RNG in the function either side (the cliff's `rnd(2)`
is downstream in `object_from_map→mksobj→next_ident`, correctly outside this
port). Callee classification: `glyph_at`/`glyph_is_object`/`objnum_to_glyph`
all LIVE imports (no new edge — names added to an existing import, diff
confirms); no clones, no stubs.

Named omissions verified real: (1) JS `glyph_is_object` (display.js:963)
omits the C normal-piletop bank (display.h:847; C `glyph_is_object` :877
includes it via `glyph_is_normal_object`) — true gap, named, unmeasured.
(2) GLOC_DOOR/EXPLORE/INTERESTING `shown_*`/typ approximations —
pre-existing, named in ledger + D-entry. Nit (not a C-wrong): C `default:`
falls into GLOC_MONS while JS `default: return false` — unreachable on both
sides (every caller passes constants: gloc derives from
`findIndex>>1` ∈ 0..5 over the six GLOC pairs, GLOC_MONS=0…GLOC_VALID=5 per
flag.h:595/js/const.js:1167; cmd.js passes the constant).

## Hallucinations / overclaim

None. "MONS/DOOR/EXPLORE/VALID/INTERESTING byte-identical" — true (diff
touches only OBJS). The writer theory (remembered dart glyph excluded by
live-state read → wrong cycle target → missing `rnd(2)`) is measured, and
the movement below proves it. D-2228 correctly read-once, not re-ported.

## Density

Cliff §10.18: owner `next_ident` confirmed as the cliffs-head row at the
parent (14 blocked, first row of the parent's generated block); writer port
is the prescribed deliverable when the divergence names the writer (the
`o`-cycle arm, not the RNG drawer). One cliff, one function, own `Ledger:`
entry ✓. Function whole on every reachable path (2 named approximations in
the map). Per-function verdict: ACCEPT → SHA verdict ACCEPT.

## Verification

- Diff grep (`FORCE|DIAG|getRngLog|fastforward|gx ===|seed`): clean.
- Rule #2: clean this iteration (see 2439).
- Re-measure (mine, `--base 2118340c7~1 --reach-all`, on HEAD code):
  `verify next_ident`: **6 PASS, 8 moved past, 0 unchanged, 0 worse →
  PROGRESS** — every session matches the D-log's claim line-for-line
  (PASS: 94122/94202/94262/94302/Valkyrie-94362/Wizard-94222;
  Ranger-94002 →doname_base@140, Tourist-94062 →dosounds@161,
  Priest-94382 →mon_wield_item@99, Wizard-94142 →distfleeck@96,
  Priest-94182 →test_move@109, Priest-94162 →there_cmd_menu_next2u@115,
  Healer-94322 →count_feat_lastseentyp@117, Priest-94282 →dog_goal@75);
  `reach next_ident`: **741/741 PASS, 0 regressed → REACH-OK**. No REGRESSED,
  no vacuity — the claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
