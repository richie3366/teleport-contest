# Review 331 — 211485a0 — youprop.h Shock_resistance uprops[SHOCK_RES] (D-1371)

## Metadata
- Full / short hash: `211485a0a64ce56cc46acf839b7fa61d0c3980e3` / `211485a0`
- Parent: `9aa9e57a` (reviews **327–330** + cadence **#1740**). This file audits **this SHA only** (first of four `js/` commits since review **330**). Archive **Addressed:** D-1371 `211485a0` already has the short hash (filled by D-1372).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 15:16:00 +0200
- D-id: **D-1371**
- Stats: 12 files, +216 / −146 — `js/zap.js` +24 / −4 (`Shock_resistance()` + `SHOCK_RES` import).
- Claims to close: Must-fix from review **328** — exploding-wand HP / WAN_LIGHTNING used a sticky-only clone. `reviews/loop-2026-08-15/` has no unpaid Shock Must-fix.
- JS / map: `zap.js` `Shock_resistance()`; callers `maybe_destroy_item` AD_ELEC `xresist`, `zapyourself` WAN_LIGHTNING, `zhitu` ZT_LIGHTNING. `c-js-map/turns.md` + `debt.md`. explode/pray/sit clones still named.
- Prior reviews this SHA claims to close: **328** QUALITY-RISK Must-fix item 1. **330** named Open allmain wipe as next after hurtle — this SHA popped Must-fix first (correct).

## Intent vs deliverable

Git subject promises: “Match C youprop.h Shock_resistance so a worn ring of shock resistance actually skips exploding-wand HP ("You aren't hurt!"), instead of still taking rnd(10).”

C `youprop.h:42–44`:

```
#define HShock_resistance u.uprops[SHOCK_RES].intrinsic
#define EShock_resistance u.uprops[SHOCK_RES].extrinsic
#define Shock_resistance (HShock_resistance || EShock_resistance)
```

`prop.h:19` `SHOCK_RES = 5`. `confer_oc_oprop` writes ring/shield/blue DSM **only** to `uprops[SHOCK_RES].extrinsic` — it never mirrors `EShock_resistance` (`do_wear.js:262–289` still has no SHOCK_RES flat). Generated `oc_oprop` for `RIN_SHOCK_RESISTANCE` / `SHIELD_OF_SHOCK_RESISTANCE` / blue DSM is 5.

C `maybe_destroy_item` (`zap.c:5859–5860` / `:5939–5940`): wand `xresist` uses the macro; `rnd(10)` still burns; HP skip is `"You aren't hurt!"`. Same macro gates WAN_LIGHTNING (`:2733`) and `zhitu` ZT_LIGHTNING (`:4512`).

Old JS: `u.Shock_resistance || H || E` only. Conferral ring still `losehp(rnd(10))`.

The diff **does** OR `uprops[SHOCK_RES].intrinsic||extrinsic`. It does **not** rewrite `confer_oc_oprop`. Named. The AD_ELEC **arm** is unchanged this SHA (D-1368).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Shock_resistance()` | C `youprop.h:42–44`, **clone now matching** | sticky + H/E + uprops (D-1089 / D-1367 shape) |
| AD_ELEC `xresist` | C `:5859–5860` / `:5939–5940`, **pre-existing live** | predicate retouch only |
| WAN_LIGHTNING arm | C `:2733`, **pre-existing live** | same helper |
| `zhitu` ZT_LIGHTNING | C `:4512`, **pre-existing live** | `"You aren't affected."` |
| `confer_oc_oprop` | C `worn.c`, **untouched** | extrinsic-only SHOCK_RES |
| `rnd(10)` / `d(12,6)` | C, **imported live** | still roll when xresist |
| explode/pray/sit clones | C same macro, **other files** | still sticky-only |
| `inventory_resistance_check` | C `:5816–5817`, **named omit** | never early-out |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. Conferral shock now **skips** `losehp` after the wand’s `rnd(10)` (C still burned that roll).

## C ↔ JS fidelity

Helper after this SHA:

```
function Shock_resistance() {
    const u = game.u || {};
    const e = u.uprops?.[SHOCK_RES];
    return !!((u.Shock_resistance || u.HShock_resistance || u.EShock_resistance)
        || (e?.intrinsic | 0) || (e?.extrinsic | 0));
}
```

C has no sticky `u.Shock_resistance` member — H/E **are** the uprops fields. The extra sticky OR is a superset (eat/poly flats; invent.js `hero_Shock_resistance`). Conferral ring/shield/blue DSM now take xresist: wand `rnd(10)` then `"You aren't hurt!"`; **zero** HP. Match `:5939–5940`. Seeing hero with no bits still `losehp(rnd(10))`. Match. WAN_LIGHTNING conferral: `d(12,6)` always, then `"…seem unharmed."` with no CON abuse. Match `:2730–2743` minus shield/golem. `zhitu` lightning conferral: `"You aren't affected."` Match `:4512`.

`confer_oc_oprop` untouched — review **328** forbade rewriting it. The helper now reads the field confer actually writes. That is the Must-fix.

Hallucination check: “Match C `youprop.h` Shock_resistance” while **explode.js still sticky** is an overclaim on **explosion combat**. The **zap.js predicate is not a stub** that still misses conferral. Do **not** stamp “Match C explode/pray/sit Shock.” Do **not** stamp “Match C `inventory_resistance_check`.” Do **not** stamp “skip `rnd(10)` when Shock.”

## Hallucinations / overclaim

Subject says a worn ring of shock resistance skips exploding-wand HP instead of taking `rnd(10)`. **True for zap.js callers** (AD_ELEC destroy, WAN_LIGHTNING, ZT_LIGHTNING) under conferral or sticky H/E. **False for explode.js / pray.js / sit.js** until those clones OR uprops. D-log “Did not rewrite confer” is honest. Stamping **Addressed:** D-1371 for the helper is fair. Do **not** treat fortress PASS as `"You aren't hurt!"` or `"You zap yourself, but seem unharmed."`.

## Density

One youprop helper plus the three zap callers already on it. ~24 lines. Playbook §2b Must-fix pop — right size. Did not glue allmain wipe (next Open at this SHA). Did not retouch explode/pray/sit (named). Consecutive thin wipe peels after this SHA are later-review density notes, not this file.

## Branch-by-branch confirm

1. Worn shock-ring, `EShock_resistance===0`, uprops extrinsic set: wand `rnd(10)` then aren't-hurt; no `losehp`. Match C macro. **This was 328’s C-wrong.**
2. Shock-shield / blue DSM conferral: same. Match.
3. Sticky `HShock` / `EShock` without uprops: aren't-hurt. Match (superset).
4. No bits: `losehp(rnd(10))`. Match.
5. WAN_LIGHTNING conferral: `d(12,6)` then unharmed; seeing still shocks. Match `:2733`.
6. `zhitu` ZT_LIGHTNING conferral: aren't-affected; `!rn2(3)` destroy still. Match `:4512`.
7. The shock-ring object itself: still `destroyable` false / skip. Untouched. Match `:5642`.
8. `inventory_resistance_check` still never. Named.
9. explode.js sticky: still takes exploding-wand HP under conferral. Named other file.
10. **Public-unhit** unless a session elec-destroys while wearing shock-res.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `SHOCK_RES` is the `const.js` prop index, not a recorded coordinate. Plain ESM. The extra sticky OR is not a trace index.

## Verification

Journal: private canary **17**/17 (C macros; confer shock-ring / shock-shield / raw uprops aren't-hurt still `rnd(10)` with `EShock` still 0; sticky H still aren't-hurt; seeing explode takes HP; WAN_LIGHTNING conferral unharmed + seeing shock regression; confer not rewritten; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on conferral shock. This audit cadence: full `sessions` at HEAD `08007958` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `40+0.33/turn` (R² 0.86). I did not re-run the private canary. Fortress PASS is not a wand-shatter under a ring of shock resistance.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The helper now reads the field confer writes. Remaining sticky clones are named omits of **other** files.

Named omits (map / already-Open, not Must-fix):

1. explode.js / pray.js / sit.js `Shock_resistance()` sticky clones
2. `inventory_resistance_check` early return
3. full `read.c` recharge wand/tool/blessed
4. `shieldeff` / `ugolemeffects` on WAN_LIGHTNING resist
5. allmain DEX `u_wipe_engr` (shipped next SHA as D-1372)

Do not Must-fix “skip `rnd(10)` when Shock_resistance” (C still rolls; xresist only skips HP). Do not Must-fix “rewrite `confer_oc_oprop` to set `EShock_resistance`.” Do not Must-fix “drop the sticky OR” (eat/poly flats; C has one storage).

## Callers / RNG ledger

C: wand `rnd(10)` always then xresist skips HP; lightning `d(12,6)` always then resist skips damage. JS: same **iff** the predicate matches. Conferral ring no longer burns HP after those rolls. Public fortress never elec-destroys under shock-res.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: conferral shock-ring now skips exploding-wand HP and lightning self-zap; explode/pray/sit clones stay named.
- Must-fix stays empty for this SHA (the 328 item is shipped).
