# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: `check-hot-docs.mjs`.
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

Score last measured: **2026-08-19** — full `sessions` at review **#1575**
HEAD `9b5bd39d` (**44**/44, Scr **11,405**/11,405, RNG **100%**).
Speed `36+0.30/turn` (R² 0.852). Next audit (review + score) @**#1580**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `36+0.30/turn` (R² 0.852) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed0014, seed2600, seed4500, seed2200, seed0383.

**Notable non-PASS:** none (regression fortress).

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

**Map-driven fortress** after D-1243. **Next cluster:**
Open `mhitm.c` gulpmm AD_DGST eat (named). Not `!goodpos`.
Do not skip D-1243 gulpmm `!goodpos` return-home. Do not skip
D-1242 gulpmm `snuff_lit` minvent. Keep mention_map addr.
Do not wrap `msg_mon_movement` as `pline_mon`. Do not skip D-1229
impact owt/flimsy. Do not skip D-1230 `#teleport` `doextcmd`.
Do not skip D-1231 gulpmm `m_at` swap. Do not skip D-1232
`hmon_hitmon` `troll_baned`. Do not skip D-1233
`hmonas`/`damageum` `troll_baned`. Do not skip D-1234
unique/pname `corpse_xname` adjective. Do not skip D-1235
`spot_monsters` → `a11y.mon_notices`. Do not skip D-1236
`mon_movement` → `a11y.mon_movement`. Do not skip D-1237
rolling-boulder TELEP `pline_xy`. Do not skip D-1238
`mind_blast`. Do not skip D-1239 cannot_push squeeze /
`sokoban_guilt`. Do not skip D-1240 remaining already-ported
uhitm `pline_mon` (gremlin light / xan nuzzle / sedu brag).
Do not skip D-1241 `passivemm` assess_dmg `monkilled(magr)`.
Do not pull giant pickup/maneuver /
container_impact /
hitfloor `dropz(TRUE)` / hideunder /
AD_DGST eat /
AT_HUGS/EXPL/ENGL / altwep / `demonpet` / landmine·pit mid-roll /
bee_eat / iron bars / `mon_yells` / unported uhitm `mhitm_ad_*`
`pline_mon` / mhitu `hitmsg`.

**Parked:** D-0006. **Do not re-break D-0660…D-1243. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1194; D-0929…D-0947;
**D-0948**…**D-1243** (getdir/hurtle; `obj_delivery`; wizkit FALSE; pole
`glyph_at`; `urole.questarti`; take_gold
`remove_worn_item` D-1086 `*_off`; telekinesis; wipe/`tmp_at`; Glib TIMEOUT;
`msounds[]`/`cry_sound`; restore cobj `OBJ_CONTAINED`; dosit
`in_water` body / early pool-gremlin goto / `water_damage(uarm)`
twice; sit Fire/Cold `uprops[]`; tut-1 mineralize/stairway/
create_object/place_lregion/`tut_key`/tutorial nhcore; dosit
steed `mon_nam`; hider except trapper; `can_reach_floor(FALSE)`
D-1070–D-1076; `is_lava`
DRAWBRIDGE_UP+`DB_LAVA` D-1077; `D-1078–D-1243`).
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
dosit `"your steed"` / skip hider clear / Levitation-only `dosit` / gush (D-1117) / drinksink poly (D-1118) / teleok jump (D-1119) / tele_trap AM (D-1120) / skip `teleds` `fill_pit` (D-1121) / skip Wizard stair `goodpos` or `control_mon_tele` (D-1122) / skip `rloc_to` worm `remove_worm`/tail or swallow `docrt` (D-1123) / skip drinksink case 13 `create_gas_cloud` (D-1124) / D-1125…D-1243;
no restore energy fail-closed / skip SPE_TELEPORT_AWAY atme;
no restore rhack raw-ETX `Unknown command` / skip `visctrl(key)`;
no skip `goto_level` `kill_genocided`/`run_timers` (D-1190/D-1191);
no skip wizkit FALSE (D-1192) / `deliver_obj_to_mon` (D-1193);
no skip D-1194 wrap; no skip D-1195 wand
`makeknown`; no skip D-1196 `set_msg_xy`; no skip D-1197 Override
yn / D-1198 bit 2 / D-1199 my=xyflags; no skip D-1200 wrap /
D-1201 `init_artifacts` / D-1202 REVIVE/ZOMBIFY / D-1203
`#levelchange` drain / D-1204 `SCR_MAIL`/`uwepgone` light / D-1205
unconscious / D-1206–D-1243 (`dolookaround`; no empty then-arm; no
`flags.accessiblemsg` / `flags.mention_map` / `flags.spot_monsters` /
`flags.mon_movement` addr; no Hallu
`gbuf_show_kind` reroll; no skip se_scratching / `troll_baned` /
LEVEL_TELEP yn; no wrap `msg_mon_movement` as `pline_mon`; no skip D-1229
`impact_disturbs_zombies` owt/flimsy); no skip D-1230 `#teleport`
doextcmd / `#` CMD_M_PREFIX; no skip D-1231 gulpmm `m_at` swap /
AT_ENGL `gulpmm`; no skip D-1232 `hmon_hitmon` `troll_baned` TRUE-only;
no skip D-1233 `hmonas`/`damageum` ternary/`uwep`;
no skip D-1234 unique/pname `corpse_xname` adjective / rot
`CXN_NO_PFX` (glob / doname CXN_ARTICLE|CXN_NOCORPSE still named);
no skip D-1235 `spot_monsters` → `a11y.mon_notices` (default Off);
no skip D-1236 `mon_movement` → `a11y.mon_movement` (default Off);
no skip D-1237 rolling-boulder TELEP `pline_xy` (`rloco`/migrate;
landmine/pit still named);
no skip D-1238 `mind_blast` (bee_eat / iron bars / `mon_yells` named);
no skip D-1239 cannot_push squeeze + `sokoban_guilt` (giant pickup /
maneuver / nopick m-dir still named);
no skip D-1240 remaining already-ported uhitm `pline_mon` (gremlin
light / xan nuzzle / sedu brag; unported `mhitm_ad_*` / mhitu
`hitmsg` still named);
no skip D-1241 `passivemm` assess_dmg `monkilled(magr)`;
no skip D-1242 gulpmm `snuff_lit` minvent;
no skip D-1243 gulpmm `!goodpos` return-home (AD_DGST eat still
named);
no pull `reset_glyphmap` / vision_recalc
`notice_all_mons` / `makemap_prepost` / peel RANGE_LEVEL /
`restore_artifacts` this SHA).
**Do not put trailing `confdir` inside shared `getdir`**. **Do not
add help_dir / “strange direction” pline to lock `getdir`**. Throw
keeps `getdir_cmdassist`. **Do not peel RANGE_LEVEL timers from
invent/migrating objects** (C `obj_is_local` is false).
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

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
