# Review 2892 — 75e2e77e0 — knockback door guard reads raw magr->mx/my

- SHA: `75e2e77e0` (cliff, writer port: 1 guard)
- D-entry: D-4051; Ledger: uhitm.c (`mhitm_knockback ported`,
  D-4051 appended to 5 prior D-ids)
- `js/` diff: `js/mhitm.js` +9/−3; new
  `scripts/hmonas-knockback-doorway.test.mjs`

## Intent vs deliverable

Promise (subject + D-log): the door-diagonal guard must read raw
`magr->mx/my` (BSS 0 for hero attackers), not the u.ux-derived
dx/dy; probe Monk-49950093 moves 1164→reveal_terrain@1279.
Delivers exactly that: one `if` rewritten to C's conjuncts with
cites, no import/signature change. Promise = diff.

## Inventory

- `mhitm_knockback` door guard — mhitm.js:2914:
  `(defx - (magr?.mx | 0)) && (defy - (magr?.my | 0))`.
  C: uhitm.c:5302–5304.

## C ↔ JS fidelity

C (uhitm.c:5295–5305, line-numbered read):

```c
dx = sgn(defx - (u_agr ? u.ux : magr->mx));   /* :5295 hero-mapped */
dy = sgn(defy - (u_agr ? u.uy : magr->my));   /* :5296 hero-mapped */
...
if (IS_DOOR(levl[defx][defy].typ)             /* :5302 RAW magr */
    && (defx - magr->mx && defy - magr->my)   /* :5303 */
    && !doorless_door(defx, defy))            /* :5304 */
    return FALSE;
```

JS matches conjunct-for-conjunct, including `&&` binding looser
than `-`:

```js
if (curloc && IS_DOOR(curloc.typ) && (defx - (magr?.mx | 0))
    && (defy - (magr?.my | 0)) && !doorless_door(defx, defy)) {
    return false;
}
```

The dx/dy directly above keep the hero-mapped form (mhitm.js
`agrx/agry` via `u_agr ? game.u?.ux : magr.mx`) — the asymmetry
the D-log describes is real and now mirrored on both sides.
BSS-0 foundation verified three ways: (1) zero `youmonst.mx =` /
`.my =` writes in `nethack-c/upstream/src/`; (2) zero `youmonst`
mx/my writes in `js/`; (3) the cited invariants exist —
light.c:17 and polyself.c:9 both state `gy.youmonst.mx` "will
always remain 0". The `|0` maps JS `undefined` onto C's 0;
real-monster attackers carry live mx/my on both sides.
Probe arithmetic: def (38,7) DOOR, hero attacker → (38−0)&&(7−0)
→ TRUE → `return false`, C's silent-FALSE; old JS `dx&&dy` =
(−1&&0) = 0 → proceeded. Coherent with the measured temp-C dump
(door-IF fired, trace stops after `isok=1`) and the claw#2 RNG
fork (C `rnd(20)` vs JS `rn2(2)` knockback message).
All four C call sites (mhitm.c:1061, mhitu.c:1193, uhitm.c:1928,
uhitm.c:5833 — csym, plus one comment + decl) match the D-log's
table; the two hero-attacker sites (:1928/:5833) get the BSS-0
path, the two monster-attacker sites the live path. No RNG in the
guard; none added.

## Hallucinations / overclaim

None. The "paradox resolved only by measurement" narrative is
backed by the reverted temp-C dump + truncated re-record
described; recorder tree left clean per the commit (src
diff-empty, strings-clean). No dispatch/callee mismatch — the
guard is the firing predicate.

## Density

Cliff writer with movement on the row's probe session.
Whole-function holds (`mhitm_knockback` already ledger-`ported`
across 5 prior D-ids; this appends D-4051). The second owned
session (Caveman-610084, still hmonas@559) is arm-separate — RNG
97559/97559 full match, screen-kind, different family — named
with cause analysis and a falsifier, per the D-4040 precedent this
window's reviews accept. One `Ledger:` entry, accurate.

## Verification

Re-measure:

```text
verify hmonas: baseline 75e2e77e0~1 — 2 session(s) blocked on it
  scen-sweep-Monk-49950093: moved → reveal_terrain at step 1279 (was 1164)
  scen-worldtour-Caveman-610084: still hmonas at step 559
verify hmonas: 0 PASS, 1 moved past, 1 unchanged, 0 worse → PROGRESS
```

Matches the D-log line-for-line, including the quoted Caveman
toplines. No new module edge (`--can` n/a). No FORCE/DIAG/seed
strings in the diff; KBDIAG reverted. Rule #2 clean (window
rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
