# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker (2026-09-06, human):** `scen-*` 7/275 is the held-out shape; mutants 255/278 saturated. Queue from `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.
- **distfleeck symptom-owner park (2026-09-08, no D-log, no js/):** body port proven no-movement (positional); per-session writers diagnosed (Healer-92218 `domove_bump_mon` «Pardon me» omit; Tourist-92061 trap-death interleave; Rogue-92030 m_move appr/fire-blast). Falsifiers in Parked row; do not re-pop.
- **mcalcmove symptom-owner park (2026-09-08, no D-log, no js/):** body faithful (gallop inactive all 3); Archeologist-92216 = M_AP_TYPE unmasked (const.js:3184 returns raw 10 vs C &0x7; mimic OBJECT|F_DKNOWN; rest-safety flip skips block) → split Open row at head; Rogue-92137/Knight-92188 = slime-lifesave writer (savelife/slimed_to_death, JS draws nothing after exercise; unprobed). Falsifiers in Parked row; do not re-pop mcalcmove.

- **Parks (Parked rows; do not pop):** show_conduct, ready_weapon Knight-92204, mdrop_obj/dopush, dosearch grid-bug, save_dungeon, do_statusline2 lembas pair (2026-09-07, reverted, tree green). Falsifiers in Parked rows.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **obj_resists park (2026-09-08):** 3-writer symptom (detail: LOOP-QUEUE Parked). S1 ship-ready: savebones remove_mon_from_bones+LEAVESTATUE (queued). S2: C fire-trap burn vs JS silent skip. S3: cube paradox (OOO-without-D fits no path; JS cube turn-less, moved draw-free).

## Don't re-check (≤15)

- D-1790…D-2065 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2065.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2065.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2065: `js/hack.js` — `You_hear` ports the Unaware arm verbatim via `youprop.h:399` (`(game.multi|0)<0 && (unconscious() || is_fainted())`, importing `telepo Named: Underwater «You barely hear»; `You_feel`/`You_see` dream arms (pre-existing defers); file-
- D-2064: `js/zap.js` — after the self-zap `losehp`, mirror the `backfire` arm: `if (game._losehp_needs_done || game.program_state?.gameover) { await finish_los Named: `dozap` `spe<0` turn-to-dust/`useupall`, `update_inventory`, `check_capacity`, `check_unpa
- D-2063: `js/polyself.js` — article arm verbatim (`the_unique_pm`/`the`/`type_is_pname` + your_race/G_UNIQ guard); `controllable_poly` const (Stunned shape mir Named: were/dragon-merge/POLY_REVERT; placeholder orc/elf/giant substitutes; mkclass_poly; contro
- D-2062: `js/invent.js` — (a) ulycn were-form arm (`an(pmname(mons(ulycn), female?FEMALE:MALE))` + « in beast form» + wizard `mtimedone` iff `umonnum==ulycn`)  Named: Upolyd foreign-shape (`vampshifted`/`polymorphed into` + wizard `mtimedone`), `lays_eggs`,
- D-2061: `js/end.js` — after `at_midnight`, `if (((game.moves | 0) <= 1) && how < PANICKED && !(game.program_state?.done_stopprint | 0)) await pline(\`Do not p Named: final-achievement tracking (`uachieved`/beginner/`ASCENDED` → `record_achievement`) + `dum
- D-2060: `js/end.js` — (1) `really_done` maintains `ugrave_arise` per C `:1206–1219` (PANICKED/BURNING+DISSOLVED/STONING/TURNED_SLIME+`G_GENOD` check via `game Named: killer-based undead arise (`end.c:326–340` wraith/mummy/zombie/vampire/ghoul — no blocked 
- D-2059: `js/mhitu.js` — file-local `diseasemu` + `mhitm_ad_pest_u` + `mhitm_ad_heal_u` in the `mhitm_ad_famn_u` shape, wired into `mhitm_adtyping_u` in exact  Named: `use_pole` body untouched (already C-faithful; statue/boulder/furniture/miss arms live).
- D-2058: `js/display.js` — thread the C int id through every `reveal_terrain_getglyph` arm so gbuf matches C: `full` arm attaches `back_to_glyph(x,y)` inside t Named: `def_char_is_furniture` itself untouched — the review-81 crystal-ball gap (JS `'<>_{|\\'`,
- D-2057: `js/attrib.js` — CHA arm now `if (tmp < 18 && (game.youmonst?.data?.mlet === 'S_NYMPH' || (u.umonnum|0) === PM_AMOROUS_DEMON)) result = 18` (C `:1214– Named: `acurr` Ogresmasher CON→25 still deferred (pre-existing map omit, untouched); `uasmon_maxS
- D-2056: `js/dothrow.js` — deleted the post-doquiver `mark_topline_seen()` with a C citation comment (no skip in C; `tty_yn_function` flushes). Named: `ok_to_throw` `check_capacity((char *)0)` still; getdir stays in the JS caller (`throw_obj
- D-2055: `js/readobjnam.js` — full C spe switch in exact C order before the recharged hunk (TIN 0 + EMPTY/SPINACH contents arms; TOWEL wetness; SLIME_MOLD `fty Named: `tin of`/`of`-split + `mgend`/`ishistoric`/`wetness`/`ftype`/`contents`/`zombify` wish-pre
- D-2054: `js/hack.js` — file-local `monstinroom(mndx,roomno)` (fmon scan, DEADMONSTER skip, `mnum ?? data.mndx` + local `in_rooms`, mirroring C pointer-equalit Named: BARRACKS `monstinroom` occupied-vs-abandoned + `wake_msg` canseemon text (same switch, unt
- D-2053: `js/spell.js` — port the dull arm in exact C order (before the interrupted-continue arm, after context creation): `!confused && !sleepRes && objdescr_ Named: `confused_book` body (still deferred in study_book + module header — neither blocked sessi
- D-2052: `js/uhitm.js` — `find_roll_to_hit` adds `Upolyd(u) ? youmonst.data.mlevel : u.ulevel`; `abon` early-returns `adj_lev(youmonst.data)-3` when poly'd (`a Named: `find_roll_to_hit` monk-armor/encumbrance/`utrap`/orc-vs-elf (RNG-free, no corpus demand);
- D-2051: `js/artifact.js` — after the blast-arm losehp, `await finish_maybe_wail()` (no-op unless the low-HP flag was set; C runs maybe_wail inside losehp befo Named: `showdamage` / `rehumanize` in losehp (pre-existing deferred, untouched — no blocked sessi
<!-- landmarks:end -->
