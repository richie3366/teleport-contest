# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-07-22 03:52 — #1261 D-0991 costly_gold/donate_gold

**Objective:** map-driven — costly_gold/donate_gold kick+addtobill
(CURRENT next cluster).
**C locus:** `shk.c` costly_gold/donate_gold; callers
`dokick.c` really_kick_object; `shk.c` addtobill.
**Changed:** port credit/debit/loan gold bill + donate refund;
wire kick-out, contained kick-land refund, addtobill coin/gltmp —
D-0991.
**Verified:** green+strict PASS; shop/kick cohort **11**/12
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** flooreffects fire/globby/altar; absent.md thin;
barefoot petrify / tmp_at; sellobj/check_shop_obj.
**Blocked:** none.

## 2026-07-22 03:45 — #1260 cadence + D-0990 hits_bars

**Objective:** mandatory full `sessions` @#1260; map-driven
`hits_bars`/`hit_bars` (CURRENT next cluster).
**C locus:** `mthrowu.c` hits_bars/hit_bars; `zap.c` bhit;
`dothrow.c` throwit; `trap.c` launch_obj.
**Changed:** port hits_bars/hit_bars + harmless_missile helper;
wire bhit/throwit/launch_obj point_blank arms — D-0990.
**Verified:** green+strict PASS; kick/throw cohort **7**/8
(seed0009 Scr 72/73 pre-existing); cadence **43**/44 Scr
11404/11405 RNG 100% speed `32+0.27/turn`. Rule #2: no fs.
**Next:** costly_gold/donate_gold; flooreffects fire/globby;
absent.md thin; barefoot petrify / tmp_at.
**Blocked:** none.

## 2026-07-22 03:40 — #1259 D-0989 Is_box + ghitm

**Objective:** map-driven — Is_box kick arms / ghitm (CURRENT next
cluster after D-0988).
**C locus:** `dokick.c` Is_box/`ghitm`/`container_impact_dmg`;
`trap.c` `chest_trap`; `lock.c` `breakchestlock`; `shk.c`
`make_angry_shk`.
**Changed:** impact shatter; lock break/lid + chest_trap; ghitm;
export breakchestlock/chest_trap; thin make_angry/happy_shk —
D-0989. Deferred: hits_bars; costly_gold; petrify; tmp_at.
**Verified:** green+strict PASS; kick cohort **19**/20 (seed0009 Scr
72/73 pre-existing); seed0060 kick-search PASS. Rule #2: no fs.
**Next:** hits_bars/hit_bars; or flooreffects fire_damage/globby;
or absent.md thin (potion/scroll/vault).
**Blocked:** none.

## 2026-07-22 03:28 — #1258 D-0988 kick_object + bhit KICKED

**Objective:** map-driven — `kick_object` + `bhit` KICKED_WEAPON
(CURRENT next cluster after D-0987 flooreffects).
**C locus:** `dokick.c` kick_object/really_kick_object; `zap.c` bhit
KICKED_WEAPON.
**Changed:** kick envelope + bhit kicked flight/land; export
thitmonst / costly_adjacent — D-0988. Deferred: box lock/trap;
ghitm; costly_gold; hits_bars; petrify barefoot; tmp_at flash.
**Verified:** green+strict PASS; kick cohort **19**/20 (seed0009 Scr
72/73 pre-existing); seed0060 kick-search PASS. Rule #2: no fs.
**Next:** Is_box kick arms / ghitm / hits_bars; or flooreffects
fire_damage/globby; or absent.md thin (potion/scroll/vault).
**Blocked:** none.

## 2026-07-22 03:20 — #1257 D-0987 flooreffects

**Objective:** map-driven — `flooreffects` pit/shaft/pool/lava
(CURRENT next cluster; kick_object prerequisite).
**C locus:** `do.c` flooreffects / boulder_hits_pool; `trap.c`
lava_damage / uteetering_at_seen_pit / uescaped_shaft.
**Changed:** flooreffects core + boulder_hits_pool; wire dropz /
throwit Splash+flooreffects / drop_throw — D-0987. Deferred:
fire_damage; globby/altar/hot potion; kick_object+bhit KICKED_WEAPON.
**Verified:** green+strict PASS; drop/throw cohort **20**/21
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** kick_object + bhit KICKED_WEAPON; or absent.md thin.
**Blocked:** none.

