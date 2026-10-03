# Review 2288 — 08e30b12c — money_cnt sit.js clone removal

- SHA: `08e30b12c` (D-3332)
- Files: `js/sit.js` (+ extended moneycnt-trio rewire test)
- Insertions: ~8 js/; single-symbol sole-site rewire

## Intent vs deliverable

Subject promises: "`hack.c` money_cnt sit.js clone removal (sole
site → live js/shk.js export)". The diff delivers exactly that:
one clone + stale comment deleted, one new static sit→shk edge,
one C-cite comment per site, site expression unchanged. No
DIAG/FORCE/seed; Rule #2 clean (iteration-wide rulecheck).

## Inventory

- `money_cnt`: deleted sit.js array-only clone (sole site: dosit
  dragon meager-hoard gate) → live shk.js:4762. Last money_cnt
  clone; stale "end/shk cycles" comment voided with `--can` SAFE.

## C ↔ JS fidelity

C `money_cnt` (hack.c:4513–4522): walk the nobj chain, return the
first COIN_CLASS `quan`, 0L on miss. Live JS (shk.js:4762, read in
full): null-arg guard, array arm (null-elem guard + `|0` folding)
for `game.invent`, nobj-chain arm otherwise — the array arm is the
faithful JS-shape rendering of the C walk (invent is an array),
and `|0` matches C's integer oclass compare. The deleted clone was
a genuine robustness C-wrong: strict `===` oclass missed
non-number oclass, and a holey invent threw (`otmp.oclass` on
null) where C's chain walk cannot fault. The rewire's behavior
delta (null-elem skip + `|0`) is toward C at the sole site, and is
pinned by a new unit case in the rewire test rather than asserted.
Required `sym.mjs` output:

```
money_cnt        js/shk.js:4762   sync
```

Clone-free — the "last money_cnt clone" claim holds.

## Hallucinations / overclaim

None. "Whole C body live" holds (10-line body, both arms
verified). The delta is disclosed as a fix, not hidden as neutral.

## Density

Single-symbol sole-site rewire; ~8 insertions below the bar,
defended (head's C file holds no further Open rows, money_cnt has
0 C callees — the cluster cannot grow). `Ledger:` money_cnt entry;
per-function Verify line present. No RNG in the body. Gates per
D-log: syntax · rule2 · hidden-note · reach · green · strict ·
cohort · skip full (single leaf file — correct call).

## Verification

Re-measured (`hidden-proxy.mjs verify money_cnt --base
08e30b12c~1 --reach-all`): 0 blocked (row cited 0 — honestly
vacuous, D-log says so) + smoke 24/24 PASS, 0 regressed →
REACH-OK. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
