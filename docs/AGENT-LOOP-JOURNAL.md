# Agent loop journal
## 2026-09-24 — Audit 2254700ea..35cb25d77 (reviews 1731–1739: 7 ACCEPT, 2 QUALITY-RISK → 2 Must-fix) + cadence 44/44.

Reviews audit D-2772..D-2780 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all). 1733 QUALITY-RISK: D-2774
passes lowercased `lname` (with `!` stripped) as optfn `opts`, but C
`strncmp` is case-sensitive, so `USE_MENU_GLYPHS` menus render entries
instead of headers (own smoke: 2 vs C 1) — pass `stripped` instead.
1737 QUALITY-RISK: D-2778's number_pad arm routes through
doset_compound_via_getlin which never marks `opt_set_in_config`, while
C doset_simple_menu marks on optn_ok even for cancel — compound path
needs the same mark. 1731/1732 ACCEPT close the 1728/1724 Must-fix rows
(1732 nit: comment says `:7174` absent from pinned upstream, but it is
present — behavior correct). 1734/1735/1736/1738/1739 ACCEPT (1735
sscanf hand-proof, 1736 240-entry table script-verified, 1738
DEBUG_MIGRATING_MONS wishlist live re-verified). Every re-measure 0
REGRESSED. Cadence at `35cb25d77`: public 44/44, Scr 11,405, RNG
792,838, speed 52+0.32 (R² 0.80); held-out 12/44 (+0, judge stamp
2026-09-24T01:23Z, values identical); corpus 501/540, per-session
identical to audit 1723–1730. Rule #2 clean. Next: the two Must-fix
rows (compound mark first, then `stripped`).
## 2026-09-23 — Audit d0dce8186..385103f98 (reviews 1723–1730: 5 ACCEPT, 1 WITH-DEBT, 2 QUALITY-RISK → 2 Must-fix) + cadence 44/44.

Reviews audit D-2764..D-2771 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all). 1724 QUALITY-RISK: the three
D-2765 option handlers (msg_window / paranoid_confirmation / versinfo)
have no JS caller — `optlist.h` marks them has_handler and C doset calls
do_handler, but JS doset lists the rows without `handler` and with
hardcoded values, so picks are dropped. 1728 QUALITY-RISK: D-2769 made
list_vanquished class/Rider headers live while `vanqsort_cmp` MCLS arms
still return 0 (mndx order), so class modes mis-order and can repeat the
demon header. 1730 WITH-DEBT: `wizcustom_glyphids` loop has an empty
callback site (glyphmap-blocked; docs say `[3][5]`, code is the correct
`[3][4]`). 1723/1725/1726/1727/1729 ACCEPT. Every re-measure 0 REGRESSED;
list_vanquished NO MOVEMENT matches its D-log (map-cell first diff, not
this function). Cadence at `385103f98`: public 44/44, Scr 11,405, RNG
792,838, speed 53+0.32 (R² 0.78); held-out 12/44 (+0, judge stamp
13:08Z unchanged); corpus 501/540, per-session identical to audit
1714–1722. Rule #2 clean. Next: Must-fix vanqsort_cmp, then doset
handlers.
## 2026-09-23 — D-2764 `cfgfiles.c` handle_config_section: whole-body port (section filter + is_config_section/free_config_sections)

