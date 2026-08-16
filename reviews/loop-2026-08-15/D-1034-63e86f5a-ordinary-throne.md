# Review — `63e86f5a` — D-1034 ordinary throne 1–13 + genocide

## Metadata
- Full / short hash: `63e86f5a28696d8848415cc0c16fade11e12fba3` / `63e86f5a`
- Parent: `a59caac8` (D-1033)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 17:56
- D-id: **D-1034**
- Stats: 13 files, **+570 / −73** — `js/sit.js` **+259**, `js/read.js` **+247**
- JS / map / cadence: `sit.js` ordinary switch; `read.js` `do_genocide`; `mon.js` `kill_genocided_monsters`; `mklev.js` `courtmon` export; no cadence

## Intent vs deliverable
Promise: ordinary `throne_sit_effect` cases 1–13 + `take_gold` + `do_genocide`.

Deliverable: the C switch **and** a `do_genocide(how)` getlin port (caller case 8 `how=5` = REALLY\|ONTHRONE). Two families (sit + read genocide). Largest SHA of the post-D-1022 run.

## Disposition (catch-up 2026-08-15)

| Risk | Status |
|------|--------|
| 3 `take_gold` without `remove_worn_item` | **Addressed:** D-1049 `9e24f61a` |
| 4 `dosit` trap skip | **Addressed:** D-1039 `45784d80` (same gap as D-1033) |
| 1–2 `do_genocide` / partial callees | named omit / unhit — not Must-fix |
| `kill_eggs` after genocide | **Addressed:** D-1097 `d1e7ae23` |

## Inventory
| File | Role |
|------|------|
| `js/sit.js` | cases 1–13 + vanish already D-1033 |
| `js/read.js` | `do_genocide` REALLY/PLAYER/ONTHRONE |
| `js/mon.js` | `kill_genocided_monsters` |
| `js/mklev.js` | export `courtmon` |
| `js/spell.js` | `take_gold` import (cursed_book) |

## C ↔ JS fidelity

### Ordinary switch — branch by branch
C `sit.c:68–209` after `rnd(6)>4` and `!In_V_tower`. JS `sit.js:567–732`. Wizard getlin omit (same live `rnd(13)` RNG).

| Case | Evidence |
|------|----------|
| 1 | C `adjattrib(rn2(A_MAX), -rn1(4,3), FALSE)` then `losehp(rnd(10), "cursed throne")`. JS `adjattrib(..., 0)`: `attrib.js` `msgflg<=0` → You_feel ≡ C FALSE. RNG `rn2` then `rn1` then `rnd`: LTR match. |
| 2 | `adjattrib(rn2(A_MAX), 1, FALSE)` / JS `0`. Match. |
| 3 | “A%s electric shock” Shock → `"n"` else `" massive"`; `rnd(6)` vs `rnd(30)`; `exercise CON`. Match. |
| 4 | heal max+4, cream, `make_blinded(0,TRUE)`, `make_sick(0,…,SICK_ALL)`, `heal_legs(0)`, botl. Envelope match; quality = those `make_*`. |
| 5 | `take_gold`: C `remove_worn_item`+`delobj` COIN. JS invent splice + `delobj`, **no** `remove_worn_item` (named). Strange sensation / no gold message: match. |
| 6 | `uluck + rn2(5) < 0` → luck+1 else `makewish`. Match. |
| 7 | `rnd(10)` courtmon `makemon` at (tx,ty); Dame/Sire voice. SetVoice omit. |
| 8 | `do_genocide(5)`. See below. |
| 9 | Luck>0 → `make_blinded(BlindedTimeout+rn1(100,250))` + `change_luck(-rnd(2) or -1)` else `rndcurse`. Match. |
| 10 | Luck<0 **or** `HSee_invisible & INTRINSIC` → nommap confuse `HConfusion&TIMEOUT+rnd(30)` else `do_mapping`; else vision/tingle + `HSee_invisible \|= FROMOUTSIDE`. JS `eyecount`/`vtense` fallthrough 2→1: match. |
| 11 | Luck<0 `aggravate` else `tele()`. Envelope match. |
| 12 | insight; `invent` → `identify_pack(rn2(5), FALSE)`. JS `invent.length`: empty C `gi.invent` NULL vs JS `[]` — both skip. |
| 13 | pretzel `make_confused((HConfusion&TIMEOUT)+rn1(7,16))`. Match. |

Vanish: `!special && !rn2(3) && (!wizard \|\| y_n Analyze=='y')`. JS `wizard_mode()` + `yn_function`. In non-wizard the `yn` is not evaluated (short-circuit): **no extra RNG**. Match.

### `do_genocide(5)` — new subsystem, not a one-line stub
C `read.c` `do_genocide`: getlin type, `G_GENO` refuse, self-geno ONTHRONE killer “imperious order”, `kill_genocided_monsters`.

JS `read.js:1021`: `GENO_REALLY=1`, `GENO_ONTHRONE=4`, `how=5` both bits. ONTHRONE killer `KILLED_BY_AN` / `imperious order`: matches C. `getlin` monster name; 5 tries; `G_GENO` thunderous No mortal.

**Risks:** `name_to_mon` / livelog / Hallu / cham `newcham` named; `kill_eggs` **Addressed:** D-1097. An interactive `#sit` throne case 8 is in **no** public trace. getlin can desync I/O without touching the RNG prefix if the player never sits.

`G_GENO 0x0020` in this commit (`monsters.js`): treat as a **C const** (obj.h/monflag), not a trace constant.

### `courtmon`
mklev export. Not re-read line by line here; if JS `courtmon` is still a subset of `mkroom.c`, case 7 spawns the **wrong** court monster (then `makemon` RNG).

## Constitution / playbook
Bans clean. `getlin` = existing `nhgetch` input chain. No seed-gate. Cadence not mixed in (good).

## Density (§2b)
**Too big** if `do_genocide` counts as a separate read.c family (it is one). Justifiable as the immediate callee of case 8 — but +247 `read.js` + kill_genocided + courtmon is a sit cluster **and** a mini genocide port. Quality: the sit switch is better than D-1023; genocide is a second novel.

## Documentation
D-log honest on wizard getlin / kill_eggs. CURRENT Keep 1–13. NOTES unhit: true.

## Verification
Cohort 9/9 including `#sit` seeds. Those seeds **already PASS before** the switch (fortress). They do not prove cases 1–13. Private journal node thin vs 13 arms.

## Risks / debt
1. `do_genocide` getlin / `name_to_mon` unhit.
2. `courtmon` / `identify_pack` / `tele` / `aggravate` / `do_mapping` = partial callees.
3. `take_gold` without `remove_worn_item`. **Addressed:** D-1049 `9e24f61a`
4. `dosit` trap skip (D-1033) still applies: the switch is reached only if the cell has no object **and** JS ignores the trap.

## Verdict
- Verdict: **QUALITY-RISK**
- Score: **5.5 / 10**
- One sentence: the **13 cases** and `!rn2(3)` puff are a careful C copy (RNG, `adjattrib` msgflg, genocide bits 5); stuffing full `do_genocide` into the same SHA, with no sitting trace, is a Keep of the switch plus an unexercised read.c port.
