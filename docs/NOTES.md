# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** D-0058 fixed `adjabil(0,1)` role/race L1 intrinsics +
  `u_calc_moveamt` Fast/Very_fast `rn2(3)`. Samurai/Monk get HFast at init.
- **Hypothesis / next peel:** seed0700 `rnl(20)` @ 3141 —
  `doopen_indir` (lock.c:904) vs JS `rn2(7)`. Shared open/lock path after
  Fast-correct EOT. Also seed0361 `newhp` @ 2924; seed0102 egg
  `can_be_hatched` @ 1281; seed2200 `exercise` @ 2724; seed1150
  `dog_move` @ 2915; seed0017 `m_move` @ 2711.
- **Falsifier / next probe:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed0700-samurai-explore-descend.session.json
  # Or: node scripts/rng-diff.mjs sessions/seed0102-ranger-name-cancel.session.json
  # Or: node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json
  ```
- **Parked deep canary:** D-0006 pet movement — do not implement until C
  state/candidate capture exists.
- **Also deferred:** Wizard/Priest/Healer `initialspell`; Knight/Samurai/
  Healer/Valkyrie/Ranger/Monk/Archeologist/Barbarian/Caveman
  `skill_init`; display-path Japanese names; full `role_init` beyond
  pantheon + SPE_LIGHT + nemesis gender; `adjabil` gain/lose plines +
  `postadjabil`/`add_weapon_skill`; steed `u_calc_moveamt` path; full
  `set_uasmon` youmonst.mmove; `make_corpse` after `corpse_chance`;
  dokick monster/object/closed-door/SDOOR/furniture; `martial()`;
  wake/engraving; `set_wounded_legs` body; `showdamage`/death `done`;
  Upolyd eel `regen_hp` loss; `regen_pw`/Teleport/Poly once-per-turn;
  `dog_goal` gettrack/FARAWAY; `throw_gold`; eat getobj single-shot;
  Blind/`look_here`; trap glyphs; hallucination/`see_objects`;
  `u_init_carry_attr_boost`; mfndpos `bad_rock` squeeze; Sokoban
  push-avoid; `donull` `cmd_safety_prevention`; dog_move `mtrack` skip;
  `makemon` Sokoban `throws_rocks`; `m_initinv` body; `set_malign`;
  telepathy/`Detect_monsters`/`MATCH_WARN_OF_MON` in `newsym`; full
  `weapon_insight`; `obj_typename` armor pair-of/set-of + GemStone;
  MLET_CH beyond early subset; shop `costly_spot` autopickup; `apelist`
  exceptions; maketrap overwrite/furniture/statue/boulder; `peace_minded`
  MS_*/race_*/minion arms; `align_shift`/`temperature_shift` bodies;
  EGG `can_be_hatched` multi-retry; TIN `cnutrit` gate; …

## Don’t re-check

- Do not reject the dart in `can_carry`; an earlier C turn APPORTs it.
- Do not treat `LOST_THROWN` as a carry rejection; C does not.
- Do not gate on raw RNG index/coordinates.
- Role `mnum` must be monster-table IDs (`PM_ROGUE=338`), never roles[] index.
- **roles[] order must match C** (Rogue before Ranger) — pantheon
  `randrole` uses roles[] indices.
- Do not hardcode Tourist `Aloha` / `neutral` / `HP:10` in `allmain`.
- Legacy deity is `%d` = `align_gname(ualignbase original)` (Kos for chaotic),
  not `ngod`; goddess via leading `_` on god name (`_The Lady`).
- Botl: `showexp`/`time` default off; capitalize plname first letter for status
  only (`botl.c`).
- `is_armed` needs per-monster AT_WEAP (extractor `has_at_weaps`); mlet-only
  is wrong (e.g. kobold shaman has AT_MAGC only).
- `mkcorpstat` must restart `start_corpse_timeout` when `special_corpse(old)`
  (lichen/lizard/troll/rider) even if the override victim is ordinary — D-0011.
- seed1500 idx 2223 was **not** `m_initinv` body: C provenance `trquan` was
  Rogue dagger `ini_inv`; JS extra `rn2(100)` was wrong `is_poisonable(DAGGER)`
  in `mksobj_init` (D-0012). Follow-on sack skip was D-0013.
- C `is_poisonable` ≡ missile skills `-P_SHURIKEN..-P_BOW` (≈ `is_multigen`)
  or `permapoisoned`; daggers/spears are **not** poisonable at `mksobj_init`.
- mineralize `!rn2(3)` must `add_to_buried` (off `fobj`); always-`place_object`
  put unreachable stone gold on `fobj` and stole the first `dog_goal` APPORT
  `rn2(8)` — D-0014.
- Tainted mklev corpses (`age -= TAINT_AGE+1`) are POISON via
  `age+50 <= moves`, not CADAVER — D-0015. Do not let them overwrite APPORT.
- seed1500 idx 2517 was **not** approach `rn2(1)`: missing `uncursedcnt` skip
  + `cursemsg`/`rn2(13*uncursedcnt)` — D-0017.
- seed1500 idx 2522 was **not** `m_initweap`/`mongets`: C
  `postmov`→`mintrap`→`trapeffect_dart_trap`→`t_missile(DART)` after pet
  step; JS also needed `m_cansee`=`clear_path` so `pet_ranged_attk` did not
  score a newt through walls (`rnd(5)`) — D-0018.
- seed1500 idx 2563 was **not** prior-move geometry alone: missing cursemsg
  + thitm plines meant `--More--` never ate `l,l,j,j,h,h,.` so hero walked
  (udist 10 vs 4). Follow-on needed real `mpickobj` + drop RNG + tseen
  trap skip — D-0019.
- seed1500 idx 2618 was **not** newt geometry / invent: newt `mfndpos` included
  a `D_CLOSED` door because JS always set `OPENDOOR`; C `can_open` excludes
  nohands/verysmall — D-0020.
- seed1500 idx 2702 was **not** post-EOT `umovement` leftover: missing
  `doapply`/`pick_lock` for `a`/`e`/`l` ("You see no door there.") deferred
  the post-`l` movemon — D-0021. Encumber/`umove_after=12` DIAG falsified.
- seed1500 Scr 1/40 was **not** wrong object placement: `newsym` never drew
  `vobj_at` / treated SDOOR as `?` — D-0022. Screen coords are
  `setCell(x-1, y+1)`.
- seed1500 idx 2–3 was **not** legacy offx alone: tutorial used title-center
  pad; C `ask_do_tutorial` NHW_MENU offx from OPTIONS footer maxcol — D-0023.
- seed1500 idx 28/32/34–35 was **not** map geometry: invent cleared the map
  and short `doname`; disco skipped weapons/tools + `*`; ^X missed capitalize
  / wield — D-0024.
- seed1800 Scr 12/26 was **not** D-0006: throw prompt missing `$`, getobj
  returned on bad letter (no `--More--`/loop), stale getdir message — D-0025.
  Screen match count is not a contiguous prefix (idx 0 can fail alone).
- seed1800 Scr 24/26 was **not** one bug: idx 25 needed `look_here`/
  `dfeature_at`/`stairs_description` + Dlvl1 `u_traversed`; idx 0 needed
  legacy corner NHW_MENU **without** `clearScreen` (D-0026).
- seed0060 idx 2341 was **not** attr `rn2(100)`: missing orc `Xtra_food`
  `trquan` after Rogue blindfold check; also need `inv_subs` (D-0027).
- seed0060 idx 2476 was **not** invent merge / floor ownership alone: missing
  `splitobj`→`next_ident` when nohands pet `can_carry` returns 1 on quan>1
  (D-0028).
- seed0060 idx 2643 was **not** a dog_goal lit/m_cansee bug yet: missing
  `relobj`/`mdrop_obj` so minvent stayed full and APPORT `rn2(8)` was
  skipped (D-0029).
- seed0060 idx 2663 was **not** lit/`m_cansee`: `dog_goal` stubbed
  `in_masters_sight=true` while real `couldsee(pet)` was false — C skipped
  APPORT `rn2(8)` (D-0030).
- seed0060 idx 2979 was **not** `exerper`/`moves%10`: session key map is
  Ctrl-D then `j` with screen "You kick at empty space." — missing
  `dokick`→`kick_dumb` `exercise(A_DEX,FALSE)` (D-0031).
- seed0060 idx 2997 was **not** mklev extra CORR / `#`=wall: NetHack `#` is
  corridor; JS/C terrain at `(22,12)` both CORR. Real gap was missing
  `m_avoid_kicked_loc` after empty-space kick (D-0032). Do not shrink
  `mfndpos` by inventing walls.
