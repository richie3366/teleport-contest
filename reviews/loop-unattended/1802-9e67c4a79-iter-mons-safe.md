# Review 1802 — 9e67c4a79 — iter_mons_safe (D-2843)

- SHA: `9e67c4a79` (coverage; `mon.c` `iter_mons_safe`)
- Files: `js/mon.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `iter_mons_safe`: count every `fmon` slot, `alloc_itermonarr`, copy the references, call `bfunc` until it returns true, and stop before the next monster when the game has ended. `movemon` calls it with `movemon_singlemon`. `alloc_itermonarr` releases on 0, on a larger count, or when the count is more than 40 below the buffer, then allocates `count + 20`. The diff is those two functions and the `movemon` call that replaces `list.slice()`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `iter_mons_safe` | async `mon.js:3749` | `mon.c:4499–4522` |
| `alloc_itermonarr` | sync `mon.js:3722` | `mon.c:4470–4490` |
| `itermonarr` / `itermonsiz` | file statics | `mon.c:4465–4466` |
| `movemon_singlemon` | local async `mon.js:3336` | the `bfunc` at `:1330` |
| `dmonsfree` | LIVE, after the iterator | `mon.c:1340` |

`sym.mjs`:

```
iter_mons_safe   js/mon.js:3749   ASYNC — await required
alloc_itermonarr js/mon.js:3722   sync
movemon_singlemon NOT EXPORTED — local js/mon.js:3336
```

No symbol was deleted or re-pointed. The `Array.slice` walk was inlined in `movemon`.

## C ↔ JS fidelity

`csym` `iter_mons_safe` is `mon.c:4497–4522` (the comment starts at `:4492`; the function is `:4499–4522`). The only call is `movemon` at `:1330`. JS `movemon` awaits `iter_mons_safe(movemon_singlemon)` after the early `gameover` return. That early return is not in C `movemon`. The commit names it. `save.c:1108` `alloc_itermonarr(0)` is inside `freedynamicdata`. Named, not wired.

Count: C walks `fmon` via `nmon`. JS walks `game.fmon` by index and increments once per slot, including dead and off-map entries that `dmonsfree` has not removed. A missing list is an empty chain (`nmons` 0). Then `alloc_itermonarr(nmons)`. `count` is `>>> 0`. The release test is `!count || count > itermonsiz || count + 40 < itermonsiz`, then the pointer is dropped and `itermonsiz` is 0. If `count > itermonsiz`, size becomes `count + 20` and the buffer is `new Array(itermonsiz)`. An empty level releases and does not allocate. A count inside `(itermonsiz - 40, itermonsiz]` keeps the buffer.

When `nmons` is non-zero, the second loop copies `list[i]` into `itermonarr[i]` before any `bfunc`. The call loop awaits `bfunc(mtmp)` and breaks on true. `program_state.gameover` breaks before that call. C has no such test: the comment at `:4494–4498` says `done` does not return, so the next monster is never reached, and `freedynamicdata` frees the buffer. JS `done` returns, so the flag is the stand-in for that non-return. It does not abort the `bfunc` that just set the flag.

After the iterator, `movemon` still calls `dmonsfree` and, when `u.utotype` is set, `deferred_goto`. `any_light_source`, `clear_bypasses`, and `clear_splitobjs` (`:1332–1337`) stay out. Named. No `rn2` in either new function.

## Hallucinations / overclaim

The subject says the snapshot includes dead and off-map monsters. The count is `list.length`, which is that array. It says `gameover` breaks before the next monster because `done` does not return. The check is in that place; C's function body does not read the flag. It says `alloc_itermonarr` frees on 0, on growth, and when the count is more than 40 below the buffer, then allocates `count + 20`. Those are the two `if`s.

## Density

`iter_mons_safe` and `alloc_itermonarr`, and the one C caller. The `save.c` release stays with `freedynamicdata`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify iter_mons_safe --base 9e67c4a79~1 --reach-all`.

```
verify iter_mons_safe: baseline 9e67c4a79~1 (scoreboard at fab716a35) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke iter_mons_safe: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2843's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
