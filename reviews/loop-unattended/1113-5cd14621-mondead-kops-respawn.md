# Review 1113 — 5cd14621 — mondead prefix + clone unification (D-2147)

Metadata: SHA `5cd14621`, `js/mhitm.js` + `js/uhitm.js` + `js/trap.js`
(+~60/−60 in `js/`, net growth in mhitm only). Queue row fired: Open
`mon.c` mondead (scen-genesis-Barbarian-92111 step 81). No prior review
claimed closed.

## Intent vs deliverable

Subject promises the sync-safe `mondead` prefix (be_sad, cham/were,
mvitals, quest/mail, Kops `rnd(5)`) plus 3-clones→1-export. Diff
delivers exactly that: mhitm.js export extended, trap.js/uhitm.js local
clones deleted for the shared import.

## Inventory

- `mondead` (mhitm.js:2708, sync export, extended): be_sad read+clear,
  cham/were restore, mvitals, quest-leader, mail G_GENOD, S_KOP switch,
  unmap/detach tail.
- Deleted: trap.js + uhitm.js file-local `mondead` clones (now import).
- Imports: `makemon`/`NO_MM_FLAGS` + `stairway_find_type_dir` (all on
  already-static edges — `--can`: ALREADY, no new edge; D-log's "one
  new edge" is imprecise but safe-side).

## C ↔ JS fidelity

Walked `mon.c:3081–3177` against the new export. be_sad read+clear in
C order (pline async-omitted, named); cham restore
(`ismnum`/`set_mon_data`/`NON_PM`) + 3 were pairs via mndx-compare
(pointer-compare equivalent) — exact. mvitals `died++` reads the
restored form: verified `set_mon_data` sync-updates `mon.mnum`
(`js/mondata.js:66`), so `mnum ?? data.mndx` ≡ C
`monsndx(mtmp->data)`. Quest-leader mark exact plus a defensible
m_id-0-unset guard (convention-cited quest.js:413/dog.js:642; C would
spuriously mark when both ids are 0). Mail-daemon G_GENOD on the
ensured slot exact. S_KOP `rnd(5)` switch exact including case-1
FALLTHROUGH, `stairway_find_type_dir(FALSE,FALSE)`, `makemon` args,
`NO_MM_FLAGS`. `makemon`/`stairway_find_type_dir` confirmed sync, so
the un-awaited calls are safe. `m_unleash` hoist is draw-free and
matches both deleted clones' pre-existing order. Unification verified:
`sym.mjs mondead` → single sync export, zero clone warnings; both
callers import on existing mhitm edges. Named omits (lifesaved +
DEADMONSTER return, vampshifter revert, be_sad pline, steam-vortex
`rn2(10)+5` cloud, grddead return, logdeadmon, full m_detach) are
header-commented and map-pointed; `grddead`/`vamprises`/
`lifesaved_monster` confirmed absent from `js/` (`sym.mjs` NOT FOUND),
so the omits are genuine unported-code, not stubs. Two noted costs,
both named: lifesaving monsters still die outright (pre-existing, no
corpus demand), and a steam-vortex death skips C's `rn2(10)` draw
(sync-export constraint). Branch-by-branch confirm for shipped arms.

## Hallucinations / overclaim

None material. "3 clones → 1 export" verified true. The mklev "new
edge" line is stale (`--can` says ALREADY) — safer than claimed, not
riskier.

## Density

One-function prefix + dedup across its 3 call sites — right-sized §2b
unit (shared-prefix unification, not unrelated gluing).

## Verification

D-log Verify: `verify.mjs --fn mondead` → moved-past PROGRESS +
green/strict/cohort + full 44/44. Re-measured myself:
`hidden-proxy.mjs verify mondead --base 5cd14621~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Barbarian-92111: moved → list_vanquished at step 96, was 81). Exact
match. `imports.mjs --rulecheck`: Rule #2 clean. No FORCE/DIAG/seed
gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
