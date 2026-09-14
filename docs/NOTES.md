# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

- **mkclass_aligned park — do not re-pop:** presence-only (0 blocked at f7aec9b3 and working; Healer-92042@73 owned by rloc, Tourist-92100@131 by collect_coords; step-73 mkclass_aligned draws all in matched rng prefix; falsifier: `verify` blocked on mkclass_aligned).
- **get_location park — do not re-pop:** presence-only (0 blocked at f7aec9b3 and working; same pair — Healer-92042@73 owned by rloc, Tourist-92100@131 by collect_coords; arrival-gen get_location draws all in matched rng prefix; JS follows C on every live path, gaps are map-named is_ok_location Is_waterlevel + unreachable scan-falloff; falsifier: `verify` blocked on get_location).
- **Work picker:** `hidden-proxy queue`; singletons Deferred — do not re-add without a fired falsifier.
- **Queue exhausted (D-2272):** 28 rows = 7 live + 21 parked; honourables 0-owner (hitmu presence, explode/bhit tie-breaks, all parked-owned). Refill = audit rescore/growth, never re-pop.
- **More-transient parks — do not re-pop:** break_armor timing.
- **exercise park — do not re-pop:** draw-presence only (0/553 owned; falsifier: encumbrance topline/owner).
- **gethungry / maybe_generate_rnd_mon / mattacku / u_calc_moveamt parks — do not re-pop:** presence-only, 0/553 owned, JS arm-for-arm vs C (falsifier: `verify` blocked on that fn; proofs in Parked).
- **do_statusline2 park — do not re-pop:** paint-timing.
- **Fortress guards** (do not reopen): display_inventory dismiss/gameover heading/keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`).
- **Symptom-owner parks — do not re-pop:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck/passiveum.
- **STALE parks — do not re-pop:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/doeat_nonfood/gcrownu/big_little_match/xkilled. (Proofs in Parked; re-queue only on falsifier.)
- **slimed park:** landing + Sick-store writers.
- **MISATTRIBUTED/STALE parks — do not re-pop:** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon.
- **do_statusline1 park — do not re-pop:** → attributes_enlightenment.
- **disclose + list_vanquished parks — do not re-pop:** Hallu desync / identical-prompt cell (proofs in Parked).
- **dopush park — do not re-pop:** mimic memory/viz, not the push (Parked).
- **dochug park — do not re-pop:** STALE (proof in Parked; falsifier: verify blocked on dochug).
- **that_is_a_mimic park — do not re-pop:** misattributed owner + unresolved C glyph mechanism (proof + falsifier in Parked).
- **nh_timeout park — do not re-pop:** STALE (proof in Parked; falsifier: verify blocked on nh_timeout).

## Don't re-check (≤15)

- D-1790…D-2272 stand. Scars: `m_seenres` boolean, never `!== 0`; no 2nd `genus`/`accessible`/`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795/D-1816 stand. Scars: sleep `rn2(10)`; no 2nd `m_monnam`/`simple_typename`; seed4500 `[2]`: keep `flush_screen(1)`.
- No `stay` rebuild / `u.Punished` / ordinary-pit-farlook `rn2(20)`.
- seed0014 I-glyph D-1774; findone tail D-1775; D-0078 H2344/offx 72 (D-1185); `g`≠Unknown (D-1186); PREFIXCMD D-1582.
  ParanoidTrap/`domagicportal`/`undestroyable_trap`/`mktrap` dst/`goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` loaders D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- No D-0480 `tty_map_color` re-apply (D-0483). No skipped spaces / space runs >4 (D-0931). No FORCE shk satdoor/`onlineu` (D-0376), linedup/FlipX (#1092), `_pending_message` restore (D-0929), HEAVY_IRON_BALL `owt!=0` (#1194). Judge keeps RC (D-0933); §1.2 frozen. No public-LB chase.
- No memcpy gi worn/ball (D-1035) / `setnotworn`←`owornmask` (D-1020) / `delobj` tut loot / off-level timers (D-1037) / dropped `msounds[]` (D-1053) / tut-1 keys (D-1065) / skipped `tutorial()` (D-1066). No skip D-1067…D-2272.
- No `monmove.js`→sit `sticks` import / `confer_oc_oprop` rewrite / emin delete / `make_happy_shk` stub (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap`/`notice_all_mons`/savelev-freeing/`lspo_reset_level`. No `wield`/`pickup`→`polyself` `body_part`. No static `end`←`dog`. No makemon→hack/`artifact`/`minion`. No re-port D-1682…D-2272.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2272: new `export function discard_damage_owned_by(shkp)` in `js/shk.js` next to `discard_damage_struct`, in C order (`prevdam` walk, unlink owned, drop; GC Named: `teleport.js` `search_special` ANY_TYPE arm (clone drift; canonical export is `sounds.js` 
- D-2271: new `export async function stealarm()` / `unstolenarm()` in `js/steal.js` in C order (async because `unmul` awaits `afternmv` and the bodies pline/rlo Named: none new.
- D-2270: `questpgr.js` table + export, `m_detach` wiring → `nemesis_stinks`. Named: none new.
- D-2269: Sunsword EBlnd_resist + what_gives (artifact.js), from_what(-BLINDED) (attrib.js), Vision-head arms (invent.js). Named: none new.
- D-2268: deleted the local clone; added `s_suffix` to the existing `do_name.js` import (`imports.mjs --can uhitm.js do_name.js s_suffix` → ALREADY, no new edge Named: none new.
- D-2267: `js/do_wear.js` `Cloak_on` is now the C switch in C order: plain-cloak breaks; PROTECTION `makeknown`; ELVEN `toggle_stealth`; DISPLACEMENT `toggle_di Named: none new.
- D-2266: `js/pager.js` `describe_looked` — `glyph_is_invisible_id(glyph)` (already imported) tested on the shown `glyph_at` before `mon_at`, returning `I` + `a Named: none new.
- D-2265: `js/mkobj.js` — FOOD sets `oeaten = 0`; TIN sets `corpsenm = NON_PM` up front, calls imported `set_tin_variety(otmp, SPINACH_TIN | RANDOM_TIN)` (canon Named: none new.
- D-2264: `js/makemon.js` — mutate the parameter in place (`if (!bl) gpflags &= ~GP_CHECKSCARY;`, no per-pass copy) and pass `gpflags` to all three fallback `go Named: none new.
- D-2263: `js/light.js` — new `export function snuff_light_source(x, y)` in C order (index loop over `game.light_base`, `| 0` coords, first LS_OBJECT match, `ob Named: Underwater beyond the `no_op` gate (as before); `end_burn`/`cleanup_burn` `update_inventor
- D-2262: `js/polyself.js`. Named: `made_change` light-source bookkeeping (`:720–730`): JS `do_light_sources` has no hero arm
- D-2261: four file-local arms, ported from the C uhitm branches and dispatched from `damageum_adtyping`: Named: `merge_choice` shop-floor `no_charge`/`inhishop` reject (freed gold is never OBJ_FLOOR, so
- D-2260: added file-local `mhitm_ad_curs` / `_dcay` / `_deth` / `_drli` ported from the C mhitm arms, plus one `mdamagem` block that dispatches them. Named: `monkilled` pet «May %s rot/rust/roast in peace» tail (`noit_mon_nam`); `monkilled` `iflag
- D-2259: those five gates now use `(data?.mndx | 0) === PM_*` like `hates_light` / `is_wooden`. Named: uhitm (hero-poly) and mhitm (mon→mon) arms of CURS/DCAY/SLIM/DETH stay named (Open rows; M
- D-2258: `trapeffect_magic_trap` now follows the C body: explosion returns before steed; else `domagictrap` then `steedintrap(trap, null)`. Named: dart/arrow `u.usteed && !rn2(2) && steedintrap` call sites; slp_gas hero `fall_asleep` + i
<!-- landmarks:end -->
