# Review 2017 — 1483a276d — zap.c wish_history_menu pick body

Metadata: SHA `1483a276d`, D-3057, js/zap.js (+53/−~12).
Single-function completion of D-3056's `partial` (gate was wired,
pick body named-omitted).

## Intent vs deliverable

Subject promises "picker + makewish return wiring". Diff actually
restarts `wish_history_menu` whole as `async` returning the pick,
adds the options.js `select_menu_pick_one` edge, and rewires makewish
to `buf = mungspaces(await wish_history_menu(buf))` (fixing the
D-3056 menu-arm mungspaces micro-gap noted in Review 2016). Matches
promise.

## Inventory

- `wish_history_menu` (restarted export js/zap.js:7244, now async) —
  C zap.c:6273–6309 (csym range; body :6275–6309, `#ifdef DEBUG`).
- makewish call-site rework (js/zap.js:7306) — C :6334–6339.
- New import edge zap.js → options.js (`select_menu_pick_one`).
- No deleted symbols, no clone→import re-points.

## C ↔ JS fidelity

Ring walk vs C `:6287–6296`: `i = 19..0`, `idx =
(wish_idx + i) % 20`, null skip, `a_int = i + 1` ✓ verbatim
(MAX_WISH_HISTORY = 20 file-local const js/zap.js:7199, matching C's
file-local `#define`, zap.c:6221 — sym.mjs does not index that const
form, verified by grep). Window lifecycle (`create_nhwindow` /
`start_menu` / `zeroany` / `destroy_nhwindow`) folded into the live
PICK_ONE picker — picker-modelled, disclosed in the D-log; same shape
as the artifact.js portal menu precedent. `end_menu "Wish what?"`
prompt as non-selectable header rows — cosmetic modelling, disclosed;
the picker (js/options.js:7440) assigns selectors only to
`selectable` items, so headers are inert ✓. Pick remap vs C
`:6301–6307`: cancel/empty (`npick <= 0`) → buf unchanged = JS
returns `orig` ✓; `i = a_int − 1`, idx recompute, null recheck,
return `hist[idx]` ✓ verbatim. JS-strings-immutable return-value
adaptation is the only structural delta, and the sole C caller
(makewish :6335, confirmed sole via csym --callers) is rewired to
assign it ✓. No other JS callers of the old sync no-op (grep clean),
so sync→async breaks nothing. Zero RNG both sides. makewish now
mungspaces both arms per C `:6339` ✓ — Review 2016's nit is gone.
Callees: `select_menu_pick_one` LIVE (js/options.js:7440, async,
awaited); window/any/destroy picker-modelled. Verdict: exact.

sym.mjs: `select_menu_pick_one js/options.js:7440 ASYNC`. The D-log's
`--can zap.js options.js SAFE` claim is load-bearing only at runtime
(the import is used inside the async body, never at module top level),
and the tree loads (rulecheck + green in the verify line). No TDZ
read possible on this edge.

## Hallucinations / overclaim

None. "Every arm ported, every callee live or picker-modelled" is
accurate — the window-lifecycle fold is named, not hidden. The /tmp
probe claim (empty-ring/missing-history/caller-awaited) describes
exactly the three guard arms present in the diff.

## Density

One 23-line C function, ~53 `js/` insertions — under the 200-line
breadth target, but this is the completion half of a D-3056/D-3057
pair (the head's zap.c closure held nothing more Open), with its own
Ledger entry (`wish_history_menu ported`) and Verify line. Right-sized
as a finishing step; flagging no density issue.

## Verification

Re-measured (`hidden-proxy.mjs verify wish_history_menu --base
1483a276d~1 --reach-all`): "0 session(s) blocked" + "no RNG-tagged
reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK"
— matches the D-log bullet exactly, honestly vacuous (row cited 0
blocks). No REGRESSED session. Diff grep for FORCE/DIAG/getRngLog/
fastforward: hits only in CURRENT.md "Do not" boilerplate. No
seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
