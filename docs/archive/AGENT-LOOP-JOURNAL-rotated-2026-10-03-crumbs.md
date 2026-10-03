# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-02 — D-3320 money_cnt first-stack trio (really_done + finish_paybill + set_apparxy rewires; impossible arm)

**C locus:** - `really_done`: nethack-c/upstream/src/end.c:1130–1590 whole body verified in C order (score block `:1316–1350`, `money_cnt` `:1322`); this iter changes only the `:1322` site.
**JS:** js/end.js:69 (import) :457 (marker) :1219 (really_done site) :1313–1330 (finish_paybill, impossible :1320–1321, site :1329); js/monmove.js:88–91 (import) :743 (marker) :1016 (site); scripts/moneycnt-trio-rewire.test.mjs (6 subtests: 3 first-stack incl. leading-zero-quan, 2 Xorn-arm live-site, 1 module-wiring).
**Change:** deleted both clones; extended the existing static shk.js edges (imports.mjs ALREADY both files) with `money_cnt`; one C-cite comment per site; `if (shkp) await impossible('finish_paybill: bad location <%d,%d>.', ox, oy)` in the off-map arm (live display.js export, printf shape per the :486–488 precedent) + doc retired to whole-body-live; pruned the orphaned end.js COIN_CLASS import (monmove.js keeps its live uses). Export names/signatures unchanged, so all callers stay wired. No DIAG/FORCE/seed gates; Rule #2 clean; no frozen files.
**Verify:** `node scripts/verify.mjs --fn really_done,finish_paybill,set_apparxy` → VERIFY: PASS. Tail pasted verbatim:
**Named:** - `really_done`: none new — pre-existing doc-named omissions stand (dumplog family incl. DUMPLOG second artifact_score; livelog/logfile/xlogfile; wait_synch/signals/exit_nhwindows; sound_exit; panic caller; done_stopprint raw_print path live).
**Next:** queue ships at 3 (fingers_or_gloves eat.js clone; a_monnam trap.js + hack.js clones). monmove.js `accessible`/`closed_door` local clones are leads for future brief-evidence rows, not rows yet.

## 2026-10-02 — Audit 2269–2275: review D-3311–D-3319 (7 ACCEPT) + full score

**Scope:** 7 js-touching SHAs since 2268 (D-3312/D-3314 docs-only, skipped): erinys-reset Must-fix, rush octet+idx, safeq quartet, alloc trio, mon sextet, fountain septet, fountain completion. Every verify re-measured per-function in one call each (incl. dryup 42/42, gush 24/24, mgender 90/90 real reach).
**Finding:** all ACCEPT, no Must-fix. 2266 erinys family closed (reset call + wording verified, probe passes). Deepest checks: set_levltyp target mkmaze.c:76–121 vs trap.js:881 (incremental-counts ≡ rescan disclosed; DB_ICE/EXTRA_SANITY gaps pre-existing, unobservable at these sites); money_cnt/a_monnam/fingers re-points land on exact live exports; eat/trap/hack clone divergences found while refilling → 3 Open rows (not Must-fix: outside reviewed SHAs).
**Score:** public 44/44 (Scr 11,405, RNG 792,838, `317+1.68/turn`); corpus 705/953, 0 losses/0 gains, `full: true`; held-out 15/44 (+0). Ledger: snapshot appended; 5 ported rows sampled via briefs, all correct (2 stale "no JS symbol" notes refreshed).
**Next:** queue head (really_done money_cnt twin); queue 3→6 after refill hunt (coverage 0, corpus queue 30→0 eligible, spoteffects park writer shipped).

## 2026-10-02 — D-3319 `fountain.c` completion septet (live set_levltyp rewires + 3 clone deletions + money_cnt first-stack fix)

