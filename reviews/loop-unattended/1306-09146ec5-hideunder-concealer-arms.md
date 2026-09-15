# Review 1306 — 09146ec5 — mon.c hideunder concealer arms ×3 sites (D-2340)

Metadata: SHA `09146ec5`, D-2340, C-fidelity residual (queue row cited 0 blocks). Method: `git show` full `js/` hunks (4 files +61/−23, all read); C `hideunder mon.c:4723-4802` + `can_hide_under_obj monmove.c:2120-2167` full bodies + C `cursed_object_at dogmove.c:145-152` + `race`/`Stone_resistance youprop.h:65` (via `csym.mjs`/grep); `sym.mjs` on `cursed_object_at`/`touch_petrifies`/`resists_ston`/`CORPSE` (local-const resolution traced by hand); JS `hideunder` (mon.js:3121-3167), `can_hide_under_obj`, `propagate`-adjacent makemon inline read; `imports.mjs --can` (makemon→dogmove: ALREADY, not new) + `--rulecheck`; added-lines banned grep (0 hits); `hidden-proxy verify hideunder --base 09146ec5~1` re-run.

## Intent vs deliverable

Subject promises the three missing concealer predicates (coin-pile filter, pet-cursed gate, cockatrice walk incl. hero Stone arm) at all three JS sites (mon.js primary, monmove.js local, makemon.js birth inline). Diff delivers all three at all three + two 1-word exports. Promise kept exactly.

## Inventory

- dogmove.js/monmove.js: 1-word exports (`cursed_object_at` ≡ C verbatim, verified; `can_hide_under_obj` ≡ C with the `#ifdef`'d-out statue loop correctly absent).
- mon.js primary: gate + walk with is_u Stone arm; monmove.js local: gate + walk (`resists_ston` only — monster-only site, correct); makemon.js inline: full predicate (newborns never youmonst, so no Stone arm needed — stated in situ).
- Named: You_see pline + set_msg_xy/PLNMSG_HIDE_UNDER/last_hider (async boundary, both locals stay silent).

## C ↔ JS fidelity

Branch order vs `:4723-4802`: ustuck → trapped/non-pit → eel → hides_under + `can_hide_under_obj(otmp)` + `!mtame||!cursed` + pool/lava → walk → null check → is_u/mundetected + newsym-on-change ✓ all three sites. Coin walk (≥10 across stacks, whole-pile-refuse) ✓. Pet gate exact (`!mtmp->mtame || !cursed_object_at`, both sides) ✓. Walk starts at pile head both sides (C passes otmp by value into the predicate, walks its own copy after — JS `let o = otmp` identical) ✓; `touch_petrifies(mons(corpsenm))` ✓; post-walk null check ✓.

Hero Stone arm: triple-OR idiom reduces to C exactly — `u.Stone_resistance` has zero writes anywhere in `js/` (verified by grep; only reads and local-const shadows), so it is always falsy and the expression ≡ `H||E` ≡ `youprop.h:65`; matches four sibling precedents (dokick/apply/artifact/dothrow). `resists_ston` is the same live function C calls (parked DEAD-ARM note concerns only its STONE_RES sub-arms, untouched here). CORPSE is a numeric `objectNames.indexOf` local const in all three files — `===` and `|0===` both exact.

Cited C concealer arm (`mon.c:4752-4772`, via `csym.mjs hideunder`):

```c
} else if (hides_under(mtmp->data)
           /* hider-underers only hide under objects */
           && (otmp = svl.level.objects[x][y]) != 0
           /* most things can be hidden under, but not all */
           && can_hide_under_obj(otmp)
           /* pets won't hide under a cursed item or an item of any BUC
              state that shares a pile with one or more cursed items */
           && (!mtmp->mtame || !cursed_object_at(x, y))
           /* aquatic creatures don't reach here; other swimmers
              shouldn't hide beneath underwater objects */
           && !is_pool_or_lava(x, y)) {
    if (seeit)
        seenobj = ansimpleoname(otmp);
    /* most monsters won't hide under a cockatrice corpse but they
       can hide under a pile containing more than just such corpses */
    if (is_u ? !Stone_resistance : !resists_ston(mtmp))
        while (otmp && otmp->otyp == CORPSE
               && touch_petrifies(&mons[otmp->corpsenm]))
            otmp = otmp->nexthere;
    if (otmp)
        undetected = TRUE;
}
```

Three-site audit table (all diffs read):

| Site | Gate | Walk branch | Null check | Notes |
|------|------|-------------|------------|-------|
| mon.js primary (`:3137-3159`) | `can_hide_under_obj` + `!mtame\|\|!cursed` + `!is_pool && !is_lava` | is_u→Stone triple-OR else `resists_ston` | `if (o)` | Full `hideunder` incl. eel/ustuck/trapped/is_u-newsym arms; silent per named omit |
| monmove.js local | same gate | `!resists_ston` only | `if (o)` | Monster-only postmov site; no is_u path by construction ✓ |
| makemon.js birth inline | same gate on `objects_at(hx,hy)` | `!resists_ston` only + comment | `if (o)` | Newborns never youmonst (stated in situ) ✓ |

`!is_pool_or_lava` renders as `!is_pool && !is_lava` (pre-existing per-site decomposition with the drawbridge-under comment — untouched by this diff; moat reaches via `is_pool`'s moat arm per review 1289's per-mask walk) ✓. `cursed_object_at` ≡ C `dogmove.c:145-152` statement-for-statement (`objects[x][y]` walk, `->cursed` → TRUE, else FALSE; JS `objects_at` is the file's pile-head accessor) ✓. `can_hide_under_obj` walk uses a separate local (`o`, not the parameter) — C's walk mutates its by-value copy, equally invisible to the caller; hideunder's pile-head walk is a second, independent walk from the head both sides ✓.

`resists_ston` (`monsters.js:686`) and `touch_petrifies` (`monsters.js:450`) both LIVE sync per `sym.mjs`; both join existing monsters.js imports at the makemon site, and mon.js/monmove.js already import them (diff shows import lines only gaining `can_hide_under_obj`/`cursed_object_at`) ✓. New makemon→dogmove edge: `--can` reports ALREADY (message said CHECK/new — live result is even safer; same conclusion).

Two trivial message imprecisions (not overclaims): makemon→dogmove edge is ALREADY, not new/CHECK; "seenobj pre-walk" describes C order, JS stays silent per the named omit. Safety conclusions identical.

## Hallucinations / overclaim

None. The probe falsifies properly (4 FAIL before → 10/10 after, same cases). "Draw-free" true (no RNG in any added call). Map-clause retirements cited by number.

## Density

+61/−23 across one C function family ×3 sites, one falsifier. Good.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7/full 44/44, verify after last `js/` edit). Re-measured:

```text
verify hideunder: baseline 09146ec5~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean (full-tree re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
