# Review 936 — 5b112530 — nhlsel.c l_selection_iterate selection-iterate Lua-C singleton (D-1966)

Metadata: SHA `5b112530`, D-1966, `js/mklev.js` only (export +
guard + contract header; loop body untouched). Reviewer re-ran
the C body (`nhlsel.c:924–957` via `csym.mjs`), the loop body at
HEAD, sym, Rule #2, banned grep, and `hidden-proxy verify
--base`.

Intent vs deliverable: subject promises the exported
`selection_iterate_lua` with the C argc/TFUNCTION arm as a throw
and a full C-contract header. Diff actually adds exactly that;
the loop body is byte-identical to the pre-existing local
helper. Promise kept.

Inventory: one promoted symbol (`selection_iterate_lua`,
`js/mklev.js:2597`, sync per `sym.mjs`). No deleted symbols, no
new import edge (same-module).

C ↔ JS fidelity — against `nhlsel.c:924–957`, arm by arm:

- `argc == 2 && lua_type(L,2) == LUA_TFUNCTION else
  nhl_error("wrong parameters")` → `typeof fn !== 'function'`
  → `throw new Error('l_selection_iterate: wrong parameters')`.
  argc has no JS analogue (positional call); the throw is fatal
  like `nhl_error`, consistent with `find_objtype` precedent.
  `l_selection_check` userdata validation stays a named omit
  (no Lua VM).
- `selection_getbounds` → rect, then `for (y = ly..hy) for (x =
  max(1,lx)..hx) if (selection_getpoint) {...}` → identical
  loop (`sel.ly/hy`, `Math.max(1, sel.lx)`, `pts.has(x,y)`
  guard); bounds-recalc named (JS bounds maintained live by
  `setpoint`).
- `cvt_to_relcoord` per cell → skipped with the
  reviews-791/810 reason (des.* adds the origin back; absolute
  throughout). Pre-blessed skip, re-cited here.
- `nhl_pcall_handle` abort-`goto out` → a throwing callback
  propagates out of both loops naturally; non-throwing callbacks
  run to completion like pcall-success. Equivalent.
- Per-row `lua_gc` → named (no manual GC). Empty-selection
  early return ≡ C's full-map all-false walk (no callback can
  fire either way).

No RNG either side. Pre-existing leniency kept, not introduced:
null/empty `sel` returns silently where C's `l_selection_check`
would error — the `!sel?.pts?.size` line predates this commit;
flagging only as a note, not a C-wrong of this SHA.

Hallucinations / overclaim: none. No dispatch-over-stub shape.

Density: §2b right size — one Lua-C singleton promotion, one
module. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs
--fn l_selection_iterate` → PASS syntax/rule2/green/strict/
cohort/full-44/44, an explicitly vacuous hidden note (row cited
0 blocks, no corpus-PASS claim), plus a /tmp probe (y-outer
order, max(1,lx) floor, empty/null no-op, non-function throws,
singleton-cell visit) PROBE PASS. Reviewer re-measured:
`hidden-proxy verify l_selection_iterate --base 5b112530~1` →
"0 session(s) blocked (0 at baseline, 0 in working
scoreboard)". Honest. Diff-body banned grep clean (only hit is
D-log prose).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
