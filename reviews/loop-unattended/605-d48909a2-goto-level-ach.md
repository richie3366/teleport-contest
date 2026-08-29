# Review 605 — d48909a2 — do.c goto_level ACH_ENDG/ASTR/BGRM + Knox + entered livelog (D-1644)

## Metadata
- Full / short hash: `d48909a22071ff88bd6294827b5fe8e27fc616d6` / `d48909a2`
- Parent: `e1171a1a` (D-1643). This file audits **this SHA only** (sixth of nine `js/` commits since review **599**). Archive **Addressed:** D-1644 `d48909a2`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 11:11:42 +0200
- D-id: **D-1644**
- Stats: `js/insight.js` +76/−5, `js/do.js` +41/−19, `js/const.js` +9, `js/pline.js` +2/−1, `js/sndprocs.js` +1. Band **150–350** (js/ insertions **129** <250; id >454).
- Claims to close: Open ACH_ASTR after D-1616. Not SoundAchievement. Not overlay BIND= (D-1643). `reviews/loop-2026-08-15/` has no unpaid ACH_ASTR Must-fix. Review **577** named ACH_ASTR after `final_level`.
- JS / map: `do.js` `goto_level`; `insight.js` `record_achievement` / `achieve_msg`; `const.js` `Is_bigroom` / `Is_knox`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named ACH_ENDG/ASTR/BGRM + Knox + entered livelog after D-0805/D-0928 #1181/D-1616.

## Intent vs deliverable

Git subject promises: first Astral/endgame/bigroom record ACH_ASTR/ENDG/BGRM, Knox alarms until Croesus dies, and new levels livelog `entered %s`, instead of omitting those arms after D-0805.

Pinned C `do.c` `goto_level` `:1478–1998` (`node scripts/csym.mjs goto_level`). Arrival envelope `:1881–1959`. `--callers goto_level`: `dungeon.c:1508/:1512/:1535/:1541/:1962`, `do.c:1287/:2085`, `dig.c:791`, `potion.c:1105`, `artifact.c:1928` (plus comments). Callee `insight.c` `record_achievement` `:2406–2472` (`--callers` includes `do.c:1872` ACH_HELL, `:1884` ENDG, `:1887` ASTR, `:1907` MINE, `:1910` SOKO, `:1915` BGRM). `achieve_msg[]` `insight.c:57–101`. `botl.c` `describe_level` `:440–476`. `pline.c` `livelog_printf` `:513–526` (file `livelog_add` still in C; second `#else` body `:537–542` is empty). `dungeon.h` `Is_knox` `:135` / `Is_bigroom` `:131`. `final_level` is D-1616.

```1881:1916:nethack-c/upstream/src/do.c
    if (In_endgame(&u.uz)) {
        if (newdungeon)
            record_achievement(ACH_ENDG);
        if (new && on_level(&u.uz, &astral_level)) {
            final_level();
            record_achievement(ACH_ASTR);
        } else if (newdungeon && u.uhave.amulet) {
            resurrect();
        }
    } else if (In_quest(&u.uz)) {
        onquest();
    } else if (Is_knox(&u.uz)) {
        if (new || !svm.mvitals[PM_CROESUS].died) {
            You("have penetrated a high security area!");
            ...
        }
    } else if (In_mines(&u.uz)) {
```

Old JS: ACH_HELL/MINE/SOKO live; ACH_ENDG/ASTR comments; Knox/BGRM deferred; Tourist XP on `madeNew` without the entered livelog. The diff **does** the else-if chain, `achieve_msg` table + livelog after duplicate skip, `Is_bigroom`/`Is_knox` aliases, `%d`/`%ld` in `livelog_printf`. It **does not** port `SoundAchievement`, MICRO Valley `display_nhwindow`, or file `livelog_add`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goto_level` arrival | C `:1881–1959`, **LIVE this SHA** | `do.js`; `madeNew` ≡ C `new` |
| `record_achievement` | C `:2406–2472`, **LIVE this SHA** (livelog arm) | append was already live; SoundAchievement **OMIT named** |
| `achieve_msg[]` | C `insight.c:57–101`, **CLONE** | ordered per `you.h`; ranks 23..30 empty msg |
| `Is_bigroom` | C dungeon.h `:131`, **LIVE this SHA** | `bigroom_level` already from dungeon.js `bigrm` |
| `Is_knox` | C dungeon.h `:135`, **LIVE this SHA** | alias of existing `Is_knox_level`; `goto_level` still calls `Is_knox_level` |
| `describe_level` | C botl.c `:440–476`, **LIVE** | JS `(dflgs=1)` return-string analogue; this SHA passes `2` |
| `livelog_printf` | C pline.c `:513–526`, **LIVE this SHA** (`%d`) | file `livelog_add` **OMIT named** |
| `se_alarm` | C seffects, **LIVE this SHA** | re-export; contest `Soundeffect` empty |
| `final_level` | C do.c `:2042–2053`, **LIVE** | D-1616; ACH_ASTR after return |
| `SoundAchievement` | C insight.c `:2438`, **OMIT named** | even on repeat |
| `impossible` bad achidx | C `:2416–2418`, **OMIT** (pre-existing silent return) | |
| MICRO Valley More | C do.c `:1866`, **OMIT named** | |

`node scripts/csym.mjs goto_level` → `do.c:1478-1998`. `record_achievement` → `insight.c:2406-2472`. `describe_level` → `botl.c:440-476`. `livelog_printf` → `pline.c:513-526`. `--callers record_achievement`: `do.c:1884/:1887/:1915` among 33. `--callers goto_level`: 28 refs (real calls listed above).

RNG: none in this SHA’s arrival arms or `record_achievement`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
record_achievement js/insight.js:280   sync
Is_bigroom       js/const.js:3059   sync
Is_knox          js/const.js:3057   sync
livelog_printf   js/pline.js:23   sync
describe_level   js/display.js:3873   sync
goto_level       js/do.js:1354   ASYNC — await required
```

