# Review 653 — ac1199da — wield.c chwepon restrict_name (D-1692)

## Metadata
- Full / short hash: `ac1199da7d2c25887bb85fb1d603e2b1d94c0883` / `ac1199da`
- Parent: `93fcd877` (D-1691). This file audits **this SHA only** (ninth of nine `js/` commits since review **644**). Archive **Addressed:** D-1692 (hash filled this audit). HEAD of the nine.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 23:38:12 +0200
- D-id: **D-1692**
- Stats: `js/wield.js` +30/−16; `js/artifact.js` +1/−1. Total `js/` insertions **31** <250. Band **150–350**.
- Claims to close: Open wield `restrict_name` after D-1670 do_oname slip. Not `useupall`/`obfree`. Not do_oname slip itself. `reviews/loop-2026-08-15/` has no unpaid chwepon Must-fix.
- JS / map: `wield.js` `chwepon`; `restrict_name` comment. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **631** named wield restrict after slip.

## Intent vs deliverable

Git subject promises: a named restricted artifact faintly glows without spe change on disenchant, instead of skipping `restrict_name` after D-1670.

`node scripts/csym.mjs chwepon` → `wield.c:917–1048`. `--callers`: `read.c:1672`. `restrict_name` `artifact.c:574–623` (`--callers` `do_name.c:331`, `wield.c:993`). `has_oname` `obj.h:196`. `u_wield_art` `obj.h:441` ≡ `is_art(uwep, art)`. `alter_cost` `shk.c:3234–3256` (`--callers` `wield.c:966/:1028`). `costly_alteration` `mkobj.c:751–826` (`--callers` include `wield.c` via DEGRD/DECHNT). `useupall` `invent.c:1311–1317`. `COST_DECHNT=5` / `COST_DEGRD=6` `hack.h:289–290`.

```991:997:nethack-c/upstream/src/wield.c
    if (has_oname(uwep))
        wepname = ONAME(uwep);
    if (amount < 0 && uwep->oartifact && restrict_name(uwep, wepname)) {
        if (!Blind)
            pline("%s %s.", Yobjnam2(uwep, "faintly glow"), color);
        return 1;
    }
```

```1036:1039:nethack-c/upstream/src/wield.c
    if (u_wield_art(ART_MAGICBANE) && uwep->spe >= 0) {
        Your("right %s %sches!", body_part(HAND),
             (((amount > 1) && (uwep->spe > 1)) ? "flin" : "it"));
```

Parent: restrict/Magicbane/shop/weld invent comments. The diff **does** `has_oname`/`ONAME` then `restrict_name` (empty name FALSE), `is_art` Magicbane after spe+=amount, unpaid `alter_cost(uwep,0)`, `costly_alteration` COST_DEGRD (crysknife) / COST_DECHNT (spe down), weld `update_inventory`. It **does not** replace evaporate splice with `useupall`/`obfree`, nor import `Yobjnam2`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `restrict_name` | LIVE | D-1670; this SHA is the `chwepon` caller |
| `has_oname` / `ONAME` | LIVE | const.js |
| `is_art` | LIVE | no `u_wield_art` clone #6 |
| `alter_cost` | LIVE | **omits C `update_inventory` on price bump** |
| `costly_alteration` | LIVE | ASYNC |
| `update_inventory` (weld) | LIVE | |
| `Yobjnam2` | CLONE | wield.js local, not objnam export |
| `useupall` | STUB | invent splice; named |

`node scripts/sym.mjs`:

```
chwepon          js/wield.js:1162   ASYNC — await required
restrict_name    js/artifact.js:803   sync
alter_cost       js/shk.js:678   sync
costly_alteration js/shk.js:1732   ASYNC — await required
is_art           js/artifact.js:1701   sync
has_oname        js/const.js:2986   sync
useupall         NOT EXPORTED — local js/eat.js:2119
```

`--can js/wield.js js/artifact.js restrict_name` / `js/shk.js alter_cost`: ALREADY static. FORCE/DIAG/getRngLog/fastforward: none.

## C ↔ JS fidelity

