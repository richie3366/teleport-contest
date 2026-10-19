# Review 2898 — 39314d84d — do_attack safemon Punished read

- SHA: `39314d84d` (cliff, writer port: 1 predicate)
- D-entry: D-4057; Ledger: uhitm.c (`do_attack`, D-4057 appended)
- `js/` diff: `js/uhitm.js` +5/−2 (import + predicate);
  new `scripts/do-attack-punished-uball.test.mjs`

## Intent vs deliverable

Promise (subject + D-log): the safemon `foo` predicate read a
`u.Punished` flat that nothing writes, so a ball-and-chain hero fell
through to `rn2(7)` and swapped with the pet. The fix imports the live
`Punished()`. The diff does exactly that: one import, one operand.
Promise = diff.

## Inventory

- `do_attack` safemon `foo` — uhitm.js:4995: `Punished() || !rn2(7)
  || …`. C: uhitm.c:446–583 (`foo` at :469–473).
- `Punished` — pray.js:255 (`!!game.u?.uball`), sym.mjs:

```text
Punished         js/pray.js:255   sync
```

  C macro: youprop.h:77 `#define Punished (uball != 0)`.

## C ↔ JS fidelity

C (csym uhitm.c, safemon arm):

```c
boolean foo = (Punished || !rn2(7)
               || (is_longworm(mtmp->data) && mtmp->wormno)
               || (IS_OBSTRUCTED(levl[u.ux][u.uy].typ)
                   && !passes_walls(mtmp->data))),
        inshop = FALSE;
...
if (inshop || foo) {
    if (!svc.context.travel && !svc.context.run)
        if (canspotmon(mtmp) && mtmp->isshk)
            return ECMD_TIME | dopay();
    if (mtmp->mtame)
        monflee(mtmp, rnd(6), FALSE, FALSE);
    ... You("stop.  %s is in the way!", buf);
```

`||` short-circuit order is preserved. A Punished hero draws no `rn2(7)`
on either side now. That is the exact RNG fork at Ranger-50250049 s953
(C `rnd(6)` from the tame monflee vs JS `rn2(7)`). The rest of the arm
was re-read by the commit (inshop scan only when `!foo`, dopay gate,
`rnd(6)` monflee, stop pline, end_running, frozen/helpless/`mmove == 0
&& rn2(6)`). I checked the C order above against uhitm.js:4995–5030 and
it matches branch for branch.

`grep u.Punished js/` shows only do.js:1803/2288 (`u.uball ||
u.Punished`), where the uball operand already decides, plus comments.
The commit names the dead flat, which is correct.

Import: `imports.mjs --can uhitm.js pray.js Punished` → SAFE per the
D-log. `Punished` is a hoisted `export function` with call-time use
only, so there is no TDZ.

## Hallucinations / overclaim

Minor: the movement line `5 PASS` counts two sessions that were
already PASS at the committed baseline (see Verification). The real
movement is 3 sessions: Monk-50055011, Ranger-50250049, and
Rogue-578132 (now archived PASS). The fix itself is right. The D-log's
"5th session runs FULL PASS on the frozen runner" for Rogue-578132 is
stated as a separate measurement, which is fine.

## Density

A cliff writer with movement on every blocked probe. Whole-arm re-read,
one `Ledger:` entry, no unreached work.

## Verification

Re-measure (`--base 39314d84d~1 --no-reach`):

```text
verify do_attack: baseline 39314d84d~1 — 3 blocked (2 at baseline, 1 working)
  (1 uncached: scen-worldtour-Rogue-578132)
  scen-sweep-Monk-50055011: PASS
  scen-sweep-Ranger-50250049: PASS
verify do_attack: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

The D-log's "4 PASS" is inflated by two. scen-worldtour-Barbarian-49955016
and scen-worldtour-Wizard-50250032 are `passed: true` in the committed
scoreboard at `39314d84d~1` and at HEAD. They were "blocked" only in a
stale local `.cache` scores file, so they are not movement from this
commit. This is a counting artifact of `verify` merging the uncommitted
working rows, not a false fix: every row blocked at the committed
baseline re-runs PASS. There were no FORCE/DIAG/seed strings, and the rulecheck
is clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
