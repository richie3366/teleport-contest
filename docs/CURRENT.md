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

Score last measured: **2026-07-21** — full `sessions` @**#1170** (42/44,
Scr **11111**/11405, RNG **100%**) cadence refresh (+87 Scr vs @#1165
from #1166–#1169 seed4500 peels). Speed `30+0.25/turn`. Next cadence
@**#1175**. Primary still seed4500; #1174 moved prefix **@1322→@1344**
(Scr **1576→1579**).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **42 / 44** |
| Screens matched | **11,111 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `30+0.25/turn` (R² 0.86) |
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
| seed4500 | **108275**/108275 | 1579/1814 | knight; @1344 #untrap getdir |

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

**seed4500 @1344** — `#untrap` C `In what direction?` vs JS blank
topline. Focused:
`node frozen/ps_test_runner.mjs sessions/seed4500-knight-coverage.session.json`

**Leaderboard 22-vs-42 gap** — local **42**/44 (D-0929 restored
seed0006/0007/0009/0360). Judge **22** after D-0480; D-0483 serialize
revert. Next cron → upstream #5 if seed0013 restored.

**Parked:** D-0006 / seed2200 @158.

**Do not re-break D-0660…D-0929. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).**
**Keep:** D-0845…D-0927; D-0928 #1119–#1174; teleds placebc (#1151);
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
getpos `cmap_defsym_explanation` furniture fountain…bars (#1174).
**Do not:** invent create_particular appear from mtmp.mx/my; blanket
corner restore; FORCE mfndpos/WEB; raw RNG gates; invent splice;
omit breamm/blnd/F-prefix; FORCE linedup/flip; inediate FOOD reject;
omit mfind0/wizwhere/break_armor/carrying_too_much; treat @1048 as
ICE typ / feel_location-only (was unmap_object); invent pushweapon
second prinv (C only setuswapwep — second prinv is doswapweapon);
treat @1092 `[30]` as menu-format bug (was missing TIMEOUT `--`);
treat @1098 `_` color 6 as altar (iron **chain** / missing
`feel_location`); treat @1151 Blind `[23]` as cream-only (was
stale-uprops incr + missing uinvulnerable freeze); treat @1252 as
DEC-vs-Primary room (was overview forced `docrt`); treat @1291 as
look_here corner paint (was sanctum solidfill BOOL_RANDOM lit bleed
— `lspo_map` lit=FALSE clear); treat @1322 as lastseentyp/glyph
(was missing furniture in `cmap_defsym_explanation`).
Recent rejects: @1322≠lastseentyp — furniture cmap (#1174);
@1291≠look_here corner — sanctum map left lit from solidfill
(#1173); @1252≠DEC room — overview corner must not `docrt`
(#1172); @1151≠cream-only — wiz `make_blinded` + prayer
`u.uinvulnerable` nh_timeout (#1171); @1098≠altar — Punished chain +
Blind feel (#1169); @1092≠Sprintf pad — prior `#wizintrinsic` set
INVULNERABLE TIMEOUT=30; C `nh_timeout` loop cleared it (#1168);
@1053≠missing prinv — deferred pushweapon (#1167); @1048≠ICE typ —
unmap_object (#1166); older in D-0928/NOTES.

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
