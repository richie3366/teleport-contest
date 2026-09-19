# Review 1468 — a263d08e — `insight.c` record_achievement whole body (D-2509)

Metadata: SHA `a263d08e`, `js/insight.js` +74/−~40, plus committed `scripts/record-achievement.test.mjs` (5 tests). C `insight.c:2406–2472` (`record_achievement`, 67 lines, global). D-log: D-2509.

## Intent vs deliverable

Promise: restart in C order — range guard with `impossible`, abs duplicate scan, sound hook, gameover skip, rank/prize/plain livelog arms, prize index off `achidx` not `absidx`. Diff delivers all of it. Promise = deliverable.

## Inventory

- Restarted: `record_achievement` (insight.js, sync like C — signature unchanged, so the ~32 existing call sites need no rewiring).
- One import word (`impossible`) on the live display edge; `impossible` is `export async` (display.js:7947) called fire-and-forget per the cited setworn precedent — log-only, nothing consumed.
- New maintained test `scripts/record-achievement.test.mjs`; ran it: 5/5 pass (verified, not taken on trust).
- `sym.mjs` (required): nothing deleted or re-pointed.

## C ↔ JS fidelity

Arm-by-arm: guard `(ai<1 && rank-range) || ai>=N_ACH` → `impossible` + `return` ✓ (the missing `impossible` and the `return` both confirmed in the working tree); abs duplicate scan with `++i`, Bell/Book semantics ✓; SoundAchievement named with a build-level proof (no `SND_LIB_*` backend → `:274` empty definition applies) — a compile-time no-op in this build, correctly not emulated ✓; `ach[i]=ai` + 0-terminator ✓; gameover skip (`game.program_state?.gameover ≡ program_state.gameover`) ✓; rank arm (`rank_to_xlev(absidx-(ACH_RNK1-1))`, `Role_switch=mnum`, `(ai<0)?TRUE:FALSE`) ✓; prize arm indexed `achieve_msg[ai]` (ai>0 for both prizes, so ≡ C's `achieve_msg[achidx]`) with otyp from `game.context.achieveo` ≡ `svc.context.achieveo` ✓; plain arm off `absidx` ✓. No RNG in C; none added ✓.

Callee closure: `rank_of`, `rank_to_xlev`, `livelog_printf`, `objectNameStrs` LIVE; `achieve_msg` table row-cited. Named omits (ACH_INVK ritual path, sound runtime dispatch, ascension-split logging) are map-owned elsewhere, not this body.

## Hallucinations / overclaim

None. The old `achieve_msg[absidx]`-for-prize indexing bug the message claims is visible in the removed lines ✓.

## Density

Whole 67-line function + a real committed test, one module, 74 insertions. Right size.

## Verification

Re-ran `hidden-proxy.mjs verify record_achievement --base a263d08e~1 --reach-all`: 0 blocked both trees (row cited 0 blocks); smoke 24/24 PASS → REACH-OK. Matches the D-log. Diff grep clean. Rule #2 clean globally.

## Actionable C-wrongs

None.

## Evidence appendix

C locus read in full: `insight.c:2406–2472`. Guard (`:2414–2421`): valid
is `1..N_ACH-1`, except ranks which may be negative (complement gender
encoding) — JS condition is the direct transcription, and the previously
missing `impossible("Achievement #%d is out of range.", achidx)` + `return`
are both confirmed in the working tree (the old body silently returned).
Scan (`:2423–2433`): extra-slot 0-termination, first-empty-or-match on
`abs(u.uachieved[i]) == absidx`, Bell/Candelabrum/Book/Amulet re-take
comment — JS `ensure_uachieved()` + `ach[i+1] = 0` keeps the invariant
explicitly since JS arrays don't over-allocate. Sound (`:2435–2441`):
C sounds even on repeat; `SoundAchievement` → `sndprocs.h:232–237` →
backend-gated `:274` empty definition — with no `SND_LIB_*` backend in this
build the call is a compile-time no-op, so naming it (not emulating it) is
the faithful choice. Gameover skip (`:2447–2451`, nudist/blind-from-birth +
ascension-in-really_done) ✓. Rank arm (`:2453–2461`):
`achieve_msg[absidx].llflag`, `"attained the rank of %s (level %d)"`,
`rank_to_xlev(absidx-(ACH_RNK1-1))`, `Role_switch` = `game.urole?.mnum`
(`you.h:248`), `(ai<0)?TRUE:FALSE` ✓. Prize arm (`:2462–2468`):
`achieve_msg[achidx]` with `achidx>0` (both prizes positive) so `[ai]` is
exact; otyp from `game.context?.achieveo` ≡ `svc.context.achieveo`;
`OBJ_NAME` ≡ generated `objectNameStrs` per the C note's own justification
(both prize items fully named) ✓. Plain arm (`:2469–2471`) off `absidx` ✓.

`achieve_msg` table cited row-identical to C `:57–91` (33 rows); the old
`|| achieve_msg[0]` fallback is correctly gone (guard makes indices total).
Signature unchanged (sync, same name) so the ~32 existing call sites need
no rewiring; the D-log's "comments, not calls" for context.h:131 /
do_wear.c:2516 checked — both are comment text. Committed test run live:
`node --test scripts/record-achievement.test.mjs` → 5 pass, 0 fail
(record+livelog, dup suppression, negated-rank abs match,
gameover-record-without-livelog, out-of-range no-record).

Re-run output: `verify record_achievement: baseline a263d08e~1 — 0 blocked
(0 at baseline, 0 working)` + `smoke: 24/24 PASS → REACH-OK`. Rule #2
clean globally.

Verdict: **ACCEPT**
