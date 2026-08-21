# Review 344 — ec703f48 — uhitm.c hmon shade_miss (D-1384)

## Metadata
- Full / short hash: `ec703f48cea02c523ccaa4f9e6259d973a637725` / `ec703f48`
- Parent: `970c6097` (D-1383). This file audits **this SHA only** (sixth of eight `js/` commits since review **338**). Archive **Addressed:** D-1384 `ec703f48` already has the short hash (filled by D-1385).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 18:36:30 +0200
- D-id: **D-1384**
- Stats: 10 files, +109 / −29 — `js/uhitm.js` +32 / −6; `js/mhitm.js` comments.
- Claims to close: Open `uhitm.c` `hmon` `shade_miss` caller (named from D-1354 / D-1383). Not zap. `reviews/loop-2026-08-15/` has no unpaid hmon shade Must-fix.
- JS / map: `uhitm.js` `hmon`; callee `mhitm.js` `shade_miss`. `c-js-map/turns.md`. `mhitm_ad_phys` / get_dmg_bonus min-1 / unarmed `special_dmgval` still named.
- Prior reviews this SHA claims to close: D-1383 follow-up named this Open.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c hmon_hitmon shade_miss so melee or applied 0-damage vs a shade actually passes harmlessly through and wakes, instead of printing You hit.”

C `uhitm.c` `hmon_hitmon` `:1812–1822`:

```
    if (hmd.dmg < 1) {
        boolean mon_is_shade = (mon->data == &mons[PM_SHADE]);
        hmd.dmg = (hmd.get_dmg_bonus && !mon_is_shade) ? 1 : 0;
        if (mon_is_shade && !hmd.hittxt
            && thrown != HMON_THROWN && thrown != HMON_KICKED)
            hmd.hittxt = shade_miss(&gy.youmonst, mon, obj, FALSE, TRUE);
    }
```

Barehands `:842–850`: shade `dmg=0` else `rnd(!martial?2:4)`; then **always** `special_dmgval` gloves/rings. Thrown/kicked skip this caller (`bhit` D-1383).

Old JS: weapon `dmgval` 0 still said You hit; unarmed ignored the shade zero.

The diff **does** barehands shade `dmg=0` and melee/applied `dmg<1` `shade_miss(..., false, true)`. It does **not** add `special_dmgval` or non-shade `get_dmg_bonus` bump-to-1. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hmon` dmg&lt;1 shade | C `:1812–1822`, **wired** | melee/applied only |
| barehands shade 0 | C `:842–844`, **wired** | skips `rnd(2/4)` |
| `shade_miss` | C `:2016–2051`, **imported live** | thrown=FALSE |
| thrown/kicked skip | C `:1818–1819`, **wired** | D-1383 owns those |
| `special_dmgval` unarmed | C `:851`, **named omit** | gloves/silver rings |
| get_dmg_bonus min-1 | C `:1817`, **named omit** | non-shade bump |
| `mhitm_ad_phys` | C, **named omit** | already Open |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** unarmed vs shade **stops** burning `rnd(2/4)` (C `:842–847`). Silver weapon still hits via `dmgval` (D-1354).

## C ↔ JS fidelity

After `dmg_recalc`, JS `if (dmg < 1) { dmg=0; if (shade && !hittxt && not thrown/kicked) hittxt = shade_miss(..., false, true) }`. Melee `Your` pline; `msleeping=0`; later `!hittxt` skips You hit. Match `:1812–1822` minus the get_dmg_bonus ternary (JS always 0 — named).

Barehands shade skips `rnd`. Without silver gloves/rings, C `special_dmgval` is also 0 so both `shade_miss`. With blessed gloves or silver rings, C can `dmg>=1` and **hit**; JS still `shade_miss`. That is the named `special_dmgval` omit, not a failed keep-path for 0-damage shade. Do not Must-fix “always hit unarmed shade.”

Thrown/kicked: JS skips this arm even if `dmg<1`. Those weapons go through `bhit` (D-1383) or throwit fly (named). Match C’s `thrown != HMON_THROWN && != HMON_KICKED`.

Hallucination check: “Match C `hmon` shade_miss” while **`shade_miss` is live** is not a dispatch-stub lie. Do **not** stamp “Match C `special_dmgval`.” Do **not** stamp “Match C get_dmg_bonus min-1.”

## Hallucinations / overclaim

Subject says melee or applied 0-damage vs a shade passes harmlessly through and wakes instead of You hit. **True on the keep-path** for a non-glare weapon (or unarmed without special_dmgval). **False until named for unarmed silver rings/gloves** (C may deal damage). Stamping **Addressed:** D-1384 for `:1812–1822` + `:842–844` is fair. Do **not** treat fortress PASS as punching a shade.

## Density

One caller plus the barehands shade zero the same function needs. ~32 lines of JS. Playbook §2b tight cluster. Third sibling `shade_miss` peel. Did not glue `mhitm_ad_phys` (already Open).

## Branch-by-branch confirm

1. Melee club vs shade (`dmgval` 0): harmlessly + wake; no You hit; no HP. Match.
2. Unarmed vs shade, no rings: no `rnd`; shade_miss. Match minus special_dmgval 0.
3. Applied: thrown=APPLIED; shade_miss. Match.
4. Thrown/kicked in hmon: skip shade_miss here. Match.
5. Silver saber: `dmgval` &gt;0; hit. Match D-1354.
6. Gnome: dmg&gt;0; You hit. Match.
7. **Public-unhit** unless a session melees a shade with a non-glare weapon.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **17**/17 (C/JS grep; melee club harmlessly + wake + no HP; punch no rnd; applied Your; thrown/kicked skip in hmon; silver glare hits; gnome hits; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD `1f94d5e3` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The 0-damage melee/applied keep-path matches `:1818–1822`. `special_dmgval` / min-1 are named omits of adjacent C lines.

Named omits (map / already-Open, not Must-fix):

1. unarmed `special_dmgval` gloves/silver rings
2. non-shade `get_dmg_bonus` bump-to-1
3. `mhitm_ad_phys` shade_miss (already Open)
4. cream pie / potion vs shade; hmonas inline

Do not Must-fix “shade_miss thrown melee” (C skips). Do not Must-fix “You hit on 0-dmg club vs shade” (C hittxt).

## Callers / RNG ledger

C unarmed shade: no `rnd(2/4)`. JS same. Public fortress does not melee a shade.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: melee/applied 0-dmg vs a shade now `shade_miss`es and wakes; unarmed `special_dmgval` stays named.
- Must-fix stays empty for this SHA.
