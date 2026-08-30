# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-30 — ledger Cluster 6 B0 table / remaining map notes

**Objective:** Close JSON save/restore ledger take — B0 numbers +
named remainders. No JS.
**C locus:** n/a (docs).
**JS locus:** n/a.
**Change:** CURRENT/NOTES B0: trap-same-floor 17/17; ledger 26/26;
catchup 30/30; shop/trap-ledger unrecorded. Maps already name binary
NHFILE, both relink sites, M2/M6, absolute dst, dropped iflags/worn.
**Score:** fortress held (not a full-suite iter).
**Verified:** Cluster 5 commit `736b74ec` already green.
**Next:** map-driven named omissions. Not shop/trap-ledger until recorded.
**Blocked:** none.
## 2026-08-30 — D-1699 restore.c dorecover getlev place / omoves restamp

**Objective:** JSON save/restore ledger Cluster 5 — getlev place,
dorecover envelope, restlevelfile omoves analogue.
**C locus:** `restore.c` getlev `:1177–1220`; dorecover `:922–949`;
`save.c` savelev `:515–516` `svm.moves` timestamp.
**JS locus:** `js/do.js` `getlev_place_monsters`; `js/save.js`
`restampOtherLedgerOmoves` + async `try_restore_save`; `js/shk.js`
`set_residency`; `js/jsmain.js`.
**Change:** occupancy place + one `restore_cham` per current fmon;
restamp other `omoves` to restore-time moves (C elapsed==0 on `<`);
`run_timers` last; `check_special_room` after welcome.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict; seed0013; seed0105; stairs; trap-same-floor;
cohort. Ledger **26/26**; catchup **30/30**.
**Next:** Cluster 6 B0 table / remaining map notes.
**Blocked:** none.
## 2026-08-30 — D-1698 save.c savegamestate JSON worn/RANGE_GLOBAL relink

**Objective:** JSON save/restore ledger Cluster 4 — worn, drop iflags,
RANGE_GLOBAL timers/lights, restgamestate relink.
**C locus:** `save.c` `savegamestate` `:264–332`; `restore.c`
`restgamestate` `:687–699` / `:725–726`.
**JS locus:** `js/save.js`; `relinkGlobalTimersLights` `js/lev_json.js`.
**Change:** `owornmask`+`setworn`+`setuwep`; strip context pointers;
global timers/lights/`timer_id`; migrating/fruit/quest/`artidisco`.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict; seed0013; seed0105; stairs; trap-same-floor;
cohort. Ledger 25/26 (Cluster 5).
**Next:** Cluster 5 getlev `place_monster`/`restore_cham`.
**Blocked:** none.
## 2026-08-30 — D-1697 save.c dosave0 JSON other LFILE_EXISTS ledgers

**Objective:** JSON save/restore ledger Cluster 3 — `levels{}` +
`linfo` + M2.
**C locus:** `save.c` `dosave0` `:185–215`; `dungeon.c` `save_dungeon`
linfo `i < maxledgerno()`.
**JS locus:** `js/save.js`; `maxledgerno` `js/dungeon.js`.
**Change:** persist other `LFILE_EXISTS` blobs; hydrate into
`level_info` without inserting timers. Ledger geometry restored;
dog 1-cell miss is Cluster 5 getlev post.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict; seed0013; seed0015; trap-same-floor;
ledger 25/26 (was mklev).
**Next:** Cluster 4 RANGE_GLOBAL relink; Cluster 5 getlev post.
**Blocked:** none.
## 2026-08-30 — D-1696 save.c savelev JSON serLevel current blob

**Objective:** JSON save/restore ledger Cluster 2 — shared `serLevel`
codec, `payload.current`, bones callers.
**C locus:** `save.c` `savelev_core`; `restore.c` getlev `:1299–1300`
relink; `savemon` mnum / `forget_temple_entry`.
**JS locus:** `js/lev_json.js`; `js/save.js`; `js/bones.js`.
**Change:** write `payload.current = serLevel(...)`; restore
`deserLevel` GameMap + per-blob timer/light relink (no `billobjs`).
Bones `write_bonesfile` calls `serLevel`. Named: other ledgers.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict seed8000/0900; seed0013 99/99;
trap-same-floor 17/17; seed0015/0700/0014; seed0105.
**Next:** Cluster 3 VFS `levels{}` + `linfo`.
**Blocked:** none.
## 2026-08-30 — D-1695 do.c goto_level savelev stash lights/billobjs