**C locus:** `nethack-c/upstream/src/cfgfiles.c:551–582` (`handle_config_section`); callees `is_config_section` `:522–549`, `free_config_sections` `:506–517`. Every `:line` cite verified by direct read of pinned C.
**JS:** `js/cfgfiles.js` — exports `handle_config_section`, `is_config_section`, `free_config_sections`; new edges hacklib.js `trimspaces`, botl.js `config_error_add` (no cycle: botl/hacklib never import cfgfiles).
**Change:** ported all three bodies in C order: `is_config_section` trim/`[`/first-`]`/spaces-only-then-`#`/cut+retrim (`:530–548`); `handle_config_section` `!== null` pointer test (empty `"[]"` is non-null in C), current-freed-before-CHOOSE-check (`:557–558`), `Section "[%s]" without CHOOSE` sink (`:561`), `*sect`-gated dupstr vs `free_config_sections` (`:564–571`), strcmp-`!==` filter (`:575–580`); gameconfig fields on `game`; dupstr/free GC no-ops; debugpline0/1 D_DEBUG-only.
**Verify:** `node scripts/verify.mjs --fn handle_config_section` → PASS syntax (1 file: cfgfiles.js) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (cfgfiles.js not shared) · VERIFY: PASS. Plus a 9-case parser smoke + 6-step state-flow smoke → all C-exact. Continuation: iter #3551 died pre-commit after verify+smokes; leftover re-verified green, docs finished here.
**Named:** `parse_conf_buf` `:1768` caller (no JS read_config_file dispatch); `is_config_section` C input mutation (trailing-strip + `]` cut) owed to that future caller's FALSE path; debugpline0/1 (D_DEBUG-only).
**Next:** `options.c` optfn_msg_window (next Open row; queue holds 12 after refill: handler_paranoid_confirmation/optfn_symset/add_custom_nhcolor_entry/handler_versinfo/warning_opts).
## 2026-09-23 — Audit 7cd2543a4..c959009f8 (reviews 1714–1722: 9 ACCEPT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2755..D-2763 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all, own smokes). 1714 pick_lock
integer-id turn-keep; 1715 u_on_newpos 17 call sites + TELE async proof;
1716 six hilite bodies, menu_add FALSE-path fenced; 1717 getspell cmdq +
traditional; 1718 lookaround goto-flags + nomul(0); 1719 dogfood arms +
null-safe NUMMONS; 1720 waterbody_name C-order + Is_qstart; 1721 rebind
menu + six bodies, identity compare proven; 1722 MENUCOLOR parser 8/8
smoke. Each verify 0 REGRESSED. Nits only: dogmove MAX_EGG_HATCH_TIME
dupes const.js (value-identical), cmdbind_add null-extcmd unreachable
edge. Cadence: public 44/44 (speed 69+0.42 R² 0.77); held-out 12/44
(+0, judge stamp 2026-09-23T13:08Z); corpus 501/540 (0 PASS→FAIL vs
HEAD). Queue holds 8 Open; no refill. Rule #2 clean.
## 2026-09-23 — Audit 14f1ff816..a4348216d (reviews 1709–1713: 5 ACCEPT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2750..D-2754 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all). All five close the prior
Must-fixes: 1709 mon_at_display skips MON_OFFMAP; 1710 steal calls
exported Blind(); 1711 attack_checks reads u.uinwater; 1712 monstone
uses memory_glyph_is_invisible; 1713 mdamagem touch-petrify head plus
attk_protection. Cite slip steal.c:391 vs the logged :384 is not a
C-wrong. Named deferrals stay named (resists_ston worn/artifact,
attk_protection callers mhitu.c:2484 and uhitm.c:5936). Each verify
0 REGRESSED. Cadence: public 44/44 (Scr 11405/11405, RNG 792838/792838,
speed 51+0.31 R² 0.78); held-out 12/44 (+0, judge stamp
2026-09-23T07:13Z); corpus 501/540 (0 PASS→FAIL vs HEAD). Next cluster
is the pick_lock !IS_DOOR measurement row. Queue holds 8 Open; no
refill. Rule #2 clean.
## 2026-09-23 — Audit d44374fc8..1b2e6cd12 (reviews 1700-1708: 3 ACCEPT + 2 WITH-DEBT + 4 QUALITY-RISK, 5 Must-fix) + cadence 44/44.

