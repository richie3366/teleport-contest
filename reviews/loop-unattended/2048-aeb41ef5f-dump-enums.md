# Review 2048 — aeb41ef5f — dump_enums enum tables (D-3088)

Metadata: SHA `aeb41ef5f`, D-3088, js/earlyarg.js (+125/−6),
js/generated/enumdumps_data.js (NEW), js/display.js (+2 MAXMCLASSES),
js/mcastu.js (+10 MCASTU_SPELL_DEFS), scripts/extract-glyphsyms.py
(+106). Single-function cluster + table assembly + 1 stale.

## Intent vs deliverable

Promise: port dump_enums whole — 11 edmp tables assembled from live
generated data, verbatim prefix/unprefixed/nmwidth/comment/row logic,
pre-formatted rows through raw_printf, ARG_DUMPENUMS arm wired (return
2), raw_print sink named. Diff delivers all of it + the extractor
extension + consts. Kept.

## Inventory

- `dump_enums` (NEW file-local js/earlyarg.js:387 — C staticfn ✓):
  table loop, header, row loop with nmprefix/nmwidth/comment/row.
  Callees: raw_printf LIVE, dump_enums_tables (NEW export, JS-only
  assembler — disclosed, no C counterpart). No clones/stubs.
- `dump_enums_tables` (NEW export :309): 11 table assemblies (below).
  Data sources all live/generated, no new module edges possible
  (earlyarg has no importers — verified claim in the import comment).
- `MAXMCLASSES` (NEW const display.js:684 = 61 — sym.h:24 enum tail
  after MONSYM idx 1..60 ✓); `MCASTU_SPELL_DEFS` (NEW const
  mcastu.js:188, 20 defs); `enumdumps_data.js` (NEW generated, 6
  compact defsym tables); extractor +106 (parses upstream defsym.h,
  MONSYM/OBJCLASS asserts). Deleted/re-pointed: none.

## C ↔ JS fidelity

C locus: earlyarg.c:705–801 (body) + :624–703 (tables) + :528–530
(caller). Loop logic verbatim: `enum ${title} = {` ✓; nmprefix
(j>=szd−unprefixed) ✓; nmwidth = 27−len ✓ ("27 or 24"); comment
`    /* 'c' */` with 32–126 printability else ' ' ✓; row
`    %s%*s = %3d,%s` ≡ prefix+padEnd+` = `+padStart(3)+comment ✓
(negative width ≡ left-justify; `%3d` of −1 (NON_PM) ≡ padStart(3)
" −1" ✓). All 11 edmp rows (title/prefix/unprefixed/dumpflgs) match
C :743–773 incl. UNPREFIXED_COUNT=5 and mcast unprefixed:0 ✓.

Table values — PROVEN, not sampled: I re-ran the oracle diff
independently (fresh /tmp renderer + the recorder binary
`nethack --dumpenums`). C emits 1253 lines = 1230 content +
11 `};` + 12 blank (the named raw_print sink). JS renders exactly
the 1230 content lines: `cmp` BYTE-EXACT, 1230/1230. This one diff
simultaneously verifies monsterNames slice(3) + 5 fenceposts
(HIGH_PM=NUMMONS−1 ✓), objectNames + NUM_OBJECTS, all 15 omdump
rows (MARKER anchors ≡ objects.h:111/837/875/1295/1431/1574/1591,
gem counts ≡ objclass.h:180–181, OBJCLASS_HACK=FIRST_OBJECT−1 ✓),
all six generated defsym tables, arti (`ART_${bn}` + NROFARTIFACTS+1
≡ hack.h:102/106 ✓), and all 20 mcast defs.

Caller: `#ifndef NODUMPENUMS case ARG_DUMPENUMS: dump_enums();
return 2` (config.h:360 leaves NODUMPENUMS commented, per the
in-code note) ≡ JS arm + `return 2` ✓ — verified live:
`argcheck(2,['nethack','--dumpenums'],ARG_DUMPENUMS)` → 2, no throw
(observed; ARG_DUMPENUMS=3 lives in earlyarg.js, not const.js).

raw_print `:797–798`/`:800` sink omit: NAMED (code comment + D-log
Named omissions + ledger note) and RATIONALE-VERIFIED — no JS
raw_print channel exists (vraw_printf :8177 names the same omit),
and routing through raw_printf would add +2 _early_raw_messages
per call (:8163 + :8179–8180) that C never records; raw_printf
call counts stay 1:1 (1230 both sides). `ported` matches the sf_log
sink-omit precedent. Not a C-wrong.

`sym.mjs` read (no deletions/re-points, nothing required): dump_enums
single file-local ✓ (C staticfn), dump_enums_tables export,
MAXMCLASSES/MCASTU_SPELL_DEFS consts ✓.

Stale: yyyymmddhhmmss @ js/calendar.js:346 ✓ exact.

## Hallucinations / overclaim

MINOR, non-material: the Verify bullet's "byte-diffed 1251/1251
lines" count is wrong — the true numbers (measured both sides) are
1230/1230 content lines, C total 1253 with the 23 named-omitted
structural lines. 1251 matches neither side (off +21/−2); the /tmp
probe is gone so the count is unreconstructable. The MATERIAL claim
(byte-exactness) is TRUE per my independent re-diff above, and no
defect hides behind the number — but the bullet overstates its own
arithmetic. Said explicitly; no queue item (D-log is history, js/
needs no change). Everything else ("returns 2, as C", row
breakdown 388+482+…=1219 ✓, accurate edmp cites) checks out.

## Density

One C file, 1 whole function + live-data assembly + 1 stale —
§2b-shaped ✓. `Ledger:` ported with the sink in the note ✓ (the
"stale:" prefix on the fresh-port note is sloppy wording,
cosmetic). Per-function verdict: ACCEPT.

## Verification

- Independent oracle re-diff (this review): 1230/1230 content lines
  byte-exact vs the recorder binary; 23 omitted lines are exactly
  the named raw_print sink. Stronger than corpus evidence for this
  function.
- `hidden-proxy verify dump_enums --base aeb41ef5f~1 --reach-all`:
  `0 blocked (0/0)` + `smoke 24/24, 0 regressed → REACH-OK` —
  matches the D-log; honestly vacuous.
- Ban-grep on js hunks: clean. Rule #2 clean (generated-data
  imports only; no fs).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
