# Review 1432 — 34ef28ed — retouch_object whole-body port (D-2473)

Metadata: SHA `34ef28ed`, `js/artifact.js` (+125/−17 restart) +
`js/apply.js` (+8/−1 wire). C `artifact.c:2505–2591` (87 L; the
D-log cites `:2508–2591`, +3 drift — cosmetic). D-log: D-2473.

## Intent vs deliverable

Promise: whole `retouch_object` restart in C order (Bell rite,
silver/bane damage, unwear rescan, loseit drop) + the doapply
caller wire. Diff ships that. No second subsystem.

## Inventory

- Rewrote: `export async function retouch_object(obj, loseit)`
  (C global — exported correctly; `*objp` nulling is
  reference-local, sound: every live caller returns on 0 without
  touching obj, and return-1 paths never null).
- Added: `BELL_OF_OPENING` const (= 263, verified against
  `objectNames`), file-local `Levitation()` (H/E/B idiom, do.js/
  dig.js precedent).
- Wired: `apply.js` doapply `if (!(await retouch_object(obj,
  false))) return true` (= C `:4230` ECMD_TIME; `true` is truthy
  = takes time, matching the file's `tookTime` consumer).
  Pre-existing wires confirmed live: doinvoke (`artifact.js:2183`),
  dowear (`do_wear.js:2700`), doeat (`eat.js:4125`), dowield
  (`wield.js:455`).
- `sym.mjs` (required): `touch_blasted` resolves to the
  module-level `let` (`artifact.js:371`, C static — sym doesn't
  index `let`, no ReferenceError; reset/set in `touch_artifact`
  flank this read). `bane_applies`/`Hate_silver_hero` are
  pre-existing file-locals. `remove_worn_item` is the LIVE async
  steal.js export (`--can`: ALREADY edge, awaited).
  `hitfloor`/`dropx` LIVE async (awaited), `surface` LIVE sync.

## C ↔ JS fidelity

- Bell arm: otyp + `invocation_pos`/`On_stairs` (live hack.js) →
  `return 1` — exact.
- `touch_artifact(obj, youmonst)` gate; ag (SILVER +
  `Hate_silver_hero()`) and bane evaluated together with the
  `!ag && !bane → 1` early out — exact.
- `You_cant('handle %s%s!', …)` via the variadic (post-D-2471)
  path with real args — formats correctly (arg-side data stays
  verbatim through the `%s` arm).
- `!touch_blasted` damage: silver ring/wand killer labels,
  `maybe_half_phys(rnd(10))` + `rnd(10)`, `losehp` KILLED_BY +
  `finish_maybe_wail`/`finish_losehp_done` fatal drain (in-file
  touch_artifact idiom) then `exercise(A_CON, FALSE)` — exact,
  RNG in C order.
- Unwear: `remove_worn_item(obj, FALSE)` + array-`includes`
  rescan — the correct house idiom (`invent.js:369`
  array-model; cf. the 1429 finding for the wrong idiom).
- Loseit: Levitation → freeinv/hitfloor, else altar-gated pline +
  dropx, null, `return 0` — exact. One note: the altar-gated
  `pline(\`${Tobjnam(…)} …\`)` interpolates runtime text into a
  single-arg pline — same re-scan family as the queued vpline
  Must-fix (review 1430 row covers this audit class; no new row).
- Sole unwired chain `untouchable`/`retouch_equipment` (C
  staticfns; `loseit=TRUE` only reachable through it) named in
  map + code — not a miss.

## Hallucinations / overclaim

None material. The +3 C-line drift in citations is cosmetic.

## Density

One 87-line C function restarted + one-line wire, two modules:
right-sized.

## Verification

- `hidden-proxy verify retouch_object --base 34ef28ed~1
  --reach-all` (re-run): 0 blocked both sides — vacuous, as the
  D-log states. Smoke 24/24 → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward.

## Actionable C-wrongs

None (the Tobjnam-pline note folds into the existing 1430
Must-fix audit).

Verdict: **ACCEPT**
