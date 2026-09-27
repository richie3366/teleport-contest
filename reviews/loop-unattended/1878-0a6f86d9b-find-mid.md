# Review 1878 — 0a6f86d9b — find_mid (D-2919)

- SHA: `0a6f86d9b` (coverage; `light.c` `find_mid`, plus `light_sources_sanity_check`)
- Files: `js/mon.js` (body), `js/objnam.js` (`set_find_mid`), `js/region.js` (clone deleted), `js/light.js`, `js/apply.js`, `js/zap.js`, `js/wizcmds.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
find_mid         js/mon.js:3583   sync
light_sources_sanity_check js/light.js:373   sync
whereis_mon      NOT EXPORTED — 1 local js/light.js:336
set_find_mid     js/objnam.js:2582   sync
```

`whereis_mon` is `staticfn`. One local is that function. The `region.js` fmon-only `find_mid` is gone. `imports.mjs --can` for `region.js` → `mon.js` `find_mid` and `mon.js` → `objnam.js` `set_find_mid`: ALREADY. `objnam.js` does not import `mon.js` (the setter avoids the TDZ on `_body_part`).

## Intent vs deliverable

Subject promises one `find_mid` that honors `fmflags`, skips dead monsters only on `fmon`, returns `youmonst` for id 1, and walks `migrating_mons` and `mydogs`. The diff does that. Callers that passed `0` now pass `FM_FMON`. `light_sources_sanity_check` is new and `sanity_check` calls it.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `find_mid` | export `mon.js:3583` | `light.c:375–395` |
| `set_find_mid` | export `objnam.js:2582` | registration, not a C function |
| `light_sources_sanity_check` | export `light.js:373` | `light.c:605–630` |
| `whereis_mon` | existing local `light.js:336` | `light.c:397–417` |
| deleted `region.js` `find_mid` | removed | was not the C body |

Flags in `js/const.js:1890–1894` match `hack.h:1294–1298`: `FM_FMON 0x01`, `FM_MIGRATE 0x02`, `FM_MYDOGS 0x04`, `FM_YOU 0x08`, `FM_EVERYWHERE` the or of those four.

## C ↔ JS fidelity

No RNG. `FM_YOU` and `nid == 1` returns `&gy.youmonst` before any chain. JS returns `game.youmonst`, or null if that object is missing (named; C always has the global).

`FM_FMON` walks `fmon` and skips `DEADMONSTER` (`mhp < 1`, `monst.h:214`). `FM_MIGRATE` walks `migrating_mons` with no dead test. `FM_MYDOGS` walks `mydogs` with no dead test. Else null. A zero id is not a special return; the old `if (!want) return null` is gone. JS uses `>>> 0` on both sides. A null slot in a JS array is skipped (named).

Callers and the flags they pass:

- `apply.c:939` `check_leash` `FM_FMON` → `js/apply.js:1604`
- `light.c:551` `relink_light_sources` `FM_EVERYWHERE` → `js/light.js:308`
- `light.c:624` inside `light_sources_sanity_check` → `js/light.js:389`, called from `wizcmds.c:1475` → `js/wizcmds.js:727` (dynamic import)
- `light.c:671` is a comment
- `light.c:677` `write_ls` passes the flag `whereis_mon` just returned (`js/light.js:458–462`). `whereis_mon` itself matches `light.c:401–416` (identity on each chain, no dead skip)
- `objnam.c:1432` `doname` `FM_FMON` → `js/objnam.js:3425` via `_find_mid`, with the same `FM_FMON` scan if the setter has not run
- `region.c:446` → `js/region.js:1019`
- `zap.c:1071` revive `FM_FMON` → `js/zap.js:3231`
- `mkobj.c:3087` `objlist_sanity` is unported (named)
- `extern.h:1416` and `hack.h:1293` only declare the flags

`light_sources_sanity_check`: missing id panics; `LS_OBJECT` must be `find_oid(o_id)`; `LS_MONSTER` must be `find_mid(m_id, FM_EVERYWHERE)`; any other type panics. A numeric id takes the can't-find panic (named; C would read the union as a pointer).

## Hallucinations / overclaim

The subject says no arm of `find_mid` is omitted. The four flag tests are the whole body. `objlist_sanity` is named as unwired, not claimed as a call site that was updated. The verify line skipped the full suite ("no shared file changed") even though `mon.js` and `objnam.js` changed; green and cohort are what it actually ran.

## Density

One C function, the sanity caller in the same file, and the clone in `region.js` removed. No stub arm. `check_leash` still clears `leashmon` instead of `impossible` when the monster is missing; that is named and is outside `find_mid`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify find_mid --base 0a6f86d9b~1 --reach-all`.

```
verify find_mid: baseline 0a6f86d9b~1 (scoreboard at ce04557f4, 2026-09-27T01:18:20.198Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify find_mid: no corpus session is blocked on it at 0a6f86d9b~1 — a vacuous verify is NOT a corpus PASS. …
smoke find_mid: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line.

## Actionable C-wrongs

None. Id 1 returns the hero, `fmon` skips `mhp < 1`, and the migrate and dog chains do not, matching `light.c:381–395`.

Verdict: **ACCEPT**
