# Review 438 — c3f67016 — potion.c potionbreathe remaining otyps (D-1477)

## Metadata
- Full / short hash: `c3f67016b4980c901b55ebeee2cc32c68097b64f` / `c3f67016`
- Parent: `747e6616` (D-1476). This file audits **this SHA only** (second of nine `js/` commits since review **436**). Archive **Addressed:** D-1477 `c3f67016` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 14:47:45 +0200
- D-id: **D-1477**
- Stats: 11 files, +408 / −182 — `js/potion.js` +241; journal rotate accounts for most docs churn.
- Claims to close: Open `potion.c` `potionbreathe` remaining otyps (named from D-1472 / review **433**). Not potionhit. `reviews/loop-2026-08-15/` has no unpaid potionbreathe Must-fix.
- JS / map: `potion.js` `potionbreathe`. Callees `do.js` `make_blinded`, `potion.js` `make_confused`/`make_deaf`, `do_name.js` `trycall`, `sit.js` `split_mon`, `attrib.js` `Fast` / `exercise`. `c-js-map/turns.md` + `debt.md`. Mix unicorn/amethyst named.
- Prior reviews this SHA claims to close: **433** named remaining `potionbreathe` after potionhit; **417** named breathe after mixtype.

## Intent vs deliverable

Git subject promises: “Match C potion.c potionbreathe remaining otyps so a shattered potion's vapor heals, sickens, or restores attributes instead of skipping those arms.”

C `potionbreathe` `:1931–2118`. Save `in_use`, set `in_use=1`. Switch `Half_gas_damage ? TOWEL : otyp`. Towel harmless vapor. Restore/gain cursed Ulch/sting else `rn2(A_MAX)` walk `ABASE++` (first only unless blessed). FULL/EXTRA/HEAL FALLTHROUGH +1 mh and +1 uhp each arm, then `make_blinded(0,!ucreamed)`/`make_deaf(0,TRUE)` if `cureblind`. Sickness −5 floor 1 (healer skip; Upolyd mh). Hallu “momentary vision.” Conf `make_confused(itimeout_incr(HConfusion,rnd(5)))`. Invis flash (D-0741). Para/sleep `nomul(-rnd(5))`. Speed `incr_itimeout(&HFast,rnd(5))`. Blindness `make_blinded(itimeout_incr(BlindedTimeout,rnd(5)))`. Water gremlin `split_mon` + lycan D-1004. Acid/poly `exercise CON`. Restore `in_use`. `dknown`: `kn` `makeknown` else `trycall`. C-commented GAIN_LEVEL/ENERGY/LEV/FRUIT/DETECT/OIL. Callers: `potionhit` `:1909`, `dothrow` `:2517`, `zap.c` destroy `:5917`, `lock.c` `:1285`, fountain dip `:795`.

Old JS: invis/para/sleep/conf-stub/blind-stub/water lycan/acid; other otyps no-op; `trycall` skipped.

The diff **does** port towel, restore/gain, heal FALLTHROUGH, sickness, hallu, `make_confused`, speed, `make_blinded`/`make_deaf`, poly, `trycall`, `in_use`, gremlin `split_mon`. It **does not** uncomment C-commented otyps. Named. It **does not** port mix unicorn/amethyst. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `potionbreathe` remaining switch | C `:1946–2106`, **wired this SHA** | |
| `Half_gas_damage` | C `youprop.h:405–406`, **clone matching C** | damp/wet towel `ublindf.spe>0` |
| `potionbreathe_heal_tick` | C `:1978–1998` both mh and uhp, **local extract matching C** | not exclusive |
| `make_blinded` | C `timeout.c`/`do.c`, **imported live** (`do.js`) | |
| `make_deaf` / `make_confused` | C `potion.c`, **imported live** (same file) | |
| `trycall` | C `do.c` `:395–399`, **imported live** (`do_name.js`) | |
| `split_mon` | C `potion.c` `:2873–2910`, **imported live** (`sit.js`) | file split, not a stub |
| `incr_itimeout_HFast` | C `incr_itimeout(&HFast)`, **pre-existing matching TIMEOUT** | |
| `Fast` | C `youprop.h:376`, **imported live** (`attrib.js`) | H\|\|E + uprops |
| `monstseesu` | C `mondata.c`, **imported live** | sleep yawn arm |
| `body_part` / `vtense` / `makeplural` | C, **imported live** | |
| `eyecount_pot` | C `mondata.h:48–51`, **clone matching C** | cyclops / floating eye |
| `See_invisible` | C `youprop.h:152`, **clone + uprops** | sticky extra |
| `Confusion` | C `youprop.h:84` ≡ `HConfusion`, **clone + sticky** | |
| `Unaware_pot` | C `youprop.h:399`, **clone** | faint named |
| `Free_action` / `Sleep_resistance` | C youprop.h, **pre-existing clones** | no uprops slot |
| C-commented GAIN_LEVEL… | C `:2096–2105`, **named omit** | C comments them too |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** restore `rn2(A_MAX)`; conf/speed/blind/para/sleep `rnd(5)`; heal/sickness/hallu/towel/poly/acid have no new dice on those arms. Public fortress may already hit D-0741 vapor; the new heal/restore arms are still typically public-unhit.

