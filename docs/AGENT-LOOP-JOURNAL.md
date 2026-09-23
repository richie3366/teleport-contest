# Agent loop journal
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
## 2026-09-23 — D-2766 `wizcmds.c` wiz_smell: whole-body port (#wizsmell cursor-pick sniff loop, EXT_CMDS wired)

**C locus:** `nethack-c/upstream/src/wizcmds.c:885–939` (`wiz_smell`); caller `cmd.c:1994–1995` extcmdlist "wizsmell" row (`IFBURIED|AUTOCOMPLETE|WIZMODECMD`). Every `:line` cite verified by direct read of pinned C.
**JS:** `js/wizcmds.js` — export `wiz_smell:1177`; new static edges getpos.js `getpos`, makemon.js `usmellmon` (imports.mjs SAFE ×2 — hoisted functions), extended display.js/const.js/monsters.js/polyself.js edges (`You`, `glyph_at`, `glyph_is_monster`, `glyph_is_invisible_id`, `map_invisible`, `unmap_invisible`, `ECMD_CANCEL`, `ARM`, `u_at`, `olfaction`, `body_part`; mon.js `m_at` pre-existing). `js/getline.js` — EXT_CMDS `wizsmell:861` runnable entry (wiz + autocomplete per the C flags; dynamic import like the other wiz* rows).
**Change:** ported the whole body in C order into `js/wizcmds.js` (1:1 C home): hero-start cursor (`:893–894`); olfaction gate with ECMD_OK (`:895–898`); once-only cursor message (`:900`); do/while pick loop (`:901–937`) as `for (;;)`; prompt + `getpos(cc, TRUE, "a monster")` (`:902–903`); `ans < 0 || cc.x < 0` → ECMD_CANCEL (`:904–906`); hero-cell steed-data-when-mounted else youmonst+is_you (`:908–914`); m_at else-if with pre-nulled mptr for the `:917–918` else arm (m_at runs only when !u_at, as in C); glyph_at before the test (`:922`) with the `:919–921` buglet note (map/unmap take no turn); self ARM sniff (`:925–926`); usmellmon-FALSE no-smell pline (`:927–929`); map_invisible when !glyph_is_monster (`:930–931`); empty-pick message + unmap_invisible when glyph_is_invisible (`:932–936`). C `glyph_is_invisible(glyph)` (int version) → live `glyph_is_invisible_id` per the display.js site guidance; `You`/`pline` keep C `%s` via vpline.
**Verify:** `node scripts/verify.mjs --fn wiz_smell` → PASS syntax (2 files: getline.js wizcmds.js) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** none on this body — whole C body live; every callee live (brief 8/8 + `u_at`/`m_at`/`body_part`/`glyph_is_monster`/`glyph_is_invisible_id` resolved to live exports).
**Next:** none on this body — whole C body live; C is 54 lines so the ~90-line JS body is the complete port, not a thin handoff.
## 2026-09-23 — D-2765 `options.c` optfn_msg_window + 4 same-file rows: whole-body ports (msg_window/paranoid-confirm/symset/versinfo/warnings option functions)

