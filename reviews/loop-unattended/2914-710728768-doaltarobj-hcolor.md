# Review 2914 — 710728768 — doaltarobj via canonical hcolor import

- SHA: `710728768` (doaltarobj cliff writer: D-3640
  clone→import)
- D-entry: D-4076; Ledger: do.c (`doaltarobj` +
  `dosinkring`, +D-4076 tags)
- `js/` diff: `js/do.js` +1/−5 (clone deleted +
  import name); new
  `scripts/doaltarobj-hcolor-draw.test.mjs`

## Intent vs deliverable

Promise: delete do.js's no-draw `hcolor` clone and
import the canonical do_name.js export, so the
Hallu arm draws from hcolors[] on the display
stream; Valkyrie PASS, Samurai 1170→1290. The diff
is exactly the deletion plus the import name.
Promise = diff.

## Inventory

- Deleted: local `hcolor(colorword)` (do.js, was
  `:495–498`, pref passthrough, zero draws). Its
  comment even mis-cited "potion.c" — the deletion
  removes a wrong cite too.
- Import: `hcolor` added to the existing
  `./do_name.js` line — name only, ALREADY edge.
- Call sites untouched: doaltarobj :747, dosinkring
  :3062/:3066 (both ledger-tagged ✓).

Required step-3 paste (`sym.mjs hcolor`):

```text
hcolor           js/do_name.js:356   sync
         !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
           js/detect.js:283  js/sit.js:218
```

The re-point lands on the single LIVE export. The
two remaining clones are named in-commit as
out-of-scope (other C files, D-3640 precedent) —
named omits, not Must-fix.

## C ↔ JS fidelity

Confirmed against pinned C:

- C do_name.c:1460–1466 `hcolor(colorpref):
  (Hallucination || !colorpref) ?
  hcolors[rn2_on_display_rng(SIZE)] : colorpref`.
  Canonical JS (do_name.js:356–361) is the exact
  shape: `Hallucination() || colorpref == null →
  HCOLORS[rn2_on_display_rng(len)]`, else pref
  (empty-string-as-live-pref disclosed).
- C doaltarobj :380–382 `There("is %s flash…",
  an(hcolor(blessed ? NH_AMBER : NH_BLACK))…)` —
  JS :747 `an(hcolor(blessed ? 'amber' :
  'black'))` now draws under Hallu where the
  clone returned the pref («amber»/«black» vs C's
  «dancing»/«bistre» — both hcolors[] entries, so
  the arm direction is proven).
- Non-Hallu output identical by construction
  (pref passthrough both sides); display-RNG-only
  effect, so no game-keystream shift. dosinkring
  arms (:3062/:3066) inherit correctly — same C
  function, same draw, tagged.

## Hallucinations / overclaim

None. The `js-throw` move label is disclosed as
the owner-null fallback; my `show` re-run
confirms `error: null, jsPanic: null`, kind
screen at 1290, RNG 53062/53062 full,
1536/1537 screens, toplines «A moat.» vs «A deep
water.» — exactly as claimed.

## Density

Cliff writer (2 blocked sessions, both resolved:
1 PASS + 1 strictly-later owner). Two `Ledger:`
entries (both touched callers). Full 44/44
in-commit (do.js shared). No unreached work.

## Verification

Re-measure (`--base 710728768~1 --no-reach`):

```text
verify doaltarobj: 1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Valkyrie-50156016: PASS
  scen-sweep-Samurai-49956004: moved → step 1290 (was 1170)
verify hcolor: no corpus session is blocked (vacuous, disclosed)
```

Exact match. No FORCE/DIAG/seed/coords in the
`js/` hunks. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
