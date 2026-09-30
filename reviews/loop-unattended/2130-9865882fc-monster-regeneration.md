# Review 2130 — 9865882fc — monster regeneration

SHA `9865882fc`, D-3170; 2026-09-30; +14/-13 JS. No closure.

## Intent vs deliverable

Subject promises “mon_regen whole regeneration and meal completion”. Diff
replaces inline HP arithmetic with healmon and adds finish_meating after
countdown; exports the existing function.

## Inventory

mon_regen is the sole changed function. regenerates, healmon and
finish_meating are LIVE C body ports. No helper clone or no-op introduced.
Required symbol resolution for the promoted local:

```text
mon_regen        js/mon.js:1006   sync
```

## C ↔ JS fidelity

C monmove.c:306–320: modulo-20 short-circuits regenerates, then
healmon(1,0); nonzero mspec_used decrement; digest_meal then nonzero meating
decrement; <=0 finish_meating. JS matches call/branch order without added
RNG. healmon C mon.c:4593–4614 clamps ordinary monster HP identically; its
named youmonst omission is outside this caller envelope. finish_meating C
dogmove.c:1447–1457 clears timer, checks appearance and non-mimic mlet,
resets disguise and newsym; JS matches symbolic mlet representation.
`--callers`: mon.c:1193 and declaration extern.h:1931. Guarded
m_calcdistress reads :1180–1198; existing JS call passes false. Digest arm
is complete despite no current true caller.

## Hallucinations / overclaim

Whole-body claim holds; older finish_meating comment still says deferred,
but its body performs reset. D-log incorrectly spells caller mcalcdistress
rather than m_calcdistress; cited call is valid. No stub dispatch. Diff
anti-pattern scan empty; whole scored-tree Rule #2 clean.

## Density

mon_regen: ACCEPT; Ledger: ported. Documented file/closure exhaustion allows
singleton. Individual Verify includes vacuous note, REACH-OK,
green/strict/cohort and forced full suite.

## Verification

On this SHA, `verify mon_regen --base 9865882fc~1 --reach-all`:

```text
verify mon_regen: 0 session(s) blocked
smoke mon_regen: 24 PASS, 0 regressed → REACH-OK
```

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
