# Review 2570 — 4f820ea09 — getlin cmdq preamble (D-3700)

## Metadata

- SHA: `4f820ea0961509645723565afbdb293fc738ee47` (2026-10-09, D-3700)
- Scope: ≤10-function cliff-phase refill — whole Method on `getlin`
- Diff: `js/getline.js` +30/−7, new
  `scripts/getlin-cmdq-preamble.test.mjs` (70 lines), ledger `getlin`
  partial → ported
- Context: missing-arm row; queue empty, batch no gap (D-3699 refill
  precedent)

## Intent vs deliverable

Subject promises: port the ledger omit (C:1875–1895) — the cmdq_pop
drain + pline echo + early return ahead of the prompt loop, plus the
in_getlin envelope — in C order; no new imports. The diff delivers exactly
that: a 17-line preamble, a 2-line envelope set, a 1-line envelope clear
in the existing `finally`. No other `js/` touched. Promise matches
deliverable.

## Inventory

- `getlin` (`js/getline.js:250–~335`): preamble + envelope; no new JS
  function, no helper added.
- Callees used: `cmdq_pop`, `pline`, `yn_cmdq_key` (same-file,
  `js/getline.js:1879`), `CMDQ_KEY` (`js/const.js:548`) — all pre-existing,
  no import changes, so no `--can` question and no re-point paste owed.
- `yn_cmdq_key` extracts first char / charCode (`:1879–1884`); the tolerant
  `CMDQ_KEY || 'key'` test matches the yn_function house shape at
  `js/getline.js:2037`.

## C ↔ JS fidelity

C locus (`csym.mjs getlin`): `nethack-c/upstream/src/windows.c:1867–1902`.
Walked against pinned lines `:1870–1901`:

- Drain loop: C `:1875` pops until null; KEY sets got (`:1877`), stores
  non-newline (`:1878–1879`), newline stores NUL and breaks (`:1880–1881`);
  non-KEY breaks (`:1882–1883`); every popped node freed (`:1885`,
  `:1888–1889`). JS: pop-until-null, tolerant KEY test, gotCmdq before the
  newline check (a lone newline still echoes — as in C), `cmdqBuf += k`
  only for non-newline, break on non-KEY with the node already shifted
  (consumed, ≡ C's pop-then-free). Equivalent in every termination case:
  empty queue → prompt loop; first-pop-non-KEY → prompt loop with the node
  consumed; newline → echo of the prefix. ✓
- Echo + return: C `:1891–1895` `pline("%s %s", query, obufp)` + return —
  JS `await pline('%s %s', query, cmdqBuf); return cmdqBuf;`. C fills bufp
  while JS returns a string, but every JS caller uses the return value
  (`js/cmd.js:1453`, `js/do_name.js:204`, …) — house shape, consistent.
- Envelope: C `:1897` in_getlin=1 → `:1898` bot_disabled → win_getlin →
  `:1900` restore → `:1901` in_getlin=0. JS: set before
  `set_bot_disabled(true)`, clear in `finally` after its restore — exact
  C order. ✓
- "No readers" claim verified: `in_getlin` appears in C only at
  windows.c:1897/1901 + the hack.h:798 decl, in JS only at the two new
  sites. Dead-but-live field, correctly disclosed as carried for future
  readers rather than sold as behavior.
- Comment cites audited: `:1872`, `:1875`, `:1877`, `:1878–1881`,
  `:1882–1883`, `:1891–1895`, `:1893`, `:1897`, `:1898`, `:1900`, `:1901`
  all accurate. RNG: none drawn either side. Branch-by-branch confirm.

## Hallucinations / overclaim

None. The D-log opens "no corpus divergence — C-fidelity residual" and
claims no movement; the `note hidden` line is the tool's own output. The
canned-KEY stashes named (apply.c invlets, cmd.c:4018, allmain.c:494) are
the mechanism the preamble serves, not a movement claim.

## Density

Legitimate refill under the D-3699 precedent (queue empty, batch no gap):
one C function, `js/getline.js` only + its test, ledger omit fully
retired, `Ledger: getlin ported` entry present, focused 0/3→3/3. Not a
no-op, no bundling.

## Verification

- Focused test: `node --test scripts/getlin-cmdq-preamble.test.mjs` → 3/3
  pass (ran here; D-log claims 0/3 pre-fix on stashed js/).
- Re-measure (`verify getlin --base 4f820ea09~1 --reach-all`): 0 blocked
  at baseline (matches the D-log); `smoke getlin: no RNG-tagged reach;
  fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK`. Zero
  regressions.
- Hygiene: diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2568).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