- seed0060 idx 3016 was **not** post-kick pet cell / `mtrack` / fleeck arity:
  JS treated `.` as unknown (no turn), so wait-turn `distfleeck` never ran and
  the next kick's `exercise` `rn2(2)` sat at 3016 (D-0033).
- seed0060 idx 3105 was **not** a dosounds arity bug: JS stubbed
  `makemon(NULL,0,0)` after the `rn2(70)` gate; C runs `makemon_rnd_goodpos`
  `rn1(COLNO-3,2)`/`rn2(ROWNO)` then `rndmonst`/`m_initgrp` (D-0034).
- seed0060 idx 3536 was **not** regen alone: wall `kick_ouch` must
  `losehp` so `uhp < uhpmax`, else `regen_hp` never rolls (D-0035). Post-ouch
  screens can still show HP:11(11) when dmg==heal same turn.
- seed0060 Scr 0/41 was **not** legacy AC snapshot alone: missing orc
  `hpadv` made botl `HP:12` on every frame; newt used mlet green not
  `mcolors[PM_NEWT]` yellow (D-0036). Do not change ordinary stairs to
  defsym `CLR_GRAY` — C recordings use yellow for `<`.
- seed0060 idx 5 was **not** invent lettering: topline "1 gold piece" vs
  "a gold piece" (`doname` COIN) + stale newt `:` because `mondied` never
  `newsym`'d after remove (D-0037). Incomplete `make_corpse` via
  `mkcorpstat` regressed aggregate RNG (~900) — do not ship until C-faithful.
