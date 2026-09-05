# Review 845 — ef2bf265 — dogmove.c dog_eat message gate (D-1875)

Metadata: SHA `ef2bf265`, D-1875, `js/dogmove.js` (+6/−3: gate
predicates + C-citation comment); map + queue/archive stamps. No
symbols deleted or re-pointed.

## Intent vs deliverable

Subject promises the `dog_eat` message gate in C order for the proxy-
`glibr` corpus owner (`ind-Tourist-666025142-d17728db` step 29/91: C
`Your kitten eats a goblin corpse.` vs JS empty; RNG 3614/3614
matched; hero sees the pet's start square but not the food square).
Diff delivers the two predicate swaps. Matches. `glibr()` correctly
untouched (last `do_wear.js` change predates this commit).

## Inventory

Changed: `seeobj`/`sawpet` computation and the `if` condition in
`dog_eat` only. Two extended imports (`mon_visible`, `canspotmon`)
from the already-imported `display.js` — no new module edge. No new
functions.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/dogmove.c` `dog_eat`
(`:217–345` per `csym.mjs`). The gate (`:274–294` per CURRENT; read
above):

- `seeobj = cansee(mtmp->mx, mtmp->my)` — pre-existing JS line,
  unchanged. ✓
- `sawpet = cansee(x, y) && mon_visible(mtmp)` — JS now exact; old
  `canseemon(mtmp)` wrongly required the food square in sight, which
  is precisely the reported symptom (kitten 32,15→32,14, food square
  unseen). ✓
- `if (sawpet || (seeobj && canspotmon(mtmp)))` — JS now exact; old
  second arm dropped C's `sensemon` alternative. ✓
- `else if (seeobj)` → `It eats/devours` arm present in JS. ✓

Callee closure (`sym.mjs`): `mon_visible` `js/display.js:883` sync
(C `display.h _mon_visible` cited); `canspotmon`
`js/display.js:1199` sync (`canseemon || sensemon`, C `display.h:129`
cited — both verified LIVE, no new clones. (`canspotmon`'s one clone
in `monmove.js:984` untouched; this commit imports the export.)

Observation (pre-existing, out of envelope, not a Must-fix): C's
`tunnels(mtmp->data)` → `"%s digs in."` arm has no JS counterpart
(`dogmove.js` contains no `digs in`/`tunnels`); JS prints `eats` for
tunneling pets. It predates this commit, the gate change does not
interact with it, and the envelope comment already defers the
neighboring arms — next port iter should name it in the map row
rather than leave it silently unnamed.

## Hallucinations / overclaim

None. The misattribution call (`glibr` is a `corpse`-substring
literal match at `do_wear.c:2617`; `glibr()` already faithful) is
measured — the session PASS after changing only `dog_eat` is the
receipt. Third consecutive correct proxy-owner call (D-1872…D-1875).

## Density

+6/−3 is below the ~40 floor, but the C envelope is two predicates —
genuinely that small, and the commit paid the fixed cost back with a
full `sessions` 44/44 plus a proxy rescore (246/265, was 245, zero
regressed). Justified.

## Verification

Exemplary bullet: states plainly that `verify dog_eat` is vacuous at
HEAD (block filed under `glibr`), then verifies the real owner —
`verify glibr` → PROGRESS — plus green/strict, cohort 7/7, full
44/44, and a proxy score with zero regressions. Re-ran myself:
`hidden-proxy.mjs verify glibr --base ef2bf265~1` → `1 PASS, 0 moved
past, 0 unchanged, 0 worse → PROGRESS`
(`ind-Tourist-666025142-d17728db: PASS`) — matches. No
FORCE/DIAG/seed/coordinate hits (grep count 0 on the js/ hunks).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
