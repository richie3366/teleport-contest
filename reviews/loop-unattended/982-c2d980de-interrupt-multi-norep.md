# Review 982 — c2d980de — interrupt_multi Norep message (D-2012)

Metadata: SHA `c2d980de`, D-2012, Open-row port (queue row
`allmain.c` regen_hp, 6 sessions). js/ touches 1 file
(`js/allmain.js`, +15/−13: `interrupt_multi`/`regen_hp`/`regen_pw`
async + two import names). No stamp owed (row cites no review).

## Intent vs deliverable

Subject promises: `interrupt_multi` dropped its Norep message, so
full-health/full-energy never printed. Diff actually adds: `async
interrupt_multi(msg)` with live `nomul(0)` + verbose-gated
`await Norep(msg)`, `regen_hp`/`regen_pw` made async with awaited
calls, both moveloop EOT sites awaited. Promise == diff.

## Inventory

- Changed JS functions: `interrupt_multi`, `regen_hp`, `regen_pw`
  (all `js/allmain.js`, all file-local).
- New helpers: none. No deleted symbols — no `sym.mjs` delete audit
  required. No STUB, no clone, no no-op.
- Named omit kept: `rehumanize` on `mh < 1` (pre-existing defer in
  the `regen_hp` map doc, untouched).

## C ↔ JS fidelity

C locus: `allmain.c:975–983` (`if (gm.multi > 0 && !travel &&
!run) { nomul(0); if (flags.verbose && msg) Norep("%s", msg); }`),
call sites `:617` (regen_pw energy) and `:678` (regen_hp full
health). Branch-by-branch confirm: guard `multi>0 && !travel &&
!run` verbatim ✓; `nomul(0)` replaces the old bare
`game.multi = 0`, restoring the C side effects (`botl`,
`uinvulnerable`/`usleep` clear, `end_running`, canned-queue
clear) — JS `nomul` (`hack.js:992`, sync) matches C
`hack.c:4160–4173` arm-for-arm ✓; `msg && verbose !== false`
is the repo's verbose-default-on idiom for C's `flags.verbose &&
msg` (order swapped, same conjunction) ✓; `Norep`
(`display.js:7272`, ASYNC) is awaited ✓. C `interrupt_multi` is
`staticfn`, so the JS local (non-exported, `sym.mjs` confirms no
second copy) is correct placement, not clone drift. `regen_hp`/
`regen_pw` are local-only (no other js/ callers) and moveloop is
already async, so the await chain is closed. No RNG in this delta.

## Hallucinations / overclaim

None. The unchanged session (Arch-92084, still regen_hp@64) is
disclosed as a different mechanism (nurse-retaliation combat
upstream of the HP gate) with its own re-queue note, not swept
under PROGRESS.

## Density

~28 lines for a 9-line C function plus its two call sites'
async plumbing. Right-sized.

## Verification

Re-measured myself: `hidden-proxy verify regen_hp --base
c2d980de~1` → `2 PASS, 3 moved past, 1 unchanged, 0 worse →
PROGRESS` (Knight-92232 / Samurai-92057 PASS; Ranger-92234 →
step 58; Barb-92008 → toss_up@45; Ranger-92090 →
Blindf_off@211; Arch-92084 still regen_hp@64) — identical to the
D-log. (One labeling nuance: my re-run prints the Ranger-92234
move as `js-throw at step 58`; `show` at HEAD confirms step 58
is the disclosed screen diff `You suffocate.--More--` vs `You
suffocate.`, error null, RNG 8585/8585 — same residual, not a
new throw.) Plus cited green 2/2 + strict ×2, cohort 7/7, full
44/44 (shared file changed). js/ hunk grep: no
`FORCE`/`DIAG`/`getRngLog`/seed/coordinate/`fastforward` (the
one grep hit is the commit message quoting its own Rule #2
line). Rule #2 clean (re-ran this iteration).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
