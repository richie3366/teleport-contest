# Review 557 — fa152acc — mplayer.c create_mplayers (D-1596)

## Metadata
- Full / short hash: `fa152accac07a5269acffff1f0f21306f9dd13e6` / `fa152acc`
- Parent: `ab70af21` (D-1595). This file audits **this SHA only** (third of nine `js/` commits since review **554**). Archive **Addressed:** D-1596 `fa152acc`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 22:04:41 +0200
- D-id: **D-1596**
- Stats: `js/mplayer.js` +39/−5, `js/do.js` +12/−5. Band **150–350** (js/ insertions **51**).
- Claims to close: Open `create_mplayers` after D-1584. Not `mplayer_talk`. Not `gain_guardian_angel`. `reviews/loop-2026-08-15/` has no unpaid create_mplayers Must-fix.
- JS / map: `mplayer.js` `create_mplayers`; `do.js` `goto_level`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **545** named `create_mplayers` / `do.c:2049`.

## Intent vs deliverable

Git subject promises: Astral `final_level` rolls several role-monsters at `goodpos` cells instead of only splev `mk_mplayer`.

Pinned C `mplayer.c` `create_mplayers` `:326–353`. Caller `do.c` `final_level` `:2042–2053` `create_mplayers(rn1(4, 3), TRUE)` after `iter_mons(reset_hostility)`, before `gain_guardian_angel`. `goto_level` `:1882–1890`: `new && on_level(&u.uz, &astral_level)` → `final_level` + ACH_ASTR; else-if `newdungeon && u.uhave.amulet` → `resurrect`. `Is_astralevel` `dungeon.h:113` `Lcheck(astral_level)`. `dungeon.lua` astral `base = 1`. `goodpos` `:85–185`. `set_mon_data` `:12–38`. `mk_mplayer` `:117–317`. `--callers create_mplayers`: `do.c:2049` only.

```326:353:nethack-c/upstream/src/mplayer.c
void
create_mplayers(int num, boolean special)
{
    int pm, x, y;
    struct monst fakemon;

    fakemon = cg.zeromonst;
    while (num) {
        int tryct = 0;
        pm = rn1(PM_WIZARD - PM_ARCHEOLOGIST + 1, PM_ARCHEOLOGIST);
        set_mon_data(&fakemon, &mons[pm]);
        do {
            x = rn1(COLNO - 4, 2);
            y = rnd(ROWNO - 2);
        } while (!goodpos(x, y, &fakemon, 0) && tryct++ <= 50);
        if (tryct > 50)
            return;
        (void) mk_mplayer(&mons[pm], (coordxy) x, (coordxy) y, special);
        num--;
    }
}
```

Old JS: `create_mplayers` missing; `goto_level` In_endgame always `resurrect` on `newdungeon`+amulet (no Astral `final_level`).

The diff **does** live `create_mplayers` and gate `madeNew && Is_astralevel` with `rn1(4,3), true`, else-if `resurrect`. It **does not** call `reset_hostility` / `gain_guardian_angel` / ACH_ENDG/ASTR. It **does not** port `mplayer_talk` or mplayer-sword `spe`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `create_mplayers` | C `:326–353`, **LIVE this SHA** | |
| `goto_level` Astral arm | C `:1885–1887`, **LIVE this SHA** | inlined, not `final_level` |
| `rn1(4,3)` / `special` TRUE | C `:2049`, **LIVE** | |
| `set_mon_data` | C `:12–38`, **LIVE** | import |
| `goodpos` | C `:85–185`, **LIVE** | import |
| `mk_mplayer` | C `:117–317`, **LIVE** | D-1584; special TRUE |
| `Is_astralevel` | C `dungeon.h:113`, **LIVE** | JS endgame `dlevel===1` ≡ lua base 1 |
| `COLNO`/`ROWNO` | C `global.h:382–383`, **LIVE** | 80/21 |
| `reset_hostility` | C `:2046`, **OMIT named** | `sym` NOT FOUND |
| `gain_guardian_angel` | C `:2052`, **OMIT named** | NOT FOUND |
| ACH_ENDG / ACH_ASTR | C `:1884`/`:1888`, **OMIT named** | |
| `mplayer_talk` | **OMIT named** | Open already |
| occupied `rloc` | C `:126–127`, **CLONE** | async fire-and-forget (545) |

`node scripts/csym.mjs create_mplayers` → `:326-353`. `final_level` → `:2042-2053`. `--callers create_mplayers`: `do.c:2049`. `goodpos` mplayer site `:344`. `m_in_air` → `:2129-2136`.

RNG: per monster `rn1(class span)` then `rn1(COLNO-4,2)` / `rnd(ROWNO-2)` until goodpos (eel `rn2(13)` inside `goodpos` unused for role-ids). Then `mk_mplayer` special kit. `goto_level` one `rn1(4,3)` for `num`. No seed gate. tryct>50 **returns** (drops remaining `num`), matching C even when the last cell was goodpos (`:346–348`).

`node scripts/sym.mjs` on new / re-pointed names:

