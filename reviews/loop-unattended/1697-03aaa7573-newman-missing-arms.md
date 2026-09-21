# Review 1697 — 03aaa7573 — `polyself.c` newman missing arms (D-2738)

Metadata: commit `03aaa7573`, D-2738, `js/polyself.js` only. Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises five arms (Sick/Stoned, PolyControl uhp, livelog, Slimed, selftouch) with two named omits. The diff delivers all five in C order plus the shared dead-arm extraction. Promise matches deliverable.

## Inventory

Changed JS: `newman` (arms added) + new file-local `newman_dead_end()` (shared `:423–432` goto shape); `Your` joins the existing display edge, `LL_MINORAC` the const edge. `oldgend`/`newgend` captured (feed the named `livelog_newform` omit). No deleted symbols, no export clones.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (new arms' callees):

```text
selftouch        js/trap.js:3458   ASYNC — await required
no_longer_petrify_resistant NOT FOUND in js/** (no export, no local function/const).
make_slimed      js/potion.js:899   ASYNC — await required
Polymorph_control NOT EXPORTED — but 2 LOCAL CLONE(S) in 2 file(s):
               js/polyself.js:410  js/were.js:68
```

Resolution: `no_longer_petrify_resistant` DOES exist — `js/polyself.js:287` (`const … = 'No longer petrify-resistant, you'`, exact C `:33` string; sym's function/const index missed it, grep proves it) and is already used in the identical `selftouch` shape at `:1127`/`:1744` — the new `:1072` call matches file idiom, no ReferenceError. `make_sick`/`make_stoned`/`make_slimed`/`selftouch` all live async and awaited. `Polymorph_control` uses the pre-existing same-file clone (`:410`, C-cited `H||E` house shape vs `youprop.h:368`) — correctly no clone #3. No STUB in any arm.

## C ↔ JS fidelity

C locus read: `newman — polyself.c:335-466` (csym range), `:405–466` read verbatim. Branch-by-branch:

- Sick/Stoned clears with exact positional args ✓; PolyControl arm verbatim ("even when Stunned/Unaware" is C's own comment) with the old always-wrong `u.uhp=1` clamp replaced ✓ — the commit's "always-wrong hunk" claim is accurate.
- Shared `newman_dead_end()`: killer format/name, `done(DIED)`, lifesaved `newuhs(FALSE)` + `encumber_msg` ✓ verbatim; both gates call-then-return, matching C's `goto dead` + `return /* lifesaved */` ✓ (the `!game.killer` guard is benign JS null-safety).
- `oldgend` at `:360` position (pre-`change_sex`) and `newgend` post-polyman ✓ positions feed the named omit.
- Level-change livelog: LL_MINORAC + exact format/args ✓; no-change `livelog_newform` arm named ✓.
- Slimed `Your` + `make_slimed(10, null)` ✓; botl/see/encumber tail untouched ✓; gloveless `selftouch` with the file const ✓.
- Named: `retouch_equipment(2)` `:464`, `livelog_newform` `:307` — both in the map line.
- RNG: no draw added/removed/reordered.

## Hallucinations / overclaim

One trackability overclaim: message and map both say "own row" for the two omits, but no live Open row exists for either — `retouch_equipment` is phase-2 Parked (not poppable) and `livelog_newform` has no queue row at all. The map line is the actual durable record, so nothing is lost, but "own row" is inaccurate. Not a C-wrong; noted, no queue action (row-eligibility requires tool/brief evidence, which a port iter can supply if it pops that area).

## Density

Five missing arms + one extraction, one module, zero new edges, full 44/44. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 03aaa7573~1 --reach-all`) — both lines, matching the D-log:

```text
verify newman: baseline 03aaa7573~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify newman: no corpus session is blocked on it at 03aaa7573~1 — a vacuous verify is NOT a corpus PASS. [...]
reach newman: 3 baseline-PASS session(s) reach it (3 run, 0.5s): 3 PASS, 0 regressed → REACH-OK
```

Blocked-line vacuous as stated; reach 3/3 PASS → REACH-OK. Green/strict/cohort/full-44 per D-log. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
