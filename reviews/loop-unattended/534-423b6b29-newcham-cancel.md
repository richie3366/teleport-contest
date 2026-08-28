# Review 534 — 423b6b29 — mon.c newcham Protection cancel / wormgone (D-1573)

## Metadata
- Full / short hash: `423b6b29b5471c489a75f7172b393d75dfa5a2c4` / `423b6b29`
- Parent: `6d7adcc6` (D-1572). This file audits **this SHA only** (seventh of nine `js/` commits since review **527**). Archive **Addressed:** D-1573 `423b6b29`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 08:28:01 +0200
- D-id: **D-1573**
- Stats: `js/makemon.js` +102 / −24, `js/worm.js` +26 / −3. Band 150–350 (js/ insertions **128**).
- Claims to close: Open `newcham` Protection cancel after D-1006/D-1564. Not set_mimic_sym early-out. `reviews/loop-2026-08-15/` has no unpaid newcham Must-fix.
- JS / map: `makemon.js` `newcham`; `worm.js` `wormgone`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **533** named `newcham` cancel.

## Intent vs deliverable

Git subject promises: cancelled shapechangers uncancel unless Protection_from_shape_changers (vampire cham, `wormgone`, `set_mon_data`) instead of leaving `cham` NON_PM and skipping poly follow-through.

Pinned C `mon.c` `newcham` `:5276–5535`. Cancel `:5300–5306`. Random + rogue `tryct>15` `:5322–5338`. `wormgone` `:5356–5362` + `place_monster`. `set_mon_data` `:5385`. Light/invis/hideunder `:5397–5410`. Long worm `rn2(5)` `:5451–5454`. Vampire cham `:5478–5482`. `youprop.h:359–360` PfSC = H\|\|E. Callee `worm.c` `wormgone` `:307–332`. `pm_to_cham` `:534–546`.

```5300:5306:nethack-c/upstream/src/mon.c
        if (mtmp->mcan && !Protection_from_shape_changers) {
            mtmp->cham = pm_to_cham(monsndx(mtmp->data));
            if (mtmp->cham != NON_PM)
                mtmp->mcan = 0;
        }
```

```5478:5482:nethack-c/upstream/src/mon.c
    if (mtmp->cham == NON_PM && mdat->mlet == S_VAMPIRE
        && !Protection_from_shape_changers)
        mtmp->cham = pm_to_cham(monsndx(mdat));
```

Old JS: rider/`mbirth_limit` + HP fraction + `data=` only; cancel deferred.

The diff **does** uncancel + vampire cham via uprops, rogue uppercase, `set_mon_data`, `wormgone`+`place_monster`, `seemimic`, light, stalker/black-light invis, `hideunder`, long-worm init, `check_gear_next_turn`. It **does not** port NC_SHOW_MSG `pline_mon`, `m_unleash`, ustuck `expels`, `possibly_unwield`/`mon_break_armor`/`mselftouch`, boulder `flooreffects`, Elbereth `monflee`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| cancel uncancel / vamp cham | C `:5300–5306` / `:5478–5482`, **LIVE** | PfSC H\|\|E uprops |
| `pm_to_cham` | C `:534–546`, **LIVE** | |
| rogue `tryct>15` | C `:5329–5333`, **LIVE** | `monsym_isupper` |
| `set_mon_data` | **LIVE** import | was `mtmp.data=` |
| `wormgone` | C `:307–332`, **LIVE this SHA** | mondead/dog callers named |
| `place_monster` | **LIVE** D-1565 | |
| `seemimic` / `hideunder` | **LIVE** sync | |
| light `del`/`new_light_source` | **LIVE** | |
| `check_gear_next_turn` | **LIVE** | |
| NC_SHOW_MSG / `m_unleash` / ustuck / break-armor / Elbereth | **OMIT named** | |

`node scripts/csym.mjs newcham` → `:5276-5535`. `--callers`: many; this SHA is the body. `wormgone` `--callers`: dog `:755`; mon `:2787` (mondead) + `:5359`. `pm_to_cham` `:534-546`.

