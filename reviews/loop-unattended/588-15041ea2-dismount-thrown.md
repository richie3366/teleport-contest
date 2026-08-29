# Review 588 — 15041ea2 — steed.c dismount_steed DISMOUNT_THROWN HP (D-1627)

## Metadata
- Full / short hash: `15041ea2eb074cf24966badca4a6066cd29267c5` / `15041ea2`
- Parent: `c020e463` (D-1626). This file audits **this SHA only** (seventh of nine `js/` commits since review **581**). Archive **Addressed:** D-1627 `15041ea2`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 05:54:41 +0200
- D-id: **D-1627**
- Stats: `js/steed.js` +74/−8, `js/dog.js` +9/−3, `js/dogmove.js` +6/−3. Band **150–350** (js/ insertions **89**).
- Claims to close: Open `dismount_steed` DISMOUNT_THROWN after D-1362/`kick_steed` and review **578** (Conflict steed still `rnd(20)`). Not `landing_spot` KNOCKED preferred-dir (still Open). `reviews/loop-2026-08-15/` has no unpaid DISMOUNT_THROWN Must-fix.
- JS / map: `steed.js` `dismount_steed`; `dogmove.js` `dog_move`; `dog.js` `wary_dog`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **322** (`kick_steed` already called THROWN into a silent `"fall off"`); **578** named `:1018`.

## Intent vs deliverable

Git subject promises: thrown/fell riders get `"are thrown"` / `u_locomotion` verb, `losehp Maybe_Half_Phys(rn1(10,10))`, and `set_wounded_legs`, instead of a silent `"fall off"` with no HP after D-1362.

Pinned C `steed.c` `dismount_steed` `:575–822` (`node scripts/csym.mjs dismount_steed`). THROWN arm `:603–618`. usteed-clear Flying/Lev / `u_locomotion("fall")` `:593–598`. `heal_legs(1)` `:655–657` while still mounted. `hack.c` `u_locomotion` `:1816–1829`. `hack.h` `Maybe_Half_Phys` `:1236–1237`. `do.c` `set_wounded_legs` `:2425–2446`; `heal_legs` `:2448–2486`. `youprop.h` Flying `:253–255` (includes `u.usteed && is_flyer` — why C zeros `usteed` first); Levitation `:240`. `--callers dismount_steed` includes `steed.c:443` (`kick_steed`, D-1362), `dogmove.c:1018`, `dog.c:1343` (`wary_dog`). `--callers set_wounded_legs` includes `steed.c:614`. `--callers u_locomotion` includes `steed.c:596`. `dog_move` Conflict steed `:1016–1019`. `wary_dog` `:1342–1343`.

```603:618:nethack-c/upstream/src/steed.c
    case DISMOUNT_THROWN:
        verb = "are thrown";
        FALLTHROUGH;
        /*FALLTHRU*/
    case DISMOUNT_KNOCKED:
    case DISMOUNT_FELL:
        You("%s off of %s!", verb, mon_nam(mtmp));
        if (!have_spot)
            have_spot = landing_spot(&cc, reason, 1);
        if (!ulev && !ufly) {
            losehp(Maybe_Half_Phys(rn1(10, 10)), "riding accident",
                   KILLED_BY_AN);
            set_wounded_legs(BOTH_SIDES, (int) HWounded_legs + rn1(5, 5));
            repair_leg_damage = FALSE;
        }
        break;
```

Old JS: THROWN/KNOCKED/FELL one `"You fall off of …!"`; no Flying snapshot; no `losehp` / `set_wounded_legs`; `heal_legs` deferred; `dog_move` Conflict steed skipped the call (comment claimed it still consumed `rnd(20)`); `wary_dog` nulled `usteed`.

