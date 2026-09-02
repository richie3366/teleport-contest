# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-02 — D-1739 display.c mimic map_object observe

**Objective:** Open `display.c` mimic map_object observe (named).
Not M_AP_OBJECT glyph.
**C locus:** `display.c` `display_monster` `:564–575` /
`map_object` `:332–366`.
**JS locus:** `js/display.js` `display_monster`.
**Change:** fake `zeroobj` → `map_object(obj, !sensed)` so sensed
object-mimics still write memory and `observe_object`. Named:
pet/detected glyphs; `show_mon_or_warn` I-glyph.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:display_monster`; node
gold `$` mem vs `m` disp under PfSC; potion `oc_encountered`;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `shk.c` shopper_financial_report / shop_debt.
**Blocked:** none.
## 2026-09-02 — D-1738 display.h cmap_to_glyph trap/zap/expl

**Objective:** Open `display.c` cmap_to_glyph trap/zap/expl (named).
Not furniture lastseentyp.
Continue-unfinished of #2147 (`resource_exhausted` before commit).
**C locus:** `display.h` `cmap_to_glyph` `:621–628` /
`trap_to_glyph` / `explosion_to_glyph`; explode.c `:388–438`.
**JS locus:** `js/display.js` `cmap_idx_to_glyph` /
`explode_show_visible`; `js/explode.js`; `js/const.js` S_*.
**Change:** PCHAR 49–87 via cmap_b/c; `trap_glyph` =
`cmap_to_glyph(trap_to_defsym)`; `explosion_to_glyph` (DARK→FIERY);
visible blast tmp_at. Named: drawbridge 42–45; You_hear vs Boom!.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:cmap_to_glyph`; node
`^`/`"`/`~`/`$`/`#` + expl `/` + DARK→FIERY; green+strict seed8000/0900;
CURRENT cohort **7**/7 + seed2200/0383 **9**/9 + strict. Rule #2 clean.
**Next:** Open `display.c` mimic map_object observe.
**Blocked:** none.
## 2026-09-02 — D-1737 display.c newsym Detect_monsters cansee

**Objective:** Open `display.c` newsym Detect_monsters cansee arm
(named). Not display_monster furniture.
Continue-unfinished of #2145 (`resource_exhausted` before commit).
**C locus:** `display.c` `newsym` `:1013–1029`; youprop.h `:187–190`.
**JS locus:** `js/display.js` `newsym` / `Detect_monsters` /
`cell_shows_displayed_monster`.
**Change:** cansee `see_it || (!worm_tail && Detect_monsters)` then
mtrapped bear/pit/web `tseen` and `display_monster` DETECTED when
!see_it. Named: !cansee `display_monster`; pet/detected glyphs.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:newsym`; node goblin `o`
vs ROOM `.`; green+strict seed8000/0900; cohort **7**/7 + strict.
Rule #2 clean.
**Next:** Open `display.c` cmap_to_glyph trap/zap/expl.
**Blocked:** none.
## 2026-09-02 — D-1736 display.c display_monster Protection sensed

**Objective:** Open `display.c` display_monster
Protection_from_shape_changers sensed (named). Not M_AP_FURNITURE.
Continue-unfinished of #2142 (auth death, clean tree).
**C locus:** `display.c` `display_monster` `:518–519`; youprop.h
`:355–360`. Callers `newsym` `:904`/`:1027`/`:1053`.
**JS locus:** `js/display.js` `display_monster` /
`mimic_object_appearance_glyph` / `gbuf_show_kind`.
**Change:** sensed is Protection H||E || `sensemon`, not `sensemon`
only. Furniture skips show/lastseentyp; object disguise null; kind
`monster`. Named: Detect_monsters cansee; map_object observe.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:display_monster`; node
fountain `{` vs mimic `m`; green+strict seed8000/0900; cohort **7**/7
+ strict. Rule #2 clean.
**Next:** Open `display.c` newsym Detect_monsters cansee.
**Blocked:** none.
## 2026-08-30 — D-1735 invent.c useup / write.c dowrite paper

