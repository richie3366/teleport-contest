# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

- **Work picker:** `hidden-proxy queue`; singletons Deferred — do not re-add without a fired falsifier.
- **More-transient parks — do not re-pop:** break_armor timing.
- **exercise park — do not re-pop:** draw-presence only (0/553 owned; falsifier: encumbrance topline/owner).
- **gethungry / maybe_generate_rnd_mon / mattacku / u_calc_moveamt parks — do not re-pop:** presence-only, 0/553 owned, JS arm-for-arm vs C (falsifier: `verify` blocked on that fn; proofs in Parked).
- **do_statusline2 park — do not re-pop:** paint-timing.
- **Fortress guards** (do not reopen): display_inventory dismiss/gameover heading/keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`).
- **Symptom-owner parks — do not re-pop:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck.
- **STALE parks — do not re-pop:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/doeat_nonfood/gcrownu/big_little_match/xkilled. (Proofs in Parked; re-queue only on falsifier.)
- **slimed park:** landing + Sick-store writers.
- **MISATTRIBUTED/STALE parks — do not re-pop:** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon.
- **do_statusline1 park — do not re-pop:** → attributes_enlightenment.
- **disclose + list_vanquished parks — do not re-pop:** Hallu desync / identical-prompt cell (proofs in Parked).
- **dopush park — do not re-pop:** mimic memory/viz, not the push (Parked).
- **dochug park — do not re-pop:** STALE (proof in Parked; falsifier: verify blocked on dochug).
- **nh_timeout park — do not re-pop:** STALE (proof in Parked; falsifier: verify blocked on nh_timeout).

## Don't re-check (≤15)

- D-1790…D-2253 stand. Scars: `m_seenres` boolean, never `!== 0`; no 2nd `genus`/`accessible`/`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795/D-1816 stand. Scars: sleep `rn2(10)`; no 2nd `m_monnam`/`simple_typename`; seed4500 `[2]`: keep `flush_screen(1)`.
- No `stay` rebuild / `u.Punished` / ordinary-pit-farlook `rn2(20)`.
- seed0014 I-glyph D-1774; findone tail D-1775; D-0078 H2344/offx 72 (D-1185); `g`≠Unknown (D-1186); PREFIXCMD D-1582.
  ParanoidTrap/`domagicportal`/`undestroyable_trap`/`mktrap` dst/`goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` loaders D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- No D-0480 `tty_map_color` re-apply (D-0483). No skipped spaces / space runs >4 (D-0931). No FORCE shk satdoor/`onlineu` (D-0376), linedup/FlipX (#1092), `_pending_message` restore (D-0929), HEAVY_IRON_BALL `owt!=0` (#1194). Judge keeps RC (D-0933); §1.2 frozen. No public-LB chase.
- No memcpy gi worn/ball (D-1035) / `setnotworn`←`owornmask` (D-1020) / `delobj` tut loot / off-level timers (D-1037) / dropped `msounds[]` (D-1053) / tut-1 keys (D-1065) / skipped `tutorial()` (D-1066). No skip D-1067…D-2253.
- No `monmove.js`→sit `sticks` import / `confer_oc_oprop` rewrite / emin delete / `make_happy_shk` stub (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap`/`notice_all_mons`/savelev-freeing/`lspo_reset_level`. No `wield`/`pickup`→`polyself` `body_part`. No static `end`←`dog`. No makemon→hack/`artifact`/`minion`. No re-port D-1682…D-2253.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2253: new `export function has_aggravatables(mon)` in wizard.js in C order: caster-vs-hero `In_W_tower` mismatch → false; fmon scan skipping dead and other- Named: none in this cluster.
- D-2252: `buzzmu` now follows the C body in order: `BZ_VALID_ADTYP` (const.js) silent miss → `mcan || m_seenres` → `cursetxt` + miss → `lined_up(mtmp) && rn2(3 Named: the one-arg `dobuzz`/`zhitu` `flash_str` sites in zap.js (C passes FALSE at `zap.c:4811–50
- D-2251: `js/mhitu.js` — `mhitm_ad_sgld_u` / `_curs_u` / `_dcay_u` / `_slim_u` / `_deth_u` in C branch/short-circuit order (DETH as the C switch with the 17–19 Named: uhitm and mhitm arms of CURS/DCAY/SLIM/DETH (uhitm night-chuckle cancel, `munslime`/`newch
- D-2250: `js/potion.js` — `await func(targobj)` with the C cite; new `export async function impact_arti_light(obj, worsen, seeit)` in C order (short-circuit ga Named: none new. litroom's other deferrals stand (Punished `move_bc`, gremlin light hits, Underwa
- D-2249: `js/mklev.js` — new module-local `splev_create_monster_appear_fixup(mtmp, appear, appear_as)` (C staticfn shape: same-file caller only) in C branch/sh Named: appear_as FURNITURE/OBJECT generic arms (defsyms explanation scan + `OBJ_NAME` scan + boul
- D-2248: `js/polyself.js` — module-local `armor_to_dragon(atyp)` (C staticfn: same-file callers only, cf. Named: were `do_shift` + draconian `do_merge`/uskin merge + `POLY_REVERT` + post-loop isvamp/drac
- D-2247: `js/mhitu.js` — new `mhitm_ad_acid_u` / `mhitm_ad_dren_u` / `mhitm_ad_conf_u` in C branch/short-circuit order (acid `| 0` int idiom on the resistance/ Named: `mhitm_adtyping` SGLD/CURS/DCAY/SLIM/DGST/HALU/DETH arms (SGLD 66 + CURS 82 + DGST 76 line
- D-2246: `js/worn.js` — module-local `clear_bypass` (C staticfn: same-file caller only; Array-or-nobj walk + `Has_contents`/`cobj` recursion) + new `export fun Named: `get_nh_event` (tty no-op, `wintty.c:758` — nothing to call); POSITIONBAR / STATUS_HILITES
- D-2245: `js/makemon.js` — new `export function mkclass_poly(mletClass)` after `mk_gen_ok` in C order (same-file `mk_gen_ok`, `rn2(9)`/`rnd`, Inhell via the du Named: none new.
- D-2244: `js/mkobj.js` — new `export async function maybe_adjust_light(obj, old_range)` in C branch/short-circuit order (`| 0` int idiom on the delta; `await o Named: polyself `uskin`-merge (`:661`) and `skinback` (`:1967`) light arms — surrounding dragon-m
- D-2243: `js/steed.js` — new `export async function poly_steed(steed, oldshape)` in C branch/short-circuit order (`!can_saddle || !can_ride` → `await dismount_ Named: none new.
- D-2242: `js/detect.js` — deleted the `flush_topl_more()` call between the detect pline and the `!ct`/`browse_map` branch and replaced it with the C cite (`det Named: none new.
- D-2241: `js/invent.js` — `fully_identify_obj` gains the C tail arm in C position (after `set_cknown_lknown`, last in the body): `(otmp.otyp | 0) === EGG && (o Named: none new. turns.md:392 retires the `learn_egg_type` mention (pray-gift `discover_artifact`
- D-2240: `js/pickup.js` — full C-order port: Wwalking/Swimming/Amphibious/Breathless computed once from the same-file `pickup_checks` uprops+H/E-flat idiom (+  Named: none new.
- D-2239: `js/polyself.js` — `polymon` gains the C block in C position (immediately after `newsym`, before the deferred `u.uswallow`/`u.ustuck`/`u.usteed` arms) Named: none new.
<!-- landmarks:end -->