**Objective:** JSON save/restore ledger Cluster 1 — complete in-memory
`savelev` stash.
**C locus:** `do.c:1642` `update_mlstmv`; `save.c` savelev lights +
billobjs; `priest.c` `forget_temple_entry`.
**JS locus:** `js/do.js`; `save_light_sources` `js/mkobj.js`.
**Change:** peel RANGE_LEVEL lights; stash `billobjs`; mlstmv + temple
forget on ordinary leave. Named: cant_go_back FREEING.
**Score:** fortress held (not a full-suite iter).
**Verified:** green+strict; seed0013; seed0015/0700/0014; seed0105;
trap-same-floor.
**Next:** Cluster 2 `serLevel` / `deserLevel`.
**Blocked:** none.
## 2026-08-30 — D-1694 save.c savetrapchn current-level JSON traps

**Objective:** JSON save/restore ledger Cluster 0 — persist
`level.traps` (not empty `game.ftrap`).
**C locus:** `save.c` `savetrapchn` `:918–942`; `restore.c` getlev
`:1149–1163`.
**JS locus:** `js/save.js` `serTraps`/`deserTraps`; `js/bones.js`.
**Change:** write `payload.traps` from `level.traps`; restore into
`map.traps`. `dst.dlevel` absolute. Named: multi-level ledger.
**Score:** fortress held (not a full-suite iter).
**Verified:** private trap-same-floor HEAD red 14/17 then **PASS**
17/17; green+strict seed8000/0900; seed0013 99/99; seed0015/5006.
**Next:** Cluster 1 `goto_level` stash (`billobjs`, damagelist,
lights-by-id, `update_mlstmv`, `forget_temple_entry`).
**Blocked:** none.
## 2026-08-30 — D-1693 dungeon.c count_feat knox/drawbridge

**Objective:** Open `dungeon.c` print_mapseen knox/drawbridge (named).
Not cemetery JSON.
**C locus:** `dungeon.c` `count_feat_lastseentyp` `:3026–3068`;
`recalc_mapseen` `castletune=0`; `is_drawbridge_wall`; print_mapseen
ludios/castle already D-1650.
**JS locus:** `js/dungeon.js` `count_feat_lastseentyp` /
`recalc_mapseen`; `js/dbridge.js` `is_drawbridge_wall`.
**Change:** Knox door+throne → `flags.ludios`; stronghold
DOOR-wall/DBWALL/DRAWBRIDGE_DOWN → castle+tune; recalc zeros tune.
Named: DRAWBRIDGE_UP/mimic lastseentyp; Blind bigroom/oracle/valley/
sanctum; when[].
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **PASS**; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `options.c` mO perminv_mode compound row. Not
optfn_perminv_mode.
**Blocked:** none.
## 2026-08-29 — audit #2100 reviews 645–653 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **644**
(`01f25fda`…`ac1199da`, D-1684…D-1692) plus full `sessions`.
**C locus:** pay via_menu; cemetery JSON; rub/swap/whatis; Traditional
`I`; cheapest_item; doengrave sfx; `oc_charged`; undiscover/gem_learned;
`chwepon` `restrict_name`.
**Change:** reviews **645–653**, all ACCEPT-WITH-DEBT. No Must-fix.
No `js/` edits. Filled archive D-1692 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `39+0.32/turn` (R² 0.866) at `ac1199da`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Open `dungeon.c` print_mapseen knox/drawbridge. Not cemetery
JSON.
**Blocked:** none.
## 2026-08-29 — D-1692 wield.c chwepon restrict_name

**Objective:** Open `artifact.c` wield restrict_name (named). Not
do_oname slip.
**C locus:** `wield.c` `chwepon` `:991–997` / `:1036–1039`; callee
`artifact.c` `restrict_name` `:574–623`; unpaid `alter_cost`;
`costly_alteration` COST_DEGRD/DECHNT.
**JS locus:** `js/wield.js` `chwepon`; `js/artifact.js` `restrict_name`.
**Change:** named restricted artifact faint-glow no spe; Magicbane
`is_art`; unpaid shop; weld `update_inventory`. Named: `useupall`.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **PASS**; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `dungeon.c` print_mapseen knox/drawbridge. Not cemetery
JSON.
**Blocked:** none.
## 2026-08-29 — D-1691 o_init.c undiscover_object / gem_learned

