# Review 1846 — 3afe3adc0 — obj_pmname (D-2887)

- SHA: `3afe3adc0` (coverage; `do_name.c` `obj_pmname`)
- Files: `js/do_name.js`, `js/objnam.js`, `js/apply.js`, `js/do.js`, `js/do_wear.js`, `js/trap.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `obj_pmname`: gender from `spe & CORPSTAT_GENDER`, aligned-cleric remap, `pmname`, else `impossible` and `"two-legged glorkum-seeker"`. The trap.js and objnam.js copies go away. `sym.mjs`:

```
obj_pmname         js/do_name.js:658   sync
obj_pmname_corpse  js/objnam.js:1208   sync
set_obj_pmname     js/objnam.js:1203   sync
pmname             js/do_name.js:624   sync
impossible         js/display.js:8116   ASYNC — await required
```

Deleted trap.js `obj_pmname` and the objnam.js body are re-pointed at this export. `imports.mjs --can objnam.js do_name.js obj_pmname`:

```
IN-SCC: objnam.js and do_name.js are already in the same 98-module import cycle.
  obj_pmname               function  hoisted — cycle-safe
VERDICT: SAFE — every name requested is a hoisted function declaration.
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `obj_pmname` | export `do_name.js:658` | `do_name.c:1320–1359` |
| `pmname` | live export | `do_name.c:1302–1308` |
| `obj_pmname_corpse` | one-line late bind | callers in `objnam.c` |
| trap.js `obj_pmname` | deleted | was a swapped-gender clone |

## C ↔ JS fidelity

`csym` body is `do_name.c:1320–1359`. The `#if 0` montraits arm (`:1323–1334`) is compiled out. No RNG.

The live arm requires `CORPSE`, `STATUE`, or `FIGURINE`, and `ismnum`: `LOW_PM <= corpsenm < NUMMONS` (`monst.h:285`). A missing `corpsenm` becomes `NON_PM`, so it is not monster 0. `cgend` is `spe & CORPSTAT_GENDER` (`0x03`). `CORPSTAT_MALE` is 2 and `CORPSTAT_FEMALE` is 1 (`hack.h:1198–1199`); JS `const.js:1856–1857` matches, and those select `MALE` / `FEMALE` / else `NEUTRAL`. The deleted trap clone treated bit 1 as male and bit 2 as female. That swap is gone.

`PM_ALIGNED_CLERIC` with `CORPSTAT_RANDOM` (0) becomes `PM_CLERIC` before `pmname(mndx, mgend)`. An explicit neuter flag stays on the aligned cleric. `pmname` is the live export: it indexes `pmnames` and falls back to `NEUTRAL` when the gender slot is empty (`do_name.c:1304–1306`).

Any other object calls `impossible("obj_pmname otyp:%d,corpsenm:%d", …)` and returns `"two-legged glorkum-seeker"`. C's format is `%i`. The integer is the same. `impossible` is async and is not awaited. The string returns immediately. The commit names that. The error arm is not a silent stub.

Callers: `apply.c:291`, `do.c:958`, `do_wear.c:3006` import the export. `objnam.c:711`, `:803`, and `:1853` go through `obj_pmname_corpse` (`objnam.js:679`, `:903`, `:1249`). `set_obj_pmname(obj_pmname)` runs in the `do_name.js` body after imports, so a later call is not null. `trap.c:3890` and `:3902` (`selftouch`) call the export (`trap.js:3529`, `:3537`).

## Hallucinations / overclaim

The commit says a static import of `do_name.js` TDZ-faults `_shk_owns_prefix`. `--can` says `obj_pmname` itself is a hoisted function and safe to import. The late bind still calls the one body. `mselftouch` (`trap.c:3913` is `corpse_xname`; `js/trap.js:1196`) still inlines `pmname(..., NEUTRAL)`. Named, and not this function. `const.js` `ismnum` still omits `< NUMMONS`. This site writes the macro out.

## Density

The 40-line function, both copies removed, and the five caller files pointed at it. The `#if 0` arm stays out.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify obj_pmname --base 3afe3adc0~1 --reach-all`.

```
verify obj_pmname: baseline 3afe3adc0~1 (scoreboard at 703e0821e) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke obj_pmname: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The commit's full 44/44 is the shared-file gate, not a corpus claim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
