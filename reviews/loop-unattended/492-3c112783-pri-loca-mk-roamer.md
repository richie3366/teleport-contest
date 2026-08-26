# Review 492 — 3c112783 — sp_lev.c create_monster Pri-loca noalign mk_roamer (D-1531)

## Metadata
- Full / short hash: `3c112783f75fa7b53bcbfc19d02823e6963914b9` / `3c112783`
- Parent: `2950c6a9` (audit #1920). This file audits **this SHA only** (first of nine `js/` commits since review **491**). Archive **Addressed:** D-1531 `3c112783`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 06:03:16 +0200
- D-id: **D-1531**
- Stats: 10 files, +139 / −62 — `js/mklev.js` +24 / −8. Band 150–350 (js/ insertions 24).
- Claims to close: Must-fix from review **487** QUALITY-RISK (`load_pri_strt` `makemon(..., 0)` vs C `mk_roamer`). This SHA correctly relocates the spawn to `load_pri_loca`. Not emin-arm deletion. `reviews/loop-2026-08-15/` has no unpaid Pri-loca Must-fix.
- JS / map: `mklev.js` `load_pri_loca` + existing `mk_roamer_splev`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **487** Actionable #1 (Pri-strt misnamed; locus is Pri-loca noalign cleric).

## Intent vs deliverable

Git subject promises: lua `align="noalign"` aligned cleric is `mk_roamer` (`MM_EMIN`, `min_align=A_NONE`), not `makemon(..., 0)` that burns D-1526 emin `rn2` on Pri-loca. Keep the emin roaming arm. seed0367 / suite 44/44.

Pinned C `sp_lev.c` `create_monster` `:1983–1988` then `:2125–2129`; `priest.c` `mk_roamer` `:724–751`; `align.h` `A_NONE` −128 / `AM_NONE` 0; `global.h` `BOOL_RANDOM` −1; `trap.h` `ALL_TRAPS` −1.

```1983:1988:nethack-c/upstream/src/sp_lev.c
    if (m->sp_amask != AM_SPLEV_RANDOM)
        mtmp = mk_roamer(pm, Amask2align(amask), x, y, m->peaceful);
    else if (PM_ARCHEOLOGIST <= m->id && m->id <= PM_WIZARD)
        mtmp = mk_mplayer(pm, x, y, FALSE);
    else
        mtmp = makemon(pm, x, y, m->mm_flags);
```

```738:748:nethack-c/upstream/src/priest.c
    if (!(roamer = makemon(ptr, x, y, MM_ADJACENTOK | MM_EMIN | MM_NOMSG)))
        return (struct monst *) 0;

    EMIN(roamer)->min_align = alignment;
    EMIN(roamer)->renegade = (coaligned && !peaceful);
    roamer->ispriest = 0;
    roamer->isminion = 1;
    mon_learns_traps(roamer, ALL_TRAPS); /* traps are known */
    roamer->mpeaceful = peaceful;
    roamer->msleeping = 0;
    set_malign(roamer); /* peaceful may have changed */
```

Lua Pri-loca: `des.monster({ id = "aligned cleric", x=20, y=07, align="noalign", peaceful=0 })`. `align="noalign"` → `sp_amask = AM_NONE` ≠ `AM_SPLEV_RANDOM`. `sp_amask_to_amask` `:1918–1919` is `sp_amask & AM_MASK` (**no** `induced_align(80)`). `Amask2align(0)` is `A_NONE`. Then female + `peaceful > BOOL_RANDOM` (`0 > -1`) rewrites `mpeaceful` and `set_malign` again.

Old JS (`load_pri_loca` `:4036`): `makemon(pm, pos, 0)` then always `mpeaceful=0` + `set_malign`. That took D-1526’s unflagged-cleric arm: `rn2(3)` then maybe `!rn2(3)`, `min_align` in {−1,0,1}. Public hit: seed0367 FAIL from `4e78ca90`.

The diff **does** call existing `mk_roamer_splev(pm, Amask2align(AM_NONE), pos, 0)` and ports `:2125–2129` (`female` always; `peaceful > BOOL_RANDOM` then `set_malign`). It **does not** retarget `splev_create_monster` / `splev_room_monster` (still `induced_align(80)` + `makemon`). Named. It **does not** delete the emin arm. Review **487** named `load_pri_strt`; Pri-strt Arch Priest / acolytes are other `mndx` and stay RANDOM-amask `makemon`. **Match C those lines.**

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| Pri-loca noalign cleric | C `:1983–1984` + lua, **LIVE this SHA** | packed `load_pri_loca` |
| `mk_roamer` | C `priest.c:724`, **CLONE** `mk_roamer_splev` | pre-existing; new caller |
| `makemon` `MM_EMIN` | C `:738`, **LIVE** | skips D-1526 arm |
| `newemin` / `EMIN` | C `minion.c`, **LIVE** | via `MM_EMIN` |
| `Amask2align` | C `align.h`, **LIVE** | `AM_NONE` → `A_NONE` |
| `set_malign` | C, **LIVE** | mk_roamer + override |
| `mon_learns_traps` `ALL_TRAPS` | C `:745`, **LIVE** | JS −1 |
| `splev_resolve_occupied` | C `:1976–1978` `enexto`, **CLONE** | then mk_roamer `rloc` |
| `splev_create_monster` | C `:1925` generic, **OMIT named** | still RANDOM-only |
| `mk_mplayer` role-id arm | C `:1985–1986`, **OMIT named** | |
| `reset_hostility` | C `priest.c:755`, **OMIT named** | not a mk_roamer callee |

`node scripts/sym.mjs mk_roamer_splev mk_roamer makemon newemin EMIN Amask2align set_malign mon_learns_traps splev_create_monster load_pri_loca priestini induced_align`:

```
mk_roamer_splev  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:14907
mk_roamer        NOT FOUND in js/** (no export, no local function/const).
makemon          js/makemon.js:2076   sync
newemin          js/makemon.js:200   sync
EMIN             js/const.js:2931   sync
Amask2align      js/const.js:188   sync
set_malign       js/makemon.js:492   sync
mon_learns_traps js/monsters.js:539   sync
splev_create_monster NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:11177
load_pri_loca    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:3919
priestini        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:16166
induced_align    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:17205
```

This SHA does **not** delete a symbol. It re-points one packed caller from `makemon(..., 0)` to the existing clone. `mk_roamer` remains unexported (cycle: mklev→trap→dog; clone stays in `mklev.js`). `splev_create_monster` is **not** a stub of this arm; it is a named-omit generic that still always burns RANDOM amask.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in the `js/` hunk. Rule #2 clean. **RNG:** this spawn **stops** burning emin `rn2(3)` (C never did). `mk_roamer` itself has no `rn2`.

## C ↔ JS fidelity

`sp_amask != RANDOM`. Lua `noalign` is `AM_NONE`, not `AM_SPLEV_RANDOM`. JS does not call `induced_align(80)` on this line (comment + code). **Match `:1943` + `:1918–1919` + `:1983`.** `Amask2align(AM_NONE)`: JS `const.js:188–190` masked 0 → `A_NONE` (−128). **Match `align.h`.**

Callee `mk_roamer`. Clone `:14907–14923`: occupant `rloc(RLOC_NOMSG)`; `makemon(..., MM_ADJACENTOK|MM_EMIN|MM_NOMSG)`; `min_align = alignment`; `renegade = coaligned && !peaceful`; `ispriest=0`; `isminion=1`; `mon_learns_traps(-1)`; `mpeaceful = peaceful ? 1 : 0`; `msleeping=0`; `set_malign`. **Match `:735–748` for peaceful=0.** Softness: JS writes emin only `if (emin)`; C uses `EMIN()` unconditionally. With `MM_EMIN`, `newemin` is the live path; this spawn is not a null-emin case. `peaceful ? 1 : 0` vs C boolean assign: for lua `0` both store 0.

D-1526 arm. `MM_EMIN` is set, so `!(MM_EPRI|MM_EMIN)` is false. **No** `rn2(3)` on Pri-loca. **Match the Must-fix.** The emin `if` in `makemon` is untouched. **Match review 487 “do not delete.”**

`:2125–2129`. JS always `mtmp.female = female` (`find_montype_gender`). `peaceful = 0`, `BOOL_RANDOM = -1`, so `0 > -1` is true: `mpeaceful=0` + `set_malign` again. **Match C** (redundant with mk_roamer for this lua line; C does both).

Occupancy. C `:1976–1978` `enexto` then mk_roamer `:735–736` `rloc` leftover. JS `splev_resolve_occupied` then clone `rloc`. **Match that pair.** Altar `(20,7)` already has `priestini` (MM_EPRI); C relocates that occupant, then places the roamer.

Callee closure (this arm). LIVE: `makemon`, `newemin`, `Amask2align`, `set_malign`, `mon_learns_traps`, `rloc`. CLONE: `mk_roamer_splev` (verified against `:724–751` here). OMIT named: generic `splev_create_monster` mk_roamer dispatch, `mk_mplayer`, `reset_hostility`. STUB: none in the live Pri-loca arm. **The packed arm may ship.**

## Hallucinations / overclaim

Subject “Match C `create_monster`” is **true of Pri-loca `align=noalign`**. **False as the generic `splev_create_monster` dispatcher** — that helper still always `induced_align(80)` + `makemon(..., 0)` (`:11177–11219`). Map names it. This is **not** “dispatch ported, callee stubbed”: the callee used here is a C-matched clone, not a TODO. D-log “seed0367 FULL / 44/44” is the claimed focused+cadence at this SHA; this audit remeasures at HEAD. Stamping **Addressed:** D-1531 for **`:1983–1984` + `:724–751` at Pri-loca** is fair. Do **not** stamp “Match C `splev_create_monster` amask.” Do **not** stamp “Match C `mk_mplayer`.” Do **not** delete emin roaming.

## Density

+24 JS: Must-fix one caller. Playbook §2b: Must-fix stays one item. Did not glue `tamedog` / `o->lit`. Size is the C miss.

## Branch-by-branch confirm

1. Pri-loca noalign cleric: `mk_roamer` / `MM_EMIN` / `min_align=A_NONE` / no emin `rn2`. **Match.**
2. `peaceful=0 > BOOL_RANDOM`: override + `set_malign`. **Match.**
3. Female from `find_montype`. **Match `:2125`.**
4. D-1526 unflagged cleric/angel arm: still live for `makemon` without those flags. **Match; not this spawn.**
5. Pri-strt Arch Priest / acolyte: other `mndx`, RANDOM amask, still `makemon`. **Match C; 487 misname.**
6. Sanctum `placeNoalignCleric`: already `mk_roamer_splev(..., A_NONE, false)`. Untouched. **Match.**
7. Generic `splev_create_monster`: still RANDOM-only. **Named omit, not this packed line.**

## Callers / RNG ledger

C: every `create_monster` with `sp_amask != RANDOM`. JS this SHA: one packed lua line. `mk_roamer` burns no dice; skipped emin `rn2` is the seed0367 restore. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log: seed0367 **FULL** RNG 50125/50125 Scr 324/324 + strict; green+strict seed8000/0900; cohort **7**/7 + priest 0501/0106; claimed full `sessions` 44/44. Focused is the public hit. Cohort is relevant (shared mklev/makemon). This audit re-runs cadence at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix. Remaining named omits stay on the map: `splev_create_monster` / `splev_room_monster` RANDOM-only; `reset_hostility`; `mk_mplayer` role-id.

Verdict: **ACCEPT-WITH-DEBT**
