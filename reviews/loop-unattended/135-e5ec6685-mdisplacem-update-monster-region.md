# Review 135 — e5ec6685 — mhitm.c `mdisplacem` `update_monster_region` (D-1174)

## Metadata
- Full / short hash: `e5ec6685a33190fe0d5f982d517f695f3647dfca` / `e5ec6685`
- Parent: `e07eeae7` (D-1173). This file audits **this SHA only**. Archive row **Addressed:** D-1174 `e5ec6685` was filled by D-1175.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 19:59:38 +0200
- D-id: **D-1174**
- Stats: 12 files, +234 / −46 — `js/mhitm.js` +126 / −2 (`mdisplacem` + `mhis_disp`); `js/monmove.js` +11 / −2 (ALLOW_MDISP arm); `js/region.js` comments.
- Claims to close: Open queue `mhitm.c` `mdisplacem` `update_monster_region` (named). Not rloc_to. Review **122** named `mhitm.c:256–257` as a distinct caller (after both places + defender tail, not rloc’s before-tail). `reviews/loop-2026-08-15/` has no open mdisplacem Must-fix.
- JS / map: `mhitm.js` `mdisplacem`; callee `region.js` `update_monster_region` (D-1161); caller `monmove.js` `m_move`. `c-js-map/turns.md` `mhitm.c`. `should_displace` / dogmove caller / dbridge still named.
- Prior reviews this SHA claims to close: **122** named omit; D-1173 next-port.

## Intent vs deliverable

Git subject promises: “Match C mhitm.c mdisplacem so swapping monsters updates poisoncloud membership from the new cells after both are placed, instead of treating ALLOW_MDISP as a failed no-op.”

Old JS `m_move` on `ALLOW_MDISP` returned `MMOVE_DONE` with a “body deferred” comment — no swap, no region lists. C `mdisplacem` (`mhitm.c:178–267`) swaps occupancy, replants the defender’s worm tail, then `update_monster_region` **each** so dest poisoncloud membership is absolute from the new `(mx,my)`. Distinct from `rloc_to` (D-1161), which updates the relocating mon **before** its tail.

The diff **does** port that function (sanity, `rn2(7)`, grid-bug diagonal, unhide/`seemimic`/wake/`meating=0`, vis, touch-petrify, swap, defender tail, **then** update both, pline/newsym/flush) and wires `m_move` to the real return bits. It **keeps** `better_with_displacing = false` (`should_displace` named — enabling it would burn `undesirable_disp` `rn2(40)` on public paths). It does **not** wire dogmove’s `mdisplacem` (`dogmove.c:1171–1179`) or dbridge. Named.

