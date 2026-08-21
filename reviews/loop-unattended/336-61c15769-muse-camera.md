# Review 336 — 61c15769 — muse.c MUSE_CAMERA lightdamage (D-1376)

## Metadata
- Full / short hash: `61c15769a9e93f0fa292c345d83585595e331309` / `61c15769`
- Parent: `8a2a32bd` (D-1375). This file audits **this SHA only** (second of four `js/` commits since review **334**). Archive **Addressed:** D-1376 `61c15769` already has the short hash (filled by D-1377).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 16:21:13 +0200
- D-id: **D-1376**
- Stats: 11 files, +291 / −143 — `js/muse.js` +91 / −8 (find + use + local youprop clones); `js/zap.js` comment only.
- Claims to close: Open `muse.c` MUSE_CAMERA `lightdamage` (named from D-1366 / review **326**). Not zapnodir. `reviews/loop-2026-08-15/` has no unpaid monster-camera Must-fix.
- JS / map: `muse.js` `find_offensive` / `use_offensive`; callee `zap.js` `lightdamage` (D-1366) + `do.js` `make_blinded`. `c-js-map/turns.md`. SCR_EARTH / ray wands / SetVoice / `invoke_blinding_ray` still named (next SHA).
- Prior reviews this SHA claims to close: **326** named muse camera after wiring `lightdamage`. **334** named dig wipe — that shipped on the parent SHA; this SHA correctly popped the new first Open.

## Intent vs deliverable

Git subject promises: “Match C muse.c MUSE_CAMERA so a monster with a charged expensive camera actually flashes the hero via lightdamage, instead of never selecting or using the camera.”

C `muse.c` `find_offensive` `:1566–1574` (after named `MUSE_SCR_EARTH`):

```
        nomore(MUSE_CAMERA);
        if (obj->otyp == EXPENSIVE_CAMERA
            && ((!Blind && !resists_blnd(&gy.youmonst))
                || hates_light(gy.youmonst.data))
            && dist2(mtmp->mx, mtmp->my, mtmp->mux, mtmp->muy) <= 2
            && obj->spe > 0 && !rn2(6)) {
            gm.m.offensive = obj;
            gm.m.has_offense = MUSE_CAMERA;
        }
```

C `use_offensive` `:1938–1955`: Hallu `SetVoice` + `verbalize("Say cheese!")` else `!Blind` picture pline; `m_using`; `!Blind && !resists_blnd` then You-flash + `make_blinded(BlindedTimeout + rnd(1+50), FALSE)`; `lightdamage(otmp, TRUE, 5)`; `spe--`; **return 1**. Caller `mhitu.c` `:758–762`: `if (offended != 0) return (offended == 1);`.

Old JS: `find_offensive` stopped at potions; `use_offensive` had no camera arm. `lightdamage` was already live (D-1366) with no muse caller.

The diff **does** select after POT_ACID with `nomore(MUSE_CAMERA)` and the C predicate (short-circuit so `rn2(6)` only when sight/gremlin + dist2 + spe), and **does** use live `verbalize` / `make_blinded` / `lightdamage`. It does **not** port `SetVoice`, SCR_EARTH, or `resists_blnd` AD_BLND / Sunsword. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `MUSE_CAMERA` (=18) | C `#define`, **wired** | offense enum; defense FULL_HEALING also 18 is a **different** field |
| `find_offensive` camera | C `:1566–1574`, **wired** | after acid; earth scroll named skip |
| `use_offensive` camera | C `:1938–1955`, **wired** | return 1 matches C even if mhp>0 |
| `lightdamage` | C `zap.c:3024–3056`, **imported live** | D-1366 |
| `make_blinded` | C `do.c`, **imported live** | talk=FALSE |
| `verbalize` / `Hallucination` | C, **imported live** | display / do_name |
| `Blind()` | youprop.h **clone** | H\|\|E && !B + roleplay; same family as apply.js |
| `BlindedTimeout()` | youprop.h **clone** | `HBlinded & TIMEOUT` |
| `Unaware()` | youprop.h **clone** | `usleep \|\| u.Unaware`; see fidelity |
| `resists_blnd_you()` | `mondata.c:248–272` **clone** | Blind\|\|Unaware; AD_BLND/arti named |
| `hates_light_you()` | `mondata.h` **clone** | gremlin mndx / umonnum |
| `precheck` | C `:1837`, **pre-existing live** | non-potion; camera is TOOL |
| `lined_up` | C `:1440`, **pre-existing live** | required before any offense |
| `SetVoice` | C `:1940`, **named omit** | cheese still verbalized |
| SCR_EARTH / ray wands | C earlier nomores, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `!rn2(6)` on eligible camera objects (C short-circuit order); use path `rnd(51)` only when `!Blind && !resists_blnd`; `lightdamage` extra `rnd` only for gremlin (D-1366).

## C ↔ JS fidelity

Select: JS requires `lined_up` first (C `:1440`). Then after acid, `nomore(CAMERA)` then the four-part `&&`. `rn2(6)` does not run when Blind (non-gremlin), far, or `spe<=0`. Match `:1567–1571` call-for-call on that envelope. `mux ?? u.ux` is a JS falsy fallback; after `lined_up`, C `mux` is the believed hero cell (x=0 is not a valid keep-path). Acid can still be overwritten by a later camera in the same invent walk (C `nomore` is per-type, not a freeze). Match.

