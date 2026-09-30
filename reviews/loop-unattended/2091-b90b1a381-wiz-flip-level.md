# Review 2091 — b90b1a381 — wiz_flip_level + flip_level remainder

- SHA: `b90b1a381` (D-3131)
- Subject: "`wizcmds.c` wiz_flip_level whole port + `sp_lev.c` flip_level remainder (coverage head)"
- js/ insertions: +179/−29 across 4 files (getline/mklev/mkobj/wizcmds)
- Prior index: 2090; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port `wiz_flip_level` whole + extcmd row, complete
`flip_level` (dbridge, migrating priest/shk, regions,
timers, exclusion reorder, extras hero), export the flip
pair + timeout_func_index; 2 stale sets.

Diff actually adds: the wizcmds export, the extcmd row, the
dbridge staticfn-locals, the migrating/regions/timers/
exclusion/extras arms, and the two exports. Matches the
promise. New helpers are C callees (dbridge pair), not
clones.

## Inventory (per function)

- `wiz_flip_level` (js/wizcmds.js:441, NEW async export)
  — C wizcmds.c:411–442 (csym range). Whole.
- `flip_level` (js/mklev.js:19114, now exported) — C
  sp_lev.c:531–922. Remainder shipped; partial (ball/chain
  async omit stands).
- `flip_level_rnd` (:19041, now exported) — C :~970–982.
  Whole (RNG call-for-call, below).
- `flip_dbridge_horizontal/vertical` (:19019/:19031,
  staticfn-locals) — C :428–439/:442–453. Whole.
- `timeout_func_index` (js/mkobj.js:1471, now exported) —
  pre-existing body, unchanged.
- extcmd `wizfliplevel` row (js/getline.js) — C cmd.c:1959–
  1960. The wiring (0 C refs — table-driven).

Callees all LIVE (yn_function/pline/docrt, flip pair via
dynamic import, EGD/on_level, timeout_func_index).
Nothing deleted or re-pointed.

```text
wiz_flip_level   js/wizcmds.js:441   ASYNC
flip_level       js/mklev.js:19114   sync
flip_level_rnd   js/mklev.js:19041   sync
flip_dbridge_horizontal  js/mklev.js:19019  local (C staticfn, C-home — not drift)
timeout_func_index js/mkobj.js:1471 sync
```

## C ↔ JS fidelity

`wiz_flip_level`: prompt/choices texts, `if (wizard)` with
`wizard`≡flags.debug (flag.h:30 read), `|| wizard`
following the file's wiz_level_tele idiom (read),
yn_function 4-arg ≡ C, strchr→includes, `-48` ≡ `-= '0'`,
`!n`→flip_level_rnd(3,true) else flip_level(n,true) ≡
:431–434, docrt, else Never_mind, ECMD_OK. Dynamic mklev
import justified: mklev.js:178 statically imports wizcmds
(makemap_prepost) — a static back-edge would cycle; the
extcmd row copies the wizidentify shape exactly. Extcmd row
≡ cmd.c:1959–1960 (IFBURIED|WIZMODECMD, no AUTOCOMPLETE).
No RNG in this function (rnd lives in flip_level_rnd).

`flip_level` arms, each against C: migrating if/else-if
≡ :674–686 (mextra guards are benign null-safety on C
unions); regions box+rects min/max ≡ :735–763 in C
position (after lregions, before rooms — verified);
dbridge mirrors on both swap cells pre-swap ≡ :824–825 /
:845–846 with C-identical consts (DB_DIR=3, N/S/E/W
0/1/2/3 both sides); timers MELT_ICE gate + a_long packing
(ty low, tx high) ≡ :862–874; exclusions moved post-swap
≡ :876–896; extras hero gate + ux0/uy0 unconditional +
travelcc/digging.pos Flip_coord ≡ :898–912 (Flip_coord
null-safe: `!cc` guard read; undefined ≡ C (0,0) skip).
`flip_level_rnd`: two rn2(2) in C order. Ball/chain
unplace (:566–585, read) + placebc (:909–910) correctly
named (async structural); SpLev_Map + Lua caller named.
The spread-swap field-leak observation is pre-existing and
the benign claim holds for the mask (read only under
IS_DRAWBRIDGE; bridge cells get C-exact swapped masks).

Stale declares hold: find_branch whole (pd arm +
"The "-strip + ledger packing, panic→throw named);
save_track (peek + initrack, both callers wired).

Ledger data bug found and fixed in this review commit:
the flip_level row carried wiz_flip_level's omit text
(stamp misattribution); reset via `ledger.mjs set` to the
D-log's ball/chain text (d/js preserved). Not a js/
C-wrong; no queue row.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates.

## Hallucinations / overclaim

None. "0 → rnd(3, true)" in the message is sloppy
shorthand for flip_level_rnd(3, true) but the code and
D-log are exact. Probe re-ran 8/8 here (below).

## Density

Head + Open callee + extcmd wiring + 1 export: one
closure, 2 ledger functions, far under caps. Per-function:
wiz_flip_level ACCEPT; flip_level ACCEPT (partial, omits
named).

## Verification

Re-measured (`--base b90b1a381~1 --reach-all`, both one
call): 0 blocked at baseline and working tree each,
vacuous notes, smoke 24/24 → REACH-OK ×2. Matches the
D-log; no REGRESSED session. `/tmp/flip-probe.mjs`
re-ran 8/8 PASS on this tree. Gates per D-log: syntax 4
files, rule2, green 2/2, strict ×2, cohort 7/7, full
44/44 (shared files — mklev/mkobj/getline, correct).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
