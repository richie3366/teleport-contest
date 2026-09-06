# Review 948 — af9b2323 — sounds.c domonnoise MS_BRIBE/CUSS/SPELL demon/caster chat depth (D-1978)

- SHA: `af9b2323` — "sounds.c domonnoise MS_BRIBE/CUSS/SPELL demon/caster chat depth (D-1978)."
- D-id: D-1978. JS: `js/minion.js` + `js/sounds.js` + `js/wizard.js` (3 files). C locus: `sounds.c` `:1142–1160` (BRIBE/CUSS/SPELL arms), `minion.c` `demon_talk` `:262–358` (csym), `wizard.c` `cuss` `:845–883` + tables `:824–843` (csym).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises demon/caster chat depth: `demon_talk` + `cuss` ports
plus the combined BRIBE/CUSS arm and SPELL arm. Diff actually adds:
exported async `demon_talk` (minion.js +112), `random_insult`/
`random_malediction` tables + exported async `cuss` (wizard.js +82),
combined `MS_BRIBE || MS_CUSS` arm + `MS_SPELL` arm (sounds.js). Three
modules is the combined-arm callee closure (arms ship with their
callees live — the blessed pattern), not scope creep. Promise matches
deliverable.

## Inventory

- New: `demon_talk` (exported async), `cuss` (exported async), two
  const tables, PM/EMIN import names.
- Changed: domonnoise deferred comment (BRIBE/CUSS/SPELL struck).
- No deletions. `sym.mjs`: `demon_talk`, `cuss` single definitions;
  reused locals (`u_wield_art` minion.js:98, `sgn` :78, `Amonnam` :169)
  introduce no new clones.

## C ↔ JS fidelity

`demon_talk` vs C `:262–358`, branch by branch:

- Lawful-blade rage ✓ (strings, mpeaceful=mtame=0, set_malign, newsym,
  return 0); faint wake vs stop_occupation + multi>0 nomul/unmul ✓;
  dprince reveal with wasunseen + STRAT_APPEARMSG clear + newsym ✓;
  S_DEMON kin greeting (Deaf-gated speech vs seen-gesture) +
  tele_restrict/rloc + return 1 ✓.
- Demand formula ✓ exact: `cash*(rnd(80)+20*Athome)/(100*(1+same-align))`
  with `Math.floor` ≡ C truncation (non-negative operands), `Athome`
  ≡ Inhell && cham==NON_PM (null-cham → NON_PM cited to makemon.js:1437),
  and `rnd(80)` burning before the no-gold early return exactly as in C
  ✓ (verified position: computed before the `!demand` check).
- `!demand || multi<0` fight ✓; amulet/Deaf unmeetable `cash+rn1(1000,
  125)` ✓ same position; spoken vs seen demand ✓; bribe short-circuit
  (`!Deaf && (offer=await bribe)>=demand` — bribe uncalled when Deaf,
  critical since it prompts) ✓; `offer>0 && rnd(5*CHA)>demand-offer`
  ✓; angry else ✓; livelog (`x_monnam` ARTICLE_A/EXACT_NAME, zorkmid
  plural) + mongone + return 1 ✓.

`cuss` vs C `:845–883` + tables: both tables verified verbatim against
the C text (28 insults incl. `(sic.)` on villein, 11 maledictions) ✓;
Deaf early return (no RNG burned — pure reads) ✓; iswiz `!rn2(5)` /
amulet `!rn2(.length)` / panic / parthian arms ✓; clang L→R order
(message `rn2(2)` before ROLL_FROM insult; malediction roll before
insult roll — JS template evaluation matches, documented in-comment) ✓;
angel pager with renegade opt-chain + C-commented Hallu block kept
commented ✓; `!rn2(is_minion?100:5)` aspersions vs demon pager ✓;
`wake_nearto(5*5)` always (after the Deaf return, as in C) ✓.

Combined arm vs C `:1142–1156`: fallthrough mapping proved case by
case — BRIBE+peaceful+untame → demon_talk; every other BRIBE shape
falls into the CUSS logic exactly as C's FALLTHROUGH does (tame or
non-peaceful BRIBE → cuss-or-messages); CUSS+peaceful → lminion/…doomed
✓. SPELL `:1157–1160` verbatim ✓.

Callee closure: every reached callee is LIVE (`mon_has_amulet` verified
sync returning 0/1 — no await bug; `newsym`, `livelog_printf` sync;
`mbodypart` chain N/A here) or a verified pre-existing CLONE
(`u_wield_art` body re-read: `oartifact === art` ≡ C `is_art` ✓;
`sgn` trivial). No STUB in any live arm. `demon_talk` rides a dynamic
import (quest_chat precedent — no new static edge); **all six**
`--can` probes this review return ALREADY (wizard→questpgr/sndprocs/
teleport, minion→hack/apply/pline/attrib, sounds→teleport) — zero new
static surface.

One pre-existing-debt note (not this SHA's wrong): minion.js:169's
local `Amonnam` builds from the type name and ignores player-given
monster names, where C `a_monnam` would use them — reachable when
chatting a *named* tame demon. The clone predates this SHA (used by
`bribe` et al.), reuse avoids a 7th clone, and do_name's export was one
import away; swapping the file over is its own refactor iter, so it is
recorded here, not queued.

## Hallucinations / overclaim

"Exact C order", "verbatim tables", "RNG burns before early return" —
all verified true above. No stubbed callees. Map updated in-commit
(remaining NURSE/GUARD + mcan + oracle_loc) ✓.

## Density

Three modules looks wide, but it is one callee closure: two consecutive
arms plus the two callees they require, every callee LIVE or verified
clone. The §2b-compliant alternative (arms with stubbed callees) is
exactly what the rules forbid. Right-size as a combined-arm port.

## Verification

Honest vacuous note (0 blocks on all three symbols, no corpus-PASS
claimed); green + strict + cohort + full 44/44. Re-measured:
`verify demon_talk --base af9b2323~1` and `verify cuss --base
af9b2323~1` → 0 blocked at baseline and now. `imports.mjs --rulecheck`
clean (re-run this review). Added-line grep: no banned tokens.

## Actionable C-wrongs

None for this SHA. (Pre-existing: minion.js local `Amonnam` vs
player-named monsters — file-wide clone-swap iter, not attributable
here.)

Verdict: **ACCEPT**
