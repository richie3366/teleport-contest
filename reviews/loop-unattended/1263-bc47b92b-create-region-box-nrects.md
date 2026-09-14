# Review 1263 — bc47b92b — region.c create_region box/nrects + add_rect_to_reg (D-2297)

Metadata: SHA `bc47b92b`, D-2297, map-debt row (no corpus owner; `brief` + `verify` confirm 0 blocked). Method: `git show` stat + full `js/` diff (single file); `csym.mjs create_region` + `add_rect_to_reg`; C caller sites + `#if 0` audit via grep; `sym.mjs` on both new symbols; `hidden-proxy verify --base` re-run; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: exported `create_region` + `add_rect_to_reg` in `js/region.js`, both gas-cloud constructors rewired through them, `inside_region` reading stored `nrects`.
Diff actually adds (`git show bc47b92b -- js/`, 109 lines in `js/region.js` only): the two constructors, `inside_region` nrects loop with `?? rects.length` fallback, both call sites changed from inline literals to `create_region(null, 0)` + `add_rect_to_reg` per cell. Promise kept.

## Inventory

- `create_region` (js/region.js:207, sync, exported) — new, C callee port.
- `add_rect_to_reg` (js/region.js:255, sync, exported) — new, C callee port.
- `inside_region` — loop bound `rects.length` → `reg.nrects ?? rects.length`.
- `create_gas_cloud` / `create_gas_cloud_selection` — constructor rewiring.

## C ↔ JS fidelity

C loci: `create_region` `region.c:78–127`, `add_rect_to_reg` `:132–155` (csym ranges; JS doc comments cite `:79–127`/`:133–157` — one-line header drift each, cosmetic). Field-by-field against the C body:

| C (`region.c:78–127`) | JS (`create_region`) | Match |
|---|---|---|
| `alloc` + `memset(0)` | object literal with explicit zeros/nulls | equivalent |
| box seeded from `rects[0]` iff `nrect > 0`, else `{COLNO, ROWNO, 0, 0}` | same, with `\| 0` coercion | verbatim |
| min/max expansion per rect + `rects[i]` copy | min/max + `push` of fresh `{lx,ly,hx,hy}` | verbatim (copied not aliased — verified in diff) |
| `ttl = -1`, `attach_2_u = FALSE`, `attach_2_m = 0`, NULL msgs | same literals | verbatim |
| all six callbacks `NO_CALLBACK` | all six `NO_CALLBACK` (`-1`, matches `region.c:13`) | verbatim |
| `clear_hero_inside` + `clear_heros_fault` | same two calls (`js/region.js:246–247`) | verbatim |
| `n_monst = max_monst = 0`, `monsters = NULL`, `arg = cg.zeroany` | `0`/`0`/`null`/`0` (zeroed union ≡ 0) | equivalent |

Resulting flags: REG_NOT_HEROS set, INSIDE clear — identical to the old inline literal, so constructor behavior is preserved while gaining the stored box/nrects. Callback assignment order differs (irrelevant). Negative-`nrect` input behaves like C (stored as-is, guarded loops). `nrects: n` with `n = nrect|0` matches C storing `nrect` directly; live callers pass 0.
Callers verified in pinned C: both live gas-cloud constructors pass `(NULL, 0)` — confirmed at `region.c:1297` (`cloud = create_region((NhRect *) 0, 0)` + per-coord tmprect loop) and `:1325` (same shape). `clone_region` (`:227`, the only `(rects, nrects)` caller) sits inside `#if 0` (`:220–256`); `create_msg_region` (`:955`) and `create_force_field` (`:1003`) inside `#if 0` (`:945–1032`) — the D-log's "none new" Named claim verified by grep, not assumed.
`add_rect_to_reg` — push-copy + `nrects+1` + four box comparisons with C's comparison direction (`box.lx > rect.lx` ≡ `rect.lx < box.lx`). Exact. No null-reg guard — C would segfault too, so none is owed.
Side benefit confirmed: the old inline literal had `inside_f: 0` where C says `NO_CALLBACK(-1)`; the new path is strictly closer to C (and `make_gas_cloud` overwrites it anyway per the D-log). `sym.mjs`: both symbols sole-copy sync exports. No STUB, no clone, no new module edge (single-file change).

## Hallucinations / overclaim

None. D-log explicitly frames this as "map-debt, not a live divergence" with the vacuous note spelled out, and the `save_regions/rest_regions` + `free_region` deferrals were already in the module header.

## Density

109 JS lines for two C functions + two call-site rewirings + reader update — squarely in the §2b band, one C locus family, one module.

## Verification

D-log: 16-case hand probe PASS (defaults/flags, seeded-box expansion, copy independence, grow + interior no-op, stored-box early-out, null reg, legacy fallback), syntax/rule2/green 2/2/strict ×2/cohort 7/7 PASS. Re-measured by this review:

```text
verify create_region: baseline bc47b92b~1 (scoreboard at 614cdcf0) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches "row cited 0 blocks", no `--base` debt. Diff grep: no FORCE/DIAG/seed/coordinate/RNG-index reads; region code is RNG-free here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