## 2026-07-22 03:10 — #1256 D-0986 throne/tree + fall_through

**Objective:** map-driven — finish `kick_nondoor` throne/tree
(CURRENT next cluster after D-0985).
**C locus:** `dokick.c` kick_nondoor IS_THRONE/IS_TREE; `trap.c`
`fall_through` + hero `trapeffect_hole`; `explode.c` `scatter`.
**Changed:** throne destroy/loot/`fall_through`; tree fruit scatter +
bee swarm; export thin `scatter` + `fall_through` — D-0986.
Deferred: `kick_object`; scatter MAY_FRACTURE/shop/flooreffects.
**Verified:** green+strict PASS; kick cohort **19**/20 (seed0009 Scr
72/73 pre-existing). Rule #2: no fs.
**Next:** `kick_object` (bhit KICKED_WEAPON/flooreffects); or
flooreffects pit; absent.md thin.
**Blocked:** none.

## 2026-07-22 03:00 — #1255 cadence + D-0985 kick_nondoor

**Objective:** cadence full `sessions` @#1255; map-driven
`kick_nondoor` SDOOR/furniture (CURRENT next cluster).
**C locus:** `dokick.c` kick_nondoor; `pray.c` altar_wrath;
`engrave.c` disturb_grave; `fountain.c` sink_backs_up.
**Changed:** port SDOOR/SCORR + altar/fountain/grave/bars/sink;
export helpers — D-0985. Deferred: throne fall_through; tree
scatter; kick_object.
**Verified:** cadence **43**/44 Scr **11404**/11405 RNG **100%**
speed `30+0.27/turn` (seed0009 Scr 72/73); green+strict PASS;
kick cohort **19**/20. Rule #2: no fs.
**Next:** kick_object / throne fall_through / tree; or flooreffects.
**Blocked:** none.

## 2026-07-22 02:52 — #1254 D-0984 ship_object

**Objective:** map-driven — retire `ship_object` shop-floor / hole
fall (CURRENT next cluster).
**C locus:** `dokick.c` ship_object/otransit_msg; callers `do.c`
dropx, `dothrow.c` throwit land, `mthrowu.c` drop_throw.
**Changed:** port ship_object envelope + otransit_msg; wire
dropx/throwit/drop_throw — D-0984. Deferred: kick_object
shop_floor_obj; flooreffects pit/shaft; trap ROLL; maybe_unhide_at.
**Verified:** green+strict PASS; throw/drop cohort **20**/21
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** kick_object/SDOOR/furniture; or flooreffects pit; absent.md.
**Blocked:** none.

## 2026-07-22 02:42 — #1253 D-0983 stolen_value

