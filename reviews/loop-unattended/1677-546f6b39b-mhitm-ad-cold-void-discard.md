# Review 1677 — 546f6b39b — `uhitm.c` mhitm_ad_cold mhitu `(void)`-discard (D-2718)

Metadata: commit `546f6b39b`, D-2718, `js/mhitu.js` only (one-line behavior change + doc). Corpus-residual row (D-2425 W1, Healer-92107). No prior review claimed closed.

## Intent vs deliverable

Subject promises: discard the `destroy_items` return in the mhitu arm per C `:2661` `(void)` cast; doc cites the arm range and contract. Diff delivers exactly that — `mhm.damage += await destroy_items(...)` → `await destroy_items(...)`, plus the comment rewrite. Promise matches deliverable.

## Inventory

Changed JS: `mhitm_ad_cold_u` mhitu arm (one statement); doc comment. No imports added/removed; no symbols deleted or re-pointed.

## Callee closure

Required `sym.mjs` output pasted verbatim (no deletion/re-point — the callee was already imported; call shape changed):

```text
destroy_items    js/zap.js:1729   ASYNC — await required
```

Await discipline preserved (`await` kept, only the `+=` dropped) ✓. No STUB anywhere on the path.

## C ↔ JS fidelity

C locus read: `mhitm_ad_cold uhitm.c:2625–2681` (csym range). The three arms use three different return contracts, and the JS now matches all three:

- uhitm (`magr == youmonst`, `:2632–2646`): `mhm->damage += destroy_items(...)` — JS `+=` site untouched ✓.
- mhitu (`mdef == youmonst`, `:2647–2666`): `(void) destroy_items(...)` at `:2661` — JS now discards ✓. Guard `m_lev > rn2(20)` preserved verbatim; `orig_dmg` still passed (C passes the pre-arm damage) ✓.
- mhitm (else, `:2667–2680`): `+=` — untouched ✓.

RNG walk: `rn2(20)` draw order/count unchanged (the predicate still draws exactly once); the fix removes only the *addition* of the destroy count to `mhm.damage`. Mechanism is measured, not fitted: D-2425 instrumented evidence (JS `mdamageu(10+5)` after `losehp(2)`@maybe_destroy_item vs C `mdamageu(10+0)`, Δ5 = destroy total) — the hero already losehps inside `destroy_items`, so adding the return double-counts. C-derived.

Named omits (`monstseesu`/`monstunseesu(M_SEEN_COLD)`, same deferral as `elec_u`; `mhitm.js` monster-defender arms; no statusline re-port) are pre-existing and out of the row's scope — correctly not Must-fix.

## Hallucinations / overclaim

None. The single grep hit for DIAG/FORCE in the `js/` show is the commit message's own "no DIAG/FORCE/seed gates" disclaimer — the code hunk contains none. No seed/step/coordinate logic.

## Density

One-statement corpus-residual fix + contract doc, one module. Right-sized (C body is 57 lines but was already ported; this ships the one wrong operator).

## Verification

Re-measured per-SHA re-run (`verify do_statusline2 --base 546f6b39b~1 --reach-all`) — both lines, matching the D-log:

```text
verify do_statusline2: baseline 546f6b39b~1 — 4 session(s) blocked on it (4 at baseline, 1 in the working scoreboard)
  scen-poly-Healer-92107: moved → retouch_object at step 298 (was 126)
  scen-wish-Healer-92092: PASS
  scen-wish-Monk-92194: still do_statusline2 at step 88 [...]
  scen-wish-Tourist-91125: moved → lesshungry at step 162 (was 83)
verify do_statusline2: 1 PASS, 2 moved past, 1 unchanged, 0 worse → PROGRESS
smoke do_statusline2: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

The queue row cited the Healer-92107 block and it moved 126 → 298 (later owner `retouch_object`, a tagged archived row — disclosed in the D-log). No session worse. Genuine PROGRESS, not vacuous. Green/strict/cohort per D-log; Rule #2 clean (re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
