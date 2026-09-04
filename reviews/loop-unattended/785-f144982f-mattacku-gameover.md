# Review 785 — f144982f — mhitu.c mattacku abort NATTK after done() (D-1816)

## Metadata
- Full / short hash: `f144982f5d7e84e51821a96068a9382446d210c1` / `f144982f`
- Parent: `82865f2c` then D-1815; this SHA’s parent in log is after the fortress note. Must-fix fortress §1 (`docs/2026-09-04-fortress-regression-42-44.md`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 09:07:21 +0200
- D-id: **D-1816**
- Stats: `js/mhitu.js` +6. `js/` insertions **6** ≤250. Band **80–350**. Must-fix stays one item (§2b).
- Claims to close: seed0030 Maganasipi second attack after `can_make_bones`. Review **764** blamed sticky `usleep`; D-1797 did not move the miss (review **766**). Human bisect: D-1795 made the remaining NATTK body live, which made the missing `done` longjmp analogue load-bearing.
- JS / map: `js/mhitu.js` `mattacku` loop tail. `c-js-map/turns.md`. Archive **Addressed:** D-1816 `f144982f`.

## Intent vs deliverable

Git subject promises: Match C `mhitu.c` `mattacku` so the NATTK loop aborts when `done()` has ended the game, instead of a second attack after `can_make_bones`.

`node scripts/csym.mjs mattacku` → `mhitu.c:490–952`. Loop tail `:938–950` (`bot`, sleep `rn2(10)`, `M_ATTK_AGR_DIED`/`AGR_DONE`). `node scripts/csym.mjs done` → `end.c:1019–1126`; survive/`savelife` `return`; else `really_done` then `/*NOTREACHED*/`. `--callers mattacku`: `dogmove.c:911/:1286`, `monmove.c:954/:971`, `priest.c:202`, `shk.c:4900`, `worm.c:359`.

Parent: JS `hitmu` → `mdamageu` → `done`/`really_done` **returns** after `program_state.gameover`. `sum[i] = M_ATTK_HIT`. No `M_ATTK_DEF_DIED` on that path in C (it longjmps). Loop starts `i=1`: `rnd(20+i)` / `d(damn,damd)` / knockback `rn2(3)`/`rn2(6)` + “hits again”. Measured: seed0030 seg3 JS 9896 vs C 9892. The diff **does** add `if (game.program_state?.gameover) return 1` after the `switch`, before `bot` / sleep / `i+1`. No new helpers. Did **not** invent `M_ATTK_DEF_DIED` on `hitmu`. Did **not** throw `DoneError`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `mattacku` | LIVE repaired | gameover abort only |
| `done` / `really_done` | LIVE unchanged | JS returns; C longjmp |
| `hitmu` | LIVE local | C `staticfn`; remaining ads named |
| `savelife` wizard/explore | LIVE | does **not** set `gameover` |
| `hitmu` remaining ads | OMIT named | |
| SEDUCE=0 `c_sa_no` | OMIT named | |
| `uhitm` `prev_result` | OMIT named | |

`node scripts/sym.mjs` (no clone→import):

```
mattacku         js/mhitu.js:2760   ASYNC — await required
done             js/end.js:1363   ASYNC — await required
really_done      NOT EXPORTED — 1 LOCAL in end.js:918 (C staticfn; do NOT add #2)
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. No `--can`.

## C ↔ JS fidelity

**C never reaches `:938–950` after a killing slot.** `done` `:1125–1126` `really_done` / NOTREACHED. Survive (`Lifesaved` / wizard-or-discover `Die?` no) `:1120–1123` returns **without** `gameover`; the NATTK loop continues. JS gate uses `program_state.gameover`, so `savelife` still falls through to `bot` / sleep / `i+1`. **Match that split.**

**Placement.** Abort is **before** `bot()` and sleep `rn2(10)`. C would not have drawn that `rn2(10)` nor started `i=1`. Putting the check after sleep would have been extra combat RNG on the death path. AGR_DIED / AGR_DONE after the gate still match C when the hero lives.

**`return 1`.** C’s `return 1` at `:947` is attacker-dead. After hero death C never returns a value. JS `return 1` is the same analogue already used in `muse.js` / `zap.js` / `monmove.js` / `allmain.js` (`if (game.program_state?.gameover) return`). Callers that treat nonzero as “attacker died” skip leftover AI C would not have run (longjmp). seed0030 full-length match shows this does not leak the four extra draws.

**RNG.** This peel **removes** JS-only `rnd(21)` / `d(4,4)` / `rn2(3)` / `rn2(6)` on the Maganasipi kill. Sleep `rn2(10)` stays (D-1795); D-1797 already clears `usleep`. No FORCE.

**Callee closure.** `done` is LIVE (returns — the JS constraint). No STUB in the shipped arm. Named omits unchanged.

## Hallucinations / overclaim

Subject is the abort, not a re-port of `mattacku` / `hitmu`. Do **not** stamp “Match C `M_ATTK_DEF_DIED` on `hitmu`.” Do **not** reopen D-1797 `usleep` as the seed0030 cause. Do **not** chase concat gem-colors (fortress §1).

## Density

§2b Must-fix: six lines at the cited tail. Did **not** glue `hitmu` ads / `DoneError` / gem colors. Right size.

## Verification

Hidden-proxy tools did **not** exist yet at this SHA. No corpus session is blocked on this abort (public seed0030 was the owner). Journal: save-oracle skip; seed0030 RNG 105529/105529 Screen 1953/1953, `rng-diff --all-segments` OK, strict; green; cohort 0004/0007/0012/1500/2200/0383 + strict. D-log has no `hidden-proxy verify` bullet — **not required**; the falsifier was the public session.

This audit: `csym` `:490–952` tail `:938–950` and `done` `:1019–1126` vs HEAD `js/mhitu.js:3138–3156`. Rule #2 scan at end-of-iter.

## Actionable C-wrongs

None in this peel. Named (map, not Must-fix): `hitmu` remaining ads; SEDUCE=0; ceiling `in_rooms`; `uhitm` `prev_result`.

Verdict: **ACCEPT**
