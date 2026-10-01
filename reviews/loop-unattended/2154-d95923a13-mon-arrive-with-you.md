# Review 2154 — d95923a13 — mon_arrive With_you completion

SHA `d95923a13`, D-3194; 2026-10-01; +16/−6 JS in `js/dog.js`.
Coverage row (mon_arrive THIN); no prior review closure. Same iteration
retires getdir STALE (ledger-only, cmd.c — verified below).

## Metadata

- Subject: "`dog.c` mon_arrive With_you completion (live mnexto + awaited
  placement + link nmon)"
- Adds: `mnexto` to the existing mon.js import; `nmon` link line; awaited
  placements; deletes the inline enexto/rloc_to-onto-hero fallback.

## Intent vs deliverable

Promise: replace the inlined mnexto approximation (which wrongly fell back
to rloc_to onto the hero spot, dropped RLOC_NOMSG/telecontrol, and never
awaited) with the live export, and set the link `nmon`. Diff delivers all
three, nothing else. Promise kept.

## Inventory

- `mon_arrive_with_you` (js/dog.js:828, async): else-branch re-pointed from
  inline approximation to LIVE `mnexto` (js/mon.js:2054, async export);
  rn2-gate branch gains `await` on already-imported async `rloc_to`.
- `mon_arrive_link` (js/dog.js:794): gains the `nmon` prepend line.
- Kept CLONE `mnearto_no_yank` (dog.js:892, pre-existing, not in diff):
  re-verified below against the D-log's explicit "kept, not re-pointed" claim.
- Deleted/re-pointed symbols (sym output pasted per Method):

```text
mnexto           js/mon.js:2054   ASYNC — await required
mnearto          js/mon.js:2172   ASYNC — await required
rloc_to          js/teleport.js:765   ASYNC — await required
```

Single exports, no clone #2. The dog→mon edge pre-exists (name added to the
live import); no new cycle risk, no `--can` needed; `RLOC_NOMSG` was already
imported (dog.js:21).

## C ↔ JS fidelity

**With_you — confirmed branch-exact.** C `dog.c:419–623` (csym range):
link `:430–432` (`mstate |= STILL_ARRIVING; nmon = fmon; fmon = mtmp`),
With_you `:466–479` (`!MON_AT && !rn2(tame?10:peaceful?5:2)` → rloc_to onto
hero, else `mnexto(mtmp, RLOC_NOMSG)`, clear STILL_ARRIVING, return). JS
mirrors it: `nmon = game.fmon[0] || null` before unshift (fmon[0] is C's
fmon head), the exact rn2 ternary, awaited rloc_to / live mnexto with
RLOC_NOMSG, flag cleared after.

**mnexto callee — LIVE and C-exact** (read full JS body vs C
`mon.c:3953–3983`): usteed sync → enexto/isok fail →
`deal_with_overcrowding` → mon_telecontrol with savemm → rloc_to_flag.
The old inline code's `else rloc_to(mtmp, u.ux, u.uy)` contradicted C's
fail arm (overcrowding, never onto-hero); fixed by the re-point. The `!mtmp`
guard is a harmless JS null addition. RNG: no draw added/removed.

**mnearto_no_yank kept clone — verified matched.** Against live `mnearto`
FALSE path (mon.js:2172–2224): early-out, goodpos/enexto/isok fallback,
rloc_to_flag, no recurse — identical; `true/false` vs `1/0` is equivalent
under the boolean caller at dog.js:1165; entry `|0` narrowing matches C
coordxy. C mon_arrive always passes FALSE (dog.c:611), so the omitted
move_other arms are correctly absent. CLONE verdict: keep.

Diff grep: no FORCE, DIAG, getRngLog, seed names, fastforward, hardcoded
coordinates. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "C-exact fail arm, telecontrol, flags" corroborated by my own body
read. The D-2459 re-attributions name true owners (losedogs / mnearto /
resurrect bodies), not mon_arrive C — legitimate attribution, not omission.

## Density

One whole function completed (last arm + link line; rest shipped in
D-2459), one C file, no Must-fix bundled. Named omissions: none in this
body. Callers: pre-existing wiring kept (losedogs ×3, resurrect −1), no
caller C never uses. ~16 insertions is below the §2b target, but the
exception applies: dog.c holds nothing more Open except the 4-line MISSING
setter `set_mon_lastmove` (measured; all other dog.c rows measure ok), and
the iteration also retired getdir STALE. getdir stale spot-verified: C
`cmd.c:3956–4119` vs split bodies js/lock.js:653 (`getdir` dirsym loop) +
:586 (`getdir_read_dirsym` cmdq arms) + helpers; structure matches the
ledger note. Function verdict: ACCEPT. SHA verdict: ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify mon_arrive: 0 blocked at d95923a13~1 (vacuous — coverage row, 0 cited)
reach mon_arrive: 142 baseline-PASS sessions reach it (142 run, 110.7s): 142 PASS, 0 regressed → REACH-OK
```

Matches the D-log (`--reach-all` 142/142, green 2/2, strict ×2, cohort
7/7). No REGRESSED session; no vacuous-PASS overclaim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
