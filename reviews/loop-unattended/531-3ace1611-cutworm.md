# Review 531 — 3ace1611 — worm.c cutworm / place_wsegs (D-1570)

## Metadata
- Full / short hash: `3ace16113f90afcc9723f1304cc381f52398f7ad` / `3ace1611`
- Parent: `934f168b` (D-1569). This file audits **this SHA only** (fourth of nine `js/` commits since review **527**). Archive **Addressed:** D-1570 `3ace1611`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 07:50:08 +0200
- D-id: **D-1570**
- Stats: `js/worm.js` +134 / −4, `js/uhitm.js` +27 / −2, `js/dothrow.js` +6 / −3, `js/do_name.js` +1 / −1. Band 150–350 (js/ insertions **168**).
- Claims to close: Open `cutworm` after D-1548/D-1565. Not worm_known. `reviews/loop-2026-08-15/` has no unpaid cutworm Must-fix.
- JS / map: `worm.js` `cutworm`/`place_wsegs`; `known_hitum` / `thitmonst`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **530** named cutworm.

## Intent vs deliverable

Git subject promises: a long-worm body hit can shrink or split (`place_wsegs` + `clone_mon`) instead of ignoring the tail.

Pinned C `worm.c` `cutworm` `:372–477`. Callee `place_wsegs` `:614–635`. `shrink_worm` `:174–186` (static). `get_wormno` `:95–106`. Callers `uhitm.c` `known_hitum` `:599–642`; `dothrow.c` `thitmonst` `:2194–2207`. Macros `obj.h` `is_blade` `:213–216` / `is_axe` `:217–219`. `s_suffix` `hacklib.c:345`.

```372:394:nethack-c/upstream/src/worm.c
    if (!wnum)
        return;
    if (x == worm->mx && y == worm->my)
        return; /* hit on head */
    cut_chance = rnd(20);
    if (cuttier)
        cut_chance += 10;
    if (cut_chance < 17)
        return;
```

```427:428:nethack-c/upstream/src/worm.c
    new_wnum = (worm->m_lev >= 3 && !rn2(3)) ? get_wormno() : 0;
```

Old JS: no `cutworm`; thitmonst `void chopper`; known_hitum no oldhp / notonhead / cutworm. `shrink_worm` / `get_wormno` already live.

The diff **does** port `cutworm` + `place_wsegs`, wire both callers, Vorpal oldhp `*mhit=0`, `notonhead` before hmon, `slice_or_chop` remembered before hmon, export `s_suffix` (no 8th clone). It **does not** port `redraw_worm`, `wormgone`, save/rest wsegs, restore/replmon `place_wsegs`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `cutworm` | C `:372–477`, **LIVE this SHA** | async for clone_mon/pline |
| `place_wsegs` | C `:614–635`, **LIVE** | restore/replmon callers named |
| `shrink_worm` | C `:174–186` static, **LIVE** local | do not add #2 |
| `get_wormno` | C `:95–106`, **LIVE** pre-existing | |
| `clone_mon` | C, **LIVE** import | D-1565 2D place |
| `toss_wsegs` / `place_worm_seg` / `remove_monster_xy` | **LIVE** pre-existing | |
| `s_suffix` | C hacklib, **LIVE** export | 7 other locals remain; do **not** add #8 |
| `is_blade`/`is_axe` in known_hitum | **CLONE** of macros | P_DAGGER..P_SABER \|\| P_AXE tool |
| thitmonst `chopper` | C `is_axe` only, **LIVE** | not is_blade |
| `redraw_worm` / `wormgone` / rest `place_wsegs` | **OMIT named** | |

`node scripts/csym.mjs cutworm` → `:372-477`. `--callers`: dothrow `:2207`; uhitm `:642` (makemon/artifact are comments). `place_wsegs` `:614-635`. `shrink_worm` `:174-186`. `get_wormno` `:95-106`.

RNG (call-for-call, body hit only): `rnd(20)` always after head/`!wormno` gates → fail `<17` no further → tail shrink none → split: `rn2(3)` **only if** `m_lev>=3` (short-circuit) → `clone_mon` RNGs if slot → fail: no `d` → success: `d(m_lev,8)` then `d(m_lev,8)`. Head/`!wormno` **must not** burn `rnd(20)`.

`node scripts/sym.mjs` on new / re-pointed names:

