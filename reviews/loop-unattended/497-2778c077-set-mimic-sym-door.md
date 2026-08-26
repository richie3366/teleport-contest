# Review 497 — 2778c077 — makemon.c set_mimic_sym door S_hcdoor (D-1536)

## Metadata
- Full / short hash: `2778c07725b55b79d38b157f5b42393b67f624be` / `2778c077`
- Parent: `455020ed` (D-1535). This file audits **this SHA only** (sixth of nine `js/` commits since review **491**). Archive **Addressed:** D-1536 `2778c077`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 07:04:20 +0200
- D-id: **D-1536**
- Stats: 9 files, +125 / −47 — `js/makemon.js` +31 / −8. Band 150–350 (js/ insertions 31).
- Claims to close: Open `makemon.c` `set_mimic_sym` door `S_hcdoor` (named from D-1535 / D-1525). Not furnsyms. `reviews/loop-2026-08-15/` has no unpaid door-mimic Must-fix.
- JS / map: `makemon.js` `set_mimic_sym`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: none unpaid.

## Intent vs deliverable

Git subject promises: a door/wall/secret-door mimic uses `S_hcdoor` (or rogue `S_hwall`) from the left-connecting wall, not `appear=0`.

Pinned C `makemon.c` `set_mimic_sym` `:2420–2438`. `defsym.h` PCHAR `S_vwall=1`, `S_hwall=2`, `S_vcdoor=15`, `S_hcdoor=16`. `rm.h` HWALL=2 … TRWALL=11. Callers: `makemon` S_MIMIC, `mklev` trapped-door mimic, `m_restartcham`/`restrap`, zap heal.

```2420:2438:nethack-c/upstream/src/makemon.c
    } else if (IS_DOOR(typ) || IS_WALL(typ) || typ == SDOOR || typ == SCORR) {
        ap_type = M_AP_FURNITURE;
        if (mx != 0 && (levl[mx - 1][my].typ == HWALL
                        || levl[mx - 1][my].typ == TLCORNER
                        || levl[mx - 1][my].typ == TRWALL
                        || levl[mx - 1][my].typ == BLCORNER
                        || levl[mx - 1][my].typ == TDWALL
                        || levl[mx - 1][my].typ == CROSSWALL
                        || levl[mx - 1][my].typ == TUWALL))
            appear = Is_rogue_level(&u.uz) ? S_hwall : S_hcdoor;
        else
            appear = Is_rogue_level(&u.uz) ? S_vwall : S_vcdoor;
```

Old JS: `appear = 0` (`S_stone`) with “no RNG”.

The diff **does** port the seven left-connect types, `mx !== 0` short-circuit, rogue wall vs closed-door cmap ids. It **does not** port furnsyms real S_*, Protection_from_shape_changers early-out, `block_point`, DELPHI fountain. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| door/wall arm | C `:2420–2438`, **LIVE this SHA** | |
| `IS_DOOR` / `IS_WALL` | C `rm.h`, **LIVE** | |
| HWALL…TUWALL | C `rm.h` enum, **LIVE** | same integers |
| `S_hcdoor` / `S_vcdoor` / `S_hwall` / `S_vwall` | C `defsym.h`, **LIVE** | local 16/15/2/1 like D-1525 `S_altar=33` |
| `Is_rogue_level` | C, **LIVE** | |
| furnsyms / `block_point` / Protection | C, **OMIT named** | |

`node scripts/sym.mjs set_mimic_sym Is_rogue_level IS_DOOR IS_WALL`:

```
set_mimic_sym    js/makemon.js:2539   sync
Is_rogue_level   js/const.js:3024   sync
IS_DOOR          js/const.js:2109   sync
IS_WALL          js/const.js:2099   sync
```

No symbol deleted. No new clone of `set_mimic_sym`. Cmap ids are constants, not a glyph helper stub.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No RNG** in this arm (C comment; maze statue `rn2(2)` is a later `else if`).

## C ↔ JS fidelity

Predicate. `IS_DOOR || IS_WALL || SDOOR || SCORR` after floor-object. **Match `:2417–2420`.** Door in a TEMPLE still takes this arm before the D-1525 altar `rt==TEMPLE` branch. **Match C order.**

Left connect. C `mx != 0 && levl[mx-1][my].typ` in {HWALL, TLCORNER, TRWALL, BLCORNER, TDWALL, CROSSWALL, TUWALL}. JS reads left only when `mx !== 0` (`?? 0` if no loc). **Match short-circuit** (no `levl[-1]`). Integers **match `rm.h:58–67`.** TRCORNER/BRCORNER/VWALL are **not** in the list — vertical-left is non-connect → `S_vcdoor`. **Match.**

Glyph. Left: rogue `S_hwall` else `S_hcdoor`. Else: rogue `S_vwall` else `S_vcdoor`. Local consts **match `defsym.h` PCHAR 1/2/15/16.** `Is_rogue_level(game.u?.uz)` **match.**

Callee closure. LIVE: `IS_DOOR`, `IS_WALL`, `Is_rogue_level`, level `at`. CLONE: none in the arm. OMIT named: `block_point` after assign, Protection early-out, furnsyms. STUB: none. **The arm may ship.**

## Hallucinations / overclaim

Subject `S_hcdoor` from left wall, not `appear=0`: **true of `:2420–2438`.** D-log “TEMPLE door still S_hcdoor”: **true** — door branch wins. This is **not** “dispatch ported, callee stubbed.” Stamping **Addressed:** D-1536 is fair. Do **not** stamp “Match C furnsyms.” Do **not** stamp “Match C `block_point`.” Do **not** stub `appear=0` again.

## Density

+31 JS: C is one `else if` + a seven-type test. §2b small-C OK. Did not glue `#altdip`.

## Branch-by-branch confirm

1. Left HWALL/TLCORNER/TRWALL/BLCORNER/TDWALL/CROSSWALL/TUWALL: `S_hcdoor`. **Match.**
2. Same, rogue: `S_hwall`. **Match.**
3. Non-connect (VWALL, TRCORNER, open): `S_vcdoor` / rogue `S_vwall`. **Match.**
4. `mx===0`: no left read, vertical closed door. **Match.**
5. SDOOR/SCORR/wall cell: same arm. **Match.**
6. Floor object first: skip. **Match.**
7. No `rn2`. **Match.**

## Callers / RNG ledger

C: any `set_mimic_sym` on door/wall. JS the same function. Public-unhit for cmap of a door mimic. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log canary **22**/22 (seven connect types; non-connect; SDOOR/SCORR/wall; mx===0; rogue; no RNG; TEMPLE door; Rule #2); green+strict; cohort **7**/7. **Public-unhit** for the cmap. Admit it.

## Actionable C-wrongs

None for Must-fix. Named: furnsyms real S_*; Protection; `block_point`.

Verdict: **ACCEPT-WITH-DEBT**
