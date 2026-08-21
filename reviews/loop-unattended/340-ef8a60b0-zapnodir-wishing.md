# Review 340 — ef8a60b0 — zap.c zapnodir WAN_WISHING (D-1380)

## Metadata
- Full / short hash: `ef8a60b05b97a6e615867965f641b42e8ca58f60` / `ef8a60b0`
- Parent: `ad7b89c7` (D-1379). This file audits **this SHA only** (second of eight `js/` commits since review **338**). Archive **Addressed:** D-1380 `ef8a60b0` already has the short hash (filled by D-1381).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 17:30:26 +0200
- D-id: **D-1380**
- Stats: 9 files, +91 / −24 — `js/zap.js` +28 / −4 (`Luck()` + WAN_WISHING arm).
- Claims to close: Open `zap.c` `zapnodir` WAN_WISHING (named from D-1379). Not create. `reviews/loop-2026-08-15/` has no unpaid wishing Must-fix.
- JS / map: `zap.js` `zapnodir`; callee `makewish` (already live). `c-js-map/turns.md`. Enlighten / stasis still named.
- Prior reviews this SHA claims to close: D-1379 follow-up named this Open.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapnodir WAN_WISHING so zapping that wand actually Luck+rn2(5) gates makewish instead of doing nothing.”

C `zap.c` `zapnodir` `:2575–2585`:

```
    case WAN_WISHING:
        if (Luck + rn2(5) < 0) {
            pline("Unfortunately, nothing happens.");
            known = FALSE;
        } else {
            known = !!obj->dknown;
            makewish();
        }
        break;
```

C `Luck` is `you.h:464` `u.uluck + u.moreluck`. Caller `weffects` NODIR. Callee `makewish` already live (D-0064 / D-0559).

Old JS: default skip after CREATE.

The diff **does** add the Luck+`rn2(5)` gate and call live `makewish()`. It does **not** port WAN_ENLIGHTENMENT / WAN_STASIS. Named. `makewish` help / history / livelog / MAXWISHTRY random remain named inside the callee.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| WAN_WISHING arm | C `:2575–2585`, **wired** | unfortunately vs makewish |
| `Luck()` | C `you.h:464`, **clone that matches** | `uluck+moreluck` |
| `makewish` | C `zap.c`, **imported live** | not a stub |
| `rn2(5)` | C, **wired** | always burned |
| enlighten / stasis | C `:2586–2590`, **named omit** | default skip |
| `makewish` help / MAXWISHTRY | C, **named omit** | inside callee |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `rn2(5)` always; then `makewish` (`getlin` / `readobjnam` / `rn1(100,50)` blesscnt). Unfortunate path burns only `rn2(5)`.

## C ↔ JS fidelity

Local `Luck()` is the C macro, not a sticky `u.Luck` bit. Luckstone is `moreluck`, not a third addend. `Luck + rn2(5) < 0`: with Luck 0, `rn2(5)` is 0..4, never negative — always makewish. With Luck −5, `−5+0..4` is always `<0` — always unfortunately. With Luck −2, both arms possible. That matches C. Unfortunate sets `known=false` (no learnwand). Success sets `known=!!dknown` **before** `makewish` so an unseen wand does not `makeknown`. Match `:2579–2583`.

`makewish` is a real function (`getlin` + `readobjnam_wish` + `hold_another_object`). Not a no-op. Help retries are named inside it; that does not make this dispatch a stub lie.

Hallucination check: “Match C `zapnodir` WAN_WISHING” while **`makewish` is live** is not a dispatch-stub lie. Do **not** stamp “Match C `do_enlightenment_effect`.” Do **not** stamp “Match C `makewish` help/MAXWISHTRY.”

## Hallucinations / overclaim

Subject says Luck+`rn2(5)` gates `makewish` instead of doing nothing. **True on the keep-path** for a charged NODIR zap. **False until named for enlighten/stasis.** Stamping **Addressed:** D-1380 for `:2575–2585` is fair. Do **not** treat fortress PASS as a wand of wishing.

## Density

One NODIR case plus a Luck macro the line uses and a callee that already existed. ~28 lines of JS. Playbook §2b right size. Did not glue enlightenment. Did not re-open D-1379.

## Branch-by-branch confirm

1. Luck 0: `rn2(5)` then makewish + maybe learn. Match.
2. Luck −5: unfortunately; known false; no makewish. Match.
3. Luck −2: both arms; `rn2(5)` always consumed. Match.
4. `!dknown` success: makewish, no `makeknown`. Match.
5. CREATE / LIGHT regression: still prior arms. Match.
6. Enlighten / stasis: still default. Named.
7. **Public-unhit** until a session zaps WAN_WISHING.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `5` is C’s `rn2(5)`, not a recorded Luck. Plain ESM.

## Verification

Journal: private canary **12**/12 (C/JS grep; NODIR; Luck 0 makewish+learn+XP; !dknown; Luck −5 unfortunately; moreluck −5; Luck −2 both arms; LIGHT/CREATE regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD `1f94d5e3` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a wish prompt.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The gate matches `:2575–2578` and `makewish` is the real function.

Named omits (map / already-Open, not Must-fix):

1. WAN_ENLIGHTENMENT `do_enlightenment_effect` (already Open)
2. WAN_STASIS `stasis_until`
3. `makewish` help / history / livelog / MAXWISHTRY random

Do not Must-fix “skip `rn2(5)` when Luck≥0” (C always rolls). Do not Must-fix “rewrite Luckstone into `Luck()`” (C is `uluck+moreluck`).

## Callers / RNG ledger

C: `rn2(5)` then maybe wish dice. JS same. Public fortress never zaps this wand.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: NODIR wishing now Luck+`rn2(5)`-gates live `makewish`; enlighten/stasis stay named.
- Must-fix stays empty for this SHA.
