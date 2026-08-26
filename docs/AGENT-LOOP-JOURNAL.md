# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-08-26 — D-1535 observe_quantum_cat FOOT

**Objective:** Open `pickup.c` `observe_quantum_cat` FOOT (named).
Not HEAD.
**C locus:** `pickup.c` `observe_quantum_cat` `:2826–2896`;
callers use_container/tip TRUE,TRUE; end.c disclose FALSE,FALSE.
**JS locus:** `js/pickup.js` `observe_quantum_cat`; `js/end.js`
identify + contents; `js/objnam.js` latebound FOOT.
**Change:** Collapse SchroedingersBox. Unseen live uses
`body_part_latebound(FOOT)`. Disclose live leaves spe. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **16**/16; green+strict seed8000/0900;
focused seed4500 FULL; cohort **7**/7 + strict.
**Next:** Open `makemon.c` `set_mimic_sym` door `S_hcdoor`. Not furnsyms.
**Blocked:** none.
## 2026-08-26 — D-1534 mcast_blind_you EYE

**Objective:** Open `mcastu.c` `mcast_blind_you` EYE (named).
Not PSI_BOLT HEAD.
**C locus:** `mcastu.c` `mcast_blind_you` `:729–743`; caller
`mcast_spell` `:875–877`; `spell_would_be_useless` `:977–979`.
**JS locus:** `js/mcastu.js` `mcast_blind_you` / `castmu`;
`js/monsters.js` `eyecount`.
**Change:** Scales `body_part(EYE)`; `make_blinded(200/100,false)`;
Eyes vision_clears. Blinded gate is `H&&!B`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **21**/21; green+strict seed8000/0900;
focused seed4500 FULL; cohort **7**/7 + strict.
**Next:** Open `pickup.c` `observe_quantum_cat` FOOT. Not HEAD.
**Blocked:** none.
## 2026-08-26 — D-1533 create_object o->lit begin_burn

**Objective:** Open `sp_lev.c` `create_object` `o->lit` (named).
Not mktrap_victim.
**C locus:** `sp_lev.c` `create_object` `:2425–2426` after
`stackobj`; producer `lspo_object` `:3640` lit default 0.
**JS locus:** `js/mklev.js` `create_object` / `l_create_object`.
**Change:** `if (o.lit) begin_burn(otmp, false)` after stackobj
(not tile.lit). Table `lit` defaults 0. Light source fill named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **12**/12; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `mcastu.c` `mcast_blind_you` EYE. Not PSI_BOLT HEAD.
**Blocked:** none.
## 2026-08-26 — D-1532 tamedog is_covetous

**Objective:** Open `dog.c` `tamedog` is_covetous (named). Not leftovers.
**C locus:** `dog.c` `tamedog` `:1240–1280` (`is_covetous`,
is_demon-vs-hero, `leader_m_id`, blessed-scroll, `make_happy_shk`,
givemsg, `mon_wield_item`).
**JS locus:** `js/dog.js` `tamedog`.
**Change:** Reject covetous / demon-vs-human-hero / quest leader
after peaceful. Blessed +2 clamp 10. Dynamic `make_happy_shk`.
`pline_mon` givemsg. Post-tame `mon_wield_item`. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1920 + D-1531 restore).
**Verified:** canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict (incl. seed0004 feeding-pony).
**Next:** Open `sp_lev.c` `create_object` `o->lit`. Not mktrap_victim.
**Blocked:** none.
## 2026-08-26 — D-1531 create_monster mk_roamer Pri-loca

**Objective:** Must-fix review **487** — `align!=RANDOM` aligned
cleric `mk_roamer` (`MM_EMIN`), not `makemon(..., 0)`.
**C locus:** `sp_lev.c` `create_monster` `:1983–1984` +
`priest.c` `mk_roamer` `:724–751`. Review named `load_pri_strt`;
locus is `load_pri_loca` (Pri-loca.lua noalign cleric).
**JS locus:** `js/mklev.js` `load_pri_loca` + `mk_roamer_splev`.
**Change:** `mk_roamer_splev(pm, Amask2align(AM_NONE), …)` so
D-1526 emin `rn2(3)` does not fire. Emin arm kept. Rule #2: no fs.
**Score:** **44**/44 Scr **11,405** RNG **792,838**/792,838
(100%) speed `38+0.30/turn` (R² 0.841). seed0367 FULL.
**Verified:** C/JS grep; seed0367 FULL+strict; green+strict;
cohort **7**/7; priest 0501/0106; full `sessions` 44/44.
**Next:** Open `dog.c` `tamedog` is_covetous. Not leftovers.
**Blocked:** none.
## 2026-08-26 — review D-1522–D-1530 (audit #1920)

