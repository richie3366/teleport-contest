# Review 1762 — a48dbe85b — Cloak_off and Boots_on (D-2803)

- SHA: `a48dbe85b` (coverage; both otyp switches)
- Files: `js/do_wear.js` (the two bodies, `game.wasinwater` snapshot)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can do_wear.js potion.js incr_itimeout` → `ALREADY` (do_wear already imports potion). The fumble arm does not call that export.

**Addressed:** D-2809 `27a017b11`

## Intent vs deliverable

Subject promises both switches in C order: cloak plain / elven / displacement / mummy / invisibility / alchemy / impossible, and boots plain / water-walking / speed / elven / fumble / levitation / impossible, plus the post-switch `known` tail and the `wasinwater` snapshot. The diff does that. `find_ac` is gone from `Boots_on`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `Cloak_off` | C body, async | `do_wear.c:382–431` |
| `Boots_on` | C body, local (callers are in this file) | `do_wear.c:186–259` |
| `toggle_stealth` / `toggle_displacement` | same file | live |
| `float_up` | imported | `trap.js:3000` |
| `float_vs_flight` | imported | `polyself.js:659` |
| `spoteffects` | imported | `pickup.js:2295` |
| `incr_itimeout` | **not called**; inline dual-write | `potion.c:82–86` |
| `makeknown` / `update_inventory` | imported | live |

`csym --callers Cloak_off`: `do_wear.c:1992` armoroff → `do_wear.js:1753` (delay `afternmv` `:1740`); `:2854` takeoff → `:2227`; `:3156` `wornarm_destroyed` → `:3868`; `polyself.c:1182/1186/1190/1217` → `polyself.js:1230/1234/1238/1267`; `steal.c:250` → `steal.js:282`. `:3248` and `trap.c:327` are comments.

`csym --callers Boots_on`: the only call is `do_wear.c:1560` `set_wear` → `do_wear.js:1581`. `afternmv` at `:2385` → `:3213`. `:26`, `:2405`, and `hack.c:881` are comments.

`sym.mjs`:

```
Cloak_off        js/do_wear.js:883   ASYNC — await required
Boots_on         NOT EXPORTED — 1 LOCAL at js/do_wear.js:1457
incr_itimeout    js/potion.js:540   sync
float_up         js/trap.js:3000   ASYNC — await required
float_vs_flight  js/polyself.js:659   sync
spoteffects      js/pickup.js:2295   ASYNC — await required
```

## C ↔ JS fidelity

`Cloak_off`: `oldprop` is `uprops[oc_oprop].extrinsic & ~WORN_CLOAK` before `clear_worn(W_ARMC)` (`:387–391`). Plain cloaks break. Elven and displacement call the toggles with `on` false. Mummy: `Invis && !Blind`, then `newsym` and `You("can %s.")` with `See_invisible` choosing the two strings (`:407–414`). `cloak_Invis` is `(H||E) && !B` across the flat and `uprops`. Invisibility: `!oldprop && !HInvis && !Blind`, `makeknown`, `newsym`, `pline("Suddenly you can %s.")`. `see_yourself` at `do_wear.c:8` is `"see yourself"`. Alchemy: `EAcid_resistance &= ~WORN_CLOAK`. JS clears `uprops[ACID_RES].extrinsic`, which is that field; `Cloak_on` sets the same bit. A null cloak returns after `clear_worn`. C would dereference. Named.

`Boots_on` switch order matches `:191–251`. Water walking: `spoteffects(TRUE)` while `u.uinwater`, then `wasinwater` → `makeknown` if no longer in water, then clear the flag. The snapshot is `accessory_or_armor_on` `:2375`, JS `:3208`, before `setworn`. Speed: `!oldprop && !(HFast & TIMEOUT)`, then `You_feel` with `" a bit more"` when `HFast` is set. Inside that `if`, `oldprop` is already false, so the suffix is the intrinsic test. Elven calls `toggle_stealth(..., TRUE)`. Levitation: `known`, `botl`, `makeknown`, `float_up`, then `spoteffects(FALSE)` if `Levitation` still holds, else `float_vs_flight`. The tail re-reads `uarmf` (`:253–257`) because `float_up` can destroy the boots. `find_ac` is not in C. Default `impossible` text is `Unknown type of %s (%d)` (`do_wear.c:9`); JS adds a period.

**C-wrong:** fumble boots. C is `incr_itimeout(&HFumbling, rnd(20))` (`:233–235`). That is `set_itimeout(which, itimeout((old & TIMEOUT) + incr))` (`potion.c:55–85`). `itimeout` saturates at `TIMEOUT` (`0x00FFFFFF`) and floors below 1. JS does `(hCur & TIMEOUT) + rnd(20)` and then `& TIMEOUT`. A sum at or above `0x01000000` wraps into the low bits instead of sticking at `TIMEOUT`. `potion.js` `incr_itimeout` already clamps. The D-log names the dual-write (the export updates only `.intrinsic`) and does not name the wrap.

## Hallucinations / overclaim

The two switches are the C bodies, not one arm each. The fumble comment cites `incr_itimeout` as if the inline were that function. The saturation is not the named dual-write. Null `uarmc` / `uarmf` is named. Callers listed in the D-log match the sites above.

## Density

Two functions from the same C file, about 200 lines. Inside the band. Not an unrelated second subsystem.

## Verification

Re-ran both on this SHA with `--base a48dbe85b~1 --reach-all`:

```
verify Cloak_off: baseline a48dbe85b~1 (scoreboard at 67ccc0b33, 2026-09-25T21:05:56.271Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify Cloak_off: no corpus session is blocked on it at a48dbe85b~1 — a vacuous verify is NOT a corpus PASS. …
smoke Cloak_off: no RNG-tagged reach; fixed smoke spread (12 run, 3.1s): 12 PASS, 0 regressed → REACH-OK
verify Boots_on: baseline a48dbe85b~1 (scoreboard at 67ccc0b33, …) — 0 session(s) blocked on it
smoke Boots_on: no RNG-tagged reach; fixed smoke spread (12 run, 3.1s): 12 PASS, 0 regressed → REACH-OK
```

The coverage rows cited 0 blocks. `Boots_on` does call `rnd(20)`; no baseline-PASS recording tags `@ Boots_on(`. No `REGRESSED` session. The wrap is not on that smoke path.

## Actionable C-wrongs

1. `Boots_on` `FUMBLE_BOOTS` must use `itimeout`'s saturate-at-`TIMEOUT` rule (`potion.c:55–64`), not `(sum & TIMEOUT)`. `js/potion.js` `incr_itimeout` already clamps; mirror `HFumbling` from the slot it writes.

Verdict: **QUALITY-RISK**
