# Review 2719 — efa0e1eb6 — Unaware-guard writer (D-3858)

Metadata: SHA `efa0e1eb6`, D-3858, cliffs-head `mondata.c`
name_to_monplus writer (make_stunned/confused/vomiting
guard read dead `u.Unaware`). JS: `js/potion.js` (+10/−4:
3 guard swaps + make_sick doc). Test:
`scripts/make-unaware-talk-suppress.test.mjs` (new, 4
asserts: 3 asleep-silence + awake control).

## Intent vs deliverable

Promise: Healer-578216@1431 — C silences the Stun-expiry
cure via `if (Unaware)` but JS read the never-written
`u.Unaware` field, printing a dream-wrapped steadier line
that buried "You wake up." behind --More-- and ate the
wish keys; swap all three guards to live `Unaware()`;
session FULL PASS. Diff actually does that. Match.

## Inventory

- make_vomiting (potion.js:826): `if (u.Unaware)` →
  `if (Unaware())`. C: potion.c `:242–255` (read):
  guard at `:247–248`.
- make_confused (potion.js:935): same swap. C: `:88–
  104` (read): guard at `:93–94`.
- make_stunned (potion.js:994): same swap. C: `:106–
  131` (read): guard at `:111–112`.
- make_sick doc (potion.js:1080): "Unaware talk
  suppress" omit → `:145` #if 0 design note. C
  `:138–150` read: `#if 0 /* tell player even if
  hero is unconscious */` — verbatim true.
- No signature changes; all wired callers benefit.

## C ↔ JS fidelity

Branch-by-branch confirm. All three C guards are the
identical two-liner `if (Unaware) talk = FALSE;`
before any talk use; the JS replacements are the
same statement with the live macro import. The live
`Unaware()` (eat.js:477, read) is `multi < 0 &&
(unconscious() || is_fainted())` — the youprop.h:399
macro shape, and the import at potion.js:187
pre-exists (read: shared line with newuhs et al.),
so no new static edge. The `u.Unaware`-dead claim
holds directionally: `sym.mjs Unaware` shows the
eat.js export plus 6 local clones elsewhere (dig,
lock, mhitu, muse, were, zap) — the D-log's
follow-up lead names the same files. No RNG in any
arm (message-only), so no keystream risk.

## Hallucinations / overclaim

None. Symptom-owner discipline kept: name_to_monplus
untouched (stands per D-2577/D-3405). The
same-C-file ride-along (confused/vomiting share
potion.c with stunned) is within the cliff rule.
No DIAG/FORCE/seed in the js hunk — grep hits are
commit-text only.

## Density

Cliff-phase: parent HEAD was name_to_monplus (1
block, RNG lost 3891 — the head at c7e7d049e);
writer identified from the differing topline (extra
steadier backlog line → buried wake → eaten keys),
not a painter re-port. Ledger: 3× ported + D-3858.
Reached: probe FULL PASS.

## Verification

Rule #2 clean (iteration-wide run). Re-measure
(mine): `verify name_to_monplus --base efa0e1eb6~1
--reach-all` → `1 session(s) blocked on it (1 at
baseline, 0 in the working scoreboard)`,
Healer-578216 PASS, `1 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS`; smoke 24/24
REACH-OK (no RNG-tagged reach). Zero regressed.
The FULL-PASS claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
