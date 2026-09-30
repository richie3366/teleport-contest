# Review 2135 — 3f8f47e04 — region validation closure

SHA `3f8f47e04`, D-3175; 2026-09-30; +119 JS; closes review 2126.

## Intent vs deliverable

“Validate options and booleans in C order” restarts two bindings and
region/boolean/parameter adapters, corrects array conversion, exports
shared dungeon option/string readers and expands optional padding.

## Inventory — lspo_teleport_region

l_teleport_region export; coder/region-add verified local C callees;
parameter/region CLONEs; option reader imported LIVE.

## C ↔ JS fidelity — lspo_teleport_region

sp_lev.c:5442–5460 coder→table→region→dir→padding/name→add matches;
unknown direction errors. Registration/loader callers retained.

## Inventory — lspo_levregion

l_levregion export; same closure plus imported string reader LIVE.

## C ↔ JS fidelity — lspo_levregion

sp_lev.c:5471–5494 validates type before padding/name; signed-16 padding,
then add. Every arm/callee represented; no silent stub.

## Inventory — l_get_lregion

New private C-matched CLONE; region/boolean CLONEs.

## C ↔ JS fidelity — l_get_lregion

sp_lev.c:5406–5436 region→exclude→booleans→negative-original-x guard
matches; narrowing precedes storage but does not change guard operand.
Both callers :5451/:5486 wired.

## Inventory — lcheck_param_table

New local adapter CLONE.

## C ↔ JS fidelity — lcheck_param_table

nhlua.c:223–236 zero args makes table, explicit nil errors, extras discarded.
Two region callers wired; other callers individually named inherited.

## Inventory — get_table_boolean

New local CLONE; option reader LIVE, integer adapter verified CLONE.

## C ↔ JS fidelity — get_table_boolean

nhlua.c:1078–1104 string returns option **index**, boolean returns 0/1,
number int32-casts then rejects outside 0/1; other types error.
Sole boolean_opt caller wired.

## Inventory — get_table_boolean_opt

New local CLONE using boolean body.

## C ↔ JS fidelity — get_table_boolean_opt

nhlua.c:1106–1118 only nil defaults; region callers wired. Other 49
caller sites explicitly named, not claimed completed.

## Inventory — get_table_intarray_entry

Changed local unpacked CLONE; numeric adapters verified against Lua 5.4.8.

## C ↔ JS fidelity — get_table_intarray_entry

sp_lev.c:5259–5279 number-test precedes integer conversion; fractions
become zero, exact integer strings retain low bits. All six calls wired.
Region reader :5281–5316 preserves optional/length/read-order guards.

## Inventory — get_table_str_opt

Exported/changed real C callee; callback is named Lua-runtime adaptation.

## C ↔ JS fidelity — get_table_str_opt

nhlua.c:1053–1076 direct string/nil accepted, direct number rejected;
callback string/nil/number accepted, then NUL-terminated dupstr.
Integral JS numbers represent Lua integers, explicitly named type boundary;
remaining twenty callers map-named.

## Inventory — get_table_option

Existing whole body exported/imported; no new clone.

## C ↔ JS fidelity — get_table_option

nhlua.c:1121–1133 exact option lookup, nil-only default, error preserved.
Region type/direction and boolean-string calls use the real binding.

## Inventory — get_table_int_opt

Whole padding path expanded locally; dungeon approximation remains named.

## C ↔ JS fidelity — get_table_int_opt

nhlua.c:1028–1039 nil/default/checkinteger/int cast, then destination
coordxy at sp_lev.c:5489. Direct int16 preserves the same low bits.

## Hallucinations / overclaim

No dispatch/stub overclaim. coder :6443–6448 and levregion_add :5370–5402
retain guarded initialization and inarea→delarea get_location order;
RNG remains entirely in existing placement callees.
Required historical sym output:

```text
get_table_option js/dungeon.js:431 sync
get_table_str_opt js/dungeon.js:380 sync
LREGION_TYPES NOT FOUND in js/** (no export, no local function/const).
```

Rule #2 clean; mklev→dungeon ALREADY; diff scan empty. No cycle excuse.

## Density

One Must-fix closure, nine ledger functions plus unchanged export:

- Ledger: lspo_teleport_region split — ACCEPT-WITH-DEBT.
- Ledger: lspo_levregion split — ACCEPT-WITH-DEBT.
- Ledger: l_get_lregion ported — ACCEPT.
- Ledger: lcheck_param_table partial — ACCEPT-WITH-DEBT.
- Ledger: get_table_boolean ported — ACCEPT.
- Ledger: get_table_boolean_opt partial — ACCEPT-WITH-DEBT.
- Ledger: get_table_intarray_entry split — ACCEPT.
- Ledger: get_table_str_opt partial — ACCEPT-WITH-DEBT.
- Ledger: get_table_option existing partial, export-only — ACCEPT-WITH-DEBT.
- Ledger: get_table_int_opt partial — ACCEPT-WITH-DEBT.

Individual Verify/Ledger entries present for nine shipped bodies; option
export adds no new body. Whole bodies, inherited caller omissions named.

## Verification

Historical ten-symbol `verify` (all above), `--base 3f8f47e04~1 --reach-all`:

| Function | verify | smoke |
|---|---|---|
| lspo_teleport_region | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| lspo_levregion | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| l_get_lregion | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| lcheck_param_table | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| get_table_boolean | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| get_table_boolean_opt | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| get_table_intarray_entry | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| get_table_str_opt | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| get_table_option | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| get_table_int_opt | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |

Twelve focused tests pass. D-log green/strict, cohort 7/7, full 44/44.

## Actionable C-wrongs

None newly found; inherited caller/Lua-runtime omissions remain named.

Verdict: **ACCEPT-WITH-DEBT**
