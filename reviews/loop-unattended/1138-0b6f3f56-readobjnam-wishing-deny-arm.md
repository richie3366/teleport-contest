# Review 1138 — 0b6f3f56 — objnam.c readobjnam wishing-abuse deny arm (D-2172)

Metadata: SHA `0b6f3f56`, js/ +9/−5 across `readobjnam.js`,
`quest.js` (+1 import edge). D-log D-2172. Subject promises:
quest artifacts skip the `rn2(nartifact_exist())` roll in C (`||`
short-circuit); JS rolled unconditionally (Rogue-92221 PASS).

Intent vs deliverable: promise matches diff. Actually adds: (a)
single-`if` deny condition with C short-circuit order in
`readobjnam`, (b) 1-word `export` on the existing local
`is_quest_artifact` in `quest.js` + its import. One C arm family,
one predicate — right-sized; C arm is that small.

Inventory: no new functions. One re-pointed symbol: local
`is_quest_artifact` → imported export. `sym.mjs` output:

```text
is_quest_artifact js/quest.js:275   sync
         !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
           js/detect.js:290  js/dogmove.js:102  js/dothrow.js:430  js/mon.js:1429
```

The 4 remaining clones are behavior-identical predicates the
D-log names as staying as-is (no behavior change, no new clone —
reuse, not dedupe). Acceptable; not a stub in a live arm.

**C ↔ JS fidelity**: confirm, two loci read at HEAD.

(a) Deny arm. C `objnam.c:5371–5380`:
`if ((is_quest_artifact(d.otmp) || (d.otmp->oartifact &&
rn2(nartifact_exist()) > 1)) && !wizard)` with `artifact_exists`
+ `obfree` + `hands_obj` + pline. JS now evaluates the identical
single `if` with identical operand order, so quest artifacts take
zero RNG draws (short-circuit before `rn2`) and non-quest
artifacts always roll with `&& !wizard` last — including wizard
mode, which the old JS comment's claim ("evaluate even when
wizard") had lumped together wrongly for quest items. Deny path
stays bare `HANDS_OBJ`; the `artifact_exists`/`obfree`/pline tail
is a named omission in the D-log (pre-existing JS shape,
unreached by any corpus session), not a silent drop.

(b) Predicate. C `questpgr.c:66–70`: `oartifact ==
gu.urole.questarti`. JS `quest.js:275`: same comparison against
`game.urole?.questarti | 0`, plus a `want !== 0` guard C lacks.
Unreachable divergence in practice (every role has nonzero
questarti; the call site additionally requires `oartifact`
truthy on the right arm). The guard only narrows the both-zero
case C would deny — no corpus session reaches it. Not queued.

RNG call-for-call: the arm draws at most one `rn2`, in the same
position as C, or zero for quest artifacts. No other RNG touched.

Hallucinations / overclaim: none. D-log traces are C-cited and
specific (step-92 `d(4,10)=22 @ touch_artifact` vs JS `rn2(1)=0
@ readobjnam:1280`; Master Key of Thievery = Rogue questarti, so
C short-circuits). The "side-effect repair" claim (non-wizard
quest wishes now always denied) follows directly from the C `||`.

Density: ~10 insertions for a 10-line C arm + 5-line predicate —
C is that small. 71c6e030 (same message, docs-only queue +1) is
not a duplicate port, just the queue stamp split; no js/ there.

Verification: D-log cites `verify.mjs --fn touch_artifact` → 1
PASS + 1 unchanged, green 2/2, strict ×2, cohort 7/7.
Re-measured independently: `hidden-proxy.mjs verify
touch_artifact --base 0b6f3f56~1` → baseline 2 blocked, `1 PASS,
0 moved past, 1 unchanged, 0 worse → PROGRESS` (Rogue-92221
PASS; Valkyrie-92014 honestly still touch_artifact@49, re-queued
as its own `end.c savelife` Open row — no NO-MOVEMENT-as-omission).
Exact match. `imports.mjs --rulecheck` clean; `--can` reports the
quest.js edge already existed statically (no new edge, hoisted
function, runtime call only). No FORCE/DIAG/seed/coordinate gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
