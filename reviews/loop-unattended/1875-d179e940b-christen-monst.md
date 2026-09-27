# Review 1875 — d179e940b — christen_monst (D-2916)

- SHA: `d179e940b` (coverage; `do_name.c` `christen_monst`)
- Files: `js/do_name.js` (body + `new_mgivenname` import), `js/end.js` (two `savebones` names)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck` (this tree): "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (the local write was re-pointed at the restore export):

```
christen_monst   js/do_name.js:428   sync
new_mgivenname   js/restore.js:51   sync
update_inventory js/invent.js:4745   sync
```

`imports.mjs --can js/do_name.js js/restore.js new_mgivenname`: ALREADY. No second `christen_monst`.

## Intent vs deliverable

Subject promises one `christen_monst` in C order: `lth` from `strlen+1`, cap at `PL_PSIZ`, `new_mgivenname`, copy, leash `update_inventory`, and `savebones` passing `plname` with no `"Player"` / `"ghost"` fallback. The diff does that.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `christen_monst` | export `do_name.js:428` | `do_name.c:131–152` |
| `new_mgivenname` | live `restore.js:51` | `do_name.c:30–47` |
| `update_inventory` | live `invent.js:4745` | leash refresh |
| `savebones` arise / ghost | callers `end.js:1654`, `:1687` | `bones.c:468`, `:501` |

## C ↔ JS fidelity

`csym` is `do_name.c:131–152`. No RNG. `lth` is 0 when `name` is null or empty; otherwise `strlen+1`. JS cuts at the first NUL (C `strlen`), then uses that length. `PL_PSIZ` is 63 (`global.h:404`, `js/const.js`). When `lth > 63`, both set `lth` to 63 and keep 62 characters plus a terminator (`strncpy` of `PL_PSIZ-1`, then `buf[PL_PSIZ-1] = 0`; JS `slice(0, 62)`).

`new_mgivenname(mtmp, lth)`: nonzero `lth` ensures `mextra` and drops the old name, then the caller copies; zero `lth` drops the old name and keeps `mextra`. JS assigns `mextra.mgivenname = src` only when `lth` is nonzero. An empty name no longer leaves a legacy `mgivenname`. `mleashed` calls `update_inventory()`. Returns `mtmp`.

A null `mtmp` returns. C `NONNULLARG1` would fault. A non-string `name` is treated as empty. Both are named.

Callers that already invoked the export still do, at the C sites: `do_name.c:280` → `js/do_name.js:596`; `:1583` → `:1520`; `dog.c:201` → `js/dog.js:275`; `:280` → `:336`; `extralev.c:303` → `js/extralev.js:307`; `makemon.c:904` and `:906` → `js/makemon.js:3963` and `:3965`; `:1375` → `:3391`; `mhitu.c:2630` `cloneu` → `js/sit.js:995` (`game.plname`); `mkmaze.c:847` → `js/mklev.js:2351`; `mplayer.c:142` → `js/mplayer.js:183`; `pickup.c:2859` → `js/pickup.js:3398`; `sp_lev.c:1995` → `js/mklev.js:22382` (also `load_wiz_goal` `:7070` and `load_tower1` `:13722`); `topten.c:1461` → `js/makemon.js:1170`; `trap.c:803` → `js/trap.js:389`; `zap.c:1098` → `js/zap.js:3255`. `extern.h:687` only declares it. `bones.c:468` and `:501` now pass `game.plname || ''`, which is `svp.plname` when the name is empty.

## Hallucinations / overclaim

The subject says no arm is omitted. The length, cap, allocate-or-clear, copy, and leash arms are the whole body. The null-monster return and the non-string name are named safety, not a dropped switch arm. `load_wiz_goal` / `load_tower1` are named as the split of `create_monster`, and both still call this function.

## Density

One 19-line C function. The diff is small because C is that small. Callees `new_mgivenname` and `update_inventory` are live. No stub arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify christen_monst --base d179e940b~1 --reach-all`.

```
verify christen_monst: baseline d179e940b~1 (scoreboard at 5c4c2ccc6, 2026-09-27T00:45:20.136Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify christen_monst: no corpus session is blocked on it at d179e940b~1 — a vacuous verify is NOT a corpus PASS. …
smoke christen_monst: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line (full suite skipped: two files, script said no shared file).

## Actionable C-wrongs

None. Empty name clears, a long name keeps 62 characters, and a leash calls `update_inventory`, matching `do_name.c:139–150`.

Verdict: **ACCEPT**
