# Review 654 — 605f0f2e — dungeon.c count_feat knox/drawbridge (D-1693)

## Metadata
- Full / short hash: `605f0f2eb0c65649fed672a6cc9a1be2cea6d595` / `605f0f2e`
- Parent: `cdeb845f` (audit #2100 of D-1684–D-1692). This file audits **this SHA only** (first of fifteen `js/` commits since review **653**). Archive **Addressed:** D-1693 `605f0f2e`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 00:13:28 +0200
- D-id: **D-1693**
- Stats: `js/dungeon.js` +51/−3. Total `js/` insertions **51** <250. Band **150–350**.
- Claims to close: Open `dungeon.c` print_mapseen knox/drawbridge after D-1685 cemetery JSON. Not cemetery persist. Not `yyyymmddhhmmss` when[] generate. Not Blind/oracle/valley/sanctum recalc (later D-1707). `reviews/loop-2026-08-15/` has no unpaid knox-flag Must-fix.
- JS / map: `dungeon.js` `count_feat_lastseentyp` / `recalc_mapseen`; import `is_drawbridge_wall`. `c-js-map/startup.md`.
- Prior reviews this SHA claims to close: **646** named knox/drawbridge print; **619** / **620** named knox/castle `count_feat`.

## Intent vs deliverable

Git subject promises: seeing the Knox throne-door or Castle drawbridge annotates `#overview` Fort Ludios / The castle, instead of leaving `flags.ludios`/`flags.castle` unset after D-1685.

`node scripts/csym.mjs count_feat_lastseentyp` → `dungeon.c:2950–3071`. `--callers`: prototype `:80`; `recalc_mapseen` `:3196`. `is_drawbridge_wall` `dbridge.c:136–162` (`--callers` include `dungeon.c:3059`). `recalc_mapseen` `:3074–3261` (`castletune=0` at `:3122`). `print_mapseen` `:3515–3728` ludios/castle `:3656–3663`. `tunesuffix` `:3458–3476` (`--callers` `:3663`). `update_lastseentyp` `:2926–2938`. `Is_knox` / `Is_stronghold` `dungeon.h:135` / `:130`. `IS_THRONE` `rm.h:131`. `isok` `cmd.c:4325–4330`.

```3026:3068:nethack-c/upstream/src/dungeon.c
    case DOOR:
        if (Is_knox(&u.uz)) {
            int ty, tx = x - 4;
            for (ty = y - 1; ty <= y + 1; ++ty)
                if (isok(tx, ty) && IS_THRONE(levl[tx][ty].typ)) {
                    mptr->flags.ludios = 1;
                    break;
                }
            break;
        }
        if (is_drawbridge_wall(x, y) < 0)
            break;
        FALLTHROUGH;
    case DBWALL:
    case DRAWBRIDGE_DOWN:
        if (Is_stronghold(&u.uz))
            mptr->flags.castle = 1, mptr->flags.castletune = 1;
        break;
```

```3122:3123:nethack-c/upstream/src/dungeon.c
    mptr->flags.castletune = 0;
    /* flags.castle retains previous value */
```

Parent: `// Knox / drawbridge castle flags deferred`. The diff **does** DOOR Knox throne `x-4` live `levl[]` → `flags.ludios`; Knox always `break`s (no castle fallthrough); DOOR `is_drawbridge_wall` FALLTHROUGH / `DBWALL` / `DRAWBRIDGE_DOWN` on stronghold → castle+tune; recalc zeros `castletune` only. It **does not** rewrite `print_mapseen` named-place (already D-1650). It **does not** port `update_lastseentyp` DRAWBRIDGE_UP under-typ / furniture-mimic `cmap_to_type`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `count_feat_lastseentyp` DOOR/DBWALL/DRAWBRIDGE_DOWN | LIVE this SHA | same-file C static; not a second clone |
| `is_drawbridge_wall` | LIVE | imported `dbridge.js:100`; C `:136–162` |
| `Is_knox` / `Is_stronghold` | LIVE | `const.js` `Lcheck` aliases |
| `IS_THRONE` / `isok` / `DOOR`/`DBWALL`/`DRAWBRIDGE_DOWN` | LIVE | `const.js`; `isok` is `cmd.c:4325–4330` |
| `print_mapseen` ludios/castle | LIVE | D-1650; comment-only this SHA |
| `tunesuffix` | LIVE | same-file D-1650; C `:3458–3476` |
| `update_lastseentyp` DRAWBRIDGE_UP / mimic | OMIT named | C `:2926–2938`; Open row |
| `#if 0` ICE/POOL/MOAT/WATER/LAVA | OMIT named | C `:2959–2983` compiled out |
| Blind / oracle / valley / sanctum recalc | OMIT named | later D-1707; not this cluster |

`node scripts/sym.mjs`:

```
is_drawbridge_wall js/dbridge.js:100   sync
Is_knox          js/const.js:3068   sync
Is_stronghold    js/const.js:3041   sync
IS_THRONE        js/const.js:2557   sync
isok             js/const.js:2129   sync
                 js/hacklib.js:7   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/dogmove.js:210  js/dokick.js:214  js/mthrowu.js:189  js/teleport.js:99
count_feat_lastseentyp NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/dungeon.js:967
             => Do NOT write clone #2.
recalc_mapseen   js/dungeon.js:1323   sync
print_mapseen    NOT EXPORTED — 1 LOCAL js/dungeon.js:1762
tunesuffix       NOT EXPORTED — 1 LOCAL js/dungeon.js:1650
update_lastseentyp js/dungeon.js:951   sync
```

No symbol deleted or re-pointed (local clone → import). New edge: `dungeon.js` → `dbridge.js` `is_drawbridge_wall`. `--can js/dungeon.js js/dbridge.js is_drawbridge_wall`: `ALREADY: dungeon.js already statically imports dbridge.js. No new edge needed.` Hoisted import; not a TDZ read. `isok` clones in dogmove/dokick/mthrowu/teleport are **pre-existing**; this SHA imported `const.js`. Do **not** add `isok` #6 in dungeon. Do **not** add `count_feat_lastseentyp` #2. `print_mapseen` / `tunesuffix` “LOCAL CLONE” is C `staticfn` in the same file — not clone drift. FORCE/DIAG/`getRngLog`/`fastforward`/seed names in control flow: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**DOOR / Knox.** C `:3040–3057` `Is_knox(&u.uz)` then `tx = x - 4`, `ty` in `[y-1, y+1]`, `isok` then `IS_THRONE(levl[tx][ty].typ)` (live terrain, **not** `lastseentyp`; throne need not have been seen). Always `break` after the Knox block even if no throne. JS `Is_knox(game.u?.uz)`, same `tx`/`ty`, `isok` from `const.js` (`cmd.c:4325–4330` `x>=1 && x<=COLNO-1 && y>=0 && y<=ROWNO-1`), `IS_THRONE(game.level?.at(tx, ty)?.typ | 0)` (`rm.h:131` `(typ)==THRONE`). Missing cell → `typ|0 === 0` → false, same as C `isok` fail. Inner `break` leaves the `for`; then switch `break`. **Match `:3040–3057`.** Wrong column / no throne leaves `ludios` unset. **Match.**

**DOOR / drawbridge FALLTHROUGH.** C `:3058–3060` if not Knox, `is_drawbridge_wall(x, y) < 0` then `break`; else FALLTHROUGH into `DBWALL`/`DRAWBRIDGE_DOWN`. JS the same, no `break` after a non-negative dir. `is_drawbridge_wall` LIVE: `!isok` → `-1`; `typ != DOOR && typ != DBWALL` → `-1`; neighbor `IS_DRAWBRIDGE` + `drawbridgemask & DB_DIR` in WEST/EAST/SOUTH/NORTH order. C `:144–159` `isok` on each neighbor; JS `game.level.at` missing cell is falsy ≡ `!isok`. **Match `:136–162` and `:3058–3060`.**

**DBWALL / DRAWBRIDGE_DOWN.** C `:3061–3065` `Is_stronghold(&u.uz)` then comma `castle=1, castletune=1`. JS two assignments. Off-level span does not set flags (`Is_stronghold` is `Lcheck` vs `stronghold_level`). Plain DOOR that is not a drawbridge wall already `break`s. **Match `:3061–3065`.** `DRAWBRIDGE_UP` is not a case (C comment `:3036–3038`: moat unless adjacent `DBWALL` seen). JS default. **Match.**

**recalc `castletune`.** C `:3122` zeros tune every pass so a destroyed drawbridge drops `tunesuffix`; `flags.castle` and `flags.ludios` stick. JS this SHA: `if (!mptr.flags) mptr.flags = {}` then `castletune = 0`. Does **not** zero `castle`/`ludios`. **Match the one line this cluster needs.** Other recalc flags (`knownbones`, `sokosolved`, Blind `bigroom`, `oracle=0`, quest_*) stay named at this SHA.

```3656:3663:nethack-c/upstream/src/dungeon.c
    } else if (mptr->flags.ludios) {
        Sprintf(buf, "%sFort Ludios.", PREFIX);
    } else if (mptr->flags.castle) {
        Snprintf(buf, sizeof buf, "%sThe castle%s.", PREFIX,
                tunesuffix(mptr, tmpbuf, sizeof tmpbuf));
```

**print / tune.** C mutually exclusive named-place after quest home; JS `mapseen_named_place_lines` already had `fl.ludios` / `fl.castle` + `tunesuffix` (`uheard_tune==2` → `notes "${game.tune}"` else `5-note tune`). C `:3466–3473` `uheard_tune==2` / `svt.tune`. This SHA only comments that those strings now have flag writers. **Not a stub callee.** Destroyed bridge: recalc clears tune, castle sticks → `"The castle."` without the parenthetical. **Match `:3458–3476` with D-1650.**

**`update_lastseentyp` (named).** C `:2926–2938` `DRAWBRIDGE_UP` → `db_under_typ(drawbridgemask)` then furniture-mimic `cmap_to_type` if `canseemon`. JS still `lst[x][y] = loc.typ | 0`. Castle flags for `DRAWBRIDGE_DOWN`/`DBWALL`/`DOOR` do not need that rewrite. **Named omit, not a C-wrong in the shipped arms.**

Callee closure (knox/castle arm). LIVE: `is_drawbridge_wall`, `Is_knox`, `Is_stronghold`, `IS_THRONE`, `isok`, `print_mapseen` ludios/castle, `tunesuffix`. CLONE: none new. OMIT named: DRAWBRIDGE_UP/mimic lastseentyp; `#if 0` water; Blind/oracle/valley/sanctum. STUB: **none in the live DOOR/DBWALL/DRAWBRIDGE_DOWN arms.** Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Not “Match C `print_mapseen` knox from scratch” — strings were D-1650; this SHA is the **flag writers**. D-log “JS printed those lines if flags were already set but never set the flags”: **true**. Subject “seeing the Knox throne-door or Castle drawbridge annotates”: **true** once `recalc_mapseen` walks `lastseentyp` (caller `:3196`). Do **not** stamp “Match C `update_lastseentyp` DRAWBRIDGE_UP.” Do **not** stamp “Match C Blind `bigroom` / oracle / valley / sanctum.” Do **not** stamp “Match C `yyyymmddhhmmss`.” Do **not** add `isok` in dungeon. Do **not** import `hacklib.js` `isok` (const.js is the C `cmd.c` body). Public `#overview` Fort Ludios / The castle is **public-unhit** (no public Knox/castle session); private canary is the proof.

## Density

§2b: one `count_feat_lastseentyp` remaining-arm cluster (DOOR Knox + drawbridge FALLTHROUGH + stronghold DBWALL/DOWN) plus the one recalc line C requires for tune. Related. +51 is above the ~40 failed-handoff floor; C arm is ~40 lines. Did not glue perminv or save JSON.

## Verification

Journal: private canary (knox door+throne / y-1 / wrong column; DRAWBRIDGE_DOWN castle+tune then destroy keeps castle / clears tune; DBWALL; DOOR drawbridge-wall; plain DOOR; off-level span; DRAWBRIDGE_UP silent); green+strict seed8000/0900; cohort **9**/9 + strict. Path **public-unhit** for Knox/castle `#overview`. Cadence fortress at the prior audit is not a Ludios proof.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `update_lastseentyp` DRAWBRIDGE_UP `db_under_typ` + furniture-mimic `cmap_to_type` (`dungeon.c:2926–2938`); `#if 0` water/lava/ice; Blind/oracle/valley/sanctum recalc (later D-1707); `yyyymmddhhmmss` when[]. Do **not** add `count_feat_lastseentyp` #2. Do **not** add `isok` #6 in dungeon. Do **not** add `is_drawbridge_wall` clone in dungeon. Do **not** zero `flags.castle`/`ludios` on recalc. Do **not** fall through Knox DOOR into castle. Do **not** re-port `print_mapseen` cemetery (D-1659) or cemetery JSON (D-1685).

Verdict: **ACCEPT-WITH-DEBT**
