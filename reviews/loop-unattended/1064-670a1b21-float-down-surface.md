# Review 1064 — 670a1b21 — float_down surface call-site (D-2094)

Metadata: SHA `670a1b21`, `js/trap.js` +9/−2, queue owner float_down (1
session). D-log D-2094.

## Intent vs deliverable

Subject promises: come-down arm used a floor/ground stand-in, printing
"to the floor" on stairs; swap to the shared `surface`. Diff actually
adds: dynamic `import('./sit.js')` + `surface(u.ux|0, u.uy|0)` + 4-line
C cite; drops `surface() exact` from the Named list. Promise ==
deliverable.

## Inventory

Changed: `float_down` come-down arm only. No new functions, no new
static edge (dynamic call-time import; sit.js statically imports
trap.js, so static would add a trap↔sit edge — avoided entirely).
`sym.mjs surface → js/sit.js:475 sync` LIVE export (D-2008). No
deleted/re-pointed symbols.

## C ↔ JS fidelity

`trap.c:4144` (float_down csym range :4023–4179), verbatim:

```
You("float gently to the %s.", surface(u.ux, u.uy));
```

JS now prints `` `You float gently to the ${surf}.` `` with
`surf = surface(u.ux|0, u.uy|0)`. Confirm — exact call-site port.

Bug mechanism confirmed, not assumed: the retired `surface_fd`
(:2884) is a floor/ground stand-in with no STAIRS arm (STAIRS ≥ ROOM
reads as floor); the shared `surface` has `On_stairs → 'stairs'`
(`js/sit.js:488`). The corpus legs (stairs square) are exactly the
divergent shape. Confirm.

Kept clone note: `surface_fd` stays for the `fall_through` "opens up"
pline (:3603). That is a different *caller* of the same C `surface()`
— the D-log's "different C function" phrasing is loose but the
retention is cited to a line and `sym.mjs` independently flags the 3
other file-local `surface` clones (dig/dokick/engrave) as pre-existing
drift. No new clone here; the import side is correct (IMPORT the
export). Not a Must-fix on this delta.

## Hallucinations / overclaim

None. "imports.mjs verdict for the static shape was SAFE/hoisted" is
accurate context for why dynamic was still chosen (avoids the question
entirely). No dispatch-over-stub — single live call.

## Density

+9/−2, one arm, one session — small but complete (C surface is two
one-spot divergences on one step per D-log; nothing else to bundle
without gluing). OK.

## Verification

- Rule #2 clean (global rulecheck). Ban grep 0.
- Re-measured `hidden-proxy.mjs verify float_down --base 670a1b21~1`:
  "0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS"
  (Samurai-92017 step 43 → dosearch step 54) — matches D-log.
- Green/strict/cohort recorded; full suite correctly skipped (single
  non-shared file).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
