# Review 1639 — ef7739c1 — `pickup.c` out_container whole-body port (D-2680)

Metadata: commit `ef7739c1`, D-2680, js/pickup.js + js/shk.js.
No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body `out_container` (impossible gate +
artifact/corpse/icebox/bill/pick arms) + shk `pick_pick`. Diff actually
adds: restarted `out_container` body with 6 new arms in C order, new
`pick_pick` export in js/shk.js (+ module `pickmovetime`), imports
(`is_pick` ×2, `pick_pick`, `haseyes`). Matches the promise; no extras.

## Inventory

New/changed JS: `out_container` (restarted, js/pickup.js:2531);
`pick_pick` (new export, js/shk.js:764).

## C ↔ JS fidelity

C loci (csym ranges): `out_container` `pickup.c:2726–2777` (52 L);
`pick_pick` `shk.c:920–947` (28 L). Callers (csym --callers): fwd decl
`:37`, `askchain` `:3376` + decl.h:282 callback; `:3277` encumbrance reset
stays at call sites per C scope (correct — that line is in `menu_loot`,
not this fn).

Branch-by-branch confirm, `out_container`:

- `is_gold` decl → kept. Gate `:2732–2737` impossible/return-(-1),
  else-if gold weigh → identical (prior JS `!obj` guard dropped; C has
  none — obj comes from askchain — so the drop matches C). Confirm.
- Artifact `:2739–2740` return 0; corpse `:2742–2743` return -1 → both
  present, awaited, correct return values. Confirm.
- lift/split(LOADSTONE guard)/extract/re-weigh → kept. Confirm.
- Icebox `:2758` via pickup.c `:64` (container otyp == ICE_BOX) → JS
  `(container.otyp|0) === ICE_BOX` (const at js/pickup.js:176,
  pre-existing). Confirm.
- Bill `:2761–2766` (`!unpaid && !carried && costly_spot`, ox/oy copy,
  `addtobill(obj,FALSE×3)`) → identical args. Confirm.
- Pick `:2767–2768` `is_pick → pick_pick` → identical. Confirm.
- addinv/prinv "removing", gold `bot()` → kept. Confirm.

`pick_pick`: unpaid/is_pick guard, `shop_keeper(*u.ushops)`,
`inhishop`, per-tick `pickmovetime` (C `static NEARDATA` → module `let`,
updated inside the shop gate but outside the tick-gate, matching C),
`SetVoice` + verbalize/cad(FALSE) vs pline/Shknam/haseyes arms → all
present in C order. Confirm.

Callee closure: `touch_artifact` LIVE (js/artifact.js:1386 async);
`removed_from_icebox` LIVE (js/muse.js:2911); `is_pick` canonical export
(js/objects.js:138 — both files import it, no new clone; 4 clones
elsewhere are pre-existing); `fatal_corpse_mistake` local clone
(js/pickup.js:1185) re-read against C `:284–299` here — u_safe gate,
poly_when_stoned→polymon, pline, instapetrify, TRUE — verified CLONE.
`hero_deaf()` (js/shk.js:1644) = `u.Deaf||HDeaf||EDeaf||uroleplay.deaf`,
full C `Deaf` incl. roleplay — correct for the verbalize gate (and
consistent with D-2687's finding). No STUB, no OMIT in either arm.

No RNG in either C body. Diff grep: no FORCE/DIAG/getRngLog/seed
coordinate/fastforward. Rule #2 clean (iteration-wide run, cited in 1638).

## Hallucinations / overclaim

None. "Whole-body" accurate; the D-log names the out-of-scope line
(`:3277` encumbrance) explicitly instead of silently dropping it.

## Density

Breadth-phase whole-function pair (C 52+28 L), ~80 JS insertions over
2 modules that already call each other — within §2b. Same-iteration
STALE park (interest_mapseen) verified live.

## Verification

D-log: syntax, rule2, hidden 0-blocked note, reach smoke 24 PASS,
green/strict/cohort, full 44/44. Re-ran
`hidden-proxy.mjs verify out_container --base ef7739c1~1 --reach-all`:
"0 blocked (0 at baseline…)" — queue row cited 0 blocks, vacuous note
properly stated — plus "24 PASS, 0 regressed → REACH-OK". No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
