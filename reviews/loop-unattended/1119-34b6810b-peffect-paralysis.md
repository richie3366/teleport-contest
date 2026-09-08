# Review 1119 — 34b6810b — peffect_paralysis Levitation/steed/surface branches (D-2153)

Metadata: SHA `34b6810b`, js/ +35/−~15 in `potion.js` only. D-log
D-2153. Subject promises: Levitation/air/water/steed/surface branches;
1 session moved past (scen-wish-Valkyrie-92091 @26 → do_statusline2@109).

Intent vs deliverable: promise matches diff. Actually adds: the three
deferred C arms inside the else branch (suspended / frozen-in-place /
feet-to-surface via shared `surface()`), restructured
resist-return into if/else, `Free_action()` house reader replacing the
inline flag check. Tail (nomul/multi_reason/nomovemsg/exercise) moved
inside the else arm per C — behavior change only for the resist path
(which previously also ran the tail; now returns early like C).

Inventory: no new functions; one arm completion + reader swap + two
const imports (`Is_airlevel`, `Is_waterlevel`, `FOOT`) + `surface`
joining an ALREADY edge. `sym.mjs`: `surface → js/sit.js:475 sync`;
`--can potion.js sit.js surface`: ALREADY, no new edge.
`Free_action`/`Levitation` resolve to the house readers shared with
`peffect_sleeping` (D-1419 pattern), not new clones.

**C ↔ JS fidelity**: confirmed against `potion.c:880–898` (csym range;
full 19-line body read here). Branch order and short-circuit exact:
Free_action resist → Levitation||air||water → usteed → feet+surface,
with the nomul tail inside else. `makeplural(body_part(FOOT))` +
`surface(u.ux,u.uy)` verbatim; `nomovemsg` literal is the house
`You_can_move_again` pattern (hack.js:1114). The old hardcoded-floor
message was a genuine C-wrong for stairs (the reported diff); fixed by
deleting wrong JS + re-porting C, per the playbook preference. The
shared `surface()` (`dungeon.c:1749–1788`, csym range) is a 40-line
terrain reader (swallow-maw, air/cloud/bubble, pool/water/bottom, ice,
lava, bridge, altar, stairs/stair, floor ladder arms) — the stairs arm
is what yields «stairs» on the reported step, so importing the export
instead of branching locally covers every future terrain, not just the
one session. Readers: `Free_action()`/`Levitation()` resolve to the
house (H||E)&&!B-block readers shared with `peffect_sleeping` (D-1419
pattern), replacing an inline flag check that predated the house
reader — same truth value, one fewer local interpretation of the
prop/equipment/blocked conjunction. Tail: `nomul(-(rn1(10,
25-12*bcsign(otmp))))`, `multi_reason`, `nomovemsg`, `exercise(A_DEX,
FALSE)` — all four verbatim and all four now correctly gated inside
else (the old early-return resist path skipped them too, but only by
accident of structure; C's if/else makes the resist path draw and print
nothing further, which JS now mirrors). Every C
branch is live — D-log's "none in this function" named-omits claim
holds (19-line function, fully covered).

Hallucinations / overclaim: none.

Density: ~35 insertions for a 19-line C function — one locus, one
module. Right-sized.

Verification: D-log bullet shows `verify.mjs` → hidden moved +
green/strict/cohort. Re-measured:
`hidden-proxy.mjs verify peffect_paralysis --base 34b6810b~1` →
"0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS"
(Valkyrie-92091 → do_statusline2 at 109, was 26). Forward movement to
a later owner; claim true. Banned-pattern grep over js/ hunks: zero
hits. Rule #2 covered by D-log verify PASS.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
