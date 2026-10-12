# Review 2735 — 06a0192b2 — mfndpos Invis import (D-3875)

## Metadata

- SHA: `06a0192b2` (Must-fix, ships alone)
- D-entry: D-3875; closes review 2734 item 1 (QUALITY-RISK on `dba0c82b0`)
- js diff: `js/mon.js` (+3/−8 incl. comments/import) + 1 test
- Type: Must-fix latent C-wrong, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: delete the D-3874 inline Invis clone (missing the
BInvis mummy-wrapping arm), import canonical `timeout.js Invis()`,
re-point `monseeu` at `!Invis()`; latent fix, no movement claimable.

The diff actually adds: exactly that — one import line, one deleted
5-line inline + 6-line comment replaced by a C-cite comment, `monseeu`
now `!Invis()`, unused `INVIS` const dropped from the const.js import.
Promise == deliverable.

## Inventory

- `mfndpos` (`js/mon.js:3125`, sync) — predicate-only change inside the
  body; signature and callers untouched (C `mfndpos(mon, data, flag)`
  unchanged). No new function, no new helper.
- Classification: deleted symbol was a **CLONE** (5th Invis clone,
  inline); re-pointed to a **LIVE** callee — the canonical
  `Invis()` export (`js/timeout.js:1752`). Required `sym.mjs` paste:

```
Invis            js/timeout.js:1752   sync
         !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
           js/mhitu.js:265  js/potion.js:773  js/trap.js:4979  js/zap.js:744
```

The mon.js inline is gone; the 4 remaining clones are pre-existing in
other files (named, not touched — correctly out of scope for a
Must-fix that ships alone). `INVIS` no longer appears in `js/mon.js`
except inside `M1_SEE_INVIS` (const drop is clean, no dangling use).
- `--can` today reads `ALREADY: mon.js already statically imports
  timeout.js` — expected post-ship; the D-log records the pre-ship
  `SAFE` verdict (hoisted fn, runtime use only, shk↔timeout precedent).

## C ↔ JS fidelity

C loci: `mfndpos` body `mon.c:2139–2382` (`csym.mjs` range), monseeu
`:2261–2262` (`mon->mcansee && (!Invis || perceives(mdat))`), the
`:2339` NOTONL gate, `youprop.h:198` (live `Invis` macro
`(H||E)&&!B`), `worn.c:39` W_BLOCKS (worn MUMMY_WRAPPING on W_ARMC
blocks INVIS).

Branch-by-branch confirm of the re-pointed predicate:

- Old JS `__BInvis` read only `(game.u?.BInvis|0) ||
  (uprops[INVIS]?.blocked|0)` — no uarmc read. C-wrong exactly as
  review 2734 proved (worn wrapping + invis-from-another-source +
  desynced B → JS Invis=TRUE where C reads FALSE).
- New JS calls canonical `Invis()` (`js/timeout.js:1752–1759`):
  `H`/`E` from flats + intrinsic/extrinsic, `!BInvis()` where
  `BInvis()` (`:1739–1745`) returns true on flat/blocked **or** worn
  MUMMY_WRAPPING on `u.uarmc` — the missing arm, now live. Read the
  body this audit; it matches the review-2734 quote line for line.
- `monseeu = !!(mon.mcansee && (!Invis() || perceives(mdat)))`
  matches C `:2261–2262` operator for operator (`perceives` =
  M1_SEE_INVIS, `js/mon.js:265–267`).

No RNG in this predicate on either side; no branch order to walk
beyond the single `&&`/`||` chain, which is identical.

## Hallucinations / overclaim

None. The D-log says plainly that no corpus session reaches the
state and no movement is claimable; the Verify bullet reports the
vacuous hidden lines as `note` (not PASS) plus the pinning test
(red pre-fix 1/2 → green 2/2) and the reach lines. The "mirrors
verbatim" falsehood from D-3874 is corrected on the record, not
repeated. Diff grep for `FORCE|DIAG|getRngLog|fastforward|seed|gx|gy`
hits only the commit message's own "No DIAG/FORCE/seed gates"
sentence. `imports.mjs --rulecheck`: Rule #2 clean.

## Density

Must-fix, ships alone — correct density. One predicate, its test,
ledger + queue stamp in one handoff. The `Ledger: mfndpos ported`
line is unchanged (still the right owner). Standing latent flats in
other files (mhitm/mcastu/uhitm/D-3873 trio) are named as untouched
with "do not sweep" — right call for a one-item fix.

## Verification

Re-measured by this audit
(`verify mfndpos,m_move --base 06a0192b2~1 --reach-all`):

- `verify mfndpos`: 0 blocked — vacuous, as the D-log states.
- `smoke mfndpos`: 24/24 PASS → REACH-OK.
- `verify m_move`: 0 blocked — vacuous (both D-3874 probes already
  past m_move at this base), as the D-log states.
- `reach m_move`: 1120/1120 PASS, 0 regressed → REACH-OK (full
  spread; stronger than ship-time 80/80).

No REGRESSED session. This audit also re-ran the pinning test:
2/2 green. The D-log's "VERIFY: PASS" is accurate — every line
reproduced, none inflated into a corpus PASS.

## Actionable C-wrongs

None. The review-2734 C-wrong is fixed exactly as prescribed
(import, not a copied cloak arm).

Verdict: **ACCEPT**
