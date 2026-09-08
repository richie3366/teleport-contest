# Review 1052 — 4d63176a — use_container lknown pre-branch restore (D-2082)

## Metadata

- SHA: `4d63176a` — `pickup.c use_container lknown pre-branch was deleted by D-2028 (queue owner tipcontainer_gettarget) (D-2082).`
- JS diff: `js/pickup.js` +14/−4 (one import name, 5-line arm, comment cite fix).
- Docs: D-2082 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1052.

## Intent vs deliverable

Subject promises restoring the `lknown` pre-branch D-2028 deleted,
so held-box lock discovery sticks and the later tip menu keeps its
«locked» prefix. Diff does exactly that plus a comment cite
correction (`:2994–2999` → `:2992–2999`). Promise == diff; no scope
creep.

## Inventory

- Changed: `use_container` (pickup.js:3620+) — one restored arm.
- Added import `update_inventory`: `sym.mjs` → live sync export
  `js/invent.js:4067`; `imports.mjs --can pickup.js invent.js
  update_inventory` → ALREADY (same-SCC, call-time use, no TDZ).
  Both outputs pasted in-session.
- Diff grep: no `FORCE`/`DIAG`/seed reads, no RNG change.

## C ↔ JS fidelity

C `pickup.c:2985–3010` (read directly) is verbatim:

```c
if (!obj->lknown) { /* do this in advance */
    obj->lknown = 1;
    if (held)
        update_inventory();
}
if (obj->olocked) {
    pline("%s locked.", Tobjnam(obj, "are"));
```

JS restores the arm in the same position ahead of the `olocked`
check. The Hmmm/«turns out to be locked» variant is confirmed
floor-only — it is the `do_loot_cont` copy at `:2106–2111` (read
directly), so the corrected comment (Hmmm stays floor-only,
use_container always Tobjnam) is accurate. The arm adds zero RNG
draws and zero plines — pure discovery state plus a display
refresh. No gap found.

## Hallucinations / overclaim

None — the D-log openly reports `1 moved past, 1 worse →
REGRESSION` instead of hiding the worse row (adjudicated below).

## Density

14-line restore of a 5-line C arm in one function — the accepted
corpus-row exception.

## Verification

D-log Verify bullet: `verify --fn tipcontainer_gettarget` →
`0 PASS, 1 moved past, 0 unchanged, 1 worse → REGRESSION`
(Knight-92045 79→enlightenment@86, screens 91→92/94, RNG
2637/2637 held; Healer-92092 «WORSE now do_statusline2@58, was
130»). Re-measured myself:
`hidden-proxy.mjs verify tipcontainer_gettarget --base
4d63176a~1` → identical `0 PASS, 1 moved past, 0 unchanged,
1 worse → REGRESSION`. The worse row is NOT this port's wrong, by
three independent facts: (1) temporal impossibility from the
recipe itself — `show scen-wish-Healer-92092` moves show the
`^Wchest` wish plus `apap#tip` apply after the lembas meal, so
`use_container` on the chest first runs at steps 121+, and cannot
paint step 58; (2) the step-58 destination (do_statusline2, «This
lembas wafer is delicious!--More--» vs Satiated) is exactly the
lembas pair parked 2026-09-07 with its own causal account, a day
before this batch; (3) the arm has no RNG/pline surface. The drift
entered earlier in the batch (D-2080 re-runs clean with 0 worse,
so D-2081's display change is the candidate — a stale-baseline
blind spot, journal-noted). Knight, the session that actually
exercises this arm, moves strictly forward with RNG held. Rule #2
clean (prior step).

## Actionable C-wrongs

None. No Must-fix — attributing the Healer drift to this SHA
would be wrong attribution, and Healer@58 is already Parked with
a falsifier.

## Verdict

Verdict: **ACCEPT**
