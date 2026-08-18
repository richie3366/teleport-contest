# Review 161 — 4dc76022 — dog.c `mon_arrive` After_you `my=xyflags` before rloc (D-1199)

## Metadata
- Full / short hash: `4dc76022bae32dcf05270e2362ea9e4c12447749` / `4dc76022`
- Parent: `2f8f7d9f` (D-1198). This file audits **this SHA only**. Archive row **Addressed:** D-1199 `4dc76022` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 05:03:25 +0200
- D-id: **D-1199**
- Stats: 12 files, +320 / −55 — `js/dog.js` +215 / −5; `js/do.js` `await losedogs()`; `js/teleport.js` comments.
- Claims to close: Open queue `dog.c` `mon_arrive` `my=xyflags` before rloc (named from D-1182 / D-1198 / review **143**). Not migrate bit. `reviews/loop-2026-08-15/` has no unpaid After_you Must-fix.
- JS / map: `dog.js` `losedogs` / `mon_arrive_after_you`. Callees `rloc` / `rloc_to_flag` / `goodpos` / `enexto` / `restore_cham`. `c-js-map/turns.md`. kops / EXACT_XY Before_you / failed_arrivals / wander / leftovers / Wiz_arrive / mnearto yank still named.
- Prior reviews this SHA claims to close: **143** “writer named Open”; **160** “next SHA copies flags.”

## Intent vs deliverable

Git subject promises: “Match C dog.c mon_arrive so a migrating monster copies xyflags into my before rloc, instead of arriving with empty flags.”

Old JS `losedogs` only walked `mydogs` (`With_you`). `migrate_to_level` stored flags in `mtrack[0].y` and zeroed `mx/my`. D-1182’s `rloc_pos_ok` never saw those bits. C `losedogs:390–401` places matching `migrating_mons` via `mon_arrive(..., After_you)`; C `mon_arrive:607–613` does `mtmp->mx = 0; mtmp->my = xyflags` then `mnearto` or `rloc(RLOC_NOMSG)`.

The diff **does** walk After_you (`mux/muy` match `u.uz`, `xyloc != MIGR_EXACT_XY`), port the xyloc switch (RANDOM zeros locale), copy flags into `my`, then `rloc` vs thin `mnearto` (`move_other` FALSE). It does **not** pull kops, Before_you EXACT_XY, failed_arrivals/`m_into_limbo`, wander/`somexy`, `MIGR_LEFTOVERS` `DF_ALL`, Wiz_arrive, or yank. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mtmp->my = xyflags` then rloc/mnearto | C site, **new** | `dog.c:607–613` |
| `losedogs` After_you walk | C caller, **new** | `dog.c:390–401` |
| `rloc(..., RLOC_NOMSG)` | C callee, **imported** | `teleport.js` D-1181/D-1182 |
| `restore_cham` | C callee, **imported** | `mon.js:2040` |
| `mon_catchup_elapsed_time` | C callee, **pre-existing** | `dog.js:680` |
| `arrive_stairway_find_from` / `arrive_stairway_find` | **clone** of `stairs.c` / `mklev.js` | identical walk; cycle vs `mklev.js` |
| `arrive_find_magic_portal` | **clone** of C `ftrap` loop | array **or** `ntrap` list |
| `mnearto_no_yank` | **clone** of `mon.c` `mnearto` FALSE path | yank named |
| `In_endgame` | C macro, **imported** | `const.js` ≡ `dungeon.h:141` |
| kops / Before_you / failed_arrivals / wander / leftovers / Wiz_arrive / yank | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**RNG:** `rloc` still 50× `rnd`/`rn2` then candy (pre-existing). `MIGR_PORTAL` + `In_endgame` burns two `rn1` like C `:548–549`. Catchup still has its own `rn2` table (pre-existing). Wander/`somexy`/`rn1` jitter **omitted** — named; that **skips** C dice when `mlstmv < moves-1` and `xlocale` is set. Portal no-trap FALLTHROUGH zeros locale (no extra die). `With_you` `rn2` tameness is unchanged and **not** this SHA’s copy site (C With_you returns **before** `:607`).

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Caller vs `dog.c:390–401`

C unlinks from `migrating_mons` when `mux==u.uz.dnum && muy==u.uz.dlevel && xyloc != MIGR_EXACT_XY` then `mon_arrive(mtmp, After_you)`. JS partitions `game.migrating_mons` into arrive vs stay with the same three tests, then `await mon_arrive_after_you`. `goto_level` now `await losedogs()` so After_you’s `rloc`/`rloc_to_flag` can `--More--`. Match on the claimed filter.

C does Before_you EXACT_XY **first**, then With_you, then After_you. JS still With_you then After_you; EXACT_XY stay on the migrating list (filter excludes them). Named. They will not be placed until Before_you exists — C would have placed them before pets. Map, not a contradiction of After_you.

### Flag copy vs `dog.c:607–613`

C after the xyloc switch and optional wander:

```
    mtmp->mx = 0; /*(already is 0)*/
    mtmp->my = xyflags;

    if (xlocale)
        failed_to_place = !mnearto(mtmp, xlocale, ylocale, FALSE, RLOC_NOMSG);
    else
        failed_to_place = !rloc(mtmp, RLOC_NOMSG);
