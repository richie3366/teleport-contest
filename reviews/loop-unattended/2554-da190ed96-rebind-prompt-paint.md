# Review 2554 — da190ed96 — handler_rebind_keys_add prompt paint (D-3679)

- SHA: `da190ed96f23f22a353774135332687a5cf1cf7c`
- Subject: `cmd.c` handler_rebind_keys_add prompt paint: pline→pgetchar needs the deferred-paint flush (Rogue-94391 → PASS) (D-3679)
- D-entry: D-3679. Type: cliff (head-row input-boundary paint, 2 sites).
- Diff size: `js/cmd.js` +10/-0; ledger D-tag; no test file.

## Intent vs deliverable

Promise: at both `pline("Bind which key? ")` → `pgetchar()` sites,
flush the staged topline and place the tty cursor after the prompt
before the blocking read (get_count/getlin/tty_yn precedent);
Rogue-94391 → PASS.

Diff actually does: exactly that — 7 added lines at the keyfirst
site (`:2304`) and 3 at the bindit site (`:2384`). Nothing else
in `js/`.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `handler_rebind_keys_add` keyfirst (`js/cmd.js:2455–2463`) | `flush_screen(1)` + `setCursor(16, 0)` between pline and pgetchar | `cmd.c:2303–2308` |
| `handler_rebind_keys_add` bindit (`js/cmd.js:2536–2540`) | same 2 calls | `cmd.c:2382–2388` |

No symbols deleted or re-pointed (pure insertion; `sym.mjs`
re-point check N/A). Helpers: `flush_screen` (pre-existing import,
`js/cmd.js:14` — no new edge, as claimed) and
`game.nhDisplay?.setCursor?.` (display-handle call, same shape as
the two get_count precedent sites below).

## C ↔ JS fidelity

C (`csym`: `cmd.c:2290–2405`; callers: decl `:142`, dispatch
`:2440` → JS `:2590`, pre-wired, unchanged):

- `:2303–2308` keyfirst: `if (keyfirst) { pline("Bind which
  key? "); key = pgetchar(); if (!key || key == '\033')
  return; }` — JS keeps pline/pgetchar/guard byte-identical in
  order and inserts only the paint flush between them.
- `:2382–2388` bindit: `bindit: if (!key) { pline(…same…);
  key = pgetchar(); if … return; }` — same treatment.
- No RNG in either arm (`rn2`/`rnd`/`d` count zero); RNG
  4796/4796 matched pre-fix, so a paint-only insertion cannot
  move the keystream. Confirmed branch order: no branch added,
  removed, or reordered.
- Cursor: `'Bind which key? '.length` is 16, matching the
  measured C cursor [16,0] — derived from the C literal (tty
  cursor advance), not a recorded coordinate. Precedent is
  exact: `js/cmd.js:5142–5143` and `:5816–5818` both do
  `await flush_screen(1); …setCursor(qbuf.length, 0)` after a
  prompt pline. `flush_screen(1)` arg matches those sites.

Combined-arm check: single-function change, both callees LIVE
(same-module import / display handle). No STUB, no new arm, no
DIAG/FORCE/seed reads in the diff.

## Hallucinations / overclaim

None. The D-log correctly says the body was already whole per
D-3233 and names the still-open arm (input-boundary prompt
paint) rather than claiming a re-port. No dispatch-vs-callee
gap. Rule #2 clean (this iteration's `--rulecheck` over all of
`js/`).

Nit (not queueable, ledger-text class): the ledger row keeps
`note: "stale: js/cmd.js:2122"` while the function sits at
`:2451` — cite drift only, per the queue rules never a row.

## Density

Cliff phase: the owner was the cliffs head at the parent (first
row of the parent's `cliffs` block, 1 session at step 120),
code + ledger + verify in one handoff. Right-sized. The function
keeps its single `Ledger:` entry (D-3679 appended). No other C
file's work bundled.

## Verification

D-log claim: `verify handler_rebind_keys_add` → 1 PASS
(Rogue-94391) · REACH-OK (smoke 24/24) · green 2/2 · strict ×2 ·
cohort 7/7, plus public seed2600 bind-flow 38/38.

Audit re-measure
(`verify handler_rebind_keys_add --base da190ed96~1 --reach-all`):

```text
scen-options-Rogue-94391: PASS
verify handler_rebind_keys_add: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
smoke handler_rebind_keys_add: no RNG-tagged reach; fixed smoke spread (24 run, 12.9s): 24 PASS, 0 regressed → REACH-OK
```

Claim reproduced exactly. Baseline cited 1 blocked session and
the re-run names it PASS — non-vacuous. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
