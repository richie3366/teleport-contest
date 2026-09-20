# Review 1605 — d2132aa7 — objnam.c singplur_lookup singular arms (D-2646)

**Metadata:** SHA `d2132aa7`, `objnam.c` `singplur_lookup` singular arms,
D-2646. JS: `js/objnam.js` (+31/−5, all inside `makesingular` + doc
comment). No prior review claimed closed.

## Intent vs deliverable

Subject promises: three missing singular keep-arms (craft `:2732`,
slice/mongoose `:2736–2743`, badman-men `:2758–2762`) inserted in C
order between special_subjs and one_off-reverse, plus gating the later
`men→man` on `!badman` per `:3137–3140`. Diff delivers exactly that.
Promise matches deliverable.

## Inventory

- `makesingular`: craft-suffix keep, whole-word slice/mongoose keep,
  `*men`+badman keep, `men→man` now `!badman`-gated. Doc `Named
  omissions` updated (pronoun block, ia→ium own row, Strcasecpy).
- No new functions, no new imports, no deleted symbols, no caller
  rewiring (C callers `objnam.c:2912` makeplural / `:3076`
  makesingular already dispatch through the live JS split).

## C ↔ JS fidelity

C loci read here: `singplur_lookup objnam.c:2707–2779` (73 L),
`badman :3193–3239` (47 L), makesingular men arm `:3137–3140`,
callers (`--callers`: decl `:43`, `:2912`, `:3076`). No RNG either
side. Arm-by-arm confirm:

- Craft: C `(baselen > 5) && !BSTRCMPI(end-5, "craft")` → keep ≡ JS
  `bp.length > 5 && eqCI(last5)` → keep ✓ (bare "craft" len 5 falls
  through both sides).
- Slice/mongoose: C whole-string `strcmpi` (not suffix) → in the
  singular direction bare `return TRUE` (keep) ≡ JS `eqCI(bp, …)` →
  keep ✓. Placement before one_off-reverse kills the `lice→slouse`
  false hit exactly as C's comment intends ✓.
- Men keep: C `baselen > 2 && !strcmpi(end-3, "men") &&
  badman(basestr, FALSE)` → keep ≡ JS same three conjuncts ✓.
- `men→man` gate: C `:3137–3140` `!BSTRCMPI(bp, p-3, "men") &&
  !badman(bp, FALSE)` → `Strcasecpy(p-2, "an")` ≡ JS `!badman`
  addition on the pre-existing arm ✓ (mirrors C's redundant
  double-check, as the message says).
- Order: inserted arms sit between special_subjs and one_off-reverse,
  mirroring C's internal order (craft → slice → men → one_off) ✓.
- `badman` classification: **`sym.mjs badman` → NOT EXPORTED, one
  LOCAL CLONE at js/objnam.js:2099** — the subject's "via live
  `badman`" is message-level overclaim (see below). The clone itself
  is verified: C `badman` is `staticfn`, so a file-local port is the
  correct architecture; body matches (both prefix tables, `< 4`
  guard, `spot = end − (al+3)` with below-base skip ≡ BSTRNCMPI, the
  `spot == base || *(spot−1) == ' '` gate) ✓. Verified CLONE, no
  drift. `eqCI` in-file tail, no new edge ✓.

## Hallucinations / overclaim

One, message-only: "via live `badman(bp, false)`" — `badman` is a
local clone, not a live export (`sym.mjs` output pasted in this
review per Method §3). Code direction is correct (C staticfn), so
this is not a C-wrong and files no Must-fix; but the D-log/JOURNAL
should say "clone", not "live".

## Density

Breadth phase: 31 insertions closing three named-missing arms plus
the guard bug (`slice→slouse`, `specimen→speciman`). Small diff
because C is small — above the ~40-line heuristic only by the
bug-fix content; acceptable, no second subsystem touched.

## Verification

D-log Verify bullet claims PASS + smoke REACH-OK + probe 22/22.
Re-measured here: `hidden-proxy.mjs verify singplur_lookup --base
d2132aa7~1 --reach-all` → 0 blocked both sides (vacuous note quoted
verbatim, correctly labeled) + smoke 24/24 REACH-OK, no REGRESSED.
Claim true. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates/
fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
