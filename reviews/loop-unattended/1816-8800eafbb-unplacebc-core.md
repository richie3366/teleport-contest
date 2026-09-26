# Review 1816 — 8800eafbb — unplacebc_core (D-2857)

- SHA: `8800eafbb` (coverage; `ball.c` `unplacebc_core`)
- Files: `js/ball.js`, plus `await` at the existing `unplacebc` sites in `do.js`, `mhitu.js`, `shk.js`, `teleport.js`, `trap.js`, `wizcmds.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises `unplacebc_core` split out of `unplacebc`: swallowed water-level extract then return; otherwise extract a floor ball, restore a felt `BC_BALL` glyph, `maybe_unhide_at`, `newsym`, then the same for the chain, then `u.bc_felt = 0`. `unplacebc` impossibles when `bcrestriction` is set. Covet calls the core after `rnd(400)`. The diff is that split, the `maybe_unhide_at` import, and `await` on every existing `unplacebc(` call.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `unplacebc_core` | async export `ball.js:449` | `ball.c:146–177` (`staticfn`) |
| `unplacebc` | async export `ball.js:486` | `ball.c:211–219` (`#ifndef BREADCRUMBS`) |
| `maybe_unhide_at` | LIVE `monmove.js:1347` | `mon.c:4696–4720` |
| `obj_extract_self` | LIVE `mkobj.js:3476` | does not clear `ox`/`oy` |
| `set_levl_glyph` | local `ball.js:312` | `levl[ox][oy].glyph =` (cell snapshot, D-1769) |
| `Blind_bc` | local `ball.js:256` | `Blind` |

`sym.mjs`:

```
unplacebc_core   js/ball.js:449   ASYNC — await required
unplacebc        js/ball.js:486   ASYNC — await required
maybe_unhide_at  js/monmove.js:1347   ASYNC — await required
obj_extract_self js/mkobj.js:3476   sync
Blind_bc         NOT EXPORTED — 1 LOCAL: js/ball.js:256
```

Nothing was deleted. `carried(obj)` is `where == OBJ_INVENT`. The core tests `(where | 0) !== OBJ_INVENT`, which is `!carried`.

## C ↔ JS fidelity

`csym` body is `ball.c:146–177`. Core callers in the non-breadcrumb build: `unplacebc` `:218` and `unplacebc_and_covet_placebc` `:230`. `:302` and `:321` are inside `#else /* BREADCRUMBS */`. `config.h:644` leaves `BREADCRUMBS` commented out, so those are not this build. JS covet (`ball.js` `unplacebc_and_covet_placebc`) sets `bcrestriction = rnd(400)` then `await unplacebc_core()`. It does not call `unplacebc`, which would now refuse the pin. That matches `:226–230`.

Swallowed: if `Is_waterlevel`, extract the ball when it is not in invent, always extract the chain, then return. No glyph, no `maybe_unhide_at`, no `newsym`. Not swallowed: the same `where` test extracts the ball, then if `Blind && (bc_felt & BC_BALL)` writes `u.bglyph` at `uball->ox/oy`, then `maybe_unhide_at` and `newsym`. The chain is always extracted, then the `BC_CHAIN` / `u.cglyph` pair, then `maybe_unhide_at`, `newsym`, `bc_felt = 0`. `remove_object` (`mkobj.js:3445–3460`) keeps `ox`/`oy`, so the reads after extract are the floor square. No `rn2` in the core. Covet's one `rnd(400)` is the wrapper.

`unplacebc` impossibles with `"unplacebc denied, restriction in place"` and returns when `bcrestriction` is set. Otherwise it awaits the core. Every JS `unplacebc(` is awaited (`do.js:1576`, `mhitu.js:1844`, `shk.js:1468`, `teleport.js:1474` and `:1521`, `trap.js:2298` and `:6434`, `wizcmds.js:583` and `:626`). Those are `do.c:1617`, `mhitu.c:1309`, `shk.c:4651`, `teleport.c:485` and `:519`, `trap.c:1956` and `:5118`, `cmd.c:1012` and `:1056`.

`maybe_unhide_at` still returns when `m_at` is null, so the hero `u_at` / `u.uundetected` arm (`mon.c:4706–4709`) does not run. Named. A monster under the iron still takes `hideunder`. `Blind_bc` also treats `uroleplay.blind` and `ublind` as blind. Named; `move_bc` already used that helper. A null `uball` or `uchain` returns. C would dereference. Named. `flip_level` (`mklev.js:18895`) still omits ball and chain; `sp_lev.c:582` is that pre-existing omit, not a new call.

## Hallucinations / overclaim

The subject says covet awaits the core, not `unplacebc`. The wrapper does. It says callers of `unplacebc` await it. The grep of `unplacebc(` in `js/` has no bare call. "Match C" is the core and the non-breadcrumb wrappers. The hero unhide arm and the null-object return are named, not claimed.

## Density

The whole 32-line core, both live C callers of it, and awaits on the existing `unplacebc` sites. Under the 200-line floor because C is that small.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify unplacebc_core --base 8800eafbb~1 --reach-all`.

```
verify unplacebc_core: baseline 8800eafbb~1 (scoreboard at 72aae4086) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke unplacebc_core: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Green, cohort, and full 44 were not re-run in this audit.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