- seed0060 idx 6 was **not** same-call drop+pickup: second `dog_invent` after
  an extra pet move picks up out of sight — C silent (`cansee` false), JS
  always plined (D-0038). Premature `┌` was missing `set_wall_state` +
  `wall_angle` (WM_C_OUTER + partial seenv → S_stone). Downstairs `>` in
  recordings is NO_COLOR, not yellow (upstairs `<` stays yellow).
- seed0060 idx 22 was **not** wrong pet position / missing dog_move newsym:
  pet at (22,12) matched C; `cansee` false in dark corridor while
  `couldsee` true — orc Infravision + kitten INFRAVISIBLE must draw via
  `see_with_infrared` (D-0039). Also `postmov` needed final newsym of
  new cell.
- seed0060 idx 33 was **not** missing disco entries from `knows_object`:
  orc racial knowledge was registered; `interesting_to_discover` filtered
  them because JS lacked `OBJ_DESCR` (only a tiny FIXED_DESCRS map).
  Fix is extracted `objectDescrs`/`objectNameStrs` + `obj_typename`
  (D-0040). Do not add per-item appearance hardcodes.
- seed0060 idx 35–36 was **not** missing invent pages: Autopickup must
  read `flags.pickup`/`pickup_types` (+ thrown); race `ATTRMAX` shows
  `(current; limit:…)`; `weapon_descr` uses skill category (`short sword`)
  not racial otyp (`orcish short sword`) — D-0041. Extract `oc_skill`.
