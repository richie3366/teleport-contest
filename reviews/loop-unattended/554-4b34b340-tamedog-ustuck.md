# Review 554 — 4b34b340 — dog.c tamedog ustuck expels/unstuck (D-1593)

## Metadata
- Full / short hash: `4b34b3401499ecb04c48268386e3807c4a3ad8cb` / `4b34b340`
- Parent: `c4be5135` (D-1592). This file audits **this SHA only** (ninth / last of nine `js/` commits since review **545**). Archive **Addressed:** D-1593 — fill short hash `4b34b340` (row was hashless).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 21:03:37 +0200
- D-id: **D-1593**
- Stats: `js/dog.js` +14/−3. Band **150–350** (js/ insertions **14**).
- Claims to close: Open ustuck after D-1585. Not `has_edog`. `reviews/loop-2026-08-15/` has no unpaid tamedog-ustuck Must-fix.
- JS / map: `dog.js` `tamedog`. Callees `mhitu.js` `expels`/`unstuck`; `engrave.js` `sticks`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **546** named ustuck `expels`/`unstuck`.

## Intent vs deliverable

Git subject promises: a grabber expels when swallowed or unstuck unless the hero’s poly form sticks, whether or not taming succeeds.

Pinned C `dog.c` `tamedog` `:1184–1190` (after `mflee=0`, before already-tame food). `mhitu.c` `expels` `:263–306`. `mon.c` `unstuck` `:3437–3467`. `mondata.c` `sticks` `:653–659`. `you.h:554` `Upolyd` = `u.umonnum != u.umonster`. `monattk.h:19–21` `AT_HUGS=7` `AT_ENGL=11`. `--callers tamedog` unchanged (dothrow food; magic nulls `obj` before the moon gate). `--callers expels` includes `dog.c:1187`. `--callers unstuck` includes `dog.c:1189`. `--callers sticks` includes `dog.c:1188`.

```1184:1190:nethack-c/upstream/src/dog.c
    /* make grabber let go now, whether it becomes tame or not */
    if (mtmp == u.ustuck) {
        if (u.uswallow)
            expels(mtmp, mtmp->data, TRUE);
        else if (!(Upolyd && sticks(gy.youmonst.data)))
            unstuck(mtmp);
    }
```

Old JS: comment only after D-1585. FULL_MOON / catch already live.

The diff **does** await `expels` / `unstuck` from `mhitu.js` and import `engrave.js` `sticks` (AT_HUGS=7). It **does not** port `initedog` `has_edog` vs `!mtame`. It **does not** fill `expels` `spoteffects`/`um_dist` or `unstuck` Punished `placebc`. Named on those callees.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tamedog` ustuck arm | C `:1184–1190`, **LIVE this SHA** | after moon return |
| `expels` | C `:263–306`, **LIVE** | import; not a clone |
| `unstuck` | C `:3437–3467`, **LIVE** | same `mhitu.js` export |
| `sticks` | C `:653–659`, **LIVE** | `engrave.js` (C-matched) |
| `Upolyd` | C `you.h:554`, **LIVE helper** | `const.js`; mtimedone vs umonnum |
| `set_ustuck` | inside `unstuck`, **LIVE** | |
| `mnexto` `RLOC_NOMSG` | inside `expels`, **LIVE** | |
| `monmove.js` `sticks` | **CLONE elsewhere** | AT_HUGS=6; not used here |
| `mhitu.js` / `uhitm.js` local `sticks` | **CLONE elsewhere** | do not add #3 |
| `initedog` `has_edog` | C `:1254–1259`, **OMIT named** | |
| `expels` `spoteffects` / `um_dist` | C `:302–305`, **OMIT named** | callee body |
| `unstuck` Punished `placebc` | C `:3452–3453`, **OMIT named** | |

`node scripts/csym.mjs tamedog` → `:1142-1282`. `expels` → `:263-306`. `unstuck` → `:3437-3467`. `sticks` → `:653-659`. `Upolyd` → `you.h:554`.

RNG: swallow `expels` → `unstuck` may `rnd(2)` `mspec_used` (C `:3462–3465`). Hold path same. No seed gate. FULL_MOON `rn2(6)` is D-1585, **before** this arm.

`node scripts/sym.mjs` on new / re-pointed names:

```
tamedog          js/dog.js:364   ASYNC — await required
expels           js/mhitu.js:1025   ASYNC — await required
unstuck          js/mhitu.js:1000   ASYNC — await required
sticks           js/engrave.js:324   sync
                 js/monmove.js:1526   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 2 LOCAL CLONE(S) in mhitu.js / uhitm.js
Upolyd           js/const.js:2961   sync
set_ustuck       js/mhitu.js:984   sync
             !! ALSO 1 LOCAL CLONE in uhitm.js
