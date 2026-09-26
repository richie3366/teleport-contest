# Review 1842 — 64f8ebc04 — does_block / vision_reset (D-2883)

- SHA: `64f8ebc04` (coverage; `vision.c` `does_block` and `vision_reset`)
- Files: `js/vision.js`, `js/dig.js`, `js/mklev.js`. About 114 `js/` insertions in `vision.js`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can vision.js mon.js m_at` (and `hack.js is_moat`, `mkobj.js objects_at`): "ALREADY" statically imported. Those calls are inside functions, not at module eval.

## Intent vs deliverable

Subject promises one `does_block` (underwater moat, `m_at`, gas returns 2) and one `vision_reset` (cs0, both planes zero, dig loop, `vision_inited`, `vision_full_recalc`). `flip_level` calls `vision_reset`. The dig finish unblocks only when `!does_block`. The diff does that. `sym.mjs`:

```
does_block    js/vision.js:171   sync
vision_reset  js/vision.js:217   sync
is_moat       js/hack.js:1997   sync
m_at          js/mon.js:1728   sync
objects_at    js/mkobj.js:3335   sync
unblock_point js/vision.js:457   sync
hero_see_invisible NOT EXPORTED — local js/vision.js:131
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `does_block` | export `vision.js:171` | `vision.c:153–202` (`csym` 152–202) |
| `vision_reset` | export `vision.js:217` | `vision.c:211–265` |
| `hero_see_invisible` | local stand-in | `See_invisible` (`youprop.h:152`) |
| `is_moat` / `m_at` / `objects_at` | imports | `dbridge.c:100`; `mon.js:1728`; `mkobj.js:3335` |
| dig finish | caller | `dig.c:520` → `dig.js:2412` |
| `flip_level` | caller | `sp_lev.c:921` → `mklev.js:19133` |

## C ↔ JS fidelity

`does_block` returns 1 for `IS_OBSTRUCTED` / tree / closed-locked-trapped door, then 1 for `CLOUD` / water-wall / `LAVAWALL` / (`u.uinwater` and `is_moat`). `Underwater` is `u.uinwater` (`youprop.h:279`). `is_moat` reads the current cell (`MOAT`, or drawbridge-up with `DB_MOAT`, not Juiblex). Boulders walk `objects_at` (`_objects_at`, the nexthere chain). The mimic is `m_at` (grid, then `fmon`; the steed is off the grid while mounted). `!minvis || See_invisible`, then `is_lightblocker_mappear`. Gas is `visible_region_at` and returns 2. A missing cell returns 1. Named.

`See_invisible` is `HSee_invisible || ESee_invisible`. `hero_see_invisible` also accepts `uprops[SEE_INVIS]` and the sticky `u.See_invisible` flat. The commit names the flat. `mimic_light_blocking` now calls the same helper; that was already its predicate.

`vision_reset` points `viz_array` at `cs_buf0`, `_viz_rmin` / `_viz_rmax` at `cs_rmin0` / `cs_rmax0`, and zeros both could-see planes (`could_see[2]`). It does not clear the rmin/rmax slots; C doesn't either. The dig loop matches `:230–259`: column 0 starts blocked, `!!(IS_OBSTRUCTED || does_block)` because C `||` is 0/1 (a gas return of 2 still blocks), left/right spans, then the right edge `COLNO-1` and `viz_clear = !block`. Then `iflags.vision_inited` and `vision_full_recalc = 1`. `vision_recalc` still returns only for `in_mklev` (`vision.js:1028`). C also returns for `in_getlev` and `!vision_inited` (`vision.c:533`). Named. The flag is written; `end.js:1012` clears it.

`dig.c:520` unblocks only when `does_block` is 0. Return 2 does not unblock. `flip_level` calls `vision_reset` after `fix_wall_spines`, which is `sp_lev.c:915` then `:921`. The `extras` `set_wall_state` / `flip_visuals` (`:916–919`) stay omitted. Other C callers already call this export: `allmain.js:858`, `do.js:1839` and `:2010`, `wizcmds.js:614`, `save.js:986`.

## Hallucinations / overclaim

The subject says `#ifdef DEBUG` `seethru` is not compiled because there is no `#define DEBUG`. `patchlevel.h:36` defines `DEBUG`, so `does_block`'s `seethru` wraps (`vision.c:171–178`, `:191–198`) and the `block_point` early return (`:867–876`) are compiled. `gs.seethru` is 1 only for a wizard `explicitdebug("seethru")`; otherwise it is −1 and those wraps run the normal arms. Contest play does not set that flag. The omission is the debug toggle, not a missing cloud/moat/gas arm. `levl_sanity_check` (`wizcmds.c:1453`) is still absent. Named.

## Density

Both functions are the whole bodies, plus the dig caller and the `flip_level` caller that was missing. Not an arm-only port.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify does_block --base 64f8ebc04~1 --reach-all` and the same for `vision_reset`.

```
verify does_block: baseline 64f8ebc04~1 (scoreboard at c9abe5dc0) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke does_block: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
verify vision_reset: … 0 session(s) blocked … smoke (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
