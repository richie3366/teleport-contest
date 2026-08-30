# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-30 — D-1718 shk.c get_cost gem glass pseudo-ID

**Objective:** Open `shk.c` get_cost gem glass pseudo-ID (named). Not
remote_burglary.
**C locus:** `shk.c` `get_cost` `:2897–2941`; `oid_price_adjustment`
`:2862–2873`; `objects.h` `FIRST_GLASS_GEM`.
**JS locus:** `js/shk.js` `get_cost`.
**Change:** unidentified glass uses `ubirthday` color table
`oc_cost` instead of tmp=5. Named: `arti_cost`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 12/12; green+strict;
focused seed0383/0116; cohort 7/7 + strict.
**Next:** Open `shk.c` arti_cost.
**Blocked:** none.
## 2026-08-30 — D-1717 shk.c remote_burglary unpaid steal

**Objective:** Open `shk.c` remote_burglary (named). Not
bill_box_content.
**C locus:** `shk.c` `remote_burglary` `:664–682`; `rob_shop`
`:685–719`; `call_kops` `:509–564`; `makekops` `:5112–5135`;
`addupbill` `:495–507`; `clear_unpaid` `:308–325`; caller
`pickup.c` `pick_obj` `:1936–1939`.
**JS locus:** `js/shk.js` + `js/pickup.js` `pick_obj`.
**Change:** unpaid-from-outside steal runs `rob_shop`/`call_kops`
instead of a deferred empty arm after D-0447 bill. Named:
choose_stairs; `u_left_shop` leave verbalize.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 18/18; green+strict;
focused seed0383/0116; cohort 7/7 + strict.
**Next:** Open `shk.c` get_cost gem glass pseudo-ID.
**Blocked:** none.
## 2026-08-30 — audit #2120 reviews 669–677 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **668**
(`0c0f29fe`…`0c720b98`, D-1708…D-1716) plus full `sessions`.
**C locus:** `save_light_sources` mx>0; `update_mlstmv` skip;
`yyyymmddhhmmss`; `update_lastseentyp`; `oc_merge`; `observe_object`;
FullyUsedUp; itemize ynq; `dopay` mute/Deaf nod.
**Change:** reviews **669–677**, all ACCEPT-WITH-DEBT. No Must-fix.
No `js/` edits. Filled archive D-1716 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `40+0.32/turn` (R² 0.853) at `0c720b98`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Open `shk.c` `remote_burglary`.
**Blocked:** none.
## 2026-08-30 — D-1716 shk.c dopay mute/Deaf thank-you nod

**Objective:** Open `shk.c` dopay mute/Deaf thank-you nod (named).
Not getpos.
**C locus:** `shk.c` `dopay` `:2011–2025`; `youprop.h` Deaf;
`muteshk` `msound <= MS_ANIMAL`.
**JS locus:** `js/shk.js` `dopay` (`hero_deaf` / `muteshk`).
**Change:** mute/Deaf else nod + surcharge bang; `paid`
`update_inventory`. Named: SetVoice; `remote_burglary`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 8/8; green+strict;
focused seed0383/0116; cohort 8/8 + strict.
**Next:** Open `shk.c` remote_burglary.
**Blocked:** none.
## 2026-08-30 — D-1715 shk.c pay_billed_items Traditional itemize ynq

**Objective:** Open `shk.c` pay_billed_items traditional itemize ynq
(named). Not FullyUsedUp.
**C locus:** `shk.c` `pay_billed_items` `:2082–2109`; callee
`dopayobj` `:2259–2275` y_n Pay?; `options.c` `:7258` MENU_FULL.
**JS locus:** `js/shk.js` `pay_billed_items` / `dopayobj`.
**Change:** Traditional ynq + `menu_requested` toggle; `dopayobj`
itemize `safe_qbuf`/`upstart(doname)`; unset style stays FULL.
Named: mute/Deaf nod; `remote_burglary`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 17/17; green+strict;
focused seed0383; cohort 9/9 + strict.
**Next:** Open `shk.c` dopay mute/Deaf thank-you nod.
**Blocked:** none.
## 2026-08-30 — D-1714 shk.c FullyUsedUp/PartlyUsedUp

**Objective:** Open `shk.c` FullyUsedUp/PartlyUsedUp (named). Not
bill_box_content.
**C locus:** `shk.c` `make_itemized_bill` `:1543–1663`;
`add_to_billobjs` `:3365–3383`; `add_one_tobill` dummy; 
`sub_one_frombill` residual; `menu_pick_pay_items` headings;
`update_bill` ONBILL; `mkobj.c` `obj_extract_self` ONBILL.
**JS locus:** `js/shk.js`; `js/mkobj.js` `obj_extract_self`.
**Change:** dummy/residual onto `billobjs` `OBJ_ONBILL`; itemize
FullyUsedUp/PartlyUsedUp split; used-up menu headings; pay extract
`OBJ_DELETED`. Named: Traditional itemize ynq.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary residual dummy + ONBILL
extract; green+strict; focused seed0383; cohort 9/9 + strict.
**Next:** Open `shk.c` pay_billed_items traditional itemize ynq.
**Blocked:** none.
## 2026-08-30 — D-1713 o_init.c observe_object FIRST_OBJECT skip

**Objective:** Open `invent.c` observe_object FIRST_OBJECT skip
(named). Not undiscover_object.
**C locus:** `o_init.c` `observe_object` `:441–451`;
`youprop.h` `Hallucination`; callers `invent.c` `:171` / `:1039`
/ `:1217`.
**JS locus:** `js/invent.js` `observe_object`.
**Change:** skip `otyp < FIRST_OBJECT` (generic/STRANGE_OBJECT);
Hallu via `Hallucination()` not sticky `u.Hallucination`;
`discover_object(..., FALSE, TRUE, FALSE)`. Named: useupall/obfree.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary STRANGE/LAST_GENERIC
skip + FIRST_OBJECT / Halluc_resistance sees; green+strict;
focused seed0383; cohort 7/7 + strict.
**Next:** Open `shk.c` FullyUsedUp/PartlyUsedUp.
**Blocked:** none.
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
