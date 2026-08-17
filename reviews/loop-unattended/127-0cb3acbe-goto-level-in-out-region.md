# Review 127 — 0cb3acbe — do.c `goto_level` `in_out_region` (D-1166)

## Metadata
- Full / short hash: `0cb3acbe5e763ea3607c0f3fd29c51d0a877ca6c` / `0cb3acbe`
- Parent: `6d44ab7f` (D-1165). This file audits **this SHA only**. Archive row **Addressed:** D-1166 `0cb3acbe` was filled by D-1167.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 16:33:40 +0200
- D-id: **D-1166**
- Stats: 13 files, +142 / −64 — `js/do.js` +12 / −1 (import + one await); comments in `cmd.js` / `region.js` / `teleport.js`.
- Claims to close: Open queue `do.c` `goto_level` `in_out_region` (named). Not walk. Reviews **118** / **126** named `do.c:1981`. `reviews/loop-2026-08-15/` has no open goto-level-region Must-fix.
- JS / map: `do.js` `goto_level`; callee `region.js` `in_out_region` (D-1143). `c-js-map/turns.md` `do.c`. `obj_delivery` / `fix_shop_damage` / `do_fall_dmg`, `mhurtle_step` `m_in_out_region`, `run_regions` `hero_inside` bit still named.
- Prior reviews this SHA claims to close: **118** named omit; **126** named next-port; D-1165 next-port.

## Intent vs deliverable

Git subject promises: “Match C do.c goto_level so arriving on a level updates REG_HERO_INSIDE from the landing cell, instead of keeping leave-time bits until a later walk.”

Old JS `goto_level` restored/created the dest map (`getlev` restashes `info.regions` / `mklev` builds new), ran `check_special_room`, then `pickup(1)` with no C `in_out_region(u.ux,u.uy)`. Restored `player_flags` therefore stayed at **leave-time** membership for that level until walk (D-1157) / hurtle (D-1165) / teleds `update_player_regions` (D-1130). A return into a cloud (or out of one) did not flip the bit at arrival.

The diff **does** `await in_out_region(u.ux, u.uy)` after `check_special_room` and before `pickup(1)`, and **discards** the boolean (C `(void)` — do not abort the level change). It does **not** port `obj_delivery(TRUE)` (`do.c:1978`, between room messages and this call), `!new` `fix_shop_damage` (`:1985–1986`), or `do_fall_dmg` (`:1988–1994`). Named. Already in Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goto_level` `in_out_region(u.ux,u.uy)` | C caller, **new call** | `do.c:1980–1981` |
| `in_out_region` | C callee, **imported** | D-1143; gas `NO_CALLBACK` never rejects |
| `(void)` return | C caller, **match** | JS awaits and ignores false; does not `return` from `goto_level` |
| `check_special_room(FALSE)` | C caller, **pre-existing** | immediately before `obj_delivery` in C; JS immediately before this new call |
| `obj_delivery(TRUE)` | C caller, **named omit** | `:1978`; between room messages and the helper |
| `fix_shop_damage` / `do_fall_dmg` | C callers, **named omit** | after the helper, before `pickup` |
| `pickup(1)` | C caller, **pre-existing** | still last |
| dest `game.regions` restore | C `rest_regions`, **pre-existing** | `do.js:1456–1489` before this site |
| `run_regions` hero `inside_f` | C body, **named omit** | still geometry |
| `mhurtle_step` `m_in_out_region` | C caller, **named omit** | Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Landing cell is live `u.ux,u.uy` after `u_on_*`, not a traced square. Rule #2 clean.

**New RNG on this path:** none (same as D-1165). Path **public-unhit** on arriving into a live restored region whose enter/leave would reject (vanilla gas never rejects). Public stairs still match because empty/`NO_CALLBACK` is a no-op besides bit repair.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not abort `goto_level` when the helper returns false. Do not skip the call after a real level change. Do not pull `obj_delivery` / `fix_shop_damage` / `do_fall_dmg` into this peel. Do not flip `run_regions` `inside_f` here.

## C ↔ JS fidelity

### Site vs `do.c:1974–1996`

C:

```
check_special_room(FALSE);
obj_delivery(TRUE);
/* assume this will always return TRUE when changing level */
(void) in_out_region(u.ux, u.uy);
if (!new)
    fix_shop_damage();
