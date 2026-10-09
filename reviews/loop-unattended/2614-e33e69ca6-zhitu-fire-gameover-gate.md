# Review 2614 — e33e69ca6 — zhitu FIRE gameover gate before ignite (D-3746)

Metadata. SHA `e33e69ca6` (2026-10-09, HEAD), D-3746, parent
`2ac3c17ec`. js diff: `js/zap.js` +5/−0 in zhitu's FIRE arm
(`if (game.program_state?.gameover) break;` + C-cited comment)
+ `scripts/done-noreturn-gates.test.mjs` (+1 it). Ledger:
`zhitu` ported (D-3746 appended). Works its HEAD's cliffs head
(`o_init.c` randomize_gem_colors, 3 blocked: 95415, 95230,
95244 — verified in the parent queue; owner proven
already-whole per D-3241, so the writer is zhitu).

## Intent vs deliverable

Promise (subject + D-log): Monk-95415's seg0 diverges as
exactly one extra JS draw (`rn2(3)=2` ignite gate) after a
fully matched 37977-draw prefix — the boiling-potion death
("Killed by a boiling potion", zap.c:5781) runs
destroy_items → maybe_destroy_item → losehp → done, which is
NORETURN in C (exit), so C never reaches the ignite gate;
JS's done() returns and drew it. Gate it on gameover (D-3732
idiom). Claimed: randomize_gem_colors 1 PASS (Monk FULL
PASS, all 3 segments) + 2 unchanged (D-3733 C-crash voids) +
0 worse, REACH-OK, focused test 3/3, 44/44.

Diff actually adds exactly the gate. Promise and diff match.
No new import, no signature change.

## Inventory

Changed JS (1 site):

- zhitu FIRE arm — `js/zap.js:2144–2156` (gate at :2155).
  C: `zap.c` zhitu FIRE `:4421–4438` (verified in the printed
  body: `burn_away_slime(); if (burnarmor) { if (!rn2(3))
  destroy_items; if (!rn2(3)) ignite_items; }`); death path
  `maybe_destroy_item :5947–5948` (losehp then exercise) →
  `done(DIED)` → `nh_terminate` NORETURN (exit).

## C ↔ JS fidelity

**Gate placement exact.** C's ignite `rn2(3)` is sequenced
after destroy_items returns — on a fatal boil destroy never
returns (process exits), so the gate is unreachable. JS's
done() returns, so without the gate the dead hero draws the
ignite rn2 — the recorded extra draw. The gate sits between
the destroy block and the ignite gate, matching C's control
flow. `break` exits the switch into the existing post-switch
gate (`:2287–2288`, "destroy_items losehp→done noreturn skips
bolt losehp" — verified present), which returns before the
kbuf/losehp tail: no double-losehp, no post-mortem damage.
Lifesave-safe: a lifesaved boil leaves gameover false (done()
clears it), so the gate falls through and the ignite draw
happens exactly as in C (where the lifesaved process
continues into the ignite gate). The per-segment trace
(37977/37978, attributed tails agreeing call-for-call through
`can_make_bones`) proves the single-draw mechanism.

**Sibling arms** (re-checked, not trusted): COLD
(`if (!rn2(3)) destroy_items; break`) and LIGHTNING (same
shape — verified in the printed C body) have nothing between
destroy and the switch end, so the post-switch gate covers
fatal boils there with no new gate needed. ACID has no
destroy_items call (acid_damage/erode only). The D-log's
"need no gate" is proven by shape.

**Test.** The new `it` replays Monk seg0 and deep-equals the
JS RNG log against C's 37977 draws (failed pre-fix with the
exact extra draw named) — the strongest possible pin for a
one-draw divergence. Same helper/shape as the D-3732 its.

**Named omissions:** none new in the gated arm; other
destroy_items callers' post-fatal paths ship on their own
falsifiers (no session reaches a fatal arm there — honest
scoping, not a gap in this arm).

## Hallucinations / overclaim

None. The "concatenated scoring misattributes to the next
segment's first draw" is demonstrated (C seg1 rn2(2) vs JS
seg0-tail rn2(3)), and the D-3732 pattern reference is apt.
The 2 unchanged are the D-3733 C-crash voids (C SIGABRTs
identically — parked, unpassable by porting). Diff grep:
zero hits. No symbol deleted or re-pointed, so no `sym.mjs`
paste required. Rule #2: global re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is randomize_gem_colors (3
blocked, RNG lost 88388); this commit ships the writer its
probe's divergence names (zhitu's FIRE continuation — the
owner stands whole per D-3241, read not re-ported) and FULL
PASSes the passable probe. One cliff, one C locus, no
bundling. Correct gates (green/strict/cohort + full 44/44
run same-state).

## Verification

D-log Verify (`verify.mjs --fn zhitu,randomize_gem_colors
--base 8ea297770`): zhitu note (writer, none blocked —
honest); randomize 1 PASS + 0 + 2 + 0 → PROGRESS; reach
32/32 + 80/80 → REACH-OK; green/strict/cohort PASS; full
44/44 (`341+1.59/turn`).

Re-measured by this audit (`verify
zhitu,randomize_gem_colors --base e33e69ca6~1 --reach-all`;
HEAD == this SHA, so the re-run is exact):

```text
verify randomize_gem_colors: 1 PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS
reach zhitu: 32 PASS, 0 regressed → REACH-OK
reach randomize_gem_colors: 1000 PASS, 0 regressed → REACH-OK
```

Monk FULL PASS confirmed; the 2 unchanged are the step-0
C-crash voids. Full 1000-session randomize reach clean. No
vacuous check (row cited 3; all 3 itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
