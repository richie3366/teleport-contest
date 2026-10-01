# Review 2169 — 6b304d1a2 — iter_mons splice-safety

SHA `6b304d1a2`, D-3209; 2026-10-01; `js/mon.js` (+5/−3) + new
`scripts/iter-mons-splice.test.mjs` (2 tests). Single-function
Must-fix closing review 2162 (savebones removal-skip).

## Metadata

- Subject: "`mon.c` iter_mons splice-safety (review 2162
  savebones removal-skip) (D-3209)".
- Promises: walk `[...(game.fmon || [])]` as C's mtmp2 chain;
  visit-time DEADMONSTER + mon_offmap kept; JSDoc corrected; no new
  edges; name/signature unchanged.

## Intent vs deliverable

Kept. One-line loop change plus a corrected JSDoc and a 2-case
regression test. The false "no nmon unlink hazard" rationale is
gone, replaced by a citation of the splice hazard and the snapshot.
No other JS touched; no import changes at all.

## Inventory — iter_mons

Changed in place: `js/mon.js:2973–2981` (same export, same async
signature). No new/deleted symbols — no `sym.mjs` output required
(the method requires it only for deleted or re-pointed symbols;
neither occurs). Callers: the sole JS caller is
`js/end.js:1685` (`await iter_mons(remove_mon_from_bones)` — the
fixed call); `get_iter_mons*` in dig/dokick/monmove/teleport are a
different C function, untouched. All LIVE, no clones, no STUBs.

## C ↔ JS fidelity — iter_mons

C `mon.c:4526–4538` (csym range, body read): `mtmp2 = mtmp->nmon`
cached before the callback; `DEADMONSTER || mon_offmap` skip at
visit time; then the callback. JS: snapshot array (≈ the cached
chain), `(mhp|0) < 1 || mon_offmap(mtmp)` at visit time, then
`await vfunc(mtmp)` ✓.

Snapshot ≡ mtmp2 chain on every reachable callback: (a) removal —
`mongone` zeroes mhp (test asserts `b.mhp === 0`), so a spliced
later mon also fails the visit-time DEADMONSTER check in JS, exactly
as C's unlinked mon drops out of the cached chain; (b) insertion —
C-created mons prepend to fmon ahead of the walk, unvisited, same
as a pre-taken snapshot. The one theoretical divergence (a callback
unlinking a *later* mon without killing it) has no live instance:
of C's 12 call sites only savebones' callback unlinks, and it goes
through mongone. The D-log's "matches C for both removal and
insertion" holds; the falsifier from review 2162 (two adjacent
qualifying mons at bones time) is now covered by test 1
(`seen [1,2,3]`, `fmon [c]`). Test 2 pins visit-time dead/offmap
skip. Ran: 2/2 pass.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. The JSDoc line-range cite (`:4526–4538`) matches csym; the
"Named: none — whole 13-line C body live" claim is accurate.

## Density

Must-fix ships alone per §2b. One 13-line C function, whole, with
its own Ledger entry and Verify lines.

- Ledger: iter_mons ported — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify iter_mons: baseline 6b304d1a2~1 (scoreboard at 8a149124b) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke iter_mons: no RNG-tagged reach; fixed smoke spread (24 run, 22.1s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note + REACH-OK, green/strict/cohort).
No REGRESSED session. The unit test covers what smoke cannot (two
adjacent mongone-qualifying mons at bones time).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