Honest limit: with `should_displace` false, JS already `continue`s MDISP-only occupied squares (`monmove.js:1581–1584` / C `:1956–1958`). `ALLOW_M` is tried **before** `ALLOW_MDISP` (`:2021–2037`). So the new `m_move` call is **C-ordered but public-dead** until `should_displace` prefers those squares. That is the named omit, not a miss of the function body.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mdisplacem` | C function, **new** | `mhitm.c:178–267` |
| `update_monster_region` ×2 | C callee, **imported** | D-1161; after both places + defender tail |
| `m_move` ALLOW_MDISP | C caller, **wired** | `:2025–2037`; dead while `should_displace` false |
| `rn2(7)` miss | C RNG, **new** | before unhide; matches `do_attack` pet chance |
| `seemimic` | C callee, **imported** | `mon.js`; AP reset |
| `which_armor(W_ARMG)` | C callee, **imported** | `worn.js` |
| `touch_petrifies` / `resists_ston` / `poly_when_stoned` | C callees, **imported** | `monsters.js`; extra `mvitals` arg is the JS signature |
| `mon_to_stone` / `monstone` | C callees, **pre-existing** | `mhitm.js`; lifesave named on `monstone` |
| `remove_worm` / `place_worm_tail_randomly` | C callees, **imported** | `worm.js`; D-1123 |
| `mhis_disp` | C `mhis()`, **clone** | `you.h:324` → `pronoun_gender` `PRONOUN_HALLU`; `type_is_pname` named |
| `finish_meating` | C callee, **inline clone** | `meating=0`; mimic AP named on `dogmove.js` (cycle) |
| `flush_screen` | C callee, **imported** | `display.js` |
| `should_displace` / `undesirable_disp` | C caller gate, **named omit** | `better_with_displacing` stays false |
| dogmove `mdisplacem` | C caller, **named omit** | `:1171–1179` |
| dbridge `update_monster_region` | C caller, **named omit** | `dbridge.c:687` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Swap uses live `mx/my`, not a traced cell. Rule #2 clean.

**New RNG on this path:** `rn2(7)` on entry; Hallu vis `mhis` `rn2(4)`; petrify `monstone` statue `rn2`. Path **public-unhit** while `should_displace` is false — those draws do not run on the fortress.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not restore the ALLOW_MDISP no-op. Do not update regions **before** the defender tail (that is rloc’s order). Do not flip `should_displace` in this peel (public `rn2(40)`). Do not pull dogmove / dbridge into this SHA.

## C ↔ JS fidelity

### Order vs `mhitm.c:188–266`

C: null/self miss (no RNG) → snapshot `tx/ty` dest, `fx/fy` origin → `m_at` occupancy miss → `!rn2(7)` miss → grid-bug diagonal miss → unhide / `seemimic` / wake / `STRAT_WAITMASK` / `finish_meating` → `gv.vis = canspotmon && canspotmon` → petrify (gloves / golem poly / stone / sad) **return before swap** → `remove_monster` origin → worm `remove_worm` else `remove_monster` dest → `place_monster` magr dest, mdef origin → defender tail → **`update_monster_region` both** → vis pline → `newsym` both → `flush_screen(0)` → `M_ATTK_HIT`.

JS (`mhitm.js:565–648`): same order. Occupancy is `mx/my=0` then assign (JS has no `level.monsters[][]`; `m_at` scans fmon `mx/my` then worm segs). `rn2(7)` is **before** unhide — a miss leaves the defender hidden/asleep. Grid bug is `data.mndx === PM_GRID_BUG` (C `&mons[PM_GRID_BUG]`). Petrify returns `M_ATTK_HIT` on golem poly / lifesave-shaped `mhp>0`, else sad pline + `M_ATTK_AGR_DIED`. Region calls are **after** `place_worm_tail_randomly`, not before. Match the Open item.

`m_move` (`monmove.c:2021–2037`): `ALLOW_M` or mux/muy image → `m_move_aggress` **first**; then `ALLOW_MDISP` → `mdisplacem(..., FALSE)` → `MMOVE_DIED` / `MMOVE_MOVED` / `MMOVE_DONE`. JS (`:1653–1667`) same bits. `mtmp2 = m_at(nix,niy)` — C comments ALLOW_MDISP implies non-NULL; JS `mdisplacem` null-guards to MISS → DONE. Match.

### Callee vs `region.c:598–611`

`update_monster_region` is absolute membership from `(mon.mx, mon.my)`: add if inside and not listed, remove if listed and not inside. **No** `can_enter`/`leave` / enter/leave callbacks (those are `m_in_out_region`). **No** `attach_2_m` skip (C does not skip here). D-1161 already shipped that body. This SHA only **calls** it twice at C’s slot. **Not** “Match C dispatch, callee is a stub.”

Displace into / out of / staying in a cloud: lists follow the **new** cells. Rloc still updates one mon before its own tail. Two different C orders — this SHA does not change rloc.

### Clones that are not C-wrongs of the claim

`mhis_disp`: C `mhis` → `genders[pronoun_gender(mtmp, PRONOUN_HALLU)].his` (`mondata.c:1191–1206`). Hallu → `rn2(4)` (his/her/its/their). Else unseen → its; neuter → its; humanoid/`G_UNIQ`/`type_is_pname` → female?her:his; else its. JS Hallu `rn2(4)` same four words; neuter/humanoid/`G_UNIQ`; **`type_is_pname` named**. On this function `mhis` runs only under `canspotmon(magr)` (vis pline / petrify vis), so C’s unseen→its arm is dead here. Sticky `u.Hallucination` vs `youprop.h` `HHallucination && !Halluc_resistance` is pre-existing, public-unhit on this path.

`finish_meating`: C (`dogmove.c:1448–1456`) `meating=0` then non-mimic AP reset + `newsym`. JS inlines `meating=0` (dogmove import would cycle `mhitm`↔`dogmove`↔`mhitm`). Mimic AP already named on the real `dogmove.js` export. Same omit, not a new C-wrong on region lists.

`You(brief_feeling, "peculiarly sad")`: C format `"have a %s feeling for a moment, then it passes."` → JS full sentence. Match.

Petrify `DEADMONSTER` ≡ `mhp>0` without lifesave (`monstone` names `lifesaved_monster`). Gloves `W_ARMG` skip the whole stone arm. Match.

### `should_displace` is not a miss of this SHA

C `m_move` skips MDISP-only occupied squares unless `should_displace` (`:1956–1958`). JS already skips (`better_with_displacing = false`). Enabling that helper is a **different** RNG envelope (`undesirable_disp` `rn2(40)`). D-log names it. Map / later Open, not Must-fix. Do not claim public pet/hostile displace now matches.

| Case | C | JS after |
|------|---|---------|
| ALLOW_MDISP no-op | swap + region | **function exists** |
| `should_displace` false | skip MDISP-only; never call | **same** (named) |
| 1-in-7 miss | no swap, no unhide | **same** |
| grid-bug diagonal | miss after `rn2(7)` | **same** |
| swap, both in/out/stay cloud | update after tail | **same** |
| defender worm | tail then update | **same** |
| petrify, no gloves | no swap, no region | **same** |
| dogmove / dbridge | their callers | **named skip** |

`ALLOW_M` before `ALLOW_MDISP` means a square that is both attackable and displaceable is an **attack**, not a swap (C `:2021–2023`). JS same. Pets that would displace go through dogmove’s own `mdisplacem` (`:1171–1179`), which JS still does not call — that is why the D-log can say the function is ported while public pet paths stay unhit.

JS occupancy `mx=0` then assign is the established `rloc_to` clone of `remove_monster`/`place_monster`. `m_at` prefers `_level_monsters` worm segs then fmon `mx/my`. Ordinary heads live on fmon. Worm defender: `remove_worm` clears segs, then head `mx/my` is set to origin, then tail is replanted — C order. Aggressor worm is not special-cased in C either.

## Hallucinations / overclaim

D-log / CURRENT / subject say swapping monsters updates poisoncloud membership from the new cells after both are placed, instead of treating ALLOW_MDISP as a failed no-op. **That is the hunk:** the C function + the `m_move` bits. Stamping **Addressed:** D-1174 is fair for the Open **mdisplacem** line. Hash `e5ec6685` is on the archive row (filled by D-1175). Do **not** stamp it as “Match C `should_displace`” or “Match C dogmove displace” or “rloc now updates after tail.” This is **not** “Match C dispatch, callee is a stub”: `update_monster_region` is D-1161; `mdisplacem` is the real `:178–267` body, not a return-MISS shell.

Say explicitly: public `m_move` still does not **reach** that body while `should_displace` is false. The fortress does not prove the swap.

## Density

One C function (`mdisplacem`) plus the one `m_move` caller the queue needed for the region calls to be reachable in C. ~110 JS lines of the function + ~8 of the arm. Right-size §2b (50–300). Did not pull `should_displace` / dogmove / dbridge. Not QUALITY-RISK for “finish combat.”

## Verification

Journal: private canary **46**/46 (C/JS tail-before-region; sanity no rng; 1-in-7 miss; swap enter/leave/stay; attach_2_m still add; unhide/wake/meating/seemimic; grid-bug diagonal vs cardinal; petrify died/gloves/golem-poly/`resists_ston`; thenable; m_move bits; no fs/FORCE); green+strict seed8000/0900; cohort **43**/43 (CURRENT shared + 0014/0383/4500/2600 + green) + strict 0101/0012/0360/4500/2200/0014/0004/0103/0104/0367/0373/0002/0700/0015/0116/0106. Path **public-unhit** while `should_displace` is false.

C read of `mhitm.c:178–267`, `monmove.c:1956–1958` / `:2021–2037`, `region.c:598–611`, `dogmove.c:1171–1179` / `:1448–1456`, `mondata.c:1191–1206`; JS SHA `mdisplacem` + `m_move` arm. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1495**) **44**/44 — dead public arm did not inject `rn2(7)`.

## Actionable C-wrongs

None that Must-fix this next iter. Region calls match `mhitm.c:256–257`. Callee is real. `m_move` bit tests match `:2032–2036`.

Named omits / do-nots (map / Open, not Must-fix):

1. `should_displace` / `undesirable_disp` (`rn2(40)`). Do not enable in a fortress peel.
2. dogmove `mdisplacem` (`dogmove.c:1171–1179`).
3. dbridge entity `update_monster_region` (`dbridge.c:687`).
4. `type_is_pname` in displace `mhis`; `finish_meating` mimic AP (already named on dogmove).
5. Do not restore the ALLOW_MDISP no-op. Do not update before the defender tail. Do not pull `m_everyturn_effect` into this SHA — **Addressed:** D-1175 `7188da5b`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `mdisplacem` is the real C swap (including `rn2(7)` and petrify) and calls `update_monster_region` on both monsters after the defender tail, matching `mhitm.c:246–257`, while `should_displace` keeps the public `m_move` arm unhit.
- Must-fix stays empty for this SHA; next port in this window popped Open youmonst everyturn. **Addressed:** D-1174 `e5ec6685`. Not rloc, not `should_displace`.
