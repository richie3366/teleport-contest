# Review 1928 — a5772c318 — trapeffect_dart_trap (D-2969)

- SHA: `a5772c318` (coverage; `trap.c` `trapeffect_dart_trap`)
- Files: `js/trap.js` only (`+56/−31`). Selector passes `trflags`. Arrow trap is a comment, not a body edit.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (symbols this diff starts calling or imports):

```
obfree           js/shk.js:4057   sync
poisoned         js/attrib.js:402   ASYNC — await required
Soundeffect      js/sndprocs.js:38   sync
maybe_half_phys  js/hack.js:1553   sync
Blind            js/invent.js:357   sync
             !! ALSO 31 LOCAL CLONE(S) in 31 files — IMPORT the export
pline_mon        js/display.js:7655   ASYNC — await required
thitu            js/mthrowu.js:613   ASYNC — await required
steedintrap      NOT EXPORTED — local js/trap.js:2068
t_missile        NOT EXPORTED — local js/trap.js:1126
thitm            NOT EXPORTED — local js/trap.js:1221
canseemon        js/display.js:1068   sync
             !! ALSO 5 LOCAL CLONE(S) — trap.js:1137 is the one this file calls
se_soft_click    js/generated/seffects_data.js:162   sync   export const
```

`imports.mjs --can js/trap.js js/shk.js obfree` prints `ALREADY`. `poisoned` and `maybe_half_phys` are the same. Those calls sit inside the function, so the existing `trap.js` import cycles are not top-level TDZ reads.

## Intent vs deliverable

Subject: a hero hit by a poisoned dart never called `poisoned` or `obfree`. The dud click skipped `Soundeffect`. A monster dud click never said the trap did nothing, and `seetrap` ran even when the monster was out of sight. A miss used `u.Blind` instead of `Blind`.

The diff rewrites the file-local function: hero click, poison, steed gate, `thitu` then `poisoned`/`obfree` or the floor drop, and the monster `in_sight`/`see_it` gates. The selector passes `trflags`. The arrow-trap comment still names its own omissions.

## Inventory

| JS | Class | C |
|----|-------|---|
| `trapeffect_dart_trap` | file-local async `trap.js:2415` | `trap.c:1250–1321` |
| `Soundeffect` | no-op matching the empty macro | `sndprocs.h:272` (`!SND_LIB_INTEGRATED`) |
| `You_hear` | live async `hack.js:177` | click string `"a soft click."` |
| `t_missile` | file-local clone, body matches | `trap.c:1017–1027` |
| `maybe_half_phys` | live sync | `hack.h:1236–1237` via `youprop.h:341` |
| `steedintrap` | file-local; dart arm calls `thitm(7)` | call matches `trap.c:1276` |
| `thitu` | live async | hit returns truthy; miss returns 0 |
| `poisoned` | live async | `attrib.js:402`; dart args match the call |
| `obfree` | live sync | `shk.js:4057`, merge null |
| `Blind` | local clone `trap.js:4845` | `youprop.h:103` |
| `canseemon` | local clone `trap.js:1137` | `display.h:117–120` `_canseemon` |
| `pline_mon` | live async | `display.js:7655` `vpline` |
| `thitm` | file-local clone | `trap.c:6710–6773` |
| `trflags` | `void` | `UNUSED` at `trap.c:1254` |

Caller: `trap.c:2946` `trapeffect_selector` → `js/trap.js:5951`. `trap.c:20` is the prototype.

## C ↔ JS fidelity

Hero, `mtmp == &gy.youmonst` (`is_youmonst`). Save `u.umortality`. `once && tseen && !rn2(15)` calls `Soundeffect(se_soft_click, 30)`, `You_hear("a soft click.")`, `deltrap`, `newsym`, `Trap_Is_Gone`. Otherwise `once = 1`, `seetrap`, the shoot `pline`, `t_missile(DART)`, `!rn2(6)` sets `opoisoned`, `dmgval` on youmonst.

