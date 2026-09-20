# Review 1613 — 2a7efc6b — mkobj.c check_contained whole-body port (D-2654)

**Metadata:** SHA `2a7efc6b`, `mkobj.c` `check_contained`, D-2654.
JS: `js/mkobj.js` (+54: `Has_contents` import + exported
`async check_contained`). No prior review claimed closed (review
1479 ACCEPT named the callers as unported with a wire-up-on-ship
rule — honored here).

## Intent vs deliverable

Subject promises: whole-body port, C order, per-arm `:line`
cites, live `js/mkobj.js` export. Diff delivers exactly that:
one new exported async function plus one import line. Promise
matches deliverable.

## Inventory

- `check_contained(container, mesg)` (mkobj.js:1640, async,
  exported) — C `mkobj.c:3373–3416` (44 L, staticfn).
- No new helpers; no deleted symbols; no clone→import re-point
  (`sym.mjs` paste not required — nothing deleted or re-pointed).

## C ↔ JS fidelity

C locus read in full (`csym.mjs check_contained` → `:3373–3416`)
plus callers (`--callers`: decl `:26`, call sites `:3051`
`objlist_sanity`, `:3226` `mon_obj_sanity`, self `:3413`).
No RNG either side. Branch-by-branch confirm:

- `:3380` `Has_contents` early return ≡ `if
  (!Has_contents(container)) return` ✓ (import joins const.js,
  `--can` ALREADY — no new edge).
- `:3384–3386` `strstri(mesg,"contained")` prefix gate ≡ C
  (mesgbuf[40] stack-overflow truncation unmodeled — degenerate,
  C never overflows it on real callers).
- Loop `container->cobj → nobj` ≡ `container.cobj / obj.nobj` ✓.
- `:3390` direct-cycle `panic` → loud `throw` with the C
  message verbatim ✓ (house precedent, dealloc_obj).
- `:3392` wrong-where → `insane_object(obj, OFMT0_SANITY,
  mesg, null)`: `OFMT0_SANITY` is byte-equal `'%s obj %s %s:
  %s'` (mkobj.js:1594) to the C literal, `null` ≡ `(struct
  monst *) 0`, and `insane_object(obj, fmt, mesg, mon)` is the
  live same-file export (`sym.mjs`: mkobj.js:1604 async) ✓.
- `:3394–3398` wrong-owner → `impossible` with the three
  `fmt_ptr` identities ✓ (`impossible` live display.js:8055
  async; `fmt_ptr` live same-file :1588 sync).
- `:3399–3400` globby → awaited file-local `check_glob`:
  verified CLONE of C `:3419–3443` here (predicates,
  `glob %d,quan=%ld,owt=%u` format, `strsubst " obj "`,
  MINVENT-carrier ternary all exact; `#if 0` weight-multiple
  arm correctly excluded as uncompiled; `quan ?? 1` is the
  documented JS-unset convention) ✓.
- `:3401` `Has_contents(obj)` nested gate ✓; `:3404`
  holds-parent `panic` → loud `throw`, C message ✓.
- `:3408–3410` `Strcpy(nestedmesg,"nested ")` + `copynchars`
  (n = 120−7−1 = 112, newline-stop per hacklib.c:287) ≡
  `'nested ' + String(mesg).split('\n')[0].slice(0, 112)` ✓
  (order-equivalent: split-then-slice == copy-up-to-newline-capped-at-112).
- `:3413` self-recursion awaited ✓. No second `copynchars`
  clone (inline only; topten.js:44 untouched) — right call.
- OMITs named with C cites: caller wiring `objlist_sanity`
  `:3051` + `mon_obj_sanity` `:3226` (unported, own rows —
  review-1479 rule); `copynchars` export; `panic` abort;
  `eos`/`Strcpy` string ops. Callee closure: every arm callee
  LIVE or verified CLONE — no STUB in a live arm.

## Hallucinations / overclaim

None. "Async only because the three report callees can reach
--More--" is accurate (all three are async exports). No
dispatch-over-stub.

## Density

Breadth phase: 54-line export for a 44 L C function + import —
one function family, right-sized.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 · hidden note
0 blocked · REACH smoke 24/24 · green · strict · cohort 7/7).
Re-measured here: `hidden-proxy.mjs verify check_contained
--base 2a7efc6b~1 --reach-all` → 0 blocked at baseline and
working tree (vacuous note quoted verbatim, correctly
labeled as a coverage row) + smoke 24/24 PASS, 0 regressed →
REACH-OK. Claim true. Diff grep: no FORCE/DIAG/getRngLog/
seed/coordinates/fastforward. `imports.mjs --rulecheck`:
Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
