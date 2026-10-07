# Review 2508 — 6a53eb3a4 — look_here Blind surf goes live

Metadata: SHA `6a53eb3a4` (D-3628), cliffs-head `invent.c` look_here (owner
itself is the port, no writer). js diff +6/−3 in `js/invent.js`, no test file.
≤10-function SHA: full Method on the one touched function.

## Intent vs deliverable

Promise: replace the hardcoded `const surf = 'floor'` in the `look_here`
Blind else arm with the live `surface(u?.ux, u?.uy)` (already imported from
`js/sit.js`), retiring the doc-named "Blind surface() envelope". Claims 1 PASS
(Ranger-94312) + 1 moved (Archeologist-94292 157→do_statusline2@163) +
REACH-OK; no new edge, no DIAG/FORCE/seed gates.

Diff actually adds: exactly that one expression swap + comment + docstring
update. Matches the promise.

## Inventory

- `look_here` (`js/invent.js:9167`, async) Blind else arm — `surf` source only.

## C ↔ JS fidelity

C `look_here` (`nethack-c/upstream/src/invent.c:4102–4315`, via `csym.mjs`).
The ported arm (`:4199–4207`, read at the pinned path):

```c
boolean cant_reach = !can_reach_floor(TRUE);
const char *surf = surface(u.ux, u.uy),
           *where = cant_reach ? "lying beneath you"
                               : "lying here on the ",
           *onwhat = cant_reach ? "" : surf;
You("try to feel what is %s%s.", drift ? "floating here" : where,
    drift ? "" : onwhat);
if (dfeature && !drift && !strcmp(dfeature, surf))
```

JS (`js/invent.js:9169–9181`) mirrors it line for line: `cant_reach`,
`surface(u?.ux, u?.uy)`, `where`/`onwhat`, the drift split of the
`You(...)`, and `dfeature === surf → skip_dfeature` (C `!strcmp`). The fix
also repairs that comparison, which was dead under the hardcoded 'floor'.

Callee check: C `surface` (`dungeon.c:1749–1788`, via `csym.mjs`) returns
'stairs' via `On_stairs`. JS `surface` (`js/sit.js:474`, sync) is whole —
all 14 C arms in C order (maw/husk, air-bubble/cloud/air, pool, ice, lava,
bridge, altar, headstone, fountain, stairs, wall, doorway, floor, ground).
LIVE callee, pre-existing import (`js/invent.js:341`) — "no new edge" true.
`sym.mjs surface` → `js/sit.js:474 sync`, single definition, no clone.
RNG: none on this path (`surface` is pure terrain read; no `rn2` walk needed).

Guarding `if`: the arm sits in the Blind `else` after the uswallow, altar,
and ice arms — JS nesting matches (`else if (is_ice...)` then `else`).

## Hallucinations / overclaim

None. One-line claim, one-line diff. No dispatch-over-stub (the callee it
leans on is whole and verified above). Diff grep: no `FORCE`/`DIAG`/
`getRngLog`/seed/step/coordinate reads/`fastforward`/hardcoded coords — the
SHA *removes* a hardcoded word. Rule #2: global `--rulecheck` clean (2506).

## Density

Cliff phase: one cliff — the look_here head, owner ported at the exact
diverging arm, every C caller already wired (dolook `:4327`, pickup `:452`
/`:1114` — unchanged signatures, no caller work needed), code + ledger +
verify in one handoff. `Ledger: look_here ported`. No second-file work, no
padding. Small diff, whole arm, measured movement — right-sized, not a no-op.

## Verification

Re-measured:
`node scripts/hidden-proxy.mjs verify look_here --base 6a53eb3a4~1 --reach-all`:

- `verify look_here: 1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Ranger-94312 PASS; Archeologist-94292 moved → reveal_terrain@252, was 157)
- `smoke look_here: 24 PASS, 0 regressed → REACH-OK`

Counts match the D-log exactly (1 PASS + 1 moved past, REACH-OK, no
regressions). Landing-owner note: the D-log says Archeologist moved to
do_statusline2@163, my re-run lands it at reveal_terrain@252. This is not a
false claim — `verify --base` replays working-tree (HEAD) code, and the later
SHA in this batch D-3629 names scen-engulf-Archeologist-94292 among its
do_statusline2 probes, moving it past @163; the committed queue's
reveal_terrain row confirms @252 as its HEAD state. Strictly-later movement
holds under both measurements.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