The diff **does** snapshot Fly/Lev with `usteed` cleared, THROWN `"are thrown"` FALLTHROUGH KNOCKED/FELL, retry `landing_spot(...,1)`, `losehp(maybe_half_phys(rn1(10,10)), 'riding accident', KILLED_BY_AN)` + `set_wounded_legs(BOTH_SIDES, HWounded_legs+rn1(5,5))` + skip `heal_legs`, `heal_legs(1)` before release when `repair_leg_damage`, wire `dog_move` and `wary_dog`. It **does not** port Punished/ustuck, water/lava grounded steed death, `landing_spot` KNOCKED preferred-dir / `enexto` forceit, trailing `encumber_msg` / polearm unweapon, BYCHOICE Hallu rain, or export `hack.js` `u_locomotion`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dismount_steed` THROWN/KNOCKED/FELL HP | C `:603–618`, **LIVE this SHA** | |
| Flying/Lev snapshot | C `:593–598` + `youprop.h`, **CLONE** | `dismount_hero_ufly_ulev`; usteed already null so `is_flyer(steed)` does not count |
| `u_locomotion("fall")` | C `hack.c:1816–1829`, **CLONE** | ternary float/fly/`'fall'`; poly `locomotion()` named; do **not** add clone #4 of `u_locomotion` |
| `losehp` | C, **LIVE** | `hack.js`; death → `finish_losehp_done` (C `done` noreturn) |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **LIVE** | `hack.js:915`; H/E only |
| `rn1(10,10)` / `rn1(5,5)` | C `:612` / `:614`, **LIVE** | rng.js |
| `set_wounded_legs` | C `do.c:2425–2446`, **LIVE** | trap.js export; `--can` already |
| `heal_legs(1)` | C `do.c:2448–2486`, **LIVE this SHA** | trap.js; called while still mounted |
| `landing_spot` | C `:459–572`, **CLONE** | forceit `enexto` STUB; KNOCKED preferred-dir named (Open) |
| `dog_move` Conflict steed | C `:1016–1019`, **LIVE this SHA** | removed the `rnd(20)` shim (C has none) |
| `wary_dog` usteed | C `:1342–1343`, **LIVE this SHA** | |
| Punished/ustuck / water-lava / encumber_msg | **OMIT named** | |

`node scripts/csym.mjs dismount_steed` → `steed.c:575-822`. `--callers dismount_steed` 29 sites; this SHA wires `:1018` and `:1343`; `:443` already live. `set_wounded_legs` → `do.c:2425-2446`. `u_locomotion` → `hack.c:1816-1829`. `Maybe_Half_Phys` → `hack.h:1236-1237`. `Flying` → `youprop.h:253-255`. `wary_dog` → `dog.c:1291-1359`.

RNG: `rn1(10,10)` then `rn1(5,5)` on the `!ulev && !ufly` path, same order as C. `landing_spot` may `rn2(viable)` (pre-existing). No seed gate. Removed the Conflict-steed `rnd(20)` consume that C never had.

`node scripts/sym.mjs` on new / re-pointed names:

```
dismount_steed   js/steed.js:678   ASYNC — await required
set_wounded_legs js/trap.js:2622   ASYNC — await required
heal_legs        js/trap.js:2667   ASYNC — await required
maybe_half_phys  js/hack.js:915   sync
u_locomotion     NOT EXPORTED — but 3 LOCAL CLONE(S) in 3 file(s):
               js/do.js:478  js/hack.js:1369  js/teleport.js:1845
             => Do NOT write clone #4.
locomotion       NOT EXPORTED — but 1 LOCAL CLONE(S) in js/monmove.js:1014
wary_dog         js/dog.js:967   ASYNC — await required
landing_spot     NOT EXPORTED — but 1 LOCAL CLONE(S) in js/steed.js:456
losehp           js/hack.js:1064   sync
rn1              js/rng.js:95   sync
finish_maybe_wail js/hack.js:1117   ASYNC — await required
dismount_hero_ufly_ulev NOT EXPORTED — js/steed.js:652 (this SHA)
```

`--can steed.js trap.js set_wounded_legs` / `heal_legs`: ALREADY. `--can dog.js steed.js dismount_steed` / `dogmove.js`: ALREADY. `--can steed.js hack.js u_locomotion`: ALREADY imports `hack.js`, but `u_locomotion` is **not exported** (`hack.js:1369` is a local clone that itself omits `locomotion()`). Do **not** stamp “cycle-forced.” Do not add `u_locomotion` #4. Do not add `set_wounded_legs` in `steed.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

THROWN verb. C overwrites `verb = "are thrown"` then FALLTHROUGH. JS `verb = 'are thrown'` then KNOCKED/FELL. **Match `:603–607`.** `u_locomotion` does **not** run for THROWN (C comment at `:596`: only FELL/KNOCKED). Subject’s slash is the FALLTHROUGH share, not THROWN itself.

