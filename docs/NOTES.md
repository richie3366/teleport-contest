# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

- **Work picker:** `hidden-proxy queue`; singletons Deferred; themed step-0 → `geom-probe`.
- **More-transient parks — do not re-pop:** break_armor (Tourist-92171@88 capture-timing).
- **do_statusline2 park — do not re-pop:** row-23 value diffs are paint-timing.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED silent.
- **Symptom-owner parks — do not re-pop:** obj_resists · m_move · rloc · lightdamage · mattackm/can_carry · spoteffects · mon_adjust_speed · zapyourself · doname_base · hmonas · minliquid_core · distfleeck.
- **STALE parks — do not re-pop:** lesshungry · rndcurse · mhitm_ad_famn · regen_hp · barehands · do_mapping · adjattrib · from_what · look_at_monster · formatkiller · do_screen_description · reveal_terrain · peffect_acid · newcham · use_offensive · stop_donning · doeat_nonfood · gcrownu. (Session ids + proofs in LOOP-QUEUE Parked; re-queue only on the listed falsifier.)
- **slimed park:** dual writer (landing + Sick store).
- **MISATTRIBUTED/STALE parks — do not re-pop:** vomiting_dialogue · u_stuck_cannot_go · name_to_monplus · mcast_death_touch · save_dungeon · dodown · mv_bubble · one_characteristic · use_pole · trapmove · fig_transform · chwepon.
- **do_statusline1 park — do not re-pop:** Caveman-92138@72; true writer attributes_enlightenment.
- **list_vanquished park — do not re-pop:** Tourist-92067@224 identical-prompt map cell; display-memory writer (see Parked).
- **disclose park — do not re-pop:** Priest-92179 Hallu-glyph desync (core RNG matched); killer text is done_in_by imitator (see Parked).

## Don't re-check (≤15)

- D-1790…D-2216 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2216.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2216.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2216: `js/mklev.js` only, no new cross-module edge (every callee same-module or already imported: `rn1`/`mkobj_at`/`mksobj_at`/`mkgold`/`makemon`/`mons`/`NO Named: `populate_maze` trap loop — C `mktrap(0, MKTRAP_MAZEFLAG, NULL, NULL)` picks a random type
- D-2215: `js/mthrowu.js` — full `:702–786` envelope in C order (EGG impossible/petrifier-FALLTHROUGH via live `touch_petrifies`; pie/venom `thitu(8,0)`; defaul Named: can_blnd Blindfolded/ublindf/ucreamed/visor you-gates (per the uhitm subset, map turns.md)
- D-2214: `js/eat.js` only — appended `.` to all four ACID/STONE literals to match C `"%s."`. Named: unchanged (debugpline only; `should_givit`/`temp_givit`/`incr_itimeout` wiring already liv
- D-2213: `js/apply.js` only — `import { surface } from './sit.js'` (canonical `dungeon.c:1750` port, D-2008; `imports.mjs --can apply.js sit.js surface` → IN-S Named: unchanged (use_grapple untrap non-adjacent FIXME, S_goodpos tmp_at D-1051; `surface()` swa
- D-2212: `js/detect.js` only — uswallow arm now `await Norep('What are you looking for? Named: C `nomul(0)` stays the local `nomul_clear()` subset (JS clears multi + `_repeat_search`/co
- D-2211: `js/uhitm.js` only — AD_FIRE arm now `await erode_obj(weapon, null, ERODE_BURN, EF_NONE)` via dynamic `./trap.js` import (same-function AD_CORR conven Named: `passive_obj` AD_ACID/RUST/ENCH erode arms stay deferred (map `turns.md:3433`); `passive_o
- D-2210: `js/insight.js` only — full info chain in C order with house predicate idioms (`u.Sick/Stoned/Slimed` + uprops-intrinsic mirrors per `display.js:5700– Named: none new — full 87-line C function now live (ailment deferral retired).
- D-2209: `js/uhitm.js` only — file-local `theft_petrifies` (uarmg/corpsenm/Stone_resistance gates; C-disabled `#if 0` arm stays omitted) + `steal_it` in C orde Named: `mhitm_ad_sedu` mhitm (mon→mon) arm (`:4694–4747`, mon-side steal + nymph rloc-vanish); `m
- D-2208: `js/invent.js` only — `innateFemale = Upolyd(u) ? !!u.mfemale : female` (the house Ugender idiom, cf. Named: `background_enlightenment` difgend/difalgn «started out» + «actually <align>» temp-align a
- D-2207: `js/mkobj.js` — gate narrowed to worn *combine* stack only (`obj`), citing C's absent check + the fixup's obj-worn-only fire condition; an unworn `obj Named: mergable unpaid/no_charge/obroken/otrapped/lamplit/erosion/candle/oil/same_price/omonst/on
- D-2206: `js/trap.js` only — monster arm uses live `mon_nam(mtmp)` (already imported) via `pline_mon(mtmp, …)` (already imported) in C order (pline then seetra Named: Soundeffect on both arms (no audio backend); `IndexOk` guard subsumed (trapnote is total i
- D-2205: `js/getpos.js` only — delete the clear, citing C's `msg_given = FALSE; /* suppress clear */`. Named: unchanged (getpos_menu, cmdq_pop-at-start, cmd_from_func custom binds, mouse, do_run prefi
- D-2204: `js/uhitm.js` only — wasinside arm in C position (after treasure/corpse, before newsym): `mtmp = { ...mtmp }` (C struct copy; link-field zeroing N/A,  Named: unchanged minus the retired line (flooreffects non-floor arms, floor-boulder nocorpse, MAI
- D-2203: `js/timeout.js` only — generic-loop `p === STUNNED` expiry arm in C order: re-arm flat `u.HStun = (HStun & ~TIMEOUT) | 1` (+ `u.Stunned` mirror) becau Named: unchanged — remaining silent-clear generic expiries (GLIB, VOMITING-expiry dialogue is liv
- D-2202: `js/end.js` only — full arise arm in C order (`in_mklev` + `makemon(NO_MINVENT)` with prev-restore; `!mtmp` fallback drop + `ugrave_arise = NON_PM` +  Named: unchanged — `obj_no_longer_held`; lamp `artifact_light`/`end_burn`; ebones; file compress,
<!-- landmarks:end -->
