# Review 1636 — c9e4449a — dogmove.c find_friends whole-body port (D-2677)

**Metadata:** SHA `c9e4449a`, `dogmove.c`
`find_friends`, D-2677. JS: `js/dogmove.js`
only (+28/−9). No Must-fix.

## Intent vs deliverable

Subject promises: the perceives invis-tame
arm plus the `isok` call. Diff restarts the
body with exactly those two fixes, C
comments restored. Promise matches
deliverable.

## Inventory

- Restarted file-local `find_friends` (C
  `staticfn`, correctly unexported); no new
  helpers, no new imports, none deleted or
  re-pointed. Required `sym.mjs`:

```text
perceives        js/mon.js:240   sync
isok             js/const.js:2296   sync
                 js/hacklib.js:7   sync
```

`perceives` already imported (dogmove.js:9),
same call shape as `find_targ` :889.
`isok` uses the file-local (dogmove.js:265)
— body read and verified below.

## C ↔ JS fidelity

C locus: `dogmove.c:693–735` (43 L via
`csym.mjs`). Arm-by-arm confirm, no RNG:

- sgn ray, distmin start, loop with `isok
  :709` → `m_cansee :714` → mux/muy `:718`
  → `m_at :721` → tame `!minvis ||
  perceives :723–726` → leader/guardian
  `:728–732` — order and guards exact.
- The added `perceives(mtmp.data)` disjunct
  is the real fix, via live `perceives`.
- `isok` local read at js/dogmove.js:265:
  `x>=1 && x<COLNO && y>=0 && y<ROWNO` —
  identical to C `isok` (`x<=COLNO-1,
  y<=ROWNO-1`) on the integer domain, and it
  replaces an inline bounds check that was
  itself already equivalent, so no behavior
  change there by construction. Reusing the
  pre-existing local (shared with
  `can_reach_location` et al.) adds no new
  clone — verified CLONE, not a STUB.
- Caller: C `dogmove.c:787` → same-file
  `score_targ`, unchanged. None unwired.

## Hallucinations / overclaim

None.

## Density

One 41-line C function completed (one
dropped disjunct + call-shape fix), one
module. Right-sized.

## Verification

D-log Verify claims PASS with honest
0-blocked note. Re-ran `hidden-proxy.mjs
verify find_friends --base c9e4449a~1
--reach-all`:

```text
verify find_friends: baseline c9e4449a~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke find_friends: no RNG-tagged reach; fixed smoke spread (24 run, 6.7s): 24 PASS, 0 regressed → REACH-OK
```

No REGRESSED. Diff grep: no FORCE / DIAG /
RNG-log / seed / coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
