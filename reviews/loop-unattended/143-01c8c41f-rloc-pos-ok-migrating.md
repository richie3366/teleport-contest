# Review 143 — 01c8c41f — teleport.c `rloc_pos_ok` mx==0 updest/dndest (D-1182)

## Metadata
- Full / short hash: `01c8c41f43fb728aed55c21872c221df37c51bb3` / `01c8c41f`
- Parent: `0b488053` (D-1181). This file audits **this SHA only**. Archive row **Addressed:** D-1182 `01c8c41f` was filled by D-1183.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 22:10:08 +0200
- D-id: **D-1182**
- Stats: 10 files, +147 / −44 — `js/teleport.js` +46 / −18 (`rloc_pos_ok` `!xx` arm).
- Claims to close: Open queue `teleport.c` `rloc_pos_ok` mx==0 updest/dndest (named). Not room lock. Reviews **132** / **141** named `:1592–1615` after the on-map shk/priest lock (D-1171). `reviews/loop-2026-08-15/` has no open mx==0 Must-fix.
- JS / map: `teleport.js` `rloc_pos_ok`. `c-js-map/turns.md` `teleport.c`. `migrate_to_level` `In_W_tower` xyflags bit 2; `mon_arrive` `my=xyflags` before rloc still named (Open).
- Prior reviews this SHA claims to close: **132** named omit; D-1181 next-port was RLOC_ERR (shipped); this SHA is the following Open row.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_pos_ok so a migrating monster with mx==0 honors updest/dndest and W-tower flags, instead of treating every goodpos cell as a valid arrival.”

Old JS after `goodpos(GP_CHECKSCARY)` ran the on-map room lock only when `xx` (mx) was nonzero, then `return true` for migrating `mx==0`. C `:1592–1615` uses `my` as flags when `!mx` (bit 0 = moving up, bit 1 = inside W-tower): Wizard-tower level with `dndest.nlx` → dest-in-exclude XOR `my&2`; else moving-up `updest.lx` minus nlx exclude; else moving-down `dndest.lx` minus nlx exclude.

The diff **does** port that `!xx` arm with C’s three `if` order and the XOR. On-map isshk/ispriest + `tele_jump_ok` stay in the `else`. It does **not** set `xyflags |= 2` in `migrate_to_level` or copy flags into `mtmp.my` in `mon_arrive`. Named Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_pos_ok` `!xx` arm | C branch, **new** | `teleport.c:1592–1615` |
| `within_bounded_area` | C macro, **local copy** | `dungeon.h`; already in this file for `tele_jump_ok` |
| `On_W_tower_level` | C callee, **imported** | `dungeon.js`; `on_wiz_level` false if `!lev` |
| `game.dndest` / `game.updest` | C `svd.dndest` / `svu.updest` | same JS fields `tele_jump_ok` already uses |
| on-map room lock | C `else`, **untouched** | D-1171 `:1620–1626` |
| `tele_jump_ok` | C, **on-map only** | C does **not** call it when `!xx` |
| `migrate_to_level` bit 2 | C writer, **named omit** | `dog.c:914–915`; JS sets bit 0 only |
| `mon_arrive` `my=xyflags` | C writer, **named omit** | `dog.c:607–613`; JS `losedogs` With_you only |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dest `(x,y)` is the live candidate. Rule #2 clean.

**New RNG on this path:** none. `rloc_pos_ok` is a predicate. Caller `rloc` still does 50× `rnd`/`rn2` then candy `rn2` (pre-existing). Empty dest rects fall through to `return true` — **same as C**.

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not `in_rooms` the dest. Do not lock migrating shk (C room lock is the `xx` else). Do not invert the XOR (`bit2 ^ !within`). Do not run `tele_jump_ok` on `mx==0`. Do not invent bit 2 in this peel.

## C ↔ JS fidelity

### Guard vs `:1581–1591`

C: `goodpos(..., GP_CHECKSCARY)` first; `xx = mtmp->mx; yy = mtmp->my`. JS same. `!xx` is migrating (C comment: mx==0 implies migrating). Match.

### W-tower XOR vs `:1594–1599`

C:

```
if (svd.dndest.nlx && On_W_tower_level(&u.uz))
    return (((yy & 2) != 0)
            ^ !within_bounded_area(x, y,
                                   svd.dndest.nlx, svd.dndest.nly,
                                   svd.dndest.nhx, svd.dndest.nhy));
