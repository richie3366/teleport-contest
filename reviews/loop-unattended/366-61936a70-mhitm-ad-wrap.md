# Review 366 — 61936a70 — uhitm.c mhitm_ad_wrap mhitm brush (D-1406)

## Metadata
- Full / short hash: `61936a70880ed77fe0b1585bd4cb4a8c595ad457` / `61936a70`
- Parent: `7c3921f2` (D-1405). This file audits **this SHA only** (second of nine `js/` commits since review **364**). Archive **Addressed:** D-1406 `61936a70` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 02:43:30 +0200
- D-id: **D-1406**
- Stats: 12 files, +162 / −31 — `js/mhitm.js` +67 / −1 (`some_mon_nam_mm` / `Some_Monnam_mm` / `mhitm_ad_wrap` + `mdamagem` AD_WRAP). `js/uhitm.js` / `js/mhitu.js` comment-only.
- Claims to close: Open `mhitm.c` `mhitm_ad_wrap` brush (named from D-1348 / review **310**). Not uhitm wrap. `reviews/loop-2026-08-15/` has no unpaid wrap Must-fix.
- JS / map: `mhitm.js` `mdamagem` / local `mhitm_ad_wrap`. uhitm export `mhitm_ad_wrap` (D-1348) and mhitu `mhitm_ad_wrap_u` (D-1331) stay you-as-agr / you-as-def. `c-js-map/turns.md` + `debt.md`. AUGMENT_IT still named.
- Prior reviews this SHA claims to close: **293** named mhitm after mhitu; **310** named the brush after uhitm you-as-agr.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_wrap mhitm brush so a cancelled eel/python wrap vs another monster zeros leftover and vis-brushes, instead of leftover dice only.”

C `uhitm.c` `mhitm_ad_wrap` mhitm arm `:3418–3426` via `mhitm.c` `mdamagem` `:1059` `mhitm_adtyping` `AD_WRAP`:

```
        if (magr->mcan)
            mhm->damage = 0;

        if (!mhm->damage && (canseemon(magr) || canseemon(mdef))) {
            pline("%s brushes against %s.",
                  Some_Monnam(magr), some_mon_nam(mdef));
        }
```

No grab / drown / coil. Those are uhitm `:3344–3375` (D-1348) and mhitu `:3376–3417` (D-1331). Non-cancelled leftover `d()` is **kept**. Cancelled **or** already-zero leftover prints the vis brush. `AD_WRAP` is `monattk.h:70` **28**. Callees `do_name.c` `some_mon_nam` `:1065–1070` / `Some_Monnam` `:1092–1097` = `x_monnam(ARTICLE_THE, AUGMENT_IT)` then `highc`.

Old JS: AD_WRAP fell through generic `mdamagem` HP. uhitm export `mhitm_ad_wrap` still `if (magr !== youmonst) return`.

