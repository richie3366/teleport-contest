# Review 462 — 83b29455 — potion.c H2Opotion_dip useeit / towel (D-1501)

## Metadata
- Full / short hash: `83b294558f4ab9fdd4a192707adeb1c3ec16c9f5` / `83b29455`
- Parent: `b96ac27f` (D-1500). This file audits **this SHA only** (eighth of ten `js/` commits since review **454**). Archive **Addressed:** D-1501 `83b29455`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 22:48:15 +0200
- D-id: **D-1501**
- Stats: 13 files, +184 / −51 — `js/potion.js` +78 / −14; `js/trap.js` +30 / −12; `js/iactions.js` comment-only. ~108 JS insertions (band 150–350).
- Claims to close: Open `potion.c` `H2Opotion_dip` useeit `ublindf && Blindfolded_only` (named from D-1500). Not lichen/acid-erode. `reviews/loop-2026-08-15/` has no unpaid H2O Must-fix.
- JS / map: `potion.js` `potion_dip` / `H2Opotion_dip`; `trap.js` `water_damage` invent plines. `c-js-map/turns.md` / `data.md`.
- Prior reviews this SHA claims to close: **447** / **461** named `H2Opotion_dip` `:2461` and towel soak.

## Intent vs deliverable

Git subject promises two C facts: (1) dipping a worn blindfold into holy water still shows the glow when that cover is the only blindness; (2) leftover water soaks a towel instead of skipping that follow-up.

Pinned C `potion.c` `potion_dip` `:2460–2467`: `useeit = !Blind || (obj == ublindf && Blindfolded_only)`; `Yobjnam2(obj,"glow")`; if `H2Opotion_dip` then `poof` and `ECMD_TIME`. Macros `youprop.h:92–103`: `Blinded` is `(HBlinded && !BBlinded)` **0/1**; `Blindfolded` is `EBlinded` (lenses do not set it); `Blindfolded_only` is `Blindfolded && !Blinded`; `Blind` is `((H||E) && !B)`. Helper `H2Opotion_dip` `:1497–1589`: holy/unholy BUC `func` + glow + `iflags.last_msg = PLNMSG_OBJ_GLOWS` + unpaid `alter_cost`/`costly_alteration`; else if `carried` uncursed water, `mentioned_water` around `water_damage(targobj,0,TRUE)` then maybe `makeknown(POT_WATER)`. Towel `:2608–2613` runs only when that helper returned **false** (comment: wetting already done in `water_damage`). Callee `trap.c` `water_damage` `:4712–4770`: invent grease wash / container `hliquid` / waterproof `cannot get into` set `gm.mentioned_water`.

Old JS: `const useeit = !Blind()` only. Unpaid POT_WATER, `mentioned_water`, and the towel soak were named skips. `water_damage` already wet towels (`wet_a_towel` + `ER_NOTHING`) but skipped invent container/grease plines.

The diff **does** add the `ublindf` disjunct, `Blindfolded` / `Blinded_h2o` / `Blindfolded_only` helpers, shop cost + `PLNMSG_OBJ_GLOWS`, `mentioned_water` `makeknown`, towel soak, and those three invent plines. It **does not** port lichen/acid-erode `:2596–2606`. Named. It **does not** add INTERNALCMD `#altdip`. Named. It **does** add a second `Blindfolded_only` clone (`pray.js` already had one).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `potion_dip` useeit | C `:2461`, **LIVE this SHA** | was `!Blind()` only |
| `Blindfolded` / `Blindfolded_only` | C `youprop.h:96–97`, **CLONE this SHA** | also `pray.js` |
| `Blinded_h2o` | C `:92` 0/1, **CLONE this SHA** | not `artifact.js` `Blinded()` |
| `H2Opotion_dip` | C `:1497–1589`, **LIVE** (shop + mentioned) | body existed; this SHA fills named holes |
| `bless` / `uncurse` / `unbless` / `curse` | C `mkobj.c`, **LIVE** | |
| `hcolor` / `an` | C `do_name.c` / `objnam.c`, **LIVE** | potion imports `do_name.js` |
| `alter_cost` / `costly_alteration` | C `shk.c` / `mkobj.c`, **LIVE** | dynamic import |
| `water_damage` invent plines | C `:4736–4765`, **LIVE this SHA** | TOWEL wet already lived |
| `wet_a_towel` | C `weapon.c:1038`, **LIVE** | `ER_NOTHING` so soak can fire |
| `makeknown` | C `invent.c`, **LIVE** | |
| `poof` | C, **LIVE** same file | |
| `Hallucination` (glow `bknown`) | C `:1559`, **LIVE** `do_name.js` (sticky extra) | |
| `Hallucination` (`mentioned_water`) | C `:4755`, **CLONE** `trap.js` sticky | newly live |
| lichen/acid-erode | C `:2596–2606`, **OMIT named** | |
| `pot_acid_damage` / SPE_NOVEL | C `water_damage`, **OMIT named** | pre-existing |

