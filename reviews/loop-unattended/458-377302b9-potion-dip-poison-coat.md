# Review 458 — 377302b9 — potion.c potion_dip poison-coat / healing unpoison (D-1497)

## Metadata
- Full / short hash: `377302b9b67b779b8b215b908a91b04053541f3c` / `377302b9`
- Parent: `08854746` (D-1496). This file audits **this SHA only** (fourth of ten `js/` commits since review **454**). Archive **Addressed:** D-1497 `377302b9` (this port commit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 21:38:41 +0200
- D-id: **D-1497**
- Stats: 11 files, +153 / −37 — `js/potion.js` +58 / −8.
- Claims to close: Open `potion.c` `potion_dip` poison-coat (named from D-1486 / review **447** item 1). Not oil/lamp. `reviews/loop-2026-08-15/` has no unpaid dip Must-fix.
- JS / map: `potion.js` `potion_dip`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **447** named `:2615–2636` after unicorn mix.

## Intent vs deliverable

Git subject promises: dipping a sickness potion coats poisonable missiles, and healing potions strip a non-permanent coating, instead of always printing Interesting...

Pinned C `potion.c` `potion_dip` `:2615–2636`, after lichen `:2596` and towel `:2608`, before acid `:2638` and oil `:2645`. Macro `obj.h:264–268` `is_poisonable` = WEAPON_CLASS and `oc_skill` in `-P_SHURIKEN`..`-P_BOW`, or `permapoisoned`. Callee `artifact.c` `permapoisoned` `:2837–2840` (Grimtooth only). `poof` then `return ECMD_TIME`. Caller `dodip` `:2371` / `dip_into` `:2404`. Unicorn mix is **after** `in_use=FALSE` at `:2726` (D-1486).

Old JS: after mix, jumped to `in_use=FALSE` + unicorn, so a dart+sickness printed Interesting...

The diff **does** insert the coat/unpoison arms **before** `in_use=FALSE`, with local `is_poisonable_dip` / `permapoisoned_dip`. It **does not** port towel, lichen, acid-erode, or oil/lamp. Named. It **does not** change `mkobj.js` `is_poisonable` (name-list / no Grimtooth).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `potion_dip` coat/unpoison | C `:2615–2636`, **LIVE this SHA** | |
| `is_poisonable_dip` | C `obj.h:264–268`, **CLONE matched here** | skill window + perma |
| `permapoisoned_dip` | C `:2837–2840`, **CLONE matched here** | `is_art` Grimtooth |
| `is_art` | C, **LIVE** `artifact.js` | |
| `poof` | C, **LIVE** same file | `trycall`+`useup` |
| `The` / `the` / `xname` | C, **LIVE** `objnam.js` | |
| `mkobj.js` `is_poisonable` | **not used** | name-list; no perma; mkobj RNG |
| towel / lichen | C `:2596–2613`, **OMIT named** | |
| acid `erode_obj` / oil / lamp | C `:2638–2724`, **OMIT named** | |

`node scripts/sym.mjs is_poisonable poof is_art` (dip did not delete mkobj’s helper; it added a differently named clone):

```
is_poisonable    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mkobj.js:463
             => Do NOT write clone #2.
poof             NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/potion.js:3076
is_art           js/artifact.js:1382   sync
```

Dip’s `is_poisonable_dip` is a **different name** matching the obj.h macro (mkobj’s function omits `permapoisoned` and uses a name list). No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.**

## C ↔ JS fidelity

Placement. C `:2615` is after mix `return` and after lichen/towel. JS still skips lichen/towel (named) then runs the poison `if`. Unicorn remains **after** `in_use=FALSE`. Horn+sickness therefore still reaches mixtype (horn is not `is_poisonable`). **Match D-1486 + this arm.** A dart never reaches unicorn in C or JS.

`is_poisonable`. C: `oclass==WEAPON_CLASS && oc_skill >= -P_SHURIKEN && oc_skill <= -P_BOW` (`P_SHURIKEN=24`, `P_BOW=20` → window **−24..−20**: shuriken, dart, crossbow bolt, sling-skill missiles, arrows) **or** `permapoisoned`. JS `game.objects[otyp].oc_skill` (`objects_data.js` `oc_skill: r[8]`) and the same inequalities, else Grimtooth. Long sword `oc_skill` is positive → skip. **Match `:264–268`.** Not mkobj’s `ARROW`/`DART`/… name list (that list is the same missiles in practice, minus Grimtooth).

`permapoisoned`. C `obj && is_art(obj, ART_GRIMTOOTH)`. JS same LIVE `is_art`. **Match `:2839`.** mhitm has an unexported clone; they did not add #2.

Coat. C `:2616–2626`: `POT_SICKNESS && !opoisoned`; quan>1 `"One of %s"` + `the(xname(potion))` else `The(xname(potion))`; `"forms a coating on %s"` + `the(xname(obj))`; `opoisoned=TRUE`; `poof`; `ECMD_TIME`. JS `opoisoned=1`. **Match, no dice.**

Unpoison. C `:2627–2634`: `opoisoned && !permapoisoned &&` healing/extra/full; `"A coating wears off %s."`; `opoisoned=0`; `poof`. **Match.** Grimtooth skips this branch (still can take the coat branch if `!opoisoned`).

Fall-through. Clean dart + healing: outer `is_poisonable` true, both inner false → C continues to acid/oil then `in_use=FALSE`. JS continues to named acid/oil then `in_use=FALSE` then unicorn then Interesting... **Match the Interesting... outcome.** Already-poisoned + sickness: `!opoisoned` false, healing false → same fall-through. **Match.**

Callee closure. LIVE: `poof`, `is_art`, `The`/`the`/`xname`. CLONE matched: `is_poisonable_dip`, `permapoisoned_dip`. OMIT named: towel, lichen, acid, oil. STUB: none in this arm. **Arm may ship.**

## Hallucinations / overclaim

Subject sickness coats / healing strips: **true** for the live window + Grimtooth. D-log “do not change mkobj named-missile RNG `is_poisonable`”: **true** (they did not). Stamping **Addressed:** D-1497 for `:2615–2636` is fair. Do **not** stamp “Match C oil gleam.” Do **not** stamp “Match C towel soak.” Do **not** treat fortress PASS as a `#dip` of a dart. Review **447** “weapon+sickness named” is closed for **this** object class.

This is **not** “dispatch ported, callee stubbed.” `poof` is the same D-1486 helper.

## Density

One `potion_dip` arm + two tiny C-matched clones. +58 JS. Oil left named. Playbook §2b. Did not glue acid. Acceptable.

## Branch-by-branch confirm

1. Dart + sickness, `!opoisoned`, quan 1: `The potion forms a coating`, `opoisoned=1`, `poof`. **Match `:2616–2626`.**
2. Same, potion stack quan>1: `One of the potions of sickness`. **Match `:2619–2622`.**
3. Arrow / shuriken / bolt: in window. **Match.**
4. Long sword + sickness: not poisonable → Interesting... (or later oil). **Match.**
5. Already `opoisoned` dart + sickness: fall through. **Match.**
6. Poisoned dart + healing/extra/full: coating wears off, `opoisoned=0`, `poof`. **Match `:2627–2634`.**
7. Clean dart + healing: Interesting... **Match.**
8. Grimtooth + healing: `permapoisoned` skip unpoison. **Match.**
9. Grimtooth + sickness, `!opoisoned`: coat. **Match** (macro includes perma).
10. Unicorn horn + sickness: still mixtype (D-1486). **Match; not stolen.**
11. Towel + water / lichen + acid / weapon + oil: still named. **Not this SHA.**
12. **Public-unhit.**

## Callers / RNG ledger

C `dodip` / `dip_into`. JS `potion_dip` from `dodip` (dip_into is later D-1500). No `rn2`/`rnd` in this arm. Public sessions do not `#dip` missiles.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Local clone names `_dip` so mkobj RNG stays put. Not a seed table of otyps.

## Verification

D-log: private canary **19**/19 (C/JS grep; Rule #2; dart/arrow/shuriken coat; quan>1 One of; already-poisoned sickness Interesting; healing/extra/full unpoison; clean dart+heal Interesting; long sword skip; Grimtooth skip unpoison / still coat; unicorn juice regression; same-otyp Interesting). That canary **does** hit this arm. Green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit.**

## Actionable C-wrongs

None that belong on Must-fix. The clones match `obj.h` / `permapoisoned`. Remaining named (map / Open): oil/lamp `more_dips`; acid `erode_obj`; lichen corpse; towel soak; `poly_obj` (later D-1499); `dip_into` (D-1500). Do not Must-fix “should have imported mkobj `is_poisonable`” (that helper omits Grimtooth and is the mkobj name list). Do not Must-fix “horn+sickness should coat.”

Verdict: **ACCEPT-WITH-DEBT**
