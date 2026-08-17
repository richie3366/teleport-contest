# Review 93 — a8d04dd2 — teleds TT_BURIEDBALL buried_ball_to_punishment (D-1132)

## Metadata
- Full / short hash: `a8d04dd2b5a1b64d7080e27130bf7062387414ed` / `a8d04dd2`
- Parent: `00956ae8` (D-1131). This file audits **this SHA only**. The fix stamped **Addressed:** D-1132 without the short hash; this review commit fills `a8d04dd2`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 04:00:28 +0200
- D-id: **D-1132**
- Stats: 10 files, +105 / −20 — `js/dig.js` +22 / −1 (`buried_ball_to_punishment`); `js/teleport.js` +13 / −3 (type-only gate before `ball_active`).
- Claims to close: Open queue `teleport.c` `teleds` `buried_ball_to_punishment` (named). Not Punished ball. Review **82** named omit 4; D-1131 next-port. `reviews/loop-2026-08-15/` has no open buried-ball Must-fix.
- JS / map: `dig.js` `buried_ball_to_punishment` / `buried_ball`; `teleport.js` `teleds`; `read.js` `punish`. `c-js-map/turns.md` teleport + dig. trapmove wriggle, `unearth_objs`, `digactualhole`, `level_tele`, `domagicportal` still named.
- Prior reviews this SHA claims to close: **82** named buried-ball unearth; **92** named next Open.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleds so a TT_BURIEDBALL landing unearths via buried_ball_to_punishment before Punished ball_active, instead of leaving the iron ball buried.”

Old JS `teleds` computed `ball_active = uball && where != OBJ_FREE` with no unearth. A hero chained to a buried iron ball (`utraptype == TT_BURIEDBALL`) kept the ball on `buriedobjlist`, so Punished drag/`unplacebc`/`placebc` never ran. C `teleport.c:456–459` calls `buried_ball_to_punishment()` when `u.utraptype == TT_BURIEDBALL` **with no `u.utrap` conjunct**, before `ball_active`. `dig.c:1934–1955` extracts the nearest buried `HEAVY_IRON_BALL` (`buried_ball` mutates `cc` to ball coords), `punish(ball)` reuse, `reset_utrap(FALSE)`, `del_engr_at`/`newsym` at `cc`.

