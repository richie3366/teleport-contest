# Review 1082 — 12ef27f6 — resist Conflict/mplayer arms + zhitm sleep gate + explode alev

Metadata: SHA `12ef27f6`, D-2116, `js/zap.js` + `js/explode.js` +
`js/mhitm.js` (~51 js/ insertions). No prior review claims this SHA.

Intent vs deliverable: the subject promises the canonical-`resist`
Conflict early pass + mplayer dlev, the `zhitm` ZT_SLEEP `resist(how)`
gate with C arg order, and the explode-clone alev table.
The diff delivers all three plus an additive `export` on
`resists_sleep_slee`.

Inventory: two extended functions (both `resist`s), one extended case
(ZT_SLEEP), one export flip; zero new functions.

**C ↔ JS fidelity**: C `resist` (`zap.c:6099–6158`, 60 lines):

- Conflict early pass
  (`RING_CLASS && !damage && !tell && is_mplayer` → 1) ✓ in both files
- alev table (12 / 10 / 10 / 9 / 6 / 5 / default ulevel) ✓
- dlev clamp + mplayer `ulevel` arm ✓
- `rn2(100+alev-dlev) < mr` ✓

The zap.js tail (tell / shield / damage / death) pre-existed; this SHA
completes the head.
Explode clone's deferred HP / death / shield arms are provably dead:
the sole caller passes `(olet, 0, false)` (explode.js:625), so C
`damage=(0+1)/2=0`, `if (damage)` is false, `tell` is false.

ZT_SLEEP: C `zhitm` switches on `zaptype(type)%10` (`zap.c:4245`) and
calls `sleep_monst(mon, d(nd,25), type==ZT_WAND(ZT_SLEEP) ? WAND_CLASS
: '\0')` (`:4292–4298`).
JS switches on the same normalized `damgtype`, draws `amt=d(nd,25)`
before the gate (C arg-eval order ✓), and computes `how` identically
(`ZT_WAND(x)=(x)`, `zap.c:55`; spell / breath variants land on the same
case with `how=0`, and both are ≥ 0 so C's `how >= 0` guard always
passes, as the D-log states).
`resists_sleep_slee` ≡ C `resists_sleep` (`monst.h:274` →
`Resists_Elem(mon, SLEEP_RES)` intrinsic-bits part; `mondata.c:129–175`
confirms the rest is the wielded / worn / artifact scan, genuinely
named-deferred) via the same bits formula as the file's own
`mon_resists_bit`.
`sleep_monst_zap` ports C's application tail (meating=0, mfrozen
accumulation, min-127, else msleeping) under mcanmove ✓.
Required `sym.mjs` output (export flip; nothing deleted):

```text
resists_sleep_slee js/mhitm.js:989   sync
```

Import extensions only (`is_mplayer`, oclass consts) — no new edges.
Rule #2: `imports.mjs --rulecheck` clean across scored `js/`:

```text
Rule #2 clean: no bare/node specifiers or fs calls in js/.
```

No FORCE / DIAG / seed / coordinate reads in the diff.

Hallucinations / overclaim: one gap behind a completeness claim.
The header comment says the sleep gate runs "in exact C order" and the
map row (turns.md:551) enumerates the deferrals — but neither names
`sleep_monst`'s mimic-reveal arm (`mhitm.c:1226–1229`: `how >= 0 &&
!msleeping && !mfrozen && S_MIMIC && M_AP furniture/object →
seemimic`, which fires *before* and *regardless of* the resist
outcome). `seemimic` is live (`mon.js:928` per `sym.mjs`), so this is
an unmapped omission in a shipped arm, not a named omit.
Narrow (sleep-zapped awake furniture / object mimic), but real.

Density: ~51 insertions over three files, one C function family + its
two call shapes — within §2b.

Verification: D-log cites hidden 0 / 2-moved / PROGRESS
(Priest → zapyourself@60; Ranger → burnarmor@73).
Re-measured (`--base 12ef27f6~1`):

```text
scen-tour-Priest-92235: moved → zapyourself at step 60 (was 59)
scen-wish-Ranger-92212: moved → burnarmor at step 73 (was 72)
verify resist: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match; the `rn2(119)` / `rn2(106)` draws now come from the
canonical roll on both sides. No seed / step / coordinate read.

**Actionable C-wrongs** (debt — narrow rare-path side effect; the core
gate is C-exact and verified; map-pointed in turns.md D-2116 row as
R-1082):

1. `zhitm` ZT_SLEEP drops C's mimic-reveal: before the
   `resists_sleep_slee` gate, add the C-position check
   (`mhitm.c:1226–1229`) calling the live `seemimic` export for an
   awake, unparalyzed S_MIMIC appearing as furniture / object.
   ~6 lines, one iter, no RNG movement (verify).

Verdict: **ACCEPT-WITH-DEBT**
