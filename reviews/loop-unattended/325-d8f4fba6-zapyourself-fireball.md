# Review 325 — d8f4fba6 — zap.c zapyourself SPE_FIREBALL (D-1365)

## Metadata
- Full / short hash: `d8f4fba69fa789c7b1857bffa7e4d01267ed0a9a` / `d8f4fba6`
- Parent: `17a0937c` (D-1364). This file audits **this SHA only** (third of four `js/` commits since review **322**). Archive **Addressed:** D-1365 `d8f4fba6` already has the short hash (filled by D-1366).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 13:35:58 +0200
- D-id: **D-1365**
- Stats: 10 files, +101 / −32 — `js/zap.js` +20 (`SPE_FIREBALL` arm).
- Claims to close: Open `zap.c` `zapyourself` SPE_FIREBALL (named from D-1364 / review **317**). Not lightning. `reviews/loop-2026-08-15/` has no unpaid fireball Must-fix.
- JS / map: `zap.js` `zapyourself`; callee `explode.js` `explode` (D-0968/D-0973 WAND_CLASS preamble); `c-js-map/turns.md` + `debt.md`. `lightdamage` / WAN_MAKE_INVISIBLE / AD_ELEC destroy / `spell.c` skilled scatter still named at this SHA.
- Prior reviews this SHA claims to close: **317** named SPE_FIREBALL as a default-0 sibling of lightning. **324** (this cadence, previous SHA) named it as the next Open after MAGIC_MISSILE.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapyourself so a self-aimed fireball spell actually explodes on the hero (d(6,6) via explode), instead of doing nothing.”

C `zapyourself` (`zap.c:2748–2751`):

```
    case SPE_FIREBALL:
        You("explode a fireball on top of yourself!");
        explode(u.ux, u.uy, 11, d(6, 6), WAND_CLASS, EXPL_FIERY);
        break;
```

Comment in C: `11` is `ZT_SPELL(ZT_FIRE)`. No `learn_it`. `damage` stays 0; `explode` owns HP. Next case is WAN_FIRE / FIRE_HORN (`d(12,6)` afire) — **not** FALLTHROUGH.

C `spell.c` `spelleffects` unskilled FALLTHROUGH / atme, and skilled scatter when `dx=dy=dz=0`, are how a **cast** reaches this arm. JS `spelleffects` (`spell.js:1224–1248`) still only wires SPE_HEALING / SPE_EXTRA_HEALING / SPE_TELEPORT_AWAY; other otyps `"Nothing happens."`

Old JS: SPE_FIREBALL fell through `default` → `damage=0`, no `d(6,6)`, no explode.

The diff **does** add the case (`You` + `explode(ux,uy,ZT_SPELL_0+ZT_FIRE,d(6,6),WAND_CLASS,EXPL_FIERY)`). It does **not** wire `spelleffects`. Named. `explode` is a **live** import (`zap.js` already used it for dobuzz fireball), not a stub.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_FIREBALL arm | C `:2748–2751`, **wired** | You + explode; no `learn_it` |
| `explode` | C `explode.c`, **imported live** | D-0968/D-0973; not a zap clone |
| `d(6,6)` | C, **imported live** | rolled before explode body |
| `ZT_SPELL_0 + ZT_FIRE` | C `11`, **wired** | `ZT_SPELL_0=10`, `ZT_FIRE=1` |
| `WAND_CLASS` olet | C, **live explode preamble** | Role_switch damu/5 or /2 |
| `EXPL_FIERY` | C, **imported live** | const 5 |
| `Fire_resistance` short-circuit | C **absent** here | explode `explosionmask` owns it |
| `spell.c` skilled scatter | C `spelleffects`, **named omit** | `rnd(8)+1` explode olet 0 |
| `spell.c` unskilled/atme dispatch | C, **named omit** | JS `"Nothing happens."` |
| WAN_FIRE / FIRE_HORN | C next case, **pre-existing live** | D-0974; not this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `d(6,6)` then explode’s own mask/`zap_over_floor`/`destroy_items` rolls when the arm runs.

## C ↔ JS fidelity

Case sits **before** WAN_FIRE with its own `break`. Match `:2748–2752` (no FALLTHROUGH). `You('explode a fireball on top of yourself!')` matches `You(...)`. Type `10+1=11`. `d(6,6)` is an argument, so it burns before `explode` reads `dam` — clang/JS left-to-right both roll first. `olet` WAND_CLASS takes explode’s Role_switch: Cleric/Monk/Wizard `damu/5`, Healer/Knight `/2`, others full (`explode.js:325–329`). C same preamble. Fire_resistance does **not** skip the You or the `d(6,6)` at this locus; explode’s `explosionmask` zeros hero HP when Fire resists. D-log is honest. `learn_it` stays false; `zapyourself` returns 0; `dozap`/`spelleffects` must not `losehp` a second time. JS `damage` untouched. Match.

