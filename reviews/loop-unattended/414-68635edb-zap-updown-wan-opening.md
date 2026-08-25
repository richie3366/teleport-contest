# Review 414 — 68635edb — zap.c zap_updown WAN_OPENING/SPE_KNOCK (D-1454)

## Metadata
- Full / short hash: `68635edb2e067edb415437bea1e80e8ee25683bc` / `68635edb`
- Parent: `291aea0a` (D-1453). This file audits **this SHA only** (fifth of nine `js/` commits since review **409**). Archive **Addressed:** D-1454 `68635edb` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 06:48:25 +0200
- D-id: **D-1454**
- Stats: 11 files, +173 / −29 — `js/zap.js` +86 / −8; `js/dbridge.js` +8 (`is_db_wall`).
- Claims to close: Open `zap.c` `zap_updown` WAN_OPENING/SPE_KNOCK (named from D-1453 / D-1444). Not probing. `reviews/loop-2026-08-15/` has no unpaid updown-opening Must-fix.
- JS / map: `zap.js` `zap_updown`; `dbridge.js` `is_db_wall` / `find_drawbridge` / `open_drawbridge`; `trap.js` openholding/openfalling (D-0981); `quest.js` `ok_to_quest`. `c-js-map/turns.md` + `debt.md`. STRIKING/LOCKING/STONE still named at this SHA.
- Prior reviews this SHA claims to close: **404** named remaining zap_updown otyps after probing; **410** named zap_updown OPENING on the knock-cast SHA; **413** D-log follow-up was this Open row.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_updown WAN_OPENING/SPE_KNOCK so an up/down opening wand or knock spell opens a portcullis, ripples locked quest stairs, or releases holding/falling traps instead of skipping zap_updown.”

C `weffects` `:3445–3446` `else if (u.dz) disclose = zap_updown(obj)`. `zap_updown` `:3263–3288`:

```
    case WAN_OPENING:
    case SPE_KNOCK:
        while (stway) {
            if (!stway->isladder && !stway->up
                && stway->tolev.dnum == u.uz.dnum)
                break;
            stway = stway->next;
        }
        if (is_db_wall(x, y) && find_drawbridge(&xx, &yy)) {
            open_drawbridge(xx, yy);
            disclose = TRUE;
        } else if (u.dz > 0 && stway && stway->sx == x && stway->sy == y
                   && on_level(&u.uz, &qstart_level) && !ok_to_quest()) {
            pline_The("stairs seem to ripple momentarily.");
            disclose = TRUE;
        }
        if (u.dz > 0 && u.utrap)
            (void) openholdingtrap(&gy.youmonst, &disclose);
        else if (u.dz > 0 && !u.utrap)
            (void) openfallingtrap(&gy.youmonst, FALSE, &disclose);
        break;
```

Then shared `:3382–3408` down `bhitpile`+`zap_map` / up hideunder top-object `bhito`. WAN_PROBING still early-returns `:3262`. STRIKING/LOCKING are later cases.

Old JS: probing early-return else `return false`. No epilogue.