**C locus:** - `dipfountain`: nethack-c/upstream/src/fountain.c:393–554 — Excalibur LONG_SWORD gate + wash/water_damage + rnd(30) switch; :442 `set_levltyp(u.ux,u.uy,ROOM)`; case-28 `money_cnt` (C hack.c:4513–4522 returns the FIRST coin stack).
**JS:** js/fountain.js (4 site rewires + 4 clone/helper deletions + 3 import adds + 3 import prunes + doc updates); js/do.js:2796 (analog→alias comment); scripts/fountain-rewire.test.mjs (9 subtests: 5 transitions incl LADDER-refusal + helper delegation, 2 first-stack, 2 live-name resolve).
**Change:** rewired all four sites + the helper to the live mkmaze.c `set_levltyp` export (js/trap.js:881); deleted the three clones (+ orphaned local `gloves_simple_name`) for the live `money_cnt` (js/shk.js:4767), `a_monnam` (js/do_name.js:1221), `fingers_or_gloves` (js/do_wear.js:3981) exports; pruned orphaned `FINGER`/`IS_SINK`/`objectNameStrs` imports; retired the header deferral + gush/helper/do.js analog comments. C proofs read this session: set_levltyp mkmaze.c:76–121, CAN_OVERWRITE_TERRAIN rm.h:320 (never LADDER/STAIRS at these sites → guards pass), money_cnt hack.c:4513–4522 (first-stack), do.c:420/427/433/442 + :482/486 (polymorph_sink + teleport_sink call set_levltyp — helper delegation covers both), Soundeffect sndprocs.h:272 empty-in-this-build (drinksink cases 11/12 omit stands, D-3318 precedent). imports.mjs: trap/do_name ALREADY; shk/do_wear IN-SCC hoisted cycle-safe.
**Verify:** `node scripts/verify.mjs --fn dipfountain,dryup,breaksink,gush,wash_hands,drinksink,dipsink` → VERIFY: PASS — syntax 2 files, rule2 clean, 7× hidden note (0 blocked, normal for coverage), REACH-OK each (dipfountain 14/14, dryup 42/42, gush 24/24, drinksink 6/6 reached; breaksink/wash_hands/dipsink smoke 24/24), green 2/2, strict 2/2, cohort 7/7, full 44/44 (auto: do.js shared). Focused `node --test scripts/fountain-rewire.test.mjs`: 9/9 (first run 8/9: unspotted a_monnam fixture returns x_monnam "it" — test expectation fixed, live export correct).
**Named:** - `dipfountain`: none in-body — whole C body live (retained pre-existing extra `looted=0` at the Excalibur site: C :443 clears flags only; dormant on ROOM, unobservable).
**Next:** 3 missing-arm rows queued (summing money_cnt twins: end.c really_done js/end.js:1225, shk.c finish_paybill js/end.js:1331, monmove.c set_apparxy js/monmove.js:1021 — same live js/shk.js:4767 rewire + whole-body brief-check each); sit.js:1084 money_cnt clone is already first-stack (dedup optional, no row); fountain.c now holds only parked drinkfountain.

## 2026-10-02 — D-3318 `fountain.c` septet (floating_above utrap-arm head + sink_backs_up FACE fix + 5 stale-complete)

**C locus:** - `floating_above`: nethack-c/upstream/src/fountain.c:21–32 — default umsg → `u.utrap && (utraptype INFLOOR||LAVA)` override + `surface(u.ux,u.uy)` → `You(umsg, what)`; 5 code call sites.
**JS:** js/fountain.js `floating_above` (:281–291), `sink_backs_up` (:350, FACE line :357); scripts/floating-above.test.mjs (6 subtests: default/INFLOOR/LAVA/PIT message arms + humanoid/jelly FACE forms; pre-fix run failed the 2 trapped arms, post-fix 6/6).
**Change:** ported the `:25–30` trapped arm in C order (default umsg → gate → override + `surface()` → `You(umsg, what)`); `sink_backs_up` Blind+Deaf arm now calls live `body_part(FACE)` (already imported). Added TT_INFLOOR/TT_LAVA to the const.js import + `surface` from sit.js (`imports.mjs --can`: same 102-module SCC, hoisted function, cycle-safe).
**Verify:** `node scripts/verify.mjs --fn floating_above,sink_backs_up,dowatersnakes,dowaternymph,dofindgem,watchman_warn_fountain,dogushforth` → VERIFY: PASS — syntax 1 file, rule2 clean, 7× (hidden note: 0 blocked; reach: no RNG-tagged reach, smoke 24/24 PASS → REACH-OK), green 2/2, strict 2/2, cohort 7/7, full skipped (no shared file changed). Focused `node --test scripts/floating-above.test.mjs`: 6/6.
**Named:** - `floating_above`: none in-body — whole C body live.
**Next:** remaining `fountain.c` ledger-unknowns need their own iterations: dryup/drinkfountain/dipfountain/drinksink/dipsink (large multi-arm bodies, unverified — each a future brief+verify); wash_hands (body complete but calls local `fingers_or_gloves` clone js/fountain.js:966 instead of live js/do_wear.js:3981 export — rewire or name); breaksink (set_levltyp inlined as typ+counts — prove equivalence with live js/trap.js:881 export or call it; shared file-level deferral with gush).

