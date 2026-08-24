# Review 377 — e78d7780 — spell.c spelleffects SPE_DETECT_TREASURE peffects (D-1417)

## Metadata
- Full / short hash: `e78d77803a41311abeb63fc3ca2b5f01983e23cc` / `e78d7780`
- Parent: `22e87b3b` (D-1416). This file audits **this SHA only** (fourth of nine `js/` commits since review **373**). Archive **Addressed:** D-1417 `e78d7780` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 18:49:45 +0200
- D-id: **D-1417**
- Stats: 11 files, +198 / −40 — `js/detect.js` +66 / −5; `js/potion.js` +24 / −1; `js/spell.js` +18 / −4.
- Claims to close: Open `spell.c` `spelleffects` SPE_DETECT_TREASURE peffects (named from D-1408). Not DETECT_MONSTERS. `reviews/loop-2026-08-15/` has no unpaid detect-treasure Must-fix.
- JS / map: `spell.js` `spelleffects`; `potion.js` `peffects` / `peffect_object_detection`; `detect.js` `object_detect`. `c-js-map/turns.md`. Buried / minvent / cursed-mimic still named.
- Prior reviews this SHA claims to close: **368** named remaining peffects after haste.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_DETECT_TREASURE so casting that spell detects objects via peffects/object_detect, instead of printing Nothing happens.”

C `spell.c` `spelleffects` `:1534–1546`:

```
    case SPE_HASTE_SELF:
    case SPE_DETECT_TREASURE:
    case SPE_DETECT_MONSTERS:
    case SPE_LEVITATION:
    case SPE_RESTORE_ABILITY:
        if (role_skill >= P_SKILLED)
            pseudo->blessed = 1;
        FALLTHROUGH;
    case SPE_INVISIBILITY:
        (void) peffects(pseudo);
```

Callee `potion.c` `peffects` `:1371–1375` POT_OBJECT_DETECTION / SPE_DETECT_TREASURE → `peffect_object_detection` `:954–961`: `if (object_detect(otmp, 0)) return 1;` else `exercise(A_WIS, TRUE); return 0;` then peffects returns −1. `dopotion` `:retval >= 0` skips a second `useup` because empty `object_detect` already `strange_feeling` → `useup`. `detect.c` `object_detect` `:603–788`: `do_dknown` iff detector is blessed POTION or SPBOOK; `observe_recursively` invent then floor (and buried/minvent); empty + detector → `strange_feeling(..., "You feel a lack of something.")` (`:686–690`). C `strange_feeling` `:1461–1476` is beginner/Hallu “normal” vs “strange”, then `trycall` + `useup`. JS clone in `detect.js` matches those strings; it is not a no-op.

Old JS: other-otyp `Nothing happens.`; `object_detect` `void detector`.

The diff **does** put SPE_DETECT_TREASURE on the haste skilled-bless `peffects` arm, add `peffect_object_detection`, wire POT_OBJECT_DETECTION, and pass the detector into `object_detect` (invent+floor `do_dknown`, empty `strange_feeling`). It **does not** port buried / minvent / cursed-mimic / findgold / `clear_stale_map`. Named. Sibling DETECT_MONSTERS still `Nothing happens.` at this SHA.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_DETECT_TREASURE | C `:1534–1546`, **wired** | skilled bless then peffects |
| `peffects` POT/SPE detect treasure | C `:1371–1375`, **wired** | return 1 vs −1 |
| `peffect_object_detection` | C `:954–961`, **wired** | live `object_detect` |
| `object_detect` detector | C `:603–788`, **partial live** | invent+floor envelope |
| `observe_recursively` | C `detect.c`, **wired** | invent + floor |
| `strange_feeling` | C `potion.c:1461–1476`, **clone in detect.js** | beginner/Hallu + trycall + useup |
| `exercise(A_WIS,TRUE)` | C, **imported live** | only when something found |
| `dopotion` retval>=0 skip useup | C, **already live** | empty potion consumed once |
| buried / minvent / mimic / gold | C `:654–680`, **named omit** | not counted, not mapped |
| DETECT_MONSTERS siblings | C same arm, **named omit** | this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in `object_detect` itself; `exercise(A_WIS,TRUE)` may `rn2(19)`. Empty path no extra dice. Public fortress never casts detect treasure.

## C ↔ JS fidelity

Spell arm: unskilled pseudo stays uncursed (no `do_dknown`); skilled sets `blessed` then `peffects`. Match `:1539–1546` for this otyp. SPE_INVISIBILITY not blessed. Match (still named omit at this SHA). Pseudo `quan=20`: `strange_feeling` `useup` decrements the fake, not a real book. Match C.

