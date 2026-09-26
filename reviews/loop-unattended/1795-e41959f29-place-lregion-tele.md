# Review 1795 — e41959f29 — place_lregion tele chain (D-2836)

- SHA: `e41959f29` (Must-fix from review 1790; `mkmaze.c` `place_lregion` / `put_lregion_here`)
- Files: `js/mklev.js` only (`isThenable`, `afterPending`, `walkRegions`, caller wiring)
- Queue row: Must-fix review 1790, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the tele Promise settles only after `rloc`, `m_into_limbo`, and `u_on_newpos`, and that `afterPending` / `walkRegions` / `await` run the next region, the branch fallback, Medusa, and `premap_detect` after that Promise. The diff is those three helpers plus every `place_lregion` / `fixup_special` / loader call site returning or awaiting the Promise. Stair, portal, and branch stay booleans. Failure `impossible` is no longer returned.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `isThenable` / `afterPending` / `walkRegions` | local scheduling, no C names | stand in for C's synchronous return |
| `put_lregion_here` | `mklev.js` (this SHA) | `mkmaze.c:412–469` |
| `place_lregion` | sync export | `mkmaze.c:354–410` (`void`) |
| `u_on_newpos` | LIVE async | `dungeon.c` via `:455` |
| `rloc` / `m_into_limbo` | LIVE async, unchanged calls | `:449–451` |
| `finish_fixup_special` | local tail moved behind the chain | `mkmaze.c` tail after `:645` |
| `impossible` | LIVE async `display.js:8116` | failure `:409` |

The diff does not delete an import or re-point a clone onto an export. `sym.mjs` on the working tree (later SHA inlined the tail):

```
place_lregion    js/mklev.js:762   sync
afterPending     NOT EXPORTED — local js/mklev.js:582
walkRegions      NOT EXPORTED — local js/mklev.js:592
isThenable       NOT EXPORTED — local js/mklev.js:572
finish_fixup_special NOT FOUND (inlined by D-2841; present at this SHA)
impossible       js/display.js:8116   ASYNC — await required
```

No new import edge. `imports.mjs --can` is unchanged from review 1790 (`rloc`, `m_into_limbo` already imported).

## C ↔ JS fidelity

`csym` `place_lregion` callers: `dungeon.c:1620`, `:1624`, `:1630` (`u_on_rndspot`); `mkmaze.c:606` (region loop); `mkmaze.c:645` (branch fallback). `:1611` and `extern.h:1634–1635` are comments. `put_lregion_here` is called only from `place_lregion` (`mkmaze.c:398` and `:406`).

Tele (`mkmaze.c:444–455`): a monster and not oneshot returns false. A monster and oneshot does `rloc(mtmp, RLOC_NOMSG)`, then `m_into_limbo` when that is false, then `u_on_newpos`, then true. No monster: `u_on_newpos` then true. JS still returns a Promise. The oneshot monster arm awaits `rloc`, then `m_into_limbo`, then `u_on_newpos`, then resolves `true`. The empty square returns `u_on_newpos`'s Promise (`u_on_newpos` resolves `undefined`; the caller treats the Promise object as success, not the resolved value). `rn1` in the 200-try loop still runs before that return. `rnd`/`rn2` inside `rloc` still run before `rloc`'s first await, and the next region does not start until the outer Promise settles.

`afterPending` runs `fn` immediately when the value is not a Promise, and `p.then(fn)` when it is. `walkRegions` does the same between list entries. `fixup_special` returns that chain: the region walk, then the `:645` branch `place_lregion`, then `finish_fixup_special`. `lspo_finalize_level` awaits it before `premap_detect` (`sp_lev.c:6051` then `:6053`). `load_special_proto_body` awaits a loader only when `isThenable`. Loaders that used to call `fixup_special()` and return now `return fixup_special()` or `return afterPending(...)`. Inline region walks (`load_medusa_1`, `load_wizard3`, and the same shape on the other specials) return `_pendingLregion.then(after)`. A boolean stair, portal, or branch is not thenable, so the next statement runs in this turn.

`u_on_rndspot` still `await`s all three `place_lregion` calls (`dungeon.c:1620–1630`) before `switch_terrain`.

Failure `impossible` (`:409`) is called and not returned or awaited. `impossible` is async. `u_on_rndspot` used to `await` the returned Promise; it no longer waits for that message. The commit names this, and names `mkportal`'s un-awaited `impossible`. Those are the same omissions as review 1790, not a new tele race. A missing cell still makes `bad_location` true. A null portal `lev` still passes dnum 0 and dlevel 0.

## Hallucinations / overclaim

The subject says every caller chains the tele Promise. The `place_lregion` sites are the three `u_on_rndspot` awaits, the `fixup_special` walk and branch fallback, and the special-level walks that return into `walkRegions`. No site discards the return. It does not claim `impossible` is awaited. `finish_fixup_special` is the previous tail (Medusa, Baalzebub, booty, town as separate `if`s). This commit does not claim that tail became the C `else if` chain; D-2841 does that later.

## Density

The Must-fix was the unwired callers. The helpers are small. The line count is the same wrap repeated across every loader. One C function family, one file.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify place_lregion --base e41959f29~1 --reach-all`.

```
verify place_lregion: baseline e41959f29~1 (scoreboard at 0909f26cc) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke place_lregion: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2836's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
