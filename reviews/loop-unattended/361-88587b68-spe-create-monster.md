# Review 361 — 88587b68 — spell.c SPE_CREATE_MONSTER seffects (D-1401)

## Metadata
- Full / short hash: `88587b682288c30f59a12afb019e26a3a36625dd` / `88587b68`
- Parent: `dce9ac86` (D-1400). This file audits **this SHA only** (sixth of nine `js/` commits since review **355**). Archive **Addressed:** D-1401 `88587b68` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 23:21:35 +0200
- D-id: **D-1401**
- Stats: 11 files, +149 / −38 — `js/spell.js` +18 / −2 (SPE_CREATE_MONSTER arm); `js/read.js` +46 / −7 (`seffect_create_monster` + seffects/doread); `js/makemon.js` comment only.
- Claims to close: Open `spell.c` `spelleffects` SPE_CREATE_MONSTER seffects (named from D-1400). Not chain. `reviews/loop-2026-08-15/` has no unpaid create-monster Must-fix.
- JS / map: `spell.js` `spelleffects`; `read.js` `seffects` / `seffect_create_monster`; callee `makemon.js` `create_critters` (D-1379). `c-js-map/turns.md`. MAGIC_MAPPING seffects / peffects still named.
- Prior reviews this SHA claims to close: **360** named CREATE_MONSTER after chain.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_CREATE_MONSTER so the spell actually calls seffects/seffect_create_monster (create_critters), instead of printing Nothing happens.”

C `spell.c` `:1528–1531`: `SPE_MAGIC_MAPPING` / `SPE_CREATE_MONSTER` `(void) seffects(pseudo);` **without** the skilled-bless FALLTHROUGH (`:1518–1526` is REMOVE_CURSE through CHARM_MONSTER only). Pseudo is already unblessed/uncursed (`:1479` area). Spell still TIME after energy.

Callee `read.c` `seffects` `:2229–2231` both SCR and SPE. `seffect_create_monster` `:1608–1624`:

```
    create_critters(1 + ((confused || scursed) ? 12 : 0)
                    + ((sblessed || rn2(73)) ? 0 : rnd(4)),
                    confused ? &mons[PM_ACID_BLOB] : NULL, FALSE)
    → gk.known
```

`Confusion` is `HConfusion` (`youprop.h:84`). `create_critters` `:1556–1590` already live (D-1379 wand). Short-circuit: blessed skips `rn2(73)`; uncursed always rolls.

Old JS: other-otyp `Nothing happens.`; seffects default unimplemented; doread gated SCR_CREATE_MONSTER out.

The diff **does** dispatch dynamic `seffects(pseudo)`, implement `seffect_create_monster`, add SCR/SPE cases, and open the doread SCR gate. It does **not** port SPE_MAGIC_MAPPING (SCR mapping already live). Named. It does **not** skilled-bless the pseudo. Match C.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_CREATE_MONSTER arm | C `:1528–1531`, **wired** | seffects, no skilled bless |
| `seffects` | C `read.c`, **imported live** | dynamic read.js |
| `seffect_create_monster` | C `:1608–1624`, **wired** | |
| `create_critters` | C `:1556–1590`, **imported live** | D-1379 |
| `mons(PM_ACID_BLOB)` | C `&mons[PM_ACID_BLOB]`, **imported live** | |
| `known` / `gk.known` | C, **wired** | module flag |
| doread SCR gate | C `doread` allows the scroll, **wired** | related |
| SPE_MAGIC_MAPPING | C `:1528–1530`, **named omit** | still other-otyp |
| peffects | C `:1534–1546`, **named omit** | |
| `create_particular` | C wizard, **named omit** | neverask false still asks if debug |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** always `rn2(73)` when !blessed; `rnd(4)` only if that is 0; then `create_critters`/`makemon` dice (D-1379). Blessed spell pseudo never rolls `rn2(73)` — but the spell pseudo is never blessed.

## C ↔ JS fidelity

Energy / WIS / `mksobj` still run first. `pseudo.blessed=false` `cursed=false`. JS does not set blessed from `role_skill`. Match `:1528–1531` vs `:1518–1526`.

