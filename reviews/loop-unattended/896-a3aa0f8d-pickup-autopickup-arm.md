# Review 896 — a3aa0f8d — pickup autopickup arm (D-1926)

Metadata: SHA `a3aa0f8d`, D-1926. Files: `js/pickup.js`
(+263/−~100: exceptions, testobj, autopick, unconscious skip,
tried/picked discipline, shared tail), `js/hack.js` (clone
deleted, −9/+1), `js/options.js` (`regex_match` export, +5).
Map-driven Open row, 0 corpus blocks cited. Next index 896.

Intent vs deliverable: subject promises the autopickup arm
(autopick/autopick_testobj/exceptions, unconscious skip,
shared tail) plus latent C-wrongs in tried/picked accounting
and a hack.js clone removal. The diff delivers exactly that;
nothing else. Promise ≡ diff.

Inventory: new exports `check_autopickup_exceptions`,
`autopick_testobj` (C extern, shared with hack.c
cannot_push); file-local `autopick` (C staticfn shape,
`{n, pick_list}` return instead of out-param); module-static
`autopick_costly` (C's function-static `costly`); `pickup()`
restructured to `else if` arms with one `finally` tail;
`pickup_traditional_floor` return widened to
`{tried, picked}` with its single caller updated
(`sym.mjs` confirms no second caller). `costly_spot` →
`shk.js:761 sync`, `unconscious` → `teleport.js:1682 sync`
(both LIVE). `regex_match` pure export-add, no behavior change.

**C ↔ JS fidelity** (`pickup.c:671-910` via csym): testobj
`:929-965` branch order exact — costly once-per-op, then
thrown/stolen override, dropped reject, exploding reject,
types, exceptions. Types test maps through `oclass_to_sym`
where C does `strchr(otypes, oclass)`; `options.js:1126`
documents JS stores the display-symbol string, so the
verdict is identical by repo convention, not by accident.
`autopick` `:974-1003` keeps the two-pass shape with
`check_costly` TRUE only on the first item of pass 1
(C recomputes `costly` on the same schedule; pass 2 passes
FALSE both sides). Unconscious skip `:684-688` sits before
the encumbrance reset with `prev_decor = STONE`, return 0 —
position-exact. Early-return gates (fainted, nopick/pool,
can_reach_floor, multi/notake) all sit *before* the `try`,
so the `finally` tail covers only the picking arms exactly
like C's fall-through tail `:893-903`. `n_tried = n`
(autopick count, not results) and menu `n_tried =
pickList.length` match `menu_pickup`; ct==1 returns tried
even on res 0. No RNG in any shipped arm either side —
nothing to walk call-for-call. Named in-commit in turns.md:
apelist producer, engulfer minvent chain, PICK_ONE count-N,
full is_pool, safe_qbuf.

Hallucinations / overclaim: none. D-log's "hack→pickup
CHECK, lazy runtime read" is imprecise — the diff adds a
static top-level import, and both new edges (pickup→teleport
too) are genuinely new, not pre-existing. Materially safe
anyway: both bindings are hoisted sync function exports
called at runtime only, no top-level TDZ read; full 44/44
held. Wording nit, not a C-wrong.

Density: ~285 js insertions, one C locus family
(`pickup.c:671-1003`) — dense per §2b, justified.

Verification: re-measured `hidden-proxy verify pickup --base
a3aa0f8d~1` → `0 session(s) blocked on it (0 at baseline, 0
in the working scoreboard)` — vacuous as stated, nothing
owed. `imports.mjs --rulecheck` → Rule #2 clean (HEAD).
D-log gates: green 2/2 + strict ×2, cohort 7/7, full 44/44.
Diff grep: no FORCE/DIAG/seed/coordinate patterns (sole hit
is the commit message quoting its own verify line).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
