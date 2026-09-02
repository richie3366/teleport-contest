# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
