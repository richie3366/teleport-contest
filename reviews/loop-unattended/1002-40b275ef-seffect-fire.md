# Review 1002 — 40b275ef — seffect_fire scroll-of-fire port (D-2032)

Metadata: SHA `40b275ef`, D-2032, Open-row port
(fire-scroll writer behind an exercise-attributed row;
1 moved to a later owner). js/ touches `js/read.js`
only (+110/−). No stamp owed.

## Intent vs deliverable

Subject promises: `seffect_fire` in C order (dam
formula, useup+learnscrolltyp up front, null every
arm), confused/underwater/blessed/tower arms,
terminal explode; seffects SCR_FIRE arm with
consumed→1 contract; allowlist + nodisappear. Diff
actually adds: exactly that + 2 new-edge imports and
5 same-edge extensions. Promise == diff. One new
function; no deletes / re-points.

## Inventory

- New JS: `seffect_fire` (static, read.js). Changed:
  `seffects` (SCR_FIRE arm), `doread` (allowlist +
  nodisappear).
- `sym.mjs`: `explode js/explode.js:385 ASYNC`
  (awaited ✓); `burn_away_slime js/timeout.js:1336
  ASYNC` (awaited ✓); `body_part js/polyself.js:416
  sync` (dynamic import, sibling pattern ✓).
  `--can` SAFE claims plausible (hoisted decls,
  runtime-only calls). No STUB / clone / no-op —
  local useup/learnscrolltyp/can_center_cloud reused,
  no clone #2. Named: none (every arm live); the
  pre-existing SCR_TAMING allowlist gap is disclosed
  as a separate row, untouched.

## C ↔ JS fidelity

Against `read.c:1849–1916` + doread/seffects sites:

- dam `(2*(rn1(3,3)+2*cval)+1)/3`: C int-division,
  JS `Math.trunc` — operand provably positive
  (rn1(3,3)∈[3,5], 2*cval≥−2 → ≥3), so identical.
  Drawn before useup, C order ✓.
- useup + `*sobjp=0` → null-on-every-arm;
  `learnscrolltyp` iff !already_known ✓. The
  seffects consumed→1 contract mirrors C `:2290`
  `return sobj ? 0 : 1`, and C doread `:640–645`
  skips learnscroll/useup exactly when seffects is
  nonzero — the "identify/charging pattern" claim
  cites a real contract.
- Confused arm: underwater trickle / Fire_resistance
  shieldeff+seesu+pretty-flames vs unseesu+1hp burn —
  all three sub-arms verbatim incl. pline_The shape
  (zap.js precedent, fine).
- Non-confused underwater vaporizes *without*
  returning, then falls into the terminal explode —
  C control flow preserved (easy to get wrong).
- Blessed: self-ID iff !already_known, dam×5,
  getpos with ignored return + can_center_cloud
  fallback to hero ✓. Tower arm: u_at gate,
  last_msg set (guarded `if (game.iflags)` —
  defensive, always present in practice),
  burn_away_slime ✓. Terminal
  `explode(cc,11,dam,SCROLL_CLASS,EXPL_FIERY)` —
  ZT_SPELL_O_FIRE=11 cited ✓.
- `nodisappear` SCR_FIRE arm matches C `:617–618`
  verbatim.

## Hallucinations / overclaim

None. The alev footnote openly admits the residual
is a *local clone* (Ranger ulevel 12 vs SCROLL alev
9) in the pre-existing explode envelope — disclosed
drift, not hidden. No "Match C" claim over the
resist remainder.

## Density

~110 insertions on a 68-line C function + two
call-site gates — one locus family, one falsifier.
Right-sized.

## Verification

- `imports.mjs --rulecheck`: clean. Diff grep: no
  FORCE/DIAG/getRngLog/fastforward/coords.
- `hidden-proxy verify seffect_fire --base
  40b275ef~1`: **0 blocked at baseline** — vacuous
  as the D-log says ("as row predicts"; the
  scoreboard attributes the row to exercise). The
  D-log satisfies the rule by saying so explicitly
  *and* supplying manual-replay movement evidence.
- Independently re-ran the replay at HEAD:
  `FAIL ... Screen 73/152` (was 66) — the fire
  draws now match and divergence sits strictly
  later, confirming the D-log's 66→73 claim.
- Green + strict ×2, cohort 7/7 per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
