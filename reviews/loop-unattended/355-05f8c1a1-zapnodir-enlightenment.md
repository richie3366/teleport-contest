# Review 355 — 05f8c1a1 — zap.c zapnodir WAN_ENLIGHTENMENT (D-1395)

## Metadata
- Full / short hash: `05f8c1a149b46949cf0fed944285ffcd1e3763c6` / `05f8c1a1`
- Parent: `91827af6` (D-1394). This file audits **this SHA only** (last of nine `js/` commits since review **346**). Archive **Addressed:** D-1395 lacked the short hash; this review commit fills `05f8c1a1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 21:53:30 +0200
- D-id: **D-1395**
- Stats: 9 files, +109 / −29 — `js/zap.js` +29 / −5 (`do_enlightenment_effect` + zapnodir arm).
- Claims to close: Open `zap.c` `zapnodir` WAN_ENLIGHTENMENT (named from D-1380). Not stasis. Review **340** named this after wishing. `reviews/loop-2026-08-15/` has no unpaid enlighten Must-fix.
- JS / map: `zap.js` `zapnodir` / `do_enlightenment_effect`; callee `invent.js` `enlightenment` (D-1116). `c-js-map/turns.md`. WAN_STASIS / potion peffect / artifact invoke still named.
- Prior reviews this SHA claims to close: **340** named `do_enlightenment_effect`.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapnodir WAN_ENLIGHTENMENT so zapping that wand actually runs do_enlightenment_effect, instead of remaining a silent no-op.”

C `zap.c` `zapnodir` `:2586–2590`: `known = !!obj->dknown;` then `do_enlightenment_effect()`. Helper `:2525–2532`: `You_feel("self-knowledgeable...");` `display_nhwindow(WIN_MESSAGE, FALSE);` `enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS);` `pline_The("feeling subsides.");` `exercise(A_WIS, TRUE)`. Always describes enlightenment (unseen wand still shows the effect; `learnwand` only if `known`/dknown). After the switch `:2595–2601`: if known, maybe `more_experienced(0,10)` then `learnwand`. `MAGICENLIGHTENMENT=2`, `ENL_GAMEINPROGRESS=0` (`hack.h:1354–1355`). NODIR wand (`objects.h` WAN_ENLIGHTENMENT). Caller `weffects` NODIR already live.

Fountain case 19 (D-1116) is a **different** order: exercise **before** `pline_The`. This helper exercises **after**. Do not “fix” one to the other.

Old JS: zapnodir default skip after D-1380 wishing; `enlightenment` already lived for fountain/^X.

The diff **does** export `do_enlightenment_effect` (You_feel / `flush_topl_more` / live `enlightenment(MAGIC, INPROGRESS)` / `The feeling subsides.` / `exercise(A_WIS)`) and the WAN_ENLIGHTENMENT arm with `known=!!dknown`. It does **not** port WAN_STASIS, potion `peffect_enlightenment`, or artifact invoke. Named. Shared `if (known) learnwand` already existed.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| WAN_ENLIGHTENMENT arm | C `:2586–2590`, **wired** | known then helper |
| `do_enlightenment_effect` | C `:2525–2532`, **wired** | |
| `enlightenment` | C `insight.c`, **imported live** | invent.js D-1116 |
| `flush_topl_more` | C `display_nhwindow(WIN_MESSAGE, FALSE)`, **imported live** | same as fountain |
| `MAGICENLIGHTENMENT` / `ENL_GAMEINPROGRESS` | C 2 / 0, **wired** | const.js |
| `learnwand` / `more_experienced` | C `:2595–2601`, **already live** | gated on dknown |
| WAN_STASIS | C `:2559–2568`, **named omit** | already Open |
| potion peffect | C `potion.c`, **named omit** | |
| artifact invoke | C `artifact.c`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in this arm. `enlightenment` / `doattributes` MAGIC overlay may burn display rng (hallu lines), not a new zap die. Wishing still `Luck+rn2(5)`. STASIS `rn1(21,10)` is not this SHA.

## C ↔ JS fidelity

Energy/charge already spent in `zappable`/`weffects` before `zapnodir` (C same). `known=!!dknown` then helper **unconditionally**. `!dknown`: effect still runs; `known` false so no `learnwand`/XP. `dknown` already-known type: learnwand, no extra XP (`oc_name_known`). Match `:2586–2601`.

Helper order: You_feel → flush (WIN_MESSAGE FALSE) → `enlightenment(2, 0)` → “The feeling subsides.” → `exercise(A_WIS, true)`. Match `:2527–2531`, **not** fountain `:287–293`. `pline_The` ≡ JS `pline('The feeling subsides.')`.

`enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS)` with `final==0` takes invent.js `:1998–2003` `doattributes(mode)` — MAGIC-only, **not** BASIC `^X`. D-1116 already named that. Callee is live, not a stub dump of “You are enlightened.”

LIGHT / CREATE / WISH arms unchanged. Default is now STASIS-only named omit.

Hallucination check: “Match C `do_enlightenment_effect`” while **`enlightenment` is the real invent.js function** is not a dispatch-stub lie. Do **not** stamp “Match C WAN_STASIS.” Do **not** stamp “Match C potion peffect_enlightenment.” Do **not** stamp “Match C fountain exercise-before-subsides” (different C locus).

## Hallucinations / overclaim

Subject says zapping that wand runs `do_enlightenment_effect` instead of a silent no-op. **True on the keep-path** for a charged NODIR zap (`weffects` → `zapnodir`). **False until named for potion/artifact/STASIS.** D-log “dknown MAGIC overlay + learnwand+XP + rn2(19); !dknown effect no makeknown; already-known no XP” are the right falsifiers (`rn2(19)` is trailing `learnwand`, pre-existing). Stamping **Addressed:** D-1395 for `:2586–2590` + `:2525–2532` is fair. Do **not** treat fortress PASS as a wand of enlightenment.

## Density

One NODIR `case` plus the six-line C helper it calls, using an already-live `enlightenment`. ~34 lines of JS. Playbook §2b right size. Did not glue STASIS (Open). Did not rewrite `confer_oc_oprop` / fountain.

## Branch-by-branch confirm

1. dknown unseen type: You_feel, MAGIC overlay, subsides, WIS, learnwand+XP. Match.
2. !dknown: same effect; no learnwand. Match.
3. already `oc_name_known`: effect; learnwand; no XP. Match.
4. LIGHT / CREATE / WISH: unchanged. Match D-1366/D-1379/D-1380.
5. WAN_STASIS: still default skip. Named.
6. Fountain case 19: still exercise-before-subsides. Match D-1116, not this helper.
7. **Public-unhit** until a session zaps WAN_ENLIGHTENMENT.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `MAGICENLIGHTENMENT=2` is C. Plain ESM.

## Verification

Journal: private canary **11**/11 (C/JS grep; NODIR; dknown MAGIC overlay + learnwand+XP + rn2(19); !dknown effect no makeknown; already-known no XP; LIGHT/CREATE/WISH regression; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `05f8c1a1` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). Fortress PASS is not a wand of enlightenment.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch calls live `enlightenment`; helper order matches `:2525–2532`. Remaining NODIR/potion/artifact gaps are named omits.

Named omits (map / already-Open, not Must-fix):

1. WAN_STASIS `rn1(21,10)` (already Open)
2. potion.c `peffect_enlightenment`
3. artifact.c invoke enlightenment
4. wrest pline; `check_capacity`

Do not Must-fix “exercise before subsides like fountain” (C helper is after). Do not Must-fix “OR BASIC like `^X`” (C MAGIC only). Do not Must-fix “silent when !dknown” (C still describes). Do not Must-fix “skip learnwand when dknown” (C `:2595–2601`).

## Callers / RNG ledger

C this arm: no new zap die; trailing `learnwand` `rn2(19)` only when `known`. JS same. Public fortress never zaps this wand.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: NODIR enlightenment now runs live MAGIC `enlightenment` via C’s helper order; STASIS and potion/artifact callers stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1395 `05f8c1a1`.
