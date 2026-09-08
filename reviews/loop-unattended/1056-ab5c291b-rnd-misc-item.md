# Review 1056 — ab5c291b — rnd_misc_item See_invisible gate (D-2086)

## Metadata

- SHA: `ab5c291b` — `muse.c rnd_misc_item treated See_invisible as false (queue owner rnd_misc_item) (D-2086).`
- JS diff: `js/makemon.js` +9/−2 (local helper, 1-line gate, comment).
- Docs: D-2086 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1056.

## Intent vs deliverable

Subject promises the `See_invisible` predicate on the case-1
peaceful arm so the watchman draws C's `rn2(6)`. Diff adds a
file-local helper and wires the gate in C position. Promise ==
diff; no scope creep.

## Inventory

- Changed: `rnd_misc_item` (makemon.js) — one gate.
- New helper `See_invisible_misc` — a CLONE (local, not
  imported), not a no-op.
- `sym.mjs See_invisible` → NO export; 7 local clones in 7 files
  (mcastu/mhitm/muse/potion/sit/timeout/trap). This commit adds
  clone #8 — drift-debt, not wrongness (see below).
- `imports.mjs --can makemon.js muse.js` → same 90-module SCC
  (cycle alone not a blocker); the helper reads `game` at call
  time, no TDZ. Pasted in-session.
- Diff grep: no `FORCE`/`DIAG`/seed reads, no coordinates.

## C ↔ JS fidelity

C `muse.c:2678` (range `2654–2686` read directly) is verbatim:

```c
case 1:
    if (mtmp->mpeaceful && !See_invisible)
        return 0;
    return rn2(6) ? POT_INVISIBILITY : WAN_MAKE_INVISIBLE;
```

JS: `if (mtmp.mpeaceful && !See_invisible_misc()) return 0;` —
identical. The clone computes H||E per the C macro
(`youprop.h:148–153`, read directly: `#define See_invisible
(HSee_invisible || ESee_invisible)`) plus the `u.See_invisible`
sticky flat — the exact file idiom of the 7 pre-existing clones.
No canonical export exists to import, so a local clone follows
the codebase's own convention. Behavioral proof beats form: the
previously missing `rn2(6)` now draws positionally (matched RNG
15034→15152 per D-log). No other case arm touched. No gap found.

## Hallucinations / overclaim

None.

## Density

9 lines on one C arm — the accepted corpus-row exception.

## Verification

D-log Verify bullet: `verify --fn rnd_misc_item` → `0 PASS,
1 moved past, 0 unchanged, 0 worse → PROGRESS` (Ranger-92033
same-step re-attribution to selection_rndcoord) + green + strict
+ cohort + full 44/44 (shared file). Re-measured myself:
`hidden-proxy.mjs verify rnd_misc_item --base ab5c291b~1` →
identical, 0 worse. Claim reproduced exactly. Rule #2 clean
(prior step).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