## 2026-10-02 — D-3317 `mon.c` sextet (mondied corpse-gate head + 4 stale-complete + pacify_guard split)

**C locus:** - `mondied`: nethack-c/upstream/src/mon.c:3252–3263 — mondead → lifesaved return → corpse_chance(mdef,0,FALSE) && (accessible(mx,my)||is_pool(mx,my)) → make_corpse(mdef, CORPSTAT_NONE); 15 code call sites.
**JS:** - `mondied`: js/mhitm.js:3980–3986 — gate added; doc now C-cites :3252–3263.
**Change:** ported the :3258–3260 gate in C order (corpse_chance first so its rn2 draws precede the gate exactly as in C, then accessible||is_pool) over live exports (accessible js/monmove.js:840, is_pool js/hack.js:2080; imports.mjs ALREADY on both edges — names added to the existing mhitm.js imports). corpse_chance defaults (null, false) ≡ C (0, FALSE); make_corpse default ≡ CORPSTAT_NONE; lifesaved check (mhp>0 ≡ !DEADMONSTER) kept. New focused test scripts/mondied-corpse-gate.test.mjs (STONE→none, ROOM→corpse, POOL→corpse; lizard keeps corpse_chance draw-free): 2 pass/1 fail pre-fix (STONE left a corpse), 3/3 post.
**Verify:** - `mondied`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `mondied`: none in-body — whole C body live (gate ported; callees live; corpse_chance/make_corpse defaults ≡ C args). C caller muse.c:1996 compiled out (#if 0).
**Next:** floating_above row stays Open (fountain.c trapped-arm port, surface live); queue sits at 1 until coverage regenerates or the next refill authorization.

## 2026-10-02 — D-3316 `alloc.c` trio (dupstr_n head by-design + fmt_ptr stale-complete + dupstr guard arm)

**C locus:** - `dupstr_n`: nethack-c/upstream/src/alloc.c:253–261 — inside `#if 0 /* suppress this … */` (:249–262); extern decl global.h:314; 0 call refs (brief ref scan: decl only).
**JS:** - `dupstr_n`: no symbol (by-design) — C `#if 0`'d out; nothing compiled to port.
**Change:** dupstr_n resolved by-design (compiled out — no symbol, D-3314 precedent); fmt_ptr stale-complete booking (no `js/` change); ported dupstr's guard arm into js/dungeon.js in C order (len → guard → copy) with the C-identical panic message via throw (insert_branch idiom). Single `String(s)` coercion — behavior-identical on all reachable inputs (probe 5/5).
**Verify:** - `dupstr_n`: hidden note (0 blocked — normal for coverage) · REACH-OK (smoke spread 24/24 PASS, no RNG-tagged reach).
**Named:** - `dupstr_n`: whole body — compiled out (`#if 0`); no scored caller.
**Next:** refill yielded 0 eligible (rows --write 0; hidden-proxy queue 30 shown, 0 not open/parked/archived; no Parked line names a concrete writer+session — falsifiers are multi-candidate or measurement-first; no new absent arm in this iter's briefs) — queue sits at 0 until coverage regenerates or the next refill authorization.