## C ↔ JS fidelity

Towel: `Half_gas_damage` is `ublindf && otyp==TOWEL && spe>0`. JS. Switch uses TOWEL not the potion otyp, so a wet towel skips heal/sickness even when beneficial. Match `:1943–1949`.

Restore/gain cursed: `!breathless` Ulch; else `haseyes` `Your("%s %s!", eyes, vtense(sting))` with `eyecount!=1` → plural. JS `pline(\`Your ${eyes} ${vtense}!\`)`. Match. Uncursed: `i=rn2(A_MAX)` then wrap; `ABASE(i)<AMAX(i)` → `ABASE++`, `isdone=!blessed`. JS `acurr.a[i]`/`amax.a[i]`. `A_MAX` is `A_CHA+1`. Match. Blessed walks all six.

Heal FALLTHROUGH: FULL +1/+1 and `cureblind=TRUE`; EXTRA +1/+1 and `cureblind` if `!cursed`; HEALING +1/+1 and `cureblind` if blessed; then if cureblind `make_blinded(0,!ucreamed)` `make_deaf(0,TRUE)`; `exercise CON TRUE`. JS three cases without `break`. FULL blessed is +3. Both mh and uhp can tick. **Callees are not stubs.** Hallucination check: “Match C heal vapor” while **`make_blinded`/`make_deaf` are live** is not a dispatch-stub lie.

Sickness: `!Role_if(PM_HEALER)` then Upolyd mh else uhp, `<=5 → 1` else −5, `exercise CON FALSE`. JS `Role_if_healer` is `urole.mnum===PM_HEALER`. Match.

Hallu: `You("have a momentary vision.")` — no HP, no `make_hallucinated`. JS `pline`. Match.

Conf: `if (!Confusion) You_feel dizzy` then `make_confused(itimeout_incr(HConfusion,rnd(5)), FALSE)`. Old JS wrote sticky `u.Confusion += rnd(5)`. This SHA deletes that stub. Match `:2027–2031`.

Speed: `if (!Fast) Your knees…`; `incr_itimeout(&HFast,rnd(5))`; `exercise DEX TRUE`. `Fast` is attrib.js H\|\|E+uprops. Match `:2065–2069`.

Blindness: `if (!Blind && !Unaware) kn++` dark; always `make_blinded(itimeout_incr(BlindedTimeout,rnd(5)), FALSE)`; then same predicate `Your1(vision_clears)`. Old JS `u.Blinded += rnd(5)` stub is gone. `Unaware_pot` is `multi<0 && (usleep\|\|Unaware)`; C also `is_fainted()`. Named.

Water: gremlin `split_mon(&youmonst,NULL)` then lycan D-1004. `sit.js` `split_mon` is C `potion.c` `:2873` (cloneu / half mhmax). **Not a glyph stand-in.**

Acid+poly: `exercise CON FALSE`. Match. `in_use` restore then `dknown` `kn?makeknown:trycall`. `trycall` is C `do.c` `:395–399` (`!oc_name_known && !oc_uname` → `docall`). Live.

