# Review 2613 — 2ac3c17ec — zhitu tail drains finish_maybe_wail (D-3745)

Metadata. SHA `2ac3c17ec` (2026-10-09), D-3745, parent `8ea297770`.
js diff: `js/zap.js` +6/−1 (import `finish_maybe_wail` into the
existing hack.js block; `else { await finish_maybe_wail(); }`
after the fatal drain in zhitu's tail) +
`scripts/zhitu-wail-drain.test.mjs` (new, 1 it). Ledger: `zhitu`
ported (D-3745 appended). Works its HEAD's cliffs head
(`hack.c` maybe_wail, 3 blocked: 95415, 95305, 95342 —
verified in the parent queue).

## Intent vs deliverable

Promise (subject + D-log): all 3 probes are screen-first with
C emitting the low-HP wail where JS does not — zhitu's tail
ran `losehp` + fatal-only `finish_losehp_done` and never
drained the deferred `_needs_maybe_wail` flag (stuck from s361
through death on Monk; fired pages late on Barbarian). Drain
it in the non-fatal arm, C order. Claimed: maybe_wail 0 PASS +
2 moved (95415 → randomize_gem_colors@379, 95305 →
wiz_intrinsic@1153) + 1 unchanged (different writer) + 0
worse, REACH-OK, test 1/1.

Diff actually adds exactly the import + else-drain. Promise
and diff match. No signature change.

## Inventory

Changed JS function (1):

- `zhitu` — `js/zap.js:2111–2324` (tail :2309–2323). C:
  `zap.c` zhitu `:4401–4591` (ledger range), tail
  `losehp(dam, kbuf, KILLED_BY_AN)` `:4588` then return
  (verified in the printed body); `hack.c` losehp
  `:4255–4292` (`csym` range) with `maybe_wail()` in the
  `else if (n > 0 && u.uhp*10 < u.uhpmax)` survivor arm
  (~:4290; Upolyd twin `:4273`) and `done(DIED)` in the
  `u.uhp < 1` fatal arm.

## C ↔ JS fidelity

**Arm structure exact.** C emits the wail inside losehp iff
the hero survives with positive damage below 10% — the fatal
arm (`done(DIED)`, lifesave handled inside done) never wails.
JS: `losehp(...)` (sync, sets the deferred flag +
`_losehp_needs_done`) → fatal arm `finish_losehp_done()` →
else arm `finish_maybe_wail()`. The drain runs exactly when C
could wail (survived) and is skipped exactly when C never
wails (fatal, lifesaved or not) — including the
lifesaved-fatal case, where C's done() returns without
wailing and JS's `finish_losehp_done()` likewise skips the
drain. Order matches: wail before zhitu returns to
buzz/ubreatheu, as C emits inside losehp.

**`if (dam)` gate is wail-safe** (pre-existing D-0737,
re-proven): C's wail arms both require `n > 0`, so C
losehp(0) never wails — JS skipping the whole tail on
dam==0 cannot skip a wail. Named, correct.

**Callee.** `finish_maybe_wail` LIVE (`sym.mjs`:
`js/hack.js:1997` ASYNC — awaited correctly); joins the
existing `./hack.js` static import (`imports.mjs --can` →
ALREADY, verified — no new edge). The flag machinery
(`_needs_maybe_wail` set at hack.js:1931/:1956, drained at
:2000–2001 with early return when unset) is the established
oil pattern (D-3608/D-3611); this hunk extends it to the one
caller that lacked a drain. A concurrent stuck flag from an
earlier undrained hit drains at the current hit — C order
(C wails at each qualifying hit; post-fix no hit leaves the
flag set).

**Callers.** In-tail fix, no rewiring; buzz/ubreatheu inherit
it. The new test drives the exported `ubreatheu` on an
11/209 hero (flag drained + wail stamped; failed pre-fix on
the stuck flag) — a real-caller test, not a unit shim.

**Named omissions:** the `if (dam)` gate (proven safe above).
zhitu otherwise whole (ledger ported stands).

## Hallucinations / overclaim

None. The "stuck flag" mechanism was traced per-step
(Monk uhp=1/20 flag set s361→death; Barbarian one-screen-late
drain shifting pagination 5 screens). Diff grep: zero hits.
Rule #2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is maybe_wail (3 blocked, RNG
lost 63816); this commit ships the writer the divergences
name (zhitu's tail — both moved probes funnel through it:
goblin fire ray; priest-wrath lightning via buzz with
buzzer=0), whole for the reached path, and moves both. The
unchanged probe (Healer-95342, still maybe_wail@737) is a
named different writer with its Next pointer. One cliff, one
C locus, no bundling. Correct gates (green/strict/cohort +
neighbor tests 11/11; full skipped — zap.js not shared-gated,
and this audit's overlay re-runs it).

## Verification

D-log Verify: test 1/1 (failed pre-fix); `verify.mjs --fn
zhitu,maybe_wail` → zhitu note (writer, none blocked —
honest); maybe_wail 0 PASS + 2 moved + 1 unchanged + 0 worse
→ PROGRESS; reach 32/32 + smoke 24/24 → REACH-OK;
green/strict/cohort PASS.

Re-measured by this audit (`verify zhitu,maybe_wail --base
2ac3c17ec~1 --reach-all`; HEAD code includes D-3746):

```text
verify maybe_wail: 1 PASS, 1 moved past, 1 unchanged, 0 worse → PROGRESS
reach zhitu: 32 PASS, 0 regressed → REACH-OK
```

95305 → wiz_intrinsic@1153 lands exactly as claimed; 95342
is the named unchanged at the named step. Monk shows PASS
rather than the claimed randomize_gem_colors@379 — that is
D-3746's strictly-later contribution on HEAD code, and the
intermediate is independently corroborated: D-3746's parent
queue row (generated from this commit's scoreboard) cites
Monk blocked at step 379. 0 worse, 0 regressed. No vacuous
check (row cited 3; all 3 itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