**Objective:** Open `o_init.c` undiscover_object / gem_learned (named).
Not oc_uses_known.
**C locus:** `o_init.c` `undiscover_object` `:497–523`; `shk.c`
`gem_learned` `:3196–3231`; `find_oid` `:2776–2804`; `invent.c` `o_on`
`:1586–1599`; `do_name.c` `docall` `:668–669`.
**JS locus:** `js/o_init.js`; `js/shk.js`; `js/invent.js`; `js/do_name.js`.
**Change:** disco shift on empty Call; unpaid gem `get_cost`; `o_on` /
`find_oid`; `discover_object` moveloop reprice. Named: FIRST_OBJECT
observe skip.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **PASS**; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `artifact.c` wield restrict_name. Not do_oname slip.
**Blocked:** none.
## 2026-08-29 — D-1690 objects.h oc_charged extract

**Objective:** Open `objects.h` oc_charged extract (named). Not oc_merge.
**C locus:** `objclass.h` `oc_charged`; `objects.h` BITS chrg;
`mkobj.c` RING_CLASS `:1128`; `objnam.c` doname/`readobjnam` `:5099`.
**JS locus:** extractor + `js/generated/objects_data.js`;
`otyp_is_charged`; `mksobj_init`; `ini_inv_adjust_obj`; wish spe clamp.
**Change:** dump BITS chrg; table read replaces doname/mkobj/u_init
name-list; non-wizard wish spe clamp. Named: `oc_merge`.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **PASS**; green+strict seed8000/0900;
cohort **9**/9 + strict.
**Next:** Open `o_init.c` undiscover_object / gem_learned. Not oc_uses_known.
**Blocked:** none.
## 2026-08-29 — D-1689 engrave.c doengrave non-hands stylus

**Objective:** Open `engrave.c` doengrave non-hands stylus (named). Not
IA_ENGRAVE pushkeys.
**C locus:** `engrave.c` `doengrave` `:955–1263`;
`doengrave_sfx_item` `:741–892`; `doengrave_sfx_item_WAN` `:582–738`.
**JS locus:** `js/engrave.js` `doengrave` / sfx; `is_blade`/`is_boots`;
`Yobjnam2`.
**Change:** live getobj write-with; wand/weapon/marker/towel/gem sfx;
doname You(); type-mismatch wipe. Named: yn add-to; dulling.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **10**/10; green+strict seed8000/0900;
seed0101; cohort **7**/7 + strict.
**Next:** Open `objects.h` oc_charged extract. Not oc_merge.
**Blocked:** none.
## 2026-08-29 — D-1688 shk.c cheapest_item early return

**Objective:** Open `shk.c` cheapest_item early return (named). Not
Traditional itemize.
**C locus:** `shk.c` `cheapest_item` `:1521–1539`;
`pay_billed_items` `:2060–2080`.
**JS locus:** `js/shk.js` `cheapest_item` / `pay_billed_items` /
`dopay`.
**Change:** min `ibill[].cost`; no-gold You() stashed/` left`; refuse
pay when cash+credit < cheapest. Named: `buy_container`.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **15**/15; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `engrave.c` doengrave non-hands stylus. Not IA_ENGRAVE
pushkeys.
**Blocked:** none.
## 2026-08-29 — D-1687 invent.c dotypeinv Traditional itemize yn

**Objective:** Open `invent.c` Traditional itemize yn (named). Not
cheapest_item.
**C locus:** `invent.c` `dotypeinv` `:3826–4032`; `this_type_only`
`:3792–3823`; `tally_BUCX` `:3578–3616`; `shk.c` `doinvbill`
`:4196–4271`; `pickup.c` `query_objlist` this_title / PICK_ONE.
**JS locus:** `js/invent.js` `dotypeinv`; `js/pickup.js`; `js/shk.js`
`doinvbill`; `js/cmd.js` `'I'`; `js/getline.js` inventtype.
**Change:** Traditional yn_function class prompt + FULL query_category
PICK_ONE; this_type_only filter; doinvbill Ix; query_objlist this_title.
Named: cheapest_item / `buy_container` / yn addcmdq.
**Score:** fortress held (not a full-suite iter).
**Verified:** private canary **10**/10; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `shk.c` cheapest_item early return. Not Traditional
itemize.
**Blocked:** none.
