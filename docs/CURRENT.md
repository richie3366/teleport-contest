# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: ~150 lines.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 5 global loop iterations** (`iteration-count % 5 == 0`) is an
**audit**: write the C-fidelity review **and** run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-08-18** — full `sessions` after cadence
**#1520** (**44**/44, Scr **11,405**/11,405, RNG **100%**).
Speed `32+0.27/turn` (R² 0.871). Next audit (review + score) @**#1525**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `32+0.27/turn` (R² 0.871) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0383, seed0399, seed0014, seed2600, seed4500, seed2200.

**Notable non-PASS:** none.

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact lengths.

## Primary objective

**Map-driven** after D-1196. First Open / **Next cluster:**
`teleport.c` `scrolltele` W-tower Override yn (named). Not
make_blinded. Fortress 44/44. Do not revert D-1196.

**After that:** map-driven (`debt.md` then `absent.md`). No
leaderboard chase. Parked D-0006 diagnose-only.

**Parked:** D-0006. **Do not re-break D-0660…D-1196. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1194; D-0929…D-0947;
**D-0948**…**D-1196** (getdir/hurtle; `obj_delivery`; wizkit FALSE; pole
`glyph_at`; thitmonst; `find_mac`; `rnl(4)`; `urole.questarti`;
HConfusion-only; take_gold
`remove_worn_item` D-1086 `*_off`; telekinesis; wipe/`tmp_at`; Glib TIMEOUT;
`msounds[]`/`cry_sound`; restore cobj `OBJ_CONTAINED`; dosit
`in_water` body / early pool-gremlin goto / `water_damage(uarm)`
twice; sit `Underwater` ≡ `u.uinwater`; furniture sit_message;
lava/ice/DRAWBRIDGE_DOWN sit; sit Fire/Cold `uprops[]`; tut-1
`mineralize` kelp; tut-1 `l_create_stairway` packed `force`;
tut-1 `create_object` box+food; tut-1 `place_lregion`/`levregion_add`; tut-1
`tut_key`/`nh.eckey`; tut-1 `tutorial()` nhcore disable; dosit
steed `mon_nam`; hider except trapper; `can_reach_floor(FALSE)`
D-1070–D-1076; `is_lava`
DRAWBRIDGE_UP+`DB_LAVA` D-1077; D-1078–D-1196).
**Do not / recent rejects:** FORCE/RNG/appear gates; HEAVY_IRON_BALL
`owt!=0`; @1808/@1799/@1770; D-0928/NOTES; skip painting spaces;
leading bold pads; judge-elides-RC (D-0933); extend §1.2; LB peels;
shared `maketrap` PIT morph; tutorial worn without `setnotworn`;
invert `shopdig(1)` far-skip; drop `objects_at` (D-0980); mask
`setnotworn`; live `m_at` pole target; re-stub D-0983…D-1070
(no `spe--` unpaid; no extra `u.Confusion`; no gold splice; no
`void telekinesis`; no wipe/`tmp_at` no-ops; no `u.Glib` TIMEOUT;
no empty-`msound` chitter; no deser cobj parent `where`; no skip
`dosit` pool/gremlin `in_water`; no “fix” second `water_damage` to
`uarmf`; no restore sit `u.Underwater` alias; no restore sticky
`u.Levitation` in `can_reach_floor` / sit `Levitation()` (D-1070);
no skip hugs (D-1071) / lap (D-1072) / picnic teeter (D-1073) / meager hoard (D-1074) / oviparous having-fun (D-1075) / hero pit/hole `dotrap` stub (D-1076) / `monmove.js` `sticks`;
no skip furniture sit_message /
`altar_wrath` on `IS_ALTAR`; no skip lava/ice/
DRAWBRIDGE_DOWN sit; no restore trap TT_LAVA as terrain lava;
no restore `is_lava`/`is_pool` LAVAPOOL/POOL-only (D-1077/D-1090); no restore `goodpos` typ macros (D-1091); no restore youmonst pool/lava to `is_swimmer` (D-1099); no skip wallwalk `may_passwall` (D-1100); no skip mongen exclusion after boulder (D-1101); no skip D-1109 `lspo_exclusion`; no D-1102 onscary stub / always-goodpos_onscary (D-1110); no teleok any-trap reject (D-1111); no D-1103 waterbody raw; no skip D-1104 `angry_guards`/D-1106; no restore `split_mon` monster null (D-1078); no skip D-1095 split_mon callers; no skip peace/malign `msound` (D-1079); no restore priest/guardian mndx (D-1088) / neminum mitem (D-1094); no steal setworn-only unwear; no skip `mineralize` `In_endgame` before kelp; no WATER kelp
without `!Is_waterlevel`; no restore sit Fire/Cold H||E-only as C
`youprop.h`; no restore sit Antimagic H||E-only (D-1089); no skip `mkstairs` `force` ROOM before dungeon-end
return; no raw `mkstairs` for tut-1 packed `des.stair`; no raw
`rn2(sx/sy)` nested tut-1 box contents / skip `delete_contents`
after `mkbox_cnts`; no restore `tut1_object` for tut-1 food or skip
`create_object` `corpsenm` / `find_montype` gender RNG for `montype`;
no restore tut-1 `updest`/`dndest` copy or exclude `0,0,0,0`; no
restore hardcoded tut-1 key strings vs `nh.eckey`/`tut_key`; no
skip `tutorial()` available[] / raw `nhl_gamestate`; no restore
dosit `"your steed"` / skip hider clear / Levitation-only `dosit` / gush (D-1117) / drinksink poly (D-1118) / teleok jump (D-1119) / tele_trap AM (D-1120) / skip `teleds` `fill_pit` (D-1121) / skip Wizard stair `goodpos` or `control_mon_tele` (D-1122) / skip `rloc_to` worm `remove_worm`/tail or swallow `docrt` (D-1123) / skip drinksink case 13 `create_gas_cloud` (D-1124) / D-1125…D-1196;
no restore rhack raw-ETX `Unknown command` / skip `visctrl(key)`;
no skip `goto_level` `kill_genocided`/`run_timers` (D-1190/D-1191);
no skip wizkit FALSE (D-1192) / `deliver_obj_to_mon` (D-1193);
no skip D-1194 `notice_mon` wrap; no skip D-1195 rloc wand
`makeknown`; no skip D-1196 rloc dest-msg `set_msg_xy`; no pull `reset_glyphmap` /
vision_recalc `notice_all_mons` / newgame wrap / wiz-level-change /
peel invent-migrating RANGE_LEVEL this SHA).
**Do not put trailing `confdir` inside shared `getdir`**. **Do not
add help_dir / “strange direction” pline to lock `getdir`**. Throw
keeps `getdir_cmdassist`. **Do not peel RANGE_LEVEL timers from
invent/migrating objects** (C `obj_is_local` is false).
**Cohort after shared change:** green + seed1500/1800/0060/0102/0700/
1150/0017/0077/0106/0501/0105/0016/0015/0200/0101/0103/0104/0030/
0013-rogue/0013-friday13/0107/0009/0012/0004/0002/0006/0007/0398/
0373/5006/0116/0361/0367/0108/5002/0360 + seed2200 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 5th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
