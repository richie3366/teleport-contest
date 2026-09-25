# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