RNG: long-worm `rn2(5)` now reached; `select_newcham_form` RNGs unchanged except rogue retries may burn extra `select` rolls — **C’s intended** `tryct>15` loop.

`node scripts/sym.mjs` on new / re-pointed names:

```
pm_to_cham            js/makemon.js:820   sync
set_mon_data          js/mondata.js:50    sync
wormgone              js/worm.js:169      sync
check_gear_next_turn  js/worn.js:350      sync
seemimic              js/mon.js:876       sync
hideunder             js/mon.js:2738      sync
newcham               js/makemon.js:1126  sync
```

`--can` makemon→worm `wormgone` / mon `seemimic`: new edges inside the existing SCC; calls are inside `newcham`, not top-level TDZ.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Cancel. `cham==NON_PM` (JS also `null`) then rider / `mbirth_limit` then `mcan && !pfsc` → `pm_to_cham` then clear `mcan` if cham. **Match `:5293–5306`.** PfSC is H\|\|E only (`youprop.h:359`). **Match.**

Random. tryct 20; rogue `tryct>15 && !isupper(monsym)` reject. **Match `:5322–5338`.** `!tryct` return 0. **Match.**

Worm. Save mx,my; `wormgone`; `place_monster`. **Match `:5356–5362`.** `wormgone` tosses segs, clears heads/tails/growtime, `MCORPSENM=NON_PM` if long worm + mextra. C `has_mcorpsenm` bit vs JS mextra field — close enough for this caller; named elsewhere.

Follow-through. `set_mon_data`; light delta; `perminvis` iff `!perminvis \|\| old invis`; `minvis`; `hideunder` if mundetected; long worm `get_wormno`+`initworm(rn2(5))`; `meverseen=0`; `newsym`; vamp cham; `check_gear_next_turn`. **Match those C lines.** Armor/unwield/boulder/steed/Elbereth **named.**

Callee closure (cancel + form-change arm). LIVE: `pm_to_cham`, `set_mon_data`, `wormgone`, `place_monster`, `seemimic`, `hideunder`, lights, `get_wormno`. OMIT named: `pline_mon`, `m_unleash`, `expels`, `possibly_unwield`. STUB: **none** in the uncancel/vamp/`set_mon_data` arms. Not “dispatch ported, callee stubbed” for the claimed cancel path.

## Hallucinations / overclaim

Subject uncancel unless PfSC + vamp + `wormgone` + `set_mon_data`: **true**. D-log “not set_mimic_sym early-out”: **true**. Do **not** stamp “Match C `pline_mon` NC_SHOW_MSG.” Do **not** stamp “Match C `mon_break_armor`.” Do **not** stamp “Match C mondead `wormgone`.” This SHA’s **seed4500 PASS is true at this SHA** (re-run 108275/108275). Cadence FAIL at HEAD is **D-1574**, not this commit.

## Density

One C `newcham` follow-through cluster + `wormgone`. +128 JS. Did not glue `unblock_point`. §2b OK.

## Branch-by-branch confirm

1. Cancelled cham, no PfSC: uncancel then random. **Match.**
2. PfSC: stay cancelled. **Match.**
3. Rider / mbirth_limit: return 0. **Match.**
4. Rogue try 1–5 lowercase: reject. **Match.**
5. Long worm: `wormgone` then place head. **Match.**
6. Poly into vampire, no PfSC: set cham. **Match.**
7. Stalker→visible: drop perminvis. **Match.**
8. Light range change: del/new. **Match.**

## Callers / RNG ledger

C many `newcham` sites. JS one body. Extra rogue retries consume `select_newcham_form` RNGs as C. Long-worm `rn2(5)` now live. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. PfSC via uprops (no were/monmove clone #3).

## Verification

D-log canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + seed0013-rogue + seed0398. **This SHA seed4500 PASS** (worktree re-run). Public-unhit: NC_SHOW_MSG text.

## Actionable C-wrongs

None for Must-fix. Named: NC_SHOW_MSG `pline_mon`; `m_unleash`; ustuck; break-armor; Elbereth `monflee`; mondead/dog `wormgone`. Do not wrap `wildmiss` as `pline_mon`.

Verdict: **ACCEPT-WITH-DEBT**
