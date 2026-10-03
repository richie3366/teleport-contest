# Review 2320 — 8b1162c17 — set_symhandling CURS/MAC dedup

Metadata: SHA `8b1162c17`, D-3365, Must-fix for review 2319
C-wrong 1. C `symbols.c:656–669` over `known_handling[]`
:376–384. Stat: js/const.js only (+2/−3, net −1).

Intent vs deliverable: subject promises "set_symhandling
CURS/MAC indices (dedup to C-exact KNOWN_HANDLING)". Diff
actually: deletes the stale 4-string `known_handling`,
re-points the scan at `KNOWN_HANDLING`. Matches promise;
closes the queued Must-fix exactly as specified.

Inventory: 1 changed **C callee** (`set_symhandling`,
js/const.js:2918); 1 local table deleted. No new helper,
no import change (same-file const), no stub, no clone.

C ↔ JS fidelity: exact. C sets `H_UNK` default then
null-terminated `strcmpi` scan returning index (:656–669)
✓; JS now iterates the C-exact 6+NUL table
(UNKNOWN/IBM/DEC/CURS/MAC/UTF8, verified against C
:376–384 line-for-line) with case-insensitive compare ≡
C `strcmpi` for these ASCII names. Indices: CURS 3, MAC
4, UTF8 5 = H_* ✓. No RNG in C or JS. Caller:
C symbols.c:590 (parse_sym_line case 2, guarded by
`gc.chosen_symset_start`) — guard matches the D-log;
parse_sym_line itself absent from js/ (sym.mjs NOT
FOUND), named in the map in this commit ✓. No JS callers
→ behavior-neutral, as queued.

Hallucinations / overclaim: none. Probe numbers
(UNKNOWN 0 … UTF8 5, bogus→0) re-derivable from the
table; the D-log's "0 blocked, expected" names the
vacuous check honestly.

Density: 1-function Must-fix, alone ✓. One `Ledger:`
entry (ported — now true), one Verify line. Green +
cohort cited.

Verification: re-measured — `verify set_symhandling
--base 8b1162c17~1 --reach-all` → "0 blocked at baseline
+ in working scoreboard" + "smoke 24/24 → REACH-OK".
Matches the D-log exactly (0 blocks, smoke 24/24).
Rule #2 clean (full-tree `--rulecheck`). Diff grep: 0
banned hits. `sym.mjs` (required paste; table deleted,
same-file re-point):

```text
set_symhandling  js/const.js:2918   sync
KNOWN_HANDLING   js/const.js:2890   sync   export const
```

Actionable C-wrongs: none.

Verdict: **ACCEPT**
