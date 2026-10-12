# Review 2724 — ac5580aa5 — bones timers (D-3864)

Metadata: SHA `ac5580aa5`, D-3864, cliffs-head
`dokick.c` ghitm writer (bones load dropped
RANGE_LEVEL timers — ghostly pet corpse never
rotted). JS: `js/bones.js` (install call +
import) + `js/mkobj.js` (doc touch). Test:
`scripts/bones-corpse-rot.test.mjs` (new).

## Intent vs deliverable

Promise: C getlev `:1111` elapsed + `:1144`
restore_timers(RANGE_LEVEL, elapsed) installs the
blob's level timers, but getlev_bones never
installed them — the ghostly corpse-rot timer
missing, kick path diverged; install via live
restore_timers(info.timers, true, moves−omoves);
marathon FULL PASS. Diff actually does that.
Match.

## Inventory

- getlev_bones (bones.js:712): one install call
  after rest_track, with C cites. C: restore.c
  `:1111` `elapsed = moves−omoves` + `:1144`
  `restore_timers(nhfp, RANGE_LEVEL, elapsed)`
  (both read) — args match (ghostly=true,
  adjust=moves−omoves).
- restore_timers (mkobj.js:1263, live export,
  read): ghostly → `timeout += adjust`, then
  insert_timer per element. C: timeout.c
  `:2719–2724` (read) — same loop, same arms.
- Import extends the existing bones.js←mkobj.js
  line (9 names → 10) — no new edge. Lights half
  (`:1145` restore_light_sources) stays a named
  omission (separate C file) — correctly not
  bundled.

## C ↔ JS fidelity

Call-for-call confirm with one documented
architectural adaptation. C installs timers
before restmonchn (`:1144` vs `:1146`) because
relink_timers (`:2740+`, with the `:2760`
ghostly id-map lookup — read) runs later over
stored ids; JS installs after obj install
because deserLevel already relinked entries to
live pointers against pre-remap o_ids, so the
`:2760` lookup has no work left (comment states
this; coherent — installed pointers don't use
o_ids, and only o_ids were renumbered). The
adaptation is forced by the JSON shape and the
probe PASS is its empirical check. No RNG in
the install path (timeout arithmetic only).

## Hallucinations / overclaim

None. The `:2760`-needs-none claim is an
architectural mapping, stated with its reason
in the comment — not a silent skip. No
DIAG/FORCE/seed in the js hunks.

## Density

Cliff-phase: ghitm head; writer is the bones
timer install, same-load companion wiring (no
new C file's work — mkobj.js touch is a doc
line). Ledger: bones.c row + D-3864. Reached:
probe FULL PASS.

## Verification

Rule #2 clean (iteration-wide). Re-measure
(mine): `verify ghitm --base ac5580aa5~1
--reach-all` → `1 session(s) blocked on it (1
at baseline, 0 in the working scoreboard)`,
Archeologist-578126 PASS, `1 PASS, 0 moved
past, 0 unchanged, 0 worse → PROGRESS`; smoke
24/24 REACH-OK. Zero regressed. The FULL-PASS
claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
