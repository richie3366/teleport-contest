# Review 1872 — 4c8d21966 — flip_vault_guard (D-2913)

- SHA: `4c8d21966` (coverage; `sp_lev.c` `flip_vault_guard`)
- Files: `js/mklev.js` only
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the new function. `imports.mjs --rulecheck` (this tree): "Rule #2 clean: no bare/node specifiers or fs calls in js/." No new import. `on_level` was already imported from `dungeon.js`.
- `sym.mjs`:

```
flip_vault_guard NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:18880
EGD              js/const.js:3151   sync
on_level         js/dungeon.js:1660   sync
             !! ALSO 12 LOCAL CLONE(S) in 12 files
```

C is `staticfn`. One file-local function is that function. `flip_level` calls the imported `on_level`, not one of the other clones.

## Intent vs deliverable

Subject promises one `flip_vault_guard` and both `flip_level` call sites: on-map `isgd` when `extras`, then skip `mx`/`my` when `mx == 0`; migrating `isgd` when `on_level(u.uz, egd.gdlevel)`. The diff adds the function and those two calls. Priest and shopkeeper arms on the migrating walk are still not there.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `flip_vault_guard` | file-local `mklev.js:18880` | `sp_lev.c:925–958` |
| `FlipX` / `FlipY` / `inFlipArea` | closures on the parameters | `sp_lev.c:516–519` |
| `EGD` | live `const.js:3151` | `mextra.h:219` `mextra->egd` |
| `on_level` | live `dungeon.js:1660` | `dnum` and `dlevel` |
| on-map caller | `mklev.js:19021–19024` | `sp_lev.c:640–644` |
| migrating caller | `mklev.js:19047–19052` | `sp_lev.c:674–677` |

## C ↔ JS fidelity

`csym` body is `sp_lev.c:925–958`. No RNG. `sp_lev.c:28` only declares it.

`FlipX` is `(maxx - val) + minx`. `FlipY` is `(maxy - val) + miny`. `inFlipArea` is both axes inside the inclusive rectangle. The closures close over this call's min/max, which `flip_level` passes from `get_level_extends`.

`EGD(grd)` then, if `inFlipArea(gdx, gdy)`, bit 1 writes `FlipY(gdy)` and bit 2 writes `FlipX(gdx)`. The two stores touch different fields, so neither reads a value the other just wrote. The same pair for `ogx`/`ogy`. Then `i` from `fcbeg` to `fcend`: save `fx`/`fy`, and if that cell is inside, write `fy` from `FlipY(fy)` and `fx` from `FlipX(fx)`. The corridor uses the saved pair, not a field already updated.

A missing `egd` returns. C would fault on `EGD`. A missing `fakecorr[i]` is skipped. The subject names both.

On-map: `isgd` and `extras` call it, then `mx == 0` continues so that guard's `mx`/`my` are not flipped. Migrating: only when `extras`, and only `isgd` with `on_level(u.uz, egd.gdlevel)`. `on_level` compares `dnum` and `dlevel`. The `else if` priest `shrpos` and shopkeeper `shk`/`shd` at `sp_lev.c:678–685` are not in the JS loop. The comment on `flip_level` names that omit. It is not an arm of `flip_vault_guard`.

## Hallucinations / overclaim

The subject says no arm of `flip_vault_guard` is omitted. The door, the original spot, and the fake-corridor loop match `sp_lev.c:935–955`. It also says `#wizfliplevel` and `nhl_flip_level` still do not call `flip_level`, so `extras` stays false on every live path. That is a named gap on the wizard entry, not a claim that those commands were wired. The two `flip_level` sites that C does call are present.

## Density

One static function. Both C call sites inside `flip_level` are wired. `EGD` and `on_level` are the live exports.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify flip_vault_guard --base 4c8d21966~1 --reach-all`.

```
verify flip_vault_guard: baseline 4c8d21966~1 (scoreboard at af40498ad, 2026-09-26T23:58:09.836Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify flip_vault_guard: no corpus session is blocked on it at 4c8d21966~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke flip_vault_guard: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`mklev.js` is shared). The smoke spread does not flip a vault.

## Actionable C-wrongs

None. Door, original spot, saved corridor coordinates, and both callers match `sp_lev.c:935–955`, `:642`, and `:677`.

Verdict: **ACCEPT**
