# Review 2028 — 774d64d58 — timeout.c trio (print_queue/cleanup_burn/property_by_index)

Metadata: SHA `774d64d58`, D-3068, js/timeout.js + js/mkobj.js +
js/wizcmds.js (+81/−93) + scripts/timeout-trio.test.mjs. Cluster: 3
whole timeout.c functions.

## Intent vs deliverable

Promise: fix print_queue's dead `#else` arm, port cleanup_burn with
all three dispatch sites, port property_by_index and delete the
wizcmds table clone. Diff delivers all of it plus the TIMER_MONSTER
fmt arm. Kept.

## Inventory (per function)

- `print_queue` (js/timeout.js:2590, file-local like C staticfn):
  live-arm switch to shared TIMEOUT_FUNC_NAMES (newly exported from
  mkobj.js — export, not clone #2).
- `cleanup_burn` (NEW export js/timeout.js:1828, sync): whole C body;
  wired at all 3 C dispatch sites in mkobj.js (stop_timer :1416,
  obj_stop_timers :1337, spot_stop_timers :1649).
- `property_by_index` (NEW export js/timeout.js:2531, sync):
  whole C body with sentinel-synthesis clamp; both wizintrinsic sites
  converted; 70-line wizcmds PROPERTYNAMES clone DELETED.
- No new clones; no stubs.

Required `sym.mjs` paste (deleted table + new exports):

```text
property_by_index js/timeout.js:2531   sync
cleanup_burn     js/timeout.js:1828   sync
```

(`PROPERTYNAMES`: no occurrences left outside js/timeout.js —
clone fully gone. `sym.mjs` has no entry for the deleted const by
design; grep confirms.)

## C ↔ JS fidelity (per function)

`print_queue` — C timeout.c:2013–2037: `#define VERBOSE_TIMER`
unconditional (:1963, verified by read) so the live arm is
`%s(%s)` with `timeout_funcs[func_index].name`. JS prints
`name(ptr)` via TIMEOUT_FUNC_NAMES whose 9-entry order I verified
identical to C :1978–1990; `start_timer` stores `action: funcN`
(normalized), so the index is safe. Padding (`%4ld/%-6s`) matches.
Sole caller :2058 → pre-existing `wiz_timeout_queue_lines` kept.
fmt `%p` → o_id/m_id/a_long hex (established precedent). Confirm.

`cleanup_burn` — C :1827–1844: !lamplit impossible+return ✓
(null-safe xname a benign extension), del_light_source ✓, age +=
expire−moves ✓, lamplit=0 ✓, invent-only update_inventory ✓.
Dispatch mirrors C's `timeout_funcs[func_index].cleanup` null-check
at all three sites (:2311/:2389/:2430, read): only BURN_OBJECT's
slot is non-null (:1984), so the `=== BURN_OBJECT` gate is exact —
including that stop_timer now impossibles on unlit (C calls the
cleanup unconditionally too; the old `obj.lamplit` gate was the
divergence). Export (vs C staticfn) justified: the queue lives in
mkobj.js. Confirm.

`property_by_index` — C :116–125: OOB → sentinel `{0,0}` (prop 0,
null name); null out-param allowed. JS clamp synthesizes exactly
that. Full-table diff run here: 68/68 prop keys and 68/68 names
identical to C in order (only delta: C's trailing sentinel, by
design). Callers wizcmds.c:973 (loop-until-null, HALLUC_RES
continue, FIRE_RES `--`, `%-27s [%li]`) and :1002 (menu-id−1
reverse) both verified against C source and matched in JS
(`idx: i` stored, reversed via the same function). Confirm.

## Hallucinations / overclaim

None. "Tables diffed identical first" re-verified independently
above against pinned C.

## Density

3 whole functions, one C file, callee closure (print_queue's names,
burn's cleanup, wizintrinsic's lookup) — §2b-shaped. Per-function:
all ACCEPT. `Ledger:` 3 ported (jsonl in-stat). New test 8/8
re-run here (pass).

## Verification

Re-measured `hidden-proxy verify
print_queue,cleanup_burn,property_by_index --base 774d64d58~1
--reach-all`: all three 0-blocked (correctly labelled vacuous) +
smoke 24 PASS, 0 regressed → REACH-OK each. Ban-grep clean;
rulecheck clean (see 2024). Confirm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
