# Review 1030 — 69ae5b11 — stoning statue + drop cont arm (D-2060)

**SHA:** `69ae5b11` · **D-id:** D-2060 · **Files:** `js/end.js` only
(~30 insertions)

## Intent vs deliverable

Subject promises: "ugrave_arise maintenance + savebones LEAVESTATUE +
drop_upon_death cont arm (queue owner drop_upon_death)". RNG-first in
all three stoning deaths: C `rn2(5) @ drop_upon_death(bones.c:290)`
vs JS `rn2(1000) @ start_corpse_timeout` — C statues, JS corpses:

- scen-death-Knight-92203 step 95 · scen-intrinsic-Caveman-92070
  step 49 · scen-intrinsic-Healer-91105 step 44.

Diff actually adds the three hunks named. Promise matches diff.
No unrelated edits.

## Inventory

| JS function | Change |
|---|---|
| `really_done` (end.js) | ugrave_arise maintenance block |
| `drop_upon_death` (end.js) | cont arm split to `add_to_container` + owt refresh |
| `savebones` (end.js) | LEAVESTATUE statue arm |

## C ↔ JS fidelity

**ugrave_arise — confirms verbatim** against `end.c:1206–1219`
(read in full): PANICKED → NON_PM−3, BURNING/DISSOLVED → NON_PM−2,
STONING → LEAVESTATUE, TURNED_SLIME + `!(mvitals[GREEN_SLIME] &
G_GENOD)` → PM_GREEN_SLIME, in C order. Placement verified: the
block (`end.js:982–986`) precedes the corpse gate (`:1054–1058`,
`bones_ok && ariseUnset && !noCorpse`), so stoning no longer mints
the CORPSE that caused the reported divergence. `NON_PM−3/−2`
literals match C exactly.

**drop_upon_death cont arm — confirms** against `bones.c:258–303`
(`csym` range, read in full): `else if (cont) (void)
add_to_container(cont, otmp)` (`:294–295`, no `rn2(8)` gate) and
`if (cont) cont->owt = weight(cont)` (`:301–302`). JS: `void
add_to_container(cont, otmp)` (`add_to_container` LIVE sync,
`mkobj.js:208`) + `if (cont) cont.owt = weight(cont)`. The old
`if (mtmp || cont) { place; stack; }` conflated the arms; the split
is exactly C's three-way shape. `rn2(5)` curse / SLIME_MOLD /
`rn2(8)` nearby-gate arms untouched. Remaining gaps are named in
the refreshed doc comment: `obj_no_longer_held` (no JS equivalent),
lamp `artifact_light`/`end_burn`, and the **mtmp `add_to_minv` arm
(still places)** — that last one is a live-arm behavioral gap, but
it is named in this commit with a C citation (OMIT, not a silent
wrong) and no blocked session reaches it (all three deaths take
the cont arm).

**savebones LEAVESTATUE arm — confirms** against `bones.c:480–489`
(read in full): `mk_named_object(STATUE, &mons[u.umonnum], ...)`
→ `drop_upon_death(0, otmp, ...)` → `if (!otmp) return`, then the
shared tail with mtmp NULL (no ghost). JS mirrors order including
drop-before-null-check. Sentinel check: `LEAVESTATUE = NON_PM−1 =
−2` (`const.js:3115–3117`, same as C), so the pre-existing
`arise >= 0` undead-arise gate correctly falls through to it; the
ghost block sits inside the `else`, so the statue path takes the
shared tail ghostless as C does.

**`mk_named_object` clone — verified.** This commit routes a live
arm through the file-local clone (`end.js:1164`), so I matched it
to C `mkobj.c:2251–2267` (17 lines, read in full): CORPSTAT_INIT
vs NONE flag, `mkcorpstat`, conditional `oname`, return — verbatim.
`mkcorpstat` is LIVE. CLONE-verified, not drift.

## Hallucinations / overclaim

None. The intermediate `(void) expr` syntax slip is disclosed in
the D-log (fixed to `void expr`, final verify after). Killer-based
arise (`end.c:326–340`) and the undead-arise mtmp arm stay named.

## Density

~30 insertions, one death-path envelope. Right-sized (C loci small).

## Verification

Re-measured myself:

```text
node scripts/hidden-proxy.mjs verify drop_upon_death --base 69ae5b11~1
verify drop_upon_death: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-death-Knight-92203: PASS
  scen-intrinsic-Caveman-92070: PASS
  scen-intrinsic-Healer-91105: PASS
```

Identical to the D-log. Diff grep: no FORCE/DIAG/RNG-log/seed
gates. Green 2/2, strict ×2, cohort 7/7 per D-log.

## Actionable C-wrongs

None. (The mtmp `add_to_minv` gap is a named OMIT in this commit's
map comment — a future Open row when a corpus session reaches it,
not Must-fix.)

Verdict: **ACCEPT**
