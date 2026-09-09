# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-09-09 — D-2172 `objnam.c` readobjnam wishing-abuse deny arm: quest artifacts skip the `rn2(nartifact_exist())` roll in C (`||` short-circuit), JS rolled unconditionally (Rogue-92221 PASS)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-09 — Audit D-2167…D-2171 (reviews 1133–1137) + cadence 44/44

3 ACCEPT (doopen_indir envelope, newman dead arm, exercise lifesave+blank paper), 2 ACCEPT-WITH-DEBT with review-pointed one-line debts (1136: domove_bump_mon uses do_name.js sticky-flat Hallucination instead of display.js D-1493 timeout-only; 1137: save.js:747 misses await on newly-async restore_waterlevel — sync-complete today, latent). Every D-log corpus claim re-measured via `hidden-proxy verify --base` — all reproduced (pick_lock 1 moved, newman 1 moved, exercise 1 PASS+1 moved, distfleeck 2 PASS+1 re-attributed+3 known-other-writer, goodpos same-step re-attribution with +23-draw prefix growth). Cadence: full sessions 44/44, Scr 11,405/11,405, RNG 792,838/792,838, speed 56+0.35/turn. Filled 6 missing Addressed short hashes from git log (D-2097/2099/2100 retire credits, D-1996/2020/2048 fix SHAs). No Must-fix (no QUALITY-RISK/REJECT); queue stays 8 Open, no refill.
**Next:** (see LOOP-QUEUE)
## 2026-09-09 — D-2171 `mkmaze.c` movebubbles/mv_bubble water cons pickup+deposit: arrival bubbles never deposited, C eel mnearto→goodpos rn2(13) had no JS counterpart (1 session moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-09 — D-2170 `hack.c` domove_bump_mon: m-prefix bump onto monsters printed swap/attack instead of Pardon/move-right-into (2 sessions PASS)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-09 — D-2169 `attrib.c` exercise row: lifesaved touch_artifact blast skipped `exercise(A_WIS,FALSE)` + blank-paper read took no time (1 PASS + 1 moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-08 — D-2168 `polyself.c` newman dead arm: urgent_pline + done(DIED) lifesave (row named newman; 1 session moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-08 — D-2167 `lock.c` doopen_indir !IS_DOOR envelope: Blind feel/see + mapseen/newsym + drawbridge/container (row named pick_lock; true writer measured, 1 session moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-08 — Audit b46928ff..fae41579 (reviews 1127–1132: 6 ACCEPT, 0 Must-fix) + cadence 44/44

Each of the 6 JS-touching SHAs (D-2161..D-2166) audited against pinned
C with csym ranges, sym resolution, imports rulecheck/cycle checks,
and hidden-proxy re-verify at --base HASH~1: all 6 D-log Verify claims
confirm PROGRESS (gulpmu moved, do_statusline1 moved, newmonhp moved,
maybe_destroy_item PASS, yn_function PASS, use_pick_axe moved 11→68;
the step-68 "js-throw" label is the owner-null fallback — show reports
kind=screen, error null). No C-wrongs, no hallucinations. Cadence: full
sessions 44/44 (Scr 11405/11405, RNG 792838/792838). Rule #2 clean.
Open queue at 9 rows, no refill owed.
## 2026-09-08 — D-2166 `dig.c` use_pick_axe: direction prompt listed `[kyu>]` instead of C `[yku>]` (1 session moved past)

**C locus:** 
**JS:** 
**Change:** 
**Verify:** 
**Next:** (see LOOP-QUEUE)
## 2026-09-08 — D-2165 `zap.c` zhitu ZT_DEATH: bounced death ray printed a spurious "You die..." before the wizard "Die?" prompt (1 session PASS)

**C locus:** `zap.c:4502–4509` (`zhitu` ZT_DEATH non-breath arm: `monstunseesu(M_SEEN_MAGR)`, killer `KILLED_BY_AN` + beam text, `ugrave_arise = NON_PM`, `done(DIED)` — no "You die..." pline; that pline lives only in `done_in_by` monster-kill and `zapyourself` self-zap `urgent_pline` paths), NOT `cmd.c yn_function` (`:5470–5583`, already faithful per D-1805 — JS reaches the same «Die? [yn] (n)» once the extra screen is gone).
**JS:** `js/zap.js` zhitu ZT_DEATH arm + header comment (`done` import; `losehp`/`finish_losehp_done` imports kept — other arms still use them).
**Change:** port the C arm in exact order — `monstunseesu(M_SEEN_MAGR)` (live import), killer format/name, `ugrave_arise = NON_PM`, `await done(DIED)`, `return` (lifesaved resumes `dobuzz`; `done` added to the existing static `end.js` import — edge already present, no new module, no TDZ: call-time use only).
**Verify:** `node scripts/verify.mjs --fn yn_function` → PASS syntax (1 changed js file: js/zap.js) · PASS rule2 (no fs/path/url/node: imports, no DIAG/FORCE/seed gates) · PASS hidden (scen-wish-Barbarian-92054: PASS) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · full skipped (no shared file changed). VERIFY: PASS. /tmp probes stay out of the repo per runbook.
**Named:** ZT_DEATH disintegration-breath arm (C zap.c:4465–4490: Disint_resistance, inventory_resistance_check, uarms/uarm destroy — no live JS imports; map-named in `turns.md` zap section).
**Next:** `dig.c` use_pick_axe (next Open row); queue 11→10, no refill owed (8–12 band).
