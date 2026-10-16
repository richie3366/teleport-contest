# Review 2847 — 7847e3f76 — to-nowhere portal migration reads the jingle-N rule

## Metadata

- SHA: `7847e3f76ae3fcf999c4066ee0255669dfd89c16` (D-4003)
- Cliff writer: `distfleeck` head, 3 blocks (1 PASS + 2
  own-writer no-movement)
- js/ diff: `js/teleport.js` +30/-2 (tolev===-1 gate in
  `migrate_to_level`); new
  `scripts/migrate-to-nowhere-portal.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: a genesis ghoul stepping on a wizard-wished
to-nowhere MAGIC_PORTAL (dst {-1,-1}, never assigned by
wizterrainwish) diverged because C's `ledger_no({-1,-1})`
reads `svd.dungeons[-1].ledger_start` OOB — bytes that are
`svc.context.jingle[0..3]` on the pinned recorder — while JS
`ledger_no` returned literal -1 and panicked. When
`tolev===-1`, compute N from the live tune exactly per C's
`(xint16)(-1 + LE32)` and migrate-or-panic identically.

Diff actually: the gate + a 19-line C-citing comment +
`destLedger` threading. Promise == diff.

## Inventory

- `migrate_to_level` tolev===-1 gate (`js/teleport.js:2954-2979`,
  C `dog.c:887-932` via ledger, formula `dungeon.c:1374-1379`,
  call `teleport.c:2088`): jingle-N rule added.

## C ↔ JS fidelity

- Mechanism ✓ — C `ledger_no` (`:1374-1379` read):
  `(xint16)(lev->dlevel + svd.dungeons[lev->dnum].ledger_start)`;
  C `mlevel_tele_trap` (`:2082-2088` read): `assign_level(&tolevel,
  &trap->dst)` then `migrate_to_level(mtmp, ledger_no(&tolevel),
  …)`. With dst {-1,-1} the OOB read is real C behavior on the
  judge's binary, not UB to dodge — modeling it from the
  adjacent live state is the faithful port.
- Offset math ✓ (independently verified) — compiled a probe
  against pinned headers: `sizeof(instance_globals_saved_c) =
  704 (0x2c0)`, `offsetof(context.jingle) = 696`,
  `sizeof(dungeon) = 92`, `offsetof(ledger_start) = 84`.
  `dungeons[-1].ledger_start = svd-8 = svc+696 = jingle[0..3]`
  given the nm adjacency the D-log cites; the end-to-end PASS
  (1243 steps incl. post-migration play) plus the three
  kept panic sessions behaviorally corroborate the adjacency
  half I did not re-run nm for.
- Formula exact ✓ — C loads 4 bytes as LE int, adds dlevel
  (-1), keeps low 16, sign-extends. JS `(b0 + (b1<<8) - 1) &
  0xffff` + sign fix is algebraically identical (bytes 2-3
  truncate away, so stale tails cannot matter; an int load
  means no char-signedness trap). `music.c:741-747` (read)
  writes notes directly into `svc.context.jingle` with NUL at
  `[notecount]`, notecount 1-5; JS `improvised_notes`
  (`music.js:388-403` read) mirrors bytes 0-1 exactly
  (absent byte ≡ NUL), `NOTES` ASCII A-G, Unchanging arm
  equivalent (`length > 0` ≡ `[0] != '\0'`). Never-played →
  BSS zeros → N = -1 → the C-identical panic (message pinned
  by the test).
- Persistence ✓ — `serContext` (`save.js:338` read) round-trips
  the whole context object and `jingle` is not in
  `CONTEXT_LIVE_KEYS` — the tune survives save/load as C's
  `Sfo_context_info` does.
- Reachability ✓ — JS `ledger_no` (`dungeon.js:1119-1122`
  read) yields -1 for {-1,-1} (missing dun → 0 + -1); all
  other JS call sites (dig/mklev/dog/shk/muse/mon/wizcmds —
  enumerated) pass `ledger_no` of valid levels, `+1`, or
  stairs destinations. The gate is additionally correct for
  *any* {-1,-1} input (C reads the same bytes regardless of
  caller), so the claim is robust beyond the enumerated sites.
- N=64 → (dnum 3, dlev 3) ✓ — pinned by the passing test
  (`mux`/`muy` asserts) and corroborated by the full session
  PASS (a wrong destination or a wrong panic would diverge
  within the remaining 441 steps).

Diff grep clean: the `0x53bdd0` addresses are C-layout
documentation in a comment, not game coordinates; no seed/
step/RNG-index reads — `game.context.jingle` is live game
state. Rule #2 iteration-wide clean (review 2844). No symbol
deleted/re-pointed.

## Hallucinations / overclaim

None. The "reachable only via to-nowhere dst" quantifier
holds for the enumerated call sites, and the gate's
correctness does not even depend on it. The hero-
`domagicportal` gap is named in the ledger omit (added to
the `migrate_to_level partial` row with a falsifier), not
buried.

## Density

Cliff writer on its HEAD's head: 1 PASS + 2 no-movement with
own writers named (couatl/guard, zapfest-miss — re-measure
shows them still blocked at the same steps/symptoms, so no
regression masquerading as stability). Ledger: single
`migrate_to_level partial` +D-4003 with the new omit.
Committed test re-run green (2/2).

## Verification

D-log: `verify distfleeck: 1 PASS, 0 moved past, 2 unchanged,
0 worse → PROGRESS`. Re-measure (`--base 7847e3f76~1
--no-reach`, HEAD code): **1 PASS, 0 moved past, 2 unchanged,
0 worse** — Archeologist PASS; Tourist-610081 still
distfleeck@s1734, Valkyrie-50650068 still distfleeck@s545,
symptoms identical. Exact match.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
