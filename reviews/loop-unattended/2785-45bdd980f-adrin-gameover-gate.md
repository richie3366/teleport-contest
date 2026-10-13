# Review 2785 — 45bdd980f — AD_DRIN mhitu gameover gate

- **SHA:** `45bdd980f` (Tue 2026-10-13) — cliffs-head randomize_gem_colors writer (D-3932).
- **D-entry:** D-3932. **Ledger:** `mhitm_ad_drin` split (3 arms).
- **Diff size:** `js/mhitu.js` +6/−0 (comment + 1 gate) + 1 test `it`. No board commit.
- **Method:** cliff commit, ≤10 functions — whole Method on the gate + sibling-arm survey.

## Intent vs deliverable (promise vs diff)

The subject promises: the mhitu AD_DRIN arm fell through fatal
`mdamageu` into `eat_brains`+tail (JS `done()` returns where C never
does); a gameover gate after `mdamageu` gives Monk-610158 FULL PASS,
while Wizard-620021 stays step-0 under a separate writer (OBJ_BURIED
throw, named for the next pop).

The diff actually adds: `if (game.program_state?.gameover) return;`
after `mdamageu` in `mhitm_ad_drin_u`, a 4-line C cite, and one
segment-replay test asserting the 5 post-done draws are gone. Promise
and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | gameover gate (mhitu.js:2277) | uhitm.c:3244 → mhitu.c:1925 noreturn | new, placed at the noreturn point |
| 2 | test it (done-noreturn-gates.test.mjs) | Monk-610158 seg5 | new, 6/6 green at HEAD |

No helper added, no import, no signature change. No symbol deleted or
re-pointed; no `sym.mjs` re-point output required.

## C ↔ JS fidelity

C `mhitm_ad_drin` (csym uhitm.c:3167–3303), mhitu arm read in the file:
`mdamageu(magr, mhm->damage)` :3244 → `mhm->damage = 0` → dunce-cap
gate → `eat_brains(…, TRUE, …)` :3249 → umortality/skipdrin →
M_ATTK_MISS return → `adjattrib(A_INT, -rnd(2))` :3263 → two
`if (!rn2(5))` gates :3264/:3268 (losespells, drain_weapon_skill) —
every D-log cite exact. `mdamageu` (csym mhitu.c:1901–1927):
`if (u.uhp < 1) done_in_by(mtmp, DIED)` :1925 ✓; C never returns past a
stood death (NORETURN), while JS `done()` returns — the gate restores
exactly the C control flow at the right point. Lifesave falls through
on both sides (C `savelife` returns from `done`; JS leaves gameover
false) ✓; the Upolyd rehumanize-fatal path (C :1915–1917) is covered
the same way ✓. Gate sits after `mhm.damage = 0` where C's noreturn
skips it — unobservable post-gameover, identical on lifesave. ✓

RNG walk: on stood death the gate removes exactly the 5 named draws
(eat_brains entry rnd(10), exercise rn2(2), adjattrib rnd(2), 2×
rn2(5)); on life/lifesave the stream is untouched. ✓ Sibling survey
holds: C mhitm arm :3272–3303 calls no damage routine before
eat_brains (damage flows out via `&mhm->damage`, applied by the
caller), and neither JS sibling arm awaits `mdamageu` before its
eat_brains — no gate needed there. ✓ Sole C caller uhitm.c:4812
`case AD_DRIN` ✓ (csym).

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (this iteration, cited for all 8 SHAs).

## Hallucinations / overclaim

- "Exactly FIVE extra JS draws" — the committed test asserts segment
  deep-equality (length + content); 6/6 green at HEAD, so the count is
  pinned, not claimed. ✓
- Next's "OBJ_BURIED throw … next pop's writer" is forward-confirmed:
  D-3934 delivered exactly that fix for 620021. ✓
- D-3897 distinguished correctly (gate inside eat_brains vs gate in
  the mhitu caller — different arms). None found.

## Density

Cliff phase (§10.18): parent head was randomize_gem_colors 2/1769
(verified in `45bdd980f~1:docs/LOOP-QUEUE.md`, probes 610158 + 620021
as cited); Must-fix empty. Owner-vs-writer correctly resolved (owner
proven whole, parked-REFUTED honored, writer ported). One cliff, own
Ledger entry, movement + REACH-OK + full 44/44 in one handoff. ✓

Process nit (docs, not a C-wrong): unlike the D-3929 pattern, this
commit boarded nothing — no scoreboard.json, no DONE archive, and the
queue row kept naming 610158 blocked after it passed (the row's
one-line change only re-rendered the divergence text). Self-healed by
Grow #5's full rescore two commits later; no session was misrouted
(D-3934's verify correctly counts 610158 out). Not queueable.

## Verification

Re-measured myself (`--base 45bdd980f~1 --reach-all`, current code):

```
verify randomize_gem_colors: baseline 45bdd980f~1 — 4 session(s) blocked on it (2 at baseline, 2 in the working scoreboard)
  scen-chain-Monk-610158: PASS
  scen-sweep-Wizard-620021: moved → pickup at step 722 (was 0)
  scen-worldtour-Wizard-49955018: still randomize_gem_colors at step 0
  scen-worldtour-Wizard-49955024: still randomize_gem_colors at step 0
verify randomize_gem_colors: 1 PASS, 1 moved past, 2 unchanged, 0 worse → PROGRESS
reach randomize_gem_colors: 1681 baseline-PASS session(s) reach it (1681 run, 990.4s): 1680 PASS, 1 regressed → REACH-REGRESSION
```

610158 PASS reproduces the D-log. 620021's move layers the later D-3934
fix (HEAD code; verified in review 2787). The 2 unchanged are Grow-#5
place_object throw-voids (postdate this SHA; D-3934's Next names their
writer). The 1 regressed is scen-sweep-Priest-582706 — the same known
oracle-side flake traced in review 2784 (PASS boards at e1f185743 and
c639bbbcb, first FAIL at the no-`js/` grow commit d6efb0a28 with a
changed C oracle: 1166→1238 steps, rngT 66936→82230; D-3885
UNPORTABLE park stands). Not a C-wrong from this gate.

## Actionable C-wrongs

None. C cites exact, gate at the noreturn point, siblings surveyed,
movement reproduces, and the sole reach regression is the proven
oracle-side flake.

Verdict: **ACCEPT**
