# Review 349 — 5e8d1fbd — spell.c SPE_CREATE_FAMILIAR make_familiar (D-1389)

## Metadata
- Full / short hash: `5e8d1fbd6a75ab23ca9ed4998068b59e7c913a06` / `5e8d1fbd`
- Parent: `c6af8407` (D-1388). This file audits **this SHA only** (third of nine `js/` commits since review **346**). Archive **Addressed:** D-1389 `5e8d1fbd` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 20:38:18 +0200
- D-id: **D-1389**
- Stats: 10 files, +101 / −30 — `js/spell.js` +13 / −3 (one `else if` + dynamic import); `js/dog.js` comment-only.
- Claims to close: Open `spell.c` `spelleffects` SPE_CREATE_FAMILIAR (named). Not force bolt. Review **348** named this as the next otyp. `reviews/loop-2026-08-15/` D-1029 is the figurine `make_familiar` port, not this dispatch.
- JS / map: `spell.js` `spelleffects`; callee `dog.js` `make_familiar` / `pick_familiar_pm`. `c-js-map/turns.md`. PROTECTION / CLAIRVOYANCE / JUMPING still named (later Open).
- Prior reviews this SHA claims to close: **338** named CREATE_FAMILIAR among other otyps; **348** follow-up Open.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_CREATE_FAMILIAR so the spell calls make_familiar at the hero, instead of printing Nothing happens.”

C `spell.c` `:1569–1571`: `case SPE_CREATE_FAMILIAR: (void) make_familiar((struct obj *) 0, u.ux, u.uy, FALSE); break;` Then shared `:1597–1602` `use_skill` if `!force`, `obfree(pseudo)`, `return ECMD_TIME`. Not in the wand-duplicate getdir group. `objects.h:1394–1396`: SPELL create familiar `P_CLERIC_SPELL`, **NODIR**.

C callee `dog.c` `pick_familiar_pm` `:104–135`: figurine uses `corpsenm`; spell (`otmp` null) `!rn2(3)` → `pet_type()` else `rndmonst_adj(0, 3 * P_SKILL(spell_skilltype(SPE_CREATE_FAMILIAR)))`. `make_familiar` `:138–215`: retry `makemon` up to 100; spell path skips figurine shatter / `rn2(10)` B/U/C; pool `minliquid`; `initedog`; AT_WEAP wield. Figurine path is D-1029.

Old JS: other-otyp arm printed `Nothing happens.`; `make_familiar` already lived for figurines (D-1029). `pick_familiar_pm` already had the spell `otmp==null` arm.

The diff **does** add `else if (otyp === SPE_CREATE_FAMILIAR)` → `await make_familiar(null, game.u.ux, game.u.uy, false)` via dynamic `import('./dog.js')` (static would cycle `spell → dog → weapon → spell`). It does **not** change `pick_familiar_pm` / `make_familiar` bodies (comments only). It does **not** port PROTECTION / CLAIRVOYANCE. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_CREATE_FAMILIAR arm | C `:1569–1571`, **wired** | null obj, hero xy, quietly false |
| `make_familiar` | C `:138–215`, **imported live** | D-1029; not a stub |
| `pick_familiar_pm` | C `:104–135`, **live callee** | spell `!rn2(3)` / `rndmonst_adj` |
| `pet_type` | C `dog.c`, **live** | preferred_pet / role |
| `rndmonst_adj` | C `makemon.c`, **imported live** | `makemon.js` |
| `spell_skilltype_familiar` | C `spell_skilltype`, **clone** | `oc_skill` only; breaks cycle |
| `use_skill` | C `:1597–1599`, **already wired** | after switch, `!force` |
| `initedog` / `makemon` | C, **live** | spell always `reallytame` |
| `obfree(pseudo)` | C `:1601`, **named omit** | all `spelleffects` arms |
| SPE_PROTECTION | C `:1581–1583`, **named omit** | later D-1390 |
| livelog first pet | C?, **named omit** | dog.js already |
| MM_EDOG newedog alloc | C `makemon`, **named omit** | `initedog` still makes edog |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. Dynamic `import()` is ESM, not `fs`. **New gameplay RNG:** this SHA adds none in `spell.js`. Callee already burns `rn2(3)` then either `pet_type` (`rn2(2)` kitten/dog when no pref) or `rndmonst_adj` (quest `rn2(7)` + weight loop). Spell path does **not** burn figurine `rn2(10)`. Energy/`mksobj` RNG already ran before the switch (C same).

## C ↔ JS fidelity

Energy is spent and WIS exercised **before** the otyp switch. Failed familiar (no `pm`, `makemon` miss, pool death) still spent the spell and still `use_skill` + TIME. C same (`(void)` ignores NULL). Match `:1597–1602` except `obfree` (pre-existing leak of the pseudo book; not introduced here).

Dispatch args: `null, u.ux, u.uy, false` ≡ `(struct obj *)0, u.ux, u.uy, FALSE`. NODIR: JS does not `getdir`. Match.

