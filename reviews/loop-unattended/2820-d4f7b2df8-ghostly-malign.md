# Review 2820 — d4f7b2df8 — ghostly unicorn gate + des set_malign

- **SHA:** `d4f7b2df8` (Thu 2026-10-15) — cliffs-head writers (D-3974).
- **D-entry:** D-3974. **Ledger:** `restore.c` + `sp_lev.c` rows re-stamped.
- **Diff size:** `js/bones.js` −2/+4 (import + gate), `js/mklev.js`
  +8 (six `set_malign` sites, two with new braces); +2 tests.
- **Method:** cliff (two writers, one row) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the `peace_minded` cliff row (4 blocks —
three chain-bones sessions where C draws at `makemon.c:2306`
but JS draws at `collect_coords`, plus worldtour-Wizard-587319
where both draw in `peace_minded` but disagree because
`u.ualign.record` is +1 vs −11) has two writers. (a) The bones
ghostly gate used a mlet-only unicorn check, missing
`likes_gems`. (b) Six des-monster place sites set `mpeaceful`
without C's `set_malign` re-run. The fix imports the live
`is_unicorn` into the ghostly gate and adds `set_malign` after
the six overrides. 4/4 PASS.

The diff is exactly that. Promise and diff agree.

## Inventory

- `js/bones.js` `getlev_bones` ghostly loop (~:689): import
  `is_unicorn` from `./monsters.js` (extends an existing import;
  no new edge) and replace the inline
  `ptr.mlet === 'S_UNICORN'` predicate with `is_unicorn(ptr)`.
  The D-1849-class clone is the deleted inline predicate.
- `js/mklev.js`: `set_malign(mtmp)` after the peaceful override
  at six sites — `load_bar_strt` ogre loop, `load_wiz_strt`
  placeNamedAt + placeClassAt (braces added), `load_kni_goal`
  Ixoth, `load_earth` placeNamedAt (braces added), `load_tut1`
  wolf. `set_malign` already imported (:120); no new edge.
- Two focused tests (0/2 pre-fix stash check → 2/2 post-fix).

Required step-3 `sym.mjs` output (the diff re-points the gate
from the inline clone to the import):

```text
is_unicorn       js/monsters.js:503   sync
         !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
           js/apply.js:656  js/trap.js:257
```

`set_malign` → `js/makemon.js:738 sync` (LIVE). Diff grep:
hygiene clean (no `FORCE`/`DIAG`/`getRngLog`/`fastforward`).

## C ↔ JS fidelity

Writer (a) — ghostly gate. C `restore.c:1202-1210`:

```c
if (!mtmp->isshk)
    mtmp->mpeaceful = (is_unicorn(mtmp->data)
                       && (sgn(u.ualign.type)
                           == sgn(mtmp->data->maligntyp))) ? 1
                      : peace_minded(mtmp->data);
set_malign(mtmp);
```

with `is_unicorn(ptr)` ≡ `mlet == S_UNICORN && likes_gems(ptr)`
(`mondata.h:149`, verified). JS (`js/bones.js:687-697`) is now
that expression verbatim: `ual` is `game.u?.ualign?.type`,
`sgn` matches, `peace_minded(ptr) ? 1 : 0` matches (C returns
boolean; JS normalizes), and the pre-existing `set_malign(mtmp)`
after the `if` matches C's unconditional call. The old inline
check treated pony/horse (S_UNICORN mlet, no `likes_gems`) as
unicorns; they now correctly take `peace_minded`. Exact.

Writer (b) — des peaceful. C `sp_lev.c:2125-2129` (`create_monster`):

```c
mtmp->female = m->female;                 /* :2125 */
if (m->peaceful > BOOL_RANDOM) {          /* :2126 */
    mtmp->mpeaceful = m->peaceful;        /* :2127 */
    /* changed mpeaceful again; have to reset malign */
    set_malign(mtmp);                     /* :2129 */
```

Cite exact. All six JS sites pair an `mpeaceful` (re)set with
the added `set_malign` in C order; the two brace additions only
scope the pre-existing single-statement conditionals. The
unconditional sites (bar ogre `mpeaceful = 0`, kni Ixoth,
tut1 wolf) correspond to des files pinning peaceful, where C
takes the `:2126` arm (`0 > BOOL_RANDOM`) — the pairing holds.

No RNG in either change; both only redirect which draw a
*downstream* call makes (ghostly `peace_minded`, later
`malign`-gated behavior) — consistent with the one-draw-offset
and record-divergence symptoms.

Named omissions (audited, in-map, not Must-fix):
(1) `mk_roamer` peaceful path without `set_malign` — different
C locus (`mk_roamer`, not `create_monster`), correctly excluded.
(2) tut1 wolf des `female` — C `:2125` vs JS birth-kept; no
session evidence; correctly left alone.
(3) `apply.js:656` local `is_unicorn` — body verified C-exact
here (`mlet && likes_gems`), left in place. Trivial doc gap:
`trap.js:257` holds an identical C-exact local the D-log does
not name. Both are pre-existing, untouched by this SHA, and
behaviorally identical to the export — noted for the map, not
a C-wrong of this commit.

## Hallucinations / overclaim

None. The owner (`peace_minded`) is explicitly proven
already-whole (JS body `js/makemon.js:2231`, ledger ported,
D-1079 read once) and NOT re-ported; both writers are named by
their divergences. "Clone deleted" refers to the inline
predicate replaced by the import — accurate in the D-1849
sense (a diverging local re-implementation removed in favor of
the export). The `splev_create_monster` + five hardcoded sites
"already re-ran (audited, untouched)" claim scopes the family
completely. No "Match C" for any dispatch.

## Density

Cliff phase: the owner is the `peace_minded` cliff head at the
parent SHA; the port is its two writers (one cause each),
shipped together per §10.20 ("one cause healing several rows
ships them together" — here two causes, one row, one handoff).
Code + ledger + verify in one commit. Ledger rows re-stamped,
not newly claimed whole. No bundled file, no sweep, no
self-filed row.

## Verification

Re-measured by this audit
(`hidden-proxy.mjs verify peace_minded
--base d4f7b2df8~1 --reach-all`):

- `verify peace_minded: 4 PASS, 0 moved past, 0 unchanged, 0
  worse → PROGRESS` — all four claimed sessions PASS full
  (chain-Knight-50456514, chain-Knight-610030,
  chain-Valkyrie-49958016, worldtour-Wizard-587319).
- `reach peace_minded: 2484 baseline-PASS session(s) reach it
  (2484 run): 2484 PASS, 0 regressed → REACH-OK`.
- D-log gates: syntax (2 files), rule2, green 2/2, strict ×2,
  cohort 7/7, full 44/44 (shared file). The audit's
  end-of-iteration rescore re-covers the fortress.

No seed/step/coordinate/RNG-index reads; no trace shaping.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
