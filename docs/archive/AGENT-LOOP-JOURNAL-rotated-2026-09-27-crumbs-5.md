# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-27 — D-2926 `rejectcasting` stops a stunned, silent, or welded caster

**C locus:** `nethack-c/upstream/src/spell.c:687–708` `rejectcasting`. If `Stunned` (`HStun`), `You("are too impaired to cast a spell.")` and return TRUE. Else if `!can_chant(&gy.youmonst)`, `You("are unable to chant the incantation.")` and return TRUE. Else if `!freehand()` and the wielded weapon is not a quarterstaff, `Your("arms are not free to cast!")` and return TRUE. Else return FALSE. `can_chant` is `mondata.c:579–587`: hero `Strangled`, else `is_silent`, `!has_head`, `MS_BUZZ`, or `MS_BURBLE`.
**JS:** `js/spell.js` `rejectcasting` `:1427`. Stun `:1429`. Chant `:1432`. Hands `:1435`. `can_chant` `:1398`. `getspell` `:1852`. `spelleffects_check` `:1957`.
**Change:** One file-local async `rejectcasting` in that C order. `You` and `Your` are the display exports. `freehand` is the `engrave.c:472–477` export.
**Verify:** `node scripts/verify.mjs --fn rejectcasting` → PASS syntax (3 changed js files: js/pray.js js/read.js js/spell.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.7s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `rejectcasting` or `can_chant` is omitted. `makeplural(body_part(ARM))` is the C comment, not a call.
**Next:** `cmd.c` `end_of_input` (next Open — coverage row). Seven coverage rows remain after archive, below the floor of 8. Refilled five tool rows (`stuff_prevents_passage`, `learnring`, `shuffle_customizations`, `endgamelevelname`, `ansimpleoname`) from `port-coverage.mjs --rows 800 --min-c-lines 20` after skipping DONE/PARKED/Stale, `split?`, unreachable hops, save/files/bones/botl/restore, sanity, and `reset_glyphmap`.

## 2026-09-27 — D-2925 `Shield_on` names every shield, then marks it known

**C locus:** `nethack-c/upstream/src/do_wear.c:705–730` `Shield_on`. Switch on `uarms->otyp`: `SMALL_SHIELD`, `SHIELD_OF_DRAIN_RESISTANCE`, `SHIELD_OF_SHOCK_RESISTANCE`, `ELVEN_SHIELD`, `URUK_HAI_SHIELD`, `ORCISH_SHIELD`, `DWARVISH_ROUNDSHIELD`, `LARGE_SHIELD`, `SHIELD_OF_REFLECTION` break. Default `impossible("Unknown type of %s (%d)", "shield", uarms->otyp)`. If `!uarms->known`, set `known = 1` and `update_inventory()`. Return 0. The comment names `setworn` as the caller of the extrinsic, not a callee.
**JS:** `js/do_wear.js` `Shield_on` `:1416`. Switch `:1420–1432`. Known tail `:1435–1438`.
**Change:** One file-local async `Shield_on` in that C order. `impossible` is awaited. `update_inventory` is the sync invent export.
**Verify:** `node scripts/verify.mjs --fn Shield_on` → PASS syntax (1 changed js file: js/do_wear.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `Shield_on` is omitted. A null `uarms` returns 0 (C would dereference).
**Next:** `role.c` `randrace` (next Open — coverage row). Four coverage rows remain after archive, below the floor of 8. Refilled five tool rows (`whatdoes_help`, `Shield_off`, `chk_okdoor`, `yyyymmdd`, `erosion_matters`) from `port-coverage.mjs --rows 800 --min-c-lines 20` after skipping DONE/PARKED/Stale subjects, save/files/bones/botl, and sanity.

## 2026-09-27 — D-2924 `extract_from_minvent` snuffs lit armor, reverts a crysknife, and unwields

**C locus:** `nethack-c/upstream/src/worn.c:1376–1417` `extract_from_minvent`. Read `owornmask`. If `where != OBJ_MINVENT`, `impossible` and return. If `W_ARM` and `lamplit` and `artifact_light`, `end_burn(obj, FALSE)` before the mask is cleared. `obj_extract_self`, then `owornmask = 0`. If the mask was set: `!DEADMONSTER` (`mhp < 1`) and `do_extrinsics` call `update_mon_extrinsics(mon, obj, FALSE, silently)`; clear that bit of `misc_worn_check`; `check_gear_next_turn`. Then `obj_no_longer_held`. If `W_WEP`, `mwepgone`.
**JS:** `js/worn.js` `extract_from_minvent` `:669`. Mismatch `:673–676`. Gold DSM `:679–681`. Extract `:682–683`. Extrinsics `:686–690`. Held core `:693`. `mwepgone` `:695`. Sync core `js/mkobj.js:2633`.
**Change:** One exported `extract_from_minvent` in that C order. `DEADMONSTER` is `mhp < 1`. `'MINVENT'` stays the port's second minvent tag, same as `obj_extract_self`.
**Verify:** `node scripts/verify.mjs --fn extract_from_minvent` → PASS syntax (11 changed js files: js/dogmove.js js/mhitm.js js/mkobj.js js/mon.js js/monmove.js js/muse.js js/pickup.js js/trap.js js/uhitm.js js/worn.js js/zap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.7s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** No arm of `extract_from_minvent` is omitted. A null mon or obj returns (C would not).
**Next:** `do_name.c` `rndmonnam` (next Open — coverage row). Nine coverage rows remain after archive, above the floor of 8, so nothing was refilled.

## 2026-09-27 — Audit 1874–1882 (D-2915…D-2923)

Nine JS SHAs after review 1873 (`e379902e8`). All **ACCEPT**: `mk_tt_object`, `christen_monst`, `ckmailstatus`, `fix_ghostly_obj`, `find_mid`, `cursed`, `deltrap`, `cant_wield_corpse`, `maybe_unhide_at`. No Must-fix. Public `sessions` 44/44, Scr 11,405/11,405, RNG 792,838/792,838, speed `288+1.72/turn` (R² 0.737). Held-out still 12/44 (6,275/11,265, RNG 29.7 %, screens 55.7 %). Private corpus 12/12. Next: `worn.c` `extract_from_minvent`.

## 2026-09-27 — D-2923 `maybe_unhide_at` reveals a hero hiding under a moved object

**C locus:** `nethack-c/upstream/src/mon.c:4698–4720` `maybe_unhide_at`. If `m_at`, read `mundetected` and `mtrapped`. Else if `u_at`, use `&gy.youmonst`, `u.uundetected`, and `u.utrap`. Else return. If undetected and (`hides_under` and (`!OBJ_AT` or trapped or `!can_hide_under_obj(level.objects[x][y])`) or `S_EEL` and `!is_pool`), call `hideunder`.
**JS:** `js/monmove.js` `maybe_unhide_at` `:1352`. Hero arm `:1360–1365`. `hideunder` split `:1377–1378`. `movobj` `js/hack.js:675`. Sighted `move_bc` `js/ball.js:651` and `:655`. `launch_obj` `js/trap.js:2609`. Away burn `js/timeout.js:1864`. Age-0 candle `js/timeout.js:2047`.
**Change:** One async `maybe_unhide_at` in that C order. `objects_at` is `level.objects[x][y]`. A monster still awaits the local `hideunder` (the You_see clone).
**Verify:** `node scripts/verify.mjs --fn maybe_unhide_at` → PASS syntax (6 changed js files: js/ball.js js/hack.js js/mkobj.js js/monmove.js js/timeout.js js/trap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.5s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** No arm of `maybe_unhide_at` is omitted. Monster `hideunder` stays the `monmove.js` local (You_see).
**Next:** `worn.c` `extract_from_minvent` (next Open — coverage row). `corpse_intrinsic` parked Stale. Ten coverage rows remain after archive, above the floor of 8, so nothing was refilled. The queue-empty overlay was `queue_has_open` calling `rg`, which was not installed; ripgrep now sees the open rows.

## 2026-09-27 — D-2922 `cant_wield_corpse` petrifies a bare-handed cockatrice wield

**C locus:** `nethack-c/upstream/src/wield.c:138–153` `cant_wield_corpse`. Return false when `uarmg`, `otyp != CORPSE`, `!touch_petrifies(&mons[corpsenm])`, or `Stone_resistance` (`youprop.h` `HStone_resistance || EStone_resistance`). Else `You("wield %s in your bare %s.", corpse_xname(obj, NULL, CXN_PFX_THE), makeplural(body_part(HAND)))`, then `instapetrify` of `wielding <killer_xname> bare-handed`, and return true.
**JS:** `js/wield.js` `cant_wield_corpse` `:515`. Guard `:524–528`. `You` `:530`. `instapetrify` `:537`. `ready_weapon` caller `:568`. `can_twoweapon` caller `:1247`.
**Change:** One file-local async `cant_wield_corpse` in that C order. `You`, `corpse_xname`, `killer_xname`, `makeplural`, and `touch_petrifies` are the live exports. `body_part(HAND)` is `body_part_latebound` (polyself imports wield).
**Verify:** `node scripts/verify.mjs --fn cant_wield_corpse` → PASS syntax (1 changed js file: js/wield.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.5s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (script: no shared file changed) · VERIFY: PASS.
**Named:** No arm of `cant_wield_corpse` is omitted. `ready_weapon`'s post-if `disp.botl` gate is `condtests[bl_bareh].enabled` in C; this arm uses the existing `game.flags.botl` tail.
**Next:** `eat.c` `corpse_intrinsic` (next Open — coverage row). Seven Open rows remain after archive, below the floor of 8. Refilled five tool rows (`Shield_on`, `randrace`, `rejectcasting`, `end_of_input`, `worn_item_removal`) from `port-coverage.mjs --rows 600 --min-c-lines 15` after skipping DONE/PARKED/Stale subjects and save/files/sanity. The queue-empty overlay did not match the live queue (`rg` is not on PATH, which is what `queue_has_open` runs).
