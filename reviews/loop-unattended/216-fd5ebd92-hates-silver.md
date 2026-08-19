# Review 216 — fd5ebd92 — mondata.c hates_silver (D-1254)

## Metadata
- Full / short hash: `fd5ebd925eaa1d635cb2a3e4ed58821a0f6ef227` / `fd5ebd92`
- Parent: `218836ee` (reviews **212–215** + cadence **#1590**). JS parent `d384e339` (D-1253). This file audits **this SHA only**. Archive row **Addressed:** D-1254 `fd5ebd92` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 04:32:30 +0200
- D-id: **D-1254**
- Stats: 14 files, +116 / −53 — `js/monsters.js` +22; `js/weapon.js` −clone +import; `js/muse.js` −clone +import; comment `js/uhitm.js`.
- Claims to close: Must-fix from review **212** (`special_dmgval` local `mon_hates_silver` was `M2_WERE|M2_DEMON` only). Not glob/doname. `reviews/loop-2026-08-15/` has no unpaid silver Must-fix.
- JS / map: `monsters.js` `hates_silver` / `mon_hates_silver`; `c-js-map/data.md`. `dmgval` silver/blessed/axe still named.
- Prior reviews this SHA claims to close: **212** Actionable item 1.

## Intent vs deliverable

Git subject promises: “Match C mondata.c hates_silver so special_dmgval silver vs shade/vampire/imp (and vampshifters) actually sears, instead of the M2_WERE|M2_DEMON clone.”

C `hates_silver` (`mondata.c:524–528`) is were / `S_VAMPIRE` / demon / `&mons[PM_SHADE]` / (`S_IMP` && not tengu). `mon_hates_silver` (`:517–519`) ORs `is_vampshifter`. Callers this SHA touches: `weapon.c` `special_dmgval` (`:401–422`) and `select_hwep` (`:734–735`); `muse.c` whip yank (`:2590`). `dmgval` silver (`weapon.c:331`) is a **different** function — named.

Old JS: two local clones `f2 & (M2_WERE|M2_DEMON)`. Review **212** showed a shade hug with a silver ring printed harmlessly-through when C would `rnd(20)` + `damageum`.

The diff **does** canonical predicates in `monsters.js` and deletes both clones. It does **not** add `dmgval` silver or AT_ENGL. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hates_silver` | C `:524–528`, **new** | mndx, not `mons()` identity |
| `mon_hates_silver` | C `:517–519`, **new** | live `is_vampshifter` |
| `is_were` / `is_demon` | C `mondata.h`, **imported live** | `M2_WERE` / `M2_DEMON` |
| `is_vampshifter` | C `mondata.h`, **imported live** | cham vampire |
| `special_dmgval` | C `:361–431`, **rewired** | was truncated clone |
| `select_hwep` | C `:734–735`, **rewired** | skip silver if hates |
| muse whip `where_to===3` | C `:2590`, **rewired** | silver → floor not snatch |
| `dmgval` silver | C `:331`, **named omit** | still no `rnd(20)` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG in the predicates.** `special_dmgval` already rolled `rnd(20)` when the truncated test fired; this SHA lets that roll happen for shade/vampire/imp.

## C ↔ JS fidelity

Pinned C (`mondata.c:524–528`):

```
    return (boolean) (is_were(ptr) || ptr->mlet == S_VAMPIRE || is_demon(ptr)
                      || ptr == &mons[PM_SHADE]
                      || (ptr->mlet == S_IMP && ptr != &mons[PM_TENGU]));
```

JS: `is_were(ptr) || ptr.mlet === 'S_VAMPIRE' || is_demon(ptr) || (ptr.mndx\|0) === PM_SHADE || (ptr.mlet === 'S_IMP' && (ptr.mndx\|0) !== PM_TENGU)`. `PM_SHADE` / `PM_TENGU` come from `monsterNames.indexOf` (both exist in `generated/monsters_data.js`). `mons()` allocates, so C’s `&mons[PM_SHADE]` cannot be `===` in JS; mndx is the established stand-in (same as D-0928 cham). `is_vampire` already uses `'S_VAMPIRE'`. Match the five arms.

`mon_hates_silver(mon)` is `is_vampshifter(mon) || hates_silver(mon?.data)`. Null ptr → false (C is not called with NULL). Match.

`special_dmgval` now imports that export. Gloves present ⇒ rings skipped; no gloves ⇒ left then right silver `rnd(20)` with the “don’t double damage” rule. Shade + blessed cloak still uses live `mon_hates_blessings` (undead|demon — shade is undead). Shade + silver ring, no gloves: JS now `rnd(20)` + `silverhit |= W_RINGL`. That is review **212** branch 10, now matching C.

`select_hwep` `oc_material != SILVER || !mon_hates_silver(mtmp)` — a shade/vampire/imp will not `Oselect` a silver saber. C same. Muse whip: silver + hates → `where_to = 2` (drop) not snatch. Live `dropy` / `mpickobj`. Not a stub yank.

Remaining `M2_WERE|M2_DEMON` clones: grep of `js/` after this SHA finds only the canonical `hates_silver` body. Deleted clones are gone.

## Hallucinations / overclaim

Subject + D-1254 say silver vs shade/vampire/imp (and vampshifters) actually sears instead of the flag clone. **Canonical `hates_silver` + both callers importing it are the hunk.** Stamping **Addressed:** D-1254 is fair for review **212** item 1. This is **not** “Match C dispatch, callee is a stub”: `special_dmgval` still adds `rnd(20)` through live `oc_material == SILVER`. Do **not** stamp “Match C `dmgval` silver/blessed/axe” or “Match C AT_ENGL `gulpum`.” `mons()`-vs-pointer is documented, not a fake shade test.

## Density

One C predicate pair plus deleting the two clones C’s callers used. ~22 JS lines + import churn. Small but the Must-fix cluster (not a third combat system). Did not glue glob/doname.

## Branch-by-branch confirm

1. Shade: `hates_silver` true (mndx). Match.
2. Vampire / vampire lord (`S_VAMPIRE`): true. Match.
3. Imp / quasit / lemure / homunculus (`S_IMP`, not tengu): true. Match.
4. Tengu (`S_IMP` but excluded): false. Match.
5. Werewolf / werejackal: true via `is_were`. Match.
6. Horned devil / other `is_demon`: true. Match.
7. Human / fog cloud / grid bug: false. Match.
8. Vampshifter currently fog: `hates_silver(data)` false, `mon_hates_silver` true via cham. Match.
9. Rope-golem choke, silver ring, no gloves, vs shade: `rnd(20)` + hit. Match (was **212** C-wrong).
10. Same hug, no silver/blessed: harmlessly through. Match.
11. `select_hwep` vs shade: skip `SILVER_SABER`. Match.
12. Whip yank silver vs demon: drop not snatch. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. mndx is C’s `&mons[PM]` stand-in, not a recorded coordinate. Plain ESM.

## Verification

Journal: private canary **21**/21 (C body; shade/imp/vampire/were/demon true; tengu/human/grid-bug/fog false; vampshifter fog true; silver ring vs shade `rnd(20)` + `W_RINGL`; tengu 0; rope-golem choke damages shade; no-silver still through); green+strict seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a public session Upolyd-chokes a shade with silver or a shade/vampire/imp `select_hwep`s silver. Cadence this audit: full `sessions` at HEAD `466adf3e` **44**/44.

## Actionable C-wrongs

None for Must-fix. Review **212** item 1 is the hunk: the truncated clone is gone.

Named omits (map, not Must-fix):

1. `dmgval` silver / blessed / axe / thick-skin / shade extras (`weapon.c:331` and the large-monster switch)
2. AT_ENGL `gulpum`; fight_empty `explum`; `failed_grab` `some_mon_nam`
3. Hug outer `dhit = 1` (latent vs AT_EXPL; D-1251 already shipped rehumanize)

Do not Must-fix “JS uses mndx not pointer identity.” Do not Must-fix “`select_hwep` now skips silver for shades.”

## Callers / RNG ledger

C: `special_dmgval`, `select_hwep`, muse whip, plus `dmgval` (named). JS the first three. RNG: `rnd(20)` inside `special_dmgval` when silver now matches C’s hate-test. Public fortress is not evidence a shade was hugged.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `special_dmgval` silver vs shade/vampire/imp now uses C `hates_silver` + `is_vampshifter`; `dmgval` silver stays named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1254 `fd5ebd92`.
