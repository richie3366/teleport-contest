# Review 1763 — b5e93433b — thitmonst ball, boulder, potion (D-2804)

- SHA: `b5e93433b` (coverage; hit chain after the weapon arm)
- Files: `js/dothrow.js` `thitmonst` (`:574`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can dothrow.js shk.js obfree` → `ALREADY`. Same for `s_suffix` (`do_name.js`) and `impossible` (`display.js`).

## Intent vs deliverable

Subject promises the iron-ball, boulder, and potion arms, mulch via `check_shop_obj` then `obfree`, the non-ammo penalty as `obj === thrownobj`, and `impossible` for unknown bow gloves. The diff does that and reorders the tail into one `else if` chain (`dothrow.c:2155–2303`). It does not make the ball return's `placebc` assumption true.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `thitmonst` | C body, async | `dothrow.c:2011–2304` |
| `hmon` | imported (`export { hmon }` `uhitm.js:1809`) | live; false means died (`uhitm.js:1775`) |
| `potionhit` | imported | `potion.js:3814` |
| `obfree` / `check_shop_obj` | imported | `shk.js:3878` / `:2924` |
| `s_suffix` | imported; two call sites re-pointed | `hacklib.c:344–359` |
| `s_suffix_throw_gold` | leftover local clone | still used by `throw_gold` (`dothrow.js:874`) |
| `placebc` | **not called** from `unstuck` | `mon.c:3452`; export `ball.js:380` |

`csym --callers thitmonst`: `apply.c:3521` `use_pole` → `apply.js:3852`; `apply.c:3848` grapnel → `apply.js:4019`; `dokick.c:748` → `dokick.js:1522`; `dothrow.c:1492` `throwit` → `dothrow.js:2126`. `extern.h:850` is the declaration.

`sym.mjs` (re-points; `hmon` is a named export, not `export function`):

```
s_suffix         js/do_name.js:386   sync
             !! ALSO 5 LOCAL CLONE(S) in 5 files
               js/explode.js:135  js/minion.js:84  js/mthrowu.js:188  js/questpgr.js:627  js/shk.js:231
impossible       js/display.js:8110   ASYNC — await required
obfree           js/shk.js:3878   sync
s_suffix_throw_gold NOT EXPORTED — 1 LOCAL at js/dothrow.js:874
hmon             NOT EXPORTED — 1 LOCAL at js/uhitm.js:1803
                 (re-exported at uhitm.js:1809; dothrow imports it)
placebc          js/ball.js:380   sync
unstuck          js/mhitu.js:1636   ASYNC — await required
```

## C ↔ JS fidelity

Weapon hit (`dothrow.c:2193–2231`): DEX after `hmon`, `wasthrown && !gt.thrownobj` returns 1, mulch bills at `bhitpos` with `broken` true then `obfree`. JS `:727–738` matches. Miss still `tmiss` then `wakeup` only for `HMON_APPLIED`. Non-ammo penalty is `obj == gt.thrownobj` (`:2187`); JS `:710` matches.

Iron ball (`:2234–2246`): `exercise(A_STR)` always; on `tmp >= dieroll`, DEX then `hmon`. `!hmon` and swallowed and `!u.uswallow` and `obj == uball` returns 1 because `unstuck` already ran `placebc`. JS `:746–764` copies that return. `unstuck` (`mhitu.js:1636–1656`) sets `ux`/`uy` and `docrt` and skips `mon.c:3452–3453`:

```3448:3453:nethack-c/upstream/src/mon.c
        if (swallowed) {
            gm.mswallower = (struct monst *) 0;
            u.ux = mtmp->mx;
            u.uy = mtmp->my;
            if (Punished && uchain->where != OBJ_FLOOR)
                placebc();
```

The caller of `thitmonst` treats 1 as "object already taken care of" (`dothrow.c:1492`). C has already placed `uball`. JS returns true and never places it.

Boulder (`:2248–2255`): STR always, DEX then `hmon` whose result is ignored, else `tmiss`. JS `:766–774` matches.

Egg / pie / venom (`:2256–2261`) and potion (`:2262–2266`): `guaranteed_hit || ACURR(A_DEX) > rnd(25)` so `rnd` is skipped when already swallowed. `hmon` / `potionhit(..., POTHIT_HERO_THROW)` then return 1. JS `:776–787` matches. `POTHIT_HERO_THROW` is 1 (`const.js:1370`).

`tamedog` failure (`:2267–2275`): `tmiss(..., FALSE)`, clear sleep, clear `STRAT_WAITMASK`, then the function's final `return 0` — not another `tmiss`. JS `:789–794` then `:818` matches. Swallow vanish (`:2276–2298`) including cockatrice `delobj` return 1 is unchanged and still matches.

Unknown bow gloves (`:2068–2070`): `impossible("Unknown type of gloves (%d)", uarmg->otyp)` inside `uarmg &&` bow. JS `:610` matches and is awaited (`impossible` is async).

## Hallucinations / overclaim

The subject and D-2804 say the ball returns true only when `hmon` reports the monster dead, the hero was swallowed, `uswallow` is clear, and `obj` is still `uball`. That predicate matches `dothrow.c:2239–2241`. The same sentence says the return assumes `unstuck` already placed `uball`. That assumption is false in JS. The D-log lists it under named omissions. The return is now live, so the omit is a wrong floor state, not a comment.

`tmiss` still calling local `miss_missile` instead of `zap.c` `miss` is named and was already true before this SHA.

## Density

The hit chain from the weapon class through the final `tmiss` is the whole tail of `thitmonst`, not one arm sold as the function. `placebc` is a stub on the only path that returns 1 from the new ball arm. That arm should not have shipped until `unstuck` placed the ball.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify thitmonst --base b5e93433b~1 --reach-all`.

```
verify thitmonst: baseline b5e93433b~1 (scoreboard at 8af23c12b) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke thitmonst: no RNG-tagged reach; fixed smoke spread (12 run, 3.1s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is not a false PASS. D-2804's green 2/2, strict ×2, and cohort 7/7 were not re-run here.

## Actionable C-wrongs

1. `unstuck` (`mon.c:3448–3453`): when the hero was swallowed and `Punished && uchain->where != OBJ_FLOOR`, call `placebc` before `vision_full_recalc` / `docrt`. Until that runs, `thitmonst`'s iron-ball `return true` (`dothrow.js:758`) tells `throwit` the ball is already down, and nothing puts `uball` on the floor.

Verdict: **QUALITY-RISK**
