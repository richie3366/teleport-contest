# Review 2088 — 3606b8f8d — fruitname + minimal_xname + makesingular arms

- SHA: `3606b8f8d` (D-3128)
- Subject: "`objnam.c` fruitname completion + minimal_xname port + makesingular arms (coverage)"
- js/ insertions: ~76 across js/potion.js + js/fountain.js + js/objnam.js + committed test (9 its)
- Prior index: 2087; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: restart `fruitname` over live strstri+makesingular,
wire the fountain.c:303 caller, fresh-port `minimal_xname`,
ship makesingular's pronoun + ia→ium arms, retire the D-2646
omit lines; 3 head rows stale-declared.

Diff actually adds: the restarted fruitname, the fountain
runoff interpolation + import name, the minimal_xname export,
the two makesingular arms, and the doc updates. Matches the
promise. No new helpers (strcasecpy_at reused, pre-existing).

## Inventory (per function)

- `fruitname` (js/potion.js:424, export, restarted) — C
  objnam.c:412–427 (csym range). Live: whole body now.
- `minimal_xname` (js/objnam.js:2942, NEW export) — C
  objnam.c:1037–1086. Live: whole body, zero JS callers
  (named: callers keep reviewed subset inlines, below).
- `makesingular` +2 arms (js/objnam.js:1933 pronoun,
  :2054 ia→ium) — C :3053–3068 and :3147–3153. Live.
- Caller wiring: fountain case-21 → js/fountain.js:827 (NEW).

Callees all LIVE: strstri, makesingular (fruitname);
distant_name + xname (minimal_xname); in-module eqCI +
strcasecpy_at (makesingular). Nothing deleted or re-pointed.

```text
minimal_xname    js/objnam.js:2942   sync
fruitname        js/potion.js:424   sync
strcasecpy_at    local js/objnam.js:2095 (pre-existing; canonical strcasecpy in hacklib.js)
```

## C ↔ JS fidelity

`fruitname`: `strstri(raw, ' of ')` + `hit.slice(4)` ≡ C
:417–422 (JS tail includes the match, so +4 ≡ the pointer
bump); `makesingular(...)` + `" juice"` suffix ≡ :424;
nextobuf GC no-op named. All 5 C call sites wired:
do.c:521→js/do.js:2726, fountain.c:303→js/fountain.js:827
(NEW, text byte-equal to C :301–303), potion.c:855→:444/:448,
:968→:502, :976→:510. No RNG either side.

`minimal_xname`, field by field against :1042–1086: otyp,
oc suppress/restore (:1045–1051, override_ID + !dknown arms
exact), bareobj otyp/oclass/dknown/known/quan=1/spe=0
(:1056–1067, AMULET arm `(!oc ||
!oc.oc_uses_known) ? 1 : 0` ≡ `!oc_uses_known`),
corpsenm NON_PM unless BOULDER (:1069–1070), SLIME_MOLD spe
(:1074–1075), distant_name+xname (:1080), cleric strip
(:1084–1086, `startsWith` ≡ `strncmp 9`), restore. `{}` zero
base ≡ zeroobj at every xname read audited: o_id absent →
`!(o_id|0)` skips the gameover suffix exactly like C's
o_id==0 (:963–970, JS :668 verified); corpsenm reads are
`!= null`/`|0`-guarded; boulder uses next_boulder (D-1294,
absent→0, plain name both sides); STATUE/FIGURINE/CORPSE get
C-identical NON_PM. distant_name live (:1173, (obj, func)).
No RNG either side.

`makesingular` pronoun: full-string compare after
space-strip ≡ strcmpi on oldstr; they/them→it, their→its ≡
genders[3]→genders[2] (role.c:688 verified: neuter
it/it/its, group they/them/their); cap gate ≡ highc
(s[0] ∈ t/T only). Placement before compound ≡ C. Exact.

`makesingular` ia→ium: length ≥ 4 ≡ `p-4 >= bp`
(post-compound bp); eqCI 'ia' ≡ strcmpi; `'lrLR'.includes`
≡ `strchr("lr", lowc)`; eqCI 'e' ≡ `lowc=='e'`; placement
after matzot/ae/eaux with fall-through (no return) ≡ C;
excess re-append at bottom ≡ C. One micro-gap: the overrun
'm' takes its case from the 'i' (strcasecpy_at's
base[at-1] rule) where C's Strcasecpy (hacklib.c:322–341
traced) takes it from the just-written 'u', i.e. the 'a'.
Measured: ia/IA agree, `Ia`→JS `IuM` vs C `Ium`,
`iA`→JS `iUm` vs C `iUM`. Requires mixed case in the final
two letters — no session reaches it; one-line fix exists
(overrun ref = last char of `out`, behavior-preserving for
all pure-append uses). Live debt, not Must-fix (2040
precedent). All older arms untouched.

Stale declares (spot-verified, all hold): check_glob whole
(guard minus `#if 0`, globbuf, strsubst, insane_object);
restore_light_sources JSON-adapted with C-identical
post-restore order (push ≡ C's prepend-then-reverse under
the mirrored live list); get_table_align 7-row table exact
with both caller analogues wired (:22567, :22754).

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates.
fountain→potion `--can`: ALREADY (pre-existing edge, not a
new one as the message says — conservative misstatement, no
impact).

## Hallucinations / overclaim

None material. "New edge" is really a new name on an ALREADY
edge. The committed test passes 9/9 (re-run here).

## Density

One C file (objnam.c) + one caller wiring + committed test;
3 functions ≤ 10, no Must-fix bundled. ~76 ins + test ≈ the
floor; unless-clause holds (head light.c row stale with no
more rows in that file; callee closure closed). Per-function:
fruitname ACCEPT; minimal_xname ACCEPT; makesingular
ACCEPT-WITH-DEBT (micro-gap above). SHA verdict is the worst.

## Verification

Re-measured (`--base 3606b8f8d~1 --reach-all`, all three one
call): 0 blocked at baseline and working tree each, vacuous
notes, smoke 24/24 → REACH-OK ×3. Matches the D-log; no
REGRESSED session. Committed test 9/9 re-run green. Shared
gates per D-log: syntax 3 files, rule2, green 2/2, strict
×2, cohort 7/7, full 44/44.

## Actionable C-wrongs

1. `makesingular` ia→ium mixed-case overrun: `strcasecpy_at`
   takes the overrun 'm' case from base[at-1] ('i'); C takes
   it from the written 'u' ('a'). Unobservable today (needs
   mixed-case final "ia") — tracked as live debt, not
   Must-fix. Fix: overrun ref = last char of `out`.

Verdict: **ACCEPT-WITH-DEBT**
