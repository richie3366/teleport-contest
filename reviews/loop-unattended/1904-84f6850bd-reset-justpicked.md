# Review 1904 — 84f6850bd — reset_justpicked (D-2945)

- SHA: `84f6850bd` (coverage; `pickup.c` `reset_justpicked`)
- Files: `js/pickup.js` replaces the `olist || game.invent` scan with a null-safe walk. An array pack clears each element; any other head walks `nobj`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- The diff does not delete a symbol or re-point an import. `sym.mjs`:

```
reset_justpicked js/pickup.js:269   sync
```

## Intent vs deliverable

Subject promises one `reset_justpicked` that returns on a null list and otherwise clears `pickup_prev`, with the array pack as the stand-in for an `nobj` chain that is not rebuilt. The diff is that function. The same-spot paragraph is copied from the C comment and is not a branch.

## Inventory

| JS | Class | C |
|----|-------|---|
| `reset_justpicked` | live sync `pickup.js:269` | `pickup.c:615–632` |
| array element clear | pack representation | `olist->nobj` when the pack is an array |
| `nobj` walk | the C loop | `pickup.c:631–632` |

## C ↔ JS fidelity

`pickup.c:631–632` is the whole body that runs: `for (otmp = olist; otmp; otmp = otmp->nobj) otmp->pickup_prev = 0`. A null `olist` does not enter the loop and does not touch `gi.invent`. `extern.h:2437–2439` says `gi.invent` may be null. No `rn2`. The comment at `:619–628` is a TODO about staying on the same spot. It is not compiled.

JS `:283–287`: `Array.isArray` is false for null and for undefined, and the `nobj` loop does not start, so a null list no longer falls through to `game.invent`. An array (the hero pack) sets `pickup_prev = 0` on each non-null element and returns. A chain head uses `nobj`. A hole in the array is skipped; C has no hole. No RNG.

Callers, all `gi.invent`: `allmain.c:74` → `allmain.js:294`. `invent.c:1079` under `loot_reset_justpicked` → `u_init.js:1062` (`addinv_core0`). `pickup.c:781` (`n > 0`) → `pickup.js:1993`. `pickup.c:814` (`ct == 1 && count`) → `pickup.js:3617`. `pickup.c:883` (`!n_tried`) → `pickup.js:3692`. The `extern.h` lines are the comment and the prototype. `allmain.c:75` `pickup(1)` stays the comment at `allmain.js:295`. That is the next call, not an arm of this function.

## Hallucinations / overclaim

The subject says no arm is omitted. The loop is the only arm, and the null list no longer clears the pack. The same-spot text is the C comment. `pickup(1)` after the new-game reset is named and is not this function.

## Density

The coverage row asked for `reset_justpicked`. The whole body shipped. Callers that already passed `game.invent` still do. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify reset_justpicked --base 84f6850bd~1 --reach-all`.

```
verify reset_justpicked: baseline 84f6850bd~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify reset_justpicked: no corpus session is blocked on it at 84f6850bd~1 — a vacuous verify is NOT a corpus PASS. …
smoke reset_justpicked: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line. Full suite was skipped because `pickup.js` is not on the shared-file list.

## Actionable C-wrongs

None. The array walk is the pack that does not keep an `nobj` chain. `pickup(1)` is the named next call in `allmain`.

Verdict: **ACCEPT**
