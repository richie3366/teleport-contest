# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** Wizard `u_init_role` cleared (D-0042). Role throws
  **20**/44 (was 29). seed2200 RNG **2756**/3018, Scr **1**/230.
- **Hypothesis / next peel:** seed2200 first rng-diff mismatch idx
  **1283** — C `choose_trapnote` `rn2(12)` vs JS `rnd(4)` during
  mklev trap placement (after matching room/traptype RNG). Or port
  next high-throw role (Priest/Knight, 4 each).
- **Falsifier / next probe:**
  ```bash
  node scripts/rng-diff.mjs sessions/seed2200-wizard-quaff-zap-read.session.json
  # Or: node frozen/ps_test_runner.mjs sessions 2>&1 | rg 'role not ported|PASS|FAIL' | head -40
  ```
- **Parked deep canary:** D-0006 pet movement — do not implement until C
  state/candidate capture exists.
- **Also deferred:** Wizard `initialspell`; full `role_init` beyond
  nemesis gender; `make_corpse` body after `corpse_chance`; dokick
  monster/object/closed-door/SDOOR/furniture; `martial()`; wake/
  engraving; `set_wounded_legs` body; `showdamage`/death `done`; Upolyd
  eel `regen_hp` loss; `regen_pw`/Teleport/Poly once-per-turn; other
  roles still throw; `dog_goal` gettrack/FARAWAY; `throw_gold`; eat
  getobj single-shot; Blind/`look_here`; trap glyphs; hallucination/
  `see_objects`; `u_init_carry_attr_boost`; mfndpos `bad_rock` squeeze;
  Sokoban push-avoid; `donull` `cmd_safety_prevention`; dog_move
  `mtrack` skip; `makemon` Sokoban `throws_rocks`; `m_initinv` body;
  `set_malign`; telepathy/`Detect_monsters`/`MATCH_WARN_OF_MON` in
  `newsym`; full `set_uasmon`/uprops; full `weapon_insight` (enhance /
  P_SKILL table / odd-skill P_NAME); `obj_typename` armor pair-of/
  set-of + GemStone; MLET_CH beyond early subset; shop `costly_spot`
  autopickup disable; `apelist` exceptions; …

## Don’t re-check

- Do not reject the dart in `can_carry`; an earlier C turn APPORTs it.
- Do not treat `LOST_THROWN` as a carry rejection; C does not.
- Do not gate on raw RNG index/coordinates.
- Role `mnum` must be monster-table IDs (`PM_ROGUE=338`), never roles[] index.
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

## Landmarks

- Rogue+human init HP = **12**; Rogue+orc = **11** (role 10 + race 1).
- Wizard+human init HP = **12**, Pw ≈ **8**, AC **9** (cloak of MR `a_ac` 1).
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
- seed2200: D-0042 → role throw cleared; rng-diff prefix **1283**; next
  `choose_trapnote`.