- seed2200 idx 199 was **not** inventory filter alone: Dark One has no
  fixed gender → `role_init` must `rn2(100)<50` for `nemgend` (D-0042).
  Tourist/Rogue Master-of-Thieves/Assassin are `M2_MALE` (no RNG).
- seed0501 idx 199 was **not** invent: Priest needs `role_init` pantheon
  `randrole` until a role with gods is chosen, plus **all roles' gods**
  and C roles[] order (Rogue before Ranger) — D-0043.
- seed0103 throw was **not** missing pony pet alone: Knight needed
  `Knight[]` kit + attrs/`hpadv` + full `knows_class` + helm/gloves wear
  + `HJumping|=FROMOUTSIDE` — D-0044.
- seed0700 throw was **not** YA quiver alone: Samurai needed `Samurai[]` +
  attrs/`hpadv` + Blindfold + `knows_class` + `Japanese_item_name`
  pre-discovery + `is_ammo` quiver for YA — D-0045.
- seed0016 throw was **not** spellbook filter alone: Healer needed
  `Healer[]` + attrs/`hpadv` + `umoney0=rn1(1000,1001)` + optional Lamp
  + `knows_object(POT_FULL_HEALING)` — D-0046. Typed spellbooks need no
  UNDEF filter; `initialspell` still deferred.
- seed0015/0105 throws were **not** missing pet alone: Valkyrie needed
  `Valkyrie[]` + attrs/`hpadv` + optional Lamp `!rn2(6)` + weapon/armor
  `knows_class` (excludes polearms) — D-0047.
- seed0101/0102 throws were **not** missing pet alone: Ranger needed
  `Ranger[]` + attrs/`hpadv` + `knows_class(WEAPON)` filtered to
  launchers/ammo/spears (`is_launcher`/`is_ammo`/`is_spear`) — D-0048.
- seed0200 throw was **not** missing pet alone: Monk needed `Monk[]` +
  attrs/`hpadv` + `M_spell[rn2(90)/30]` + Magicmarker/`!rn2(4)` else
  Lamp/`!rn2(10)` + armor `knows_class` + `knows_object(SHURIKEN)` —
  D-0049. `skill_init` / `initialspell` still deferred.
- seed0361 throw was **not** missing pet alone: Archeologist needed
  `Archeologist[]` + attrs/`hpadv` + Tinopener/`!rn2(10)` else Lamp/
  `!rn2(4)` else Magicmarker/`!rn2(5)` + `knows_object(SACK/TOUCHSTONE)` —
  D-0050. No `knows_class` walk. `skill_init` still deferred.
- seed0373 throw was **not** missing pet alone: Barbarian needed
  `Barbarian_0`/`Barbarian_1` via `rn2(100)>=50` + Lamp/`!rn2(6)` +
  weapon/armor `knows_class` (excludes polearms) + attrs/`hpadv` —
  D-0051. Prefer `rn2(100)>=50` over `rn2(2)` (C comment). `skill_init`
  still deferred.
- seed1150 throw was **not** missing pet alone: Caveman needed
  `Cave_man[]` (club+1, sling+2, flint 10–20 stacks, rock ×3 → 18..33,
  leather) + attrs/`hpadv`; C has **no** `knows_class`/Lamp; FLINT/ROCK
  must quiver via `ini_inv_use_obj` — D-0052. `skill_init` still deferred.
- seed0700/0103 `mkclass_aligned` was **not** a niche-layout bug: JS
  stubbed `rn2(398)` for `mkclass(S_HUMAN)`; real port needs
  `init_mongen_order` + per-candidate `rn2(9)` hell mask +
  `montoostrong` `rn2(2)` break — D-0053. Follow-on: Wizard
  `LVL(..., A_NONE)` must parse in the monster extractor or
  `mongen_order` puts WoY at difficulty 0 and desyncs the break.
