# Review 1865 — cb7ff4a26 — ceiling (D-2906)

- SHA: `cb7ff4a26` (coverage; `dungeon.c` `ceiling`)
- Files: `js/apply.js`, `js/dig.js`, `js/dothrow.js`, `js/engrave.js`, `js/zap.js` (callers). Body stays `js/trap.js` `ceiling` (not in the diff).
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks (`FORCEBUNGLE` / `J_DIAG` are pre-existing names, not this diff). `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/." `--can` is ALREADY for `apply.js`, `dothrow.js`, `engrave.js`, `zap.js`, and `dig.js` → `trap.js`.
- `sym.mjs` on the deleted clones and the symbol they now call:

```
ceiling          js/trap.js:3647   sync
ceiling_at       NOT FOUND in js/** (no export, no local function/const).
ceiling_apply    NOT FOUND in js/** (no export, no local function/const).
ceiling_updown   NOT FOUND in js/** (no export, no local function/const).
```

## Intent vs deliverable

Subject promises one `ceiling`, the three clones deleted, and those callers importing it. Downward camera and mirror still call `surface`. The diff does that. It does not edit `js/trap.js`. The body was already the C order.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `ceiling` | export `trap.js:3647` | `dungeon.c:1713–1747` |
| `in_rooms` | live `hack.js:1848` | `hack.c:3497–3560` |
| `ceiling_at` | deleted from `dothrow.js` | clone; dropped vault/temple/shop/water/fire/quest/`Underwater` |
| `ceiling_apply` | deleted from `apply.js` | clone; always `"ceiling"` |
| `ceiling_updown` | deleted from `zap.js` | clone; tested `u.Underwater` |
| camera / mirror | `apply.js` import | `apply.c:101`, `apply.c:1093` |
| bullwhip | `apply.js:3358` | `apply.c:3012` |
| `use_pick_axe2` | `dig.js:2580` (import already present) | `dig.c:1179` |
| `toss_up` / `throwit` / `throw_gold` | `dothrow.js` | `dothrow.c:1269`, `:1285`, `:1586`, `:2686` |
| `cant_reach_floor` | `engrave.js:424` | `engrave.c:225` |
| `zap_updown` | `zap.js` probe and rock | `zap.c:3239`, `:3313` |

## C ↔ JS fidelity

`csym` body is `dungeon.c:1713–1747`. No RNG. `check_special_room` is the comment at `:1718–1720`, not a call.

Branch order in `trap.js:3652–3664` matches the C `if` / `else if` chain: `*in_rooms` vault, then temple, then shop (`SHOPBASE`, and `in_rooms` treats `typefound > SHOPBASE` as a shop — `hack.c:3506–3508`), then `Is_waterlevel` → `"water above"`, `IS_AIR` → `"sky"`, `Is_firelevel` → `"flames above"`, `In_quest` → `"expanse above"`, `Underwater` → `"water's surface"`, then room unless earth, or wall, or door, or `SDOOR` → `"ceiling"`, else `"rock cavern"`.

`Underwater` is `u.uinwater` (`youprop.h:279`). The export tests `(game.u?.uinwater | 0)`. The deleted `ceiling_updown` tested `game.u?.Underwater`, which the subject says is never written. That clone is gone.

`in_rooms` returns `''` when C returns a pointer at the empty end of `buf` (`*in_rooms` is then 0). A room number string is truthy. The call is the live export, not a local.

Call sites this diff rewires use the same coordinates C passes (`u.ux`/`u.uy`, or the engraving/zap `x,y`). Camera and mirror keep `(dz > 0) ? surface : ceiling` (`apply.c:101`, `:1093`). `surface` was already imported from `sit.js`. Bullwhip, toss, gold, probe, striking rock, engraving, and the pick-axe "can't reach" line now interpolate `ceiling(...)` instead of a fixed word.

`throw_gold` still gates the message with `!Is_airlevel && !(u.Underwater || u.uinwater) && !Is_waterlevel` before the call (`dothrow.c:2683–2684` is `!Is_airlevel && !Underwater && !Is_waterlevel`). The extra `u.Underwater` disjunct is the pre-existing gate; the message text is what changed.

`use_pick_axe2` still has no `Underwater` arm before `u.dz < 0`. C (`dig.c:1173–1179`) prints the turbulence line and never calls `ceiling` in that case. That arm was already missing; this diff only replaces the string inside the `dz < 0` arm. It is not an arm of `ceiling`.

The other C callers were already on the export and are not in this diff: piercer / tame jump (`hack.c:3422`, `:3445` → `pickup.js` spoteffects), `youhiding` (`insight.c:2054` → `polyself.js`), `mhitu`, muse, loot, potion, read, and the trap hole / falling-object lines. `csym --callers` lists those 28 references including `extern.h:896`.

## Hallucinations / overclaim

The subject says the body was already the C order and that no arm of `ceiling` is omitted. The chain above matches `dungeon.c:1721–1744`. It does not claim `use_pick_axe2` gained an `Underwater` arm. "Clones are gone" matches `sym.mjs`.

## Density

One function. The work is deleting three divergent clones and pointing the callers that still used them at the export. Callees of the body (`in_rooms`, the level and terrain macros) are the live imports already in `trap.js`. No stub in the chain.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify ceiling --base cb7ff4a26~1 --reach-all`.

```
verify ceiling: baseline cb7ff4a26~1 (scoreboard at d475b25e1, 2026-09-26T22:59:16.435Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify ceiling: no corpus session is blocked on it at cb7ff4a26~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke ceiling: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line. Full suite was skipped because the script saw no shared file; `trap.js` itself did not change.

## Actionable C-wrongs

None. The eight labels and the `in_rooms` order match `dungeon.c:1721–1744`. The three clones are gone.

Verdict: **ACCEPT**