`seffects(pseudo)`: WIS if `oc_magic` (C same extra exercise). Switch hits `SPE_CREATE_MONSTER`. `confused = !!HConfusion`. Count: 1 + 12 if conf/cursed + (blessed||rn2(73)?0:rnd(4)). mptr acid blob iff confused. `create_critters(..., false)`. Seen → `known=true`. Match `:1615–1620`.

Uncursed unconfused spell: `rn2(73)` then maybe `rnd(4)` extra. Confused: +12 acid blobs, still `rn2(73)`. Cursed scroll (not this spell’s pseudo): +12, not blobs. Blessed scroll: skip `rn2(73)`. Match short-circuit.

`create_critters` is the live D-1379 function (`makemon`, eel `enexto` when wet and mptr null, seen/`sensemon`). Wizard `create_particular` still named. Not a stub dump of “a monster appears.”

doread now lets SCR_CREATE_MONSTER through the unimplemented gate so reading the scroll uses the same helper. C always could. Related, not a second subsystem.

Hallucination check: “Match C `seffects` / `create_critters`” while **both are live** is not a dispatch-stub lie. Do **not** stamp “Match C SPE_MAGIC_MAPPING.” Do **not** stamp “Match C skilled bless CREATE_MONSTER.” Do **not** stamp “Match C peffects.”

## Hallucinations / overclaim

Subject says the spell calls seffects/`seffect_create_monster` (`create_critters`) instead of `Nothing happens.` **True on the keep-path** after energy. **True that skilled does not bless.** **False until named for MAGIC_MAPPING / peffects / wizard particular.** D-log “uncursed rn2(73); confused acid blobs +12; cursed +12 not blobs; blessed skip rn2(73); skilled still unblessed; MAGIC_MAPPING still omit” are the right falsifiers. Stamping **Addressed:** D-1401 for `:1528–1531` + `:1608–1624` is fair. Do **not** treat fortress PASS as a create-monster cast.

## Density

One `spelleffects` case plus the seffects arm and doread gate of the same C function. ~68 lines of JS. Playbook §2b right size. Did not glue MAGIC_MAPPING SPE. Did not glue mwep (next SHA).

## Branch-by-branch confirm

1. Uncursed unconfused: `rn2(73)` then 1 or 1+rnd(4) `create_critters(null)`. Match.
2. Confused: +12, acid blob ptr. Match.
3. Cursed scroll: +12, not blobs. Match (doread path).
4. Blessed: no `rn2(73)`. Spell pseudo never blessed. Match.
5. Skilled caster: still unblessed pseudo. Match.
6. MAGIC_MAPPING SPE still `Nothing happens.` Named.
7. CHAIN / CURE / JUMPING / FORCE_BOLT / HEALING unchanged at this SHA. Match.
8. **Public-unhit** until a session casts create monster (or reads that scroll).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./read.js')` is in-process ESM. `PM_ACID_BLOB` is the table index, not a recorded species.

## Verification

Journal: private canary **18**/18 (C/JS grep; uncursed rn2(73); confused acid blobs +12; cursed +12 not blobs; blessed skip rn2(73); skilled still unblessed; MAGIC_MAPPING still omit; CHAIN / CURE_BLINDNESS / JUMPING / FORCE_BOLT / HEALING regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Fortress PASS is not create monster.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch calls live `seffects` → live `create_critters`; count/blob/short-circuit match `:1615–1618`.

Named omits (map / already-Open, not Must-fix):

1. SPE_MAGIC_MAPPING `seffects` (already Open)
2. potion `peffects` (HASTE / …)
3. wizard `create_particular` class-letter / `*`
4. `obfree(pseudo)`

Do not Must-fix “skilled bless CREATE_MONSTER” (C does not; CHARM does). Do not Must-fix “skip rn2(73) on uncursed” (C always rolls). Do not Must-fix “cursed spell pseudo +12” (spell mksobj is uncursed). Do not Must-fix “MAGIC_MAPPING in this arm” (same C case, still named).

## Callers / RNG ledger

C uncursed: `rn2(73)` then maybe `rnd(4)` then makemon dice. JS same. Blessed scroll skips the 73. Public fortress never casts this envelope. Wand create (D-1379) unchanged.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: SPE_CREATE_MONSTER now calls live `seffects`/`create_critters` with C’s count/blob/short-circuit and no skilled bless; MAGIC_MAPPING SPE stays named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1401 `88587b68` already stamped.
