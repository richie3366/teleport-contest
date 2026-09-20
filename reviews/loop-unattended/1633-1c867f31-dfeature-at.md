# Review 1633 — 1c867f31 — invent.c dfeature_at whole-body port (D-2674)

**Metadata:** SHA `1c867f31`, `invent.c`
`dfeature_at`, D-2674. JS: `js/invent.js`
only (+141/−53). No Must-fix.

## Intent vs deliverable

Subject promises: the whole body
(throne/lava/ice/pool/drawbridge/altar
arms; invented STAIRS arm removed). Diff
restarts `dfeature_at` in C order, adds the
`look_here` Underwater/article arms, and
deletes the non-C STAIRS fallback. Promise
matches deliverable.

## Inventory

- Restarted `dfeature_at` (now `(x, y,
  buf)`); new JS-only `dfeatureExplanation`
  literal table; touched `look_here`
  article + Underwater arms.
- 5 new import names, all resolved LIVE via
  `sym.mjs`: `is_drawbridge_wall`
  (js/dbridge.js:135), `ice_descr`
  (js/trap.js:2825), `is_pool`/`is_lava`
  (js/hack.js), `is_ice` (js/zap.js),
  `a_gname_at` (js/pray.js:2046),
  `Amask2align` (js/const.js:305),
  `align_str` pre-imported (js/invent.js:316).
  (`is_ice`/`align_str` have pre-existing
  clones elsewhere, untouched.)
- No deleted exports.

## C ↔ JS fidelity

C locus: `invent.c:4035–4099` (65 L via
`csym.mjs`). Arm-for-arm, order-for-order
confirm, no RNG:

- `stway` hoist `:4042`, door switch
  `:4048–4061` (D_BROKEN literal, cmap −1),
  drawbridge override `:4063–4065`,
  fountain/throne/lava/ice/pool/sink chain
  `:4066–4076`, altar Sprintf `:4078–4083`,
  stway/DRAWBRIDGE_DOWN/DBWALL/grave/TREE/
  IRONBARS `:4084–4094`, `cmap>=0 →
  defsyms[cmap].explanation` `:4097`,
  `Strcpy` `:4099`.
- `dfeatureExplanation` literals
  cross-checked against the C comments
  (doorway/open door/closed door/fountain/
  opulent throne/molten lava/sink/lowered +
  raised drawbridge/grave/tree) — all exact;
  a literal stand-in for the absent defsyms
  table, not a behavior clone.
- `a_gname()` ≡ `a_gname_at(u.ux,u.uy)`
  verified verbatim at C `pray.c:2506–2510`.
- Removed `ltyp===STAIRS` arm was indeed
  invented (no such case in C).
  `IS_DOOR` alone matches C (old `|| DOOR`
  redundant).
- `(x,y,buf)` with optional `buf` is
  backward-compatible: both JS callers
  (invent.js:7880, pickup.js:971) use the
  return, matching C's two call sites
  (`invent.c:4181`, `pickup.c:377`) — none
  unwired.
- `look_here` Underwater pool suppression
  matches C `:4181–4183` exactly.
- Article arms: C first-space
  `strcmpi(p," ice")` vs JS `/ ice$/i` —
  verified equivalent on the reachable value
  set (C `pager.c:613–650` icetyp words are
  all single; waterbody is `ice` or `frozen
  <liquid>`, the latter caught by the
  `frozen ` prefix arm both sides).
- Iron-bars article behavior is
  pre-existing, untouched — out of scope.

## Hallucinations / overclaim

None.

## Density

Whole 65-line C function + two caller arms,
one module. Right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify dfeature_at
--base 1c867f31~1 --reach-all`:

```text
verify dfeature_at: baseline 1c867f31~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke dfeature_at: no RNG-tagged reach; fixed smoke spread (24 run, 6.3s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log's honest 0-blocked note.
No REGRESSED. Diff grep: no FORCE / DIAG /
RNG-log / seed / coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
