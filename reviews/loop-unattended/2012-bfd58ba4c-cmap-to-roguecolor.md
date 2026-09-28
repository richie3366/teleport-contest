# Review 2012 — bfd58ba4c — cmap_to_roguecolor whole port

Metadata: SHA `bfd58ba4c`, D-3052, js/display.js only (+37/−1).

## Intent vs deliverable

Subject promises "`cmap_to_roguecolor` whole port + two stale
dispositions". Diff actually adds the export with per-arm cites plus the
two `S_*` const imports, and the commit ledger-marks `toss_wsegs` /
`wiz_timeout_queue` stale with notes. Matches promise.

## Inventory

- `cmap_to_roguecolor` (new export js/display.js:3146, sync) —
  C display.c:2698–2719 (staticfn).
- Stale: `toss_wsegs` → ported, `wiz_timeout_queue` → split (ledger
  notes cite JS loci, no `js/` change).

## C ↔ JS fidelity

Line-by-line vs C (csym range cited): `color = NO_COLOR` init ✓;
nocolor early-return :2703–2704 ✓ (shape matches sibling
`rogue_nocolor_active`, `| 0` guard harmless); wall range
`S_vwall..S_hcdoor → CLR_BROWN` ✓; trap range
`S_arrow_trap..S_polymorph_trap → CLR_MAGENTA` ✓; corr pair →
CLR_GRAY ✓; `S_room..S_water except S_darkroom → CLR_GREEN` ✓; else
NO_COLOR + single return ✓. Branch order exact, 0 callees, no RNG.

Constants verified against pinned headers (not the commit message):
defsym.h gives S_vwall=1, S_hcdoor=16, S_room=19, S_darkroom=20,
S_corr=22, S_litcorr=23, S_water=48, S_arrow_trap=49,
S_polymorph_trap=70 — all equal js/const.js (1/16/19/20/22/23/48/49/70)
✓; color.h gives BROWN=3, MAGENTA=5, GRAY=7, GREEN=2, NO_COLOR=8,
matching the reported spot-check ✓. `cmap |= 0` mirrors C's int param.

Callers: all 5 C sites (:2874, :2916, :2922, :2935, :2962) sit inside
`reset_glyphmap`, which the ledger marks by-design (fortress guard,
CURRENT.md) — named in this commit's D-log, not unwired live callers.
Correct disposition per the playbook (never touch the guard function
here). No JS caller yet; pure leaf export awaiting the future port.

Stale pair: ledger notes verified (`toss_wsegs` ported with JS locus +
arm/caller evidence; `wiz_timeout_queue` split across four named exports
per D-1527). Proper ≤3-call stale handling, same iteration. No `js/`.

## Hallucinations / overclaim

None. "No cycle check needed" for the const.js import is accurate
(const.js is a leaf).

## Density

One 15-line leaf + two stale dispositions. Small but the head row was
MISSING-leaf and the stales are legitimate same-iteration pops. OK.

## Verification

D-log cites verify.mjs → PASS + vacuous hidden note + REACH-OK +
green/strict/cohort + full 44/44 (shared file changed). Re-measured:
`hidden-proxy.mjs verify cmap_to_roguecolor --base bfd58ba4c~1
--reach-all` → 0 blocked at baseline and now (vacuous, as stated);
smoke 24/24 PASS → REACH-OK, no regressions. Diff grep: no
FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
