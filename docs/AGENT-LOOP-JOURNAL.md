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
## 2026-09-23 — D-2771 `glyphs.c` customization entries: add_custom_nhcolor_entry + wizcustom_glyphids whole-body ports

**C locus:** `nethack-c/upstream/src/glyphs.c:484–528` (`add_custom_nhcolor_entry`) + `:736–747` (`find_matching_customization`) + `:418–432` (`find_glyphid_in_cache_by_glyphnum`, staticfn) + `:807–821` (`wizcustom_glyphids`); state `decl.h:857–860` (`gs.sym_customizations[NUM_GRAPHICS+1][custom_count]`), `sym.h:125–130` (`graphics_sets`: PRIMARYSET 0, ROGUESET 1, NUM_GRAPHICS 2), `sym.h:138–139` (`customization_types`), `sym.h:153–157` (content union). Callers: `glyphs.c:94` (`to_custom_symset_entry_callback`, unported), `wizcmds.c:1967` (`wiz_custom` #wizcustom, unported). Every `:line` cite verified by direct read of pinned C.
**JS:** `js/glyphs.js` — appended customization family (~120 lines) after `dump_all_glyphids`; single file, no new edges.
**Change:** `js/glyphs.js` — module-local `sym_customizations[3][5]` grid (BSS-zeroed shape) + `PRIMARYSET`/`ROGUESET`/`NUM_GRAPHICS`/`UNICODESET` + `CUSTOM_*` consts; exported `find_matching_customization` (strcmp≡`===`, `!== null` pointer check); exported `add_custom_nhcolor_entry` in C order (lazy gdc init, live find call, update-or-append via `details_end`, `count++`, return 1; `dupstr`≡String assign, `alloc`≡literal, `>>> 0` uint32; `:523–524` urep/ccolor union overlap folded into one ccolor record with cite); module-local `find_glyphid_in_cache_by_glyphnum` linear scan over the live cache (null id≡C 0); exported `wizcustom_glyphids` (guard, MAX_GLYPH loop, live scan, id gate, C order). No new imports (MAX_GLYPH already imported).
**Verify:** `node scripts/verify.mjs --fn add_custom_nhcolor_entry` → PASS syntax (1 file: glyphs.js) · PASS rule2 · note hidden (no session blocked; rows cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file) · VERIFY: PASS. `node scripts/verify.mjs --fn wizcustom_glyphids` → identical tail (smoke 24/24 → REACH-OK) · VERIFY: PASS.
**Named:** `wizcustom_callback` (`wizcmds.c:1987–2028`, own coverage row — reads the deferred glyphmap[]/reset_glyphmap table; call-site comment at the `:818` arm, polyself.js:1070/attrib.js:825 precedent); sole C callers unported (map-kept); `sym_customizations` saveload unported (transient, no scored reach).
**Next:** remaining named consumers (`glyphrep_to_custom_map_entries`, `glyphrep`, `match_glyph`, `to_custom_symset_entry_callback`, `shuffle_customizations`, `apply_customizations`, `add_custom_urep_entry`, `wizcustom_callback`) arrive as own coverage rows.
## 2026-09-23 — D-2770 `end.c` done_in_by: whole-body port (ghost arms + live You + uhitm STONING caller wired)

**C locus:** `nethack-c/upstream/src/end.c:185–344` (`done_in_by`); caller `nethack-c/upstream/src/uhitm.c:5930–5956` (`passive()` AD_STON arm inside `passive :5865`, not hmonas). Arms: `:195` You; `:196` mark_synch; `:201–205` G_UNIQ "the "+KILLED_BY; `:212–216` named-ghost "the "; `:217` monhealthdescr; `:218–221` minvis/distorted; `:223–255` imitator (mimicker mappearance reset `:255`); `:260–263` ghost; `:264–270` isshk; `:271–273` ispriest/isminion; `:274–282` pmname+mgivenname; `:284` name; `:288–316` multi_reason trim; `:326–340` ugrave_arise + genod reset; `:342` done. Every `:line` cite verified by direct read of pinned C.
**JS:** `js/end.js` — `done_in_by:1284` (+You import, 2 ghost arms, exact-omit cites); `js/uhitm.js` — `passive()` AD_STON `:2802` (rewrote 4-line stub, ~24 lines), doc line retires the omit.
**Change:** `js/end.js` — live `await You(...)` at `:1286` (output-identical: `You`=vpline('You '+fmt), `pline`=vpline); named-ghost "the "+KILLED_BY at `:1314` via mptrNdx (=== mptr, imitator arm has not run yet); "ghost of" at `:1351` via mptrNdx (C mptr reset to mtmp->data at `:255`; JS mptr never left it); mark_synch `:196` (win_mark_synch tty flush) named platform no-op; monhealthdescr `:217` exact-omit (C `#if 0`'d to `*outbuf='\0'`, pager.c:136-163 — verified, live js/pager.js twin agrees). `js/uhitm.js` — AD_STON arm at `:2802` in C order: `attk_protection(aatyp)` + AT_MAGC→W_ARMG override, 5-clause worn check (`u.uarmg/u.uwep/wep_was_destroyed/u.uarmf/u.uarmh/u.uarmc`), `!Stone_resistance && !(poly_when_stoned(youmonst.data, mvitals) && await polymon(STONE_GOLEM))` short-circuit, `done_in_by(mon, STONING)` + `M_ATTK_DEF_DIED` (gameover bails `malive|mhit` per file idiom — C longjmps; life-saved falls to C's return). Dynamic imports for polymon/done_in_by (death-path only, file convention); static adds: `attk_protection`, `poly_when_stoned`, `STONING`, `PM_STONE_GOLEM` const.
**Verify:** `node scripts/verify.mjs --fn done_in_by` → PASS syntax (2 files: end.js uhitm.js) · PASS rule2 · note hidden (no session blocked; row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file) · VERIFY: PASS. Plus `seed0030-ten-diverse-deaths` focused → PASS (RNG 105529/105529, screens 1953/1953) since the death path's first line changed.
**Named:** none on this body — whole C body live; every callee live or exact-omit (monhealthdescr C-`#if 0`, mark_synch platform, hardfought `#if 0` has_ebones arms dead in C, `s_suffix`/`the` appear only in C comments as don't-call notes).
**Next:** next coverage row.
## 2026-09-23 — D-2769 `insight.c` list_vanquished: whole-body port (sort menus, class + Rider headers)

**C locus:** `nethack-c/upstream/src/insight.c:2784–2949` (`list_vanquished`). Arms: `:2796–2811` force_sort/dumping head (`(void) set_vanq_order`, 'A'/'d'→'y'); `:2815–2820` totals; `:2834–2843` ask yn (ynaq vs ynq+`"\033a"` ESC-pad, defquery fixup); `:2848–2849` 'q' stopprint; `:2854–2855` 'a' re-sort with cancel-return; `:2857–2860` header modes; `:2862–2867` menu + qsort; `:2868–2886` per-row Rider/mlet/class-header; `:2888–2907` uniq/non-uniq lines; `:2910–2917` pfx; `:2923–2930` tally + display; `:2941–2943` empty pline; `:2944–2947` DUMPLOG putstr. Every `:line` cite verified by direct read of pinned C (167-line body map 2783–2949 cross-checked against the blocked-session owner line :2842).
**JS:** `js/insight.js` — `list_vanquished:1025` (restarted, ~155 lines with cites); `is_rider` joins the existing monsters.js edge (`:90`, no new edge); no other files touched.
**Change:** restarted the whole body in C order with per-arm `:line` cites: `(void) await set_vanq_order(true)` at `:2805`, cancel-return `if ((await set_vanq_order(true)) < 0) return` at `:2854–2855`; live class_header (`VANQ_MCLS_LTOH/HTOL && ntypes > 1`) with the `:2873–2886` Rider/`special_hdr`/`prev_mlet` machine over live `is_rider` + `MLET_EXPLAIN`/`upstart` (plain lines — text-menu primitive carries no per-line attr, list_genocided precedent); `++pfx` at `:2914–2915`; explicit yn 4th-arg `true` (`:2842–2843`); `prev_mlet = 0` is exact as-is (S_ANT is 1, defsym.h — verified, so the first header always prints in both); strncmpi boolean-clone pfx chain keeps C's `!strncmpi ? 0 :` sense (verified, not inverted).
**Verify:** `node scripts/verify.mjs --fn list_vanquished` → PASS syntax (1 file: insight.js) · PASS rule2 · hidden NO MOVEMENT (1 unchanged: scen-wish-Tourist-92067 step 224 — C/J toplines identical `Do you want an account… [ynaq] (n)`, RNG 5854/5854, first diff map row 4 col 28 `Z` vs `d`; the function draws no map and its output matches, so the session cannot move from this port — heuristic owner, phase-2 writer) · PASS reach (no RNG-tagged reach; smoke 24/24 → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file) · VERIFY: FAIL (hidden only; all fortress gates pass).
**Named:** single-type yn `"ynq\033a"` ESC-pad simplified to 'ynq' (list_genocided precedent); heading ATR (ATR_NONE vs menu_headings — plain lines, same precedent); DUMPLOG-only `putstr(0,…)` "No creatures were vanquished." (`:2944–2947` — compiled out in pinned config.h, D-1776); `vanqsort_cmp` MCLS_* arms still fall back to mndx order (pre-existing stub — class runs follow mndx order in those modes); `end.c:607` dump_everything caller (unported); C's commented-out Hallucination partridge (`:2919–2922`, dead).
**Next:** `vanqsort_cmp` MCLS arms as a future coverage row; scen-wish-Tourist-92067's row-4 glyph writer is phase-2 (recipe wished potion of hallucination + genesis Nazgul — INFERRED hallucinated-glyph display difference; MEASURED: prompt/RNG identical, map-only diff).
## 2026-09-23 — D-2768 `pickup.c` reverse_loot: whole-body port (confused #loot misfire, doloot_core Confusion arm wired)

**C locus:** `nethack-c/upstream/src/pickup.c:2350–2426` (`reverse_loot`, staticfn); sole C caller `pickup.c:2203` (`doloot_core`, `if (rn2(6) && reverse_loot())`). Arms: `:2359–2369` !rn2(3) old-loot prinv (1/(n+1) per object, FALSE off the end); `:2371–2380` first COIN_CLASS + `(rnd(5)*quan+4)/5` split; `:2386` unwear quivered gold; `:2389–2393` off-throne dropx + loot-here pline; `:2396–2407` throne coffers scan (spe == 2 break else nearest CHEST on fobj); `:2409–2420` thank + wizard-lock; `:2421–2428` exchequer makemon (looted gate short-circuits before courtmon RNG); `:2429–2431` "You drop …" + dropx. Every `:line` cite verified by direct read of pinned C.
**JS:** `js/pickup.js` — local `reverse_loot:4755`; caller wire `doloot_core:4651`; consts `CHEST:175`, `SPE_WIZARD_LOCK:189`; extended same-module edges (mkobj `g_at`/`add_to_minv`, display `verbalize`, const `T_LOOTED`/`NO_MM_FLAGS`, do `dropx`, lock `boxlock`, steal `remove_worn_item`, hacklib `dist2`); new static edges mklev.js `courtmon` + sndprocs.js `SetVoice` (imports.mjs SAFE — hoisted fn / no cycle; load smoke passes).
**Change:** ported the whole body in C order into `js/pickup.js` (1:1 C home, module-local like C staticfn and the `doloot_core` precedent): `!rn2(3)` + inv_cnt(true) walk of the invlet-sorted invent array (C nobj order — both sides reorder_invent) with `--n` per object and `prinv('You find old loot:', otmp, 0)`; coin scan + `Math.floor((rnd(5)*quan+4)/5)` split-or-keep + break; `await remove_worn_item(goldob, false)`; `IS_THRONE(lev?.typ)` split; off-throne `await dropx` + `g_at` pline; throne `game.fobj` nobj scan with `(spe|0) === 2` break and `dist2` nearest (x/y are u.ux/u.uy); coffers `SetVoice(null, 0, 80, 0)` + verbalize + freeinv + add_to_container + owt/cknown + `{ otyp: SPE_WIZARD_LOCK }` boxdummy (cg.zeroobj + otyp; boxlock reads otyp only) when `!olocked`; exchequer `else if ((lev?.looted|0) !== T_LOOTED && (mon = makemon(courtmon(), x, y, NO_MM_FLAGS)))` with freeinv + add_to_minv + pline + `!rn2(10)` T_LOOTED; final else `You('drop %s.', doname(goldob))` + dropx. Caller wired in `doloot_core`: `if (doloot_Confusion()) { if (rn2(6) && (await reverse_loot())) return ECMD_TIME; if (rn2(2)) { pline('Being confused…'); return ECMD_TIME; } }` (repo `HConfusion || Confusion` idiom, same predicate the lootmon arm uses).
**Verify:** `node scripts/verify.mjs --fn reverse_loot` → PASS syntax (1 file: pickup.js) · PASS rule2 · note hidden (no session blocked; row cited 0 blocks) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file) · VERIFY: PASS. Plus full `frozen/ps_test_runner.mjs sessions` → 44/44 (confused-loot caller arm is a behavior delta, so the fortress was re-run explicitly).
**Named:** none on this body — whole C body live; every callee live (brief 18/18 + `dist2`/`SetVoice`/`IS_THRONE`/`T_LOOTED`/`NO_MM_FLAGS` resolved to live exports; `CHEST`/`SPE_WIZARD_LOCK` are otyp consts per the file's `objectNames.indexOf` pattern).
**Next:** none on this body — C is 76 lines so the ~105-line JS body + 9-line caller wire is the complete port, not a thin handoff.
## 2026-09-23 — D-2767 `uhitm.c` mhitm_ad_legs uhitm arm + damageum caller wired (poly'd-xan hero attacks)

**C locus:** `nethack-c/upstream/src/uhitm.c:4425–4489` (`mhitm_ad_legs`); uhitm arm `:4432–4444` (dead `#if 0` ucancelled arm, then `mhitm_ad_phys` + done check). The phys call lands in the phys uhitm arm `:3988–4024` (shade zero, `+= specialdmg`, AT_WEAP zero, KICK/ClAW/TUCH/HUGS thick_skinned halve + udaminc rings). Dispatch `mhitm_adtyping :4781–4832` has three C callers: `uhitm.c:4854` (`damageum`), `mhitu.c:1191`, `mhitm.c:1059`.
**JS:** `js/uhitm.js` AD_LEGS const (`:182`), `damageum_adtyping` AD_LEGS arm (`:2465`); `js/mhitm.js` doc lines (`:1689`, `:4866`).
**Change:** `js/uhitm.js` only for behavior — new `const AD_LEGS = 17` (monattk.h:59) + new `damageum_adtyping` AD_LEGS arm calling live same-file `damageum_ad_phys(mdef, mattk, mhm)` (the `:3988–4024` port; sync, no await, like the AD_PHYS arm; done propagates via mhm and `damageum` already checks it per C `:4856–4858`). No new import (same-file local, no cycle). Acid precedent: the shared-fn docs now point at the dispatch row.
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_legs` → PASS syntax (2 files: mhitm.js uhitm.js) · PASS rule2 · note hidden (no session blocked) · PASS reach (13 baseline-PASS reach, 13 run, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file) · VERIFY: PASS.
**Named:** poly `body_part` (pre-existing D-0928 #1131 name, map keeps it); `damageum_ad_phys` shade `impossible("bad shade attack function flow?")` (pre-existing gap in that live callee, not this arm).
**Next:** next coverage row.
