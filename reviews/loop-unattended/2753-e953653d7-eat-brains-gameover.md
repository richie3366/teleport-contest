# Review 2753 — e953653d7 — eat_brains post-done gameover gates

- SHA: `e953653d7a06e53a0104bff81fa5b2f75e37da74`
- Subject: D-3897 randomize_gem_colors-row writer eat_brains (Arch-585426 FULL PASS)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3897` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: JS drew 5 extra post-done draws after fatal brainlessness
where C exits via `done(DIED)`; fix adds a gameover gate returning
`M_ATTK_MISS` after each of the three `done(DIED)` calls, moving
Arch-585426 to FULL PASS. Lifesave/wizard falls through per C.

Diff actually adds: `js/eat.js` — 3 identical 1-line gates + C-cited
comments in `eat_brains`. No new imports, no signature changes, no
other `js/` hunks, no symbol re-points.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `eat_brains` (js/eat.js:3543) | eat.c:602–754 (csym) | changed, 3 gates |

## C ↔ JS fidelity

C (`eat.c:660–723`, read in pinned C): three `done(DIED)` sites, each
with a post-done tail reachable only by surviving — `:673–675` rider arm
("life-saving needed to reach here" → exercise), `:704` Lifesaved arm
→ "still gone" pline, `:715–717` → wizard/explore INT boost. `done` is
NORETURN (extern.h:997), so a stood death draws nothing further.

JS gates: `if (game.program_state?.gameover) return M_ATTK_MISS;` after
each site. Survive path verified: `js/end.js:2321–2330` clears
`gameover=false` on lifesave/wizard decline, so the gates fall through
per C. Return-value path verified: the RNG-relevant caller
(`js/mhitu.js:2279–2281`) does `if (mhitu === M_ATTK_MISS) return;`
before the `adjattrib(rnd(2))` + `rn2(5)` losespells-gate + drain-gate
tail — exactly the 5 claimed draws, killed call-for-call. The other two
callers are draw-free after the call (mhitm stores hitflags;
uhitm only sets a skipdrin flag) — checked, no missed continuation.

Helper classification: no helpers added or re-pointed. The "mhitm_ad_drin
:3263" label in the subject is loose prose for the mhitu AD_DRIN caller
tail — the draws cited match mhitu.js:2283–2290, not a C-wrong.

Grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed/coords in `js/` hunk.

## Hallucinations / overclaim

None. The D-log discloses `verify eat_brains` as vacuous (writer, none
blocked) and claims movement only via `randomize_gem_colors` with the
D-3746 misattribution pattern explained — honest. The per-segment
attribution (607-draw matched prefix, 5 extra draws enumerated) is exact.

## Density

Cliff phase: `randomize_gem_colors` was the cliffs head; writer
`eat_brains` correctly ported instead of the misattributed owner.
`Ledger:` entry present. Established D-3732/D-3746 idiom, no bundling
(other done-noreturn sites explicitly left to their own falsifiers).
Not a no-op: `js/` diff + FULL PASS.

## Verification

D-log: `verify randomize_gem_colors: 1 PASS`, reach 80/80 spread, green/
strict/cohort, full public 44/44 forced. Audit re-measure (`verify
eat_brains,randomize_gem_colors --base e953653d7~1 --reach-all`):
Arch-585426 PASS; `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS`; reach eat_brains 28/28, reach randomize 1326/1326 (full,
`--reach-all`) → REACH-OK; eat_brains vacuous note re-confirmed. No
REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
