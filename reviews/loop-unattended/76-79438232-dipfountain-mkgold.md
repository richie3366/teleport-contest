# Review 76 — 79438232 — `dipfountain` case 29 `mkgold` coins (D-1115)

## Metadata
- Full / short hash: `79438232a0571d77e2b79394859947ea244b4fc8` / `79438232`
- Parent: `e30a51f2` (D-1114). This file audits **this SHA only**. Archive row **Addressed:** D-1115 `79438232` was filled by D-1116.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 23:23:36 +0200
- D-id: **D-1115**
- Stats: 10 files, +131 / −45 — `js/fountain.js` +36 / −5 (case 29 + local `dunlev` / `dunlevs_in_dungeon`).
- Claims to close: Open queue `fountain.c` `dipfountain` case 29 `mkgold` coins (named). Not wash_hands. Review **69** named omit 3 (second half). `reviews/loop-2026-08-15/` has no open mkgold Must-fix.
- JS / map: `fountain.js` `dipfountain`. `c-js-map/data.md` fountain row. `update_inventory` / drinkfountain enlightenment still named (enlightenment is next SHA).
- Prior reviews this SHA claims to close: **69** item 3 (case 29). Review **75** do-not 4.

## Intent vs deliverable

Git subject promises: “Match C fountain.c dipfountain so an unlooted fountain can yield glistening coins via mkgold instead of a silent no-op.”

Old JS case 29 was empty `break`. C `fountain.c:530–546` on an **unlooted** fountain: `SET_FOUNTAIN_LOOTED`, `mkgold(rnd((dunlevs_in_dungeon-dunlev+1)*2)+5)`, glistening pline unless Blind, `exercise(A_WIS, TRUE)`, `newsym`. Already-looted: `break` before `mkgold`. `dryup` still after the switch.

The diff **does** that arm. It does **not** add `update_inventory`. Named. It does **not** pull drinkfountain enlightenment.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dipfountain` case 29 | C body, **rewritten** | `fountain.c:530–546`; was empty break |
| `FOUNTAIN_IS_LOOTED` / `SET_FOUNTAIN_LOOTED` | C macros, **local** | `rm.h:259–261`; pre-existing `loc.looted & F_LOOTED` |
| `mkgold` | C callee, **imported** | `mkobj.js:2197–2212` ≡ `mkobj.c:2003–2020` |
| `dunlev` / `dunlevs_in_dungeon` | C callees, **clones** | `dungeon.c:1325–1335`; same as `trap.js` |
| `Blind` | C macro, **clone** | D-1113/D-1114 helper |
| `hliquid` | C callee, **imported** | D-0849 |
| `exercise` / `newsym` | C callees, **imported** | pre-existing |
| `dryup` after switch | C caller, **pre-existing** | `fountain.c:553` |
| `update_inventory` | C caller, **named omit** | `fountain.c:552` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **New RNG:** `rnd((num_dunlevs - dlevel + 1) * 2)` then `+ 5` (C `(long)(rnd(...) + 5)` — `rnd` first, add 5; JS same). `mkgold` with **positive** amount skips C’s `amount <= 0` random generator (`mkobj.c:2008–2011`) — no extra `rnd`/`depth` there. Clang LTR: the `rnd` argument is a pure int expression, one call.

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates, no recorded (x,y). `u.ux,u.uy` is the hero cell, not a session coordinate. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Arm C actually writes

C `fountain.c:530–546`:

```
case 29: /* You see coins */
    if (FOUNTAIN_IS_LOOTED(u.ux, u.uy))
        break;
    SET_FOUNTAIN_LOOTED(u.ux, u.uy);
    (void) mkgold((long) (rnd((dunlevs_in_dungeon(&u.uz) - dunlev(&u.uz)
                               + 1) * 2) + 5),
                  u.ux, u.uy);
    if (!Blind)
        pline("Far below you, you see coins glistening in the %s.",
              hliquid("water"));
    exercise(A_WIS, TRUE);
    newsym(u.ux, u.uy);
    break;
