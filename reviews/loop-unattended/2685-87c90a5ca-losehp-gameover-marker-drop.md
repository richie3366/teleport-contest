# Review 2685 — 87c90a5ca — losehp gameover marker dropped before done()

Metadata: SHA `87c90a5ca`, D-3821, cliffs row `timeout.c`
slimed_to_death writer (losehp→done protocol). JS: `js/hack.js`
(+5, marker set), `js/end.js` (+9, marker drop + two resets).
Test: `scripts/losehp-done-gameover.test.mjs`. Ledger rows applied
(`losehp` split, this SHA).

## Intent vs deliverable

Promise: JS losehp's sync bail marker (`gameover = true`) leaked
into `done(DIED)`, so savelife's `Monnam(u.ustuck)` named the
holder C calls "It"; drop the invented marker before
«You die...»/done. Claimed: 95231 → PASS. Diff actually does:
exactly that — one marker bit, set/drop/reset at three sites.
Match.

## Inventory

- `losehp` (js/hack.js:1948) — changed: records
  `_losehp_gameover` only when flipping gameover from false. C
  `hack.c:4255–4292` (csym): fatal arm sets killer, then
  `urgent_pline` + `done(DIED)` with gameover still FALSE.
- `finish_losehp_done` (js/end.js:2006) — changed: drops the
  marker (gameover false) before pline/done. C `end.c:1112–1117`
  (read): Die?-decline → savelife; `:749–753`: `Monnam(u.ustuck)`.
- `really_done` (js/end.js:1145) + `finish_losehp_rehumanize`
  (js/hack.js:1994) — changed: reset the marker (real gameovers).
  C `x_monnam do_it` requires `!program_state.gameover`
  (`do_name.c:863–865`, read). No new helpers, no re-points, no
  new edges — nothing for `sym.mjs` to resolve.

## C ↔ JS fidelity

The C protocol is: gameover FALSE from losehp through done()
until `really_done` sets it; x_monnam's do_it (the "It") is gated
on `!gameover`. JS's sync split needs the bail marker between
losehp and the finisher, and this SHA confines it to exactly that
window: set only on a false→true flip (a pre-existing real
gameover never arms it); dropped before «You die...»/done so
done() — bot, Die?, savelife — runs on C state; cleared without
clobber on the two real-gameover paths (really_done,
rehumanize-death). Exhaustive writer check: the only `gameover =
true` writers are nethack_exit (terminal), really_done (resets
the marker), losehp itself, and dosave0 (terminal) — no real
gameover can sit under an armed marker. Callers between losehp
and the finisher still see gameover-true and bail as before
(unchanged). A marker leaking across a segment boundary is benign
(the finisher writes gameover=false over an already-false or
marked flag; really_done re-arms correctly). Named pre-existing
gap kept: plain `pline` vs C `urgent_pline` (`:4286`) — no corpus
row distinguishes it. No RNG; none added. Gap: none.

## Hallucinations / overclaim

None. Owner-vs-writer is right (slimed_to_death is the topline-
literal tie-break on a C comment; the writer is the protocol, and
it is untouched-owner). The temp-probe/state evidence (Blind,
canspotmon false, gameover true via maybe_destroy_item) plus the
stash-proven focused test pin the cause; no FORCE/DIAG survives.

## Density

Cliff-phase: row writer correct, protocol now C-exact on the
fatal path, whole-function scope is the losehp split
(hack.js+end.js) with its standing D-3105 shape. Ledger entry
applied in this SHA (`losehp` split). Verify bullet: 1 PASS +
REACH-OK + green + strict + cohort + full 44 (`--full`). Not
unreached: probe PASSES.

## Verification

js-hunk grep: clean. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify slimed_to_death,losehp --base
87c90a5ca~1 --reach-all` → `verify slimed_to_death: 1 PASS, 0
moved past, 0 unchanged, 0 worse → PROGRESS` (95231 PASS) and
smoke 24/24 REACH-OK; `verify losehp` vacuous at baseline (as the
D-log says) + smoke 24/24 REACH-OK. Exactly the D-log claim, zero
regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
