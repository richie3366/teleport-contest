# Review 525 — e8cc4c96 — makemon.c set_mimic_sym Protection / made_fruit / Plan-B (D-1564)

## Metadata
- Full / short hash: `e8cc4c9606b7294af784652d45095f33a4fc013f` / `e8cc4c96`
- Parent: `1504ead1` (D-1563). This file audits **this SHA only** (seventh of nine `js/` commits since review **518**). Archive **Addressed:** D-1564 `e8cc4c96`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 05:45:42 +0200
- D-id: **D-1564**
- Stats: `js/makemon.js` +37 / −8. Band 150–350 (js/ insertions **37**).
- Claims to close: Open Protection / made_fruit / Plan-B after D-1557 / reviews **517–518**. Not DELPHI. Not `block_point`. `reviews/loop-2026-08-15/` has no unpaid mimic Must-fix.
- JS / map: `makemon.js` `set_mimic_sym`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **518** named Protection / fruit / Plan-B.

## Intent vs deliverable

Git subject promises: mimics stay undisguised when the hero has the amulet; slime-mold locks `flags.made_fruit`; statue/corpse/egg/tin pick a legal shape instead of always `rndmonnum`.

Pinned C `makemon.c` `set_mimic_sym` `:2392–2550`. Callers: makemon `:1305`; mklev `:661`; mon.c `:4632` / `:4685`; sp_lev `:2058`; zap `:453`. `youprop.h:359–360`. Plan-B `:2515–2537`. Slime-mold `:2529–2537`. Callee `can_be_hatched` `mon.c:5545–5565`.

```2401:2402:nethack-c/upstream/src/makemon.c
    if (!mtmp || Protection_from_shape_changers)
        return;
```

```2515:2537:nethack-c/upstream/src/makemon.c
    if (ap_type == M_AP_OBJECT
        && (appear == STATUE || appear == FIGURINE
            || appear == CORPSE || appear == EGG || appear == TIN)) {
        int mndx = rndmonnum(),
            nocorpse_ndx = (svm.mvitals[mndx].mvflags & G_NOCORPSE) != 0;
        if (appear == CORPSE && nocorpse_ndx)
            mndx = rn1(PM_WIZARD - PM_ARCHEOLOGIST + 1, PM_ARCHEOLOGIST);
        else if ((appear == EGG && !can_be_hatched(mndx))
                 || (appear == TIN && nocorpse_ndx))
            mndx = NON_PM;
        newmcorpsenm(mtmp);
        MCORPSENM(mtmp) = mndx;
    } else if (ap_type == M_AP_OBJECT && appear == SLIME_MOLD) {
        ...
        flags.made_fruit = TRUE;
```

Old JS: `if (!mtmp) return` only; slime-mold set `mcorpsenm` without the flag; Plan-B commented.

The diff **does** early-out on uprops H||E, set `made_fruit`, and port the three Plan-B arms with imported `can_be_hatched`. It **does not** cancel mimics in `newcham`, attach egg hatch timeouts, or call `place_monster`. Named. **Does not rewrite `confer_oc_oprop`** (amulet already writes uprops).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `set_mimic_sym` Protection | C `:2401–2402`, **LIVE this SHA** | uprops H\|\|E; not were/monmove clones |
| `Protection_from_shape_changers` | C `youprop.h:359`, **inlined** | were.js `:46` / monmove.js `:663` miss uprops — do **not** add clone #3 |
| Plan-B CORPSE `rn1` | C `:2521–2522`, **LIVE this SHA** | `PM_ARCHEOLOGIST`..`PM_WIZARD` |
| Plan-B EGG `can_be_hatched` | C `:2523–2525`, **LIVE** | import mon.js |
| Plan-B TIN `NON_PM` | C `:2524–2525`, **LIVE this SHA** | |
| `can_be_hatched` | C `:5545–5565`, **LIVE** | not a new body |
| `rndmonnum` | C, **LIVE** | first; statue/figurine keep mndx |
| `flags.made_fruit` | C `:2537`, **LIVE this SHA** | property, not a function |
| `newcham` Protection cancel | **OMIT named** | |
| `attach_egg_hatch_timeout` | **OMIT named** | |
| `place_monster` 2D | **OMIT named** | next Open; not this SHA |

`node scripts/csym.mjs set_mimic_sym` → `makemon.c:2392-2550`. `--callers`: six sites above. `can_be_hatched` → `mon.c:5545-5565`. `--callers can_be_hatched`: makemon `:2523`; mkobj `:917`; objnam `:5228`; zap `:1772`. `Protection_from_shape_changers` → `youprop.h:359-360`.

RNG in this SHA’s arms: Protection return **zero** `rn2`. Plan-B: `rndmonnum` then either `rn1(...)` (CORPSE+nocorpse) or `can_be_hatched` (may `rn2(77)` BREEDER_EGG). Slime-mold: **no** extra RNG. Order matches C.

