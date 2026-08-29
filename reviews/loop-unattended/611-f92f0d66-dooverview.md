# Review 611 — f92f0d66 — dungeon.c dooverview PICK_ONE + print_mapseen (D-1650)

## Metadata
- Full / short hash: `f92f0d662d0ca8d620b1e8958304a78f6f0d3f18` / `f92f0d66`
- Parent: `90077834` (D-1649). This file audits **this SHA only** (third of nine `js/` commits since review **608**). Archive **Addressed:** D-1650 `f92f0d66`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 12:54:46 +0200
- D-id: **D-1650**
- Stats: `js/dungeon.js` +244/−105, `js/questpgr.js` +1/−1. Band **150–350** (`js/` insertions **245** <250; id >454).
- Claims to close: Open `dooverview` PICK_ONE after D-0110. Not doextlist (D-1625). Not convert_arg (D-1649). `reviews/loop-2026-08-15/` has no unpaid overview Must-fix.
- JS / map: `dungeon.js` `dooverview` / `show_overview` / `print_mapseen`. `c-js-map/startup.md`.
- Prior reviews this SHA claims to close: map named PICK_NONE after D-0110; **585** already had `query_annotation`.

## Intent vs deliverable

Git subject promises: m-prefix `#overview` uses PICK_ONE and `query_annotation` on the picked ledger, instead of always PICK_NONE after D-0110.

Pinned C `dungeon.c` `dooverview` `:3293–3301` (`node scripts/csym.mjs dooverview`). `show_overview` `:3304–3340`. `traverse_mapseenchn` `:3343–3365`. `print_mapseen` `:3515–3728`. `--callers dooverview`: `donamelevel` `:2574` only (extcmd/cmd bind is `cmd.c` table). `--callers show_overview`: `:3298`, `end.c:605/:696`. Callees `ledger_to_dnum` `:1401–1416` (`:3334`); `ledger_to_dlev` `:1421–1426` (`:3335`); `query_annotation` `:2498–2567` (`:3336`); `donamelevel` `:2570–2577`; `interest_mapseen` `:2879–2923`; `endgamelevelname` `:3409–3437`; `builds_up` `:1476–1493`; `tunesuffix` `:3458–3476`; `ldrname` `questpgr.c:49–57`.

```3293:3338:nethack-c/upstream/src/dungeon.c
    show_overview(iflags.menu_requested ? -1 : 0, 0);
    iflags.menu_requested = FALSE;
    ...
    n = select_menu(win, (why != -1) ? PICK_NONE : PICK_ONE, &selected);
    if (n > 0) {
        ledger = selected[0].item.a_int - 1;
        lev.dnum = ledger_to_dnum(ledger);
        lev.dlevel = ledger_to_dlev(ledger);
        query_annotation(&lev);
```

Old JS: `show_overview(0,0)` always; `donamelevel` cleared `menu_requested` first; PICK_NONE `nhgetch` loop; no ledger identifier. The diff **does** keep the flag through `donamelevel`, why==-1 `select_menu_pick_one` with `a_int = ledger_no+1`, C-home ledger helpers, two-pass traverse, named-place / `builds_up` / `endgamelevelname` / `ldrname` export. It **does not** port altar-god coalign or cemetery bones beyond the disclosure dead-hero line. Named. It **does not** re-point `teleport.js` ledger clones.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dooverview` | C `:3293–3301`, **LIVE this SHA** | ASYNC |
| `show_overview` | C `:3304–3340`, **LIVE this SHA** | PICK_NONE still nhgetch analogue |
| `traverse_mapseenchn` | C `:3343–3365`, **CLONE** (C-home local) | two-pass XOR |
| `print_mapseen` | C `:3515–3728`, **LIVE this SHA** (partial) | |
| `ledger_to_dnum` / `ledger_to_dlev` | C `:1401–1416` / `:1421–1426`, **LIVE this SHA** | teleport.js **clone #2 diverges** |
| `query_annotation` | C `:2498–2567`, **LIVE** | D-1624; now also PICK_ONE |
| `donamelevel` | C `:2570–2577`, **LIVE this SHA** | no longer clears flag first |
| `interest_mapseen` | C `:2879–2923`, **LIVE** | why==0 filter |
| `endgamelevelname` | C `:3409–3437`, **LIVE** | display.js |
| `builds_up` | C `:1476–1493`, **LIVE** | hacklib.js |
| `tunesuffix` | C `:3458–3476`, **CLONE** | |
| `ldrname` | C questpgr.c `:49–57`, **LIVE** | export this SHA |
| `select_menu_pick_one` | C `select_menu` PICK_ONE, **LIVE** | |
| `formatkiller` | C, **LIVE** | disclosure cemetery |
| altar-god coalign | C `:3614–3618`, **OMIT named** | |
| cemetery bones list | C `:3696–3727`, **OMIT named** | Open row |
| `#if 0` water/lava/ice | C `:3625–3628`, **OMIT** (C too) | |

