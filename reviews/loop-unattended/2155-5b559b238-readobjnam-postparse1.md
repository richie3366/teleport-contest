# Review 2155 — 5b559b238 — readobjnam finish + postparse1 extraction

SHA `5b559b238`, D-3195; 2026-10-01; +774/−288 JS in `js/readobjnam.js`.
Coverage cluster (readobjnam THIN + Open callee postparse1 MISSING); no
prior review closure. Same iteration retires xname_flags STALE-SPLIT
(ledger-only — spot-confirmed: split note names pretty_base :687 +
xname_flags :1047 + cxname_singular :1365, all present).

## Metadata

- Subject: "`objnam.c` readobjnam finish completion +
  readobjnam_postparse1 extraction (whole C-order bodies)"
- Delivers: new exported `readobjnam_postparse1` (~340 lines), `readobjnam`
  dispatch on C return codes 0–5, `readobjnam_finish` completion, two new
  wrp amulet arms, new `delete_contents`/`obfree` edge to shk.js.

## Intent vs deliverable

Promise: postparse1 whole in C order with C return codes (not `!d.typ`
gates); dispatch the `:4936–4967` switches; finish gains wizard remap,
pudding→glob, islit, C-ordered blessed/erosion, trapped/contents/locked/
greased/diluted, SCALE_MAIL, vanish state, very-ball. Diff delivers all of
it; the named omissions (glob branch, zombify, vanish pline, two callers)
are declared in the D-log and map. Promise kept.

## Inventory — readobjnam_postparse1

New sync export (at-SHA js/readobjnam.js:1220). Callees all LIVE single
exports (sym-verified, no clones): `tin_variety_txt`, `name_to_mon`,
`name_to_monplus`, `makesingular`, `def_char_to_objclass`, `trapname`,
`rnd_otyp_by_namedesc`; locals `strstri`/`strncmpi`/`bstrcmpi_end`/cbuf/
`WRP`/`O_RANGES` (lowercase names verified)/`ALT_SPELLINGS_RESOLVED`
([sp, index] shape verified). No stub, no no-op.

```text
delete_contents  js/shk.js:4079   sync
obfree           js/shk.js:4097   sync
def_char_to_objclass js/objects.js:109   sync
tin_variety_txt  js/eat.js:2756   sync
name_to_monplus  js/mondata.js:737   sync
makesingular     js/objnam.js:1927   sync
trapname         js/trap.js:1725   sync
```

## C ↔ JS fidelity — readobjnam_postparse1

Audited arm-by-arm against C `objnam.c:4239–4663` (csym range). named /
called (+o_ranges class return 1) / labeled / of-spinach truncations exact
(+7/+8/+9/+10 offsets); amulet prefix order (cheap/plastic/imitation) and
C-exact `real ? AMULET : FAKE` + return 2; pair-of count doubling (8/9/7/8
advances); tin-of (spinach vs `tin_variety_txt` + `name_to_mon`, typ=TIN);
of-scan truncation; singular (tricks/clothes exceptions, cnt 1→2);
alt-spellings + grey/armour in-place rewrites; scales (dragon-range gate);
holy water incl. the len<12 `un` bound; paperback accept/reject (+otmp=null,
return 3); unlabeled scroll/spellbook; orange (mntmp==NON_PM); gold
(first-char `$`, cnt clamp, `mksobj` + botl); single-char class code
(VENOM-gated); wrp prefix/suffix via the helper; wizard bear/mine
(trapped==2/` object` → typ, trapped==1/suffix → canonical trapname +
return 5). The `:4345–4370` glob intercept is a properly named omission
(shipped D-3196). `!d.typ` gates on singular/alt-spell/gold are provably
vacuous (init zeroes typ; preparse/charges never write it — verified by
grep). No RNG drawn directly (namedesc only) — matches C.

**Gap (micro-C-wrong):** the no-of rest skip drops C's plural-possessive
disjunct `(bp > origbp && !strncmpi(bp-1, "s' ", 3))`. On "<s-ending
monster>' \<item>" (e.g. "Orcus' corpse": matcher consumes "orcus", rest
"' corpse") C advances past "' " to "corpse" while JS keeps "' corpse" —
C grants a (random) corpse, JS fails the wish. All four other disjuncts
(`' '`, `s `, `es `/`'s `, empty-reset) verified equivalent. One-line fix;
recorded as map debt (Actionable 1).

## Inventory — readobjnam

Dispatch rewritten (at-SHA :1892), finish completed (at-SHA :2001), wrp
helper gains the two amulet arms (at-SHA :468). New imports: `trapname`,
`delete_contents`/`obfree` (new shk.js edge — D-log `--can` SAFE; both
hoisted sync exports, module load-verified by the fortress),
`artifact_exists`, `safe_oname`, `place_object`, `obj_extract_self`,
`begin_burn`, `verysmall`, `def_char_to_objclass`, `ILLOBJ_CLASS` + 20
object/monster consts. No symbol deleted or re-pointed (local clone →
import: none — the inline code was anonymous).

## C ↔ JS fidelity — readobjnam dispatch