`node scripts/sym.mjs` on new / re-pointed names:

```
set_mimic_sym    js/makemon.js:2613   sync
can_be_hatched   js/mon.js:531   sync
Protection_from_shape_changers NOT EXPORTED — but 2 LOCAL CLONE(S) in 2 file(s):
               js/monmove.js:663  js/were.js:46
             => Do NOT write clone #3.
made_fruit       NOT FOUND in js/** (no export, no local function/const).
```

`node scripts/imports.mjs --can` makemon→mon `can_be_hatched`: ALREADY. Cycle alone is not a blocker; `can_be_hatched` is a hoisted `export function`. No TDZ. Do **not** import were/monmove Protection.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/`. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Protection. `!mtmp \|\| (intrinsic | extrinsic)`. `confer_oc_oprop` already fills `uprops[PROT_FROM_SHAPE_CHANGERS]`. Flat `u.HProtection_*` clones in were/monmove would miss the amulet. **Match `youprop.h:355–360` and `:2401–2402`.** No third named clone.

Plan-B order. Always `rndmonnum` for the five otyps. `nocorpse_ndx` from `mvitals[mndx].mvflags & G_NOCORPSE`. CORPSE+nocorpse → `rn1(PM_WIZARD-PM_ARCHEOLOGIST+1, PM_ARCHEOLOGIST)`. **Match `:2521–2522`.** EGG && `!can_be_hatched` **or** TIN+nocorpse → `NON_PM`. **Match `:2523–2525`.** Statue/figurine keep `rndmonnum` even if nocorpse. **Match** (those otyps skip both `if`s).

C `!can_be_hatched`: `NON_PM` is `-1` (truthy), so `!(-1)` is false — unhatchable NON_PM does **not** take the arm; `!0` is true (`PM_GIANT_ANT` / `LOW_PM`). JS `!` on the number is the same. **Match C’s `!` on int, including the NON_PM gotcha.** Not a JS boolean rewrite.

Slime-mold. `mcorpsenm = current_fruit`; `flags.made_fruit = true`. **Match `:2531–2537`.** `fruitadd` already clears the flag (pre-existing).

Callee closure (Protection / Plan-B / fruit). LIVE: uprops read, `rndmonnum`, `rn1`, `can_be_hatched`, `G_NOCORPSE`, `NON_PM`. CLONE: none new. OMIT named: `newcham` cancel, hatch timeout, `place_monster`. STUB: **none**. Arms may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject amulet / fruit / Plan-B vs always-`rndmonnum`: **true**. D-log “do not rewrite `confer_oc_oprop`”: **true** (uprops read only). Do **not** stamp “Match C `newcham` Protection.” Do **not** stamp “Match C were.js Protection” (those clones miss uprops). Do **not** stamp “Match C `!can_be_hatched` as JS boolean on NON_PM object.” This is **not** “dispatch ported, callee stubbed.”

## Density

Three consecutive Open rows on one C function (Protection + fruit + Plan-B). +37 JS. Did not glue `place_monster`. §2b OK (cluster, not one-bullet peel).

## Branch-by-branch confirm

1. `!mtmp`: return. **Match.**
2. Amulet extrinsic / timeout intrinsic: return, no `rndmonnum`. **Match.**
3. Neither: appearance as before (gold/maze/DELPHI/door). **Match pre-existing.**
4. CORPSE + `G_NOCORPSE`: role-range `rn1`. **Match.**
5. CORPSE living: keep `rndmonnum`. **Match.**
6. TIN + nocorpse: `NON_PM` empty tin. **Match.**
7. EGG + hatchable: keep mndx (`!positive` false). **Match.**
8. EGG + `can_be_hatched` → `NON_PM` (`-1`): **keep mndx** (C `!(-1)`). **Match the gotcha.**
9. EGG + giant ant (`0`): `!0` → `NON_PM`. **Match.**
10. Statue/figurine: always store `rndmonnum`. **Match.**
11. Slime-mold: fruit id + `made_fruit`. **Match.**

## Callers / RNG ledger

C: makemon / mklev / mon / sp_lev / zap. Public-unhit for amulet-at-mklev (hero may not wear it yet). No seed gate. Protection path: **no RNG**. Plan-B: `rndmonnum` then `rn1` xor `can_be_hatched`/`rn2(77)`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Inlining uprops is the Keep’d read, not a cycle dodge.

## Verification

D-log canary **26**/26 (null; extrinsic/intrinsic no RNG; gold; maze; slime-mold fruit+flag; CORPSE nocorpse role range; TIN NON_PM; statue/figurine keep mndx; egg sets mcorpsenm; living corpse; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** for the amulet early-out at mklev. Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `newcham` Protection cancel; `attach_egg_hatch_timeout`; `place_monster` 2D (next Open). Do not add Protection clone #3. Do not import were/monmove Protection into makemon. Do not rewrite `confer_oc_oprop`.

Verdict: **ACCEPT-WITH-DEBT**
