# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-20 — D-2668 `sp_lev.c` get_table_region + intarray-entry unpacked ports wired into lregion/exclusion callers; same-file search_door + create_corridor

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2667 `objnam.c` paydoname whole-body restart (doname_base direct + BUFSZ-PREFIX guard, per-arm cites)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2666 `light.c` write_ls whole-body port (save pointer→id fixup + chain verification, wired into serLight)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2665 `selvar.c` selection_floodfill whole-body restart (generic C predicate replaces two clones)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2664 `artifact.c` invoke_create_portal whole-body restart (import hoist + per-arm cites)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-20 — D-2663 `worn.c` racial_exception race-vs-form fix (dead callee raceptr ported live)

**C locus:** ``nethack-c/upstream/src/worn.c:1359–1373`` (racial_exception) + callee ``mondata.c:1359–1365`` (raceptr: hero && !Upolyd → ``&mons[urace.mnum]``, else ``mtmp->data``) + ``is_elven_armor`` (obj.h:299–302; live js/worn.js:156) + callers ``worn.c:887`` (m_dowear W_ARM racialexception gate) / ``do_wear.c:2053`` (canwearobj which-gate) / ``polyself.c:1199`` (break_armor sliparm uarm).
**JS:** ``raceptr`` js/mondata.js:68 (+14 with cites); const import js/mondata.js:30 (+1 name); ``racial_exception`` js/worn.js:688 (restart, +8/-5 with cites); import js/worn.js:45 (+1 name). Durable test scripts/racial-exception.test.mjs (4 its: hobbit-hero race-not-form, non-elven refusal, poly uses form, monster + human-hero).
**Change:** new live ``raceptr(mtmp)`` export in C-home js/mondata.js with per-arm cites — hero idiom ``=== game.youmonst || _youmonst`` (worn.js:409 / mondata.js:142), ``!Upolyd(game.u)`` (polyself.js:735 precedent), ``mons(urace.mnum)`` race table; ``Upolyd`` joins the existing const.js import (same edge); ``racial_exception`` restarted in C order with ``:line`` cites reading ``raceptr(mon)``; ``raceptr`` joins the existing mondata import in worn.js (``imports.mjs --can`` ALREADY on both edges — no new edge; hoisted fns, no top-level TDZ read). ``mndx`` comparison kept: JS ``mons()`` returns fresh objects so C ``:1366`` pointer-compare ≡ mndx-compare. Export names/signatures kept.
**Verify:** ``node scripts/verify.mjs --fn racial_exception`` → VERIFY: PASS — syntax 2 files (js/mondata.js js/worn.js), Rule #2, hidden note (no corpus session blocked — normal for a coverage row), REACH-OK (no RNG-tagged reach; smoke 24/24, 0 regressed), green 2/2 + strict ×2, cohort 7/7. Full ``sessions`` 44/44 (mondata.js is shared). New test 4/4 (pre-fix run failed on the missing export; the hobbit-hero case returns 0 on the old body by construction — mon.data is the role form).
**Named:** none — every callee live; ``?.mndx ?? -1`` + ``mtmp?.data`` null guards are JS-only (C takes NONNULLARG12); the ``_youmonst`` disjunct is the established JS hero idiom, noted in-body.
**Next:** pop the next Open — coverage row.
## 2026-09-20 — D-2662 `spell.c` propagate_chain_lightning whole-body restart (live defended + join STALE park)

