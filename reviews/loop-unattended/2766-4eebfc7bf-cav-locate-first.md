# Review 2766 — 4eebfc7bf — Cav locate_first text + Cav-loca epilogue

- SHA: `4eebfc7bf` (D-3913)
- Scope: `js/questpgr.js` +13/−1 (data), `js/mklev.js` +8/−1 (wiring),
  1 test, ledger `questpgr.c.jsonl` + `sp_lev.c.jsonl`
- Method: cliff commit (2 stacked writers, 1 owner); full Method + re-measure

## Intent vs deliverable

Promise: cliffs-head `teleport.c` level_tele (2 Caveman blocks) is
symptom-only; writers are (a) missing Cav `locate_first` quest text
(worldtour-587132 s93: C More + claw-marks window vs JS bare
materialize) and (b) the `load_special` epilogue missing from
`load_cav_loca` (sweep-587113 s568: C floor vs JS wall at row 9; RNG
20927/20927 matched). Claimed 1 PASS + 1 moved (568→614).

Diff actually adds: (a) `QUEST_LOCATE_FIRST.Cav` body + `QUEST_MSG_META.
locate_first.Cav` (`output:'text'` + synopsis) + doc role-list word;
(b) `link_doors_rooms(); remove_boundary_syms(); map_cleanup();` in
`load_cav_loca` after `wallify_map`, before `wallification`. Nothing else.

## Inventory

- `QUEST_LOCATE_FIRST`/`QUEST_MSG_META` data (js/questpgr.js:458–466,
  :800–803): source `dat/quest.lua` Cav `locate_first` :811–820. New data.
- `load_cav_loca` epilogue (js/mklev.js:13325–13331): C
  sp_lev.c `load_special` :6453–6502. Changed: 3 calls wired.
- Helpers: all three are same-file locals (`sym.mjs`: mklev.js:19580 /
  :19553 / :20889, unexported — matches C `staticfn`, sp_lev.c:20/:32/
  :36). No symbols deleted or re-pointed; no new import edges.

## C ↔ JS fidelity

Quest text: byte-compared myself against pinned
`nethack-c/upstream/dat/quest.lua` :811–820 — body verbatim (double
space after «ground.», blank line, «carrion» spelling), synopsis
`[You %x many large claw marks, smell carrion, and notice bones.]`
(:812) and `output = "text"` (:813) exactly as shipped. Raw `%x` in the
table matches the Bar `%i` precedent (conversion at render,
pre-existing). Caller chain pre-wired (goto_level→onquest→on_locate→
qt_pager, exercised by 5 other roles).

Epilogue: C `load_special` runs `link_doors_rooms()` :6463 →
`remove_boundary_syms()` :6464 → (`ensure_way_out` conditional) →
`map_cleanup()` :6469 → `wallification` :6477–6478 → `flip_level_rnd`
:6480 → … → `fixup_special()` :6489. JS now wires exactly the
unconditional calls in C order (conditional `ensure_way_out`/
`solidify`/`premap` correctly absent: Cav-loca.lua sets only
mazelevel/hardfloor). `remove_boundary_syms` body re-checked against C
:1015–1038: CROSSWALL scan → `SpLev_Map`-gated →ROOM rewrite is
C-exact (JS early-out equivalent), so `Ledger: remove_boundary_syms
ported` stands. No RNG, no prints in either half — pure state/data.

## Hallucinations / overclaim

One real overclaim, in D-log prose (not in `js/`): "every sibling loca
loader (Bar-loca pattern js/mklev.js:14068) carries the epilogue" is
false twice over. I checked all 9 loca tails: only Wiz-loca and (now)
Cav-loca carry `remove_boundary_syms`; Arc/Rog/Sam/Tou/Ran/Mon/Bar
loca do not — and the cited :14068 precedent sits inside
`load_bar_goal` (which starts at :13956), not `load_bar_loca` (which
ends epilogue-free at ~:13948). So the "Bar-loca pattern" label and the
"every sibling" quantifier are both wrong. Not queueable as Must-fix:
it is D-log prose, the shipped `js/` is C-correct regardless, the other
loca loaders are pre-existing state with no probe session blocked on
them (their maps may carry no `B` cells — a falsifier, not a finding).
If a session ever blocks on another loca map with the same
C-floor-vs-JS-wall shape, that cliff row owns it. Corrected here so the
next agent does not cite it.

## Density

Cliff-phase: level_tele was the head at the parent (c22b308a5 block:
2 blocks, RNG lost 56449 — verified in the parent tree). Owner stands
(whole since D-1846/D-2054/D-2136; D-3834 + D-1893 read once per tags),
two stacked writers each tied to its session by measurement (the
quest-text-first stacking probe is recorded, not theorized). One cliff,
code + ledger + test + verify in one handoff. `Ledger: com_pager_core
ported; remove_boundary_syms ported` present. Not a no-op, not
unreached (1 PASS + 1 moved).

## Verification

Re-measured myself (`verify level_tele --base 4eebfc7bf~1 --reach-all`):

- `verify level_tele: 1 PASS, 1 moved past (1 still level_tele at a
  later step), 0 unchanged, 0 worse → PROGRESS` (587132 PASS; 587113
  568→614, +46 steps)
- `reach level_tele: 31/31 PASS, 0 regressed → REACH-OK`
- Zero `worse`/REGRESSED. Matches the D-log Verify bullet exactly.

Grep of the js/ hunks: no FORCE/DIAG/getRngLog/fastforward/seed logic
(the one hit is the session-id prose in the commit message). Rule #2
clean (iteration-wide `imports.mjs --rulecheck`). No seed/step/
coordinate reads. New test pins the C window, red pre-fix per the log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
