# Review 2560 — 6710a9083 — can_make_bones portal scan (D-3686)

- SHA: `6710a9083af1507e71982702f868acf2036726bd`
- Subject: next-live-head `bones.c` can_make_bones: portal scan read stale `game.ftrap` (null on fresh levels), missed wizard3's levregion portal → wizard "Save bones?" C never asks (Tourist-92134 81→PASS) (D-3686)
- D-entry: D-3686. Type: next-live-head (owner-null, death path).
- Diff size: `js/end.js` +13/-4 (portal arm); + test; ledger D-tag.

## Intent vs deliverable

Promise: scan the live `level.traps` array first, then the
`ftrap` node chain when set — fresh levels leave `game.ftrap`
null while `maketrap` only feeds the array, so the portal
was missed. Tourist-92134 → FULL PASS.

Diff actually does: exactly that. No new imports; pure
existence scan (no RNG, mutation, or order sensitivity —
first hit returns). No DIAG/FORCE/seed reads.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `can_make_bones` portal arm (`js/end.js:655`) | array scan + guarded chain scan replacing chain-only scan | `bones.c:369–374` |

No symbols deleted or re-pointed (`sym.mjs` check N/A).
Helpers: none; `Is_branchlev`/`MAGIC_PORTAL` pre-existing.

## C ↔ JS fidelity

- `csym`: `bones.c:355–385`. The portal arm is exactly
  `:369–374` as cited: `if (!Is_branchlev(&u.uz)) {
  for (ttmp = gf.ftrap; …) if (MAGIC_PORTAL) return FALSE; }`.
  Sole caller `end.c:1201` (`bones_ok = … can_make_bones()`)
  → JS `:1097`, pre-wired ✓.
- Lifecycle claims all verified in-tree: `maketrap` pushes
  `game.level.traps` only (`js/trap.js:1111–1112`);
  `game.ftrap = null` on fresh levels (`js/do.js:1971`);
  restore sets `game.ftrap = info.level.traps`
  (`js/save.js:1118`) — the same array, so the
  `!Array.isArray` guard skip is safe (and its hypothetical
  divergence is disclosed as pre-existing with a pointer,
  not assumed away).
- Shape precedent is real: `js/quest.js:294–306` carries the
  identical dual-source portal find (same comment, same
  guards) for the same C loop.
- Draw-free reasoning closes the loop: every other FALSE arm
  was excluded by measurement (bones On, ledger 39 in range,
  no_bones FALSE, uswallow 0, depth arm draws `rn2` — absent
  from the recording after step 71), leaving the portal arm;
  the function is boolean into `bones_ok`, so the portal
  FALSE fully determines the prompt behavior — and the
  session now passes end to end.
- "Dead in C" side claim verified: zero `save_dlevel =`
  assignments in `src/*.c` (`decl.h:854` decl only).

## Hallucinations / overclaim

None. The elimination argument names each excluded arm with
its evidence (including the `decl.h:854` check and the
`save.js:1118` same-array pointer for the one corner the
fix does not cover). Rule #2 clean (iteration `--rulecheck`).

## Density

Next-live-head pop per CURRENT Next cluster (Must-fix empty,
head maxed recorder-artifact, coverage empty, batch dry).
One function arm, own `Ledger:` entry. Right-sized.

## Verification

D-log claim: test 0/1 → 1/1; targeted rescore 931→932
(FULL PASS 84/84 + 17006/17006), 0 regressed; `verify`
vacuous-hidden (owner-null) + reach (80 run) + full 44/44.

Audit re-measure: git scoreboard diff
`6710a9083~1 → 6710a9083` shows exactly 1 changed row —
Tourist-92134 step 81 → PASS (17006/17006 RNG, 84/84 scr),
PASS 931→932, zero other rows (0 regressed, non-vacuous).
`verify can_make_bones --base 6710a9083~1 --reach-all`
reproduces 0-blocked + REACH-OK over the full reach set
(195 run, 195 PASS — stronger than the D-log's 80-run
smoke). Claim reproduced exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
