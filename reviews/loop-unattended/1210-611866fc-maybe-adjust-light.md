# Review 1210 — 611866fc — maybe_adjust_light + bless-family lamplit tails

Metadata: SHA `611866fc` (D-2244). Queue row `mkobj.c`
maybe_adjust_light, no corpus block. js/ 7 files, +112/−44: new
`maybe_adjust_light`, bless/curse/unbless/uncurse/blessorcurse →
async (light tails only), read.js dragon remail, await at
lit-reachable sites, zap local `unbless` retired.

## Intent vs deliverable

Subject promises the light-radius re-sync + intensity pline on every
bless-state flip of a lit artifact, plus the dragon-scale remail arm.
Diff adds exactly that; non-light arms explicitly stay deferred as
before. Promise kept.

## Inventory

New: `maybe_adjust_light` (mkobj.js:600, ASYNC per `sym.mjs`).
Converted sync→async: `curse`, `bless`, `unbless`, `uncurse`,
`blessorcurse`. Deleted local clone: zap.js `unbless` → canonical
import. Required `sym.mjs` output pasted:

```text
unbless          js/mkobj.js:548   ASYNC — await required
         !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
           js/mklev.js:25430
```

The surviving mklev clone is named in-commit (gen path, provably
unlit) — accepted as a named omit, not a missed re-point. Callees of
the new body (`arti_light_radius`, `get_obj_location` from timeout.js;
`obj_adjust_light_radius`, `cansee`, `Yname2`/`otense`, `pline`) are
all LIVE; `arti_light_radius` draws zero RNG (`csym` grep: 0
rn2/rnd hits), so the `old_light` capture is draw-free.

## C ↔ JS fidelity

`maybe_adjust_light` vs `mkobj.c:1703–1736` (34 lines, pasted during
audit): `new_range`/`delta` → `if (delta)` → unconditional
`obj_adjust_light_radius` → `!Blind && get_obj_location` gate →
last_msg It/They vs `carried || cansee` → `Yname2` → `otense "shine"`
+ `abs(delta)>1 "much "` + brighter/less-brightly — exact, including
the carried-macro reading (`where === OBJ_INVENT`, not the eat.js
invent-membership variant) and the comment rationale.

Bless-family tails vs C `:1744–1830` (read directly): old_light-before-
flip only when `lamplit`, flags flip, then `if (lamplit)
maybe_adjust_light` — exact in all four. The COIN_CLASS /
confers_luck / BAG / bimanual / SPBOOK arms are untouched pre-existing
named omits, not regressions.

Sync→async safety (the load-bearing claim): every state change and
every RNG draw (`blessorcurse` rn2 pair) precedes the first await, so
the ~30 un-awaited sync callers on provably-unlit objects observe
byte-identical behavior; lit-reachable async containers got awaits
(read/remove-curse/enchant-armor+weapon/pray/sit/wield/cancel_item),
and the deliberately un-awaited list (mksobj_init ×21, mklev gen,
mplayer, wishes, muse POT_SICKNESS, dunce cap, end.js death path) is
enumerated with the unlit rationale. Full 44/44 + cohort 7/7 corroborate.

## Hallucinations / overclaim

None. Vacuous-0 labeled as vacuous; full-suite forced run pasted
(mkobj constitution-listed); /tmp probe reported as probe with its
detour (bare-node rn2 needs initRng) disclosed.

## Density

112 insertions for one C function + four 3-line tails + wiring — a
tight caller/callee cluster, in-band (§2b; ceiling raised only, not
breached).

## Verification

Audit re-ran the corpus claim itself:

```text
verify maybe_adjust_light: baseline 611866fc~1 — 0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green/cohort/full 44/44 per
D-log. Diff grep: no FORCE/DIAG/seed/coordinates. Rule #2 clean
(re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