`node scripts/csym.mjs dooverview` → `:3293-3301`. `show_overview` → `:3304-3340`. `traverse_mapseenchn` → `:3343-3365`. `print_mapseen` → `:3515-3728`. `ledger_to_dnum` → `:1401-1416`. `ledger_to_dlev` → `:1421-1426`. `query_annotation` → `:2498-2567`. `donamelevel` → `:2570-2577`. `endgamelevelname` → `:3409-3437`. `builds_up` → `:1476-1493`. `tunesuffix` → `:3458-3476`. `ldrname` → `questpgr.c:49-57`. `--callers dooverview`: `:2574`. `--callers show_overview`: `:3298`, `end.c:605/:696`. `--callers traverse_mapseenchn`: `:3323/:3326`. `--callers print_mapseen`: `:3361`. `--callers query_annotation`: `:2575/:3336`. `--callers ledger_to_dnum`: includes `:3334`. `--callers tunesuffix`: `:3663`. `--callers builds_up`: includes `:3543`. `--callers endgamelevelname`: includes `:3560`.

RNG: none in this SHA’s overview path. No seed gate. Diff **deletes** a seed4500 dismiss comment.

`node scripts/sym.mjs` on new / re-pointed names:

```
dooverview       js/dungeon.js:1548   ASYNC — await required
show_overview    js/dungeon.js:1501   ASYNC — await required
ledger_to_dnum   js/dungeon.js:585   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/teleport.js:2609
ledger_to_dlev   js/dungeon.js:601   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — js/teleport.js:2621
donamelevel      js/dungeon.js:1486   ASYNC — await required
endgamelevelname js/display.js:3854   sync
builds_up        js/hacklib.js:46   sync
ldrname          js/questpgr.js:447   sync
select_menu_pick_one js/options.js:1008   ASYNC — await required
formatkiller     js/end.js:220   sync
```

`--can dungeon.js questpgr.js ldrname`: NEW-CYCLE, `ldrname` hoisted, **VERDICT: SAFE**. Same for `endgamelevelname` / `select_menu_pick_one` / `formatkiller`. Dynamic `import()` is not required by TDZ; it is not a cycle-forced clone. `--can teleport.js dungeon.js ledger_to_dnum`: **ALREADY** (teleport already imports dungeon.js). Do **not** stamp “cycle-forced clone” for the teleport copies. Do **not** add ledger clone #3.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names in control flow in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`dooverview`. C `show_overview(menu_requested ? -1 : 0, 0)` then clear the flag. JS the same after `await`. **Match `:3293–3301`.**

`donamelevel`. C `if (menu_requested) return dooverview();` **without** clearing first. JS was clearing first; this SHA **fixes** that. **Match `:2570–2577`.**

`show_overview` two-pass. C: if `In_endgame(u.uz)` traverse `viewendgame=1` (Planes); if `why>0 || !In_endgame` traverse `0`. JS the same. **Match `:3322–3326`.** `traverse` `viewendgame ^ In_endgame(mptr)` skip: JS `!!viewendgame !== !!In_endgame`. **Match `:3355–3356`.** `why!=0 || interest_mapseen`: why==-1 lists **all** seen levels. **Match `:3358–3362`.** `lastdun` starts -1. **Match.**

PICK_ONE. C `select_menu(PICK_ONE)` when why==-1; `a_int = ledger_no+1`; `ledger = a_int-1`; `ledger_to_dnum`/`ledger_to_dlev`; `query_annotation(&lev)`. JS `select_menu_pick_one`; same identifier; cancel skips. **Match `:3328–3337`.** PICK_NONE still the pre-existing nhgetch loop (D-0110 analogue), not tty `select_menu`.

