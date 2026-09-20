# Review 1566 — 72bfcc06 — mkobj.c remove_object + save urealtime (D-2607)

**Metadata:** SHA `72bfcc06`, `mkobj.c` `remove_object`/`extract_nexthere`
+ `save.c`/`restore.c` urealtime repair, D-2607. JS: `js/mkobj.js`
(+57), `js/save.js` (+34/−1 comment). Map `data.md` touched.

## Intent vs deliverable

Subject promises: named port of both C functions, floor arm rewired,
save/restore urealtime fortress repair, 14 C callers wired. Diff
actually adds: `extract_nexthere` + `remove_object` under their C
names, the `obj_extract_self` floor-arm rewire with legacy tolerance,
and the save-persist/restore-refresh urealtime arms. Matches, with one
caller-count qualification below.

## Inventory

- `extract_nexthere(obj, head)` (new, `js/mkobj.js:3148`) — head-return
  adaptation (no `struct obj **` out-param; mirrors `extract_nobj`),
  throw for C `:2637–2638`.
- `remove_object(otmp)` (new, `js/mkobj.js:3172`) — C `:2508–2521` in
  order, throw for C `:2513–2514`.
- `obj_extract_self` floor arm routes `OBJ_FLOOR` through
  `remove_object`; unset-where legacy keeps the tolerant inline path.
- `dosave0` fold+persist+refresh; payload `urealtime{realtime,
  start_timing}` as epoch numbers; `try_restore_save` load + force
  start=now.

## C ↔ JS fidelity

C loci read via `csym.mjs`: `remove_object` `:2507–2521` (15 L),
`extract_nexthere` `:2622–2640` (19 L), `save.c:282–292`,
`restore.c:618–625`. Confirm:

- `remove_object`: ox/oy snapshot before the where-check (same order as
  C `:2511–2514`), pile unlink via `extract_nexthere` (`:2515`),
  `game.fobj = extract_nobj(...)` (`:2516`, sets FREE like C),
  BOULDER `recalc_block_point` (`:2517–2518`), timed
  `obj_timer_checks(otmp,x,y,0)` (`:2519–2520`). Exact, sync like C.
- `extract_nexthere`: prev/curr unlink loop, `!curr` → throw (house
  panic stand-in, `extract_nobj` precedent), `obj.nexthere = null`,
  head returned. Exact.
- Rewire rationale verified: C `level.objects` is always live; JS
  builds `game._objects_at` lazily, and C has no unset-where objects —
  so only true-`OBJ_FLOOR` enters the panicking function while legacy
  tolerance survives. The tolerant inline path below is byte-unchanged.
- Save: `finish=now; realtime+=delta(finish,start)`; persist realtime +
  pre-refresh start; `start=finish` — matches C `:282–292` (epoch
  numbers instead of civil strings: lossless in VFS JSON, no TZ
  round-trip). Restore: load both, then force `start_timing=getnow()`
  per C `:625` — matches. (`finish_time=0` on restore vs C leaving the
  field: unobservable, overwritten at next save.)
- No RNG in any new arm.

Caller closure (14 C sites): 11 reach `remove_object` transitively via
`obj_extract_self` — ball.c ×4 (ball.js:336/337 + 420/421/431/440/596),
hack.c:628 + movobj :828 (hack.js), light.c:322 (light.js:424),
mkmaze.c:1587 movebubbles (mklev.js:16166, explicit comment),
obj_extract_self arm mkobj.c:2565 (the rewire itself), shk.c:4703
(shk.js:1409), vault.c:636 move_gold (vault.js:304, explicit comment).
Three do not: mkobj.c:2378 lives inside `recreate_pile_at` (own
coverage row — correctly split, not silently dropped) and
sp_lev.c:2317/2326 (generic create_object saddle/mon-invent arm is a
map-named omit; JS `create_object` names it, only des-specific
productions wire the saddle). **Overclaim note:** the subject's "14 C
callers wired" counts the 3 named sites; the D-log Named section
scopes them correctly (own row + map-named + subsumed moverock relink).
No silent gap — but the subject line is wrong and should have said 11.
Callee closure: `recalc_block_point`, `obj_timer_checks`,
`extract_nobj`, `getnow`, `timet_delta` live; `--can` on both save.js
edges → pre-existing/hoisted. No clone, no stub.

## Hallucinations / overclaim

One subject-line overclaim ("14 wired" = 11 wired + 3 named), corrected
by the D-log body itself. No code-level hallucination; no
dispatch/stub split.

## Density

One C function pair + same-file self-arm + a same-window fortress
repair (seed0013 save/restore breach with a stashed-HEAD control:
fails identically without the port, passes with it). Two related
concerns, both in the save/floor-object family; acceptable density,
not two subsystems.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean.
- Diff grep: 0 FORCE/DIAG/getRngLog/fastforward hits.
- D-log Verify claims `--full` 44/44 + smoke REACH-OK. Re-measured:
  `hidden-proxy.mjs verify remove_object --base 72bfcc06~1 --reach-all`
  → 0 blocked at baseline and working tree (vacuous-note path,
  correctly framed) + `smoke 24/24 PASS, 0 regressed → REACH-OK`.
  Confirmed. The seed0013 repair rides on the D-log's `--full` run
  with control; no REGRESSED session in my re-run.

## Actionable C-wrongs

None (remaining gaps are a queued own row + map-named arms, not
Must-fix).

Verdict: **ACCEPT**
