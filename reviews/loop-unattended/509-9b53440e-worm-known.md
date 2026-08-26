# Review 509 — 9b53440e — worm.c worm_known + display.h _canseemon (D-1548)

## Metadata
- Full / short hash: `9b53440ec6d03471bc7fd76c59d75e2ef97c691e` / `9b53440e`
- Parent: `0461e305` (D-1547). This file audits **this SHA only** (ninth of nine `js/` commits since review **500**). Archive **Addressed:** D-1548 `9b53440e`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 10:46:20 +0200
- D-id: **D-1548**
- Stats: 9 JS files, +67 / −27 (`js/worm.js` +21, `js/display.js` +17, clones in trap/muse/mthrowu/monmove/dig, `js/mhitm.js` +7). Band 150–350 (js/ insertions **67**).
- Claims to close: Open `worm.c` `worm_known` (named from D-1547 / D-1545). Not `howmonseen`. `reviews/loop-2026-08-15/` has no unpaid worm_known Must-fix.
- JS / map: `worm.js` `worm_known`; `display.js` `canseemon`; `mhitm.js` `monkilled`; clones. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **490** named `worm_known`; D-1545 follow-up Open.

## Intent vs deliverable

Git subject promises: `canseemon` / `monkilled` treat a long worm as seen if **any** `wseg` is `cansee`, not only the head, and **not infrared**.

Pinned C `worm.c` `worm_known` `:877–893`. Callers `display.h` `_canseemon` `:117–120`; `mon.c` `monkilled` `:3384–3385`; `vision.c` `howmonseen` `:2162` **still named**.

```117:120:nethack-c/upstream/include/display.h
#define _canseemon(mon) \
    ((mon->wormno ? worm_known(mon)                                       \
                  : (cansee(mon->mx, mon->my) || see_with_infrared(mon))) \
     && mon_visible(mon))
```

```883:892:nethack-c/upstream/src/worm.c
worm_known(struct monst *worm)
{
    struct wseg *curr = wtails[worm->wormno];
    while (curr) {
        if (cansee(curr->wx, curr->wy))
            return TRUE;
        curr = curr->nseg;
    }
    return FALSE;
}
```

```3384:3385:nethack-c/upstream/src/mon.c
    if (fltxt && (mdef->wormno ? worm_known(mdef)
                               : cansee(mdef->mx, mdef->my)))
```

Old JS: `canseemon` = head `cansee`||infrared + `mon_visible`; `monkilled` = `cansee(head)`; no `worm_known`.

The diff **does** port `worm_known` (any seg `cansee`, including dummy at the head), wire `display.js` `canseemon` and `mhitm.js` `monkilled`, and add the `wormno` arm to the five local `canseemon` clones (trap/muse/mthrowu/monmove/dig). It **does not** port `howmonseen`, cutworm, `redraw_worm`, or the **trap.js `monkilled` clone** (still `cansee(head)`). That last one is a C-wrong, not a named omit.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `worm_known` | C `:877`, **LIVE this SHA** | |
| `canseemon` export | C `_canseemon`, **LIVE this SHA** | infrared skipped when `wormno` |
| `monkilled` export | C `:3384`, **LIVE this SHA** | mhitm.js |
| trap/muse/mthrowu `canseemon` | C `_canseemon`, **CLONE** this SHA | worm arm added |
| dig/monmove `canseemon` | C, **CLONE** thinner (`!minvis`) | worm_known added |
| trap.js `monkilled` | C `:3384`, **CLONE diverged** | still `cansee(head)` |
| `howmonseen` | C `vision.c:2162`, **OMIT named** | NOT FOUND |
| cutworm / `redraw_worm` | C, **OMIT named** | |

`node scripts/sym.mjs worm_known canseemon monkilled see_with_infrared mon_visible howmonseen`:

```
worm_known       js/worm.js:268   sync
canseemon        js/display.js:311   sync
             !! ALSO 5 LOCAL CLONE(S)
               js/dig.js:169  js/monmove.js:969  js/mthrowu.js:222
               js/muse.js:188  js/trap.js:1005
monkilled        js/mhitm.js:2023   ASYNC — await required
             !! ALSO 1 LOCAL CLONE(S)
               js/trap.js:1111
see_with_infrared js/display.js:655   sync
mon_visible      js/display.js:299   sync
howmonseen       NOT FOUND in js/**
```