Reviews audit D-2741..D-2749 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all). 1700 doread cookie
useup_live closes review 1688. 1702/1703 WITH-DEBT: safe_qbuf unwired
inlines already named; pick_lock !IS_DOOR stays the existing Open row.
QUALITY-RISK Must-fix: 1701 monstone `glyph_is_invisible(loc)` plus
unwired `mdamagem` touch-petrify head; 1706 attack_checks `!u.Underwater`
(field never written; C is `u.uinwater`); 1707 steal `Blind_steal`
(`u.Blind || u.ublind`) instead of live `Blind()`; 1708 mhurtle_step
smoke reach was 0 REGRESSED, but the cadence re-score moved
scen-genesis-Archeologist-91135 PASS (scoreboard `49fb30909`) to FAIL
screen step 178, owner mhitm_knockback uhitm.c:5357 — the only later
js/ commit. Next cluster is that regression. Cadence: public 44/44
(Scr 11405/11405, RNG 792838/792838, speed 69+0.43 R² 0.79); held-out
12/44 (+0, judge stamp 2026-09-23T07:13Z); corpus 500/540 (−1 that
session). `--rows 20` is the stale head; nothing appended. Rule #2 clean.
## 2026-09-21 — Audit 2a3c61e5..f6f4a0b2 (reviews 1674-1682: 8 ACCEPT + 1 WITH-DEBT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2715..D-2723 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all re-runs: 4× 0-blocked
vacuous + REACH-OK; 5 genuine PROGRESS — 1676 distfleeck Caveman-92202
PASS at HEAD (later owner fixed by D-2719), 1677/1679 do_statusline2
Healer-92107→retouch_object@298 / Healer-92092 PASS, 1678 monhp_per_lvl
Caveman PASS, 1680 destroy_arm Caveman PASS; 0 REGRESSED anywhere).
Notable: 1674 null-mon `is_magic_key` + zero-questarti nuances
pre-existing, unreachable from autokey; 1676 `mstrategy != null` guard
null-safe rendering; 1679 `cmdq_clear` pre-existing house rendering;
1682 WITH-DEBT solely for the `!oldmem` map line (display-only corner,
commit-disclosed) + "`digests` new edge" message imprecise (`--can`
ALREADY, no new module edge). No Must-fix prepend; CURRENT Next cluster
unchanged (shipped dokick; next port pops queue head
done_object_cleanup). Cadence: public 44/44 (Scr 11405/11405, RNG
792838/792838, speed 60+0.33 R² 0.78); held-out 12/44 (+0);
corpus 500/540 (+2 Caveman-92202 via D-2721, Healer-92092 via D-2720).
Queue 2 Open, pool exhausted (`--rows 600`: 74 machine-fresh all
class-deferred; hidden-proxy queue 0 untagged-eligible) — no refill.
Rule #2 clean.
## 2026-09-21 — Audit 29baae20..70a4bf39 (reviews 1665-1673: 9 ACCEPT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2706..D-2714 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all re-runs: 8× 0-blocked
vacuous + REACH-OK; 1673 distfleeck genuine PROGRESS — Wizard-92127
PASS, 3 unchanged at own writer rows, 475-session reach 475 PASS, 0
REGRESSED). Notable: 1667 impossible() fire-and-forget in sync loaders
(pre-existing precedent, disclosed); 1669 TOP/BOTTOM==SPLEV_TOP/BOTTOM
verified at sp_lev.c:172-173; 1671 raw-index "true"→0 clears-flag quirk
preserved exactly; 1672 MARK=4 alias via const import; 1673 no RNG
call touched — the missing Blind-look turn re-aligns rnl(20). Cadence:
public 44/44 (Scr 11405/11405, RNG 792838/792838); held-out 12/44
(+0); corpus 498/540 (+1 Wizard-92127 via D-2714). Queue 5 unchecked,
pool exhausted (78 machine-fresh all class-deferred; queue owners all
tagged) — no refill. Rule #2 clean.
## 2026-09-21 — Audit 3de22e5b..51e65db7 (reviews 1656-1664: 9 ACCEPT, 0 Must-fix) + cadence 44/44.

Reviews audit D-2697..D-2705 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all re-runs: all 0-blocked
vacuous + REACH-OK, no REGRESSED). 1656 closes the 1654 Must-fix
(43 remaining coord-form sites wired, 15+43+3=61 arithmetic shuts).
Notable: 1661 movecmd txt-vs-funct equivalence + stale lock.js:128
comment; 1664 trimspaces leading-strip justified via describe_level
formats. Cadence: public 44/44 (Scr 11405/11405, RNG 792838/792838);
held-out 12/44 (+0); corpus 497/540 (+0/-0). Queue 8 unchecked, no
refill (at band). Rule #2 clean.

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-23 — D-2780 `glyphs.c` purge_all_custom_entries + purge_custom_entries whole-body ports (customization teardown live)

