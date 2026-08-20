# Review 261 — eca3330c — hack.c domove_swap_with_pet seemimic (D-1299)

## Metadata
- Full / short hash: `eca3330c14c9d8f8e1350a75b44863c83f7fbbc6` / `eca3330c`
- Parent: `3a861d5a` (reviews **257–260**). JS parent `086eb03d` (D-1298). This file audits **this SHA only**. Archive row **Addressed:** D-1299 `eca3330c` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 19:13:15 +0200
- D-id: **D-1299**
- Stats: 10 files, +288 / −92 — `js/hack.js` +167; `js/cmd.js` net rewrite of the occupy-then-swap caller.
- Claims to close: Open `hack.c` swap-with-pet `seemimic` (named from D-1275 / review **237**). Not display_self. `reviews/loop-2026-08-15/` has no unpaid seemimic Must-fix.
- JS / map: `hack.js` `domove_swap_with_pet`; `cmd.js` `is_safemon` caller; `c-js-map/turns.md`. `goodpos` origin conjunct / minliquid / mintrap aftermath / bump_mon stumble named.
- Prior reviews this SHA claims to close: **237** named omit pet-swap `seemimic` after `display_self`; **260** pointed Next Open at this row.

## Intent vs deliverable

Git subject promises: “Match C hack.c domove_swap_with_pet so a disguised pet is seemimic'd (hero parked at origin) before a possibly cancelled swap, instead of leaving the mimic glyph and swapping before occupy.”

C `domove_swap_with_pet` (`hack.c:2098–2224`): capture `u_with_boulder` at dest; park `u.ux=u.ux0`; `mundetected=0`; `if (M_AP_TYPE(mtmp)) seemimic`; resume dest. Then refuse: pit+boulder, NODIAG, dest boulder load, diagonal `bad_rock` squeeze, peaceful trapped (`feeltrap`/`just_an`/`handle_tip(TIP_UNTRAP_MON)`), peaceful `!goodpos || t_at(ux0) || mundisplaceable`. Else `remove_monster`/`place_monster` + `x_monnam` + minliquid/mintrap switch. Caller (`:2870–2926`): `m_at` before occupy; occupy; `m_postmove_effect`; skip ceiling hiders; restore ux on fail.

Old JS: cmd.js moved the pet then printed `x_monnam` before occupy; skipped seemimic; mundisplaceable early-returned `move=0`.

The diff **does** live park + `seemimic` + resume, the refuse chain except the `goodpos` conjunct, occupy-then-swap caller, and `handle_tip(TIP_UNTRAP_MON)`. It does **not** port `goodpos(ux0)`, minliquid/mintrap aftermath, displaceu, or bump_mon `stumble_onto_mimic`. Named. Occupancy is `mx/my` (JS `m_at` fmon scan), not C `level.monsters[][]`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `domove_swap_with_pet` | C `:2098–2224`, **new** | exported from `hack.js` |
| park / `mundetected` / `seemimic` / resume | C `:2107–2114`, **new** | before any refuse |
| `seemimic` | C `mon.c:4409–4426`, **imported live** | clears `m_ap_type`; light-block named in callee |
| pit+boulder / NODIAG / load / squeeze | C `:2120–2140`, **new** | |
| peaceful trapped + `handle_tip` | C `:2141–2153`, **new** | `feeltrap` / `trapname` live |
| peaceful `t_at` / mundisplaceable | C `:2154–2161`, **new** | `goodpos` conjunct **named omit** |
| `swap_nodiag` | C `hack.h` `NODIAG`, **clone** | `PM_GRID_BUG` only |
| `swap_curr_mon_load` | C `mon.c:1913–1924`, **clone** | skip boulder iff `throws_rocks` |
| `swap_mundisplaceable` | C `monst.h:227–230`, **clone** | cycle vs `uhitm.js` export; same tests |
| `YMonnam_swap` | C `do_name.c:1133–1137`, **clone** | `highc(y_monnam)` |
| `just_an_swap` | C `objnam.c` `just_an`, **clone** | matches `objnam.js` `just_an` |
| cmd.js caller | C `:2920–2926`, **wired** | `mon_at` ≡ `m_at`; skip `is_hider&&mundetected` |
| `goodpos` / mintrap switch | C `:2155` / `:2179–2222`, **named omit** | |
| displaceu / bump_mon | C `:2887` / stumble, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none on the seemimic/refuse path (guilt `rn2(4)` is inside the named mintrap-kill arm).

## C ↔ JS fidelity

Pinned C (`hack.c:2107–2114` + caller `:2920–2926`):

```
    u.ux = u.ux0, u.uy = u.uy0;
    mtmp->mundetected = 0;
    if (M_AP_TYPE(mtmp))
        seemimic(mtmp);
    u.ux = mtmp->mx, u.uy = mtmp->my;
        } else if (is_safemon(mtmp)
                   && !(is_hider(mtmp->data) && mtmp->mundetected)) {
            if (!domove_swap_with_pet(mtmp, x, y)) {
                u.ux = u.ux0, u.uy = u.uy0;
```

