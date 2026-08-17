# Review 91 — 6dd7a794 — teleds update_player_regions (D-1130)

## Metadata
- Full / short hash: `6dd7a794fc0c9ba2c46216220f5dc9b01a9cb72c` / `6dd7a794`
- Parent: `410f22a2` (D-1129). This file audits **this SHA only**. Archive row **Addressed:** D-1130 `6dd7a794` was filled by D-1131.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 03:32:08 +0200
- D-id: **D-1130**
- Stats: 11 files, +134 / −45 — `js/region.js` +25 / −2 (`update_player_regions`); `js/teleport.js` +17 / −8 (call after placebc).
- Claims to close: Open queue `teleport.c` `teleds` `update_player_regions` (named). Not teleok `in_out_region`. Review **80** named this callee; D-1129 next-port. `reviews/loop-2026-08-15/` has no open regions-teleds Must-fix.
- JS / map: `region.js` `update_player_regions`; `teleport.js` `teleds`. `c-js-map/turns.md` teleport + region. enter_msg/leave_msg, hack.c walk `in_out_region`, geometric `is_hero_inside_gas_cloud` still named.
- Prior reviews this SHA claims to close: **80** named omit `update_player_regions` in `teleds`; **90** named next Open.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleds so landing resets REG_HERO_INSIDE via update_player_regions from the dest cell, instead of leaving discarded teleok-probe bits or skipping attach_2_u clear.”

Old JS `teleds` called `fill_pit` then `placebc` then `newsym` with a comment that regions were deferred. C `teleport.c:529` calls `update_player_regions()` after `placebc`, before `newsym`. That helper (`region.c:582–592`) is **not** `in_out_region`: it sets `REG_HERO_INSIDE` from whether the dest cell is inside a non-`attach_2_u` region, and the dangling `else` **always clears** `attach_2_u` regions. `teleok` already ran `in_out_region` on **candidates**, including discarded trap-backup probes, so those bits can be stale; `teledest` can skip `teleok` entirely.

The diff **does** port that 10-line loop and the call in C order. It does **not** flip `is_hero_inside_gas_cloud` from geometric `inside_region` to the bit, nor wire `hack.c:2867` / `dothrow.c` `in_out_region`, nor port enter_msg/leave_msg. Named. It does **not** pull hideunder (next SHA).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleds` after `placebc` | C body, **new** | `teleport.c:529` |
| `update_player_regions` | C callee, **new** | `region.c:582–592`; not `in_out_region` |
| `inside_region` | C callee, **imported** | pre-existing; rect walk |
| `set_hero_inside` / `clear_hero_inside` | C macros, **clone** | `region.h` `REG_HERO_INSIDE=0x01` |
| `attach_2_u` dangling else | C control, **new** | always clear when attached-to-hero |
| `in_out_region` | C sibling, **untouched** | teleok probes; enter/leave callbacks |
| `is_hero_inside_gas_cloud` | C bit test, **named omit** | JS still geometric |
| enter_msg / leave_msg | C pline, **named omit** | `create_msg_region` `#if 0`; gas has none |
| hack.c / dothrow.c `in_out_region` | C callers, **named omit** | walk still unwired |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none. The loop is bit set/clear. Gas `inside_f` damage stays named on `run_regions`.

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Dest `u.ux`/`u.uy` are live after `u_on_newpos`, not a recorded cell. `REG_HERO_INSIDE` is the C flag. Contest Rule #2: in-process ESM. Do not replace this call with `in_out_region` (enter/leave + skip `attach_2_u`). Do not flip `is_hero_inside_gas_cloud` until walk `in_out_region` is live (D-log). Do not pull hideunder into this SHA.

## C ↔ JS fidelity

### Caller order

C `teleport.c:525–536`:

```
fill_pit(u.ux0, u.uy0);
if (ball_active && uchain && uchain->where == OBJ_FREE)
    placebc();
update_player_regions();
newsym(u.ux0, u.uy0);
see_monsters();
```

JS `1265–1281`: `fill_pit(ux0,uy0)`; `placebc` when chain `OBJ_FREE`; `update_player_regions()`; `newsym(ox,oy)`. Match on the Open line. Hero is already on dest (`u.ux`/`u.uy` assigned before fill_pit), so membership is dest-absolute, not origin.

### Dangling else

C `region.c:586–591` (no braces on the `for`):

```
for (i = 0; i < svn.n_regions; i++)
    if (!gr.regions[i]->attach_2_u
        && inside_region(gr.regions[i], u.ux, u.uy))
        set_hero_inside(gr.regions[i]);
    else
        clear_hero_inside(gr.regions[i]);
```

JS `287–297`:

```
for (const reg of game.regions || []) {
    if (!reg.attach_2_u && inside_region(reg, ux, uy)) {
        set_hero_inside(reg);
    } else {
        clear_hero_inside(reg);
    }
}
```

`else` binds to the compound `!attach_2_u && inside`, not only to `inside`. An `attach_2_u` region **always** clears, even if the dest is geometrically inside. A non-attached region covering dest sets; otherwise clears (including stale bits from discarded `teleok(TRUE)` probes). Match call-for-call.

