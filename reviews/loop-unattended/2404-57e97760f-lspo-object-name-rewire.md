# Review 2404 — 57e97760f — lspo object name rewire

## Metadata

- SHA: `57e97760f` (2026-10-05) — D-3484.
- Subject: Open head: impossible audit + lspo_object name→get_table_str_opt
  rewire (sp_lev.c:3637 raw-passthrough gap).
- Diff: `js/mklev.js` (+7/−0 in `lspo_object_normalize_table`), new
  `scripts/lspo-object-name.test.mjs` (49 lines), docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty (`ledger.mjs batch`: no gap left); the rewire rides the Open head
  per the D-3467…D-3482 precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) the name
site restarted through the live helper (C :3637) placed after buc and
before quantity to keep C's pcall order (:3635→:3637→:3638); (c) behavior
delta is exactly the C conversion.

The diff actually adds: one call `tmp.name = get_table_str_opt(tmp,
'name', null)` plus a 6-line C comment. No import change. Delivered =
promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| name site (:22981–22987) | C call wiring | sp_lev.c:3637 via :3631–3655 | whole |
| `get_table_str_opt` (dungeon.js:388, unchanged) | LIVE import (edge mklev.js:150) | nhlua.c:1053–1076 | whole (see 2403) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; body untouched by this SHA) |

## C ↔ JS fidelity

C (sp_lev.c:3631–3655, read at the cited range): table arm reads spe
:3634, buc :3635, name :3637 (`get_table_str_opt(L, "name", NULL)`),
quantity :3638, then xy :3650, id :3652, class :3653.

Branch-by-branch confirm:

- `:3637` read — JS :22987 calls the live helper with `(tmp, 'name',
  null)`. `tmp` is the `{...o}` spread at the caller's table gate
  (:23037), so `lua_field` ≡ `tmp.name`; classifications match C (helper
  body verified arm-for-arm in review 2403). OK.
- Pcall order — the call sits between the buc default (:22978–22980, C
  :3635) and the quantity read (:22991, C :3638): spe→buc→name→quantity,
  exactly C's order among pcalling reads. (The id/class-before-xy order
  below predates this SHA via D-3480 and is unchanged.) OK.
- Consumer — `create_object` computes `named = !!(o.name)` (:22288):
  null (absent) → unnamed, same as undefined before; strings verbatim
  into `oname` (:22348). Functions now pcall (old: named `''`); direct
  non-strings throw like nhl_error (old: `.str`/`''` degradation).
  Exactly the C conversion. OK.
- Caller census (re-run) — all 47 `l_create_object` call sites live in
  mklev.js; word-boundary grep finds no object/computed/empty-string
  `name:` values (earlier `rname:`/`fname:` hits are different keys);
  the only `name: null` (:22868) is the string-path default, which never
  calls normalize; the direct `create_object` name (:7388, Eye) is a
  plain string bypassing normalize. No in-tree behavior change. OK.
- Unreachable corner (pre-existing, not this SHA's): C's `named =
  o->name.str ? TRUE : FALSE` (:2200) is a pointer test, so C would
  oname an empty string while JS `!!""` leaves it unnamed. No
  empty-string name exists in tree, and the consumer line is unchanged
  by this SHA. Debt note only.

Required `sym.mjs` output (diff re-points the name read to the import):

```text
get_table_str_opt js/dungeon.js:388   sync
```

No symbol deleted; no import change (edge at mklev.js:150 predates).

## Hallucinations / overclaim

None. The C-order claim holds among the pcalling reads, the census
reproduces (including the string-path/bypass exclusions), and the corpus
framing is the correct vacuous note. The ledger row lands complete this
time (8-caller omit, ends clean — no 300-cap clip).

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + :3637 rewire ride the Open head per precedent. Per-function
verdicts:

- name call-site rewire — whole :3637 port, order kept, census clean. OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_str_opt` partial — helper unchanged (whole); 8-caller omit
  accurate and unclipped. OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (cited in
2403; no new imports).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_str_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, full 44/44; node:test 18/18 (three files).
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_str_opt --base 57e97760f~1 --reach-all`): 0 blocked
  both functions (vacuous, correctly labeled); smoke 24 PASS / 0 regressed
  → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/lspo-object-name.test.mjs`: 6/6 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
