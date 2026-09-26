# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-26 — D-2817 `mount_steed` uses the resistance-aware Hallucination

**C locus:** `nethack-c/upstream/include/youprop.h:116–120` `Hallucination` is `HHallucination && !Halluc_resistance`, and `HHallucination` is `u.uprops[HALLUC].intrinsic`. `steed.c:212–215` `mount_steed` returns false when that macro is set and `!force`. `steed.c:647` `dismount_steed` uses the same macro for the nameless-steed rain line.
**JS:** `js/steed.js` `mount_steed` `:652`. `dismount_steed` `:957`. `js/display.js` `Hallucination` `:1091`.
**Change:** Import `Hallucination` from `display.js` (already a static import; call-time only). Both steed sites call that export. `do_name.js` is unchanged.
**Verify:** `node scripts/verify.mjs --fn mount_steed` → PASS syntax (1 changed js file: js/steed.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: steed.js is outside the auto shared set) · VERIFY: PASS.
**Named:** `do_name.js` `Hallucination` still returns on sticky `u.Hallucination` before resistance and does not read the intrinsic slot; its other importers are unchanged. D-2813 stands: a `mtrapped` monster with no `t_at` says "a trap"; `which_armor_saddle` remains for `use_saddle` / `dismount_steed`; `landing_spot` still walks `game.ftrap`; `steed_vs_stealth` writes flat `BStealth`.
**Next:** `detect.c` `level_distance` (next Open — coverage row).

## 2026-09-26 — review 1767–1775 (audit, no port)

**Reviewed:** `79c71b903` unstuck ACCEPT; `27a017b11` Boots_on ACCEPT; `302f02151` petattr ACCEPT; `4bf3b26b6` coord_desc ACCEPT; `9dcef1d65` remove_worn_item ACCEPT; `686ccd9e7` mount_steed QUALITY-RISK (`do_name.js` `Hallucination` returns on sticky `u.Hallucination` before `Halluc_resistance` and skips `uprops[HALLUC].intrinsic`); `30a1b86dc` allow_category ACCEPT; `75a5d7683` safe_teleds ACCEPT; `5dd7c4a90` retouch callers ACCEPT.
**Score:** `sessions` 44/44, screens 11,405/11,405, RNG 792,838/792,838, speed `241+1.61/turn` (R² 0.698) at `5dd7c4a90`. Held-out 12/44 unchanged (2026-09-25T19:27Z). `hidden-proxy score` 12/12 PASS on the private recordings (RNG 75,151/75,151, screens 653/653, 0 owners). No PASS→FAIL.
**Next:** Must-fix `mount_steed` hallucination gate (review 1772) before `level_distance`.

## 2026-09-26 — D-2816 `retouch_equipment` callers retest worn gear

**C locus:** `nethack-c/upstream/src/artifact.c:2639–2705` `retouch_equipment`. Nesting `clear_bypasses` (`:2664` / `:2704`). `dropflag > 0` then `uswapwep` and `uwep` (`:2667–2678`). Saddle `untouchable(..., FALSE)` and `dismount_steed` (`:2681–2686`). `dropflag == 1` then `nxt_unbypassed_obj(gi.invent)` (`:2694–2696`). Ring-loss `uncurse` and glove-loss `selftouch` (`:2698–2701`). Callers pass 0 from `attrib.c:1360` and 2 from `eat.c:1325`, `polyself.c:463` `newman`, `:1021` `polymon`, `:1415` `rehumanize`, `uhitm.c:4285`.
**JS:** `js/artifact.js` `retouch_equipment` `:1619`. `untouchable` `:1579`.
**Change:** Await the existing export at those six sites, after the C state change and before the following `selftouch` where C has one. `dropflag` 0 from `uchangealign`, 2 from the others. `imports.mjs --can`: `polyself.js` → `artifact.js` `retouch_equipment` is a hoisted function in the existing cycle; `attrib.js`, `eat.js`, and `mhitu.js` already imported `artifact.js`.
**Verify:** `node scripts/verify.mjs --fn retouch_equipment` → PASS syntax (5 changed js files: js/artifact.js js/attrib.js js/eat.js js/mhitu.js js/polyself.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: those files are outside the auto shared set) · VERIFY: PASS.
**Named:** `bypass_obj` still skips a null `uswapwep` (C would dereference). `untouchable` on a null object returns false.
**Next:** `detect.c` `level_distance` (next Open — coverage row).

## 2026-09-25 — D-2815 `safe_teleds` reads Passes_walls and t_at

