# Review 160 — 2f8f7d9f — dog.c `migrate_to_level` `In_W_tower` xyflags bit 2 (D-1198)

## Metadata
- Full / short hash: `2f8f7d9fe02c237ffeb2ea8b445531e2ab63393c` / `2f8f7d9f`
- Parent: `7deb2670` (D-1197). This file audits **this SHA only**. Archive row **Addressed:** D-1198 `2f8f7d9f` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 04:46:06 +0200
- D-id: **D-1198**
- Stats: 10 files, +110 / −44 — `js/teleport.js` +12 / −6 (writer `|= 2` plus comments).
- Claims to close: Open queue `dog.c` `migrate_to_level` `In_W_tower` xyflags bit 2 (named from D-1182 / review **143**). Not `mon_arrive`. `reviews/loop-2026-08-15/` has no unpaid bit-2 Must-fix.
- JS / map: `teleport.js` `migrate_to_level`. Callee `dungeon.js` `In_W_tower`. Reader `rloc_pos_ok` `my&2` is D-1182. Copy into `my` is D-1199 (next Open at this SHA).
- Prior reviews this SHA claims to close: **143** named writer omit; **158** did not steal this row.

## Intent vs deliverable

Git subject promises: “Match C dog.c migrate_to_level so a monster leaving from inside the Wizard's Tower sets xyflags bit 2, instead of encoding only the up-bit.”

Old JS: capture `mx,my`; splice off `fmon`; prepend `migrating_mons`; `xyflags = (depth(dest) < depth(uz)) ? 1 : 0`; store `mtrack[0].y`; `mx=my=0`. No `In_W_tower`. C `dog.c:913–915` then `if (In_W_tower(mx, my, &u.uz)) xyflags |= 2` using **pre-relmon** coordinates on the **current** level.

The diff **does** call existing `In_W_tower(mx, my, u.uz)` after the up-bit, still inside `if (u?.uz)`. It does **not** copy flags into `mtmp.my` (still 0 at end of migrate). Named as D-1199.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `xyflags \|= 2` | C site, **new** | `dog.c:914–915` |
| `In_W_tower` | C callee, **imported** | `dungeon.c:1923–1938`; already in `teleport.js` for Wizard stairs |
| captured `mx,my` | C locals | `dog.c:895` before `relmon` |
| `u.uz` not dest | C `&u.uz` | current level rectangle |
| depth-up bit 0 | C, **untouched** | `dog.c:913`; JS already |
| `mon_arrive` `my=xyflags` | C reader-writer, **named omit this SHA** | shipped next as D-1199 |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dest `cc` is **not** used for bit 2 (C uses live `mx,my`, not `cc->x/y`). Rule #2 clean.

**New RNG on this path:** none. `In_W_tower` is a rectangle test. `rloc_pos_ok` still has no dice.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Writer vs `dog.c:909–926`

C after `new_lev` from ledger:

```
    xyflags = (depth(&new_lev) < depth(&u.uz)); /* 1 => up */
    if (In_W_tower(mx, my, &u.uz))
        xyflags |= 2;
    ...
    mtmp->mtrack[0].y = xyflags;
    mtmp->mux = new_lev.dnum;
    mtmp->muy = new_lev.dlevel;
    mtmp->mx = mtmp->my = 0; /* mx==0 implies migrating */
```

JS (`teleport.js:2326–2367`): `const mx = mtmp.mx | 0; const my = mtmp.my | 0` **before** splice (C captures before `relmon`; JS splice is the relmon). Depth: `depth_start + dlevel - 1` on dest vs `u.uz` — C `dungeon.c:1431–1433` is exactly that formula. Then `if (In_W_tower(mx, my, u.uz)) xyflags |= 2`. Store `mtrack[0] = { x: xyloc, y: xyflags }`. `mx = my = 0` **after** the store. Match.