```

JS: `(dndest.nlx | 0) && On_W_tower_level(game.u?.uz)` then
`(((yy & 2) !== 0) ^ !within_bounded_area(...)) !== 0`.

C `!= 0` / `!within` are 0/1 ints; `^` is bitwise XOR; return in boolean context. JS booleans ToInt32 then `^` then `!== 0`. Truth table:

| bit2 | within | C XOR | want |
|------|--------|-------|------|
| 1 | 1 | 1 ^ 0 = 1 | inside tower |
| 1 | 0 | 1 ^ 1 = 0 | reject outside |
| 0 | 1 | 0 ^ 0 = 0 | reject inside |
| 0 | 0 | 0 ^ 1 = 1 | outside tower |

Match. `On_W_tower_level(undefined)` is false (`!lev`), so a missing `uz` skips this arm — C always has `u.uz`. Not a live migrant bug (hero uz exists when `rloc` runs).

### Up / down vs `:1600–1615`

C moving up: `svu.updest.lx && (yy & 1) != 0` → within updest lx..hy **and** (`!nlx` or not within nlx exclude). Moving down: `svd.dndest.lx && (yy & 1) == 0` — same shape on dndest. JS uses `game.updest` / `game.dndest` with the same `lx` / `nlx` tests and `| 0`. Fallthrough when lx is 0: `return TRUE` after the `if (!xx)` block. Match.

W-tower `if` is **first** and returns — up/down do not also run. JS same.

C uses `svd.dndest` for the W-tower and down tests and `svu.updest` for up. JS `game.dndest` / `game.updest` are the same dest-area structs `goto_level` stash/restore (D-0656) and `tele_jump_ok` already reads. Do not invent a second `svd` object. `nlx==0` is C’s “no exclusion rectangle”: W-tower arm does not run (`if (dndest.nlx && …)`); up/down still use `lx` if set.

`within_bounded_area` is inclusive `x>=lx && x<=hx && y>=ly && y<=hy` (`dungeon.h`). Local JS copy matches. `On_W_tower_level` is wiz1/wiz2/wiz3 specials (`dungeon.c`), not `In_W_tower` (rectangle). C’s XOR arm is **level** + `dndest.nlx`, then dest-in-exclude XOR bit 1 of `my`. `In_W_tower` is the **writer** (`migrate_to_level` `:914–915`) — named omit.

### On-map else vs `:1616–1630`

Unchanged this SHA (D-1171). Migrating monsters do **not** take `tele_jump_ok` (C: that call is inside `else`). JS removed the old `// migrating ... deferred` fallthrough. Match.

C `dog.c` `migrate_to_level` `:913–926`: `xyflags = (depth(new) < depth(uz))` then `if (In_W_tower(mx, my, &uz)) xyflags |= 2`; store in `mtrack[0].y`; `mx = my = 0`. JS sets bit 0 from depth compare and stores `mtrack[0].y = xyflags` but **never** ORs 2 (named). C `mon_arrive` `:607–613`: `mtmp->my = xyflags` then `mnearto` or `rloc`. JS `losedogs` only places `mydogs` With_you; migrating_mons arrival is deferred — so even a correct reader is idle until that writer ships. Named Open, not a clone bug in this SHA’s `if (!xx)` body.

`rloc` candy may still `goodpos`-fallback when every `rloc_pos_ok` fails (`:1880–1890`, D-1181). A migrant rejected by this arm can still land outside the TELEPORT_REGION via backup. C same. Do not treat backup as a C-wrong in the predicate.

| Case | C | JS after |
|------|---|---------|
| `!goodpos` | FALSE | **same** |
| `mx!=0` shk/priest / jump | D-1171 | **same** |
| `mx==0`, no dest lx/nlx | TRUE after arm | **same** |
| W-tower + `nlx`, bit2, dest in exclude | TRUE | **same** |
| W-tower + `nlx`, bit2, dest out | FALSE | **same** |
| W-tower + `nlx`, no bit2, dest in | FALSE | **same** |
| up bit0, `updest.lx`, dest in minus nlx | TRUE | **same** |
| down `!bit0`, `dndest.lx` | dndest analog | **same** |
| live migrant `my` not flags | **writer named** | Open `mon_arrive` |

### JS as shipped (`teleport.js:980–1029`) vs writers (`:2236–2275`)

Reader this SHA: `goodpos` then `xx = mtmp.mx`, `yy = mtmp.my`, `if (!xx)` W-tower XOR / updest / dndest then implicit `return true`. Else D-1171 room lock + `tele_jump_ok`. Empty dest rects fall through the `if (!xx)` block to `return true` — C `:1616` closes the `if (!xx)` then the function returns TRUE. Match.

Writer still this tree (`migrate_to_level`, not this SHA): `xyflags = (depthNew < depthOld) ? 1 : 0`; store `mtrack[0].y = xyflags`; `mx = my = 0`. **No** `In_W_tower(mx, my, uz)` OR 2. C `dog.c:913–926` sets bit 0 from `depth(&new_lev) < depth(&u.uz)` then ORs 2 when the **departure** cell is inside the W-tower rectangle. JS `In_W_tower` exists (`dungeon.js:606`) and is already imported into `teleport.js` for `rloc` Wizard stairs — the writer simply does not call it. Named Open, not a missing import.

