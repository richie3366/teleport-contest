# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: ~150 lines.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 5 global loop iterations** (`iteration-count % 5 == 0`), run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-07-21** — full `sessions` @**#1180** (42/44,
Scr **11312**/11405, RNG **100%**) cadence + Blind prop fix. Speed
`30+0.25/turn`. Next cadence @**#1185**. #1180 `doname`/`xname` prop
Blind; #1181 achievements; #1182 dopay Blind/`canspotmon` You_cant;
focused Scr **1723→1724**, first miss **@1625→@1650**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **42 / 44** |
| Screens matched | **11,312 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `30+0.25/turn` (R² 0.87) |
| Role-init throws | **0 / 44** |

**PASS (42):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0009, seed0012, seed0004, seed0002, seed0006, seed0007, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0383, seed0399, seed0014, **seed2600**.

**Notable non-PASS:**
| Session | RNG | Screen | Note |
|--------|----:|-------:|------|
| seed2200 | 3018/3018 | **229**/230 | sole miss parked @158 RC |
| seed4500 | **108275**/108275 | 1724/1814 | knight; @1650 wizwhere More |

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact scored-output lengths.

## Primary objective

**seed4500 @1650** — `#wizwhere` overview C ` --More--` (leading
space, cursor col9) vs JS `--More--` (col8). Focused:
`node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`

**Leaderboard 22-vs-42 gap** — local **42**/44 (D-0929 restored
seed0006/0007/0009/0360). Judge **22** after D-0480; D-0483 serialize
revert. Next cron → upstream #5 if seed0013 restored.

**Parked:** D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0929. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1182; teleds placebc (#1151);
D-0929 look_here-only `keep_message_leftover` (not blanket corner);
lastseentyp savelev/getlev (#1160); wakeup `wake_msg`+growl (#1161);
zap_over_floor hissing-gas Norep + hit The (#1162);
`waterbody_name` Medusa/juiblex/samurai/ICE/waterlevel (#1163);
`makemon_appear_msg` req-(x,y) next2u + MM_NOEXCLAM (#1164);
unmap_object `map_background` + fight_empty always-unmap (#1166);
`flags.pushweapon` → `setuswapwep(oldwep)` (#1167);
`nh_timeout` generic remaining uprops TIMEOUT `--` (#1168);
Blind `feel_location` + newsym u_at (#1169);
wiz Blind `make_blinded` + `u.uinvulnerable` nh_timeout freeze (#1171);
overview dismiss `dismiss_nhw_menu` not corner docrt (#1172);
sanctum `lspo_map` lit=FALSE clear after map (#1173);
getpos `cmap_defsym_explanation` furniture fountain…bars (#1174);
`dountrap`→`untrap`→`getdir(NULL)` (#1175);
getpos `NHKF_GETPOS_SHOWVALID` `$` before matching (#1176);
`set_uasmon`→`float_vs_flight` botl + `dropz`→`encumber_msg` (#1177);
`polymon` `vision_full_recalc=1` before `see_monsters` (#1178);
`time_botl` on `moves++` + `timebot` in `flush_screen` (#1179);
`doname`/`xname` prop Blind (not sticky `u.Blind`) (#1180);
`show_achievements` + `record_achievement` ranks/HELL/MINE/TOWN
(+SHOP/TMPL call sites) (#1181);
`dopay` Blind/`canspotmon`/`You_cant("see...")` (#1182).
**Do not / recent rejects:** invent appear/nearness/FORCE/RNG gates;
treat @1625 Kabalebo as nearness (#1182 Blind canspotmon);
@1573 leftover More (#1181 achievements); @1501 wish dknown (#1180);
@1464 missed moves (#1179); @1441 feel (#1178); @1438 bot (#1177);
@1439 gloves (#1177); @1347 S_goodpos (#1176); @1344 WIN_STOP (#1175);
older in D-0928/NOTES.

**Cohort after shared change:** green + seed1500/1800/0060/0102/0700/
1150/0017/0077/0106/0501/0105/0016/0015/0200/0101/0103/0104/0030/
0013-rogue/0013-friday13/0107/0009/0012/0004/0002/0006/0007/0398/
0373/5006/0116/0361/0367/0108/5002/0360 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |
| seed2200 @158 | RC/`$HOME` harness path, not a port bug |

## Pointers (open only if needed)

| Need | File |
|------|------|
| Live hypothesis / don’t-recheck | `NOTES.md` |
| Divergence by ID | `DIVERGENCE-INDEX.md` → one `## D-NNNN` |
| Subsystem omissions | `C-JS-MAP.md` → one `c-js-map/*.md` |
| Latest loop crumbs | `AGENT-LOOP-JOURNAL.md` (tail only) |
| Score/objective history | `archive/PROGRESS-HISTORY.md` |

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 5th global iteration, refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
