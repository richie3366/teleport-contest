# Review 416 — 91e3e8a8 — zap.c zap_updown WAN_STRIKING/SPE_FORCE_BOLT (D-1456)

## Metadata
- Full / short hash: `91e3e8a86ff23914b61fc2b07b1575e30be16884` / `91e3e8a8`
- Parent: `ad3eca95` (D-1455). This file audits **this SHA only** (seventh of nine `js/` commits since review **409**). Archive **Addressed:** D-1456 `91e3e8a8` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 07:19:39 +0200
- D-id: **D-1456**
- Stats: 12 files, +312 / −140 — `js/zap.js` +112 / −16; `js/dbridge.js` comment-only +2 / −1.
- Claims to close: Open `zap.c` `zap_updown` WAN_STRIKING/SPE_FORCE_BOLT (named from D-1454). Not LOCKING. `reviews/loop-2026-08-15/` has no unpaid striking-updown Must-fix.
- JS / map: `zap.js` `zap_updown`; callees `dbridge.js` `destroy_drawbridge` / `is_drawbridge_wall`; `trap.js` `dotrap`; `mkobj.js` `mksobj_at` / `is_crackable`. `c-js-map/turns.md` + `debt.md`. LOCKING/STONE still named.
- Prior reviews this SHA claims to close: **404** / **414** named remaining `zap_updown` after probing / OPENING.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_updown WAN_STRIKING/SPE_FORCE_BOLT so an up/down striking wand or force-bolt spell destroys a drawbridge, drops a ceiling rock, or shatters a trapdoor into a hole instead of skipping zap_updown.”

C `zap_updown` `:3290–3354` (`zap.c`): `striking = TRUE` then FALLTHROUGH into the WAN_LOCKING body. Drawbridge: `DRAWBRIDGE_DOWN` only when `u.dz > 0`, else open portcullis (`is_drawbridge_wall >= 0 && !is_db_wall`) then `find_drawbridge` → **`destroy_drawbridge`** (locking would `close_drawbridge`) and `disclose = TRUE`. Else up `rn2(3)` and not air/water/`Underwater`/`Is_qstart`: rock from `ceiling` onto `body_part(HEAD)`, `rnd(hard_helmet(uarmh) ? 2 : 6)`, `losehp(Maybe_Half_Phys)`, `mksobj_at(ROCK)` — **disclose stays false**. Else down+`ttmp` (snapshotted `:3233` before the switch): locking `closeholdingtrap` / hole→trapdoor named; striking `TRAPDOOR` → `HOLE`, `tseen=1`, `dotrap`. Then shared `:3382–3408`. Caller `weffects` `:3440–3446`.

Old JS: OPENING live (D-1454); STRIKING hit `default` `return false`.

