# Review 1892 — 21446265f — stuff_prevents_passage (D-2933)

- SHA: `21446265f` (coverage; `monmove.c` `stuff_prevents_passage`, plus the `can_ooze` / `can_fog` gates that call it)
- Files: `js/monmove.js` adds file-local `obj_blocks_passage` and `stuff_prevents_passage`, and both gates now call the scan. `js/do_wear.js` exports the existing `is_shirt` and `is_cloak`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (working tree; `monmove.js` line numbers moved after later commits — SHA lines are in the inventory). Nothing in the diff was deleted. `is_shirt` / `is_cloak` were file-local and are now the exports `monmove.js` imports:

```
stuff_prevents_passage NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/monmove.js:841
can_ooze         js/monmove.js:860   sync
can_fog          js/monmove.js:879   sync
is_shirt         js/do_wear.js:225   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/u_init.js:1181  js/worn.js:128
is_cloak         js/do_wear.js:232   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/u_init.js:1189  js/worn.js:134
is_gloves        js/do_wear.js:253   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/u_init.js:1202  js/worn.js:144
Is_candle        js/timeout.js:1519   sync
Is_container     js/const.js:3199   sync
amorphous        js/monsters.js:489   sync
verysmall        js/monsters.js:320   sync
is_vampshifter   js/monsters.js:816   sync
Protection_from_shape_changers js/were.js:58   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/display.js:1121  js/monmove.js:867  js/wizard.js:229
```

`imports.mjs --can js/monmove.js js/do_wear.js is_cloak` (and `is_shirt`, `is_gloves`) → `ALREADY`. `--can js/monmove.js js/timeout.js Is_candle` → `ALREADY`. `--can js/monmove.js js/const.js Is_container` → `ALREADY`. `--can js/monmove.js js/were.js Protection_from_shape_changers` → `IN-SCC` and `VERDICT: SAFE` (hoisted function, not a top-level TDZ). The flat-field clone is not cycle-forced.

## Intent vs deliverable

Subject promises one file-local `stuff_prevents_passage` in C order, hero invent as the `game.invent` array, `minvent` as an `nobj` chain, and `can_ooze` / `can_fog` short-circuiting before the scan. The diff is that scan plus the two gates. It does not replace the protection reader.

## Inventory

| JS | Class | C |
|----|-------|---|
| `obj_blocks_passage` | file-local loop body `monmove.js:775` | `monmove.c:2328–2350` |
| `stuff_prevents_passage` | file-local (C `staticfn`) `:805` | `monmove.c:2319–2353` |
| `can_ooze` | live sync `:824` | `monmove.c:2355–2361` |
| `can_fog` | live sync `:843` | `monmove.c:2363–2371` |
| `Protection_from_shape_changers` | diverging clone `:831` | `youprop.h:355–360` |
| `is_shirt` / `is_cloak` / `is_gloves` | live `do_wear.js` | `obj.h:288–296` |
| `Is_candle` | live `timeout.js:1519` | `obj.h:382–383` |
| `Is_container` | live `const.js:3199` | `obj.h:337` |
| `amorphous` / `verysmall` / `mons` | live `monsters.js` | `mondata.h:11`, `mondata.h:30` |
| `is_vampshifter` | live, wider than the macro | `monst.h:217–219` |

## C ↔ JS fidelity

`monmove.c:2323–2352`: hero uses `gi.invent`, else `minvent`. Walk `nobj`. `otyp == COIN_CLASS && quan > 100` returns true. Otherwise the long conjunction returns true when the object is not a small item. `Is_container && cobj` returns true. Empty chain returns false. JS `obj_blocks_passage` is that conjunction, including `ARROW`..`BOOMERANG` (indices 18–26) and `DAGGER`..`CRYSKNIFE` (34–43). `COIN_CLASS` is 12 (`GENERIC_COIN`). `GOLD_PIECE` is 438, so a gold piece misses the first arm and blocks on the second, which is what `otyp == COIN_CLASS` does in C. `Is_container` is `otyp` 214–220 (`LARGE_BOX`..`BAG_OF_TRICKS`). Hero invent is the array (holes skipped, named). `minvent` stays `nobj`.

`can_ooze` (`:2358–2360`): `!amorphous(mtmp->data) || stuff_prevents_passage` returns false, else true. JS is that order. A null `data` is not amorphous (`mflags1` reads 0). C would dereference. Named.

`can_fog` (`:2366–2369`): true only when fog is not genocided, `is_vampshifter`, `!Protection_from_shape_changers`, and the scan is false. The `&&` order matches. The protection callee does not. C is `u.uprops[PROT_FROM_SHAPE_CHANGERS].intrinsic || .extrinsic` (`youprop.h:355–360`). The file-local reader (`:831–835`) checks only `H` / `E` / combined flats. `were.js:58–64` already ORs those flats with `uprops`. `confer_oc_oprop` writes `uprops`. A ward that lives only there does not block fog. `imports.mjs --can` says the `were.js` export is safe to import.

`is_vampshifter` (`monsters.js:816`) is `is_vampire(mons(cham))`, and `is_vampire` is `mlet == S_VAMPIRE`. C is `cham == PM_VAMPIRE || PM_VAMPIRE_LEADER || PM_VLAD_THE_IMPALER`. Vampire mage is `S_VAMPIRE` (`monsters.h:2302`) and is not one of those three. Pre-existing callee; this SHA did not change it.

Callers of the new static: `monmove.c:2358` → `can_ooze` `:825`. `monmove.c:2368` → `can_fog` `:847`. Callers of those: `monmove.c:2257` → `monmove.js:979`. `mon.c:2234` → `mon.js:3177`. `hack.c:1080` → `hack.js:457`. `hack.c:1375` → `cmd.js:2963` (the door arm at `cmd.js:3057` is the same `can_ooze` test). `hack.c:964` `cant_squeeze_thru` still has `can_fog` commented at `mon.js:240`. `monmove.c:1488` `postmov` has no `can_fog` / `vamp_shift` in this file. Both are named in the map (`turns.md`).

## Hallucinations / overclaim

The subject says no arm of `stuff_prevents_passage` is omitted. The coin arm, the small-item conjunction, and the container arm are present. It also says `can_fog` short-circuits in C order. The order is right; the protection value is the flat clone, not `youprop.h:359`. That sentence is the overclaim. The `u_init.js` / `worn.js` `is_shirt` / `is_cloak` clones are named. `is_gloves` has the same two clones; `monmove.js` uses the export.

## Density

The coverage row asked for `stuff_prevents_passage`. The whole static body shipped, and both C callers call it. `can_ooze` and `can_fog` are the gates, not a second subsystem. The protection clone is one predicate inside the fog gate, not a missing arm of the scan.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify stuff_prevents_passage --base 21446265f~1 --reach-all`.

```
verify stuff_prevents_passage: baseline 21446265f~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify stuff_prevents_passage: no corpus session is blocked on it at 21446265f~1 — a vacuous verify is NOT a corpus PASS. …
smoke stuff_prevents_passage: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44 are the port's own verify line (shared `monmove.js`).

## Actionable C-wrongs

1. `can_fog` (`monmove.c:2366–2369`): drop the flat-only `Protection_from_shape_changers` in `js/monmove.js` and call `were.js` `Protection_from_shape_changers` (`youprop.h:355–360`, `uprops[PROT_FROM_SHAPE_CHANGERS]` intrinsic or extrinsic). The import is a hoisted function in the existing cycle.

Verdict: **QUALITY-RISK**
