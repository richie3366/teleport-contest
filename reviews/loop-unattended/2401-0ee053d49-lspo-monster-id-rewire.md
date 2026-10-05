# Review 2401 — 0ee053d49 — lspo_monster id rewire

## Metadata

- SHA: `0ee053d49` (2026-10-05) — D-3478.
- Subject: Open head: impossible audit + lspo_monster id→get_table_str_opt rewire (sp_lev.c:3169 String-coercion gap).
- Diff: `js/mklev.js` (+8/−1: one call-site line + comment), new `scripts/lspo-monster-id.test.mjs` (47 lines), docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) monster-id site
restarted through the live helper (`tmp.idName = get_table_str_opt(tmp, 'id',
null)`, C :3169) feeding the unchanged find_montype twin; (c) behavior delta is
exactly the C conversion; (d) no caller depended on the coercion.

The diff actually adds: the helper call + comment replacing
`(tmp.id == null) ? null : String(tmp.id)`; no import change; a 6-assert
node:test file. Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `lspo_monster_normalize_table` id site (:23244) | C call wiring | sp_lev.c:3169 via :3166–3179 | whole |
| downstream `name_to_monplus` + throw (:23245–23251) | unchanged twin of find_montype arm | sp_lev.c:3172–3176 | whole (pre-existing) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:584–634 | re-verified (see 2399) |

## C ↔ JS fidelity

C (`csym.mjs get_table_montype` → sp_lev.c:3166–3179): `s =
get_table_str_opt(L, "id", NULL)` (:3169); `ret = NON_PM`; `if (s) ret =
find_montype(L, s, mgender); Free; if NON_PM → nhl_error("Unknown monster
id")`.

Branch-by-branch confirm:

- `:3169` read — JS `:23244` calls the live helper. `tmp` is the `{...o}`
  spread (mklev.js:23311) after the null/non-object guard, so `lua_field` ≡
  `tmp.id`; classifications identical (verified in 2399).
- nil → NULL → NON_PM, no throw — JS null → `idName` null → skips the lookup,
  `mndx` stays NON_PM. Matches.
- string incl. `""` — `""` is truthy in C → `find_montype("")` → NON_PM →
  nhl_error; JS `"" != null` → `name_to_monplus("")` fails range check → throw
  'Unknown monster id'. Same outcome (throw), same trigger.
- function → pcalled + optstring-converted; direct non-string → throw like
  nhl_error — inherited from the audited-whole helper. Old code froze functions
  as source text and coerced numbers into the lookup (wrong error); both old
  and new paths throw for direct non-strings, so the delta is throw-site/message
  only, and C-shaped now.
- Gender RNG stays deferred to `splev_create_monster` — pre-existing structure,
  disclosed, untouched by this diff.
- Reachability: `l_create_monster` (the only entry to the table form) has no
  in-repo callers — the delta is currently unreachable in scored paths, so
  regression risk is nil and the change is pure C-fidelity for future callers.
  (Minor: D-log cites `:3166–3180`; `csym.mjs` prints `:3166–3179`. Citation
  off-by-one, not a code gap.)

Required `sym.mjs` output (diff touches only this local's body):

```text
lspo_monster_normalize_table NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:23190
```

No symbol deleted or re-pointed; no import change (edge at mklev.js:150 predates).

## Hallucinations / overclaim

None. "All des.monster callers pass string ids" holds (no callers reach the
table form at all). Corpus framing is the correct vacuous note.

## Density

Breadth-phase small SHA (no-gap regime; D-3467…D-3476 precedent). Per-function verdicts:

- id call-site rewire — whole :3169 port, downstream twin unchanged and whole. OK.
- `impossible` `audited` — body really whole vs C modulo named Rule #2 omits. OK.
- No `Left open:`, no bundled Must-fix.

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (cited in 2399).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_str_opt` → syntax/rule2 PASS,
  2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green 2/2,
  strict ×2, cohort 7/7, full 44/44; node:test 6/6.
- Audit re-measure (`hidden-proxy.mjs verify impossible,get_table_str_opt
  --base 0ee053d49~1 --reach-all`): 0 blocked both functions (vacuous,
  correctly labeled); smoke 24 PASS / 0 regressed → REACH-OK each.
  No REGRESSED session. Matches the D-log.
- New test's wiring assert (helper call present, `String(tmp.id)` gone)
  authenticates the change on the file.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