**C locus:** `nethack-c/upstream/src/options.c` — `optfn_msg_window :2455–2520`, `handler_msg_window :5831–5890`, `handler_paranoid_confirmation :5952–6008`, `optfn_symset :4166–4236`, `handler_versinfo :6572–6617`, caller `optfn_versinfo :4471–4534`, `warning_opts :7520–7538` + `string_for_env_opt :6682–6690` + `rejectoption :6811–6820` + `assign_warnings :7540–7548`, caller `optfn_warnings :4681–4700`. Every `:line` cite verified by direct read of pinned C.
**JS:** `js/options.js` — exports `optfn_msg_window:1095`, `handler_msg_window:1150`, `handler_paranoid_confirmation:1197`, `optfn_symset:1251`, `handler_versinfo:1303`, `optfn_versinfo:1341`, `warning_opts:1395`, `assign_warnings:1431`, `optfn_warnings:1445`; locals `string_for_env_opt:1411`, `rejectoption:1422`, `allopt_name:1067`, `allopt_idx:1076`, `windowport_curses:667`; no new cross-module edges (PARANOID_*/VI_*/WARNCOUNT/def_warnsyms on the const.js edge, status_version on the botl.js edge).
**Change:** ported all bodies in C order into `js/options.js` (1:1 C home): `optfn_msg_window` empty-optstr negated→'s'/else-'f' (`:2477–2478`), negated-with-value bad_negation+err (`:2480–2482`), lowc-first-char s/c/f/r switch (`:2484–2497`), get_val word chain with the tty-dead curses 'r'-coercion kept as a condition (`:2504–2512`); `handler_msg_window` msgwind PICK_ONE via live select_menu_pick_one with the `:5867` prompt as header row (D-2762 precedent), `%-12.12s`/`%4s` formats, `*buf`-letter selectors, pick→store, chngd||verbose get_val+pline with `%.20s` slices (`:5878–5883`), tty-dead else pline (`:5887–5888`); `handler_paranoid_confirmation` paranoia-table PICK_ANY via live select_menu_pick_any with cancelValue null (C `:5994` i>=0: cancel keeps, finish-empty resets to 0), wizard-gated BONES skip (`:5967–5968`), `*argname`-letter selectors; `optfn_symset` do_init/get_val/get_cnf_val live (name + ", active" + ", handler=" from the C-mirror/gs homes), do_set name store with the file-I/O success arm named; `handler_versinfo` VI_NUMBER/NAME/BRANCH PICK_ANY with explicit 'n'/'g'/'b'+gacc selectors, RELEASED "(not applicable)" live (`:6596–6597`), newval OR + `&= 7` + nonzero guard (`:6608–6612`); `optfn_versinfo` do_set (negated→silenterr, op reassigned from string_for_opt, atoi + `& ~7` reject, unsigned store) + get_val `%u: name+branch+number (%.99s)` via live status_version + tail redraw gate (`:4530–4531`); `warning_opts` env-gate + escapes + PC-form translate + assign; `string_for_env_opt`/`rejectoption`/`assign_warnings` (gw.warnsyms seeded from def_warnsyms .ch per `:7200–7201`); `optfn_warnings` do_set dispatch. Tables `msgwind` (`:195–204`), `paranoia` (`:136–182` + `:180` sentinel, C-exact loop condition), `known_handling` (symbols.c `:376–384`). do_handler branches omitted-async per the optfn_perminv_mode precedent (C-sync menu/pline are async in JS; doset calls the exported handlers directly — named). Bare `OPTIONS=msg_window:` (empty value) now takes the C empty arm ('f') instead of keeping the old value — the only intentional behavior delta, C-correct.
**Verify:** `node scripts/verify.mjs --fn optfn_msg_window` → PASS syntax (1 file: options.js) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared options.js) · VERIFY: PASS. `hidden-proxy verify` ×6 (handler_paranoid_confirmation, optfn_symset, handler_versinfo, warning_opts, optfn_versinfo, optfn_warnings) → 0 blocked + smoke 24/24 REACH-OK each. Plus a 29-case node smoke (every rc arm, versinfo do_set/get arms, warnings bytes, assign nonzero-only, get_option_value wiring, in-game symset flags, no rc→game.go pollution) → 29/29.
**Named:** `config_error_add` sink (file precedent: 8 sites); symset file subsystem (`read_sym_file` files.c:2630 fopen — Rule #2, `clear_symsetentry`, `load_symset`, `switch_symbols`, `handler_symset` :6320→`do_symset` symbols.c:908 192L browser + glyphid cache wrap); swim 'm'-substitution (`cmd_from_func` cmd.c:3035 + `cmdname_from_func` cmd.c:3105 over unported cmdbinds — default-'m' path exact); `optfn_paranoid_confirmation` :2818 caller + doset compound dispatch for the 3 menu handlers (incl. the `optfn_versinfo :4514–4516` pline text); MICRO `rejectoption` arm; PREV_MSGS=0/curses + NH_DEVEL_STATUS "(not available)" compiled-out arms; PICK_ONE n>1 disambiguation (helper returns one pick); gw.warnsyms readers (pager look); stale unexported const.js:2896 known_handling (4 entries; C has 6); simple_opt_get_val symset display kept (name-based; handling-based get_val differs until the name→handling mapping lands).
**Next:** none on these bodies — all live arms ported; file-I/O/browser callees are own-row material (do_symset, optfn_paranoid_confirmation).
## 2026-09-23 — D-2763 `coloratt.c` add_menu_coloring: whole-body port (config MENUCOLOR line parse, quote-strip, match_* exports)

**C locus:** `nethack-c/upstream/src/coloratt.c:616–660` (`add_menu_coloring`). Every `:line` cite verified by direct read of pinned C.
**JS:** `js/options.js` — exports `add_menu_coloring`; file-local `mc_isspace`; `CLR_MAX` + `match_str2clr`/`match_str2attr` on existing const/botl edges; `add_menu_coloring_parsed` NULL-only guard. `js/botl.js` — `export` on `match_str2clr`/`match_str2attr`.
**Change:** ported the whole body in C order into `js/options.js` (home of the coloratt family): BUFSZ−1 copy (`:623-624`), first-'=' split with Malformed→FALSE (`:626-629`, sink named per file precedent), mungspace-then-first-'&' split (`:631-634`), color validated before the attr arm runs (`:636-645`, suppress FALSE / complain TRUE preserved), regexp half truncated at '=' unmungspaced (`:648-649`), quote-strip backing over ASCII isspace before matching the closer (`:650-658`, `mc_isspace` mirrors the `(uchar)` cast). Exported the two botl.js clones (verified arm-for-arm against C: fuzzy loop, digit+atoi tail, CLR_MAX/−1 rejects) and narrowed the parsed guard to NULL-only (empty pattern compiles match-everything like C; existing callers never pass '' — O-menu pre-filters via test_regex_pattern, basic_menu_colors passes color names).
**Verify:** `node scripts/verify.mjs --fn add_menu_coloring` → PASS syntax (2 files: botl.js options.js) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared options.js/botl.js) · VERIFY: PASS. Plus an 18-case node smoke (every arm incl. unbalanced/empty quotes, fuzzy/digit colors, bad color/attr rejects) → 18/18.
**Named:** `config_error_add("Malformed MENUCOLOR")` sink (msgtype_add precedent); `cnf_line_MENUCOLOR` caller (no JS read_config_file dispatch).
**Next:** none on this body — whole C body live; callees 4/5 live (mungspaces/match_str2clr/match_str2attr/add_menu_coloring_parsed) + `config_error_add` named sink per file precedent.
## 2026-09-23 — D-2762 `cmd.c` handler_rebind_keys: whole-body port (rebind menu + bind_key/count writers, doset wired)

