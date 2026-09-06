# Review 877 — d0baca4d — uhitm.c mhitm AD_SGLD/AD_TLPT/AD_WERE/AD_SLIM mon→mon arms (D-1907)

Metadata: SHA `d0baca4d`, D-1907. Files: `js/mhitm.js` (+248: 4
exported arms + 4 `mdamagem` dispatch blocks + AD consts/imports).
Next index 877.

Intent vs deliverable: subject promises the four mon→mon arms with
the dispatch envelope, uhitm/mhitu left named. The diff delivers
exactly that. Promise ≡ diff.

Inventory: 4 new exports (`mhitm_ad_sgld/tlpt/slim/were`); 4 new
dispatch blocks in the pre-existing `mdamagem` envelope
(`:2757`, same knockback/done/damage/monkilled/grow_up tail as the
neighbour fire/wrap/slee arms — convention, not invention).
Callee closure: `findgold` (`steal.js:52`), `munslime`
(`muse.js:1540` async, awaited), `obj_extract_self`/`add_to_minv`
(`mkobj.js`), consts — `--can` on all three module edges:
ALREADY static, no new edge. `mhitm_ad_phys` (were target) is a
pre-existing same-file local from the D-1864/65 phys work, not
introduced here. Nothing deleted or re-pointed.

**C ↔ JS fidelity**: sgld mhitm arm ≡ `:2823–2855` (damage=0 →
mcan return → `!gold` return BEFORE WAITFORU → extract/add →
WAITFORU clear → saved-Monnam → vis pline → `!tele_restrict`
rloc + disappears) ✓; tlpt arm ≡ `:2929–2955` (silent
short-circuit incl. `tele_restrict(mdef)` → negation(TRUE) +
vis `pline_mon` → name-saved-first rloc + usteed-excluded
disappears → 1→2 bump clamp) ✓; slim arm ≡ the mhitm leg of `:3525–3600`
(negation(FALSE) computed before the `rn2(4)` gate — RNG order
exact → slimeproof → `munslime(FALSE)` → NC_SHOW_MSG newcham →
WAITFORU/HIT → AGR/DEF-DIED OR → damage=0) ✓; were arm ≡
the mhitm leg of `:4264–4293` (`mhitm_ad_phys` + done — the in-callee
`if (done) return` rides on the dispatch's identical check,
same outcome) ✓. `is_youmonst` guards fence the shipped arms to
mon→mon; hero arms are named omits with owners, not stubs.
Nits: cited ranges drift one line vs `csym` (`:2790–2857` vs
`:2789–2855`, same ×3) — bodies exact, ranges cosmetic.

Hallucinations / overclaim: none. "No hand probe" is disclosed
with the reason (no session reaches these arms; call shapes match
covered neighbours).

Density: 248 insertions, four arms of one C family + envelope —
right size.

Verification: D-log gates PASS incl. full 44/44 (shared file).
Re-measured: `verify mhitm_ad_sgld --base d0baca4d~1` → 0
blocked (0/0), vacuous as stated; map row cited no blocks.
Diff grep: no banned patterns. Rule #2 clean.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