`node scripts/sym.mjs` (new helpers + re-pointed shop / water_damage / glow callees):

```
H2Opotion_dip    NOT EXPORTED — 1 LOCAL js/potion.js:3532
Blindfolded      NOT EXPORTED — 2 LOCAL js/potion.js:2083  js/pray.js:246
             => Do NOT write clone #3.
Blindfolded_only NOT EXPORTED — 2 LOCAL js/potion.js:2094  js/pray.js:249
             => Do NOT write clone #3.
Blinded_h2o      NOT EXPORTED — 1 LOCAL js/potion.js:2088
Blinded          NOT EXPORTED — 2 LOCAL js/artifact.js:896  js/teleport.js:1667
             => Do NOT write clone #3. (this SHA used Blinded_h2o instead)
water_damage     js/trap.js:4509   ASYNC
alter_cost       js/shk.js:683   sync
costly_alteration js/shk.js:1651   ASYNC
wet_a_towel      js/weapon.js:1276   ASYNC
makeknown        js/invent.js:1477   sync
uncurse/bless/unbless/curse  js/mkobj.js LIVE
poof             NOT EXPORTED — 1 LOCAL js/potion.js:3076
Hallucination    js/display.js:290 AND js/do_name.js:171  (+ 8 local clones)
hcolor           js/do_name.js:246   sync
an               js/objnam.js:1527   sync
mentioned_water  NOT FOUND as a function (game field, as in C gm.)
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. iactions comment recovered a session-shaped phrase; no seed in control flow.

**New gameplay RNG:** none in the useeit predicate. Uncursed-water `water_damage(..., true)` still has grease `rn2(2)` / cursed-waterproof `!rn2(3)` (pre-existing; force skips luck `rn2(20)`). Towel `wet_a_towel(-rnd(7-spe))` was already on that arm. Glow `hcolor` may consume **display** RNG under Hallu (`do_name.js`). Public fortress does not dip a worn blindfold.

## C ↔ JS fidelity

useeit. C `:2461` `!Blind || (obj == ublindf && Blindfolded_only)`. JS `!Blind() || (obj === game.u?.ublindf && Blindfolded_only())`. Pointer identity matches C `ublindf`. `Blind()` in potion.js is `((H\|\|E)&&!B)` plus `uroleplay.blind` (pre-existing extra vs `youprop.h:103`). Cover-only: `EBlinded` set, `HBlinded==0` → C `Blind` true, `Blinded` 0, `Blindfolded_only` true → useeit **true**. Old JS `!Blind()` was **false**. **This SHA matches `:2461`.** Timeout-blind **and** cover: C `Blinded` 1 → `Blindfolded_only` false → useeit false (no glow). JS `Blinded_h2o` is `!!(H && !B)` — same 0/1 as `youprop.h:92`, not the D-1488 word bug. **Match.** Eyes `BBlinded`: both `Blinded` 0; lenses do not set `EBlinded`, so `Blindfolded_only` false unless a real cover is worn.

H2O BUC table. C `:1514–1535` holy: cursed→`uncurse` amber `COST_UNCURS`; uncursed→`bless` light-blue `COST_alter` altfmt. Unholy: blessed→`unbless` `"brown"` `COST_UNBLSS`; uncursed→`curse` black `COST_alter` altfmt. Already holy-on-holy / unholy-on-unholy: `func` stays 0. JS the same, `COST_UNCURS=4` / `COST_UNBLSS=3` from `hack.h:287–288` via `const.js`. **Match, no extra `rn2`.**

Glow. C `:1552–1558` `hcolor` then `pline` aura vs bare color, `iflags.last_msg = PLNMSG_OBJ_GLOWS`, `bknown = !Hallucination`. JS same with `do_name.js` `Hallucination` (sticky `u.Hallucination` **or** H&&!resist — extra true vs `display.js:290`). Under Hallu-resist with only sticky set, JS can skip `bknown=1` when C would set it. Display-only. Else-if `!potion.bknown \|\| !potion.dknown` clears `bknown`. **Match `:1560–1566`** for the non-Hallu path.

Shop. C `:1572–1580` unpaid **targobj** of type `POT_WATER`: `COST_alter` → `alter_cost(obj,0L)`; else if not `COST_none` → `costly_alteration`. Then `(*func)(targobj)`. JS dynamic-imports those two LIVE shk/mkobj helpers in that order, then `func(targobj)`. **Callees are not stubs.** **Match.**

Uncursed water. C `:1536–1545` `else` + `carried(targobj)`: clear `mentioned_water`, `water_damage != ER_NOTHING` → `res`, then if mentioned `makeknown(POT_WATER)`, clear again. JS `else if (carried_pot(targobj))` — invent[] / `OBJ_INVENT`. **Match.** Steed saddle is not carried; no `water_damage` there (potionhit `:1709` still `!Blind && canseemon && cansee`; not this SHA).

Towel soak. C `water_damage` towel `spe<7`: `wet_a_towel(..., -rnd(7-spe), TRUE)` then **`return ER_NOTHING`**. So H2O `res` stays false. Then `:2608` “The towel soaks it up!” + `poof`. JS already had that `ER_NOTHING` arm; this SHA adds the follow-up. Holy leftover (already-blessed towel, `func==null`) also reaches soak. **Match `:2608–2613`.** Towel `spe==7` falls through water_damage; if that returns `ER_NOTHING`, soak still fires (C same).

`water_damage` invent plines. C grease wash `:4739–4742`; leaky container `:4753–4758` `mentioned_water = !Hallucination`; waterproof `:4760–4765` `!Blind && !Underwater` (`youprop.h:279` `uinwater`). JS this SHA: same three plines; `!(game.u?.uinwater)` **matches `Underwater`**. `makeknown(obj.otyp)` on waterproof. **Match those arms.** `pot_acid_damage` still named (grease-off acid returns `ER_DESTROYED` without boom). Scroll invent “Your X fade” still skipped (pre-existing, not this hunk’s new live claim).

Callee closure (H2O + towel + invent water). LIVE: `water_damage`, `wet_a_towel`, `bless`/`curse`/`uncurse`/`unbless`, `hcolor`, `an`, `alter_cost`, `costly_alteration`, `makeknown`, `poof`, `Yobjnam2_pot` clone of `Yobjnam2`. CLONE matched: Blindfolded macros. OMIT named: lichen/acid, pot_acid boom, SPE_NOVEL. STUB: none on the glow / soak / unpaid arms. **Arms may ship.**

## Hallucinations / overclaim

Subject worn-cover glow when that cover is the only blindness: **true**. Subject leftover water soaks a towel: **true** (uncursed wet returns `ER_NOTHING`, then soak; leftover holy on an already-blessed towel too). D-log unpaid `alter_cost` / `costly_alteration` / `mentioned_water` `makeknown`: **true**, and those callees are LIVE. Stamping **Addressed:** D-1501 for **useeit + soak + shop + invent water plines** is fair. Do **not** stamp “Match C lichen/acid-erode.” Do **not** stamp “Match C `#altdip` extcmd.” Do **not** stamp “Match C `water_damage` scroll fade invent pline.” Do **not** treat fortress PASS as dipping `ublindf`. This is **not** “dispatch ported, callee stubbed.”