If both up and inside tower: C `xyflags` is 1 then `|= 2` → 3. JS same (`xyflags = 1` then `|= 2`). Down + inside → 2. Outside + up → 1. Outside + down → 0. Truth table matches C.

`cc` still only fills `mtrack[1]` (approx/exact xy), not bit 2. C `:920–921` vs `:914–915`. Match.

### Callee vs `dungeon.c:1923–1938`

C:

```
    if (!On_W_tower_level(lev))
        return FALSE;
    if (!svd.dndest.nlx) {
        impossible("No boundary for Wizard's Tower?");
        return FALSE;
    }
    return (boolean) within_bounded_area(x, y, svd.dndest.nlx, ...);
```

JS `dungeon.js:606–612`: `On_W_tower_level(lev)` then `if (!d || !(d.nlx | 0)) return false` then inclusive `nlx..nhy`. **Live rectangle, not a stub.** `impossible()` when `nlx==0` is named on that function (pre-existing). Boolean is still FALSE — C would `impossible` then FALSE. Inclusive corners match `within_bounded_area`. Tests **current** `game.dndest` (C `svd.dndest` on the level being left). Do not pass dest `new_lev`. JS passes `u.uz`. Match.

`On_W_tower_level` is wiz1/wiz2/wiz3 specials. Leaving an ordinary Gehennom cell on the same dungeon depth must **not** set bit 2. Callee returns false before the rectangle. Match.

JS wraps bit 2 inside `if (u?.uz)` with the depth compare. C always has `u.uz` at `migrate_to_level`. A missing `uz` would skip **both** bits; that is not a live caller (hole / keepdogs / muse run with a hero level). Not Must-fix.

### Reader still idle until D-1199 (this SHA)

`rloc_pos_ok` `!xx` XOR (`teleport.c:1594–1599` / JS after D-1182) reads `my&2`. This SHA still zeros `mtmp.my` at migrate end. Flags live in `mtrack[0].y` only. Review **143** already said a live migrant may have `my==0` until `mon_arrive` copies. This SHA is the **writer**. Stamping “Match C live W-tower arrival constraint” on **this** SHA would be a lie. D-log correctly defers the copy.

At **this** parent, `losedogs` still only placed `mydogs`. Migrating_mons never reached `rloc_pos_ok` with these flags. Named. D-1199 is the next commit.

| Case | C | JS after this SHA |
|------|---|-------------------|
| inside tower, going down | `mtrack[0].y==2` | **same** |
| inside tower, going up | 3 | **same** |
| outside, up / down | 1 / 0 | **same** |
| `!On_W_tower_level` | no bit 2 | **same** |
| `nlx==0` | FALSE (+ impossible) | FALSE (impossible named) |
| `cc` given | unused for bit 2 | **same** |
| `my` after migrate | 0 | **same** |
| live XOR on arrival | needs `mon_arrive` | **next SHA** |

## Constitution / playbook

No FORCE / recorded W-tower `(gx,gy)` OR-ed into xyflags. Bit 2 is C’s `In_W_tower(mx,my,&u.uz)` on captured coordinates. Rule #2: callee already imported. Do not invent bit 2 from `On_W_tower_level` alone (a cell on wiz1 but **outside** the exclusion rectangle must stay bit0-only). Frozen contracts untouched.

## Hallucinations / overclaim

D-log / CURRENT / subject say a monster leaving from inside the Wizard's Tower sets xyflags bit 2 instead of encoding only the up-bit. **That `|= 2` is the hunk.** Stamping **Addressed:** D-1198 is fair. This is **not** “Match C dispatch, callee is a stub”: `In_W_tower` is the D-1182-era rectangle. Do **not** stamp “Match C `mon_arrive` `my=xyflags`” on this SHA (D-1199). Do **not** stamp “public W-tower migrants now XOR-constrained” — at this parent they never arrive.

### Clone classification (this SHA)

- `xyflags \|= 2` — C site, new, in the existing writer.
- `In_W_tower` — C callee, imported (not a second clone).
- Depth compare — pre-existing, C `depth()`.
- No no-op helper.

