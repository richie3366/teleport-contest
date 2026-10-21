# Review 3038 — 2fd4bd664 — ready_weapon single exit + barehanded botl tail

- SHA: `2fd4bd664` (cliffs head, owner label doname_base, region
  heuristic: scen-chain-Priest-50557210 step 1048)
- D-entry: D-4198; Ledger: ready_weapon ported
- `js/` diff: wield.js +79 −77 (restructure + one import)

## Intent vs deliverable

Promise: wield.c ready_weapon ends every arm in one tail that sets
disp.botl only when the bare-handed state changed **and**
`condtests[bl_bareh].enabled` (`:270–271`). JS set botl on any change,
without the gate, and its empty-hand, shield and retouch arms returned
before the tail. The extra botl let moveloop_core's curs_on_u flush the
map before dofire's getdir --More--.

Diff: ready_weapon is restarted as C's if / else-if chain with
`let res = ECMD_OK`, one shared tail gated on `condtests[0]?.enabled`,
and `res |= await arti_speak(wep)`. `condtests` is imported from
botl.js. The promise matches the diff. No helper is added or deleted.

## Inventory

- ready_weapon — wield.js:548–652 (C wield.c:168–273).
- condtests — botl.js:2043, sync `export const`, entry 0 is
  `{ c: bl_bareh, useroption: 'barehanded', opt: OPT_IN, enabled: false }`
  (botl.h `enum blconditions` starts with bl_bareh). Read inside the
  function, so the new botl.js edge has no top-level TDZ read.
- arti_speak — artifact.js:722, ASYNC, returns ECMD_OK / ECMD_TIME (C
  artifact.c `:2295`), so the OR now carries a value, as in C.

## C ↔ JS fidelity

Branch by branch against `:168–273`:

- `res = ECMD_OK`, `was_twoweap`, `had_wep` captured first: same.
- `!wep`: uwep → «You are %s.» + setuwep(0) + res TIME; else «You are
  already %s.» with res OK. JS keeps the pre-existing halres/shine
  awaits inside the uwep arm: same order.
- CORPSE && cant_wield_corpse → TIME; `uarms && bimanual` → message +
  FAIL; `!retouch_object` → TIME: same chain order and values.
- Wield arm: res TIME, will_weld pline + set_bknown, else the dummy
  owornmask / AKLYS tether / prinv kludge, setuwep, the twoweap message
  under `flags.verbose` and `uwep`, arti_speak, artifact_light +
  begin_burn + `!Blind` shine pline, unpaid shk warning: same order,
  body unchanged from the reviewed version apart from the indent.
- Tail: `(had_wep != (uwep != 0)) && condtests[bl_bareh].enabled` →
  botl: now reached by every arm and gated. `barehanded` is opt-in, so
  a default game never sets botl here. That matches the measured C
  behaviour (no flush until the next pline).

No RNG in ready_weapon itself; the callees are unchanged.

## Hallucinations / overclaim

None. The named omission is true: C `retouch_object(&wep, FALSE)` can
null `wep` through the pointer, and JS passes the object by value. If
retouch drops the object it returns false, so JS takes the TIME arm as
C does. Only the tail then reads `uwep`, which is live.

## Density

One whole C function, restarted on its own C shape. Right-sized.

## Verification

```text
verify doname_base,ready_weapon --base 2fd4bd664~1 --no-reach
  doname_base: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
    scen-chain-Priest-50557210: PASS
  ready_weapon: 0 blocked (vacuous; the row is labelled doname_base)
imports.mjs --rulecheck: clean; diff grep: no FORCE/DIAG/seed/step gates
```

D-log: green 2/2, strict ×2, cohort 7/7, full 44/44, sweep 671
baseline-PASS 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
