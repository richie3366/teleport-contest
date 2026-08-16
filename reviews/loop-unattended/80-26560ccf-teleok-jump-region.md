# Review 80 — 26560ccf — teleok `tele_jump_ok` / `in_out_region` (D-1119)

## Metadata
- Full / short hash: `26560ccf02c7473f75664cadfe0ef555600560a8` / `26560ccf`
- Parent: `8a01c200` (D-1118). This file audits **this SHA only**. Archive row **Addressed:** D-1119 `26560ccf` was filled by D-1120.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 00:30:25 +0200
- D-id: **D-1119**
- Stats: 11 files, +207 / −48 — `js/region.js` +94 / −5 (`in_out_region` + `hero_inside` bits + `make_gas_cloud` defaults); `js/teleport.js` +10 / −3 (`teleok` two predicates).
- Claims to close: Open queue `teleport.c` `teleok` `tele_jump_ok` / `in_out_region` (named). Not vibrating. Review **72** named those two as always-allow. `reviews/loop-2026-08-15/` has no open jump Must-fix.
- JS / map: `teleport.js` `teleok` / `tele_jump_ok`; `region.js` `in_out_region`. `c-js-map/turns.md` teleport + region. `enter_msg`/`leave_msg`, `update_player_regions` in `teleds`, `hack.c`/`dothrow.c` callers, geometric `is_hero_inside_gas_cloud` still named.
- Prior reviews this SHA claims to close: **72** named omit `tele_jump_ok` / `in_out_region`.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleok so hero teleport cannot jump across updest/dndest restricted regions and runs in_out_region.”

Old JS `teleok` returned after `goodpos` (D-1111 trapok already in). C `teleport.c:440–443` still requires `tele_jump_ok(u.ux,u.uy,x,y)` (cannot cross `dndest`/`updest` rectangles when `nlx>0`) and `in_out_region(x,y)` (can_enter/leave then `REG_HERO_INSIDE`). `safe_teleds` / vault / whistle dests could therefore land inside a restricted TELE region C would reject.

The diff **does** wire the existing `tele_jump_ok` (already used by `rloc_pos_ok`) and ports `in_out_region`’s three loops. Gas clouds stay `NO_CALLBACK` (−1) so they never reject. `make_gas_cloud` inits those fields and the `add_region` hero_inside bit. It does **not** port `enter_msg`/`leave_msg` pline, force-field `#if 0` callbacks, `update_player_regions` in `teleds`, or `hack.c:2867` / `dothrow.c` callers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleok` after `goodpos` | C body, **rewritten** | `teleport.c:438–444`; was return true |
| `tele_jump_ok` | C callee, **pre-existing** | `teleport.c:386–417`; now also gates `teleok` |
| `within_bounded_area` | C macro, **clone** | `dungeon.h:144–145`; `in1 !== in2` |
| `in_out_region` | C callee, **new** | `region.c:480–527` |
| `hero_inside` / set / clear | C macros, **clone** | `region.h` `REG_HERO_INSIDE=0x01` |
| `NO_CALLBACK` | C `#define`, **clone** | `region.c:13` (−1) |
| `callback_set` / `invoke_region_cb` | C `callbacks[]` index, **clone** | live C enter/leave always −1 |
| `make_gas_cloud` defaults | C `create_region`+`add_region`, **retouched** | can_* / enter / leave + hero bit |
| `enter_msg` / `leave_msg` | C pline, **named omit** | `create_msg_region` `#if 0`; gas has none |
| `update_player_regions` | C callee, **named omit** | `region.c:582–592`; `teleds:529` |
| `hack.c` `in_out_region` | C caller, **named omit** | `hack.c:2867` before `u.ux += dx` |
| `is_hero_inside_gas_cloud` | C bit test, **named omit** | JS still geometric `inside_region` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG** (predicates only; `tele_jump_ok` / `in_out_region` do not call `rn2`). Callers still sample `rnd`/`rn2` for dest search as before. `teleok` stays **sync** because enter_msg pline is deferred — C’s boolean return would otherwise force every `safe_teleds` loop through `nhgetch`.

## Constitution / playbook

Grep of the `js/teleport.js` + `js/region.js` hunks: no trace-index gates. `u.ux,u.uy` / dest `x,y` are live hero/candidate cells, not session coordinates. `REG_HERO_INSIDE` is the C flag, not a recorded bit. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### teleok order

C `teleport.c:420–445` after the D-1111 trapok block:

```
if (!goodpos(x, y, &gy.youmonst, 0))
    return FALSE;
if (!tele_jump_ok(u.ux, u.uy, x, y))
    return FALSE;
if (!in_out_region(x, y))
    return FALSE;
return TRUE;
```

