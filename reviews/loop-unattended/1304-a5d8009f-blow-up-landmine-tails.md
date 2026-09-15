# Review 1304 — a5d8009f — trap.c blow_up_landmine + trapeffect_landmine tails (D-2338)

Metadata: SHA `a5d8009f`, D-2338, C-fidelity residual (queue row cited 0 blocks). Method: `git show` full `js/` hunk (`js/trap.js` +60/−26); C `blow_up_landmine trap.c:3171-3219` + `trapeffect_landmine :2527-2657` full bodies + C `fill_pit :4009-4020` (via `csym.mjs`); `sym.mjs` on all 7 joined names; JS `find_drawbridge`/`fill_pit` bodies read; `imports.mjs --can` (message claims ALREADY ×7 — all four edges re-checked live, all ALREADY) + `--rulecheck`; added-lines banned grep (0 hits); `hidden-proxy verify blow_up_landmine --base a5d8009f~1` re-run.

## Intent vs deliverable

Subject promises the drawbridge/fillholetyp-liquid/fill_pit/maybe_dunk tails in `blow_up_landmine` plus hero/monster `fill_pit` + unconscious-awaken in `trapeffect_landmine`. Diff delivers all of it; `spot_checks` + `keep_saddle_with_steedcorpse` named (neither exists in `js/` — verified by grep, comments only). Promise kept exactly.

## Inventory

- `blow_up_landmine`: pre-scatter `old_typ`, drawbridge arm, t_at re-read, water/air deltrap vs fillholetyp→morph→liquid_flow vs PIT/madeby_u/seetrap, fill_pit, maybe_dunk_boulders, recalc, `void old_typ`.
- `trapeffect_landmine`: hero `fill_pit(u.ux,u.uy)` post-dotrap; monster tx/ty capture + `fill_pit(tx,ty)` + unconscious arm.
- Import joins only (DRAWBRIDGE_DOWN, unconscious, fillholetyp/liquid_flow/maybe_dunk_boulders, drawbridge trio).

## C ↔ JS fidelity

`blow_up_landmine` vs `:3171-3219` in C order: scatter → del_engr → wake → door-break (pre-existing) → drawbridge (`DRAWBRIDGE_DOWN || is_drawbridge_wall>=0`, `{x,y}` + mutating `find_drawbridge` ≡ C `&dbx,&dby`, destroy) ✓ → re-read + oil-melt comment ✓ → deltrap vs `fillholetyp(x,y,FALSE)` + ROOM-gate + morph + `liquid_flow(x,y,typ,t,cansee?msg:null)` (4th arg re-read trap both sides) ✓ → PIT arm literals ✓ → fill_pit → maybe_dunk → recalc ✓. Callee closure all LIVE with correct asyncness (liquid_flow/maybe_dunk/destroy ASYNC-awaited; fillholetyp/fill_pit/find_drawbridge sync). JS `fill_pit` verified RNG-free like C (settle rides C's own `flooreffects`).

Monster tail vs `:2608-2655`: tx/ty at entry ✓, thitm/mintrap unchanged, `fill_pit(tx,ty)` + DEADMONSTER recheck (`(mhp|0)<=0` ≡ `mhp<1`) + `unconscious → multi=-1 / nomovemsg` in C position before return ✓. Hero `fill_pit(u.ux,u.uy)` after recursive dotrap ✓ (`:2604`).

Cited C monster tail (`trap.c:2636-2655`, via `csym.mjs trapeffect_landmine`):

```c
blow_up_landmine(trap);
/* explosion might have destroyed a drawbridge; don't
   dish out more damage if monster is already dead */
if (DEADMONSTER(mtmp)
    || thitm(0, mtmp, (struct obj *) 0, damage, FALSE)) {
    trapkilled = TRUE;
} else {
    /* monsters recursively fall into new pit */
    if (mintrap(mtmp, trflags | FORCETRAP) == Trap_Killed_Mon)
        trapkilled = TRUE;
}
/* a boulder may fill the new pit, crushing monster */
fill_pit(tx, ty); /* thitm may have already destroyed the trap */
if (DEADMONSTER(mtmp))
    trapkilled = TRUE;
if (unconscious()) {
    gm.multi = -1;
    gn.nomovemsg = "The explosion awakens you!";
}
return trapkilled ? Trap_Killed_Mon : mtmp->mtrapped
    ? Trap_Caught_Mon : Trap_Effect_Finished;
```

JS tail (`trap.js`, re-read post-commit) follows it statement-for-statement, including the `thitm may have already destroyed the trap` comment carried onto the `fill_pit` line and the `game.multi`/`game.nomovemsg` mapping of C's `gm`/`gn` (house convention) ✓. Hero sequence vs `:2594-2604` (`PIT`+`madeby_u=FALSE` pre-losehp comment arm pre-existing → `losehp` → `blow_up` → named keep_saddle → `newsym` → recursive `dotrap` → `fill_pit`) ✓ — the added line is last, exactly C's last.

`find_drawbridge` body re-read (`dbridge.js:178-193`): IS_DRAWBRIDGE direct-hit fast path, else `is_drawbridge_wall` direction + coordinate step (NORTH y++/SOUTH y−−/EAST x−−/WEST x++), bool return — the `{x,y}`-object + mutate convention matches C's `&dbx,&dby` out-param ✓. `destroy_drawbridge(db.x, db.y)` takes split coords like C's `(dbx, dby)` ✓.

Asyncness table (all from `sym.mjs`, all honored): ASYNC-awaited — `scatter` (pre-existing), `destroy_drawbridge`, `liquid_flow`, `maybe_dunk_boulders`; sync-called — `del_engr_at`/`wake_nearto`/`t_at`/`deltrap`/`fillholetyp`/`seetrap`/`fill_pit`/`recalc_block_point`/`unconscious`/`find_drawbridge`/`is_drawbridge_wall`. No missing await, no floating promise (unlike the sync-through pattern in review 1301, everything async here is awaited) ✓. `fill_pit` RNG-free both sides (C `:4009-4020` is a boulder-settle conditional; JS `:883-903` verified draw-free by grep) ✓.

## Hallucinations / overclaim

None. ALREADY ×7 re-verified live (all four edges pre-exist). "No new draws" true (added calls are RNG-free or C's own). "Module-local, no probe without new export" — accurate, and correctly not used as an excuse (verification rests on gates + C-order audit).

## Density

+60/−26, one 49-line C body + two tails of a 131-line sibling, one falsifier. Good.

## Verification

D-log tails PASS for both `--fn` (syntax/rule2/green 2/2/strict ×2/cohort 7/7). Re-measured:

```text
verify blow_up_landmine: baseline a5d8009f~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
