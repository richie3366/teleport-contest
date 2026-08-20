# Review 234 — 175707ca — invent.c hold_another_object drop_it (D-1272)

## Metadata
- Full / short hash: `175707cacec718a25f6180d7415e79d3299e0566` / `175707ca`
- Parent: `3925f2b3` (D-1271). This file audits **this SHA only**. Archive row **Addressed:** D-1272 `175707ca` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 11:53:04 +0200
- D-id: **D-1272**
- Stats: 10 files, +200 / −61 — `js/invent.js` +123 / −34; comment `js/dothrow.js`.
- Claims to close: Open `invent.c` `hold_another_object` `hitfloor(FALSE)` (named from D-1263 / review **225**). Not pickup highdrop. `reviews/loop-2026-08-15/` has no unpaid hold Must-fix.
- JS / map: `invent.js` `hold_another_object` `drop_it`; live `hitfloor` / `dropx` / `Fumbling` / `can_reach_floor`; `c-js-map/turns.md`. Fatal wished corpse / artifact `dropy` named.
- Prior reviews this SHA claims to close: **225** named omit invent `hitfloor(FALSE)` after drop/horn `hitfloor(TRUE)`.

## Intent vs deliverable

Git subject promises: “Match C invent.c hold_another_object so a Fumbling, letter-full, or over-burden hold that cannot reach the floor uses hitfloor(FALSE), instead of always keeping the object in invent.”

C `hold_another_object` (`invent.c:1208–1306`): observe if `!Blind`; artifact touch (fail `dropy` named; wasUpolyd / crysknife named); `Fumbling` → `nomerge=1`, `addinv_core0`, `goto drop_it`; fatal wished corpse named; else `near_capacity` then `max` with `flags.pickup_burden`, `addinv_core0`, then `inv_cnt(FALSE)>invlet_basic` **or** (not cursed LOADSTONE and `near_capacity>prev`) → undo merge `splitobj`, `goto drop_it`; else autoquiver `setuqwep`, `prinv`, `update_inventory`, `encumber_msg`. `drop_it` `:1295–1305`: `drop_fmt` pline, `nomerge=0`, `can_reach_floor(TRUE)||u.uswallow` → `dropx`; else `freeinv` then `hitfloor(obj, FALSE)`.

Old JS: success-only `addinv`+`prinv`+`encumber_msg`.

The diff **does** Fumbling / invlet / burden `drop_it` through live `dropx` or `hitfloor(false)`, plus stay-path autoquiver. It does **not** port fatal wished corpse or artifact-fail `dropy`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `drop_it` | C `:1295–1305`, **new inner** | |
| `Fumbling()` | C `youprop.h:129`, **imported live** | attrib.js H\|\|E |
| `can_reach_floor(true)` | C `engrave.c`, **imported live** | D-1070 |
| `dropx` | C `do.c:786`, **imported live** | |
| `hitfloor(..., false)` | C `dothrow.c:606`, **imported live** | D-1263 `dropz(TRUE)` |
| `near_capacity` / `splitobj` / `addinv` | C, **imported live** | `addinv` vs `addinv_core0` perm_invent named |
| `flags_pickup_burden_hold` | C `flags.pickup_burden`, **local clone** | same as pickup.js: non-number → `MOD_ENCUMBER` (2) |
| `inv_cnt(FALSE)` | C, **inline clone** | skip `COIN_CLASS`; live `steal.js` `inv_cnt` exists |
| `INVLET_BASIC` | C `invlet_basic` 52, **local const** | |
| freeinv on highdrop | C `:1302–1303`, **inline clone** | extract + `pickup_prev=0` + `freeinv_core` + gold botl + `update_inventory` |
| autoquiver `setuqwep` | C `:1282–1285`, **wired** | |
| fatal wished corpse / artifact `dropy` | C `:1227–1256`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in `drop_it`; `hitfloor`/`dropz(TRUE)` reuse break/impact RNG. `Fumbling` itself does not roll here.

## C ↔ JS fidelity

Pinned C `drop_it` (`invent.c:1295–1305`):

```
 drop_it:
    if (drop_fmt)
        pline(drop_fmt, drop_arg);
    obj->nomerge = 0;
    if (can_reach_floor(TRUE) || u.uswallow) {
        dropx(obj);
    } else {
        freeinv(obj);
        hitfloor(obj, FALSE);
    }
    return (struct obj *) 0;
```