```

JS (`dog.js:634–642`): `mtmp.mx = 0; mtmp.my = xyflags` then `if (xlocale) await mnearto_no_yank(...) else await rloc(mtmp, RLOC_NOMSG)`. **Copy-before-place matches.** `xyflags` was snapshotted from `mtrack[0].y` **before** `arrive_track_clear` (C `:453` then `:458` `mon_track_clear`). Match.

`MIGR_RANDOM` / default / portal FALLTHROUGH set `xlocale = ylocale = 0` so **`rloc`** runs and `rloc_pos_ok` reads `my` as flags (D-1182 XOR / updest / dndest). That is the path the Open row existed for. Stair/portal/WITH_HERO with a nonzero `xlocale` use `mnearto` → `rloc_to_flag`, which does **not** consult `rloc_pos_ok` — C same (`mnearto` not `rloc`). Do not call `rloc_pos_ok` from `mnearto` to “make flags matter” on stair arrivals.

C `if (xlocale)` is coordxy truthiness (column 0 is not a place). JS `if (xlocale)` same.

### `mnearto_no_yank` vs `mon.c:4031–4085` (`move_other=FALSE`)

C early-return if already at `(x,y)` and `m_at` is self; skip yank when `move_other` is FALSE; `goodpos(..., 0)` then `enexto(&mm, newx, newy, mtmp->data)` then `rloc_to_flag`. JS copies that FALSE path: no yank, `goodpos(..., 0)`, `enexto(mm, newx, newy, mtmp.data)`, `await rloc_to_flag`. **Not a no-op.** Yank / `deal_with_overcrowding` / recursive othermon are named (C After_you always passes FALSE, so yank is dead on this caller even in C).

Failure: C `return 0` → `failed_to_place` → `relmon(..., &failed_arrivals)`. JS returns false and **ignores** it — monster stays on `fmon` with `mx==0`, `my==xyflags`, and is **removed** from `migrating_mons`. Named `failed_arrivals`. That is leftover-on-fmon vs C limbo, a real diverge when `enexto` fails, **named** so it is map debt not a silent stub. `see_monsters` already `continue`s on `!mon.mx`, which hides the ghost from that walk only.

### Stair / portal clones vs `stairs.c:50–76` / `dog.c:541–573`

`arrive_stairway_find_from` / `arrive_stairway_find` are byte-for-byte the same tests as `js/mklev.js` `stairway_find_from` (and C `gs.stairs` linked list: `tolev.dnum/dlevel` + `isladder`). Local copies avoid `dog.js` → `mklev.js` cycle (`makedog`). **C-faithful clones, not diverging stand-ins.** `game.stairs` is a `.next` list (`mklev.js` prepends nodes), not an array.

Portal: C walks `gf.ftrap` for first `MAGIC_PORTAL`. JS handles array **or** `ntrap` list. Endgame: two `rn1` on `updest` lx..hy like C `:542–550` (`svu.updest`). No-portal: C may `impossible` then FALLTHROUGH to RANDOM; JS FALLTHROUGH without `impossible` / debug_fuzzer stair. Named.

`In_endgame` from `const.js` is `lev.dnum === astral_level.dnum` — C `dungeon.h:141`. **Imported macro, not a dummy.**

### Envelope vs named holes

C sets `MON_STILL_ARRIVING` at `:430` and clears at `:622`. JS never sets it (`MON_STILL_ARRIVING` is not even in `const.js`). `display.c:1508–1509` skips still-arriving in `see_monsters`; JS `see_monsters` already names that skip and uses `!mon.mx` instead. Pre-existing display omit, **not listed** in this SHA’s D-log named-omit bullet. During `rloc_to_flag` after `mx` is set, C would still skip a nested `see_monsters`; JS would newsym. Window is small (RLOC_NOMSG). Map / display peel, not Must-fix of the flag copy.

C `set_residency` / long-worm `initworm` at start: named. `mux/muy` overwritten to `u.ux/u.uy` **after** losedogs used them as dest dungeon — JS same order inside After_you.

Catchup: JS calls existing `mon_catchup_elapsed_time` when `mlstmv < moves-1` then **skips** `wander = min(nmv,8)` / `somexy` / nearby `rn1`. Named. Flags still copied after the switch. Do not invent jitter RNG to “align” a public seed.

| Case | C | JS after |
|------|---|---------|
| After_you mux/muy match, not EXACT_XY | `mon_arrive` | **same filter** |
| `my = xyflags`, `mx = 0` then place | `:607–613` | **same** |
| RANDOM / no-portal | `rloc` + `rloc_pos_ok` | **same** |
| stair/portal with locale | `mnearto` FALSE | **same FALSE path** |
| endgame portal | two `rn1` updest | **same** |
| `enexto` fail | failed_arrivals → limbo | **on fmon mx==0 (named)** |
| wander after catchup | `somexy`/`rn1` | **named skip** |
| With_you | returns before `:607` | **unchanged helper** |

## Constitution / playbook

No FORCE / getRngLog / recorded arrival `(x,y)`. Placement is C’s switch + `rloc_pos_ok` reader. Rule #2: imports from `./teleport.js` / `./mon.js` / `./const.js` only. Frozen contracts untouched. Do not pin W-tower XOR with a hardcoded exclude rectangle in `dog.js`.

## Hallucinations / overclaim

D-log / CURRENT / subject say a migrating monster copies xyflags into `my` before rloc instead of arriving with empty flags. **That assignment plus the After_you caller are the hunk.** Stamping **Addressed:** D-1199 is fair. This is **not** “Match C dispatch, callee is a stub”: `rloc` / `rloc_to_flag` / `goodpos` / `enexto` / `restore_cham` / `In_W_tower` reader (D-1182) are live. The stair clones match `stairs.c`. `mnearto_no_yank` is the FALSE path of `mnearto`, not a `return true`. Do **not** stamp “Match C failed_arrivals” or “Match C wander/somexy” or “Match C `MON_STILL_ARRIVING`” or “Match C `MIGR_LEFTOVERS` `DF_ALL`.”

### Clone classification (this SHA)

- After_you + `:607–613` — C site, new function.
- `rloc` / `rloc_to_flag` / `goodpos` / `enexto` / `restore_cham` / `In_endgame` / `isok` — C callees, imported.
- `arrive_stairway_*` — clones of live `mklev.js` / `stairs.c` (cycle).
- `arrive_find_magic_portal` — clone of C’s `ftrap` walk.
- `mnearto_no_yank` — clone of C `mnearto` FALSE path (yank named).
- `mon_catchup_elapsed_time` — pre-existing C callee, not rewritten here.
- No no-op: `mnearto_no_yank` places via `rloc_to_flag`.

## Density

After_you envelope + losedogs walk + three small callees. ~200 lines of `dog.js`. Right-size §2b: one C function family (`mon_arrive` After_you + its caller), not “half of `mon.c`”. The Open row was the flag copy; without After_you the copy could not run. Did not pull leftovers/kops. Not QUALITY-RISK for width. Clones that match C are not C-wrongs.

## Verification

Journal: private canary **32**/32 (flag reads while `mx==0`; other-level/EXACT_XY stay; updest bit0 / dndest `!bit0`; W-tower XOR inside/outside + precedes updest; `nlx==0`; `!On_W_tower` lx-minus-nlx; RANDOM not pinned to `mtrack[1]`; WITH_HERO/STAIRS_UP/PORTAL near dest; no-portal FALLTHROUGH; usteed skip; two migrants; mtrack clear; With_you pets; no fs/FORCE); green+strict seed8000/0900; cohort **10**/10 + strict 1500/0012/0360/4500/2200/0014/0004/0700/1800/0006. Path **public-unhit** on After_you. Cadence **#1525** **44**/44 is the fortress check, not a W-tower arrival canary.

Grep of `git show 4dc76022 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `dog.c:304–416` / `:418–623`, `mon.c:4031–4085`, `stairs.c:50–76`, `dungeon.h:141`. JS SHA `dog.js` After_you / `losedogs`; `do.js` await; existing `teleport.js` `rloc`/`rloc_pos_ok`.

