# Review 2633 — 130fbe6fd — getpos writers display_trap_map + reveal strip (D-3769)

Metadata. SHA `130fbe6fd` (2026-10-10), D-3769, parent
`95e0c2693` ([measure], no js). js diff:
`js/detect.js` +5/−2 (flush delete + comment),
`js/display.js` +16 (memory-id classification) +
`scripts/detect-browse-map-paint.test.mjs` (new, 2
its). Ledger: `display_trap_map`, `reveal_terrain_-
getglyph` ported (D-3769 appended ×2). Works the
parent queue's row-2 (`getpos.c` getpos, 2 blocked:
95311 + 95506) — row-1 randomize was parked SYMPTOM
with park (D-3767) + [measure] (D-3768) both DONE,
skipped per precedent (same call CURRENT.md records
for D-3774).

## Intent vs deliverable

Promise: two probe sessions, two writers, one C
file. (1) 95311@440: C joins «…greedy. (For
instructions…)» on one topline, JS More-splits —
JS ran a spurious `flush_topl_more()` between
`You_feel` and `browse_map`. (2) 95506@691: pure
paint, RNG lockstep — remembered stale food `%`
leaked unstripped through the object-excluded 'b'
view because the memory fallback never classified
the id. Plus a C-measured residual (95311 hallu
fake-object paint) with a [measure] row.

Diff delivers exactly the flush delete and the
classification. Promise and diff match on code; the
[measure] row did not land in the queue (see
Debt) — the only gap.

## Inventory

Changed JS (2 writers):

- display_trap_map flush delete —
  `js/detect.js:2427–2435` (flush gone, C-cite
  comment; `flush_topl_more` dropped from the local
  dynamic import, still used at :410/:1456/:2051).
  C: `detect.c:998–1000` (`You_feel(...)` then
  `browse_map(...)`, nothing between — csym range
  `detect.c:955–1003` read whole).
- reveal_terrain_getglyph memory-id
  classification — `js/display.js:4923–4940`
  (GLYPH_INVISIBLE → 'invisible', glyph_is_object →
  'obj', glyph_is_trap → 'trap'; cmap/unexplored
  stay 'other').
  C: `detect.c:2219` (`glyph = !swallowed ?
  glyph_at : levl_glyph` — the DISPLAYED int
  classifies) + `:2225` (`!keep_objs &&
  glyph_is_object(glyph)` → strip) — csym range
  `detect.c:2166–2288` read whole.

## C ↔ JS fidelity

**(1) Flush delete C-exact.** C `:998–1000` has no
more/flush between the two calls; the two-space
join happens in getpos's verbose pline. Same class
as the D-2081/D-2242 siblings — correctly deleted,
not gated.

**(2) Classification C-exact.** C classifies the
displayed int with `glyph_is_object/trap/
invisible`; JS now classifies the memory-fallback
id with the same three predicates (local,
pre-existing — no new imports) so the C-ordered
restore + strip arms fire. Arms verified live:
`js/display.js:5015–5024` (trap restore on
`!keep_objs obj | invisible`, read) and `:5027+`
(strip on `!keep_objs obj | !keep_traps trap |
invisible | reg&&was_mon`, read) — keyed on the
same kinds C's predicates produce. The extra
`glyph?.invisible` disjunct mirrors C's remembered
invisible-monster glyph comment (`:2212–2215`) —
a faithful clone of the predicate, not a widening:
it only re-routes into C's own invisible arm.

**Callees:** none touched; no symbol deleted or
re-pointed, so no sym.mjs paste is owed. Callers
pre-wired, signatures kept (behavior-only ×2).

**Test.** 2 its (95311 topline incl. two-space
join + no-More; 95506 cells + control). Re-ran:
2/2 green on HEAD. D-log's red-pre-fix claim is
the authentic shape.

## Hallucinations / overclaim

Two, both process, neither C:

- Status says "Open — cliffs head getpos" — at the
  parent, getpos was row-2 behind parked randomize.
  The skip itself is per-precedent (both randomize
  deliverables DONE); only the wording overclaims.
- "The residual re-pops via the [measure] row" —
  no such row was queued. The LOOP-QUEUE diff
  touches only the generated cliffs block, and the
  [measure] section at this SHA and at HEAD holds
  only the dogmove row. The residual (95311 still
  getpos@440, RNG-full, screen-only) sits below the
  RNG-ranked block cutoff with no tracking row.

Neither touches the shipped C. Diff grep (FORCE /
DIAG / getRngLog / fastforward / coords): zero.

## Density

Cliff-phase §2b: one row (getpos, 2 probes), one
writer per probe, one C file — one cliff, no
bundling. Movement is real: 95506 → PASS, 95311 →
topline fixed + RNG 32196→57254 FULL + screens
442→1098 (re-measure below confirms the topline
equality; the residual is a NEW map-cell
divergence, honestly labeled "unchanged"). The
C-measurement of the residual (recorded screens,
raw bytes, geom-probe, enum landmarks, 0-mismatch
table audit) satisfies the playbook's NO-MOVEMENT
→ measure rule for that leg; only its queue row is
missing. Full 44/44 ran (shared file).

## Verification

D-log Verify: `verify getpos` 1 PASS + 1
unchanged; REACH-OK ×3 (smoke spreads); green /
strict / cohort / full PASS.

Re-measured by this audit (`verify
getpos,display_trap_map,reveal_terrain_getglyph
--base 130fbe6fd~1 --reach-all`):

```text
verify getpos: 1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
  scen-sweep-Knight-95311: still getpos at step 440: C«…greedy. (For instructions…)» J«…greedy. (For instructions…)»
  scen-trek-Wizard-95506: PASS
smoke getpos / display_trap_map / reveal_terrain_getglyph: 24 PASS, 0 regressed → REACH-OK (×3)
```

Matches exactly (the two writer verifies are
honestly vacuous — the row cited getpos's 2).
No REGRESSED anywhere.

## Actionable C-wrongs

None — no C-wrong, so no Must-fix (row eligibility
bars doc rows). Debt for the next port iter's
housekeeping, not the Must-fix block:

1. Queue the promised 95311 hallu-residual
   `[measure]` row (C display-RNG trace at steps
   438–440, D-3769 Named (2)) — until then the
   RNG-full residual has no re-pop path.

Verdict: **ACCEPT-WITH-DEBT**