The diff **does** add a STRIKING/FORCE_BOLT arm with `striking = true` only (no LOCKING cases), `destroy_drawbridge` on the C drawbridge predicate, the rock/`rn2(3)`/`rnd`/`losehp`/`mksobj_at` path, and TRAPDOOR→HOLE. It **does not** take `close_drawbridge` / `closeholdingtrap` / hole→trapdoor (`!striking`). It **does not** add WAN_LOCKING/SPE_WIZARD_LOCK cases. Named. It **does not** import poly `body_part` tables (clone `body_part_zap` → `"head"`). Named. `dbridge.js` is a comment that STRIKING now calls `is_db_wall`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_updown` WAN_STRIKING / SPE_FORCE_BOLT | C `:3290–3354`, **wired this SHA** | striking=true only |
| `destroy_drawbridge` | C `dbridge.c`, **imported live** | crush/chain scatter named on callee |
| `is_drawbridge_wall` / `is_db_wall` / `find_drawbridge` | C `dbridge.c`, **imported live** | D-1454 already used wall/db |
| `hard_helmet` / `is_helmet_zap` | C `do_wear.c:567–573` / `obj.h`, **clone matching C** | `oc_skill` ≡ `oc_armcat` (existing objects-table mapping) |
| `body_part_zap` | C `polyself.c`, **clone, poly named** | HEAD → `"head"` only |
| `Is_qstart_updown` | C `quest.h` `Is_qstart`, **clone matching C** | `on_level` vs `qstart_level` |
| `mksobj_at` / `is_crackable` / `is_metallic` | C, **imported live** | ROCK `init=false, artif=false` |
| `dotrap` / `t_at` | C `trap.c`, **imported live** | `NO_TRAP_FLAGS` |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **imported live** | |
| WAN_LOCKING / SPE_WIZARD_LOCK / SPE_STONE_TO_FLESH | C `:3295–3370`, **named omit** | still `default` `return false` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `rn2(3)` then `rnd(2|6)` on the rock path. Public fortress does not zap striking/force-bolt up/down.

## C ↔ JS fidelity

`ttmp = t_at(x,y)` now at the top of `zap_updown`, matching C `:3233` (drawbridge may move the hero; trap is the **origin** cell). OPENING does not read `ttmp`; harmless.

Drawbridge predicate is a ternary, not `&&`: `DRAWBRIDGE_DOWN` only counts when `dz > 0`; otherwise open portcullis. JS copies that. `find_drawbridge(dbxy)` mutates like C `&xx,&yy`. Then **only** `destroy_drawbridge` — the `!striking` `close_drawbridge` arm is not in this case. Match `:3298–3306` for `striking==TRUE`. **Callee is not a stub:** `destroy_drawbridge` changes terrain, messages, and flags (crush/entity and iron-chain scatter remain named on that function, same class as D-1454 `open_drawbridge`). `disclose = true`. SPE_FORCE_BOLT SPBOOK still skips `makeknown`.

Rock: `else if (striking && dz < 0 && rn2(3) && !Is_airlevel && !Is_waterlevel && !uinwater && !Is_qstart)`. C `Underwater` is `u.uinwater` (`youprop.h:279`). Short-circuit: `rn2` only when `dz < 0` (and this arm is always striking). Disclose **not** set. `rnd(hard_helmet(uarmh)?2:6)` then `losehp(maybe_half_phys, "falling rock", KILLED_BY_AN)`. `mksobj_at(ROCK, x, y, false, false)` then `xname` / `stackobj` / `newsym`. Match `:3310–3320`. `hard_helmet` is C `:567–573` (`is_helmet` then metallic or crackable). `oc_skill === 2` for `ARM_HELM` is the existing objects-table stand-in (`worn.js` / `mhitu.js` / `potion.js`), not a new C-wrong. If `losehp` ends the game, JS returns before `mksobj_at`; C `done()` typically does not return either.

Trap: `else if (dz > 0 && ttmp)` then `striking && ttyp==TRAPDOOR`. Blind/unseen/seen messages; C `Something` is the common-string `"Something"` here. `ttyp=HOLE`, `tseen=1`, `dotrap(NO_TRAP_FLAGS)`. Match `:3324–3338`. `!striking` `closeholdingtrap` and hole→trapdoor are correctly **absent**.

Shared epilogue `:3382–3408` still runs after this `break` (unlike LOCKING, which still `default` `return false`). Named.

Hallucination check: “Match C zap_updown WAN_STRIKING `destroy_drawbridge`” while **`destroy_drawbridge` is live** is **not** a dispatch-stub lie. “Match C WAN_LOCKING `close_drawbridge`” **would** be. “Match C `body_part` for a snake’s HEAD” **would** be (clone is humanoid `"head"`; named).

## Hallucinations / overclaim

Subject says up/down striking destroys a drawbridge, drops a ceiling rock, or shatters a trapdoor into a hole. **True** for those three striking paths plus disclose on db / seen-trapdoor and no disclose on rock. **False until named** for LOCKING close-bridge / closeholdingtrap / hole→trapdoor, STONE, poly `body_part`, and `destroy_drawbridge` crush/chain. Stamping **Addressed:** D-1456 for `:3290–3354` with `striking==TRUE` is fair. Do **not** stamp “Match C WAN_LOCKING.” Do **not** treat fortress PASS as an up/down striking zap.

## Density

One `zap_updown` otyp plus the C helpers that arm needs (`hard_helmet`, `Is_qstart`, ROCK `mksobj_at`). Did not glue LOCKING `close_drawbridge`. ~110 lines. Playbook §2b. Acceptable. `body_part_zap` is a named clone to avoid a zap→polyself import cycle, not a second subsystem.

## Branch-by-branch confirm

1. Down on `DRAWBRIDGE_DOWN`: `destroy_drawbridge`, disclose, epilogue. Match `:3298–3306`.
2. Up/down on open portcullis (`is_drawbridge_wall && !is_db_wall`): same destroy. Match.
3. Closed `DBWALL`: drawbridge `if` false; may still rock or trap. Match.
4. Up `rn2(3)` not air/water/qstart: rock, HP, ROCK object, **no** disclose. Match `:3310–3320`.
5. Up `!rn2(3)`: skip rock; no trap (`dz<0`). Epi still runs. Match.
6. Down + unseen TRAPDOOR: shatter msg, HOLE, `dotrap`; disclose only if `tseen`. Match `:3326–3338`.
7. Down + other trap: striking does nothing in the inner `if`; epi runs. Match (locking arms named).
8. SPE_FORCE_BOLT: same arm; SPBOOK skip makeknown. Match.
9. WAN_LOCKING still `default` false — **no** close_drawbridge. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `ARM_HELM` via existing `oc_skill` mapping, not a recorded helm otyp list.

## Verification

Journal: private canary **12**/12 (C/JS grep; Rule #2; down DRAWBRIDGE_DOWN destroy+learnwand; up rock+HP no learn; SPE_FORCE_BOLT SPBOOK skip makeknown; tseen trapdoor→HOLE+learn; LOCKING still default; OPENING sibling D-1454; probing sibling D-1444); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `01edf8b9`. Fortress PASS is not an up/down striking zap.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The striking-only arm matches `:3290–3354` with `striking==TRUE`. `destroy_drawbridge` is a live callee.

Named omits (map / Open, not Must-fix):

1. `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK (`close_drawbridge` / `closeholdingtrap` / hole→trapdoor) — Open already
2. `zap_updown` SPE_STONE_TO_FLESH — Open already
3. poly `body_part` tables (humanoid `"head"` clone)
4. `destroy_drawbridge` crush/entity and iron-chain scatter (pre-existing on callee)
5. `bhit` doorlock / `bhito` boxlock / remaining `zap_steed` striking `bhitm`

Do not Must-fix “LOCKING should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “JS skipped `close_drawbridge` on STRIKING” (C only closes when `!striking`).

## Callers / RNG ledger

C callers: `weffects` when `u.dz`. Dice: `rn2(3)` then `rnd(2|6)` on rock; `destroy_drawbridge` / `dotrap` may consume more. Public fortress does not hit this.

Verdict: **ACCEPT-WITH-DEBT**
