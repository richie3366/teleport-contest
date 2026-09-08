# Review 1046 — 3a388782 — can_twoweapon Yname2/is_plural (D-2076)

## Metadata

- SHA: `3a388782` — `wield.c can_twoweapon used xname where C prints Yname2: dual-wield refusal dropped the "Your " prefix, so JS drew «battle-axe isn't one-handed.» where C draws «Your battle-axe isn't one-handed.» (queue owner can_twoweapon) (D-2076).`
- JS diff: `js/wield.js` +21/−7 (two `xname`→`Yname2` swaps, `is_plural` verb, `plur` suffix, import + doc).
- Docs: D-2076 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1046.

## Intent vs deliverable

Subject promises: the suitability and bimanual refusal arms print
`Yname2` (with the `is_plural` verb and `plur` suffix) per C. Diff
actually swaps exactly those two plines. Promise == diff.

## Inventory

- Changed: two plines in `can_twoweapon` (wield.js).
- Import: `Yname2` joins the existing `./objnam.js` import (same
  module edge as `xname`, no new cycle, no TDZ). `is_plural` was
  already imported.
- No deleted symbols. Diff grep: no `FORCE`/`DIAG`/seed/step reads, no
  `fastforward`, no coordinates.

## C ↔ JS fidelity

C (`wield.c:760–804`, via `csym.mjs`): suitability arm (`:780–785`)
is `pline("%s %s suitable %s weapon%s.", Yname2(otmp),
is_plural(otmp) ? "aren't" : "isn't a", primary/secondary,
plur(otmp->quan))`; bimanual arm (`:786–789`) is `pline("%s isn't
one-handed.", Yname2(otmp))`. JS now prints `Yname2(otmp)` in both,
`is_plural(otmp)` for the verb, `((quan ?? 1)|0) !== 1 ? 's' : ''`
for the suffix. All three substitutions verified: `Yname2 ≡
upstart(yname(obj))` (objnam.js:2459, the C macro shape);
`is_plural` (objnam.js:2195) is `(quan ?? 0) !== 1 || (Eyes &&
!undiscovered)` vs C `obj.h:421–428` `quan != 1 || (Eyes &&
!undiscovered)` — the `?? 0`/null guard is a JS-accommodation with
no reachable difference (real objects always carry numeric quan);
suffix matches C `plur` for every numeric quan. Zero RNG. Confirm.

Named omits precise: artifact-resist arm keeps `xname` where C has
`Yobjnam2` (live export not wired; local clone noted at :1063),
CORPSE/`cant_wield_corpse` arm absent (function not ported),
`body_part(HAND)` literal, Glib wiring.

## Hallucinations / overclaim

None. «Same module edge as xname, no new cycle» verified true.

## Density

Net +14 lines for two arms of one C function. Right-sized.

## Verification

D-log Verify bullet (from the message): both blocked sessions move
under the port. Re-measured myself: `hidden-proxy.mjs verify
can_twoweapon --base 3a388782~1` → `2 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS` (Barbarian-92001, Samurai-92145).
This also explains the 1043 delta above (Samurai-92078's later owner
cleared here). No WORSE.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