`losedogs` (`dog.js:458–462`) only walks `mydogs`. `mon_arrive` (`dog.c:607–613`) `mtmp->my = xyflags` then `mnearto` or `rloc(..., RLOC_NOMSG)` is not ported. A live JS migrant therefore still has `my==0` when/if `rloc` sees `mx==0`: both bits clear → skip W-tower XOR unless `On_W_tower_level` and `dndest.nlx`; take the **down** `dndest.lx` arm if that rect exists, else fall through TRUE. That is the named writer hole, not a reader inversion.

RNG: none in the predicate. Caller `rloc` still 50× `rnd`/`rn2` then candy `rn2` (D-1122). `goodpos` backup after every `rloc_pos_ok` fail is D-1181, C same. Rejecting a candidate does not consume an extra die — C same (`rloc_pos_ok` is a boolean, no `rn2` inside). `goodpos` itself may walk onscary without dice on this path (`GP_CHECKSCARY`).

Prior reviews **132** / **141** named `:1592–1615` after the on-map room lock (D-1171). This SHA is that row. `reviews/loop-2026-08-15/` has no unpaid mx==0 Must-fix.

## Hallucinations / overclaim

D-log / CURRENT / subject say a migrating `mx==0` candidate honors updest/dndest / W-tower flags instead of always-TRUE after `goodpos`. **That is the hunk:** C `:1592–1615`. Stamping **Addressed:** D-1182 is fair for the Open **mx==0** line. Hash `01c8c41f` is on the archive row (filled by D-1183). Do **not** stamp it as “Match C `migrate_to_level` bit 2” or “Match C `mon_arrive` `my=xyflags`” or “live Wizard-tower arrivals now constrained.” The **reader** is C; the **writers** are named Open, so a JS migrant may still have `my==0` (both bits clear) and take the down/`dndest.lx` arm or fall through. This is **not** “Match C dispatch, callee is a stub”: `goodpos` / `within_bounded_area` / `On_W_tower_level` are live.

### Clone classification (this SHA)

- `rloc_pos_ok` `!xx` arm — C branch, rewritten in place.
- `within_bounded_area` — C macro clone already used by `tele_jump_ok` in this file (`dungeon.h` inclusive box).
- `On_W_tower_level` — C callee imported from `dungeon.js`.
- `game.updest` / `game.dndest` — C `svu.updest` / `svd.dndest` fields, not a second dest object.
- `tele_jump_ok` — C callee, correctly **not** called when `!xx`.
- `migrate_to_level` bit 2 / `mon_arrive` `my=xyflags` — not this SHA; named Open writers.
- No no-op helper added.

## Density

One C `if (!xx)` arm. ~30 JS lines. Right-size §2b (sibling of D-1171 room lock). Did not pull ustuck or `make_blinded`. Not QUALITY-RISK.

## Verification

Journal: private canary **84**/84 (goodpos first; no dests fallthrough; down lx/exclude; up vs dndest.lx; W-tower XOR precedence; nlx==0; `!On_W_tower` uses lx; on-map ignores lx; `tele_jump_ok` on-map only; migrating shk unlocked; rloc lands in dndest; on-map rloc can leave lx); green+strict seed8000/0900; cohort **12**/12. Path **public-unhit** on migrating arrival. Cadence **#1505** **44**/44 is the fortress check, not a W-tower arrival canary.

C read of `teleport.c:1575–1633`, `dog.c:887–926` / `:607–613`, `dungeon.c` `On_W_tower_level`. JS SHA `rloc_pos_ok` / existing `migrate_to_level` bit 0 only. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` Scr **11405**/11405 RNG **792838**/792838 (100%).

## Actionable C-wrongs

None that Must-fix this next iter. The Open `!xx` arm matches `:1592–1615`. Writers are named Open, not a clone that contradicts the XOR.

Named omits / do-nots (map / Open, not Must-fix):

1. `dog.c` `migrate_to_level` `In_W_tower` `xyflags \|= 2`. Open.
2. `dog.c` `mon_arrive` `mtmp->my = xyflags` before `rloc`. Open.
3. Do not `tele_jump_ok` when `mx==0`. Do not invert XOR. Do not lock migrating shk. Do not pull ustuck into this SHA — **Addressed:** D-1183 `d2512b22`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc_pos_ok` for `mx==0` now applies C’s W-tower XOR then updest/dndest lx/nlx tests, while `migrate_to_level` bit 2 and `mon_arrive` `my=xyflags` stay named so live migrants may still arrive with empty flags.
- Must-fix stays empty for this SHA; next port in this window popped Open ustuck-together. **Addressed:** D-1182 `01c8c41f`. Not room lock, not bit 2.