```
cutworm          js/worm.js:235   ASYNC
place_wsegs      js/worm.js:202   sync
shrink_worm      NOT EXPORTED — 1 LOCAL js/worm.js:188  => no #2
clone_mon        js/makemon.js:2868   ASYNC
s_suffix         js/do_name.js:353   sync
                 !! ALSO 7 LOCAL CLONE(S) — IMPORT; do NOT add another
```

`node scripts/imports.mjs --can`: worm→makemon `clone_mon` ALREADY (this SHA added the edge); worm→do_name `s_suffix`; uhitm/dothrow→worm `cutworm`. `clone_mon` is called only inside `cutworm`, not at module eval — not a top-level TDZ read.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Gates. `!wormno` then head `(x,y)==(mx,my)` before `rnd(20)`. **Match `:381–385`.**

cuttier. `rnd(20)+10` vs `<17` (blade 7–20 cuts; bare 17–20). **Match `:387–393`.** Melee `is_blade||is_axe` (P_AXE is inside DAGGER..SABER for WEAPON, plus TOOL axes). Throw `is_axe` only. **Match C callers.**

Tail. `curr === wtails[wnum]` → `shrink_worm`. **Match `:407–410`.**

Split. Relink tails; `m_lev>=3 && !rn2(3)` then `get_wormno`; `remove_monster` then `clone_mon`. Fail: `place_worm_seg` back, pline, `toss_wsegs`, `mhp/=2` if `>1` (`Math.trunc`). **Match `:417–449`.** Success: `mcloned=0`, `m_lev = max(lev-2, 3)` both, **not** `newmonhp`, `d(N,8)` new then old, clamp old mhp, `wgrowtime=0`, `place_wsegs(new, old)`. **Match `:451–472`.**

known_hitum. Remember slice before hmon; `notonhead`; weaphit; hmon; flee `rn2(25)` **then** Vorpal `mhp==oldhp` miss **then** `wormno && *mhit` cutworm. **Match `:599–642`.**

Callee closure. LIVE: `rnd`/`rn2`/`d`, `get_wormno`, `shrink_worm`, `clone_mon`, `place_wsegs`, `toss_wsegs`, `s_suffix`, `mon_nam`/`Monnam`, `canspotmon`. CLONE: blade/axe macros. OMIT named: `redraw_worm`, `wormgone`. STUB: **none** in the cut/split arms. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject shrink/split + `place_wsegs` + `clone_mon`: **true**. D-log “not worm_known”: **true**. Do **not** stamp “Match C `redraw_worm`.” Do **not** stamp “Match C `newmonhp` on halves.” Do **not** stamp “Match C thrown `is_blade`.” Do **not** add `s_suffix` #8. This is **not** “dispatch ported, callee stubbed.”

## Density

One C function + the two production callers + the callee they need. +168 JS. Did not glue xray/`redraw_worm`. §2b OK.

## Branch-by-branch confirm

1. `!wormno`: return, no `rnd`. **Match.**
2. Head cell: return, no `rnd`. **Match.**
3. `rnd(20)=16`, no cutter: no cut. **Match.**
4. Blade `rnd=7` (+10=17): proceed. **Match.**
5. Tail seg: shrink only. **Match.**
6. Mid-body, `m_lev<3`: no `rn2(3)`; tail tossed; half HP. **Match.**
7. `m_lev>=3`, `rn2(3)≠0`: same fail arm (rn2 consumed). **Match.**
8. Slot + `clone_mon` null: fail arm. **Match.**
9. Clone ok: `mcloned=0`, two `d(N,8)`, `place_wsegs`. **Match.**
10. Throw non-axe: `chopper` false; still `rnd(20)` without +10. **Match.**

## Callers / RNG ledger

C melee + throw only. JS wires both. `known_hitum` flee RNGs run **before** cutworm, same as C. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `s_suffix` export not a new clone. `clone_mon` lazy inside `cutworm`.

## Verification

D-log canary **22**/22 (locus + head/`!wormno` before rnd; tail shrink; m_lev<3 toss+half HP; clone `mcloned=0` Nd8; `place_wsegs`; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. Long-worm body cut is **public-unhit**.

## Actionable C-wrongs

None for Must-fix. Named: `redraw_worm`; `wormgone`; restore/replmon `place_wsegs`; muse/mhitu `worm_move`. Do not add `s_suffix` #8 or `shrink_worm` #2.

Verdict: **ACCEPT-WITH-DEBT**
