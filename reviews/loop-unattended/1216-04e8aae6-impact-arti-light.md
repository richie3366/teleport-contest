# Review 1216 — 04e8aae6 — potion dip light adjust + impact_arti_light (D-2250)

Metadata: SHA `04e8aae6` (D-2250). Queue row `potion.c` dip bless/curse
light adjust, named D-2244, no corpus block. js/ +65/−8
(`potion.js` +29/−3, `read.js` +36/−5).

## Intent vs deliverable

Subject promises `await func(targobj)` in `H2Opotion_dip`, a new
`impact_arti_light` (`potion.c:1591–1621`), and both `litroom`
invent loops (`read.c:2503–2552`). Diff adds exactly that plus
the live callees (`mksobj`/`dealloc_obj`/`Yobjnam2`/`obj_resists`/
`snuff_lit`). Promise kept.

## Inventory

New: `export async function impact_arti_light` (C callee, not a
clone). Changed: `H2Opotion_dip` (one-line await on the C
`(*func)(targobj)` tail); `litroom` `!on` / blessed-`on` invent
loops. No clone deleted. `sym.mjs` on the new/re-pointed names:

```text
impact_arti_light js/potion.js:3584   ASYNC — await required
Yobjnam2         js/objnam.js:2515   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — sit.js:230, wield.js:1110
obj_resists      js/dogmove.js:110   sync
snuff_lit        js/apply.js:5710   ASYNC — await required
artifact_light   js/timeout.js:1351   sync
H2Opotion_dip    NOT EXPORTED — 1 LOCAL in potion.js:3502
mksobj           js/mkobj.js:1832   sync
dealloc_obj      js/mkobj.js:2681   sync
Yobjnam2_pot     NOT EXPORTED — 1 LOCAL in potion.js:2948
```

`H2Opotion_dip` is C `staticfn` shape (same-file only), not clone
#2. New call uses canonical `Yobjnam2`, not `Yobjnam2_pot`.
Callee closure — all LIVE: `obj_resists`, `mksobj`, `curse`/
`bless` (awaited), `H2Opotion_dip`, `Yobjnam2`, `dealloc_obj`,
`snuff_lit` (awaited), `artifact_light`. `--can` at HEAD:
potion→dogmove / mkobj / objnam and read→apply / potion all
ALREADY (D-log's SAFE is the in-SHA new name on existing edges).
`#if 0` `update_inventory` is dead in C too. Punished `move_bc`
/ gremlin hits / Underwater-beyond-`no_op` stay map-named OMIT.

## C ↔ JS fidelity

- `impact_arti_light` vs `potion.c:1592–1621`: gate
  `(worsen ? obj.cursed : obj.blessed) || obj_resists(obj, 25, 75)`
  is the C `||` (so `rn2(100)` only when BUC can move);
  `mksobj(POT_WATER, true, false)`; awaited `curse`/`bless` on
  the temp water; `H2Opotion_dip(otmp, obj, seeit, seeit ?
  Yobjnam2(obj, "glow") : "")`; `dealloc_obj`. No extra RNG.
- `H2Opotion_dip` vs `:1586–1588`: `await func(targobj)` is the
  C function-pointer call; D-2244 made the bless family async,
  so the un-awaited call was floating `maybe_adjust_light`.
- `litroom` vs `:2503–2552`: `[...game.invent]` = C `nextobj`
  captured first. `!on`: `artifact_light` ? `impact_arti_light(otmp,
  true, !Blind)` : `snuff_lit`; then `still_lit` bump; `!Blind`
  still_lit → `"The ambient light seems dimmer."` else uswallow
  else darkness — C `pline_The` / `You()` expansions. Blessed
  `on`: `lamplit && artifact_light` → `impact_arti_light(otmp,
  false, !Blind)`. `const Blind = !!(u.Blind || u.ublind)` is
  the house dual-store idiom, not a new C-wrong.

## Hallucinations / overclaim

None. Hidden is labeled vacuous, NOT a PASS. "Match C" is the
full `impact_arti_light` body plus both C callers, not a stubbed
dispatch.

## Density

+65 for the 30-line C body + two ~15-line invent loops + the
one-line await. In-band (§2b: C is that size).

## Verification

Audit re-ran the corpus claim itself:

```text
verify impact_arti_light: baseline 04e8aae6~1 — 0 session(s)
blocked (0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2
+ cohort 7/7 + full 44/44 pasted. Diff grep: no FORCE/DIAG/seed/
coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
