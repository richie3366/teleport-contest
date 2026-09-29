# Review 2039 — 9d11eaa9f — cmd.c autocompletions pair (D-3079)

Metadata: SHA `9d11eaa9f`, D-3079, js/cmd.js + js/options.js +
js/cfgfiles.js (~185 ins). Head + its Open callee;
counter_were stale-retired.

## Intent vs deliverable

Promise: port handler_change_autocompletions (PICK_ANY
menu) + parseautocomplete (AUTOCOMPLETE= writer), wire
the doset arm and the config row off cnf_line_named_true.
Diff adds both exports + both wirings + AUTOCOMP_ADJ /
trimspaces / raw_printf / pick_any imports. Kept.

## Inventory (per function)

- `handler_change_autocompletions` (NEW cmd.js:2334,
  async export): menu build, pick_any, apply loop.
  Sole C callee parseautocomplete LIVE; window layer
  via live select_menu_pick_any. No clones.
- `parseautocomplete` (NEW cmd.js:2273, sync export):
  split/recurse, trim, empty, negation, flag update,
  bad-name. Callees trimspaces/raw_printf LIVE;
  wait_synch named omit (partial). Self-recursion
  in-body. No deleted symbols.

## C ↔ JS fidelity (per function)

parseautocomplete (C :3243–3292): comma-before-colon
short-circuit ✓, tail recursion FIRST then head ✓
(order preserved), trimspaces ✓, empty return ✓,
'!' + re-trim + condition flip ✓, toggle iff
`!!condition !== has` ≡ C :3274 ✓ (worked both bit
states), ADJ flip ✓, set/clear + return ✓, bad-name
raw_printf exact format ✓. wait_synch :3291 named
(config parser stays sync; precedent cited) ✓.
Callers all 4 wired: cfgfiles.c:627 ✓ (new
cnf_line_AUTOCOMPLETE ≡ C :624–628 exact),
:2500/:2507 ✓ (apply loop), self :3253 ✓. No RNG.
Confirm.

handler (C :2448–2515): menu skips
(INTERNALCMD|CMD_NOT_AVAILABLE, strlen<2) ✓,
a_int=i+1 ✓, "%c %s: %s" with '*' ✓, SELECTED ✓;
EXTCMDLIST.length ≡ extcmdlist_length (generated,
no NUL — precedent cited) ✓; cancelValue −1 keeps
the n>=0 gate with finish-empty clearing all rows
(picked=[] → all FALSE ≡ C n==0) ✓; apply-loop
skips ✓; Set-of-a_int ≡ `ec ==
&extcmdlist[a_int−1]` (bijection) ✓; TRUE/FALSE
arms ✓; free→GC ✓. Caller options.c:8362 (sole —
csym) → doset arm ✓ with opt_set_in_config marking
≡ :8939 (optfn returns optn_ok :8364) ✓. get_val
count_autocompletions named MISSING in Next ✓.
Confirm.

Stale: counter_were js/were.js:124 ✓ (structural).

## Hallucinations / overclaim

Trivial (×2, same shape as 2038): "New cfgfiles→cmd
edge" — --can reports ALREADY (cfgfiles statically
imports cmd); safety stronger than claimed. Downstream
EXT_CMD_AC staleness (static list, getline.js:306 —
verified hardcoded, never reads EXTCMDLIST flags) is
openly scoped in Next with its owner (get_ext_cmd),
not hidden; the ported pair is whole, so this stays a
named gap, not a Must-fix.

## Density

Head + Open callee, one C file — §2b-shaped ✓.
`Ledger:` handler ported + parse partial ✓.
Per-function verdicts: both ACCEPT.

## Verification

Re-measured `hidden-proxy verify <both> --base
9d11eaa9f~1 --reach-all`: 0 blocked each (honestly
vacuous) + 24/24 smokes → REACH-OK, 0 regressed ✓.
Ban-grep clean. Rulecheck clean (2033).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
