# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker:** queue from `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe` (scores live in CURRENT.md).
- **distfleeck park (2026-09-08):** body port proven no-movement; writers Healer-92218 `domove_bump_mon` / Tourist-92061 interleave / Rogue-92030 m_move (see Parked).
- **mcalcmove park (2026-09-08):** Archeologist shipped D-2066; Rogue-92137/Knight-92188 = slime-lifesave writer (see Parked).

- **Parks (Parked rows; do not pop):** show_conduct, ready_weapon Knight-92204, mdrop_obj/dopush, dosearch grid-bug, save_dungeon, do_statusline2 lembas pair (falsifiers in Parked rows).
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **obj_resists park (2026-09-08):** 3-writer symptom (detail: Parked). S1 shipped D-2068; S2 fire-trap skip; S3 cube paradox.
- **m_move symptom-owner park (2026-09-08):** loop body faithful; Wizard-92076 shipped D-2069; Caveman-92202 cnt-j off-by-one (D-1868 arms live) — needs C per-turn cnt/mtrack dump (detail: Parked; do not re-pop).

## Don't re-check (≤15)

- D-1790…D-2073 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2073.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2073.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2073: `js/engrave.js` — same `if (de.oep)` envelope now ports C branch order: HEADSTONE → `c = 'y'`; same-type → `c = await yn_function('Do you want to add  Named: `doengrave` altar/jello/swallow/lava/pool setup arms, `livelog` literate log, Blind-feel e
- D-2072: `js/muse.js` — `mquaffmsg` vismon arm → `pline_mon` (C :297); rise arm → `pline_mon` + `ceiling(mtmp.mx,mtmp.my)` + `await trycall(otmp)`; skipmsg → ` Named: `Can_rise_up` Is_wiz1_level/In_W_tower/entry-lev special-stair (local clone `muse.js:2118`
- D-2071: `js/mhitu.js` — file-local `const AD_CORR = 42` (the file's local-AD_* idiom, cf `AD_RUST`); `ERODE_CORRODE` joins the existing `./const.js` import (n Named: `mhitm_ad_corr` uhitm arm (`:2342–2345` — hero poly'd into a CORR attacker) and mhitm arm 
- D-2070: `js/wizcmds.js` — `PROP_FLAT += [SLEEPY]: 'HSleepy'` (youprop.h:141 cite); `js/timeout.js` — `TIMEOUT_FLAT += [SLEEPY]: 'HSleepy'` so the generic `--` Named: `region_dialogue` still deferred; SLEEPY-expiry `fall_asleep`+incr (`timeout.c` case SLEEP
- D-2069: `js/polyself.js` — exported async `dohide()` (full C branch order incl. nested You_cant reason ternary; You_cant/There/pline_The composed via `pline`  Named: `youhiding` TRUE (`you_are` enlightenment menu-line) arm — JS enlightenment (invent.js) ne
- D-2068: `js/end.js` — file-local `fixuporacle` (Oracle-level gate, `mpeaceful=1`, DELPHI `roomno-ROOMOFFSET` keep, else centre `enexto`+`await rloc_to` and re Named: `unleash_all/unpunish/dismount_steed`, `forget_engravings`, `set_ghostly_objlist`/`resetob
- D-2067: `js/mhitu.js` — file-local `BInvis` + `Invis` now mirror the potion.js/zap.js idiom (`H = HInvis||intrinsic`, `E = EInvis||extrinsic`, mummy-wrapping  Named: other modules' file-local `Invis` variants untouched (potion/zap/timeout correct; trap.js 
- D-2066: `js/const.js` — `M_AP_TYPE` returns `((mon?.m_ap_type ?? 0) & M_AP_TYPMASK)` with the monst.h:73 citation; `M_AP_TYPMASK` is already exported from the Named: raw `m_ap_type` readers that bypass `M_AP_TYPE` (same latent class, no blocked session rea
- D-2065: `js/hack.js` — `You_hear` ports the Unaware arm verbatim via `youprop.h:399` (`(game.multi|0)<0 && (unconscious() || is_fainted())`, importing `telepo Named: Underwater «You barely hear»; `You_feel`/`You_see` dream arms (pre-existing defers); file-
- D-2064: `js/zap.js` — after the self-zap `losehp`, mirror the `backfire` arm: `if (game._losehp_needs_done || game.program_state?.gameover) { await finish_los Named: `dozap` `spe<0` turn-to-dust/`useupall`, `update_inventory`, `check_capacity`, `check_unpa
- D-2063: `js/polyself.js` — article arm verbatim (`the_unique_pm`/`the`/`type_is_pname` + your_race/G_UNIQ guard); `controllable_poly` const (Stunned shape mir Named: were/dragon-merge/POLY_REVERT; placeholder orc/elf/giant substitutes; mkclass_poly; contro
- D-2062: `js/invent.js` — (a) ulycn were-form arm (`an(pmname(mons(ulycn), female?FEMALE:MALE))` + « in beast form» + wizard `mtimedone` iff `umonnum==ulycn`)  Named: Upolyd foreign-shape (`vampshifted`/`polymorphed into` + wizard `mtimedone`), `lays_eggs`,
- D-2061: `js/end.js` — after `at_midnight`, `if (((game.moves | 0) <= 1) && how < PANICKED && !(game.program_state?.done_stopprint | 0)) await pline(\`Do not p Named: final-achievement tracking (`uachieved`/beginner/`ASCENDED` → `record_achievement`) + `dum
- D-2060: `js/end.js` — (1) `really_done` maintains `ugrave_arise` per C `:1206–1219` (PANICKED/BURNING+DISSOLVED/STONING/TURNED_SLIME+`G_GENOD` check via `game Named: killer-based undead arise (`end.c:326–340` wraith/mummy/zombie/vampire/ghoul — no blocked 
- D-2059: `js/mhitu.js` — file-local `diseasemu` + `mhitm_ad_pest_u` + `mhitm_ad_heal_u` in the `mhitm_ad_famn_u` shape, wired into `mhitm_adtyping_u` in exact  Named: `use_pole` body untouched (already C-faithful; statue/boulder/furniture/miss arms live).
<!-- landmarks:end -->
