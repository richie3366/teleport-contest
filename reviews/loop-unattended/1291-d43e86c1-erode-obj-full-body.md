# Review 1291 — d43e86c1 — trap.c erode_obj full body + ward gate (D-2325)

Metadata: SHA `d43e86c1`, D-2325, Open queue head (row cited 0 blocks). Method: `git show` full `js/` hunks (`js/trap.js` +115/−71, `js/invent.js` +14/−0); C `erode_obj trap.c:170-354` full body + `inventory_resistance_check zap.c:5706-5718` + `u_adtyp_resistance_obj :5674-5698` + `adtyp_to_prop :5653-5671` + `acid_damage :4617-4654` (via `csym.mjs`); C `_canseemon display.h:117-120`, `canseemon display.c:201-205`, `carried/mcarried obj.h:332-333`, `next2u you.h:558`, `distu hack.h:1531`, `Underwater youprop.h:279`, `is_rider/is_reviver mondata.h:161-173`, `COST_* hack.h:293-303`, `AD_ACID monattk.h:50` (all read); `sym.mjs` on `s_suffix`(required: clone→import re-point — pasted below)`costly_alteration`/`dist2`/`carried_obj`/`is_youmonst`/`canseemon`/`grease_protect`/`remove_worn_item`/`extract_from_minvent`/`Monnam`/`vtense`/`cxname`/`simpleonames`/`Blind`/`erosion_matters`; `imports.mjs --can` (shk edge) + `--rulecheck`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify erode_obj --base d43e86c1~1` re-run.

## Intent vs deliverable

Subject promises the full `erode_obj` body (victim/vis arms, wards, grease, verbose, EF_PAY, unwear/destroy, completely arms) + the `inventory_resistance_check` helper + acid_damage wiring. Diff delivers all of it in C order, retiring the drifted local `s_suffix`. Promise kept, with one callee-closure gap below.

## Inventory

- `erode_obj` rewritten: victim/uvictim/vismon/visobj header, 5-arm type switch + default `impossible`, `cxname` + visobj the-strip, grease/erosion/proof/damage/DESTROY/completely chain.
- Deleted file-local `s_suffix` (z/x/sh/ch `'` drift); all sites incl. bear-trap `:3329` now bind the canonical import.
- `inventory_resistance_check` (invent.js) + one-line acid_damage gate.

Required sym paste (deleted clone → import):

```text
s_suffix         js/do_name.js:383   sync
             !! ALSO 5 LOCAL CLONE(S) in 5 files — IMPORT the export; do NOT add another
               js/explode.js:134  js/minion.js:84  js/mthrowu.js:177  js/questpgr.js:626  js/shk.js:225
```

Canonical `s_suffix` (`do_name.js:383`: it→its, you→your, trailing-s→`'`, else `'s`) ≡ C hacklib; the trap.js clone is gone from the list. No new clone added.

## C ↔ JS fidelity

Header: victim (`carried_obj`→youmonst / MINVENT ocarry / null) ≡ `carried/mcarried` (the `|| invent.includes` disjunct is pre-existing superset, fires only in transient states); `next2u` ≡ `dist2≤2` (`distu` is `dist2` to hero, symmetric metric); `u.uinwater` ≡ `Underwater` ✓; `canseemon` local ≡ C `_canseemon` verbatim (wormno?worm_known:cansee||infrared, && mon_visible) — CLONE-verified. Type switch incl. BURN/ROT `check_grease=FALSE`, crackers, cost_type (9/16/17/18/19 ≡ `hack.h:293-303`), default-`impossible` (async, awaited) ✓. Monnam-vs-mon_nam casing per arm matches C exactly (not-affected/damage/destroy/completely `Monnam`; `Somehow` arm `mon_nam`) ✓; not-affected arm excludes visobj, proof arm includes it ✓; `erosion` computed post-ostr (read-only — equivalent); `extract_from_minvent` sync bare / `remove_worn_item` async awaited (Cloak_off path live) / strangely-worn `impossible` format (`%08lx` ≡ padStart hex) ✓. `msg[]`/`action[]`/`bythe[]` literals ≡ C (incl. `smoulder`, `rotten`) ✓. `Your` inlined via pline, no new clone ✓. acid_damage gate ≡ `:4630` ✓. `AD_ACID=8` ✓. shk edge ALREADY, call-time use ✓.

C-wrong (diverged clone in a new live arm): the BURN ward gate rides `inventory_resistance_check` → file-local `u_adtyp_resistance_obj`, which omits C's second arm — worn dwarvish cloak gives 90% vs AD_FIRE/AD_COLD (`zap.c:5690-5694`). The helper's own comment admits it ("dwarvish cloak cold/fire 90 deferred") but it is map-unnamed, and the D-log claims "every arm is live" / "Named: none new". Consequence is RNG-live, not cosmetic: a cloak-wearing hero hit by ERODE_BURN should draw `rn2(100)` and ward 90%; JS draws nothing and always erodes. (Acid side unaffected — cloak covers fire/cold only.) Reachable in normal play, 0 corpus blocks. The pre-existing enlightenment caller (`item_resistance_message_lines`, with its `protection < 99 → "somewhat"` branch) was already written expecting the 90 arm — further proof the arm is missing, not designed out. Fix is one iter: the 4-line cloak arm (`game.u.uarmc` otyp vs DWARVISH_CLOAK, dmgtyp FIRE/COLD → 90).

## Hallucinations / overclaim

One: "every arm is live" overclaims — the BURN arm's ward chain is only as live as its cloak-missing helper. Otherwise clean: `--can` ALREADY confirmed, no `--base` owed (row cited 0, re-run confirms), no-probe disclosure honest, `erosion` reorder and `Your`-inline both exact.

## Density

~129 insertions for a 185-line C body + helper + caller — one envelope, one falsifier. At the sweet spot.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7, no D-1831 gap) + port-iter full `sessions` 44/44 (re-run independently as this iteration's cadence). Re-measured:

```text
verify erode_obj: baseline d43e86c1~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

1. invent.js `u_adtyp_resistance_obj` missing dwarvish-cloak 90 arm (C zap.c:5690-5694); new erode_obj BURN gate inherits it — port the arm (one iter). → Must-fix, prepended.

Verdict: **QUALITY-RISK**
