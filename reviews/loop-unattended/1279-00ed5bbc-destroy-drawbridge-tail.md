# Review 1279 — 00ed5bbc — dbridge.c destroy_drawbridge full tail: Soundeffect, flooreffects, scatter, unblock, both-entity crush (D-2313)

Metadata: SHA `00ed5bbc`, D-2313, C-fidelity residuals (row cited 0 blocks). Method: `git show` full `js/dbridge.js` hunk (+108/−17); C `dbridge.c:887–1019` via `csym.mjs destroy_drawbridge` (range `:887–1019`); `sym.mjs` on all 18 new/joined callees (required outputs pasted below); clone reads (`wake_nearto` `:111`, `occupants` `:214`, `hero_Deaf` `:392`) + C `mon.c:4373–4399` (`wake_nearto_core`) + `youprop.h:125` (`Deaf`); `u.Deaf`-writer grep; `hidden-proxy verify destroy_drawbridge --base 00ed5bbc~1` re-run; added-lines banned-pattern grep.

## Intent vs deliverable

Subject promises the full deferred RNG/crush tail: both Soundeffects in C order, boulder `flooreffects("fall")`, the `rn2(6)` iron-chain `scatter` loop, conditional `unblock_point`, split stronghold flags, and the both-entity crush/`do_entity`/`nokiller` tail.
Diff actually changes (`js/dbridge.js` only): exactly that. Promise kept.

## Inventory

- Two `Soundeffect` calls (splash/crash, before messages).
- Boulder arm: `delobj` → `await flooreffects(otmp2, x, y, 'fall')`.
- Debris loop: `rn2(6)`/`rn2(2)` + `mksobj_at` + `await scatter(…, 1, MAY_HIT, …)`.
- Vision: unconditional `recalc_block_point` → `if (!does_block(x2,y2,lev2)) unblock_point(x2,y2)`.
- Flags split: `uopened_dbridge` before crush, `uheard_tune = 3` after `nokiller()`.
- Both-entity tail: `occupants()[1]` portcullis (`automiss`, no-miss-kill) then `[0]` span (`e_missed` → spoteffects/minliquid else crush + MOAT `do_entity`), `nokiller()`.

## C ↔ JS fidelity

Walked against C `:887–1019`: Soundeffect kind/level/position (splash-100 in moat arm, crash-100 in dry arm, crushing-75 in the unheard-shrapnel arm) all match; boulder extract+`flooreffects(otmp2,x,y,"fall")` verbatim; scatter loop verbatim incl. per-iter double `rn2(2)` coordinate pick and the force-1 comment; `does_block`/`unblock_point` gate verbatim; flag split matches C `:975–977` vs `:1016–1018`; entity tail matches arm-for-arm — `etmp2 = occupants[1]` portcullis-first order, `E_phrase` verbs ("are blown apart" / "get into some heavy metal" / "are hit by a huge chunk"), killer names ("exploding drawbridge" / "collapsing drawbridge", `KILLED_BY_AN`), `XKILL_NOCORPSE | inview ? GIVEMSG : NOMSG`, `CRUSHING`, MOAT-gated `do_entity`, trailing `nokiller()`. `debugpline1` ×2 omitted as D_DEBUG-only per file convention. No RNG added, removed, or reordered outside C order.

Callee closure (`sym.mjs`, required): `flooreffects` do.js:678 ASYNC; `scatter` explode.js:877 ASYNC; `mksobj_at` mkobj.js:1973 sync; `does_block` vision.js:158 sync; `unblock_point` vision.js:413 sync; `set_entity`/`e_canseemon`/`automiss`/`e_missed`/`E_phrase`/`is_u` same-module sync (`:280/:300/:420/:525/:318/:292`); `e_died` :462 ASYNC; `do_entity` :564 ASYNC; `nokiller` :726 sync; `minliquid` mon.js:2343 ASYNC (all awaited); `spoteffects` existing pickup.js edge.

Pre-existing arms re-read around the insertion (the tail lands between them): the moat/dry message split (`DRAWBRIDGE_UP` portcullis vs span, `You_hear` fallbacks), `wake_nearto(x, y, 500)`, wall-DOOR + double `deltrap` + double `del_engr_at`, and `vision_recalc(0)` are all untouched and in C order — the new code slots into the exact C positions (`:906/:935/:955/:966/:975` before the entity tail, flags split at `:968–970` / `:1016–1018`). The `if (!game.killer)` guard before setting killer format/name is outcome-equivalent to C's unconditional `Strcpy` (creates-if-missing, overwrites otherwise — and `nokiller()` at the end resets both sides alike).

Clone adjudication (all three verified, none a STUB):
- `occupants()` (`:214`) is the JS home for C's `go.occupants[ENTITIES]` zero-init global, not a behavior clone — LIVE-equivalent, pre-existing.
- `hero_Deaf()` (`:392`) adds `|| u.Deaf` beyond C `youprop.h:125` (`HDeaf || EDeaf || u.uroleplay.deaf`), but a full-`js/` grep finds zero `u.Deaf` writers, so the extra disjunct is dead and the clone is behaviorally exact today (same conclusion as the domonnoise park).
- Local `wake_nearto` (`:111`) genuinely diverges (`& ~0x01` vs C `~0x30000000`, missing `G_UNIQ` gate + `wake_msg` + petcall tail, verified against `mon.c:4373–4399`) — but it is PRE-EXISTING (D-0959, untouched by this diff) and the commit names it with owning locus as its own future row. Disclose-and-defer was correct; not a Must-fix from this SHA.

## Hallucinations / overclaim

None. The `--can` ×4 claims check out (the two ALREADY edges — `mon.js`, `vision.js` — are confirmed pre-existing imports; the two new static edges are hoisted-fn modules in the same SCC, and the import smoke passed).

## Density

One hundred eight insertions for one 133-line C function tail. Large but a single locus family, shipped whole per §2b (no stub left in the arm). OK.

## Verification

D-log: clean-tree preflight, `verify --fn destroy_drawbridge` full PASS with hidden note explicitly vacuous, green 2/2 + strict ×2 + cohort 7/7, import smoke IMPORT-OK. Re-measured by this review:

```text
verify destroy_drawbridge: baseline 00ed5bbc~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches — vacuous-honest, no `--base` debt. Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
