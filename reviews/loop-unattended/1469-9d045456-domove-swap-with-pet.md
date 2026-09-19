# Review 1469 — 9d045456 — `hack.c` domove_swap_with_pet whole body (D-2510)

Metadata: SHA `9d045456`, `js/hack.js` +200/−~150, `js/monmove.js` +1/−1 (export keyword). C `hack.c:2097–2225` (`domove_swap_with_pet`, 129 lines, staticfn). D-log: D-2510.

## Intent vs deliverable

Promise: C-order restart — restored `goodpos` conjunct, `remove_monster`+`place_monster` placement, full minliquid/mintrap aftermath, four clones deleted and rebound, `M_AP_TYPE` + `You` forms. Diff delivers all of it. Promise = deliverable.

## Inventory

- Restarted arms in `domove_swap_with_pet` (hack.js:1063, exported — pre-existing D-1299 decision for the cmd.js caller).
- Deleted: `swap_curr_mon_load`, `swap_mundisplaceable`, `YMonnam_swap`, `just_an_swap`. Rebound to live `curr_mon_load` (now exported from monmove.js), `mundisplaceable`, `YMonnam`, `just_an`.
- `sym.mjs` (required): the monmove `curr_mon_load` body is C-exact (`mon.c`: boulder/throws_rocks skip, owt sum), so the export promotion heals clone drift rather than spreading it. Live `just_an(str)` subsumes the deleted subset-clone. `YMonnam` was already imported (hack.js:68).
- New words: `minliquid`, `abuse_dog`, `livelog_printf`, `experience/more_experienced/newexplevel`, `place/remove_monster`, `monsndx`, `adjalign`, `LL_CONDUCT`, `impossible`. `mundisplaceable` is a hoisted `export function` (uhitm.js:379); hack→uhitm edge ALREADY exists — the old "cannot import (uhitm imports hack)" comment was stale, no new cycle surface.

## C ↔ JS fidelity

Arms ≡ C in order: guard/boulder `:2101–2105` ✓; park/seemimic via `M_AP_TYPE` (raw-mask test fixed) `:2107–2114` ✓; trap lookup + `mtrapped` clear `:2116–2118` ✓; pit+boulder `:2120–2124` ✓; NODIAG (`swap_nodiag` kept — C macro) ✓; boulder-fit/squeeze via live `curr_mon_load` ✓; peaceful-trapped with live `just_an` ✓; peaceful-refusal with restored `!goodpos` conjunct + live `mundisplaceable` ✓; swap `mtrapped=0 → remove_monster(x,y) → place_monster(ux0,uy0) → newsym ×2` ✓ with C's `You("swap places with"/"frighten" + x_monnam ARTICLE_YOUR/THE/NONE, peaceful-adj, SUPPRESS_SADDLE)` ✓.

Aftermath `switch (minliquid ? Killed : mintrap(NO_TRAP_FLAGS))` ✓: Finished→break ✓; Caught/Moved→`abuse_dog`+`adjalign(-3)` ✓; Killed→`!killer++` livelog-first-kill logic reproduced exactly, `monsndx`+`mvitals.died`+`experience/more_experienced/newexplevel`, `rn2(4)` guilt + `ugangr++` + `adjalign(-15)` ✓ (sole RNG call, in order); default→`impossible` ✓ (named as comment-only, no JS assert export — accurate). Caller (domove displacement site) unchanged — signature stable ✓.

## Hallucinations / overclaim

None. The `:2147` assert note is honest (implied by the `:2116–2118` clear).

## Density

Whole 129-line function, two modules, ~200 insertions. Breadth-phase right size.

## Verification

Re-ran `hidden-proxy.mjs verify domove_swap_with_pet --base 9d045456~1 --reach-all`: 0 blocked both trees (row cited 0 blocks); smoke 24/24 PASS → REACH-OK. Matches the D-log. Diff grep clean. Rule #2 clean globally. (Full 44/44 cited for the shared-file change; the reach re-run plus green/cohort in the D-log stand unchallenged — no contrary evidence.)

## Actionable C-wrongs

None.

## Evidence appendix

C locus read in full: `hack.c:2097–2225`. Refusal ladder re-verified arm
by arm: pit+boulder (`mtrapped && is_pit && sobj_at(BOULDER)`) ✓; NODIAG
(`ux0!=x && uy0!=y && NODIAG`, `swap_nodiag` kept — C macro with no live
export, correct to keep local) ✓; boulder-fit (`u_with_boulder &&
!(verysmall && (!minvent || curr_mon_load<=600))`) ✓; squeeze (`bad_rock`
diagonal pair + `bigmonst || curr_mon_load>600`) ✓; peaceful-trapped
(`mpeaceful && mtrapped`, `trapname`/`feeltrap`/`just_an` live,
`handle_tip` same-file) ✓; peaceful-refusal with the restored
`!goodpos(ux0,uy0,mtmp,0)` conjunct + `t_at!=NULL` + live
`mundisplaceable` ✓. Swap (`:2173–2185`): `mtrapped=0`,
`remove_monster(x,y)`, `place_monster(mtmp,ux0,uy0)`, `newsym(x,y)`,
`newsym(ux0,uy0)` — JS hack.js:1137–1140 in that order ✓ — then
`You("%s %s.", peaceful?"swap places with":"frighten", x_monnam(ARTICLE_
YOUR/THE/NONE, peaceful-untame-adj, SUPPRESS_SADDLE-if-named))` ✓.

Aftermath (`:2187–2223`): `minliquid ? Killed : mintrap(NO_TRAP_FLAGS)` —
JS `await minliquid(…) ? … : await mintrap(…)` preserves the C evaluation
order (minliquid first, mintrap skipped when liquid) ✓; Caught/Moved →
`abuse_dog` + `adjalign(-3)` ("trap message already given, reinforce") ✓;
Killed → `!uconduct.killer++` first-kill livelog (JS if/else on the
pre-increment value is exactly post-increment-in-condition),
`monsndx` + `mvitals[mndx].died` + `experience/more_experienced/newexplevel`
("level gain before guilt" ordering kept), `rn2(4)` guilt + `ugangr++` +
`adjalign(-15)` ✓; default → `impossible` ✓. Sole RNG call `rn2(4)`, in
order ✓. `return !didnt_move` unchanged; caller signature stable.

Clone deletions verified: the four removed locals are gone from hack.js
(grep-clean); `curr_mon_load` monmove.js:214 body is C-exact so the new
export heals the drift; live `just_an(objnam.js:2222)` subsumes the deleted
subset (single-letter + the/molten-lava/iron-bars/ice + one/mathematical
rules); `mundisplaceable` uhitm.js:379 hoisted; hack→uhitm `--can` ALREADY
(the old "cannot import" comment was stale — same 94-module SCC, and the
D-log's full-44/44 on the shared-file change corroborates no TDZ).

Re-run output: `verify domove_swap_with_pet: baseline 9d045456~1 — 0
blocked (0 at baseline, 0 working)` + `smoke: 24/24 PASS → REACH-OK`.

Verdict: **ACCEPT**
