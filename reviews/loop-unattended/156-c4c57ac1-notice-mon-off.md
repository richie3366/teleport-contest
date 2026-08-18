# Review 156 — c4c57ac1 — do.c `goto_level` `notice_mon_off` (D-1194)

## Metadata
- Full / short hash: `c4c57ac1cdac8cc1a263dc29bf48109453ef9ec4` / `c4c57ac1`
- Parent: `2d2e68c7` (D-1193). This file audits **this SHA only**. Archive row **Addressed:** D-1194 `c4c57ac1` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 01:17:58 +0200
- D-id: **D-1194**
- Stats: 11 files, +134 / −60 — `js/do.js` +18 / −1; `js/hack.js` comment +3 / −1.
- Claims to close: Open queue `do.c` `goto_level` `notice_mon_off` (named from D-1142 / D-1191 / review **153**). Not `docrt`. `reviews/loop-2026-08-15/` has no unpaid notice wrap Must-fix.
- JS / map: `do.js` `goto_level`; callees `hack.js` `notice_mon_off` / `notice_mon_on` / `notice_all_mons` (D-1142). `c-js-map/turns.md`. `reset_glyphmap`, vision.c `:856` caller, newgame / mapping / wizcmds / save wraps, `spot_monsters` option wiring still named.
- Prior reviews this SHA claims to close: **153** “not `notice_mon_off`”; **154** named newgame wrap omit.

## Intent vs deliverable

Git subject promises: “Match C do.c goto_level so notice_mon_off wraps docrt and catch-up notice_all_mons(TRUE) runs after uz0.”

Old JS: `vision_reset(); await docrt();` then Valley / splev / quest plines; `assign_level` uz0 then `print_level_annotation`. No a11y block around the redraw, no catch-up after arrival text.

C `do.c:1837–1841` / `:1967–1974`: `vision_reset`; `reset_glyphmap(gm_levelchange)`; `notice_mon_off()`; `docrt()`; `flush_screen(-1)`; … arrival plines …; `assign_level(&u.uz0,&u.uz)`; optional INSURANCE save; `notice_mon_on()`; `notice_all_mons(TRUE)`; `print_level_annotation()`.

The diff **does** call existing `notice_mon_off` immediately before `docrt`, and `notice_mon_on` + `await notice_all_mons(true)` after uz0 before annotation. It does **not** pull `reset_glyphmap`, vision.c’s `notice_all_mons` from `vision_recalc`, newgame / mapping / wizcmds / save, or optlist `spot_monsters` → `a11y.mon_notices`. Named. Default `mon_notices` Off so public catch-up is a no-op.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goto_level` off before `docrt` | C site, **new** | `do.c:1839` |
| `goto_level` on + catch-up after uz0 | C site, **new** | `do.c:1971–1972` |
| `notice_mon_off` / `notice_mon_on` | C macros, **imported** | `flag.h:233–236`; JS D-1142 |
| `notice_all_mons(TRUE)` | C callee, **imported** | `hack.c:1744–1783`; JS D-1142 |
| `reset_glyphmap(gm_levelchange)` | C sibling, **named omit** | `do.c:1838` between reset and off |
| vision.c `notice_all_mons` | C caller, **named omit** | the thing off is meant to suppress inside `docrt` |
| newgame / mapping / wizcmds / save | C wraps, **named omit** | other off/on pairs |
| `spot_monsters` → `a11y.mon_notices` | C option, **named omit** | default Off |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. No new RNG on this path: `notice_all_mons` does not roll; `notice_mon` plines only when the option is On.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Off wrap vs `do.c:1836–1841`

C:

```
    vision_reset(); /* reset the blockages */
    reset_glyphmap(gm_levelchange);
    notice_mon_off(); /* not noticing monsters yet! */
    docrt(); /* does a full vision recalc */
    flush_screen(-1);
