# Review 1806 — c9492411c — exp_percent_changing (D-2847)

- SHA: `c9492411c` (coverage; `botl.c` `exp_percent_changing`)
- Files: `js/botl.js` (+27), `js/exper.js` (+5/−2)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `exp_percent_changing`: return false when `flags.botl` is already set; otherwise read the `BL_XP` slot, and return true only when `percent_matters`, a live `thresholds` chain, and a changed `exp_percentage()` select a `get_hilite` rule other than `hilite_rule`. `more_experienced` sets `flags.botl` from that result when experience points themselves are not already forcing a refresh. The diff is that function and the call after the `showexp` assignment.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `exp_percent_changing` | sync export `botl.js:389` | `botl.c:2090–2125` (`csym` 2088–2125) |
| `exp_percentage` | LIVE same file `botl.js:364` | `botl.c:2052–2089` |
| `get_hilite` | local `botl.js:441` (C `staticfn`) | `botl.c:2364–2569` |
| `more_experienced` | caller `exper.js:302` | `exper.c:190` |
| `zeroAnything` | local union zero | `cg.zeroany` |

`sym.mjs` (nothing deleted or re-pointed):

```
exp_percent_changing js/botl.js:389   sync
exp_percentage       js/botl.js:364   sync
get_hilite           NOT EXPORTED — local js/botl.js:441
more_experienced     js/exper.js:302   sync
```

`imports.mjs --can js/exper.js js/botl.js exp_percent_changing` → `ALREADY`. `botl.js` already imported `newuexp` from `exper.js`. The new import is the other direction. Both uses are inside functions, not at module top level.

## C ↔ JS fidelity

`csym --callers`: the comment at `botl.c:1521` and the call at `exper.c:190`. JS `more_experienced` is that call.

`STATUS_HILITES` is on (`config.h:616`). `SCORE_ON_BOTL` is not (`config.h:627` is commented out). The named omit of the showscore arm is the uncompiled `#ifdef`.

Body, inside `if (!disp.botl)` (`:2099`). JS uses `game.flags.botl`, the same bit the existing `showexp` arm writes and the bit `bot()` reads.

`curr` is `blstats[now_or_before_idx][BL_XP]` (`:2106`). `now_or_before_idx` is the module `let` at `botl.js:1821`, toggled the way `bot.c` toggles `gn.now_or_before_idx`. A missing slot is treated as `INIT_BLSTATP` `percent_matters` TRUE (`botl.c:688–690`, `initblstats` row `:717`, `pct: true`) and `thresholds` null. The `&&` then fails. C's static row is the same pair after `init_blstats`: `percent_matters` TRUE, `thresholds` NULL (`INIT_THRESH` is two null `hilite_s *`, `:678`). `init_blstats` is still not called from startup. Named. Until a chain exists, both return false without calling `exp_percentage`.

The condition is `percent_matters && thresholds && (pc = exp_percentage()) != percent_value` (`:2110–2113`). JS calls `exp_percentage` only after both pointers are truthy, then compares with `!==`. `thresholds` is a list head or null (`botl.js:1385–1386`), not an empty array, so the truth test matches the pointer. `percent_value` missing reads as 0, which is the INIT short.

On a change: `a = zeroany`, `a.a_int = u.ulevel` (`:2114–2115`), then `get_hilite(now_or_before_idx, BL_XP, &a, 0, pc, &color_dummy)` (`:2117–2118`). JS passes a `zeroAnything()` with `a_int` set, change 0, and `{ v: NO_COLOR }`. Return true iff the rule pointer differs from `hilite_rule` (`:2119–2120`). Otherwise fall through to `return FALSE` (`:2124`).

`get_hilite` walks `blstats[0][fld].thresholds` (`has_hilite` at `botl.c:673`), not the `idx` argument. The JS local does the same (`botl.js:449–452`). The `idx` argument is unused in the C body after the signature. No `rn2` in `exp_percent_changing` or `exp_percentage`.

`more_experienced` (`exper.c:183–191`): if `newexp != oldexp`, store `uexp`, set `disp.botl` when `showexp`, then `if (!disp.botl && exp_percent_changing()) disp.botl = TRUE`. JS is that order. The `showexp` write makes the second test skip the call, matching `&&` short-circuit.

## Hallucinations / overclaim

The subject says a different Xp highlight sets the dirty bit when `showexp` is off. That is the second `if`. It says a missing slot uses INIT `percent_matters` TRUE and null `thresholds`, so the predicate stays false until a rule is stored. That is the `??` and the `&&`. It says `SCORE_ON_BOTL` stays out. The macro is not defined. `hilite_reset_needed` and `status_update` are not in this function; the commit does not stub them here.

## Density

The whole compiled body and the one real caller. C is 38 lines. The `get_hilite` body was already live.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify exp_percent_changing --base c9492411c~1 --reach-all`.

```
verify exp_percent_changing: baseline c9492411c~1 (scoreboard at adbd6bd68) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke exp_percent_changing: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Green and cohort were not re-run in this audit.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
