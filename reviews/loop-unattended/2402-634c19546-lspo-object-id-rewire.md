# Review 2402 — 634c19546 — lspo_object id rewire

## Metadata

- SHA: `634c19546` (2026-10-05) — D-3480.
- Subject: Open head: impossible audit + lspo_object id→get_table_str_opt rewire (sp_lev.c:3541 raw-field gap).
- Diff: `js/mklev.js` (+18/−5: id-site restart with pre-resolved fast path), new
  `scripts/lspo-object-id.test.mjs` (49 lines), docs/ledger/scoreboard (+
  LOOP-QUEUE-DONE.md:8 D-3479 hash backfill, bundled).
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest was
  1 recheck (`config_error_add`); the rewire rides the Open head per the no-gap
  precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` + `config_error_add` re-audited whole, no JS change;
(b) object-id site restarted through the live helper (C :3541) read BEFORE the
class field (C :3542 order); (c) integer ids keep an explicit JS-only
pre-resolved-otyp fast path, audited at every in-tree call site; (d) behavior
delta is exactly the C conversion.

The diff actually adds: `rawId`/`preResolved` capture, the helper call, and
`tmp.id = preResolved ? rawId : find_objtype(idStr, classChar)` replacing the
typeof/nil adapter; no import change; a 6-assert node:test file. Delivered =
promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `lspo_object_normalize_table` id site (:22977–22991) | C call wiring + JS-only int fast path | sp_lev.c:3541 via :3538–3547 | whole |
| downstream `find_objtype` (:22812) | unchanged twin | sp_lev.c:3467–3536 | whole (pre-existing) |
| `impossible` | `audited`, no JS change | pline.c:584–634 | re-verified (see 2399) |
| `config_error_add` (cfgfiles.js:425) | `audited` (manifest recheck), no JS change | cfgfiles.c:1864–1872 | verified below |

## C ↔ JS fidelity

C (`csym.mjs get_table_objtype` → sp_lev.c:3538–3547): `s =
get_table_str_opt(L, "id", NULL)` (:3541); `oclass = get_table_objclass(L)`
(:3542); `ret = find_objtype(L, s, oclass)`. C `find_objtype` (:3467–3536):
`if (s && *s)` { class-prefix strip, name loop, descr loop, else
nhl_error("Unknown object id") }; NULL/`""` → `return STRANGE_OBJECT`.

Branch-by-branch confirm:

- `:3541` read — JS `:22990` calls the live helper with `(tmp, 'id', null)`.
  `tmp` is the `{...o}` spread (mklev.js:23017), so `lua_field` ≡ `tmp.id`.
- `:3541→:3542` order — id is now read before `get_table_objclass_field`
  (:22991), matching C. The old code read class first; the fix is disclosed
  and C-correct (matters only for function fields' pcall order).
- nil → NULL → STRANGE_OBJECT, no throw — JS `find_objtype(null)` hits `if
  (!s) return STRANGE_OBJECT`, matching C's `s && *s` false arm. `""` likewise
  on both sides. Old JS produced the same via the nil arm / lookup — unchanged.
- strings — lookup through the unchanged twin (prefix strip, name, descr,
  Unknown-object-id throw all mirror C). Unchanged behavior.
- functions — pcalled + optstring-converted now (old: passed through untouched
  into the otyp slot — garbage). C-correct.
- direct booleans/tables/floats — throw like nhl_error now (old: garbage into
  create_object). C-correct.
- integers — explicit passthrough. Old code also left integers untouched
  (fell through both arms), so the fast path preserves behavior exactly; it is
  new disclosure, not new divergence. The residual C-divergence (a Lua number
  id nhl_errors in C) is disclosed in-code and in the D-entry. Id-source audit
  spot-checked: strings (:5115 'levitation boots', :9352 'statue', :6169 'egg',
  give :11854–11856/:12987–12988), otyp constants (give :9225–9226/:9675–9676/
  :10131–10132/:10674/:11189–11190, TIN :9562, WAN_LIGHTNING :10930,
  SCR_TELEPORTATION :20370, ROCK via tut1 :20096–20100/:20369), nil
  (`{}`), string-form bypasses (:5136/:5986–5988/:6138). No float/boolean/
  function/table id in tree — the newly-throwing arms are unreachable, and
  full 44/44 + smoke confirm.
- `config_error_add` audit — C :1864–1872 is a 3-statement varargs forward;
  JS cfgfiles.js:425 forwards rest args to `vconfig_error_add` (C :1870).
  va_start/va_end have no JS analog; the THIN count is boilerplate. Audit true.

Required `sym.mjs` output (diff touches only this local's body):

```text
find_objtype     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:22812
```

No symbol deleted or re-pointed; no import change (edge at mklev.js:150 predates).

## Hallucinations / overclaim

None. The integer fast path — the one place this SHA knowingly diverges from C
(Lua numbers nhl_error) — is disclosed in the commit, the code comment, and the
D-entry with a verifiable call-site list, and the old code already passed
integers through. Corpus framing is the correct vacuous note.

## Density

Breadth-phase small SHA: manifest (1 recheck) covered by the `config_error_add`
`audited` declaration; impossible audit + :3541 rewire ride the Open head per
the D-3467…D-3478 precedent. Per-function verdicts:

- id call-site rewire — whole :3541 port, order fixed, fast path disclosed. OK.
- `config_error_add` `audited` — body really whole vs C. OK.
- `impossible` `audited` — body really whole vs C modulo named Rule #2 omits. OK.
- No `Left open:`, no bundled Must-fix (hash backfill is the allowed next-commit fill).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (cited in 2399).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_str_opt,config_error_add` →
  syntax/rule2 PASS, 3× hidden note (none blocked), 3× REACH-OK (smoke 24/24),
  green 2/2, strict ×2, cohort 7/7, full 44/44; node:test 6/6.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_str_opt,config_error_add --base 634c19546~1
  --reach-all`): 0 blocked all three functions (vacuous, correctly labeled);
  smoke 24 PASS / 0 regressed → REACH-OK each. No REGRESSED session.
  Matches the D-log.
- New test's wiring assert (helper call present, typeof adapter gone)
  authenticates the change on the file.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