`pick_familiar_pm` with `otmp==null`: skip figurine extinct-dust; `!rn2(3)` preferred pet species; else clerical skill `3 * P_SKILL`. `spell_skilltype_familiar` reads `objects[SPE_CREATE_FAMILIAR].oc_skill` — same as C `spell_skilltype`. Clone, not a fake skill table. `rndmonst_adj(0, max)` is the real `makemon.js` function (quest `rn2(7)` then difficulty window). When `!pm && !quietly`: `There seems to be nothing available for a familiar.` Match `:131–132`.

`make_familiar` spell path: `cgend=0` so no MM_FEMALE/MALE; figurine shatter / `rn2(10)` / christen skipped; `reallytame` stays true → `initedog(mtmp, TRUE)`; clear sleep; `set_malign`; `newsym`; wield if AT_WEAP. Retry 100 if `makemon` fails. Pool `minliquid` can still kill the new pet. Match `:145–214` on the spell arm. Figurine B/U/C is D-1029, not this SHA.

Hallucination check: “Match C `make_familiar` at the hero” while **`dog.js` `make_familiar` is the real function** is not a dispatch-stub lie. The subject does **not** claim PROTECTION / CLAIRVOYANCE. Do **not** stamp “Match C `obfree`.” Do **not** stamp “Match C SPE_PROTECTION `cast_protection`.” Do **not** treat a local `pline('A familiar appears')` as this port — there is none; placement is `makemon`.

## Hallucinations / overclaim

Subject says the spell calls `make_familiar` at the hero instead of `Nothing happens.` **True on the keep-path** (`otyp === SPE_CREATE_FAMILIAR` after energy). **False until named for other remaining otyps** (still `Nothing happens.`; C PROTECTION would `cast_protection`). D-log “`rn2(3)=0` + preferred_pet `c` tame kitten not on hero tile” / “`rn2(3)≠0` rndmonst_adj not kitten-only” are the right falsifiers (hero cell is the *ask*; `makemon` may adjacent). Stamping **Addressed:** D-1389 for `:1569–1571` is fair. Do **not** treat fortress PASS as create-familiar (public-unhit).

## Density

One C `case` that is a single call into an already-ported callee. ~13 lines of JS. Playbook §2b “one deferred `if` alone” is the too-small column — this is that shape, but the alternative (re-porting `make_familiar`) would duplicate D-1029. Right size **given** the callee already existed; not a second subsystem. Did not glue PROTECTION (next Open). Did not re-open FORCE_BOLT.

## Branch-by-branch confirm

1. SPE_CREATE_FAMILIAR: dynamic import; `make_familiar(null, ux, uy, false)`. Match `:1570`.
2. `rn2(3)=0`: `pet_type()` (pref `c` → kitten). Match `:124–125`.
3. `rn2(3)≠0`: `rndmonst_adj(0, 3*skill)`, not kitten-only. Match `:127–130`.
4. `!pm`: quietly-false pline; no pet; still TIME. Match.
5. Figurine `rn2(10)`: not burned (otmp null). Match.
6. `initedog` tame; not hostile. Match spell path.
7. `use_skill` after, `!force`. Match `:1597–1599`.
8. FORCE_BOLT / FIREBALL arms unchanged. Match D-1388/D-1386.
9. PROTECTION: still `Nothing happens.` Named (later D-1390).
10. **Public-unhit** until a session casts create familiar.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./dog.js')` is in-process ESM. Plain ESM. `null` is C NULL, not a hardcoded PM.

## Verification

Journal: private canary **13**/13 (C/JS grep; NODIR clerical; `rn2(3)=0` + preferred_pet `c` tame kitten not on hero tile; `rn2(3)≠0` rndmonst_adj not kitten-only; PROTECTION/CLAIRVOYANCE still omit; FORCE_BOLT east still IMMEDIATE; HEALING atme; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` is at later HEAD; fortress PASS is not create-familiar.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch calls live `make_familiar`; `pick_familiar_pm` spell arm already matched `:124–133`. Remaining gaps are named omits.

Named omits (map / already-Open, not Must-fix):

1. SPE_PROTECTION `cast_protection` (already Open at this SHA; later D-1390)
2. SPE_CLAIRVOYANCE / JUMPING / CURE / CHAIN / seffects / peffects
3. `obfree(pseudo)` after `spelleffects`
4. livelog first pet; `makemon` MM_EDOG `newedog` alloc
5. heal/tele directional `weffects`

Do not Must-fix “print Nothing happens then also make_familiar” (the arm replaced the else). Do not Must-fix “figurine `rn2(10)` on the spell” (C skips when `otmp` is NULL). Do not Must-fix “place exactly on `u.ux,u.uy` when occupied” (`makemon` may fail and retry / adjacent; C same). Do not Must-fix the `spell_skilltype_familiar` clone (same `oc_skill` read; static import would cycle).

## Callers / RNG ledger

C spell: `rn2(3)` then pet_type or `rndmonst_adj`. JS same now that the dispatch exists. Figurine `rn2(10)` stays on the D-1029 path. Public fortress never casts this envelope.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: create familiar now calls live `make_familiar(NULL, ux, uy, FALSE)` instead of `Nothing happens.`; PROTECTION and `obfree` stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1389 `5e8d1fbd` already stamped.
