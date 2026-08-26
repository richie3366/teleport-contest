# Review 495 — 289573bc — mcastu.c mcast_blind_you EYE (D-1534)

## Metadata
- Full / short hash: `289573bc8a0acaae2706d462df9105ae83030420` / `289573bc`
- Parent: `9d2ba80e` (D-1533). This file audits **this SHA only** (fourth of nine `js/` commits since review **491**). Archive **Addressed:** D-1534 `289573bc`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 06:38:07 +0200
- D-id: **D-1534**
- Stats: 11 files, +173 / −52 — `js/mcastu.js` +68 / −14, `js/monsters.js` +12. Band 150–350 (js/ insertions 80).
- Claims to close: Open `mcastu.c` `mcast_blind_you` EYE (named from D-1533 / D-1508 HEAD). Not PSI_BOLT. `reviews/loop-2026-08-15/` has no unpaid blindness-spell Must-fix.
- JS / map: `mcastu.js` + `monsters.js` `eyecount`. `c-js-map/turns.md` + `data.md`.
- Prior reviews this SHA claims to close: none unpaid.

## Intent vs deliverable

Git subject promises: a cleric blindness spell covers `body_part(EYE)` and `make_blinded`, not a named omit that zeroed damage.

Pinned C `mcastu.c` `mcast_blind_you` `:729–743`; caller `mcast_spell` `:875–877` `dmg=0`; `spell_would_be_useless` `:977–979` `if (Blinded)`. `youprop.h` `:92` `Blinded (HBlinded && !BBlinded)`, `:103` `Blind`, `:295` `Half_spell_damage`. `mondata.h` `:48–51` `eyecount`. `hack.h` `EYE=1`. `resists_blnd()` does not apply.

```729:743:nethack-c/upstream/src/mcastu.c
mcast_blind_you(void)
{
    /* note: resists_blnd() doesn't apply here */
    if (!Blinded) {
        int num_eyes = eyecount(gy.youmonst.data);
        pline("Scales cover your %s!", (num_eyes == 1)
                                       ? body_part(EYE)
                                       : makeplural(body_part(EYE)));
        make_blinded(Half_spell_damage ? 100L : 200L, FALSE);
        if (!Blind)
            Your1(vision_clears);
    } else
        impossible("no reason for monster to cast blindness spell?");
}
```

Old JS: `MCAST_BLIND_YOU` fell through default `dmg=0`. Uselessness treated `H||E||uroleplay.blind` as Blinded (skipped the spell when C would still pick it for Blindfolded-only).

The diff **does** add `mcast_blind_you`, dispatch + `dmg=0`, C Blinded gate, `eyecount` on `monsters.js` (mndx; cyclops/floating eye 1). It **does not** port other `mcast_spell` bodies, `Half_spell_damage` on `castmu` dice, or sit/pray `eyecount` stubs. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mcast_blind_you` | C `:729`, **LIVE this SHA** | `async function` + `export { }` |
| `mcast_spell` BLIND_YOU | C `:875–877`, **LIVE** | |
| `spell_would_be_useless` | C `:977–979`, **LIVE** | gate is C Blinded |
| `make_blinded` | C `potion.c`/`do.c`, **LIVE** | lazy `do.js` |
| `body_part(EYE)` | C `polyself.c`, **LIVE** | D-1508; `EYE=1` |
| `eyecount` | C `mondata.h:48`, **LIVE this SHA** | mndx clone of ptr `== &mons[]` |
| `Blinded` / `Blind` / `Half_spell_damage` | C macros, **CLONE** | 0/1 Blinded like D-1494 |
| other `mcast_spell` | C, **OMIT named** | still `dmg=0` |
| sit/pray `eyecount` | C, **OMIT named** | still always-2 stubs |

`node scripts/sym.mjs mcast_blind_you make_blinded body_part eyecount haseyes makeplural impossible Blinded Blind Half_spell_damage`:

```
mcast_blind_you  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mcastu.js:213
make_blinded     js/do.js:2356   ASYNC — await required
body_part        js/polyself.js:352   sync
eyecount         js/monsters.js:947   sync
             !! ALSO 2 LOCAL CLONE(S) … js/pray.js:296  js/sit.js:592
