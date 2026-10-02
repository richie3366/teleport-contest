# Review 2203 — 1634fa4fa — mswingsm space fix + mon_avoiding_this_attack

Metadata: SHA `1634fa4fa`, D-3242, `js/mhitm.js` (1 line) +
`js/mhitu.js` (1 import + 17-line export). Parent baseline
`f572fe77c` (audit commit, docs-only).

## Intent vs deliverable

Subject promises: fix the dropped `mhis` space in `mswingsm`
("itscrude") so scen-caster-Wizard-94389 passes, plus port
`mon_avoiding_this_attack`, with no `mswings_verb` body change.
Delivered exactly that: one-space template fix, one new live
export, zero drift. The misattribution analysis (owner
`mswings_verb`, fault at the `mswingsm` call site) is a measured
format-string comparison, not a guess.

## Inventory

- `mswingsm` (js/mhitm.js:6184): template gains the C space —
  `` `${mhis(magr)} ${xname(otemp)}` ``.
- `mon_avoiding_this_attack` (js/mhitu.js:3088): new live sync
  export; `get_atkdam_type` added to the existing mondata.js edge
  (no new module edge; `m_seenres`/cvt pre-imported).
- `mswings_verb`: untouched, claimed verified-whole.

## C ↔ JS fidelity

`mswingsm` — C mhitm.c:1282–1297 (csym range). Gate
`flags.verbose && !Blind && mon_visible(magr)` → JS inverted
early-return with the file-local `Blind_slee()` clone (10-site
file convention; named in the D-log, no recorded gate
divergence) ✓. `bash` pole/Snickersnee/dist2≤2 ✓. Format
`"%s %s %s%s %s at %s."` now exact incl. the `' '` between
`%s`(mhis) and `%s`(xname) ✓; `"one of "` quan>1 ✓. Caller
C mhitm.c:411–414 (`MON_WEP` non-null + `gv.vis`) → JS
js/mhitm.js:6284 (`mwep && _mm_vis`) ✓. Verdict: whole body exact.

`mswings_verb` — C mhitu.c:103–126 (csym range; D-log cites
105–126, same body). JS js/mhitu.js:355–369 walked: `!mwep →
'swings'` guard (C NONNULLARG1, unreachable) ✓; lash =
P_WHIP || TOWEL+spe>0 — C `is_wet_towel` is obj.h:256
`(o)->otyp == TOWEL && (o)->spe > 0`, and the name-table
lookup is the repo's TOWEL idiom (apply/do_name/do_wear use
`indexOf('TOWEL')`; direction reversed, same predicate) ✓;
thrust eager `const` with `!rn2(2)` fires at declaration like
C's initializer — RNG call-for-call even when bash/lash win ✓;
bash→lash→thrust→swings chain ✓. Callers 3/3: mhitu.c:137 →
js/mhitu.js:385 (space present, verified); mhitm.c:1293 →
js/mhitm.js:6184 (fixed here); mthrowu.c:1224 → js/mthrowu.js:1586
(format claimed verified; not re-read — pre-existing site).
Verdict: whole body exact, correctly left untouched.

`mon_avoiding_this_attack` — C mhitu.c:2391–2405 (csym range):
`attkidx >= 0 && (typ = get_atkdam_type(...)) >= 0 &&
m_seenres(mtmp, cvt_adtyp_to_mseenres(typ))`. JS: `idx>=0`
gate, then live `get_atkdam_type` (mondata.js:1010, sync —
its AD_RBRE arm rolls `rn2(8)` over the same 8 breath types as
C mondata.c:1659–1669 ROLL_FROM ✓), then `typ >= 0 &&
m_seenres(...)` ✓. AD_RBRE roll fires only past the gate, as
in C ✓. Optional chaining where C derefs; attkidx≥NATTK reads
adtyp 0 where C is UB (named; unreachable — assessed #if 0,
no C callers, none added in JS) ✓. Verdict: whole body exact.

Helpers: `get_atkdam_type`/`m_seenres`/`cvt_adtyp_to_mseenres`
all LIVE. No clones, no stubs, no re-points (sym.mjs: new
export resolves to js/mhitu.js:3088 sync; nothing deleted).

## Hallucinations / overclaim

None. The D-log states the vacuous verifies as smoke-only and
the PASS under the row's owner fn. No "Match C" dispatch/stub
split — every callee is live.

## Density

Three whole functions (one fixed, one verified-untouched, one
new), own C-locus/Callers/Verify/Named-omissions bullets and
own `Ledger:` entries. ~25 insertions is under the §2b floor,
but the exception is evidenced, not asserted: `ledger.mjs show`
on the files' `unknown` rows (mattacku, mswings, mattackm,
hitmm) reads measured `ok` with live JS homes, and the only
remaining mhitu.c MISSING pair was ranged_attk_assessed (#if 0,
by-design) + mon_avoiding (ported here). D-3240 precedent
applies. No Must-fix bundled. Verdict per function: whole.

## Verification

- Banned-pattern grep on the js hunks: clean (exit 1, no hits).
  `imports.mjs --rulecheck`: "Rule #2 clean" across scored `js/`.
- Re-measured in one call: `hidden-proxy.mjs verify
  mswings_verb,mswingsm,mon_avoiding_this_attack --base
  1634fa4fa~1 --reach-all` → mswings_verb "1 PASS, 0 moved
  past, 0 unchanged, 0 worse → PROGRESS" (Wizard-94389 PASS ✓)
  + reach 2/2 REACH-OK; mswingsm + mon_avoiding vacuous (0
  blocked, as logged) + smoke 24/24 REACH-OK each. D-log
  reproduced exactly; zero REGRESSED.
- No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