**Objective:** map-driven — retire shop `stolen_value` debt
(CURRENT next cluster: revive/kick/dig/lock callers).
**C locus:** `shk.c` stolen_value/stolen_container/find_objowner/
picked_container; callers zap revive, dokick impact_drop, dig
bury_objs, lock breakchestlock, mkobj costly_alteration.
**Changed:** port stolen_value envelope + wire named callers —
D-0983. Deferred: ship_object; remaining kick object/SDOOR;
SetVoice; unpaid splitbill.
**Verified:** green+strict PASS; dig/zap cohort **19**/20 (seed0009
Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** ship_object shop-floor fall; absent.md thin.
**Blocked:** none.

## 2026-07-22 02:35 — #1252 D-0982 montraits/ghost

**Objective:** map-driven — retire montraits/omonst/ghost
recorporealize debt (CURRENT next cluster).
**C locus:** `mkobj.c` save_mtraits/get_mtraits/newomonst; `zap.c`
montraits/revive; `mon.c` copy_mextra/replmon/KEEPTRAITS; `dog.c`
wary_dog; `makemon.c` monhp_per_lvl.
**Changed:** wire oextra omonst/omid + mkcorpstat traits; port
montraits + thin replmon; revive omonst/wary_dog + ghost invent
join; expand KEEPTRAITS — D-0982. Deferred: shop stolen_value;
animate_statue wire; forget_temple_entry; full replshk/worm/light.
**Verified:** green+strict PASS; zap cohort **19**/20 (seed0009 Scr
72/73 pre-existing). Rule #2: no fs.
**Next:** shop stolen_value; absent.md thin.
**Blocked:** none.

## 2026-07-22 02:25 — #1251 D-0981 openholding/SPE_KNOCK

**Objective:** map-driven — retire opening trap/saddle/SPE_KNOCK
hurtle debt after D-0979.
**C locus:** `trap.c` openholding/openfalling/`reward_untrap`;
`zap.c` bhitm/zapyourself/`boxlock_invent`; `lock.c` boxlock;
`dothrow.c` mhurtle; `uhitm.c` m_is_steadfast.
**Changed:** port trap open helpers + invent boxlock; wire Punished
unpunish + trap/box self-zap; mon openholding→openfalling→SPE_KNOCK
mhurtle / WAN_OPENING saddle drop — D-0981. Deferred: mhurtle
petrify/steed/minliquid; closeholdingtrap; montraits/stolen_value.
**Verified:** green+strict PASS; zap cohort **20**/21 (seed0009 Scr
72/73 pre-existing). Rule #2: no fs.
**Next:** montraits/omonst/ghost; shop stolen_value; absent.md thin.
**Blocked:** none.

## 2026-07-22 02:10 — #1250 cadence + D-0980 objects_at import

**Objective:** mandatory cadence full `sessions` @#1250; fortress
regression on seed0014.
**Changed:** restore `objects_at` on `timeout.js` mkobj import
(D-0978 drop broke `slip_or_trip`) — D-0980. Docs: CURRENT score/
NOTES/turns/divergence/journal; rotated #1234 crumb to archive.
**Verified:** green+strict PASS; full suite **43**/44 Scr
**11404**/11405 RNG **100%** speed `32+0.27/turn` (seed0009 Scr
FAIL pre-existing). Rule #2: no fs.
**Next:** absent.md thin systems or remaining debt (opening traps /
SPE_KNOCK hurtle; montraits; shop stolen_value).
**Blocked:** none.

## 2026-07-22 02:08 — #1249 D-0979 release_hold/flash_hits

**Objective:** map-driven — retire release_hold WAN_OPENING /
flash_hits from CURRENT next cluster / debt.
**Changed:** port `zap.c release_hold`; wire break/zapyourself/bhitm
WAN_OPENING; move `flash_hits_mon`/`light_hits_gremlin` to uhitm;
wire WAN_LIGHT + FLASHED_LIGHT minvis (D-0979). Docs: CURRENT/NOTES/
debt/divergence/journal.
**Verified:** green+strict PASS; zap/apply cohort **34**/35
(seed0009 Scr FAIL pre-existing). Rule #2: no fs.
**Next:** absent.md thin systems or remaining debt (opening traps /
SPE_KNOCK hurtle; montraits; shop stolen_value).
**Blocked:** none.

## 2026-07-22 01:58 — #1248 D-0978 ignite/burn/slime

**Objective:** map-driven — retire ignite_items / burn_away_slime
(+ catch_lit / begin_burn) from CURRENT next cluster / debt.
**Changed:** port `timeout.c` burn_away_slime/begin_burn/end_burn/
burn_object + helpers; `apply.c` catch_lit; `trap.c` ignite_items;
LS_OBJECT lights; BURN_OBJECT run_timers/cleanup; wire zap/explode/
fire-trap (D-0978). Docs: CURRENT/NOTES/debt/turns/divergence/journal.
**Verified:** green+strict PASS; zap/trap/lamp cohort **25**/26
(seed0009 Scr FAIL pre-existing). Rule #2: no fs.
**Next:** release_hold WAN_OPENING / flash_hits.
**Blocked:** none.

## 2026-07-22 01:47 — #1247 D-0977 passtune/drawbridge

**Objective:** map-driven — retire passtune / open+close drawbridge
from CURRENT next cluster / debt.
**Changed:** port `dbridge.c open_drawbridge`/`close_drawbridge` +
`invent.c delallobj`; wire `music.c do_play_instrument` passtune
ynq/getlin/ACH_TUNE/Mastermind hints (D-0977). Docs: CURRENT/NOTES/
debt/turns/divergence/journal.
**Verified:** green+strict PASS; apply cohort **36**/37
(seed0009 Scr FAIL pre-existing). Rule #2: no fs.
**Next:** ignite_items / burn_away_slime (`catch_lit`/`begin_burn`);
release_hold WAN_OPENING / flash_hits.
**Blocked:** none.
