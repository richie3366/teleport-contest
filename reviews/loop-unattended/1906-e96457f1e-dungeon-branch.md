# Review 1906 — e96457f1e — dungeon_branch (D-2947)

- SHA: `e96457f1e` (coverage; `dungeon.c` `dungeon_branch`, and the two callers that did not use it)
- Files: `js/dungeon.js` walks `end2.dnum` and panics with the C sentence. `js/quest.js` `expulsion` calls it for `"The Quest"`. `js/mklev.js` `mk_knox_portal` calls it for `"Fort Ludios"` and does not catch the throw.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- The diff does not delete a symbol. `sym.mjs`:

```
dungeon_branch   js/dungeon.js:1261   sync
dname_to_dnum    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:1246
```

C `dname_to_dnum` is `staticfn`, so the one file-local is that function.

## Intent vs deliverable

Subject promises one `dungeon_branch`: `dname_to_dnum`, then the branch whose `end2.dnum` matches, else the C panic. The diff is that walk, the panic period on `dname_to_dnum`, and the two call sites. A missing `end2` is a throw, not dungeon 0.

## Inventory

| JS | Class | C |
|----|-------|---|
| `dungeon_branch` | live sync `dungeon.js:1261` | `dungeon.c:1869–1886` |
| `dname_to_dnum` | file-local (C `staticfn`) `:1246` | `dungeon.c:283–295` |
| `expulsion` | caller `quest.js:260` | `quest.c:193` |
| `mk_knox_portal` | caller `mklev.js:28056` | `mklev.c:2630` |
| `at_dgn_entrance` | caller `dungeon.js:1284` | `dungeon.c:1901` |

## C ↔ JS fidelity

`dungeon.c:1875–1884`. `dnum = dname_to_dnum(s)`. Walk `br = svb.branches; br; br = br->next`. Break when `br->end2.dnum == dnum`. If `br` is null, `panic("dgn_entrance: can't find entrance to %s", s)`. Return `br`. No `rn2`. The comment above the function says this is not "Dungeons of Doom", there is one branch, and `end2` is the child.

JS `:1262–1277` calls `dname_to_dnum`, then walks `game.branches` by index and breaks on the first `(end2.dnum | 0) === (dnum | 0)`. `end2` is read, not `end2?.dnum | 0`, so a missing child is not dungeon 0. No match throws `dgn_entrance: can't find entrance to ${s}`. `insert_branch` leaves `.next` null and stores the link order in the array (named, D-2630). The first array hit is the first `br->next` hit when that order is the link order.

`dname_to_dnum` (`:283–292`): `i` from 0 to `n_dgns - 1`, `!strcmp(dungeons[i].dname, s)` returns `i`. Else `panic("Couldn't resolve dungeon number for name \"%s\".", s)` and the `return 0` is not reached. JS `:1247–1251` is `===` on `dname` and throws that sentence, including the period. `strcmp` and `===` agree on these dungeon name strings.

Callers: `dungeon.c:1901` → `at_dgn_entrance` `:1284`. `mklev.c:2630` → `mklev.js:28056` (the `try/catch` return is gone; `:2631` is the comment). `quest.c:193` → `quest.js:260`. `dest` is `end2` when `end1.dnum == u.uz.dnum`, else `end1` (`quest.c:194`, `quest.js:261–263`). The `extern.h:899` line is the prototype. `at_dgn_entrance` still returns false when `u.uz` is missing (`:1286–1288`); C `on_level(&u.uz, …)` would dereference. That guard was already there.

## Hallucinations / overclaim

The subject says no arm of `dungeon_branch` is omitted. The walk and the panic are the body. It also says `dname_to_dnum` clones in `dig` / `do` / `potion` stay. `sym.mjs` shows one file-local, in `dungeon.js`. Those three files do not define the function. The array-versus-`next` note and the unreached `return 0` are accurate.

## Density

The coverage row asked for `dungeon_branch`. The 18-line body shipped. The three C callers call it. `expulsion` and `mk_knox_portal` are those callers, not a second subsystem.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify dungeon_branch --base e96457f1e~1 --reach-all`.

```
verify dungeon_branch: baseline e96457f1e~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify dungeon_branch: no corpus session is blocked on it at e96457f1e~1 — a vacuous verify is NOT a corpus PASS. …
smoke dungeon_branch: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`dungeon.js` is shared).

## Actionable C-wrongs

None. The missing-`u.uz` false return is the existing `at_dgn_entrance` guard, not an arm of this function.

Verdict: **ACCEPT**