The diff **does** add a **local** (not exported) `mhitm_ad_wrap` in `mhitm.js`, wire leftover `AD_WRAP`, export the token, and copy mhitu’s visible/`is_animal` stand-in. It does **not** retouch uhitm/mhitu bodies. Comment-only. It does **not** port `AUGMENT_IT` (`humanoid && !is_animal && !mindless`; hallu `!rn2(2)`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_wrap` mhitm | C `:3418–3426`, **wired local** | mcan zeros; vis brush; leftover kept |
| `mdamagem` AD_WRAP | C `:1059` leftover, **wired** | same CONF/FIRE envelope |
| `AD_WRAP` | C 28, **wired export** | |
| `some_mon_nam_mm` | C `:1065–1070`, **clone** | canspotmon → `mon_nam`; else animal something / someone |
| `Some_Monnam_mm` | C `:1092–1097`, **clone** | highc of the stand-in; same as mhitu D-1331 |
| `is_animal` | C `mondata.h`, **imported live** | M1_ANIMAL |
| `canseemon` / `canspotmon` / `pline` | C, **imported live** | |
| `mon_nam` / `Monnam` | C `do_name.c`, **imported live** | visible path |
| uhitm `mhitm_ad_wrap` | C `:3344–3375`, **already live other file** | D-1348; early-return unless youmonst |
| mhitu `mhitm_ad_wrap_u` | C `:3376–3417`, **already live** | D-1331 |
| `AUGMENT_IT` in `x_monnam` | C `:876–883`, **named omit** | humanoid∧¬animal∧¬mindless; hallu coin |
| remaining `mhitm_ad_*` | **named omit** | COLD still Open-adjacent |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in this arm. Leftover `d()` already burned in `mdamagem` before the switch (C same). Hallu `rn2(2)` inside AUGMENT_IT is not this SHA.

## C ↔ JS fidelity

`mcan`: leftover 0 then the `!damage` test is true, so vis brush. Match `:3420–3425`. Non-cancelled leftover >0: skip brush, envelope applies HP. Match. Already-zero leftover without `mcan` (e.g. `d()==0` wrap): still vis brush. Match C’s `if (!mhm->damage)` not `if (mcan)`.

Vis gate is `canseemon(agr) || canseemon(def)` — **not** `_mm_vis`. Unseen both: no pline. One visible: pline. Match.

uhitm.js export is a different function: `magr !== youmonst` still returns before grab. `mdamagem` calls the **local** mhitm.js symbol. No import collision. Comment-only mhitu/uhitm hunks do not rewrite D-1331/D-1348.

Name clones: visible `canspotmon` → `Monnam`/`mon_nam`. C visible `some_mon_nam` is `x_monnam(ARTICLE_THE)` (“the newt” / Fido) which is what `mon_nam` prints when spotted. Unseen animal (eel/python/kraken wrap): C `s_one` is false (`is_animal`), so “something”/“Something”. JS `is_animal` same. Unseen humanoid wrap is not a keep-path species; C would use someone only if `humanoid && !animal && !mindless`. JS uses `!is_animal` → someone, which **over-broadens** jellies/vortices vs C “something”. Named as AUGMENT_IT, same stand-in review **293** already accepted on mhitu grab. Hallu coin not ported: C can invert someone/something when `do_hallu`. Named.

`mdamagem` leftover wrap: knockback stub, `!damage` return (cancelled vis brush is a miss-with-zero, not `done`), else HP / `mdamagem_monkilled`. Match C `:1061–1092`. Completelyburns-style `done` is unused here (C never sets it on this arm).

Hallucination check: “Match C `mhitm_ad_wrap` mhitm brush” while **the arm zeros leftover and prints the vis line** is not a dispatch-stub lie. `Some_Monnam_mm` is a clone, not a no-op of the wrap. Do **not** stamp “Match C uhitm grab/drown.” Do **not** stamp “Match C mhitu `set_ustuck`.” Do **not** stamp “Match C `x_monnam` AUGMENT_IT.” Do **not** stamp “Match C remaining `mhitm_ad_cold`.”

## Hallucinations / overclaim

Subject says a cancelled eel/python wrap vs another monster zeros leftover and vis-brushes instead of leftover dice. **True on the mhitm keep-path** when `canseemon` of either combatant. **True that non-cancelled leftover HP is kept.** **False until named for you-as-agr / you-as-def / AUGMENT_IT hallu.** D-log “cancelled vis brush + zero leftover; live leftover HP no brush; zero-dice vis brush; unseen no brush; invis agr Something stand-in; lethal leftover DEF_DIED; STUN/FIRE regression; uhitm export still you-as-agr” are the right falsifiers. Stamping **Addressed:** D-1406 for `:3418–3426` is fair. Do **not** treat fortress PASS as a vis cancelled eel vs a pet.

## Density

One nine-line C arm plus the leftover envelope this file already used for FIRE/STUN, plus the mhitu name stand-in this brush needs. ~70 lines of JS. Playbook §2b right size. Did not glue COLD. Did not rewrite D-1348/D-1331.

## Branch-by-branch confirm

1. `mcan` + vis: leftover 0; “Something/Someone brushes against ….” Match.
2. `mcan` + both unseen: leftover 0; no pline. Match.
3. `!mcan` leftover >0: no brush; HP. Match.
4. `!mcan` leftover 0 + vis: brush (C tests `!damage`, not `mcan`). Match.
5. Lethal leftover: `DEF_DIED` via envelope. Match generic leftover.
6. Invisible animal agr, visible def: Something stand-in. Match animal keep-path.
7. uhitm export still you-as-agr only. Match D-1348 split.
8. FIRE/STUN envelopes unchanged. Match D-1405/D-1396.
9. **Public-unhit** until a session shows vis cancelled/zero-dice mon-vs-mon AD_WRAP.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM. Local name clones are not `fastforward`.

## Verification

Journal: private canary **14**/14 (C/JS shape; cancelled vis brush + zero leftover; live leftover HP no brush; zero-dice vis brush; unseen no brush; invis agr Something stand-in; lethal leftover DEF_DIED; STUN/FIRE regression; uhitm export still you-as-agr; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` runs at HEAD this audit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The mhitm arm matches `:3418–3426` (mcan zeros, `!damage` vis brush, leftover kept). The name helper is the same named-omit stand-in as mhitu, not a leftover-HP cheat.

Named omits (map, not Must-fix):

1. `do_name.c` `x_monnam` `AUGMENT_IT` (`humanoid && !animal && !mindless`; hallu `!rn2(2)`)
2. remaining `mhitm_ad_*` (COLD leftover is the elemental sibling)

Do not Must-fix “mhitm should grab/drown” (C does not). Do not Must-fix “uhitm export should handle magr≠you” (split clone; `mdamagem` uses the local). Do not Must-fix “brush requires `_mm_vis`” (C uses `canseemon` or). Do not Must-fix “always Something” (C someone for non-animal unseen).

## Callers / RNG ledger

C this arm: no `rn2`. JS same. Envelope still burns knockback `rn2(3)`+`rn2(6)` then leftover HP. Public fortress never needs a wrap brush die. `gulpmm` AT_ENGL is a different caller (already live); this SHA is `mdamagem` leftover only.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mon-vs-mon AD_WRAP now zeros leftover on `mcan` and vis-brushes with the mhitu Someone/Something stand-in; non-cancelled dice stay; uhitm/mhitu/AUGMENT_IT stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1406 `61936a70` already has the short hash.
