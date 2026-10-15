# Review 2812 — 79d5417f0 — dip-clone getobj :2049 botl ordering

- **SHA:** `79d5417f0` (Thu 2026-10-15) — cliffs-head writer (D-3966).
- **D-entry:** D-3966. **Ledger:** `invent.c` (getobj family note).
- **Diff size:** `js/potion.js` 5 sites (+45/−24 across both dip clones); +1 test.
- **Method:** cliff (1 C ordering rule) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: 2 of 19 do_statusline2 sessions share one
writer — a failed #dip whose pick should repaint a run-stale status
(Tourist-50150002 s106 T:11→T:12, Samurai-50251007 s22 T:3→T:4).
Measured, not inferred: the stale steps follow travel-bump turns
(time_botl suppressed), the dip steps draw zero RNG, JS moves and the
formatter are already right — only the painted row is stale, because
the dip clones omitted C getobj `:2049` (`disp.botl = TRUE`). The fix
C-orders `:2049` in both clones across 5 pick sites. 2→PASS.

The diff is exactly the 5 reorderings. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1–2 | `getobj_dip` menu + letter paths: gold gate → `botl=true` → verify → EXCLUDE | invent.c getobj :1751–2089: gold gate :2003–2022, `:2049 disp.botl = TRUE`, verify :2054+, EXCLUDE/silly post-loop | C-exact order |
| 3–5 | `getobj_dip_ok` menu + gold-fallthrough + letter paths: same | same (`$`-without-gold falls through gate to botl+verify, as C) | C-exact order |
| 6 | `getobj-dip-botl.test.mjs` (stale T:3 → T:4) | Samurai-50251007 s22 | test-only |

No helper, no import change (`game` global), no symbol re-pointed
(`sym.mjs` not required). Clones stay clones (D-3386 clone-scoped
precedent, named) — no cyt import claimed. Diff grep: no banned
patterns. Rule #2 clean (2808).

## C ↔ JS fidelity

**`:2049` ordering (confirmed line by line).** C getobj (`csym`:
:1751–2089): the gold gate (`:2003–2022` — message+return only when
`otmp && obj_ok(otmp) <= GETOBJ_EXCLUDE`, else fall through) sits
above `:2049 disp.botl = TRUE; /* May have changed the amount of
money */` ✓, which sits above the verify (`:2054+` — `!otmp` →
"don't have that object", so bad letters repaint too ✓), with the
EXCLUDE→silly_thing check after the loop ✓. All 5 JS sites now read
gold-gate (null-safe) → `if (game.flags) game.flags.botl = true` →
verify → EXCLUDE/silly — the C order exactly, including "fires before
silly_thing" and the `$`-without-gold fallthrough (site 4) ✓. The
`game.flags` guard is JS-null-safety around a C-unconditional store —
harmless.

**Untouched drift (named, pre-existing).** `getobj_dip`'s letter-path
gold message ('You cannot dip that!') still contradicts C ('You cannot
dip gold.'); the menu paths match. Named as omit (1) with no session
evidence — the SHA reorders the line without widening the drift.
Not introduced here; not queueable from here.

**Unaudited siblings (named).** drop/wield/apply/takeoff getobj clones
not audited for `:2049` — named as omit (2), D-3386 precedent. Each
needs its own session evidence before a reorder; correct to leave.

## Hallucinations / overclaim

None. The stale-T mechanism is measured three ways (per-step C RNG,
truncated-runSegment JS probe, formatter probe), the allmain `:262–263`
suppression explains the staleness window, and the `verify getobj`
0/4 probe is disclosed with its own-writer attribution rather than
folded into the win.

## Density

One writer, whole across both dip clones (5/5 sites — a partial
reorder would have left the same bug one keypress away), Ledger
tagged, zero-RNG paint fix with a pre-fix-failing test. The 17
unchanged + 4 getobj sessions keep named writers. No bundled work.

## Verification

Re-measured myself (`verify do_statusline2 --base 79d5417f0~1
--reach-all`) on HEAD code:

```
verify do_statusline2: 3 PASS, 2 moved past, 14 unchanged, 0 worse → PROGRESS
smoke do_statusline2: fixed smoke spread (24 run, 20.4s): 24 PASS, 0 regressed → REACH-OK
```

vs the claimed 2/0/17. The delta is **later SHAs**, not overclaim —
the committed board *at* `79d5417f0` shows exactly the 2 claimed PASS
(Tourist-50150002, Samurai-50251007) with the other three still
blocked (options@101, questtour@518, shop@384 — the "was" steps above).
The extra PASS (options-Valkyrie) and moves (questtour 518→609,
shop 384→683) are D-3967/D-3968/D-3969's work, reviewed next. This
SHA's deliverable verifies exactly; 0 worse.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