JS `hold_drop_msg` copies `drop_arg` before `addinv` (C `strcpy` into `buf` because `doname` obuf can be clobbered). Floor-reachable or swallowed → live `dropx` (which `freeinv_drop` then `ship_object`/`doaltarobj`/`dropy`). Else extract + `pickup_prev=0` (C `freeinv` `:1405`) + partial `freeinv_core` + gold botl + `update_inventory` + live `hitfloor(false)`. Verbose hit is skipped (`FALSE`). `dropz(TRUE)` still runs inside `hitfloor` after breaks/ship. This is **not** “Match C dispatch, callee is a stub.”

Fumbling always `drop_it` (including cursed LOADSTONE). Letter overflow `n_nongold > 52` also drops cursed loadstone. Burden drop uses `not_cursed_loadstone && near_capacity() > prev` after `prev = max(near_capacity, pickup_burden)`. Match C’s `||` / `&&` shape. Merged stack `quan > oquan` → `splitobj` then drop the original quan. Stay path: autoquiver only if `!uquiver && !owornmask` and missile or ammo-for-uwep/uswapwep; then `prinv` / `update_inventory` / `encumber_msg`. Drop path skips encumber. Match.

`flags.pickup_burden` in JS options is the string `"stressed"`. The helper treats non-numbers as `MOD_ENCUMBER` (const.js **2** = C stressed). Same helper as `pickup.js`. Contest default matches. A string `"unencumbered"` would still use 2 — pre-existing options mapping, not a new invent-only gate.

`addinv` vs C `addinv_core0(..., FALSE)` (suppress perm_invent): named. Artifact fail still “leave on floor” after extract, not C `dropy`. Named.

## Hallucinations / overclaim

Subject + D-1272 say Fumbling / letter-full / over-burden that cannot reach the floor uses `hitfloor(FALSE)`. **Those three `drop_it` gates plus live `hitfloor` are the hunk.** Stamping **Addressed:** D-1272 is fair. Do **not** stamp “Match C fatal wished corpse” or “Match C artifact `dropy` / wasUpolyd / crysknife.” Do not stamp “Match C pickup highdrop / toss_up.”

## Density

One C function’s drop_it envelope plus the stay autoquiver C puts in the else. ~90 JS lines. Right size. Did not glue `tipcontainer`.

## Branch-by-branch confirm

1. Stay, reachable floor, under burden, ≤52 letters: `addinv`, maybe quiver, `prinv`, no `hitfloor`. Match.
2. Fumbling, can reach floor: `dropx`. Match.
3. Fumbling + Levitation, not swallowed: `hitfloor(false)` (no “hit the floor” pline). Match.
4. Swallowed + drop_it: `dropx` even if `!can_reach_floor`. Match.
5. Invlet 53rd nongold: drop (cursed loadstone too). Match.
6. Burden past `pickup_burden`, cursed LOADSTONE: keep. Match.
7. Burden past, not cursed loadstone: drop. Match.
8. Merge then overflow: `splitobj` original quan, drop that. Match.
9. Autoquiver missile into empty quiver: `setuqwep` on stay only. Match.
10. Fatal wished corpse / artifact fail `dropy`: still named. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `do.js`/`dothrow.js`/`engrave.js` imports break cycles, not Node `fs`. Plain ESM.

## Verification

Journal: private canary **13**/13 (C drop_it order; JS `hitfloor` false; stay invent; Fumbling `dropx`; Fumbling+Lev no verbose hit; swallow `dropx`; burden UNENCUMBERED drop; cursed LOADSTONE keep; invlet>52 drop; autoquiver; Lev stay no hitfloor); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless wish/horn/catch while Fumbling, letter-full, or over burden. Cadence this audit: full `sessions` at HEAD `b166de10` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. `hitfloor(false)` is live D-1263. Inline freeinv matches C `extract`+`pickup_prev`+`freeinv_core`+`update_inventory`. Burden default 2 matches C `MOD_ENCUMBER`.

Named omits (map, not Must-fix):

1. fatal wished corpse `u_safe_from_fatal_corpse` + `wishedfor`
2. artifact fail `dropy` / wasUpolyd / crysknife restore; perm_invent WIN_INVEN
3. pickup highdrop; toss_up

Do not Must-fix “JS counts invent instead of calling `steal.js` `inv_cnt`.” Do not Must-fix `addinv` vs `addinv_core0`. Do not pull `tipcontainer` this SHA.

## Callers / RNG ledger

C: wish / catch / horn / zap create / apply. JS `mkobj.js` / `zap.js` / `apply.js` / `write.js`. RNG only inside pre-existing `hitfloor`/`dropz`. Public fortress is not evidence a levitating wish dropped glass.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: Fumbling / 53rd invlet / over-burden now `dropx` or live `hitfloor(FALSE)`; fatal wished corpse and artifact `dropy` stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1272 `175707ca`.
