# Review 339 — ad7b89c7 — zap.c zapnodir WAN_CREATE_MONSTER (D-1379)

## Metadata
- Full / short hash: `ad7b89c78d8af8e46f67950139844902175b393b` / `ad7b89c7`
- Parent: `181586fb` (reviews **335–338** + cadence **#1750**). This file audits **this SHA only** (first of eight `js/` commits since review **338**). Archive **Addressed:** D-1379 `ad7b89c7` already has the short hash (filled by D-1380).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 17:22:36 +0200
- D-id: **D-1379**
- Stats: 10 files, +140 / −27 — `js/zap.js` +22 / −5 (NODIR arm); `js/makemon.js` +57 / −3 (`create_critters`).
- Claims to close: Open `zap.c` `zapnodir` WAN_CREATE_MONSTER (named from D-1378 / review **338**). Not light. `reviews/loop-2026-08-15/` has no unpaid create-monster Must-fix.
- JS / map: `zap.js` `zapnodir`; `makemon.js` `create_critters`. `c-js-map/turns.md`. Wish / enlighten / stasis + scroll/spell create still named.
- Prior reviews this SHA claims to close: **338** named this Open after skilled scatter.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapnodir WAN_CREATE_MONSTER so zapping that wand actually create_critters (rn2(23)?1:rn1(7,2)) instead of doing nothing.”

C `zap.c` `zapnodir` `:2569–2574`:

```
    case WAN_CREATE_MONSTER:
        if (create_critters(rn2(23) ? 1 : rn1(7, 2),
                            (struct permonst *) 0, FALSE))
            known = !!obj->dknown;
        break;
```

Callee `makemon.c` `create_critters` `:1556–1590`: `ask = wizard && !neverask`; loop `cnt--`; wizard `create_particular` then `ask=FALSE` on ESC; `!mptr && u.uinwater && enexto(..., &mons[PM_GIANT_EEL])`; `makemon(mptr,x,y,NO_MM_FLAGS)`; known iff `(canseemon && (M_AP_NOTHING||M_AP_MONSTER)) || sensemon`.

Old JS: zapnodir default skip after LIGHT / DETECT.

The diff **does** add the arm and a live `create_critters`. It does **not** port scroll `seffect_create_monster` or SPE_CREATE_MONSTER. Named. `create_particular` class-letter / `*` random stays named on the wizard branch.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zapnodir` CREATE | C `:2569–2574`, **wired** | `rn2(23)?1:rn1(7,2)` |
| `create_critters` | C `:1556–1590`, **wired** | new export |
| `create_particular` | C `read.c`, **imported live (partial)** | wizard only; `*` named |
| `enexto` | C `teleport.c:196–202`, **imported live** | GP_CHECKSCARY then 0 |
| `makemon` | C, **imported live** | `NO_MM_FLAGS==0` |
| `mons(PM_GIANT_EEL)` | C `&mons[]`, **imported live** | eel hunt only |
| `canseemon` / `sensemon` / `M_AP_TYPE` | C, **imported live** | known predicate |
| scroll / SPE_CREATE_MONSTER | C, **named omit** | next-but-later Open |
| wish / enlighten / stasis | C `:2575–2590`, **named omit** | wishing is D-1380 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `rn2(23)` then maybe `rn1(7,2)`; then `makemon` internals. Dry hero skips `enexto`. Wizard `create_particular` is not the public keep-path.

## C ↔ JS fidelity

`weffects` NODIR already dispatched to `zapnodir`. WAN_CREATE_MONSTER is NODIR. Count expression matches `:2571` call-for-call (`rn2` first, then `rn1` only on 0). `null`/`false` are C NULL/FALSE. `known = !!dknown` only when create_critters returns true. `learnwand` / XP after the switch is pre-existing and still runs. Match.

`create_critters`: `wizard = flags.debug \|\| flags.wizard` is this port’s wizard global. `neverask=false` so public (`wizard` false) never asks. Loop `cnt--`. Eel `enexto` short-circuits on typed `mptr` or dry hero — C `:1578`. Failed `makemon` `continue`. Mimic-as-object does not set known; ordinary / monster-mimic + `canseemon`, or `sensemon`, does. Match `:1584–1587`.

Hallucination check: “Match C `zapnodir` WAN_CREATE_MONSTER” while **`create_critters` / `makemon` / `enexto` are live** is not a dispatch-stub lie. Do **not** stamp “Match C `read.c` seffect_create_monster.” Do **not** stamp “Match C `create_particular` `*`.”

## Hallucinations / overclaim

Subject says zapping the wand actually `create_critters(rn2(23)?1:rn1(7,2))` instead of doing nothing. **True on the keep-path** for a charged NODIR zap when `makemon` succeeds. **False until named for scroll/spell create.** Stamping **Addressed:** D-1379 for `:2569–2574` + callee is fair. Do **not** treat fortress PASS as a wand of create monster.

## Density

One NODIR case plus the C callee it always calls. ~70 lines of JS. Playbook §2b caller/callee cluster. Did not glue wishing (next SHA). Right size.

## Branch-by-branch confirm

1. `rn2(23)` nonzero: cnt=1. Match.
2. `rn2(23)==0`: cnt=`rn1(7,2)` (2..8). Match.
3. Dry hero: skip eel `enexto`; `makemon(NULL, ux, uy, 0)`. Match.
4. `uinwater`: eel `enexto` may move x,y. Match `:1578–1579`.
5. `makemon` fail: continue; no known. Match.
6. Seen ordinary / monster-mimic / `sensemon`: known; `!!dknown` learn. Match.
7. Mimic-as-object unseen: known stays false. Match.
8. Wizard ask: `create_particular` then maybe fall through. Named remainder. Public-unhit.
9. LIGHT arm unchanged. Match.
10. **Public-unhit** until a session zaps WAN_CREATE_MONSTER.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `23` / `rn1(7,2)` are C’s counts, not a recorded spawn. Dynamic `import('./read.js')` is cycle avoidance, not Node `fs`. Plain ESM.

## Verification

Journal: private canary **19**/19 (C/JS grep; jackal 1/3/0; eel short-circuit; rn2/rn1; dknown learn+XP; !dknown; LIGHT regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD `1f94d5e3` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a create-monster zap.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The NODIR arm and callee match `:2569–2574` / `:1556–1590` on the public keep-path.

Named omits (map / later Open, not Must-fix):

1. `read.c` `seffect_create_monster`
2. `spell.c` SPE_CREATE_MONSTER (already later Open)
3. `create_particular` class-letter / `*` random
4. WAN_WISHING / ENLIGHTENMENT / STASIS (wishing shipped next SHA)

Do not Must-fix “skip `rn1` when `rn2(23)`” (C still has the ternary). Do not Must-fix “typed `mptr` eel hunt” (C `!mptr` first).

## Callers / RNG ledger

C: `rn2(23)` then maybe `rn1(7,2)` then `makemon` dice. JS same. Public fortress never zaps this wand.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: NODIR create-monster now rolls C’s count and calls live `create_critters`/`makemon`; scroll/spell create stay named.
- Must-fix stays empty for this SHA.
