# Review 1374 — 50392524 — utrap-steed verb anchored ternary (D-2408)

- SHA: `50392524`, D-2408 (Must-fix from review 1372, C-wrong 1).
  JS files: `js/invent.js` only (+16/−2: new `utrap_steed_verb` + one
  call site + comment correction).
- Prior reviews closed: 1372 (QUALITY-RISK; its single Must-fix item).

## Intent vs deliverable

Subject promises the C anchored ternary for the steed-trap verb
(`is/was` vs `are/were`) plus the corrected in-code C quote. Diff
delivers exactly that — one exported helper, one rewired call, one
comment fix. Nothing else.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `utrap_steed_verb` (invent.js:4985) | new export, sync | LIVE — C `:1094–1096` verbatim |
| steed-arm call site (:5156+) | rewired call | LIVE — passes `(final, anchored)` |
| corrected comment | doc | quotes C's full ternary now |

No symbols deleted or re-pointed. No new imports (same-file
helper). `sym.mjs utrap_steed_verb` → single definition,
`js/invent.js:4985 sync`, zero clones.

## C ↔ JS fidelity

C locus read in pinned source: `insight.c:1086–1098` (the `u.utrap`
block; csym range for `status_enlightenment` is `:939–1266`).

- C `:1089` computes `anchored = (u.utraptype == TT_BURIEDBALL)`;
  `:1092–1095` prints `anchored ? "you and " : ""` + steedname, then
  `enl_msg(buf, anchored ? "are " : "is ", anchored ? "were " :
  "was ", …)`. `enl_msg` takes (prefix, present, past): 2nd arg =
  non-final, 3rd = final — confirmed against the Levitation call
  (`enl_msg(youtoo, are, were, …)`).
- JS `utrap_steed_verb(final, anchored)` returns `final ?
  (anchored ? 'were ' : 'was ') : (anchored ? 'are ' : 'is ')` —
  the exact transpose of C's two ternaries. ✓
- Call site keeps the `anchored ? 'you and ' : ''` prefix and the
  `highc` first-char gating from D-2406, untouched. ✓
- RNG-neutral (verb selection draws nothing in C either); no
  branch-order change; no new omission. The pre-existing
  null-steedname → `you_are` fallback stays as disclosed in 1372. ✓

## Hallucinations / overclaim

None. The D-log states plainly that no corpus session walks the
corner and ships on the C citation + gates "per the review" — which
is what review 1372 prescribed. The previously false comment quote
("enl_msg(buf, are/were, …)") is corrected to the full ternary.

## Density

16 insertions for one Must-fix ternary + test growth (6→8 cases).
One C locus, one falsifier (the unit pin) — right-sized; Must-fix
ships alone per §2b.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0
  (verb strings only).
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify status_enlightenment --base
  50392524~1` → "0 session(s) blocked on it (0 at baseline, 0 in
  the working scoreboard)" with the tool's own vacuous-verify
  warning. The D-log's "vacuous — 0 blocked" claim reproduces
  exactly; no D-1831 shape (nothing claims a PASS).
- `node --test scripts/trap-predicament.test.mjs` → 8 pass / 0
  fail (re-run this audit). D-log's green 2/2 + strict ×2 +
  cohort 7/7 accepted as stated (single-file, non-shared change).

## Actionable C-wrongs

None. Review 1372's Must-fix is closed on the C citation.

Verdict: **ACCEPT**
