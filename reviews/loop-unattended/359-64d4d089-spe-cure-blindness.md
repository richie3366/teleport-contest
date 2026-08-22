# Review 359 — 64d4d089 — spell.c SPE_CURE_BLINDNESS healup cream+blind+deaf (D-1399)

## Metadata
- Full / short hash: `64d4d08999bb24a61cc0645e8eb0097232c21aee` / `64d4d089`
- Parent: `a938a5b9` (D-1398). This file audits **this SHA only** (fourth of nine `js/` commits since review **355**). Archive **Addressed:** D-1399 `64d4d089` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 22:56:33 +0200
- D-id: **D-1399**
- Stats: 10 files, +101 / −34 — `js/spell.js` +13 / −2 (SPE_CURE_BLINDNESS arm); `js/potion.js` +11 / −6 (`healup` cureblind → `make_deaf`).
- Claims to close: Open `spell.c` `spelleffects` SPE_CURE_BLINDNESS (named from D-1398). Not sickness. `reviews/loop-2026-08-15/` has no unpaid cure-blindness Must-fix.
- JS / map: `spell.js` `spelleffects`; callee `potion.js` `healup` → `do.js` `make_blinded` + `potion.js` `make_deaf`. `c-js-map/turns.md`. CHAIN / seffects / peffects / zap.js local `healup` still named.
- Prior reviews this SHA claims to close: **358** named CURE_BLINDNESS after sickness.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_CURE_BLINDNESS so the spell actually clears cream/blindness/deafness via healup, instead of printing Nothing happens.”

C `spell.c` `:1549–1551`: `healup(0, 0, FALSE, TRUE);` then the shared `use_skill` / `return ECMD_TIME`. Not wand-duplicate `weffects` even though `oc_dir` is IMMEDIATE.

Callee `potion.c` `healup` `:1444–1450`:

```
        u.ucreamed = 0;
        make_blinded(0L, TRUE);
        make_deaf(0L, TRUE);
```

`make_blinded` `:261–331`: probe `!Blind`, timeout 0, see-again / Hallu / Eyes / Blindfolded talk, `toggle_blindness`. `make_deaf` `:443–457`: Unaware silences talk; XOR timeout; `You(old && !Deaf ? "can hear again." : "are unable to hear anything.")` with `Deaf` after `set_itimeout`. `youprop.h` `Deaf` is `HDeaf || EDeaf || u.uroleplay.deaf`.

Old JS: other-otyp `Nothing happens.`; cureblind already called `make_blinded` but **only** `u.HDeaf &= ~TIMEOUT` (no hear-again talk).

The diff **does** add the SPE_CURE_BLINDNESS arm (`healup(0,0,false,true)`) and replace the sticky deaf clear with live `make_deaf(0, true)`. It does **not** port CHAIN, potion peffects, or zap.js’s local `healup` (still `ucreamed=0; Blinded=0`). Named. `make_blinded` Hallu/Eyes/Blindfolded arms stay the thinner do.js body (D-0721).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_CURE_BLINDNESS arm | C `:1549–1551`, **wired** | healup only |
| `healup` cureblind | C `:1444–1450`, **wired** | cream then blinded then deaf |
| `make_blinded` | C `:261–331`, **imported live** | do.js; Hallu/Eyes named |
| `make_deaf` | C `:443–457`, **imported live** | not a TIMEOUT-only stub |
| `ucreamed=0` | C `:1448`, **wired** | before blinded |
| zap.js `healup` | C same function, **clone** | sticky Blinded; extra-healing/blessed HEALING |
| CHAIN / seffects / peffects | C, **named omit** | |
| `make_blinded` Hallu / Eyes / Blindfolded | C `:279–296`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. Hallu see-again string is not rolled.

## C ↔ JS fidelity

`healup(0,0,false,true)`: skip HP; skip curesick (CURE_SICKNESS unchanged); cream 0; `make_blinded(0,true)`; `make_deaf(0,true)`. Match `:1444–1455` split. Spell TIME. Match `:1549–1551` + `:1597–1602`.

`make_blinded`: live probe via `Blind()` / `BlindedTimeout`, see-again vs cloud, `vision_recalc(0)` + `learn_unseen_invent` on toggle. **Does not** emit Hallu “Far out! … cosmic again!”, Eyes `vismsg`, or Blindfolded itch (`:279–296`). Typical timeout-blind restore still “You can see again.” Match the keep-path, not the Eyes/Hallu arms.

