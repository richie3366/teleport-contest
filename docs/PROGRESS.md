# Progress log

## Setup complete — 2026-07-12

### Docs

| Doc | Purpose |
|-----|---------|
| `CONSTITUTION.md` | Non-negotiable rules (also mirrored in `.cursor/rules/`) |
| `PORTING-RUNBOOK.md` | Operational iteration protocol and verification gates |
| `PROGRESS.md` | Baseline score + next mile |
| `NOTES.md` | Live scratchpad: hypotheses, dead ends, landmarks (not history) |
| `C-JS-MAP.md` | Structural coverage and explicit omissions |
| `DIVERGENCE-LOG.md` | Evidence-backed root causes and rejected hypotheses |
| `PORTING-STRATEGY.md` | Longer approach map |
| `GROK-PLAYBOOK.md` | Loop-agent priority, anti-patterns, verification |
| `AUDIT-ROADMAP.md` | Consolidated audit priorities (human/supervisor) |

Cursor always-on rules: `.cursor/rules/teleport-constitution.mdc`,
`.cursor/rules/agent-notes.mdc`.
JS editing rule: `.cursor/rules/js-port.mdc` (`js/**`).

### Initial baseline (historical, `8b71735`)

| Metric | Value |
|--------|------:|
| Sessions passing | **0 / 44** |
| Screens matched | **15 / 11,405** (0.13%) |
| RNG calls matched | **25,429 / 792,838** (3.21%) |
| Speed label | `9+0.06/turn` (R² 0.984) |
| Commit | `8b71735` |

### Current public score — 2026-07-13

Measured with `node frozen/ps_test_runner.mjs sessions` (direct runner; no
frozen-file overlay):

| Metric | Value |
|--------|------:|
| Sessions passing | **15 / 44** |
| Screens matched | **1357 / 11,405** (11.90%) |
| Positional RNG calls matched | **132,086 / 792,838** (16.66%) |
| Speed label | `19+0.09/turn` |
| Working-tree base | `8b71735` + committed port (see `main`) |
| Role-init throws | **0 / 44** (`u_init_role: role not ported`) |

The RNG aggregate can decrease while the port improves if a former fake path
is replaced or more sessions execute farther. Use first divergence, screens,
shared blockers, and semantic coverage together—not one vanity metric.

**Best sessions today:**

| Session | RNG | Screen |
|---------|----:|-------:|
| `seed8000-tourist-starter` | **3130 / 3130** | **23 / 23** |
| `seed0900-tourist-explore-actions` | **2983 / 2983** | **84 / 84** |
| `seed1500-rogue-explore-move` | **2768 / 2768** | **40 / 40** |
| `seed1800-tourist-eat-throw` | **2458 / 2458** | **26 / 26** |
| `seed0060-orc-rogue-kick-search` | **3626 / 3626** | **41 / 41** |
| `seed0102-ranger-name-cancel` | **4485 / 4485** | **25 / 25** |
| `seed0700-samurai-explore-descend` | **3230 / 3230** | **51 / 51** |
| `seed1150-caveman-explore-move` | **3137 / 3137** | **51 / 51** |
| `seed0106-priest-extcmd-sweep` | **4194 / 4194** | **267 / 267** |
| `seed0501-priest-cast-read-turn` | **2238 / 2238** | **28 / 28** |
| `seed2200-wizard-quaff-zap-read` | **3018 / 3018** | **229 / 230** |
| `seed0017-samurai-altar-pray` | **3465 / 3465** | **67 / 67** |
| `seed0030-ten-diverse-deaths` | **11005 / 105529** | **120 / 1953** |
| `seed0103-knight-ride-pony` | **2344 / 2640** | 2 / 60 |
| `seed0200-monk-north-search` | **3385 / 3822** | **15 / 40** |
| `seed0101-ranger-quiver-throw-travel-engrave` | **2371 / 2371** | **21 / 27** |
| `seed0016-healer-newmoon-eat-zap` | **3656 / 3656** | **36 / 36** |
| `seed0107-samurai-twoweapon-enhance` | **2684 / 2902** | **36 / 98** |
| `seed0104-knight-ride-combat` | **2394 / 3223** | 1 / 43 |
| `seed0361-archeologist-tour` | **3293 / 53865** | 0 / 366 |
| `seed0373-barbarian-quest-tour` | **2555 / 35386** | 0 / 124 |
| `seed0105-valk-chat-lamp-ration` | **2499 / 2499** | **30 / 30** |
| `seed0015-valk-level2-pit-dog-wait` | **8563 / 8563** | **44 / 44** |
| `seed0077-rogue-chargen` | **3242 / 3242** | **33 / 33** |
| `seed0013-rogue-friday13-combat` | **543 / 4838** | 1 / 59 |

