# Review 938 — 88050324 — mkmaze.c maybe_adjust_hero_bubble water-level hero-bubble adjust (D-1968)

Metadata: SHA `88050324`, D-1968, `js/mklev.js` (new export +
`movebubbles` hero-membership scan) + 1 wiring block in
`js/cmd.js`. Reviewer re-ran the C bodies (`mkmaze.c:1928–1941`,
`:1555–1631` at HEAD), the `hack.c:2695–2705` call site, sym,
the `--can` edge, Rule #2, banned grep, and `hidden-proxy
verify --base`.

Intent vs deliverable: subject promises the exported steer in C
short-circuit order, a `movebubbles` hero_bubble tracker
mirroring the cons-pickup scan, and domove wiring on the
RUSH|WALK gate. Diff actually adds all three. Promise kept.

Inventory: one new function (`maybe_adjust_hero_bubble`,
`js/mklev.js:16183`, sync per `sym.mjs` — correct, C draws at
most one `rn2(2)` from the sync core stream). One extended
`movebubbles` block (reset + scan). One wiring block in
`cmd.js` `domove` finally. `--can`: ALREADY, no new edge.

C ↔ JS fidelity:

- Steer (`:1928–1941` via `csym.mjs`): `Is_waterlevel → u.dx/
  u.dy → hero_bubble && !rn2(2) → dx/dy assign` — identical
  short-circuit order, so the single RNG draw fires exactly
  when C fires it. Untriggered paths are stream-identical.
- Tracker: C resets `hero_bubble = NULL` unconditionally at
  `:1559`, then the cons-pickup loop (`:1569`, `up ? bbubbles :
  ebubbles`, `next : prev`) records `hero_bubble = b` at
  `:1631` under `!u.uswallow && u_at(x,y)` — last overlapping
  match wins. JS: unconditional `g.hero_bubble = null`, then
  under `Is_waterlevel && !uswallow` the same pre-toggle
  direction scan (`upOld`, verified placed before the
  `:16110` toggle) testing bitmap containment of (ux,uy) with
  `bm[j+2] & (1<<i)` — per-bubble single test ≡ C's per-cell
  `u_at` walk (hero occupies one cell; each containing bubble
  matches once; overwrite = last wins). The extra
  range guards are unreachable-but-harmless (C's loop bounds
  guarantee them). Cons pickup/deposit itself stays a named
  omit — tracking only membership is the honest minimum the
  steer needs.
- Wiring: C `hack.c:2702–2705` calls smudge then bubble-adjust
  inside one `domove_succeeded & (RUSH|WALK)` gate. JS finally
  block: smudge first, then the same gate for
  `maybe_adjust_hero_bubble()`, independent of smudgeCoords.
  Same order, same gate (neither smudge nor the gate draws
  RNG, so no stream risk either way).

Hallucinations / overclaim: none. No dispatch-over-stub shape.

Density: §2b right size — one steer + its tracker + one wiring
block, two modules already linked. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs
--fn maybe_adjust_hero_bubble` → PASS syntax/rule2/green/
strict/cohort/full-44/44, an explicitly vacuous hidden note
(row cited 0 blocks, no corpus-PASS claim), plus a /tmp probe
(three no-draw arms, exactly-one-`rn2(2)` steer, tracker
set/reset) PROBE PASS. Reviewer re-measured: `hidden-proxy
verify maybe_adjust_hero_bubble --base 88050324~1` → "0
session(s) blocked (0 at baseline, 0 in working scoreboard)".
Honest. Diff-body banned grep clean (only D-log prose hits).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
