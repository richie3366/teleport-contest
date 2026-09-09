# Review 1212 — 72a51dc6 — moveloop_core spine completion

Metadata: SHA `72a51dc6` (D-2246). Queue row `allmain.c` moveloop_core,
no corpus block. js/ 5 files, +111/−12: `clear_bypass`/`clear_bypasses`
new, six spine wirings/reorders, three one-word exports.

## Intent vs deliverable

Subject promises the genuinely-dead spine pieces (the row's named
callees were already live since D-1801): bypass clearing, wish resume,
seer vicinity-map caller, second encumber check, `clear_splitobjs`,
`umoved` reorder. Diff adds exactly those. Promise kept.

## Inventory

New: `clear_bypass` (worn.js module-local — C staticfn, correct),
`clear_bypasses` (worn.js:1114 sync per `sym.mjs`). Changed:
`moveloop_core` (six edits). One-word exports: `Clairvoyant`
(detect.js:1015 sync), `PM_LONG_WORM` (monsters.js re-export).
Callees (`do_vicinity_map`, `encumber_msg`, `clear_splitobjs`,
`makewish`) all LIVE on pre-existing edges except the resume_wish
call, which deliberately uses a runtime `await import('./zap.js')`
— cycle-avoiding, runtime-only, plain ESM (Rule #2 safe). No STUB in
a live arm; no local clones (nothing deleted/re-pointed, so no
re-point `sym` owed beyond the pasted lookups).

## C ↔ JS fidelity

- `clear_bypasses` vs `worn.c:1067–1116` (50 lines, pasted): fobj /
  invent / migrating_objs / buried / bill / objs_deleted / fmon
  (with the DEADMONSTER skip as `mhp<=0` ≡ `monst.h:214 mhp<1` and the
  long-worm `mcorpsenm → NON_PM` revert) / migrating_mons (no corpse
  check, as C) / mydogs (kept "thoroughness" walk, as C) /
  ball+chain / flag clear — chain-for-chain exact. Array-vs-nobj
  split (`clear_bypass` handles both) matches the JS invent shape.
- Spine vs `allmain.c` (read directly): `:194–196` bypass gate after
  `dobjsfree`, before sanity — exact; `:199–201` resume_wish gate
  with `makewish` clearing at entry (`zap.c:6323` cite carried in the
  zap comment) — exact; `:403` second `encumber_msg()` after
  `hero_seq++` with C's own rationale comment — exact; seer block
  `(amulet||Clairvoyant) && !In_endgame && !BClairvoyant →
  do_vicinity_map(0)` with the unconditional `rn1(31,15)` advance —
  exact; `clear_splitobjs()` first in once-per-input — as cited;
  `u.umoved = FALSE` moved from before-occupation to `:513`
  (after the occupation arm's return, before multi) — the old
  position was a misread and the reorder matches C exactly.

## Hallucinations / overclaim

None. Stale-row diagnosis stated with the live-since evidence
(D-1801); vacuous-0 labeled as vacuous; named-deferral list explicit.

## Density

111 insertions for one C spine family (six small wirings + one 50-line
staticfn pair). In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify moveloop_core: baseline 72a51dc6~1 — 0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green/cohort/full 44/44 per
D-log; /tmp clear_bypasses probe 8/8 reported as probe. Diff grep: no
FORCE/DIAG/seed/coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
