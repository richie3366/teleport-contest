# Review 83 — 5a2f96ca — `rloc` Wizard stair / `control_mon_tele` (D-1122)

## Metadata
- Full / short hash: `5a2f96ca91a1bc33fb611963c151cadefa78c231` / `5a2f96ca`
- Parent: `803a7f5c` (D-1121). This file audits **this SHA only**. Archive row **Addressed:** D-1122 `5a2f96ca` was filled by D-1123.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 01:17:52 +0200
- D-id: **D-1122**
- Stats: 11 files, +260 / −76 — `js/teleport.js` +168 / −53 (`stairway_find_forwiz`, `control_mon_tele`, `rloc` restructure); `js/dungeon.js` +28 (`On_W_tower_level` / `In_W_tower`).
- Claims to close: Open queue `teleport.c` `rloc` Wizard stair / `mon_telecontrol` (named). Not RLOC_MSG. Review **81** / D-1121 next-port. `reviews/loop-2026-08-15/` has no open Wizard-rloc Must-fix.
- JS / map: `teleport.js` `rloc` / `control_mon_tele`; `dungeon.js` `In_W_tower`. `c-js-map/turns.md` teleport. steed→`tele()`, `mnexto` telecontrol, RLOC_MSG vanish text, `RLOC_ERR` `impossible()` still named.
- Prior reviews this SHA claims to close: none as Must-fix. Named Open after D-1121.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc so the Wizard of Yendor prefers stairs/ladders and wizard-mode mon_telecontrol before the 50-try random search.”

Old JS `rloc` skipped those two arms (`// Wizard / mon_telecontrol arms deferred`) and always burned 50× `rnd(COLNO-1)` + `rn2(ROWNO)` then the unshuffled candy shuffle. C `teleport.c:1813–1841` on an **on-map** Wizard (`mtmp->iswiz && mtmp->mx`) picks a stair/ladder via `goodpos` (not `rloc_pos_ok` — onscary / tele-jump ignored), `goto found_xy` on success, else wizard-mode `control_mon_tele`, else the 50-try.

