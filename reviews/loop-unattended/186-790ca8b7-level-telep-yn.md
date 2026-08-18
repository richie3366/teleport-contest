# Review 186 — 790ca8b7 — teleport.c `dotele` LEVEL_TELEP `y_n` + `level_tele_trap` (D-1224)

## Metadata
- Full / short hash: `790ca8b777ccd9df6cf4f9d18e202745ee02ac3f` / `790ca8b7`
- Parent: `d4f9b432` (D-1223). This file audits **this SHA only**. Archive row **Addressed:** D-1224 `790ca8b7` already has the short hash. At this SHA, energy/spellcast was still fail-closed (D-1225 next).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 19:16:51 +0200
- D-id: **D-1224**
- Stats: 11 files, +224 / −85 — `js/teleport.js` +111 / −20; `js/trap.js` +12 / −4.
- Claims to close: Open `teleport.c` LEVEL_TELEP `y_n` (named from D-1208 / D-1209 / review **170** / **171**). Not energy-spellcast. `reviews/loop-2026-08-15/` has no unpaid LEVEL_TELEP Must-fix.
- JS / map: `teleport.js` `dotele` + `level_tele_trap`; `trap.js` `trapeffect_level_telep` hero arm. `c-js-map/turns.md`. `#teleport` `doextcmd` still named. Energy was named **at this SHA**.
- Prior reviews this SHA claims to close: **170** item 1; **171** item 2.

## Intent vs deliverable

Git subject promises: “Match C teleport.c dotele LEVEL_TELEP y_n so a seen level teleporter asks before level_tele_trap(FORCETRAP), instead of always declining.”

Old JS: seen `LEVEL_TELEP` → `trap = null` (treat as `'n'`). C (`teleport.c:1046–1053`): `y_n("There is a level teleporter here. Trigger it?")`; `'y'` → `level_tele_trap(trap, FORCETRAP); return 1`; else `trap = 0` and continue horizontal.

The diff **does** that yn, ports `level_tele_trap` (`:1538–1571`), and wires hero `trapeffect_level_telep` (`trap.c:2093–2095` `seetrap` + call). It does **not** pull energy/`spelleffects` (still fail-closed here) or `#teleport`. Named at this SHA.

`FORCETRAP` in the hunk is the C flag (`hack.h:1306` `0x01`), not a trace `FORCE` gate.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dotele` LEVEL_TELEP `y_n` | C site `:1046–1053`, **wired** | `yn_function(query, 'yn', 'n')` ≡ `y_n` (`hack.h:1329`) minus 4th resp-save |
| `level_tele_trap` | C callee `:1538–1571`, **new** | not a stub |
| `Teleport_control()` | clone of `youprop.h` H\|\|E | sticky extra for poly/eat flats |
| `Hallucination()` | imported `do_name.js` | C `HHallucination && !Halluc_resistance` |
| `Antimagic()` | pre-existing local clone | uprops + sticky |
| `u_locomotion` | D-1208 clone | `"step"` / `"trigger"` |
| `trapeffect_level_telep` hero | C `:2093–2095`, **wired** | was empty “deferred” |
| `seetrap` / `deltrap` / `newsym` / `level_tele` / `shieldeff` / `make_confused` | C callees, **imported live** | |
| energy / `spelleffects` | sibling, **named at this SHA** | D-1225 |
| `#teleport` `doextcmd` | C alias, **named omit** | |

