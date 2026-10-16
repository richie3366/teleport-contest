# Review 2845 — 0bda6a2a2 — breamm aborts past fatal dobuzz where C never returns

## Metadata

- SHA: `0bda6a2a2a54f68608d8a2c7bee98084166c0e28` (D-4001)
- Cliff writer: `randomize_gem_colors` head, 2 blocks (1 PASS +
  1 named-writer no-movement)
- js/ diff: `js/mthrowu.js` +9/-1 (gameover gate + envelope
  doc); new `scripts/breamm-fatal-dobuzz.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: Tourist-50550074 kind=rng at step 999 was a single
insertion — JS drew one extra `rn2(3)` at `mthrowu.js:520`
(the `:1132` mspec gate) after a fatal dobuzz, because C's
`dobuzz → losehp → done(DIED)` never returns on a true death
while JS resumed into `nomul(0)` + the gate. Gate on
`gameover` → `return M_ATTK_HIT` before `nomul(0)`; no
`finish_losehp_done()` (done already ran inside dobuzz);
lifesave/Die?-decline clears the flag and falls through like C.

Diff actually: the gate + comment + one envelope-doc line.
Promise == diff.

## Inventory

- `breamm` fatal path (`js/mthrowu.js:519-525`, C
  `mthrowu.c:1092-1150` via `csym.mjs`, dobuzz `:1125-1128`,
  nomul/mspec `:1130-1136`): gameover gate added.

## C ↔ JS fidelity

- Fatal-path control flow ✓ — C runs `dobuzz`, then (only
  reachable via lifesave/Die?-decline) `gb.buzzer = 0`,
  `nomul(0)`, the `!utarget || !rn2(3)` mspec gate. JS now
  matches exactly: try/finally clears the buzzer, the gameover
  gate returns before `nomul(0)`, and a cleared flag falls
  through to `nomul` + gate like C's survived path. RNG
  call-for-call: the extra `:520 rn2(3)` (and its `rn2(18)`
  tail) no longer fires on true death — the measured insertion
  (JS 71596 vs C 71595 draws) is closed at its source.
- `return M_ATTK_HIT` ✓ — the breath landed; C's fall-through
  return is `M_ATTK_HIT` (`:1149`), and the `m_seenres`
  early-out is HIT too. On true death the value is moot (run
  ends inside the death sequence); on survival C and JS both
  continue into the gate.
- Rest of body (read, pre-existing) ✓ — `m_lined_up`,
  `mcan` cough → MISS, `m_seenres` → HIT, `!mspec_used &&
  rn2(3)`, `BZ_VALID_ADTYP`, breathes pline, `8 + rn2(18)`,
  AD_SLEE `rnd(20)`, pet hunger, else-MISS, fall-through HIT —
  all in C order with C call shapes. The `utarget` def and the
  `impossible` else / `Sleep_resistance`-flat / Soundeffect
  notes are pre-existing and disclosed (D-log Named).
- Callers: C `--callers` lists `mhitm.c:549` and
  `mthrowu.c:1277` (breamu); both wired per the envelope doc
  (`mhitm.js:6455`, `mthrowu.js:544`) — unchanged, no rewiring
  needed for a mid-body gate.

Diff grep clean; Rule #2 iteration-wide clean (review 2844).
No symbol deleted/re-pointed — no `sym.mjs` paste required.

## Hallucinations / overclaim

None. The "no finish call" reasoning is sound and evidenced
(C `can_make_bones rn2(1)` matched, all 1048 screens incl. the
death sequence — done demonstrably ran). The owner/writer
framing (concatenated-scorer misattribution to seg8's first
draw, D-3932/D-3897 pattern) is corroborated by the rng-diff.

## Density

Cliff writer on its HEAD's head: 1 PASS + 1 no-movement whose
writer (`hatch_egg` useup throw) was named in the commit and
shipped in the very next SHA (D-4002) — model no-movement
handling. Ledger: `breamm ported` +D-4001 (single-function
entry). Committed test re-run green (2/2).

## Verification

D-log: `verify randomize_gem_colors: 1 PASS, 0 moved past, 1
unchanged, 0 worse → PROGRESS` (50550074 PASS; 50056058
unchanged throw-void). Re-measure (`--base 0bda6a2a2~1
--no-reach`, HEAD code): **1 PASS, 1 moved past, 0 unchanged,
0 worse** — 50550074 PASS confirms the D-4001 claim exactly;
50056058 now `moved → goto_level at step 346`, which is D-4002's
fix (next SHA in this window), not D-4001 overclaiming —
attribution verified in review 2846.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
