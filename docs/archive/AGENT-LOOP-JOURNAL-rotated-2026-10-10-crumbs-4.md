# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-10 — D-3768 [measure] `randomize_gem_colors` step-0 void paradox specified: geom boundary + C Oops-tail on both probes (no js/)

**C locus:** `o_init.c:85–109` (attributed owner — whole in JS, D-3767) + the real event `trap.c:498`/`teleport.c:2095`/`dungeon.c:1401–1416` portal panic (D-3733: C SIGABRTs frame-for-frame).
**JS:** none. **Callers:** n/a (measure).
**Change:** none — no js/. Wrote the owner's `[measure]` row (Measurements section) specifying the paradox with the probe commands + the recorder-screen detector (trailing Oops + zero-RNG tail, both measured above) for D-3733's scorer exclusion; references the D-3767 SYMPTOM park + D-3733 C-CRASH park.
**Verify:** `node scripts/verify.mjs --fn randomize_gem_colors` → PASS syntax (0 files) · PASS rule2 · FAIL hidden `verify randomize_gem_colors: 0 PASS, 0 moved past, 2 unchanged, 0 worse → NO MOVEMENT` (both probes still step-0 voids) · PASS reach (80/80 spread of 1025) → REACH-OK · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (not shared) → VERIFY: FAIL — expected for a [measure] (no js/; D-3748/D-3755 precedent).
**Named:** none (nothing ported; the writer question is CLOSED — no writer exists for C-fatal inputs — not deferred).
**Next:** row stays head as parked SYMPTOM + specified [measure] until the tooling falsifier lands (supervisor: scorer C-panic exclusion or crash-free re-record). Do not re-measure the void; do not re-port the owner/throw path. Next actionable cliff: getpos (95311/95506).

## 2026-10-10 — D-3767 cliffs-head `randomize_gem_colors`: owner already whole, probes still D-3733 C-crash voids → park SYMPTOM, no js/

**C locus:** `o_init.c:85–109` randomize_gem_colors (two `rn2(2)` gates + `rn2(4)` fluorite switch, all arms) + sole caller `:189` — already whole in JS, not re-ported.
**JS:** no js/ files changed. **Callers:** n/a (park; sole C site already wired, signature kept).
**Change:** none — no js/ (docs-only entry). Parked the owner as SYMPTOM with the probe command (LOOP-QUEUE.md Parked index); ledger stale note already complete (`js/o_init.js:301` — brief display truncates it). Removing the JS throw would be unfaithful (C aborts on these inputs); a surviving JS would still FAIL against the `\nOops...` padding (D-3733).
**Verify:** `node scripts/verify.mjs --fn randomize_gem_colors` → PASS syntax (0 files) · PASS rule2 · FAIL hidden `verify randomize_gem_colors: 0 PASS, 0 moved past, 2 unchanged, 0 worse → NO MOVEMENT` (both probes still step-0 voids; D-3766 changed nothing) · PASS reach (80/80 spread of 1025) → REACH-OK · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (not shared) → VERIFY: FAIL — expected for a no-js/ park (D-3748/D-3755 precedent).
**Named:** none — nothing ported, nothing omitted. Standing house idiom kept: throw ≡ C panic (js/dungeon.js:1159).
**Next:** row stays head as parked SYMPTOM until D-3733's tooling Next lands (supervisor: scorer C-panic exclusion or crash-free re-record); do not re-port randomize_gem_colors/mlevel_tele_trap/migrate/ledger for these voids. Falsifier: `verify randomize_gem_colors` naming a non-void (rngM>0) session blocked here. Next actionable cliff: getpos (95311/95506).

## 2026-10-10 — D-3766 cliffs-head migrate_orc writer: rnd_otyp_by_namedesc read unshuffled descr slots (95348 408→694)

**C locus:** `objnam.c:3455–3529` rnd_otyp_by_namedesc (`:3493` OBJ_NAME, `:3507` OBJ_DESCR) + `include/objclass.h:190–191` (OBJ_NAME/OBJ_DESCR read obj_descr[] via oc_name_idx/oc_descr_idx) + `o_init.c:113–148` shuffle (reassigns oc_descr_idx at init; RING entire class via shuffle_all). Sole shiny_obj caller is the orctown path (mkmaze.c:773) — only orctown sessions reach the descr arm with shuffled tables, hence 1 blocked session.
**JS:** `js/readobjnam.js` (+4/−2) + 1 test file.
**Change:** both lookups now via `objs[i]?.oc_name_idx ?? i` / `objs[i]?.oc_descr_idx ?? i` with an objclass.h cite; no new import. New focused test `scripts/rnd-otyp-namedesc-descr-idx.test.mjs` (3 its; single-match picks are rn2-independent per C `:3523–3526`).
**Verify:** focused test 0/3 pre-fix (stash-proven) → 3/3 post-fix. `node scripts/verify.mjs --fn migrate_orc,rnd_otyp_by_namedesc` → PASS syntax (1 changed js file: js/readobjnam.js) · rule2 · hidden migrate_orc: 0 PASS, 1 moved past (scen-sweep-Caveman-95348 → seffect_enchant_armor at step 694, was 408) → PROGRESS · reach migrate_orc 5/5 REACH-OK · hidden rnd_otyp_by_namedesc vacuous (nothing blocked on it) · reach rnd_otyp_by_namedesc 80/80 spread REACH-OK · green 2/2 · strict ×2 · cohort 7/7. VERIFY: PASS.
**Named:** none new (rnd_otyp_by_namedesc stays ported whole; migrate_orc / migrate_to_level omits unchanged).
**Next:** regenerated cliffs row (95348 now at seffect_enchant_armor@694).

