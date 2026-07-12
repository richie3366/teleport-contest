# Working notes (scratchpad)

Not a progress log. See `.cursor/rules/agent-notes.mdc` for what belongs here.
Wipe or rewrite freely; keep only live traps and the current hypothesis.

---

## Active

- **Current unit:** seed0060 — RNG **3626/3626**; screens **6/41**
  (D-0037; idx 0–5 match), cursors **41/41**. First fail idx 6.
- **Hypothesis:** idx 6 has two independent cell classes: (1) topline
  extra "The kitten picks up a gold piece." after a drop (C only drops);
  (2) premature wall `┌` at map (16,15) where C is still blank; later
  frames also downstairs `>` color yellow vs gray.
- **Falsifier / next probe:**
  ```bash
  node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json
  # Diff JS vs C screen[6]: topline after drop; wall at col 16 row 15.
  ```
  Expect: cellsOnly stays 6 until drop-re-pickup and/or wall vision cause
  is ported.
- **Parked deep canary:** D-0006 pet movement — do not implement until C
  state/candidate capture exists.
- **Also deferred:** `make_corpse` body after `corpse_chance` (dragon/
  undead/golem specials + stackobj); dokick monster/object/closed-door/
  SDOOR/furniture; `martial()`; `wake_nearby`/`u_wipe_engr`;
  `set_wounded_legs` body; `kickstr` terrain-specific killer names;
  `showdamage`/`maybe_wail`/`done(DIED)`; Upolyd eel-out-of-water
  `regen_hp` loss rolls; `regen_pw` / Teleportation / Polymorph
  once-per-turn RNG; Regeneration/Sleepy/Half_physical props;
  `dog_goal` gettrack/FARAWAY; `throw_gold`; eat getobj single-shot;
  Blind/`look_here`; trap glyphs; full `wall_angle`;
  `ini_inv_mkobj_filter`; `u_init_carry_attr_boost`; mfndpos
  `bad_rock` squeeze / boulder `ALLOW_ROCK`; Sokoban
  `m_avoid_soko_push_loc` body; `donull` `cmd_safety_prevention`;
  dog_move `mtrack` skip (`goto nxti`); `makemon` `throws_rocks`
  Sokoban reject; `m_initinv` body; `set_malign`; Blind prop for
  `makemon_rnd_goodpos` exhaustive pass; downstairs remembered color
  (NO_COLOR vs yellow); MLET_CH letter table beyond early dlvl subset.

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
- seed1500 idx 2300 was **not** missing room-fill gems: `mktrap_victim` created
  dart+possessions but never `place_object` — D-0016.
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

## Landmarks

- Rogue+human init HP = **12**; Rogue+orc = **11** (role 10 + race 1).
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
- seed0060: D-0037 → screens **6**/41 (idx 0–5); RNG **3626**/3626; cursors **41**/41.
