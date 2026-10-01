# Review 2165 — 9cc52a0d2 — enlightenment split-completion (pray + from_what gaps)

SHA `9cc52a0d2`, D-3205; 2026-10-01; `js/invent.js` only (+1014/−~100).
Three-function same-file cluster (insight.c): status_enlightenment +
attributes_enlightenment + enlght_combatinc. Closes no prior review.

**Addressed:** D-3207 `8a149124b`

**Addressed:** D-3208 `c70774a6c`

## Metadata

- Subject: "`insight.c` status_enlightenment + attributes_enlightenment
  + enlght_combatinc whole (split-completion cluster)".
- Promises: close the listed status/attributes arms + 4 C-wrong fixes;
  Named: none for all three functions.

## Intent vs deliverable

Nearly kept — two gaps against the "whole/none" claim. The diff
delivers every listed arm plus the 4 fixes, all verified C-exact
below. But (1) the attributes pray else-arm (C `:1937–1955`) exists
only in the overlay builder — the `enlightenment()` builder (reachable
with final=0 via potion/zap) omits it, so in-progress magic
enlightenment lacks the "can safely pray" line C emits; (2) the new
Clairvoyant blocked arm's `from_what(-CLAIRVOYANT)` suffix is stubbed
— `js/attrib.js` handles only the BLINDED negative case where C
handles three (the INVIS case gaps the pre-existing blocked-invisible
arm too).

## Inventory — status_enlightenment

Changed: `status_core_lines` (Riding/steedname/youtoo hoist, Riding
line, Levitation/Flying, Underwater chain, Punished dead-impossible,
saddle, Wounded_legs, Glib), tux + nudist in both builders. New local
`enlght_combatinc` (inventoried under its own function). Deleted:
the Wounded_legs hardcoded-legs inline (re-pointed to
body_part/mbodypart) and the overlay N_times inline (re-pointed to
the insight.js import):

```text
N_times          js/insight.js:232   sync (single home; inline clone gone —
  only the two builder imports + two call sites reference it)
Levitation       js/mhitu.js:717   sync (canonical import, no clone #11)
Flying           js/mhitu.js:725   sync (canonical import, no clone #8)
```

All 17 dynamically-imported names (worn/do_wear/polyself/dungeon/
dbridge/potion/monsters/mkobj/were/spell/objnam) verified exported;
all are lazy dynamic imports reusing live edges (no static-cycle
risk). 16 consts join the existing const.js import (all resolve —
gates load the graph).

## C ↔ JS fidelity — status_enlightenment

C `insight.c:939–1266` (csym range), walked arm by arm. Riding def
(riding-accident killer exclusion via game.killer.name) ✓; steedname
(x_monnam YOUR/THE + SUPPRESS pair) ✓; youtoo accumulation ✓; Riding
line in C position ✓. Levitation: canonical macros + Lev_at_will
bit-exact vs youprop.h:242–245 (I_SPECIAL/W_ARTI with the TIMEOUT and
residual masks) ✓; Flying elif with youtoo ✓. Underwater chain:
`Underwater ≡ u.uinwater` (youprop.h:279) so the elif is dead in C —
ported as written ✓; walking_on_water (pool/lava/surface) ✓.
Punished: gated on uball with the dead impossible arm present ✓.
Saddle: live which_armor + cursed + s_suffix(steedname) +
simpleonames ✓. Wounded_legs: EW&BOTH_SIDES, steed→mbodypart /
hero→body_part(LEG), plural/article/left-right, wizard-steed
enl_msg vs you_have ✓ (the hardcoded-legs C-wrong fixed). Glib:
intrinsic-only (youprop.h:112) + fingers_or_gloves(TRUE) + wizard
timeout ✓. Tux in both builders (combatinc + suit suffix) ✓. Final
nudist: `final ? 'did' : 'do'` ✓ (fix verified); wearing_armor ≡ the
C 7-slot test ✓. Pre-existing arms (transformed→encumbrance) re-read
in post-image: C order and texts hold. `wizard||debug` ≡ C
flags.debug (flags set together; wizard→debug implication holds) ✓;
ENL consts 0/1/2 ✓. Verdict: ACCEPT.

## Inventory — attributes_enlightenment

Changed: the MAGIC block in `enlightenment()` + the magic block in
`doattributes()` (overlay): hofe, Warn×3, Undead, Clairvoyant+blocked,
Detect, umconf, Adornment, blocked-Stealth, Aggravate, Conflict,
Teleportation, BLev/BFly, clinger, Wwalking/Swimming/Breathless/
Passes_walls, Regeneration, Slow, combat×3, armpro, halfdmg, Half-gas,
spell-cast, shape-changer block, lays_eggs, were-form, Free/Fixed,
Luck/stone_luck, ugangr, fruit, umortality. Plus the overlay pray
gating fix.

## C ↔ JS fidelity — attributes_enlightenment

