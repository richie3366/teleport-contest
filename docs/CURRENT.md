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

Score last measured: **2026-08-20** — full `sessions` at review **#1615**
HEAD `b166de10` (**44**/44, Scr **11,405**/11,405, RNG **100%**).
Speed `35+0.29/turn` (R² 0.853). Next audit (review + score) @**#1620**.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `35+0.29/turn` (R² 0.853) |
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

**Map-driven fortress** after D-1276. Reviews **233–236** all
**ACCEPT-WITH-DEBT** (no Must-fix; D-1254 closed review **212**).
**Next cluster:**
Open `dothrow.c` `hurtle_step` `switch_terrain` (named from D-1129). Not
u_on_rndspot.
Do not skip D-1276…D-1229 (index). Keep mention_map addr. Do not wrap
`msg_mon_movement` as `pline_mon`.
Do not pull skipdrin / pit kick / missmu/wildmiss/mswings `pline_mon`
/ mattacku AT_TENT / explmu / AT_HUGS / unported uhitm `mhitm_ad_*`
`pline_mon` / MEAT_RING / candle `partly used` / swap-with-pet `seemimic`
/ Blind unseen boulder feel / next_boulder / verysmall vain / throwit
returning_missile / swallow / slip / stamina / steed potion /
`u_on_rndspot` / objnam wish `switch_terrain` / `maketrap` PIT/HOLE
`set_levltyp` / Underwater bars / generic rock Passes_walls / `meatobj`
/ meatcorpse / find_trap cls `display_self` / muse `display_self`.

