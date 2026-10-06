# Review 2422 — 8d3fd4d86 — string-opt campaign step 2 (3 shells)

## Metadata

- SHA: `8d3fd4d86` (2026-10-06) — D-3520.
- Subject: Open head: impossible audit + string-opt campaign
  step 2 (buc/align/howtoput silent-default adapters →
  get_table_option, sp_lev.c:3125/:3449 + questpgr.c:550).
- Diff: `js/mklev.js` (2 shells + normalize/table sites +
  altar cites) + `js/questpgr.js` (shell + call site +
  import +1 name), extended `scripts/lspo-str-opt.test.mjs`,
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function.
  Batch manifest empty; the rewire rides the Open head per
  precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change;
(b) three silent-default shells restarted in table form
through the live whole helper (buc :3449, align :3125,
output :550), each over its verbatim C table + index array;
(c) the object site unconditional per C :3635; altar
align/xy cites corrected; (d) behavior delta is exactly the
C conversion; (e) `get_table_option` stays `partial` with
the true remainder (no finish paste); `get_table_buc` note
fixed via direct `ledger.mjs set`.

The diff actually adds: three helper-delegating shells, the
unconditional normalize write, three rewired call sites,
corrected cites, the questpgr import name. Delivered =
promised on all points.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `get_table_buc` (mklev.js:22555, local) | C staticfn shell | sp_lev.c:3441–3452 | whole |
| `get_table_align_unpacked` (mklev.js:23092, local) | C staticfn shell | sp_lev.c:3113–3128 | whole |
| `howtoput2i` (questpgr.js:1077, local) | C static-array read | questpgr.c:474–477/:550 | whole |
| `get_table_option` (dungeon.js:439, unchanged) | LIVE import | nhlua.c:1121–1133 | whole |
| normalize + altar + monster + com_pager sites | C call wiring | :3635/:3298/:4303/:550 | whole |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (untouched) |

## C ↔ JS fidelity

Tables verbatim against pinned C (re-read this iter):
bucs[] :3444–3447 + bucs2i[] :3448 (trailing 0 unreachable
— checkoption throws on no-match, never returns the NULL
index); gtaligns[] :3116–3119 + aligns2i[] :3120–3123
order exact incl. AM_SPLEV_CO/NONCO/RANDOM; howtoput[]
:474–476 + howtoput2i[] :477 (pline=1, window=2, text=2,
menu=3, default=0). Call-site lines exact: buc :3635,
align :3298 (sole other site :4303), output :550.

Branch-by-branch confirm:

- Object site unconditional — C :3635 assigns
  unconditionally; old JS kept a preset `curse_state` when
  `buc` was absent. Safe: the only in-tree presets go to
  `create_object` directly (:7335/:13847, downstream
  consumer), `tmp` is a fresh spread, the string arm skips
  normalize, and no `l_create_object` input carries
  `curse_state`. OK.
- Altar cites — corrected :4300→:4301 (xy), :4302→:4303
  (align), doc + type :4303/:4304; all exact against the
  :4296–4310 window. The `splev_create_altar` align
  fallback is dead (sole caller passes `sp_amask` int) —
  made C-exact, harmless. OK.
- Entry-source audits (re-run) — all in-tree `buc:` values
  exact-valid lowercase (blessed/cursed/not-cursed/
  uncursed); zero `align:` string values (the allmain
  `'neutral'` is role domain, unreachable from the three
  sites); quest `output:` literals exact-valid only
  (`text` ×32 META, `pline` + `text` COMMON, `default`
  folds; ROLE_TEXT carries none). Zero in-tree behavior
  change. OK.
- Import edge — `get_table_option` added to questpgr's
  existing dungeon.js import: no new module edge. OK.
- Ledger rows — `get_table_option` partial omit is the
  true D-3520 remainder (partial-first ordering defeated
  the finish paste); `get_table_buc` note corrected to
  throws-like-C; `impossible` stays partial per the
  standing pattern. OK.
- `impossible` `audited` — display.js untouched since
  c107c3e18 (pre-SHA); row + body brief-read. OK.

Required `sym.mjs` output (shells re-pointed to the import;
C-staticfn locals, correctly unexported):

```text
get_table_buc    NOT EXPORTED — 1 LOCAL in js/mklev.js:22555
get_table_align_unpacked NOT EXPORTED — 1 LOCAL in js/mklev.js:23092
howtoput2i       NOT EXPORTED — 1 LOCAL in js/questpgr.js:1077
get_table_option js/dungeon.js:439   sync
```

## Hallucinations / overclaim

The `buc:` census count ("27") does not reproduce: the
stated pattern yields 24 values + 1 comment on this tree.
All values are exact-valid, so the material claim (zero
behavior change) holds — a count miscount in the
review-2420 "eleven entries" family, docs-only.

## Density

Breadth-phase small SHA: manifest empty; impossible audit +
3-shell rewire ride the Open head per precedent.
Per-function verdicts:

- 3 shells + 5 sites — whole C-line ports, tables verbatim,
  cites exact, conversions exactly C. OK.
- `impossible` `audited` — body really whole modulo named
  Rule #2 omits (untouched). OK.
- `get_table_option` `partial` — remainder true, no paste.
  OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred
  per declared override, still queued).

Banned-pattern grep on the `js/` hunks: 0 hits. Rule #2
clean (fresh `--rulecheck` this iteration).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_option,
  get_table_buc,get_table_align` → syntax PASS, rule2
  PASS, 4× hidden note (none blocked), 4× REACH-OK (smoke
  24/24 each), green 2/2, strict ×2, cohort 7/7, auto full
  44/44 (shared file changed); node:test extended 11/11 +
  neighbors 71/71; pre-change stash check fails the new
  wiring its, 11/11 post-change.
- Audit re-measure (same 4 fns, `--base 8d3fd4d86~1
  --reach-all`): 0 blocked each (vacuous, correctly
  labeled — rows cited none); smoke 24 PASS / 0 regressed
  each → REACH-OK. No REGRESSED session. Matches.
- `node --test scripts/lspo-str-opt.test.mjs`: 11/11 pass
  on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