## Density

One `if` after the up-bit (~6 lines of real JS). Thin. It is the whole queued Open row. Did not pull `mon_arrive`. Constitution: do not combine Open items. Same one-row-peel note as D-1195/D-1196. Zero RNG.

## Verification

Journal: private canary **40**/40 (inside+down=2 / inside+up=3; outside 0/1; inclusive corners; one-cell outside; `!On_W_tower_level`; `nlx==0`; wiz2/wiz3; `cc` unused for bit 2; dest-wiz1 from ordinary; post `mx,my=0`; `my` stays 0 not xyflags; same-depth; updest unused; no fs/FORCE); green+strict seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/2200/0014/0004. Path public-unhit on migrate-from-tower until After_you copies `mtrack[0].y`. Cadence **#1525** **44**/44 does not exercise Wizard-tower departure.

Grep of `git show 2f8f7d9f -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `dog.c:887–932`, `dungeon.c:1431–1433` / `:1923–1938`. JS SHA `migrate_to_level`; existing `In_W_tower`.

`mlstmv = game.moves` stays in the writer (C `:917`). Do not clear `mtrack[0].y` after `mx=my=0`. Callers (`mlevel_tele_trap`, hole, `keepdogs`) are unchanged.

`In_W_tower` uses `game.dndest` of the **current** level. `goto_level` stashes/restores dest rects (D-0656). `migrate_to_level` runs while the hero is still on the source level (hole / portal / `keep_mon_accessible` before the hero finishes leaving), so `dndest` is still the tower exclusion, not the destination floor’s TELEPORT_REGION. Do not read dest `new_lev` into `In_W_tower`. C passes `&u.uz`.

`mtrack[2]` still stores from-dungeon (`u.uz.dnum/dlevel`) for stair `fromdlev` on arrival (C `:918–919`). Bit 2 is independent of that pair. `wormno = num_segs` / leash / `emits_light` `vision_recalc(0)` stay named on this writer (pre-existing holes). This SHA only ORs 2.

A same-depth migrate (`depthNew == depthOld`) leaves bit 0 clear and may still OR 2. C `xyflags = (depth(&new_lev) < depth(&u.uz))` is 0/1; `|= 2` is separate. JS `if (depthNew < depthOld) xyflags = 1` then `|= 2`. Same-depth + inside → 2, not 3. Match.

`relmon` in C keeps `mx,my` until the end of `migrate_to_level` then zeros them. JS captures first then splice; captured values still feed `In_W_tower`. If splice ran before capture, bit 2 would always see 0,0 and never set — this SHA captures first. Inclusive rectangle: a monster on `nlx,nly` or `nhx,nhy` is inside (C `within_bounded_area`). JS `>=` / `<=`. One cell west of `nlx` is outside.

## Actionable C-wrongs

None that Must-fix this next iter. Claimed `|= 2` matches `:914–915`.

Named omits / do-nots (map / Open at this SHA, not Must-fix):

1. `dog.c` `mon_arrive` `mtmp->my = xyflags` before `rloc` — **Addressed:** D-1199 `4dc76022` in the next commit, not this one.
2. `mon_leave` worm/isshk residency; leash; light `vision_recalc(0)` when `emits_light`. `impossible()` on `In_W_tower` with `nlx==0`.
3. Do not OR 2 from dest level. Do not use `cc` for bit 2. Do not skip `On_W_tower_level` inside `In_W_tower`. Do not invert bit 0 vs bit 2.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `migrate_to_level` now ORs C’s W-tower bit 2 from `In_W_tower(mx,my,u.uz)` on pre-relmon coordinates after the depth-up bit, matching `dog.c:913–915`; `In_W_tower` is live, and `my` stays 0 until D-1199 copies the flags.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1198 `2f8f7d9f`. Next port in this window popped Open `mon_arrive` `my=xyflags`. Not Override, not notice_mon_off.
