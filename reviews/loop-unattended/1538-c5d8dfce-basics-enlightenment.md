# Review 1538 — c5d8dfce — insight.c basics_enlightenment (D-2579)

## Metadata

- SHA: `c5d8dfce`
- D-id: D-2579. Next index: 1538.
- Files:
  - `js/invent.js` (+97/−40: three shared buf builders, both BASIC
    paths rewired).
  - `scripts/basics-enlightenment.test.mjs` (new pin, 8/8).
- C locus:
  - `nethack-c/upstream/src/insight.c:727–823`
    (`basics_enlightenment`, staticfn; `csym.mjs` range).

## Intent vs deliverable

Subject promises: the missing arms on both split builders
(find_ac/AC_MAX, Upolyd HP + hit dice on ^X, wallet continuation,
shop/apelist autopickup) shared via three C-order builders + a pin
test. Diff delivers that. Promise matches deliverable.

## Inventory

- New, all exported (one per C paragraph):
  - `basics_autopickup_buf` (`:804–822`).
  - `basics_ac_buf` (`:772–777`).
  - `basics_hitdice_buf` (`:756–770`).
  - Both builders (final disclosure + ^X overlay) call all three.
- Callees, all LIVE (each verified via `sym.mjs` this iteration):
  - `find_ac` (u_init.js:1305).
  - `costly_spot` (shk.js:801).
  - `AC_MAX` (const.js:1622).
  - `hidden_gold` (vault.js:100).
  - `Upolyd` (const.js:3184).
- `money_cnt_local` is a pre-existing file-local (see Fidelity note).
- `imports.mjs`: no new edge (all joins extend existing imports).
- No deleted symbols. No STUB in any live arm.

## C ↔ JS fidelity

Walked against C `:727–823` (separator/headers untouched, out of the
claimed arms):

- HP: `Upolyd ? mh/mhmax : uhp/uhpmax` + `< 0 → 0` clamp on the overlay
  (was `uhp`-only, unclamped). Match. (C never clamps hpmax; neither
  does JS.)
- Hit-dice 0/1/default switch factored verbatim, now on both paths
  (was overlay-missing). Match.
- `find_ac()` before the `uac` read on both paths (was neither), with
  `abs == AC_MAX → ", the best/worst possible"`. Match.
- Overlay wallet rebuilt (was first-match gold sum, no continuation):
  - `money_cnt_local()` + `hidden_gold(0)` (final=0 → "is", matching C
    `!final`). Match.
  - `.` / `, but` / `, and` terminator. Match.
  - Own-line `stashed away` continuation with more/currency. Match.
- Final builder already carried `hidden_gold(!!final)`
  (`js/invent.js:5529`) — i.e. C `hidden_gold(final)` — confirmed here,
  so the two paths now differ exactly where C's `final` differs.
- Autopickup, all four previously deferred arms:
  - `on` + shop-disable (suppresses even pickup_thrown). Match.
  - `for 'ocl'` vs `all types` (`oc_to_str` → JS pickup_types already
    a string; named, correct). Match.
  - `plus thrown` only when ocl non-empty. Match.
  - `, with exceptions` on `apelist != null` (= C pointer check; no
    producer sets it yet — named). Match.
  - `off`. Match.
- The D-2564 map line that over-claimed two of these arms as landed is
  corrected by this commit per the subject — called out, not repeated.

One disclosed pre-existing divergence (D-log Named, correctly not
Must-fix):

- C `money_cnt` (`hack.c:4513–4522`, read here) returns the FIRST coin
  stack's quan; `money_cnt_local()` sums all coin stacks. Equal under
  the gold-merge invariant (D-0002), divergent only with two
  simultaneous gold stacks. The helper predates this commit (already
  used by the final builder), so this is disclosure, not a new
  C-wrong. No queue row owed from this SHA.

## Hallucinations / overclaim

None — the map over-claim is called out and corrected, not repeated.

## Density

~97 `js/` insertions for four missing arms across two builders + pin
test — right size (§2b).

## Verification

- D-log claims VERIFY PASS (coverage row, 0 blocked at baseline).
- Re-ran here (required):
  - `hidden-proxy verify basics_enlightenment --base c5d8dfce~1
    --reach-all`
  - → 0 blocked both sides (vacuous note, expected)
  - → smoke 24/24 REACH-OK.
- New pin `scripts/basics-enlightenment.test.mjs` runs clean here too
  (8/8 per subject; re-ran: pass).
- No RNG in the function.
- Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward` content.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
