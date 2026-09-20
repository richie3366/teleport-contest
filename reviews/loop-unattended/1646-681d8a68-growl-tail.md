# Review 1646 — 681d8a68 — `sounds.c` growl tail port (D-2687)

Metadata: commit `681d8a68`, D-2687, js/sounds.js only (2-line behavior
change). No prior review claimed closed. Closes the two brief-verified
missing-arm queue rows (mx==0 wake + permadeaf Deaf) — both removed from
the queue in this commit (observed in the queue diff).

## Intent vs deliverable

Subject promises: unconditional mx==0 wake + uroleplay permadeaf Deaf.
Diff actually changes exactly those two lines. Matches the promise;
nothing else touched.

## Inventory

Changed JS: `growl` (js/sounds.js:843) — guard removed, Deaf extended.

## C ↔ JS fidelity

C locus: `growl` `sounds.c:401–423` (csym, 23 L — whole body read).
Both fixes confirmed against the body:

- C `:421` `wake_nearto(mx, my, mlevel*18)` is the last statement
  inside `if (growl_verb)`, no guard — JS guard removed, call now
  unconditional in the same position. Confirm.
- C `Deaf = HDeaf || EDeaf || u.uroleplay.deaf` (youprop.h:125, read
  in-session) — JS adds `|| game.u?.uroleplay?.deaf`. Confirm. (The
  pre-existing extra `game.u?.Deaf` disjunct has zero writers in `js/`
  per the D-log — dead, harmless, out of scope.)

Safety of the unguarded call: local `wake_nearto` (js/sounds.js:214,
read in-session) is pure dist2 math with null guards on the iterated
monsters; mx 0 (or even undefined) simply matches nothing. No throw
path introduced. Callers: all 7 C sites verified wired via grep this
session (apply 1630, dog 1430, mon ×3 1333/1444/1632, shk ×3
2045/2101/2197 — exact match to the D-log's mapping).

No RNG in `growl` (ROLL_FROM/h_sounds is in the untested hallucination
arm above, untouched). Diff grep: no FORCE/DIAG/seed/coordinate. No
import change. Rule #2 clean (iteration-wide).

## Hallucinations / overclaim

None. Two-line diff, both lines C-cited.

## Density

Below the 40-insertion density floor — but this is a Must-fix-class
missing-arm pair (two queue rows with brief-verified evidence), which
§2b explicitly ships alone. Not a padding case: the rows existed with
C-vs-JS evidence before the port.

## Verification

D-log Verify pattern per siblings. Re-ran
`hidden-proxy.mjs verify growl --base 681d8a68~1 --reach-all`:
"0 blocked (0 at baseline…)" — rows cited 0 blocks each, vacuous
note properly stated — plus "24 PASS, 0 regressed → REACH-OK".
No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