The diff **does** that order and ports `stairway_find_forwiz`, `In_W_tower` / `On_W_tower_level`, and `control_mon_tele` (`getpos` + `rloc_pos_ok` / force `y_n`). Default `iflags.mon_telecontrol` Off: public paths still hit the 50-try unless the Wizard stair `goodpos` succeeds. It does **not** port steed→`tele()`, `mnexto`’s `control_mon_tele` caller, or RLOC_MSG. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc` Wizard / telecontrol | C body, **rewritten** | `teleport.c:1813–1841`; then existing 50× + candy |
| `stairway_find_forwiz` | C static, **new** | `teleport.c:1786–1794`; first matching `stairs` node |
| `control_mon_tele` | C function, **new** | `teleport.c:1898–1934`; export |
| `On_W_tower_level` | C function, **new** | `dungeon.c:1914–1918`; wiz1/2/3 specials |
| `In_W_tower` | C function, **new** | `dungeon.c:1923–1937`; `dndest` exclusion rect |
| `goodpos(..., 0)` | C callee, **imported** | Wizard stair; `NO_MM_FLAGS` |
| `rloc_pos_ok` | C callee, **imported** | 50-try, candy, telecontrol `via_rloc` |
| `getpos` | C callee, **imported** | `getpos.js`; not a stub |
| `yn_function` | C callee, **imported** | force `y_n` |
| `noit_mon_nam` | C callee, **imported** | `do_name.js` |
| `rnd` / `rn2` 50-try + candy shuffle | C RNG, **unchanged** | only when `!found` |
| steed `tele()` | C arm, **named omit** | JS still `return false` |
| `mnexto` `control_mon_tele` | C caller, **named omit** | `mon.js` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `<mon.mx,mon.my>` in the wizard prompt is the **live** monster cell (C uses `mon->mx` even on the force question — origin, not the picked dest). Rule #2 clean. Frozen contracts untouched.

**RNG:** Wizard stair success **skips** 50× `rnd`/`rn2` and the candy `rn2` shuffles (C `goto found_xy`). Telecontrol default Off: no `getpos`. Public-unhit on live Wizard rloc, so the fortress does not prove the skip.

## Constitution / playbook

Grep of the `js/teleport.js` + `js/dungeon.js` hunks: no trace-index gates. Stair `sx`/`sy` come from `game.stairs`, not session traces. Contest Rule #2: dynamic `import('./getpos.js')` is ESM, not `fs`. `control_mon_tele` uses `getpos` → `nhgetch`; that is C’s wizard-mode input, gated Off for public play. Do not hardcode a Wizard stair cell.

## C ↔ JS fidelity

### Wizard stair preference

C `teleport.c:1813–1831`:

```
if (mtmp->iswiz && mtmp->mx) {
    if (!In_W_tower(u.ux, u.uy, &u.uz))
        stway = stairway_find_forwiz(FALSE, TRUE);      /* up stair */
    else if (!stairway_find_forwiz(TRUE, FALSE))        /* no down ladder */
        stway = stairway_find_forwiz(TRUE, TRUE);       /* up ladder */
    else
        stway = stairway_find_forwiz(TRUE, FALSE);      /* down ladder */
    x = stway ? stway->sx : 0;
    y = stway ? stway->sy : 0;
    if (goodpos(x, y, mtmp, NO_MM_FLAGS))
        goto found_xy;
}
```

JS `1037–1049`: `iswiz && (mx|0)`; `In_W_tower(u.ux, u.uy, u.uz)`; same three `stairway_find_forwiz` arms; `goodpos(x, y, mtmp, 0)`. `NO_MM_FLAGS` is 0. Match. Hero-on-stair / occupied stair: `goodpos` fails, fall through — C same.

`stairway_find_forwiz`: walk `game.stairs` for `isladder`/`up`/`tolev.dnum == u.uz.dnum`. C `teleport.c:1786–1794` is that loop. First match. Match.

Success **skips** `control_mon_tele` (C `goto found_xy`). JS `if (!found && iflags.mon_telecontrol …)`. Match.

### `In_W_tower`

C `dungeon.c:1914–1937`: `On_W_tower_level` = wiz1|wiz2|wiz3; then `svd.dndest.nlx` else `impossible` + FALSE; then `within_bounded_area` on `dndest` nl/nh.

JS `On_W_tower_level`: `game.wiz1_level` / `wiz2` / `wiz3` via `on_level` dnum+dlevel. `In_W_tower`: `game.dndest`; `nlx==0` → FALSE (named skip of `impossible()`); inclusive `>= nlx && <= nhx` ≡ `dungeon.h:144–145` `within_bounded_area`. C asserts `updest` exclusion equals `dndest` and tests `dndest`. JS tests `dndest` only. Match on the tested rect. `game.dndest` is the current-level dest (mklev / savelev), the same object C keeps in `svd.dndest`.

### `control_mon_tele`

C `teleport.c:1898–1934`:

1. If `!isok(cc)`: default to `mon->mx,my`, else `u.ux,uy`.
2. `if (!wizard || !iflags.mon_telecontrol) return FALSE;`
3. `pline` + `getpos(cc, FALSE, "where to teleport %s")`.
4. If `getpos >= 0 && !u_at`: `via_rloc ? rloc_pos_ok : goodpos`; else force `y_n` unless `debug_fuzzer`; C’s force string uses **`mon->mx, mon->my`** (origin), not the picked cell.
5. Else `pline("Picking random destination.")` and FALSE.

JS `988–1017`: same defaulting; `wizard = flags.debug || flags.wizard` (`flag.h:29–30` `#define wizard flags.debug`; `flags.wizard` is the pre-existing JS superset, playmode:debug writes `flags.debug`); `getpos(cc_p, false, tcbuf)`; `LOOK_TRADITIONAL` is 0 so `'.'` confirm is `>= 0`; space/CR `!force` returns 0 with `x=-1` (C getpos “Done.”) then `rloc_pos_ok` fails into force/`Picking random`. `via_rloc` TRUE from `rloc` → `rloc_pos_ok`. Match. `mnexto` would pass FALSE and `goodpos(..., rlocflags)` — named omit of that caller.

`rloc` only **calls** `control_mon_tele` when `iflags.mon_telecontrol && mx`. C same. Default Off: the function is never entered on public sessions. Not a dispatch-to-stub: `getpos` is the real cursor loop.

### 50-try + candy

After `!found`, JS keeps C’s 50× `rnd(COLNO-1)` / `rn2(ROWNO)` / `rloc_pos_ok`, then `CC_INCL_CENTER|CC_UNSHUFFLED|CC_SKIP_MONS` (+ `CC_SKIP_INACCS` if `!passes_walls`), Fisher–Yates `rn2(candycount-i)`, `goodpos` backup, then one `rloc_to_with_msg`. The `found` flag is a JS rewrite of C `goto found_xy`; it does not insert extra RNG. `RLOC_ERR` `impossible()` still named (`return false` when no backup).

Steed: C `tele(); return TRUE`. JS `return false` with comment. Named. Different observable if a steed is `rloc`’d.

