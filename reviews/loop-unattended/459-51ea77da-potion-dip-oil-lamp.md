# Review 459 — 51ea77da — potion.c potion_dip oil/lamp (D-1498)

## Metadata
- Full / short hash: `51ea77daac9dcf44c0f637cd9a0bff05e380d906` / `51ea77da`
- Parent: `377302b9` (D-1497). This file audits **this SHA only** (fifth of ten `js/` commits since review **454**). Archive **Addressed:** D-1498 `51ea77da`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 21:51:23 +0200
- D-id: **D-1498**
- Stats: 10 files, +239 / −31 — `js/potion.js` +132 / −5.
- Claims to close: Open `potion.c` `potion_dip` oil/lamp (named from D-1497). Not acid-erode. `reviews/loop-2026-08-15/` has no unpaid oil Must-fix.
- JS / map: `potion.js` `potion_dip`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **447** / **458** named `:2645–2724` after poison-coat.

## Intent vs deliverable

Git subject promises: oil potions gleam or derust weapons and fill oil or magic lamps instead of always printing Interesting...

Pinned C `potion.c` `potion_dip` `:2645–2686` (POT_OIL) then `more_dips` `:2687–2724` (OIL_LAMP / MAGIC_LAMP + POT_OIL). Between poison-coat and oil, C still has acid `:2638–2643` (named skip). Macros `obj.h` `is_weptool` `:249–250`, `is_ammo` `:238–241`; `objclass.h` `is_rustprone` / `is_corrodeable`. `goto more_dips` when `!WEAPON && !is_weptool`. Lit oil → `fire_damage`; cursed → `fingers_or_gloves(TRUE)` + `make_glib((Glib&TIMEOUT)+d(2,10))`. Lamp: either lit → `useup` + `explode(...,11,d(6,6),0,EXPL_FIERY)`; empty MAGIC `spe==0` → OIL_LAMP age 0; age>1000 full (`in_use=FALSE`) else fill `(!odiluted?4:3)*age/2` clamp 1500 + `check_unpaid`. Brass lantern is **not** in the lamp `if`. Unicorn mix stays after `:2726`.

Old JS: after poison-coat, `in_use=FALSE` then unicorn — oil always Interesting...

The diff **does** port the oil weapon/weptool arms and lamp fill (`oil_more_dips` for `goto`). It **does not** port acid. Named. It **does** add local `is_ammo_dip` / `is_weptool_dip` even though `wield.js` already **exports** `is_ammo` (same body) and `is_weptool` (C + name fallback).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `potion_dip` POT_OIL + more_dips | C `:2645–2724`, **LIVE this SHA** | |
| `fire_damage` | C `do.c`, **LIVE** `do.js:494` | not a stub |
| `explode` | C, **LIVE** `explode.js:301` | type **11** = `ZT_SPELL_O_FIRE` |
| `check_unpaid` | C `shk.c`, **LIVE** | |
| `make_glib` / `Glib` | C, **LIVE** same file | |
| `is_rustprone` / `is_corrodeable` | C `objclass.h`, **LIVE** mkobj | IRON / COPPER\|\|IRON |
| `is_ammo_dip` | C `:238–241`, **CLONE matched** | should have **imported** `wield.js` |
| `is_weptool_dip` | C `:249–250`, **CLONE matched** | `oc_skill != P_NONE` only |
| `Yname2_pot` | C `objnam.c:2378`, **CLONE** | clone #4 (`do.js` has one) |
| `fingers_or_gloves_dip` | C `do_wear.c:60`, **CLONE** | clone #3 |
| `gloves_simple_name_dip` | C, **CLONE** | `"gauntlets"` substring |
| `otense_pot` | C `otense`, **already** | |
| `exercise` / `makeknown` / `useup` | C, **LIVE** | potion local `useup` |
| `Blind` | C youprop, **CLONE** potion.js | no sticky (D-0716) |
| `body_part` | C, **LIVE** polyself (D-1496) | fingers |
| acid `erode_obj` | C `:2638–2643`, **OMIT named** | |
| brass lantern | not in C lamp `if`, **named** | |

