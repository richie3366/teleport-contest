# Review 2092 — e3690fe26 — should_query_disclose_option + 2 stale

- SHA: `e3690fe26` (D-3132)
- Subject: "`end.c` should_query_disclose_option whole port + fixup_death/sort_valuables stale (coverage head)"
- js/ insertions: ~40 in js/end.js (1 file)
- Prior index: 2091; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: restart `should_query_disclose_option` whole
(impossible arms, bad-category 'n' fix), await at all 6
disclose sites; stale-declare fixup_death + sort_valuables.

Diff actually adds: the restarted async function and the 6
one-word awaits. Matches the promise. No new helpers or
imports.

## Inventory

- `should_query_disclose_option` (js/end.js:453, async
  module-local = C staticfn, restarted) — C end.c:475–515
  (csym range). Whole.
- 6 disclose call sites awaited (i/a/v/g/c/o).
- `fixup_death` (:421), `sort_valuables` (:243) — stale
  declares, no code change.

Sole callee `impossible` LIVE (display.js, async — the
reason for async). Nothing deleted or re-pointed.

```text
should_query_disclose_option  js/end.js:453  local (C staticfn, C-home — not drift)
fixup_death      js/end.js:421  local (C staticfn)
sort_valuables   js/end.js:243  local (C staticfn)
```

## C ↔ JS fidelity

Branch-by-branch against :475–515: `defquery = 'n'` init
≡ :482; `indexOf` on 'iavgco' (≡ decl.c:54, verified) ≡
strchr :483; idx-range impossible with `%d %s` ≡ :486–488
(`%s` correct — JS impossible has no %c, display.js:8490
re-confirmed); YES-default + ask ≡ :489–490; the five
disclose arms + else ≡ :492–511 with C-identical const
values ('y'/'n'/'?'/'+'/'-'/`#` both sides, flag.h:110–115
read); bad-category impossible + ask-with-'n' ≡ :513–514
(the old YES-default there was the C-wrong; fixed). The
idx-range arm is unreachable both sides (strchr/indexOf
bound), identically. Short/empty `end_disclose` falls back
to 'n', which matches none of the five arms and lands on
the C else arm — the D-log claim verified against the
const table. No RNG either side.

Callers: all 6 C sites (i/a/v/g/c/o :632–691) → the 6
awaited JS sites; repo-wide grep confirms no other JS
caller, and `disclose` is async so the awaits are sound.

Stale declares hold: fixup_death (gate, table walk,
include-substitute/remove, buf clear, unmulti, break —
exact); sort_valuables (insertion sort, empty skip,
struct-copy shape — exact).

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates.

## Hallucinations / overclaim

None. Both "dropped arms" claims describe the old code
accurately (verified against the pre-image in the diff).

## Density

One function + 2 same-file stales at ~40 insertions —
below the floor with the unless-clause holding (the only
same-file Open rows shipped as verified stales; closure is
one live callee; D-3127 precedent). Verdict: ACCEPT.

## Verification

Re-measured (`--base e3690fe26~1 --reach-all`, all three
one call): 0 blocked at baseline and working tree each,
vacuous notes, smoke 24/24 → REACH-OK ×3. Matches the
D-log; no REGRESSED session. Gates per D-log: syntax 1
file, rule2, green 2/2, strict ×2, cohort 7/7 (full
skipped — end.js unshared, plausible).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