**Objective:** Must-fix `write.c` dowrite `useup(paper)` still
invent-splice; C invent.c `useup` → `useupall`. Source: review **688**.
**C locus:** `invent.c` `useup` `:1320–1333`; callers `write.c`
`:231`/`:278`/`:335`/`:349`/`:355`.
**JS locus:** `js/invent.js` `useup`; `js/write.js` import.
**Change:** C-home `useup` next to `useupall`; write.js drops splice.
quan>1 keeps `in_use`+`weight`+`update_inventory`. Named: eat.js
hybrid; detect/potion/read/spell clones; full `dealloc_obj`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `invent.c:useup`; node quan>1 +
unpaid → `OBJ_ONBILL`; green+strict seed8000/0900; cohort **7**/7
+ strict. Rule #2 clean.
**Next:** Open `display.c` display_monster Protection sensed.
**Blocked:** none.
## 2026-08-30 — audit #2140 reviews 687–695 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **686**
(`a0c81cc6`…`4bc17535`, D-1726…D-1734) plus full `sessions`.
**C locus:** furniture lastseentyp; `useupall`/`obfree`; `yn_function_menu`;
`getdir` CQ_REPEAT; `artifact_score`; `doprgold`/`hidden_gold`;
`is_multigen`/`is_poisonable`; `u_left_shop`/`choose_stairs`;
M_AP_MONSTER `what_mon`.
**Change:** reviews **687–695**. **688** QUALITY-RISK (Must-fix:
`write.c` `useup(paper)` still invent-splice). Others ACCEPT-WITH-DEBT.
No `js/` edits. Filled archive D-1734 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `41+0.33/turn` (R² 0.863) at `4bc17535`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Must-fix `write.c` dowrite `useup(paper)` → `useupall`.
**Blocked:** none.
## 2026-08-30 — D-1734 display.c display_monster M_AP_MONSTER what_mon

