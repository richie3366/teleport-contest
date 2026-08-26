# Review 487 — 4e78ca90 — makemon.c emin roaming ALIGNED_CLERIC/HIGH_CLERIC/ANGEL (D-1526)

## Metadata
- Full / short hash: `4e78ca90fff4c47c0b7ad7e8281aef9764ef4a62` / `4e78ca90`
- Parent: `e234a41b` (D-1525). This file audits **this SHA only** (fifth of nine `js/` commits since review **482**). Archive **Addressed:** D-1526 `4e78ca90`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 04:24:45 +0200
- D-id: **D-1526**
- Stats: 9 files, +116 / −33 — `js/makemon.js` +24 / −4. Band 150–350 (js/ insertions 24).
- Claims to close: Open `makemon.c` emin roaming (named from D-1518 / review **479**). Not dprince. `reviews/loop-2026-08-15/` has no unpaid emin Must-fix.
- JS / map: `makemon.js` after LONG_WORM. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **479** named emin/angel roaming after dprince.

## Intent vs deliverable

Git subject promises: an ordinary aligned/high cleric (or one-third of ordinary angels) gets emin roaming with `isminion`, `min_align`, and renegade XOR peaceful, not `set_malign` with no emin.

Pinned C `makemon.c` `makemon` `:1410–1428`, after LONG_WORM, before `set_malign`:

```1414:1428:nethack-c/upstream/src/makemon.c
    if ((mndx == PM_ALIGNED_CLERIC || mndx == PM_HIGH_CLERIC)
            ? !(mmflags & (MM_EPRI | MM_EMIN))
            : (mndx == PM_ANGEL && !(mmflags & MM_EMIN) && !rn2(3))) {
        newemin(mtmp);
        eminp = EMIN(mtmp);
        mtmp->isminion = 1;
        eminp->min_align = rn2(3) - 1; /* no A_NONE */
        eminp->renegade = (boolean) ((mmflags & MM_ANGRY) ? 1 : !rn2(3));
        mtmp->mpeaceful = (eminp->min_align == u.ualign.type)
                              ? !eminp->renegade
                              : eminp->renegade;
    }
    set_malign(mtmp);
```

C callers that **skip** this arm: `priest.c` `priestini` `:245` `MM_EPRI`; `mk_roamer` `:738` `MM_ADJACENTOK|MM_EMIN|MM_NOMSG` then **writes** `min_align = alignment` (may be `A_NONE`), `renegade = coaligned && !peaceful`, **no** those `rn2`s. `sp_lev.c` `create_monster` `:1983–1988`: `sp_amask != AM_SPLEV_RANDOM` → `mk_roamer`, else `makemon(..., m->mm_flags)`.

Old JS: jumped to `set_malign` after the worm (named after D-1518).

The diff **does** port that ternary and body with live `newemin`/`EMIN` and import `MM_ANGRY`. It **does not** change `load_pri_strt` (`js/mklev.js:4034–4047`): lua `des.monster({ id="aligned cleric", align="noalign", peaceful=0 })` still `makemon(pm, pos, 0)`. C is `mk_roamer` (`MM_EMIN`), so this arm must **not** run.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| emin roaming `if` | C `:1414–1427`, **LIVE this SHA** | ternary + body match C |
| `newemin` / `EMIN` | C `minion.c:17`, **LIVE** | |
| `set_malign` | C, **LIVE** | immediately after |
| `priestini` `MM_EPRI` | C `:245`, **LIVE** | mklev local; skips arm |
| `mk_roamer` | C `:724–751`, **CLONE named `mk_roamer_splev`** | sanctum uses it; **Pri-strt does not** |
| `MM_ANGRY` | C `hack.h:1152`, **LIVE this SHA** | imported |
| `discard_minvent` / `set_apparxy` | C, **OMIT named** | |

`node scripts/sym.mjs newemin EMIN makemon mk_roamer priestini set_malign`:

```
newemin          js/makemon.js:199   sync
EMIN             js/const.js:2931   sync
makemon          js/makemon.js:2070   sync
mk_roamer        NOT FOUND in js/** (no export, no local function/const).
priestini        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:16147
set_malign       js/makemon.js:486   sync
```

This SHA does **not** delete a symbol. `mk_roamer` is only `mk_roamer_splev` (sanctum). Pri-strt still has no `MM_EMIN`. `newemin` is LIVE, not a stub.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** unflagged cleric always `rn2(3)` then maybe `!rn2(3)`; unflagged angel burns `!rn2(3)` on the gate. **Public hit:** seed0367 priest-quest-tour **FAIL** at this SHA (bisect: PASS at `e234a41b`, FAIL RNG **5239**/50125 from `4e78ca90` through HEAD). Screens still 324/324.

