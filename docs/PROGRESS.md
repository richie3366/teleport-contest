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
| Sessions passing | **8 / 44** |
| Screens matched | **598 / 11,405** (5.24%) |
| Positional RNG calls matched | **91,410 / 792,838** (11.53%) |
| Speed label | `17+0.08/turn` |
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
| `seed2200-wizard-quaff-zap-read` | **3018 / 3018** | **199 / 230** |
| `seed0017-samurai-altar-pray` | **3169 / 3465** | **2 / 67** |
| `seed0030-ten-diverse-deaths` | **7036 / 105529** | **40 / 1953** |
| `seed0103-knight-ride-pony` | **2344 / 2640** | 1 / 60 |
| `seed0200-monk-north-search` | **1548 / 3822** | 0 / 40 |
| `seed0101-ranger-quiver-throw-travel-engrave` | **2306 / 2371** | 2 / 27 |
| `seed0016-healer-newmoon-eat-zap` | **2544 / 3656** | **5 / 36** |
| `seed0107-samurai-twoweapon-enhance` | **2679 / 2902** | 1 / 98 |
| `seed0104-knight-ride-combat` | **2401 / 3223** | 1 / 43 |
| `seed0106-priest-extcmd-sweep` | **2580 / 4194** | 2 / 267 |
| `seed0361-archeologist-tour` | **3297 / 53865** | 0 / 366 |
| `seed0373-barbarian-quest-tour` | **2555 / 35386** | 0 / 124 |
| `seed0105-valk-chat-lamp-ration` | **987 / 2499** | 0 / 30 |
| `seed0015-valk-level2-pit-dog-wait` | **363 / 8563** | 1 / 44 |
| `seed0013-rogue-friday13-combat` | **521 / 4838** | 1 / 59 |

seed8000 + seed0900 + seed1500 + seed1800 + seed0060 + seed0102 +
seed0700 + seed1150 pass end-to-end.
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
**GemStone `xname` + throw volley + ^X gender/MC** (D-0097)
clear shared peels. seed2200 RNG **full**; Scr **199**/230 (next:
seed0017 mfndpos; screen 158 RC path residual).
seed0017 next @ 3132 `dog_move`/`mfndpos`; seed0030 next
`maybe_smudge_engr` @ 6732. Healer seed0016 next `next_ident` @
2493. Priest seed0501 still `wipeout_text`. seed0015/0200 next
`lspo_map`. seed0101 next `next_ident`. seed0013 still breaks
earlier in Lua/`sp_lev`. seed0103 next `next_ident`/`trquan` @
2337. seed0361/0373 `getbones` blocked on unbound `^V`/
`goto_level`/`makemaz`.

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
**post-fill `wallification`** (D-0100)
**ported**. Eight public sessions pass end-to-end. **0/44** throw at
`u_init_role`. seed0700 + seed1150 **PASS**. seed0017 prefix
**3132** (`dog_move`/`mfndpos` — missing walkable (30,4), D-0099;
wallification falsified as writer). seed2200 RNG **full** (Scr
**199**/230 — next residual help RC / seed0017 terrain).

- **Bounded unit:** seed0017 @ 3132 — C `levl[30][4].typ` dump after
  mklev (D-0099; themerms all default; do not probe-ship). Then
  seed2200 post-help / seed0501/0105 `wipeout_text` / seed0015/0200
  `lspo_map` / seed0101 `next_ident` / seed0103 `next_ident`/`trquan` /
  seed0030 `maybe_smudge_engr` / seed0361/0373 **`getbones`**
  (blocked: need `^V`→`goto_level`→`makemaz` first).
- **Prefer:** seed0017 (30,4) C typ dump over parked D-0006 and over
  hardcoding recording RC paths.