**C locus:** `nethack-c/upstream/src/cmd.c:2407–2446` (`handler_rebind_keys`) + `:2290–2405` (`handler_rebind_keys_add`) + `:2207–2231` (`count_bind_keys`) + `:2661–2728` (`bind_key`) + `:2125–2155`/`:2157–2177` (`cmdbind_add`/`cmdbind_remove`). Every `:line` cite below was verified against pinned C by direct read (csym-counted drafts drifted by one in places — fixed before handoff).
**JS:** `js/cmd.js` — exports `count_bind_keys`, `bind_key`, `handler_rebind_keys`; file-locals `cmdbind_add`, `cmdbind_remove`, `handler_rebind_keys_add`; `get_changed_key_binds` returns `winLines`; imports extended (`CMD_PARAM`, `BUFSZ`, `show_text_pages` on existing edges; `config_error_add` from botl.js — same 98-module SCC, called only in bodies). `js/botl.js` — `export` on the `config_error_add` sink. `js/options.js` — cmd.js import extended; doset() 'bind keys' row val via `count_bind_keys()` (`:8336` get_val) + othrPicks dispatch arm (`:8340` do_handler). `scripts/rebind-keys.test.mjs` (new, 17 tests) + NULL-arm assertion update in `get-changed-key-binds.test.mjs`.
**Change:** ported all six bodies in C order: `handler_rebind_keys` redo PICK_ONE menu via live `select_menu_pick_one` (auto-letters ≡ tty_end_menu; `end_menu` prompts as header rows per the `handle_add_list_remove` precedent); item 3 drains the NULL arm via `show_text_pages` (count>0 ⟺ ≥1 line — same predicates). `_add`: keyfirst/`bindit` key reads (`& 0xff` uchar truncation, ESC 27), current-bind header, a_int −1 "nothing" row, extcmd rows minus MOVEMENTCMD/INTERNALCMD/CMD_NOT_AVAILABLE (a_int i+1), CMD_PARAM getlin + BUFSZ−1 Snprintf, prevcmd identity compare, Changed/Bound/failed plines. C's `Strcat` of `cmdstr` onto the uninitialized buffer (`:2363`/`:2379`, upstream wart) is read as assignment.
**Verify:** `node scripts/verify.mjs --fn handler_rebind_keys` → PASS syntax (3 files) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared cmd.js/options.js/botl.js) · VERIFY: PASS. Plus `node --test scripts/rebind-keys.test.mjs scripts/get-changed-key-binds.test.mjs` → 23/23 pass.
**Named:** `bind->param` store (overlay is name-only; CMD_PARAM display already named in `dokeylist.js` header); C key-0+param NULL-deref crash path (JS stays total); `commands_init`/`reset_commands` `cmdbind_add`/`_remove` callers (pre-existing equivalents); C `Strcat`-onto-uninit wart read as assignment.
**Next:** none on this body — whole C body live; every callee live (15/15: count/_add/get_changed/bind_key/cmdbind_add/cmdbind_remove/pline/pgetchar/getlin/mungspaces/key2txt/cmdbind_get/config_error_add/show_text_pages/select_menu_pick_one).
## 2026-09-23 — D-2761 `pager.c` waterbody_name: whole-body restart (C-order arms, live Is_qstart, 14 callers wired)

