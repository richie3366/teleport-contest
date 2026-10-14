# Review 2807 — 7bbff459e — Delete the disp_ch stairs shortcut in getpos

- **SHA:** `7bbff459e` (Wed 2026-10-14) — queue-owner writer (D-3959).
- **D-entry:** D-3959. **Ledger:** `getpos` stays partial (D-3556 note).
- **Diff size:** `js/getpos.js` 1 hunk (−3/+9 with comment); +1 test.
- **Method:** cliff (1 fn) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: 4 symset sessions land the getpos `<` cursor
on a wall corner instead of the upstairs because the D-0408
`disp_ch === key` stairs shortcut matches the stripped RogueIBM
wall-corner carrier (0xBC → `<`); `x_monnam` is a literal-match
symptom owner (already whole, untouched) — delete the shortcut so
stairs match only via the terrain gate (2 PASS + 2 moved).

The diff is exactly the deletion plus the e2e pin. Promise and diff
agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | delete `disp_ch === ch` stairs shortcut | getpos.c:1073–1103 (no rendered-char consult) | anti-C removed |
| 2 | stairs via `terrain_matches_tags` (typ + seenv + ladder dir) | :1095–1103 seenv back_to_glyph arm | pre-existing gate |
| 3 | `getpos-angle-skips-wallcorner.test.mjs` (recipe replay to s6) | Healer-50155002 s6 | pins topline + cursor |

No helper, no import change, no symbol re-pointed. `x_monnam` /
`do_name.js` untouched as claimed (not in the diff).

## C ↔ JS fidelity

**C has no such shortcut.** Re-read `:1073–1103`: four per-cell
checks — glyph_at cmap-vs-`matching[]`, memory glyph
cmap-vs-`matching[]` (hero_memory, !terrainmode), `~` vibrating
square, seenv back_to_glyph cmap-vs-`matching[]`. Every compare is
cmap-index-vs-table; the rendered char is never consulted ✓. The
deletion removes code with no C counterpart — pure fidelity gain.

**Collision chain (verified end to end).** RogueIBM `S_brcorn:
\xbc` (dat/symbols:482) → JS strip `String.fromCharCode(c &
0x7F)` (display.js:3877) → `0xBC & 0x7F = 0x3C = '<'` → old
shortcut fired on wall corners ✓. Arithmetic exact, both ends
cited.

**Completeness after deletion.** Stairs still match through the
pre-existing gate: typ STAIRS/LADDER + seenv + `(ch=='>') ===
ladder-LA_DOWN` — the `:1095–1103` arm's shape (C matches the
back_to_glyph cmap, whose up/down identity likewise comes from
terrain state, and requires `seenv`) ✓. Ladders included via
typ LADDER ✓. Trap/remembered arms untouched (still
disp_ch-based — pre-existing, other tags, out of this SHA).

**Symptom-owner analysis (holds).** `x_monnam` occurs 0 times in
all of `pager.c`, so `self_lookat` (:108–130) cannot draw from it
✓ — the C draw is lookat-self, the JS draw was getpos
auto_describe; owner correctly left alone.

Diff grep: no banned patterns. Rule #2 clean iteration-wide
(review 2803). The test's `node:fs` import is test-only (reads the
corpus recipe), not scored `js/`.

## Hallucinations / overclaim

None. The "verify prints `js-throw` ... only as the owner-null
fallback label" note is accurate: I checked Wizard-50255035
myself — `error: null, jsPanic: null, kind: screen, owner: null`,
RNG 12731/12731 full match. No real throw (third instance of the
quirk this iteration, all confirmed benign).

## Density

Queue-owner discipline holds: the writer (getpos scan), not the
symptom (x_monnam), was ported; all 4 probe sessions move (2 PASS
+ 2 strictly later: 12→43, 5→356); Ledger re-tagged; no bundled
work. The Valkyrie landing on `dotravel@43` and the Wizard's
full-RNG screen landing are both strictly-later movement, not
no-movement.

## Verification

Re-measured myself (`verify x_monnam --base 7bbff459e~1
--reach-all`) — reproduces the D-log **exactly**:

```
verify x_monnam: 2 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
reach x_monnam: 7 PASS, 0 regressed → REACH-OK
```

No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
