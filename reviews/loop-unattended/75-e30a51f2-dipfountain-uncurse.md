# Review 75 — e30a51f2 — `dipfountain` cases 17–20 uncurse (D-1114)

## Metadata
- Full / short hash: `e30a51f27f47a9e22895479143dce98167ed5ce9` / `e30a51f2`
- Parent: `c67f09d1` (D-1113). This file audits **this SHA only**. Archive row **Addressed:** D-1114 `e30a51f2` was filled by D-1115. This review notes D-1113 hash already `c67f09d1` on the archive row.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 23:13:35 +0200
- D-id: **D-1114**
- Stats: 10 files, +107 / −41 — `js/fountain.js` +22 / −5 (cases 17–20 fallthrough).
- Claims to close: Open queue `fountain.c` `dipfountain` cases 17–20 uncurse (named). Not Excalibur. Review **69** named omit 3 (first half). `reviews/loop-2026-08-15/` has no open uncurse Must-fix.
- JS / map: `fountain.js` `dipfountain`. `c-js-map/data.md` fountain row. Case 29 `mkgold` / `update_inventory` / luck-lamplit `uncurse` still named (29 shipped next SHA).
- Prior reviews this SHA claims to close: **69** item 3 (uncurse 17–20). Review **68** do-not 5 said do not pull 17–20 into Excalibur.

## Intent vs deliverable

Git subject promises: “Match C fountain.c dipfountain so dipping a cursed item can uncurse instead of a silent no-op.”

Old JS cases 17–20 were empty `break` (same silent no-op as an unhandled arm). C `fountain.c:464–475` fallthrough: if `!is_hands && obj->cursed` then glow unless Blind and `uncurse(obj)`, else `"A feeling of loss comes over you."` Coins are **not** skipped (unlike case 16). `update_inventory` + `dryup` still run after the switch.

The diff **does** that four-case fallthrough. It does **not** add luck/`set_moreluck` or lamplit `maybe_adjust_light` inside `mkobj.js` `uncurse`. Named on that callee. It does **not** call `update_inventory` after the switch (pre-existing named omit). It does **not** pull case 29.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dipfountain` 17–20 | C body, **rewritten** | `fountain.c:464–475`; was empty break |
| `uncurse` | C callee, **imported** | `mkobj.js:381–388` ≡ `mkobj.c:1822–1838` minus luck/light |
| `Blind` | C macro, **clone** | D-1113 helper; `youprop.h:103` |
| `hliquid` | C callee, **imported** | `do_name.js` D-0849 |
| `is_hands` | C local, **pre-existing** | `obj === hands_obj`; gloves already took `wash_hands` |
| `dryup` after switch | C caller, **pre-existing** | `fountain.c:553` |
| `update_inventory` | C caller, **named omit** | `fountain.c:552`; perm_invent redraw |
| luck / lamplit in `uncurse` | C callee tail, **named omit** | `mkobj.c:1826–1836` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG in this arm** (glow is a predicate; `uncurse` luck/light named so this peel does not burn `set_moreluck` RNG either — C luck path has no `rn2`). Outer `rnd(30)` / `dryup` `rn2(3)` unchanged.

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates. Contest Rule #2: no Node builtins. No new input boundary.

## C ↔ JS fidelity

### Envelope C actually writes

C `fountain.c:458–554`: `switch (rnd(30))` after the Excalibur / wash / `water_damage` / `er` skip. Cases 17–20 fall through to one body, then `break`, then **always** `update_inventory(); dryup(..., TRUE)` unless an earlier `return` (er skip / Excalibur).

JS `1276–1387`: same `rnd(30)` switch; 17–20 now share the uncurse body; `dryup` still after the switch. `update_inventory` still absent (same as case 16 / 21–28). Named, not introduced as a new skip **inside** 17–20.

Hands/`uarmg` never reach this switch if wash `er` is `ER_DESTROYED` or `er != ER_NOTHING && !rn2(2)` (`fountain.c:454–456`). If they do reach it, `is_hands` is true only for `hands_obj`, not for worn gloves (`is_hands = obj == &hands_obj`). C therefore **can** uncurse cursed worn gloves on 17–20 (gloves used `wash_hands` for `er`, then the switch sees `!is_hands && obj->cursed`). JS `is_hands` is the same `hands_obj` test. Match. Bare hands take the loss pline.

### Uncurse vs loss

C `464–475`:

```
case 17: case 18: case 19: case 20:
    if (!is_hands && obj->cursed) {
        if (!Blind)
            pline_The("%s glows for a moment.", hliquid("water"));
        uncurse(obj);
    } else {
        pline("A feeling of loss comes over you.");
    }
    break;