The diff **does** add `is_db_wall`, the OPENING/KNOCK arm, and the shared down/up epilogue after a `break`. It **does** keep `default: return false` so STRIKING/LOCKING/STONE still skip the epilogue. Named. It **does not** port `close_drawbridge` / destroy / stone-to-flesh. It **does not** add `bhito` boxlock (up-hideunder `bhito` on knock still `res=0`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_updown` WAN_OPENING/SPE_KNOCK | C `:3263–3288`, **wired this SHA** | |
| `zap_updown` epilogue | C `:3382–3408`, **wired for this arm** | default still returns |
| `is_db_wall` | C `dbridge.c:169–173`, **C callee ported** | `typ == DBWALL` (12) |
| `find_drawbridge` | C `:179–205`, **imported live** | mutates `{x,y}` |
| `open_drawbridge` | C `dbridge.c`, **imported live** | crush/entity named on that helper |
| `openholdingtrap` / `openfallingtrap` | C `trap.c`, **imported live** (D-0981) | `*noticed` left intact |
| `ok_to_quest` | C `quest.c:140–144`, **imported live** | |
| `on_level_updown` | C `dungeon.c:1439–1443`, **clone matching C** | dnum+dlevel |
| `hideunder` | C `mon.c`, **imported live** | |
| `zap_updown` STRIKING/LOCKING/STONE | C later cases, **named omit** | JS default `return false` |
| `bhito` boxlock | C `:2393–2403`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** trap/drawbridge callees already had dice; this SHA reaches them from `u.dz`. Public fortress does not zap opening/knock up/down.

## C ↔ JS fidelity

Probing still early-returns TRUE with its own pile. Match `:3262`. OPENING `break`s into the epilogue; STRIKING still `return false` before it. That is the named omit, not a botched OPENING arm.

Stairs walk: `game.stairs` is the C `gs.stairs` linked list (`mklev.js` `stairway_add` prepends `.next`). Predicate `!isladder && !up && tolev.dnum == u.uz.dnum` then `sx/sy == hero` for the ripple. Match `:3265–3278`.

Portcullis: `is_db_wall` is `typ == DBWALL` (C `:172`, JS const 12). `find_drawbridge` matches C dir walk (N y++, S y--, E x--, W x++). `open_drawbridge` is a live terrain port (DRAWBRIDGE_UP → DOWN, wall → DOOR), not a stub. Crush/`set_entity` named on that helper. Disclose true. Match keep-path `:3272–3274`.

Quest ripple: `dz>0` && downstairs cell && `on_level(uz, qstart_level)` && `!ok_to_quest()` → “The stairs seem to ripple momentarily.” `on_level` clone is dnum+dlevel (`:1439–1443`). `ok_to_quest` is imported (got_quest/thanks + purity / killed_leader). **Callee is not a stub.**

Traps: `dz>0 && utrap` → `openholdingtrap`; else `dz>0 && !utrap` → `openfallingtrap(..., FALSE)`. C `*noticed` is set TRUE on hero notice, else **left intact**. JS `{noticed}` starts false on early return; zap_updown only ORs `if (hold.noticed) disclose = true`, so a prior portcullis disclose is not cleared. Match the pointer contract for this caller. Callees live D-0981.

Epilogue down: `bhitpile(obj, bhito, x, y, dz)` then `zap_map` (`map_zapped` stays false on this arm). Up: `uundetected && hides_under` then top `objects_at` (C `level.objects[ux][uy]` head) `bhito`; if hitit, `hideunder`. For SPE_KNOCK, `bhito` still default `res=0` (no boxlock), so hideunder rarely fires on a box. Named. `hideunder` is a real `mon.c` port.

Hallucination check: “Match C zap_updown OPENING” while **`is_db_wall` / `open_drawbridge` / trap callees are live** is **not** a dispatch-stub lie. “Match C `zap_updown` STRIKING destroy_drawbridge” **would** be at this SHA (later D-1456). “Match C `bhito` boxlock” **would** be.

## Hallucinations / overclaim

Subject says up/down opening/knock opens a portcullis, ripples locked quest stairs, or releases holding/falling traps. **True** on those three arms, then down pile/`zap_map`. SPE_KNOCK SPBOOK still skips `learnwand`. **False until named** for STRIKING/LOCKING/STONE, doorlock, steed OPENING `bhitm`, floor boxlock. Stamping **Addressed:** D-1454 for `:3263–3288` + this arm’s epilogue is fair. Do **not** stamp “Match C `close_drawbridge`.” Do **not** treat fortress PASS as an up/down knock.

## Density

One `zap_updown` case plus the one-line `is_db_wall` export and the shared epilogue that C runs after this `break`. ~80 lines of JS. Playbook §2b right size. Did not glue STRIKING (next named; later window SHA D-1456). Acceptable.

## Branch-by-branch confirm

1. Closed portcullis: `is_db_wall` + `find_drawbridge` + `open_drawbridge`; disclose. Match `:3272–3274`.
2. Down qstart downstairs `!ok_to_quest`: ripple pline; disclose. Match `:3275–3280`.
3. Down + `utrap`: `openholdingtrap`; noticed ORs disclose. Match `:3283–3284`.
4. Down + `!utrap`: `openfallingtrap(..., false)`. Match `:3286–3287`.
5. Down after: `bhitpile` + `zap_map`. Match `:3382–3389`.
6. Up hideunder: top object `bhito`; knock boxlock still `res=0`. Named.
7. Probing still early-return. Match D-1444.
8. STRIKING still default `return false`. Named at this SHA.
9. Up, not hiding: no-op disclose false. Match.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `on_level_updown` is a two-field clone, not a recorded coordinate.

## Verification

Journal: private canary **14**/14 (C/JS grep; Rule #2; down bear-trap release + learnwand; SPE_KNOCK SPBOOK skip makeknown; STRIKING still default; probing sibling D-1444; up no-op; quest ripple; closed portcullis `open_drawbridge`); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `01edf8b9`. Fortress PASS is not an up/down knock.

## Actionable C-wrongs

None for Must-fix on **this** SHA. OPENING arm + callees match C keep-path. `open_drawbridge` is not a stub.

Named omits (map / Open, not Must-fix):

1. `zap_updown` WAN_STRIKING/SPE_FORCE_BOLT (later D-1456 in this window)
2. `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK `close_drawbridge` (Open already)
3. `zap_updown` SPE_STONE_TO_FLESH (Open already)
4. `zap_steed` WAN_OPENING/SPE_KNOCK via `bhitm` (Open already)
5. `bhit` `doorlock` / `bhito` boxlock (Open already)
6. `open_drawbridge` crush/`set_entity` / `revive_nasty` (pre-existing on that helper)

Do not Must-fix “probing early-return is a stub” (D-1444 live). Do not Must-fix “STRIKING should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `weffects` IMMEDIATE `u.dz`. New reach into existing trap/drawbridge RNG. Public fortress does not hit this.

Verdict: **ACCEPT-WITH-DEBT**