**Objective:** audit — C-fidelity reviews **483–491** of JS SHAs
`aac21a74` / `e13f38ae` / `2c688c98` / `e234a41b` /
`4e78ca90` / `d53c5cd1` / `aa4d11f5` / `72c1fcdd` /
`a5d779b7` plus full `sessions` score.
**C locus:** `reorder_fruit`; `goodfruit`; `object_from_map`;
TEMPLE `S_altar`; emin roaming; `#timeout` summary;
`show_region`; `see_wsegs`; getobj ALLOWCNT.
**Change:** no `js/` edits. One **QUALITY-RISK** (487 D-1526
Pri-strt `makemon(..., 0)` vs C `mk_roamer`). Eight
**ACCEPT-WITH-DEBT**. Must-fix prepended. Filled archive
D-1530 `a5d779b7`. Rule #2: no fs.
**Score:** **43**/44 Scr **11,405**/11,405 RNG
**747,952**/792,838 (94.3%) speed `37+0.30/turn` (R² 0.855).
seed0367 FAIL RNG **5239**/50125 from `4e78ca90`.
**Verified:** full `sessions` at HEAD `a5d779b7`.
**Next:** Must-fix `load_pri_strt` `mk_roamer` (review **487**).
Not Open `tamedog`. Do not delete emin.
**Blocked:** none.
## 2026-08-26 — D-1530 invent.c getobj ALLOWCNT

**Objective:** Open `invent.c` `getobj` GETOBJ_ALLOWCNT (named).
Not Palantir.
**C locus:** `invent.c` `getobj` `:1937–2088` + `splittable`
`:1664`; `cmd.c` `get_count` inkey/`LARGEST_INT`/`GC_SAVEHIST`.
**JS locus:** `js/invent.js` helpers; charge/drop/throw/wield/
ready/adjust clones.
**Change:** Digit prefix, throw-one, "don't have that many",
`split_otmp` (child after parent on invent[]). Palantir `#if 0`.
CMDQ_INT / pickinv count / finish_splitting named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
digit-at-getobj public-unhit.
**Verified:** canary **32**/32; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `dog.c` `tamedog` is_covetous. Not leftovers.
**Blocked:** none.
## 2026-08-26 — D-1529 worm.c see_wsegs

**Objective:** Open `worm.c` `see_wsegs` (named). Not worm_move.
**C locus:** `worm.c` `see_wsegs` `:487–495`; callers
`display.c` `see_monsters` `:1511–1512`, `worn.c`
`mon_set_minvis` `:482–483`, `monmove.c` postmov `:1683–1686`;
callee `is_worm_tail` `:500` + `display_monster` `:599–618`.
**JS locus:** `js/worm.js` `see_wsegs`; `js/display.js`
`see_monsters` / `newsym` / `mon_at_display`; `js/worn.js`;
`js/monmove.js`.
**Change:** Refresh tail cells except dummy head. Occupancy
via `_level_monsters`. Visible tails paint `~`; minvis hides
them; Hallu `what_mon(PM_LONG_WORM_TAIL)`. detect_wsegs /
`worm_known` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
live long-worm tails public-unhit.
**Verified:** canary **24**/24; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `invent.c` `getobj` GETOBJ_ALLOWCNT. Not Palantir.
**Blocked:** none.
## 2026-08-26 — D-1528 display.c show_region

**Objective:** Open `display.c` `show_region` (named). Not
Hallu/Warn_of_mon.
**C locus:** `region.c` `show_region` `:732–735`; callers
`display.c` `_map_location` `:470–471` and `newsym`
`:993–998`; `mon_overrides_region` `:668–700`.
**JS locus:** `js/region.js` `show_region`; `js/display.js`
`newsym` / `map_location`.
**Change:** Paint S_cloud / S_poisoncloud into gbuf. newsym
cansee early overlay on ACCESSIBLE or pool/lava unless
`mon_overrides_region`. `_map_location` overlays after map
when show && !Blind. worm_tail / DRAWBRIDGE_UP under named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
live-cloud gbuf public-unhit.
**Verified:** canary **31**/31; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `worm.c` `see_wsegs`. Not worm_move.
**Blocked:** none.
## 2026-08-26 — D-1527 timeout.c visible_region_summary

