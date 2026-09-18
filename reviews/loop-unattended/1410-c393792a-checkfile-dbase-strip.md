# Review 1410 — c393792a — checkfile dbase-side " (" strip (D-2451)

Metadata: SHA `c393792a`, `js/pager.js` only (+5/−1 in
`checkfile_split_names`). Prior review: 1402 item 1 (QUALITY-RISK
Must-fix). D-log: D-2451.

## Intent vs deliverable

Promise: truncate `dbase` at the first `" ("` (charges/`(lit)`/aum)
per C, placed after the named/called truncation. Diff actually adds
exactly that — `indexOf(' (')` + `qi > 0` slice — plus a doc-range
widening to `:944–981`. Nothing else.

## Inventory

- Changed: `checkfile_split_names` dbase arm only; alt arm untouched.
- No new functions/imports/edges; no deleted symbols.

## C ↔ JS fidelity

C `pager.c:971–975`:

```c
/* remove charges or "(lit)" or wizmode "(N aum)" */
if ((ep = strstri(dbase_str, " (")) != 0 && ep > dbase_str)
    *ep = '\0';
if (alt && (ap = strstri(alt, " (")) != 0 && ap > alt)
    *ap = '\0';
```

JS matches: first-occurrence `indexOf(' (')` = `strstri` on the
already-lowered string (lowering is pre-existing — the named/called
strips above already depend on it); `qi > 0` = `ep > dbase_str`;
placement after the `, `/named/called truncation mirrors C `:950–962`
preceding `:971–975`. The dbase-vs-alt strip order (JS does dbase
before the alt article strip; C does article `:967–970` first) is
immaterial — they mutate different strings. Alt ` (` strip pre-exists
below (`pi > 0` slice). No RNG, no branch reorder. Confirm.
Nit (not a C-wrong, no queue row): the new inline comment cites
`:977–981` for the charge strip, but the strip is `:971–975`
(`:977–981` is the fruit comment). Fix the cite next time `pager.js`
is touched.

## Hallucinations / overclaim

None. D-log admits 0 blocked / vacuous and leans on a purpose-built
probe (HEAD misses all three charged/lit/aum names, fixed tree hits)
rather than a corpus claim — honest.

## Density

Must-fix two-line repair: right-sized.

## Verification

- `hidden-proxy verify checkfile --base c393792a~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); smoke 24/24
  PASS, 0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None (behavior matches C; the `:977–981` cite slip is comment-only).

Verdict: **ACCEPT**