`make_deaf(0,true)`: Unaware silences; XOR timeout; after clear, `old && !Deaf` → “You can hear again.” else “You are unable to hear anything.” JS `Deaf` also ORs leftover `u.Deaf`. Intrinsic/roleplay/EDeaf match C `:125`. Keep-path timeout-only deafness hears again. Match `:450–456`.

Healthy (not blind, not deaf, no cream): cream already 0; blinded/deaf XOR false → silent. Match. Does not touch Sick. Match `curesick=FALSE`.

Hallucination check: “Match C `healup` cream + `make_blinded` + `make_deaf`” while **those are live functions** is not a dispatch-stub lie. The old sticky `HDeaf` clear is gone on this callee. Do **not** stamp “Match C zap.js local healup.” Do **not** stamp “Match C `make_blinded` Hallu/Eyes.” Do **not** stamp “Match C SPE_CHAIN_LIGHTNING.”

## Hallucinations / overclaim

Subject says the spell clears cream/blindness/deafness via healup instead of `Nothing happens.` **True on the keep-path** (cream, see-again, hear-again, TIME). **True that it does not cure Sick.** **False until named for Hallu/Eyes blinded talk and zap extra-healing cureblind.** D-log “healthy silent; blind see-again; cream zeroed; deaf hear-again; blind+deaf both; does not cure Sick” are the right falsifiers. Stamping **Addressed:** D-1399 for `:1549–1551` + `:1444–1450` is fair. Do **not** treat fortress PASS as a cure-blindness cast.

## Density

One `spelleffects` case plus swapping the sticky deaf line for the live callee already in the file. ~24 lines of JS. Playbook §2b right size. Did not glue CHAIN. Did not rewrite zap.js.

## Branch-by-branch confirm

1. Healthy: silent; TIME. Match.
2. Blind timeout: cream 0; “You can see again.”; toggle vision. Match keep-path.
3. Creamed: `ucreamed=0` even if already seeing (Eyes). Match `:1448`.
4. Deaf timeout only: “You can hear again.” Match.
5. Blind+deaf: both talks. Match order blinded then deaf.
6. Sick: unchanged. Match.
7. CURE_SICKNESS / JUMPING / CLAIRVOYANCE / FORCE_BOLT / HEALING / PROTECTION unchanged at this SHA. Match.
8. CHAIN still other-otyp at this SHA. Named.
9. **Public-unhit** until a session casts cure blindness.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./do.js')` for `make_blinded` is pre-existing in-process ESM.

## Verification

Journal: private canary **19**/19 (C/JS grep; healthy silent; blind see-again; cream zeroed; deaf hear-again; blind+deaf both; does not cure Sick; CHAIN still omit; CURE_SICKNESS / JUMPING / CLAIRVOYANCE / FORCE_BOLT / HEALING / PROTECTION regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Fortress PASS is not cure blindness.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch calls live `healup` → `make_blinded` → `make_deaf`; cream/deaf talk match C’s keep-path.

Named omits (map / already-Open, not Must-fix):

1. SPE_CHAIN_LIGHTNING (next SHA)
2. seffects / potion peffects / `peffect_full_healing`
3. zap.js local `healup` cureblind still sticky `Blinded=0` (C extra/blessed HEALING uses the real function)
4. `make_blinded` Hallu / Eyes / Blindfolded / PermaBlind / Punished `set_bc` (`:279–329`)
5. leftover sticky `u.Deaf` in JS `Deaf` vs youprop.h
6. `obfree(pseudo)`

Do not Must-fix “print ‘not ill’” (wrong otyp). Do not Must-fix “skip hear-again” (C talks). Do not Must-fix “weffects IMMEDIATE” (C has its own case). Do not Must-fix “Hallu cosmic see-again” as this SHA’s dispatch (named `make_blinded` omit).

## Callers / RNG ledger

C this arm: no die. JS same. Other potion.js `healup(..., *, true)` callers now get `make_deaf` talk (C same). Public fortress never casts this envelope.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: SPE_CURE_BLINDNESS now runs live cream + `make_blinded` + `make_deaf`; Hallu/Eyes blinded talk and zap.js’s copy stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1399 `64d4d089` already stamped.
