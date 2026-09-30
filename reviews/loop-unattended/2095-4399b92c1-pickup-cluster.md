# Review 2095 — 4399b92c1 — pickup 4-port + 5 dispositions

- SHA: `4399b92c1` (D-3135)
- Subject: "`pickup.c` mon_beside + dotip + allow_cat_no_uchain + container_gone ports, count_target_containers by-design, count_categories/n_or_more/count_justpicked/stash_ok stale (coverage head)"
- js/ insertions: +95/−19 in js/pickup.js (1 file)
- Prior index: 2094; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: restart `mon_beside`, complete `dotip` (noun +
spill + statue chain), add `allow_cat_no_uchain`, rename
`container_gone_ask` → `container_gone`; 5 dispositions.

Diff actually adds: exactly that, plus 4 import names on
ALREADY edges and 7 otyp consts in the file's idiom.
Matches the promise. No new helpers.

## Inventory (per function)

- `mon_beside` (js/pickup.js:4615, local = C staticfn,
  restarted) — C :2071–2085. Whole.
- `dotip` (:5228, async export) — C :3561–3677. Gap arms
  shipped; ported.
- `allow_cat_no_uchain` (:472, NEW local = C staticfn) —
  C :596–604. Whole, 0 C call sites (prototype :23 only).
- `container_gone` (:3746, renamed local) — C :2902–2908.
  Whole; sole C caller invent.c:2497, JS askchain same
  file (:3841).
- Dispositions: count_target_containers by-design; 4
  stales (below).

Callees all LIVE (isok, m_at, Is_candle, vtense,
consume_obj_charge, surface, pline_The). Rename verified:

```text
container_gone_ask  NOT FOUND (fully re-pointed)
container_gone   js/pickup.js:3746  local (sole JS user same file)
mon_beside       js/pickup.js:4615  local (C staticfn)
dotip            js/pickup.js:5228  ASYNC
allow_cat_no_uchain  js/pickup.js:472  local (C staticfn)
```

## C ↔ JS fidelity

`mon_beside`: i/j loops, nx/ny, `isok && m_at` ≡ C
(member-wise; the mburied `#if 0` at rm.h:504 makes the
live `#else` MON_AT a plain non-null test, so m_at
truthiness is exact). Sole caller :2296 → JS :4443 with
the identical `c !== 'y' && (... || menu_requested)` arm.

`dotip` (full 117-line C body read): capacity noun
`!verbose ? "a container" : boxes>1 ? "one" : "it"` ≡
:3592–3593 (`=== false` is the file's idiom for C
`!flags.verbose` — unset ≡ verbose, 4 precedents);
spill predicates (wax/oil/grease/crumbs/venom) ≡
:3633–3650 arm-for-arm (`|0` comparisons exact);
pool/lava tail texts + pline shape ≡ :3651–3658
byte-equal; grease consume gate ≡ :3659–3661
(consume_obj_charge async — await correct); ECMD_TIME;
potion pline_The + helm ternary + STATUE text + else
nothing ≡ :3667–3676 (pline-vs-pline1 pre-existing,
unchanged). No RNG either side.

`allow_cat_no_uchain`: uchain identity + unpaid-'u' /
oclass vmc ≡ :597–604 (vmc `.includes` matches the
sibling allow_category idiom exactly). `container_gone`:
fn identity + `!_current_container` ≡ :2902–2908.

Dispositions hold: count_target_containers by-design
(unconditional `#if 0` at :3843 + :3884, def and sole
call both uncompiled); count_categories (inv_order +
FOLLOW + WORN skip + counted flag, helper-mapped);
n_or_more (uchain + quan>=val; `|| 1` unreachable —
quan-0 invariant); count_justpicked (nobj walk);
stash_ok (3 returns exact).

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates.
All 4 `--can`: ALREADY (verified, not trusted).

## Hallucinations / overclaim

None. The "no maintained test" note is honest (interactive
arms, handle_tip precedent) and session gates cover it.

## Density

One C file, 9 functions ≤ 10, +95 ins, no Must-fix
bundled; the D-log names the excluded giants for future
clusters. Per-function: all 9 ACCEPT.

## Verification

Re-measured (`--base 4399b92c1~1 --reach-all`, all nine
one call): 0 blocked at baseline and working tree each,
vacuous notes, smoke 24/24 → REACH-OK ×9. Matches the
D-log; no REGRESSED session. Gates per D-log: syntax 1
file, rule2, green 2/2, strict ×2, cohort 7/7 (full
skipped — pickup.js unshared per verifier, plausible).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