`peffect_object_detection` return 1 vs 0 matches `:957–960`. `peffects` `if (...) return 1; return -1` matches `:1373–1375` + `:1424`. `dopotion` `retval >= 0` return without `useup` matches empty potion already consumed. Found objects: return −1 → `useup` the potion. Match.

`do_dknown`: blessed potion or SPBOOK only (`oclass`, not otyp). Uncursed potion/spell does **not** observe invent. Match `:609–611`. Invent then floor `observe_recursively`. Match `:639–651` for those two chains. Buried/minvent `do_dknown` named skip.

Empty: JS `!ct && !ctu` → `strange_feeling(detector, 'You feel a lack of something.')` return 1. C `:686–690` also requires `!clear_stale_map(...)`. Named. Underfoot-only (`ctu && !ct`) C may `You sense %s nearby` without `cls`. JS still `cls` + presence/absence pline. Named absence-underfoot. Floor objects: `cls`, `map_object` top-of-pile, `You detect the presence of objects.`, `browse_map`, `map_redisplay`. Envelope match.

`strange_feeling` is a **clone** of `potion.c:1461–1476` living in `detect.js`. Beginner/`!txt` Hallu “normal” vs “strange”; else the txt; `dknown` `trycall`; `useup`. Crystal-ball `detector==null` skips. Match the C function. Not a stub.

Hallucination check: “Match C `peffects`/`object_detect`” while **`object_detect` is the live detect.js export that maps floor objects** is not a dispatch-stub lie. “Match C buried/minvent detection” **would** be. The D-log names those. Do **not** stamp “Match C `clear_stale_map`.” Do **not** stamp “Match C SPE_DETECT_MONSTERS” (still `Nothing happens.` at this SHA).

## Hallucinations / overclaim

Subject says casting detect treasure detects objects via peffects/`object_detect` instead of `Nothing happens.` **True for floor objects (and blessed invent `dknown`).** **True that empty prints lack-of-something and consumes a potion once.** **False until named for objects only in minvent/buried/gold/mimic.** Stamping **Addressed:** D-1417 for `:1534–1546` + `:954–961` + floor envelope is fair. Do **not** treat fortress PASS as a detect-treasure cast.

## Density

One C spell otyp plus the `peffects` case and the detector envelope `object_detect` already needed. ~90 lines of JS. Playbook §2b caller/callee cluster. Did not glue DETECT_MONSTERS (next Open). Right size. Did not rewrite `browse_map`.

## Branch-by-branch confirm

1. Unskilled spell, floor loot: unblessed; map floor; no invent `dknown`; WIS exercise; TIME. Match.
2. Skilled: `pseudo.blessed`; invent+floor `observe_recursively`. Match.
3. Empty + detector: lack-of-something; potion useup once (`return 1`). Match.
4. Empty + null detector (crystal ball): no strange_feeling; return 1. Match `:688–690` `if (detector)`.
5. POT_OBJECT_DETECTION same helper. Match C case pairing.
6. SPE_DETECT_MONSTERS still `Nothing happens.` Named at this SHA.
7. Buried/minvent-only loot: C would map; **JS empty + strange_feeling. Named omit, not a silent stub of the floor path.**
8. **Public-unhit** until a session casts detect treasure.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded overlay. Plain ESM. Dynamic `detect.js` import is cycle avoidance, not a stub.

## Verification

Journal: private canary **18**/18 (C/JS grep; unskilled empty lack-of-something no dknown; skilled empty invent dknown; floor presence; POT_OBJECT_DETECTION dopotion useup; empty potion strange_feeling useup; null detector no strange_feeling; DETECT_MONSTERS still omit; HASTE/CURE_BLINDNESS/POT_HEALING regression; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not detect treasure.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Floor + blessed `do_dknown` + empty `strange_feeling` match the keep-path this SHA promised. Buried/minvent are named omits.

Named omits (map / Open, not Must-fix):

1. `object_detect` buriedobjlist / minvent / cursed-mimic / findgold
2. `clear_stale_map` / underfoot-only `You sense nearby`
3. boulder dual-class
4. SPE_DETECT_MONSTERS / LEVITATION / RESTORE_ABILITY / INVISIBILITY (already Open)
5. potionhit / potionbreathe / mix object-detection

Do not Must-fix “empty should still browse_map” (C `strange_feeling` return 1). Do not Must-fix “unskilled should observe invent” (C `do_dknown` needs blessed). Do not Must-fix “dispatch is a stub” (`object_detect` maps floor).

## Callers / RNG ledger

C callers: `spelleffects` SPE_DETECT_TREASURE; `dopotion` / `peffects` POT_OBJECT_DETECTION. New RNG: `exercise(A_WIS,TRUE)` on found-objects only. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
