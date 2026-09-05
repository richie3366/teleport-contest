# Review 843 — d6db25d5 — artifact.c artifact_hit elemental plines (D-1873)

Metadata: SHA `d6db25d5`, D-1873, `js/artifact.js` (+80/−17: async
preamble + four basic-attack plines) + one-line awaits in `js/uhitm.js`,
`js/mhitu.js`, `js/mhitm.js`, `js/dothrow.js` (×2), `js/mthrowu.js`;
map + queue/archive stamps. No symbols deleted or re-pointed.

## Intent vs deliverable

Subject promises the `artifact_hit` preamble + four basic attacks in C
order for the `artifact_hit` corpus owner (C «The massive hammer hits
the Aleax.» vs JS empty at `artifact.c:1515`, two sessions). Diff
delivers exactly that: `youattack`/`youdefend`/`vis`/`hittee`/
`spec_dbon`, awaited `impossible`, `realizes_damage`, four pline arms,
ELEC `wake_nearto`, FIRE Slimed `burn_away_slime`, `realizes_damage`
returns, all five call sites awaited. Matches.

## Inventory

Changed: `artifact_hit` (sync → async) in `js/artifact.js:1999`;
new file-local `PM_WATER_ELEMENTAL` const + `isHero`/`monPos` closures;
new static imports `cansee`, `mon_nam`, `wake_nearto`,
`burn_away_slime`, `impossible`, `engulfing_u`; five caller awaits.
No new exported functions, no deletions.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/artifact.c` `artifact_hit`
(`:1446–1721` per `csym.mjs`; the D-log cites `:1447–1530` for the
ported envelope). Walked the preamble + four arms branch-by-branch:

- `youattack`/`youdefend` (`magr/mdef == &gy.youmonst`): JS `isHero`
  covers `game.youmonst` + the module sentinel + `_youmonst`. Defensive
  triple-check, harmless — every caller passes one of the three. ✓
- `vis` (`:1459–1462`): `(!youattack && magr && cansee(magr)) ||
  (!youdefend && cansee(mdef)) || (youattack && engulfing_u(mdef) &&
  !Blind)`. JS reproduces the short-circuit order; extra `!!pa`/`!!pd`
  null guards are safe additions (C never passes null mdef). Hero pos
  resolves via `u.ux/uy`, which is C's `youmonst.mx/my`. ✓
- `hittee` before `spec_dbon`, `spec_dbon` before the self-attack check
  (`:1466–1474`) — JS keeps C's order. ✓
- `realizes_damage = youdefend || vis || (youattack && mdef ==
  u.ustuck)`: JS `game.u?.ustuck === mdef` is the same identity test. ✓
- FIRE `:1480–1494`: hits/vaporizes-part-of/burns verb + `./!` punct
  split, `rn2(4)` burned with body deferred, Slimed `burn_away_slime`
  after the gate, `return realizes_damage` — all in C order. Water-
  elemental identity via `data.mndx`, the file's established pattern
  (`artifact.js:1850` uses the same field). ✓
- COLD `:1495–1505`: hits/freezes + `rn2(4)`, returns
  `realizes_damage` (was unconditional `true`). ✓
- ELEC `:1506–1520`: «hits» vs «hits!  Lightning strikes» split,
  `wake_nearto(mdef, 4*4)` when applies **before** the `rn2(5)` burn —
  C order preserved. The `&& pd` guard only skips a call C would make
  with garbage coords; unreachable in practice. ✓
- MAGM `:1521–1529`: hits/missiles split, no RNG. ✓

RNG audit: plines burn nothing; `wake_nearto`/`burn_away_slime` sit at
their C positions relative to the `rn2` gates. Corpus confirms RNG
aligned through the `rnd(20)` dieroll.

Callee closure (`sym.mjs`, this review): `mon_nam` `js/do_name.js:1029`
sync; `cansee` `js/vision.js:1093` sync; `impossible`
`js/display.js:6443` ASYNC (awaited ✓); `wake_nearto`
`js/mon.js:1266` ASYNC (awaited ✓); `burn_away_slime`
`js/timeout.js:1206` ASYNC (awaited ✓); `engulfing_u`
`js/const.js:3185` sync. `Blind()` is the pre-existing file-local
clone (`artifact.js:1089`, C `youprop.h` cited, D-0716) — verified
CLONE, not a new one; `wake_nearto`'s 4 clones elsewhere untouched,
this commit imports the export. `imports.mjs --can` on all three new
module edges → ALREADY (no new edge). Every arm's callee is LIVE or a
verified CLONE; deferred bodies (`destroy_items`/`ignite_items`,
`Mb_hit`, BEHEAD/DRLI) are named in commit + map, not stubs in a live
arm — the gates still burn.

## Hallucinations / overclaim

None. "In C order" is earned (above). The commit message's import
claim (`--can` SAFE) re-verified true.

## Density

One C function envelope, one module + mechanical awaits. Right-sized
per §2b.

## Verification

D-log Verify bullet is complete (syntax + rule2 + hidden PROGRESS +
green/strict + cohort 7/7; full skipped, no shared file changed —
true, `artifact.js` is not shared-startup). Re-ran myself:
`hidden-proxy.mjs verify artifact_hit --base d6db25d5~1` →
`1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(`19199bfa: PASS`; `5dfef5c4: moved → itemactions at step 853`) —
matches the D-log line-for-line. Re-ran `imports.mjs --rulecheck`:
clean. No FORCE/DIAG/seed/coordinate hits in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