**C locus:** `nethack-c/upstream/src/pager.c:561–611` (`waterbody_name`); 14 code call sites: `do.c:59`, `hack.c:1914`, `insight.c:2046`, `objnam.c:3633`, `pager.c:634,647,773,1186`, `pickup.c:396`, `potion.c:2336`, `trap.c:5080,5178,6879,6971`, `zap.c:5256` (`hack.c:3129`, `pager.c:558,1153,1164,1178` are comments; `objnam.c:3683` reaches waterbody only via `ice_descr`).
**JS:** `js/hack.js` `waterbody_name` `:2024–2051`; `import { Is_qstart } from './quest.js'` `:108` (`imports.mjs --can` SAFE — hoisted fn, same 98-module SCC). All other callees on existing edges (isok, SURFACE_AT, Hallucination, hliquid, Is_medusa/juiblex/waterlevel).
**Change:** restarted the body in C order with per-arm `:line` cites: `:565` hallucinate before the `:567-568` drink guard; `:569` `ltyp` via SURFACE_AT (D-1103); `:571-574` molten lava; `:574-579` ice/frozen; `:579-582` pool of; `:582-600` moat (halluc deep, medusa shallow sea, juiblex swamp, samurai+qstart pond via live `Is_qstart(game.u?.uz)` + `(game.urole?.mnum | 0) === PM_SAMURAI`, else moat); `:600-604` waterwall (limitless water even hallucinating, else wall of); `:605-608` lavawall; `:610` unreachable water default. C static-buffer aliasing (`:558` use-or-copy) documented — JS returns a fresh string per call.
**Verify:** `node scripts/verify.mjs --fn waterbody_name` → PASS syntax (1 file `js/hack.js`) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared hack.js) · VERIFY: PASS.
**Named:** none new on this body — whole C body live; every callee live (isok/SURFACE_AT/Hallucination/hliquid/Is_medusa_level/Is_juiblex_level/Is_qstart/Is_waterlevel) or a documented no-op (static pooltype buffer → fresh strings). Caller-side follow-up (not this row): `js/readobjnam.js:498` ice-wish arm calls `waterbody_name` where C `objnam.c:3683` calls `ice_descr` (live `js/trap.js:2875`) — near/seen wished ice prints bare `Ice.` instead of `<rating> ice`; own objnam.c-caller row.
**Next:** `cmd.c` handler_rebind_keys (next Open row; queue holds 10, no refill). Stale park bundled: `objnam.c` fruit_from_name (Parked index; full 4-stage body live `js/objnam.js:1648`, 5 callers wired, 0 blocked; releaseobuf = obuf free, no JS body).
## 2026-09-23 — D-2760 `dog.c` dogfood: whole-body restart (rider/petrify/jelly/ghoul/silver/cube/metal arms)

