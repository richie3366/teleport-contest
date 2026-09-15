# Review 1312 — 3f6c64d3 — do_break_wand residuals (D-2346)

Metadata: SHA `3f6c64d3`, D-2346, C-fidelity residual (queue row cited 0 blocks; retires D-0949/D-0950/D-0952/D-0979/D-0999 named lines). Method: full `js/` hunks read (`apply.js` only, +22/−15); C `do_break_wand apply.c:3909-4146` residual lines via targeted grep + context reads (`:3943-3954` bill/freeinv, `:4009-4014` striking, `:4039-4052` ICE, `:4095-4131` bhitpos/botl/uhim); `sym.mjs` on `freeinv_pie`/`uhim`/`spot_stop_timers`/`check_unpaid`; `imports.mjs --can` apply→sndprocs (ALREADY); `lev` def + `_bhitpos` alias-hazard + `disp?.botl || flags?.botl` idiom checks; added-lines banned grep (0 case-sensitive hits — the 2 insensitive hits are `se_wall_of_force`, the C effect name); `--rulecheck` clean (iteration run); `hidden-proxy verify do_break_wand --base 3f6c64d3~1` re-run.

## Intent vs deliverable

Subject promises seven skipped C lines: use-charge bill, real freeinv, striking Soundeffect, ICE melt timers, three bot() sites, bhitpos alias, `uhim()` killer. Diff delivers all seven with C-verbatim comments. Promise kept exactly.

## Inventory

- Head: `await check_unpaid(obj)` + `freeinv(obj)` (re-pointing the local `freeinv_pie` clone at this arm) + C comments verbatim (`:3943-3954`).
- Striking: `Soundeffect(se_wall_of_force, 65)` before the pline + verbatim comment (`:4009-4014`).
- Loop: `game.bhitpos = game._bhitpos` alias per cell; `spot_stop_timers(x, y, MELT_ICE_AWAY)` on ICE (`:4044-4048`); `bot()` after both bhitpile sites + after zapyourself; comment-only line where C comments it out (`:4097`); `uhim()` killer (`:4116`).
- Imports join existing edges only (`bot`, `spot_stop_timers`, `check_unpaid` ALREADY; `Soundeffect` ALREADY — the "SAFE/new" message is imprecise in the safe direction; `se_thunderclap`-style generated const, no edge).

## C ↔ JS fidelity

Line-for-line vs the C sites above: unpaid gate + "Extra charge for use" ✓; current_wand/freeinv/setnotworn trio with all three C comments ✓; striking effect + "before the explosion" comment + `d(1+spe,6)` untouched ✓; ICE equality + timer call ✓ (`lev` defined `:1254`, above use); bhitpos set per cell like `gb.bhitpos` ✓; `if (disp.botl) bot()` ×3 with the `/* potion effects */` / `/* blindness */` comments ✓ and the commented-out bhitm site rendered as comment-only ✓; `killed %sself by breaking a wand` + `uhim()` ✓.

Callee closure: `freeinv_pie` is a pre-existing local clone STILL used at `apply.js:1043` — this arm's re-point to canonical `freeinv` is exactly C; the clone's remaining debt is not this commit's. `uhim` LIVE (`roles.js:721` sync):

```text
uhim             js/roles.js:721   sync
```

Alias hazard checked: `_bhitpos` is only field-mutated inside the loop (reassignments live in do/do-throw/muse paths, outside it), so the alias holds for the whole loop; post-loop it retains the last cell exactly like C's single slot. The dual `disp?.botl || flags?.botl` read pre-exists verbatim (`zap.js:5212`) — file-wide `disp.botl` mapping, not invented here. (The D-log's "cancel_item precedent" points at sets rather than this read, but the exact read expression it cites is established in-tree, so the conclusion stands.)

Also confirmed:
- ICE `lev` (`apply.js:1254`) is defined above its use in the same iteration; `MELT_ICE_AWAY` joins the existing dynamic destructure.
- `check_unpaid` is the single canonical async export (`shk.js:3264`, awaited — no local clone involved).
- `dmg = d(1+spe, 6)` is byte-untouched (comment-only `/* normally 2d12 */` matches C).
- `freeinv` needed no new import line (already imported — verified in the import block).
- Removed `void ICE;` leaves no dangling reference (`ICE` stays in the destructure for the new comparison).

## Hallucinations / overclaim

None. "Real `freeinv(obj)` (already imported)" verified — no import line changes for it.

## Density

+22/−15 retiring five D-ids' named lines. Good.

## Verification

D-log tail PASS (syntax/rule2/green/strict/cohort, after last `js/` edit) with the hidden bullet honestly vacuous. Re-measured:

```text
verify do_break_wand: baseline 3f6c64d3~1 — 0 session(s) blocked (0 at baseline, 0 working)
```

Matches (vacuous note, no `--base` owed). Banned grep 0 hits; `--rulecheck` clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
