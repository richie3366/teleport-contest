# Review 1586 — f6b591c3 — o_init.c init_objects whole-body restart (D-2627)

**Metadata:** SHA `f6b591c3`, `o_init.c` `init_objects`, D-2627.
JS: `js/o_init.js` only (+57/−6).

## Intent vs deliverable

Subject promises: the three dropped arms (generic-class panic,
`oc_name_known` sanity+repair loop, `shuffle_tiles` account) plus two
callee sanity arms (`setgemprobs` corrupt-gems guard,
`init_oclass_probs` zero/negative-prob message). Diff delivers all five
plus `raw_printf` / `tty_wait_synch` joins. Promise matches
deliverable.

## Inventory

- `init_objects()` — restarted export, C order with per-arm cites.
- Restored arms in `setgemprobs` / `init_oclass_probs` (same commit,
  same file).
- `raw_printf` + `tty_wait_synch` joined to the existing display.js
  import (both LIVE: `display.js:7884` sync, `:7366` async).
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C locus `o_init.c:150–235` (86 L, via `csym.mjs init_objects`;
callers `allmain.c:783`, `hack.c:4430`, `options.c:7281`-comment).
Full C body read here. Arm-by-arm confirm:

- Bases zero + generic-class panic as throw with the C message
  (`:156–162`; panic→throw per the botl.js compare_blstats precedent —
  JS has no sync abort) — exact.
- Name/descr identity init (`:163–165`), ascending-class walk + GEM
  `setgemprobs(null)` / `randomize_gem_colors` (`:166–192`) — exact.
- NUM_OBJECTS extra entries (`:202`, doclassdisco guard), gap-fill
  inherit-next (`:207–209`) — exact.
- `oc_name_known` loop (`:211–226`): `nmkn` normalize,
  `(!OBJ_DESCR)^nmkn` (OBJ_DESCR ≡ `obj_descr[oc_descr_idx].oc_descr`
  per `objclass.h:190–191`, JS `objectDescrs[oc_descr_idx]`),
  `sanity_check`-gated impossible with verbatim message + arg order,
  repair `nmkn?0:1` — exact.
- `init_oclass_probs()` (`:227`) with the zero/negative arm INCLUDING
  the graceful repair loop (`oc_prob=1`, `sum++`, `:255–260` —
  verified in-file, not just the message) — exact.
- `shuffle_all` (`:230`, pre-existing file-local o_init.js:221) —
  exact.
- `shuffle_tiles` (`:232`) OMIT — correctly so, and stronger than the
  commit states: it is `#ifdef TILES_IN_GLYPHMAP`-only, and that macro
  requires `TTY_TILES_ESCCODES`, which is commented out
  (`config.h:607`) — there is NO live C arm in the unix build, and JS
  has no glyphmap machinery either.
- WAN_NOTHING `rn2(2)` (`:234`) — single RNG call, call-for-call.
- `setgemprobs` corrupt-gems guard (`:70–75`): `raw_printf` live sync,
  `tty_wait_synch` async floated — unreachable on real tables, matches
  the in-file impossible-floating precedent; dlev line untouched,
  D-0893-owned, disclosed.

Caller wiring: the live game-flow caller `allmain.c:783` ("must be
before u_init()") is wired at `allmain.js:753` before role_init/u_init
— exact. `hack.c:4430` sits inside the debug weight-table dumper
`dump_weights` (`sym.mjs`: NOT FOUND in js/ — debug tooling, no
game-flow caller needed); `options.c:7281` is a comment. Export
name/signature kept, so no caller churn.

Callee closure: all LIVE or verified file-local; none named except
the compiled-out `shuffle_tiles`. "Named: shuffle_tiles" accurate.

## Hallucinations / overclaim

None. Every "unreachable on real data" guard claim is C-true (sanity
arms over generated tables).

## Density

86-line C function, one module. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: only the C `rn2(2)` line; 0 `FORCE`/`DIAG`/`getRngLog`/
  `fastforward`/seed/coordinate reads.
- Re-measured: `hidden-proxy.mjs verify init_objects --base
  f6b591c3~1 --reach-all` → `0 session(s) blocked` (vacuous-note path,
  honestly labeled) + `reach 497 baseline-PASS sessions: 497 PASS, 0
  regressed → REACH-OK`. Both summary lines cited — this is the
  strongest corpus signal in the window (every session executes
  init_objects), and it matches the D-log's 497/497 claim exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
