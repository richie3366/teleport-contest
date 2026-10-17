# Review 2898 — 9db173202 — do_attack punished live-ball read

- SHA: `9db173202` (cliff arm fix: 1 disjunct; continuation — prior
  agent died pre-commit, hunk + test verified whole and shipped)
- D-entry: D-4057; Ledger: uhitm.c (`do_attack ported`)
- `js/` diff: `js/uhitm.js` +5/−3 (one disjunct + cite);
  new `scripts/do-attack-punished-shortcircuit.test.mjs`

## Intent vs deliverable

Promise: replace the dead `game.u?.Punished` read with the live
ball `game.u?.uball` per `Punished ≡ (uball != 0)`; Monk-50055011
s1923 and Ranger-50250049 s953 → FULL PASS. Delivers exactly
that: one disjunct, short-circuit order kept, one focused test
(punished + unpunished control). Promise = diff.

## Inventory

- `do_attack` foo disjunct — uhitm.js:4994: `game.u?.uball` first,
  then `!rn2(7)`. C: uhitm.c:474–477 (`boolean foo = (Punished ||
  !rn2(7) || …)`), `Punished` = youprop.h:77 `(uball != 0)`.

No new imports, no deleted symbols, no re-pointed clones.

## C ↔ JS fidelity

C (uhitm.c:474–477, sed; macro youprop.h:77):

```c
boolean foo = (Punished || !rn2(7)
               || (is_longworm(mtmp->data) && mtmp->wormno)
               || (IS_OBSTRUCTED(levl[u.ux][u.uy].typ)
                   && !passes_walls(mtmp->data))),
```

```c
#define Punished (uball != 0)   /* youprop.h:77, pseudo-property */
```

JS now reads `game.u?.uball` in the same first position — branch
order and short-circuit identical: punished ⇒ `rn2(7)` never
drawn, matching C call-for-call (the divergence was C `rnd(6)` @
uhitm.c:497 `monflee(mtmp, rnd(6), …)` vs JS `rn2(7)`).

"Never-written flat" verified with proper regex search: zero
writes to `.Punished` in `js/`; the only remaining reads are
do.js:1803/:2288 `u.uball || u.Punished` (uball leads — dead but
harmless, named as omission (1)). The earlier literal-mode
searches returned empty for the wrong reason and were redone.

Liveness of the new read: `u.uball` is the worn-slot field
(do.js:279 `['uball', W_BALL]`, init null decl.js:131),
set/cleared by the `setworn`/`setnotworn` machinery
(read.js:1992 `setworn(null, W_BALL)` clears) — null iff
unpunished, so `!!(game.u?.uball)` ≡ C `(uball != 0)` exactly.
Same predicate as the canonical `Punished()` export
(pray.js:255) and the trap.js:7501 / dothrow.js:3124 convention;
inline read needs no import. C callers (dig.c:1171/:1202,
hack.c:1987, force_attack :440 → dig.js:2648/:2685, cmd.js:6703,
uhitm.js:4813) pre-wired, gain the arm for free — caller table
present and behavior-only.

## Hallucinations / overclaim

None. The guard `:462` (is_safemon && !forcefight &&
!Stormbringer) and the `:497` monflee arm are cited; both probe
symptoms («in the way!» vs swap / keystream shift) follow from
the fork direction. RED→GREEN across the handoff is claimed and
the GREEN half re-runs 2/2 here.

## Density

Movement on both owned sessions (2 FULL PASS, RNG+screens exact).
Whole-function holds (`do_attack` ledger-ported; this arm was
the one wrong disjunct). One `Ledger:` entry, accurate.

Picker note: `do_attack` (~577 screens lost) sat just below the
parent's 12-row block — not the head, not a Must-fix — and the
Status writes no park re-verification prose. Not unreached work:
the entire visible block was live-confirmed as D-4016/D-4028
park kin in the parent commit (D-4056, 22 min earlier), the
family held through the whole window (D-4062: "14 dupe-rc +
95340 re-verified"), and Verify shows 2 sessions reaching FULL
PASS. This is first-actionable-row discipline with the prose in
the parent, not cherry-picking; there is no C-wrong to queue.
Minor documentation gap only.

## Verification

Re-measure (`--base 9db173202~1 --no-reach`):

```text
verify do_attack: baseline 9db173202~1 — 2 session(s) blocked on it
  scen-sweep-Monk-50055011: PASS
  scen-sweep-Ranger-50250049: PASS
verify do_attack: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match. Focused test 2/2 green on HEAD (punished: stop +
mflee + first draw `rnd(6)` + no `rn2(7)`; control: `rn2(7)`
drawn). No FORCE/DIAG/seed strings. Rule #2 clean (window
rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
