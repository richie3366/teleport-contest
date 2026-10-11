# Review 2695 — d87af6ccb — hitmu gameover gate before knockback

Metadata: SHA `d87af6ccb`, D-3832, cliffs-head `o_init.c`
randomize_gem_colors writer (owner proven already-whole, fifth
time). JS: `js/mhitu.js` (+4/−0: gate + cite comment). Test:
`scripts/done-noreturn-gates.test.mjs` (+1 `it`).

## Intent vs deliverable

Promise: Demogorgon's fatal AD_DRLI drain inside
`mhitm_adtyping` exits C via NORETURN `done()`, never reaching
the unconditional knockback at mhitu.c:1193; JS fell through
and drew knockback's `rn2(3)` + `rn2(6)`. One gameover gate
between adtyping and knockback; chain-578106 → FULL PASS. Diff
actually does: exactly that gate, no imports, no signature
change. Match.

## Inventory

- `hitmu` (js/mhitu.js:3215–3219) — changed: gate only. C:
  `hitmu nethack-c/upstream/src/mhitu.c:1143–1267` (csym):
  `mhm.damage = d(damn, damd)` + midnight bonus, then
  `mhitm_adtyping(...)` immediately followed by unconditional
  `(void) mhitm_knockback(...)`, then `if (mhm.done) return`.
  C callers (csym `--callers`): mhitu.c:812 (melee), :828
  (hugs), :913 — all pre-wired per the D-log's Callers bullet
  (js/mhitu.js:4049/:4068/:4144), no caller change needed.
- No new helpers, imports, deletes, or re-points — nothing for
  `sym.mjs`.

## C ↔ JS fidelity

C order at the locus is adtyping-then-knockback with no
conditional between — but a fatal adtyping never returns:
`done()` is NORETURN (extern.h:997) and the D-log's per-segment
replay shows C's seg2 tail ending through
`mhitm_ad_drli → mgc_atk_negated → can_make_bones → bones →
end` with 2947 draws vs JS's 2949 (the 2 extra JS draws are
knockback's head, C-exact in isolation). The gate
`if (game.program_state?.gameover) return mhm.hitflags;`
mirrors the `mhm.done` return on the next line and the
established D-3732/D-3746 idiom. Lifesave/wizard Die?-decline
safety holds: gameover stays false there, so the gate falls
through per C (the same segment declines Die? before the final
death). Return value `mhm.hitflags` matches the adjacent C
`return mhm.hitflags` shape. No RNG added; none removed from
live paths. Gap: none.

## Hallucinations / overclaim

None. The owner-vs-writer call is evidenced (owner ledger
ported + brief-complete at js/o_init.js:114, D-3820 read once
per the parked-REFUTED tag), the mechanism is measured
(per-segment replay 7/8 exact, seg2 +2; reverted temp stack
probe naming knockback ← hitmu ← mattacku), and the 3
unchanged step-0 voids are named with their exact writers
(KILLED_BY_AN/AIR imports — shipped as D-3833/D-3835, reviewed
2696/2698) rather than claimed.

## Density

Cliff-phase: head writer correct (hitmu post-fatal path, not a
re-port of the whole symptom owner or of knockback, whose head
draws are C-exact). One gate, whole on its path. Ledger:
`hitmu ported` (D-3832 prepended, cite intact). Verify bullet:
1 PASS + REACH-OK ×2 + green + strict + cohort + forced full
44/44 (same code state). Not unreached: probe FULL-PASSES.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide
`imports.mjs --rulecheck`). Re-measure (mine):
`verify hitmu,randomize_gem_colors --base d87af6ccb~1
--reach-all` → hitmu: 0 blocked (writer, expected), reach
652/652 REACH-OK; randomize_gem_colors: 4 blocked at parent →
`1 PASS, 3 moved past, 0 unchanged, 0 worse` (578106 PASS —
this SHA's probe; the 3 voids now moved via the later
D-3833/D-3835 import fixes, consistent with those SHAs'
claims); reach 1142/1142 REACH-OK. Zero regressed. The D-log's
at-the-time claim (1 PASS + 3 unchanged) is confirmed, not
falsified.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