## 2026-10-10 — D-3765 cliffs-head `eat.c` fprefx: stale_egg threshold was 2*400, C is 2*200 (95408 PASS)

**C locus:** `eat.c:2110` `else if (stale_egg(otmp))`; `include/obj.h:315` MAX_EGG_HATCH_TIME 200 («longest an egg can remain unhatched»); `:316-317` stale_egg ≡ (svm.moves - age) > 2*200 = 400. Single C caller: doeat `:3038` when eating starts (!already_partly_eaten).
**JS:** `js/eat.js` (+2/−1) + 1 test file.
**Change:** gate is now `> 2 * MAX_EGG_HATCH_TIME` using the live `js/const.js:1364` export (= 200, C-exact), added to eat.js's existing const.js import (:110; ALREADY edge, no new import — same shape as the already-correct dogmove.js:245 and uhitm.js:1355 inlines). Comment cites obj.h:315-317. New focused test `scripts/fprefx-stale-egg.test.mjs` drives exported doeat headless (carried egg via getobj 'a'; stale gap 500 sits strictly between the C 400 and old-JS 800 thresholds).
**Verify:** focused test pre-fix 1/2 (stale prints «delicious» — the exact probe symptom) → post-fix 2/2. `node scripts/verify.mjs --fn fprefx` → PASS syntax (1 changed js file: js/eat.js) · PASS rule2 · PASS hidden (verify fprefx: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS; scen-chain-Archeologist-95408: PASS) · PASS reach (fprefx: 1 baseline-PASS session reaches it: 1 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · full skipped (eat.js not shared). VERIFY: PASS.
**Named:** none new (fprefx otherwise whole per D-2159; the uhitm.js:1355 / dogmove.js:245 stale inlines already C-exact, untouched).
**Next:** cliffs block regenerates from the committed board (fprefx row resolved by the PASS).

## 2026-10-10 — audit 2622–2630 @8e94854e9: review D-3756/D-3757/D-3758/D-3759/D-3760/D-3761/D-3762/D-3763/D-3764 (9A/0D/0Q, 0 Must-fix) + full rescore 1024/1113

**Reviews:** 2622 throwit/bhit, 2623 makemon cham guard, 2624 Medusa mongone, 2625 mon_poly tail, 2626 teleds_simple, 2627 goto_level order, 2628 quest texts II, 2629 Displaced bits, 2630 known_hitum gate — all ACCEPT, every Verify re-measured (`--reach-all`: 0 worse, 0 regressed; full reach incl. 1015 makemon / 976 distfleeck / 776 obj_resists).
**Score:** public 44/44 (Scr 11405/11405, RNG 792838/792838, `361+1.74/turn` R² 0.79); corpus **1024/1113** (+9, 0 PASS→FAIL, `full: true` @8e94854e9), RNG 97.89 %, screens 95.5 %; marathons 85/160; held-out 19/44, pts 8,856 (+272), RNG 46.4 % (+4.3, scored 01:44Z — through D-3762).
**Ledger:** snapshot appended; 5 seeded `ported` briefed (pet_ranged_attk, rm_waslit, yname, arti_cost, chk_okdoor) — all whole, no `set`. Tooling (not rows): `sym.mjs` misses `export {…}` lists; `ledger.mjs sql` needs node:sqlite (absent here) — sampled via grep.
**Next:** cliffs head `eat.c` fprefx (95408@611; history D-2159).

## 2026-10-10 — D-3764 cliffs-head thitmonst writer: known_hitum weaphit gate counted a wielded lantern as a weapon hit (95312 1040→1492)

**C locus:** `uhitm.c:616` known_hitum `if (weapon && (weapon->oclass == WEAPON_CLASS || is_weptool(weapon)))`; `obj.h:249` is_weptool ≡ TOOL_CLASS with oc_skill != P_NONE (`skills.h:15` P_NONE = 0). A wielded lantern is not a weapon hit. thitmonst `dothrow.c:2011–2304` re-read whole (to-hit, unicorn, leader, weapon/kicked/ammo, iron ball, boulder, egg/pie/venom, potion, tamedog, swallow arms all live).
**JS:** `js/uhitm.js` (+3/−1).
**Change:** gate is now `weapon.oclass === WEAPON_CLASS || is_weptool(weapon)` — the live `js/wield.js:116` export, already imported at `js/uhitm.js:53` (no new edge; same call shape as the :1048/:1053/:1881/:2121 gates). Signature unchanged.
**Verify:** new focused test `scripts/known-hitum-weaphit-gate.test.mjs` (exported do_attack, level-30 always-hits hero vs grid bug; dagger control must wound + weaphit 1, lantern must wound + weaphit 0): pre-fix 1/2 (lantern fails) → post-fix 2/2. `hidden-proxy verify thitmonst`: 0 PASS, 1 moved past (815→1492 auto_describe), 66/66 reach REACH-OK; worker-confirmed this fix's leg: 1040 show_conduct → 1492 auto_describe (+452, RNG still 72638/72638). `node scripts/verify.mjs --fn known_hitum` → PASS syntax (1 file) · PASS rule2 · note hidden (0 blocked at baseline) · PASS reach (80/80 spread of 328 → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · full skipped (uhitm.js not shared — D-3251 precedent) + manual `sessions` 44/44.
**Named:** none new (thitmonst's D-2804 tmiss/miss wording + unstuck placebc omits stand; known_hitum otherwise whole per D-3249).
**Next:** 95312's new owner auto_describe@1492 («unseen creature (no travel path)» vs «unseen creature» — travel-path describe arm, own future row).
