# Review 2733 — 8b0e83ff0 — shk_move :4960 Invis flat → live (D-3873)

## Metadata

- SHA: `8b0e83ff0` (cliffs-head writer port)
- D-entry: D-3873; Ledger: `shk_move ported`
- js diff: `js/shk.js` (1 predicate + 8-line comment) + test
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: shk_move's `:4960` Invis read used the stale
`u.Invis` flat and missed the worn-ring extrinsic; switching to live
`Invis()` moves Caveman-582707 658→723.

The diff actually adds: exactly that predicate swap
(`u.Invis` → `Invis()`) with a macro-locus + flat-staleness comment.
The import is pre-existing (`shk.js:129`); no new edge. Promise ==
deliverable.

## Inventory

- `shk_move` (`js/shk.js:4628`, async) — `:4638` predicate only.
  No symbol deleted or re-pointed: `Invis` is the live
  `js/timeout.js:1752` export, already imported and already used at
  `:913`/`:964`/`:968` — the fix aligns the odd site out with the
  file's own convention (no `sym.mjs` re-point paste required).

## C ↔ JS fidelity

C loci, read from pinned C: `shk.c` shk_move `:4960`
(`if (Invis || u.usteed) avoid = FALSE`) with `Invis` the live
`youprop.h:195–198` macro (`HInvis`/`EInvis` from `u.uprops[INVIS]`,
`Invis = (HInvis||EInvis)&&!BInvis` — verified by direct read). Sole C
caller `monmove.c:1807`, pre-wired in JS. JS `Invis()` (timeout.js)
computes `(H||E)&&!B` from flats + uprops incl. the mummy-wrapping
B-arm (C `worn.c:39` W_BLOCKS) — the faithful live read; the `u.Invis`
flat is synced only by the magic-trap toggle (D-1999), unset here
while uprops carries extrinsic 131072 (measured live). With Invis TRUE
both sides now take the `:4960` skip to silent move_special appr=1 —
the satdoor appr=0 draw path (3 pick_move draws) correctly closes.

RNG walk: the divergence was C `rn2(5) @ distfleeck` vs JS `rn2(1) @
pick_move`, matching at global prefix 25442 before the fork — the
predicate swap re-aligns the stream exactly there (test pins prefix >
25442). No other draws on the arm.

## Hallucinations / overclaim

None. The diagnosis is temp-probe measured (shk/pristine/at-door,
hero on-line, uprops extrinsic, both sides' draw logs) and all probes
reverted. Standing-latent list (pri_move, pay_for_damage,
u_entered_shop) is correctly disclosed as NOT in this unit with a
no-sweep-without-probe note. No markers in the hunk; Rule #2 clean
(review 2727 scan).

## Density

Cliff-head writer port with movement (distfleeck row's writer;
distfleeck itself correctly not re-ported — briefed whole per its
parked tag). One cliff, code + ledger + verify in one handoff; full
`sessions` forced. `Ledger: shk_move ported` — single entry, right
owner.

## Verification

Re-measured by this audit
(`verify shk_move,distfleeck --base 8b0e83ff0~1 --reach-all`):

- `verify distfleeck: 0 PASS, 1 moved past → PROGRESS`
  (Caveman-582707: 658 → cursetxt@900; ship-time claim was 658→723 —
  the session now stands further because SHA8 `dba0c82b0` moved it
  past 723. The 658 block is gone on current code; direction
  confirmed, no WORSE.)
- `verify shk_move`: vacuous (0 blocked — expected; D-log said so).
- `reach distfleeck: 1190/1190 PASS, 0 regressed → REACH-OK`
  (full spread; stronger than the ship-time 80).

No REGRESSED session. The movement claim is confirmed on current code.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
