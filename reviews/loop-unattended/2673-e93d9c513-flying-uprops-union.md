# Review 2673 — e93d9c513 — do_statusline2 writer: shared Flying() uprops union

Metadata: SHA `e93d9c513`, D-3809, cliff row-2 `botl.c` do_statusline2
writer (@6657185de; row-1 void-barred, falsifier live-checked). JS:
`js/mhitu.js` (+7/−4, Flying() only). Test:
`scripts/flying-uprops-union.test.mjs`.

## Intent vs deliverable

Promise: shared Flying() read flats only while worn-amulet extrinsic
lives in uprops[FLYING]; now the D-1085 union (flats OR slot H/E,
either blocked source). Claimed: 95212 PASS, 95323 unchanged (separate
writer). Diff actually does: union + cite + FLYING import. Match.

## Inventory

- `Flying()` (js/mhitu.js:707) — changed: slot reads added. C
  `youprop.h:253–256` (macro; csym-equivalent header cite).
- No new helpers, no deletes, no re-points; FLYING joins the existing
  const.js edge (ALREADY, no new edge). Signature unchanged; all 40
  call sites in 20 files inherit.

## C ↔ JS fidelity

C: `Flying = ((HFlying || EFlying || (u.usteed &&
is_flyer(u.usteed->data))) && !BFlying)` with H/E/B ≡
uprops[FLYING].intrinsic/extrinsic/blocked. New JS: `(flats H/E OR
slot H/E OR steedFlyer) && !(flat B OR slot B)` — the D-1085 union,
character-for-character the display.js _statusLine2 arm shape
(:6920–6925), so the bl_fly reader (botl.js:3462) and the painter now
agree. `u.Flying` early-true and steed arm kept (pre-existing; the
painter shares the early-true). Measured ground truth: /tmp prefix
probe at step 296 showed uprops[FLYING].extrinsic=65536 (W_AMUL), all
flats unset — the slot is the live store for worn amulets
(confer_oc_oprop never mirrors EFlying). C screen sequencing (288–300:
puton prompt, wear + More-block at T:13, fresh status AT the block via
pline.c:273–274 flush→bot) confirms the paint ran and the reader lied.
No RNG in the macro; none added. Standing: `sym.mjs Flying` shows 7
local clones in 7 files (D-1085 deferred them; engrave fixed there) —
pre-existing, untouched by this diff, no probe reaches them.
Gap in this diff: none. Macro-by-macro confirm.

## Hallucinations / overclaim

None. Owner verified painter-correct (its Fly arm already full union)
and not re-ported. The 95323 unchanged is diagnosed as a separate
menu-pagination writer with C cites (wintty.c:1537–1547 page size,
dungeon.c:3650 quest line) and a Next-row plan — honest split per the
D-3805 precedent, not scope-dodging.

## Density

Cliff-phase: writer correct, macro now whole vs C :253–256 for the
shared reader. Levitation()'s same-shape gap explicitly left standing
(no probe reaches it — no sweep without a block, consistent with
D-3802/D-3805). Ledger: `do_statusline2 partial` (owner row tracks the
95323 writer). Verify bullet: movement + REACH-OK + green + strict +
cohort + explicit full 44/44 (shared-reader change — appropriate).
Not unreached: probe session PASSes.

## Verification

Added-lines grep: clean. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify do_statusline2 --base e93d9c513~1
--reach-all` → `1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS`
(95212 PASS; 95323 still do_statusline2@1297) and `smoke 24/24 →
REACH-OK` — exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
