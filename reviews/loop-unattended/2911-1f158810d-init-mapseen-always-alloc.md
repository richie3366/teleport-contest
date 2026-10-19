# Review 2911 — 1f158810d — init_mapseen always allocates

- SHA: `1f158810d` (cliff, writer port: one function body)
- D-entry: D-4070; Ledger: dungeon.c (`init_mapseen`, D-4070)
- `js/` diff: `js/dungeon.js` +7/−7

## Intent vs deliverable

Promise: JS deduped the mapseen node (`find_mapseen` → return existing),
but C always allocates. A tutorial level re-made after its file was
discarded lost its second #overview line in final disclosure (3 sessions
→ FULL PASS). The diff drops the lookup and clears `lastseentyp` on
every call. Promise = diff.

## Inventory

- `init_mapseen` — dungeon.js:1764. C: dungeon.c:2834–2871.
- Callers: JS mklev.js:2941 (C mklev.c:1582, the only C caller).
  JS-only `ensure_mapseen` (dungeon.js:1804:
  `find_mapseen(lev) || init_mapseen(lev)`) keeps its own find-first
  guard.

## C ↔ JS fidelity

C (csym dungeon.c:2834–2871):

```c
    init = (mapseen *) alloc(sizeof *init);
    (void) memset((genericptr_t) init, 0, sizeof *init);
    ...
    (void) memset((genericptr_t) svl.lastseentyp, 0, sizeof svl.lastseentyp);
    init->lev.dnum = lev->dnum;
    init->lev.dlevel = lev->dlevel;
    for (mptr = svm.mapseenchn, prev = 0; mptr;
         prev = mptr, mptr = mptr->next) {
        if (mptr->lev.dnum > init->lev.dnum
            || (mptr->lev.dnum == init->lev.dnum
                && mptr->lev.dlevel > init->lev.dlevel))
            break;
    }
    /* insert after prev */
```

JS now builds a zeroed node every call, sets `game.lastseentyp = null`
(the memset), and splices before the first strictly-greater node. That
is "after any equal node", the same as C's `>` comparisons, so a
duplicate lands after the original. `find_mapseen` returns the first
match, as C's linear walk does, so recalc/overview updates keep hitting
the original node and the duplicate stays blank. That is why C prints a
bare second «Level 2: [tut-2]».

Caller check: only mklev reaches `init_mapseen` with a fresh level, so
the dedupe was never needed on the real path. `ensure_mapseen` (a JS
convenience for lazily-created nodes) still finds first, so it cannot
create duplicates C wouldn't.

## Hallucinations / overclaim

None. The D-log's full rescore claim (873 scored, 0 regressed, +3) is
consistent with this audit's rescore (0 PASS→FAIL). Shape B (the grave
killer «exhaled by») is named as the next background_enlightenment row,
and D-4071 shipped it.

## Density

A whole small C function, now line-for-line. One `Ledger:` entry. No
unreached work.

## Verification

Re-measure (`--base 1f158810d~1 --no-reach`, HEAD code):

```text
verify init_mapseen: vacuous (no owned row)
verify background_enlightenment: 5 blocked
  scen-worldtour-Wizard-49955007: PASS
  scen-worldtour-Priest-49950072: PASS
  scen-worldtour-Wizard-51250064: PASS   (shape B, fixed by D-4071)
  scen-sweep-Barbarian-50255201: PASS    (shape B, fixed by D-4071)
  scen-questtour-Monk-50557003: still background_enlightenment at s324 (RNG-lost map row, named)
verify print_mapseen: Wizard-50556502 PASS, zapfest-Monk-51050084 PASS
```

D-4070's own rows (Wizard-49955007, Priest-49950072, Wizard-50556502)
all PASS, matching the D-log. There were no FORCE/DIAG/seed strings,
and the rulecheck is clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