**C locus:** ``nethack-c/upstream/src/spell.c:951–1000`` (propagate_chain_lightning) + callees ``m_at`` (live js/mon.js) / ``resists_elec`` (live js/zap.js) / ``defended`` (live js/mondata.js:140) / ``CHAIN_LIGHTNING_POS`` (live local js/spell.js:1981) / ``zapdir_to_glyph`` + ``tmp_at`` (live js/display.js) + callers ``spell.c:1023`` (8-dir seed) / ``:1082`` (forward) / ``:1089`` (DIR_LEFT) / ``:1092`` (DIR_RIGHT2). Decisive C facts: step mutates the by-value copy ``:958–959``; ``!defended`` joins ``!resists_elec`` with short-circuit ``:975``; a resisted hit still enqueues (shield effect shows in zhitm) but with strength 0 ``:977–978``.
**JS:** ``propagate_chain_lightning`` js/spell.js:1995 (restart, +~20/-~15 with cites); import js/spell.js:163 (+1 line).
**Change:** restarted the function in C order with per-arm ``:line`` cites — ``defended`` joins the existing import set via new ``import { defended } from './mondata.js'`` (``imports.mjs --can`` SAFE: hoisted fn, same 98-module SCC, no top-level TDZ read); ``:975`` arm is now ``if (mon && !resists_elec(mon) && !defended(mon, AD_ELEC))`` with C short-circuit order; ``else if (mon) strength = 0`` restored to unbraced C shape. Local (C staticfn) name/signature kept.
**Verify:** ``node scripts/verify.mjs --fn propagate_chain_lightning`` → VERIFY: PASS — syntax 1 file (js/spell.js), Rule #2, hidden note (no corpus session blocked — normal for a coverage row), REACH-OK (no RNG-tagged reach; smoke 24/24, 0 regressed), green 2/2 + strict ×2, cohort 7/7. Tail pasted per rule.
**Named:** none new — every callee live; zhitm's own defended/shieldeff/``spell_damage_bonus`` omits stay named on their row (D-1400/review 360); ``| 0`` int casts + ``loc?.`` guards are the JS data-model idiom (C takes non-null).
**Next:** pop the next Open — coverage row.
## 2026-09-20 — D-2661 `mhitu.c` magic_negation intrinsic floor hero-polyform disjunct (review 1617 Must-fix)

