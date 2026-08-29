# Review 646 — 69a1451f — dungeon.c save_mapseen cemetery JSON (D-1685)

## Metadata
- Full / short hash: `69a1451f1e4f88e7114f9997cbc3d4873ab10190` / `69a1451f`
- Parent: `01f25fda` (D-1684). This file audits **this SHA only** (second of nine `js/` commits since review **644**). Archive **Addressed:** D-1685 `69a1451f`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 21:57:42 +0200
- D-id: **D-1685**
- Stats: `js/dungeon.js` +197/−0; `js/save.js` +18/−0; `js/bones.js` +3/−40. Total `js/` insertions **218** <250. Band **150–350**.
- Claims to close: Open `save_mapseen` cemetery JSON after D-1659 in-memory cemetery list. Not `print_mapseen` cemetery (D-1659). Not knox/drawbridge print. Not `yyyymmddhhmmss` when[] **generation**. `reviews/loop-2026-08-15/` has no unpaid cemetery-persist Must-fix.
- JS / map: `dungeon.js` save/load/cemetery; `save.js` `dosave0`/`try_restore_save`; `bones.js` drops `serCemetery`. `c-js-map/startup.md`.
- Prior reviews this SHA claims to close: **620** named persist (D-1659 shipped the list, not JSON).

## Intent vs deliverable

Git subject promises: JSON save/restore persists mapseen cemetery (and savelev bonesinfo) via `savecemetery`/`restcemetery`, instead of dropping `final_resting_place` after D-1659.

`node scripts/csym.mjs save_mapseen` → `dungeon.c:2694–2717`. `--callers`: prototype `:75`; `save_dungeon` `:186`. `load_mapseen` `:2720–2754` (`--callers` `:35` / `:74` / `:255`). `savecemetery` `save.c:616–637` (`--callers` `dungeon.c:201` FREEING, `:2716` inside `save_mapseen`, `#else` `:2826` compiled out; `save.c:505` savelev; `extern.h:2830`). `restcemetery` `restore.c:987–1017` (`--callers` `dungeon.c:2752`; `restore.c:1102` getlev). `save_dungeon` `:148–206` (`save.c:313`). `restore_dungeon` `:211–263` (`restore.c:702`).

```2694:2716:nethack-c/upstream/src/dungeon.c
save_mapseen(NHFILE *nhfp, mapseen *mptr)
{
    ...
    for (brindx = 0, curr = svb.branches; curr; curr = curr->next, ++brindx)
        if (curr == mptr->br)
            break;
    Sfo_int(nhfp, &brindx, "mapseen-branch_index");
    ...
    savecemetery(nhfp, &mptr->final_resting_place);
}
```

```616:637:nethack-c/upstream/src/save.c
    flag = *cemeteryaddr ? 0 : -1;
    ...
    while ((thisbones = nextbones) != 0) {
        nextbones = thisbones->next;
        if (update_file(nhfp))
            Sfo_cemetery(nhfp, thisbones, "cemetery-bonesinfo");
        if (release_data(nhfp))
            free((genericptr_t) thisbones);
    }
```

```987:1006:nethack-c/upstream/src/restore.c
    Sfi_int(nhfp, &cflag, "cemetery-cemetery_flag");
    if (cflag == 0) {
        bonesaddr = cemeteryaddr;
        do {
            bonesinfo = (struct cemetery *) alloc(sizeof *bonesinfo);
            Sfi_cemetery(nhfp, bonesinfo, "cemetery-bonesinfo");
            *bonesaddr = bonesinfo;
            bonesaddr = &(*bonesaddr)->next;
        } while (*bonesaddr);
    } else {
        *cemeteryaddr = 0;
    }
```

Old JS: D-1659 cloned cemetery in memory / `#overview`; `dosave0` had **no** `mapseenchn` / `bonesinfo`; bones.js local `serCemetery`/`deserCemetery` for bones files only. The diff **does** JSON analogues of `save_mapseen`/`load_mapseen`/`savecemetery`/`restcemetery`, wires `dosave0`/`try_restore_save`, and re-points bones to the live helpers. It **does not** port `save_dungeon` tune/`level_info`/`inv_pos`, FREEING `savecemetery` (`:190–204`), CONVERTING rest (`:1007–1016`), or `print_mapseen` knox/drawbridge. Named those.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `save_mapseen` | C `:2694–2717`, **LIVE this SHA** | JSON analogue, not binary Sfo_* |
| `load_mapseen` | C `:2720–2754`, **LIVE this SHA** | branch_index walk after `game.branches` |
| `save_mapseenchn` / `restore_mapseenchn` | C `save_dungeon` `:179–187` / `restore_dungeon` `:251–262`, **LIVE this SHA** | JSON array ≡ count+walk |
| `savecemetery` | C `save.c:616–637`, **LIVE this SHA** | empty `[]` ≡ flag -1 |
| `restcemetery` | C `restore.c:987–1017`, **LIVE this SHA** | empty/missing → NULL |
| `serCemetery` / `deserCemetery` | **deleted clones** | bones re-points to LIVE |
| savelev `bonesinfo` | C `save.c:505`, **LIVE this SHA** | current level only (JSON single file) |
| getlev `bonesinfo` | C `restore.c:1102`, **LIVE this SHA** | |
| FREEING `save_dungeon` `:200–201` | **OMIT named** | JSON keeps the live chain |
| CONVERTING rest | C `:1007–1016`, **OMIT named** | |
| remdun `#else` 3-arg `savecemetery` | C `:2826`, **compiled out** | `#if 1` notreachable |
| knox/drawbridge print | **OMIT named** | not this persist |
| `yyyymmddhhmmss` when[] generate | **OMIT named** | persist copies the string |
| `#if 0` water/lava/ice feat | C `:2959–2983` / `:3625–3629` | C never counts; empty_feat skip ≡ 0 |

