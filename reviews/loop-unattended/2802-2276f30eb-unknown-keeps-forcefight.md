# Review 2802 — 2276f30eb — Unknown keeps forcefight, F gate goes call-local

- **SHA:** `2276f30eb` (Wed 2026-10-14) — cliffs-head writer (D-3953).
- **D-entry:** D-3953. **Ledger:** `rhack` re-tagged ported.
- **Diff size:** `js/cmd.js` 2 lines, +2 tests.
- **Method:** cliff (≤10 fns) — whole Method on both lines + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: delete the house forcefight clear from the
Unknown arm (C keeps it) and read the F-prefix gate from call-local
`prefix_seen` instead of the persistent forcefight — healing the
F/b/F double-prefix lifecycle (7 PASS + 13 moved).

The diff is exactly those two lines. Promise and diff agree. This
commit fixes both C-wrongs of review 2797.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | Unknown arm: delete `forcefight = 0` | rhack bad_command :3833–3841 (no reset) | verbatim now |
| 2 | F gate: `prefix_seen?.txt === 'fight'` | rhack :3693 (call-local `prefix_seen`) | exact |
| 3 | 2 numpad-fight tests (double-prefix, unknown-stairs) | — | 0/1 pre → 5/5 post per D-log |

No helper, no import change, no symbol deleted or re-pointed.

## C ↔ JS fidelity

**Line 1.** C `:3833–3841` (verified in review 2797) touches only
the message, the two queues, the sanity skip, move, and multi —
forcefight survives. Deleting the clear line makes the arm verbatim
except the two remaining house extras (`end_running`,
`command_count`/`_repeat_search`), which are now explicitly Named
(see below).

**Line 2.** C `:3693` fires on the call-local `prefix_seen` (set
when a PREFIXCMD runs, NULL on the next call). JS `prefix_seen` is
`let`-declared at rhack :5519 — call-local ✓ — and the F arm sets
`ext_func_tab_from_txt('fight')` (:5927), so `prefix_seen?.txt ===
'fight'` is the exact locality. Lifecycle re-derived: F/b/F →
Unknown returns with forcefight set (line 1) → next call F runs
`do_fight` (verified = C :1621–1634, double arm Norep + clear +
CANCEL) → «Double fight prefix, canceled.» ✓; F/b/'>' → next call
has prefix_seen NULL → gate off → dodown runs ✓; same-call F+k →
bound-only gate still errors, naming `cmd_from_func('fight')` ✓.
The sibling `rhack_dispatch_bound` gate (:2818) already took
call-local prefix_seen as a parameter — no gap, no double-fire.

**Named deviations (map, not Must-fix).** (1) The Unknown run-clear
genuinely differs from C (C's bad_command never clears
`context.run`, and `reset_cmd_vars` :3606–3624 — which does — is not
called there): C g+unbound+movement would rush, JS walks. It is
explicitly Named with the no-session justification, and it keeps
the persistent-read rush gate from over-firing — a compensating
pair, both documented. (2) Nested m,F naming — pre-existing, no
session. Neither is reachable by any corpus session; neither is
queued.

Diff grep: no banned patterns (2-line diff, read whole). Rule #2
clean (iteration-wide, SHA 2796).

## Hallucinations / overclaim

None. "do_fight itself is whole and faithful" re-verified
(js/cmd.js:712 = C :1622–1634 arm-for-arm). The "nested F,g,k names
'g'" side effect follows from the shared `prefix_seen` write in the
g/G arm.

## Density

Cliff discipline holds: one writer, two lines, the probe row fully
cleared (0 blocked in the working board). Closes the debt of review
2797 items 1–2 — no Must-fix was queued for them precisely because
this child already carried the fix; this review verifies it landed
C-exact.

## Verification

Re-measured myself
(`verify do_fight --base 2276f30eb~1 --reach-all`) — reproduces the
D-log **exactly**:

```
verify do_fight: 7 PASS, 13 moved past, 0 unchanged, 0 worse → PROGRESS
smoke do_fight: 24 PASS, 0 regressed → REACH-OK
```

All named landings match (Archeologist-50155056 PASS,
Monk-50059064 35→464, Tourist-50059053 102→387). No REGRESSED
session.

## Actionable C-wrongs

None — the two lines this commit changes were themselves the two
C-wrongs of its parent, and both now match C.

Verdict: **ACCEPT**
