# Review 1014 — a101cf0e — simpleonames plural + thrown-autoquiver (D-2044)

Metadata: SHA `a101cf0e`, D-2044, Open-row port (queue
owner `wield.c doquiver_core`; two screen-first symptoms:
quiver prompt singular, pickup `(at the ready)` suffix).
js/ touches 5 files: `objnam.js`, `u_init.js`,
`uhitm.js`, `iactions.js` (comment), `dothrow.js`
(export). No stamp owed.

## Intent vs deliverable

Subject promises: (a) `simpleonames` pluralizes on
`quan != 1` per `objnam.c:2428–2442`; (b) the
`addinv_core0` thrown-autoquiver fill "verbatim … on
both the merge-survivor and fresh-insert paths"; (c)
drop the `makeplural(simpleonames())` compensation at
the mimic site per `uhitm.c:6234`. Diff delivers all
three — but (b)'s "verbatim on both paths" overclaims:
C's merge paths skip the fill arm via `goto added`.
Promise ⊃ diff. One live-arm divergence below.

## Inventory

- Changed JS: `simpleonames` (`objnam.js`), `addinv`
  two fill hunks (`u_init.js`), mimic site (`uhitm.js`),
  `throwing_weapon` function→export (`dothrow.js`).
- `sym.mjs`: `throwing_weapon js/dothrow.js:374 sync`
  single def, clean export; `setuqwep js/wield.js:289
  sync`; `is_ammo`/`LOST_THROWN`/`ART_MJOLLNIR` extend
  pre-existing `u_init.js` edges. No symbol deleted or
  re-pointed.

## C ↔ JS fidelity

C loci (via `csym.mjs` + reads): `simpleonames`
`objnam.c:2427-2442`; `addinv_core0`
`invent.c:1055-1148` with the fill arm at `:1128-1140`;
mimic site `uhitm.c:6232-6235`.

Confirmed:

- `simpleonames`: C `if (obj->quan != 1L)
  makeplural` → JS `((obj.quan ?? 1)|0) !== 1`
  (missing-quan→1 matches the iactions-clone guard;
  C always sets quan). No remaining
  `makeplural(simpleonames(...))` wrapper anywhere in
  `js/` (grep) — the uhitm one was the only
  compensator, and C `:6234` reads bare
  `simpleonames(otmp)`, so the removal is exact.
  Global blast radius (~19 caller files) held: full
  public 44/44 per D-log, no new corpus blocks.
- Fresh-insert fill (second `u_init.js` hunk) ≡ C
  `:1128-1140` conjunct-for-conjunct: thrown-flag,
  `pickup_thrown !== false` (C default TRUE),
  `!uquiver`, Mjollnir/aklys exclusions (comment even
  carries C's rationale), `throwing_weapon ||
  is_ammo`, sync `setuqwep`, placed before
  `addinv_core2` like C's pre-`added:` order.
  Capture-at-entry ≡ C `:1074` (nothing between
  touches `how_lost`).

C-wrong (Actionable 1): the merge-survivor fill (first
hunk) contradicts C control flow. C's quiver-prefer
merge, general merge loop, and `other_obj` reinsert
all end in `goto added` — every one bypasses the
`:1128-1140` fill arm. The fill fires **only** on the
fresh-insert fall-through. JS fires it on merge too:
thrown stack + empty quiver + mergable stack in
invent → C leaves `uquiver` empty, JS calls
`setuqwep(otmp)`. Observable state (quiver letter,
throw prompts) on a live arm, unnamed in the commit's
Named list (which names quiver-prefer merge,
`addinv_before`, oname, worn-slot, `how_lost` — but
not this). "Verbatim on both paths" is false; the
merge-path hunk must go. Pre-existing staleness
(`how_lost` never cleared to `LOST_NONE`) is named
and out of unit — not this item.

## Hallucinations / overclaim

The "verbatim … both paths" line above. Tooling note
(not a code claim): my re-run verify labels Valkyrie's
new state `js-throw at step 82`, but `hidden-proxy
show` (error null, screen kind, owner null) and a
direct replay (`error":null`, RNG 3278/3278) agree
there is no throw — the D-log's "no throw in tree"
stands; the owner-inference label is phantom.

## Density

~60 insertions / 5 files, one symptom envelope
(quiver-prompt plural + pickup quiver state). Two C
functions but one falsifier family; shippable cluster.

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed gates
  (full `--rulecheck` once for the iteration — see
  review 1017).
- Re-measured `hidden-proxy verify doquiver_core
  --base a101cf0e~1`: `0 PASS, 3 moved past,
  0 unchanged, 0 worse → PROGRESS` (Rogue-92115 →
  start_tin@118; Rogue-92030 → dofire@63;
  Valkyrie-92200 → step-82 menu/border screen diff,
  RNG fully matched) — matches the D-log.
- Green 2/2 + strict ×2, cohort 7/7, full public
  44/44 per pasted tails (owed under the global
  `simpleonames` change; iteration cadence re-runs
  full `sessions` — see review 1017).

## Actionable C-wrongs (**Addressed:** D-2048 `f5587f13`)

1. `addinv_core0` fill on the merge path: delete the
   merge-survivor `setuqwep(otmp)` hunk in `addinv`
   (`js/u_init.js`, first fill block) so the arm fires
   only on fresh insert, matching C `:1128-1140` +
   the three `goto added` bypasses. → Must-fix
   (prepended to LOOP-QUEUE.md).

Verdict: **QUALITY-RISK**
