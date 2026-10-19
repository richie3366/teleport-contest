# Review 2905 — f619089e3 — digactualhole: drop the invented trailing newsym

- SHA: `f619089e3` (cliff, writer port: one deleted call)
- D-entry: D-4064; Ledger: dig.c (`digactualhole`, D-4064)
- `js/` diff: `js/dig.js` +3/−1; new
  `scripts/digactualhole-no-trailing-newsym.test.mjs`

## Intent vs deliverable

Promise: JS `digactualhole` ended with a `newsym(x, y)` that C does not
have. Under Hallucination it re-drew the statue/pile glyph and shifted
the display RNG by 3 draws (Monk-50255213 s992 → FULL PASS; core RNG
was already 40728/40728). The diff deletes the call and leaves a cite
comment. Promise = diff.

## Inventory

- `digactualhole` end of body — dig.js:1001.
  C: dig.c `digactualhole` (body ends at :828, per the D-log and the
  csym tail below).

## C ↔ JS fidelity

C (csym dig.c, the tail of digactualhole):

```c
        } else {
            if (shopdoor && heros_fault)
                pay_for_damage("ruin", FALSE);
            if (newobjs)
                impact_drop((struct obj *) 0, x, y, 0);
            if (mtmp) {
                ...
                if (teleport_pet(mtmp, FALSE)) {
                    ...
                    migrate_to_level(mtmp, ledger_no(&tolevel),
                                     MIGR_RANDOM, (coord *) 0);
                }
            }
        }
    }
}
```

There is no newsym after the PIT/HOLE switch. The C repaint of the
spot comes from inside the arms: `maketrap` → newsym of the new trap,
`seetrap`, the hero-in-pit vision_recalc, and the `u.utrap` /
`fall_through` paths. JS keeps those. The deleted line was a JS
invention. Under Hallucination, every newsym of an object spot calls
`random_object` on the display RNG, so one extra call per dig shifts
later hallucinated glyphs. That matches the 3-draw shift described.

Risk: a non-hallucinated path where JS relied on the invented newsym
because a callee's own repaint is missing. The commit ran
`verify … --reach-all` and the full public suite. This audit's full
rescore is the window regression check (see CURRENT / commit). It
showed no PASS→FAIL with an owner in dig.c.

## Hallucinations / overclaim

None. The tooling note (display-RNG divergences invisible to the scored
log; `NETHACK_RNGLOG_DISP=1` + a temp stack logger found it) is a
process note, not a claim.

## Density

A one-line deletion at the cliff owner. The function is unchanged
otherwise. One `Ledger:` entry. No unreached work.

## Verification

Re-measure (`--base f619089e3~1 --no-reach`):

```text
verify use_pick_axe2: scen-sweep-Monk-50255213: PASS → 1 PASS → PROGRESS
verify digactualhole: 5 blocked (0 at baseline, 5 in the working scoreboard)
  (5 uncached: scen-sweep-Archeologist-50255234, Priest-50350049,
   Ranger-50055018, Samurai-50055053, Valkyrie-50255236)
verify digactualhole: 0 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

The probe row matches the D-log. The 5 `digactualhole` "working" rows
are archived PASS recipes (`hidden-corpus/recipes-archive/`), absent
from the committed board at every window SHA, and appear only through
the stale local `.cache` scores. They are not a regression signal.
There were no FORCE/DIAG/seed strings, and the rulecheck is clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