```

`--can dog.js mhitu.js expels`: ALREADY. `--can dog.js mhitu.js unstuck`: ALREADY. `--can dog.js engrave.js sticks`: ALREADY. `--can dog.js monmove.js sticks`: IN-SCC, `sticks` hoisted, **VERDICT SAFE**. A cycle alone is **not** why they skipped `monmove.js`. They skipped it because that clone’s `AT_HUGS=6` / `AT_ENGL=7` contradict `monattk.h` 7/11. Do **not** stamp “cycle-forced clone.” Do **not** add `sticks` #3 in `dog.js`. Do **not** import `monmove.js` `sticks` here.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Order vs early returns. Wiz/Medusa/WANTSARTI still return **before** peaceful/moon/`mflee`/ustuck. **Match `:1164–1167`.** FULL_MOON 5/6 refuse still returns **before** `mflee` and **before** ustuck. **Match `:1176–1178`.** A full-moon night canine that refuses is **not** unstuck. Subject “whether taming succeeds” means shopkeeper / `!mcanmove` / covetous / already-tame bump — those are **after** `:1184`. **Match.**

Equality. `mtmp === u.ustuck`. **Match.** Swallow → `expels(mtmp, mtmp.data, true)`. **Match `:1186–1187`.** Else `!(Upolyd && sticks(youmonst.data))` → `unstuck`. **Match `:1188–1189`.** Sticky poly holder keeps the grab. **Match.**

`sticks`. `dmgtype(AD_STCK) || (dmgtype(AD_WRAP) && !attacktype(AT_ENGL)) || attacktype(AT_HUGS)`. Engrave locals 19/28/11/7. **Match `:653–659` + `monattk.h`.** `monmove.js` `aa===6` would mis-classify hugs. Not used.

`Upolyd`. C `umonnum != umonster`. JS `mtimedone > 0`. Pre-existing helper, not a new tamedog clone. If conferral ever sets poly without `mtimedone`, the hold would unstuck when C would keep it — **not observed in this SHA’s canary; not a new Must-fix.** Dual-store named with the helper, not invented here.

`expels`. botl; digest/enfold/blast pline; `unstuck`; `mnexto(RLOC_NOMSG)`; `newsym`. **Match `:268–301`.** `um_dist` land-hard + `spoteffects(TRUE)` still omitted in the callee. Named. Not a stub: the grabber is placed via live `mnexto`.

`unstuck`. `set_ustuck(null)`; swallowed `ux,uy` + vision + `docrt`; `mspec_used = rnd(2)` when STCK/ENGL/HUGS. **Match `:3440–3465` except Punished `placebc` named.**

Callee closure (ustuck arm). LIVE: `expels`, `unstuck`, `sticks`, `Upolyd`. OMIT named: `has_edog` (later in `tamedog`, not this arm); `placebc`; `spoteffects`/`um_dist`. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject grabber expels/unstuck unless sticky poly, even if later taming fails: **true after the moon/wiz gates.** D-log “engrave sticks not monmove AT_HUGS=6”: **true** (`sym` two exports; this SHA imports engrave). Do **not** stamp “Match C FULL_MOON refuse also unsticks.” Do **not** stamp “Match C `has_edog`/`newedog`.” Do **not** stamp “Match C `expels` `spoteffects`/`um_dist`.” Do **not** stamp “Match C Punished `placebc`.” Do **not** stamp “retired `monmove.js` `sticks`.” Do **not** stamp “cycle forced the engrave import.” Public suite has no swallowed `#tame` / thrown food at `u.ustuck`.

## Density

One 7-line C arm + the three C callees it reaches. +14 JS. Playbook §2b “unless C is that small.” Did not glue `has_edog`. OK.

## Branch-by-branch confirm

1. `mtmp !== ustuck`: no `expels`/`unstuck`. **Match.**
2. Swallowed: `expels(..., TRUE)` then food/tame logic. **Match.**
3. Held, not poly-sticky: `unstuck`. **Match.**
4. Held, `Upolyd && sticks`: keep grab. **Match.**
5. Wiz/Medusa/WANTSARTI: no release. **Match.**
6. FULL_MOON refuse: no release. **Match.**
7. Later `isshk` / cannot-tame: already released. **Match.**
8. `has_edog` / `placebc` / `spoteffects`. **Named.**

## Callers / RNG ledger

C food `dothrow.c:2269`; magic taming still reaches ustuck (obj already null, moon gate false). Extra `rnd(2)` only when `unstuck` fires and `!mspec_used`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Import `engrave.js` `sticks` (C-matched), not `monmove.js`. Do not add `sticks` in `dog.js`. Do not wrap `wildmiss` as `pline_mon`. Do not import `monmove.js` `sticks` “because SAFE cycle.”

## Verification

D-log private canary **11**/11; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** (no scored swallow-tame). Canary that never sets `Upolyd` does not falsify the sticky-poly skip. `spoteffects` after expel unhit.

## Actionable C-wrongs

None for Must-fix. Named: `initedog` `has_edog` vs `!mtame` / `newedog`; `unstuck` Punished `placebc`; `expels` `um_dist` / `spoteffects`; `monmove.js` `sticks` AT_HUGS=6 clone (do not use from `tamedog`); 2 local `sticks` in mhitu/uhitm. Do not add `expels` #2 in `dog.js`. Do not move ustuck before the FULL_MOON return.

Verdict: **ACCEPT-WITH-DEBT**
