# Review 619 — 2ec50652 — dungeon.c print_mapseen altar-god coalign (D-1658)

## Metadata
- Full / short hash: `2ec506525aa4ab7e13644267709def4b09076969` / `2ec50652`
- Parent: `ee4f922a` (D-1657). This file audits **this SHA only** (second of nine `js/` commits since review **617**). Archive **Addressed:** D-1658 `2ec50652`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 14:54:53 +0200
- D-id: **D-1658**
- Stats: `js/dungeon.js` +44/−?, `js/pray.js` +26, `js/const.js` +8, `js/roles.js` +8. `js/` +86/−?. Band **150–350** (insertions **86** <250; id >454).
- Claims to close: Open `print_mapseen` altar-god coalign after D-1650. Not cemetery bones. Not dooverview PICK_ONE.
- JS / map: `dungeon.js` `count_feat_lastseentyp` / `mapseen_feat_line`; `pray.js` `altarmask_at`; `const.js` `Amask2msa`/`Msa2amask`; `roles.js` `align_gname`. `c-js-map/startup.md`.
- Prior reviews this SHA claims to close: **611** named altar-god `:3614–3618`. `reviews/loop-2026-08-15/` has no unpaid overview Must-fix.

## Intent vs deliverable

Git subject promises: `#overview` names the altar god when all seen altars coalign, instead of omitting the suffix after D-1650.

Pinned C `print_mapseen` `:3515–3728` (`node scripts/csym.mjs print_mapseen`). Suffix `:3604–3619`. `count_feat_lastseentyp` `:2950–3071`, ALTAR `:3010–3025`. Caller `recalc_mapseen` `:3074–3261` at `:3196`. `altarmask_at` `pray.c:2489–2504`. `--callers altarmask_at`: `dungeon.c:3011`, `dig.c:222`, `music.c:420`, `pager.c:745`. `align_gname` `pray.c:2529–2555` (`--callers` includes `dungeon.c:3618`). `align.h` `Amask2msa`/`Msa2amask`/`MSA_NONE` `:59–61`; `Amask2align` `:46–49`. `defsym.h` `S_altar` PCHAR **33**.

```3604:3619:nethack-c/upstream/src/dungeon.c
        if (mptr->feat.naltar > 0 || mptr->feat.ntemple > 0) {
            unsigned atmp;
            ADD2NTOBUF("temple", mptr->feat.ntemple,
                       "altar", mptr->feat.naltar);
            /* only print out altar's god if they are all to your god */
            atmp = mptr->feat.msalign;              /*    0,  1,  2,  3 */
            atmp = Msa2amask(atmp);                 /*    0,  1,  2,  4 */
            if (Amask2align(atmp) == u.ualign.type) /* -128, -1,  0, +1 */
                Sprintf(eos(buf), " to %s", align_gname(u.ualign.type));
        }
```

```3010:3025:nethack-c/upstream/src/dungeon.c
    case ALTAR:
        atmp = altarmask_at(x, y);
        atmp = (Is_astralevel(&u.uz) && (levl[x][y].seenv & SVALL) != SVALL)
               ? MSA_NONE
               : Amask2msa(atmp);
        if (!mptr->feat.naltar)
            mptr->feat.msalign = atmp;
        else if (mptr->feat.msalign != atmp)
            mptr->feat.msalign = MSA_NONE;
        count = mptr->feat.naltar + 1;
        if (count <= 3)
            mptr->feat.naltar = count;
        break;
```

Old JS: `feat.msalign` stayed 0 (`empty_feat`); feat line stopped after temple/altar counts; `align_gname` had no `A_NONE`. The diff **does** ALTAR `msalign` via LIVE `altarmask_at` + `Amask2msa`, astral incomplete `seenv` → `MSA_NONE`, suffix when `Amask2align(Msa2amask(msalign)) === u.ualign.type`, `align_gname(A_NONE)` `"Moloch"`. It **does not** port cemetery bones, knox/drawbridge castle in `count_feat`, `#if 0` water/lava/ice, or dig/music/pager `altarmask_at` callers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `print_mapseen` feat suffix | C `:3613–3619`, **LIVE this SHA** | `mapseen_feat_line` |
| `count_feat_lastseentyp` ALTAR | C `:3010–3025`, **LIVE this SHA** | do **not** add clone #2 |
| `altarmask_at` | C `:2489–2504`, **LIVE this SHA** | pray.js export |
| `Amask2msa` / `Msa2amask` | C `align.h:59–60`, **LIVE this SHA** | const.js |
| `MSA_NONE` / `Amask2align` / `SVALL` | C, **LIVE** | already in const.js |
| `align_gname` | C `:2529–2555`, **LIVE this SHA** A_NONE | roles.js; C lives in pray.c |
| `m_at` | C, **LIVE** | pray import; **4 clones** elsewhere — do **not** add #5 |
| `M_AP_TYPE` / `has_mcorpsenm` / `MCORPSENM` | C, **LIVE** | const.js |
| `S_altar` | C `defsym.h:129` **33**, **CLONE** | pray.js local; makemon.js also 33 — do **not** add #3 |
| `Is_astralevel` | C, **LIVE** | |
| cemetery bones | C `:3696–3727`, **OMIT named** | next SHA D-1659 |
| knox / drawbridge castle | C `:3040–3070`, **OMIT named** | |
| dig/music/pager `altarmask_at` | C callers, **OMIT named** | |

`node scripts/csym.mjs print_mapseen` → `:3515-3728`. `count_feat_lastseentyp` → `:2950-3071`. `recalc_mapseen` → `:3074-3261` (loop `:3194–3198`). `altarmask_at` → `pray.c:2489-2504`. `align_gname` → `pray.c:2529-2555`. `--callers print_mapseen`: `:3361`. `--callers count_feat_lastseentyp`: `:3196`. `--callers altarmask_at`: four sites. `--callers align_gname`: `dungeon.c:3618` plus pray/insight/questpgr.

