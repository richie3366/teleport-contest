# Review 694 — 9f6de017 — shk.c u_left_shop / wizard.c choose_stairs (D-1733)

## Metadata
- Full / short hash: `9f6de017f06769d2d5fd177a5723f3700283b173` / `9f6de017`
- Parent: `438c0380` (D-1732). This file audits **this SHA only** (eighth of nine `js/` commits since review **686**). Archive **Addressed:** D-1733 `9f6de017`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 11:28:47 +0200
- D-id: **D-1733**
- Stats: `js/shk.js` +50/−16; `js/wizard.js` +33/−1; `js/mklev.js` +10. Total `js/` insertions **93** <250. Band **150–350**.
- Claims to close: Open `choose_stairs` / `u_left_shop` leave verbalize after D-1717 / review **678** (`sx,sy` stayed 0; boundary returned before `rob_shop`). Not `remote_burglary`. `reviews/loop-2026-08-15/` has no unpaid shop-leave Must-fix.
- JS / map: `shk.js` `u_left_shop` / `call_kops`; `wizard.js` `choose_stairs`; `mklev.js` `stairway_find_type_dir`. `c-js-map/turns.md`.
- Prior: **678** named stair swarm + door verbalize.

## Intent vs deliverable

Git subject promises: unpaid shop-boundary warns then returns, and leave swarms Kops at the chosen stair, instead of skipping `rob_shop` and the stair swarm after D-1717.

`node scripts/csym.mjs u_left_shop` → `shk.c:578–625`. `--callers`: `hack.c:3634` `check_special_room`; `teleport.c:1329` heaven (newlev TRUE). `choose_stairs` `wizard.c:330–364`. `--callers`: `shk.c:540` `call_kops` TRUE; `wizard.c:385` STRAT_HEAL `m_id%2`. `stairway_find_type_dir` `stairs.c:88–96`. `--callers`: wizard.c four sites + `mon.c:3148`. `call_kops` `:509–564`. `rob_shop` `:685–719`.

```591:624:nethack-c/upstream/src/shk.c
    if (!*leavestring && (!levl[u.ux][u.uy].edge || levl[u.ux0][u.uy0].edge))
        return;
    ...
    if (!*leavestring && !muteshk(shkp)) {
        ... verbalize / Deaf pline ...
        return;
    }
    if (rob_shop(shkp)) {
        call_kops(shkp, (!newlev && levl[u.ux0][u.uy0].edge));
    }
```

Parent: empty unpaid arms (comment: do not `rob_shop` or the boundary `return` is skipped); `call_kops` `sx,sy=0` so `isok` skipped the stair swarm. The diff **does** port boundary verbalize-then-return, leave `rob_shop`+`call_kops`, export `stairway_find_type_dir`, and `choose_stairs` stair/ladder/branch/opposite with `builds_up`. It **does not** call `SetVoice`. Named. It **does not** add `teleport.c:1329` heaven `u_left_shop(u.ushops0, TRUE)`. Named. It **does not** wire STRAT_HEAL `choose_stairs`/`rloc`/`healmon`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `u_left_shop` | LIVE repaired | `:578–625` |
| `rob_shop` / `call_kops` | LIVE (C-home statics) | `sym` “LOCAL” = not exported; do **not** add #2 |
| `muteshk` | LIVE local | C-home `shk.js` |
| `verbalize` / `pline` / `Shknam` / `hero_deaf` | LIVE | SetVoice OMIT named |
| `choose_stairs` | LIVE new | packed `{sx,sy}` vs C two out-params |
| `stairway_find_type_dir` | LIVE new | `stairs.c:88–96` |
| `builds_up` | LIVE import | `hacklib.js` |
| `shop_keeper` / `inhishop` | LIVE | first-char `charCodeAt` |
| SetVoice | OMIT named | |
| heaven `teleport.c` caller | OMIT named | `js/teleport.js` no call |
| STRAT_HEAL `choose_stairs` | OMIT named | `tactics` still mavenge+return |

`node scripts/sym.mjs`:

```
u_left_shop      js/shk.js:284   ASYNC — await required
choose_stairs    js/wizard.js:199   sync
stairway_find_type_dir js/mklev.js:346   sync
rob_shop         NOT EXPORTED — 1 LOCAL  js/shk.js:403  (C static; not clone #2)
call_kops        NOT EXPORTED — 1 LOCAL  js/shk.js:357
muteshk          NOT EXPORTED — 1 LOCAL  js/shk.js:218
verbalize        js/display.js:4957   ASYNC — await required
builds_up        js/hacklib.js:46   sync
shop_keeper      js/shk.js:252   sync
```

`--can shk.js wizard.js choose_stairs`: ALREADY (this SHA added the edge). `wizard.js` already imported `inhishop` (`export function` `shk.js:702`); `choose_stairs` is `export function` — **hoisted, not a top-level TDZ read**. Cycle alone is not a blocker. `--can wizard.js mklev.js stairway_find_type_dir` / `hacklib.js builds_up`: ALREADY. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Early outs (`:591–599`).** C `!*leavestring && (!edge || edge0)` then `shop_keeper(*leavestring?*leavestring:*u.ushops0)`, `!inhishop`, `!billct && !debit`. JS `!leave && (!(loc?.edge) || loc0?.edge)`, `charCodeAt(0)`, same bill test. `hack.c:3633–3634` `if (*u.ushops0) u_left_shop(u.ushops_left, newlev)` matches `hack.js:1788–1789`. **Match.**

