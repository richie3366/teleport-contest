# Review 1273 — 4fac3591 — dig.c bury-family deferred arms (D-2307)

Metadata: SHA `4fac3591`, D-2307, C-fidelity residuals (no corpus owner). Method: `git show` stat + full `js/dig.js` + `js/zap.js` diff; C `dig.c:1982–2047` (`bury_an_obj`), `:2049–2081` (`bury_objs`), `:2084–2112` (`unearth_objs`), `:837–879` (`liquid_flow`), `timeout.c:1803–1822` (`end_burn`) via `csym.mjs`; full JS `unearth_objs` body read (tail check); `unearth_objs` caller audit across `js/`; `sym.mjs` on all 8 touched symbols incl. both re-pointed (output pasted); `imports.mjs --can dig.js pickup.js pooleffects`; `hidden-proxy verify bury_an_obj --base 4fac3591~1` re-run; added-lines-only banned-pattern grep.

## Intent vs deliverable

Subject promises: five deferred bury-family arms over now-live callees — `end_burn`, `maybe_unhide_at`, buried-ball re-punish, `delfloortrap` correction, damage chains + `pooleffects` in `liquid_flow` — plus the `unearth_objs` async ripple.
Diff actually changes (`js/dig.js` +83/−roughly-30, `js/zap.js` 1 line): exactly those five arms and the single `await` at `melt_ice`. Promise kept.

## Inventory

- `bury_an_obj` end_burn arm — `lamplit = 0` stub → live `end_burn(otmp, true)` via call-time dynamic `timeout.js` import.
- `bury_objs` — `await maybe_unhide_at(x, y)` joins the existing static `monmove.js` import.
- `unearth_objs` — sync→async + `bball`/`TT_BURIEDBALL` arm (same-module `buried_ball_to_punishment`, awaited).
- `liquid_flow` — `u_spot` hoisted pre-return, `deltrap`→`delfloortrap`, `await unearth_objs`, `fire_damage_chain`/`water_damage_chain` join the existing static `trap.js` import, `pooleffects(FALSE)` via call-time dynamic `pickup.js` import.
- `melt_ice` (zap.js) — `await unearth_objs(x, y)`.

## C ↔ JS fidelity

Branch-by-branch confirm against pinned C. `bury_an_obj` `:2011–2012`: `if (lamplit && otyp != POT_OIL) end_burn(otmp, TRUE)` — JS identical (the old bare `lamplit = 0` was a genuine C-wrong: it leaked the BURN_OBJECT timer and light source; fixed here). `bury_objs` `:2074`: loop → `del_engr` → `newsym` → `maybe_unhide_at` → costly pline — JS order identical. `unearth_objs` `:2084–2112`: `buried_ball(&cc)` hoisted pre-loop, `nobj` chain walk, ball+`utrap`+`TT_BURIEDBALL` → re-punish else extract/stop-timer/place/stack, tail `del_engr_at` + `newsym` (present in JS, `:491–492`) — identical, no break/continue delta. `liquid_flow` `:837–879`: `u_spot` read before the sanity return, `delfloortrap` (the old `deltrap` was a genuine C-wrong: C `:857` untraps a monster on the trap), `obj_ice_effects` + `unearth_objs`, fillmsg, object-damage-before-hero (bones comment carried), `pooleffects(FALSE)` / `minliquid` — identical. RNG: no `rn2`/`rnd` delta in any shipped arm (all draws pre-date this commit). `end_burn` (pre-existing `timeout.js:1573`, not ported here) matches `timeout.c:1803–1822` on every arm this caller reaches; its dropped `impossible()`s and the `OBJ_INVENT` `update_inventory` sit on paths unreachable from a floor-object bury (`OBJ_FLOOR`, `timer_attached=TRUE` unless magic-lamp/artifact-light) — out of this SHA's scope, no action.
Callee closure, all LIVE (`sym.mjs`, required output for the re-pointed pair pasted):

```text
deltrap          js/trap.js:1274   sync
delfloortrap     js/trap.js:1348   sync
end_burn         js/timeout.js:1573   sync
maybe_unhide_at  js/monmove.js:1246   ASYNC — await required (awaited)
fire_damage_chain js/trap.js:5389   ASYNC — await required (awaited)
water_damage_chain js/trap.js:5416   ASYNC — await required (awaited)
pooleffects      js/pickup.js:1871   ASYNC — await required (awaited)
buried_ball_to_punishment js/dig.js:533   ASYNC — await required (awaited)
```

(`delfloortrap`'s fountain.js:671 clone is pre-existing drift, untouched.) Async ripple audited: the only `unearth_objs` callers in `js/` are `liquid_flow` (awaited) and `melt_ice` (awaited this commit); trap.js's `maketrap_unearth_objs` is a separate pre-existing local. No floating promise. `--can dig.js pickup.js pooleffects` → same 90-module SCC, call-time dynamic import — no TDZ risk; static joins reuse existing edges. Sanity-`impossible` stays soft per named file convention; CORPSE-under-ice copies the C TODO; RUST_METAL `#if 0` both sides — all named.

## Hallucinations / overclaim

None. No dispatch-with-stubbed-callee: all five arms bottom out in live bodies. The probe write-up discloses its two detours (gstate snapshot, hero-centric ball search) rather than burying them.

## Density

~83-line diff for five arms of one C family across two files that already call each other — one falsifier, one locus family. In-band.

## Verification

D-log: preflight clean-tree PASS, hand probe 16/16 (deleted after run, out of tree), `verify --fn bury_an_obj` full matrix PASS with the hidden note explicitly vacuous (NOT a corpus PASS), cohort 7/7, full skipped (no shared-gated file — acceptable). Re-measured by this review:

```text
verify bury_an_obj: baseline 4fac3591~1 (scoreboard at 775e5959) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Row cited 0 blocks — vacuous-honest, no `--base` debt. Added-lines-only grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward` reads. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