- **Named omissions:** Wizard/Priest/Healer `initialspell`; Knight/
  Samurai/Healer/Valkyrie/Ranger/Monk/Archeologist/Barbarian/Caveman
  `skill_init`; full `x_monnam` hallu/invis/saddle/shk; pony saddle/
  `see_monster_closeup`; other erosion proofs; `In_quest` lacquer;
  xname-path `observe_object` beyond invent_lines; full `role_init`
  beyond pantheon/SPE_LIGHT/nemesis gender; `adjabil` lose/
  `postadjabil`/weapon-skill delta; steed `u_calc_moveamt`; full
  `set_uasmon` youmonst.mmove; `make_corpse` after `corpse_chance`;
  dokick monster/object/closed-door/SDOOR/furniture; `martial()`;
  wake/engraving; `set_wounded_legs` body; `showdamage`/death `done`;
  Upolyd eel `regen_hp` loss; `regen_pw`/Teleport/Poly once-per-turn;
  `dog_goal` gettrack/FARAWAY; `throw_gold`; eat getobj single-shot;
  Blind/`look_here`; trap glyphs; hallucination/`see_objects`;
  `u_init_carry_attr_boost`; mfndpos pool/lava/garlic/`bad_rock`
  squeeze / temple / iron bars; `m_can_break_boulder`; `ALLOW_WALL`;
  hostile `m_avoid_kicked_loc` wiring; Sokoban push-avoid; `donull`
  `cmd_safety_prevention`; `makemon` Sokoban
  `throws_rocks`; `m_initinv` body; `set_malign`; telepathy/
  `Detect_monsters`/`MATCH_WARN_OF_MON` in `newsym`; full
  `weapon_insight` enhance/P_SKILL/odd P_NAME; shop `costly_spot`
  autopickup; `obj_typename` armor pair-of/set-of; full
  `magic_negation` Protection/amulet; roles.js `name.f` null where
  C has 0; GEM xname unknown/called beyond known GemStone;
  pool/lava/ice/air/cloud terrain glyphs; `help_dir` Guidebook/
  `^letter`/nodiag; cmdassist getdir beyond fire path; `align_shift`/
  `temperature_shift`;
  `peace_minded` MS_*/race_*/minion arms; egg hatch timers /
  `egg_type_from_parent`; `^V`/`level_tele`/`goto_level`/`makemaz`;
  TIN `cnutrit`; interactive `o`/`doopen` getdir; `doopen_indir`
  `b_trapped`/autounlock/mapseen; `#levelchange` `losexp`; full
  `extcmdlist`; `pluslvl` achievements/`newuexp`; takeoff `oc_delay`/
  occupation/magic helms/dragon/`A` takeoffall; dosearch0
  feel_location/mfind0/statue activate/SPFX_SEARCH; full `readobjnam`
  (fruits/traps/terrain/random/`o_ranges`); `#wizwish`; Ring_on
  learnring/attribs; Blindf_on specials; amulet change/strangle/
  sleep/flying/breathing; ring Glib/cursed-gloves/weld;
  `setworn` oc_oprop; dragon_armor_handling; touch blast `d()`/`losehp`;
  artifact wield intrinsics; wield poly/corpse/bimanual/weld-pline/
  swap/quiver ynq; other `peffect_*` / IMMEDIATE·RAY `dozap` /
  other `seffect_*` / `study_book` / non-hands `doengrave` stylus /
  engraving glyphs / multi-turn dulling; …
- **Cohort:** green gate + seed1500 + seed1800 + seed0060 + seed0102
  + seed0700 + seed1150 (must stay PASS) + strict lengths.

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

Next work is selected from the active objectives above using
`PORTING-RUNBOOK.md`, not by extending this historical list.

Historical root causes are in `DIVERGENCE-LOG.md`; loop chronology belongs in
`AGENT-LOOP-JOURNAL.md`. This file deliberately keeps only the compact
milestone list above.

### Religions banned (see Constitution)

Sparse boundary frames; test-alignment queues; new fastforward lists;
prebaked levels as the production Lua path.