haseyes          js/monsters.js:354   sync
makeplural       js/objnam.js:1534   sync
impossible       js/display.js:4325   ASYNC — await required
Blinded          NOT EXPORTED — but 3 LOCAL CLONE(S) …
               js/artifact.js:995  js/mcastu.js:28  js/teleport.js:1667
Blind            NOT EXPORTED — but 28 LOCAL CLONE(S) …
Half_spell_damage NOT EXPORTED — but 4 LOCAL CLONE(S) …
               js/mcastu.js:40  js/monmove.js:597  js/sit.js:184  js/zap.js:617
```

`sym` misses `export { mcast_blind_you }` (not `export async function`). No symbol deleted. New `Blinded` is clone #3 matching artifact.js 0/1 (`H&&!B`), not the H-word. sit/pray still do **not** import the new `eyecount`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new `rn2`.** Duration 100 vs 200 is not an RNG call.

## C ↔ JS fidelity

Gate. `!Blinded` then scales; else `impossible`. JS `Blinded()` is `((HBlinded) && !BBlinded) ? 1 : 0` **match `youprop.h:92` and D-1494 0/1.** Uselessness `:977` uses the same macro; JS dropped EBlinded/`uroleplay`. Blindfolded-only (`EBlinded`) **still casts**. **Match.**

Eyes. `eyecount(youmonst.data)`: `!haseyes` → 0; cyclops/floating eye → 1; else 2. JS mndx vs C `&mons[PM_*]` because `mons()` allocates. **Match the macro.** `num_eyes==1` uses `body_part(EYE)` else `makeplural`. `EYE=1` **match `hack.h:132`.** `body_part` is `mbodypart(&youmonst)`. **Match.**

`make_blinded(Half_spell_damage ? 100L : 200L, FALSE)`. JS Half_spell is `H||E` **match `:295`.** `talk=false` so make_blinded does not print the cloud; scales already did. **Match.** Then `if (!Blind) Your1(vision_clears)`. JS `Blind()` is `(H||E)&&!B` **match `:103`.** Eyes `BBlinded`: timeout applies, Blind stays false, `Your vision clears.` **Match `Your1`.**

Dispatch. `dmg=0` after the call. **Match `:875–877`.** Default still zeros other spells. **Named.**

Callee closure. LIVE: `body_part`, `makeplural`, `make_blinded`, `pline`, `impossible`, `haseyes`. CLONE: `eyecount` (verified), `Blinded`/`Blind`/`Half_spell_damage` (verified macros). OMIT named: other mcast bodies; sit/pray eyecount. STUB: none. **The arm may ship.**

## Hallucinations / overclaim

Subject EYE + `make_blinded`: **true of `:729–743`.** D-log “Eyes leave Blind false so vision_clears”: **true of `BBlinded`.** This is **not** “dispatch ported, callee stubbed.” Stamping **Addressed:** D-1534 is fair for **that function + gate + eyecount export**. Do **not** stamp “Match C all mcast_spell.” Do **not** stamp “Match C sit/pray eyecount.” Do **not** treat Blindfolded as C `Blinded`.

## Density

+80 JS: one C function + the `eyecount` helper it needs. §2b OK. Did not glue FOOT.

## Branch-by-branch confirm

1. Not Blinded, two eyes: “Scales cover your eyes!” + 200 (or 100). **Match.**
2. Cyclops / floating eye: singular `body_part(EYE)`. **Match.**
3. No eyes (`haseyes` false): plural of the no-eyes part. **Match C `num_eyes==0` ≠ 1.**
4. Half_spell: 100. **Match.**
5. Eyes of the Overworld: `!Blind` → vision clears. **Match.**
6. Already Blinded: impossible, no second timeout. **Match.**
7. Blindfolded only: spell still chosen. **Match; old JS was wrong.**
8. `resists_blnd`: unused. **Match the comment.**

## Callers / RNG ledger

C: `mcast_spell` CLRC. JS `castmu` switch. Public-unhit (no scales line in sessions). No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log canary **21**/21 (human/cyclops/floating-eye/jelly; Half_spell 100; Eyes clears; Blindfolded still casts; already-Blinded impossible; Rule #2); green+strict; seed4500 FULL; cohort **7**/7. **Public-unhit** for the scales line. Admit it.

## Actionable C-wrongs

None for Must-fix. Named: other mcast bodies; sit/pray eyecount always-2.

Verdict: **ACCEPT-WITH-DEBT**