JS `1040–1045`: `goodpos(you, 0)` then `tele_jump_ok(u.ux, u.uy, x, y)` then `in_out_region(x, y)`. Short-circuit: a failed jump does **not** mutate region bits. C same.

C `teleport.c:390–416` (dndest; updest is the same xor):

```
if (svd.dndest.nlx > 0) {
    if (within_bounded_area(x1,y1, nlx,nly,nhx,nhy)
        && !within_bounded_area(x2,y2, nlx,nly,nhx,nhy))
        return FALSE;
    if (!within_bounded_area(x1,y1, ...)
        && within_bounded_area(x2,y2, ...))
        return FALSE;
}
```

JS `in1 !== in2` is those two `if`s. `within_bounded_area` is `>=lx && <=hx && >=ly && <=hy` (`dungeon.h:144–145`). No RNG.

### tele_jump_ok — already the C function

C `teleport.c:386–417`: `!isok(x2,y2)` false; if `dndest.nlx > 0`, reject when `within(x1)` xor `within(x2)` on `(nlx,nly,nhx,nhy)`; same for `updest`. JS `815–835`: `in1 !== in2` on `game.dndest` / `game.updest` (filled by `mklev.js` levregion, same structs C keeps in `svd.dndest` / `svu.updest`). `within_bounded_area` is `>= lx && <= hx && >= ly && <= hy`. Match. This SHA does not rewrite that helper; wiring it into `teleok` is the C call `rloc_pos_ok` already made.

### in_out_region — three loops

C `region.c:480–527`:

1. Skip `attach_2_u`. If dest inside: need `!hero_inside && can_enter_f != NO_CALLBACK`; else need `hero_inside && can_leave_f != NO_CALLBACK`. If need, `callbacks[f_indx](reg,0)` must be true or return FALSE.
2. Leave: `hero_inside && !inside(dest)` → `clear_hero_inside`, `leave_msg` pline, `leave_f`.
3. Enter: `!hero_inside && inside(dest)` → `set_hero_inside`, `enter_msg` pline, `enter_f`.
4. Return TRUE.

JS `241–276`: same skip, same dest_in ternary, same leave/enter bit updates. `leave_msg`/`enter_msg` omitted (named). Live C `create_region` sets enter/leave/can_* to `NO_CALLBACK` (−1). Gas `make_gas_cloud` does not change those. `callbacks[]` is only `inside_gas_cloud` (0) and `expire_gas_cloud` (1). Force fields are `#if 0`. So loop 1 **never rejects** for gas. JS `invoke_region_cb` returns true for a non-function (integer index); that path is dead while fields stay −1. Match for the Open line: hero teleport cannot be rejected by gas, and **can** be rejected by a future/canary `can_enter_f` function the private tests used.

`make_gas_cloud` now sets can_*/enter/leave to −1 if null and sets/clears `REG_HERO_INSIDE` from `inside_region(u.ux,u.uy)` like C `add_region:334–337`. C `create_region:109–120` also defaults `attach_2_u=FALSE` and `clear_hero_inside` before `add_region` overwrites the bit. JS `cloud.attach_2_u = !!cloud.attach_2_u` keeps an explicit true if a canary set it; gas does not.

C loop 1 assigns `f_indx` **inside** the `!= NO_CALLBACK` test. JS `f_indx = (reg.can_enter_f ?? NO_CALLBACK)` then `callback_set`. `undefined` becomes −1. A numeric `0` would be a valid C `callbacks[0]` (`inside_gas_cloud`); JS would treat `0` as set and then `invoke_region_cb(0)` returns true (allow) because `0` is not a function. Live C never stores `0` in `can_enter_f`. Named as table-index clone, not a gas reject bug.

`rloc_pos_ok` already called `tele_jump_ok(mtmp.mx, mtmp.my, x, y)` when `mx != 0`. Hero `teleok` passing `u.ux,u.uy` is the same helper, different origin. Migrating `mx==0` restricted-arrival arms stay named on `rloc_pos_ok` and are not this Open line.

`safe_teleds` / `vault_tele` / whistle dest loops call `teleok` many times. Each **successful** jump+region probe can set/clear `REG_HERO_INSIDE` for gas even if that cell is later discarded. C `teleok` has that side effect; C `teleds` then `update_player_regions` from the **actual** `u.ux,u.uy`. JS probes match C; the teleds reset is named. Public gas damage still uses `inside_region(u.ux,u.uy)` so a stale bit is not a public FAIL.

`m_in_out_region` for monsters is pre-existing and was **not** rewritten into the C three-loop form this SHA. Hero `in_out_region` is the Open line. Monster gas membership still the older geometric add/remove. Named if a later peel ports force fields for mons.

