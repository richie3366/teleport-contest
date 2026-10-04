# Review 2357 — e2943671c — batch display/end/objnam/do_name/getpos/rumors/options/mthrowu (D-3403)

- SHA: `e2943671c` — "batch @7a3ae7a92: display/end/objnam/do_name/getpos/rumors/options/mthrowu remainder (100 fns, 0 left open) (D-3403)."
- D-entry: D-3403. Diff: 10 js files, +561/−391 (options.js 640 ins dominates); ledger + journal + index + scoreboard.
- Manifest check: reproduced `ledger.mjs batch` in a worktree at base
  `7a3ae7a92`: "100 function(s) in display/end/objnam/do_name/getpos/
  rumors/options/mthrowu — open 0 · partial 45 · recheck 55" — fn set
  diff vs `d like '%D-3403%'` rows is EMPTY (MANIFEST-MATCH). No overage,
  nothing Left open, no Must-fix bundled.
- Fixed sample (19): hot-12 `really_done safe_qbuf getpos_help thrwmu
  outoracle init_CapMons rndghostname oname getpos corpse_xname
  rnd_otyp_by_wpnskill rnd_otyp_by_namedesc`; random-4
  `complain_about_duplicate noit_Monnam maybereleaseobuf
  enhance_menu_text`; audited-3 `safe_oname string_for_opt free_CapMons`.
  All D-3403-most-recent → HEAD == SHA, no pinning needed.

## Intent vs deliverable

Promise: 100 manifest fns; minimal_xname rewires (pickup clones + pray
inline retired); eatcorpse tainted arm; m_useupall obfree; getpos 4 arms;
config-error sinks; doset getlin/help/rerun; option-menu prompt style +
`*` preselects; 3 paste-error omits dropped.

Diff actually adds: exactly that — objnam rewires (ysimple/simpleonames/
actualoname → live minimal_xname), pickup 4-clone deletion → objnam
aliases, pray actualoname, eatcorpse tainted (maybe_cannibal + Sick +
rn1 + make_sick), m_useupall obfree, thrwmu rogue-gate removal, getpos
entry/cmdq/G-prefix/mouse/ESC-10/rushrun arms, getrumor couldnt_open_file,
rnd_otyp_by_namedesc empty-guard + oc_uname arm, 6 menu prompt styles,
pick_any `*`/`+` marks + page reset, doset rerun/getlin/help/
preference_update, parseoptions ×5 + perminv ×3 + illegal-key ×2 sinks,
symset routing, display_file export. Promise == deliverable.

`sym.mjs` on deleted/re-pointed symbols:

```text
simpleonames     js/objnam.js:2909   sync   (+1 pre-existing iactions local)
thesimpleoname   js/objnam.js:3007   sync
ysimple_name     js/objnam.js:3016   sync
Ysimple_name2    js/objnam.js:3024   sync   (+1 pre-existing do_name local)
minimal_xname    js/objnam.js:2934   sync
actualoname      js/objnam.js:2967   sync
obfree           js/shk.js:4117   sync
```

Pickup's 4 locals verified gone; call sites use the aliased live imports
(`ysimple_name_objnam` etc.). Remaining iactions/do_name locals are
pre-existing, documented as staying.

## Inventory

Bullet status | ledger JS home | C range (100 entries):

