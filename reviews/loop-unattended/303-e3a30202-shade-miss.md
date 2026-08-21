# Review 303 — e3a30202 — uhitm.c shade_miss + mhitm.c hitmm (D-1341)

## Metadata
- Full / short hash: `e3a30202c59691f725c8a99fb53c44408584ab77` / `e3a30202`
- Parent: `85eee14d` (D-1340). This file audits **this SHA only**. Archive **Addressed:** D-1341 lacked the short hash; this review commit fills `e3a30202`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 06:17:28 +0200
- D-id: **D-1341**
- Stats: 10 files, +152 / −35 — `js/mhitm.js` +79 / −7.
- Claims to close: Open `mhitm.c` hitmm `shade_miss` (named from D-0887 / review **302**). Not `arti_reflects`. `reviews/loop-2026-08-15/` has no unpaid shade_miss Must-fix.
- JS / map: `mhitm.js` `shade_miss` / `shade_aware` / `hitmm` caller; `c-js-map/turns.md`. `dmgval` shade/`shade_glare`; mthrowu / zap `bhit` / hmon / `mhitm_ad_phys` callers; silver sear still named.
- Prior reviews this SHA claims to close: **302** / D-1340 named `shade_miss` after AT_HUGS; D-0887 named it with silver sear.

## Intent vs deliverable

Git subject promises: “Match C mhitm.c hitmm shade_miss so a monster's successful melee vs a shade actually passes harmlessly through, instead of still running mdamagem.”

C `hitmm` (`mhitm.c:659–661`):

```
    compat = !magr->mcan ? could_seduce(magr, mdef, mattk) : 0;
    if (!compat && shade_miss(magr, mdef, mwep, FALSE, gv.vis))
        return M_ATTK_MISS; /* bypass mdamagem() */
```

C `shade_miss` (`uhitm.c:2016–2051`) + `shade_aware` (`:1992–2011`): return false if not shade **or** `(obj && dmgval(obj,mdef))`; verbose harmlessly-through (`Your`/`s_suffix`/`The` + `vtense`); `map_invisible` if unseen; wake `msleeping` unless youdef.

C `dmgval` (`weapon.c:307–308`): `ptr==PM_SHADE && !shade_glare(otmp)` → `tmp=0`. JS `dmgval` still defers that line (comment “thick-skin/shade/silver…”). Named so a club still “hurts”.

Old JS: `hitmm` always continued to vis pline + `mdamagem`.

The diff **does** port `shade_miss`/`shade_aware`/`m_next2u` and the `!compat && shade_miss` return. It does **not** add `shade_glare` to `dmgval`. Named. It does **not** wire mthrowu / zap / hmon callers.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `shade_miss` | C `:2016–2051`, **wired** | export in `mhitm.js` (uhitm already imports mhitm) |
| `shade_aware` | C `:1992–2011`, **wired** | boulder/ball/chain/mirror/garlic/silver |
| `m_next2u_mm` | C `you.h:560`, **clone** | `dist2<=2` |
| `hitmm` caller | C `:660–661`, **wired** | `thrown=false`, verbose=`_mm_vis` |
| `dmgval` | C `weapon.c`, **imported live, partial** | shade/`shade_glare` named |
| `cxname` / `vtense` / `The` | C `objnam.c`, **imported live** | |
| `sensemon` / `map_invisible` | C, **imported live** | |
| mthrowu / zap `bhit` / hmon | C other callers, **named omit** | |
| `mhitm_ad_phys` shade | C, **named omit** | |
| silver sear | C `hitmm:706`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG inside `shade_miss`:** none. `dmgval` may still `rnd()` when `obj` is set — that roll is why a club currently fails the miss (named). Unarmed `mwep==null` skips `dmgval` entirely (C same: `obj && dmgval`).

## C ↔ JS fidelity

Early-out uses mndx (D-0928) not `mons()` identity. Extra `!pd` → false. Third clause `(obj && dmgval(obj,mdef))` is the C predicate **as written**. Because JS `dmgval` omits `:307–308`, a non-glare weapon is non-zero and `shade_miss` returns false — armed melee still runs `mdamagem`. Unarmed (AT_CLAW/BITE/HUGS with `mwep` null, including D-1340 hugs) takes the miss, prints, wakes. That is the subject’s “instead of still running mdamagem” for the usual unarmed case. Armed is the named `dmgval` omit, not a broken `shade_miss` body.