if (do_fall_dmg) { ... losehp ... }
(void) pickup(1);
```

JS (`do.js:1764–1776`): `check_special_room` → **skip `obj_delivery`** → `await in_out_region(u.ux, u.uy)` → **skip shop/fall** → `pickup(1)`.

Relative to the **ported** neighbors, the call sits where C puts it: after room-entrance messages, before autopick. Skipping `obj_delivery` does not reorder this helper vs pickup. `obj_delivery` migrates objects with the hero; it does not rewrite `game.regions`. Named omit, not a C-wrong of the bit wire.

Same-level / cancel early returns in `goto_level` happen **before** this tail (C and JS). The new call is not on a no-op `goto_level`. Match.

### Landing cell vs walk/hurtle dest

Walk and hurtle call `in_out_region(dest)` **before** occupy — hero still at the old cell. `goto_level` calls it **after** `u_on_upstairs` / `u_on_rndspot` / collide — hero is already at `(u.ux,u.uy)`. C `:1981` is that second shape: dest **is** the current cell. The helper then diffs restored leave-time bits against `inside_region(reg, u.ux, u.uy)`.

JS restores dest regions at `getlev` (`do.js:1488–1489`) or builds them in `mklev` **before** this tail. Arrival `fumaroles` / `movebubbles` (`do.c:1831–1834` / `do.js:1656–1661`) also run **before** this call in both trees, so a new steam cloud from arrival can already have `add_region` set the bit; `in_out_region` then stay-in. Match C order. This SHA did not move fumaroles.

### `(void)` vs abort

C comment: assume TRUE when changing level. A false `can_enter`/`can_leave` returns **before** the leave/enter loops (`region.c:493–494`), so bits stay leave-time, **and** `goto_level` continues. JS `await` without `if (!… ) return` is that `(void)`. Force-field callbacks remain named; gas never takes that arm.

`update_player_regions` (teleds D-1130) is **absolute** set/clear from `(u.ux,u.uy)` with no callbacks. This SHA correctly uses enter/leave `in_out_region`, not that sibling. Using the absolute helper here would skip `enter_msg`/`leave_msg` (D-1143) and the can_enter/leave probes C still runs even when it voids the return.

### Stash vs mklev vs this call

Leave path `clear_regions()` (`do.js:1456–1459`) matches C `clear_regions` on level change (`region.c:393–405`). Return `getlev` copies `info.regions` (leave-time `player_flags`). First visit `mklev` builds fresh regions; `add_region` / `make_gas_cloud` may already `set_hero_inside` from the then-current cell. Either way the array exists **before** `:1773`. Calling the helper on `game.regions || []` when empty is a C-faithful no-op (`n_regions==0`).

`print_level_annotation` then `check_special_room(FALSE)` sit immediately above the new call in both trees (`do.c:1974–1976`). Room-entrance plines therefore still precede membership repair. Pickup still follows. The only missing C statements in that tail are the three named Open rows (`obj_delivery`, shop repair, fall dmg) — objects-in-transit, shop catch-up, shaft `d(dist,6)` — not region bits.

Arrival fumaroles (`do.c:1831–1834`) already ran earlier in this same `goto_level`. A new steam cloud overlapping the hero can set the bit in `make_gas_cloud` before this SHA’s call; `in_out_region` then stay-in. C same. This SHA did not move that twin (D-1168 is the **moveloop** twin, not this).

### Hero already at dest

Walk/hurtle pass the **next** cell while `u.ux` is still the old one. This caller passes `(u.ux,u.uy)` after `u_on_*` / `u_collide_m`. If someone “fixed” it to `in_out_region(newx,newy)` with a leave-level dest, that would be a C-wrong. The hunk uses the live landing coordinates. Match `:1981`.

`losedogs` / `placebc` / `run_timers` (partial) already ran above this tail in both trees. Pets and ball are on the new level before membership repair — C same (`:1818–1828` then later `:1981`). Not a miss of this peel.

### Not a stub of the claimed landing-bit update

`in_out_region` is the real three-loop function. Restored `REG_HERO_INSIDE` is the leave-time stash (D-0675). After this SHA, `is_hero_inside_gas_cloud` (bit) matches the landing cell without waiting for a walk. `run_regions` hero `inside_f` still ignores the bit and uses geometry — so EOT gas **damage** on arrival-without-walk still tracks `u.ux` geometry, which is the landing cell anyway. The Open `hero_inside` bit row is about C `:440` using the bit (so a stale bit would wrong-damage). After this SHA the bit is no longer stale at arrival; flipping `run_regions` is still the next cluster, not a miss of this caller.

| Case | C | JS after |
|------|---|---------|
| arrive outside all regs | clear leftover leave-in bits | **same** |
| arrive inside gas | set bit; never reject | **same** |
| return to same cell as leave | stay-in / stay-out | **same** |
| leave-in, land-out | clear | **same** |
| can_enter false | bits unchanged; level change continues | **same** |
| `obj_delivery` between room msg and helper | runs | **named skip** |
| `fix_shop_damage` / fall dmg after helper | runs | **named skip** |
| empty dest `regions` | no-op | **same** |

## Hallucinations / overclaim

D-log / CURRENT / subject say arriving updates `REG_HERO_INSIDE` from the landing cell instead of keeping leave-time bits until a later walk. **That is the hunk:** one imported await, return discarded. Stamping **Addressed:** D-1166 is fair for the Open **goto_level** line. Hash `0cb3acbe` is on the archive row (filled by D-1167). Do **not** stamp it as “Match C `obj_delivery`” or “`run_regions` now uses `hero_inside`” or “Match C `mhurtle_step`.” This is **not** “Match C dispatch, callee is a stub”: the callee is D-1143; `(void)` is live, not a silent no-op helper.

## Density

One C call at the documented site. ~8 JS lines of behavior. Thin vs §2b; queue said “Not walk” and D-1165 said “Not `goto_level`.” Sibling callers (walk / hurtle / arrival) are three iters because the queue forbids combining. Not QUALITY-RISK for thinness.

This is the last **hero** `in_out_region` caller named from review **118**. Remaining region work in Open is `run_regions` `hero_inside` bit (inside_f, not a fourth caller) and `mhurtle_step` `m_in_out_region` (monster). Correct split.

## Verification

Journal: private canary **36**/36 (src void+order; empty land; enter/leave/stay-in/stay-out; `attach_2_u` skip; overlap; A→B; gas `NO_CALLBACK`; can_enter/leave reject still completes; can_enter allow; enter_f/leave_f; same-level early return; rect edge; mixed attach); green+strict seed8000/0900; cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002/0700/0015. Path **public-unhit** on arriving into a live restored region.

C read of `do.c:1974–1996`, `:1831–1834` (arrival fumaroles twin), `region.c:480–527`, `hack.c:2866–2868`, `dothrow.c:787–788`; JS SHA `goto_level` tail + `getlev` region restore. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1485**) **44**/44 — the new await did not desync stairs/pickup.

## Actionable C-wrongs

None that Must-fix this next iter. The Open arrival call matches `do.c:1980–1981`. `(void)` matches. Callee is real.

Named omits / do-nots (map / Open, not Must-fix):

1. `obj_delivery(TRUE)` (`do.c:1978`). Open.
2. `!new` `fix_shop_damage` (`:1985–1986`). Open.
3. `do_fall_dmg` (`:1988–1994`). Open.
4. `run_regions` `hero_inside` bit (`region.c:439–441`). Open next after this window.
5. `mhurtle_step` `m_in_out_region`. Open.
6. Do not abort `goto_level` on false. Do not skip the call after a real level change. Do not replace this with `update_player_regions` (no enter/leave msgs/callbacks).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `goto_level` now `(void)`-awaits the real `in_out_region` at the landing cell after room messages, so restored leave-time `REG_HERO_INSIDE` is repaired before `pickup(1)`.
- Must-fix stays empty for this SHA; next port in this window popped Open youmonst `m_postmove_effect`. Not `obj_delivery`.
