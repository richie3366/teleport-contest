# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

- **Work picker:** `hidden-proxy queue`; singletons Deferred — do not re-add without a fired falsifier.
- **More-transient parks — do not re-pop:** break_armor (Tourist-92171@88 timing).
- **do_statusline2 park — do not re-pop:** row-23 diffs are paint-timing.
- **Fortress guards** (do not reopen): display_inventory dismiss/gameover heading/keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`); STONED/SLIMED silent.
- **Symptom-owner parks — do not re-pop:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck.
- **STALE parks — do not re-pop:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/doeat_nonfood/gcrownu/big_little_match. (Proofs in Parked; re-queue only on falsifier.)
- **slimed park:** landing + Sick-store writers.
- **MISATTRIBUTED/STALE parks — do not re-pop:** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon.
- **do_statusline1 park — do not re-pop:** Caveman-92138@72 → attributes_enlightenment.
- **disclose + list_vanquished parks — do not re-pop:** Priest-92179 Hallu desync (done_in_by imitator); Tourist-92067@224 identical-prompt cell (display-memory).
- **dopush park — do not re-pop:** seed0116 step-127 1-cell transient is giant-mimic memory/viz at (33,12), not the push (push byte-identical; RNG 12853/12853; needs temp-C-dump falsifier — recipe in Parked; `verify dopush` NO MOVEMENT).

## Don't re-check (≤15)

- D-1790…D-2235 stand. Scars: `m_seenres` boolean, never `!== 0`; no 2nd `genus`/`accessible`/`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795/D-1816 stand. Scars: sleep `rn2(10)`; no 2nd `m_monnam`/`simple_typename`; seed4500 `[2]`: keep `flush_screen(1)`.
- No `stay` rebuild / `u.Punished` / ordinary-pit-farlook `rn2(20)`.
- seed0014 I-glyph D-1774; findone tail D-1775; D-0078 H2344/offx 72 (D-1185); `g`≠Unknown (D-1186); PREFIXCMD D-1582.
  ParanoidTrap/`domagicportal`/`undestroyable_trap`/`mktrap` dst/`goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` loaders D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- No D-0480 `tty_map_color` re-apply (D-0483). No skipped spaces / space runs >4 (D-0931). No FORCE shk satdoor/`onlineu` (D-0376), linedup/FlipX (#1092), `_pending_message` restore (D-0929), HEAVY_IRON_BALL `owt!=0` (#1194). Judge keeps RC (D-0933); §1.2 frozen. No public-LB chase.
- No memcpy gi worn/ball (D-1035) / `setnotworn`←`owornmask` (D-1020) / `delobj` tut loot / off-level timers (D-1037) / dropped `msounds[]` (D-1053) / tut-1 keys (D-1065) / skipped `tutorial()` (D-1066). No skip D-1067…D-2235.
- No `monmove.js`→sit `sticks` import / `confer_oc_oprop` rewrite / emin delete / `make_happy_shk` stub (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap`/`notice_all_mons`/savelev-freeing/`lspo_reset_level`. No `wield`/`pickup`→`polyself` `body_part`. No static `end`←`dog`. No makemon→hack/`artifact`/`minion`. No re-port D-1682…D-2235.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2235: `select_newcham_form` gains the `cham === NON_PM` arm in C position (before the wizard gate/random tail): `which_armor(mon, W_ARM)` (already imported  Named: wizard `mon_polycontrol` (`mon.c:5209–5211` interactive `wiz_force_cham_form` — async `get
- D-2234: `nameshk` gains the C early arm in C position (before the `nseed` computation, which C also skips): `nlpIn === shklight` (reference check — `shkinit`  Named: wizard SHOPTYPE env arms (`mkshop` symb/`g`/`v`/zoo/temple/swamp overrides, `doorct != 0` 
- D-2233: `js/mcastu.js` — `castmu` condition gains `|| m_seenres(mtmp, cvt_adtyp_to_mseenres(adtyp))` in C order (draw-free disjuncts; AD_SPEL/CLRC map to `M_S Named: `buzzmu` real zap path (`lined_up` + `rn2(3)` + buzz pline/effects; stub still returns MIS
- D-2232: `js/trap.js` — new `export async function grease_protect` (C branch order; Your→`pline('Your …')` house idiom, Monnam/s_suffix/Yobjnam2/vtense arms; s Named: `inventory_resistance_check(AD_ACID)` hero gate deferred (same class as the AD_FIRE/AD_ACI
- D-2231: `js/mhitm.js` — new `set_mon_min_mhpmax` (m_lev+1 floor then caller minimum), async `lifesaved_monster` (cansee-gated plines, `mlifesaver`/`m_useup_mm Named: `stinky_nemesis` gas + `nemesis_stinks` call (quest-text `com_pager_core` dependency); `mi
- D-2230: `js/eat.js` — new `export async function maybe_finished_meal(stopping)` after `cant_finish_meal`, C branch/short-circuit order (occupation → usedtime> Named: `allmain.c:687` `stop_occupation(TRUE)` gate stays deferred per the lembas park (`botl.c` 
- D-2229: `js/eat.js` — new `export function eating_dangerous_corpse(res)` after `givit`, C branch/short-circuit order (occupation → piece → CORPSE → LOW_PM → c Named: STONE_RES `wielding_corpse(uwep/uswapwep, NULL, FALSE)` pair stays deferred (`do_wear.c:60
- D-2228: `js/dig.js` + `js/zap.js` only, control-flow, no new imports/edges (mksobj_at/xname/stackobj/newsym already imported at both sites): after `finish_los Named: none new — u.dz swallowed-pierce + pitdig conjoined/adj_pit_checks/pit_flow stay named (tu
- D-2227: `js/worn.js` — `m_dowear_type`/`m_dowear`/`maybe_m_dowear_special` async (awaits only on the !creation message path; creation callers run sync-through Named: W_ARMC `!See_invisible` selection guard still deferred (JS treats as !See_invisible — unto
- D-2226: `js/extralev.js` — `IS_WALL` joins the existing `const.js` edge; `impossible` joins a new static `display.js` edge (`imports.mjs --can extralev.js dis Named: ROGUEOPTS `name=` env parse (`do_name.c:1428`) stays deferred — no environment in scored `
- D-2225: `js/track.js` only — raw-count assign then loud `throw` on `> UTSZ` (house panic idiom); header comment records the SFCTOOL finding (C wraps only settrack/gettrack). Named: none new — `> UTSZ`-only guard mirrors C; pre-`initrack()` clear unreachable (D-0367 shape).
- D-2224: `js/muse.js` — deleted the local clone, `mon_set_minvis` joins the pre-existing static `worn.js` edge (`imports.mjs --can muse.js worn.js mon_set_minv Named: none new — full 9-line C function live; every C caller arm that reaches it (makemon/mcastu
- D-2223: `js/eat.js` — new `export async function cant_finish_meal(corpse)` after `eatfood` (must live there: the gate compares against the module-local `eatfo Named: `maybe_finished_meal` opposite predicate (`eat.c:3877–3890`) still has no JS caller — its 
- D-2222: `js/worm.js` — two exports mirroring C character-for-character (`wtails[worm.wormno | 0]` walk; callers gate wormno, C does not re-check inside). Named: save/rest wsegs (restore path; unchanged); `flip_level` isgd/vault-guard extras + ball/cha
- D-2221: `js/wield.js` only — the three arms now `await weldmsg(u.uwep)` in C position/order (dowield keeps weldmsg→reset_remarm→unsplit-undo; doquiver keeps ` Named: local `Yobjnam2` (wield.js:1108, xname+`Your`+vtense) vs canonical objnam export (cxname+q
<!-- landmarks:end -->