```

JS `1282–1298`: same predicate, same `pline_The` analog (`The ${hliquid('water')} glows…`), same `uncurse`, same else-loss. Coins: case 16 skips `COIN_CLASS`; 17–20 do **not**. A cursed gold stack uncurses. Match.

`Blind()`: `(HBlinded \|\| EBlinded) && !BBlinded`, plus `uroleplay.blind` short-circuit (D-1113 clone). C Blind is only the uprop form; born-blind is `HBlinded`. Eyes (`BBlinded`) on a born-blind hero: C glow, JS skip. Exotic. The D-log’s “(+ uroleplay.blind)” is an overclaim relative to `youprop.h:103`, not a dispatch stub.

### uncurse callee

C `mkobj.c:1822–1838`: clear `cursed`; if carried and `confers_luck` → `set_moreluck()`; else BAG_OF_HOLDING `owt = weight`; else FIGURINE+timed `stop_timer(FIG_TRANSFORM)`; if lamplit `maybe_adjust_light`.

JS `mkobj.js:381–388`: clear `cursed`; bag weight; figurine timer. **No** luck / lamplit. Named in this SHA’s D-log and map. Calling this `uncurse` is not “Match C uncurse, callee is a no-op”: the cursed bit clears, bag/figurine side effects run. Luckstone dip 17–20 will uncurse without `set_moreluck` until that mkobj peel. Named omit on `uncurse`, not a silent 17–20 break.

## Hallucinations / overclaim

“Match C so dipping a cursed item can uncurse instead of a silent no-op” is **true for the 17–20 fallthrough, Blind-gated glow, `uncurse` of cursed non-hands (including coins), and the loss pline for blessed/uncursed/hands.** It is **not** true that `update_inventory` now redraws, or that luck/lamplit `uncurse` tails shipped.

This is **not** “Match C dispatch, callee is a stub.” `uncurse` is the real mkobj function minus two named tails. Stamping **Addressed:** D-1114 is fair for the Open 17–20 line. Hash `e30a51f2` is on the archive row (filled by D-1115).

## Density (§2b)

One Open cluster: the four-case uncurse fallthrough C writes as one body. ~22 executable lines. Small but not “one deferred `if`” — sibling arms together, as §2b asks. Did not pull case 29 / pool dip / enlightenment (queue said not Excalibur; those are other arms).

## Verification

Journal: private canary **45**/45 (17–20 glow+uncurse; Blind / EBlinded skip glow; BBlinded glow; uncursed/blessed/hands loss; cursed coins; case 16 curse + coin skip; Levitation keep; default nothing; uarmg; roleplay.blind; cursed=1; dryup after uncurse; ulevel<5 sword); green+strict seed8000/0900; cohort **17**/17 including 0014/0360/4500/0030 + strict 0014/0360/4500/2200/0004/0030/0009/0367. Path **public-unhit**. Cadence fortress is not a cursed-dip proof.

C read of `fountain.c:394–554` / `:464–475`, `mkobj.c:1822–1838`, `youprop.h:98–103`; JS `fountain.js:1276–1298` / `988–993`, `mkobj.js:381–388`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| cursed weapon, 17–20, sighted | glow + `uncurse` | **same** |
| cursed weapon, Blind | `uncurse`, no glow | **same** |
| BBlinded (Eyes) | glow + `uncurse` | **same** unless `uroleplay.blind` (named clone) |
| cursed coins | `uncurse` (no coin skip) | **same** |
| blessed / uncursed / hands | loss pline | **same** |
| cursed worn gloves that reach switch | `uncurse` (`!is_hands`) | **same** |
| case 16 | curse; skip coins | **unchanged** |
| `dryup` after | yes | **same** |
| `update_inventory` | yes | **still named** |
| luck / lamplit in `uncurse` | `set_moreluck` / light | **still named** |

## Actionable C-wrongs

None that Must-fix this next iter. The fallthrough matches `fountain.c:464–475`.

Named omits / do-nots (map / Open, not Must-fix):

1. `mkobj.c` `uncurse` luck `set_moreluck` / lamplit `maybe_adjust_light` (`mkobj.c:1826–1836`).
2. `dipfountain` `update_inventory()` after the switch (`fountain.c:552`). Live Open `drinkfountain` case 24 is a different site.
3. potion.c pool dip. Already Open.
4. Do not restore empty 17–20 `break`. Do not skip coins the way case 16 does. Do not add a `"strange direction"` / help_dir peel. Do not pull case 29 into this SHA — **Addressed:** D-1115 `79438232`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: dipping a cursed non-hands object on fountain fates 17–20 now glows (unless Blind) and calls real `uncurse` instead of a silent break, while luck/lamplit tails and `update_inventory` stay named.
- Must-fix stays empty for this SHA; next port popped Open case 29 `mkgold` (**Addressed:** D-1115 `79438232`).
