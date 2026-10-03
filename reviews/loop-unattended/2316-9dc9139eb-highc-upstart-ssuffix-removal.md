# Review 2316 — 9dc9139eb — highc/upstart/s_suffix 8-clone removal

Metadata: SHA `9dc9139eb`, D-3360, C `hacklib.c:75–79` /
`:113–119` / `:344–359`. Stat: 7 js files, 8 clones
deleted, 22 sites rewired, 1 NEW edge, 2 tests maintained
(4/4 + 15/15).

Intent vs deliverable: subject promises "highc/upstart/
s_suffix 8-clone removal (botl/potion/mthrowu/minion/
explode/shk/questpgr → live exports)". Diff actually: 6
edge extensions + 1 NEW import, 8 deletions, 4 potion
`_pot`→live renames. Matches promise. Commit message
prints all three Verify/Named bullets — complete.

Inventory: highc 1 clone→import (botl ASCII-compare);
upstart 1 rename-clone→import (`upstart_pot`,
`if (!str)`+toUpperCase); s_suffix 6 clone→import, all six
bodies arm-identical to live (it/you/trailing-s/else).
Live targets are **C callees**, untouched. The mthrowu
import keeps the `s_suffix_ucatch` alias alongside the new
`s_suffix` — both bound, alias sites (:743/:931) untouched,
local sites (:401/:1047) now live. No stub.

C ↔ JS fidelity (highc): C (`hacklib.c:75–79`) is
`('a'<=c&&c<='z') ? (c&~040) : c`, no RNG. Live
(js/hacklib.js:455) is that predicate on charCodes with
`& ~0x20` plus null/`''`/non-string guards. All 3 botl
sites pass single chars (`charAt(0)`/`titl[k]` —
verified at HEAD), where live ≡ clone bit-for-bit.
Confirm.

C ↔ JS fidelity (upstart): live ASCII `highc` replaces
locale `toUpperCase`; the 1 site (potion.c:1713
`upstart(s_suffix(mnam))`) passes a non-empty string —
identical. Confirm (same analysis as 2312/2314).

C ↔ JS fidelity (s_suffix): all six deleted bodies are
character-identical to live (js/do_name.js:418), which
ports C `:344–359` arm-for-arm (strcmpi it/you,
lowercase-`s`-only `endsWith`, else `'s`). Pure rewire;
19 sites across 6 files need no call-site edits (same
names). Confirm.

NEW edge (questpgr→do_name): D-log claims `--can` SAFE
(hoisted fn). Verified stronger: no do_name→questpgr
import exists, so the edge adds no cycle at all; and
`export function s_suffix` is hoisted — no TDZ read
under any cycle. The 6 other edges are ALREADY (all
extend existing braces).

Hallucinations / overclaim: none. Named honestly lists
the remaining dokeylist highc clone and the 13
`s_suffix_*` split homes (census-corrected, unqueued).

Density: 3-function same-C-file (hacklib.c) cluster, each
whole, each with D-log C-locus/JS/Callers/Verify/Named
bullets + `Ledger:` (highc/upstart ported, s_suffix split
with all 13 homes) + combined `verify.mjs` (syntax 7,
rule2, green 2/2, strict 2/2, cohort 7/7; full correctly
skipped). Per function: all ACCEPT.

Verification: re-measured in one call — all three "0
blocked" + vacuous-note + "24 PASS, 0 regressed →
REACH-OK"; matches the D-log (rows cited 0 blocks).
`--can`: 4/4 sampled ALREADY incl. the NEW edge's
landing. Diff grep: 0 banned hits. `sym.mjs` (required):

```text
highc            js/hacklib.js:455   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/dokeylist.js:51
s_suffix         js/do_name.js:418   sync
s_suffix_pot     NOT FOUND in js/** (no export, no local function/const).
upstart_pot      NOT FOUND in js/** (no export, no local function/const).
```

The 1 remaining highc clone is the disclosed refill
expectation — correctly left.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
