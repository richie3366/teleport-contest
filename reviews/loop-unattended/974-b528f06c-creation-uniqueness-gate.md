# Review 974 — b528f06c — create_particular_creation uniqueness gate (D-2004)

Metadata: SHA `b528f06c`, D-2004, Open-row port (`read.c`
`create_particular_creation`; row cited 6 sessions incl.
scen-death-Valkyrie-92229 step 14). js/ touches 1 file
(`js/read.js`, gate arm + doppelganger fixup + same-edge import
extensions). No stamp owed.

## Intent vs deliverable

Subject promises: `firstchoice` capture, `{ mtype }` box through
live `cant_revive` with the `PM_LONG_WORM_TAIL` prompt exemption,
`await y_n("Creating … instead; force …?")` restoring on `'y'`,
and loop-end `await newcham` under the exact C triple condition.
Diff actually adds: exactly those two arms plus `PM_LONG_WORM_TAIL`
const and four same-edge import extensions. Promise == diff.

## Inventory

- Changed JS function: `create_particular_creation` only (parse arm
  from D-2003 untouched).
- New helpers: `PM_LONG_WORM_TAIL` const (`monsterNames.indexOf`
  idiom, matches adjacent `PM_WIZARD`). No deleted symbols — no
  `sym.mjs` delete audit required; resolutions below informational:
  `cant_revive` `js/zap.js:2765` sync, `y_n` `js/getline.js:1531`
  sync-declared, `newcham` `js/makemon.js:1551` sync-declared,
  `NO_NC_FLAGS` `js/const.js:1939` export const.
- No STUB added; deferred remainder re-named in the header comment
  (quan-limit, randmonst/monclass, post-flags, tame/peaceful/hostile).

## C ↔ JS fidelity

C locus: `read.c:3260–3274` (gate) and `read.c:3350–3354`
(fixup), both read verbatim via `csym.mjs` (`create_particular_creation`
`:3251–3357`).

- Gate (`:3260–3272`): `firstchoice = d->which` under
  `!d->randmonst` — JS early-returns on `randmonst` first
  (pre-existing named omit, context line), then captures
  `firstchoice`. ✓ `cant_revive(&d->which, FALSE, NULL) &&
  firstchoice != PM_LONG_WORM_TAIL` — JS boxes `{ mtype }`,
  passes `(box, false, null)`, same conjunction. The box
  convention matches the callee (`zap.js:2766` reads/mutates
  `box.mtype`), and its three arms match C `read.c:3111–3134`
  guard-for-guard (zombie / worm / doppelganger). On this path
  `from_obj` is null on both sides, so the callee's
  `OMONST`-vs-`has_omonst` wording (pre-existing, shared with the
  resist edge) short-circuits identically — not this SHA's debt. ✓
- Prompt (`:3267–3269`): `Sprintf "Creating %s instead; force
  %s?"` with `pmnames[NEUTRAL]` of remap then request — JS
  template identical, `?.[NEUTRAL]` idiom pre-existing in this
  file (`read.js:2150,2196,2306`). `y_n(buf) == 'y'` → restore —
  JS `(await y_n(...)) === 'y'` (await binds tighter than `===`;
  harmless on a sync return, correct on a promise; steed.js D-2000
  precedent). ✓ Worm-tail silent remap (no prompt, `d.which`
  rewritten from the box either way) mirrors C exactly. ✓
- Fixup (`:3350–3354`): triple condition
  `cham != NON_PM && firstchoice != NON_PM && cham !=
  firstchoice` — JS identical with short-circuit `&&` before
  `mons(firstchoice)`. `cham` is an established species-index
  field (mcastu/mhitm read it the same way), and `makemon.js:2929`
  inits `mtmp.cham = NON_PM`, so the arm fires only for real
  shapeshifters as in C. ✓ `await` on sync-declared `newcham`
  is a no-op wrapper (mhitm.js:2542 precedent). ✓ No RNG in
  either arm on either side. ✓
- Callee closure: all four imports extend **existing** same-file
  edges (`cant_revive`→zap.js `resist` edge, `y_n`→getline.js
  `getlin` edge, `newcham`→makemon.js `makemon` edge) — no new
  module cycle risk, no `--can` needed. Every shipped arm's
  callees LIVE. ✓

## Hallucinations / overclaim

None. "10 moved past" lists each session's new owner at a later
step; my re-run reproduces the identical summary line.

## Density

One C function, two arms, one file. Right-sized.

## Verification

Re-measured myself: `hidden-proxy verify create_particular_creation
--base b528f06c~1` → `0 PASS, 10 moved past, 0 unchanged, 0 worse
→ PROGRESS`, tail lines identical to the D-log (92063
castmu@124, 92067 newmonhp@133, 92060 tipcontainer@55). Every move
is to a strictly later step — genuine forward motion, not
sideways churn. Plus cited green 2/2 + strict ×2, cohort 7/7.
Grep of the js hunk: no `FORCE`/`DIAG`/`getRngLog`/seed/
coordinate/`fastforward`. Rule #2 clean (re-ran this iteration).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
