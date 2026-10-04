# Review 2365 — 3a47d2089 — u.Underwater → u.uinwater 12-site flip (D-3414)

- SHA: `3a47d2089` — "Must-fix review 2358: u.Underwater never-written alias family → live u.uinwater (12 sites) (D-3414)."
- D-entry: D-3414. Diff: 7 js files (12 one-line flips + C cites);
  ledger 8 rows (D-tags, no status moves); new
  scripts/underwater-alias.test.mjs; review stamps.
- Scope: 10 functions — whole Method per function. Closes review 2358
  C-wrong 1 (the exact 12 sites it named, verified same modulo
  comment-line shifts).

## Intent vs deliverable

Promise: flip each of the 12 dead `u.Underwater` reads to
`(u.uinwater|0)` (D-3400 idiom) after verifying its C locus says
Underwater — all 12 do; no signature/call-graph change; pickup +
m_canseeu documented-but-untagged in Ledger; focused test 4/4.
Delivers: exactly that. Promise == deliverable.

## Inventory

```text
swim_move_danger    | ported | js/hack.js     | C hack.c:1890-1891
set_apparxy         | ported | js/monmove.js  | C monmove.c:2220-2221
hideunder           | ported | js/monmove.js  | C mon.c:4746-4747
m_canseeu           | (macro, untracked)      | C vision.h:50-53
litroom             | ported | js/read.js     | C read.c:2498
do_screen_description | ported | js/pager.js  | C pager.c:1260
lookat ×2           | ported | js/pager.js    | C pager.c:731 + :783
describe_decor ×2   | ported | js/pickup.js   | C pickup.c:384 + :411
pickup              | ported | js/pickup.js   | C pickup.c:703
use_mirror          | ported | js/apply.js    | C apply.c:1083
```

No new/changed helpers — pure expression flips. No clone/import
changes; no `sym.mjs` paste obligation.

## C ↔ JS fidelity

- Premise verified: `Underwater ≡ (u.uinwater)` (youprop.h:279); zero
  `.Underwater =` / `Underwater:` writes port-wide (grep clean — the
  one hit is a comment); `u.uinwater` is live (trap.js set_uinwater,
  detect.js save/restore, D-3400). Every flipped gate was dead-false.
- All 12 C lines verified to say Underwater: hack.c:1890 (+ :1891
  `return FALSE`); monmove.c:2220-2221 (`if (Underwater) displ = 1`);
  mon.c:4746-4747 (`(!Underwater || !couldsee)`); vision.h:50-53
  (`!Underwater` conjunct); read.c:2498 (no_op triple); pager.c:1260
  (submerged), :731 + :783 (both `Underwater && !waterlevel`);
  pickup.c:384 (`doorhere || Underwater`), :411 (`!Underwater`), :703
  (`is_pool && !Underwater`); apply.c:1083 (`if (Underwater)`).
- JS shapes preserve C truth tables: `!(u.uinwater|0)` (`|` binds
  tighter than `!`), `(u.uinwater|0) && …`, `doorhere || (u.uinwater|0)`
  (parenthesized, used in boolean position), `!!(… || (u.uinwater|0) ||
  …)` — all correct; `|0` keeps the `{}`-default safe as claimed.
- Scope complete: the 12 are exactly review 2358.1's list. Remaining
  `u.Underwater` reads (dothrow/mthrowu/zap/music + `game.u?` forms)
  are disclosed as follow-up in Next, not silently dropped; two
  (dothrow.js:937, read.js:1879) already OR the live field.
- Ledger: 8 rows keep `ported` + D-tag (bodies were ported; the gates
  were dead inside them — no status flip needed, none made). pickup +
  m_canseeu untouched with a sound documented reason (split re-tag
  would wipe pickup's select_menu omit; vision.h macro untracked).
  No paste-over: omit fields byte-identical.

## Hallucinations / overclaim

None. VERIFY: FAIL is stated openly (not dressed as PASS); the
do_screen_description block is triaged as pre-existing + disjoint,
not as a named omission.

## Density

Single-issue Must-fix, ships alone. Per-function Ledger entries (8)
+ Verify line present; the 2 untagged functions are documented in the
D-log with reason. All 10 functions ACCEPT. SHA verdict ACCEPT.

## Verification

- Re-measured all 10 fns in one call (`--base 3a47d2089~1
  --reach-all`): 9 fns 0-blocked + REACH-OK (set_apparxy reach 70/70,
  rest smoke 24/24); do_screen_description "0 PASS, 0 moved past,
  1 unchanged, 0 worse → NO MOVEMENT" (scen-descend-Caveman-94327
  step 43, `staircase down` vs `staircase down (no travel path)` —
  travel-path suffix, identical at baseline, disjoint from the
  submerged gate). 0 regressed anywhere. Matches the D-log exactly.
- `node --test scripts/underwater-alias.test.mjs`: 4/4 pass.
- `imports.mjs --rulecheck`: Rule #2 clean (whole tree, this iter).
  Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
