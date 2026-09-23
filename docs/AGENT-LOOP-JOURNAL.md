# Agent loop journal
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
## 2026-09-23 — D-2778 `options.c` handler_number_pad + optfn_number_pad ported (number_pad option live)

**C locus:** `options.c` handler_number_pad `:5893–5950` (npchoices `:5898–5903`, create/start/zeroany `:5907–5909`, add_menu loop `:5910–5914` a_int i+1 + letter 'a'+i + gacc '0'+i + MENU_ITEMFLAGS_NONE, end_menu prompt `:5915`, PICK_ONE `:5916`, switch `:5917–5943`, reset `:5944`, number_pad `:5945`, free `:5946`, destroy `:5948`); optfn_number_pad `:2574–2645` (do_init `:2580–2581`, do_set `:2583–2620` with compat `:2584`, string_for_opt `:2585`, empty `:2586–2592`, negated `:2593–2595`, atoi `:2597–2615`, reset `:2618`, number_pad `:2619`, get_val/get_cnf_val `:2622–2639` with numpadmodes `:2623–2628` + indx `:2629–2632`, do_handler `:2641–2643`); init `reset_commands(TRUE)` `:7158` (all-FALSE defaults — JS falsy-unset is equivalent, no code); allopt row optlist.h `:535` (negateok-No: C parseoptions `:626` rejects `!number_pad` before the optfn).
**JS:** `js/options.js` `optfn_number_pad :1537`, `handler_number_pad :1622` (~190 insertions, single file, zero new cross-module edges — string_for_opt/bad_negation/allopt helpers/select_menu_pick_one all in-file).
**Change:** whole C bodies in C order with `:line` cites. `optfn_number_pad(optidx, req, negated, opts, _op, iflagsBag, optInitial)` — do_init ok; do_set recomputes op from opts via live `string_for_opt` (ignoring the passed op like C), compat `<= 10`, empty arm (`compat || negated || optInit` → `!negated`/0), negated-valued → live `bad_negation` + err, atoi via parseInt with NaN→err (C atoi 0 + `*op != '0'` test), mode map (`<= 0` → FALSE + `(mode < 0)`; `> 0` → TRUE/0 + bit 1 for 2|4 + bit 2 for 3|4); get_val/get_cnf_val derive the `:2629–2632` index from iflags via the reset sync mapping (`:3377`/`:3384`/`:3397`/`:3416` are pure functions of (num_pad, mode), so output-identical to the gc.Cmd read — switches to game.Cmd when reset_commands ports). `handler_number_pad` — PICK_ONE menu, prompt as header row, six rows with NO preselect (C passes MENU_ITEMFLAGS_NONE for all), pick → six-case switch.
**Verify:** `node scripts/verify.mjs --fn handler_number_pad` → PASS syntax (js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS. `--fn optfn_number_pad` → identical tail · VERIFY: PASS. Throwaway node spot-check (not committed — no tests/ dir in repo; the verify gates above are the evidence): 30/30 — all six valued modes + `-1`, six err cases keep prior (`5`/`-2`/`x`/blank, `0x`→(F,0) per the `*op=='0'` rule), negated-valued err, bare/negated/empty-compat arms under both opt_initial sides, all six get_val + get_cnf_val strings, fresh default `0=off`, rc valued/bare/negated/negated-valued/bad-value.
**Named:** `reset_commands(FALSE)` (`cmd.c:3344–3476`, own coverage row MISSING — cmdbind backup/restore, ylist/phone swapkeys, M('0') dotypeinv bind, dirchars backup, bind_key_fn movement binds, update_rest_on_space, extcmd_char) at `:2618`/`:5944`; `number_pad()` macro (`winprocs.h:161`, tty platform no-op, mark_synch precedent) at `:2619`/`:5945`; `config_error_add("Illegal %s parameter")` sink (file precedent); `nul_glyphinfo`/NO_COLOR menu glyph columns (helper paints text only).
**Next:** next Open — coverage row.
## 2026-09-23 — D-2777 `coloratt.c` closest_color + color_distance + alt_color_spec + color_attr_parse_str whole-body ports (256-color table, menu_headings parser)

**C locus:** `nethack-c/upstream/src/coloratt.c:978–994` (color_distance) + `:996–1021` (closest_color) + `:885–970` (color_256_definitions) + `:1110–1165` (alt_color_spec) + `:260–301` (color_attr_parse_str); hexdd `nethack-c/upstream/src/decl.c:74`; callers `:878` (set_map_customcolor), `:1085` (alternative_palette), options.c `:2204` (optfn_menu_headings).
**JS:** `js/options.js` `color_distance :2762`, `closest_color :2784`, `alt_color_spec :2819`, `color_attr_parse_str :2883` (module-local `color_256_definitions` + `hexdd` directly above).
**Change:** `js/options.js` (+256/−0) — table + hexdd + four exports in C order with `:line` cites. `color_256_definitions` module-local like C (240 entries, 16–255); `hexdd` module-local (`decl.c:74`); `color_distance` — `>>>` for the C uint32_t shifts, `| 0` for the non-negative `:988` division, `>> 8` on non-negative terms; `closest_color` — exact-match break + redmean-closest scan, `0x7fffffff` INT_MAX (no const.js INT_MAX), `{ v }` out-boxes (s_to_anything precedent), null boxes → FALSE no-write `:1015`; `alt_color_spec` — index-walked cp, `!!`-coerced `:1122–1126` escape tests (JS `&&` is not boolean), assignment-in-condition hidx mirroring `:1155` dp, no-else skip preserved, `""` returns -1 (C `strchr(dec,NUL)` matches then reads OOB — UB, cited); `color_attr_parse_str` — BUFSZ−1 slice, first-`&` split, FIXME retry-swapped arm `:279–283` verbatim, `{ attr, color }` written only on success. `ATR_NONE` added to the existing terminal.js import (0 = C wintype.h:128; weapon.js precedent) — zero new cross-module edges.
**Verify:** `node scripts/verify.mjs --fn closest_color` → VERIFY: PASS. Tail verbatim:
**Named:** callers set_map_customcolor / alternative_palette / optfn_menu_headings (none ported; CHANGE_COLOR compiled-out for the middle); `get_nhcolor_from_256_index` (table's other C reader); `""` strchr-NUL+OOB edge (returns -1); config_error_add message text (botl.js sink precedent — the live matchers sink it themselves).
**Next:** queue head `options.c` handler_number_pad.
## 2026-09-23 — D-2776 `sounds.c` add_sound_mapping + base_soundname_to_filename whole-body ports (USER_SOUNDS source-level body, measured sscanf emulation)

**C locus:** `nethack-c/upstream/src/sounds.c:1556–1626` + `:2084–2152`; sff enum `include/sndprocs.h:296–301`; `can_read_file` `nethack-c/upstream/src/cfgfiles.c:1442–1446`; regex engine `nethack-c/upstream/sys/share/posixregex.c` (`regex_error_desc` `:76`, `regex_free` `:108`); caller `nethack-c/upstream/src/cfgfiles.c:1233`.
**JS:** `js/sounds.js` (header note, sff consts, sounddir/soundmap state, can_read_file, sscanf emulation, two exports) + `js/options.js` (3 export keywords + notes). One new cross-module edge (sounds→options, SAFE).
**Change:** `js/sounds.js` (+261/−1) — both bodies in C order with `:line` cites. `add_sound_mapping`: module-local `sscanf_sound_mapping` tries the four `:1568–1577` patterns in `||` order, emulation measured against the toolchain libc (clang sscanf probe, 14 cases: literal MESG first; every format-space position takes zero+ isspace — `MESG"t"`, `"f"5`, `5-7` all match; `%*[\t ]` STRICT — zero spaces fails the directive; `%10[^\"]` greedy incl. spaces/tabs, >10 chars fails; trailing garbage ignored; `%d` sign+digits, `| 0` storage). First msgtyp char excludes whitespace — else P2/P3 misfire on P1-shaped lines with msgtyp=' ' where C returns 0 (C's space-directive eats it all with no backtrack; and no shorter take can match when the greedy take fails, so the regex is exactly equivalent). msgtyp "" on P1/P4 success (measured: failed P2/P3 wrote nothing).
**Verify:** `node scripts/verify.mjs --fn add_sound_mapping` → VERIFY: PASS. Tail verbatim:
**Named:** `can_read_file` (cfgfiles.c `:1442–1446` — access(2) unrepresentable under Rule #2; VFS holds no sound assets; always-false file-local, idx>=0 arm live); `raw_print` at `:1583`/`:1604`/`:1617`/`:1621` (pre-window stdout, no scored channel — display.js vraw_printf precedent; all four returns live); `regex_error_desc` (posixregex.c `:76` — no JS counterpart, options.js test_regex_pattern precedent); `sound_matches_message` (sounds.c `:1628` staticfn — sole soundmap reader, compiled out, own coverage row when emitted; list is write-only); contest-C SOUND/SOUNDDIR dispatch (no_sound_notified error arm `:1600–1605` — no JS read_config_file dispatch); the `:2122–2134` #if 0 Strcat block (compiled out in C).
**Next:** queue head `coloratt.c` closest_color.
## 2026-09-23 — D-2775 `options.c` handler_whatis_coord + optfn_whatis_coord ported (whatis_coord option live)

**C locus:** `options.c` handler_whatis_coord `:6205–6276`; optfn_whatis_coord `:4702–4745` (do_init `:4707`, do_set negated → NONE / `string_for_env_opt` + `lowc(*op)` in `{n,c,f,m,s}` else optn_err `:4710–4730`, get_val/get_cnf_val names `:4732–4739`, do_handler `:4741–4743`); init `:7190`; allopt row optlist.h `:868`.
**JS:** `js/options.js` `optfn_whatis_coord :1421`, `handler_whatis_coord :1465`, GPCOORDS_* import from const.js (~110 insertions).
**Change:** whole C bodies in C order with `:line` cites. `optfn_whatis_coord(optidx, req, negated, opts, _op, iflagsBag, optInitial)`; `handler_whatis_coord` — PICK_ONE menu, prompt as header row, five rows with selector = a_char = GPCOORDS_* and the current value preselected, blank + `map: upper-left: <1,0>, lower-right: <79,20>` (+ verbose tail), the non-tty `screen: row is offset…` line gated on `!windowport_tty()`, `screen: upper-left: [02,01], lower-right: [22,79]` (+ COL80ARG verbose tail), blank; pick → `iflags.getpos_coords = a_char`. `string_for_env_opt` gains an optional `initial` arg (defaults to `go.opt_initial`) so the rc parser, which does not set `go.opt_initial`, reaches the C opt_initial path.
**Verify:** `node scripts/verify.mjs --fn handler_whatis_coord` → PASS syntax (js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS. Parser spot-check: '' → n, `map` → m, `Screen` → s, `!whatis_coord` → n, `x` → err (n kept), `f` → f; get_val renders map/compass/full compass/screen/none.
**Named:** `config_error_add("Unknown %s parameter")` sink (file precedent); `nul_glyphinfo`/NO_COLOR menu glyph columns (helper paints text only); `pick_cnt > 1` disambiguation `:6270–6271` folded — the pick-one helper returns the single new pick, which is the entry C chooses.
**Next:** next Open — coverage row.
## 2026-09-23 — D-2774 `options.c` handler_menu_objsyms + optfn_menu_objsyms + set_menuobjsyms_flags ported (menu_objsyms option live)

**C locus:** `options.c` handler_menu_objsyms `:5794–5829`; optfn_menu_objsyms `:2224–2287` (do_init `:2230–2235`, do_set negated/boolean/digit/name-match arms `:2237–2277`, get_val `:2279–2281`, do_handler `:2283–2285`); set_menuobjsyms_flags `:7443–7451`; objsymvals `:273–280`; do_init pass `:7426–7430`; allopt row optlist.h `:451` (alias `use_menu_glyphs`).
**JS:** `js/options.js` `objsymvals :1197`, `set_menuobjsyms_flags :1215`, `optfn_menu_objsyms :1236`, `handler_menu_objsyms :1299` (~164 insertions).
**Change:** whole C bodies in C order with `:line` cites: `objsymvals` table; `set_menuobjsyms_flags(n, iflagsBag)` (bit 1 → menu_head_objsym, bits 2|4 → use_menu_glyphs); `optfn_menu_objsyms` — do_init 4, do_set (`!` → 0, valueless → `use_menu_glyphs` prefix ? 2 : 1, digit via atoi with `>= SIZE` → optn_err, else name loop with the `k >= 4` prefix length rule and the `one-or-the-other` alt for index 5, default 0), get_val/get_cnf_val name; `handler_menu_objsyms` — PICK_ONE menu with prompt as header, `%-12.12s%c%.60s` rows, selector `'0'+i`, gacc `*buf` (`gselector`), current value preselected, pick → `set_menuobjsyms_flags(a_int-1)`.
**Verify:** `node scripts/verify.mjs --fn handler_menu_objsyms` → PASS syntax (js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS. Parser spot-check: '' → 4, `menu_objsyms` → 1, `use_menu_glyphs` → 2, `!menu_objsyms` → 0, `both` → 3, `one-or-the-other`/`5` → 5, `9` → err (4 kept), `ent` → 0.
**Named:** `config_error_add("Illegal %s parameter")` sink (file precedent); `nul_glyphinfo`/NO_COLOR menu glyph columns (helper paints text only); `n > 1` two-pick disambiguation `:5822–5823` folded — the helper returns the single new pick, which is the non-preselected entry C chooses; readers of `use_menu_glyphs` (invent.js dash-slot) still named there.
**Next:** next Open — coverage row.
## 2026-09-23 — D-2773 `options.c` doset do_handler wired for msg_window / paranoid_confirmation / versinfo (+ recorder versinfo default)

**C locus:** `options.c` doset `:8933–8939` (`allopt[k].optfn(idx, do_handler, FALSE, empty_optstr, empty_optstr)`, `optn_ok` → `opt_set_in_config[k]`); do_handler arms `optfn_msg_window :2516–2518`, `optfn_paranoid_confirmation :3039–3041`, `optfn_versinfo :4511–4516` (+ `:4530` redraw); value column `doset_add_menu :9038–9042` get_val; `optfn_paranoid_confirmation` get_val/get_cnf_val `:3021–3037`. Default `flags.versinfo = have_branch ? 4 : 1` exists only in the **recorder** C (`nethack-c/recorder/src/options.c:7174` initoptions_init) — pinned upstream leaves it 0, which cannot produce the recorded `[1: number (5.0.0)]` (seed0007 O menu).
**JS:** `js/options.js` (~80 lines: `optfn_paranoid_confirmation_get_val :1244`, `doset_optfn_do_handler :1270`, `doset_compopt_get_val :1298`, rows `:3753/:3756/:3774`, loop `:3839`); `js/jsmain.js:125` (+ VI_* import).
**Change:** new async `doset_optfn_do_handler(name)` = the three do_handler arms in C order (versinfo: snapshot `vi`, await `handler_versinfo`, `'%s' %s %u.` changed-to / not-changed-still pline, `:4530` redraw gate); `doset_compopt_get_val` renders msg_window/versinfo via their live REQ_GET_VAL; new `optfn_paranoid_confirmation_get_val` (`:3021–3037`: argnames of set bits, BONES hidden unless wizard or get_cnf_val, "none" fallback); rows marked `handler: true`; handler loop `else` arm awaits the dispatch and marks `opt_set_in_config` on `OPTN_OK` (allopt idx == array position, checked). `js/jsmain.js` flags default `versinfo` per recorder `:7174` (`nomakedefs.git_branch` null → `VI_NUMBER`). Stale "doset calls directly (named)" doc comments on the three handlers/optfn_versinfo updated.
**Verify:** `node scripts/verify.mjs --fn handler_msg_window --reach-all --full` → PASS syntax (js/jsmain.js js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `optfn_paranoid_confirmation` do_set token parser `:2837–3020` (allopt row keeps optfn null; rc `paranoid_confirmation`/`prayconfirm` unparsed); `opt_set_in_config` marking for the pickup_types/perminv_mode handler arms.
**Next:** first Open — coverage row.