`u.usteed && !rn2(2) && steedintrap` short-circuits the same way: no `rn2(2)` when unmounted. A truthy return (steed hit `1` or `Trap_Killed_Mon`) is the empty arm. Else `thitu(7, Maybe_Half_Phys(dam), &otmp, "little dart")`. `Maybe_Half_Phys` is `(Half_physical_damage) ? (dmg+1)/2 : dmg`. JS `maybe_half_phys` tests `HHalf_physical_damage || EHalf_physical_damage` and uses `Math.trunc((dmg + 1) / 2)`. No RNG in that helper. The stale comment above it ("Prop not yet wired") is wrong; the body is the macro.

On a hit, if `otmp` remains and `opoisoned`, `poisoned("dart", A_CON, "little dart", umortality rose ? 0 : 10, TRUE)` then `obfree(otmp, NULL)`. `fatal == 0` forces the attribute-loss arm (`i = 1`, no `rn2`). `fatal == 10` and `thrown_weapon` is `rn2(30)`. JS `done` sets `program_state.gameover` (`end.js:1029`); the two early returns skip `obfree`, which C never reaches because `done` does not return. A miss `place_object`s at the hero, `observe_object` unless `Blind`, `stackobj`, `newsym`. Both arms then `return Trap_Effect_Finished`, including a steed kill. That matches the C fall-through; the hero arm does not return `Trap_Killed_Mon`.

Miss `Blind` is `youprop.h:103`: `(HBlinded || EBlinded) && !BBlinded`. The call binds to the file-local clone, not `invent.js`. The clone returns true on sticky `u.Blind` or `u.ublind` before that prop test. `u.ublind` is only assigned false (`do.js:3440`). `make_blinded` sets `u.Blind` from `do.js` `Blind()`, which also treats `uroleplay.blind` as blind. The prop clause is the macro. The sticky read does not draw RNG. `lock.js` `chest_shatter_msg` sets `u.Blind = true` only around `xname` and restores it before returning, so a dart does not fire inside that window.

Monster: `in_sight = canseemon(mtmp) || mtmp == u.usteed` and `see_it = cansee` are computed before `rn2(15)`. The local `canseemon` is `wormno ? worm_known : (cansee || see_with_infrared)` then `mon_visible`, using the imported `display.js` helpers. Both flags true → `pline_mon` with `"%s triggers a trap but nothing happens."` and `Monnam`. Then `deltrap`, `newsym`, `Trap_Is_Gone`. A real shot sets `once = 1`, `t_missile`, `!rn2(6)`, `seetrap` only when `in_sight`, then `thitm(7, mtmp, otmp, 0, FALSE)`. Return is `Trap_Killed_Mon` or `mtrapped ? Trap_Caught_Mon : Trap_Effect_Finished`. Same precedence as C.

`thitm`'s strike, `dmgval`, messages, and `dealloc_obj` on a damaging hit match `trap.c:6710–6773`. The floor drop snapshots `mx`/`my` before `monkilled`; C places at `mon->mx` after `monkilled`. That clone predates this commit (the dart call was already `thitm(7, …)`). `t_missile` matches `mksobj(otyp, TRUE, FALSE)`, `quan = 1`, `weight`, `opoisoned = 0`, trap coordinates.

## Hallucinations / overclaim

The subject does not claim the arrow trap. The comment at `trap.js:2488` still lists Soundeffect, the gone-arm `pline_mon`, the `in_sight` `seetrap` gate, and hero-hit `obfree` as omitted there. `Soundeffect` is invoked; under the contest build the macro at `sndprocs.h:272` is empty, and `sndprocs.js:38` discards both arguments. `trflags` is unused, as in C. No arm of this function is left as a TODO.

## Density

The 72-line C body is both the hero arm and the monster arm, including the click, poison, steed, hit, and miss paths. One caller is wired. Insertions are small because the previous body already had the shot and `thitm`; this commit fills the arms that body skipped. That is the whole function, not a one-arm peel.

## Verification

```
verify trapeffect_dart_trap: baseline a5772c318~1 (scoreboard at a974add93, 2026-09-27T13:18:46.933Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify trapeffect_dart_trap: no corpus session is blocked on it at a5772c318~1 — a vacuous verify is NOT a corpus PASS. ...
reach trapeffect_dart_trap: 1 baseline-PASS session(s) reach it (1 run, 1.0s): 1 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2969 records green 2/2, strict ×2, cohort 7/7, and skip full because `js/trap.js` is not on the shared-file list. This re-run shows no `REGRESSED` session. The hidden line matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