**C locus:** `nethack-c/upstream/src/dog.c:995–1133` (`dogfood`); callers `dog.c:1197,1247` (tamedog), `dogmove.c:315,435,531,587,1221`, `dothrow.c:2268`, `monmove.c:1045` (eat.c:108 is a comment); callee loci `stale_egg` `obj.h:315–317`, `ismnum` LOW_PM/NUMMONS.
**JS:** `js/dogmove.js` `dogfood` `:194–347`; new consts GLOB_OF_GREEN_SLIME/CLOVE_OF_GARLIC/AMULET_OF_STRANGULATION/RIN_SLOW_DIGESTION/PM_GHOUL/PM_QUEEN_BEE/PM_PYROLISK/MAX_EGG_HATCH_TIME. Import edges (`imports.mjs --can` SAFE on the two new files, same-module adds elsewhere): monsters.js `flesh_petrifies/likes_fire/slimeproof/metallivorous/mon_hates_silver/resists_acid` (`resists_ston` already present), mkobj.js `peek_at_iced_corpse_age/is_organic/is_metallic/is_rustprone`, monmove.js `find_pmmonst`, objects.js `SILVER`, zap.js `resists_poison`, eat.js `polyfood`. `is_vampshifter` stays the existing makemon re-export; `stale_egg`/`ismnum` inlined (C macros).
**Change:** restarted the body in C order with per-arm `:line` cites: opoisoned + `resists_poison` head; quest-arti/obj_resists short-circuit; fx/fptr via LOW_PM/NUMMONS bounds (null = the NUMMONS entry, all predicates null-safe); rider TABU; petrify POISON (`flesh_petrifies` + `resists_ston`); killer-bee royal-jelly via live `find_pmmonst(PM_QUEEN_BEE)`; `!carni&&!herbi` → cursed?UNDEF:APPORT; starving (edog mhpmax_penalty) + mblind (`!mcansee && haseyes`); ghoul CORPSE/EGG/TABU (iced age, lizard/lichen exempt, `stale_egg` inlined as moves-age > 2*MAX_EGG_HATCH_TIME); inner otyp switch (meats; pyrolisk-egg `likes_fire`; CORPSE iced-age/acid/poison + polyfood `mtame>1` + vegan + cannibalism; slime-glob `slimeproof`; garlic undead/vampshifter; metallivorous TIN; APPLE; mblind CARROT; yeti BANANA; starving/SLIME_MOLD default); non-food `default:` (strangulation/slow-digestion TABU; silver TABU via `game.objects` oc_material; gelcube organic ACCFOOD; metallivore metal DOGFOOD/ACCFOOD with rust-monster rustprone gate + oerodeproof preference; uncursed non-ball/chain APPORT) with ROCK_CLASS skipping to UNDEF. `mptr==&mons[PM_X]` via the file's `mndx` idiom.
**Verify:** `node scripts/verify.mjs --fn dogfood` → PASS syntax (1 file `js/dogmove.js`) · PASS rule2 · note hidden 0 blocked (row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · VERIFY: PASS. Hot-path insurance: full `hidden-proxy score --jobs 8` → **501/540 PASS (92.8 %)** — identical to the 2026-09-23 audit baseline, 0 PASS→FAIL.
**Named:** none new — whole C body live; every callee live (brief 4/4: obj_resists/find_pmmonst/peek_at_iced_corpse_age/same_race + resists_poison/resists_ston/resists_acid/flesh_petrifies/likes_fire/slimeproof/metallivorous/mon_hates_silver/is_organic/is_metallic/is_rustprone/polyfood/carnivorous/herbivorous/vegan/acidic/poisonous/humanoid/is_undead/is_elf/is_rider/haseyes/is_vampshifter) or an inlined C macro (stale_egg, ismnum). JS-only `!obj → UNDEF` guard kept (C callers pass non-null).
**Next:** `objnam.c` fruit_from_name (next Open row; queue holds 7, no refill).
