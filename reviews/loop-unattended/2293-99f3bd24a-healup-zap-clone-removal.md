# Review 2293 — 99f3bd24a — healup zap.js clone removal

- SHA: `99f3bd24a` (D-3337)
- Files: `js/zap.js`, `js/potion.js` (comment)
- Insertions: ~5 js/; single-symbol sole-site rewire

## Intent vs deliverable

Subject promises: "`potion.c` healup zap.js clone removal (sole
site → live js/potion.js export)". The diff delivers exactly that:
one clone deleted, the ALREADY zap→potion edge extended, the sole
site rewired with `await` + C-cite comment, the stale "keeps a
local copy" note on the live export updated. No DIAG/FORCE/seed;
Rule #2 clean (iteration-wide rulecheck).

## Inventory

- `healup`: deleted zap.js sync clone (sole site: zapyourself
  SPE_HEALING/SPE_EXTRA_HEALING) → live async potion.js:2231.

## C ↔ JS fidelity

C `healup` (potion.c:1427–1458, 32 lines): HP arm (Upolyd mh /
else uhp, max-cap + nxtra, uhpeak), cureblind arm (ucreamed=0,
make_blinded(0,TRUE), make_deaf(0,TRUE)), curesick arm
(make_vomiting(0,TRUE), make_sick(0,0,TRUE,SICK_ALL)), botl=TRUE.
Live JS (potion.js:2231, read in full): all four in C order,
C-exact, including botl. The deleted clone matched only the HP
arm: cureblind was a bare `u.Blinded = 0` (no make_blinded seen-
invent/deaf semantics), curesick a bare `u.Sick = 0` (no
make_vomiting/make_sick), no botl — a genuine multi-arm C-wrong.
The sole site passes cureblind=true when the spellbook/wand is
blessed or extra, so the fix is LIVE there (blessed healing now
cures blind+deaf per C), and the `d(6,…)` RNG call is unchanged.
Required `sym.mjs` output:

```
healup           js/potion.js:2231   ASYNC — await required
make_blinded     js/do.js:3669   ASYNC — await required
make_deaf        js/potion.js:848   ASYNC — await required
make_vomiting    js/potion.js:773   ASYNC — await required
make_sick        js/potion.js:1003   ASYNC — await required
```

All four C callees LIVE (async, all awaited in the live body);
the site's added `await` is correct. Clone-free.

## Hallucinations / overclaim

None. "Whole C body live" holds (32-line body, verified arm by
arm). The delta is disclosed as C-faithful behavior change.

## Density

Single-symbol sole-site rewire; ~5 insertions below the bar,
defended (head's C file holds no further Open rows; the 4 callees
are already live so the cluster cannot grow). `Ledger:` healup
entry; per-function Verify line present. No RNG in the body
itself (the site's `d()` is untouched). Gates per D-log:
syntax · rule2 · hidden-note · reach · green · strict · cohort ·
skip full (leaf-ward files — correct call).

## Verification

Re-measured (`hidden-proxy.mjs verify healup --base 99f3bd24a~1
--reach-all`): 0 blocked (row cited 0 — honestly vacuous, D-log
says so) + smoke 24/24 PASS, 0 regressed → REACH-OK. Matches.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
