# Review 2418 — c076fe518 — boolean-opt campaign step 2 (obj ×12)

## Metadata

- SHA: `c076fe518` (2026-10-06) — D-3512.
- Subject: Open head: impossible audit + boolean-opt campaign step 2
  (obj ×12 raw reads → get_table_boolean_opt, sp_lev.c:3639–3717).
- Diff: `js/mklev.js` (12 sites across normalize + montype arms, 3
  raw lines removed), new `scripts/lspo-object-bool.test.mjs`, 2
  neighbor tests maintained, docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch
  manifest empty; the rewire rides the Open head per precedent. No
  prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b)
twelve object sites restarted through the live whole same-file
helper, in place and in C order against the neighboring throwing
reads; early trapped/locked nil-defaults removed (reads moved to
their C-order slots); the :3644 key is "trap_known" while the
field is tknown; (c) behavior delta is exactly the C conversion;
(d) zero in-tree behavior change per the entry-source audit.

The diff actually adds: eight normalize reads + four montype reads
with exact cites; removes the two early nil-default lines and the
raw EGG truthiness. No import hunk (same file). Delivered =
promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| normalize 8 sites | C call wiring | sp_lev.c:3639–3648 | whole |
| montype 4 sites | C call wiring | sp_lev.c:3709–3717 | whole |
| `get_table_boolean_opt` (mklev.js:1007) | LIVE same-file | nhlua.c:1106–1118 | whole (see 2417) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

C pins (all verified): :3639 buried 0, :3640 lit 0, :3642 locked
-1, :3643 trapped -1, :3644 tknown←"trap_known" -1, :3646 greased
0, :3647 broken 0, :3648 achievement 0; :3709 historic, :3711 male,
:3713 female, :3717 `laid_by_you…? 1 : 0`. Every cite, default, and
the key/field split exact.

Branch-by-branch confirm:

- C-order — quantity :3638 < buried/lit :3639–40 < eroded :3641 <
  locked/trapped/tknown :3642–44 < recharged :3645 <
  greased/broken/achievement :3646–48; montype :3709→:3711→:3713,
  EGG :3717 in its arm. The early nil-defaults' removal is safe:
  no intermediate read observes locked/trapped. OK.
- Equivalence — tmp is the `{...o}` non-null spread at the table
  gate; normalize never writes the montype keys, so the montype
  reads see caller values; nil ⟺ `== null`. OK.
- Conversion delta — absent → C defaults (incl. new buried/
  greased/broken/achievement 0 + tknown -1); "true"→0 falsy like
  C; beyond-int32 truncates; fractions/other-strings/non-numerics
  throw. Exactly C. OK.
- Entry-source audit (re-run at the D-3512 tree) —
  `l_create_object(` only in `js/mklev.js` + the new test; the
  only in-tree bool keys are `broken: 1`/`trapped: 0`
  (LARGE_BOX) and `lit: true` (OIL_LAMP) — all convert
  identically. Downstream: locked/trapped/tknown `=== 0/1`
  gates skip -1 and undefined alike; broken/greased/achievement/
  lit/buried are truthiness reads (0 ≡ undefined). No in-tree
  caller passes trap_known/historic/male/female/laid_by_you.
  Zero in-tree behavior change. OK.
- Neighbor tests — window growth (3600→5600/3200→5200) forced by
  the C-ordered growth (id read now at +3803); lit needle
  re-pinned from the deleted raw line to the live helper call.
  Legitimate maintenance, not weakening. OK.
- Pre-existing noted, untouched — id/class reads precede xy vs C
  :3650–3653 order (other campaigns' lines, disclosed). OK.

Required `sym.mjs` output (diff re-points raw inline reads to the
same-file helper; nothing deleted or imported):

```text
lspo_object_normalize_table NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:22926
lspo_object_apply_montype NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:22545
get_table_boolean_opt js/mklev.js:1007   sync
```

("LOCAL CLONE(S)" is `sym.mjs`'s generic wording for an unexported
local; these are the established lspo_object split pieces, not
duplicate definitions.) No import change, no `--can` needed.

## Hallucinations / overclaim

The `js/` claims all reproduce. Ledger: this SHA's finish pasted
the impossible first-line into the `get_table_boolean_opt` row
(third instance of the finish bug); follow-up 8b15af4c1 already
restored the correct 16-site omit in history (28 − 12 = 16 ✓,
wired/equiv/by-design lists match the D-entry). No duplicate
prepend. The bundled LOOP-QUEUE-DONE.md D-3511 hash backfill is
the sanctioned next-commit fill, not scope creep.

## Density

Breadth-phase small SHA: manifest empty; impossible audit + 12-site
rewire ride the Open head per precedent. Per-function verdicts:

- 12 object sites — whole C-line ports, defaults/key-mapping
  exact, C order kept, zero in-tree behavior change. OK.
- `impossible` `audited` — body really whole modulo named Rule #2
  omits (untouched). OK.
- `get_table_boolean_opt` partial — body whole; the 16-site omit
  is accurate post-follow-up; mon ×16 next step named. OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per
  declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_boolean_opt` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked), 2×
  REACH-OK (smoke 24/24 each), green 2/2, strict ×2, cohort 7/7,
  auto full 44/44 (shared file changed); node:test new 7/7 +
  neighbors 44/44; pre-change stash check fails 2/7 (wiring),
  7/7 post-change.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_boolean_opt --base c076fe518~1 --reach-all`):
  0 blocked both functions (vacuous, correctly labeled); smoke 24
  PASS / 0 regressed → REACH-OK each. No REGRESSED session.
  Matches the D-log.
- `node --test` new + 2 maintained neighbors: 19/19 pass on this
  tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