```

JS `1360–1379`: same looted skip **before** `mkgold`; same `SET_FOUNTAIN_LOOTED`; same formula; same Blind-gated glistening; same `exercise`/`newsym`. Already-looted still reaches `dryup` after the switch (the `break` is only out of the case). Match.

Comment in C: more coins nearer the surface. `dunlevs - dunlev + 1` is 1 on the bottom and `num_dunlevs` on level 1, so `rnd(2*depth_from_bottom)+5`. JS clones:

```
dunlev(lev) → lev.dlevel ?? 1
dunlevs_in_dungeon(lev) → game.dungeons[lev.dnum].num_dunlevs ?? 1
```

C `dungeon.c:1325–1335` is exactly `lev->dlevel` and `dungeons[lev->dnum].num_dunlevs` (no `?? 1`). Missing `uz` would mis-amount; dipfountain always has `u.uz`. Same clones as `trap.js:556–560`. Match for this caller.

`FOUNTAIN_IS_LOOTED` is `looted & F_LOOTED`, not “any looted bit”. `F_WARNED` alone does **not** skip coins. JS helper uses `F_LOOTED` only. Match. `SET_FOUNTAIN_LOOTED` ORs `F_LOOTED` and keeps `F_WARNED`. Match.

### mkgold callee

C `mkobj.c:2003–2020`: `g_at`; if `amount <= 0` generate via `rnd(30/max(12-depth,2))` and `rnd(level_difficulty()+2)`; else add to existing gold or `mksobj_at(GOLD_PIECE)` and set `quan`/`owt`.

JS `mkobj.js:2197–2212`: same `amount <= 0` generator, same merge/`mksobj_at`/`weight`. Fountain passes `rnd(…)+5` which is ≥ 6. Merge path, no generator RNG. This is **not** “Match C mkgold, callee is a stub.” D-0002 already required merge-into-existing-gold.

Blind skip: gold is still placed. Sighted: glistening. `uroleplay.blind` Blind clone: same exotic Eyes note as review **75**. BBlinded without that flag: glow/glisten in both.

### dryup / update_inventory

C always `update_inventory(); dryup` after the switch. JS still only `dryup`. Named (same as D-1114). Case 29 does not skip `dryup` on looted or unlooted. Match for dryup.

## Hallucinations / overclaim

“Match C so an unlooted fountain can yield glistening coins via mkgold instead of a silent no-op” is **true for the looted gate, the `rnd((num_dunlevs-dlevel+1)*2)+5` amount, merge/create `mkgold`, Blind-gated pline, `exercise`, and `newsym`.** It is **not** true that `update_inventory` redraws, or that looted fountains now print anything (C also silent-breaks).

This is **not** “Match C dispatch, callee is a stub.” `mkgold` is the real mkobj function. Stamping **Addressed:** D-1115 is fair. Hash `79438232` is on the archive row (filled by D-1116).

## Density (§2b)

One Open cluster: C’s remaining empty dipfountain arm that names `mkgold` + the two dungeon helpers that formula calls. ~36 lines. Inside the band. Did not pull enlightenment / `gush` `minliquid` / `update_inventory` (queue said not wash_hands).

## Verification

Journal: private canary **57**/57 (amount formula; looted skip; Blind/EBlinded/BBlinded/roleplay; merge; F_WARNED; Levitation; hands; case 16/17 regression; dryup after; exercise); green+strict seed8000/0900; cohort **17**/17 including 0014/0360/4500/0030 + strict 0014/0360/4500/2200/0004/0030/0009/0367. Path **public-unhit**. Cadence fortress is not a fountain-gold proof.

C read of `fountain.c:530–554`, `mkobj.c:2003–2020`, `dungeon.c:1325–1335`, `rm.h:258–261`; JS `fountain.js:1006–1012` / `1360–1387`, `mkobj.js:2197–2212`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| unlooted, Dlvl 1 of 10 | `rnd(20)+5` gold + glisten | **same** |
| unlooted, bottom | `rnd(2)+5` | **same** |
| already `F_LOOTED` | skip mkgold; dryup | **same** |
| `F_WARNED` only | treat as unlooted | **same** |
| Blind | gold, no glisten | **same** |
| gold already on cell | merge `quan` | **same** |
| `dryup` after | yes | **same** |
| `update_inventory` | yes | **still named** |

## Actionable C-wrongs

None that Must-fix this next iter. The arm matches `fountain.c:530–546`.

Named omits / do-nots (map / Open, not Must-fix):

1. `dipfountain` `update_inventory()` (`fountain.c:552`).
2. drinkfountain case 19 enlightenment — **Addressed:** D-1116 `19e4be31` (next SHA).
3. Do not restore empty case 29 `break`. Do not skip `mkgold` when only `F_WARNED`. Do not use `amount<=0` generator here (amount is always positive). Do not pull `gush` `minliquid` into this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: an unlooted fountain fate 29 now places C’s depth-scaled gold via real `mkgold` and glistens unless Blind, instead of a silent break, while `update_inventory` stays named.
- Must-fix stays empty for this SHA; next port popped Open drinkfountain enlightenment (**Addressed:** D-1116 `19e4be31`).
