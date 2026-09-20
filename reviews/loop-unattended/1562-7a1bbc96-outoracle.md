# Review 1562 — 7a1bbc96 — rumors.c outoracle whole-body port (D-2603)

**Metadata:** SHA `7a1bbc96`, `rumors.c` `init_oracles` + `outoracle`,
D-2603. JS: `js/rumors.js` (+75/−31). No new test.

## Intent vs deliverable

Subject promises: C-order restart, embed open-fail arm live, doconsult
caller wired. Diff actually adds: cited restart of both functions,
unreachable-but-live open-failed arm, swap-remove with pre-swap snapshot,
window/header/record-line arms. Matches the promise.

## Inventory

- `init_oracles` (re-cited, `js/rumors.js`) — deck of record indices.
- `outoracle(special, delphi)` (restart, `js/rumors.js:388`) — early
  return, embed-open check, first-use init, shouldn't-happen gate, pick,
  seek-as-index, swap-remove, window + headers, record lines, show.
- `ORACLEFILE` const import (no new edge).

## C ↔ JS fidelity

C locus `rumors.c:638–693` (56 lines, via `csym.mjs`), read whole body
above. Arm-by-arm confirm:

- `:649–650` early return (`oracle_flg < 0`, or `> 0 && cnt == 0`): live.
- `:652` `dlb_fopen` + `:689–692` open-failed arm (`couldnt_open_file`
  + `oracle_flg = -1`): live but unreachable under the Rule #2 embed
  (constant non-empty records) — correctly named as such, getrumor
  D-2513 precedent. Not a stub: the C statements are present.
- `:655–659` first-use init + empty-deck close-goto: live.
- `:663–664` `cnt <= 1 && !special` gate: live.
- `:665` pick: `special ? 0 : rnd(cnt-1)`. RNG verified call-for-call:
  JS `rnd(x)` = 1..x (`js/rng.js:97`, read here), so `rnd(cnt-1)` =
  1..cnt-1, skipping the special slot 0 exactly like C; the ternary
  short-circuits the draw when `special` on both sides.
- `:666` seek-as-index with pre-swap `recIdx` snapshot: live (index
  lookup under the embed; snapshot precedes the overwrite).
- `:667–668` swap-remove (`loc[idx] = loc[--cnt]`): live, C order kept.
- `:670–678` window + headers (delphi/special phrasing, blank line): live.
- `:680–684` record lines to `"---"` terminator, newline strip,
  `xcrypt`: build-subsumed (extractor splits lines, pack-time xcrypt
  inverted at build — same visible string), each line pushed in file
  order. Convention-consistent, named in the map (`data.md` +1).
- `:685–688` show + fclose no-op: live.

Caller closure: sole C caller `:755` (`doconsult`,
`outoracle(cheapskate, TRUE)`) → wired `js/rumors.js:541`
(`await outoracle(cheapskate, true)`). Confirmed by grep.
Callee closure: `couldnt_open_file`, `show_text_pages` live; dlb
handle/seek/close, comment-skip, offset parse, xcrypt, close-gotos
build-subsumed and named. No clone, no stub, no silent omit.

## Hallucinations / overclaim

None. "Named: none new" is accurate (the subsumed items are named in
the map line this commit touches). RNG claim (`rnd` 1..cnt-1)
independently confirmed in `js/rng.js`.

## Density

One C function family, one JS module, ~75 insertions. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (checked on
  neighboring SHAs this session; no new imports here except a const).
- Diff grep: 0 FORCE/DIAG/getRngLog/fastforward hits.
- D-log Verify claims PASS + smoke REACH-OK. Re-measured:
  `hidden-proxy.mjs verify outoracle --base 7a1bbc96~1 --reach-all` →
  0 blocked at baseline and working tree (vacuous-note path, correctly
  framed) + `smoke 24/24 PASS, 0 regressed → REACH-OK`. Confirmed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