**Objective:** Open `timeout.c` `visible_region_summary`
(named). Not any_visible_region.
**C locus:** `region.c` `visible_region_summary` `:672–711`;
caller `timeout.c` `wiz_timeout_queue` `:2112–2113`.
**JS locus:** `js/region.js` `visible_region_summary`;
`js/timeout.js` `wiz_timeout_queue`; getline `#timeout`.
**Change:** `#timeout` lists timers, timed TIMEOUT,
swallow/vault/stasis, then Visible-regions (ttl+1, poison
gas vs vapor, bounding box) when `any_visible_region`.
tid on `start_timer`. `show_region` named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
`#timeout` / live-cloud listing public-unhit.
**Verified:** canary **43**/43; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `display.c` `show_region`. Not
Hallu/Warn_of_mon.
**Blocked:** none.
## 2026-08-26 — D-1526 makemon.c emin roaming

**Objective:** Open `makemon.c` emin roaming (named). Not
dprince.
**C locus:** `makemon.c` `makemon` `:1410–1428` after
LONG_WORM, before `set_malign`.
**JS locus:** `js/makemon.js` `makemon`.
**Change:** Ordinary ALIGNED_CLERIC/HIGH_CLERIC without
`MM_EPRI|MM_EMIN`, or ANGEL without `MM_EMIN` `!rn2(3)`,
get `newemin` + `isminion` + `min_align=rn2(3)-1` +
renegade + coalign XOR peaceful. Flagged callers skip.
Door `S_hcdoor` / furnsyms / Protection / `block_point`
named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
ordinary cleric/angel emin public-unhit.
**Verified:** canary **40**/40; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `timeout.c` `visible_region_summary`. Not
any_visible_region.
**Blocked:** none.
## 2026-08-26 — D-1525 makemon.c set_mimic_sym altar Align2amask

**Objective:** Open `makemon.c` `set_mimic_sym` altar
Align2amask MCORPSENM (named). Not maze/shop.
**C locus:** `makemon.c` `set_mimic_sym` `:2458–2460`
TEMPLE `S_altar`; `:2538–2546` Align2amask /
`has_mcorpsenm`.
**JS locus:** `js/makemon.js` `set_mimic_sym`.
**Change:** TEMPLE appear `S_altar` (33); `MCORPSENM`
`(Inhell && rn2(3)) ? AM_NONE : Align2amask(rn2(3)-1)`;
Inhell via dungeon hellish (no minion import). Stale
`has_mcorpsenm` → `NON_PM`. Door/wall `S_hcdoor` /
furnsyms real S_* / Protection / `block_point` named.
Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
temple-mimic Align2amask public-unhit.
**Verified:** canary **19**/19; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `makemon.c` emin roaming. Not dprince.
**Blocked:** none.
## 2026-08-26 — D-1524 pager.c object_from_map SLIME_MOLD spe

**Objective:** Open `pager.c` look SLIME_MOLD `spe =
current_fruit` (named). Not xname.
**C locus:** `pager.c` `object_from_map` `:284–377`;
`look_at_object` `:380–399`.
**JS locus:** `js/pager.js` `object_from_map` /
`look_at_object`; `brief_at` / `look_all`.
**Change:** fake SLIME_MOLD `spe = current_fruit`; mimic
`MCORPSENM` override. Glyphotyp not integer glyph.
doname_with_price named. `that_is_a_mimic` /
`namefloorobj` / getpos fakeobj named. Rule #2: no fs.
**Score:** fortress **44**/44 (cadence #1910);
fake named-fruit look public-unhit.
**Verified:** canary **16**/16; green+strict seed8000/0900;
cohort **7**/7 + strict.
**Next:** Open `makemon.c` `set_mimic_sym` altar
Align2amask MCORPSENM. Not maze/shop.
**Blocked:** none.