```

JS (`do.js:1697–1705`): `vision_reset(); notice_mon_off(); await docrt(); await flush_screen(-1);`. **Missing** `reset_glyphmap` between reset and off — named. Off therefore sits **earlier** than C (immediately after `vision_reset`) rather than after glyphmap rebuild. That is extra coverage of the JS window, not a skip of the claimed `docrt` wrap. C comment: `docrt` does a full vision recalc, which in C `vision.c` calls `notice_all_mons(TRUE)` unless blocked. JS `vision_recalc` still **omits** that caller (D-log / map). Until that site exists, `notice_mon_off` around `docrt` does not suppress a call that is not there. The **structure** matches `:1839`. The **suppressor purpose** is currently a no-op. Honest in D-1194; not “Match C vision.c”.

Macros (`flag.h:233–236`): `a11y.mon_notices_blocked++` / `--` with `impossible` + clamp at 0. JS (`hack.js:1741–1756`) increments / decrements / clamps; diagnostic pline named. Nested off (teleds already wraps) matches C nesting.

### Catch-up vs `do.c:1967–1974`

C after Tourist XP / livelog:

```
    assign_level(&u.uz0, &u.uz); /* reset u.uz0 */
#ifdef INSURANCE
    save_currentstate();
#endif
    notice_mon_on();
    notice_all_mons(TRUE);

    print_level_annotation();
```

JS (`do.js:1798–1811`): `assign_level` uz0; `notice_mon_on()`; `await notice_all_mons(true)`; `await print_level_annotation()`. INSURANCE save named. **Order matches** the non-INSURANCE path. Catch-up is **after** Valley / splev / quest / temperature / Tourist XP plines, which is the point of the off wrap: those messages must not be interleaved with “You see a foo” from a vision-recalc notice. JS arrival plines sit between off and on like C.

### Callee vs `hack.c:1744–1783`

Not a stub. D-1142 already ported: if `a11y.mon_notices && !mon_notices_blocked`, count `canspotmon` on `fmon`, `reset` clears `mspotted` on unspotted even when `cnt==0` then return; else qsort by `distu` and `notice_mon` each. JS `game.fmon` is an array (`for...of`); C is `nmon` linked list. Same walk. `notice_mon` uses `set_msg_xy` then `You see/notice`. Default `mon_notices: false` in `a11y_state()` — C optlist `spot_monsters` default Off. Public `notice_all_mons(TRUE)` **returns immediately**. That is C’s own early-out, not a fake catch-up.

`await` on `notice_all_mons` is the JS `--More--` adaptation; C `pline` inside `notice_mon` already blocks. Does not reorder RNG (none here).

JS `goto_level` window between off and on already contains C’s arrival envelope: `dfr_post_msg` / `deliver_splev_message` / Valley three-pline / quest / endgame Wizard / temperature / Tourist `more_experienced`. Off therefore covers the same messages C wants quiet. `teleds` already nested-offs around `vision_recalc` (pre-existing); a portal `goto_level` bumps the counter twice and on/on returns it to zero. C would nest the same way. Extra `notice_mon_on` while already zero clamps; C `impossible("mon_notices_blocked<0")` is named.

C `docrt` comment at `:1840` is “does a full vision recalc.” JS comment at `do.js:1710–1711` correctly refuses a **second** `vision_recalc` after `docrt` (Hallu display-RNG). Off wraps the one recalc that exists. Do not add another recalc to “make the wrap do something.”

D-1142 first loop: unspotted + `reset` clears `mspotted` **before** `if (!cnt) return`, so a catch-up with nobody visible still forgets stale spots. JS copies that. Second loop pushes only `canspotmon` then `arr.sort(notice_mons_cmp)` (`distu` subtraction). C `qsort` is not stable; JS `sort` is. Equal `distu` order can differ; default Off never runs it. Not Must-fix.

| Case | C | JS after |
|------|---|---------|
| off before docrt | `:1839` | **same** (no glyphmap) |
| on after uz0 | `:1971` | **same** |
| `notice_all_mons(TRUE)` | `:1972` | **same call** |
| `mon_notices` Off | callee return | **same** |
| `mon_notices` On | catch-up after arrival text | **same** (option unwired) |
| vision_recalc notices during docrt | blocked by off | **no such caller** (named) |
| newgame wrap | `allmain.c` | **named omit** |

## Constitution / playbook

No FORCE / getRngLog / seed-shaped “if uz.dlevel===N notice_on”. The wrap is the C sites around `docrt` / uz0. Rule #2: imports from `./hack.js` only. Do not add a second `vision_recalc` after `docrt` so notices have something to suppress. Frozen contracts untouched. Default Off is C’s optlist default, not a fortress cheat.

## Hallucinations / overclaim

D-log / CURRENT / subject say `notice_mon_off` wraps `docrt` and catch-up `notice_all_mons(TRUE)` runs after uz0. **Those two call sites are the hunk.** Stamping **Addressed:** D-1194 is fair. This is **not** “Match C dispatch, callee is a stub”: `notice_all_mons` / `notice_mon` are the D-1142 bodies. Do **not** stamp “Match C `reset_glyphmap`” or “Match C `vision_recalc` `notice_all_mons`” or “Match C `spot_monsters` On.” Say so: wrapping a redraw that does not yet call notices makes **off** currently redundant; **on + catch-up** is still the C pair and will fire when the option is On.

Default-off public catch-up is a no-op in **both** trees. Fortress PASS does not prove the wrap.

### Clone classification (this SHA)

- `goto_level` off/on/catch-up — C sites, new.
- `notice_mon_off` / `on` — C macros, imported.
- `notice_all_mons` — C callee imported, live (D-1142).
- No new clone. `reset_glyphmap` — named omit, not a fake function.

`notice_mon` hiders (`mundetected` / furniture / object appearance) are not “spot” (`hack.c:1711–1715`). JS copies that. Catch-up therefore will not announce a hiding mimic after `goto_level` even if `mon_notices` is On — C same. `DEADMONSTER` skip is `mhp < 1` in JS vs `DEADMONSTER` macro; equivalent for this walk.

## Density

One C pair: off before `docrt` + on/catch-up after uz0. ~18 lines of `do.js`. Thin versus §2b’s “50–300 lines” heuristic, but it is the whole queued Open row and the whole `goto_level` envelope for this family. Did not pull glyphmap / vision.c / newgame. Queue forbids gluing `makeknown` onto this SHA. Acceptable one-row peel after fortress PASS; waste would be splitting off and on across two iters. Cohort **41** is the shared `goto_level` set (green + wizard/quest/portal), not a second unrelated theory.

## Verification

Journal: private canary **29**/29 (C/JS source order; default-off no-op; nested block; extra on clamp; blocked wrap; catch-up after on; Detect_monsters; reset TRUE cnt0; DEADMONSTER; no `reset_glyphmap()` / no docrt port); green+strict seed8000/0900; cohort **41**/41 + strict 8000/0900/1500/1800/0700/0015/0002/0014/2200/4500/0367/0009/0012/0360/0004/0361. Public-unhit on `spot_monsters`. Cadence **#1520** **44**/44 does not turn the option on.

Grep of `git show c4c57ac1 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `do.c:1836–1841` / `:1967–1974`, `flag.h:229–236`, `hack.c:1708–1783`. JS SHA `do.js` wrap; existing `hack.js` callees.