**C locus:** `nethack-c/upstream/src/glyphs.c:751–758` (purge_all_custom_entries: `i < NUM_GRAPHICS + 1` loop, global, extern.h:1184) + `:761–794` (purge_custom_entries: staticfn, glyphs.c:50; per-custtype chain walk with per-arm payload clearing under the `gdc.custtype` guard, details/details_end/name/count reset); enum `customization_types` sym.h:138–139 (none/symbols/ureps/nhcolor/count ≡ JS CUSTOM_* 0–4, D-2771).
**JS:** `js/glyphs.js` `purge_all_custom_entries :731` (export), `purge_custom_entries :748` (module-local).
**Change:** whole C bodies in C order with `:line` cites. Export `purge_all_custom_entries` — the inclusive `NUM_GRAPHICS + 1` loop (UNICODESET +1 row, cf. grid comment). Module-local `purge_custom_entries` (like C staticfn) — `which_set | 0`, `CUSTOM_NONE..CUSTOM_COUNT` loop, `next`-saved chain walk, three `gdc.custtype` arms (urep `u.utf8str = null` / sym `symparse = null, val = 0` / ccolor `nhcolor = 0, glyphidx = 0`, each null-guarded since only the ccolor writer is live), then `details/details_end = null`, name null under the `!== null` guard, `count = 0`; C `free` ≡ unlink (JS GC collects, add_custom precedent).
**Verify:** `node scripts/verify.mjs --fn purge_all_custom_entries` → PASS syntax (1 changed js file: js/glyphs.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS.
**Named:** freedynamicdata (save.c:1090 caller — save-freeing infra, NOTES guard, never ported); clear_symsetentry (symbols.c:347 caller — symset teardown, own coverage row when emitted); add_custom_symbols/add_custom_ureps writers (payload arms live-guarded, shapes land with those rows).
**Next:** next Open — coverage row.
## 2026-09-23 — D-2779 `wizcmds.c` wiz_show_seenv + wiz_migrate_mons whole-body ports (#wizseenv / #migratemons live)

**C locus:** `nethack-c/upstream/src/wizcmds.c:576–617` (wiz_show_seenv: `:583` create, `:588–592` hero-centered startx/stopx + 80-col guard, `:594–613` ROWNO putstr rows of `@@`/blank/`%02x` cells, `:606–610` trailing-space trim, `:614–616` display TRUE + destroy + ECMD_OK); `:1873–1930` (wiz_migrate_mons: `:1885–1890` tolevel via Is_stronghold→valley / Is_botlevel→(0,0) / get_level(depth+1), `:1892` list_migrating_mons, `:1894–1928` DEBUG_MIGRATING_MONS getlin/atoi/makemon/migrate loop — LIVE: patchlevel.h:35-37 defines DEBUG unconditionally so config.h:620 defines it); `:1505–1610` (list_migrating_mons: `:1518–1525` here/nxtlv/other counts, `:1529–1531` pending pline, `:1532–1539` prmpt/xtra + ESC-hidden letters + yn_function, `:1540–1559` n + header, `:1562–1585` collect + qsort, `:1586–1600` `  <mon>[ named <name>][ to d:l][ at <x,y>]` rows, `:1603–1606` display FALSE / "None."); `:1484–1501` (migrsort_cmp: dnum, dlevel, m_id tie-break); callers cmd.c `:1764–1770` ("migratemons") + `:1990–1991` ("wizseenv"), both IFBURIED|AUTOCOMPLETE|WIZMODECMD, key `'\0'`.
**JS:** `js/wizcmds.js` `migrsort_cmp :1250`, `list_migrating_mons :1276` (module-local, like C staticfn), `wiz_migrate_mons :1418`, `wiz_show_seenv :1509` (+315); `js/getline.js` EXT_CMDS `wizseenv :871` + `migratemons :881` runnable entries (+20; dynamic import, wiz:true + autocomplete:true per the C flags). New static edges: do_name.js minimal_monnam + hacklib.js strsubst/depth (both `imports.mjs --can` SAFE); getline/teleport/makemon/const extensions on existing edges; dungeon.js + pager.js dynamic (file precedent).
**Change:** whole C bodies in C order with `:line` cites. `wiz_show_seenv` — Math.max/min centering (COLNO/4, COLNO/2 exact), u_at `@@`, `(seenv|0)&0xff` + lowercase `%02x` via toString(16).padStart(2,'0'), C-shaped trailing-space trim loop, lines[] + show_text_pages for display TRUE. `list_migrating_mons` — array walk in nmon-chain order (counts order-insensitive, collect re-sorted, so order unobservable), plur/strkitten inlined (no new clones — misc_stats/botl precedents), prmpt `cna q` + `\x1b`-xtra passed verbatim to live yn_function (JS hides post-ESC, getline.js:1709, and accepts it, :1761 — the `:1605` "None." arm stays reachable), marray collect + stable sort by module-local migrsort_cmp (m_id `|0`; live values small, C unsigned order kept), `  ${minimal_monnam}` + strsubst ` <0,0>` strip + has_mgivenname/MGIVENNAME + ` to d:l` + mtrack MIGR_EXACT_XY ` at <x,y>`.
**Verify:** `node scripts/verify.mjs --fn wiz_show_seenv` → PASS syntax (2 changed js files: js/getline.js js/wizcmds.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS. `--fn wiz_migrate_mons` → identical tail · VERIFY: PASS. Linkage smoke `node --input-type=module -e` importing js/wizcmds.js + js/getline.js → both new exports typeof function (no corpus/public session reaches wizard-only # commands, so import linkage + review are the invocation evidence).
**Named:** `:1603` display_nhwindow(win, FALSE) → blocking pager stands in for tty print-and-continue (Terminal has no scrollback vehicle; house NHW_TEXT idiom); generated `extcmdlist_data.js` "migratemons" desc keeps the #else string while DEBUG-live C registers "show migrating monsters and migrate N random ones" (cmd.c:1766) — extractor gap, generated files not hand-edited (Constitution §6.4); the stale `/* #seenv command */` C comment (:574) vs the registered "wizseenv" name (comment only, registered name rules).
**Next:** next Open — coverage row.
