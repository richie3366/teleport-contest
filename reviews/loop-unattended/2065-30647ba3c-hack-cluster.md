# Review 2065 — 30647ba3c — hack.c rounddiv/showdamage/doorless/to_any cluster

- SHA: `30647ba3c` (D-3105)
- Subject: "hack.c breadth cluster: rounddiv canonical + showdamage/doorless whole + to_any family + rock/notice completes (coverage)"
- js/ insertions: ~100 across 9 files (hack.js +92, 8 import/call files)
- Prior index: 2064; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: canonicalize clone-drifted `rounddiv` (3 clones → export,
panic live), port MISSING `showdamage`, restart PARTIAL
`doorless_door` with the rogue arm, export `uint/long_to_any`,
verify-complete rock/moverock/monst/obj/notice.

Diff actually adds: canonical `rounddiv` + 3 clone deletions,
`showdamage` + 2 mdamageu wirings, canonical `doorless_door` + clone
retirements + mhitm simplification, to_any pair + zap wrap, doc
sharpening. Matches the promise; no extra scope.

## Inventory

Per-function (cluster of 10, all hack.c — the ceiling, not over):

- `rounddiv` (hack.js:257, export) — C :4550–4572. Whole body.
- `showdamage` (hack.js:1856, async export) — C :4246–4253. Whole body.
- `doorless_door` (hack.js:148, export) — C :4062–4074. Whole body.
- `rock_disappear_msg` (hack.js:836) — C :314–324. Untouched, verified.
- `moverock_done` (hack.js:847) — C :326–333. Untouched, verified.
- `uint_to_any` (hack.js:236) — C :72–78. Whole body.
- `long_to_any` (hack.js:246) — C :80–86. Whole body.
- `monst_to_any` (hack.js:212) — C :88–94. Doc-only, verified.
- `obj_to_any` (hack.js:226) — C :96–102. Doc-only, verified.
- `notice_mons_cmp` (hack.js:3527) — C :1734–1741. Doc-only, verified.

Helpers: all LIVE — pline/You/YMonnam/the/xname, Upolyd,
Is_rogue_level/IS_DOOR/masks, start_timer consumer. No clones, no
stubs. Deleted-clone check (required — 5 clones retired):

```text
rounddiv         js/hack.js:257   sync
doorless_door    js/hack.js:148   sync
```

Single canonical homes, zero leftover clones.

## C ↔ JS fidelity

`rounddiv`: else-if sign chain, Math.trunc for long/int conversion
(double-exact, strictly more faithful than the old `|0` int32 wrap),
trunc/mod/half-up `2*m>=y`, `divsgn*r` — verbatim. y==0 loud throw
≡ C panic (message matches). Panic-unreachable proof, all 6 C sites:
eat.c:3058 → JS has C's `(basenutrit==0)?0:` guard as if/else
(eat.js:4485); mthrowu.c:236 → y=3 literal; polyself :390/:404 →
y=10 literals; :396 → `oldHpmax||1`; :409 → oldEnmax clamped ≥1.
Every divisor is provably nonzero — the old `return 0` behavior is
dead code removed, not a behavior change.

`showdamage`: guard `!showdamage||!dmg` → return; `[HP -dmg, mh/uhp
left]` with Upolyd select — exact. mdamageu arms at mhitu.js:616
(:1912, post-mh-decrement) and :625 (:1920, post-uhp-decrement)
match C order exactly (decrement → show → clamp → rehumanize/done).
losehp :4269/:4280 unwired — named (sync-losehp cascade, own
iteration; options default off ⇒ zero session delta). Ledger
`partial`. Correct.

`doorless_door`: IS_DOOR → rogue → `!(mask & ~(NODOOR|BROKEN))` —
verbatim, fixing two real C-wrongs (missing rogue arm, `m===` form
wrong on combined/zero masks). mhitm knockback simplification
proved C-exact: C uhitm.c:5302–5304 is `IS_DOOR && diagonal &&
!doorless_door` and JS is now exactly that — the old
`(Is_rogue_level || !old_doorless)` was the deviation. All 5 C sites
wired (rogue/mask corrections are C-exact at each by construction;
full 44/44 held).

`uint_to_any` (`>>> 0` ≡ C unsigned) / `long_to_any` (identity):
exact; zap.c:5109 melt site wrapped; nhlua Lua-only site + the
deliberately-unwrapped mklev site (C never wraps there) both named.
`monst/obj_to_any` identity collapse with per-file caller counts
(14/51 — csym shows 14 code refs + decl / 51 + decl: match).
`notice_mons_cmp`: distu-delta — and distu ≡ dist2 (hack.h:1531
macro), squared like notice_distu. Identical, not merely monotonic.

`rock_disappear_msg` (usteed/YMonnam vs You arms, async for pline)
and `moverock_done` (boulder loop, next_boulder=0) read in full —
exact, correctly untouched.

Callers: every C site mapped (rounddiv 6, showdamage 4 with 2 named,
doorless 5, rock/moverock 1 each, long 2 with 1 named, to_any
identity families, notice qsort use). No silent unwired caller.
8 import extends hit pre-existing edges (commit's 8× ALREADY claim
is consistent with the single-name import diffs; no new module edge
in any hunk).

Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.

## Hallucinations / overclaim

None. The "C-exact" simplification and "panic unreachable" claims
are both proved, not asserted.

## Density

Breadth-phase cluster: 10 functions (at the ceiling), one C file
(hack.c), ~100 js/ insertions. Each function has its own Inventory
block, its own `Ledger:` entry (ported×9/partial×1), and its own
Verify line. No bundled Must-fix. Per-function verdicts: ACCEPT ×10.

## Verification

Re-measured at this SHA (`--base 30647ba3c~1 --reach-all`, one call,
all 10): 0 blocked at baseline and working tree for every function,
vacuous notes printed, smoke 24/24 → REACH-OK each. Matches the
D-log exactly. No REGRESSED session. Shared gates per D-log: syntax
9 files, rule2, green 2/2, strict ×2, cohort 7/7, full 44/44 auto.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
