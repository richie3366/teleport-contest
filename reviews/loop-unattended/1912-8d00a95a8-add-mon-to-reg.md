# Review 1912 — 8d00a95a8 — add_mon_to_reg (D-2953)

- SHA: `8d00a95a8` (coverage; `region.c` `add_mon_to_reg`, plus the prefix helpers that read the same list)
- Files: `js/region.js` rewrites `add_mon_to_reg`, `mon_in_region`, and `remove_mon_from_reg`, and the `run_regions` death arm decrements `n_monst`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- The diff adds imports; it does not delete a symbol. `sym.mjs`:

```
m_monnam         js/do_name.js:855   sync
impossible       js/display.js:8274   ASYNC — await required
add_mon_to_reg   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/region.js:443
```

`imports.mjs --can js/region.js js/do_name.js m_monnam` → `ALREADY`. `--can js/region.js js/display.js impossible` → `ALREADY`. C `add_mon_to_reg` is called only from `region.c`, so the one file-local is that function.

## Intent vs deliverable

Subject promises one file-local `add_mon_to_reg`: `mon_in_region` on `n_monst`, long-worm return, `impossible` for any other duplicate, grow by `MONST_INC` (5), then `monsters[n_monst++] = m_id`. The diff is that function, the two list helpers, and the `run_regions` removal so the prefix stays live. The array length is `n_monst`, not `max_monst`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `add_mon_to_reg` | file-local `region.js:443` | `region.c:160–186` |
| `mon_in_region` | file-local `:420` | `region.c:209–218` |
| `remove_mon_from_reg` | file-local `:475` | `region.c:191–202` |
| `m_monnam` | live sync `do_name.js:855` | duplicate message |
| `impossible` | live async `display.js:8274`, not awaited | `pline.c` disorder |
| `MONST_INC` | `5` at `:65` | `region.h:55` |
| `run_regions` death arm | `:1077–1086` | `region.c:444–455` |

## C ↔ JS fidelity

`region.c:166–186`. `mon_in_region` true: if `mon->data != &mons[PM_LONG_WORM]`, `impossible` with `m_monnam` and `%u` of `m_id`, then return. Else grow when `max_monst <= n_monst`: `alloc` of `max_monst + MONST_INC` unsigneds, copy `max_monst` slots when that is positive, `free` the old buffer, store the pointer, add `MONST_INC`. Then `monsters[n_monst++] = m_id`. No RNG.

`mon_in_region` (`:213–217`) scans `i < n_monst` for `m_id`. JS `:421–427` is that loop. `remove_mon_from_reg` (`:196–200`) swaps with `monsters[n_monst]` after the decrement and returns. JS `:480–486` does that and sets `length` to the new count, so the vacated slot is not a second copy. `region.h:55` is `#define MONST_INC 5`.

The long-worm test cannot be pointer identity: `mons()` builds a new object. JS compares `(data.mndx ?? mnum)` to `monsterNames.indexOf('PM_LONG_WORM')`. `m_id >>> 0` is the unsigned id in the same sentence. `void impossible(...)` does not await `display.js:8274` (`urgent_pline` then the disorder line). The commit names that. A null `mon` throws; C would dereference.

Grow: a zero `max_monst` skips the copy, then `max_monst` becomes 5 and slot 0 is stored, so `length` is 1 while `max_monst` is 5. Later growth copies `max` slots. Spare slots stay off `.length`. Readers in this file use `n_monst`.

Callers: prototype `region.c:22`. `region.c:323` `add_region` → `region.js:591`. `region.c:569` `m_in_out_region` → `:948`. `region.c:605` `update_monster_region` → `:902`. `region.c:630` is inside `#if 0` `replace_mon_regions` (`:613–632`), named unwired.

`region.c:444–455` walks `j < n_monst`, `find_mid(..., FM_FMON)`, and on a missing, `DEADMONSTER` (`monst.h:214`, `mhp < 1`), or a true callback, decrements `n_monst`, swaps, writes 0, and `--j`. JS `:1077–1086` is that for a gas region. The `continue` at `:1067` still skips every other `inside_f`. That limit is named; it is not an arm of `add_mon_to_reg`.

## Hallucinations / overclaim

The subject says no arm of `add_mon_to_reg` is omitted. The membership return, the worm exception, the grow, and the store are present. It also says `impossible` is not awaited and that the monster walk is gas-only. Both match the file. `sym.mjs` marks `impossible` async. The subject does not claim `replace_mon_regions` is live.

## Density

The coverage row asked for `add_mon_to_reg`. The 27-line body shipped. The list helpers and the death arm are the same prefix, not a second subsystem. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify add_mon_to_reg --base 8d00a95a8~1 --reach-all`.

```
verify add_mon_to_reg: baseline 8d00a95a8~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify add_mon_to_reg: no corpus session is blocked on it at 8d00a95a8~1 — a vacuous verify is NOT a corpus PASS. …
smoke add_mon_to_reg: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty blocked-line is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line; full suite was skipped because `region.js` is not on the shared-file list.

## Actionable C-wrongs

None. The floating `impossible` and the gas-only walk are named, and they are not a missing arm of this function.

Verdict: **ACCEPT**