No `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. New RNG: none in `level_tele_trap` itself; `y_n` is input; `level_tele()` may already burn RNG (pre-existing).

## C ↔ JS fidelity

Pinned C `dotele` (`teleport.c:1045–1053`):

```
        if (trap->ttyp == LEVEL_TELEP && trap->tseen) {
            if (y_n("There is a level teleporter here. Trigger it?") == 'y') {
                level_tele_trap(trap, FORCETRAP);
                return 1; /* time even if it doesn't work */
            } else
                trap = 0;
```

`y_n` ≡ `yn_function(query, ynchars, 'n', TRUE)`. JS 3-arg `yn_function` (default `'n'`). Missing do-again save is the existing yn clone, not a new C-wrong of the prompt string. `'y'` → `level_tele_trap(FORCETRAP)` → `return true`. Decline → `trap = null`, then TELEP/other/energy/tele. Match branch order. Unseen trap already nulled (`!tseen`). Match.

Pinned C `level_tele_trap` (`:1538–1571`):

```
    intentional = (trflags & (VIASITTING | FORCETRAP)) != 0;
    verbbuf = intentional ? "trigger" : "%s onto" u_locomotion("step");
    You("%s a level teleport trap!", verbbuf);
    if (Antimagic && !intentional) shieldeff;
    if ((Antimagic && !intentional) || In_endgame) { You_feel wrenching; return; }
    deltrap; newsym; level_tele();
    if (Hallucination || Teleport_control)
        You("briefly feel %s.", Hallucination ? "oriented" : "centered");
    else
        You_feel("%sdisoriented.", Confusion ? "even more " : "");
    if (!Teleport_control)
        make_confused((HConfusion & TIMEOUT) + 3L, FALSE);
```

JS (`teleport.js:2530–2567`): `VIASITTING | FORCETRAP` (`const.js` 0x20 / 0x01 match `hack.h`). Verb `trigger` vs `` `${u_locomotion('step')} onto` ``. `pline('You ${verbbuf} a level teleport trap!')` ≡ C `You()`. Antimagic shield only when `!intentional`. Endgame **or** (Antimagic && !intentional) wrench, trap stays. Else deltrap, newsym, `level_tele()`. Post-port: Hallu/TC “briefly feel” else You_feel disoriented; `!TC` `make_confused((HConfusion & TIMEOUT)+3, false)` **after** `level_tele` so Oops is not this-trap confuse. Match.

C `Confusion` for “even more” is `HConfusion`. JS uses `u.HConfusion` only there. Match.

C `Teleport_control` is `H \|\| E` only. JS ORs sticky `u.Teleport_control`. Same youprop clone pattern as `Antimagic()` in this file. If only sticky is set, JS skips confuse and prints “centered”; C would confuse. Poly/eat flats are why they kept sticky. Named clone drift, not a stub of `level_tele`.

Hero trapeffect (`trap.js:3021–3026`): `seetrap` then `level_tele_trap(trap, trflags)`. C `:2093–2095` same. Monster arm still `mlevel_tele_trap`. Match. Sit/`dotrap` `VIASITTING` uses the same callee (intentional trigger). Step-on passes `trflags` without FORCETRAP → “step onto”, Antimagic can wrench. Match.

`level_tele` is the live D-family dest picker, not a no-op. Wrenching `'y'` still returns time from `dotele` without deleting the trap. Match C `return 1`.

C `y_n` 4th argument `TRUE` saves the response in the do-again buffer. JS `yn_function` (`getline.js:740`) takes `(query, resp, def)` only. Same clone used by vault “Jump in?” (D-1208). Prompt text and default `'n'` match. Do-again save stays named UI.

`Hallucination()` (`do_name.js:170–178`): C is `HHallucination && !Halluc_resistance`. JS returns true on sticky `u.Hallucination` **without** resist, else H && !resist. Pre-existing helper. seed0383/0399 still PASS this audit, so the extra sticky did not desync those public Hallu paths.

Sit/`dotrap`: `VIASITTING` is `0x20` in both `hack.h` and `js/const.js`. If `dosit` already passes that bit into `dotrap` → `trapeffect_level_telep`, this SHA’s hero arm is what makes sit-on-LEVEL_TELEP call `level_tele_trap` instead of returning Finished with no effect. That is C `:2093–2095`, not a new sit theory.

`u_locomotion("step")` for non-intentional is the D-1208 Lev/Fly/jump clone. C `Sprintf(verbbuf, "%s onto", u_locomotion("step"))` then `You("%s a level teleport trap!", verbbuf)` → “You fly onto a level teleport trap!” JS `` You ${u_locomotion('step')} onto a level teleport trap! ``. Match.

## Hallucinations / overclaim

Subject + D-1224 say a seen level teleporter asks, then `level_tele_trap(FORCETRAP)`, instead of always declining. **Yn + full callee + hero trapeffect are the hunk.** This is **not** “Match C dispatch, callee is a stub”: `deltrap` / `level_tele` / `make_confused` are live. Do **not** stamp “Match C energy/`spelleffects`” (still fail-closed **on this SHA**) or “Match C `#teleport` `doextcmd`” or “Match C `yn_function` 4th-arg do-again.”

Journal “public-unhit unless `^T`/step/sit on a seen LEVEL_TELEP” is fair.

## Density

Caller yn + the C function it must call + the trap.c hero arm that was a no-op of the same function. One cluster. ~111 + 12 JS lines. Right size (§2b). Did not glue energy.

## Branch-by-branch confirm

1. Seen LEVEL_TELEP, yn `'n'`: `trap=null`; continue; (this SHA) energy fail-closed if no Teleportation. Match declined C.
2. Seen LEVEL_TELEP, yn `'y'`, not endgame, not Antimagic: trigger pline; deltrap; `level_tele`; post-feel; maybe confuse; `dotele` returns true **without** `tele()`/`morehungry(100)`. Match.
3. `'y'` + Antimagic + FORCETRAP: intentional → **no** shieldeff, **no** wrench from MR; still endgame wrench. Match.
4. `'y'` + In_endgame: wrench, trap stays, return 1. Match.
5. Step-on hero trapeffect, `trflags=0`, Antimagic: “step onto”; shieldeff; wrench; trap stays. Match.
6. Sit `VIASITTING`: “trigger”; skip MR wrench. Match.
7. Hallu, successful port: “oriented”. Match.
8. TC, successful port: “centered” (inner `Hallucination()` false). Match.
9. Neither: “disoriented” / “even more ” if `HConfusion`. Then `make_confused(+3)`. Match.
10. Unseen LEVEL_TELEP: `trap=0` before the yn. Match `:1042–1043`.
11. TELEP_TRAP arms unchanged (vault yn / teleds). Match D-1208.
12. Other `ttyp` at feet: `trap=0` (C `:1067–1068`). JS `else trap = null`. Match. Does not `level_tele_trap` a hole.
13. `make_confused(..., false)` second arg is C `FALSE` (no “You feel confused.” extra hide). Match.
14. `TIMEOUT` mask on `HConfusion` before +3. Match `HConfusion & TIMEOUT`.
15. Monster `trapeffect_level_telep` still `mlevel_tele_trap` (D-0782 family). This SHA only fills the youmonst arm. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

`FORCETRAP` is the C trap-flag name. No `getRngLog` / fs / seed-shaped dest coordinates.

## Verification

Journal: private canary **49**/49 (yn y/n; FORCETRAP skip MR; endgame wrench; step-on MR; VIASITTING; Hallu/TC/confuse order; `seetrap`; return time on wrench); green+strict seed8000/0900; cohort **5**/5 + strict 1500/1800/0012/0004/0007. **Public-unhit** unless those keys hit a seen LEVEL_TELEP. Cadence this audit: fortress **44**/44.

## Actionable C-wrongs

None for Must-fix.

Named omits (map, not Must-fix):

1. `dotele` energy/`spelleffects` (this SHA still Teleportation fail-closed; D-1225)
2. `#teleport` `doextcmd`
3. `yn_function` 4th-arg do-again save
4. `Teleport_control()` sticky vs C H\|\|E-only (same clone family as local `Antimagic`)
5. `UTOTYPE_RMPORTAL` deltrap (pre-existing `domagicportal` named)

Do not Must-fix sticky TC as the next peel. Do not silently `teleds` a LEVEL_TELEP.

## Callers / RNG ledger

C callers of `level_tele_trap`: `dotele` with `FORCETRAP`; `trap.c trapeffect_level_telep` with whatever `dotrap`/`mintrap` passed. JS same two. `level_tele()` dest RNG is pre-existing (wizard getlin / uncontrolled random). This SHA does not add `rn2` inside `level_tele_trap`. `y_n` consumes a key, not ISAAC. `make_confused(+3)` is a TIMEOUT bump, not `rnd`. `shieldeff` sparkle is display (D-1087), not positional RNG.

Do not treat `FORCETRAP` in this hunk as playbook anti-pattern `FORCE`. The flag is `0x01U` in `hack.h` / `js/const.js`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: seen LEVEL_TELEP now asks like C and `level_tele_trap` is a real callee (intentional/MR/endgame/deltrap/`level_tele`/post-confuse); energy/`#teleport` stay named on this SHA.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1224 `790ca8b7`.
