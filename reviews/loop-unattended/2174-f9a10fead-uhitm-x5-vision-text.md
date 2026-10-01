# Review 2174 — f9a10fead — uhitm ×5 (blnd text is C-wrong)

SHA `f9a10fead`, D-3214; 2026-10-01; `js/mhitm.js`, `js/mhitu.js`,
`js/uhitm.js` (+~30). Five-function same-C-file cluster (uhitm.c):
3 code functions + 2 stale splits. Closes no prior review.

## Metadata

- Subject: "`uhitm.c` ×5: blnd vision_clears, were uhitm row, slow
  defended ×3, samu/pet stale splits (D-3214)".
- Promises: blnd stub filled with the "established idiom"; AD_WERE
  row like AD_PHYS; defended(AD_SLOW) after negated ×3; samu/pet
  stale splits; names on existing edges only.

## Intent vs deliverable

Kept except one introduced C-wrong (blnd text, below). The were
row, the three slow gates, and both stale splits verify clean;
edges are names-only as promised (`defended` joins mhitu's
mondata edge, `AD_WERE` uhitm's mhitm edge).

## Inventory — mhitm_ad_blnd

Changed: `mhitm_ad_blnd_u` (`js/mhitu.js:764–774`): stub comment →
`await pline('Your vision clears.')`. No new imports. No clones,
no STUBs (the stub is gone — replaced by wrong text, see below).

## C ↔ JS fidelity — mhitm_ad_blnd

C `uhitm.c:2957–3012` (csym range). mhitu `:2976–2985`: can_blnd →
`!Blind` "blinds you!" → make_blinded(BlindedTimeout+damage,
FALSE) → `if (!Blind) Your1(vision_clears)` → damage=0. JS matches
except the string VALUE: Your1 ≡ `Your("%s",·)` (hack.h:1027 ✓)
but `vision_clears` ≡ `c_vision_clears` (decl.h:40) ≡ the 10th
positional initializer in decl.c:40–52 ≡ **"vision quickly
clears."** (struct order hack.h:267–272 counted field-by-field).
C emits **"Your vision quickly clears."**; JS emits "Your vision
clears." — missing "quickly". The D-log's macro-level analysis
never read the value.

The wrong idiom is 13 lines in 10 files, zero "quickly" anywhere
in js/: dothrow:1672, eat:2487, potion:2950, mthrowu:1445,
zap:4475, detect:2570, engrave:1688, mcastu:359, mhitu:2002/3711/
3822 (pre-existing), mhitu:771 (NEW this SHA), plus trap.js:537
`VISION_CLEARS = 'vision clears.'` (comment cites C
c_vision_clears — wrong at the definition; used at :5082). This
SHA adds the 13th instance while claiming "none — all three arms
live". Verdict on the function: QUALITY-RISK.

## Inventory + fidelity — mhitm_ad_were (uhitm arm)

New: AD_WERE dispatch row (`js/uhitm.js:2960–2967`) routing to
same-file sync `damageum_ad_phys`, un-awaited — character-identical
in shape to the AD_PHYS row (`:2812`) ✓. C `:4271–4275`:
mhitm_ad_phys + `if (mhm->done) return` (end-of-function dead —
control returns through the dispatch to damageum, which checks
done at js/uhitm.js:3010, verified in review 2171) ✓. No RNG in
the arm. Verdict: ACCEPT.

## Inventory + fidelity — mhitm_ad_slow (defended ×3)

Changed: one-line early return after `negated` in mhitm.js:1379
(mhitm), uhitm.js:2510 (uhitm), mhitu.js:2737 (mhitu, mdef =
game.youmonst). C `:3651–3687`: `negated = mgc(FALSE)` first,
then `if (defended(mdef, AD_SLOW)) return` before the arm dispatch
— order exact in all three homes, including defended-before-hitmsg
in mhitu ✓. `defended` (mondata.js:163, sync) has an explicit
isYou branch (u.uwep/u.uarm), so the youmonst pass is supported
✓; RNG-free predicate, rn2(10) still burns first ✓. Verdict:
ACCEPT (all three).

## Stale splits — mhitm_ad_samu + hmon_hitmon_pet

Both verified substantive, not ledger theater. Samu (C
:4569–4589): mhitm local mhitm.js:1117 zeroes ✓ (:4587–4588),
uhitm row uhitm.js:2847 zeroes ✓ (:4573–4576), mhitu _u
mhitu.js:2618 hitmsg + `!rn2(20)` stealamulet ✓ (:4577–4586).
Pet (C :1587–1601): JS hmon_hitmon :2099–2105 has the exact block
(`mtame && dmg>0` → abuse_dog → `mtame && !destroyed` →
monflee(10*rnd(dmg),F,F)) at the C call position ✓. Nit (not
queued): the pet ledger row keeps its old "measured MISSING" note
text alongside status ported. Verdict: ACCEPT (both).

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
gates. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

"Fill the blnd stub with the established 8-site idiom" + "none —
all three arms live" presents a value-unchecked copy as exact.
The macro/string *references* are right; the *value* ("quickly")
was never read. The site census is also off (says mhitu×3 as part
of 8; actual tree: 13 lines incl. the new one — the count, not the
verdict, is the point).

## Density

Five C functions of one C file (uhitm.c), ~30 js insertions, no
Must-fix bundled. Per-function Ledger and Verify lines present.

- Ledger: mhitm_ad_blnd split — QUALITY-RISK (text).
- Ledger: mhitm_ad_were split — ACCEPT.
- Ledger: mhitm_ad_slow split — ACCEPT.
- Ledger: mhitm_ad_samu split — ACCEPT.
- Ledger: hmon_hitmon_pet ported — ACCEPT.

## Verification

Re-measured (one call + one blnd line, current tree incl. this SHA):

```text
smoke mhitm_ad_blnd: no RNG-tagged reach; fixed smoke spread (24 run, 12.8s): 24 PASS, 0 regressed → REACH-OK
reach mhitm_ad_were: 6 baseline-PASS session(s) reach it (6 run, 1.8s): 6 PASS, 0 regressed → REACH-OK
reach mhitm_ad_slow: 2 baseline-PASS session(s) reach it (2 run, 1.4s): 2 PASS, 0 regressed → REACH-OK
reach mhitm_ad_samu: 3 baseline-PASS session(s) reach it (3 run, 1.8s): 3 PASS, 0 regressed → REACH-OK
reach hmon_hitmon_pet: 53 baseline-PASS session(s) reach it (53 run, 17.3s): 53 PASS, 0 regressed → REACH-OK
```

Matches the D-log per-function lines (vacuity stated for blnd).
No REGRESSED session — the text C-wrong is invisible to the
corpus (Eyes-gated message, no reaching session shows it), hence
Must-fix with a grep falsifier.

## Actionable C-wrongs

1. vision_clears "quickly" family (13 lines, 10 files): C emits
   "Your vision quickly clears." (`Your1(vision_clears)`,
   decl.c:49 10th positional = "vision quickly clears."). Fix the
   12 literal `pline('Your vision clears.')` lines (dothrow:1672,
   eat:2487, potion:2950, mthrowu:1445, zap:4475, detect:2570,
   engrave:1688, mcastu:359, mhitu:771/2002/3711/3822) + the
   `VISION_CLEARS` const (trap.js:537) + the mhitu.js:761 comment.
   Falsifier: `grep -rn "Your vision clears" js/` empty,
   `grep -rn "quickly clears" js/` = 13. One port iter. Queueable
   below.

Verdict: **QUALITY-RISK**