`set_hero_inside` / `clear_hero_inside` OR/AND `REG_HERO_INSIDE` (`const.js` `0x01` ≡ `region.h:17–20`). `game.regions` is the live list `make_gas_cloud` / `add_region` already push (D-1119 / D-1124). Empty list: no-op, same as `n_regions==0`. Null holes in the array would throw on `reg.attach_2_u`; C’s `gr.regions[i]` is dense through `n_regions`. JS push/pop `add_region` / expire does not leave holes. Not a C-wrong of this SHA.

`hero_inside` is unused in this helper (C likewise uses only set/clear). `in_out_region` still skips `attach_2_u` on all three of its loops — that is why teleds must not call it: an attached-to-hero region would keep a stale bit that this dangling else clears.

C iterates `i = 0; i < n_regions`. JS `for...of game.regions`. Order matches insertion order (`add_region` push). Gas clouds created at drinksink (D-1124) are in that array; a later `teleds` now rewrites their hero bit from dest even when `teleok` never probed that cloud. That is the C reason for the helper.

### `inside_region` vs C bbox

C `region.c:63–72` rejects if outside `bounding_box`, then any `rects[i]`. JS walks `reg.rects` only (pre-existing D-1119). Bounding box is the union of rects, so a hit on a rect is a hit on the bbox; a miss on all rects is a miss. Skipping the bbox is an optimization, not a different predicate. Not introduced this SHA.

### Wrong callee check

Review **80** named this exact trap: do not call `in_out_region` from `teleds`. `in_out_region` runs can_enter/leave then enter/leave callbacks and **skips** `attach_2_u`. This SHA imports `update_player_regions` beside the existing `in_out_region` and calls the new one. Correct callee.

### Callees are not stubs

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `update_player_regions` writes `player_flags`. `inside_region` / set / clear are the D-1119 clones. The named omit is the **reader**: `is_hero_inside_gas_cloud` still walks geometry (`region.js:93–102`) instead of `hero_inside(reg)`. Setting the bit does not change public gas damage until that flip — D-log forbids the flip until walk `in_out_region` is live. Named, not a silent no-op of the Open **reset**.

### Callers of `teleds`

Same as D-1129: every wired `teleds` now resets bits after `placebc`. `tele_trap` teledest still named. Guard: C always calls, no extra `if`; JS same (empty `game.regions` no-ops).

## Hallucinations / overclaim

D-log / CURRENT / subject say landing resets `REG_HERO_INSIDE` from the dest cell and clears `attach_2_u`, instead of leaving discarded-probe bits. That is the hunk. They name enter/leave, walk `in_out_region`, and geometric gas. Stamping **Addressed:** D-1130 is fair for the Open **call**. Hash `6dd7a794` is on the archive row (filled by D-1131). Do **not** stamp it as “gas damage now uses the bit” or “walking runs `in_out_region`.”

## Density

One C function (10 lines) plus the teleds call C places after `placebc`. Not a one-`if` FAIL peel — the dangling else is the whole helper. Hideunder left named. ~25+17 JS. Right size (§2b).

## Verification

Journal: private canary **27**/27 (set/clear; attach_2_u dangling-else; no enter_f/leave_f vs `in_out_region` contrast; discarded-probe stale bit; teleds into/out/same-cell; source order after placebc before newsym); green+strict seed8000/0900; cohort **22**/22 including 0012 vault + 0004 scroll + 0360/0367/0373/4500/2200 + strict 0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path **public-unhit** on gas-cloud teleds. Ordinary teleds with empty `game.regions` is a no-op. This audit’s full `sessions` (cadence **#1440**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `teleport.c:525–529`, `region.c:582–592` / `:63–72`, `region.h:17–20,36`; JS `region.js:60–77` / `:280–298`, `teleport.js:1265–1281`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| dest inside non-attach region | `set_hero_inside` | **same** |
| dest outside | `clear_hero_inside` | **same** |
| `attach_2_u` | always clear (dangling else) | **same** |
| discarded teleok probe bit | overwritten from dest | **same** |
| enter/leave callbacks | none here | **same** (those are `in_out_region`) |
| gas `is_hero_inside_gas_cloud` | bit in C | **named** geometric |

## Actionable C-wrongs

None that Must-fix this next iter. The Open call matches `teleport.c:529`. The dangling else matches `region.c:586–591`.

Named omits / do-nots (map / Open, not Must-fix):

1. `is_hero_inside_gas_cloud` still geometric (`region.js:93–102`). Do not flip until walk `in_out_region` is live.
2. `hack.c:2867` / `dothrow.c` `in_out_region` callers. Live Open enter_msg/leave_msg is the sibling, not this.
3. `teleds` hideunder / mimic — **Addressed:** D-1131 `00956ae8` (next SHA).
4. Do not restore the skip of `update_player_regions`. Do not call `in_out_region` from `teleds`. Do not pull swallow `docrt` into this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `teleds` now resets `REG_HERO_INSIDE` via real `update_player_regions` after `placebc` from the dest cell, including the `attach_2_u` dangling-else clear, while gas still reads geometry and walk `in_out_region` stays named.
- Must-fix stays empty for this SHA; next port popped Open `teleds` hideunder / mimic. **Addressed:** D-1131 `00956ae8`. Not swallow `docrt`.