**C locus:** `nethack-c/upstream/src/teleport.c:717–770` `safe_teleds`. Forty `rnd(COLNO-1)` / `rn2(ROWNO)` tries, `teleok(FALSE)` then `teleds` (`:736–743`). `CC_RING_PAIRS|CC_SKIP_MONS`, plus `CC_SKIP_INACCS` unless `Passes_walls` (`youprop.h:286` `HPasses_walls || EPasses_walls`) (`:747–751`). `collect_coords` from the hero, maxradius 0 (`:750`). First `t_at` spot that `teleok(TRUE)` accepts is the backup (`:755–763`); that spot is used only when no open cell remains (`:765–768`); else false (`:769`). `teleok` (`:419–445`) also calls `t_at` (`:425`).
**JS:** `js/teleport.js` `safe_teleds` `:1652`. `teleok` `:1391`. `Passes_walls_prop` `js/hack.js:237`. `t_at` `js/trap.js:1063`.
**Change:** One `safe_teleds` in that C order. `Passes_walls_prop` is the youprop macro (flat H/E or the uprops slot). The backup calls `t_at` and only then `teleok(TRUE)`, so a null trap does not accept the cell.
**Verify:** `node scripts/verify.mjs --fn safe_teleds` → PASS syntax (1 changed js file: js/teleport.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: teleport.js is outside the auto shared set) · VERIFY: PASS.
**Named:** `do.c:1566` stays inside the deferred Gehennom amulet mysteryforce arm (`js/do.js:1544`), so same-level `safe_teleds` + `next_to_u` is not reached. `collect_coords` omits `debugpline4` (`teleport.c:711`).
**Next:** `sp_lev.c` `dig_corridor` (next Open — coverage row).

## 2026-09-25 — D-2814 `allow_category` keeps cleric BUC and filters every loot class

**C locus:** `nethack-c/upstream/src/pickup.c:523–592` `allow_category`. Empty filters return false unless `ParanoidAutoAll` (`:526–529`). Coins with a class filter return before the priest force (`:535–536`). `Role_if(PM_CLERIC)` `set_bknown` (`:538–539`). Class (`:561–562`), unpaid or `count_unpaid(cobj)` (`:565–567`), BUC with `flags.goldX` on coins (`:569–587`), just-picked (`:588–589`), else true (`:591`). Callers: `do.c:1057` and the `:1074` function pointer, `invent.c:2139` `ckvalidcat` (askchain `:2448`), `pickup.c:611`, `:834`, `:843`, `menu_loot` `:3335` and `:3365`.
**JS:** `js/pickup.js` `allow_category` `:403`. `menu_loot` `:2760`. `loot_menu_olist` `:2740`.
**Change:** One `allow_category` in that C order. `ParanoidAutoAll` is `paranoia_bits & PARANOID_AUTOALL`. The priest test is `urole.mnum === monsterNames` `PM_CLERIC`, then `set_bknown(obj, 1)` after the coin early return.
**Verify:** `node scripts/verify.mjs --fn allow_category` → PASS syntax (1 changed js file: js/pickup.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: pickup.js is outside the auto shared set) · VERIFY: PASS. First cohort run failed seed0007 at screen 114 (`a - Scrolls` vs `a - All types`); the nobj snapshot fixed that walk, then the re-run passed.
**Named:** A null object returns false (C is `NONNULLARG1`). `strchr` of class 0 matches the terminator; `includes(0)` does not.
**Next:** `teleport.c` `safe_teleds` (next Open — coverage row).

## 2026-09-25 — D-2813 `mount_steed` rides in C order through `teleds`

**C locus:** `nethack-c/upstream/src/steed.c:197–383` `mount_steed`. Already riding `:206–209`. Hallucination `:213–216`. Wounded legs and wizard `heal_legs(0)` `:228–238`. Poly form including `slithy` `:241–246`. Burden `:247–250`. Unseen / `M_AP_*` `:253–259`. Long-worm tail before `test_move` `:262–270`. Stuck / `Punished` / `test_move` `:271–280`. Saddle `:283–287`. `touch_petrifies` `:290–298`. Tame / minion `:299–302`. Trapped `:303–309`. Non-Knight `--mtame` and `m_unleash(FALSE)` `:312–319`. Underwater `:320–324`. `can_saddle` / `can_ride` `:325–328`. Levitation reach `:331–336`. Eroded metallic armor `:337–342`. Slip `rnd` then `x_monnam` / `losehp` `:343–360`. Success `:362–381`: `maybewakesteed`, float and flight lines, polearm `unweapon = FALSE`, `u.usteed`, stealth edge, `remove_monster`, `teleds(TELEDS_ALLOW_DRAG)`, `disp.botl`.
**JS:** `js/steed.js` `mount_steed` `:607`. `maybewakesteed` `:464`. `steed_vs_stealth` `:409`.
**Change:** One `mount_steed` in that C order. Property gates are the C macros (`Hallucination`, `Blind`, `Upolyd`, `Levitation`, `Flying`, `Fumbling`, `Glib`, `Punished`) with flat/uprops OR where this port stores the same long in either place. `Lev_at_will` is the `I_SPECIAL` / `W_ARTI` test.
**Verify:** `node scripts/verify.mjs --fn mount_steed` → PASS syntax (1 changed js file: js/steed.js) · PASS rule2 · note hidden (no corpus session blocked at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: steed.js is outside the auto shared set) · VERIFY: PASS.
**Named:** A `mtrapped` monster with no `t_at` record says "a trap" (C would dereference `t->ttyp`). `which_armor_saddle` remains for `use_saddle` and `dismount_steed`.
**Next:** `pickup.c` `allow_category` (next Open — coverage row).