**C locus:** ``nethack-c/upstream/src/mhitu.c:1089–1137`` (magic_negation), decisive arm ``:1126–1134``: ``else if (mc < 1)`` + one `if` — ``(is_you && ((HProtection && u.ublessed > 0) || u.uspellprot)) || (mon->data == &mons[PM_ALIGNED_CLERIC] || is_minion(mon->data))`` — so the aligned/minion disjunct reads ``mon->data`` even when ``mon == &youmonst`` (the hero's polyform). No RNG either side.
**JS:** ``magic_negation`` js/mhitm.js:2412 (floor arm :2465–2477, +7/-6 net); doc :2407–2409 (+2/-1).
**Change:** single C-order `if` with per-arm ``:line`` cites — ``const form = is_you ? (mon?.data ?? game.youmonst?.data) : mon.data`` (null is the JS hero-defender idiom; ``monsndx``/``is_minion`` are both null-safe, mondata.js:129 / monsters.js:615), then ``(is_you && (hprot…)) || (monsndx(form) === PM_ALIGNED_CLERIC || is_minion(form))`` — short-circuit order matches C. Export name/signature kept; no new imports (all names already in scope). Doc comment updated (floor reads mon->data on both paths).
**Verify:** ``node scripts/verify.mjs --fn magic_negation`` → VERIFY: PASS — syntax 1 file (js/mhitm.js), Rule #2, hidden note (no corpus session blocked — the C-wrong is a narrow polyform state no smoke session covers, per review 1617), REACH-OK (no RNG-tagged reach; smoke 24/24, 0 regressed), green 2/2 + strict ×2, cohort 7/7. Tail pasted per rule.
**Named:** none — every callee live (``protects`` D-2658); ``form`` fallback is the data-model adaptation (C ``mon->data`` with ``mon == &youmonst`` vs JS null hero idiom), noted in-body.
**Next:** pop the next Open — coverage row.
## 2026-09-20 — Audit 2a7efc6b..ff9ae02a (reviews 1613–1619: 6 ACCEPT, 1 QUALITY-RISK) + cadence 44/44

Review-only iteration (no js/ edits). Re-audited all 7 SHAs since 12de9b19 against pinned C with per-SHA `--reach-all` re-runs (all REACH-OK, no REGRESSED). Keep: review 1617 QUALITY-RISK — unified `magic_negation` splits C's single `:1130–1134` floor `if` into `if (is_you)/else if`, dropping the aligned/minion disjunct for hero polyforms (couatl/Aleax are M2_MINION + polyok; C gives mc 1, JS 0) → Must-fix prepended, Next cluster set. Cadence: public 44/44 (RNG 792,838/792,838, Scr 11,405/11,405, `83+0.53/turn` R² 0.79); held-out 11/44 unchanged (5,972 pts, RNG 26.7 %, screens 53.0 %); corpus 497/540 (92.0 %) +0/−0.
## 2026-09-20 — D-2660 `mon.c` mon_give_prop whole-body restart (live res_to_mr + format-arg Monnam order)

**C locus:** ``nethack-c/upstream/src/mon.c:1726–1774`` (mon_give_prop) + callees ``res_to_mr`` (prop.h; live js/worn.js:242) / ``canseemon`` + ``pline_mon`` (live js/display.js:62,7555) / ``Monnam`` (live js/do_name.js:1223) + callers ``mon.c:1823`` (mon_givit) / ``uhitm.c:3057`` (mhitm_ad_curs mhitu arm). Decisive C facts: pets-take-resists-only switch ``:1731–1756`` with ``default: return`` (break unreachable); ``intrinsic = res_to_mr(prop)`` ``:1757``; suppression tests ``mresists | mintrinsics`` (not mon_resistancebits — extrinsic-only still prints) yet still grants ``:1759–1767``; message gate is ``canseemon(mtmp) && msg`` with ``Monnam`` as a format argument ``:1769–1773`` (DISABLE/RESTORE_WARNING_FORMAT_NONLITERAL are compile-time only).
**JS:** ``mon_give_prop`` js/mon.js:2700 (restart, +~30/-~30 with cites); ``res_to_mr`` js/worn.js:242 export (+1 word); import js/mon.js:81 (+1 name).
**Change:** restarted the export in C order with per-arm ``:line`` cites — ``msg`` stays a ``'%s …'`` format string per arm; live ``res_to_mr`` (exported from worn.js — ``imports.mjs --can`` ALREADY, mon.js already statically imports worn.js, no new edge; ``res_to_mr`` joins the existing import at js/mon.js:81); suppression/grant gates C-ordered; tail is ``await pline_mon(mtmp, msg, Monnam(mtmp))`` (vpline expands ``%s`` — output-identical, C evaluation order restored). Export name/signature kept; async only because pline_mon must be awaited (C is sync void).
**Verify:** ``node scripts/verify.mjs --fn mon_give_prop`` → VERIFY: PASS — syntax 2 files (js/mon.js js/worn.js), Rule #2, hidden note (no corpus session blocked — normal for a coverage row), REACH-OK (no RNG-tagged reach; smoke 24/24, 0 regressed), green 2/2 + strict ×2, cohort 7/7. Tail pasted per rule.
**Named:** none — every callee live; ``mtmp.data?.mresists`` null guard is JS-only (C takes NONNULLARG1 with data assumed); ``switch (prop | 0)`` is the int cast; ``STONE_RES`` stays in the bulk const.js import (file idiom).
**Next:** pop the next Open — coverage row.
## 2026-09-20 — D-2659 `dogmove.c` dog_nutrition whole-body restart (oeaten/eaten_stat arm + C-exact switch and guards)

**C locus:** ``nethack-c/upstream/src/dogmove.c:156–214`` (dog_nutrition) + callee ``eat.c:3788`` (eaten_stat — scale base by oeaten/full, min 1; live ``js/mkobj.js:363``) + callers ``dogmove.c:232`` (dog_eat) / ``muse.c:2917`` (mon_consume_unstone) / ``uhitm.c:4556`` (mhitm_ad_dgst virtual corpse). Decisive C facts: msize ``default:`` falls into ``MZ_MEDIUM`` (×5) ``:180–183``; ``oeaten`` scales **both** meating and nutrit ``:194–197``; COIN guards are ``< 0`` (``:201`` → 1, ``:204`` → 0); the else arm is bare ``owt/20+1`` with no clamp ``:211``.
**JS:** ``dog_nutrition`` js/dogmove.js:341 (restart, +~45/-~30 with cites); ``MZ_GIGANTIC`` js/dogmove.js:335 (+4); import js/dogmove.js:11-14 (+1).
**Change:** restarted the export in C order with per-arm ``:line`` cites — single if/else-if/else with one tail return; corpse reads the ``mons[]`` table direct (helpers ``mons_cwt``/``mons_cnutrit`` kept with their JS-only fallbacks); exact ``switch`` with stacked ``default:``+``MZ_MEDIUM`` and file-local ``MZ_GIGANTIC = 7`` (monflag.h:183; monsters.js has no export — same precedent as js/insight.js:119); ``oeaten`` arm calls live ``eaten_stat`` (joins the existing mkobj.js import — ``imports.mjs --can`` ALREADY, no new edge); C-exact COIN ``< 0`` guards; clamp deleted from the else arm. Export name/signature kept.
**Verify:** ``node scripts/verify.mjs --fn dog_nutrition`` → VERIFY: PASS — syntax 1 file (js/dogmove.js), Rule #2, hidden note (no corpus session blocked — normal for a coverage row), REACH-OK (no RNG-tagged reach; smoke 24/24), green 2/2 + strict ×2, cohort 7/7. Probe /tmp/dogprobe.mjs: oeaten tripe ×6 → 600/1, gigantic ×2 → 400, unknown msize ×5 → 1000, coin 40000 → 2000/21, else owt 100 → 6/0 — all C order.
**Named:** non-corpse/non-else ``oc_nutrition`` still via the ``FOOD_NUTRITION`` name map (extractor omits it — pre-existing D-0364 state, same as eat.js); ``oc_delay ?? 1`` fallback for missing table entries (C table always present; JS-only guard); ``mtmp.data?.msize ?? MZ_MEDIUM`` null guard (C NONNULL).
**Next:** pop the next Open — coverage row.
## 2026-09-20 — D-2658 `mhitu.c` magic_negation whole-body port (canonical export + protects; mon-arm omits retired)

**C locus:** ``nethack-c/upstream/src/mhitu.c:1089–1137`` (magic_negation) + callee ``artifact.c:697–709`` (protects) + callers ``insight.c:1800`` (``magic_negation(&gy.youmonst)``) / ``uhitm.c:86`` (``armpro = magic_negation(mdef)``). Decisive C facts: hero side always ``continue``s past the protects() scan (``is_you || gotprot :1107``); mon side starts ``gotprot = (data == HIGH_CLERIC) :1097`` then scans ``W_ARMOR|W_ACCESSORY`` (+``W_WEP`` for weapons/weptools, SWAPWEP/QUIVER omitted, ART/ARTI left to protects()) ``:1111–1116``; ``via_amul`` is overwrite-per-worn-amulet (``else if``, not ``||=``); extrinsic ``+2`` amulet else ``+1``, cap 3, single increment ``:1119–1123``; intrinsic floor ``mc = 1`` for hero (HProtection+blessed / uspellprot) or aligned-cleric/minion ``:1126–1134``.
**JS:** ``magic_negation`` js/mhitm.js:2412 (+~70), delegates :2486/:2496 (+10/-52 net of the old split bodies); ``protects`` js/artifact.js:631 (+19); imports js/mhitm.js:17,89-91,109.
**Change:** new exported ``magic_negation(mon)`` (``js/mhitm.js:2412``) in C order with per-arm ``:line`` cites — null (JS hero-defender idiom) or ``game.youmonst`` takes the is_you path, else the mon path with ``monsndx(mon.data) === PM_HIGH_CLERIC`` (live mondata.js import; ``PM_ALIGNED_CLERIC`` joins the file PM idiom at ``js/mhitm.js:2400``); single C-order loop over hero ``game.invent`` / mon ``minvent`` nobj-chain (chain walked once — same order, no RNG/display either side); mon-only wearmask + live ``protects`` (new export ``js/artifact.js:631``, C ``:697–709``: worn oc_oprop==PROTECTION, ``list[ART_NONARTIFACT]`` identity per the touch_artifact precedent, cspfx-always/spfx-when-worn); same-edge import joins only (``protects``→artifact.js, ``W_ACCESSORY``/``W_WEP``→const.js, ``is_minion``→monsters.js — all ``imports.mjs --can`` ALREADY). ``magic_negation_you`` (``:2486``) and ``magic_negation_mon`` (``:2496``) become one-line delegates — names/signatures kept so all reviewed callers stay wired; no new call edges (reviews 1359/1361).
**Verify:** ``node scripts/verify.mjs --fn magic_negation`` → VERIFY: PASS — syntax 2 files (js/artifact.js js/mhitm.js), Rule #2, hidden note (no corpus session blocked — normal for a coverage row), REACH-OK (no RNG-tagged reach; smoke 24/24), green 2/2 + strict ×2, cohort 7/7. Tail pasted per rule.
**Named:** none — D-1405 mon-arm omits (amulet/protects/cleric·minion) retired by this port; C ``&mons[PM_X]`` pointer identity → ``monsndx`` mndx compare (data-model adaptation, noted in-body); hero ``gi.invent`` array vs mon ``minvent`` chain unified by one walk (order-identical, noted in-body).
**Next:** pop the next Open — coverage row.
