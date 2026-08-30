# Review 685 — 7ee8ad1d — dungeon.c recalc_mapseen sokosolved / rogue / quest flags (D-1724)

## Metadata
- Full / short hash: `7ee8ad1d664b37de4ef819e3b00049ddebfe09b1` / `7ee8ad1d`
- Parent: `a9697aa8` (D-1723). This file audits **this SHA only** (eighth of nine `js/` commits since review **677**). Archive **Addressed:** D-1724 `7ee8ad1d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 09:00:47 +0200
- D-id: **D-1724**
- Stats: `js/dungeon.js` +40/−2. Total `js/` insertions **40** <250. Band **150–350**.
- Claims to close: Open sokosolved / roguelevel / quest flags after D-1707 / review **668** (`recalc` never wrote flags that `print_mapseen` / `interest_mapseen` already read). Not DRAWBRIDGE_UP lastseentyp (D-1711). Not `display_monster` furniture lastseentyp. `reviews/loop-2026-08-15/` has no unpaid overview-flag Must-fix.
- JS / map: `dungeon.js` `recalc_mapseen`. `c-js-map/startup.md`.
- Prior: **668** named these five flags; print/interest already D-1650.

## Intent vs deliverable

Git subject promises: `#overview` sets sokosolved / roguelevel / quest flags and clears `notreachable`, instead of leaving them unset after D-1707.

`node scripts/csym.mjs recalc_mapseen` → `dungeon.c:3074–3261`. Flag reset `:3099–3134`. `at_dgn_entrance` `:1896–1903`. `Sokoban` is `rm.h:538` `#define Sokoban svl.level.flags.sokoban_rules`. `--callers maybe_finish_sokoban` is `trap.c:7058–7095` (clears that bit; **not** a `recalc` callee). Print arms already D-1650.

```3099:3132:nethack-c/upstream/src/dungeon.c
    if (mptr->flags.notreachable) {
        mptr->flags.notreachable = 0;
        if (In_quest(&u.uz)) {
            mapseen *mptrtmp = svm.mapseenchn;
            do {
                if (mptrtmp->lev.dnum == mptr->lev.dnum)
                    mptrtmp->flags.notreachable = 0;
                mptrtmp = mptrtmp->next;
            } while (mptrtmp);
        }
    }
    mptr->flags.knownbones = 0;
    mptr->flags.sokosolved = In_sokoban(&u.uz) && !Sokoban;
    /* bigroom Blind retain … */
    mptr->flags.roguelevel = Is_rogue_level(&u.uz);
    mptr->flags.oracle = 0;
    mptr->flags.castletune = 0;
    mptr->flags.forgot = 0;
    mptr->flags.quest_summons = (at_dgn_entrance("The Quest")
                                 && u.uevent.qcalled
                                 && !(u.uevent.qcompleted
                                      || u.uevent.qexpelled
                                      || svq.quest_status.leader_is_dead));
    mptr->flags.questing = (on_level(&u.uz, &qstart_level)
                            && svq.quest_status.got_quest);
```

Parent: feat/Blind/oracle/valley/sanctum/cemetery only. The diff **does** notreachable clear (+ quest dnum walk), `sokosolved`, `roguelevel`, `quest_summons`, `questing`, local `Sokoban()`. It **does not** zero `knownbones` at `:3113` (still zeros in the cemetery walk later). Analogue. It **does not** port `maybe_finish_sokoban`. Named. It **does not** port `display_monster` furniture lastseentyp. Named Open.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `recalc_mapseen` flags | LIVE repaired | C `:3099–3134` |
| `Sokoban()` | CLONE of `rm.h` macro | `sokoban_rules` + JS aliases |
| `In_sokoban` / `In_quest` / `Is_rogue_level` | LIVE import | `const.js` |
| `at_dgn_entrance` | LIVE | `dungeon.js:781`; `"The Quest"` |
| `on_level` + `qstart_level` | LIVE | questing |
| `print_mapseen` / `interest_mapseen` | LIVE pre-existing | consume the flags (D-1650) |
| `maybe_finish_sokoban` | OMIT named | `trap.c:7058`; writer of `Sokoban=0` |
| `display_monster` furniture lastseentyp | OMIT named | still Open |
| DRAWBRIDGE_UP lastseentyp | not this SHA | D-1711 |
| `knownbones=0` at `:3113` | analogue | cemetery walk still zeros then re-derives |

`node scripts/sym.mjs`:

```
recalc_mapseen   js/dungeon.js:1540   sync
In_sokoban       js/const.js:3085   sync
In_quest         js/const.js:3077   sync
Is_rogue_level   js/const.js:3109   sync
at_dgn_entrance  js/dungeon.js:781   sync
Sokoban          NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:1467
             => Do NOT write clone #2.
```

