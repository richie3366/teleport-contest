# Review 1323 — d8cfa25c — music.c flute sleep-resist: sleep_monst_music defended(AD_SLEE) + shieldeff (D-2357)

Metadata: SHA `d8cfa25c`, D-2357, debt-named row (0 sessions
blocked on the charm/sleep family). Method: full `js/` hunk
read (`js/music.js`, +15/−7); C `sleep_monst`
(`nethack-c/upstream/src/mhitm.c:1222-1246` via `csym.mjs`,
full body read); C `defended` body scanned for RNG (0
`rn2/rnd/rn1/dice` hits); `AD_SLEE` pinned at
`monattk.h:46` (`#define AD_SLEE 4`); `sym.mjs` on
`defended` / `shieldeff` / `sleep_monst_music` (pasted
below); `grep sleep_monst_music js/music.js` (sole caller);
added-line banned grep (0 hits); `imports.mjs --rulecheck`
(clean, re-run) + `--can` (ALREADY); `hidden-proxy verify
sleep_monst --base d8cfa25c~1` re-run. No symbol deleted or
re-pointed (two names added to existing edges) → liveness
checks only.

## Intent vs deliverable

Subject promises two latent C-wrongs on the live MAGIC_FLUTE
path (trio + four `do_improvisation` arms verified exact, no
change): missing `defended(mon, AD_SLEE)` disjunct and
missing `shieldeff` on the resist return. Diff delivers both
in C order, one file, no new modules/edges. Promise kept.

## Inventory

- `js/music.js` `sleep_monst_music` (`:307`): resist-`if`
  gains middle `defended(mon, AD_SLEE)` + `await
  shieldeff(mon.mx, mon.my)`; sync → async; `defended`
  joins the existing `mondata.js` import, `shieldeff` the
  existing `display.js` import; `AD_SLEE = 4` file-local.
- Sole caller `put_monsters_to_sleep` (`:356`) awaits it;
  `d(10,10)` still evaluated pre-call, `mdistu`
  short-circuit unchanged.
- Header omit narrowed to the `trap.js sleep_monst` row.
- Named: `trap.js sleep_monst` defended/shieldeff/how>=0
  (own trap.c row); music `resist` clone mplayer dlev-floor
  arm; `finish_meating` vs inline `meating=0` (identical
  per `dogmove.js` export); music `resist` stays sync.

## C ↔ JS fidelity

Exact against C `:1231-1234`. C resists iff
`resists_sleep(mon) || defended(mon, AD_SLEE) || (how >= 0
&& resist(mon, how, 0, NOTELL))`, then `shieldeff(mx,my)`
inside the SAME arm before falling to `return 0` — JS keeps
all three disjuncts in order (bits ≡ `resists_sleep`, middle
`defended`, trailing `how>=0 && resist`) with the shimmer
inside the combined arm ✓. Prior JS missed the shimmer on
ALL resist paths (returned bare 0) and the whole middle
disjunct — both fixed, nothing else moved. `defended` LIVE
sync (`mondata.js:135`), RNG-free per C-body scan, so
insertion moves no draw ✓; `shieldeff` LIVE async
(`display.js:4412`), awaited, display-only ✓. `AD_SLEE = 4`
matches the pinned header ✓. `else if (mcanmove)` tail out
of diff scope, untouched. Callee closure: no stubs in the
arm; the deferred music-`resist` clone delta is named with
its owner, not widened here.

## Hallucinations / overclaim

None. Subject claims only the two arms and explicitly lists
what was verified-but-unchanged. "Inline MR_SLEEP bits
kept … avoids a new mhitm.js edge" is stated as a choice
with its exactness argument, not as C text.

## Density

Right-sized: one predicate + one display call on one live
path, ~15 insertions against a 25-line C locus.

## Verification

D-log honest (vacuous stated as vacuous, green + cohort
PASS, `/tmp` probe deleted). Re-run `--base d8cfa25c~1`:
"0 session(s) blocked (0 at baseline, 0 working)" —
matches; row cited 0 blocks so no deeper base owed.

```
defended         js/mondata.js:135   sync
shieldeff        js/display.js:4412   ASYNC — await required
sleep_monst_music NOT EXPORTED — file-local js/music.js:307 (pre-existing music-path fn, sole caller :356 awaited)
AD_SLEE 4 == monattk.h:46
ALREADY: music.js already statically imports mondata.js. No new edge needed.
```

## Actionable C-wrongs

None. Disjunct order, shimmer placement, constant, and
async wiring all verified; residuals are named with owners.

Verdict: **ACCEPT**