## C ↔ JS fidelity

Ternary. Cleric/high: `!(MM_EPRI|MM_EMIN)`, **no** `rn2` on the gate. Non-cleric: `mndx==ANGEL && !MM_EMIN && !rn2(3)`; other mndx short-circuits before `rn2`. JS `:2395–2397` the same. **Match the C `if`.** `pm('ALIGNED_CLERIC')` is `PM_ALIGNED_CLERIC`. **Match.** Acolyte / Arch Priest are **other** `mndx` (`PM_ACOLYTE` / unique) and do **not** take this arm. **Match.**

Body. `newemin`; `isminion=1`; `min_align = rn2(3)-1` (never `A_NONE`); `renegade = MM_ANGRY ? 1 : !rn2(3)`; peaceful = coalign `!renegade` else `renegade`. JS `:2399–2407` uses `renegade ? 0 : 1` for the coalign arm. **Match `:1423–1427`.** `newemin` does not set `isminion` (comment). **Match minion.c.**

Callee closure (this arm). LIVE: `newemin`, `EMIN`, `rn2`, `set_malign`. CLONE: none in the body. OMIT named: `discard_minvent`. STUB: none. **The C function arm may ship.**

**Caller contract is not C.** C `create_monster` `:1983–1984`: non-random `sp_amask` (including `align="noalign"` → `AM_NONE`) calls `mk_roamer` → `MM_EMIN` → **skip** this arm; `min_align` is `A_NONE`, **zero** extra `rn2`. Sanctum JS `placeNoalignCleric` already uses `mk_roamer_splev`. **`load_pri_strt` `:4042` uses `makemon(..., 0)`.** After this SHA that spawn **takes the roaming arm**: two `rn2(3)` that C never burns, and `min_align` in {-1,0,1} not `A_NONE`. The following `mpeaceful=0` does not put those dice back. **That is the seed0367 break.** Not a stub inside the new `if`. It **is** “ported the special-type init as if every JS caller passed C’s flags.”

## Hallucinations / overclaim

Subject ordinary cleric/high/angel get emin, not bare `set_malign`: **true of the C `if` body**. **False as Pri-strt `align=noalign` aligned cleric** — C never uses this arm there. D-log canary 40/40 (flags skip, `MM_ANGRY`, angel mix): **true of isolated `makemon`**. D-log “Public-unhit until ordinary cleric without flags”: **false** — seed0367 is that spawn. Cohort 7/7 omitted priest-quest. Stamping **Addressed:** D-1526 for **`:1410–1428`** is fair only with the caller C-wrong queued. Do **not** stamp “Match C `mk_roamer`.” Do **not** treat fortress 44/44 as still true at HEAD. `newemin` is **not** a stub.

## Density

+24 JS: one C `if`. Did not glue `S_hcdoor`. Playbook §2b size is fine. Shipping it while Pri-strt still `makemon(..., 0)` is the quality miss.

## Branch-by-branch confirm

1. `MM_EPRI` priestini: skip, no emin `rn2`. **Match.**
2. `MM_EMIN` mk_roamer: skip. **Match C; Pri-strt JS does not take this path.**
3. Unflagged ALIGNED_CLERIC: always emin + two `rn2(3)` (angry skips second). **Match C `makemon`; wrong for lua noalign.**
4. Unflagged HIGH_CLERIC: same. **Match.**
5. Unflagged ANGEL: `!rn2(3)` then maybe body. **Match.**
6. Jackal / acolyte / Arch Priest: no gate `rn2`. **Match.**
7. `min_align` never `A_NONE` in this arm. **Match C comment; contradicts lua noalign `A_NONE`.**
8. **seed0367 FAIL** at first Pri-strt noalign cleric.

## Callers / RNG ledger

C: any `makemon` of those mndx. JS the same plus a packed lua clone that should have been `mk_roamer`. No seed gate. Extra `rn2(3)` is C-wrong vs `create_monster`, not vs the `makemon` snippet.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log: private canary **40**/40; green+strict seed8000/0900; cohort **7**/7 **without seed0367**. This audit: seed0367 PASS at parent, **FAIL** RNG 5239/50125 from this SHA. **Not public-unhit.** Cohort was the wrong set for a priest-quest cleric.

## Actionable C-wrongs

1. **`load_pri_strt` `align=noalign` aligned cleric** (`js/mklev.js:4034–4047`): call `mk_roamer` / `mk_roamer_splev` (`MM_EMIN`, `min_align=A_NONE`, no roaming `rn2`) like C `sp_lev.c:1983–1984` + `priest.c:738–746`, not `makemon(..., 0)`. One port. Do **not** delete the emin arm (it matches `makemon.c:1414–1427`).

Verdict: **QUALITY-RISK**
