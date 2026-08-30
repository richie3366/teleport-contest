# Review 668 — 7b26f699 — dungeon.c recalc_mapseen Blind/oracle/valley/sanctum (D-1707)

## Metadata
- Full / short hash: `7b26f699f66485e70735d1b7b6726b75c7277e18` / `7b26f699`
- Parent: `1567e9bf` (D-1706). Fifteenth of fifteen `js/` commits since **653**. Archive **Addressed:** D-1707 (this audit fills `7b26f699`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 04:52:33 +0200
- D-id: **D-1707**
- Stats: `js/dungeon.js` +97/−9; `js/const.js` +14/−0. Total `js/` insertions **111** <250. Band **150–350** (id >454 floor **200**).
- Claims to close: Open `recalc_mapseen` Blind bigroom / oracle / valley / sanctum after D-1693 printed those lines if flags were already set. Not sokosolved / quest flags. Not DRAWBRIDGE_UP lastseentyp. `reviews/loop-2026-08-15/` has no unpaid overview-flag Must-fix.
- JS / map: `dungeon.js` `recalc_mapseen` / `Invocation_lev`; `const.js` `Is_valley` / `Is_sanctum`. `c-js-map/startup.md`.
- Prior: **654** D-1693 `castletune`; D-1650 print path.

## Intent vs deliverable

Git subject promises: `#overview` auto-annotates those levels, instead of leaving flags unset after D-1693.

`node scripts/csym.mjs recalc_mapseen` → `dungeon.c:3074–3261`. Blind/oracle/castletune/forgot `:3115–3124`; DELPHI `:3167–3168`; valley/sanctum/Invocation `:3205–3238`. `Invocation_lev` `:2016–2021`. `--callers recalc_mapseen`: `do.c:1625` leave-level; `cmd.c:1109`. `dungeon.h` `Is_valley` / `Is_sanctum` / `Is_bigroom`. `youprop.h:103` `Blind`.

```3115:3124:nethack-c/upstream/src/dungeon.c
    if (!Blind)
        mptr->flags.bigroom = Is_bigroom(&u.uz);
    else if (mptr->flags.forgot)
        mptr->flags.bigroom = 0;
    mptr->flags.roguelevel = Is_rogue_level(&u.uz);
    mptr->flags.oracle = 0;
    mptr->flags.castletune = 0;
    mptr->flags.forgot = 0;
```

```3205:3237:nethack-c/upstream/src/dungeon.c
    if (Is_valley(&u.uz)) {
        if (mptr->feat.naltar > 0) mptr->flags.valley = 1;
    } else if (Is_sanctum(&u.uz)) {
        if (mptr->feat.naltar > 0) mptr->flags.msanctum = 1;
        if (mptr->flags.msanctum) {
            invocat_lvl = u.uz; invocat_lvl.dlevel -= 1;
            if ((oth_mptr = find_mapseen(&invocat_lvl)) != 0)
                oth_mptr->flags.vibrating_square = 0;
        }
    } else if (Invocation_lev(&u.uz)) {
        for (t = gf.ftrap; t; t = t->ntrap)
            if (t->ttyp == VIBRATING_SQUARE) break;
        mptr->flags.vibrating_square = t ? t->tseen
            : ((oth_mptr = find_mapseen(&sanctum_level)) == 0
               || !oth_mptr->flags.msanctum);
    }
```

Parent: `// DELPHI → flags.oracle deferred` and valley/sanctum/Blind bigroom deferred. The diff **does** Blind retain vs forgot wipe; `orig_rtype` (rtype fallback only when unset); naltar stick; sanctum clears invoc gateway; trap walk `level.traps` then `ftrap`. It **does not** port sokosolved / roguelevel / quest_summons / questing / notreachable. Named. It **does not** port DRAWBRIDGE_UP lastseentyp. Named. It **does not** replace `hack.js` `Invocation_lev` clone. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `recalc_mapseen` Blind/oracle/valley/sanctum/VS | LIVE | `:3115–3238` |
| `Is_valley` / `Is_sanctum` | LIVE | `dungeon.h` Lcheck; `do.js` / `pray.js` still have locals — **IMPORT**, do not add #2 |
| `Is_bigroom` | LIVE import | already in `const.js` |
| `Invocation_lev` | LIVE export | `hack.js` still clones — **IMPORT**, do not add #2 |
| `Blind` | CLONE | youprop; **29** locals already — this SHA added dungeon.js **#30** |
| `vibrating_square_trap` | CLONE | C is `gf.ftrap` walk inlined |
| sokosolved / roguelevel / quest_* / notreachable | OMIT named | |

`node scripts/sym.mjs`:

```
recalc_mapseen   js/dungeon.js:1323   sync
Invocation_lev   js/dungeon.js:1262   sync  (+ hack.js local — IMPORT)
Is_valley        js/const.js:3077   sync  (+ do.js local — IMPORT)
Is_sanctum       js/const.js:3084   sync  (+ pray.js local — IMPORT)
Blind            NOT EXPORTED — 29 LOCAL (dungeon.js is a new one)
```

No clone → import of a C function that already had an export, except they **should have imported** `Is_valley` into `do.js` rather than leaving that clone (pre-existing). This SHA correctly **exported** new macros. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Blind bigroom.** C `:3116–3119`: if `!Blind` set `Is_bigroom`; else if `forgot` wipe. `forgot=0` **after** that test (`:3124`) so a one-shot forget does not keep wiping. JS the same order. **Match.** `Blind` is `youprop.h:103` `(H||E)&&!B`; JS also treats `uroleplay.blind` (D-0716 convention). C roleplay blind is supposed to hold `HBlinded`. Extra JS check is conservative, not a scored-screen fork.

**Oracle.** C `:3167–3168` `orig_rtype == DELPHI` on a **seen** room (not `rtype`, which may have become a shop). JS `(orig_rtype ?? rtype) === DELPHI`. `??` is only null/undefined, so `orig_rtype===0` stays 0 like C. Fallback is JS-data when the field is missing. When `orig_rtype` is live, **Match `:3167`.**

**Valley / sanctum.** C stick if `naltar>0`; do not clear when naltar later drops. Sanctum `dlevel-1` `find_mapseen` clears `vibrating_square`. JS the same. `Is_valley`/`Is_sanctum` **Match** Lcheck vs `game.valley_level` / `sanctum_level`. **Match `:3205–3224`.**

**Invocation_lev / VS trap.** C `In_hell && dlevel == num_dunlevs-1`. JS `dungeons[dnum].flags.hellish` and `dlevel === num_dunlevs-1`. **Match `:2016–2021`.** C walks `gf.ftrap` only. JS `level.traps` (D-1694 live list) then `ftrap`. If both lists are the same traps, **Match** `tseen` / no-trap vs `!msanctum`. Do **not** add `vibrating_square_trap` #2.

Callee closure. LIVE: `Is_bigroom`, `Is_valley`, `Is_sanctum`, `Invocation_lev`, `find_mapseen`, `count_feat_lastseentyp` (already). CLONE: `Blind` #30. OMIT named: sokosolved, roguelevel, quest flags. STUB: **none** in the arms they shipped.

**New Blind clone.** C has one macro. This SHA added a 30th JS local instead of sharing. Fidelity of the body matches the other clones; it is clone-density debt, not a Must-fix C-wrong in the overview flags.

## Hallucinations / overclaim

Subject “auto-annotates those levels instead of leaving flags unset”: **true** if `#overview` reads these flags (D-1650). Do **not** stamp “Match C sokosolved / roguelevel / quest_summons.” Do **not** stamp “Match C `gf.ftrap` only.” Do **not** replace `hack.js` `Invocation_lev` in this peel (named). Do **not** add `Blind` #31. Do **not** add `Is_valley` #2 in `dungeon.js`. Do **not** re-port D-1693 knox/drawbridge. Do **not** clear `valley` when naltar hits 0.

## Density

§2b: one `recalc_mapseen` auto-flag cluster (Blind + DELPHI + valley/sanctum/VS) + the two Lcheck macros. Related. +111. Sokoban/quest in the same C reset block were left named — thinner than porting the whole reset, still one cluster.

## Verification

D-log: private canary 21/21 (Blind retain/forgot; DELPHI orig_rtype vs unseen; valley stick; sanctum clears invoc; tseen / no-trap vs msanctum); save-oracle skip; green+strict seed8000/0900; cohort 7/7. Public `#overview` **is** hit; Oracle/Valley/Sanctum **are public-unhit** on tourist sessions. Admit that. Canaries are the C-order check.

## Actionable C-wrongs

None for Must-fix. Named: sokosolved / roguelevel / quest_summons / questing / notreachable; DRAWBRIDGE_UP lastseentyp; yyyymmddhhmmss when[]; `hack.js` `Invocation_lev` clone (import `dungeon.js`). Do **not** add `Blind` #31. Do **not** add `Is_valley` clone in `dungeon.js`. Do **not** add `Invocation_lev` #2. Do **not** use `Is_oracle_level` instead of `orig_rtype==DELPHI` (C does not). Do **not** restore the DELPHI deferred comment.

Verdict: **ACCEPT-WITH-DEBT**