**Boundary vs leave (`:601–623`).** C `!*leavestring && !muteshk` → `!Deaf && !muteshk` verbalize (`"%s!  Please pay before leaving."` / `"Don't you leave without paying!"`, two spaces after `!`) else `pline("%s %s that you need to pay before leaving%s", Shknam, points out/makes it clear, ./!)` then **return** (no `rob_shop`). Mute-on-boundary **falls through** to `rob_shop`. Outright leave (`*leavestring`) skips the warn. JS `u_left_shop` `:300–320` same three-way; `hero_deaf()` is the D-1716 Deaf clone. **Match.** `SetVoice(shkp,0,80,0)` is OMIT named, not a stubbed `verbalize`.

**`call_kops` (`:509–564`, `:623`).** C `(!newlev && levl[u.ux0][u.uy0].edge)` as nearshop. JS `!newlev && !!loc0?.edge`. After nokops, C `coordxy sx=0,sy=0; choose_stairs(&sx,&sy,TRUE)`. JS `{sx:0,sy:0}` then `choose_stairs(stair, true)`. nearshop: “Kops appear!” + `makekops(u.ux,u.uy)` return. Else “Kops are after you!” + `isok(sx,sy)` stair swarm + shk swarm. **Match the live steal/leave arm.** Parent `isok(0,0)` skipped the stair. No RNG in `choose_stairs`.

```336:364:nethack-c/upstream/src/wizard.c
    boolean stdir = builds_up(&u.uz) ? dir : !dir;
    stway = stairway_find_type_dir(FALSE, stdir);
    if (!stway) {
        stway = stairway_find_type_dir(TRUE, stdir);
        if (!stway) {
            for (stway = gs.stairs; stway; stway = stway->next)
                if (stway->tolev.dnum != u.uz.dnum)
                    break;
            if (!stway) {
                stway = stairway_find_type_dir(FALSE, !stdir);
                if (!stway)
                    stway = stairway_find_type_dir(TRUE, !stdir);
            }
        }
    }
    if (stway)
        *sx = stway->sx, *sy = stway->sy;
```

**`choose_stairs` (`:330–364`).** JS `wizard.js:199–219` `!!dir` / `!dir`; `game.stairs` walk `break` on other `dnum`; write `coord.sx/sy`. Portal-only leaves 0. **Match branch order.** Packed `{sx,sy}` is JS packing of C’s two out-params, not a second clone. `builds_up` is LIVE `hacklib.js:46`.

**`stairway_find_type_dir` (`:88–96`).** C `while (tmp && !(isladder== && up==)) tmp=tmp->next`. JS first node with `!!isladder` and `!!up`. **Match** for 0/1 flags `stairway_add` stores.

**Callee closure (`u_left_shop` leave + `call_kops` stair).** LIVE: `shop_keeper`, `inhishop`, `muteshk`, `verbalize`, `pline`, `rob_shop`, `call_kops`, `choose_stairs`, `stairway_find_type_dir`, `builds_up`, `isok`, `makekops`. OMIT named: `SetVoice`; heaven caller; STRAT_HEAL. STUB in those live arms: **none**. Not “dispatch ported, callee stubbed.” Do **not** treat `rob_shop`/`call_kops` `sym` LOCAL as clone drift.

## Hallucinations / overclaim

Subject “boundary warns then returns” / “leave swarms Kops at the chosen stair”: **true**. D-log “SetVoice deferred”: **true**. Do **not** stamp “Match C `SetVoice` `:608`.” Do **not** stamp “Match C `teleport.c:1329` heaven `u_left_shop`.” Do **not** stamp “Match C STRAT_HEAL `choose_stairs`/`rloc`/`healmon`/`FALLTHROUGH` `:378–409`.” Do **not** stamp “Match C `remote_burglary`” (D-1717). Journal “fortress held” is not an unpaid door-edge proof. Public shop sessions are no-unpaid; this path is **public-unhit**. Admit that.

## Density

§2b: `u_left_shop` unpaid arms + the `call_kops` callee `choose_stairs` review **678** named. One cluster (shk already imported `inhishop` from wizard’s side). +93 in 80–400. Did not glue STRAT_HEAL rloc (would burn extra `rn2` if FALLTHROUGH were wrong). Did **not** reopen D-1717 `rob_shop`.

## Verification

D-log: save-oracle skip (untagged `shk.c:u_left_shop`); node `choose_stairs` dir/ladder/branch/opposite/portal/`builds_up` + boundary billct unchanged; green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Unpaid door-edge / Kop stair swarm **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (live leave/boundary/`choose_stairs` match C). Named: SetVoice; heaven `u_left_shop(u.ushops0, TRUE)` (`teleport.c:1326–1331`); STRAT_HEAL `choose_stairs`/`In_W_tower`/`rloc`/`mnearto`/`healmon`/`FALLTHROUGH` (`wizard.c:378–409`); `costly_gold`; `shopper_financial_report`. Do **not** add `rob_shop` #2 / `call_kops` #2 / `choose_stairs` #2. Do **not** call `rob_shop` from the unpaid **boundary** arm (C returns after the warn). Do **not** glue STRAT_HEAL FALLTHROUGH (C may `return 1` after `healmon`; a fall-through burns harass `rn2`). Do **not** treat `isok(0,0)` as a stair. Do **not** import `teleport.js`→`shk.js` without `--can`.

Verdict: **ACCEPT-WITH-DEBT**
