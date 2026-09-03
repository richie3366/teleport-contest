# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-02 — D-1744 weapon.c possibly_unwield / setmnotwielded

**Objective:** Open `worn.c` possibly_unwield (named). Not setworn oc_oprop.
**C locus:** `weapon.c` `possibly_unwield` `:746–795` /
`setmnotwielded` `:1813–1828` / `mwepgone` `:937–946`;
`worn.c` `bypass_obj`; `wield.c` `mwelded`.
**JS locus:** `js/weapon.js` + newcham/were/`mattackm`/`use_whip`.
**Change:** stolen MON_NOWEP; !AT_WEAP drop+`flooreffects`+polyspot
`bypass_obj`; NEED_WEAPON unless mwelded+NO_WEAPON_WANTED.
Named: steal_it / mhitm_ad_sitm; m_throw setmnotwielded;
mon_break_armor; extract mwepgone inline.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged; node 13/13; green+strict
seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean.
**Next:** Open `display.c` newsym !cansee DETECTED.
**Blocked:** none.

## 2026-09-02 — D-1743 mkobj.c dealloc_obj / dobjsfree

**Objective:** Open `invent.c` dealloc_obj (named). Not useupall.
**C locus:** `mkobj.c` `dealloc_obj` `:2744–2811` /
`dealloc_obj_real` `:2814–2827` / `dobjsfree` `:2830–2843` /
`dealloc_oextra` `:95–111`; `light.c` `obj_sheds_light` /
`obj_is_burning`.
**JS locus:** `js/mkobj.js` `dealloc_obj` + `dobjsfree`; `js/light.js`;
`js/shk.js` `obfree`; `js/allmain.js` `moveloop_core`.
**Change:** timers + LS_OBJECT + thrown/kicked/tin/split + lua_ref /
`objs_deleted` queue; mklev ROCK/book/`mktrap_victim` discards.
Named: `delobj` extract; zap `delete_contents` clone; nhl leftover;
makemap_prepost.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `mkobj.c:dealloc_obj`; node 26/26;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2
clean.
**Next:** Open `worn.c` possibly_unwield.
**Blocked:** none.

## 2026-09-02 — D-1742 calendar.c getyear

**Objective:** Open `calendar.c` getyear (named). Not hhmmss.
**C locus:** `calendar.c` `getyear` `:48–52`; `getlt` `:40–46`;
`yyyymmdd` year arm `:66–70`; `mhitu.c` `ld()` `:25`.
**JS locus:** `js/calendar.js` `getyear`.
**Change:** `1900+getlt()->tm_year` (no `<70` +2000). Named:
`doseduce`/`ld()`; dump_fmtstr / paniclog.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `calendar.c:getyear`; node 10/10
(2015; 1969 vs yyyymmdd 2069; leap `0xe5`); green+strict
seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean.
**Next:** Open `invent.c` dealloc_obj.
**Blocked:** none.

## 2026-09-02 — D-1741 end.c get_valuables / sort_valuables

**Objective:** Open `end.c` get_valuables (named). Not artifact_score.
**C locus:** `end.c` `get_valuables` `:762–791` /
`sort_valuables` `:797–818`; `really_done` `:1433–1446` / `:1490–1519`.
**JS locus:** `js/end.js` `get_valuables` + ESCAPED/ASCENDED score/list.
**Change:** invent+container amulet/gem tally (skip oartifact; glass
one slot); `oc_cost` into `urexp`; disclose lines after unique items.
Named: pet HP / Schroedinger / DUMPLOG.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `end.c:get_valuables`; node 10/10 +
listing smoke; green+strict seed8000/0900; CURRENT cohort **9**/9 +
strict. Rule #2 clean.
**Next:** Open `calendar.c` getyear.
**Blocked:** none.

## 2026-09-02 — D-1740 shk.c shopper_financial_report / shop_debt

**Objective:** Open `shk.c` shopper_financial_report / shop_debt
(named). Not hidden_gold.
**C locus:** `shk.c` `shop_debt` `:989–999` /
`shopper_financial_report` `:1002–1035`; `invent.c` `doprgold`
`:4536`.
**JS locus:** `js/shk.js` `shop_debt` / `shopper_financial_report`;
`js/invent.js` `doprgold`.
**Change:** debit+bill debt and two-pass `next_shkp` xor report
(empty current shop skips pass 0). `$` awaits it after wallet.
Named: get_valuables; dokick `hidden_gold_kick`; `costly_gold`.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `shk.c:shopper_financial_report`;
node 14/14 (empty / 110 owe / credit suffix / other pass 1 / outside
billed / pass order / dead skip / `$` wallet then owe); green+strict
seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean.
**Next:** Open `end.c` get_valuables.
**Blocked:** none.

## 2026-09-02 — audit #2150 reviews 696–700 + cadence

**Objective:** C-fidelity review of five `js/` SHAs since **695**
(`8b2be954`…`3c4dafe8`, D-1735…D-1739) plus full `sessions`.
**C locus:** invent.c `useup`; Protection sensed; `newsym`
Detect_monsters cansee; `cmap_to_glyph` trap/zap/expl; M_AP_OBJECT
`map_object`.
**Change:** reviews **696–700**, all ACCEPT-WITH-DEBT. No Must-fix.
No `js/` edits. Filled archive D-1739 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `42+0.33/turn` (R² 0.856) at `3c4dafe8`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Open `shk.c` shopper_financial_report / shop_debt.
**Blocked:** none.
