# Review 1783 — 40264ce0a — dmonsfree (D-2824)

- SHA: `40264ce0a` (coverage; `mon.c` `dmonsfree` plus the two free helpers)
- Files: `js/mon.js` bodies; callers in `do.js`, `dog.js`, `end.js`, `mklev.js`, `save.js`, `wizcmds.js`, `zap.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on the working tree: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `dmonsfree` in C order, plus `dealloc_mextra` and `dealloc_monst`, and the live callers `makemap_prepost`, `savelev`'s writing preamble, `dosave0`, `replmon`, `montraits`, and `discard_migrations`. The diff adds those three functions and awaits `dmonsfree` at `movemon`, bones, mazeload, the two save sites, and `makemap_prepost`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `dmonsfree` | async `mon.js:3470` | `mon.c:2486–2511` |
| `dealloc_mextra` | sync `:3423` | `:2648–2673` |
| `dealloc_monst` | sync `:3452` | `:2675–2691` |
| `applyZeromonst` | local stand-in for `*mon = cg.zeromonst` `:3389` | `decl.c` `zeromonst` |
| `impossible` / `describe_level` | imported `display.js` | mismatch text; `describe_level(2)` is the branch-name form |

`sym.mjs`:

```
dmonsfree        js/mon.js:3470   ASYNC — await required
dealloc_monst    js/mon.js:3452   sync
dealloc_mextra   js/mon.js:3423   sync
applyZeromonst   NOT EXPORTED — 1 local js/mon.js:3389
```

`imports.mjs --can mon.js display.js describe_level`: already a static import.

C callers of `dmonsfree` and where JS stands:

| C site | JS |
|--------|----|
| `mon.c:1340` `movemon` | `mon.js:3701` awaited |
| `bones.c:447` | `end.js:1621` awaited |
| `mkmaze.c:1191` | `mklev.js:2796` awaited |
| `cmd.c:1032` `makemap_prepost` | `wizcmds.js:599` awaited, then `dobjsfree` |
| `save.c:488` (`mode != FREEING` and `purge_monsters`) | `do.js:1631` (`WRITING`) and `save.js:481` (`dosave0`) |
| `save.c:1106` `freedynamicdata` | named unported |
| `wizcmds.c:145` `makemap_remove_mons`, `:344` `wiz_kill` | named unported |

`dealloc_monst` callers: `dmonsfree`, `replmon` (`mon.c:2555`, `mon.js:3662`), `zap.c:740` (`zap.js:2894`), `dog.c:959` (`dog.js:1498`). `save.c:909` `savemonchn` `release_data` is named.

## C ↔ JS fidelity

`DEADMONSTER` is `mhp < 1` (`monst.h:214`). The loop drops those members unless `isgd`. C unlinks with `nmon`; JS compacts the `fmon` array and sets `nmon` null before `dealloc_monst`. `fmon` has no `nmon` links (`dog.js` says the array is the chain).

`dealloc_monst`: a leftover `nmon` throws with `describe_level(2)` (C `panic`, no paniclog). Then `dealloc_mextra` when `mextra` is set, then the zero-fill. C `free`s the struct; JS keeps a zeroed shell so a stale holder does not keep the old identity.

`dealloc_mextra` clears `mgivenname`, `egd`, `epri`, `eshk`, `emin`, `edog`, `ebones`, sets `mcorpsenm` to `NON_PM`, then nulls `mextra`. The flat `mgivenname` / `edog` / `eshk` / `epri` / `egd` / `emin` / `ebones` mirrors are cleared too. Those fields live inside `mextra` in C.

After the walk, `count` is compared to `iflags.purge_monsters`. A mismatch awaits `impossible` with the C format string. The counter is then cleared. A missing `iflags` object treats the pending count as 0 and skips the store. `m_detach` (`mhitm.js:3727`) is the only increment, matching `mon.c:2796`. `mondead` leaves the corpse on `fmon`.

`discard_migrations` nulls `nmon`, drops inventory, deletes a monster light, then `dealloc_monst`. Wizard and endgame dests stay. `montraits` frees the traits copy when `makemon` fails. `get_mtraits` / `save_mtraits` store `nmon` null, so the panic check does not fire. `replmon` splices the old monster off `fmon`, nulls `nmon`, and frees it. The light-source swap (`mon.c:2538–2543`) and `replshk` stay where they were.

`savelev`'s writing preamble also calls `dobjsfree` only when `objs_deleted` (`save.c:490`). Both JS sites already called `dobjsfree` on every write before this SHA. That guard was not this port.

## Hallucinations / overclaim

The subject says `mongone` still splices itself off `fmon` (D-1149) and does not call `m_detach`. C `mongone` (`mon.c:3266–3283`) does call `m_detach`, which is what increments `purge_monsters` and leaves the body for this sweep. The JS splice does not increment the counter, so this new sweep does not `impossible` on that path, and it also does not free those monsters. Named, and still true. `freedynamicdata`, `savemonchn` `release_data`, `makemap_remove_mons`, and `wiz_kill` are absent from `js/`. `util/sfctool.c` is not the game.

## Density

The whole `dmonsfree` body, both free helpers, and every C caller that exists in JS. The four unported callers are named in this commit.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify dmonsfree --base 40264ce0a~1 --reach-all`.

```
verify dmonsfree: baseline 40264ce0a~1 (scoreboard at 7a0f166d7) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke dmonsfree: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. No `REGRESSED` session. D-2824's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None. `mongone` → `m_detach` remains the named D-1149 body.

Verdict: **ACCEPT**
