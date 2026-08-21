# Review 312 — d3f2a9e5 — dokick.c kickdmg martial knockback (D-1350)

## Metadata
- Full / short hash: `d3f2a9e5c53594dce759ec9f79a6a5e4cb460154` / `d3f2a9e5`
- Parent: `df69cf2e` (reviews **308–311** + cadence **#1710**). This file audits **this SHA only** (the only `js/` commit since `reviews/loop-unattended/311-533e732f-kickdmg-abuse-dog.md`). Archive **Addressed:** D-1350 lacked the short hash; this review commit fills `d3f2a9e5`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 09:20:03 +0200
- D-id: **D-1350**
- Stats: 9 files, +128 / −35 — `js/dokick.js` +46 / −12 (imports + `trapkilled` + the `:96–113` block).
- Claims to close: Open `dokick.c` martial knockback (named from D-1332 / reviews **294** / **311**). Not `abuse_dog`. `reviews/loop-2026-08-15/` has no unpaid knockback Must-fix.
- JS / map: `dokick.js` `kickdmg`; callees `teleport.js` `goodpos`, `region.js` `m_in_out_region`, `trap.js` `mintrap`, `monmove.js` `set_apparxy`; occupancy clone of `rm.h` `remove_monster` / `steed.c` `place_monster` (D-1231); `c-js-map/turns.md`. `wake_nearby` / `u_wipe_engr` still named.
- Prior reviews this SHA claims to close: **311** named knockback as the next Open after the tame block; **294** named it after `special_dmgval`; **298** named it after evade.

## Intent vs deliverable

Git subject promises: “Match C dokick.c kickdmg so a martial kick actually knocks a small mobile monster back (goodpos/region/mintrap), instead of skipping the reel.”

C `kickdmg` (`dokick.c:34–123`); knockback after HP subtract, **before** `passive` (`:96–113`):

```
    if (!DEADMONSTER(mon) && martial() && !bigmonst(mon->data) && !rn2(3)
        && mon->mcanmove && mon != u.ustuck && !mon->mtrapped) {
        mdx = mon->mx + u.dx;
        mdy = mon->my + u.dy;
        /* TODO: replace with mhurtle? */
        if (goodpos(mdx, mdy, mon, 0)) {
            pline("%s reels from the blow.", Monnam(mon));
            if (m_in_out_region(mon, mdx, mdy)) {
                remove_monster(mon->mx, mon->my);
                newsym(mon->mx, mon->my);
                place_monster(mon, mdx, mdy);
                newsym(mon->mx, mon->my);
                set_apparxy(mon);
                if (mintrap(mon, NO_TRAP_FLAGS) == Trap_Killed_Mon)
                    trapkilled = TRUE;
            }
        }
    }
```

Then `passive(..., !DEADMONSTER(mon), AT_KICK, FALSE)`; `killed` only if `DEADMONSTER && !trapkilled`; `use_skill` last.

Old JS: comment-only stub after HP. Tame `abuse_dog` already D-1349. C `martial()` macro and DEX `rn2` already live in this function.

The diff **does** wire that `if` call-for-call (alive / `martial` / `!bigmonst` / `!rn2(3)` / `mcanmove` / `!ustuck` / `!mtrapped`, `goodpos(...,0)`, reels, region, remove/place, `set_apparxy`, `mintrap` `Trap_Killed_Mon` skips `killed`). It does **not** call `mhurtle` (C TODO). It does **not** port `dokick()` `wake_nearby` `:1383`. Named. No other `js/` files.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `kickdmg` knockback `if` | C `:96–113`, **wired** | after HP, before `passive` |
| `trapkilled` | C `:39` / `:110–111` / `:117–118`, **wired** | skips later `killed` |
| `martial()` | C `dokick.c:8–10` macro, **pre-existing clone** | `martial_bonus` / Sasquatch / kicking boots |
| `martial_bonus` | C `skills.h:81`, **imported live** | Samurai / Monk |
| `bigmonst` | C `mondata.h`, **imported live** | `msize >= MZ_LARGE` |
| `goodpos(..., 0)` | C `teleport.c:85–548`, **imported live** | gpflags=0; not a stub |
| `m_in_out_region` | C `region.c:533–576`, **imported live** | D-1176 |
| `remove_monster` / `place_monster` | C `rm.h:534` / `steed.c:898–932`, **inline clone** | `MON_OFFMAP` then `mx/my`+`MON_FLOOR` (D-1231); not a no-op |
| `newsym` | C display, **imported live** | `display.js` |
| `set_apparxy` | C `monmove.c:2198–2266`, **imported live** | extra `rn2` only when notseen/notthere |
| `mintrap` / `NO_TRAP_FLAGS` / `Trap_Killed_Mon` | C `trap.c` / `trap.h:101`, **imported live** | dart/pit/hole/fire envelope; other types **named inside callee** |
| `passive` / `killed` / `use_skill` | C `:116–122`, **pre-existing live** | 4th arg still `mhp>0` ≡ `!DEADMONSTER` |
| `wake_nearby` / `u_wipe_engr` | C `dokick.c:1383–1384`, **named omit** | caller `dokick()`, not this `if` |
| `mhurtle` | C TODO at `:101`, **not ported** | C does not call it either |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `NO_TRAP_FLAGS` is a C trap flag, not an ALIGN/FORCE gate. Rule #2 clean. **New gameplay RNG:** `!rn2(3)` only after `martial && !bigmonst`; then callee `goodpos` may `rn2(13)` on `S_EEL`; `set_apparxy` may `rn2(3)`/`rn2(4)` plus search `rn2`s when notseen/Displaced; `mintrap` may `rn2(4)` already-seen skip. DEX `rn2` / damage `rnd` unchanged and still **before** knockback.

## C ↔ JS fidelity

Short-circuit matches `:96–97` left-to-right: `mhp>0` (`DEADMONSTER` is `mhp<1`) → `martial()` → `!bigmonst` → **`!rn2(3)`** → `mcanmove` → `mon !== ustuck` → `!mtrapped`. A frozen, stuck, or trapped **small martial** target still consumes `rn2(3)` then skips the body. A Tourist without kicking boots never rolls it. A dragon (`bigmonst`) never rolls it. Match.

Dest is `mx+u.dx`, `my+u.dy`. `dokick` already rejects `!dx && !dy`, so dest is not the monster’s own cell. `goodpos(mdx,mdy,mon,0)` is the real function: `isok`, reject `u_at` unless youmonst/swallowed/steed, occupied `m_at` (worm `wormno` cannot land on itself), `is_pool`/`is_lava` not typ macros, `passes_walls`/`amorphous` early-outs, `accessible`, boulder. gpflags=0 so no `GP_ALLOW_U` / `GP_AVOID_MONPOS` / `GP_CHECKSCARY`. Match `:102`. Reels pline **before** `m_in_out_region`, so a region reject still prints the reel. Match `:103–104`.

Occupancy clone: C `remove_monster` zeros `level.monsters[old]` and leaves `mx/my`; `place_monster` sets `mx/my`, grid, `mstate=MON_FLOOR`. JS has no grid for heads; `m_at` walks `fmon` and skips `MON_OFFMAP` (D-1231). Sequence: `MON_OFFMAP` → `newsym(old)` → `mx/my=dest` → `mstate=MON_FLOOR` → `newsym(new)`. Between OFFMAP and the coord write, `m_at(old)` skips; after place, `m_at(new)` finds it. Worm **tail** cells live on `_level_monsters` via `place_worm_seg`; this SHA does not update them. C `monmove.c:2049–2051` already says `remove_monster`+`place_monster` leave the tail as-is, and kickdmg still uses those macros. Match C’s (admitted incomplete) worm head-only move. Assigning `mstate=MON_FLOOR` wipes other bits, same as C `:931`.

`set_apparxy` is the real function (`:2198–2266`): pet / `ustuck` / already-knows `u_at(mux,muy)` early-return (no RNG); seeing hostile `displ=0` (no RNG); notseen `!rn2(3)` / Displaced `!rn2(4)` then search `rn2`s. Not a stub. `mintrap(mon, NO_TRAP_FLAGS)` is the real function (`trap.js`); `Trap_Killed_Mon=2` matches `trap.h`. Other trap types inside `mintrap` remain named **in the callee**, not a fake dispatch here. `passive` 4th arg `(mhp>0)` after a trap-kill is false iff `mintrap` set `mhp<1`, which C also requires for `DEADMONSTER`. `killed` skipped when `trapkilled`. Match `:116–118`.

Hallucination check: “Match C `kickdmg`” while **`wake_nearby` is omitted** is an overclaim on `dokick()` `:1383` (after `maybe_kick_monster`, **before** `kick_monster`). That call is a different function. The **`:96–113` block** matches. Callees `goodpos` / `m_in_out_region` / `set_apparxy` / `mintrap` are live, not stubs. Do **not** stamp “Match C `wake_nearby`.” Do **not** stamp “Match C `mhurtle`.” Do **not** stamp “Match C `mintrap` every trap type.”

## Hallucinations / overclaim

Subject says a martial kick knocks a small mobile monster back via `goodpos`/region/`mintrap` instead of skipping the reel. **True for the `:96–113` block when the short-circuit and `goodpos` fire.** False for `dokick()` `wake_nearby` / `u_wipe_engr` until those callers exist. D-1350 **Not this iter** names them. Stamping **Addressed:** D-1350 for knockback is fair. Do **not** treat fortress PASS — including Monk/Samurai sessions where `martial()` is true, and seed0060 (orc-rogue kick, `martial()` false) — as a `"reels from the blow."` line.

## Density

One C `if` plus already-live callees. ~34 lines of JS in the body (46 with imports). Playbook §2b right size: review **311** ordered this as the next Open, not another one-line `kickdmg` polish. Did not glue `wake_nearby` or hitmm silver sear. Acceptable.

## Branch-by-branch confirm

1. Dead after HP (`mhp<1`): no `rn2(3)`, no reel. Match `:96`.
2. Tourist, no kicking boots: `martial()` false, no `rn2(3)`. Match.
3. Samurai/Monk/kicking-boots vs `bigmonst`: skip `rn2(3)`. Match.
4. Small martial, `!rn2(3)` fail (2/3): no reel, no `goodpos`. Match.
5. `rn2(3)` success then `!mcanmove` / `ustuck` / `mtrapped`: RNG spent, no reel. Match.
6. `goodpos` false (STONE / occupied / lava-for-non-flier): no reel. Match `:102`.
7. `goodpos` true, region reject: reel pline, no move, no `mintrap`. Match `:103–104`.
8. Move: OFFMAP/place, `set_apparxy`, `mintrap`; `Trap_Killed_Mon` skips `killed`, else `passive` then maybe `killed`. Match `:105–118`.
9. Shade `!specialdmg` still returns before caitiff; no knockback. Match `:58–62`.
10. **Public-unhit** on the reel unless a session martial-kicks a small mobile monster into a free cell. seed0060 kicks but is not martial.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No new `fastforward`. Plain ESM.

## Verification

Journal: private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on the reel path. This audit cadence: full `sessions` at HEAD `d3f2a9e5` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). Monk seed0012 / Samurai seed0017/0107/0700 PASS does not prove a reel (may never take the `if`). I did not re-run the private canary. Fortress PASS is not a knocked-back jackal.

