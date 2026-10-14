# Review 2798 — 0072e751e — Helmet_on drops the house find_ac (AC timing)

- **SHA:** `0072e751e` (Wed 2026-10-14) — cliffs-head writer (D-3948).
- **D-entry:** D-3948. **Ledger:** `Helmet_on` ported.
- **Diff size:** `js/do_wear.js` 2 deletions + cites, +1 test.
- **Method:** cliff (≤10 fns) — whole Method on the deletion + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: C `Helmet_on` never calls `find_ac`; deleting
both house calls (normal-path tail + null arm) keeps the stale AC:8
through the s486 completion and lands AC:7 at the turn end, taking
Healer-49956027 to PASS.

The diff deletes exactly those two calls and re-cites the doc
comment. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | null arm: drop `find_ac()`, plain `return 0` | `Helmet_on` :433–515 (no find_ac in body) | exact |
| 2 | known-tail: drop `find_ac()` | same | exact |
| 3 | doc comment `:434–515` + D-0810/D-3891 cites | — | cites check out |
| 4 | helmet-on-no-early-findac test (491-prefix pins) | — | mechanism pins AC:8@486 → AC:7@490, uac=7 |

No helper, no import change (`find_ac` import kept for the sibling
arms), no symbol deleted or re-pointed. `sym.mjs Helmet_on`: single
local in js/do_wear.js:1311 — correct shape for a C staticfn.

## C ↔ JS fidelity

C `Helmet_on` (`csym`: do_wear.c:433–515, 83 lines) is a helm switch
(FEDORA luck, plain-helm break group, CAUTION `see_monsters`,
BRILLIANCE `adj_abon`, CORNUTHAUM, OPPOSITE_ALIGNMENT with
FALLTHROUGH, DUNCE_CAP glow/curse/bknown + Hallu/giddy/makeknown)
plus the `:509–513` known tail and `return 0` — **no `find_ac`
anywhere**. The deletion is branch-exact. The surviving JS body
(js/do_wear.js:1311–1405) carries every C arm including the
o_id-parity neutral flip and the `h = u.uarmh` re-read after
`uchangealign`.

Callers: C's direct call is `set_wear` :1564 (`if (!obj ? uarmh …)
Helmet_on()` — the D-log's ":1556" is 8 lines off, cite drift, the
site is right) → js/do_wear.js:1802 ✓; the afternmv writer is the
`:2381` `ga.afternmv = Helmet_on` assignment → js/do_wear.js:3572 ✓
(takeoff-cancel identity checks :4131/:4181 untouched). No C caller
left unwired.

**Observation (no row):** C has a `default: impossible(...)` arm for
a non-helm otyp; JS has no default. A non-helmet cannot occupy the
helm slot, so the arm is defensive-dead — the "now whole" claim
stands for all reachable behavior.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2
clean (iteration-wide, SHA 2796).

## Hallucinations / overclaim

None. The "1 worse" in the ship Verify block is disclosed with a
stash A/B proof (byte-identical both ways, find_ac draws no RNG) and
attributed to D-3947's unclaimed drift vs the stale `960003e5b`
baseline — my re-measure against the immediate parent shows 0 worse,
confirming the attribution. The sibling `*_on` find_ac calls are
correctly left alone as separate C functions.

## Density

Cliff discipline holds: one writer, one deletion, probe session to
PASS, full `sessions` forced for the game-wide AC timing (44/44 per
D-log). The `verify Helmet_on` vacuous-note is disclosed, not sold
as a corpus PASS.

## Verification

Re-measured myself
(`verify do_statusline2,Helmet_on --base 0072e751e~1 --reach-all`):

```
verify do_statusline2: 1 PASS, 12 moved past (1 still do_statusline2 at a later step), 8 unchanged, 0 worse → PROGRESS
verify Helmet_on: no corpus session blocked (vacuous, disclosed)
smoke ×2: 24 PASS, 0 regressed → REACH-OK
```

Probe Healer-49956027: PASS ✓. The ship-time "worse" session
(Healer-50058517) moved 0→298 here — the drift never belonged to
this fix. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