You-line. C `You("%s off of %s!", verb, mon_nam)`. JS ``You ${verb} off of ${mon_nam}``. **Match `:608`.** KNOCKED/FELL no longer hardcode `"fall off"`.

usteed-clear Fly/Lev. C `:593–597` `u.usteed=0` then `Flying` / `Levitation` then restore. Flying includes `u.usteed && is_flyer` (`youprop.h:253–255`); after the clear, a flyer steed does not keep the hero airborne. JS `dismount_hero_ufly_ulev` after `usteed=null` uses H/E/B plus `uprops[FLYING]/[LEVITATION]` (confer_oc_oprop, D-1085). **Match the snapshot rule.** Not a 9th `Flying()` wrapper around a still-mounted steed.

`u_locomotion` for KNOCKED/FELL. C `:1816–1829` Lev → `"float"`, else Fly → `"fly"`, else `locomotion(youmonst.data, "fall")`. JS `ulev ? 'float' : ufly ? 'fly' : 'fall'`. **Match Lev/Fly.** Poly `locomotion()` is **named**, not live. `hack.js:1369` already clones the same truncated path (`u.Levitation` / `u.Flying` flags, return `defWord`). This SHA’s helper is **not** that export; do not add a fourth copy.

HP / legs. C `losehp(Maybe_Half_Phys(rn1(10,10)), "riding accident", KILLED_BY_AN)` then `set_wounded_legs(BOTH_SIDES, HWounded_legs + rn1(5,5))` then `repair_leg_damage = FALSE`. JS same order, plus `finish_maybe_wail` / `finish_losehp_done` (C `done` does not return). **Match `:611–616`.** `maybe_half_phys` halves on H/E `Half_physical_damage` (`hack.h:1236–1237`).

`heal_legs(1)`. C `:655–657` before `u.usteed = NULL`. `heal_legs` suppresses the feel-better pline when `u.usteed` (`do.c:2462`). JS `if (repair_leg_damage) await heal_legs(1)` then `usteed=null`. THROWN HP path sets `repair_leg_damage=false` so the steed’s timeout is **not** wiped then re-applied as the hero’s. **Match.**

`dog_move`. C `:1016–1019` `Conflict && !resist_conflict` → `dismount_steed(DISMOUNT_THROWN)` then `MMOVE_MOVED`. **No `rnd(20)`.** JS now awaits the live call. **Match.** Review **578**’s named omit is closed. `dog_hunger` still sits above this in C (`:1011–1012`) and is still missing in JS `dog_move` (pre-existing, not this SHA).

`wary_dog`. C `:1342–1343` `dismount_steed(DISMOUNT_THROWN)` when the former pet is the steed. JS same. **Match.** Old `usteed=null` skipped HP/legs/float_down.

`landing_spot(...,1)`. C forceit `enexto` (`:568–571`). JS `forceit && !found` **returns false** (`steed.js:505–507`). Named. KNOCKED preferred-dir still Open. THROWN starts pass `i==2` (C `:531–535`); JS `iStart=2` for non-BYCHOICE/non-KNOCKED. **Match the THROWN search**, not the forceit fallback.

Callee closure (THROWN arm). LIVE: `pline`/`You`, `losehp`, `maybe_half_phys`, `rn1`, `set_wounded_legs`. CLONE: Fly/Lev snapshot, `landing_spot` body. OMIT named: `enexto` forceit, Punished/ustuck, water/lava, `encumber_msg` after float_down. STUB: `enexto` inside `landing_spot` forceit (named, already Open-adjacent). Not “dispatch ported, callee stubbed” for the HP line. `kick_steed` `:443` already passed THROWN; this SHA fills the body those callers expected.

JS `const.js` `DISMOUNT_*` ordinals are **not** C `hack.h:347–356` (`C: GENERIC=0 FELL=1 THROWN=2 KNOCKED=3 BYCHOICE=7` vs `JS: BYCHOICE=0 THROWN=1 KNOCKED=2 FELL=3 GENERIC=7`). This SHA did **not** touch `const.js`. All `js/` callers use **names**, so the switch still hits the intended arm. Do not mix C numerics. Do not “fix” one constant without remapping every caller.

## Hallucinations / overclaim

