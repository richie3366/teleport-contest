# Review 888 — 4a49397f — lava_effects Wwalking live re-read (D-1918)

Metadata: SHA `4a49397f`, D-1918. Files: `js/trap.js` (+16/−3:
one closure + three call-site swaps). Closes the review-883
Must-fix row (lava Wwalking staleness). No new imports, no RNG
change, no map row added. Next index 888.

Intent vs deliverable: subject promises a live Wwalking re-read at
the three post-boots points, keeping the entry snapshot for entry
`usurvive` + the invent flag loop. The diff delivers exactly that:
one `liveWwalking()` closure plus three call-site swaps (the
`if (Wwalking)` burns-you gate, the `if (!Wwalking)` double-lifesave
countermeasure, the `else if (!Wwalking …)` sink arm). Promise ≡
diff; nothing else in the hunk.

Inventory: one new helper — the `liveWwalking` closure. It is a
macro re-read, not a C callee: the same slot+flats+`Is_waterlevel`
idiom as the entry snapshot (`HWwalking`/`EWwalking`/`Wwalking`
flats plus `uprops[WWALKING]` intrinsic/extrinsic, gated on
`!Is_waterlevel(u.uz)`). No C callee added, no clone of a C
function, no stub, no named omit. No symbol deleted or re-pointed,
so no `sym.mjs` re-point output is owed (the closure is function-
local; `sym.mjs liveWwalking` correctly reports NOT FOUND).

**C ↔ JS fidelity** (`csym lava_effects` →
`nethack-c/upstream/src/trap.c:6792-6987`, read in full): C
computes `usurvive = Fire_resistance || (Wwalking && dmg < u.uhp)`
at entry, before the flag loop and before the boots-burst — JS
keeps the entry snapshot there, correct. The boots-burst
(`Boots_off`, C `:6855-6868`) runs before `if (!Fire_resistance)
{ if (Wwalking)` (C `:6870-6871`), so all three later `Wwalking`
reads are post-burn live macro evaluations — JS `liveWwalking()`
at exactly those three points matches. The countermeasure
`if (!Wwalking) set_itimeout(&HWwalking, 5L)` (C `:6962-6963`)
and the sink arm `else if (!Wwalking && …)` (C `:6980`) are likewise
post-burn reads. `Fire_resistance` stays snapshot, which is safe:
boots grant no Fire, and inside the `!Fire` branch nothing re-grants
Fire before the countermeasure/`boil_away` reads, so snapshot ≡
live at every read point. The entry flag loop uses entry `usurvive`
in both. No RNG touched anywhere in the hunk. The deconfer chain
(Boots_off→clear_worn→setworn→confer_oc_oprop clearing
`uprops[WWALKING].extrinsic`) was traced in-tree in the D-log with
file:line cites; the closure reads that exact slot plus the flats,
so the true→false flip is observed.

Hallucinations / overclaim: none. The D-log makes no corpus-PASS
claim and labels the hidden verify vacuous with 0 cited blocks.
The hand probe is a true falsifier (same setup pre-fix: `uhp` 83,
no gameover on the stale burns-you path; post-fix: `uarmf` burned,
extrinsic 0, `uhp` 0, gameover on the fall path).

Density: 19-line Must-fix, one locus, one predicate — right-sized;
C is that small here.

Verification: re-measured `hidden-proxy verify lava_effects --base
4a49397f~1` → `0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)` — vacuous as stated, map-driven row, no
`--base` debt. `imports.mjs --rulecheck` → Rule #2 clean (HEAD).
D-log gates: green 2/2 + strict ×2, cohort 7/7. Diff grep: no
FORCE/DIAG/seed/coordinate patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
