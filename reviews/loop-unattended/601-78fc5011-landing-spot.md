# Review 601 — 78fc5011 — steed.c landing_spot KNOCKED preferred-dir + enexto (D-1640)

## Metadata
- Full / short hash: `78fc501104c3d4ecd8d876c487cea332fee33b77` / `78fc5011`
- Parent: `d5474f87` (D-1639). This file audits **this SHA only** (second of nine `js/` commits since review **599**). Archive **Addressed:** D-1640 `78fc5011`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 09:35:34 +0200
- D-id: **D-1640**
- Stats: `js/steed.js` +59/−21, `js/const.js` +3/−0. Band **150–350** (js/ insertions **62**).
- Claims to close: Open `landing_spot` KNOCKED preferred-dir after D-1639. Not DISMOUNT_THROWN HP (D-1627). Not uhitm `u.dx` setter. `reviews/loop-2026-08-15/` has no unpaid landing_spot Must-fix.
- JS / map: `steed.js` `landing_spot`; `const.js` `DIR_LEFT`/`DIR_RIGHT`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named after D-0213/D-1627.

## Intent vs deliverable

Git subject promises: DISMOUNT_KNOCKED prefers `u.dx,u.dy` then `rn2(2)` clockwise/counterclockwise before remaining dirs, with `throws_rocks` and `enexto` forceit.

Pinned C `steed.c` `landing_spot` `:459–572` (`node scripts/csym.mjs landing_spot`). `--callers landing_spot`: `:586` forceit 0; `:610` / `:621` forceit 1 (all inside `dismount_steed`). Callees `xytodir` `cmd.c:3846–3855`; `dirtocoord` `:3858–3865`; `hack.h` `DIR_LEFT`/`DIR_RIGHT` `:658–659`; `NODIAG` `:1414`; `throws_rocks` `mondata.h:134`; `enexto` `teleport.c:195–203`. uhitm `:5384–5391` is the **only** C site that sets `u.dx`/`u.dy` then `dismount_steed(DISMOUNT_KNOCKED)`.

```475:496:nethack-c/upstream/src/steed.c
    j = xytodir(u.dx, u.dy);
    if (reason == DISMOUNT_KNOCKED && j != DIR_ERR) {
        best_j = j;
        try[0].x = u.dx, try[0].y = u.dy;
        i = rn2(2);
        clockwise_j = DIR_RIGHT(j); /* (j + 1) % 8 */
        dirtocoord(&cc, clockwise_j);
        try[1 + i].x = cc.x, try[1 + i].y = cc.y; /* [1] or [2] */
        counterclk_j = DIR_LEFT(j); /* (j + 8 - 1) % 8 */
        dirtocoord(&cc, counterclk_j);
        try[2 - i].x = cc.x, try[2 - i].y = cc.y; /* [2] or [1] */
        n = 3;
        ...
    } else {
        best_j = clockwise_j = counterclk_j = -1;
    }
```

Old JS: eight `xdir`/`ydir` slots, `best_j=-1` always, skip `m_at` if `usteed`, boulder block without `throws_rocks`, `forceit` returned false (enexto deferred). The diff **does** C try[] fill, `rn2(2)` swap, remaining-dir skip of the trio, `j<3` break, `throws_rocks(you_data())`, `enexto`, C-home `DIR_LEFT`/`DIR_RIGHT`, `MON_AT` as any `m_at`. It **does not** port uhitm’s `u.dx`/`u.dy` setter. Named. JS still never calls `dismount_steed(DISMOUNT_KNOCKED)`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `landing_spot` | C `:459–572`, **LIVE this SHA** | was local; now exported; C `staticfn` |
| `xytodir` | C cmd.c `:3846–3855`, **LIVE** | const.js |
| `dirtocoord` | C cmd.c `:3858–3865`, **LIVE** | const.js |
| `DIR_LEFT` / `DIR_RIGHT` | C hack.h `:658–659`, **LIVE this SHA** | C-home; dothrow/spell still clone — do **not** add #2/#3 |
| `DIR_ERR` | C, **LIVE** | const.js `-1` |
| `rn2(2)` / `rn2(viable)` | C rng, **LIVE** | call-for-call with C `\|\|` |
| `throws_rocks` | C mondata.h `:134`, **LIVE this SHA** | import monsters.js |
| `enexto` | C teleport.c `:195–203`, **LIVE this SHA** | import teleport.js |
| `NODIAG` | C hack.h `:1414`, **CLONE** | `PM_GRID_BUG` + C’s `(j%1)!=0` (dead) |
| `accessible_cell` | C `accessible` `:2187–2194`, **CLONE** | no `SURFACE_AT`; pre-existing |
| `test_move_ok` | C `test_move`, **CLONE** | doorway subset; D-0219 |
| `you_data` | C `gy.youmonst.data`, **CLONE** | local stub if unset |
| `dismount_steed` callers | C `:586/:610/:621`, **LIVE** | forceit 0 then 1 unchanged |
| uhitm `u.dx` then KNOCKED | C `:5384–5391`, **OMIT named** | JS uhitm has no `dismount_steed` |