`node scripts/sym.mjs fire_damage explode check_unpaid make_glib is_rustprone is_corrodeable is_weptool is_ammo Yname2 fingers_or_gloves Glib makeknown useup`:

```
fire_damage      js/do.js:494   ASYNC
explode          js/explode.js:301   ASYNC
check_unpaid     js/shk.js:2811   ASYNC
make_glib        js/potion.js:843   sync
is_rustprone     js/mkobj.js:467   sync
is_corrodeable   js/mkobj.js:485   sync
is_weptool       js/wield.js:51   sync
             !! ALSO 9 LOCAL CLONES — IMPORT the export
is_ammo          js/wield.js:68   sync
             !! ALSO 1 LOCAL CLONE js/u_init.js:1033
Yname2           NOT EXPORTED — 3 LOCAL (do/music/timeout)
             => Do NOT write clone #4.
fingers_or_gloves NOT EXPORTED — 2 LOCAL (eat/fountain)
             => Do NOT write clone #3.
Glib             js/potion.js:815   sync
makeknown        js/invent.js:1477   sync
useup            js/eat.js:1087   sync  (+ potion.js local)
```

This SHA **did** write `Yname2_pot` (#4) and `fingers_or_gloves_dip` (#3), and a same-body `is_ammo_dip` beside a LIVE export. Clones **match C** at this locus (not silent stubs). No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean.

**New gameplay RNG:** cursed spill `d(2,10)`; lit lamp `d(6,6)` into `explode`. Gleam/derust/fill have **no** dice. Public fortress does not `#dip` oil.

## C ↔ JS fidelity

Oil order. C `:2648–2685` if/else-if chain then **always** `exercise`+`makeknown`+`useup` unless `goto more_dips`. JS `oil_more_dips` flag. Lit: `fire_damage` then useup (does **not** fall into lamp explode). **Match C** — lit potion on a lamp burns the lamp object, it does not take `:2693`. Unlit cursed: spill + glib, useup. **Match `:2650–2653`.** Non-weapon `!is_weptool`: skip useup, fall into lamp. **Match `:2654–2656`.**

Gleam vs derust. C `:2661–2679`: `(!rustprone && !corrodeable) || is_ammo || (!oeroded && !oeroded2)` → sheen / Blind “feel oily”; else `--` rust/corrode words + `wisx`. JS same. **`is_ammo` is −P_CROSSBOW..−P_BOW (−22..−20): arrows/bolts, not darts (−23).** Rusty dart derusts; rusty arrow gleams. **Match `:238–241`.** Canary names that split.

`is_weptool`. C TOOL + `oc_skill != P_NONE`. Unicorn horn is a weptool → **sheen, not mixtype**. JS `is_weptool_dip` same. **Match.** (wield.js export adds a name fallback; unused here because `oc_skill` is populated.)

Lamp. C `:2690–2723`. Either `lamplit` → `useup` + `explode(ux,uy,11,d(6,6),0,EXPL_FIERY)` + `exercise(WIS,FALSE)`. JS `ZT_SPELL_O_FIRE=11` (already in potion.js; `read.c:1913`). **Match.** Empty MAGIC `spe==0` → OIL_LAMP, `age=0`, then fill. Charged MAGIC stays MAGIC and fills. **Match `:2700–2703`.** `age>1000`: full, `in_use=FALSE`, still `spe=1` + `makeknown(POT_OIL)` + `return`. **Match.** Else `You fill` + `check_unpaid` + `(4 or 3)*age/2` trunc + clamp 1500 + `useup` + `exercise(WIS,TRUE)`. **Match integer `/2`.**

`goto more_dips` on a **ring**: not a lamp → JS `in_use=FALSE` then unicorn (no) → Interesting... **Match.** Brass lantern: same. Named.

Acid still skipped. Weapon+POT_ACID does not erode; not this oil envelope.

Callee closure. LIVE: `fire_damage`, `explode`, `check_unpaid`, `make_glib`, rust/corrode, `exercise`, `makeknown`, `useup`. CLONE matched: ammo/weptool/Yname2/fingers. OMIT named: acid. STUB: none. **Arm may ship.** D-log “callees already live” is **true** for the four named imports (not UNTRAP-style).

## Hallucinations / overclaim

Subject gleam/derust/fill: **true**. D-log `is_ammo` arrows/bolts not darts: **true**. Stamping **Addressed:** D-1498 for `:2645–2724` is fair. Do **not** stamp “Match C acid `erode_obj`.” Do **not** stamp “Match C brass lantern fuel.” Do **not** treat fortress PASS as `#dip` oil. Horn+oil sheen **steals** D-1486 mixtype the same way C does — not a JS bug.

This is **not** “dispatch ported, callee stubbed.”

## Density

One C `POT_OIL` + `more_dips` envelope. +132 JS. Acid left named. Playbook §2b. Extra local clones where `is_ammo` already exports are waste, not a second subsystem. Acceptable.

## Branch-by-branch confirm

1. Sword + uncursed unlit oil, clean: sheen, `useup`. **Match `:2661–2666`.**
2. Rusty iron sword: less rusty, `oeroded--`, `wisx`. **Match `:2669–2679`.**
3. Corroded + rusty: “corroded and rusty.” **Match `:2672–2674`.**
4. Arrow (ammo) rusty: sheen, no `--`. **Match `is_ammo`.**
5. Dart rusty: derust (not ammo). **Match.**
6. Blind: “feel oily” / “feel less rusty.” **Match `:2667–2671`.**
7. Cursed oil: spill on fingers/gloves, `d(2,10)` glib, `useup`. **Match `:2650–2653`.**
8. Lit oil + weapon: `fire_damage`, `useup`, no lamp explode. **Match.**
9. Unlit oil + lit OIL_LAMP: explode `d(6,6)` type 11. **Match `:2693–2697`.**
10. Empty MAGIC: becomes OIL, fill. **Match `:2700–2703`.**
11. `age>1000`: full, keep potion. **Match `:2704–2707`.**
12. Diluted fill `3*age/2`. **Match `:2713`.**
13. Unicorn horn + oil: sheen, not juice. **Match weptool.**
14. Ring / brass lantern: Interesting... **Match / named.**
15. Sickness dart coat (D-1497) still before oil. **Match order.**
16. **Public-unhit.**

## Callers / RNG ledger

C `dodip` → `potion_dip`. Dice: `d(2,10)`, `d(6,6)` as above. `fire_damage` may consume more RNG (LIVE callee, not invented here).

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. Dynamic `import('./do.js')` / explode / shk are cycle breaks, not Node `fs`. No FORCE. `11` is C’s `ZT_SPELL_O_FIRE`, not a seed index.

## Verification

D-log: private canary **23**/23 (C/JS grep; Rule #2; sword sheen; rusty/corrode `--`; arrow skip derust; dart derust; Blind feel; cursed glib; lamp +800 / clamp 1500 / diluted *3/2; age>1000 keep potion; empty MAGIC→OIL; charged MAGIC stays; brass/ring Interesting; horn sheen; sickness coat regression; lit lamp explode). That canary **does** hit this envelope. Green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit.**

## Actionable C-wrongs

None that belong on Must-fix. Oil/lamp bodies match C; callees are LIVE or C-matched clones. Remaining named (map / Open): acid `:2638`; lichen/towel; `poly_obj` (next D-1499); `dip_into` (D-1500); brass lantern (not in C fill). Clone hygiene (not Must-fix): import `wield.js` `is_ammo` instead of `is_ammo_dip`; do not add `Yname2` clone #5. Do not Must-fix “horn+oil should mixtype.” Do not Must-fix “lit oil on lamp should explode” (C `fire_damage` first).

Verdict: **ACCEPT-WITH-DEBT**
