# Review 1597 — d012b82b — hack.c avoid_trap_andor_region whole-body port (D-2638)

**Metadata:** SHA `d012b82b`, `hack.c` `avoid_trap_andor_region`, D-2638
(+ `mkmaze.c` walkfrom stale park).
JS: `js/hack.js` only (+60/−51 net: 3 clones deleted, 2 live imports,
1 export, 1 prompt-expression fix, per-arm re-cites); new
`scripts/avoid-trap-hallu.test.mjs` (+106, not scored).
No prior review claimed closed.

## Intent vs deliverable

Subject promises: delete three local clones → live imports, fix the
hallucinated trap-prompt C-wrong (`trapname(traptype)` re-rolled the
name on the display RNG instead of naming C's own `rnd` pick),
export `u_locomotion` from C-home, re-cite both arms, committed
headless regression test. Diff delivers exactly that. Promise
matches deliverable.

## Inventory

- Deleted: `upstart_word` (hacklib `upstart` clone), `visible_region_at_xy`
  + `reg_damg` (region.js clones) — net −30 lines.
- Added imports: `upstart` (hacklib.js), `visible_region_at` + `reg_damg`
  (region.js). D-log's `--can hack.js region.js visible_region_at`:
  SAFE (hoisted fn decls, existing 98-module SCC) — re-point justified,
  no new top-level-read risk.
- `u_locomotion` (`js/hack.js:1837`, sync): `function` → `export`
  (behavior unchanged).
- Trap-arm prompt: `trapname(traptype)` → `trapname(traptype, true)`.
- New test file, 2 cases (hallu timeout + sober fixture guard).
- Required `sym.mjs` re-point output (deleted locals → imports):
  `visible_region_at js/region.js:93 sync`;
  `reg_damg js/region.js:85 sync`;
  `upstart js/hacklib.js:200 sync` (8 other-file clones remain,
  untouched, not this commit's scope);
  `u_locomotion js/hack.js:1837 sync` (+ 2 kept clones do.js:549,
  teleport.js:1962, named as other-files-own-rows — no clone #4 added).

## C ↔ JS fidelity

C locus `hack.c:2513–2582` (70 L, via `csym.mjs
avoid_trap_andor_region`; staticfn, callers not re-enumerated —
unchanged call shape). Arm-by-arm confirm:

- Region arm C `:2527–2552`: ParanoidTrap + !Blind/Stunned/Confusion/
  Hallu + m-prefix/run gate + new/old `visible_region_at` pair with
  the damage-escalation condition + `test_move` + upstart cloud
  prompt + decline → nomul/move=0/TRUE. JS matches in C order; the
  only change is clone→live callee, behavior preserved: deleted
  `reg_damg` is line-identical to live region.js:85 (visible/ttl
  guards, `reg.arg | 0`); deleted rect loop ≡ live
  `visible_region_at` (bounding-box precheck + same rect loop —
  box is min/max-expanded from rects, so no outcome difference).
- Trap arm C `:2553–2580`: the C-wrong fix. C rolls once —
  `traptype = rnd(TRAPNUM-1)` under Hallucination — then names it
  directly: `defsyms[trap_to_defsym(traptype)].explanation`, no
  second draw. Old JS called `trapname(traptype)` with override
  unset, whose interior (trap.js:1560, read here) spends a
  `rn2_on_display_rng` draw and can return «whoopie cushion» /
  «imperial fleet» instead of C's pick. New `trapname(traptype,
  true)` skips the hallu interior and returns `TRAP_EXPLANATIONS[t]`
  for the already-picked `t` — the identical expression per the
  dig.js/shk.js/trap.js precedent. Sober path unchanged
  (Hallucination() false skips the interior regardless).
- RNG walk call-for-call: sole C draw is `rnd(TRAPNUM-1)` (hallu
  only); JS keeps `rnd(TRAPNUM - 1)` on the same gate and now spends
  one *fewer* display-RNG draw under hallu — the fix removes the
  extra draw rather than adding one. `u_locomotion('step')`,
  `into_vs_onto`, `immune_to_trap`, `test_move`, `paranoid_query`
  all pre-existing live; untouched.
- Named omits (`u_locomotion` capitalize path + poly fallback C
  `:1817–1829`, hallu flavor split D-1187/D-1493) are map-grade
  deferrals in the same commit — not silent stubs.

## Hallucinations / overclaim

D-log claims the test FAILED pre-fix (hallu: «whoopie cushion» vs
«pit»; sober passed both) and 2/2 post-fix. Post-fix verified here
(`node --test` → 2 pass, 0 fail); pre-fix follows from the diff
(old call cannot pass override, so the interior re-roll fires under
timeout HHallucination). The "C's own rnd pick" framing is exact
per the C line cited. No dispatch-vs-stub overclaim.

## Density

70-line C staticfn, one module, net +9 JS lines + test. The walkfrom
stale park is the sanctioned same-iteration companion. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff added-lines grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`
  in control flow.
- Re-measured: `hidden-proxy.mjs verify avoid_trap_andor_region
  --base d012b82b~1 --reach-all` → `0 session(s) blocked`
  (vacuous-note path, honestly labeled — coverage row, no corpus
  owner) + `smoke 24/24 PASS, 0 regressed → REACH-OK`. Both summary
  lines cited; no REGRESSED session. Matches the D-log's bullet.

## Actionable C-wrongs

None. Clone→live direction correct, prompt expression now C-exact.

Verdict: **ACCEPT**
