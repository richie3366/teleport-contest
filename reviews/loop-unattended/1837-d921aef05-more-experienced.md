# Review 1837 — d921aef05 — more_experienced (D-2878)

- SHA: `d921aef05` (coverage; `exper.c` `more_experienced`)
- Files: `js/exper.js` (+44). No other `js/` file.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `more_experienced`: `exper` and `rexp` stay C `int`; `4 * exper + rexp` is int arithmetic before the widen; a positive addend whose sum goes negative is stored as `LONG_MAX`; `showexp` then `exp_percent_changing` set the status bit; wizard beginner cap is 1000. The diff drops the `| 0` read of `u.uexp` / `u.urexp` and adds that cap. `sym.mjs`:

```
more_experienced     js/exper.js:315   sync
exp_percent_changing js/botl.js:593   sync
```

Nothing was deleted or re-pointed.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `more_experienced` | export `exper.js:315` | `exper.c:168–203` |
| `exp_percent_changing` | import `botl.js:593` | `botl.c:2088–2125` |
| `EXP_LONG_MAX` | `Number.MAX_SAFE_INTEGER` | `LONG_MAX` analogue, named |

## C ↔ JS fidelity

`csym` body is `exper.c:168–203`. No RNG. `oldexp` / `oldrexp` are `long`. JS takes `Math.trunc(Number(...))`, so a total above 2^31−1 is no longer folded by `| 0` before the add. `exper | 0` and `rexp | 0` are the C `int` arguments. `newexp = oldexp + exper` adds the int as a wider value. `rexpincr = (Math.imul(4, experI) + rexpI) | 0` wraps like a 32-bit signed `4 * exper + rexp`, then widens when added to `oldrexp`.

The C cap is `newexp < 0 && exper > 0` (and the same for `newrexp` / `rexpincr`), then `LONG_MAX`. JS keeps that test and also caps when a positive addend would pass `Number.MAX_SAFE_INTEGER`. `config.h:627` leaves `SCORE_ON_BOTL` commented out, so the `flags.showscore` arm is absent in both. `flags.showexp` sets `game.flags.botl`. `allmain.js:1284` paints from that store. If the bit is still clear, `exp_percent_changing` (`botl.js:593–611`) runs the compiled `STATUS_HILITES` body (`config.h:616`): `percent_matters`, `thresholds`, `exp_percentage`, `get_hilite`. `Role_if(PM_WIZARD)` is `you.h:247` `urole.mnum == PM_WIZARD`. The beginner test uses the updated `u.urexp`.

## Hallucinations / overclaim

The subject’s “wizard ? 1000” is the role test, and the code uses `game.urole.mnum === PM_WIZARD`, not `flags.wizard`. The early cap at 2^53−1 is named in the commit and in `docs/c-js-map/startup.md`. Totals between that and a 64-bit `LONG_MAX` are not exact JS integers; the function never reaches them in play.

## Density

The 36-line function is the whole compiled body. `exp_percent_changing` is the existing port, not a stub. 44 insertions.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify more_experienced --base d921aef05~1 --reach-all`.

```
verify more_experienced: baseline d921aef05~1 (scoreboard at eb441a29a) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke more_experienced: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
