# Review 1863 — 6aacaa7b4 — learnwand (D-2904)

- SHA: `6aacaa7b4` (coverage; `zap.c` `learnwand`)
- Files: `js/zap.js` (the function body only)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". No symbol deleted and no new import. `observe_object`, `makeknown`, and `update_inventory` were already imported from `invent.js`.
- `sym.mjs`:

```
observe_object   js/invent.js:3300   sync
makeknown        js/invent.js:4654   sync
update_inventory js/invent.js:4745   sync
Blind            js/invent.js:366   sync
             !! ALSO 31 LOCAL CLONE(S) in 31 files
```

`learnwand` calls the local `Blind` at `zap.js:695`, not the invent export. That local is the same test as `youprop.h:103` plus the existing `uroleplay.blind` bit (D-0716). It is not a new clone.

## Intent vs deliverable

Subject promises `observe_object` on a known type, `Blind()` then `observe_object` then `makeknown` on an unknown type, and `update_inventory` for every non-spellbook. The diff replaces the direct `dknown` writes and the deferred inventory refresh with that order. Spellbooks still skip the block.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `learnwand` | export `zap.js:2576` | `zap.c:122–151` |
| `observe_object` | live `invent.js:3300` | `o_init.c:441–451` |
| `makeknown` | live `invent.js:4654` | unknown-type discovery |
| `update_inventory` | live `invent.js:4745` | after the if/else |
| `Blind` | local clone `zap.js:695` | `youprop.h:103` |
| callers | already wired, not in this diff | engrave, `mon_adjust_speed`, zap sites |

## C ↔ JS fidelity

`csym` body is `zap.c:122–151`. No RNG. Real calls (comments and `extern.h` excluded): `engrave.c:1055`, `worn.c:562` inside `mon_adjust_speed`, and the `zap.c` sites at 570, 2422, 2457, 2600, 3011, 3101, 3111, 3471, 3799, 4066. JS already calls `learnwand` from `engrave.js:1285`, from `mon_adjust_speed` when `obj` is set (`muse.js:2896`), and from the zap paths in `zap.js`. This commit does not move those calls.

The body is one `oclass != SPBOOK_CLASS` block. Spellbooks return without `update_inventory`. Inside:

Known type (`objects[otyp].oc_name_known`): `observe_object(obj)`. That sets `dknown` and calls `discover_object(otyp, FALSE, TRUE, FALSE)` only when `otyp >= FIRST_OBJECT` and the hero is not hallucinating (`o_init.c:447–449`). The old body set `dknown` unconditionally, including while hallucinating, and never set the discovered-object bit.

Unknown type: `if (!Blind) observe_object(obj)`, then `if (obj.dknown) makeknown(otyp)`. `Blind` is `(HBlinded || EBlinded) && !BBlinded`. The old test was `game.u.Blind`, which stays clear when only the property bits are set. `observe_object` may leave `dknown` clear (hallucination, or `otyp` below `FIRST_OBJECT`), and then `makeknown` does not run. That is the C `dknown` test after the observe call.

`update_inventory()` runs for every non-spellbook, including a type that was already known. The old `if (!oc) return` skipped that refresh when the objects slot was missing. A missing slot is now falsy `oc_name_known`, so it takes the unknown arm. C indexes the table directly. The commit names that.

`if (!obj) return` is extra. C is `NONNULLARG1`. `mon_adjust_speed` already tests `obj != 0` before the call (`worn.c:561–562`, `muse.js:2896`). A null argument returns. It does not change a real wand.

## Hallucinations / overclaim

The subject says an already-known type never ran `discover_object`. That is what `observe_object` adds, and only when the object is not generic and the hero is not hallucinating. The subject does not claim new callers. The `#if 0` at `do_wear.c:1207` and the comment mentions at `do_wear.c:1191` and `invent.c:2769` are not calls.

## Density

The whole 30-line body is in the diff. Both arms call live helpers. The inventory refresh is in the same block, not deferred. Callers were already on the C sites.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify learnwand --base 6aacaa7b4~1 --reach-all`.

```
verify learnwand: baseline 6aacaa7b4~1 (scoreboard at ba089151c, 2026-09-26T22:18:08.484Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify learnwand: no corpus session is blocked on it at 6aacaa7b4~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke learnwand: no RNG-tagged reach; fixed smoke spread (12 run, 3.1s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line (full suite skipped because the script saw no shared file). Reach does not zap a wand.

## Actionable C-wrongs

None. The spellbook skip, the known-type `observe_object`, the unknown-type `Blind` / `observe_object` / `makeknown` order, and `update_inventory` match `zap.c:134–149`.

Verdict: **ACCEPT**
