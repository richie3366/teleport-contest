# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

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
