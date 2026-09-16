# Review 1369 — 285aea6b — docrt early-arm botlx (D-2403)

- SHA: `285aea6b`, D-2403 (review 1366 Must-fix). JS file:
  `js/display.js` only (+7/−2). Scoreboard touched (verify resale).
- Prior reviews closed: 1366 (C-wrong 1: early arms skip `botlx`
  behind the false "skip it as in C").

## Intent vs deliverable

Subject promises `botlx` on the three early `return`s (mirroring the
`post_map` join), keeping `update_inventory()` and the `redrawonly`
arm as named omits. Diff delivers all three sets plus the map and
in-code omit notes. Promise kept.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `docrt` early arms ×3 (display.js:5369–5391) | new flag sets | LIVE — match C `goto post_map` |
| `docrt` main-path set (:5420) | untouched (D-2400) | LIVE |
| `redrawonly` arm | still unported | OMIT — named in map + in-code, with its `botlx` |

No symbols deleted or re-pointed; no new imports/edges (direct
`game.flags` writes). No `sym.mjs` owed.

## C ↔ JS fidelity

C locus: `docrt_flags` (`display.c:1711–1773`; `docrt()` itself is the
3-line `:1702–1705` wrapper passing `docrtRecalc`, never maponly) +
`post_map` (`:1763–1771`), read in pinned source.

- All four non-vision arms `goto post_map`: `redrawonly` (`:1722`),
  `u.uswallow` (`:1726–1728`), Underwater (`:1730–1732`), `u.uburied`
  (`:1734–1736`). `post_map` sets `disp.botlx = TRUE` whenever
  `!maponly` — i.e. on every plain-`docrt()` call. JS now sets
  `game.flags.botlx = true` on all three ported early arms. ✓
- `!u.ux`/`in_docrt` early return (`:1717–1718`) skips `post_map`
  entirely — JS skipping `botlx` there is exact, as the D-log's Named
  line claims. ✓
- `redrawonly` arm stays unported with its `botlx` folded into the
  omit (map + in-code comment both updated) — exactly what review
  1366 prescribed. `update_inventory()` stays a named omit (D-2400);
  display-only, RNG-free. ✓
- No RNG touched; `Underwater ≡ u.uinwater` and the `cls()` before
  `swallowed(1)` are pre-existing, untouched by this diff. ✓

## Hallucinations / overclaim

None. The D-log leads with "no corpus session blocked … not a
first-diff owner" and labels the hidden check vacuous itself — the
opposite of a PASS claim. Corrects (not repeats) the D-2400 false
C-claim.

## Density

+7/−2 for a Must-fix: one item, alone, per §2b. Right-sized (the
false claim it retires would have misled campaign step 2).

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean on scored `js/`
  (re-run this audit).
- Re-measured: `hidden-proxy verify docrt --base 285aea6b~1` →
  `0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)` — "a vacuous verify is NOT a corpus PASS". Matches the
  D-log exactly; the queue row cited no blocks, so no `--base`
  archaeology is owed. Review 1366's Must-fix ships on the C citation
  + gates, which is the honest basis stated.
- D-log's green 2/2 + strict ×2 + cohort 7/7 + full 44/44 (auto on a
  shared file) accepted.

## Actionable C-wrongs

None. Review 1366's C-wrong 1 is fully addressed: three early arms
set, `redrawonly`-arm `botlx` named in the omit. No new Must-fix.

Verdict: **ACCEPT**