Migrating wizard: C `rloc` stair prefer is `mtmp->iswiz && mtmp->mx`; After_you has `mx==0` so candy/`rloc_pos_ok` run, not `stairway_find_forwiz`. JS same.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `init_artifacts`). Claimed `my=xyflags` before `rloc` matches `:607–613`; D-1182/D-1198 are now a live writer→reader chain on RANDOM arrivals.

C-wrong / debt remaining (map / later peel, not new Must-fix prepends):

1. `losedogs` failed place must `relmon` onto `failed_arrivals` then `m_into_limbo` (`dog.c:615–618` / `:403–415`). Until then a failed `enexto` leaves `mx==0` on `fmon`.
2. After catchup, `wander`/`somexy`/`rn1` jitter when `xlocale && wander` (`dog.c:582–605`) so long-limbo arrivals consume C’s extra dice.
3. `MON_STILL_ARRIVING` around place (`dog.c:430` / `:622`; `display.c:1508`). JS `see_monsters` already names the skip.

Named omits / do-nots:

4. kops `make_happy_shoppers`; `MIGR_EXACT_XY` Before_you; `MIGR_LEFTOVERS` `deliver_obj_to_mon(..., DF_ALL)`; Wiz_arrive; worm/`set_residency`; full `mnearto` yank. Import `stairway_find_from` from `mklev.js` only if the cycle is gone.
5. Do not revert D-1199. Do not `rloc_pos_ok` from `mnearto`. Do not skip RANDOM zeroing of locale (that would `mnearto` at old `mtrack[1]`). Do not copy flags on With_you (C returns first). Do not FORCE a W-tower XOR.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: After_you now copies `mtrack[0].y` into `my` with `mx==0` then `rloc`/`mnearto` like `dog.c:607–613`, so D-1182/D-1198 finally constrain RANDOM arrivals; `mnearto_no_yank` is the live FALSE path, while failed_arrivals, wander RNG, and `MON_STILL_ARRIVING` stay named holes.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1199 `4dc76022`. Next port in this window popped Open newgame `notice_mon_off`. Not leftovers, not init_artifacts.
