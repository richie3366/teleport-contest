# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-27 — D-2959 `In_W_tower` reports a missing tower boundary

**C locus:** `nethack-c/upstream/src/dungeon.c:1923–1938` `In_W_tower`. `On_W_tower_level` (`:1914–1919`) is first. `!svd.dndest.nlx` calls `impossible("No boundary for Wizard's Tower?")` and returns false. Otherwise `dungeon.h:144` `within_bounded_area` on `dndest.nlx/nly/nhx/nhy`. The updest/dndest assert is a comment.
**JS:** `js/dungeon.js` `In_W_tower` `:1220`. Level gate `:1221`. Disorder `:1223–1225`. Bounds `:1227–1228`. `within_bounded_area` `js/rect.js:69`. `On_W_tower_level` `:1205`. Import `:201` in `js/potion.js`. `Can_rise_up` call `:1777`.
**Change:** One exported `In_W_tower` keeps that C order. A zero `nlx` starts `impossible` and returns false. The rectangle test is `rect.js` `within_bounded_area`.
**Verify:** `node scripts/verify.mjs --fn In_W_tower` → PASS syntax (2 changed js file(s): js/dungeon.js js/potion.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed; pass --full to force) · VERIFY: PASS.
**Named:** No arm of the boolean test is omitted. `impossible` is not awaited, so its `--More--` does not block the caller.
**Next:** `do_wear.c` `Shirt_off` (next Open — coverage row). Ten coverage rows remain after this archive and the `placebc` park, above the floor of 8, so nothing was refilled.

## 2026-09-27 — D-2958 `yname` prefixes through `shk_your` and caps at `BUFSZ-1`

**C locus:** `nethack-c/upstream/src/objnam.c:2359–2374` `yname`. `cxname` runs first. The prefix arm is `!carried || !obj_is_pname || oartifact >= ART_ORB_OF_DETECTION`: `shk_your(nextobuf(), obj)`, then `strncat` of the `cxname` limited to `BUFSZ - 1 - strlen(prefix)`. A carried proper-name artifact below that id returns `cxname` alone.
**JS:** `js/objnam.js` `yname` `:2792`. Gate `:2797`. Cap `:2800–2802`. `shk_your` `:2764`. `Yname2` `:2811`.
**Change:** One exported `yname` keeps that C order and caps the append at `BUFSZ-1`. The three local functions are gone. `dig.c` fumble and self-hit, `ball.c` `litter`, and `zap.c` `maybe_destroy_item` call the export (`Yname2` when one of one).
**Verify:** `node scripts/verify.mjs --fn yname` → PASS syntax (7 changed js file(s): js/ball.js js/dig.js js/music.js js/objnam.js js/pickup.js js/uhitm.js js/zap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.4s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed; pass --full to force) · VERIFY: PASS.
**Named:** No arm of the prefix gate is omitted. `nextobuf` stays the string path (`releaseobuf` in this file): `shk_your` returns the prefix instead of writing a ring buffer.
**Next:** `ball.c` `placebc` (next Open — coverage row). Seven coverage rows remain after this archive, below the floor of 8. `--rows 20` was the never-re-pop Stale head, not pasted. Five later gameplay rows from `--rows 500 --min-c-lines 15` are appended.

## 2026-09-27 — D-2957 `tmiss` sends a seen miss through `miss`

**C locus:** `nethack-c/upstream/src/dothrow.c:1951–1967` `tmiss`. `mshot_xname` names the missile. `!canseemon(mon)` or `M_AP_TYPE` other than `M_AP_MONSTER` prints `The(missile)` and `otense(obj, "miss")`. Otherwise `miss` (`zap.c:3571–3576`). Then `maybe_wakeup && !rn2(3)` calls `wakeup(mon, TRUE)`. The `rn2` is not drawn when `maybe_wakeup` is false.
**JS:** `js/dothrow.js` import `:125`. `tmiss` `:353`. Name `:355`. Unseen arm `:357–359`. Seen arm `:361` (`miss` `js/mthrowu.js:806`). Wake `:364`.
**Change:** One file-local `tmiss` keeps that C order and calls `mthrowu.js` `miss`. `imports.mjs --can js/dothrow.js js/mthrowu.js miss` was SAFE (hoisted). `miss_missile` is gone.
**Verify:** `node scripts/verify.mjs --fn tmiss` → PASS syntax (1 changed js file: js/dothrow.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed; pass --full to force) · VERIFY: PASS.
**Named:** No arm of `tmiss` is omitted. `miss` still reads a missing `bhitpos` as the monster's coordinates.
**Next:** `objnam.c` `yname` (next Open — coverage row). Eight coverage rows remain after this archive, at the floor of 8, so nothing was refilled.

## 2026-09-27 — D-2956 `mon_animal_list` fills the animal index and frees it