```text
show_glyph | audited | js/display.js 4 parts | C display.c:1877-2072
really_done | audited | js/end.js | C end.c:1130-1590
maybereleaseobuf | ported | js/objnam.js:4058 | C objnam.c:167-198
fruitname | audited | js/potion.js | C objnam.c:414-427
corpse_xname | ported | js/objnam.js:1261 | C objnam.c:1824-1920
ysimple_name | ported | js/objnam.js | C objnam.c:2391-2398
simpleonames | ported | js/objnam.js | C objnam.c:2428-2442
actualoname | ported | js/objnam.js | C objnam.c:2490-2498
vtense | audited | js/objnam.js | C objnam.c:2563-2653
singplur_lookup | partial | js/objnam.js 2 parts | C objnam.c:2708-2779
rnd_otyp_by_wpnskill | ported | js/readobjnam.js:1903 local | C objnam.c:3432-3452
rnd_otyp_by_namedesc | ported | js/readobjnam.js:358 | C objnam.c:3455-3529
readobjnam_preparse | ported | js/readobjnam.js | C objnam.c:3966-4175
readobjnam_postparse2 | ported | js/readobjnam.js | C objnam.c:4666-4724
readobjnam_postparse3 | ported | js/readobjnam.js | C objnam.c:4727-4899
armor_simple_name | audited | js/do_wear.js | C objnam.c:5435-5468
cloak_simple_name | audited | js/do_wear.js | C objnam.c:5492-5509
safe_qbuf | audited | js/objnam.js:3125 | C objnam.c:5624-5698
free_oname | audited | js/do_name.js | C do_name.c:81-87
safe_oname | audited | js/do_name.js | C do_name.c:95-100
oname | partial | js/do_name.js:1318 | C do_name.c:372-426
rndghostname | audited | js/makemon.js:432 local | C do_name.c:772-776
noit_Monnam | audited | js/do_name.js:1306 | C do_name.c:1083-1089
YMonnam/Amonnam/bogon_is_pname | audited | js/do_name.js | C do_name.c:1133-1420
mapxy_valid/getpos_getvalids_selection/getpos_help/gloc_filter_done | audited | js/getpos.js | C getpos.c:94-419
getpos | partial | js/getpos.js:1328 | C getpos.c:771-1167
unpadline/get_rnd_text | audited | js/rumors.js | C rumors.c:67-526
getrumor | ported | js/rumors.js | C rumors.c:117-191
outoracle | audited | js/rumors.js:465 | C rumors.c:640-693
init_CapMons | audited | js/objnam.js:1552 local | C rumors.c:829-935
free_CapMons | audited | js/objnam.js:1537 | C rumors.c:939-953
parseoptions | partial | js/options.js | C options.c:489-691
optfn_alignment/align_message/align_status/altkeyhandling/DECgraphics | ported/ported/ported/audited/audited | js/options.js | C options.c:885-1439
optfn_disclose/fruit/gender | ported | js/options.js | C options.c:1442-1812
shared_menu_optfn | partial | js/options.js | C options.c:2052-2074
optfn_menustyle/paranoid_confirmation/perminv_mode/pickup_burden | ported | js/options.js | C options.c:2320-3305
optfn_pickup_types | audited | js/options.js | C options.c:3308-3401
optfn_race/roguesymset/role/sortdiscoveries/sortvanquished/whatis_filter/windowborders | ported | js/options.js | C options.c:3507-4853
pfxfn_cond_ | ported | js/options.js | C options.c:4994-5036
can_set_perm_invent | partial | js/options.js | C options.c:5488-5527
handler_autounlock/menu_objsyms/sortloot/whatis_coord/menu_colors/versinfo | ported | js/options.js | C options.c:5624-6617
handler_symset | audited | js/options.js | C options.c:6321-6328
string_for_opt/bad_negation/complain_about_duplicate | audited | js/options.js | C options.c:6665-6809
nmcpy/txt2key/initoptions/initoptions_init/initoptions_finish | audited | js/options.js | C options.c:6861-7384
msgtype2name/msgtype_count/test_regex_pattern | audited | js/options.js | C options.c:7690-7901
illegal_menu_cmd_key | ported | js/options.js | C options.c:8037-8054
oc_to_str/get_menu_cmd_key/map_menu_cmd/longest_option_name | audited | js/options.js | C options.c:8062-8532
doset | partial | js/options.js | C options.c:8758-8975
count_apes/free_autopickup_exceptions/all_options_apes | audited | js/options.js | C options.c:9191-9654
is_wc_option/is_wc2_option/wc2_supported/wc_set_font_name/options_free_window_colors | audited | js/options.js | C options.c:9899-10127
enhance_menu_text/heed_all_options/disregard_all_options | audited | js/options.js | C options.c:10155-10198
m_has_launcher_and_ammo/breathwep_name | audited | js/mthrowu.js | C mthrowu.c:58-1089
m_useupall | ported | js/mthrowu.js | C mthrowu.c:1154-1158
thrwmu | audited | js/mthrowu.js:1560 | C mthrowu.c:1174-1264
```

100/100 Ledger entries; Left open none (true — manifest == declared).

## C ↔ JS fidelity

- `really_done` WHOLE (verified in review 2356; no D-3403 end.js diff;
  D-3403's `audited` corrects D-3402's word).
- `safe_qbuf` WHOLE modulo named omits — prefix/suffix/lastR arms, len
  math, short_oname + lastR fallback exact; impossible() diagnostics
  named (C continues after them; sync/async), releaseobuf GC no-op.
