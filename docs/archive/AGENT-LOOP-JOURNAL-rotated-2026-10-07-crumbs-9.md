# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-07 — D-3616 cliffs-head summonmu writer minion.js `Inhell()`: `dnum===GEHENNOM`(5) read false in Gehennom (dnum 1); hellish flag (Wizard-91112 PASS)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-10-07 — audit 2488–2496 @b226c2d08: review D-3607…D-3615 (8A/1D/0Q, 0 Must-fix) + full rescore 847/953

**C locus:** n/a (review iteration; re-measured every SHA's verify vs pinned C).
**JS:** none touched. 2493 WITH-DEBT only: zap.js bare-idiom losehp sites never drain `finish_maybe_wail()` on survival (pre-existing leak of `_needs_maybe_wail`, map-tracked debt, no session distinguishes it).
**Verify:** public 44/44 (Scr 11,405, RNG 792,838, `334+1.63/turn`); corpus 847/953 (+10, all per-iteration, drift 0, 0 PASS→FAIL, `full: true`); held-out 18/44 (judge 07:22Z, unchanged). Ledger snapshot + 5/5 seeded-ported spot rows clean (`node:sqlite` missing — sampled via `seed@` grep + `brief.mjs`).
**Next:** cliffs head `mhitu.c` summonmu (scen-tour-Wizard-91112, history D-1844).

## 2026-10-07 — D-3615 `potion.c` peffect_polymorph: C `min` is a macro — losing branch's `rn2(15)` draws twice, `Math.min` drew once (Valkyrie-92195 PASS)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)

## 2026-10-07 — D-3614 cliffs-head dog_move writer dog_goal: portal scan walked the dead game.ftrap chain, blind to the wished magic portal in live level.traps (Caveman-94281 → PASS, Valkyrie-94361 → step 24)

**C locus:** `nethack-c/upstream/src/dogmove.c:591–603` (dog_goal magic-portal arm: first MAGIC_PORTAL in the gf.ftrap walk within distu≤2 → appr 1, break after the first portal); trap store `trap.c:576–579` (maketrap links every new trap into gf.ftrap).
**JS:** `js/dogmove.js` dog_goal export + portal union (+24/−8); `scripts/doggoal-portal.test.mjs` (new, node:test, 4 its: level.traps portal in range → 1, far → 0, ftrap-chain portal → 1, none → 0; udist 1 → zero RNG).
**Change:** `js/dogmove.js` dog_goal portal scan walks the doidtrap union verbatim: gf-shaped store first (array-shaped ftrap or ntrap chain), then level.traps, deduped; first MAGIC_PORTAL decides with C's in-range-or-not break. One-word `export` on dog_goal (C-staticfn live-export precedent D-2455) for the headless test. No new imports.
**Verify:** `scripts/doggoal-portal.test.mjs` 4/4 (old ftrap-only loop: case 1 fails, rest pass — discriminates the fix, not the export); + `dogmove-displace.test.mjs` 4/4 → 8/8. `node scripts/verify.mjs --fn dog_move,dog_goal` → syntax · rule2 · `verify dog_move: 1 PASS, 1 moved, 0 no-movement` (Caveman-94281 PASS; Valkyrie-94361 dog_move@21 → inuse_classify@24) · reach dog_move 80/80 + dog_goal 80/80 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. `verify --fn dog_move --reach-all`: 586/586 PASS, 0 regressed → REACH-OK.
**Named:** none in dog_goal's portal arm (whole: union order, dedupe, first-portal break, ≤2 range). D-3411's other dead-chain siblings (display/do/dungeon/end ftrap walks) intentionally untouched — no session blocks on them in this cliff.
**Next:** cliffs regen (Valkyrie now blocks on inuse_classify@24 — its row names the writer or [measure], not a re-port).

## 2026-10-07 — D-3613 cliffs-head doturn: first-break `gnostic++` on undefined left NaN, so strangled #turn returned ECMD_OK instead of ECMD_TIME (no monster turn, no --More--; Priest-92096 → PASS)

**C locus:** pray.c doturn `:2414–2487` — `:2426` `if (!u.uconduct.gnostic++)` (post-increment always runs; livelog on old 0); `:2432–2443` can_chant-failure arm returning `(u.uconduct.gnostic == 1) ? ECMD_TIME : ECMD_OK` (first break costs a move).
**JS:** 1 file + 1 test (pray.js +10/−4: safe increment + C cite; scripts/doturn-gnostic.test.mjs new, FAIL→PASS). Far under the 15000/80 caps.
**Change:** the in-file dopray/dosacrifice `| 0` idiom at the :2426 site: `if (!(gnostic | 0)) { gnostic = 1; livelog } else { gnostic = (gnostic | 0) + 1 }` (always increments; first break sets exactly 1 so the :2442 test returns ECMD_TIME). No new imports; no DIAG/FORCE/seed gates; Rule #2 clean.
**Verify:** `node scripts/verify.mjs --fn doturn` → `PASS syntax 1 changed js file(s): js/pray.js` · `PASS rule2` · `PASS hidden verify doturn: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (Priest-92096 PASS) · `PASS reach doturn` (no RNG-tagged reach; fixed smoke spread 24 run: 24 PASS, 0 regressed) → REACH-OK · `PASS green 2/2` + strict ×2 · `PASS cohort 7/7` · VERIFY: PASS. Full `sessions` forced post-change: 44/44. New test: pre-fix `0 !== 1` (ECMD_OK vs ECMD_TIME) → post-fix 2/2 PASS.
**Named:** unchanged from D-0912 (non-Cleric/Knight `known_spell(SPE_TURN_UNDEAD)`/spelleffects fallback; resist TELL pline) — off this probe's path, stay named.
**Next:** regen drops the doturn row (0 blocked).

## 2026-10-07 — D-3612 cliffs-head can_make_bones writer: fatal burn drew exercise before the losehp drain (extra rn2(2) ahead of can_make_bones; Barbarian-94326 → PASS)

**C locus:** zap.c maybe_destroy_item `:5798–5954` (`:5947–5949` losehp then exercise(A_STR, FALSE); `:5939` xresist gate; `:5914–5916` potionbreathe gate); hack.c losehp `:4282–4288` (uhp<1 → killer + urgent_pline("You die...") + done(DIED), noreturn unless life-saved); bones.c can_make_bones `:356–385` (`:377` depth rn2(1+(depth>>2)) — rn2(1) always 0; wizard proceeds past it); end.c really_done `:1201` bones_ok.
**JS:** 1 file + 1 test (zap.js +8/−2: drain+bail + doc; scripts/maybe-destroy-item-fatal.test.mjs new, FAIL→PASS). Far under the 15000/80 caps.
**Change:** oil-pattern drain+bail before exercise (D-3608; bare idiom like the D-3610 trap sites, matching zap.js's other losehp sites which carry no wail else-branch): losehp; `if (_losehp_needs_done || gameover) { await finish_losehp_done(); if (gameover) return dmg; }` exercise(A_STR, false) — lifesave clears gameover inside done() so C continues to exercise, matching C order. No new imports (finish_losehp_done already statically imported at zap.js:285); no DIAG/FORCE/seed gates; Rule #2 clean.
**Verify:** `node scripts/verify.mjs --fn can_make_bones,maybe_destroy_item` → `PASS syntax 1 changed js file(s)` · `PASS rule2` · `PASS hidden verify can_make_bones: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (Barbarian-94326 PASS) · `PASS reach can_make_bones` (80/80 spread, 0 regressed) → REACH-OK · `note hidden verify maybe_destroy_item: no corpus session blocked on it at baseline` (writer, not owner) · `PASS reach maybe_destroy_item` (10/10, 0 regressed) → REACH-OK · `PASS green 2/2` + strict ×2 · `PASS cohort 7/7` · VERIFY: PASS. Full `sessions` forced post-change: 44/44. New test: «expected rn2(1)=0, actual rn2(2)=1» at 3764 pre-fix → PASS post-fix (aligned triple 3763–3765).
**Named:** none in maybe_destroy_item (the drain+bail is the ESM noreturn adapter at the C-noreturn position; AD_COLD/AD_FIRE/AD_ELEC + chargeit + cnt + potionbreathe + worn/wand + useup + dmg/xresist tail all whole).
**Next:** regen drops the can_make_bones row (0 blocked). File-wide follow-up, not this cliff: no zap.js losehp site drains finish_maybe_wail on survival (C hack.c:4290 wails when n>0 && uhp*10<uhpmax; message-only, moves-gated) — sweep if a session implicates it.