`--can do.js insight.js record_achievement`: ALREADY. `--can do.js pline.js livelog_printf`: ALREADY. `--can do.js sndprocs.js se_alarm`: ALREADY. `--can insight.js pline.js livelog_printf`: ALREADY. Do **not** stamp “cycle-forced clone.”

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Arrival chain. C `if In_endgame` / `else if In_quest` / `else if Is_knox` / `else if In_mines` / `else if In_sokoban` / `else` rogue else bigroom. JS the same order. ACH_ENDG on `newdungeon` not `new`. ACH_ASTR after `await final_level()` when `madeNew && Is_astralevel` — C `new && on_level(&u.uz, &astral_level)`. Else-if amulet `resurrect` only when not that Astral arm. Quest `onquest` skips Knox (mutually exclusive levels). **Match `:1881–1916`.**

Knox. C `new || !mvitals[PM_CROESUS].died`. JS `madeNew || !(mvitals[PM_CROESUS].died|0)`. You/pline strings **Match**. `Soundeffect(se_alarm, 100)` imported. fmon walk skips DEADMONSTER; JS `mhp<1` analogue, snapshot `[...fmon]`. `msleeping=0`. Alarm still runs on a *revisit* while Croesus lives (`!new && !died`). **Match `:1893–1904`.**

Bigroom. C `new && Is_bigroom` in the else of mines/soko (so not in Gehennom/quest/knox). JS `madeNew && Is_bigroom` after rogue pline else. `Is_bigroom` is Lcheck `bigroom_level`; dungeon.js already maps `bigrm` → `bigroom_level`. **Match `:1912–1915` and dungeon.h `:131`.** Do not stamp “Match C if `bigroom_level` were invented this SHA.”

Entered livelog. C moved after achievements: `if (new) { describe_level(dloc, 2); livelog_printf(major?LL_ACHIEVE:LL_DEBUG, "entered %s", dloc); Tourist more_experienced(level_difficulty(), 0); newexplevel(); }`. `major` = endgame and not Astral, or quest. JS `describe_level(2)` returns the string (`dflgs&2` branch name, not trailing space). **Match botl.c `:440–476` flags.** Tourist XP uses `depth(u.uz)` not `level_difficulty()` — **named analogue** (already the old JS formula, now inside the same `if (madeNew)` as livelog so order **Match**). File `livelog_add` / tab subst **OMIT named**.

`record_achievement`. Range check, abs duplicate scan, skip recording on repeat. C still `SoundAchievement` on repeat; JS comments it. Then write slot, `gameover` skip, then rank / prize otyp / else `achieve_msg[absidx].msg`. JS `achieve_msg` rows **Match C `:57–101`** (Bell, Gehennom, Planes, Astral, Mines’ End spoiler, Medusa, blond/nude unlogged, mines/town/shop/temple/oracle/novel/soko/bigroom, eight rank empties, tune, trailing `{0,""}`). Rank uses `rank_of(rank_to_xlev(absidx-(ACH_RNK1-1)), urole.mnum, achidx<0)` vs C `Role_switch` — analogue. Prize uses `objectNameStrs[otyp]` vs `OBJ_NAME`. `impossible` on OOR **OMIT** (pre-existing silent return; this SHA did not add it). **Not** “Match C SoundAchievement.”

Callee closure (endgame/knox/bigroom/entered). LIVE: `record_achievement`, `final_level`, `Is_astralevel`/`Is_knox_level`/`Is_bigroom`, `describe_level`, `livelog_printf`, `Soundeffect`. CLONE: `achieve_msg[]`. OMIT named: SoundAchievement, `livelog_add`, MICRO Valley, `impossible`. STUB: **none in the live ACH/Knox/livelog arms.** Combined-arm ships. Dispatch is not “ported, callee stubbed.”

## Hallucinations / overclaim

Subject ACH_ENDG/ASTR/BGRM + Knox until Croesus + entered livelog: **true.** D-log canary/green/cohort: **claimed; this review does not re-run.** Do **not** stamp “Match C `SoundAchievement`.” Do **not** stamp “Match C file `livelog_add`.” Do **not** stamp “Match C `level_difficulty()` for Tourist XP.” Do **not** stamp “Match C `impossible` on bad achidx.” Public Astral/Knox/Bigroom/endgame first-entry is **public-unhit** (fortress never reaches those floors).

## Density

+129: C arrival ~80 + `record_achievement` 67 + `achieve_msg` table + `describe_level` call + `%d` formatter. §2b one `goto_level` arrival family, not half of `do.c`. Did not glue SoundAchievement or Valley MICRO. Above a one-`if` peel.

## Verification

Wired: ACH_ENDG on `newdungeon`; ACH_ASTR after `final_level`; Knox Croesus; ACH_BGRM; `if (madeNew)` livelog then Tourist. Unwired C: SoundAchievement; `livelog_add`; MICRO; `impossible`. Conf: no `rn2` in these arms. No seed gate.

D-log green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for the new floors. Fortress proves the tourist `madeNew` XP path still runs on Dlvl 1 bones-free start (entered livelog is not a scored screen).

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `SoundAchievement`; file `livelog_add`; MICRO Valley More; `impossible` on bad achidx; Tourist `level_difficulty()` vs `depth`. Do not re-port `final_level` / `reset_hostility` (D-1616). Do not re-port ACH_HELL/MINE/SOKO. Do not add `Is_knox_level` #2 (`Is_knox` is an alias).

Verdict: **ACCEPT-WITH-DEBT**
