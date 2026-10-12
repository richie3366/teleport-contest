# Review 2715 — 85f57e3f5 — create_monster null-pm spawn (D-3854)

Metadata: SHA `85f57e3f5`, D-3854, cliffs-head `makemon.c`
rndmonst_adj writer (compiled-loader class instances dropped
a null pm instead of spawning). JS: `js/mklev.js` (3 hunks,
+7/−3: unconditional makemon). Test:
`scripts/create-monster-null-pm-reservoir.test.mjs` (new, C
pins RNG[15452]=rn2(3)=1, JS replay must match past it).

## Intent vs deliverable

Promise: Healer-578141@683 — both sides drew rn2(3)=2 at the
Mines your_race gate → pm=0 for a minetn-5 'G' monster; C
then drew the rndmonst reservoir while JS drew the next
tnDoor's rnddoor — JS never spawned; make the three
placeClassAt instances call makemon unconditionally with the
null pm (makemon(NULL) → rndmonst); session FULL PASS. Diff
actually does that. Match.

## Inventory

- load_wiz_strt placeClassAt (:6885): `pm ? makemon : null` →
  unconditional `makemon(pm, …)`; load_minetn_5 (:17926) +
  load_wizard3 (:27436): `if (!pm) return` deleted. C:
  sp_lev.c create_monster `:1954–1988` (read): mkclass
  comment "settle for a random monster", mines gate `:1959–
  1961` → pm=0, null-pm location arm (DRY), occupancy,
  croom, spawn `:1988` makemon. All three `return`s were
  closure-local (each hunk ends `};`, read) — no loader-tail
  skipped. `if (mtmp)` guards the `:2125` female clobber in
  all three (read) — makemon NULL safe, matching C's
  `if (mtmp)`.
- makemon null path (makemon.js:3313, read :3365–3400):
  genocided-veto for ptr, else the `:1212–1232` rndmonst
  retry loop with the Sokoban tryct-1 short-circuit — the
  reservoir arm is pre-existing and live.

## C ↔ JS fidelity

Arm-for-arm confirm. C never early-returns on a null pm
between the mines gate and the spawn (only the croom
`:1980–1981` check can, and JS `splev_resolve_occupied`
already ran before the deleted returns with the same
possibly-null pm — unchanged behavior there). The female
clobber matches C `:2125` over the `:3230` tmpmons default
(cited; same comment shape as the pre-existing
splev_create_monster D-0873 site). RNG order is C's: the
mines-gate rn2(3) stays first (pre-existing
splev_mines_maybe_clear_your_race, both sides drew it), then
makemon(NULL)'s reservoir — the focused test's red
(rng-diff first mismatch AT 15452) → green proves the
draw stream rejoins C exactly there.

## Hallucinations / overclaim

None. Standing notes (wiz_strt peaceful without set_malign
C :2126–2130; placeNamedAt mines-gate dormancy with the
In_mines short-circuit reason) are honestly scoped as
pre-existing and untouched. "No new imports/edges" holds —
pure call-shape change.

## Density

Cliff-phase: parent HEAD was rndmonst_adj (1 block, first
683 — verified in ad9fa3ee0 queue); owner read whole per
D-2823, writer port. Ledger: create_monster split + D-3854.
Reached: probe FULL PASS.

## Verification

js-hunk grep: 0 code hits (message-only "Temp-DIAG proof
(removed)"). Rule #2 clean (iteration-wide run). Re-measure
(mine): `verify rndmonst_adj --base 85f57e3f5~1 --reach-all`
→ `1 session(s) blocked on it (1 at baseline, 0 in the
working scoreboard)`, Healer-578141 PASS, `1 PASS, 0 moved
past, 0 unchanged, 0 worse → PROGRESS`; reach 1148/1148
REACH-OK (610s). Zero regressed. The FULL-PASS claim is
exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