Verbose gate: `youdef \|\| cansee \|\| sensemon \|\| (youagr && m_next2u)`. Match `:2030–2032`. Noun: `(!obj \|\| shade_aware) ? "attack" : cxname`. `shade_aware` otyp list matches `:2003–2008` (SILVER via `game.objects[].oc_material`). Thrown uses `The(what)` not `pline_The`. Wake `msleeping=0` unless youdef. Match `:2048–2050`. Compat seduce still skips shade_miss (C `!compat &&`).

`dmgval` is a **C callee**, not a local clone. It is partial: no `shade_glare` (silver or SPFX_DFLAG2+M2_UNDEAD artifact, `artifact.c:555–570`). Do not treat that as “shade_miss is a stub.” The helper returns true for unarmed vs shade and false when `dmgval` says the object hurts — C’s contract. The lie is `dmgval`’s shade line, named.

Hallucination check: “Match C `hitmm` `shade_miss`” while **dmgval shade is omitted** is an overclaim on **armed** melee, stated in the D-log. Dispatch is live. Do **not** stamp “Match C `shade_glare`.” Do **not** stamp “Match C mthrowu/`hmon` `shade_miss`.”

## Hallucinations / overclaim

Subject says successful melee vs a shade passes harmlessly through instead of `mdamagem`. **True for unarmed / null mwep. False for a club until `dmgval` zeros shades.** D-1341 **Not this iter** names the club. Stamping **Addressed:** D-1341 for the `hitmm` caller is fair. Do **not** stamp “Match C `weapon.c` shade.” Do **not** stamp “Match C thrown `shade_miss`.” Do **not** treat fortress PASS as a jackal-vs-shade harmlessly-through.

## Density

One C function plus its one queued `hitmm` caller. ~70 lines. Playbook §2b. Did not glue silver sear or `arti_reflects`. Acceptable size.

## Branch-by-branch confirm

1. Unarmed vs shade, vis: harmlessly-through, `M_ATTK_MISS`, no `mdamagem`, wake. Match `:660–661` / `:2027–2050`.
2. `compat` seduce: skip `shade_miss`. Match `:659–660`.
3. Not a shade: false, `mdamagem` runs. Match `:2027–2028`.
4. Club / non-glare mwep: JS `dmgval>0` → not a miss (named). C would miss unless `shade_glare`.
5. Mirror / garlic / silver otyp: `shade_aware` noun `"attack"` if miss ever happens. Match `:2035`.
6. Unseen: `map_invisible`. Match `:2045–2046`.
7. `!verbose`: silent miss+wake. Match.
8. Thrown / hmon / mthrowu callers. Still omitted. Named.
9. **Public-unhit** unless a session has mon-vs-shade melee.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `HEAVY_IRON_BALL` is the otyp token for `shade_aware`, not the D-0480 `owt!=0` ban. Plain ESM.

## Verification

Journal: private canary **13**/13; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on mon-vs-shade. Cadence this audit: full `sessions` at HEAD `e3a30202` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.29/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not evidence a jackal passed through a shade.

## Actionable C-wrongs

None for Must-fix. `shade_miss` control flow and the `hitmm` return match C `:2016–2051` / `:659–661`. `dmgval` shade is a named omit of a live callee, not a stub `shade_miss`.

Named omits (map, not Must-fix):

1. `weapon.c` `dmgval` shade / `shade_glare` (club still hurts)
2. mthrowu / zap `bhit` / hmon / `mhitm_ad_phys` `shade_miss` callers
3. hitmm silver sear / artifact wep
4. mdamagem AD_STON leftover; uhitm/mhitm wrap arms

Do not Must-fix “always `mdamagem` vs shade” (that was the bug). Do not Must-fix “unarmed should hurt shades” (C does not).

## Callers / RNG ledger

C: `hitmm` → `shade_miss` (no RNG) → maybe `dmgval` `rnd`. JS: same, plus extra `dmgval` `rnd` on clubs that C would have zeroed first. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: unarmed `hitmm` vs a shade now misses and wakes; `dmgval` shade/`shade_glare` stays named so a club still hurts.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1341 `e3a30202`.
