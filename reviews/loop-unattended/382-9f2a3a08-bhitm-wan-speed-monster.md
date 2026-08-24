# Review 382 — 9f2a3a08 — zap.c bhitm WAN_SPEED_MONSTER (D-1422)

## Metadata
- Full / short hash: `9f2a3a08951c8688e0ced7cbf3c0742d9ca44f38` / `9f2a3a08`
- Parent: `d6d910c2` (D-1421). This file audits **this SHA only** (ninth of nine `js/` commits since review **373**). Archive **Addressed:** D-1422 was **missing** the short hash; this review iter fills `9f2a3a08`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-24 23:38:26 +0200
- D-id: **D-1422**
- Stats: 9 files, +116 / −33 — `js/zap.js` +31 / −8 (docs the rest).
- Claims to close: Open `zap.c` `bhitm` WAN_SPEED_MONSTER (named from D-1410). Not slow. `reviews/loop-2026-08-15/` has no unpaid speed-monster Must-fix.
- JS / map: `zap.js` `bhitm`; callee `muse.js` `mon_adjust_speed` (D-0871); `worn.js` `check_gear_next_turn`. `c-js-map/turns.md`. WAN_SLOW / locking / probing still named.
- Prior reviews this SHA claims to close: **381** follow-up named WAN_SPEED_MONSTER.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhitm WAN_SPEED_MONSTER so a monster-aimed speed wand calls mon_adjust_speed (and check_gear_next_turn) instead of doing nothing.”

C `zap.c` `bhitm` `:233–242`:

```
    case WAN_SPEED_MONSTER:
        if (!resist(mtmp, otmp->oclass, 0, NOTELL)) {
            if (disguised_mimic)
                seemimic(mtmp);
            mon_adjust_speed(mtmp, 1, otmp);
            check_gear_next_turn(mtmp);
        }
        helpful_gesture = TRUE;
        break;
```

`helpful_gesture` is **outside** the resist gate, so a resisted zap still wakes without anger (`wakeup(mtmp, !helpful_gesture)` later in `bhitm`). Callee `worn.c` `mon_adjust_speed` `:488–564` (JS `muse.js` D-0871) switch `adjust==1`: `permspeed==MSLOW` → 0 else `MFAST`; then worn `oc_oprop==FAST` boots force `mspeed`; seen mobile unsleeping pline + `learnwand(obj)`. `check_gear_next_turn` is `mon.c` `:5915–5918` (`misc_worn_check |= I_SPECIAL`) — JS `worn.js:251` writes that bit, not a stub. Self-zap is D-1410 (`zapyourself` `speed_up(rn1(25,50))`), a different function. `zap_steed` falls through to this `bhitm` in C.

Old JS: WAN_SPEED_MONSTER hit `default` (no speed, no `I_SPECIAL`, `wakeup(..., true)` could anger).