Candy RNG when the 50-try fails: C `teleport.c:1861–1890` `rn2(candycount-i)` swap then `rloc_pos_ok`, else `goodpos` backup, else FALSE. JS `1071–1102` is that loop with a `found` flag instead of `goto`. `COLNO=80` / `ROWNO=21` match `const.js`. No extra `rnd` was inserted in front of the Wizard arm. Arriving Wizard (`mx==0`) skips both stair and telecontrol and **does** burn the 50-try — C same (`mtmp->mx` is 0).

### Callers of `rloc`

C `rloc` is ordinary monster teleport: `mon.c` nature-teleport, `mhitu`/`mhitm` wand, `monmove` Tengu, `dig` shopkick, `mklev` displacement, `u_teleport_mon`. JS already `await rloc` on those combat/move paths. `mklev.js` still fires `rloc` without await (level-gen; `rloc_to` worm path is sync until ustuck). Wizard stair only runs when `mtmp.iswiz && mx` — public sessions never spawn a live Wizard `rloc`, which is why the 50-try RNG prefix is unchanged on the fortress. Guard: C `if (mtmp->iswiz && mtmp->mx)` then `goodpos`; JS same. `control_mon_tele` is additionally gated `!wizard || !iflags.mon_telecontrol` inside the function (C `:1913–1914`).

## Hallucinations / overclaim

D-log / subject say the Wizard prefers stairs/ladders and wizard-mode `mon_telecontrol` **before** the 50-try. That is the hunk: `goodpos` stair, then gated `control_mon_tele`, then the existing random search. They name steed/`mnexto`/RLOC_MSG. Stamping **Addressed:** D-1122 is fair. Hash `5a2f96ca` is on the archive row (filled by D-1123). This is **not** “Match C dispatch, callee is a stub”: `goodpos`, `getpos`, and `rloc_to_with_msg` are real. Do not read it as “every `rloc` now lands on stairs” — only on-map `iswiz` after `goodpos`.

## Density

One C function plus its two callees (`stairway_find_forwiz`, `control_mon_tele`) and the dungeon predicate `rloc` already called. ~196 JS lines. §2b cluster, not “finish teleport.c”. Worm/`docrt` left named (next SHA).

## Verification

Journal: private canary **33**/33 (stair dest; no rnd; arriving `mx==0`; occupied/hero-on-stair; dnum; outside vs `In_W_tower` ladder; `control_mon_tele` gates); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0360/4500/0373/0367; path **public-unhit** on live Wizard rloc. Cadence fortress is not a Wizard-stair proof. This audit’s full `sessions` (cadence **#1430**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `teleport.c:1786–1934`, `dungeon.c:1914–1937`, `dungeon.h:144–145`, `flag.h:29–30`; JS `teleport.js:965–1107`, `dungeon.js:586–612`, `getpos.js:1021–1168`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| on-map Wizard, up-stair `goodpos` | `goto found_xy`; no 50-try | **same** |
| in tower, down ladder exists | down ladder | **same** |
| tower bottom (no down ladder) | up ladder | **same** |
| arriving Wizard `mx==0` | skip stair + telecontrol | **same** |
| `mon_telecontrol` Off | skip getpos | **same** |
| telecontrol + valid dest | that cell | **same** (wizard-mode) |
| steed | `tele()` | **named `return false`** |
| ordinary mon | 50-try then candy | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. Stair arms match `teleport.c:1816–1831`; telecontrol matches `:1836–1841` / `:1898–1934` minus named `mnexto`.

Named omits / do-nots (map / Open, not Must-fix):

1. steed `rloc` → `tele()` (`teleport.c:1808–1810`). JS still fails closed.
2. `mnexto` `control_mon_tele(..., FALSE)` (`mon.c`; `via_rloc` false → `goodpos` + rlocflags).
3. OPTIONS=`montelecontrol` doset page (iflags may be set directly).
4. `RLOC_ERR` `impossible()` when no backup (`teleport.c:1886–1887`).
5. Do not restore the 50-try-first skip of Wizard stairs. Do not `rloc_pos_ok` the stair (C uses `goodpos`). Do not pull `rloc_to` worm/`docrt` into this SHA — **Addressed:** D-1123 `a55c4b24`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: on-map Wizard `rloc` now prefers C’s stair/ladder via `goodpos` (and wizard-mode `control_mon_tele` when that option is on) before the 50-try, instead of always burning `rnd`/`rn2` first, while steed `tele()` and `mnexto` telecontrol stay named.
- Must-fix stays empty for this SHA; next port popped Open `rloc_to` worm / ustuck-swallow `docrt`. **Addressed:** D-1123 `a55c4b24`. Not newsym.
