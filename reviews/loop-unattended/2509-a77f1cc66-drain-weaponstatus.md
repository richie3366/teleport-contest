# Review 2509 — a77f1cc66 — drain_en botl mirror + weaponstatus home

Metadata: SHA `a77f1cc66` (D-3629), cliffs-head `botl.c` do_statusline2
(region-heuristic owner; two writers). js diff: `js/trap.js` +2,
`js/options.js` +1/−1, new `scripts/drain-weaponstatus-paint.test.mjs`.
≤10-function SHA: full Method on both touched sites.

## Intent vs deliverable

Promise: (1) `drain_en`: add `if (game.flags) game.flags.botl = true;` in
both arms (paranoia + else), house pattern — JS `bot()` reads `flags.botl`
but drain_en set only `disp.botl`, so the Pw paint lagged one drain. (2)
`DOSET_BOOL_ADDR.weaponstatus`: home `iflags`→`flags` per
`optlist.h:866` — the toggle wrote where no reader looks, so BL_WEAPON stayed
blank. Claims 2 PASS + 1 moved (engulf 163→reveal_terrain@252) + REACH-OK.

Diff actually adds: exactly those 3 lines. Matches the promise.

## Inventory

- `drain_en` (`js/trap.js:3065`, async) — flags.botl mirror ×2.
- `DOSET_BOOL_ADDR` (`js/options.js:10381`) — weaponstatus home fix.

## C ↔ JS fidelity

C `drain_en` (`nethack-c/upstream/src/trap.c:5201–5244`, via `csym.mjs`):
paranoia arm sets `disp.botl = TRUE` (`:5215`), else arm sets `disp.botl =
TRUE` (`:5241`), then `You_feel(...)` (`:5244`) — whose pline repaints status
first. JS already set `game.disp.botl` at both sites; the SHA adds the
`game.flags.botl` twin at both. House pattern verified, not assumed:
`js/trap.js` carries 8+ paired disp/flags botl writes (e.g. `:3026–3027`,
`:3259–3260`, `:3565–3566`). Both C arms mirrored, none missed.

C home (`include/optlist.h:865–866`, read at the pinned path):
`NHOPTB(weaponstatus, ... &flags.weaponstatus, ...)` — the `:866` cite is
exact. Consistency verified across `js/`: every reader uses the flags home
(`do_wear.js:703`, `wield.js:1188`, `do.js:551`, `botl.js:1116/1827/3514`),
the options table row (`options.js:12279`) already says
`addr: { obj: 'flags', ... }`, and zero JS lines read
`iflags.weaponstatus` — the DOSET row was the lone outlier, and no
split-brain remains after the fix.

RNG call-for-call: C `drain_en` draws `rnd(n)`/ `rnd(-u.uen)` in the else
arm; the SHA touches no draw lines — flag mirrors only, paint timing only.
The D-log's MEASURED note (JS uen already correct at 143; only the
pause-time paint lagged) is consistent with a botl-only delta.

`sym.mjs` re-point check: N/A — no symbol deleted, re-pointed, or added
(data-home edit; no import edges). No clones involved.

## Hallucinations / overclaim

None. Both writers are measured (per-step RNG slices + truncated replays,
values quoted), the C cites check out, and the D-log discloses the known
twin (`armorstatus` same one-word class) as deliberately NOT fixed — "fix
when a session names it". That is honest scoping, not a miss. No
dispatch-over-stub anywhere in the diff.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads/
`fastforward`/hardcoded coords. Rule #2: global `--rulecheck` clean (2506).

## Density

Cliff phase: one cliff row (do_statusline2, 3 blocks), both writers its
probe sessions named, each fix at the exact diverging write. Two
`Ledger:` entries (`drain_en ported; doset partial`). No second-file work
(two files, one row — the row's own writers). Not a no-op: 3/3 probes move.

## Verification

Re-measured:
`node scripts/hidden-proxy.mjs verify do_statusline2 --base a77f1cc66~1 --reach-all`:

- `verify do_statusline2: 2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (options-Monk-94371 PASS, wish-Monk-92194 PASS, engulf-94292 moved →
  reveal_terrain@252, was 163)
- `smoke do_statusline2: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log Verify bullet exactly (this also confirms the
landing-owner chain cited in review 2508: Archeologist left do_statusline2
here). No REGRESSED session. Committed test re-ran: 2 pass / 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
