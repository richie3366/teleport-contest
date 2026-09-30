# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-29 — Audit 2078-2086 (D-3118..D-3126): 9 ACCEPT; full cadence

Reviews 2078-2086 audit c1be7a049..eeb30e858 against pinned C (Resists_Elem Must-fix closing 2070, botl 4-fn query closure, num_genocides+livelog, options 9-fn term cluster, container_at+dirprompt, make_version+9 dispositions, hawaiian_design+shirt block, reorder gold-arm fix, artifact 5-fn abil cluster): 9 ACCEPT, no Must-fix. Every corpus claim re-measured with --reach-all (all vacuous + REACH-OK, no REGRESSED). Cadence: public 44/44, corpus 648/953 (0 flips, full:true), held-out 13/44 flat. Ledger snapshot + 5/5 seeded-ported sample live.

## 2026-09-29 — D-3126 `artifact.c` abil_to_adtyp whole-body + what_gives completion + arti_immune (coverage)

**C locus:** - `abil_to_adtyp`: artifact.c:2320–2341 (7-row static table, linear scan, 0 default); sole caller what_gives :2389.
**JS:** js/artifact.js abil_to_adtyp `:3240` (new, before abil_to_spfx); what_gives `:3290` (doc + body); arti_immune `:1464` (new, before bane_applies).
**Change:** new abil_to_adtyp local in C table order (pointer identity → propidx switch, sibling convention); what_gives rewritten in C order (ungated tables, warntype.obj guard folded into the artifact-branch condition with C's else fallthrough for gated artifacts, dtyp/cspfx/spfx/Sunsword arms in order, wornmask arm); new arti_immune export in C order (`?.adtyp | 0` per same-file precedent). No new module edge (all in-file; AD_*/W_*/prop consts already present). No maintained unit harness in-repo (verify.mjs + sessions are the project check — no new framework).
**Verify:** `node scripts/verify.mjs --fn abil_to_adtyp,what_gives,arti_immune,bane_applies,abil_to_spfx` → VERIFY: PASS (syntax 1 file js/artifact.js; rule2; hidden notes 0 blocked ×5; REACH-OK smoke 24/24 ×5, 0 regressed; green 2/2; strict ×2; cohort 7/7; full skipped — no shared file).
**Named:** - `abil_to_adtyp`: none — whole body, sole caller wired.
**Next:** pop the next Open — coverage row (post-ship head: `mon.c` qst_guardians_respond PARTIAL); artifact.c set_artifact_intrinsic PARTIAL row remains for its own iteration (HALRES make_hallucinated message path + inv_prop async split).

## 2026-09-29 — D-3125 `invent.c` reorder_invent inv_rank gold-arm fix + 2 stale (coverage)

**C locus:** - `reorder_invent`: invent.c:738–767 (inv_rank macro `:735`, `#undef` `:769`; callers `:1121` addinv_core0, `:5266`/`:5275` doorganize_core).
**JS:** js/u_init.js inv_rank `:910` (+2 cite lines, arm deleted); js/invent.js doc `:9309`, rank `:9311` (arm deleted).
**Change:** dropped the gold exception in both copies with `:735`/`:769` cites (GOLD_SYM='## 2026-09-29 — D-3124 `read.c` hawaiian_design whole-body + doread shirt-block caller wiring (coverage)

**C locus:** - `hawaiian_design`: read.c:224–251 (hawaiian_bgs `:227–239`, o_id ^ ~ubirthday hash `:244`, Sprintf `:246–249`); sole caller doread :394.
**JS:** js/objnam.js hawaiian_bgs `:520`, hawaiian_design `:617` (motif omit line retired); js/read.js consts `:217`, shirt block `:2216–2251` (Blind `:2219`, obscured `:2226`, HAWAIIAN `:2230`, text `:2243`; header + deferred/grease notes retired).
**Change:** new hawaiian_design export in C order (bg = o_id ^ (unsigned)~ubirthday with explicit `>>> 0` casts; makeplural(motif) on an(bg); C's buf double-write collapses — makeplural/an own their static bufs, so plain strings match with no aliasing); doread shirt block in C order (Blind gate with the :332 Braille string, obscured-by-suit gate with the smock exemption, HAWAIIAN arm with the verbose ternary, literate++ post-increment, tshirt/apron text + verbose endpunct); T_SHIRT/ALCHEMY_SMOCK/HAWAIIAN_SHIRT consts via the file `_on` helper; names added to the existing objnam/display/do_wear edges only (no new module edge). No maintained unit harness in-repo (durable-test-collateral: verify.mjs + sessions are the project check — no new framework).
**Verify:** `node scripts/verify.mjs --fn hawaiian_design` → VERIFY: PASS (syntax 2 files js/objnam.js js/read.js; rule2; hidden note 0 blocked; REACH-OK smoke 24/24, 0 regressed; green 2/2; strict ×2; cohort 7/7; full skipped — no shared file). Extra probe `--fn hawaiian_design,doread`: doread REACH-OK smoke 24/24, 0 worse; its 3 blocked sessions (scen-impaired-Healer-94190 s70 + scen-impaired-Tourist-94350 s118 blind-scroll gate, scen-normal-Tourist-92061 s17 silently gate) are pre-existing phase-2 residuals on untouched doread arms — unchanged, not queued.
**Named:** - `hawaiian_design`: none — whole body, sole caller wired.
**Next:** pop the next Open — coverage row (post-ship head: `role.c` clearrolefilter THIN).

## 2026-09-29 — D-3123 `mdlib.c` make_version whole-body + dig.c DEBUG/`#if 0` by-design set (10 functions; coverage)

**C locus:** - `make_version`: mdlib.c:248–295 (incarnation `:255–258`, feature_set `:266–281`, entity_count `:286–292`); game caller mdlib.c:841 runtime_info_init (makedefs/sfctool callers are build tools).
**JS:** js/version.js imports `:18–20`, EDITLEVEL `:32`, version `:630`, make_version `:640`, runtime_info_init `:671` (`:841` wire `:675`, `:842` forward `:676`); js/date.js hook `:172`, interim deleted (`:68–84` replaced by collapse note).
**Change:** new module-local `version` + `make_version()` in js/version.js in C order (C staticfn in game builds `:244–246`, so local; incarnation from VERSION_*/EDITLEVEL pins, feature_set bits 6+17+18 with bit 19 off per global.h:430/config.h:435/config.h:627, entity_count by counting artilistRaw names from 1 ≡ C `:286–287` over artilist.h:12 + C shift order, `>>> 0` exact since all values fit 32 bits); `:841` wire + struct forwarded at `:842`; interim deleted, hook takes the struct, date.js drops its three generated imports; version.js gains its first imports (three generated leaves — import-free, no TDZ/cycle; D-1881 comments narrowed to the real ban: no const.js/hacklib.js/date.js edge) + EDITLEVEL pin. /tmp convergence probe: version_number/version_features/version_sanity1 bit-identical to the interim (83886080/393280/555618687, NUM_OBJECTS 481).
**Verify:** `node scripts/verify.mjs --fn make_version,wiz_debug_cmd_bury,bury_monst,bury_you,bury_obj,is_digging,watchman_canseeu,version_id_string,build_savebones_compat_string,count_and_validate_winopts` → VERIFY: PASS (syntax 2 files js/date.js js/version.js; rule2; hidden note 0 blocked ×10; REACH-OK smoke 24/24 ×10, 0 regressed; green 2/2; strict ×2; cohort 7/7; full skipped — no shared file).
**Named:** - `make_version`: makedefs.c/sfctool.c build-tool callers (never ported); none in-body — whole body, every value live (pins + generated counts).
**Next:** pop the next Open — coverage row (post-ship head: `muse.c` munstone PARTIAL). Sub-threshold mdlib.c residues verified this iteration but left unknown (cap): mkstemp C7 MSVC-only (`:372–387` `#ifdef _MSC_VER` → by-design) + md_ignored_features/mdlib_version_string C4 bodies complete (js/date.js:49, js/version.js:57 → stale).

## 2026-09-29 — D-3122 `pickup.c` container_at whole-body + lock.c:794 pit-dirprompt caller wiring (coverage)

**C locus:** - `container_at`: pickup.c:2024–2038 (floor chain `:2029`, nobj cache `:2030`, Is_container `:2031`, !countem break `:2033–2034`); callers lock.c:794/847, pickup.c:2217/2302/2326/3586.
**JS:** js/pickup.js container_at `:4161`; js/lock.js doopen_indir dirprompt `:830`, get_adjacent_loc call `:845`.
**Change:** C-order `nobj` cache (`for (cobj, nobj); cobj; cobj = nobj` + `nobj = cobj.nexthere` — unobservable today, C-exact list semantics). lock.js doopen_indir: pit + container-underfoot arm in C order (`:793–795`, `uu.utrap && utraptype === TT_PIT && container_at(ux, uy, false)` → `'Open where? [.>]'`, passed to get_adjacent_loc); dirprompt retired from the Named omissions doc (pit-reach gate `:815–818` stays named). No new imports (TT_PIT + container_at already in lock.js).
**Verify:** `node scripts/verify.mjs --fn container_at` → VERIFY: PASS (syntax 2 files js/lock.js js/pickup.js; rule2; hidden note 0 blocked; REACH-OK no RNG-tagged reach, smoke spread 24 run 24 PASS; green 2/2; strict ×2; cohort 7/7; full skipped — no shared file).
**Named:** - `container_at`: none — whole body, every callee live (Is_container + objects_at pre-existing), every C caller wired.
**Next:** pop the next Open — coverage row.

## 2026-09-29 — D-3121 `options.c` doset-term + roguesymset cluster (9 functions; CHANGE_COLOR pair by-design)

**C locus:** - `all_options_palette`: options.c:9656–9674 (`#ifdef CHANGE_COLOR`); call site :9731–9733 same guard.
**JS:** js/options.js term_for_boolean :8956, enhance_menu_text :8974, doset_bool_term :8979, NONMOD wire :9037, optfn_roguesymset :3066, allopt row :9953, doset compound :9115, string_for_opt :10231, complain_about_duplicate :10352, doset_add_menu :8420, Othr wire :9152, handler_sortloot :6681 (unchanged), display import :174; scripts/doset-terms.test.mjs (new, 10 vectors).
**Change:** by-design pair via direct `ledger.mjs set` (CHANGE_COLOR only in amiconf.h; contest unix build + recorder carry no -DCHANGE_COLOR; no patch touches it). handler_sortloot: no code — verified whole (n>1 folded in select_menu_pick_one: new-key hit ≡ C pick[1], ENTER ≡ preselect finish, ESC ≡ n≤0; perm_invent/update_inventory, free/GC, destroy-in-helper all cited). term_for_boolean: new export, table + gate verbatim; termpref on bgcolors/idlecheckpoint/perm_invent/sounds (Off) + voices (Excluded — SND_SPEECH multisnd-only); doset_bool_term unified (all listed rows render identically; voices-true now C-correct 'included'). enhance_menu_text: degenerate no-op port (`#if 0` cited out); wired in NONMOD loop (≡ C pass 0, :8834–8839). string_for_opt: wired :6675–6677 to live config_error_add (optfn_sortloot precedent); fixed :6679 + range cites. complain_about_duplicate: restarted stub (alias tail via OPT_ALIAS/usingAliasOpt, CompOpt ternary) + wired call. doset_add_menu: split-doc (get_val in callers); OthrOpt rows rewired through helper (output byte-identical); :8901 PREFIXES named (doset docblock precedent). optfn_roguesymset: new export in C order (flat+gs store, live rogue assign_graphics, sibling-gated flags, combined get_val/cnf without handler tail); allopt row + doset get_val wired.
**Verify:** - `handler_sortloot`: hidden note (0 blocked); REACH-OK smoke 24/24.
**Named:** - `all_options_palette`: whole function uncompiled (by-design).
**Next:** block refills via finish; fopen_config_file (partial D-3117, compiled arms complete per review 2077) needs a stale-check before any same-file growth.
