# Review 418 — 01edf8b9 — spell.c SPE_TURN_UNDEAD IMMEDIATE wand-duplicate (D-1458)

## Metadata
- Full / short hash: `01edf8b9de13a14e96a90d906c1d5bd8fce66ae6` / `01edf8b9`
- Parent: `c2736f3e` (D-1457). This file audits **this SHA only** (ninth of nine `js/` commits since review **409**). Archive **Addressed:** D-1458 was missing `%h`; this audit fills `01edf8b9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 07:51:35 +0200
- D-id: **D-1458**
- Stats: 10 files, +123 / −33 — `js/spell.js` +24 / −6; `js/zap.js` +23 / −3.
- Claims to close: Open `zap.c` `weffects` SPE_TURN_UNDEAD IMMEDIATE wand-duplicate (named from D-1457). Not POLYMORPH. `reviews/loop-2026-08-15/` has no unpaid turn-undead Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; `zap.js` `bhitm` TURN `dbldam` / `spell_damage_bonus`. Callees `weffects` / `bhit` / `unturn_dead` / `zapyourself` `unturn_you` already live (D-0955). `c-js-map/turns.md`. Remaining POLY/CANCEL/STONE/TELE named.
- Prior reviews this SHA claims to close: **410–412** remaining IMMEDIATE after KNOCK/SLOW/LOCK; D-0955 named undead dmg polish.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_TURN_UNDEAD IMMEDIATE wand-duplicate so casting turn undead calls weffects bhit instead of printing Nothing happens.”

C `spell.c` `:1468` is in the `:1457–1514` wand-duplicate fallthrough (after DIG, before POLY/TELE/CANCEL/FINGER). `oc_dir == IMMEDIATE` so `:1479` takes getdir / atme / self vs `weffects`. Self: `zapyourself` `:2903–2907` `unturn_you` already live (D-0955). Directed: `weffects` `:3440–3451` IMMEDIATE `bhit(rn1(8,6), bhitm, bhito)`. Fake book is SPBOOK so `learnwand` skips `makeknown`. `physical_damage` is FORCE_BOLT-only.

C `bhitm` `:243–262`: `wake = FALSE`; `unturn_dead` may set wake; if `is_undead || is_vampshifter`: reveal, wake, `dmg = rnd(8)`, `dbldam` (`Role_if(PM_KNIGHT) && u.uhave.questart` at `:165`) ×2, SPE then `spell_damage_bonus`, `bypasses`, `!resist(..., NOTELL)` then `monflee` if `!DEADMONSTER`. Floor `bhito` TURN already revives eggs/corpses.

Old JS: SPE_TURN_UNDEAD fell through “Nothing happens.” `bhitm` ran `unturn_dead` + `rnd(8)` but **skipped** `dbldam` and `spell_damage_bonus`.

The diff **does** add `else if (otyp === SPE_TURN_UNDEAD)` → `wand_duplicate_weffects(pseudo, atme, false)` and the two C damage multipliers on `bhitm`. It **does not** dispatch POLY/CANCEL/STONE/TELE. Named. It **does not** add remaining `zap_steed` bhitm-routed TURN (would `bhitm` the mount; JS still default). Named. `spell.js` comments that say undead dmg was “already D-0955” overclaim the **multipliers**; D-0955 shipped `unturn_dead` / `unturn_you`, not Knight/SPE bonus.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_TURN_UNDEAD arm | C `:1468–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` IMMEDIATE | C `:3440–3451`, **imported live** | `rn1(8,6)` then `bhit` |
| `bhitm` TURN `unturn_dead` | C `:245–247`, **imported live** (D-0955) | |
| `bhitm` `dbldam` / `spell_damage_bonus` | C `:252–255`, **wired this SHA** | was C-wrong vs `:165`/`:3480` |
| `spell_damage_bonus` | C `:3478–3501`, **imported live** (D-1388) | INT/ulevel table |
| `zapyourself` TURN `unturn_you` | C `:2903–2907`, **imported live** (D-0955) | |
| `bhito` TURN egg/corpse | C, **imported live** | floor revive |
| remaining IMMEDIATE POLY/CANCEL/STONE/TELE | C same fallthrough, **named omit** | still “Nothing happens.” |
| `zap_steed` TURN | C bhitm-routed, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** directed cast uses existing `rn1(8,6)` plus `bhitm` `rnd(8)` (already there); multipliers are deterministic given role/INT. Public fortress does not `#cast` turn undead.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514`: atme zeros dirs; cancelled getdir reuses leftover `u.dx/dy/dz` and prints “The magical energy is released!”; self → `zapyourself` (TURN damage 0, no `losehp`); else `weffects`; `update_inventory()`. `physical_damage` false. Match.