## Actionable C-wrongs

None for Must-fix. The knockback `if` matches C `:96–113` call-for-call (`DEADMONSTER`/`martial`/`!bigmonst`/`!rn2(3)` then mobility gates; `goodpos(...,0)`; reels before region; occupancy then `set_apparxy` then `mintrap`; trap-kill skips `killed`). The occupancy helper is a D-1231 clone that preserves C head-move semantics, not a `rn2(3)` then no-op. Callee named omits (`mintrap` other types; `set_apparxy` is complete for this call) stay on those functions’ map rows.

Named omits (map / already-Open, not Must-fix):

1. `dokick.c` `wake_nearby` `:1383` / `u_wipe_engr` `:1384` — already Open head after this pop
2. `mintrap` trap types outside the dart/pit/hole/fire envelope
3. C TODO `mhurtle` (do not invent a hurtle call C does not make)
4. `kick_ouch` drawbridge remap / `no_kick` / `obj_delivery` (already Open)

Do not Must-fix “print reels after region succeeds” (C prints first). Do not Must-fix “skip `rn2(3)` when `!mcanmove`” (C rolls first). Do not Must-fix “use `mhurtle`” (C comment only).

## Callers / RNG ledger

C: damage `rnd` / martial DEX `rn2` → knockback `rn2(3)` → maybe eel `goodpos` `rn2(13)` → maybe `set_apparxy` `rn2` → maybe `mintrap` `rn2(4)`. JS: same order, now including the previously skipped `rn2(3)`. Public fortress is not that path unless a martial kick lands on a small mobile monster.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: martial knockback now runs `goodpos`/region/remove-place/`mintrap` in C order; `wake_nearby` stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1350 `d3f2a9e5`.
