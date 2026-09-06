# Review 926 — 423cce10 — light.c obj_adjust_light_radius light-radius singleton (D-1956)

Metadata: SHA `423cce10`, D-1956, `js/light.js` (one function +
one import extension). Reviewer re-ran C locus, callers, sym on both
the new symbol and the re-pointed `xname`, banned grep, and
`hidden-proxy verify --base`.

Intent vs deliverable: subject promises the brighten/dim live
light-source updater. Diff actually adds exported async
`obj_adjust_light_radius(obj, new_radius)` after `del_light_source`
and extends the existing `./objnam.js` import with `xname` (no new
module edge). Promise kept.

Inventory: one new JS function (`obj_adjust_light_radius`,
`js/light.js:94`, ASYNC per `sym.mjs` — `await` required, correctly
awaited at future call sites). One re-pointed symbol: `xname`
(`js/objnam.js:946`, sync — called without await inside the async
body, correct). No clones, no deleted symbols.

C ↔ JS fidelity — against `light.c:825–838` (via `csym.mjs`),
statement-by-statement confirm:

- `for (ls = gl.light_base; ls; ls = ls->next)` → `if (list)` guard
  + `for…of` over `game.light_base`; NULL/empty list falls through
  to `impossible` on both sides. Same.
- `ls->type == LS_OBJECT && ls->id.a_obj == obj` → `ls.type ===
  LS_OBJECT && ls.id === obj` — pointer identity as reference
  identity, first match wins (C assumes one source per object).
  Same short-circuit order.
- `if (new_radius != ls->range) gv.vision_full_recalc = 1;
  ls->range = new_radius; return;` → identical order (`nr !==
  (ls.range | 0)` guard, assign, return). Recalc flag only on real
  change, as in C.
- `impossible("…can't find %s", xname(obj))` → `await
  impossible(\`…can't find ${xname(obj)}\`)` — same message shape;
  async only because JS `impossible` is an async pline (file
  precedent `show_transient_light`). `nr = new_radius | 0` covers
  the C `int` param.

No RNG either side. Sole live C caller `mkobj.c:1713`
(`maybe_adjust_light`, via `--callers`) stays unwired and is named
in the map in this commit with its bless/curse radius sites and
pline envelope — own-row material, correctly not glued here.

Hallucinations / overclaim: none. D-log's callee claims (`xname`
sync import, no new edge, async rationale) all check out via
`sym.mjs`. No dispatch-over-stub shape (leaf function, callee
`xname` is LIVE).

Density: §2b right size — one C function, one module, ~25 lines.
Caller wiring named in-envelope. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs --fn
obj_adjust_light_radius` → PASS syntax/rule2/green/strict/cohort,
explicitly vacuous hidden note with no corpus-PASS claim, plus a
same-range/changed-range/miss-arm probe (PROBE PASS). Reviewer
re-measured: `hidden-proxy verify obj_adjust_light_radius --base
423cce10~1` → "0 session(s) blocked (0 at baseline, 0 in working
scoreboard)". Honest. Diff-body banned grep clean; Rule #2 clean
(extended intra-`js/` import only).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
