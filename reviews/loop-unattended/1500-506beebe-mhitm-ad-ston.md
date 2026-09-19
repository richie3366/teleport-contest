# Review 1500 — 506beebe — uhitm.c mhitm_ad_ston (D-2541)

## Metadata

- SHA: `506beebe`
- D-id: D-2541. Next index: 1500.
- Files: `js/mhitm.js` (uhitm arm + export + 2 import names),
  `js/uhitm.js` (AD_STON dispatch row).
- C locus: `nethack-c/upstream/src/uhitm.c:4202–4262`
  (`mhitm_ad_ston`, 61 L).

## Intent vs deliverable

Subject promises: whole `mhitm_ad_ston` in C order (THIN → live),
uhitm arm ported, both C callers wired. Diff actually adds: the
`:4209–4214` uhitm arm, the `export`, `munstone`/`minstapetrify`
import names, and the uhitm.js AD_STON row. Promise matches
deliverable. RNG 2 via the mhitm-arm `d()` (pre-existing
do_stone_mon path); no new RNG.

## Inventory

- Changed: `mhitm_ad_ston` file-local → exported async
  (`js/mhitm.js:1500` — `sym.mjs` single hit, async).
- Changed: two import lines extended on pre-existing edges
  (muse.js, trap.js) + uhitm.js AD_STON row.
- No deleted or re-pointed symbols → no clone→import audit needed.

## C ↔ JS fidelity

C body `:4202–4262` vs JS, arm by arm:

- uhitm (`:4209–4214`, new): `if (!(await munstone(mdef,
  true))) await minstapetrify(mdef, true); mhm.damage = 0;`
  ≡ C `if (!munstone(mdef, TRUE)) minstapetrify(mdef, TRUE);
  mhm->damage = 0;` — exact, including the negated-cure shape.
  Callee signatures checked: `munstone(mon, by_you)` returns
  boolean (muse.js:1419); `minstapetrify(mon, byplayer)`
  (trap.js:3380). Both LIVE. Confirm.
- mhitu (`:4215–4253`): early-returns to the live split
  `mhitm_ad_ston_u` (mhitu.js:2297), routed from the hitmu
  AD_STON dispatch (mhitu.js:3157) — hitmsg, rn2(3)/rn2(10)/
  NEW_MOON gates per the JSDoc. Nothing dropped on a live path.
  Confirm.
- mhitm (`:4254–4261`, kept): `if (magr.mcan) return;
  do_stone_mon(…); if (mhm.done) return;` ≡ C including the
  cancelled-keeps-leftover-`d()` shape (no damage zeroing on the
  mcan path, unlike blnd/slee). Confirm.

Callee closure: every callee live or in the pre-existing split;
the message's "none in this body" holds (mhitu-side Soundeffect/
killer-string gaps stay named in `_u`). No STUB in any live arm.

Callers: C's sole call site `:4796` (mhitm_adtyping) is wired on
both direction splits — mhitm.js:4011 (pre-existing D-1352 row,
now reaches the full 3-arm body) and the new uhitm.js damageum
row. Confirm.

## Hallucinations / overclaim

None. Both imported callees verified live with matching
signatures; the split delegation is routed, not merely named.

## Density

One 61-line C function + one dispatch row, two files already
linked. Right-sized per §2b.

## Verification

- D-log: syntax (2 changed) · rule2 · hidden note (0 blocked) ·
  reach 14/14 · green 2/2 · strict ×2 · cohort 7/7 · full skipped
  → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify mhitm_ad_ston --base
  506beebe~1 --reach-all` → 0 blocked both trees + **14
  baseline-PASS sessions reach it, 14 PASS, 0 regressed →
  REACH-OK** (real reach, not smoke). Matches — stronger than
  the smoke-only SHAs.
- `imports.mjs --rulecheck`: clean. Diff grep: 0 hits for
  FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