JS copies that order: `u_with_boulder` at dest after occupy; park `ux0`; clear `mundetected`; `M_AP_TYPMASK !== M_AP_NOTHING` then live `seemimic`; resume `mtmp.mx/my`. Caller occupies, `m_postmove_effect`, then swap; fail restores `ux0` and steed coords. Ceiling hiders skip the helper.

`seemimic` is not a stub: it zeros `m_ap_type`/`mappearance` and `newsym`s. `freemcorpsenm` / unblock_point stay named on that pre-existing callee — the promised mimic glyph is cleared.

Refuse chain: pit+boulder uses `t_at` then `is_pit` + `sobj_at(BOULDER)`; NODIAG only after diagonal (`ux0!=x && uy0!=y`); dest-boulder uses `verysmall && (!minvent || load<=600)`; squeeze uses `bad_rock` both corners and `bigmonst || load>600`. Peaceful trapped: `trapname` + unseen `feeltrap` + `just_an` + `handle_tip(TIP_UNTRAP_MON)` with C's `#untrap` tip string. Peaceful last arm: `t_at(ux0)` or mundisplaceable (priest/shk/gd/Oracle/`leader_m_id`). **`!goodpos(ux0,uy0,mtmp,0)` is commented out** — JS allows a peaceful swap onto a cell C would refuse. Named, not a fake `goodpos()` call.

Success arm sets `mx/my` to `ux0` and `newsym`s both cells. C `remove_monster`/`place_monster` updates `level.monsters[][]`; JS `m_at` scans `fmon` by `mx/my` (heads; worm segs on `_level_monsters`). For a normal pet that is occupancy-equivalent. minliquid/mintrap/`rn2(4)` guilt named — a successful swap does not drown or trap the pet.

This is **not** “Match C seemimic dispatch, callee is a stub.” `seemimic` runs. Do **not** stamp “Match C goodpos origin” or “Match C mintrap after swap.”

## Hallucinations / overclaim

Subject + D-1299 say a disguised pet is revealed with the hero parked at origin before a cancelled swap. **Park + live seemimic + refuse-before-place + restore-ux caller are the hunk.** Stamping **Addressed:** D-1299 is fair. Do **not** stamp “Match C `goodpos`.” Do **not** stamp “Match C minliquid/mintrap switch.” Do **not** stamp “Match C displaceu.” Do **not** stamp “Match C `stumble_onto_mimic`.” Clones (`NODIAG`, `curr_mon_load`, `mundisplaceable`, `YMonnam`, `just_an`) match their C bodies; they are not silent no-ops of the promised path.

## Density

Tight caller/callee cluster: helper + the one `domove` site C uses. ~167 JS lines including five cycle clones. Did not glue mintrap. Right size (§2b).

## Branch-by-branch confirm

1. Object/furniture mimic pet: park, `seemimic`, resume, then refuse or swap. Match `:2111–2114`.
2. Cancelled swap (mundisplaceable / NODIAG / pit+boulder): seemimic already ran; hero restored to `ux0`. Match display comment at `:2107`.
3. Grid bug diagonal: stop pline, no place. Match `NODIAG`.
4. Dest boulder + non-tiny loaded pet: won't-fit pline. Match `:2128–2134`.
5. Peaceful in unseen pit: `feeltrap`, `just_an`, `#untrap` tip. Match `:2147–2153`.
6. Peaceful onto `t_at(ux0)` or Oracle: doesn't-want-to-swap. Match `:2154–2161` minus `goodpos`.
7. Hostile safemon (not peaceful): skip those two arms; may swap and “frighten”. Match `x_monnam` verb.
8. Ceiling-hiding pet: caller skips helper (falling-monster). Match `:2920–2921`.
9. `goodpos` lava/pool origin still allowed. Named. **Public-unhit** unless a session walks into a disguised safemon.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `FORCEBUNGLE` is not in this hunk.

## Verification

Journal: private canary **19**/19; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session walks into a disguised safemon. Cadence this audit: full `sessions` at HEAD `1a7839f7` **44**/44 (see review **264**). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Park/`seemimic`/resume, refuse arms except `goodpos`, and the occupy-then-swap caller match C `:2107–2161` / `:2920–2926`.

Named omits (map, not Must-fix):

1. `goodpos(u.ux0, u.uy0, mtmp, 0)` conjunct
2. minliquid / mintrap switch (`Trap_Caught`/`Moved`/`Killed` + `abuse_dog` / `rn2(4)` guilt)
3. displaceu; bump_mon `stumble_onto_mimic`
4. `seemimic` `freemcorpsenm` / light-block unblock

Do not Must-fix “occupancy is `mx/my` not `place_monster`” for fmon heads. Do not Must-fix “`YMonnam_swap` lives in `hack.js`.” Do not wrap `wildmiss` as `pline_mon`. Next Open after this SHA was shop `add_damage` (now D-1300).

## Callers / RNG ledger

C: `domove` ← walk into `is_safemon`. JS `cmd.js` same. Seemimic/refuse add **no** gameplay `rn2`. Public fortress is not evidence a mimic pet unhid before a cancelled swap.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: disguised pets now `seemimic` with the hero parked at origin before refuse; `goodpos` and mintrap aftermath stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1299 `eca3330c`.