`See_invisible` includes sticky `u.See_invisible` plus uprops — conferral ring still takes the transparent string (D-1423 shape). `Free_action`/`Sleep_resistance` still omit the uprops slot; those arms pre-existed (D-0741). Not a new Must-fix family for this SHA.

## Hallucinations / overclaim

Subject says shattered vapor heals, sickens, or restores instead of skipping those arms. **True** for towel, restore/gain ABASE, heal FALLTHROUGH + cureblind/deaf, sickness −5, hallu vision, conf `make_confused`, speed HFast, blindness TIMEOUT, poly exercise, `trycall`, `in_use`, gremlin split. **False until named** for C-commented GAIN_LEVEL…, Unaware faint, dipsink caller polish. Stamping **Addressed:** D-1477 for the **remaining live switch** is fair. Do **not** stamp “Match C peffect_gain_level on vapor.” Do **not** treat fortress PASS as a thrown healing potion at the hero’s feet.

## Density

One C function’s remaining switch, plus tiny predicates C uses (`Half_gas_damage`, `eyecount`, `Unaware`). ~180 lines. Playbook §2b. Did not glue mixtype unicorn. Acceptable.

## Branch-by-branch confirm

1. Wet towel + POT_HEALING: harmless vapor, no +HP. Match `:1946–1949`.
2. Restore cursed: Ulch or sting, no ABASE. Match `:1952–1962`.
3. Restore uncursed: one `ABASE++` from `rn2(A_MAX)`. Blessed: all below-max. Match `:1964–1974`.
4. FULL blessed: +3 mh/uhp ticks, cureblind+deaf, exercise CON. Match FALLTHROUGH.
5. HEALING uncursed: +1, no cureblind (`!blessed`). Match `:1994–2004`.
6. Sickness non-healer: −5 floor 1; healer skip. Upolyd uses mh. Match `:2007–2022`.
7. Hallu: vision string only. Match `:2024–2026`.
8. Conf: dizzy iff `!HConfusion`; `make_confused rnd(5)`. Match.
9. Speed: knees iff `!Fast`; HFast TIMEOUT += rnd(5). Match.
10. Blindness: `make_blinded` not sticky Blinded. Match `:2071–2078`.
11. Poly/acid: exercise CON false. Match `:2092–2095`.
12. `dknown && !kn`: `trycall`. Paralysis always `kn`. Match `:2111–2116`.
13. GAIN_LEVEL vapor: no-op (C comment). Named.
14. **Public-unhit** of the new heal/restore arms.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. Dynamic `import('./do.js')` / `sit.js` is in-process, not filesystem. No hardcoded HP constants beyond C’s 5.

## Verification

Journal: private canary **21**/21 (C/JS grep; Rule #2; heal +1/+2/+3 FALLTHROUGH; towel skip; sickness −5; healer skip; Upolyd mh; restore one ABASE / blessed all six; hallu no HP; speed HFast; conf `make_confused`; poly exercise; in_use 0/1; blindness TIMEOUT; paralysis makeknown; C-commented named); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** of the new arms unless a session already shattered those otyps on the hero. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Heal/sickness/restore/towel/trycall/`make_confused`/`make_blinded` match. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. C-commented GAIN_LEVEL/ENERGY/LEV/FRUIT/DETECT/OIL (C comments them too)
2. `Unaware` faint (`is_fainted`) vs `usleep`/`Unaware` sticky
3. `potion_dip` unicorn/amethyst mix — Open already
4. `Free_action`/`Sleep_resistance` uprops slots (pre-existing D-0741 clones; do not rewrite `confer_oc_oprop`)

Do not Must-fix “heal vapor is a stub.” Do not Must-fix “C-commented GAIN_LEVEL should have shipped.” Do not Must-fix “`Confusion()` sticky extra” (the conf arm now writes `HConfusion` via `make_confused`).

## Callers / RNG ledger

C callers: `potionhit`, `dothrow` distance 0, `zap.c` `maybe_destroy_item`, `lock.c`, fountain dip. Restore `rn2(A_MAX)`; several `rnd(5)`. Public fortress already exercised the old invis/acid vapor path.

Verdict: **ACCEPT-WITH-DEBT**
