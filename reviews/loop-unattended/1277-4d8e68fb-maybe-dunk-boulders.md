# Review 1277 — 4d8e68fb — apply.c maybe_dunk_boulders via live boulder_hits_pool; dig_check altar via altarmask_at (D-2311)

Metadata: SHA `4d8e68fb`, D-2311, C-fidelity residuals (row cited 0 blocks). Method: `git show` full `js/dig.js` + `js/apply.js` hunks; C `apply.c:3896–3905` (`maybe_dunk_boulders`) + `dig.c:206–252` (`dig_check`) via `csym.mjs`; `sym.mjs boulder_hits_pool` + `altarmask_at`; caller grep for `maybe_dunk_boulders`; `hidden-proxy verify maybe_dunk_boulders --base 4d8e68fb~1` re-run; added-lines banned-pattern grep.

## Intent vs deliverable

Subject promises: `maybe_dunk_boulders` retires its extract+delobj thin for the live `boulder_hits_pool` in C order, and `dig_check`'s altar arm reads mimic-aware `altarmask_at` instead of raw `lev.altarmask`.
Diff actually changes (dig.js +19/−6, apply.js 1 line): exactly that. Promise kept.

## Inventory

- `maybe_dunk_boulders` (js/dig.js:900) — sync → async, `delobj` → `await boulder_hits_pool(otmp, x, y, false)` via call-time dynamic `do.js` import.
- `dig_check` altar arm (js/dig.js:305) — raw mask → `altarmask_at(x, y)`, new static `pray.js` import.
- `apply.js:1278` — sole live caller now awaits (grep confirms: only other mentions are ledger/deferral comments).

## C ↔ JS fidelity

`maybe_dunk_boulders` against C `:3896–3905` (csym range `:3896–3905`): `while (is_pool_or_lava(x,y) && (otmp = sobj_at(BOULDER,x,y))) { obj_extract_self; boulder_hits_pool(otmp,x,y,FALSE) }`. JS reproduces the loop predicate, extract, and callee call with `FALSE ≡ false` — the D-0950 thin (extract+delobj, which dropped splash/fill/wake/lava arms) is retired, and those effects now ride the live `do.js` port. `boulder_hits_pool` is LIVE (`js/do.js:841`, ASYNC, awaited); the dynamic import is this file's documented convention for `do.js`.

`dig_check` altar arm against C `:219–223`: `IS_ALTAR && (madeby != BY_OBJECT || (altarmask_at(x,y) & AM_SANCTUM) != 0)`. JS now matches verbatim — the raw-`lev.altarmask` read missed mimicked-altar masks (review-17 row 3). `altarmask_at` is LIVE sync (`js/pray.js:261`); static import, hoisted function declaration — no TDZ risk (`--can` reports the edge present and safe).

Callee closure: no STUB in either live arm. Named omits (`blow_up_landmine` fill_pit/maybe_dunk/spot_checks, `On_stairs`-vs-`stairway_at`, `boulder_hits_pool` pre-existing thins, `fill_pit` flooreffects) are disclosed with owning rows. No STUB shipped in a live arm.

What the retired thin was losing, concretely — the old `extract + delobj` loop skipped everything `boulder_hits_pool` does on arrival:

- The pool-fill morph (`fills_up` formula + `chance` draw) — every dunked boulder also skipped C's `rn2(10)` fill draw, shifting all later positional RNG on any dunk turn.
- Splash messaging, `wake_nearto`, and lava damage — all ride the live port now.
- The fix restores the draw by routing through the live port rather than re-implementing it.

On the `dig_check` side, raw-mask vs `altarmask_at` differs exactly when a mimicked altar (`M_AP_FURNITURE` + `S_altar` with a corpsenm) sits at the dig cell:

- Raw `lev.altarmask` reports the underlying altar (or none); C reads the mimic's corpsenm.
- This affects both the message noun and the `desecrate_altar` alignment downstream.

On the `--can` ALREADY readout (vs the message's "new static import"): a post-commit artifact. The edge at `js/dig.js:83` originates in this commit — confirmed by `git show` (the import line is `+`-prefixed in this SHA); the tool run today sees the landed tree.

## Hallucinations / overclaim

None. The "new static pray.js import" wording is accurate as of the commit (the edge at `js/dig.js:83` originates here; today's `--can` ALREADY readout postdates it).

## Density

Twenty lines for two arms of one envelope across two already-linked modules. OK.

## Verification

D-log: clean-tree preflight, discriminating hand probe 16/16 (boulder-gone, C-order 2-boulder fills, sanctum/BY_OBJECT → FAIL_ALTAR), `verify --fn maybe_dunk_boulders` full PASS with hidden note explicitly vacuous, green 2/2 + strict ×2 + cohort 7/7. Re-measured by this review:

```text
verify maybe_dunk_boulders: baseline 4d8e68fb~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches — vacuous-honest, no `--base` debt. Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
