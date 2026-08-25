# Review 426 — a52401a6 — zap.c zap_updown WAN_LOCKING/SPE_WIZARD_LOCK (D-1465)

## Metadata
- Full / short hash: `a52401a6d4f4ddb35ab039e5811d6bc8ab064d06` / `a52401a6`
- Parent: `89aab16d` (D-1464). This file audits **this SHA only** (eighth of nine `js/` commits since review **418**). Archive **Addressed:** D-1465 `a52401a6` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 11:28:34 +0200
- D-id: **D-1465**
- Stats: 12 files, +152 / −42 — `js/zap.js` +66 / −26; `js/dbridge.js` / `js/trap.js` comments.
- Claims to close: Open `zap.c` `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK (named from D-1464 / review **425**). Not STRIKING (already D-1456). `reviews/loop-2026-08-15/` has no unpaid locking-updown Must-fix.
- JS / map: `zap.js` `zap_updown` FALLTHROUGH body; callees `dbridge.js` `close_drawbridge`, `trap.js` `closeholdingtrap`. `c-js-map/turns.md` + `debt.md`. STONE named at this SHA.
- Prior reviews this SHA claims to close: **416** named LOCKING after STRIKING updown; **412** named `zap_updown` LOCKING after wizard-lock cast.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_updown WAN_LOCKING/SPE_WIZARD_LOCK so an up/down locking zap closes a drawbridge or turns a hole into a trapdoor instead of skipping zap_updown.”

C `zap_updown` `:3290–3354`: WAN_STRIKING/SPE_FORCE_BOLT set `striking=TRUE` then FALLTHROUGH into WAN_LOCKING/SPE_WIZARD_LOCK. Drawbridge: `DRAWBRIDGE_DOWN` only if `dz>0`, else open portcullis (`is_drawbridge_wall>=0 && !is_db_wall`) then `find_drawbridge` → `!striking` `close_drawbridge` else `destroy_drawbridge`; `disclose=TRUE`. Else striking-only up-rock (`dz<0 && rn2(3)` …). Else `dz>0 && ttmp`: `!striking && closeholdingtrap(&youmonst, &disclose)` (empty success body); else striking TRAPDOOR→HOLE + `dotrap`; else `!striking && HOLE` → TRAPDOOR (Blind/`!tseen` frost/dust, no disclose; else `tseen=1` + “A trapdoor appears beneath you.” disclose). Then shared `:3382–3408` down `bhitpile`+`zap_map`. Caller `weffects` `:3445–3446`. C `zap_steed` does **not** `bhitm` locking.

Old JS: STRIKING/FORCE lived in this body with `striking=true` always (D-1456); LOCKING hit `default` `return false` (skipped epilogue).

The diff **does** add WAN_LOCKING/SPE_WIZARD_LOCK to the FALLTHROUGH case, compute `striking` from otyp, call `close_drawbridge` when `!striking`, run `closeholdingtrap` then hole→trapdoor. It **does not** change STRIKING destroy/rock/trapdoor→hole except gating them on `striking`. It **does not** add STONE. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK | C `:3295–3354`, **wired this SHA** | |
| STRIKING FALLTHROUGH `striking` flag | C `:3290–3293`, **pre-existing, now shared** | |
| `close_drawbridge` | C `dbridge.c`, **imported live** | |
| `destroy_drawbridge` | C, **imported live** (D-1456) | striking only |
| `closeholdingtrap` | C `trap.c` `:6210–6247`, **imported live** | |
| `find_drawbridge` / `is_db_wall` | C, **imported live** | |
| SPE_STONE_TO_FLESH `zap_updown` | C `:3355+`, **named omit** | still default |
| `zap_map` engraving | C `:3652+`, **named omit** | |
| `bhit` doorlock LOCKING | C `:4056+`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. `closeholdingtrap` uses C `FORCETRAP` (not a bare `FORCE` token). **New gameplay RNG:** locking does **not** take the striking `rn2(3)` rock arm. `closeholdingtrap`/`dotrap` may consume trap RNG. Public fortress does not zap locking up/down.

## C ↔ JS fidelity

`weffects` IMMEDIATE `u.dz` → `zap_updown`. Unchanged. **Callees are not stubs.** Hallucination check: “Match C close_drawbridge / hole→trapdoor” while **`close_drawbridge` and `closeholdingtrap` are imported live** is **not** a dispatch-stub lie.

Drawbridge `:3297–3306`: JS `db_hit` matches the ternary. `find_drawbridge` mutates `{x,y}` like C `&xx,&yy`. `!striking` → `close_drawbridge`; else `destroy_drawbridge`; `disclose=true`. STRIKING still destroys. LOCKING closes. Match.

Rock `:3307–3320`: gated `striking && dz<0 && rn2(3)` + air/water/qstart. LOCKING skips (no `rn2(3)`). STRIKING unchanged. Match.

Down+trap `:3321–3352`:

1. `!striking && closeholdingtrap`: C sets `*noticed` via `&disclose`. JS `{happened,noticed}`; `noticed` → `disclose=true`; `happened` skips hole arm. Callee: no trap or not BEAR_TRAP/WEB → false; already `utrap` → false; else `dotrap(FORCETRAP)` and `happened = utrap!=0`. Live. Match `:3322–3323`.
2. `striking && TRAPDOOR`: shatter messages, `ttyp=HOLE`, `dotrap`. LOCKING never takes this. Match.
3. `!striking && HOLE`: `ttyp=TRAPDOOR`; `Blind || !tseen` frost/dust (no disclose, `tseen` stays); else `tseen=1` + appear + disclose. No `dotrap`. Match `:3339–3351`. Ice uses `is_ice`. Match.

Epilogue `:3382–3408`: down `bhitpile`+`zap_map` still runs after `break` (not `return false`). Old LOCKING default skipped that. This SHA restores it. Match.

`close_drawbridge` early-outs if typ is not `DRAWBRIDGE_DOWN`; `find_drawbridge` is supposed to yield that cell. Pre-existing callee. Portcullis path uses `is_drawbridge_wall && !is_db_wall` then find — same as C.

## Hallucinations / overclaim

Subject says up/down locking closes a drawbridge or turns a hole into a trapdoor instead of skipping `zap_updown`. **True** for those arms + disclose on drawbridge / seen hole. **False until named** for STONE flavor, `zap_map` engraving, lateral `doorlock` LOCKING, `zap_steed` locking (C has none). Stamping **Addressed:** D-1465 for the **FALLTHROUGH `!striking` arms** is fair. Do **not** stamp “Match C zap_updown SPE_STONE_TO_FLESH.” STRIKING siblings must still destroy, not close — canary claimed that.

## Density

One FALLTHROUGH otyp pair plus the two `!striking` C arms already sketched by D-1456. ~40 lines of real JS. Playbook §2b. Did not glue STONE. Acceptable.

## Branch-by-branch confirm

1. Down LOCKING + `DRAWBRIDGE_DOWN`: `close_drawbridge`, disclose, then `bhitpile`+`zap_map`. Match `:3298–3306` / `:3382–3389`.
2. STRIKING same cell: still `destroy_drawbridge`. Match `:3304–3305`.
3. Down LOCKING + seen HOLE: TRAPDOOR + appear + disclose. Match `:3339–3350`.
4. Down LOCKING + unseen/Blind HOLE: frost/dust, no disclose, `tseen` unchanged. Match `:3342–3344`.
5. Down LOCKING + BEAR_TRAP/WEB: `closeholdingtrap`; no hole transform if happened. Match `:3322–3323`.
6. Up LOCKING: no `rn2(3)` rock. Match (`striking` false).
7. SPE_WIZARD_LOCK SPBOOK skip makeknown; disclose still IDs wand. Match.
8. STONE still `default` `return false`. Named at this SHA.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `FORCETRAP` is the C trap flag, not a DIAG shim. No hardcoded bridge coordinates.

## Verification

Journal: private canary **15**/15 (C/JS grep; Rule #2; down DRAWBRIDGE_DOWN close+learnwand not destroy; tseen hole→TRAPDOOR+learn; unseen dust no learn; ice frost; SPE_WIZARD_LOCK SPBOOK skip makeknown; up no `rn2(3)` rock; STRIKING/OPENING/PROBING siblings; STONE still default); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session zaps locking up or down. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `!striking` close / holding / hole arms match `:3302–3351`. STRIKING destroy/rock/trapdoor arms stay gated. Callees live.

Named omits (map / Open, not Must-fix):

1. `zap_updown` SPE_STONE_TO_FLESH — Open already at this SHA (later D-1466)
2. `zap_map` engraving/cancel trap
3. `bhit` doorlock LOCKING; `bhito` boxlock
4. `close_drawbridge` `set_entity` / `revive_nasty` (callee header named)

Do not Must-fix “STONE should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “LOCKING should destroy the drawbridge” — C closes.

## Callers / RNG ledger

C callers: `weffects` IMMEDIATE `u.dz`. Dice: locking skips `rn2(3)`; `closeholdingtrap`/`dotrap` may roll. STRIKING still `rn2(3)` on up-rock. Public fortress does not hit the new arms.

`zap_steed` locking remains default (C has no locking in the `bhitm` list `:3116–3134`), so riding-down LOCKING still reaches `zap_updown`. Match C.

Verdict: **ACCEPT-WITH-DEBT**
