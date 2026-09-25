# Agent loop journal
## 2026-09-24 — Audit 47eba199b (review 1740: ACCEPT) + cadence 44/44.

Review 1740 audits D-2781 against pinned C. The four
`doset_compound_via_getlin` hasHandler arms now keep the handler
result and mark `opt_set_in_config` on OPTN_OK. allopt `idx` equals
the array slot (0 mismatches / 217), so the flag is the slot
`all_options_strbuf` reads. Each handler's only returns are
`optn_ok`, including cancel. Re-measure: 0 blocked, smoke 24/24
REACH-OK, 0 REGRESSED. Cadence at `47eba199b`: public 44/44, Scr
11,405, RNG 792,838, speed 76+0.46 (R² 0.79); held-out 12/44 (+0,
last scored 2026-09-24T13:10Z, values identical); corpus 501/540,
0 PASS→FAIL. Rule #2 clean. Next: Must-fix menu_objsyms `stripped`.
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
## 2026-09-25 — D-2788 `options.c` optfn_disclose whole-body port

**C locus:** `nethack-c/upstream/src/options.c:1442–1560` `optfn_disclose` (NHOPTC, optlist.h `:284`). do_init → optn_ok. do_set → `string_for_opt` (`:6665`); a value plus negation is `bad_negation` + optn_err; empty / `all` / `none` fills every `flags.end_disclose[]` slot (`!` or `none` → `DISCLOSE_NO_WITHOUT_PROMPT`, else `DISCLOSE_PROMPT_DEFAULT_YES`); otherwise a prefix walk (`k`→`v`, `d`→`o`, special prefixes coerced off `v`/`g`). get_val and get_cnf_val append mode+letter via `strkitten` (`hacklib.c:275`). do_handler → `handler_disclose` (`:5674–5777`).
**JS:** `js/options.js` `optfn_disclose :264`, `handler_disclose :353`. `js/hacklib.js` `strkitten :171`. allopt `optfn` idx 45 `:5742`.
**Change:** `optfn_disclose` and `handler_disclose` in `js/options.js` in C order with `:line` cites. Unspecified categories stay as they are (`'n'` when the string is missing, matching `initoptions` `:7210–7211`). `strkitten` is the one live export in `js/hacklib.js`. do_handler is async because the menus await input, split into `doset_optfn_do_handler` the way `optfn_msg_window` is.
**Verify:** `node scripts/verify.mjs --fn optfn_disclose` → PASS syntax (2 changed js files: js/hacklib.js js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `config_error_add` and `bad_negation` sinks (no-op). `handler_disclose` `n > 1` second pick (`:5769–5770`) folded into `select_menu_pick_one`.
**Next:** next Open — coverage row (`coloratt.c` basic_menu_colors).
## 2026-09-25 — D-2787 caller cite `rcfile()` is `js/cfgfiles.js:966`

**Change:** the divergence-log caller line pointed at `:964` (`set_ignore_errors_on_unmatched`). `rcfile()` is `:966`. No `js/` change. Queue row already archived; not popped.
**Verify:** `node scripts/verify.mjs --fn rcfile_interface_options` → PASS syntax 0 · PASS rule2 · note hidden (queue row cited callers 0, not N corpus blocks) · PASS reach 24/24 REACH-OK · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full · VERIFY: PASS.
**Next:** next Open — coverage row (`options.c` optfn_disclose).
## 2026-09-25 — D-2787 `cfgfiles.c` rcfile_interface_options whole-body port (rc parser)

**C locus:** `nethack-c/upstream/src/cfgfiles.c:1960–1976` `rcfile_interface_options`. Same commit: `rcfile :1892–1957`, `read_config_file :1623–1647`, `parse_conf_file :1843–1860` (VFS text), `parse_conf_buf :1692–1807`, `parse_conf_str :1809–1837`, `cnf_parser_init/done`, `parse_config_line :1388–1438`, `config_error_init :1469–1490`, `config_error_nextline :1492–1512`, `config_erradd :1543–1589`, `config_error_done :1591–1621`, heed/disregard config lines `:1978–1995`, and `options.c` `allopt_array_init :7404–7433` plus heed/disregard options `:10182–10211`.
**JS:** `js/cfgfiles.js` `config_error_init :217`, `config_error_done :291`, `parse_config_line :686`, `parse_conf_str :827`, `read_config_file :881`, `rcfile :899`, `rcfile_interface_options :956`. `js/options.js` `heed_all_options :6087`, `allopt_array_init :6113` (disregard/heed-this sit beside heed-all).
**Change:** the sequence and the parser in `js/cfgfiles.js` in C order, UNIX `fopen_config_file` via `vfsReadFile`, `config_line_stmt` table with live handlers for OPTIONS/NAME/ROLE/pet names/MSGTYPE/MENUCOLOR/HILITE_STATUS/SYMBOLS/ROGUESYMBOLS/WIZKIT and the transcribed sysconf validators. Heed/disregard and `allopt_array_init` live in `js/options.js`. Not called from startup (`initoptions_init` / `initoptions_finish` are not JS functions).
**Verify:** `node scripts/verify.mjs --fn rcfile_interface_options` → PASS syntax (2 changed js files: js/cfgfiles.js js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `initoptions_init` / `initoptions_finish` (startup does not call `rcfile`). `nhlua.c:669`.
**Next:** next Open — coverage row (`options.c` optfn_disclose).
## 2026-09-25 — D-2786 `options.c` optfn_gender whole-body port (gender/race/role/alignment)

**C locus:** `nethack-c/upstream/src/options.c:1777–1812` `optfn_gender` (NHOPTC, optlist.h `:132`). Same envelope: `optfn_alignment` `:885–919`, `optfn_race` `:3507–3542`, `optfn_role` `:3589–3624`. do_init → optn_ok. do_set → `parse_role_opt` (`:7904–8016`); `*op == '!'` keeps the filter; else `str2*` into `flags.init*`, unknown → `config_error_add` + optn_err. Gender also sets `flags.female`. Race stores `gp.pl_race = *op`. Role `nmcpy`s `pl_character`. Then `saveoptstr` of `rolestring` (`:72–73`). get_val is `rolestring`; get_cnf_val is `get_cnf_role_opt` (`:8019–8033`) or the literal `"none"`.
**JS:** `js/options.js` `rolestring :3863`, `opt2roleopt :3876`, `getoptstr :3894`, `saveoptstr :3918`, `get_cnf_role_opt :3936`, `parse_role_opt :3963`, `optfn_gender :4047`, `optfn_race :4086`, `optfn_role :4126`, `optfn_alignment :4164`. `js/player_selection.js` `clearrolefilter :79`, `setrolefilter :94`, `rolefilterstring :120`. allopt `optfn` idx 3–6 `:5479–5485`.
**Change:** the four optfns plus `parse_role_opt`, `saveoptstr`, `getoptstr`, `opt2roleopt`, `get_cnf_role_opt`, and `rolestring` in `js/options.js`, in C order with `:line` cites. `rolefilterstring` and the existing filter mutators are exported from `js/player_selection.js` (one `rfilter`, not a second clone). `string_for_env_opt` / `mungspaces` / `str2*` / `config_error_add` / `nmcpy` are the live exports.
**Verify:** `node scripts/verify.mjs --fn optfn_gender` → PASS syntax (2 changed js files: js/options.js js/player_selection.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `config_error_add` message text (existing no-op sink). `complain_about_duplicate` message text (existing no-op). roleoptvals save/restore (`options.c` freeroleoptvals / save-file pair) is not a callee of these optfns.
**Next:** next Open — coverage row (`cfgfiles.c` rcfile_interface_options).
## 2026-09-25 — D-2785 `options.c` optfn_soundlib whole-body port (soundlib option live)

**C locus:** `nethack-c/upstream/src/options.c:3824–3860` (staticfn; NHOPTC wires `&optfn_soundlib`, optlist.h `:693`, has_handler No, negateok No, set_gameview). do_init → optn_ok. do_set: `string_for_env_opt` (config only); empty → optn_err; else `get_soundlib_name` (unused buf), `soundlib_id_from_opt`, store the id, `assign_soundlib` rewrites `gc.chosen_soundlib` from the table. get_val and get_cnf_val Sprintf the active library name. Any other req → optn_ok. Callees `sounds.c:1797–1805`, `:1863–1880`, `:1882–1895`. Contest `soundlib_choices` is nosound only (`:1726–1776`, no `SND_LIB_*`).
**JS:** `js/options.js` `assign_soundlib :3685`, `get_soundlib_name :3701`, `soundlib_id_from_opt :3722`, `optfn_soundlib :3748`. allopt row `optfn: optfn_soundlib` `:5375`.
**Change:** restart as `optfn_soundlib` in C order with `:line` cites. `string_for_env_opt` is the existing options.js local (not cloned). The three sounds.c callees and the nosound-only table live in `js/options.js` because `js/sounds.js` already imports this module.
**Verify:** `node scripts/verify.mjs --fn optfn_soundlib` → PASS syntax (1 changed js file: js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `activate_chosen_soundlib` (`sounds.c:1778–1795`; already named at `allmain.c:703` — chosen id is not switched into `active_soundlib`). unixmain `assign_soundlib` compiled out. `#if 0` `choose_soundlib`.
**Next:** next Open — coverage row (`optfn_gender`).