Verified against C `:4914–4996`: init/null→any, mungspaces,
nothing/nil/none→no_wish, fruitbuf, preparse→any, cnt default, charges,
then the three switches. postparse1 codes: 3→otmp, 4→any, 2→finish,
5→wiztrap tail, 1 skips postparse2, 0 runs it — matches C. postparse2's
4/5 arms proved unreachable (its return set is {0,1,2,3} — full grep).
srch `actualn/dn` defaults proved behavior-preserving: they fire only when
postparse2 (whose C tail `:4719–4723` sets them) is skipped, C's NULL
probes return STRANGE side-effect-free (`rnd_otyp_by_namedesc`
`:3466–3467`), and the tried strings are identical. postparse3's return
set is {0,2,6} (1/3/4/5 unreachable — full grep); all eight code-2 sites
set typ; the 6→retry loop matches C (`d.typ` break ≡ case 2). wiztrap
tail: skill prefix is polearm/hammer-only (helper read), deferred past
async `wizterrainwish` exactly on the wish path (C order), missOut+null ≡
C's NULL return. Callers: files.c:2568 → files.js:173 ✓, zap.c:6360 →
zap.js:7400 via `readobjnam_wish` ✓, zap.c:6366 named with a code comment
(zap.js:7406) ✓, nhlobj.c:360 named (map data.md) ✓, mklev JS-only sync
call preserved ✓.

## C ↔ JS fidelity — readobjnam_finish

Verified against C typfnd `:4997–5399`: oclass recompute, wizard-only
5-remap + oc_nowish→null, pudding→glob, oc_merge cnt arm (full
wizard/rnd(6)/candle/ammo disjunction), islit plant+burn+release, spe
negotiation (rnd(5)/Luck/rn2 positions kept), spe switch (TIN/TOWEL/
SLIME_MOLD/corpstat incl. rn2(2) + historic/SCR_MAIL/venoms/WAN_WISHING
rn2(10) + wizard fallthrough), corpsenm switch (LONG_WORM_TAIL, were→human,
TIN/CORPSE/EGG/FIGURINE/STATUE+verysmall-delete/SCALE_MAIL in-switch with
no `d.typ` rewrite), blessed/cursed, erosion (both zeroed first, Luck
gates), recharged (WAN_WISHING→1), poisoned (coat vs FOOD age=1), trapped,
TIN_EMPTY (bag/horn vs delete_contents+reweight), locked/unlocked/broken
(+broken→untrapped), greased, diluted (never water), tin variety
(rn2(4)-first short-circuit kept), artifact/novel naming + wisharti
conduct, permapoisoned, vanish (quest short-circuits the rn2;
artifact_exists+obfree; pline named), halfeaten, weight + very-ball.
RNG call-for-call in C positions throughout.

Inherited (not introduced, fixed in-scope): the create arm is still
unconditional `mksobj(d.typ)` (C: `d.typ ? mksobj : mkobj(d.oclass)` —
context line, fixed by D-3197, verified in review 2157); `readobjnam_any`
still inlines create+weight (fixed by D-3197). Named and closed in-scope:
globby branch + zombify (D-3196; the "no obj_to_any" reason was stale —
live since D-3105 — but the omission was properly named), vanish pline
(D-3197).

Diff grep: no FORCE/DIAG/getRngLog/seed gate/fastforward (sole hit is the
commit message's own "No DIAG/FORCE/seed logic"). Rule #2 clean
(iteration-wide rulecheck).

## Hallucinations / overclaim

None material. "Whole C-order bodies" holds modulo the named omissions
(all declared with C citations) and the one micro-disjunct above. The
wishprobe claim (25/26, gold throws probe-only) is throwaway evidence,
honestly caveated. No dispatch-over-stub: every callee in a live arm is
LIVE or named.

## Density

Two whole C functions, one C file closure (objnam.c), 774 insertions
(within the 1500 cap), no Must-fix bundled. Per-function Ledger
(partial/partial) and Verify lines present. Same-iteration xname_flags
stale-split is allowed procedure, spot-confirmed.

- Ledger: readobjnam partial — ACCEPT.
- Ledger: readobjnam_postparse1 partial — ACCEPT-WITH-DEBT (s' disjunct).

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify readobjnam: 0 blocked at 5b559b238~1 (vacuous — coverage row, 0 cited)
reach readobjnam: 46 baseline-PASS sessions reach it (46 run, 30.8s): 46 PASS, 0 regressed → REACH-OK
verify readobjnam_postparse1: 0 blocked at 5b559b238~1 (vacuous — coverage row, 0 cited)
smoke readobjnam_postparse1: no RNG-tagged reach; 24 run: 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (green 2/2, strict ×2, cohort 7/7). No REGRESSED
session; the D-log states "no corpus session blocked" plainly — no
vacuous-PASS overclaim.

## Actionable C-wrongs

1. (Map debt, unqueued — recorded in CURRENT Live debts.) postparse1 no-of
   rest skip: restore C's plural-possessive disjunct — when `rest` starts
   with `"' "` and the consumed monster name ends in `s` (C `bp > origbp`
   + `strncmpi(bp-1, "s' ", 3)`), advance past it. Repro: wish "Orcus'
   corpse" — C grants a corpse, JS fails. C objnam.c:4408–4419. One line +
   a comment; no RNG involved.

Verdict: **ACCEPT-WITH-DEBT**
