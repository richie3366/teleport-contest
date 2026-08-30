# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
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
## 2026-08-30 — D-1707 dungeon.c recalc_mapseen Blind/oracle/valley/sanctum

**Objective:** Open `dungeon.c` recalc_mapseen Blind bigroom / oracle /
valley / sanctum. Not knox/drawbridge.
**C locus:** `dungeon.c` `recalc_mapseen` `:3115–3238`;
`Invocation_lev` `:2016–2021`; `dungeon.h` Is_valley/Is_sanctum.
**JS locus:** `js/dungeon.js` `recalc_mapseen` + `Invocation_lev`;
`Is_valley`/`Is_sanctum` `js/const.js`.
**Change:** Blind retain/`forgot` wipe; `orig_rtype` DELPHI; naltar
valley+msanctum; invoc tseen vs sanctum gateway. Named sokosolved /
quest flags / DRAWBRIDGE_UP lastseentyp / yyyymmddhhmmss.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; canary 21/21; green+strict;
cohort 7/7 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `dungeon.c` cemetery yyyymmddhhmmss when[]. Not
cemetery JSON.
**Blocked:** none.
## 2026-08-30 — D-1706 cmd.c yn_function addcmdq

**Objective:** Open `getline.c` yn_function addcmdq. Not Traditional itemize.
**C locus:** `cmd.c` `yn_function` `:5470–5583`; `cmdq_pop` /
`cmdq_add_key` / `cmdq_clear`; windowport `tty_yn_function`.
**JS locus:** `js/getline.js` `yn_function` wrapping `tty_yn_function`.
**Change:** default TRUE pop KEY + CQ_REPEAT record; FALSE at getobj /
paranoid_ynq / askchain. Named `yn_function_menu` / getdir yn.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; seed0116 127/127;
cohort 10/10 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `dungeon.c` recalc_mapseen Blind bigroom / oracle /
valley / sanctum. Not knox/drawbridge.
**Blocked:** none.
## 2026-08-30 — D-1705 shk.c bill_box_content

**Objective:** Open `shk.c` bill_box_content. Not contained_cost.
**C locus:** `shk.c` `bill_box_content` `:3386–3407`; caller
`addtobill` `:3526–3534`; `picked_container` `:3084–3100`.
**JS locus:** `js/shk.js` `bill_box_content` + `addtobill`.
**Change:** live `contained_cost` then bill nested contents;
SchroedingersBox/coin skip; `record_price_quote`; list-price
contents speech. Named dummy→billobjs / FullyUsedUp /
`remote_burglary`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; seed0116 127/127;
cohort 10/10 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `getline.c` yn_function addcmdq. Not Traditional itemize.
**Blocked:** none.
## 2026-08-30 — D-1704 shk.c dopay multi-shk getpos

**Objective:** Open `shk.c` dopay multi-shk getpos. Not shk_names_obj.
**C locus:** `shk.c` `dopay` `:1814–1856`; callees `getpos` / `m_at` /
`cansee` / `canspotmon` / `m_next2u`.
**JS locus:** `js/shk.js` `dopay`.
**Change:** seensk>1 live getpos pay-whom (ESC cancel; self / unseen /
empty / !isshk / too-far). No silent resident stub.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; seed0116 127/127;
cohort 10/10 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `shk.c` bill_box_content. Not contained_cost.
**Blocked:** none.
## 2026-08-30 — D-1703 shk.c shk_names_obj makeknown

**Objective:** Open `shk.c` shk_names_obj makeknown. Not buy_container.
**C locus:** `shk.c` `shk_names_obj` `:3412–3445`; callers
`dopayobj` `:2290`, `buy_container` `:2404`, `sellobj` `:4068`/`:4182`.
**JS locus:** `js/shk.js` `shk_names_obj`.
**Change:** live `objects()[otyp]` before `oc_magic`; makeknown
blank/mail + ordinary saleable gear; `highc`/`plur(amt)`.
FIRST_OBJECT skip stays on observe_object.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; green+strict; seed0116 127/127;
cohort 9/9 incl. seed0007 302/302 seed2200 230/230.
**Next:** Open `shk.c` dopay multi-shk getpos. Not shk_names_obj.
**Blocked:** none.
## 2026-08-30 — D-1702 shk.c buy_container named-container pay

**Objective:** Open `shk.c` buy_container. Not cheapest_item.
**C locus:** `shk.c` `buy_container` `:2307–2411`;
`insufficient_funds` `:2454–2481`; `reject_purchase` `:2417–2451`;
`update_bill` `:2169–2211`; `make_itemized_bill` `:1606–1645`;
`objnam.c` `paydoname` `:2330–2354`.
**JS locus:** `js/shk.js`, `js/objnam.js`.
**Change:** Known/UndisclosedContainer coalesce; pay contents then
box; COST_CONTENTS → `contained_cost`; paydoname no_charge rewrite.
No FullyUsedUp / `bill_box_content`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe tagged shop-unpaid template 35/35; green+strict;
cohort 9/9 incl. seed0007 302/302 seed2200 230/230 seed0116 127/127.
**Next:** Open `shk.c` shk_names_obj makeknown. Not buy_container.
**Blocked:** none.