Subject THROWN `"are thrown"` + `losehp` / `set_wounded_legs` instead of silent `"fall off"`: **true.** D-log FALLTHROUGH KNOCKED/FELL HP + `heal_legs(1)` mounted + two callers: **true.** Do **not** stamp “Match C `u_locomotion` including `locomotion(youmonst.data)`.” Do **not** stamp “Match C `landing_spot` forceit `enexto`.” Do **not** stamp “Match C `DISMOUNT_*` ordinals in `const.js`.” Do **not** stamp “Match C Punished/ustuck / water-lava / `encumber_msg`.” Do **not** stamp “Match C `dog_hunger` before Conflict steed.” `kick_steed` was already the caller (D-1362); this is the body. Public suite ride sessions (seed0103/0104) are **not** a `#ride` THROWN / Conflict-steed proof.

## Density

+89 for the THROWN/KNOCKED/FELL HP slice of a 248-line function, `heal_legs(1)`, and the two named callers review **578** left open. Did not glue KNOCKED preferred-dir or water/lava. Not a one-`if` peel. §2b cluster is the C arm plus its live callees.

## Branch-by-branch confirm

1. THROWN `"are thrown"` FALLTHROUGH HP/legs. **Match this SHA.**
2. KNOCKED/FELL verb float/fly/`fall` (not poly `locomotion`). **Match Lev/Fly; poly named.**
3. `heal_legs(1)` while mounted; skip after THROWN HP. **Match.**
4. `dog_move` / `wary_dog` callers. **Match.**
5. `landing_spot` KNOCKED preferred-dir / `enexto`. **Named.**

## Callers / RNG ledger

Wired this SHA: `dog_move` `:1018`, `wary_dog` `:1343`. Already live: `kick_steed` `:443`. Conf: `rn1(10,10)` then `rn1(5,5)` iff `!ulev && !ufly`. No `rnd(20)` on the Conflict-steed path. No seed gate.

C `repair_leg_damage` starts as `Wounded_legs != 0` (`youprop.h:138` H||E) **before** the switch. THROWN HP then forces it false so `heal_legs` does not clear the timeout `set_wounded_legs` just wrote. JS mirrors H/E plus `u.Wounded_legs`. BYCHOICE still heals the steed’s legs while mounted (feel-better suppressed), then releases. **Match the flag, not the trailing `encumber_msg()` C runs after `float_down` (`:811`).**

JS `dismount_steed` still skips C’s `place_monster` / `teleds` water-lava `killed` / `mintrap` / overcrowding kill (`:693–807`). Pre-existing envelope (D-0213). This SHA only fills `:603–618` + `:655–657` + two callers.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `u_locomotion` #4; export `hack.js` and call it after clearing `usteed` if the next cluster is poly locomotion. Do not add `set_wounded_legs` in `steed.js`. Do not import `fs`. `--can` says trap.js imports are already there.

C `You("%s off of %s!", verb, mon_nam)` uses `mon_nam` not `Monnam`. JS `mon_nam(mtmp)`. **Match.** `finish_maybe_wail` is a JS await split of C `losehp`’s blocking `maybe_wail`; not a second HP roll.

`BOTH_SIDES` is `LEFT_SIDE|RIGHT_SIDE` (`prop.h:151`). JS imports `BOTH_SIDES` from `const.js` (this SHA). `KILLED_BY_AN` same. **Match the killer format.**

## Verification

D-log green+strict seed8000/0900; cohort **7**/7 + seed2200/0383 + seed0103/0104 ride + strict. seed0103/0104 prove **mounted** play still PASSes, not Conflict-steed THROWN / `wary_dog` throw / `rn1(10,10)` riding-accident. **Public-unhit** for those arms. `kick_steed` THROWN is also public-unhit unless a session answers `'n'` to kick-steed and fails the gallop roll.

## Actionable C-wrongs

None for Must-fix. Named (map / existing Open, not Must-fix): `landing_spot` KNOCKED preferred-dir (already Open); `enexto` forceit; poly `locomotion()` via real `u_locomotion` (do not add clone #4); Punished/ustuck; water/lava; trailing `encumber_msg` / polearm; BYCHOICE Hallu rain; `const.js` `DISMOUNT_*` ordinals vs `hack.h:347–356`. Do not re-port `kick_steed`. Do not glue `lose_guardian_angel` (D-1617). Do not skip `heal_legs(1)` on the BYCHOICE path.

Verdict: **ACCEPT-WITH-DEBT**
