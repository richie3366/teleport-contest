# Review 1245 — 03e14d51 — light.c obj_split_light_source lit-stack split

- SHA: `03e14d51` — "`light.c` obj_split_light_source: light-source split
  on stack split (D-2279)"
- D-log: D-2279. Queue row: `light.c` obj_split_light_source
  (copy_oextra-envelope residual, live Open row). Row cited 0 blocks.
- Character: new-function port + caller wiring + doc-only retire, no
  corpus divergence.

## Intent vs deliverable

Subject promises: new `obj_split_light_source(src, dest)` export in
`js/timeout.js` in C position, wired into `splitobj` behind the C gate in
C position, `use_candle` doc omit retired. Diff actually does exactly
that: +29 in `timeout.js`, one import token + two call lines in
`mkobj.js`, two doc lines in `apply.js` (comment-only, no behavior).
Promise matches diff exactly.

## Inventory

- Added JS: `obj_split_light_source` (`js/timeout.js`, now `:1596` per
  `sym.mjs`, sync), directly before `obj_merge_light_sources`.
- Wiring: `if (obj_sheds_light(obj)) obj_split_light_source(obj, otmp)`
  after `obj_split_timers` in `splitobj` — C order (`mkobj.c:498–501`).
- `js/apply.js`: doc comment only (drops the stale omit line, notes the
  `splitobj` path). Zero code change there.
- Required `sym.mjs` output: `obj_split_light_source js/timeout.js:1596
  sync` — pasted, confirmed. Single definition, zero clones.
- Required `--can` output: `ALREADY: mkobj.js already statically imports
  timeout.js.` — pasted, confirmed. No new edge, call-time use only.

## C ↔ JS fidelity

C locus `light.c:778–803` (26 lines, via `csym.mjs`; D-log cites `:779`,
same body). Arm-by-arm:

1. Walk `gl.light_base`, match `type == LS_OBJECT && id == src`. JS walks
   `game.light_base`, matches `ls.type === LS_OBJECT && ls.id === src`.
   (JS compares object identity where C compares pointers — same
   semantics in this codebase's model.) ✓
2. Head-insert per match with the C walk-safety comment ("already past
   the insertion point"). JS iterates `list.slice()` and `unshift`s per
   match — last match ends at head on both sides, identical final order. ✓
3. Struct copy `*new_ls = *ls`. JS `{ ...ls }` spread (x/y/range/flags). ✓
4. Candle arm: recompute **both** ranges post-split (`candle_light_range`
   on src and dest — correct because `splitobj` already reduced
   `obj.quan` before the call on both sides) + `vision_full_recalc = 1`.
   JS identical, gated on `Is_candle(src)`; non-candle path copies with no
   recalc, both sides. ✓
5. `new_ls->id = dest; dest->lamplit = 1` per match, inside the `if`. JS
   sets `new_ls.id = dest` + `dest.lamplit = 1` inside the loop. ✓
6. Pre-state: C zeroes `otmp->lamplit` at `mkobj.c:471` before the call;
   JS `otmp.lamplit = 0` at `mkobj.js:360` — so the no-match case leaves
   the child dark on both sides. ✓

Callee closure: `Is_candle` (`js/timeout.js:1324`, sync) and
`candle_light_range` (`js/timeout.js:1362`, sync) both live file-local —
no stub in a live arm. Null-safe guards (`!list?.length || !src ||
!dest`) cover C's NONNULLARG12; on an empty list C's loop is a no-op and
JS returns — same outcome. No RNG either side.

## Hallucinations / overclaim

None. "Both callees file-local" verified true via `sym.mjs`. No
dispatch-with-stubbed-callee shape. The `use_candle` doc retire is
accurate: lit attach-splits flow through `splitobj`, which now carries
light.

## Density

§2b ok. Shipped C is 26 lines; +29 with doc in one module plus a 2-line
wiring and a doc touch. One C locus, one queue row.

## Verification

- Added-line banned-pattern scan: 0 hits (no FORCE/DIAG/`getRngLog`/
  seed/RNG reads). `imports.mjs --rulecheck` → Rule #2 clean (re-checked
  this iteration).
- Re-measured corpus claim myself: `verify obj_split_light_source --base
  03e14d51~1` → 0 blocked at baseline and working — matches the D-log's
  vacuous note, which correctly refuses to call it a PASS and notes no
  `--base` is owed (row cited 0 blocks).
- Green 2/2 + strict ×2 + cohort 7/7 per D-log; /tmp throwaway probe
  23/23 through the real modules incl. candle 7/3 → ranges 3/2 end to end.
  No maintained unit test, disclosed with rationale. Same shared-function
  caveat as 1244 (`splitobj`), same mitigation (no corpus session reaches
  a lit-stack split).

## Actionable C-wrongs

None. Every arm ported verbatim; no named omits even introduced.

Verdict: **ACCEPT**
