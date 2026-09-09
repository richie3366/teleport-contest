# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

- **Work picker:** `hidden-proxy queue`; singletons Deferred — do not re-add without a fired falsifier.
- **More-transient parks — do not re-pop:** break_armor (Tourist-92171@88 timing).
- **exercise park — do not re-pop:** draw-presence only (0/553 owned; tail draw-free, 111 sites/20 files — needs async vehicle; falsifier: encumbrance topline/owner).
- **do_statusline2 park — do not re-pop:** row-23 diffs are paint-timing.
- **Fortress guards** (do not reopen): display_inventory dismiss/gameover heading/keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`); STONED/SLIMED silent.
- **Symptom-owner parks — do not re-pop:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck.
- **STALE parks — do not re-pop:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/doeat_nonfood/gcrownu/big_little_match/xkilled. (Proofs in Parked; re-queue only on falsifier.)
- **slimed park:** landing + Sick-store writers.
- **MISATTRIBUTED/STALE parks — do not re-pop:** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon.
- **do_statusline1 park — do not re-pop:** Caveman-92138@72 → attributes_enlightenment.
- **disclose + list_vanquished parks — do not re-pop:** Priest-92179 Hallu desync (done_in_by imitator); Tourist-92067@224 identical-prompt cell (display-memory).
- **dopush park — do not re-pop:** seed0116 step-127 1-cell transient is giant-mimic memory/viz at (33,12), not the push (push byte-identical; RNG 12853/12853; needs temp-C-dump falsifier — recipe in Parked; `verify dopush` NO MOVEMENT).
- **dochug park — do not re-pop:** STALE (js/monmove.js:2204 arm-for-arm vs monmove.c:689–989; wormhitu live via worm.js; 0/553 scoreboard mentions; `verify dochug` vacuous; falsifier: verify blocked on dochug).
- **nh_timeout park — do not re-pop:** STALE (8 dialogues live as C-cited locals js/timeout.js:358–679 wired :859–874 in C order; stone_luck live attrib.js:664; 0/553 mentions; `verify nh_timeout` vacuous green 2/2 + cohort 7/7; live timeout.c work is slimed_to_death = open D-2023; falsifier: verify blocked on nh_timeout).

## Don't re-check (≤15)

- D-1790…D-2247 stand. Scars: `m_seenres` boolean, never `!== 0`; no 2nd `genus`/`accessible`/`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795/D-1816 stand. Scars: sleep `rn2(10)`; no 2nd `m_monnam`/`simple_typename`; seed4500 `[2]`: keep `flush_screen(1)`.
- No `stay` rebuild / `u.Punished` / ordinary-pit-farlook `rn2(20)`.
- seed0014 I-glyph D-1774; findone tail D-1775; D-0078 H2344/offx 72 (D-1185); `g`≠Unknown (D-1186); PREFIXCMD D-1582.
  ParanoidTrap/`domagicportal`/`undestroyable_trap`/`mktrap` dst/`goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` loaders D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- No D-0480 `tty_map_color` re-apply (D-0483). No skipped spaces / space runs >4 (D-0931). No FORCE shk satdoor/`onlineu` (D-0376), linedup/FlipX (#1092), `_pending_message` restore (D-0929), HEAVY_IRON_BALL `owt!=0` (#1194). Judge keeps RC (D-0933); §1.2 frozen. No public-LB chase.
- No memcpy gi worn/ball (D-1035) / `setnotworn`←`owornmask` (D-1020) / `delobj` tut loot / off-level timers (D-1037) / dropped `msounds[]` (D-1053) / tut-1 keys (D-1065) / skipped `tutorial()` (D-1066). No skip D-1067…D-2247.
- No `monmove.js`→sit `sticks` import / `confer_oc_oprop` rewrite / emin delete / `make_happy_shk` stub (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap`/`notice_all_mons`/savelev-freeing/`lspo_reset_level`. No `wield`/`pickup`→`polyself` `body_part`. No static `end`←`dog`. No makemon→hack/`artifact`/`minion`. No re-port D-1682…D-2247.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2247: `js/mhitu.js` — new `mhitm_ad_acid_u` / `mhitm_ad_dren_u` / `mhitm_ad_conf_u` in C branch/short-circuit order (acid `| 0` int idiom on the resistance/ Named: `mhitm_adtyping` SGLD/CURS/DCAY/SLIM/DGST/HALU/DETH arms (SGLD 66 + CURS 82 + DGST 76 line
- D-2246: `js/worn.js` — module-local `clear_bypass` (C staticfn: same-file caller only; Array-or-nobj walk + `Has_contents`/`cobj` recursion) + new `export fun Named: `get_nh_event` (tty no-op, `wintty.c:758` — nothing to call); POSITIONBAR / STATUS_HILITES
- D-2245: `js/makemon.js` — new `export function mkclass_poly(mletClass)` after `mk_gen_ok` in C order (same-file `mk_gen_ok`, `rn2(9)`/`rnd`, Inhell via the du Named: none new.
- D-2244: `js/mkobj.js` — new `export async function maybe_adjust_light(obj, old_range)` in C branch/short-circuit order (`| 0` int idiom on the delta; `await o Named: polyself `uskin`-merge (`:661`) and `skinback` (`:1967`) light arms — surrounding dragon-m
- D-2243: `js/steed.js` — new `export async function poly_steed(steed, oldshape)` in C branch/short-circuit order (`!can_saddle || !can_ride` → `await dismount_ Named: none new.
- D-2242: `js/detect.js` — deleted the `flush_topl_more()` call between the detect pline and the `!ct`/`browse_map` branch and replaced it with the C cite (`det Named: none new.
- D-2241: `js/invent.js` — `fully_identify_obj` gains the C tail arm in C position (after `set_cknown_lknown`, last in the body): `(otmp.otyp | 0) === EGG && (o Named: none new. turns.md:392 retires the `learn_egg_type` mention (pray-gift `discover_artifact`
- D-2240: `js/pickup.js` — full C-order port: Wwalking/Swimming/Amphibious/Breathless computed once from the same-file `pickup_checks` uprops+H/E-flat idiom (+  Named: none new.
- D-2239: `js/polyself.js` — `polymon` gains the C block in C position (immediately after `newsym`, before the deferred `u.uswallow`/`u.ustuck`/`u.usteed` arms) Named: none new.
- D-2238: `js/pray.js` — new module-local `async function pray_revive()` (C staticfn: same-file caller only) in C order: `objects_at(u.ux,u.uy)` `nexthere` walk Named: none new. p_type 1/2 arms were already live (verified against C, untouched); `Deaf` keeps 
- D-2237: `js/wizard.js` — new `export async function amulet()` in C branch/short-circuit order (`uamul`-then-`uwep` Amulet test, `rn2(15)` only when held; port Named: none new.
- D-2236: `m_into_limbo` exported (doc cites loci + deferred sync sites). Named: `mkmaze.c` `put_lregion_here` LR_TELE oneshot arm (sync level-gen: `place_lregion` has ~15
- D-2235: `select_newcham_form` gains the `cham === NON_PM` arm in C position (before the wizard gate/random tail): `which_armor(mon, W_ARM)` (already imported  Named: wizard `mon_polycontrol` (`mon.c:5209–5211` interactive `wiz_force_cham_form` — async `get
- D-2234: `nameshk` gains the C early arm in C position (before the `nseed` computation, which C also skips): `nlpIn === shklight` (reference check — `shkinit`  Named: wizard SHOPTYPE env arms (`mkshop` symb/`g`/`v`/zoo/temple/swamp overrides, `doorct != 0` 
- D-2233: `js/mcastu.js` — `castmu` condition gains `|| m_seenres(mtmp, cvt_adtyp_to_mseenres(adtyp))` in C order (draw-free disjuncts; AD_SPEL/CLRC map to `M_S Named: `buzzmu` real zap path (`lined_up` + `rn2(3)` + buzz pline/effects; stub still returns MIS
<!-- landmarks:end -->
