# Review 2591 — 02f3adacc — surface_zap pool arm Underwater idiom

SHA: `02f3adacc` (D-3721). Underwater-idiom family residual, 1 gate,
`js/zap.js` only (+3/−2). Ledger: surface row touched
(docs/ledger/dungeon.c.jsonl).

## Intent vs deliverable

Promise: C says "bottom" for a submerged hero off the water level
(dungeon.c:1765–1767); the zap-local clone read dead-false sticky
`game.u?.Underwater` → gate reads live `(u.uinwater | 0)`, plus an
export for the focused-test seam. Diff actually adds: the
`export` keyword + the one-condition rewire + C-cite comment.
Promise matches diff.

## Inventory

- `surface_zap` (js/zap.js:2874, newly exported) ↔ C
  nethack-c/upstream/src/dungeon.c:1749–1788 (csym range), pool arm
  :1765–1767.

## C ↔ JS fidelity

C `:1765–1767` `return (Underwater && !Is_waterlevel(&u.uz)) ?
"bottom" : hliquid("water");` confirmed verbatim; Underwater ≡
`(u.uinwater)` at youprop.h:279 (re-read this review). JS now
`((game.u?.uinwater | 0) && !Is_waterlevel(uz)) ? 'bottom' :
hliquid('water')` — D-3400 idiom, same expression as the
js/zap.js:986 sibling (D-3720). Clone classification: CLONE with
named doc-comment deltas (swallow arm skipped — zap_updown is
!uswallow; On_stairs → ground unless furniture) — both predating
this SHA and named in the D-log ("Clone's doc-comment deltas
stand"). Callees on the touched arm are LIVE: `is_pool`,
`Is_waterlevel` (js/const.js:3256, sync), `hliquid`
(js/do_name.js:407, sync). No STUB, no new edge, no import.
`sym.mjs surface_zap` → `surface_zap js/zap.js:2874 sync`
(newly exported; nothing deleted or re-pointed). The focused test
file exists (scripts/surface-zap-underwater-gate.test.mjs, 59
lines, shipped in this SHA).

## Hallucinations / overclaim

None. D-log states the vacuous verify plainly ("no corpus
divergence — C-fidelity residual").

## Density

One whole gate + focused test + ledger + verify on an empty queue
(both generated blocks empty, batch no gap). Right-sized per
playbook §2a missing-arm companions; successor lead (D-3722
can_ride) named with the brief pointer.

## Verification

Re-measured: `verify surface --base 02f3adacc~1 --reach-all` →
0 blocked (vacuous, as stated) + `smoke surface: no RNG-tagged
reach; fixed smoke spread (24 run, 10.6s): 24 PASS, 0 regressed →
REACH-OK`. Matches the D-log. Rule #2 clean (no imports touched).
Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