seed8000 + seed0900 + seed1500 + seed1800 + seed0060 + seed0102 +
seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501 +
seed0105 + seed0016 + seed0015 pass end-to-end.
`choose_trapnote`/`hole_destination` (D-0054), `SPBOOK_no_NOVEL`
(D-0055), roles `initrecord` (D-0056), CORPSE `G_NOCORPSE` retry
(D-0057), `adjabil`/`u_calc_moveamt` Fast (D-0058), `rnl` +
autoopen `doopen_indir` (D-0059), `mfndpos` BOULDER/`NODIAG`
(D-0060), `newhp`/`newpw` level-up + `#levelchange` (D-0061),
`dosearch0`/Searching EOT (D-0062), `T`/`dotakeoff` (D-0063),
`^W`/`makewish`/`readobjnam` (D-0064), `w`/`dowield`
(D-0065), **`W`/`dowear`** (D-0066), **`P`/`doputon`** (D-0067),
**EGG `can_be_hatched`** (D-0068), **`f`/fireassist** (D-0069),
**MLET_CH/furniture/`xprname` dot** (D-0070),
**`help_dir`/Book offx** (D-0071), **`lookaround` corridor-turn**
(D-0072), **`q`/`dodrink`/`peffect_oil`** (D-0073), and
**`z`/`dozap` NODIR/`findit`** (D-0074),
**`r`/`doread` SCR_MAGIC_MAPPING/`do_mapping`** (D-0075),
**`E`/`doengrave` fingertip Elbereth** (D-0076), and
**`/`/`dowhatis` + `?`/`dohelp`/`get_lua_version`** (D-0077), and
**H2344 `offx` + `get_strength_str`** (D-0078), and
**Samurai `Hachi` + Japanese invent/disco** (D-0079), and
**STATUE `obj_glyph` mons[corpsenm].mlet** (D-0080), and
**`magic_map_background` dark_room floors** (D-0081), and
**getpos tip `nhl_text` NHW_MENU corner** (D-0082), and
**farlook `lookat` stairs + getpos curs-after-flush** (D-0083), and
**`getpos` `HJKLYUBN` rush + `truncate_to_map`** (D-0084),
**`checkfile` NHW_MENU + tabexpand/CR** (D-0085), and
**doname SCR/SPE/RIN/WAN + bimanual/`oc_big`** (D-0086), and
**look_all/look_engrs NHW_TEXT** (D-0087), and
**doextversion / NHW_TEXT quitchars / dowhatdoes** (D-0088–90), and
**`option_help`/`next_opt`** (D-0091), and
**`in_mk_themerooms` themerms `check_room`** (D-0092), and
**getdir `flush_topl_more` + `throw_obj` multishot** (D-0093), and
**`stackobj` after throw/drop** (D-0094), and
**`spoteffects`/`check_here`/`look_here` + Monnam** (D-0095), and
**`newsym` waslit + out-of-sight `S_litcorr`→`S_corr`** (D-0096), and
**GemStone `xname` + throw volley + ^X gender/MC** (D-0097), and
**`#pray`/`prayer_done`/`angrygods`** (D-0101), and
**askname splash + ParanoidPray yn** (D-0102), and
**`#chat`/`dochat`/`domonnoise` MS_BARK** (D-0103), and
**`kick_door` CLOSED/LOCKED bust** (D-0104), and
**`thrwmu`/`monmulti` move-then-shoot** (D-0105), and
**`mattacku` melee/`hitmu`/`hitmsg`** (D-0106), and
**`hitum`/hero melee/`xkilled`** (D-0107), and
**`mondead`/`relobj` death minvent** (D-0108), and
**`#sit`/`#dip`/`dipfountain`** (D-0109), and
**`#offer`/`#enhance`/`#annotate`/`#overview`/`#version`** (D-0110)
clear shared peels. seed2200 RNG **full**; Scr **229**/230 (sole miss:
parked RC path @158). seed0106 **PASS**.
Healer seed0016 **PASS**.
seed0015 **PASS**. seed0200 next `hitum`/`exercise` @ 3382.
seed0101 next Scr residual (RNG full). seed0013 still breaks earlier in
Lua/`sp_lev`. seed0103 next `next_ident`/`trquan` @ 2337.
seed0361/0373 `getbones` blocked on unbound `^V`/`goto_level`/
`makemaz`. seed0077 chargen + vault fallback + door vision/pick_lock/DEC
open-door (D-0111/D-0112/D-0113) → **PASS**. seed0030 **7215**/105529.
seed0105 RNG **full** (Scr **30**/30).
**`option_help` msg_window PREV_MSGS extract** (D-0114) + **Primary ASCII /
`symset:DECgraphics`** (D-0115) → Scr **788→851**.
**angrygods `verbalize` + `adjattrib` You_feel** (D-0116) /
**`ext_cmd_getlin_hook` full AC** (D-0117) /
**`obj_is_generic` + tty gray·black→NO_COLOR** (D-0118) /
**mthrowu `canseemon`/`thitu` + melee skip hit-on-kill** (D-0119) →
Scr **851→919**; seed0106 Scr **32→49**.
**`newsym` `_map_location` under visible monster** (D-0120) →
Scr **919→1120**; seed0106 Scr **49→250**.
**`yn_function` leave prompt + cleric `doname` skip uncursed** (D-0121) →
Scr **1120→1123**; seed0106 Scr **250→253**.
**`skill_init` + `#enhance` `add_skills_to_menu`** (D-0122) →
Scr **1123→1125**; seed0106 Scr **253→254**; seed0107 Scr **35→36**.
**`update_lastseentyp`/`recalc_mapseen` overview features** (D-0123) →
Scr **1125→1126**; seed0106 Scr **254→255**.
**`#chronicle`/`do_gamelog`/`show_gamelog` + livelog wire** (D-0124) →
Scr **1126→1128**; seed0106 Scr **255→257**.
**`#conduct`/`doconduct`/`show_conduct` + `initedog` pets++** (D-0125) →
Scr **1128→1130**; seed0106 Scr **257→259**.
**`#vanquished`/`list_vanquished` + `mvitals.died` + empty `#genocided`**
(D-0126) → Scr **1130→1133**; seed0106 Scr **259→262**.
**`#adjust`/`doorganize`** (D-0127) → Scr **1133→1135**; seed0106 Scr
**262→264**.
**`#terrain`/`doterrain`** (D-0128) → Scr **1135→1136**; seed0106 Scr
**264→265**.
**`initialspell`/`dovspell`/`age_spells`** (D-0129) → Scr **1136→1139**;
seed0106 Scr **265→266**; seed2200 Scr **200→201**.
**kill XP + doattributes `an`/Pw** (D-0130) → Scr **1139→1141**;
seed0106 **PASS**; public **11/44**; seed2200 Scr **201→202**.
**`dokeylist`/`show_menu_controls`/`docontact` + usagehlp blank** (D-0131)
→ Scr **1141→1166**; seed2200 Scr **202→227**.
**Wizard `skill_based_spellbook_id` + `read_engr_at` / `:` Elbereth**
(D-0132/D-0133) → Scr **1166→1169**;
seed2200 Scr **227→229**/230.
**`makeniche` trap engraving + `wipe_engr_at`/`wipeout_text`** (D-0134)
→ Scr **1169→1176**; RNG **104575→107102**; seed0105 RNG **full**;
seed0501 prefix **1153→2205** (`spelleffects_check`).
**`Z`/`docast`/`spelleffects_check` + SPE_HEALING self-zap** (D-0135)
→ Scr **1176→1180**; RNG **107102→107116**; seed0501 prefix
**2205→2217** (`dog_move`); Scr **6→10**/28.
**`r`/`study_book` known-refresh + ^X female role/rank** (D-0136/37)
→ Scr **1180→1198**; RNG **107116→107134**; seed0501 **PASS**;
public **12/44**.
**roles `name.f=null` + welcome gender gate** (D-0138) → seed0105
welcome matches C; Scr still **0**/30 (map `` ` ``); scores unchanged.
**`newsym` `S_engroom`/`S_engrcorr`** (D-0139) → seed0105 Scr
**0→22**/30; screens **1198→1231**; RNG unchanged; remaining chat/eat.
**`#chat` wall + apply/eat getobj** (D-0140/41/42) → seed0105 **PASS**;
public **13/44**; Scr **1231→1239**; RNG **107134→106907**.
**WAN_SLEEP `zapyourself` + Unaware `gethungry`** (D-0156) →
seed0016 RNG **full** Scr **15→31**/36; Scr **1302→1318**;
RNG **127080→128139**.
**`apply_ok` SUGGEST wand/spbook** (D-0157) → seed0016 Scr **31→32**/36;
aggregate Scr/RNG held **1318**/**128139**.
**armor `pair of`/`set of` + ^X new moon paging** (D-0158) →
seed0016 **PASS**; public **14/44**; Scr **1318→1323**; RNG held
**128139**.
**`postmov` door open/unlock/smash** (D-0159) →
seed0015 Scr **21→22**/44; Scr **1323→1324**; RNG **128139→128111**.
**`flush_screen(-1)`/`docrt`→`cls` descend `--More--`** (D-0160) →
seed0015 Scr **22→23**/44; Scr **1324→1326**.
**`clear_level_structures` `_objects_at`/`head_engr`** (D-0161) →
seed0015 Scr **23→24**/44; Scr **1326→1327**; RNG **128111→128105**.
**ordinary vs known-branch stair colors** (D-0162) →
seed0015 Scr **24→42**/44; Scr **1327→1345**.
**monster `trapeffect_sqky_board` + `just_an` letter-space** (D-0163) +
**^X gender gate + dungeon `depth`** (D-0164) →
seed0015 **PASS**; public **15/44**; Scr **1345→1347**; RNG held
**128105**.
**`maybe_smudge_engr`/`can_reach_floor`** (D-0165) →
seed0030 prefix **6732→6889** positional **7215**/105529 Scr
**110→111**/1953; Scr **1347→1348**; RNG **128105→128294**.
**Teleportation hub fill + `make_a_trap`** (D-0166) →
seed0030 prefix **6889→10584** positional **10867**/105529 Scr
**111**/1953; Scr held **1348**; RNG **128294→131946**.
**mhitm `mondied`→`make_corpse`** (D-0167) →
seed0030 prefix **10584→10608** positional **10939**/105529 Scr
**110**/1953; Scr **1348→1347**; RNG **131946→131959**.
**`dog_eat` after edible `newdogpos`** (D-0168) →
seed0030 prefix **10608→10620** positional **11005**/105529 Scr
**120**/1953; Scr **1347→1357**; RNG **131959→132086**.
Healer seed0016 **PASS**.
seed0015 **PASS**. seed0101 next Scr residual (RNG full). seed0013 still breaks earlier in
Lua/`sp_lev`. seed0103 next `next_ident`/`trquan` @ 2337.
seed0361/0373 `getbones` blocked on unbound `^V`/`goto_level`/
`makemaz`. seed0077 chargen + vault fallback + door vision/pick_lock/DEC
open-door (D-0111/D-0112/D-0113) → **PASS**. seed0030 **11005**/105529.
seed0105 RNG **full** (Scr **30**/30).

### Green gate

Every shared-code iteration must preserve:

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact scored-output lengths.

### Active objectives

**Iteration priority:** work the **primary foundation** slice below unless it is
complete or blocked on a prerequisite you document with a falsifier. The
seed1800 deep canary (`D-0006`) is **parked** — do not implement pet-movement
fixes until C state/candidate capture exists (`GROK-PLAYBOOK.md` §2).

#### Primary foundation frontier — shared mklev / moveloop peels

**Code status:** `choose_trapnote`/`hole_destination` (D-0054) +
`mkobj(SPBOOK_no_NOVEL)` (D-0055) + roles `initrecord` (D-0056) +
CORPSE `undead_to_corpse`/`G_NOCORPSE` retry (D-0057) + `adjabil`
L1 intrinsics + `u_calc_moveamt` Fast/Very_fast (D-0058) + `rnl` +
autoopen `doopen_indir` (D-0059) + `mfndpos` BOULDER/`ALLOW_ROCK` +
`NODIAG` (D-0060) + `newhp`/`newpw` level-up + `pluslvl` +
`#levelchange` (D-0061) + `dosearch0`/Searching EOT (D-0062) +
`T`/`dotakeoff` (D-0063) + `^W`/`makewish`/`readobjnam` (D-0064) +
`w`/`dowield`/`setuwep`/`retouch_object` (D-0065) +
`W`/`dowear`/`oc_delay`/`nomul` (D-0066) +
`P`/`doputon`/`Amulet_on` (D-0067) +
**EGG `can_be_hatched`/`dead_species`/`little_to_big`** (D-0068) +
**`f`/`dofire` fireassist/`doswapweapon`/cmdq** (D-0069) +
**MONSYM `MLET_CH` + furniture `terrain_glyph` + `xprname` `dot`**
(D-0070) +
**`help_dir` NHW_TEXT + Book NHW_MENU offx** (D-0071) +
**`lookaround` run==1 corridor-turn** (D-0072) +
**`q`/`dodrink`/`peffect_oil`** (D-0073) +
**`z`/`dozap` NODIR secret-door/`findit`** (D-0074) +
**`r`/`doread` SCR_MAGIC_MAPPING/`do_mapping`** (D-0075) +
**`E`/`doengrave` fingertip DUST/Elbereth** (D-0076) +
**`/`/`dowhatis`/`do_look` + `?`/`dohelp`/`get_lua_version`** (D-0077) +
**H2344 NHW_MENU `offx` + botl `get_strength_str`** (D-0078) +
**Samurai `makedog` Hachi + Japanese invent/disco** (D-0079) +
**STATUE `obj_glyph` → mons[corpsenm].mlet + white** (D-0080) +
**`magic_map_background` dark_room floors** (D-0081) +
**getpos tip `nhl_text` NHW_MENU corner** (D-0082) +
**farlook `lookat` stairs + getpos curs-after-flush** (D-0083) +
**getpos `HJKLYUBN` rush + `truncate_to_map`** (D-0084) +
**`checkfile` NHW_MENU `process_text_window`** (D-0085) +
**doname SCR/SPE/RIN/WAN + bimanual/`oc_big`** (D-0086) +
**look_all/look_engrs NHW_TEXT coords/glyph/shown-filter** (D-0087) +
**doextversion runtime options/Lua license** (D-0088) +
**NHW_TEXT `dmore` quitchars** (D-0089) +
**`dowhatdoes`** (D-0090) +
**`option_help`/`next_opt`** (D-0091) +
**`in_mk_themerooms` themerms `check_room`** (D-0092) +
**getdir `flush_topl_more` + `throw_obj` multishot** (D-0093) +
**`stackobj` after throw/drop** (D-0094) +
**`spoteffects`/`check_here`/`look_here` + Monnam** (D-0095) +
**`newsym` waslit + out-of-sight `S_litcorr`→`S_corr`** (D-0096) +
**GemStone `xname` + throw volley + ^X gender/MC** (D-0097) +
**dog_move mtrack `goto nxti`** (D-0098) +
**post-fill `wallification`** (D-0100) +
**dog_goal `gettrack`** (D-0099) +
**`#pray`/`dopray`/`prayer_done`/`angrygods` 0–3** (D-0101) +
**askname splash + ParanoidPray yn** (D-0102) +
**`#chat`/`dochat`/`domonnoise` MS_BARK** (D-0103) +
**`kick_door` CLOSED/LOCKED bust** (D-0104) +
**`thrwmu`/`monmulti` move-then-shoot** (D-0105) +
**`mattacku` melee/`hitmu`/`hitmsg`** (D-0106) +
**`hitum`/hero melee/`xkilled`** (D-0107) +
**`mondead`/`relobj` death minvent** (D-0108)
**`#sit`/`#dip`/`dipfountain`** (D-0109)
**`#offer`/`#enhance`/`#annotate`/`#overview`/`#version`** (D-0110)
**`player_selection`/`genl_player_setup`** (D-0111)
**`do_vault`/`create_vault` fallback** (D-0112)
**door `recalc_block_point` / `pick_lock` D_ISOPEN / DEC open-door**
(D-0113)
**`option_help` msg_window PREV_MSGS extract** (D-0114)
**Primary ASCII / `symset:DECgraphics` terrain** (D-0115)
**angrygods `verbalize` + `adjattrib` You_feel** (D-0116)
**`ext_cmd_getlin_hook` full AUTOCOMPLETE uniqueness** (D-0117) +
**`obj_is_generic` / tty gray·black→NO_COLOR** (D-0118)
**mthrowu `canseemon`/`thitu` an/exclam/miss + melee skip hit-on-kill**
(D-0119)
**`newsym` `_map_location` under visible monster** (D-0120)
**`yn_function` leave prompt + cleric `doname` skip uncursed** (D-0121)
**`skill_init` + `#enhance` `add_skills_to_menu`** (D-0122)
**`update_lastseentyp`/`recalc_mapseen` overview features** (D-0123)
**`#chronicle`/`do_gamelog`/`show_gamelog` + livelog wire** (D-0124)
**`#conduct`/`doconduct`/`show_conduct` + `initedog` pets++** (D-0125)
**`#vanquished`/`list_vanquished` + `mvitals.died` + empty `#genocided`**
(D-0126)
**`#adjust`/`doorganize` getobj + destination cancel** (D-0127)
**`#terrain`/`doterrain` View which? + Esc cancel** (D-0128)
**`initialspell`/`dovspell` VIEW + `age_spells`** (D-0129)
**kill XP + doattributes `an`/Pw** (D-0130)
**`dokeylist`/`show_menu_controls`/`docontact` + usagehlp blank** (D-0131)
**Wizard `skill_based_spellbook_id` + `read_engr_at`** (D-0132/33)
**`makeniche` trap `wipe_engr_at`/`wipeout_text`** (D-0134)
**`Z`/`docast`/`spelleffects_check` + SPE_HEALING self-zap** (D-0135)
**`r`/`study_book` known-refresh yn** (D-0136)
**^X female `urole.name.f`/`rank.f`** (D-0137)
**roles `name.f=null` + welcome `!name.f`+both-genders** (D-0138)
**`newsym` `S_engroom`/`S_engrcorr`** (D-0139)
**`#chat` wall/SDOOR/statue** (D-0140)
**apply getobj empty SUGGEST** (D-0141)
**eat getobj missing-letter loop** (D-0142)
**`lspo_map` + filler_region map themerms** (D-0143)
**Ghost `themeroom_fill`/`selection_rndcoord`** (D-0144)
**`finddpos_shift` irregular walk** (D-0145)
**`mksobj_init` OIL_LAMP / TOOL lamps** (D-0146)
**`occupied` `t_at` + irregular `somexy`** (D-0147)
**`random_engraving`/`get_rnd_text(ENGRAVEFILE)`** (D-0148)
**`>`/`dodown`/`goto_level`/`getbones`/`keepdogs`** (D-0149)
**monster `trapeffect_pit`/`make_corpse`** (D-0150)
**hostile `postmov`/`mon_learns_traps`/`mfndpos` known-trap** (D-0151)
**`Q`/`doquiver_core` uswapwep ready + hand-throw** (D-0152)
**`_`/`dotravel` cancel + tip PICK_NONE** (D-0153)
**`set_apparxy` Displacement/`Invis`** (D-0154)
**STETHOSCOPE `use_stethoscope`/`ustatusline` + eat `touchfood`** (D-0155)
**WAN_SLEEP `zapyourself`/`fall_asleep` + Unaware `gethungry`** (D-0156)
**`apply_ok` SUGGEST wand/spbook** (D-0157)
**armor `pair of`/`set of` + ^X new moon / 23-row page** (D-0158)
**`postmov` door open/unlock/smash** (D-0159)
**`flush_screen(-1)`/`docrt`→`cls` descend `--More--`** (D-0160)
**`clear_level_structures` `_objects_at`/`head_engr`** (D-0161)
**ordinary vs known-branch stair colors** (D-0162)
**monster `trapeffect_sqky_board` + `just_an` letter-space** (D-0163)
**^X gender gate + dungeon `depth(u.uz)`** (D-0164)
**`maybe_smudge_engr`/`can_reach_floor` after walk** (D-0165)
**Teleportation hub fill + `make_a_trap` postprocess** (D-0166)
**mhitm `mondied`→`make_corpse` ordinary** (D-0167)
**`dog_eat` after edible `newdogpos`** (D-0168)
**ported**. Fifteen public sessions pass end-to-end. **0/44** throw at
`u_init_role`. seed0700 + seed1150 + seed0017 + seed0077 + seed0106 +
seed0501 + seed0105 + seed0016 + seed0015 **PASS**. seed2200 RNG **full**
(Scr **229**/230; sole miss parked RC @158).
seed0101 RNG **full** Scr **21**/27.

- **Bounded unit:** seed0030 @10620 (distfleeck vs `rn2(4)`) /
  seed0101 Scr residual /
  seed0103 `next_ident`/`trquan` /
  seed0200 combat `@3382` (lower priority) /
  seed0361/0373 **quest `getbones`** (blocked: need `^V`→`goto_level`→
  `makemaz` first — ordinary `goto_level` now exists for stairs).
- **Prefer:** seed0030 @10620 / seed0101 Scr
  over parked D-0006 and over baking seed2200 RC paths.
  Hero `dotrap` deferred until monster pit peel is clear.
  Hero `xkilled` `make_corpse` still deferred (mhitm path done D-0167).
- **Named omissions:** full `findtravelpath` TEST_TRAV/GUESS/travelmap/
  `#retravel`; themerms fill *bodies* beyond Ghost/Teleportation hub (Temple
  altars, Ice/Storeroom/…); garden/dig postprocess; epitaph `get_rnd_text`; `invocation_pos`;
  Blocked center/Pillars/Water vault/
  complex maps; nested `des.room` themerms; `join` arboreal→ROOM;
  FIGURINE `rndmonnum_adj`/`is_human`; candle `oc_cost` age;
  study_book occupation/`learn` / novel/tribute /
  dull sleep / `cursed_book`/`confused_book`; spell swap/sort / other
  `spelleffects` otyps /
  directional `weffects`;
  enhance `can_advance`/`skill_advance`→`skill_based_spellbook_id` /
  wizard speedy; full `x_monnam`
  hallu/invis/saddle/shk; custom BIND=/number_pad/swap_yz; menu_shift;
  recording `get_configfile` path; disco identify beyond skill-ID;
  pony saddle/
  `see_monster_closeup`; other erosion proofs; `In_quest` lacquer;
  xname-path `observe_object` beyond invent_lines; full `role_init`
  beyond pantheon/SPE_LIGHT/nemesis gender; roles `title[].f` null
  where C has 0; `adjabil` lose/
  `postadjabil`/weapon-skill delta; steed `u_calc_moveamt`; full
  `set_uasmon` youmonst.mmove; `make_corpse` specials + `xkilled`/`mhitm`
  path (trap ordinary path exists D-0150);
  dokick monster/object/SDOOR/furniture/`martial`/shop-town/
  `b_trapped`; `set_wounded_legs` body; `showdamage`/death `done`;
  Upolyd eel `regen_hp` loss; `regen_pw`/Teleport/Poly once-per-turn;
  `dog_goal` wantdoor `view_from` do_clear_area; `throw_gold`; eat getobj
  `?`/`*` menu; ordinary food nutrition/occupation; Blind/`look_here`;
  trap glyphs; hallucination/`see_objects`;
  `u_init_carry_attr_boost`;   mfndpos pool/lava/garlic/`bad_rock`
  squeeze / temple / iron bars; `m_can_break_boulder`; `ALLOW_WALL`;
  hostile `m_avoid_kicked_loc` wiring; Sokoban push-avoid; `donull`
  `cmd_safety_prevention`; `makemon` Sokoban
  `throws_rocks`; `m_initinv` body; `set_malign`; telepathy/
  `Detect_monsters`/`MATCH_WARN_OF_MON` in `newsym`; full
  `weapon_insight` P_SKILL display; shop `costly_spot`
  autopickup; full
  `magic_negation` Protection/amulet; GEM xname unknown/called beyond known GemStone;
  pool/lava/ice/air/cloud terrain glyphs; `help_dir` Guidebook/
  `^letter`/nodiag; cmdassist getdir beyond fire path; `align_shift`/
  `temperature_shift`;
  `peace_minded` MS_*/race_*/minion arms; egg hatch timers /
  `egg_type_from_parent`; `^V`/`level_tele`/`goto_level`/`makemaz`;
  TIN `cnutrit`; interactive `o`/`doopen` getdir; `doopen_indir`
  `b_trapped`/autounlock/mapseen; `#levelchange` `losexp`; remaining
  `extcmdlist` (beyond `#terrain`); overview shop/temple/`shop_string`/altar-god /
  `traverse_mapseenchn`; `floorfood` sacrifice;
  `pluslvl` achievements; takeoff `oc_delay`/
  occupation/magic helms/dragon/`A` takeoffall; dosearch0
  feel_location/mfind0/statue activate/SPFX_SEARCH; full `readobjnam`
  (fruits/traps/terrain/random/`o_ranges`); `#wizwish`; Ring_on
  learnring/attribs; Blindf_on specials; amulet change/strangle/
  sleep/flying/breathing; ring Glib/cursed-gloves/weld;
  `setworn` oc_oprop; dragon_armor_handling; touch blast `d()`/`losehp`;
  artifact wield intrinsics; wield poly/corpse/bimanual/weld-pline/
  swap/quiver ynq; other `peffect_*` / IMMEDIATE·RAY `dozap` /
  other `seffect_*` / non-hands `doengrave` stylus /
  engraving glyphs / multi-turn dulling; prayer `in_trouble` body /
  `pleased`/crown/fix-trouble / angrygods 4+ /
  sacrifice / `#turn`;
  ParanoidConfirm "yes" getlin; interactive chargen rename-in-confirm /
  filter UI; `#chat` other MS_*/shop/priest/`night()` howl; full
  `apply_ok` DOWNPLAY; `hitval`/`mswings`/HTH `mon_wield`; full hero
  `attack_checks`/Cleaver/twoweapon/`weapon_hit_bonus`/`P_SKILL`/
  `dbon`/passive/knockback-on-live; `pick_lock` CLOSED/LOCKED
  occupation/autounlock; incremental `dig_point`; full `load_symset`
  IBM/UTF8; `iflags.use_color` obj/mon color gate; custom BIND=/
  number_pad/swap_yz; `mshot_xname` multishot Nth;
  surviving melee `canseemon?exclam`; hero-underfoot `_map_location`
  memory (seed0060-sensitive); infrared `_map_location`;
  `show_achievements` body; xkilled murder/peaceful luck/`adjalign`;
  eel AD_WRAP Amphibious XP; `get_mattk` still FIRST_ATTK compact;
  wizard ^X next-level XP line; hero SQKY `dotrap`;
  `mons_see_trap`; HOLE `!mindless` already_seen; full
  `m_harmless_trap` flyer/resist immunities; hostile `gettrack`/
  shortsighted/`m_search_items`; mtrapped escape `rn2(40)`; …
- **Cohort:** green gate + seed1500 + seed1800 + seed0060 + seed0102
  + seed0700 + seed1150 + seed0017 + seed0077 + seed0106 + seed0501
  + seed0105 + seed0016 + seed0015 (must stay PASS) + strict lengths.

Focused survey:

```bash
node frozen/ps_test_runner.mjs sessions 2>&1 | rg 'role not ported|PASS|FAIL' | head -40
```

#### Deep canary frontier — seed1800 pet movement

- seed1800 now **PASS** (RNG 2458/2458, Scr 26/26). D-0006 pet-movement
  state capture remains parked until a recorder exists — do not implement
  from `rng-diff` alone.
- Evidence and rejected hypotheses: `DIVERGENCE-LOG.md` D-0006.

### Structural status

Module status, constitutional debt, and named omissions live in
`C-JS-MAP.md`. This file keeps only measured progress and active objectives.

### Completed foundation miles

1. `scripts/rng-diff`
2. Real `o_init`; removed matching replay burns
3. Real fill/mineralize; removed matching replay burns
4. Tourist `u_init`/attributes and move-loop preamble
5. Basic move loop / monster turns
6. Tourist inventory/look/discovery screens
7. Dungeon topology scaffold and startup pet paths
8. seed0900 pet combat, blocking messages, menus, and screen parity
9. seed1500 Rogue invent/disco/^X screens (D-0024) — session PASS
10. seed1800 getobj throw `$` + missing-letter `--More--` loop (D-0025) —
    Scr 12→24
11. seed1800 legacy corner map + look `:` staircase (D-0026) — session PASS
12. seed0060 orc `u_init_race` / `Xtra_food` + `inv_subs` (D-0027) —
    init cleared; next was `splitobj` @ 2476
13. seed0060 `dog_invent` `splitobj` / `next_ident` (D-0028) — mismatch
    2476→2643; next `relobj` / `dog_has_minvent`
14. seed0060 `relobj` / `mdrop_obj` pet drop (D-0029) — mismatch
    2643→2663; next post-drop `dog_goal` APPORT gate
15. seed0060 `dog_goal` real `couldsee` (D-0030) — mismatch
    2663→2979; next C `exercise` vs JS `distfleeck`
16. seed0060 `#kick` / `kick_dumb` (D-0031) — mismatch 2979→2997;
    next C `distfleeck` `rn2(5)` vs JS `rn2(4)`
17. seed0060 `m_avoid_kicked_loc` (D-0032) — mismatch 2997→3016;
    next C `distfleeck` `rn2(5)` vs JS `rn2(2)`
18. seed0060 `.` / `donull` (D-0033) — mismatch 3016→3105;
    next C `makemon_rnd_goodpos` vs JS stub/`dosounds`
19. seed0060 `makemon(NULL,0,0)` / `makemon_rnd_goodpos` (D-0034) —
    mismatch 3105→3536; next C `regen_hp` vs JS `dosounds`
20. seed0060 `losehp` + `regen_hp` (D-0035) — RNG **3626/3626**; next
    screen idx 0 cells (legacy/botl)
21. seed0060 orc `hpadv` + `mon_glyph` mcolors (D-0036) — Scr **0→5**/41;
    next idx 5 (gold `doname` + death `newsym`)
22. seed0060 gold `doname` + `mondied` `newsym` (D-0037) — Scr **5→6**/41;
    next idx 6+ (drop re-pickup pline / premature wall `┌`)
23. seed0060 cansee invent pline + `wall_angle`/`set_wall_state` +
    downstairs `>` NO_COLOR (D-0038) — Scr **6→37**/41; next idx 22
    (pet `f` vs `#`)
24. seed0060 orc infravision `newsym` + `postmov` newsym (D-0039) —
    Scr **37→38**/41; next idx 33 (disco UI)
25. seed0060 disco `OBJ_DESCR`/`obj_typename` (D-0040) — Scr **38→39**/41;
    next idx 35 (^X enlightenment)
26. seed0060 ^X enlightenment autopickup/limits/`weapon_descr` (D-0041)
    — Scr **39→41**/41; session **PASS**; public **5/44**
27. Wizard `u_init_role` + `ini_inv_mkobj_filter` + Dark One gender
    (D-0042) — role throws **29→20**/44; screens **220→239**; RNG
    **28511→44848**; seed2200 next `choose_trapnote` @ 1283
28. Priest `u_init_role` + pantheon `randrole` + `Skill_P` + shield
    (D-0043) — role throws **20→17**/44; screens **239→240**; RNG
    **44848→50470**; seed0501 next `wipeout_text` @ 1153
29. Knight `u_init_role` + knows_class + helm/gloves + HJumping
    (D-0044) — role throws **17→13**/44; screens **240→243**; RNG
    **50470→58004**; seed0103 next `mkclass_aligned` @ 1185
30. Samurai `u_init_role` + Japanese discovery + ammo quiver
    (D-0045) — role throws **13→10**/44; screens **243→245**; RNG
    **58004→65208**; seed0700 next `mkclass_aligned` @ 1718
31. Healer `u_init_role` + gold `rn1` + Lamp + `POT_FULL_HEALING`
    (D-0046) — role throws **10→8**/44; screens **245→251**; RNG
    **65208→67533**; seed0016 next `hole_destination` @ 1341;
    seed0030 next `choose_trapnote` @ 5127
32. Valkyrie `u_init_role` + Lamp + weapon/armor `knows_class`
    (D-0047) — role throws **8→6**/44; screens **251→252**; RNG
    **67533→68885**; seed0015 next `lspo_map` @ 337; seed0105 next
    `wipeout_text` @ 974
33. Ranger `u_init_role` + launcher/ammo/spear `knows_class`
    (D-0048) — role throws **6→4**/44; screens **252→256**; RNG
    **68885→72474**; seed0101 next `next_ident` @ 2293; seed0102 next
    `rndmonst_adj` @ 1281
34. Monk `u_init_role` + spellbook RNG + armor `knows_class`
    (D-0049) — role throws **4→3**/44; screens **256**; RNG
    **72474→74019**; seed0200 next `lspo_map` @ 377
35. Archeologist `u_init_role` + tin opener/lamp/marker + SACK/
    TOUCHSTONE knows (D-0050) — role throws **3→2**/44; screens
    **256**; RNG **74019→76497**; seed0361 next `hole_destination` @
    1280
36. Barbarian `u_init_role` + kit RNG + Lamp + weapon/armor
    `knows_class` (D-0051) — role throws **2→1**/44; screens **256**;
    RNG **76497→78774**; seed0373 next `choose_trapnote` @ 1327
37. Caveman `u_init_role` + `Cave_man[]` + FLINT/ROCK quiver +
    graystone quan (D-0052) — role throws **1→0**/44; screens
    **256→278**; RNG **78774→81711**; seed1150 next GEM `rnd_class`
    sum @ 1118
38. `mkclass`/`mkclass_aligned` + Wizard `LVL(..., A_NONE)` extractor
    (D-0053) — screens **278→279**; RNG **81711→82967**; seed0700
    prefix **1718→1888** (`rndmonst_adj`); seed0103 **1185→2337**
    (`next_ident`/`trquan`)
39. `maketrap` `choose_trapnote` + `hole_destination` (D-0054) —
    screens **279→290**; RNG **82967→85043**; seed2200 prefix
    **1283→2724**; seed0016 **1341→2493**; seed0361 **1280→1432**
40. `mkobj(SPBOOK_no_NOVEL)` → `rnd_class`…`SPE_BLANK_PAPER` (D-0055)
    — clears misread “GEM 999”; seed1150 prefix **1118→2301**;
    seed0030 **5127→6305**; seed0373 **1327→2512**
41. roles[] `initrecord` Caveman/Valkyrie/Rogue match C (D-0056) —
    seed1150 prefix **2301→2915** (`dog_move`); positional
    **2941→2942**; Rogue seed0013 **519→521**; aggregate RNG
    **85043→85042** (Valkyrie fake record retired)
42. CORPSE `undead_to_corpse` + `G_NOCORPSE` retry + mvitals init
    (D-0057) — seed0700 prefix **1888→2733** (`u_calc_moveamt`);
    seed0361 **1432→2924** (`newhp`); aggregate RNG
    **85042→85090**; screens **290** (unchanged)
43. `adjabil(0,1)` role/race L1 + `u_calc_moveamt` Fast/Very_fast
    (D-0058) — seed0700 prefix **2733→3141** (`rnl`/`doopen_indir`);
    seed0017 **2788→2831**; aggregate RNG **85090→85494**; screens
    **290→291**; Scr seed0700 **1→2**/51
44. `rnl` + autoopen `doopen_indir` (D-0059) — seed0700 prefix
    **3141→3207** (`m_move`); positional **3229**/3230; aggregate
    RNG **85494→85803**; screens **291→295**; seed0030 **6670→6876**
    Scr **35→39**
45. `mfndpos` BOULDER/`ALLOW_ROCK` + `NODIAG` (D-0060) — seed0700
    RNG **3230**/3230 Scr **2**/51; seed0017 prefix **2711→2775**;
    aggregate RNG **85803→86026**; seed0030 **6876→7021**
46. `newhp`/`newpw` level-up + `pluslvl` + `#levelchange` (D-0061) —
    seed0361 prefix **2924→2975** (`dosearch0`); seed0373
    **2512→2549** (`getbones`); aggregate RNG **86026→86020**;
    screens **295** (unchanged)
47. `dosearch0` + Searching EOT (D-0062) — seed0361 prefix
    **2975→2979** (then takeoff, not wish); aggregate RNG
    **86020→86037**; screens **295** (unchanged); seed0700 RNG
    still full
48. `T`/`dotakeoff` delay-0 armor (D-0063) — seed0361 prefix
    **2979→3011** (`^W` wish `next_ident`); aggregate RNG
    **86037→86053**; screens **295** (unchanged); positional
    seed0361 **3051→3054**
49. `^W`/`makewish`/`readobjnam` (D-0064) — seed0361 prefix
    **3011→3035** (`w` wield); aggregate RNG **86053→85938**;
    screens **295** (unchanged); positional seed0361 **3054→3087**;
    seed0108 wishlist positional **2690**
50. `w`/`dowield`/`setuwep`/`retouch_object` (D-0065) — seed0361
    prefix **3035→3073** (`W` wear); aggregate RNG **85938→85896**;
    screens **295** (unchanged); positional seed0361 **3087→3103**;
    seed0700 RNG still full
51. `W`/`dowear`/`oc_delay`/`nomul` (D-0066) — seed0361 prefix
    **3073→3259** (`P` puton); aggregate RNG **85896→85752**;
    screens **295** (unchanged); positional seed0361 **3103→3262**;
    seed0700 RNG still full
52. `P`/`doputon`/`Amulet_on` (D-0067) — seed0361 prefix
    **3259→3292** (`getbones`); aggregate RNG **85752→85792**;
    screens **295** (unchanged); positional seed0361 **3262→3295**;
    seed0700 RNG still full; seed0373 still `getbones` @ 2549
53. EGG `can_be_hatched`/`dead_species`/`little_to_big` (D-0068)
    — seed0102 prefix **1281→4451** (`dog_goal`); aggregate RNG
    **85792→90837**; screens **295→296**; positional seed0102
    **1284→4459**; seed0700 RNG still full; getbones still blocked
    on unbound `^V`/special levels
54. `f`/`dofire` fireassist/`doswapweapon` (D-0069) — seed0102 RNG
    **4485**/4485 Scr **0**/25; aggregate RNG **90863**; screens
    **294**
55. MONSYM `MLET_CH` + furniture terrain + `xprname` `dot` (D-0070)
    — seed0102 Scr **0→17**/25; aggregate screens **294→311**;
    RNG **90863** unchanged; green cohort still PASS
56. `help_dir` NHW_TEXT + Book NHW_MENU offx (D-0071) — seed0102
    **PASS**; public **6/44**; screens **311→320**; RNG **90863**
    unchanged; green + seed1500/1800/0060/0102 PASS
57. `lookaround` run==1 corridor-turn (D-0072) — seed0017 prefix
    **2775→3132** positional **3169**/3465; aggregate RNG
    **90863→91263**; screens **320** unchanged; green cohort PASS;
    seed0700 RNG still full
58. `q`/`dodrink`/`peffect_oil` (D-0073) — seed2200 prefix
    **2724→2733** positional **2772→2790**/3018; aggregate RNG
    **91263→91220**; screens **320** unchanged; green cohort PASS;
    seed0700 RNG still full; next seed2200 `z`/`dozap`
59. `z`/`dozap` NODIR secret-door/`findit` (D-0074) — seed2200
    prefix **2733→2772** positional **2790→2794**/3018; aggregate
    RNG **91220→91222**; screens **320** unchanged; green cohort
    PASS; seed0700 RNG still full; next seed2200 `r`/`doread`
60. `r`/`doread` SCR_MAGIC_MAPPING/`do_mapping` (D-0075) — seed2200
    prefix **2772→2925** positional **2794→2940**/3018; aggregate
    RNG **91222→91390**; screens **320** unchanged; green cohort
    PASS; seed0700 RNG still full; next seed2200 `E`/`doengrave`
61. `E`/`doengrave` fingertip DUST/Elbereth (D-0076) — seed2200
    prefix **2925→2979** positional **2940→2993**/3018; aggregate
    RNG **91390→91443**; screens **320→318**; green cohort PASS;
    seed0700 RNG still full; next seed2200 post-Elbereth `/` UI
62. `/`/`dowhatis` + `?`/`dohelp`/`get_lua_version` (D-0077) —
    seed2200 RNG **3018**/3018 Scr **1**/230; aggregate RNG
    **91443→91280**; screens **318** unchanged; green cohort PASS;
    seed0700 RNG still full; next seed2200 screens / seed0017
    terrain / seed0700 screens
63. H2344 NHW_MENU `offx` + `get_strength_str` (D-0078) —
    seed0700 Scr **2→44**/51; aggregate screens **318→361**;
    RNG **91280** unchanged; green cohort PASS; next seed0700
    pet `Hachi` / invent offx / Japanese disco, or seed2200
    map `` ` `` vs `x`, or seed0017 terrain
64. Samurai `Hachi` + Japanese invent/disco (D-0079) —
    seed0700 **PASS**; public **7/44**; screens **361→370**;
    RNG **91280→91380**; green cohort + seed0700 PASS; next
    seed2200 map `` ` `` vs `x` / seed0017 terrain / seed1150
65. STATUE `obj_glyph` mons[corpsenm].mlet + white (D-0080) —
    seed2200 Scr **1→11**/230; screens **370→380**; RNG
    **91380** unchanged; green cohort PASS; next seed2200
    whatis/overlay @ screen 10 / seed0017 terrain / seed1150
66. `magic_map_background` dark_room floors (D-0081) —
    seed2200 Scr **11→89**/230; screens **380→458**; RNG
    **91380** unchanged; green cohort PASS; next seed2200
    getpos tip @ screen 36 / seed0017 terrain / seed1150
67. getpos tip `nhl_text` NHW_MENU corner (D-0082) —
    seed2200 Scr **89→90**/230; screens **458→459**; RNG
    **91380** unchanged; green cohort PASS; next seed2200
    farlook stairs @ screen 46 / seed0017 terrain / seed1150
68. farlook `lookat` stairs + getpos curs-after-flush (D-0083) —
    seed2200 Scr **90→109**/230; screens **459→478**; RNG
    **91380** unchanged; green cohort PASS; next seed2200
    getpos continue @ screen 65 / seed0017 terrain / seed1150
69. getpos `HJKLYUBN` rush + `truncate_to_map` (D-0084) —
    seed2200 Scr **109→113**/230; screens **478→482**; RNG
    **91380** unchanged; green cohort PASS; next seed2200
    checkfile pager @ screen 80 / seed0017 terrain / seed1150
70. checkfile NHW_MENU + doname xname/bimanual (D-0085/D-0086) —
    seed2200 Scr **113→117**/230; screens **482→486**; RNG
    **91380** unchanged; green cohort PASS; next seed2200
    look_all `m` @ screen 87 / seed0017 terrain / seed1150
71. look_all/look_engrs NHW_TEXT (D-0087) — seed2200 Scr
    **117→167**/230; screens **486→536**; RNG **91380→91379**;
    green cohort PASS; next seed2200 `display_file`/license @
    screen 110 / seed0017 terrain / seed1150
72. doextversion + NHW_TEXT quitchars + dowhatdoes (D-0088/89/90)
    — seed2200 Scr **167→176**/230; screens **536→545**; RNG
    **91379→91371**; green cohort PASS; next seed2200
    `option_help` @ screen 158 / seed0017 terrain / seed1150
73. `option_help`/`next_opt` + optlist extract (D-0091) —
    seed2200 Scr **176→199**/230; screens **545→568**; RNG
    **91371** unchanged; green cohort PASS; screen 158 RC path
    residual (harness `$HOME`); next seed0017 terrain /
    seed1150 / seed2200 post-help
74. `in_mk_themerooms` for themerms `check_room` (D-0092) —
    C abort-not-shrink; green/cohort held; seed0017 still
    **3132** (room east-door x vs C)
75. getdir `flush_topl_more` + `throw_obj` multishot (D-0093) —
    seed1150 prefix **3032→3042** positional **3070**/3137 Scr
    **22**/51; aggregate RNG **91371→91398**; screens **568**;
    green cohort + seed1800 PASS; next seed1150 @ 3042 /
    seed0017 mfndpos
76. `stackobj` after throw/drop (D-0094) — seed1150 RNG
    **3137**/3137 Scr **22**/51; aggregate RNG **91398→91465**;
    screens **568**; green cohort PASS; next seed1150 Scr /
    seed0017 mfndpos
77. `spoteffects`/`check_here`/`look_here` + Monnam (D-0095) —
    seed1150 Scr **22→27**/51; aggregate RNG **91465→91471**;
    screens **568→574**; green cohort PASS; next seed1150
    corridor `#` color (seed0900-safe) / seed0017 mfndpos
78. `newsym` waslit + out-of-sight `S_litcorr`→`S_corr` (D-0096) —
    seed1150 Scr **27→46**/51; aggregate RNG **91471**; screens
    **574→593**; green cohort PASS (seed0900 held); next seed1150
    invent/UI @38 / seed0017 mfndpos
79. GemStone `xname` + throw volley + ^X gender/MC (D-0097) —
    seed1150 **PASS**; public **8/44**; screens **593→598**;
    RNG **91471** unchanged; green cohort + seed1150 PASS; next
    seed0017 @ 3132 mfndpos / seed2200 Scr 199
80. dog_move mtrack `goto nxti` (D-0098) — candidate skip matches C;
    green cohort PASS; full **8/44** Scr **598** RNG **91410**;
    seed0017 still **3132** (D-0099: missing walkable (30,4))
81. post-fill `wallification` (D-0100) — C `themerooms_post` parity;
    green/cohort held; full **8/44** Scr **598** RNG **91410**;
    seed0017 still **3132** (wallification not the writer)
82. dog_goal `gettrack` (D-0099) — C recorder: (30,4)=VWALL; peel was
    `!couldsee`→gettrack `gg=(29,5)`; seed0017 prefix **3132→3327**;
    aggregate RNG **91410→91540**; screens **598**; green cohort PASS;
    next seed0017 `prayer_done` @ 3327
83. `#pray`/`prayer_done`/`angrygods` 0–3 (D-0101) — seed0017 RNG
    **3465**/3465 Scr **2**/67; seed0106 prefix **2639** (`do_attack`);
    aggregate RNG **91540→91965**; screens **598→599**; green cohort
    PASS; next seed0017 Scr / seed2200 Scr 199 / seed0106 @ 2639
84. askname splash + ParanoidPray yn (D-0102) — seed0017 **PASS**;
    public **9/44**; screens **599→718**; RNG **91965** unchanged;
    green cohort + seed0017 PASS; next seed2200 Scr 199 /
    seed0106 @ 2639 / seed0077 `player_selection`
85. `#chat`/`dochat`/`domonnoise` MS_BARK (D-0103) — seed0106
    prefix **2639→2713** (`kick_door`); aggregate RNG
    **91965→91887**; screens **718**; green cohort PASS; next
    seed0106 @ 2713 door kick / seed2200 Scr 199 /
    seed0077 `player_selection`
86. `kick_door` CLOSED/LOCKED bust (D-0104) — seed0106 prefix
    **2713→2912** (`monmulti`); positional **2784→3159**/4194;
    aggregate RNG **91887→92262**; screens **718**; green cohort
    PASS; next seed0106 @ 2912 `mthrowu` / seed2200 Scr 199 /
    seed0077 `player_selection`
87. `thrwmu`/`monmulti` move-then-shoot (D-0105) — seed0106 prefix
    **2912→2962** (`mattacku` melee); positional **3159→3217**/4194;
    aggregate RNG **92262→92304**; screens **718**; green cohort
    PASS; next seed0106 @ 2962 melee / seed2200 Scr 199 /
    seed0077 `player_selection`
88. `mattacku` melee / `hitmu` (D-0106) — seed0106 prefix
    **2962→2982** (`hitum`); positional **3188**/4194; aggregate
    RNG **92304→92375**; screens **718**; green cohort PASS; next
    seed0106 @ 2982 `hitum` / seed2200 Scr 199 /
    seed0077 `player_selection`
89. `hitum` / hero melee / `xkilled` (D-0107) — seed0106 prefix
    **2982→2993** (post-kill `dog_goal`); positional
    **3201**/4194; aggregate RNG **92375→92300**; screens **718**;
    green cohort PASS; next seed0106 @ 2993 `dog_goal` /
    seed2200 Scr 199 / seed0077 `player_selection`
90. `mondead`/`relobj` death minvent (D-0108) — seed0106 prefix
    **2993→4097** (`dipfountain`); positional **4114**/4194;
    aggregate RNG **92300→93214**; screens **718**; green cohort
    PASS; next seed0106 @ 4097 `dipfountain` / seed2200 Scr 199 /
    seed0077 `player_selection`
91. `#sit`/`#dip`/`dipfountain` (D-0109) — seed0106 prefix
    **4097→4141** (`#version` nhlib shuffle); positional
    **4145**/4194; aggregate RNG **93214→93267**; screens **718**;
    green cohort PASS; next seed0106 @ 4141 `#offer`/`#enhance`/
    `#annotate` / seed2200 Scr 199 / seed0077 `player_selection`
92. `#offer`/`#enhance`/`#annotate`/`#overview`/`#version` (D-0110)
    — seed0106 RNG **4194**/4194 Scr **5**/267; aggregate RNG
    **93267→93316**; screens **718→722**; green cohort PASS; next
    seed0106 Scr / seed2200 Scr 199 / seed0077 `player_selection`
93. `player_selection` / `genl_player_setup` (D-0111) —
    seed0077 prefix **100→1475** Scr **6→11**/33; aggregate RNG
    **93316→101108**; screens **722→746**; green cohort PASS; next
    seed0077 @ 1465 themerms/`rnd_rect` / seed2200 Scr 199 /
    seed0106 Scr
94. `do_vault` `create_vault` fallback (D-0112) —
    seed0077 RNG **3242**/3242 Scr **11→19**/33; aggregate RNG
    **101108→104563**; screens **746→759**; green cohort PASS; next
    seed0077 Scr residual / seed2200 Scr 199 / seed0106 Scr
95. door `recalc_block_point` + `pick_lock` D_ISOPEN + DEC open-door
    (D-0113) — seed0077 **PASS**; public **10/44**; screens
    **759→788**; RNG **104563→104575**; green cohort + seed0077 PASS;
    next seed2200 Scr 199 / seed0106 Scr
96. `option_help` msg_window PREV_MSGS extract (D-0114) —
    seed2200 Scr **199→200**/230; extract `#if` comment strip;
    green cohort PASS
97. Primary ASCII / `symset:DECgraphics` (D-0115) — seed0106 Scr
    **5→32**/267; seed0107 Scr **1→35**; screens **788→851**; RNG
    **104575** unchanged; green cohort PASS; next seed0106 @13
    angrygods `--More--` / seed2200 `dokeylist` @184
98. angrygods `verbalize` + `adjattrib` You_feel (D-0116) —
    seed0106 Scr **32→34**/267; screens **851→853**; RNG
    **104575** unchanged; green cohort PASS; next seed0106 @16
    progressive `# c` / seed2200 `dokeylist` @184
99. `ext_cmd_getlin_hook` full AUTOCOMPLETE set (D-0117) —
    seed0106 Scr **34→38**/267; screens **853→857**; RNG
    **104575** unchanged; green cohort PASS; next seed0106 @34
    `use_color` potion glyph / seed2200 `dokeylist` @184
100. `obj_is_generic` + tty gray/black→NO_COLOR (D-0118) —
    seed0106 Scr **38→46**/267; seed0030 Scr **46→97**; screens
    **857→916**; RNG **104575** unchanged; green cohort PASS;
    next seed0106 dart hit pline @46 / seed2200 `dokeylist` @184
101. mthrowu `canseemon`/`thitu` + melee skip hit-on-kill (D-0119) —
    seed0106 Scr **46→49**/267; screens **916→919**; RNG
    **104575** unchanged; green cohort PASS; next seed0106
    death-drop floor `)` @44 / seed2200 `dokeylist` @184
102. `newsym` `_map_location` under visible monster (D-0120) —
    seed0106 Scr **49→250**/267; screens **919→1120**; RNG
    **104575** unchanged; green cohort + seed0060 PASS; next
    seed0106 `#dip` yn @110 / garlic doname @116 /
    seed2200 `dokeylist` @184
103. `yn_function` leave prompt + cleric `doname` skip uncursed
    (D-0121) — seed0106 Scr **250→253**/267; screens
    **1120→1123**; RNG **104575** unchanged; green cohort PASS;
    next seed0106 enhance menu @133 / seed2200 `dokeylist` @184
104. `skill_init` + `#enhance` `add_skills_to_menu` (D-0122) —
    seed0106 Scr **253→254**/267; seed0107 Scr **35→36**; screens
    **1123→1125**; RNG **104575** unchanged; green cohort PASS;
    next seed0106 overview features @165 / seed2200 `dokeylist` @184
105. `update_lastseentyp`/`recalc_mapseen` overview features (D-0123) —
    seed0106 Scr **254→255**/267; screens **1125→1126**; RNG
    **104575** unchanged; green cohort PASS; next seed0106
    `#chronicle` @188 / seed2200 `dokeylist` @184
106. `#chronicle`/`do_gamelog`/`show_gamelog` + livelog wire (D-0124) —
    seed0106 Scr **255→257**/267; screens **1126→1128**; RNG
    **104575** unchanged; green cohort PASS; next seed0106
    `#conduct` @199 / seed2200 `dokeylist` @184
107. `#conduct`/`doconduct`/`show_conduct` + `initedog` pets++ (D-0125) —
    seed0106 Scr **257→259**/267; screens **1128→1130**; RNG
    **104575** unchanged; green cohort PASS; next seed0106
    `#vanquished` @213 / seed2200 `dokeylist` @184
108. `#vanquished`/`list_vanquished` + `mvitals.died` + empty
    `#genocided` (D-0126) — seed0106 Scr **259→262**/267; screens
    **1130→1133**; RNG **104575** unchanged; green cohort PASS;
    next seed0106 `#adjust` @235 / seed2200 `dokeylist` @184
109. `#adjust`/`doorganize` (D-0127) — seed0106 Scr **262→264**/267;
    screens **1133→1135**; RNG **104575** unchanged; green cohort
    PASS; next seed0106 `#terrain` @253 / seed2200 `dokeylist` @184
110. `#terrain`/`doterrain` (D-0128) — seed0106 Scr **264→265**/267;
    screens **1135→1136**; RNG **104575** unchanged; green cohort
    PASS; next seed0106 `+` spells/`initialspell` @257 /
    seed2200 `dokeylist` @184
111. `initialspell`/`dovspell`/`age_spells` (D-0129) — seed0106 Scr
    **265→266**/267; screens **1136→1139**; RNG **104575** unchanged;
    seed2200 Scr **200→201**; green cohort PASS; next seed0106
    `^X` attributes @261 / seed2200 `dokeylist` @184
112. kill XP + doattributes `an`/Pw (D-0130) — seed0106 **PASS**;
    public **11/44**; screens **1139→1141**; RNG **104575** unchanged;
    seed2200 Scr **201→202**; green cohort + seed0106 PASS; next
    seed2200 `dokeylist` @184
113. `dokeylist`/`show_menu_controls`/`docontact` + usagehlp trailing
    blank (D-0131) — seed2200 Scr **202→227**/230; screens
    **1141→1166**; RNG **104575** unchanged; green cohort PASS; next
    seed2200 disco @222 / Elbereth `:` @229
114. Wizard `skill_based_spellbook_id` + `read_engr_at` (D-0132/33) —
    seed2200 Scr **227→229**/230 (cursors full; sole miss parked RC
    @158); screens **1166→1169**; RNG **104575** unchanged; green
    cohort PASS; next seed0501 `wipeout_text` / `lspo_map` /
    `next_ident` / `getbones`
115. `makeniche` trap engraving + `wipe_engr_at`/`wipeout_text`
    (D-0134) — seed0501 prefix **1153→2205** (`spelleffects_check`);
    seed0105 RNG **2499**/2499 Scr **0**/30; screens **1169→1176**;
    RNG **104575→107102**; green cohort PASS; next seed0501 cast /
    seed0105 Scr / `lspo_map` / `next_ident`
116. `Z`/`docast`/`spelleffects_check` + SPE_HEALING self-zap (D-0135)
    — seed0501 prefix **2205→2217** (`dog_move`); Scr **6→10**/28;
    screens **1176→1180**; RNG **107102→107116**; green cohort PASS;
    next seed0501 `dog_move` / seed0105 Scr / `lspo_map` / `next_ident`
117. `r`/`study_book` known-refresh + ^X female role/rank (D-0136/37)
    — seed0501 **PASS**; public **12/44**; screens **1180→1198**;
    RNG **107116→107134**; green cohort + seed0501 PASS; next
    seed0105 Scr / `lspo_map` / `next_ident` / `getbones`
118. roles `name.f=null` + welcome gender gate (D-0138)
    — seed0105 welcome matches C; Scr still **0**/30 (map `` ` ``);
    screens/RNG unchanged **1198**/**107134**; green cohort PASS; next
    seed0105 `` ` `` / `lspo_map` / `next_ident`
119. `newsym` `S_engroom`/`S_engrcorr` (D-0139)
    — seed0105 Scr **0→22**/30; screens **1198→1231**; RNG **107134**;
    green cohort PASS; next seed0105 `#chat` wall / eat·apply /
    `lspo_map` / `next_ident`
120. `#chat` wall + apply/eat getobj (D-0140/41/42)
    — seed0105 **PASS**; public **13/44**; screens **1231→1239**;
    RNG **107134→106907**; green cohort + seed0105 PASS; next
    `lspo_map` / `next_ident` / `maybe_smudge_engr` / `getbones`
121. `lspo_map` + filler_region map themerms (D-0143)
    — seed0015 prefix **337→357**; seed0200 **377→1447**; screens
    **1239→1240**; RNG **106907→111362**; green cohort PASS; next
    Ghost fill / `dig_corridor` / `next_ident` / `maybe_smudge_engr`
122. Ghost `themeroom_fill`/`selection_rndcoord` (D-0144)
    — seed0015 prefix **357→1284**; positional **392→1472**;
    screens **1240→1239**; RNG **111362→112442**; green cohort PASS;
    next `dig_corridor` / `next_ident` / `maybe_smudge_engr`
123. `finddpos_shift` irregular walk (D-0145)
    — seed0015 prefix **1284→2513** (`mksobj_init`); positional
    **1472→2597**/8563; seed0200 **1447→1672** (`fill_ordinary_room`);
    screens **1239**; RNG **112442→115097**; green cohort PASS; next
    `mksobj_init` / `fill_ordinary_room` / `next_ident` /
    `maybe_smudge_engr`
124. `mksobj_init` OIL_LAMP / TOOL lamps (D-0146)
    — seed0015 prefix **2513→2918** (`getbones`); positional
    **2597→2925**/8563 Scr **1→20**/44; screens **1239→1259**;
    RNG **115097→115572**; green cohort PASS; next irregular `somexy`
    / ordinary `getbones` / `next_ident` / `maybe_smudge_engr`
125. `occupied` `t_at` + irregular `somexy` (D-0147)
    — seed0200 prefix **1672→1768** (`random_engraving`);
    positional **1687→3231**/3822 Scr **0→9**/40; screens
    **1259→1268**; RNG **115572→118314**; green cohort PASS; next
    `get_rnd_text(ENGRAVEFILE)` / ordinary `getbones` / `next_ident`
126. `random_engraving`/`get_rnd_text(ENGRAVEFILE)` (D-0148)
    — seed0200 prefix **1768→3382** (`hitum`/`exercise`);
    positional **3231→3385**/3822 Scr **9→14**/40; screens
    **1268→1275**; RNG **118314→121154**; green cohort PASS; next
    ordinary `getbones` / `next_ident` / `maybe_smudge_engr`
127. `>`/`dodown`/`goto_level`/`getbones`/`keepdogs` (D-0149)
    — seed0015 prefix **2918→8499** (`trapeffect_pit`); positional
    **8500**/8563 Scr **20**/44; screens **1275**; RNG
    **121154→126755**; green cohort PASS; next `trapeffect_pit` /
    `next_ident` / `maybe_smudge_engr`
128. monster `trapeffect_pit`/`make_corpse` (D-0150)
    — seed0015 prefix **8499→8518** (newt `m_move` track); positional
    **8524**/8563 Scr **21**/44; screens **1275→1276**; RNG
    **126755→126779**; green cohort PASS; next newt track /
    `next_ident` / `maybe_smudge_engr`
129. hostile `postmov`/`mon_learns_traps`/`mfndpos` known-trap (D-0151)
    — seed0015 RNG **8563**/8563 Scr **21**/44; screens **1276**;
    RNG **126779→126818**; green cohort PASS; next seed0015 Scr /
    `next_ident` / `maybe_smudge_engr`
130. `Q`/`doquiver_core` uswapwep ready + hand-throw (D-0152)
    — seed0101 prefix **2293→2302** (`_` travel); Scr **4→10**/27;
    screens **1276→1282**; RNG **126818→126936**; green cohort PASS;
    next seed0101 travel / seed0016 eat `next_ident` / seed0015 Scr
131. `_`/`dotravel` + getpos tip PICK_NONE (D-0153)
    — seed0101 prefix **2302→2309** (`set_apparxy`); Scr **10→21**/27;
    screens **1282→1293**; RNG **126936→126947**; green cohort PASS;
    next seed0101 `set_apparxy` / seed0016 eat `next_ident` /
    seed0015 Scr
132. `set_apparxy` Displacement/`Invis` (D-0154)
    — seed0101 RNG **2371**/2371 Scr **21**/27; screens **1293**;
    RNG **126947→127004**; green cohort PASS; next seed0016 eat
    `next_ident` / seed0015 Scr / `maybe_smudge_engr`
133. STETHOSCOPE + eat `touchfood`/`splitobj` (D-0155)
    — seed0016 prefix **2493→2551** (`zapyourself`); Scr **6→15**/36;
    screens **1293→1302**; RNG **127004→127080**; green cohort PASS;
    next seed0016 `zapyourself` / seed0015 Scr / `maybe_smudge_engr`
134. WAN_SLEEP `zapyourself`/`fall_asleep` + Unaware `gethungry`
    (D-0156) — seed0016 RNG **3656**/3656 Scr **15→31**/36; screens
    **1302→1318**; RNG **127080→128139**; green cohort PASS; next
    seed0016 Scr @31 / seed0015 Scr / `maybe_smudge_engr`
135. `apply_ok` SUGGEST wand/spbook (D-0157)
    — seed0016 Scr **31→32**/36; screens **1318**; RNG **128139**;
    green cohort PASS; next invent @24 offx/`pair of` / seed0015 Scr /
    `maybe_smudge_engr`
136. armor `pair of`/`set of` + ^X new moon paging (D-0158)
    — seed0016 **PASS**; public **14/44**; screens **1318→1323**;
    RNG **128139**; green cohort + seed0016 PASS; next seed0015 Scr /
    `maybe_smudge_engr` / seed0101 Scr residual
137. `postmov` door open/unlock/smash (D-0159)
    — seed0015 Scr **21→22**/44; screens **1323→1324**; RNG
    **128139→128111**; green cohort PASS; next descend `--More--` @19 /
    `maybe_smudge_engr` / seed0101 Scr residual
138. `flush_screen(-1)` / `docrt`→`cls` descend `--More--` (D-0160)
    — seed0015 Scr **22→23**/44 (screen 19 match; cursors full);
    screens **1324→1326**; RNG **128111**; green cohort PASS; next
    Dlvl:2 gold `$` vs wall @20 / `maybe_smudge_engr` / seed0101 Scr
139. `clear_level_structures` `_objects_at`/`head_engr` (D-0161)
    — seed0015 Scr **23→24**/44 (screen 20 match); screens
    **1326→1327**; RNG **128111→128105**; green cohort PASS; next
    upstairs `<` color @21 / `maybe_smudge_engr` / seed0101 Scr
140. ordinary vs known-branch stair colors (D-0162)
    — seed0015 Scr **24→42**/44 (screen 21+ match); screens
    **1327→1345**; RNG **128105**; green cohort PASS; next
    SQKY distant hear @22 / ^X genderPart @38 / `maybe_smudge_engr` /
    seed0101 Scr
141. monster `trapeffect_sqky_board` + `just_an` letter-space (D-0163)
    + ^X gender gate + dungeon `depth` (D-0164)
    — seed0015 **PASS**; public **15/44**; screens **1345→1347**;
    RNG **128105**; green cohort + seed0015 PASS; next
    `maybe_smudge_engr` / seed0101 Scr residual / seed0200 @3382
142. `maybe_smudge_engr`/`can_reach_floor` after walk (D-0165)
    — seed0030 prefix **6732→6889** (`themerms contents`); positional
    **7215**/105529 Scr **110→111**/1953; screens **1347→1348**;
    RNG **128105→128294**; green cohort PASS; next themerms fill
    @6889 / seed0101 Scr residual / seed0200 @3382
143. Teleportation hub fill + `make_a_trap` (D-0166)
    — seed0030 prefix **6889→10584** (`next_ident`); positional
    **10867**/105529 Scr **111**/1953; screens **1348**;
    RNG **128294→131946**; green cohort PASS; next seed0030
    `next_ident` @10584 / seed0101 Scr residual / seed0200 @3382
144. mhitm `mondied`→`make_corpse` ordinary (D-0167)
    — seed0030 prefix **10584→10608** (`obj_resists`); positional
    **10939**/105529 Scr **110**/1953; screens **1348→1347**;
    RNG **131946→131959**; green cohort PASS; next seed0030
    `obj_resists` @10608 / seed0101 Scr residual / seed0200 @3382
145. `dog_eat` after edible `newdogpos` (D-0168)
    — seed0030 prefix **10608→10620** (distfleeck vs `rn2(4)`);
    positional **11005**/105529 Scr **120**/1953; screens
    **1347→1357**; RNG **131959→132086**; green cohort PASS; next
    seed0030 @10620 / seed0101 Scr residual / seed0200 @3382

Next work is selected from the active objectives above using
`PORTING-RUNBOOK.md`, not by extending this historical list.

Historical root causes are in `DIVERGENCE-LOG.md`; loop chronology belongs in
`AGENT-LOOP-JOURNAL.md`. This file deliberately keeps only the compact
milestone list above.

### Religions banned (see Constitution)

Sparse boundary frames; test-alignment queues; new fastforward lists;
prebaked levels as the production Lua path.