**C locus:** `nethack-c/upstream/src/mon.c:4829–4852` `mon_animal_list`. `construct` walks `LOW_PM .. SPECIAL_PM-1`, keeps `is_animal(&mons[i])` (`mondata.h:66`), `alloc`s `n` shorts, `memcpy`s them to `ga.animal_list`, and stores `ga.animal_list_count`. The `impossible` re-entry check and the `n == 0` `NON_PM` fallback are comments. The release arm `free`s a non-null list, stores a null pointer, and zeroes the count. Caller `pick_animal` (`mon.c:4854–4869`) builds the list when it is null, indexes `rn2(animal_list_count)`, and retries once on `Is_rogue_level(&u.uz)` when `!isupper(monsym(&mons[res]))`.
**JS:** `js/makemon.js` `mon_animal_list` `:1184`. Construct loop `:1188–1190`. Store `:1191–1192`. Release `:1193–1196`. `pick_animal` `:1204`. Build call `:1205`. Index `:1206`. Rogue retry `:1207–1209`. `is_animal` `js/monsters.js:648`. `monsym` `js/display.js:524`. `monsym_isupper` `js/makemon.js:1245`. Chameleon caller `select_newcham_form` `:1418`.
**Change:** One exported `mon_animal_list` keeps that C order. The list and the count live on `game` (`ga.animal_list` / `ga.animal_list_count`). `alloc` / `memcpy` / `free` are the JS array.
**Verify:** `node scripts/verify.mjs --fn mon_animal_list` → PASS syntax (1 changed js file: js/makemon.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** No arm of `mon_animal_list` is omitted. `save.c:1123` `free_animals()` stays unwired with the rest of `freedynamicdata`.
**Next:** `dothrow.c` `tmiss` (next Open — coverage row). Nine coverage rows remain after this archive and the `dead_species` park, above the floor of 8, so nothing was refilled.

## 2026-09-27 — D-2955 `is_flammable` rejects candles, fire resistance, and wands of fire

**C locus:** `nethack-c/upstream/src/mkobj.c:2270–2286` `is_flammable`. `otyp` and `objects[otyp].oc_material` are read first. `Is_candle` (`obj.h:382–383`) returns false. `oc_oprop == FIRE_RES` or `otyp == WAN_FIRE` returns false. Otherwise `(omat <= WOOD && omat != LIQUID) || omat == PLASTIC`.
**JS:** `js/mkobj.js` `is_flammable` `:799`. Candle return `:808`. Property and wand return `:811`. Material return `:814`. `WAN_FIRE` `:128`. `Is_candle` `js/timeout.js:1519`. `FIRE_RES` `js/const.js:2567`. `is_flammable_obj` `js/objnam.js:218`. Lava predicate `js/dothrow.js:2551` (import `:18`).
**Change:** One exported `is_flammable` keeps that C order and calls `timeout.js` `Is_candle`. `oc_oprop` is compared to `FIRE_RES`. The wand test is the `WAN_FIRE` index.
**Verify:** `node scripts/verify.mjs --fn is_flammable` → PASS syntax (3 changed js files: js/dothrow.js js/mkobj.js js/objnam.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed; pass --full to force) · VERIFY: PASS. An earlier run with the `objnam.js` static import failed every session on `ReferenceError: Cannot access '_body_part' before initialization`; that import was removed before this run.
**Named:** No arm of `is_flammable` is omitted. `is_flammable_obj` reads a missing objects row as material 0 and property 0.
**Next:** `mon.c` `mon_animal_list` (next Open — coverage row). Eleven coverage rows remain after this archive, above the floor of 8, so nothing was refilled.

## 2026-09-27 — D-2954 `redist_attr` clamps polymorphed strength to the current form

**C locus:** `nethack-c/upstream/src/attrib.c:740–760` `redist_attr`. The loop skips `A_INT` and `A_WIS`. Each other attribute saves `AMAX`, adds `rn2(5) - 2`, then clamps to `ATTRMAX` and `ATTRMIN`. `ABASE` becomes `ABASE * AMAX / tmp` (C integer division toward 0) and is raised to `ATTRMIN` when it falls short. `ATTRMAX` is `attrib.h:43–44`: `A_STR && Upolyd` calls `uasmon_maxStr()`, otherwise `urace.attrmax`. The comment at `:760` leaves `encumber_msg` to the caller.
**JS:** `js/attrib.js` import `:83`. `redist_attr` `:614`. Form ceiling `:622` (`uasmon_maxStr` `js/polyself.js:646`). Race ceiling `attrMax` `:220`. Floor and store `:623–631`.
**Change:** One exported `redist_attr` keeps that C order. Strength while `Upolyd` clamps through `polyself.js` `uasmon_maxStr` (`imports.mjs --can attrib.js polyself.js uasmon_maxStr` SAFE, hoisted). Every other attribute still uses the race ceiling and the race floor.
**Verify:** `node scripts/verify.mjs --fn redist_attr` → PASS syntax (1 changed js file: js/attrib.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed; pass --full to force) · VERIFY: PASS.
**Named:** No arm of `redist_attr` is omitted. A saved peak of 0 keeps the old base; C would divide by that peak.
**Next:** `mkobj.c` `is_flammable` (next Open — coverage row). Seven coverage rows remain after this archive, below the floor of 8. `--rows 5` was the never-re-pop Stale head, not pasted. Five later gameplay rows from `--rows 800 --min-c-lines 15` are appended.