`resists_blnd(&youmonst)` keep-path is `Blind || Unaware` (`mondata.c:253`). JS `resists_blnd_you` is that pair. AD_BLND expl/gaze and `resists_blnd_by_arti` (Sunsword) are named — same omit review **326** already accepted on `zap.js`. `Unaware` C is `multi<0 && (unconscious() || is_fainted())` with `unconscious` also matching nomovemsg prefixes (`trap.c:6776–6785`) and `is_fainted` ≡ `uhs==FAINTED`. JS copies the **existing** `zap.js` clone (`usleep || u.Unaware`). `u.Unaware` is never assigned; `FAINTED` is still deferred in `eat.js`. That is a clone gap, not a new Must-fix family: it is the D-1366 helper, and faint is not a live JS hunger state. Do not queue “rewrite Unaware” as this SHA’s C-wrong.

Use: Hallu cheese without SetVoice (named). Else `!Blind` picture with `Monnam` + `an(xname)` — C `%s takes a picture of you with %s!`. Then `m_using`, flash `make_blinded(BlindedTimeout+rnd(51), false)` only when `!Blind && !resists_blnd`, always `lightdamage(otmp,true,5)`, `spe--`, return 1. Match `:1938–1954` minus SetVoice. `mhitu.js` already maps `offended===1` to mattacku died, which is C `:762`. Returning 1 while the monster lives is **C**, not a JS kill-hack.

Hallucination check: “Match C MUSE_CAMERA” while **`lightdamage` is live** is not a dispatch-stub lie. Do **not** stamp “Match C SCR_EARTH.” Do **not** stamp “Match C SetVoice.” Do **not** stamp “Match C `invoke_blinding_ray`” (next SHA).

## Hallucinations / overclaim

Subject says a charged expensive camera actually flashes via `lightdamage` instead of never selecting or using. **True** when the monster is lined up, adjacent (`dist2<=2`), `spe>0`, `!rn2(6)`, and the hero is sight-vulnerable or a gremlin. **False until named for SetVoice** (cheese still prints). **False for AD_BLND-intrinsic / Sunsword sparkle** (named resists_blnd remainder). Stamping **Addressed:** D-1376 is fair. Do **not** treat fortress PASS as a monster snapshot.

## Density

Find + use of one C offense code, plus already-live callees. ~91 lines. Playbook §2b caller/callee cluster — right size. Did not glue Sunsword invoke (next Open). Did not re-open D-1375.

## Branch-by-branch confirm

1. Not lined_up: no offense at all. Match `:1440`.
2. Camera, Blind, not gremlin: skip `rn2(6)`. Match.
3. Camera, far (`dist2>2`) or `spe<=0`: skip `rn2(6)`. Match.
4. Eligible: `!rn2(6)` then `has_offense=CAMERA`. Match.
5. Already CAMERA from an earlier object: nomore continue. Match.
6. Use Hallu: verbalize cheese; no SetVoice. Named. Then flash/lightdamage/spe--/return 1.
7. Use !Blind, not resists: picture + You-flash + `rnd(51)` timeout + lightdamage. Match.
8. Use Blind gremlin: no picture, no flash timeout, still `lightdamage` (gremlin `rnd`). Match hates_light.
9. Non-gremlin `lightdamage`: return amt, no extra `rnd`. Match D-1366.
10. `precheck` fail: return i before the switch. Match `:1837`.
11. SCR_EARTH / death-sleep-fire wands: still named. Open remains those families.
12. **Public-unhit** unless a hostile with a charged camera stands adjacent.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `rn2(6)` / `rnd(1+50)` / amt 5 / dist 2 are C constants. Numeric 18 colliding with defensive FULL_HEALING is C’s split `#define` namespaces (`has_offense` vs `has_defense`). Plain ESM.

## Verification

Journal: private canary **21**/21 (C/JS grep; 1/6 select + rn2(6); Blind skip; empty/far skip; acid overwrite and nomore; Blind gremlin hates_light; flash `rnd(51)` + spe-- return 1; Unaware picture; Hallu cheese; gremlin `lightdamage` rnd; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on monster camera. This audit cadence: full `sessions` at HEAD `12953730` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.84). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Select/use match C branch order and RNG; `lightdamage` / `make_blinded` are real functions. Unaware/AD_BLND remainder is the **same named clone** as D-1366 `zap.js`, not a new contradiction of this dispatch.

Named omits (map / already-Open, not Must-fix):

1. `SetVoice` before Hallu verbalize
2. `resists_blnd` AD_BLND expl/gaze + `resists_blnd_by_arti`
3. SCR_EARTH / ray wands / horns
4. `invoke_blinding_ray` — **next SHA**
5. `unconscious` nomovemsg / `is_fainted` (zap.js Unaware clone; FAINTED still deferred)

Do not Must-fix “return 2 if the monster lives” (C returns 1). Do not Must-fix “skip `lightdamage` when Blind” (C always calls). Do not Must-fix “`rn2(6)` before the sight test” (C short-circuits).

## Callers / RNG ledger

C: `rn2(6)` only on the full predicate; use `rnd(51)` only on the flash arm; `lightdamage` gremlin dice. JS same. Public fortress has no adjacent charged camera.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a lined-up adjacent camera now `!rn2(6)`-selects and flashes via live `lightdamage`; SetVoice / SCR_EARTH / AD_BLND remain named.
- Must-fix stays empty for this SHA.
