# Review 294 — e430e099 — dokick.c kickdmg special_dmgval(W_ARMF) (D-1332)

## Metadata
- Full / short hash: `e430e099e270a08d37875b32292a05752a20e4c1` / `e430e099`
- Parent: `ea5df558` (D-1331). This file audits **this SHA only**. Archive **Addressed:** D-1332 `e430e099` already has the short hash (filled by D-1333).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 03:18:37 +0200
- D-id: **D-1332**
- Stats: 9 files, +92 / −37 — `js/dokick.js` +10 / −4.
- Claims to close: Open `dokick.c` kickdmg `special_dmgval` (named from D-1310 / D-1331 follow-up). Not throwit land snuff. `reviews/loop-2026-08-15/` has no unpaid kickdmg Must-fix.
- JS / map: `dokick.js` `kickdmg`; callee `weapon.js` `special_dmgval` (pre-existing D-1254 / poly-loop D-1310); `c-js-map/turns.md`. `maybe_mnexto` / `abuse_dog` / martial knockback still named.
- Prior reviews this SHA claims to close: **272** named kickdmg `special_dmgval` after poly AT_KICK already called it; **291** listed it as later Open.

## Intent vs deliverable

Git subject promises: “Match C dokick.c kickdmg so blessed boots actually roll special_dmgval vs undead/shade, instead of stubbing the bonus at 0.”

C `kickdmg` (`dokick.c:34–123`) after thick-skin / shade zero the base:

```
    specialdmg = special_dmgval(&gy.youmonst, mon, W_ARMF, (long *) 0);

    if (mon->data == &mons[PM_SHADE] && !specialdmg) {
        pline_The("%s.", kick_passes_thru);
        return;
    }
    …
    if (dmg > 0) { dmg = rnd(dmg); martial rn2; exercise DEX; }
    dmg += specialdmg; /* blessed (or hypothetically, silver) boots */
    if (uarmf) dmg += uarmf->spe;
    dmg += u.udaminc;
```

Callee `weapon.c` `special_dmgval` (`:361–431`): `which_armor(magr, W_ARMF)` → blessed `rnd(4)` if `mon_hates_blessings`; silver `rnd(20)` if `mon_hates_silver` (stock boots are not silver). Caller `kick_monster` after evade, **non-poly** (`:183–223` poly loop already D-1310).

Old JS: `const specialdmg = 0` with a deferred comment. `dmg += specialdmg` at the C `:90` site already existed (adding 0). Poly AT_KICK already called the live callee.

The diff **does** replace the stub with `special_dmgval(game.youmonst, mon, W_ARMF, null)`. It does **not** port `abuse_dog` / `monflee` / martial knockback / `maybe_mnexto`. Named. No other `js/` files.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `kickdmg` call site `:56` | C, **wired** | was literal 0 |
| `special_dmgval` | C `weapon.c:361–431`, **imported live** | `weapon.js`; `which_armor_magr` youmonst → `u.uarmf` |
| `W_ARMF` | C `0x20`, **imported live** | `const.js`; already used by poly loop |
| shade `!specialdmg` return | C `:58–62`, **pre-existing** | now can be false |
| `dmg += specialdmg` | C `:90`, **pre-existing** | was `+= 0` |
| `which_armor_magr` | C `which_armor` youmonst, **inside callee** | not this SHA |
| `mon_hates_blessings` / `mon_hates_silver` | C `mondata`, **inside callee** | D-1254 |
| `maybe_mnexto` evade | C `kick_monster`, **named omit** | |
| `abuse_dog` / `monflee` | C `:71–76`, **named omit** | tame still skips |
| martial knockback | C `:96–113`, **named omit** | `!rn2(3)` not burned |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on human kickdmg:** `special_dmgval` may `rnd(4)` when `uarmf` is blessed and the target hates blessings, **before** the shade early return (barefoot / uncursed / non-hating: no roll). Silver-boot `rnd(20)` is dead in stock objects. Shade + blessed now skips the harmlessly-through return and later `dmg += rnd(4)` (+ spe + udaminc). Poly-loop call unchanged (still its own `rnd(20)` hit roll).

## C ↔ JS fidelity

