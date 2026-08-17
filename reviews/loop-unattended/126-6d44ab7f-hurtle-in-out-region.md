# Review 126 — 6d44ab7f — dothrow.c `hurtle_step` `in_out_region` (D-1165)

## Metadata
- Full / short hash: `6d44ab7fb17f62d9556226e168ea4a2c5bfae00e` / `6d44ab7f`
- Parent: `f9b4a465` (review **122–125** + cadence #1480). This file audits **this SHA only**. Archive row **Addressed:** D-1165 `6d44ab7f` was filled by D-1166.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 16:18:45 +0200
- D-id: **D-1165**
- Stats: 14 files, +125 / −52 — `js/dothrow.js` +11 / −5 (`hurtle_step` else-if + import + export); comments in `cmd.js` / `do.js` / `region.js` / `teleport.js`.
- Claims to close: Open queue `dothrow.c` `hurtle_step` `in_out_region` (named). Not walk. Review **118** named `dothrow.c:787`. Review **125** next-port was this wire. `reviews/loop-2026-08-15/` has no open hurtle-region Must-fix.
- JS / map: `dothrow.js` `hurtle_step`; callee `region.js` `in_out_region` (D-1143). `c-js-map/turns.md` `dothrow.c`. `do.c` `goto_level`, `mhurtle_step` `m_in_out_region`, `run_regions` `hero_inside` bit, Passes_walls / drag_ball / drown still named.
- Prior reviews this SHA claims to close: **118** named omit (`dothrow.c:787`); **125** next-port; D-1164 next-port after cadence #1480.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c hurtle_step so knocking the hero through a region updates REG_HERO_INSIDE, instead of leaving the bit stale until a later walk.”

Old JS `hurtle_step` after `isok` jumped to `*range==0` / occupy with no C `in_out_region(x,y)`. Walk already awaited the helper (D-1157); teleok probes (D-1119); teleds uses absolute `update_player_regions` (D-1130), not enter/leave. Knockback through a cloud therefore left `REG_HERO_INSIDE` at the pre-hurtle cell until the next `domove`.

The diff **does** await `in_out_region(x, y)` in C’s `else if` chain (`dothrow.c:784–790`): after `!isok` You_feel, before `*range==0`. False return does not occupy. It does **not** wire `do.c:1981` `goto_level`, `mhurtle_step` `m_in_out_region` (`dothrow.c:1000`), Passes_walls / `may_passwall`, drag_ball, drown, or flip `run_regions` hero `inside_f` off geometry. Named. Already in Open / map.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hurtle_step` `in_out_region(x,y)` | C caller, **new call** | `dothrow.c:787–788` |
| `in_out_region` | C callee, **imported** | D-1143; `region.c:480–527`; gas `NO_CALLBACK` never rejects |
| `isok` fail You_feel | C arm, **pre-existing** | `:784–786`; else-if so this arm **skips** the new call |
| `*range==0` | C arm, **reordered into else-if** | `:789–790`; previous step wants to stop; **after** membership |
| `hurtle()` loop | C `walk_path` caller, **untouched** | still a JS orthogonal/diagonal for-loop (D-1038); each cell hits `hurtle_step` |
| `mhurtle_step` `m_in_out_region` | C caller, **named omit** | `:1000`; Open |
| `goto_level` `in_out_region` | C caller, **named omit** | `do.c:1981`; next port in this window |
| Passes_walls / bad_rock / Sokoban / drown | C body, **named omit** | `:797+` |
| `run_regions` hero `inside_f` | C body, **named omit** | still `inside_region` geometry |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names in control flow / recorded coordinates. `x,y` are the live hurtle dest, not a traced cell. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none. Gas enter/leave are `NO_CALLBACK`; live `leave_msg`/`enter_msg` are NULL (`create_msg_region` `#if 0`). Path **public-unhit** on knockback through a live region (gas never rejects). A later bump (`m_at` / wall) still ran the helper — bit updates even when occupy is refused.

Grep of this SHA’s `js/` hunks: no `FORCE` (except pre-existing `FORCEBUNGLE` trap flag), `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not skip `in_out_region` on a successful hurtle cell. Do not call it on `!isok` (C else-if). Do not occupy after a false return. Do not treat dest-trap as a fresh `dotrap` (named). Do not pull `goto_level` / `mhurtle_step` into this peel.

## C ↔ JS fidelity

### Else-if vs `dothrow.c:784–790`

C:

```
if (!isok(x, y)) {
    You_feel("the spirits holding you back.");
    return FALSE;
} else if (!in_out_region(x, y)) {
    return FALSE;
} else if (*range == 0) {
    return FALSE; /* previous step wants to stop now */
}
```

JS after this SHA (`dothrow.js:1394–1401`): same three arms, `await in_out_region`, `rangeArg.n`. Old JS had a **separate** `if (range==0)` after the isok return, so a zero-range follow-up never updated membership. C’s else-if **does** update then return. The hunk restores that order. Match.

Hero is still at `u.ux,u.uy` when the helper runs (occupy is later, after wall/`m_at`). Same as walk D-1157 (`in_out_region(newx,newy)` before occupy). The helper compares dest `(x,y)` against current `REG_HERO_INSIDE` bits.

### Callee vs `region.c:480–527`

Three loops: can_enter/leave (may return FALSE), then leave (clear + `leave_msg` + `leave_f`), then enter (set + `enter_msg` + `enter_f`). `attach_2_u` skipped. Gas `can_enter_f`/`can_leave_f`/`enter_f`/`leave_f` are `NO_CALLBACK` — never reject, still set/clear the bit. JS is that function (D-1143). **Not a stub of the claimed membership update.**

`is_hero_inside_gas_cloud` already uses the bit (D-1157 / `region.c:1168–1176`). After this SHA, a hurtle into steam updates that helper without waiting for a walk. `run_regions` hero `inside_f` still uses `inside_region(u.ux,u.uy)` geometry (`region.js:670` vs C `:439–441` `hero_inside`). Named Open row, not this wire.

### Occupied vs rejected

| Case | C | JS after |
|------|---|---------|
| `!isok` | You_feel, no helper, no occupy | **same** |
| can_enter/leave false | no bit change, no occupy | **same** (vanilla never) |
| gas enter | set bit, never reject, then terrain/`m_at` | **same** |
| gas leave | clear bit | **same** |
| stay in / stay out | no bit change | **same** |
| `*range==0` | helper **then** false, no occupy | **same** |
| wall / `m_at` bump | helper already ran; return false | **same** |
| successful cell | helper then occupy `u.ux=x` | **same** |

C `walk_path` + jumping `I_SPECIAL` / `stopping_short` can actually hit `*range==0` on a follow-up cell. JS `hurtle()` is a `for (i < initialRange)` loop that decrements `rangeArg.n` after occupy, so physical knockback may never pass `n==0`. That is D-1038 / jumping named omit, not a miss of the else-if. When `n==0` is passed, membership updates. Match the claim.

Diagonal knockback still uses the JS for-loop (one diagonal step per `i`) rather than C Bresenham `walk_path` (`dothrow.c:1123–1126`). Pre-existing D-1038. This SHA does not invent a second path. Orthogonal knockback (the usual wand/explosion shove) is one cell along `sgn(dx),sgn(dy)` per iteration in both trees, so the new helper runs once per C step on that envelope.

### What the rest of `hurtle_step` still skips

After the three-arm gate, C `:792–971` sets `via_jumping` from `EWwalking & I_SPECIAL`, may `may_passwall`, bumps walls/bars/boulders with `rnd(2+*range)` `losehp`, wakes `m_at`, may `setmangry` / petrify, may `drag_ball`, occupies, `switch_terrain`, `check_special_room`, drown, pass-over `dotrap`, `nh_delay_output`. JS still has wall/boulder/`m_at` Ouch + occupy + `rangeArg.n--` (D-1038) and names the rest. The new call is **before** those arms, so a bump still updated membership — C same (`:787` then later `return FALSE` at the bump). Do not treat a named drown skip as a miss of this bit wire.

`hurtle_jump` (`dothrow.c:741–751`) wraps the same `hurtle_step` with `EWwalking |= I_SPECIAL`. JS jumping still named. Wrapping would still hit the new else-if.

### Callers of `hurtle_step`

C: `hurtle()` (`:1125` `walk_path`), `hurtle_jump()` (`:749`), and jumping/`check_jump` via `walk_path` in `apply.c`. JS: `hurtle()` for-loop in this file (`dothrow.js:1500–1509`). `mhurtle` uses `mhurtle_step`, not this function. The new import is only needed in `hurtle_step` itself; `cmd.js` / `teleport.js` comment edits do not add a second call site.

`in_out_region(` after this SHA: `cmd.js` walk, `teleport.js` `teleok`, `dothrow.js` `hurtle_step`. `goto_level` still missing until D-1166 (next SHA in this window). Repo grep of the helper matches C’s hero callers minus arrival.

## Hallucinations / overclaim

D-log / CURRENT / subject say knocking the hero through a region updates `REG_HERO_INSIDE` instead of leaving the bit stale until a later walk. **That is the hunk:** `else if (!(await in_out_region(x, y))) return false` after `isok`. Stamping **Addressed:** D-1165 is fair for the Open **hurtle** line. Hash `6d44ab7f` is on the archive row (filled by D-1166). Do **not** stamp it as “Match C `goto_level` `in_out_region`” or “`run_regions` now uses `hero_inside`” or “Match C `mhurtle_step` `m_in_out_region`.” This is **not** “Match C dispatch, callee is a stub”: `in_out_region` is the real D-1143 function; gas `NO_CALLBACK` never returns false, which is also C.

Exporting `hurtle_step` is JS-only (callers in this file already used it). Not a C miss.

## Density

One C call in an existing else-if. ~10 JS lines of behavior (comments extra). Thin vs §2b “one deferred `if`,” but the queue item is exactly that wire (not `goto_level`, not `mhurtle_step`). Callee already had the three-loop body. Not a second hypothesis. Not QUALITY-RISK for thinness under “do not combine items.”

Walk (D-1157), this hurtle wire, and `goto_level` (D-1166, next in this window) are the three C `in_out_region` **hero** callers. Splitting them is the queue rule, not an unrelated multi-subsystem commit. `teleok` already probed (D-1119); teleds uses the absolute sibling. The cluster is one callee family, one missing caller.

## Verification

Journal: private canary **41**/41 (empty occupy; enter/leave/stay-in/stay-out bits; can_enter/leave reject vs allow; gas `NO_CALLBACK`; `attach_2_u` skip; A→B; overlap; `range==0` still sets bit; isok fail skips callback; `m_at` bump still sets bit; no-dir / ustuck / utrap stay); green+strict seed8000/0900; cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002. Path **public-unhit** on hurtle through a live region.

C read of `dothrow.c:772–790`, `:1123–1126` (`hurtle` → `walk_path`), `:991–1000` (`mhurtle_step`), `region.c:480–527`, `hack.c:2866–2868`, `do.c:1980–1981`; JS SHA `hurtle_step` + import. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1485**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — the new await did not desync the fortress.

## Actionable C-wrongs

None that Must-fix this next iter. The Open dest call matches `dothrow.c:787–788`. `in_out_region` is the real C function.

Named omits / do-nots (map / Open, not Must-fix):

1. `do.c` `goto_level` `in_out_region` (`:1981`) — next port in this window (D-1166).
2. `mhurtle_step` `m_in_out_region` (`dothrow.c:1000`). Open.
3. Passes_walls / `may_passwall` / bad_rock squeeze / Sokoban diagonal / drag_ball / drown / jumping `I_SPECIAL` / petrify bump / `setmangry` / trap pass-over `dotrap`.
4. `run_regions` hero `inside_f` still geometry — Open `hero_inside` bit.
5. Do not restore the separate `if (range==0)` before the helper. Do not occupy on false. Do not call the helper on `!isok`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `hurtle_step` now awaits the real `in_out_region` after `isok` and before `*range==0`, so knockback updates `REG_HERO_INSIDE` even when the cell later bumps or wants to stop.
- Must-fix stays empty for this SHA; next port in this window popped Open `goto_level` `in_out_region`. Not `mhurtle_step`.
