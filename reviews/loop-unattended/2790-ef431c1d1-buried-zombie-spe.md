# Review 2790 — ef431c1d1 — themeroom buried-zombie corpse spe=0

- **SHA:** `ef431c1d1` (Wed 2026-10-14) — makemon-row writer (D-3937).
- **D-entry:** D-3937. **Ledger:** `create_object` split gains `themeroom_fill_buried_zombies`.
- **Diff size:** `js/mklev.js` +6/−0 (1 code line), new focused test. Board: 1 row.
- **Method:** cliff commit (≤10 fns) — whole Method on the one changed site.

## Intent vs deliverable (promise vs diff)

The subject promises: 6 sessions diverge at makemon.c:1279 (C `rn2(2)`
gender vs JS corpse-timeout draws) because themeroom buried-zombie
corpses kept the mksobj gender roll in spe; C zeroes it via the
sp_lev des.object default; one line `otmp.spe = 0` moves 5→PASS and
Rogue-49950027 157→329.

The diff adds exactly that line plus a 5-line C cite and a focused
test pinning Healer-49950011 draws 9561–9566. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `themeroom_fill_buried_zombies` spe reset (mklev.js:31960) | sp_lev.c lspo_object :3556–3755, CORPSE lflags arm; create_object :2192–2440 spe apply | whole arm vs C |
| 2 | `scripts/themeroom-buried-zombie-spe.test.mjs` (new, 1 it) | recorded-C RNG regression pin | passes 1/1 (ran) |

No helper added, no symbol deleted or re-pointed — no required
re-point output. `sym.mjs set_corpsenm`: live sync export
js/mkobj.js:2311, no clones.

## C ↔ JS fidelity

C: param-table `des.object` for CORPSE/STATUE builds `lflags` from
historic/male/female (each default 0) and sets `tmpobj.spe = lflags`;
`create_object` then applies it (`if (o->spe != -127) otmp->spe =
o->spe`) right after `mksobj_at` — the gender roll is drawn and then
discarded. themerms.lua "Buried zombies" (:151–168) passes
id/montype/buried only → C spe=0. JS now does the same: `mksobj_at`
(draws, preserving RNG parity), `set_corpsenm` (verified
js/mkobj.js:2311–2365 never touches spe — order-insensitive ✓),
`otmp.spe = 0`, then the bury draws. Branch-by-branch exact.

Scope check: the shared `l_create_object` path already applies the
lflags default (`lspo_object_apply_montype`, CORPSE/STATUE/EGG/TIN
arms), so Massacre/Statuary were covered — only this hand-rolled
filler missed it. The named Medusa statue gap is real
(mksobj_at(STATUE) with no reset at the cited site) and correctly
left for its own iteration; stackobj-merge likewise named.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (this iteration, cited for all 6 SHAs).

## Hallucinations / overclaim

None. The temp-C revive() dump claim (17 revives, all spe=0) is
measurement prose; the durable proof is the session movement, which
reproduces. Owner-proven-whole (makemon gender chain) is consistent
with the writer-shaped fix.

## Density

Cliff phase (§10.18): parent head was makemon 6/2296 (verified in
`ef431c1d1~1:docs/LOOP-QUEUE.md`), Must-fix empty. Writer arm ported
with movement on all 6 probes; the one-arm shape is legitimate here
(the shared helper already carries the default whole; this was the
single hand-rolled site that missed it) with the Medusa sibling named
in the D-entry and Next. Own Ledger entry. ✓

## Verification

Re-measured myself (`--base ef431c1d1~1 --reach-all --jobs 8`, current code):

```
verify makemon: baseline ef431c1d1~1 — 7 session(s) blocked on it (6 at baseline, 1 in the working scoreboard)
  ...: 5 PASS, Rogue-49950027 moved → trapeffect_pit at step 329 (was 157)
  scen-sweep-Samurai-50050031: still makemon at step 953
verify makemon: 5 PASS, 1 moved past, 1 unchanged, 0 worse → PROGRESS
reach makemon: 2118 baseline-PASS session(s) reach it (2118 run, 1596.7s): 2118 PASS, 0 regressed → REACH-OK
```

The D-log's "5 PASS, 1 moved" reproduces exactly on the 6 baseline
sessions; the 7th blocked session is a post-commit Grow #6 arrival,
not a regression. No REGRESSED session.

## Actionable C-wrongs

None. One arm, C-exact, movement and full reach reproduce clean.

Verdict: **ACCEPT**