Hallucination check: “Match C `zapyourself` SPE_FIREBALL” while **`explode` is live** is not a dispatch-stub lie. “A self-aimed **fireball spell** actually explodes” while **`spelleffects` still `"Nothing happens."`** **is** an overclaim on the **cast** path. The **callee** is not a stub. Do **not** stamp “Match C `spelleffects` SPE_FIREBALL.” Do **not** stamp “Match C skilled scatter.” Do **not** stamp “Match C WAN_FIRE” as this SHA (already D-0974).

## Hallucinations / overclaim

Subject says a self-aimed fireball spell explodes on the hero via `d(6,6)` `explode` instead of doing nothing. **True if `zapyourself` is called with SPE_FIREBALL** (private canary). **False for `#cast` / `docast`** until `spelleffects` stops dropping other otyps. D-log “Public-unhit until `spelleffects` wires SPE_FIREBALL” is honest. Stamping **Addressed:** D-1365 for `:2748–2751` is fair. Do **not** treat fortress PASS as `"You explode a fireball on top of yourself!"`.

## Density

One `switch` arm plus an already-live callee. ~20 lines. Playbook §2b thin — sibling of MAGIC_MISSILE, queued as its own Open row (“Do not combine items”). Did not glue `lightdamage` (next Open). Right size for a map pop. Two consecutive one-arm zap peels (D-1364 then this) waste fixed agent cost relative to “whole practical switch envelope,” but the queue forbade combining. Not a QUALITY-RISK by itself; **324**’s Antimagic C-wrong is the quality issue in this pair.

## Branch-by-branch confirm

1. `zapyourself(SPE_FIREBALL)`: You; `d(6,6)`; `explode` type 11, WAND_CLASS, EXPL_FIERY; return 0. Match `:2748–2751`.
2. Wizard/Cleric/Monk: explode cuts damu by 5. Match `explode.c` olet preamble.
3. Healer/Knight: damu/2. Match.
4. Fire_resistance: explode mask, not a zapyourself skip. Match.
5. No `learn_it` / no `learnwand` from this arm. Match (C never sets it).
6. WAN_FIRE still `d(12,6)` afire after this case. Match `:2752+`.
7. MAGIC_MISSILE arm unchanged this SHA. D-1364 C-wrong remains.
8. `spelleffects` SPE_FIREBALL: still `"Nothing happens."` Named. **Would** reach this arm in C after energy.
9. Skilled scatter `rnd(8)+1` explodes with olet 0: not this function. Named.
10. **Public-unhit** until spell dispatch.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `SPE_FIREBALL` is an object token. `ZT_SPELL_0+ZT_FIRE` is the C macro expansion, not a recorded damage number used as a seed gate. Plain ESM. `await explode` is in-process.

## Verification

Journal: private canary **19**/19 (C/JS case grep; return 0 + `d(6,6)` HP; Fire_resistance 0 HP; Wizard damu/5; MAGIC_MISSILE regression; WAN_FIRE still `d(12,6)` afire; MAKE_INVISIBLE still default; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on cast. This audit cadence: full `sessions` at HEAD `9a144895` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.29/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a self-fireball.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The SPE_FIREBALL arm matches `:2748–2751` call-for-call; `explode` is the real function with WAND_CLASS Role_switch. Dispatcher and skilled scatter are named omits of **other** functions (`spell.c`), already an Open row after D-1366.

Named omits (map / Open, not Must-fix):

1. `spell.c` `spelleffects` unskilled/atme SPE_FIREBALL
2. `spell.c` skilled SPE_FIREBALL scatter (`rnd(8)+1`, olet 0) — already Open
3. `lightdamage` (shipped next SHA as D-1366)
4. WAN_MAKE_INVISIBLE / `maybe_destroy_item` AD_ELEC
5. D-1364 Antimagic uprops — Must-fix on **324**, not this file

Do not Must-fix “set `learn_it` on fireball” (C does not). Do not Must-fix “skip `d(6,6)` when Fire_resistance” (C still rolls; explode masks). Do not Must-fix “olet 0 here” (C uses WAND_CLASS on this arm; olet 0 is skilled scatter).

## Callers / RNG ledger

C zapyourself: `d(6,6)` then explode internals. JS same when the arm runs. `spelleffects` never calls it. Public fortress is not a fireball.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: SPE_FIREBALL now calls live `explode` with type 11 and `d(6,6)`; `#cast` still drops the spell before this arm.
- Must-fix stays empty for this SHA (Antimagic is **324**).
