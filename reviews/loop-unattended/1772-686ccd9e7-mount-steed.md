# Review 1772 — 686ccd9e7 — mount_steed (D-2813)

- SHA: `686ccd9e7` (coverage; the ride body)
- Files: `js/steed.js` `mount_steed` (`:607`), `maybewakesteed` (`:464`), `steed_vs_stealth` (`:409`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can steed.js` → `polyself.js` `body_part`, `potion.js` `Glib`, `mhitu.js` `Flying`, `pray.js` `Punished`, `apply.js` `m_unleash`, `teleport.js` `teleds`: all `ALREADY`.

**Addressed:** D-2817

## Intent vs deliverable

Subject promises one `mount_steed` in C order: long-worm tail, petrify, leash, eroded metal, `Lev_at_will`, macro gates instead of `u.Upolyd` / wounded flats, slip `rnd` behind the earlier `||` terms, `maybewakesteed` sampling helpless first, `steed_vs_stealth` via `Flying()` / `Levitation()`, then polearm `unweapon`, `remove_monster`, and `teleds` (not `teleds_simple`). The body does that. The hallucination call is the wrong export.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `mount_steed` | C body, async | `steed.c:197–383` |
| `maybewakesteed` | same file, awaited | `steed.c:827–848` |
| `steed_vs_stealth` | same file | `polyself.c:157–164` |
| `teleds` | imported `teleport.js:1438`, awaited | success placement |
| `test_move` | imported `hack.js:364`, awaited | `TEST_MOVE` |
| `Hallucination` | imported `do_name.js:255` | not the `display.js:1091` macro |
| `Role_if` | file-local clone `steed.js:106` | `you.h:247` `urole.mnum == X` |
| `which_armor` | imported `worn.js:406` | saddle slot |
| `trap_t_at` | imported from `trap.js` | mtrapped site |

`csym --callers mount_steed`: `steed.c:187` `doride` → `steed.js:1175`. `extern.h:3146` is the declaration.

`sym.mjs` (the hallucination re-point stays on the do_name export):

```
Hallucination    js/display.js:1091   sync
                 js/do_name.js:255   sync
             !! multiple exports — import the C-locus one
Blind            js/invent.js:359   sync
Upolyd           js/const.js:3190   sync
Levitation       js/mhitu.js:704   sync
Flying           js/mhitu.js:712   sync
Fumbling         js/attrib.js:1013   sync
Glib             js/potion.js:740   sync
Punished         js/pray.js:245   sync
test_move        js/hack.js:364   ASYNC — await required
teleds           js/teleport.js:1438   ASYNC — await required
Role_if          NOT EXPORTED — local js/steed.js:106
                 (21 other files also have a local)
```

## C ↔ JS fidelity

Already riding returns false (`steed.c:206–208`). Hallucination and `!force` (`:212–215`): C is `HHallucination && !Halluc_resistance` (`youprop.h:116–120`), and `HHallucination` is `uprops[HALLUC].intrinsic`. JS calls `Hallucination()` from `do_name.js:255`:

```255:263:js/do_name.js
export function Hallucination() {
    const u = game.u || {};
    if (u.Hallucination) return true;
    ...
    return !!((u.HHallucination | 0) && !resist);
}
```

A set `u.Hallucination` returns true before resistance. A timeout that lives only on `uprops[HALLUC].intrinsic` is invisible. `display.js:1091` ORs that intrinsic and then applies resistance, and it does not treat the sticky flat as sufficient.

Wounded legs (`:228–238`): `legs_in_no_shape`, then wizard `flags.debug` + `y_n` + `heal_legs(0)`, else return false. JS ORs flat and `uprops` H/E plus `u.Wounded_legs`. The plural is `(H & BOTH_SIDES) == BOTH_SIDES`. `Upolyd` is `umonnum != umonster` (`you.h:554`, `const.js:3190`), then humanoid / verysmall / bigmonst / slithy. `!force && near_capacity() > SLT_ENCUMBER`. Those match.

See/reach (`:252–259`): `!mtmp` or `!force` and (`Blind && !Blind_telepat` or undetected or furniture/object mimic). `Blind()` is `(H||E) && !B` plus `uroleplay.blind`. Long worm (`:262–270`) is before `test_move`. Swallow / stuck / trap / `Punished` / failed `test_move` (`:272–280`): the swing-leg line is `Punished || !(swallow||stuck||trap)`. JS awaits `test_move`. No saddle: `Monnam` not saddled. Petrify (`:291–298`) is `touch_petrifies && !Stone_resistance`, then `instapetrify`; JS returns false only when `gameover` is set, so a survived poly continues. Not tame or minion. `mtrapped` (`:305–310`): `trap_t_at`; a missing trap says `"a trap"` instead of reading `t->ttyp`. Named.

Tameness (`:312–319`): `!force && !Role_if(PM_KNIGHT) && !(--mtame)`. The local `Role_if` is `urole.mnum === pm`. Knight and `force` skip the decrement. Zero after the decrement: `newsym`, resist pline, `m_unleash` when leashed, return false. Underwater is `u.uinwater` (`youprop.h:279`) and `!is_swimmer`. `!can_saddle || !can_ride`.

Reach (`:333–337`): `!force && !floater && !flyer && Levitation && !Lev_at_will`. `levAtWillNow` is the `I_SPECIAL` / `W_ARTI` test (`youprop.h:242–245`), with flat and `uprops` OR'd. Stiff armor (`:338–343`): `is_metallic && greatest_erosion` (`obj.h:126–128` is `max(oeroded, oeroded2)`); rusty when `oeroded` is set, else corroded.

Slip (`:344–363`): `Confusion` is `HConfusion` only (`youprop.h:83–84`). `rnd(MAXULEV/2+5)` is the last `||` term, so it is not drawn when an earlier term is true. Levitation slips away and returns before `rn1`. Otherwise `You slip`, then `losehp(Maybe_Half_Phys(rn1(5, 10)), ...)`. `x_monnam` flags are `ARTICLE_A` and `SUPPRESS_IT|SUPPRESS_INVISIBLE|SUPPRESS_HALLUCINATION`.

Success (`:366–382`): `maybewakesteed` samples `helpless` (`msleeping || !mcanmove`) before clearing sleep, halves `mfrozen` with `(frozen+1)/2`, `rn2` only when frozen is nonzero, plines the wake, then `finish_meating`. Float-up / mount / flight plines are `!force`, and `Flying` is read before `u.usteed` is set, so the new steed's flyer bit is not in that pline. Polearm clears `gu.unweapon`. `steed_vs_stealth` (`polyself.c:159–163`) is `usteed && !Flying && !Levitation` → `BStealth |= FROMOUTSIDE`, else clear that bit. JS `Flying()` includes a flyer `usteed` (`mhitu.js:715`), so a flyer steed takes the else. The write is flat `u.BStealth`, not `uprops[STEALTH].blocked`. Named. Then `remove_monster` and `teleds(..., TELEDS_ALLOW_DRAG)`, then `disp.botl`. `teleds_simple` remains in the file and is not this success path.

## Hallucinations / overclaim

The subject says the property gates are the C macros. Wounded, poly, blind, levitation, flying, fumbling, glib, and punished are those macros (glib also ORs a leftover extrinsic when the slot exists). Hallucination is the `do_name.js` export, which is not `youprop.h:120`. The D-log's named null-trap, `which_armor_saddle`, `landing_spot`'s `game.ftrap` walk (`steed.js:167`), and flat `BStealth` match the code.

## Density

One function. `maybewakesteed` and `steed_vs_stealth` are its callees, not a second subsystem. `dismount_steed` is untouched.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify mount_steed --base 686ccd9e7~1 --reach-all`.

```
verify mount_steed: baseline 686ccd9e7~1 (scoreboard at 7041ab3e4) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke mount_steed: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. No `REGRESSED` session. D-2813's green, strict, and cohort were not re-run here. The hallucination miss is not on that smoke path.

## Actionable C-wrongs

1. `mount_steed` (`steed.c:212–215`): call the resistance-aware `Hallucination` (`display.js:1091`), which reads `uprops[HALLUC].intrinsic` and then `!Halluc_resistance`. `do_name.js:257` returns true on `u.Hallucination` before that test and never reads the intrinsic slot.

Verdict: **QUALITY-RISK**