`ledger_to_dnum`. C `ledger_start < ledgerno <= ledger_start + num_dunlevs`; else panic. JS the same inequality, **return 0** instead of panic. In-range PICK_ONE ledgers **Match `:1401–1416`.** `ledger_to_dlev` = `ledgerno - ledger_start`. **Match `:1421–1426`.** teleport.js clone uses `start <= x < start+n` (**not C**). Pre-existing; this SHA did not re-point. `--can` is ALREADY.

`print_mapseen` heading. Quest/Knox `depthstart=1` else `dungeons[dnum].depth_start`. Header: ureached==entry or endgame → `"%s:"`; else `builds_up` `"levels %d up to %d"` else `"levels %d to %d"`. JS `builds_up(mptr.lev)` from hacklib (C body without `impossible`). **Match `:3532–3553`.**

Level row. `i = depthstart + dlevel - 1`; endgame `endgamelevelname` else `Level %d:`; why!=-1 TAB; wizard `[proto]`; custom quotes; you-are/left/were. why==-1 `a_int = ledger_no+1`. **Match `:3556–3584`.** `endgamelevelname` display.js -5..-1 **Match `:3409–3437`.**

Feat sentence. Shop n>1 / `an(shop_string)`; ADD2NTOBUF temple/altar; throne…tree; capitalize PREFIX; `.`. **Match `:3589–3636` minus altar-god.** `#if 0` water/lava/ice omitted in C too.

Named-place mutually exclusive + `quest_summons` extra. Oracle / Sokoban solved / bigroom / rogue / Home+ldrname / Ludios / castle `tunesuffix` / valley / vibrating / sanctum. **Match `:3638–3678`.** `tunesuffix` castletune && uheard_tune; ==2 notes else 5-note. **Match `:3458–3476`.**

Branch line `br_string2` + dest dname + `end1_up && !In_endgame(end2)` depth. **Match `:3681–3693`.**

Cemetery. C `final_resting_place || final>0` then known bones + disclosure you-killer. JS only `why>0 && onHere` dead-hero line. **Not Match `:3696–3727`.** Named (already Open).

Callee closure (PICK_ONE arm). LIVE: `recalc_mapseen`, `interest_mapseen`, `ledger_no`, `ledger_to_dnum`, `ledger_to_dlev`, `query_annotation`, `select_menu_pick_one`, `endgamelevelname`, `builds_up`, `ldrname`, `Is_special`, `In_endgame`. CLONE: `tunesuffix`, `traverse_mapseenchn`, feat/named-place helpers (matched). OMIT named: altar-god, cemetery bones. STUB: **none** in the PICK_ONE path. Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject m-prefix PICK_ONE + `query_annotation`: **true.** D-log two-pass / named-place / `builds_up` / `endgamelevelname`: **true.** D-log seed4500 PASS: **claimed; this review does not re-run.** Do **not** stamp “Match C altar-god coalign.” Do **not** stamp “Match C cemetery bones list.” Do **not** stamp “Match C `ledger_to_dnum` in teleport.js.” Do **not** stamp “Match C `select_menu` PICK_NONE tty.” Public `#overview` is **role-hit**; m-prefix PICK_ONE is **public-unhit** unless a session uses `m` then `#overview`.

## Density

+245: C `print_mapseen` 214 + show/traverse/ledger/donamelevel. §2b one `dungeon.c` overview family. Did not glue altar-god as a dummy suffix. Above a one-`if` peel.

## Verification

Wired: why==-1 identifier; ledger convert; two-pass XOR; `donamelevel` flag. Unwired C: altar-god; bones; teleport clones. Conf: no `rn2`. No seed gate.

D-log green+strict seed8000/0900; cohort **7**/7 + strict; seed4500 PASS. **Public-unhit** for m-prefix pick. Fortress does not prove `query_annotation` on a picked other level.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): altar-god coalign (`:3614–3618`); cemetery bones (`:3696–3727`); teleport.js `ledger_to_dnum`/`ledger_to_dlev` clone #2 (`>= start && < start+n` vs C `start < x <= start+n` — import dungeon.js, `--can` ALREADY). Do **not** add ledger clone #3. Do **not** re-port convert_arg (D-1649). Do **not** re-port `doextlist` (D-1625). Do **not** stamp cycle-forced for `ldrname` (SAFE hoisted).

Verdict: **ACCEPT-WITH-DEBT**
