# Review 2116 — e47a5e02a — selection_iterate whole-body restart

- SHA: `e47a5e02a521e4738368214c0b7816f7ae435897` (D-3156)
- Date: 2026-09-30. `js/` delta: +14/−7 mklev.js (restart + comment).
- Cluster: single function `selection_iterate`.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "selection_iterate whole-body restart". Diff actually
adds: the restarted body (null guard, getbounds, gated x-outer/y-inner
scan, arg pass-through) and a comment refresh. Promise matches
deliverable.

## Inventory

| JS function | Change | Class |
|---|---|---|
| `selection_iterate` (mklev.js:29666, local — same-module lspo neighbor) | whole-body restart, new `arg` param | whole |
| `sel_set_wall_property` comment | documents the now-present gate | comment |

`sym.mjs selection_iterate`: local in mklev.js only. C declares it
extern (`extern.h:2873`), but every C caller is `sp_lev.c` and every
JS caller is same-file mklev.js — locality is correct, no export
needed. Callees `selection_getbounds`/`selection_getpoint`/`isok`
same-file LIVE. Nothing deleted or re-pointed.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## C ↔ JS fidelity

C `selvar.c:725–743` (`csym`): `if (!ov) return` (`:734–735`),
`selection_getbounds` (`:737`), x-outer/y-inner over the rect
(`:739–740`), `if (isok && selection_getpoint) func(x,y,arg)`
(`:741–742`). JS is statement-for-statement identical, including the
dropped `!sel.pts.size` shortcut: C `selection_getbounds` on an empty
selection returns the full map (`:84–89`, verified), and getpoint
reads 0 everywhere, so the body never fires — the equivalence claim
holds. The real fix is the added isok+getpoint gate (old code used a
bare `pts.has`), plus arg pass-through. No RNG either side. Confirm.

Callers: C has 3 live sites (`:5025` lspo_terrain, `:5626` lspo_region
lit arm, `:5928` set_wallprop_in_selection; `:4722` is commented
out). At SHA time `:5626` and `:5928` were wired in JS and `:5025`
was named unwired (lspo_terrain MISSING — verified via `git grep` at
the SHA); D-3158 later ported lspo_terrain and wired `:5025`. The
Named omission was accurate and is now closed by the later cluster.
Nit (pre-existing, not this SHA): the lspo_region wiring comment
cites `:5632` where C's call is `:5626` — a stale pin, unqueued.

## Hallucinations / overclaim

None. "coverage gap, not a corpus divergence" is accurate; the unwired
caller is named, not hidden.

## Density

- Whole-function verdict: `selection_iterate` whole (body + 2/3 live
  callers wired, third named and since closed).
- Single small function (+14/−7) — below the band, but the head row
  held only this function and its closure is same-file; acceptable.

## Verification

Re-measured myself (`--base e47a5e02a~1 --reach-all`):

```text
verify selection_iterate: baseline e47a5e02a~1 — 0 session(s) blocked on it
smoke selection_iterate: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. D-log also claims full 44/44
(shared file) — consistent with the fortress still standing. No
seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
