# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-25 — D-2800 `dodown` Flying includes the flying steed

**C locus:** `nethack-c/upstream/include/youprop.h:253–255` `Flying`. `do.c:1206` ceiling hider. `do.c:1258` `u_locomotion("jump")`, which reads `Flying` at `hack.c:1827`. Same macro at `do.c:276` and `:280` (pool splash) and `do.c:1763` (ladder " along").
**JS:** `js/do.js` import `:154`. Local `u_locomotion :553` calls `Flying()` at `:555`. Ceiling hider `:3043`. Hole verb `:3100`. Pool `:829` and `:833`. Climb along `:1863`.
**Change:** Import `Flying` from `mhitu.js` and delete the local clone. Ceiling-hider, local `u_locomotion`, the pool splash, and the climb " along" test now use `(HFlying || EFlying || (usteed && is_flyer(usteed.data))) && !BFlying`, with the existing sticky `u.Flying` early true. No new import edge (`imports.mjs --can` already).
**Verify:** `node scripts/verify.mjs --fn dodown` → PASS syntax (1 changed js file: js/do.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `do.c:1776` descend `else if (Flying)` is still sticky `u.Flying` at `js/do.js:1887`. `js/hack.js:2058` `u_locomotion` still reads sticky `u.Levitation` / `u.Flying` (capitalize and `locomotion()` poly fallback already named).
**Next:** next Must-fix (`js/mkobj.js` `start_timer` stores `MELT_ICE_AWAY` as func_index 0, review 1753).
## 2026-09-25 — D-2799 `petattr_to_tty` maps wintype attrs onto the terminal bitfield

**C locus:** `nethack-c/upstream/include/wintype.h:128–134` (`ATR_NONE` 0, `ATR_BOLD` 1, `ATR_DIM` 2, `ATR_ITALIC` 3, `ATR_ULINE` 4, `ATR_BLINK` 5, `ATR_INVERSE` 7). `options.c:3163` stores `match_str2attr`'s value in `iflags.wc2_petattr`. Paint is `wintty.c:3928` `term_start_attr(iflags.wc2_petattr)` → `termcap.c:1339–1376` `s_atr2str`. `initoptions` `:7264` stores `ATR_INVERSE` when the field is unset.
**JS:** `js/display.js` `petattr_to_tty :311`, called from `mon_map_attr :330` and `glyph_tty_attr :343`.
**Change:** Map none → 0, bold → terminal `ATR_BOLD` (2), underline → `ATR_UNDERLINE` (4), inverse → `ATR_INVERSE` (1). Dim, italic, and blink return 0 so they are not passed through. An unset field still paints inverse (the `initoptions` default; that assignment is not a JS function).
**Verify:** `node scripts/verify.mjs --fn optfn_petattr` → PASS syntax (1 changed js file: js/display.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `s_atr2str` italic falls through to underline when `ZH` is empty, and blink falls through to bold when `MB` is empty (`termcap.c:1343–1364`). This terminal has no italic or blink bit, so those enums paint as 0.
**Next:** next Must-fix (`js/do.js` `dodown` local `Flying` drops the steed-flyer, review 1752).
## 2026-09-25 — Audit 0cf2f655d (reviews 1749–1757) + cadence 44/44.

Reviews audit D-2790..D-2798 against pinned C (csym bodies + callers,
sym.mjs, per-SHA `hidden-proxy verify --reach-all`). 1749/1750/1754/1755/1757
ACCEPT. 1751 QUALITY-RISK: `petattr_to_tty` paints wintype bold (1) as
terminal inverse. 1752 QUALITY-RISK: `dodown` local `Flying` drops the
steed. 1753 QUALITY-RISK: `start_timer` stores `MELT_ICE_AWAY` as
`ROT_ORGANIC` (0). 1756 QUALITY-RISK: `resists_poison_mm` is the
intrinsic bits only; C `resists_poison` is `Resists_Elem`. Every
re-measure was 0 blocked on the 12-row board, smoke REACH-OK, 0
REGRESSED. Cadence at `0cf2f655d`: public 44/44, Scr 11,405, RNG
792,838, speed `238+1.57/turn` (R² 0.781); held-out 12/44 (+0, last
scored 2026-09-25T19:01Z, values identical). `hidden-proxy score`
saw 12 private recordings, 12/12 PASS; `.cache/hidden/sessions` is
empty (941 recipes), so the 614/940 fortress was not re-run and no
PASS→FAIL row was opened. Rule #2 clean. Next: Must-fix `petattr_to_tty`.
## 2026-09-25 — D-2798 `zap.c` fracture_rock whole-body port

**C locus:** `nethack-c/upstream/src/zap.c:5536–5578` `fracture_rock`. Callees: `get_obj_location`, `costly_spot`, `in_rooms`, `billable`, `You`, `s_suffix`, `shkname`, `xname`, `breakobj`, `sokoban_guilt`, `rn1`, `weight`, `dealloc_oextra`, `obj_extract_self`, `place_object`, `does_block`, `unblock_point`, `vision_recalc`, `cansee`, `newsym`. The `#` comment says breakobj charges and does not destroy a fracturing boulder or statue.
**JS:** `js/dig.js` `fracture_rock :1846`. Helpers: `js/monmove.js` `m_can_break_boulder :1804`, `m_break_boulder :1817`.
**Change:** Restart of `fracture_rock` in C order, async because `You` and `breakobj` can reach `--More--`. Hero-caused breakage in a costly spot bills through `breakobj` before the type changes. `sokoban_guilt` still sees `BOULDER`.
**Verify:** `node scripts/verify.mjs --fn fracture_rock` → PASS syntax (10 changed js files: js/dig.js js/dothrow.js js/explode.js js/mklev.js js/mon.js js/monmove.js js/shk.js js/trap.js js/vault.js js/zap.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `poly_obj` shop-anger bill (`zap.c:1965–1986`) stays named at `js/zap.js:5255`. `move_special` `m_move_aggress` (`priest.c:108–118`) stays named at `js/shk.js:4253`.
**Next:** next Open — coverage row (`polyself.c` mbodypart). `find_ac` is parked Stale. Same-file `Cloak_off` and `Boots_on` remain later Open rows.
## 2026-09-25 — D-2797 `uhitm.c` mhitm_ad_drst whole-body port

**C locus:** `nethack-c/upstream/src/uhitm.c:3122–3165` `mhitm_ad_drst`. Callees: `mhitm_mgc_atk_negated` (FALSE), `rn2`, `Your`, `mpoisons_subj`, `resists_poison`, `pline_The`, `mon_nam`, `rn1`, `hitmsg`, `s_suffix`, `Monnam`, `poisoned`, `pmname`, `Mgender`, `mhitm_really_poison` (`:3104–3118`). The only C call is `mhitm_adtyping` `:4809–4811` (`AD_DRST`/`AD_DRDX`/`AD_DRCO`). That switch is reached from `damageum` (`uhitm.c:4854`), `mdamagem` (`mhitm.c:1059`), and `hitmu` (`mhitu.c:1191`).
**JS:** `js/mhitm.js` `mhitm_ad_drst :1860`, `mpoisons_subj_mm :1798`, `mdamagem` dispatch `:5195`.
**Change:** One exported `mhitm_ad_drst` in C order. The magic-cancellation gate runs first. youmonst attacker: `!rn2(8)`, then resist message or `!rn2(10)` deadly (`damage = mhp`) else `rn1(10, 6)`. youmonst defender: strength/dexterity/constitution switch, `hitmsg`, then `poisoned(..., 30, FALSE)`. Otherwise `!rn2(8)` calls `mhitm_really_poison`.
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_drst` → PASS syntax (3 changed js files: js/mhitm.js js/mhitu.js js/uhitm.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: no shared file changed) · VERIFY: PASS.
**Named:** `resists_poison_mm` still omits artifact and worn poison resistance (same gap as `js/zap.js` `resists_poison`). A youmonst defender is passed to `mhitm_mgc_atk_negated` as null, the existing hero-MC idiom.
**Next:** next Open — coverage row (`do_wear.c` find_ac). Seven measured coverage rows remain. `port-coverage.mjs --rows 8` head is the Stale never-re-pop set (newcham/getobj/yn_function/getdir/mon_arrive/checkfile/make_blinded/really_done); not re-queued.
## 2026-09-25 — D-2796 `mthrowu.c` thitu whole-body port

**C locus:** `nethack-c/upstream/src/mthrowu.c:75–155` `thitu`. Callees: `doname`, `mshot_xname`, `killer_xname`, `strncmpi` (three article prefixes, inlined), `obj_is_pname`, `the`, `an`, `rnd`, `pline`, `upstart`, `vtense`, `You`, `exclam`, `Acid_resistance`, `monstseesu`, `stone_missile`, `passes_rocks`, `potionhit`, `pline_The`, `exercise`, `monstunseesu`, `losehp`. `named` is the caller's original name pointer, taken before the null-name arm overwrites it.
**JS:** `js/mthrowu.js` `thitu :622` (`thitu_ci_prefix :575`, `thitu_blind :592`, `thitu_acid_resistance :599`, `thitu_passes_rocks :607`). `m_throw` copies `*objp` back at `:1350`.
**Change:** Restart of `thitu` in C order. A null name formats with `doname` when `quan > 1`, else `mshot_xname`, and the death reason is `killer_xname` with `KILLED_BY`. A caller-supplied name that starts with `the ` / `an ` / `a ` also uses `KILLED_BY`; otherwise `KILLED_BY_AN`.
**Verify:** `node scripts/verify.mjs --fn thitu` → PASS syntax (1 changed js file: js/mthrowu.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (verifier: no shared file changed) · VERIFY: PASS.
**Named:** `apply.c:3197–3205` is inside `#if 0` and is not a live caller. `panic` is a throw with the C string; there is no paniclog.
**Next:** next Open — coverage row (`uhitm.c` mhitm_ad_drst). `badman` is parked Stale. Eight measured coverage rows remain (band still full; no refill).
## 2026-09-25 — D-2795 `mkobj.c` mkcorpstat whole-body port

**C locus:** `nethack-c/upstream/src/mkobj.c:2067–2118` `mkcorpstat`. Callees: `impossible` (does not return), `mksobj` / `mksobj_at`, `rloco` (`:2082`, named), `save_mtraits`, `is_rider`, `monsndx`, `weight`, `special_corpse`, `obj_stop_timers`, `start_corpse_timeout`. `CORPSTAT_INIT` is `0x08`; `CORPSTAT_SPE_VAL` is `0x07`. The header comment says `<0,0>` but the test is `x == 0 && y == 0`.
**JS:** `js/mkobj.js` `mkcorpstat :3705` (`monsndx` from `js/mondata.js`).
**Change:** Restart of `mkcorpstat` in C order. A type other than `CORPSE` or `STATUE` calls `impossible` and continues. Both coordinates 0 use `mksobj` (the `rloco` call stays the D-2463 named omit).
**Verify:** `node scripts/verify.mjs --fn mkcorpstat` → PASS syntax (3 changed js files: js/mhitm.js js/mklev.js js/mkobj.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 12/12, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `rloco` at `mkobj.c:2082` (`x == 0 && y == 0`) stays uncalled. It is async (`js/teleport.js`) and `fixup_special` is sync (D-2463).
**Next:** next Open — coverage row (`objnam.c` badman). Ten measured coverage rows remain under that head (band still full; no refill).
## 2026-09-25 — Audit 315a5ae66..309d58ccc (reviews 1741–1748: 6 ACCEPT, 2 QUALITY-RISK → 2 Must-fix) + cadence 44/44.

Reviews audit D-2782..D-2789 against pinned C (csym bodies + callers,
sym.mjs, per-SHA hidden-proxy --reach-all). 1742 QUALITY-RISK: D-2783's
local `nmcpy` is `slice(0, n-1)` and keeps commas; C `options.c:6859–6871`
stops before `','` or NUL (`optfn_fruit` and `optfn_role`). 1745
QUALITY-RISK: D-2786's rc role/race/gender/align arms never set
`duplicateOpt`, so `parse_role_opt:7987` does not reject a positive
value after a same-phase `'!'` filter. 1741/1743/1744/1746/1747/1748
ACCEPT. Every re-measure 0 blocked, smoke REACH-OK, 0 REGRESSED (one
cached recording in the smoke spread). Cadence at `309d58ccc`: public
44/44, Scr 11,405, RNG 792,838, speed `240+1.54/turn` (R² 0.79);
held-out 12/44 (+0, last scored 2026-09-25T13:05Z, values identical).
`hidden-proxy score` on this tree saw 12 cached recordings, 12/12 PASS;
the committed 614/940 scoreboard is not on disk here, so it was left
unchanged and no PASS→FAIL row was opened. Rule #2 clean. Next: Must-fix
`nmcpy` comma stop.
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
