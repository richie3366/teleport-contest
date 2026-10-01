# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-01 — D-3217 s_suffix 8-home second wave (review 2170: objnam/apply/fig/hatch disjunct + towel/leash/poison/inv restarts)

**C locus:** `nethack-c/upstream/src/hacklib.c:344–359` whole (Strcpy; strcmpi it→+s / you→+r; lowercase-'s' →+'; else →+'s; static buf).
**JS:** `js/objnam.js:2802`, `js/apply.js:1445/3223/4348`, `js/timeout.js:2271`, `js/weapon.js:1823`, `js/mhitu.js:1085`, `js/invent.js:4355` (sole js/ edits; 6 files) + `scripts/s_suffix_clones.test.mjs`.
**Change:** the 4 one-line clones drop the `|| endsWith('S')` disjunct (comments now cite the lowercase-only C predicate); towel/leash/poison/inv restarted as the C-exact 4-arm body (toLowerCase strcmpi it/you, case preserved in output; lowercase-`endsWith('s')` only; `String(s ?? '')`, so empty/null/undefined → `'s` ≡ C's buf[-1] read); hitmsg doc de-staled. Zero new module edges; every caller keeps its callee. `scripts/s_suffix_clones.test.mjs` CLONES extended 5 → 19 (all non-canonical defs) + a census test that scans `js/*.js` for `function s_suffix*` and fails on any unpinned def, so the next sweep cannot miss.
**Verify:** `node scripts/verify.mjs --fn s_suffix` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** none — all 20 homes now C-exact: canonical `js/do_name.js:411` + 5 name-exact (explode/minion/mthrowu/questpgr/shk, re-read C-exact this iteration) + 5 D-3210 homes + `s_suffix_hitmsg` (pre-existing C-exact) + these 8. (`s_suffix_ucatch` is an import alias of the export, not a def.)
**Next:** none for s_suffix — the census test guards all 20 homes. Next cluster per queue: first Open — coverage row (`do.c` obj_no_longer_held).
## 2026-10-01 — D-3216 vision_clears "quickly" text (review 2174: 12 literals + VISION_CLEARS const)

**C locus:** `nethack-c/upstream/src/decl.c:40–52` (10th positional `c_vision_clears` = "vision quickly clears.") + all 13 `Your1(vision_clears)` use sites: `eat.c:1829`, `mthrowu.c:840`, `detect.c:1234`, `zap.c:3066`, `dothrow.c:1326`, `uhitm.c:2983` (mhitm_ad_blnd_u), `trap.c:4332`, `potion.c:2078`, `mhitu.c:1480/1631/1813`, `engrave.c:1252`, `mcastu.c:740`. Upstream grep confirms no other producers (13 sites + the `decl.h:40` define).
**JS:** `js/dothrow.js:1672`, `js/eat.js:2487`, `js/potion.js:2950`, `js/mthrowu.js:1445`, `js/zap.js:4475`, `js/detect.js:2570`, `js/engrave.js:1688`, `js/mcastu.js:359`, `js/mhitu.js:761/771/2002/3711/3822`, `js/trap.js:537` (sole edits; 10 files, 14 lines).
**Change:** all 12 literals → `'Your vision quickly clears.'`; const → `'vision quickly clears.'` (the `:5082` `` `Your ${VISION_CLEARS}` `` composition now yields the C string); comment updated to cite the corrected idiom. Guards (`!Blind()`, `!was_blinded`) untouched; zero new module edges; export names/signatures unchanged. 13 C sites = 13 JS emitters, verified by upstream grep both sides.
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_blnd --full` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `mhitm_ad_blnd`: none — the split stands text-exact; the other 12 sites sit in already-ported functions whose ledger rows are unchanged.
**Next:** Must-fix row leaves via archive; second Must-fix (s_suffix 2nd wave, review 2170) remains head.
## 2026-10-01 — Audit 2167–2175: review D-3207–D-3215 (7 ACCEPT, 2 QUALITY-RISK) + full score

**Reviews:** 2167–2169 ACCEPT (D-3207 pray else, D-3208 from_what, D-3209 iter_mons — all three close review-2165/2162 Must-fix items); 2170 QUALITY-RISK (D-3210 fixed the 5 queued s_suffix homes but "all 11 C-exact" misses 8 more: objnam/apply/fig/hatch `|| 'S'` + towel/leash/poison/inv pre-fix shapes; census is 20 defs); 2171–2173 ACCEPT (D-3211 uhitm×4, D-3212 resist+osshock, D-3213 doloot+loot); 2174 QUALITY-RISK (D-3214 blnd fill copies the wrong idiom: C `Your1(vision_clears)` = "Your vision quickly clears." (decl.c:49), JS drops "quickly" at 13 lines/10 files); 2175 ACCEPT (D-3215 Gloves_off+armoroff; "new botl edge" is actually ALREADY).
**Must-fix (2 families, prepended):** vision_clears "quickly" text (review 2174, first) + s_suffix 8-home second wave (review 2170). Next cluster set to vision_clears.
**Fortress:** public 44/44 (Scr 11,405/11,405, RNG 792,838/792,838, `325+1.68/turn`); corpus 666/953 (+1 scen-poly-Tourist-92171 ex-break_armor@88, plausibly D-3215; 0 losses; full:true 11:32Z); held-out 13/44 unchanged (scored 07:09Z). Rule #2 clean. Ledger snapshot + 5 seeded-ported rows sampled (all resolve, no fix).
## 2026-10-01 — D-3215 `do_wear.c` ×2: Gloves_off + armoroff whole-body restarts

**C locus:** - `Gloves_off`: `nethack-c/upstream/src/do_wear.c:646–702` whole — JS carried only the CORPSE-gated wielding pair; the otyp switch (Fumbling/Power/Dexterity + default), encumber_msg, Glib cure and barehanded-condtests tail were absent.
**JS:** `js/do_wear.js:31` (encumber_msg import), `:71` (condtests import), `:88` (make_glib import), `:114` (LEATHER_GLOVES), `:1024–1114` (Gloves_off), `:1951–2046` (armoroff).
**Change:** restart both in C order. Gloves_off: oldprop/on_purpose capture, switch before setworn (adj_abon reads the still-worn uarmg; Fumbling arm mirrors Boots_off's HFumbling/uprops convention), cancelled_don reset, encumber_msg, Glib cure, wielding pair, condtests[bl_bareh] botl tail. armoroff: cursed gate, delay arm with per-arm what+afternmv and `if (what)` nomovemsg, no-delay armcat switch + off_msg, mask/what=0 tail on both arms. `encumber_msg`/`make_glib` join the existing invent/potion edges; `condtests` is a new botl edge (`--can` CHECK: same 102-module SCC, lazy body read — safe); `LEATHER_GLOVES` const added.
**Verify:** `node scripts/verify.mjs --fn Gloves_off,armoroff --full`: syntax PASS · rule2 PASS · hidden note (no corpus session blocked on either) · REACH-OK both (no RNG-tagged reach; smoke 24/24 PASS ×2) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
**Named:** - `Gloves_off`: none added — null-gloves graceful clear kept (C dereferences uarmg; sibling convention); condtests[0] is bl_bareh (botl.h enum 0, `js/botl.js:1150`).
**Next:** coverage head moves to `do.c` obj_no_longer_held; `do_wear.c` holds nothing more Open (file sweep: 2 ported this iteration + 3 stale-marked, rest ok/ported/declared).
## 2026-10-01 — D-3214 `uhitm.c` ×5: blnd vision_clears, were uhitm row, slow defended ×3, samu/pet stale splits

**C locus:** - `mhitm_ad_blnd`: `nethack-c/upstream/src/uhitm.c:2958–3012` whole — the gap was only the mhitu `:2982–2983` `Your1(vision_clears)` arm (uhitm+mhitm arms live in `mhitm.js:850`).
**JS:** `js/mhitu.js:85` (`defended` import), `:764–774` (`mhitm_ad_blnd_u` arm), `:2734–2741` (`mhitm_ad_slow_u` gate); `js/mhitm.js:1374–1383` (`mhitm_ad_slow` gate); `js/uhitm.js:68` (`AD_WERE` import), `:2505–2515` (`damageum_ad_slow` gate), `:2960–2967` (AD_WERE row).
**Change:** fill the blnd stub with the established 8-site `pline('Your vision clears.')` idiom (`Your1` is the `Your("%s",·)` macro, `hack.h:1027`; `vision_clears` the `decl.h:40` common string); add the AD_WERE row routing to same-file `damageum_ad_phys` like the AD_PHYS row (C's `if done return` is end-of-function dead; the mhitm.js phys local is the mhitm arm — D-3211); wire live `defended(·, AD_SLOW)` after `negated` in all three slow homes (cold D-3211 precedent; mhitu passes `game.youmonst` before `hitmsg`); `defended` joins mhitu.js's existing mondata edge, `AD_WERE` uhitm.js's existing mhitm edge (both `--can` ALREADY, names only).
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_blnd,mhitm_ad_were,mhitm_ad_slow,mhitm_ad_samu,hmon_hitmon_pet` → PASS syntax (3 files) · PASS rule2 · hidden none-blocked ×5 · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS; plus full `sessions` 44/44 (RNG 792,838/792,838 scr-equivalent, speed `327+1.63/turn`).
**Named:** - `mhitm_ad_blnd`: none — all three arms live; `Your1`/`vision_clears` are a macro + common string (no JS symbols needed).
**Next:** uhitm.c remainder Open is campaign-scale (hmonas 284, drin 133, adtyping 39-case dispatch verification) or partials blocked on other functions' named gaps (nohandglow/stck/drst/dren/conf/pest/deth/ston omits name hit()/stagger/golemeffects); queue head moves to Gloves_off.
## 2026-10-01 — D-3213 `pickup.c` ×2: doloot_core single-walk cache, able_to_loot reachability arms

**C locus:** - `doloot_core`: `nethack-c/upstream/src/pickup.c:2178–2346` whole (check_capacity; nohands; Confusion rn2(6)&&reverse_loot / rn2(2); menu_requested goto lootmon; lootcont count/able_to_loot/blind-cockatrice/PICK_ANY multi/single walk/grave; lootmon direction/underfoot/dz/m_at/loot_mon/Confusion||Stunned/!looted_mon arms).
**JS:** `js/pickup.js:45` (import), `:4334–4378` (`loot_floor_containers` walk cache), `:4731–4769` (`able_to_loot`).
**Change:** cache `nobj` before `do_loot_cont` in the single walk; restart `able_to_loot` in C order wiring the live `rider_cant_reach` (steed.js), `cant_reach_floor` (engrave.js, added to the existing static edge — `--can` ALREADY), and static `nolimbs` (monsters.js, already imported) exports; pool arm is now `(looting || !u.uinwater)` per C (Underwater ≡ u.uinwater).
**Verify:** `node scripts/verify.mjs --fn doloot_core,able_to_loot` → PASS syntax (1 file) · PASS rule2 · hidden none-blocked ×2 · reach REACH-OK ×2 (fixed smoke spread 24/24 PASS each) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `doloot_core`: none in the body — PICK_ANY extras (invert/pages/>26 accelerators) are `select_menu` menu-machinery (by-design, same standing as D-3199).
**Next:** callee closure holds no more Open rows (`check_capacity` body whole, no change; `mon_beside`/`get_adjacent_loc`/`ceiling` declared ported; pline-family THIN is hot display machinery, out of scope); same-file `pickup.c` remainder measures ok.
## 2026-10-01 — D-3212 `zap.c` ×2: resist clone dlev+TELL completion, do_osshock stale hoist

**C locus:** - `resist`: `nethack-c/upstream/src/zap.c:6099–6158` whole (mplayer Conflict early return; WAND12/TOOL10/WEAPON10/SCROLL9/POTION6/RING5/ulevel alev; dlev clamp + mplayer-ulevel; `rn2(100+alev-dlev) < mr`; TELL `shieldeff_mon` + halve; HP apply + `m_using`?`monkilled(AD_RBRE)`:`killed`).
**JS:** `js/music.js:167` (arm), `js/pray.js:2852` (arm) + `:2896–2900` (shield), `js/mhitm.js:582` (arm) + `:634–636` (shield), `js/zap.js:3850` (`shieldeff_mon` export) + `:5012` (`do_osshock` top-level).
**Change:** mplayer dlev arm in all 3 clones (`is_mplayer` via existing monsters.js edges — mhitm already imported it); TELL `shieldeff_mon` at both async TELL sites (export from zap.js — body verified exact vs `mon.c:6056–6064` — via existing zap.js edges in pray/mhitm; names on existing edges only, both hoisted functions, so no new cycle/TDZ — `--can` skipped); hoist `do_osshock` to top level (byte-identical body, zero closure vars — pure visibility move so sym/ledger/measure resolve it).
**Verify:** `node scripts/verify.mjs --fn resist,do_osshock` → PASS syntax (4 files) · PASS rule2 · hidden none-blocked ×2 · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `resist`: caller-side only — mbhitm STRIKING vs-monster arm (`muse.c:1632–1644`: resists_magm/Boing/hit/resist/miss all absent from the `js/muse.js:827` RNG stub; owns its row); potionhit confusion/blindness/acid arms (`potion.c:1780/1824/1871`; `js/potion.js:28` D-1472). Body whole in all five JS incarnations (canonical + 4 sync clones).
**Next:** next Open — coverage row (`weapon.c` possibly_unwield PARTIAL); bhitpile restack+fill_pit rides its own ledger row.
## 2026-10-01 — D-3211 `uhitm.c` ×4: mhitm_ad_cold defended+seesu, hmon anger_guards tail, mhitm_ad_stun uhitm arm, mhitm_ad_slee defended/shieldeff

**C locus:** - `mhitm_ad_cold`: `uhitm.c:2626–2681` whole (uhitm `:2633–2652`, mhitu `:2654–2663`, mhitm `:2665–2680`).
**JS:** `js/uhitm.js` (cold disjunct, hmon tail, stun arm + dispatch, 3 import names), `js/mhitu.js` (cold seesu pair), `js/mhitm.js` (`stagger` export, async `sleep_slee_mm` + awaits).
**Change:** wire the live exports in C order — `defended(mdef, AD_COLD)` disjunct (`uhitm.c:2641`); `monstseesu(M_SEEN_COLD)` / `monstunseesu` else-branch (`:2660` / `:2663`); pre-`hmon_hitmon` anger snapshot + `angry_guards(!!Deaf)` tail (house inline Deaf disjunct); new `damageum_ad_stun` (`Blind_that` stagger pline via the now-exported mhitm.js `stagger` + house `makeplural`, `mstun=1`, sync `damageum_ad_phys` — the mhitm.js phys local is the mhitm arm) + AD_STUN dispatch; `sleep_slee_mm` async with `defended(AD_SLEE)` + `shieldeff` + 0 (`mhitm.c:1232–1234`), 3 call sites awaited. No new module edges (`imports.mjs --can` ALREADY ×2; names added to existing uhitm→mon/monsters/mhitm edges).
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_cold,hmon,mhitm_ad_stun,mhitm_ad_slee` → PASS syntax (3 files) · PASS rule2 · hidden none-blocked ×4 · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `mhitm_ad_cold`: none — all three arms whole, every callee live.
**Next:** next Open — coverage row (`zap.c` resist PARTIAL).
## 2026-10-01 — D-3210 `hacklib.c` s_suffix suffixed-clone completion (review 2160: drop `|| endsWith('S')` ×4 + zap 4-arm rewrite)

**C locus:** `nethack-c/upstream/src/hacklib.c:344–359` whole — Strcpy + strcmpi it→+s / you→+r / trailing-'s'→+' / else→+'s, in order (static-buf aliasing needs no JS counterpart — fresh strings are safe).
**JS:** `js/eat.js:3392–3400`, `js/mhitm.js:5814–5822`, `js/dothrow.js:872–880`, `js/potion.js:3010–3018`, `js/zap.js:2688–2696` (sole edits; 5 files) + `scripts/s_suffix_clones.test.mjs` (new).
**Change:** the 4 one-line clones drop the `|| endsWith('S')` disjunct (comment now cites the lowercase-only C predicate); zap restarted as the C-exact 4-arm body (toLowerCase strcmpi it/you; lowercase-`endsWith('s')` only; `String(s ?? '')` input), deleting the falsy passthrough and the z/x/ch/sh arm. Fix in place, zero new module edges (D-3200 precedent); every caller keeps its callee; behavior changes only where JS≠C, so baseline-PASS sessions cannot newly diverge.
**Verify:** `node scripts/verify.mjs --fn s_suffix` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `s_suffix`: none in the body — all 11 homes now C-exact (D-3200's caller-level omits files.c:3215 SYSCF / nhlua.c:888 / insight.c:1137 stand unchanged).
**Next:** breadth queue continues (Must-fix row leaves via archive; s_suffix split now covers all 11 homes).
## 2026-10-01 — D-3209 `mon.c` iter_mons splice-safety (review 2162 savebones removal-skip)

**C locus:** - `iter_mons`: `nethack-c/upstream/src/mon.c:4526–4538` whole — `for (mtmp = fmon; mtmp; mtmp = mtmp2)` with `mtmp2 = mtmp->nmon` cached before the DEADMONSTER/mon_offmap skip and the `(*vfunc)(mtmp)` call.
**JS:** `js/mon.js:2968–2980`; 1 js file.
**Change:** walk `[...(game.fmon || [])]` — the snapshot is C's mtmp2 chain (C-created mons prepend to fmon and are likewise unvisited mid-walk, so the snapshot matches C for both removal and insertion); DEADMONSTER (`mhp < 1`) + `mon_offmap` checks stay at visit time against live refs. JSDoc corrected to cite the unlink hazard and the snapshot. No new module edges; export name/signature unchanged.
**Verify:** `node scripts/verify.mjs --fn iter_mons` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `iter_mons`: none — whole 13-line C body live.
**Next:** next Must-fix row (`s_suffix` suffixed clones, review 2160).
## 2026-10-01 — D-3208 `attrib.c` from_what negative INVIS + CLAIRVOYANT arms (review 2165 finding 2)

**C locus:** - `from_what`: `nethack-c/upstream/src/attrib.c:986–995` whole — `case INVIS: if (uprops[INVIS].blocked & W_ARMC) Sprintf(buf, because_of, ysimple_name(uarmc))` (mummy wrapping); `case CLAIRVOYANT: if (wizard && (uprops[CLAIRVOYANT].blocked & W_ARMH)) Sprintf(buf, because_of, ysimple_name(uarmh))` (cornuthaum). BLINDED arm (`:979–983`) untouched.
**JS:** `js/attrib.js:1225–1254` (negative block), imports `:37–38,44–45`; 1 js file.
**Change:** the two `if` arms in C switch order after the BLINDED arm. Blocked masks read the JS dual store (flat `BInvis`/`BClairvoyant` mirror OR `uprops[].blocked` — `apply_w_blocks` in `js/do_wear.js:620–637` writes both, and every live reader in `js/do_wear.js:869`/`js/invent.js:6687/6755` ORs them); the tested slot bit (`W_ARMC`/`W_ARMH`) and the `ysimple_name(uarmc/uarmh)` suffix are C-exact, as is the inner `wizard &&` on CLAIRVOYANT (vacuous under the outer wizard gate, ported as written). No new module edges — `INVIS`/`CLAIRVOYANT`/`W_ARMC`/`W_ARMH` join the existing static `./const.js` import; `ysimple_name` already imported.
**Verify:** `node scripts/verify.mjs --fn from_what` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `from_what`: none added — birth blind/deaf + Blindfolded_only/cream stay named in the JSDoc (pre-existing, positive-propidx arms outside this Must-fix).
**Next:** next Must-fix row (`savebones` removal-skip via `iter_mons`, review 2162).