`oc_dir` IMMEDIATE. JS `weffects` still does steed-down then IMMEDIATE then NODIR then RAY (`:3437–3468`). Directed horizontal: `zapsetup` / `bhit(rn1(8,6), bhitm, bhito)` / `zapwrapup`. SPBOOK skip makeknown. **Callees are not stubs.** Hallucination check: “Match C SPE_TURN_UNDEAD weffects bhit” while **`weffects` IMMEDIATE + `bhit` + `unturn_dead` / `unturn_you` / `bhito` TURN are live** is **not** a dispatch-stub lie. Shipping the dispatch **without** `dbldam`/`spell_damage_bonus` **would** have left a C-wrong in the now-reached `bhitm` arm; this SHA closed that.

`bhitm` `:243–262`: `wake = false` then `unturn_dead` (invent eggs/corpses) can wake living targets that are not themselves undead. Undead/vampshifter: `rnd(8)` then Knight questart ×2 then SPE `spell_damage_bonus` (`:3478–3501` INT≤9 −3-floor-1; ≤13 or ulevel<5 identity; ≤18 +1; ≤24 or ulevel<14 +2; else +3). JS `Role_if(PM_KNIGHT) && uhave.questart` is C `:165`. `bypasses` then `resist` NOTELL then `monflee` if `mhp > 0` ≡ `!DEADMONSTER`. Order matches. Wand TURN takes the same arm without the SPE bonus.

Self-dir `:2903–2907`: `learn_it = TRUE`; `unturn_you` (invent `unturn_dead` + undead shudder/stun). JS already. Cast self therefore does not no-op.

Hallucination check: “Match C `spell_damage_bonus` was already D-0955” in `spell.js` comments is an **overclaim**; the **code** adds the multipliers this SHA. “Match C SPE_POLYMORPH cast” **would** be a lie.

## Hallucinations / overclaim

Subject says casting turn undead calls weffects bhit instead of Nothing happens. **True:** `#cast` getdir → self `unturn_you` or `weffects` → `bhit` → `bhitm` unturn + undead `rnd(8)` with Knight/SPE bonuses; KNOCK/SLOW/LOCK/RAY/DRAIN stay wired; POLY/CANCEL still Nothing happens. **False until named** for remaining IMMEDIATE, `zap_steed` TURN. Stamping **Addressed:** D-1458 for the **cast dispatch plus the `bhitm` multipliers** is fair. Do **not** stamp “Match C SPE_POLYMORPH.” Do **not** treat fortress PASS as a turn-undead cast.

## Density

One IMMEDIATE otyp plus the two C damage lines that the newly reached `bhitm` arm was missing. ~50 lines. Playbook §2b caller/callee. Did not glue POLY. Acceptable. Comment-only `zap.js` header churn is not a second subsystem.

## Branch-by-branch confirm

1. `#cast` SPE_TURN_UNDEAD directed: `weffects` `bhit(rn1(8,6))`. Match `:1468–1510`.
2. atme / cancelled getdir leftover 0,0,0: `unturn_you`; no `losehp`. Match.
3. Non-undead: `unturn_dead` only; no `rnd(8)`. Match (canary kobold).
4. Ghost/undead: `rnd(8)` then maybe ×2 then SPE bonus then resist/flee. Match `:248–260`.
5. Wand TURN: same arm, no `spell_damage_bonus`. Match `otyp == SPE_TURN_UNDEAD`.
6. Knight + questart: `dbldam` before SPE bonus. Match `:165`/`:252–253`.
7. SPBOOK skip makeknown. Match.
8. Floor corpse via `bhito` still revive. Unchanged live.
9. POLY/CANCEL/STONE/TELE still Nothing happens. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `dbldam` is `Role_if` + `uhave.questart`, not a recorded Knight name.

## Verification

Journal: private canary **21**/21 (C/JS grep; IMMEDIATE SPBOOK; atme shudder; zapyourself skip makeknown; bhitm kobold no-op; bhitm ghost `rnd(8)`; east cast TIME; POLY/CANCEL still Nothing happens; prior KNOCK/SLOW/LOCK/RAY/NODIR stay; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `01edf8b9`. Fortress PASS is not a turn-undead cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`bhit`/`bhitm`. `dbldam` + `spell_damage_bonus` match `:252–255`.

Named omits (map / Open, not Must-fix):

1. SPE_POLYMORPH / CANCELLATION / STONE_TO_FLESH / TELEPORT_AWAY IMMEDIATE — Open already (POLY first)
2. remaining `zap_steed` bhitm-routed (TURN would hit the mount)
3. `bhit` doorlock / `zap_updown` LOCKING/STONE / `bhito` boxlock

Do not Must-fix “POLY should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “Knight bonus missing” (this SHA adds it).

## Callers / RNG ledger

C callers: `spelleffects`; wand TURN already reached `bhitm`. Dice: `rn1(8,6)` then `rnd(8)` on undead; `unturn_dead` revive dice. Public fortress does not hit the new cast.

`weffects` IMMEDIATE does not set `disclose` on the horizontal `bhit` arm (`:3447–3449`), so type-id is from `bhitm` `learn_it` only. Fake SPBOOK still skips `makeknown` in `learnwand` (`:133`). `dbldam` is computed once at `bhitm` entry (`:165`), not inside the TURN case.

Verdict: **ACCEPT-WITH-DEBT**
