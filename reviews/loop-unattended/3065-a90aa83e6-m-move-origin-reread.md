# Review 3065 — a90aa83e6 — m_move re-reads omx/omy at not_special

- SHA: `a90aa83e6` (cliffs head m_move, 20 scen-vault-* rows, e.g.
  scen-vault-Monk-53456032 step 150)
- D-entry: D-4225; Ledger: m_move partial → **ported** (omit text
  dropped)
- `js/` diff: monmove.js +6 −2

## Intent vs deliverable

Promise: C m_move re-reads `omx = mtmp->mx; omy = mtmp->my;` at
`not_special:` (monmove.c `:1853–1854`), because gd_move / shk_move /
pri_move can relocate the monster before returning -1. JS kept the entry
`const omx/omy`, so a guard that gd_move had `rloc`ed went on with its
pre-rloc square. That stale square went into mtrack and remove_monster
cleared the wrong cell, and the next move skipped the track-avoidance
`rn2(4*(cnt-j))`.

Diff: `const` → `let` on omx/omy (`:2136–2137`), and a re-read right
after the not_special `u.uswallow` early return (`:2268–2271`). The
diff matches the promise. It adds no helpers and deletes no symbols.

## Inventory

- m_move — js/monmove.js:2129 (C monmove.c `:1714–2075`, per
  `csym.mjs m_move`). Only the two origin lines changed.
- Callees on the touched path, unchanged: gd_move / shk_move / pri_move
  (awaited, LIVE), postmov (LIVE, gets the entry omx on the 0/1 arms as
  in C), couldsee / dist2 / gettrack / mon_track_add below not_special
  (these now read the re-read origin).
- `sym.mjs m_move` → `js/monmove.js:2129 ASYNC — await required` (no
  clone). No symbol deleted or re-pointed, so there is no other sym.mjs
  output to paste.

## C ↔ JS fidelity

C `:1806–1826` then `:1850–1854`:

```c
case -1: mmoved = MMOVE_NOTHING; break;   /* fall through to normal AI */
...
 not_special:
    if (u.uswallow && !mtmp->mflee && u.ustuck != mtmp)
        return MMOVE_MOVED;
    omx = mtmp->mx;
    omy = mtmp->my;
```

- Position: JS re-reads after the uswallow return and before
  `ggx/ggy`, the same place as C. The swallow return uses neither
  origin, so the order is net-identical.
- Arms before not_special (mintrap, meating, hides_under, dog_move,
  covetous, the shk/gd/pri 0/1 arms, tengu) pass the entry omx to
  postmov. C has not re-read yet on those arms either, so they match.
- Tengu arm: C `rloc`/`mnexto` then `postmov(…, omx, omy, …)` with the
  entry origin. JS does the same (`:2261`), so it matches.
- After the re-read, should_see, appr, gettrack, the mfndpos origin,
  remove_monster and mon_track_add (`:2062`) all read the new square.
  The re-read draws no RNG. The RNG fix is downstream: the right mtrack
  head brings back the `rn2(16)` at `:2003`.

**Gap in the same function (pre-existing, not in the diff):** C
`:1769–1770`

```c
    if (mtmp->wormno)
        goto not_special;
```

has no JS counterpart. `grep -n wormno js/monmove.js` hits only
see_wsegs (`:1914`), worm_nomove (`:2438`), worm_move (`:2507`) and
`:2975`. Nothing in m_move matches the gate. A long worm with segments
skips dog_move, the covetous arm, the shk/gd/pri arm, the mail daemon
and tengu in C. JS runs them all. The live case is a tame long worm
(dog.c tamedog `:135–136` keeps `wormno` and redraws the worm). C moves
it with the normal AI. JS calls `dog_move`, which has different RNG and
a different target. The commit promoted m_move to `ported` and wrote
"Named omissions: none in m_move", so that status is wrong.

## Hallucinations / overclaim

- The re-read itself is honest, and the measurement (temp log, guard
  m_id 419, mon_track_add(51,15) vs C (24,15)) is concrete.
- Overclaim: the ledger flip `partial` → `ported`, together with
  "Named omissions: none", certifies the whole m_move body. The wormno
  `goto not_special` (`:1769–1770`) is missing. This is the same
  pattern as review 2956: a "rest of body matches" claim that the C
  does not support.
- The dropped omit (other JS newsym callers do not drain
  `_newsym_misuse`) was about newsym's callers, not m_move. Dropping it
  from m_move's row is fine.

## Density

One cliff, the cliffs head, a two-line C-shaped fix with 20 rows
moving. Right-sized. The whole-function rule (§10.18) is not met
because of the wormno gate, but that gap predates the commit and only
the ledger promotion made it a claim.

## Verification

```text
hidden-proxy verify m_move --base a90aa83e6~1 --no-reach
  verify m_move: baseline a90aa83e6~1 (scoreboard at ea79c1bf8) —
    20 session(s) blocked on it
  verify m_move: 20 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

My re-run uses HEAD's code, so it also includes D-4226..D-4230. The
D-log's own count at the SHA was 18 PASS and 2 moved past, and the 2
moved rows (newsym `<0,0>`) were later fixed by D-4227/D-4226. The D-log
also has the frozen-runner PASS for Monk-53456032, green 2/2, strict ×2,
cohort 7/7, full 44/44 and sweep 735/0 regressed (REACH-OK). Rule #2:
`imports.mjs --rulecheck` → clean. The diff has no FORCE, DIAG,
getRngLog or seed reads.

## Actionable C-wrongs

1. m_move lacks C `:1769–1770` `if (mtmp->wormno) goto not_special;`.
   A segmented long worm, tame ones included, must skip dog_move, the
   covetous arm, shk/gd/pri, the mail daemon and tengu, and go straight
   to the not_special normal AI. Port the gate after `set_apparxy`
   (C `:1761`) and the can_* setup, before the `mtame` arm. Until then
   the ledger row should not say `ported`.

Verdict: **QUALITY-RISK**