- `getpos_help` WHOLE (doc-only delta; live cmd_from_func verified).
- `thrwmu` WHOLE — wield/select/polearm/autoreturn/lined_up/URETREATING
  (rn2 short-circuit exact)/monshoot/nomul; rogue-gate removal correct
  (C gate is mhitu.c:884, JS caller mhitu.js:4194 keeps it).
- `outoracle` WHOLE — early return, first-call init, swap-remove with
  `rnd(cnt-1)` skipping slot 0, headers, terminator read; open-failed
  arm present-but-unreachable named.
- `init_CapMons`/`free_CapMons` WHOLE — two-pass build exact
  (uniq/title filter, bogon decode/code/case arms, counts, terminator;
  DEBUG block compiled out).
- `rndghostname` WHOLE — `rn2(7) ? ROLL_FROM : plname` incl. 2-draw
  order; GHOSTNAMES head matches C list.
- `oname` WHOLE modulo named omit — lth truncation math identical,
  artifact guard, oartifact block (untwoweapon You() named; set_twoweap
  + update equivalent), literate livelog, carried update.
- `getpos` WHOLE (ported arms) — entry cmdq DIR/KEY arms, per-loop
  cmdq + remember record, ESC -10, G/g prefix (second read unrecorded),
  rushrun-ESC quitchars (early check ≡ C final-else: ESC matches no
  earlier arm), mouse pick, rushrun→rush path, exitgetpos teardown —
  all ≡ C :803-1141.
- `corpse_xname` WHOLE — flag decode, glob/NON_PM/unique arms, prefix
  mutual exclusion, adjective positioning + mungspaces + digit gate,
  corpse/plural, an() wrap.
- `rnd_otyp_by_wpnskill` WHOLE — two-walk `rn2(n)` + STRANGE fallback
  exact; `ported` is a genuine partial→ported transition (empty-class
  arm proven dead), not a word error.
- `rnd_otyp_by_namedesc` WHOLE — empty guard + oc_uname OR-arm exact
  (short-circuit preserved).
- `complain_about_duplicate`/`enhance_menu_text`/`string_for_opt`/
  `safe_oname`/`noit_Monnam`/`maybereleaseobuf`/`free_CapMons` WHOLE —
  exact incl. MACOS9/#if-0 compiled-out arms.

Non-sample spots (confirmed): eatcorpse tainted ≡ C eat.c:1895-1917
(Sick_resistance incl. defended(AD_DISE) — verified in youprop.h);
ysimple/simpleonames/actualoname ≡ C (minimal_xname wiring);
m_useupall obfree(obj, null) ≡ C :1157; getrumor couldnt_open_file live;
autounlock/menu prompt style ≡ wintty.c:2685-2689 (prepend-twice order
gives prompt-then-blank ✓); pick_any `*`/`+`/`#` ≡ wintty.c:1467-1473
+ set_item_state :1182 + page repaint; doset getlin/rerun/help/
preference_update ≡ C :8870-8971; parseoptions ×5 + perminv ×3 +
illegal-key ×2 sinks exact; symset routing ≡ C; wc2 non-ports honestly
named with the Samurai-94071 revert evidence.

## Hallucinations / overclaim

None. "Stale omit" `ported` claims verified as genuine partial→ported
transitions (pre-batch rows were partial with exactly those omits).
Paste-error-omit drops (maybereleaseobuf, roguesymset, menu_colors)
checked plausible (maybereleaseobuf body is one call + C commentary).

## Density

Manifest-exact batch (100/100 files+functions), ≤100 fns, 0 Left open,
no bundled Must-fix, per-function Ledger entries + Verify line. SHA
verdict = worst sampled = all whole → ACCEPT.

## Verification

- Re-measured all 19 sampled fns in one call (`--base e2943671c~1
  --reach-all`): 18 × "0 blocked" + smoke 24/24 or reach-PASS
  (rndghostname 83/83, namedesc 305/305, thrwmu 1/1) → REACH-OK;
  getpos "4 blocked → 0/0/4/0 NO MOVEMENT" + smoke REACH-OK. Zero
  regressed anywhere. The D-log discloses the 4 getpos sessions as
  UNCHANGED with a display-debt diagnosis and Next owners — honest;
  my re-run confirms UNCHANGED/0-worse (not a vacuous PASS claim).
  Nit: "All 100 lines read no blocked" overstates — getpos's line
  reads 4 blocked (disclosed two sentences later).
- `imports.mjs --rulecheck` → Rule #2 clean (this iteration). Diff
  grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinate gates.
- Full-44/44 + green + strict + cohort re-proven by the
  end-of-iteration rescore on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