**Objective:** Open `display.c` display_monster M_AP_MONSTER what_mon
(named). Not M_AP_FURNITURE lastseentyp.
**C locus:** `display.c` `display_monster` `:579–584`; `display.h`
`what_mon` / `random_monster`.
**JS locus:** `js/display.js` `display_monster` / `what_mon` /
`mon_glyph` / `worm_tail_glyph`.
**Change:** PHYSICALLY_SEEN mimic-as-monster uses
`what_mon(mappearance)` then `monnum_to_glyph`, not live `mon_glyph`.
Helper is youprop Hallu. Named: Protection sensed; Detect_monsters
cansee; pet/detected glyphs.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:display_monster`; node
kobold appearance vs blob; green+strict seed8000/0900; CURRENT
cohort **7**/7 + strict. Rule #2 clean.
**Next:** Open `display.c` display_monster Protection_from_shape_changers
sensed.
**Blocked:** none.
## 2026-08-30 — D-1733 shk.c u_left_shop / wizard.c choose_stairs

**Objective:** Open `shk.c` choose_stairs / u_left_shop leave verbalize
(named). Not remote_burglary.
**C locus:** `shk.c` `u_left_shop` `:578–625`; `wizard.c` `choose_stairs`
`:330–364`; `stairs.c` `stairway_find_type_dir` `:88–96`.
**JS locus:** `js/shk.js` `u_left_shop` / `call_kops`; `js/wizard.js`
`choose_stairs`; `js/mklev.js` `stairway_find_type_dir`.
**Change:** unpaid door-edge verbalize then return; outright leave
`rob_shop` + `call_kops`; stair swarm via `choose_stairs`. Named:
SetVoice; heaven teleport.c caller; STRAT_HEAL rloc/healmon.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `shk.c:u_left_shop`; node
dir/ladder/branch/opposite/portal/`builds_up` + boundary no-steal;
green+strict seed8000/0900; CURRENT cohort **7**/7 + strict.
Rule #2 clean.
**Next:** Open `display.c` display_monster M_AP_MONSTER what_mon.
**Blocked:** none.
## 2026-08-30 — D-1732 obj.h is_multigen / is_poisonable

**Objective:** Open `objects.h` is_multigen / is_poisonable (named). Not oc_merge.
**C locus:** `obj.h` `:260–268`; `artifact.c` `permapoisoned` `:2836–2840`;
`mkobj.c` `mksobj_init` `:877`/`:886`/`:1173`.
**JS locus:** `js/objects.js`; `js/artifact.js` `permapoisoned`; `js/mkobj.js`.
**Change:** `oc_skill` window + Grimtooth; mksobj_init end force; retire
name-list/clones; wish `"poisoned "` + FOOD age + post-oname force.
Named: mthrowu/uhitm poison combat; nhlobj lua.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `objects.h:is_multigen`; node
window+Grimtooth+wish+quan; green+strict seed8000/0900; CURRENT cohort
**9**/9 + strict. Rule #2 clean.
**Next:** Open `shk.c` choose_stairs / u_left_shop leave verbalize.
**Blocked:** none.
## 2026-08-30 — D-1731 invent.c doprgold / vault.c hidden_gold

**Objective:** Open `invent.c` doprgold hidden_gold (named). Not currency.
**C locus:** `invent.c` `doprgold` `:4502–4546`; `vault.c` `hidden_gold`
`:1256–1268`.
**JS locus:** `js/invent.js` `doprgold`; `js/vault.js` `hidden_gold`.
**Change:** `$` counts known container gold; verbose stash `eos` /
non-verbose pack total; m-prefix `dispinv("$", FALSE)`. Export C-home
`hidden_gold`; retire end/shk clones. Named: shopper_financial_report /
shop_debt; dokick `hidden_gold_kick`; botl/detect/insight/topten/u_init.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `invent.c:doprgold`; node
known/unknown/nested; green+strict seed8000/0900; CURRENT cohort **9**/9
+ strict. Rule #2 clean.
**Next:** Open `objects.h` is_multigen / is_poisonable.
**Blocked:** none.
## 2026-08-30 — D-1730 end.c artifact_score

**Objective:** Open `end.c` artifact_score (named). Not hidden_gold.
**C locus:** `end.c` `artifact_score` `:906–940`; `really_done`
`:1449`/`:1482`; `integer.h` `nowrap_add`.
**JS locus:** `js/end.js` `artifact_score` / `really_done` /
`show_death_rip_and_summary`.
**Change:** unique/invocation `arti_cost*5/2` into `urexp` when
ESCAPED/ASCENDED; list worth lines after reward/escape sentence;
cobj recurse; ASCENDED Demigod title. Named: get_valuables / pet HP /
DUMPLOG list; hidden_gold Open.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `end.c:artifact_score`; node
count+list+cobj; green+strict seed8000/0900; CURRENT cohort **9**/9
+ strict. Rule #2 clean.
**Next:** Open `invent.c` doprgold hidden_gold.
**Blocked:** none.
## 2026-08-30 — D-1729 cmd.c getdir CQ_REPEAT

**Objective:** Open `cmd.c` getdir CQ_REPEAT (named). Not
yn_function_menu.
**C locus:** `cmd.c` `getdir` `:3962–4019`; `cmdq_pop` `:409–420`;
`cmdq_add_key` `:273–290`.
**JS locus:** `js/lock.js` `getdir_read_dirsym` / `getdir`.
**Change:** `cmdq_pop` DIR/KEY; yn_function FALSE then
`cmdq_add_key(CQ_REPEAT)` when `!in_doagain`; `in_doagain` nhgetch.
`getdir_cmdassist` uses helper; `getdir_zap` + local confdir; dig
`use_pick_axe` calls `getdir`. Named: mouse getpos; help_dir in
shared; dxdy_moveok.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `cmd.c:getdir`; node KEY/DIR/
`in_doagain`/REPEAT; green+strict seed8000/0900; CURRENT cohort
**9**/9 + strict. Rule #2 clean.
**Next:** Open `end.c` artifact_score.
**Blocked:** none.