**Re-point:** five `canseemon` clones gained `worm_known` (do **not** add clone #6). `monkilled` export re-pointed; **trap.js clone was not.** explode/region dynamic-import the export (they get the fix). trap.js already imports other mhitm symbols (`make_corpse`) but keeps a local `monkilled`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No core RNG** in `worm_known` (C none).

## C ↔ JS fidelity

`worm_known`. `wtails[wormno]` while `curr`; `cansee(wx,wy)`; includes dummy co-located with the head (so head-lit is enough). No infrared. Empty tails → false. **Match `:887–892`.** JS `worm?.wormno | 0` is only reached when callers pass a truthy `wormno`.

`_canseemon` export. `wormno ? worm_known : (cansee(head) || see_with_infrared)` then `mon_visible`. Infrared-only dark head on a tailed worm is **false**. **Match `:117–120`.** uhitm/zap/etc. import this export.

Clone canseemon. mthrowu/muse/trap: same ternary + `mon_visible`. **Match.** dig/monmove: worm arm is `worm_known && !minvis` (no `mon_visible` mundetected; non-worm arm still no infrared — pre-existing thin clone). Infrared **is** skipped on the worm arm. **Match the C worm/infrared split; mundetected named as clone thinness.**

`monkilled` export. `wormno ? worm_known : cansee(head)` (not infrared). **Match `:3384–3385`.** `pline` not `pline_mon`; pet roast named.

**trap.js `monkilled` `:1114` still `if (cansee(mdef.mx, mdef.my))`.** C has one `monkilled`. JS trap deaths (pit/fire/rust, `:1200` / `:3109` / `:3754`) use this clone. A long worm killed by a trap with only a **tail** `cansee` stays silent — **not C**. This SHA **touched trap.js** to fix `canseemon` and left `monkilled` on head sight. That is clone drift, not a named omit.

Callee closure (`_canseemon` / mhitm `monkilled`). LIVE: `worm_known`, `cansee`, `see_with_infrared`, `mon_visible`. CLONE: five canseemon (verified worm arm). **STUB/diverged: trap `monkilled` sight test.** Combined-arm rule: one STUB in a live arm → that arm should have been its own Open row. “Dispatch ported, callee clone unfixed” is QUALITY-RISK even though the subject says Match C `monkilled`. `howmonseen` OMIT named — do not glue.

## Hallucinations / overclaim

Subject any-seg `cansee`, not infrared, for canseemon **and** monkilled: **true of the export and of the canseemon clones; false of trap.js `monkilled`.** Stamping **Addressed:** D-1548 as “Match C `monkilled`” is **overclaim for trap deaths**. Canary “monkilled predicate” that only constructs `mhitm.monkilled` cannot see the clone. Do **not** stamp “Match C `howmonseen`.” Do **not** stamp “Match C cutworm.”

## Density

+67 JS: `worm_known` + every `canseemon` clone. Right cluster. Missed the one `monkilled` clone in a file they already opened. Did not glue `howmonseen` / cutworm. §2b OK except that miss.

## Branch-by-branch confirm

1. Dummy-only, head `cansee`: `worm_known` true. **Match.**
2. Tail `cansee`, head dark: true. **Match.**
3. Infrared-only head, `wormno` set: `canseemon` false. **Match.**
4. Same without `wormno`: infrared can see. **Match.**
5. minvis: `mon_visible` / `!minvis` gates. **Match export; dig/monmove thinner.**
6. mhitm `monkilled` tail-visible: pline. **Match.**
7. trap.js `monkilled` tail-visible: still requires head `cansee`. **Not C.**

## Callers / RNG ledger

C: any `canseemon` / `monkilled` / `howmonseen`. JS: export + five canseemon clones + mhitm; trap deaths diverge; `howmonseen` absent. Public-unhit until a live long worm is seen via a tail cell. No seed gate. No core RNG.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `worm.js` imports `cansee` from `vision.js` (vision does not import worm — `howmonseen` still named).

## Verification

D-log canary **28**/28 (grep; dummy head; tail-visible/head-dark; infrared-only; minvis/mundetected; monkilled predicate; no core RNG; Rule #2); green+strict seed8000/0900; cohort **7**/7. **Public-unhit.** Admit it. Canary does **not** prove trap.js `monkilled`.

## Actionable C-wrongs

1. **`mon.c` `monkilled` sight test in `js/trap.js` clone** (`:3384–3385`): use `mdef.wormno ? worm_known(mdef) : cansee(mdef.mx, mdef.my)` (same as `mhitm.js`). One port. Do **not** re-do `worm_known` / `_canseemon` / glue `howmonseen` / cutworm / `redraw_worm`. Do **not** add `canseemon` clone #6.

Verdict: **QUALITY-RISK**