C `Sokoban` is a macro, not an export. One local reader in `dungeon.js` is the port. Other files already have their own one-liners — do **not** add `Sokoban` #2 here. `--can js/dungeon.js js/const.js In_quest` / `Is_rogue_level`: **ALREADY**. Used inside `recalc_mapseen`, not TDZ. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**notreachable (`:3099–3111`).** C: if set, clear this node; if `In_quest(&u.uz)`, walk the whole chain and clear same `dnum`. JS the same on `mapseenchn` array. Recalc only runs for the **current** level (`ensure_mapseen`); reaching a quest level after ejection revives the whole quest dnum. **Match.** D-1722 `remdun_mapseen` is what **sets** the bit (endgame/tutorial leave). This peel is the reach-clear. No `rn2`.

**sokosolved (`:3114`).** C `In_sokoban(&u.uz) && !Sokoban` with `Sokoban ≡ sokoban_rules`. JS `In_sokoban(u?.uz) && !Sokoban()`. Local `Sokoban()` is `lf.sokoban_rules || lf.sokoban || game.Sokoban` — extra aliases vs the macro. `do.js` getlev syncs `game.Sokoban` from those flags, so on restore they move together. **Match the formula.** `maybe_finish_sokoban` (`trap.c:7073–7082`) is the C writer that sets `Sokoban=0` when no remaining non-hero PIT/HOLE. **JS has no that function** (`sokoban_rules` is set true on soko maps in `mklev.js` and never cleared in `trap.js`). So `#overview` **Solved** cannot go true in play until that omit ships. Not a stub inside `recalc` — recalc reads the bit C reads. Named omit of the writer, not a silent `sokosolved=true`.

**roguelevel (`:3120`).** C `Is_rogue_level(&u.uz)`. JS the same. Print “A primitive area.” already D-1650. **Match.**

**quest_summons (`:3126–3130`).** C `at_dgn_entrance("The Quest") && qcalled && !(qcompleted \|\| qexpelled \|\| leader_is_dead)`. JS `at_dgn_entrance` is `on_level(u.uz, br.end1)` via `dungeon_branch` — **Match C `:1896–1903`.** `uevent` / `quest_status.leader_is_dead`. **Match.**

**questing (`:3131–3132`).** C `on_level(&u.uz, &qstart_level) && got_quest`. JS `game.qstart_level`. Print Home / “Given quest” already D-1650. **Match.**

**Order vs C.** C zeros `knownbones` before sokosolved. JS zeros in the cemetery block (`:1679`) then re-derives from `lastseentyp` — C cemetery also re-derives after the early 0. **Same net.** `oracle`/`castletune`/`forgot` still reset where parent had them. castle/ludios still stick. **Match the claimed flags.**

**Callee closure (flag-reset arm).** LIVE: `In_sokoban`, `In_quest`, `Is_rogue_level`, `at_dgn_entrance`, `on_level`. CLONE: `Sokoban()` macro reader (verified). OMIT named: `maybe_finish_sokoban`; furniture lastseentyp. STUB in this arm: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “#overview sets those flags instead of leaving them unset”: **true** for the **writes**. Print already consumed them. Do **not** stamp “Match C `#overview` Solved after the last pit fill” — `maybe_finish_sokoban` is still omitted, so soko stays Unsolved. Do **not** stamp “Match C `display_monster` furniture lastseentyp.” Do **not** stamp “Match C DRAWBRIDGE_UP lastseentyp” (D-1711). Journal “fortress held” is not an `#overview` Solved proof. Public seed0013-rogue **hits** `roguelevel`. Public sokosolved **Solved** and quest summons **public-unhit** except seed0367 quest-tour maybe `questing`. Admit Solved unhit.

## Density

§2b: one C `recalc_mapseen` flag-reset cluster that Open named after D-1707. Same `:3099–3134`. +40. Did not glue furniture lastseentyp or `hhmmss`. Did **not** invent `maybe_finish_sokoban` in this peel.

## Verification

D-log: save-oracle skip (untagged `dungeon.c:recalc_mapseen`); canary 10/10; focused seed0013-rogue + seed0013 restore + rng-diff --all-segments; green+strict seed8000/0900; CURRENT cohort **7**/7 + focused + strict. Public **roguelevel** is hit. Public **sokosolved Solved** unhit. Admit that.

## Actionable C-wrongs

None for Must-fix (the Open writes match C; Solved depends on a named trap omit). Named: `maybe_finish_sokoban` (`trap.c:7058–7095`); `display_monster` M_AP_FURNITURE lastseentyp (Open); `shop_keeper`/`findpriest` still resident clones in recalc (pre-existing). Do **not** add `Sokoban` #2 in `dungeon.js`. Do **not** set `sokosolved=1` without `!sokoban_rules`. Do **not** `unlink` mapseen nodes on notreachable (D-1722 `#if 1`). Do **not** re-port D-1711 DRAWBRIDGE_UP. Do **not** skip the quest-dnum walk (only clearing the current node).

Verdict: **ACCEPT-WITH-DEBT**
