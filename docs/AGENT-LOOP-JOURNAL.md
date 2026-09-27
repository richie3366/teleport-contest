# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-27 — Audit 1865–1873 (D-2906…D-2914)

Nine JS SHAs after review 1864 (`d475b25e1`). All **ACCEPT**: `ceiling`, `eating_conducts`, `drop_uswapwep`, `some_armor`, `align_gname`, `engulf_target`, `readobjnam_init`, `flip_vault_guard`, `region_dialogue`/`end_burn`. No Must-fix. Public `sessions` 44/44, Scr 11,405/11,405, RNG 792,838/792,838, speed `266+1.58/turn` (R² 0.745). Held-out still 12/44 (6,273/11,265, RNG 29.7 %, screens 55.7 %). Private corpus 12/12. Next: `mkobj.c` `mk_tt_object`.

## 2026-09-27 — D-2914 `region_dialogue` warns in a poison cloud; `end_burn` snuffs a light

**C locus:** `nethack-c/upstream/src/timeout.c:553–569` `region_dialogue`. Save `(HMagical_breathing & TIMEOUT)`, clear those bits, read `Breathless` and `region_danger()`, restore, and on an odd remainder with `0 < i <= SIZE(region_texts)` print `region_texts[SIZE - i]`. Caller `nh_timeout` `:637–638`, before the generic `--`. `end_burn` is `timeout.c:1804–1822`: `impossible` when `!lamplit`; `MAGIC_LAMP` or `artifact_light` forces `timer_attached` false; that arm `del_light_source` + `lamplit = 0` + `OBJ_INVENT` `update_inventory`; else `!stop_timer` `impossible`.
**JS:** `js/timeout.js` `region_dialogue` `:812`. Texts `:799–802`. Caller `:1037`. `TIMEOUT_FLAT` `:118`. `end_burn` `:1772`. Unlit impossible `:1774`. Explicit cleanup `:1780–1784`. Untimed impossible `:1785`.
**Change:** One `region_dialogue` in that C order, called from `nh_timeout` on the slot (else the flat). Both stores are masked and restored around `hero_magical_breath` and `region_danger`. `MAGICAL_BREATHING` is on `TIMEOUT_FLAT` so the generic `--` keeps the flat equal to the slot.
**Verify:** `node scripts/verify.mjs --fn region_dialogue` → PASS syntax (4 changed js files: js/do_wear.js js/end.js js/timeout.js js/worn.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `region_dialogue` or `end_burn` is omitted. A missing `game.u` is created; C would fault.
**Next:** `mkobj.c` `mk_tt_object` (next Open — coverage row). `piousness` parked Stale. Five measured coverage rows refilled (`cursed`, `deltrap`, `cant_wield_corpse`, `corpse_intrinsic`, `maybe_unhide_at`) so the live queue stays above 8 after archive. The queue-empty overlay did not match the live queue (ten coverage rows were open; `piousness` was the head and its body was already complete).
## 2026-09-27 — D-2913 `flip_vault_guard` transposes a vault guard's corridor with the level

**C locus:** `nethack-c/upstream/src/sp_lev.c:926–958` `flip_vault_guard`. `EGD(grd)`. If `inFlipArea(gdx, gdy)`, bit 1 writes `FlipY(gdy)` and bit 2 writes `FlipX(gdx)`. The same pair of tests for `ogx`/`ogy`. Then `fakecorr[fcbeg, fcend)`: save `fx`/`fy`, and when that cell is inside the rectangle, write `fy` then `fx` from those saved values. `FlipX`/`FlipY`/`inFlipArea` are the macros at `:516–519`.
**JS:** `js/mklev.js` `flip_vault_guard` `:18880`. `EGD` `:18886`. Guard door `:18889–18894`. Original spot `:18895–18900`. Fake corridor `:18903–18914`. On-map caller `:19021–19024`. Migrating caller `:19047–19052`.
**Change:** One file-local `flip_vault_guard` in that C order. `flip_level` calls it for an on-level `isgd` monster when `extras`, then skips `mx`/`my` when `mx == 0`. The `extras` walk of `migrating_mons` calls it when `isgd` and `on_level(u.uz, egd.gdlevel)`.
**Verify:** `node scripts/verify.mjs --fn flip_vault_guard` → PASS syntax (1 changed js file: js/mklev.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** No arm of `flip_vault_guard` is omitted. A missing `egd` returns; C would fault on `EGD(grd)`.
**Next:** `insight.c` `piousness` (next Open — coverage row). `flip_level_rnd` parked Stale. Ten Open rows remain after archive, above the floor of 8, so nothing was refilled. The queue-empty overlay did not match the live queue (twelve coverage rows were open; `flip_vault_guard` was the head and had no JS symbol).
## 2026-09-27 — D-2912 `readobjnam_init` zeros the wish record before parsing

**C locus:** `nethack-c/upstream/src/objnam.c:3933–3961` `readobjnam_init`. `otmp` is null. The zero chain runs through `fake`. Then `tvariety = RANDOM_TIN`, `mgend = -1`, `mntmp = NON_PM`, `contents = TIN_UNDEFINED`, `oclass = 0`, null `actualn`/`dn`/`un`, `wetness` and `gsize` 0, `zombify` FALSE, `bp`/`origbp` alias the caller, `p` and `name` null, `ftype = context.current_fruit`, and both buffers are memset to 0. `tmp` and `tinv` are not touched.
**JS:** `js/readobjnam.js` `readobjnam_init` `:1396`. `otmp` `:1398`. Zero chain `:1400–1429`. Tin and monster defaults `:1431–1435`. Names and `zombify` `:1437–1442`. `bp`/`origbp`/`p`/`name`/`ftype` `:1444–1448`. Buffers `:1450–1451`. Caller `:1463`. `fruitbuf` copy `:1482`.
**Change:** One file-local `readobjnam_init` in that C order. `readobjnam` calls it before the null-bp `any` path. After `mungspaces`, `bp`/`origbp` and the JS buffer cursor name the munged text (C edits that buffer in place).
**Verify:** `node scripts/verify.mjs --fn readobjnam_init` → PASS syntax (1 changed js file: js/readobjnam.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `readobjnam_init` is omitted. The buffers are empty strings; C's `BUFSZ` slab is not a second buffer.
**Next:** `sp_lev.c` `flip_vault_guard` (next Open — coverage row). `otense` parked Stale. Five tool rows refilled so the queue is back at 12 after archive. The queue-empty overlay did not match the live queue (nine coverage rows were open; `readobjnam_init` was the head and had no JS symbol).
## 2026-09-26 — D-2911 `engulf_target` is one function for hero and monster swallows

**C locus:** `nethack-c/upstream/src/mhitm.c:807–845` `engulf_target`. Too-big or a smaller non-whirly engulfer returns false. Either `mtrapped` returns false. Defender cell, then attacker cell: `IS_OBSTRUCTED`, `closed_door`, `IS_TREE`, or `IRONBARS` unless the other is whirly. The hero uses `u.ux`/`u.uy` and `Passes_walls`; a monster uses `mx`/`my` and `passes_walls`.
**JS:** `js/mhitm.js` `engulf_target` `:5748`. Size `:5754–5758`. `mtrapped` `:5760`. Defender cell `:5762–5767`. Attacker cell `:5768–5773`. `engulf_cell_blocks` `:5778`.
**Change:** One exported `engulf_target` in that C order. `youmonst` is `game.youmonst`. `Passes_walls` is `Passes_walls_prop`.
**Verify:** `node scripts/verify.mjs --fn engulf_target` → PASS syntax (3 changed js files: js/mhitm.js js/mhitu.js js/uhitm.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `engulf_target` is omitted. A missing `data` returns false; C `NONNULLARG12` would fault.
**Next:** `objnam.c` `readobjnam_init` (next Open — coverage row). `mkobj_erosions` and `buried_ball_to_freedom` parked Stale. Nine Open rows remain after archive, above the floor of 8, so nothing was refilled. The queue-empty overlay did not match the live queue (twelve coverage rows were open; `mkobj_erosions` was the head and already the C body).
## 2026-09-26 — D-2910 `align_gname` uses the role's gods and reports an unknown alignment

**C locus:** `nethack-c/upstream/src/pray.c:2530–2555` `align_gname`. `A_NONE` is the file-scope `Moloch` (`pray.c:58`). `A_LAWFUL` / `A_NEUTRAL` / `A_CHAOTIC` read `gu.urole.lgod` / `ngod` / `cgod`. The default calls `impossible("unknown alignment.")` and uses `"someone"`. A leading `_` is skipped.
**JS:** `js/roles.js` `align_gname` `:848`. `A_NONE` `:852`. Lawful `:855`. Neutral `:858`. Chaotic `:861`. Default `:864–867`. Underscore `:871–873`.
**Change:** One exported `align_gname` in that C order. Callers still pass `game.urole` as the first argument (C reads `gu.urole`). The default arm is fire-and-forget `impossible` so the function stays sync.
**Verify:** `node scripts/verify.mjs --fn align_gname --reach-all` → PASS syntax (1 changed js file: js/roles.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `align_gname` is omitted. A null god name skips the `_` test and is returned; C would fault on `*gnam`.
**Next:** `mkobj.c` `mkobj_erosions` (next Open — coverage row). `obj_nexto_xy` parked Stale. Six tool rows refilled so the queue is back at 12. The queue-empty overlay did not match the live queue (eight coverage rows were open; `obj_nexto_xy` was the head and already the C body).
## 2026-09-26 — D-2909 `some_armor` reads the victim's worn armor, not only the hero's

**C locus:** `nethack-c/upstream/src/do_wear.c:2629–2653` `some_armor`. `victim == &gy.youmonst` reads `uarmc`, then `uarm`, then `uarmu`. Otherwise `which_armor` for `W_ARMC`, `W_ARM`, `W_ARMU`. Helm, gloves, boots, and shield replace that piece when it is missing or `!rn2(4)`.
**JS:** `js/do_wear.js` `some_armor` `:3303`. Hero test `:3306`. Cloak/suit/shirt `:3308–3314`. Helm `:3315–3316`. Gloves `:3317–3318`. Boots `:3319–3320`. Shield `:3321–3322`.
**Change:** One exported `some_armor` in that C order. Youmonst (and the `_youmonst` stand-in `which_armor` already accepts) reads the hero slots. Every other victim calls `which_armor`.
**Verify:** `node scripts/verify.mjs --fn some_armor` → PASS syntax (2 changed js files: js/do_wear.js js/read.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `some_armor` is omitted. `mhitm_ad_ench` when the hero is the aggressor, and when both fighters are monsters, does not call `some_armor` (C comments: no `msomearmor`).
**Next:** `mkobj.c` `obj_nexto_xy` (next Open — coverage row). `mk_mplayer_armor` and `buried_ball_to_punishment` parked Stale. Eight Open rows remain after archive, at the floor of 8, so nothing was refilled. The queue-empty overlay did not match the live queue (eleven coverage rows were open; `mk_mplayer_armor` was the head and already shipped).
## 2026-09-26 — D-2908 `drop_uswapwep` names the left hand and drops the secondary weapon

**C locus:** `nethack-c/upstream/src/wield.c:809–831` `drop_uswapwep`. `Sprintf(left_hand, "left %s", body_part(HAND))`. If `!obj->cursed`, `pline` `Yobjnam2(obj, "slip")`. Else if `!u.twoweap`, `pline` `Yobjnam2(obj, "evade")` plus `otense(obj, "drop")`. Else `Your` with `yobjnam(obj, NULL)`. Then `dropx(obj)`.
**JS:** `js/wield.js` `drop_uswapwep` `:1143`, `left_hand` `:1147`, Glib `pline` `:1150`, cursed-attempt `pline` `:1153–1154`, `Your` `:1157`, `dropx` `:1160–1161`.
**Change:** One async `drop_uswapwep` in that C order. `body_part(HAND)` is `body_part_latebound`. The two `pline` arms use the `objnam.js` `Yobjnam2` export.
**Verify:** `node scripts/verify.mjs --fn drop_uswapwep --reach-all` → PASS syntax (1 changed js file: js/wield.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `drop_uswapwep` is omitted. `makeplural(body_part(HAND))` is the comment above the `Sprintf`, not a call.
**Next:** `mplayer.c` `mk_mplayer_armor` (next Open — coverage row). Eleven Open rows remain after archive, above the floor of 8, so nothing was refilled. The queue-empty overlay did not match the live queue (twelve coverage rows were open; `drop_uswapwep` was the head).
## 2026-09-26 — D-2907 `eating_conducts` logs the first meal, the first animal product, and the first meat

**C locus:** `nethack-c/upstream/src/eat.c:576–599` `eating_conducts`. `!u.uconduct.food++` then `livelog_printf` "ate for the first time - %s" (`pd->pmnames[NEUTRAL]`). If `!vegan`, `!u.uconduct.unvegan++ && !ll_conduct` then the animal-products livelog. If `!vegetarian`, `!u.uconduct.unvegetarian && !ll_conduct` then the meat livelog, then `violated_vegetarian` (`eat.c:1375–1384`: `unvegetarian++`, and `Role_if(PM_MONK)` does `You_feel("guilty.")` then `adjalign(-1)`).
**JS:** `js/eat.js` `eating_conducts` `:3295`. `violated_vegetarian` `:1030`.
**Change:** One async `eating_conducts` in that C order, including both post-increment tests and all three `livelog_printf` calls. `violated_vegetarian` is the one in-file function: `You_feel("guilty.")` then `adjalign(-1)`. Callers await it so the message finishes before the next pline.
**Verify:** `node scripts/verify.mjs --fn eating_conducts --reach-all` → PASS syntax (2 changed js files: js/eat.js js/uhitm.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.1s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `eating_conducts` is omitted. `doeat` (`eat.c:2998–3024`), `eatcorpse` (`:1870–1882`), and `doeat_nonfood` (`:2768–2785`) still own their own first-time livelog lines.
**Next:** `wield.c` `drop_uswapwep` (next Open — coverage row). `glyph_to_cmap` parked Stale. Four tool rows refilled so the queue is back at 12. The queue-empty overlay did not match the live queue (ten coverage rows were open; `glyph_to_cmap` was the head and already shipped).
## 2026-09-26 — D-2906 `ceiling` is one export; the clones are gone

**C locus:** `nethack-c/upstream/src/dungeon.c:1714–1747` `ceiling`. `*in_rooms` for `VAULT`, then `TEMPLE`, then `SHOPBASE`. Then `Is_waterlevel` → "water above", `IS_AIR` → "sky", `Is_firelevel` → "flames above", `In_quest` → "expanse above", `Underwater` (`u.uinwater`) → "water's surface", else room (not earth) or wall or door or `SDOOR` → "ceiling", else "rock cavern".
**JS:** `js/trap.js` `ceiling` `:3647`.
**Change:** Deleted the three clones. Those callers import `ceiling`. Downward camera and mirror still call `surface`, as C does.
**Verify:** `node scripts/verify.mjs --fn ceiling --reach-all` → PASS syntax (5 changed js files: js/apply.js js/dig.js js/dothrow.js js/engrave.js js/zap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `ceiling` is omitted. `check_special_room` (`dungeon.c:1718–1720`) is a comment, not a call.
**Next:** `glyphs.c` `glyph_to_cmap` (next Open — coverage row). `deepest_lev_reached` parked Stale. Ten Open rows remain after archive, above the floor of 8, so nothing was refilled. The queue-empty overlay did not match the live queue (twelve coverage rows were open; `ceiling` was the head).
## 2026-09-27 — audit 1857–1864 (D-2898–D-2905)

Reviewed the eight `js/` commits since `37fb9f7ea`. Eight ACCEPT. No Must-fix. Next cluster is `dungeon.c` `ceiling`. Public `sessions` on `d475b25e1`: 44/44, screens 11,405/11,405, RNG 792,838/792,838, speed `255+1.54/turn` (R² 0.761). Held-out still 12/44 (6,273/11,265 pts, RNG 29.7 %, screens 55.7 %; board 2026-09-26T19:28Z, last scored 2026-09-26T19:01Z). `hidden-proxy score` 12/12 on the private sessions present (RNG 75,151/75,151, screens 653/653); `.cache/hidden/sessions` absent, so 614/940 was not re-measured. No `js/` edits.
