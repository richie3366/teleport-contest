# Review 1869 — 884da82f5 — align_gname (D-2910)

- SHA: `884da82f5` (coverage; `pray.c` `align_gname`)
- Files: `js/roles.js` only
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck` (this tree): "Rule #2 clean: no bare/node specifiers or fs calls in js/." `--can js/roles.js js/display.js impossible` is ALREADY.
- `sym.mjs`:

```
align_gname      js/roles.js:848   sync
impossible       js/display.js:8117   ASYNC — await required
```

## Intent vs deliverable

Subject promises one `align_gname` in C order: role gods, no Blind Io / Offler / The Lady fallbacks, neutral before chaotic, and `impossible` on an unknown alignment. The diff replaces the `if` / `else if` chain with that `switch`. Callers still pass `game.urole` first. `impossible` is not awaited.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `align_gname` | export `roles.js:848` | `pray.c:2529–2555` |
| `Moloch` | string `'Moloch'` | `pray.c:58` `static const char *const Moloch` |
| `impossible` | live `display.js:8117`, not awaited | `pray.c:2548` |
| `u_gname` | `roles.js:889` | `pray.c:2526` |
| `halu_gname` non-Hallu | `pray.js:2779` | `pray.c:2583` |
| `priestname` | `do_name.js:926` calls this, not `halu_gname` | `priest.c:364` |

## C ↔ JS fidelity

`csym` body is `pray.c:2529–2555`. No RNG. One argument in C (`alignment`); `gu.urole` is global. JS takes `(urole, alignment)` and every live caller passes `game.urole` (or the quest `urole`) as that first argument. A missing role becomes `{}`, so the god fields are `undefined` instead of a fault.

`switch` order is `A_NONE`, `A_LAWFUL`, `A_NEUTRAL`, `A_CHAOTIC`, `default`. Values match `align.h`: `-128`, `1`, `0`, `-1`. The old chain tested `A_CHAOTIC` before `A_NEUTRAL`. Neutral is `0`, so a missing alignment that fell through used to hit chaotic's fallback; the `switch` sends a non-matching value to `default`.

`A_NONE` is `"Moloch"`. Lawful / neutral / chaotic are `role.lgod` / `ngod` / `cgod` with no substitute names. `default` calls `impossible("unknown alignment.")` and sets `gnam` to `"someone"`. `impossible` is async (`urgent_pline`). `void impossible(...)` starts that and returns `"someone"` in the same turn. C returns only after `impossible` has printed. The text and the return value match; the pline can still be in flight. That is the sync choice the subject states.

`if (*gnam == '_') ++gnam` runs only when `gnam` is a string. `slice(1)` is the pointer increment. A non-string (unset god) is returned as-is. C would fault on `*gnam`. The subject names that.

`halu_gname` (`pray.c:2577–2583`) returns `align_gname(alignment)` when `!Hallucination`. JS does that at `pray.js:2779`. `minion.c:244` and `:247` share one `align_gname` call (`minion.js:247`) and then branch on Deaf; no extra roll. The other `csym` sites pass `game.urole` plus the same alignment expression C passes. `extern.h:2571` only declares it.

## Hallucinations / overclaim

The subject says no arm is omitted. The five `switch` arms and the underscore skip are the whole body. It also says `priestname` calls `align_gname` where C calls `halu_gname`. That call is not in this diff; under Hallucination `halu_gname` is a different name. The map names it. The subject does not claim `priestname` was rewired.

## Density

One function. The only callee is `impossible`, which is the live export, started and not awaited so the function stays sync. No stub arm and no pantheon fallback.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify align_gname --base 884da82f5~1 --reach-all`.

```
verify align_gname: baseline 884da82f5~1 (scoreboard at 1490a6d6b, 2026-09-26T23:28:51.183Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify align_gname: no corpus session is blocked on it at 884da82f5~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke align_gname: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line.

## Actionable C-wrongs

None. Moloch, the three role gods in neutral-before-chaotic order, `"someone"` after `impossible("unknown alignment.")`, and the leading-`_` skip match `pray.c:2535–2554`.

Verdict: **ACCEPT**