The diff **does** that type-only gate and ports the helper beside existing `buried_ball_to_freedom`. It does **not** wire trapmove wriggle, `unearth_objs`, `digactualhole`, `level_tele`, or `domagicportal`. Named. RUST_METAL `stop_timer` is C `#if 0`. It does **not** rewrite Punished `unplacebc`/`placebc`/`drag_ball` (already #1151).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleds` TT_BURIEDBALL gate | C body, **new** | `teleport.c:456–459`; type-only |
| `buried_ball_to_punishment` | C callee, **new** | `dig.c:1934–1955`; not a comment stub |
| `buried_ball` | C callee, **imported** | pre-existing; dist2≤8; mutates `cc` |
| `obj_extract_self` | C callee, **imported** | off buried list |
| `punish(ball)` | C callee, **imported** | `read.js`; reuse when `otyp==HEAVY_IRON_BALL` |
| `reset_utrap(false)` | C callee, **imported** | `trap.js`; `msg==FALSE` skips float_up |
| `del_engr_at` / `newsym` | C callees, **imported** | at possibly-mutated `cc` |
| RUST_METAL timer | C `#if 0`, **named omit** | not implemented in C either |
| other callers | C callers, **named omit** | trapmove / unearth / dig / levelport / portal |
| Punished drag/placebc | C body, **untouched** | already #1151; runs **after** unearth |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in `buried_ball` (linear scan) or the extract/`punish` reuse/`reset_utrap`/`del_engr` chain. `punish` `mkobj(CHAIN/BALL)` RNG runs only when **not** reuse — unearthed ball is always `HEAVY_IRON_BALL` so reuse. Already-Punished heavier path: `owt += WT_IRON_BALL_INCR * (1+cursed)` — no RNG. C same (`read.c:3031–3034`).

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. `u.ux`/`u.uy` seed `cc`; `buried_ball` may rewrite `cc` to the ball’s ox,oy — live object coords, not a session pair. Contest Rule #2: dynamic `import('./dig.js')` is cycle-breaking. Do not add a `u.utrap` conjunct on the teleds gate (C is type-only). Do not pull trapmove wriggle into this SHA. Do not treat this as a close of Punished `drag_ball`.

## C ↔ JS fidelity

### Caller order

C `teleport.c:456–464`:

```
if (u.utraptype == TT_BURIEDBALL)
    buried_ball_to_punishment();
ball_active = (Punished && uball->where != OBJ_FREE);
```

JS `1202–1209`: `if ((u.utraptype | 0) === TT_BURIEDBALL) await buried_ball_to_punishment()` then `ball_active = uball && where != OBJ_FREE`. `Punished` ≡ `uball != 0` (`youprop.h:77`). Type-only: stale `utraptype` with `utrap==0` still unearthes, matching C. After a successful unearth, `punish` `setworn(reuse, W_BALL)` so `ball_active` is true and the existing drag/`unplacebc`/`placebc` envelope can run. Match on the Open line.

`TT_PIT` / `TT_WEB` do not enter the helper. No ball on the buried list: helper no-ops; `ball_active` stays false.

### `buried_ball_to_punishment` body

C `dig.c:1934–1955`:

```
cc.x = u.ux; cc.y = u.uy;
ball = buried_ball(&cc);
if (ball) {
    obj_extract_self(ball);
#if 0
    stop_timer(RUST_METAL, ...);
#endif
    punish(ball); /* use ball as flag for unearthed buried ball */
    reset_utrap(FALSE);
    del_engr_at(cc.x, cc.y);
    newsym(cc.x, cc.y);
}
```

JS `510–521`: same `cc`, same `buried_ball`, extract, skip `#if 0` timer, `await punish(ball)`, `reset_utrap(false)`, `del_engr_at`/`newsym` at `cc`. `buried_ball` (`dig.js:480–501`) already matches C `:1906–1931`: `!utrap || type==TT_BURIEDBALL`; exact ox,oy return; else nearest `dist2<=8`; mutate `cc` when off-target. `del_engr_at` therefore hits the **ball** cell, not necessarily the hero cell. Match call-for-call.

C `reset_utrap(FALSE)` is `set_utrap(0,0)` with no float_up (`trap.c:1045–1057`). JS `reset_utrap` ignores `_msg` and `set_utrap(0,0)`. Then `teleds` clears utrap again (C also `reset_utrap(FALSE)` later at `:487`). Harmless double clear.

### `punish` reuse is not a stub

C `read.c:3019–3061`: `reuse_ball = (sobj && sobj->otyp == HEAVY_IRON_BALL)`; skip misbehavior pline when reuse; if already Punished, heavier + return (extracted second ball stays OBJ_FREE — C too); amorphous `dropy(reuse)`; else `setworn` chain + reuse as `W_BALL`; `placebc` unless swallowed; Blind `set_bc(1)` named in JS (`// Blind set_bc deferred`).

JS `punish` (`read.js:780–819`): same reuse test, same heavier early-return, same amorphous `dropy(reuse)`, same `setworn(reuse, W_BALL)`. Unearthed `HEAVY_IRON_BALL` takes the reuse path. Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `punish` attaches the unearthed ball as `uball`. Blind `set_bc` is pre-existing punish debt, not a miss of the Open unearth.

If already Punished, C `punish` weights the **existing** `uball` and returns; the extracted buried ball stays `OBJ_FREE` (C leak/drop is the same). JS same. Do not invent a `delobj` of that second ball this peel — that would be a new theory.

`teleds` later `reset_utrap` clone still does not call `trap.js` `reset_utrap` (pre-existing). After this helper already cleared utrap, the clone is a no-op. C also calls `reset_utrap(FALSE)` twice on this path.

`buried_ball_to_freedom` still `place_object` + `reset_utrap(true)` — this SHA does not rewrite it. Canary claimed freedom still places. Confusing the two helpers would drop an unearthed ball on the floor instead of chaining it; the Open line is punish-reuse, not freedom.

`HEAVY_IRON_BALL` is `objectNames.indexOf('HEAVY_IRON_BALL')` in both `buried_ball` and `punish` reuse. `dist2<=8` is Chebyshev-adjacent within ±2 (C comment 4/5/8 ring). `odist==9` is out. Exact feet match returns immediately without rewriting `cc`, so engraving at the hero cell is deleted only when the ball is there.

### Other callers

C also calls `buried_ball_to_punishment` from `level_tele` / `domagicportal` (`teleport.c:1302,1451`) and trapmove / `unearth_objs` / `digactualhole`. JS leaves those named. D-log: “Did not wire trapmove/`unearth_objs`/`digactualhole`/`level_tele`/`domagicportal`.” Fair.

### Callers of `teleds`

Every wired `teleds` now unearthes before `ball_active`. `tele_trap` teledest still named (live Open `tele()` / teledest). Guard: C always tests type then maybe no-ops; JS same.

## Hallucinations / overclaim

D-log / CURRENT / subject say a TT_BURIEDBALL landing unearthes via `buried_ball_to_punishment` before Punished `ball_active`, instead of leaving the iron ball buried. That is the hunk: type-only gate, extract, `punish` reuse, `reset_utrap(FALSE)`, engr/newsym at mutated `cc`. They name other callers and RUST_METAL `#if 0`. Stamping **Addressed:** D-1132 is fair for the Open **teleds** line. Fill hash `a8d04dd2` in this commit. Do **not** stamp it as a close of trapmove wriggle or `level_tele` unearth.

## Density

One C function plus the teleds gate C places before `ball_active`. Not “finish punish.c.” Swallow `docrt` / vault_guard left named. ~22+13 JS. Right size (§2b). Slightly thin vs hideunder; still a caller/callee cluster, not a one-`if` FAIL peel.

## Verification

Journal: private canary **49**/49 (C/JS source order; type-only gate; no-ball; feet reuse+chain; TT_PIT skip; dist2≤8 vs 9; engr at ball coords; freedom still `place_object`; teleds far dest Punished; TT_WEB skip; leftover type; already-Punished heavier); green+strict seed8000/0900; cohort **22**/22 including 0012 vault + 0004 + 0007 snake + 0009 swim + 0360/0367/0373/4500/2200 + strict 0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path **public-unhit** on buried-ball teleds. This audit’s full `sessions` (cadence **#1440**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `teleport.c:456–464`, `dig.c:1903–1955`, `read.c:3019–3061`, `trap.c:1045–1057`, `youprop.h:77`; JS `teleport.js:1202–1209`, `dig.js:480–521`, `read.js:780–819`, `trap.js:1891–1893`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| `utraptype==TT_BURIEDBALL` + buried ball | extract; `punish` reuse; clear utrap | **same** |
| type-only, `utrap==0` | still call | **same** |
| TT_PIT / TT_WEB | skip helper | **same** |
| no buried ball | no-op; `ball_active` false | **same** |
| already Punished | heavier existing `uball` | **same** |
| `cc` off-hero | `del_engr_at` at ball | **same** (`buried_ball` mutates) |
| trapmove / `level_tele` | also call | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open gate matches `teleport.c:456–459`. The helper matches `dig.c:1934–1955`. `punish` reuse matches `read.c:3022–3050`.

Named omits / do-nots (map / Open, not Must-fix):

1. trapmove wriggle / `unearth_objs` / `digactualhole` / `level_tele` / `domagicportal` callers of `buried_ball_to_punishment`.
2. `punish` Blind `set_bc(1)` (`read.c:3058–3059`).
3. `teleds` swallow `docrt` / vault_guard `uleftvault` / `invocation_message` / `notice_mon_*`. Live Open.
4. Next Open: `teleport.c` `tele()` / trap teledest. Not tele_trap wrenching.
5. Do not restore the skip of TT_BURIEDBALL unearth. Do not add a `u.utrap` conjunct. Do not `place_object` the unearthed ball (that is freedom). Do not pull Punished `drag_ball` into an unearth peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `teleds` now unearthes a `TT_BURIEDBALL` chain via real `buried_ball_to_punishment` (extract, `punish` reuse, `reset_utrap(FALSE)`) before Punished `ball_active`, while trapmove/`level_tele` callers stay named.
- Must-fix stays empty for this SHA; next port pops Open `teleport.c` `tele()` / trap teledest. Not tele_trap wrenching.
