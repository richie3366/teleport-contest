# Review 2743 — 5959af895 — mquaffmsg You_hear unseen arm

Metadata: SHA `5959af895`, D-3886, `js/muse.js` only (+ focused test),
1 function. Cliff-phase writer fix (D-2941 named omission closed).

Intent vs deliverable: subject promises the unseen arm (`:298–300`) now
calls `Soundeffect` + live `You_hear` instead of an inline `pline`,
moving Ranger-582637 s192 and Barbarian-582612 s601 to PASS. Diff
actually adds: `hero_Deaf` added to the existing monmove import edge,
`se_mon_chugging_potion` added to the existing generated-seffects edge,
and the `else` → `else if (!hero_Deaf())` rewrite with the two C-order
calls. Promise = diff. No new import edge.

Inventory: `mquaffmsg` (js/muse.js:1353) — changed, unseen arm only.

C ↔ JS fidelity: C `nethack-c/upstream/src/muse.c:292-302` (via
`csym.mjs`): `if (canseemon) { observe_object; pline_mon(...drinks...);
} else if (!Deaf) { Soundeffect(se_mon_chugging_potion, 25);
You_hear("a chugging sound."); }`. JS is now call-for-call identical in
branch order: `canseemon → observe_object → pline_mon(Monnam…drinks…)`,
`else if (!hero_Deaf()) → Soundeffect(se_mon_chugging_potion, 25) →
You_hear('a chugging sound.')`. Deaf gate: C macro is
`(HDeaf || EDeaf || u.uroleplay.deaf)` (youprop.h:125); `hero_Deaf()`
(js/monmove.js:1210) computes exactly those three terms plus the sticky
`u.Deaf` flat — term-identical to the deleted inline, so the gate swap
is provably neutral. `You_hear` is the live export (already imported);
`Soundeffect` the contest no-op stub (already imported). No RNG in the
body. Sees-arm untouched and already C-shaped.

Hallucinations / overclaim: none. D-log is explicit that the corpus
verify ran on `You_hear` (the blocked owner) and that `verify mquaffmsg`
was 0-blocked ("NOT a corpus PASS"). The dream-prefix mechanism (live
`You_hear` Unaware arm) is evidenced by the s190 zap already dreaming
through the same export.

Density: one cliff writer, whole-function claim now true (`:293–302`
all arms live). Sibling inline-Deaf sites named as separate C functions
left untouched — correct scoping, not a miss. Ledger touch present.
Session-reaching (2 probes).

Verification: re-measured myself. `verify You_hear --base 5959af895~1
--reach-all`: 2 blocked at baseline, both PASS on current code
(`scen-sweep-Ranger-582637: PASS`,
`scen-worldtour-Barbarian-582612: PASS`), `2 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS`, smoke 24/24 REACH-OK. D-3886 movement
claim reproduces exactly; no REGRESSED row. `sym.mjs hero_Deaf`:
exported sync at monmove.js:1210; the deleted inline is gone (no new
clone; the 3 pre-existing clones elsewhere are untouched and out of
scope). Rule #2 clean (checked this iteration). No FORCE/DIAG/seed/
coordinate reads in the diff.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