- seed1150/0030 `rnd(999)` vs `rnd(1000)` was **not** GEM
  `oclass_prob_totals`: supply-chest `SPBOOK_no_NOVEL` uses
  `rnd_class(..., SPE_BLANK_PAPER)` (sum 999; novel has prob 1). JS
  remapped to `SPBOOK_CLASS` / full total 1000 — D-0055.
- seed2200/0030/0373 `rn2(12)` gap was **not** traptype arity: missing
  `maketrap` → `choose_trapnote` for `SQKY_BOARD` — D-0054.
- seed0016/0361 `rn2(4)` gap was **not** mktrap victim `rnd(4)`: missing
  `hole_destination` for HOLE/TRAPDOOR — D-0054.
- seed1150 `rn2(16)` vs `rn2(26)` @ `peace_minded` was **not** a formula
  bug: Caveman C `initrecord` is **0** (field after xlev/`/* Energy */`),
  JS had 10; also Valkyrie C=0 JS=10, Rogue C=10 JS=0 — D-0056.
- seed0700/0361 `rn2(3)` vs `rn2(2)` after a z1 `rndmonst_adj` ending
  at `rn2(21)` was **not** `align_shift` (DoD is AM_NONE → shift 0):
  C `mksobj_init` CORPSE retries `undead_to_corpse(rndmonnum())` while
  `mvitals.mvflags & G_NOCORPSE` (grid bug in the z1 pool); JS took one
  `rndmonnum` and jumped to gender `rn2(2)` — D-0057. seed0102 @ 1281
  after egg `!rn2(3)` is a **different** peel: EGG `can_be_hatched`
  loop, not CORPSE retry.
- seed0700 `rn2(3)` vs `rn2(200)` @ 2733 was **not** a dosounds arity
  reorder: Samurai (and Monk) get `HFast` via `adjabil(0,1)` at u_init;
  JS skipped `adjabil` and omitted `u_calc_moveamt` Fast/Very_fast
  `rn2(3)` — D-0058. Tourist green stays PASS (no L1 Fast).

## Landmarks

- Rogue+human init HP = **12**; Rogue+orc = **11** (role 10 + race 1).
- Wizard+human init HP = **12**, Pw ≈ **8**, AC **9** (cloak of MR `a_ac` 1).
- Priest+human init HP = **14** (role 12 + race 2); robe is ARM_CLOAK.
- Knight+human init HP = **16** (role 14 + race 2); initrecord **10**.
- Samurai+human init HP = **15** (role 13 + race 2); initrecord **10**;
  **HFast** via `adjabil` L1 (FROMEXPER|FROMOUTSIDE) → Fast not Very_fast.
- Healer+human init HP = **13** (role 11 + race 2); initrecord **10**;
  gold `rn1(1000,1001)` → **1001..2000**.
- Valkyrie+human init HP = **16** (role 14 + race 2); initrecord **0**
  (C; not 10); shield `+3`; optional Lamp `!rn2(6)`; L1 `HCold_resistance`.
- Ranger+human init HP = **15** (role 13 + race 2); initrecord **10**;
  cloak of displacement `+2`; arrow stacks `rn2` quan 50–59 and 30–39;
  L1 `HSearching`.
- Monk+human init HP = **14** (role 12 + race 2); initrecord **10**;
  gloves `+2`, robe `+1`; spellbook via `rn2(90)/30` → Healing /
  Protection / Confuse Monster; Magicmarker `!rn2(4)` else Lamp `!rn2(10)`;
  L1 `HFast` + `HSleep_resistance` + `HSee_invisible`.
- Archeologist+human init HP = **13** (role 11 + race 2); initrecord **10**;
  whip `+2`; pick-axe/tinning kit `UNDEF_SPE`; Tinopener `!rn2(10)` else
  Lamp `!rn2(4)` else Magicmarker `!rn2(5)`; L1 `HSearching`.