RNG: none in suffix / `altarmask_at` / msa macros. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
Amask2msa        js/const.js:199   sync
Msa2amask        js/const.js:202   sync
altarmask_at     js/pray.js:209   sync
align_gname      js/roles.js:744   sync
m_at             js/mon.js:1234   sync
             !! ALSO 4 LOCAL CLONE(S) — dig/shknam/teleport/uhitm
             Do NOT add clone #5.
has_mcorpsenm    js/const.js:2978   sync
MCORPSENM        js/const.js:2969   sync
Is_astralevel    js/const.js:3032   sync
count_feat_lastseentyp NOT EXPORTED — 1 LOCAL js/dungeon.js:936
             => Do NOT write clone #2.
mapseen_feat_line NOT EXPORTED — 1 LOCAL js/dungeon.js:1209
             => Do NOT write clone #2.
```

`--can dungeon.js pray.js altarmask_at`: ALREADY. `--can dungeon.js roles.js align_gname`: ALREADY. `--can dungeon.js const.js Amask2msa`: ALREADY. `--can pray.js mon.js m_at`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `m_at` #5. Do **not** add `S_altar` #3. Do **not** add `count_feat_lastseentyp` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Count ALTAR. C `altarmask_at` then astral `seenv & SVALL != SVALL` → `MSA_NONE` else `Amask2msa`. First altar sets `msalign`; later mismatch → `MSA_NONE`; then `naltar` cap 3. JS same, `Is_astralevel(game.u?.uz)`, `loc.seenv`, LIVE macros (`align.h:59` `(AM_MASK)==4 ? 3 : AM_MASK`). **Match `:3010–3025`.** Knox/drawbridge arms after ALTAR still omitted. **Named.**

`altarmask_at`. C `isok` → `m_at` furniture `S_altar` → `has_mcorpsenm` ? `MCORPSENM` : 0; else `IS_ALTAR` → `levl.altarmask`. JS LIVE `m_at` / `M_AP_TYPE` / `has_mcorpsenm` / `MCORPSENM`; `S_altar = 33` matches `defsym.h:129`; altar field `altarmask ?? flags` is the JS rm overlay (C union). **Match `:2489–2504` for dungeon.** dig/music/pager still unwired. **Named.** Do **not** add `m_at` #5.

Print suffix. C only after temple/altar ADD2NTOBUF; `Msa2amask` then `Amask2align == u.ualign.type` then `align_gname(u.ualign.type)`. Mixed/`MSA_NONE` (0) → `Msa2amask(0)=0` → `Amask2align` `A_NONE` (`-128`); Tourist `ualign.type` is not `A_NONE` → no suffix. JS `feat.msalign`, same macros, `align_gname(game.urole, ualign)`. **Match `:3613–3619`.** Do **not** stamp Match C cemetery `:3696`.

`align_gname`. C `A_NONE` → `Moloch`; L/N/C → `urole.*god`; default `impossible` + `"someone"`; strip leading `_`. JS now `A_NONE` `'Moloch'`, then L/C/N, else `'someone'`, strip `_`. **Match the A_NONE arm this SHA claimed.** Default still skips `impossible()`. Pre-existing. Fallback `'Blind Io'` when `urole` is empty is JS chargen, not C `gu.urole`.

Callee closure (altar-god arm). LIVE: `altarmask_at`, `m_at`, `Amask2msa`/`Msa2amask`/`Amask2align`/`MSA_NONE`, `Is_astralevel`, `align_gname`, `has_mcorpsenm`/`MCORPSENM`. CLONE: `S_altar` 33 matched to `defsym.h:129`. OMIT named: cemetery; knox/castle; other-file `altarmask_at`; `#if 0` water. STUB: **none** in the suffix arm. Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject coalign `" to %s"`: **true** when `recalc_mapseen` has run and all counted altars share `msalign` equal to the hero’s god. D-log `Amask2msa(altarmask_at)`: **true.** Do **not** stamp “Match C cemetery bones.” Do **not** stamp “Match C knox/drawbridge `count_feat`.” Do **not** stamp “Match C dig.c/music.c/pager.c `altarmask_at`.” Do **not** stamp “Match C `align_gname` `impossible`.” Do **not** re-port `dooverview` PICK_ONE (D-1650). Public `#overview` feat lines are **role-hit**; the god suffix is **public-unhit** unless a session’s remembered altars are all coaligned to the hero.

## Density

+86: C ALTAR block 16 lines + suffix 7 + `altarmask_at` 16 + two macros + `A_NONE` arm. §2b one `print_mapseen` feat family. Did not glue cemetery. Above a one-`if` peel.

## Verification

Wired: first/later `msalign`; astral `SVALL`; `Msa2amask`/`Amask2align`; Moloch; mimic `S_altar`. Unwired C: bones; knox/castle; other `altarmask_at` callers. Conf: no RNG. No seed gate.

D-log private canary msalign coalign/mixed + `align_gname` Moloch/strip; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for the god suffix. Fortress `#overview` without coaligned altars does not prove `:3618`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): cemetery bones (`:3696–3727`); knox/drawbridge castle in `count_feat`; dig/music/pager `altarmask_at`; `#if 0` water/lava/ice; `align_gname` `impossible`; `S_altar` clone vs makemon. Do **not** add `m_at` #5. Do **not** add `S_altar` #3. Do **not** add `count_feat_lastseentyp` #2. Do **not** re-port `dooverview` (D-1650). Do **not** re-port overlay BIND= (D-1657).

Verdict: **ACCEPT-WITH-DEBT**
