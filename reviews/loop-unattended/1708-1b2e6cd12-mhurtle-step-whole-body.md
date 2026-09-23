# Review 1708 — 1b2e6cd12 — `dothrow.c` mhurtle_step whole body (D-2749)

Metadata: commit `1b2e6cd12`, D-2749, `js/dothrow.js` `mhurtle_step` only (`use_whip` is a Stale line, no `js/` edit). Missing-arm row, 0 corpus blocks. No prior review claimed closed.

## Intent vs deliverable

Subject promises the move, petrify, and hero-touch arms, and a Stale park of `use_whip`. The diff replaces `rloc_to` with `remove_monster` / `place_monster`, adds the steed `u_on_newpos` path, `set_apparxy`, waterwall stop, both `touch_petrifies` directions, `Some_Monnam`, `stop_occupation`, and the `x_monnam` killer. The bump text changes from `mon_nam` to `a_monnam`. That is the C body. `u_on_newpos` itself is still the two-line `ux`/`uy` writer.

## Inventory

Changed JS: `mhurtle_step` (`js/dothrow.js:3158`). New imports on modules the file already imported, plus four new module edges in the diff: `remove_monster`, `place_monster`, `u_on_newpos`, `set_apparxy`, `is_waterwall`, `a_monnam`, `stop_occupation`, `ARTICLE_YOUR`, `EXACT_NAME`, `SUPPRESS_NAME`. No deleted symbol (`rloc_to` stays exported; this function stopped calling it).

```text
remove_monster   js/steed.js:1161   sync
place_monster    js/steed.js:1117   sync
u_on_newpos      js/mklev.js:508    sync
set_apparxy      js/monmove.js:839  sync
is_waterwall     js/dbridge.js:126  sync
a_monnam         js/do_name.js:1189 sync
which_armor      js/worn.js:406     sync
Upolyd           js/const.js:3184   sync
x_monnam         js/do_name.js:902  sync
stop_occupation  js/hack.js:1596    ASYNC — awaited at :3211
minstapetrify    js/trap.js:3430    ASYNC — awaited
instapetrify     js/trap.js:3388    ASYNC — awaited; stores `str` in `killer.name`
```

`--can` for `remove_monster`, `u_on_newpos`, `is_waterwall`, `a_monnam`, and `which_armor` is **ALREADY** on this tree (the import lines are in this diff). `u_on_newpos` is a function declaration, not a const TDZ. `set_apparxy` is sync and called bare. `nh_delay_output` and `mintrap` are awaited.

## C ↔ JS fidelity

C `dothrow.c:991–1068` (`csym`, 78 lines). `csym --callers` only prints the forward decl (`:26`) and the `will_hurtle` comment (`:974`). The call is a function pointer: `walk_path(..., mhurtle_step, mon)` at `dothrow.c:1170`. JS drives that from `mhurtle` (`js/dothrow.js:3275`). No second caller.

- `!isok` → false. `will_hurtle && m_in_out_region` before the move (D-1176). ✓
- Non-steed: `remove_monster` clears the grid and does not change `mx`/`my` (`rm.h:526` and `steed.js:1161`), so the first `newsym` is the old cell; `place_monster` then sets `mx`/`my` and the second `newsym` is the new cell. ✓
- Steed: `ux0`/`uy0`, `u_on_newpos(x,y)`, caller-side `usteed.mx/my = ux/uy`, `newsym(ux0,uy0)`, `vision_recalc(0)`. C `dungeon.c:1567–1601` also does `cliparound`, `uundetected = 0`, the level-change `map_location` arm, `see_nearby_objects`, and `earth_sense`. Live `u_on_newpos` (`mklev.js:508–511`) writes `ux`/`uy` only. The steed pair is the one line this call site adds. The rest is the Open row this commit queued. Not a second Must-fix.
- `flush_screen(1)`, `nh_delay_output`, `set_apparxy`, `is_waterwall` → false, `mintrap(mon, HURTLING)` stop on Killed/Caught/Moved, else true. ✓
- Bump: `a_monnam` (was `mon_nam`), `wakeup(mtmp, !mon_moving)`, then `mon` petrifies from `mtmp` and `mtmp` petrifies from `mon`. Armor test is `!which_armor(..., W_ARMU|W_ARM|W_ARMC)`. For a monster, `worn.js:424` keeps the first `owornmask & flag` hit, so a combined mask works. `newsym` after each `minstapetrify`. ✓
- Hero: `Some_Monnam` (was `Monnam`), `stop_occupation`, `Upolyd(u)` matches `you.h:554` `umonnum != umonster`, `minstapetrify(mon, TRUE)`, then `!(uarmu || uarm || uarmc)` and `instapetrify` of `being hit by` + `x_monnam` (`ARTICLE_YOUR` if tame else `ARTICLE_A`, `"hurtling"`, `EXACT_NAME|SUPPRESS_NAME`, false). `hack.h:1012–1022`. ✓
- Else false. No RNG in this function.
- `mhurtle`'s NODIAG skip and post-path `minliquid` stay named. The step loop was already there; this commit only retires the petrify/steed sentence in its comment.

## Hallucinations / overclaim

"Named: none new — whole C body live; every callee live (21/21)" is false for `u_on_newpos`. The same commit's Open row and the function comment both say the live function sets `ux`/`uy` only. The four `--can` results on this tree are ALREADY, which matches imports that this diff added. The `use_whip` Stale line says the whole `apply.c:2955–3271` body is live at `use_whip` + `whip_attack`. The function header still names `#if 0` snatch-to-face and `wipe_engr_at`. Coverage had measured the outer function THIN (316 C lines / 139 JS lines). That park is a docs claim, not a new `js/` contradiction, and refills had already been treating `use_whip` as never-re-pop. No FORCE/DIAG/seed/coordinate/`fastforward`. Rule #2 clean.

## Density

One 78-line C function, one module. Right-sized for the missing-arm row. The steed callee's tail is queued, not silently stubbed.

## Verification

Re-measured (`--base 1b2e6cd12~1 --reach-all`). Parent scoreboard is `777f948a6`. Row cited 0 blocks.

```text
verify mhurtle_step: baseline 1b2e6cd12~1 (scoreboard at 777f948a6, 2026-09-22T00:07:48.595Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mhurtle_step: no corpus session is blocked on it at 1b2e6cd12~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke mhurtle_step: no RNG-tagged reach; fixed smoke spread (24 run, 2.9s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED on that smoke line. It is not a tagged reach: the tagger reports no corpus session executes `mhurtle_step`. The 0-block note matches the row. Green/strict/cohort claimed in the D-log.

The cadence re-score does not agree. `hidden-proxy score` moved `scen-genesis-Archeologist-91135` from PASS (scoreboard stamped `49fb30909`) to FAIL: screen step 178, RNG still 6017/6017, owner `mhitm_knockback` `uhitm.c:5357`, both toplines `You knock the chickatrice backward with a powerful strike!`. The only `js/` commit after `49fb30909` is this SHA (`rloc_to` replaced by `remove_monster` / `place_monster`, plus the petrify arms). That is a regression the smoke reach did not name.

## Actionable C-wrongs

1. `scen-genesis-Archeologist-91135` PASS→FAIL at step 178, owner `mhitm_knockback` (`uhitm.c:5357`), after this `mhurtle_step` body. The `u_on_newpos` tail stays the existing Open row; it is not this failure.

Verdict: **QUALITY-RISK**
