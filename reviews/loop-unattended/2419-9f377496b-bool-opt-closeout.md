# Review 2419 — 9f377496b — boolean-opt campaign close-out (mon ×16 + 3)

## Metadata

- SHA: `9f377496b` (2026-10-06) — D-3514.
- Subject: Open head: impossible audit + boolean-opt campaign
  close-out (mon ×16 lspo_bool_opt → get_table_boolean_opt,
  sp_lev.c:3293–3323, + feature/engraving ×3).
- Diff: `js/mklev.js` (19 sites, 2 adapter defs removed), new
  `scripts/lspo-monster-bool.test.mjs`, bool-opt extended, 2
  neighbor tests maintained, docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch
  manifest empty; the rewire rides the Open head per precedent. No
  prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b)
sixteen monster sites + feature/engraving ×3 restarted through the
live whole same-file helper, in place, C order kept; the :3300 key
is "invisible" while the field is invis; mm-flag `!` wrappers and
engraving `!== 0` folds preserved; feature-flag arm restructured
to C read-then-gate order with the dead -1→rn2(2) arm kept
verbatim; both dead adapters removed; (c) behavior delta is exactly
the C conversion; (d) `get_table_boolean_opt` flipped to `ported`
— all 51 refs closed (47 sp_lev wired, 4 nhlua by-design).

The diff actually adds: 19 helper reads with exact cites + the
feature restructure; deletes both adapter defs + docs. No import
hunk (same file). Delivered = promised, including a correct
`ported` (census re-verified below — no repeat of 2416.1).

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| monster 16 sites | C call wiring | sp_lev.c:3293–3323 | whole |
| feature 1 site | C call wiring + restructure | sp_lev.c:4745–4753 | whole |
| engraving 2 sites | C call wiring | sp_lev.c:3909–3910 | whole |
| `get_table_boolean_opt` (mklev.js:1007) | LIVE same-file | nhlua.c:1106–1118 | whole (see 2417) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |
| `lspo_bool_opt`, `splev_feature_boolopt` | dead adapters | n/a | gone from `js/` |

## C ↔ JS fidelity

C pins (all verified): mon :3293 peaceful, :3294 asleep, :3299
female (all BOOL_RANDOM), :3300 invis←"invisible", :3301
cancelled, :3302 revived, :3303 avenge, :3307 stunned, :3308
confused, :3309 waiting, :3313 keep_default_invent -1, :3315
!tail, :3317 !group, :3319 adjacentok, :3321 ignorewater, :3323
!countbirth; feature :4745 val/-2, :4747 gate, :4748–4749 dead
-1 arm, :4750–4753 set/clear; engraving :3909 degrade TRUE,
:3910 guardobjects FALSE. Every cite, default, key/field split,
and wrapper exact. BOOL_RANDOM = -1 both sides.

Branch-by-branch confirm:

- Key rename — :3300 reads "invisible" into field `invis` exactly
  like C (old code read the wrong key 'invis'); zero `invis:`
  keys in `js/`/scripts/, so no caller is affected. OK.
- Conversion delta — absent → C defaults; explicit -1 now throws
  like C (old `v|0` let it survive); strings raw indices;
  beyond-int32 truncates (old feature adapter threw). Exactly C. OK.
- Feature restructure — `raw` :4745, `-2` return :4747 (≡ C's
  `!= -2` gate), dead -1→rn2(2) kept verbatim with an accurate
  comment (dead in C too: explicit -1 throws inside the helper),
  set/clear arms :4750–4753 intact. OK.
- Entry-source audit (re-run) — `l_create_monster(`,
  `lspo_feature(`, `lspo_engraving(` defs only in `js/`;
  scripts/ hits are source-reading asserts. In-tree `asleep: 1`/
  `peaceful: 1` keys feed `splev_create_monster`, a separate
  hand-rolled path that never enters the normalize table. No
  in-tree caller passes any of the 19 keys or explicit -1. Zero
  in-tree behavior change. OK.
- `ported` census (re-verified — the 2416 lesson) — `csym.mjs
  --callers`: 52 refs − 1 decl = 51 sites: 4 nhlua :1470–1498
  (owned by by-design `nhl_debug_flags` ✓) + 47 sp_lev. Prior
  "wired" claims re-checked in JS: :3858–3861/:3865 ✓
  (mklev.js:20727–20730/:20734, negation on deadends kept),
  :4078 ✓ (:1825), :5427–5428 ✓ (:1029–1030). All sites are
  direct reads (no shared-callee second expansion exists).
  16 + 12 + 8 + 5 + 2 + 1 + 3 = 47 ✓. The flip is correct. OK.
- Neighbor tests — 3 int needles re-pinned to the live helper,
  appear window 2600→3600 (needle now at +3040). Legitimate. OK.

Required `sym.mjs` output (diff deletes both local adapters):

```text
lspo_bool_opt    NOT FOUND in js/** (no export, no local function/const).
splev_feature_boolopt NOT FOUND in js/** (no export, no local function/const).
```

No import change, no `--can` needed.

## Hallucinations / overclaim

The `js/` claims all reproduce. Ledger: this flip landed clean —
no finish paste (no follow-up needed), no omit. The row `note`
still carries the D-3512 text (stale one campaign step) —
cosmetic only, status/d/list correct. Pre-existing stale cites in
the normalize doc-block disclosed as observed, untouched. The
bundled LOOP-QUEUE-DONE.md D-3513 hash backfill is the sanctioned
next-commit fill.

## Density

Breadth-phase small SHA: manifest empty; impossible audit + 19-site
close-out ride the Open head per precedent. Per-function verdicts:

- 19 sites — whole C-line ports, key/default/wrapper exact, zero
  in-tree callers. OK.
- `impossible` `audited` — body really whole modulo named Rule #2
  omits (untouched). OK.
- `get_table_boolean_opt` `ported` — body whole and the all-sites
  census re-verified true (47 wired + 4 by-design). OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per
  declared override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_boolean_opt` →
  syntax PASS, rule2 PASS, 2× hidden note (none blocked), 2×
  REACH-OK (smoke 24/24 each), green 2/2, strict ×2, cohort 7/7,
  auto full 44/44 (shared file changed); node:test new 6/6 +
  extended/neighbors 59/59; pre-change stash check fails 1/6
  (wiring), 6/6 post-change.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_boolean_opt --base 9f377496b~1 --reach-all`):
  0 blocked both functions (vacuous, correctly labeled); smoke 24
  PASS / 0 regressed → REACH-OK each. No REGRESSED session.
  Matches the D-log.
- `node --test` new + extended + 2 maintained neighbors: 28/28
  pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
