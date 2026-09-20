# Review 1631 — 4307ede7 — role.c role_selection_prolog whole-body port (D-2672)

**Metadata:** SHA `4307ede7`, `role.c`
`role_selection_prolog`, D-2672. JS:
`js/player_selection.js` (+92/−0, no new
imports — flags/data/consts already live).
No Must-fix.

## Intent vs deliverable

Subject promises: the five-line prolog as a
line array, windowport-only callers. Diff
delivers one new export, no call-site
changes. Promise matches deliverable.

## Inventory

- `role_selection_prolog`
  (player_selection.js:862, sync, new
  export). Required `sym.mjs`:

```text
role_selection_prolog js/player_selection.js:862   sync
```

Single export, no clones. No helpers added,
none deleted or re-pointed.

## C ↔ JS fidelity

C locus read: `role.c:1724–1812` (89 L via
`csym.mjs`). `csym --callers` confirms **0
references in pinned C** (extern.h decl
only) — callers live in windowport code
outside the pinned tree. Arm-by-arm
confirm, no RNG:

- NEARDATA strings `:1728–1730` ≡ consts.
- `flags.init*` reads `:1734–1737` with `??
  ROLE_NONE` fallback — differs from C only
  when JS fields are `undefined`,
  documented as the options.c `:7193`
  default; harmless for a function with no
  live callers.
- Role-narrowing `:1738–1756` exact
  (human-forces-race, barred-race→RANDOM,
  male/female/align forces); `IndexOkT(c,
  races)` ≡ `c >= 0 && c < races.length`.
- Race-narrowing `:1757–1767` exact incl.
  never-forces-gender `:1766`.
- Five `putstr(where,0,buf)` lines
  `:1771–1811` become a five-string return
  in putstr order — the one deliberate
  interface change, justified: C `where` is
  a windowport winid with no corner-menu
  counterpart. Leaving it unwired invents
  nothing and breaks nothing (threading it
  into `pick_*_menu` would invent calls C
  never makes).
- `"%12s "` ≡ `padStart(12)+' '`;
  `strchr(buf,':')` replace ≡
  slice-to-first-colon; `eos` append ≡ `+=`;
  female replace/slash arms `:1782–1789`
  exact. `assert`s as NDEBUG no-ops is
  correct.
- D-log cites an 11-case /tmp string probe
  ALL PASS (fresh/choosing, plname, female
  replace + slash, orc→chaotic, RANDOM,
  valkyrie→female, samurai→human).

## Hallucinations / overclaim

None. The unwired export is explicitly
reasoned, not silently dropped.

## Density

Whole 86-line C function in one module, +92
lines. Right-sized.

## Verification

D-log Verify PASS with honest 0-blocked
note + smoke REACH-OK. Re-ran
`hidden-proxy.mjs verify
role_selection_prolog --base 4307ede7~1
--reach-all`:

```text
verify role_selection_prolog: baseline 4307ede7~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke role_selection_prolog: no RNG-tagged reach; fixed smoke spread (24 run, 6.3s): 24 PASS, 0 regressed → REACH-OK
```

No REGRESSED. Diff grep: no FORCE / DIAG /
RNG-log / seed / coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
