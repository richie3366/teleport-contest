# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
