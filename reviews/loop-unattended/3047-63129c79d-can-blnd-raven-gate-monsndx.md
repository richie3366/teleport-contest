# Review 3047 — 63129c79d — can_blnd's raven gate compares mons[] indices

- SHA: `63129c79d` (cliffs head: owner one_characteristic, parked
  MISATTRIBUTED, scen-worldtour-Wizard-610136 step 503)
- D-entry: D-4207; Ledger: can_blnd ported (mondata.c `305-398`,
  js=uhitm.js:can_blnd)
- `js/` diff: uhitm.js +7 −4

## Intent vs deliverable

Promise: mondata.c can_blnd refuses blinding when attacker and defender
are both ravens (`:327–328`). JS built the comparand with
`mons(PM_RAVEN)`, which returns a fresh record per call, so the identity
test never held. A hero polymorphed into a raven therefore took a
raven's AD_BLND claw: +3 Blinded turns C never adds, seen in the final
disclosure as «You were temporarily blind (106).» where C prints 103.

Diff: the `mons(monsterNames.indexOf('PM_RAVEN'))` local and the two
`=== raven` identity tests are replaced by
`monsndx(magr.data) === PM_RAVEN && monsndx(mdef.data) === PM_RAVEN`.
It adds a module constant `PM_RAVEN` beside the file's other PM_
constants and imports `monsndx` from mondata.js, an edge that already
existed. Nothing else in the body changed. The promise matches the diff.

The owner on the board is one_characteristic (the disclosure painter),
a symptom owner. The commit fixes the writer that the D-log trap names
(make_blinded via mhitm_ad_blnd_u → can_blnd), which is what §10.18
asks for. It does not re-port the parked symptom owner.

## Inventory

- can_blnd — js/uhitm.js:362 (C mondata.c `:304–398` per csym; the
  ledger cites `305-398`, which excludes the return-type line; harmless).
- Callees used by the changed lines: monsndx (mondata.js:201, LIVE,
  `ptr?.mndx ?? ptr?.mnum ?? NON_PM`). No symbol was deleted or
  re-pointed. The removed `mons(...)` call is a local expression, not a
  definition.

```text
monsndx          js/mondata.js:201   sync
mons             js/monsters.js:227   sync
can_blnd         js/uhitm.js:362   sync
```

## C ↔ JS fidelity

C `:327–328`:

```c
if (magr && magr->data == &mons[PM_RAVEN] && mdef->data == &mons[PM_RAVEN])
    return FALSE;
```

- Pointer identity against `&mons[PM_RAVEN]` is the same as index
  equality, because every permonst pointer in C points into the single
  mons[] array. JS records come from `mons(mndx)`, which stores `mndx`
  on each fresh object (monsters.js:227–232), so `monsndx` recovers the
  C index for monsters and, through set_uasmon → set_mon_data, for the
  polymorphed hero's `youmonst.data`. A null `magr` still skips the gate
  (C `magr &&`). A missing `data` yields NON_PM, which is never PM_RAVEN,
  so the gate stays closed in the same cases as C.
- Order: haseyes `:316–317` → perma-blind `:320–321` → raven `:327` →
  switch `:330`. JS keeps this order (lines 367–376). The gate sits
  before the AT_CLAW arm, so the hero-raven defender returns FALSE
  before the ublindf/visor checks, exactly as in C.
- RNG: can_blnd draws nothing. The claw's damage `d()` is drawn by the
  caller either way, which explains the D-log's fully matched RNG with a
  differing timeout (make_blinded's `+3` is gated by the return value).
- Callers (csym `--callers`): apply.c:3584, dothrow.c:1297,
  mhitu.c:1279/1472, mthrowu.c:471/755, uhitm.c:1268/2966/2978/2988/5128.
  None of them changed. The gate now protects every site that passes a
  raven magr (mhitu.c:1472 hero-defender, uhitm.c:2966–2988
  monster-vs-monster).

Remaining `mons()` identity hazards: `grep -anE "(===|!==) *mons\("
js/*.js` finds none, so this was the last direct pattern of this family
(memory: mons() fresh record, D-4207).

## Hallucinations / overclaim

None. «The rest of the body was already whole in C order» is consistent
with the 2026-10-21 `audited D-3445` note and with the branch walk above
(this review checked only the gate and the order around it in detail).
The named lead (^X `>` paging) is reported as an observation, not a
claim, and D-4209 picked it up as its own commit.

## Density

One C `if` restored, on the writer of the cliffs-head row. Right-sized
per §2b. The row moved, so it is not unreached work.

## Verification

```text
node scripts/hidden-proxy.mjs verify one_characteristic,can_blnd --base 63129c79d~1 --no-reach
  scen-worldtour-Wizard-610136: PASS
verify one_characteristic: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify can_blnd: no corpus session is blocked on it at 63129c79d~1 (vacuous; expected, the board owner is one_characteristic)
node scripts/imports.mjs --rulecheck
  Rule #2 clean: no bare/node specifiers or fs calls in js/.
```

The diff contains no FORCE/DIAG/getRngLog/seed/fastforward reads and no
hardcoded coordinates. The D-log reports REACH-OK ×2, green 2/2,
strict ×2 and cohort 7/7. The audit's final full rescore is the
regression check for the window.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
