# Review 2289 — b98ade69c — Amonnam teleport.js clone removal

- SHA: `b98ade69c` (D-3333)
- Files: `js/teleport.js` (+ extended amonnam rewire test)
- Insertions: ~5 js/; single-symbol sole-site rewire

## Intent vs deliverable

Subject promises: "`do_name.c` Amonnam teleport.js clone removal
(sole site → live js/do_name.js export)". The diff delivers exactly
that: one clone deleted, the ALREADY do_name edge extended with
`Amonnam`, the clone's now-unused `x_monnam`/`ARTICLE_A` imports
removed, one C-cite comment at the sole site. No DIAG/FORCE/seed
(the FORCETRAP grep hit is a pre-existing const name); Rule #2
clean (iteration-wide rulecheck).

## Inventory

- `Amonnam`: deleted teleport.js clone (sole site: rloc_post_move_msg
  appearmsg arm) → live do_name.js:1234.

## C ↔ JS fidelity

C `Amonnam` (do_name.c:1158–1165): `highc(a_monnam(mtmp))`. C
`a_monnam` (do_name.c:1151–1156): `x_monnam(mtmp, ARTICLE_A, 0,
has_mgivenname ? SUPPRESS_SADDLE : 0, FALSE)`. Live JS matches both
bodies exactly (`a_monnam` do_name.js:1221 with the conditional
SUPPRESS_SADDLE; `Amonnam` do_name.js:1234 via `highc_name`). The
deleted clone passed flags `0` unconditionally — a genuine C-wrong
(a named + saddled monster printed with saddle text where C
suppresses it), now fixed at the teleport.c:1722 site. The delta is
disclosed and pinned by a live-behavior test case ('An eel'/
'Silver'), not hidden. Required `sym.mjs` output:

```
Amonnam          js/do_name.js:1234   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/fountain.js:197  js/mhitu.js:3261  js/zap.js:810
```

All 3 remaining clones have live queue rows (Open missing-arm) —
this SHA's closure is complete.

## Hallucinations / overclaim

None. "Whole C body live" holds (8-line + 6-line bodies, verified
call-for-call against C, no RNG).

## Density

Single-symbol sole-site rewire; ~5 insertions below the bar,
defended (head's C file holds no further Open rows). `Ledger:`
Amonnam entry; per-function Verify line present. Gates per D-log:
syntax · rule2 · hidden-note · reach · green · strict · cohort ·
skip full (single leaf file — correct call).

## Verification

Re-measured (`hidden-proxy.mjs verify Amonnam --base
b98ade69c~1 --reach-all`): 0 blocked (row cited 0 — honestly
vacuous, D-log says so) + smoke 24/24 PASS, 0 regressed →
REACH-OK. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
