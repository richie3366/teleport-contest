# Review 2738 — 90d099cd8 — bigrm-3 female clobber (D-3878)

## Metadata

- SHA: `90d099cd8` (cliff-head writer port)
- D-entry: D-3878; Ledger: `create_monster` family in `sp_lev.c`
- js diff: `js/mklev.js` (+5/−1) in `load_bigrm_3`
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: the `load_bigrm_3` des.monster mirror missed the
`:2125` female clobber, so 11 des-spawns kept the makemon birth
draw where C forces 0 (himself/herself at Barbarian-582719 s623);
fix moves 623→713.

The diff actually adds: capture of the `makemon` result + `if
(mtmp) mtmp.female = 0` with the full pipeline cites. Promise ==
deliverable.

## Inventory

- `load_bigrm_3` (`js/mklev.js:4402`, sync) — two-line behavior
  change in the des-spawn loop; no signature change, no new
  function, no import.
- Classification: no helper — a direct C-assignment mirror. Shape
  matches the D-0873 sibling at `js/mklev.js:6896`
  (`if (mtmp) mtmp.female = 0;` for class-letter des.monster),
  cited in the hunk. No symbol deleted or re-pointed, so no
  `sym.mjs` paste is required.

## C ↔ JS fidelity

C pipeline, read from pinned C (all four loci verified this audit):

- `:2125` `mtmp->female = m->female;` — unconditional clobber of
  the birth draw. JS: `if (mtmp) mtmp.female = 0;` — matches (the
  `if` is the JS null-makemon guard; C's `mtmp` is non-null past
  its own spawn checks).
- `:3299` `tmpmons.female = get_table_boolean_opt(L, "female",
  BOOL_RANDOM)` — default BOOL_RANDOM when the table has no
  "female" key. `dat/bigrm-3.lua:56+` uses id-less
  `des.monster({x,y})` — no key, so the default applies.
- `:3348` `mgend = NEUTRAL` init (`:3148`); with no name there is
  no find_montype gender, so the `:3349–3353` override is skipped.
- `:3356–3357` safety net (`BOOL_RANDOM → 0`) yields net female 0.

Net: C forces 0 for exactly this spawn shape; JS now does the
same. Draw-free pure assignment — RNG untouched by construction,
consistent with the full-prefix seal (every RNG value+caller-tag
matched through step 625 pre-fix). No RNG to walk call-for-call;
the fix adds zero draws on either side.

## Hallucinations / overclaim

None. The D-log's three Named items are honest scoping: same-shape
medusa-mirror sites and the level-25 clobber set have no probe
session (correctly not swept), and the tengu kill-divergence is
flagged as a separate writer behind the new head. No cheat
markers; Rule #2 clean (review 2735 scan).

## Density

Cliff-head writer port with movement — right density. Owner
`mbhitm` (muse.c:1621 divergence) correctly not re-ported; the
writer is the level-gen spawn mirror. One cliff, code + ledger +
verify in one handoff; shared-file full 44/44 gate run. The
recorder-restore note (instrumentation reverted, save623b
re-record byte-identical) answers the §7 hygiene question.

## Verification

Re-measured by this audit
(`verify mbhitm --base 90d099cd8~1 --reach-all`):

- `verify mbhitm`: 1 PASS, 0 moved past, 0 worse → PROGRESS
  (Barbarian-582719: PASS).
- `reach mbhitm`: 35/35 PASS → REACH-OK.

No REGRESSED session. The audit re-run shows full PASS where
ship-time showed 623 → m_move@713: the re-measure runs current
HEAD code and the later D-3880 SHA PASSed the same session past
its 713 head. Strictly better than claimed, on the same session —
the ship-time claim is confirmed, not contradicted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