`Blinded_h2o` is a **third** 0/1 Blinded helper (`artifact.js` / `teleport.js` already exist). It **matches** `:92` here; it is clone drift, not a word-vs-0/1 regression.

## Density

One C helper plus the caller predicate that named it, plus the `water_damage` invent messages that helper’s `mentioned_water` needs. Did not glue TAMING. Playbook §2b. ~108 JS insertions. Acceptable.

## Branch-by-branch confirm

1. Worn blindfold, no timeout `HBlinded`, dip into holy: useeit true, amber/light-blue glow, `bknown`, poof. **Match `:2461` + `:1552`. This SHA’s fix.**
2. Same, timeout-blind as well: `Blindfolded_only` false, no glow, `bknown` cleared if water unknown. **Match.**
3. Eyes `BBlinded`, no cover: disjunct false; useeit follows `!Blind`. **Match lenses-not-EBlinded.**
4. Uncursed water + carried towel `spe<7`: wet `rnd`, H2O false, “towel soaks it up!”, poof. **Match `:4730–4735` + `:2608`.**
5. Holy water + already-blessed towel: no `func`, soak still. **Match leftover.**
6. Holy water + cursed unpaid POT_WATER (dip water into water): `uncurse`, `costly_alteration(COST_UNCURS)`, then func. **Match `:1572–1583`.**
7. Holy + unpaid uncursed water: `bless`, `alter_cost(...,0)`. **Match `COST_alter`.**
8. Carried bag, uncursed water: “Some water gets into”, `mentioned_water`, maybe `makeknown(POT_WATER)`. **Match `:1539–1544` + `:4753–4758`.**
9. Oilskin, sighted, not `uinwater`: “cannot get into”, `makeknown`. **Match `:4760–4765`.**
10. Grease washes `!rn2(2)` in invent: pline + `update_inventory`. **Match `:4737–4742`.** Acid boom still named.
11. Lichen corpse + acid: still fall through. **Named omit.**
12. **Public-unhit.**

