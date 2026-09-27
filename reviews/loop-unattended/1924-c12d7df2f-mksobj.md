# Review 1924 — c12d7df2f — mksobj (D-2965)

- SHA: `c12d7df2f` (coverage; `mkobj.c` `mksobj`)
- Files: `js/mkobj.js` rewrites the post-init switch and keeps the object `mksobj_init` returns.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
mksobj           js/mkobj.js:2574   sync
mksobj_init      NOT EXPORTED — local js/mkobj.js:2229
mk_artifact      js/artifact.js:1133   sync
oname            js/do_name.js:1364   sync
noveltitle       js/mkobj.js:2522   sync
set_corpsenm     NOT FOUND
```

`set_corpsenm` is the indented export at `mkobj.js:2118`. `readobjnam.js`, `zap.js`, and `makemon.js` import it. `mksobj_init` is `static` in C; one file-local. `mk_artifact`'s fourth parameter is `adjust_spe` (`artifact.js:1134`).

## Intent vs deliverable

Subject promises the post-init switch: corpse fallthrough, oil age, potion `fromsink`, boulder, leash, novel via `oname`, and the unique `mk_artifact` tail, plus `mksobj_init` keeping a replaced artifact. The diff is that switch and the two `mk_artifact` assignments inside `mksobj_init`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `mksobj` | live sync `mkobj.js:2574` | `mkobj.c:1179–1259` |
| `mksobj_init` | live file-local `:2229` | `mkobj.c:868` (`*obj` at `:892`, `:1101`) |
| `mk_artifact` | live sync | weapon/armor `TRUE`, unique tail `FALSE` |
| `noveltitle` | live sync `:2522` | `do_name.c:1610–1623` |
| `oname` | live sync | `SPE_NOVEL` |
| `set_corpsenm` | live export `:2118` | `mkobj.c:1318` egg arm |
| `weight` | live | `mkobj.c:1256` |

## C ↔ JS fidelity

`mkobj.c:1184–1196`. `newobj`, `*otmp = cg.zeroobj`, `age = max(moves, 1)`, `next_ident`, `quan = 1`, class, type, `OBJ_FREE`, `unknow_object`, `corpsenm = NON_PM`, `lua_ref_cnt = 0`, `pickup_prev = 0`. Then `init` calls `mksobj_init(&otmp, artif)`. The switch key is `POT_WATER` when the class is potion and the type is not `POT_OIL`, else `otyp`. No RNG before the switch.

JS `:2579–2605` is that header. `mksobj_init` is called only from here. It returns `otmp` after the weapon (`:2248`) and armor (`:2437`) replacements. Those pass `A_NONE, 99, true`, matching `:891` and `:1100`. `mksobj` keeps a truthy return.

Switch (`:1204–1248`), RNG only where C draws:

- `CORPSE` and `corpsenm == NON_PM`: `undead_to_corpse(rndmonnum())`, then `urole.mnum` if `G_NOCORPSE|G_GONE`. Fall through.
- `STATUE` / `FIGURINE`: another `rndmonnum` only if still `NON_PM`. `spe` is neuter, female, male, or `rn2(2)` female/male. Fall through.
- `EGG`: `set_corpsenm`. `/* case TIN: */` is not a case. JS `default` does not call `set_corpsenm`.
- `BOULDER`: `next_boulder = 0`. `objnam.js:1081` reads that field, not `corpsenm`.
- `POT_OIL`: `age = MAX_OIL_IN_FLASK` (400, `obj.h:384`). Fall through.
- `POT_WATER`: `fromsink = 0`. `do_name.js:1803` reads `fromsink`.
- `LEASH`: `leashmon = 0`.
- `SPE_NOVEL`: `novelidx = -1`, then `oname(otmp, noveltitle(...), ONAME_NO_FLAGS)`. `noveltitle` always `rn2(k)` and stores it when the index is -1 (`do_name.c:1614–1617`).

Then `objects[otyp].oc_unique && !oartifact` (the argument `otyp`, not a type `init` changed) calls `mk_artifact(otmp, A_NONE, 99, FALSE)`. JS `:2658` passes `false`. `owt = weight(otmp)` is last.

## Hallucinations / overclaim

The subject says no arm of the switch is omitted. Corpse, statue, figurine, egg, boulder, oil, water, leash, and novel are present, and tin stays out. The overlay fields are named: `corpsenm` stays `NON_PM` while `fromsink` / `next_boulder` / `leashmon` / `novelidx` are separate properties. A missing `urole` stores `NON_PM` and the statue arm draws again; C would read `gu.urole.mnum`. `end.c:965` and `:972` and `nhlobj.c:370` are named as having no JS. The `muse.js` boulder drops are extra calls, named.

## Density

The coverage row asked for `mksobj`. The whole body shipped, including the arms that were missing and the `mksobj_init` pointer write those arms depend on. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify mksobj --base c12d7df2f~1 --reach-all`.

```
verify mksobj: baseline c12d7df2f~1 (scoreboard at fa5382192, 2026-09-27T12:01:12.531Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mksobj: no corpus session is blocked on it at c12d7df2f~1 — a vacuous verify is NOT a corpus PASS. …
reach mksobj: 6 baseline-PASS session(s) reach it (6 run, 2.0s): 6 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty blocked-line is the vacuous note. The reach line is not vacuous: six sessions that execute `mksobj` still pass. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line; full suite was skipped because `mkobj.js` is not on the shared-file list.

## Actionable C-wrongs

None. The union overlays are the named separate fields the rest of `js/` already reads.

Verdict: **ACCEPT**
