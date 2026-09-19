# Review 1534 — e4cd69b0 — uhitm.c mhitm_ad_sedu (D-2575)

## Metadata

- SHA: `e4cd69b0`
- D-id: D-2575. Next index: 1534.
- Files:
  - `js/mhitm.js` (+102/−4: new exported `mhitm_ad_sedu` + mdamagem
    AD_SITM/AD_SEDU/AD_SSEX dispatch block).
  - `js/mhitu.js` (+17/−10: local renamed `mhitm_ad_sedu_u`, 2 retired
    omits, 2 rewired call sites).
  - `js/uhitm.js` (+7/−7: `steal_it` exported, damageum arm routed
    through the shared body).
- C locus:
  - `nethack-c/upstream/src/uhitm.c:4622–4748` (`mhitm_ad_sedu`).
  - `nethack-c/upstream/src/uhitm.c:4750–4779` (`mhitm_ad_ssex`).
  - `nethack-c/upstream/src/uhitm.c:4799` + `mhitm.c:1059–1073`
    (adtyping dispatch + post-dispatch tail).
  - All via `node scripts/csym.mjs` (ranges cited above).

## Intent vs deliverable

Subject promises:

> `uhitm.c` mhitm_ad_sedu whole-body port (uhitm steal_it + mhitm
> minvent theft, mhitu _u split) (D-2575).

Diff delivers that plus the mdamagem dispatch block wiring the three
damage types through the shared arm. Promise matches deliverable.

## Inventory

- New:
  - `mhitm_ad_sedu(magr, mattk, mdef, mhm)` — exported async,
    `js/mhitm.js:1293`. `sym.mjs` reports a single export.
- Re-pointed (required `sym.mjs` output, pasted here):
  - local `mhitm_ad_sedu` → `mhitm_ad_sedu_u` (`js/mhitu.js:2185`,
    single local — correct, the mhitu arm has no C home of its own).
  - `steal_it` now exported (`js/uhitm.js:2088`, single export; was the
    sole definition, so promote-not-clone).
  - `mhitm_ad_sedu` resolves to the new mhitm.js export only.
  - No clone #2 created anywhere.
- Callees, all LIVE (each verified via `sym.mjs` this iteration):
  - `steal_it` (uhitm.js:2088, async-awaited).
  - `doname` (objnam.js:3039).
  - `extract_from_minvent` (worn.js:653).
  - `mselftouch` (trap.js:1199, async-awaited).
  - `Adjmonnam` (do_name.js:1210 — joins an existing import).
  - `locomotion` (monmove.js — joins an existing import).
- Pre-existing file locals reused (not new clones):
  - `deadmonster` (mhitm.js:763 — DEADMONSTER macro house form).
  - `_mm_vis` (mhitm.js:356 — `gv.vis` house pattern, used by a dozen
    arms).
  - `mlet === 'S_NYMPH'` string form matches house style (S_TROLL /
    S_KOP / S_MIMIC precedent sites).
- `imports.mjs --can mhitm.js uhitm.js steal_it` → ALREADY, no new edge.
- No STUB in any live arm.

## C ↔ JS fidelity

C mhitm arm (`:4693–4747`), in source order:

- mcan early return. Match.
- Steal loop (`!mtame || !cursed`, break-first). Match.
- `x_monnam(mdef, ARTICLE_THE, null, 0, false)`. Match.
- usteed + saddle → `dismount_steed(DISMOUNT_POLY)`. Match.
- `extract_from_minvent(mdef, obj, TRUE, FALSE)`. Match.
- vis-gated `doname` (`_mm_vis` for `gv.vis`). Match.
- `(void) add_to_minv`. Match.
- `Monnam` buf + vis&&canseemon steals-pline. Match.
- `possibly_unwield(FALSE)`. Match.
- WAITFORU clear. Match.
- `mselftouch(mdef, null, false)`. Match.
- DEADMONSTER → DEF_DIED | (grow_up ? 0 : AGR_DIED) + done. Match.
- S_NYMPH + !tele_restrict → AGR_DONE **without** done + `rloc`
  RLOC_NOMSG + kept TODO comment + vis&&couldspot&&!canspotmon
  disappears-pline. Match (the "sets hitflags without done like C"
  subject note is exact).
- Tail `damage = 0`. Match.

Other arms:

- uhitm (`:4629–4632`): steal_it + zero. Match.
- mhitu early-return names the `_u` home (`is_youmonst(mdef)`). Match.
- The `_u` body was read in full here: animal hitmsg/mcan, dmgtype
  SEDU/SSEX brag + RLOC_MSG + AGR_DONE/done, mcan Adjmonnam +
  `rn2(3)` rloc, steal −1/0/default switch with the `:4683–4687`
  animal locomotion pline (both previously named omits, now retired),
  monflee + AGR_DONE + done. The whole `:4633–4691` arm is present.

Dispatch verified, not trusted:

- C `mhitm_ad_ssex` mhitm arm (`:4775`) calls sedu with **no SYSOPT
  gate** (gate is mhitu-arm-only, `:4760`) — read both bodies here —
  so routing AD_SSEX straight to sedu is exact.
- ssex's `if (done) return` is subsumed: the JS block checks `mhm.done`
  right after the call.
- The block replicates the `mhitm.c:1059–1073` post-adtyping tail
  call-for-call (knockback preempt → done → !damage → hitflags); sedu
  always zeroes, so returning before the damage tail is correct.
- uhitm damageum arm routes through the shared body with
  `game.youmonst` as magr; C's ssex-uhitm `done` check never fires
  (uhitm arm never sets done), and the shared arm zeroes damage
  itself. Equivalent.

## Hallucinations / overclaim

None. The `mhitm_ad_ssex` remainder (SYSOPT/could_seduce/doseduce
mhitu body) is map-named as its own future row, not claimed live.

## Density

~126 `js/` insertions for one 127-line C function across its three
homes + dispatch — one function family, right size (§2b).

## Verification

- D-log claims VERIFY PASS on a coverage row (0 blocked at baseline).
- Re-ran here (required):
  - `hidden-proxy verify mhitm_ad_sedu --base e4cd69b0~1 --reach-all`
  - → 0 blocked at baseline and tree (vacuous note, expected)
  - → smoke 24/24 REACH-OK.
- Claim confirmed, not vacuous-by-rewrite.
- `imports.mjs --rulecheck`: clean (run this iteration).
- No RNG-order change: the only RNG (`rn2(3)`) sits in the pre-existing
  `_u` arm, behavior untouched.
- Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward` content.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
