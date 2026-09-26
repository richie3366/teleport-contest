# Review 1833 — 048c1316e — overview_stats (D-2874)

- SHA: `048c1316e` (coverage; `dungeon.c` `overview_stats`)
- Files: `js/dungeon.js` (+78). No symbol deleted.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `overview_stats`: six counters, walk the mapseen chain, add 384 per node and 184 per cemetery, add `custom_lth + 1` for a nonzero annotation, always emit the general row, emit cemetery and annotations only when those counts are nonzero, and add both sums into the caller's totals. The diff adds that function and a row formatter. Nothing was re-pointed. `sym.mjs`:

```
overview_stats     js/dungeon.js:1971   sync
overview_stats_row NOT EXPORTED — 1 local js/dungeon.js:1953
wiz_show_stats     NOT FOUND
```

`overview_stats_row` is not a C function. It is the `Sprintf` of `template[]`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `overview_stats` | export `dungeon.js:1971` | `dungeon.c:2760–2801` |
| `overview_stats_row` | local formatter | `wizcmds.c:1112` `"%-27s  %4ld  %6ld"` |
| `SIZEOF_MAPSEEN` / `SIZEOF_CEMETERY_STATS` | constants 384 / 184 | `sizeof (mapseen)` / `sizeof (struct cemetery)` |

## C ↔ JS fidelity

`csym` body is `dungeon.c:2760–2801`. Callers: `wizcmds.c:1668` inside `wiz_show_stats` (`extern.h:930` is the declaration). No RNG.

Counters start at 0. Each node increments `ocount` and adds 384. Each `final_resting_place` node increments `bcount` and adds 184, following `.next`. `clone_cemetery_chain` (`dungeon.js:2270`) builds that list. A nonzero `custom_lth` increments `acount` and adds `custom_lth + 1`. `doname`-adjacent annotation code sets `custom_lth` to `nbuf.length` and says the NUL is excluded (`dungeon.js:2967–2971`), so the `+ 1` is the C NUL.

`game.mapseenchn` is an array (`init_mapseen`, `dungeon.js:1593`). Nodes have no `.next`. The array walk is that chain in index order. A non-array head uses `.next`. The general row is pushed even when every count is 0. Cemetery and annotations rows are pushed only when their counts are nonzero. `total.count` and `total.size` gain the three sums (`:2798–2799`).

The row text is `padEnd(27)`, two spaces, `padStart(4)`, two spaces, `padStart(6)`. That is `%-27s`, `%4ld`, `%6ld` for the one template the only caller passes (`wizcmds.c:1668`). Wider numbers are not truncated. `sizeof` 184 is the same constant as `wizcmds.js` `SIZEOF_CEMETERY`. This review did not recompile `sizeof (mapseen)`.

`wiz_show_stats` is not in `js/`. The map names that (`docs/c-js-map/data.md`), including the object and monster chain helpers the command would also need. `sym.mjs` confirms the symbol is absent. Nothing in `js/` calls `overview_stats`.

## Hallucinations / overclaim

The subject does not say `#stats` now prints the section. It says the counters and the row text. The caller omit is in the map. The size constants are labeled as an LP64 probe, not as a second source file in the diff.

## Density

One 42-line function. 78 insertions. The missing caller is a different C function, named in this commit.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify overview_stats --base 048c1316e~1 --reach-all`.

```
verify overview_stats: baseline 048c1316e~1 (scoreboard at 8ddebb670) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke overview_stats: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Nothing calls the function, so the smoke cannot enter it.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