`chwepon` gate `!uwep || not weapon/weptool` then weld `will_weld` glow/tingle `uncurse` + **`update_inventory`** (`:937`) then `strange_feeling` return 0. Worm-tooth `:952–972` message → CRYSKNIFE → unpaid `alter_cost` → makeknown → `encumber_msg` if quan split. Crysknife `:973–989` message → **`costly_alteration(..., COST_DEGRD)`** then WORM_TOOTH (C order: shop before otyp). Restrict `:991–997` after those, before `spe>5 && rn2(3)` evaporate. `color = hcolor(black/blue)` at entry (Hallu named). `restrict_name` `:581` `!*name` FALSE; `"the "` strncmpi; shuffle `OBJ_DESCR`; artilist strcmp; `SPFX_NOGEN|SPFX_RESTR || quan>1`. JS empty string is falsy. Evaporate still `rn2(3)` then splice not `useupall`. Glow `amount*amount==1` moment/while. Then DECHNT, `spe+=amount`, unpaid `alter_cost` if amount>0. Magicbane **after** spe change (`:1036`, spe already new). Elven vibrate `:1043–1045` `spe>5 && (elven || oartifact || !rn2(7))`.

`alter_cost` C `:3246–3253` `next_shkp` + `onbill` + `get_cost` + **`update_inventory`**. JS walks `fmon` isshk, same price rule, **no inventory refresh**. `costly_alteration` unpaid verbalize+bill_dummy is the existing port.

**`restrict_name` shuffle.** C `:589–602` `OBJ_DESCR` + `obj_shuffle_range` then same-class undiscovered descr/pool; artilist `strcmp` after `"the "`. JS the D-1670 export (comment-only hunk this SHA). Empty `wepname` → FALSE so unnamed artifacts still take spe change. **Match `:581` / `:993`.**

**Crysknife / evaporate.** C crysknife `makeknown` only if `otmp->bknown` `:985–986`. JS still `if (otyp !== STRANGE_OBJECT)` without `bknown` on that arm (pre-existing; not this SHA’s restrict cluster). Evaporate `useupall` `:1008` vs invent splice + `setuwep(null)` — named `obfree`. `rn2(3)` on spe>±5 is unchanged and **after** restrict, so a restricted named artifact never reaches evaporate.

**Return / scroll.** C `return 1` after restrict means the scroll is consumed (`read.c` `if (!chwepon(sobj, s))`). JS `return 1` the same. `COST_DECHNT=5` / `COST_DEGRD=6` match `hack.h:289–290` and `ALTERATION_VERBS` index in `shk.js`. `strange_feeling` weld-fail path still `exercise(A_DEX, amount>=0)` then 0. `encumber_msg` only on worm-tooth/crysknife quan split (C); named skip after stack fuse on the spe path.

```1036:1039:nethack-c/upstream/src/wield.c
    if (u_wield_art(ART_MAGICBANE) && uwep->spe >= 0) {
        Your("right %s %sches!", body_part(HAND),
             (((amount > 1) && (uwep->spe > 1)) ? "flin" : "it"));
```

JS `is_art(uwep, ART_MAGICBANE)` after `spe += amount`. **Match.** `alter_cost` JS does not rile via `next_shkp` (C `:3246`); unpaid still `onbill` then `get_cost`.

## Hallucinations / overclaim

Not “dispatch stubbed” for `restrict_name` (LIVE since D-1670). Overclaim would be `useupall`. `alter_cost` is imported but not C-complete (`update_inventory`). Local `Yobjnam2` is `"Your "+xname` not `yobjnam`/`aobjnam` quan (review **650**).

## Density

§2b: one `chwepon` remaining-arm cluster (restrict + Magicbane + shop + weld invent). Related.

## Verification

Journal: private canary (restrict_name Sting/Excalibur/Magicbane + Blind spe unchanged); green+strict seed8000/0900; cohort **9**/9 + strict. Public unhit for artifact disenchant (fortress). Cadence **#2100** at this SHA: **44**/44.

## Actionable C-wrongs

1. **`alter_cost` `update_inventory`** — `shk.c:3250–3251` after `bp->price = new_price`. One port: call `update_inventory()` when the bill bumps (chwepon unpaid + other `:966/:1028` callers).
2. Named only: `useupall`/`obfree`; Hallu `hcolor`; wield `Yobjnam2` import. Do **not** add `u_wield_art`. Do **not** skip restrict before evaporate `rn2(3)`. Do **not** re-port do_oname slip (D-1670).

Verdict: **ACCEPT-WITH-DEBT**
