# Review 1280 — 00e88b95 — do.c goto_level falling arm: floor objects follow via impact_drop (D-2314)

Metadata: SHA `00e88b95`, D-2314, C-fidelity residual (row cited 0 blocks). Method: `git show` full `js/do.js` hunk (+9/−1); C `do.c:1611–1613` + surrounding order (`impact_drop`/`check_special_room`/`fill_pit`/`keepdogs`) via `csym.mjs goto_level` + direct read; JS `js/do.js:1469–1479` order read; `sym.mjs impact_drop`; `hidden-proxy verify goto_level --base 00e88b95~1` re-run; added-lines banned-pattern grep.

## Intent vs deliverable

Subject promises: wire the C `if (falling) impact_drop(0, u.ux, u.uy, newlevel->dlevel)` arm so falling descents carry eligible floor objects with MIGR_WITH_HERO delivery.
Diff actually changes (`js/do.js` only): the import join + the four-line `if (falling)` arm. Promise kept.

## Inventory

- `goto_level` falling arm (js/do.js:1471) — `await impact_drop(null, u.ux|0, u.uy|0, newlevel.dlevel|0)`.
- `impact_drop` joins the existing static `dokick.js` import (no new module edge).

## C ↔ JS fidelity

C `do.c:1611–1613`: `if (falling) /* assuming this is only trap door or hole */ impact_drop((struct obj *) 0, u.ux, u.uy, newlevel->dlevel);` sitting after the travelcc/polearm clears and immediately before `check_special_room(TRUE)` (`:1615`). JS: arm placed immediately before the keepdogs block, hence before `check_special_room(true)` (`:1479`) — the load-bearing relative order (impact_drop precedes check_special_room) is preserved. Args match exactly (`0 ≡ null`, `| 0` coords, `newlevel.dlevel`).

Callee closure: `impact_drop` is LIVE (`js/dokick.js:1963`, ASYNC, awaited); its `dlev != 0 → MIGR_WITH_HERO` arm was already live with zero production callers, so this wire activates tested code rather than landing untested surface. No STUB, no clone, no new edge (`--can` ALREADY via the `ship_object`/`obj_delivery` edge — confirmed present at `js/do.js:104`).

Order note (pre-existing drift, correctly disclosed not fixed): C runs `check_special_room → fill_pit → … → keepdogs` (keepdogs post-arrival), while JS runs `keepdogs → check_special_room`; the new arm precedes both, so it satisfies C's constraint under either surrounding order. The travelcc/polearm-clear drift and `goto_hell` (zero `js/` hits — own future row) are named with loci.

Why the arm matters despite zero corpus reach:

- Before this wire, `impact_drop`'s `dlev != 0 → MIGR_WITH_HERO` path (C `:1560–1564`) had zero production callers.
- Every `falling=TRUE` descent left the old-square pile behind: dug-HOLE hero fall (dig.c:791), trapdoor/hole `fall_through` via `schedule_goto` UTOTYPE_FALLING, off-stairs descents (dungeon.c:1512).
- Any object that should have ridden along (C `rn2(3)` fall chance, 1/30 boulder rate) never drew at all.
- The D-log's caller arg-order audit (`(FALSE,TRUE,FALSE)`, `(!Flying?FALLING:NONE)`, `(at_stairs,!at_stairs,FALSE)`, deferred_goto typmask) rules out the alternative hypothesis of a call-site order bug — the callee arm was simply never invoked.
- The probe's conservation check (13+5=18 across the level boundary) is the discriminating observation: a call that migrated nothing, or migrated without `OBJ_MIGRATING`, would fail it.

## Hallucinations / overclaim

None. The D-log's caller arg-order re-verification (dig.c:791, trap.c:609–697, dungeon.c:1512, do.c:2085) is checkable and the REFILL-hold paragraph vets the 7-Open queue state rather than inventing filler.

## Density

Nine lines for one C `if` arm. Right-sized (C is that small).

## Verification

D-log: clean-tree preflight, discriminating hand probe (staged 12-object pile: conservation 18 = 13+5, every migrant `MIGR_WITH_HERO` + migrating, ≈1/3 fall rate, empty-square early return), `verify --fn goto_level` full PASS **including full 44/44** (shared-file gate fired), hidden note explicitly vacuous. Re-measured by this review:

```text
verify goto_level: baseline 00e88b95~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches — vacuous-honest, no `--base` debt. Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
