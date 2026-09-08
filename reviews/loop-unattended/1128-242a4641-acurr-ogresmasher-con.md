# Review 1128 — 242a4641 — attrib.c acurr/extremeattr A_CON Ogresmasher (D-2162)

Metadata: SHA `242a4641`, js/ +4/−3 in `attrib.js` only (one
import name + one generated-data import + two one-line arms).
D-log D-2162. Subject promises: wielded Ogresmasher pins CON at
25 — scen-wish-Valkyrie-92206 step 253/321, screen-first at
`botl.c:85` (C `Co:25` vs JS `Co:18` with identical toplines,
both sides wielding the wished hammer).

Intent vs deliverable: promise matches diff. Actually adds: `if
(u_wield_art(ART_OGRESMASHER)) result = 25;` in `acurr` and `if
(u_wield_art(ART_OGRESMASHER)) lolimit = hilimit;` in
`extremeattr`, each in exact C branch position, replacing two
`deferred` comments. No scope creep.

Inventory: no new functions; two changed arms. Callee closure:
`u_wield_art → js/artifact.js:722 sync` — LIVE export, and this
commit correctly extends the existing import list rather than
adding a fifth local clone (`sym.mjs` flags 4 clones elsewhere
with "IMPORT the export; do NOT add another" — obeyed).
`ART_OGRESMASHER` from `js/generated/artifacts_data.js:20`
(`= 16`); I counted pinned `artilist.h` `A(` entries 0-based —
Ogresmasher is index 16. Correct. `imports.mjs --can attrib.js
artifact.js u_wield_art` → ALREADY. No deleted symbols.

**C ↔ JS fidelity**: confirm against pinned C. `acurr`
(`attrib.c:1225–1227`): C `} else if (chridx == A_CON) { if
(u_wield_art(ART_OGRESMASHER)) result = 25; }` — JS identical,
including the empty-else shape (no fallthrough into the
INT/WIS arm). `extremeattr` (`attrib.c:1280–1282`): C `} else
if (attrindx == A_CON) { if (u_wield_art(ART_OGRESMASHER))
lolimit = hilimit; }` — JS identical. Sibling-arm claims check
out: STR-GoP/Dunce live in the hunk context, A_DEX has no C arm
(`; /* there aren't any special cases for dexterity */`).
Draw-free state paint, so no RNG call to walk.

Hallucinations / overclaim: none. Owner-vs-writer attribution is
explicit (painter `do_statusline1`, writer `acurr`) and the
verify ran under the queue-row owner name, per convention.

Density: 4 insertions for a two-arm C locus — below the ~40
soft floor, but C itself is two lines; the exception the rule
allows ("unless C is that small"). Fine.

Verification: D-log Verify bullet shows `verify.mjs --fn
do_statusline1` → hidden moved do_statusline1@253 →
exercise@313 + green + strict + cohort 7/7. Re-measured myself:
`hidden-proxy.mjs verify do_statusline1 --base 242a4641~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Valkyrie-92206 moved → exercise at step 313, was 253) —
matches exactly, later owner, no regression. No
FORCE/DIAG/seed-gate in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
