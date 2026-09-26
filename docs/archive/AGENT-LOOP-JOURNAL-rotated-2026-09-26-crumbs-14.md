# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-26 — D-2878 `more_experienced` caps a wrapped experience total at LONG_MAX

**C locus:** `nethack-c/upstream/src/exper.c:169–203` `more_experienced`. Callee: `exp_percent_changing` (`botl.c:2090`, live `js/botl.js:593`). `SCORE_ON_BOTL` has no `#define` in the pinned tree, so the `flags.showscore` arm is not compiled. `Role_if(PM_WIZARD)` is `gu.urole.mnum == PM_WIZARD` (`you.h:247`). `disp.botl` is the bit `bot()` reads (`game.flags.botl`).
**JS:** `js/exper.js` `EXP_LONG_MAX` `:303`, `more_experienced` `:315`, int `rexpincr` `:323`, caps `:326–333`, `uexp` / `showexp` / `exp_percent_changing` `:334–337`, `urexp` `:338–340`, beginner `:341–343`.
**Change:** One `more_experienced` in that C order. `exper` and `rexp` are C `int`. `rexpincr = 4 * exper + rexp` is `int` arithmetic (`Math.imul`, then an int32 add) before it widens to `long`.
**Verify:** `node scripts/verify.mjs --fn more_experienced` → PASS syntax (1 changed js file: js/exper.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** `SCORE_ON_BOTL` / `flags.showscore` (`exper.c:194–197`) is not compiled. The cap threshold is `Number.MAX_SAFE_INTEGER`, not a 64-bit `LONG_MAX`; totals between 2^53 and 2^63−1 are not exact JS integers.
**Next:** `light.c` `candle_light_range` (next Open — coverage row). `Sting_effects` parked Stale. Six gameplay rows refilled (`does_block`, `give_spell`, `tshirt_text`, `logdeadmon`, `bhitpile`, `vision_reset`); 12 Open — coverage rows remain after archive.

## 2026-09-26 — D-2877 `strstri` counts signed nibbles, then matches with `lowc`

**C locus:** `nethack-c/upstream/src/hacklib.c:739–779` `strstri`. `STRSTRI` is not defined, so this body is compiled. Callee: `lowc` (`hacklib.c:83`, live `ascii_lowc_ch` in `js/hacklib.js`). The `#if 0` asserts are not compiled. Counters are `char` (signed wrap).
**JS:** `js/hacklib.js` `strstri` `:343`, empty `:354`, counts `:360–366`, reject `:368–371`, window `:373–378`. `js/attrib.js` `poisoned` `:403` and `:482`, `from_what` `:1197` and `:1205`. `js/write.js` `:302`. `js/objnam.js` `:1364` and `:1441`. `js/dungeon.js` `:1129` and `:1156`. `js/uhitm.js` `:1682`. `js/invent.js` `cinv_doname` `:4493`. `js/mondata.js` `:752` and `:946`.
**Change:** One `strstri` in that C order. An empty substring (`!*sub`, including a leading NUL) returns `str`. Nibble tables of size `0x20` count `*s & 31` in signed 8-bit counters while measuring `strlen(str) - strlen(sub)`.
**Verify:** `node scripts/verify.mjs --fn strstri` → PASS syntax (8 changed js files: js/attrib.js js/dungeon.js js/hacklib.js js/invent.js js/mondata.js js/objnam.js js/uhitm.js js/write.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (those files are not in the shared-file set) · VERIFY: PASS.
**Named:** `apply.c:1412` (the attach prompt at `js/apply.js:4813` is built without the ` to\033` strip). `botl.c:136` and `:4283`.
**Next:** `artifact.c` `Sting_effects` (next Open — coverage row). Eight Open — coverage rows remain after archive, at the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2876 `setuwep` dirties the status line for Ogresmasher and snuffs a lit light-artifact

**C locus:** `nethack-c/upstream/src/wield.c:100–135` `setuwep`. Callees: `setworn` (`worn.c:72`), `artifact_light` (`artifact.c:2263`), `end_burn` (`timeout.c:1803`), `pline`, `Tobjnam` (`objnam.c`), `u_wield_art` (`obj.h:441` `is_art(uwep, art)`), `is_art` (`artifact.c:2808`), `is_launcher` / `is_ammo` / `is_missile` / `is_pole` / `is_weptool` / `is_wet_towel`, `Blind` (`youprop.h:103`).
**JS:** `js/wield.js` `mark_disp_botl` `:292`, `olduwep_still_shining` `:304`, `setuwep_after_shine` `:315`, `setuwep` `:346`, first botl `:353–357`, shine Promise `:362–374`.
**Change:** One `setuwep` in that C order. Same object returns before `gu.unweapon` changes. `setworn(obj, W_WEP)` runs, then Ogresmasher (raw `oartifact`, new or old) sets `disp.botl` before any message.
**Verify:** `node scripts/verify.mjs --fn setuwep` → PASS syntax (9 changed js files: js/ball.js js/do.js js/do_wear.js js/dothrow.js js/hack.js js/lock.js js/pickup.js js/wield.js js/zap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.4s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `hmon_hitmon_potion` (`uhitm.c:1094–1116`, call at `:1103`). The potion arm in `js/uhitm.js:1958` still uses `dmgval`.
**Next:** `hacklib.c` `strstri` (next Open — coverage row). Nine Open — coverage rows remain after archive, above the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2875 `monkilled` speaks with `pline_mon`, then a pet golem's epitaph

**C locus:** `nethack-c/upstream/src/mon.c:3377–3418` `monkilled`. Callees: `worm_known` (`worm.c:877`), `cansee`, `pline_mon`, `Monnam`, `nonliving`, `completelyburns` / `completelyrusts` / `completelyrots` (`mondata.h:223–227`), `mondead`, `mondied`, `pline`, `noit_mon_nam` (`do_name.c:1051`). `DEADMONSTER` is `mhp < 1`.
**JS:** `js/mhitm.js` `completelyburns_mm` `:2906`, `completelyrusts_mm` `:2912`, `completelyrots_mm` `:2918`, `monkilled` `:3902`, kill line `:3907–3915`, sad feeling `:3916–3920`, disintegested `:3925–3930`, life-save return `:3933`, epitaph `:3937–3942`. Trap import `:30`.
**Change:** One `monkilled` in that C order. A non-null `fltxt` that is seen (`wormno ? worm_known : cansee`) is `pline_mon` "%s is %s%s%s!" (destroyed when `nonliving`, " by the " only when `fltxt` is non-empty). Otherwise `sad_feeling` is set true or false from `mtame`.
**Verify:** `node scripts/verify.mjs --fn monkilled` → PASS syntax (4 changed js files: js/mhitm.js js/trap.js js/uhitm.js js/zap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (those files are not in the shared-file set) · VERIFY: PASS.
**Named:** `wiz_kill` (`wizcmds.c:242–337`, call at `:326` with a null `fltxt` and `AD_PHYS`). `#wizkill` is only an extended-command name.
**Next:** `wield.c` `setuwep` (next Open — coverage row). Ten Open — coverage rows remain after archive, above the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2874 `overview_stats` counts mapseen nodes, cemeteries, and annotations

**C locus:** `nethack-c/upstream/src/dungeon.c:2761–2801` `overview_stats`. No C callees beyond `Sprintf` and `putstr` (the `template[]` row and the text window). Call: `wizcmds.c:1668` inside `wiz_show_stats`. `extern.h:930` is the declaration.
**JS:** `js/dungeon.js` `overview_stats` `:1969`, counters `:1971–1976`, chain `:1978–1998`, node size `:1981–1982`, cemetery `:1984–1987`, annotation `:1989–1992`, general row `:2000–2001`, cemetery row `:2003–2006`, annotations row `:2008–2010`, totals `:2012–2013`.
**Change:** One `overview_stats` in that C order. Six counters start at 0. An array chain is walked in order (`.next` stays null); a non-array head walks `->next`.
**Verify:** `node scripts/verify.mjs --fn overview_stats` → PASS syntax (1 changed js file: js/dungeon.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (dungeon.js is not in the shared-file set) · VERIFY: PASS.
**Named:** `wiz_show_stats` (`wizcmds.c:1616–1697`) and its object/monster chain helpers. `Sprintf` / `putstr` are the line array and `overview_stats_row`.
**Next:** `mon.c` `monkilled` (next Open — coverage row). Eleven Open — coverage rows remain after archive, above the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2873 `wish_history_add` keeps a wizard's wish text unless a stored line is already its prefix

**C locus:** `nethack-c/upstream/src/zap.c:6227–6255` `wish_history_add`. `DEBUG` is defined (`patchlevel.h:36`), so the body is compiled. Callees: `wizard` (`flag.h` `flags.debug`), `strncmpi` (`hacklib.c:716`, live as `str_start_is` in `js/hacklib.js:132`), `strlen` / `alloc` / `strcpy` / `free` (the JS string in the slot). Calls: `zap.c:6375` and `:6379` `makewish`; `files.c:2572` `proc_wizkit_line`.
**JS:** `js/zap.js` `wish_history_add` `:7132`, wizard return `:7134`, scan `:7144`, prefix `:7147`, replace `:7150–7153`. `bufcpy` `:7210`. Terrain call `:7228`. Object call `:7235`. `js/files.js` `proc_wizkit_line` `:151`.
**Change:** One `wish_history_add` in that C order. Non-wizard (`!flags.debug`) returns before the ring is touched. Otherwise the 20 slots are scanned from `wish_history_idx`.
**Verify:** `node scripts/verify.mjs --fn wish_history_add` → PASS syntax (2 changed js files: js/files.js js/zap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (those files are not in the shared-file set) · VERIFY: PASS.
**Named:** `wish_history_menu` (`zap.c:6275–6309`) stays a no-op, and `makewish` does not call it (`zap.c:6334–6335`, `menu_requested`). `wish_history_flush` (`zap.c:6259–6269`) is not ported, so `freedynamicdata` does not clear the ring.
**Next:** `dungeon.c` `overview_stats` (next Open — coverage row). Six rows remained after the archive, below 8, so six tool rows were appended (12 open).
