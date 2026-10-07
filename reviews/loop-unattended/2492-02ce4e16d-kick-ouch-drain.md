# Review 2492 — 02ce4e16d — kick_ouch fatal drain (D-3611)

- SHA: `02ce4e16da695545d11c20956bbc51792471afdc`
- Subject: cliffs-head kick_ouch: fatal kick losehp never drained done()
  (Healer-94086 → PASS) (D-3611)
- Type: cliff (1 C function), js +24/−5 in `js/dokick.js` + new test
- Prior reviews closed: none

## Intent vs deliverable

Promise: D-3608-verbatim oil drain at the kick_ouch losehp site + lifesave
continues to the hurtle check; Healer-94086 → PASS. Diff adds the drain, the
`finish_maybe_wail` name to the existing hack.js import, and a
`finish_losehp_done` end.js import. Matches.

## Inventory

- `kick_ouch` (`js/dokick.js:353+`) — changed, 1 site. C:
  `nethack-c/upstream/src/dokick.c:880-906` (`csym` range, body read).
- Import edge: `imports.mjs --can dokick end finish_losehp_done` →
  ALREADY (name added to an existing static edge — no new edge, despite the
  subject's "new end.js import" phrasing, which means the name).

## C ↔ JS fidelity

C :880–906: Ouch pline → exercise DEX/STR → isok/wake block → `!rn2(3)`
wounded legs → `dmg = rnd(CON>15 ? 3 : 5)` → losehp (noreturn on death, wail
on survival) → air/Lev hurtle. The drain sits exactly at the losehp position:
death drains done() and bails (C noreturn); lifesave clears gameover and C
continues to the :904–905 hurtle check — JS does the same. Note the old JS
(`if (_losehp_needs_done || gameover) return`) dropped done() *and* the
survival wail; the new else-branch restores the wail, so this also fixes the
survival path toward C. RNG order untouched (rn2(3)/rnd(5) precede losehp on
both sides). `await` on sync `losehp` is harmless. No helpers/clones.

Cheat grep: clean. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None material. The "new end.js import" wording is slightly loose (edge
pre-existed) but the parenthetical correctly claims cycle-safety, and
`--can` confirms ALREADY — the deliverable claim holds.

## Density

Cliff phase: one cliff, one function, probe moved to PASS. Per-function
verdict: kick_ouch — ACCEPT.

## Verification

Re-measured myself: `verify kick_ouch --base 02ce4e16d~1 --reach-all` →
Healer-94086 PASS, `1 PASS → PROGRESS`, reach 40/40, 0 regressed. Matches
the D-log exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
