# Review 1761 — 8af23c12b — resists_poison via Resists_Elem (D-2802)

- SHA: `8af23c12b` (Must-fix from review 1756; `resists_poison_mm` was the bit test only)
- Files: `js/mondata.js` (`Resists_Elem`), plus poison rewires in `zap.js`, `mhitm.js`, `mon.js`, `explode.js`, `region.js`, `potion.js`
- Queue row: review 1756 Must-fix, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- New imports sit on edges that already exist. Calls are inside functions, not at module top level.

## Intent vs deliverable

Subject promises `Resists_Elem` in C order, and `resists_poison` / `resists_poison_mm` / `POT_SICKNESS` calling it with `POISON_RES`. The diff adds that function and deletes the poison bit clones in `mon.js`, `explode.js`, and `region.js`. Fire, cold, shock, disint, acid, sleep, and stone wrappers stay on the bit test. The subject says so.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `Resists_Elem` | C body | `mondata.c:127–197` |
| `mon_resistancebits` | local of the macro | `monst.h:270–271` |
| `hero_uprop_resists` | hero half of `:154–155`, plus flat mirrors | `u.uprops[prop]` |
| `resists_poison` | imported caller | `monst.h:277` |
| `resists_poison_mm` | same export, `POISON_RES` | same macro |
| `defends` / `defends_when_carried` | imported | `artifact.js:2582`, `:2630` |
| `resists_magm` / `resists_blnd` | same file, pre-existing | `mondata.c` direct returns |
| `resists_drli` | imported from `zap.js` | `mondata.c:201–211` |
| `MON_WEP` / `is_weptool` | imported | live |

`sym.mjs`:

```
defends          js/artifact.js:2582   sync
defends_when_carried js/artifact.js:2630   sync
resists_poison   js/zap.js:1462   sync
Resists_Elem     js/mondata.js:239   sync
resists_poison_mm js/mhitm.js:1817   sync
```

`imports.mjs --can`: `ALREADY` for `mondata.js`→`zap.js` `resists_drli`, `zap.js`→`mondata.js` `Resists_Elem`, and `mon.js` / `explode.js` / `region.js`→`zap.js` `resists_poison`, `potion.js`→`mondata.js` `Resists_Elem`. The `mondata`↔`zap` cycle was already there. `resists_drli` is only read from inside `Resists_Elem`, after both modules have evaluated.

## C ↔ JS fidelity

`monst.h:277` `resists_poison(mon)` is `Resists_Elem(mon, POISON_RES)`. Property indices in `const.js` match `prop.h`: fire 1 through stone 8, poison 6. `damgtype = prop + 1` is 7 for poison, and the local `AD_DRST` in `mondata.js` is 7. `rsstmask = 1 << (prop - 1)` is `MR_POISON` `0x20` for poison, and the same shift hits `MR_FIRE` `0x01` through `MR_STONE` `0x80`.

Switch order matches `:144–168`: the eight elemental cases, then `ANTIMAGIC` → `resists_magm`, `DRAIN_RES` → `resists_drli`, `BLND_RES` → `resists_blnd`, else `impossible` and false. `impossible` is not awaited. A null `mon` returns false; C's argument is non-null.

Hero test (`:171`): C reads `u.uprops[prop].intrinsic || .extrinsic` only. JS checks that pair first, then the flat `Poison_resistance` / `H*` / `E*` names. Those flats are not C fields. They are this port's second copy of the same bits, and the subject says so. A hero whose only poison bit lives on the flat still resists. `is_you` is `mon === youmonst || mon._youmonst`, the same stand-in `raceptr` already uses.

Then wielded artifact `defends(damgtype, o)` (`:173–176`), with `uwep` or `MON_WEP`. Worn/carried loop (`:178–195`): `slotmask` is `W_ARMOR|W_ACCESSORY`, plus `W_WEP` for a monster or a hero whose `uwep` is a weapon or weptool, plus `W_SWAPWEP` when `u.twoweap`. Each item: worn `oc_oprop == prop`, or worn alchemy smock (`W_ARMC` and `otyp`) for poison or acid, or `defends_when_carried`. Hero walks `game.invent`; monster walks `minvent` via `nobj`. Same order as the C `||`.

`resists_poison_mm` and `zap.js` `resists_poison` both call `Resists_Elem(mon, POISON_RES)`. `potionhit` `POT_SICKNESS` does too. The deleted locals in `mon.js`, `explode.js`, and `region.js` were the bit test; their call sites now hit the zap export.

`zap.c:4367` is `resists_poison(mon) || defended(mon, AD_DRST)`. `defended` (`mondata.js:162–179`) adds the adult-dragon scale suit, which `Resists_Elem` does not. That `||` was already commented out before this commit. The new comment names it. It is still not called.

## Hallucinations / overclaim

"Follows `Resists_Elem`" matches the poison wrappers and the new function. It does not match `resists_fire` and the other `monst.h:272–279` macros, which the subject leaves on the bit test. That is a named omit of those wrappers, not a stub inside `Resists_Elem`. No claim that `hmon_hitmon_poison` or the dragon-suit `defended` OR was wired.

## Density

One C function (~70 lines) plus the poison call sites that the Must-fix named. The other elemental wrappers are the named remainder, not a second function stuffed into the diff.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify mhitm_ad_drst --base 8af23c12b~1 --reach-all` on this SHA:

```
verify mhitm_ad_drst: baseline 8af23c12b~1 (scoreboard at 24d4c0ac1, 2026-09-25T20:52:50.269Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mhitm_ad_drst: no corpus session is blocked on it at 8af23c12b~1 — a vacuous verify is NOT a corpus PASS. …
smoke mhitm_ad_drst: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The Must-fix cited 0 blocks. D-log "smoke 12/12, 0 regressed" matches. No `REGRESSED` session. `Resists_Elem` itself draws no RNG.

## Actionable C-wrongs

None. The other elemental wrappers and `zap.c:4367` `defended` stay named.

Verdict: **ACCEPT**
