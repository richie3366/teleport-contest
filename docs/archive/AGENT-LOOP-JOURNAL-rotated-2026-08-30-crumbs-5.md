# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-30 — D-1712 objects.h oc_merge extract

**Objective:** Open `objects.h` oc_merge extract (named). Not
oc_charged.
**C locus:** `objclass.h` `oc_merge`; `objects.h` BITS mrg;
`invent.c` `mergable` `:4388`; `mkobj.c` `clear_dknown` `:842`;
`objnam.c` `:5071–5083`; `sp_lev.c` create_object `:2298–2301`.
**JS locus:** extractor + `js/generated/objects_data.js`;
`js/mkobj.js` `oc_merge_of` / `clear_dknown`; `js/read.js`;
`js/readobjnam.js`; `js/mklev.js`.
**Change:** dump BITS mrg; table reader not WEAPON/FOOD class
heuristic; candles/boomerang/venom merge; swords do not;
`clear_dknown` OR; wish quan non-wizard; create_object quan.
Named: lspo_object non-merge repeat; `is_multigen`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary LONG_SWORD 0 /
TALLOW_CANDLE 1; green+strict; focused seed1150/0014/0101;
cohort 7/7 + strict.
**Next:** Open `invent.c` observe_object FIRST_OBJECT skip.
**Blocked:** none.

## 2026-08-30 — D-1711 dungeon.c update_lastseentyp DRAWBRIDGE_UP / mimic

**Objective:** Open `dungeon.c` update_lastseentyp DRAWBRIDGE_UP /
furniture-mimic. Not knox/drawbridge.
**C locus:** `dungeon.c:2926–2938`; callee `mkroom.c` `cmap_to_type`
`:910–1030`; `dbridge.c` `db_under_typ` `:115–128`.
**JS locus:** `js/dungeon.js` `update_lastseentyp` + `cmap_to_type`;
`js/const.js` `S_*`.
**Change:** DRAWBRIDGE_UP → `db_under_typ`; visible furniture
mimic → `cmap_to_type(mappearance)`. Named: display_monster
furniture lastseentyp; map_background caller; sokosolved flags.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; cmap 26/26 + lastseentyp
MOAT/ICE smoke; green+strict; cohort 7/7 + seed0106.
**Next:** Open `objects.h` oc_merge extract.
**Blocked:** none.

## 2026-08-30 — D-1710 calendar.c yyyymmddhhmmss cemetery when[]

**Objective:** Open `dungeon.c` cemetery `yyyymmddhhmmss` `when[]`.
Not cemetery JSON.
**C locus:** `calendar.c:94–117`; `bones.c` savebones `:586`;
`end.c` really_done `:1165` / `:1365`.
**JS locus:** `js/calendar.js` `yyyymmddhhmmss`; `js/end.js`
`savebones` / `really_done`.
**Change:** one `getnow()`; `when[]` is 14-digit stamp not `''` /
ISO JSON; `yyyymmdd(date)` honors `date!=0`. Named: `hhmmss`;
DRAWBRIDGE_UP lastseentyp.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; roundtrip smoke; focused
seed0006/0007/5006; green+strict; cohort 7/7.
**Next:** Open `dungeon.c` update_lastseentyp DRAWBRIDGE_UP /
furniture-mimic.
**Blocked:** none.

## 2026-08-30 — D-1709 dog.c update_mlstmv iter_mons skip

**Objective:** Must-fix review **656** `dog.c` `update_mlstmv` skip
`DEADMONSTER` / `mon_offmap` like `iter_mons`. Not cant_go_back
FREEING.
**C locus:** `dog.c:293–298`; `iter_mons` `mon.c:4531–4535`;
macros `monst.h` `DEADMONSTER` / `mon_offmap`.
**JS locus:** `js/dog.js` `update_mlstmv`; live `mon_offmap`
`js/monmove.js`.
**Change:** skip `(mhp|0)<1` and `mon_offmap`; no `iter_mons`
clone. Named: cant_go_back FREEING.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; predicate smoke; focused
seed0015/0700/0014/0013/0105; green+strict; cohort 7/7.
**Next:** Open `dungeon.c` cemetery yyyymmddhhmmss when[].
**Blocked:** none.

## 2026-08-30 — D-1708 light.c save_light_sources LS_MONSTER mx>0

**Objective:** Must-fix review **656** `light.c` `save_light_sources`
LS_MONSTER `mx > 0`. Not timeout.c `mon_is_local`.
**C locus:** `light.c:373` macro; `save_light_sources` `:453`;
`maybe_write_ls` `:586`.
**JS locus:** `js/mkobj.js` `light_is_local` (exported); snapshots
`js/lev_json.js` (clone retired).
**Change:** LS_MONSTER `(id.mx | 0) > 0`; missing id local; keep
timeout helpers for timers/LS_OBJECT; no `clear_light_sources` on
leave. Named: `update_mlstmv` skip (next Must-fix).
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; predicate smoke; focused
seed0105/0013/0015/0700/0014; green+strict; cohort 7/7.
**Next:** Must-fix `dog.c` `update_mlstmv` skip dead/offmap.
**Blocked:** none.

## 2026-08-30 — audit #2110 reviews 654–668 + cadence

**Objective:** C-fidelity review of fifteen `js/` SHAs since **653**
(`605f0f2e`…`7b26f699`, D-1693…D-1707) plus full `sessions`.
**C locus:** knox/drawbridge; savetrapchn; savelev lights; serLevel;
other ledgers; RANGE_GLOBAL; getlev place; doset perminv; wizmgender;
buy_container; shk_names_obj; dopay getpos; bill_box_content; yn
addcmdq; recalc_mapseen flags.
**Change:** reviews **654–668**. **656** QUALITY-RISK Must-fix
`light.c` `mx > 0` + `update_mlstmv` skip dead/offmap. Rest
ACCEPT-WITH-DEBT. No `js/` edits. Filled archive D-1707 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `40+0.32/turn` (R² 0.861) at `7b26f699`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix `light.c` `save_light_sources` LS_MONSTER `mx > 0`.
**Blocked:** none.
