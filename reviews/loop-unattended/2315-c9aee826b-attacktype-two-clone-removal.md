# Review 2315 — c9aee826b — attacktype 2-clone removal

Metadata: SHA `c9aee826b`, D-3359, C `mondata.c:54–57`,
JS live `js/mondata.js:81` (untouched). Stat: 2 js files, 2
clones deleted, 7 sites rewired. No test change (census
lives in the D-3357 file, still green per verify).

Intent vs deliverable: subject promises "attacktype
2-clone removal (mhitu/uhitm `attacktype_aatyp` → live
export)". Diff actually: 2 import extensions, 2 clone
deletions with markers, 7 site rewires. Matches promise.

Inventory: 2 rename-clone→import. mhitu `attacktype_aatyp`
(`.some` aatyp scan, boolean) and uhitm `attacktype_aatyp`
(`!!attacktype_fordmg(ptr, aatyp, -1)` 1-liner — literally
the live body with AD_ANY inlined) are both **clones**.
Live target is the exact **C callee** (reviewed in 2306).

C ↔ JS fidelity: branch-by-branch confirm. C
(`mondata.c:54–57`) is `attacktype_fordmg(ptr, atyp, AD_ANY)
? TRUE : FALSE`, no RNG — the live export is that line.
The uhitm clone was already character-identical in behavior;
the mhitu `.some` scan is the same aatyp predicate over the
same array in boolean context. D-log Callers maps all 7
sites to real C call sites (mondata.c:657/:658 sticks,
mon.c:3463/:3464 caught, mon.c:3189 corpse_chance,
mhitm.c:1464/:1465 xdrainenergym). Rewire is behavior-neutral
by construction; verify judges.

Hallucinations / overclaim: none.

Density: 1-function whole-function cluster (attacktype) with
D-log C-locus/JS/Callers/Verify/Named bullets + `Ledger:
attacktype ported` + `verify.mjs` (syntax 2, rule2, green
2/2, strict 2/2, cohort 7/7; full correctly skipped — no
shared file). ACCEPT.

Verification: re-measured — `verify attacktype --base
c9aee826b~1 --reach-all` → "0 blocked" + vacuous-note +
"fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK"; matches the D-log (rows cited 0 blocks).
`--can`: both edges ALREADY. Diff grep: 0 banned hits.
`sym.mjs` output (required paste):

```text
attacktype_aatyp NOT FOUND in js/** (no export, no local function/const).
```

Both rename-clones gone; single live definer stands.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
