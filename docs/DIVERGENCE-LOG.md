# Divergence log

Evidence-backed history of important C↔JS divergences. Active speculation stays
small in `NOTES.md`; once a cause is proved or a dead end is expensive enough
to preserve, record it here. Index: `DIVERGENCE-INDEX.md`.

## D-0716 — wipe `make_blinded` sticky Blind (seed0108)

- **Status:** fixed (partial — seed0108 still FAIL; next @3011)
- **Symptom:** @3011 C `distfleeck` `rn2(5)` vs JS chest `rn2(36)`. After
  `#invoke` spaces: C `--More--` mid-combat; JS raced to `#wizwish`.
- **C locus:** `potion.c` `make_blinded` / `toggle_blindness`; `youprop.h`
  `Blind` ≡ `(HBlinded||EBlinded)&&!BBlinded`; `do.c` `wipeoff`.
- **Cause:** D-0712 `wipeoff`→`make_blinded(0)` probed sight via helpers that
  trusted sticky `u.Blind`, so clearing `HBlinded` never cleared the mirror;
  `vision_recalc` stayed Blind → `gv.vis` false → no combat pline/`--More--`
  → spaces fell through to rhack / wish.
- **Change:** prop-based `Blind()` / `hero_Blind` / `vision_recalc` Blind test;
  wipe `make_blinded` syncs sticky + `vision_recalc(0)` on toggle (C
  `toggle_blindness` subset). Named omissions: Eyes probe; Punished `set_bc`;
  Hallu talk; Sting/`learn_unseen_invent`; full sticky audit elsewhere.
- **Verification:** green+strict PASS; seed0108 still prefix **3011**; More now
  fires post-invoke (`Nothing happens.  The kitten misses…`); cohort
  seed1500/1800/0060 PASS.
- **Next:** @3011 C continues `movemon` after EOT (`umov<12` loopAgain) while
  JS EOT leaves `umov=15` then wish — peel slow-form `u_calc_moveamt` cycle
  (not global `rest_on_space`).

## D-0715 — #invoke missing (seed0108)

- **Status:** fixed (partial — seed0108 still FAIL; next @3011)
- **Symptom:** @2958 C `distfleeck` `rn2(5)` vs JS `rn2(36)` —
  JS already in `#wizwish chest` `rnd_otyp_by_namedesc` while C still on
  post-Mjollnir monster turn.
- **C locus:** `cmd.c` `"invoke"` → `doinvoke`; `artifact.c` `invoke_ok` /
  `arti_invoke`. Mjollnir `inv_prop==0` → `pline(nothing_happens)` +
  `ECMD_TIME`.
- **Cause:** `#invoke` was AC-only (EXT_CMD_AC) without EXT_CMDS runner →
  "unknown extended command"; keys `p␠␠`/`#wizwish chest` desynced.
- **Change:** EXT_CMDS `#invoke`→`doinvoke`; `invoke_ok`/`getobj_invoke`;
  `arti_invoke` !inv_prop/crystal-ball stub → nothing_happens+ECMD_TIME;
  `rhack` `<space>`→`donull` when `flags.rest_on_space`. Named omissions:
  inv_prop specials (taming/healing/portal/…); property-toggle arm;
  artilist `inv_prop` not in `artifacts_data`; `use_crystal_ball`.
- **Falsified:** forcing `rest_on_space=true` regresses @2869 (More spaces
  become waits).
- **Verification:** green+strict PASS; seed0108 prefix **2958→3011**;
  suite matched RNG 3029→3112; cohort 33/33 prior PASS stay PASS.
- **Next:** @3011 post-invoke spaces as C turns before chest wish —
  More vs wait peel (not global ROS).

## D-0714 — polymon drop_weapon(1) missing (seed0108)

- **Status:** fixed (partial — seed0108 still FAIL; next @2958)
- **Symptom:** @2881 C `obj_resists` `rn2(100)` vs JS `rn2(12)` —
  two fewer floor `dogfood`/`obj_resists` after `#polyself`→red dragon.
- **C locus:** `polyself.c` `polymon` → `drop_weapon(1)` after
  `break_armor`; `cantwield` ≡ `nohands||verysmall`.
- **Cause:** JS `polymon` deferred `drop_weapon`; red dragon kept
  wielded magic lamp. C message "drop your tool!" places lamp on
  `fobj` → pet `dog_goal` scans it. Session later: kitten picks up lamp.
- **Change:** port `drop_weapon(alone)` (canletgo → uwepgone/setuwep →
  `dropx`; alone-message via TOOL→"tool"). Named omissions: twoweapon
  dual-drop detail; `in_use` defer; `could_twoweap` untwoweapon;
  `break_armor` horns/gloves/boots/shield still deferred.
- **Verification:** green+strict PASS; seed0108 prefix **2881→2958**;
  cohort 33/33 prior PASS stay PASS. Suite matched RNG 2931→3029.
- **Next:** @2958 C `distfleeck` `rn2(5)` vs JS `rn2(36)` (post-Mjollnir
  wish).

## D-0713 — #polyself / polymon missing (seed0108)

- **Status:** fixed (partial — seed0108 still FAIL; next @2881)
- **Symptom:** @2864 C `exercise` `rn2(2)` vs JS `rn2(7)` — `#polyself`
  was AC-only → unknown extcmd; `gnome`/`red dragon` keys desynced.
- **C locus:** `wizcmds.c` `wiz_polyself`; `polyself.c` `polyself`/
  `polymon`/`set_uasmon`/`break_armor`.
- **Change:** EXT_CMDS `#polyself`→`wiz_polyself`; new `js/polyself.js`
  controlled getlin→`polymon` (CON/WIS exercise, sex `rn2(10)`,
  `rn1(500,500)`, dragon/`d(mlvl,8)` mhmax, sliparm/breakarm shed,
  minimal `set_uasmon`). Named omissions: `newman`; random pick; were/
  vamp/dragon-merge; FROMFORM props; `drop_weapon`; `#monster`; golemhp;
  livelog first-poly.
- **Verification:** green+strict PASS; seed0108 prefix **2864→2881**;
  cohort 33/33 prior PASS stay PASS.
- **Next:** @2881 pet `obj_resists` short vs C (dog_goal after poly).

## D-0712 — #wipe / dowipe missing (seed0108)

- **Status:** fixed (partial — seed0108 still FAIL; next @2864)
- **Symptom:** after D-0711 cream pie, `#wipe` was AC-only → unknown
  extcmd; C `wipeoff` clears cream/`HBlinded` then monster turn.
- **C locus:** `do.c` `dowipe` / `wipeoff`; `cmd.c` extcmdlist `"wipe"`.
- **Change:** EXT_CMDS `#wipe`→`dowipe`; `wipeoff` occupation (−4 cream/
  BlindedTimeout; glop-off → `make_blinded(0,TRUE)`). Named omissions:
  `gulp_blnd_check` swallow; poly `body_part(FACE)`.
- **Verification:** green+strict PASS; seed0108 prefix **2807→2864**;
  cohort prior PASS stay PASS.
- **Next:** @2864 C `exercise` `rn2(2)` vs JS `rn2(7)` (#polyself path).

## D-0711 — doapply missing use_cream_pie (seed0108)

- **Status:** fixed (partial — seed0108 still FAIL; next was wipe @2810)
- **Symptom:** seed0108 @2807 — C `rnd(25)` @ `use_cream_pie` vs JS `rn2(5)`.
- **C locus:** `apply.c` `doapply` → `use_cream_pie` (`rnd(25)` blindinc).
- **Cause:** JS `doapply` lacked cream-pie arm after D-0710 `#rub` reached
  the wish+apply sequence.
- **Change:** port `use_cream_pie` (immerse msg; `can_blnd` cream-self;
  `rnd(25)`→`ucreamed`+`make_blinded`; `setnotworn`/`delobj`/`obj_resists`).
  Named omissions: `costly_alteration` COST_SPLAT; Blindfolded visor polish;
  invent-array split wiring for quan>1.
- **Verification:** green+strict PASS; prefix **2807→2810** (then D-0712).
- **Next:** was `#wipe` (D-0712); now superseded.

## D-0710 — #rub missing → SE move desyncs pet nearby (seed0108)

- **Status:** fixed (partial — seed0108 still FAIL; next @2807)
- **Symptom:** seed0108 @2778 — C `dochug` `rn2(4)` vs JS `rn2(100)`
  (`obj_resists` via `dog_goal`). JS tame feline `nearby=false` (dist2=8).
- **C locus:** `apply.c` `dorub` / `wield.c` `wield_tool`; `hack.c` `nomul`
  `cmdq_clear(CQ_CANNED)`.
- **Cause:** `#rub` was autocomplete-only (not in `EXT_CMDS`). After wish,
  keys `#rub\nn` fell through; `n` was SE movement → hero stepped away from
  pet (dist2 2→8) → `!nearby` short-circuited wanderer `rn2(4)`. C ran
  `dorub`→`wield_tool` ("You now wield a lamp.") without moving; goblin hit
  `nomul(0)` cleared the canned re-queue.
- **Change:** register `#rub`→`dorub`; port `wield_tool` + `rub_ok`/`getobj_rub`
  + cmdq re-queue; `nomul` clears `game._cmdq_canned`. Named omissions:
  `use_stone`/`use_royal_jelly`; `djinni_from_bottle`/`begin_burn`; full
  welded/cantwield/bimanual arms.
- **Verification:** green+strict PASS; seed0108 prefix **2778→2807**; cohort
  10/10 prior PASS stay PASS.
- **Next:** seed0108 @2807 `use_cream_pie` `rnd(25)` (D-0711); or D-0708.

## D-0709 — #wizwish missing from EXT_CMDS (seed0108)

- **Status:** fixed (partial — seed0108 still FAIL; next @2778)
- **Symptom:** seed0108 @2772 — C `rnd_otyp_by_namedesc` `rn2(16)`
  ("magic lamp") vs JS `rn2(5)` from a non-wish path.
- **C locus:** `cmd.c` extcmdlist `"wizwish"` → `wiz_wish` /
  `makewish` / `readobjnam`.
- **Cause:** `js/getline.js` `EXT_CMDS` had `levelchange`/`wizgenesis`
  but not `wizwish` (C: IFBURIED|CMD_M_PREFIX|WIZMODECMD, no
  AUTOCOMPLETE). `#wizwish` → unknown extcmd; following keys were
  eaten as ordinary input.
- **Change:** register `wizwish` → `wiz_wish` in `EXT_CMDS`.
- **Verification:** green+strict PASS; seed0108 prefix **2772→2778**
  (wish + makewish `rn2(100)` match); cohort 10/10 prior PASS stay
  PASS (incl. seed0398/0373/5006/0116/0361/0367).
- **Next:** seed0108 @2778 C `dochug` `rn2(4)` vs JS `rn2(100)`
  (wanderer/`!mcansee` arm skipped?); or seed0014 D-0708.

## D-0708 — mfndpos cnt 6 vs 5 misread as distfleeck (seed0014)

- **Status:** open (diagnosed; no faithful fix yet)
- **Symptom:** seed0014 @49039 — C `rn2(5)` @ `distfleeck` vs JS `rn2(6)`.
- **C locus:** `monmove.c` `m_move` `!rn2(++chcnt)` after `mfndpos`; next
  mon’s `distfleeck` `rn2(5)`.
- **Cause (partial):** peaceful `PM_GNOME` — JS `mfndpos` returns **6**
  ROOM neighbors; C processes **5** chcnt rolls then `distfleeck`. Not a
  wrong `rn2` arity inside `distfleeck`. Same gnome earlier @48985 at
  `(24,11)` with cnt=8 matched C, then moved to `(23,11)`. At miss:
  poss `(22,10)(23,10)(23,12)(24,10)(24,11)(24,12)`; `u=(24,9)` (travel
  from `(23,8)` @49018); kickedloc cleared; no JS trap/obj/mon/gas on
  neighbors. Probe: hero standing on any of the 6 → cnt=5.
- **Falsified (#787–#788):** distfleeck arity; single-flank corners
  (@3061); squeeze on `(22,10)`; neighbor trap/obj/mon/gas in JS; one-step
  travel landing on a gnome neighbor (impossible from `(23,8)`).
- **#789 sharpen:** C chcnt picks 5th of remaining → dest **(24,12)**
  unless omit is `(24,12)`. Omit ∈ first five; **(22,10)** is the only
  neighbor not already validated by prior matching cnt=8 at `(24,11)`.
  mux=u; kickedloc clear; no JS traps near gnome.
- **Experiment:** drop any one of the 6 → prefix **49039→49300** (does
  not identify which cell C omits).
- **Next:** terrain/trap split at `(22,10)` or C-state capture; or
  seed0108 @2778.

## D-0707 — corpse_chance always-TRUE bigmonst arms (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; next @49039)
- **Symptom:** seed0014 @43553 — after xkilled treasure
  `mkobj`/`next_ident`/`blessorcurse`, C `next_ident`+`rndmonst_adj`
  (make_corpse via mkcorpstat CORPSTAT_INIT) vs JS `rn2(3)`.
- **C locus:** `mon.c` `corpse_chance` —
  `((bigmonst||lizard) && !mcloned) || golem || mplayer || rider || isshk`
  returns TRUE with no RNG; ordinary path is `!rn2(tmp)`.
- **Cause:** JS `corpse_chance` (uhitm/mhitm/trap) omitted always-TRUE
  arms; bigmonst kill fell through to `rn2(3)` and skipped corpse init.
- **Change:** port always-TRUE arms in all three `corpse_chance` copies.
  Vlad/lich dust, swallowed boom, `LEVEL_SPECIFIC_NOCORPSE` deferred.
- **Verification:** green+strict PASS; seed0014 prefix **43553→49039**
  RNG **49495**/59178 Scr **575**/714; cohort 33/33 PASS (all prior
  PASS list incl. seed0002/0004/0007/0012/1500/1800/0398/0373/5006/
  0116/0361/0367).
- **Next:** seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.

## D-0706 — maybe_kick_monster / kick_monster / kickdmg (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; next @43553)
- **Symptom:** seed0014 @43341 — C `gethungry` `rn2(20)` (via
  `overexertion` in `maybe_kick_monster`) vs JS `kick_ouch` `rn2(2)`.
  Screen: C `You kick it.` vs JS `Ouch!`.
- **C locus:** `dokick.c` `maybe_kick_monster` → `attack_checks` /
  `overexertion`; `kick_monster` → evade `rn2` / `kickdmg`.
- **Cause:** JS stubbed all monster kicks to `kick_ouch` (terrain hurt).
- **Change:** port `maybe_kick_monster`, `kick_monster`, `kickdmg`,
  `martial()`; export `attack_checks`/`passive` from `uhitm.js`.
  Poly AT_KICK / `maybe_mnexto` evade / `special_dmgval` / pet abuse
  deferred.
- **Verification:** green+strict PASS; seed0014 prefix **43341→43553**
  RNG **43636**/59178 Scr **575**/714; cohort 13/13 PASS (incl.
  seed0060 kick + seed0002/0004/0007/0012/1500/1800/0398/0373/5006/
  0116/0361/0367). Full suite **35/44** Scr **7638** RNG **507306**.
- **Next:** seed0014 @43553 C `next_ident`/`rndmonst_adj` vs JS
  `rn2(3)` (post-kick object/mon gen).

## D-0705 — lookaround mon_visible + attack_checks Wait invis (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; next @43341)
- **Symptom:** seed0014 @43308 — C `distfleeck` `rn2(5)` vs JS `rn2(2)`
  (`kick_ouch`/`exercise`). Screens: C yank `--More--` then Wait!; JS
  `Unknown command ' '` then kick_ouch.
- **Rejected:** flush_topl_more before every `parse`/`get_count` (broke
  green — C marks NEED_MORE→NON_EMPTY on command nhgetch without More).
- **C locus:** `hack.c` `lookaround` — stop only if `mon_visible(mtmp)`
  (and not M_AP furniture/object); `uhitm.c` `attack_checks` — Wait!
  when `!canspotmon` and no I-glyph (no forcefight).
- **Cause:** JS `lookaround` assumed every mon seen → ended `H` run on
  invisible bugbear before yank `--More--`; space became unbound command.
  Walk-into then melee'd instead of Wait! (short concat; no yank More).
- **Change:** `js/cmd.js` `lookaround` gate on `mon_visible` + M_AP;
  `js/uhitm.js` `attack_checks` Wait! + `map_invisible`/`wakeup`.
  `kick_monster` / peaceful yn / warning glyph / hides_under still deferred.
- **Verification:** green+strict PASS; seed0014 prefix **43308→43341**
  RNG **43371**/59178 Scr **575**/714; cohort 12/12 PASS (incl.
  seed0002/0004/0007/0012/1500/1800/0398/0373/5006/0116/0361/0367).
- **Next:** seed0014 @43341 C `gethungry` @ maybe_kick vs JS `kick_ouch`.

## D-0704 — find_misc bullwhip/invis + use_misc yank (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; next @43308)
- **Symptom:** seed0014 @43068 — C `find_misc` `rn2(5)` vs JS `rn2(28)`.
- **Rejected:** POT_GAIN_LEVEL alone (invent had no gain-level); blaming
  bullwhip `rn2(5)` without following invent/`use_misc`.
- **C locus:** `muse.c` `find_misc` — BULLWHIP `uwep && !rn2(5)` before
  `MON_WEP`/adjacency; later `POT_INVISIBILITY`; `use_misc` MUSE_BULLWHIP
  `rn2(4)` where_to (+ optional twoweap `rn2(2)`).
- **Cause:** JS `find_misc` only had WAN/POT_SPEED. Hostile mon with
  BULLWHIP+POT_INVISIBILITY: C burned whip `rn2(5)=3` (fail), kept
  invis selection, `use_misc` spent the turn. JS skipped both → `m_move`
  `rn2(28)`. Later whip `rn2(5)=0` needed `use_misc` yank `rn2(4)`.
- **Change:** `js/muse.js` — port gain-level/invis/bullwhip in
  `find_misc`; `use_misc` invis + bullwhip disarm (freeinv/place/dropy/
  mpickobj); `mon_set_minvis`; fix MUSE_POT_SPEED=6 / MUSE_BULLWHIP=8.
  Poly trap/wand/potion, bag loot, `you_aggravate` deferred.
- **Verification:** green+strict PASS; seed0014 prefix **43068→43308**
  RNG **43664**/59178 Scr **575**/714; cohort 20/20 PASS.
- **Next:** seed0014 @43308 C `distfleeck` `rn2(5)` vs JS `rn2(2)`.

## D-0703 — mintrap HOLE && !mindless already_seen (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; next @43068)
- **Symptom:** seed0014 @40196 — C `mintrap` `rn2(4)` vs JS `rn2(5)`.
- **Rejected:** JS `rn2(4)` gate missing (already present); blaming rust
  trapeffect first roll.
- **C locus:** `trap.c` `mintrap` — `already_seen = mon_knows_traps(mtmp, tt)
  || (tt == HOLE && !mindless(mptr))` then `already_seen && rn2(4)`.
- **Cause:** gnome stepped on HOLE with `mtrapseen==0`. C treats holes as
  obvious for non-mindless → escape `rn2(4)`. JS only used
  `mon_knows_traps` → skipped gate → next stream call looked like `rn2(5)`.
- **Change:** `js/trap.js` `mintrap` — OR in `HOLE && !mindless(mptr)`.
  Sokoban pit/hole inescapable + floor_trigger/in_air still deferred.
- **Verification:** green+strict PASS; seed0014 prefix **40196→43068**
  RNG **43329**/59178 Scr **575**/714; cohort 12/12 (green +
  seed1500/1800/0004/0007/5006/0398/0373/0116/0361/0367).
- **Next:** seed0014 @43068 C `find_misc` `rn2(5)` vs JS `rn2(28)`.

## D-0702 — travel couldsee-prefer / seenv-detour quiet-rest (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; next @40196)
- **Symptom:** seed0014 @36031 — C `exercise` `rn2(19)` (boulder push STR)
  vs JS `rn2(5)` `distfleeck`. NOTES hypothesized exercise formula; false.
- **Rejected:** `exercise`/`rn2(19)` wrong in JS (already correct); forcing
  couldsee-only BFS alone (broke seed0004/0007 PASS).
- **C locus:** `hack.c` `findtravelpath` / `test_move(TEST_TRAV)` (seen trap +
  known liquid + tight-diag `cant_squeeze_thru`); `cmd.c` `dotravel_target`
  quiet rest when no path (`dx=dy=0`, `ECMD_TIME`).
- **Cause:** `_>` travel to stairs: JS BFS walked west via seenv-only long
  detour (Chebyshev worsen). C has no TEST_TRAV path → rests; next `n`
  pushes boulder → `exercise(A_STR)`. Hero one cell west → no boulder.
- **Change:** `js/cmd.js` — prefer `findtravelpath_travel(couldseeOnly)`;
  seenv-only path taken only if first step does not worsen dist, else
  quiet-rest; `travel_avoids_cell` (seen traps/liquids); tight-diag load
  squeeze. Accurate seenv|couldsee deferred.
- **Verification:** green+strict PASS; seed0014 prefix **36031→40196**
  RNG **40407**/59178 Scr **574**/714; cohort seed0004/0007/1500/1800/
  5006 + green PASS.
- **Next:** seed0014 @40196 C `mintrap` `rn2(4)` vs JS `rn2(5)`.

## D-0701 — mons_see_trap fan-out (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; next @36031)
- **Symptom:** seed0014 @35246 — C `rnd(12)` @ `mdig_tunnel` vs JS
  `rn2(8)` still inside `m_move` chcnt loop.
- **Rejected:** forcing dig burn / can_tunnel without C candidate parity;
  blaming `mdig_tunnel` body (JS already had `rnd(12)`).
- **C locus:** `mondata.c` `mons_see_trap`; callers `trap.c` `dotrap` /
  `mintrap` before `trapeffect_selector`; `mon.c` `mfndpos` skips known
  traps when `!(flag & ALLOW_TRAPS)`.
- **Cause:** JS deferred `mons_see_trap`. After hero triggered rolling
  boulder at (60,10), C peaceful humanoid @59,11 learned the type and
  `mfndpos` skipped that cell (cnt=7→ dig). JS kept cnt=8 → extra
  `rn2(8)` before dig.
- **Change:** `js/trap.js` `mons_see_trap` (lit 7² / unlit dist2≤2;
  skip animal/mindless/!haseyes/!mcansee; `m_cansee`); call from
  `dotrap` + `mintrap`. Also `m_move` shortsighted + unicorn NOTONL
  avoid (same C selection prologue).
- **Verification:** seed0014 prefix **35246→36031** RNG **36178**/59178
  Scr **566**/714; green+strict PASS; cohort (seed1500/1800/0060/0030/
  0009/0398/5006) PASS.
- **Named omission:** steed `mon_learns_traps`; `madeby_u` `rnl`
  setmangry; ALLOW_MDISP displace gate in selection.
- **Lesson:** trap memory is shared state — missing sight fan-out
  changes later `mfndpos` counts even when dig code is correct.
- **Next:** seed0014 @36031 C `exercise` `rn2(19)` vs JS `rn2(5)`.

## D-0700 — ohitmon range==-1 rolling boulder keeps rolling (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; next @35246)
- **Symptom:** seed0014 @36031 — C `exercise` `rn2(19)` (dopush) vs JS
  `rn2(5)` (`distfleeck`). After `_/>/.` travel C stopped (no move) then
  `n` pushed a boulder; JS kept `continue_run`.
- **Cause:** Rolling-boulder trap (60,10) launch 64,10→launch2 56,10.
  Gnome lord trigger: JS `ohitmon` always `return true` after hit, so
  `launch_obj` stopped with boulder on the trap cell (60,10). C
  `ohitmon` after `drop_throw` does `!objgone && range==-1` →
  `obj_extract_self` + `return FALSE` so the boulder keeps rolling to
  56,10. Without that adjacent boulder, JS travel BFS walked onto empty
  56,10 and continued; C findtravelpath fails (tourist cannot TEST_TRAV
  from/through boulder) → nomul → `n` dopush.
- **C locus:** `mthrowu.c` `ohitmon`; `trap.c` `launch_obj`.
- **Change:** `js/mthrowu.js` — after hit `drop_throw`, if `!objgone &&
  range===-1`, `obj_extract_self` and return false.
- **Named omission:** mid-roll landmine/telep/pit/`hits_bars`/
  boulder-chain; `passive_obj` in `drop_throw`; full TEST_TRAV traps.
- **Verification:** green+strict PASS; cohort 16/16 incl. seed0361;
  seed0014 prefix **36031→35246** (correct rest exposes earlier miss).
- **Next:** seed0014 @35246 C `mdig_tunnel` `rnd(12)` vs JS `rn2(8)`.

## D-0699 — setworn(null, W_RINGL|R) clears uleft/uright (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 35611→36031)
- **Symptom:** seed0014 @35611 — C `distfleeck` `rn2(5)` vs JS `rn2(6)`.
  Peaceful hobbit `mfndpos` cnt 6 vs C 5: JS hero off C's square so
  `!ALLOW_U` skip missing. Cursor swap at P/k/r put-on (@582–585).
- **Cause:** nymph `steal` → `setworn(null, W_RINGR)` did not clear
  `u.uright` (JS only cleared when `mask === W_RING` both bits). JS kept
  a stolen right ring; 2nd `doputon` auto-assigned left and treated `r`
  as read, while C asked ring-hand (`r`) then moved. Also ported
  accessory Glib/cursed-gloves/welded gates (named; not the @35611 root).
- **C locus:** `worn.c` `setworn`; `steal.c` `remove_worn_item`;
  `do_wear.c` `accessory_or_armor_on` ring gates.
- **Change:** `js/do_wear.js` — `setworn(null)` clears `W_RINGL`/`W_RINGR`
  independently; ring put-on Glib/gloves/welded gates; `m_avoid_kicked_loc`
  in hostile `m_move` (D-0032 wiring).
- **Named omission:** Adornment steal priority polish; full `gloves_simple_name`
  / `body_part` plines; unicorn NOTONL avoid + ALLOW_MDISP in `m_move`.
- **Verification:** seed0014 prefix **35611→36031**, Scr **538**/714
  (positional RNG **36131**/59178); green+strict PASS; cohort **35**/35.
- **Next:** @36031 C `exercise` `rn2(19)` vs JS `rn2(5)` (`distfleeck`).

## D-0698 — ohitmon kill → mondied / corpse_chance (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 33278→35611)
- **Symptom:** seed0014 @33278 — C `corpse_chance` `rn2(2)` after
  `ohitmon`/`dmgval` vs JS `rn2(5)` (`distfleeck`).
- **Cause:** `ohitmon` kill used `ohitmon_mondead` (fmon remove only) and
  deferred C's `mon_moving`→`mondied` / else `xkilled(XKILL_NOMSG)`.
- **C locus:** `mthrowu.c` `ohitmon`; `mon.c` `mondied` / `corpse_chance`.
- **Change:** `js/mthrowu.js` — kill branch matches C; export `mondied`
  from `mhitm.js` (quiet) + `monkilled` for `mdamagem`; export `xkilled`.
- **Named omission:** poison/silver/acid/egg petrify/can_blnd/setmangry;
  `accessible`/`is_pool` corpse gate; disintegested `monkilled` arms.
- **Verification:** seed0014 prefix **33278→35611**, Scr **538**/714
  (positional RNG **35777**/59178); green+strict PASS; cohort **33**/33.
- **Next:** @35611 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.

## D-0697 — create_monster mines your_race rn2(3) (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 32023→33278)
- **Symptom:** seed0014 @32023 descend — C `create_monster` `rn2(3)` vs JS
  `get_location` `rn2(79)`.
- **Cause:** `splev_create_monster` / `splev_room_monster` omitted C's
  `In_mines && your_race(pm) && (Race_if(DWARF)||Race_if(GNOME)) && rn2(3)`
  clear-pm gate (`sp_lev.c`).
- **C locus:** `sp_lev.c` `create_monster`; `mondata.h` `your_race`.
- **Change:** `js/mklev.js` — `your_race` + `splev_mines_maybe_clear_your_race`
  before humidity/`get_location` in both create paths.
- **Named omission:** hand-rolled fill `create_monster` sites still skip the
  gate; sticky `u.Fumbling` elsewhere unchanged.
- **Verification:** seed0014 prefix **32023→33278**, Scr **533→538**/714
  (positional RNG **33670**/59178); green+strict PASS; cohort **33**/33;
  full suite **35/44** Scr **7604** RNG **497349** (62.73%).
- **Next:** @33278 C `corpse_chance` `rn2(2)` vs JS `rn2(5)`.

## D-0696 — closed-door bump Fumbling() ≡ H||E (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 28552→32023)
- **Symptom:** seed0014 @28552 step ~536 key `j` — C `exercise` `rn2(2)`
  (door bump) vs JS `rn2(19)` (autoopen open-DEX exercise). Screen C
  `"Ouch!  You bump into a door."`
- **Cause:** `cmd.js` closed-door autoopen/`impaired` and orthogonal bump
  tested sticky `u.Fumbling`. C uses `Fumbling` macro (H||E). With fumble
  boots timeout live, C skipped autoopen and bumped (`exercise(A_DEX,FALSE)`);
  JS autoopened (`doopen_indir` → `exercise(A_DEX,TRUE)` → `rn2(19)`).
- **C locus:** `hack.c` `test_move` closed_door autoopen / bump arms.
- **Change:** `js/cmd.js` — use `Fumbling()` for impaired + bump predicates
  (continues D-0691 named omission).
- **Named omission:** sticky `u.Fumbling` still in trap/steed/mthrowu;
  Confusion/`Stunned` macros not fully mirrored in this path.
- **Verification:** seed0014 prefix **28552→32023**, Scr **515→533**/714
  (positional RNG **32170**/59178); green+strict PASS; cohort **33**/33.
- **Next:** @32023 C `create_monster` `rn2(3)` vs JS `rn2(79)` on descend.

## D-0695 — unmul empty nomovemsg ≠ default (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 22868→28552)
- **Symptom:** seed0014 @22868 C `dog_move` `rn2(12)` vs JS `rn2(24)` after
  trip `--More--` @22721 (step ~508): C key `y` +48 RNG; JS stuck in
  `more()` / key desync → pet dmin drift.
- **Cause:** FUMBLING sets `gn.nomovemsg = ""` (`timeout.c`). C `unmul`
  uses pointer NULL-check then `if (*gn.nomovemsg)` — empty string skips
  pline. JS `else if (!game.nomovemsg)` treated `""` as missing and
  substituted `"You can move again."`, forcing an extra `--More--` that
  stole later keys.
- **C locus:** `hack.c` `unmul`; `timeout.c` FUMBLING `nomovemsg = ""`.
- **Change:** `js/hack.js` `unmul` — default only when `nomovemsg == null`;
  pline only when non-empty.
- **Rejected / parked:** any-key topline `more()`; leftover-grid noises
  skip; `more()` keep-toplines grid leave (screen-regressed seed0002/
  seed0030); blind skip-all `noises`.
- **Verification:** seed0014 prefix **22868→28552**, Scr **483→515**/714
  (positional RNG **28682**/59178); green+strict PASS; cohort PASS list
  intact (seed0002/seed0030 stay PASS with unmul-only).
- **Named omission:** C `more()` keep-`gt.toplines` / cury==0 leftover
  `--More--` on tty still imperfect in JS `display.js`.
- **Next:** seed0014 @28552 (step ~536) C `exercise` `rn2(2)` vs JS
  `rn2(19)` after door-bump; or seed0108 wishlist.

## D-0694 — makeplural one_off foot→feet (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix still 22868)
- **Symptom:** seed0014 trip topline JS `"foots"` vs C `"feet"`; @22868 C
  `dog_move` `rn2(12)` vs JS `rn2(24)` looked like mtrack arity.
- **Cause:** `makeplural` lacked C `objnam.c` `one_off[]` (`foot`→`feet`).
  DIAG: @22868 JS pet dmin=6 → mtrack `rn2(MTSZ*(k-j))=rn2(24)` while C
  emits selection `rn2(12)` — geometry/key desync from earlier `--More--`,
  not a wrong `rn2(12)` constant (JS already had `rn2(12)` at that site).
- **C locus:** `objnam.c` `makeplural` / `one_off[]` / `singplur_lookup`
  fox→foxes guard.
- **Change:** `js/objnam.js` — port `one_off` irregulars + fox/`muskox` guard.
- **Rejected:** patching `dog_move` `rn2(12)` (already correct); any-key
  topline `more()` dismiss (moves prefix but breaks 437 zero-RNG More
  rejection steps across sessions).
- **Verification:** seed0014 Scr **482→483**/714; prefix still **22868**;
  green+strict PASS; cohort 7/7 PASS.
- **Named omission:** pronoun genders; already_plural ae/eaux; man→men;
  as_is collective; mongoose/slice edges; full case-preserve polish.
- **Next:** seed0014 @22721 trip `--More--` key ownership (C key `y` +48 RNG
  vs JS stuck More) → dmin/mtrack @22868; or seed0108 wishlist.

## D-0693 — thitmonst pie/egg DEX rnd(25) → hmon cream pie (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 22582→22868)
- **Symptom:** @22582 C `rnd(25)=8` @ `thitmonst(dothrow.c:2258)` vs JS
  `rn2(100)` (breaktest after food-only arm). After D-0692; Scr 481/714.
- **Cause:** `thitmonst_food` rolled `rnd(20)` then only befriend/dogfood.
  C EGG/CREAM_PIE/VENOM arm gates hit on `guaranteed_hit || ACURR(A_DEX) >
  rnd(25)`, then `hmon` cream-pie `can_blnd` → `rn1(25,21)` blind timer.
- **C locus:** `dothrow.c` `thitmonst` pie/egg/venom; `uhitm.c`
  `hmon_hitmon_misc_obj` CREAM_PIE; `mondata.c` `can_blnd`.
- **Change:** `js/dothrow.js` — `thitmonst` DEX gate + `hmon(HMON_THROWN)`.
  `js/uhitm.js` — cream pie / blinding venom arm (`can_blnd` subset,
  `rn1(25,21)`, `obfree`); export `hmon`.
- **Verification:** seed0014 prefix **22582→22868**, Scr **481→482**/714,
  positional RNG **22978**/59178; green+strict PASS; cohort **33**/33.
- **Named omission:** weapon/gem/ball/boulder/`potionhit`; egg petrify /
  acid venom bodies; `can_blnd` Blindfolded/ublindf/visor; splash
  `mbodypart` polish; `throw_gold`.
- **Next:** @22868 C `dog_move` `rn2(12)` vs JS `rn2(24)`.

## D-0692 — nh_timeout FUMBLING slip_or_trip (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 21529→22582)
- **Symptom:** @21529 C `rn2(4)=2` @ `slip_or_trip(timeout.c:1302)` vs JS
  `rn2(100)` (regen_hp). After D-0691 goto_level Fumbling; Scr 467/714.
- **Cause:** `nh_timeout` had WOUNDED_LEGS/CONFUSION only. C FUMBLING
  TIMEOUT expiry calls `slip_or_trip` then `incr_itimeout(HFumbling,rnd(20))`
  when `Fumbling` still true (worn fumble boots E).
- **C locus:** `timeout.c` `nh_timeout` case FUMBLING; `slip_or_trip`.
- **Change:** `js/timeout.js` — FUMBLING TIMEOUT decrement; `slip_or_trip`
  (floor trip / ice|FROMOUTSIDE / on_foot `rn2(4)`); `nomul(-2)`;
  clear FROMOUTSIDE; `incr_itimeout` via `Fumbling()` + sync uprops.
- **Verification:** seed0014 prefix **21529→22582**, Scr **467→481**/714,
  positional RNG **22773**/59178; green+strict PASS; cohort **33**/33;
  full suite **35**/44 (Scr 7547, RNG 486452).
- **Named omission:** Hallu bite highc; corpse petrify; mounted
  dismount_steed; ice hurtle/`rn2(10+DEX)`/confdir; defer_decor;
  other nh_timeout property cases; Levitation/Flying prop helpers.
- **Next:** @22582 C `thitmonst` `rnd(25)` vs JS `rn2(100)`.

## D-0691 — goto_level descend Fumbling() H||E (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 21242→21529)
- **Symptom:** @21242 C `rnd(3)=2` @ `goto_level(do.c:1792)` vs JS
  `rn2(10)` @ `mon_arrive`. After mineralize; Scr 460/714.
- **Cause:** Descend fall arm tested sticky `u.Fumbling`. C
  `Fumbling` ≡ `HFumbling || EFumbling` (youprop.h); Boots_on
  sets HFumbling via `incr_itimeout` (D-0688) without a boolean flag.
- **C locus:** `do.c` `goto_level` descend
  `losehp(Maybe_Half_Phys(rnd(3)))`; `youprop.h` `Fumbling`.
- **Change:** `js/do.js` — import `Fumbling` from `attrib.js`; use
  `Fumbling()` in the encumber|Punished|Fumbling fall predicate.
- **Verification:** seed0014 prefix **21242→21529**, Scr **460→467**/714,
  positional RNG **21632**/59178; green+strict PASS; cohort **33**/33.
- **Named omission:** sticky `u.Fumbling` still used in cmd/trap/steed/
  mthrowu (out of this unit); Punished `drag_down`/`ballrelease`;
  full `selftouch` petrify; trap-door `do_fall_dmg`.
- **Next:** @21529 C `slip_or_trip` `rn2(4)` vs JS `rn2(100)`.

## D-0690 — Water-surrounded vault themerms map (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 19636→21242)
- **Symptom:** @19636 C `lspo_map` `rn2(73)` @ `sp_lev.c:6154` vs JS
  `rn2(100)` (build_room chance). After themerms reservoir
  `rn2(1034..1036)`.
- **Cause:** Reservoir picked Water-surrounded vault. C runs `des.map`
  (6×6 moat; `1+rn2(COLNO-1-wid)`=`rn2(73)`, `rn2(ROWNO-hei)`=`rn2(15)`)
  then contents (region/chests/`obj.new` escape/`des.monster`/
  exclusion). JS had `THEMEROOM_META` row but no `THEMEROOM_MAPS`
  entry → rectangular `create_room` + `rn2(100)`.
- **C locus:** `themerms.lua` Water-surrounded vault; `sp_lev.c`
  `lspo_map`/`lspo_region`/`lspo_exclusion`; `nhlobj.c` `obj.new`→
  `readobjnam`; `nhlib.lua` shuffle/`math.random`.
- **Change:** `js/mklev.js` — map in `THEMEROOM_MAPS`;
  `water_vault_region` (themed irregular filled=0 joined=false);
  contents: shuffle chest spots, `readobjnam` escape item + glass
  unlock, chests, undead `makemon`, teleport `exclusion_zones`.
- **Verification:** seed0014 prefix **19636→21242**, Scr **459→460**/714,
  positional RNG **21611**/59178; green+strict PASS; cohort **35**/35.
- **Named omission:** exclusion_zones save/rest; other complex map
  themerms bodies already deferred.
- **Next:** @21242 C `goto_level` `rnd(3)` vs JS `rn2(10)`.

## D-0689 — exerper Fumbling H||E (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 18494→19636)
- **Symptom:** @18494 C `exercise` `rn2(2)` @ `attrib.c:509` vs JS
  `moveloop_core` wipe-engr `rn2(76)`. Prefix 18494 after hungry/sounds.
- **Cause:** After wearing fumble boots (`setworn` → `uprops[FUMBLING].extrinsic`
  + `Boots_on` `HFumbling` timeout), C `exerper` every-5 status arm calls
  `exercise(A_DEX,FALSE)` when `Fumbling` (`HFumbling||EFumbling`). JS
  checked sticky boolean `u.Fumbling`, never set → skipped `rn2(2)`.
- **C locus:** `youprop.h` `Fumbling`; `attrib.c` `exerper` / `exercise`;
  `do_wear.c` `Boots_on` / `worn.c` `setworn` oc_oprop.
- **Change:** add `Fumbling()` helper (flat H/E + uprops); use in
  `exerper`; sync `Boots_on` timeout into `uprops[FUMBLING].intrinsic`.
  Named omissions: other `u.Fumbling` boolean call sites (cmd/do/trap/…);
  full `nh_timeout` FUMBLING slip_or_trip refresh.
- **Verification:** seed0014 prefix **18494→19636**, Scr **453→459**/714,
  positional RNG **19727**/59178; green+strict PASS; cohort **33**/33.
- **Next:** @19636 C `lspo_map` `rn2(73)` vs JS `rn2(100)`.

## D-0688 — assigninvlet preserve + Boots_on Fumble (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 18426→18494)
- **Symptom:** @18426 C post-`dog_move` `distfleeck` `rn2(5)` vs JS
  `mcalcmove` `rn2(12)`. Early theory “JS skipped `dochug`” falsified.
- **Cause:** At session `W`+`q`, C invent had `q`=fumble boots (after
  nymph steal returned ring as letter `k`). JS `assigninvlet` always
  reassigned from `_lastinvnr`, so returned ring became `q` and boots
  `r`. `Wq` put on the ring (no `nomul`); C dressed boots (`nomul(-2)`
  → `Boots_on` `rnd(20)`). Hero free-moved while C stayed put → dog
  wall geometry → missing `rn2(++chcnt)`. After letter fix, stub
  `Boots_on` lacked Fumble `incr_itimeout(HFumbling, rnd(20))`.
- **C locus:** `invent.c` `assigninvlet` (keep free a-z/A-Z); `do_wear.c`
  `Boots_on` `FUMBLE_BOOTS`.
- **Change:** Preserve existing invlet when free (clear on conflict);
  port Fumble boots `rnd(20)` into `HFumbling` TIMEOUT. Named omissions:
  other `Boots_on` cases (speed/elven/water/lev); `display_used_invlets`;
  full `nh_timeout` Fumbling tick.
- **Verification:** seed0014 prefix **18426→18494**, Scr **445→453**/714;
  green+strict PASS; wear cohort seed0116/seed1800/seed1500 PASS.
- **Next:** @18494 C `exercise` `rn2(2)` vs JS `moveloop` `rn2(76)`.

## D-0687 — domonnoise MS_SEDUCE (#chat nymph, seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 17952→18426)
- **Symptom:** @17952 C `dochug` `rn2(40)` flee-teleport vs JS
  `overexertion`/`gethungry` `rn2(20)`. Looked like missing `mflee`.
- **Cause:** `#chat` + getdir found the water nymph, but `domonnoise`
  treated omitted-table `msound` as silent (`msound===0` → ECMD_OK).
  Chat spent no turn; later `n` became a move/`do_attack` while C
  spent ECMD_TIME and ran movemon (fleeing nymph `rn2(40)`).
- **C locus:** `sounds.c` `domonnoise` `MS_SEDUCE`; `monflag.h`
  `MS_SEDUCE`; `polyself.c` `poly_gender`; `dochat`/`dotalk`.
- **Change:** Infer `S_NYMPH` → `MS_SEDUCE`; port cajoles / comes-on /
  `Hello, sailor.` gender/`rn2(3)` gate; return `ECMD_TIME`. Named
  omissions: `doseduce` non-nymph SYSOPT path; real `verbalize`;
  `is_neuter` poly_gender=2; other MS_*.
- **Verification:** seed0014 prefix **17952→18426**, Scr **435→445**/714,
  positional RNG **18133→19358**/59178; green+strict PASS; cohort
  **35**/35.
- **Next:** @18426 C `distfleeck` `rn2(5)` vs JS `rn2(12)` mcalcmove.

## D-0686 — steal + rloc 50-try (seed0014)


- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 16712→17952)
- **Symptom:** @16712 C `steal` `rn2(21)` vs JS `rn2(3)` after matching
  nymph `mattacku`/`hitmu` `d(0,0)`.
- **Cause:** `mhitm_adtyping_u` zeroed AD_SITM/AD_SEDU; no `steal`. After
  steal, JS `rloc` used ring `collect_coords` instead of C's 50×
  `rnd(COLNO-1)`/`rn2(ROWNO)` + `rloc_pos_ok`.
- **C locus:** `uhitm.c` `mhitm_ad_sedu`; `steal.c` `steal`; `teleport.c`
  `rloc`/`rloc_pos_ok`/`tele_jump_ok`.
- **Change:** Port `steal` (nymph weighted invent + freeinv/mpickobj);
  wire AD_SITM/AD_SEDU → `mhitm_ad_sedu`; rewrite `rloc` to C 50-try +
  unshuffled candy shuffle; export `tele_restrict`. Named omissions:
  monkey cant_take; stealarm afternmv; doseduce/SSEX; shk/priest
  `rloc_pos_ok` room lock; Wizard stair `rloc`.
- **Verification:** seed0014 prefix **16712→17952**, Scr **401→435**/714,
  positional RNG **16726→18133**/59178; green+strict PASS; cohort
  **33**/33.
- **Next:** @17952 C `dochug` `rn2(40)` (flee teleport) vs JS `rn2(20)`.

## D-0685 — dowaternymph (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 16624→16712)
- **Symptom:** @16624 C `collect_coords` `rn2(8)` vs JS `rn2(3)` after
  matching dip `rnd(30)=22`.
- **Cause:** `dipfountain` cases 21–22 stubbed; C case 22 calls
  `dowaternymph` → `makemon(PM_WATER_NYMPH)` → `enexto`/`collect_coords`.
- **C locus:** `fountain.c` `dowaternymph`; callers drink case 28 /
  looted case 27 fallthrough and dip case 22.
- **Change:** Port `dowaternymph` (G_GONE/makemon/Blind plines/
  `msleeping=0`/mintrap); wire dip cases 21–22 (`dowaterdemon`/
  `dowaternymph`) and drink case 27→28. Named omissions: dip uncurse
  17–20 / 26–29; Hallucination soundeffects.
- **Verification:** seed0014 prefix **16624→16712**, Scr **395→401**/714,
  positional RNG **16580→16726**/59178; green+strict PASS; cohort
  **33**/33.
- **Next:** @16712 C `steal` `rn2(21)` after nymph `mattacku`/`hitmu`.

## D-0684 — dogushforth / gush (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 16447→16624)
- **Symptom:** @16447 C `gush` `rn2(7)` vs JS `rn2(3)` after matching
  `dipfountain` `rnd(30)=25`.
- **Cause:** `dipfountain` case 25 (and drink case 30) stubbed
  `dogushforth`; JS fell through to `dryup` `rn2(3)`.
- **C locus:** `fountain.c` `dogushforth`/`gush`; `vision.c`
  `do_clear_area`; `mkroom.c` `nexttodoor`; `trap.c` `delfloortrap`.
- **Change:** Port `dogushforth`/`gush`/`nexttodoor`/`delfloortrap`
  subset in `js/fountain.js`; wire dip case 24→25 fallthrough + case 25
  and drink case 30. Named omissions: `minliquid` body; full
  `set_levltyp` side effects; dip cases 17–22/26–29.
- **Verification:** seed0014 prefix **16447→16624**, Scr **383→395**/714,
  positional RNG **16580→16629**/59178; green+strict PASS; cohort
  **33**/33.
- **Next:** @16624 C `collect_coords` after dip `rnd(30)=22`
  (`dowaternymph`→`makemon`).

## D-0683 — water_damage → erode_obj rust (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 16304→16447)
- **Symptom:** @16304 C `dipfountain` `rn2(2)` vs JS `rnd(30)` when
  dipping a worn orcish helm.
- **Cause:** `water_damage` stubbed the final `erode_obj(ERODE_RUST)`
  arm as `ER_NOTHING`, so `dipfountain` skipped the
  `er != ER_NOTHING && !rn2(2)` gate and fell through to `rnd(30)`.
- **C locus:** `trap.c` `water_damage`/`erode_obj`; `fountain.c`
  `dipfountain`.
- **Change:** `js/trap.js` `water_damage` async →
  `await erode_obj(obj, ostr, ERODE_RUST, EF_NONE)`; await callers
  (`dipfountain`, rust trap, drown chain). Named omissions: grease/
  towel/container/`splash_lit`; invent plines on scroll/book dilute.
- **Verification:** seed0014 prefix **16304→16447**, Scr **365→383**/714,
  positional RNG **16524→16580**/59178; green+strict PASS; cohort
  **35**/35; full suite **35/44** Scr **7451** RNG **480248**.
- **Next:** @16447 C `gush` `rn2(7)` (`dogushforth` case 25).

## D-0682 — zhitm wand-ray damage (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 14566→16304)
- **Symptom:** @14566 C `zhitm` `d(6,6)` vs JS `rn2(10)` after matching
  `dobuzz`/`zap_hit`.
- **Cause:** `dobuzz` only applied `zhitm` for `ZT_SLEEP`; cold/fire/etc
  hits burned no damage RNG, so later monmove `rn2(10)` diverged.
- **C locus:** `zap.c` `zhitm`/`dobuzz`/`destroy_items`/`resist`.
- **Change:** `js/zap.js` full `zhitm` (ZT_MAGIC_MISSILE..ZT_ACID) +
  cold `destroy_items`/`maybe_destroy_item` + wand `resist` alev=12;
  wire kill/`wakeup` in `dobuzz`. Named omissions: `defended`/
  `resists_magm` body; burnarmor/ignite; fire/elec destroy bodies;
  zhitu non-sleep; mon_reflects; death-breath disintegrate.
- **Verification:** seed0014 prefix **14566→16304**, Scr **298→365**/714,
  positional RNG **14628→16524**/59178; green+strict PASS; cohort
  **33**/33.
- **Next:** @16304 C `dipfountain` `rn2(2)` vs JS `rnd(30)`.

## D-0681 — cursed_book + study_book too_hard (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 9354→14566)
- **Symptom:** @9354 C `cursed_book` `rn2(3)` vs JS `rn2(5)` after
  matching `study_book` `rnd(20)`.
- **Cause:** `study_book` too_hard path stubbed `cursed_book`/`nomul`/
  crumble `rn2(3)`; next RNG was unrelated monmove.
- **C locus:** `spell.c` `cursed_book`/`study_book`; `wizard.c` `aggravate`.
- **Change:** `js/spell.js` `cursed_book` (`rn2(oc_level)` cases 0–6) +
  too_hard wire; `js/wizard.js` `aggravate`. Named omissions:
  `confused_book`, `rndcurse` body, `In_W_tower`, `shieldeff`,
  occupation `learn`.
- **Verification:** seed0014 prefix **9354→14566**, Scr **221→298**/714,
  positional RNG **9517→14628**/59178; green+strict PASS; cohort **33**/33.
- **Next:** @14566 C `zhitm` `d(6,6)` vs JS `rn2(10)` (dobuzz/zhitm).

## D-0680 — POT_SICKNESS peffect_sickness (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 6294→9354)
- **Symptom:** @6294 C `exercise` `rn2(19)` (makeknown WIS after quaff)
  vs JS `rn2(5)` (skipped drink → monmove). Screen showed blessed
  sickness “Yecch! … mildly stale slime mold juice.”
- **Cause:** `peffects` omitted `POT_SICKNESS`; default returned 0 so
  `dopotion` never `makeknown`→`discover_object`→`exercise(A_WIS,TRUE)`.
- **C locus:** `potion.c` `peffect_sickness`/`peffects`; `o_init.c`
  `discover_object` credit_hero; `dopotion` makeknown when `!potion_unkn`.
- **Change:** `js/potion.js` `peffect_sickness` + `POT_SICKNESS` gate.
  Blessed path complete; uncursed attr/HP arms included; poisontell
  wording / Fixed_abil / full `make_hallucinated` deferred.
- **Verification:** seed0014 prefix **6294→9354**, Scr **154→221**/714,
  positional RNG **6835→9517**/59178; green+strict PASS; cohort **35**/35.
- **Next:** @9354 C `cursed_book` `rn2(3)` vs JS `rn2(5)` (study_book).

## D-0679 — forcelock + supply-chest fill + SPBOOK non-merge (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 3199→6294)
- **Symptom:** @3199 C `forcelock` `rn2(100)` vs JS `rn2(20)`; after
  occupation wired, @3202 empty-chest `delobj` `rn2(100)` vs contents
  `rn2(3)`; then two SPE_HEALING merged → still one object.
- **Cause (cluster):** (1) `doforce` returned ECMD_TIME without
  `set_occupation(forcelock)` / xlock chance. (2) Oracle-side supply chest
  burned `mksobj`/`mkobj` RNG but never `add_to_container`. (3)
  `oc_merge_of` treated SPBOOK as mergeable; C `SPELL()` BITS mrg=0.
- **C locus:** `lock.c` `doforce`/`forcelock`/`breakchestlock`; `mklev.c`
  supply-chest fill; `objects.h` `SPELL`/`BITS` mrg; `invent.c` `mergable`.
- **Change:** `js/lock.js` forcelock occupation + breakchestlock destroy/
  unlock arms; `js/mklev.js` supply `add_to_container` + SPBOOK level-bias;
  `js/mkobj.js` `oc_merge_of` excludes SPBOOK/WAND.
- **Verification:** seed0014 prefix **3199→6294**, Scr **43→154**/714,
  positional RNG **3660→6835**/59178; green+strict PASS; cohort **33**/33.
- **Next:** @6294 C `exercise` vs JS `rn2(5)`.

## D-0678 — SCR_IDENTIFY `seffect_identify` + invent identify (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 3113→3199)
- **Symptom:** @3113 C `exercise` `rn2(19)` ×2 then `seffect_identify`
  `rn2(5)` vs JS `rn2(5)` on a non-identify path (scroll gated out).
- **Cause:** `doread`/`seffects` omitted `SCR_IDENTIFY`. C runs
  `seffects` WIS exercise → `seffect_identify` (useup, learnscrolltyp
  → `makeknown`/`exercise`, cval `rn2(5)`, `identify_pack`).
- **C locus:** `read.c` `seffect_identify`/`seffects`; `invent.c`
  `identify_pack`/`identify`/`not_fully_identified`; `objnam.c`
  `not_fully_identified`.
- **Change:** `js/read.js` `seffect_identify` + gate; `js/invent.js`
  `not_fully_identified`/`fully_identify_obj`/`identify`/
  `identify_pack`/`menu_identify`.
- **Verification:** seed0014 prefix **3113→3199**, Scr **34→43**/714;
  green+strict PASS; cohort 33/33 (incl. seed0367/0501 read).
- **Next:** @3199 C `forcelock` vs JS other path.
- **Deferred:** SPE_IDENTIFY cast; traditional ggetobj; discover_artifact;
  learn_egg_type; update_inventory.

## D-0677 — chargen `rigid_role_checks` only on menu open (seed0014)

- **Status:** fixed (partial — seed0014 still FAIL; RNG prefix 1→3113)
- **Symptom:** seed0014 first RNG mismatch @1 — C `rn2(2)` gem colors vs
  JS `rn2(1)` `pick_align` after matching `pick_gend`.
- **Cause:** JS called `rigid_role_checks()` at the start of every
  `pick_{race,gend,align}_menu`, including the `n<=1` auto-assign path.
  C only calls it from `plsel_startmenu` when a menu actually opens.
  Valkyrie+dwarf forces lawful with `n==1` → C sets align without
  `pick_align` RNG; JS still ran `pick_align` PICK_RIGID `rn2(1)`.
- **C locus:** `role.c` `plsel_startmenu` / `genl_player_setup` align
  branch (`if (n > 1)` only).
- **Change:** `js/player_selection.js` — count first; `n<=1` return
  without rigid; `n>1` → `rigid_role_checks()` then build menu.
- **Verification:** seed0014 RNG prefix **1→3113**, Scr **10→34**/714;
  green+strict PASS; cohort 12/12 (incl. seed0077 chargen, seed0367).
- **Next:** @3113 C `exercise` vs JS identify path.

## D-0676 — ^X attributes Fire/Shock/ESP/Warning + weapon_descr (seed0367 @318)

- **Status:** fixed — seed0367 **PASS**
- **Symptom:** @318 attributes `(1 of 3)` vs JS `(1 of 2)`; page-2 body
  C spellbook / fire·shock·ESP·Warning lines vs JS weapon + short attrs.
- **Cause:** (1) `weapon_descr` P_NONE returned skill `"weapon"` instead of
  C `def_oc_syms[oclass].name` (`"spellbook"`). (2) Missing
  `attributes_enlightenment` arms: Fire_resistance, Shock_resistance,
  `item_resistance_message(AD_ELEC)`, Blind_telepat, Warning — so page
  count stayed 2. (3) `from_what(FAST)` skipped C `Very_fast` arm →
  `what_gives` named blue DSM instead of `"worn equipment"`.
- **C locus:** `weapon.c` `weapon_descr`; `insight.c`
  `attributes_enlightenment` / `item_resistance_message`; `zap.c`
  `u_adtyp_resistance_obj` / `item_what`; `attrib.c` `from_what` FAST.
- **Change:** `js/invent.js` oclass `weapon_descr`, Fire/Shock/
  item_res/Telepat/Warning in `doattributes`; `js/attrib.js`
  `from_what` FAST+Very_fast + `PROP_HFIELD` FIRE_RES/WARNING.
- **Verification:** seed0367 **PASS** RNG/Scr **50125/50125**,
  **324/324**; green+strict PASS; cohort 10/10 (incl. seed0361/
  0116/0373/0007).
- **Deferred:** Cold/Sleep/Disint/Acid/… resists; other item_resistance;
  See_invisible/Warn_of_mon/Clairvoyant; known speed-boots name.

## D-0675 — clear_regions on mklev / goto_level (seed0367 @297)

- **Status:** fixed (partial — Scr 322/324; next @318 attributes pages)
- **Symptom:** @297 Home 1 materialize — tty(22,15)=game **(23,14)**
  C DEC `x` vs JS blank. TRWALL lit, viz=0; row14 rmax=22.
  Neighbors VWALL viz=3. Misdiagnosed as `right_side` finger.
- **Cause:** D-0674 made gas opaque, but JS never called C
  `clear_regions()` from `clear_level_structures`. Fog vapor from a
  prior level stayed in `game.regions` at (22,13) and blocked
  Bresenham `q4_path` to the west-face TRWALL. C screen shows terrain
  `~` there, not a live cloud.
- **C locus:** `region.c` `clear_regions`; `mklev.c`
  `clear_level_structures`; `save.c`/`restore.c` save/rest_regions;
  `do.c` `goto_level`.
- **Change:** `js/region.js` `clear_regions`; `mklev.js`
  `clear_level_structures` call; `do.js` stash `regions` on leave +
  restore on getlev + detach before mklev/getlev.
- **Verification:** seed0367 prefix **297→318**, Scr **314→322**/324,
  RNG FULL; green+strict PASS; cohort **32**/32.
- **Next:** @318 attributes `1 of 3` vs JS `1 of 2` (enlightenment).

## D-0674 — gas-cloud does_block + run_regions (seed0367 @283)

- **Status:** fixed (partial — Scr 314/324; next @297 → D-0675)
- **Symptom:** @283 Pri-loca return — 26 lit mines `·` vs C blank NW of
  temple SW corner. Misdiagnosed as Algorithm-C `left_side`.
- **Cause:** fog `create_gas_cloud` at (22,13) on Bresenham path; C
  `does_block`/`add_region`→`block_point` opaque; JS `_blocks` omitted
  `visible_region_at` and never rebuilt `viz_clear` after create/expire.
- **C locus:** `vision.c` `does_block`; `region.c` `add_region`/
  `run_regions`/`expire_gas_cloud`; `allmain.c` after `nh_timeout`.
- **Change:** `js/vision.js` `_blocks` → `visible_region_at`;
  `js/region.js` `recalc_block_point` on create/remove + `run_regions`
  ttl; `js/allmain.js` call after `nh_timeout`. Named omissions:
  inside_f damage, dissipation plines, incremental `fill_point`.
- **Verification:** seed0367 prefix **283→297**, Scr **315→314**, RNG
  FULL; green+strict PASS; cohort **32**/32.
- **Next:** @297 (23,14) wall → D-0675.

## D-0673 — tower1 map lit=FALSE clear (seed0367 @278)

- **Status:** fixed (partial — Scr 315/324; next peel @283 materialize More)
- **Symptom:** @278 Vlad's Tower materialize — C blank vs JS temple
  `─┐·│─┘` (6 cells beyond night-vision).
- **Cause:** C `lspo_map` defaults `lit=FALSE` → `set_levltyp_lit` clears
  solidfill BOOL_RANDOM lit on every map cell. JS `sel_set_ter(...,false)`
  is still nochange (D-0668 envelope), so when solidfill `rn2(2)` lit the
  level, tower rooms stayed lit and vision painted past `nv_range=1`.
- **C locus:** `sp_lev.c` `lspo_map` (`lit` default FALSE); `dat/tower1.lua`;
  `mkmaze.c` `set_levltyp_lit`.
- **Change:** `js/mklev.js` `load_tower1` — after map apply, clear `.lit`
  on map cells (lava stays lit). Same envelope as Pri-loca D-0668 /
  fire D-0569. tower2/3 deferred; do not globalize `sel_set_ter(false)`.
- **Verification:** seed0367 Scr **312→315**/324, prefix **278→283**, RNG
  FULL; green+strict PASS; cohort **34**/34.
- **Next:** @283 materialize More — C blank vs JS `·` (26 cells).

## D-0672 — moveloop once-per-input `see_monsters` (seed0367 @262)

- **Status:** fixed (partial — Scr 312/324; @278 → D-0673)
- **Symptom:** @262 C Warning digits / physical `W` vs JS stale floats (W where
  warn digit, digits where blank, missing warns).
- **Cause:** C `allmain.c` once-per-player-input calls `see_monsters()` when
  `Unblind_telepat || Warning` (and `!context.mv || Blind`) so Warning/ESP
  glyphs refresh as `mdistu` changes. JS only called `see_monsters` from
  `teleds`/`docrt`, leaving stale gbuf floats after ordinary steps.
- **C locus:** `allmain.c` moveloop_core once-per-input block (~454–469);
  `display.c` `see_monsters`.
- **Change:** `js/allmain.js` — after `find_ac`, call `see_monsters()` when
  `!context.mv || Blind` and `ETelepat`/`HWarning`. Hallu / Warn_of_mon /
  `any_visible_region` deferred.
- **Verification:** seed0367 Scr **308→312**/324, prefix **262→278**, RNG
  FULL; green+strict PASS; cohort **34**/34.
- **Next:** @278 materialize — C blank vs JS temple wall fragments (6 cells).

## D-0671 — intemple intone `canseemon` (seed0367 @258)

- **Status:** fixed (partial — Scr 308/324; next peel @262 Warning floats)
- **Symptom:** @258 C `A nearby voice intones:` vs JS `The priest intones:`.
- **Cause:** JS used `canspotmon(priest)` for the intone subject; C
  `priest.c` `intemple` uses `canseemon(priest)`. After D-0669 ESP,
  `sensemon` made `canspotmon` true while the priest was not seen →
  `Monnam` instead of `"A nearby voice"`. Ghost spawn still correctly
  uses `canspotmon`.
- **C locus:** `priest.c` `intemple` (`canseemon` ? `Monnam` : `"A nearby voice"`);
  `display.h` `canspotmon` = `canseemon || sensemon`.
- **Change:** `js/priest.js` intone branch → `canseemon`.
- **Verification:** seed0367 Scr **305→308**/324, prefix **258→262**,
  RNG FULL; green+strict PASS; cohort **34**/34.
- **Next:** @262 Warning/`W` cell positions vs warn digits.

## D-0670 — Pri goal texts + Pri-goal lava lit + quest_portal pline (seed0367 @209)

- **Status:** fixed (partial — Scr 305/324; next peel @258 intemple voice → D-0671)
- **Symptom:** @209 C `You materialize…!--More--` + lava `` ` `` + goal
  brimstone NHW_TEXT; JS materialize without More (space → Unknown
  command), 42 unlit lava blanks, missing `goal_first`.
- **Cause (cluster):** (1) `QUEST_GOAL_FIRST`/`NEXTTIME`/`OTHERTIME`
  lacked Pri → `qt_pager` burned nhl only, no `flush_topl_more`
  (≡ D-0662). (2) `load_pri_goal` `des.region(…,"unlit")` forced
  `lit=false` on lava; C `light_region` keeps `IS_LAVA` lit.
  (3) `com_pager(quest_portal)` used newline→NHW_TEXT; C
  `output="pline"` → `deliver_by_pline` line-at-a-time.
- **C locus:** `dat/quest.lua` Pri `goal_*`/`nexttime`; `quest.c`
  `on_goal`/`on_start`; `questpgr.c` `deliver_by_pline`; `sp_lev.c`
  `light_region`; `dat/Pri-goal.lua`.
- **Change:** `js/questpgr.js` Pri goal/nexttime/othertime +
  `deliver_by_pline` for `quest_portal`; `js/mklev.js` `load_pri_goal`
  uses `light_region(..., false)`.
- **Verification:** seed0367 Scr **291→305**/324, prefix **209→258**,
  RNG FULL; green+strict PASS; cohort **32**/32.
- **Next:** @258 intemple `A nearby voice` vs JS `The priest`
  (`canspotmon` / Monnam).

## D-0669 — tp_sensemon / Unblind_telepat (seed0367 @203)

- **Status:** fixed (partial — Scr 291/324; next peel @209)
- **Symptom:** after D-0668 dark morgue, @203 C showed physical `W`/`&` and
  blank ghost glyphs mixed with Warning digits; JS showed warn digits only
  (27 cells).
- **Cause:** hero wears amulet of ESP (`ETelepat`). C `tp_sensemon` shows
  non-mindless monsters as physical glyphs out of sight; mindless zombies
  stay on Warning digits. Ghost `S_GHOST` mlet is `' '` (blank). JS
  `sensemon`/`newsym` omitted telepathy.
- **C locus:** `display.h` `_tp_sensemon` / `_sensemon`; `worn.c`
  `recalc_telepat_range`; `youprop.h` Unblind_telepat.
- **Change:** `js/display.js` `tp_sensemon` + `sensemon` + `newsym` !cansee
  sense path; `js/do_wear.js` `recalc_telepat_range` + `ETelepat` mirror;
  `u_init` `unblind_telepat_range=-1`. MATCH_WARN_OF_MON deferred.
- **Verification:** seed0367 Scr **267→291**/324, prefix **203→209**, RNG
  FULL; green+strict PASS; cohort **32**/32 (incl. seed0009).
- **Next:** @209 lava `` ` `` / map cells after materialize More.

## D-0668 — Pri-loca map lit=FALSE after mines lit-field (seed0367 @203)

- **Status:** fixed (partial — Scr still 267/324; 27 cells W/& vs warn)
- **Symptom:** @203 `You materialize on a different level!` — JS showed
  live `Z`/`&`/`W` + remembered walls where C had Warning digits + darkroom
  `~` (Pri-loca morgue).
- **Cause:** `des.level_init` mines `lit=1` open field; C `lspo_map` defaults
  `lit=FALSE` → `set_levltyp_lit` clears map cells. JS `sel_set_ter(...,false)`
  was nochange, so morgue stayed lit → full IN_SIGHT → live mon glyphs.
- **C locus:** `dat/Pri-loca.lua`; `sp_lev.c` `lspo_map` lit default;
  `mkmaze.c` `set_levltyp_lit`.
- **Change:** `load_pri_loca` clears `SpLev_Map` cell `.lit` after map apply
  (lava stays lit). Global `sel_set_ter(false)`≡C deferred — regresses
  seed0009. Temple `flood_fill_rm` still re-lights.
- **Verification:** @203 residual 27 cells (C `W`/`&` vs JS warn digits);
  green+strict PASS; cohort **33**/34 (0367 only fail). RNG FULL.
- **Next:** why C paints physical `W`/`&` on those dark cells (nv_range /
  TEMP_LIT / sensing) while JS only `mon_warning`.

## D-0667 — see_monsters after teleds (seed0367 @185 warn)

- **Status:** fixed (partial — screen residual Scr 267/324 @203)
- **Symptom:** after D-0666, @185 still missed one cell — JS red
  warn `1` at (68,19) vs C blank (materialize `--More--`).
- **Cause:** `display_warning` floats in gbuf only; `teleds` moved
  hero out of `mdistu<100` but never refreshed mon cells, so the
  warn glyph stayed. C calls `see_monsters()` before `vision_recalc`.
- **C locus:** `teleport.c` `teleds` → `see_monsters`; `display.c`
  `see_monsters` / `docrt_flags` overlay.
- **Change:** `js/display.js` `see_monsters`; call from `teleds` and
  `docrt`. Worm/`Sting`/`Warn_of_mon` deferred.
- **Verification:** seed0367 Scr **258→267**/324, prefix
  **185→203**, RNG FULL; green+strict PASS; cohort **32**/32.
- **Next:** @203 `You materialize on a different level!` map.

## D-0666 — altar_color via altarmask (seed0367 @185)

- **Status:** fixed (partial — residual warn then D-0667)
- **Symptom:** seed0367 @185 materialize map — C altar `{` CLR_RED
  vs JS `{` NO_COLOR. (`decgfx` also differed but `diffCell` ignores
  it for `{` — not in DEC_MAP.)
- **Cause:** `terrain_glyph` ALTAR always used defsym CLR_GRAY
  (tty → NO_COLOR); C `back_to_glyph` → `altar_to_glyph(altarmask)`
  + `altar_color` (unaligned = CLR_RED; no USE_GENERAL_ALTAR_COLORS).
- **C locus:** `display.c` `back_to_glyph` ALTAR; `display.h`
  `altar_to_glyph` / `altar_colors`; `display.c` `altar_color`.
- **Change:** `js/display.js` `altar_glyph_color` + ALTAR case.
  Sanctum/aligned gray paths unchanged for existing PASS altars.
- **Verification:** seed0367 Scr **245→258**/324 (altar cell matched);
  green+strict PASS; cohort with D-0667.
- **Next:** stale warn @185 → D-0667.

## D-0665 — getpos lookat TREE defsym (seed0367 @155)

- **Status:** fixed (partial — screen residual Scr 245/324 @185)
- **Symptom:** seed0367 getpos farlook @155 — C `tree` vs JS
  `unexplored area`. Cell had TREE typ + DEC `disp_ch='g'`; blank
  `disp_ch`/Warning hypothesis falsified.
- **Cause:** `cmap_defsym_explanation` covered ROOM/CORR/wall/STONE/
  waterbodies only; TREE fell through to `"unexplored area"`.
- **C locus:** `pager.c` `lookat` cmap default →
  `defsyms[S_tree].explanation` (`defsym.h` `"tree"`);
  `getpos.c` `auto_describe`.
- **Change:** `js/getpos.js` + `js/pager.js` lookat cmap — TREE →
  `"tree"`. Iron bars/fountain/altar/ndoor/cloud still deferred.
- **Verification:** seed0367 Scr **244→245**/324, prefix
  **155→185**, RNG FULL; green+strict PASS; cohort **34**/34.
- **Next:** @185 altar DEC `{` color/decgfx (C color1 vs JS NO_COLOR).

## D-0664 — self_lookat pmname / Ugender (seed0367 @154 farlook)

- **Status:** fixed (partial — screen residual Scr 244/324 @155)
- **Symptom:** seed0367 getpos farlook @154 — C
  `human priestess called wizard` vs JS
  `human priest called wizard`.
- **Cause:** JS `self_lookat` / `self_lookat_brief` always used
  male `urole.name.m` ("Priest"→priest); C uses
  `pmname(&mons[u.umonnum], Ugender)`.
- **C locus:** `pager.c` `self_lookat`; `you.h` `Ugender`;
  `do_name.c` / `mondata.h` `pmname`.
- **Change:** export `pmname`/`Ugender` from `js/do_name.js`;
  `js/pager.js` + `js/getpos.js` self_lookat paths; `!Upolyd`
  race-adj prefix. Steed/mhidden/Punished/utrap deferred.
- **Verification:** seed0367 Scr **243→244**/324, prefix
  **154→155**, RNG FULL; green+strict PASS; cohort **34**/34
  (prior green/priest/quest PASS set).
- **Next:** @155 C `tree` vs JS `unexplored area` (disp_ch /
  remembered TREE glyph under Warning path).

## D-0663 — mon_warning / display_warning (seed0367 @148 map)

- **Status:** fixed (partial — screen residual Scr 243/324 @154)
- **Symptom:** after D-0662, seed0367 screen 148 matched
  materialize/`--More--`/topline but failed one cell: C red `1`
  (warning) vs JS blank at zombie (68,19).
- **Cause:** Priest `HWarning` (role @15) + hostile nearby
  undead; JS `newsym` never called `display_warning`;
  `context.warnlevel` unset (C `newgame` sets 1).
- **C locus:** `display.h` `_mon_warning`; `display.c`
  `warning_of`/`display_warning`; `allmain.c` `newgame`
  `warnlevel=1`.
- **Change:** `js/display.js` — `mon_warning`/`warning_of`/
  `display_warning` + `newsym` cansee/`!cansee` arms;
  `js/allmain.js` — `context.warnlevel=1`. Hallu/
  `MATCH_WARN_OF_MON` deferred.
- **Verification:** seed0367 Scr **206→243**/324, prefix
  **148→154**, RNG FULL; green+strict PASS; cohort **32/32**.
- **Next:** @154 farlook `priestess` vs `priest`; @155
  `tree` vs `unexplored area`.

## D-0662 — Pri QUEST_FIRSTTIME missing (seed0367 @148 More)

- **Status:** fixed (partial — warning cell then D-0663)
- **Symptom:** seed0367 screen 148 — C
  `You materialize…!--More--` then Pri firsttime NHW_TEXT;
  JS materialize without `--More--` / missed quest text
  (space → `Unknown command`).
- **Cause:** `QUEST_FIRSTTIME` had Arc+Bar only; Pri
  `qt_pager('firsttime')` returned after nhl shuffle with
  no `flush_topl_more`, so materialize NEED_MORE never
  owned the next key (same pattern as D-0625 Arc).
- **C locus:** `dat/quest.lua` Pri `firsttime`; `quest.c`
  `on_start` → `qt_pager`; `do.c` `goto_level`
  `maybe_lvltport_feedback` + onquest.
- **Change:** `js/questpgr.js` — add Pri `QUEST_FIRSTTIME`
  from `quest.lua` (`%H`/`%l`). Other-role firsttime bodies
  still deferred.
- **Verification:** seed0367 firsttime screen 149 matches;
  Scr **205→206** before D-0663; green+strict PASS.
- **Next:** D-0663 warning glyph at same screen.

## D-0661 — doname W_WEP `(wielded)` vs hand phrasing (seed0367 @76)

- **Status:** fixed (partial — screen residual Scr 205/324)
- **Symptom:** seed0367 screen prefix @76 — C
  `d - 4 potions of holy water (wielded).…` vs JS without
  `(wielded)`; @138 C spellbook `(wielded)` vs JS
  `(weapon in right hand)`.
- **Cause:** JS `doname` only appended W_WEP hand phrasing when
  `quan===1`, and never took C’s alternate `(wielded)` arm for
  stacks / ammo / missiles / non-weptools.
- **C locus:** `objnam.c` `doname_base` W_WEP block
  (`quan!=1 || (WEAPON? ammo|missile : !is_weptool)` →
  `(wielded)`).
- **Change:** `js/objnam.js` — port that predicate +
  `is_missile_obj`; keep bimanual / twoweap hand strings.
- **Verification:** seed0367 Scr **202→205**/324, prefix **76→148**,
  RNG FULL; green+strict PASS; cohort **32/32** prior-PASS.
- **Named omission:** `mrg_to_wielded`; AKLYS `tethered to`;
  warn_obj / artifact_light closing-paren rewrite.
- **Next:** seed0367 @148 — C `You materialize…!--More--` vs JS
  no More (quest `on_start` text keys stolen → `Unknown command`).

## D-0660 — check_special_room MORGUE enter → More owns ^V (seed0367 @38566)

- **Status:** fixed (partial — screen residual Scr 202/324)
- **Symptom:** seed0367 @38566 — C `getbones` `rn2(3)` vs JS
  `getlev` `rnd(10)`. DIAG: JS `^V2` level-tele to Quest Home 2
  while C still on Pri-loca Temple `--More--`, then `^V4` mklev.
- **Cause:** `check_special_room` only handled TEMPLE/`intemple`;
  MORGUE “uncanny feeling…” pline was deferred, so locate_next
  NEED_MORE never forced `more()` before the next command. Session
  keys `^V`/`2`/`\n` (meant for More) ran `level_tele`→getlev.
- **C locus:** `hack.c` `check_special_room` MORGUE/ZOO/SWAMP/… +
  rtype→OROOM wake loop; callers `do.c` `goto_level`.
- **Change:** `js/hack.js` — port special-room entrance plines +
  rtype clear / has_* / wake `!Stealth && !rn2(3)` (wake_msg text
  deferred).
- **Verification:** seed0367 rng-diff **FULL 50125**; runner RNG
  **50125**/50125 Scr **180→202**/324; green+strict PASS; cohort
  **34/34** prior-PASS.
- **Named omission:** furniture_present throne; BARRACKS
  monstinroom abandoned arm; DELPHI oracle; room_discovered;
  wake_msg canseemon; ACH_TOWN.
- **Next:** seed0367 screen peel (Scr 202/324; cursors 312/324).

## D-0659 — vamp decide_to_shapeshift arms (seed0367 @35546)

- **Status:** fixed (partial — next @38566 getbones)
- **Symptom:** seed0367 @35546 — C `rn2(4)` @ `decide_to_shapeshift`
  (fog-form vamp) vs JS `rn2(12)` @ `mcalcmove`.
- **Cause:** JS `decide_to_shapeshift` only handled regular cham
  (`!rn2(6)`); vampshifter arms (low-hp revert `rn2(4)`, fog
  `!rn2(4)` + `pickvampshape`, vamp-form `!rn2(6)`) were deferred,
  so fog vampshifters burned no RNG before metabolism.
- **C locus:** `mon.c` `decide_to_shapeshift` / `pickvampshape`;
  caller `m_calcdistress`.
- **Change:** `js/mon.js` — port vamp arms (STRAT_WAITFORU gate,
  low-hp / fog / vamp-form, amorphous door `enexto`/`rloc_to`,
  gender restore); export `pickvampshape` from `js/makemon.js`.
- **Verification:** seed0367 prefix **35546→38566** (runner RNG
  **35910→38592**/50125, Scr **171→180**/324); green+strict PASS;
  cohort **34/34** prior-PASS.
- **Named omission:** Vlad `mon_has_special` stay in `pickvampshape`;
  `canseemon` worm_known; `mmove==0` `minliquid` in `m_calcdistress`.
- **Next:** seed0367 @38566 C `getbones` `rn2(3)` vs JS `rnd(10)`.

## D-0658 — Pri-loca link_doors_rooms + eastern hx=39 (seed0367 @35535)

- **Status:** fixed (partial — next @35546 decide_to_shapeshift)
- **Symptom:** seed0367 @35535 — C put_lregion retries after `(59,14)`
  m_at; JS accepted empty cell (D-0657).
- **Cause:** D-0645 clipped eastern morgue `hx` to 35 (no mon at
  abs 59). Restoring lua `hx=39` alone or with naive `add_doors_to_room`
  burned wrong fill RNG (@15167/@14403). C `load_special` runs
  `link_doors_rooms` before wallify so `fill_zoo` door-edge skips
  match; rectangular C `fill_zoo` has **no** roomno gate — D-0643’s
  gate under-filled once doors skipped edges.
- **C locus:** `sp_lev.c` `link_doors_rooms`/`maybe_add_door`/
  `shared_with_room`/`set_door_orientation`; `mkroom.c` `fill_zoo`
  rectangular door-edge; `dat/Pri-loca.lua` `region={31,00,39,13}`.
- **Change:** `js/mklev.js` — port `link_doors_rooms` (+ helpers);
  call before wallify in `load_pri_loca`; eastern `priAddRectRoom`
  `x2=39`; remove rectangular `roomno` gate from `fill_zoo`.
- **Verification:** seed0367 prefix **35535→35546** (runner RNG
  **35572→35910**/50125, Scr **175→171**/324); green+strict PASS;
  cohort **32/32** prior-PASS.
- **Named omission:** mid-region `add_doors_to_room` (map `+` linked
  at finalize only); BEEHIVE/BARRACKS/ANTHOLE fill arms; @35546
  `decide_to_shapeshift` vs JS `rn2(12)`.
- **Next:** seed0367 @35546 C `decide_to_shapeshift` `rn2(4)`.

## D-0657 — C put_lregion (59,14) rejects via m_at (seed0367 @35535)

- **Status:** fixed (via D-0658)
- **Symptom:** seed0367 first mismatch @35535 — C retries `place_lregion`
  after `(59,14)`; JS accepts → nhlib shuffle (no intemple).
- **Cause (proved):** C TEMP DIAG on recorder `put_lregion_here`:
  `typ=ROOM`, `bad=0`, `excl=0`, `occ=0`, `trap=-1`, but **`mon=243`
  (PM_ELF_ZOMBIE)** → TELE `m_at` reject when `!oneshot`. JS: no mon at
  `(59,14)` (D-0645 eastern hx=35 left cols 36–39 unstocked).
  C `room[3]` = `(52,5)-(60,18)` (lua `x2=39`); door-adjacency skips
  col 52; stocks cols 53–60 (112 mons, 14/col). D-0645’s “C fills only
  31–35” reading was wrong for final state.
- **Falsified:** typ/occupied/exclusion reject; invent put_lregion reject;
  hx=39 alone (regresses @15167); naive `add_doors_to_room` / incomplete
  `link_doors_rooms` (regresses @14403 into rndmonst).
- **C locus:** `mkmaze.c` `put_lregion_here` TELE `m_at`; `mkroom.c`
  `fill_zoo` door-adjacent skip; `sp_lev.c` `link_doors_rooms`;
  `dat/Pri-loca.lua` eastern morgue `region={31,00,39,13}`.
- **Change:** comment-only on `load_pri_loca` (hx stays 35 until door+fill
  parity); docs. No production control-flow change this iteration.
- **Verification:** seed0367 still @35535 (RNG 35572 Scr 175); green+
  strict PASS. C re-record RNG byte-equal to canonical.
- **Named omission:** `link_doors_rooms`/`maybe_add_door` on Pri-loca;
  restore lua hx=39 with fill count matching C @15167.
- **Next:** port C `link_doors_rooms` for Pri-loca + eastern hx=39 so
  `(59,14)` has m_at; re-check @15167 then @35535 intemple path.

## D-0656 — getlev restore updest/dndest (seed0367 plumbing)

- **Status:** fixed (partial — @35535 put_lregion reject still open)
- **Symptom:** seed0367 still first mismatch @35535 after D-0655; also
  in-memory getlev never restored `updest`/`dndest` (C `Sfi_dest_area`).
- **Cause (plumbing):** `goto_level` memset dest areas then mklev/getlev;
  C `savelev`/`getlev` persist them; JS stash omitted both so tele
  regions from specials were lost on revisit (Pri-loca has none — zeros).
- **Diagnosis @35535 (not fixed):** after matched getlev `rnd(10)`×284 +
  first `place_lregion` try `rn2(79)=58`/`rn2(21)=14` → `(59,14)`, C
  `put_lregion_here` rejects and retries (`rn2(79)=34`/`rn2(21)=14` →
  `(35,14)` in temple → `onquest` shuffle → `intemple`). JS accepts
  `(59,14)` (ROOM, no mon/trap/excl) → shuffle without intemple.
  Falsified: extra place_lregion call; non-zero dndest bounds; excl
  zones; east-morgue x2=39 fill (regresses D-0645 @15167).
- **C locus:** `save.c`/`restore.c` dest_area; `mkmaze.c`
  `put_lregion_here`/`bad_location`; `dungeon.c` `u_on_rndspot`.
- **Change:** `js/do.js` stash/restore `updest`/`dndest` on leave/getlev.
- **Verification:** seed0367 still @35535 (RNG 35572 Scr 175); green+
  strict PASS; cohort 11/11 (incl. restore/quest PASS seeds).
- **Named omission:** why C rejects `(59,14)` (typ/occupied/m_at);
  exclusion_zones save/rest; `switch_terrain` after `u_on_rndspot`.
- **Next:** dump C cell state at `(59,14)` on Pri-loca getlev return
  (or match typ/occupied to C); then intemple path.

## D-0655 — Pri-fila/filb load_special + morgue roomtype (seed0367 @33068)

- **Status:** fixed (partial — next @35535 Home 3 place_lregion)
- **Symptom:** seed0367 first mismatch @33068 — C nhlib `shuffle`
  after matched `getbones` (wizard ^V Home 1→Home 2) vs JS `rn2(79)`
  `place_lregion` on empty level.
- **Cause:** `makelevel` In_quest correctly requested `Pri-fila`, but
  `load_special_proto` had no loader; makemaz miss left stone →
  `place_lregion`. C loads `Pri-fila.lua` (ordinary + morgue
  `des.room` + `des.random_corridors`). Also needed `splev_roomtype`
  `"morgue"`→`MORGUE` (fill_zoo via makelevel tail).
- **C locus:** `dat/Pri-fila.lua` / `Pri-filb.lua`; `sp_lev.c`
  `lspo_room`/`build_room`/`room_types`; `mklev.c` In_quest `*-fil{a,b}`.
- **Change:** `js/mklev.js` — `load_pri_fila`/`load_pri_filb` via
  `splev_des_room`; `splev_roomtype` morgue; dispatch in
  `load_special_proto`.
- **Verification:** seed0367 prefix **33068→35535** (runner RNG
  **35572**/50125, Scr **175**/324); green+strict PASS; cohort
  **34/34** prior-PASS.
- **Named omission:** other-role *-fila/*-filb room scripts;
  failed-room / ensure_way_out fidelity.
- **Next:** seed0367 @35535 — C `put_lregion_here` rejects `(59,14)`
  (see D-0656 diagnosis).

## D-0654 — medusa empty-statue resists_ston + mresists extract (seed0367 @27126)

- **Status:** fixed (partial — next @33068 after getbones)
- **Symptom:** seed0367 first mismatch @27126 — C `rndmonst_adj` `rn2(3)`
  vs JS `get_location_random` `rn2(75)` after matched vortex invent/saddle.
- **Cause:** JS Medusa empty-statue fill accepted the first `makemon` from
  `mksobj` corpsenm. C `create_object` rejects `resists_ston(was)` /
  `poly_when_stoned` and retries with `rndmonnum()` (then `propagate` on
  accept). `mresists` was not extracted, so the gate could not run.
- **C locus:** `sp_lev.c` `create_object` Medusa statue arm; `monst.h`
  `resists_ston` / `mon_resistancebits`; `mondata.c` `poly_when_stoned` /
  `Resists_Elem`; `makemon.c` `propagate`.
- **Change:** extract `mresists` via `extract-monsters.py`;
  `pm_resistance` / `resists_ston` / `poly_when_stoned`; Medusa loop
  reject+retry + `propagate` tally on accept.
- **Verification:** seed0367 prefix **27126→33068** (runner RNG
  **33076**/50125, Scr **170**/324); green+strict PASS; cohort **32/32**
  prior-PASS sample.
- **Named omission:** worn/artifact STONE_RES in `Resists_Elem`; full
  `mongone` invent teardown; makemon-path `propagate` on ordinary births;
  medusa-2/3/4.
- **Next:** seed0367 @33068 C nhlib `shuffle` after matched `getbones`
  vs JS `rn2(79)` (likely missing special / place_lregion).

## D-0653 — goodpos pool/lava swimmer·flyer (seed0367 @27121)

- **Status:** fixed (partial — next @27126 after vortex invent)
- **Symptom:** seed0367 first mismatch @27121 — C `next_ident` `rnd(2)`
  vs JS `makemon_rnd_goodpos` `rn2(77)` after matched goodpos coords
  (post-Perseus statue invent).
- **Cause:** JS `goodpos` blanket-returned false on `IS_POOL` whenever
  `mtmp` was set. C accepts pool/moat for `is_swimmer(mdat)` or
  `m_in_air(mtmp)` (flyer/floater) when not waterlevel/waterwall.
  DIAG: `(22,2)` typ=MOAT(17), `S_VORTEX` fakemon, `in_mklev`, not
  occupied — C places vortex, JS kept searching.
- **C locus:** `teleport.c` `goodpos` pool/lava/eel arms; `mon.c`
  `m_in_air`; `mondata.h` `is_swimmer`/`is_flyer`/`is_floater`.
- **Change:** port pool (`is_swimmer` / `m_in_air`), eel `rn2(13)`,
  lava (`PM_FLOATING_EYE` avoid + `m_in_air`/`likes_lava`) in
  `js/teleport.js` `goodpos`.
- **Verification:** seed0367 prefix **27121→27126** (runner RNG
  **27153**/50125, Scr **170**/324); green+strict PASS; cohort sample
  (swimmer/water + quest PASS seeds) PASS; full suite **34/44**.
- **Named omission:** youmonst swim/levitate pool·lava arms;
  `passes_walls`/`may_passwall`; `is_exclusion_zone`; cling+ceiling
  in local `m_in_air`.
- **Next:** seed0367 @27126 C `rndmonst_adj` `rn2(3)` vs JS `rn2(75)`.

## D-0652 — align_shift oldmoves cache + moves=0 through mklev (seed0367 @26695)

- **Status:** fixed (partial — next @27121 after Perseus invent)
- **Symptom:** seed0367 first mismatch @26695 — C `rndmonst_adj`
  weight `rn2(3)` vs JS `rn2(5)` on medusa-1 Perseus `rndmonnum`.
- **Cause:** (1) JS `align_shift` recomputed `Is_special` every call;
  C caches `Is_special(&u.uz)` while `svm.moves` is unchanged, so
  medusa mklev in the same turn still used the prior level (bigrm,
  align 0) → ash=0 / G_FREQ weights. (2) JS set `moves=1` before
  starting `mklev`, so the cache filled on Doom Dlvl:1 and broke
  seed0009 tutorial (tut-1 needs a post-mklev refresh). C keeps
  `moves=0` through `mklev` and sets `moves=1` in `u_init_role`.
- **C locus:** `makemon.c` `align_shift`; `u_init.c` `u_init_role`
  (`moves=1`); `allmain.c` `newgame` order (`mklev` before invent).
- **Change:** port oldmoves/`lev` cache (+ ternary align, not `||`);
  `moves=0` until `u_init_role`; `reset_align_shift_cache` on newgame.
- **Verification:** seed0367 prefix **26695→27121** (runner RNG
  **27146**/50125, Scr **170**/324); seed0009 full PASS; green+strict
  PASS; cohort **32/32** prior-PASS sample.
- **Named omission:** `temperature_shift` still stub 0; `rndmonst_adj`
  upper/elemlevel/`Inhell` `G_NOHELL` filters; medusa-2/3/4.
- **Next:** seed0367 @27121 C `next_ident` `rnd(2)` vs JS
  `makemon_rnd_goodpos` `rn2(77)` after matched goodpos (post-statue
  monster place / invent).

## D-0651 — medusa-1 load_special (seed0367 @26691)

- **Status:** fixed (partial — superseded next by D-0652 @27121)
- **Symptom:** seed0367 first mismatch @26691 — C nhlib `shuffle`
  after matched `makemaz` `rnd(4)=1` vs JS `rn2(79)` `place_lregion`.
- **Cause:** `load_special_proto` omitted `medusa-1`, so makemaz left
  an empty maze. C loads `medusa-1.lua` (moat map, arrival room,
  Perseus statue + contents, empty medusa statues, Medusa/eels, flip,
  branch/teleport lregions; `fixup_special` medusa rooms[0] statues).
- **C locus:** `dat/medusa-1.lua`; `sp_lev.c` `load_special` /
  `create_object` Medusa statue invent; `mkmaze.c` `fixup_special`
  `Is_medusa_level`; `mkobj.c` STATUE book → `add_to_container`.
- **Change:** `js/mklev.js` — `load_medusa_1` + dispatch;
  `Is_medusa_level`; `fixup_special` medusa arm; `js/mkobj.js`
  STATUE book into container.
- **Verification:** seed0367 prefix **26691→26695** (runner RNG
  **26698→26718**, Scr **170**/324); green+strict PASS; cohort
  **34/34** prior-PASS sample.
- **Named omission:** `resists_ston`/`poly_when_stoned`/`propagate`
  on empty statues; medusa-2/3/4; flip lregion coord update;
  fixup stone-resist corpsenm retry.
- **Next:** superseded by D-0652 (@26695→27121).

## D-0650 — goto_level quest_portal com_pager (seed0367 @26688)

- **Status:** fixed (partial — next @26691 medusa load_special)
- **Symptom:** seed0367 first mismatch @26688 — C nhlib `shuffle`
  `rn2(2)` vs JS `makemaz` `rnd(4)` after matched `u_on_rndspot`
  `place_lregion` on bigrm / Quest-entrance level.
- **Cause:** `goto_level` omitted C’s main-dungeon arm
  `!In_quest(uz0) && at_dgn_entrance("The Quest")` →
  `com_pager("quest_portal"|"quest_portal_again")`, which
  `nhl_init`s and burns `shuffle(align)` before the next level’s
  `getbones`.
- **C locus:** `do.c` goto_level (~1918–1931); `dungeon.c`
  `at_dgn_entrance` / `dungeon_branch`; `questpgr.c` `com_pager`;
  `dat/quest.lua` common.quest_portal*.
- **Change:** `js/dungeon.js` `at_dgn_entrance`/`dungeon_branch`;
  `js/questpgr.js` `com_pager` + common portal texts; `js/do.js`
  goto_level else-arm.
- **Verification:** seed0367 prefix **26688→26691** (runner RNG
  **26697→26698**, Scr **170**/324); green+strict PASS; cohort
  **34/34** prior-PASS.
- **Named omission:** Is_knox alarm / Is_rogue / Is_bigroom ACH;
  other common com_pager msgids; medusa-N loaders.
- **Next:** seed0367 @26691 C nhlib shuffle (medusa-1 load) vs JS
  `place_lregion` (missing medusa proto).

## D-0649 — m_initweap S_ANGEL humanoid kit (seed0367 @26229)

- **Status:** fixed (partial — continued D-0650)
- **Symptom:** seed0367 first mismatch @26229 — C `m_initweap` `rn2(3)`
  vs JS trailing `rn2(75)` after matched `newmonhp` / `makemon` sleep.
- **Cause:** `m_initweap` stubbed `S_ANGEL`/`S_KOP` together with an
  empty break, so humanoid angels skipped C’s long-sword/silver-mace
  + optional Sunsword/Demonbane + shield kit and fell through to the
  shared offensive `rn2(75)` gate.
- **C locus:** `makemon.c` `m_initweap` `case S_ANGEL` (~330–360);
  `do_name.c` `oname`; `mkobj.c` `mksobj`/`bless`.
- **Change:** `js/makemon.js` — port S_ANGEL humanoid kit (`rn2(3)`
  weapon, lawful `oname` artifact gate, bless/erodeproof/`spe`,
  reflection/large shield).
- **Verification:** seed0367 prefix **26229→26688** (runner RNG
  **26235→26697**, Scr **170**/324); green+strict PASS; cohort
  **34/34** prior-PASS.
- **Named omission:** S_KOP cream-pie / club / rubber-hose kit;
  non-humanoid S_ANGEL path (none in C beyond the humanoid gate).
- **Next:** seed0367 @26688 C nhlib `shuffle` `rn2(2)` vs JS `rnd(4)`.

## D-0648 — bigrm-3 load_special (seed0367 @19994)

- **Status:** fixed (partial — next @26229 m_initweap)
- **Symptom:** seed0367 first mismatch @19994 — C nhlib `shuffle`
  after matched `makemaz` `rnd(13)=3` vs JS `rn2(79)` `place_lregion`.
- **Cause:** `load_special_proto` omitted `bigrm-3`, so makemaz left an
  empty maze. C loads `bigrm-3.lua` (solidfill map, lit region,
  percent(66) `selection.match("[.w.]")` → F/T/W/Z, stairs, fill,
  fixed-coord monsters, noflip).
- **C locus:** `dat/bigrm-3.lua`; `sp_lev.c` `load_special` /
  `match_maptyps` / `mapfrag_match` / `lspo_terrain`; `mkmaze.c`
  `makemaz`; `nhlsel.c` `l_selection_match`.
- **Change:** `js/mklev.js` — `load_bigrm_3` + dispatch;
  `match_maptyps` / `mapfrag_match` / `selection_match_mapfrag`.
- **Verification:** seed0367 prefix **19994→26229** (runner RNG
  **19999→26235**, Scr **170**/324); green+strict PASS; cohort
  **32/32** prior-PASS. Full suite #720 post-fix: **34/44**, RNG
  **441150**/792838 (55.64%).
- **Named omission:** other bigrm-N; `ensure_way_out` / solidify /
  premap.
- **Next:** seed0367 @26229 C `m_initweap` `rn2(3)` vs JS `rn2(75)`.

## D-0647 — minetn-2 load_special + flip sbrooms (seed0367 @17449)

- **Status:** fixed (partial — next @19994 bigrm-3)
- **Symptom:** seed0367 first mismatch @17449 — C nhlib `shuffle`
  after matched `makemaz` `rnd(7)=2` vs JS `rn2(79)` `place_lregion`.
- **Cause:** `load_special_proto` omitted `minetn-2`, so makemaz left an
  empty maze. C loads `minetn-2.lua` (nested town rooms / shops /
  temple / watch). After the loader, `flip_level` must also flip nested
  `sbrooms` (C sp_lev.c); JS only flipped top-level rooms, which broke
  shop stock `rnd(goodpos)` after a Y-flip.
- **C locus:** `dat/minetn-2.lua`; `sp_lev.c` `create_subroom` /
  `create_door` / `build_room` / `flip_level`; `mkmaze.c` `makemaz`.
- **Change:** `js/mklev.js` — `create_subroom`/`add_subroom`/
  `create_door`/`splev_des_room`/`load_minetn_2` + dispatch; `flip_level`
  recurses into `sbrooms`; rooms array sized for C subroom slotting.
- **Verification:** seed0367 prefix **17449→19994** (runner RNG
  **17451→19999**, Scr **170**/324); green+strict PASS; cohort
  **32/32** prior-PASS.
- **Named omission:** minetn-1/3–7; `link_doors_rooms` extras;
  `ensure_way_out`; bigrm-3.
- **Next:** seed0367 @19994 C nhlib after `makemaz` `rnd(13)=3`
  (bigrm-3) vs JS `place_lregion`.

## D-0646 — Pri-goal load_special (seed0367 @15172)


- **Status:** fixed (partial — next @17449 minetn-2)
- **Symptom:** seed0367 first mismatch @15172 — C nhlib `shuffle`
  (`rn2(3)`/`rn2(2)`) after matched getbones vs JS `rn2(79)`
  (`u_on_rndspot`/`place_lregion` on empty level).
- **Cause:** After Pri-loca arrival (`on_locate` nhl) the session
  immediately `goto_level`s to Pri-goal. `load_special_proto` omitted
  `Pri-goal`, so makemaz left an empty maze. C loads `Pri-goal.lua`
  (solidfill + mines fg=L + map + Mitre/Nalzok). NOTES guessed Pri-fila;
  C `splev_initlev`/`init_fill` proved goal, not fila.
- **C locus:** `dat/Pri-goal.lua`; `sp_lev.c` `load_special` /
  `splev_initlev`/`mkmap`; `mkmaze.c` `makemaz`.
- **Change:** `js/mklev.js` `load_pri_goal` + dispatch in
  `load_special_proto` (mines lava fill defaulting to fg; map `x`
  preserves lava; placeidx `rn2(2)`; Mitre oerodeproof; Nalzok + undead).
- **Verification:** seed0367 prefix **15172→17449** (runner RNG
  **15214→17451**, Scr **170**/324); green+strict PASS; cohort
  **34/34** prior-PASS.
- **Named omission:** Pri-fila/filb; minetn-N; humidity beyond HOT;
  spo_end_moninvent `m_dowear`.
- **Next:** seed0367 @17449 C nhlib after `makemaz` `rnd(7)=2`
  (minetn-2) vs JS `place_lregion`.

## D-0645 — Pri-loca eastern morgue fill hx (seed0367 @15167)

- **Status:** fixed (partial — superseded next by D-0646)
- **Symptom:** seed0367 first mismatch @15167 — C `rn2(79)` @
  `place_lregion` vs JS `rn2(100)` (`morguemon`). Both had 282
  `morguemon` `rn2(100)` from fill start; JS continued fill on cols
  57–60 (lua `x2=39`) while C had finished and called `place_lregion`.
- **Cause:** `load_pri_loca` used lua `region={31,00,39,13}` as-is.
  Observed C fill stocks only map cols 31–35 (70 cells): rooms 0–2
  (212) + 70 = 282, then place_lregion. Extra JS cells used morgue
  `roomno` + ROOM under the D-0643 rectangular gate.
- **Falsified:** wrong `place_lregion` default clamp; fill-in-
  `lspo_finalize` (C fills once in makelevel); dropping roomno gate
  (regresses @10674); porting `link_doors_rooms` into Pri-loca
  (regresses @14403).
- **C locus:** `dat/Pri-loca.lua` eastern morgue `des.region`;
  `sp_lev.c` `lspo_region`/`add_room`/`topologize`; `mkroom.c`
  `fill_zoo`; `mkmaze.c` `place_lregion`.
- **Change:** `js/mklev.js` `load_pri_loca` — eastern morgue
  `priAddRectRoom(31,0,35,13,…)` so hx/roomno match C fill extent
  (D-0645). Lua still lists `x2=39`; mechanism that leaves 36–39
  unstocked in C (roomno/SPACE) not fully cited.
- **Verification:** seed0367 prefix **15167→15172** (runner RNG
  **15181→15214**, Scr **170**/324); green+strict PASS; cohort
  **34/34** prior-PASS.
- **Named omission:** C filter for lua cols 36–39; Pri-fila/filb/goal;
  @15172 C nhlib after getbones vs JS extra `place_lregion`.
- **Next:** seed0367 @15172 C nhlib/`splev_initlev` vs JS `rn2(79)`.

## D-0644 — m_initinv S_DEMON/S_WRAITH/S_LICH (seed0367 @13882)

- **Status:** fixed (partial — superseded next by D-0645)
- **Symptom:** seed0367 first mismatch @13882 — C `rn2(4)` @
  `m_initinv` (makemon.c:802) vs JS `rn2(50)` (trailing defensive)
  after matched makemon tail.
- **Cause:** JS `m_initinv` omitted `S_DEMON` (and sibling `S_WRAITH`/
  `S_LICH`), so ice-devil `!rn2(4)`→SPEAR never ran and control fell
  through to `m_lev > rn2(50)`.
- **C locus:** `makemon.c` `m_initinv` cases `S_WRAITH` / `S_LICH` /
  `S_DEMON` (Nazgul ring; Master/Arch Lich gear; ice devil spear /
  Asmodeus wands).
- **Change:** `js/makemon.js` `m_initinv` — port those three switch
  arms (RNG order for Arch Lich `mksobj` args matches clang L→R).
- **Verification:** seed0367 prefix **13882→15167** (runner RNG
  **13909→15181**, Scr **170**/324); green+strict PASS; cohort
  **32/32** prior-PASS.
- **Named omission:** S_ANGEL/S_KOP invent; @15167 `place_lregion`
  bounds (`rn2(79)` vs `rn2(100)`).
- **Next:** seed0367 @15167 C `place_lregion` `rn2(79)` vs JS
  `rn2(100)`.

## D-0643 — fill_zoo rectangular roomno gate (seed0367 @10674)

- **Status:** fixed (partial — next @13882 m_initinv)
- **Symptom:** seed0367 first mismatch @10674 — C `rnd(2)` @
  `next_ident` (makemon) vs JS `rn2(5)` (MORGUE corpse gate) after
  matched `morguemon`.
- **Cause:** Pri-loca has four overlapping MORGUE rects; later
  `topologize` overwrites shared-edge `roomno`. Rectangular `fill_zoo`
  stocked the earlier rect’s bbox including cells now owned by the
  later room → sleeping zombie on the shared cell → later rect
  `makemon` hit MON_AT and fell through to corpse `rn2(5)`.
- **C locus:** `mkroom.c` `fill_zoo` irregular `roomno`/`edge` gate;
  `mkswamp` rectangular `roomno` gate; `dat/Pri-loca.lua` overlapping
  `des.region` morgues; `mklev.c` `topologize`.
- **Change:** `js/mklev.js` `fill_zoo` — apply `roomno == rmno` for
  non-irregular rooms (same foreign-roomno situation as irregular /
  mkswamp after overlapping topologize).
- **Verification:** seed0367 prefix **10674→13882** (runner RNG
  **10752→13909**, Scr **170**/324); green+strict PASS; cohort
  **34/34** prior-PASS; full suite **34/44**, RNG **428825**/792838.
- **Named omission:** BEEHIVE/BARRACKS/ANTHOLE fill arms; Pri-fila/
  filb/goal; @13882 m_initinv peel.
- **Next:** seed0367 @13882 C `m_initinv` `rn2(4)` vs JS `rn2(50)`.

## D-0642 — Pri-loca load_special + MORGUE fill_zoo (seed0367 @3438)

- **Status:** fixed (partial — superseded next by D-0643)
- **Symptom:** seed0367 first mismatch @3438 — C nhlib `shuffle`
  (`rn2(3)`/`rn2(2)`) after matched `getbones` vs JS `rn2(79)`
  (`u_on_rndspot`/empty maze). Session `^V?`→`z` → Pri-loca (Home 3).
- **Cause:** `load_special_proto` omitted `Pri-loca`, so makemaz left
  an empty quest locate. Also needed MORGUE `fill_zoo` stocking
  (`morguemon`/`mk_tt_object`/chest/`make_grave`) and
  `splev_create_trap`/`Can_fall_thru` respecting `hardfloor`
  (holes→ROCKTRAP before victim `rnd(4)`).
- **C locus:** `dat/Pri-loca.lua`; `sp_lev.c` `load_special` /
  `splev_initlev` mines lit-field; `mkroom.c` `fill_zoo`/`morguemon`;
  `mkobj.c` `mk_tt_object`; `dungeon.c` `Can_fall_thru`;
  `quest.lua` Pri `locate_first`.
- **Change:** `js/mklev.js` `load_pri_loca` + dispatch; `morguemon` +
  `mk_tt_object` + MORGUE `fill_zoo` arm; `Can_fall_thru` in
  `splev_create_trap`/Pri-loca traps; `js/questpgr.js` Pri
  locate_first/next texts.
- **Verification:** seed0367 prefix **3438→10674** (runner RNG
  **3444→10752**, Scr **169→170**/324); green+strict PASS; cohort
  **34/34** prior-PASS stayed PASS (full suite still **34/44**).
- **Named omission:** Pri-fila/filb/goal; mid-morgue occupancy peel
  @10674 (resolved D-0643); BEEHIVE queen / BARRACKS/ANTHOLE fill_zoo;
  humidity get_location; flip (noflip already).
- **Next:** D-0643 @10674; then @13882 m_initinv.

## D-0641 — extract AD_SPEL/CLRC + dochug undirected castmu (seed0367 @3332)

- **Status:** fixed
- **Symptom:** seed0367 first mismatch @3332 — C `rn2(7)` @
  `choose_monster_spell(mcastu.c:111)` vs JS `rn2(10)` @ `m_move`.
- **Cause (proved):** (1) `scripts/extract-monsters.py` `AD_MAP` omitted
  `AD_CLRC`/`AD_SPEL` (and mis-numbered `AD_RBRE`/`AD_SAMU`/`AD_CURS`), so
  every `AT_MAGC` spell slot extracted as `adtyp:0` and never matched
  castmu's `AD_SPEL`/`AD_CLRC` gate. (2) JS `dochug` skipped C's
  undirected `castmu(…, FALSE, FALSE)` before `m_move`.
- **C locus:** `mcastu.c` `choose_monster_spell` / `castmu`;
  `monmove.c` `dochug` PHASE THREE undirected cast; `monattk.h` sparse
  adtyp codes.
- **Change:** fix `AD_MAP` + regenerate `monsters_data.js`; add
  `js/mcastu.js` (`choose_monster_spell` / undirected early-out
  `castmu`); wire into `dochug` before `m_move`; export `AD_SPEL`/
  `AD_CLRC`/`AD_RBRE`/`AD_SAMU`/`AD_CURS` in `const.js`.
- **Verification:** seed0367 prefix **3332→3438** (runner RNG
  **3365→3444**, Scr **169**/324); green+strict PASS; cohort **34/34**
  PASS (incl. seed0361/0373/0116/5006/0106).
- **Named omission:** `mcast_spell` effect bodies (cure/haste/
  disappear/insects/directed attack); `cursetxt` rn2; `has_aggravatables`;
  `mattacku` AT_MAGC → `castmu`/`buzzmu`.
- **Next:** seed0367 @3438 C nhlib `shuffle` vs JS `rn2(79)` after
  matching `getbones`.

## D-0640 — #chat domonnoise MS_LEADER → quest_chat (seed0367 @3310)

- **Status:** fixed
- **Symptom:** seed0367 first mismatch @3310 — C nhlib `shuffle`
  (`rn2(3)`/`rn2(2)`) vs JS `rn2(5)` `distfleeck` after `#chat` west
  to Arch Priest.
- **Cause (proved):** JS `domonnoise` only handled MS_BARK; tables omit
  `msound`, so quest leader `#chat` was silent and later keys ran as
  turns. C overrides `leader_m_id` → `MS_LEADER` → `quest_chat` →
  `qt_pager(leader_first)` nhl_init shuffle, then `is_pure` yn adjust +
  `assignquest` shuffle.
- **C locus:** `sounds.c` `domonnoise` MS_LEADER; `quest.c` `quest_chat`
  / `chat_with_leader`; `questpgr.c` `qt_pager` / `convert_arg`.
- **Change:** `js/sounds.js` leader_m_id→MS_LEADER→`quest_chat`;
  `js/quest.js` export `quest_chat`; `js/questpgr.js` Pri
  `leader_first`/`assignquest` + `%s`/`%S`/`%g` + plural/possessive
  mods; Priest `guardnum` on roles/`urole`.
- **Verification:** seed0367 prefix **3310→3332** (runner RNG
  **3347→3365**, Scr **167→169**/324); green+strict PASS; cohort 14/14
  PASS (incl. seed0361/0373/0116/5006/0106).
- **Named omission:** MS_PRIEST `priest_talk`; nemesis/guardian
  `quest_chat`; other-role assignquest bodies; convert pronoun `%Xh`.
- **Next:** seed0367 @3332 C `choose_monster_spell` vs JS `m_move`.

## D-0639 — teleds must not pre-set u.urooms before spoteffects (seed0367 @3282)

- **Status:** fixed
- **Symptom:** seed0367 first mismatch @3282 — C `rn2(4)` @ `intemple` vs
  JS `rn2(12)` @ `mcalcmove` after controlled `^T` into Pri-strt TEMPLE.
- **Cause (proved):** Session arrives via level-tele outside temple, then
  `^T`/`teleds` into TEMPLE. JS `teleds` permanently set `u.urooms =
  in_rooms(dest)` before `spoteffects`→`move_update`, so `urooms0`
  already contained the temple char and `uentered` stayed empty —
  `intemple` never ran. C only temporarily fakes `urooms` for
  `vault_guard`, then restores before `spoteffects`.
- **Rejected:** missing MAGIC_PORTAL / arrival `u_on_rndspot` alone
  (portal exists in `level.traps`; @3282 is post-`^T`, not arrival);
  missing `intemple` body (D-0638 wiring was necessary but insufficient).
- **C locus:** `teleport.c` `teleds` vault_guard save/restore +
  `spoteffects(TRUE)`; `hack.c` `move_update` / `check_special_room`.
- **Change:** `js/teleport.js` — remove premature `u.urooms` assign;
  let `spoteffects`→`move_update` detect TEMPLE entry (D-0639).
- **Verification:** seed0367 prefix **3282→3310** (runner RNG
  **3329→3347**, Scr **167**/324); green+strict PASS; cohort 10/10 PASS
  (incl. seed0361/0373/0116/5006).
- **Named omission:** vault_guard `uleftvault` temporary urooms arm;
  Pri-strt levregion flip before `place_branch`; `mapseen_temple`.
- **Next:** seed0367 @3310 C nhlib `shuffle` vs JS `rn2(5)`.

## D-0638 — intemple + check_special_room TEMPLE (seed0367 @3282)

- **Status:** fixed (prerequisite; peel completed by D-0639)
- **Symptom:** seed0367 first mismatch @3282 — C `rn2(4)` @ `intemple` vs
  JS `rn2(12)` @ `mcalcmove`; Scr **167**/324; suite #710 **34/44**.
- **Cause (proved):** `goto_level` omitted C's post-arrival
  `check_special_room(FALSE)` and TEMPLE→`intemple` dispatch. After
  wiring, @3282 remained until D-0639 (`teleds` urooms).
- **C locus:** `priest.c` `intemple`; `hack.c` `check_special_room`;
  `do.c` `goto_level` leave/arrive `check_special_room`.
- **Change:** `js/priest.js` `intemple`+helpers; `js/hack.js` TEMPLE;
  `js/do.js` leave/arrive `check_special_room`.
- **Verification:** green+strict; completed by D-0639 @3282→3310.
- **Next:** D-0639.

## D-0637 — Pri-strt load_special + Arch Priest quest role kit (seed0367 @2336)

- **Status:** fixed
- **Symptom:** seed0367 first mismatch @2336 — C nhlib `shuffle` after
  `getbones` vs JS `rn2(79)` `place_lregion`/`u_on_rndspot`; Scr **167**/324.
- **Cause:** (1) `load_special_proto` omitted `Pri-strt`, so makemaz left an
  empty quest start and goto_level fell to `u_on_rndspot`. (2) After the
  loader, Arch Priest still skipped MS_PRIEST mace because
  `quest_mon_represents_role(PM_CLERIC)` was deferred and Priest
  `roles[].ldrnum` was unset (`NON_PM`), so the helper could not match.
- **C locus:** `dat/Pri-strt.lua`; `sp_lev.c` `load_special` / `makemaz`;
  `makemon.c` `quest_mon_represents_role` / MS_PRIEST `m_initweap`;
  `role.c` Priest `PM_ARCH_PRIEST` ldrnum.
- **Change:** `js/mklev.js` `load_pri_strt` + dispatch; `js/makemon.js`
  `quest_mon_represents_role` + MS_PRIEST/m_initinv gates; `js/roles.js`
  Priest `ldrnum`/`homebase`/`intermed`/`questarti`.
- **Verification:** seed0367 prefix **2336→3282**; Scr **167**/324;
  green+strict PASS; cohort **34**/34 prior-PASS stayed PASS.
- **Named omission:** `intemple`; Pri-fila/filb/loca/goal; Arch Priest
  `m_dowear`; flip lregion coord update; TEMPLE fill beyond FILL_LVFLAGS;
  `quest_mon_represents_role(PM_MONK)` exercised only in m_initinv;
  PM_NINJA kit; role_init leader `msound`/`mflags` patch on mons[].
- **Next:** seed0367 @3282 C `intemple` `rn2(4)` vs JS `rn2(12)`.

## D-0636 — blue DSM dragon_armor_handling → Very_fast (seed0367 @2331)

- **Status:** fixed
- **Symptom:** seed0367 first mismatch @2331 — C `u_calc_moveamt` `rn2(3)`
  (Very_fast) vs JS `dosounds` `rn2(400)`; Scr **166**/324. Looked like
  missing Fast branch in `u_calc_moveamt`.
- **Cause:** session dons blue dragon scale mail ("You speed up."); C
  `Armor_on` → `dragon_armor_handling` sets `EFast |= W_ARM`. JS
  `Armor_on` stubbed that helper, so `Very_fast()` stayed false and
  skipped the EOT `rn2(3)`. Blue DSM `oc_oprop` is SHOCK_RES — FAST is
  only via dragon handling, not `setworn`.
- **C locus:** `do_wear.c` `dragon_armor_handling` / `Armor_on` /
  `Armor_off`; `youprop.h` Fast/Very_fast; `allmain.c` `u_calc_moveamt`.
- **Change:** `js/do_wear.js` `dragon_armor_handling` + wire Armor_on/off;
  FAST/`EFast` mirror in `confer_oc_oprop`; `js/attrib.js` Fast/Very_fast
  also read `uprops[FAST]`.
- **Verification:** seed0367 prefix **2331→2336**; Scr **166→167**/324;
  green+strict PASS; cohort **32**/32 PASS.
- **Named omission:** gold `make_hallucinated`; red `see_monsters`;
  yellow `wielding_corpse`; artifact_light begin/end burn.
- **Next:** seed0367 @2336 C `getbones` + nhlib `shuffle` vs JS `rn2(79)`.

## D-0635 — fprefx garlic_breath monflee (seed0367 @1975)

- **Status:** fixed
- **Symptom:** seed0367 first mismatch @1975 — C `dochug` `rn2(40)` flee-
  teleport vs JS `rn2(5)` distfleeck; Scr **155**/324. Looked like missing
  `mflee` on kitten.
- **Cause:** `fprefx` omitted `CLOVE_OF_GARLIC` → `iter_mons(garlic_breath)`.
  Eating garlic (step 61) silently `monflee(0)` nearby smelling mons before
  movemon; JS never set `mflee`, so dochug skipped flee/courage rolls.
- **C locus:** `eat.c` `fprefx` / `garlic_breath`; `mondata.c` `olfaction`;
  `monmove.c` `monflee` / `dochug`.
- **Change:** `js/monsters.js` `olfaction`; `js/eat.js` garlic arm +
  `garlic_breath`; exported `monflee` in `js/monmove.js`; `known_hitum`
  calls real `monflee` (was RNG-only stub).
- **Verification:** seed0367 prefix **1975→2331**; Scr **155→166**/324;
  green+strict PASS; cohort **32**/32 PASS.
- **Named omission:** undead-hero `make_vomiting` on garlic; flees_light /
  `release_hero` / `mon_track_clear` / Vrock in `monflee`; distfleeck
  onscary→monflee still stub.
- **Next:** seed0367 @2331 C `u_calc_moveamt` `rn2(3)` vs JS `dosounds`
  `rn2(400)`.

## D-0634 — getobj_takeoff missing-letter continue (seed0367 @1946)

- **Status:** fixed
- **Symptom:** seed0367 first mismatch @1946 — C `obj_resists` vs JS
  `dog_move` mtrack `rn2(1)`; Scr **75**/324. Looked like one fewer
  `dog_goal` invent `dogfood`.
- **Cause:** `getobj_takeoff` returned null on missing invent letter
  instead of C `getobj` `continue`. Session `T` + Ctrl-W invalid letter
  aborted take-off; later keys (`b`/`l`/`e`) desynced so JS ate garlic
  before the pet `dog_goal` that C still ran with garlic in invent.
- **C locus:** `invent.c` `getobj` — `You("don't have that object.");
  continue;` (~2058–2062); `do_wear.c` `dotakeoff` → getobj takeoff.
- **Change:** `js/do_wear.js` `getobj_takeoff` — loop + `continue` on
  missing letter (match `getobj_wear` / `getobj_eat`).
- **Verification:** seed0367 prefix **1946→1975**; Scr **75→155**/324;
  green+strict PASS; cohort **32**/32 PASS.
- **Named omission:** "not wearing that" still aborts (vs full
  `silly_thing` / filter arms); `?`/`*` menu deferred.
- **Next:** seed0367 @1975 `dochug` `rn2(40)` vs JS `rn2(5)`.

## D-0633 — seed0361 ^X attrs + saber + hunger/pray timers

- **Status:** fixed (seed0361 **PASS**)
- **Symptom:** Scr **364**/366; @360 `(1 of 2)` vs `(1 of 3)`; @361 missing
  Hallu/Search/Reflect/lifesaved lines; `weapon` vs `saber`; hunger
  `<754>` vs `<750>`; pray `(697)` vs `(656)`. RNG full.
- **Cause:** (1) `doattributes` MAGIC Attributes omitted
  `Halluc_resistance` / `Searching` / `Reflecting` / `Lifesaved`;
  `skill_name` odd skills deferred → `"weapon"`. (2) Grayswandir
  `SPFX_HALRES` never conferred (`setuwep` skipped
  `set_artifact_intrinsic`). (3) once-per-turn `ublesscnt--` missing.
  (4) `gethungry` deferred even-case amulet accessorytime burn (case 8).
- **C locus:** `insight.c` `attributes_enlightenment`; `weapon.c`
  `odd_skill_names` / `P_NAME`; `artifact.c` `set_artifact_intrinsic`
  / `what_gives` / `attrib.c` `from_what` `bare_artifactname`;
  `allmain.c` moveloop `ublesscnt--`; `eat.c` `gethungry` case 8.
- **Change:** invent attrs lines + odd `skill_name`; artifact
  `set_artifact_intrinsic` HALRES + `what_gives` + `bare_artifactname`;
  `setuwep` wire; `allmain` ublesscnt; `gethungry` accessory cases.
- **Verification:** seed0361 Scr **364→366**/366 RNG FULL **PASS** +
  strict; green+strict PASS; cohort **31**/31 PASS.
- **Named omission:** other SPFX intrinsics; full resist catalogue;
  Jumping/Teleportation; Blind/Stun Status.
- **Next:** leaderboard cron; seed0367 `Pri-strt` / seed0014/0108; or
  full `sessions` on #705 for Score (expect **34**/44 with seed0361).

## D-0632 — relobj death-drop distant_name observe (seed0361 @358)

- **Status:** fixed (superseded — seed0361 **PASS** via D-0633)
- **Symptom:** `\` disco Armor — JS `hooded cloak` then `pair of hard shoes`
  vs C reverse. RNG full.
- **Cause:** `relobj_on_death` placed minvent without C `mdrop_obj`'s
  `distant_name(obj, doname)` side-effect. C observes in minvent-head order
  at drop; JS only observed later in `look_here` (reverse pile order after
  prepend `place_object`).
- **C locus:** `steal.c` `mdrop_obj` / `relobj`; `objnam.c` `distant_name`
  near+cansee → `doname` → `observe_object`.
- **Change:** `js/mkobj.js` `relobj_on_death` — `distant_name(otmp, doname)`
  before `obj_extract_self`.
- **Verification:** seed0361 Scr **363→364**/366; @358 MATCH; green+strict
  PASS; cohort **31/31** PASS.
- **Named omission:** flooreffects / vault-guard gold / pet `droppables`.
- **Next:** @360 attrs `(1 of 2)` vs `(1 of 3)` — missing Hallu/Search/
  Reflect/lifesaved lines + saber skill name; hunger/pray timers.

## D-0631 — ini_inv weptool + doname charged tools (seed0361 @354)

- **Status:** fixed (partial — seed0361 still 363/366)
- **Symptom:** invent `e`/`f` — JS `an uncursed pick-axe` / `an uncursed
  tinning kit` vs C `a +0 pick-axe (alternate weapon; not wielded)` /
  `a tinning kit (0:72)`. RNG full.
- **Cause:** (1) `ini_inv_use_obj` outer weapon gate used `is_missile`
  instead of C `is_weptool`, so Arc pick-axe never got `W_SWAPWEP` after
  bullwhip `uwep`. (2) `doname` deferred weptool→WEAPON remap (`+spe`)
  and omitted TOOL `oc_charged` names (tinning kit / WEPTOOL chg bit).
- **C locus:** `u_init.c` `ini_inv_use_obj`; `objnam.c` `doname_base`
  `is_weptool ? WEAPON_CLASS`; `objects.h` TOOL/WEPTOOL chg.
- **Change:** `js/u_init.js` — `is_weptool` + `!uarms||!bimanual` for
  `setuwep`; `js/objnam.js` — weptool donameClass + charged-tool list.
- **Verification:** seed0361 Scr **362→363**/366; @354 MATCH; green+strict
  PASS; cohort **31/31** PASS.
- **Next:** @358 disco order (cloak/shoes); @360 attrs `(1 of 2)` vs
  `(1 of 3)`; @361 attrs cursor.

## D-0630 — makemon hideunder ignores non-pit trap (seed0361 @339)

- **Status:** fixed (partial — seed0361 still 362/366)
- **Symptom:** seed0361 @339 Home5 getlev — map `(29,12)` JS `%`
  (food under mundetected snake) vs C `S`. RNG full.
- **Cause:** Arc-goal places `des.trap()` before `des.monster("S")`.
  C `hideunder` refuses hide when `t_at` is a non-pit trap (here
  POLY_TRAP). JS makemon inline set `mundetected=1` on any floor
  object after `hides_under` (D-0628), skipping the trap gate.
  `hide_monst` then skips already-hidden mons on getlev.
- **C locus:** `mon.c` `hideunder`; `makemon.c` S_SPIDER/S_SNAKE;
  `dat/Arc-goal.lua` trap-before-monster order.
- **Change:** `js/makemon.js` — inline hideunder checks
  `t_at && !is_pit(ttyp)` before setting `mundetected`.
- **Verification:** seed0361 Scr **355→362**/366; RNG full;
  green+strict PASS; cohort **33/33** PASS.
- **Named omission:** inline still skips `can_hide_under_obj` coins /
  pet cursed / cockatrice; eel arm unchanged.
- **Next:** seed0361 @354 invent doname (pick-axe `+0` / tinning
  charges); or Pri-strt / seed0014/0108.

## D-0629 — urole.questarti missing → empty %o (seed0361 @320)

- **Status:** fixed (partial — seed0361 still 355/366)
- **Symptom:** seed0361 screen 320 goal_first NHW_TEXT — C
  `…presence of the Orb of Detection.` vs JS `…presence of .`
- **Cause:** `convert_arg('%o')` calls `the(artiname(urole.questarti))`, but
  `setup_role_race_from_rc` copied homebase/intermed/ldrnum and omitted
  `questarti`, so `qi|0 === 0` → empty `artilistRaw[0].name`.
- **C locus:** `questpgr.c` `convert_arg` `%o`/`%O`; `role.c` `roles[].questarti`;
  JS `u_init.js` `setup_role_race_from_rc` vs `roles.js` Arc/Bar templates.
- **Change:** `js/u_init.js` — install `questarti: role.questarti ?? 0`.
- **Verification:** seed0361 Scr **352→355**/366; Orb line matches; RNG full;
  green+strict PASS; cohort sample PASS; full suite Scr **6815→6818**/11405.
- **Next:** seed0361 remaining 11 screens (cell attrs / later peels); or
  Pri-strt / seed0014/0108.

# Divergence log

## D-0628 — makemon spider/snake hideunder needs hides_under (seed0361 @307)

- **Status:** fixed (partial — next @320 Orb of Detection text)
- **Symptom:** seed0361 screen 307 — after locate materialize, map
  `(59,13)` JS `%` (pancake) vs C `S` (python). RNG already full.
- **Cause:** `makemon` S_SPIDER/S_SNAKE arm set `mundetected=1` whenever
  any floor object existed. C calls `hideunder`, which only hides when
  `hides_under(data)` (`M1_CONCEAL`). **Python** is `S_SNAKE` but lacks
  `M1_CONCEAL`, so C leaves it visible over the mkobj pancake.
- **C locus:** `makemon.c` case `S_SPIDER`/`S_SNAKE` → `hideunder`;
  `mon.c` `hideunder` + `mondata.h` `hides_under`; `monsters.h` python
  flags (no `M1_CONCEAL`).
- **Change:** `js/makemon.js` — gate inline hide on `hides_under(ptr)`.
- **Verification:** seed0361 Scr **331→352**/366; RNG full; green+strict
  PASS; cohort **31/31** PASS.
- **Next:** seed0361 @320 `"the Orb of Detection."` vs truncated line;
  or Pri-strt / seed0014/0108.

## D-0627 — is_pure wizard≡debug + convert_arg %r/%ra (seed0361 @182)

- **Status:** fixed (partial — next map glyph peel @307)
- **Symptom:** seed0361 @182 — C
  `You are currently 10 and require 20.--More--` then `adjust?` then
  badalign `…suitable for a Spelunker!`; JS skipped purity/adjust and
  showed badalign / later zap prompt (keys desynced). After debug fix,
  badalign still said `Diggera`.
- **Cause:** (1) `is_pure` checked `flags.wizard`, but `playmode:debug`
  sets `flags.debug` only — C `#define wizard flags.debug`. (2)
  `convert_arg('%r')` used sticky `urole.rank` (Digger) and treated
  `%ra` as literal suffix instead of C `an(rank)` → `a Spelunker`.
- **C locus:** `quest.c` `is_pure` / `chat_with_leader`; `flag.h`
  `wizard`; `questpgr.c` `convert_arg`/`convert_line`; `objnam.c` `an`.
- **Change:** `js/quest.js` — wizard ≡ `flags.debug||flags.wizard`;
  `js/questpgr.js` — `%r`/`%R`→`rank_of`, modifiers `%Xa`/`%XA`/`%XC`.
- **Verification:** seed0361 Scr **327→331**/366; RNG full; green+strict
  PASS; cohort **33/33** PASS.
- **Next:** seed0361 @307 map cell `S` vs `%` after locate materialize;
  or Pri-strt / seed0014/0108.

## D-0626 — getpos auto_describe missing cmap / waterbody (seed0361 @154)

- **Status:** fixed (partial — next message-order peel @182)
- **Symptom:** seed0361 screen 154+ — C getpos autodescribe
  `"floor of a room"` / `"moat"`; JS `"unexplored area"` while map
  glyphs already matched.
- **Cause:** `auto_describe_text` treated any non-stair/non-trap
  displayed glyph as deferred stub `"unexplored area"`. Cells were
  ROOM (`disp_ch='~'`) / MOAT (`disp_ch='`'`) — not blank memory.
- **C locus:** `pager.c` `lookat` `glyph_is_cmap` → `defsyms[].explanation`
  + `S_pool`/`S_water`/`S_lava`/`S_ice` → `waterbody_name`;
  `getpos.c` `auto_describe` → `do_screen_description`.
- **Change:** `js/getpos.js` — `cmap_defsym_explanation` for ROOM/CORR/
  wall/STONE + `waterbody_name` for pool/moat/lava/ice. Object glyphs,
  altar/ndoor/cloud/engraving still deferred.
- **Verification:** seed0361 Scr **309→327**/366; RNG full; green+strict
  PASS; cohort **33/33** PASS.
- **Next:** seed0361 @182 `adjust?` / dialogue vs zap prompt; or
  Pri-strt / seed0014/0108.

## D-0625 — Arc QUEST_FIRSTTIME missing (seed0361 Scr @147)

- **Status:** fixed (partial — next getpos farlook @154)
- **Symptom:** seed0361 screen 147 — C
  `You materialize…!--More--` then Arc firsttime NHW_TEXT; JS
  materialize without `--More--`, then `Unknown command ' '` (space
  stolen by rhack).
- **Cause:** `QUEST_FIRSTTIME` had only Bar; Arc `qt_pager('firsttime')`
  returned early (still set `first_start`), so `flush_topl_more` never
  ran before the text window and the following space was a command.
- **C locus:** `dat/quest.lua` Arc `firsttime`; `quest.c` `on_start` →
  `qt_pager`; `do.c` `goto_level` `maybe_lvltport_feedback` + onquest.
- **Change:** `js/questpgr.js` — add Arc `QUEST_FIRSTTIME` from
  `quest.lua` (`%H` → homebase). Other-role firsttime bodies still deferred.
- **Verification:** seed0361 Scr **306→309**/366 (147–153 match); RNG
  full; green+strict PASS; cohort **31/31** PASS.
- **Next:** seed0361 @154 getpos `"unexplored area"` vs `"floor of a
  room"`; or Pri-strt / seed0014/0108.

## D-0624 — movemon_singlemon restrap pre-dochug (@53815)

- **Status:** fixed (partial — seed0361 RNG full; screen peel remains)
- **Symptom:** seed0361 @53815 — C `restrap` `rn2(3)` (movemon pre-dochug)
  vs JS `rn2(6)` shapeshift / further movement.
- **Cause:** `restrap` body existed (D-0622 `hide_monst`) but
  `movemon_singlemon` never called it before the hider `M_AP_*` /
  `mundetected` early returns.
- **C locus:** `mon.c` `movemon_singlemon` `is_hider` → `restrap`.
- **Change:** `js/mon.js` `movemon_singlemon` — call `restrap(mtmp)` and
  return false if hid. Named omissions: eel `hideunder` + `rn2(4)` arm;
  `minliquid`; equip `I_SPECIAL` `m_dowear`.
- **Verification:** seed0361 RNG **53817→53865**/53865 (full) Scr
  **306**/366; green+strict PASS; cohort **31/31** PASS; full suite
  **33/44** Scr **6698** RNG **416960**.
- **Next:** seed0361 screen peel; or Pri-strt / seed0014/0108.

## D-0623 — fog m_everyturn create_gas_cloud + cham decide_to_shapeshift (@53773)

- **Status:** fixed (partial — next was @53815 movemon restrap → D-0624)
- **Symptom:** seed0361 @53773 — C `create_gas_cloud` `rn2(3)` (ttl) after
  matched `place_lregion` vs JS `rn2(12)` mcalcmove.
- **Cause:** (1) `movemon_singlemon` returned early on low movement before
  C’s `m_everyturn_effect` — fog size-1 vapor never burned ttl
  `rn1(3,4)`. (2) `m_calcdistress` omitted `decide_to_shapeshift` for
  cham (next mismatch @53774).
- **C locus:** `monmove.c` `m_everyturn_effect` / `m_postmove_effect`;
  `region.c` `create_gas_cloud`; `mon.c` `decide_to_shapeshift` /
  `movemon_singlemon` call order.
- **Change:** new `js/region.js` `create_gas_cloud` (BFS expand + ttl);
  `js/monmove.js` fog everyturn + Hezrou/Steam postmove; `js/mon.js`
  everyturn before movement gate + regular cham shapeshift;
  `fumaroles` calls real `create_gas_cloud`. Named omissions: vamp
  shapeshift arms; `run_regions` ttl age; region glyphs/block;
  movemon `restrap` call site.
- **Verification:** prefix **53773→53815** Scr **306**/366 RNG
  **53817**/53865; green+strict PASS; cohort **33/33** PASS.
- **Next:** @53815 C movemon `restrap` `rn2(3)` vs JS `rn2(6)`; or
  Pri-strt / seed0014/0108.

## D-0622 — getlev hide_monst → restrap (@53705)

- **Status:** fixed (partial — next @53773 create_gas_cloud)
- **Symptom:** seed0361 @53705 — C `restrap` `rn2(3)` during `getlev`
  hide_monst vs JS next monster's `getlev` `rnd(10)`.
- **Cause:** `hide_monst` gated correctly but stubbed body (no viz override /
  `restrap` / mimic retry / `hideunder`).
- **C locus:** `mon.c` `hide_monst` / `restrap` / `hideunder`;
  `restore.c` `getlev` hide after `rnd(10)`.
- **Change:** `js/mon.js` — `restrap` (C short-circuit + `set_mimic_sym` /
  ROOM `mundetected`) + `hide_monst` viz `IN_SIGHT|COULD_SEE` clear +
  mimic second `restrap` + `hideunder`. Named omission: `movemon_singlemon`
  pre-dochug `restrap` call site.
- **Verification:** prefix **53705→53773** Scr **296→306** RNG
  **53734→53807**/53865; green+strict PASS; cohort **33/33** PASS.
- **Next:** @53773 C `create_gas_cloud` `rn2(3)` vs JS `rn2(12)`; or
  Pri-strt / seed0014/0108.

## D-0621 — bigrm-7 load_special (@46893)

- **Status:** fixed (partial — next @53705 restrap)
- **Symptom:** seed0361 @46893 — C nhlib `shuffle` `rn2(3)` after matched
  `makemaz` `rnd(13)=7` vs JS `rn2(79)` (empty-maze mineralize).
- **Cause:** `load_special_proto` had loaders for `bigrm-2`/`bigrm-8` only.
  Proto `bigrm-7` fell through → no nhl shuffle / replace_terrain RNG.
- **C locus:** `dat/bigrm-7.lua`; `mkmaze.c` `makemaz`; `sp_lev.c`
  `load_special` / `replace_terrain` / `flip_level_rnd`.
- **Change:** `js/mklev.js` — `load_bigrm_7` + dispatch (map, L→{L,T,{,.}
  replace, lit region, stairs, nondig, 15/6/28 fill, wallify+flip+fixup).
- **Verification:** prefix **46893→53705** Scr **296**/366 RNG
  **53734**/53865; green+strict PASS; cohort **33/33** PASS.
- **Next:** @53705 C `restrap` `rn2(3)` vs JS `getlev` `rnd(10)`; or
  Pri-strt / seed0014/0108.

## D-0620 — on_goal goal_first nhl shuffle (@42649)

- **Status:** fixed (partial — next @46893 bigrm-7)
- **Symptom:** seed0361 @42649 — C nhlib `shuffle` `rn2(3)` after matched
  Arc-goal `place_lregion` vs JS `rn2(79)`.
- **Cause:** `onquest` → `Is_nemesis` stubbed `on_goal`. First Home 5
  entry needs `qt_pager("goal_first")` → `nhl_init` align shuffle.
  Without it JS continued into empty-maze `rn2(79)`.
- **C locus:** `quest.c` `on_goal` / `onquest`; `questpgr.c` `qt_pager` /
  `find_quest_artifact` / `convert_arg` `%o`/`%n`; `dat/quest.lua`
  Arc/Bar `goal_*`.
- **Change:** `js/quest.js` — `on_goal` + floor/minvent/buried
  `find_quest_artifact`; `js/questpgr.js` — Arc/Bar goal texts + `%o`/`%n`;
  `js/roles.js` — Arc/Bar `questarti`.
- **Verification:** prefix **42649→46893** Scr **289→296** RNG
  **46893**/53865; green+strict PASS; cohort **33/33** PASS.
- **Next:** @46893 C `bigrm-7` nhl shuffle after `makemaz` `rnd(13)` vs
  JS `rn2(79)`; or Pri-strt / seed0014/0108.

## D-0619 — Arc-goal load_special + Minion mitem/gender (@34204)

- **Status:** fixed (partial — next @42649 nhl shuffle vs rn2(79))
- **Symptom:** seed0361 @34204 — C nhlib `shuffle` `rn2(3)` after matched
  `getbones` (Home 5) vs JS `rn2(79)` (`get_location` / mineralize on empty).
- **Cause:** `makelevel` In_quest requested `Arc-goal`, but
  `load_special_proto` had no loader. Also Minion of Huhetotl needed
  `quest_status.nemgend` (not `rn2(2)`) and `mongets(BELL_OF_OPENING)`
  (`MS_NEMESIS` mitem; tables omit msound → `urole.neminum` gate).
  Arc-goal has **14** random `des.object()` (not 15).
- **C locus:** `dat/Arc-goal.lua`; `sp_lev.c` load_special / create_*;
  `makemon.c` MS_NEMESIS gender + mitem; `artifact`/`oname` Orb.
- **Change:** `js/mklev.js` — `load_arc_goal` + dispatch; `fill_special_room`
  TEMPLE/`has_temple` flags; `js/makemon.js` — `nemgend`/`ldrgend` +
  Croesus/nemesis/Pestilence mitem.
- **Verification:** prefix **34204→42649** Scr **289**/366 RNG
  **42658**/53865; green+strict PASS; cohort **31/31** PASS.
- **Next:** @42649 C nhlib shuffle after place_lregion vs JS `rn2(79)`;
  or Pri-strt / seed0014/0108.

## D-0618 — Arc-fila/filb load_special (@31644)

- **Status:** fixed (partial — next @34204 Arc-goal nhl shuffle vs rn2(79))
- **Symptom:** seed0361 @31644 — C nhlib `shuffle` `rn2(3)` after matched
  `getbones` (Home 4) vs JS `rn2(79)` (`get_location` / mineralize on empty).
- **Cause:** `makelevel` In_quest correctly requested `Arc-filb`, but
  `load_special_proto` had no loader; makemaz miss left stone → mineralize
  `rn2(79)`. C loads `Arc-filb.lua` (ordinary `des.room` +
  `des.random_corridors`). First room `des.monster("M")` → S_MUMMY (8×
  `rn2(9)`). Also needed `get_location_coord` double-retry for WET-only
  humidity (swimmer snakes) before DRY fallback.
- **C locus:** `dat/Arc-filb.lua` / `Arc-fila.lua`; `sp_lev.c`
  `lspo_room`/`build_room`/`get_location_coord`/`create_monster`;
  `mklev.c` In_quest `*-fil{a,b}`.
- **Change:** `js/mklev.js` — `load_arc_fila`/`load_arc_filb` +
  `splev_ordinary_room` + croom `get_location_coord_in_room` /
  `splev_room_{object,monster,stair,trap}`; dispatch in
  `load_special_proto`.
- **Verification:** prefix **31644→34204** Scr **289**/366 RNG
  **34219**/53865; green+strict PASS; cohort **33/33** PASS.
- **Next:** @34204 C nhlib shuffle after getbones (Arc-goal) vs JS
  `rn2(79)`; or Pri-strt / seed0014/0108.

## D-0617 — tower1 chest candles via get_location_coord (@23223)

- **Status:** fixed (partial — next @31644 nhl shuffle vs rn2(79))
- **Symptom:** seed0361 @23223 — C `rn2(15)` @ `get_location` vs JS
  `rnd(2)` `next_ident` during tower1 wax/tallow candle contents.
- **Cause:** `load_tower1` placed container candles with raw
  `mx+rn2(sx)`/`my+rn2(sy)` then `mksobj_at`. C `create_object` uses
  `get_location_coord(..., DRY, random)` so rejected non-DRY cells
  retry `rn2(15)`/`rn2(11)` before `next_ident`.
- **C locus:** `sp_lev.c` `create_object` / `get_location_coord`;
  `dat/tower1.lua` chest `contents` wax/tallow candle.
- **Change:** `js/mklev.js` `load_tower1` candle arm →
  `get_location_coord_random(DRY)` before `mksobj_at`.
- **Verification:** prefix **23223→31644** Scr **289**/366 RNG
  **31644**/53865; green+strict PASS; cohort **31/31** PASS.
- **Next:** @31644 C nhlib shuffle `rn2(3)` vs JS `rn2(79)` (post
  matched getbones); or Pri-strt / seed0014/0108.

## D-0616 — qt_pager default output → deliver_by_pline (@23016)

- **Status:** fixed (continued as D-0617)
- **Symptom:** seed0361 @23016 — C `rn2(3)` @ `getbones` (Dlvl:37) vs JS
  `rn2(5)` @ `distfleeck` still on Home.
- **Cause:** Arc `nexttime` in `quest.lua` has no `output=` (default) →
  C `deliver_by_pline`. JS `qt_pager` always used `show_text_pages`
  (NHW_TEXT). After materialize `--More--` (^V/?/\n), the text window
  consumed `e`; `s` became search → turn → `movemon` before second `^V`.
- **C locus:** `questpgr.c` `com_pager_core` / `deliver_by_pline`;
  `dat/quest.lua` Arc `nexttime`; `getline.c` `xwaitforspace`.
- **Change:** `js/questpgr.js` `qt_pager` — default delivery: pline unless
  text has `\n` or length ≥ 255 (C default→window promotion). Named
  omission: explicit single-line `output=text`.
- **Verification:** prefix **23016→23223** Scr **271→289**; green+strict
  PASS; cohort **31/31** PASS.
- **Next:** @23223 C `get_location` `rn2(15)` vs JS `rnd(2)`; or Pri-strt.

## D-0615 — @23016 Home distfleeck vs ^V→Dlvl:37 getbones

- **Status:** fixed (superseded by D-0616)
- **Symptom:** seed0361 @23016 — C `rn2(3)` @ `getbones` vs JS
  `rn2(5)`.
- **Falsified:** JS Medusa/`makelevel_ordinary` `rn2(5)`, or getbones
  calling `rn2(5)`, or skipped getbones into special `rnd(5)`.
- **Cause (channel):** after matched Home re-entry (getlev catchup +
  `place_lregion` + `on_start` nhl shuffle through 23015), C’s next RNG
  is wizard `^V` dungeon menu → Dlvl:37 `mklev`/`getbones`. JS stack is
  `distfleeck`→`dochug`→`movemon` still on Home. Root: D-0616 qt_pager
  NHW_TEXT key theft → search turn.
- **C locus:** `bones.c` `getbones`; `teleport.c` `level_tele` /
  `print_dungeon`; `monmove.c` `distfleeck` (JS only).
- **Verification:** diagnosed #685; fixed as D-0616 #686.

## D-0614 — on_start nexttime/othertime nhl shuffle (@23015)

- **Status:** fixed (partial — next D-0615 @23016)
- **Symptom:** seed0361 @23015 — C nhlib `shuffle` `rn2(2)` vs JS
  `rnd(13)` after matched `place_lregion` on Home re-entry. First
  `rn2(3)=0` matched by coincidence (C shuffle vs JS getbones).
- **Cause:** JS `on_start` omitted C’s else branch: after `first_start`,
  re-entry from other dnum or from above calls `qt_pager("nexttime")`
  or `"othertime"` (`not_ready <= 2`), which burns nhl_init align
  shuffle. Without it, JS jumped ahead to Dlvl:37 `makemaz`/`rnd(13)`.
- **C locus:** `quest.c` `on_start`; `questpgr.c` `qt_pager` /
  `com_pager_core` → `nhl_init`; `dat/quest.lua` Arc/Bar nexttime/
  othertime.
- **Change:** `js/quest.js` `on_start` port nexttime/othertime gate;
  `js/questpgr.js` Arc+Bar texts + msgid dispatch.
  Named omission: other-role nexttime/othertime bodies (shuffle still
  burns); on_goal.
- **Verification:** prefix **23015→23016** Scr **268→271** RNG
  **24011→23269**; green+strict PASS; cohort **31/31** PASS.
- **Next:** D-0615 — not getbones arg; Home `movemon` vs ^V→37.

## D-0613 — artifact_hit / spec_dbon Grayswandir double (@22362)

- **Status:** fixed (partial — next nhlib shuffle @23015)
- **Symptom:** seed0361 @22362 — C `rn2(6)` @ `xkilled` vs JS `rn2(3)`.
  JS then `rn2(6)` — knockback pattern, not inverted xkilled order.
- **Cause:** JS `hmon` never called `artifact_hit`/`spec_dbon`. Wielded
  Grayswandir (`damd==0`, PHYS) adds `max(tmp,1)` with no RNG, doubling
  post-`dmgval` damage. Without it the mon survived → `mhitm_knockback`
  burned `rn2(3)`+`rn2(6)` instead of `xkilled` treasure `rn2(6)`.
- **C locus:** `artifact.c` `spec_dbon` / `artifact_hit` / `attacks`;
  `uhitm.c` `hmon_hitmon_weapon_melee` (after `dmgval`, before recalc).
- **Change:** `js/artifact.js` — `spec_dbon`, `artifact_hit`, `attacks`,
  `is_art`; `js/uhitm.js` `hmon` wires artifact after `dmgval`.
  Named omissions: destroy_items/ignite bodies; Mb_hit; SPFX_BEHEAD/DRLI;
  wake_nearto; realizes_damage plines.
- **Verification:** prefix **22362→23015** Scr **225→268** RNG
  **22664→24011**; green+strict PASS; cohort **33/33** PASS.
- **Next:** seed0361 @23015 C nhlib `shuffle` `rn2(2)` vs JS `rnd(13)`;
  or Pri-strt / seed0014/0108.

## D-0612 — mfndpos diagonal bad_rock / cant_squeeze_thru (@22140)

- **Status:** fixed (partial — next xkilled rn2(6) @22362)
- **Symptom:** seed0361 @22140 — C `rn2(12)` @ `m_move` track avoid
  vs JS `rn2(16)` (same site, different `cnt`).
- **Cause:** JS `mfndpos` omitted C's diagonal tight-squeeze gate
  (`bad_rock` flanks + `cant_squeeze_thru`). Giant spider at (14,9)
  included diagonal (15,10) between wall corners → cnt=4; C cnt=3 →
  first track hit `rn2(4*(cnt-j))` was 12 vs 16.
- **C locus:** `mon.c` `mfndpos`; `hack.c` `bad_rock` /
  `cant_squeeze_thru` / `may_passwall`.
- **Change:** `js/mon.js` — port `bad_rock`/`may_passwall`/
  `cant_squeeze_thru`; wire squeeze continue after NOTONL in `mfndpos`.
  Named omission: `can_fog` vampshifter arm of squeeze.
- **Verification:** prefix **22140→22362** Scr **225** RNG
  **22478→22664**; green+strict PASS; cohort 31/31 PASS.
- **Next:** seed0361 @22362 C `rn2(6)` @ `xkilled` vs JS `rn2(3)`;
  or Pri-strt / seed0014/0108.

## D-0611 — hitval oartifact spec_abon (@22084)

- **Status:** fixed (partial — next m_move rn2(12) @22140)
- **Symptom:** seed0361 @22084 — C `rnd(5)` @ `spec_abon` vs JS `rnd(20)`
  @ `hitum`.
- **Cause:** JS `hitval` never called `spec_abon`; artifact extract omitted
  `attk`/`mtype`, so hero artifact melee skipped the to-hit bonus die.
- **C locus:** `artifact.c` `spec_abon` / `spec_applies`; `weapon.c` `hitval`.
- **Change:** extractor emits attk+mtype; `js/artifact.js` `spec_applies` +
  `spec_abon`; `js/weapon.js` `hitval` adds `spec_abon` when `oartifact`.
- **Verification:** prefix **22084→22140** Scr **225** RNG **22261→22478**;
  green+strict PASS; cohort 31/31 PASS.
- **Next:** seed0361 @22140 C `rn2(12)` @ `m_move` vs JS `rn2(16)`; or
  Pri-strt / seed0014/0108.

## D-0610 — m_move cnt==0 tryescape use_defensive (@22042)

- **Status:** fixed (partial — next m_move @22140 via D-0611)
- **Symptom:** seed0361 @22042 — C `rn2(13)` @ `precheck` /
  `d(6,4)` @ `use_defensive` vs JS `rn2(5)` @ `distfleeck`.
- **Cause:** Healthy gnome leader (`mhp==mhpmax`) held milky
  `POT_HEALING`. dochug `find_defensive(FALSE)` correctly refused
  (wound gate). C reached defense via `m_move` when `mfndpos` `cnt==0`:
  `find_defensive(TRUE)` skips the wound gate, then `use_defensive` →
  milky `precheck` + healing `d(6+2*bcsign,4)`. JS returned
  `MMOVE_NOMOVES` without that tryescape arm.
- **C locus:** `monmove.c` `m_move` cnt==0; `muse.c` `find_defensive` /
  `precheck` / `use_defensive` `MUSE_POT_HEALING`.
- **Change:** `js/monmove.js` — cnt==0 → `find_defensive(true)` +
  `use_defensive` → `MMOVE_DONE`; `js/muse.js` — healing invent select,
  milky/smoky `precheck`, healing `use_defensive`; dochug awaits
  `use_defensive`.
- **Verification:** prefix **22042→22084** Scr **224→225** RNG
  **22154→22261**; green+strict PASS; cohort 20/20 PASS.
- **Next:** continued as D-0611 (`spec_abon` @22084).

## D-0609 — dochug MMOVE_MOVED + ranged_attk_available (@21974)

- **Status:** fixed (partial — next use_defensive @22042)
- **Symptom:** seed0361 @21974 — C `rnd(4)` @ `mattacku` (`AC_VALUE`
  with `u.uac=-4`) vs JS `rn2(5)` @ `distfleeck`.
- **Cause:** Gnomish wizard (`mndx` 167, `AT_MAGC`) took `MMOVE_MOVED`
  while `!nearby`. C falls through to PHASE FOUR when
  `ranged_attk_available || AT_WEAP || find_offensive`. JS only tested
  `is_armed || find_offensive`, so the wizard returned early and never
  reached `mattacku`/`AC_VALUE`.
- **C locus:** `monmove.c` `dochug` `MMOVE_MOVED`; `mhitu.c`
  `ranged_attk_available` / `mattacku` `AC_VALUE`.
- **Change:** `js/monmove.js` `dochug` — include
  `ranged_attk_available(mtmp)` in the MOVED fall-through gate.
- **Verification:** prefix **21974→22042** Scr **224** RNG
  **22135→22154**; green+strict PASS; cohort 14/14 PASS.
- **Next:** seed0361 @22042 C `rn2(13)` @ `precheck`/`use_defensive`
  vs JS `distfleeck` (dochug stubs `find_defensive` as not spent);
  or Pri-strt / seed0014/0108.

## D-0608 — minend-1 des.object("(") → TOOL not WEAPON (@21310)

- **Status:** fixed (partial — next mattacku @21974)
- **Symptom:** seed0361 @21310 — C `rnd(1000)` @ `mkobj` vs JS `rnd(1002)`.
- **Cause:** Prior notes assumed GEM `oclass_prob_totals` / `setgemprobs`.
  Live diag: JS `mkobj` used `WEAPON_CLASS` (sum **1002**); C still used a
  1000-total class. `dat/minend-1.lua` `des.object("(")` maps via
  `defsym.h` to **TOOL_CLASS** (`'('`), not WEAPON (`')'`). JS
  `load_minend_1` called `splev_create_object(WEAPON_CLASS)`.
- **C locus:** `dat/minend-1.lua` `des.object("(")`; `include/defsym.h`
  OBJCLASS TOOL `'('` / WEAPON `')'`; `mkobj.c` `mkobj`.
- **Change:** `js/mklev.js` `load_minend_1` — two random objects use
  `TOOL_CLASS`.
- **Verification:** prefix **21310→21974** Scr **222→224** RNG
  **21466→22135**; green+strict PASS; cohort 7/7 PASS.
- **Next:** seed0361 @21974 C `rnd(4)` @ `mattacku` vs JS `rn2(5)` @
  `distfleeck`; or Pri-strt / seed0014/0108.

## D-0607 — minend-1 load_special (@21119)

- **Status:** fixed (partial — continued as D-0608)
- **Symptom:** seed0361 @21119 — C nhlib `shuffle` / `splev_initlev` after
  matched `makemaz` `rnd(3)=1` vs JS `place_lregion` `rn2(79)`.
- **Cause:** `makemaz` picked `minend-1` (`rndlevs=3`) but
  `load_special_proto` had no mines-end loader, so JS fell through while C
  ran `dat/minend-1.lua`.
- **C locus:** `dat/minend-1.lua`; `mkmaze.c` `makemaz`; `sp_lev.c`
  `load_special` / `create_object` achievement / `create_monster` appear_as.
- **Change:** `js/mklev.js` `load_minend_1` + dispatch — solidfill, centered
  map, place shuffle, arrival irregular room, locked doors, upstair,
  niche gems/mimics, mines_prize luckstone, random objs/traps/mons,
  wallify/flip/fixup.
- **Verification:** prefix **21119→21310** Scr **220→222** RNG
  **21217→21466**; green+strict PASS; cohort 7/7 PASS.
- **Next:** (superseded by D-0608) seed0361 @21310 mkobj class total.

## D-0606 — select_newcham_form + MAIL_DAEMON extract (@18684)

- **Status:** fixed (partial — continued as D-0607)
- **Symptom:** seed0361 @18684 — C `rn2(7) @ select_newcham_form` vs JS
  `rn2(75)` (`m_initweap`); after vamp-only stub, also C `rn2(330)` vs JS
  `rn2(329)` on the humanoid/random arms.
- **Cause:** (1) `select_newcham_form` only handled vampshifters, so
  doppelganger `newcham` failed and `allow_minvent` stayed true → trailing
  `rn2(75)`. (2) `extract-monsters.py` omitted `-DMAIL_STRUCTURES`, so
  `PM_MAIL_DAEMON` was missing and `SPECIAL_PM` was 329 vs recorder 330.
- **C locus:** `mon.c` `select_newcham_form` / `accept_newcham_form` /
  `newcham`; `wizard.c` `pick_nasty`; `topten.c` `tt_doppel`;
  `include/global.h` `MAIL_STRUCTURES`; `monsters.h` mail daemon.
- **Change:** Port doppel/sandestin/cham + random fallback +
  `accept_newcham_form`/`polyok`/`is_mplayer`/`pick_nasty`/`tt_doppel`
  stubs; regenerate `monsters_data.js` with `-DMAIL_STRUCTURES`.
- **Verification:** prefix **18684→21119** Scr **215→220** RNG
  **18774→21217**; green+strict PASS; cohort 7/7 (1500/1800/0060/0398/
  0373/5006/0116) PASS.
- **Next:** (superseded by D-0607) seed0361 @21119 minend-1 load.

## D-0605 — soko mimic boulder retry dead in C (@13839)

- **Status:** fixed (partial — continued as D-0606)
- **Symptom:** seed0361 @13839 — C `rn2(2) @ find_montype` vs JS
  `rn2(26) @ get_location` (second soko1-1 giant-mimic path).
- **Cause:** JS `create_mimic_as_boulder` retried `get_location` when
  `m_bad_boulder_spot` after makemon. C gates that retry on `m->x < 0`
  *after* `m->x = mtmp->mx` (`sp_lev.c` ~1992 then ~2041), so the retry
  never runs; C proceeds to the next `des.monster` `find_montype`.
- **C locus:** `sp_lev.c` `create_monster` M_AP_OBJECT boulder arm;
  `dat/soko1-1.lua` giant mimic `appear_as = obj:boulder`.
- **Change:** `js/mklev.js` `create_mimic_as_boulder` — drop post-makemon
  relocation RNG; keep `m_bad_boulder_spot` helper for the C-cited gate.
- **Verification:** prefix **13839→18684** Scr **215** RNG **18774**;
  green+strict PASS; cohort **31/31** PASS; full sessions **33/44**.
- **Next:** seed0361 @18684 C `select_newcham_form` vs JS `rn2(75)`;
  or Pri-strt / seed0014/0108.

## D-0604 — pri_move altar mill (@13719)

- **Status:** fixed (partial — next was @13839; continued as D-0605)
- **Symptom:** seed0361 @13719 — C `rn2(3) @ pri_move` vs JS `rn2(5)`
  (`distfleeck` on next mon).
- **Cause:** `pri_move` was a stay-put stub; peaceful temple priests never
  consumed `rn1(3,-1)×2` altar-mill RNG before `move_special`.
- **C locus:** `priest.c` `pri_move` / `histemple_at`; `monmove.c` `m_move`
  ispriest dispatch.
- **Change:** `js/shk.js` — port `histemple_at` + `pri_move` (mill, Conflict
  chase/`mattacku`, Invis avoid); `js/monmove.js` `await pri_move`.
- **Verification:** prefix **13719→13839** Scr **215** RNG **13889**;
  green+strict PASS; cohort **33/33** PASS.
- **Named omission:** `inhistemple`/`has_shrine`; `intemple` greetings;
  `m_break_boulder` / `m_move_aggress` in `move_special`.
- **Next:** seed0361 @13839 C `find_montype` vs JS `rn2(26)`; or Pri-strt.

## D-0603 — MS_PRIEST m_initweap / m_initinv (@12294)

- **Status:** fixed (partial — next `pri_move` @13719)
- **Symptom:** seed0361 @12294 — C `next_ident` (mace) vs JS `rn2(75)`
  at end of `m_initweap`.
- **Cause:** `m_initweap` / `m_initinv` omitted the MS_PRIEST arms
  (`mksobj(MACE)` + spe/curse; robe/cloak + SMALL_SHIELD + gold).
  Aligned cleric fell through to the trailing `rn2(75)` offensive roll.
- **C locus:** `makemon.c` `m_initweap` / `m_initinv` MS_PRIEST;
  `monsters.h` ALIGNED_CLERIC / HIGH_CLERIC.
- **Change:** `js/makemon.js` — gate by `ALIGNED_CLERIC`/`HIGH_CLERIC`
  mndx (tables omit `msound`); port both arms before guardian/else.
- **Verification:** prefix **12294→13719** Scr **205→215** RNG
  **12385→13837**; green+strict PASS; cohort **33/33** PASS.
- **Named omission:** `quest_mon_represents_role(PM_CLERIC)` +
  `PM_NINJA` kits; `pri_move` / `intemple`.
- **Next:** seed0361 @13719 `pri_move`; or Pri-strt / seed0014/0108.

## D-0602 — pick_room wizard ≡ flags.debug (@12288)

- **Status:** fixed (partial — next priest/makemon @12294)
- **Symptom:** seed0361 @12288 — C `shrine_pos rn2(2)` vs JS still
  `pick_room rn2(5)`.
- **Cause:** C `#define wizard flags.debug` (`flag.h`). Sessions use
  `playmode:debug` → `flags.debug`. `pick_room` is
  `doorct==1 || !rn2(5) || wizard`; with wizard set, after burning
  `rn2(5)=3` on rooms[3] C still accepts via the wizard clause. JS only
  checked `flags.wizard` (unset) so rejected and kept rolling.
- **Rejected:** THEMEROOM on r1/r4 + r2 doorct==1 (D-0601 FORCE). C
  recorder D:17 rooms match JS geometry/doorct (all OROOM defaults;
  r2 doorct=2); C temples rooms[3] (11×6). FORCE coincidentally reached
  12294 by skipping to a doorct==1 accept path.
- **C locus:** `flag.h` `wizard`; `mkroom.c` `pick_room`; options
  `playmode:debug`.
- **Change:** `js/mklev.js` `pick_room` — accept when
  `flags.wizard || flags.debug`.
- **Verification:** prefix **12288→12294** Scr **205**; green+strict
  PASS; cohort **31/31** PASS.
- **Named omission:** `mkshop` wizard/`ep` multi-door arm still absent;
  next @12294 C `next_ident` vs JS `rn2(75)` (priest gear path).
- **Next:** seed0361 @12294 priest/makemon inventory; or Pri-strt.

## D-0601 — make_niches depth + dosdoor mimic + @12288 THEMEROOM peel

- **Status:** fixed (partial — seed0361 still @12288; themerm rtype/doorct open)
- **Symptom:** seed0361 @12288 — C `shrine_pos rn2(2)` vs JS still
  `pick_room rn2(5)`. JS D:17 rooms all OROOM; no doorct==1 candidate.
- **Cause (shipped):** `make_niches` used `dlevel` and omitted `!noteleport`
  for ltptr (C: `depth(&u.uz)`); `makeniche` always ROCKTRAP'd holes
  (C: `Can_fall_thru`); `dosdoor` trapped→mimic omitted `makemon`/
  `set_mimic_sym` + G_GONE; special-room chain omitted G_GONE gates.
- **Diagnosis (next):** FORCE at mktemple — mark rooms[1]+[4] THEMEROOM
  and rooms[2] doorct=1 → prefix **12288→12294** (shrine/priest match).
  THEMEROOM alone insufficient; early `!needjoining` before corridors
  diverges @11832. So C skips r1+r4 as THEMEROOM **after** joining, and
  r2 (13×2) has doorct==1 — themerm `type=themed` pick vs JS OROOM, plus
  one fewer join door on the temple candidate.
- **C locus:** `mklev.c` `make_niches`/`makeniche`/`dosdoor`/`makelevel`
  special-room G_GONE; `themerms.lua` themed rooms; `mkroom.c` `pick_room`.
- **Change:** `js/mklev.js` — niches depth/noteleport + Can_fall_thru;
  dosdoor mimic; G_GONE on LEPREHALL/BEEHIVE/BARRACKS/COCKNEST.
- **Verification:** green+strict PASS; cohort **18/18** PASS (seed0361
  still FAIL @12288 Scr 205); seed0361 prefix unchanged **12288**.
- **Named omission:** themerm rooms[1]/4] stay OROOM; r2 doorct=2;
  antholemon() gate still always-true.
- **Next:** why JS creates OROOM where C has THEMEROOM at those indices
  (reservoir / Default themed-fill), and why r2 gets a second join door.

## D-0600 — mktemple / priestini / newepri (@12287)

- **Status:** fixed (partial — pick_room succeeds only when a doorct==1
  OROOM exists; SWAMP/`mkswamp`; `pri_move`/`intemple` deferred)
- **Symptom:** seed0361 @12287 — C `rn2(5) @ pick_room` vs JS `rn2(3)`.
- **Cause:** `do_mkroom(TEMPLE)` was a stub (no RNG). C runs
  `mktemple` → `pick_room(TRUE)` (no downstairs `rn2(3)`); JS fell
  through to later `rn2(3)` (fill path). After wiring mktemple, first
  `pick_room` `rn2(5)` matches; next miss @12288 C `shrine_pos` rn2(2)
  vs JS still in `pick_room` rn2(5) — JS has **no** doorct==1 OROOM
  (room2 doorct=2; C accepts via doorct==1, shrine_pos parity ⇒ ~13×2).
- **C locus:** `mkroom.c` `mktemple`/`shrine_pos`/`pick_room`;
  `priest.c` `priestini`; `makemon` `MM_EPRI`/`newepri`.
- **Change:** `js/mklev.js` — `shrine_pos`, `mktemple`, `priestini`,
  wire TEMPLE in `do_mkroom`; `js/makemon.js` — `newepri` + `MM_EPRI`.
- **Verification:** prefix **12287→12288** (runner RNG **12384→12375**,
  Scr **205**/366); green+strict PASS; cohort **31/31** PASS.
- **Named omission:** SWAMP/`mkswamp`; sanctum high-cleric path;
  `pri_move`/`intemple`; doorct vs C on this level (next peel).
- **Next:** seed0361 @12288 doorct / extra door on temple candidate;
  or Pri-strt seed0367.

## D-0599 — rolling boulder trap launch_obj (@11065)

- **Status:** fixed (partial — mid-roll landmine/telep/pit/`hits_bars`/
  boulder-chain; LAUNCH_UNSEEN rumble msgs deferred)
- **Symptom:** seed0361 @11065 — C `rnd(20) @ dmgval` vs JS `rn2(5)`
  `distfleeck`. C screen: "Click!  You trigger a rolling boulder trap!
  A boulder misses you."
- **Cause:** `trapeffect_selector` omitted `ROLLING_BOULDER_TRAP`; hero
  step fired no `launch_obj`, so boulder `dmgval`/`thitu` never ran and
  JS fell through to the next mon's `distfleeck`.
- **C locus:** `trap.c` `trapeffect_rolling_boulder_trap` / `launch_obj`.
- **Change:** `js/trap.js` — hero+mon rolling-boulder trapeffect +
  `launch_obj` ROLL path (otherside boulder, hero `dmgval`+`thitu`, mon
  `ohitmon`/throws_rocks snatch); export `ohitmon` from `mthrowu.js`.
- **Verification:** seed0361 prefix **11065→12287**, Scr **198→205**,
  RNG matched **11737→12384**; green+strict PASS; cohort **31/31** PASS.
- **Next:** seed0361 @12287 `pick_room` rn2(5) vs rn2(3); or Pri-strt.

## D-0598 — searches_for_item (POT_HEALING gg → @7973)

- **Status:** fixed (partial — FOOD corpse/tin/egg; Is_container/`can_blow`;
  onscary underfoot gate deferred)
- **Symptom:** seed0361 @7973 — C `rn2(20) @ m_move` vs JS `rn2(32)`.
- **Cause:** JS `mon_would_take_item` omitted C `searches_for_item`. Mountain
  centaur (!animal, !mindless, !likes_magic) never sought `POT_HEALING` at
  (70,4); JS `gg` stayed on hero → nearer-path drifted mon to (71,5) cnt=8
  vs C (71,4) against HWALL cnt=5.
- **Evidence:** C recorder DIAG at ri=7973: mon=132 at=(71,4) cnt=5
  gg=(70,4) poss five ROOM cells; JS DIAG had at=(71,5) cnt=8 gg=(12,7).
- **Rejected:** mfndpos pool/lava/onscary/squeeze as @7973 root (D-0597).
- **C locus:** `muse.c` `searches_for_item`; `monmove.c` `mon_would_take_item`.
- **Change:** `js/muse.js` export `searches_for_item` (potion/wand/scroll/
  amulet/tool subset); `js/monmove.js` wire + unicorn GEMSTONE gate.
- **Verification:** seed0361 prefix **7973→11065**, Scr **195→198**, RNG
  **8210→11737**; green+strict PASS; cohort **31/31** PASS.
- **Named omission:** FOOD arms; containers/`can_blow`; onscary floor gate.
- **Next:** seed0361 @11065 C `rnd(20) @ dmgval` vs JS `rn2(5)`.

## D-0597 — mfndpos pool/lava/waterwall + ALLOW_WALL (not @7973)

- **Status:** fixed (partial port retained; primary symptom was D-0598)
- **Symptom:** seed0361 @7973 — C `rn2(20) @ m_move:1963` vs JS
  `rn2(32)` (track `rn2(4*(cnt-j))`).
- **Cause (partial):** JS `mfndpos` omitted C poolok/lavaok /
  `IS_WATERWALL` / LAVAWALL gates and `passes_walls` → `ALLOW_WALL`.
  Ported those from `mon.c`.
- **Rejected as @7973 root:** DIAG showed mountain centaur at (71,5)
  Dlvl14 room 69–77×4–6 with **cnt=8** all-ROOM neighbors and empty
  reject list after the new gates; mtrack[0]=(72,4) → `rn2(32)`. C
  wants cnt−j=5. Giant spider later matches C `rn2(24)`/`rn2(20)`.
  Diagonal `bad_rock` squeeze needs wall flanks — absent in this room.
- **C locus:** `mon.c` `mfndpos` / `mon_allowflags` / `m_in_air`.
- **Change:** `js/mon.js` — pool/lava/waterwall/LAVAWALL gates;
  `ALLOW_WALL` on `passes_walls`; thrudoor includes `ALLOW_WALL|BUSTDOOR`.
- **Verification:** green+strict PASS; cohort seed1500/1800/0060/0700/
  0017/0398/0116/5006 **8/8** PASS; seed0361 prefix still **7973**,
  Scr **195**/366, RNG **8210**/53865.
- **Named omission:** onscary/garlic/iron bars/poison-gas/`bad_rock`
  squeeze/`mm_aggression`/MDISP; eel `nexttry`; `may_passwall` body.
- **Next:** seed0361 @7973 — C-side poss dump or remaining filters /
  mtrack `j`; or seed0367 `Pri-strt`.

## D-0596 — set_wear / Helmet_on fedora Archeologist luck

- **Status:** fixed (partial — `Ring_on` learnring/attrib bodies;
  `pickup(1)` after set_wear still deferred; poly_obj `set_wear(obj)`
  callers may still be incomplete)
- **Symptom:** seed0361 @7924 — C `rnl(20) @ doopen_indir` vs JS
  `rn2(38)` (logged inside `rnl` with `Luck=-1`).
- **Cause:** `moveloop_preamble` never called C `set_wear(NULL)`, so
  starting fedora never ran `Helmet_on` → `change_luck(1)`. Taking the
  fedora off still ran `Helmet_off` → `change_luck(-1)`, leaving
  `uluck=-1`. Non-zero Luck made `rnl(20)` burn `rn2(37+|Luck|)`.
- **Rejected:** broken `doopen_indir` / missing autoopen; wrong `rnl`
  formula; friday13 false positive (flags.friday13 was false).
- **C locus:** `do_wear.c` `set_wear` / `Helmet_on` / `Helmet_off`;
  `allmain.c` `moveloop_preamble` `set_wear((struct obj *) 0)`.
- **Change:** `js/do_wear.js` — export `set_wear`; `js/allmain.js` —
  `await set_wear(null)` after `rndencode`, before `reset_justpicked`
  / `seer_turn` (C order).
- **Verification:** seed0361 prefix **7924→7973** (runner Scr
  **181→195**, RNG **8215→8210**); green+strict PASS; cohort 31/31
  PASS; full suite **33/44** Scr **6587**/11405 RNG **363924**/792838.
  Next @7973 `m_move` `rn2(20)` vs `rn2(32)`.
- **Named omission:** `Ring_on` body; initial `pickup(1)`;
  `gi.initial_don` message suppress for deferred toggle_*.
- **Next:** seed0361 `m_move` @7973; or Pri-strt seed0367.

## D-0595 — postmov maybe_spin_web + webmaker

- **Status:** fixed (partial — shop `add_damage`; y_monnam/something
  pline polish still deferred)
- **Symptom:** seed0361 @7844 — C `rn2(1000) @ maybe_spin_web` vs JS
  `rn2(5)` (`distfleeck` on next mon).
- **Cause:** JS `postmov` stubbed `maybe_spin_web` entirely, so a
  cave/giant spider that passed the C gate never burned `rn2(1000)`.
- **C locus:** `monmove.c` `maybe_spin_web` / `holds_up_web` /
  `count_webbing_walls` / `soko_allow_web`; `mondata.h` `webmaker`;
  `trap.c` `count_traps`.
- **Change:** `js/monsters.js` — `webmaker`; `js/trap.js` —
  `count_traps` + WEB `m_harmless_trap` webmaker; `js/monmove.js` —
  port helpers + `await maybe_spin_web` before hides_under.
- **Verification:** seed0361 prefix **7844→7924** (runner RNG
  **8126→8215**, Scr **180→181**); green+strict PASS; cohort 33/33 PASS.
  Next @7924 `doopen_indir` `rnl(20)` vs JS `rn2(38)`.
- **Named omission:** shop `add_damage` after spin; fancy pline naming.
- **Next:** seed0361 `doopen_indir` @7924; or Pri-strt seed0367.

## D-0594 — place_branch mkportal + goto_level portal arm

- **Status:** fixed (partial — debug_fuzzer `ucamefrom` mkportal dest;
  seal `UTOTYPE_RMPORTAL` deltrap / remdun_mapseen still deferred)
- **Symptom:** seed0361 @7837 — C `rn2(300) @ dosounds` vs JS `rnl(7)`
  (`dosearch0` on adjacent SDOOR). NOTES nsinks=0 theory falsified
  (`nsinks=1`); real issue was stale hero pos after quest expulsion.
- **Cause:** first expulsion uses `UTOTYPE_PORTAL`, but JS skipped the
  portal placement arm (`if (!portal) u_on_rndspot`) and `place_branch`
  stubbed `BR_PORTAL` without `mkportal`, so no MAGIC_PORTAL existed and
  the hero stayed at pre-goto coordinates next to a court SDOOR.
- **C locus:** `mkmaze.c` `mkportal`; `mklev.c` `place_branch` BR_PORTAL;
  `do.c` `goto_level` portal / missing-portal → `u_on_rndspot(0)`.
- **Change:** `js/mklev.js` — `mkportal` + wire `place_branch` BR_PORTAL;
  `js/do.js` — portal arm finds MAGIC_PORTAL → `seetrap`/`u_on_newpos`,
  else `u_on_rndspot(0)`.
- **Verification:** seed0361 prefix **7837→7844** (runner RNG
  **7974→8126**, Scr **178→180**); green+strict PASS; cohort 31/31 PASS.
  Next @7844 `maybe_spin_web` `rn2(1000)` vs JS `rn2(5)`.
- **Named omission:** debug_fuzzer `ucamefrom` portal dest; seal
  RMPORTAL deltrap / remdun_mapseen.
- **Next:** seed0361 `maybe_spin_web` @7844; or Pri-strt seed0367.

## D-0593 — fill_zoo COURT throne / courtmon / chest

- **Status:** fixed (partial — BEEHIVE queen, MORGUE/BARRACKS/ANTHOLE
  typed mons + loot arms still deferred)
- **Symptom:** seed0361 @5859 — C `rn2(6) @ somex` vs JS `rn2(3)`.
- **Cause:** JS `fill_zoo` skipped COURT pre-loop (`somexyspace` →
  `mk_zoo_thronemon`), used `makemon(NULL)` instead of `courtmon`, and
  omitted throne terrain + coffer chest / `has_court`.
- **C locus:** `mkroom.c` `fill_zoo` / `mk_zoo_thronemon` / `courtmon`;
  helpers `somex`/`somey`/`somexyspace`.
- **Change:** `js/mklev.js` — port COURT arm (maze throne scan,
  `mk_zoo_thronemon`, `courtmon`, skip-IS_THRONE, hostile set_malign,
  THRONE+chest+gold+`has_court`).
- **Verification:** seed0361 prefix **5859→7837** (runner RNG
  **5934→7974**, Scr **178**/366); green+strict PASS; cohort 31/31 PASS.
  Next @7837 `dosounds` nsinks `rn2(300)` vs JS `rnl(7)`.
- **Named omission:** BEEHIVE queen/`PM_KILLER_BEE`; MORGUE/
  BARRACKS/ANTHOLE loot + `squadmon`/`morguemon`/`antholemon`;
  TEMPLE/`mktemple`; SWAMP/`mkswamp`.
- **Next:** seed0361 `dosounds` nsinks @7837; or Pri-strt seed0367.

## D-0592 — do_mkroom COURT → pick_room / mkzoo

- **Status:** fixed (partial — TEMPLE/SWAMP + COURT fill_zoo next)
- **Symptom:** seed0361 @5483 — C `rn2(6) @ pick_room` vs JS `rn2(4)`.
  NOTES misread as room-count drift; both sides had `nroom=6`
  (makecorridors/`generate_stairs` already used `rn2(6)`).
- **Cause:** JS `do_mkroom` only handled shops; COURT/ZOO/… were stubs, so
  after `!rn2(6)` COURT gate JS skipped `pick_room` and jumped to
  `place_branch` → `generate_stairs_find_room` (`rn2(4)`).
- **C locus:** `mkroom.c` `do_mkroom` / `mkzoo` / `pick_room`; caller
  `makelevel` special-room chain (`mklev.c:1344–1375`).
- **Change:** `js/mklev.js` — port `pick_room` (strict/non-strict +
  short-circuit), `mkzoo` (rtype + `FILL_NORMAL`), wire COURT/ZOO/
  BEEHIVE/MORGUE/BARRACKS/LEPREHALL/COCKNEST/ANTHOLE through `do_mkroom`.
- **Verification:** seed0361 prefix **5483→5859** (runner RNG
  **5605→5934**, Scr **175**/366); green+strict PASS; cohort 31/31 PASS.
  Next @5859 COURT `fill_zoo` / `mk_zoo_thronemon` (`somex` vs JS).
- **Named omission:** `mktemple` / `mkswamp`; COURT throne/`mk_zoo_thronemon`
  / `courtmon` in `fill_zoo`; `has_court` flag.
- **Next:** seed0361 COURT `fill_zoo` @5859; or Pri-strt seed0367.

## D-0591 — movemon deferred_goto after schedule_goto

- **Status:** fixed
- **Symptom:** seed0361 @4368 — C `rn2(3) @ getbones` vs JS `rn2(5)`
  (makelevel Medusa gate without prior getbones chance roll).
- **Cause:** Quest `expulsion` → `schedule_goto` during `dochug` /
  `movemon`. C `movemon` ends with `if (u.utotype) deferred_goto()`
  (`mon.c` ~1342–1347); JS only ran `deferred_goto` after `rhack`, so
  expulsion return never reached `mklev`/`getbones` on that tick.
- **C locus:** `mon.c` `movemon`; callers `schedule_goto`/`deferred_goto`
  (`do.c`); `getbones` chance `rn2(3)` (`bones.c:645`).
- **Change:** `js/mon.js` `movemon` — lazy-import `deferred_goto` when
  `u.utotype`, then clear `_somebody_can_move` (avoid do.js cycle).
- **Verification:** seed0361 prefix **4368→5483** (runner RNG
  **4516→5605**, Scr **178**/366); next @5483 `pick_room`.
  green+strict PASS; cohort 31/31 prior PASS held.
- **Named omission:** `any_light_source` vision recalc; `clear_bypasses`;
  `clear_splitobjs`; `dmonsfree` before utotype check.
- **Next:** seed0361 `pick_room` @5483; or Pri-strt seed0367 @2040.

## D-0590 — ^T dotelecmd + controlled tele + STRAT_CLOSE quest_talk

- **Status:** fixed (partial — Arc-loca getbones next; assignquest path)
- **Symptom:** seed0361 @4363 — C nhlib `shuffle` vs JS `rn2(5)`. Prior
  NOTES read as quest-map load; session `^T` getpos then `.` confirms
  teleport beside Carnarvon, then `quest_talk` → `leader_first` shuffle.
- **Cause:** (1) `rhack` omitted `^T`/`dotelecmd`; `scrolltele` deferred
  controlled `getpos` (hero never reached leader). (2) `makemon` omitted
  `M3_CLOSE`→`STRAT_CLOSE` + `leader_m_id`; `dochug` deferred
  `STRAT_CLOSE`→`quest_talk`. (3) Arc role lacked `ldrnum`/`homebase`.
- **C locus:** `teleport.c` `dotelecmd`/`dotele`/`scrolltele`;
  `makemon.c` mflags3 STRAT + leader_m_id; `monmove.c` `dochug`
  WAITMASK; `quest.c` `quest_talk`/`chat_with_leader`/`is_pure`/
  `expulsion`; `dat/quest.lua` Arc leader_first/badalign.
- **Change:** `js/teleport.js` controlled getpos + `dotele`/`dotelecmd`;
  `js/cmd.js` `^T`; `js/makemon.js` STRAT_CLOSE + leader_m_id;
  `js/monmove.js` quest_talk; `js/quest.js` leader chat/is_pure/
  expulsion; `js/questpgr.js` Arc texts; `js/roles.js` Arc quest
  fields; `js/mklev.js` `load_arc_loca` (prep, not exercised @4368).
- **Verification:** seed0361 prefix **4363→4368** (runner RNG
  **4414→4516**, Scr **161→178**/366); next @4368 `getbones`.
  green+strict PASS; cohort 31/31 prior PASS held.
- **Named omission:** assignquest/encourage/banished; m-prefix ^T menu;
  trap-at-feet dotele; non-wizard energy; Arc-fila/goal; expulsion
  RMPORTAL seal.
- **Next:** seed0361 expulsion return `getbones` @4368; or Pri-strt
  seed0367 @2040.

## D-0589 — m_move hides_under rn2(10) stay-put

- **Status:** fixed
- **Symptom:** seed0361 @4247 — C `rn2(10) @ m_move(monmove.c:1753)` vs
  JS `rn2(5)` (distfleeck on next mon).
- **Cause:** `m_move` omitted C’s early return for concealers sitting on
  hide-able floor objects (`hides_under` + `OBJ_AT` +
  `can_hide_under_obj` + `rn2(10)` → `MMOVE_NOTHING` before
  `set_apparxy`).
- **C locus:** `monmove.c` `m_move` (~1751–1754); reuse
  `can_hide_under_obj` (D-0496).
- **Change:** `js/monmove.js` — port stay-put gate; refresh `ptr` after
  `mintrap` like C.
- **Verification:** seed0361 prefix **4247→4363** (runner RNG
  **4323→4414**, Scr **161**/366); next @4363 nhlib `shuffle`.
  green+strict PASS; cohort 33/33 prior PASS held.
- **Named omission:** `is_rider` unlock; covetous/special AI gaps already
  listed in turns.md.
- **Next:** seed0361 @4363 nhlib shuffle (likely next quest map load);
  or seed0367 `Pri-strt` @2040.

## D-0588 — Arc-strt load_special + invent discard + nartifact artif gate

- **Status:** fixed
- **Symptom:** seed0361 @3293 — C `nhlib` shuffle / `splev_initlev` vs JS
  ordinary `rn2(79)` after `getbones` into Archeologist quest start.
- **Cause:** (1) `makemaz`/`load_special_proto` omitted `Arc-strt`. (2) After
  porting the map, CUSTOM_INVENT discard skipped C `mdrop_special_objs`
  `obj_resists(0,0)` per invent item. (3) `mksobj_init` armor/weapon artif
  used fixed `rn2(40)`/`rn2(20)` instead of `+ 10 * nartifact_exist()`
  (Grayswandir wish → C `rn2(50)`/`rn2(30)`).
- **C locus:** `dat/Arc-strt.lua`; `sp_lev.c` `create_monster` /
  `mdrop_special_objs` (`steal.c`); `mkobj.c` `mksobj_init` WEAPON/ARMOR
  artif; `artifact.c` `nartifact_exist`.
- **Change:** `js/mklev.js` — `load_arc_strt` + dispatch; shared
  `splev_discard_default_minvent` (also Bar-strt Pelias). `js/mkobj.js` —
  artif gates use `nartifact_exist()`.
- **Verification:** seed0361 prefix **3293→4247** (runner RNG
  **3307→4323**, Scr **160→161**/366); next @4247 `m_move`. green+strict
  PASS; cohort seed0373/0116/1500/1800/0060/0102/0700/0398/5006/0017/0077
  PASS; seed0367 still FAIL @2040 (Pri-strt).
- **Named omission:** Arc-loca/fila/filb/goal; Pri-*/other quest starts;
  Carnarvon/`m_dowear`; humidity get_location for water-likers.
- **Next:** seed0361 `m_move` @4247; or `Pri-strt` for seed0367.

## D-0587 — ^X Status armor nudity + Teleport_control what_gives

- **Status:** fixed
- **Symptom:** seed0116 Scr **126**/127; @122 ^X page 2 — C
  `You aren't wearing any armor.` blank before Attributes, and
  `You have teleport control because of your ivory ring.` before luck;
  JS omitted both → layout shift / short page.
- **Cause:** (1) `doattributes` never reported Status nudity after
  `weapon_insight` (`!uarm && !uarmu && …` / `wearing_armor`).
  (2) Attributes omitted `Teleport_control` + `from_what` lacked
  `what_gives` extrinsic worn equipment.
- **C locus:** `insight.c` `status_enlightenment` nudity;
  `attributes_enlightenment` Teleport_control; `attrib.c` `from_what`;
  `artifact.c` `what_gives`.
- **Change:** `js/invent.js` `doattributes` armor nudity + Teleport_control
  line; `js/attrib.js` `from_what`→`what_gives`; `js/artifact.js`
  `what_gives` wornmask match.
- **Verification:** seed0116 Scr **126→127**/127 RNG FULL **PASS** +
  strict; green+strict PASS; cohort **31**/31 PASS.
- **Named omission:** Jumping/Teleportation; artifact what_gives arms;
  full attributes catalogue; Blind/Stun Status; poly/ride/trap.
- **Next:** leaderboard cron; or earliest remaining suite FAIL
  (seed0361/0367 quest).

## D-0586 — dospellmenu wizard turns column (seed0116 Scr)

- **Status:** fixed (partial — seed0116 residual @122 enlightenment)
- **Symptom:** seed0116 Scr **125**/127; @117 “Currently known spells”
  menu — C leftward (offx smaller) with trailing `turns` / `19977`;
  JS missing column → narrower maxcol → larger offx (looked like
  “title centering”). RNG already FULL.
- **Cause:** C `spell.c` `dospellmenu` when `wizard` appends
  `"%c%6s"/turns` to the heading and `"%c%6d"/spellknow(i)` to each
  spell line (`wizard` ≡ `flags.debug`). JS omitted that branch.
- **C locus:** `spell.c` `dospellmenu` (wizard turns); `flag.h`
  `#define wizard flags.debug`.
- **Change:** `js/spell.js` `dospellmenu` — wizard heading
  `Fail Retention  turns` (`%6s` pad) + line ` spellknow(i)` `%6d`.
- **Verification:** seed0116 Scr **125→126**/127 RNG FULL; green+strict
  PASS; cohort **30**/30 PASS (seed0106 priest + seed0006/0398 wizard).
- **Named omission:** swap/sort; seed0116 @122 ^X armor nudity +
  Teleport_control `from_what`.
- **Next:** seed0116 @122 enlightenment; or leaderboard.

## D-0585 — does_block is_lightblocker_mappear (seed0116 Scr)

- **Status:** fixed (partial — seed0116 residual @117/@122 menu layout)
- **Symptom:** seed0116 Scr **116**/127; @114 after Sokoban materialize —
  C boulder `` ` `` vs JS floor `·` at screen (32,13)=map (33,12).
  RNG already FULL. Cell holds giant mimic `M_AP_OBJECT`/BOULDER;
  `cansee` false (vision hole) so newsym painted premap floor memory.
- **Cause:** C `vision.c` `does_block` treats `is_lightblocker_mappear`
  (mimic-as-boulder) like a real boulder. Algorithm C marks blocking
  edge cells COULD_SEE; clear cells only reachable through a wall via
  Bresenham stay unmarked. JS `_blocks` omitted mimics → (33,12) clear
  but unreachable → hole → floor glyph.
- **C locus:** `vision.c` `does_block`; `monst.h` `is_lightblocker_mappear`;
  `sp_lev.c` create_monster `block_point` after appear_as.
- **Change:** `js/vision.js` `_blocks` + `is_lightblocker_mappear`
  (BOULDER object + furniture door/wall/tree).
- **Verification:** seed0116 Scr **116→125**/127 RNG FULL; green+strict
  PASS; cohort **30**/30 PASS (excl. seed0116 residual); seed0373 PASS.
- **Named omission:** gas-cloud region return 2; `seemimic`/`set_mimic_blocking`
  incremental block_point; seed0116 @117 spells / @122 enlightenment layout.
- **Next:** seed0116 @117 “Currently known spells” centering; or leaderboard.

## D-0584 — wear/puton empty getobj prompt `[*]` (seed0116 Scr)

- **Status:** fixed
- **Symptom:** seed0116 first Scr miss @14 — C `What do you want to
  wear? [*]` vs JS `… [*?]`; cursor col 30 vs 31. RNG already FULL.
- **Cause:** C `invent.c` `getobj` when suggested `buf` empty uses
  `Strcat(qbuf, " [*]")`; JS wear/puton empty arms used `[*?]`.
  (DOWNPLAY accessories still force the prompt via `forceprompt`.)
- **C locus:** `invent.c` `getobj` empty-buf prompt; `do_wear.c`
  `wear_ok`/`puton_ok` → `equip_ok`.
- **Change:** `js/do_wear.js` `getobj_wear` / `getobj_puton` empty
  prompt → `[*]` (match takeoff / drink / zap / …).
- **Verification:** seed0116 Scr **115→116**/127 RNG FULL; green+strict
  PASS; cohort **30**/30 PASS.
- **Named omission:** shared getobj still per-caller; `?`/`*` pickinv
  for wear; seed0116 @114 materialize map glyph `` ` `` vs `·`.
- **Next:** seed0116 @114 post-teleport map cell (32,13).

## D-0583 — getbones yn leave-level gbuf mon→memory (seed5006 Scr)

- **Status:** fixed
- **Symptom:** seed5006 Scr **247**/249 after D-0582; @198/@199 Get bones?/
  Unlink bones? — C DEC floor `~` beside `@` vs JS live cyan `u`.
- **Cause:** C `vision_recalc(2)` newsyms prior IN_SIGHT into persistent
  gbuf (mon→memory) before mklev; Get bones? yn `flush_screen` paints that
  gbuf before `flush_screen(-1)` postpone. JS skipped the control==2 newsym
  loop (gbuf≡`loc.disp_*`; early flush regresses other seeds) and stale-map
  yn only refreshed topline/status, leaving the live mon glyph on Terminal.
- **C locus:** `vision.c` `vision_recalc(2)`; `bones.c` `getbones` yn;
  `do.c` `goto_level` order vs postpone.
- **Change:** snapshot pre-leave viz; on Get bones? apply
  `vision_off_newsym_gbuf` on stashed leave-level + paint dirty `gnew`
  cells to Terminal (`paint_gbuf_level_to_terminal`). Ordinary
  `vision_recalc(2)` still skips the loop (named omission).
- **Verification:** seed5006 Scr **247→249**/249 RNG FULL PASS;
  green+strict PASS; cohort **29**/29 PASS (seed0116 115/127 held);
  seed0002/0012/0013-restore stay PASS.
- **Named omission:** full `vision_recalc(2)` newsym loop in ordinary
  path (needs separate gbuf≠display or tty snapshot); `notice_all_mons`.
- **Next:** seed0116 Scr 115/127; or leaderboard 22-vs-32 gap.

## D-0582 — identify more_experienced(0,10) (seed5006 Scr)

- **Status:** fixed (partial — Get bones? map glyphs @198/@199)
- **Symptom:** seed5006 Scr **246**/249 after D-0581; first miss @187 —
  death summary points **134** vs **144** (pre-death urexp 30 vs ~40).
- **Cause:** `dopotion` called `makeknown` on clear potion ID but omitted
  C’s `more_experienced(0, 10)`; same score bonus deferred in
  `weffects`/`zapnodir` disclose paths.
- **C locus:** `potion.c` `dopotion`; `zap.c` `weffects` / `zapnodir`.
- **Change:** port `more_experienced(0, 10)` after potion `makeknown` and
  on wand disclose/zapnodir when type was unknown.
- **Verification:** seed5006 Scr **246→247**/249 RNG FULL; first remaining
  miss @198 Get-bones map (water `~` vs prior floor); green+strict PASS;
  cohort **29**/29 PASS; seed0116 Scr **115**/127 held.
- **Named omission:** Get bones? yn map still shows prior-level floor
  glyphs where C has water (`~`); other identify XP sites (engrave, etc.).
- **Next:** seed5006 @198/@199 Get bones? map glyphs; or seed0116 115/127.

## D-0581 — wizard Die?/bones yn + hidden_gold (seed5006 Scr)

- **Status:** fixed (partial — death urexp 134 vs 144 @187; Get bones?
  stale map glyph content)
- **Symptom:** seed5006 Scr **230**/249 after D-0580; first miss @185 —
  C `Die? [yn] (n)` / `Save bones?` vs JS already on death RIP summary.
- **Cause:** `done` omitted wizard·discover `Die?` + `savelife`;
  `really_done` omitted `Save bones?`; `getbones` omitted Get/Unlink;
  `savebones` omitted Replace; score omitted `hidden_gold`; death-ray
  killer used `u.female` instead of `flags.female` (`uhim`).
- **C locus:** `end.c` `done`/`savelife`/`really_done`; `bones.c`
  `getbones`/`savebones`; `vault.c` `hidden_gold`; `zap.c` WAN_DEATH;
  `you.h` `uhim`.
- **Change:** port Die?/savelife/Save bones?/Get/Unlink/Replace yn;
  `hidden_gold`/`contained_gold` in score; zap `flags.female`; stale-map
  flush + botl on `uz` assign during getbones yn.
- **Verification:** seed5006 Scr **230→246**/249 RNG FULL; green+strict
  PASS; cohort **29**/29 PASS; seed0116 Scr **115**/127 held.
- **Named omission:** Lifesaved amulet; ParanoidDie/Bones getlin;
  savelife Sick/endmultishot/uswallow; Get bones? stale map content
  (DEC water vs prior-level glyphs); pre-death urexp 30 vs ~40.
- **Next:** seed5006 @187 points 134 vs 144; or map glyphs @198; or
  seed0116 Scr 115/127.

## D-0580 — doread confused mispronounce before seffects (seed5006 Scr)

- **Status:** fixed (partial — Die?/Save-bones yn @185; other seffect_*)
- **Symptom:** seed5006 Scr **228**/249 after D-0579; first miss @162 —
  C `Being confused, you mispronounce the magic words...--More--` vs JS
  immediate `To what level do you want to teleport?`.
- **Cause:** `doread` deferred the Confusion pline that C emits after the
  scroll-disappear message and before `seffects` → `level_tele`.
- **C locus:** `read.c` `doread` (`confused` + `can_chant` silently /
  Hallucination arms); callers via `seffect_teleportation` → `level_tele`.
- **Change:** port confused/Hallu mispronounce plines; Blind
  cogitate/pronounce via exported `can_chant` (Strangled subset).
- **Verification:** seed5006 Scr **228→230**/249 RNG FULL; first miss
  @185 Die?; green+strict PASS; cohort **31**/31 PASS; seed0116
  Scr **115**/127 unchanged.
- **Named omission:** `can_chant` poly silent/headless/buzz/burble;
  seed5006 Die?/Save-bones yn timing @185.
- **Next:** seed5006 @185 Die?/bones yn; or seed0116 Scr 115/127.

## D-0579 — equip getobj SUGGEST + Blindf_on / Blind vision (seed5006 Scr)

- **Status:** fixed (partial — confused scroll mispronounce @162; Die?/
  Save-bones yn timing; other E* prop mirrors)
- **Symptom:** seed5006 Scr **217**/249 after D-0578 RNG FULL; first miss
  @109 puton `[mno]` vs C `[no]`; wear/takeoff DOWNPLAY letters; Blind
  status missing; hitmsg named monster overflow → `--More--` desync.
- **Cause:** (1) `puton_lets`/`wear_lets`/`takeoff_lets` listed
  GETOBJ_DOWNPLAY letters in the prompt (C `equip_ok` only SUGGEST).
  (2) `cursed()` plural used quan>1 only — C also boots/gloves/lenses.
  (3) Blindf_on stubbed; `confer_oc_oprop` set `uprops[BLINDED]` but not
  flat `EBlinded`; `vision_recalc` never took C Blind arm (kept IN_SIGHT).
  (4) `hitmu` omitted `map_invisible` when `!canspotmon`.
- **C locus:** `do_wear.c` `equip_ok`/`puton_ok`/`wear_ok`/`takeoff_ok`/
  `cursed`/`Blindf_on`/`Blindf_off`; `vision.c` Blind `vision_recalc`;
  `mhitu.c` `hitmu` map_invisible; `youprop.h` EBlinded.
- **Change:** SUGGEST-only wear prompts; cursed plural; Blindf_on/off +
  EBlinded mirror; Blind vision_recalc; hitmu map_invisible.
- **Verification:** seed5006 Scr **217→228**/249 RNG FULL; seed0116
  **114→115**/127; green+strict PASS; cohort 10/10 PASS (seed0373/0398/
  0030/0009/…).
- **Named omission:** `inaccessible_equipment` in takeoff_ok; remove_ok
  (R) SUGGEST accessories; Punished set_bc / full toggle_blindness
  see_monsters; other E* mirrors; seed5006 @162 confused mispronounce.
- **Next:** seed5006 @162 confused scroll/spellbook; or seed0116 residual.

## D-0578 — bones utrack → hostile gettrack (seed5006 seg1 kitten)

- **Status:** fixed
- **Symptom:** seed5006 seg1 @2782 C `rn2(16)` `m_move:1963` vs JS
  `rn2(28)` — after D-0577 familiar prefix.
- **Cause:** C `savelev`/`getlev` persist hero `utrack` in bones
  (`save_track`/`rest_track`). Dead hero’s footprints near the grave
  let `can_track` kitten `gettrack` set `gg` to an adjacent track
  (grave (31,5)) → first dest (30,5) → second-move single `rn2(16)`.
  JS bones omitted track; `goto_level` also `initrack()` after
  `mklev`/`getbones`, wiping any restore. Kitten then aimed at live
  hero (51,14) → dest (32,4) → `rn2(28)+rn2(24)`.
- **C locus:** `save.c` `savelev`→`save_track`; `restore.c` `getlev`
  →`rest_track`; `track.c` `gettrack`; `monmove.c` `m_move` track goal.
- **Change:** `write_bonesfile` stores `save_track()` snap; `getbones`
  `rest_track`; remove post-`mklev` `initrack` in `goto_level`.
- **Verification:** seed5006 RNG **FULL** 13923/13923 Scr **192→217**/249;
  green+strict PASS; cohort **31**/31 PASS (incl. seed0373/0398).
- **Named omission:** hostile `m_move` still lacks `chi` /
  `m_avoid_kicked_loc` / MDISP skip / shortsighted; `mfndpos` pool/
  lava/onscary/squeeze; seed5006 Scr residual 217/249.
- **Next:** seed5006 screen residual; or seed0116 Scr 114/127.

## D-0577 — familiar_level_msg + cemetery bonesinfo (seed5006 seg1)

- **Status:** fixed (partial — formatkiller/when; Gehennom valley plines;
  nested cemetery polish)
- **Symptom:** seed5006 seg1 @2777 C `rn2(4)` `familiar_level_msg` vs JS
  `rn2(7)` `do_attack` — after bones load + `losedogs`.
- **Cause:** `savebones` omitted cemetery `bonesinfo`; `goto_level` never
  called `familiar_level_msg`. With `playmode:debug`, `set_playmode`
  sets `plname="wizard"` so Calamity bones `who=wizard-Tou-…` matches
  Galahad’s `bones_include_name("wizard")`. False lead: `rng-diff`
  only runs seg0 (FULL @11026 / `randomize_gem_colors` is seg1 start).
- **C locus:** `bones.c` cemetery attach + `bones_include_name`;
  `do.c` `familiar_level_msg` / `goto_level` `familiar` after mklev.
- **Change:** persist/restore `bonesinfo`; `bones_include_name`;
  `familiar_level_msg` after `deliver_splev_message` when familiar.
- **Verification:** seg1 prefix **2777→2782**; seed5006 Scr **182→192**;
  suite #640 **31/44** Scr **6473** RNG **358954**; green+strict PASS;
  cohort seed0030/0006/0373/0398/1800 PASS.
- **Named omission:** `formatkiller`/`yyyymmddhhmmss`; Gehennom Valley
  arrival plines; multi-entry cemetery from loaded-then-redeath polish.
- **Next:** seed5006 seg1 @2782 `m_move` rn2(16) vs rn2(28); or seed0116.

## D-0576 — zapyourself WAN_DEATH + getdir confdir + bones wizard≡debug

- **Status:** fixed (partial — other zapyourself otyps; wizard Die?/Save
  bones yn polish; Lifesaved)
- **Symptom:** seed5006 @10953 C `can_make_bones` `rn2(1)` vs JS
  `rn2(4)` — after wish wand of death + self-zap `.`.
- **Cause:** (1) `zapyourself` stubbed WAN_DEATH/SPE_FINGER_OF_DEATH so
  JS never `done(DIED)`; coincidental later `rn2(4)`. (2) `getdir_zap`
  omitted C `confdir(FALSE)` after horizontal/self dir (Confusion
  `u_maybe_impaired` `rn2(5)`). (3) After death-ray port, `can_make_bones`
  treated `!flags.wizard` only; `playmode:debug` sets `flags.debug`, so
  JS returned false after `rn2(1)=0` while C wizard continues to bones.
- **C locus:** `zap.c` `zapyourself` WAN_DEATH; `cmd.c` `getdir`→
  `confdir`; `bones.c` `can_make_bones` `!wizard`.
- **Change:** port death-ray self-zap → killer + plines + `done(DIED)`;
  `getdir_zap` calls `confdir(false)` when `!dz`; bones wizard check
  `flags.debug || flags.wizard`.
- **Verification:** seed5006 prefix **10953→11026** (seg0 FULL);
  positional **10974→13812**/13923 Scr **174→182**/249; green+strict
  PASS; cohort 29/29 PASS (incl. seed0373/0398).
- **Named omission:** other `zapyourself` otyps; wizard `Die?` /
  `Save bones?` query polish; Lifesaved; seg1 seed5007 startup.
- **Next:** seed5006 seg1 `randomize_gem_colors` @11026; or seed0116
  residual.

## D-0575 — confused/cursed scroll → level_tele + random_teleport_level

- **Status:** fixed (partial — heaven/escape outside endgame; Nowhere
  yn; lev_by_name; next_to_u leash; buried ball)
- **Symptom:** seed5006 @8473 C `rnl(5)` `level_tele` vs JS `rn2(19)`
  exercise — after quaff confusion + read teleport scroll + empty getlin.
- **Cause:** `seffect_teleportation` stubbed cursed/confused path
  (named omission); `level_tele` Confusion/`*`/`involuntary` stubbed
  shudder without `random_teleport_level`.
- **C locus:** `read.c` `seffect_teleportation`; `teleport.c`
  `level_tele` / `random_teleport_level`; `dungeon.c`
  `single_level_branch`.
- **Change:** cursed/confused → `await level_tele()` + `known`; port
  `random_teleport_level`; Confusion/`*`/trycnt≥10/involuntary →
  random path then `get_level`/`schedule_goto`.
- **Verification:** seed5006 prefix **8473→10953** positional
  **8576→10974** Scr **154→174**/249; green+strict PASS; cohort 29/29
  PASS (incl. seed0373/0398).
- **Named omission:** heaven/escape; Nowhere suicide yn; `lev_by_name`;
  Quest polish; `next_to_u` leash; buried ball; debug_fuzzer.
- **Next:** seed5006 `can_make_bones` `rn2(1)` @10953; or seed0116
  residual.

## D-0574 — setworn oc_oprop extrinsic (ring of regeneration)

- **Status:** fixed (partial — Ring_on learnring/attribs; w_blocks;
  artifact intrinsics; prop mirrors on `u.H*`/`u.E*`)
- **Symptom:** seed5006 @8468 C `rn2(400)` dosounds fountain vs JS
  `rn2(100)` regen_hp — after wearing wished clay ring of regeneration.
- **Cause:** `setworn` never conferred `objects[].oc_oprop` into
  `u.uprops[].extrinsic`, so `U_CAN_REGEN()` was false; failed regen
  roll @8433 left HP 9/10 and next EOT burned regen `rn2(100)` while
  C (with Regeneration) had healed to full and reached fountain
  `rn2(400)`. Not a dosounds bug.
- **C locus:** `worn.c` `setworn` oc_oprop extrinsic; `youprop.h`
  `Regeneration`; `allmain.c` `U_CAN_REGEN` / `regen_hp`.
- **Change:** extract `oc_oprop` into `objects_data.js`; `setworn` /
  accessory takeoff confer/clear extrinsic; `u_can_regen` reads
  `uprops[REGENERATION]`.
- **Verification:** seed5006 prefix **8468→8473** positional
  **8508→8576** Scr **121→154**/249; green+strict PASS; cohort PASS
  held (seed0373/0398 PASS; seed0116 114/127 unchanged).
- **Named omission:** `w_blocks`; artifact intrinsics;
  `monstunseesu_prop`; Ring_on learnring / gain-str attribs; mirror
  `u.ERegeneration` field; property consumers still on `u.H*` only.
- **Next:** seed5006 `level_tele` `rnl(5)` @8473; or seed0116 residual.

## D-0573 — wizard ^X MAGICENLIGHTENMENT + Air weight_cap MAX

- **Status:** fixed (partial — full attributes catalogue / from_what equipment)
- **Symptom:** seed0373 Scr **123**/124; @119 Attributes — C wizard hunger
  `<%d>`, unencumbered `<-557>`, Attributes (fervently / alignment /
  poison innately / stealth+fast from experience / warded / luck zero /
  can't safely pray (398) / debug mode) vs JS BASIC-only Misc.
- **Cause:** (1) `doattributes` never ORed `MAGICENLIGHTENMENT` for
  wizard (only explore stub). (2) status hunger/encumb omitted wizard
  `<%d>`. (3) `weight_cap` missed C `Is_airlevel` → `MAX_CARR_CAP`, so
  Air plane showed `<-507>` not `<-557>`.
- **C locus:** `insight.c` `doattributes` / `attributes_enlightenment` /
  `status_enlightenment`; `attrib.c` `from_what` / `is_innate`;
  `hack.c` `weight_cap` Levitation\|Is_airlevel → MAX.
- **Change:** `js/invent.js` wizard\|discover MAGIC + Attributes subset +
  status suffixes + Air `weight_cap`; `js/attrib.js` `from_what` /
  `is_innate` for poison/stealth/fast.
- **Verification:** seed0373 Scr **123→124**/124 RNG full **PASS**;
  green+strict PASS; cohort **28**/28 PASS.
- **Named omission:** other resists/vision/appearance props; `what_gives`
  extrinsic `from_what`; strong steed MAX; Upolyd weight_cap.
- **Next:** seed5006 `dosounds` @8468; or seed0116 residual 114/127.

## D-0572 — pluslvl uexp + insight endgame Background (^X)

- **Status:** fixed (partial — @119 Attributes / wizard hunger `<%d>`)
- **Symptom:** seed0373 Scr **122**/124; @118 ^X Background — C
  “endgame, on the Elemental Plane of Air” / “just started” /
  “5120000 experience… more needed for level 21” vs JS dname+depth /
  “entered 1 turn ago” / “0 experience points”.
- **Cause:** (1) `doattributes` omitted `In_endgame` + `endgamelevelname`
  Elemental prefix and `moves==1` “just started”; wizard XP delta
  suffix missing. (2) `pluslvl(!incr)` never set `u.uexp =
  newuexp(ulevel)` before `++ulevel` (C `exper.c`), so `#levelchange`
  left `uexp` at 0.
- **C locus:** `insight.c` `background_enlightenment` In_endgame /
  moves==1 / wizard `newuexp` delta; `dungeon.c` `endgamelevelname`;
  `exper.c` `pluslvl`.
- **Change:** `js/exper.js` `pluslvl` uexp; `js/invent.js`
  `background_dungeon_clause` + adventure/wizard xp lines;
  export `endgamelevelname` from `js/display.js`.
- **Verification:** seed0373 Scr **122→123**/124 RNG full; @118
  match; green+strict PASS; cohort **28**/28 PASS.
- **Named omission:** @119 Attributes (`MAGICENLIGHTENMENT` for
  wizard ^X) + status wizard `<%d>` hunger/inv_weight; Is_bigroom;
  full attributes_enlightenment catalogue / from_what.
- **Next:** seed0373 @119 Attributes; or seed5006 `dosounds` @8468.

## D-0571 — movebubbles air_pos S_cloud glyph + AIR/CLOUD terrain_glyph

- **Status:** fixed (partial — water cons pickup; water.lua/earth/astral)
- **Symptom:** seed0373 Scr **111**/124; @110 Air gravity More — C map
  dense `#` clouds vs JS blank/`?`.
- **Cause:** (1) C `movebubbles` assigns `air_pos` with
  `glyph=cmap(S_cloud)` on every cell; `docrt` paints `lev->glyph` before
  vision, so out-of-sight Air shows `#`. JS set typ=AIR only, no memory
  glyph. (2) `terrain_glyph` lacked AIR/CLOUD → visible cells showed `?`.
- **C locus:** `mkmaze.c` `movebubbles` `air_pos` / `setup_waterlevel`
  S_air memory; `display.c` `back_to_glyph` AIR→S_air / CLOUD→S_cloud;
  `defsym.h` S_air/S_cloud; `docrt` show `lev->glyph`.
- **Change:** `js/mklev.js` `movebubbles` stamps `remembered_glyph` `#`
  /CLR_GRAY (air_pos) + `setup_waterlevel` S_air/`S_water` memory;
  `js/display.js` `terrain_glyph` AIR/CLOUD.
- **Verification:** seed0373 Scr **111→122**/124 RNG full; @110–117
  match; green+strict PASS; cohort **28**/28 PASS.
- **Named omission:** water bubble cons; water/earth/astral loaders.
- **Next:** seed0373 @118 enlightenment Background (done D-0572).

## D-0570 — mon_pmname / M2_PNAME article in x_monnam

- **Status:** fixed (partial — Air-plane map @110; gas-cloud region; hallu/
  invis/priest/`called`/`is_mplayer`/`AUGMENT_IT` x_monnam arms)
- **Symptom:** seed0373 Scr **110**/124; @101 JS
  `The wizard of yendor suddenly appears…` vs C `The Wizard of Yendor…`.
- **Cause:** `mon_plain_name` lowercased `PM_*` identifiers instead of
  `mon_pmname`/`pmnames[]` (table already has `"Wizard of Yendor"`);
  `M2_PNAME` never cleared ARTICLE_THE (Medusa etc.).
- **C locus:** `do_name.c` `mon_pmname`/`pmname`/`x_monnam` name_at_start;
  `mondata.h` `type_is_pname`; `wizard.c` `resurrect` appear `Norep(Monnam)`.
- **Change:** `js/do_name.js` `mon_pmname` from `pmnames` + gender;
  `type_is_pname` → skip `"the "` when no adjectives.
- **Verification:** seed0373 Scr **110→111**/124 RNG full; @101 match;
  green+strict PASS; cohort **30**/30 PASS.
- **Named omission:** @110 Air gravity More map `#`/`?` clouds; gas-cloud
  glyphs; full x_monnam hallu/invis/priest arms.
- **Next:** seed0373 @110 Air map / `movebubbles`; or seed5006 `dosounds`
  @8468.

## D-0569 — Fire plane lit clear + monster do_light_sources

- **Status:** fixed (partial — create_gas_cloud region body; LS_OBJECT
  lights; circle_ptr range>1)
- **Symptom:** seed0373 Scr **101**/124; @100 JS lit `·` across Fire plane vs C
  dark + DEC room `~` / lava `` ` ``; after lit-only fix, blank vs TEMP_LIT floors.
- **Cause:** (1) `load_fire` solidfill `BOOL_RANDOM`→`rn2(2)=1` left `.lit` on map
  cells; JS `sel_set_ter(..., false)` was nochange (legacy), while C string
  `lspo_map` uses `lit=FALSE`→`set_levltyp_lit` clears non-lava. (2) Fire
  elementals/vortices `emits_light`→`new_light_source` + `do_light_sources`
  TEMP_LIT omitted — dark ROOM in LOS stayed invisible.
- **C locus:** `sp_lev.c` `lspo_map`/`set_levltyp_lit`; `makemon.c` emits_light;
  `light.c` `do_light_sources`; `vision.c` lit|TEMP_LIT IN_SIGHT.
- **Change:** `load_fire` SpLev_Map lit epilogue (lava lit, else clear);
  `js/light.js` monster lights + `vision_recalc` TEMP_LIT; `makemon`/`goto_level`
  hooks. Global `sel_set_ter(false)`→force-unlit rejected (broke seed0009
  themerms).
- **Verification:** seed0373 Scr **101→110**/124 RNG full; @100 match; green+
  strict PASS; cohort **28**/28 PASS (incl. seed0009/0398).
- **Named omission:** gas-cloud region glyphs; object lights (Wizard Monnam
  → D-0570).
- **Next:** seed0373 @101 Wizard Monnam; or seed5006 `dosounds` @8468.

## D-0568 — doname the_unique_obj + print_dungeon bot after menu

- **Status:** fixed (partial — Fire-plane vision @100; CORPSE doname article
  skip deferred; slime-mold fake_arti; full not_fully_identified)
- **Symptom:** seed0373 Scr **100**/124; @99 JS `an Amulet of Yendor` + blank
  botl under `--More--` vs C `the Amulet` + status; cursor col 54 vs 55.
- **Cause:** (1) `doname` always used `"a "`/`just_an` for quan==1 — omitted
  C `the_unique_obj` / `obj_is_pname` → `"the "` for `oc_unique` (Amulet of
  Yendor even when `!known`). (2) `select_menu_pick_one` `clear_committed_status`
  after fullscreen pick blanks botl for Options→submenu (D-0385); `print_dungeon`
  then `prinv`/`more` painted suppressed status. C wintty `bot()`s after a
  fullscreen menu that wrecked WIN_STATUS.
- **C locus:** `objnam.c` `the_unique_obj`/`doname_base`; `wintty.c` fullscreen
  menu dismiss → `disp.botlx`+`bot()`; `dungeon.c` `print_dungeon`.
- **Change:** `js/objnam.js` `the_unique_obj`/`obj_is_pname` + doname `"the "`
  + Amulet uncursed exclusion; `js/dungeon.js` `print_dungeon` `await bot()`
  after menu (keep Options clear_committed).
- **Verification:** seed0373 Scr **100→101**/124 RNG full; @99 match; green+
  strict PASS; cohort **30**/30 PASS (incl. seed0012/1500); seed0116 113/127.
- **Named omission:** Fire-plane map @100 (`·` lit vs C dark/cloud `` ` `` /
  `~`); CORPSE doname article skip (callers still need `an(corpse_xname)`).
- **Next:** seed0373 @100 Fire vision / light; or seed5006 `dosounds` @8468.

## D-0567 — Sokoban premap_detect + solidify + flip fix_wall_spines + wall color

- **Status:** fixed (partial — Fire-plane residual @99; gehennom/knox wallcolors;
  wizfliplevel `flip_visuals`)
- **Symptom:** seed0373 Scr **88**/124; @78 Dlvl:6 (Sokoban) JS blank walls vs
  C full premapped DEC map (walls/traps/boulders).
- **Cause:** (1) `des.level_flags(...,"premapped")` → C `premap_detect` omitted.
  (2) `solidify_map` + `SpLev_Map` omitted so skip_premap could not gate
  outside stone. (3) `flip_level` omitted post-swap `fix_wall_spines` so
  corners/T-junctions stayed mirrored after horizontal flip. (4) Sokoban
  `wallcolors` deferred — recorder SGR 34 (`CLR_BLUE`). (5) traps live on
  `level.traps[]`, not `ftrap` list.
- **C locus:** `detect.c` `premap_detect`/`skip_premap_detect`; `sp_lev.c`
  `solidify_map`/`flip_level`→`fix_wall_spines`; `display.h`
  `cmap_walls_to_glyph` Sokoban; `display.c` `wall_color(sokoban_walls)`.
- **Change:** `js/detect.js` `premap_detect`; `js/mklev.js` SpLev_Map +
  `solidify_map` + `soko_load_epilogue` + flip `fix_wall_spines`;
  `js/display.js` Sokoban `wall_glyph` CLR_BLUE + export `map_trap`.
- **Verification:** seed0373 Scr **88→100**/124 RNG full; @78–98 match;
  green+strict PASS; cohort **30**/30 PASS; seed0116 still 113/127.
- **Named omission:** @99 endgame amulet phrasing / Fire vision; gehennom/
  knox wallcolors; `flip_visuals` extras path.
- **Next:** seed0373 @99 Fire/`an` vs `the` Amulet; or seed5006 `dosounds`
  @8468. → **superseded by D-0568** (Scr 101; next Fire vision @100).

## D-0566 — bigrm light_region + IRONBARS + makemon hide/minvis + HI_LORD

- **Status:** fixed (partial — other bigrm-N light_region; HI_OBJ/HI_METAL
  extractor aliases still wrong vs color.h)
- **Symptom:** seed0373 Scr **85**/124; @73 Dlvl:12 (bigrm-8) JS blank
  walls vs C DEC `q`, `?` vs bars `|`, visible stalker/spider/snake,
  HI_LORD monsters bright-magenta vs magenta.
- **Cause:** (1) `load_bigrm_*` lit interior only — C `light_region`
  expands by 1 for walls. (2) `terrain_glyph` omitted IRONBARS; flush
  Unicode-converted DEC `|`→`≠`. (3) spider/snake `hideunder` deferred;
  stalker/black light never set `minvis`. (4) extractor `HI_LORD:13`
  vs `color.h` `HI_LORD CLR_MAGENTA` (5).
- **C locus:** `sp_lev.c` `light_region`; `display.c` `back_to_glyph`
  IRONBARS; `makemon.c` S_SPIDER/S_SNAKE/S_ELEMENTAL; `color.h` HI_LORD.
- **Change:** `js/mklev.js` `light_region` + bigrm-2/8; `js/display.js`
  IRONBARS + keep raw `|`; `js/makemon.js` hideunder/minvis;
  `extract-monsters.py` HI_LORD=5 + regenerate `monsters_data.js`.
- **Verification:** seed0373 Scr **85→88**/124 RNG full; green+strict
  PASS; cohort **30**/30 PASS.
- **Named omission:** @78 Dlvl:6 blank walls; other bigrm-N; HI_OBJ/
  HI_METAL extractor aliases.
- **Next:** seed0373 @78 vision walls; or seed5006 `dosounds` @8468.

## D-0565 — TREE glyph + S_EEL in_mklev hideunder

- **Status:** fixed (partial — arboreal STONE→tree; spider/snake
  hideunder after mkobj_at; Underwater+couldsee eel arm)
- **Symptom:** seed0373 Scr **78**/124 after D-0564; @screen 43
  Bar-strt outdoor — JS `;`/`?` vs C DEC water `` ` `` / tree `g`.
- **Cause:** (1) `terrain_glyph` omitted TREE → default `?`; flush
  also Unicode-converted DEC `g`→`±` (not in frozen DEC_MAP).
  (2) `makemon` omitted `S_EEL` `in_mklev`→`hideunder` so eels
  showed as `;` instead of mundetected water.
- **C locus:** `display.c` `back_to_glyph` TREE; `defsym.h` S_tree;
  `dat/symbols` DECgraphics `\xe7`; `makemon.c` S_EEL; `mon.c`
  `hideunder` eel arm.
- **Change:** `js/display.js` TREE `#`/`g` + keep raw DEC `g` in
  scoring grid; `js/makemon.js` S_EEL in_mklev → `mundetected`.
- **Verification:** seed0373 Scr **78→85**/124 RNG full; green+strict
  PASS; cohort **30**/30 PASS; seed0116 still 113/127.
- **Named omission:** next @73 Dlvl:12 blank walls vs C DEC `q`;
  arboreal STONE; spider/snake hideunder.
- **Next:** seed0373 @73 vision/memory walls; or seed5006 `dosounds`
  @8468; seed0116 residual.

## D-0564 — botl describe_level Home / Knox / endgame

- **Status:** fixed (partial — livelog `dflgs&2` consumers; insight
  ^X location copy still separate)
- **Symptom:** seed0373 Scr **65**/124 after D-0563; @screen 43 botl
  C `Home 1 $:…` vs JS `Dlvl:16 $:…` after `^V?`→Bar-strt.
- **Cause:** `_statusLine2` always emitted `Dlvl|Tutorial`+`depth()`;
  omitted C `describe_level` Knox / `In_quest` / `In_endgame` arms.
- **C locus:** `botl.c` `describe_level`; `dungeon.c`
  `endgamelevelname`; `dungeon.h` `Is_knox` / `In_quest`.
- **Change:** `js/display.js` `describe_level` + `endgamelevelname`;
  `_statusLine2` uses `describe_level(1)` then `$:` gold.
- **Verification:** seed0373 Scr **65→78**/124 RNG full; green+strict
  PASS; cohort **28**/28 PASS.
- **Named omission:** Bar-strt outdoor TREE/eel glyphs (D-0565);
  livelog addbranch; insight ^X endgame/knox prose.
- **Next:** seed0373 Bar-strt terrain glyphs; or seed5006 `dosounds`
  @8468; seed0116 residual 113/127.

## D-0563 — print_dungeon tty_end_menu prompt blank row

- **Status:** fixed
- **Symptom:** seed0373 Scr **47**/124 after D-0562; first miss
  @screen 41 — JS menu packed one row high vs C (blank after title),
  so page1 showed `t - fakewiz1` where C still had `s - wizard3`
  and `(1 of 3)` footer alignment drifted.
- **Cause:** JS `print_dungeon` put the end_menu prompt into the item
  list without the empty row C `tty_end_menu` prepends (blank then
  prompt onto reversed mlist → display prompt, `""`, items).
- **C locus:** `wintty.c` `tty_end_menu`; `dungeon.c` `print_dungeon`
  `end_menu(win, "Level teleport to where:")`.
- **Change:** `js/dungeon.js` `print_dungeon` raw starts with prompt
  + `{ text: '' }` selectable:false.
- **Verification:** seed0373 Scr **47→65**/124 RNG full; seed0116
  **110→113**/127; green+strict PASS; cohort **28**/28 PASS.
- **Named omission:** bymenu=FALSE; floating branches; invocation
  debug; quest `describe_level` Home / Bar-strt outdoor glyphs still
  miss @43.
- **Next:** seed0373 @43 `describe_level` `In_quest` → `Home %d`;
  or seed5006 `dosounds` @8468.

## D-0562 — botl rank_of / xlev_to_rank titles

- **Status:** fixed (partial — `rank_to_xlev` unused; achievement rank
  msgs; mplayer/`title_to_mon` polish)
- **Symptom:** seed0373 Scr **23**/124 after D-0561 RNG full; first
  miss @screen 20 botl `Wizard the Plunderer` vs C `… the Pillager`
  at Xp:3.
- **Cause:** `_statusLine1` used sticky `urole.rank = title[0]`; C
  `rank()` → `rank_of(u.ulevel, Role_switch, female)` with
  `xlev_to_rank` (1..2→0, 3..5→1, …). Role `title[]` only had 2 of 9.
- **C locus:** `botl.c` `xlev_to_rank`/`rank_of`; `role.c` `roles[].rank[9]`.
- **Change:** full `title[9]` in `roles.js`; export `xlev_to_rank`/
  `rank_of`; botl + insight + questpgr `%r` call `rank_of`; u_init
  stores `urole.title`.
- **Verification:** seed0373 Scr **23→47**/124 (cursors 121/124);
  RNG full; green+strict PASS; cohort **30**/30 PASS.
- **Next:** seed0373 @screen 41 `print_dungeon` menu (fakewiz1 vs
  wizard3); or seed5006 `dosounds` @8468.

## D-0561 — air.lua load_special + bubbles / movebubbles

- **Status:** fixed (partial — water cons pickup; water.lua/earth/astral;
  moveloop movebubbles cadence polish)
- **Symptom:** seed0373 @32480 C nhlib shuffle vs JS rn2(79) after
  D-0560 getbones; then mkclass D/E/J; then setup_waterlevel /
  movebubbles rn2 gaps.
- **Cause:** (1) `load_special_proto` omitted `air`; (2)
  `monclass_letter_to_mlet` only mapped G/h/V/O/T; (3) no
  `setup_waterlevel`/`movebubbles` for Plane of Air.
- **C locus:** `dat/air.lua`; `sp_lev.c` `load_special`; `mkmaze.c`
  `setup_waterlevel`/`mk_bubble`/`movebubbles`/`mv_bubble`; `do.c`
  `deliver_splev_message` / arrival `movebubbles`.
- **Change:** `js/mklev.js` `load_air` + full monclass map +
  `setup_waterlevel`/`movebubbles`/`mv_bubble` boing; `js/do.js`
  `deliver_splev_message` + `movebubbles` call.
- **Verification:** seed0373 rng-diff **RNG OK 35386**; runner RNG
  **35386**/35386 Scr **23**/124 (cursors 121/124); green+strict PASS;
  cohort **28**/28 PASS.
- **Next:** seed0373 screen residual; or seed5006 `dosounds` @8468.

## D-0560 — In_endgame level_tele negative dest

- **Status:** fixed (partial — heaven/escape outside endgame; Knox;
  lev_by_name)
- **Symptom:** seed0373 @32479 C `getbones` `rn2(3)` vs JS missing after
  D-0559 Amulet wish. Session `^V-2` from Fire plane.
- **Cause:** JS stubbed all `In_endgame` `level_tele` as "can't get
  there"; C maps `newlev` in `(-llimit,0)` to `dlevel = llimit + newlev`
  (Air = 4-2) and `schedule_goto`.
- **C locus:** `teleport.c` `level_tele` In_endgame block (~1308).
- **Change:** `js/teleport.js` endgame negative dest + schedule_goto
  (no materialize post_msg).
- **Verification:** seed0373 rng-diff **32479→32480** (getbones match);
  green+strict PASS.
- **Next:** (superseded by D-0561) air.lua nhlib shuffle @32480.

## D-0559 — Amulet wish + empty readobjnam `any` + Wizard appear / hot

- **Status:** fixed (partial — makemon appear still caller-side in
  `resurrect`; qualifier-only empty wish; MAXWISHTRY retry loop;
  Gehennom smoke arm of `hellish_smoke_mesg`)
- **Symptom:** seed0373 @32473 C `rn2(13)` `readobjnam` `any:` vs JS
  missing after D-0558 Wizard. DIAG: `amulet_wish` never fired; empty
  wish returned `NOTHING`; missing More for appear/hot leaked spaces
  into getlin (`"-2"`).
- **Cause:** (1) `allmain` omitted once-per-input Amulet wish; (2)
  `readobjnam("")`/`null` skipped C `preparse→any` / `!bp→any`; (3)
  `resurrect` omitted makemon appear Norep; (4) `goto_level` omitted
  `temperature_change_msg`.
- **C locus:** `allmain.c` amulet_wish; `zap.c` `makewish`;
  `objnam.c` `readobjnam` `any:` / `wrpsym`; `makemon.c` appear Norep;
  `do.c` `temperature_change_msg` / `hellish_smoke_mesg`;
  `wizard.c` `resurrect`.
- **Change:** `js/allmain.js` amulet_wish→`makewish`;
  `js/readobjnam.js` empty/null→`readobjnam_any`+`mkobj`;
  `js/wizard.js` appear Norep; `js/do.js` temperature_change_msg.
- **Verification:** seed0373 rng-diff **32473→32479**; runner RNG
  **32479**/35386 Scr 23/124; green+strict PASS; cohort sample PASS.
  Full #620: **30/44**, Scr 5901, RNG 350686 (44.23%).
- **Next:** @32479 `getbones` after `^V-2`; or seed5006 `dosounds` @8468.

## D-0558 — endgame resurrect Wizard on newdungeon+amulet

- **Status:** fixed (partial — migrating-Wizard arm deferred; SPE_DIG on
  earth; astral `final_level`)
- **Symptom:** seed0373 @32419 C `collect_coords` `rn2(8)` vs JS
  `rn2(12)` after matched fumaroles (post D-0557). DIAG: JS was already
  in `mcalcmove` (moveloop); C was `resurrect`→`makemon(Wizard)`→
  `enexto` nearcandy scramble.
- **Cause:** `goto_level` omitted `In_endgame && newdungeon && amulet`
  → `resurrect()`. Also missing Wizard `adj_lev` / `iswiz` /
  `no_of_wizards++`.
- **C locus:** `do.c` `goto_level` endgame block; `wizard.c` `resurrect`;
  `makemon.c` `adj_lev` / Wizard `iswiz`.
- **Change:** new `js/wizard.js` `resurrect`; `js/do.js` call site;
  `js/makemon.js` Wizard `adj_lev` + `iswiz`/`no_of_wizards`.
- **Verification:** seed0373 rng-diff **32419→32473**; runner RNG
  **32473**/35386 Scr 23/124; green+strict PASS; cohort **28**/28 PASS.
- **Next:** @32473 `makewish`/`readobjnam` (ESC wish abort); or
  seed5006 `dosounds` @8468.

## D-0557 — sticky Sokoban after level leave (rnd_defensive dig-avoid)

- **Status:** fixed (partial — trap/monmove still consult `g.Sokoban` alias;
  C uses only `sokoban_rules`)
- **Symptom:** seed0373 @32011 C `next_ident` after `rnd_defensive_item`
  case7 WAN_DIGGING vs JS `rn2(4)` Sokoban dig-avoid (post D-0556).
- **Cause:** JS set sticky `g.Sokoban=true` on soko loaders; C `#define
  Sokoban svl.level.flags.sokoban_rules` is cleared in
  `clear_level_structures`. Fire plane kept false dig-avoid.
- **C locus:** `mklev.c` `clear_level_structures` `sokoban_rules=0`;
  `rm.h` `#define Sokoban`; `muse.c` `rnd_defensive_item` case7.
- **Change:** `js/mklev.js` clear `sokoban_rules`/`sokoban`/`g.Sokoban`;
  `js/do.js` getlev syncs `g.Sokoban` from restored flags;
  `js/makemon.js` dig-avoid checks level flags only.
- **Verification:** seed0373 rng-diff **32011→32419**; runner RNG
  **32421**/35386 Scr 23/124; green+strict PASS; cohort **30**/30 PASS.
- **Named omission:** trap.js / monmove still OR sticky `g.Sokoban`.
- **Next:** @32419 `collect_coords` `rn2(8)` vs JS `rn2(12)`; or
  seed5006 `dosounds` @8468.

## D-0556 — m_initweap S_LIZARD salamander weapon kit

- **Status:** fixed (partial — non-salamander S_LIZARD; S_ANGEL/S_KOP still deferred)
- **Symptom:** seed0373 @31895 C `rn2(7)` `m_initweap` vs JS `rn2(75)`
  trailing offensive (post D-0555).
- **Cause:** JS `m_initweap` stubbed `S_LIZARD` with no body; C salamander
  always `mongets(rn2(7)?SPEAR:rn2(3)?TRIDENT:STILETTO)` before the shared
  `rn2(75)` offensive roll.
- **C locus:** `makemon.c` `m_initweap` `S_LIZARD` / `PM_SALAMANDER` (~495–499).
- **Change:** `js/makemon.js` salamander arm with C short-circuit ternary.
- **Verification:** seed0373 rng-diff **31895→32011**; runner RNG
  **32340**/35386 Scr 23/124; green+strict PASS; cohort **28**/28 PASS.
- **Named omission:** other S_LIZARD; S_ANGEL / S_KOP kits.
- **Next:** @32011 C `next_ident` after `rnd_defensive_item` case7 vs JS
  `rn2(4)` Sokoban dig-avoid — likely sticky `game.Sokoban` on fire plane;
  or seed5006 `dosounds` @8468.

## D-0555 — get_location_coord random double-retry

- **Status:** fixed (partial — fixed coords / croom `somexy`; object/trap
  callers still single `get_location_random`)
- **Symptom:** seed0373 @30743 C `get_location` `rn2(79)` vs JS `rnd(2)`
  `next_ident` (post D-0554). JS placed a pit viper while C still searched.
- **Cause:** C `get_location_coord` on random miss calls `get_location`
  twice (second with the same humidity). Amphibious `pm_to_humidity` →
  WET-only; fire plane has no pools, so both 100-try loops fail before
  `create_monster` `loc |= DRY`. JS did one WET loop then DRY → accepted
  ~200 RNG early.
- **C locus:** `sp_lev.c` `get_location_coord`; `create_monster` humidity
  path; `pm_to_humidity` WET replace for amphibious.
- **Change:** `js/mklev.js` `get_location_coord_random` + use in
  `splev_create_monster`.
- **Verification:** seed0373 rng-diff **30743→31895**; runner RNG
  **31908**/35386 Scr 23/124; green+strict PASS; cohort **28**/28 PASS.
- **Named omission:** non-random coords; croom/`somexy`; object/trap/
  stair `get_location_coord` parity.
- **Next:** @31895 C `m_initweap` S_LIZARD salamander `rn2(7)` spear
  vs JS `rn2(75)` offensive; or seed5006 `dosounds` @8468.

## D-0554 — newmonhp golemhp fixed HP (no d(m_lev,8))

- **Status:** fixed (partial — rider / mlevel>49 / is_home_elemental deferred)
- **Symptom:** seed0373 @30344 C `rn2(2)` `makemon` (post silent stone-golem
  HP) vs JS `d(21,8)=82` (post D-0553).
- **Cause:** C `newmonhp` `is_golem` arm sets `mhp=golemhp(mndx)` with no RNG;
  JS fell through to `d(m_lev,8)`. Stone golem = 100.
- **C locus:** `makemon.c` `newmonhp` golem arm; `golemhp` switch.
- **Change:** `js/makemon.js` `golemhp` + `newmonhp` `is_golem` branch
  (import `is_golem`).
- **Verification:** seed0373 rng-diff **30344→30743**; runner RNG
  **30755**/35386 Scr 23/124; green+strict PASS; cohort **28**/28 PASS.
- **Named omission:** `is_rider` `d(10,8)`; `mlevel>49` fixed HP;
  `is_home_elemental` `mhp*=3`; drain helper `golemhp`/`mlevel` path.
- **Next:** @30743 C `get_location` vs JS `rnd(2)` `next_ident` (extra
  makemon / fewer placement retries); or seed5006 `dosounds` @8468.

## D-0553 — m_initinv S_GIANT gem stack / minotaur wand

- **Status:** fixed (partial — S_WRAITH/S_LICH/S_DEMON invent still deferred)
- **Symptom:** seed0373 @30308 C `rn2(6)` `m_initinv` S_GIANT gem count
  vs JS trailing `rn2(50)` defensive (post D-0552).
- **Cause:** JS `m_initinv` omitted `S_GIANT` — minotaur `WAN_DIGGING`
  and `is_giant` gem loop `rn2(m_lev/2)` + `rnd_class(DILITHIUM..LUCKSTONE-1)`.
- **C locus:** `makemon.c` `m_initinv` `case S_GIANT`; `mondata.h`
  `is_giant` (`M2_GIANT`).
- **Change:** `js/makemon.js` `S_GIANT` invent; `js/monsters.js`
  `M2_GIANT` + `is_giant`.
- **Verification:** seed0373 rng-diff **30308→30344**; runner RNG
  **30351**/35386 Scr 23/124; green+strict PASS; cohort **30**/30 PASS.
- **Named omission:** `S_WRAITH`/`S_LICH`/`S_DEMON` invent bodies.
- **Next:** @30344 C silent `newmonhp` (stone golem `golemhp`) vs JS
  `d(21,8)`; or seed5006 `dosounds` @8468.

## D-0552 — splev create_monster pm_to_humidity / HOT lava

- **Status:** fixed (partial — Is_waterlevel always-accept)
- **Symptom:** seed0373 @30263 C `next_ident` (makemon m_id) vs JS
  extra `get_location` `rn2(79)` after matched induced_align + one
  get_location pair (post D-0551).
- **Cause:** C `create_monster` uses `pm_to_humidity(pm)` so flyers /
  `likes_fire` accept lava (`HOT`); LAVAPOOL is not `SPACE_POS`. JS
  `splev_create_monster` always used DRY → rejected lava cells and
  retried get_location (fire elemental / balrog / dragons).
- **C locus:** `sp_lev.c` `pm_to_humidity` / `is_ok_location` /
  `create_monster` humidity + `NO_LOC_WARN` fallback.
- **Change:** `js/mklev.js` `pm_to_humidity` + humidity-aware
  `is_ok_location` / `get_location_random`; `splev_create_monster`
  matches C; `js/monsters.js` `likes_lava`/`likes_fire` /
  `is_swimmer`/`amphibious`.
- **Verification:** seed0373 rng-diff **30263→30308**; runner RNG
  **30336**/35386 Scr 23/124; green+strict PASS; cohort **28**/28 PASS.
- **Named omission:** `Is_waterlevel` short-circuit in `is_ok_location`.
- **Next:** @30308 C `m_initinv` S_GIANT gem `rn2(m_lev/2)` vs JS
  trailing `rn2(50)`; or seed5006 `dosounds` @8468.

## D-0551 — newmonhp adult dragon In_endgame HP

- **Status:** fixed (partial — golem/rider/`mlevel>49`/`is_home_elemental`)
- **Symptom:** seed0373 @30209 C `makemon` female `rn2(2)` vs JS
  `newmonhp` `d(22,8)` on first Plane of Fire red dragon (post D-0550).
- **Cause:** C `newmonhp` adult dragon (`S_DRAGON` && `mndx >=
  PM_GRAY_DRAGON`) uses `In_endgame` → `8 * m_lev` (no RNG); else
  `4*m_lev + d(m_lev,4)`. JS always `d(m_lev,8)`, burning a roll before
  female.
- **C locus:** `makemon.c` `newmonhp` adult-dragon arm.
- **Change:** `js/makemon.js` `newmonhp` adult-dragon branch +
  `In_endgame` import.
- **Verification:** seed0373 rng-diff **30209→30263**; runner RNG
  **30272**/35386 Scr 23/124; green+strict PASS; cohort **30**/30 PASS.
- **Named omission:** golem `golemhp`; rider `d(10,8)`; `mlevel>49`
  fixed HP; `is_home_elemental` `*=3`.
- **Next:** (superseded by D-0552) @30263 C `next_ident` vs JS
  `get_location`.

## D-0550 — fire.lua load_special + endgame level_difficulty

- **Status:** fixed (partial — fire monsters HP/gender order; air/water/
  earth/astral; create_gas_cloud body)
- **Symptom:** seed0373 @30065 C nhlib `shuffle` `rn2(3)` vs JS `rn2(79)`
  after matched getbones (post D-0549 Amulet grant). Wizard `^V?` `L`
  selects fire (−3).
- **Cause:** (1) `load_special_proto` omitted `fire`; (2) JS
  `level_difficulty` lacked C In_endgame arm → false `mktrap_victim` on
  Plane of Fire traps (low depth vs `rnd(4)`).
- **C locus:** `dat/fire.lua`; `sp_lev.c` `load_special`; `dungeon.c`
  `level_difficulty` endgame; `mkmaze.c` `mkportal` / `fumaroles`.
- **Change:** `js/mklev.js` `load_fire` (map, 40 FIRE_TRAP, mons, boulders,
  tele/portal lregions after flip) + `mkportal` + `fumaroles`; `js/do.js`
  arrival fumaroles; `js/hacklib.js` endgame difficulty.
- **Verification:** seed0373 rng-diff **30065→30209**; runner RNG
  **30222**/35386 Scr 23/124; green+strict PASS; cohort smoke PASS.
  Full suite **#610** 30/44 Scr 5901 RNG 348403 (43.94%).
- **Named omission:** air/water/earth/astral; create_gas_cloud region /
  Norep whoosh; movebubbles. (Adult-dragon HP → D-0551.)
- **Next:** (superseded by D-0551) @30263 C `next_ident` vs JS
  `get_location`.

## D-0549 — level_tele endgame AMULET_OF_YENDOR grant

- **Status:** fixed (partial — endgame plane `load_special`; heaven/Knox)
- **Symptom:** seed0373 @30061 C `next_ident` `rnd(2)` vs JS `rn2(3)` after
  matched `collect_coords` / mon_arrive (post soko4-2).
- **Cause:** wizard `^V` `?` `print_dungeon` force_dest to endgame; C
  `level_tele` grants `mksobj(AMULET_OF_YENDOR)` before `getbones`. JS
  deferred that arm and hit next-level `getbones` early.
- **C locus:** `teleport.c` `level_tele` levTport_menu endgame block;
  `mkobj.c` `mksobj`/`mksobj_init` AMULET_CLASS; `invent.c` `addinv_core1`.
- **Change:** `js/teleport.js` endgame grant + `addinv`/`prinv`/`uhave.amulet`;
  `js/mkobj.js` `made_amulet` on Yendor init.
- **Verification:** seed0373 rng-diff **30061→30065**; runner RNG
  **30115**/35386 Scr 23/124; green+strict PASS; cohort **28**/28 PASS
  (+green = 30). seed0116 RNG still full Scr 110/127.
- **Named omission:** endgame plane `load_special` (air/fire/water/earth/
  astral); heaven/escape; Knox; `lev_by_name`.
- **Next:** @30065 C nhlib `shuffle` `rn2(3)` vs JS `rn2(79)` (endgame
  special); or seed5006 `dosounds` @8468.

## D-0548 — soko3-1 / soko3-2 / soko4-2 load_special

- **Status:** fixed (partial — soko2-2 / soko4-1; solidify/premap)
- **Symptom:** seed0373 @29533 C nhlib `shuffle` `rn2(3)` vs JS
  `rn2(79)` after matched `makemaz` `rnd(2)=1` / getbones.
- **Cause:** `load_special_proto` omitted `soko3-1` (then after that
  peel, `soko4-2` when `makemaz` `rnd(2)=2`). JS fell through to
  ordinary `rn2(79)`.
- **C locus:** `dat/soko3-1.lua`, `dat/soko3-2.lua`, `dat/soko4-2.lua`;
  `sp_lev.c` `load_special`; `mkmaze.c` `makemaz` protofile.
- **Change:** `js/mklev.js` `load_soko3_1` / `load_soko3_2` /
  `load_soko4_2` + dispatch (soko4-2: hardfloor, PIT + SCR_EARTH,
  branch `place_lregion`).
- **Verification:** seed0373 rng-diff **29533→30061**; runner RNG
  **30129**/35386 Scr 22/124; green+strict PASS; cohort **28**/28
  PASS (+green = 30). seed0116 RNG still full Scr 110/127.
- **Named omission:** soko2-2 / soko4-1; solidify_map /
  premap_detect / exclusion_zones; levregion-after-flip coord fidelity.
- **Next:** @30061 C `next_ident` `rnd(2)` vs JS `rn2(3)` after
  matched `collect_coords`; or seed5006 `dosounds` @8468.

## D-0547 — soko2-1 load_special + DRY boulder reject

- **Status:** fixed (partial — soko2-2 / soko3-* / soko4-*; solidify/premap)
- **Symptom:** seed0373 @29189 C nhlib `shuffle` `rn2(3)` vs JS
  `rn2(79)` after matched `makemaz` `rnd(2)=1` / getbones.
- **Cause:** (1) `load_special_proto` omitted `soko2-1`, so JS skipped
  nhlib shuffle and fell through. (2) After loader, object placement
  diverged @29460 because `is_ok_location_dry` accepted boulder cells
  while C DRY humidity retries `get_location`.
- **C locus:** `dat/soko2-1.lua`; `sp_lev.c` `load_special` /
  `is_ok_location` DRY; `mkmaze.c` `makemaz` protofile `rnd(rndlevs)`.
- **Change:** `js/mklev.js` `load_soko2_1` + dispatch; `is_ok_location_dry`
  rejects `sobj_at(BOULDER)` like C.
- **Verification:** seed0373 rng-diff **29189→29533**; runner RNG
  **29554**/35386 Scr 22/124; green+strict PASS; cohort **28**/28
  PASS (+green = 30).
- **Named omission:** soko2-2 / soko3-* / soko4-*; solidify_map /
  premap_detect / exclusion_zones.
- **Next:** @29533 C nhlib shuffle (likely `soko3-1`); or seed5006
  `dosounds` @8468.

## D-0546 — m_initinv S_MUMMY wrapping

- **Status:** fixed (partial — S_DEMON / S_GIANT / S_WRAITH / S_LICH)
- **Symptom:** seed0373 @25869 C `m_initinv` `rn2(7)` vs JS trailing
  `rn2(50)`.
- **Cause:** JS `m_initinv` lacked `case S_MUMMY`, so mummy invent fell
  through to defensive/misc rolls where C burns `rn2(7)` then optional
  `mongets(MUMMY_WRAPPING)`.
- **C locus:** `makemon.c` `m_initinv` S_MUMMY (~772).
- **Change:** `js/makemon.js` `case 'S_MUMMY': if (rn2(7)) mongets(…MUMMY_WRAPPING)`.
- **Verification:** seed0373 rng-diff **25869→29189**; runner RNG
  **29214**/35386 Scr 22/124; green+strict PASS; cohort **30**/30 PASS.
- **Named omission:** `m_initinv` S_DEMON / S_GIANT / S_WRAITH / S_LICH;
  priest/monk arms; box open/disclose.
- **Next:** @29189 C nhlib `shuffle` `rn2(3)` vs JS `rn2(79)`; or
  seed5006 `dosounds` @8468.

## D-0545 — makemon MON_AT sees worm body segs

- **Status:** fixed (partial — full `level.monsters[][]` for non-worm mons)
- **Symptom:** seed0373 @25654 C `fill_zoo` `rn2(100)` (gold `rn1(i,10)`
  with i=100) vs JS `rn2(3)` after matched saddle + prior gold cell.
- **Cause:** After D-0544, C `MON_AT` rejects cells occupied by worm
  body segs (`place_worm_seg` → `level.monsters[][]`) so `makemon`
  returns null with no RNG and `fill_zoo` still places gold. JS
  `makemon` only scanned `fmon` heads, so it burned `rndmonst` /
  invent RNG on worm-seg cells.
- **C locus:** `makemon.c` `makemon` `MON_AT`; `rm.h` `place_worm_seg`;
  `mkroom.c` `fill_zoo` gold after failed makemon.
- **Change:** `js/makemon.js` MON_AT also consults `worm_mon_at`
  (`_level_monsters`).
- **Verification:** seed0373 rng-diff **25654→25869**; runner RNG
  **25885**/35386 Scr 22/124; green+strict PASS; cohort **30**/30
  PASS (+seed0116 screen residual); full `sessions` **30**/44,
  Scr 5900, RNG 344063 (43.40%).
- **Named omission:** non-worm mons still occupancy via `fmon` only;
  `m_initinv` S_MUMMY / S_DEMON; worm_move/grow/cut.
- **Next:** @25869 C `m_initinv` S_MUMMY `rn2(7)`; or seed5006
  `dosounds` @8468.

## D-0544 — makemon LONG_WORM initworm / place_worm_tail

- **Status:** fixed (partial — worm_move/grow/cut/save; emin after worm)
- **Symptom:** seed0373 @24531 C `makemon` `rn2(5)` vs JS `rn2(50)` after
  matched newmonhp / gender / in_mklev long-worm sleep.
- **Cause:** JS skipped `PM_LONG_WORM` `get_wormno`→`initworm(allowtail ?
  rn2(5) : 0)`→`place_worm_tail_randomly`, so invent's `rn2(50)` ran where
  C burned the worm-tail length roll + `rnd_nextto_goodpos` placements.
- **C locus:** `makemon.c` ~1405; `worm.c` `get_wormno`/`initworm`/
  `create_worm_tail`/`count_wsegs`/`place_worm_tail_randomly`; `rm.h`
  `place_worm_seg`.
- **Change:** new `js/worm.js` creation path + `_level_monsters` occupancy;
  `makemon` LONG_WORM arm (`MM_NOTAIL`); `m_at` / teleport `m_at` see segs;
  `clear_level_structures` → `clear_wormdata`.
- **Verification:** seed0373 rng-diff **24531→25654**; runner RNG
  **25657**/35386 Scr 22/124; green+strict PASS; cohort **28**/28 PASS;
  seed0116 RNG still full Scr 110/127.
- **Named omission:** `worm_move`/grow/shrink/cutworm/wormgone; save/rest
  wsegs; dprince/raven/emin between sleep and invent; full `level.monsters[][]`.
- **Next:** @25654 C `fill_zoo` `rn2(100)` vs JS `rn2(3)`; or seed5006
  `dosounds` @8468.

## D-0543 — soko1-2 load_special

- **Status:** fixed (partial — other `soko*-*`; solidify/premap/exclusion)
- **Symptom:** seed0373 @22651 C nhlib `shuffle` `rn2(3)` vs JS
  `rn2(79)` after matched `makemaz` `rnd(2)=2` / `getbones`.
- **Cause:** `rnd(2)=2` selects `soko1-2`; JS `load_special_proto`
  only had `soko1-1`, so load failed and later placement burned
  `get_location` while C ran nhlib shuffle from `soko1-2.lua`.
- **C locus:** `dat/soko1-2.lua`; `sp_lev.c` `load_special`;
  `mkmaze.c` `makemaz` protofile `rnd(rndlevs)`.
- **Change:** `js/mklev.js` `load_soko1_2` (map, stairs, boulders,
  traps, mimics, objects, doors, zoo region, percent(25) reward,
  wallify + `flip_level_rnd`) + dispatch.
- **Verification:** seed0373 rng-diff **22651→24531**; runner RNG
  **24545**/35386 Scr 22/124; green+strict PASS; cohort **28**/28
  PASS (+green = 30); seed0116 RNG still full Scr 110/127.
- **Named omission:** other `soko*-*`; solidify / premap /
  exclusion_zones; COURT/BEEHIVE/… fill_zoo arms.
- **Next:** @24531 C `makemon` `rn2(5)` vs JS `rn2(50)`; or
  seed5006 `dosounds` @8468.

## D-0542 — m_initinv S_QUANTMECH SchroedingersBox

- **Status:** fixed (partial — S_MUMMY / S_DEMON; box open/disclose)
- **Symptom:** seed0373 @21730 C `m_initinv` `rn2(20)` vs JS
  trailing `rn2(50)`.
- **Cause:** JS `m_initinv` lacked `case S_QUANTMECH`, so quantum
  mechanics skipped the SchroedingersBox `rn2(20)` gate and hit the
  defensive-item roll early.
- **C locus:** `makemon.c` `m_initinv` S_QUANTMECH (~777).
- **Change:** `js/makemon.js` port QUANTMECH arm — `!rn2(20)` +
  `PM_QUANTUM_MECHANIC` → `LARGE_BOX` + `CORPSE` HOUSECAT,
  `stop_timer(ROT_CORPSE)`, `add_to_container`, `mpickobj`.
- **Verification:** seed0373 rng-diff **21730→22651**; runner RNG
  **22674**/35386 Scr 22/124; green+strict PASS; cohort **28**/28
  PASS (+green = 30).
- **Named omission:** `m_initinv` S_MUMMY / S_DEMON; observe /
  disclose SchroedingersBox live-cat path.
- **Next:** @22651 C nhlib `shuffle` `rn2(3)` vs JS `rn2(79)`
  (`makemaz` / special load); or seed5006 `dosounds` @8468.

## D-0541 — m_initweap S_HUMAN is_elf kit

- **Status:** fixed (partial — MS_PRIEST / ninja; ANGEL/KOP/LIZARD)
- **Symptom:** seed0373 @19071 C `m_initweap` `rn2(2)` vs JS `rn2(75)`.
- **Cause:** JS S_HUMAN arm had mercenary + guardian only; C
  `else if (is_elf(ptr))` kit (line 226+) was deferred, so elves
  fell through to trailing `m_lev > rn2(75)` offensive roll.
- **C locus:** `makemon.c` `m_initweap` `is_elf`; `mondata.h`
  `is_elf` / `M2_ELF`.
- **Change:** `js/monsters.js` `M2_ELF` + `is_elf`; `js/makemon.js`
  port full elf kit (coat/cloak, helm/boots, dagger, `rn2(3)` weapon
  cases + `m_initthrow` arrows, ELVEN_MONARCH pickaxe/crystal ball).
- **Verification:** seed0373 rng-diff **19071→21730**; runner RNG
  **21757**/35386 Scr 22/124; green+strict PASS; cohort **28**/28
  PASS (+green = 30).
- **Named omission:** S_HUMAN MS_PRIEST / quest cleric / PM_NINJA;
  ANGEL/KOP/LIZARD specials; `m_initinv` S_QUANTMECH.
- **Next:** @21730 C `m_initinv` S_QUANTMECH `rn2(20)` vs JS
  `rn2(50)`; or seed5006 `dosounds` @8468.

## D-0540 — m_initweap soldier/watchman polearm rn1

- **Status:** fixed (partial — S_HUMAN elf / MS_PRIEST / ninja kits)
- **Symptom:** seed0373 @16261 C `m_initweap` `rn2(12)` vs JS `rn2(2)`
  after matched soldier/watchman `!rn2(3)` polearm gate.
- **Cause:** JS hardcoded `PARTISAN` and skipped C
  `rn1(BEC_DE_CORBIN - PARTISAN + 1, PARTISAN)` +
  `objects[w1].oc_skill == P_POLEARMS` retry loop.
- **C locus:** `makemon.c` `m_initweap` `PM_SOLDIER` / `PM_WATCHMAN`.
- **Change:** `js/makemon.js` port the `rn1` + skill-filter loop;
  import `P_POLEARMS`.
- **Verification:** seed0373 rng-diff **16261→19071**; runner RNG
  **19086**/35386 Scr 22/124; green+strict PASS; cohort **28**/28
  PASS (+green = 30); full suite **30**/44 Scr 5900 RNG 337400.
- **Named omission:** S_HUMAN `is_elf` / MS_PRIEST / ninja kits;
  ANGEL/KOP/LIZARD specials.
- **Next:** @19071 C `m_initweap` `is_elf` `rn2(2)` vs JS default
  `rn2(75)`; or seed5006 `dosounds` @8468.

## D-0539 — bigrm-8 load_special

- **Status:** fixed (partial — other bigrm-N; ensure_way_out/solidify/premap)
- **Symptom:** seed0373 @15574 C nhlib `shuffle` `rn2(3)` vs JS
  `get_location` `rn2(79)` after matched `makemaz` `rnd(13)=8` /
  `getbones`.
- **Cause:** `rnd(13)=8` selects `bigrm-8`; JS `load_special_proto`
  only had `bigrm-2`, so load failed and later placement burned
  `get_location` while C ran nhlib shuffle from `bigrm-8.lua`.
- **C locus:** `dat/bigrm-8.lua`; `sp_lev.c` `load_special`;
  `mkmaze.c` `makemaz` protofile `rnd(rndlevs)`.
- **Change:** `js/mklev.js` `load_bigrm_8` (map, percent(40) F-replace,
  lit/stairs/nondig/objects/traps/mons, wallify + `flip_level_rnd`)
  + dispatch.
- **Verification:** seed0373 rng-diff **15574→16261**; runner RNG
  **16275**/35386 Scr 22/124; green+strict PASS; cohort **28**/28
  PASS (+green = 30); seed0116 RNG still full Scr 110/127.
- **Named omission:** other `bigrm-N`; ensure_way_out / solidify /
  premap.
- **Next:** @16261 C `m_initweap` soldier polearm `rn2(12)` vs JS
  `rn2(2)`; or seed5006 `dosounds` @8468.

## D-0538 — maketrap STATUE_TRAP → mk_trap_statue

- **Status:** fixed (partial — full `mongone`; `MM_NOCOUNTBIRTH` born tally)
- **Symptom:** seed0373 @14748 C `rndmonst_adj` `rn2(7)` vs JS `rnd(4)`
  after matched `traptype_rnd` (=STATUE_TRAP).
- **Cause:** JS `maketrap` omitted C `STATUE_TRAP` → `mk_trap_statue`
  (`rndmonnum_adj(3,6)` → quest `rndmonst_adj`); next JS RNG was victim
  gate `rnd(4)` which C also burns later for STATUE but after the statue.
- **C locus:** `trap.c` `maketrap` / `mk_trap_statue`.
- **Change:** port `mk_trap_statue` (unicorn co-align retry, `mkcorpstat`
  CORPSTAT_NONE, temp `makemon` invent → container, local mongone);
  wire `maketrap` STATUE_TRAP case.
- **Verification:** seed0373 rng-diff **14748→15574**; runner RNG
  **15601**/35386 Scr 22/124; green+strict PASS; cohort **30**/30 PASS.
- **Named omission:** full `mongone`; `mvitals.born` / MM_NOCOUNTBIRTH.
- **Next:** @15574 C nhlib `shuffle` vs JS `get_location` after matched
  `makemaz`/`getbones`; or seed5006 `dosounds` @8468.

## D-0537 — mineralize In_quest goldprob/=4 gemprob/=6

- **Status:** fixed
- **Symptom:** seed0373 @12327 C `mineralize` `rn2(1000)` vs JS
  `rnd(2)` (`next_ident` after gold place).
- **Cause:** C sparsifies quest deposits (`goldprob /= 4`,
  `gemprob /= 6`); JS left that arm deferred. With full probs, JS
  accepted `rn2(1000)=15` as gold and burned `next_ident`/`rnd(quan)`
  while C skipped to the gem check.
- **C locus:** `mklev.c` `mineralize` (~1490–1492).
- **Change:** `js/mklev.js` `mineralize` — `else if (In_quest)` trunc
  divide matching C integer division.
- **Verification:** seed0373 rng-diff **12327→14748**; runner RNG
  **14774**/35386 Scr 22/124; green+strict PASS; cohort **28**/28
  PASS.
- **Named omission:** none new (quest mineralize probs now match C).
- **Next:** @14748 C `rndmonst_adj` `rn2(7)` vs JS `rnd(4)` after
  matched `traptype_rnd`; or seed5006 `dosounds` @8468.

## D-0536 — create_monster MON_AT → enexto before makemon

- **Status:** fixed (partial — fixed-coord Bar-strt chieftain/eel
  paths still omit the relocate; humidity get_location deferred)
- **Symptom:** seed0373 @11988 C `collect_coords` `rn2(8)` vs JS
  `rn2(2)` after matched `get_location`.
- **Cause:** C `create_monster` relocates via `enexto` when
  `MON_AT(x,y)` before `makemon`; JS `splev_create_monster` called
  `makemon` on the occupied cell, which returned null — next
  `find_montype` emitted `rn2(2)` while C shuffled enexto rings.
- **C locus:** `sp_lev.c` `create_monster` (~1976); `makemon.c`
  `MON_AT` + `MM_ADJACENTOK` → `enexto_core`.
- **Change:** `splev_resolve_occupied` + wire into
  `splev_create_monster`; `makemon` occupied arm matches C
  `MM_ADJACENTOK` / `enexto_core`.
- **Verification:** seed0373 rng-diff **11988→12327**; runner RNG
  **14397**/35386 Scr 22/124; green+strict PASS; cohort **28**/28
  PASS.
- **Named omission:** Bar-strt fixed-coord `makemon` without
  `splev_resolve_occupied`; full `mm_flags` from Lua tables.
- **Next:** @12327 C `mineralize` `rn2(1000)` vs JS `rnd(2)`
  (`next_ident` / gem cnt) — goldprob/gemprob or stone-cell filter;
  or seed5006 `dosounds` @8468.

## D-0535 — rnd_offensive_item case-0 FALLTHROUGH to WAN_STRIKING

- **Status:** fixed (partial — full muse offensive/misc tables still thin)
- **Symptom:** seed0373 @11957 C `mksobj_init` wand `rn2(5)` vs JS
  scroll `rn2(4)` after matched `rnd_offensive_item` `rn2(13)=0`.
- **Cause:** JS always returned `SCR_EARTH` on case 0; C returns
  `SCR_EARTH` only if `hard_helmet` / amorphous / `passes_walls` /
  noncorporeal / unsolid, else FALLTHROUGH → `WAN_STRIKING`.
- **C locus:** `muse.c` `rnd_offensive_item` case 0; `do_wear.c`
  `hard_helmet`; `worn.c` `which_armor`.
- **Change:** port case-0 gate + FALLTHROUGH; local `which_armor` /
  `hard_helmet`; restore animal/expl/mindless early return.
- **Verification:** seed0373 rng-diff **11957→11988**; runner RNG
  **12021→12023**/35386 Scr 22/124; green+strict PASS; cohort
  **28**/28 PASS; full suite **30**/44.
- **Named omission:** `is_helmet` armcat via `oc_skill===2` only;
  full muse use_* tables.
- **Next:** @11988 C `collect_coords` `rn2(8)` vs JS `rn2(2)`; or
  seed5006 `dosounds` @8468.

## D-0534 — mktrap WEB giant spider before victim gate

- **Status:** fixed (partial — full unified `mktrap()` still fragmented)
- **Symptom:** seed0373 @9875 C `next_ident`/`newmonhp` (WEB spider)
  vs JS victim-gate `rnd(4)` after matched `traptype_rnd` WEB.
- **Cause:** `splev_create_trap` / `mktrap_room` omitted C
  `mktrap` `kind == WEB && !MKTRAP_NOSPIDERONWEB` →
  `makemon(PM_GIANT_SPIDER)` before SEEN/victim.
- **C locus:** `mklev.c` `mktrap` WEB arm; `sp_lev.c` `create_trap`.
- **Change:** `mktrap_seen_victim` creates spider unless `nospider`;
  wire `splev_create_trap`/`mktrap_room` through it; tut-1 WEB keeps
  `nospider: true` (`spider_on_web=false`).
- **Verification:** seed0373 rng-diff **9875→11957**; runner RNG
  **10034→12021**/35386 Scr 22/124; green+strict PASS; cohort
  **28**/28 PASS.
- **Named omission:** single C-shaped `mktrap()` still split across
  callers; `make_a_trap` TELEP path unchanged.
- **Next:** @11957 C `mksobj_init` `rn2(5)` vs JS `rn2(4)`; or
  seed5006 `dosounds` @8468.

## D-0533 — attach_egg_hatch_timeout for typed eggs

- **Status:** fixed (partial — `hatch_egg` callback deferred)
- **Symptom:** seed0373 @9839 C `attach_egg_hatch_timeout` `rnd(151)`
  vs JS `rn2(79)` after matched egg `can_be_hatched`/`mksobj_init`.
- **Cause:** JS created typed eggs in `mksobj_init` but never called
  C `mksobj` post-init `set_corpsenm` → `attach_egg_hatch_timeout`
  (`rnd(i)>150` for i=151..200).
- **C locus:** `timeout.c` `attach_egg_hatch_timeout`/`stop_timer`;
  `mkobj.c` `set_corpsenm` EGG + `mksobj` case EGG.
- **Change:** port `stop_timer`/`attach_egg_hatch_timeout`; EGG path in
  `set_corpsenm`; `mksobj` calls `set_corpsenm` for EGG.
- **Verification:** seed0373 rng-diff **9839→9875**; runner RNG
  **9872→10034**/35386 Scr 22/124; green+strict PASS; cohort **30**/30.
- **Named omission:** `hatch_egg` body; FIG_TRANSFORM; burn/revive
  timer callbacks.
- **Next:** @9875 C `next_ident` `rnd(2)` vs JS `rnd(4)`; or seed5006
  `dosounds` @8468.

## D-0532 — rndmonst_adj quest gate → qt_montype

- **Status:** fixed (partial — rndmonst_adj rogue/elem/Inhell filters)
- **Symptom:** seed0373 @6811 C `rndmonst_adj` `rn2(7)` vs JS
  ordinary weight `rn2(3)` after Bar-fila load.
- **Cause:** JS `rndmonst_adj` omitted C quest prologue
  `u.uz.dnum == quest_dnum && rn2(7) && qt_montype()`; roles lacked
  `enemy1num`/`enemy2num`/`enemy1sym`/`enemy2sym`.
- **C locus:** `makemon.c` `rndmonst_adj`; `questpgr.c` `qt_montype`;
  `role.c` `roles[]` enemy fields; `you.h` Role.
- **Change:** port `qt_montype` (enemy1/2 + `mkclass` fallback);
  quest `rn2(7)` gate in `rndmonst_adj`; copy enemy fields onto
  `game.urole` from all `roles[]`.
- **Verification:** seed0373 rng-diff **6811→9839**; runner RNG
  **6849→9872**/35386 Scr still 22/124; green+strict PASS; cohort
  **30**/30 PASS; seed0116 RNG still full Scr 110/127.
- **Named omission:** `rndmonst_adj` upper/elemlevel/Inhell continues.
- **Next:** superseded by D-0533.

## D-0531 — on_locate + In_quest Bar-fila/filb + reset_xystart_size

- **Status:** fixed (partial — Bar-goal; other-role fills; on_goal)
- **Symptom:** seed0373 @5497 C nhlib `shuffle` `rn2(2)` vs JS
  Medusa `rn2(5)` after matched Bar-loca / S_TROLL.
- **Cause:** (1) `onquest` deferred `on_locate`, skipping C
  `qt_pager("locate_first")` nhl shuffle after Bar-loca arrival;
  JS then entered `^V2` quest dlevel 2 via ordinary `makelevel`
  (Medusa `rn2(5)`). (2) `makelevel` omitted C `In_quest` →
  `Bar-fila`/`Bar-filb`. (3) stale `splev_*` map bounds after
  Bar-loca skewed `get_location` (`rn2(76)` vs C `rn2(79)`).
- **C locus:** `quest.c` `on_locate`; `questpgr.c` `qt_pager`;
  `dat/quest.lua` Bar locate_*; `mklev.c` `makelevel` In_quest;
  `dat/Bar-fila.lua` / `Bar-filb.lua`; `sp_lev.c` `reset_xystart_size`.
- **Change:** port `on_locate` + Bar locate texts; `makelevel`
  In_quest fill + `load_bar_fila`/`load_bar_filb`; reset bounds at
  `load_special_proto` start; `splev_create_monster` peaceful override.
- **Verification:** seed0373 rng-diff **5497→6811**; runner RNG
  **5511→6849**/35386 Scr **21→22**/124; green+strict PASS; cohort
  **30**/30 PASS; seed0116 RNG still full Scr 110/127.
- **Named omission:** Bar-goal; other-role `*-fila`/`*-filb` loaders;
  `on_goal`; humidity `get_location`; dungeon.proto `makemaz("")`
  create_maze body.
- **Next:** @6811 C `rndmonst_adj` `rn2(7)` vs JS `rn2(3)` /
  `qt_montype`; or seed5006 `dosounds` @8468.

## D-0530 — m_initweap S_TROLL polearm kit

- **Status:** fixed (partial — S_ANGEL/S_KOP/S_LIZARD still deferred)
- **Symptom:** seed0373 @5082 C `m_initweap` `rn2(2)` vs JS `rn2(75)`
  after matched Bar-loca traps/monsters.
- **Cause:** JS `m_initweap` stubbed `S_TROLL` as empty break, skipping
  C's 50% polearm roll before the trailing `rn2(75)` offensive item.
- **C locus:** `makemon.c` `m_initweap` `case S_TROLL` (rn2(2) →
  rn2(4) RANSEUR/PARTISAN/GLAIVE/SPETUM).
- **Change:** `js/makemon.js` port S_TROLL kit; leave ANGEL/KOP/LIZARD
  deferred.
- **Verification:** seed0373 rng-diff **5082→5497**; runner RNG
  **5133→5511**/35386 Scr still 21/124; green+strict PASS; cohort
  **30**/30 PASS; seed0116 RNG still full Scr 110/127.
- **Named omission:** S_ANGEL / S_KOP / S_LIZARD `m_initweap` specials.
- **Next:** @5497 C nhlib `shuffle` `rn2(2)` vs JS `rn2(5)`; or
  seed5006 `dosounds` @8468.

## D-0529 — Bar-loca load_special + traptype_rnd level_difficulty

- **Status:** fixed (partial — Bar-goal/fila/filb; next m_initweap)
- **Symptom:** seed0373 @4571 C nhlib `shuffle` `rn2(3)` vs JS
  `u_on_rndspot` `rn2(79)` after matched tower1/getbones.
- **Cause:** `makemaz`/`load_special` had no `Bar-loca` loader. After
  porting the lua script, random traps stalled because `traptype_rnd`
  used `u.uz.dlevel` instead of C `level_difficulty()` (POLY_TRAP
  wrongly NO_TRAP on quest locate).
- **C locus:** `dat/Bar-loca.lua`; `sp_lev.c` `load_special`;
  `mklev.c` `traptype_rnd`.
- **Change:** `js/mklev.js` `load_bar_loca` + dispatch;
  `traptype_rnd` → `level_difficulty()` (+ WEB `MKTRAP_NOSPIDERONWEB`).
- **Verification:** seed0373 rng-diff **4571→5082**; runner RNG
  **4596→5133**/35386 Scr still 21/124; green+strict PASS; cohort
  **28**/28 PASS; seed0116 RNG still full Scr 110/127.
- **Named omission:** humidity-aware `get_location` for water-likers;
  `set_malign` after peaceful override; `single_level_branch` Knox in
  LEVEL_TELEP; FIRE_TRAP `Inhell` true path; Bar-goal/fila/filb.
- **Next:** @5082 C `m_initweap` `rn2(2)` vs JS `rn2(75)` (likely
  S_TROLL/class-T kit); or seed5006 `dosounds` @8468.

## D-0528 — tower1 load_special + vampshift / noteleport covetous

- **Status:** fixed (partial — Bar-loca next; tower2/3 omitted)
- **Symptom:** seed0373 @4159 C nhlib `shuffle` `rn2(3)` vs JS
  `u_on_rndspot` `rn2(79)`. Prior NOTES misread as Bar-loca; session
  menu `G` is **tower1** (Dlvl:37).
- **Cause:** `makemaz`/`load_special` had no `tower1` loader. Also missing
  vampshifter `newcham`/`pickvampshape` and `noteleport_level` covetous
  bypass (Vlad invent `rnd_defensive_item`).
- **C locus:** `dat/tower1.lua`; `sp_lev.c` `load_special`/`lspo_map`
  half-left; `makemon.c` cham/`newcham`; `mon.c` `pickvampshape`/
  `mgender_from_permonst`; `teleport.c` `noteleport_level`.
- **Change:** `js/mklev.js` `load_tower1` + dispatch; `js/makemon.js`
  vampshift/`newcham`/`pickvampshape` + Vlad candelabrum; `js/monsters.js`
  `M2_SHAPESHIFTER` helpers; `noteleport_level` covetous in makemon +
  teleport.
- **Verification:** seed0373 rng-diff **4159→4571**; runner RNG
  **4209→4596**/35386 Scr still 21/124; green+strict PASS; cohort
  **28**/28 PASS; seed0116 RNG still full Scr 110/127.
- **Named omission:** tower2/3; Bar-loca/goal/fila/filb; non-vamp
  `select_newcham_form`; hell-court noteleport; SpLev_Map fidelity
  beyond solidify set; `mon_has_special` Vlad gate (makemon skips
  newcham for Vlad).
- **Next:** @4571 C Bar-loca nhlib shuffle vs JS `u_on_rndspot`; or
  seed5006 `dosounds` @8468.

## D-0527 — onquest firsttime qt_pager nhl_init shuffle

- **Status:** fixed (partial — Bar-loca loader next)
- **Symptom:** seed0373 @4157 C nhlib `shuffle` `rn2(2)` vs JS
  `place_lregion` `rn2(79)` after matched Bar-strt losedogs
  `collect_coords`.
- **Cause:** JS `goto_level` omitted C `onquest` → `qt_pager("firsttime")`
  → `nhl_init` → nhlib.lua `shuffle(align)`. Materialize pline was also
  deferred until after `goto_level` returned.
- **C locus:** `quest.c` `onquest`/`on_start`; `questpgr.c`
  `com_pager_core`/`qt_pager`; `nhlua.c` `nhl_init` → `nhlib.lua`;
  `do.c` `goto_level` maybe_lvltport_feedback before onquest.
- **Change:** `js/quest.js` onquest/on_start; `qt_pager` nhl shuffle +
  Bar firsttime NHW_TEXT; wire materialize+onquest inside `goto_level`;
  Barbarian `homebase`/`ldrnum` for convert_arg.
- **Verification:** seed0373 rng-diff **4157→4159**; runner RNG
  **4185→4209**/35386 Scr **20→21**/124; green+strict PASS; cohort
  **30**/30 PASS; seed0116 RNG still full Scr 110/127.
- **Named omission:** locate/goal/nexttime qt_pager; full convert_arg;
  other-role firsttime texts; quest.lua embed beyond Bar firsttime.
- **Next:** @4159 C Bar-loca `load_special` nhlib shuffle vs JS
  `u_on_rndspot` `rn2(79)`; or seed5006 `dosounds` @8468.

## D-0526 — Bar-strt Pelias→branch + guardian m_initweap + eel sleep

- **Status:** fixed (partial — post-Bar-strt gameplay shuffle next)
- **Symptom:** seed0373 @3303 C `induced_align` `rn2(3)` (Pelias) vs JS
  wallify `rn2(79)` after D-0525 randline.
- **Cause:** `load_bar_strt` jumped to wallify before regions/doors/Pelias/
  chest/chieftains/trap/eels/ogre floodfill/flip/branch. Also missing
  `m_initweap` MS_GUARDIAN kit and `in_mklev` giant-eel sleep before invent.
- **C locus:** `dat/Bar-strt.lua`; `sp_lev.c` `create_monster`/`load_special`;
  `makemon.c` `m_initweap` MS_GUARDIAN + eel sleep; `selvar.c`
  `selection_floodfill`/`selection_rndcoord`; `nhlsel.c` flood/area/and.
- **Change:** extend `load_bar_strt` through branch levregion; port
  floodfill/area/and; guardian `m_initweap` (mndx gate); eel/ndemon sleep
  before invent; flip then oneshot `place_lregion` LR_BRANCH.
- **Verification:** seed0373 rng-diff **3303→4157**; runner RNG
  **3343→4185**/35386 Scr still 20/124; green+strict PASS; cohort
  **30**/30 PASS; seed0116 RNG still full Scr 110/127.
- **Named omission:** Pelias `m_dowear` after custom invent; S_HUMAN
  elf/priest/ninja `m_initweap`; flip lregion coord update.
- **Next:** @4157 C nhlib `shuffle` `rn2(2)` vs JS `rn2(79)` (post-
  Bar-strt); or seed5006 `dosounds` @8468; or seed0116 screen residual.

## D-0525 — Bar-strt selection_do_randline path carve

- **Status:** fixed (partial — Bar-strt loader continues)
- **Symptom:** seed0373 @3289 C `selection_do_randline` `rn2(7)` vs JS
  `rn2(79)` after matched `lspo_replace_terrain` forest strips.
- **Cause:** `load_bar_strt` stopped after replace_terrain and jumped to
  wallify; C runs `des.terrain(selection.randline(..., 37,7, 62,02, 7), ".")`
  then portal free spot before regions/monsters.
- **C locus:** `selvar.c` `selection_do_randline`; `nhlsel.c`
  `l_selection_randline` (rec=12); `dat/Bar-strt.lua`.
- **Change:** port `selection_new`/`getpoint`/`setpoint`/
  `selection_do_randline` in `js/mklev.js`; wire map-relative path carve +
  `{62,02}` ROOM in `load_bar_strt`.
- **Verification:** seed0373 rng-diff **3289→3303**; runner RNG
  **3343**/35386 Scr still 20/124; green+strict PASS; cohort PASS
  sample held; seed0116 RNG still full 12562 Scr 110/127.
- **Named omission:** Bar-strt lit regions, stairs, branch levregion,
  doors, Pelias invent, chest/chieftains, non_diggable, spiked pit,
  eels, ogre floodfill.
- **Next:** @3303 C `induced_align` `rn2(3)` (Pelias/makemon path) vs
  JS wallify `rn2(79)`; or seed5006 `dosounds` @8468.

## D-0524 — m_avoid_soko_push_loc must skip boulder-line cells

- **Status:** fixed
- **Symptom:** seed0116 @12521 C `distfleeck` `rn2(5)` vs JS `dog_move`
  `rn2(3)` after matched candidate rolls; C next EOT `were_change`
  `rn2(50)=0`.
- **Cause:** JS `m_avoid_soko_push_loc` was stubbed `false`. On Sokoban,
  C skips a pet candidate when `dist2(nx,ny,u)==4` and a boulder sits
  between that cell and the hero. Pet at (31,9) evaluated (30,10) in JS
  (extra `rn2(3)`/`rn2(12)`) while C continued past it to (31,8)/(32,9),
  finished `dog_move`, then post-move `distfleeck`.
- **C locus:** `monmove.c` `m_avoid_soko_push_loc`; caller
  `dogmove.c` `dog_move` (also `m_move` for hostiles).
- **Change:** port `m_avoid_soko_push_loc` in `js/mon.js` (Sokoban +
  peaceful/tame + `dist2==4` + `sobj_at(BOULDER)` on intervening cell).
- **Verification:** seed0116 RNG **12562**/12562 (full); Scr still
  **110**/127; green+strict PASS; cohort **30**/30 PASS.
- **Named omission:** hostile `m_move` still may not call this helper
  (dog_move path wired); `mfndpos` pool/lava/squeeze still partial.
- **Next:** seed0116 screen/cursor residual (110/127); or Bar-strt /
  dosounds peels.

## D-0523 — m_calcdistress must call were_change

- **Status:** fixed (partial — howl / armor break / flee onscary)
- **Symptom:** seed0116 @12461 C `rn2(50)` @ `were_change` vs JS
  `rn2(12)` @ `mcalcmove`.
- **Cause:** JS `m_calcdistress` deferred `were_change`; human-form
  lycanthropes never burned night/moonphase `rn2(3|10|30|50)`.
- **C locus:** `were.c` `were_change` / `new_were` / `counter_were`;
  `mon.c` `m_calcdistress` after `mon_regen`.
- **Change:** new `js/were.js`; wire `were_change(mtmp)` from
  `m_calcdistress`.
- **Verification:** seed0116 prefix **12461→12521** (runner RNG
  **12509→12554**/12562) Scr still **110**/127; green+strict PASS;
  cohort 28/28 PASS.
- **Named omission:** howl `You_hear`/`wake_nearto`; `mon_break_armor`;
  `possibly_unwield`; `monflee` when `onscary` after transform; cham
  `decide_to_shapeshift`.
- **Next:** @12521 C `distfleeck` `rn2(5)` vs JS `dog_move` `rn2(3)`;
  next C `were_change` `rn2(50)=0` (transform) @12522.

## D-0522 — put_lregion_here TELE must reject m_at when !oneshot

- **Status:** fixed (partial — were_change / exclusion populate / oneshot limbo)
- **Symptom:** seed0116 @12330 C continues `place_lregion` `rn2(79)` vs JS
  `rn2(8)` after matched `rn2(79)=45` / `rn2(21)=8` (xy 46,8).
- **Cause:** JS `put_lregion_here` for `LR_UPTELE`/`LR_DOWNTELE`/`LR_TELE`
  called `u_on_newpos` without C’s `m_at` gate. Probabilistic placement
  (`oneshot=FALSE`) must return FALSE when a monster occupies the cell so
  the caller retries. DIAG: rtype=5 (`LR_UPTELE`), typ=CORR, mon present,
  `bad_location`/`exclusion` clear.
- **C locus:** `mkmaze.c` `put_lregion_here` TELE arm (`m_at` → `rloc` /
  `m_into_limbo` if oneshot else FALSE); `is_exclusion_zone` wired.
- **Change:** `js/mklev.js` — port `is_exclusion_zone`; TELE `m_at` reject /
  oneshot `rloc` (limbo deferred).
- **Verification:** seed0116 prefix **12330→12461** (runner RNG
  **12368→12509**/12562) Scr still **110**/127; green+strict PASS;
  cohort 10/10 PASS; full `sessions` **30/44**, Scr **5898**, RNG
  **321672** (40.57%).
- **Named omission:** `m_into_limbo` on failed oneshot `rloc`; populate
  `exclusion_zones` from `des.exclusion` (soko MONGEN); `undestroyable_trap`
  gate; next were_change @12461.
- **Next:** `were_change` rn2(50) vs rn2(12); or Bar-strt / dosounds.

## D-0521 — load_soko1_1 must not fill_special_room

- **Status:** fixed (partial — post-fill TELE m_at done in D-0522)
- **Symptom:** seed0116 @12294 C `place_lregion` `rn2(79)` vs JS
  `rn2(1156)` after matched fill_zoo gold; NOTES guessed irregular cell
  filter / door adjacency after flip.
- **Cause:** D-0520 `load_soko1_1` called `fill_special_room` inside the
  loader; C `load_special` only wallifies/flips/`fixup_special`. Filling
  runs once later in `makelevel` (`mklev.c:1416`). JS filled the zoo twice
  (`needfill` stays FILL_NORMAL), so after C’s last gold JS started a
  second `mkgold`/`rn1`.
- **C locus:** `sp_lev.c` `load_special` (no fill); `mklev.c` `makelevel`
  `fill_special_room` loop after `makemaz`.
- **Change:** `js/mklev.js` `load_soko1_1` — remove premature
  `fill_special_room` loop; leave fill to makelevel common tail.
- **Verification:** seed0116 prefix **12294→12330** (runner RNG
  **12336→12368**/12562) Scr still **110**/127; green+strict PASS;
  cohort 8/8 PASS (0007/0060/0102/0398/0900/1500/1800/8000).
- **Named omission:** (superseded by D-0522 for put_lregion TELE m_at);
  other soko*-*.
- **Next:** see D-0522.

## D-0520 — soko1-1 load_special + builds_up level_difficulty

- **Status:** fixed (partial — fill_zoo cell tail / post-fill place_lregion)
- **Symptom:** seed0116 @9350 matched `makemaz` `rnd(2)=1` then JS ordinary
  `rn2(79)` vs C nhlib shuffle — next proto after bigrm was `soko1-1`.
- **Cause:** `load_special_proto` omitted Sokoban; `level_difficulty` ignored
  `builds_up` (Sokoban adj_lev/goldlim); `set_mimic_sym` burned maze
  `rn2(2)` on Sokoban and used `ftrap` instead of `t_at`; `m_initinv`
  omitted `S_LEPRECHAUN` / spider-snake `mkobj_at`.
- **C locus:** `dat/soko1-1.lua`; `mkmaze.c` `makemaz`; `sp_lev.c`
  `load_special` / `flip_level_rnd` / `fill_special_room`; `dungeon.c`
  `builds_up` / `level_difficulty`; `makemon.c` `set_mimic_sym` /
  `m_initinv` S_LEPRECHAUN + S_SPIDER/S_SNAKE; `mkroom.c` `fill_zoo`.
- **Change:** `js/mklev.js` — `load_soko1_1` + dispatch; `flip_level_rnd` /
  `flip_level`; `fill_zoo` ZOO path + `fill_special_room`; `js/hacklib.js`
  — `builds_up` / `level_difficulty`; `js/makemon.js` — Sokoban
  `set_mimic_sym` gate + `t_at_local`; leprechaun gold; spider/snake
  `mkobj_at`.
- **Verification:** seed0116 prefix **9351→12294** (runner matched RNG
  **12336**/12562) Scr **110**/127; green+strict PASS; cohort 6/6 PASS
  (0007/0060/0102/0398/1500/1800). seed0373 still @3289 randline.
- **Named omission:** fill_zoo irregular cell-count vs C after flip
  (extra JS gold after C’s 32nd); post-fill `place_lregion` branch;
  solidify/premap; other `soko*-*`; COURT/BEEHIVE/… fill_zoo arms.
- **Next:** reconcile fill_zoo cell filter / door adjacency after flip;
  or Bar-strt `selection_do_randline`; or seed5006 `dosounds`.

## D-0519 — makemaz protofile + bigrm-2 / Bar-strt load_special

- **Status:** fixed
- **Symptom:** seed0116 @6374 C `rnd(13)` @ `makemaz` vs JS ordinary
  `rn2(79)`; seed0373 @2550 C nhlib shuffle vs JS ordinary. Both reached
  `makemaz(slev.proto)` but the stub only handled `minefill`/`tut-1`.
- **Cause:** `makemaz` omitted C protofile construction (`rnd(rndlevs)` for
  multi-variant specials) and `load_special` for `bigrm-*` / quest start.
- **C locus:** `mkmaze.c` `makemaz`; `sp_lev.c` `load_special` /
  `lspo_replace_terrain` / `get_location`; `dat/bigrm-2.lua`;
  `dat/Bar-strt.lua`; `makemon.c` nymph/jabberwock sleep + `m_initinv`
  `S_NYMPH`.
- **Change:** `js/mklev.js` — `makemaz` builds protofile like C; dispatch
  `load_special_proto`; port `load_bigrm_2` (choice=3 path); `load_bar_strt`
  through three forest `replace_terrain`; `splev_map_origin` uses
  `splev_*`; CENTER ystart ROWNO clamp; `js/makemon.js` — mlet sleepers +
  nymph invent.
- **Verification:** seed0116 prefix **6374→9351** Scr **107→110**/127
  (next `makemaz` rnd(2) proto load); seed0373 **2550→3289** (next
  `selection_do_randline`); green+strict PASS; cohort **30/30** PASS.
- **Named omission:** other `bigrm-N`; Bar-strt randline/monsters/portal
  tail; `create_maze` fallback; spider/eel hideunder in makemon switch.
- **Next:** next special after seed0116 @9350; Bar-strt randline; or
  seed5006 `dosounds`.

## D-0518 — print_dungeon(TRUE) wizard ^V `?` menu

- **Status:** fixed
- **Symptom:** seed0116 @6373 / seed0373 @2549 — C `getbones` rn2(3) vs JS
  dog_move / ordinary arity. JS cancelled wizard `^V?` instead of opening
  the level-teleport menu, so no `goto_level` / `getbones`.
- **Cause:** `level_tele` treated `?` and `menu_requested` as cancel;
  `print_dungeon` absent.
- **C locus:** `dungeon.c` `print_dungeon` / `tport_menu` / `print_branch`
  / `unreachable_level` / `unplaced_floater`; `teleport.c` `level_tele`
  levTport_menu → force_dest.
- **Change:** `js/dungeon.js` bymenu PICK_ONE (headings, specials,
  branches, continuous a..z/A selectors, unreachable Knox letter skip);
  `js/teleport.js` `?`/menu_requested → `print_dungeon(TRUE)` force_dest
  schedule_goto; export `select_menu_pick_one` from `options.js`.
- **Verification:** seed0116 prefix **6373→6383** (getbones match; next
  `makemaz` rnd(13)); seed0373 **2549→2550** (getbones match; next
  nhlib shuffle / quest special); Scr unchanged 107/127 and 20/124;
  green+strict PASS; cohort **30/30** PASS. seed5006 still @8468
  `dosounds`.
- **Named omission:** bymenu=FALSE putstr; floating-branch listing;
  invocation/portal debug lines; endgame amulet grant after pick;
  `lev_by_name`.
- **Next:** seed0373/0116 special-level `makemaz` / quest `makemaz`;
  seed5006 `dosounds`.

## D-0517 — wizard Force-the-gods + pleased envelope

- **Status:** fixed
- **Symptom:** seed0116 first RNG miss @6246 — C `rn2(70)` @
  `moveloop_core` wipe_engr vs JS `rn2(20)` `gethungry` accessorytime.
  Prayer window had 3 EOTs with **0** C `gethungry` labels.
- **Cause:** `dopray` omitted wizard `Force the gods to be pleased?`.
  With `ublesscnt=300`, `can_pray` sets `p_type=0` (too soon); without
  Force, no `uinvulnerable`, so `gethungry` burned `rn2(20)` on prayer
  EOTs. C Force→`y` raises `p_type` to 3 + clears `ublesscnt` →
  shimmering + `uinvulnerable` → `gethungry` early-return.
- **C locus:** `pray.c` `dopray` wizard Force; `eat.c` `gethungry`
  `uinvulnerable` gate; `pray.c` `pleased` (follow-on after Force).
- **Change:** `js/pray.js` — Force yn after `can_pray` (clear
  ublesscnt/luck/align/ugangr; `p_type<2`→3); `pleased` You_feel +
  action `rn1` + `ublesscnt=rnz(350)`; `prayer_done` p_type 3/2→pleased.
- **Verification:** seed0116 prefix **6246→6373** positional
  **6373**/12562 Scr **101→107**/127; green+strict PASS; cohort
  **30/30** PASS (incl. seed0017 pray). seed5006 unchanged @8468.
- **Named omission:** `fix_worst_trouble` / pat_on_head gifts / crown /
  `give_spell`; full `in_trouble`; ParanoidConfirm "yes".
- **Next:** seed0116 @6373 `getbones` after `^V?` — needs
  `print_dungeon` (shared with seed0373 @2549) / seed5006 `dosounds`.

## D-0516 — weffects WAN_DIGGING → zap_dig

- **Status:** fixed
- **Symptom:** seed0116 first RNG miss @5910 — C `rn2(18)` @
  `zap_dig` (`rn1(18,8)`) vs JS `rn2(5)` (dig wand skipped in
  RAY `weffects`).
- **Cause:** `weffects` RAY branch handled only
  `WAN_MAGIC_MISSILE`..`WAN_LIGHTNING`; `WAN_DIGGING`/`SPE_DIG` →
  `zap_dig` deferred.
- **C locus:** `zap.c` `weffects`; `dig.c` `zap_dig`.
- **Change:** `js/dig.js` `zap_dig` horizontal door/maze/obstructed
  dig + `DISP_BEAM` `*`; `js/zap.js` `weffects` dig dispatch +
  `learnwand`.
- **Verification:** seed0116 prefix **5910→6246** positional
  **6275**/12562 Scr **79→101**/127; green+strict PASS; cohort
  **30/30** PASS. seed5006 unchanged @8468.
- **Named omission:** swallowed/`u.dz`/`dighole`; pitdig conjoined /
  `pit_flow`; `watch_dig`; shop `add_damage`/`pay_for_damage`;
  `in_town` cavernous gate.
- **Next:** seed0116 @6246 `moveloop_core` rn2(70) vs rn2(20) /
  seed5006 `dosounds` / seed0373 `print_dungeon`.

## D-0515 — ^V wiz_level_tele / level_tele numeric → getbones

- **Status:** fixed
- **Symptom:** Shared near-misses (seed0116 @2978, seed5006 @4182,
  seed0373 @2549) showed C `rn2(3)` @ `getbones` vs JS dog_move /
  makelevel arity — JS never reached `mklev` after wizard level-port.
- **Cause:** `C('v')` unbound in `rhack`; `level_tele` /
  `deferred_goto` after rhack absent. Same lesson as D-0068/D-0149
  (unbound command, not getbones body).
- **C locus:** `cmd.c` wizlevelport; `wizcmds.c` `wiz_level_tele`;
  `teleport.c` `level_tele`; `dungeon.c` `get_level`; `allmain.c`
  `deferred_goto` after `rhack`.
- **Change:** `js/cmd.js` key 22 → `wiz_level_tele`; `js/wizcmds.js`
  envelope; `js/teleport.js` wizard/Teleport_control getlin numeric
  → `get_level` → `schedule_goto`; `js/dungeon.js` `get_level`;
  `js/allmain.js` `deferred_goto` after rhack.
- **Verification:** seed0116 prefix **2978→5910** positional
  **6034**/12562 Scr **9→79**/127; seed5006 **4182→8468** positional
  **8507**/13923 Scr **4→121**/249; green+strict PASS; cohort
  **28/28** PASS. seed0373 still @2549 — needs `print_dungeon` `?`
  menu (early `^V?` key ownership).
- **Named omission:** `print_dungeon`/`lev_by_name`; involuntary
  `random_teleport_level`; heaven/escape negative; endgame dest;
  Knox `single_level_branch`; Quest depth polish; find_hell;
  invocation clamp; Nowhere suicide; next_to_u leash body.
- **Next:** seed0116 `zap_dig` @5910 / seed5006 `dosounds` @8468 /
  seed0373 `print_dungeon` / quest `makemaz`.

## D-0514 — wizard done2 Dump core + topten early-exit (seed0398 PASS)

- **Status:** fixed
- **Symptom:** seed0398 Scr **84**/87 after D-0513 — @84 C `Dump core?`
  vs JS possessions yn; @86 C wizard score-list msg vs leftover Dump
  core / Goodbye / wrong cursor.
- **Cause:** `done2` omitted wizard `Dump core?` ynq; ESC→`q` never
  set `done_stopprint`, so disclose ran; `show_death_rip` still showed
  Goodbye when tombstone+stopprint; `topten` omitted wizard/discover
  early-exit; trailing `raw_print("")`×2 missing; GameDisplay lacked
  `getCursor` so blanks no-op'd.
- **C locus:** `end.c` `done2`/`really_done`; `topten.c` wizard branch
  + `showwin`; GameDisplay↔Terminal cursor.
- **Change:** `js/end.js` Dump-core ynq + stopprint rip skip + blanks;
  `js/topten.js` wizard/discover message; `js/game_display.js`
  `getCursor` delegate.
- **Verification:** seed0398 Scr **84→87**/87 **PASS** (RNG 3026/3026);
  green+strict PASS; cohort **28/28** PASS.
- **Named omission:** Dump-core `'y'` → `NH_abort`/sound_exit (stopprint
  stub); LOGFILE/XLOGFILE; toptenwin NHW_TEXT; ParanoidQuit getlin.
- **Next:** near-miss survey / leaderboard; suite refresh @#575.

## D-0513 — zapwrapup shuddering vibrations (seed0398 @48)

- **Status:** fixed
- **Symptom:** seed0398 Scr **83**/87 — first miss @48: C
  `You feel shuddering vibrations.` vs JS blank (cursor OK).
- **Cause:** `zapwrapup` deferred the C `You_feel` after `do_osshock`
  set `_obj_zapped`.
- **C locus:** `zap.c` `zapwrapup` / `do_osshock` / `weffects` IMMEDIATE.
- **Change:** `js/zap.js` — `await You_feel('shuddering vibrations.')`
  in `zapwrapup`; `await` from `weffects`.
- **Verification:** seed0398 Scr **83→84**/87 (RNG 3026/3026);
  green+strict PASS (with D-0514 cohort).
- **Named omission:** `create_polymon` after `poly_zapped`; shop bill
  in `do_osshock`; `bhitm` poly body.
- **Next:** @84 Dump core (D-0514).

## D-0512 — !verbose drop getobj leftover topline (seed0398 @28)
- **Status:** fixed
- **Symptom:** seed0398 Scr **77**/87 — first miss @28: C still shows
  `What do you want to drop? [a-o or ?*]` with hero cursor vs JS blank
  (or, after leaving prompt text, cursor stuck on topline).
- **Cause:** With `OPTIONS=!verbose`, C `drop()` is silent and
  `getobj`→`yn_function` leaves `gt.toplines` TOPLINE_NON_EMPTY until
  `parse()` `clear_nhwindow(WIN_MESSAGE)`. JS wiped `_pending_message`
  on getobj return; `clear_nhwindow_message` no-op'd when `_toplin`
  stayed EMPTY; `flush_screen` matched `/^What do you want/` and stole
  the hero cursor for leftover prompts.
- **C locus:** `invent.c` `getobj` → `yn_function`; `do.c` `drop`
  (`flags.verbose`); `cmd.c` `parse` clear; tty cursor on map.
- **Change:** `getobj_drop` via `yn_function`; `mark_topline_prompt`;
  `clear_nhwindow_message` clears pending; remove getobj cursor steal
  from `flush_screen` (callers set cursor while awaiting input).
- **Verification:** seed0398 Scr **77→83**/87 (RNG 3026/3026);
  green+strict PASS; cohort **27/27** PASS; full suite **29/44**,
  Scr 5520/11405.
- **Named omission:** shuddering vibrations @48; end-disclose Dump
  core vs invent yn @84; getobj `?`/`*` menus / ALLOWCNT split.
- **Next:** @48 `You feel shuddering vibrations.` vs blank.

## D-0511 — set_playmode plname "wizard" (seed0398 Scr 0)
- **Status:** fixed
- **Symptom:** seed0398 Scr **0**/87 (RNG full) — first cell
  `Hello Polly` / botl `Polly` vs C `Hello wizard` / `Wizard`.
- **Cause:** C `set_playmode` overwrites `OPTIONS=name` with
  `"wizard"` when `wizard`; JS never called it, and
  `setup_role_race_from_rc` re-applied `opts.name` in newgame.
- **C locus:** `options.c` `set_playmode`; `unixmain.c` call before
  `plnamesuffix`.
- **Change:** `js/options.js` `set_playmode`; `js/jsmain.js` call
  after rc flags merge; remove plname rewrite in
  `js/u_init.js` `setup_role_race_from_rc`.
- **Verification:** seed0398 Scr **0→77**/87 (RNG 3026/3026);
  green+strict PASS; cohort **27/27** PASS.
- **Named omission:** `authorize_wizard_mode` / sysopt.wizards gate;
  explore authorize / deferred_X; restore-path `set_playmode`.
- **Next:** @28 blank `What do you want to drop?` getobj topline.

## D-0510 — #wizgenesis create_particular (seed0398 @2960)

- **Status:** fixed
- **Symptom:** seed0398 first RNG miss @2960 — C `rn2(8)` at
  `collect_coords` vs JS `rnl(20)` (lock). Scr 0; RNG **2960**/3026.
- **Cause:** `#wizgenesis` present in extcmd AC data / C but missing
  from JS `EXT_CMDS`; enter said unknown, so `jackal\n` was played as
  move/apply keys and hit `doforce`/`rnl(20)`. C ran
  `create_particular`→`makemon`→`enexto`→`collect_coords`.
- **C locus:** `wizcmds.c` `wiz_genesis`; `read.c` `create_particular`/
  `_parse`/`_creation`; `makemon.c` `makemon` + `MM_NOEXCLAM`;
  `teleport.c` `collect_coords` (via `enexto`).
- **Change:** `js/read.js` `create_particular` named path;
  `js/wizcmds.js` `wiz_genesis`; `js/getline.js` EXT_CMDS entry
  (not EXT_CMD_AC — flags lack AUTOCOMPLETE); `js/cmd.js` `^G`.
- **Verification:** seed0398 RNG **2960→3026**/3026 (full);
  green+strict PASS; cohort **29/29** PASS. Scr still **0**/87.
- **Named omission:** class-letter/* random; cant_revive yn;
  tame/peaceful/hostile/saddled/sleeping/invisible/hidden prefixes;
  makemon in-body MM_NOMSG appear (caller pline instead).
- **Next:** seed0398 first-cell screen peel (Scr 0/87).

## D-0509 — IMMEDIATE weffects bhit/bhito WAN_POLYMORPH (seed0398 @2852)

- **Status:** fixed
- **Symptom:** seed0398 first RNG miss @2852 — C `rn2(8)` at
  `weffects` `bhit(..., rn1(8,6), ...)` vs JS `rn2(5)` (IMMEDIATE
  stub). Scr 0; RNG **2853**/3026.
- **Cause:** `weffects` skipped IMMEDIATE `bhit`/`bhito`; also
  `learnwand` called `discover_object` without `credit_hero`, so
  seen `obj_shudders` missed `makeknown`→`exercise(A_WIS)`.
- **C locus:** `zap.c` `weffects` IMMEDIATE arm; `bhit`/`bhitpile`/
  `bhito` WAN_POLYMORPH; `obj_shudders`/`obj_unpolyable`/`poly_obj`;
  `learnwand`→`makeknown`; `mkobj.c` `replace_object`.
- **Change:** `js/zap.js` — IMMEDIATE `bhit`+`bhito` poly pile;
  `poly_obj` floor; `learnwand`→`makeknown`. `js/mkobj.js` —
  `replace_object` floor + export `oc_merge_of`.
- **Verification:** seed0398 RNG **2853→2960**/3026 (prefix
  2852→2960); green+strict PASS; cohort **27/27** PASS.
- **Named omission:** `bhitm` poly body; `zap_updown`/`zap_map`;
  `create_polymon`; invent/worn `poly_obj`; other `bhito` otyps;
  boxlock; shop bill in `do_osshock`.
- **Next:** @2960 C `collect_coords` `rn2(8)` vs JS `rnl(20)`.

## D-0508 — trapeffect_rust_trap hero+monster (seed0398 @2839)

- **Status:** fixed
- **Symptom:** seed0398 first RNG miss @2839 — C `rn2(5)` at
  `distfleeck` vs JS `rn2(20)` after matching `rn2(5)` labeled
  `trapeffect_rust_trap`. Scr 0; RNG **2840**/3026.
- **Cause:** `trapeffect_selector` omitted `RUST_TRAP`; JS never
  called hero `trapeffect_rust_trap` `rn2(5)`. Matched @2838 was
  JS `distfleeck` arity coincidence with C’s rust aim roll, then
  JS was already in `m_move` `rn2(20)`.
- **C locus:** `trap.c` `trapeffect_rust_trap`; selector case
  `RUST_TRAP`; `water_damage`/`splash_lit` aim arms.
- **Change:** `js/trap.js` — `trapeffect_rust_trap` hero+monster
  `rn2(5)` switch + `water_damage`/`splash_lit`; wire selector;
  `body_part` HEAD/ARM.
- **Verification:** seed0398 RNG **2840→2853**/3026 (prefix
  2839→2852); green+strict PASS; cohort **27/27** PASS.
- **Named omission:** `update_inventory`; lantern dunk in
  `splash_lit`; `split_mon` body; mlifesaver “starts to fall”;
  poly `body_part` table; full `erode_obj` rust from water.
- **Next:** @2852 C `weffects` `rn2(8)` vs JS `rn2(5)`.

## D-0507 — wish parse_charges + wrp class words (seed0398 @2764)

- **Status:** fixed
- **Symptom:** seed0398 first RNG miss @2764 — C `rn2(46)` at
  `rnd_otyp_by_namedesc` during wizard wish
  `wand of polymorph (0:30)`; JS already at `mcalcmove` `rn2(12)`
  (wish returned null / no mksobj). Scr 0; RNG **2773**/3026.
- **Cause:** `readobjnam` omitted `readobjnam_parse_charges` (strip
  trailing `(R:S)`) and wrp[] `"wand of X"` → `WAND_CLASS` +
  `actualn="polymorph"`; also skipped `rnd_otyp_by_namedesc` when
  `oclass` was set.
- **C locus:** `objnam.c` `readobjnam_parse_charges`;
  postparse1 wrp[]/wrpsym[]; postparse3 `rnd_otyp_by_namedesc`;
  wand `otmp->recharged = rechrg`.
- **Change:** `js/readobjnam.js` — charge strip; wrp class-word
  parse; search with oclass; set `recharged` on WAND_CLASS.
- **Verification:** seed0398 RNG **2773→2840**/3026 (prefix
  2764→2839); green+strict PASS; cohort seed0006/0007/1500/1800
  PASS; full suite **29/44** Scr 5296 RNG **303302** (38.26%).
- **Named omission:** full postparse1/2 (named/called/labeled,
  o_ranges, glass, fruits, traps/terrain); non-wizard spe clamps;
  amulet shape specials; wish help/retry/livelog.
- **Next:** @2839 `distfleeck` rn2(5) vs rnd(20) after rust trap.

## D-0506 — enlightenment Sleepy / Poison_res / Stealth (seed0007 @297)

- **Status:** fixed
- **Symptom:** after D-0505, first cell miss @297 (Scr **297**/302) —
  Final Status/Attributes omitted `You fell asleep uncontrollably.` /
  `poison resistant` / `stealthy` (cascading Mores). RNG full.
- **Cause:** gameover `enlightenment` Status/Attributes subset skipped
  C `Sleepy` (`fall`/`fell` asleep uncontrollably),
  `Poison_resistance`, and `Stealth` lines already active via
  restful-sleep amulet + orc/rogue `adjabil`.
- **C locus:** `insight.c` `status_enlightenment` Sleepy arm;
  `attributes_enlightenment` Poison_resistance / Stealth;
  `youprop.h` macros; `cause_known(SLEEPY)`.
- **Change:** `js/invent.js` — `status_core_lines` Sleepy (+ magic /
  RESTFUL_SLEEP `cause_known` subset); MAGIC attributes
  `poison resistant` + `stealthy` in C order.
- **Verification:** seed0007 **PASS** Scr **302**/302 RNG full;
  green+strict PASS; cohort **26/26** PASS; full `sessions`
  **29/44** (Scr 5296, RNG 303218).
- **Named omission:** other status troubles; remaining resistances /
  appearance props; blocked-Stealth; full `cause_known` via oc_oprop;
  from_what suffixes.
- **Next:** leaderboard 22-vs-29 gap; next near-miss survey.

## D-0505 — tin_details tintxts / homemade (seed0007 @293)

- **Status:** fixed
- **Symptom:** after D-0504, first cell miss @293 (Scr **296**/302) —
  death invent `an uncursed homemade tin of lichen` (C) vs
  `an uncursed tin of lichen` (JS). RNG full.
- **Cause:** JS `tin_details` only emitted `tin of <mon>`; omitted C
  tintxts adjective when `cknown && spe < 0` (homemade/rotten before
  "tin"; others as `of <txt> `). Death disclose sets `cknown` via
  `set_cknown_lknown`.
- **C locus:** `eat.c` `tin_details` / `tin_variety(displ)` / `tintxts[]`;
  `invent.c` `set_cknown_lknown` TIN.
- **Change:** `js/objnam.js` — tintxts table + display `tin_variety`
  + full `tin_details`; vegetarian via `mons`/`vegetarian`.
- **Verification:** seed0007 Scr **296→297**/302; @293 homemade;
  first miss @297 Final Attributes (Sleep/Poison_res/Stealth);
  RNG full; green+strict PASS; cohort **26/26** PASS.
- **Named omission:** non-display `tin_variety`/`set_tin_variety` RNG
  arms; `use_tinning_kit`; eat-path tin open.
- **Next:** seed0007 @297 enlightenment Status attributes (D-0506 fixed).

## D-0504 — add_erosion_words oeroded degrees (seed0007 @161)

- **Status:** fixed
- **Symptom:** after D-0503, first cell miss @161 (Scr **294**/302) —
  invent `very burnt +1 leather armor` (C) vs `+1 leather armor` (JS).
  RNG full.
- **Cause:** JS `doname` only stubbed rknown+oerodeproof as bare
  `"rustproof "`; omitted C `add_erosion_words` oeroded/oeroded2
  degree prefixes (`very`/`thoroughly` + burnt/rusty/cracked/
  corroded/rotted) and full proof word table.
- **C locus:** `objnam.c` `add_erosion_words`; `objclass.h`
  `is_rustprone`/`is_flammable`/`is_corrodeable`/`is_crackable`/
  `is_damageable`; `mkobj.c` `is_flammable`/`is_rottable`.
- **Change:** `js/objnam.js` — port `add_erosion_words` (local material
  helpers; no mkobj import cycle); call before spe for WEAPON/ARMOR.
- **Verification:** seed0007 Scr **294→296**/302; @161 very burnt;
  first miss @293 homemade tin; RNG full; green+strict PASS; cohort
  **26/26** PASS.
- **Named omission:** BALL/CHAIN + weptool-as-weapon class remap;
  greased prefix; `tin_details` tintxts/`homemade` (cknown+spe<0).
- **Next:** seed0007 @293 invent `homemade tin of lichen`.

## D-0503 — TIN xname known + otyp_uses_known (seed0007 @150)

- **Status:** fixed
- **Symptom:** after D-0502, first cell miss @150 (Scr **291**/302) —
  Take-out `c - a tin` (C) vs `c - a tin of lichen` (JS). RNG full.
- **Cause:** (1) JS `pretty_base` always called tin_details; C
  `xname_flags` FOOD only appends when `obj->known`. (2) Generated
  objects table omits `oc_uses_known`; FOOD `unk=1` (tin/egg) fell
  through the heuristic so `mksobj` started `known=1`.
- **C locus:** `objnam.c` `xname_flags` TIN/`known`; `eat.c`
  `tin_details`; `mkobj.c` `unknow_object`; `objects.h` FOOD unk.
- **Change:** `js/objnam.js` — gate tin_details on `obj.known`;
  `otyp_uses_known` treats TIN/EGG as uses_known (mksobj known=0).
- **Verification:** seed0007 Scr **291→294**/302; @150 bare tin;
  first miss @161 invent `very burnt` leather; RNG full; green+strict
  PASS; cohort **26/26** PASS.
- **Named omission:** `add_erosion_words` oeroded/oeroded2 (burnt/
  rusty/corroded degrees); full `tin_variety`/tintxts; table still
  lacks extracted `oc_uses_known`.
- **Next:** seed0007 @161 doname erosion words on worn leather.

## D-0502 — find_ac ARM_BONUS erosion (seed0007 @124 AC)

- **Status:** fixed
- **Symptom:** after D-0501, first cell miss @124 (Scr **126**/302) —
  botl `AC:9` (C) vs `AC:7` (JS) after chest loot. RNG full.
- **Cause:** JS `find_ac` used `a_ac + spe` only; C `ARM_BONUS` is
  `a_ac + spe - min(greatest_erosion, a_ac)`. Rogue start leather is
  `+1` (AC 7 when uneroded); eroded suit yields AC 9. Also omitted
  ring-of-protection / amulet-of-guarding / HProtection / uspellprot
  and form-base `mons[umonnum].ac`.
- **C locus:** `do_wear.c` `find_ac`; `hack.h` `ARM_BONUS`; `obj.h`
  `greatest_erosion`.
- **Change:** `js/u_init.js` `find_ac` — ARM_BONUS + rings/amulet/
  intrinsic Protection/`uspellprot`; set `botl` on AC change.
- **Verification:** seed0007 Scr **126→291**/302; first miss @150
  tin doname; RNG full; green+strict PASS; cohort **26/26** PASS;
  full suite #560 **28/44**, Scr **5285**/11405.
- **Named omission:** monster `find_mac` ARM_BONUS still spe-only in
  places; full `HProtection` prop wiring beyond intrinsic bits.
- **Next:** seed0007 @150 Take-out `a tin` vs `a tin of lichen`.

## D-0501 — lootabc display + take-out INVORDER_SORT + gold bot()

- **Status:** fixed
- **Symptom:** after D-0500, first cell miss @111 (Scr **116**/302 total) —
  C `in_or_out_menu` shows lootabc `a/b/c/d/e` vs JS classic `o/i/b/r/s`;
  then @116 `Take out what?` missing pack-order class headings / `$` letter
  (Coins/Scrolls/Spellbooks/Gems). RNG full.
- **Cause:** (1) D-0490 accepted lootabc keys but always painted classic
  selectors despite `flags.lootabc` true after session `mO`. (2)
  `menu_loot_takeout` walked `cobj` order with only a Coins heading —
  C `query_objlist(INVORDER_SORT,!USE_INVLET)` uses `sortloot` +
  `let_to_name` per class. (3) gold `out_container` set `botl` flag
  instead of C's immediate `bot()`, so next More still showed `$:0`.
- **C locus:** `pickup.c` `in_or_out_menu` / `menu_loot` /
  `query_objlist` / `out_container`; `invent.c` `sortloot` /
  `let_to_name`.
- **Change:** `js/pickup.js` — lootabc-gated display selectors;
  take-out `sortloot(LOOT|PACK)` + class headings + `$`/a,b,c letters;
  `await bot()` after gold remove.
- **Verification:** seed0007 Scr **116→126**/302; first miss @124
  `AC:9` vs `AC:7`; RNG full; green+strict PASS; cohort **26/26** PASS
  (+ green 2 → 28).
- **Named omission:** put-in `query_objlist` class-heading polish;
  autopick `A`; traditional_loot; more_containers `n`; menu_head_objsym.
- **Next:** seed0007 @124 botl AC (armor/wear path).

## D-0500 — botl hu_stat hunger (seed0007 Scr @85)


- **Status:** fixed
- **Symptom:** after D-0499, first screen miss @85 — C botl
  `… T:68 Satiated` after jackal corpse eat vs JS no hunger token.
  Scr **85**/302; RNG full.
- **Cause:** `_statusLine2` deferred hunger (D-0458 list); C
  `do_statusline2` emits `hu_stat[u.uhs]` when `u.uhs != NOT_HUNGRY`
  before `enc_stat`. Field `newuhs` already set SATIATED (D-0438).
- **C locus:** `botl.c` `do_statusline2`; `eat.c` `hu_stat[]`.
- **Change:** `js/display.js` `_statusLine2` — `HU_STAT` + append
  before `enc_stat` when `uhs !== NOT_HUNGRY`.
- **Verification:** seed0007 Scr **85→116**/302 (@85 match; first
  miss @116 loot take-out); RNG full; green+strict PASS; cohort
  **28/28** PASS.
- **Named omission:** Stone/Slime/Strngl/Sick before hunger;
  Halluc_resistance; Upolyd HD; Knox/quest/endgame describe_level.
- **Next:** seed0007 @116 `#loot` take-out menu / D-0501.

## D-0499 — doset per-bool pline (seed0007 Scr @38)

- **Status:** fixed
- **Symptom:** after D-0498, first screen miss @38 — price_quotes More:
  C `Xp:1/0` vs JS `Xp:1/0 T:1` (time one message-pair early). Scr
  **84**/302; RNG full.
- **Cause:** JS batched two toggle strings into one `pline`, so both
  `showexp` and `time` were applied before `flush_screen`→`bot()` when
  the next pair forced `more()` on the prior topline. C’s
  `optfn_boolean` plines each bool; showexp sets `disp.botl` then
  plines — flush paints `Xp:1/0` before `more()` on the price_quotes
  pair, then time is applied afterward.
- **C locus:** `options.c` `doset` → `parseoptions` → `optfn_boolean`
  (showexp/time → `disp.botl` + per-opt `pline`); `pline.c`/`topl.c`
  NEED_MORE append `"  "` / `more()`.
- **Change:** `js/options.js` `doset` — one `await pline(...)` per
  selected bool (removed msgBuf join-2).
- **Verification:** seed0007 Scr **84→85**/302 (@38 match; first miss
  @85 Satiated); RNG full; green+strict PASS; cohort 26/26 PASS.
- **Named omission:** botl hunger `hu_stat`/`Satiated` (next @85);
  full `parseoptions` after-change; `reset_needed_visuals`.
- **Next:** seed0007 @85 botl hunger / D-0500.

## D-0498 — doset fmtstr + bool defaults (seed0007 Scr @20)

- **Status:** fixed
- **Symptom:** after D-0497 full RNG, first screen miss @20 — `mO` full
  `doset` menu: JS `name[value]` vs C `%-Ns [value]`; many On defaults
  showed `[false]` (undefined bag fields). Scr **60**/302.
- **Cause:** D-0488 `doset()` used bare concat and `doset_bool_value`
  treated undefined as false; C `Sprintf(fmtstr,"%%s%%-%us [%%s]",
  longest_option_name)` + `allopt_array_init` `*(addr)=initval`.
- **C locus:** `options.c` `doset` / `doset_add_menu` / `longest_option_name`;
  `optlist.h` NHOPTB On initvals; `optfn_boolean` showexp/time → `disp.botl`.
- **Change:** `js/options.js` — `format_doset_opt_line` (width
  `dosetSimpleNameWidth`); help `%4s` indent; `DOSET_BOOL_DEFAULT_ON` +
  corrected addrs; showexp/time toggles set `flags.botl`.
- **Verification:** seed0007 Scr **60→84**/302 (prefix @20→@38); RNG
  still full; green+strict PASS; cohort 26/26 PASS.
- **Named omission:** pick-list vs message timing for showexp before
  its pline (@38 C `Xp:1/0` vs JS early `T:1`); full `parseoptions`
  after-change arms; `allopt_array_init` into bags at startup.
- **Next:** seed0007 @38 botl timing / remaining screen peel.

## D-0497 — mhitm_ad_drst mhitu poison gate (seed0007 @16346)

- **Status:** fixed
- **Symptom:** after D-0496, first RNG miss @16346 — C `rn2(10) @
  mhitm_mgc_atk_negated` vs JS `rn2(3)` (knockback). Scr **60**/302;
  matched prefix **16346**. DIAG: water-moccasin `AT_BITE`+`AD_DRST`.
- **Cause:** `mhitm_adtyping_u` default-zeroed non-PHYS/ELEC, so
  `AD_DRST` never called `mhitm_mgc_atk_negated` before
  `mhitm_knockback`. C `mhitm_ad_drst` always rolls the MC gate
  (`verbosely=FALSE`) then `hitmsg`; leather armor `a_can=1` makes
  `rn2(10)=1` negate the poison arm (no `rn2(8)`), then knockback.
- **C locus:** `uhitm.c` `mhitm_ad_drst` / `mhitm_adtyping` cases
  `AD_DRST`/`AD_DRDX`/`AD_DRCO`; `mhitu.c` `hitmu` → adtyping.
- **Change:** `js/mhitu.js` `mhitm_ad_drst_u` + typing cases; export
  `AD_DRST`/`AD_DRDX`/`AD_DRCO` from `js/mhitm.js`. Poisoned body stub
  burns `rn2(30)` when poison applies.
- **Verification:** rng-diff **16346→16373** (full); seed0007 RNG
  **16373**/16373 Scr **60**/302; green+strict PASS; cohort 26/26 PASS;
  full **28/44** Scr **5054** RNG **303218**/792838.
- **Named omission:** full `attrib.c` `poisoned()` (messages, adjattrib,
  fatal HP/`done`); `mpoisons_subj` display string; uhitm/mhitm poison
  branches.
- **Next:** seed0007 screen peel (Scr 60 with full RNG).

## D-0496 — postmov hides_under rn2(5) / hideunder (seed0007 @16339)

- **Status:** fixed
- **Symptom:** after D-0495, first RNG miss @16339 — C `rn2(5) @
  distfleeck` vs JS `rnd(20)`. Scr **60**/302; matched prefix **16339**.
  Prior slots matched C `postmov` `rn2(5)` vs JS (arity coincidence with
  another `distfleeck`).
- **Cause:** `postmov` omitted the `hides_under` / `S_EEL` gate
  (`mundetected || (!helpless && rn2(5))` → `hideunder`). Water moccasins
  are `M1_CONCEAL`; after snake spawn their move burned C’s hide roll while
  JS fell through to `mattacku` `rnd(20)`.
- **C locus:** `monmove.c` `postmov` (≈1692–1698); `mon.c` `hideunder`;
  `monmove.c` `can_hide_under_obj`.
- **Change:** `js/monmove.js` — port `can_hide_under_obj` subset,
  `hideunder` mundetected body, and the postmov gate (outside `OBJ_AT`).
- **Verification:** rng-diff **16339→16346**; seed0007 RNG
  **16355**/16373 Scr **60**; green+strict PASS; cohort 28/28 PASS.
- **Named omission:** hideunder `You_see` pline; pet `cursed_object_at`;
  cockatrice corpse skip; `maybe_spin_web`; `after_shk_move`.
- **Next:** @16346 C `mhitm_mgc_atk_negated` `rn2(10)` vs JS `rn2(3)`.

## D-0495 — drinkfountain dowatersnakes rn1(5,2) (seed0007 @15983)

- **Status:** fixed
- **Symptom:** after D-0494, first RNG miss @15983 — C `rn2(5) @
  dowatersnakes` vs JS `rn2(3)` (`dryup`). Scr **60**/302; matched RNG
  **15985**/16373 before fix.
- **Cause:** `drinkfountain` case 22 was empty (snakes deferred), so the
  turn fell through to `dryup` `rn2(3)` while C rolled `rn1(5,2)` then
  `makemon` water moccasins.
- **C locus:** `fountain.c` `dowatersnakes` (≈38–60): `num = rn1(5, 2)`
  before `G_GONE`; Blind/`You_hear` vs stream pline; loop `makemon`
  `PM_WATER_MOCCASIN` + `mintrap` on trap tile. Drink case 22 / dip
  case 23 call it.
- **Change:** `js/fountain.js` — port `dowatersnakes`; wire drink case
  22 and dip case 23.
- **Verification:** rng-diff **15983→16339**; seed0007 RNG
  **16344**/16373 Scr **60**; green+strict PASS; cohort 28/28 PASS.
- **Named omission:** Hallucination `makeplural(rndmonnam)`;
  `dowaternymph` / looted case-27 fallthrough; dip uncurse/demon/nymph.
- **Next:** @16339 C `distfleeck` `rn2(5)` vs JS `rnd(20)`.

## D-0494 — Amulet_on RESTFUL_SLEEP rnd(98) (seed0007 @15877)

- **Status:** fixed
- **Symptom:** after D-0493, first RNG miss @15877 — C `rnd(98) @
  Amulet_on` vs JS `rn2(5) @ distfleeck`. Scr **60**/302; matched RNG
  **15898**/16373 before fix.
- **Cause:** `Amulet_on` deferred all sleep/change/strangle/flying bodies;
  putting on `AMULET_OF_RESTFUL_SLEEP` never rolled `rnd(98)+2` into
  `HSleepy` TIMEOUT, so JS entered the monster pass one call early.
- **C locus:** `do_wear.c` `Amulet_on` case `AMULET_OF_RESTFUL_SLEEP`
  (≈1047–1054): `newnap = rnd(98)+2`; keep shorter/non-zero vs oldnap.
- **Change:** `js/do_wear.js` — RESTFUL_SLEEP arm sets `u.HSleepy`
  TIMEOUT bits; still `on_msg` when `!on_msg_done`.
- **Verification:** rng-diff **15877→15983**; seed0007 RNG
  **15985**/16373 Scr **60**; green+strict PASS; cohort 26/26 PASS.
- **Named omission:** change/strangle/flying/breathing/ESP see_monsters;
  Guarding makeknown; `Amulet_off` RESTFUL clear; `nh_timeout` SLEEPY
  dialogue / fall_asleep.
- **Next:** @15983 C `dowatersnakes` `rn2(5)` vs JS `rn2(3)`.

## D-0493 — set_move_cmd clears travel (seed0007 @15284)

- **Status:** fixed
- **Symptom:** after D-0492, first RNG miss @15284 — C `rn2(12) @
  dog_move` vs JS `rn2(4)` wanderer. Scr **60**/302; matched RNG
  **15339**/16373.
- **Cause:** leftover `context.travel=1` from earlier `_` travel. JS
  walk/run never cleared travel like C `set_move_cmd`, so `continue_run`
  for capital `H` recomputed `findtravelpath` and overwrote `u.dx/dy`
  (SE instead of west). Hero drifted onto the pet → JS `nearby=1`
  wanderer `rn2(4)` while C stayed on the west run (`!nearby` →
  `dog_move` selection).
- **Falsified:** dog_move cand cnt; peaceful-before-wanderer reorder;
  force `!nearby` alone (invent/goal next).
- **C locus:** `cmd.c` `set_move_cmd` — `travel = travel1 = 0` before
  setting `run`.
- **Change:** `js/cmd.js` — clear `travel`/`travel1` on walk and
  capital/Ctrl run (and forcefight dir) paths.
- **Verification:** rng-diff **15284→15877**; seed0007 RNG
  **15898**/16373 Scr **60**; green+strict PASS; cohort 26/26 PASS.
- **Named omission:** full `accept_menu_prefix` table; lookaround
  Blind/trap/pool arms; `distfleeck` scared/onscary.
- **Next:** @15877 C `Amulet_on` `rnd(98)` vs JS `distfleeck` `rn2(5)`.

## D-0492 — seed0007 @13259 eye_of_newt_buzz

- **Status:** fixed
- **Symptom:** after D-0491, first RNG miss @13259 — C `rn2(3) @
  eye_of_newt_buzz` vs JS `rn2(100)`. Scr **60**/302; matched RNG
  **~13657**/16373.
- **Cause:** finishing a newt corpse never ran `cpostfx`; JS skipped the
  AT_MAGC||PM_NEWT energy boost (`rn2(3)` / `rnd(3)` / optional `rn2(3)`).
- **C locus:** `eat.c` `done_eating` → `cpostfx` → `eye_of_newt_buzz`.
- **Change:** `js/eat.js` — `eye_of_newt_buzz`; thin `cpostfx` for the
  default check_intrinsics energy path; call from `done_eating` for
  CORPSE/globby (cookie still via `fpostfx` rumor).
- **Verification:** rng-diff **13259→15284**; RNG **15339**/16373;
  Scr **60**; green+strict PASS; cohort 28/28 PASS.
- **Named omission:** cpostfx specials (wraith/were/nurse/…);
  `corpse_intrinsic` / `givit`; AD_STUN/AD_HALU hallu; floor `useupf`.
- **Next:** @15284 C `dog_move` rn2(12) vs JS rn2(4).

## D-0491 — seed0007 @7175 SCR_DESTROY_ARMOR / destroy_arm

- **Status:** fixed
- **Symptom:** after D-0490, first RNG miss @7175 — C `rn2(19) @ exercise`
  then `destroy_arm` vs JS `rn2(5) @ distfleeck`. Scr **60**/302.
- **Cause:** FOOBIE BLETCH invent letter was uncursed `SCR_DESTROY_ARMOR`.
  JS gated it as unimplemented, so `r`/`i` consumed no turn; later movement
  burned monster RNG where C ran `seffects`→`exercise(A_WIS)`→`destroy_arm`
  (leather armor smoulders via `erode_obj` ERODE_BURN).
- **C locus:** `read.c` `seffects` / `seffect_destroy_armor`; `do_wear.c`
  `destroy_arm` / `some_armor` / `obj_erode_type`; `trap.c` `erode_obj`.
- **Change:** wire `SCR_DESTROY_ARMOR`; `destroy_arm` + `some_armor`;
  `erode_obj` damage/destroy envelope; export mkobj erosion helpers.
- **Verification:** rng-diff **7175→13259**; matched RNG **~13657**/16373;
  Scr **60**; green+strict PASS; cohort seed1500/1800/0060/0012/0004/
  0002/0006/0013/0009/0017 PASS.
- **Named omission:** confused `p_glow2`; cursed vibrate `adj_abon` /
  `make_stunned`; `disintegrate_arm` / blessed choice /
  `disintegrate_cursed_armor`; `costly_alteration` EF_PAY;
  `inventory_resistance_check`; full `remove_worn_item` before delobj.
- **Next:** @13259 C `eye_of_newt_buzz` rn2(3) vs JS rn2(100).

## D-0490 — seed0007 @7142 obj_resists vs dog_move rn2(1)

- **Status:** fixed
- **Symptom:** after D-0489, first RNG miss @7142 — C `rn2(100) @
  obj_resists` vs JS `rn2(1)`. Scr **60**/302; matched RNG **7885**/16373.
- **Cause:** second `#loot` on the unlocked large box takes contents into
  invent (gold sorts as `$` before TRIPE). C invent dogfood scan burns
  +1 `obj_resists` on gold then stops on TRIPE. JS `menu_loot_takeout`
  was MENU_PARTIAL-only and `in_or_out_menu` ignored lootabc `a`, so
  contents never left the box and invent still stopped after 7 calls.
- **C locus:** `pickup.c` `use_container` / `menu_loot` / `query_category`
  / `out_container`; `dogmove.c` `dog_goal` invent `dogfood`.
- **Change:** `js/pickup.js` — MENU_FULL take-out category query (skip
  when single class); `@` invert-all; accept lootabc `a`→take-out while
  displaying classic `o/i/b`; `out_container`→`addinv` gold.
- **Verification:** rng-diff **7142→7175**; RNG matched **7885→~8014**;
  Scr **60**; green+strict PASS; cohort incl. seed0004/0012 PASS.
- **Named omission:** autopick `A`; traditional_loot; lootabc display
  sync when recordings disagree; full multi-item prinv More polish.
- **Next:** @7175 C `exercise` rn2(19) vs JS rn2(5) / `destroy_arm`.

## D-0486 — vision_recalc rogue_vision (Is_rogue_level)

- **Status:** fixed
- **Symptom / context:** While pealing seed0007 @2832, noticed JS
  `vision_recalc` always used Algorithm-C `view_from`, never C's
  `rogue_vision` branch (`vision.c` when `Is_rogue_level`).
- **C locus:** `vision.c` `vision_recalc` / `rogue_vision`.
- **Change:** `js/vision.js` — on `Is_rogue_level(u.uz)`, call
  `rogue_vision` (room bounds COULD_SEE[+IN_SIGHT if rlit]; always
  adjacent 3×3; doorway ortho `newsym`). Named omissions: Blind
  old-sight newsym path; `do_light_sources`; pit/underwater clamps.
- **Not seed0007:** peel is Rogue *role* on **dlevel 1**
  (`rogue_level` is dlevel 16); `Is_rogue` false; prefix still 2832.
- **Verification:** green+strict PASS; cohort seed1500/1800/0013/
  0006/0002/0012/0004/0030/0009 PASS.
- **Next:** D-0485 gettrack/`!couldsee` on ordinary levels.

## D-0489 — #loot locked box pick_lock / picklock (seed0007 @7066)

- **Status:** fixed
- **Symptom:** after D-0488, first RNG miss @7066 — C `rn2(100) @ picklock`
  vs JS `rn2(5)`. Scr **60**/302.
- **Cause:** session `#l` + `y` is `#loot` on a locked floor chest. C
  `do_loot_cont` → `pick_lock(autokey, ox, oy, cobj)` box occupation. JS
  `use_container`/`doloot` stubbed autounlock; `picklock` cancelled when
  `xlock.box` set — so JS never emitted the occupation `rn2(100)`.
- **C locus:** `pickup.c` `do_loot_cont`; `lock.c` `pick_lock` underfoot box
  + `picklock` box arm (chance `4*DEX+25` rogue pick).
- **Change:** `js/pickup.js` `do_loot_cont` APPLY_KEY autounlock;
  `js/lock.js` box `pick_lock`/`picklock`/`lock_action` + export `autokey`.
- **Verification:** rng-diff **7066→7142**; RNG matched **7309→7885**;
  Scr **60**/302; green+strict PASS; cohort 26 PASS.
- **Named omission:** AUTOUNLOCK_UNTRAP/FORCE; interactive apply-to-box;
  `chest_trap` on trapped unlock; magic-key disarm yn.
- **Next:** @7142 C `obj_resists` rn2(100) vs JS `dog_move` rn2(1) (D-0490).

## D-0488 — eatcorpse rn2(20) vs rn2(7) (seed0007 @6414)

- **Status:** fixed
- **Symptom:** after D-0487, first RNG miss @6414 — C `rn2(20) @ eatcorpse`
  vs JS `rn2(7)`. Scr **20**/302.
- **Cause:** session `mO` configures `pickup_types=$"?!=/` (no food) then
  steps onto a jackal corpse. JS cleared `menu_requested` before `O`, so
  `doset_simple` never redirected to full `doset()`; `pickup_types` stayed
  empty ⇒ autopick-all took the corpse into invent; `floorfood` saw an
  empty pile and never entered `eatcorpse`'s rotting `rn2(20)`.
- **C locus:** `options.c` `doset_simple`/`doset` (menu_requested);
  `cmd.c` CMD_M_PREFIX on `O`; `pickup.c` `autopick_testobj`.
- **Change:** `js/cmd.js` — keep `menu_requested` for `O` (and other
  m-prefix cmds); `js/options.js` — `doset()` PICK_ANY + `doset_simple`
  → `doset` when `menu_requested`; contest-ordered bool/compound pages so
  session letters select autopickup + `pickup_types`.
- **Verification:** rng-diff **6414→7066**; Scr **20→60**/302; green+strict
  PASS; cohort 10 PASS. Next @7066 C `rn2(100) @ picklock`.
- **Named omission:** full `accept_menu_prefix` table; compound getlin
  arms beyond `pickup_types`; WC/wizard filters; help-file `?` body.

## D-0487 — picklock + doopen autounlock (seed0007 @3219)

- **Status:** fixed
- **Symptom:** after D-0485, first RNG miss @3219 — C `rn2(100) @ picklock`
  vs JS `rn2(5) @ distfleeck`.
- **Cause:** JS `doopen_indir` stubbed locked-door autounlock; `pick_lock`
  default branch faked "no door" instead of ynq + `set_occupation(picklock)`.
  Autoopen into a locked door never entered the occupation.
- **Change:** `js/lock.js` — `autokey`, door LOCKED/CLOSED `pick_lock` ynq +
  `picklock` occupation (`rn2(100)` vs chance), `doopen_indir` autounlock
  APPLY_KEY path; `js/jsmain.js` default `flags.autounlock=AUTOUNLOCK_APPLY_KEY`.
- **Verification:** rng-diff **3219→6414**; green+strict PASS; cohort 10 PASS.
  Scr still 20/302.
- **Next:** @6414 C `rn2(20) @ eatcorpse` vs JS `rn2(7)`.
- **Named omission:** box pick_lock; magic-key trap disarm; `b_trapped` body;
  AUTOUNLOCK_KICK; quest-artifact autokey ranking; forcelock occupation.

## D-0485 — dofire ready More + getdir MV_ANY (seed0007 @2832)

- **Status:** fixed
- **Symptom:** seed0007 first RNG miss @2832 — C `rn2(1)=0 @ dog_move`
  vs JS `rn2(5) @ distfleeck`. Hero Y drifted: C stayed y=18 on `H` run;
  JS first real move was bare `y` → (37,17).
- **Cause:** (1) After `doquiver_core("fire")` ready pline, `getdir_cmdassist`
  `flush_topl_more` More-ate session keys `=/\r`, so getdir saw capital `H`.
  (2) JS getdir only accepted lowercase dirchars — `H` → invalid →
  `help_dir` swallowed `Y`/`h`/space; next rhack key `y` walked NW.
  C `movecmd(dirsym, MV_ANY)` accepts walk/run/rush; with no spurious More,
  `=/\r` cancel getdir and `H` is the capital run.
- **Change:** `js/dothrow.js` — `mark_topline_seen` after successful fire
  quiver (D-0484 pattern); `dir_from_key` for capitals + Ctrl-rush in
  `getdir` / `getdir_cmdassist`.
- **Verification:** rng-diff prefix **2832→3219**; green+strict PASS;
  cohort seed1500/1800/0101/0013/0006/0002/0004/0012/0030/0009 PASS.
  Scr still 20/302.
- **Next:** @3219 C `rn2(100) @ picklock` (D-0487).
- **Named omission:** autoquiver/polearm/bullwhip/find_launcher; full
  `movecmd` bind table beyond hjklyubn/HJKLYUBN/C(dir).

## D-0484 — dofire empty quiver continue + getobj letter ownership

- **Status:** fixed (partial peel)
- **Symptom:** seed0007 first RNG miss @2824 — C `rn2(12) @ mcalcmove`
  vs JS `rn2(7) @ do_attack` (safemon bump). Input desync: getobj More
  ate invent letter `h` after `f`, so later keys shifted into pet bump.
- **Cause:** (1) `dofire` returned after `doquiver_core` instead of C's
  fall-through to getdir/throw; (2) `You("no ammunition readied.")` left
  NEED_MORE and getobj `flush_topl_more` discarded `h`/`=`/`/`/`\r`
  before the invent letter (session has no More-dismiss between `f` and
  `h`).
- **C locus:** `dothrow.c` `dofire` (!uquiver → You → `doquiver_core` →
  continue); `invent.c` `getobj` / `topl.c` `tty_yn_function` more;
  `wintty.c` `tty_nhgetch` NEED_MORE→NON_EMPTY.
- **Change:** `js/dothrow.js` `dofire` — mark_topline_seen after ammo
  pline; doquiver then continue with uquiver → getdir like C.
- **Verification:** rng-diff prefix **2824→2832**; green+strict PASS;
  cohort seed1500/1800/0101/0013/0006 PASS. Scr still 20/302.
- **Next:** @2832 C `rn2(1) @ dog_move` vs JS next `distfleeck` —
  pet candidate j==0 / mfndpos order under whappr=1.
- **Named omission:** autoquiver body; polearm/bullwhip empty-quiver
  arms; post-quiver fireassist find_launcher.

## D-0483 — revert D-0480 serialize space/NO_COLOR coerce

- **Status:** fixed
- **Symptom:** Judge PASS **23→22** at `lastScored` 2026-07-16T08:55Z
  (after D-0480). Lost PASS: seed0013-rogue-friday13-combat **59→58**/59
  (full RNG). Also judge cell bleed seed0004 −1, seed0030 −3, seed2200 −2
  while local still PASS. D-0479 did not change seed0013 wire; D-0480
  rewrote **56/59** screens (stripped `\x1b[37m` on clearScreen blanks).
- **Cause:** Blind serialize tweak for an offline-irreproducible LB gap;
  local `diffCell` forgives space color so suite stayed green; judge did
  not. Broader than Hoimar (who only coerces space+attr0+CLR_GRAY).
- **Change:** Restore pre-D-0480 `serialize_for_scoring` color path
  (`colorToFg(cell.color)` only). Keep D-0480 `vanqsort_cmp` strcmpi.
- **Verification:** green+strict; seed0013/0002/0004/0012/0030 local PASS.
- **Next:** next judge cron should restore seed0013 if hypothesis holds;
  else upstream #5-style report.

## D-0482 — death disclose invent + enlightenment + vanquished ask

- **Status:** fixed
- **Symptom:** seed0006 Scr **110**/123 — after possessions yn, C showed
  invent `(1 of 2)` / `(2 of 2)` then attributes; JS skipped to attributes yn.
- **Cause:** `disclose` invent `'y'` deferred; missing invent ID walk;
  gameover invent headings used ATR_INVERSE (C `add_menu_heading` clears
  when `gameover`); charged rings lacked `+spe` and `mksobj` `oc_uses_known`
  zeroing; enlightenment omitted night/moon/Antimagic/infra/warded/Luck;
  `list_vanquished` skipped ask yn; overview omitted `dunlev_ureached` range.
- **C locus:** `end.c` `really_done`/`disclose`/`container_contents`;
  `windows.c` `add_menu_heading`; `objnam.c` RING `oc_charged` spe;
  `mkobj.c` `unknow_object`; `insight.c` background/attributes/
  `list_vanquished`; `dungeon.c` `print_mapseen`; `calendar.c` `night`.
- **Change:** wire invent ID + `display_inventory` + `container_contents`;
  gameover heading ATR_NONE; charged-ring spe + `otyp_uses_known` in
  `mksobj`; `iflags.at_night`; enlightenment night/moon + attrs;
  vanquished `yn_function`; overview `levels A to B`.
- **Verification:** seed0006 **PASS** 123/123 RNG full; green+strict;
  28/28 cohort; full suite **28/44** Scr **5014** RNG **289819**.
- **Named omissions:** SchroedingersBox; set_uasmon FROMRACE props;
  full resistance catalogue; builds_up overview; set_vanq_order.
- **Next:** seed0007 snake swamp Scr 20/302.

## D-0481 — makemon newsym after spawn

- **Status:** fixed
- **Symptom:** seed0006 screen@102 sole cell miss — JS floor `·` vs C `&`
  (blue water demon) east of stairs after “You unleash a water demon!”.
  Demon existed (combat/RNG full) but map never painted it until later.
- **Cause:** JS `makemon` linked onto `fmon` and returned without
  `newsym`; C always `newsym(mx,my)` when `!gi.in_mklev` (and early
  when `byyou`).
- **C locus:** `makemon.c` `makemon` (`!gi.in_mklev` → `newsym`;
  `byyou` early `newsym`+`set_apparxy`).
- **Change:** `js/makemon.js` call `newsym` on byyou path and again
  after invent when `!game.in_mklev`. `set_apparxy` omitted (circular
  import; `dochug` sets mux/muy before combat).
- **Verification:** seed0006 Scr **106→110**/123 first miss
  **@102→@110**; RNG full; green+strict; 25 PASS cohort held.
- **Named omissions:** byyou `set_apparxy`; MM_NOMSG appear-pline arm.
- **Next:** seed0006 @110 disclose invent pages after possessions yn
  (C `Weapons` / `Gems/Stones`; JS skips to attributes ynq).

## D-0480 — serialize glyphless spaces as NO_COLOR; vanqsort strcmpi

- **Status:** partial — strcmpi kept; serialize coerce **reverted** (D-0483)
- **Symptom / context:** Official LB `richie3366` **23/44** PASS vs local
  **27/44**; gap sessions seed0002/0004/0012/0030 have **full RNG** and
  **14 cell misses** total on judge. Local + hub `/sessions/` both **PASS
  100%** (Node 22/24). Hub session bytes ≠ github template but visually
  equal after `decodeScreen`. Competitors (Hoimar/serteal/…) PASS those
  four on the same judge. SO-wrap of `{` rejected: C mixes bare `{` and
  SO+`{`; `` ` `` is both DEC pool and ROCK_CLASS.
- **C locus:** tty default fg for blank cells; `insight.c` `vanqsort_cmp`
  `strcmpi` (not ICU `localeCompare`).
- **Change (original):** `serialize_for_scoring` coerced glyphless spaces
  to `NO_COLOR` + `tty_map_color` on glyphs; `vanqsort_cmp` ALPHA uses
  byte `toLowerCase` order.
- **Verification:** green+strict PASS locally; **judge worsened** (D-0483).
- **Next:** see D-0483.

## D-0479 — mondead unmap_object clears remembered invisible glyph

- **Status:** fixed
- **Symptom:** seed0006 screen@77 sole cell miss — JS `I` vs C `#` after
  "The kitten bites it." (invisible defender killed).
- **Cause:** `pre_mm_attack` correctly `map_invisible`'d the unseen mon;
  on death C `mondead` calls `unmap_object` when `glyph_is_invisible`, but
  JS `mondead` only `newsym`'d — and `newsym` re-paints remembered `I`.
- **C locus:** `mon.c` `mondead` (invisible glyph → `unmap_object`);
  `display.c` `unmap_object` / `unmap_invisible`.
- **Change:** `display.js` `unmap_object` + `unmap_invisible` + export
  `glyph_is_invisible`; `mondead` in `mhitm.js` / `uhitm.js` / `trap.js`
  clears invisible memory before `newsym`.
- **Verification:** seed0006 Scr **95→106**/123 first miss **@77→@102**;
  RNG full; green+strict; 25-session PASS cohort held.
- **Named omissions:** makemon `PM_STALKER`/`PM_BLACK_LIGHT` perminvis;
  dark-room `S_room`→`S_stone` waslit tweak in `unmap_object`; callers of
  `unmap_invisible` outside death (detect/zap/apply).
- **Next:** seed0006 @102 JS `.` vs C `&` after water-demon unleash.

## D-0478 — hilite_pet / wc2_petattr ATR_INVERSE on tame map glyphs

- **Status:** fixed
- **Symptom:** seed0006 screen@71 sole cell miss — fox `f` JS attr=0 vs
  C ATR_INVERSE after Options toggled `hilite_pet` on.
- **Cause:** `newsym` painted tame monsters via `show_glyph_cell` with
  attr 0; C `tty_print_glyph` applies `iflags.wc2_petattr` when
  `(special & MG_PET) && hilite_pet`.
- **C locus:** `win/tty/wintty.c` `tty_print_glyph` (MG_PET branch);
  `options.c` `opt_hilite_pet` + `init_options` `wc2_petattr=ATR_INVERSE`;
  `flag.h` `hilite_pet` ≡ `wc_hilite_pet`.
- **Change:** `display.js` `mon_map_attr` + pass into `newsym` mon paths;
  `options.js` enable `hilite_pet` sets `wc2_petattr` when unset.
- **Verification:** seed0006 Scr **89→95**/123 first miss **@71→@77**;
  RNG full; green+strict; pet cohort seed0002/0004/0009/0012/1500/1800
  PASS; #515 suite **27/44** Scr **4986**/11405.
- **Named omissions:** accessibility `SYM_PET_OVERRIDE`; remembered
  MG_PET when pet left the square; full `petattr` string handler.
- **Next:** seed0006 @77 JS `I` vs C `#`, or seed0007.

## D-0477 — Rule #2: pager dat texts must not use filesystem

- **Status:** fixed
- **Symptom:** Contest Rule #2 requires plain ESM runnable in Node *and*
  Chrome with no filesystem. `js/pager.js` imported Node `fs`/`path`/`url`
  and `readFileSync`'d `nethack-c/upstream/dat/*` for `display_file` /
  `checkfile`. Hub Session Viewer re-runs `/play/<fork>/js/` in-browser
  and cannot use those APIs (shim throws or paths miss).
- **Cause:** Help/encyclopedia texts were loaded from disk at runtime
  instead of living in-process like other generated tables.
- **C locus:** `pager.c` `display_file` / `checkfile`; contest README
  Rule #2; frozen storage VFS is the only allowed persistence channel.
- **Change:** `scripts/extract-dat-text.py` → `js/generated/dat_text.js`
  (`DAT_TEXT` map: data.base as `data`, keyhelp, help, hh, …);
  `pager.js` `readDat` reads the map only — no Node builtins.
- **Verification:** green+strict PASS; seed0030 **1953/1953** PASS;
  seed0002/seed0012 PASS (`?`/`/` help paths); `js/` has zero
  `fs`/`path`/`url` imports.
- **Named omissions:** other future dat file readers must embed the same
  way; full dlb/`OPTIONS_USED` parse still deferred.
- **Next:** resume seed0006 @71 hilite_pet (or seed0007).

## D-0476 — seed0006 filter menu tty page packing (screen@22)


- **Status:** fixed
- **Symptom:** seed0006 first cell-miss @22 — C filter `~` menu
  morestr `(1 of 2)` on row 23; JS blank row 23 / morestr off-screen
  (cursor `[9,25]`); RNG full; Scr **80**/123 (post D-0475).
- **Cause:** `reset_role_filtering` paged body lines only and
  re-prepended title+blank every page. C `tty_end_menu` counts
  prompt+blank in `nitems` with `lmax=rows-1`, so page 1 ends at
  `O - orc` with `(1 of 2)` on the morestr row.
- **C locus:** `wintty.c` `tty_end_menu` / `process_menu_window`;
  `role.c` `reset_role_filtering`.
- **Change:** `js/player_selection.js` — build full entry list
  (title+blank+items) then slice pages at `lmax` like
  `select_menu_pick_none` / C `tty_end_menu`.
- **Verification:** @22–@30 match; Scr **80→89**/123; first miss
  **@22→@71** (pet `f` ATR_INVERSE / `hilite_pet`); RNG full;
  green+strict; cohort **25/25**.
- **Deferred:** `hilite_pet` / `wc2_petattr` map attr; SELECTSAVED;
  `plnamesuffix` rename facet parse.
- **Next:** seed0006 screen@71 pet inverse attr.

## D-0475 — seed0006 rename askname BASE cury (screen@13)

- **Status:** fixed
- **Symptom:** seed0006 first cell-miss @13 — C `Who are you?` on
  row 10 (cursor `[13,10]`) vs JS row 12 (`[13,12]`) after confirm
  `'a'` rename; RNG full; Scr **72**/123 (post D-0474).
- **Cause:** JS `clearScreen` + hardcoded `PROMPT_ROW=12` on rename.
  C `destroy_nhwindow` corner confirm → `docorner(offx, maxrow+1)`
  leaves `wins[BASE]->cury = maxrow` (= morestr row + 1); `tty_askname`
  blank `putstr` then `Who are you?` at cury+1 → row 10. No
  `term_clear_screen` on corner dismiss during role selection.
- **C locus:** `wintty.c` `erase_menu_or_text` / `docorner` /
  `tty_askname`; `role.c` `genl_player_setup` case 3 rename.
- **Change:** `invent.js` `dismiss_chargen_nhw_menu` docorner sets
  `_base_cury`; `askname.js` splash cury=11 + askname blank/who from
  `_base_cury`; `player_selection.js` rename uses dismiss not clear.
- **Verification:** @13–@19 match; first miss **@13→@22** (`(1 of 2)`
  filter page); Scr **72→80**/123; RNG full; green+strict; cohort
  **25/25**.
- **Deferred:** filter tty `(N of M)` page packing (D-0471 omit).
- **Next:** seed0006 screen@22 filter multipage morestr.

## D-0474 — seed0006 mon_arrive M2_STALK follow
- **Status:** fixed
- **Symptom:** seed0006 rng-diff first mismatch @6685 —
  C `rn2(2)=1 @ mon_arrive(dog.c:475)` vs JS `rn2(5)=0` @
  `distfleeck` (not mon_arrive). RNG **6686**/6736; Scr **68**/123.
- **Cause:** `levl_follower` omitted `M2_STALK`, so water demon
  (`M2_STALK|M2_HOSTILE`) never entered `mydogs`; C `mon_arrive`
  With_you hostile `rn2(2)` never ran; JS continued into movemon
  `distfleeck` `rn2(5)`. Notes' "peaceful rn2(5)" theory was wrong —
  JS never called `mon_arrive_with_you`.
- **C locus:** `mondata.c` `levl_follower`; `dog.c` `keepdogs`/
  `relmon`/`mon_arrive`; `monflag.h` `M2_STALK`.
- **Change:** `monsters.js` export `M2_STALK`; `dog.js`
  `levl_follower` stalk/flee/amulet arm; `keepdogs` wiz+amulet chase;
  `mydogs.unshift` to match C `relmon` prepend.
- **Verification:** seed0006 RNG **6686→6736**/6736 (full); Scr
  **68→72**/123; green+strict; cohort **25/25**.
- **Deferred:** `mon_has_amulet` iswiz short-circuit; `is_fshk`;
  keepdogs `mintrap`/leash/`migrate_to_level` stay_behind polish.
- **Next:** seed0006 screen peel (RNG full) or seed0007 snake swamp.

## D-0473 — seed0006 summonmu (demon help) late RNG

- **Status:** fixed
- **Symptom:** seed0006 rng-diff first mismatch @6660 —
  C `rn2(16)=3 @ summonmu(mhitu.c:968)` vs JS `rnd(21)=10 @ mattacku`.
  RNG **6667**/6736; Scr **68**/123 (post D-0472).
- **Cause:** `mattacku` omitted `summonmu` before `find_offensive` —
  water demon never burned `rn2(Inhell?10:16)` before melee `rnd(21)`.
- **C locus:** `mhitu.c` `summonmu` / `mattacku`; `minion.c` `msummon`
  / `ndemon` / `dlord` / `dprince`; `mondata.h` `is_ndemon`/`is_were`.
- **Change:** `mhitu.js` — `summonmu` after AC, before `find_offensive`
  (demon arm → `msummon`); `minion.js` — `msummon` + helpers;
  `makemon.js` `MM_EMIN`/`newemin`; `monsters.js` `is_ndemon`/`is_were`
  / `is_dlord`/`is_dprince`.
- **Verification:** rng-diff prefix **6660→6685**; seed0006 RNG
  **6667→6686**/6736 Scr **68**/123; green+strict; cohort **25/25**.
- **Deferred:** were `new_were`/`were_summon`; `msummon` `is_lminion`/
  `PM_ANGEL` + transient light.
- **Next:** D-0474 @6685 `mon_arrive`.

## D-0472 — seed0006 dowaterdemon + S_DEMON weapon fallthrough

- **Status:** fixed
- **Symptom:** seed0006 rng-diff first mismatch @6574 —
  C `rn2(8)=7 @ collect_coords(teleport.c:700)` vs JS `rn2(3)=1`.
  RNG **6578**/6736; Scr **68**/123 (post D-0471).
- **Cause:** `drinkfountain` case 23 deferred → `dryup` `rn2(3)` ran
  where C calls `dowaterdemon`→`makemon`→`enexto`→`collect_coords`.
  After spawn, JS `m_initweap` `S_DEMON` broke without C's
  `is_demon` FALLTHROUGH to default `rnd(14-2*bias)` (=`rnd(12)`).
- **C locus:** `fountain.c` `dowaterdemon`; `makemon.c` `m_initweap`
  `S_DEMON` + default; `mondata.h` `is_demon`.
- **Change:** `fountain.js` `dowaterdemon` + case 23; `mongrantswish`
  subset; `makemon.js` named-demon specials + `is_demon`→default;
  `monsters.js` `M2_DEMON`/`is_demon`.
- **Verification:** rng-diff prefix **6574→6660**; seed0006 RNG
  **6578→6667**/6736 Scr **68**/123; green+strict; cohort **25/25**;
  full suite **27/44**.
- **Deferred:** `mongrantswish` `tmp_at` glyph hide; `dowatersnakes`/
  nymph; angel/kop/lizard/troll `m_initweap` specials.
- **Next:** D-0473 @6660 `summonmu`.

## D-0471 — seed0006 chargen rename + role filter (early RNG)

- **Status:** fixed
- **Symptom:** seed0006 RNG broke at index 1 — C two `rn2(1)`
  `@ pick_align` then gem colors; JS one `rn2(1)` then gem colors.
  Runner RNG **2276**/6736; Scr **13**/123.
- **Cause:** JS stubbed confirm `'a'` rename (re-confirm) so Enter
  after ignored name keys started game as orc Wizard; skipped
  second chargen (filter + gnome) and its `plsel_startmenu` →
  `rigid_role_checks` → `pick_align(PICK_RIGID)` `rn2(1)`.
  Filter `~` also omitted (no `reset_role_filtering`).
- **C locus:** `role.c` `genl_player_setup` case 3 rename /
  `plnamesuffix`→`askname`; `reset_role_filtering` /
  `setrolefilter` / `clearrolefilter`; `plsel_startmenu`
  `rigid_role_checks` → `pick_align`.
- **Change:** `player_selection.js` — rename clears `plname` +
  `tty_askname` + restore facets; `reset_role_filtering` PICK_ANY
  menu; wire `~` in role/race/gend/align menus; filter label
  Set/Reset via `gotrolefilter`.
- **Verification:** rng-diff prefix **1→6574**; seed0006 RNG
  **2276→6578**/6736 Scr **13→68**/123; green+strict; cohort
  **25/25**.
- **Deferred:** filter tty page packing vs C `(N of M)` layout;
  `plnamesuffix` name-suffix facet parse on rename; SELECTSAVED.
- **Next:** seed0006 @6574 `collect_coords` (teleport.c:700).

## D-0470 — seed0002 screen@590 ^X deaf + encumbrance

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @587 — C discoveries
  Weapons `throwing spear` then Armor… with `{buy N}` shop tags;
  JS missing spear / missing `{buy}`; RNG full; Scr 593/595
  (post D-0468). Also failed @590.
- **Cause:** (1) pet pick/drop used bare `doname` without C
  `distant_name` near-path observe → javelin never in `disco`;
  (2) `record_price_quote`/`append_price_quote` omitted; objects
  lacked buy/sell min/maxseen init.
- **C locus:** `objnam.c` `distant_name` / `xname_flags` observe;
  `dogmove.c`/`steal.c` pet pick/drop; `shk.c` record/append_price_quote;
  `o_init.c` `disco_append_typename`; `objects.h` OBJECT quote init.
- **Change:** `distant_name` + doname/xname observe when
  `!Blind && !distantname`; dogmove wires `distant_name`;
  price-quote fields + record/append; discoveries append quotes.
- **Verification:** @587 matches; first miss **@587→@590**; Scr
  **593→594**; RNG full; green+strict; cohort **24/24**.
- **Deferred:** monmove distant_name; sell quotes; VENOM_CLASS
  inv_order append; BUFSZ truncate; pricequotes on plain doname.
- **Next:** ^X attributes deaf + encumbrance @590 (D-0470).

## D-0468 — seed0002 screen@538 sleep-ray bounce map glyph

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @538 — C map DEC `q` (─)
  vs JS `@` at (33,8) while topline `The sleep ray bounces!  The
  sleep ray hits you!--More--` matches; RNG full; Scr 568/595.
- **Cause:** JS `dobuzz` deferred `tmp_at` beam trail; C paints
  `DISP_BEAM` over hero/wall before bounce/hit `--More--`.
- **C locus:** `zap.c` `dobuzz` `tmp_at(DISP_BEAM)` /
  `zapdir_to_glyph` / `DISP_CHANGE` / `DISP_END`; `display.c`
  `tmp_at` / `zapdir_to_glyph`.
- **Change:** `display.js` `zapdir_to_glyph` (DEC h/vbeam +
  zapcolors); `zap.js` `dobuzz` wires BEAM paint before hit,
  CHANGE after bounce, END in finally.
- **Verification:** @538 matches; first miss **@538→@587**; Scr
  **568→593**; RNG full; green+strict; cohort **24/24**.
- **Deferred:** Hallucination `hdmgtype` rn2; map_invisible/unmap
  during buzz; fireball/gas; mon_reflects; TETHER BACKTRACK.
- **Next:** discoveries menu (D-0469).

## D-0467 — seed0002 screen@530 invent `i` itemactions menu

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @530 — C fullscreen
  `Do what with the spellbook of stone to flesh?` (Name/Drop/
  Adjust/Study…) vs JS still on invent `Coins` listing; RNG full;
  Scr 566/595 (post D-0466).
- **Cause:** JS `ddoinv` only `display_inventory` dismiss;
  C `dispinv_with_action` → `itemactions` (`iactions.c`) on letter.
  Also: itemed corner menu needs blank WIN_STATUS until bot()
  after close (`clear_committed_status` in `itemactions` only — not
  all `display_pickinv_reply` picks; that blanked seed0004 botl).
- **C locus:** `invent.c` `ddoinv`/`dispinv_with_action`;
  `iactions.c` `itemactions`.
- **Change:** `js/iactions.js` `itemactions` + `dispinv_with_action`;
  `ddoinv` → PICK_ONE invent then `itemactions`; `pager.js`
  `ia_checkfile`; status suppress scoped to itemed.
- **Verification:** @530–@531 match; first miss **@530→@538**;
  Scr **566→568**; RNG full; green+strict; cohort **26/26**
  (seed0004 held after scoping status suppress).
- **Deferred:** `itemactions_pushkeys` / cmdq action dispatch; full
  apply-otyp catalogue; eat `is_edible`; altar/shop pay polish.
- **Next:** sleep-ray bounce map (D-0468).

## D-0466 — seed0002 screen@525 apply getobj compactify

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @525 — C
  `What do you want to use or apply? [ch-kop or ?*]` vs JS
  `[chijkop or ?*]`; RNG full; Scr 563/595 (post D-0465).
- **Cause:** `getobj_apply` used raw SUGGEST lets in the prompt
  without C `if (suggested > 5) compactify(bp)`.
- **C locus:** `invent.c` `getobj` / `compactify`; `apply.c` `doapply`.
- **Change:** `js/apply.js` — prompt via `compactify_invlets` when
  `lets.length > 5`; `?`/`*` pickinv keeps raw lets (D-0455 pattern).
- **Verification:** @525 matches; first miss **@525→@530**; Scr
  **563→566**; RNG full; green+strict; cohort **26/26**.
- **Deferred:** other getobj callers still omitting prompt compactify;
  invent `i` → `itemed` (D-0467).
- **Next:** invent itemed menu (D-0467).

## D-0465 — seed0002 screen@502 #terrain known-map trap glyphs

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @502 — `#terrain` "Showing
  known terrain only..." map: C floor/`·` cells vs JS trap `^`;
  RNG full; Scr 561/595.
- **Cause:** JS `reveal_terrain_getglyph` never set `kind === 'trap'`,
  so `!(which_subset & TER_TRP)` strip never ran; remembered `^`
  stayed on the TER_MAP rewrite.
- **C locus:** `detect.c` `reveal_terrain_getglyph` (`glyph_is_trap`
  + trap strip / keep_traps restore); `cmd.c` `doterrain` → `TER_MAP`.
- **Change:** `js/display.js` — classify tseen trap layer (map_location
  order); `glyph_is_trap_at` after mon→levl_glyph; keep_traps
  `trap_to_glyph` when stripping objs/invisible; existing terrain
  strip path then fires for TER_MAP.
- **Verification:** @502 matches; first miss **@502→@525**; Scr
  **561→563**; RNG full; green+strict; cohort **26/26**.
- **Deferred:** region/gascloud; M_AP_FURNITURE; warning glyphs;
  arboreal default.
- **Next:** apply getobj compactify (D-0466).

## D-0464 — seed0002 screen@454 locked chest look_here/doname

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @454 — C
  `You see here a locked chest.` vs JS `You see here a chest.`;
  RNG full; Scr 560/595 (post D-0463).
- **Cause:** JS `doname` omitted C `doname_base` box prefixes
  (`trapped`/`locked`/`unlocked`/`broken` when `tknown`/`lknown`).
  Floor chest already had `lknown`+`olocked` from prior loot/`#force`.
- **C locus:** `objnam.c` `doname_base` (~1356–1368); `obj.h` `Is_box`.
- **Change:** `js/objnam.js` `doname` — trap/lock prefixes after BUC;
  `js/const.js` export `Is_box`. Deferred: `greased` prefix.
- **Verification:** @454 matches; first miss **@454→@502**; Scr
  **560→561**; RNG full; green+strict; cohort **26/26**.
- **Next:** #terrain known-map trap glyphs (D-0465).

## D-0463 — seed0002 screen@363 wear pline appearance vs type

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @363 — C
  `You are now wearing a polished silver shield.` vs JS
  `You are now wearing a shield of reflection.`; botl `$:`
  matches. RNG full; Scr 559/595.
- **Cause:** JS `on_msg` used `objectNameStrs[otyp]` (true type
  name) instead of C `xname`→`an`/`the` (appearance when
  `!oc_name_known`).
- **C locus:** `do_wear.c` `on_msg`; `objnam.c` `xname` /
  `obj_is_pname`.
- **Change:** `js/do_wear.js` `on_msg` — `xname(otmp)` then
  `obj_is_pname ? the : an`; towel `around your head` stub.
  Deferred: full `not_fully_identified` / `body_part(HEAD)` poly.
- **Verification:** seed0002 @363 matches; first miss
  **@363→@454**; Scr **559→560**; RNG full; green+strict; cohort
  **26/26**.
- **Next:** locked chest doname (D-0464).

## D-0462 — seed0002 screen@359 botl `$:` after shop pay

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @359 — C botl
  `Dlvl:2 $:1175 HP:14(14) …` vs JS `$:1225` (Δ=+50);
  buy topline `You bought a polished silver shield for 50 gold
  pieces.` matches. RNG full; Scr 363/595.
- **Cause:** `money2mon` removed invent gold (split/splice) but left
  `game._goldCount` unchanged; JS botl `$:` reads that cache while C
  `botl.c` uses live `money_cnt(gi.invent)`.
- **C locus:** `shk.c` `money2mon` → `freeinv`/`freeinv_core`;
  `botl.c` `money_cnt`.
- **Change:** `js/shk.js` `money2mon` — decrement `_goldCount` by
  `amount` after transfer (same cache contract as drop/`freeinv_drop`).
  Deferred: botl live `money_cnt` instead of cache; `money2u`.
- **Verification:** seed0002 botl `$:1175` @359; first miss
  **@359→@363**; Scr **363→559**; RNG full; green+strict; cohort
  **26/26**. Full suite #500: Scr **4868**/11405; **26/44** PASS.
- **Next:** wear appearance vs type (D-0463).

## D-0461 — seed0002 screen@345 doname unpaid_cost on prinv

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @345 — C
  `You have a little trouble lifting y - a polished silver shield
  (unpaid, 50 zorkmids).--More--` vs JS bare
  `… y - a polished silver shield.`; botl matches. RNG full;
  Scr 361/595.
- **Cause:** C `doname_base` `is_unpaid` → `unpaid_cost` suffix;
  JS `doname` omitted unpaid. Pay menu/`dopayobj` used bare
  `doname` instead of `paydoname` (`suppress_price`).
- **C locus:** `objnam.c` `doname_base` unpaid arm / `paydoname`;
  `shk.c` `is_unpaid` / `unpaid_cost` / `count_unpaid`.
- **Change:** `js/shk.js` — `is_unpaid`, `unpaid_cost`,
  `count_unpaid`, unpaid hook into `doname`; `paydoname` path in
  `menu_pick_pay_items` / `dopayobj`. `js/objnam.js` —
  `set_doname_shop_suffix` + `paydoname`. Deferred:
  `contained_cost`; container paydoname rewrite; `record_price_quote`.
- **Verification:** seed0002 @345 matches; first miss **@345→@359**;
  Scr **361→363**; RNG full; green+strict; cohort **24/24**.
- **Next:** botl `$` after pay (D-0462).

## D-0460 — seed0002 screen@342 look_here doname_with_price

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @342 — C topline
  `You see here a banded mail (for sale, 68 zorkmids).` vs JS
  `You see here a banded mail.`; botl matches. RNG full; Scr 354/595.
- **Cause:** `look_here` used plain `doname`; C
  `doname_with_price` → `get_cost_of_shop_item` appends for-sale.
- **C locus:** `invent.c` `look_here`; `objnam.c` `doname_with_price` /
  `doname_base(DONAME_WITH_PRICE)`; `shk.c` `get_cost_of_shop_item`.
- **Change:** `js/shk.js` — C-shaped `inside_shop` roomno;
  `get_obj_location` subset; `get_cost_of_shop_item`;
  `doname_with_price`. `js/invent.js` `look_here` single+pile use
  `doname_with_price`. Deferred: unpaid_cost / pricequotes /
  contained_cost; buried/minvent location.
- **Verification:** seed0002 @342 matches; first miss **@342→@345**;
  Scr **354→361**; RNG full; green+strict; cohort **24/24**.
- **Next:** doname unpaid suffix (D-0461).

## D-0459 — seed0002 screen@272 safemon “in the way” pline

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @272 — C topline
  `You stop.  Your little dog is in the way!` vs JS blank;
  botl matches. RNG full; Scr 353/595.
- **Cause:** `do_attack` safemon `foo` arm fled/returned true but
  omitted C `You("stop.  %s is in the way!", y_monnam)` +
  `end_running(TRUE)` (D-0442 deferred fleemsg).
- **C locus:** `uhitm.c` `do_attack` safemon stop path.
- **Change:** `js/uhitm.js` — `x_monnam_tame`+highc stop pline;
  clear run/travel/mv/multi after monflee.
- **Deferred:** inshop when !foo; isshk dopay; frozen/helpless/
  mmove==0 pline; longworm + `passes_walls` in foo; mon_track_clear/
  Vrock.
- **Verification:** seed0002 @272 matches; first miss **@272→@342**;
  Scr **353→354**; RNG full; green+strict; cohort **24/24**.
- **Next:** look_here `doname_with_price` (D-0460).

## D-0458 — seed0002 screen@237 botl Conf condition

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @237 — topline
  `Huh, What?  Where am I?` matches; C botl ends `Burdened Conf`
  vs JS `Burdened`. RNG full; Scr 327/595.
- **Cause:** `_statusLine2` emitted enc_stat + Ride only; C
  `do_statusline2` appends Blind…Conf…Hallu…Lev/Fly after
  enc_stat (D-0401 deferred list).
- **C locus:** `botl.c` `do_statusline2`; Confusion ≡ `HConfusion`
  via `make_confused` / `nh_timeout`.
- **Change:** `js/display.js` `_statusLine2` — Blind/Deaf/Stun/
  Conf/Hallu/Lev/Fly before Ride (youprop-shaped gates).
- **Deferred:** Stone/Slime/Strngl/Sick/hunger (before enc_stat);
  Halluc_resistance; steed `is_flyer` in Flying macro.
- **Verification:** seed0002 @237 matches `Burdened Conf`; first
  miss **@237→@272**; Scr **327→353**; RNG full; green+strict;
  cohort **24/24** (+ green 2 = prior PASS set).
- **Next:** screen@272 safemon in-the-way pline (D-0459).

## D-0457 — seed0002 screen@229 wield getobj SUGGEST/`- ` prompt

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @229 — C
  `What do you want to wield? [- ar or ?*]` vs JS
  `[-abcdefghijkloprsuwx or ?*]`. RNG full; Scr 326/595.
- **Cause:** `getobj_wield` listed all invent (DOWNPLAY+SUGGEST) with
  no space after `-`; C `wield_ok` SUGGEST only weapons/weptools,
  hands prefix `"- "`, then `if (suggested > 5) compactify(bp)`.
- **C locus:** `invent.c` `getobj` / `compactify`; `wield.c`
  `wield_ok` / `dowield`.
- **Change:** `js/wield.js` — `wield_ok` returns SUGGEST/DOWNPLAY/
  EXCLUDE; prompt `- ` + SUGGEST lets + compactify when >5;
  DOWNPLAY still selectable.
- **Deferred:** `?`/`*` `display_pickinv`; count-split.
- **Verification:** seed0002 first miss **@229→@237**; Scr **326→327**;
  RNG still full 27158; green+strict; cohort **26/26**; full suite
  Scr **4636**/11405.
- **Next:** screen@237 botl Conf (D-0458).

## D-0456 — seed0002 screen@221 pickup_prinv slightload lifting

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @221 — C
  `You have a little trouble lifting x - a chain mail.--More--`
  vs JS bare `x - a chain mail.--More--`. RNG full; Scr 325/595.
- **Cause:** JS `pickup_prinv` always `prinv(null,…)`; C
  `pickup_prinv` prefixes `slightloadpfx`+`lifting` when
  `near_capacity()` differs from `gp.pickup_encumbrance`.
- **C locus:** `pickup.c` `pickup_prinv` / `slightloadpfx` (+
  `pickup()` / `menu_loot` reset of `pickup_encumbrance`).
- **Change:** `js/pickup.js` — load-prefix strings +
  `game.pickup_encumbrance` gate; verbs `lifting`/`removing`; reset
  at `pickup` / `menu_loot_*` entry+exit.
- **Deferred:** `lift_object` yn Continue? arms that reuse the same
  pfx strings.
- **Verification:** seed0002 first miss **@221→@229**; Scr **325→326**;
  RNG still full 27158; green+strict; cohort **24/24** (+green = 26).
- **Next:** screen@229 wield getobj compactify (D-0457).

## D-0455 — seed0002 screen@54 drink getobj compactify

- **Status:** fixed
- **Symptom:** seed0002 first cell-miss @ screen 54 — C
  `What do you want to drink? [d-gnq or ?*]` vs JS `[defgnq or ?*]`.
  RNG full 27158/27158 after D-0454; Scr 323/595 (non-prefix count).
- **Cause:** `getobj_drink`/`drinkable_lets` joined potion invlets
  without C `getobj` `if (suggested > 5) compactify(bp)` (drop path
  already had it via D-0332).
- **C locus:** `invent.c` `compactify` / `getobj`; drink via
  `potion.c` `dodrink` → `getobj("drink",…)`.
- **Change:** `js/potion.js` — prompt uses `compactify_invlets` when
  raw length > 5; `?` menu still gets non-compacted `lets[]` (C).
- **Deferred:** other getobj callers still omitting prompt compactify
  (eat/dip local compact_lets; throw/zap/read/wear/…); shared getobj.
- **Verification:** seed0002 first miss **@54→@221**; Scr **323→325**;
  RNG still full 27158; green+strict; cohort **24/24** (+green = 26).
- **Next:** screen@221 `pickup_prinv` slightload lifting (D-0456).

## D-0454 — seed0002 @27050 do_improvisation vs JS rn2(19)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @27050 — C `rn2(2)=0` @
  `do_improvisation(music.c:535)` vs JS `rn2(19)` (exercise). Prefix
  27050; Scr 323/595.
- **Cause:** instruments fell through `doapply` "don't know how"; no
  `music.c` port. After wiring LEATHER_DRUM improvisation, follow-ons:
  TOOL_CLASS `resist` used `ulevel` instead of C `alev=10`; auditory
  `onscary(0,0)` stubbed false so no `monflee`; `dosounds` checked only
  `u.Deaf` not `HDeaf` after drum `incr_itimeout`.
- **C locus:** `music.c` `do_play_instrument`/`do_improvisation`/
  `awaken_monsters`; `zap.c` `resist` TOOL alev=10; `monmove.c`
  `onscary`/`monflee`; `sounds.c` `dosounds` Deaf gate.
- **Change:** `js/music.js` + apply instrument dispatch; TOOL resist
  alev=10; auditory onscary→monflee; dosounds Deaf≡HDeaf|EDeaf|…
- **Deferred:** passtune/getlin/drawbridge; flute/harp/horn effects;
  `Hero_playnotes`; `awaken_soldiers`; flees_light/`mon_track_clear`.
- **Verification:** seed0002 RNG **27050→27158** (full); Scr still
  **323**/595 (first cell miss @54 drink getobj `d-gnq` vs `defgnq`);
  green+strict; cohort **24/24** (+green = 26 PASS held).
- **Next:** seed0002 screen@54 drink getobj `compactify` (D-0455).

## D-0453 — seed0002 @26987 dog_goal udist gate vs invent obj_resists

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @26987 — C `rn2(4)=3` @
  `dog_goal(dogmove.c:575)` vs JS `rn2(100)` (`obj_resists`). Prefix
  26987; Scr 323/595.
- **Cause:** stale `iflags.travelcc` after a prior `_` travel. JS
  `findtravelpath_bfs` never cleared `travelcc` when the next step cell
  was the destination (C `hack.c` ~1413); also `goto_level` omitted C’s
  `travelcc=0` (`do.c` ~1607). Next `_`+`.` restarted getpos on the old
  dest, so JS walked hero to (34,8) while C stayed at (34,7). Same pet
  place then gave JS `udist=1` (skip `rn2(4)`) vs C `udist=2`.
- **Rejected:** broken `dog_goal` `rn2(4)` / invent order; `m_in_out_region`
  skip-place (falsified — staying at (32,7) drops to 1 fobj vs C’s 2).
- **C locus:** `hack.c` `findtravelpath` destination clear; `do.c`
  `goto_level` travelcc discard.
- **Change:** clear `travelcc` + `nomul(0)` when BFS step cell is dest;
  clear `travelcc` in `goto_level`. Deferred: travelmap visited “unsure”
  arm; `m_in_out_region`/`m_digweapon_check` in `dog_move`.
- **Verification:** seed0002 prefix **26987→27050**; RNG matched
  **27042→27061**; Scr still **323**/595 (next miss music); green+strict;
  cohort **26/26**.
- **Next:** seed0002 @27050 C `do_improvisation` vs JS `rn2(19)`.

## D-0452 — seed0002 @26883 ureflects makeknown exercise vs JS zap_hit

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @26883 — C `rn2(19)=9` @
  `exercise(attrib.c:509)` then `zap_hit` vs JS `rn2(20)=17`. Prefix
  26883; Scr 322/595. Screen: `But it reflects from your shield!`.
- **Cause:** sleep ray bounced onto hero; C `ureflects` pline then
  `makeknown(SHIELD_OF_REFLECTION)` → `discover_object` credit_hero
  `exercise(A_WIS)`; JS `ureflects` printed the shield line but omitted
  `makeknown`, so the next call was another `zap_hit`.
- **C locus:** `muse.c` `ureflects`; `o_init.c` `discover_object`/
  `makeknown`; `zap.c` `dobuzz` hero Reflecting arm.
- **Change:** `ureflects` calls `makeknown(SHIELD_OF_REFLECTION)` when
  fmt+str given (shield path). Deferred: W_WEP/W_AMUL/W_ARM/dragon
  `ureflects`; `mon_reflects`; setworn `EReflecting` bits.
- **Verification:** seed0002 prefix **26883→26987**; Scr **322→323**/595;
  RNG matched **26954→27042**; green+strict; cohort **24/24** (+green
  26/26).
- **Next:** seed0002 @26987 C `dog_goal` vs JS `obj_resists` (D-0453).

## D-0451 — seed0002 @26692 dog_goal fobj dogfood vs JS !rn2(4)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @26692 — C `rn2(100)` @
  `obj_resists` vs JS `rn2(4)`. Prefix 26692; Scr 320/595. JS pet
  walked to DOOR(35,5) (`udist=5`) while C kept `udist≤1` invent path.
- **Cause:** `#loot` with pet beside skipped directional `getdir`; keys
  `#f\r` became unknown `#force` (ECMD_OK) while C used loot getdir +
  cmdassist help. Shipping bare `doforce` ECMD_TIME alone regressed
  @26426 because the first `#f\r` was loot-cancel in C, not force.
  Also `help_dir` More accepted any key (`f` dismissed early) so
  leftover `\r`→LF rushed south; C `xwaitforspace(quitchars)` bells on
  `f` and waits for `\r`.
- **C locus:** `pickup.c` `doloot_core` lootmon/`get_adjacent_loc`;
  `cmd.c` `help_dir`/`xwaitforspace`; `lock.c` `doforce` (no box →
  ECMD_TIME).
- **Change:** `doloot` mon_beside → `getdir_cmdassist`; `help_dir` More
  quitchars only; `doforce` registered (no-box pline + ECMD_TIME).
  Deferred: forcelock occupation; loot_mon/saddle; full getobj fire.
- **Verification:** seed0002 prefix **26692→26883**; Scr **320→322**/595;
  RNG matched **26771→26954**; green+strict; cohort **26/26** PASS.
- **Next:** seed0002 @26883 C `exercise`/`zap_hit` vs JS `rn2(20)`
  (D-0452).

## D-0450 — seed0002 @25767 exercise then dobuzz vs JS rn2(5)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @25767 — C `rn2(19)=3` @
  `exercise(attrib.c:509)` then `dobuzz` `rn2(7)` vs JS `rn2(5)=4`.
  Prefix 25767; Scr 320/595. Matched through `exerchk` + wipe_engr
  (D-0449). Session: `z` `?` `p` `l` — zap wand of sleep east.
- **Cause:** `getobj_zap` treated `?` as cancel (`Never mind`), so the
  wand was never selected and RAY `weffects`/`ubuzz`/`dobuzz` never ran
  (JS fell into monmove `rn2(5)`). RAY path was also deferred after
  exercise.
- **C locus:** `invent.c` `getobj` `?`/`*`; `zap.c` `weffects`/`ubuzz`/
  `dobuzz`/`zap_hit`; `muse.c` `ureflects`.
- **Change:** zap getobj `?`/`*` → `display_pickinv_reply`; port RAY
  `ubuzz`/`dobuzz` for `WAN_MAGIC_MISSILE`..`WAN_LIGHTNING` (range,
  bounce, sleep `zhitm`/`zhitu`, shield `Reflecting`/`ureflects`).
  Deferred: IMMEDIATE/`bhit`/`zap_dig`; spell ubuzz; `mon_reflects`;
  fireball/gas/Hallucination; full `zap_over_floor`; setworn
  `EReflecting` bits.
- **Verification:** seed0002 prefix **25767→26692**; RNG matched
  **25921→26771**; Scr 320; green+strict; cohort **24/24** PASS.
- **Next:** seed0002 @26692 C `obj_resists` vs JS `rn2(4)` (D-0451).

## D-0449 — seed0002 @25615 `exerchk` rn2(50) vs JS wipe_engr rn2(61)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @25615 — C `rn2(50)=14` @
  `exerchk(attrib.c:655)` vs JS `rn2(61)=52` (wipe_engr DEX check).
  Prefix 25615; Scr 320/595. Matched through shop `dopay`/`next_ident`
  (D-0448).
- **Cause:** JS `exerchk` only called `exerper()` and omitted the
  `moves >= next_attrib_check && !multi` attribute-test loop
  (`rn2(AVAL)` / halve AEXE / `rn1(200,800)` reschedule). Also
  `next_attrib_check` was never initialized to 600 at newgame.
- **C locus:** `attrib.c` `exerchk`/`exercise`; `allmain.c` newgame
  `next_attrib_check = 600`.
- **Change:** ported `exerchk` resolve loop + `You must have been…`
  text; init `next_attrib_check=600`; `exercise` Upolyd gate.
  Deferred: `encumber_msg` after STR/CON exercise; Fixed_abil/Dunce
  via adjattrib; adjattrib in_moveloop encumber.
- **Verification:** seed0002 prefix **25615→25767**; RNG matched
  **25725→25921**; Scr 320; green+strict; cohort **24/24** PASS.
- **Next:** seed0002 @25767 C `exercise`/`dobuzz` vs JS `rn2(5)`
  (D-0450).

## D-0448 — seed0002 @19167 `dopay` → `money2mon`/`next_ident`

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @19167 — C `rnd(2)=1` @
  `next_ident(mkobj.c:521)` vs JS `rn2(7)=6` @ `do_attack`. Prefix
  19167; Scr 313/595.
- **Cause:** JS had no `dopay` (`p` unknown); session `y` was NE
  attack (`rn2(7)` in `do_attack`) while C paid the shield via
  `dopay`→`pay`→`money2mon`→`splitobj`→`next_ident`.
- **C locus:** `shk.c` `dopay`/`pay_billed_items`/`menu_pick_pay_items`/
  `dopayobj`/`pay`/`money2mon`; `mkobj.c` `splitobj`/`next_ident`;
  `cmd.c` `p`→`dopay`.
- **Change:** port menu pay subset; wire `cmd.js`/`#pay` to `dopay`.
  Deferred: debit/robbed/angry appease; used-up/container bills;
  traditional itemize; `paydoname`/`makeknown`; multi-shk getpos.
- **Verification:** seed0002 prefix **19167→25615**; Scr **313→320**;
  RNG matched **20315→25725**; green+strict; cohort **24/24** PASS.
- **Next:** seed0002 @25615 C `exerchk` `rn2(50)` vs JS `rn2(61)`
  (D-0449).

## D-0447 — seed0002 @18457 pickup shop `append_honorific`

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @18457 — C `rn2(4)=1` @
  `append_honorific(shk.c:3611)` (`,` pickup bill quote) vs JS
  `rn2(5)` @ `distfleeck`. Prefix 18457; Scr 311/595.
- **Cause:** JS `pick_obj` omitted robshop `addtobill`; objects extract
  lacked `oc_cost` so `getprice`/`get_cost` could not quote.
- **C locus:** `shk.c` `addtobill` → `append_honorific`; `getprice`/
  `get_cost`/`billable`/`add_one_tobill`; `pickup.c` `pick_obj`;
  `costly_spot`.
- **Change:** emit `oc_cost` via `extract-objects.py`; port
  `costly_spot`/`getprice`/`get_cost`/`billable`/`add_one_tobill`/
  `addtobill`/`append_honorific`; wire `pick_obj` robshop ushops dance.
- **Verification:** seed0002 prefix **18457→19167**; Scr **311→313**;
  RNG matched **19428→20315**; green+strict; cohort **26/26** PASS.
- **Omissions named:** container `bill_box_content`/`contained_cost`;
  `remote_burglary`; gem glass pseudo-ID; `arti_cost`; Hallu currency;
  candle `Is_candle` age half-price; `costly_gold`.
- **Next:** seed0002 @19167 C `rnd(2)` @ `next_ident` vs JS `rn2(7)`
  (D-0448).

## D-0446 — seed0002 @18354 seer_turn `rn1(31,15)` in wrong phase

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @18354 — C `rn2(5)=3` @
  `distfleeck(monmove.c:538)` vs JS `rn2(31)=30`. Prefix 18354;
  Scr 311/595. Matched through `moveloop_core` `rn2(61)`.
- **Cause:** JS ran clairvoyance `seer_turn = moves + rn1(31,15)`
  inside once-per-turn EOT; C runs it in once-per-hero-took-time
  after the `umovement < NORMAL_SPEED` loop (`allmain.c:409–415`).
  Extra EOT burn when `moves >= seer_turn` before the next monmove.
- **C locus:** `allmain.c` `moveloop_core` seer_turn / `rn1(31,15)`.
- **Change:** move `seer_turn` update out of EOT into post-umovement
  once-per-hero block (`js/allmain.js`).
- **Verification:** seed0002 prefix **18354→18457**; Scr still
  **311**/595; green+strict; cohort **26/26** PASS.
- **Omissions named:** `do_vicinity_map` when amulet/Clairvoyant;
  sink_into_lava / pooleffects / Underwater vision once-per-hero.
- **Next:** seed0002 @18457 C `rn2(4)` @ `append_honorific` vs JS
  `distfleeck` (D-0447).

## D-0445 — seed0002 @16501 goto_level descend fall `rnd(3)`

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @16501 — C `rnd(3)=2` @
  `goto_level(do.c:1792)` (encumber/Punished/Fumbling stair fall
  `losehp`) vs JS `rn2(10)` @ `mon_arrive`. Prefix 16501; Scr 292/595.
- **Cause:** JS `goto_level` descend always printed ordinary
  climb-down and skipped C Flying / `near_capacity()>UNENCUMBERED` /
  Punished / Fumbling fall arm that burns `rnd(3)`.
- **C locus:** `do.c` `goto_level` descend `losehp(Maybe_Half_Phys(rnd(3)))`.
- **Change:** port descend branch — Flying verbose fly-down;
  encumber|Punished|Fumbling → fall pline + `losehp(maybe_half_phys(rnd(3)))`
  (+ steed `dismount_steed(DISMOUNT_FELL)`); else ordinary verbose.
- **Verification:** seed0002 prefix **16501→18354**; Scr **292→311**/595;
  green+strict; cohort **26/26** PASS (24 cohort + green).
- **Omissions named:** Punished `drag_down`/`ballrelease`; full
  `selftouch` petrify; trap-door `do_fall_dmg` / non-stairs falling.
- **Next:** seed0002 @18354 C `rn2(5)` @ `distfleeck` vs JS `rn2(31)`.

## D-0444 — seed0002 @14081 peffect_healing missing `d(4,4)`

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @14081 — C `d(4,4)=8` @
  `peffect_healing(potion.c:1122)` vs JS `rn2(5)` @ `distfleeck`.
  Prefix 14081; Scr 284/595. After D-0443 eat occupation restored.
- **Cause:** JS `peffects` lacked `POT_HEALING` — default stub returned 0
  (no useup, no `d(4+2*bcsign,4)`), so the quaff turn never burned
  healing RNG and monmove/`distfleeck` ran instead.
- **C locus:** `potion.c` `peffect_healing` / `peffects` / `healup`.
- **Change:** port `peffect_healing` (`You_feel` + `healup(8+d(…),…)` +
  `exercise(A_CON)`); wire `POT_HEALING` in `peffects`; `healup` sets
  `flags.botl` like C `disp.botl`.
- **Verification:** seed0002 prefix **14081→16501**; Scr **284→292**/595;
  green+strict; cohort **26/26** PASS (24 cohort + green).
- **Omissions named:** `peffect_extra_healing` / `peffect_full_healing`;
  `make_blinded`/`make_deaf`/`make_sick` bodies inside `healup` when
  cure flags set.
- **Next:** seed0002 @16501 C `rnd(3)` @ `goto_level` descend fall vs
  JS `rn2(10)` `mon_arrive`.

## D-0443 — seed0002 @12530 rottenfood dont_start blocked occupation

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @12530 — C `rn2(100)` @
  `obj_resists` vs JS `rn2(5)` @ `distfleeck`. Prefix 12530; Scr 247/595.
  Looked like zap/`destroy_items` then SLT umovement phase lead.
- **Cause:** JS `eatcorpse` rotten path always set `retcode=1`
  (dont_start) after non-faint `rottenfood`, so `start_eating`/
  `eatfood` occupation never ran. C only dont_starts on faint;
  non-faint quarters `oeaten` (`consume_oeaten(…,2)`) and still eats
  (goblin reqtime→2 → multi-turn occupation, 4 EOTs under SLT).
  JS finished the command without occupation → early `H` west while
  C invent-scanned with hero still @**(41,18)**.
- **#475 falsified:** broken SLT `u_calc_moveamt` leftover math
  (always +9; cycle 9→18→15→12 from Burdened).
- **Rejected:** zap/`destroy_items`/`polyuse`; short `fobj`; invent
  array vs nobj; `dog_goal` APPORT exit; SLT trunc path as root.
- **C locus:** `eat.c` `rottenfood` / `eatcorpse` / `start_eating`.
- **Change:** port `rottenfood` (confuse `d(2,4)`+`make_confused`,
  blind `d(2,10)` burn, faint `nomul`); only faint → dont_start;
  non-faint → `consume_oeaten(2)` and continue to `start_eating`.
- **Verification:** seed0002 prefix **12530→14081**; Scr
  **247→284**/595; green+strict; cohort **26/26** PASS.
- **Omissions named:** `make_blinded` body; `Hear_again` afternmv;
  foodword/body_part poly; full faint “world spins” where-clause.
- **Next:** seed0002 @14081 C `d(4,4)` @ `peffect_healing` vs JS
  `rn2(5)`.

## D-0442 — safemon in-the-way keeps move + dochug flee-teleport (seed0002 @12222)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @12222 — C `rn2(5)` @
  `distfleeck` vs JS `rn2(7)` @ `do_attack`. Prefix 12222;
  Scr 242/595. Matched safemon `rn2(7)`+`rnd(6)` then C monmove,
  JS another `do_attack`.
- **Cause:** (1) JS `do_attack` safemon foo path set `context.move=0`,
  so moveloop skipped `movemon`; C leaves move=1 after “in the way”
  stop. (2) After setting pet `mflee`, JS deferred `dochug` flee
  `rn2(40)` while C always rolls it when `mflee`.
- **C locus:** `uhitm.c` `do_attack` safemon/`monflee`; `monmove.c`
  `dochug` mflee teleport / mconf / mstun / courage.
- **Change:** stop clearing move on safemon stop; set `mflee`/
  `mfleetim` from `monflee(rnd(6),F,F)`; port dochug recover rolls +
  flee-teleport (`can_teleport`/`M1_TPORT` + `rloc`) + courage.
- **Verification:** seed0002 prefix **12222→12530**; Scr
  **242→247**/595; green+strict; cohort **24/24** PASS.
- **Omissions named:** `mon_track_clear`/fleemsg/Vrock; `m_respond`/
  leppie_stash; shared `monflee` export; hell-court noteleport.
- **Next:** seed0002 @12530 C `obj_resists` `rn2(100)` vs JS
  `rn2(5)` @ `distfleeck`.

## D-0441 — nh_timeout CONFUSION expiry (seed0002 @11487)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @11487 — C `rn2(61)` @
  `moveloop_core` wipe_engr gate vs JS `rn2(2)`. Prefix 11487;
  Scr 233/595. Looked like invault/amulet order or skipped wipe_engr.
- **Cause:** D-0436 set `HConfusion` TIMEOUT via `make_confused`, but
  `nh_timeout` only handled WOUNDED_LEGS. Confusion never expired; on
  moves%5 `exerper` kept doing `exercise(A_WIS,FALSE)` → `rn2(2)`
  before wipe_engr. DIAG at move 270: hung=747, conf=true, cap=SLT.
- **C locus:** `timeout.c` `nh_timeout` case CONFUSION;
  `potion.c` `make_confused(0,TRUE)`.
- **Change:** decrement `HConfusion` in `js/timeout.js`; on expiry
  `set_itimeout(1)` + `make_confused(0,true)` + `stop_occupation`;
  export async `make_confused` with talk `You_feel`; `exerper` uses
  `HConfusion`/`HStun` like C (drop invented `u.Stunned` DEX gate).
- **Verification:** seed0002 prefix **11487→12222**; Scr
  **233→242**/595; green+strict; cohort **24/24** PASS.
- **Omissions named:** other `nh_timeout` prop cases (STUNNED/BLIND/
  HALLUC/…); luck baseluck; dialogues; `potionbreathe` confusion stub.
- **Next:** seed0002 @12222 C `rn2(5)` @ `distfleeck` vs JS `rn2(7)`
  @ `do_attack`.

## D-0440 — run-into-visible-hostile stop (seed0002 @11309)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @11309 — C `rn2(5)` @
  `u_maybe_impaired` vs JS `rn2(20)`. Prefix 11309; Scr 233/595.
  Looked like a second confusion gate; prior three calls were end of
  capital-`L` continue_run (`impaired` + 2×`confdir`).
- **Cause:** JS `domove` omitted C’s run-into-visible non-safemon stop.
  After `confdir` redirected into a visible hostile, C `nomul(0)` +
  `move=0` and waited for the next key; JS fell through to `do_attack`
  and burned a hit-roll `rn2(20)`.
- **C locus:** `hack.c` `domove_core` (m_at + `context.run` +
  `mon_visible` / `sensemon` / `M_AP_*` gate before attack).
- **Change:** port that stop in `js/cmd.js` `domove` before `do_attack`
  (`nomul(0)`, `context.move=0`; forcefight excluded).
- **Verification:** seed0002 prefix **11309→11487**; Scr still
  **233**/595; green+strict; cohort **24/24** PASS (incl. seed0004/
  0009/0012/0013/0030/1800).
- **Omissions named:** displacer swap; `domove_bump_mon`; mundetected
  Wait!; full Blind_telepat / Protection_from_shape amulet prop.
- **Next:** seed0002 @11487 — C `rn2(61)` wipe_engr gate @
  `moveloop_core` vs JS `rn2(2)`.

## D-0439 — ohitmon + omon_adj on mon missile hit (seed0002 @11150)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @11150 — C `rnd(20)` @
  `ohitmon(mthrowu.c:350)` vs JS `rn2(5)` (`distfleeck`).
  Prefix 11150; Scr 233/595.
- **Cause:** JS `m_throw` deferred `ohitmon` — on `m_at` hit, stop+drop
  without to-hit `rnd(20)` / `dmgval` / mulch path.
- **C locus:** `mthrowu.c` `ohitmon` / `m_throw`; `dothrow.c` `omon_adj`.
- **Change:** port `omon_adj` + `ohitmon` (hit/miss/`dmgval`/drop;
  miss-with-range continues); wire `m_throw` mon cell to `ohitmon`.
- **Verification:** seed0002 prefix **11150→11309**; Scr still
  **233**/595; green+strict; cohort seed0013/1800/0004/0104 PASS;
  full suite (#470) **26/44**.
- **Omissions named:** shade_miss; distant_name/mshot_xname; spec_abon;
  stone_missile/poison/silver/acid/egg petrify/can_blnd; setmangry;
  corpse_chance on mon-kill; mon_notices unfreeze.
- **Next:** seed0002 @11309 `u_maybe_impaired` `rn2(5)` vs JS `rn2(20)`.

## D-0438 — peffect_booze + newuhs field / uhs init (seed0002 @10634)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @10634 — C `d(3,8)` @
  `peffect_booze(potion.c:779)` vs JS `rn2(5)` (`distfleeck`).
  Prefix 10634; Scr 233/595.
- **Cause:** JS `peffects` deferred `POT_BOOZE` (return 0, no useup /
  no `d(2+uhs,8)`); also `u.uhs` never initialized (`init_uhunger`
  omitted) so even a partial port would roll `d(2,8)` not `d(3,8)`.
- **C locus:** `potion.c` `peffect_booze`; `eat.c` `init_uhunger` /
  `newuhs`; `u_init.c` calls `init_uhunger`.
- **Change:** wire `POT_BOOZE` in `peffects`; port `peffect_booze`
  (taste pline, `make_confused(d(2+uhs,8))`, healup, hunger,
  `exercise(A_WIS)`, cursed `multi=-rnd(15)`); `u_init` sets
  `uhs=NOT_HUNGRY`; field-only `newuhs` from gethungry/lesshungry/
  morehungry/fruit/booze.
- **Verification:** seed0002 prefix **10634→11150**; Scr still
  **233**/595; RNG matched **11598**/27158; green+strict; cohort
  **26/26**.
- **Omissions named:** `newuhs` hunger messages / faint / ATEMP WEAK
  crossover / occupation `force_save_hs`; other `peffect_*`.
- **Next:** seed0002 @11150 `ohitmon` `rnd(20)`.

## D-0437 — u_maybe_impaired / confdir on domove (seed0002 @10550)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @10550 — C `rn2(5)` @
  `distfleeck(monmove.c:538)` vs JS `rn2(12)` @ `m_move` track.
  Prefix 10550; Scr 233/595. Looked like a monmove path split after
  confusion quaff.
- **Cause:** JS `domove` never called `u_maybe_impaired` /
  `impaired_movement`. After D-0436 Confusion, C’s next move rolls
  `Confusion && !rn2(5)` before monmove; JS skipped that call so the
  first hostile `distfleeck` consumed the slot and JS was already in
  `m_move` track `rn2(4*(cnt-j))`.
- **C locus:** `hack.c` `u_maybe_impaired` / `impaired_movement`;
  `cmd.c` `confdir` (`dirs_ord` + NODIAG cardinals).
- **Change:** port `u_maybe_impaired` (Stunned short-circuit;
  Confusion `!rn2(5)`), `confdir(force)`, `impaired_movement` loop;
  call from `domove` after setting `u.dx/u.dy`, before `m_at`.
- **Verification:** seed0002 prefix **10550→10634**; Scr still
  **233**/595; RNG matched **10667**/27158; green+strict; cohort
  **26/26**.
- **Omissions named:** Sokoban boulder / tunnels / `passes_walls` in
  `bad_rock`; carrying_too_much / air_turbulence / slippery_ice before
  impaired; `nh_timeout` CONFUSION expiry still deferred.
- **Next:** seed0002 @10634 `peffect_booze`.

## D-0436 — peffect_confusion + make_confused (seed0002 @10511)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @10511 — C `rn2(7)` @
  `peffect_confusion(potion.c:1025)` vs JS `rn2(5)`. Prefix
  10511; Scr 233/595.
- **Cause:** JS `peffects` deferred `POT_CONFUSION` (return 0, no
  useup / no `rn1(7,…)`); C `peffect_confusion` →
  `make_confused(itimeout_incr(HConfusion, rn1(7, 16-8*bcsign)), FALSE)`.
- **C locus:** `potion.c` `peffect_confusion` / `make_confused` /
  `itimeout` / `itimeout_incr` / `set_itimeout`.
- **Change:** wire `POT_CONFUSION` in `peffects`; port
  `peffect_confusion` msgs + `potion_unkn`/`potion_nothing`; port
  `make_confused` TIMEOUT set + `u.Confusion` mirror.
- **Verification:** seed0002 prefix **10511→10550**; Scr still
  **233**/595; RNG matched **10622**/27158; green+strict; cohort
  **26/26**.
- **Omissions named:** `nh_timeout` CONFUSION expiry; talk=TRUE
  You_feel; Unaware polish; `potionbreathe` still uses `rnd(5)` stub
  (not `make_confused`).
- **Next:** seed0002 @10550 `distfleeck` vs `m_move`.

## D-0435 — SCR_ENCHANT_WEAPON seffect + chwepon (seed0002 @8863)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @8863 — C `rn2(19) @
  exercise(attrib.c:509)` vs JS `rn2(5)` (`distfleeck`). Prefix
  8863; Scr 194/595. Keys `r`/`m` then space — “Your scalpel glows
  blue for a moment.”
- **Cause:** JS `doread` gated `SCR_ENCHANT_WEAPON` as unimplemented
  (return 0, no turn); C `seffects` → `exercise(A_WIS)` then
  `seffect_enchant_weapon` → `chwepon(sobj, 1)` on +0 scalpel.
- **C locus:** `read.c` `seffect_enchant_weapon` / `cap_spe`;
  `wield.c` `chwepon`; `potion.c` `strange_feeling`.
- **Change:** wire otyp in `doread`/`seffects`; port
  `seffect_enchant_weapon` amount formula + confused erodeproof
  subset; port `chwepon` glow/spe path (+ worm-tooth/crysknife,
  evaporate, strange_feeling).
- **Verification:** seed0002 prefix **8863→10511**; Scr **194→233**/595;
  RNG matched **10900**/27158; green+strict; cohort **26/26**.
- **Omissions named:** confused Yobjnam2/hcolor polish; twoweapon
  secondary; shop costly_alteration/alter_cost; Magicbane clue;
  artifact restrict_name; useupall inventory polish (c-js-map turns).
- **Next:** seed0002 @10511 `peffect_confusion`.

## D-0434 — drinksink + dodrink sink yn (seed0002 @8831)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @8831 — C `rn2(20) @
  drinksink(fountain.c:604)` vs JS `rn2(5)` (`distfleeck`). Prefix
  8831; Scr 190/595. Keys `q`/`y` on sink (“Drink from the sink?”).
- **Cause:** JS `dodrink` deferred sink prompt; C
  `IS_SINK`+`can_reach_floor` → yn → `drinksink()`. First fate
  `rn2(20)=15` → default sip (`rn2(3)`/`rn2(2)` warm water).
- **C locus:** `potion.c` `dodrink` sink yn; `fountain.c` `drinksink`
  / `breaksink`.
- **Change:** wire sink yn in `dodrink`; port `drinksink` switch
  (cases 0–13 + 19/default) + `breaksink`; export `dopotion` for
  case 4 faucet.
- **Verification:** seed0002 prefix **8831→8863**; Scr **190→194**/595;
  RNG matched **9069**/27158; green+strict; cohort **24/24**; full
  suite **26/44** Scr **4503**/11405 RNG **267277**/792838.
- **Omissions named:** case 10 `polyself`; case 13 `create_gas_cloud`;
  `dipsink`; Hallucination `hliquid`/`hcolor` (c-js-map data + turns).
- **Next:** seed0002 @8863 `SCR_ENCHANT_WEAPON` / `seffects` exercise.

## D-0433 — closed-door rush bump before autoopen (seed0002 @8609)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @8609 — C `rn2(2) @
  exercise(attrib.c:509)` vs JS `rnl(20)` (`doopen_indir`). Prefix
  8609; Scr 172/595. Capital `H` rush into CLOSED door.
- **Cause:** JS `domove` called `end_running()` before the autoopen
  `!context.run` gate, clearing run so walk-into-door took
  `doopen_indir`/`rnl(20)`. C checks `!svc.context.run` while run is
  still set, then orthogonal bump: Blind/Stunned/`ACURR(A_DEX)<10`/
  Fumbling → “Ouch! You bump into a door.” + `exercise(A_DEX,FALSE)`
  (`rn2(2)`), `door_opened=move=TRUE`, `nomul(0)`.
- **C locus:** `hack.c` `test_move` closed_door autoopen/bump;
  `attrib.c` `exercise`.
- **Change:** keep run until after autoopen check; port orthogonal
  Ouch/`exercise` and “That door is closed.” paths; `nomul(0)` on
  non-`door_opened` failure.
- **Verification:** seed0002 prefix **8609→8831**; Scr **172→190**/595;
  RNG matched **9227**/27158; green+strict; cohort **24/24**.
- **Omissions named:** Passes_walls/ooze/Underwater/tunnels/Blind
  `feel_location`/steed lead-through (c-js-map turns).
- **Next:** seed0002 @8831 `drinksink` `rn2(20)` vs JS `rn2(5)`.

## D-0432 — SCR_REMOVE_CURSE seffect_remove_curse (seed0002 @6954)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @6954 — C `rn2(19) @
  exercise(attrib.c:509)` vs JS `rn2(5)` (distfleeck). Prefix
  6954; Scr 126/595. Keys `r` then `v` (XOR OTA → remove curse:
  “You feel like someone is helping you.” / “The scroll
  disintegrates.” / Call …).
- **Cause:** JS `doread` gated SCR_REMOVE_CURSE unimplemented
  (`return 0` before disappear/seffects). C runs `seffects` →
  `exercise(A_WIS,TRUE)` then `seffect_remove_curse` (cursed →
  nodisappear “You read the scroll.” + You_feel + disintegrates);
  `known` unset → `trycall`/`docall`. JS skipped the turn → fleeck.
- **C locus:** `read.c` `doread` nodisappear / `seffects` /
  `seffect_remove_curse`; `mkobj.c` `uncurse`; `do_name.c` `trycall`.
- **Change:** port `seffect_remove_curse` + `uncurse`; wire
  SCR_REMOVE_CURSE; cursed `nodisappear`; `trycall` when !known.
  Deferred: shop POT_WATER costly_alteration; Punished/unpunish;
  buried_ball_to_freedom; steed saddle Yobjnam2 glow;
  update_inventory; SPE_REMOVE_CURSE cast.
- **Verification:** seed0002 prefix **6954→8609**; Scr **126→172**/595;
  RNG matched **8887**/27158; green+strict; cohort **24/24**.
- **Next:** seed0002 @8609 H-rush door bump vs autoopen `rnl(20)`.

## D-0431 — SCR_LIGHT seffect_light / litroom (seed0002 @6186)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @6186 — C `rn2(19) @
  exercise(attrib.c:509)` ×2 vs JS `rn2(5)` (distfleeck). Prefix
  6186; Scr 99/595. Step keys `r` then `t` (scroll ASHPD SODALG →
  light: “A lit field surrounds you!”).
- **Cause:** JS `doread` gated SCR_LIGHT as unimplemented (`return 0`
  before disappear/seffects). C runs `seffects` → `exercise(A_WIS,TRUE)`
  then `seffect_light`/`litroom`; unknown type + `known` →
  `learnscroll`→`makeknown`→second `exercise(A_WIS,TRUE)`. JS skipped
  the turn; next key consumed as move → fleeck `rn2(5)`.
- **C locus:** `read.c` `seffects` / `seffect_light` / `litroom` /
  `set_lit`; `o_init.c` `discover_object` credit_hero (via
  `makeknown`); `zap.c` `lightdamage` (non-gremlin no-RNG).
- **Change:** port `seffect_light` + `litroom`/`set_lit` +
  `lightdamage` stub; wire SCR_LIGHT into `doread`/`seffects`.
  Deferred: confused yellow/black-light pets; snuff_lit /
  artifact_light / Punished ball; gremlin hit list; Sunsword
  radius-0; Rogue whole-room already wired.
- **Verification:** seed0002 prefix **6186→6954**; Scr **99→126**/595;
  RNG matched **7649**/27158; green+strict; cohort **24/24**.
- **Next:** seed0002 @6954 remove-curse read (`v` / “helping you”).

## D-0430 — drink getobj `?` + fruit juice trycall (seed0002 @4565)

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @4565 — C invent `obj_resists` vs
  JS `dog_goal` `rn2(4)`; JS pet `udist=4`, C adjacent. DIAG: hero had
  walked east during post-eat drink/call keys.
- **Cause:** `getobj_drink` treated `?` as cancel (`Never mind`). C opens
  `display_pickinv`; session then types call name including `l`. Those
  keys hit `rhack` as walk → hero `(75,12)→(76,12)` while C stayed put
  (paralysis later / no walk). Pet `udist` then diverged without earlier
  RNG mismatch. Secondary: `peffects` stubbed fruit juice / see invisible
  (no `trycall`/`docall`) and paralysis.
- **C locus:** `invent.c` `getobj` `?`/`*`; `potion.c`
  `peffect_see_invisible` / `POT_FRUIT_JUICE` / `dopotion` trycall;
  `do_name.c` `docall`; `peffect_paralysis` `rn1(10,25-12*bcsign)`.
- **Change:** drink getobj `?`/`*` → `display_pickinv_reply`; fruit juice
  / see invisible taste + `trycall`/`docall`/`oc_uname`; paralysis
  `nomul(-(rn1(...)))` + feet-frozen msg. Deferred: other `peffect_*`,
  `make_blinded`/See_invisible full props, `newuhs`, Levitation/steed
  paralysis msgs, `surface()`, sink/milky bottles.
- **Verification:** seed0002 prefix **4565→6186**; Scr **54→99**/595;
  RNG matched **6851**/27158; green+strict; cohort **26/26**.
- **Next:** seed0002 @6186 C `exercise` `rn2(19)` vs JS `rn2(5)`.

## D-0429 — seed0002 @4565 invent `dogfood` vs `dog_goal` `!rn2(4)`

- **Status:** fixed (cause = D-0430; not dog_goal/`obj_resists`)
- **Symptom:** seed0002 first RNG miss @4565 — C `rn2(100) @
  obj_resists` vs JS `rn2(4)=1`. Prefix still 4565; Scr 54/595.
- **Rejected:** broken `obj_resists()` body; missing in-bbox fobj;
  invent-scan incompleteness as primary bug.
- **Working cause (superseded):** diagnosed as prior pet placement with
  C adjacent / JS `udist=4`. True cause: hero walk from drink getobj
  desync (D-0430).
- **C locus:** symptom in `dogmove.c` `dog_goal`; root in drink/getobj.
- **Verification:** closed by D-0430.

## D-0428 — eatcorpse acid/sick `losehp` must log `rnd(N)`

- **Status:** fixed
- **Symptom:** seed0002 first RNG miss @3808 — C `rnd(8)=6 @
  eatcorpse(eat.c:1942)` vs JS `rn2(8)=5`. Prefix 3808→4565 after fix.
- **Cause:** JS mildly-ill and acid branches used `1 + rn2(N)` (same
  numeric range as `rnd(N)`) but logged `rn2(N)=…` instead of
  `rnd(N)=…`. Poison already used `rnd`.
- **C locus:** `eat.c` `eatcorpse` — `losehp(rnd(15), …)` acid;
  `losehp(rnd(8), …)` cadaver/rotted-glob.
- **Change:** call `rnd(15)` / `rnd(8)` for those inline HP subtracts.
  Deferred: real `losehp` (botl/`done`); tainted `make_sick`; full
  `rottenfood` body.
- **Verification:** rng-diff prefix **3808→4565**; runner RNG
  4965→4966 Scr still 54/595; green+strict; cohort **24/24**.
- **Next:** seed0002 @4565 — C `obj_resists` vs JS `rn2(4)`.

## D-0427 — throwit land `cansee`→`newsym` (seed0004 @354 food `%`)

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @354 — C map `%` (carrot,
  FOOD_CLASS color 9) at (11,49)/(50,10); JS floor `·`. RNG already
  full; object present in `_objects_at` with `disp` still DEC floor.
- **Cause:** JS `throwit` `place_object`+`stackobj` omitted C's
  `if (cansee(bhitpos)) newsym(...)`. Land glyph never painted.
- **C locus:** `dothrow.c` `throwit` after `stackobj`.
- **Change:** `cansee(x,y)` → `newsym(x,y)` after land stack.
  Deferred: `flooreffects`/`ship_object`/`container_impact_dmg`/
  `obj_sheds_light` vision recalc / gold `throwit` twin path.
- **Verification:** seed0004 **PASS** Scr **409**/409 (was 403);
  RNG full; green+strict; cohort **23/23**; full suite **26**/44
  (Scr 4363/11405).
- **Next:** seed0002 `eatcorpse` (or seed0006/0007 / quest 0).

## D-0426 — seed0004 @330/@336 invent multi-page `(N of M)`

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @330 — C invent footer
  `(1 of 2)`; JS gem letter `i` on row 23. After `i` invent fix,
  same miss @336 getobj `*` throw pickinv.
- **Cause:** `display_inventory` / `display_pickinv_reply` never
  paged. C `tty_end_menu` `lmax=rows-1` → `npages>1` →
  `process_menu_window` morestr `(%d of %d)`; Space advances.
  JS painted all rows and always used `(end) `.
- **C locus:** `wintty.c` `tty_end_menu` / `process_menu_window`;
  `invent.c` `display_pickinv` PICK_NONE / PICK_ONE.
- **Change:** multi-page → `select_menu_pick_none` for `i` invent;
  `display_pickinv_reply` fullscreen page loop with current-page
  selectors. Deferred: MENU_PREV/FIRST/LAST; other NHW_MENU callers
  still single-page `(end)`.
- **Verification:** seed0004 Scr **397→403**/409; cursors full;
  RNG full; @330/@336 fixed; first miss **@354** map `%` vs floor;
  green+strict; cohort **23/23**.
- **Next:** seed0004 @354 map object glyph `%` (gem pile?).

## D-0425 — seed0004 @312 describe_looked DECgraphics wall

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @312 — C topline
  `│        the interior of a monster or a wall (wall)` (DEC `x`);
  JS `dark part of a room`. RNG full after D-0424.
- **Cause:** `describe_looked` had no wall arm. C
  `do_screen_description` treats DECgraphics `S_vwall` showsym `\xf8`
  (`x`) as `is_swallow_sym` (same as `S_sw_ml`/`S_sw_mr`) then cmap
  `"wall"`, then lookat parenthetical `(wall)`. Message prefix needs
  DEC→Unicode (JS topline has no `decgfx`), same pattern as ROOM `·`.
- **C locus:** `pager.c` `is_swallow_sym` + `do_screen_description`
  cmap walls; `lookat` defsyms `"wall"`; `dat/symbols` DECgraphics
  `S_vwall`/`S_sw_ml`.
- **Change:** `describe_wall_looked` + `is_swallow_sym` subset;
  export `terrain_glyph`; Unicode prefix via `DEC_TO_UNICODE`.
  Deferred: full showsyms-driven cmap scan; SDOOR-as-wall; beams
  (empty explanations already skipped in C).
- **Verification:** seed0004 Scr **396→397**/409; @312 fixed; first
  miss **@330** invent `(1 of 2)`; RNG full; green+strict; cohort
  **23/23** (+ green 2).
- **Next:** seed0004 @330 `i` invent multi-page footer.

## D-0424 — seed0004 @310 lookat tseen trap brief_at

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @310 — C topline `dart trap`
  during `/` whatis getpos autodescribe; JS `floor of a room`. RNG
  full after D-0423. Trap at cell already `tseen` (map `^`, D-0419).
- **Cause:** `brief_at` / `describe_looked` / travel `auto_describe_text`
  omitted C `lookat` `glyph_is_trap` → `trap_description` /
  `trapname` before cmap floor. Seen traps fell through to ROOM
  `"floor of a room"`.
- **C locus:** `pager.c` `lookat` trap arm; `trap_description` →
  `trapname`; `defsym.h` trap PCHAR explanations.
- **Change:** export full `trapname` from `trap.js`; `brief_at` +
  `describe_looked` + `auto_describe_text` return `trapname` when
  `t_at && tseen`. Deferred: `trapped_chest_at` / `trapped_door_at`;
  Hallucination; full wall/object cmap `do_screen_description`.
- **Verification:** seed0004 Scr **395→396**/409; @310 fixed; first
  miss **@312** C wall ambiguous look vs JS dark room; RNG full;
  green+strict; cohort **25/25**; full suite Scr **4350**/11405.
- **Next:** seed0004 @312 `describe_looked` DECgraphics wall.

## D-0423 — seed0004 @297 getpos autodescribe stairs (default On)

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @297 — C topline
  `staircase down` after travel `_>` feature jump; JS blank.
  RNG full after D-0422.
- **Cause:** (1) C `optlist.h` `autodescribe` is opt_out default On;
  JS never set `iflags.autodescribe`, so after `>` cleared the goal
  prompt the loop skipped `auto_describe`. (2) Travel `getpos` has no
  `describeAt`; `auto_describe_text` only handled self/mon/blank →
  never stairs/ladder `defsyms` explanations.
- **C locus:** `optlist.h` `NHOPTB(autodescribe…)`; `getpos.c`
  `auto_describe` → `do_screen_description`/`lookat` cmap;
  `defsym.h` `S_*stair` / `S_*ladder` explanations.
- **Change:** `jsmain.js` default `iflags.autodescribe: true` (rc may
  negate); `getpos.js` `stair_ladder_explanation` in
  `auto_describe_text`. Deferred: trap/object/wall cmap arms,
  `coord_desc`, `(no travel path)` / `(invalid target)` suffixes.
- **Verification:** seed0004 Scr **391→395**/409; @297–@309 match;
  first miss **@310** C `dart trap` vs JS `floor of a room` (whatis
  `brief_at`); RNG full; green+strict; cohort **25/25**.
- **Next:** seed0004 @310 `/` getpos `brief_at` / lookat trap.

## D-0422 — seed0004 @288 getobj ? n==1 → message_menu PICK_ONE

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @288 — C
  `o - a scroll labeled STRC PRST SKRZ KRK.--More--` (topline; cursor
  after More); JS corner invent `Scrolls` heading + truncated line +
  `(end)`. RNG full after D-0421. Trigger: read getobj `?` with
  suggests `[o or ?*]`.
- **Cause:** `display_pickinv_reply` always painted corner NHW_MENU.
  C `display_pickinv` when `n == strlen(lets) == 1` and
  `!force_invmenu && !menu_requested` uses
  `message_menu(invlet, PICK_ONE, xprname(..., TRUE))` —
  `tty_message_menu` putstr + `more()` with `dismiss_more=let` so the
  letter selects at `--More--`. (Bare `i` with one item bumps `n` and
  keeps the menu — only getobj-filtered single letter takes this path.)
- **C locus:** `invent.c` `display_pickinv` n==1 branch;
  `wintty.c` `tty_message_menu`; `getline.c` `xwaitforspace` dismiss_more.
- **Change:** `display.js` `message_menu` + `more` accepts dismiss_more;
  `invent.js` `display_pickinv_reply` n==1+lets → message_menu.
  Deferred: force_invmenu / menu_requested / wizid / hands / `*` multi
  message_menu; PICK_NONE single-item full invent.
- **Verification:** seed0004 Scr **390→391**/409; @288 fixed; first
  miss **@297** C `staircase down` vs JS blank (getpos autodescribe);
  RNG full; green+strict; cohort **25/25**.
- **Next:** seed0004 @297 travel/getpos `staircase down` describe.

## D-0421 — seed0004 @285 choose_ring_hand via yn_function [rl]

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @285 — C
  `Which ring-finger, Right or Left? [rl]`; JS omitted `[rl]`.
  RNG full after D-0420.
- **Cause:** `choose_ring_hand` painted a bare prompt + `nhgetch`
  instead of C `yn_function(qbuf, rightleftchars, '\0')`, which
  tty appends ` [rl] `. Also JS `yn_function` treated `'\0'` def as
  truthy for the optional `(c)` suffix (C char `'\0'` is falsy).
- **C locus:** `do_wear.c` `accessory_or_armor_on` ring branch;
  `decl.c` `rightleftchars`; `win/tty/topl.c` `tty_yn_function`.
- **Change:** `do_wear.js` `choose_ring_hand` → `yn_function(q,'rl','\0')`;
  `getline.js` `yn_function` — `'\0'` def skips `(c)`, ESC/quitchars
  return def. Deferred: poly/`body_part(FINGER)`/`nolimbs`;
  `query_menu` right/left menu.
- **Verification:** seed0004 Scr **389→390**/409; @285 fixed; first
  miss **@288** C invent `o - a scroll labeled…--More--` vs JS
  corner invent `Scrolls` heading; RNG full; green+strict; cohort
  **25/25**.
- **Next:** seed0004 @288 invent long-line `--More--` / display path.

## D-0420 — seed0004 @277 RING xname descr path (not obj.known)

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @277 — look_here pile C
  `an engagement ring`; JS `a ring of conflict`. RNG full.
  (Appearance shuffle: engagement is shuffled descr of RIN_CONFLICT.)
- **Rejected:** wrong otyp on floor (RNG full; invent later shows
  engagement correctly once named).
- **Cause:** `pretty_base` RING path used
  `obj.dknown && (oc_name_known || obj.known)` → `"ring of <actualn>"`
  and omitted C `dknown && !nn && !un → "%s ring"` (`dn`). For rings
  `obj.known` is spe/charge, not type ID — same class of bug as
  D-0285/D-0309 potions/wands.
- **C locus:** `objnam.c` `xname_flags` RING_CLASS (`nn` /
  `oc_name_known` only; else `Sprintf("%s ring", dn)`).
- **Change:** `objnam.js` `pretty_base` RING — match potion/wand:
  `!dknown` / `nn` / `un` / else `<dn> ring`. Deferred: none in this
  branch; `choose_ring_hand` yn choices `[rl]` is separate (@285).
- **Verification:** seed0004 Scr **382→389**/409; @277 fixed; first
  miss **@285** C `…Left? [rl]` vs JS without choices; RNG full;
  green+strict; cohort **25/25**.
- **Next:** seed0004 @285 `choose_ring_hand` → C `yn_function` +
  `rightleftchars`.

## D-0419 — seed0004 @248 map_trap tseen glyph in newsym/map_location

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @248 — C map `^` (cyan dart
  trap); JS room floor `.`/`·`. Trap at (40,5) already `tseen=true`
  (DART_TRAP); RNG full.
- **Rejected:** missing `feeltrap`/`seetrap` (state already seen).
- **Cause:** JS `_map_location`/`newsym` skipped C
  `t_at && tseen && !covers_traps → map_trap` (named omission).
- **C locus:** `display.c` `map_trap` / `_map_location`;
  `defsym.h` trap PCHARs; `display.h` `covers_traps`.
- **Change:** `display.js` — `trap_glyph` (defsym colors), `map_trap`,
  wire into `map_location` + cansee `newsym`; local `t_at_display` /
  `covers_traps`. Deferred: Hallucination `random_trap_to_glyph`.
- **Verification:** seed0004 Scr **254→382**/409; miss @248→@277
  (`an engagement ring` vs `a ring of conflict`); RNG full;
  green+strict; cohort **25/25**; full suite Scr **4336**/11405
  (+128 vs pre-fix #450).
- **Next:** seed0004 @277 look_here / doname pile ring.

## D-0418 — seed0004 @240 xname WEAPON poisoned prefix (sortloot + doname)

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @240 — C pickup menu
  `a - 10 darts` / `b - a poisoned dart`; JS `a - a dart` /
  `b - 10 darts`. RNG already full. Quan formatting itself was fine
  on the stack of 10 once ordered correctly.
- **Rejected:** bare `doname` quan bug; invent letter assignment.
- **Cause:** `pretty_base`/`xname` WEAPON path omitted C
  `is_poisonable && opoisoned → "poisoned "` prefix. That string
  also drives `loot_xname`/`sortloot` (`"dart"` < `"poisoned dart"`),
  so floor order put the singular dart first and hid poison in
  `doname`.
- **C locus:** `objnam.c` xname WEAPON_CLASS poisoned; doname_base
  strip/`ispoisoned` reinsert; `invent.c` loot_xname →
  `cxname_singular`.
- **Change:** `objnam.js` — `is_poisonable_obj`; WEAPON `poisoned `
  in pretty_base; doname strips into prefix before erosion/spe.
  Deferred: `permapoisoned`; wet-towel; figurine.
- **Verification:** seed0004 Scr **245→254**/409; RNG still
  **12084**/12084; first miss **@240→@248** (trap `^` vs `.`);
  green+strict PASS; cohort **25/25**.
- **Next:** seed0004 @248 trap glyph / tseen display.

## D-0417 — seed0004 @239 use_container emptymsg needs Ysimple_name2

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @239 — C topline
  `The bag is empty.`; JS `the bag is empty.` RNG already full.
- **Rejected:** prompt/`outmaybe` timing; invent vs floor ownership
  (`Do what with the bag?` already matched).
- **Cause:** `use_container` loot-out empty path used bare
  `theArt(xname(obj))` without capitalization. C preformats
  `emptymsg` with `Ysimple_name2` (`objnam.c` = highc of
  `ysimple_name` / shk_your + minimal_xname).
- **C locus:** `pickup.c` `use_container` emptymsg/`pline1`;
  `objnam.c` `Ysimple_name2`/`ysimple_name`.
- **Change:** `pickup.js` — `simpleonames`/`ysimple_name`/
  `Ysimple_name2`; preformat emptymsg when `!outokay`; loot-out
  empty → `pline(emptymsg)`. Deferred: quantum/cursed-mbag
  `"now "` emptymsg; full `minimal_xname`.
- **Verification:** seed0004 Scr **244→245**/409; RNG still
  **12084**/12084; first miss **@239→@240** (`10 darts` vs `a dart`);
  green+strict PASS; cohort **23/23**.
- **Next:** seed0004 @240 floor pickup menu quan/`doname`.

## D-0416 — seed0004 @182 dog_move cursemsg needs LOS canseemon

- **Status:** fixed
- **Symptom:** seed0004 first cell miss @182 — JS topline
  `Your saddled pony steps reluctantly onto an orc corpse.` (no
  `--More--`); C blank. RNG already full. Isolated miss (181/183 OK).
- **Rejected:** message-clear timing / rhack clear before `H`; late
  second cursemsg without matching C path.
- **Cause:** `js/dogmove.js` local `canseemon` stub returned true for
  any non-minvis pet, ignoring LOS. C `dog_move` gates cursemsg on
  `wasseen || canseemon(mtmp)` (`display.h` cansee/infrared +
  mon_visible). Out-of-sight cursed step → C silent, JS plined.
- **C locus:** `dogmove.c` `dog_move` newdogpos cursemsg; `display.h`
  `_canseemon`.
- **Change:** import `canseemon` from `display.js`; delete always-true
  stub. Deferred: cursemsg `what` via hero_memory glyph +
  `distant_name` (JS still `doname(objects_at)`).
- **Verification:** seed0004 Scr **243→244**/409; RNG still
  **12084**/12084; first miss **@182→@239** (`The`/`the` bag empty);
  green+strict PASS; cohort **23/23**.
- **Next:** seed0004 @239 empty-container `Ysimple_name2` / upstart.

## D-0415 — seed0004 @11722 throw carrot → tamedog/dog_eat

- **Status:** fixed (RNG); screens still open
- **Symptom:** seed0004 first RNG miss @11722 — C `next_ident` /
  `obj_resists` vs JS `distfleeck` after Conflict pet kick. Session keys:
  `a` (sorry) then `t*` select carrots `h`, direction `l` → pony eats.
- **Rejected:** post-wipe EOT object spawn; bare `mattacku` aftermath.
- **Cause:** JS `getobj_throw` cancelled on `*` (Never mind) so food
  throw never ran; `throwit` lacked mon-hit food/`befriend_with_obj`→
  `tamedog`; `tamedog` omitted already-tame thrown-food → `dog_eat`.
- **C locus:** `dothrow.c` `dothrow`/`throw_obj`/`thitmonst` befriend
  arm; `dog.c` `tamedog` mtame+obj feed; `dogmove.c` `dog_eat`;
  `mondata.h` `befriend_with_obj`.
- **Change:** `dothrow.js` — `*`/`?` pickinv; freeinv after split;
  `bhit`-style mon stop + `thitmonst_food` (`rnd(20)` + befriend/
  dogfood → `tamedog`). `dog.js` — already-tame food before mtame<10
  bump; export `dog_eat`. Deferred: weapon `thitmonst` hit arms;
  scroll/spell bless tame bump; `throw_gold`.
- **Verification:** seed0004 RNG **12084**/12084 (was 11790); Scr
  **243**/409 (was 240); green+strict PASS; cohort **25/25**.
- **Next:** seed0004 screen-only peel (cells 243/409; cursors 402).

## D-0414 — seed0004 @11708 dog_move ALLOW_U → mattacku

- **Status:** fixed
- **Symptom:** seed0004 first RNG miss @11708 — C `rnd(20)` @
  `mattacku` vs JS `rn2(5)` @ `distfleeck` after matching dog_move
  candidate `rn2(12)` rolls.
- **Rejected:** bare dochug PHASE FOUR / peaceful×Conflict hero attack
  as the sole gap (prefix already past D-0413 fightm; C caller is
  `dogmove.c` newdogpos, not `dochug`).
- **Cause:** JS `dog_move` set `ALLOW_U` via `mon_allowflags` under
  Conflict but, on choosing that square, stepped/finished without C’s
  `mfp.info[chi] & ALLOW_U` → `mattacku` → `MMOVE_DONE` branch.
- **C locus:** `dogmove.c` `dog_move` newdogpos ALLOW_U/`mattacku`;
  `mon.c` `mon_allowflags` Conflict→ALLOW_U; `mhitu.c` `mattacku`.
- **Change:** `dogmove.js` — before place, if chosen candidate has
  `ALLOW_U`, optional leash-break pline, `await mattacku`, return
  `MMOVE_DONE`. Deferred: full `m_unleash` bookkeeping; `pet_ranged_attk`
  youmonst→`mattacku`.
- **Verification:** seed0004 prefix **11708→11722** (RNG 11774→11790);
  Scr **242→240**/409; green+strict PASS; cohort **25/25**. Full
  `sessions` #445: **25/44**, Scr **4194**/11405, RNG **262860**/792838.
- **Next:** seed0004 @11722 C `next_ident` vs JS `distfleeck`.

## D-0413 — seed0004 @11568 Conflict fightm before dochugw

- **Status:** fixed
- **Symptom:** seed0004 first RNG miss @11568 — C `resist_conflict`
  vs JS `distfleeck` mid-travel under worn Conflict.
- **Rejected:** bare dochug phase-four gap alone (hostile jackal early-
  returns before P4; P4 would not roll resist for `!mpeaceful`).
- **Cause:** `movemon_singlemon` omitted C’s Conflict→`fightm` gate
  before `dochugw`. `fightm` always rolls `resist_conflict` first; on
  resist (or no adjacent foe) C continues to dochug. JS skipped that
  roll so the next mon’s `distfleeck` fired early. Secondary: `dochug`
  used `game.Conflict` instead of `hero_conflict()` (worn ring) and
  PHASE FOUR lacked peaceful×Conflict `resist_conflict`.
- **C locus:** `mon.c` `movemon_singlemon` Conflict/`fightm`;
  `mhitm.c` `fightm`; `monmove.c` `dochug` want_move + PHASE FOUR;
  `youprop.h` Conflict.
- **Change:** `mhitm.js` `fightm`; `mon.js` Conflict gate before
  `dochugw`; `monmove.js` `hero_conflict` + P4 resist path.
  Deferred: ustuck/itsstuck release in `fightm`; `m_everyturn_effect`;
  full `ranged_attk_available` in MOVED fall-through.
- **Verification:** seed0004 prefix **11568→11708** (RNG 11662→11774);
  Scr still **242**/409; green+strict PASS; cohort **25/25**. Next miss
  @11708 C `mattacku` vs JS `distfleeck`.
- **Next:** seed0004 @11708 Conflict/peaceful hero attack path.

## D-0412 — seed0004 @10966 findtravelpath boulder step (not after_calc)

- **Status:** fixed
- **Symptom:** seed0004 first RNG miss @10966 — C `distfleeck` vs JS
  `dopush`/`exercise(A_STR)` during `_>` travel (RNG attributed to step
  `.`). Prior theory: `u_calc_moveamt` after_calc<12 / leftover+SLT.
- **Cause:** JS `findtravelpath` BFS grew from the hero and treated
  boulder cells as walkable, so travel stepped onto a boulder (`dopush`).
  C expands from the destination (`hack.c` findtravelpath), delays
  boulder nodes, and takes a quiet step — next RNG is monster
  `distfleeck`. DIAG showed JS `9→21` UNENC at the miss EOT (after≥12);
  force-after_calc experiments only changed timing.
- **C locus:** `hack.c` `findtravelpath` / `test_move(TEST_TRAV)` boulder
  delay; `domove_core` TRAVEL then GUESS.
- **Change:** `cmd.js` — dest→hero BFS with `dirs_ord`, skip boulder
  path nodes, `TRAVP_GUESS` fallback on continue_run/dotravel_target.
  Deferred: travelmap revisit stop, full TEST_TRAP/door delay,
  `could_move_onto_boulder` / Passes_walls / Sokoban.
- **Verification:** seed0004 prefix **10966→11568** (RNG 11029→11662);
  green+strict PASS; cohort **25/25**. Next miss @11568
  `resist_conflict` vs `distfleeck`.
- **Next:** seed0004 @11568 monster conflict path during travel.

## D-0411 — umonnum/youmonst.data + moveloop encumber_msg/mvl_wtcap order

- **Status:** fixed (partial vs @10966 — miss unchanged)
- **Symptom:** seed0004 @10966 C `distfleeck` vs JS `dopush`/`exercise`;
  DIAG showed `youmonst` unset and moveloop missing C’s
  `encumber_msg` + post-monster `near_capacity` sample.
- **Cause (ported gap):** `u_init` never set `u.umonnum`/`youmonst.data`
  (C `u_init.c` + basic `set_uasmon`); `moveloop_core` sampled
  `mvl_wtcap` only inside the EOT arm and skipped loop-top
  `encumber_msg`.
- **C locus:** `u_init.c` `umonnum=umonster=urole.mnum` + `set_uasmon`
  basic data; `allmain.c` moveloop_core `encumber_msg` then monsters
  then `mvl_wtcap=near_capacity()` then conditional EOT.
- **Change:** `u_init.js` basic `youmonst.data`; `allmain.js` loop order.
  Full FROMFORM `set_uasmon` props deferred. @10966 still needs
  after_calc<12 (weight/leftover) — see NOTES.
- **Verification:** seed0004 still RNG **11029**/12084 prefix **10966**;
  green+strict PASS; cohort **23/23** (+green = 25 PASS set).
- **Next:** seed0004 @10966 — ≥16 aum inv/cap gap or leftover-0+SLT.

## D-0410 — seed0004 @10713 gethungry metabolic uhunger--

- **Status:** fixed
- **Symptom:** seed0004 first RNG miss @10713 — C `exercise` `rn2(19)`
  (inc) vs JS `rn2(2)` (dec) after lichen eat EOT.
- **Cause:** `gethungry` deferred ordinary `uhunger--`, so after
  `lesshungry` nutrition JS stayed SATIATED (`exerper` DEX abuse) while
  C burned hunger to NOT_HUNGRY (`exerper` CON exercise). Same
  `youmonst.data` gap as D-0409 would have skipped the diet gate.
- **C locus:** `eat.c` `gethungry` metabolic burn via
  `carnivorous`/`herbivorous`/`metallivorous(gy.youmonst.data)` +
  accessorytime odd/even Regen/encumbrance/Hunger/Conflict.
- **Change:** `eat.js` `gethungry` — metabolic tick with
  `hero_form_data()`; odd/even accessory burns; `monsters.js`
  `metallivorous`/`M1_METALLIVORE`. Ring/amulet switch + `newuhs`
  deferred.
- **Verification:** seed0004 RNG **11027→11029**/12084; prefix
  **10713→10966**; Scr still **242**/409; first miss @10966 C
  `distfleeck` vs JS `dopush` `exercise(A_STR)` (umovement 21→hero
  run); green+strict PASS; cohort **25/25**.
- **Next:** seed0004 @10966 umovement / encumbrance drift (JS hero
  `continue_run`→boulder vs C still in monster phase).

## D-0409 — seed0004 @10657 eatcorpse palatable / youmonst.data

- **Status:** fixed
- **Symptom:** seed0004 first RNG miss @10657 — C `eatcorpse` `rn2(10)`
  (palatable) vs JS `distfleeck` `rn2(5)`.
- **Cause:** `eatcorpse` used `game.youmonst?.data` which is unset
  (`set_uasmon` deferred). `herbivorous(undefined)` is false, so the
  palatable expression short-circuited before `rn2(10)`; monsters then
  burned `rn2(5)`. Floorfood/`doeat`/`y` path was already correct.
- **C locus:** `eat.c` `eatcorpse` palatable via
  `herbivorous`/`carnivorous(gy.youmonst.data)`; `set_uasmon` /
  invent.c basic `youmonst.data = &mons[u.umonnum]`.
- **Change:** `eat.js` `hero_form_data()` fallback
  (`u.umonnum ?? urole.mnum`) for yummy/palatable diet predicates
  (same pattern as `wield.js`).
- **Verification:** seed0004 RNG **10685→11027**/12084; prefix
  **10657→10713**; Scr still **242**/409; first miss @10713
  `exercise`; green+strict PASS; cohort **25/25**.
- **Next:** seed0004 @10713 C `exercise` `rn2(19)` vs JS `rn2(2)`
  (likely `lesshungry`/`exerper` after finish-eating).

## D-0408 — seed0004 @10563 getpos `>` stairs / travel destination

- **Status:** fixed
- **Symptom:** seed0004 first RNG miss @10563 — C `gethungry`/`exercise`/
  `hitum` (walk into lichen) vs JS `distfleeck` `rn2(5)`.
- **Cause:** travel getpos treated `>` as unknown direction, so `.`
  confirmed the hero tile (“already here”) and travel never targeted
  downstairs. Hero path stayed short of the lichen; C jumped cursor to
  `>` then traveled adjacent and melee’d.
- **C locus:** `getpos.c` feature-char scan (`defsyms`/`showsyms` match,
  two-pass from cursor); stairs/ladder `>`/`<`.
- **Change:** `getpos.js` `find_dungeon_feature` for `>`/`<` via
  STAIRS/LADDER + `LA_DOWN` / `disp_ch`.
- **Verification:** seed0004 RNG **10569→10685**/12084; prefix
  **10563→10657**; Scr still **242**/409; first miss @10657
  `eatcorpse`; green+strict PASS; cohort **23/23**.
- **Next:** seed0004 @10657 C `eatcorpse` `rn2(10)` vs JS `distfleeck`.

## D-0407 — seed0004 @10382 SCR_TELEPORTATION / safe_teleds

- **Status:** fixed
- **Symptom:** seed0004 first RNG miss @10382 — C `exercise` `rn2(19)`
  (×2) then `safe_teleds` vs JS `distfleeck` `rn2(5)`.
- **Cause:** `doread` gated SCR_TELEPORTATION as unimplemented and
  getobj-read treated `?` as Never mind, so session `r?o` never ran
  `seffects`→`scrolltele`. C: magic `exercise(A_WIS)` +
  `learnscroll`→`makeknown` credit WIS + `safe_teleds`.
- **C locus:** `read.c` `seffect_teleportation` / `learnscrolltyp`;
  `teleport.c` `scrolltele` / `safe_teleds`; invent `display_pickinv`
  for getobj `?`.
- **Change:** getobj-read `?`/`*` via `display_pickinv_reply`;
  `seffect_teleportation`→`scrolltele`/`safe_teleds`; learnscroll →
  `makeknown`+`more_experienced(0,10)`; seffects `oc_magic` exercise
  before otyp switch.
- **Verification:** seed0004 RNG **10409→10569**/12084; Scr
  **241→242**/409; first miss @10563; green+strict PASS; cohort
  **23/23**.
- **Next:** seed0004 @10563 C `gethungry`/`hitum` vs JS `distfleeck`
  (post-travel move `l`).

## D-0406 — seed0004 @10370 Conflict / pickup MENU_INVERT_ALL

- **Status:** fixed
- **Symptom:** seed0004 first RNG miss @10370 — C `resist_conflict`
  `rnd(20)` vs JS `dog_move` `rn2(16)`.
- **Rejected:** bare missing `resist_conflict` alone (Conflict was never
  true in JS — no ring worn).
- **Cause:** floor pickup menu ignored `@` (`MENU_INVERT_ALL`). Session
  `@aa\r` never selected the engagement ring (RIN_CONFLICT after shuffle);
  put-on `Pq`/`r` never armed Conflict. C then rolled `resist_conflict`
  twice (`dog_move` + `mon_allowflags`).
- **C locus:** `win/tty/wintty.c` `MENU_INVERT_ALL` / `invert_all`;
  `mondata.c` `resist_conflict`; `dogmove.c` after `dog_goal`;
  `mon.c` `mon_allowflags` Conflict→`ALLOW_U`.
- **Change:** PICK_ANY menus honor `@`/`.`/`-`; port `resist_conflict` +
  `hero_conflict` (worn `RIN_CONFLICT` stand-in for deferred `oc_oprop`);
  call from `dog_move` + `mon_allowflags`.
- **Verification:** seed0004 RNG **10399→10409**/12084; first miss
  @10382 `exercise`/`safe_teleds`; green+strict PASS; cohort **23/23**.
- **Next:** seed0004 @10382 C `exercise` `rn2(19)` vs JS `rn2(5)`
  (read teleport scroll path).

## D-0405 — seed0004 @9795 dog_goal IS_ROOM / unrotted floor corpse

- **Status:** fixed
- **Symptom:** seed0004 first RNG miss @9795 — C `dog_move` `rn2(16)`
  (mtrack) vs JS `dog_goal` `rn2(4)`.
- **Rejected:** mtrack arity; raw post-pickup key-ownership in `more()`/
  menu (keys were queued; rhack delayed by extra EOTs).
- **Cause:** `start_timer` / `obj_stop_timers` were stubs that never
  fired. Mklev jackal CORPSE at hero square `(40,5)` stayed forever.
  C `run_timers` → `rot_corpse` removed it before pickup. JS pickup
  menu still listed it as `c`, so session `c`/`d` took corpse+sack
  (HVY encumbrance) instead of C's bag+lamp. Extra EOT cycles burned
  the RNG of C's next `n`/`n` moves while hero stayed ROOM → dog_goal
  `rn2(4)` at @9795.
- **C locus:** `timeout.c` `run_timers` / `start_timer` (~2222/2247);
  `dig.c` `rot_corpse`; `nh_timeout` calls `run_timers` at end;
  `pickup.c` `query_objlist` `sortloot(SORTLOOT_LOOT|PACK)`.
- **Change:** real `game._timer_base` queue in `mkobj.js`;
  `run_timers` + floor `rot_corpse` from `nh_timeout`; floor pickup
  uses shared `sortloot` (within-class `loot_xname`).
- **Verification:** seed0004 RNG **9892→10399**/12084; Scr
  **233→241**/409; first miss @10370 `resist_conflict`; green+strict
  PASS; cohort **23/23** (+green = 25 PASS set).
- **Next:** seed0004 @10370 C `resist_conflict` `rnd(20)` vs JS
  `dog_move` `rn2(16)`.

## D-0404 — known_hitum flee gate integer mhpmax/2

- **Symptom:** seed0004 @216 / RNG @9183 — C `distfleeck` `rn2(5)` vs JS
  `rnd(100)` after matching `known_hitum` `rn2(25)=0` + apparent
  `passive` `rn2(3)=0`.
- **Cause:** JS used float `(mhpmax|0)/2`. With `mhp=1`, `mhpmax=3`,
  C `1 < 3/2` → `1 < 1` false (skip monflee); JS `1 < 1.5` true →
  `!rn2(3)?rnd(100):0`. Positional `rn2(3)` match was monflee vs
  passive coinciding.
- **C locus:** `uhitm.c` `known_hitum` (~625) `mhp < mhpmax/2 &&
  !engulfing_u(mon)` then `monflee(..., !rn2(3)?rnd(100):0, ...)`.
- **Change:** `js/uhitm.js` `Math.trunc((mhpmax|0)/2)` +
  `!engulfing_u(mon)`. Named omissions: full `monflee` body (duration
  RNG only).
- **Verification:** seed0004 Scr **215→233**/409; RNG
  **9213→9892**/12084 (first miss @9795 `dog_move`); green+strict
  PASS; cohort **25/25**; full suite still **25/44**.
- **Next:** seed0004 @9795 C `dog_move` `rn2(16)` vs JS `rn2(4)`.

## D-0403 — heal_legs + nh_timeout WOUNDED_LEGS expiry

- **Symptom:** seed0004 @51 — C
  `Your leg feels better.  Your movements are now unencumbered.` vs JS
  blank; RNG @4394 `rn2(67)` vs `rn2(64)` (`40+ACURR(A_DEX)*3`).
- **Cause:** JS never ran `nh_timeout`; `HWounded_legs` TIMEOUT never
  expired, so `heal_legs(0)` never restored ATEMP(DEX) or plined /
  `encumber_msg`.
- **C locus:** `timeout.c` `nh_timeout` WOUNDED_LEGS (~774);
  `do.c` `heal_legs` (~2449); `allmain.c` once-per-turn before
  `regen_hp` / wipe_engr (~273); `objnam.c` `vtense` bare singular.
- **Change:** `js/timeout.js` WOUNDED_LEGS TIMEOUT decrement →
  `heal_legs(0)` + `stop_occupation`; `js/trap.js` `heal_legs`;
  `js/allmain.js` `await nh_timeout()` before regen_hp; `js/objnam.js`
  `vtense` ends-in-s plural / bare singular conjugate. Named omissions:
  other `nh_timeout` prop cases; Glib; run_regions; luck; dialogues;
  `vtense` special_subjs / of-from polish.
- **Verification:** seed0004 @51 match; Scr **53→215**/409; RNG
  **5331→9213**/12084 (first miss @9183); green+strict PASS; cohort
  **25/25**; seed0002 Scr still 54.
- **Next:** seed0004 @216 / RNG @9183 C `distfleeck` vs JS `rnd(100)`.

## D-0402 — Norep compares to gp.prevmsg (caught+wriggle topline)

- **Symptom:** seed0004 @46 — C
  `You are caught in a bear trap.  You finally wriggle free.` vs JS
  wriggle-only.
- **Cause:** JS `Norep` used `_last_norep` (Norep-only). After pony
  `The saddled pony is caught in a bear trap!` pline, C's `gp.prevmsg`
  differs so escape-turn `Norep("You are caught…")` shows again and
  `update_topl` concatenates wriggle. JS still suppressed the caught
  Norep.
- **C locus:** `pline.c` `Norep`/`vpline` `MSGTYP_NOREP` vs `gp.prevmsg`
  (~246–282, ~327); `topl.c` `update_topl` short-line concat (~259–271).
- **Change:** `js/display.js` — `_prevmsg` updated on shown `pline`;
  shared `Norep` suppresses only when `msg === _prevmsg`; `hack.js`/
  `do.js` use it (drop local `_last_norep`). Msgtype-pattern table still
  deferred.
- **Verification:** seed0004 @46 match; Scr **52→53**/409; RNG still
  **5331**/12084 @4394 (`rn2(67)` vs `rn2(64)`); green+strict PASS;
  cohort **23/23**.
- **Next:** seed0004 @51 `Your leg feels better.` via `heal_legs` /
  `nh_timeout` WOUNDED_LEGS (also restores ATEMP DEX → wipe_engr rn2).

## D-0401 — trapmove + botl enc_stat + exerper status + mintrap escape RNG

- **Symptom:** seed0004 Scr stuck **29**/409 — NOTES blamed missing
  `You are caught in a bear trap.` topline; actual first cell miss @27 was
  botl missing `Burdened`, then trapmove/exerper/mintrap gaps.
- **Cause (cluster):** (1) JS `domove` omitted C `hack.c` `trapmove` while
  `u.utrap`; (2) `_statusLine2` omitted `enc_stat[near_capacity()]`;
  (3) `exerper` omitted encumbrance + every-5 `Wounded_legs`→`exercise(A_DEX,FALSE)`;
  (4) `mintrap` already-trapped path skipped C `rn2(40)`; (5) `dog_move`
  `newsym` before `postmov` spoiled pre-`newsym` `--More--` glyphs.
- **C locus:** `hack.c` `trapmove` (~1550) / `domove_core` utrap (~2830);
  `botl.c` `do_statusline2` `enc_stat` (~187); `attrib.c` `exerper` (~552–582);
  `trap.c` `mintrap` already-trapped (~3741–3771); `dogmove.c` place then
  pline without newsym (~1296–1312); `monmove.c` `postmov` newsym.
- **Change:** `js/hack.js` `trapmove` (BEARTRAP + partial other TT_*);
  wire in `js/cmd.js` `domove`; `js/display.js` `ENC_STAT` on botl;
  `js/allmain.js` `exerper` encumbrance+status; `js/trap.js` mintrap
  `rn2(40)` escape; `js/dogmove.js` defer newsym to postmov.
  Named omissions: steed trapmove msgs; `climb_pit`; Sting/web cut;
  buried-ball radius; `m_easy_escape_pit`; metallivorous chew; full
  botl conditions (Stone/hunger/Blind/…); Clairvoyant/Regen exercise.
- **Verification:** seed0004 Scr **29→52**/409 (prefix ~46); RNG
  **4114→5331**/12084 (prefix ~4394); green+strict PASS; cohort **23/23**.
- **Next:** seed0004 @46 C concatenates caught+wriggle on one topline;
  RNG @4394 `rn2(67)` vs `rn2(64)` (`ACURR(A_DEX)` / wipe_engr).

## D-0400 — encumber_msg + weight_cap wounded-leg reduct (bear --More--)

- **Symptom:** seed0004 @27 — C `A bear trap closes on your foot!--More--`
  (cursor topline) vs JS same text without `--More--` (cursor on map); space
  then becomes `Unknown command ' '`.
- **Cause:** Not missing `flush_topl_more` alone. C `set_wounded_legs` calls
  `encumber_msg`; `weight_cap` subtracts `WT_WOUNDEDLEG_REDUCT` per wounded
  side, so capacity rises to SLT and plines
  `Your movements are slowed slightly because of your load.` — that second
  pline triggers `more()` on the bear-trap message. JS omitted both.
- **C locus:** `do.c` `set_wounded_legs` (~2426); `pickup.c` `encumber_msg`
  (~1978); `hack.c` `weight_cap` wounded (~4331–4335); `allmain.c`
  `moveloop_preamble` `encumber_msg` (~91).
- **Change:** `js/invent.js` — `WT_WOUNDEDLEG_REDUCT` in `weight_cap`;
  port `encumber_msg` (`game.oldcap`); `js/trap.js` await after
  `set_wounded_legs`; `js/allmain.js` preamble sync. Named omissions:
  other `encumber_msg` callers; Lev/air/steed MAX; `stagger()` poly;
  `heal_legs`; turn-loop encumber checks.
- **Verification:** seed0004 @27/@28 match; RNG **4087→4114**/12084;
  Scr still **29**/409 (next @29 caught-in-bear); green+strict PASS;
  cohort **23/23** PASS; seed0002 Scr 54 unchanged.
- **Next:** seed0004 @29 `You are caught in a bear trap.`; or seed0002
  eatcorpse.

## D-0399 — look_here observe_object before doname (gem color)

- **Symptom:** seed0004 first cell miss @26 — C `a yellow gem` /
  `Things that are here:` pile vs JS `a gem` (dknown=0).
- **Cause:** C `xname_flags` calls `observe_object` when
  `!Blind && !gd.distantname`; JS `xname`/`doname` omit that (named
  omission for distant_name / generic map glyphs). `see_nearby_objects`
  only observes pile-tops, so buried gems stay unseen until named.
- **C locus:** `objnam.c` `xname_flags` observe (~627–628);
  `invent.c` `look_here` → `doname`/`doname_with_price`.
- **Change:** `js/invent.js` `look_here` — `observe_object` before
  each `doname` (single + multi). Named omissions: blanket observe in
  `xname`/`doname`; `distant_name` / `gd.distantname`;
  `doname_with_price`.
- **Verification:** seed0004 Scr **28→29**/409 (gem @26 fixed; next
  @27 bear `--More--`); seed0002 Scr **50→54**/595; green+strict PASS;
  cohort 9/9 PASS; full sessions **25/44**, Scr **3983**/11405.
- **Next:** seed0004 @27 bear-trap `--More--`; or seed0002 eatcorpse.

## D-0398 — trapeffect_bear_trap + floor_trigger BEAR (seed0004 RNG)

- **Symptom:** seed0004 first RNG miss @4013 — C `d(2,4)` at
  `trapeffect_bear_trap` vs JS `rn2(5)` (dotrap escape / later path);
  selector returned Finished for BEAR_TRAP.
- **Cause:** JS omitted `trapeffect_bear_trap`; `floor_trigger` also
  lacked BEAR_TRAP (and LANDMINE/SLP/RUST/FIRE) vs C.
- **C locus:** `trap.c` `trapeffect_bear_trap` (~1479–1560),
  `floor_trigger`, `set_utrap`; `do.c` `set_wounded_legs`.
- **Change:** `js/trap.js` — port bear-trap hero+monster; wire
  selector; align `floor_trigger`; `set_utrap`/`reset_utrap`/
  `set_wounded_legs` helpers. Named omissions: `float_vs_flight`;
  `Yname2` iron-shoe text; `which_armor` shoes; full `body_part` poly.
- **Verification:** seed0004 RNG **4025→4087**/12084 (prefix ~4013→4039);
  Scr still **28**/409 (first cell miss @26 `a yellow gem` vs `a gem`);
  green+strict PASS; cohort seed1500/1800/0103/0012/0015/0200 PASS.
- **Next:** seed0004 @26 gem color in look_here/doname; or RNG @4039
  `dochug` wanderer `rn2(4)`.

## D-0397 — gd_move_cleanup parkguard + look-around Suddenly (seed0012 PASS)

- **Symptom:** seed0012 sole miss @307 — C
  `Suddenly, the guard disappears.--More--` (cursor on topline) vs JS blank
  then, after cleanup port, Suddenly without `--More--` (cursor on map).
- **Cause:** JS `gd_move` omitted C `!u_in_vault` look-around exit that
  sets `gddone` and calls `gd_move_cleanup` (park at `<0,0>`, restfakecorr,
  `Suddenly, %s disappears`). Early `gddone`/begone paths returned 0
  without cleanup. After pline, C capture blocks on `--More--`
  (`flush_topl_more` ≡ tty `display_nhwindow(WIN_MESSAGE)` when NEED_MORE).
- **C locus:** `vault.c` `gd_move_cleanup` / `parkguard` / `gd_move`
  look-around (~1078–1185); `do_name.c` `noit_mon_nam`.
- **Change:** `js/vault.js` — `parkguard`, `gd_move_cleanup`, look-around
  → cleanup; wire early/begone `gddone` to cleanup; `flush_topl_more`
  after Suddenly. Named omissions: `wallify_vault` body; corridor-
  disappears / encased; confused-disappears; Well begone verbalize;
  `gd_mv_monaway`.
- **Verification:** seed0012 Scr **307→308**/308 PASS; green+strict PASS;
  cohort **25/25** PASS (incl. seed0012).
- **Next:** seed0004 / seed0002 shared blockers.

## D-0394 — use_container outmaybe/yname + MENU_FULL put-in (seed0012 Scr 275→283)

- **Symptom:** seed0012 @259 C `Do what with your bag?` vs JS
  `the bag is empty.  Do what with…`; after prompt fix, @260 incomplete
  put-in category menu.
- **Cause:** (1) JS prompt used bare `outokay` while C uses
  `outmaybe = outokay || !cknown` and `yname`/`shk_your` (carried→your,
  floor→the). (2) `query_putin_category` was coins-only; C MENU_FULL
  `query_category` lists A/a/classes/BUCX/P; invent walk includes the
  open container (Tools/`X` from bag `!bknown`).
- **C locus:** `pickup.c` `use_container` (~3074–3094);
  `query_category` / `menu_loot` MENU_FULL; `objnam.c` `yname`;
  `shk.c` `shk_your`; `invent.c` `addinv` `pickup_prev` +
  `count_buc` goldX arm; `allmain.c` newgame `reset_justpicked`.
- **Change:** `js/pickup.js` outmaybe/`yname` prompts; MENU_FULL
  put-in category UI + ATR_INVERSE class headings; `pickup_prev` /
  `reset_justpicked`; `js/u_init.js` `addinv` sets `where`/`pickup_prev`;
  `js/allmain.js` newgame reset.
- **Verification:** seed0012 Scr **275→283**/308, cursors **305→307**/308;
  @259–261 match; first fail @278 bag `containing`; green+strict PASS;
  cohort smoke PASS; full sessions **24/44**, screens **3953**/11405.
- **Next:** seed0012 @278 doname container contents suffix.


## D-0396 — drop gold freeinv_core botl + gd_move Move along! (seed0012 Scr 284→307)

- **Symptom:** seed0012 first cell miss @284 — C botl `$:0` after
  `You drop 1163 gold pieces.` vs JS `$:1163`; NOTES had named @294
  `"Move along!"` (topline) but botl gold was the shared miss from 284.
- **Cause:** (1) C `freeinv_core` sets `disp.botl` for `COIN_CLASS`; JS
  `freeinv_drop` omitted botl and left `game._goldCount` stale (bot
  paints `$:` from that cache, not live `money_cnt`). (2) C `gd_move`
  um_dist `!rn2(10)` verbalize `"Move along!"` was deferred because
  `gd_move` was sync.
- **C locus:** `invent.c` `freeinv_core` (~1358); `vault.c` `gd_move`
  (~1066–1071); `monmove.c` `m_move` awaits specials.
- **Change:** `js/do.js` — gold drop decrements `_goldCount` +
  `flags.botl`; `js/vault.js` — async `gd_move` + `await verbalize`;
  `js/monmove.js` / `js/shk.js` await `gd_move`. Named omissions:
  `gd_move_cleanup` / Suddenly disappears; look-around exit;
  `sticks()` on ustuck.
- **Verification:** seed0012 Scr **284→307**/308; @284–294 match;
  sole miss @307 `Suddenly, the guard disappears.`; green+strict PASS;
  cohort **22/22** PASS.
- **Next:** seed0012 @307 `gd_move_cleanup` disappear pline.
- **Lesson:** when NOTES names a topline, still dump botl on the first
  cell-miss index — status `$:` can fail a long prefix of otherwise
  matching frames.

## D-0395 — doname containing + use_container cknown (seed0012 Scr 283→284)

- **Symptom:** seed0012 @278 C `j - a bag containing 1 item` vs JS
  `j - a bag` after gold put-in.
- **Cause:** (1) JS `doname` omitted `cknown && Has_contents` suffix
  (`count_contents` stacks). (2) C `use_container` containerdone sets
  `cknown=1` when `used` (put-in alone does not); JS left `cknown` 0.
- **C locus:** `objnam.c` `doname_base` (~1373);
  `invent.c` `count_contents` (~3620); `pickup.c` `use_container`
  containerdone (~3209).
- **Change:** `js/objnam.js` containing suffix; `js/invent.js`
  `count_contents` (shoppy `costly_spot` deferred); `js/pickup.js`
  `if (used) obj.cknown = 1`.
- **Verification:** seed0012 Scr **283→284**/308; @278 matches; first
  fail @294 `"Move along!"`; green+strict PASS; cohort PASS.
- **Next:** seed0012 @294 vault guard escort pline.


## Record format

Each entry should include:

- **Status:** open / parked / fixed / rejected hypothesis
- **Observed:** session, channel, first meaningful divergence
- **C locus:** file + function (line numbers optional and version-sensitive)
- **Cause/evidence:** why the diagnosis is established
- **Change:** JS semantic unit changed, without trace alignment
- **Verification:** focused, green, cohort, and full-run commands/results
- **General lesson:** only when reusable

Do not record a guessed cause as fixed merely because an RNG prefix moved.

## Index

The compact status table lives in **`DIVERGENCE-INDEX.md`**.
Open that file first; then jump to a single `## D-NNNN` entry below
(via search). Do **not** read this whole file by default.

## D-0393 — teleds materialize + gold disp.botl (seed0012 Scr 268→275)

- **Status:** fixed
- **Observed:** seed0012 @237 — C `You materialize in a different
  location!--More--` with `$:307` vs JS blank then later gold desync;
  after materialize pline alone, JS still showed `$:7` on More.
- **C locus:** `teleport.c` `teleds` — `TELEDS_TELEPORT` + `flags.verbose`
  materialize `You()` then `spoteffects(TRUE)`; `pickup.c`
  `pickup_object` sets `disp.botl` before gold `pick_obj`/`prinv` so
  the next `pline` `flush_screen` paints `$` before deferred `more()`.
- **Cause/evidence:** JS `teleds` placed the hero (somex/somey matched)
  but omitted materialize + landing `spoteffects`; gold botl was a
  named omission, so materialize `--More--` kept cached `$:7`.
- **Change:** async `teleds`/`vault_tele`/`tele_trap_once_vault` with
  materialize pline + `spoteffects(true)`; `pickup_object` gold
  `flags.botl`. Named omissions: ball/chain, swallow, vault_guard
  `uleftvault`, `switch_terrain`, `notice_mon_*`, `tele()` fallback.
- **Verification:** seed0012 Scr **268→275**/308; @237–258 match;
  first fail **@259** bag prompt; green+strict PASS; cohort 24/24 PASS.
- **Next:** seed0012 @259 empty-bag apply prompt order.

## D-0392 — stop_occupation / counted Ns search (seed0012 Scr 259→268)

- **Status:** fixed
- **Observed:** seed0012 @226 — C topline `You stop searching.` vs JS blank;
  @228 JS found passage while C still stopped.
- **C locus:** `allmain.c` `stop_occupation`; occupation path
  `monster_nearby`; `monmove.c` `dochugw` threat interrupt;
  `cmd.c` `set_occupation(dosearch,"searching",multi)` for counted `s`.
- **Cause/evidence:** JS used `_repeat_search` without occupation text and
  deferred `stop_occupation` / `dochugw` interrupt, so multi-search ran
  past a newly spotted hostile.
- **Change:** `js/hack.js` `stop_occupation`; `js/engrave.js`
  timed `set_occupation`; `js/cmd.js` counted `s` → occupation;
  `js/allmain.js` occupation `monster_nearby`; `js/monmove.js` `dochugw`
  threat stop. Named omissions: `maybe_finished_meal`/`reset_eat`;
  `onscary` body; other `stop_occupation` call sites (timeout/muse/…).
- **Verification:** seed0012 Scr **259→268**/308; @226–234 match; first
  fail **@237** materialize `--More--`; green+strict PASS; cohort 22/22
  PASS (+ green 2).
- **Next:** seed0012 @237 teleport/materialize pline.

## D-0391 — parse / get_count digit path (seed0012 Scr 257→259)

- **Status:** fixed
- **Observed:** seed0012 @221 — C still shows dust engraving topline after
  digit `9` of `9s`; JS blanked. `read_engr_at` already correct at @220
  (`You read: "?? a?r?r um"`).
- **C locus:** `cmd.c` `parse` / `get_count` — digits accumulate without
  `clear_nhwindow(WIN_MESSAGE)`; one clear after the command key returns.
- **Cause/evidence:** JS `rhack` cleared `_pending_message` on every key,
  including count digits, so the post-`9` input-boundary lost the prior
  pline. C keeps the message through get_count until parse clears once.
- **Change:** `js/cmd.js` `get_count` + parse-shaped `rhack(0)`;
  `js/display.js` `clear_nhwindow_message`. Named omissions: full
  `GC_*` flags / `LARGEST_INT` / `altmeta` count path; trailing +24 RNG
  log length after matched prefix (runner still 13878/13878).
- **Verification:** seed0012 Scr **257→259**/308; @220–222 match; first
  fail **@226** `You stop searching.`; green+strict PASS; cohort 24/24
  PASS.
- **Next:** seed0012 @226 counted-search stop pline / continue_search.

## D-0390 — getpos auto_describe TER_DETECT (seed0012 Scr 244→257)

- **Status:** fixed
- **Observed:** seed0012 @140–152 — C topline `unexplored area` /
  `small mimic, mimicking something` / `peaceful Adjama` vs JS stuck on
  getpos tip `(For instructions type a '?')  Move cursor to monster of
  interest:`. Map+cursors already matched; RNG prefix full.
- **C locus:** `getpos.c` `getpos` loop + `auto_describe` →
  `do_screen_description`/`lookat`; `pager.c` `lookat` unexplored +
  `look_at_monster`/`mhidden_description`; `do_name.c` `x_monnam` isshk
  → `shkname` via `distant_monnam`.
- **Cause/evidence:** JS `getpos` never ran C `auto_describe` after
  moves when `iflags.autodescribe`; tip/goal topline persisted.
  `distant_monnam_none` omitted shopkeeper `shkname`.
- **Change:** `js/getpos.js` msg_given/show_goal_msg + display-glyph
  auto_describe (blank→`unexplored area`, mon+mimic); `js/do_name.js`
  `distant_monnam_none` isshk→`shkname`. Named omissions: full
  `do_screen_description` symbol table, coord_desc, furniture mimic
  names, astral high-cleric.
- **Verification:** seed0012 Scr **244→257**/308; @140–153 match; first
  fail **@221** dust engraving; green+strict PASS; cohort 24/24 PASS.
- **Next:** seed0012 @221 `read_engr_at` / wipeout garbled dust text.

## D-0389 — `cls` / `clear_glyph_buffer` (seed0012 Scr 240→244)

- **Status:** fixed
- **Observed:** seed0012 @138 — C/J same topline
  `You sense the presence of monsters.--More--` but C map mostly blank
  (monsters+@ only) vs JS full dungeon still painted.
- **C locus:** `display.c` `cls` — `clear_nhwindow(WIN_MAP)` then
  `clear_glyph_buffer()` (gbuf → unexplored); `detect.c` `monster_detect`
  maps mons onto cleared buffer before `You("sense…")`/`more`.
- **Cause/evidence:** JS `cls` only called Terminal `clearScreen()`;
  `loc.disp_*` kept prior dungeon; `more`/`pline`→`flush_screen` rebuilt
  full map from stale `disp_ch`.
- **Change:** `js/display.js` `clear_glyph_buffer` + call from `cls`.
  Named omissions: TER_DETECT autodescribe (`unexplored area`).
- **Verification:** seed0012 Scr **240→244**/308; first fail **@140**;
  green+strict PASS; cohort 22/22 PASS; full sessions **24/44**, Scr
  **3914**/11405.
- **Next:** seed0012 @140 C `unexplored area` vs JS getpos tip.

## D-0388 — prinv total_of / gold merge (seed0012 Scr 239→240)

- **Status:** fixed
- **Observed:** seed0012 @99 — C `$ - 5 gold pieces (7 in total).` vs JS
  `$ - 7 gold pieces.`; RNG full; Scr 239/308.
- **C locus:** `invent.c` `prinv` — `total_of = (quan && quan < obj->quan)`;
  `xprname(..., !total_of, 0L, quan)` + verbose `" (%ld in total)."`;
  `pickup.c` `pickup_prinv` passes lifted `count` after `pick_obj` merge.
- **Cause/evidence:** JS `pickup_prinv` ignored count and named the
  post-merge stack; `xprname` lacked quan override.
- **Change:** `js/objnam.js` `xprname` quan; `js/invent.js` `prinv` +
  hold_another_object oquan; `js/pickup.js` `pickup_prinv` / out_container
  pre-merge count. Named omissions: encumbrance verb prefixes.
- **Verification:** seed0012 Scr **239→240**/308; @99 match; first fail
  @138; green+strict PASS; cohort 24/24 PASS.
- **Next:** seed0012 @138 monster-sense More map blanking.

## D-0387 — autopick end check_here (seed0012 Scr 236→239)

- **Status:** fixed
- **Observed:** seed0012 @75/@79 — C topline `You see here a statue of a
  newt.` / `You see here a sling.`; JS blank. RNG full; Scr 236/308.
- **C locus:** `pickup.c` `pickup` — after autopick `menu_pickup`, when
  `!u.uswallow`: `if (autopickup) check_here(n_picked > 0);` also
  pre-pick `nomul(0)` when `OBJ_AT && run && run!=8 && !nopick`.
- **Cause/evidence:** Session Options set `pickup_types` to `$"?!=/`;
  statue/sling ineligible for autopick. C still calls `check_here` so
  `look_here` plines remainders; JS returned after the filter/pick loop
  without `check_here` (only the `!flags.pickup` arm had it).
- **Change:** `js/pickup.js` `pickup` — after autopick loop always
  `check_here(nPicked>0)`; port run-stop `nomul` before pick. Named
  omissions: hideunder, newsym_force.
- **Verification:** seed0012 Scr **236→239**/308; @75/@79 match; green+
  strict PASS; cohort 22/22 PASS.
- **Next:** seed0012 @98 gold prinv `$ - 5 gold pieces (7 in total).`

## D-0386 — hilite_pile ATR_INVERSE on object piles (seed0012 Scr 199→236)

- **Status:** fixed
- **Observed:** seed0012 @70 after Options — C `%` food pile inverse+red
  vs JS red only; Scr 199/308. Pre-Options screens matched without
  inverse (hilite_pile off).
- **C locus:** `display.h` `obj_is_piletop`; `wintty.c` `tty_print_glyph`
  `(MG_OBJPILE && hilite_pile) && use_inverse` → `ATR_INVERSE`;
  `optlist.h` `use_inverse` default On, `hilite_pile` default Off.
- **Cause/evidence:** Options page 2 key `f` toggles `hilite_pile` `[ ]`
  → `[X]` (screens 67→69); dump @70 sole cell miss was attr on `%`.
  Not DEC vs Unicode (comparator equates SO/SI with Unicode walls).
- **Change:** `js/display.js` — `obj_is_piletop` + `obj_map_attr`; pass
  atr through `map_location`/`newsym` object paint and remembered pile
  redraw. Named omissions: MG_DETECT/BW_*/MG_FEMALE inverse; hilite_pet
  petattr branch.
- **Verification:** seed0012 Scr **199→236**; green+strict PASS; cohort
  24/24 PASS.
- **Next:** seed0012 @75 `You see here a statue of a newt.`

## D-0385 — doset_simple_menu from allopt[] (seed0012 Scr 187→199)

- **Status:** fixed
- **Observed:** seed0012 @58 `O` Options — hand-built corner stub vs C
  NHW_MENU; Scr 187/308.
- **C locus:** `options.c` `doset_simple` / `doset_simple_menu`;
  `windows.c` `choose_classes_menu`; `wintty.c` multipage `maxrow=lmax+1`
  → fullscreen; status blank after fullscreen clear until later `bot()`.
- **Cause/evidence:** dump screen 58 expected `General`/`Behavior` rows from
  `allopt[]` with `%-23s [%s]`; page 2 Map/Status; `o` → Autopickup menu.
- **Change:** extract `dosetSimpleOpts` + name width; port menu build +
  PICK_ONE paging; `choose_classes_menu` ATR_INVERSE + stay-open toggles;
  `clear_committed_status` across Options→submenu; `game.symset` for get_val.
- **Verification:** seed0012 Scr **187→199** cursors **297→302**; green+strict
  PASS; cohort seed1500/1800/0009 PASS.
- **General lesson:** multipage tty menus are fullscreen; do not docrt between
  PICK_ANY letter toggles; fullscreen menu clear leaves status blank.

## D-0384 — query_objlist INVORDER_SORT class headings (seed0012 Scr)

- **Status:** fixed
- **Observed:** seed0012 screen 43 — C `Pick up what?` / `Comestibles` /
  `a - a newt corpse` / `Tools` / `b - a bag`; JS flat `a`/`b` without
  headers; cursor row 4 vs 6.
- **Cause:** C `pickup` passes `INVORDER_SORT` when `flags.sortpack`;
  `query_objlist` emits `add_menu_heading(let_to_name(*pack))` per class
  and `end_menu` paints the prompt with menu_headings (ATR_INVERSE).
- **C locus:** `pickup.c` `query_objlist` (~1106–1143); `invent.c`
  `let_to_name`; `wintty.c` `tty_end_menu`.
- **Change:** `js/invent.js` export `let_to_name` / `DEF_INV_ORDER`;
  `js/pickup.js` `query_objlist_pickup` pack-order headers + prompt
  ATR_INVERSE; letters assigned in menu order. Named omissions:
  FEEL_COCKATRICE; within-class loot_xname; menu_head_objsym; count-N.
- **Verification:** Scr **185→187**/308; green+strict; cohort 22/22 PASS.
- **Next:** seed0012 @screen58 `O` Options menu geometry / missing rows.

## D-0383 — ice-box container_contents sortloot stacks (seed0012 Scr)

- **Status:** fixed
- **Observed:** seed0012 screen 31 — C `2 jackal corpses` / stacked
  lichen/newt lines vs JS one `doname` per cobj (`a newt corpse` first).
- **Cause:** C `mkbox_cnts`→`add_to_container` merges via `merged()`;
  corpse gender on `spe` (CORPSTAT_*) so same-species same-sex stacks;
  `container_contents` walks `sortloot(SORTLOOT_LOOT|PACK)` then `doname`.
- **C locus:** `mkobj.c` `add_to_container` / `mksobj` CORPSE spe+
  `set_corpsenm`; `end.c` `container_contents`; `invent.c` `sortloot`.
- **Change:** `js/mkobj.js` merge in `add_to_container` + corpse `spe`
  gender before `set_corpsenm`; `js/invent.js` `sortloot`/`loot_xname`;
  `js/objnam.js` `cxname_singular`/`corpse_xname`; `js/pickup.js`
  `container_contents` uses sortloot. Named omissions: sortloot
  subclass/disco/BUCX; nested containers; Schroedinger; shop price.
- **Verification:** Scr **184→185**/308 (screen 31 cells+cursor); RNG
  still full 13878; green held under later D-0384 verify.
- **Next:** pickup INVORDER_SORT (D-0384).

## D-0382 — in_or_out_menu prompt ATR_INVERSE + SELECTED `*` (seed0012 Scr)

- **Status:** fixed
- **Observed:** seed0012 screen 30 — cells matched text but prompt
  `attr:0` vs C `attr:1` (inverse); also default was `q - do nothing`
  vs C `q * do nothing`.
- **Cause:** C `tty_end_menu` paints prompt with `tty_menu_promptstyle`
  (= `menu_headings`, default ATR_INVERSE). `MENU_ITEMFLAGS_SELECTED`
  on the default choice makes `process_menu_window` replace `-` with `*`.
- **C locus:** `pickup.c` `in_or_out_menu`; `wintty.c` `tty_end_menu` /
  `process_menu_window` (n==2 && selected).
- **Change:** `js/pickup.js` `in_or_out_menu` — prompt `ATR_INVERSE`;
  `q * done|do nothing`. Named omissions: lootabc; more_containers `n`.
- **Verification:** Scr **182→184**/308 (screens 30+32); green+strict;
  cohort 22/22 PASS.
- **Next:** seed0012 @screen31 `container_contents` / `sortloot` stacks.

## D-0381 — use_container locked Hmmm pline (seed0012 Scr)

- **Status:** fixed
- **Observed:** seed0012 screen after welcome — C
  `Hmmm, the chest turns out to be locked.` vs JS `the chest is locked.`
- **Cause:** `use_container` always printed bare locked string and set
  `lknown` before the check; C branches on `lknown` and uses
  `the(xname)` / `The(xname)`.
- **C locus:** `pickup.c` `use_container` (~2097–2110).
- **Change:** `js/pickup.js` — lknown vs Hmmm pline; set `lknown` after.
  Autounlock still deferred.
- **Verification:** Scr **181→182**/308; green+strict; cohort seed0200 PASS.
- **Next:** seed0012 @screen30 ice-box menu.

## D-0380 — SPELL_LEV_PW after num_spells (seed0012 Scr)

- **Status:** fixed
- **Observed:** seed0012 welcome botl Pw:4(4) vs C Pw:5(5) after chargen
  menus matched.
- **Cause:** Monk starts with a spellbook → `initialspell` → `num_spells()>0`
  but JS skipped C’s `SPELL_LEV_PW(1)` floor in `u_init_skills_discoveries`.
- **Rejected:** treating clear_fcorr/blackout as the first screen root
  (map glyphs already matched via DEC comparator).
- **C locus:** `u_init.c` `u_init_skills_discoveries`; `spell.h`
  `SPELL_LEV_PW`.
- **Change:** `js/u_init.js` bump `uen`/`uenmax`/`uenpeak`/`ueninc`;
  export `num_spells`/`SPELL_LEV_PW` from `spell.js`. Also ported
  `clear_fcorr` `blackout`/`map_location`/`deltrap`/`del_engr_at`
  (faithful; not the Scr win).
- **Verification:** Scr **17→181**/308; green+strict; cohort **24/24**;
  full suite Scr **3640→3845**.
- **Next:** locked-chest pline (D-0381).

## D-0379 — maybe_skip_seps compatible-role count (seed0012 Scr)

- **Status:** fixed
- **Observed:** seed0012 chargen role menus after align/gender/race filter —
  JS missing blank between `* * Random` and `/ - Pick race first`; cursor
  one row high.
- **Cause:** JS `maybe_skip_seps` used `roles.length` so excess was always
  1 on 24-row tty; C counts only `ok_role`/`ok_race`/`ok_gend`/`ok_align`
  roles. Filtered menus have excess 0 → keep blank.
- **C locus:** `role.c` `maybe_skip_seps` / `plsel_startmenu` / role menu
  separator after `ROLE_RANDOM`.
- **Change:** `js/player_selection.js` — faithful `maybe_skip_seps`; omit
  header blank only when excess==2.
- **Verification:** Scr **14→17**/308; seed0077 still PASS; green+strict.
- **Next:** welcome Pw (D-0380).

## D-0378 — clear_fcorr / restfakecorr (seed0012 @13700)

- **Status:** fixed
- **Observed:** seed0012 @13700 — C `move_special` `rn2(1)` (satdoor mill)
  vs JS `distfleeck` `rn2(5)`. Hero JS `(70,12)` not `onlineu` with shop
  `(11,11)`; C hero still online after corridor walk.
- **Cause:** Symptom looked like shop/priest mill. Root: after vault dig
  escort, C `gd_move` calls `restfakecorr`→`clear_fcorr` on the um_dist
  `rn2(10)` branch and after each dig step, restoring fakecorr cells
  (vault door `(71,13)` → wall). JS burned `rn2(10)` only and left the
  door as `DOOR`/`D_NODOOR`, so step 295 `l` walked east onto `(71,13)`
  while C stayed put — cursor/path desync → later shk `!onlineu`.
- **Rejected:** porting `pri_move` altar `rn1` mill (no `rn2(3)` before
  the mismatch); patching shk `onlineu` without hero-path proof.
- **C locus:** `vault.c` `clear_fcorr` / `restfakecorr`; `gd_move`
  um_dist branch (~1066–1073) + post-dig (~1199).
- **Change:** `js/vault.js` — `clear_fcorr` (restore typ/flags, couldsee
  gate, recalc_block_point, vision_full_recalc) + `restfakecorr`
  (mongone on full clear); call from um_dist branch and after dig move.
  Named omissions: Punished/uball; yelp/rloc/limbo; deltrap/blackout/
  del_engr; corridor-disappears/encased pline; `gd_move_cleanup`/
  parkguard/wallify; verbalize "Move along!".
- **Verification:** first mismatch **13700→13878** (full C RNG log);
  runner RNG **13754→13878**/13878 cursors **279→291**/308; green+strict
  PASS; cohort **24/24**. Screens still **14**/308 (glyph/memory).
- **Lesson:** when post-vault hero path diverges on a cardinal step with
  0 RNG, diff terrain at the destination — unrestored fakecorr doors
  read as open while C already wallified them.
- **Next:** seed0012 screen/vision after clear_fcorr, or seed0004/0002.

## D-0377 — gd_move dig while-loop wall→ortho redirect (seed0012 @13576)

- **Status:** fixed
- **Observed:** seed0012 @13576 — C `dog_move` `rn2(1)` vs JS `rn2(4)`
  (`dog_goal` `IS_ROOM` follow).
- **Cause:** Symptom was pet `dog_goal` consuming `rn2(4)` because hero
  stood on ROOM after a desynced path. Root: JS `gd_move` dug only the
  primary step cell. From vault door (71,13) toward dest (64,5), primary
  step hit TLCORNER (71,12); C's while-loop redirects west onto STONE
  (70,13)→CORR. JS converted (71,12) alone, left (70,13) STONE, so the
  second `h` failed and hero/cursor desynced; later dog_goal saw ROOM.
- **Rejected:** bare dog_move cand arity; patching `IS_ROOM`/`rn2(4)`
  without hero-path proof; inventing corridor at recorded coords.
- **C locus:** `vault.c` `gd_move` nextpos while-loop (~1111–1155);
  `find_guard_dest` `goto incr_radius`; um_dist `!rn2(10)`.
- **Change:** `js/vault.js` — port dig while-loop (wall→DOOR if beyond
  ROOM, else ortho redirect, else STONE→CORR); `find_guard_dest`
  approachability failure abandons dd ring; um_dist `rn2(10)` gate.
  Named omissions: restfakecorr/clear_fcorr/mongone; verbalize body;
  !u_in_vault look-around; gd_mv_monaway; mpickgold; del_engr_at.
- **Verification:** first mismatch **13576→13700**; runner RNG
  **13635→13754**/13878 cursors **270→279**/308; green+strict PASS;
  cohort **22/22** (+ green).
- **Lesson:** when dog_goal/IS_ROOM appears right after vault escort,
  diff hero vs C cursor on the preceding `h`/`j` keys — failed walks
  into undug STONE are guard dig bugs, not pet AI.
- **Next:** seed0012 @13700 C `move_special` `rn2(1)` vs JS `rn2(5)`.

## D-0376 — bag put-in stub leaked `\n` rush-south (seed0012 @13517)

- **Status:** fixed
- **Observed:** seed0012 @13517 — C `move_special` `rn2(1)` (satdoor mill)
  vs JS `rn2(5)` (`distfleeck`).
- **Cause:** After mill ~11069→(11,12), JS shk stuck `!onlineu` while C
  returned home (no-RNG `appr=1`) once hero shared a row/col/diag. Root was
  hero `uy+1` after vault bag sequence `aji$\r$\r`: C **put gold into** the
  bag (`in_container`); JS stubbed put-in so leftover `\r`→LF (`C('j')`)
  reached `rhack` as rush-south. Hero path then missed the earlier
  `onlineu(11,12)` window; at @13517 JS still off-home `appr=1` while C
  milled satdoor.
- **Rejected:** `move_special` cand-count / satdoor arity; fleeck-first;
  inventing `onlineu` gates; patching mill without hero-path proof.
- **C locus:** `pickup.c` `use_container`/`in_or_out_menu`/`menu_loot`/
  `in_container`/`query_category`; `jsmain` CR→LF; `cmd.c` `C('j')` rush;
  symptom `shk.c` `shk_move`/`onlineu`.
- **Change:** `js/pickup.js` — MENU_FULL coins `query_putin_category` +
  `menu_loot_putin` + `in_container` (`add_to_container`); wire `'i'`/`'b'`.
  Named omissions: non-coin categories; unpaid/BUCX/ALL; autopick; stash;
  `'r'` reversed; mbag explosion; worn-mask detail.
- **Verification:** first mismatch **13517→13576**; runner RNG
  **13591→13635**/13878 cursors **259→270**/308; green+strict PASS;
  cohort **22/22** (+ green).
- **Lesson:** when Enter/`\n` appears after a stubbed menu path, check
  whether C consumed it inside `getobj`/container UI — leaked LF is
  rush-south under `!number_pad`, not a monster-AI bug.
- **Next:** seed0012 @13576 C `dog_move` `rn2(1)` vs JS `rn2(4)`.

## D-0375 — apply bag take-out + gd_move escort (seed0012 @13392)

- **Status:** fixed
- **Observed:** seed0012 @13392 — C `distfleeck` `rn2(5)` vs JS `rn2(7)`
  (`do_attack` safemon after wipe).
- **Cause:** JS `getobj_apply` treated `?`/`*` as Never mind, so
  `a?jo$\r` (apply bag → take out gold) never ran; keys desynced and
  later `h` attacked the still-adjacent guard. After bag/drop fixed,
  stub `gd_move` also left the guard unmoved (C digs/steps corridor
  without RNG when adjacent and gold dropped).
- **Rejected:** fleeck arity / fmon order alone; seed-shaped gd_move.
- **C locus:** `invent.c` `display_pickinv`/`getobj`; `apply.c`
  `use_container`; `pickup.c` `out_container`/`menu_loot`/
  `in_or_out_menu`; `vault.c` `gd_move`/`hidden_gold`; `mkobj.c`
  `obj_extract_self` OBJ_CONTAINED.
- **Change:** `display_pickinv_reply`; sack `doapply`→`use_container`
  take-out; `hidden_gold`/`contained_gold`; OBJ_CONTAINED extract;
  peaceful `gd_move` corridor step. Named omissions: put-in/stash/
  both; MENU_FULL category; hostile gd_move; restfakecorr/cleanup;
  containing-N doname suffix.
- **Verification:** first mismatch **13392→13517**; runner RNG
  **13430→13591**/13878 cursors **254→259**/308; green+strict PASS;
  cohort **24/24**.
- **Lesson:** when C shows fleeck after wipe but JS shows hero
  `do_attack` `rn2(7)`, diff the intervening keys — getobj `?` cancel
  is a silent desync before any mon AI.
- **Next:** seed0012 @13517 C `move_special` `rn2(1)` vs JS `rn2(5)`.

## D-0374 — `invault` / vault guard spawn (seed0012 @13287)

- **Status:** fixed
- **Observed:** seed0012 @13287 — C `next_ident` `rnd(2)` (`mkobj.c:521` via
  `makemon(PM_GUARD)`) vs JS EOT `wipe_engr` `rn2(94)`.
- **Cause:** JS `allmain` omitted `invault()`; after D-0373 `vault_tele`,
  `teleds` also skipped `urooms` refresh so even a stub timer would reset.
  C increments `u.uinvault` for 30 turns then spawns the guard before
  `u_wipe_engr`.
- **Rejected:** extending wipe_engr stub; seed-shaped timer gates.
- **C locus:** `vault.c` `invault` / `find_guard_dest` / `vault_occupied` /
  `findgd` / `newegd`; `allmain.c` call site; `makemon.c` `m_initweap` /
  `m_initinv` mercenary arms; `teleport.c` `teleds`→`spoteffects` urooms.
- **Change:** `js/vault.js` — `invault` (timer + spawn + getlin + fakecorr
  door); `js/allmain.js` — `await invault()` after `exerchk`;
  `js/teleport.js` — `teleds` sync `in_rooms` → `urooms`; `js/makemon.js` —
  `MM_EGD`/`newegd` + S_HUMAN mercenary `m_initweap` + armor/whistle
  `m_initinv`; `js/sounds.js` imports shared `vault_occupied`/`findgd`.
  Named omissions: full `gd_move` / `uleftvault` / migrating findgd;
  `spoteffects` pickup/dotrap after teleds; elf/priest/guardian weap arms;
  Croesus angry `mon_wield`; `fracture_rock`; `xy_set_wall_state`.
- **Verification:** first mismatch **13287→13392**; runner RNG
  **13295→13430**/13878 cursors **244→254**/308; green+strict PASS;
  cohort **24/24**.
- **Lesson:** vault occupancy requires `urooms` after teleport, not only
  the `invault` body — `teleds` without `move_update` silently zeroes the
  guard timer every EOT.
- **Next:** seed0012 @13392 C `distfleeck` `rn2(5)` vs JS `rn2(7)` (guard
  on fmon; `gd_move` stub).

## D-0373 — `vault_tele` / `tele_trap` once TELEP (seed0012 @12489)

- **Status:** fixed
- **Observed:** seed0012 @12489 — C `somex` `rn2(2)` (`mkroom.c:668`) vs
  JS `distfleeck` `rn2(5)`.
- **Cause:** hero stood on vault niche `TELEP_TRAP` (`once`, 41,0). C
  `spoteffects`→`dotrap`→`tele_trap`→`vault_tele`→`somexyspace` into the
  2×2 VAULT. JS `trapeffect_selector` omitted TELEP (default no-op), so
  the hero never left the trap cell and the next monster tick fleecked.
- **Rejected:** monster `mvault_tele` before fleeck (no mon on TELEP;
  traps present but hero occupancy was the smoking gun).
- **C locus:** `teleport.c` `vault_tele` / `tele_trap`; `trap.c`
  `trapeffect_telep_trap`.
- **Change:** `js/teleport.js` — `vault_tele`/`teleds`/`tele_trap_once_vault`
  + `mtele_trap`/`mvault_tele`/`rloc` subset; `js/trap.js` —
  `trapeffect_telep_trap` hero once→deltrap+vault_tele and mon path.
  Named omissions: Antimagic wrenching pline; hero teledest/`tele()`;
  `tele_jump_ok`/`in_out_region`; ball/chain `teleds`; full `rloc`
  wizard/shop arms; `invault` still absent from `allmain`.
- **Verification:** first mismatch **12489→13287**; runner RNG
  **12608→13295**/13878 cursors **227→244**/308; green+strict PASS;
  cohort **24/24**.
- **Lesson:** when C shows `somex`/`somey` on a 2×2 VAULT after EOT wipe
  and before fleeck, check whether the *hero* just stepped a `once`
  TELEP during `rhack` — DIAG hero cell == trap cell.
- **Next:** seed0012 @13287 C `invault` `makemon` `next_ident` vs JS
  `wipe_engr` `rn2(94)`.

## D-0372 — `domove` attack before `test_move` (seed0012 @12439)

- **Status:** fixed
- **Observed:** seed0012 @12439 — C `gethungry` `rn2(20)` (via
  `overexertion`/`hitum`) vs JS `distfleeck` `rn2(5)`.
- **Cause:** JS `domove` ran diagonal intact-doorway bans (`testdiag` /
  out-of-doorway) **before** `m_at`/`do_attack`. Hero stood in a
  `DOOR`+`D_CLOSED` cell; `b` toward hostile on ROOM was refused with
  `move=0`, so monsters moved instead of melee. C `domove_core` attacks
  first, then `test_move`.
- **Rejected:** leftover vomit `multi`; `umovement`/`gethungry` arity;
  Unaware metabolic gate (EOT matched through wipe_engr).
- **C locus:** `hack.c` `domove_core` (`m_at` → `domove_attackmon_at`
  before `test_move`).
- **Change:** `js/cmd.js` `domove` — attack (and F-empty) before
  closed_door / testdiag / blocksMove; safemon swap after test_move.
  Named omissions: run-into-visible stop; displacer; bump_mon;
  mundetected Wait!.
- **Verification:** first mismatch **12439→12489**; runner RNG
  **12505→12608**/13878 cursors **226→227**/308; green+strict PASS;
  cohort **22/22** (+ green = prior PASS set).
- **Lesson:** doorway `test_move` bans are for *moving*, not for
  suppressing adjacent melee — falsify with hero-on-DOOR + diagonal
  attack before chasing hunger RNG.
- **Next:** seed0012 @12489 C `somex` `rn2(2)` vs JS `rn2(5)`.

## D-0371 — `drinkfountain` case 20 `vomit`/`nomul(-2)` (seed0012 @8802)

- **Status:** fixed
- **Observed:** seed0012 @8802 — C `dog_goal` `rn2(4)` vs JS `rn2(12)`.
  DIAG: JS hero on DOOR (69,3) `!IS_ROOM` (skips rn2(4)); C still in
  ROOM. Hero had walked during the foul-fountain turn window.
- **Cause:** JS deferred `vomit()` after foul water. C `eat.c` `vomit`
  does `nomul(-2)` + `You can move again`, so the hero stays on the
  fountain (ROOM) through two paralyzed turns. Without it, JS kept
  accepting move keys and stepped onto a doorway → spurious dog_goal
  arity miss.
- **Rejected:** door typ/doormask mismatch at (69,3) as root; TER_DETECT
  autodescribe sticky topline as the @8802 cause (position matched C
  screens; immobilization did not).
- **C locus:** `fountain.c` case 20; `eat.c` `vomit` (`nomul(-2)` when
  `multi >= -2`).
- **Change:** port `vomit()` nomul arm; wire `drinkfountain` case 20.
  Named omissions: cantvomit; Sick cure; FAINTING dry-heave; poly acid
  breath.
- **Verification:** first mismatch **8802→12439**; runner RNG
  **9447→12505**/13878 cursors **186→226**/308; green+strict PASS;
  cohort **24/24**; full suite still **24/44**, RNG aggregate
  **253036**/792838.
- **Lesson:** missing `nomul` looks like late `dog_goal`/`IS_ROOM`
  desync; falsify with fountain foul + “You can move again” before
  chasing terrain at the mismatch cell.
- **Next:** seed0012 @12439 C `gethungry` `rn2(20)` vs JS `rn2(5)`.

## D-0370 — `drinkfountain` case 26 `monster_detect` (seed0012 @8384)

- **Status:** fixed
- **Observed:** seed0012 @8384 — C `dog_move` mtrack `rn2(8)` vs JS
  `dog_goal` `rn2(4)`. NOTES guessed uncursedcnt/mtrack `k−j`; DIAG
  showed JS extra follow-player `rn2(4)` while C already in candidates.
- **Cause:** earlier @8346 fountain `rnd(30)=26` (See Monsters). C
  `monster_detect` → sense `--More--` → getpos tip → `B`/`H` farlook.
  JS deferred detect, only `exercise`+`dryup`, so the same keys were
  real run/move and hero terrain/`IS_ROOM` desynced → spurious
  `dog_goal` `rn2(4)`.
- **Rejected:** mtrack `uncursedcnt`/`j` as the @8384 root (symptom of
  position desync after missed detect UI).
- **C locus:** `fountain.c` `drinkfountain` case 26; `detect.c`
  `monster_detect` / `map_monst` / `browse_map`.
- **Change:** port `monster_detect` (array `fmon`, cls, map_monst,
  sense+`flush_topl_more`, `browse_map(TER_DETECT|TER_MON)`);
  wire case 26. Named omissions: strange_feeling; cursed wake;
  blessed WIN_MAP; unconstrain; worm segs; pet/detected glyphs;
  TER_DETECT autodescribe text.
- **Verification:** first mismatch **8384→8802**; runner RNG
  **8944→9447**/13878 cursors **128→186**/308; green+strict PASS;
  cohort **24/24**.
- **Lesson:** missing detect/getpos looks like late `dog_goal`/`mtrack`
  arity; falsify with fountain topline before chasing pet RNG.
- **Next:** seed0012 @8802 C `dog_goal` `rn2(4)` vs JS `rn2(12)`.

## D-0369 — `dochug` pre-move `wipe_engr_at` (seed0012 @7312)

- **Status:** fixed
- **Observed:** seed0012 @7312 — C `wipeout_text` `rn2(11)` / `rn2(4)`
  vs JS `distfleeck` `rn2(5)`. Matching prior call was moveloop
  `rn2(40+DEX*3)` (failed gate).
- **Cause:** C `dochug` calls `wipe_engr_at(mx,my,1,FALSE)` after the
  sleep/wake gate and before `set_apparxy`/`distfleeck`. JS skipped that
  wipe, so a mon standing on a length-11 dust engraving never rolled
  wipeout RNG before fleeck.
- **Rejected:** allmain `u_wipe_engr` as the @7312 caller (gate returned
  non-zero); engraving-presence / fleeck-order as root without the
  missing `dochug` wipe.
- **C locus:** `monmove.c` `dochug` (wipe after wake, before apparxy);
  `engrave.c` `wipe_engr_at` / `wipeout_text`.
- **Change:** call `wipe_engr_at(mtmp.mx, mtmp.my, 1, false)` in JS
  `dochug` at the C site. Named deferrals: mconf/mstun/flee-teleport /
  m_respond / courage between wipe and apparxy; allmain `u_wipe_engr`
  still consumes `rnd(3)` only.
- **Verification:** first mismatch **7312→8384**; runner RNG
  **7558→8944**/13878 Scr 14/308; green+strict PASS; cohort **24/24**.
- **Lesson:** awake monsters always dust-wipe underfoot before fleeck;
  missing that looks like “fleeck too early” vs wipeout.
- **Next:** seed0012 @8384 C `dog_move` mtrack `rn2(8)` vs JS `rn2(4)`.

## D-0368 — `doset_simple` / `dotogglepickup` / `autopick_testobj` (seed0012 @7288)

- **Status:** fixed
- **Observed:** seed0012 @7288 — C `dog_move` approach `rn2(1)` vs JS
  second `obj_resists` (`rn2(100)`). After matching CORPSE `dogfood`, JS
  also scanned floor `GOLD_PIECE` at (43,3).
- **Cause:** session sets `pickup_types=$"?!=/` via `O`→`o` and toggles
  `@` ON before stepping on that gold (`$:2`→`$:7`). JS had unbound `O`/`@`
  and no `autopick` filter, so gold stayed on `fobj` and `dog_goal` rolled
  an extra `obj_resists`.
- **Rejected:** invent/fobj identity leak; blaming `dog_move` approach;
  wantdoor/track (already D-0367).
- **C locus:** `options.c` `doset_simple` / `dotogglepickup` /
  `optfn_pickup_types`; `windows.c` `choose_classes_menu`; `pickup.c`
  `autopick` / `autopick_testobj`; `cmd.c` `O`/`@` binds.
- **Change:** bind `O`→`doset_simple` (Behavior/Map page subset) and
  `@`→`dotogglepickup`; `choose_classes_menu` PICK_ANY; `pickup(what>0)`
  filters via `autopick_testobj` on symbol `pickup_types`.
- **Verification:** first mismatch **7288→7312**; runner RNG
  **7495→7558**/13878 Scr 14/308; green+strict PASS; cohort **22/22**.
- **Lesson:** late pet `obj_resists` extras often mean hero never
  autopicked an ordinary floor object after Options/`@`.
- **Next:** seed0012 @7312 C `wipeout_text` vs JS `distfleeck`.

## D-0367 — `save_track` / `rest_track` (seed0012 @6952)

- **Status:** fixed
- **Observed:** seed0012 @6952 — after D-0366 return visit, C `dog_move`
  `rn2(12)` then `rn2(1)` vs JS `rn2(1)` then `rn2(12)` (approach selection).
- **JS state:** pet `(55,16)` vault, hero `(62,15)` CORR, `couldsee=false`,
  `gettrack=null`, wantdoor `gg=(62,16)` (corridor LOS through east
  `D_NODOOR`); C arity ≡ `gg≈(56,17)` (force → prefix 6965).
- **Cause:** `goto_level` wiped `utrack` via `initrack` and never restored
  it. C `savelev`→`save_track` / `getlev`→`rest_track` keeps per-level
  hero footsteps; after `<` return, pet `dog_goal` `gettrack` finds an
  adjacent pre-leave cell (`≈(56,17)`) instead of wantdoor into the
  corridor.
- **Rejected:** approach short-circuit with same gg; inject `(54,17)`;
  skip-only `(55,17)`; closed-east door as sole cause (wrong gg family);
  food/APPORT goal (empty nearby `fobj`).
- **C locus:** `track.c` `save_track` / `rest_track`; `save.c` /
  `restore.c`; `dogmove.c` `dog_goal` gettrack before wantdoor.
- **Change:** in-memory `save_track`/`rest_track` on `goto_level` stash;
  store `track` snap with level_info; restore on getlev arm.
- **Verification:** first mismatch **6952→7288**; runner RNG
  **7202→7495**/13878 Scr 14/308; green+strict PASS; cohort **24/24**.
- **Lesson:** return-visit peel that looks like wantdoor/vision is often
  missing `rest_track`; wipe-only `initrack` is not C savelev.
- **Next:** seed0012 @7288 C `dog_move` `rn2(1)` vs JS `obj_resists`.

## D-0366 — `doup` + in-memory `getlev` hide `rnd(10)` (seed0012 @6924)

- **Status:** fixed
- **Observed:** seed0012 @6924 — C `getlev` `rnd(10)` on `<` (return to
  Dlvl1) vs JS `distfleeck` `rn2(5)`. C step100 RNG was solely that call.
- **C locus:** `do.c` `doup` / `dungeon.c` `prev_level` / `do.c`
  `goto_level` restore arm / `restore.c` `getlev` hide_monst `rnd(10)`.
- **Cause:** `<` unbound in `rhack` → “Unknown command” (no turn); session
  space then rested while C restored the stashed level and rolled
  per-monster hide chance. JS `goto_level` also treated return visits as
  regenerate (`mklev`) and used wrong `LFILE_EXISTS` bit (`2` vs `0x04`).
- **Change:** `doup`/`prev_level`; `<` bind; leave stash with
  `VISITED|LFILE_EXISTS` + `omoves`; restore + `mon_catchup_elapsed_time`
  + `hide_monst` gate; climb-up pline. Deferred: binary NHFILE, restrap/
  hideunder bodies, ledger-1 escape yn, Flying/Punished climb variants.
- **Verification:** first mismatch **6924→6952**; runner RNG
  **7052→7202**/13878 Scr 14/308; green+strict PASS; cohort **24/24**.
- **Lesson:** missing stair command looks like mid-level fleeck drift;
  return visits need getlev RNG even with in-memory stash.
- **Next:** seed0012 @6952 C `dog_move` `rn2(12)` vs JS `rn2(1)`.

## D-0365 — multi `,` `query_objlist` PICK_ANY (seed0012 @3483)

- **Status:** fixed
- **Observed:** seed0012 @3483 — C `obj_resists` (dog_goal invent scan)
  vs JS `rn2(3)` (dog_move approach). Two matched resists then diverge.
- **C locus:** `pickup.c` `pickup` / `query_objlist` PICK_ANY; `hack.c`
  `dopickup`.
- **Cause:** hero on CORPSE+SACK pressed `,` `b` `\r` `n`. JS multi-object
  path only plined “several objects here” and returned without a menu, so
  `b`/`\n`/`n` leaked into `rhack` as movement (`\r`→LF = C('j') rush-south
  via jsmain ICRNL). Hero walked to (16,8); pet stayed at (14,7); `udist>1`
  + CORR skipped invent `dogfood`/`obj_resists`. C’s menu consumed those
  keys; hero stayed adjacent → invent scan (11 resists). Rejected: missing
  in-bbox fobj; invent-gate bug in `dog_goal` itself.
- **Change:** `js/pickup.js` — `query_objlist_pickup` letter-toggle PICK_ANY
  + `pickup_object` each selection. Deferred: traditional `query_classes`,
  FEEL_COCKATRICE, INVORDER_SORT, count-N.
- **Verification:** seed0012 first mismatch **3483→6924**; runner RNG
  **3638→7052**/13878 Scr 14/308; green+strict PASS; cohort **24/24**
  PASS (incl. seed0009).
- **Lesson:** a stubbed interactive command that returns without consuming
  its follow-up keys desyncs hero position; later pet RNG looks like AI
  divergence.
- **Next:** seed0012 @6924 C `getlev` `rnd(10)` vs JS fleeck.

## D-0364 — `dog_nutrition` table `oc_delay` (seed0012 @3248)

- **Status:** fixed
- **Observed:** seed0012 @3248 — C `distfleeck` `rn2(5)` vs JS `rn2(100)`
  (`obj_resists`). Prefix matched through pet fleeck @3247.
- **C locus:** `dogmove.c` `dog_nutrition` / `dog_eat`; `monmove.c` `m_move`
  meating countdown before `dog_move`.
- **Cause:** after killing, pet ate floor `TRIPE_RATION`. JS
  `dog_nutrition` read `obj.oc_delay` / `obj.oc_nutrition` on the
  *instance* (undefined → `meating=1`, `nutrit=0`). C uses
  `objects[otyp].oc_delay` (**2** for tripe) + `oc_nutrition` (200) ×
  MZ_SMALL (**×6**). JS meating expired immediately → `dog_goal`
  scanned CHEST/STATUE/CORPSE/ICE_BOX while C was still meating
  (fleeck + post-move fleeck only). Rejected: fleeck arity; missing
  fobj in C (C burns 4× `obj_resists` later @3261).
- **Change:** `js/dogmove.js` `dog_nutrition` — table `oc_delay`;
  FOOD nutrition map + msize multipliers; non-food `owt/20+1`; coin arm.
  Deferred: `oeaten`/`eaten_stat`; extractor `oc_nutrition` field.
- **Verification:** seed0012 first mismatch **3248→3483**; runner RNG
  **3304→3638**/13878 Scr 14/308; green+strict PASS; cohort **24/24**
  PASS (incl. seed0009).
- **Lesson:** pet “extra fobj scan” after a matched fleeck is often
  missing meating — check the prior `dog_eat` nutrition source
  (`objects[]` vs instance).
- **Next:** seed0012 @3483 C continues `obj_resists` vs JS `rn2(3)`
  (`dog_move` approach) — fewer in-bbox fobj for JS or earlier scan exit.

## D-0363 — `hmon` `dbon` / `weapon_dam_bonus` dmg_recalc (seed0012 @3204)

- **Status:** fixed
- **Observed:** seed0012 @3204 — C `xkilled` `rn2(6)` vs JS `rn2(25)`
  (`known_hitum` flee). Prefix matched through barehands `rnd(4)=2` and
  stagger `rnd(100)=83`.
- **C locus:** `weapon.c` `dbon` / `weapon_dam_bonus`; `uhitm.c`
  `hmon_hitmon_dmg_recalc` (before stagger / `mhp -= dmg`).
- **Cause:** JS `hmon` added only `udaminc` and stubbed dbon/skill as 0.
  Monk Basic martial arts is **+3** damage, so C dealt ~5 and killed while
  JS dealt 2 and the mon survived into flee `rn2(25)`.
- **Change:** `js/weapon.js` `dbon` + `weapon_dam_bonus` + `use_skill`;
  `js/uhitm.js` `hmon_hitmon_dmg_recalc` wired before stagger. Deferred:
  `special_dmgval` gloves/silver; PROJECTILE→launcher skillwep;
  may-advance msg.
- **Verification:** seed0012 first mismatch **3204→3248**; runner RNG
  **3255→3304**/13878 Scr 14/308; green+strict PASS; cohort 22/22 PASS
  (incl. seed0009).
- **Lesson:** after matching barehands/stagger RNG, compare pending
  damage arithmetic — flee `rn2(25)` means the mon lived.
- **Next:** seed0012 @3248 C `distfleeck` `rn2(5)` vs JS `rn2(100)`.

## D-0362 — `#loot` / `use_container` `:` look (seed0012 @3152)

- **Status:** fixed
- **Observed:** seed0012 @3152 — C `dog_move` `rn2(1)` vs JS `rn2(3)`.
  DIAG: same food goal; JS hero at (4,6) occupied the equal-distance
  mfndpos cell that C still had free at (3,5). Spurious JS `n` move
  ran before pet turn because `#l`→loot was unknown in EXT_CMDS.
- **C locus:** `pickup.c` `doloot`/`doloot_core`/`use_container`;
  `end.c` `container_contents`; `getline`/`cmd` `#loot` autocomplete
  (session screens: `# loot`, `Do what with the ice box?`, contents, ESC).
- **Cause:** JS EXT_CMD_AC listed `loot` but EXT_CMDS had no runnable
  body → `#l\r` printed unknown and left `:`/`ESC`/`n` to rhack. C ran
  real loot (`:` sets `cknown` + ECMD_TIME), then monsters, then `n`.
- **Change:** `js/pickup.js` `doloot`/`use_container`/`container_contents`
  (unlocked floor container; `:` look + ESC/q); `js/getline.js` EXT_CMDS
  `loot` → `doloot`. Deferred: in/out/stash/both, traps, multi-cont,
  directional lootmon, capacity/confusion.
- **Verification:** seed0012 first mismatch **3152→3204** (`xkilled`);
  runner RNG **3255**/13878 Scr **14**/308; green+strict PASS; cohort
  24/24 PASS (incl. seed0009).
- **Lesson:** “dog_move rn2(1) vs rn2(3)” was hero-cell occupancy from
  a missed timed `#loot`, not approach-selection math.
- **Next:** seed0012 @3204 C `xkilled` `rn2(6)` vs JS `rn2(25)`.

## D-0361 — `mkbox_cnts` ICE_BOX must `mksobj(CORPSE)` (not boxiprobs)

- **Status:** fixed
- **Observed:** seed0012 first RNG miss @1245 — C `rnd(2)` `next_ident`
  vs JS `rnd(100)` after `mkbox_cnts` `rn2(21)`.
- **C locus:** `mkobj.c` `mkbox_cnts` — ICE_BOX arm: `mksobj(CORPSE,TRUE,FALSE)`
  then `age=0` + stop rot/revive timers; else `boxiprobs`/`mkobj`.
- **Cause/evidence:** JS `mkbox_cnts` always rolled `rnd(100)` + `BOX_PROBS`
  for every container, including ICE_BOX (`n=20` → `rn2(21)` matched).
  C never uses boxiprobs for ice boxes — next call is corpse `next_ident`.
- **Change:** `js/mkobj.js` — ICE_BOX branch; `add_to_container` + clear
  `cobj`; container content weight sum; BoH nested rewrite still deferred.
- **Verification:** seed0012 RNG **1285→3346**/13878, Scr **13→14**/308;
  first remaining @3152 C `dog_move` `rn2(1)` vs JS `rn2(3)`; green+strict;
  cohort 22 PASS (incl. seed0009).
- **General lesson:** container fill arms diverge by otyp before shared
  probability tables — match the ICE_BOX short-circuit first.

## D-0360 — hero `trapeffect_rocktrap` must place ROCK at `u.ux,u.uy`

- **Status:** fixed
- **Observed:** seed0012 `Maximum call stack size exceeded` in
  `dogmove.js` `can_reach_location` (RNG/Screen 0). Stack: infinite recurse
  on `fx/fy === undefined` from floor ROCK with no coords.
- **C locus:** `trap.c` `trapeffect_rocktrap` hero branch —
  `feeltrap` + `t_missile(ROCK)` + `place_object(otmp, u.ux, u.uy)` +
  `losehp`/`exercise`. `thitm` places with stale `mon->mx,my` after death
  (`mon_leaving_level` deliberately keeps coords).
- **Cause/evidence:** JS only had the monster branch. Hero `dotrap` passed
  `{_youmonst:true}` into that path → `thitm` → `place_object(obj,
  undefined, undefined)` → fobj ROCK with `where=OBJ_FLOOR` but no `ox/oy`
  → `dog_goal` `can_reach_location` never decreases dist (NaN).
- **Change:** `js/trap.js` — port hero rocktrap; `feeltrap`/`ceiling`
  subset; `thitm` captures `place_x/y` before `monkilled`.
- **Verification:** seed0012 no longer throws; Scr **0→13**/308,
  RNG **0→1285**/13878; first remaining miss @1245 `next_ident` vs
  `rnd(100)`; green+strict; cohort 22 PASS (incl. seed0009).
- **General lesson:** omitted hero trap arms still run via `dotrap`;
  never place missiles using youmonst stub coords.

## D-0359 — continue_run must not maybe_smudge_engr

- **Status:** fixed
- **Observed:** seed0009 Scr 73/73; RNG 3708/3713; first miss @3521
  C `mcalcmove` `rn2(12)` vs JS `rnd(5)`.
- **C locus:** `hack.c` `domove` — smudge only when
  `domove_succeeded & (DOMOVE_RUSH|DOMOVE_WALK)`; clears `domove_attempting`
  after each step. `allmain.c` continue-run calls `domove()` with attempting
  already 0. `cmd.c` `set_move_cmd` sets WALK/RUSH on the first step only.
- **Cause/evidence:** DIAG stack: stray `rnd(5)` from `maybe_smudge_engr` ←
  `domove` ← `continue_run`. JS smudged every successful step; C only on the
  step that still had attempting flags.
- **Change:** `js/cmd.js` — set DOMOVE_WALK/RUSH on rhack first step; record
  `domove_succeeded` on position change; smudge only when RUSH|WALK succeeded;
  clear `domove_attempting` in `finally`.
- **Verification:** seed0009 PASS 3713/3713 + 73/73; green+strict; cohort 24
  PASS; full suite **24/44** Scr 3626 RNG 240535 (`19+0.12/turn`).
- **Next:** pick next shared blocker (CURRENT).

## D-0358 — death disclose attributes/conduct/overview before RIP

- **Status:** fixed
- **Observed:** seed0009 Scr **63**/73 RNG **3708**/3713 — first cell-miss
  @63 C attributes `[ynq] (n)` vs JS tombstone RIP.
- **C locus:** `end.c` `disclose` (`a`/`v`/`g`/`c`/`o` after invent);
  `insight.c` `enlightenment(..., ENL_GAMEOVERDEAD)`; `dungeon.c`
  `init_mapseen` / `show_overview` / `print_mapseen`; `wintty.c`
  fullscreen `--More--` at col 1.
- **Cause/evidence:** JS `disclose` only asked invent yn then jumped to
  RIP. Empty invent skipped invent (matches C); attributes/conduct/
  overview never queried. Tutorial `mklev` never called `init_mapseen`,
  so death overview omitted DoD Dlvl1. Fullscreen NHW_MENU `--More--`
  painted at col 0 (C col 1, cursor 9).
- **Change:** wire disclose a/v/g/c/o; gameover `enlightenment` via
  `show_nhw_menu_text`; `init_mapseen` from `mklev`; end-overview
  traverse + `(end)` menu; ATR_NONE headings on final overview;
  fullscreen `--More--` col+1.
- **Verification:** seed0009 Scr **63→73**/73 (cells+cursors full);
  RNG still **3708**/3713 (pre-existing mid-game `mcalcmove`/`rnd(5)`);
  green+strict; 23-session PASS cohort + seed0107 strict.
- **Named omissions:** invent `display_inventory` on `y`; vanquished
  ask when ntypes>0; enlightenment poly/night/full status/resistances;
  overview interest_mapseen/endgame/branches/cemetery.
- **Next:** seed0009 RNG @3514 `mcalcmove` `rn2(12)` vs JS `rnd(5)`.
- **General lesson:** death disclose is ordered queries before RIP;
  `init_mapseen` is mklev-side, not overview-lazy-only.

## D-0357 — swim_move_danger + drown/lava entry

- **Status:** fixed
- **Observed:** seed0009 Scr **49**/73 RNG **3649**/3713 — first cell-miss
  @45 C “You avoid stepping into the pool of water.--More--” (+ tip /
  m-prefix fall / crawl / wall-water / lava burn) vs JS blank (walked
  into pool without ParanoidSwim gate).
- **C locus:** `hack.c` `swim_move_danger` / `handle_tip(TIP_SWIM)` /
  `u_simple_floortyp`; `cmd.c` `do_reqmenu` + `set_move_cmd` nopick;
  `hack.c` `pooleffects` → `trap.c` `drown` / `lava_effects` →
  `done(BURNING)`.
- **Cause/evidence:** JS `domove` omitted post-`test_move` liquid
  paranoia; no `m`-prefix nopick; `spoteffects` skipped `pooleffects`.
- **Change:** `js/hack.js` swim helpers + `crawl_destination`;
  `js/cmd.js` gate + `m` prefix; `js/jsmain.js` tips default On;
  `js/pickup.js` `pooleffects`; `js/trap.js` `drown` /
  `rnd_nextto_goodpos` / `lava_effects`→`done(BURNING)`.
- **Verification:** seed0009 Scr **49→63**/73 RNG **3649→3708**/3713;
  @45–@62 match; first miss @63 attributes yn vs tombstone;
  green+strict; 23-session PASS cohort + seed0107 strict.
- **Next:** death disclose order (attributes yn before RIP) for
  BURNING / `end_disclose`.
- **General lesson:** ParanoidSwim is a move gate, not a lookaround
  message; tip + m-prefix are part of the same C path.

## D-0356 — describe_decor mention_decor (broken door)

- **Status:** fixed
- **Observed:** seed0009 Scr **48**/73 RNG **3649**/3713 — first cell-miss
  @41 C “There is a broken door here.” vs JS blank topline (after kick
  opens door and hero steps on it; no floor objects).
- **C locus:** `pickup.c` `describe_decor` + `pickup` early path when
  `autopickup && !OBJ_AT` + `flags.mention_decor`; `check_here` also
  calls `describe_decor` before `look_here` (LOOKHERE_SKIP_DFEATURE).
  `dfeature_at` already returns `"broken door"` for `D_BROKEN`.
- **Cause/evidence:** JS `check_here` with `ct==0` only `read_engr_at`;
  `pickup` never called `describe_decor`. With no objects, C never
  reaches `look_here` for this message — it is mention_decor feedback.
- **Change:** `js/pickup.js` `describe_decor` + wire into `pickup`
  `!OBJ_AT`/pool/lava early return and `check_here`; skip open
  door/doorway; verbose “There is %s here.”
- **Verification:** seed0009 Scr **48→49**/73; @41 cells match; first
  miss @45 pool-avoid; RNG still **3649**/3713; green+strict; cohort
  21 PASS.
- **General lesson:** furniture with `ct==0` is `describe_decor`, not
  `look_here`; do not patch `look_here` alone from a blank topline.

## D-0355 — pool/lava/ice terrain_glyph + DEC diamond scoring

- **Status:** fixed
- **Observed:** seed0009 Scr **40**/73 RNG **3649**/3713 — first cell-miss
  @40 JS `?` then Unicode `◆` vs C DEC `` ` `` (lava/pool diamonds).
- **C locus:** `display.c` `back_to_glyph` POOL/MOAT→`S_pool`, WATER→
  `S_water`, LAVAPOOL/LAVAWALL→`S_lava`/`S_lavawall`, ICE→`S_ice`;
  `defsym.h` PCHAR colors; `dat/symbols` DECgraphics `\xe0` meta-``.
- **Cause/evidence:** `terrain_glyph` defaulted water/lava/ice to `?`;
  after glyphs landed, `_buildScreenOutput` converted DEC `` ` `` via
  `DEC_TO_UNICODE` to `◆`, but frozen `DEC_MAP` does not equate them
  (same class as altar `{`).
- **Change:** `js/display.js` `terrain_glyph` cases + keep raw `` ` ``
  on scoring grid (with `{`). AIR/CLOUD/IRONBARS/TREE/DRAWBRIDGE_UP
  under-typ still default `?`.
- **Verification:** seed0009 Scr **40→48**/73 (first miss @41 broken
  door); RNG still **3649**/3713; green+strict; cohort 21 PASS.
- **General lesson:** only Unicode-convert DEC chars that
  `screen-decode` `DEC_MAP` remaps for compare.

## D-0354 — test_move mention_walls obstructed bump

- **Status:** fixed
- **Observed:** seed0009 Scr **39**/73 RNG **3649**/3713 — first cell-miss
  @33 C topline “It's a wall.” vs JS blank (key `l` into wall).
- **C locus:** `hack.c` `test_move` — `IS_OBSTRUCTED`/`IRONBARS` +
  `mode == DO_MOVE` + `flags.mention_walls` → `pline_dir` “It's %s.”
  (`an(defsyms[].explanation)`; `S_stone` → “solid stone”).
- **Cause/evidence:** JS `domove` `blocksMove` ended the run with
  `context.move = 0` and no pline; tut-1 already sets `mention_walls`.
- **Change:** `js/cmd.js` `mention_walls_obstructed` on obstructed/bars
  bump (wall/tree/solid stone/bars). Deferred: Blind `feel_location`,
  Passes_walls/autodig/chew, drawbridge/Sokoban, full `back_to_glyph`/
  `wall_angle`→`S_stone`, `pline_dir` a11y, out-of-bounds mention.
- **Verification:** focused Scr **39→40** (next @40 pool `?`); green +
  strict; cohort 8 PASS; full `sessions` **23/44** (Scr 3592/11405).
- **General lesson:** silent early-outs that skip C message branches
  look like “display” misses but are often `test_move`/`domove` plines.

## D-0353 — tut-1 load_tut1 remainder + align_shift + WAITMASK

- **Status:** fixed
- **Observed:** seed0009 Scr **38**/73 RNG **3450**/3713 — first cell-miss
  @33 wall; level-gen stopped before large-box `next_ident`.
- **C locus:** `dat/tut-1.lua` loot→end; `mkobj.c` `mkbox_cnts`+contents
  `get_location`; `mklev.c` `mineralize` special skip after kelp;
  `makemon.c` `align_shift`; `monmove.c` `dochug` `STRAT_WAITMASK`.
- **Cause/evidence:** RNG first miss @3432 C large-box vs JS kelp
  `rn2(10)`. Completing tut-1 aligned through kelp/`place_lregion`.
  Corpse `rndmonst` needed real `align_shift` (tut-1 align=chaotic via
  UNCONNECTED∩D_ALIGN). Waiting monsters then burned `distfleeck`
  without C's WAITMASK early return.
- **Change:** `load_tut1` through potion; `mineralize` special return;
  `align_shift`; `dochug` WAITFORU clear + WAITMASK return; container
  contents helper.
- **Verification:** seed0009 Scr **38→39**/73 (first miss still **@33**
  wall/glance); RNG **3450→3649**; green+strict; cohort 7 PASS.
- **Named omissions:** tut_key/eckey; Knight jump; leave-tutorial invent
  restore; `map_location` tseen; `add_to_container` merge; temperature_shift
  body; STRAT_CLOSE quest_talk.
- **Next:** @33 “It's a wall.” / empty JS topline — glance path.

## D-0352 — tut-1 mktrap victim gate + load_tut1 through sling

- **Status:** fixed
- **Observed:** seed0009 @27 — C “The door resists!” vs JS “The door
  opens.” Hypothesis was `doopen_indir` chance/attrs; **falsified**.
- **C locus:** `mklev.c` `mktrap` victim gate (`lvl <= rnd(4)` before
  `kind < HOLE || MAGIC_TRAP`); `dungeon.c` `induced_align` via
  `Is_special`→`flags.align`; `dat/tut-1.lua` kick→sling des.*.
- **Cause/evidence:** RNG first miss @3341 C `rnd(4) @ mktrap` vs JS
  `rn2(10)` — portal `maketrap` omitted victim-gate burn. Door `rnl`
  values then desynced (level-gen stream). Chance/attrs not the peel.
- **Change:** `mktrap_seen_victim` helper; extend `load_tut1` through
  percent doors / shuffle traps / armor / lichen / rocks / mold / wolf
  / sling; fix `induced_align` to read `sp_levchn` special flags.
- **Verification:** seed0009 Scr **27→38**/73 (first cell-miss **@33**
  wall); RNG **3341→3450**; door toplines match (rnl values still
  differ — remaining tut-1); green+strict; cohort 5 PASS.
- **Named omissions:** large-box `mkbox_cnts`+contents; food/twoweapon/
  stairs/kelp/`place_lregion`; tut_key/eckey; Knight jump.
- **Next:** continue `load_tut1` from loot box so door `rnl` values match.

## D-0351 — tut-1 door-area engravings + closed door + portal

- **Status:** fixed
- **Observed:** seed0009 @21 — one S_engroom `` ` `` at display (8,4)
  vs floor; map-relative engraving (2,4).
- **C locus:** `dat/tut-1.lua` engravings/door/trap after diagmove;
  `sp_lev.c` `lspo_engraving` (`degrade=false`→`nowipeout`) /
  `lspo_door`→`sel_set_door` / `create_trap`+`MKTRAP_SEEN`;
  `nh.parse_config` mention_walls/mention_decor/lit_corridor.
- **Cause/evidence:** `load_tut1` stopped after two move engravings;
  map `+` doors lacked `D_CLOSED` doormask (showed as ndoor floor).
- **Change:** port (2,4)/(2,5)/(2,7)/(4,5) engravings + closed (2,6)
  + seen MAGIC_PORTAL (4,4) + newbie options; set `nowipeout`.
- **Verification:** seed0009 Scr **21→27**/73 RNG **3342→3341**;
  green+strict; cohort sample 4 PASS (1500/1800/0060/0107).
- **Named omissions:** tut_key/eckey; Knight jump; kick door onward;
  `map_location` tseen trap glyphs; leave-tutorial invent restore.
- **Next:** @27 “door resists!” vs JS “door opens.” (`doopen_indir`).

## D-0350 — tut-1 CENTER map + tutorial arrival / invent stash

- **Status:** fixed
- **Observed:** seed0009 @14 — 133 map cell misses; JS room at (9,4)
  vs C @ (11,7); botl `Dlvl` vs `Tutorial`; later AC:7 vs AC:10 timing.
- **C locus:** `sp_lev.c` `lspo_map` string form → SPLEV_CENTER (odd
  xstart/ystart); `mkmaze.c` `fixup_special` updest/dndest;
  `dungeon.c` `u_on_rndspot`; `botl.c` `In_tutorial`→`Tutorial`;
  `nhlua.c` `nhl_gamestate` invent stash (no `find_ac`);
  `allmain.c` once-per-input `find_ac`.
- **Cause/evidence:** JS placed tut-1 at (1,0); C centers to (3,3).
  Tutorial UTOTYPE_NONE needs `u_on_rndspot`. Invent strip must leave
  stale `u.uac` until moveloop `find_ac`.
- **Change:** `splev_map_center_start`; correct tut-1 map string; set
  updest/dndest; `goto_level` else → `u_on_rndspot`; Tutorial botl;
  invent stash; `find_ac` in `moveloop_core`; second S_engroom engraving.
- **Verification:** seed0009 Scr **14→21**/73 RNG **3341→3342**;
  green+strict; cohort 21 PASS.
- **Named omissions:** rest of tut-1.lua des.* (doors/traps/objs/mons/
  percent RNG); leave-tutorial invent restore; `tut_key`/`eckey`.
- **Next:** @21 next visible S_engroom engraving.

## D-0349 — tutorial yes-path `schedule_goto` / `deferred_goto`

- **Status:** fixed
- **Observed:** seed0009 @13 — C `Entering the tutorial.--More--` on
  stale Dlvl map; JS bare pline (no `--More--`).
- **C locus:** `allmain.c` `maybe_do_tutorial`; `do.c` `schedule_goto` /
  `deferred_goto` / `goto_level` (ends `pickup(1)`); `mklev.c`
  `Is_special` → `makemaz(proto)`.
- **Cause/evidence:** JS only `pline`d; C plines inside `deferred_goto`
  then `goto_level`→`docrt`→`cls`→`more()`. Screen key at index `i` is
  `moves[i]`, not `steps[i].key`.
- **Change:** `schedule_goto`/`deferred_goto`; full yes-path; `nofollowers`
  keepdogs gate; `Is_special`→`load_tut1` map+first engraving skeleton;
  `goto_level` `pickup(1)` → `check_here`/`read_engr_at`.
- **Verification:** seed0009 Scr **13→14**/73 (Entering `--More--`);
  RNG **3338→3341**; green+strict; cohort seed0700/1500/1800/0107 PASS;
  full suite **23/44**.
- **Named omissions:** rest of `tut-1.lua` (165-call RNG before Entering
  more; doors/traps/objs/mons; `place_lregion` tail).
- **Next:** @14 map cells (133 misses) under engraving `--More--`.

## D-0348 — chargen corner NHW_MENU keeps BASE splash

- **Status:** fixed
- **Observed:** seed0009 @9 — C shows copyright / `Who are you? Swimmer`
  under corner `Is this ok?` menu; JS had wiped splash (`clearScreen`).
  Prior inverted hypothesis (“C clears”) was wrong.
- **C locus:** `wintty.c` `tty_display_nhwindow(NHW_MENU)` corner path
  clears `WIN_MESSAGE` only; `erase_menu_or_text` on destroy
  (`offx==0` → `term_clear_screen`; else `docorner` cl_end from offx).
- **Cause/evidence:** D-0111 used `clearScreen` under `in_role_selection`
  to avoid inventing botl via `flush_screen`; that also erased BASE splash
  before the first corner confirm (no prior menu). Multi-menu chargen
  (seed0077) still needs prior-menu erase after fullscreen role.
- **Change:** `paint_corner_nhw_menu` — chargen: erase prior
  `_tty_menu_geom` then clear row 0 only; track geom after paint.
- **Verification:** seed0009 Scr **12→13**/73 (@9 match; next @13
  tutorial `--More--`); seed0077 **33/33 PASS**; green+strict; cohort
  21 PASS.
- **Next:** seed0009 @13 `Entering the tutorial.--More--` vs bare
  pline (more/blocking).

## D-0347 — `weapon_insight` twoweapon skill-limit lines

- **Status:** fixed
- **Observed:** seed0107 @93 attributes page missing
  `Your skill in long/short sword is [also] limited by being unskilled with
  two weapons` (Scr 97/98 after D-0346; cursor already matched).
- **C locus:** `insight.c` `weapon_insight` — `u.twoweap` branch vs
  `P_SKILL(P_TWO_WEAPON_COMBAT)` / `weapon_type(uswapwep)`.
- **Cause/evidence:** JS stub skipped the twoweap comparison (`// deferred`);
  C emits `enl_msg` limited-by lines; COLNO clips trailing `.` when padded
  line length ≥ 80.
- **Change:** port twoweap compare in `js/invent.js` enlightenment;
  `enl()` drops `.` at width 80. `can_advance` enhance tips deferred.
- **Verification:** seed0107 **98/98 PASS**; green+strict; cohort 20 PASS;
  full suite **23/44**.
- **General lesson:** enlightenment twoweap skill lines shift page layout;
  COLNO period clip matters for long skill names.

## D-0346 — `dosit` OBJ_AT sit + CORPSE `xname` / `the`

- **Status:** fixed
- **Observed:** seed0107 @85 C `You sit on the corpse.  It's not very
  comfortable...` vs JS `You sit on it.`
- **C locus:** `sit.c` `dosit` OBJ_AT picnic body; `objnam.c` `xname` omits
  monster type for CORPSE; `the(xname(obj))`.
- **Cause/evidence:** JS stub used `it`/`them`; `pretty_base` CORPSE included
  mon name so naive `the(xname)` would be wrong without xname fix.
- **Change:** `js/sit.js` OBJ_AT branch (dragon/towel/slithy/sit+comfort/
  squishy/cream-pie); `js/objnam.js` CORPSE `xname` → `"corpse"` + `the()`;
  `M1_SLITHY` export. Steed/trap/pool/uteetering/throne/egg deferred.
- **Verification:** Scr **96→97**/98; then D-0347 → full PASS; green+strict;
  cohort held.
- **General lesson:** C `xname(CORPSE)` is bare `"corpse"`; mon type belongs
  in `corpse_xname` / `doname`, not `xname`.

## D-0345 — `hitum` twoweapon / `double_punch` second swing

- **Status:** fixed
- **Observed:** seed0107 @40 — C `You miss the lichen.  You kill the lichen!`
  vs JS miss-only (twoweapon primary miss, secondary kill omitted).
- **C locus:** `uhitm.c` `hitum` — `gt.twohits` / `known_hitum(uswapwep)`;
  also `double_punch` / `mon_maybe_unparalyze`.
- **Cause/evidence:** JS `hitum` stopped after first `known_hitum`+`passive`;
  C continues when `gt.twohits` and target still at `(ux+dx,uy+dy)`.
- **Change:** port second swing + helpers; Cleaver `hitum_cleave` and hmon
  `gt.twohits` strength/silver arms still deferred.
- **Verification:** Scr **42→96**/98; RNG **full 2902**/2902; green+strict;
  20 PASS cohort. First miss now `@85` sit-on-corpse pline.
- **General lesson:** dual-wield is a second full to-hit/`known_hitum` pass,
  not a damage-multiplier on the first swing.

## D-0344 — `#twoweapon` / `dotwoweapon`

- **Status:** fixed
- **Observed:** seed0107 @15 — C `You begin two-weapon combat.` vs JS
  `#twoweapon: unknown extended command`.
- **C locus:** `cmd.c` extcmdlist `"twoweapon"` flags 0; `wield.c`
  `dotwoweapon` / `can_twoweapon` / `set_twoweap`.
- **Cause/evidence:** runnable body missing from `EXT_CMDS`; must not be
  in `EXT_CMD_AC` (flags 0 — unique `#tw` expand poisoned progressive paint).
- **Change:** port `could_twoweap`/`can_twoweapon`/`dotwoweapon`/`set_twoweap`
  /`untwoweapon`; wire `#twoweapon` in `EXT_CMDS` only.
- **Verification:** Scr **36→42**/98 RNG **2684→2846**/2902; @15 begin
  matches; green+strict; cohort 20 PASS. Next: `hitum` twohits @40.
- **General lesson:** EXT_CMD_AC is AUTOCOMPLETE-only; flags 0 stay out.

## D-0343 — getpos tip `docrt` + space quitchar under terrainmode

- **Status:** fixed
- **Observed:** seed0013-restore after D-0342 — Scr 89→90 then stuck @86:
  C `Done.--More--` vs JS still in getpos / `#` aborted.
- **C locus:** `getpos.c` tip close keeps gbuf; quitchars/`!force` →
  `pline("Done.")`; `detect.c` `browse_map` uses `force=FALSE`.
- **Cause/evidence:** tip dismiss called `docrt()` (re-`newsym` `@`);
  space was `continue` instead of Done exit.
- **Change:** skip `docrt` when `iflags.terrainmode` (flush from
  `disp_*`); space/CR/LF → `Done.` + return 0 when `!force`.
- **Verification:** Scr **90→99**/99 full PASS; green+strict; 22/44 suite.
- **General lesson:** temporary show_glyph maps die under tip `docrt`.

## D-0342 — `reveal_terrain` getglyph / show map rewrite

- **Status:** fixed
- **Observed:** seed0013-restore @71 — C map `~` (hide mon/obj) vs JS
  `@`/`f` during `#terrain` a / TER_MAP.
- **C locus:** `detect.c` `reveal_terrain` / `reveal_terrain_getglyph`
- **Cause/evidence:** JS skipped getglyph/`show_glyph` loop (named omit).
- **Change:** port getglyph strip mon/obj/invisible → terrain via
  lastseentyp/`terrain_glyph` + litcorr→corr hack; flush before Showing
  pline (`js/display.js` + `detect.js`).
- **Verification:** Scr **75→89**/99 (then D-0343 →99); RNG full;
  green+strict; cohort PASS; suite **22/44**.
- **Named omission:** region/gascloud; trap keep restore; M_AP_FURNITURE;
  unconstrain; arboreal default tree.
- **General lesson:** TER_MAP is display rewrite, not just browse_map.

## D-0341 — DEL / `#terrain` unbound

- **Status:** fixed
- **Observed:** seed0013-restore @70 — C `View which?` terrain menu vs
  JS `Unknown command '\x7f'`.
- **C locus:** `cmd.c` `{ '\177', "terrain", … doterrain }`
- **Cause/evidence:** `doterrain` already ported (D-0128) but DEL unbound.
- **Change:** bind `\x7f` → `doterrain` in `cmd.js`.
- **Verification:** Scr **72→75**/99; first miss `@71` terrain reveal still
  paints `@`/`f` vs C `~`; RNG full; green+strict; 21 PASS cohort.
- **General lesson:** GENERALCMD keys may already have bodies — check bind.

## D-0340 — invent show-* `[`/`=`/`"`/`(`

- **Status:** fixed
- **Observed:** seed0013-restore @64 — C
  `c - an uncursed +1 leather armor (being worn).` vs
  JS `Unknown command '['`; then empty rings/amulet/tools peels.
- **C locus:** `invent.c` `doprarm`/`wearing_armor`/`noarmor` /
  `doprring`/`dopramulet`/`doprtool`/`tool_being_used`;
  `dispinv_with_action`→`display_pickinv` n==1→`tty_message_menu(PICK_NONE)`
- **Cause/evidence:** see-* GENERALCMDs unbound; single worn armor is
  pline(xprname), not a menu.
- **Change:** port empty/worn pline paths; bind `[` `=` `"` `(`;
  multi-piece / menu_requested `dispinv` deferred.
- **Verification:** Scr **69→72**/99 (then +DEL →75); first miss after
  invent peels `@70` DEL; RNG full; green+strict; 21 PASS cohort.
- **General lesson:** friday13 restore walks see-* then `#terrain` DEL.

## D-0339 — `)` / `doprwep` bare handed

- **Status:** fixed
- **Observed:** seed0013-restore @62 — C `You are bare handed.` vs
  JS `Unknown command ')'`.
- **C locus:** `invent.c` `doprwep` / `wield.c` `empty_handed`
- **Cause/evidence:** `)` (WEAPON_SYM / #seeweapon) unbound in `cmd.js`.
- **Change:** `doprwep` — `!uwep` → `You are ${empty_handed()}.`; else
  `prinv` via `xprname`; bind `)`. Named omit: menu_requested
  `dispinv_with_action`.
- **Verification:** Scr **68→69**/99; first miss `@64` `[`; RNG full;
  green+strict; 21 PASS cohort incl. seed0013-rogue.
- **General lesson:** show-* GENERALCMD peels continue after restore
  (`$` then `)` then `[`).

## D-0338 — `$` / `doprgold` empty wallet

- **Status:** fixed
- **Observed:** seed0013-restore @60 — C `Your wallet is empty.` vs
  JS `Unknown command '$'.`
- **C locus:** `invent.c` `doprgold`
- **Cause/evidence:** `$` unbound in `cmd.js`.
- **Change:** `doprgold` verbose empty/nonempty wallet pline; bind `$`
  (hidden_gold / shop report / menu deferred).
- **Verification:** Scr **67→68**/99; RNG full; green+strict; seed0013-rogue
  PASS.
- **General lesson:** show-* commands are GENERALCMD peels after restore.

## D-0337 — `doattributes` xwaitforspace quitchars

- **Status:** fixed
- **Observed:** seed0013-restore @56 — C still on attributes page after
  `^O`; JS advanced/dismissed.
- **C locus:** `wintty.c` `dmore` → `xwaitforspace(quitchars)`
- **Cause/evidence:** page loop used bare `nhgetch()` (any key advances).
- **Change:** only space/CR/LF advance; ESC cancels; other keys stay
  (still capture boundaries).
- **Verification:** @56 match; Scr **65→67**; green+strict; seed0013-rogue
  PASS.
- **General lesson:** corner enlightenment shares dmore quitchars with
  NHW_TEXT.

## D-0336 — welcome-back omit unchanged alignment

- **Status:** fixed
- **Observed:** seed0013-restore @49 — C
  `Hello Sneaky, the human Rogue, welcome back…` vs JS
  `…the chaotic human Rogue…`
- **C locus:** `allmain.c` `welcome(FALSE)` align gate
- **Cause/evidence:** JS always prefixed `align_str`; C only when
  `new_game || baseOrig!=baseCur || adrift`.
- **Change:** match C gate (+ adrift phrasing).
- **Verification:** @49–@51 match; Scr **63→65**; green+strict.
- **General lesson:** restore welcome is not the new-game sentence shape.

## D-0335 — JSON `dosave` / restore via VFS

- **Status:** fixed
- **Observed:** seed0013-friday13-restore @47 — C `Really save? [yn] (n)`
  vs JS `Unknown command 'S'.`; RNG stall into full newgame on seg1.
- **C locus:** `save.c` `dosave`/`dosave0`; `restore.c` `dorecover`;
  `unixmain` attempt_restore; `allmain` `moveloop_preamble(resuming)`
- **Cause/evidence:** no `S` bind; no VFS save; seg1 always `newgame`.
- **Change:** `js/save.js` JSON snapshot to `save/<plname>`; `dosave` yn +
  farewell capture; `jsmain` restore before player_selection; preamble
  skips `rnd`/`initrack` when resuming; `l_nhcore_init` on restore for
  nhlib shuffle (2 rn2).
- **Verification:** RNG **4803→4804**/4804; Scr **47→65** before follow-on
  peels; green+strict; 8-session cohort PASS.
- **General lesson:** cross-segment state is only `input.storage`; restore
  must not re-shuffle objects.

## D-0334 — farlook `checkfile` yn + lookat `found=1`

- **Status:** fixed
- **Observed:** seed2200 @39 — C
  `@ … (human wizard called merlin)--More--` vs JS
  `More info about "human wizard"? [yn] (n)`. RNG full. Then @48
  stairs look skipped moreinfo yn (`found: 2`).
- **C locus:** `win/tty/topl.c` `tty_yn_function` — NEED_MORE → `more()`
  before yn; `pager.c` `checkfile` via `y_n`; `do_screen_description`
  after lookat parenthetical sets `found = 1`.
- **Cause:** JS `checkfile` hand-rolled yn overwrote topline without
  `flush_topl_more`; stairs/room/corr describe kept `found > 1` so
  `do_look` skipped `checkfile`.
- **Change:** `checkfile` → `yn_function` (D-0334); lookat arms return
  `found: 1` after parenthetical (stairs/ROOM/CORR).
- **Verification:** seed2200 Scr **206→229**/230 (sole miss parked
  @158 RC/`$HOME`); @39/@48 match; RNG full; green+strict; 19 PASS
  cohort.
- **Named omissions:** full showsyms-driven `do_screen_description`;
  look_at_monster hallu/health/stuck/leashed/trapped/mhidden; seed2200
  @158 RC harness (parked).
- **Next:** seed0013-restore Scr 47/99 or seed0107 RNG@2684.

## D-0333 — friday13 enlightenment body indent (two spaces)

- **Status:** fixed
- **Observed:** seed0013-rogue @53 — attributes screen
  `" Bad things can happen on Friday the 13th."` (1 space) vs C
  `"  Bad things…"` (2 spaces). After D-0332 Scr 58/59.
- **C locus:** `insight.c` `background_enlightenment` —
  `Sprintf(buf, " Bad things %s on Friday the 13th.", …)` + `enlght_out`;
  menu/tty paints the same leading pad as `enlght_line` body rows.
- **Cause:** JS `doattributes` used one leading space; other body lines
  already embed the two-space painted form.
- **Change:** friday13 line → `'  Bad things can happen on Friday the 13th.'`.
- **Verification:** seed0013-rogue **59/59 PASS**; green+strict; 21 PASS
  cohort; full suite **21/44**.
- **Named omissions:** final/gameover friday13 tense arms; night/midnight.
- **Next:** seed2200 @39 farlook/`--More--` vs moreinfo yn.

## D-0332 — getobj drop suggest compactify (`a-g`)

- **Status:** fixed
- **Observed:** seed0013-rogue @23 — drop prompt
  C `What do you want to drop? [a-g or ?*]` vs JS `[abcdefg or ?*]`.
  RNG full; Scr 57/59.
- **C locus:** `invent.c` `getobj` — `if (suggested > 5) compactify(bp)`.
- **Cause:** `drop_suggest_lets` joined invent letters without compactify
  (adjust path already used exported helper).
- **Change:** export `compactify_invlets`; apply when `lets.length > 5`
  in `do.js` `drop_suggest_lets`.
- **Verification:** @23 match; Scr **57→58**; then D-0333 → full PASS.
- **Named omissions:** other getobj callers still omitting compactify
  (throw/apply/wear/read/zap); `?`/`*` menus; count-split.
- **Next:** seed0013 @53 friday13 enl indent (D-0333).

## D-0331 — getlin/`#` extcmd topline wrap at CO-1

- **Status:** fixed
- **Observed:** seed0030 @1935 — long `#` extcmd echo
  `#  farlook -> "Elara's ghost…"` : C wraps onto row1 (`"  k"`, cursor
  `[3,1]`) vs JS blank row1 / cursor `[80,0]`. RNG full; Scr 1933/1953.
- **C locus:** `win/tty/topl.c` `topl_putsym` (wrap when `curx == CO-1`);
  `win/tty/getline.c` `hooked_tty_getlin` (`bufp - obufp < COLNO`).
- **Cause:** JS `get_ext_cmd`/`getlin` painted a single row and capped
  input at `cursor < 78` / `buf.length < 78`, so echo never wrapped and
  further keys were dropped once the prompt reached column 80.
- **Change:** shared `topl_wrap_echo` matching `topl_putsym`; allow
  buffer length `< COLNO` (D-0331).
- **Verification:** seed0030 **Scr 1953/1953** full PASS; RNG full;
  green+strict; 17 PASS cohort; seed2200 Scr **175→206**/230 (shared).
- **Named omissions:** backspace across wrapped rows; full tty
  `putsyms("\b \b")` erase on wrap; EDIT_GETLIN default buffer.
- **Next:** seed0013 @23 getobj drop `[a-g or ?*]` vs `[abcdefg or ?*]`.

## D-0001 — blocking `--More--` owns input keys

- **Observed:** `seed0900-tourist-explore-actions`, RNG divergence near 2936.
- **C locus:** `pline.c`/tty `more()` and callers in pet combat.
- **Cause/evidence:** C blocked on topline `--More--` and consumed 59 reject
  keys followed by ESC. JS lacked the blocking prompt, so those keys became
  later gameplay commands.
- **Change:** ported `pline`/`more` input behavior and combat messages; async
  propagation reaches `nhgetch` without reordering physics.
- **Verification:** seed0900 RNG 2983/2983 and screens 84/84; seed8000 remained
  fully green.
- **Lesson:** map keys to input boundaries before attributing an RNG mismatch
  to game logic.

## D-0002 — vault gold merge

- **Observed:** seed1800 divergence around RNG 1057.
- **C locus:** C gold placement/merge path (`mkgold` and object lists).
- **Cause/evidence:** C merged into an existing gold stack; JS allocated a new
  object and consumed `next_ident`/`rnd(2)`.
- **Change:** use the C merge path and preserve object-list semantics.
- **Verification:** focused seed1800 prefix advanced; both green sessions held.

## D-0003 — tutorial and fortune cookie input ownership

- **Observed:** seed1800 divergence around 2362.
- **C locus:** startup tutorial prompt and `eat.c` rumor path.
- **Cause/evidence:** the rc did not disable the tutorial. `n` answered its
  yes/no prompt; it was not a north command. Later `e b` ate the cookie and
  entered `outrumor`/`getrumor`.
- **Change:** ported the prompt/key ownership and cookie rumor path.
- **Verification:** focused seed1800 advanced through the cookie sequence;
  green sessions held.

## D-0004 — starting-pet apport

- **Observed:** seed1800 divergence around 2403.
- **C locus:** `dog.c:makedog`/`initedog`, `attrib.c:acurr`.
- **Cause/evidence:** `makedog` runs before initial attributes are established.
  Non-Strength `ACURR` clamps to 3, so the starting pet gets `apport=3`.
  A JS `|| 10` fallback changed the later `rn2(8)` decisions.
- **Change:** ported the clamp and removed the invented fallback.
- **Verification:** focused seed1800 advanced; green sessions held.

## D-0005 — thrown object stops before blocked terrain

- **Observed:** JS embedded the dart in a wall; C placed it on stairs at
  `(47,18)` in the current seed1800 trace.
- **C locus:** `zap.c:bhit`, called by `dothrow.c:throwit`.
- **Cause/evidence:** C backs up/stops when the next cell is not `ZAP_POS` or is
  a closed door. JS only treated stone as blocking.
- **Change:** use the C terrain predicate/order.
- **Verification:** dart landing and RNG advanced to the current pet-movement
  divergence; green sessions held.
- **Lesson:** the coordinate is evidence, not the implementation rule.

## D-0006 — pet selection after dart APPORT

- **Status:** parked. Do not spend another loop iteration on it until the C
  state/candidate-set falsifier below is executable.
- **Observed:** `seed1800-tourist-eat-throw`, first RNG divergence at index
  2417. C calls `rn2(1)` in `dog_move`; JS calls `dogfood`/`obj_resists` on the
  dart first.
- **C locus:** `dogmove.c:dog_goal`, `dog_move`, and `mon.c:mfndpos`.
- **Established state:** JS pet `(48,17)`, hero `(48,18)`, APPORT goal dart
  `(47,18)`, squared `udist=1`, `mconf=0`, `mflee=0`, pet `apport=3`.
- **Rejected hypotheses:**
  - reject the dart in `can_carry`: contradicted by an earlier C APPORT success;
  - gate behavior on raw RNG index/coordinates: advanced the trace but broke
    seed0900 and violates the Constitution;
  - treat `LOST_THROWN` as a general carry rejection: not present in C.
- **Useful experiment (not shipped):** forcing `appr=0`, omitting candidate
  `(47,16)`, and ending selection after dart `dogfood` reached RNG 2435. This
  narrows the state/candidate-set question but is not a fix.
- **Next falsifier:** build/verify the recorder, add local-only instrumentation
  (never a production JS oracle) for C pet position, `gg`, `appr`, and exact
  `mfndpos` candidates/flags at this turn, then compare branch-by-branch before
  changing selection. No verified recorder binary/instrumentation command is
  currently available, so `rng-diff` alone is insufficient.
- **Required gate:** seed8000 + seed0900 remain fully green.

## D-0007 — role/race `mnum` identity (array index vs PM_*)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** 33/44 public sessions threw `u_init_role: role not ported`.
  Even Tourist matched only via `mnum === 10` (roles[] index) or name fallback.
- **C locus:** `role.c` `roles[].mnum` / `races[].mnum`; `u_init.c`
  `Role_switch` / `Race_switch` (`PM_ROGUE`, `PM_TOURIST`, `PM_HUMAN`, …).
- **Cause/evidence:** JS stored roles[] indexes (`Rogue=8`, `Tourist=10`,
  `human=0`) where C stores monster-table IDs (`338`, `340`, `260`).
- **Change:** `js/roles.js` uses generated `PM_*` constants; Rogue attrs/gods/
  `petnum`; `u_init.js` ports Rogue `trobj` + blindfold/`knows_object(SACK)` /
  dagger `knows_class` stand-in + wield/wear for short sword / leather armor.
- **Omissions named in C-JS-MAP:** `Skill_R`; full `knows_class` needs
  `oc_skill` in objects extractor; other roles still throw.
- **Verification:** green exact-length PASS; Rogue cohort no longer throws
  `role not ported` (seed1500 RNG 1173/2768; seed0013 519/4838). Role throws
  on full suite now **29/44**.
- **Lesson:** identity fields that drive `switch (Role_switch)` must come from
  the monster table, not the roles[] enumeration order.

## D-0008 — Tourist welcome/HP/align hardcodes vs Rogue first screen

- **Status:** fixed (verified 2026-07-12).
- **Observed:** after Rogue `u_init_role` existed, `allmain.js` still emitted
  `Aloha … neutral …` and forced `HP:10` / `ualign.type=0`. Rogue sessions
  expect `Hello … chaotic … Rogue` and `HP:12(12)`.
- **C locus:** `role.c:Hello`; `allmain.c:welcome`; `attrib.c:newhp` +
  `exper.c:newpw` at `u.ulevel==0`; `u_init.c` align from
  `aligns[flags.initalign]`; `insight.c` pantheon/`wallet` lines.
- **Cause/evidence:** Tourist-shaped literals ignored role `hpadv` (Rogue
  infix 10 + human 2 = 12) and rc `align:chaotic`.
- **Change:** `Hello(mnum)`, role/race `hpadv`/`enadv`, `newhp`/`newpw`, rc
  align → `ualign`, `welcome()`, invent pantheon + empty wallet.
- **Verification:** green PASS + strict lengths; Rogue step0/1 show
  `Hello … Rogue` and `HP:12` (remaining cell diffs = attrs/map after mklev
  RNG diverge).
- **Lesson:** shared startup display must read role/race/rc tables, not the
  first green seed’s literals.

## D-0009 — Rogue legacy pantheon/layout, botl flags, moon/friday

- **Status:** fixed (verified 2026-07-12).
- **Observed:** Rogue legacy `Book of Mog` vs C `Kos`; status always
  `Xp:N/0 T:T` vs C `Xp:N` when `!showexp`/`!time`; welcome `--More--`
  skipped before tutorial; seed0013 missing full-moon / Friday-13 plines.
- **C locus:** `quest.lua` `%d`/`%G` + `questpgr.c:convert_arg`;
  `pray.c:align_gname`/`align_gtitle`; `wintty.c` NHW_MENU `offx`;
  `botl.c` plname capitalize + `flags.showexp`/`flags.time`;
  `calendar.c:phase_of_the_moon`/`friday_13th`; `allmain.c:moveloop_preamble`.
- **Change:** `js/questpgr.js` alignment deity + offx layout; Tourist
  `ngod='_The Lady'`; `status_line_2` gates Xp/T; `flush_topl_more` before
  tutorial menu paint; `js/calendar.js` + preamble moon/friday + `change_luck`.
- **Verification:** green PASS + strict; seed1500 legacy/welcome text+cursor
  match (attrs still diverge); seed0013 moon/friday message lines match.
- **Next peel:** cleared by D-0010; then `start_corpse_timeout` (idx 1194).
- **Lesson:** shared startup UI must follow C convert_arg / tty menu geometry
  and datetime calendar, not Tourist-shaped constants.

## D-0010 — makemon skipped `m_initweap` (ordinary armed envelope)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **1112**: C `rn2(4)` @
  `m_initweap` (S_KOBOLD darts) vs JS `rn2(50)` @ `m_initinv_tail` only.
- **C locus:** `mondata.h:is_armed` / `attacktype(AT_WEAP)`;
  `makemon.c:m_initweap` / `m_initthrow` / `mongets`; call from `makemon`
  when `allow_minvent`.
- **Cause/evidence:** JS never called `m_initweap`; kobold shaman lacks
  AT_WEAP so mlet-only `is_armed` would be wrong — extractor now emits
  `has_at_weaps`.
- **Change:** `scripts/extract-monsters.py` + `has_at_weaps`; `is_armed` in
  `monsters.js`; `m_initthrow`/`mongets`/`m_initweap` ordinary envelope in
  `makemon.js` (S_KOBOLD/S_ORC/S_OGRE/S_GIANT/S_CENTAUR/S_WRAITH/S_ZOMBIE/
  S_HUMANOID + default; trailing `rn2(75)` offensive gate).
- **Verification:** green PASS + strict; seed1500 first mismatch moves to
  idx **1194** `start_corpse_timeout`; runner 1275/2768; seed0060 2464/3626;
  full suite 2/44, RNG 25334/792838, screens 108/11405.
- **Omissions:** S_HUMAN/S_ANGEL/S_KOP/S_DEMON/S_TROLL/S_LIZARD specials;
  `m_initinv` body; `add_to_minv` merge; demon→default FALLTHROUGH;
  `rnd_offensive_item` hard-helmet FALLTHROUGH.
- **Lesson:** gate invent on real AT_WEAP, not mlet; port throw/mongets
  before invent-tail RNG.

## D-0011 — `mkcorpstat` skipped timeout restart after special random corpse

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **1194**: C `rn2(1000)` @
  `start_corpse_timeout` vs JS `rn2(8)` (already into next room fill). DIAG:
  random `mksobj` CORPSE picked `PM_LICHEN` → first timeout no-ops; C
  `mkcorpstat` override to trap victim restarts because
  `special_corpse(old)`; JS overrode corpsenm without restart.
- **C locus:** `mkobj.c:start_corpse_timeout`, `special_corpse`,
  `mkcorpstat` ptr-override restart; `mklev.c:mktrap_victim`.
- **Change:** full `start_corpse_timeout` RNG envelope (lizard/lichen,
  `rnz(rot_adjust)`, rider/troll branches); `special_corpse` +
  `mkcorpstat` restart; `age` on `mksobj`; trap-victim `TAINT_AGE` age
  adjust. Timer fire / `zombie_form` still deferred.
- **Verification:** green PASS + strict; seed1500 first mismatch → idx
  **2223** (`m_initinv` vs `m_initinv_tail`); runner 2255/2768, screen 1/40;
  seed0060 2464/3626; full suite 2/44, RNG 26314/792838, screens 109/11405.
- **Lesson:** lichen/lizard/troll/rider random corpses force a second
  `start_corpse_timeout` after `mkcorpstat` override — skipping the restart
  drops the entire `rnz` leaf.

## D-0012 — `is_poisonable` wrongly included daggers

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **2223**: C `rn2(10)` @
  `trquan` (Rogue dagger `ini_inv_adjust_obj`) vs JS `rn2(100)` still inside
  dagger `mksobj_init`. Prior notes misread provenance as `m_initinv`.
- **C locus:** `obj.h:is_poisonable` (missile `oc_skill` in
  `-P_SHURIKEN..-P_BOW`, or `permapoisoned`); `mkobj.c:mksobj_init`
  `is_poisonable && !rn2(100)`.
- **Cause/evidence:** DIAG stack at 2223 was `mksobj_init` poison roll.
  JS listed `DAGGER`/`SPEAR` as poisonable; C does not. Short sword already
  skipped the roll (not in the bad list), so invent matched until dagger.
- **Change:** `js/mkobj.js` `is_poisonable` ≡ `is_multigen` (name-list stand-in
  for the missile skill window); `permapoisoned` (Grimtooth) deferred.
- **Verification:** prefix moved to idx **2240** (sack); after D-0013 →
  **2298**. Green PASS + strict; cohort seed1500 2348/2768, seed0060
  2478/3626; full suite 2/44, RNG 26409/792838, screens 109/11405.
- **Lesson:** trust C macros over “weapons that can be poisoned in play”;
  `trquan` provenance mid-mklev timeline is invent after `makedog`, not
  monster invent.

## D-0013 — starting SACK omitted `mkbox_cnts`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2240** after D-0012: C `rn2(1)` @ `trquan`
  (sack adjust) vs JS already at blindfold `rn2(5)`. C had an extra
  `mkbox_cnts` `rn2(1)` with `n=0` for empty starting sack.
- **C locus:** `mkobj.c:mksobj_init` TOOL_CLASS FALLTHROUGH `SACK` →
  `mkbox_cnts`; `mkbox_cnts` empty-sack when `moves<=1 && !in_mklev` still
  does `rn2(n+1)`.
- **Change:** call `mkbox_cnts` for `SACK`/`OILSKIN_SACK`/`BAG_OF_HOLDING`/
  `ICE_BOX`; port empty-starting-sack `n=0` branch.
- **Verification:** with D-0012; seed1500 first mismatch → idx **2298**
  (`dog_goal`); green + strict PASS; full suite as in D-0012.
- **Lesson:** empty containers can still consume RNG; TOOL_CLASS fallthrough
  into `mkbox_cnts` is not chest-only.

## D-0014 — mineralize always placed gold/gems on `fobj`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2298**: C `rn2(8)` @ `dog_goal` vs JS
  `rn2(100)` (extra `obj_resists`). DIAG: first in-bbox floor object was
  gold on STONE behind a wall — `can_reach_location` false — so JS skipped
  APPORT and rolled `dogfood` on the next object.
- **C locus:** `mklev.c:mineralize` — `!rn2(3) ? add_to_buried : place_object`;
  `mkobj.c:add_to_buried` threads `buriedobjlist`, not `fobj`.
- **Cause:** JS consumed `rn2(3)` but always `place_object`, so buried mineral
  gold stayed on `fobj` and polluted `dog_goal` scans.
- **Change:** `js/mkobj.js` `add_to_buried`; `js/mklev.js` mineralize gold/gem
  branch matches C bury-vs-place; set `ox`/`oy`/`owt` before bury/place.
- **Verification:** idx **2298** `rn2(8)` matches; next break **2300**. Green
  PASS + strict; cohort seed1500 2343/2768, seed0060 2494/3626; full suite
  2/44, RNG 26445/792838, screens 109/11405.
- **Lesson:** RNG-consuming stubs that ignore the branch still change later
  observable state (`fobj` membership), not just the log.

## D-0015 — tainted CORPSE must be POISON in `dogfood`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** after D-0014, JS set `gtyp=CADAVER` over APPORT for room
  corpse (`corpsenm=PM_ORC`, `age=-50` from mklev `age -= TAINT_AGE+1`), then
  entered follow-player `rn2(4)` while C kept APPORT and continued scanning.
- **C locus:** `dog.c:dogfood` — `peek_at_iced_corpse_age(obj)+50 <= moves`
  → POISON (before CADAVER return).
- **Change:** `js/dogmove.js` CORPSE case age check; also port
  `cursed_object_at` into `dog_goal` (was omitted).
- **Verification:** JS no longer takes follow `rn2(4)` here; mismatch is C
  `rn2(100)` vs JS `rn2(5)` @ idx **2300** (3 missing `obj_resists`). Green
  + strict PASS; suite as D-0014.
- **Lesson:** mklev-tainted corpses are intentionally inedible; treating them
  as CADAVER lets food goals clobber APPORT and desync the follow branch.
- **Named omission:** full `poisonous`/`acidic`/`carnivorous` via `mflags1`
  still deferred (age path covers this corpse).

## D-0016 — `mktrap_victim` created loot but never placed it

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2300**: C three extra `obj_resists` before
  `distfleeck`; JS `fobj` bbox had only APPORT gold + tainted CORPSE.
- **C locus:** `mklev.c:mktrap_victim` — `place_object` for trap ammo
  (ARROW/DART/ROCK) and each cursed possession; gnome candle likewise;
  PIT (ex-landmine) uses `breaktest` then dealloc instead of place.
- **Cause:** JS `mksobj`/`mkobj`+`curse` consumed creation RNG but left
  objects off `fobj`, so `dog_goal` never `dogfood`’d them. seed1500 trap
  was DART_TRAP with two possessions (food+gem) → exactly 3 missing scans.
- **Change:** `js/mklev.js` `mktrap_victim` places ammo/possessions/candle;
  local `mktrap_breaktest` for PIT debris (RNG-consuming like C `breaktest`).
- **Verification:** first mismatch **2300→2517** (`dog_move` cursed-square
  `rn2(39)`); runner seed1500 2518/2768, seed0060 2494/3626; green PASS +
  strict; full suite 2/44, RNG 26624/792838, screens 109/11405.
- **Lesson:** levelgen helpers that “create for flavor” without C’s
  `place_object`/`add_to_buried` desync later pet scans even when creation
  RNG already matched.
- **Named omission:** `mkgrave_room` still skips `add_to_buried` for its
  gold/loot; `begin_burn` for unlit gnome candles deferred.

## D-0017 — `dog_move` cursed-square `uncursedcnt` / `cursemsg`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2517**: C `rn2(39)` @ `dogmove.c:1238`
  (`rn2(13*uncursedcnt)` with `uncursedcnt==3`); JS `rn2(1)` (approach
  `!rn2(++chcnt)` — never took the cursed continue).
- **C locus:** `dogmove.c:dog_move` — pre-loop `uncursedcnt` skips
  blocked `MON_AT` and `cursed_object_at`; candidate loop sets
  `cursemsg[i]` on cursed pile objects; then
  `cursemsg[i] && !mleashed && uncursedcnt>0 && rn2(13*uncursedcnt)` continue.
- **Cause:** JS counted every `mfndpos` slot as uncursed and skipped cursed
  food objects without setting `cursemsg`, so the cursed-square RNG never ran.
- **Change:** `js/dogmove.js` `dog_move` ports the count loop, `cursemsg`,
  and cursed continue (food-eat still collapses to immediate move).
- **Verification:** first mismatch **2517→2522** (`next_ident` + WEAPON
  `mksobj_init`); runner seed1500 2526/2768, seed0060 2494/3626; green PASS
  + strict; full suite 2/44, RNG 26664/792838, screens 109/11405.
- **Lesson:** pets’ “avoid cursed unless forced” is two-phase (count then
  probabilistic skip); inventing approach RNG without that skip desyncs
  quietly even when `dog_goal` APPORT already matches.
- **Named omission:** food `goto newdogpos` / eat side effects still partial;
  leash / trap / displace / minion branches deferred.

## D-0018 — pet `postmov` dart trap + `m_cansee` clear_path

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2522**: C `rnd(2)` @ `next_ident` then WEAPON
  `mksobj_init` (`rn2(6)`/`rn2(11)`/`rne(3)`) + erosions +
  `trapeffect_dart_trap`/`thitm`; JS `rnd(5)` from `score_targ`.
- **C locus:** `monmove.c:m_move` → `postmov` → `mintrap`;
  `trap.c:trapeffect_dart_trap` → `t_missile(DART)`; `vision.h:m_cansee` ≡
  `clear_path`. Provenance after approach selection: dart create, not
  `mongets`.
- **Cause:** (1) JS `m_move` returned `dog_move` without `postmov`/`mintrap`.
  (2) `find_targ` stubbed `m_cansee` always-true, so `pet_ranged_attk` scored
  a newt through walls (`rnd(5)`) before the step.
- **Change:** `js/trap.js` dart monster path (`t_at`/`t_missile`/`thitm`/
  `mintrap`); `js/monmove.js` `postmov` after pet `dog_move`;
  `js/vision.js` export `clear_path`/`m_cansee`; `js/dogmove.js` use
  `m_cansee` in `find_targ`/`find_friends`, return `MMOVE_MOVED` when
  stay-put (C).
- **Verification:** first mismatch **2522→2563** (`dog_invent` `rn2(udist)`
  4 vs 10); runner seed1500 2598/2768, seed0060 2494/3626; green PASS +
  strict; full suite 2/44, RNG 26687/792838, screens 109/11405.
- **Lesson:** post-move weapon RNG is often trap ammo (`t_missile`), not
  monster invent; LOS stubs that always see through walls inject
  `score_targ` fuzz RNG before the real caller.
- **Named omission:** non-dart `trapeffect_*`; `thitm` hit/`dmgval`/
  `monkilled`; `stackobj` merge; `dog_invent` real pickup (`mpickobj`).

## D-0019 — cursemsg/--More-- keys + dog_invent pickup + seen-trap skip

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2563**: C `rn2(4)` @ `dog_invent` vs JS
  `rn2(10)` (udist 4 vs 10). Pet stayed put after dart; hero should be
  ortho dx=2 after `k`, but JS hero had walked during pending `--More--`.
- **C locus:** `dogmove.c:dog_move` cursemsg `pline` (reluctantly onto);
  `trap.c:thitm` miss `pline` (almost hit); `dog_invent` `mpickobj` +
  droppables/`rn2(udist+1)`; `mfndpos` `ALLOW_TRAPS` + `seetrap`/`tseen`
  `rn2(40)` skip.
- **Cause:** (1) Missing cursemsg + thitm plines → no `--More--`, so keys
  `l,l,j,j,h,h,.` moved the hero instead of being eaten (udist diverged).
  (2) `dog_invent` only stubbed pickup RNG → no minvent → wrong APPORT
  `rn2(8)` / drop path. (3) No `tseen`/`ALLOW_TRAPS` candidate skip.
- **Change:** cursemsg + thitm miss plines; `obj_extract_self`/`mpickobj`;
  `droppables` + drop RNG; dog_goal lit/`m_cansee` APPORT gates; `seetrap`;
  mfndpos `ALLOW_TRAPS`; dog_move `rn2(40)` skip; CORPSE `doname` corpsenm.
- **Verification:** first mismatch **2563→2618** (wild `m_move` track
  `rn2(20)` vs `rn2(24)`); runner seed1500 **2700/2768**, seed0060
  2493/3626; green PASS + strict; full suite 2/44, RNG **26858**/792838,
  screens 109/11405.
- **Lesson:** message `--More--` is position-critical; invent stubs that
  skip `mpickobj` still break later `dog_has_minvent` gating.
- **Named omission:** `relobj` body; `splitobj`; `couldsee` for
  `in_masters_sight`; full `droppables` tool-keeping; `m_harmless_trap`;
  non-pet `mon_knows_traps` skip in mfndpos.

## D-0020 — mon_allowflags OPENDOOR for nohands/verysmall

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2618**: C `rn2(20)` @ `m_move` track vs JS
  `rn2(24)`. DIAG at mismatch: newt at (70,7) with `cnt=6` including closed
  door (70,8) `D_CLOSED`; C `cnt=5`.
- **C locus:** `mon.c:mon_allowflags` `can_open =
  !(nohands(data)||verysmall(data))`; `mfndpos` skips closed doors without
  `OPENDOOR`.
- **Cause:** JS always `| OPENDOOR`. Newts are verysmall+nohands → must not
  open doors → closed-door neighbors must be omitted from `mfndpos`.
- **Change:** extract `mflags1` (`scripts/extract-monsters.py`);
  `nohands()`; `mon_allowflags` gates `OPENDOOR` on `can_open`.
- **Verification:** first mismatch **2618→2702** (JS log ends after
  wipe_engr; C continues `distfleeck`); runner seed1500 **2702/2768**,
  seed0060 2489/3626; green PASS + strict; full suite 2/44, RNG
  **26889**/792838, screens 109/11405.
- **Lesson:** `mfndpos` cnt is allowflags-sensitive; never grant OPENDOOR
  to all species.
- **Named omission:** full `mon_allowflags` (unlock/bust/dig/bars); 
  `mon_knows_traps` skip; `m_harmless_trap`; `bad_rock` diagonal squeeze.

## D-0021 — missing `doapply` / lock-pick turn (deferred movemon)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first mismatch at idx **2702**: C `distfleeck` after
  wipe_engr; JS RNG log ended. Hypothesis that JS exited early for
  `umovement`/`encumbrance` was **falsified** (DIAG: `cap=0`, `umove_after=12`).
- **Cause:** JS treated `a`/`e`/`l` as unknown / eat / move. C sequence is
  `doapply` → getobj lock pick (`e`) → `pick_lock` direction (`l`) →
  "You see no door there." → `PICKLOCK_LEARNED_SOMETHING` → `ECMD_TIME` →
  following `movemon`. Without that turn, JS deferred the post-`l` monster
  slice until later `s` keys, then stopped one search-turn short of C.
- **C locus:** `apply.c:doapply` (`LOCK_PICK` case); `lock.c:pick_lock`
  non-door branch; `cmd.c:get_adjacent_loc` / `getdir`.
- **Change:** `js/apply.js` + `js/lock.js`; wire `a` in `cmd.js`.
- **Verification:** `rng-diff` seed1500 **RNG OK (2768)**; runner
  2768/2768 RNG, screens 1/40; seed0060 still 2489/3626; green PASS +
  strict; full suite 2/44, RNG **26980**/792838, screens 109/11405.
  seed1800 also RNG OK (2458) in this measure (display still 0/26).
- **Lesson:** free-looking keys can be getobj/getdir replies; attribute
  menus and apply prompts own nhgetch keys. Do not diagnose post-EOT
  `umovement` until key ownership matches C.
- **Named omission:** `feel_location` / `update_mapseen_for` glyph gating
  (no-door always LEARNED/TIME); container-at-feet pick; real door
  lock occupation; non-pick apply tools (sack, etc.).

## D-0022 — `newsym` omitted floor objects; SDOOR drew as `?`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **1/40** with RNG complete. First fail at
  welcome `--More--` (screen idx 1): C showed `%`/`$` on the starting room
  floor and a continuous bottom wall; JS showed floor dots and `└?─…`.
- **Cause:** JS `newsym` painted hero/monster/terrain only — never
  `vobj_at` / `map_object`. Separately, `terrain_glyph` lacked `SDOOR`/
  `SCORR`, so secret doors fell through to default `?`. CORPSE map color
  must use `mon_color(corpsenm)` (orc → CLR_RED), not
  `objects[CORPSE].oc_color` (brown).
- **C locus:** `display.c:newsym` / `_map_location` / `map_object` /
  `back_to_glyph` (SDOOR→wall); `display.h:vobj_at`/`covers_objects`;
  glyph color `mon_color` for `GLYPH_BODY_*`.
- **Change:** `js/display.js` object layer + SDOOR/SCORR; extractor
  `mcolors` + `js/monsters.js` export for corpse colors.
- **Verification:** seed1500 **34/40** screens (RNG 2768); seed1800
  screens **0→10**/26; green PASS + strict; full suite 2/44, RNG
  26980/792838, screens **156**/11405.
- **Lesson:** screen coords use `setCell(x-1, y+1)`; diagnose map glyph
  misses before UI. Object creation RNG matching does not imply objects
  are drawn.
- **Named omission:** trap glyphs in `newsym`; full `wall_angle` for
  SDOOR junctions; pile-top glyph flags; hallucination/`newsym_rn2`.

## D-0023 — tutorial menu was title-centered, not C NHW_MENU offx

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **34/40** after D-0022. First fails at
  idx 2–3: C title at col 21 with full y/n/OPTIONS/(end) menu and cursor
  `[27,6]`; JS centered only the title (`pad=(80-23)/2` → col 28) and left
  leftover text after `n`.
- **Cause:** `ask_do_tutorial` never built a real corner `NHW_MENU`. C
  `tty_end_menu` sets `maxcol = max(strlen+2)` (OPTIONS footer → 59) and
  `offx = max(10, 80-maxcol-1)` → 20; `process_menu_window` paints a
  leading space at offx then text (title via `menu_headings` /
  `ATR_INVERSE` after `adjust_menu_promptstyle(WIN_INVEN)`).
- **C locus:** `options.c:ask_do_tutorial`; `wintty.c:tty_end_menu` /
  `tty_display_nhwindow(NHW_MENU)` / `process_menu_window`;
  `allmain.c`/`options.c` `menu_headings` default inverse.
- **Change:** `js/invent.js` `nhw_menu_geometry` + `paint_corner_nhw_menu`;
  `js/allmain.js:ask_do_tutorial` builds C line order and uses corner paint
  + `docrt` on dismiss.
- **Verification:** seed1500 Scr **36/40** (RNG 2768); seed1800 Scr
  **12/26**; green PASS + strict; full suite 2/44, RNG 26980/792838,
  screens **160**/11405.
- **Lesson:** menu geometry is driven by longest padded line, not title
  centering. Corner menus must not `clearScreen` the map.
- **Named omission:** invent `display_inventory` still fullscreen-clears /
  approximate `xprname`; discoveries class list; enlightenment plname /
  wielded-weapon body; fullscreen `NHW_MENU` path in the new helper.

## D-0024 — invent/doname/discoveries incomplete for Rogue screens

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **36/40** after D-0023. Fails at invent `i`
  (idx 28), discoveries `\` (32), enlightenment `^X` (34–35).
- **Cause:** (1) `display_inventory` used `paint_overlay` `clearScreen` with
  approximate startCol instead of corner `NHW_MENU`; (2) `doname` missed
  empty-container prefix, wield/swapwep suffixes, `potion of X`, and
  implicit-uncursed skip for known charged weapons; (3) `dodiscovered`
  only walked scroll/potion/wand and always used `  ` prefix; missing
  `oc_encountered` and `interesting_to_discover` OBJ_DESCR gate;
  (4) enlightenment lacked plname capitalize and `weapon_insight` lines.
- **C locus:** `invent.c:display_inventory` / `wintty.c` corner menu;
  `objnam.c:doname`; `u_init.c:ini_inv_adjust_obj` cknown;
  `o_init.c:discover_object`/`dodiscovered`/`interesting_to_discover`;
  `insight.c:weapon_insight`.
- **Change:** corner invent via `paint_corner_nhw_menu`; doname prefixes /
  wield strings; container `cknown`; `discover_object(..., encountered)`;
  disco walks `DEF_INV_ORDER` with `*`/`  `; ^X capitalize + wield body.
- **Verification:** seed1500 **PASS** RNG 2768/2768 Scr **40/40** + strict;
  green PASS + strict; seed1800 Scr still **12/26** (RNG 2458); full suite
  **3/44**, RNG 26980/792838, screens **165**/11405.
- **Lesson:** corner invent must keep the map; disco `*` vs spaces is
  `oc_encountered`, and only OBJ_DESCR types are interesting.
- **Named omission:** fullscreen invent path; full `oc_charged`/`oc_skill`
  in objects extractor; full `weapon_descr`/skill table; disco Japanese /
  unique/artifact classes; many enlightenment sections.

## D-0025 — getobj throw/apply: gold suggest + missing-letter loop

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1800 RNG 2458/2458 but screens **12/26**. Diffs: throw
  prompt `[a or ?*]` vs C `[$a or ?*]`; post-throw stale `In what direction?`;
  apply bad letter returned immediately so later keys (`i`/`+`/`\`/`^X`) ran
  as top-level commands while C stayed in getobj/`--More--`.
- **Cause:** (1) `throw_ok` omitted `COIN_CLASS` (C `GETOBJ_SUGGEST`);
  (2) getobj helpers `return null` on missing invlet instead of C `continue`;
  (3) re-prompt never called `flush_topl_more`, so no `--More--`;
  (4) `getdir` left `_pending_message` for the next command-loop capture.
- **C locus:** `dothrow.c:throw_ok` / `dothrow`; `invent.c:getobj` missing
  letter → `You("don't have that object.")` + `continue`; `cmd.c:getdir`.
- **Change:** invent-order `$`+weapons in throw suggest; getobj_throw /
  getobj_apply loop + `flush_topl_more`; clear direction prompt after answer;
  same clear in `lock.js` getdir. `throw_gold` body still deferred.
- **Verification:** seed1800 Scr **24/26** (RNG 2458); green + seed1500 PASS
  + strict lengths; full suite **3/44**, RNG **27161**/792838, screens
  **177**/11405.
- **Lesson:** getobj must loop on missing letters; screen matches are not a
  contiguous prefix (legacy map can fail idx 0 while later frames match).
- **Named omission:** `throw_gold` body; getobj `?`/`*` menus; eat getobj
  still single-shot. (look `:` / legacy map cleared by D-0026.)

## D-0026 — legacy corner map + look staircase feature

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1800 RNG 2458/2458, screens **24/26**. Idx 0: Book text
  matched but room rows blank (no DEC map under menu). Idx 25: `:` gave
  `You see no objects here.` vs C `There is a staircase up out of the
  dungeon here.--More--`.
- **Cause:** (1) `com_pager_legacy` always `clearScreen()`, wiping the map
  that `docrt` had painted; C corner NHW_MENU (`offx>10`) uses
  `process_text_window` which only `cl_end`s from `offx` and leaves lower
  map rows. (2) `dolook` stubbed; C `look_here` → `dfeature_at` →
  `stairs_description` for known Dlvl1 branch stairs with `u_traversed`
  (set in `mklev` after `place_branch`).
- **C locus:** `wintty.c:process_text_window` / `tty_display_nhwindow`
  NHW_MENU; `questpgr.c:deliver_by_window`; `invent.c:dfeature_at` /
  `look_here` / `dolook`; `stairs.c:stairs_description` /
  `known_branch_stairs`; `mklev.c` Dlvl1 `u_traversed`.
- **Change:** corner legacy paints from `offx` without clearing the map;
  `stairway_at` + `stairs_description` + Dlvl1 `u_traversed`; `dfeature_at`
  + `look_here` feature pline (no “no objects” when dfeature present);
  export `an`/`vtense`.
- **Verification:** seed1800 **PASS** 2458/2458 Scr **26/26** + strict;
  green + seed1500 PASS + strict; full suite **4/44**, RNG **27161**/792838,
  screens **179**/11405.
- **Lesson:** corner menus must not fullscreen-clear; look messages come
  from dungeon features before the no-objects fallback.
- **Named omission:** Blind feel path; engraving; multi-object look menu;
  `doname_with_price`; full altar/lava/ice/pool dfeature; Elemental Planes
  amulet destination strings beyond no-amulet Dlvl1 case.

## D-0027 — orc `u_init_race` Xtra_food + `inv_subs`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2341**: C `rn2(1)` @
  `trquan(u_init.c)` after Rogue `!rn2(5)` blindfold check; JS
  `rn2(100)` from `init_attr` (skipped race kit).
- **Cause:** `u_init_race` was human-only no-op. Orc non-wizard path must
  `ini_inv(Xtra_food)` (2× `FOOD_CLASS` `UNDEF_TYP`) before attrs. Race
  substitutions (`inv_subs`) were also absent — `ini_inv_obj_substitution`
  after `mksobj` (Rogue short sword/dagger → orcish; food CRAM/LEMBAS →
  tripe). Weapon `mksobj_init` RNG matched without subs because substitution
  is post-`mksobj` in C.
- **C locus:** `u_init.c:u_init_race` (`PM_ORC`); `Xtra_food[]`;
  `inv_subs[]`; `ini_inv_obj_substitution`; `ini_inv`.
- **Change:** port orc/elf/dwarf/gnome `u_init_race` switch (elf instrument
  `ROLL_FROM`); `Xtra_food`; full `inv_subs` + call from `ini_inv`.
- **Verification:** rng-diff first mismatch **2341 → 2476**; seed0060 runner
  **2489 → 2584**/3626; green + seed1500 + seed1800 PASS + strict; full
  suite **4/44**, RNG **27256**/792838, screens **179**/11405.
- **Lesson:** race kits run after role `ini_inv`; missing `trquan` before
  attrs is the fingerprint. Post-`mksobj` otyp swap does not change creation
  RNG.
- **Named omission:** `ini_inv_mkobj_filter` full reject list (incl. orc
  `RIN_POISON_RESISTANCE`); other roles still throw. (splitobj → D-0028)

## D-0028 — `dog_invent` partial-stack `splitobj` / `next_ident`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2476**: C `rnd(2)` @
  `next_ident(mkobj.c)` after `dog_invent` APPORT rolls; JS `rn2(4)` (took
  whole stack, skipped split).
- **Cause:** nohands pets `can_carry` returns `1` when `quan > 1`. C then
  `splitobj(obj, carryamt)` → `nextoid` → `next_ident` (`rnd(2)`). JS
  stubbed the partial split and picked up the entire floor stack.
- **C locus:** `dogmove.c:dog_invent`; `mkobj.c:splitobj` / `nextoid` /
  `next_ident`.
- **Change:** export real `splitobj` from `js/mkobj.js` (quan/owt, floor
  `nobj`/`nexthere` insert, `next_ident` for child oid); wire
  `dog_invent`; reuse from `dothrow.js` (remove local copy).
- **Verification:** rng-diff first mismatch **2476 → 2643**; seed0060
  runner **2584 → 2761**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27433**/792838, screens **179**/11405.
- **Lesson:** partial-stack pickup is an object-identity/RNG event, not
  just inventory bookkeeping.
- **Named omission:** `nextoid` shop-price oid search; unpaid/`splitbill`;
  timers/light/`copy_oextra`; `relobj` body (→ D-0029).

## D-0029 — `dog_invent` pet `relobj` / `mdrop_obj`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2643**: C `rn2(8)` @
  `dog_goal` APPORT vs JS `rn2(100)` `obj_resists`. Drop RNG at 2640–2641
  matched, but JS never emptied minvent.
- **Cause:** `dog_invent` updated apport/droptime without calling `relobj`.
  `dog_has_minvent` stayed true → APPORT branch skipped. Also
  `add_to_minv` used string `'MINVENT'` and `obj_extract_self` only unlinked
  floor piles.
- **C locus:** `steal.c:relobj` / `mdrop_obj`; `mkobj.c:obj_extract_self`
  (`OBJ_MINVENT`); `dogmove.c:dog_invent`.
- **Change:** `obj_extract_self` minvent unlink + `OBJ_MINVENT` in
  `add_to_minv`; pet-path `mdrop_obj`/`relobj` in `js/dogmove.js` (place on
  floor, optional verbose drop pline); wire from `dog_invent`.
- **Verification:** rng-diff first mismatch **2643 → 2663**; seed0060
  runner **2761 → 2771**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27445**/792838, screens **179**/11405.
- **Lesson:** drop tracking without releasing minvent falsifies every later
  `!dog_has_minvent` gate.
- **Named omission:** `flooreffects` / `stackobj` merge; vault-guard gold;
  worn/saddle/shop/`update_mon_extrinsics` in `mdrop_obj`; `couldsee` for
  `in_masters_sight` → D-0030.

## D-0030 — `dog_goal` `in_masters_sight` via real `couldsee`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2663**: C `rn2(100)`
  `obj_resists` (continued floor scan) vs JS `rn2(8)` APPORT. DIAG at pet
  `(12,12)` / hero `(15,13)`: `couldsee(pet)=false`, lit gate OK, no
  minvent, `m_cansee` OK — stub `in_masters_sight=true` forced the roll.
- **Cause:** `dog_goal` hardcoded `in_masters_sight = true` instead of C
  `couldsee(omx, omy)` (`viz_array & COULD_SEE`). When false, C skips the
  APPORT branch before `rn2(8)` and keeps scanning `fobj`.
- **C locus:** `dogmove.c:dog_goal`; `vision.h:couldsee`.
- **Change:** `js/dogmove.js` imports `couldsee` and sets
  `in_masters_sight = couldsee(omx, omy)`.
- **Verification:** rng-diff first mismatch **2663 → 2979**; seed0060
  runner **2771 → 3039**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27859**/792838, screens **179**/11405.
- **Lesson:** vision stubs that always-true gate RNG-consuming APPORT
  short-circuits; real `couldsee` already existed in `vision.js`.
- **Named omission:** `dog_goal` gettrack/FARAWAY when goal is hero and
  `!in_masters_sight`; next peel @ 2979 is C `exercise` `-rn2(2)` vs JS
  `distfleeck`.

## D-0031 — dokick empty-space `kick_dumb` / `exercise`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2979**: C `rn2(2)`
  `exercise(attrib.c:509)` vs JS `rn2(5)` `distfleeck`. Keys: Ctrl-D
  then `j`; C screen "You kick at empty space." Prefix matched through
  `gethungry` / wipe-engr `rn2(94)`.
- **Cause:** JS had no `#kick` (`dokick`); Ctrl-D was "Unknown command"
  and `j` was ordinary movement, so the turn never called
  `exercise(A_DEX, FALSE)` from `kick_dumb`. Not `exerper` (that runs
  before wipe-engr in the prior EOT block).
- **C locus:** `dokick.c:dokick` / `kick_dumb`; `cmd.c` bind `C('d')`.
- **Change:** `js/dokick.js` — `dokick` + `kick_dumb` (DEX≥16 empty-space
  and low-DEX strain envelope) + open-door→dumb / wall→ouch routing;
  wire Ctrl-D in `js/cmd.js`; export `getdir` from `js/lock.js`.
- **Verification:** rng-diff first mismatch **2979 → 2997**; seed0060
  runner **3039 → 3064**/3626, cursors **18 → 41**/41; green + seed1500
  + seed1800 PASS + strict; full suite **4/44**, RNG **27765**/792838,
  screens **179**/11405.
- **Lesson:** attribute `exercise` after matching EOT often comes from
  the *next* command (kick/search/combat), not `exerper`; use the key
  map and topline before blaming `moves%10`.
- **Named omission:** `kick_monster`/`kick_object`/closed-door Whammm/
  SDOOR-SCORR open rolls/furniture; `martial()`; `wake_nearby`/
  `u_wipe_engr` effects; `losehp`/`set_wounded_legs` bodies; next peel
  @ 2997 diagnosed as missing kick-avoid (D-0032), not missing `distfleeck`.

## D-0032 — seed0060 dog_move cnt 4 vs 3 (missing kick-avoid)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2997**: C `rn2(5)`
  `distfleeck` vs JS `rn2(4)`. Matched through kick `exercise` and
  dog_move `rn2(1/2/3)`.
- **Rejected:** post-kick fleeck/ALLOW_*/missing `distfleeck` body;
  mklev “extra CORR west of pet” / reading C `#` as wall — NetHack `#` is
  corridor; JS and C both have `CORR` at `(22,12)` (screen `#######f@`).
  Diagonal `bad_rock` squeeze does not drop any of the four open
  candidates for a kitten.
- **Cause/evidence:** C `dokick` sets `gk.kickedloc` to the kicked cell
  before resolution; `dog_move` / `m_move` call `m_avoid_kicked_loc` so
  peaceful/tame monsters skip that adjacent cell. Hero kicked south →
  `(24,13)`. JS never set or consulted `kickedloc`, so `mfndpos` kept
  four `appr=0` slots → extra `rn2(4)` before `distfleeck`.
- **C locus:** `dokick.c` (`kickedloc =`); `monmove.c:m_avoid_kicked_loc`;
  `dogmove.c` candidate loop; clear on `hack.c:domove` /
  `cmd.c` non-`dokick` timed commands.
- **Change:** `game.kickedloc` in `dokick`; `m_avoid_kicked_loc` (+ Sokoban
  stub) in `mon.js`; wire into `dog_move`; clear on successful `domove` and
  other timed non-kick commands in `cmd.js`.
- **Verification:** rng-diff first mismatch **2997 → 3016**; seed0060
  runner **3064 → 3086**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27787**/792838, screens **179**/11405.
- **Lesson:** after a kick, compare pet candidate skips to `kickedloc`
  before blaming terrain glyphs; `#` in tty is corridor, not wall.
- **Next:** peel @ **3105** (`maybe_generate_rnd_mon` → `makemon(NULL,0,0)`
  body; C `makemon_rnd_goodpos` vs JS stub falling through to `dosounds`).

## D-0033 — seed0060 missing donull (`.` wait)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3016**: C `rn2(5)`
  `distfleeck` vs JS `rn2(2)`. Matched through kick-avoid turn end
  (3015 = moveloop `rn2(94)`).
- **Rejected:** post-kick pet cell west-vs-south / `mtrack` candidate-skip /
  fleeck arity as the 3016 cause — kick-turn dog_move RNG already matched
  C through 3015; JS’s next call was `exercise` arity 2 (second kick), not
  a wrong `distfleeck` arity.
- **Cause/evidence:** moves include `\u0004j..`; JS `rhack` had no `.`
  branch so wait was “Unknown command” with `context.move=0`. C `donull`
  returns `ECMD_TIME` → monster turns start with `distfleeck` `rn2(5)`.
  Skipping both `.` waits made the next kick’s `exercise` `rn2(2)` land at
  3016. Timed non-kick commands also clear `gk.kickedloc` (`cmd.c`).
- **C locus:** `do.c:donull`; `cmd.c` (`.` → wait; clear `kickedloc` when
  `ECMD_TIME && func != dokick`).
- **Change:** `js/do.js` `donull`; `js/cmd.js` `.` → timed wait + clear
  `kickedloc`. Omit `cmd_safety_prevention` (named in C-JS-MAP).
- **Verification:** rng-diff first mismatch **3016 → 3105**; seed0060
  runner **3086 → 3151**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27922**/792838, screens **179**/11405.
- **Lesson:** when C’s next call is `distfleeck` and JS shows a *different
  function’s* arity (here `exercise`/`rn2(2)`), check whether an intervening
  timed command key (`.` wait) was dropped as unknown.
- **Next:** peel @ **3105** — port `maybe_generate_rnd_mon`’s
  `makemon(NULL,0,0)` path (`makemon_rnd_goodpos` / `rndmonst`).

## D-0034 — seed0060 makemon(NULL,0,0) / makemon_rnd_goodpos

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3105**: C `rn2(77)`
  `makemon_rnd_goodpos` vs JS `rn2(300)` `dosounds`. Matched through
  `maybe_generate_rnd_mon` gate (3104 = `rn2(70)=0`).
- **Cause/evidence:** JS consumed the gate roll then stubbed the body.
  C calls `makemon(NULL,0,0)` → `makemon_rnd_goodpos` (`rn1(COLNO-3,2)` /
  `rn2(ROWNO)`, reject `cansee` when `!in_mklev`) → `rndmonst` → create →
  `G_SGROUP`/`m_initgrp` → invent. Also fixed wrong `MM_NOGRP=2` in
  `monsters.js` (C/`const.js` is `0x2000`) so group suppression matches.
- **C locus:** `allmain.c:maybe_generate_rnd_mon`; `makemon.c:makemon`,
  `makemon_rnd_goodpos`, `m_initgrp`; `teleport.c:enexto_gpflags`.
- **Change:** `js/makemon.js` placement-before-`rndmonst`,
  `makemon_rnd_goodpos`, `m_initgrp`/`G_SGROUP`/`G_LGROUP`, early `fmon`
  link; `js/teleport.js` `enexto_gpflags`; `js/allmain.js` real
  `makemon(null,0,0)`; `js/monsters.js` `G_SGROUP`/`G_LGROUP`, drop fake
  `MM_NOGRP`.
- **Verification:** rng-diff first mismatch **3105 → 3536**; seed0060
  runner **3151 → 3562**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **28497**/792838, screens **179**/11405.
- **Lesson:** for `makemon(NULL,0,0)`, C picks coordinates *before*
  `rndmonst`; stubbing after the spawn gate is not RNG-equivalent.
- **Next:** peel @ **3536** — port `regen_hp` in the once-per-turn block
  before `dosounds`.

## D-0035 — seed0060 losehp + regen_hp (wall kick turn)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3536**: C `rn2(100)`
  `regen_hp` vs JS `rn2(300)` `dosounds`. Step 28 is wall kick
  ("Ouch!  That hurts!") after empty-space kicks; RNG OK through 3535
  (`maybe_generate_rnd_mon` miss).
- **Cause/evidence:** Two coupled gaps. (1) JS `kick_ouch` burned
  `rnd(CON?3:5)` but never applied `losehp`, so `uhp` stayed at max and
  C's `regen_hp` gate never opened. (2) JS once-per-turn block skipped
  `regen_hp` entirely before `dosounds`. Post-ouch session screens can
  still show `HP:11(11)` when same-turn heal equals damage — not proof
  that `losehp` was absent in C.
- **C locus:** `dokick.c:kick_ouch` → `losehp(Maybe_Half_Phys(dmg),…)`;
  `hack.c:losehp`; `allmain.c:regen_hp` / once-per-turn call before
  `dosounds`.
- **Change:** new `js/hack.js` `losehp`/`maybe_half_phys`; `dokick.js`
  applies damage; `allmain.js` `regen_hp` + `interrupt_multi` + call
  site when `uhp < uhpmax` (or mh when Upolyd).
- **Verification:** rng-diff **RNG OK 3626**; seed0060 runner
  **3626**/3626 RNG, Scr **0**/41, cursors **41**/41; green + seed1500
  + seed1800 PASS + strict; full suite **4/44**, RNG **28511**/792838,
  screens **179**/11405.
- **Lesson:** a missing HP mutation can look like a missing EOT RNG call;
  check whether the regen *gate* (`uhp < uhpmax`) can ever be true.
- **Next:** seed0060 screen idx 0 cells (legacy/botl); cursors already match.

## D-0036 — seed0060 orc hpadv + mon_glyph mcolor (screens 0–4)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 RNG **3626**/3626, screens **0**/41 (cursors
  41/41). Idx 0 had three cell diffs: botl `HP:12(12)` vs C `HP:11(11)`,
  and newt `:` color green vs yellow.
- **Cause/evidence:** (1) `roles.js` orc (and elf/dwarf/gnome) lacked
  `hpadv`/`enadv`, so `setup_role_race_from_rc` fell back to human
  `{infix:2}` → Rogue+orc HP **12**; C `role.c` orc is `{1,0,0,1,0,0}` →
  HP **11**. (2) `mon_glyph` used mlet-only `S_LIZARD→CLR_GREEN`; C
  `mons[PM_NEWT].mcolor` is `CLR_YELLOW` (11).
- **C locus:** `role.c` `races[]` orc/elf/dwarf/gnome `hpadv`/`enadv`;
  `attrib.c:newhp`; `display.c` / `mon_color(monsndx)`.
- **Change:** ported race `hpadv`/`enadv` (+ attrmin/attrmax) in
  `js/roles.js`; `mon_glyph` uses `mcolors[mnum]` (pets `CLR_WHITE`).
- **Verification:** seed0060 Scr **5**/41 (idx 0–4 match), RNG still
  **3626**/3626; green + seed1500/1800 PASS + strict; full **4/44**,
  screens **184**/11405 (+5), RNG **28511**/792838.
- **Lesson:** race table stubs that silently inherit human `hpadv` corrupt
  botl on every frame; mlet-only monster colors fail as soon as two
  species share a letter.
- **Next:** seed0060 idx 5+ (invent letter / map wall / downstairs color).

## D-0037 — seed0060 gold doname + mondied newsym (screen 5)

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **5**/41. Idx 5 had
  two cell diffs: topline `"1 gold piece"` vs `"a gold piece"`, and map
  newt cell still `:` (yellow) while C showed floor `·`.
- **Cause/evidence:** (1) `doname` short-circuited `COIN_CLASS` to
  `` `${quan} gold piece` ``; C `doname_base` uses quan==1 article `"a "`
  + xname `"gold piece"`. (2) `mondied` removed the monster from `fmon`
  and zeroed `mx`/`my` without `newsym`, leaving a stale live glyph; C
  `mondead`→`mon_leaving_level` refreshes the cell (newt
  `corpse_chance` was false → floor, not `%`).
- **C locus:** `objnam.c:doname_base`; `mon.c:mondied`/`mondead`/
  `mon_leaving_level`.
- **Change:** `js/objnam.js` coin path uses the shared quan/article
  prefix; `js/mhitm.js` `mondead` keeps coords and calls `newsym`.
  Incomplete `make_corpse` via `mkcorpstat` was tried and **reverted** —
  it cut aggregate RNG by ~900 without a faithful special-case body.
- **Verification:** seed0060 Scr **6**/41 (idx 0–5), RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **4/44**, screens
  **185**/11405 (+1), RNG **28511**/792838.
- **Lesson:** idx-5 `"1"` vs `"a"` was gold English, not invent letters;
  death without `newsym` looks like a lingering live monster. Do not ship
  a partial `make_corpse` that invents `mksobj` RNG.
- **Next:** seed0060 idx 6+ (drop then re-pickup pline / premature wall).

## D-0038 — seed0060 cansee invent pline + wall_angle + downstairs color

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **6**/41. Idx 6 had
  (1) topline extra "The kitten picks up a gold piece." after a drop,
  (2) premature wall `┌` at map (17,14) / screen (16,15), and later
  (3) downstairs `>` yellow vs C NO_COLOR.
- **Cause/evidence:** (1) C `mdrop_obj`/`dog_invent` gate drop/pickup
  plines on `cansee`; a second invent after an extra pet move picks up
  at (13,13) with `cansee=false` — C silent, JS always printed.
  (2) `set_wall_state` was a no-op and `terrain_glyph` mapped wall
  `typ` straight to DEC corners; C `back_to_glyph` uses
  `wall_angle(seenv)` — TLCORNER with `WM_C_OUTER` and seenv=SV0 alone
  yields `S_stone` (blank) until more octants are seen.
  (3) Public recordings paint upstairs `<` CLR_YELLOW and downstairs
  `>` NO_COLOR (not defsym gray for either).
- **C locus:** `steal.c:mdrop_obj`; `dogmove.c:dog_invent`;
  `display.c:set_wall_state`/`xy_set_wall_state`/`wall_angle`/
  `back_to_glyph`.
- **Change:** gate pet drop/pickup plines on `cansee`; port
  `set_wall_state` cluster in `mklev.js`; port `wall_angle` into
  `display.js` terrain glyphs; downstairs `>` uses `NO_COLOR`.
- **Verification:** seed0060 Scr **37**/41 (idx 22/33/35/36 remain),
  RNG **3626**/3626; green + seed1500/1800 PASS + strict; full
  **4/44**, screens **216**/11405 (+31), RNG **28511**/792838.
- **Lesson:** silent out-of-sight invent still mutates state; unfinished
  exterior corners must stay stone until seenv warrants a glyph; do not
  force downstairs to match upstairs yellow.
- **Next:** seed0060 idx 22 (pet `f` vs corridor `#`).

## D-0039 — seed0060 idx 22 pet via orc infravision

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **37**/41. Sole map
  miss at idx 22: C white pet `f` at map (22,12) / term (21,13); JS
  corridor `#`. Pet position and RNG matched; glyph missing.
- **Cause/evidence:** hero at (24,12) in a dark corridor — `cansee(22,12)`
  false (only adjacent night-vision IN_SIGHT), but `couldsee` true.
  Orc race has `M3_INFRAVISION`; kitten has `M3_INFRAVISIBLE`. C
  `newsym` still `display_monster` when `!cansee` via
  `see_with_infrared && mon_visible`. JS `newsym` only drew monsters
  under `cansee`. Also `postmov` omitted C's final
  `newsym(mtmp->mx, mtmp->my)` after `mintrap`.
- **C locus:** `display.h:_see_with_infrared` / `_mon_visible`;
  `display.c:newsym` (!cansee branch); `monmove.c:postmov`;
  `monflag.h` M3_INFRA*; `polyself.c` race Infravision via
  `mons[urace.mnum]`.
- **Change:** extract `mflags3` (`scripts/extract-monsters.py`);
  `infravision`/`infravisible` in `monsters.js`; `newsym` infrared
  path + race Infravision in `display.js`; `postmov` newsym of new
  cell in `monmove.js`.
- **Verification:** seed0060 Scr **38**/41 (idx 22 cleared; 33/35/36
  disco/^X remain), RNG **3626**/3626; green + seed1500/1800 PASS +
  strict; full **4/44**, screens **217**/11405 (+1), RNG
  **28511**/792838.
- **Lesson:** dark-corridor pet glyphs for orcs are infrared, not FOV;
  do not treat `!cansee` as “draw terrain only” when sensing macros
  exist. Extract full M3 flags before inventing race hardcodes.
- **Next:** seed0060 idx 33 disco class layout (then ^X idx 35–36).

## D-0040 — seed0060 idx 33 disco OBJ_DESCR / obj_typename

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **38**/41. idx 33
  disco menu showed only elven/orcish dagger + potion + sack; C listed
  full orc racial knowledge (short sword, arrow, bow, spear, armor).
- **Cause/evidence:** `knows_object` already registered the orcish
  types. `interesting_to_discover` requires `OBJ_DESCR != NULL`; JS
  only knew a tiny FIXED_DESCRS / scroll-potion-wand map, so most
  orcish weapons/armor were filtered out. After extracting descrs,
  naming still mismatched (`uruk hai` / bare `sickness`) until
  `obj_typename` used `OBJ_NAME` + class prefixes.
- **C locus:** `objclass.h:OBJ_DESCR`/`OBJ_NAME`; `objects.c`
  `OBJECTS_DESCR_INIT`; `o_init.c:interesting_to_discover` /
  `dodiscovered`; `objnam.c:obj_typename`.
- **Change:** `scripts/extract-objects.py` emits `objectDescrs` +
  `objectNameStrs`; `invent.js` disco uses real descr gate +
  `obj_typename`; `u_init.js:has_descr` uses `objectDescrs`.
- **Verification:** seed0060 Scr **39**/41 (idx 33 cleared; 35–36
  ^X remain), RNG **3626**/3626; green + seed1500/1800 PASS +
  strict; full **4/44**, screens **218**/11405 (+1), RNG
  **28511**/792838.
- **Lesson:** discovery UI needs the full `obj_descr[]` table, not
  seed-shaped appearance maps. Prefer extractor fields over FIXED_*
  hand lists.
- **Next:** seed0060 idx 35–36 enlightenment (autopickup, attr
  limits, weapon_descr skill naming).

## D-0041 — seed0060 idx 35–36 ^X enlightenment

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **39**/41. idx 35–
  36 (^X) mismatched Autopickup (`off` vs `on for '$' plus thrown`),
  race attr limits (`(current; limit:18/50)` etc.), and weapon lines
  (`orcish short sword` vs skill `short sword`).
- **Cause/evidence:** `doattributes` hard-coded Autopickup off and
  plain attr numbers; `weapon_descr` used otyp display name instead of
  C `P_NAME(weapon_type(uwep))`. Session rc has
  `autopickup,pickup_types:$`; orc `ATTRMAX` differs from human 18 /
  `STR18(100)`.
- **C locus:** `insight.c` `basics_enlightenment` autopickup /
  `one_characteristic` / `weapon_insight`; `weapon.c` `weapon_descr` /
  `weapon_type` / `skill_name`; `attrib.h` `ATTRMAX`.
- **Change:** extract `oc_skill` in objects table; invent.js
  autopickup from flags, attr limit paren, `weapon_type`/`skill_name`
  /`weapon_descr` via skill category.
- **Verification:** seed0060 Scr **41**/41 PASS, RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **5/44**, screens
  **220**/11405 (+2), RNG **28511**/792838.
- **Lesson:** enlightenment text is option/race/skill semantics, not
  invent layout. Prefer `oc_skill` + `P_NAME` over otyp strings for
  wield descriptions.
- **Next:** next unported role `u_init_role`, or seed0013 Lua/`sp_lev`.

## D-0042 — Wizard `u_init_role` + `ini_inv_mkobj_filter` + Dark One gender

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  seed2200 still diverges later in mklev.
- **Observed:** **29/44** sessions threw `u_init_role: role not ported
  (Wizard)` (≈10 Wizard sessions). After port, **20/44** role throws
  remain (no Wizard). seed2200 rng-diff first mismatch moved from throw
  → idx **199** (missing Dark One `rn2(100)`) → idx **1283**
  (`choose_trapnote` vs `rnd(4)`).
- **Cause/evidence:** Wizard kit was absent; scaffold lacked pantheon/
  attrs/`hpadv`/`enadv`/`neminum`. Random UNDEF wand/ring/potion/scroll/
  book needed C `ini_inv_mkobj_filter` (reject list + `oc_level` +
  `Skill_W` discipline). Dark One has no fixed gender →
  `role_init` `rn2(100)<50`. Cloak wear/`a_ac` needed for AC:9.
- **C locus:** `u_init.c` `Wizard[]` / `u_init_role` / `ini_inv` /
  `ini_inv_mkobj_filter` / `Skill_W` / `restricted_spell_discipline`;
  `role.c` Wizard entry + `role_init` nemesis gender; `objclass.h`
  `oc_level`/`a_ac`.
- **Change:** extract `a_ac`/`oc_level`; Wizard roles + inventory +
  filter + `Skill_W`; cloak wear + `find_ac` via `a_ac`;
  `role_init_nemesis_gender` for random-gender nemeses.
- **Verification:** green + seed1500/1800/0060 PASS + strict; seed2200
  RNG **2756**/3018 Scr **1**/230 (prefix **1283**); full **5/44**,
  screens **239**/11405 (+19), RNG **44848**/792838; role throws
  **20**/44.
- **Omissions named:** `initialspell`; full `role_init` beyond nemesis
  gender; other role kits; seed2200 `choose_trapnote` (next peel).
- **Lesson:** unlocking a role is identity + inventory filter + any
  role_init RNG the nemesis gender path consumes — not kit tables alone.
- **Next:** peel seed2200 idx 1283 `choose_trapnote`, or next unported
  role (Priest/Knight clear 4 throws each).

## D-0043 — Priest `u_init_role` + pantheon `randrole` + shield wear

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Priest sessions still diverge later in mklev/moveloop.
- **Observed:** **20/44** role throws after D-0042; 4 Priest sessions
  threw. After port, **17/44** remain (no Priest). seed0501 rng-diff
  prefix **1153** (`wipeout_text`); seed0106 **2566** (`dog_move`);
  seed0030 advances past Priest into Knight throw.
- **Cause/evidence:** Priest kit absent; Priest has no fixed deities →
  `role_init` pantheon loop `randrole` until a role with `lgod`; JS
  roles[] had Ranger before Rogue (wrong pantheon indices) and lacked
  gods on scaffold roles; random SPBOOK needed `Skill_P`; SMALL_SHIELD
  needed `is_shield`/`W_ARMS` wear for AC.
- **C locus:** `u_init.c` `Priest[]` / `Lamp[]` / `Skill_P` /
  `u_init_role` / `ini_inv_use_obj` shield; `role.c` Priest entry +
  pantheon selection + `SPE_LIGHT`→`P_CLERIC_SPELL`; roles[] order.
- **Change:** C-ordered roles[] + pantheon gods on all roles; Priest
  attrs/`hpadv`/`enadv`/`neminum`; `role_init_pantheon` + SPE_LIGHT
  override; Priest inventory + Magicmarker/Lamp + `knows_object(POT_WATER)`;
  `Skill_P` in filter; shield wear + `uarms`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; seed2200
  prefix still **1283**; full **5/44**, screens **240**/11405 (+1),
  RNG **50470**/792838; role throws **17**/44.
- **Omissions named:** `initialspell`; helm/gloves/boots wear paths;
  other role kits; seed0501 `wipeout_text`; seed0106 dog_move.
- **Lesson:** Priest unlock is pantheon RNG + correct roles[] indices/
  gods, not inventory alone — missing gods on other roles would
  over-consume `randrole`.
- **Next:** Knight `u_init_role` (5 throws), or seed2200
  `choose_trapnote`, or seed0501 makeniche engraving.

## D-0044 — Knight `u_init_role` + knows_class + helm/gloves wear

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Knight sessions still diverge later in mklev (`mkclass_aligned`).
- **Observed:** **17/44** role throws after D-0043; 5 Knight sessions
  threw (seed0103/0104/4500/5006 + seed0030 at Knight). After port,
  **13/44** remain (no Knight). seed0103 rng-diff prefix **1185**
  (`mkclass_aligned` vs `rn2(398)`); seed0030 advances past Knight into
  Samurai throw.
- **Cause/evidence:** Knight kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `knows_class(WEAPON/ARMOR)` walks
  `bases[]` (all non-magic, incl. polearms for Knight; skip
  CORNUTHAUM/DUNCE_CAP/SMALL_SHIELD). Helmet/gloves needed
  `ini_inv_use_obj` `W_ARMH`/`W_ARMG` wear (also boots path). Intrinsic
  `HJumping |= FROMOUTSIDE` for chess-like mobility.
- **C locus:** `u_init.c` `Knight[]` / `Skill_K` / `u_init_role` /
  `knows_class` / `ini_inv_use_obj` helm/gloves/boots; `role.c` Knight
  entry; `youprop.h` `HJumping`.
- **Change:** Knight roles attrs/`hpadv`/`enadv`/`initrecord`; Knight
  inventory; `Skill_K` in `skills_for_role`; bases[] `knows_class` for
  Knight; helm/gloves/boots wear + `uarmh`/`uarmg`/`uarmf` clear;
  `HJumping |= FROMOUTSIDE`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **243**/11405 (+3), RNG **58004**/792838; role
  throws **13**/44; seed0103 RNG **2126**/2640 Scr **0**/60 (prefix
  **1185**); seed0104 **2401**/3223 Scr **1**/43.
- **Omissions named:** `skill_init` still stubbed (Skill_K table only);
  `initialspell`; other role kits; seed0103 `mkclass_aligned`; seed2200
  `choose_trapnote`; seed0501 `wipeout_text`.
- **Lesson:** Knight unlock needs full-class discovery + armor-slot wear
  beyond suit/shield/cloak — helm/gloves were already a named Priest
  omission and block correct AC.
- **Next:** Samurai `u_init_role` (4 throws), or seed0103
  `mkclass_aligned`, or seed2200/seed0501 mklev peels.

## D-0045 — Samurai `u_init_role` + Japanese discovery + ammo quiver

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Samurai sessions still diverge later (mklev / moveloop).
- **Observed:** **13/44** role throws after D-0044; 4 Samurai throws
  (seed0017/0107/0700 + seed0030 at Samurai). After port, **10/44**
  remain (no Samurai). seed0700 rng-diff prefix **1718**
  (`mkclass_aligned`); seed0017 **2672** / seed0107 **2652**
  (`u_calc_moveamt`); seed0030 advances past Samurai into Healer throw.
- **Cause/evidence:** Samurai kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `knows_class` for Samurai matches Knight
  (bases[] weapons+armor, incl. polearms). Optional Blindfold `!rn2(5)`.
  Japanese-name items pre-discovered via `Japanese_item_name` loop
  (skip `oc_magic`). YA ammo needed `is_ammo` quiver path (not dart-only
  `is_missile` name list).
- **C locus:** `u_init.c` `Samurai[]` / `Skill_S` / `u_init_role` /
  `knows_class` / `ini_inv_use_obj` ammo; `objnam.c` `Japanese_items` /
  `Japanese_item_name`; `role.c` Samurai entry; `obj.h` `is_ammo`.
- **Change:** Samurai roles attrs/`hpadv`/`enadv`/`initrecord`; Samurai
  inventory + Blindfold; `Skill_S` in `skills_for_role`; bases[]
  `knows_class` for Samurai; `Japanese_item_name` + discovery loop;
  `is_ammo`/`is_missile` via `oc_skill` for quiver.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **245**/11405 (+2), RNG **65208**/792838; role
  throws **10**/44; seed0700 RNG **1731**/3230 Scr **1**/51.
- **Omissions named:** `skill_init` still stubbed; display-path Japanese
  names in `obj_typename`/`doname`; other role kits; seed0700/0103
  `mkclass_aligned`; seed2200 `choose_trapnote`; seed0501 `wipeout_text`.
- **Lesson:** Samurai unlock needs Japanese pre-discovery + real ammo
  quiver semantics, not kit tables alone — YA would otherwise sit
  unwielded and skew invent/AC screens.
- **Next:** Valkyrie/Healer/Ranger (2 throws each; Healer also seed0030),
  or shared `mkclass_aligned`, or seed2200/0501 mklev peels.

## D-0046 — Healer `u_init_role` + gold `rn1` + Lamp + full-healing know

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Healer sessions still diverge later (mklev trap peels).
- **Observed:** **10/44** role throws after D-0045; 2 dedicated Healer
  throws (seed0016 + seed0030). After port, **8/44** remain (no Healer).
  seed0016 rng-diff prefix **1341** (`hole_destination`); seed0030
  **5127** (`choose_trapnote`). seed0002 already past init (prefix
  unchanged at 1652).
- **Cause/evidence:** Healer kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C sets `u.umoney0 = rn1(1000, 1001)`, optional
  Lamp `!rn2(25)`, and `knows_object(POT_FULL_HEALING)`. Kit uses typed
  spellbooks (no UNDEF SPBOOK filter path); gloves `+1` via `trspe`.
- **C locus:** `u_init.c` `Healer[]` / `Skill_H` / `u_init_role`
  `PM_HEALER`; `role.c` Healer entry.
- **Change:** Healer roles attrs/`hpadv`/`enadv`/`initrecord`; Healer
  inventory + Lamp + gold `rn1` + `POT_FULL_HEALING` know; `Skill_H` in
  `skills_for_role`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **251**/11405 (+6), RNG **67533**/792838; role
  throws **8**/44; seed0016 RNG **2258**/3656 Scr **0**/36.
- **Omissions named:** `skill_init` / `initialspell` still stubbed;
  other role kits; seed0016 `hole_destination`; seed0030/2200
  `choose_trapnote`; seed0700/0103 `mkclass_aligned`; seed0501
  `wipeout_text`.
- **Lesson:** Healer unlock is mostly kit + money RNG; do not invent
  Tourist-shaped inventory or skip `rn1(1000,1001)` gold.
- **Next:** Valkyrie/Ranger (2 throws each), or remaining 1-throw roles,
  or shared mklev peels (`mkclass_aligned` / `choose_trapnote` /
  `hole_destination` / `wipeout_text`).

## D-0047 — Valkyrie `u_init_role` + Lamp + weapon/armor `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Valkyrie sessions still diverge later (mklev peels).
- **Observed:** **8/44** role throws after D-0046; 2 dedicated Valkyrie
  throws (seed0015 + seed0105). After port, **6/44** remain (no Valkyrie).
  seed0015 rng-diff prefix **337** (`lspo_map`); seed0105 **974**
  (`wipeout_text`).
- **Cause/evidence:** Valkyrie kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `ini_inv(Valkyrie)` (spear+1, dagger,
  small shield+3, food ration), optional Lamp `!rn2(6)`, and
  `knows_class(WEAPON_CLASS)` (excludes polearms) + `knows_class(ARMOR_CLASS)`.
  JS `knows_class` bases[] walk had to admit Valkyrie (was Knight/Samurai
  only).
- **C locus:** `u_init.c` `Valkyrie[]` / `Skill_V` / `u_init_role`
  `PM_VALKYRIE` / `knows_class`; `role.c` Valkyrie entry.
- **Change:** Valkyrie roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  Valkyrie inventory + Lamp + weapon/armor `knows_class`; `Skill_V` in
  `skills_for_role`; `knows_class` gate includes `PM_VALKYRIE`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **252**/11405 (+1), RNG **68885**/792838; role
  throws **6**/44; seed0015 RNG **364**/8563 Scr **1**/44; seed0105
  RNG **988**/2499 Scr **0**/30.
- **Omissions named:** `skill_init` still stubbed; Ranger/Monk/
  Archeologist/Barbarian/Caveman kits; seed0015 `lspo_map`; seed0105/
  0501 `wipeout_text`; seed0700/0103 `mkclass_aligned`; seed2200/0030
  `choose_trapnote`; seed0016 `hole_destination`.
- **Lesson:** Valkyrie unlock needs bases[] `knows_class` with polearm
  skip — do not leave the Knight/Samurai-only gate or skip the Lamp
  `rn2(6)` branch.
- **Next:** Ranger (2 throws), or remaining 1-throw roles, or shared
  mklev peels.

## D-0048 — Ranger `u_init_role` + launcher/ammo/spear `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Ranger sessions still diverge later (moveloop / mklev peels).
- **Observed:** **6/44** role throws after D-0047; 2 dedicated Ranger
  throws (seed0101 + seed0102). After port, **4/44** remain (no Ranger:
  Monk/Archeologist/Barbarian/Caveman). seed0101 rng-diff prefix
  **2293** (`next_ident`); seed0102 **1281** (`rndmonst_adj`).
- **Cause/evidence:** Ranger kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `ini_inv(Ranger)` (dagger+1, bow+1, two
  arrow stacks, cloak of displacement+2, cram×4) and
  `knows_class(WEAPON_CLASS)` filtered to launchers/ammo/spears via
  `is_launcher`/`is_ammo`/`is_spear` (not full weapon class).
- **C locus:** `u_init.c` `Ranger[]` / `Skill_Ran` / `u_init_role`
  `PM_RANGER` / `knows_class`; `obj.h` launcher/ammo/spear macros;
  `role.c` Ranger entry.
- **Change:** Ranger roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  Ranger inventory; `Skill_Ran` in `skills_for_role`; `knows_class`
  admits `PM_RANGER` with launcher/ammo/spear filter; added
  `is_launcher`/`is_spear` helpers.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405 (+4), RNG **72474**/792838; role
  throws **4**/44; seed0101 RNG **2304**/2371 Scr **3**/27; seed0102
  RNG **1285**/4485 Scr **1**/25.
- **Omissions named:** `skill_init` still stubbed; Monk/Archeologist/
  Barbarian/Caveman kits; seed0101 `next_ident`; seed0102
  `rndmonst_adj`; seed0015 `lspo_map`; seed0105/0501 `wipeout_text`;
  seed0700/0103 `mkclass_aligned`; seed2200/0030 `choose_trapnote`;
  seed0016 `hole_destination`.
- **Lesson:** Ranger `knows_class` is not full-weapon discovery — port
  the launcher/ammo/spear filter; do not reuse Valkyrie/Knight's
  broader walk.
- **Next:** Monk/Archeologist/Barbarian/Caveman (1 throw each), or
  shared mklev/moveloop peels.

## D-0049 — Monk `u_init_role` + spellbook RNG + armor `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Monk sessions still diverge later (`lspo_map` / early peels).
- **Observed:** **4/44** role throws after D-0048; 1 dedicated Monk
  throw (seed0200). After port, **3/44** remain (Archeologist/
  Barbarian/Caveman). seed0200 rng-diff prefix **377** (`lspo_map`);
  positional RNG **1545**/3822.
- **Cause/evidence:** Monk kit absent; scaffold lacked attrs/`hpadv`/
  `enadv`/`initrecord=10`. C `ini_inv(Monk)` (gloves+2, robe+1, random
  scroll, healing×3, rations/fruit/cookies) then
  `ini_inv(M_spell[rn2(90)/30])` (Healing/Protection/Confuse Monster),
  Magicmarker `!rn2(4)` else Lamp `!rn2(10)`, `knows_class(ARMOR)`,
  `knows_object(SHURIKEN)`.
- **C locus:** `u_init.c` `Monk[]` / `M_spell` / `Skill_Mon` /
  `u_init_role` `PM_MONK` / `knows_class`; `role.c` Monk entry.
- **Change:** Monk roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  Monk inventory + spellbook extras; `Skill_Mon` in `skills_for_role`;
  `knows_class` admits `PM_MONK` for armor walk.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405, RNG **74019**/792838; role throws
  **3**/44; seed0200 RNG **1545**/3822 Scr **0**/40.
- **Omissions named:** `skill_init` / `initialspell` still stubbed;
  Archeologist/Barbarian/Caveman kits; seed0200/0015 `lspo_map`;
  seed0105/0501 `wipeout_text`; seed0700/0103 `mkclass_aligned`;
  seed2200/0030 `choose_trapnote`; seed0016 `hole_destination`;
  seed0101 `next_ident`; seed0102 `rndmonst_adj`.
- **Lesson:** Monk spell choice is `rn2(90)/30` (three books), not a
  free `rn2(3)`; Magicmarker precedes Lamp with distinct odds.
- **Next:** Archeologist/Barbarian/Caveman (1 throw each), or shared
  mklev/moveloop peels.

## D-0050 — Archeologist `u_init_role` + tin opener/lamp/marker + SACK/TOUCHSTONE

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Archeologist session still diverges later (`hole_destination`).
- **Observed:** **3/44** role throws after D-0049; 1 dedicated
  Archeologist throw (seed0361). After port, **2/44** remain
  (Barbarian/Caveman). seed0361 rng-diff prefix **1280**
  (`hole_destination`); positional RNG **2478**/53865.
- **Cause/evidence:** Archeologist kit absent; scaffold lacked attrs/
  `hpadv`/`enadv`/`initrecord=10`. C `ini_inv(Archeologist)` (whip+2,
  leather jacket, fedora, rations×3, pick-axe, tinning kit, touchstone,
  sack) then Tinopener `!rn2(10)` else Lamp `!rn2(4)` else Magicmarker
  `!rn2(5)`, `knows_object(SACK/TOUCHSTONE)` — no `knows_class`.
- **C locus:** `u_init.c` `Archeologist[]` / `Skill_A` / `u_init_role`
  `PM_ARCHEOLOGIST`; `role.c` Archeologist entry.
- **Change:** Archeologist roles attrs/`hpadv`/`enadv`/`initrecord`/
  titles; Archeologist inventory + optional tool chain; `Skill_A` in
  `skills_for_role`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405, RNG **76497**/792838; role throws
  **2**/44; seed0361 RNG **2478**/53865 Scr **0**/366.
- **Omissions named:** `skill_init` still stubbed; Barbarian/Caveman
  kits; seed0361/0016 `hole_destination`; seed0200/0015 `lspo_map`;
  seed0105/0501 `wipeout_text`; seed0700/0103 `mkclass_aligned`;
  seed2200/0030 `choose_trapnote`; seed0101 `next_ident`; seed0102
  `rndmonst_adj`.
- **Lesson:** Archeologist optional extras are a three-way else-if chain
  (tin opener → lamp → marker), not independent rolls; discovery is
  object-specific, not a class walk.
- **Next:** Barbarian/Caveman (1 throw each), or shared mklev/moveloop
  peels.

## D-0051 — Barbarian `u_init_role` + kit RNG + Lamp + weapon/armor `knows_class`

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Barbarian session still diverges later (`choose_trapnote`).
- **Observed:** **2/44** role throws after D-0050; 1 dedicated
  Barbarian throw (seed0373). After port, **1/44** remains (Caveman).
  seed0373 rng-diff prefix **1327** (`choose_trapnote`); positional
  RNG **2277**/35386.
- **Cause/evidence:** Barbarian kit absent; scaffold lacked attrs/
  `hpadv`/`enadv`/`initrecord=10`. C `rn2(100)>=50` →
  `ini_inv(Barbarian_0)` (two-handed sword, axe, ring mail, ration)
  else `Barbarian_1` (battle-axe, short sword, ring mail, ration),
  then Lamp `!rn2(6)`, `knows_class(WEAPON)` excluding polearms +
  `knows_class(ARMOR)`.
- **C locus:** `u_init.c` `Barbarian_0`/`Barbarian_1` / `Skill_B` /
  `u_init_role` `PM_BARBARIAN`; `role.c` Barbarian entry.
- **Change:** Barbarian roles attrs/`hpadv`/`enadv`/`initrecord`/
  titles; both kit tables + Lamp; enable `PM_BARBARIAN` in
  `knows_class` bases[] walk; `Skill_B` in `skills_for_role`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **256**/11405, RNG **78774**/792838; role throws
  **1**/44; seed0373 RNG **2277**/35386 Scr **0**/124.
- **Omissions named:** `skill_init` still stubbed; Caveman kit;
  seed0373/2200/0030 `choose_trapnote`; seed0361/0016
  `hole_destination`; seed0200/0015 `lspo_map`; seed0105/0501
  `wipeout_text`; seed0700/0103 `mkclass_aligned`; seed0101
  `next_ident`; seed0102 `rndmonst_adj`.
- **Lesson:** Barbarian weapon kit uses `rn2(100)>=50` (not `rn2(2)`)
  per C comment about skewed generators; polearm exclusion matches
  Valkyrie `knows_class` path.
- **Next:** Caveman (last role throw), or shared mklev/moveloop peels.

## D-0052 — Caveman `u_init_role` + `Cave_man[]` + FLINT/ROCK quiver

- **Status:** fixed (verified 2026-07-13) for role-init throw clearance;
  Caveman session still diverges later (GEM `rnd_class` sum).
- **Observed:** **1/44** role throws after D-0051; 1 dedicated
  Caveman throw (seed1150). After port, **0/44** remain.
  seed1150 rng-diff prefix **1118** (`rnd_class` C `rnd(999)` vs JS
  `rnd(1000)`); positional RNG **2937**/3137 Scr **22**/51.
- **Cause/evidence:** Caveman kit absent; scaffold lacked attrs/
  `hpadv`/`enadv`/`initrecord=10`. C `ini_inv(Cave_man)` only (club+1,
  sling+2, flint 10–20 stacks, rock ×3 merges to 18..33, leather);
  **no** `knows_class`/Lamp. Also needed `ini_inv_use_obj` to quiver
  FLINT/ROCK (C includes them beside WEAPON/`is_weptool`) and
  graystone quan=1 except FLINT in `ini_inv_adjust_obj`.
- **C locus:** `u_init.c` `Cave_man[]` / `Skill_C` / `u_init_role`
  `PM_CAVE_DWELLER` / `ini_inv_use_obj` / `ini_inv_adjust_obj`;
  `role.c` Caveman entry.
- **Change:** Caveman roles attrs/`hpadv`/`enadv`/`initrecord`/titles;
  `Cave_man` trop table; `Skill_C` in `skills_for_role`; FLINT/ROCK
  quiver + graystone quan fix in shared `ini_inv_*` helpers.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **278**/11405, RNG **81711**/792838; role throws
  **0**/44; seed1150 RNG **2937**/3137 Scr **22**/51.
- **Omissions named:** `skill_init` still stubbed; seed1150 GEM
  `oclass_prob_totals` off-by-one; seed0373/2200/0030
  `choose_trapnote`; seed0361/0016 `hole_destination`; seed0200/0015
  `lspo_map`; seed0105/0501 `wipeout_text`; seed0700/0103
  `mkclass_aligned`; seed0101 `next_ident`; seed0102 `rndmonst_adj`.
- **Lesson:** Caveman flint/rock are GEM ammo that must still enter
  the quiver path; rock quantity comes from outer trop count ×
  `mksobj` `rn1(6,6)`, not a single trop quan range.
- **Next:** shared mklev/moveloop peels, or GEM prob-total 999 vs 1000.

## D-0053 — `mkclass`/`mkclass_aligned` + Wizard `A_NONE` extractor

- **Status:** fixed (verified 2026-07-13) for makeniche iron-bars
  human-corpse selection; later peels remain.
- **Observed:** seed0700/0103 first mismatch was C `rn2(9)` @
  `mkclass_aligned` vs JS `rn2(398)` stub in `makeniche`. After real
  `mkclass` alone, prefix stuck at ~1723 because Wizard of Yendor had
  extractor fallback difficulty **0**, scrambling `mongen_order`.
- **Cause/evidence:** (1) JS burned a single `rn2(398)` instead of
  C `mkclass(S_HUMAN,0)` → `mkclass_aligned` (per-candidate `rn2(9)`
  hell/nohell mask, `montoostrong` `rn2(2)` break, weighted `rnd(num)`).
  (2) `extract-monsters.py` LVL regex rejected `A_NONE`, so WoY used
  the zeroed fallback and sorted first among humans.
- **C locus:** `makemon.c` `mkclass`/`mkclass_aligned`/`mk_gen_ok`/
  `init_mongen_order`; `mklev.c` `makeniche`; `mondata.h`
  `is_placeholder`; `monsters.h` Wizard `LVL(..., A_NONE)`.
- **Change:** port `mkclass`/`mkclass_aligned` (+ mongen_order,
  `mk_gen_ok`, `is_placeholder`, `G_IGNORE`); wire `makeniche`; parse
  `A_NONE`/`A_*` in monster extractor and regenerate
  `monsters_data.js`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **279**/11405, RNG **82967**/792838; seed0700
  prefix **1888** (`rndmonst_adj`); seed0103 **2337**
  (`next_ident`/`trquan`); positional seed0700 **2769**/3230,
  seed0103 **2344**/2640.
- **Omissions named:** `mkclass` alignment/`G_IGNORE` callers beyond
  niche (e.g. `ndemon`); `m_initinv` body; seed0700 `rndmonst_adj`
  weight arity; seed0103 pony/makemon invent; `choose_trapnote` /
  `hole_destination` / `wipeout_text` / `lspo_map`; SPBOOK_no_NOVEL
  (later D-0055).
- **Lesson:** a wrong extracted difficulty is enough to desync
  `mkclass` even when the control-flow port looks right — falsify
  table data early when `rn2(9)` count before `rn2(2)` is short.
- **Next:** peel `rndmonst_adj` (seed0700) or pony invent
  (seed0103), or other shared mklev blockers.

## D-0054 — `maketrap` `choose_trapnote` + `hole_destination`

- **Status:** fixed (verified 2026-07-13) for SQKY_BOARD note pick and
  HOLE/TRAPDOOR destination RNG; fuller `maketrap` still partial.
- **Observed:** seed2200/0030/0373 first mismatch C `rn2(12)` @
  `choose_trapnote` vs JS skipping to mktrap victim `rnd(4)`.
  seed0016/0361 C `rn2(4)` @ `hole_destination` vs same JS `rnd(4)`.
- **Cause/evidence:** JS `maketrap` was a push-only stub — never set
  `tnote` or `dst`, so squeaky-board and hole traps omitted C RNG.
- **C locus:** `trap.c` `choose_trapnote` / `hole_destination` /
  `dng_bottom` / `maketrap` switch for `SQKY_BOARD` and
  `HOLE`/`TRAPDOOR`.
- **Change:** port helpers into `js/trap.js`; export real `maketrap`;
  `mklev` imports it. Quest/Gehennom `dng_bottom` cutoffs included;
  overwrite/furniture/statue/boulder/shop/terrain morph named omissions.
- **Verification:** green + seed1500/1800/0060 PASS + strict; seed2200
  prefix **1283→2724**; seed0016 **1341→2493**; seed0373 **1327→1401**
  (pre-D-0055); seed0361 **1280→1432**.
- **Lesson:** missing `maketrap` switch arms look like “wrong next
  call” arity drift at the victim gate — check trap-type RNG before
  fill_ordinary_room.
- **Next:** D-0055 cleared the follow-on SPBOOK misread; peel
  moveloop/`rndmonst_adj`/`peace_minded` next.

## D-0055 — `mkobj(SPBOOK_no_NOVEL)` → `rnd_class` through blank paper

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed1150/0030 (and post-D-0054 seed0373) showed
  C `rnd(999)` @ `rnd_class` vs JS `rnd(1000)`. Notes wrongly called
  this GEM `oclass_prob_totals`.
- **Cause/evidence:** C `SPBOOK_no_NOVEL` is `-SPBOOK_CLASS`; `mkobj`
  uses `rnd_class(bases[SPBOOK], SPE_BLANK_PAPER)` (sum **999**, novel
  prob 1 excluded). JS used fake class `11`, remapped to
  `SPBOOK_CLASS`, and rolled the full class total **1000**. Statue
  book path also used bare `SPBOOK_CLASS`.
- **C locus:** `objclass.h` `SPBOOK_no_NOVEL`; `mkobj.c` `mkobj`;
  `objnam.c` `rnd_class`; `mklev.c` supply-chest `extra_classes`.
- **Change:** `mkobj` honors `SPBOOK_no_NOVEL`; mklev uses
  `0 - SPBOOK_CLASS` and passes it through; statue path matches.
- **Verification:** green + cohort PASS; full **5/44**, screens
  **290**/11405, RNG **85043**/792838; seed1150 prefix **1118→2301**
  (`peace_minded`), positional **2941**/3137; seed0030 **5127→6305**;
  seed0373 **1327→2512**; seed2200 positional **2772**/3018.
- **Lesson:** provenance `rnd_class` + arity 999 is spellbook-without-
  novel, not gem totals — check `mkobj` fake-class branches before
  retuning `setgemprobs`.
- **Next:** D-0056 cleared Caveman `peace_minded` arity; peel
  seed0700 `rndmonst_adj` / seed2200 `exercise` / seed1150
  `dog_move` @ 2915.

## D-0056 — roles[] `initrecord` match C (Caveman/Valkyrie/Rogue)

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed1150 first mismatch C `rn2(16)` @
  `peace_minded` vs JS `rn2(26)` — same call site, wrong arity.
- **Cause/evidence:** C `role.c` `initrecord` after `xlev`: Caveman
  **0**, Valkyrie **0**, Rogue **10**. JS had Caveman/Valkyrie **10**
  and Rogue **0**. `u_init` copies `urole.initrecord` into
  `u.ualign.record`; `peace_minded` rolls `rn2(16 + record)`.
- **C locus:** `role.c` roles[] `initrecord`; `makemon.c`
  `peace_minded`; `u_init.c` ualign init.
- **Change:** `js/roles.js` initrecord: Caveman 10→0, Valkyrie
  10→0, Rogue 0→10.
- **Verification:** green + seed1500/1800/0060 PASS + strict;
  seed1150 rng-diff prefix **2301→2915** (`dog_move`); positional
  **2941→2942**/3137 Scr 22/51; full **5/44**, screens **290**,
  RNG **85042**/792838. Rogue cohort still PASS (paths rarely hit
  co-aligned `peace_minded` with the bad Rogue record).
- **Lesson:** landmarks that say “initrecord 10” for every combat
  role are wrong — read the field after `/* Energy */` (=xlev) in
  `role.c`. Wrong record looks like a `peace_minded` formula bug.
- **Next:** seed0700 `rndmonst_adj` @ 1888 (likely `align_shift`);
  seed2200 `exercise` @ 2724; seed1150 `dog_move` @ 2915;
  seed0103 `next_ident`/`trquan` @ 2337.

## D-0057 — CORPSE `mksobj_init` `undead_to_corpse` + `G_NOCORPSE` retry

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0700/0361 first mismatch after a complete z1
  `rndmonst_adj` ending at `rn2(21)`: C `rn2(3)` (new `rndmonst_adj`)
  vs JS `rn2(2)` (`mksobj` gender). NOTES guessed `align_shift`.
- **Cause/evidence:** DoD is `alignment = "unaligned"` → `align_shift`
  returns 0; z1 pool freq-only totals are 3…21 for both. C
  `mksobj_init` CORPSE does
  `do { corpsenm = undead_to_corpse(rndmonnum()); } while (mvitals &
  G_NOCORPSE)` (tryct 50). Grid bug is in the z1 eligible set with
  `G_NOCORPSE`; when reservoir picks it, C burns a second full
  `rndmonst_adj`. JS took one `rndmonnum()` and fell through to
  gender `rn2(2)`. Also missing `allmain` mvitals init
  (`mvflags = geno & G_NOCORPSE`).
- **Rejected:** `align_shift` / `temperature_shift` as the seed0700
  arity gap on ordinary DoD dlvl1 (AM_NONE, temperature 0).
- **C locus:** `mkobj.c` `mksobj_init` FOOD/CORPSE; `mon.c`
  `undead_to_corpse`; `allmain.c` mvitals init.
- **Change:** `js/mon.js` `undead_to_corpse`; `js/allmain.js` mvitals
  init; `js/mkobj.js` CORPSE retry + TIN `undead_to_corpse`/`mvitals`
  check.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **290** RNG **85090**/792838; seed0700 prefix
  **1888→2733** (`u_calc_moveamt`); seed0361 **1432→2924** (`newhp`);
  positional seed0700 **2796**/3230, seed0361 **2972**/53865.
- **Lesson:** after a matching `rndmonst_adj` that ends at newt/`rn2(21)`,
  the next `rn2(3)` vs `rn2(2)` is often a **second** `rndmonnum` from
  CORPSE retry — not dungeon align. seed0102 @ 1281 after egg
  `!rn2(3)` is still the EGG `can_be_hatched` multi-retry peel.
- **Next:** seed0700 `u_calc_moveamt` @ 2733; seed0361 `newhp` @
  2924; seed0102 egg `can_be_hatched`; seed2200 `exercise` @ 2724;
  seed1150 `dog_move` @ 2915.

## D-0058 — `adjabil` L1 Fast + `u_calc_moveamt` `rn2(3)`

- **Symptom:** seed0700 rng-diff @ **2733**: C `rn2(3)` @
  `u_calc_moveamt` vs JS `rn2(200)` @ `dosounds`.
- **Cause/evidence:** Samurai `sam_abil[]` grants `HFast` at level 1
  via `adjabil(0,1)` in `u_init_misc` (also Monk L1 Fast; Rogue
  Stealth; etc.). JS never called `adjabil` and omitted the
  Fast/Very_fast branches in `u_calc_moveamt`, so the first EOT after
  matching `maybe_generate_rnd_mon` jumped straight to dosounds.
  Tourist has no L1 Fast → green sessions unaffected.
- **Rejected:** dosounds arity reorder / missing fountain rolls as the
  primary gap at 2733 (C provenance is explicitly `u_calc_moveamt`).
- **C locus:** `attrib.c` `adjabil`/`role_abil`/`sam_abil`;
  `u_init.c` `u_init_misc`; `allmain.c` `u_calc_moveamt`;
  `youprop.h` Fast/Very_fast.
- **Change:** `js/attrib.js` innate tables + `adjabil`/`Fast`/
  `Very_fast`; `js/u_init.js` `adjabil(0,1)` before `ulevel=1`;
  `js/allmain.js` Fast/Very_fast `rn2(3)` in `u_calc_moveamt`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **291** RNG **85494**/792838; seed0700 prefix
  **2733→3141** (`rnl`/`doopen_indir`); positional **3146**/3230
  Scr **2**/51; seed0017 **2831**/3465 prefix **2711** (`m_move`).
- **Lesson:** role L1 intrinsics are not optional flavor — Fast changes
  every EOT RNG for Samurai/Monk. Port `adjabil` with the full innate
  tables, not a Samurai-only HFast hardcode.
- **Next:** seed0700 `rnl`/`doopen_indir` @ 3141; seed0361 `newhp` @
  2924; seed0102 egg `can_be_hatched`; seed2200 `exercise` @ 2724;
  seed1150 `dog_move` @ 2915.

## D-0059 — `rnl` + autoopen `doopen_indir`

- **Symptom:** seed0700 rng-diff @ **3141**: C `rnl(20)` @
  `doopen_indir` vs JS `rn2(7)`.
- **Cause/evidence:** Walking into a CLOSED door with default
  `flags.autoopen` runs `hack.c` → `doopen_indir` → `rnl(20)` then
  (on resist) `exercise(A_STR)`. JS `domove` only treated closed doors
  as blocked (`move=0`) with no open attempt, so the next unrelated
  call (`rn2(7)`) sat at 3141. Three consecutive `l` resists in the
  session each emit only `rnl`+`exercise` and do **not** advance T.
- **Rejected:** treating the arity gap as pet/`distfleeck` reorder
  before the door bump; inventing a turn-consuming open on resist.
- **C locus:** `rnd.c` `rnl`; `lock.c` `doopen_indir`; `hack.c`
  `test_move` autoopen; `attrib.c` `acurrstr`/`exercise`.
- **Change:** `js/rng.js` `rnl` (Luck bias + logged internal `rn2`);
  `js/attrib.js` exported `acurrstr`; `js/lock.js` `doopen_indir`
  CLOSED success/resist; `js/cmd.js` autoopen wiring in `domove`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85803**/792838; seed0700 prefix
  **3141→3207** (`m_move`); positional **3229**/3230 Scr **2**/51;
  seed0030 **6876**/105529 Scr **39**/1953.
- **Omissions named:** interactive `o`/`doopen` getdir; `b_trapped`/
  autounlock/mapseen/`feel_newsym` detail; display-stream RNG still
  absent.
- **Lesson:** missing shared wrappers (`rnl`) look like late combat
  arity bugs when walk-into-door never consumes the open RNG.
- **Next:** seed0700 `m_move` @ 3207; seed0361 `newhp` @ 2924;
  seed0102 egg `can_be_hatched`; seed2200 `exercise` @ 2724;
  seed1150 `dog_move` @ 2915.

## D-0060 — `mfndpos` BOULDER + `NODIAG`

- **Symptom:** seed0700 rng-diff @ **3207**: C `rn2(16)` @
  `m_move` track skip vs JS `rn2(20)` (same site). seed0017 @ **2711**:
  C `rn2(16)` vs JS `rn2(32)`.
- **Cause/evidence:** (1) Newt at (65,4) had a corridor boulder neighbor;
  C `mfndpos` skips `sobj_at(BOULDER)` without `ALLOW_ROCK`, so
  `cnt=4` → `rn2(4*(cnt-j))=rn2(16)`. JS included the boulder cell
  (`cnt=5` → `rn2(20)`). (2) Grid bugs use `NODIAG(PM_GRID_BUG)` —
  C omits diagonals (`cnt=4`); JS allowed all 8 neighbors (`cnt=8` →
  `rn2(32)`).
- **Rejected:** inventing `appr`/`mtrack` order hacks; treating arity as
  a dog_move/`distfleeck` reorder (prefix through pet + fleeck matched).
- **C locus:** `mon.c` `mfndpos` / `mon_allowflags`; `hack.h` `NODIAG`;
  `mondata.h` `throws_rocks`/`passes_walls`.
- **Change:** `js/mon.js` boulder skip + `ALLOW_ROCK` bit; `NODIAG`
  diagonal reject; `mon_allowflags` sets `ALLOW_ROCK` for
  `throws_rocks`/`passes_walls`. `js/monsters.js` helpers + flags.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86026**/792838; seed0700 RNG
  **3230**/3230 Scr **2**/51; seed0017 prefix **2711→2775**
  positional **2840**/3465; seed0030 **7021**/105529.
- **Omissions named:** `m_can_break_boulder`; mfndpos pool/lava/garlic/
  `bad_rock` squeeze / temple / iron bars; `ALLOW_WALL`; hostile
  `m_avoid_kicked_loc` wiring.
- **Lesson:** `m_move` track `rn2(4*(cnt-j))` arity is an `mfndpos`
  candidate-count bug — dump `cnt`/`j`/neighbor objects before
  rewriting approach logic.
- **Next:** seed0700 screen peel (RNG full); seed0361 `newhp` @ 2924;
  seed0017 @ 2775; seed0102 egg; seed2200 `exercise`; seed1150
  `dog_move`.

## D-0061 — `newhp`/`newpw` level-up + `#levelchange`

- **Symptom:** seed0361 rng-diff @ **2924**: C `rnd(8)` @
  `newhp(attrib.c:1101)` vs JS `rn2(12)`. seed0373 @ **2512**: C
  `rnd(10)` vs JS `rn2(7)`.
- **Cause/evidence:** Provenance is the **level-up** branch (lornd), not
  init. Wizard tours type `#levelchange` → `20` → `wiz_level_change` →
  `pluslvl(FALSE)` loop. JS had only ulevel==0 `newhp`/`newpw`, no
  `pluslvl`, and `#` was an unknown command. Follow-on: Barbarian
  stalled at xlev because `setup_role_race_from_rc` omitted `xlev`
  (defaulted to 14 while C Barbarian is 10). Extcmd autocomplete must
  truncate-at-cursor like C NEWAUTOCOMP (append-after-expand garbled
  `levelchange`).
- **Rejected:** treating 2924 as init `newhp`/`rn2(12)` trap arity;
  Tourist-shaped level-up stubs; seed-specific level tables.
- **C locus:** `attrib.c` `newhp`; `exper.c` `newpw`/`enermod`/`pluslvl`;
  `wizcmds.c` `wiz_level_change`; `cmd.c` `doextcmd`;
  `win/tty/getline.c` `tty_get_ext_cmd`/`ext_cmd_getlin_hook`;
  `role.c` `roles[].xlev`.
- **Change:** `js/attrib.js` full `newhp` + async `adjabil` gainstr;
  `js/exper.js` `newpw`/`pluslvl`; `js/getline.js` `getlin`/`doextcmd`;
  `js/wizcmds.js` `wiz_level_change`; `js/cmd.js` `#`; `js/roles.js`
  `xlev` on all roles; `u_init` copies `xlev`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86020**/792838; seed0361 prefix
  **2924→2975** (`dosearch0`) positional **3044**/53865; seed0373
  **2512→2549** (`getbones`) positional **2573**/35386.
- **Omissions named:** `#levelchange` `losexp` drain; full `extcmdlist`;
  `pluslvl` achievements/livelog/`newuexp`/Upolyd; `adjabil` lose/
  `postadjabil`/`add_weapon_skill`.
- **Lesson:** tour peels after moveloop_preamble are often wizard
  `#levelchange`, not mklev; copy every RoleAdvance sibling field
  (`xlev`) when building `game.urole`.
- **Next:** seed0361 `dosearch0`/`rnl` @ 2975; seed0700 screen peel;
  seed0373 `getbones` @ 2549; seed0017 @ 2775; egg `can_be_hatched`.

## D-0062 — `dosearch0` + Searching autosearch

- **Symptom:** seed0361 rng-diff @ **2975**: C `rnl(8)` @
  `dosearch0(detect.c:2079)` vs JS `rn2(300)` dosounds.
- **Cause/evidence:** Archeologist L1 `HSearching` (via `adjabil`) makes
  C call `dosearch0(1)` every EOT when an adjacent unseen trap exists
  (`!rnl(8)`). JS never called `dosearch0` (search `s` only burned a
  turn; moveloop omitted Searching).
- **Rejected:** treating 2975 as a dosounds arity bug; seed-specific
  trap coordinates; implementing only the `s` command without EOT
  Searching.
- **Follow-on (not this unit):** after matching through wipe @ 2978,
  JS rhack reads wish-text `…blessed…` as commands (`e`/`s`) because
  **`^W` / wizard wish is unported** — next seed0361 peel is wish
  getlin, not another dosearch bug.
- **C locus:** `detect.c` `dosearch0`/`find_trap`/`cvt_sdoor_to_door`;
  `allmain.c` Searching EOT; `youprop.h` Searching; `cmd.c`/`detect.c`
  `dosearch`.
- **Change:** new `js/detect.js`; `Searching()` in `attrib.js`; EOT
  call in `allmain.js`; `s` + `continue_search` → `dosearch`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86037**/792838; seed0361 prefix
  **2975→2979** (wish-text `s`) positional **3051**/53865; seed0700
  RNG still full; seed0102 still egg @ 1281.
- **Omissions named:** feel_location/Blind/unmap_invisible; mfind0
  body; Hallucination/cls map_trap wait; activate_statue_trap; artifact
  SPFX_SEARCH fund; cmd_safety_prevention; warnreveal; `^W` wish.
- **Lesson:** L1 Searching roles (Arc/Ran) need EOT `dosearch0` even
  when the player never presses `s`; silent when no adjacent
  SDOOR/SCORR/unseen trap.
- **Next:** see D-0063 — first post-dosearch peel was `T` takeoff,
  not wish; wish follows once `TcTd` is consumed.

## D-0063 — `dotakeoff` (`T`) delay-0 armor

- **Symptom:** seed0361 rng-diff @ **2979**: C `rn2(5)` @
  `distfleeck` (post-takeoff turn) vs JS `rnl(8)` Searching. Key map
  is `TcTd\e^Wblessed…`; JS had no `T`, so `^W`/`blessed` leaked and
  `l`/`s` from the wish string became move/search.
- **Cause/evidence:** C `dotakeoff` — with 2 worn pieces (fedora +
  leather jacket) first `T` prompts getobj (`c` = fedora), second `T`
  auto-removes the remaining piece (`Narmorpieces == 1`). JS treated
  `T` as unknown.
- **Rejected:** claiming @ 2979 was solely `^W` wish (wish keys start
  at RNG **3011** after both takeoffs); treating wish-text `s` as the
  first peel without checking `TcTd`.
- **C locus:** `do_wear.c` `dotakeoff`/`count_worn_stuff`/
  `armor_or_accessory_off`/`armoroff`/`Helmet_off`/`Armor_off`/
  `off_msg`; `cmd.c` `'T'` → `dotakeoff`.
- **Change:** new `js/do_wear.js`; `cmd.js` `'T'` → `dotakeoff`.
  Delay-0 path only (`oc_delay` not in objects extractor); fedora
  Archeologist `change_luck(-1)`; accessories/cursed/layering basics.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **86053**/792838; seed0361 prefix
  **2979→3011** (`next_ident` wish mksobj) positional **3054**/53865;
  seed0700 RNG still full.
- **Omissions named:** `oc_delay`/occupation `afternmv`; full
  `Helmet_off` magic helms; dragon armor; `setworn` prop side-effects;
  `ParanoidRemove`; welded/Glib glove gates; `A` takeoffall;
  **`^W`/`makewish`/`readobjnam`**.
- **Lesson:** after `#levelchange`, tour keys often strip armor before
  wizard wishes — missing `T` looks like wish-text leak at a later
  index.
- **Next:** `^W` `wiz_wish`/`makewish`/`readobjnam` for seed0361 @
  3011; or shared `getbones`/`^V` / egg / seed0700 screen.

## D-0064 — `^W` wish / `makewish` / `readobjnam` (seed0361 trio)

- **Symptom:** seed0361 rng-diff @ **3011**: C `rnd(2)` `next_ident`
  (Grayswandir `mksobj`) vs JS `rn2(5)` (wish text still leaked into
  rhack as movement/search).
- **Cause/evidence:** C `C('w')` → `wiz_wish` → `makewish` →
  `readobjnam` for `blessed +5 Grayswandir`, then SDSM, then ALS.
  JS had no `^W` binding and no wish parser. SDSM path is
  `name_to_monplus("silver dragon")` + `rnd_otyp_by_namedesc("scale
  mail")` (`rn2(67)`) then `SCALE_MAIL`→SDSM remap — not a direct
  full-name `rnd_otyp` (`rn2(1)`).
- **Rejected:** matching SDSM via exact `"silver dragon scale mail"`
  `rnd_otyp` (wrong arity); skipping `rn2(nartifact_exist())` in
  wizard mode (C still evaluates the `||` left side).
- **C locus:** `wizcmds.c` `wiz_wish`; `zap.c` `makewish`;
  `objnam.c` `readobjnam`/`rnd_otyp_by_namedesc`/`wishymatch`;
  `mondata.c` `name_to_monplus`; `artifact.c` `artifact_name`/
  `touch_artifact`/`nartifact_exist`; `do_name.c` `oname`;
  `invent.c` `hold_another_object`; `cmd.c` `C('w')`.
- **Change:** artifact extractor + `js/artifact.js`/`do_name.js`/
  `mondata.js`/`readobjnam.js`/`zap.js`; `wiz_wish`; `cmd.js` `^W`;
  `hold_another_object` + exported `addinv`; doname `named`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85938**/792838; seed0361 prefix
  **3011→3035** (`w` wield `touch_artifact`) positional **3087**/53865;
  seed0700 RNG still full; seed0108 wishlist positional **2690**.
- **Omissions named:** full `readobjnam` (fruits/traps/terrain/
  random/`o_ranges`/alt spellings/Japanese wish); `wishcmdassist`/
  history; livelog; `observe_object` beyond `dknown`; blast
  `losehp` in `touch_artifact`; `encumber_msg`; `#wizwish` extcmd;
  `w`/`W` wield/wear; `bane_applies`; artifact intrinsics on wield.
- **Lesson:** dragon scale mail wishes go through monster-name strip
  + generic `scale mail` probabilistic match, then otyp remap — do
  not short-circuit to the final otyp in `rnd_otyp_by_namedesc`.
- **Next:** `w`/`dowield` (seed0361 @ 3035) or shared
  `getbones`/`^V` / egg / seed0700 screen.

## D-0065 — `w`/`dowield` Grayswandir (seed0361)

- **Symptom:** seed0361 rng-diff @ **3035**: C `rn2(4)`
  `touch_artifact` vs JS `rn2(7)` (unknown-`w` desync).
- **Cause/evidence:** Session keys `wi` after wish trio. C
  `dowield` → `getobj` letter `i` → `ready_weapon` →
  `retouch_object` → `touch_artifact`. Neutral Archeologist +
  lawful Grayswandir → `badalign` → `rn2(4)` gate (`spfx` has
  `SPFX_RESTR|SPFX_HALRES`, not `SPFX_INTEL`). JS had no `'w'`
  binding.
- **Rejected:** treating wish-time `hold_another_object`
  `touch_artifact` (@ 3017) as the only touch — wield retouches
  again (@ 3035).
- **C locus:** `wield.c` `dowield`/`ready_weapon`/`setuwep`/
  `welded`; `artifact.c` `retouch_object`/`touch_artifact`;
  `cmd.c` `'w'`.
- **Change:** `js/wield.js` + `cmd.js` `'w'`; `retouch_object` in
  `artifact.js`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85896**/792838; seed0361 prefix
  **3035→3073** (`W` wear) positional **3103**/53865; seed0700
  RNG still full.
- **Omissions named:** `cantwield` poly; `cant_wield_corpse`;
  bimanual+shield; `will_weld` pline body; `doswapweapon`; quiver
  ynq; count-split/`finish_splitting`; `arti_speak`/
  `artifact_light`; `pushweapon`; blast `d()`/`losehp` when
  `rn2(4)==0`; silver-hate/bane in `retouch_object`; full
  `setworn` props; `W`/`dowear`.
- **Lesson:** alignment-restricted non-intelligent artifacts still
  roll `rn2(4)` on every retouch (wish and wield), not only once.
- **Next:** `W`/`dowear` (seed0361 @ 3073 SDSM) or shared
  `getbones`/`^V` / egg / seed0700 screen.

## D-0066 — `W`/`dowear` SDSM delay occupation (seed0361)

- **Symptom:** seed0361 rng-diff @ **3073**: C `rn2(5)`
  `distfleeck` vs JS `rn2(7)` (unknown-`W` then `j` as move).
- **Cause/evidence:** Session keys `Wj` after wield. C `dowear` →
  getobj `j` (SDSM) → `accessory_or_armor_on` → `setworn` +
  `nomul(-oc_delay)` with SDSM `oc_delay=5`. Moveloop skips
  `nhgetch` while `multi < 0`, attributing all 5 dressing turns
  (+ pet fleeck) to the `j` keystroke. JS lacked `'W'` and
  negative-`multi` occupation.
- **Rejected:** fleeck arity / pet geometry as the first cause —
  without wear, `j` was a south move with different pet path.
- **C locus:** `do_wear.c` `dowear`/`canwearobj`/
  `accessory_or_armor_on`/`Armor_on`; `worn.c` `setworn`;
  `hack.c` `nomul`/`unmul`; `allmain.c` `multi < 0`;
  `objects.h` `oc_delay`; `cmd.c` `'W'`.
- **Change:** extractor `oc_delay`; `js/do_wear.js` wear path;
  `js/hack.js` `nomul`/`unmul`; `js/allmain.js` occupation;
  `cmd.js` `'W'`.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85752**/792838; seed0361 prefix
  **3073→3259** (`P` puton) positional **3262**/53865; seed0700
  RNG still full.
- **Omissions named:** `P`/`doputon` accessory bodies; `setworn`
  oc_oprop/extrinsic props; `dragon_armor_handling`; doff
  `oc_delay` occupation; poly/weld/trap `canwearobj` gates;
  `A` takeoffall; ring hand yn.
- **Lesson:** armor `oc_delay` is not optional for parity —
  delayed donning consumes multiple turns without further keys,
  and those turns share the selection keystroke's RNG segment.
- **Next:** `P`/`doputon` (seed0361 @ 3259 ALS) or shared
  `getbones`/`^V` / egg / seed0700 screen.

## D-0067 — `P`/`doputon` ALS put-on (seed0361)

- **Observed:** `seed0361-archeologist-tour`, first mismatch **3259**
  (`dog_move` `rn2(12)` vs JS `rn2(100)`).
- **Cause/evidence:** Session keys `Pk` after SDSM wear. C `doputon`
  → getobj → `accessory_or_armor_on` → `Amulet_on` (ALS is a no-op
  case + `on_msg`/`prinv`). JS lacked `'P'`, so `P`/`k` leaked into
  rhack. ALS puton itself emits no RNG; the turn's pet `dog_move`
  follows.
- **Rejected:** fleeck/dog_move formula as the first cause — without
  puton, keys never reached the post-puton movemon segment.
- **C locus:** `do_wear.c` `doputon`/`accessory_or_armor_on`/
  `Amulet_on`/`on_msg`; `worn.c` `setworn`; `invent.c` `prinv`;
  `objnam.c` amulet `(being worn)`; `cmd.c` `'P'`.
- **Change:** `js/do_wear.js` puton/amulet/ring-hand path;
  `js/cmd.js` `'P'`; `js/objnam.js` worn amulet/ring suffixes.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **295** RNG **85792**/792838; seed0361 prefix
  **3259→3292** (`getbones`) positional **3295**/53865; seed0700
  RNG still full; seed0373 still `getbones` @ 2549.
- **Omissions named:** Ring_on learnring/attribs; Blindf_on
  specials; amulet change/strangle/sleep/flying/breathing bodies;
  ring Glib/cursed-gloves/welded gates; `setworn` oc_oprop;
  `dragon_armor_handling`; doff `oc_delay`; `A` takeoffall.
- **Lesson:** missing command letters look like late pet RNG gaps;
  confirm the key map (`Pk`) before peeling fleeck arity.
- **Next:** shared `getbones` (seed0361 @ 3292 / seed0373 @ 2549)
  or egg `can_be_hatched` / seed0700 screen.

## D-0068 — EGG can_be_hatched multi-retry

- **Status:** fixed
- **Observed:** seed0102 first mismatch @ **1281**: C continues
  `rndmonst_adj` `rn2(3)` (second `rndmonnum` in egg loop); JS
  `rn2(6)` after a one-shot stub. seed0361/0373 `getbones` @
  3292/2549 diagnosed as unbound `^V` → Quest `makemaz` (not a
  getbones body bug) — pivoted to egg.
- **Rejected:** getbones early-return / `flags.bones` — JS stub
  already emits `rn2(3)` when reached; tours never call `mklev`
  again without level-tele. CORPSE `G_NOCORPSE` retry — different
  peel (D-0057); egg is separate.
- **C locus:** `mkobj.c` `mksobj_init` EGG; `mon.c` `can_be_hatched`
  / `dead_species` / `BREEDER_EGG`; `mondata.c` `little_to_big` /
  `big_to_little` / `grownups`; `mondata.h` `lays_eggs` /
  `M1_OVIPAROUS`.
- **Cause:** typed-egg path must loop `can_be_hatched(rndmonnum())`
  until hatchable (or tryct); oviparous path consumes `!rn2(77)`.
  Stub broke after one `rndmonnum`.
- **Change:** `js/mon.js` `can_be_hatched`/`dead_species`;
  `js/mondata.js` grownups + growth helpers; `js/monsters.js`
  `M1_OVIPAROUS`/`lays_eggs`; `js/mkobj.js` real EGG retry loop.
- **Verification:** green + seed1500/1800/0060 PASS + strict; full
  **5/44** screens **296** RNG **90837**/792838; seed0102 prefix
  **1281→4451** (`dog_goal`) positional **4459**/4485 Scr **2**/25;
  seed0700 RNG still full.
- **Omissions named:** `egg_type_from_parent`; hatch timers;
  `^V`/`level_tele`/`goto_level`/`makemaz`/`splev`.
- **Lesson:** when Notes say getbones but C never reaches `mklev`,
  check command bindings (`^V`) and special-level prerequisites
  before patching the stub that already matches.
- **Next:** seed0102 `dog_goal` @ 4451, or other shared peels;
  getbones waits on level-tele + special levels.

## D-0069 — seed0102 dog_goal udist / fireassist `f` key ownership

- **Status:** fixed
- **Observed:** seed0102 first mismatch @ **4451**: C `rn2(4)` @
  `dog_goal:575`; JS `rn2(100)` (invent `dogfood`/`obj_resists`).
- **Rejected:** APPORT/`can_carry` on LARGE_BOX; rewriting `dog_goal`
  appr; auto-submit unique `#` extcmds (broke seed0361); naïve
  `'f'`→`dofire` without fireassist (made `l` a real shot ~4442).
- **C locus:** `dothrow.c` `dofire` fireassist → `cmdq` `doswapweapon`
  + `dofire`; `wield.c` `ready_weapon`/`prinv` → `--More--` eats
  `l`/`i`; Esc ends More; swap `ECMD_TIME` then canned getdir;
  `dogmove.c` `dog_goal` `udist>1` → `rn2(4)` once hero stays put.
- **Cause:** Ranger starts with dagger wielded / bow in swap / arrows
  quivered. C `f` queues swap+retry; swap `prinv` shows
  `b - a +1 bow (weapon in right hand).--More--`; `l`/`i` bell in
  `more()`; Esc continues; turn passes; getdir then `+`/Esc cancel.
  JS treated unbound `f` as unknown then `l` as east move →
  `udist==1` → skipped `rn2(4)`.
- **Change:** `js/wield.js` `doswapweapon`/`setuswapwep`/
  `ammo_and_launcher`; `js/dothrow.js` fireassist `cmdq`;
  `js/cmd.js` `'f'`→`dofire` + canned `rhack` pop; `#name`/
  `docallcmd` stubs kept from prior peel.
- **Verification:** seed0102 RNG **4485/4485** (screen 0/25);
  green + seed1500/1800/0060 PASS + strict; full **5/44**,
  RNG **90863**/792838, screens **294**/11405.
- **Lesson:** fireassist swap More owns direction letters before
  getdir; do not bind bare `dofire` when launcher is only in
  `uswapwep`. Late `dog_goal` `udist` often means an earlier leaked
  movement key.
- **Next:** seed0102 **screen** peel (More/prinv display), or
  seed0017 @ 2775 / seed0700 screens.

## D-0070 — seed0102 map glyphs + prinv period

- **Status:** fixed
- **Observed:** seed0102 RNG full but Scr **0/25**. Persistent cells:
  kobold `?` vs C `k` (CLR_BROWN); sink `?` vs C `{` (CLR_WHITE).
- **C locus:** `defsym.h` MONSYM (`S_KOBOLD`→`'k'`); PCHAR
  (`S_sink`→`'{'` CLR_WHITE, fountain/throne/altar/grave); `invent.c`
  `prinv` → `xprname(..., dot=TRUE)` trailing period.
- **Cause:** `mon_glyph` MLET_CH covered only dog/feline/rodent/lizard/
  human → unknown mlets rendered `'?'`. `terrain_glyph` defaulted
  furniture (typ SINK=30 etc.) to `'?'`. `xprname` omitted `dot`, so
  fireassist swap More lacked `hand).--More--`.
- **Change:** `js/display.js` full MONSYM `MLET_CH` + furniture
  cases in `terrain_glyph`; `js/objnam.js` `xprname(..., dot)`;
  prinv callers in wield/do_wear/invent pass `dot=true`.
- **Verification:** seed0102 Scr **0→17**/25 (RNG still full);
  green + seed1500/1800/0060 PASS + strict; full **5/44**,
  RNG **90863**/792838, screens **311**/11405.
- **Named omission:** (retired by D-0071) Book overlay / cmdassist.
- **Next:** seed0017 @ 2775 / seed0700 screens / shared peels.

## D-0071 — seed0102 cmdassist help_dir + Book NHW_MENU offx

- **Status:** fixed
- **Observed:** seed0102 RNG full, Scr **17/25**. Scr 15: JS
  topline `cmdassist:…--More--` vs C fullscreen direction grid;
  later screens desynced because getdir **retried** after invalid
  keys and ate `\`, `^X`, etc. Scr 0: map glyphs under Book text
  (`k`, extra walls) where C blanks.
- **C locus:** `cmd.c` `getdir`/`help_dir`/`show_direction_keys`;
  `wintty.c` `tty_putstr` (`maxcol = strlen+1`),
  `tty_display_nhwindow`/`process_text_window` (NHW_MENU offx +
  leading pad); `quest.lua` legacy `output = "menu"`.
- **Cause:** (1) `getdir_cmdassist` used pline+more and looped on
  invalid keys; C shows NHW_TEXT then **returns 0** (only `?`
  retries). (2) Legacy `offx` used bare `strlen` without `+1` and
  painted text at `offx` without the leading pad space.
- **Change:** `js/dothrow.js` `help_dir`/`show_direction_keys` +
  getdir cancel-after-help / `?` retry / trailing-space prompt;
  `js/questpgr.js` `maxcol = strlen+1`, paint at `offx+1`,
  `moreCol = offx+1+8`.
- **Verification:** seed0102 **PASS** (4485/4485, 25/25) + strict;
  green + seed1500/1800/0060 PASS; full **6/44**, screens
  **320**/11405, RNG **90863**/792838.
- **Named omission:** `help_dir` Guidebook/`^letter` and nodiag
  grid-bug branch; other NHW_TEXT callers may still use wrong
  geometry.
- **Next:** seed0017 @ 2775 / seed0700 Scr 2/51 / seed2200
  `exercise`.

## D-0072 — seed0017 lookaround corridor-turn (run==1)

- **Status:** fixed
- **Observed:** seed0017 rng-diff @ **2775**: C `rn2(5)` @
  `distfleeck` vs JS `rn2(7)` @ `do_attack` (safemon bump). JS ended
  capital-`L` rush early, getch'd later keys (`j` into pet) while C
  kept running/monster phase.
- **C locus:** `hack.c` `lookaround` — STONE/IS_OBSTRUCTED are
  uninteresting (`continue`); run==1/3/8 corridor-follow updates
  `u.dx`/`u.dy` toward adjacent CORR when `corrct`/`i0` allow.
- **Cause:** JS `lookaround` called `end_running()` on
  `blocksMove(ahead)` (STONE typ=0 at dead-end). C does not stop for
  walls; it turns into the corridor. Premature run abort + Fast
  `umovement` left hero free to consume the next input mid-turn.
- **Change:** `js/cmd.js` `lookaround` — monster stop rules + run==1
  corridor-turn (`last_str_turn`, `corrct`/`i0`/`noturn`/`m0`).
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91263**/792838;
  seed0017 prefix **2775→3132** positional **3169**/3465; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** Blind early-return; traps/pools/NODIAG;
  `mon_visible`/M_AP furniture-object skip; AIR/ICE as uninteresting;
  run==2 corridor-widen stop; mention_walls plines.
- **Next:** seed0017 @ 3132 `dog_move`; seed0700 screen peel;
  seed2200 `exercise`.

## D-0073 — seed2200 `q`/`dodrink` POT_OIL (`peffect_oil`)

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2724**: C `rn2(2)` @
  `exercise(attrib.c:509)` vs JS `rn2(12)` @ `mcalcmove`. Session keys
  `q` then `h`; C screen `"That was smooth!"` / drink prompt
  `[fgh or ?*]`. JS unbound `q`, so `h` ran as west move from stairs.
- **C locus:** `potion.c` `dodrink` → `dopotion` → `peffects` →
  `peffect_oil` — uncursed unlit oil plines `"That was smooth!"` then
  `exercise(A_WIS, FALSE)` → `-rn2(2)`.
- **Cause:** no quaff path; movement key swallowed the potion letter.
- **Change:** `js/potion.js` (`dodrink`/`dopotion`/`peffect_oil` +
  drink getobj); `js/cmd.js` bind `'q'`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91220**/792838;
  seed2200 prefix **2724→2733** positional **2790**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** other `peffect_*`; Strangled; fountain/sink/
  underwater drink; milky-ghost/smoky-djinni; lit-oil burn/`likes_fire`;
  worn-stack split; `more_experienced` on discover; getobj `?`/`*` menus.
- **Next:** seed2200 @ 2733 `z`/`dozap`; seed0017 @ 3132 terrain;
  seed0700 screens.

## D-0074 — seed2200 `z`/`dozap` NODIR secret-door detect

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2733**: C `rn2(19)` @
  `exercise(attrib.c:509)` vs JS `rn2(5)` @ `distfleeck`. Session keys
  `z` then `c`; C screen `"You don't find anything."` / zap prompt
  `[c or ?*]`. JS unbound `z`, so `c` ran as SE move.
- **C locus:** `zap.c` `dozap` → `zappable` → `weffects` (always
  `exercise(A_WIS,TRUE)`) → `zapnodir` `WAN_SECRET_DOOR_DETECTION` →
  `detect.c` `findit` empty path.
- **Cause:** no zap path; movement key swallowed the wand letter.
- **Change:** `js/zap.js` (`dozap`/`zappable`/`weffects`/`zapnodir`/
  `learnwand` + zap getobj); `js/detect.js` `findit`/`findone`/
  hero-centered `do_clear_area`; `js/cmd.js` bind `'z'`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91222**/792838;
  seed2200 prefix **2733→2772** positional **2794**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** IMMEDIATE/RAY `weffects` (`bhit`/`ubuzz`/
  `zap_dig`); `zapyourself`; `backfire` body; other NODIR (light/
  create/wish/enlighten/stasis); wrest pline; `check_capacity`/
  `nohands`; `check_unpaid`; `more_experienced`; `update_inventory`;
  findone flash/mimic/hider/invis/chest-trap/trapped-door.
- **Next:** seed2200 @ 2772 `r`/`doread`; seed0017 @ 3132 terrain;
  seed0700 screens.

## D-0075 — seed2200 `r`/`doread` SCR_MAGIC_MAPPING

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2772**: C `rn2(19)` @
  `exercise(attrib.c:509)` vs JS `rn2(5)` @ `distfleeck`. Session keys
  `r` then `j`; C screen `"As you read the scroll, it disappears.  A
  map coalesces in your mind!"` / read prompt `[ijklm or ?*]`. JS
  unbound `r`, so `j` ran as south move.
- **C locus:** `read.c` `doread` → `seffects` (`exercise(A_WIS,TRUE)`
  when `oc_magic`) → `seffect_magic_mapping` → `detect.c`
  `do_mapping`/`show_map_spot` (second `exercise(A_WIS,TRUE)`).
- **Cause:** no read path; movement key swallowed the scroll letter.
- **Change:** `js/read.js` (`doread`/getobj-read/`seffects`/
  `seffect_magic_mapping`/`learnscroll`/`useup`); `js/detect.js`
  `do_mapping`/`show_map_spot`; `js/display.js`
  `magic_map_background`; `js/cmd.js` bind `'r'`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **320**/11405, RNG **91390**/792838;
  seed2200 prefix **2772→2925** positional **2940**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** other `seffect_*`; `study_book`; fortune/shirt/
  credit/marker/coin/orb/candy; Blind Braille gates; nommap/
  Hallucination/`make_confused`; blessed-SDOOR convert edge cases;
  `notice_mon_off`/`on`; `browse_map`/unconstrain; `trycall`;
  `can_chant`; `check_capacity`; `room_discovered`; trap/engraving
  restore after furniture in `show_map_spot`; SPE_MAGIC_MAPPING.
- **Next:** seed2200 @ 2925 `E`/`doengrave`; seed0017 @ 3132 terrain;
  seed0700 screens.

## D-0076 — seed2200 `E`/`doengrave` fingertip Elbereth

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2925**: C `rn2(25)` @
  `doengrave(engrave.c:1223)` vs JS `rn2(5)`. Session keys `E` `-`
  (More) `Elbereth` Enter; C screen `"What do you want to write with?
  [- acden or ?*]`" then dust fingertip + getlin.
- **C locus:** `engrave.c` `doengrave` (DUST mix-up `!rn2(25)` per
  non-space) → `set_occupation(engrave)` → `make_engr_at` Elbereth
  `exercise(A_WIS,TRUE)`; `allmain.c` runs occupation before next
  `rhack`.
- **Cause:** `'E'` unbound → Unknown / movement; no engraving path.
- **Change:** `js/engrave.js` (`doengrave`/getobj-stylus/`make_engr_at`/
  occupation); `js/cmd.js` bind `'E'`; `js/allmain.js` occupation tick
  before `rhack`.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **318**/11405, RNG **91443**/792838;
  seed2200 prefix **2925→2979** positional **2993**/3018; seed0700
  RNG still full Scr **2**/51.
- **Named omission:** wand/weapon/marker/towel/gem/ring stylus sfx;
  grave/altar/jello/swallow; add-to/overwrite yn; multi-turn dulling;
  del_engr/rloc beyond replace; engraving glyphs in `newsym`;
  `u_wipe_engr` body; livelog; demon/vampire blood default.
- **Next:** seed2200 post-Elbereth 0-RNG `/` UI then Lua shuffle @
  2979; seed0017 @ 3132 terrain; seed0700 screens.

## D-0077 — seed2200 `/` whatis + `?` help / `get_lua_version`

- **Status:** fixed
- **Observed:** seed2200 rng-diff @ **2979**: C `rn2(3)` @ nhlib
  `shuffle(align)` vs JS `rn2(5)` @ `distfleeck`. C emits no RNG from
  post-Elbereth through step 108; step 109 `?`/`a` About triggers Lua.
- **C locus:** `pager.c` `dowhatis`/`do_look`/`dohelp`; `getpos.c`
  `getpos` + `handle_tip(TIP_GETPOS)`; `version.c` `doextversion` →
  `get_lua_version` (`nhlua.c`) → `nhl_init` loads `nhlib.lua`
  `shuffle(align)`.
- **Cause:** `'/'`/`'?'` unbound → Unknown; following `.`/`hjkl` were
  timed `donull`/moves before C's 0-RNG UI finished.
- **Change:** `js/pager.js` (`do_look`/`dowhatis`/`dohelp`/`checkfile`/
  `doextversion`); `js/getpos.js`; `js/cmd.js` bind `'/'`/`'?'`;
  `invent_lines` export for invent-pick whatis.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **318**/11405, RNG **91280**/792838;
  seed2200 RNG **3018**/3018 Scr **1**/230; seed0700 RNG still full
  Scr **2**/51.
- **Named omission:** full `do_screen_description` glyph encyclopedia;
  tty NHW_TEXT geometry for help/`checkfile` pages; `whatdoes`
  keyhelp body beyond stub; `dokeylist`/`domenucontrols`/`option_help`
  /contact; PORT_HELP; getpos menu-jump/hilite/valids; lootabc true
  accelerators.
- **Next:** seed2200 screen peel / seed0017 @ 3132 terrain /
  seed0700 screens.

## D-0078 — H2344 NHW_MENU offx + botl get_strength_str

- **Status:** fixed
- **Observed:** seed0700 Scr **2**/51 with RNG full. First screen:
  Book of Amaterasu left-aligned (JS) vs pad-8 corner (C); botl
  `St:19` vs C `St:18/01`.
- **C locus:** `win/tty/wintty.c` `#define H2344_BROKEN` +
  `tty_display_nhwindow` NHW_MENU offx =
  `min(min(82, cols/2), cols-maxcol-1)` (fullscreen only when
  `maxrow>=rows || !menu_overlay`); `botl.c` `get_strength_str`.
- **Cause:** JS used stock `max(10, cols-maxcol-1)` then
  `offx==10 → fullscreen`, so long Amaterasu lines collapsed to
  col 0. Botl printed raw `acurr.a[A_STR]` (19) instead of
  `18/01`.
- **Change:** `js/questpgr.js` + `js/invent.js` `nhw_menu_geometry`
  H2344 offx; `js/attrib.js` `get_strength_str`; wired into
  `display.js` / `invent.js` / `questpgr.js` status lines.
- **Verification:** green + seed1500/1800/0060/0102 PASS + strict;
  full **6/44**, screens **318→361**/11405, RNG **91280**/792838;
  seed0700 Scr **2→44**/51; seed2200 still Scr **1**/230.
- **Named omission:** Samurai starting-pet christen (`Hachi`);
  invent Weapons header still ~2 cols left on Japanese-name
  invent; display-path Japanese disco names; seed2200 map
  `` ` `` vs ASCII `x`.
- **Next:** seed0700 pet `Hachi` / invent offx / Japanese disco;
  or seed2200 map cell; or seed0017 @ 3132 terrain.

## D-0079 — seed0700 Samurai Hachi + Japanese invent/disco

- **Status:** fixed
- **Observed:** seed0700 Scr **44**/51 (RNG full). Swap pline
  "your little dog" vs C "Hachi"; invent English short sword /
  yas / missing rustproof + 2-col offx; disco missing
  `shito`/`wakizashi`/`ninja-to` bracket lines.
- **C locus:** `dog.c` `makedog` + `do_name.c` `christen_monst` /
  `x_monnam`; `hack.c` `domove_swap_with_pet`; `objnam.c`
  Japanese/`makeplural` ya / quiver / `add_erosion_words`;
  `mkobj.c` lacquered Samurai `SPLINT_MAIL`; `o_init.c`
  `interesting_to_discover` / `disco_typename` / `discover_object`
  Samurai gate + `observe_object`.
- **Cause:** starting pet never christened; invent/disco lacked
  Japanese display path; lacquer `oerodeproof` absent; invent
  never called `observe_object` so wakizashi stayed `*`.
- **Change:** `js/dog.js` role petnames + `christen_monst`;
  `js/do_name.js` christen + `x_monnam_tame`; `js/cmd.js` swap
  pline; `js/objnam.js` Japanese/`ya`/quiver/rustproof/
  `disco_typename`; `js/mkobj.js` lacquer; `js/invent.js`
  Samurai disco + `observe_object` in `invent_lines`.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **361→370**/11405, RNG
  **91280→91380**/792838; seed0700 **PASS** (51/51).
- **Named omission:** full `x_monnam` (hallu/invis/saddle/shk);
  pony saddle/`see_monster_closeup`; other erosion proofs;
  `In_quest` lacquer path; xname-path `observe_object` beyond
  invent_lines.
- **Next:** seed2200 map cell / seed0017 @ 3132 terrain /
  seed1150 `dog_move` / seed0016 `next_ident`.

## D-0080 — seed2200 STATUE map glyph (not ROCK_CLASS)

- **Status:** fixed
- **Observed:** seed2200 Scr **1**/230 (RNG full). First cell
  (16,11): C ASCII `x` CLR_WHITE vs JS ROCK_CLASS `` ` ``.
  Session has a floor STATUE of grid bug (`corpsenm` PM_GRID_BUG,
  mlet `S_XAN`).
- **C locus:** `display.h` `obj_to_glyph` → `statue_to_glyph`;
  `display.c` mapglyph statue branch uses `mons[offset].mlet` +
  `obj_color(STATUE)` (CLR_WHITE), not `S_rock`/ROCK_CLASS.
- **Cause:** JS `obj_glyph` always used `DEF_OC_SYM[ROCK_CLASS]`
  for statues; C since 3.6 shows the depicted monster letter.
- **Change:** `js/display.js` `obj_glyph` STATUE → `MLET_CH[mlet]`
  + statue `oc_color` (omit hallu/`random_monster` statue path).
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **370→380**/11405, RNG
  **91380**/792838; seed2200 Scr **1→11**/230.
- **Named omission:** hallucination statue `random_monster`;
  pile-top statue glyph flags; gender FEM statue offset.
- **Next:** seed2200 @ screen 10 whatis/overlay (room `·` vs
  gray blank) / seed0017 @ 3132 terrain / seed1150 `dog_move`.

## D-0081 — seed2200 magic_map dark_room floors

- **Status:** fixed
- **Observed:** seed2200 Scr **11**/230 (RNG full). Screen 10 after
  `r`+`j` SCR_MAGIC_MAPPING: 118 cells — C DEC floor `~`/NO_COLOR
  vs JS blank/`CLR_GRAY` in distant rooms (not hero room).
- **C locus:** `display.c` `magic_map_background`;
  `reglyph_darkroom` (`showsyms[S_darkroom]=showsyms[S_room]`);
  `detect.c` `show_map_spot`/`do_mapping`.
- **Cause:** JS always rewrote out-of-sight `!waslit` ROOM floors to
  GLYPH_NOTHING blank. C with default `dark_room`+color uses
  `DARKROOMSYM`, which paints as the room-floor glyph.
- **Falsified:** whatis/NHW overlay clear painting blanks over map
  (screen 10 is post-mapping before `/`).
- **Change:** `js/display.js` `magic_map_background` — blank only when
  `!(dark_room && use_color)`; else keep floor ·/NO_COLOR.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **380→458**/11405, RNG
  **91380**/792838; seed2200 Scr **11→89**/230.
- **Named omission:** `newsym` still omits `waslit=(lit!=0)` on
  cansee; full S_darkroom/CLR_BLACK vs showsym equate.
- **Next:** seed2200 getpos tip @ screen 36 / seed0017 @ 3132
  terrain / seed1150 `dog_move`.

## D-0082 — seed2200 getpos tip NHW_MENU corner

- **Status:** fixed
- **Observed:** seed2200 Scr **89**/230 (RNG full). Screen 36 tip:
  C text at col ~10 over intact map, cursor `[16,8]`; JS blanked
  rows 0–20, painted at col 0, cursor `[5,8]`.
- **C locus:** `dat/nhcore.lua` `show_getpos_tip` → `nhlua.c`
  `nhl_text` → `create_nhwindow(NHW_MENU)` + `select_menu`
  PICK_NONE; `wintty.c` H2344 corner
  `offx = min(min(82,cols/2), cols-maxcol-1)` (maxcol = strlen+2;
  morestr `"(end) "`).
- **Cause:** JS `show_getpos_tip` invented a fullscreen blank +
  col-0 paint; C uses the same corner NHW_MENU path as invent
  (`paint_corner_nhw_menu`). Longest tip line 68 → maxcol 70 →
  offx 9 → cursor col 16.
- **Change:** `js/getpos.js` `show_getpos_tip` →
  `paint_corner_nhw_menu(lines, '(end) ')`.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **458→459**/11405, RNG
  **91380**/792838; seed2200 Scr **89→90**/230.
- **Named omission:** getpos menu-jump/hilite/valids; farlook
  autodescribe still uses `dfeature_at`/`stairs_description`
  instead of cmap `lookat` (`S_brupstair`).
- **Next:** seed2200 farlook stairs @ screen 46 / seed0017 @ 3132
  terrain / seed1150 `dog_move`.

## D-0083 — seed2200 farlook stairs lookat + getpos cursor

- **Status:** fixed
- **Observed:** seed2200 Scr **90**/230 (RNG full). Screen 46 tip:
  C `"branch staircase up"` cursor `[21,10]`; JS
  `stairs_description` Dlvl1 text and/or cursor stuck at hero
  `[22,10]`.
- **C locus:** `pager.c` `lookat` cmap default →
  `defsyms[S_brupstair].explanation`; `display.c` `back_to_glyph`
  STAIRS when `known_branch_stairs`; `getpos.c` `auto_describe`
  prints **firstmatch** after lookat (not full out_str /
  `dfeature_at`); `curs(WIN_MAP)` **after** message paint.
- **Cause:** (1) farlook tip used `dfeature_at` →
  `stairs_description` ("… out of the dungeon") instead of cmap
  explanation; (2) `flush_screen`/`_buildScreenOutput` reset
  cursor to hero after getpos `setCursor`, undoing map cursor
  before `nhgetch` capture.
- **Change:** `js/pager.js` stair/wall/floor/self `lookat` subset +
  DECgraphics floor/corridor `do_screen_description` envelope;
  export `known_branch_stairs`; `js/getpos.js` set cursor after
  flush; `js/display.js` `more()` word-wrap only when len≥CO.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **459→478**/11405, RNG
  **91380**/792838; seed2200 Scr **90→109**/230.
- **Named omission:** full showsyms-driven cmap scan (ASCII
  ladder/`#` sets); getpos rush/run (D-0084).
- **Next:** seed2200 @ screen 65 getpos continue / seed0017 @ 3132
  terrain / seed1150 `dog_move`.

## D-0084 — seed2200 getpos capital rush (HJKLYUBN)

- **Status:** fixed
- **Observed:** seed2200 Scr **109**/230 (RNG full). Screen 65 key
  `"H"`: C cursor `[17,13]` `"floor of a room"`; JS stayed at
  `[25,13]` `"corridor"` (ignored uppercase).
- **C locus:** `getpos.c` `getpos` — `movecmd(c, MV_WALK)` one step;
  `movecmd(c, MV_RUN)` via `highc(dirchars)` / `MV_RUSH` via
  `C(dirchars)` → `dx = 8 * u.dx` when `!iflags.getloc_moveskip`,
  then `truncate_to_map`.
- **Cause:** JS DIR map was lowercase-only; capital `H` fell through
  as no-op, so continued getpos never reached the room floor cell.
- **Change:** `js/getpos.js` — `truncate_to_map`; `HJKLYUBN` and
  Ctrl-dir rush/run 8× step (moveskip Off path).
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **478→482**/11405, RNG
  **91380**/792838; seed2200 Scr **109→113**/230.
- **Named omission:** `getloc_moveskip` glyph-skip loop; menu jump /
  hilite / valids.
- **Next:** seed2200 @ screen 80 checkfile pager cursor /
  seed0017 @ 3132 terrain / seed1150 `dog_move`.

## D-0085 — seed2200 checkfile NHW_MENU process_text_window

- **Status:** fixed
- **Observed:** seed2200 Scr **113**/230 (RNG full). Screen 80 after
  `/`→`?` getlin `"fountain"` → `checkfile`: C cursor `[36,15]`
  corner overlay; JS fullscreen TEXT cursor `[8,15]` then (with
  corner attempt) `[35,15]` from trailing `\r` inflating maxcol.
- **C locus:** `pager.c` `checkfile` — `create_nhwindow(NHW_MENU)` +
  `putstr` + `display_nhwindow` → `wintty.c` `process_text_window`
  (H2344 offx, leading pad, dmore `--More--`); `hacklib.c`
  `tabexpand` after one leading tab on body lines.
- **Cause:** JS used fullscreen `show_text_pages` (NHW_TEXT-ish
  clearScreen); data.base `\r` left in lines shifted offx left by 1.
- **Change:** `js/pager.js` `show_nhw_menu_text` + CR-normalize
  `readDat` + tabexpand in `lookup_data_base`; `checkfile` calls
  NHW_MENU path.
- **Verification:** green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **482→486**/11405 (with D-0086),
  RNG **91380**/792838; seed2200 Scr **113→117**/230.
- **Named omission:** tall checkfile fullscreen paging edge cases;
  `display_file` still NHW_TEXT-ish `show_text_pages`.
- **Next:** seed2200 look_all `m` @ screen 87 / seed0017 terrain /
  seed1150.

## D-0086 — seed2200 doname xname SCR/SPE/RIN/WAN + bimanual hands

- **Status:** fixed
- **Observed:** seed2200 invent pick (`/`→`i`): C
  `scroll/spellbook/ring/wand of …`, `(weapon in hands)`; JS
  `scr`/`spe`/`rin`/`wan` tokens and `(weapon in right hand)`.
- **C locus:** `objnam.c` `xname` SCROLL/SPBOOK/RING/WAND;
  `doname` W_WEP + `bimanual` (`obj.h` → `oc_bimanual`/`oc_big`);
  `objects.h` WEAPON `bi` bit.
- **Cause:** `pretty_base` lowercased enum tokens; W_WEP ignored
  bimanual; extractor omitted `oc_big`.
- **Change:** `scripts/extract-objects.py` + regenerate
  `oc_big`; `js/objnam.js` xname class prefixes + `bimanual` →
  `(weapon in hands)`.
- **Verification:** with D-0085; invent screen 83 matches; seed2200
  Scr **117**/230; green cohort PASS.
- **Named omission:** unlabeled/called/descr paths; ammo/missile
  `(wielded)` phrasing; tethered aklys; glow/artifact_light paren
  overwrite.
- **Next:** seed2200 look_all `m` @ screen 87 / seed0017 terrain /
  seed1150.

## D-0087 — seed2200 look_all / look_engrs NHW_TEXT

- **Status:** fixed
- **Observed:** seed2200 `/`→`m` screen 87: C cursor `[8,23]` and
  lines ` <23,9>   @  human wizard…` / ` <20,10>  f  tame kitten`;
  JS `--More--` on row 4, bare `    human wizard` / `tame monster`.
  Nearby objects listed every floor pile; C only glyph-shown.
- **C locus:** `pager.c` `look_all`/`look_engrs`/`self_lookat`/
  `look_at_monster`; `wintty.c` `tty_display_nhwindow(NHW_TEXT)` +
  `process_text_window` (more on `rows-1`); `getpos.c` `coord_desc`;
  `objnam.c` STATUE xname; `display.c` `newsym`/`glyph_at`.
- **Cause:** `show_text_pages` put `--More--` after content; look_all
  skipped coords/glyph and used `data.mname` + `loc.objects` instead
  of `data.name` + currently-shown (`cansee`/`mon_visible`) filter;
  STATUE pretty_base omitted corpsenm; look_engrs stringified
  `engr_txt` object.
- **Change:** NHW_TEXT `--More--` on row 23; look_all MAP prefixes +
  `look_shown_at`; statue `of a <pm>`; look_engrs remembered/
  obscured-by format + S_engroom `` ` ``.
- **Verification:** seed2200 Scr **117→167**/230; green + cohort
  PASS + strict; full **7/44**, screens **486→536**/11405, RNG
  **91379**/792838.
- **Named omission:** invis/warning glyphs; `object_from_map` fakeobj;
  compass/screen coord modes; look_traps format; `display_file`
  license page (seed2200 @ 110); S_engrcorr/grave headstone.
- **Next:** seed2200 `display_file`/license @ screen 110 /
  seed0017 terrain / seed1150.

## D-0088 — seed2200 doextversion runtime options / Lua license

- **Status:** fixed
- **Observed:** seed2200 Scr 167/230; first miss screen 109 — C has
  full options wrap through `browser…5.0.0 only`, windowing/soundlib/
  Lua copyright, then page 2 Permission block; JS truncated at
  `prefix, Lua interpreter version: 5.4` and mis-indented license.
- **C locus:** `version.c` `doextversion` OPTIONS_AT_RUNTIME +
  `mdlib.c` `build_options` / `do_runtime_info` / `lua_info[]`;
  outdented headers insert blank separators.
- **Change:** `doextversion_runtime_lines()` matching contest MacOS
  tty/nosound feature set + 5-space Permission continuation.
- **Verification:** with D-0089/D-0090; seed2200 Scr **167→176**/230.

## D-0089 — NHW_TEXT dmore quitchars

- **Status:** fixed
- **Observed:** history page at Benson: C stays for keys `?`/`e` then
  ESC; JS advanced on any key into Bill Dyer pages C never shows.
- **C locus:** `wintty.c` `dmore` → `getline.c` `xwaitforspace(quitchars)`
  with `quitchars=" \\r\\n\\033"` (`decl.c`); ESC → WIN_CANCELLED.
- **Change:** `text_page_wait()` / `show_text_pages` only accept
  space/CR/LF/ESC; other keys stay on page (capture boundaries kept).
- **Verification:** history pages through ESC match; green cohort PASS.

## D-0090 — seed2200 dowhatdoes

- **Status:** fixed
- **Observed:** after history, help `f`: C `Ask about…--More--` then
  `What command?` then `i       show your inventory (#inventory).`;
  JS stub dumped full keyhelp as NHW_TEXT.
- **C locus:** `pager.c` `dowhatdoes` / `dowhatdoes_core` /
  `whatdoes_help`; `cmd.c` `key2extcmddesc` / `key2txt`.
- **Change:** tip-once + more; yn-style prompt; `key2extcmddesc` for
  rhack-bound letters; `&`/`?` → stripped KEYHELP pages.
- **Verification:** seed2200 Scr **167→176**/230 (prefix through 157);
  green + cohort PASS + strict; full **7/44**, screens
  **536→545**/11405, RNG **91371**/792838.
- **Named omission:** full `key2extcmddesc` misc_keys/number_pad/
  rush-run; dokeylist; contact; cmdhelp `&?` conditionals (#if 0 in C).
- **Next:** seed2200 `option_help` @ screen 158 / seed0017 terrain /
  seed1150.

## D-0091 — seed2200 option_help

- **Status:** fixed (RC path harness-only residual)
- **Observed:** help `g` showed `(option help stub)`; C `option_help`
  NHW_TEXT lists booleans/compounds/others + epilog (screens 158–165).
- **C locus:** `options.c` `option_help` / `next_opt`; `optlist.h`
  `allopt[]`; `cfgfiles.c` `get_configfile`; tty wrap for long
  OPTIONS= intro. Contest flags: ALTMETA/CRASHREPORT/PREV_MSGS;
  no SCORE_ON_BOTL/TIMED_DELAY; tty WC/WC2 subset.
- **Change:** `scripts/extract-optlist.py` → `js/generated/optlist_data.js`;
  `option_help_lines()` + `next_opt` packing; help `g` →
  `show_text_pages`. Over-long `%-20s` compounds render unpadded to
  fit CO (glyph / whatis_filter). Wrap-forcing synthetic config path
  (not recording `$HOME`).
- **Verification:** seed2200 Scr **176→199**/230 (158 path cells only
  remaining option_help miss); green + cohort PASS + strict; full
  **7/44**, screens **545→568**/11405, RNG **91371**/792838.
- **Named omission:** recording-machine `get_configfile()` absolute
  path (`verify-rerecord` elides; do not hardcode); dokeylist;
  contact; full `doset`/`O` menu.
- **Next:** seed0017 @ 3132 terrain / seed1150 `dog_move` / seed2200
  post-help after accepting path residual.

## D-0092 — `in_mk_themerooms` for themerms `check_room`

- **Status:** fixed (seed0017 peel unchanged)
- **Observed:** seed0017 @ **3132**: C 3× `rn2(12)` @ `dog_move` vs JS
  2× then `rn2(5)` `distfleeck`. Pet (30,5) `mfndpos` cnt=4; missing
  walkable `(30,4)` (JS VWALL). C DEC screen: east door col **35**,
  fountain **31**, floor at **(30,4)** (DEC `~`≡room floor / possible
  D_NODOOR). JS room `lx=31,hx=35`, east door **36**, fountain **32**.
- **C locus:** `mklev.c` `makerooms` sets `gi.in_mk_themerooms` around
  Lua `themerooms_generate`; `sp_lev.c` `check_room` returns FALSE on
  non-STONE when `in_mk_themerooms` (no shrink).
- **Change:** `js/mklev.js` `themerooms_generate` toggles
  `game.in_mk_themerooms` for the call (was never set → JS could shrink
  where C aborts).
- **Verification:** green + cohort PASS + strict; full **7/44**,
  screens **568**/11405, RNG **91371**/792838. seed0017 still prefix
  **3132** — this flag alone is not the (30,4) cause for this seed.
- **Rejected:** “pool at (30,4)” — DEC `~` is floor. “mtrack/nxti” —
  inactive (`distminU=3`).
- **Next:** compare first-room `dx`/`xabs` / `split_rects` vs C map
  east-door x; or seed1150 @ 3032 `throw_obj`.

## D-0093 — getdir flush `--More--` + throw_obj multishot

- **Status:** fixed
- **Observed:** seed1150 @ **3032**: C `rnd(2)` @ `throw_obj` vs JS
  `rn2(5)` `distfleeck`. C sequence: fireassist swap `--More--`s,
  pet-drop `--More--`, getdir, `l` → “You shoot 2 flint stones.”
  JS skipped `more()` before getdir so the pet-drop space cancelled
  getdir and `l` walked.
- **C locus:** `cmd.c` `yn_function`/`tty_yn_function` (more when
  `TOPLINE_NEED_MORE`); `dothrow.c` `throw_obj` multishot +
  `multishot_class_bonus` (PM_CAVE_DWELLER −P_SLING/P_SPEAR).
- **Change:** `js/dothrow.js` `getdir_cmdassist` → `flush_topl_more()`
  before prompt; `throw_obj` ports volley calc + class bonus +
  `rnd(multishot)` + shoot pline.
- **Verification:** green + cohort PASS + strict; seed1800 PASS;
  seed1150 prefix **3032→3042** (rng-diff), positional **3070**/3137
  Scr **22**/51; full **7/44**, screens **568**/11405, RNG
  **91398**/792838.
- **Rejected:** “seed0017 room x-shift” — display `setCell(x-1)`;
  C screen fountain col 31 ≡ JS map x 32. seed0017 still @ 3132
  (`mfndpos` cnt).
- **Named omission:** full `xname`/`singular` for volley pline
  (doname stand-in); ACURRSTR crossbow gate; quest-artifact launcher
  bonus; `weapon_skills` init beyond defaults.
- **Next:** seed1150 @ 3042 extra `obj_resists` before `dog_move`;
  seed0017 mfndpos neighbour; seed2200 post-help.

## D-0094 — throw landing must `stackobj`

- **Status:** fixed
- **Observed:** seed1150 @ **3042**: C `rn2(12)` @ `dog_move` vs JS
  extra `rn2(100)` `obj_resists`. After sling volley of 2 flints,
  JS `dog_goal` `dogfood`'d two separate `fobj` FLINT nodes at
  `(51,14)` plus food + 2 golds (5 rolls); C merged the flints so
  only 4 `obj_resists` then selection RNG.
- **C locus:** `invent.c` `stackobj`/`merged`/`mergable`;
  `dothrow.c` `throwit` calls `stackobj` after `place_object`.
- **Cause:** JS `throwit` placed without merge; `dog_goal` walks
  `fobj` and always `dogfood`s in-bbox objects.
- **Change:** `js/mkobj.js` floor `mergable`/`merged`/`stackobj`
  (oc_merge approximated until extractor emits it); `throwit`,
  pet `mdrop_obj`, and trap miss-path call `stackobj`.
- **Verification:** green + cohort PASS + strict; seed1150
  **rng-diff OK** (3137/3137) Scr **22**/51 + strict lengths;
  full **7/44**, screens **568**/11405, RNG **91465**/792838.
- **Named omission:** `objects[].oc_merge` not in extractor (class
  heuristic + boulder/statue/boomerang denylist); full `mergable`
  shop/mail/globby/candle/erosion arms deferred.
- **Next:** seed1150 screen peel (Scr 22/51) / seed0017 @ 3132
  `mfndpos` / seed2200 post-help.

## D-0095 — seed1150 look_here + Monnam MGIVENNAME

- **Observed:** seed1150 Scr **22**/51 (RNG full): screen 6 C topline
  `"You see here a food ration."` vs JS blank; then pet plines
  `"The little dog picks/drops…"` vs C `"Slasher …"`.
- **C locus:** `hack.c` `spoteffects` → `pickup.c` `pickup`/
  `check_here` → `invent.c` `look_here`; `do_name.c` `Monnam`/
  `mon_nam` / `x_monnam` `MGIVENNAME` → `ARTICLE_NONE`.
- **Cause:** (1) JS `domove` never called `spoteffects`; with
  `!autopickup`, C always `check_here`→`look_here` on floor objects.
  (2) Caveman pet already christened `Slasher`, but dogmove `Monnam`
  hard-coded `"The <type>"`.
- **Change:** `js/pickup.js` `check_here`/`pickup`/`spoteffects`;
  `cmd.js` `domove` → `spoteffects(true)` after move; `do_name.js`
  export `Monnam`/`noit_Monnam`; dogmove imports them.
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700 PASS; seed1150 Scr **22→27**/51 RNG full; full **7/44**,
  screens **568→574**/11405, RNG **91465→91471**/792838.
- **Named omission:** autopick body / `,` menus; `mention_decor`/
  `describe_decor`; pool/trap/sink arms of `spoteffects`; full
  `x_monnam` hallu/invis/saddle/priest/shk.
- **Rejected:** forcing corridor `#` to `NO_COLOR` under
  `lit_corridor` (raises seed1150 Scr, drops seed0900 to 12/84).
- **Next:** seed1150 corridor `#` color (C 8 vs JS 15) without
  regressing seed0900; or seed0017 mfndpos / invent Scr 38+.

## D-0096 — out-of-sight lit corridor → dark corr

- **Symptom:** seed1150 Scr **27**/51: `#` CLR_WHITE(15) vs C
  NO_COLOR(8) at out-of-sight unlit CORR; seed0900 needs visible
  lit-corridor white.
- **C locus:** `display.c` `newsym` (`waslit=(lit!=0)`; `!cansee`
  remap `S_litcorr`→`S_corr` when `!waslit` or dark_room+color);
  `back_to_glyph` / `reset_glyphmap` (shared `#` → CLR_WHITE for
  litcorr; S_corr CLR_GRAY → tty NO_COLOR).
- **Cause:** JS kept remembered `S_litcorr`/CLR_WHITE when leaving
  sight; never set `waslit` on cansee. Blind “always NO_COLOR” is
  wrong — visible `lit_corridor` must stay white (seed0900).
- **Change:** `js/display.js` `newsym` sets `waslit`; `!cansee`
  remaps remembered lit `#`→NO_COLOR; `terrain_glyph` uses
  `waslit||lit_corridor`.
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700 PASS; seed1150 Scr **27→46**/51 RNG full; full **7/44**,
  screens **574→593**/11405, RNG **91471**/792838.
- **Named omission:** `newsym` ROOM→DARKROOMSYM memory arm;
  engraving/trap glyphs; hallu/`see_objects`.
- **Next:** seed1150 invent/UI @ screen 38 / seed0017 mfndpos /
  seed2200 post-help.

## D-0097 — GemStone xname + throw volley + ^X gender/MC

- **Symptom:** seed1150 Scr **46**/51 @ screen 38: JS
  `"You shoot 2 15 uncursed flints (in quiver pouch)."` vs C
  `"You shoot 2 flint stones."`; then ^X `"male human Caveman"` vs
  `"human Caveman"` and missing Attributes `"You are warded."`.
- **C locus:** `objnam.c` `GemStone` / `xname_flags` GEM_CLASS;
  `dothrow.c` `throw_obj` `You("%s %d %s.", … xname/singular)`;
  `insight.c` background gender omit when `urole.name.f`; 
  `attributes_enlightenment` `magic_negation` → warded/guarded/
  protected; `mhitu.c` `magic_negation` worn `a_can`.
- **Cause:** JS volley used `doname`; `pretty_base` omitted
  `" stone"`; ^X always printed gender; MC line absent / wrong
  section (Status vs Attributes).
- **Change:** `js/objnam.js` GemStone + GEM_CLASS `xname`/`singular`;
  `js/dothrow.js` volley uses `xname`; `js/invent.js` distinct-`name.f`
  gender omit + Attributes `magic_negation` (`oc_level` as `a_can`).
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700 PASS; seed1150 **PASS**; full **8/44**, screens
  **593→598**/11405, RNG **91471**/792838.
- **Named omission:** full `magic_negation` Protection/amulet bumps;
  roles.js `name.f=null` where C has 0 (still same-string proxy);
  full `xname` GEM unknown/called paths; armor pair-of in
  `obj_typename`.
- **Next:** seed0017 @ 3132 mfndpos / seed2200 Scr 199 / getbones.

## D-0098 — dog_move mtrack uses C `goto nxti`

- **Status:** fixed
- **Observed:** JS `dog_move` mtrack backtrack `continue` only advanced
  the inner `mtrack[]` loop; C `goto nxti` skips the candidate.
- **C locus:** `dogmove.c` `dog_move` mtrack loop → `goto nxti`.
- **Change:** `js/dogmove.js` labeled `candloop` + `continue candloop`
  when `rn2(MTSZ*(k-j))` says skip.
- **Verification:** green + strict PASS; cohort seed1500/1800/0060/
  0102/0700/1150 PASS; full **8/44**, screens **598**/11405, RNG
  **91410**/792838. seed0017 still @ **3132** (`distminU=3`, mtrack
  inactive on that peel).
- **Next:** seed0017 (30,4) terrain (D-0099).

## D-0099 — seed0017 dog_goal gettrack (!couldsee)

- **Status:** fixed
- **Observed:** seed0017 @ **3132**: C 3× `rn2(12)` @ `dog_move` vs JS
  2× then `rn2(5)` `distfleeck`. Pet **(30,5)** DOOR, hero **(29,8)**,
  `mfndpos` cnt=4 same cells as JS.
- **C recorder dump (after mklev):** `levl[30][4].typ=VWALL` — same as
  JS. Terrain-writer theory **falsified**.
- **C dump at peel (cc≈3130):** `couldsee(pet)=0`, `gg=(29,5)`,
  `gtyp=UNDEF`. After closer pick `(29,5)` updates `nidist`, former
  equal-distance `(29,6)` becomes farther → **3×** `rn2(12)`.
- **C locus:** `dogmove.c` `dog_goal` — when goal is hero and
  `!in_masters_sight`, `gettrack(omx,omy)` redirects `gg`; `track.c`
  `settrack` each new turn.
- **Cause:** JS `dog_goal` omitted the gettrack/ogoal/FARAWAY block;
  `track.c` was unported, so even with correct `couldsee` the goal
  stayed at the hero → only 2 farther cells.
- **Change:** `js/track.js` (`initrack`/`settrack`/`gettrack`);
  `allmain` calls `settrack` before `moves++`; `dog_goal` ports
  gettrack/ogoal (wantdoor `view_from` do_clear_area omitted → hero
  fallback).
- **Rejected:** missing walkable (30,4); room x-shift; wallification;
  mfndpos probe “extra neighbour” as the C map state.
- **Verification:** seed0017 prefix **3132→3327** (`prayer_done`);
  green+strict PASS; cohort seed1500/1800/0060/0102/0700/1150 PASS;
  full **8/44** Scr **598** RNG **91540**.
- **Next:** seed0017 @ 3327 `prayer_done` / `#pray`.

## D-0100 — post-fill full-map wallification

- **Status:** fixed (seed0017 peel unchanged)
- **Observed:** C `themerooms_post_level_generate` ends with
  `wallification(1,0,COLNO-1,ROWNO-1)` after Lua `post_level_generate`;
  JS `makelevel` omitted that call (Lua postprocess empty for default).
- **C locus:** `mklev.c` `themerooms_post_level_generate`
- **Change:** `js/mklev.js` `makelevel` calls `wallification` after
  special-room fill (no Lua postprocess queue yet — named omission).
- **Verification:** green+strict PASS; cohort seed1500/1800/0060/0102/
  0700/1150 PASS; full **8/44** Scr **598** RNG **91410**; seed0017
  still **3132** — wallification is not the (30,4) writer.
- **Next:** seed0017 @ 3327 `prayer_done` (D-0099 gettrack cleared 3132).

## D-0101 — seed0017 `#pray` / `prayer_done` / `angrygods`

- **Status:** fixed
- **Observed:** seed0017 @ **3327**: C `rn2(1000)` @ `prayer_done`
  (`rnz(250)`) vs JS missing. Moves `#pray\n` after altar approach.
- **C locus:** `pray.c` `dopray` / `can_pray` / `prayer_done` /
  `gods_upset` / `angrygods` / `godvoice`; `cmd.c` `doextcmd` returns
  callee `ECMD_*`.
- **Cause:** JS had no `#pray` extcmd and no `pray.js`. With
  `ublesscnt=300`, `can_pray` sets `p_type=0` (too soon) even on a
  coaligned altar → `prayer_done` does `rnz(250)` + `change_luck(-3)`
  + `gods_upset` → `angrygods`. Samurai `initrecord>=STRIDENT` +
  Luck=-3 → `maxanger=4`; case 0 displeased then `rnz(300)`.
- **Change:** new `js/pray.js` (`can_pray`/`dopray`/`prayer_done`/
  `water_prayer`/`gods_upset`/`angrygods` cases 0–3/`godvoice`);
  `getline.js` `#pray`; `doextcmd` returns ECMD; `cmd.js` `#` keeps
  `move` on `ECMD_TIME`.
- **Verification:** seed0017 RNG **3465**/3465 Scr **2**/67; seed0106
  prefix **→2639** (`do_attack`); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150 PASS; full **8/44** Scr **599** RNG
  **91965**.
- **Next:** seed0017 Scr (legacy/Book) / seed2200 Scr 199 / seed0106
  @ 2639 `do_attack`.

## D-0102 — askname splash + ParanoidPray yn

- **Status:** fixed
- **Observed:** seed0017 Scr **2**/67 with full RNG. Screen 0 C is
  copyright + `Who are you?` (no `OPTIONS=name`); JS skipped to Book.
  After askname, Scr **66**/67 — residual idx 46 C
  `Are you sure you want to pray? [yn] (n)` vs JS already on prayer
  `--More--` (ParanoidPray omitted).
- **C locus:** `wintty.c` `tty_init_nhwindows` / `tty_askname`;
  `role.c` `plnamesuffix`; `options.c` default
  `paranoia_bits = PARANOID_PRAY|…`; `pray.c` `dopray`;
  `topl.c` `tty_yn_function`; `cmd.c` `paranoid_query`.
- **Cause:** (1) JS invented `plname='Hero'` when rc omitted name, so
  typed `Akira` keys were eaten by Book's non-quitchar loop. (2)
  Default `PARANOID_PRAY` requires yn before prayer; JS skipped it so
  the confirm key only shifted one screen.
- **Change:** `js/askname.js` splash + `tty_askname` (grid paint only —
  no `flush_screen`); `jsmain` asks when `!opts.name` + default
  `paranoia_bits`; `getline.js` `yn_function`; `dopray` ParanoidPray
  confirm.
- **Verification:** seed0017 **PASS** RNG **3465**/3465 Scr **67**/67
  + strict; green+cohort PASS; full **9/44** Scr **718** RNG
  **91965**.
- **Next:** seed2200 Scr 199 / seed0106 @ 2639 `do_attack` /
  seed0077 chargen `player_selection`.

## D-0103 — seed0106 `#chat` / `dochat` / `domonnoise` MS_BARK

- **Status:** fixed
- **Observed:** seed0106 @ **2639**: C `rn2(7)` @ `do_attack`
  vs JS `rn2(5)` @ `distfleeck`. Keys after prayer: `#chat\n` +
  `l` + `h`. Screen: empty-east chat then swap with little dog.
- **C locus:** `sounds.c` `dotalk`/`dochat`/`domonnoise` MS_BARK;
  `cmd.c` extcmdlist `"chat"`; `getline.js` EXT_CMDS.
- **Cause:** JS had no `#chat`. C uses `l` as getdir (0 RNG, chat
  empty → ECMD_OK); JS treated `l` as move east → turn +
  `distfleeck`. Second `#chat`+`l` talks to dog after swap →
  `"The little dog barks."` + ECMD_TIME.
- **Change:** `js/sounds.js` (`dotalk`/`dochat`/`domonnoise`
  MS_BARK via S_DOG); `getline.js` EXT_CMDS `chat`.
- **Verification:** seed0106 prefix **2639→2713** (`kick_door`/
  `exercise`); green+strict PASS; cohort 1500/1800/0060/0102/
  0700/1150/0017 PASS; full **9/44** Scr **718** RNG
  **91887**/792838 (positional aggregate can drop when a wrong
  path’s accidental later matches disappear).
- **Named omission:** other MS_*; shop `price_quote`; wall/
  statue talk; `night()` howl; priest/`shk`/`quest` chat;
  `#chronicle`/`#conduct` still unknown.
- **Next:** seed0106 @ 2713 door kick / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0104 — seed0106 `kick_door` CLOSED/LOCKED bust

- **Status:** fixed
- **Observed:** seed0106 @ **2713**: C `rn2(19)` @ `exercise`
  then `rn2(40)`/`rnl(35)` @ `kick_door` vs JS `rn2(2)` (kick_ouch
  `exercise(A_DEX,FALSE)`).
- **C locus:** `dokick.c` `kick_door` (CLOSED/LOCKED after
  open/broken/nodoor → `kick_dumb`); `attrib.c` `exercise`;
  `rnd.c` `rnl`.
- **Cause:** JS `kick_door` deferred closed doors to `kick_ouch`
  (hurt path). C always `exercise(A_DEX,TRUE)` then
  `rnl(35) < avrg_attrib` (martial DEX bonus), then shatter /
  crash-open / Thwack-Whammm.
- **Change:** `js/dokick.js` `kick_door` CLOSED/LOCKED envelope
  (Levitation→ouch; DEX exercise; rnl bust; trap/shatter/crash;
  fail Thwack/Whammm).
- **Verification:** seed0106 prefix **2713→2912** (`monmulti`/
  `m_throw`); positional **2784→3159**/4194; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **718** RNG **92262**/792838.
- **Named omission:** `martial()`; giant doorbuster; shop
  `in_rooms`/`add_damage`/`pay_for_damage`; town watchman;
  `b_trapped` body; Blind `feel_location`; kick_monster/object/
  SDOOR-SCORR/furniture.
- **Next:** seed0106 @ 2912 `monmulti`/`mthrowu` / seed2200 Scr
  199 / seed0077 `player_selection`.

## D-0105 — seed0106 `thrwmu` / `monmulti` / move-then-shoot

- **Status:** fixed
- **Observed:** seed0106 @ **2912**: C `rnd(1)` @ `monmulti` then
  `next_ident`/`m_throw` `rn2(5)` vs JS still `m_move` `rn2(12)`.
- **C locus:** `monmove.c` `dochug` (MMOVE_MOVED fall-through);
  `mhitu.c` `mattacku` AT_WEAP `range2`; `mthrowu.c` `thrwmu`/
  `monshoot`/`monmulti`/`m_throw`/`thitu`/`u_catch_thrown_obj`/
  `drop_throw`; `weapon.c` `select_rwep`/`dmgval`;
  `dothrow.c` `should_mulch_missile`; `invent.c` `delobj`→
  `obj_resists(0,0)`.
- **Cause:** JS `dochug` returned early on `MMOVE_MOVED` and gated
  attacks on `nearby`, so ranged `thrwmu` never ran. C allows
  move-then-shoot when `!nearby && AT_WEAP`.
- **Change:** `js/monmove.js` fall-through; `js/mhitu.js` ranged
  `mattacku`; `js/mthrowu.js` + `js/weapon.js` throw envelope;
  `js/mkobj.js` `delobj`.
- **Verification:** seed0106 prefix **2912→2962** (`mattacku` melee);
  positional **3159→3217**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **92304**/792838.
- **Named omission:** melee `mattacku`/`hitmu`/`missmu`; polearm/
  spit/breath; `hold_another_object` on catch; `ohitmon`;
  `flooreffects`/ship; full `mattk[]`; elf/orc/gnome racial
  multishot; extractor `oc_wsdam` (table stand-in); `mon_wield`
  HTH; cursed slip path beyond roll.
- **Next:** seed0106 @ 2962 melee `mattacku` / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0106 — seed0106 `mattacku` melee / `hitmu`

- **Status:** fixed
- **Observed:** seed0106 @ **2962**: C `rnd(20)` @ `mattacku` then
  `hitmu` `d(1,4)` + `mhitm_knockback` vs JS `rn2(5)` `distfleeck`
  (no melee path). Screen: `"The kobold hits!"` HP 11→10.
- **C locus:** `mhitu.c` `mattacku` AT_WEAP `!range2` / `hitmu` /
  `hitmsg` / `mdamageu`; `uhitm.c` `mhitm_ad_phys` (mhitu bare /
  weapon); `uhitm.c` `mhitm_knockback`.
- **Cause:** JS `mattacku` only called `thrwmu` when `range2`;
  adjacent kobold (dart spent, `MON_WEP` null) needs melee
  `rnd(20+i)` → `hitmu`.
- **Change:** `js/mhitu.js` melee HTH + AT_WEAP envelope, `hitmu`/
  `hitmsg`/`missmu`/`mdamageu`, bare/`dmgval` ad_phys; export
  `get_mattk` / `mhitm_knockback` from `js/mhitm.js`.
- **Verification:** seed0106 prefix **2962→2982** (`hitum` next
  key); positional **3188**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **92375**/792838.
- **Named omission:** `hitval`/`mswings` (mixed-dir `rn2`);
  `mon_wield` HTH body; `wildmiss`/displace; `passiveum`;
  `summonmu`/were; hugs/gaze/expl/engl/brea/spit/magc; seduce
  hitmsg; undead midnight extra `d()`; `Half_physical_damage`/
  Mitre; `done_in_by`; full `mattk[]` beyond FIRST_ATTK table;
  knockback hurtle body.
- **Next:** seed0106 @ 2982 `hitum` / hero melee / seed2200 Scr
  199 / seed0077 `player_selection`.

## D-0107 — seed0106 `hitum` / hero melee

- **Status:** fixed
- **Observed:** seed0106 @ **2982**: C `rn2(20)` @ `gethungry` (via
  `overexertion`) then `exercise`/`hitum` `rnd(20)`/`dmgval`/
  `xkilled` vs JS `rn2(5)` `distfleeck` (hostile `do_attack`
  stubbed `return true` with no combat RNG).
- **C locus:** `hack.c` `overexertion` → `eat.c` `gethungry`;
  `uhitm.c` `do_attack` / `hitum` / `known_hitum` /
  `find_roll_to_hit` / `hmon`; `weapon.c` `dmgval`/`abon`;
  `mon.c` `killed`/`xkilled`/`corpse_chance`.
- **Cause:** JS `do_attack` only handled safemon; hostiles returned
  true without `overexertion`/`hitum`, so monsters still moved
  (`distfleeck`) while C resolved mace melee and killed the kobold.
- **Change:** `js/eat.js` export `gethungry`; `js/hack.js`
  `overexertion`; `js/uhitm.js` hostile `do_attack`→`hitum`/
  `hmon`/`xkilled`; `js/weapon.js` melee `OC_WSDAM` (MACE…);
  `js/cmd.js` `await do_attack`.
- **Verification:** seed0106 prefix **2982→2993** (post-kill
  `dog_goal`); positional **3201**/4194; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **718** RNG **92300**/792838.
- **Named omission:** `attack_checks` invis/mimic/peaceful yn;
  Cleaver/twoweapon/`double_punch`; full `hitval`/
  `weapon_hit_bonus`/`P_SKILL`; `dbon`/skill dam recalc;
  live knockback; `passive` counters; `make_corpse`/`mkobj`
  treasure bodies; `missum` near-miss flavor; `check_caitiff`;
  encumber `overexert_hp`.
- **Next:** seed0106 @ 2993 post-kill `dog_goal` / seed2200 Scr
  199 / seed0077 `player_selection`.

## D-0108 — seed0106 `mondead`→`relobj` minvent drop

- **Status:** fixed
- **Observed:** seed0106 @ **2993**: C `rn2(8)` @ `dog_goal` vs JS
  `rn2(100)` `obj_resists`. Kill RNG matched (`rn2(6)=2` no treasure,
  `rn2(3)=2` no corpse). C then had a second APPORT candidate; JS did
  not.
- **Rejected:** missing `make_corpse`/treasure body (this kill's rolls
  were false); rewriting `dog_goal` APPORT gates.
- **C locus:** `mon.c` `mondead` → `m_detach(due_to_death)` →
  `steal.c` `relobj(mtmp, 1, FALSE)`; `dogmove.c` `dog_goal` scans
  `fobj`.
- **Cause:** JS `mondead` removed the monster from `fmon` without
  dropping `minvent`. Kobold leftover darts never reached `fobj`, so
  post-kill `dog_goal` skipped the second APPORT `rn2(8)`.
- **Change:** `js/mkobj.js` `relobj_on_death`; wired from
  `js/uhitm.js` and `js/mhitm.js` `mondead` (before xkilled treasure/
  corpse RNG). Vault-guard gold / `flooreffects` omitted.
- **Verification:** seed0106 prefix **2993→4097** (`dipfountain`);
  positional **4114**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **93214**/792838.
- **Named omission:** vault-guard gold discard; `flooreffects` on
  death-drop; worn/saddle extrinsics update; `make_corpse` /
  xkilled treasure `mkobj` bodies still deferred.
- **Next:** seed0106 @ 4097 `dipfountain` / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0109 — seed0106 `#sit` + `#dip` / `dipfountain`

- **Status:** fixed
- **Observed:** seed0106 @ **4097**: C `rnd(30)` @ `dipfountain` vs JS
  `rn2(5)` `distfleeck`. Keys `#dip`→`d`→`y` on fountain; prior turn
  was `#sit` with `"Having fun sitting on the fountain?"`.
- **Rejected:** `#dip`-only without `#sit` (moves peel earlier to
  4073: JS `rnd(30)` while C still runs sit's monster-turn RNG).
- **C locus:** `sit.c` `dosit` default/`surface`; `potion.c` `dodip`;
  `fountain.c` `dipfountain`/`dryup`; `trap.c` `water_damage`
  (POT_WATER + force → ER_NOTHING); `objnam.c` holy-water xname/BUC.
- **Cause:** unbound `#sit`/`#dip` let later keys become moves. Fountain
  dip of holy water needs `water_damage` ER_NOTHING then `rnd(30)` /
  `dryup`.
- **Change:** `js/sit.js` `dosit`; `js/fountain.js` `dipfountain`/
  `dryup`; `js/potion.js` `dodip`; `js/trap.js` `water_damage`;
  `js/getline.js` extcmds `sit`/`dip`; `js/objnam.js` holy/unholy
  water naming.
- **Verification:** seed0106 prefix **4097→4141** (nhlib shuffle @
  `#version`); positional **4145**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **93267**/792838.
- **Named omission:** Excalibur LONG_SWORD body; wash_hands; dipfountain
  cases 17–29; potion_dip alchemy; sink/pool dips; town warn/
  angry_guards; grease/towel/container water_damage; `#offer`/
  `#enhance`/`#annotate`/`#overview`/`#version` bindings.
- **Next:** seed0106 @ 4141 `#offer`/`#enhance`/`#annotate` key
  ownership / seed2200 Scr 199 / seed0077 `player_selection`.

## D-0110 — seed0106 `#offer`/`#enhance`/`#annotate`/`#overview`/`#version`

- **Status:** fixed (RNG); screens residual
- **Observed:** seed0106 @ **4141**: C `rn2(3)` nhlib `shuffle(align)`
  via `#version`/`doextversion`/`get_lua_version` vs JS `rn2(5)`
  `distfleeck`. Keys after second dip: `#offer\n` `#enhance\n` ESC
  `#annotate\nTest level\n` `#overview\n` ESC `#version\n` (+ spaces).
- **Rejected:** treating only `#version` as missing without prior
  key-owning menus (unbound enhance ESC / annotate getlin / overview
  ESC become moves before version runs).
- **C locus:** `pray.c` `dosacrifice` (not-on-altar); `weapon.c`
  `enhance_weapon_skill` PICK_NONE; `dungeon.c` `donamelevel`/
  `query_annotation`/`dooverview`; `version.c` `doextversion`;
  `nhlua.c` `get_lua_version` → nhlib shuffle.
- **Cause:** unbound extcmds left ESC / `Test level` / overview ESC as
  free keys → movement RNG while C shows menus/getlin then `#version`
  shuffle (0 RNG until Enter on version).
- **Change:** `js/pray.js` `dosacrifice`; `js/weapon.js`
  `enhance_weapon_skill`; `js/dungeon.js` `donamelevel`/
  `query_annotation`/`dooverview` + lazy mapseen; `js/pager.js`
  export `doextversion`; `js/getline.js` EXT_CMDS bindings; `do_name`
  menu `a` → `donamelevel`.
- **Verification:** seed0106 RNG **4194**/4194 Scr **5**/267;
  strict lengths PASS; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **722** RNG **93316**/792838.
- **Named omission:** `floorfood` sacrifice body; enhance
  `add_skills_to_menu`/`can_advance`/`skill_advance`/wizard speedy;
  overview `traverse_mapseenchn`/`interest_mapseen`/feature lines;
  `#chronicle`/`#conduct`/`#vanquished`/`#genocided`/`#adjust`/
  `#terrain` (and other remaining extcmds).
- **Next:** seed0106 Scr residual / seed2200 Scr 199 /
  seed0077 `player_selection`.

## D-0111 — seed0077 `player_selection` / `genl_player_setup`

- **Status:** fixed (chargen path); mid-mklev residual
- **Observed:** seed0077 after askname "Shade": C
  `Shall I pick…` → `n` → role/race/gender menus → confirm →
  first RNG `rn2(1)=0 @ pick_align` (Rogue→chaotic via
  `plsel_startmenu`→`rigid_role_checks`) then gem shuffle. JS skipped
  selection and started `o_init` at `rn2(2)` (prefix **100**, Scr **6**).
- **Rejected:** treating seed0077 as rc-specified Rogue (nethackrc has
  no role/race/gender/align); skip-path only for already-specified facets.
- **C locus:** `role.c` `genl_player_setup` / `rigid_role_checks` /
  `pick_align` / `ok_*` / `plsel_startmenu` / `setup_*menu` /
  `role_menu_extra`; `wintty.c` `tty_player_selection`; H2344
  fullscreen when `maxrow>=rows`.
- **Cause:** no `player_selection` after askname; roles/races lacked
  `allow`/`selfmask`; tall role menu `paint_corner_nhw_menu` returned
  null on fullscreen; corner menus called `flush_screen` and invented
  botl during `in_role_selection`.
- **Change:** `js/player_selection.js`; roles/races/genders/aligns
  allow masks; `jsmain` → `player_selection` before `newgame`;
  `setup_role_race_from_rc` prefers `flags.init*`; invent fullscreen
  NHW_MENU + no status flush under `in_role_selection`.
- **Verification:** seed0077 prefix **100→1475** (`rnd_rect`/
  themerms); Scr **6→11**/33 (chargen through confirm); green+strict
  PASS; cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **746** RNG **101108**/792838.
- **Named omission:** filter-reset UI body; rename-in-confirm
  (`plnamesuffix` re-ask); SELECTSAVED; full `maybe_skip_seps` for
  non-24 rows; `doset`/`O` player_selection option.
- **Next:** seed0077 @ 1465 themerms/`rnd_rect` / seed2200 Scr 199 /
  seed0106 Scr residual.

## D-0112 — seed0077 `do_vault` `create_vault` fallback

- **Status:** fixed (RNG); screen residual remains
- **Observed:** seed0077 @ **1465**: C `rn2(1)` @ `rnd_rect` vs JS
  `rn2(6)`. After niches, vault `check_room` fails (`rn2(3)=1`);
  C then `rnd_rect() && create_vault()` burns **102** `rnd_rect`
  calls (outer null-check + create_room trycnt≤100) with
  `rect_cnt=1` before giving up; JS stubbed
  `else if (rnd_rect()) { /* simplified */ }` and continued into
  fill/branch with a different `rn2(6)`.
- **Rejected:** themerms/`check_room`/`split_rects` leaving extra JS
  rectangles during makerooms — prefix through niches matched;
  peel was the post-niche vault fallback stub.
- **C locus:** `mklev.c` `makelevel` vault block (`do_vault` /
  `check_room` / `create_vault`); `sp_lev.c` `create_room` vault
  arm (trycnt loop + `rnd_rect`).
- **Change:** `js/mklev.js` ports real fallback —
  `rnd_rect() && create_vault()` then re-`check_room` → fill or
  `rooms[nroom].hx = -1`.
- **Verification:** seed0077 RNG **3242**/3242 Scr **19**/33 +
  strict lengths; green+strict PASS; cohort 1500/1800/0060/0102/
  0700/1150/0017 PASS; full **9/44** Scr **759** RNG
  **104563**/792838.
- **Named omission:** `makevtele` still `makeniche(TELEP_TRAP)`
  stand-in; full vault fill/`mk_knox_portal` edge cases.
- **Next:** seed0077 Scr **19**/33 / seed2200 Scr 199 /
  seed0106 Scr residual.

## D-0113 — seed0077 door vision + pick_lock + DEC open-door

- **Status:** fixed
- **Observed:** seed0077 Scr **19**/33 with RNG full. Screen 6:
  Shall-I-pick topline color 0 vs C NO_COLOR(8). Screens 17+:
  south room invisible after "The door opens."; open-door cell
  ASCII `|` vs C DEC `a`; apply lockpick → JS "This doorway has
  no door." vs C "You cannot lock an open door."
- **Rejected:** further mklev/vault terrain mismatch — RNG already
  full; room3 existed in `rooms[]` with seenv=0 because LOS still
  blocked.
- **C locus:** `vision.c` `recalc_block_point`/`unblock_point`;
  `lock.c` `doopen_indir` + `pick_lock` `switch (doormask)`;
  `dat/symbols` DECgraphics `S_hodoor`/`S_vodoor` = meta-a;
  tty topline NO_COLOR for yn prompt.
- **Change:** `vision.js` `recalc_block_point` → `vision_reset`;
  `lock.js`/`dokick.js` call it before `vision_recalc`; `pick_lock`
  NODOOR/ISOPEN/BROKEN cases; `display.js` open door DEC `a`+brown;
  `shall_i_pick_prompt` uses `NO_COLOR`.
- **Verification:** seed0077 **PASS** (3242/3242, 33/33) + strict;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017 PASS;
  full **10/44** Scr **788** RNG **104575**/792838.
- **Named omission:** `pick_lock` CLOSED/LOCKED occupation +
  autounlock/credit-card; incremental `dig_point` (full reset OK);
  ASCII `|`/`-` open-door orientation when not DECgraphics.
- **Next:** seed2200 Scr 199 (RC path @158) / seed0106 Scr 5.

## D-0114 — option_help msg_window PREV_MSGS extract

- **Status:** fixed
- **Observed:** seed2200 screen 162 compound list showed
  `` `msg_window' - (not applicable) `` while C has the real
  `PREV_MSGS` description for ^P behavior.
- **C locus:** `optlist.h` `#if PREV_MSGS /* tty or curses */`
  vs `#else` `(not applicable)`; `scripts/extract-optlist.py`
  `eval_expr` left C comments in the expression → Python `eval`
  failed → False → wrong branch.
- **Change:** strip `/* … */` / `//` from `#if` expressions before
  eval; regenerate `js/generated/optlist_data.js`.
- **Verification:** seed2200 Scr **199→200**/230; green+cohort PASS;
  full **10/44** Scr **851** RNG **104575**/792838.
- **Named omission:** recording `get_configfile` absolute path still
  harness-only (screen 158); `dokeylist` / menu-controls stubs.
- **Next:** seed0106 Scr / seed2200 `dokeylist` @184.

## D-0115 — Primary ASCII vs `symset:DECgraphics`

- **Status:** fixed
- **Observed:** seed0106 (no `symset` in rc) Scr **5**/267 with RNG
  full: JS painted DEC walls/floors (`┌`/`·`) while C used Primary
  ASCII (`-`/`|`/`.`). Green/PASS cohort all set `symset:DECgraphics`.
- **Rejected:** further seed0106 Scr as only enhance/overview stubs —
  first miss was map glyphs from forced DEC.
- **C locus:** `options.c` / `symbols.c` default Primary showsyms;
  `OPTIONS=symset:DECgraphics` loads H_DEC; `display.c`
  `back_to_glyph` DOOR uses `horizontal` → `S_hodoor`/`S_vodoor`
  (ASCII `|`/`-`; DEC both meta-a); `defsym.h` S_room `.` vs DEC `~`.
- **Change:** `jsmain.js` sets `iflags.decgraphics` from rc;
  `display.js` ASCII vs DEC wall/floor/ndoor/open-door tables;
  `options.js` parses boolean `DECgraphics`.
- **Verification:** seed0106 Scr **5→32**/267; seed0107 Scr **1→35**;
  green+cohort PASS + strict; full **10/44** Scr **788→851** RNG
  **104575**/792838.
- **Named omission:** full `load_symset`/IBM/UTF8; `iflags.use_color`
  gating of `obj_color`/`mon_color` when `OPTIONS=color` absent
  (seed0106 potion `!` yellow vs NO_COLOR); `dokeylist`.
- **Next:** seed0106 @13 angrygods quote/`--More--` split /
  extcmd progressive `# c` paint / seed2200 `dokeylist`.

## D-0116 — angrygods `verbalize` + `adjattrib` You_feel

- **Status:** fixed
- **Observed:** seed0106 Scr **32**/267 first miss @13: C
  `"Thou art arrogant, mortal."  "Thou must relearn thy lessons!"--More--`
  vs JS second clause unquoted and no `--More--`; next key became
  `Unknown command ' '.` instead of `You feel foolish!`.
- **C locus:** `pray.c` `angrygods` case 2/3; `pline.c` `verbalize`;
  `attrib.c` `adjattrib` (`msgflg<=0` → `You_feel("%s!", minusattr)`).
- **Cause:** JS used bare `pline` for the relearn line (no quotes) and
  silent `adjattrib`, so `You_feel("foolish!")` never ran and never
  forced `more()` on the combined quote topline.
- **Change:** `display.js` `verbalize`/`You_feel`; `attrib.js`
  `adjattrib` async messaging + ACURR gate; `pray.js` case 2/3 uses
  `verbalize` + `await adjattrib(..., false)`; `vary_init_attr`/
  `u_init_inventory_attrs` await the async path.
- **Verification:** seed0106 Scr **32→34**/267 (screens 13–15 match);
  next miss @16 progressive `# c` vs `# chat`; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44**
  Scr **851→853** RNG **104575**/792838.
- **Named omission:** Fixed_abil/Dunce/verbose adjattrib; Unaware
  You_feel dream prefix; angrygods 4+; progressive extcmd paint.
- **Next:** seed0106 extcmd `# c` progressive getline /
  seed2200 `dokeylist` @184.

## D-0117 — seed0106 progressive `# c` / `# ch` extcmd paint

- **Status:** fixed
- **Observed:** seed0106 Scr **34**/267 first miss @16: after `#` then
  `c`, C topline `# c` vs JS `# chat` (same cursor col 3); `@17` `# ch`
  vs `# chat`. Screens 18–19 (`a`/`t`) already matched after C also
  expands at `"cha"`.
- **C locus:** `win/tty/getline.c` `ext_cmd_getlin_hook` →
  `cmd.c` `extcmds_match(..., ECM_NOFLAGS)`; `extcmdlist[]` AUTOCOMPLETE
  names (chat/chronicle/conduct share `"c"`/`"ch"`).
- **Cause:** JS autocomplete uniqueness used only the runnable
  `EXT_CMDS` subset, so `"c"` uniquely matched `chat`. C matches against
  every AUTOCOMPLETE entry (wizard-gated), so expansion waits until
  `"cha"`.
- **Change:** `getline.js` `EXT_CMD_AC` = full C AUTOCOMPLETE name set
  for hook uniqueness; `EXT_CMDS` remains the runnable subset for Enter
  dispatch.
- **Verification:** seed0106 Scr **34→38**/267 (screens 16–17 and
  24–25 match); next miss @34 potion `!` color 11 vs NO_COLOR 8;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **10/44** Scr **853→857** RNG **104575**/792838.
- **Named omission:** full runnable `extcmdlist` bodies; `extcmds_match`
  ECM_IGNOREAC exact-enter for non-AC names; `iflags.use_color` mapglyph
  gating (next peel).
- **Next:** seed0106 `use_color` / potion glyph color @34 /
  seed2200 `dokeylist` @184.

## D-0118 — `obj_is_generic` + tty gray/black → NO_COLOR

- **Status:** fixed
- **Observed:** seed0106 Scr **38**/267 first miss @34: map potion `!`
  at (71,9) JS CLR_YELLOW(11) vs C NO_COLOR(8). RNG **full** match;
  fruit juice otyp 319 shuffled to golden/yellow; C raw `|...!|` had no
  `\033[93m` (unlike yellow `<` on scr 29–33).
- **Rejected:** missing `OPTIONS=color` / `iflags.use_color` off —
  same session paints yellow stairs and white `@`/pet; color default
  On; forcing all yellow `!`→NO_COLOR is a hack (seed0002 has real
  yellow `!` when `dknown`).
- **C locus:** `display.h` `obj_is_generic` / `obj_to_glyph` /
  `generic_obj_to_glyph` — `!dknown` potions (and gems/spellbooks) use
  `objects[oclass]` (GENERIC_POTION CLR_GRAY), not per-otyp `oc_color`.
  Contest `006-nomux-capture.patch`: CLR_GRAY and CLR_BLACK record as
  default fg → decoded NO_COLOR.
- **Change:** `js/display.js` `obj_is_generic` + generic class color in
  `obj_glyph`; `tty_map_color` in `show_glyph_cell` maps
  CLR_GRAY/CLR_BLACK → NO_COLOR.
- **Verification:** seed0106 Scr **38→46**/267; next miss combat
  dart topline; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; seed2200 Scr
  **200**/230 unchanged; full **10/44** Scr **857→916** RNG
  **104575**/792838 (seed0030 Scr **46→97**).
- **Named omission:** hallu `random_obj_to_glyph`; pile-top generic
  offsets; when floor see sets `dknown` (colored potions after known).
- **Next:** seed0106 mthrowu/hit dart pline @46 /
  seed2200 `dokeylist` @184.

## D-0119 — mthrowu `canseemon`/`thitu` + melee skip hit-on-kill

- **Status:** fixed
- **Observed:** seed0106 Scr **46**/267 first miss @40: C topline
  `You are hit by a dart.` vs JS
  `The kobold throws dart!  You are hit by dart!`. Map at that step
  has no visible `k` (kobold still off-screen). Later @43: C
  `You kill the kobold!` vs JS
  `You hit the kobold.  You kill the kobold!`.
- **Cause/evidence:** JS `monshoot` used `couldsee && !minvis` as
  `canseemon`, so dark-corridor LOS still printed the throw pline;
  C `_canseemon` needs `cansee`/`see_with_infrared` + `mon_visible`.
  `thitu` omitted `an()`/`exclam` and miss plines (`A dart misses you.`).
  Melee `hmon` always printed `You hit` before damage; C
  `hmon_hitmon_msg_hit` skips when `destroyed` (non-thrown).
- **C locus:** `display.h` `_canseemon`; `mthrowu.c` `monshoot`/`thitu`;
  `zap.c` `exclam`; `uhitm.c` `hmon_hitmon_msg_hit`.
- **Change:** `js/mthrowu.js` real `canseemon`, `thitu` an/exclam/miss,
  `monshoot` `an(singular)`; `js/uhitm.js` apply damage then skip hit
  pline when destroyed.
- **Verification:** seed0106 Scr **46→49**/267 (next: floor `)` vs `#`
  at death-drop cell); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **916→919** RNG **104575**/792838.
- **Named omission:** `mshot_xname` multishot "Nth"; `obj_is_pname`/
  `the()`; thrown multishot hit-when-destroyed; surviving-hit
  `canseemon ? exclam : "."`; death-drop map glyph/`newsym` after kill.
- **Next:** seed0106 death-drop floor glyph @44 /
  seed2200 `dokeylist` @184.

## D-0120 — `newsym` memory under visible monster (`_map_location`)

- **Status:** fixed
- **Observed:** seed0106 Scr **49**/267 first miss @44: C map `)` (thrown
  dart) vs JS corridor `#` at the same cell. Screens 42–43 already matched
  (`k@)` then `)@d`); the glyph vanished after the pet left the cell once
  it was out of `cansee` (dark corridor, two steps from hero).
- **Cause/evidence:** Object was on the floor (`drop_throw` + remaining
  minvent via `relobj_on_death`). When the pet stood on it while `cansee`,
  JS `newsym` painted the monster and set `remembered_glyph` to **terrain**.
  C `newsym` calls `_map_location(x,y,FALSE)` before `display_monster`, so
  hero_memory keeps the object glyph. After the cell left sight, JS replayed
  remembered `#` while C kept `$`/`)`.
- **C locus:** `display.c` `newsym` / `_map_location` (show=0 under mon).
- **Change:** `js/display.js` `map_location_memory` + call from the
  `cansee`+visible-monster arm of `newsym`.
- **Verification:** seed0106 Scr **49→250**/267; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **919→1120** RNG **104575**/792838.
- **Named omission:** hero-underfoot `_map_location` (still terrain-only;
  mapping under `@` regresses seed0060 gold `$`); infrared sensed-monster
  path still skips `_map_location`; traps/engravings in
  `map_location_memory`.
- **Next:** seed0106 `#dip` yn @110 / garlic doname @116 /
  seed2200 `dokeylist` @184.

## D-0121 — yn leave prompt + cleric skip `"uncursed "`

- **Status:** fixed
- **Observed:** seed0106 Scr **250**/267 first miss @110: C topline still
  `Dip 4 potions of holy water into the fountain? [yn] (n)` with hero
  cursor after a silent fountain curse (`rnd(30)=16`, `rn2(3)=1` no dryup);
  JS blank topline. @116: C `Dip 2 cloves of garlic…` vs JS
  `Dip 2 uncursed cloves of garlic…`.
- **Cause/evidence:** JS `yn_function` cleared `_pending_message` on every
  answer; C `tty_yn_function` leaves the prompt (`TOPLINE_NON_EMPTY`) until
  the next pline / `rhack` clear-after-capture. Holy-water case 16
  `curse()` is silent and dryup skipped, so the yn text must survive until
  the next-command nhgetch. Garlic BUC: C `doname` omits `"uncursed "` when
  `Role_if(PM_CLERIC)` (priest always knows BUC); JS always printed it for
  bknown uncursed non-charged items.
- **C locus:** `win/tty/topl.c` `tty_yn_function` clean_up;
  `objnam.c` `doname` uncursed + `!Role_if(PM_CLERIC)`.
- **Change:** `js/getline.js` `yn_function` keep prompt after answer;
  `js/objnam.js` `doname` skip uncursed for `PM_CLERIC`.
- **Verification:** seed0106 Scr **250→253**/267 (next: enhance menu
  offx @133); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1120→1123** RNG **104575**/792838.
- **Named omission:** `doname` uncursed still omits SCR_MAIL /
  AMULET_OF_YENDOR / FAKE_AMULET exclusions; `dodip` uses `doname` not
  `short_oname` length fallback.
- **Next:** seed0106 enhance menu @133 / seed2200 `dokeylist` @184.

## D-0122 — `#enhance` skill_init + add_skills_to_menu (paged PICK_NONE)

- **Status:** fixed
- **Observed:** seed0106 Scr **253**/267 first miss @133: C fullscreen
  `Current skills:` + Fighting/Weapon/Spellcasting skill list +
  `(1 of 2)`; JS corner overlay stub `(no skills ready to advance)`.
- **Cause/evidence:** `u_init_skills_discoveries` never called
  `skill_init`, so `weapon_skills[]` stayed unset; `enhance_weapon_skill`
  painted a three-line stub via corner NHW_MENU. C builds the real menu
  via `add_skills_to_menu` after invent→Basic / role maxes; tty_end_menu
  prepends prompt+blank; lmax=23 yields two pages; seed presses `\n` on
  page 1 (dismiss without page 2). Not an H2344 offx bug.
- **C locus:** `weapon.c` `skill_init` / `add_skills_to_menu` /
  `enhance_weapon_skill`; `wintty.c` `tty_end_menu` /
  `process_menu_window` PICK_NONE paging; `u_init.c`
  `u_init_skills_discoveries`.
- **Change:** `js/weapon.js` `skill_init`/`P_NAME`/`add_skills_to_menu`/
  enhance rewrite; `js/u_init.js` Skill_T/Skill_R + call `skill_init`;
  `js/invent.js` `select_menu_pick_none` (lmax=23, `(N of M)`).
- **Verification:** seed0106 Scr **253→254**/267 (next: overview
  features @165); seed0107 Scr **35→36**; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1123→1125** RNG **104575**/792838.
- **Named omission:** wizard speedy y_n; `can_advance`/`could_advance`/
  `peaked_skill` annotations; `skill_advance`; `skill_based_spellbook_id`;
  `unrestrict_weapon_skill(spelspec)`; `#chronicle`.
- **Next:** seed0106 `#overview` features @165 / seed2200 `dokeylist`
  @184.

## D-0123 — `#overview` mapseen features (`lastseentyp` / `recalc_mapseen`)

- **Status:** fixed
- **Observed:** seed0106 Scr **254**/267 first miss @165: C corner
  overview shows `A fountain.` under Level 1; JS only dungeon header +
  Level line + `(end)`. Header/`(end)` offx also short by 3 cols.
- **Cause/evidence:** `dooverview` never called `recalc_mapseen` /
  `print_mapseen` OF_INTEREST; `update_lastseentyp` was deferred in
  `newsym`/`magic_map_background`. Level line used PREFIX (6 spaces)
  instead of C TAB (3), so with a feature line H2344 `maxcol`/`offx`
  diverged even after adding the sentence.
- **C locus:** `dungeon.c` `update_lastseentyp` / `count_feat_lastseentyp`
  / `recalc_mapseen` / `show_overview` / `print_mapseen` (`TAB` vs
  `PREFIX` / `ADDNTOBUF`); `display.c` `_map_location` /
  `magic_map_background` call `update_lastseentyp`.
- **Change:** `js/dungeon.js` lastseentyp + feat count + overview
  feature sentence; Level `   ` TAB; `js/display.js` /
  `js/mklev.js` update/clear lastseentyp on map/level.
- **Verification:** seed0106 Scr **254→255**/267 (next: `#chronicle`
  @188); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1125→1126** RNG
  **104575**/792838.
- **Named omission:** shop/temple room traversal; `shop_string` /
  altar-to-god; altar `msalign`; DRAWBRIDGE_UP / furniture-mimic
  lastseentyp; `traverse_mapseenchn` / `interest_mapseen` / auto
  annotations; Blind bigroom / bones / valley/sanctum flags;
  `#chronicle`.
- **Next:** seed0106 `#chronicle` @188 / seed2200 `dokeylist` @184.

## D-0124 — `#chronicle` / `do_gamelog` / `show_gamelog`

- **Status:** fixed
- **Observed:** seed0106 Scr **255**/267 first miss @188: C NHW_TEXT
  `Logged events:` / ` Turn` / five lines (enter dungeon, rejected
  atheism, lost all experience, first weapon hit, first kill); JS
  `#chronicle: unknown extended command.`
- **Cause/evidence:** `#chronicle` was AUTOCOMPLETE-only (D-0117) with
  no `EXT_CMDS` runner; `gg.gamelog` / `livelog_printf` never written.
  Expected text matches C `show_gamelog(ENL_GAMEINPROGRESS)`.
- **C locus:** `cmd.c` extcmd → `insight.c` `do_gamelog` /
  `show_gamelog`; `pline.c` `gamelog_add` / `livelog_printf`;
  `allmain.c` `welcome` enter-dungeon; `pray.c` gnostic conduct;
  `exper.c` `losexp` ulevel==1; `uhitm.c` `first_weapon_hit`;
  `mon.c` `xkilled` killer conduct.
- **Change:** `js/pline.js` gamelog append; `js/insight.js`
  `do_gamelog`/`show_gamelog`; `js/getline.js` chronicle runner;
  wire welcome/pray/losexp/weaphit/killer; export `show_text_pages`.
- **Verification:** seed0106 Scr **255→257**/267 (next: `#conduct`
  @199); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1126→1128** RNG
  **104575**/792838.
- **Named omission:** `livelog_add` file write; final/Major
  `show_gamelog`; other livelog sites (wish/genocide/achieve/…);
  artifact/cursed-bknown `first_weapon_hit`; `#conduct`/
  `#vanquished`/`#genocided`.
- **Next:** seed0106 `#conduct` @199 / seed2200 `dokeylist` @184.

## D-0125 — `#conduct` / `doconduct` / `show_conduct`

- **Status:** fixed
- **Observed:** seed0106 Scr **257**/267 first miss @199: C NHW_MENU
  corner `Voluntary challenges:` + foodless/illiterate/genocide/
  polypile/polyself/wishless lines; JS `#conduct: unknown extended
  command.`
- **Cause/evidence:** `#conduct` was AUTOCOMPLETE-only with no
  `EXT_CMDS` runner. Expected overlay matches C `show_conduct(
  ENL_GAMEINPROGRESS)` with present-tense `enl_msg` + contractions;
  petless omitted because `initedog` bumps `u.uconduct.pets`.
- **C locus:** `cmd.c` extcmd → `insight.c` `doconduct` /
  `show_conduct` / `enlght_line` / `num_genocides` /
  `sokoban_in_play`; `dog.c` `initedog` `u.uconduct.pets++`.
- **Change:** `js/insight.js` `doconduct`/`show_conduct`; export
  `show_nhw_menu_text`; `js/getline.js` conduct runner; `js/dog.js`
  `initedog` pets++.
- **Verification:** seed0106 Scr **257→259**/267 (next: `#vanquished`
  @213); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1128→1130** RNG
  **104575**/792838.
- **Named omission:** `show_achievements` body (final/wizard only);
  livelog first-pet; food/vegan bump sites beyond existing counters;
  final disclosure `show_conduct`.
- **Next:** seed0106 `#vanquished` @213 / seed2200 `dokeylist` @184.

## D-0126 — `#vanquished` / `list_vanquished` + `mvitals.died` + empty `#genocided`

- **Status:** fixed
- **Observed:** seed0106 Scr **259**/267 first miss @213: C NHW_MENU
  corner `Vanquished creatures:` + `  a kobold` / `  a lichen` /
  `2 creatures vanquished.`; JS `#vanquished: unknown extended
  command.` (and `mvitals[].died` never incremented). Screen @226:
  C `No creatures have been genocided.`; JS unknown extcmd.
- **Cause/evidence:** `#vanquished`/`#genocided` were AUTOCOMPLETE-only
  with no runners. Even with a runner, `mondead` omitted C's
  `svm.mvitals[mndx].died++`, so the census would always be empty.
  Expected overlay matches traditional `VANQ_MLVL_MNDX` sort (both
  mlevel 0 → mndx kobold before lichen) with `an()` + 3-digit pfx
  padding.
- **C locus:** `cmd.c` extcmd → `insight.c` `dovanquished` /
  `list_vanquished` / `vanqsort_cmp` / `dogenocided` /
  `list_genocided`; `mon.c` `mondead` `mvitals[].died++`.
- **Change:** `js/mon.js` `record_mvitals_died`; call from
  `uhitm.js`/`mhitm.js` `mondead`; `js/insight.js`
  `dovanquished`/`list_vanquished`/`vanqsort_cmp` + empty
  `dogenocided`/`list_genocided`; `js/getline.js` runners;
  export `makeplural`; `M2_PNAME`.
- **Verification:** seed0106 Scr **259→262**/267 (next: `#adjust`
  @235); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1130→1133** RNG
  **104575**/792838.
- **Named omission:** `set_vanq_order` / `m #vanquished` force_sort;
  disclose yn ask; class-header / numeric-mlet MCLS modes; dumplog
  `'d'`; Hallucination footer; `#genocided` ngone>0 NHW_MENU +
  extinctions; cham/were restore before `monsndx` in `mondead`.
- **Next:** seed0106 `#adjust` @235 / seed2200 `dokeylist` @184.

## D-0127 — `#adjust` / `doorganize` getobj + destination cancel

- **Status:** fixed
- **Observed:** seed0106 Scr **262**/267 first miss @235: C
  `What do you want to adjust? [a-h or ?*]` then
  `Adjust letter to what [ai-zA-Z] (? see used letters)?` then
  Esc → `Never mind.`; JS `#adjust: unknown extended command.`
- **Cause/evidence:** `#adjust` was AUTOCOMPLETE-only (`EXT_CMD_AC`)
  with no `EXT_CMDS` runner. C `doorganize` → `getobj("adjust")` →
  `doorganize_core` destination `yn_function` (NULL resp).
- **C locus:** `cmd.c` extcmd → `invent.c` `doorganize` /
  `doorganize_core` / `adjust_ok` / `compactify` / `prinv`.
- **Change:** `js/invent.js` `doorganize`/`doorganize_core`/
  `getobj_adjust` (suggest non-gold, destination letter list,
  Esc cancel, move/collect/swap/merge without count-split);
  `js/getline.js` `#adjust` runner.
- **Verification:** seed0106 Scr **262→264**/267 (next: `#terrain`
  @253); green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/
  0017/0077 PASS; full **10/44** Scr **1133→1135** RNG
  **104575**/792838.
- **Named omission:** getobj count-split / `splitobj`;
  `display_used_invlets` / `display_pickinv` for `?`/`*`;
  `check_invent_gold` / wonky-gold `adjust_gold_ok`;
  `adjust_split` / itemactionsions; pack-full bump on split;
  floating `!invlet_constant` `reassign` truncate.
- **Next:** seed0106 `#terrain` @253 / seed2200 `dokeylist` @184.

## D-0128 — `#terrain` / `doterrain` View which? menu + Esc cancel

- **Status:** fixed
- **Observed:** seed0106 Scr **264**/267 first miss @253: C
  `View which?` / `a * known map without monsters, objects, and traps`
  / `b -` / `c -` / `(end)`; JS `#terrain: unknown extended command.`
- **Cause/evidence:** `#terrain` was AUTOCOMPLETE-only (`EXT_CMD_AC`)
  with no `EXT_CMDS` runner. Session Esc-cancels before
  `reveal_terrain` (moves `#terrain\n\x1b`).
- **C locus:** `cmd.c` `doterrain`; `detect.c` `reveal_terrain` /
  `browse_map` / `map_redisplay`; contest `006-nomux` selected → `*`.
- **Change:** `js/detect.js` `doterrain` (recalc_mapseen + PICK_ONE
  a/b/c + explore/wizard 4–6; Esc/`letter`/space-return) + partial
  `reveal_terrain`/`browse_map`/`map_redisplay`; `js/getline.js`
  `#terrain` runner.
- **Verification:** seed0106 Scr **264→265**/267 (next: `+` spells
  @257 / attributes @261); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1135→1136** RNG **104575**/792838.
- **Named omission:** `reveal_terrain_getglyph` / `show_glyph` map
  rewrite; `unconstrain_map` underwater/buried/swallow;
  `wiz_map_levltyp` / `wiz_levltyp_legend`; terrainmode autodescribe
  glyph path in getpos; TER_FULL explore map body.
- **Next:** seed0106 `+`/`dovspell`/`initialspell` @257 /
  seed2200 `dokeylist` @184.

## D-0129 — `initialspell` + `dovspell` VIEW menu + `age_spells`

- **Status:** fixed
- **Observed:** seed0106 Scr **265**/267 @257: C `Currently known spells`
  with `a - detect monsters` / `b - remove curse` / Fail% / Retention /
  `+ - [sort spells]`; JS stub `You don't know any spells right now.`
- **Cause/evidence:** `ini_inv_use_obj` never called `initialspell` for
  SPBOOK; no `spl_book` / `age_spells`; `dovspell` empty stub. Priest
  kit learns two books at init; Fail% needs role `spel*` +
  `percent_success`; Retention needs `age_spells` each turn (KEEN−turns).
- **C locus:** `spell.c` `initialspell` / `dovspell` / `dospellmenu` /
  `percent_success` / `spellretention` / `age_spells`; `u_init.c`
  `ini_inv_use_obj`; `allmain.c` moveloop `age_spells`; `role.c` Role
  `spelbase`…`spelsbon`.
- **Change:** `js/spell.js` (spl_book, initialspell, percent_success,
  retention, VIEW menu); roles `spel*` → `game.urole`; wire
  `ini_inv_use_obj` + `age_spells` in moveloop; capture
  `serialize_for_scoring` preserves leading inverse spaces; fullscreen
  menu leading pad attr 0 (C tty).
- **Verification:** seed0106 Scr **265→266**/267 (next: `^X`
  attributes @261); green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1136→1139** RNG **104575**/792838; seed2200 Scr **200→201**.
- **Named omission:** spell swap/sort bodies; `docast`/`spelleffects`;
  `skill_based_spellbook_id` / spelspec unrestrict; wizard turns column;
  `force_learn_spell` / read-book path.
- **Next:** seed0106 `^X`/`doattributes` @261 / seed2200 `dokeylist` @184.

## D-0130 — kill XP + doattributes article / energy phrasing

- **Status:** fixed
- **Observed:** seed0106 Scr **266**/267 @261: JS `a Aspirant` /
  `0 experience points` / `both energy points` vs C `an Aspirant` /
  `6 experience points` / `all 8 energy points (spell power)`.
- **Cause/evidence:** `xkilled` never called `experience`/`more_experienced`
  (`uexp` stayed 0 after kobold kill = 6 XP). Attributes page hardcoded
  `"a "` and `"both energy points"` instead of C `an(rank)` and
  `basics_enlightenment` pwmax rules (`all N` when pw==pwmax && pwmax>2).
- **C locus:** `exper.c` `experience` / `more_experienced` / `newuexp` /
  `newexplevel`; `mon.c` `xkilled` cleanup; `insight.c`
  `background_enlightenment` / `basics_enlightenment`; `objnam.c` `an`;
  `include/monsters.h` mattk for XP attack bonuses.
- **Change:** extract full `mattk[]` into `monsters_data.js`; port
  `experience`/`more_experienced`/`newuexp`/`newexplevel`; wire after
  corpse RNG in `xkilled`; doattributes uses `an(rank)` + real uexp +
  C energy/HP phrasing; init `urexp=0`.
- **Verification:** seed0106 **PASS** (RNG 4194/4194 Scr 267/267);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **11/44** Scr **1139→1141** RNG **104575**/792838;
  seed2200 Scr **201→202**/230.
- **Named omission:** xkilled murder/peaceful luck/`adjalign` after XP;
  eel `AD_WRAP` Amphibious +1000; MAIL_DAEMON XP=1; `exp_percent_changing`;
  SCORE_ON_BOTL; `get_mattk` still uses compact FIRST_ATTK (extracted
  mattk used by `experience`); wizard next-level XP line on ^X.
- **Next:** seed2200 `dokeylist` @184 / seed0501 `wipeout_text` /
  seed0015/0200 `lspo_map`.

## D-0131 — dokeylist / show_menu_controls / docontact + usagehlp trailing blank

- **Status:** fixed
- **Observed:** seed2200 Scr **202**/230; help `j` was `(key list stub)`
  vs C `Full Current Key Bindings List`; help `l`/`o` stubs. After
  dokeylist aligned, usagehlp ended one `--More--` early (missing empty
  trailing page) → Unknown command cascade.
- **Cause/evidence:** no `dokeylist`/`show_menu_controls` port; `display_file`
  stripped all trailing blank lines while C keeps the intentional EOF blank
  from usagehlp's final `\n\n`.
- **C locus:** `cmd.c` `dokeylist` / `keylist_putcmds` / `show_direction_keys`
  / `key2txt` / `commands_init`+`reset_commands` (N_DIRS=8); `options.c`
  `show_menu_controls`; `pager.c` `domenucontrols` / `docontact`;
  `files.c`/`windows.c` `display_file` line list.
- **Change:** `scripts/extract-extcmdlist.py` → `extcmdlist_data.js`;
  `js/dokeylist.js` (!num_pad default binds); wire help `j`/`l`/`o`;
  `display_file` pops only the split artifact `\n`, not intentional blanks.
- **Verification:** seed2200 Scr **202→227**/230 (RNG full); remaining
  @158 RC path (parked), @222 disco missing `*` spellbooks, @229
  Elbereth look; green+strict PASS; cohort 1500/1800/0060/0102/0700/
  1150/0017/0077/0106 PASS; full **11/44** Scr **1141→1166** RNG
  **104575**/792838.
- **Named omission:** custom BIND=/number_pad/swap_yz/rest_on_space;
  menu_shift; CMD_PARAM bound params; recording `get_configfile` path.
- **Next:** seed2200 disco @222 / Elbereth `:` @229 / seed0501
  `wipeout_text` / `lspo_map` / `getbones`.

## D-0132 — Wizard skill_based_spellbook_id (disco `*` books)

- **Status:** fixed
- **Observed:** seed2200 Scr @222 `\`; C listed ten `* spellbook of …`
  after force bolt / create monster; JS jumped from copper book to
  Potions (missing skill-ID discoveries).
- **Cause/evidence:** `skill_init` omitted C's trailing
  `unrestrict_weapon_skill(spell_skilltype(spelspec))` and
  `skill_based_spellbook_id()`. Wizard BASIC attack/enchantment IDs
  books through level 3 via `discover_object(..., TRUE, FALSE)` so
  disco shows `*` (known, not encountered).
- **C locus:** `spell.c` `skill_based_spellbook_id`; `weapon.c`
  `skill_init` (post-advance fill) / `skill_advance` spell-school gate.
- **Change:** ported `skill_based_spellbook_id` in `js/spell.js`; wire
  from `skill_init` with spelspec unrestrict; non-pauper only.
- **Verification:** seed2200 Scr **227→228**/230 (then +Elbereth →229);
  green+strict PASS; cohort PASS; full **11/44** Scr **1166→1169** RNG
  **104575**/792838.
- **Named omission:** `skill_advance` → `skill_based_spellbook_id` when
  `#enhance` advances a spell school; pauper L0 path untested in public
  sessions.
- **Next:** Elbereth `:` / parked RC @158 / `wipeout_text` / `lspo_map`.

## D-0133 — read_engr_at for `:` look (Elbereth)

- **Status:** fixed
- **Observed:** seed2200 Scr @229 `:`; C
  `Something is written here in the dust.  You read: "Elbereth".--More--`;
  JS `You see no objects here.` (cursor at hero).
- **Cause/evidence:** `make_engr_at` already stored the DUST Elbereth;
  `look_here` / `check_here` deferred `read_engr_at`, so the empty-floor
  path only printed the no-objects pline.
- **C locus:** `engrave.c` `read_engr_at`; `invent.c` `look_here` /
  `dolook`; `pickup.c` `check_here` (ct==0 branch).
- **Change:** ported `read_engr_at` (DUST/ENGRAVE/BURN/MARK/blood
  non-Blind envelope); call from `look_here` and `check_here`.
- **Verification:** seed2200 Scr **228→229**/230 (cursors **230**/230);
  sole remaining miss parked RC path @158; green+strict PASS; cohort
  PASS; full **11/44** Scr **1169** RNG **104575**/792838.
- **Named omission:** Blind feel for engrave/burn; full `surface()` /
  `is_ice` nouns; multi-object menu order of `read_engr_at` after
  display; engraving glyphs in `newsym`.
- **Next:** seed0501/0105 `wipeout_text` / seed0015/0200 `lspo_map` /
  seed0101 `next_ident` / `getbones` (blocked on `^V`/`makemaz`).

## D-0134 — makeniche trap engraving + wipe_engr_at / wipeout_text

- **Status:** fixed
- **Observed:** seed0501 @ **1153** / seed0105 @ **974**: C
  `rn2(11)` @ `wipeout_text(engrave.c:134)` (length of `"ad aerarium"`);
  JS `rn2(5)` from a later unrelated path — vault `makevtele` →
  `makeniche(TELEP_TRAP)` never aged the niche dust engraving.
- **Cause/evidence:** JS `makeniche` placed the trap but omitted C's
  `trap_engravings[]` → `make_engr_at(..., DUST)` + `wipe_engr_at(..., 5)`;
  `wipe_engr_at` / production `wipeout_text` were stubs or mklev-local only.
- **C locus:** `mklev.c` `makeniche` / `makevtele`; `engrave.c`
  `wipe_engr_at` / `wipeout_text` / `make_engr_at`.
- **Change:** ported `wipeout_text` + `wipe_engr_at` in `engrave.js`;
  wired `trap_engravings` + place/age in `makeniche`; graffiti path now
  calls `make_engr_at` with MARK.
- **Verification:** seed0501 prefix **1153→2205** (`spelleffects_check`);
  seed0105 RNG **2499**/2499 (Scr still **0**/30); green+strict PASS;
  cohort 1500/1800/0060/0106 PASS; full **11/44** Scr **1176** RNG
  **107102**/792838.
- **Named omission:** `Can_fall_thru` before hole→ROCKTRAP (JS always
  converts holes, so TRAPDOOR niche never gets `"Vlad was here"`);
  wipeout seeded path; `maybe_smudge_engr`; `get_rnd_text(ENGRAVEFILE)`
  for `random_engraving`.
- **Next:** seed0501 `spelleffects_check` @ 2205 / seed0105 screens /
  seed0015 `lspo_map` / seed0101 `next_ident`.

## D-0135 — Z / docast / spelleffects_check + SPE_HEALING self-zap

- **Status:** fixed
- **Observed:** seed0501 @ **2205**: C `rnd(100)` @
  `spelleffects_check(spell.c:1372)`; JS `rn2(12)` — `Z` was unbound
  (`Unknown command`) so cast never ran.
- **Cause/evidence:** session casts healing on self (`Z`→`a`→`.`); needs
  CAST menu `getspell`, energy/hunger/`percent_success` check, `mksobj`
  pseudo, spell `getdir` (`.` = self success), `zapyourself`→`healup(d(6,4))`.
- **C locus:** `spell.c` `docast`/`getspell`/`dospellmenu`/`spelleffects_check`/
  `spelleffects`; `zap.c` `zapyourself`; `potion.c` `healup`; `eat.c`
  `morehungry`; `cmd.c` `getdir` self key.
- **Change:** wired `Z`→`docast`; CAST `dospellmenu`; check + healing
  self-zap path; `morehungry`; local `use_skill` advance; healup in zap.
- **Verification:** seed0501 prefix **2205→2217** (`dog_move`); Scr
  **6→10**/28; green+strict PASS; cohort 1500/1800/0060/0106 PASS; full
  **11/44** Scr **1180** RNG **107116**/792838.
- **Named omission:** other `spelleffects` otyps; directional `weffects`;
  traditional getspell yn; CQ_REPEAT; spell_backfire; amulet drain;
  check_capacity; `zapyourself` beyond healing; VIEW swap/sort.
- **Next:** seed0501 `dog_move` @ 2217 / seed0105 Scr / `lspo_map` /
  `next_ident`.


## D-0136 — study_book known-refresh (false dog_move peel)

- **Status:** fixed
- **Observed:** seed0501 @ **2217**: C `rn2(1)` @ `dog_move`; JS `rn2(5)`.
  Screens showed JS hero/pet drifted NW after keys `rgy` while C stayed put.
- **Cause/evidence:** JS `doread` stubbed SPBOOK with "not implemented" and
  returned; C called `study_book` → `You know "healing" quite well already.`
  + `more()` (eats `y#turn\rn`) + `Refresh your memory anyway? [yn] (n)`.
  Leaked `y` became a diagonal move → `udist`/`appr` diverged before search.
  Rejected: dog_move `chcnt`/`mtrack`/`appr` as the 2217 cause.
- **C locus:** `spell.c` `study_book`; `read.c` `doread` SPBOOK branch
  (literate bump before study).
- **Change:** `js/spell.js` `study_book` (blank + known-refresh yn + delay/
  too_hard gate + begin-memorize); `js/read.js` wires SPBOOK → study_book
  with C literate order.
- **Verification:** seed0501 RNG **2238**/2238 Scr **27→28**/28 (with
  D-0137); green+strict PASS; cohort + seed0501 PASS; full **12/44**
  Scr **1198** RNG **107134**/792838.
- **Named omission:** occupation/`learn`; novel/tribute; dull sleep;
  `cursed_book`/`confused_book` bodies.
- **Next:** seed0105 Scr / `lspo_map` / `next_ident`.

## D-0137 — ^X attributes female role/rank titles

- **Status:** fixed
- **Observed:** seed0501 Scr @22 (^X): C `Priestess` / JS `Priest`.
- **Cause/evidence:** `doattributes` always used `urole.name.m` /
  `rank.m`. C `insight.c` uses `name.f` / `rank_of(..., innategend)` when
  female.
- **C locus:** `insight.c` title + `background_enlightenment` role_titl.
- **Change:** `js/invent.js` `doattributes` selects `.f` when
  `flags.female` and female name/rank present.
- **Verification:** with D-0136, seed0501 **PASS**; green+cohort held.
- **Next:** seed0105 Scr / `lspo_map` / `next_ident`.

## D-0138 — roles `name.f` null + welcome gender gate

- **Status:** fixed
- **Observed:** seed0105 Scr @1 welcome: C `neutral human Valkyrie` /
  JS `neutral female human Valkyrie`. Tourist green held only by the
  old same-string proxy accidentally matching C's gender adj.
- **Cause/evidence:** C `role.c` sets `name.f = 0` except Caveman/
  Priestess. C `welcome()` adds gender only when `!urole.name.f` **and**
  `(allow & ROLE_GENDMASK) == (ROLE_MALE|ROLE_FEMALE)`. Valkyrie is
  female-only → no adj. JS stored `f: 'Valkyrie'` and treated
  `f===m` as "add gender".
- **C locus:** `role.c` roles[] `name.f`; `allmain.c` `welcome`.
- **Change:** `js/roles.js` `name.f = null` where C has 0; `welcome`
  uses C null + allow-mask gate; copy `allow` onto `game.urole`;
  `doattributes` omits gender on `!!name.f` (not string inequality).
- **Verification:** green+strict PASS; cohort PASS; seed0501 PASS;
  seed0105 welcome text matches (still Scr **0**/30 on other peel);
  full **12/44** Scr **1198** RNG **107134**.
- **Next:** seed0105 bright-blue ASCII `` ` `` map cell / `lspo_map` /
  `next_ident`.

## D-0139 — newsym S_engroom / S_engrcorr engraving glyphs

- **Status:** fixed
- **Observed:** seed0105 Scr **0**/30 with full RNG; systematic miss was
  bright-blue ASCII `` ` `` at map (26,17) among DEC room floors.
- **Cause/evidence:** Vault niche `ad aerarium` engraving exists at
  (26,17) (`erevealed` never set). C `defsym` `S_engroom` is `` ` `` +
  `CLR_BRIGHT_BLUE` (DECgraphics does not remap). C `newsym` sets
  `erevealed` when `cansee`, then `_map_location` → `map_engraving`.
  JS deferred engravings and painted ROOM floor.
- **Rejected:** ROCK_CLASS/boulder/gem object — no floor object there;
  boulder is gray; gem class symbol is `*`.
- **C locus:** `display.c` `newsym`/`map_engraving`/`_map_location`;
  `engrave.h` `engraving_to_defsym`/`spot_shows_engravings`;
  `defsym.h` `S_engroom`/`S_engrcorr`.
- **Change:** `js/display.js` — `erevealed` on cansee; engraving branch
  in `newsym`/`map_location_memory` (ROOM `` ` `` / CORR `#`, bright blue).
- **Verification:** seed0105 Scr **0→22**/30 (RNG still full); remaining
  8 are `#chat` wall pline / apply·eat prompts; green+strict PASS;
  cohort PASS; full **12/44** Scr **1198→1231** RNG **107134**.
- **Next:** seed0105 `#chat` `"It's like talking to a wall."` / eat·apply
  getobj, or `lspo_map` / `next_ident`.

## D-0140 — dochat wall / SDOOR / statue talk

- **Status:** fixed
- **Observed:** seed0105 Scr @10 blank vs C `"It's like talking to a
  wall."` after `#chat` + direction into wall.
- **Cause/evidence:** JS `dochat` returned `ECMD_OK` silently when
  `!mtmp`; C ports statue then `!Deaf && (IS_WALL||SDOOR)` pline
  (Blind `lastseentyp` gate; Hallu `rn2(10)` walltalk).
- **C locus:** `sounds.c` `dochat`.
- **Change:** `js/sounds.js` — statue notice; wall/SDOOR envelope with
  Blind/`lastseentyp` + non-hallu pline + hallu walltalk.
- **Verification:** seed0105 Scr **22→23**/30 (wall matched); green
  held; next peel was empty apply getobj.
- **Named omission:** shop `price_quote`; usteed; is_silent/Strangled/
  uswallow/Underwater; Hallu statue `rndmonnam`; other MS_*.
- **Next:** apply empty getobj (D-0141).

## D-0141 — getobj apply empty SUGGEST early return

- **Status:** fixed
- **Observed:** seed0105 after wall: C `"You don't have anything to use
  or apply."` vs JS `"What do you want to use or apply? [*]"`.
- **Cause/evidence:** C `getobj` when `suggested==0 && !forceprompt &&
  !allownone` early-returns; JS prompted `[*]` with empty TOOL_CLASS
  lets (no lamp this seed) and ate following `e` as invent letter.
- **C locus:** `invent.c` `getobj`; `apply.c` `apply_ok`/`doapply`.
- **Change:** `js/apply.js` — empty `apply_lets` → pline + null (no
  prompt).
- **Verification:** seed0105 apply screen matched; eat prompt then
  desynced on missing-letter (D-0142).
- **Named omission:** full `apply_ok` DOWNPLAY (coins/unknown potions)
  that would set `forceprompt` and allow `[*]`.
- **Next:** eat getobj missing-letter loop (D-0142).

## D-0142 — getobj eat missing-letter continue + --More--

- **Status:** fixed
- **Observed:** seed0105 after apply: C `"You don't have that
  object.--More--"` (getobj loop) vs JS single-shot return then key leak
  (`Unknown command 'd'`).
- **Cause/evidence:** C `getobj` `continue`s after missing letter;
  `You()` sets NEED_MORE; next `yn_function` calls `more()`. JS
  returned null on first bad letter.
- **C locus:** `invent.c` `getobj`; `topl.c` `tty_yn_function`/`more`.
- **Change:** `js/eat.js` — `yn_function` free-letter loop; missing
  letter pline + continue; empty edibles early-return.
- **Verification:** seed0105 **PASS** (RNG 2499/2499 Scr 30/30);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077/
  0106/0501/0105 PASS; full **13/44** Scr **1231→1239** RNG
  **107134→106907**.
- **Named omission:** ordinary food nutrition/occupation; eat `?`/`*`
  menu; full `is_edible`.
- **Next:** `lspo_map` / `next_ident` / `maybe_smudge_engr`.

## D-0143 — lspo_map themerms map rooms + filler_region

- **Status:** fixed
- **Observed:** seed0015 first mismatch @337 `rn2(71) @ lspo_map`;
  seed0200 @377 same. JS burned `rn2(100)` then `create_room`.
- **Cause/evidence:** Reservoir can pick L/S/T/Z/Cross/… shapes whose
  Lua `contents` call `des.map` → C `lspo_map` (`1+rn2(COLNO-1-wid)`,
  `rn2(ROWNO-hei)`, overwrite redo). JS treated every non-`ordinary`
  pick as `build_room` chance + rectangular `create_room`.
- **C locus:** `sp_lev.c` `lspo_map` / `mapfrag_*` / `lspo_region`;
  `mkmap.c` `flood_fill_rm`; `themerms.lua` map rooms + `filler_region`
  + `themeroom_fill` reservoir.
- **Change:** `js/mklev.js` — `splev_chr2typ`/`mapfrag`/`lspo_map_themeroom`
  placement+load; `filler_region` percent + irregular flood/add_room;
  `themeroom_fill` reservoir (lit/mindiff gates); wire 17 simple
  filler-map rooms; `makerooms` honors `themeroom_failed`.
- **Verification:** seed0015 prefix **337→357** (`selection_rndcoord` /
  Ghost fill); seed0200 **377→1447** (`dig_corridor`); green+strict
  PASS; PASS cohort held; full **13/44** Scr **1239→1240** RNG
  **106907→111362**.
- **Named omission:** fill *bodies* (Ghost `selection.room`/monster,
  Temple altars, …); Blocked center/Pillars/Water vault/complex maps;
  nested `des.room` themerms still `create_room`; irregular
  `dig_corridor` join.
- **Next:** Ghost `themeroom_fill` / `selection_rndcoord`, or
  `dig_corridor` after L-room, or `next_ident` / `maybe_smudge_engr`.

## D-0144 — Ghost of an Adventurer themeroom_fill

- **Status:** fixed
- **Observed:** seed0015 first mismatch @357 `rn2(36) @
  selection_rndcoord`; JS emitted `rn2(1)` (fill name only, no body).
- **Cause/evidence:** Reservoir picked Ghost; C runs
  `selection.room():rndcoord(0)` then `des.monster` ghost
  (asleep/waiting) + percent loot. JS stored `_themeroom_fill` and
  returned without contents.
- **C locus:** `themerms.lua` Ghost contents; `selvar.c`
  `selection_from_mkroom`/`selection_rndcoord`; `sp_lev.c`
  `create_monster`/`create_object`/`find_montype`/`induced_align`;
  `makemon.c` `rndghostname` for `PM_GHOST`.
- **Change:** `js/mklev.js` — selection helpers + Ghost fill body
  (monster + not-blessed id/class objects); `js/makemon.js` —
  `rndghostname`/`christen_monst` for ghosts + `mstrategy`/`MM_ASLEEP`.
- **Verification:** seed0015 prefix **357→1284** (`dig_corridor`);
  positional **392→1472**/8563; seed0200 still **1447** (`dig_corridor`);
  green+strict PASS; PASS cohort held; full **13/44** Scr **1239**
  RNG **112442**/792838.
- **Named omission:** other themerms fill bodies; full
  `create_monster` humidity/appear/inventory; `m_initinv` body.
- **Next:** `dig_corridor` (seed0015/0200), or `next_ident` /
  `maybe_smudge_engr`.

## D-0145 — finddpos_shift irregular inward walk

- **Status:** fixed
- **Observed:** seed0015 @1284 C `rn2(2) @ dig_corridor` vs JS
  `rn2(9)` (extra `finddpos` retry); seed0200 @1447 C `rn2(35) @
  dig_corridor` (nxcor) vs JS `rn2(6)` (skipped dig → next finddpos).
- **Cause/evidence:** After `filler_region` sets `irregular=true`,
  walls sit inside the bounding box. C `finddpos_shift` walks inward
  through STONE/CORR until `good_rm_wall_doorpos`; JS only tested the
  rect-edge cell and failed, so `join` never reached matching dig.
  `dig_corridor` body itself already matched C.
- **C locus:** `mklev.c` `finddpos_shift` / `finddpos` / `join`;
  caller `makecorridors`; dig in `sp_lev.c` `dig_corridor`.
- **Change:** `js/mklev.js` `finddpos_shift` — port irregular walk
  (DIR_180 + step via `xdir`/`ydir` + bounds fail).
- **Verification:** seed0015 prefix **1284→2513** (`mksobj_init`);
  positional **1472→2597**/8563; seed0200 **1447→1672**
  (`fill_ordinary_room`/`somex`); green+strict PASS; PASS cohort
  11/11; full **13/44** Scr **1239** RNG **115097**/792838.
- **Named omission:** `join` still always `CORR` (C arboreal→ROOM);
  other themerms fill bodies; `fill_ordinary_room` somexy envelope.
- **Next:** seed0015 `mksobj_init` @2513 / seed0200
  `fill_ordinary_room` @1672 / seed0101 `next_ident` /
  `maybe_smudge_engr` / `getbones`.

## D-0146 — mksobj_init OIL_LAMP / TOOL lamp charges

- **Status:** fixed
- **Observed:** seed0015 @2513 C `rn2(500) @ mksobj_init` (OIL_LAMP
  age via `rn1(500,1000)`) vs JS `rn2(1)` (skipped lamp body after
  Valkyrie `!rn2(6)` Lamp `ini_inv`).
- **Cause/evidence:** JS `mksobj_init` TOOL_CLASS handled chests/
  candles/markers but omitted BRASS_LANTERN/OIL_LAMP/MAGIC_LAMP and
  other charged tools. C sets `spe=1`, `age=rn1(500,1000)`,
  `lamplit=0`, `blessorcurse(5)`.
- **C locus:** `mkobj.c` `mksobj_init` TOOL_CLASS; caller
  `u_init.c` `ini_inv(Lamp)` from Valkyrie/Healer/Barbarian/…
- **Change:** `js/mkobj.js` — port lamp + grease/crystal/horn/bag/
  bell/magic-instrument TOOL cases; candle spe/lamplit (age deferred).
- **Verification:** seed0015 prefix **2513→2918** (`getbones`);
  positional **2597→2925**/8563 Scr **1→20**/44; green+strict PASS;
  PASS cohort 11/11; full **13/44** Scr **1259** RNG **115572**/792838.
- **Named omission:** FIGURINE (`rndmonnum_adj`+`is_human`); candle
  `age=20*oc_cost` (`oc_cost` not in objects extract); full
  `getbones` load path.
- **Next:** seed0200 irregular `somexy` @1672 / seed0015 `getbones`
  @2918 / `next_ident` / `maybe_smudge_engr`.

## D-0147 — occupied t_at + irregular somexy

- **Status:** fixed
- **Observed:** seed0200 @1672 C second `somex`/`somey` vs JS
  `mkgold` `rnd(2)` after gold `!rn2(3)` + first `somexyspace`.
- **Rejected hypothesis:** “JS ignores irregular and accepts first
  bbox cell.” DIAG on the gold room showed `irreg=false`/`nsub=0`;
  C’s extra `somex` was `somexyspace` retry after `occupied`.
- **Cause/evidence:** C `occupied` includes `t_at(x,y)` (and
  furniture/lava/pool/`invocation_pos`). JS only checked furniture/
  lava/pool, so gold landed on a trap cell that C rejected. Also
  ported missing irregular `somexy`/`inside_room` (still required for
  flood-fill themerms; not the peel writer here).
- **C locus:** `mklev.c` `occupied`; `mkroom.c` `somexy`/`inside_room`;
  caller `mklev.c` `fill_ordinary_room` → `somexyspace` → `mkgold`.
- **Change:** `js/mklev.js` — `occupied` calls `t_at`; irregular
  `somexy` `!edge`/`roomno` + exhaustive fallback; `inside_room` for
  subroom rejection. `invocation_pos` still always-false (named).
- **Verification:** seed0200 prefix **1672→1768**
  (`random_engraving`); positional **1687→3231**/3822 Scr **0→9**/40;
  green+strict PASS; PASS cohort 11/11; full **13/44** Scr **1268**
  RNG **118314**/792838.
- **Named omission:** `invocation_pos`/`inv_pos`; drawbridge lava in
  `is_lava`; `get_rnd_text(ENGRAVEFILE)` in `random_engraving`.
- **Next:** seed0200 `random_engraving`/`get_rnd_text` @1768 /
  seed0015 `getbones` @2918 / `next_ident` / `maybe_smudge_engr`.

## D-0148 — random_engraving get_rnd_text(ENGRAVEFILE)

- **Status:** fixed
- **Observed:** seed0200 @1768 C `rn2(2894)` @ `random_engraving`
  vs JS `rn2(2)` (stub re-called `getrumor` after `!rn2(4)`).
- **Cause/evidence:** C `engrave.c` `random_engraving`: when
  `!rn2(4)` short-circuits past `getrumor`, falls through to
  `get_rnd_text(ENGRAVEFILE,…,rn2,MD_PAD_RUMORS)` → `get_rnd_line`
  seeks in the pad+xcrypt engrave chunk (2894 bytes after don't-edit
  header). JS stub burned another rumor draw instead.
- **C locus:** `engrave.c` `random_engraving`; `rumors.c`
  `get_rnd_text`/`get_rnd_line`; `makedefs.c` `do_rnd_access_file`.
- **Change:** `scripts/extract-engrave.py` →
  `js/generated/engrave_data.js` (`ENGRAVE_BUF`, MAIL=1 grep);
  `js/rumors.js` export `get_rnd_text`; `js/engrave.js`
  `random_engraving`; remove mklev stub.
- **Verification:** seed0200 prefix **1768→3382** (`hitum`/
  `exercise`); positional **3231→3385**/3822 Scr **9→14**/40;
  green+strict PASS; PASS cohort 11/11; full **13/44** Scr **1275**
  RNG **121154**/792838.
- **Named omission:** epitaph `get_rnd_text(EPITAPHFILE)`;
  `maybe_smudge_engr`; bogusmon file.
- **Next:** seed0015 `getbones` @2918 / seed0101 `next_ident` @2293 /
  seed0030 `maybe_smudge_engr` @6732 / seed0200 combat @3382.

## D-0149 — ordinary `>` dodown / goto_level / getbones

- **Status:** fixed
- **Observed:** seed0015 @2918 C `rn2(3)` @ `getbones` vs JS `rn2(5)`
  (dog_move / unbound `>`). NOTES hypothesized getbones arity; false.
- **Rejected:** getbones early-return / wrong `flags.bones` — stub
  already emits `rn2(3)` when reached (same as D-0068 lesson for `^V`).
- **C locus:** `do.c` `dodown`/`goto_level`/`u_collide_m`;
  `dungeon.c` `next_level`; `bones.c` `getbones`; `dog.c`
  `keepdogs`/`losedogs`/`mon_arrive`; `mklev.c` special-room
  `rn2(u_depth)` → `do_mkroom(SHOPBASE)`; `mkroom.c` `mkshop`.
- **Cause:** `>` unbound in `rhack`; descent never called `mklev`.
  After wiring stairs, dlvl2 also needed the post-niche special-room
  chance roll (Dlvl1 short-circuits `u_depth > 1`).
- **Change:** `js/do.js` `dodown`/`next_level`/`goto_level`;
  `js/cmd.js` `'>'`; `js/dog.js` `keepdogs`/`losedogs`/`levl_follower`;
  `js/teleport.js` `rloc_to`; `js/mon.js` `mnexto`; `js/mklev.js`
  special-room chain + `mkshop` eligibility stub + `clear_level_structures`
  clears `fobj`/`ftrap`.
- **Verification:** seed0015 prefix **2918→8499** (`trapeffect_pit`);
  positional **8500**/8563 Scr **20**/44; green+strict PASS; cohort
  1500/1800/0060 PASS; full **13/44** Scr **1275** RNG
  **126755**/792838.
- **Named omission:** `savelev`/`getlev` restore; mysterious force;
  quest gate; portals/fall damage; Lua `NHCB_LVL_LEAVE`;
  `mkshop` `invalid_shop_shape`/shtypes/`rnd(100)` when eligible;
  COURT/ZOO/… `do_mkroom` bodies; `dotrap`/`trapeffect_pit`.
- **Lesson:** when Notes say getbones but JS never reaches `mklev`,
  check command bindings (`>` / `^V`) before patching the stub.
- **Next:** seed0015 `trapeffect_pit` @8499 / `next_ident` /
  `maybe_smudge_engr`.

## D-0150 — monster trapeffect_pit / make_corpse

- **Status:** fixed
- **Observed:** seed0015 @8499 C `rnd(6)` @ `trapeffect_pit(trap.c:2003)`
  vs JS `rn2(5)` (dog_move). NOTES said hero pit; provenance is
  **monster** branch `thitm(..., rnd(6))`.
- **Rejected:** hero `dotrap`/`set_utrap` first — C line 2003 is the
  pet fall-damage path after `mintrap`.
- **C locus:** `trap.c` `trapeffect_pit` (monster) / `thitm` /
  `trapeffect_selector`; `mon.c` `monkilled`/`mondied`/`make_corpse`
  default_1; `mkobj.c` `mkcorpstat`.
- **Cause:** `trapeffect_selector` only handled DART; PIT no-op so pet
  kept walking. Death also needed real `monkilled`→`make_corpse`
  (next_ident + rndmonst_adj + start_corpse_timeout), not mark-dead.
- **Change:** `js/trap.js` monster `trapeffect_pit` + `thitm` death →
  `monkilled`/`mondied`/`make_corpse`; `js/monsters.js`
  `grounded`/`is_flyer`/`is_floater`/`is_clinger`.
- **Verification:** seed0015 prefix **8499→8518**; positional
  **8524**/8563 Scr **21**/44; green+strict PASS; cohort 11 PASS;
  full **13/44** Scr **1276** RNG **126779**/792838.
- **Named omission:** hero `dotrap`/`trapeffect_pit`; SPIKED poison;
  `mselftouch` petrify; `wearing_iron_shoes`; `save_mtraits`;
  golem/dragon/… `make_corpse` specials; `xkilled`/`mhitm` still burn
  `corpse_chance` without `make_corpse`.
- **Lesson:** rng-diff provenance line numbers beat session-name
  guesses (“hero pit”); monster pit death pulls `make_corpse` RNG.
- **Next:** seed0015 @8518 newt `m_move` track vs second `distfleeck` /
  `next_ident` / `maybe_smudge_engr`.

## D-0151 — hostile postmov / mon_learns_traps / mfndpos known-trap skip

- **Status:** fixed
- **Observed:** seed0015 @8518 C `rn2(5)` second `distfleeck` vs JS
  `rn2(12)` newt `m_move` track. Pet already dead; only newt acts.
- **Rejected:** inventing `appr`/mtrack arity hacks; “second fleeck =
  two monsters”; mtrapped early-return (newt `mtrapped=0`, no
  `rn2(40)`).
- **C locus:** `monmove.c` `m_move`/`postmov`; `trap.c` `mintrap`
  `mon_learns_traps`; `mon.c` `mfndpos` known-trap `continue`;
  `mondata.c` `mon_knows_traps`/`mon_learns_traps`.
- **Cause:** JS hostile `m_move` stepped without `postmov`→`mintrap`,
  so never set `mtrapseen` for SQKY_BOARD under the newt. C learned the
  board then `mfndpos` skipped that cell — no track match, 0-RNG move,
  post `distfleeck`. JS kept `(5,9)` in candidates matching
  `mtrack[0]` → `rn2(12)`.
- **Change:** hostile `m_move`→`postmov`; `mon_knows_traps`/
  `mon_learns_traps` + `mtrapseen` init; `mintrap` learns before
  effect; `mfndpos` skips known harmful traps when `!(ALLOW_TRAPS)`;
  SQKY_BOARD effect stub (wake deferred).
- **Verification:** seed0015 RNG **8563**/8563 Scr **21**/44;
  green+strict PASS; cohort 11 PASS; full **13/44** Scr **1276** RNG
  **126818**/792838.
- **Named omission:** `wake_nearto`/`You_hear` for SQKY; `mons_see_trap`;
  HOLE `!mindless` already_seen; full `m_harmless_trap` immunities;
  `gettrack`/shortsighted/`m_search_items` in hostile `m_move`;
  mtrapped escape `rn2(40)`; hero `dotrap`.
- **Lesson:** when C has 0-RNG `m_move` between fleecks, check
  `mfndpos` candidate set (known traps) before rewriting track math.

## D-0152 — Q / doquiver_core ready uswapwep (seed0101 next_ident)

- **Status:** fixed
- **Observed:** seed0101 @2293 C `rnd(2)` @ `next_ident` then
  `obj_resists`/`mcalcmove`; JS `rn2(12)` (skipped throw).
- **Rejected:** missing `splitobj`/`next_ident` in throw alone — throw
  never ran; keys `Qbytdl` desynced while `Q` was unbound.
- **C locus:** `wield.c` `dowieldquiver`/`doquiver_core`;
  `dothrow.c` `throw_ok`/`throwit` hand-throw pline;
  session keys `Q`→ready bow from uswapwep→`t` throw arrows by hand.
- **Cause:** JS lacked `Q`/`doquiver_core`. C readies bow from alternate
  weapon (`ynq`), then throw splits arrows (`next_ident`) + `breaktest`
  (`obj_resists`). Unbound `Q` ate following letters as other commands.
- **Change:** `setuqwep` + `doquiver_core("ready")` (uswapwep/uwep ynq,
  `-` clear, worn reject); bind `Q`; `throw_ok` DOWNPLAY lone uwep;
  hand-throw pline + half range; `dofire` empty → `doquiver_core("fire")`.
- **Verification:** seed0101 prefix **2293→2302** (`_` travel); Scr
  **4→10**/27; green+strict PASS; cohort PASS; full **13/44** Scr
  **1282** RNG **126936**/792838.
- **Named omission:** count-split `finish_splitting`/`unsplitobj`;
  `Shk_Your` decline plines; AutoReturn/`find_launcher`/polearm.
- **Lesson:** seed0101 “next_ident” was command desync from missing
  `Q`, not a mkobj bug — read session keys/screens before inventing
  object-creation stubs.
- **Next:** seed0101 `_` travel @2302 / seed0015 Scr @21 /
  seed0016 eat `next_ident` @2493.

## D-0153 — `_` / dotravel cancel + getpos tip PICK_NONE (seed0101)

- **Status:** fixed
- **Observed:** seed0101 @2302 C `distfleeck` vs JS missing after throw;
  Scr 10/27 (Unknown command `_`).
- **Rejected:** search/`set_apparxy` as the first peel — keys `_` ESC
  `E` `-` ESC were travel getpos tip, not engrave; unbound `_` desynced
  the rest so searches never matched C RNG.
- **C locus:** `cmd.c` `dotravel`/`dotravel_target`; `getpos.c` `getpos`
  force unknown-direction; `hack.c` `handle_tip(TIP_GETPOS)` →
  nhcore `show_getpos_tip` PICK_NONE; `hack.c` `findtravelpath` adjacent
  + travel continue.
- **Cause:** JS lacked `_`/`dotravel`. Tip menu consumed one key then
  closed (C stays open for non-dismiss keys). Session cancels travel
  after tip; later `s`/`s`/`:` need keys in sync.
- **Change:** `dotravel`/`dotravel_target` + greedy/adjacent
  `findtravelpath_travel`; bind `_` + `#travel`; tip PICK_NONE loop;
  getpos force unknown-direction pline; `end_running` clears travel;
  `continue_run` recomputes travel steps.
- **Verification:** seed0101 prefix **2302→2309** (`set_apparxy`);
  Scr **10→21**/27; green+strict PASS; cohort PASS; full **13/44**
  Scr **1293** RNG **126947**/792838.
- **Named omission:** full `TEST_TRAV`/`TRAVP_GUESS`/`travelmap`/
  boulder-door delay; `getpos_menu`; `#retravel`; crawl_destination /
  NODIAG travel gates.
- **Lesson:** after a timed command, read the next keys/screens before
  peeling monster RNG — unbound `_` looked like a missing `distfleeck`.
- **Next:** seed0101 `set_apparxy` @2309 / seed0015 Scr @21 /
  seed0016 eat `next_ident` @2493.

## D-0154 — set_apparxy Displacement rn2(4) (seed0101)

- **Status:** fixed
- **Observed:** seed0101 @2309 C `rn2(4)` @ `set_apparxy` vs JS `rn2(5)`
  (`distfleeck`).
- **Rejected:** NODIAG / 4-dir vs 8-dir `xdir` as the arity cause —
  provenance is Displacement cloak, not movement dirs.
- **C locus:** `monmove.c` `set_apparxy`; `youprop.h` `Displaced`;
  Ranger kit `CLOAK_OF_DISPLACEMENT`.
- **Cause:** JS stub always set `mux/muy = hero` with no RNG. Hostile
  monsters facing a Displaced hero burn `!rn2(4)` (gotu) then optional
  displace-loop `rn2(2*displ+1)`. Skipping that made the next call a
  `distfleeck` `rn2(5)`.
- **Change:** Ported `set_apparxy` early-exits, Invis/Displaced/Underwater
  `displ`, gotu RNG, and displace position loop (`accessible`/
  `closed_door`/`couldsee`/`passes_walls`). EDisplaced via worn cloak
  otyp until `oc_oprop`/`setworn` props exist; `can_fog` stubbed false;
  DRAWBRIDGE_UP `SURFACE_AT` deferred.
- **Verification:** seed0101 RNG **2371**/2371 Scr **21**/27;
  green+strict PASS; cohort 11 PASS; full **13/44** Scr **1293** RNG
  **127004**/792838.
- **Named omission:** `oc_oprop` Extrinsic props; timed `HDisplaced`;
  `can_fog` vampshifter; `stuff_prevents_passage`; DRAWBRIDGE under-typ.
- **Lesson:** arity `rn2(4)` next to `distfleeck` `rn2(5)` is often
  Displacement/Invis `set_apparxy`, not a 4-dir mfndpos bug.
- **Next:** seed0016 eat `next_ident` @2493 / seed0015 Scr @21 /
  seed0030 `maybe_smudge_engr` / seed0101 Scr residual.

## D-0155 — STETHOSCOPE self + eat touchfood split (seed0016)

- **Status:** fixed
- **Observed:** seed0016 @2493 C `rnd(2)` @ `next_ident` (eat split) vs
  JS `rn2(12)` (`mcalcmove`).
- **Rejected:** missing eat/`splitobj` alone as the first peel — DIAG
  showed JS did eventually split the apple, but only *after* a premature
  monster turn. Keys `a`/`c`/`.` were stethoscope; JS rejected the tool so
  `.` became `donull` and burned `mcalcmove` before `e`/`j`.
- **C locus:** `apply.c` `use_stethoscope` / `doapply`; `insight.c`
  `ustatusline`/`piousness`; `cmd.c` getdir `.`=self; `eat.c`
  `touchfood`/`doeat`/`fprefx`/`start_eating`/`lesshungry`;
  `mkobj.c` `splitobj`/`next_ident`.
- **Cause:** (1) Unbound STETHOSCOPE → key desync before eat.
  First stethoscope use is free when `hero_seq != stethoscope_seq`.
  (2) After timing matched, invent apple stack still needed
  `touchfood`→`splitobj(1)`→`next_ident` and reqtime-1 finish
  (Macintosh APPLE joke on contest MACOS build).
- **Change:** `use_stethoscope` + getdir self-ok + `ustatusline`/
  `piousness`; `doeat` food-class reqtime-1 path with `touchfood`/
  `fprefx`/`lesshungry`/`useup`. Multi-turn occupation / adjacent
  stethoscope / oc_nutrition extractor deferred.
- **Verification:** seed0016 prefix **2493→2551** (`zapyourself`);
  Scr **6→15**/36; green+strict PASS; cohort 1500/1800/0060/0105 PASS;
  full **13/44** Scr **1302** RNG **127080**/792838.
- **Named omission:** adjacent/`dz`/cursed stethoscope arms; multi-turn
  eat occupation; rotten `rn2(7)`; floorfood floor; `freeinv`+
  `addinv_nomerge`; `oc_nutrition` in objects extract; UNIX Core dumped.
- **Lesson:** when rng-diff shows eat `next_ident` vs `mcalcmove`, check
  whether an earlier apply/getdir ate the self-key as `donull` first.
- **Next:** seed0016 `zapyourself` @2551 / seed0015 Scr @21 /
  seed0030 `maybe_smudge_engr` / seed0101 Scr residual.

## D-0156 — WAN_SLEEP zapyourself + Unaware gethungry (seed0016)

- **Status:** fixed
- **Observed:** seed0016 @2551 C `rnd(50)` @ `zapyourself` vs JS
  `rn2(5)` (`distfleeck`) — directional zap stubbed as nothing_happens.
- **Rejected:** missing RAY `weffects`/`buzz` first — C path is getdir
  `.` → self → `zapyourself` sleep, not a directed ray.
- **C locus:** `zap.c` `dozap`/`zapyourself` WAN_SLEEP; `timeout.c`
  `fall_asleep`; `eat.c` `gethungry` Unaware `rn2(10)`; `trap.c`
  `unconscious`; `youprop.h` Unaware.
- **Cause:** (1) `dozap` never called getdir/zapyourself for RAY wands.
  (2) After sleep matched, asleep turns need Unaware metabolic
  `rn2(10)` before accessorytime `rn2(20)`.
- **Change:** getdir `.`=self; `zapyourself` WAN_SLEEP/SPE_SLEEP +
  Sleep_resistance branch; `fall_asleep`/`usleep`/`nomovemsg`;
  `gethungry` Unaware gate. IMMEDIATE/RAY `weffects`, other
  zapyourself otyps, shieldeff/monstunseesu deferred.
- **Verification:** seed0016 RNG **3656**/3656 Scr **15→31**/36;
  green+strict PASS; cohort 1500/1800/0060/0105/0501 PASS; full
  **13/44** Scr **1318** RNG **128139**/792838.
- **Named omission:** RAY/`bhit`/`ubuzz`; other zapyourself cases;
  backfire; uhunger-- body; fainted Unaware arm; The(xname) article
  edge cases.
- **Lesson:** sleep/multi turns change gethungry RNG arity via Unaware
  before any hunger side-effect ports.
- **Next:** seed0016 Scr residual @31 / seed0015 Scr @21 /
  seed0030 `maybe_smudge_engr` / seed0101 Scr residual.

## D-0157 — apply_ok SUGGEST wand/spbook (seed0016 Scr @3)

- **Status:** fixed
- **Observed:** seed0016 Scr @3 JS
  `What do you want to use or apply? [c or ?*]` vs C `[cfghi or ?*]`
  (cursor col 44 vs 48).
- **Rejected:** empty-SUGGEST / stethoscope-only getobj — invent has
  wand+three spellbooks; C suggests them for apply (break/flip).
- **C locus:** `apply.c` `apply_ok` / `doapply` getobj.
- **Cause:** JS `apply_ok` returned true only for `TOOL_CLASS`, so Healer
  prompt omitted `f` WAN_SLEEP and `ghi` SPE_*.
- **Change:** port `apply_ok` ranks (SUGGEST tools/wands/spbooks +
  pick/axe/pole/whip/oil/food/graystone; DOWNPLAY coins/unknown potions;
  EXCLUDE_SELECTABLE default). getobj letters = SUGGEST only; EXCLUDE →
  silly_thing. `do_break_wand` / `flip_through_book` / other otyps still
  deferred (default "Sorry…").
- **Verification:** seed0016 Scr **31→32**/36 (RNG full); green+strict
  PASS; cohort 11 PASS; full **13/44** Scr **1318** RNG **128139**.
- **Named omission:** break wand / flip book / flip coin / sack /
  cream pie / whip / use_stone / use_pole / Snickersnee.
- **Lesson:** apply prompt letters follow `apply_ok` SUGGEST classes,
  not the subset of otyps with ported `doapply` bodies.
- **Next:** seed0016 invent @24 (H2344 offx + `pair of` gloves) /
  seed0015 Scr / `maybe_smudge_engr`.

## D-0158 — armor pair of / set of + ^X new moon (seed0016 PASS)

- **Status:** fixed
- **Observed:** seed0016 invent @24 Coins at col ~32 vs C col 24;
  gloves line missing `pair of`; disco `leather gloves` vs
  `pair of leather gloves`; ^X missing `There is a new moon in effect.`
  so INT stayed on page 1.
- **Rejected:** bare H2344 invent offx pad; hardcoded INT→page2 without
  moon line (would break non-moon ^X).
- **C locus:** `objnam.c` `obj_typename`/`xname` ARMOR/LENSES;
  `insight.c` background_enlightenment moon/friday13 + tty 23-row page.
- **Cause:** JS omitted `pair of `/`set of ` prefixes (`oc_armcat`
  gloves/boots; dragon scales window; LENSES). Shorter invent maxcol
  shifted H2344 offx. ^X skipped `flags.moonphase` NEW/FULL line and
  used a fixed page split with INT always on page 1.
- **Change:** `pretty_base`/`obj_typename` pair-of/set-of; makeplural
  keeps singular `pair of`; `doattributes` continuous stream with
  moon/friday13 before experience and 23-content-row paging.
- **Verification:** seed0016 **PASS** (RNG 3656/3656 Scr 36/36);
  green+strict PASS; cohort 12 PASS; full **14/44** Scr **1323**
  RNG **128139**.
- **Named omission:** night()/midnight enlightenment lines; full
  `enlght_*` disclosure final tense; other armor naming edges.
- **Lesson:** invent offx follows maxcol from real doname strings;
  ^X page breaks follow content length, not hardcoded attribute index.
- **Next:** seed0015 Scr @21 / seed0030 `maybe_smudge_engr` /
  seed0101 Scr residual.

## D-0159 — postmov monster door open/unlock/smash (seed0015 Scr)

- **Status:** fixed
- **Observed:** seed0015 Scr @13 blank topline vs C
  `You hear a door open.`; RNG already full.
- **Rejected:** dosounds feature hear; missing `>` stairs alone (later
  screen 19).
- **C locus:** `monmove.c` `postmov` door block after `mintrap`;
  `m_move` `can_open`/`can_unlock`/`can_tunnel`; `monhaskey`;
  `mb_trapped`.
- **Cause:** JS `postmov` deferred door handling after stepping onto
  CLOSED/LOCKED; mfndpos already allowed OPENDOOR so monsters reached
  the cell without opening it or printing hear/see messages.
- **Change:** Port door open/unlock/smash + UnblockDoor vision refresh
  + monhaskey + mb_trapped envelope; wire can_open/can_unlock into
  postmov from m_move (pets and hostiles).
- **Verification:** seed0015 Scr **21→22**/44 (RNG full); green+strict
  PASS; cohort 12 PASS; full **14/44** Scr **1324** RNG **128111**.
- **Named omission:** vampshift fog sequencing; iron bars; mdig_tunnel;
  engulfing_u; shop add_damage; has_magic_key disarm; is_rider unlock;
  tunnels(); full mondied/wake_nearto/mon_learns_traps from mb_trapped;
  YMonnam/fog-cloud wording on amorphous squeeze.
- **Lesson:** OPENDOOR in mfndpos is not enough — postmov must change
  doormask and emit verbose hear/see after the step.
- **Next:** seed0015 descend `--More--` @19 / `maybe_smudge_engr` /
  seed0101 Scr residual.

## D-0160 — goto_level descend `--More--` on stale map (seed0015 Scr)

- **Status:** fixed
- **Observed:** seed0015 Scr @19 JS already Dlvl:2
  `You descend the stairs.` (no More; space → Unknown command) vs C
  `You descend the stairs.--More--` still on Dlvl:1 map/status.
- **Rejected:** missing descend pline text (message existed); botl
  Dlvl update bug alone.
- **C locus:** `display.c` `flush_screen(-1)` delay toggle;
  `docrt`→`cls`→`display_nhwindow(WIN_MESSAGE)` forces `more()` before
  clearing the map; `do.c` `goto_level` brackets arrival plines with
  postpone / un-postpone.
- **Cause:** JS `pline` set NEED_MORE but `docrt` never flushed messages
  before redrawing the new level, so `--More--` never owned the space
  key and the capture already showed Dlvl:2.
- **Change:** Port `flush_screen(-1)` postpone (topline-only paints
  while delayed); `cls` flushes NEED_MORE via `more()` then clears;
  `docrt` calls `cls` first; `goto_level` brackets plines+docrt with
  `-1` toggles. Reset topline/delay module state in `runSegment` start
  so NEED_MORE cannot leak across harness sessions.
- **Verification:** seed0015 Scr **22→23**/44 (screen 19 cells match;
  cursors full); green+strict PASS; cohort 12 PASS; full **14/44**
  Scr **1326** RNG **128111**.
- **Named omission:** full `delay_flushing` interaction with every
  `newsym` path; `disp.botlx` force; upstairs/fly/fall descend
  messages; savelev/getlev restore still regenerates.
- **Lesson:** level-change `--More--` must run while map flushes are
  postponed so the stale Dlvl:N screen stays visible; do not rebuild
  from the new `game.level` during that more().
- **Next:** seed0015 Dlvl:2 gold `$` vs wall @ screen 20 /
  `maybe_smudge_engr` / seed0101 Scr residual.

## D-0161 — clear `_objects_at` / `head_engr` on level rebuild (seed0015 Scr)

- **Status:** fixed
- **Observed:** seed0015 Scr @20 JS yellow `$` on top wall vs C DEC
  horizontal wall; RNG already full. Cell was HWALL with
  `remembered_glyph`/`disp_ch` `$` from `objects_at(63,6)`.
- **Rejected:** mineralize placing gold on HWALL; display preferring
  objects over walls (`covers_objects` matches C pool/lava only).
- **C locus:** `mklev.c` `clear_level_structures` zeroes
  `svl.level.objects[x][y]` and objlist; `savelev` release clears
  `head_engr`.
- **Cause:** dlvl1 `fill_ordinary_room`→`mkgold` placed GOLD_PIECE on
  ROOM (63,6). `goto_level`/`clear_level_structures` nullled `fobj` but
  left `game._objects_at` (and `head_engr`) intact, so dlvl2 HWALL at
  the same coordinates still returned the ghost floor object to
  `newsym`.
- **Change:** Clear `_objects_at` and `head_engr` in
  `clear_level_structures` and when `goto_level` detaches the live map.
- **Verification:** seed0015 Scr **23→24**/44 (screen 20 match);
  green+strict PASS; cohort 12 PASS; full **14/44** Scr **1327** RNG
  **128105**.
- **Named omission:** full savelev/getlev object/engraving restore;
  upstairs `<` color still diverges @ screen 21 (JS yellow vs C
  NO_COLOR).
- **Lesson:** spatial indexes must be wiped with the level lists —
  nulling `fobj` alone leaves ghost `objects_at` hits across depths.
- **Next:** seed0015 upstairs `<` color @21 / `maybe_smudge_engr` /
  seed0101 Scr residual.

## D-0162 — ordinary vs known-branch stair colors (seed0015 Scr)

- **Status:** fixed
- **Observed:** seed0015 Scr @21 upstairs `<` JS yellow (11) vs C
  NO_COLOR (8); RNG already full. Dlvl1 cohort sessions kept yellow
  upstairs / gray downstairs (D-0038 fixture note).
- **Rejected:** hardcoding upstairs=yellow / downstairs=NO_COLOR from
  public recordings (D-0038 partial — matched Dlvl1 only).
- **C locus:** `display.c` `back_to_glyph` STAIRS;
  `stairs.c` `known_branch_stairs`; `defsym.h` S_upstair/S_dnstair
  CLR_GRAY, S_br*stair CLR_YELLOW.
- **Cause:** JS `terrain_glyph` forced all upstairs yellow. C uses
  `known_branch_stairs(stairway_at)` (different dnum + `u_traversed`)
  for yellow branch glyphs; ordinary same-dungeon stairs stay gray
  (tty → NO_COLOR). Dlvl1 upstairs is a traversed branch → yellow;
  Dlvl2 upstairs to Dlvl1 is ordinary → NO_COLOR.
- **Change:** `terrain_glyph` STAIRS uses `stairway_at` +
  `known_branch_stairs` + `loc.ladder & LA_DOWN`; branch→CLR_YELLOW,
  else CLR_GRAY.
- **Verification:** seed0015 Scr **24→42**/44; green+strict PASS;
  cohort 12 PASS; full **14/44** Scr **1345** RNG **128105**.
- **Named omission:** ladder glyphs; remaining seed0015 Scr @22 distant
  SQKY "F note" / Scr @38 ^X genderPart.
- **Lesson:** Dlvl1 fixture colors are not universal stair rules —
  port `known_branch_stairs`, do not bake upstairs=yellow.
- **Next:** seed0015 distant SQKY hear / ^X attributes gender /
  `maybe_smudge_engr` / seed0101 Scr residual.

## D-0163 — monster `trapeffect_sqky_board` + `just_an` letter-space (seed0015)

- **Status:** fixed
- **Observed:** seed0015 Scr @22 blank vs C
  `You hear an F note squeak in the distance.`; RNG already full.
- **Rejected:** dosounds feature rolls; inventing a fake hear without
  `mintrap`/`trapeffect_sqky_board`.
- **C locus:** `trap.c` `trapeffect_sqky_board` / `trapnote`;
  `pline.c` `You_hear`; `mon.c` `wake_nearto`; `objnam.c` `just_an`
  (letter+space → `aefhilmnosx`).
- **Cause:** JS SQKY case was a no-op stub. Out-of-sight monsters need
  `You_hear` with `trapnote` + nearby/distance from `couldsee`/`mdistu`.
  trap.js `canseemon` was always-true (local `cansee` stub), which would
  take the in-sight pline path. After You_hear landed, article was
  `a F note` because JS `just_an` only checked vowels — C treats
  `"F note"` (`str[1]==' '`) as single-letter musical note → `an`.
- **Change:** port monster `trapeffect_sqky_board` + `trapnote` +
  `You_hear` + `wake_nearto`; real `canseemon` via vision/`mon_visible`;
  `just_an` letter-space / the-/lava/bars/ice.
- **Verification:** seed0015 Scr **42→43**/44 (then D-0164 → PASS);
  green+strict PASS; cohort 12 PASS.
- **Named omission:** hero `dotrap` SQKY; Deaf+mindless silent;
  `Soundeffect`; `disturb_buried_zombies`; full `just_an` one-/eu-/uke-
  exceptions.
- **Lesson:** trap effect stubs that skip messages still need real
  `canseemon`; musical-note articles are not vowel rules.
- **Next:** ^X genderPart / dungeon depth (D-0164).

## D-0164 — ^X gender gate + dungeon `depth(u.uz)` (seed0015)

- **Status:** fixed
- **Observed:** seed0015 Scr @38 `female human Valkyrie` vs C
  `human Valkyrie`; after gender fix, `on level 1` vs C `level 2`.
- **Rejected:** treating `!name.f` alone as always-add-gender (welcome
  already had the both-genders gate — D-0138).
- **C locus:** `insight.c` `background_enlightenment` gender tmpbuf +
  dungeon line (`dungeons[].dname` + `depth`/`dunlev`).
- **Cause:** `doattributes` used `hasFemaleName ? '' : gender+' '` and
  hardcoded `on level 1`. Valkyrie is female-only (`allow` not both
  genders) so C omits gender; after descend `depth(u.uz)` is 2.
- **Change:** same gender gate as welcome; dungeon line from
  `dungeons[dnum].dname` + `depth(u.uz)`.
- **Verification:** seed0015 **PASS** (RNG 8563/8563 Scr 44/44);
  green+strict PASS; cohort 12 PASS; full **15/44** Scr **1347** RNG
  **128105**.
- **Named omission:** endgame/knox/quest/rogue/bigroom dungeon phrasing;
  `In_quest` uses `dunlev` not `depth`.
- **Lesson:** welcome and ^X share the gender gate; do not hardcode
  Dlvl:1 into attributes after `goto_level` exists.
- **Next:** seed0030 `maybe_smudge_engr` / seed0101 Scr residual /
  seed0200 combat @3382.

## D-0165 — `maybe_smudge_engr` after successful walk (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @6732 — C `rnd(5)` @
  `maybe_smudge_engr` then `wipe_engr_at` `rn2(26)`; JS `rn2(5)` elsewhere.
- **Rejected:** treating arity as a stray movement `rn2(5)`; inventing
  smudge without walk success / `spoteffects` ordering.
- **C locus:** `hack.c` `domove` → `maybe_smudge_engr`; `engrave.c`
  `can_reach_floor` / `wipe_engr_at`.
- **Cause:** JS `domove` never called `maybe_smudge_engr` after a
  successful walk. C erodes non-HEADSTONE engravings at old and/or new
  cell with `wipe_engr_at(..., rnd(5), FALSE)` when
  `can_reach_floor(TRUE)`, **after** `spoteffects`.
- **Change:** port `can_reach_floor` subset + `maybe_smudge_engr`; wire
  into `cmd.js` `domove` after `spoteffects`.
- **Verification:** seed0030 prefix **6732→6889** positional
  **7215**/105529 Scr **111**/1953; green+strict PASS; cohort 13 PASS;
  full **15/44** Scr **1348** RNG **128294**.
- **Named omission:** can_reach_floor ustuck-hugs / ceiling_hider /
  MZ_HUGE / uteetering_at_seen_pit / uescaped_shaft; `u_wipe_engr` body;
  `maybe_adjust_hero_bubble`.
- **Lesson:** walk-adjacent engraving erosion is part of `domove`, not
  engrave command; call after pickup/`spoteffects`.
- **Next:** seed0030 `next_ident` @10584 / seed0101 Scr residual /
  seed0200 combat @3382.

## D-0166 — Teleportation hub themeroom_fill + make_a_trap (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @6889 — C `rn2(3)` @
  `themerms.lua:268` Teleportation hub `contents`; JS `rn2(1)` (next
  room / skipped fill body).
- **Rejected:** treating arity as Storeroom/`rn2(1)` leftover; inventing
  hub traps without postprocess teledest / `mktrap` victim gate.
- **C locus:** `themerms.lua` Teleportation hub + `make_a_trap` +
  `post_level_generate`; `mklev.c` `themerooms_post_level_generate` /
  `mktrap` victim `rnd(4)`; `selvar.c` `selection_rndcoord` /
  `selection_filter_mapchar`.
- **Cause:** JS `themeroom_fill` reservoir could pick Teleportation hub
  but only Ghost had a body. Missing `2+rn2(3)` + room-floor rndcoord
  queue, `post_level_generate` teledest picks, and `mktrap`’s
  short-circuit `rnd(4)` before `(kind < HOLE)` rejects TELEP.
- **Change:** port hub fill + `selection_filter_mapchar` / all-floor
  selection; themerms postprocess queue → `make_a_trap` (seen TELEP +
  teledest); wire before wallification; `maketrap` gains `teledest`.
- **Verification:** seed0030 prefix **6889→10584** positional
  **10867**/105529 Scr **111**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1348** RNG **131946**.
- **Named omission:** other fill bodies (Ice/Temple/Storeroom/…);
  garden/dig postprocess handlers; hero TELEP activation.
- **Lesson:** Lua postprocess can burn RNG long after fill; `mktrap`
  victim `rnd(4)` still runs for TELEP even when the body is skipped.
- **Next:** seed0030 `next_ident` @10584 / seed0101 Scr residual /
  seed0200 combat @3382.

## D-0167 — mhitm mondied make_corpse / next_ident (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10584 — C `rnd(2)` @
  `next_ident(mkobj.c)` after `corpse_chance`; JS `rnd(1)`.
- **Rejected:** broken `next_ident` itself; inventing `rnd(1)` callers;
  treating arity as missing `nextoid` shop search.
- **C locus:** `mon.c` `mondied`/`make_corpse`/`corpse_chance`;
  `mkobj.c` `mkcorpstat`/`mksobj`/`next_ident`; `mhitm.c` death path
  after `mhitm_knockback`.
- **Cause:** JS mhitm `mondied` burned `corpse_chance` only (named
  omission). When the roll succeeded, C created the corpse
  (`mkcorpstat`→`next_ident` `rnd(2)`); JS fell through to `grow_up`
  `rnd(victim.m_lev+1)` = `rnd(1)` for a level-0 victim. Trap-path
  `mondied` already called `make_corpse` (D-0150).
- **Change:** port ordinary `make_corpse` default_1 into mhitm
  `mondied` (same envelope as trap.js: `CORPSTAT_INIT` + gender +
  `mkcorpstat`/`stackobj`/`newsym`).
- **Verification:** seed0030 prefix **10584→10608** positional
  **10939**/105529 Scr **110**/1953; green+strict PASS; cohort
  1500/1800/0060/0015/0106 PASS; full **15/44** Scr **1347** RNG
  **131959**.
- **Named omission:** dragon/unicorn/worm/undead `make_corpse`
  specials; `accessible`/`is_pool` gate; `save_mtraits`; hero
  `xkilled` still burns `corpse_chance`/`!rn2(6)` without corpse body.
- **Lesson:** deferred corpse after a matching `corpse_chance` success
  does not look like a wrong `next_ident` — it looks like the next
  caller's arity (`grow_up`).
- **Next:** seed0030 `obj_resists` @10608 / seed0101 Scr residual /
  seed0200 combat @3382.

## D-0168 — dog_eat after edible newdogpos (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10608 — C three
  `obj_resists` `rn2(100)` after dog_move selection; JS one then
  `rn2(5)` (distfleeck).
- **Rejected:** missing floor pile / nexthere; poisonous newt corpse;
  missing `mpickstuff` dogfood; dog_goal invent scan after selection.
- **C locus:** `dogmove.c` edible candidate → `goto newdogpos` →
  `dog_eat` → `dogfood` (reward check) → `m_consume_obj` →
  `delobj`/`obj_resists(0,0)`.
- **Cause:** JS early-returned from the candidate loop on edible food
  (move only), skipping `dog_eat`. C always re-rolls `dogfood` then
  `delobj` — two extra `rn2(100)`.
- **Change:** set `do_eat` + break (C `goto`); after place call
  `dog_eat` (nutrition/pline subset + `dogfood` + `delobj`).
- **Verification:** seed0030 prefix **10608→10620** positional
  **11005**/105529 Scr **120**/1953; green+strict PASS; cohort
  1500/1800/0060/0015/0106/0105/0016 PASS; full **15/44** Scr
  **1357** RNG **132086**.
- **Named omission:** full `dog_nutrition` cwt/cnutrit tables;
  bee jelly / rust spit / unpaid shop; `dog_invent` eat return path;
  `postmov` `mpickstuff` body.
- **Lesson:** edible `newdogpos` is not “move and return” — C’s
  `dog_eat` still burns `obj_resists` twice after the find.
- **Next:** seed0030 @10620 (distfleeck vs `rn2(4)`) / seed0101 Scr /
  seed0200 @3382.

## D-0169 — m_move meating before dog_move (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10620 — C second
  `distfleeck` `rn2(5)`; JS `rn2(4)` (looked like `dog_goal` follow /
  wanderer `dochug`).
- **Rejected:** wanderer `dochug` `rn2(4)` short-circuit; hero
  `IS_ROOM` vs corridor; pet position/`udist` divergence; missing
  `dog_goal` DOGFOOD branch.
- **C locus:** `monmove.c` `m_move` — after `mtrapped`, if
  `mtmp->meating` then `--meating` / `finish_meating` and
  `return MMOVE_DONE` **before** `dog_move`; `dochug` still recalcs
  `distfleeck`.
- **Cause:** prior turn’s `dog_eat` set `meating` via `dog_nutrition`.
  C spent the next pet turn digesting (two `distfleeck` only). JS
  skipped the gate and entered `dog_goal` follow `!rn2(4)`.
- **Change:** `m_move` runs `mtrapped` then meating countdown for all
  monsters; pets only reach `dog_move` when not eating. Export
  `finish_meating` stub from `dogmove.js`.
- **Verification:** seed0030 prefix **10620→10803** positional
  **11133**/105529 Scr **168**/1953; green+strict PASS; cohort
  1500/1800/0060/0015 PASS; full **15/44** Scr **1405** RNG
  **132144**.
- **Named omission:** `finish_meating` mimic `M_AP` reset /
  `quickmimic`; `hides_under` `rn2(10)` before approach; full
  `dog_nutrition` cwt tables (meating length may still drift).
- **Lesson:** post-eat `distfleeck` vs `rn2(4)` is often meating, not
  dog_goal — check `m_move` gates before follow-player RNG.
- **Next:** seed0030 @10803 (`hmon_hitmon_stagger`) / seed0101 Scr /
  seed0200 @3382.

## D-0170 — unarmed hmon_hitmon_stagger rnd(100) (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10803 — C `rnd(100)` @
  `hmon_hitmon_stagger`; JS `rn2(6)` (`xkilled` treasure).
- **Rejected:** barehands damage formula alone; xkilled order; miss vs
  hit gate (prefix matched through `rnd(2)=2` barehands).
- **C locus:** `uhitm.c` `hmon_hitmon` — after dmg recalc, if
  `unarmed && dmg > 1 && !thrown && !obj && !Upolyd` call
  `hmon_hitmon_stagger` **before** `mhp -= dmg` / `killed`. Stagger
  always evaluates `rnd(100) < P_SKILL(P_BARE_HANDED_COMBAT)` then
  `!bigmonst`/`!thick_skinned`.
- **Cause:** JS `hmon` applied barehands damage and went straight to
  `xkilled`, skipping the unarmed stagger RNG (even when skill gate
  fails, C still burns `rnd(100)`).
- **Change:** `hmon_hitmon_stagger` + call gate in `uhitm.js`;
  `bigmonst`/`thick_skinned`/`M1_THICK_HIDE`/`MZ_LARGE` in
  `monsters.js`; export `P_SKILL` from `weapon.js`.
- **Verification:** seed0030 prefix **10803→10861** positional
  **11206**/105529 Scr **168**/1953; green+strict PASS; cohort
  1500/1800/0060/0015/0106/0105/0016 PASS; full **15/44** Scr
  **1405** RNG **132236**.
- **Named omission:** stun pline + `mhurtle_to_doom` when skill gate
  succeeds and pending dmg < mhp; martial `rnd(4)` barehands;
  `dbon`/weapon-skill dmg_recalc; live weapon knockback.
- **Lesson:** unarmed `dmg > 1` always burns stagger `rnd(100)` before
  kill RNG — do not jump from barehands `rnd(2)` to `xkilled`.
- **Next:** seed0030 @10861 (`nhlib.lua` shuffle after `getbones`) /
  seed0101 Scr / seed0200 @3382.

## D-0171 — Mines fill_lvl / makemaz(minefill) + dungeon align 3-bit

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @10861 after `>`/`getbones`
  — C `nhlib.lua` shuffle `rn2(3)`; JS ordinary `makelevel` Medusa
  `rn2(5)`.
- **Rejected:** wrong getbones arity; themerms reload; Medusa check
  always-first as C order (C only evaluates `rn2(5)` after special/
  fill_lvl branches fail).
- **C locus:** `mklev.c` `makelevel` `fill_lvl` → `makemaz` →
  `load_special(minefill)` → `splev_initlev` SOLIDFILL+MINES →
  `mkmap.c` `init_fill`/passes/`join_map`; `dungeon.c`
  `flags.align` 3-bit bitfield truncates `D_ALIGN_*`.
- **Cause:** JS correctly set `uz` to Mines (`dnum=2`) on branch
  stairs but `makelevel` ignored `dungeons[].fill_lvl` and always ran
  ordinary rooms (burning Medusa `rn2(5)` first). Separately, JS stored
  dungeon `flags.align = D_ALIGN_LAWFUL (0x40)` full-width so
  `induced_align` took the `rn2(100)` dungeon path; C’s 3-bit field
  truncates 0x40→0 and falls through to `rn2(3)`.
- **Change:** `makelevel` dispatches `fill_lvl` → `makemaz` → JS
  `minefill.lua` body (`mkmap` + stairs/objects/monsters/traps);
  dungeon `flags.align = dgn_align & 7`.
- **Verification:** seed0030 prefix **10861→12757** positional
  **13100**/105529 Scr **168**/1953; green+strict PASS; cohort
  1500/1800/0060/0015 PASS; full **15/44** Scr **1405** RNG
  **134130**.
- **Named omission:** full `create_trap`/`mktrap_victim` on des.trap;
  `fixup_special`/`place_lregion`; hellfill/other protos; empty
  `makemaz("")` maze; Is_special / quest fill branches.
- **Lesson:** after `getbones` on a branch dungeon, check
  `fill_lvl`/`makemaz` before ordinary Medusa `rn2(5)`; dungeon align
  must match C’s 3-bit truncation.
- **Next:** seed0030 @12757 cleared by D-0172; see D-0172 next.

## D-0172 — race hatemask / M2 race bits + S_GNOME m_initinv

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @12757 — C
  `rnd(14) @ m_initweap` (default gnome); JS `rn2(16)` (looked like
  wrong weapon envelope).
- **Rejected:** JS `m_initweap` default using `rn2(16)` instead of
  `rnd(14)` — default path already matched C; mismatch was an earlier
  extra `peace_minded` roll. S_GNOME special weapon case (C has none;
  gnomes fall through to default).
- **C locus:** `role.c` races[] `hatemask`/`lovemask`; `mondata.h`
  `race_hostile`/`race_peaceful`; `makemon.c` `peace_minded` /
  `m_initinv` S_GNOME; `monflag.h` M2_HUMAN…M2_ORC; extractor
  `scripts/extract-monsters.py` M2_FLAGS.
- **Cause:** (1) Human `hatemask = MH_GNOME|MH_ORC` so Tourist vs
  gnome returns hostile without co-align `rn2(16+record)`. JS omitted
  race masks and `race_*` checks. (2) Extractor zeroed unknown M2 race
  bits (`M2_GNOME` etc.), so even with hatemask the bit test failed.
  (3) After peace_minded, C `m_initinv` S_GNOME burns Mines
  `rn2(20)` candle gate; JS had tail-only `rn2(50)`/`rn2(100)`.
- **Change:** races[] `lovemask`/`hatemask` + copy onto `game.urace`;
  `peace_minded` race_peaceful/hostile (+ amulet arm); regenerate
  `monsters_data.js` with full M2 race bits; `m_initinv` S_GNOME
  candle before defensive/misc rolls.
- **Verification:** seed0030 prefix **12757→12907** positional
  **13718**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135175**.
- **Named omission:** MS_LEADER/GUARDIAN/NEMESIS/ERINYS/`is_minion`
  peace_minded arms; other `m_initinv` bodies (mercenary/nymph/…);
  `begin_burn` on failed mpickobj; `likes_gold`/`mkmonmoney`.
- **Lesson:** `rn2(16)` right after makemon gender is almost always
  `peace_minded` co-align — check `race_hostile` and extracted M2 race
  bits before blaming `m_initweap`.
- **Next:** seed0030 @12907 cleared by D-0173; see D-0173 next.

## D-0173 — NAMS pmnames / name_to_monplus gender (gnome lord)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @12907 — C
  `rn2(3) @ induced_align`; JS `rn2(2)` (looked like induced_align
  dungeon-align short-circuit or wrong rn2 arity).
- **Rejected:** `induced_align` itself wrong (lev/dun align gates) —
  C was already on the final `rn2(3)` fallback; JS emitted an *extra*
  call before that. Also not a minefill `create_monster` order bug:
  prior gnome `find_montype`/`induced_align` pairs matched.
- **C locus:** `monst.c` `NAM`/`NAMS` → `permonst.pmnames[]`;
  `mondata.c` `name_to_monplus` gender match; `sp_lev.c`
  `find_montype` / `lspo_monster`; extractor
  `scripts/extract-monsters.py`.
- **Cause:** JS `name_to_monplus` only matched enum tokens
  (`PM_GNOME_LEADER` → `"gnome leader"`). `"gnome lord"`
  prefix-matched `"gnome"` → PM_GNOME, then `find_montype_gender`
  burned `rn2(2)` for non-fixed-sex. C matches NAMS male
  `"gnome lord"` → PM_GNOME_LEADER + MALE with **no** gender RNG,
  then `induced_align` `rn2(3)`.
- **Change:** extract `pmnames[MALE/FEMALE/NEUTRAL]` from NAM/NAMS;
  `name_to_monplus` longest-match + gender out-param; `find_montype`
  uses name gender before `rn2(2)`.
- **Verification:** seed0030 prefix **12907→12968** positional
  **13313**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **134770**.
- **Named omission:** full `alt_spl` table / rank titles; other
  `m_initinv` bodies; `likes_gold` cleared by D-0174.
- **Lesson:** `rn2(2)` immediately before `induced_align` in minefill
  is `find_montype` gender — check NAMS male/female names, not
  `induced_align` first.
- **Next:** seed0030 @12968 cleared by D-0174; see D-0174 next.

## D-0174 — m_initinv likes_gold / mkmonmoney

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @12968 — C
  `rn2(5) @ m_initinv(makemon.c:830)`; JS `rn2(100)` (`peace_minded`).
- **Rejected:** peace_minded / gnome candle order wrong — prior
  defensive `rn2(50)`/`rn2(100)` matched; only the trailing gold gate
  was missing. Also not “ordinary gnomes need gold” — gnomes lack
  `M2_GREEDY`; the peel is dwarf/orc GREEDY.
- **C locus:** `mondata.h` `likes_gold`; `steal.c` `findgold`;
  `makemon.c` `mkmonmoney` / `m_initinv` trailing gold; `monflag.h`
  `M2_GREEDY`.
- **Cause:** JS `m_initinv` deferred `likes_gold`/`mkmonmoney` after
  the defensive/misc rolls, so GREEDY monsters skipped `!rn2(5)` and
  jumped to `peace_minded`.
- **Change:** `likes_gold` + `M2_GREEDY`; `findgold`; `mkmonmoney`
  (`mksobj(GOLD_PIECE)` + `add_to_minv`); wire
  `likes_gold && !findgold && !rn2(5)` → `d(level_difficulty(), …)`.
- **Verification:** seed0030 prefix **12968→13007** positional
  **13339**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **134796**.
- **Named omission:** PM_SOLDIER `rn2(13)` early return; other
  `m_initinv` bodies (mercenary/nymph/…); `findgold` container walk;
  `begin_burn` on failed candle `mpickobj`.
- **Lesson:** trailing `m_initinv` gold is shared across GREEDY mlets
  (dwarf/orc/…), not part of the S_GNOME candle case.
- **Next:** seed0030 @13007 cleared by D-0175; see D-0175 next.

## D-0175 — minefill create_monster induced_align before mkclass

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13007 — C
  `rn2(3) @ induced_align`; JS `rn2(9)` (`mkclass_aligned`).
- **Rejected:** induced_align dungeon/lev align gates wrong — named
  gnome/dwarf spawns already matched amask/`rn2(3)`; only class-letter
  `'G'`/`'h'` diverged. Also not a mkclass body bug (C’s next call is
  the same `rn2(9)` after amask).
- **C locus:** `sp_lev.c` `create_monster` → `sp_amask_to_amask` then
  `mkclass(class, G_NOGEN)` when `id == NON_PM`.
- **Cause:** JS `splev_create_monster` called `mkclass` before
  `induced_align(80)` for single-letter classes.
- **Change:** reorder — named `find_montype_gender` first; always
  `induced_align(80)`; then class-letter `mkclass`.
- **Verification:** seed0030 prefix **13007→13122** (then D-0176);
  green+strict PASS; cohort PASS.
- **Named omission:** `In_mines` your_race dwarf/gnome `rn2(3)` null-out;
  humidity `get_location_coord`; appear/inventory; non-RANDOM amask /
  `mk_roamer`.
- **Lesson:** class-letter and named minefill paths share amask but
  differ on whether `mkclass` runs after it — do not hoist mkclass.
- **Next:** seed0030 @13122 cleared by D-0176; see D-0176 next.

## D-0176 — minefill create_trap traptype retry + mktrap victim

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13122 — C second
  `rnd(25) @ traptype_rnd`; JS `rn2(79)` (`get_location`). After retry
  fix, @13127 C `rnd(4) @ mktrap` vs JS next get_location.
- **Rejected:** get_location arity / trap count wrong — first
  location+traptype matched; JS simply accepted NO_TRAP without retry
  then skipped victim gate.
- **C locus:** `sp_lev.c` `create_trap` → `mktrap` (`mklev.c`) —
  `do { traptype_rnd } while NO_TRAP`; hole→ROCKTRAP; victim
  `lvl <= rnd(4)` (+ LANDMINE→PIT / `mktrap_victim`).
- **Cause:** JS `splev_create_trap` called `traptype_rnd` once and
  skipped on NO_TRAP; never burned victim `rnd(4)`.
- **Change:** retry loop + ROCKTRAP rewrite + victim gate wired to
  existing `mktrap_victim` (same shape as `mktrap_room` / telehub).
- **Verification:** seed0030 prefix **13122→13226** positional
  **14148**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135605**.
- **Named omission:** `MKTRAP_NOSPIDERONWEB`/`SEEN`/`NOVICTIM` Lua
  flags; WEB giant spider; stair/ladder location retry; full
  `place_lregion` / stock after minefill traps.
- **Lesson:** special-level random traps still use ordinary `mktrap`
  retry+victim unless Lua sets `novictim`.
- **Next:** seed0030 @13226 cleared by D-0177; see D-0177 next.

## D-0177 — minefill fixup_special place_lregion + Mines mineralize

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13226 — C `rn2(79)` /
  `rn2(21)` @ `place_lregion`; JS `rn2(1000)` @ `mineralize`. After
  fixup, @13261 C `next_ident` (gold `mksobj`) vs JS still bare
  `rn2(1000)` until Mines gold/gem boost.
- **Rejected:** stock_room / ordinary mineralize-first — C provenance is
  `fixup_special` after `load_special`; minefill.lua has `noflip` and
  no lev_regions, so the only `place_lregion` is the Is_branchlev
  fallback. Room-based `place_branch(0,0)` is wrong here because
  `join_map_cleanup` leaves `nroom==0`.
- **C locus:** `sp_lev.c` `load_special` → `fixup_special` /
  `place_lregion` / `put_lregion_here` (`mkmaze.c`); `place_branch`
  (`mklev.c`); `mineralize` Mines `goldprob*=2` / `gemprob*=3`.
- **Cause:** JS `load_minefill` never called `fixup_special`; hero-only
  `place_lregion` stub lacked LR_BRANCH; mineralize omitted Mines boost.
- **Change:** port `bad_location`/`put_lregion_here`/`place_lregion`
  (branch short-circuit when `nroom`); `fixup_special` after minefill
  wallify; `place_branch(br,x,y)` coords; Mines mineralize multipliers.
- **Verification:** seed0030 prefix **13226→13906** positional
  **14344**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135801**.
- **Named omission:** lev_region[] compiler path; `mkportal`;
  `is_exclusion_zone`; oneshot `undestroyable_trap`/`rloc` tele; hell /
  V_tower / rogue / arboreal / Is_special mineralize skips; In_quest
  gold/gem slash; `mdig_tunnel` after Mines load.
- **Lesson:** after mkmap cleanup `nroom==0`, branch placement uses
  full-map `place_lregion` RNG — not the ordinary-room `place_branch`
  path. Mines mineralize probs are doubled/tripled.
- **Next:** seed0030 @13906 cleared by D-0178; see D-0178 next.

## D-0178 — mdig_tunnel / tunnels / ALLOW_DIG (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13906 — C `rnd(12)` @
  `mdig_tunnel`; JS `rn2(5)` @ `distfleeck`.
- **Rejected:** inventing a one-seed dig burn without wiring `can_tunnel` —
  every tunnel-capable move burns `pile=rnd(12)` even on open floor.
- **C locus:** `mondata.h` `tunnels`/`needspick`; `mon.c` `mon_allowflags`
  `ALLOW_DIG` + `mfndpos` diggable rock/tree; `monmove.c` `m_move`
  `can_tunnel` + close-range needspick disable + `postmov` →
  `dig.c` `mdig_tunnel` / `hack.c` `may_dig`.
- **Cause:** JS forced `can_tunnel=false` and skipped `mdig_tunnel`, so
  rock moles (and other M1_TUNNEL) never burned the post-move dig RNG.
- **Change:** `tunnels`/`needspick`; `mon_allowflags`/`mfndpos` ALLOW_DIG
  rockok/treeok/thrudoor; real `can_tunnel` in `m_move`; `js/dig.js`
  `may_dig`/`mdig_tunnel` (door/SCORR/wall/tree/stone + draft/crash/
  boulder-rock/treefruit); postmov call.
- **Verification:** seed0030 prefix **13906→13921** positional
  **14256**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135713**.
- **Named omission:** iron bars; `m_digweapon_check`; shop `add_damage`;
  Hallucination draft; `in_town` cavernous gate; peaceful shop/temple
  dig avoid; cursed-mwep dig-tool gate; full `mb_trapped` mondead;
  `ALLOW_WALL` passwall; engulfer update.
- **Lesson:** tunnel dig RNG is on every successful move of a digger,
  not only when standing on rock — `may_dig` is true for open floor.
- **Next:** seed0030 @13921 cleared by D-0179/D-0180; see those next.

## D-0179 — get_mattk from extracted mattk[] / AT_WEAP=254 (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13921 — C `rnd(20)` @
  `mattacku`; JS `rn2(12)` (next dig / other path).
- **Rejected:** inventing a Mines-only attack stub — extracted
  `mattks` already had full NATTK slots; JS ignored them.
- **C locus:** `monattk.h` AT_WEAP=254 / AT_SPIT=10; `mhitu.c`
  `getmattk` → `mptr->mattk[indx]`; `mattacku` `rnd(20+i)`.
- **Cause:** `get_mattk` used a hand `FIRST_ATTK` map with
  `AT_WEAP=10` (actually AT_SPIT). Mines dwarves/gnomes were AT_NONE
  so melee never burned the hit die.
- **Change:** `get_mattk` reads `magr.data.mattk[i]`; constants
  AT_WEAP=254 / AT_MAGC=255 / AT_SPIT=10; retire FIRST_ATTK.
- **Verification:** seed0030 prefix **13921→13953**; green+cohort PASS.
- **Named omission:** `getmattk` substitutions (SEDUCE/disease/DREN/
  mspec_used/cold→phys/…); AT_MAGC/AT_BREA/AT_GAZE/… bodies in
  `mattacku`; full multi-slot passives beyond AT_NONE scan.
- **Lesson:** experience() already used AT_WEAP=254 — combat must
  match `monattk.h`, not invent AT_WEAP=10 from older NetHack.
- **Next:** cleared further by D-0180; see D-0180 next.

## D-0180 — m_digweapon_check + pick/axe mon_wield (seed0030)

- **Status:** fixed
- **Observed:** seed0030 first RNG mismatch @13953 — C `distfleeck`
  rn2(5); JS `rnd(12)` @ dig (after matching track rn2(32)).
- **Rejected:** disabling dig near hero alone — C spends the turn
  wielding before place when needspick diggers lack the right tool.
- **C locus:** `monmove.c` `m_digweapon_check`; `weapon.c`
  `mon_wield_item` NEED_PICK_AXE / NEED_AXE / NEED_PICK_OR_AXE;
  hero-square `m_move` returns MMOVE_NOTHING (not DONE).
- **Cause:** JS always placed + `mdig_tunnel` for tunnelers; missing
  digweapon gate let needspick diggers dig when C only wielded.
- **Change:** `m_digweapon_check` before place; pick/axe arms of
  `mon_wield_item`; export `m_carrying`/`mon_has_shield`; hero-square
  → MMOVE_NOTHING so dochug can attack.
- **Verification:** seed0030 prefix **13953→13987** positional
  **14343**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135799**.
- **Named omission:** weld refuse-wield plines; `artifact_light`;
  NEED_HTH/`select_hwep`; dog_move digweapon; canseemon wield msgs.
- **Lesson:** dig RNG is gated by weapon readiness for needspick
  species — missing wield looks like “extra dig”, not wrong may_dig.
- **Next:** seed0030 @13987 (`next_ident` vs dig) /
  seed0101 Scr / seed0200 @3382.

## D-0181 — trapeffect_rocktrap + hostile gettrack + initrack (seed0030)

- **Status:** partial — rocktrap + hostile gettrack + level-leave initrack
  ported; dwarf @13987 pick still open
- **Observed:** seed0030 first RNG mismatch @13987 — C `next_ident`
  `rnd(2)` @ rocktrap `t_missile(ROCK)`; JS `rnd(12)` dig.
- **C locus:** `trap.c` `trapeffect_rocktrap` monster branch;
  `monmove.c` `m_move` `should_see` + `gettrack`; `mondata.c` `can_track`;
  `do.c`/`save.c`/`track.c` `savelev`→`save_track`→`initrack`.
- **Cause (ported):** JS `trapeffect_selector` omitted ROCKTRAP; hostile
  `m_move` omitted `!should_see && can_track`→`gettrack`; `goto_level`
  omitted initrack so prior-level tracks leaked.
- **Change:** monster `trapeffect_rocktrap`; `haseyes`/`can_track`;
  hostile `should_see`+`gettrack`; `goto_level` `initrack` on leave.
- **Rejected / falsified:**
  1. Wiring gettrack without initrack: stale tracks redirect newt
     @10676 → @10701 `rn2(24)` vs C `rn2(20)`.
  2. **Dwarf @13987 needs gettrack to prefer ROCKTRAP (27,6):** dwarf at
     (27,7), mux=(33,5), candidates include ROCKTRAP (27,6) and nearer
     (28,6); gettrack returns **null** — current-level ring has only
     (30,8)/(31,7)/(32,6); full stale prior-level ring also has no
     adjacent cell. Not a missing gettrack redirect.
- **Verification:** green+strict PASS; cohort PASS; full **15/44** Scr
  **1405** RNG **135795**; seed0030 prefix still **13987**.
- **Named omission:** hero rocktrap/helmet; empty-door pline_mon;
  Invis/balks/shortsighted/`m_search_items`; Excalibur `can_track`;
  per-level `rest_track` on return visits.
- **Lesson:** C `savelev` clears tracks on leave — porting gettrack
  without initrack invents cross-level footprints. Falsify adjacent-track
  presence before attributing a nearer-trap miss to gettrack.
- **Next:** why C steps on ROCKTRAP without adjacent track (mfndpos /
  actor order / other gg); or peel seed0101 Scr.

## D-0182 — m_search_items loot gg redirect (seed0030 dwarf rocktrap)

- **Status:** fixed (partial helpers; named omissions below)
- **Observed:** seed0030 @13987 — C `next_ident` rocktrap; JS `rnd(12)` dig
  toward mux-nearer (28,6). gettrack redirect falsified (D-0181).
- **C locus:** `monmove.c` `m_move` getitems gate + `m_search_items` /
  `mon_would_take_item` / `can_carry`.
- **Cause:** JS hostile `m_move` omitted floor-loot search. DIAG at dwarf
  (27,7): ROCKTRAP (27,6) pile CORPSE/SLIME_MOLD/ROCK/WORTHLESS_WHITE_GLASS;
  dwarf `M2_JEWELS|M2_COLLECT` → `likes_objs`/`likes_gems` redirects gg to
  (27,6), so rocktrap is nearer than dig (28,6).
- **Change:** `js/monmove.js` getitems + `m_search_items` +
  `mon_would_take_item`/`can_carry`/`curr_mon_load`/`max_mon_load`;
  `js/monsters.js` `likes_gems`/`likes_objs`/`likes_magic`/`mindless`/
  `is_animal`/`strongmonst` + `M2_JEWELS`/`M2_COLLECT`/`M2_MAGIC`.
- **Named omission:** `searches_for_item`; shop `in_rooms`+`rn2(25)`;
  `hides_under`/`onscary`/`costly_spot`; mines/soko prizes;
  `can_touch_safely` petrify/silver/artifact; `mon_would_consume_item`
  body; Invis/balks/shortsighted still deferred.
- **Verification:** seed0030 prefix **13987→14026**; positional
  **14351**/105529 Scr **168**/1953; full **15/44** Scr **1405** RNG
  **135801**; green+strict PASS; PASS cohort held.
- **Rejected / falsified:** mfndpos excluding (28,6)/(28,7); actor-order
  before loot gg (loot was the writer).
- **Next:** seed0030 @14026 (C `rn2(28)` mtrack vs JS `rn2(5)`
  distfleeck — actor/cnt); or seed0101 Scr / seed0200 @3382.

## D-0183 — underfoot m_search_items MMOVE_DONE (seed0030 gnome glass)

- **Status:** partial (underfoot short-circuit deferred; peaceful can_carry done)
- **Observed:** seed0030 @14026 — C `rn2(28)` mtrack @ `monmove.c:1963`;
  JS `rn2(5)` distfleeck.
- **C locus:** `monmove.c` `m_search_items` underfoot → `MMOVE_DONE` →
  `postmov` → `mpickstuff`; `mon.c` `can_carry` peaceful gate.
- **Cause:** DIAG: PM_GNOME @(57,11) on WORTHLESS_BLUE_GLASS —
  `m_search_items` returned TRUE (underfoot take). JS `postmov` ignored
  `MMOVE_DONE` (no mpickstuff), so the turn ended without mfndpos/mtrack
  while C continued to approach (`cnt=7` → `rn2(28)`). Actor-order/cnt
  drift after D-0182 **falsified**.
- **Change:** `js/monmove.js` — skip underfoot loot claim in
  `m_search_items` (distant redirects unchanged); `can_carry` peaceful
  non-pets return 0; `postmov` acknowledges DONE (pickup still omitted).
- **Named omission:** restore underfoot `return TRUE` together with
  `postmov`→`mpickstuff` (and shop `rn2(25)` / metallivorous / gelcube /
  corpse_eater arms as needed).
- **Verification:** seed0030 prefix **14026→14056**; positional
  **14375**/105529 Scr **168**/1953; full **15/44** Scr **1405** RNG
  **135825**; green+strict PASS; PASS cohort held.
- **Rejected / falsified:** post-loot actor skip / fleeck-only cnt drift;
  peaceful standing-vs-approaching (all gnomes `mpeaceful=0`); onscary /
  trap / shop under glass cell (none).
- **Next:** seed0030 @14056 (`u_catch_thrown_obj` rn2(88) vs JS rn2(32));
  or seed0101 Scr / seed0200 @3382.

## D-0184 — muse potion throw + potionhit (seed0030 @14056)

- **Status:** partial (potion offense + hero potionhit/breathe/makeknown;
  wand/horn muse and full peffects deferred)
- **Observed:** seed0030 @14056 — C `rn2(88)` `u_catch_thrown_obj`;
  JS `rn2(32)` `m_move`. Call-site stacks: C already in `m_throw`
  forcehit; JS at `thrwmu` URETREATING `rn2(5)` with ARROW.
- **C locus:** `mhitu.c` `mattacku` → `muse.c` `find_offensive` /
  `use_offensive` (MUSE_POT_SLEEPING); `mthrowu.c` `m_throw` potion
  branch → `potion.c` `potionhit`/`bottlename`/`potionbreathe`;
  flight `observe_object` → breathe `makeknown` →
  `discover_object(..., credit_hero)` → `exercise(A_WIS,TRUE)`.
- **Cause:** JS lacked muse offensive potion throw before AT_WEAP, so C
  hurled POT_SLEEPING while JS tried thrwmu ARROW and aborted on
  URETREATING. Coincident `rn2(5)` values were not `m_throw` forcehits.
- **Change:** `js/muse.js` (new) potion `find_offensive`/`use_offensive`;
  wire in `js/mhitu.js` `mattacku`; `js/mthrowu.js` POTION→`potionhit` +
  flight `observe_object`; `js/potion.js` `potionhit`/`bottlename`/
  `potionbreathe` hero path (`obfree` not `delobj`); `js/invent.js`
  `discover_object` credit_hero + `makeknown`; `js/hack.js` `losehp`
  matches C `end_running` (no forced `multi=0`).
- **Named omission:** muse wand/horn/scroll/camera offense; mon-target
  `potionhit`; `hold_another_object` catch; towel/Half_gas; trycall when
  `!kn`; full `make_confused`/`make_blinded` bodies.
- **Verification:** seed0030 prefix **14056→14118**; positional
  **14487**/105529 Scr **168**/1953; full **15/44** Scr **1405** RNG
  **135937**; green+strict PASS; PASS cohort held.
- **Rejected / falsified:** wrong `catch_chance`/DEX (JS never entered
  catch); `delobj` after potionhit (extra `rn2(100)`); makeknown without
  flight `observe_object` when thrower `!cansee`.
- **Next:** seed0030 @14151 (after D-0185); or seed0101 Scr / seed0200 @3382.

## D-0185 — seed0030 @14118 missing postmov `mpickstuff`

- **Status:** fixed
- **Observed:** seed0030 @14118 — C `rn2(32)` @ `m_move` mtrack; JS
  `rn2(24)`. Matching `rn2(32)` @14074 with **different mon positions**:
  C `(59,9)` vs JS `(58,9)` (same arg — silent path split).
- **C recorder dump:** at `(59,8)` both `gettrack=null`, `mux=(33,5)`;
  after `m_search_items` C `gg=(59,12)` vs JS `gg=(57,11)`. Same
  `poss`/cnt=8. C has no floor glass at `(57,11)` (gnome there holds
  glass in `minvent`); JS still has floor glass → nearer loot redirect.
  At `(57,10)` C **also** has TRCORNER/BRCORNER and cnt=6 — wall-opener
  theories were red herrings (FORCE-open coincidence).
- **C locus:** `mon.c` `mpickstuff`; `monmove.c` `postmov` shared
  `MOVED|DONE` `OBJ_AT` pickup; `m_search_items` gg.
- **Cause:** JS `postmov` never called `mpickstuff`, so hostile gnomes
  left takeable glass on the floor; later `m_search_items` chose a
  different gg without burning different RNG at the prior mtrack call.
- **Fix:** port `mpickstuff` (one-object take via `mon_would_take_item`/
  `can_carry`/`splitobj`/`mpickobj`) and run it in `postmov` for
  `MMOVE_MOVED|MMOVE_DONE` like C.
- **Rejected / falsified:** mkmap pass_two/join/flood/dig/wallify openers;
  post-wallify typ writers; C walkable walls at `(56,9)/(56,10)` when
  gnome is at `(57,10)`.
- **Verification:** seed0030 prefix **14118→14151**; positional
  **14489**/105529; full **15/44** Scr **1405** RNG **135939**; green
  + seed1500/1800/0060 + strict PASS. Next @14151 `distfleeck` vs
  `rnd(2)`.
- **Named omissions:** underfoot `m_search_items`→`MMOVE_DONE` still
  deferred (D-0183); shop/`inhishop`; meatmetal/cube/corpse_eater;
  `check_gear_next_turn`; `distant_name` side-effects.

## D-0186 — can_carry quan>1 only for M1_NOHANDS (seed0030 @14151)

- **Status:** fixed
- **Observed:** seed0030 @14151 — C `rn2(5)` `@distfleeck`; JS `rnd(2)`
  via `next_ident`←`splitobj`←`mpickstuff`←`postmov`.
- **DIAG:** PM_GNOME (hands) @(49,19) on WORTHLESS_VIOLET_GLASS quan=2
  owt=2; JS `carryamt=1` forced split; `nohands=false`; load 1/166.
- **C locus:** `mon.c` `can_carry` — `iquan>1` returns 1 only when
  `M1_NOHANDS && !glomper` (dragon gold/gems / AT_ENGL exceptions);
  otherwise weight-check then return full `iquan`.
- **Cause:** JS `can_carry` always `return 1` for any stack, so hands
  gnomes split every multi-quan gem and burned `next_ident` while C
  took the whole stack with no RNG.
- **Fix:** port C quan/nohands/glomper/peaceful/boulder/nymph/weight
  order in `js/monmove.js` `can_carry`; export `M1_NOTAKE`.
- **Verification:** seed0030 prefix **14151→14231**; positional
  **14536**/105529 Scr **168**/1953; full **15/44** Scr **1405** RNG
  **135986**; green+cohort+strict PASS.
- **Named omissions:** huge-quan `rn2(LARGEST_INT)` clamp; `can_touch_safely`
  petrify/silver/artifact; dogmove.js still uses simplified quan→1
  (pets are nohands — coincidentally OK).
- **Next:** seed0030 @14231 (`hitum`/`exercise` vs `rn2(5)`); or
  seed0101 Scr / seed0200 @3382.

## D-0187 — weapon_hit_bonus + martial barehands (seed0030 @14231)

- **Status:** fixed
- **Observed:** seed0030 @14231 — C `rn2(19)` `@exercise` after `hitum`
  `rnd(20)=13`; JS `rn2(5)` `@distfleeck`. seed0200 @3383 after the
  hit-bonus fix: C `rnd(4)` barehands vs JS `rnd(2)`.
- **Cause:** JS `find_roll_to_hit` stubbed `weapon_hit_bonus`→0. C
  `weapon_type(NULL)`→`P_BARE_HANDED_COMBAT`; unskilled non-martial
  bonus is **+1**, so `tmp > 13` and C hits→`exercise`/`hmon` while JS
  misses. Separately, `hmon_hitmon_barehands` uses
  `rnd(!martial_bonus() ? 2 : 4)` — Monk/Samurai need `rnd(4)`.
- **C locus:** `weapon.c` `weapon_hit_bonus` / `weapon_type` /
  `martial_bonus`; `uhitm.c` `find_roll_to_hit` / `hmon_hitmon_barehands`.
- **Fix:** port `weapon_hit_bonus` (weapon / two-weapon / bare-hand /
  riding) in `js/weapon.js`; wire into `find_roll_to_hit`; barehands
  `rnd(martial_bonus() ? 4 : 2)`.
- **Verification:** seed0030 prefix **14231→14235** (`passive`);
  positional **14586**/105529; seed0200 prefix **3382→3387**
  (`xkilled`/`next_ident`); full **15/44** Scr **1405** RNG
  **136046**; green+cohort+strict PASS.
- **Named omissions:** `hitval` silver/artifact/`spec_abon`;
  `weapon_dam_bonus`/`dbon` in `hmon`; `passive` body; Cleaver /
  twoweapon / `double_punch`.
- **Next:** seed0030 @14235 `passive` `rn2(3)`; or seed0200 @3387
  `xkilled` corpse/`next_ident`; or seed0101 Scr.

## D-0188 — hitum `passive` live rn2(3) (seed0030 @14235)

- **Status:** fixed
- **Observed:** seed0030 @14235 — C `rn2(3)` `@passive(uhitm.c:6019)`
  after live `hmon`; JS `rn2(5)` `@distfleeck`.
- **Cause:** JS `hitum` never called `passive`. C always calls
  `passive(mon, uwep, mhit, malive, AT_WEAP, …)` after `known_hitum`.
  First AT_NONE slot (often a NO_ATTK filler) still takes the live gate
  `malive && !mcan && rn2(3)` even when `damn=damd=0` and the adtyp
  switch is `default`.
- **C locus:** `uhitm.c` `hitum` / `passive` / `passive_obj`.
- **Fix:** port `passive` + `passive_obj` (RNG-faithful; erosion /
  gaze / split_mon bodies named omissions) and wire into `hitum`.
- **Verification:** seed0030 prefix **14235→14296** (`dmgval`);
  positional **14565**/105529 Scr **168**/1953; full **15/44** Scr
  **1405** RNG **136012**; green+cohort+strict PASS; seed0200 still
  **3387**.
- **Named omissions:** full AD_PLYS gaze/cube; `ugolemeffects` /
  `split_mon` / `erode_obj`/`erode_armor`/`drain_item` bodies;
  `done_in_by` stone; `attk_protection`; dokick/`hmon` poly-form
  `passive` callers; `s_suffix`/`hliquid` splash wording.
- **Next:** seed0030 @14296 `dmgval` `rnd(2)` vs `rnd(1)`; or
  seed0200 @3387 `xkilled`/`next_ident`; or seed0101 Scr.

## D-0189 — extract oc_wsdam / dmgval (seed0030 @14296)

- **Status:** fixed
- **Observed:** seed0030 @14296 — C `rnd(2)` `@dmgval(weapon.c:265)`; JS
  `rnd(1)` (stand-in default).
- **Cause:** `extract-objects.py` already read C `oc_wsdam`/`oc_wldam` in
  the dump struct but never emitted them. JS `dmgval` used a partial
  name→sdam map that defaulted missing otyps (BULLWHIP/WORM_TOOTH/
  grappling hook, …) to **1**.
- **C locus:** `objects.h` WEAPON/WEPTOOL/PROJECTILE/ROCK `sdam`/`ldam`;
  `weapon.c` `dmgval`.
- **Fix:** emit `oc_wsdam`/`oc_wldam` from the extractor; regenerate
  `objects_data.js`; rewrite `dmgval` to use extracted dice + small-
  monster otyp switch (`+1` / `rnd(4)` / `rnd(6)`); drop the stand-in map.
- **Verification:** seed0030 prefix **14296→14299** (`can_make_bones` vs
  JS `rn2(5)`); positional **14572**/105529 Scr **168**/1953; full
  **15/44** Scr **1405** RNG **136019**; green+cohort+strict PASS;
  seed0200 still **3387**.
- **Named omissions:** large-monster otyp switch (`d(2,4)`/`d(2,6)`…);
  thick-skin/shade/silver/blessed/axe/artifact_light bonuses; heavy iron
  ball weight; `special_dmgval`; hero death/`done`/`can_make_bones` after
  killing blow (next peel @14299).
- **Next:** seed0030 @14299 hero death vs survival after matched `dmgval`;
  or seed0200 @3387 `xkilled`/`next_ident`; or seed0101 Scr.

## D-0190 — mdamageu → done_in_by / can_make_bones (seed0030 @14299)

- **Status:** fixed
- **Observed:** seed0030 index **14299** — C `rn2(1)=0 @ can_make_bones`
  after matched knockback; JS `rn2(5)` (`distfleeck`) while hero kept
  fighting.
- **C locus:** `mhitu.c` `mdamageu` → `done_in_by` → `done` →
  `really_done` → `bones.c` `can_make_bones` depth `rn2(1+(depth>>2))`.
- **Cause/evidence:** DIAG — fatal blow `n=8` with `uhp_before=4` at
  idx 14299; JS `mdamageu` routed through `losehp` (gameover only, no
  bones RNG) and `runSegment` kept driving `moveloop_core` past death.
- **Change:** new `js/end.js` (`can_make_bones` / `done_in_by` / `done` /
  `really_done` stub); `mdamageu` matches C HP subtract + `done_in_by`;
  gameover stops `movemon` / `moveloop_core` / `runSegment`.
- **Verification:** seed0030 seg0 RNG **complete** (prefix **14300**,
  JS emitted 14300; next C line is seg1 `randomize_gem_colors`);
  positional **15844**/105529 Scr **44**/1953 (Scr drop = lost
  post-death accidental matches in seg0); full **15/44** Scr **1281**
  RNG **137291**; green+cohort+strict PASS; seed0200 still **3387**.
- **Named omissions:** full `no_bones_level` / portal ban / `savebones`
  body; Lifesaved; wizard·discover `Die?`; disclosure / topten / rip;
  `losehp`→`done(DIED)` path; killer/`ugrave_arise` detail.
- **Next:** seed0200 @3387 `xkilled`/`next_ident`; or seed0030 multi-
  segment / disclosure Scr; or seed0101 Scr residual.

## D-0191 — xkilled → make_corpse when corpse_chance (seed0200 @3387)

- **Status:** fixed
- **Observed:** seed0200 index **3387** — after matched
  `xkilled`/`corpse_chance` (`rn2(6)=3`, `rn2(2)=0`), C
  `rnd(2)=2 @ next_ident(mkobj.c:521)`; JS `rn2(12)`.
- **C locus:** `mon.c` `xkilled` → `corpse_chance` → `make_corpse` →
  `mkcorpstat`/`mksobj` `next_ident`.
- **Cause/evidence:** JS `xkilled` burned `corpse_chance` but never
  called `make_corpse` (comment said deferred). Treasure `!rn2(6)` was
  false here (`=3`); corpse chance succeeded → C created ordinary
  corpse via existing `make_corpse` default_1 path.
- **Change:** export `make_corpse` from `js/mhitm.js`; `js/uhitm.js`
  `xkilled` calls it when `corpse_chance` returns true.
- **Verification:** seed0200 prefix **3387→3547** (`distfleeck` vs
  JS `rn2(2)`); positional **3574**/3822 Scr **22**/40; full **15/44**
  Scr **1288** RNG **137724**; green+cohort+strict PASS.
- **Named omissions:** `mkobj(RANDOM_CLASS)` treasure body;
  `LEVEL_SPECIFIC_NOCORPSE`; `accessible`/`is_pool` gate; wasinside/
  burycorpse/zombify; murder/peaceful luck `rn2`; dragon/unicorn/golem
  corpse specials (shared with mhitm/trap `make_corpse`).
- **Next:** seed0200 @3547 `distfleeck`; or seed0030 disclosure·seg1;
  or seed0101 Scr residual.

## D-0192 — `,` / dopickup unbound (seed0200 @3547)

- **Status:** fixed
- **Observed:** seed0200 index **3547** — after matched EOT
  (`u_calc_moveamt` Fast `rn2(3)`, dosounds, gethungry, wipe_engr),
  C `rn2(5) @ distfleeck`; JS `rn2(2)`.
- **C locus:** `cmd.c` `,` → `dopickup`; `hack.c` `dopickup`/
  `pickup_checks`; `pickup.c` `pickup` / `pickup_object` /
  `pick_obj` (menu `AUTOSELECT_SINGLE`).
- **Cause/evidence:** Stack at mismatch was
  `exercise`←`kick_dumb`←`dokick` (Ctrl-D). `nhgetch` trace: after EOT,
  JS consumed `,`/`e`/`k`/spaces as zero-time (`,` was **Unknown
  command** `move=0`) then hit Ctrl-D kick. C's `,` step RNG is only
  monster/EOT after a timed `dopickup` (one floor object,
  AUTOSELECT_SINGLE — no menu keys). Not a fleeck/APPORT bug.
- **Change:** `js/pickup.js` `dopickup`/`pickup_checks`/`pickup_object`/
  `pick_obj`; manual `pickup(0)` one-object AUTOSELECT; `js/cmd.js`
  `,` → `dopickup`.
- **Verification:** seed0200 prefix **3547→3565** (`eatcorpse`);
  positional **3578**/3822 Scr **24**/40; full **15/44** Scr **1290**
  RNG **138575**; green+cohort+strict PASS.
- **Named omissions:** multi-object `query_objlist`/traditional yn;
  `lift_object` carry_count; shop bill; SCR_SCARE/CORPSE fatal;
  LOADSTONE no-split; furniture-specific nothing messages; engulfer
  loot_mon; encumbrance `pickup_prinv` prefixes.
- **Next:** seed0200 @3565 `eatcorpse`; or seed0030 disclosure·seg1;
  or seed0101 Scr residual.

## D-0193 — eatcorpse / CORPSE doeat (seed0200 @3565)

- **Status:** fixed
- **Observed:** seed0200 index **3565** — after matched EOT, C
  `rn2(20) @ eatcorpse`; JS `rn2(2)` (kick/`exercise` after refuse).
- **C locus:** `eat.c` `doeat` → `touchfood` → `eatcorpse` →
  `start_eating` / `eatfood` occupation; `mondata.h` vegan/vegetarian/
  carnivorous; `hack.c` `rounddiv`; `monsters.h` SIZ `cwt`/`cnutrit`.
- **Cause/evidence:** JS rejected CORPSE with "not implemented" (return
  0) after getobj `e`+`k`, then raced to Ctrl-D. C ate invent goblin
  corpse: rotting `rn2(20)`, `!rn2(7)` skip rotten, palatable path
  (Monk `youmonst` not carnivorous → no `rn2(10)`), `rn2(5)` taste
  index, then multi-turn occupation.
- **Change:** `js/eat.js` `eatcorpse`/`start_eating`/`eatfood`/
  `done_eating`/`bite`; CORPSE in `doeat`; `allmain.js` await
  occupation; extract `cwts`/`cnutrits` + mondata vegan/vegetarian/
  acidic/poisonous/carnivorous/herbivorous; `dogmove` uses extracted
  cwt/cnutrit.
- **Verification:** seed0200 RNG **3822**/3822 Scr **39**/40; full
  **15/44** Scr **1305** RNG **138545**; green+cohort+strict PASS.
- **Named omissions:** floorfood floor; TIN; full `cprefx`/`cpostfx`;
  tainted `make_sick`; `poison_strdmg`; slime/stone; `rottenfood`
  confuse/blind/faint bodies; freeinv invent-full drop; `?`/`*` menu;
  `oc_nutrition` extract.
- **Next:** seed0200 Scr residual / seed0030 disclosure·seg1 /
  seed0101 Scr.

## D-0194 — empty_handed + weapon_insight skill lines (seed0200 Scr)

- **Status:** fixed
- **Observed:** seed0200 Scr **39**/40 (RNG full) — ^X attributes page
  row: JS `You are bare handed.` / `You are unskilled in bare handed
  combat.` vs C `You are empty handed.` / `You have basic skill with
  martial arts.` NOTES guilty+taste topline join **falsified**.
- **C locus:** `wield.c` `empty_handed`; `insight.c` `weapon_insight`;
  `weapon.c` `P_NAME`/`skill_level_name`/`martial_bonus`; `skill_init`
  sets Monk bare-hand to `P_BASIC` when max > Expert.
- **Cause/evidence:** invent enlightenment hardcoded bare-handed/
  unskilled; Monk wears LEATHER_GLOVES → C `uarmg` ⇒ "empty handed";
  `martial_bonus` + `P_BASIC` ⇒ "have basic skill with martial arts."
- **Change:** `js/wield.js` `empty_handed` (+ ready/quiver callers);
  `js/invent.js` weapon_insight from real `P_SKILL`/`skill_name`
  (martial); `js/monsters.js` `M1_HUMANOID`/`humanoid`.
- **Verification:** seed0200 **PASS**; green+strict+cohort PASS; full
  **16/44** Scr **1306**/11405 RNG **138545**/792838.
- **Named omissions:** twoweap skill-comparison branch; `can_advance`
  enhance suffix; ammo-as-uwep skip; odd-skill P_NAME beyond martial;
  full `set_uasmon` youmonst.data (missing data → humanoid start).
- **Next:** seed0030 disclosure·seg1 / seed0101 Scr / seed0103
  `next_ident`.

## D-0195 — NHW_MENU flush NEED_MORE + mark_topline NON_EMPTY (seed0101 Scr)

- **Status:** fixed
- **Observed:** seed0101 Scr **21**/27 (RNG full) — screen 10 C
  `Where do you want to travel to?--More--` vs JS tip menu already
  painted; subsequent tip frames desynced (E/- eaten as getpos dirs).
- **C locus:** `win/tty/wintty.c` `tty_display_nhwindow(NHW_MENU)`
  flushes `TOPLINE_NEED_MORE` via `tty_display_nhwindow(WIN_MESSAGE)`
  before corner paint; `tty_nhgetch` marks `NEED_MORE`→`NON_EMPTY`
  (not EMPTY).
- **Cause/evidence:** After hand-throw pline, `_` travel pline sets
  NEED_MORE; getpos tip NHW_MENU must `more()` that message first.
  JS `paint_corner_nhw_menu` painted tip without flushing; also
  `mark_topline_seen` wrongly cleared to EMPTY.
- **Change:** `js/invent.js` `paint_corner_nhw_menu` +
  `select_menu_pick_none` await `flush_topl_more`; `js/display.js`
  `mark_topline_seen` → `TOPLINE_NON_EMPTY`.
- **Verification:** seed0101 **PASS** (RNG 2371/2371 Scr 27/27);
  green+strict+cohort PASS; full **17/44** Scr **1312**/11405 RNG
  **138545**/792838.
- **Named omissions:** full `update_topl` NON_EMPTY `cury`/docorner;
  other NHW_MENU fullscreen paths beyond pick_none/corner; pline
  NON_EMPTY append policy beyond NEED_MORE.
- **Next:** seed0030 disclosure·seg1 / seed0103 `next_ident` /
  quest `makemaz`.

## D-0196 — CANDY_BAR assign_candy_wrapper (seed0030 seg1 @1238)

- **Status:** fixed
- **Observed:** seed0030 seg1 first mismatch @1238 — C
  `rn2(12) @ assign_candy_wrapper` vs JS `rn2(6)` (quan gate).
- **C locus:** `read.c` `assign_candy_wrapper` (`spe = 1 +
  rn2(SIZE(candy_wrappers)-1)`); `mkobj.c` `mksobj_init` FOOD
  `CANDY_BAR` case before post-switch quan `!rn2(6)`.
- **Cause/evidence:** JS FOOD_CLASS omitted `CANDY_BAR`, so the next
  call was the shared quan `rn2(6)` while C burned wrapper `rn2(12)`
  first. Seg1 isolated prefix **1238→3347**.
- **Change:** `js/mkobj.js` — `assign_candy_wrapper` + `CANDY_BAR`
  branch; `SLIME_MOLD` spe from `current_fruit` when present (fruit
  chain still deferred).
- **Verification:** seed0030 positional **17994**/105529 Scr **44**/1953;
  seg1 prefix **3347**/7640; green+strict+cohort PASS; full **17/44**
  Scr **1312**/11405 RNG **140933**/792838.
- **Named omissions:** fruit `ffruit`/`current_fruit` init + slime-mold
  naming; candy wrapper *text* for `doread`; other FOOD specials
  (pudding globby beyond GLOB_ name skip).
- **Next:** seed0030 seg1 @3347 `dog_goal` vs JS `obj_resists`; or
  seed0103 `next_ident`/`trquan`.


## D-0197 — dogfood CORPSE vegan/lichen → MANFOOD (seed0030 seg1 @3347)

- **Status:** fixed
- **Observed:** seed0030 seg1 first mismatch @3347 — C `rn2(8) @ dog_goal`
  vs JS `rn2(100) @ obj_resists`.
- **C locus:** `dog.c` `dogfood` CORPSE: after age/acid/poison gates,
  `vegan(fptr)` → `herbi ? CADAVER : MANFOOD`; lichen is `S_FUNGUS`/vegan.
  `dogmove.c` `dog_goal` APPORT branch rolls `rn2(8)` only when
  `otyp >= MANFOOD` and `gtyp == UNDEF`.
- **Cause/evidence:** DIAG at pet (38,5): floor lichen CORPSE → JS
  `CADAVER` (hardcoded carni path) set food goal; C returned `MANFOOD`
  so APPORT `rn2(8)` fired, then continued scanning. JS never rolled
  `rn2(8)` and burned a second `obj_resists` on the next object.
- **Change:** `js/dogmove.js` `dogfood` — real `carnivorous`/`herbivorous`;
  CORPSE age poison skips lizard/lichen/fungus-pet; acidic/poisonous →
  POISON; vegan → MANFOOD for non-herbi pets. Deferred: `resists_*`,
  polyfood, cannibalism, rider/petrify.
- **Verification:** seg1 prefix **3347→3466**; seed0030 positional
  **18139**/105529 Scr **44**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1312**/11405 RNG **140894**/792838.
- **Named omissions:** `resists_poison`/`resists_acid`; `polyfood`;
  humanoid cannibalism; rider/petrify CORPSE; iced `peek_at_iced_corpse_age`.
- **Next:** seed0030 seg1 @3466 `mhitm_mgc_atk_negated`; or seed0103
  `next_ident`/`trquan`.

## D-0198 — `mhitm_mgc_atk_negated` + AD_ELEC `hitmu` (2026-07-13)

- **Symptom:** seed0030 seg1 @3466 C `rn2(10) @ mhitm_mgc_atk_negated`
  vs JS `rn2(3)` (knockback). Screen: "The grid bug bites!  You get
  zapped!"
- **Rejected:** missing passive `rn2(3)` after PHYS hit — C never
  reaches knockback until after `mhitm_ad_elec`.
- **Cause/evidence:** JS `hitmu` only called `mhitm_ad_phys_u`; C
  `hitmu`→`mhitm_adtyping`→`mhitm_ad_elec` (mhitu): `hitmsg`, then
  `mhitm_mgc_atk_negated` (`rn2(10)` vs `3*armpro`), then destroy_items
  gate `m_lev > rn2(20)`.
- **Change:** `js/mhitm.js` `mhitm_mgc_atk_negated` + hero
  `magic_negation` armor `a_can` subset; `js/mhitu.js`
  `mhitm_adtyping_u` (PHYS+ELEC) + `mhitm_ad_elec_u`; `hitmu` wired.
- **Verification:** seg1 prefix **3466→3497**; seed0030 positional
  **18080**/105529 Scr **44**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1312**/11405 RNG **141570**/792838.
- **Named omissions:** `destroy_items` body when gate passes; monster
  defender `magic_negation`; Protection/amulet MC bumps; other
  `mhitm_ad_*` (FIRE/COLD/ACID/…); `monstseesu`/`monstunseesu`;
  uhitm/mhitm elec branches.
- **Next:** seed0030 seg1 @3497 C `m_move` vs JS `mattacku` (position);
  or seed0103 `next_ident`/`trquan`.

## D-0199 — `monnear` NODIAG diagonal (seed0030 seg1 @3497)

- **Symptom:** seed0030 seg1 @3497 C `rn2(12) @ m_move` vs JS
  `rnd(20) @ mattacku` after grid-bug zap (D-0198).
- **Rejected:** hero/mux coordinate drift or wrong actor order — DIAG
  showed same grid bug (mid73) diagonal to hero in JS; C end screens
  also show diagonal adjacency after `l`.
- **Cause/evidence:** C `mon.c` `monnear`: `dist2==2 && NODIAG` → 0 so
  grid bugs are not "nearby" on diagonals → `dochug` `want_move` →
  `m_move`. JS `monnear` used `distmin<=1` (diagonal counts) → attack.
- **Change:** `js/mon.js` `monnear` matches C (`dist2<3` + NODIAG
  diagonal reject).
- **Verification:** seg1 prefix **3497→3870**; seed0030 positional
  **18437**/105529 Scr **44**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1312**/11405 RNG **141923**/792838.
- **Named omissions:** none new for `monnear`; themerms descend peel
  next.
- **Next:** seed0030 seg1 @3870 themerms.lua `room`/`nh.rn2`; or
  seed0103 `next_ident`/`trquan`.

## D-0200 — Default themed-fill + Storeroom + set_mimic_sym (seed0030 seg1 @3870)

- **Symptom:** seed0030 seg1 @3870 C `rn2(1) @ themerms.lua:1039
  themeroom_fill` vs JS `rn2(3)` after matching `create_room`.
- **Rejected:** wrong create_room args / next-room nhlib reservoir —
  C reservoir pick was "Default room with themed fill"; fill pick
  Storeroom (diff<4).
- **Cause/evidence:** JS `themerooms_generate` always `create_room(OROOM)`
  + `needfill=FILL_NORMAL` and never called `themeroom_fill` for
  rectangular themed-fill rooms. C `des.room({type="themed", contents=
  themeroom_fill})` → THEMEROOM + fill reservoir + Storeroom
  `selection.room():percentage(30)` + chest/mimic.
- **Change:** `js/mklev.js` — Default/Unlit/Both themed-fill rooms use
  THEMEROOM + `themeroom_fill`; Storeroom body + `selection_filter_percent`;
  mimic-as-chest via `mkclass(S_MIMIC)`/`enexto`/`appear_as`. `js/makemon.js`
  — `set_mimic_sym` on `S_MIMIC` (ordinary ROLL_FROM path; shop/maze arms
  stubbed).
- **Verification:** seg1 prefix **3870→5220** (`mkshop`); seed0030
  positional **19786**/105529 Scr **45**/1953; green+strict+cohort PASS;
  full **17/44** Scr **1313**/11405 RNG **142362**/792838.
- **Named omissions:** other themerms fill bodies (Ice/Trap/Spider/…);
  Fake Delphi/Pillars/nested `des.room`; shop `get_shop_item` in
  `set_mimic_sym`; maze/sokoban/town mimic arms; altar MCORPSENM.
- **Next:** seed0030 seg1 @5220 `mkshop`; or seed0103 `next_ident`/`trquan`.

## D-0201 — mkshop eligibility + shtypes rnd(100) (seed0030 seg1 @5220)

- **Symptom:** seed0030 seg1 @5220 C `rnd(100)=65 @ mkshop` vs JS
  `rn2(7)` (fillable-room countdown still counted the shop room).
- **Rejected:** stock_room-first — C next call after type pick is
  `rn2(fillable)` at makelevel:1402; stocking is later (~5399).
- **Cause/evidence:** JS `mkshop` skipped eligible rooms without burning
  `rnd(100)` or setting `rtype`/`needfill`, so the room stayed
  ROOM_IS_FILLABLE and the countdown used `rn2(7)` vs C `rn2(6)`.
- **Change:** `js/mklev.js` — `isbig`/`has_*stairs`/`invalid_shop_shape`/
  full non-wizard `mkshop` (light, shtypes pick, `rtype`, `topologize`,
  `needfill`). `js/shknam.js` — `shtypes[]` name/symb/prob for type pick.
  `fill_special_room` early-returns on shop rtype pending `stock_room`.
- **Verification:** seg1 prefix **5220→5255** (`find_random_launch_coord`);
  seed0030 positional **19751**/105529 Scr **44**/1953; green+strict+
  cohort PASS; full **17/44** Scr **1312**/11405 RNG **142327**/792838.
- **Named omissions:** `stock_room`/`shkinit`/`mkshobj_at`/`get_shop_item`;
  shtypes iprobs/shknms; wizard SHOPTYPE; COURT/ZOO/… `do_mkroom` bodies.
- **Next:** seed0030 seg1 @5255 `find_random_launch_coord`/`mktrap`; or
  seed0103 `next_ident`/`trquan`.

## D-0202 — maketrap ROLLING_BOULDER mkroll_launch (seed0030 seg1 @5255)

- **Symptom:** seed0030 seg1 @5255 C `rn2(5)=1 @ find_random_launch_coord`
  vs JS `rnd(4)` (mktrap victim gate).
- **Rejected:** arrow/dart launch setup — traptype was `rnd(25)=7`
  (`ROLLING_BOULDER_TRAP`); C only calls `mkroll_launch` from that
  `maketrap` case.
- **Cause/evidence:** JS `maketrap` omitted `ROLLING_BOULDER_TRAP` →
  `mkroll_launch` → `find_random_launch_coord` (`rn1(5,4)` / `rn2(8)` /
  `isclearpath`), so victim `rnd(4)` ran immediately.
- **Change:** `js/trap.js` — `isclearpath`, `find_random_launch_coord`,
  `mkroll_launch`; `maketrap` calls `mkroll_launch(…, BOULDER, 1)` for
  rolling boulder; `launch2` field on trap.
- **Verification:** seg1 prefix **5255→5381** (`shkinit`/`makemon`
  shopkeeper); seed0030 positional **19890**/105529 Scr **45**/1953;
  green+strict+cohort PASS; full **17/44** Scr **1313**/11405 RNG
  **142466**/792838.
- **Named omissions:** drawbridge-under pool/lava in `is_pool_or_lava`;
  full `linedup` couldsee for launchplace; `launch_obj` trigger;
  STATUE_TRAP living statue; pit shop/terrain morph; Sokoban finish.
- **Next:** seed0030 seg1 @5381 `shkinit`/`stock_room`/`mkshobj_at`; or
  seed0103 `next_ident`/`trquan`.

## D-0203 — stock_room / shkinit / mkshobj_at (seed0030 seg1 @5381)

- **Symptom:** seed0030 seg1 @5381 C `rnd(2)=2 @ next_ident` (shopkeeper
  `makemon`) vs JS `rn2(200)` mineralize.
- **Rejected:** vault/mineralize order alone — C already filled vault gold
  earlier; @5381 is `fill_special_room` shop → `stock_room`→`shkinit`.
- **Cause/evidence:** JS `fill_special_room` returned early for
  `rtype >= SHOPBASE` without calling `stock_room`, so mklev jumped to
  mineralize while C created `PM_SHOPKEEPER` (`MM_ESHK`), shopkeeper
  `m_initinv`, `mkmonmoney`, tribute novel spot, and `mkshobj_at` stock.
- **Change:** `js/shknam.js` — shtypes iprobs/shknms, `get_shop_item`,
  `shkinit`/`stock_room`/`mkshobj_at`/`nameshk`/`good_shopdoor`;
  `js/makemon.js` — `neweshk`/`MM_ESHK`, shopkeeper `m_initinv`,
  `rnd_misc_item`, export `mkmonmoney`; `js/mkobj.js` — `SPE_NOVEL`
  `noveltitle`; `js/mklev.js` — `fill_special_room`→`stock_room`;
  `js/allmain.js` — `context.tribute.enabled`.
- **Verification:** seg1 prefix **5381→6561** (`dosounds`); seed0030
  positional **21235**/105529 Scr **45**/1953; green+strict+cohort PASS;
  full **17/44** Scr **1313**/11405 RNG **143811**/792838.
- **Named omissions:** `shkveg`/`mkveggy_at`; Izchak minetown light-shk;
  platform ifdef `shktools` names; Orcus `mongone`; wizard SHOPTYPE;
  `rnd_defensive_item` body; irregular-shop edge cases; full `rloc`.
- **Next:** seed0030 seg1 @6561 `dosounds`; or seed0103
  `next_ident`/`trquan`.

## D-0204 — dosounds has_shop / feature gates (seed0030 seg1 @6561)

- **Symptom:** seed0030 seg1 @6561 C `rn2(200)=59 @ dosounds(sounds.c:313)`
  (`has_shop`) vs JS `rn2(20)` `gethungry`.
- **Rejected:** vault/mineralize order; treating 6561 as a fleeck arity bug
  (6560 already matched vault `rn2(200)` @ sounds.c:238).
- **Cause/evidence:** After D-0203 set `has_shop`, C `dosounds` rolls
  beehive/morgue/barracks/zoo/shop/temple/oracle gates after vault. JS
  `dosounds` stopped after vault, so `gethungry`'s `rn2(20)` landed where
  C burned shop `rn2(200)`.
- **Change:** moved/expanded `dosounds` into `js/sounds.js` — full feature
  gate order; shop body `search_special(ANY_SHOP)`/`tended_shop`/`rn2(2)`/
  `noisy_shop`; mon_sound helpers RNG-only when match; `is_undead` in
  `monsters.js`; `allmain.js` imports `dosounds`.
- **Verification:** seg1 prefix **6561→6565** (`distfleeck`); seed0030
  positional **21192**/105529 Scr **45**/1953; green+strict+cohort PASS;
  full **17/44** Scr **1313**/11405 RNG **143768**/792838.
- **Named omissions:** You_hear plines; `gd_sound` vault body; vampshifter
  morgue; temple_priest body; oracle `canseemon`; `Is_sanctum`; Hallu
  message index offsets; full `in_rooms` for `inhishop`.
- **Next:** seed0030 seg1 @6565 `distfleeck` C `rn2(5)` vs JS `rn2(10)`;
  or seed0103 `next_ident`/`trquan`.

## D-0205 — shk_move before getitems (seed0030 seg1 @6565)

- **Symptom:** seed0030 seg1 @6565 C `rn2(5)=4 @ distfleeck` vs JS
  `rn2(10)=4` at `m_move` getitems peaceful gate.
- **Rejected:** fleeck arity/actor-order alone; treating rn2(10) as
  `dog_goal` apport or `mhitm_mgc_atk_negated` (stack was monmove:815
  getitems); meating early-return (shopkeeper `meating==0`).
- **Cause/evidence:** After first fleeck, C `m_move` routes `isshk` through
  `shk_move` (peaceful near home → return 0, no RNG) then second fleeck.
  JS fell through to normal AI and burned peaceful `!rn2(10)` getitems.
  DIAG: mnum=271 PM_SHOPKEEPER @ (76,7), mpeaceful=1, isshk set by
  `shkinit`.
- **Change:** new `js/shk.js` — `shk_move` / `move_special` / `inhishop` /
  `online2` (hacklib); `m_move` dispatches isshk/isgd/ispriest before
  normal AI; `gd_move`/`pri_move` stubs return 0.
- **Verification:** seg1 prefix **6565→6568** (C `mcalcmove` vs JS next
  ant fleeck); seed0030 positional **21198**/105529 Scr **45**/1953;
  green+strict+cohort PASS; full **17/44** Scr **1313** RNG **143774**.
- **Named omissions:** `shk_fixes_damage`; holetime dig follow; following
  verbalize/`rile_shk`; `resist_conflict`/`m_canseeu`; Fast+sobj_at
  doorway; `m_break_boulder`/`m_move_aggress`; `after_shk_move` bill_p;
  `gd_move` body; `pri_move` altar `rn1` mill.
- **Next:** seed0030 seg1 @6568 C `mcalcmove` vs JS extra hostile fleeck
  (movement rations / which ants still have `movement>=NORMAL_SPEED`);
  or seed0103 `next_ident`/`trquan`.

## D-0206 — movemon_singlemon hider skip dochug (seed0030 seg1 @6568)

- **Symptom:** seed0030 seg1 @6568 C `rn2(12) @ mcalcmove` vs JS
  `rn2(5) @ distfleeck` — JS still in monster pass after C entered EOT.
- **Rejected:** leftover ant movement allotment / wrong mcalcmove assignment
  to shopkeeper (fmon order); DIAG showed shk mmove=16 correctly got +24
  from first rn2(12)=2, leftovers before EOT were 0.
- **Cause/evidence:** C `movemon_singlemon` deducts NORMAL_SPEED then, for
  `is_hider` with `M_AP_OBJECT`/`M_AP_FURNITURE` (or `mundetected`), returns
  without `dochugw`. Storeroom mimics appear as objects (mappearance 215).
  C: only shopkeeper dochugs — two passes × two fleecks = 4 fleecks then
  EOT. JS: dochug'd mimics too → extra fleecks while C already at
  mcalcmove.
- **Change:** `js/monsters.js` `M1_HIDE`/`is_hider`; `js/mon.js`
  `movemon_singlemon` hider gate after movement deduct.
- **Verification:** seg1 prefix **6568→7007** (`next_ident` vs JS
  `rn2(20)`); seed0030 positional **21693**/105529 Scr **45**/1953;
  green+strict+cohort PASS; full **17/44** Scr **1313** RNG **144269**.
- **Named omissions:** `restrap` body (`rn2(3)` re-hide); eel
  `hideunder`; `minliquid` before dochug; equipping `I_SPECIAL`;
  Conflict `fightm`; `m_everyturn_effect`.
- **Next:** seed0030 seg1 @7007 C `next_ident` vs JS `rn2(20)`; or
  seed0103 `next_ident`/`trquan`.


## D-0207 — stumble_onto_mimic / object_from_map next_ident (seed0030 seg1 @7007)

- **Symptom:** seed0030 seg1 @7007 C `rnd(2) @ next_ident` vs JS
  `rn2(20) @ gethungry` — after matched EOT wipe gate; step key `n`,
  topline "That chest is a small mimic!".
- **Rejected:** missing EOT spawn/`u_wipe_engr` after matched
  `rn2(76)`; umovement loop divergence alone (JS umov==12 correctly
  took hero input).
- **Cause/evidence:** C `do_attack`→`attack_checks` sees `M_AP_TYPE`
  and calls `stumble_onto_mimic`→`that_is_a_mimic`→`object_from_map`→
  `mksobj(otyp,FALSE,FALSE)`→`next_ident` **before** `overexertion`.
  JS skipped mimic stumble and burned accessorytime `rn2(20)`.
- **Change:** `js/mon.js` `seemimic`/`wakeup`; `js/uhitm.js`
  `that_is_a_mimic`/`stumble_onto_mimic`/`attack_checks_mimic` wired
  ahead of `overexertion` in `do_attack`.
- **Verification:** seg1 prefix **7007→7189** (`dosounds` vault
  `gd_sound` `rn2(2)`); seed0030 positional **21760**/105529 Scr
  **45**/1953; green+strict+cohort PASS; full **17/44** Scr **1313**
  RNG **144336**.
- **Named omissions:** Blind/hallu/`sensemon`/Protection_from_shape_changers
  / warning-glyph / invis-marker arms of `attack_checks`; furniture
  `defsyms` message; AD_STCK `set_ustuck`; `wake_msg`/`setmangry`;
  full `object_from_map` (buried/hallu/observe_object).
- **Next:** seed0030 seg1 @7189 vault `gd_sound`→`rn2(2)`; or
  seed0103 `next_ident`/`trquan`.

## D-0208 — dosounds vault gd_sound rn2(2) (seed0030 seg1 @7189)

- **Symptom:** seed0030 seg1 @7189 C `rn2(2) @ dosounds(sounds.c:245)`
  vs JS continuing without the vault message roll after matched
  `has_vault && !rn2(200)`.
- **Rejected:** missing shop/`gethungry` after vault gate; beehive
  order drift (vault branch `return`s in C).
- **Cause/evidence:** C vault gate calls `search_special(VAULT)` then
  `gd_sound()` (`!(vault_occupied(urooms)||findgd())`) and, when true,
  `switch (rn2(2)+hallu)` before return. JS early-returned on the gate
  without burning `rn2(2)`.
- **Change:** `js/sounds.js` — `vault_occupied`/`findgd`/`gd_sound` +
  vault body `search_special`+`gd_sound`→`rn2(2)+hallu` (You_hear /
  gold_in_vault plines deferred).
- **Verification:** seg1 **7189→7640/7640 FULL**; seg2 continuous
  **1272**/6221 (`somey`); seed0030 positional **24164**/105529 Scr
  **45**/1953; green+strict+cohort PASS; full **17/44** Scr **1313**
  RNG **146740**.
- **Named omissions:** You_hear vault plines; gold_in_vault scan;
  `urooms` maintenance for `vault_occupied`; `findgd` migrating_mons
  park-at-`<0,0>`; fountain/sink Hallu index still deferred.
- **Next:** seed0030 seg2 @1272 `somey`/`create_room`; or seed0103
  `next_ident`/`trquan`.

## D-0209 — make_grave get_rnd_text(EPITAPHFILE) (seed0030 seg2 @1272)

- **Symptom:** seed0030 seg2 @1272 C `rn2(24075) @ somey(mkroom.c:674)`
  vs JS `rn2(3)` — right after matched `mkgrave` `dobell=!rn2(10)` and
  `find_okay_roompos` somex/somey.
- **Rejected:** room-height / `create_room` / `somey` arity drift — C
  provenance is the `rn2` **function pointer** passed into
  `get_rnd_text`; chunk size of pad+xcrypt epitaph buffer is exactly
  24075. JS stub `make_grave` only set `typ=GRAVE` and skipped the
  epitaph draw, so the next burn was `mkgrave`'s gold `rn2(3)`.
- **Cause/evidence:** C `engrave.c` `make_grave`: when `str` is null
  (non-bell graves), `get_rnd_text(EPITAPHFILE,buf,rn2,MD_PAD_RUMORS)`
  then `make_engr_at(...,HEADSTONE)`. Named omission from D-0148.
- **Change:** `scripts/extract-epitaph.py` →
  `js/generated/epitaph_data.js` (`EPITAPH_BUF` len 24075); `js/engrave.js`
  `make_grave`; `js/mklev.js` import + `mkgrave_room` bury/
  `level_difficulty` parity.
- **Verification:** seg2 continuous **1272→2217** (`u_init_race`
  elf `rn2(6)`); seg1 still FULL; seed0030 positional
  **24701**/105529 Scr **45**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1315** RNG **147856**.
- **Named omissions:** full `set_levltyp` beyond typ=GRAVE;
  `disturb_grave`; You_hear vault plines still deferred (D-0208).
- **Next:** seed0030 seg2 @2217 Wizard-elf `u_init_race` Instrument
  `ROLL_FROM`/`rn2(6)`; or seed0103 `next_ident`/`trquan`.

## D-0210 — elf Instrument ROLL_FROM before ini_inv/trquan (seed0030 seg2 @2217)

- **Symptom:** seed0030 seg2 @2217 C `rn2(6)=2 @ u_init_race(u_init.c:810)`
  vs JS `rn2(1)=0` — right after matched Wizard Blindfold `rn2(5)=4`.
- **Rejected:** Wizard-elf `Xtra_food` / skipped elf branch — C `Xtra_food`
  is orc-only (`!Role_if(PM_WIZARD)`); elf path only rolls Instrument
  `ROLL_FROM` then `knows_object`.
- **Cause/evidence:** C `u_init.c:810` evaluates `ROLL_FROM(trotyp)` when
  constructing the local `Instrument[]` (before `ini_inv`). C `ini_inv`
  then calls `trquan` first (`rn2(1)`). JS deferred `rn2(6)` inside lazy
  `trotyp()` after `trquan`, so order was `rn2(1)` then `rn2(6)`.
- **Change:** `js/u_init.js` `u_init_race` PM_ELF — eager
  `chosen = trotyp[rn2(trotyp.length)]` then constant `trotyp: () => chosen`.
- **Verification:** seg2 continuous **2217→2408** (`distfleeck`);
  seed0030 positional **24703**/105529 Scr **45**/1953; green+strict+
  cohort PASS (seed2200 Scr 229/230 parked RC); full **17/44** Scr
  **1315** RNG **147858**.
- **Named omissions:** none new for this path; Cleric-elf shares the same
  Instrument construction.
- **Next:** seed0030 seg2 @2408 C `distfleeck` vs JS `dog_move`; or
  seed0103 `next_ident`/`trquan`.

## D-0211 — dog_goal wantdoor / ogoal (seed0030 seg2 @2408)

- **Status:** fixed
- **Symptom:** seed0030 seg2 @2408 C `rn2(5)=3 @ distfleeck` vs JS
  `rn2(12)=7` — after six matched `dog_move` `rn2(12)`.
- **Rejected:** mfndpos skipping SW `(72,8)` / poison-gas / typ drift —
  C recorder dump: `cnt=8` including `(72,8)` empty ROOM; FORCE-omit SW
  was a lucky selection rewrite, not the cause. Gas falsified earlier.
- **Cause/evidence:** C `dog_goal` with `!couldsee(pet)` and failed
  `gettrack` reuses `edog->ogoal` or runs `do_clear_area(omx,omy,9,
  wantdoor)` (view_from off-hero) to set `gg` to the clear cell closest
  to the hero, then stores `ogoal`. JS omitted wantdoor and always fell
  back to hero → `gg=(68,6)` vs C `gg=(69,5)` → one vs two `j<0`
  accepts → 7 vs 6 selection `rn2(12)`.
- **C locus:** `dogmove.c` `dog_goal` / `wantdoor`; `vision.c`
  `do_clear_area` / `view_from` with `vis_func`.
- **Change:** `js/vision.js` `view_from` accepts `func`/`arg` and
  `mark_visible_range` dispatches to `vis_func`; export `do_clear_area`
  off-hero path. `js/dogmove.js` `dog_goal` ports wantdoor + ogoal store.
- **Verification:** seg2 **2408→2930** (`eatcorpse`); positional
  **25256**/105529 Scr **48**/1953; green+strict+cohort PASS; full
  **19/44** Scr **1433** RNG **149674**.
- **Named omissions:** pool/lava/garlic/`bad_rock` squeeze/IRONBARS in
  `mfndpos`; detect.js still has its own hero-only `do_clear_area`.
- **Next:** seed0030 seg2 @2930 `eatcorpse`; or quest `getbones`.

## D-0212 — Knight pony `put_saddle_on_mon` (seed0103 @2337)

- **Status:** fixed
- **Symptom:** seed0103 @2337 C `rnd(2) @ next_ident` vs JS `rn2(1)`
  after matched pony `makemon`/`newmonhp`.
- **Cause/evidence:** C `dog.c` `makedog` after `makemon(..., NO_MINVENT)`
  calls `put_saddle_on_mon(NULL)` for `PM_PONY` (non-pauper) →
  `mksobj(SADDLE,TRUE,FALSE)` → `next_ident` then `u_init` `trquan`.
  JS deferred the saddle (`// put_saddle_on_mon … deferred`).
- **C locus:** `dog.c` `makedog`; `steed.c` `put_saddle_on_mon` /
  `can_saddle`; `makemon.c` domestic `!rn2(100)` saddle arm.
- **Change:** new `js/steed.js` `can_saddle`/`put_saddle_on_mon`;
  `makedog` wires pony saddle; `makemon` domestic 1% calls the same
  helper. `see_monster_closeup` / `update_mon_extrinsics` /
  `doride`/`mount_steed` deferred.
- **Verification:** seed0103 prefix **2337→2440** (`mount_steed`);
  positional **2461**/2640 Scr **2**/60; seed0104 **2638**/3223;
  green+strict+cohort PASS; full **17/44** Scr **1315** RNG
  **148366**.
- **Named omissions:** `doride`/`mount_steed` body; whirly/unsolid in
  `can_saddle`; full `which_armor`; `see_monster_closeup`.
- **Next:** seed0103 @2440 `mount_steed`; or D-0211 C typ dump.

## D-0213 — Knight `#ride` / `mount_steed` (seed0103 @2440)

- **Status:** fixed
- **Symptom:** seed0103 @2440 C `rnd(20) @ mount_steed` vs JS `rn2(7)`
  after matched pony saddle (D-0212).
- **Cause/evidence:** `#ride` was autocomplete-only; no `EXT_CMDS` body.
  C `doride`→`getdir`→`mount_steed` burns `rnd(MAXULEV/2+5)` slip gate
  and on fail `rn1(5,10)` via `losehp`; success sets `u.usteed`.
  Remount EOT also needed `u.umoved=FALSE` before rhack (else steed
  `u_calc_moveamt` double-`mcalcmove`); `dog_goal` must return -2 for
  `usteed`; fatal slip must `done`→`can_make_bones`.
- **C locus:** `steed.c` `doride`/`mount_steed`/`landing_spot`/
  `dismount_steed`; `allmain.c` umoved clear; `dogmove.c` steed
  `dog_goal`/`dog_move`; `hack.c` `losehp`→`done`.
- **Change:** `js/steed.js` mount/dismount BYCHOICE + landing_spot;
  wire `#ride` in `getline.js`; `cmd.js` syncs steed coords on move;
  `allmain.js` clears `umoved`; `dogmove.js` steed early exits;
  fatal slip calls `done(DIED)`.
- **Verification:** seed0103 RNG **2640**/2640 Scr **2**/60; seed0104
  **2968**/3223; green+strict+cohort PASS; full **17/44** Scr **1316**
  RNG **148875**.
- **Named omissions:** thrown/fell dismount damage; full `test_move`
  squeeze; `float_down` body; `use_saddle`; Hallu/Wounded_legs mount
  arms; wake pline. Riding display/botl done in D-0214.
- **Next:** seed0103 Scr residual / seed0104 @2841; or D-0211 typ dump.

## D-0214 — Riding display / pet color / saddled / Ride botl

- **Status:** fixed
- **Symptom:** seed0103 RNG full but Scr **2**/60; pony `u` white vs
  C brown; mount plines `"the pony"` vs `"the saddled pony"`; no botl
  `Ride`; mounted hero stayed `@` white.
- **Cause/evidence:** JS `mon_glyph` forced `CLR_WHITE` for all
  `mtame`; C `pet_color`≡`mon_color`≡`mons[].mcolor` (pony
  `CLR_BROWN`; dogs/cats already `HI_DOMESTIC` so green hid the bug).
  `hilite_pet` only sets tty attr. C `display_self`→
  `ridden_mon_to_glyph` shows steed mlet+color. `x_monnam` prepends
  `"saddled "` when `W_SADDLE`. botl `BL_MASK_RIDE` when `u.usteed`.
  Longer `"saddled"` combat plines also force `--More--` between pet
  attacks; `monkilled` uses `nonliving`→`"destroyed"` for zombies.
- **C locus:** `display.c` `pet_color`/`map_glyphinfo`/
  `GLYPH_RIDDEN_*`; `display.h` `maybe_display_usteed`; `do_name.c`
  `x_monnam` saddle adj; `botl.c` `bl_ride`; `mon.c` `monkilled`;
  `win/tty/wintty.c` `hilite_pet` attr.
- **Change:** `mon_glyph` species color; skip `usteed` in
  `mon_at_display`; `hero_display_glyph` ridden path; `do_name`
  `mon_nam`/`Monnam`/`x_monnam_tame` saddle adj; botl `" Ride"`;
  `mhitm` shared naming + undead `"destroyed"`.
- **Verification:** seed0103 Scr **2→57**/60 (RNG full); seed0104 Scr
  **3→15**/43; green+strict+cohort PASS; full **17/44** Scr **1399**
  RNG **148875**.
- **Named omissions:** tutorial/disclosure residuals cleared in
  D-0215/D-0216; full `nonliving` (golem/vortex/manes);
  `hilite_pet` attr; Hallu/Blind saddle suppress paths.
- **Next:** seed0104 @2841 `mattacku`, or D-0211 typ dump.

## D-0215 — Tutorial menu invalid letter stays open

- **Status:** fixed
- **Symptom:** seed0103 Scr **57**/60; screen 3 cursor (27,7) vs C
  (27,6); JS showed `(Please choose 'y' or 'n'.)` after key `s`.
- **Cause/evidence:** JS treated every non-y/n as `select_menu` n==0
  rebuild (`pass++`). C `process_menu_window`: invalid letter →
  `tty_nhbell` + stay open (same paint); only space/return with no
  pick returns n==0 and rebuilds with the hint (`options.c`
  `ask_do_tutorial` `pass++`).
- **C locus:** `options.c` `ask_do_tutorial`; `wintty.c`
  `process_menu_window` default unacceptable / space finish.
- **Change:** `ask_do_tutorial` inner loop — y/n/ESC dismiss; space/
  return rebuild with hint; other keys stay open without `docrt`.
- **Verification:** seed0103 Scr **57→58**/60 (screen 3 match); green
  held.
- **Next:** disclosure (D-0216).

## D-0216 — Death `really_done` message flush + possessions disclose

- **Status:** fixed
- **Symptom:** seed0103 Scr **58**/60; JS emitted 58 screens vs C 60 —
  missing `You die...--More--` and possessions yn.
- **Cause/evidence:** `really_done` set `gameover` and returned without
  C's `display_nhwindow(WIN_MESSAGE)` (wait for pending die `--More--`)
  or `disclose` inventory yn. `pline("You die...")` only sets
  NEED_MORE; flush happens in really_done / next UI.
- **C locus:** `end.c` `really_done` / `disclose`; `hack.c` `losehp`
  `urgent_pline`+`done`; `steed.c` mount slip → `losehp`.
- **Change:** `really_done` → `flush_topl_more` then `disclose`
  possessions `yn_function(..., 'ynq', 'n')`. Other disclose
  categories deferred.
- **Verification:** seed0103 **PASS** (RNG 2640/2640 Scr 60/60);
  green+strict+cohort PASS; full **18/44** Scr **1405** RNG
  **148875**.
- **Named omissions:** invent discover_object before disclose; 'y'
  `display_inventory`; attributes/vanquished/genocided/conduct/
  overview; paybill `taken` prompt; async `losehp` calling `done`
  (steed still post-checks uhp).
- **Next:** seed0104 @2841 `mattacku` while mounted; or D-0211 typ
  dump; or seed0030 seg2 @2408.

## D-0217 — Mounted `mattacku` steed redirect (seed0104 @2841)

- **Status:** fixed
- **Symptom:** seed0104 @2841 C `rn2(2)=0 @ mattacku(mhitu.c:534)` vs
  JS `rn2(12)` (EOT `mcalcmove` / skipped steed gate).
- **Cause/evidence:** JS `mattacku` omitted the entire `u.usteed` arm.
  C burns `rn2(is_orc(ptr)?2:4)` then may `mattackm(mtmp, usteed)` and
  steed retaliation; steed never attacks the rider. Also JS `m_at`
  returned the mounted steed (same mx/my as hero) while C
  `remove_monster`s the steed off the map grid.
- **C locus:** `mhitu.c` `mattacku` ~528–547; `mondata.h` `is_orc`;
  `you.h` `m_next2u`; `steed.c` `remove_monster` on mount; `mhitm.c`
  `mattackm`.
- **Change:** `mattacku` steed branch + `is_orc`/`M2_ORC` + `m_next2u`;
  `m_at` skips `u.usteed`. Breath/swallow/undetected still deferred.
- **Verification:** seed0104 prefix **2841→3031** (positional
  **3034**/3223 Scr **15**/43); seed0103 still **PASS**; green+strict+
  cohort PASS; full **18/44** Scr **1405** RNG **148941**.
- **Named omissions:** full steed `mattackm` feedback/`bhitpos`;
  whirly/unsolid; map-grid `remove_monster` (logical skip only).
- **Next:** seed0104 @3031 C `gethungry` vs JS `rn2(5)`; or D-0211
  typ dump.

## D-0218 — seed0104 @3031 is upstairs geometry, not gethungry

- **Status:** rejected (superseded by D-0219)
- **Symptom:** seed0104 @3031 C `rn2(20) @ gethungry` (hero
  `overexertion`/`do_attack`) vs JS `rn2(5) @ distfleeck`.
- **Rejected:** post-steed moveloop allotment / missing second
  `gethungry` / incomplete steed `mattackm` RNG — after matched EOT
  wipe_engr, JS `umovement=12` and reaches `rhack`; next key `l` is a
  free east move on JS (goblin is **north** at 34,8) while C attacks
  goblin **east** of hero (screen `uo` at cursor 32,9).
- **Falsified cause:** upstairs / `create_room` room-origin drift.
  Post-`sort_rooms` rect dump + matched `makerooms`/`somex`/`somey`
  arities place the branch room at **(19,6)** → stair **(19,7)** for
  **both** JS and C; early screens/cursors match. Geometry is not the
  @3031 split.
- **Actual cause:** see D-0219 (diagonal into open doorway during
  capital-`L` rush).
- **C locus (misattributed):** `mklev.c` `place_branch`; `mkroom.c`
  `somex`/`somey`; `stairs.c` `u_on_upstairs`.
- **Change:** none (DIAG removed).
- **Verification:** create_room RNG+rects matched through place_branch;
  green held; focused peel redirected to D-0219.
- **Next:** do not re-chase makerooms rects for seed0104 @3031.

## D-0219 — `test_move` forbids diagonal into intact doorway

- **Status:** fixed
- **Symptom:** seed0104 @3031 C `gethungry`/`do_attack` vs JS
  `distfleeck`; goblin north of JS hero vs east of C. Later peel after
  path fix: `landing_spot` `rn2(2)` vs `rn2(4)` (same missing filter).
- **Cause/evidence:** During first capital-`L` rush, JS
  `lookaround` turned SE into an open door at (33,8) and `domove`
  allowed the diagonal entry; C `test_move` **testdiag** rejects
  diagonal moves into intact doorways (`!doorless_door || block_door`).
  Open doors are not doorless (`D_ISOPEN`). Wrong room → wrong goblin
  geometry → @3031 arity split. Same ban missing in steed
  `test_move_ok` inflated `landing_spot` viable count.
- **C locus:** `hack.c` `test_move` / `doorless_door`; `steed.c`
  `landing_spot` via `test_move(TEST_MOVE)`.
- **Change:** `js/cmd.js` `doorless_door` + diagonal into/out-of intact
  door reject in `domove`; stub `block_door` false (shop path deferred).
  `js/steed.js` `test_move_ok` same diagonal-door filter.
- **Verification:** seed0104 RNG **3223**/3223 Scr **39**/43 (curs
  40/43); `rng-diff` OK; green+strict+cohort PASS; full **18/44** Scr
  **1429** RNG **149118**.
- **Named omissions:** Rogue-level `doorless_door` override; shop
  `block_door`/`block_entry`; full `test_move` NODIAG/boulder arms.
- **Next:** seed0104 Scr residual (39/43 after dismount); or D-0211
  typ dump.

## D-0220 — dismount `float_down`→`pickup` + multi `look_here` NHW_MENU

- **Status:** fixed
- **Symptom:** seed0104 Scr **39**/43 after D-0219 (RNG full). First
  miss @28: C pony pline + `--More--` vs JS bare pline; space then
  became `Unknown command ' '`. Later `:` also missed C "Things that
  are here:" menu.
- **Cause/evidence:** C `dismount_steed` does `teleds` under
  `in_steed_dismounting` (so `spoteffects` skips pickup) then
  `float_down(0,W_SADDLE)`→`pickup(1)`→`check_here`→`look_here`. Multi
  floor objects take the NHW_MENU putstr path after
  `display_nhwindow(WIN_MESSAGE,FALSE)`. JS stubbed float_down and
  used `pline("You see several objects here.")` for multi.
- **C locus:** `steed.c` `dismount_steed`; `trap.c` `float_down`
  pickup; `hack.c` `spoteffects` `in_steed_dismounting` skip;
  `invent.c` `look_here` multi NHW_MENU.
- **Change:** `js/steed.js` `in_steed_dismounting` around teleds +
  `pickup(1)` after (float_down subset); `js/pickup.js` spoteffects
  skip when flag set; `js/invent.js` `look_here` multi →
  `flush_topl_more` + `show_nhw_menu_text` "Things that are here:".
- **Verification:** seed0104 **PASS** RNG/Scr **43**/43; green+strict
  + cohort PASS; full **19/44** Scr **1433** RNG **149124**.
- **Named omissions:** float_down levitation/pool/trap/come-down msgs;
  `doname_with_price`; Blind feel; cockatrice; engulfer stomach;
  teleds→spoteffects on mount path.
- **Next:** D-0211 C typ dump / seed0030 seg2 @2408; or quest
  `getbones` `^V`/`makemaz`.

## D-0221 — floorfood eat + poison_strdmg (seed0030 seg2 @2930)

- **Status:** fixed
- **Symptom:** seed0030 seg2 @2930 C `rn2(20) @ eatcorpse` vs JS
  `rn2(3)` — after D-0211 wantdoor. Session keys `e`/`y` with yn
  prompt "There is a kobold corpse here; eat it?".
- **Rejected:** invent letter `y` missing from edible_lets;
  `nonrotting_corpse` skipping rotting `rn2(20)`; eatcorpse body
  alone (JS never entered it).
- **Cause/evidence:** C `doeat`→`floorfood("eat",0)` ynq on floor
  edible before invent `getobj`. JS invent-only `getobj_eat` treated
  `y` as invent letter / never reached `eatcorpse`. C poison path then
  burns `poison_strdmg(rnd(4), rnd(15))` which JS had stubbed.
- **C locus:** `eat.c` `doeat`/`floorfood`/`eatcorpse`; `attrib.c`
  `poison_strdmg`/`losestr`.
- **Change:** `js/eat.js` `floorfood_eat` (floor ynq → invent getobj);
  `doeat` calls it; `touchfood`/`useup` floor arms; `eatcorpse`
  poison → `poison_strdmg(rnd(4),rnd(15))` with `losestr` ATTRMIN
  `rn1(4,3)` gate.
- **Verification:** seg2 **2930→3207** (`obj_resists` vs JS
  `distfleeck`); positional **25538**/105529 Scr **48**/1953; green
  +strict+cohort PASS; full **19/44** Scr **1433** RNG **149541**.
- **Named omissions:** metallivore beartrap/bars/gold; pool/lava
  reach gate; `will_feel_cockatrice`; `getobj_else` wording;
  sacrifice/tin `floorfood` arms; `losestr` `setuhpmax` / full death
  killer strings; tainted `make_sick`.
- **Next:** seed0030 seg2 @3207 pet `obj_resists` after meal; or
  quest `getbones` `^V`/`makemaz`.

## D-0222 — floor useupf → delobj obj_resists (seed0030 seg2 @3207)

- **Status:** fixed
- **Symptom:** seed0030 seg2 @3207 C `rn2(100) @ obj_resists` vs JS
  `rn2(5) @ distfleeck` after finishing floor kobold corpse meal.
- **Rejected:** pet `dog_invent`/`dogfood` missing first obj_resists
  (ordering would put invent rolls after distfleeck in dochug).
- **Cause/evidence:** C `done_eating` → `useupf(piece,1)` → `delobj` →
  `obj_resists(0,0)` always burns `rn2(100)`. JS floor `useup` extracted
  without that roll. Invent path must stay without resists (`addinv`
  often leaves `where` unset; invent-split children are not in
  `game.invent` — gate floor via `OBJ_FLOOR` / floor-pile presence).
- **C locus:** `invent.c` `useupf`/`delobj_core`; `eat.c` `done_eating`.
- **Change:** `js/eat.js` `useup` floor arm → `splitobj`+`delobj`; invent
  / free-child arm → quan/splice without `obj_resists`.
- **Verification:** seg2 **3207→5939** (C `distfleeck` vs JS `rn2(20)`);
  positional **28231**/105529 Scr **48**/1953; green+strict+cohort PASS;
  full **19/44** Scr **1433** RNG **152565**.
- **Named omissions:** `touchfood` invent `freeinv`/`addinv_nomerge`;
  invent `addinv` setting `where=OBJ_INVENT`; shop `useupf` bill arms.
- **Next:** seed0030 seg2 @5939 `distfleeck` vs `rn2(20)`; or quest
  `getbones` `^V`/`makemaz`.

## D-0223 — m_search_items underfoot MMOVE_DONE (seed0030 seg2 @5939)

- **Status:** fixed
- **Symptom:** seed0030 seg2 @5939 C `rn2(5) @ distfleeck` vs JS
  `rn2(20) @ m_move` track after D-0222.
- **Rejected:** dog_invent APPORT (no invent-APPORT at peel); invent-eat
  omission (not DOGFOOD/CADAVER); gettrack (null); meating early-return
  (meating=0); want_move/nearby.
- **Cause/evidence:** DIAG PM_GOBLIN @(21,7): `m_search_items` redirected
  `gg` to adjacent WORTHLESS_BLACK_GLASS @(20,8) → mfndpos hit mtrack
  `rn2(20)`. C had no leftover glass (prior underfoot claim). JS had
  skipped underfoot `return TRUE` since D-0183 (postmov lacked
  `mpickstuff` then); D-0185 wired `mpickstuff` for MOVED|DONE but left
  the underfoot short-circuit deferred — floor loot remained for later
  distant redirects.
- **C locus:** `monmove.c` `m_search_items` underfoot → `MMOVE_DONE` →
  `postmov` → `mpickstuff`.
- **Change:** restore underfoot `return true` in `js/monmove.js`
  `m_search_items` (caller already `postmov(DONE)`). Also ported
  `dog_invent` underfoot DOGFOOD/CADAVER/`mhpmax_penalty` ACCFOOD →
  `dog_eat` before APPORT (named D-0168 omission; not the peel writer).
- **Verification:** seg2 **5939→6060** (`rnd(20) @ mattacku` vs
  `rn2(8)`); positional **28318**/105529 Scr **48**/1953; full
  **19/44** Scr **1433** RNG **152652**; green+strict+cohort PASS.
- **Named omissions:** shop `rn2(25)` / hides_under / onscary /
  costly_spot / `can_touch_safely` in search loop; invent-eat bee jelly /
  unpaid shop / metallivore.
- **Next:** seed0030 seg2 @6060 `mattacku`; or quest `getbones`
  `^V`/`makemaz`.

## D-0224 — seed0030 seg2 @6060 upstairs create_room vs C screen

- **Status:** rejected (screen≠map coordinate confusion)
- **Symptom:** seed0030 seg2 @6060 after D-0223; prior theory blamed
  JS upstairs @(66,2) vs C screen `(65,3)`.
- **Rejected cause:** create_room absolute (64,2) vs C terrain (63,3)
  / split_rects free-rect drift.
- **Evidence:** tty maps `setCell(map_x-1, map_y+1)`. C screen
  `(65,3)` / corners `(62,2)/(75,6)` ⇒ **map** stairs **(66,2)** and
  walls **(63,1)/(76,5)** — matches JS create_room + generate_stairs.
  Mklev RNG matched through stairs. Real peel was unbound `F`
  (D-0225).
- **C locus:** n/a (display mapping, not mklev).
- **Next:** superseded by D-0225.

## D-0225 — seed0030 seg2 `F`/`do_fight` forcefight prefix

- **Status:** fixed
- **Symptom:** seed0030 seg2 @6060 C `rnd(20) @ mattacku` vs JS
  `rn2(8) @ m_move` after matched mklev; JS screens `Unknown command 'F'.`
- **Rejected:** upstairs geometry / create_room (D-0224); fleeck/APPORT.
- **Cause:** C `cmd.c` binds `'F'`→`do_fight` (PREFIXCMD) setting
  `forcefight`; next dir uses `domove`→`domove_fight_empty` (“thin air”)
  or attack. JS left `F` unbound → wasted keys; `l` was normal walk →
  hero/monster path split.
- **C locus:** `cmd.c` `do_fight`; `hack.c` `domove_fight_empty` /
  forcefight clear after DOMOVE_WALK.
- **Change:** `js/cmd.js` — bind `F`, `domove_fight_empty` (thin air +
  simple solid), clear forcefight after move / on non-prefix cmds.
  Boulder/pick/I-glyph/explode arms deferred.
- **Verification:** seed0030 seg2 RNG **6221/6221** FULL; positional
  **33021**/105529; full **19/44** Scr **1433** RNG **157355**;
  green+strict PASS; 17-session PASS cohort held.
- **Next:** seed0030 seg3 @4527 themerms `contents`/`rn2(4)`.

## D-0226 — Nesting rooms size + positioned create_room

- **Status:** fixed
- **Symptom:** seed0030 seg3 @4527 C `rn2(4) @ contents themerms.lua:346`
  vs JS `rn2(100)` (blind build_room chance on Nesting pick).
- **Cause:** Nesting rooms contents evaluates `w=9+nh.rn2(4)`,
  `h=9+nh.rn2(4)` **before** `des.room`→`build_room`’s `rn2(100)`.
  JS treated Nesting like default and burned `rn2(100)` then fully
  random `create_room(-1…)`. Also lacked `create_room`’s positioned
  branch (`rnd(5)`/`rnd(3)` + `get_rect`) used when w/h are set.
- **C locus:** `themerms.lua:346` Nesting rooms; `sp_lev.c` `build_room`
  / `create_room` else branch @1580; `lspo_room` `themeroom_failed`.
- **Change:** `js/mklev.js` — Nesting size rolls before `rn2(100)`;
  positioned `create_room` path; set `themeroom_failed` on fail.
  Nested create_subroom/create_door deferred (this seed’s outer room
  fails after 100 tries, matching C).
- **Verification:** seg3 **4527→7617** (`mhitm_knockback`); positional
  **36316**/105529; full **19/44** Scr **1433** RNG **160650**;
  green+strict PASS; 17-session PASS cohort held.
- **Next:** seed0030 seg3 @7617 knockback vs `rn2(25)`.
## D-0227 — hmon weapon `mhitm_knockback` RNG

- **Status:** fixed
- **Symptom:** seed0030 seg3 @7617 C `rn2(3) @ mhitm_knockback` vs JS
  `rn2(25)` (`known_hitum` flee) after matched `dmgval`.
- **Cause:** C `hmon_hitmon` sets `maybe_knockback` for weapon melee
  (`!unarmed && dmg>1 && !thrown && !Upolyd && !twoweap && uwep`) and,
  when the defender survives, calls `mhitm_knockback` which burns
  `rn2(3)` then `rn2(chance)` **before** any size/weapon gates. JS
  `hmon` deferred that call, so the next burn was flee `rn2(25)`.
- **C locus:** `uhitm.c` `hmon_hitmon` @1829–1932; `mhitm_knockback`
  @5258–5269.
- **Change:** `js/uhitm.js` `hmon` — set `maybe_knockback` and call
  existing `mhitm_knockback` stub after survive; stub still burns RNG
  and returns false (hurtle body deferred).
- **Verification:** seg3 **7617→7935** (C `gethungry` vs JS
  `distfleeck`); positional **36491**/105529; full **19/44** Scr
  **1433** RNG **160825**; green+strict PASS; 19-session PASS cohort
  held.
- **Named omissions:** hurtle/mhurtle body; steadfast/size/weapon
  gates after the chance roll; ART_OGRESMASHER chance=2; knockback
  plines / stun; `set_uasmon` youmonst.mattk (AT_WEAP fallback).
- **Next:** seed0030 seg3 @7935 hero-turn vs monster-move peel.

## D-0228 — `cmd_safety_prevention` for `s` / `.`

- **Status:** fixed
- **Symptom:** seed0030 seg3 @7935 C `gethungry`/`hitum` (west into
  grid bug) vs JS `distfleeck`. Matched through `moveloop_core`
  `rn2(79)`.
- **Cause:** At the matched EOT, C's next keys were safety-rejected
  `s`/`.` (0 RNG: "You already found a monster" / "waiting to get
  hit?") then `h` melee. JS lacked `cmd_safety_prevention`, so the
  same `s` ran real `dosearch0` and advanced monster turns — key
  stream desynced while RNG had still matched.
- **C locus:** `do.c` `cmd_safety_prevention` / `donull`;
  `detect.c` `dosearch`; `hack.c` `monster_nearby`.
- **Change:** `js/hack.js` `monster_nearby` + `noattacks`;
  `js/do.js` `cmd_safety_prevention` + async `donull`;
  `js/detect.js` `dosearch` gate; `js/cmd.js` honors
  `dosearch`/`donull` return for `context.move`.
- **Verification:** seg3 **7935→8561** (C `mkobj` treasure vs JS
  `rn2(3)`); positional **37147**/105529 Scr **56**/1953; full
  **19/44** Scr **1441** RNG **161481**; green+strict PASS;
  17-session PASS cohort held.
- **Named omissions:** `onscary`; full `canspotmon`; full
  `danger_uprops` bodies; `visctrl`/`cmd_from_func` beyond `'m'`;
  `m` prefix `menu_requested` wiring for forced search/wait.
- **Next:** seed0030 seg3 @8561 `xkilled` treasure `mkobj` (named
  deferred) / quest `getbones`.

## D-0229 — xkilled treasure mkobj(RANDOM_CLASS)

- **Status:** fixed
- **Symptom:** seed0030 seg3 @8561 C `rnd(100)`/`rnd(1000)`/`next_ident`
  (`mkobj`) vs JS `rn2(3)` (`corpse_chance`). Matched through
  `xkilled` `rn2(6)=0`.
- **Cause:** JS burned `!rn2(6)` then skipped the treasure body;
  C calls `mkobj(RANDOM_CLASS, TRUE)` then food/size filters and
  `place_object`/`stackobj`.
- **C locus:** `mon.c` `xkilled` @3586–3615.
- **Change:** `js/uhitm.js` `xkilled_treasure_drop` — G_NOCORPSE /
  hero-tile / S_KOP / mcloned gates; `mkobj`; FOOD non-COLLECT →
  `delobj`; small-mon oversized → `delobj`; else place+stack.
- **Verification:** seg3 **8561→9166** (C `gethungry`/`hitum` vs JS
  `distfleeck`); positional **37565**/105529 Scr **56**/1953; full
  **19/44** Scr **1441** RNG **161899**; green+strict PASS;
  17-session PASS cohort held.
- **Named omissions:** `flooreffects` pool/lava/hot-potion/boulder;
  artifact un-create before oversized `delobj`;
  `accessible`/`is_pool` / `LEVEL_SPECIFIC_NOCORPSE` gates;
  wasinside/burycorpse/zombify.
- **Next:** seed0030 seg3 @9166 key/command after matched EOT
  (C hero melee vs JS fleeck); or quest `getbones`.

## D-0230 — CORPSE weight uses mons[corpsenm].cwt

- **Status:** fixed
- **Symptom:** seed0030 seg3 @9166 C `gethungry`/`hitum` (west into
  goblin) vs JS `distfleeck`. Matched through EOT `rn2(79)`.
- **Cause:** Not key desync. C goblin at (26,6) adjacent west of hero
  (27,6); JS goblin at (25,6). JS `m_search_items` redirected hostile
  `gg` to a gnome CORPSE at (25,9) because `weight(CORPSE)` used
  `oc_weight`/fallback → `owt=1`, so `can_carry` succeeded. C
  `weight` uses `quan * mons[corpsenm].cwt` (gnome corpse too heavy
  for goblin max load) — no divert; goblin followed gettrack to
  (26,6).
- **Rejected:** key/safety desync (D-0228 class) — same `h` key; empty
  dest because goblin one tile west.
- **C locus:** `mkobj.c` `weight` CORPSE branch.
- **Change:** `js/mkobj.js` `weight` — CORPSE → `mons(corpsenm).cwt`
  with `LARGEST_INT` clamp; `oeaten` deferred.
- **Verification:** seg3 **9166→9299** (C `rnl(7)` `dosearch0` vs JS
  `distfleeck`); positional **38048**/105529 Scr **56**/1953; full
  **19/44** Scr **1441** RNG **162377**; green+strict PASS;
  17-session PASS cohort held.
- **Named omissions:** `oeaten`/`eaten_stat`; container/statue weight
  arms; globby `owt` passthrough.
- **Next:** seed0030 seg3 @9299 C `dosearch0` vs JS `distfleeck`; or
  quest `getbones`.

## D-0231 — blocksMove must use IS_OBSTRUCTED (SDOOR/SCORR)

- **Status:** fixed
- **Symptom:** seed0030 seg3 @9299 C `rnl(7)` `dosearch0` vs JS
  `rn2(5)` `distfleeck`. Matched through EOT `rn2(79)`.
- **Cause:** After matched `j` move, C blocked next `j` into adjacent
  SDOOR (0 RNG) then `s` searched (`rnl`). JS `blocksMove` only tested
  STONE / `IS_WALL` / closed DOOR — SDOOR (typ=14) was walkable — so JS
  stepped onto the secret door and never reached the search `rnl`.
- **Rejected:** missing `dosearch` / safety-reject / key desync of the
  `s` itself — DIAG showed `domove` into typ=14 at rngLen=9299 before
  any `dosearch`.
- **C locus:** `hack.c` `test_move` — `IS_OBSTRUCTED(typ) || IRONBARS`
  (`rm.h`: `typ < POOL` includes TREE/SDOOR/SCORR).
- **Change:** `js/cmd.js` `blocksMove` → `IS_OBSTRUCTED` + `IRONBARS` +
  closed/locked DOOR.
- **Verification:** seg3 **9299→9778** (C `m_move` `rn2(8)` vs JS
  `distfleeck`); positional **38253**/105529 Scr **48**/1953; full
  **19/44** Scr **1433** RNG **162593**; green+strict PASS;
  17-session PASS cohort held.
- **Named omissions:** Passes_walls / autodig / chew / mention_walls
  plines on blocked obstructed cells; feel_location Blind path.
- **Next:** seed0030 seg3 @9778 C `m_move` vs JS `distfleeck`; or
  quest `getbones`.

## D-0232 — dochug find_misc WAN_SPEED spends turn (no post fleeck)

- **Status:** fixed
- **Symptom:** seed0030 seg3 @9778 C `rn2(8)` `m_move` (track skip) vs
  JS `rn2(5)` `distfleeck`. Matched through two fleecks after
  `moveloop_core` `rn2(31)`.
- **Cause:** Peaceful shopkeeper at (10,8) carried charged
  `WAN_SPEED_MONSTER` (`spe=8`) with `mspeed!=MFAST` and
  `dist2(mux)≤36`. C `dochug` after first `distfleeck`:
  `find_defensive` fails (`dist>25`), then `find_misc`→`use_misc`
  zaps speed and returns (no `m_move`, no post fleeck). JS lacked
  muse misc → `shk_move` + post fleeck inserted an extra `rn2(5)`
  before the grid bug’s track `rn2(8)`.
- **Rejected:** extra hostile actor / different `appr`/cnt on the
  grid bug — DIAG showed JS fleeck×2 for the shopkeeper
  (pre+post) then fleeck+mtrack for the grid bug.
- **C locus:** `monmove.c` `dochug` (`find_defensive`/`find_misc`);
  `muse.c` `find_misc`/`use_misc`/`mzapwand`; `worn.c`
  `mon_adjust_speed`.
- **Change:** `js/muse.js` `find_defensive` early gates +
  `find_misc`/`use_misc` WAN/POT_SPEED + `mzapwand` +
  `mon_adjust_speed`; wire into `dochug`; `mcalcmove` MSLOW/MFAST;
  `makemon` `permspeed`.
- **Verification:** seg3 **9778→9850** (C `distfleeck` vs JS
  `rn2(2)` after matched `move_special` `rn2(1)`); positional
  **38260**/105529 Scr **48**/1953; full **19/44** Scr **1433**
  RNG **162600**; green+strict PASS; 17-session PASS cohort held.
- **Named omissions:** `find_defensive` healing/horn/flee;
  `find_misc` poly trap/gain-level/invis/poly/bag/`rn2` bullwhip;
  cursed wand backfire death/`m_useup`; `mzapwand` `unknow_object`;
  `learnwand`/speed pline; steed gallop in `mcalcmove`.
- **Next:** seed0030 seg3 @9850 C `distfleeck` vs JS `rn2(2)`; or
  quest `getbones`.

## D-0233 — mfndpos NOTONL for move_special avoid

- **Status:** fixed
- **Symptom:** seed0030 seg3 @9850 C `rn2(5)` `distfleeck` vs JS
  `rn2(2)` after matched `move_special` `rn2(1)`.
- **Cause:** Shopkeeper at home (10,9), hero on shop door (11,9),
  `uondoor`+`avoid`, `appr=0`. C `mfndpos` marks cells online with
  `mux`/`muy` as `NOTONL`; `move_special` skips them under `avoid`,
  leaving one ROOM candidate → only `rn2(1)`. JS never set NOTONL, so
  four ROOM candidates burned `rn2(1..4)`.
- **Rejected:** invent-walk / `inhishop` false / wrong `IS_ROOM` —
  DIAG at rng 9849 showed `in_his_shop=true`, four ROOM cells with
  `info=0`.
- **C locus:** `mon.c` `mfndpos` (`monseeu`/`monlineu` → NOTONL);
  `priest.c` `move_special` avoid skip.
- **Change:** `js/mon.js` `mfndpos` marks NOTONL when
  `mcansee && (!Invis || perceives)` and `online2(nx,ny,mux,muy)`;
  unicorn `flag&NOTONL` still skips.
- **Verification:** seg3 **9850→9881** (C `use_offensive` vs JS
  `distfleeck`); positional **38265**/105529 Scr **48**/1953; full
  **19/44** Scr **1433** RNG **162605**; green+strict PASS;
  17-session PASS cohort held.
- **Named omissions:** unicorn `mon_allowflags` NOTONL bit;
  Displacement scare/`onscary`/`ALLOW_SSM` in mfndpos; garlic;
  temple/`ALLOW_SANCT`; pool/lava/`bad_rock` squeeze; poison-gas.
- **Next:** seed0030 seg3 @9881 C `use_offensive` vs JS `distfleeck`;
  or quest `getbones`.

## D-0234 — missum setmangry + WAN_STRIKING mbhit

- **Status:** fixed
- **Symptom:** seed0030 seg3 @9881 C `rn2(8)` `use_offensive` vs JS
  `rn2(5)` `distfleeck`. Screen: “Maganasipi zaps a long wand! Boing!”
- **Cause:** (1) JS `missum`/`hmon` never called `wakeup(TRUE)`→
  `setmangry`, so Maganasipi stayed peaceful after “You miss… gets
  angry!” and never entered offense. (2) Once angry, need
  `find_offensive`/`use_offensive` `MUSE_WAN_STRIKING` → `mzapwand` +
  `mbhit(rn1(8,6))` + Antimagic Boing → `makeknown`→`exercise(A_WIS)`.
  (3) Worn `CLOAK_OF_MAGIC_RESISTANCE` must count as Antimagic while
  `setworn` oc_oprop is deferred.
- **Rejected:** missing muse alone without anger; WAN_TELEPORTATION
  (screen Boing! = striking Antimagic).
- **C locus:** `uhitm.c` `missum`/`hmon`→`wakeup`; `mon.c`
  `setmangry`/`wakeup`; `muse.c` `find_offensive`/`use_offensive`/
  `mbhit`/`mbhitm` WAN_STRIKING; `youprop.h` Antimagic.
- **Change:** `js/mon.js` `setmangry` + `wakeup` via_attack; `js/uhitm.js`
  miss/hit wakeup; `js/muse.js` WAN_STRIKING find/use + mbhit/mbhitm +
  Antimagic cloak/gray-dragon check; `js/monmove.js` MMOVE_MOVED
  `find_offensive` fallthrough.
- **Verification:** seg3 **9881→9887** (C `mattacku` vs JS `rn2(8)`);
  positional **38305**/105529 Scr **48**/1953; full **19/44** Scr
  **1433** RNG **162645**; green+strict PASS; 17-session PASS cohort
  held.
- **Named omissions:** Elbereth hypocrite/`peacefuls_respond`/
  `hot_pursuit`/`ghod_hitsu`; other muse offense wands/horns; mbhit
  `fhito_loc`/`doorlock`/drawbridge; full `oc_oprop` via setworn;
  mon-target `mbhitm` resist/hit plines.
- **Next:** seed0030 seg3 @9887 C `mattacku` vs JS `rn2(8)`; or quest
  `getbones`.

## D-0235 — monstseesu M_SEEN_MAGR after WAN_STRIKING Boing

- **Status:** fixed
- **Symptom:** seed0030 seg3 @9887 C `rnd(20)` `mattacku` (melee after
  Maganasipi MFAST second dochug) vs JS `rn2(8)` (second
  `use_offensive` WAN_STRIKING).
- **Cause:** C `mbhitm` Antimagic Boing calls `monstseesu(M_SEEN_MAGR)`;
  next `find_offensive` requires `!m_seenres(mtmp, M_SEEN_MAGR)` for
  WAN_STRIKING. JS deferred both, so Maganasipi zapped again instead
  of melee.
- **Rejected:** position/nearby drift; spe not decremented; extra
  actor/`m_move` arity alone (matched through fleeck @9886).
- **C locus:** `muse.c` `mbhitm`/`find_offensive`; `mondata.c`
  `monstseesu`/`monstunseesu`; `monst.h` `seen_resistance` /
  `m_seenres`; `vision.h` `m_canseeu`.
- **Change:** `js/makemon.js` `seen_resistance`; `js/mondata.js`
  `m_seenres`/`monstseesu`/`monstunseesu`/`m_canseeu`; `js/muse.js`
  Boing→`monstseesu`, hit→`monstunseesu`, find_offensive MAGR gate.
- **Verification:** seg3 RNG **FULL** (9892/9892); positional
  **40677**/105529 Scr **48**/1953; full **19/44** Scr **1433** RNG
  **165017**; green+strict PASS; 17-session PASS cohort held.
- **Named omissions:** `shieldeff`; buried `m_canseeu` arms;
  `m_seenres` gates for other muse wands/potions (SLEEP/FIRE/…);
  `reflection_skip`; `monstunseesu_prop` on armor remove.
- **Next:** seed0030 seg4 @2369 `ini_inv_adjust_obj`; or quest
  `getbones`.

## D-0236 — ini_inv_adjust_obj UNDEF_SPE charged ring rne(3)

- **Status:** fixed
- **Symptom:** seed0030 seg4 @2369 — C `rn2(3)`/`rne(3)` at
  `ini_inv_adjust_obj` vs JS `rn2(1)` `trquan` (Wizard/elf Caspar
  starting kit).
- **Cause:** C clears `cursed` then, when `trspe == UNDEF_SPE`, bumps
  charged rings with `spe <= 0` via `obj->spe = rne(3)`. JS omitted the
  else branch, so after matching `mksobj_init` for a ≤0 charged ring it
  advanced to the next trobj `trquan`.
- **Rejected:** wrong initial `trquan` for Wizard rings (quan=2 matched);
  second-ring `mkobj` skip; MAGIC_MARKER `rn2(4)` path.
- **C locus:** `u_init.c` `ini_inv_adjust_obj` (UNDEF_SPE ring arm);
  `rnd.c` `rne`; charged rings = `objects[].oc_charged`.
- **Change:** `js/u_init.js` `ini_inv_adjust_obj` else-branch —
  ADORNMENT/GAIN_STR/GAIN_CON/INCREASE_ACC/INCREASE_DAM/PROTECTION
  (same set as `mkobj.js` RING_CLASS; `oc_charged` not extracted yet)
  + `rne(3)`.
- **Verification:** segs 0–3 still FULL; seg4 **2369→6630**
  (`drinkfountain`); positional **45217**/105529 Scr **59**/1953;
  full **19/44** Scr **1444** RNG **169732**; green+strict PASS;
  17-session PASS cohort held; seed2200 Scr still 229/230 (parked RC).
- **Named omissions:** extractor `oc_charged` field; other
  `ini_inv_adjust_obj` deferred arms already named in C-JS-MAP.
- **Next:** seed0030 seg4 @6630 `drinkfountain`; or quest `getbones`.

## D-0237 — drinkfountain / dodrink fountain yn

- **Status:** fixed
- **Symptom:** seed0030 seg4 @6630 — C `rnd(30)` at `drinkfountain`
  vs JS `rn2(5)` (distfleeck after wrong key ownership).
- **Cause:** C `dodrink` prompts `Drink from the fountain?` before
  getobj when standing on a fountain (`can_reach_floor`); `y` runs
  `drinkfountain` (`fate = rnd(30)` before Levitation). JS skipped the
  fountain arm and fed `y` to potion getobj (cancel / no turn), so the
  next real move's fleeck appeared where C burned fountain RNG.
- **Rejected:** invent-letter `y` potion peffect; wrong fountain effect
  table alone without the prompt.
- **C locus:** `potion.c` `dodrink` fountain yn; `fountain.c`
  `drinkfountain` / `dryup`.
- **Change:** `js/potion.js` `dodrink` fountain yn → `drinkfountain`;
  `js/fountain.js` `drinkfountain` (fate order, mgkftn/adjattrib,
  fate<10 refresh, switch default + message/RNG arms); export
  `poison_strdmg` from `eat.js` for case 21.
- **Verification:** segs 0–3 FULL; seg4 **6630→7554** (`exercise` vs
  `distfleeck` on `k`); positional **45960**/105529 Scr **59**/1953;
  full **19/44** Scr **1444** RNG **170543**; green+strict PASS;
  17-session PASS cohort held; seed2200 Scr still 229/230 (parked RC).
- **Named omissions:** `dowatersnakes`/`dowaterdemon`/`dowaternymph`/
  `dofindgem`/`dogushforth`; `monster_detect`/`enlightenment` bodies;
  `vomit` body; sink/underwater drink prompts; town warn/`angry_guards`;
  fruitname in poison resist pline.
- **Next:** seed0030 seg4 @7554 `exercise` after move; or quest
  `getbones`.

## D-0238 — moverock / dopush walk-into boulder

- **Status:** fixed
- **Symptom:** seed0030 seg4 @7554 — C `rn2(19)` at `exercise` vs JS
  `rn2(5)` `distfleeck`. Session `steps[96].key` is `"k"` (`moves[95]`),
  not `"h"` (`moves[96]`).
- **Cause:** C `test_move` into adjacent boulder calls `moverock` →
  `dopush` (“With great effort you move the boulder.” +
  `exercise(A_STR,TRUE)`) then advances onto the vacated cell. JS
  `domove` had no boulder gate and walked onto the boulder with no RNG.
- **Rejected:** walk/exerchk `exercise` on `"h"`; wall-bump; AEXE
  saturation skipping `"k"` push RNG (message first appears after `"k"`;
  only ~12 prior `rn2(19)`).
- **C locus:** `hack.c` `moverock`/`moverock_core`/`dopush`/`movobj`;
  `test_move` boulder arm; `attrib.c` `exercise`.
- **Change:** `js/hack.js` `moverock`/`dopush`/`movobj` (clear-dest
  push + STR exercise); `js/cmd.js` `domove` calls `moverock` when
  dest has a boulder.
- **Verification:** segs 0–3 FULL; seg4 **FULL** (8031/8031); positional
  **46654**/105529 Scr **69**/1953; full **19/44** Scr **1454** RNG
  **171238**; green+strict PASS; PASS cohort held (1500/1800/0060/
  0102/0700/1150/0017/0077/0106/0501/0105/0016/0015/0200/0101/0103/
  0104).
- **Named omissions:** Sokoban diagonal; shop costly/bill; trap/
  teleport/pool under dest; Blind feel; Levitation leverage; giant/
  squeeze/nopick; tunneling chew; revive_nasty; monster-behind;
  closed-door dest; `cannot_push` squeeze onto boulder; next_boulder
  naming.
- **Next:** seed0030 seg5 @3076 `next_ident` after dart miss; or quest
  `getbones`.

## D-0239 — hero dotrap dart `t_missile` / miss place

- **Status:** fixed
- **Symptom:** seed0030 seg5 @3076 — C `rnd(2)` `next_ident` then
  `mksobj_init` / `trapeffect_dart_trap` / `thitu` vs JS `rn2(12)`
  (`mcalcmove`). Screen: “A little dart shoots out at you!  A little
  dart misses you.”
- **Cause:** C `spoteffects` → `dotrap` → `trapeffect_dart_trap(youmonst)`
  always `t_missile(DART)` (burns `next_ident` + init) before poison/
  `dmgval`/`thitu`; miss places the dart. JS `spoteffects` only did
  pickup — no hero `dotrap` — so EOT monster `mcalcmove` `rn2(12)`
  landed at C’s dart index.
- **Rejected:** mineralize/`choose_trapnote` `rn2(12)` as the peel;
  dart allocation only on hit (C allocates before `thitu`).
- **C locus:** `hack.c` `spoteffects`; `trap.c` `dotrap` /
  `trapeffect_dart_trap` / `t_missile`; `mthrowu.c` `thitu`.
- **Change:** `js/pickup.js` `spoteffects` (non-pit pickup → `dotrap` →
  pit pickup); `js/trap.js` `dotrap` + hero dart branch (once+tseen
  click, seetrap, `t_missile`, poison roll, `dmgval`, `thitu`, miss
  place/`observe_object`/`stackobj`).
- **Verification:** segs 0–4 FULL; seg5 **3076→3096** (`distfleeck` vs
  `rnd(2)`); positional **46375**/105529 Scr **69**/1953; full **19/44**
  Scr **1454** RNG **171026**; green+strict PASS; 17-session PASS
  cohort held. Aggregate RNG dip vs pre-fix lucky later matches is
  expected when the real dart path replaces the skipped-trap stream.
- **Named omissions:** hero pit/arrow/rock/sqky/`poisoned()`; steedintrap;
  Sokoban air-currents; undestroyable/ANTI_MAGIC/Fumbling/conj_pit;
  `mons_see_trap`; `u_locomotion` verb beyond “step”; recursion guards.
- **Next:** seed0030 seg5 @3096 C `distfleeck` vs JS `rnd(2)` (pet
  glass-wand pickup screen); or quest `getbones`.

## D-0240 — NHW_MENU putstr `dmore` quitchars

- **Status:** fixed
- **Symptom:** seed0030 seg5 @3096 — C `rn2(5)` `distfleeck` vs JS
  `rnd(2)` (`next_ident` / second dart `t_missile`). Screen at C step:
  “The little dog picks up a glass wand.”
- **Cause:** After stepping onto a multi-object pile + dart trap,
  `look_here` NHW_MENU shows “Things that are here:” with `--More--`.
  C `process_text_window` → `dmore(cw, quitchars)` /
  `xwaitforspace(" \r\n\033")` ignores `l`/`k` (bell, stay on page);
  space dismisses, then `b` moves SW. JS `show_nhw_menu_text` corner
  path called bare `nhgetch()` so the first `l` closed the menu; the
  second `l` became a real east move onto an adjacent second dart trap
  at (75,4) → extra `t_missile`/`next_ident` before fleeck.
- **Rejected:** pet glass-wand APPORT/`splitobj`/`next_ident` order;
  missing second-trap geometry in mklev; dart `tseen` re-fire on leave.
- **C locus:** `win/tty/wintty.c` `process_text_window`/`dmore`;
  `win/tty/getline.c` `xwaitforspace`; `decl.c` `quitchars`;
  `invent.c` `look_here`.
- **Change:** `js/pager.js` `show_nhw_menu_text` uses `text_page_wait`
  (quitchars) for corner and fullscreen NHW_MENU putstr pages.
- **Verification:** segs 0–4 FULL; seg5 **3096→4174** (`dog_move`
  `rn2(12)` @1257 vs fleeck); positional **46399**/105529 Scr
  **69**/1953; full **19/44** Scr **1441** RNG **169781**; green+strict
  PASS; 17-session PASS cohort held. Aggregate Scr/RNG dip is FAIL
  sessions diverging earlier under correct menu key consumption.
- **Named omissions:** NHW_MENU selectable/`process_menu_window` path
  still separate; corner mid-list page break unused when `offx≠0` (C
  same); bell sound; `dismiss_more` ttyDisplay field.
- **Next:** seed0030 seg5 @4174 C `dog_move` `rn2(12)` vs JS fleeck;
  or quest `getbones`.

## D-0241 — mhitm `gv.vis` / dark pet combat `--More--`

- **Status:** fixed
- **Symptom:** seed0030 seg5 @4174 — C `rn2(12)` `dog_move` candidate
  pick vs JS `rn2(5)` `distfleeck`. Pet at `(48,9)`, hero `(43,9)`,
  `distmin=5`, `cnt=3`.
- **Cause:** After a west `h` move (~rngLen 4101), pet combat toplined
  bite + “destroyed”. JS `hitmm`/`missmm` always plined with no C
  `gv.vis` gate; messages forced `more()`. `xwaitforspace` only accepts
  space/CR/ESC and discarded movement `h` until a later space → key
  desync. Hero stayed at `(43,9)` with `umoved=false` while C moved
  further west → `distmin=5` vs C `>5` → mtrack/`rn2(12)` arity peel.
- **Rejected:** shipping `distmin >= 5` mtrack (advanced prefix as a
  symptom only); treating @4174 as pure mfndpos/cnt without input
  boundary check.
- **C locus:** `mhitm.c` `mattackm` sets
  `gv.vis = (cansee(magr)&&canspotmon(magr)) ||
  (cansee(mdef)&&canspotmon(mdef))`; `hitmm`/`missmm` pline only if
  `gv.vis` (else `noises()`); `mon.c` `monkilled` pline only if
  `cansee(mdef)`.
- **Change:** `js/mhitm.js` — local `canspotmon` + `_mm_vis` in
  `mattackm`; gate `hitmm`/`missmm` plines; `mondied` pline only when
  `cansee`.
- **Verification:** segs 0–3 FULL; seg4 JS +1 end quirk; seg5
  **4174→4372** (C `linedup` `rn2(3)` vs JS `m_move` `rn2(16)`);
  positional **46404**/105529 Scr **70**/1953; full **19/44** Scr
  **1442** RNG **169786**; green+strict PASS; 17-session PASS cohort
  held.
- **Named omissions:** `noises()` when `!gv.vis`; full `nonliving`
  destroy verb (golem/vortex/manes); worm_known.
- **Next:** seed0030 seg5 @4372 C `linedup` vs JS `m_move` track; or
  quest `getbones`.

## D-0242 — `linedup` boulderhandling + vision BOULDER `does_block`

- **Status:** fixed
- **Symptom:** seed0030 seg5 @4372 — C `rn2(3)` `linedup` vs JS
  `rn2(16)` `m_move` track. Hostile at `(28,10)`, hero `(33,10)`.
- **Cause:** `m_move` getitems calls `lined_up`→`linedup` with
  `boulderhandling=2`. C `couldsee` fails (boulder opaque via
  `does_block`), then walks the ray with one boulder →
  `rn2(2+1)`. JS vision `_blocks` ignored BOULDER so `couldsee`
  stayed true and returned before the boulder rn2 path. Also
  JS `linedup` previously omitted the boulder walk entirely;
  `objects_at` is a nexthere chain head (not an array).
- **Rejected:** treating @4372 as a missing `thrwmu`-only call
  without checking `m_move` getitems `lined_up`.
- **C locus:** `vision.c` `does_block` BOULDER; `mthrowu.c`
  `linedup`/`m_lined_up`/`lined_up`; `monmove.c` `m_move` getitems.
- **Change:** `js/vision.js` `_blocks` BOULDER (+ CLOUD/WATERWALL/
  LAVAWALL); `js/mthrowu.js` full `linedup` boulder walk +
  `lined_up` mux/muy / Upolyd / ignore_boulders; `js/hack.js`
  `movobj` `recalc_block_point` for boulder moves.
- **Verification:** segs 0–5 C-prefix FULL (seg5 **4372→8397**);
  next seg6 @339 `lspo_map` `rn2(68)` vs `rn2(100)`; positional
  **46537**/105529 Scr **70**/1953; full **19/44** Scr **1442**
  RNG **169919**; green+strict PASS; 17-session PASS cohort held.
- **Named omissions:** mimic `is_lightblocker_mappear`;
  `visible_region_at`; incremental `dig_point`; light sources;
  `place_object` boulder auto-`block_point` beyond `movobj`/
  level `vision_reset`.
- **Next:** seed0030 seg6 @339 `lspo_map`; or quest `getbones`.

## D-0243 — themerms Blocked center map + replace_terrain

- **Status:** fixed
- **Symptom:** seed0030 seg6 @339 — C `rn2(68)` `lspo_map` vs JS
  `rn2(100)` `build_room`. Reservoir rolls matched through
  `rn2(1036)`; pick was **Blocked center**.
- **Cause:** JS `THEMEROOM_MAPS` omitted Blocked center, so
  `themerooms_generate` fell through to rectangular `rn2(100)` +
  `create_room`. C runs `des.map` (11×11, wid→`rn2(68)`) then
  `percent(30)` / `shuffle({"-","P"})` /
  `des.replace_terrain` (L→wall|pool, 9 matching cells each burn
  `rn2(100)`) then `filler_region(1,1)`.
- **Rejected:** treating @339 as a generic map-fill chance arm
  without identifying the reservoir pick.
- **C locus:** `themerms.lua` Blocked center; `sp_lev.c`
  `lspo_map` / `lspo_replace_terrain`; `nhlib.lua` `shuffle` /
  `percent`.
- **Change:** `js/mklev.js` — Blocked center map entry with
  contents callback; `nhlib_shuffle`; region
  `lspo_replace_terrain` (fromtyp match then `rn2(100)<chance`);
  `lspo_map_themeroom` accepts optional `contents`.
- **Verification:** seg5 still C-prefix FULL; seg6 **339→2638**
  (`rndmonst_adj`); positional **46679**/105529 Scr **71**/1953;
  full **19/44** Scr **1446** RNG **172878**; green+strict PASS;
  17-session PASS cohort held.
- **Named omissions:** Pillars/Mausoleum/Water vault/Fake Delphi/
  Huge/Room-in-room map bodies; full `set_levltyp` ice/fountain
  timers; selection-based `replace_terrain` / mapfragment arms.
- **Next:** seed0030 seg6 @2638 `rndmonst_adj`; or quest
  `getbones`.

## D-0244 — FIGURINE `rndmonnum_adj(5,10)` + `is_human` retry

- **Status:** fixed
- **Symptom:** seed0030 seg6 @2638 — C `rn2(2)` `rndmonst_adj` vs JS
  `rn2(3)` (jackal pool). Preceded by matching
  `fill_ordinary_room`→`mkobj(RANDOM_CLASS)`→`next_ident`.
- **Cause:** C TOOL `FIGURINE` init calls `rndmonnum_adj(5,10)`
  (minmlev+5 / maxmlev+10 → weight seq starts `2,4,5,8,…`), then
  rejects `is_human` (tryct 30) + `blessorcurse(4)`. JS omitted the
  arm; post-init `corpsenm < 0` fell through to plain `rndmonnum()` →
  dlvl1 `rndmonst_adj(0,0)` → `rn2(3)`.
- **Rejected:** `align_shift` / dungeon-align / maxmlev drift as the
  arity gap (earlier same-mklev `rndmonst` calls still used the short
  pool; only the figurine call expanded).
- **C locus:** `mkobj.c` `mksobj_init` TOOL/FIGURINE;
  `rndmonnum_adj` / `rndmonst_adj`; `mondata.h` `is_human`.
- **Change:** `js/makemon.js` `rndmonnum_adj` (+ Plan B);
  `js/monsters.js` `M2_HUMAN`/`is_human`; `js/mkobj.js` FIGURINE
  init.
- **Verification:** seg6 **2638→4080** (`m_move` vs `distfleeck`);
  positional **46708**/105529 Scr **71**/1953; full **19/44** Scr
  **1446** RNG **172907**; green+strict PASS; 17-session PASS cohort
  held.
- **Named omissions:** `align_shift`/`temperature_shift` still
  stubbed 0; candle `oc_cost` age; FIGURINE transform/timeout.
- **Next:** seed0030 seg6 @4080 `m_move`/`distfleeck`; or quest
  `getbones`.

## D-0245 — `m_harmless_trap` BEAR_TRAP size / amorph / whirly / unsolid

- **Status:** fixed
- **Symptom:** seed0030 seg6 @4080 — C `rn2(12)` `m_move` mtrack vs JS
  `rn2(5)` post-move `distfleeck`.
- **Cause:** newt @`(60,4)` with `mtrack[0]=(61,4)` and BEAR_TRAP on that
  cell. C `m_harmless_trap` returns true for `msize <= MZ_SMALL`, so
  `mfndpos` keeps `(61,4)` and mtrack burns `rn2(4*(cnt-j))=rn2(12)`.
  JS stub treated all bear traps as harmful; known-trap skip dropped
  cnt 3→2 and never hit the track cell.
- **Rejected:** extra fleeck/actor-order as root (same mon; zero RNG
  in JS `m_move` was the missing track burn).
- **C locus:** `trap.c` `m_harmless_trap` BEAR_TRAP; `mon.c` `mfndpos`
  known-trap skip; `monmove.c` mtrack `rn2(4*(cnt-j))`.
- **Change:** `js/trap.js` `m_harmless_trap` BEAR/WEB/RUST/VIBRATING/
  PIT-clinger arms; `js/monsters.js` `amorphous`/`unsolid`/`is_whirly`
  + `M1_UNSOLID`.
- **Verification:** seg6 **4080→10280** (`obj_resists` vs `rn2(4)`);
  positional **47171**/105529 Scr **70**/1953; full **19/44** Scr
  **1445** RNG **173370**; green+strict PASS; 17-session PASS cohort
  held.
- **Named omissions:** flyer/`check_in_air` preamble; sleep/fire/
  anti-magic resists; webmaker; `defended()`; bear-trap
  `trapeffect` body still no-op.
- **Next:** seed0030 seg6 @10280 `obj_resists` vs dochug/`dog_goal`;
  or quest `getbones`.

## D-0246 — `goodpos`/`accessible` reject closed doors

- **Status:** fixed
- **Symptom:** seed0030 seg6 @10280 — C `rn2(100)` `obj_resists` via
  `dog_goal` vs JS `rn2(4)` (follow path; no fobj in SQSRCHRADIUS).
- **Cause:** after `>` descend, `mon_arrive`→`mnexto`→`enexto` shuffled
  the same near-candy rings, but JS `goodpos` used bare `ACCESSIBLE(typ)`
  and accepted the first candy cell `(34,7)` — a **closed door**
  (`typ=DOOR`, `doormask=D_CLOSED`). C `accessible()` =
  `ACCESSIBLE && !closed_door`, so it skipped that cell and placed the
  kitten elsewhere (near gold in range → `dogfood`→`obj_resists`).
  JS pet at the door had inbox=0 so never burned `obj_resists`.
- **Rejected:** missing floor gold at a fixed map cell; fobj chain
  corruption; dog_goal search-box bug (pet coords were wrong because
  placement was wrong).
- **C locus:** `teleport.c` `goodpos` → `accessible`; `monmove.c`
  `accessible`/`closed_door`; `dog.c` `mon_arrive`/`mnexto`.
- **Change:** `js/teleport.js` `goodpos` — `accessible` with closed/
  locked door reject; occupied `m_at` when `mtmp`; boulder skip;
  amorphous closed-door early-out; `goodpos_onscary` stub.
- **Verification:** seg6 **10280→10815** (themerms/`nhlib` shuffle);
  positional **47132**/105529 Scr **70**/1953; full **19/44** Scr
  **1445** RNG **173331**; green+strict PASS; 17-session PASS cohort
  held.
- **Named omissions:** `SURFACE_AT` drawbridge under-typ; full
  `goodpos_onscary` Elbereth/scare-scroll/altar-vampire; pool/lava
  swimmer·flyer arms; `passes_walls`/`may_passwall` early-out;
  `is_exclusion_zone`.
- **Next:** seed0030 seg6 @10815 themerms/`nhlib` shuffle arity; or
  quest `getbones`.

## D-0247 — themerms `Buried zombies` fill body

- **Status:** fixed
- **Symptom:** seed0030 seg6 @10815 — C `rn2(4)` `nhlib.lua` shuffle vs
  JS `rn2(1)` (JS already past the fill and into the next room pick).
- **Cause:** after `filler_region` themed chance + fill reservoir
  `rn2(1)..rn2(13)`, both sides picked **Buried zombies** (7th eligible
  at lit/diff≤3). C runs `shuffle({kobold,gnome,orc,dwarf})` then
  `(width*height)/2` buried CORPSE creations (`mksobj`→`set_corpsenm`→
  `bury_an_obj`→`stop_timer(rot)`→`start_timer(zombify,990+rn2(21))`).
  JS had no `THEMEROOM_FILL_BODIES` entry, so the fill was a no-op and
  the next themerms room reservoir started early (`rn2(1)`).
- **Rejected:** region/`selection` list-length mismatch as the arity
  gap (reservoir `rn2(1)..rn2(13)` matched; peel was missing fill body).
- **C locus:** `themerms.lua` Buried zombies; `nhlib.lua` shuffle;
  `sp_lev.c` `create_object` buried CORPSE/`set_corpsenm`; `dig.c`
  `bury_an_obj`; `nhlobj.c` object timers.
- **Change:** `js/mklev.js` `themeroom_fill_buried_zombies` + register;
  `js/mkobj.js` export `set_corpsenm`/`obj_stop_timers`/`start_timer`.
- **Verification:** seg6 **10815→11830** (`create_room` positioned
  `rnd(5)` vs JS `rn2(6)`); positional **47186**/105529 Scr **71**/1953;
  full **19/44** Scr **1456** RNG **180270**; green+strict PASS;
  17-session PASS cohort held.
- **Named omissions:** other fill bodies (Ice/Trap room/Garden/…);
  `bury_an_obj` Rider/invocation early-return without `rn2`; timer fire
  for `ZOMBIFY_MON`; `oeaten` rescale in `set_corpsenm`.
- **Next:** seed0030 seg6 @11830 positioned `create_room` / Nesting
  follow-on; or quest `getbones`.

## D-0248 — sized rectangular themerms outer `create_room`

- **Status:** fixed
- **Symptom:** seed0030 seg6 @11830 — C `rnd(5)` @ `create_room`
  positioned vs JS `rn2(6)` (fully-random room branch).
- **Cause:** after matched themerms reservoir + `build_room` `rn2(100)` +
  `litstate_rnd`, pick was **Fake Delphi** (`rn2(1001)=0`). C
  `des.room({w=11,h=9})` → `create_room(-1,-1,11,9,-1,-1)` positioned
  path (`rnd(5)`×2). JS treated Fake Delphi (and other sized rectangular
  themerms) as default fully-random `create_room(-1,-1,-1,-1,…)`.
- **C locus:** `themerms.lua` Fake Delphi / Huge / Pillars / Mausoleum /
  Random dungeon feature / Twin businesses; `sp_lev.c` `build_room` /
  `create_room` positioned @1580.
- **Change:** `js/mklev.js` `themerooms_generate` — outer `room_w`/`room_h`
  (and THEMEROOM rtype where needed) before `rn2(100)` for those rooms.
- **Verification:** seg6 **11830→13801** (`rnd_defensive_item` vs JS
  `rn2(100)`); positional **47366**/105529 Scr **70**/1953; full
  **19/44** Scr **1455** RNG **180450**; seed0013 prefix **560→4004**
  Scr **1→6**; green+strict PASS; 17-session PASS cohort held.
- **Named omissions:** nested `create_subroom`/door for Fake Delphi /
  Huge / Nesting / Mausoleum / Twin / Room-in-room; Pillars terrain;
  Random-feature center terrain; Water vault is map-path.
- **Next:** seed0030 seg6 @13801 `m_initinv`→`rnd_defensive_item`; or
  quest `getbones`.

## D-0249 — `m_initinv` → `rnd_defensive_item`

- **Status:** fixed
- **Symptom:** seed0030 seg6 @13801 — C `rn2(11)` @ `rnd_defensive_item`
  vs JS `rn2(100)` @ `m_initinv` misc gate.
- **Cause:** after shopkeeper kit + matched `rn2(50)=1`, C calls
  `mongets(mtmp, rnd_defensive_item(mtmp))` (`muse.c`). JS burned
  `rn2(50)` then left an empty stub and jumped to `rn2(100)`.
- **C locus:** `makemon.c` `m_initinv` @826–827; `muse.c`
  `rnd_defensive_item` @1222.
- **Change:** `js/makemon.js` — port `rnd_defensive_item` (difficulty
  switch, noteleport try-again, Sokoban dig, floater/isshk dig→0,
  Pestilence sickness); wire `mongets`; add `PM_SOLDIER && rn2(13)`
  early return; `attacktype(AT_EXPL)` shared with `rnd_misc_item`.
- **Verification:** seg6 **13801→15369** (`mcalcmove` vs `distfleeck`);
  positional **47351**/105529 Scr **79**/1953; full **19/44** Scr
  **1464** RNG **180435**; green+strict PASS; 17-session PASS cohort
  held.
- **Named omissions:** hell-court `noteleport_level` / `is_covetous`
  bypass; mercenary/nymph/giant/… `m_initinv` bodies still deferred.
- **Next:** seed0030 seg6 @15369 moveloop actor drift; or quest
  `getbones`.

## D-0250 — monster `trapeffect_hole` / TRAPDOOR migrate

- **Status:** fixed
- **Symptom:** seed0030 seg6 @15369 — C `rn2(12)` `mcalcmove` vs JS
  `rn2(5)` `distfleeck` after matched `m_move` `rn2(12)=8`.
- **Cause:** mon id 164 stepped (44,12)→(45,12) onto `TRAPDOOR`. C
  `postmov`→`mintrap`→`trapeffect_hole`→`mlevel_tele_trap`→
  `migrate_to_level` returns `Trap_Moved_Mon`, so dochug skips
  post-move `distfleeck` and EOT starts `mcalcmove`. JS
  `trapeffect_selector` no-op’d HOLE/TRAPDOOR (`Trap_Effect_Finished`),
  mon survived, and burned another fleeck.
- **C locus:** `trap.c` `trapeffect_hole` / `trapeffect_selector`;
  `teleport.c` `mlevel_tele_trap` / `teleport_pet`; `dog.c`
  `migrate_to_level`; `dungeon.c` `Can_fall_thru`.
- **Change:** `js/trap.js` — `trapeffect_hole` + selector wire;
  `js/teleport.js` — `teleport_pet` / `mlevel_tele_trap` (hole path) /
  `migrate_to_level`; `js/const.js` — `Can_dig_down` / `Can_fall_thru`;
  `MZ_HUGE` export.
- **Verification:** seg6 **15369→17712** (`peace_minded` `rn2(21)` vs
  `rn2(16)`); positional **47653**/105529 Scr **79**/1953; full
  **19/44** Scr **1464** RNG **180734**; green+strict PASS; 17-session
  PASS cohort held.
- **Named omissions:** hero `fall_through`; Sokoban yank messages;
  valley_level stronghold dest; MAGIC_PORTAL / LEVEL_TELEP /
  NO_TRAP `mlevel_tele_trap` arms; `mon_leave` worm/isshk; migrate
  light-source; in_sight fall pline; cursed-leash `get_mleash`.
- **Next:** seed0030 seg6 @17712 `peace_minded` arity; or quest
  `getbones`.

## D-0251 — `set_malign` + `xkilled` `adjalign(malign)`

- **Status:** fixed
- **Symptom:** seed0030 seg6 @17712 — C `rn2(21) @ peace_minded` vs
  JS `rn2(16)` (same site). Priest (initrecord 0) after one hostile
  kill.
- **Cause:** C `xkilled` always `adjalign(mtmp->malign)` after XP;
  `set_malign` at makemon sets malign (often `max(5,|mal|)` for
  always_hostile non-coaligned). One kill → record 0→5 →
  `rn2(16+5)=rn2(21)`. JS never called `set_malign` and skipped
  kill-time `adjalign`, so record stayed 0.
- **Rejected:** peace_minded formula bug; initrecord/hatemask arity
  (Priest initrecord is 0; only two co-align rolls in seg6, both
  arity 21).
- **C locus:** `makemon.c` `set_malign`; `mon.c` `xkilled` alignment
  block; `attrib.c` `adjalign` / `ALIGNLIM`.
- **Change:** `js/makemon.js` `set_malign` + call after mpeaceful /
  m_initgrp hostile force; `js/attrib.js` `adjalign`/`ALIGNLIM`;
  `js/uhitm.js` `xkilled` peaceful-5 + `adjalign(malign)`.
- **Verification:** seg6 **17712→18683** (`dmgval` vs `rn2(5)` after
  dart thitm); peace_minded `rn2(21)` matched; full **19/44** Scr
  **1464** RNG **180734**; green+strict PASS; 19-session PASS cohort
  held.
- **Named omissions:** MS_LEADER malign=-20 (msound not extracted);
  quest/nemesis/guardian/priest/tame special adjalign arms; peaceful
  luck `rn2(2)`/`change_luck`; `adj_erinys` body.
- **Next:** seed0030 seg6 @18683 dart/`dmgval`; or quest `getbones`.

## D-0252 — `thitm` hit → `dmgval` (seed0030 seg6 @18683)

- **Status:** fixed
- **Symptom:** seed0030 seg6 @18683 — C `rnd(3) @ dmgval` vs JS
  `rn2(5)` after matched dart `rn2(6)` + `thitm` `rnd(20)=17`.
- **Cause:** C treated the roll as a **hit** and called
  `dmgval(obj, mon)` (`rnd(oc_wsdam)` for dart). JS `thitm` hit arm
  stubbed `dam = 1` without burning `dmgval` RNG, so the next fleeck
  `rn2(5)` landed in the dmgval slot. (Not a miss — NOTES miss theory
  was wrong.)
- **C locus:** `trap.c` `thitm` (dam = dmgval; if dam < 1 then 1).
- **Change:** `js/trap.js` `thitm` calls real `dmgval(obj, mon)` with
  clamp ≥1 on the hit/obj path.
- **Verification:** seg6 **18683→18840** (`m_move` `rn2(24)` vs
  `rn2(16)`); full **19/44** Scr **1464** RNG **180765**; green+strict
  PASS; 17-session PASS cohort held.
- **Named omissions:** `stone_missile`/`passes_rocks` harmless arm
  (strike=0, keep missile); `nocorpse` `-AD_RBRE` (still `-AD_PHYS`);
  full `dealloc_obj` on used-up hit missile.
- **Next:** seed0030 seg6 @18840 `m_move` track arity; or quest
  `getbones`.

## D-0253 — gnome position drift → m_balks_at_approaching (seed0030 seg6 @18840)

- **Status:** fixed (map theory **rejected**; mon-pos peel → balks)
- **Symptom:** seed0030 seg6 @18840 — C `rn2(24)/rn2(28)/rn2(32) @
  m_move` vs JS `rn2(16)` after matched fleeck (post D-0252).
- **Rejected:**
  1. hostile `m_move` track `rn2(4*(cnt-j))` / `jcnt` /
     missing `m_avoid_kicked_loc` (hostiles ignore kickedloc).
  2. mid-game `mdig_tunnel` opening (28,13).
  3. first DoD `>` ordinary `makecorridors` path.
  4. **Mines mkmap omitting ROOM at (28,13)** — JS and C both end with
     **TRCORNER** at (28,13); join dig `(28,3)→(29,18)` on x=29;
     cavern room `(12,2)-(28,12)` hy=12; C `somex` widths match JS
     room bounds; Mines mklev RNG **18225/18225**. Apparent C
     “kobold `k`@(28,13)” was **DEC Special Graphics** `k`→`┐`
     (SO/G1 charset), not a monster. Same class of misread as
     D-0185 wall red herrings.
- **Evidence (cause):**
  1. Peel Mines (dnum=2); hero `@(29,13)` matches; (28,13)=┐ wall both.
  2. Steps 155–170: visible C `G` positions match JS (incl.
     `(26,11)`+`(28,12)` at 170).
  3. Step 174: C `G@(26,10)`+`G@(22,9)`; JS approached from (26,11)
     toward hero.
  4. DIAG: `PM_GNOME#240@(26,11)` `mw=BOW` inv=[ARROW,BOW] `appr=1`
     `edist=13` chose `(27,12)`; C `m_balks_at_approaching` with
     `m_has_launcher_and_ammo` returns `-1` (flee).
- **C locus:** `monmove.c` `m_balks_at_approaching`;
  `mthrowu.c` `m_has_launcher_and_ammo`; selection `appr==-2` band.
- **Change:** ported `m_has_launcher_and_ammo`, `m_balks_at_approaching`
  (launcher/pole/aklys/`ranged_attk_available`), wired into hostile
  `m_move`, and `appr==-2` preferred-range selection. Exported
  `is_pole` / `m_canseeu`. Named omission: `m_seenres` gate inside
  `ranged_attk_available`; leppie/Invis/`!mcansee`/shortsighted.
- **Verification:** seg6 **18840→18913** (`trapeffect_magic_trap`);
  full **19/44** Scr **1464** RNG **180712**; green+strict PASS;
  17-session PASS cohort held.
- **Next:** seed0030 seg6 @18913 `trapeffect_magic_trap`; or quest
  `getbones`.

## D-0254 — trapeffect_magic_trap monster rn2(21) (seed0030 seg6 @18913)

- **Status:** fixed
- **Symptom:** seed0030 seg6 @18913 — C `rn2(21) @ trapeffect_magic_trap`
  vs JS `rn2(5)` fleeck after matched m_move/fleeck (post D-0253).
- **Evidence:** both engines matched through `rn2(28) @ m_move` at 18912;
  C then burned magic-trap immunity `rn2(21)=4` (nonzero → no fire);
  JS `trapeffect_selector` default no-op’d MAGIC_TRAP so next fleeck
  occupied the slot. Second hit @19604 also `rn2(21)≠0`.
- **C locus:** `trap.c` `trapeffect_magic_trap` / `trapeffect_fire_trap`;
  selector MAGIC_TRAP/FIRE_TRAP cases.
- **Change:** ported monster `trapeffect_magic_trap` (`rn2(21)` → fire);
  monster `trapeffect_fire_trap` envelope (`d(2,4)`, resists_fire via
  mintrinsics/mextrinsics, golem alts, thitm/`rn2(num+1)`, naked
  `burnarmor` rn2(5) loop); wired FIRE_TRAP/MAGIC_TRAP in selector.
- **Named omissions:** hero `rn2(30)`/`domagictrap`/`dofiretrap`;
  `data->mresists` (not extracted); `destroy_items`/`ignite_items`/
  `burn_floor_objects`/`melt_ice`/`surface()`; armor erode in burnarmor;
  towel drying.
- **Verification:** seg6 **18913→19831** (`next_ident` after
  `can_make_bones`); full **19/44** Scr **1463** RNG **180519**;
  green+strict PASS; 17-session PASS cohort held.
- **Next:** seed0030 seg6 @19831 `next_ident` vs `rn2(2)`; or quest
  `getbones`.

## D-0255 — fatal losehp→done + bones corpse/ghost (seed0030 seg6 @19831)

- **Status:** fixed
- **Symptom:** seed0030 seg6 @19831 — C `rnd(2) @ next_ident` vs JS
  `rn2(2)` after value-matched `rn2(2)=1` (looked like can_make_bones).
- **Evidence:** DIAG stacks — JS idx 19830 was `exercise`←`thitu` after
  fatal `losehp` that only set gameover and **returned**; 19831–32 were
  `should_mulch_missile`. C `losehp`→`urgent_pline`+`done(DIED)` is
  noreturn, so exercise/mulch never run; real `can_make_bones` then
  `mk_named_object(CORPSE)`→`savebones` drop+`PM_GHOST`.
- **C locus:** `hack.c` `losehp`; `end.c` `really_done` corpse/
  `savebones`; `bones.c` `drop_upon_death` / ghost `makemon`.
- **Change:** `losehp` sets `_losehp_needs_done`; `thitu`/`m_throw`
  await `finish_losehp_done` and skip post-hit RNG; `really_done`
  `can_make_bones` before flush; `mk_named_object` corpse +
  `drop_upon_death` + `makemon(PM_GHOST, MM_NONAME)` when bones_ok.
- **Named omissions:** bones file I/O; give_to_nearby_mon body;
  arise/statue arms; ebones; unleash/unpunish/dismount/dmonsfree;
  invent discover_object; formatkiller epitaph; Lifesaved/Die?;
  sync `losehp` callers that do not await `finish_losehp_done`
  (moveloop stop still prevents further turns).
- **Verification:** seg6 **FULL** 19884/19884; next seg7 @9290
  `trapeffect_slp_gas_trap`; full **19/44** Scr **1463** RNG
  **180984**; seed0030 positional **47905**/105529; green+strict
  PASS; 17-session PASS cohort held.
- **Next:** seed0030 seg7 @9290 `trapeffect_slp_gas_trap`; or quest
  `getbones`.

## D-0256 — trapeffect_slp_gas_trap monster rnd(25) (seed0030 seg7 @9290)

- **Status:** fixed
- **Symptom:** seed0030 seg7 @9290 — C `rnd(25) @ trapeffect_slp_gas_trap`
  vs JS fleeck `rn2(5)` after matched fleeck (post D-0255 seg6 FULL).
- **Evidence:** both engines matched through `rn2(5) @ distfleeck` at
  9289; C then burned `sleep_monst(rnd(25), -1)` on a mon that stepped
  on SLP_GAS; JS `trapeffect_selector` default no-op’d SLP_GAS_TRAP so
  next fleeck occupied the slot.
- **C locus:** `trap.c` `trapeffect_slp_gas_trap` / selector case;
  `mhitm.c` `sleep_monst`; `mondata.h` `breathless`; `prop.h` `mr_bit`.
- **Change:** ported monster `trapeffect_slp_gas_trap` (guards →
  `sleep_monst(rnd(25), -1)` → pline/seetrap); `mr_bit`/`resists_sleep`;
  `M1_BREATHLESS`/`breathless`; wired SLP_GAS_TRAP in selector.
- **Named omissions:** hero cloud/`fall_asleep`/`steedintrap`;
  `data->mresists`; `defended(AD_SLEE)`; how≥0 mimic/`resist`;
  `shieldeff`; full `finish_meating` mimic AP; `m_harmless_trap` sleep
  resist arm.
- **Verification:** seg7 **9290→9811** (`m_move` track `rn2(32)`);
  full **19/44** Scr **1463** RNG **180932**; seed0030 positional
  **47853**/105529; green+strict PASS; 17-session PASS cohort held.
- **Next:** seed0030 seg7 @9811 `m_move` track/`cnt`; or quest
  `getbones`.

## D-0257 — mcalcdistress mfrozen thaw (seed0030 seg7 @9811)

- **Status:** fixed
- **Symptom:** seed0030 seg7 @9811 — C `rn2(32) @ m_move` track vs JS
  `rn2(3)` (dog_move) after matched fleeck (post D-0256).
- **Evidence:** JS actor after fleeck was pet id57 `mtame=10` entering
  `dog_move`; C provenance was hostile `m_move` track. Sleep-gas
  (D-0256) set `mcanmove=0`/`mfrozen=amt`, but JS never called
  `mcalcdistress`, so the victim stayed helpless forever while C
  thawed at EOT and moved.
- **C locus:** `mon.c` `mcalcdistress`/`m_calcdistress`; `allmain.c`
  moveloop EOT before movement reallocation; `monmove.c` `mon_regen`.
- **Change:** ported `mcalcdistress` (mblinded/mfrozen/mfleetim
  timeouts + `mon_regen` HP/`mspec_used`); wired into `moveloop_core`
  before `mcalcmove` reallocation; `M1_REGEN`/`regenerates`.
- **Named omissions:** mmove==0 `minliquid`; `decide_to_shapeshift`;
  `were_change` (no RNG unless cham/were); full `healmon`/`finish_meating`
  from digest path.
- **Verification:** seg7 **9811→10404** (`use_offensive`); full
  **19/44** Scr **1463** RNG **181210**; seed0030 positional
  **48131**/105529; green+strict PASS; 17-session PASS cohort held.
- **Next:** seed0030 seg7 @10404 `use_offensive`/`mbhitm`; or quest
  `getbones`.

## D-0258 — find_offensive nomore (seed0030 seg7 @10404)

- **Status:** fixed
- **Symptom:** seed0030 seg7 @10404 — C `rn2(8) @ use_offensive`
  (`mbhit`/`rn1(8,6)`) vs JS `rn2(92)` (`u_catch_thrown_obj` after
  potion `m_throw`). Screen: “Swidnica zaps a short wand!”.
- **Rejected:** invent drift / C missing POT_PARALYSIS — both created
  GOLD→WAN_STRIKING→KEY→POT via matched `rnd_offensive_item` rn2(13)=6
  + kit case 3; invent order matched at `use_offensive`.
- **Cause:** C `muse.c` `#define nomore(x) if (has_offense == x)
  continue` — once WAN_STRIKING is selected, later invent objects hit
  `nomore(MUSE_WAN_STRIKING)` before potion checks and skip. JS
  overwrote with last POT_* → throw → DEX catch `rn2(92)`.
- **C locus:** `muse.c` `find_offensive` invent loop / `nomore`;
  `use_offensive` WAN_STRIKING→`mbhit(rn1(8,6))`.
- **Change:** `js/muse.js` `find_offensive` — port `nomore` continue
  for implemented offense types (striking + pot_*).
- **Named omissions:** ray-wand / teleport / undead / scroll / camera
  offense + their nomores; `find_misc`/`find_defensive` nomore;
  `rnd_offensive_item` case0 hard_helmet FALLTHROUGH→WAN_STRIKING
  (JS still returns SCR_EARTH).
- **Verification:** seg7 **FULL** 10584/10584; next seg8 @3088
  `dog_goal`; full **19/44** Scr **1463** RNG **180985**; seed0030
  positional **47906**/105529; green+strict PASS; 17-session PASS
  cohort held.
- **Next:** seed0030 seg8 @3088 `dog_goal`; or quest `getbones`.

## D-0259 — dog_goal udist after pet step (seed0030 seg8 @3088)

- **Status:** fixed
- **Symptom:** seed0030 seg8 @3088 — C `rn2(4) @ dog_goal` vs JS
  `rn2(1)`; later (after false leads) first real command split @3232
  C `rn2(7) @ do_attack` vs JS `rn2(5)`.
- **Matched through (pre-fix):** values through 3231 often matched by
  coincidence while call sites differed.
- **Rejected (diagnosis phase):**
  - APPORT/invent-edible/`rn2(8)` arity — values match; apport=3.
  - Tight squeeze / kickedloc / Displaced / Elbereth onscary.
  - `m_in_out_region` place abort — worsens prefix.
  - “mfndpos drops (65,15)” as first cause.
  - Hero still on stairs as *primary* root — symptom of early `\r`.
- **Cause:** two stacked omissions:
  1. **`armoroff` skipped `oc_delay`** — JS always immediate
     `*_off`+`off_msg`. C `nomul(-oc_delay)` + `afternmv=*_off` +
     `nomovemsg="You finish taking off your %s."` (splint → `"mail"`,
     delay 5). Without occupation, `T` returned early and later keys
     (`e`/` `/`\r`) ran as commands while C was still in takeoff turns /
     `--More--`.
  2. **Session `\r` / ICRNL / rush** — `record-session.mjs` maps CR→LF
     (tmux ICRNL). `C('j')==10=='\n'` is `do_rush_south` under
     `!number_pad`. JS fed raw CR (unknown) and lacked Ctrl+dir rush.
- **Change:** port `armoroff` delay path; `runSegment` ICRNL `\r`→`\n`;
  `rushDirFromCtrl` for keys 1..26 only (plain `j` must not match).
- **Verification:** seg8 prefix **3088→3263** (`passivemm`); seed0030
  positional **47906→47966**; seed0013 **4004→4367**; full **19/44**
  Scr **1463** RNG **181305**; green+strict+17-session PASS cohort.
- **Next:** D-0260 seg8 @3263 `passivemm`.

## D-0260 — newmonhp level-0 min HP (seed0030 seg8 @3263)

- **Status:** fixed
- **Symptom:** after D-0259, C `rn2(3)=2 @ passivemm(mhitm.c:1363)` vs
  JS `rn2(2)=1` (then dog_move/mattackm drift).
- **Matched through:** knockback `rn2(3)`/`rn2(6)` @3261–3262.
- **Rejected:** missing `passivemm` `rn2(3)` stub / AD_ACID polarity —
  JS already burned `rn2(3)` when defender lived; peel was wrongful kill.
- **Root cause:** little dog (`PM_LITTLE_DOG`) bite `d(1,6)=1` vs jackal
  with JS `mhpmax=1`. C `makemon.c` `newmonhp`: level-0 uses `basehp=1`,
  `rnd(4)`, then `if (mhpmax == basehp) mhpmax++` so min HP is **2**.
  JS only boosted the `d(m_lev,8)==m_lev` arm, so `rnd(4)=1` stayed 1 →
  kill → `corpse_chance` `rn2(2)` instead of live `passivemm` `rn2(3)`.
- **Fix:** `js/makemon.js` `newmonhp` — shared `basehp` boost for both
  level-0 `rnd(4)` and `d(m_lev,8)` paths (golems/riders/dragons still
  deferred).
- **Verification:** seg8 prefix **3263→3310** (`obj_resists` vs
  `rn2(4)`); green+strict PASS; 17-session PASS cohort; full **19/44**
  Scr **1463** RNG **181294**; seed0030 **47955**/105529.
- **Next:** D-0261 seg8 @3068 `dog_move` rn2(1) vs fleeck.

## D-0261 — Ctrl-rush `run=3` + await muse wand plines (seed0030 seg8)

- **Status:** fixed
- **Symptom:** seg8 first mismatch @3310 — C katana `obj_resists` after
  `d`/`a` drop vs JS follow `rn2(4)` (no floor katana). Earlier
  @3068 fleeck theory **falsified**. Stable no-DIAG peel was @3067
  (JS extra floor katana) when unawaited wand `more()` raced and ate
  `T`/`e`; DIAG `await import` inside `more()` perturbed async order.
- **C locus:** `cmd.c` `do_rush_*` → `set_move_cmd(dir, 3)`;
  `hack.c` `lookaround` stops any non-safemon when `run != 1`;
  `muse.c` `mzapwand`/`mbhitm` → blocking `pline`/`more`.
- **Cause:** (1) JS Ctrl-rush set `context.run=1` (capital-run
  semantics) so lookaround ignored a hostile jackal behind the hero and
  `continue_run` took an extra step — `d` never reached `dodrop`.
  (2) `muse.js` `mbhitm`/`mzapwand` called async `pline` without
  `await`, so `--More--` raced and stole early keys.
- **Rejected as root:** more()-only timing without run-mode fix;
  mfndpos squeeze @3068; missing `dodrop` alone (ported prior iter).
- **Change:** `js/cmd.js` Ctrl-rush `run=3`, capital run `run=1`;
  `js/muse.js` await `mzapwand`/`mbhit`/`mbhitm`/hurl plines;
  `js/monmove.js` await `use_misc`. Prior iter: `dodrop`/`rhack` `'d'`.
- **Verification:** seg8 RNG **FULL** 3476/3476; green+strict PASS;
  17-session PASS cohort; full **19/44** Scr **1563** RNG **182531**;
  seed0013 RNG **full** Scr **57**/59; seed0030 Scr **85**/1953;
  next seg9 @7196 `get_shop_item`.
- **Next:** diagnose seed0030 seg9 @7196 `get_shop_item` / shop stock.

## D-0262 — `set_mimic_sym` shop arm `get_shop_item` (fixed)

- **Status:** fixed
- **Symptom:** after D-0261, seg9 @7196 — C `rnd(100) @ get_shop_item`
  vs JS `rn2(50)` (`m_initinv`).
- **C locus:** `makemon.c` `set_mimic_sym` `rt >= SHOPBASE` —
  `rn2(10) >= depth(&u.uz)` else `get_shop_item(rt - SHOPBASE)` then
  assign_sym/`mkobj` for appearance (not only `stock_room`/`mkshobj_at`).
- **Rejected:** stock_room eligibility / mkshobj_at path drift as root —
  both matched through mimic `rn2(10)=1`; peel was deferred shop body.
- **Change:** `js/makemon.js` `set_mimic_sym` — shop arm calls
  `get_shop_item`, FODDERSHOP vegetarian jelly/mold, RANDOM_CLASS remap,
  shared assign_sym/`mkobj`; use `depth()` not bare `dlevel`.
- **Verification:** seg9 **7196→8138**; green+strict PASS; 17-session
  PASS cohort; full **19/44** Scr **1563** RNG **182545**; seed0030
  **47958**/105529; next @8138 `drinkfountain`/`rnd_class`.
- **Next:** diagnose D-0263 seg9 @8138.

## D-0263 — `drinkfountain`/`dofindgem` gem `rnd_class` (fixed)

- **Status:** fixed
- **Symptom:** seed0030 seg9 @8138 — C `rnd(862) @ rnd_class` after
  `drinkfountain` `rnd(30)=27` vs JS `rn2(3)` (dryup).
- **C locus:** `fountain.c` `drinkfountain` case 27 → `dofindgem` →
  `mksobj_at(rnd_class(DILITHIUM_CRYSTAL, LUCKSTONE-1), …, FALSE, FALSE)`
  + `SET_FOUNTAIN_LOOTED` + `exercise(A_WIS)`.
- **Root cause:** JS deferred case 27/28 as empty break; skipped gem
  create and went straight to dryup `rn2(3)`.
- **Change:** `js/fountain.js` `dofindgem` + FOUNTAIN_IS/SET_LOOTED;
  drink case 27 (looted fallthrough nymph still deferred); dip case 24
  same helper; export `rnd_class` from `js/mkobj.js`.
- **Verification:** seg9 **8138→8281**; green+strict PASS; 17-session
  PASS cohort; full **19/44** Scr **1563** RNG **182518**; seed0030
  **47931**/105529; next @8281 `distfleeck` vs `rn2(16)`.
- **Next:** diagnose D-0264 seg9 @8281.

## D-0264 — `dochug` NEED_HTH `mon_wield_item` (fixed)

- **Status:** fixed
- **Symptom:** seed0030 seg9 @8281 — C `rn2(5) @ distfleeck` vs JS
  `rn2(16)` (`m_move` track).
- **C locus:** `monmove.c` `dochug` — when `!peaceful||Conflict`,
  `inrange`, `dist2(mux,muy)<=8`, `attacktype(AT_WEAP)`, and
  `weapon_check==NEED_WEAPON`, set `NEED_HTH_WEAPON` and
  `mon_wield_item`; non-zero return spends the turn. `weapon.c`
  `select_hwep` / `mon_wield_item` NEED_HTH arm.
- **Root cause:** goblin @(67,12) hero mux @(69,10) `dist2=8`,
  `weapon_check=NEED_WEAPON`, invent ORCISH_DAGGER unwielded. C spent
  the turn wielding; JS skipped the gate and entered `m_move` track
  `rn2(16)`.
- **Rejected:** goblin nearby / mfndpos cnt-only / extra fleeck actor
  between shopkeeper and goblin (shopkeeper fleeck+post then goblin was
  correct; peel was missing wield spend).
- **Change:** `js/weapon.js` `select_hwep` + NEED_HTH in
  `mon_wield_item`; `js/monmove.js` `dochug` pre-move wield gate +
  `Conflict` in `want_move`.
- **Verification:** seg9 **8281→8352**; green+strict PASS; 17-session
  PASS cohort; full **19/44** Scr **1563** RNG **182533**; seed0030
  **47946**/105529; next @8352 `exercise` vs `rn2(3)` after `hitum`.
- **Next:** diagnose D-0265 seg9 @8352.

## D-0265 — `hitval` `oc_hitbon` (fixed)

- **Status:** fixed
- **Observed:** seed0030 seg9 @8352 — matched `hitum` `rnd(20)=13`;
  C `rn2(19) @ exercise` (DEX hit) then `dmgval`/`xkilled`; JS
  `rn2(3)` (`passive` miss path).
- **C locus:** `weapon.c` `hitval` — `spe` for weapon/weptool plus
  always `objects[otyp].oc_hitbon`; `uhitm.c` `find_roll_to_hit` adds
  `hitval` for AT_WEAP.
- **Cause:** JS `hitval` returned only `spe`. Daggers/`orcish dagger`
  have `oc_hitbon=+2` (extracted `a_ac` / `oc_oc1`). Missing +2 made
  `tmp <= 13` so JS missed while C hit and one-shot killed (`rnd(3)`
  dagger damage).
- **Change:** `js/uhitm.js` `hitval` — weapon/weptool `spe` +
  `objects[].a_ac` as `oc_hitbon`. Blessed/spear/trident/pick/artifact
  vs-mon arms still deferred.
- **Falsified:** incomplete post-hit `hmon`/`dmgval` branch — C and JS
  both reached `hitum` with the same die; divergence was to-hit score.
- **Verification:** seg9 **8352→8918**; green+strict PASS; 17-session
  PASS cohort; full **19/44** Scr **1563** RNG **182547**; seed0030
  **47960**/105529; next @8918 hero `trapeffect_magic_trap`/
  `domagictrap`.
- **Next:** port hero MAGIC_TRAP `dotrap`/`domagictrap` (D-0254 mon
  path exists; hero path still deferred).

## D-0266 — hero MAGIC_TRAP / domagictrap (fixed)

- **Status:** fixed
- **Observed:** seed0030 seg9 @8918 — C `rn2(30) @ trapeffect_magic_trap`
  then `rnd(20)=11 @ domagictrap` vs JS `rn2(5)` fleeck.
- **C locus:** `trap.c` `trapeffect_magic_trap` hero arm + `domagictrap`;
  `potion.c` `self_invis_message` / `make_blinded`/`incr_itimeout`
  helpers; `dog.c` `tamedog` for fate 19.
- **Cause:** JS hero MAGIC_TRAP returned immediately (monster-only
  D-0254). C `seetrap` + `rn2(30)` (nonzero → `domagictrap`); this seed
  took fate=11 HInvis toggle.
- **Change:** ported hero `trapeffect_magic_trap` (explosion +
  `domagictrap`); `domagictrap` fate envelope; `dofiretrap` null-box
  floor path; hero FIRE_TRAP → `dofiretrap`; minimal `tamedog` for
  fate 19.
- **Named omissions:** `seffects(SPE_REMOVE_CURSE)` fate 20;
  `destroy_items`/`ignite`/`burn_floor`/`melt_ice`/`surface`;
  `minuhpmax`/`losexp`; qstart prodigal/`at_dgn_entrance`; full
  `toggle_blindness`; `steedintrap` body; `tamedog` food/demon/covetous/
  wield arms.
- **Verification:** seg9 **8918→8943**; green+strict PASS; 17-session
  PASS cohort; full **19/44** Scr **1563** RNG **182691**; seed0030
  **48104**/105529; next @8943 `set_apparxy` vs fleeck after Invis.
- **Next:** diagnose post-HInvis `set_apparxy`/`perceives` (D-0267).

## D-0267 — `m_move` `set_apparxy` before shk|tame (fixed)

- **Status:** fixed
- **Observed:** seed0030 seg9 @8943 — after D-0266 HInvis, C
  `rn2(3) @ set_apparxy` vs JS `rn2(5) @ distfleeck`.
- **C locus:** `monmove.c` `m_move` — `set_apparxy` after meating /
  hides_under, **before** mtame / covetous / `isshk|isgd|ispriest`.
- **Cause:** JS called `shk_move` and returned on `xm=0` **before**
  `set_apparxy`. Peaceful shopkeeper still entered `m_move` via
  dochug `want_move` (`mpeaceful`); C consumed notseen `rn2(3)` then
  returned from shk; JS skipped to post-`m_move` fleeck.
- **Rejected:** mux/perceives/Invis flag drift for the next monster —
  DIAG showed the actor was `isshk` at (8,14) with correct Invis.
- **Change:** reorder `js/monmove.js` `m_move` to call `set_apparxy`
  before mtame/shk|gd|priest (match C). Named omission remains:
  `hides_under` `rn2(10)` early return before apparxy.
- **Verification:** seg9 **8943→10461**; green+strict PASS; 17-session
  PASS cohort; full **19/44** Scr **1563** RNG **182691**; seed0030
  runner flat still **48104**/105529 (earlier-segment trailing extras);
  next @10461 `rn2(11) @ m_move` Invis should_see appr gate.
- **Next:** port `m_move` `should_see && Invis && !perceives && rn2(11)`
  → `appr=0` (D-0268).

## D-0268 — `m_move` Invis `should_see` `rn2(11)` → `appr=0` (fixed)

- **Status:** fixed
- **Observed:** seed0030 seg9 @10461 — C `rn2(11) @ m_move:1866` vs JS
  `rn2(2)` (mfndpos/getitems).
- **C locus:** `monmove.c` `m_move` not_special — after `should_see`,
  `!mcansee || (should_see && Invis && !perceives && rn2(11)) ||
  mappear/uundetected/peaceful/stalker-bat-light rn2(3)` → `appr=0`;
  then `leppie_avoidance` / `m_balks` / `gettrack`.
- **Cause (partial):** JS early-exited peaceful and omitted the Invis
  `rn2(11)` OR (and stalker/leppie order). Porting the gate alone did
  not fire: DIAG showed `Invis=true` but `couldsee(43,10)=false`
  (`should_see` false) while C burned `rn2(11)`.
- **Prerequisite:** D-0269 — SCORR→CORR left stale `viz_clear`.
- **Change:** restructure `js/monmove.js` `m_move` appr setup to match C
  (engulfing_u, Invis rn2(11), mappear, peaceful, stalker/bat/light
  rn2(3), leppie_avoidance, balks, gettrack). Named omission:
  shortsighted → `appr=0` after track selection.
- **Verification:** with D-0269/D-0270, seg9 **10461→10811**; green+strict
  PASS; 19-session PASS cohort; full **19/44** Scr **1563** RNG
  **182673**; seed0030 flat **48086**/105529.
- **Next:** diagnose seg9 @10811 C `next_ident` vs JS `rn2(5)`.

## D-0269 — detect SCORR/SDOOR `recalc_block_point` (fixed)

- **Status:** fixed
- **Observed:** after D-0268 gate port, still @10461 — `couldsee` false
  for monster at (43,10) with hero at (45,10); `viz_clear[10][44]=0`
  while `_blocks(44,10)=false` and typ=CORR.
- **C locus:** `detect.c` `dosearch0` / `findone` / `show_map_spot` —
  SCORR→CORR / SDOOR convert call `unblock_point` /
  `recalc_block_point`.
- **Cause:** JS used `vision_recalc(1)`, which recomputes IN_SIGHT from
  existing `viz_clear` and does **not** rebuild opacity. Cell was SCORR
  (typ 15, blocks) then revealed to CORR without refreshing
  `viz_clear`, so LOS stopped at the stale blocker between hero and
  target.
- **Change:** `js/detect.js` — replace those `vision_recalc(1)` calls
  with `recalc_block_point(x,y)`.
- **Verification:** seg9 **10461→10811** (with D-0268); green+cohort
  PASS; nuclear `vision_reset` each recalc had predicted the same lift.
- **Next:** same as D-0268 (@10811).

## D-0270 — `place_object` / floor extract boulder vision (fixed)

- **Status:** fixed
- **Observed:** companion while diagnosing D-0269; D-0242 named
  `place_object` boulder `block_point` as deferred.
- **C locus:** `mkobj.c` `place_object` (first boulder → `block_point`);
  `remove_object` (boulder → `recalc_block_point`); floor
  `obj_extract_self` → `remove_object`.
- **Change:** `js/mkobj.js` — after placing first boulder on a pile,
  `recalc_block_point`; on floor extract of boulder, same. Also place
  non-boulders under consecutive boulders like C.
- **Verification:** green+cohort PASS; not the seg9 @10461 root (no
  boulder at 44,10) but retires the D-0242 omission.
- **Next:** same as D-0268.

## D-0271 — make_corpse undead before G_NOCORPSE (fixed)

- **Status:** fixed
- **Observed:** seed0030 seg9 @10811 — C `rnd(2) @ next_ident` after
  matched `xkilled`/`corpse_chance`; JS `rn2(5) @ distfleeck`.
- **DIAG:** kill was `PM_KOBOLD_ZOMBIE` @(44,10); `mvflags` has
  `G_NOCORPSE` from geno; JS `make_corpse` early-returned; C still
  creates a mapped living corpse.
- **C locus:** `mon.c` `make_corpse` — zombie/mummy/vampire switch arms
  call `undead_to_corpse` + `mkcorpstat` **before** `default_1`'s
  `G_NOCORPSE` check (`/* All special cases should precede … */`).
- **Cause:** JS gated `G_NOCORPSE` first, skipping undead specials.
  Zombies carry geno `G_NOCORPSE` so wishes cannot create those
  corpses, but kills still leave `undead_to_corpse` corpses (+
  `TAINT_AGE+1` age).
- **Change:** `js/mhitm.js` `make_corpse` — if `undead_to_corpse(mndx)
  !== mndx`, `mkcorpstat` with living species + age adjust, then
  return; else `default_1` G_NOCORPSE. `js/trap.js` shares that
  export (removed duplicate ordinary-only copy).
- **Named omission:** dragon scales, unicorn horn, worm tooth, golem
  drops, and other pre-`G_NOCORPSE` switch arms.
- **Verification:** seg9 **10811→12411**; green+strict PASS; 17-session
  PASS cohort; seed0030 flat **48092**/105529 Scr **85**/1953.
- **Next:** diagnose seg9 @12411 C `exercise` after `hitum` vs JS
  `rn2(3)` (gas-spore / AT_BOOM path nearby in C).

## D-0272 — find_roll_to_hit Luck bonus (fixed)

- **Status:** fixed
- **Observed:** seed0030 seg9 @12411 — matched `hitum` `rnd(20)=15`;
  C `rn2(19) @ exercise` then `dmgval`/`xkilled`/`corpse_chance` AT_BOOM;
  JS `rn2(3)` (`passive` miss).
- **DIAG:** Healer + scalpel vs gas spore; `tmp=15` `dieroll=15` miss;
  datetime `20260305120000` is full moon (`change_luck(+1)`).
- **C locus:** `uhitm.c` `find_roll_to_hit` —
  `sgn(Luck)*((abs(Luck)+2)/3)`; `you.h` Luck; `allmain.c`
  full-moon `change_luck(1)`.
- **Cause:** JS deferred Luck to-hit. With `Luck=1` that term is `+1`;
  without it `tmp==dieroll` → miss while C hits and one-shots.
- **Change:** `js/uhitm.js` `find_roll_to_hit` adds Luck bonus
  (trunc toward 0). Encumbrance/`utrap`/monk/orc-elf still deferred.
- **Verification:** seg9 **12411→12414**; green+strict PASS; 17-session
  PASS cohort; seed0030 flat **48141**/105529 Scr **85**/1953.
- **Next:** port `corpse_chance` AT_BOOM / `mon_explodes` @12414.

## D-0273 — corpse_chance AT_BOOM / mon_explodes (fixed)

- **Status:** fixed
- **Observed:** seed0030 seg9 @12414 — C `d(4,6) @ corpse_chance` then
  `d(4,6) @ mon_explodes` / `destroy_items` / `resist`; JS `rn2(3)`
  ordinary corpse path after matched `xkilled` treasure `rn2(6)`.
- **C locus:** `mon.c` `corpse_chance` AT_BOOM arm; `explode.c`
  `mon_explodes` / `explode` PHYS_EXPL_TYPE; `zap.c` `destroy_items`
  limit `rn2(5)` + `resist`.
- **Cause:** JS `corpse_chance` omitted gas-spore boom; burned ordinary
  `!rn2(tmp)` instead of `d(4,6)` + explosion.
- **Change:** `js/explode.js` — `mon_explodes` + PHYS `explode` subset
  (Boom/caught msgs, adjacent mon destroy_items+resist+HP, hero
  Half_phys + destroy_items + `exercise(A_STR)`). `corpse_chance` in
  `uhitm.js`/`mhitm.js`/`trap.js` ports AT_BOOM then returns false.
- **Named omission:** swallowed boom; non-PHYS boom; blast-kill
  xkilled/monkilled; fire/cold/elec explode; hallu/sparkle glyphs;
  `mr` table (use 0).
- **Verification:** seg9 **12414→16582**; green+strict PASS; 17-session
  PASS cohort; seed0030 flat **48156**/105529 Scr **85**/1953.
- **Next:** diagnose `getbones` load → `next_ident` @16582.

## D-0274 — getbones VFS load / next_ident (partial)

- **Status:** fixed (entity-count follow-on → D-0275)
- **Observed:** seed0030 seg9 @16581 matched `rn2(3)=0 @ getbones`;
  C `rnd(2) @ next_ident`×49 then `set_apparxy`; JS skipped open and
  continued `makelevel` (`rn2(3)`).
- **C locus:** `bones.c` `getbones`/`savebones`; `files.c`
  `set_bonesfile_name`/`open_bonesfile`; `restore.c` `restmonchn`/
  `restobjchn` ghostly `next_ident`; `mkobj.c` `next_ident`.
- **Cause:** JS `getbones` burned the chance roll then always returned
  false; `savebones` never wrote a VFS bones file (Elara seg6 Mines
  `bonM0.1`). Hermione’s branch descent could not load bones.
- **Change:** new `js/bones.js` — JSON VFS write/load with ghostly
  `next_ident` remap (mon then invent, fobj, buried, bill);
  `savebones`→`write_bonesfile`; `getbones`→`try_load_bones`.
- **Named omission:** binary savelev; resetobjs/set_ghostly; map-memory
  clear; cemetery; no_bones_level; Is_special boneid; give_to_nearby_mon
  body; (entity 48 vs 49 closed by D-0275).
- **Verification:** seg9 **16582→16630**; green+strict PASS; 17-session
  PASS cohort; seed0030 flat **48199**/105529 Scr **85**/1953.
- **Next:** D-0275 — place limbo killing missile before bones write.

## D-0275 — done_object_cleanup / limbo thrownobj

- **Status:** fixed
- **Observed:** after D-0274, JS bones remapped **48** entities; C **49**
  `next_ident` then `set_apparxy`. Elara seg6 RNG matched through
  `savebones`; free `_thrownobj` arrow (o_id≠floor stack) never entered
  `fobj`.
- **C locus:** `end.c` `done_object_cleanup` / `really_done`;
  `mthrowu.c` `m_throw`/`thitu` (fatal losehp noreturn skips
  `drop_throw`).
- **Cause:** JS `really_done` omitted `done_object_cleanup`; fatal
  missile stayed `OBJ_FREE` and was omitted from VFS bones.
- **Change:** port `done_object_cleanup` — place `_thrownobj`/
  `_kickedobj` when `where==OBJ_FREE` before bones/disclosure.
- **Named omission:** `inven_inuse`; ball/chain `placebc`;
  `accessible` closed_door gate (ACCESSIBLE-only approx).
- **Verification:** bones total **48→49**; seg9 **16630→16635**;
  green+strict PASS; 19-session PASS cohort + strict lengths.
- **Next:** post-load `m_move` arity @16635 (`rn2(8)` vs `rn2(5)`).

## D-0276 — bones mtrack serialize / restore

- **Status:** fixed
- **Observed:** seed0030 seg9 @16635 — after 49 `next_ident` + matched
  `set_apparxy`/`distfleeck`, C `rn2(8) @ m_move:1963` (track skip
  `4*(cnt-j)` with cnt=2,j=0) vs JS `rn2(5)` (next mon fleeck).
- **C locus:** `save.c` `savemon` / `restore.c` `restmon` — `mtrack[MTSZ]`
  is part of `struct monst`; `monmove.c:1963` track skip.
- **Cause:** JS `serMon` omitted `mtrack` (object array skipped) and
  `try_load_bones` forced zeros; live Elara-level monsters had non-empty
  tracks at bones write. Wrong comment claimed C restores empty track.
- **Change:** serialize/restore `mtrack[4]` in `js/bones.js`.
- **Named omission:** other non-plain monst fields still dropped by
  `serMon` object skip (mextra partial); binary savelev.
- **Verification:** seg9 **16635→16683**; green+strict PASS; 17-session
  PASS cohort + strict lengths; seed0030 flat **48192**/105529 Scr 85/1953.
- **Next:** @16683 C `rn2(32) @ m_move:1963` (cnt=8 track) vs JS `rn2(10)`.

## D-0277 — bones ghostly peace_minded / set_malign

- **Status:** fixed
- **Observed:** seed0030 seg9 @16683 — C `rn2(32) @ m_move:1963` then
  `mdig_tunnel` vs JS `rn2(10)` (peaceful getitems). DIAG: same PM_DWARF
  (58,6) with restored mtrack; JS `mpeaceful=1`/`appr=0`.
- **C locus:** `restore.c` `getlev` ghostly loop — non-`isshk` monsters
  re-`peace_minded` (+ unicorn coalign) then `set_malign` for the new
  hero; `bones.c` `savebones` clears `mtame`/`mpeaceful` on pets only.
- **Cause:** JS kept Elara-era peaceful flags. Hermione (neutral human)
  hates gnomes / misaligns lawful dwarves → C hostiles dig+track; JS
  peaceful dwarves burned `rn2(10)` instead.
- **Change:** `try_load_bones` ghostly peace reset + `set_malign`;
  `write_bonesfile` pet untame; export `peace_minded`.
- **Named omission:** shk name-based peace; `hide_monst` after ghostly;
  binary savelev / cemetery / map-memory clear still deferred.
- **Verification:** seg9 **16683→16836**; green+strict PASS; 19-session
  PASS cohort + strict lengths; seed0030 Scr 85/1953.
- **Next:** @16836 C `rn2(7) @ disturb` vs JS `rn2(3)`.

## D-0278 — dochug disturb sleeping-monster wake

- **Status:** fixed
- **Observed:** seed0030 seg9 @16836 — C `rn2(7)=4 @ disturb(monmove.c:351)`
  then later `set_apparxy` for other mons; JS skipped sleepers and hit
  `rn2(3)` elsewhere. C: sleeping non-dog/human in LOS, `!Stealth`,
  not nymph/jabber/lep → `!rn2(7)` wake gate (roll 4 → stay asleep).
- **C locus:** `monmove.c` `disturb` + `dochug` `msleeping && !disturb`.
- **Cause:** JS `dochug` early-returned on `msleeping` (“fill mons start
  awake”) and never burned the wake RNG.
- **Change:** port `disturb` (couldsee/`mdistu`/Stealth/ettin/nymph|
  jabber|lep/Aggravate|dog|human/`rn2(7)`+mimic gate); wire into
  `dochug`; `wake_msg` deferred.
- **Named omission:** `wake_msg`; full `dochug` preamble (wipe_engr /
  conf·stun clear / flee teleport / m_respond / covetous tactics /
  STRAT_WAITMASK) still partial.
- **Verification:** seg9 **16836→17104**/17104 (C length full; JS +133
  trailing); green+strict PASS; 17-session PASS cohort + strict lengths;
  seed0030 positional **48194**/105529 Scr 85/1953.
- **Next:** seg4 trailing JS `rn2(1)` after C `mhitm_knockback` `rn2(6)`.

## D-0279 — no_bones_level before can_make_bones depth rn2

- **Status:** fixed
- **Observed:** seed0030 seg4 JS len **8032** vs C **8031** — trailing
  JS `rn2(1)=0` after matched `mhitm_knockback` `rn2(6)=0`. DIAG stack:
  `can_make_bones`←`really_done`←`done_in_by`←`mdamageu`. C session has
  no `can_make_bones` line on seg4 (death on Mines-stair Dlvl2).
- **C locus:** `bones.c` `no_bones_level` / `can_make_bones`; also
  `getbones` after `rn2(3)`.
- **Cause:** JS burned depth `rn2(1+(depth>>2))` without C's
  `Is_branchlev(lev) && dlevel > 1` short-circuit (Mines branch end on
  main-dungeon Dlvl2). Same helper also gates special/dungeon boneid,
  botlevel, Gehennom invocation, and non-branch MAGIC_PORTAL.
- **Change:** port `no_bones_level` + `Is_special`/`Is_branchlev` into
  `js/end.js`; call from `can_make_bones` before depth rn2; wire into
  `mklev.js` `getbones` after chance roll. Named omission:
  `save_dlevel` reassignment inside `no_bones_level`.
- **Verification:** seg4 **FULL** 8031/8031; seg0/1/2/3/6/7 FULL;
  seed0030 positional **48194→55489**/105529 Scr 85/1953; green+strict
  PASS; 17-session PASS cohort + strict lengths.
- **Next:** seg5 trailing JS after C end; or seg9 @16582 getbones open
  (C `next_ident`, JS miss — pre-existing on HEAD).

## D-0280 — rhack dodrink uses ECMD_TIME bit (CANCEL≠time)

- **Status:** fixed
- **Observed:** seed0030 seg5 JS len **8420** vs C **8397** — trailing
  fleeck/`movemon` after matched EOT wipe_engr `rn2(76)`. DIAG: after
  `Unknown command ' '` (move=0), `q` quaff cancel `Never mind.` left
  `context.move=1`, so the next `moveloop_core` burned a full monster
  turn C never took.
- **C locus:** `potion.c` `dodrink` returns `ECMD_CANCEL` on getobj
  abort; cmd dispatch only spends time on `ECMD_TIME`.
- **Cause:** `js/cmd.js` `rhack` used `tookTime ? 1 : 0` on `dodrink()`'s
  ECMD_* return. `ECMD_CANCEL` is `0x02` (truthy) → treated as time.
- **Change:** `rhack` `q` uses `(drinkRes & ECMD_TIME)`; clarify
  `dodrink` JSDoc as ECMD_*.
- **Verification:** seg5 **FULL** 8397; segs 0–7 FULL; seed0030
  positional **55489→88957**/105529 Scr 85/1953; green+strict PASS;
  19-session PASS cohort + strict lengths.
- **Next:** seg8 trailing JS after `#quit` (3505 vs 3476); or seg9
  @16582 getbones `next_ident`.

## D-0281 — `#quit` done2 (unknown extcmd → y move)

- **Status:** fixed
- **Observed:** seed0030 seg8 JS len **3505** vs C **3476** — trailing
  fleeck/`movemon`/EOT after matched wipe_engr. Screens: JS
  `#quit: unknown extended command.` then `y` spent a turn; C
  `Really quit without saving?` / `Sayonara…`.
- **C locus:** `end.c` `done2` → `paranoid_query` yn → `done(QUIT)`;
  `cmd.c` extcmdlist `quit` GENERALCMD (ECMD_OK, no turn).
- **Cause:** `quit` was in EXT_CMD_AC only — Enter resolved
  unknown → ECMD_OK; session `y` became a vi-move → full monster turn.
- **Change:** port `done2` (`yn` path; ParanoidQuit getlin deferred);
  wire `#quit` into EXT_CMDS.
- **Verification:** seg8 **FULL** 3476; seed0030 positional
  **88957→105529**/105529 Scr 85/1953; green+strict PASS; 19-session
  PASS cohort + strict lengths.
- **Next:** seed0030 Scr 85/1953 (RNG full); or seed0013 Scr 57/59.

## D-0282 — update_topl word-wrap + redotoplin more (long pline)

- **Status:** fixed
- **Observed:** seed0030 Scr first miss @24 — C
  `You read: "…?hc` / `charwcmen."--More--`; JS truncated or
  single-line without `--More--`, then `Unknown command ' '`.
- **C locus:** `engrave.c` `read_engr_at` maxelen =
  `BUFSZ - sizeof "You feel the words: \"\"."`; `topl.c`
  `update_topl` replaces spaces with `\n` while `n0 >= CO`;
  `redotoplin` calls `more()` when `cury > 0`.
- **Cause:** JS `read_engr_at` used `80` not `BUFSZ`; `pline`
  never inserted wrap `\n` nor called `more()` for multi-line
  messages, so the dismiss space became a command key.
- **Change:** `engrave.js` maxelen via `BUFSZ` + sizeof NUL;
  `display.js` `pline` ports update_topl wrap + redotoplin more;
  `more()` appends `--More--` on pre-wrapped last line.
- **Verification:** Scr@23–25 match; prefix first-miss **24→46**;
  Scr count metric 85→87; RNG still **105529**/105529;
  green+strict PASS; 19-session PASS cohort + strict lengths.
- **Next:** seed0030 Scr@46 after descend (wall color CLR vs
  NO_COLOR; botl HP digit); or seed0013 Scr 57/59.

## D-0283 — botl depth() + Mines wallcolors BROWN

- **Status:** fixed
- **Observed:** seed0030 Scr first miss @46 after second `>` — C
  `Dlvl:3` + DEC walls ESC[33m (CLR_BROWN); JS `Dlvl:1` +
  NO_COLOR walls. Second stairs were Mines branch
  (`tolev` dnum=2,dlevel=1), not main dlevel+1.
- **C locus:** `botl.c` `describe_level` — `"Dlvl:%-2d"` uses
  `depth(&u.uz)`; `display.h` `cmap_walls_to_glyph` +
  `display.c` `wall_color(mines_walls)` (intended BROWN).
- **Cause:** JS botl used `u.uz.dlevel` (Mines local 1); wall
  glyphs always NO_COLOR/GRAY, never Mines branch color.
- **Change:** `display.js` `_statusLine2` → `depth(u.uz)`;
  `wall_glyph` → `CLR_BROWN` when `In_mines` (else GRAY→NO_COLOR).
  Gehennom/knox/sokoban wallcolors deferred.
- **Verification:** Scr@46–49 match; prefix first-miss **46→50**;
  Scr count 87→100; RNG still **105529**/105529; green+strict
  PASS; 19-session PASS cohort + strict lengths.
- **Next:** seed0030 Scr@50 C `!` vs JS floor `·` at (6,33);
  or seed0013 Scr 57/59.

## D-0284 — m_throw tmp_at DISP_FLASH during potion flight

- **Status:** fixed
- **Observed:** seed0030 Scr@50 — C `!` at map (34,5) / tty (6,33)
  during `The phial crashes…--More--`; JS room floor `·`. Hero at
  (34,4); no floor potion in JS. RNG full.
- **C locus:** `mthrowu.c` `m_throw` — `tmp_at(DISP_FLASH,
  obj_to_glyph)` then `tmp_at(x,y)` each flight step; `DISP_END`
  only after loop (after `potionhit` returns through `--More--`).
  Prior cell keeps missile glyph while crash pline blocks.
- **Cause:** JS `m_throw` never painted flash; unawaited `potionhit`
  plines raced cleanup order.
- **Change:** `display.js` `tmp_at` DISP_FLASH/END (+ position);
  `m_throw` open/step/close + `nh_delay_output`→`animationFrame`;
  async `potionhit` awaits plines; break-to-cleanup like C.
  Deferred: DISP_BEAM/TETHER/ALWAYS/CHANGE/FREEMEM nest alloc;
  hallu `rn2_on_display_rng` in `obj_to_glyph`.
- **Verification:** Scr@50 match; Scr **100→102**; first-miss **50→51**;
  RNG **105529**/105529; green+strict PASS; 19-session PASS cohort +
  strict lengths.
- **Next:** Scr@51 evaporate naming (D-0285).

## D-0285 — potion xname uses oc_name_known + shuffled descr

- **Status:** fixed
- **Observed:** seed0030 Scr@51 — C `The sky blue potion evaporates`
  vs JS `The potion of sleeping evaporates` (same tired append).
- **C locus:** `objnam.c` xname `POTION_CLASS` — `nn =
  objects[].oc_name_known`; dknown && !nn && !un → `dn + " potion"`.
- **Cause:** JS potion `pretty_base` always emitted `potion of X`;
  interim fix wrongly OR’d `obj.known` (missile `known` is set).
- **Change:** port C potion arms using `oc_descr_idx` shuffle;
  `nn` from `oc_name_known` only.
- **Verification:** Scr@51 match; Scr **102→103**; first-miss **→62**;
  RNG full; green+strict PASS; 19-session PASS cohort + strict.
- **Next:** Scr@62 gnome bow-swing pline missing; or seed0013.

## D-0286 — mswings / hitval on AT_WEAP melee

- **Status:** fixed
- **Observed:** seed0030 Scr@62 — C
  `You miss the gnome.  The gnome swings his bow.  The gnome hits!`
  vs JS without swing pline (topline only; HP also diverged).
- **C locus:** `mhitu.c` AT_WEAP foundyou — `hitval` then `mswings`
  before hit/miss; `mswings_verb` thrust/swing/lash/bash (+ mixed-dir
  `rn2(2)`); `weapon.c` `hitval`.
- **Cause:** JS deferred `mswings` and used `spe` alone for hittmp.
- **Change:** port `mswings`/`mswings_verb`/`mhis`; export `hitval` from
  `weapon.js`; call both on melee AT_WEAP. Snickersnee bash exemption,
  full pronoun_gender canspotmon/neuter, silver/artifact hitval deferred.
- **Verification:** Scr@62 topline matches (with D-0287); green+strict
  PASS; 17-session PASS cohort. (Alone: topline fixed; botl HP still
  diverged until D-0287.)
- **Next:** botl HP clamp (D-0287).

## D-0287 — botl HP display clamps negative to 0

- **Status:** fixed
- **Observed:** seed0030 Scr@62 after D-0286 topline match — C
  `HP:0(10)` vs JS `HP:-4(10)` (uhp went negative on lethal hit).
- **C locus:** `botl.c` bot1/bot2 + `get_blstats` — `if (hp < 0) hp = 0`
  before sprintf (gameover may set `uhp` to −1).
- **Cause:** JS `_statusLine2` emitted raw `u.uhp` (`−4` is truthy).
- **Change:** clamp displayed HP (and hpmax 9999) like C.
- **Verification:** Scr **103→116**; first-miss **62→75**; RNG full;
  green+strict PASS; 17-session PASS cohort.
- **Next:** Scr@75 death `--More--` vs invent-identify yn; or seed0013.


## D-0288 — disclose `end_disclose` / `should_query_disclose_option`

- **Status:** fixed
- **Observed:** seed0030 Scr@75 after D-0287 — C RIP tombstone vs JS
  invent-identify yn. Session rc has `disclose:-i -a -v -g -c -o`.
- **Cause:** JS always `yn_function` for invent; ignored `flags.end_disclose`
  modes. C `DISCLOSE_NO_WITHOUT_PROMPT` (`-`) skips the prompt.
- **C locus:** `options.c` `optfn_disclose`; `end.c`
  `should_query_disclose_option` / `disclose`.
- **Change:** parse `disclose:` into `flags.end_disclose[6]`; invent path
  uses `should_query_disclose_option('i')`. Other disclose categories still
  deferred.
- **Verification:** invent yn gone; unlocks RIP path (D-0289).
- **Next:** D-0289 RIP/summary; topten still deferred.

## D-0289 — `genl_outrip` + death summary + Tourist level XP

- **Status:** fixed
- **Observed:** after D-0288, Scr@75 C RIP+Aloha+score vs missing endwin;
  score was 104 vs C 124 until Tourist goto XP.
- **Cause:** `really_done` omitted `outrip`/`Goodbye` NHW_TEXT; Tourist
  `more_experienced(level_difficulty())` on new `goto_level` missing
  (Dlvl2+Mines → +20 score).
- **C locus:** `rip.c` `genl_outrip`; `end.c` `really_done` dump_forward;
  `do.c` Tourist `more_experienced`; `topten.c` `formatkiller`;
  `role.c` `Goodbye`.
- **Change:** `js/rip.js` stone lines; death summary via `show_text_pages`;
  score before bones; `done_in_by` pmname+`KILLED_BY_AN`; Tourist XP on
  `madeNew` goto_level.
- **Verification:** Scr@75 match (124 points); Scr **116→120**; first-miss
  **75→76** (topten `--More--`); RNG full; green+strict; 17-session PASS.
- **Named omissions:** topten/record; remaining disclose categories;
  `hidden_gold`; builds_up `level_difficulty`; escape/ascend score arms.
- **Next:** Scr@76 topten / endwin more; or seed0013.

## D-0290 — RIP endwin trailing blank page `--More--`

- **Status:** fixed
- **Observed:** Scr@76 C bare botl `--More--` vs JS next-life welcome;
  RIP page matched at @75 after D-0289.
- **Cause:** C `dump_forward_putstr(endwin, 0, "", …)` before
  `display_nhwindow` yields 24 lines; `process_text_window` page-breaks
  at `rows-1` (23) so a blank final page waits. JS had 23 lines → one page.
- **C locus:** `end.c` `really_done` final empty putstr; `wintty.c`
  `process_text_window` fullscreen page-break + final `dmore`.
- **Change:** `js/end.js` `show_death_rip_and_summary` appends trailing `''`.
- **Verification:** Scr@76–77 blank `--More--` match; Scr **120→161**;
  first-miss **76→78** (topten list); RNG full; green+strict; 19-session PASS.
- **Named omissions:** `topten`/`record`/`outentry`; remaining disclose;
  `hidden_gold`; escape/ascend score arms.
- **Next:** Scr@78 `topten()` score list; or seed0013.

## D-0291 — `topten` record insert + raw score panel + terminate capture

- **Status:** fixed
- **Observed:** Scr@78 C "You made the top ten list!" + Quincy row vs JS
  next-life welcome (missing post-RIP screen).
- **Cause:** `really_done` omitted `topten()`; contest captures the panel at
  `nh_terminate` via nomux input boundary (no further `nhgetch`).
- **C locus:** `topten.c` `topten`/`outheader`/`outentry`; `end.c`
  `really_done` → `topten` → `nh_terminate`; patch 006 terminate capture.
- **Change:** `js/topten.js` record VFS + insert/display; `end.js` calls
  after RIP; `jsmain` `_captureInputBoundary` for terminate frame; role/race
  /gender/align `filecode`; `done` `umortality++`.
- **Verification:** Scr@78 match; Scr **161→818**; first-miss **78→818**
  (seg5); RNG full; green+strict; 17-session PASS cohort.
- **Named omissions:** LOGFILE/XLOGFILE; toptenwin NHW_TEXT; wizard/discover;
  `ordin()` rank>10 text; full escape/ascend/quit outentry arms; astral/knox.
- **Next:** Scr@818 seg5 cell diff; or seg7 step-count gap (159 vs 172).

## D-0292 — amulet xname appearance + mksobj clear_dknown

- **Status:** fixed
- **Observed:** seed0030 prefix@93 — C `The kitten picks up a triangular
  amulet.` vs JS `… an amulet versus poison.` (total Scr matched was 818).
- **C locus:** `objnam.c` xname `AMULET_CLASS` — dknown+!nn+!un →
  `"%s amulet", dn` via shuffled `OBJ_DESCR`; `mkobj.c` `clear_dknown` /
  `unknow_object` — amulets not in `dknowns[]` start `dknown=1`.
- **Cause:** JS `pretty_base` always emitted true amulet name; `mksobj`
  never set `dknown` (falsy → would have been bare `"amulet"` even after
  xname port).
- **Change:** port AMULET_CLASS xname arms (`oc_descr_idx` shuffle;
  Yendor/fake `known` arm; called-name); `clear_dknown` in `mksobj`
  (shield-range clear; `oc_merge` / pudding deferred).
- **Verification:** prefix **93→109**; Scr matched **818→821**; RNG full;
  green+strict; 17-session PASS cohort + strict.
- **Named omissions:** `oc_merge` clear; `Is_pudding` dknown=1; ring
  appearance xname; `distant_name` side-effects in dogmove; full
  `observe_object` in xname.
- **Next:** prefix@109 JS `_` vs C `{`+DEC (fountain/altar/showsyms).

## D-0293 — DECgraphics S_altar meta-`{`

- **Status:** fixed
- **Observed:** seed0030 prefix@109 — map (54,4) JS `_` vs C `{`+DEC
  (color NO_COLOR). Prior notes guessed fountain; typ is ALTAR.
- **C locus:** `dat/symbols` DECgraphics `S_altar: \xfb` (meta-`{`, pi);
  `display.c` `back_to_glyph` ALTAR → `altar_to_glyph` / `S_altar`;
  defsym `_`/CLR_GRAY when not DEC.
- **Cause:** JS `terrain_glyph` hard-coded ASCII `_` for ALTAR under
  DECgraphics. Grid Unicode path also mapped `{`→π via `DEC_TO_UNICODE`,
  but frozen `screen-decode` DEC_MAP lacks `{` so π≠C SO+`{`.
- **Change:** DEC altar `{`+dec; ASCII `_`; scoring grid keeps raw `{`
  (do not π-convert) so `diffCell` matches C.
- **Verification:** prefix **109→126**; Scr matched **821→840**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- **Named omissions:** `altar_color` by altarmask; other DECgraphics
  remaps not in WALL/door/room tables (pool/lava/ladder/bars/…);
  browser π for altar (scoring uses raw `{`).
- **Next:** prefix@126 C `You hear some noises in the distance.` vs JS blank.

## D-0294 — mhitm `noises` / `You_hear`

- **Status:** fixed
- **Observed:** seed0030 prefix@126 — C topline
  `You hear some noises in the distance.` vs JS blank. Prior notes
  guessed `dosounds`; step RNG shows `mattackm`/`passivemm` only.
- **C locus:** `mhitm.c` `noises` + `missmm`/`hitmm` `!gv.vis` arms;
  `pline.c` `You_hear`; `gf.far_noise` / `gn.noisetime`.
- **Cause:** JS `missmm`/`hitmm` emitted combat plines only when
  `_mm_vis`; out-of-sight path deferred `noises()` entirely.
- **Change:** port `noises` (mdistu>15 distance clause + far_noise/
  noisetime rate limit) and call from `missmm`/`hitmm` when `!_mm_vis`.
- **Verification:** prefix **126→129**; Scr matched **840→843**; RNG full;
  green+strict; 17-session PASS cohort + strict.
- **Named omissions:** `pre_mm_attack`; unseen-magr `Monnam`→`It`;
  `explmm` noises; Unaware/Underwater `You_hear` arms; shared export.
- **Next:** prefix@129 C `It misses the grid bug.` vs JS
  `The kitten misses the grid bug.` (`Monnam` when Magr not spotted).

## D-0295 — `Monnam` / `x_monnam` do_it

- **Status:** fixed
- **Observed:** seed0030 prefix@129 — C topline `It misses the grid bug.`
  vs JS `The kitten misses the grid bug.` (`_mm_vis` via defender).
- **C locus:** `do_name.c` `x_monnam` `do_it` (`!canspotmon` → `"it"`
  before type/given name); `Monnam` → `highc(mon_nam)`.
- **Cause:** JS `mon_nam`/`Monnam` always emitted type/given name;
  never the unseen `"it"` arm.
- **Change:** shared `canspotmon`/`canseemon`/`sensemon` on `display.js`;
  `mon_nam` takes `do_it` before MGIVENNAME; `noit_Monnam` keeps
  `SUPPRESS_IT` (never `"it"`).
- **Verification:** @129 topline matches; remaining cell miss was `I`
  (see D-0296). Green+strict; 19-session PASS cohort + strict.
- **Named omissions:** hallu/invis adjectives; priest/shk; `AUGMENT_IT`;
  `tp_sensemon` / `MATCH_WARN_OF_MON`; worm_known.
- **Next:** after D-0296, prefix@163 mimic `(` vs `m`.

## D-0296 — `map_invisible` / `pre_mm_attack`

- **Status:** fixed
- **Observed:** seed0030 @129 after D-0295 topline match — C `I` vs
  JS `#` at (5,49) (unseen magr square).
- **C locus:** `mhitm.c` `pre_mm_attack` `!canspotmon` → `map_invisible`;
  `display.c` `map_invisible` / `newsym` keep `GLYPH_INVISIBLE`.
- **Cause:** JS `missmm`/`hitmm` deferred `pre_mm_attack`; no `I` memory.
- **Change:** port `map_invisible` + `remembered_glyph.invisible`;
  `pre_mm_attack` map arms from `missmm`/`hitmm`; `newsym` preserves `I`.
- **Verification:** prefix **129→163**; Scr matched **843→853**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- **Named omissions:** `seemimic`/`mundetected` unhide + showit `newsym`;
  full `unmap_invisible`/`unmap_object`; telepathy/warn sensemon.
- **Next:** prefix@163 C `(` vs JS `m` (mimic object appearance).

## D-0297 — `display_monster` M_AP_OBJECT

- **Status:** fixed
- **Observed:** seed0030 @163 after door-open — C tool `(` vs JS `m`
  at several shop-floor cells (same brown/object color on C).
- **C locus:** `display.c` `display_monster` `M_AP_OBJECT` → fake
  `obj` + `map_object(!sensed)`; only show mlet when `!mimic || sensed`.
- **Cause:** JS `newsym` always `mon_glyph` (mlet) for `mon_visible`
  mimics; ignored `m_ap_type`/`mappearance`.
- **Change:** `mimic_object_appearance_glyph` + `newsym` show/remember
  `obj_glyph({otyp:mappearance})` when `M_AP_OBJECT` and `!sensemon`.
- **Verification:** prefix **163→174**; Scr matched **853→887**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- **Named omissions:** `M_AP_FURNITURE` cmap_to_glyph/lastseentyp;
  `M_AP_MONSTER` what_mon + display RNG; Protection_from_shape_changers
  sensed overlay; Hallucination statue; `map_object` observe_object;
  `set_mimic_sym` door/furniture appear stubs.
- **Next:** prefix@174 C miss message with `--More--` vs JS without.

## D-0298 — `dosounds` vault `You_hear`

- **Status:** fixed
- **Observed:** seed0030 @174 — C `You miss the small mimic.--More--`
  (cursor on topline) vs JS same text without `--More--` (cursor on map).
  Next C screen footsteps; JS `Unknown command ' '`.
- **C locus:** `sounds.c` `dosounds` vault `gd_sound` + `rn2(2)+hallu`
  switch → `You_hear("the footsteps of a guard on patrol.")` (etc.);
  second pline while `TOPLINE_NEED_MORE` forces `more()`.
- **Cause:** JS vault branch burned `rn2(2)+hallu` but omitted `You_hear`
  (named omission); `dosounds` was sync/non-awaited.
- **Change:** async vault `You_hear` arms (gold_in_vault / vault_occupied
  FALLTHROUGH / footsteps / hallu Scrooge); `await dosounds()` in
  `allmain` EOT.
- **Verification:** prefix **174→237**; Scr matched **887→889**; RNG full;
  green+strict; 19-session PASS cohort + strict. Full suite **19/44**,
  Scr **2313/11405**.
- **Named omissions:** fountain/sink/swamp/barracks/shop/court `You_hear`;
  `Soundeffect`; findgd migrating; temple/oracle bodies.
- **Next:** prefix@237 map `*` C color 15 vs JS 8 (`obj_color`).

## D-0299 — `map_object` / `see_nearby_objects` nearby `observe_object`

- **Status:** fixed
- **Observed:** seed0030 @237 — map `*` C color **15** (white) vs JS
  **8** (NO_COLOR) at (5,63); RNG full; cursors agree.
- **Rejected:** missing gem `oc_color` / lit-bright arm — unknown gems
  correctly use GENERIC_GEM gray→tty NO_COLOR until `dknown`.
- **C locus:** `display.c` `map_object` — when glyph is generic and
  `cansee` within `neardist` (`r=xray>2?xray:2`, `neardist=(r*r)*2-r`),
  `observe_object` then re-glyph; `see_nearby_objects` from
  `dungeon.c` `u_on_newpos` same-level.
- **Cause:** JS `newsym` painted `obj_glyph` without nearby observe, so
  white gems stayed generic gray (decoded NO_COLOR).
- **Change:** `map_object_observe_near` in `newsym`/`map_location_memory`;
  `see_nearby_objects` after successful `domove` (Blind/Hallu/swallowed
  gated).
- **Verification:** prefix **237→259**; Scr **889→1085**; RNG full;
  green+strict; 17-session PASS cohort + strict sample.
- **Named omissions:** glyph_is_generic remembered-only `newsym_force`
  arm; mimic `map_object` observe; Blind feel path.
- **Next:** prefix@259 JS `o` vs C blank at (5,52).

## D-0300 — `newsym` unseen + no-memory paints blank

- **Status:** fixed
- **Observed:** seed0030 @259 — map `o` in JS vs C blank at tty (5,52)
  / map (53,4); RNG full; cursors agree. Orc moved (53,4)→(54,4).
- **Rejected:** missing `postmov` `newsym(omx,omy)` — call already
  present; cell had `cansee==false` and no `remembered_glyph`.
- **C locus:** `display.c` `newsym` !cansee path — `show_mem` always
  `show_glyph(x,y,lev->glyph)` (unexplored → blank).
- **Cause:** JS `newsym` left tty/`disp_ch` untouched when !cansee and
  no memory, so a sensed-mon glyph painted earlier stayed after the
  monster left.
- **Change:** else-arm paints `' '` / `NO_COLOR` (C unexplored blank).
- **Verification:** prefix **259→266**; Scr **1085→1146**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- **Named omissions:** full `lev->glyph` memory model (only blank vs
  remembered_glyph); Rogue-level litcorr/room darkening arms already
  partial; `Detect_monsters` / `tp_sensemon` / warn in !cansee path.
- **Next:** prefix@266 topline C `just misses!` vs JS `misses!`.

## D-0301 — `missmu` near-miss `"just "`

- **Status:** fixed
- **Observed:** seed0030 @266 — C topline `The goblin just misses!` vs JS
  `The goblin misses!`; RNG full.
- **C locus:** `mhitu.c` `missmu` — `(nearmiss && flags.verbose) ? "just " : ""`.
- **Cause:** JS `missmu` ignored the `nearmiss` arg and always printed
  `misses!`.
- **Change:** emit `"just "` when `nearmiss && flags.verbose`; also
  `map_invisible` when `!canspotmon` (same C function).
- **Verification:** prefix **266→372**; Scr **1146→1147**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- **Named omissions:** `could_seduce` pretend-friendly arm;
  `stop_occupation`; `gh.hitmsg_mid` / `hitmsg_prev` clear.
- **Next:** prefix@372 map — JS `#` east of room vs C blank (seg3 Wizard
  Dlvl:2).

## D-0302 — irregular `filler_region` must not bbox-relight

- **Status:** fixed
- **Observed:** seed0030 @372 — JS paints lit CORR `#` at map (26,11) past
  D_NODOOR (26,10); C blank. RNG full. Forcing `lit=0` on that cell alone
  matched C (LOS/`couldsee` was already correct).
- **C locus:** `sp_lev.c` `lspo_region` irregular — `flood_fill_rm(..., rlit,
  TRUE)` then `add_room(..., FALSE, rtype, TRUE)`; set `troom->rlit` only.
  No rectangular bbox re-light.
- **Cause:** JS `filler_region` after flood-fill re-lit every cell in
  `lx-1..hx+1, ly-1..hy+1`, including hole/niche CORR (`roomno==0`) that
  flood_fill never marked lit. Irregular room1 bbox swallowed niche
  (26,11)/(26,12)/(26,13).
- **Change:** delete invented bbox re-light; rely on `flood_fill_rm` shape
  lighting only (matches C).
- **Verification:** prefix **372→448**; Scr **1147→1346**; RNG full;
  green+strict; 17-session PASS cohort. @448: missing fountain
  `You_hear("bubbling water.")` (`dosounds` still RNG-only for fountain).
- **Named omissions:** other `dosounds` fountain/sink/swamp You_hear
  bodies; mimic lightblocker / gas regions / light sources in vision.
- **Falsified:** doorway LOS / `view_from` past D_NODOOR as the @372 cause.

## D-0303 — `dosounds` fountain/sink `You_hear`

- **Status:** fixed
- **Observed:** seed0030 @448 — C topline `You hear bubbling water.` vs JS
  blank; RNG full; key `s`. Fountain `rn2(400)`/`rn2(3)` already burned.
- **C locus:** `sounds.c` `dosounds` — `fountain_msg[rn2(3)+hallu]` /
  `sink_msg[rn2(2)+hallu]` → `You_hear1`.
- **Cause:** JS burned index RNG but deferred `You_hear` (named omission
  after D-0298 vault body).
- **Change:** emit fountain/sink message tables via existing `You_hear`
  (same pattern as vault).
- **Verification:** prefix **448→484**; Scr **1346→1348**; RNG full;
  green+strict; 19-session PASS cohort + strict sample. @448/@449/@450
  match; @484 C `(` vs JS `#` west of `@`.
- **Named omissions:** swamp `You1`; barracks/shop/court `You_hear`;
  `Soundeffect`; findgd migrating; temple/oracle bodies.
- **Next:** prefix@484 map `(` vs `#` (likely mimic/`M_AP_OBJECT`); alt
  @485 C `a whistle` vs JS `a tin whistle`.

## D-0304 — `xkilled` final `newsym` after treasure/corpse

- **Status:** fixed
- **Observed:** seed0030 @484 — C tool `(` west of `@` vs JS corridor `#`
  after `You kill the newt!` (cursors agree). Forced `newsym` painted `(`.
- **C locus:** `mon.c` `xkilled` — `mondead`/`m_detach` newsym before
  drops; then treasure `place_object` / `make_corpse`; then `newsym(x,y)`.
- **Cause:** JS `mondead` newsym'd empty corridor, then treasure whistle
  placed without the post-drop `newsym` (falsified mimic/`M_AP_OBJECT`).
- **Change:** `xkilled` call `newsym(x,y)` after treasure/corpse, before
  experience (C order).
- **Verification:** prefix **484→485**; Scr **1348→1370**; RNG full;
  green+strict; 19-session PASS cohort + strict sample.
- **Named omissions:** `accessible`/`is_pool` gate; `wasinside`/`spoteffects`;
  murder/peaceful luck `rn2`; `mondied` treasure path (hero-only).
- **Next:** prefix@485 C `a whistle` vs JS `a tin whistle` (`objnam` descr).

## D-0305 — TOOL/WEAPON/VENOM `xname` uses `OBJ_DESCR` when `!oc_name_known`

- **Status:** fixed
- **Observed:** seed0030 @485 — C `You see here a whistle.` vs JS
  `You see here a tin whistle.`; RNG full.
- **C locus:** `objnam.c` `xname_flags` WEAPON/VENOM/TOOL — `!dknown`/`!nn`
  strcat `dn` (`OBJ_DESCR`, else `actualn`); `nn` → `actualn`.
- **Cause:** JS `pretty_base` always used the actual name for tools/weapons
  (tin whistle / magic whistle share descr `"whistle"`).
- **Change:** port descr/`oc_name_known`/`oc_uname` arms for those classes;
  LENSES `pair of ` prefix kept. Poisoned/wet-towel/figurine deferred.
- **Verification:** prefix **485→550**; Scr **1370→1371**; RNG full;
  green+strict; 19-session PASS cohort + strict sample. @485 matches;
  @550 C shop `You hear someone cursing shoplifters.` vs JS blank.
- **Named omissions:** poisoned weapon prefix; wet-towel moist/wet;
  figurine ` of <pm>`; armor `!nn` → dn (separate C case).
- **Next:** prefix@550 shop `dosounds` `You_hear` (`shop_msg`).

## D-0306 — dosounds shop `You_hear` (`shop_msg`)

- **Status:** fixed
- **Observed:** seed0030 @550 — C `You hear someone cursing shoplifters.`
  vs JS blank topline; RNG full (shop arm burned `rn2(2)` only).
- **C locus:** `sounds.c` `dosounds` — `has_shop && !rn2(200)` →
  `tended_shop && !strchr(u.ushops,…)` → `You_hear1(shop_msg[rn2(2)+hallu])`
  then `noisy_shop`.
- **Cause:** JS matched the gate/`rn2`/`noisy_shop` envelope but omitted the
  `You_hear` (same pattern as D-0303 fountain/sink).
- **Change:** emit `shop_msg[]` via existing `You_hear` with `rn2(2)+hallu`.
- **Verification:** prefix **550→573**; Scr **1371→1373**; RNG full;
  green+strict; suite **19/44**, Scr **2810**/11405 (+226 vs #325);
  19 PASS cohort held in full suite.
- **Named omissions:** barracks/court/swamp You_hear bodies still deferred.
- **Next:** @573 C shop welcome `"Hello, Beatrix!  Welcome to … store!"`
  — `u_entered_shop` / `ushops_entered` absent in JS.

## D-0307 — shop enter welcome + shk `mon_nam`

- **Status:** fixed
- **Observed:** seed0030 @573 — C Maganasipi welcome vs JS blank; after
  welcome emit, wrong shkname (Kinojevis) then `"the shopkeeper"` in combat.
- **C locus:** `hack.c` `move_update`/`check_special_room`/`in_rooms`;
  `shk.c` `u_entered_shop`; `u_init.c` `ubirthday=getnow()`; `makemon.c`
  `m_id=next_ident()`; `do_name.c` `x_monnam` isshk→`shkname`.
- **Cause:** No shop-enter tracking/welcome; `ubirthday` unset (nameshk
  nseed); `m_id` ignored `next_ident` return; `mon_nam` omitted shk arm.
- **Change:** Port `in_rooms`/`move_update`/`check_special_room` + peaceful
  `u_entered_shop` verbalize; `getnow`→`ubirthday` (contest UTC-4 quirk);
  `m_id`/`o_id` = `next_ident()`; `mon_nam` isshk→`shkname`.
- **Verification:** prefix **573→580**; Scr **1373→1376**; RNG full;
  green+strict; 19 PASS cohort held.
- **Named omissions:** deserted/angry/Invis/doorway `dochug`; zoo/… room
  plines; unpaid leave; hallu shkname; `long wand` xname (next @580).
- **Next:** @580 C `"Maganasipi zaps a long wand!"` vs JS `"a wand"`.

## D-0308 — `uhitm` local `mon_nam` missed shkname

- **Status:** fixed
- **Observed:** seed0030 @576 — C `You miss Maganasipi.` vs JS
  `You miss the shopkeeper.` (same screen then `Maganasipi gets angry!`).
  D-0307 fixed `do_name.js` mon_nam, but literal first cell-miss stayed @576.
- **C locus:** `do_name.c` `mon_nam`/`x_monnam` isshk → `shkname`;
  `uhitm.c` miss/hit plines use `mon_nam`.
- **Cause:** `uhitm.js` kept a private `mon_nam` stub (`the ${plain}`) and
  never imported `do_name.js`.
- **Change:** delete stub; import `mon_nam` from `do_name.js`.
- **Verification:** prefix **576→580**; Scr **1376→1383** (with D-0309);
  RNG full; green+strict; 17 PASS cohort + strict sample.
- **Named omissions:** other local naming stubs if any; hallu/invis shk.
- **Next:** @580 botl HP 0 vs 11 after zap+Boing+hit (topline matches).

## D-0309 — WAND_CLASS `xname` appearance + zap `dknown`

- **Status:** fixed
- **Observed:** seed0030 @580 — C `Maganasipi zaps a long wand!` vs JS
  `… a wand!` (topline); CURRENT primary.
- **C locus:** `objnam.c` `xname_flags` WAND_CLASS — `!dknown`→`wand`;
  `nn`→`wand of …`; else `"%s wand", dn` via `OBJ_DESCR`;
  `xname` calls `observe_object` when `!Blind` before reading `dknown`.
- **Cause:** JS wand arm returned bare `wand` whenever `!nn`; no descr
  arm; `xname` omits blanket `observe_object` (distantname risk).
- **Change:** port WAND_CLASS dknown/nn/un/dn arms (`oc_name_known` only);
  `mzapwand` canseemon path sets `otmp.dknown=1` before `xname`.
- **Verification:** @580 topline matches; Scr **1376→1383** (with D-0308);
  RNG full; green+strict; 17 PASS cohort + strict sample.
- **Named omissions:** full `observe_object`/`discover_object` in `xname`
  (needs `gd.distantname`); `unknow_object` when unseen zap; RING/SCROLL
  appearance parity beyond known arms.
- **Next:** @580 HP:11 vs HP:0 after reflected striking + melee hit.

## D-0310 — `bot()` skip when `u.uhp == -1` (stale botl on fatal more)

- **Status:** fixed
- **Observed:** seed0030 @580 — topline matches (`long wand`+Boing+hits);
  C botl `HP:11(11)` vs JS `HP:0(11)`.
- **C locus:** `botl.c` `bot` — `if (u.uhp != -1 && …)` else no-op;
  `mdamageu` can leave `uhp == -1` on exact overkill before `done_in_by`
  forces more on prior topline.
- **Cause:** JS `_buildScreenOutput` always repainted status with
  `hp<0→0`, so the deferred `--More--` after fatal hit showed HP:0 while
  C kept the previous botl.
- **Change:** cache last painted status; when `u.uhp === -1`, reuse it
  (and no-op `bot()`); clear cache in `reset_display_messages`.
- **Verification:** prefix **580→582**; Scr **1383→1387**; RNG full;
  green+strict; 17 PASS cohort + strict sample.
- **Named omissions:** `gb.bot_disabled` for getlin/menu; Upolyd `mh`
  path; non-`-1` negative HP still clamps via get_blstats.
- **Next:** @582 `Maganasipi takes all your possessions` (shk loot on death).

## D-0311 — `paybill`/`inherits` angry shk takes possessions on death

- **Status:** fixed
- **Observed:** seed0030 @582 — C `You die...  Maganasipi takes all your
  possessions.--More--` vs JS `You die...--More--`; RNG full; botl OK.
- **C locus:** `shk.c` `paybill`/`inherits`; `end.c` `really_done` calls
  `paybill` before `display_nhwindow(WIN_MESSAGE)`.
- **Cause:** JS omitted `paybill`; `really_done` flushed `"You die..."`
  without the angry-shk inherit pline (appends via topline NEED_MORE).
- **Change:** port `paybill`/`inherits`/`money2mon`/`set_repo_loc` +
  `finish_paybill`; call before `flush_topl_more`; pass `taken` to
  `disclose`.
- **Verification:** @582 topline matches; prefix next miss **@594**;
  Scr **1387→1388**; RNG full; green+strict; 19 PASS cohort + strict
  sample.
- **Named omissions:** `addupbill` body; `clear_unpaid`/`no_charge` in
  `setpaid`; full `mongone`/`mnearto`/`unleash_all`; partial-gold
  currency pline; `paygd`/`clearpriests`; `M1_NOHEAD` `has_head`.
- **Next:** @594 kitten `unlabeled scroll` vs `scroll of blank paper`.

## D-0314 — botl commit via `pline`→`flush_screen`→`bot` (not live on more)

- **Status:** fixed
- **Observed:** seed0030 @779 — C `You die...` botl `HP:1(11)` vs JS
  `HP:0(11)`; RNG full. Overkill left `uhp==-1` at pline flush.
- **C locus:** `pline.c` `flush_screen` before `putmesg`; `display.c`
  `flush_screen` calls `bot()` when `disp.botl`; `botl.c` `bot` no-op on
  `uhp==-1` but always clears flags; `topl.c` `more` does not flush/bot;
  `display.c` `cls` sets `botlx`; `spell.c` energy spend sets `disp.botl`;
  `end.c` `done` bots before zeroing HP.
- **Cause:** JS live-painted status on every `_buildScreenOutput` /
  `more()` flush. After `done()` zeroed `-1→0`, You die more showed HP:0
  while C had skipped bot at pline and never re-bot before that more.
- **Change:** status cache committed only in `bot()`; `flush_screen` bots
  when `botl|botlx`; `more()` paints cache (respect postpone); `pline`
  flushes before putmesg; `cls` sets `botlx`; `done` bots before zero;
  spell `uen` sets `botl`.
- **Verification:** @779 match; Scr **1394→1395**; first miss **@787**;
  RNG full; green+strict; 17 PASS cohort + strict sample (seed0501 held
  after spell botl).
- **Named omissions:** `timebot`; Upolyd `mh` botl; full `gb.bot_disabled`;
  callers that mutate gold/HP without `botl` still need flags when gated.
- **Next:** @787 `Things that are here:` map overlay cells.

## D-0313 — `done_in_by` isshk honorific + `KILLED_BY`

- **Status:** fixed
- **Observed:** seed0030 @583 RIP — C `killed by Ms. Maganasipi; the
  shopkeeper` vs JS `killed by a shopkeeper`; RNG full.
- **C locus:** `end.c` `done_in_by` `mtmp->isshk` →
  `Sprintf("%s%s, the shopkeeper", honorific, shkname)` +
  `svk.killer.format = KILLED_BY`; `shknam.c` `shkname_is_pname`
  (`-`/`+`/`=` prefix → no Ms./Mr.).
- **Cause:** JS `done_in_by` always used bare `pmname` + `KILLED_BY_AN`.
- **Change:** port isshk arm + `shkname_is_pname`; `formatkiller` still
  maps `,`→`;` for RIP.
- **Verification:** RIP @583 matches; Scr **1389→1394**; first miss
  @779 botl HP:1 vs HP:0; RNG full; green+strict; 19 PASS cohort;
  full suite Scr **2826→2831** (still 19/44).
- **Named omissions:** G_UNIQ / ghost / mimicker / vampshifter /
  priest|minion / minvis / hallu-distort / monhealthdescr /
  multi_reason trim in `done_in_by`.
- **Next:** @779 `You die...` botl HP:1 vs HP:0.

## D-0312 — SCROLL_CLASS `xname` unlabeled / labeled appearance

- **Status:** fixed
- **Observed:** seed0030 @594 — C `The kitten drops an unlabeled scroll.`
  vs JS `… a scroll of blank paper.`; RNG full. Contiguous cell first-miss
  was already @583 RIP (pre-existing; not this unit).
- **C locus:** `objnam.c` `xname_flags` SCROLL_CLASS — `nn` =
  `oc_name_known` only; `!nn`+`oc_magic` → `"scroll labeled <dn>"`;
  `!nn`+!magic → `"<dn> scroll"` (blank paper descr `"unlabeled"`).
- **Cause:** JS used `oc_name_known || obj.known` for the known arm and
  returned bare `"scroll"` when unknown (no unlabeled/labeled arms).
- **Change:** port SCROLL dknown/nn/un/magic/dn arms (`oc_name_known`
  only); Samurai Japanese name kept on known arm.
- **Verification:** @594 topline matches; Scr **1388→1389**; RNG full;
  green+strict; 17 PASS cohort + strict sample. Next cell miss @583 RIP.
- **Named omissions:** RING/SPBOOK appearance parity beyond known arms;
  blanket `observe_object` in `xname`; scroll mail specials.
- **Next:** @583 RIP `done_in_by` shk → `Ms. Maganasipi, the shopkeeper`.


## D-0315 — Priest `xname`/`doname` force `bknown`

- **Status:** fixed
- **Observed:** seed0030 @787 (seg5 Priest) — C look_here
  `a cursed candy bar` vs JS `a candy bar`; RNG full. Prior “map overlay”
  reading of `ursed`/`andy` was the same line’s BUC text.
- **C locus:** `objnam.c` `xname` — `Role_if(PM_CLERIC)` sets
  `obj->bknown = 1` (bypass `set_bknown`); `doname_base` calls `xname`
  then reads `obj->bknown` for the BUC prefix.
- **Cause:** JS `doname` used `pretty_base` without the cleric force;
  `xname` also omitted it. Floor candy was cursed but `bknown` stayed 0.
- **Change:** set `obj.bknown = 1` when `Role_if(PM_CLERIC)` in both
  `xname` and `doname` (D-0315).
- **Verification:** @787 match; Scr **1395→1398**; first miss **@791**
  glass wand `(0:6)`; RNG full; green+strict; 19 PASS cohort + priest
  strict sample (seed0106/seed0501).
- **Named omissions:** `doname_with_price` shop arms; full `set_bknown`
  invent-update path; `override_ID` force-all-known.
- **Next:** @791 pet pickup `glass wand` vs `glass wand (0:6)`.


## D-0316 — `mksobj` WAND `oc_uses_known` → `known=0`

- **Status:** fixed
- **Observed:** seed0030 @791 — C
  `The little dog picks up a glass wand.` vs JS `… glass wand (0:6)`;
  RNG full. Drop @793 had the same charge suffix.
- **C locus:** `mkobj.c` `unknow_object` —
  `obj->known = objects[otyp].oc_uses_known ? 0 : 1`; `objects.h`
  `WAND()` `BITS(..., uskn=1, ..., chrg=1, ...)`.
- **Cause:** JS `mksobj` uskn heuristic covered WEAPON/ARMOR/charged tools
  but omitted `WAND_CLASS`, so floor wands started `known=1` and
  `doname` appended `(recharged:spe)`.
- **Change:** treat `WAND_CLASS` / `WAN_*` as `oc_uses_known` in
  `mksobj` (D-0316).
- **Verification:** @791/@793 bare `glass wand`; Scr **1398→1400**;
  first miss **@836** boulder hear-behind; RNG full; green+strict;
  17 PASS cohort (shared-mkobj sample).
- **Named omissions:** table still lacks extracted `oc_uses_known`/
  `oc_charged`; charged RING uskn heuristic; `unknow_object` as shared
  helper; `distant_name` wrapper in dog_invent.
- **Next:** @836 boulder `hear a monster behind` vs vain push.

## D-0317 — `moverock` monster-behind + `dopush` unmap I

- **Status:** fixed
- **Observed:** seed0030 @836 — C
  `You hear a monster behind the boulder.--More--` vs JS
  `You try to move the boulder, but in vain.`; RNG full.
- **C locus:** `hack.c` `moverock_core` mtmp arm (`You_hear` /
  `canspotmon` → verbose follow-up → `cannot_push`, no vain pline);
  `dopush` `glyph_is_invisible` → `unmap_object` before `movobj`.
- **Cause:** JS treated any `m_at(dest)` as vain-push; omitted hear/spot
  messages and left remembered `I` so a later successful push still
  painted `I` over the boulder (`newsym` keeps invisible glyphs).
- **Change:** port monster-behind + `closed_door` vain path in
  `moverock_core`; clear dest invisible memory in `dopush` (D-0317).
- **Verification:** @836 hear-behind; Scr **1400→1427**; first miss
  **@1174** thin-air + gnome wield; RNG full; green+strict; 19 PASS
  cohort.
- **Named omissions:** Sokoban diagonal; shop costly; trap/teleport/pool;
  Blind feel; verysmall; giant/`could_move_onto_boulder` in `cannot_push`;
  `revive_nasty`; full `unmap_object` trap/engr; `y_monnam` steed;
  `Soundeffect`; next_boulder naming.
- **Next:** @1174 `You attack thin air.  The gnome wields a bow!`.

## D-0318 — `mon_wield_item` canseemon wield pline

- **Status:** fixed
- **Observed:** seed0030 @1174 — C
  `You attack thin air.  The gnome wields a bow!` vs JS
  `You attack thin air.`; RNG full (wield turn already spent).
- **C locus:** `weapon.c` `mon_wield_item` — after switch to `obj`, if
  `canseemon(mon)` then `pline_mon("%s wields %s%c", Monnam, doname,
  exclaim?'!':'.')` before final `owornmask=W_WEP`.
- **Cause:** JS `mon_wield_item` set `mon.mw` / returned 1 but omitted the
  visible wield message (and dig-tool `exclaim=FALSE` period).
- **Change:** async `mon_wield_item` + `canseemon`/`Monnam`/`doname` pline;
  await at `dochug` / `thrwmu` / `mattacku` / `m_digweapon_check` (D-0318).
- **Verification:** @1174 both clauses; Scr **1427→1428**; first miss
  **@1195** map `)` vs `·` on shoot `--More--`; RNG full; green+strict;
  19 PASS cohort; full **19/44** Scr **2865**.
- **Named omissions:** mwelded refuse-wield plines; weld-on-wield;
  artifact_light; autoreturn tether pline.
- **Next:** @1195 thrown-arrow map glyph `)` at (13,27).

## D-0319 — await `thitu`/`monshoot` plines before `losehp`/flight

- **Status:** fixed
- **Observed:** seed0030 @1195 — same topline
  `You attack thin air.  The gnome shoots an arrow!--More--`; map
  tty (13,27) C `)` cyan vs JS `·`; botl C `HP:9` vs JS `HP:7`. RNG full.
  JS anim frames already showed `)` during flight.
- **C locus:** `mthrowu.c` `thitu` — `You("are hit…")` then `losehp`;
  `monshoot` pline before `m_throw`. Hit pline’s `--More--` clears prior
  shoot line while `m_throw` `tmp_at` flash still painted and before
  damage/`DISP_END`.
- **Cause:** JS `thitu`/`monshoot` fired async `pline` without `await`, so
  `losehp` + post-loop `tmp_at(DISP_END)` ran before `--More--` capture.
- **Change:** `await pline` on `thitu` hit/miss arms and `monshoot` shoot
  line before `losehp` / flight loop (D-0319).
- **Verification:** @1195 `)`+HP:9 match; Scr **1428→1432**; first miss
  **@1262** botl HP:4 vs 0 on hit `--More--`; RNG full; green+strict;
  19 PASS cohort + strict lengths.
- **Named omissions:** `thitu` acid/silver/egg/cream/venom arms; catch
  `hold_another_object`; `ohitmon`; hallu `obj_to_glyph` display RNG.
- **Next:** @1262 fatal `losehp` leave negative `uhp` for `bot` `-1` skip.



## D-0327 — `xkilled` `nonliving` → `"destroy"`

- **Status:** fixed
- **Observed:** seed0030 @1684 — C `You destroy the kobold zombie!` vs JS
  `You kill …`. RNG full.
- **C locus:** `mondata.h` `nonliving` / `weirdnonliving` / `is_golem`;
  `mon.c` `xkilled` — `nonliving(mtmp->data) ? "destroy" : "kill"`.
- **Cause:** JS `xkilled` hard-coded verb `"kill"`.
- **Change:** port `is_golem`/`weirdnonliving`/`nonliving` in `monsters.js`;
  `xkilled` uses `nonliving(mtmp.data)` for the verb (D-0327).
- **Verification:** @1684 match; Scr **1820→1821**; first miss **@1821**
  blank C map vs JS walls; RNG full; green+strict; 17 PASS cohort; full
  suite **19/44** Scr **3258**/11405.
- **Named omissions:** wasinside/canspotmon `"it"`; tame poor/named pet
  `x_monnam` ARTICLE arms; `monkilled` still `is_undead`-only (not full
  `nonliving`).
- **Next:** @1821 map clear/`docrt`/`cls` on level transition.

## D-0330 — `;` glance (`doquickwhatis`) + `look_at_monster`

- **Status:** fixed
- **Observed:** seed0030 @1832 — C `Pick a monster, object or location.--More--`
  vs JS `Unknown command ';'.`. RNG full.
- **C locus:** `cmd.c` `';'` → `doquickwhatis`; `pager.c` `do_look(1)` /
  `look_at_monster` (`distant_monnam` ARTICLE_NONE + `, asleep`);
  `putmixed(WIN_MESSAGE)` (no forced `more`).
- **Cause:** JS left `;` unbound; `look_at_monster_buf` used bare type name
  without given-name/asleep; `do_look` always `more()` after `pline` and
  called `checkfile` even when `quick`.
- **Change:** bind `;` → `doquickwhatis`/`do_look(1)`; `distant_monnam_none`
  + asleep/frozen/meditating in `look_at_monster_buf`; getpos `force=quick`;
  skip `checkfile` when quick; drop forced `more` after putmixed-equivalent
  `pline` (D-0330).
- **Verification:** @1832–@1839 match; Scr **1832→1933**; first miss **@1935**
  farlook wrap; RNG full; green+strict; 19 PASS cohort.
- **Named omissions:** hallu/health/stuck/leashed/trapped/mhidden in
  `look_at_monster`; astral high-cleric `distant_monnam`; getpos `;`/`,`/`:`
  LOOK_* pick mapping still partial; full showsyms `do_screen_description`.
- **Next:** @1935 `#  farlook -> …` row1 wrap `"  k"`.

## D-0329 — named `PM_GHOST` `x_monnam` → `"<name>'s ghost"`

- **Status:** fixed
- **Observed:** seed0030 @1830 — C `You miss Elara's ghost.` vs JS
  `You miss Elara.`. RNG full.
- **C locus:** `do_name.c` `x_monnam` — `do_name && has_mgivenname` &&
  `mdat == &mons[PM_GHOST]` → `Sprintf("%s ghost", s_suffix(name))`;
  `name_at_start` clears article (`mon_nam` ARTICLE_THE → bare).
- **Cause:** JS `mon_nam` / tame / `noit_Monnam` returned bare
  `MGIVENNAME` for all named monsters, skipping the ghost arm.
- **Change:** `named_ghost_monnam` + `s_suffix` in `do_name.js`
  (D-0329); applied in `mon_nam`, `x_monnam_tame`, `noit_Monnam`.
- **Verification:** @1830/@1831 match; Scr **1831→1832**; first miss
  **@1832** `;` unbound; RNG full; green+strict; 17 PASS cohort.
- **Named omissions:** hallu/invis adj/priest/`called`/`is_mplayer`
  name arms; full `x_monnam` article/`just_an` path; `a_monnam` in
  `uhitm.js` still bare-given-name.
- **Next:** @1832 cmd `;` → `do_look(1)`.

## D-0328 — `savebones` clear map memory (+ `docrt` vision shutoff)

- **Status:** fixed
- **Observed:** seed0030 @1821 — after descend `--More--` onto bones Mines
  L1, C map mostly blank (19 lit-room cells) vs JS ~81 extra DEC walls/
  floors from prior-hero `remembered_glyph`. RNG full.
- **Rejected:** skipped `cls` alone — sight after `docrt` was already 19;
  mem=100 present immediately after `getbones` load.
- **C locus:** `bones.c` `savebones` — clear `seenv`/`waslit`/
  `glyph=GLYPH_UNEXPLORED`/`lastseentyp` before save; `display.c`
  `docrt_flags` — `vision_recalc(2)` then memory then `vision_recalc(0)`.
- **Cause:** JS `write_bonesfile` serialized full cells including
  `remembered_glyph`/`disp_*`; load restored dead hero’s map memory.
- **Change:** clear memory fields on bones write; strip on load (old
  payloads); `docrt` ports `vision_recalc(2)` + memory `newsym` +
  `vision_recalc(0)` (D-0328).
- **Verification:** @1821 match; Scr **1821→1831**; first miss **@1830**
  `Elara's ghost` vs `Elara`; RNG full; green+strict; 19 PASS cohort.
- **Named omissions:** cemetery attach; binary savelev glyph field;
  `see_monsters` after docrt; full `clear_glyph_buffer` gbuf.
- **Next:** @1830 bones ghost `"s ghost"` monnam.

## D-0326 — `newsym` `canspotself` gates `display_self`

- **Status:** fixed
- **Observed:** seed0030 @1606 — after MAGIC_TRAP Invis / `can't see yourself`,
  C hero cell `%` (food underfoot) vs JS `@`. RNG full.
- **C locus:** `display.h` `canspotself`/`canseeself`/`senseself`;
  `display.c` `newsym` u_at cansee — `_map_location(x,y,!see_self)` then
  `display_self` only if `see_self`.
- **Cause:** JS hero branch always painted `hero_display_glyph()` (`@`).
- **Change:** port Blind/Invis/Invisible helpers + `canspotself`;
  `map_location(x,y,show)` paints when `!see_self` (D-0326).
- **Verification:** @1606 match (`%`); Scr **1606→1820**; first miss
  **@1684** `destroy` vs `kill`; RNG full; green+strict; 17 PASS cohort.
- **Named omissions:** `feel_location` on !cansee hero; tseen traps /
  `visible_region_at` in `_map_location`; pet/named xkilled naming arms.
- **Next:** @1684 `xkilled` `nonliving` → `"destroy"`.

## D-0325 — ARMOR_CLASS `xname` appearance (`OBJ_DESCR`)

- **Status:** fixed
- **Observed:** seed0030 @1601 — C `an iron skull cap` vs JS `an orcish
  helm` in `Things that are here:` pile. RNG full.
- **C locus:** `objnam.c` `xname_flags` ARMOR_CLASS — after pair/set/
  shield !dknown specials: `nn` → actualn; `un` → `armor_simple_name`
  called; else → `dn` (`OBJ_DESCR`).
- **Cause:** JS `pretty_base` always used actualn/`PRETTY` for armor
  (pair/set prefixes only), ignoring `!oc_name_known` → appearance.
- **Change:** port ARMOR nn/un/dn + boots/gloves pair, dragon scales set,
  shield !dknown elven…orcish/`smooth shield` (D-0325). Called arm uses
  `dn` pending `armor_simple_name`.
- **Verification:** @1601 match (`iron skull cap`); Scr **1605→1606**;
  first miss **@1606** Invis map `@` vs underfoot `%`; RNG full;
  green+strict; 17 PASS cohort.
- **Named omissions:** full `armor_simple_name` / suit/cloak/helm simple
  names for called; wet-towel/poisoned not in this class.
- **Next:** @1606 `newsym` `canspotself` — show mapped glyph when
  Invisible (`can't see yourself`).

## D-0322 — `hmon_hitmon_msg_hit` `exclam(dmg)` punctuation

- **Status:** fixed
- **Observed:** seed0030 @1429 — C `You hit Swidnica!` vs JS `You hit Swidnica.`
  (same following zap/miss). RNG full.
- **C locus:** `uhitm.c` `hmon_hitmon_msg_hit` — verbose melee uses
  `canseemon(mon) ? exclam(hmd->dmg) : "."` with bash/lash/smite/hit verb;
  `zap.c` `exclam` — force≤4 → `.`, else `!`.
- **Cause:** JS always appended a bare period (period stand-in comment).
- **Change:** port `exclam` + `canseemon` punct + hit verb (D-0322).
- **Verification:** @1429/@1430/@1432 match; Scr **1445→1446**; first miss
  **@1433** (seg7 −13 death screens after striking zap); RNG full;
  green+strict; 17 PASS cohort.
- **Named omissions:** thrown `hit()` path / multishot destroyed exception.
- **Next:** @1433 fatal wand-hit `--More--` / death screen capture (seg7 −13).

## D-0324 — `#quit` topten death string + outentry dungeon append

- **Status:** fixed
- **Observed:** seed0030 @1484 — C `Galen-Sam-Hum-Mal-Law quit in The
  Dungeons…` vs JS `…Law died in…` (+ stray second-line `.`). Seg8
  `#quit` after Sayonara. RNG full.
- **C locus:** `end.c` `done` — `how >= PANICKED` → `deaths[how]` ("quit");
  `really_done` — `QUIT` → `NO_KILLER_PREFIX` (+ Charon's boat if
  `uhp < 1`); `topten.c` `outentry` — quit/starved/died share dungeon/
  level append (not died-only).
- **Cause:** JS `done` never set `killer.name` for QUIT, so leftover
  prior-death killer made `formatkiller` non-`quit*`; `outentry` nested
  dungeon/level only under the `died` arm, so a correct `quit` string
  would still omit ` in The Dungeons…`.
- **Change:** port `DEATHS[]` + `done` killer setup; `really_done` QUIT/
  ESCAPED/PANICKED format; restructure `outentry` like C (D-0324).
- **Verification:** @1484 match (`quit in The Dungeons`); Scr
  **1604→1605**; prefix **1601**; first miss **@1601** iron skull cap;
  RNG full; green+strict; 17 PASS cohort.
- **Named omissions:** outentry choked/poisoned/crushed/petrified arms;
  astral plane text; ParanoidQuit getlin; Lifesaved / Die?.
- **Next:** @1601 ARMOR `xname` appearance (`iron skull cap` vs
  `orcish helm`).

## D-0323 — `mbhitm` await `finish_losehp_done` after fatal striking hit

- **Status:** fixed
- **Observed:** seed0030 @1433 — C `The wand hits you!--More--` (Florian)
  vs JS Samurai welcome. Seg7 JS **159**/172 (−13 death/disclose/RIP/
  topten). RNG full.
- **C locus:** `muse.c` `mbhitm` WAN_STRIKING hits_you — `pline_The("wand
  hits you!")` then `losehp` → `done(DIED)` noreturn; `use_offensive`
  never resumes after fatal zap.
- **Cause:** JS awaited the hit pline (D-0261) but called `losehp` without
  `finish_losehp_done` (unlike `thitu` D-0319). `gameover` aborted
  moveloop mid-seg7, dropping the death screen capture chain.
- **Change:** after fatal `losehp`, `await finish_losehp_done()` and return;
  stop `mbhit` beam / `use_offensive` when `gameover` (D-0323).
- **Verification:** @1433 match; seg7 **172**/172; Scr **1446→1604**;
  first miss **@1484** (`quit` vs `died` on Galen topten); RNG full;
  green+strict; 17 PASS cohort + strict sample.
- **Named omissions:** other `losehp` callers without finish (e.g. potion
  acid); mon-target `mbhitm` resist/hit plines; other muse offense wands.
- **Next:** @1484 `#quit` topten how_how `quit` vs `died`.

## D-0321 — SPBOOK_CLASS `xname` appearance (`"%s spellbook"`)

- **Status:** fixed
- **Observed:** seed0030 @1342 — C `The saddled pony picks up a shining
  spellbook.` vs JS `… a spellbook of jumping.` (same on drop @1343).
  RNG full.
- **C locus:** `objnam.c` `xname_flags` SPBOOK_CLASS — `nn` =
  `oc_name_known` only; dknown+!nn+!un → `Sprintf("%s spellbook", dn)`
  via shuffled `OBJ_DESCR`; BOTD known arm is bare `actualn`.
- **Cause:** JS SPE_ arm OR’d `obj.known` into the known path and returned
  bare `"spellbook"` when unknown (no descr arm) — same leak class as
  D-0285/D-0309/D-0312.
- **Change:** port SPBOOK dknown/nn/un/dn arms (`oc_name_known` only);
  SPE_NOVEL tribute arms minimal; Samurai Japanese name on known arm.
- **Verification:** @1342/@1343 match; Scr **1438→1445**; first miss
  **@1429** (`You hit …!` vs `.`); RNG full; green+strict; 19 PASS cohort.
- **Named omissions:** RING appearance beyond known arms; full novel
  hallu/called polish; blanket `observe_object` in `xname`.
- **Next:** @1429 hero hit `exclam(dmg)` punctuation.

## D-0320 — `losehp` leaves negative `uhp` (no fatal clamp)

- **Status:** fixed
- **Observed:** seed0030 @1262 — same topline
  `You are hit by an arrow!--More--`; botl C `HP:4(14)` vs JS `HP:0(14)`.
  RNG full. Prior @1259 non-fatal hit already showed post-damage HP:4.
- **C locus:** `hack.c` `losehp` — `u.uhp -= n` then `urgent_pline`/`done`
  without clamping; `botl.c` `bot` no-ops when `u.uhp == -1`; `end.c`
  `done` zeros `uhp` only after its `bot()` call.
- **Cause:** JS `losehp` set `uhp=0` on fatal. Hit pline returns with
  `NEED_MORE` (no immediate more); `finish_losehp_done`→`pline("You die…")`
  flushes `bot()` with `uhp=0` before showing the deferred hit `--More--`.
  C keeps `uhp==-1` so `bot` skips and prior HP:4 remains.
- **Change:** remove fatal `uhp=0` clamp in `losehp`; leave negative HP;
  `done()` still zeros after `bot()` (D-0320).
- **Verification:** @1262 HP:4; Scr **1432→1438**; first miss **@1342**
  shining spellbook vs spellbook of jumping; RNG full; green+strict;
  17 PASS cohort + strict sample.
- **Named omissions:** Upolyd `mh` still clamped to 0 on fatal; `showdamage`/
  `maybe_wail`/`rehumanize`; SPBOOK `"%s spellbook"` descr arm (next peel).
- **Next:** @1342 pony `shining spellbook` (`objnam` SPBOOK dknown+!nn).

