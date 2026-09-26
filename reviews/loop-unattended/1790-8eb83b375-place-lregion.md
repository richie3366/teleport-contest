# Review 1790 — 8eb83b375 — place_lregion (D-2831)

- SHA: `8eb83b375` (coverage; `mkmaze.c` `place_lregion` / `put_lregion_here`)
- Files: `js/mklev.js` both functions, `mkportal`, `setup_waterlevel`; `js/mon.js` comment on `m_into_limbo`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

**Addressed:** D-2836 `e41959f29`

## Intent vs deliverable

Subject promises one `place_lregion` in C order, including the failure `impossible`, a `deltrap` recheck, and a tele oneshot that awaits `rloc` then `m_into_limbo` then `u_on_newpos`. The diff is that body. Stair, portal, and branch stay synchronous. The tele arms return a Promise, and only `u_on_rndspot` awaits it.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `place_lregion` | `mklev.js:722` | `mkmaze.c:354–410` (`void`) |
| `put_lregion_here` | `:601` | `mkmaze.c:412–469` (`boolean`) |
| `bad_location` | same file `:571` | `mkmaze.c:340–351`; missing cell is true |
| `occupied` | `mklev.js:31010` | `mklev.c:1805–1811` (trap/furniture/lava/pool/invocation, not a monster) |
| `deltrap` / `undestroyable_trap` | LIVE `trap.js` | oneshot trap delete |
| `rloc` | LIVE async `teleport.js:1250` | `RLOC_NOMSG` is `0x04` (`hack.h:1394`) |
| `m_into_limbo` | LIVE async `mon.js:1938` | `mon.c:3834–3840` |
| `u_on_newpos` | async `mklev.js:525` | `:455` |
| `mkportal` | same file `:31260` | `mkmaze.c:1463–1479` |
| `mkstairs` | local clone `:31076` | `mklev.c:2157`; `up` is the enum (`LR_DOWNSTAIR` 0, `LR_UPSTAIR` 1, `dungeon.h:36`) |
| `is_branchlev` | local `:31241` | `dungeon.c:1463–1473` returns `branch *` |
| `place_branch` | `:31273` | `mklev.c:1690` takes that pointer |
| `impossible` | LIVE async `display.js:8116` | failure and `mkportal` null trap |
| `setup_waterlevel` | `:17468` | `mkmaze.c:1811–1857`; `panic` is `impossible` then return |

`sym.mjs`:

```
rloc             js/teleport.js:1250   ASYNC — await required
m_into_limbo     js/mon.js:1938   ASYNC — await required
deltrap          js/trap.js:1327   sync
undestroyable_trap js/trap.js:699   sync
mkstairs         NOT EXPORTED — local clone js/mklev.js:31076
impossible       js/display.js:8116   ASYNC — await required
u_on_newpos      js/mklev.js:525   ASYNC — await required
```

`imports.mjs --can mklev.js mon.js m_into_limbo` and `mklev.js teleport.js rloc`: both `ALREADY`.

## C ↔ JS fidelity

`csym` `place_lregion` is `void`. `!lx` with `LR_BRANCH` and `nroom` calls `place_branch(Is_branchlev(&u.uz), 0, 0)` and returns. JS uses `game.level.nroom` and `is_branchlev()`, which walks `game.branches` and returns the branch or null, matching `Is_branchlev`. Then the map is clamped (`lx` at least 1, `ly` at least 0, `hx`/`hy` at the edges). `oneshot` is `lx==hx && ly==hy`. Two hundred `rn1` samples, then a row-major scan with `oneshot` true. Failure calls `impossible("Couldn't place lregion type %d!", rtype)`. That order matches `mklev.js:722` onward. `rn1` is not moved.

`put_lregion_here`. A bad or excluded cell returns false when not oneshot. Oneshot clears `mtrapped`, `deltrap`s a destroyable trap, unlinks the same trap from `game.ftrap` if `deltrap` left it there, and rechecks. The switch is tele / portal / stairs / branch, then true.

Tele (`:444–455`): a monster and not oneshot returns false. A monster and oneshot does `rloc(mtmp, RLOC_NOMSG)` and, when that is false, `m_into_limbo`, then `u_on_newpos`, then true. No monster: `u_on_newpos` then true. JS `:639–651` builds that sequence inside an async function and **returns the Promise**. `place_lregion` treats any truthy value as success and returns it (`if (placed) return placed`), so the 200-try loop stops, and the move has not finished.

`rloc` runs its `rnd`/`rn2` search before its first await (`teleport.js:1288–1340` `await rloc_to_with_msg`). The relocate, `m_into_limbo`, and `u_on_newpos` run only after that await. `u_on_rndspot` (`:690–705`) awaits `place_lregion`, so the arrival path waits. `mklev.js:2398` (C `mkmaze.c:606`, `r.rtype` may be `LR_TELE`) and the other special-level calls do not. Those callers keep placing the level while the Promise is still in `rloc_to_with_msg`. C finishes the move before `place_lregion` returns.

Portal calls `mkportal`. A null `lev` passes dnum 0 and dlevel 0 (named; C would dereference). `maketrap` null calls `impossible('portal on top of portal?')` and returns; the Promise is not awaited from the sync arm. Stairs pass `rtype` 0 or 1 as `up`, with `force` false. Branch passes the branch pointer.

`setup_waterlevel`: not water and not air calls `impossible` with the panic text and returns. C `panic` does not return. No `panic` in scored JS is the named Rule #2 substitute. The bounds, stone-to-water/air fill, and bubble `rn2` were already the body; this hunk adds the guard.

`csym --callers place_lregion`: `dungeon.c:1620/1624/1630` are `u_on_rndspot` (awaited). `mkmaze.c:606` is the region loop at `mklev.js:2398` (not awaited). `mkmaze.c:645` is `LR_BRANCH` at `:2425` (synchronous). `extern.h` is not a call.

## Hallucinations / overclaim

The subject says the tele oneshot awaits `rloc` then `m_into_limbo` then `u_on_newpos`. That is the inside of the Promise. Callers other than `u_on_rndspot` do not wait, so the C order does not hold there. The failure `impossible` is also returned and not awaited by those callers; they ignore the return, and C's `impossible` does not change it. The missing-cell and null-`lev` notes match the code.

## Density

The whole function, `put_lregion_here`, `mkportal`'s null-trap arm, and the `setup_waterlevel` guard in the same file. The tele arm is live and not finished before return.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify place_lregion --base 8eb83b375~1 --reach-all`.

```
verify place_lregion: baseline 8eb83b375~1 (scoreboard at fb4f1bf7d) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke place_lregion: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The tele-region race is not on that smoke path. D-2831's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

1. `put_lregion_here` tele (`mkmaze.c:444–455`) must finish `rloc(mtmp, RLOC_NOMSG)`, `m_into_limbo`, and `u_on_newpos` before `place_lregion` returns. JS returns a Promise. `u_on_rndspot` awaits it; `mklev.js:2398` (`mkmaze.c:606`) and the other sync `place_lregion` calls do not, so a teleport region continues level generation inside `rloc_to_with_msg`.

Verdict: **QUALITY-RISK**
