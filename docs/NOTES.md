# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Park rows: re-pop only on the listed falsifier (proofs in Parked).

- **mkclass_aligned/get_location:** presence-only.
- **Work picker:** `hidden-proxy queue`; singletons Deferred.
- **Transient parks:** break_armor timing.
- **exercise:** draw-presence only, 0/553 owned.
- **gethungry/maybe_generate/mattacku/u_calc_moveamt:** presence-only, 0/553 owned.
- **do_statusline1/2:** paint-timing (statusline1 → attributes_enlightenment).
- **Fortress guards** (settled — do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable, not dialogues** (`timeout.c:623`).
- **Symptom-owner parks:** obj_resists/m_move/rloc/lightdamage/mattackm/can_carry/spoteffects/mon_adjust_speed/zapyourself/doname_base/hmonas/minliquid_core/distfleeck/passiveum.
- **STALE parks:** lesshungry/rndcurse/mhitm_ad_famn/regen_hp/barehands/do_mapping/adjattrib/from_what/look_at_monster/formatkiller/do_screen_description/reveal_terrain/peffect_acid/newcham/use_offensive/stop_donning/doeat_nonfood/gcrownu/big_little_match/xkilled/x_monnam.
- **slimed:** landing + Sick-store writers.
- **MISATTRIBUTED/STALE parks:** vomiting_dialogue/u_stuck_cannot_go/name_to_monplus/mcast_death_touch/save_dungeon/dodown/mv_bubble/one_characteristic/use_pole/trapmove/fig_transform/chwepon.
- **disclose/list_vanquished:** Hallu desync / identical-prompt cell.
- **dopush:** mimic memory/viz, not the push.
- **dochug/dotrap/mintrap/nh_timeout/mon_break_armor:** STALE presence-only.
- **that_is_a_mimic/drinkfountain:** misattributed owners (proofs in Parked).
- **poly_obj:** misattributed citation + no C arm.
- **newuhs:** STALE, full port D-1791.
- **domonnoise/dismount_steed:** STALE DUPLICATEs (D-1915/885).
- **STALE parks 2026-09-14** (proofs in Parked; re-pop only on `verify <fn>` blocked with `<fn>` as owner): test_move/domove_core (D-1800/D-1270/D-1226 live), arti_cost (D-1719 triple), m_initweap S_DEMON (D-0472), mextra trio (D-1598 + follow-ups).

## Don't re-check (≤15)

- D-1790…D-2289 stand. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 are D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` loaders D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / `setnotworn`←`owornmask` (D-1020) / `delobj` tut loot / off-level timers (D-1037) / dropped `msounds[]` (D-1053) / tut-1 keys (D-1065) / skipped `tutorial()` (D-1066). No skip D-1067…D-2289.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, or makemon→hack/artifact/minion. No re-port D-1682…D-2289.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2289: new `export function blank_novel(obj)` in `js/zap.js` directly after `cancel_item` (C position `:1367` after cancel), wired at both C call sites (canc Named: none new (zap `cancel_item` corpse revive→rot timer swap stays; `You/Your/pline_The`-as-`p
- D-2288: `js/trap.js`: new `export function clamp_hole_destination(dlev)` beside `hole_destination`, over the existing quest/hell-aware file-local `dng_bottom` Named: none new (hero `level_tele_trap`/`domagicportal` are different C functions; `assign_level`
- D-2287: new `export function set_moreluck()` in `js/attrib.js` in C position (after `stone_luck`, matching `:441` after `:423`), C order (`stone_luck(TRUE)` f Named: none new (artidisco save/rest stays Deferred; full `set_levltyp` ice/lava/count; COIN_CLAS
- D-2286: C order in C position — isok check first, returning `res` while still `ECMD_OK`; Confusion/Stunned cost after (stumble stays deferred between them, no Named: none new (`stumble_on_door_mimic`, portcullis/drawbridge close arms, steed close path, `fe
- D-2285: all 10 defs deleted; `sobj_at` joins each file's existing static `mkobj.js` import — no new module edge (all 9 files already import `mkobj.js`; same S Named: none new (`mon.js:156` `bad_rock` Sokoban boolean loop and `mon.js:918` behind-monster bou
- D-2284: the C arms verbatim in C order in `js/trap.js` `drown`, preserving short-circuit, RNG (`rn2(5)` wade, `rn2(3)` gremlin/teleport, `d(2,6)` rust), list, Named: none new (`lava_effects` stays its own live D-1913 port; `You/Your/pline_The`-as-`pline` i
- D-2283: the C arm verbatim in C position: `const kpfx = (cause && cause === '#wizintrinsic') ? Named: none new (`make_sick` Unaware talk suppress stays; `wizcmds.js` count-prefix + unavailcmd 
- D-2282: new `export async function credit_report(shkp, idx, silent)` in `js/shk.js:453` in C position (after `rob_shop`, before `remote_burglary` `:664` — mat Named: boulder-restack `sobj_at` residual (own Open row); `VIS_EFFECTS` (commented out in C too).
- D-2281: canonical `sobj_at` in `js/mkobj.js` before `nxtobj`; 9 clones retired to the import. Named: dbridge/music/steed + 7 renamed variants (own Open row).
- D-2280: new `export function obj_move_timers(src, dest)` in `js/mkobj.js` in C position (directly before `obj_split_timers`, matching C `:2339` before `:2358` Named: none new (SetVoice / migrating `#if 0` hatch arms stay with the D-1572 row; `splitbill`/`c
- D-2279: new `export function obj_split_light_source(src, dest)` in `js/timeout.js` in C position (directly before `obj_merge_light_sources`, matching C `:779` Named: none new (`timers` in the data.md row = `obj_move_timers`, its own live Open row).
- D-2278: new `export function splitbill(obj, otmp)` in `js/shk.js` in C position (directly before `sub_one_frombill`, matching C `:3623` before `:3660`), in C  Named: the four `impossible()` diagnostics (no-shkp, not-on-bill, under/zero-quantity — control f
- D-2277: both clones deleted; `import { mb_trapped } from './monmove.js'` in `dig.js` + `lock.js` (hoisted function declaration, call-time use only — `imports. Named: `mb_trapped` message predicates stay the canonical's house checks (`game.u` Unaware/Deaf, 
- D-2276: `js/invent.js` final builder — the C arm verbatim in C position (after Polymorph_control, before were-form): `Upolyd && umonnum != (ulycn ?? Named: `lays_eggs` arm (`:1879`, neither form lays eggs — no corpus row); Unchanging/Polymorph bl
- D-2275: new `export function copy_oextra(obj2, obj1)` in `js/mkobj.js` in C order (guards, `newoextra`, `has_oname` → live `oname` with `ONAME_SKIP_INVUPD`, ` Named: `shk.c` splitbill (unpaid split billing — live Open row, queued this commit as REFILL); `o
<!-- landmarks:end -->