Callers of `teleok` in this port: `safe_teleds` 40× `rnd(COLNO-1)`/`rn2(ROWNO)` then candy (`teleport.c:739–761`); `vault_tele` `somexyspace` (`:778`); wizard `^T` getpos (`:835`); `teledest` search (`:896`). All now inherit jump+region. `rloc` monsters still use `rloc_pos_ok` → `tele_jump_ok` from the monster’s `(mx,my)`, not hero `teleok`. `hack.c` walk still does not call `in_out_region` — a step into a force field (none in live C) would not reject. Named.

`game.dndest` / `game.updest` are the levregion structs (`mklev.js` copies `nlx,nly,nhx,nhy`). `nlx>0` is C’s “restricted rectangle exists” gate. A dest with `nlx==0` does not constrain jumps. Tut-1 D-1064 already fills those fields; this SHA reads them.

C `teleok` **does** mutate `hero_inside` for every probed cell (leave/enter bits) even when that cell is not chosen. JS matches C, including that quirk. C then `update_player_regions` from `teleds` after the real `u_on_newpos`. JS `teleds` still skips that (named). JS `is_hero_inside_gas_cloud` still walks geometry, not the bit, so a stale bit does not change public gas damage. Named, not a teleok C-wrong.

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `teleok` calls `tele_jump_ok` (real, already matching `teleport.c:386–417`) and `in_out_region` (new, matching `region.c:480–527` minus named msgs). Gas `NO_CALLBACK` never rejects — that is C, not a no-op disguised as a port.

## Hallucinations / overclaim

D-log / subject say jump across `updest`/`dndest` is rejected and `in_out_region` runs. Both predicates are in `teleok` after `goodpos`. They do **not** claim walking uses `in_out_region` (`hack.c:2867` still unwired) or that gas damage uses the bit. Stamping **Addressed:** D-1119 is fair for the Open `teleok` line. Hash `26560ccf` is on the archive row (filled by D-1120).

## Density

`teleok` caller plus the `in_out_region` callee it needs, plus the `make_gas_cloud` defaults so those fields exist. One C family. ~100 JS lines. Not “finish region.c” (force fields, `update_player_regions`, geometric gas bit left named).

## Verification

Journal: private canary **35**/35 (dndest/updest in↔out; `nlx=0`; trapok-before-jump; VS/PIT regression; gas NO_CALLBACK; can_enter/leave reject; `attach_2_u` skip; enter/leave bits; jump short-circuit); green+strict seed8000/0900; cohort **24**/24 including 0360/4500/0373/0367; path **public-unhit** on restricted dests (0360 still full match). Cadence fortress is not a TELE-region proof. This audit’s full `sessions` still **44**/44.

C read of `teleport.c:386–445`, `region.c:13` / `:109–120` / `:284–337` / `:480–527`, `dungeon.h:144–145`, `region.h` `REG_HERO_INSIDE`; JS `teleport.js:815–835` / `1025–1046`, `region.js:64–90` / `164–184` / `241–276`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| `goodpos` fail | false, no jump/region | **same** |
| inside dndest → outside | `tele_jump_ok` false | **same** |
| `nlx==0` dests | jump allows | **same** |
| gas dest | `in_out_region` true | **same** (NO_CALLBACK) |
| can_enter reject | false | **same** if callback is a function |
| always allow after goodpos | (old JS) | **gone** |
| walk into gas | `hack.c` `in_out_region` | **still unwired** (named) |
| teleds bits | `update_player_regions` | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. `teleok` matches `teleport.c:438–444`; `tele_jump_ok` matches `:386–417`; `in_out_region` matches `region.c:480–527` minus named msgs.

Named omits / do-nots (map / Open, not Must-fix):

1. `enter_msg` / `leave_msg` pline (`region.c:505–506` / `:519–520`). Live `create_msg_region` is `#if 0`.
2. `update_player_regions` after `u_on_newpos` (`teleport.c:526–529`). Next Open is `teleds` `fill_pit` at that same locus — do not skip the bit reset forever.
3. `hack.c:2867` / `dothrow.c` `in_out_region` callers. Walking still does not update bits.
4. `is_hero_inside_gas_cloud` still geometric (`region.c:1168–1176` uses the bit). Do not flip it to the bit without `update_player_regions`.
5. Do not restore always-allow after `goodpos`. Do not make `teleok` async for msgs. Do not pull `tele_trap` wrenching into this SHA — **Addressed:** D-1120 `acfb0167`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `teleok` now rejects updest/dndest jumps and runs `in_out_region` (gas never rejects; bits update) instead of returning after `goodpos`, while walk callers and `teleds` `update_player_regions` stay named.
- Must-fix stays empty for this SHA; next port popped Open `tele_trap` Antimagic wrenching. **Addressed:** D-1120 `acfb0167`. Not vault_tele.
