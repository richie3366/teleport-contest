# Review 1818 — 41bf49099 — fall_asleep (D-2859)

- SHA: `41bf49099` (coverage; `timeout.c` `fall_asleep`)
- Files: `js/hack.js`, `js/timeout.js`, `js/trap.js`, plus `await` at the existing call sites in `eat.js`, `mhitu.js`, `potion.js`, `spell.js`, `zap.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises `stop_occupation` before `nomul`, then `multi_reason`, `u.usleep`, and the wake message. The `SLEEPY` timeout and the hero sleep-gas trap are the two arms that were missing. The diff is that body, those two arms, and `await` on every `fall_asleep(` call.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `fall_asleep` | async export `hack.js:1681` | `timeout.c:950–974` |
| `stop_occupation` | LIVE `hack.js:1609` | `allmain.c:683–696` |
| `unconscious` | LIVE `teleport.js:1705` | `trap.c:6775–6786` |
| `incr_itimeout_HSleepy` | local `timeout.js` | `potion.c:82–86` via `itimeout` `:56–63` |
| `Sleepy` / `Sleep_resistance` | locals in `timeout.js` | `youprop.h` H\|\|E, plus `uprops` |
| trap `Sleep_resistance` | existing local `trap.js:1715` | H\|\|E flats, not `uprops` |
| `breathless` | LIVE `monsters.js:497` | `M1_BREATHLESS` |

`sym.mjs`: `fall_asleep` `hack.js:1681` async; `stop_occupation` `:1609` async; `unconscious` `teleport.js:1705` sync, plus a local in `eat.js:468` that this diff does not call. Nothing deleted.

## C ↔ JS fidelity

`csym` body is `timeout.c:950–974`. Compiled order: `stop_occupation()`, `nomul(how_long)`, `multi_reason = "sleeping"`, `u.usleep = moves`, `nomovemsg` `"You wake up."` or `You_can_move_again` (`decl.c:47`, `"You can move again."`). The `#if 0` deafness block (`:956–969`) is not compiled. JS does not include it. No RNG in `fall_asleep` itself.

`stop_occupation` (`allmain.c:683–696`): if an occupation is set, `maybe_finished_meal(TRUE)` or `You("stop %s.")`, clear it, `disp.botl`, `nomul(0)`; else if `multi >= 0`, `nomul(0)`; then `cmdq_clear(CQ_CANNED)`. JS awaits `maybe_finished_meal`, prints `You stop ${occtxt}.` when the text is set, sets `flags.botl` and `disp.botl`, and clears `_cmdq_canned` instead of calling `cmdq_clear`. That clear is the pre-existing helper, not a new stub.

`timeout.c:784–792`: `unconscious() || Sleep_resistance` → one `rnd(100)` into `HSleepy`. Else if `Sleepy`: `You("fall asleep.")`, `sleeptime = rnd(20)`, `fall_asleep(-sleeptime, TRUE)`, then `incr_itimeout` of `sleeptime + rnd(100)`. A timeout that leaves `Sleepy` false does nothing. JS is that order. `unconscious` matches `trap.c:6775–6786` (`multi >= 0` false, then `usleep` or the three `nomovemsg` prefixes). `incr_itimeout_HSleepy` clamps with `itimeout` (`>= TIMEOUT` → `TIMEOUT`, `< 1` → 0) and writes the non-timeout bits back.

`trap.c:1568–1578`: hero `seetrap`, then `Sleep_resistance || breathless(youmonst.data)` → the cloud line and `monstseesu(M_SEEN_SLEEP)`, else the gas line, `fall_asleep(-rnd(25), TRUE)`, `monstunseesu`, then `steedintrap(trap, NULL)` on both arms. Monster arm unchanged: `!resists_sleep && !breathless && !helpless` → `sleep_monst(rnd(25), -1)` and the sight pline. The hero `rnd(25)` is only on the sleep arm.

Callers, all awaited, args match: `eat.c:2595` `rn1(11, 20)`; `hack.c:3045` `-10, FALSE`; `potion.c:909` `rn1(10, 25 - 12 * bcsign)`; `spell.c:491` `-dullbook`; `uhitm.c:3502` `rnd(10)` before the You line; `zap.c:2864` `rnd(50)`; `zap.c:4461` `d(nd, 25)`. `mhitu.c:1862` is inside `#ifdef PM_BEHOLDER`. That macro is not defined in this tree.

`zap.c:2854–2864` still skips `shieldeff` / `monstseesu` / `monstunseesu` (existing comments). `zap.c:4455–4461` still skips `shieldeff`, `monstseesu`, and the `monstunseesu` that C runs before `fall_asleep`. Those are outside this function. The trap `Sleep_resistance` local does not read `uprops[SLEEP_RES]`; the new timeout local does. Intrinsic sleep resistance is stored on `HSleep_resistance` (`eat.js`), which the trap local reads.

## Hallucinations / overclaim

The subject says the `#if 0` block and the beholder `AD_SLEE` arm are out. Both are ifdef-off. It does not claim the wand/breath sleep arms gained `monstseesu`. The gas and `SLEEPY` RNG counts match the arms it names.

## Density

The 25-line function, every compiled caller, and the two arms the queue row was missing. Under the 200-line floor because C is that small.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify fall_asleep --base 41bf49099~1 --reach-all`.

```
verify fall_asleep: baseline 41bf49099~1 (scoreboard at 8800eafbb) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke fall_asleep: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
