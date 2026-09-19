# Review 1466 — e8a1702e — `mthrowu.c` ohitmon + `muse.c` munstone (D-2507)

Metadata: SHA `e8a1702e`, `js/mthrowu.js` +150/−~50, `js/muse.js` +23. C `mthrowu.c:321–502` (`ohitmon`, 182 lines) + `muse.c:2883–2903` (`munstone`, 21 lines). D-log: D-2507. (Note: `csym.mjs ohitmon` finds no definition — read `mthrowu.c` directly at the cited lines.)

## Intent vs deliverable

Promise: C-order restart of the hit arm (distant_name, spec_abon, harmless, acid-immune, poison, silver, acid-burn, egg-petrify, kill, can_blnd, setmangry, boulder tail) + new exported `munstone`. Diff delivers all of it. Promise = deliverable.

## Inventory

- Restarted hit arm in `ohitmon` (mthrowu.js, exported — C is global); miss/potion arms kept byte-equivalent.
- New `export async function munstone` (muse.js) reusing same-file locals `mcould_eat_tin`/`cures_stoning`/`mon_consume_unstone` (prior D-1809/D-1899 ports, untouched).
- New import words: `stone_missile`, `spec_abon`, `minstapetrify`, `munstone` — all hoisted `export function` decls; mthrowu→muse edge ALREADY present. Nothing deleted or re-pointed.

## C ↔ JS fidelity

Verified against the C text (not the message): to-hit `5+find_mac+omon_adj`, marcher `m_lev>5` + `MON_WEP`/`spec_abon` gated on `marcher && mtarget==mtmp` ✓; miss arm (`distant_name`, "It is missed.", range-0 `drop_throw` at mon cell) ✓; potion arm (seemimic/msleeping/`POTHIT_OTHER_THROW`) ✓; `passes_rocks` macro inlined byte-exact (`mondata.h:208`) ✓; `dmgval` + acid-immune 0, `#if 0` orc/elf arm correctly unported ✓; egg `an(pmnames[corpsenm][NEUTRAL=2])` ✓; poison `rn2(30)`/`rnd(6)` vs deadly `damage=mhp` ✓; silver `s_suffix`-flesh + seared, extra damage left in `dmgval` per the C note ✓; acid-burn three-way ✓; egg-petrify `munstone→minstapetrify` + `resists_ston` zero ✓; kill verb incl. vampshifter + xkilled/mondied boulder gate ✓; `can_blnd(NULL,…,venom?AT_SPIT:AT_WEAP)` + `min(127,+rnd(25)+20)` ✓; setmangry ✓; `drop_throw(…,1,bhitpos)` + range-−1 re-extract ✓.

`DEADMONSTER ≡ mhp<1` (`monst.h:214`), so the three `mhp>0` gates are exactly `!DEADMONSTER` ✓. RNG order call-for-call (`rnd(20)` → `rn2(30)`/`rnd(6)` → `rnd(25)`) ✓. `munstone` ≡ C line-for-line incl. `meating||helpless` inline and strategy clear ✓. do.c:210 non-caller matches C's own "normally we'd use ohitmon() but…" comment ✓.

Minor (not queued): the new `game.bhitpos?.x ?? mtmp.mx` fallback has no C counterpart (C reads the always-present struct, possibly stale); `game.bhitpos` is eagerly defaulted elsewhere, so the fallback is nearly dead defensive code, not trace-shaping.

## Hallucinations / overclaim

None. `#if 0` and do.c:210 claims check out against C.

## Density

Whole 182-line function + 21-line companion, two modules, ~173 insertions. Breadth-phase right size.

## Verification

Re-ran `hidden-proxy.mjs verify ohitmon --base e8a1702e~1 --reach-all`: 0 blocked both trees (row cited 0 blocks); **RNG-tagged reach 12/12 PASS, 0 regressed → REACH-OK** — matches the D-log exactly (this is the one SHA in the batch with real reach, and it holds). Diff grep clean. Rule #2 clean globally.

## Actionable C-wrongs

None.

## Evidence appendix

C loci read in full: `mthrowu.c:321–502` (ohitmon) + `muse.c:2883–2903`
(munstone). Kill arm (`:457–474`): `if (!harmless && !DEADMONSTER(mtmp))`
→ `mhp -= damage` → `"%s is %s!"` destroyed/killed (nonliving /
vampshifter / !canspotmon) → xkilled iff `!mon_moving && (otyp!=BOULDER ||
range>=0 || otrapped)` else mondied — JS matches every conjunct, including
the vampshifter verb the old body lacked. Tail (`:492–502`): setmangry iff
`!DEADMONSTER && !mon_moving` → `drop_throw(otmp, 1, bhitpos)` → range-−1
re-extract — JS matches; `DEADMONSTER ≡ mhp<1` (`monst.h:214`), so the three
`mhp>0` gates are exactly `!DEADMONSTER`, petrified-or-not.

`munstone` ≡ C line-for-line: `resists_ston` → `meating || helpless` (macro
`monst.h:251`: `msleeping || !mcanmove` — JS inline is exact) → strategy
clear → `mcould_eat_tin` loop → `mon_consume_unstone(…, TRUE)` → TRUE.
Callees are same-file locals with prior D-rows (D-1809 use_defensive,
D-1899 slime/stone cures), reused unchanged — callee closure by provenance,
no new clones (`sym.mjs`: one local each, no export anywhere, unchanged).

`passes_rocks` inlined byte-exact (`mondata.h:208`: `passes_walls(ptr) &&
!unsolid(ptr)`). do.c:210 non-caller matches C's own "normally we'd use
ohitmon() but…" comment. New words (`stone_missile` dothrow.js:1098,
`spec_abon` artifact.js:2288, `minstapetrify` trap.js:3380, `munstone`)
all hoisted `export function`; mthrowu→muse edge ALREADY. Minor: the new
`game.bhitpos?.x ?? mtmp.mx` fallback has no C counterpart (C reads the
always-present struct); `game.bhitpos` is eagerly defaulted across apply.js,
so the fallback is nearly dead defensive code — noted, not queued.

Re-run output: `verify ohitmon: baseline e8a1702e~1 — 0 blocked (0 at
baseline, 0 working)` + `reach ohitmon: 12 baseline-PASS sessions (12 run):
12 PASS, 0 regressed → REACH-OK` — RNG-tagged reach, the only SHA in this
batch with real corpus reach, and it holds.

Verdict: **ACCEPT**
