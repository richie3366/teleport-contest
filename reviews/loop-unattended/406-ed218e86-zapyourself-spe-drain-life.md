# Review 406 — ed218e86 — zap.c zapyourself SPE_DRAIN_LIFE (D-1446)

## Metadata
- Full / short hash: `ed218e864a589919c04cb4b2b63b9567fb41c8ea` / `ed218e86`
- Parent: `7628b03e` (D-1445). This file audits **this SHA only** (sixth of nine `js/` commits since review **400**). Archive **Addressed:** D-1446 `ed218e86` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 05:06:00 +0200
- D-id: **D-1446**
- Stats: 10 files, +128 / −33 — `js/zap.js` +53 / −10; `js/spell.js` comments only (+7 / −2).
- Claims to close: Open `zap.c` `zapyourself` SPE_DRAIN_LIFE (named from D-1436 / review **396**). Not bhitm drain. `reviews/loop-2026-08-15/` has no unpaid self-drain Must-fix.
- JS / map: `zap.js` `zapyourself` / `Drain_resistance`; callee `exper.js` `losexp`. `c-js-map/turns.md`. `drain_item` / zap_steed drain still named.
- Prior reviews this SHA claims to close: **396** named zapyourself `losexp`; **404/405** follow-ups listed SPE_DRAIN self.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapyourself SPE_DRAIN_LIFE so a self-directed drain-life spell gates Drain_resistance and calls losexp instead of doing nothing.”

C `zap.c` `zapyourself` `:2817–2823`:

```
    case SPE_DRAIN_LIFE:
        if (!Drain_resistance) {
            learn_it = TRUE; /* (no effect for spells...) */
            losexp("life drainage");
        }
        damage = 0; /* No additional damage */
        break;
```

`youprop.h:50–52` `Drain_resistance` is `HDrain_resistance || EDrain_resistance` ≡ `uprops[DRAIN_RES]`, **not** `resists_drli`. Caller `spell.c` `:1500–1508` wand-duplicate self-dir / atme (D-1436 already routes `#cast` through `wand_duplicate_weffects`). Callee `exper.c` `losexp` `:207–217`: `#levelchange` override else `resists_drli(&youmonst)` return (undead/demon no-op **after** this arm already set `learn_it`). `learnwand` skips SPBOOK. `damage=0` so `:1501` skips `losehp`.

Old JS: `zapyourself` default break; directed bhitm already D-1436.

The diff **does** add the SPE_DRAIN_LIFE arm, `Drain_resistance()` (Antimagic-shaped uprops clone; does **not** rewrite `confer_oc_oprop`), and import `losexp`. It **does not** port `bhito` `drain_item` / zap_steed bhitm drain / `losexp` level-1 `done(DIED)`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zapyourself` SPE_DRAIN_LIFE | C `:2817–2823`, **wired this SHA** | |
| `Drain_resistance()` | C `youprop.h:52`, **clone matching H\|\|E + uprops** | same conferral shape as D-1367 Antimagic |
| `losexp` | C `exper.c:207`, **imported live subset** | ulevel>1 drop; level-1 `done(DIED)` named |
| `resists_drli_you` | C inside `losexp`, **pre-existing on callee** | undead no-op after learn_it |
| `learnwand` SPBOOK | C, **imported live** | no-op for spells |
| `wand_duplicate_weffects` | C `:1479–1514`, **unchanged** | already called this otyp |
| `bhito` `drain_item` | C, **named omit** | |
| zap_steed drain → `bhitm` | C `:3129`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in this arm (`losexp` has no `rn2` on the keep-path). Public fortress does not self-zap drain life.

## C ↔ JS fidelity

Gate is `!Drain_resistance()` then `learn_it` + `losexp("life drainage")` then `damage=0` always (even when resistant). Match `:2817–2823`. Resistant: no learn, no losexp, still 0 damage so no `losehp`. Match. `ordinary` unused (C same).

`Drain_resistance()` reads sticky / H / E / `uprops[DRAIN_RES]` intrinsic+extrinsic. C macro is only uprops H||E. Worn shield of drain resistance writes DRAIN_RES to uprops (E unmirrored except black DSM `set_extrinsic_bit`) — same conferral hole as Antimagic D-1367. The clone is the established keep-path, **not** a `confer_oc_oprop` rewrite. Do not Must-fix “must only read H||E flats.”

`losexp` is **not** a stub: Goodbye pline; ulevel--; `adjabil`; HP/Pw from `uhpinc`/`ueninc`; `uexp = newuexp-1`. Undead poly: `resists_drli_you()` returns before the drop — C `:216–217` same, **after** this SHA already set `learn_it`. Level-1 with drainer: C `done(DIED)`; JS `return` — **named omit on the callee**, not a keep-path lie for ulevel>1. Upolyd mh strip named.

Hallucination check: “Match C zapyourself SPE_DRAIN_LIFE `losexp`” while **`losexp` is the live `exper.js` export** is **not** a dispatch-stub lie. “Match C level-1 `done(DIED)`” **would** be. “Match C `drain_item` on floor” **would** be.

## Hallucinations / overclaim

Subject says a self-directed drain-life spell gates Drain_resistance and calls losexp instead of doing nothing. **True:** `#cast` `.` / atme → `zapyourself`; conferral/H/E/uprops skip; living ulevel>1 Goodbye+drop; undead poly learn then no-op inside losexp; damage 0; directed bhitm still D-1436. **False until named** for level-1 death, `drain_item`, zap_steed drain, `defended(AD_DRLI)`. Stamping **Addressed:** D-1446 for `:2817–2823` is fair. Do **not** stamp “Match C `done(DIED)`.” Do **not** treat fortress PASS as a self-drain.

## Density

One `zapyourself` otyp plus a youprop clone matching an existing conferral pattern. ~25 lines of JS plus comments. Playbook §2b right size. Did not glue `drain_item`. Acceptable.

## Branch-by-branch confirm

1. Living, ulevel>1, not resistant: learn_it + Goodbye + ulevel--. Match.
2. `uprops[DRAIN_RES]` / H / E: skip losexp; damage 0. Match `:2818`.
3. Undead poly: learn_it then `resists_drli_you` return. Match callee `:216–217`.
4. Resistant: no learnwand. Match (learn_it stays false).
5. `damage=0` → wand_duplicate skips `losehp`. Match `:1501`.
6. Directed monster still `bhitm` D-1436. Unchanged.
7. Level-1 `done(DIED)` named on `losexp`.
8. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `Drain_resistance()` is the D-1367 uprops pattern, not a rewrite of `confer_oc_oprop`. Did not add trailing `confdir`.

## Verification

Journal: private canary **16**/16 (C/JS grep; Rule #2; ulevel drop + Goodbye; E/H/uprops-only skip; undead poly no-op; ordinary unused; locking sibling; bhitm still D-1436); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a self-drain.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `losexp`. Callee is not a stub on the ulevel>1 keep-path.

Named omits (map / Open, not Must-fix):

1. `losexp` level-1 `done(DIED)`; Upolyd mh / rehumanize
2. `bhito` SPE_DRAIN_LIFE `drain_item`
3. `zap_steed` drain → `bhitm` (`:3129`)
4. `defended(AD_DRLI)` on `resists_drli`

Do not Must-fix “self-drain should `losehp` extra.” Do not Must-fix “gate should be `resists_drli` not `Drain_resistance`.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `wand_duplicate_weffects` / `dozap` self-dir. No new `rn2`. Public fortress does not take this path.

Verdict: **ACCEPT-WITH-DEBT**