C `insight.c:1486–2005` (csym range), walked arm by arm in both
builders. Verified C-exact: hofe titles+index ✓; piousness record
split + wizard line ✓; all resistance/vision arms incl. temp_ prefixes
and item_resistance_message slots ✓ (presence + order); Warn obj
(M2 bits/something + from_what) / polyd (humans-and-elves chain, no
from_what) / species (ismnum + makeplural pmname) ✓; Undead intrinsic-
only (youprop.h:173) ✓; Clairvoyant + blocked strsubst arm ✓ (modulo
finding 2); Detect + wizard timeout ✓; umconf counter + wizard !final
suffix ✓; Adornment (extrinsic-only gate, spe sum incl. zero-sum
report) ✓; invisible trio ✓; Displaced/Stealth + blocked (` stealthy`
+ FROMOUTSIDE equality) ✓; Aggravate/Conflict ("" / "d" middles) ✓;
Jumping/Teleportation/Teleport_control ✓; BLev/BFly save/clear/retest/
restore on both stores with the exact message ternaries (==, not &) ✓;
clinger (Underwater≡uinwater collapse valid) ✓; Swimming collapse
(X||!X proof in-comment) ✓; Regeneration/Slow ✓; uhitinc + tux
interplay (`4*spelarmr/5` trunc exact) ✓; udaminc/spellprot (rings +
amulet + INTRINSIC&ublessed + spell, `if (prot)`) ✓; armpro clamp ✓;
halfdmg/Half-gas ✓; spell-cast suit/robe ✓; shape-changer block
(Unchanging/Polymorph/foreign-shape/vampshift/slime-death/wizard
mtimedone) ✓; lays_eggs/were-form ✓; Free/Fixed extrinsic-only
(youprop.h:383/385) ✓; Luck/moreluck/stone_luck ✓; ugangr ✓; fruit
(debugcore element-match exact — explicitdebug passes wildcards=FALSE
— and doubly-dead in the contest: C `#ifdef DEBUG` out, JS
debugfiles null via sys.js; porting a compiled-out arm is harmless
here, noted not queued); umort tail incl. the case-0 impossible and
the final-gated enl_msg middle ✓ — every tense/middle verified
against the enl_msg macro.

FINDING 1 — pray else-arm missing from `enlightenment()`: C
`:1937–1955` emits "can [not] safely pray" (+ wizard ublesscnt) when
!ugangr && !final. The overlay has it (correctly gated — the fix
verified); `enlightenment()` has the ugangr `if` with NO else
(js/invent.js:7208–7218, comment cites only ":1931-1936"). Reachable:
potion.js:1998 + zap.js:2787 call
`enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS)` (final=0 ← C
potion.c:710 / zap.c:2529), where C shows the line and JS does not.
The D-log claims attributes "whole" with "none" omits. One port iter:
mirror the overlay else-arm with the !final gate.

FINDING 2 — from_what negative INVIS/CLAIRVOYANT stubbed: C
attrib.c:977–997 returns " because of X" for three negative cases
(BLINDED/Eyes, INVIS/W_ARMC wrapping, CLAIRVOYANT/W_ARMH cornuthaum);
JS attrib.js:1224–1231 returns '' for everything but BLINDED. The new
Clairvoyant blocked arm therefore drops the "if not for X" suffix
(wizard + cornuthaum-blocked); the pre-existing blocked-invisible arm
drops its wrapping suffix likewise. from_what's ledger row says
ported-stale (2026-09-09), so the gap predates D-3205 — but D-3205's
arm ships on the stubbed callee unnamed. One port iter in from_what
heals both arms. Verdict on the function: QUALITY-RISK.

## Inventory + fidelity — enlght_combatinc

New same-file local (C staticfn → local correct); string return
instead of outbuf (callers hold no BUFSZ — verified at all 8 sites).
C `:159–195`: abs ✓; defense ×2/3 trunc ✓; bands ✓; no/an ✓;
bonus/penalty ✓; invrt ✓; "%s %s %s" ✓; final||wizard signed suffix
✓. Callers: C :1254/:1772/:1782/:1795 → 8 JS sites (4 per builder),
all verified. Verdict: ACCEPT.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

"Every arm live in both builders" / "none" omits is false for
attributes: the pray arm is overlay-only (finding 1), and the
Clairvoyant suffix depends on a stubbed callee shape (finding 2).
"Dead arms ported as written" holds (Punished-impossible, uinwater
elif, umort case-0 all verified present). The `#if 0` pray wording
was correctly NOT ported.

## Density

Three whole C functions of one C file (insight.c) in caller/callee
shape, ~900 js insertions (under the 1500 cap), no Must-fix bundled.
Per-function Ledger (both builders split) and Verify lines present.

- Ledger: status_enlightenment split — ACCEPT.
- Ledger: attributes_enlightenment split — QUALITY-RISK (pray arm,
  from_what suffix).
- Ledger: enlght_combatinc ported — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify status_enlightenment: 0 blocked at 9cc52a0d2~1; smoke 24/24 PASS → REACH-OK
verify attributes_enlightenment: 0 blocked at 9cc52a0d2~1; smoke 24/24 PASS → REACH-OK
verify enlght_combatinc: 0 blocked at 9cc52a0d2~1; smoke 24/24 PASS → REACH-OK
```

Matches the D-log (display-only, no RNG tags; vacuity stated). No
REGRESSED session. Smoke cannot cover the findings (potion-
enlightenment pray line; wizard cornuthaum suffix — both need
targeted states, hence Must-fix with falsifiers).

## Actionable C-wrongs

1. attributes pray else-arm absent from `enlightenment()`: add the C
   `:1937–1955` else under !ugangr && !final (mirror the overlay arm).
   Falsifier: enlightenment potion with !ugangr shows "can safely
   pray". Queueable below.
2. from_what negative INVIS + CLAIRVOYANT cases: port C
   attrib.c:986–995 (W_ARMC wrapping / W_ARMH cornuthaum suffixes).
   Falsifier: wizard cornuthaum-blocked clairvoyance shows "if not
   for …". Queueable below.

Verdict: **QUALITY-RISK**