- Barbarian+human init HP = **16** (role 14 + race 2); initrecord **10**;
  kit via `rn2(100)>=50` → two-handed sword+axe else battle-axe+short
  sword; ring mail; optional Lamp `!rn2(6)`; L1 `HPoison_resistance`.
- Caveman+human init HP = **16** (role 14 + race 2); initrecord **0**
  (C; not 10); club `+1`, sling `+2`; flint trop 10–20; rock trop
  3×`rn1(6,6)` → 18..33; leather armor; little dog pet.
- Rogue initrecord **10** (C; JS had wrongly 0 until D-0056); L1 `HStealth`.
- Rogue legacy offx = `max(10, 80 - maxcol - 1)` (Kos → 23; The Lady → 17).
- Tutorial menu offx = 20 (OPTIONS `.nethackrc` line → maxcol 59); cursor
  `[27,6]` on `(end) `.
- Rogue invent longest line → maxcol 51 → offx 28; cursor `[35,10]` on
  `(end) `.
- seed0013 datetime `20001013090000` → Friday 13 + FULL_MOON preamble msgs.
- Session step RNG is “after this key until next `nhgetch`”.
- Starting pet `apport = ACURR(A_CHA)` at makedog → **3** until drop/eat changes it.
- seed1500: D-0024 → screens **40/40** PASS; CORPSE map color = `mon_color(corpsenm)`
  (orc → CLR_RED), not `objects[CORPSE].oc_color`.
- seed1800: D-0026 → screens **26/26** PASS (legacy corner map + staircase look).
- seed0060: D-0041 → screens **41**/41 PASS; RNG **3626**/3626.
- seed2200: D-0054 → past `choose_trapnote`; rng-diff prefix **2724**
  (`exercise`); positional **2772**/3018.
- seed0016: D-0054 → past `hole_destination`; prefix **2493**
  (`next_ident`); positional **2538**/3656 Scr **5**/36.
- seed0030: D-0058 → past Fast; prefix still mid-session; positional
  **6670**/105529 Scr **35**/1953.
- seed0373: D-0054/55 → past trap+SPBOOK; prefix **2512** (`newhp`);
  positional **2582**/35386.
- seed0361: D-0057 → past CORPSE retry; prefix **2924** (`newhp`);
  positional **2972**/53865.
- seed1150: D-0056 → past `peace_minded`; prefix **2915** (`dog_move`);
  positional **2942**/3137 Scr **22**/51.
- seed0700: D-0058 → past `u_calc_moveamt` Fast; rng-diff prefix
  **3141** (`rnl`/`doopen_indir`); positional **3146**/3230 Scr **2**/51.
  seed0102 still **1281** — EGG `can_be_hatched` multi-`rndmonnum`.
- seed0017: D-0058 → prefix **2711** (`m_move`); positional **2831**/3465.
- `SPBOOK_no_NOVEL` ≡ `-SPBOOK_CLASS` (−10); `rnd_class` to
  `SPE_BLANK_PAPER` sums **999** (novel prob 1 excluded).
- C `initrecord` after xlev: Caveman/Priest/Tourist/Valkyrie/Wizard **0**;
  Archeologist/Barbarian/Healer/Knight/Monk/Ranger/Rogue/Samurai **10**.
- z1/ul1 `rndmonst_adj` weight totals (freq only, AM_NONE): 3,4,5,7,8,11,
  15,16,21 (jackal…newt); eligible `G_NOCORPSE` in that pool: grid bug
  (+ kobold zombie → kobold via `undead_to_corpse`, so no retry).
- Role L1 intrinsics via `adjabil`: Samurai/Monk `HFast`; Rogue `HStealth`;
  Ranger/Archeologist `HSearching`; Barbarian/Healer `HPoison_resistance`;
  Valkyrie `HCold_resistance`; orc race `HInfravision`+`HPoison_resistance`
  (elf sleep at 4). Dwarf/gnome infra via form/`set_uasmon`, not adjabil.