Call order is thick-skin `dmg=0` → shade `dmg=0` → `special_dmgval(&youmonst, mon, W_ARMF, NULL)` → shade&&!bonus return → caitiff → (tame abuse named) → `rnd(dmg)` if base>0 → `dmg += specialdmg` → spe → udaminc → HP. That is C `:49–95` except the named tame/knockback. Passing `null` for `silverhit_p` matches `(long *) 0` (no silver-sear pline on a kick).

`which_armor_magr(youmonst, W_ARMF)` returns `u.uarmf`. Blessed boots vs zombie/demon/shade: `mon_hates_blessings` → `rnd(4)`. vs goblin: no `rnd(4)`. Shade barefoot: bonus 0, “kick passes harmlessly through,” **no** `rnd(dmg)` (base already 0) and **no** `rnd(4)`. Match.

This is **not** “Match C `special_dmgval` from scratch.” The callee has been live since D-1254; D-1310 already used it on the poly AT_KICK loop. Hallucination check for “Match C dispatch, callee is a stub” is **false**.

`kickdmg` still skips `abuse_dog`/`monflee` (tame comment) and martial `goodpos` knockback (`!rn2(3)` not burned). Named. Do not treat those as this SHA’s C-wrongs — the queued item was the stubbed bonus.

## Hallucinations / overclaim

Subject + D-1332 say blessed boots actually roll `special_dmgval` vs undead/shade instead of stubbing 0. **The one call plus the already-present `:90` add are the hunk.** Stamping **Addressed:** D-1332 is fair. Do **not** stamp “Match C `abuse_dog` / martial knockback.” Do **not** stamp “Match C `maybe_mnexto` evade.” Do **not** stamp “Match C `killer_xname`.” Do **not** treat fortress PASS as a blessed-boot shade HP drop.

## Density

One C call site on an already-live callee. ~4 executable JS lines (stub → call). Playbook §2b flags a lone deferred `if` as small; this is the queued Open row (stop stubbing the named call), same shape as review **287** dokick `snuff_candle`. Did not glue `maybe_mnexto` or throwit land. Acceptable size.

## Branch-by-branch confirm

1. Barefoot / uncursed vs shade: `specialdmg=0`, harmlessly-through, return. Match `:56–62`. No `rnd(4)`.
2. Blessed boots vs shade: `rnd(4)` then skip return; `dmg = 0 + special + spe + udaminc`. Match. Shade can be hurt.
3. Blessed vs zombie/demon: `rnd(4)` added after `rnd(base)`. Match `:90`.
4. Blessed vs goblin (no hates_blessings): no `rnd(4)`. Match.
5. `+spe` / `udaminc` still after special. Match `:91–93`.
6. Poly AT_KICK loop still calls the same callee per kick. Pre-existing D-1310. Not double-counted on this path (`kickdmg` is the non-poly return).
7. Tame `abuse_dog` / martial knockback / `maybe_mnexto`. Still omitted. Named.
8. **Public-unhit** unless a session kicks with blessed boots vs undead/demon/shade.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `W_ARMF` is the C mask, not a recorded boot otyp. Plain ESM.

## Verification

Journal: private canary **18**/18; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on blessed-boot special. Cadence this audit: full `sessions` at HEAD `b82375a7` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not evidence `rnd(4)` fired in `kickdmg`.

## Actionable C-wrongs

None for Must-fix. Stub 0 → live `special_dmgval(W_ARMF, NULL)` before the shade return, then the existing `:90` add, matches C `:56` / `:90`. Callee is live.

Named omits (map, not Must-fix):

1. `maybe_mnexto` evade (D-1310 named)
2. `abuse_dog` / `monflee` in `kickdmg`
3. martial knockback `goodpos`/`mintrap`
4. throwit land `snuff_candle` — next Open at this SHA

Do not Must-fix “pass `{v}` silverhit_p” (C passes NULL). Do not Must-fix poly-loop (already D-1310).

## Callers / RNG ledger

C: `kick_monster` non-poly → `kickdmg` → `special_dmgval`. JS: same. Public fortress is not evidence blessed-boot `rnd(4)`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: human `kickdmg` now rolls blessed-boot `special_dmgval` vs undead/shade instead of adding 0; evade/tame/knockback stay named.
- Must-fix stays empty for this SHA.