`print_level_annotation` / `check_special_room` / `obj_delivery(TRUE)` stay **after** catch-up like C `:1974–1978`. Do not hoist pickup before `notice_all_mons`. `movebubbles` / `fumaroles` stay **before** `vision_reset` like C `:1830–1834` / JS `:1689–1695`.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `scrolltele`). Claimed wrap matches `:1839` + `:1971–1972`.

C-wrong / debt remaining (map / later peel, not new Must-fix prepends):

1. `vision_recalc` should call `notice_all_mons(TRUE)` like C `vision.c` so the off wrap actually suppresses mid-arrival notices. Until then off is structurally correct and behaviorally idle.
2. `reset_glyphmap(gm_levelchange)` between `vision_reset` and off (`do.c:1838`).
3. Wire optlist `spot_monsters` onto `a11y.mon_notices` (default stay Off).

Named omits / do-nots:

4. newgame / `seffect_magic_mapping` / wizcmds / save off/on. `monmove.c` `postmov` `notice_mon`. INSURANCE `save_currentstate`.
5. Do not revert D-1194. Do not FORCE notices for a public seed. Do not pull `reset_glyphmap` into a display shim. Do not skip the uz0-then-catch-up order. Do not call `notice_all_mons(false)` here (C is TRUE so unspotted `mspotted` clears).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `goto_level` now brackets `docrt` with C’s `notice_mon_off` / `notice_mon_on` + `notice_all_mons(TRUE)` after uz0; callees are live, default Off makes public catch-up a no-op, and JS `vision_recalc` still omits the caller off is meant to block.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1194 `c4c57ac1`. Next port in this window popped Open wand `makeknown`. Not glyphmap, not newgame.