RNG: none in these functions. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
savecemetery     js/dungeon.js:1011   sync
restcemetery     js/dungeon.js:1034   sync
save_mapseen     js/dungeon.js:1064   sync
load_mapseen     js/dungeon.js:1114   sync
save_mapseenchn  js/dungeon.js:1163   sync
restore_mapseenchn js/dungeon.js:1177   sync
serCemetery      NOT FOUND in js/** (no export, no local function/const).
deserCemetery    NOT FOUND in js/** (no export, no local function/const).
```

`--can bones.js dungeon.js savecemetery`: **ALREADY**. `--can save.js dungeon.js save_mapseenchn`: **ALREADY**. Do **not** restore `serCemetery` #2. Do **not** add `savecemetery` clone in bones.js.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**`save_mapseen` field order.** C: branch_index, `d_level`, feat, flags, `custom_lth`, custom, `msrooms[(MAXNROFROOMS+1)*2]`, `savecemetery`. JS object with those keys. Branch walk: JS array `game.branches` ≡ C `svb.branches` next; miss → `brindx === length` ≡ C nbranches. **Match `:2700–2716`.** `custom_lth` 0 → no custom bytes; JS `null`. **Match `:2708–2712`.**

**feat / flags.** C `Sfo_mapseen_feat` / `Sfo_mapseen_flags` the whole structs (`dungeon.h:191–238`). JS copies `empty_feat()` keys (no water/lava/ice) and number/boolean flag keys. C `#if 0` skips counting/printing water/lava/ice (`:2959–2983`, `:3625–3629`), so those bits stay 0; omitting them in JSON ≡ persist of zeros. `msrooms` only `seen`/`untended` (`:241–244`). **Match the live bitfields.** Do **not** stamp “Match C print knox/drawbridge” — that is `print_mapseen`, named.

**`savecemetery` JSON analogue.** C writes flag then nodes (last `next==0`); FREEING frees. JS walks `.next` into an array of who/how/when/frpx/frpy/bonesknown; empty → `[]`. `who`/`how`/`when` sliced to C buffer-minus-NUL (`rm.h:418–429`; `PL_NSIZ_PLUS-1` / 100 / 14). **Match the live write, not FREEING.** Bones files used the same shape via the deleted clone; re-point is not a format break.

**`restcemetery`.** C flag 0 → do-while `Sfi_cemetery` until `next==0`; else NULL. JS: non-array or `length===0` → `null`; else rebuild `.next`. Skips JSON `null` slots (C has no null records). CONVERTING free omitted. **Match the live restore.**

**`save_dungeon` / `restore_dungeon` mapseen walk.** C count then each `save_mapseen` / `load_mapseen` (`:179–187`, `:251–262`). JS array length is the count. `restore_mapseenchn`: missing key leaves the in-memory chain (old JSON); present array including `[]` replaces. C always has count; the leave-chain is JSON compatibility, named in the comment. `try_restore_save` sets `game.branches` (`save.js:508`) **before** `restore_mapseenchn` (`:577`). **Match C “after branches”.**

**savelev / getlev bonesinfo.** C `save.c:505` / `restore.c:1102` on the current level NHFILE. JS `dosave0` / `try_restore_save` write/read `payload.bonesinfo`. Off-level bones live on `mapseen.final_resting_place` (D-1659 clone) now inside `mapseenchn`. Multi-level ledger files remain the named `dosave0` omit. **Match the JSON single-file envelope.**

Callee closure (`save_mapseen`). LIVE: `savecemetery` (this SHA). CLONE: none remaining (`serCemetery` deleted). OMIT named: FREEING, CONVERTING, knox/drawbridge print, when[] generate, tune/`level_info`/`inv_pos`. STUB: **none**. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject “JSON … via savecemetery/restcemetery”: **true** (JSON analogue, not binary Sfo). D-log “bones.js uses the live helpers”: **true** (`serCemetery` NOT FOUND). Do **not** stamp “Match C binary NHFILE.” Do **not** stamp “Match C `print_mapseen` knox/drawbridge.” Do **not** stamp “Match C `yyyymmddhhmmss` when[] writer.” Do **not** stamp “Match C FREEING `savecemetery`.” Private canary (round-trip who/how/frpx/brindx/custom; empty flag -1; old-save leave-chain) is the right split. Public-unhit for `#overview` after save/restore except seed0013 restore.

## Density

+218: one persist cluster (`save_mapseen` family + savelev bonesinfo + delete bones clones). §2b. Did not glue rub/swap/whatis.

## Verification

Wired: mapseenchn cemetery round-trip; savelev `bonesinfo`; bones files share helpers; empty → NULL. Unwired C: FREEING; CONVERTING; knox/drawbridge print; when[] generate; water/lava/ice `#if 0`. Conf: no `rn2`. No seed gate.

Journal: private canary **20**/20; green+strict seed8000/0900; cohort **7**/7 + restore seed0013 + strict. Cadence **#2090** at `d2bcd227`: **44**/44. This audit’s full `sessions` is at HEAD.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): knox/drawbridge `print_mapseen`; `yyyymmddhhmmss` when[] generate; FREEING / CONVERTING; `save_dungeon` tune/`level_info`/`inv_pos`; `#if 0` water/lava/ice. Do **not** restore `serCemetery`. Do **not** add `savecemetery` #2 in bones.js. Do **not** re-port `print_mapseen` cemetery list (D-1659). Do **not** re-port D-1684 via_menu.

Verdict: **ACCEPT-WITH-DEBT**
