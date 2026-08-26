# Review 517 — f8a7cea2 — makemon.c set_mimic_sym DELPHI S_fountain (D-1556)

## Metadata
- Full / short hash: `f8a7cea2bcaf5b6d54d826080a54e9333240689e` / `f8a7cea2`
- Parent: `1c43e64c` (D-1555). This file audits **this SHA only** (eighth of nine `js/` commits since review **509**). Archive **Addressed:** D-1556 `f8a7cea2`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 13:54:23 +0200
- D-id: **D-1556**
- Stats: `js/makemon.js` +7 / −5, `js/uhitm.js` +3 / −2 (comment). Band 150–350 (js/ insertions **10**).
- Claims to close: Open DELPHI `S_fountain` (named from D-1543 / D-1555). Not furnsyms. Not `block_point`. `reviews/loop-2026-08-15/` has no unpaid DELPHI Must-fix.
- JS / map: `makemon.js` `set_mimic_sym`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **504** named DELPHI stub 0.

## Intent vs deliverable

Git subject promises: a Delphi-room mimic uses `S_fountain` (cmap 37) instead of `appear=0`.

Pinned C `makemon.c` `set_mimic_sym` `:2392–2550`. DELPHI arm `:2450–2456` (after ZOO/VAULT, before TEMPLE). `defsym.h` `PCHAR(37, '{', S_fountain, "fountain", CLR_BRIGHT_BLUE)`. Callers makemon `:1305`; mklev dosdoor `:661`; `m_restartcham`/`restrap`; zap heal; sp_lev appear_as.

```2450:2456:nethack-c/upstream/src/makemon.c
    } else if (rt == DELPHI) {
        if (rn2(2)) {
            ap_type = M_AP_OBJECT;
            appear = STATUE;
        } else {
            ap_type = M_AP_FURNITURE;
            appear = S_fountain;
        }
```

Old JS: `rn2(2)` STATUE fork already live; furniture arm was `appear = 0; // S_fountain stub` (`S_stone`). RNG matched; glyph did not. Furnsyms `[]` has no fountain (C neither). Door/wall arm still precedes `rt`.

The diff **does** add local `S_fountain = 37` and assign it on the furniture arm. uhitm `DEFSYM_EXPLANATION[37]` was already `'fountain'` (D-1554 table); this SHA only updates the comment. It **does not** port Protection early-out, `block_point`, `made_fruit`, Plan-B. Named. **No new RNG.**

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `set_mimic_sym` DELPHI furniture | C `:2454–2456`, **LIVE this SHA** | was stub 0 |
| `S_fountain` | C `defsym.h:134`, **LIVE this SHA** | local 37 |
| DELPHI STATUE arm | C `:2451–2453`, **LIVE** | pre-existing `rn2(2)` |
| `defsym_explanation` [37] | C “fountain”, **LIVE** | table pre-existed |
| Protection_from_shape_changers | C early-out, **OMIT named** | |
| `block_point` | C `:2548–2549`, **OMIT named** | next Open / D-1557 |
| `flags.made_fruit` / Plan-B | C, **OMIT named** | |

`node scripts/csym.mjs set_mimic_sym --sig` → `makemon.c:2392-2550`. `--callers`: makemon `:1305`; mklev `:661`; mon.c `:4632`, `:4685`; sp_lev `:2058`; zap `:453`.

`node scripts/sym.mjs set_mimic_sym defsym_explanation`:

```
set_mimic_sym    js/makemon.js:2553   sync
defsym_explanation js/uhitm.js:2434   sync
```

**Re-point:** none. `S_fountain` is a local const, not a deleted clone. Do **not** add a second `set_mimic_sym`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **No new core RNG** (`rn2(2)` already shipped).

## C ↔ JS fidelity

DELPHI. `rt === DELPHI`; `rn2(2)` STATUE / else `M_AP_FURNITURE` + `S_fountain=37`. **Match `:2450–2456`.** Not `S_altar` (33). Altar `Align2amask` / hell `AM_NONE` only when `appear == S_altar`. Fountain takes the stale-`has_mcorpsenm` → `NON_PM` arm. **Match `:2538–2546`.** D-log canary “no altar amask; stale NON_PM” is the right check.

Glyph. `that_is_a_mimic` / `mhidden_description` `defsym_explanation(37)` → `'fountain'`. **Match PCHAR explanation.** Index 0 remains `'stone'`; stub 0 was wrongly stone.

Order. Door/wall/SDOOR still before `rt`, so a DELPHI-room **door** mimic is still `S_hcdoor` (D-1536), not a fountain. **Match C** (door test precedes room-type). Ordinary-room furnsyms `ROLL_FROM` still never 37. **Match C `furnsyms[]`.** TEMPLE still `S_altar`. **Match.**

Callee closure (DELPHI furniture arm). LIVE: `set_mimic_sym` assignment, `defsym_explanation`. CLONE: none. OMIT named: `block_point` (does_block at end of function — not this arm’s callee for the **id**). STUB: **none** in the shipped id. Combined-arm: the DELPHI furniture constant may ship without `block_point` (that is a later tail, named).

## Hallucinations / overclaim

Subject cmap 37 not appear=0: **true**. Stamping **Addressed:** D-1556 is fair for **504’s** DELPHI stub. Do **not** stamp “Match C `block_point`.” Do **not** stamp “Match C Protection early-out.” Do **not** stamp “Match C furnsyms includes fountain.” This is **not** “dispatch ported, callee stubbed” — the furniture id **was** the stub; it is now the C constant. STATUE fork was already LIVE.

## Density

+10 JS: C is one enumerator. Playbook “unless C is that small” applies. Did not glue `block_point`. §2b OK.

## Branch-by-branch confirm

1. DELPHI, `rn2(2)===1`: STATUE object. **Match** (pre-existing).
2. DELPHI, `rn2(2)===0`: furniture 37, explanation “fountain”. **Match.**
3. Same, not 0 (`S_stone`). **Not C; this SHA fixes it.**
4. TEMPLE: still 33 altar + amask. **Match.**
5. OROOM furnsyms: never 37. **Match.**
6. Door in a DELPHI room: `S_hcdoor`. **Match.**
7. Fountain MCORPSENM: NON_PM if stale, no `rn2(3)` hell amask. **Match.**

## Callers / RNG ledger

C: any `set_mimic_sym` in a DELPHI room. Public-unhit until a session has a Delphi mimic on the furniture arm. No seed gate. Same `rn2(2)` as before.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Local 37 is the PCHAR index, not a recorded coordinate.

## Verification

D-log canary **23**/23 (C/JS grep; both arms; not stub 0; no altar amask; stale NON_PM; fountain only `rn2(2)`; OROOM never 37; TEMPLE altar; door still `S_hcdoor` in DELPHI; Rule #2); green+strict seed8000/0900; cohort **7**/7. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: Protection_from_shape_changers early-out; `block_point`/`does_block`/`fill_point` (next Open); slime-mold `flags.made_fruit`; nocorpse/hatch/tin Plan-B. Do not put fountain into `MIMIC_FURNSYMS`.

Verdict: **ACCEPT-WITH-DEBT**