`node scripts/csym.mjs landing_spot` → `steed.c:459-572`. `--callers`: `:586/:610/:621`. `xytodir` → `cmd.c:3846-3855`. `dirtocoord` → `cmd.c:3858-3865`. `enexto` → `teleport.c:195-203`. `throws_rocks` → `mondata.h:134`. `--callers throws_rocks` includes `steed.c:548`. `NODIAG` → `hack.h:1414`. `accessible` → `monmove.c:2187-2194`.

RNG: KNOCKED `rn2(2)` once when `j!=DIR_ERR`; then `rn2(viable)` only when the better-`if` reaches the third arm (C `\|\|` short-circuit). BYCHOICE / DIR_ERR skip the first `rn2(2)`. **Match.** No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
landing_spot     js/steed.js:462   sync
DIR_LEFT         js/const.js:125   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/dothrow.js:1850  js/spell.js:1537
DIR_RIGHT        js/const.js:126   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/dothrow.js:1851
xytodir          js/const.js:130   sync
dirtocoord       js/const.js:142   sync
throws_rocks     js/monsters.js:553   sync
enexto           js/teleport.js:649   sync
you_data         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/steed.js:91
```

`--can steed.js teleport.js enexto` / `monsters.js throws_rocks` / `const.js DIR_LEFT`: ALREADY. Static, not TDZ. Do **not** stamp “cycle-forced clone.” Do **not** write `DIR_LEFT` #3.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Try fill. KNOCKED + valid dir: `try[0]=u.dx,u.dy`; `i=rn2(2)`; clockwise at `[1+i]`; counterclk at `[2-i]`; `n=3`. Else `best_j=clockwise_j=counterclk_j=-1`. Remaining `j=0..7` skip that trio; `dirtocoord` into `try[n++]`. JS `tryPos` same. **Match `:475–505`.** `DIR_LEFT`/`DIR_RIGHT` are `((dir)+7)%8` / `((dir)+1)%8`. **Match hack.h.** `xytodir` walks `xdir`/`ydir` else `DIR_ERR`. **Match.**

NODIAG. C `reason==DISMOUNT_POLY && NODIAG(u.umonnum) && (j%1)!=0`. `j%1` is always 0 in C int. JS `PM_GRID_BUG` + same `(j%1)!==0`. Dead skip, **ported as written.** Do not “fix” to `j%2`.

Pass start. BYCHOICE && !impair → 0; BYCHOICE&&impair **or** KNOCKED → 1; else 2. JS same. **Match `:522–525`.** `impaird` is `u.Stunned\|\|u.Confusion\|\|u.Fumbling` vs C `Stunned`/`Confusion`/`Fumbling` youprop macros (`HStun` / `HConfusion` / `H\|\|E Fumbling`). Pre-existing; KNOCKED starts at i==1 regardless. Not this SHA’s arm.

Inner accept. C `isok` / `u_at` / `accessible && !MON_AT && test_move(..., TEST_MOVE)`. JS splits the same three continues. Old JS skipped `m_at` when `mon===usteed`; C `MON_AT` does not. This SHA **matches C** (stricter). `accessible_cell` is ACCESSIBLE + closed/locked door, **not** C `SURFACE_AT` (drawbridge). Pre-existing clone. `test_move_ok` is doorway-diagonal subset (D-0219). Named.

Better / break. C `min_distance<0 \|\| ((best_j==-1)? distance<min : j<3) \|\| (distance==min && !rn2(viable))`, then trap/boulder, then `if (best_j!=-1 && j<3) break`. JS same expression, then same break. **Match `:534–562`.** `rn2(viable)` is not taken when `j<3` on the KNOCKED trio because the middle arm is true.

Boulder. C `i<=1 && sobj_at(BOULDER) && !throws_rocks(youmonst.data)`. Old JS omitted `throws_rocks` (giants still blocked). This SHA imports `throws_rocks`. **Match `:548–549`.** `you_data()` falls back to a humanoid stub if `youmonst.data` is unset — `throws_rocks` false. Named workaround, not a second function.

`enexto`. C `forceit && !found` then `enexto(spot, ux, uy, youmonst.data)` (`GP_CHECKSCARY` then `NO_MM_FLAGS` 0). JS `!!enexto(...)`. **Match `:569–571`.** Old SHA returned false. `dismount_steed` still `:722` forceit 0, `:743/:760` forceit 1. **Match callers.**

Callee closure (KNOCKED fill + pass + enexto). LIVE: `xytodir`, `dirtocoord`, `DIR_*`, `rn2`, `throws_rocks`, `enexto`, `isok`, `m_at`, `t_at`, `sobj_at`, `distu`. CLONE: `NODIAG` as written, `accessible_cell`, `test_move_ok`, `you_data`. OMIT named: uhitm setter; Punished/ustuck float_down; water/lava; `update_mon_extrinsics`. STUB: none **in this SHA’s new arms**. Pre-existing `test_move_ok` is a named subset, not a new stub glued into the fill. Combined-arm ships. Dispatch is not “ported, callee stubbed.”

C’s only KNOCKED **caller** is uhitm `:5391`. JS `uhitm.js` has no `dismount_steed`. Other JS callers use THROWN/BYCHOICE/POLY/GENERIC/FELL. The KNOCKED try[] is live in the function and dead at runtime until that caller. That is a **named omit**, not a C-wrong inside `landing_spot`.

## Hallucinations / overclaim

Subject try[] + `rn2(2)` + `throws_rocks` + `enexto`: **true in `landing_spot`.** D-log canary 15/15 + green + cohort: **claimed; this review does not re-run that canary.** Do **not** stamp “Match C uhitm `:5388–5391` sets `u.dx`/`u.dy` then `dismount_steed(DISMOUNT_KNOCKED)`.” Do **not** stamp “Match C `SURFACE_AT` accessible.” Do **not** stamp “Match C full `test_move`.” Do **not** stamp “Match C `NODIAG` actually skips diagonals” — C’s `(j%1)` never does. Public KNOCKED preferred-dir is **public-unhit** (no JS caller). Fortress BYCHOICE can still hit remaining-dir fill + forceit 0.

## Density

+62: C `:459–572` one function plus two macros. §2b one landing_spot family. Did not glue uhitm. Above a one-`if` peel.

## Verification

Wired: KNOCKED try[] order; `rn2(2)` swap; trio skip; `j<3` break; `throws_rocks`; `enexto`; BYCHOICE still no preferred `rn2(2)`; DIR_ERR. Unwired C: uhitm setter (no JS `DISMOUNT_KNOCKED` call); `SURFACE_AT`; full `test_move`. Conf: `rn2(2)` then maybe `rn2(viable)` — **Match C order.** No seed gate.

D-log canary **15**/15; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for the KNOCKED trio. Canary can inject reason/dx; fortress cannot.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): uhitm DISMOUNT_KNOCKED `u.dx`/`u.dy` then `dismount_steed`; `accessible` `SURFACE_AT`; full `test_move`; Punished/ustuck float_down; water/lava steed death; `update_mon_extrinsics`. Do not add `DIR_LEFT` #3. Do not “fix” `(j%1)` to `(j%2)`. Do not re-port DISMOUNT_THROWN HP (D-1627). Do not skip `throws_rocks` on pass 1.

Verdict: **ACCEPT-WITH-DEBT**