**Parked:** D-0006. **Do not re-break D-0660…D-1276. Do not FORCE CLOSE/movement/umov /
peace_minded / ualign / pet malign / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1276 (index). Recent: **D-1276** `objnam.c`
`doname_base` FOOD EGG (`ismnum` + `(known||MV_KNOWS_EGG)` then
`pmnames[NEUTRAL]` + `spe==1` `(laid by you)`; stale_egg `#if 0`;
MEAT_RING / candle `partly used` named); **D-1275** `display.h`
`display_self` U_AP_TYPE (`maybe_display_usteed` then NOTHING
`hero_glyph` / FURNITURE `cmap_to_glyph` / OBJECT `objnum_to_glyph`
/ MONSTER `monnum_to_glyph`; detect `monster_detect`; find_trap cls /
muse / gender offsets / swap-with-pet `seemimic` named); **D-1274** `dothrow.c`
`toss_up` + throwit `u.dz` (`rn2(5)&&!Underwater`; getdir `<>` dz;
downward `hitfloor(TRUE)`; returning_missile / swallow / steed potion
named); **D-1273** `pickup.c`
`tipcontainer` highdrop (`!can_reach_floor(TRUE)` then
`how_lost`+`hitfloor(TRUE)`; swallow clears; altarizing named);
**D-1272** `invent.c`
`hold_another_object` drop_it (`hitfloor(FALSE)` when
`!can_reach_floor && !uswallow`; Fumbling / invlet / encumbrance;
autoquiver stay);
**D-1271** `mon.c`
`meatmetal` (postmov OBJ_AT metallivorous; rustproof spit+stun;
`obj_resists(5,95)`; leftover ROCK; meatobj / meatcorpse named);
**D-1270** `hack.c`
hero `test_move` IRONBARS `passes_bars` (Passes_walls ||
`passes_bars(youmonst.data)`; DO_MOVE rust/corr/metallivore
`still_chewing`; Underwater / rock Passes_walls named);
**D-1269** `dig.c`
`digactualhole` PIT after `wake_nearby` + HOLE `at_u` →
`switch_terrain` then Lev/Fly re-read; `maketrap` PIT/HOLE
`set_levltyp` / dothrow hurtle / `u_on_rndspot` / objnam wish named;
**D-1268** `hack.c`
`spoteffects` dest-typ / `MAX_TYPE` → `switch_terrain` before
`pooleffects`; **D-1267** `hack.c`
`set_uinwater` (change-gate → `switch_terrain`; boulder dry-land /
drown fail-crawl / goto_level leave+after-getlev; pooleffects leave /
drown wade named); **D-1266** `uhitm.c`
`hmonas` altwep / `uswapwep` (toggle + orig-slot re-read +
passivedone `drop_uswapwep`; skipdrin / pit kick named); **D-1265** `hack.c`
fight_empty `explum(null)` (Upolyd AT_EXPL wake_nearto + mh=-1
rehumanize; pick-dig named); **D-1264** `uhitm.c`
AT_ENGL `gulpum` (`hmonas` `rnd(20+i)` + swallow/digest/expel);
**D-1263** `dothrow.c`
`hitfloor` `dropz(TRUE)` (drop `!can_reach_floor` + hornoplenty;
**hold_another_object D-1272**; **pickup highdrop D-1273**;
**toss_up D-1274**);
**D-1262** `hack.c`
`moverock_core` nopick `m<dir>` over/against (before Levitation;
glyph `door_opened`; Blind unseen / next_boulder / verysmall named);
**D-1261** `mhitu.c` `hitmsg`
(`pline_mon` + AT_TENT `s_suffix` + AT_EXPL/BOOM + thick_skinned kick
punct; missmu/wildmiss/mswings / mattacku AT_TENT / explmu named);
**D-1260** `domove` mimic
unhide (glyphs D-1275; swap-with-pet `seemimic` named);
**D-1259** `dissolve_bars` `u_at` `switch_terrain` (`digactualhole`
D-1269); **D-1258** `passes_bars`
ALLOW_BARS (hero `test_move` named); **D-1257** `gelcube_digests`
(`meatobj` / meatbox named); **D-1256** launch_obj landmine·pit
(down_gate / boulder-chain named); **D-1255** glob / doname CXN
(**EGG D-1276**; MEAT_RING named); **D-1254** `hates_silver` (`dmgval` silver
named); D-1253 giant pickup (nopick D-1262); D-1249
container_impact (hitfloor D-1263); D-1250–D-1252
AT_HUGS / AT_EXPL / `demonpet` (AT_ENGL D-1264; fight_empty D-1265;
altwep D-1266).
**Do not / recent rejects:** FORCE/RNG/appear; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting spaces;
D-0983…D-1228 (index); no wrap `msg_mon_movement` as `pline_mon`;
no skip D-1229 `impact_disturbs_zombies`; no skip D-1230 `#teleport`;
no skip D-1231 gulpmm `m_at`; no skip D-1235/D-1236 a11y addr;
no skip D-1237 TELEP `pline_xy`; no skip D-1238 `mind_blast`;
no skip D-1240–D-1248 (`hitmsg` D-1261); no skip D-1269 (`maketrap` PIT/HOLE `set_levltyp` / dothrow
hurtle / `u_on_rndspot` / objnam named); no skip D-1268; no skip D-1267
(pooleffects leave / drown wade named); no skip D-1266 (skipdrin /
pit kick named); no skip D-1265 (pick-dig named); no skip D-1264;
no skip D-1263 (**hold_another_object D-1272**; **pickup highdrop D-1273**;
**toss_up D-1274**);
no skip D-1262 (Blind unseen / next_boulder / verysmall named);
no skip D-1261 (`missmu` / mattacku AT_TENT / explmu named); no skip
D-1260 (glyphs D-1275; swap-with-pet `seemimic` named);
no skip D-1253; no skip D-1254 (`dmgval`
silver named); no skip D-1255 (**EGG D-1276**; MEAT_RING named);
no skip D-1276 (MEAT_RING / candle `partly used` named);
no skip D-1256 (down_gate / boulder-chain named);
no skip D-1257 (`meatobj` / meatbox named);
no skip D-1258; no skip D-1275 (find_trap cls / muse / seemimic named);
no skip D-1274 (returning_missile / swallow / steed
potion named); no skip D-1273; no skip D-1272;
no skip D-1271 (`meatobj` / meatcorpse named);
no skip D-1270 (Underwater bars / rock Passes_walls named);
no skip D-1259 (`digactualhole` D-1269);
no pull `reset_glyphmap` / vision_recalc `notice_all_mons` /
`makemap_prepost` / peel RANGE_LEVEL / `restore_artifacts` this SHA.
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
