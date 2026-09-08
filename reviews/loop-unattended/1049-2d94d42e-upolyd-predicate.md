# Review 1049 — 2d94d42e — Upolyd umonnum predicate (D-2079)

## Metadata

- SHA: `2d94d42e` — `you.h Upolyd was mtimedone-based, so timeout-expiry rehumanize kept the monster umonnum and lost «You can see again.» (queue owner rehumanize) (D-2079).`
- JS diff: `js/const.js` +8/−2 (one-line predicate + 6-line why-comment).
- Docs: D-2079 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1049.

## Intent vs deliverable

Subject promises: `Upolyd` reads `umonnum != umonster` per
`you.h:554` instead of `mtimedone > 0`, fixing timeout-expiry
rehumanize (stale mold umonnum, stuck FROMFORM Blind, lost «You can
see again.»). Diff actually changes exactly the one predicate plus
the explanatory comment. Promise == diff.

## Inventory

- Changed: `Upolyd(player)` (const.js:3164) — single canonical
  definition inherited by ~116 call sites, no import/edge change.
- No new/deleted symbols. Diff grep: no `FORCE`/`DIAG`/seed/step
  reads, no `fastforward`, no coordinates. Zero RNG (pure predicate).

## C ↔ JS fidelity

C `you.h:554` (read directly): `#define Upolyd (u.umonnum !=
u.umonster)`. JS is now `!!player && ((player.umonnum|0) !==
(player.umonster|0))` — verbatim with null-guard/`|0` accommodation
(undefined fields read 0 == 0 → false, same default as the old
falsy-mtimedone read).

Maintenance closure verified writer-by-writer (the load-bearing
check for a predicate change): C writes `u.umonnum` at exactly
`u_init.c:991` (both = role mnum — JS u_init.js:1869–1870 sets both),
`polyself.c:814` polymon (`= mntmp` — JS polyself.js:1088),
`polyself.c:210` polyman `if (Upolyd)` restore (`= umonster` — JS
:657 inside the same `if (Upolyd(u))` gate), `polyself.c:293–299`
change_sex (`if (!Upolyd)` no-op restore; the succubus swap is
inside `#if 0`, correctly absent — JS :637 + amorous-demon defer
note match). No other C writer exists; `umonster` is written only at
role init both sides. The fix is self-consistent where it matters
most: at timeout expiry C calls rehumanize→polyman with mtimedone
already 0 but umonnum still mold, so C's own `if (Upolyd)` gate
fires — and now JS's identical gate fires too (under the old
predicate it skipped the restore, which was the reported bug).

Named: none new. rehumanize/polyman residual omits listed, none
reached by a blocked session.

## Hallucinations / overclaim

None. The commit message's maintenance claim («umonster written only
at role init; umonnum only via role init / polymon / polyman restore
/ change_sex no-op») reproduces exactly against pinned C.

## Density

8 insertions for a one-line macro correction with 116 call-site
footprint — minimal diff, maximal leverage. (Shared-file change, so
the full-suite run below was owed and present.)

## Verification

D-log Verify bullet: `verify --fn rehumanize` → `0 PASS, 2 moved
past` (92119 90→save_dungeon@123; 92076 →mhitm_knockback@159) +
green + strict + cohort + explicit full `sessions` 44/44 (shared
const.js). Re-measured myself: `hidden-proxy.mjs verify rehumanize
--base 2d94d42e~1` → `0 PASS, 1 moved past (92119 → save_dungeon@123,
identical), 0 unchanged, 0 worse → PROGRESS`. The baseline shows 1
session, not 2 — explained, not contradictory: the `--base`
scoreboard (pinned at 84dc0e34) still attributes 92076 to its older
owner, while the D-log ran against the iteration's re-scored working
scoreboard. Corroboration, not a gap: the working scoreboard in my
tree right now lists 92119 at save_dungeon@123 AND 92076 at
mhitm_knockback@159 (uhitm.c:5258, step 159) — both D-log moves
reproduced exactly on current code, both strictly forward of their
rehumanize steps, zero WORSE. Full-suite 44/44 claim is the
auditor's end-of-iteration re-run below.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