```
create_mplayers  js/mplayer.js:334   sync
mk_mplayer       js/mplayer.js:169   sync
goodpos          js/teleport.js:461   sync
set_mon_data     js/mondata.js:50   sync
reset_hostility  NOT FOUND in js/**
gain_guardian_angel NOT FOUND in js/**
mplayer_talk     NOT FOUND in js/**
final_level      NOT FOUND in js/**
```

`--can do.js mplayer.js create_mplayers`: ALREADY. `--can mplayer.js teleport.js goodpos`: ALREADY. `--can mplayer.js mondata.js set_mon_data`: ALREADY. Do **not** add `create_mplayers` #2 in `do.js`. Do **not** invent `reset_hostility` / `gain_guardian_angel` as no-ops.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Loop. `while (num)`: class `rn1(PM_WIZARD-PM_ARCHEOLOGIST+1, PM_ARCHEOLOGIST)`; `set_mon_data(fakemon, mons(pm))`; do `x=rn1(COLNO-4,2)` `y=rnd(ROWNO-2)` while `!goodpos(..., 0) && tryct++<=50`; `tryct>50` return; `mk_mplayer(..., special)`; `num--`. **Match `:334–351`.** fakemon is `{mx:0,my:0,wormno:0,m_id:0}` vs C `zeromonst`. `set_mon_data` fills `data`/`mnum`; `movement` 0 skips prorate. **Match `:12–38` on a zero mon.** `goodpos` uses `mdat` for pool/eel/lava/walls/boulder; `m_in_air` in teleport.js is flyer/floater from **data** (C also clinger+ceiling+`mundetected`; fakemon mundetected 0; role-ids are not clingers). **Match the fields this fakemon can exercise.**

Caller. C `new && on_level(astral)` → `final_level` then ACH_ASTR; else-if resurrect. JS `madeNew && Is_astralevel` → `create_mplayers(rn1(4,3), true)`; else-if `newdungeon && amulet` `resurrect`. `madeNew = !LFILE_EXISTS` ≡ C first-visit `new`. **Match that gate.** `Is_astralevel`: JS `In_endgame && dlevel===1`; lua astral `base = 1`; C `Lcheck(&astral_level)`. **Match this topology** (water/fire/air are 2–4; earth later). First Astral visit no longer `resurrect`s. **Match the else-if.** Sibling `reset_hostility` / `gain_guardian_angel` / ACH not called. Named. Not stubs inside `create_mplayers`.

`mk_mplayer(..., true)`: forces `special=false` unless `In_endgame`. This arm runs after `u.uz` is Astral. **Match TRUE kit.** Occupied `rloc` still fire-and-forget (545). A sync C `rloc` would clear the cell before the next `goodpos`; JS may keep seeing `MON_AT` until the promise runs and abort leftover `num` more often. Named with 545, not a new Must-fix family.

Callee closure (`create_mplayers`). LIVE: `rn1`/`rnd`, `set_mon_data`, `goodpos`, `mk_mplayer`, `mons`. OMIT named: `reset_hostility` / `gain_guardian_angel` (caller siblings, not this function). STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject Astral rolls several role-monsters at goodpos: **true on first Astral visit.** D-log “else-if resurrect so first Astral with amulet is not Wizard confrontation”: **true.** Do **not** stamp “Match C `final_level` / `reset_hostility` / `gain_guardian_angel`.” Do **not** stamp “Match C ACH_ENDG/ASTR.” Do **not** stamp “Match C `mplayer_talk`.” Do **not** stamp “Match C occupied `rloc` awaited.” Do **not** stamp “Match C `mongets` mplayer-sword spe.” Public suite does not reach Astral.

## Density

One C function + its only caller arm. +51 JS. Did not glue `mplayer_talk` / minion angel. §2b OK.

## Branch-by-branch confirm

1. `num` 3..6 special TRUE on new Astral. **Match.**
2. tryct>50 abort remaining. **Match including goodpos last-roll quirk.**
3. Revisit Astral (`!madeNew`): no `create_mplayers`. **Match `new`.**
4. New endgame non-Astral + amulet: `resurrect`. **Match else-if.**
5. `reset_hostility` / angel / ACH / `mplayer_talk`. **Named.**

## Callers / RNG ledger

Only `goto_level`. Extra kit RNGs per placed mplayer (`rnd_*_item`, armor, possible `mk_artifact`). No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `final_level` as a comment-only stub. Do not import `minion.js` for angel “to finish density.” Do not await `rloc` here without fixing `mk_mplayer`.

## Verification

D-log private canary **9**/9; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** (no scored Astral). A canary that never `madeNew` on dlevel 1 does not falsify. `gain_guardian_angel` unhit.

## Actionable C-wrongs

None for Must-fix. Named: `reset_hostility` (`:2046`); `gain_guardian_angel` (`:2052`); ACH_ENDG/ASTR; `mplayer_talk`; mplayer-sword `spe`; `mk_mplayer` occupied `rloc` await (545). Do not call `create_mplayers` on water/fire/air. Do not resurrect on first Astral.

Verdict: **ACCEPT-WITH-DEBT**