The diff **does** add the case, dynamic-import live `mon_adjust_speed`, call live `check_gear_next_turn`, set `helpful_gesture` **outside** the resist gate. It **does not** port WAN_SLOW (C `:220–232`, including whirly expels). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhitm` WAN_SPEED_MONSTER | C `:233–242`, **wired** | |
| `resist(..., NOTELL)` | C `zap.c`, **imported live** | shieldeff named in existing resist |
| `seemimic` | C `mon.c`, **imported live** | disguised mimic |
| `mon_adjust_speed(mtmp,1,otmp)` | C `worn.c:488–564`, **imported live** | muse.js D-0871; not a local clone |
| `check_gear_next_turn` | C `mon.c:5915–5918`, **imported live** | `I_SPECIAL` |
| `helpful_gesture` | C `:240–241`, **wired** | always; peaceful wakeup |
| WAN_SLOW / locking / probing | C siblings, **named omit** | |
| `zap_steed` wrapper | C, **named omit** | C still routes here |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `resist` `rn2(100+alev-dlev)` (wand alev 12). `mon_adjust_speed` itself has no extra dice; `learnwand` is observation, not RNG. Public fortress never zaps a monster with a speed wand.

## C ↔ JS fidelity

Case order: after WAN_MAKE_INVISIBLE (D-1414), before WAN_UNDEAD_TURNING. C speed is after slow; JS still has no slow case so speed sits after invis. Keep-path for **this** otyp matches `:233–242`. Resist-then-seemimic-then-adjust-then-gear matches. `helpful_gesture = true` is **after** the `if`, so a resisted zap still wakes without anger. Match `:240–241`. Epilogue `wakeup(mtmp, helpful_gesture ? false : true)` already existed; this SHA finally sets the flag.

`mon_adjust_speed` is the D-0871 body, not a no-op: adjust 1, boots, pline, `learnwand(obj)` when seen. C boots test `objects[otmp->otyp].oc_oprop == FAST`; JS tests `otyp === SPEED_BOOTS`. In 3.7 the only FAST armor is speed boots; named if a later object table grows. `check_gear_next_turn` is `misc_worn_check \|= I_SPECIAL` — match `:5915–5918`, not a stub.

`disguised_mimic` is `mlet==S_MIMIC && M_AP_TYPE != NOTHING` — same as C `:170–171`. `seemimic` live (`mon.js:874`).

Hallucination check: “Match C `mon_adjust_speed` / `check_gear_next_turn`” while **both callees are the live D-0871 / `mon.c` flag bodies** is not a dispatch-stub lie. “Match C WAN_SLOW whirly expels” **would** be. Do **not** stamp “Match C `zap_steed` wrapper” (named; C still calls this `bhitm`). Self-zap remains D-1410 `speed_up`, not this case.

## Hallucinations / overclaim

Subject says a monster-aimed speed wand calls `mon_adjust_speed` and `check_gear_next_turn` instead of doing nothing. **True:** resist miss → `permspeed`/`mspeed`/`I_SPECIAL`/possible `learnwand`; resist hit → no speed but still `helpful_gesture`. **True that peaceful targets are not angered.** **False until named for WAN_SLOW.** Stamping **Addressed:** D-1422 for `:233–242` is fair. Do **not** treat fortress PASS as a speed-wand zap.

## Density

One C `bhitm` case wiring two already-ported callees. ~25 lines of JS. Playbook §2b allows a thin dispatch when the callees are live. Did not glue WAN_SLOW. Right size for this otyp.

## Branch-by-branch confirm

1. Not resisted, permspeed 0: → MFAST; seen unsleeping pline + `learnwand`; `I_SPECIAL`; peaceful wakeup. Match.
2. Already MFAST: silent (mspeed unchanged); still `I_SPECIAL` + helpful. Match.
3. MSLOW: → 0 (normal), not MFAST. Match adjust 1.
4. Speed boots: `mspeed` stays MFAST even if permspeed 0; no learn if oldspeed==mspeed. Match.
5. Asleep: skip pline/learn (`msleeping`). Match.
6. Resist: no `mon_adjust_speed`; `helpful_gesture` still true. Match.
7. Mimic: `seemimic` before adjust. Match.
8. WAN_SLOW still default. Named.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. The only new dice is existing `resist` `rn2`, not a recorded index. Dynamic `import('./muse.js')` is a cycle break (muse already imports zap), not a stub. Plain ESM.

## Verification

Journal: private canary **15**/15 (C/JS grep; Rule #2; IMMEDIATE wand; 0→MFAST pline+learn+I_SPECIAL+peaceful; already MFAST silent; asleep skips learn; MSLOW→0 not MFAST; resist no speed but still peaceful; boots keep MFAST no learn; mimic seemimic; WAN_SLOW still default); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not a speed wand.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Resist / seemimic / `mon_adjust_speed(1)` / `I_SPECIAL` / always-`helpful_gesture` match `:233–242`. Callees are live C functions, not clones that contradict C.

Named omits (map / Open, not Must-fix):

1. `bhitm` WAN_SLOW (whirly expels)
2. `bhitm` WAN_LOCKING / WAN_PROBING
3. `zap_steed` wrapper (C still hits this case)
4. worm `see_wsegs` / `map_invisible` epilogue
5. `mon_adjust_speed` `oc_oprop==FAST` vs SPEED_BOOTS otyp (D-0871)

Do not Must-fix “resisted zap should skip wakeup” (C still helpful-wakes). Do not Must-fix “self-zap should use `mon_adjust_speed`” (C `zapyourself` is `speed_up`). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: IMMEDIATE `weffects` → `bhit` → `bhitm`; `zap_steed`. New RNG: `resist` only. Public fortress does not zap monsters with this wand.

Verdict: **ACCEPT-WITH-DEBT**
