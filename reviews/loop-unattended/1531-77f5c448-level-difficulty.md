# Review 1531 — 77f5c448 — dungeon.c level_difficulty + deepest_lev_reached (D-2572)

## Metadata

- SHA: `77f5c448`
- D-id: D-2572. Next index: 1531.
- Files: `js/hacklib.js` (+52/−~24: new `deepest_lev_reached`, restarted `level_difficulty`), 6 clone retirements (`end.js`/`topten.js` deepest; `fountain.js`/`makemon.js`/`mklev.js`/`mkobj.js` level_difficulty), Tourist gate (`do.js`).
- C locus: `nethack-c/upstream/src/dungeon.c:2026–2084` (`level_difficulty`, 59 L) + `:1338–1371` (`deepest_lev_reached`, 34 L); both `csym.mjs` ranges. Tourist gate `do.c:1962`.

## Intent vs deliverable

Subject promises: canonical `deepest_lev_reached` + restarted `level_difficulty` (amulet arm, aggravate tail), all 6 clones retired to imports, Tourist gate wired to `level_difficulty(u.uz)`. Diff delivers that. Promise matches deliverable.

## Inventory

- New/restarted in `js/hacklib.js`: `deepest_lev_reached(noquest)` (exported), `level_difficulty(uz)` (restarted, exported).
- Deleted-symbol audit (`sym.mjs`, required): `level_difficulty` → single export `js/hacklib.js:89`; `deepest_lev_reached` → single export `js/hacklib.js:68`. Zero remaining local clones — all 6 retire sites now import the canonical name with a pointer comment. No new module edges (every file already imported hacklib.js); no TDZ risk (function decls, call-time use).
- `fountain.js` dropped its `depth as depth_of_level` import — verified no other `depth` use remains in that file. No other deleted symbols.

## C ↔ JS fidelity

`deepest_lev_reached` vs C `:1338–1371`: quest-skip, ureached-0 skip, max-depth ✓ (double `depth()` call folded to one — pure function, same result; dense-array iteration ≡ `0..n_dgns`). `level_difficulty` vs C `:2026–2084`, in order: endgame sanctum + `ulevel/2` ✓; amulet → `deepest_lev_reached(FALSE)` ✓ with the union `u.uhave?.amulet || u.uhave_amulet` — the codebase-wide pattern (10+ sites) and the obtain path sets both (`js/teleport.js:2357–2359`) ✓; else `depth + builds_up` climb with the C proof-comment arithmetic intact ✓; `#if 0` W_tower arm correctly absent (compiled out in C, not an omission) ✓; `EAggravate_monster → res > 25 ? 50 : res*2` exact ✓ with extrinsic-only `u.EAggravate_monster` per `youprop.h:213` (the combined helper in monmove.js:674 correctly NOT used) ✓. C takes no args (always `u.uz`); JS `(uz)` param defaults to `game.u.uz` and every call site passes nothing or `u.uz` — benign extension, outcome-identical. Dropped `|| 1` insurance at 3 retire sites is safe (every C arm yields ≥ 1 in practice; the else branch keeps `|| 1`). Tourist gate matches `do.c:1962` ✓. RNG: neither C body draws — nothing to walk.

## Hallucinations / overclaim

None. The "two bugs fixed" framing (amulet read current depth; aggravate never doubled) is exactly what the pre-SHA hacklib body shows.

## Cited evidence

C aggravate tail (`dungeon.c:2079–2083`, via `csym.mjs` — one of the two fixed bugs):

```c
    /* ring of aggravate monster */
    if (EAggravate_monster)
        res = res > 25 ? 50 : res * 2;
    return res;
```

JS (`js/hacklib.js:107`): `if ((u.EAggravate_monster | 0)) res = res > 25 ? 50 : res * 2;` — exact, with extrinsic-only `u.EAggravate_monster` per `youprop.h:213` (`#define EAggravate_monster u.uprops[AGGRAVATE_MONSTER].extrinsic`; the combined `Aggravate_monster` helper in monmove.js:674 correctly NOT used — C uses E only here).

Amulet-union + retire checks (re-run here):

```text
obtain path sets BOTH (js/teleport.js:2357–2359): u.uhave.amulet = 1; u.uhave_amulet = 1;
union `u.uhave?.amulet || u.uhave_amulet` used at 10+ sites (allmain/artifact/do/eat/hacklib/insight/makemon/potion/quest) — convention, not invention
level_difficulty   js/hacklib.js:89   sync    # sym.mjs: single export
deepest_lev_reached js/hacklib.js:68  sync    # sym.mjs: single export — zero remaining local clones
fountain.js: no remaining `depth` use            # dropping the `depth as depth_of_level` import is safe
Tourist gate ≡ do.c:1962 `more_experienced(level_difficulty(), 0)` (JS passes u.uz; C takes void but always reads u.uz)
```

Dropped-`|| 1` safety: endgame arm `sdepth(||1) + trunc(ulev(||1)/2)` ≥ 1; amulet arm `deepest_lev_reached` ≥ 1 whenever any level is reached (always, since u.uz is); else arm keeps `depth(lev) || 1`. The old clones' insurance masked only a can't-happen 0.

Verify output (re-run here):

```text
verify level_difficulty: baseline 77f5c448~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke level_difficulty: no RNG-tagged reach; fixed smoke spread (24 run, 5.4s): 24 PASS, 0 regressed → REACH-OK
```

(Smoke-only is correct: neither C body draws RNG, so no RNG-tagged reach exists — matching the D-log's "24-session smoke REACH" framing.)

## Density

One C function pair + 6-clone retire + 1 caller gate, 8 files, +118/−80. Multi-file but one semantic cluster (canonicalization), well under caps. Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn level_difficulty` → PASS.
- Re-run here: `hidden-proxy.mjs verify level_difficulty --base 77f5c448~1 --reach-all` → 0 blocked both trees (vacuous, honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK (smoke-only is correct here: the C body is RNG-free, so no RNG-tagged reach exists). Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration). Diff grep: 0 hits for FORCE/DIAG/getRngLog/fastforward/getenv.

## Actionable C-wrongs

None. Named: `nhlua.c:961` Lua push only (no JS lua runtime — consistent with prior rows).

Verdict: **ACCEPT**
