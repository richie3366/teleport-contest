# Review 1037 — b9138d02 — youprop.h Invis flat vs quaffed invisibility (D-2067)

## Metadata

- SHA: `b9138d02` — `youprop.h Invis read the magic-trap-only u.Invis flat, so quaffed invisibility never reached wildmiss/mattacku (queue owner wildmiss) (D-2067).`
- JS diff: `js/mhitu.js` +30/−5 (BInvis + Invis rewrite, 3 call-site predicate swaps, 1 import const).
- Docs: D-2067 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1037.

## Intent vs deliverable

Subject promises: `mhitu.js`'s file-local `Invis()` read only the
`u.Invis` flat (synced solely by the magic-trap toggle), so quaffed
invisibility never set `unotseen` in `wildmiss`; port the real
H/E/blocked idiom plus the `Underwater` flat fixes. Diff actually adds
exactly that: `BInvis()` + rewritten `Invis()`, `!u.Invis`→`!Invis()`
(floating eye), `u.Underwater`→`u.uinwater` (wildmiss),
`!u.Underwater`→`!(u.uinwater|0)` (hitmu). Promise == diff.

## Inventory

- New CLONE: `BInvis` (js/mhitu.js:228); rewritten CLONE: `Invis`
  (js/mhitu.js:243). Both mirror the potion.js/zap.js idiom.
- Changed predicates in `wildmiss`, `passiveum` (floating eye),
  `hitmu`. No signature changes, no deleted symbols (no `sym.mjs`
  re-point check owed); `INVIS` joins the existing `./const.js` import.
- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
  no `fastforward`, no hardcoded coordinates.

## C ↔ JS fidelity

C `Invis` (`youprop.h:195–198`, read directly): `HInvis =
u.uprops[INVIS].intrinsic`, `EInvis = ...extrinsic`, `BInvis =
...blocked`, `Invis = (HInvis||EInvis) && !BInvis`. JS `H =
(u.HInvis|0)||intrinsic`, `E = (u.EInvis|0)||extrinsic`, `&& !BInvis()`
— the flats are a JS split-brain accommodation (quaff writes `HInvis`
+ intrinsic per potion.js `set_HInvis`), and the body is
token-identical to potion.js:651–669 and zap.js:678–697 (verified by
direct read). CLONE, verified — not drift. The mummy-wrapping
`uarmc` stand-in for setworn `w_blocks` is the same named compromise
all three modules share (comment-cited), not new divergence.

C `Underwater` (`youprop.h:279`): `(u.uinwater)`. Both swaps are
verbatim. C `wildmiss` (`mhitu.c:174–261`, via `csym.mjs`):
`unotseen = (!mcansee || (Invis && !perceives))`,
`usubmerged = (Underwater != 0)` — JS now matches all three predicates
in the same order, including the `impossible()` early-return shape
untouched above them. RNG: zero new draws (pure predicates).

Callee closure: `perceives`, `Displaced`, `is_pool`, `MUMMY_WRAPPING`
all pre-existing in-module. No STUB in a live arm. Untouched sibling
`Invis` variants (potion/zap/timeout correct; trap.js flat-biased,
do_wear `Invisible_dw`) are named in the D-log + map as future rows —
correctly not glued (§2b).

## Hallucinations / overclaim

None. The delicate claim — Ranger's `moved → js-throw` label is the
`r.owner || 'js-throw'` null-owner fallback (hidden-proxy.mjs:388,
confirmed by direct read), with replay showing screen-only divergence
(RNG 3881/3881, error null, «butts!» vs «butts!--More--») — is
accurately sourced. No throw occurred; no Must-fix throw row owed.
Correct call: the fallback label alone is not evidence of a throw.

## Density

35 changed lines: one C macro family + three predicate call sites in
one module. Right-sized cluster.

## Verification

D-log Verify bullet: `verify --fn wildmiss` → 0 PASS, 2 moved past
(Healer 186→armoroff@196; Ranger 198→step 200) + green/strict/cohort.
Re-measured myself: `hidden-proxy.mjs verify wildmiss --base
b9138d02~1` → `0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`
with both moves identical to the claim. No WORSE, no vacuous check (2
sessions at baseline, both named). `skip full` justified (single
non-shared module).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
