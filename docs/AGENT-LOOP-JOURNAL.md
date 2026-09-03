# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-03 — D-1751 dokick.c ghitm hidden_gold(TRUE) kick

**Objective:** Open `dokick.c` hidden_gold(TRUE) kick (named). Not vault
hidden_gold.
**C locus:** `dokick.c` `ghitm` `:294–407` `:361`; `throw_gold` `:2712`;
`vault.c` `hidden_gold`; `zap.c` `miss`.
**JS locus:** `js/dokick.js` `ghitm`; `js/dothrow.js` `throw_gold`;
`js/mthrowu.js` `miss`.
**Change:** retire non-recursive `hidden_gold_kick`; vault helper +
export `ghitm`; `throw_gold` dz/bhit/ghitm/ship/floor. SetVoice named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `dokick.c:hidden_gold`; node 21/21;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `sounds.c` set_voice / SetVoice.
**Blocked:** none.
## 2026-09-03 — D-1750 mhitu.c doseduce / mayberem / ld() AD_SSEX

**Objective:** Open `mhitu.c` doseduce (named). Not getyear.
**C locus:** `mhitu.c` `doseduce` `:1984–2305` / `mayberem` `:2308–2352`
/ `ld()` `:25`; `mhitm_ad_ssex` mhitu arm; `sounds.c` MS_SEDUCE.
**JS locus:** `js/mhitu.js` `doseduce`; `js/sounds.js`; extractor YES.
**Change:** port seduction envelope; SYSOPT default on; expand
`SEDUCTION_ATTACKS_YES` so AMOROUS_DEMON has AD_SSEX. SetVoice named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `mhitu.c:doseduce`; node 21/21;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `dokick.c` hidden_gold(TRUE) kick.
**Blocked:** none.
## 2026-09-03 — D-1749 display.c feel_location is_worm_tail overlay

**Objective:** Open `display.c` feel_location is_worm_tail (named).
Not Blind levitate-arm.
**C locus:** `display.c` `feel_location` `:745–909` overlay `:901–908`;
`hack.c` `dopush` `:210–215` / `cannot_push_msg` `:257–258` /
monster-behind `:459–460`.
**JS locus:** `js/display.js` `feel_location`; `js/hack.js` `dopush`.
**Change:** suppress gate; `engr_can_be_felt`; cmap darken identity;
Blind boulder feel dest+source so Detect tails paint `PM_LONG_WORM_TAIL`.
Levitate-arm still named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:feel_location`; node
21/21; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `mhitu.c` doseduce.
**Blocked:** none.
## 2026-09-03 — audit #2160 reviews 701–709 + cadence

**Objective:** C-fidelity review of nine `js/` SHAs since **700**
(`b712f3b6`…`1f6d5487`, D-1740…D-1748) plus full `sessions`.
**C locus:** shk.c `shop_debt`; end.c `get_valuables`; calendar.c
`getyear`; invent.c `dealloc_obj`; weapon.c `possibly_unwield`;
display.c `newsym` dark DETECTED; `see_monsters` MON_STILL_ARRIVING;
`show_mon_or_warn`; `display_monster` pet/detected glyphs.
**Change:** reviews **701–709**, all ACCEPT-WITH-DEBT. No Must-fix.
No `js/` edits. Filled archive D-1748 `%h`.
**Score:** **44**/44, Scr **11,405**/11,405, RNG **792,838**/792,838.
Speed `40+0.31/turn` (R² 0.859) at `1f6d5487`.
**Verified:** `node frozen/ps_test_runner.mjs sessions`.
**Next:** Open `display.c` feel_location is_worm_tail.
**Blocked:** none.
## 2026-09-03 — D-1748 display.c display_monster pet/detected glyphs

**Objective:** Open `display.c` display_monster pet_to_glyph /
detected_mon_to_glyph (named). Not Protection sensed.
**C locus:** `display.c` `display_monster` `:587–618`; `display.h`
`pet_to_glyph` / `detected_mon_to_glyph` / `petnum_to_glyph`;
`wintty.c` `:3927–3936`.
**JS locus:** `js/display.js` `display_monster` / pet+detected helpers /
`glyph_tty_attr`.
**Change:** tame&&!Hallu pet glyphs (tails skip `what_mon`); else
DETECTED inverse; Hallu pets are not MG_PET. Integer glyph ids named.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:display_monster`; node
25/25; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `display.c` feel_location is_worm_tail.
**Blocked:** none.
## 2026-09-02 — D-1747 display.c show_mon_or_warn I-glyph unmap_object

**Objective:** Open `display.c` show_mon_or_warn I-glyph unmap_object
(named). Not map_object observe.
**C locus:** `display.c` `show_mon_or_warn` `:481–496`; callers
`display_monster` `:619` / `display_warning` `:650`.
**JS locus:** `js/display.js` `show_mon_or_warn` / `display_monster` /
`display_warning` / `newsym`.
**Change:** unmap remembered I then cansee `vobj_at` `map_object(o,
FALSE)` before `show_glyph`. Mimic PHYSICALLY_SEEN arms unchanged.
Named: pet/detected glyphs; `feel_location` `is_worm_tail`;
make_blinded Sting(-1).
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:show_mon_or_warn`; node
24/24; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `display.c` display_monster pet_to_glyph /
detected_mon_to_glyph.
**Blocked:** none.
## 2026-09-02 — D-1746 display.c see_monsters MON_STILL_ARRIVING skip

**Objective:** Open `display.c` see_monsters MON_STILL_ARRIVING skip
(named). Not newsym Detect_monsters.
**C locus:** `display.c` `see_monsters` `:1508–1509`; `monst.h`
`:67`; `dog.c` `mon_arrive` `:430`/`:479`/`:622`.
**JS locus:** `js/display.js` `see_monsters`; `js/const.js`;
`js/dog.js` With_you/After_you.
**Change:** skip fmon `newsym`/`see_wsegs`/Sting count while
`mstate & 0x100`. Set/clear on `mon_arrive` clones (usteed return
leaves the bit). Named: pet/detected glyphs; `show_mon_or_warn`
I-glyph; make_blinded Sting(-1).
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:see_monsters`; node
14/14; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict;
seed0013-friday13-restore PASS+strict. Rule #2 clean.
**Next:** Open `display.c` show_mon_or_warn I-glyph unmap_object.
**Blocked:** none.
## 2026-09-02 — D-1745 display.c newsym !cansee display_monster DETECTED

**Objective:** Open `display.c` newsym !cansee display_monster DETECTED
(named). Not cansee Detect_monsters.
**C locus:** `display.c` `newsym` `:1046–1054`; `display_monster`
`:532`/`:589`.
**JS locus:** `js/display.js` `newsym` / `cell_shows_displayed_monster`.
**Change:** !cansee `display_monster(see_it ? 0 : DETECTED)` instead
of `mon_glyph`+`show_glyph_cell`. Occupancy `!mimic || sensed`.
Named: pet/detected glyphs; `show_mon_or_warn` I-glyph;
`see_monsters` MON_STILL_ARRIVING.
**Score:** fortress held (not a full-suite iter).
**Verified:** probe skip untagged `display.c:newsym`; node 12/12;
green+strict seed8000/0900; CURRENT cohort **9**/9 + strict.
Rule #2 clean.
**Next:** Open `display.c` see_monsters MON_STILL_ARRIVING skip.
**Blocked:** none.
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