## Callers / RNG ledger

C: `potion_dip`, potionhit saddle, `impact_arti_light`. JS same three. Dice: towel `rnd` and water_damage grease/container as above; useeit itself has none. `hcolor` display-rng under Hallu.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. Dynamic `import('./shk.js')` is cycle avoidance. No fs. No FORCE. `ublindf` is C’s worn-cover pointer, not a recorded coordinate.

## Verification

D-log: private canary **14**/14; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for worn-cover dip and towel soak. Cohort is shared-startup, not `#dip` blindfold.

## Actionable C-wrongs

None that belong on Must-fix. The cited `!Blind()` hole, soak skip, and unpaid/`mentioned_water` skips are closed with LIVE callees.

Remaining named (map / Open): lichen/acid-erode; INTERNALCMD `#altdip`; Eyes `is_plural`; dodip `inaccessible_equipment`; `pot_acid_damage`; SPE_NOVEL; scroll/spellbook invent fade plines. Clone debt (not this peel): `Blinded_h2o` vs import `artifact.js` `Blinded` (do not write a fourth); `pray.js` Blindfolded pair (do not write #3); `trap.js` / `do_name.js` sticky Hallu vs `display.js:290` on `mentioned_water` / glow `bknown` (resist + sticky only).

Do not Must-fix “uncursed towel should poof inside H2O” (C `ER_NOTHING` then soak). Do not Must-fix “`COST_alter` is a stub.” Do not Must-fix “should have used display `Hallucination` in trap.js in this SHA.”

Verdict: **ACCEPT-WITH-DEBT**
