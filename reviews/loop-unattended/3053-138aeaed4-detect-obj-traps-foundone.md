# Review 3053 — 138aeaed4 — detect_obj_traps flashes and foundones trapped boxes for findone

- SHA: `138aeaed4` (cliffs head `findit`: scen-extcmd-Archeologist-52650042
  step 387, `#wizdetect`)
- D-entry: D-4213; Ledger: detect_obj_traps ported
- `js/` diff: detect.js +25 −16

## Intent vs deliverable

Promise: when findone calls detect_obj_traps (ft non-null), C flashes
the TRAPPED_CHEST glyph and calls foundone for each trapped box on the
square (`:937–947`). foundone's in-sight newsym then shows the box «(»,
not the trap. JS had dropped both calls as a named omit, so the square
kept the sensed trap «^». The function now follows C order and is async,
with all 13 call sites awaited.

Diff: `trapglyph = ft ? trap_to_glyph(dummytrap) : null` before the
loop; `await flash_glyph_at(x, y, trapglyph, FOUND_FLASH_COUNT)` before
sense_trap; `foundone(x, y, trapglyph)` before `ft.num_traps++`; the
function made async; `await` added at findone ×4, display_trap_map ×4,
trap_detect ×4 and the contents recursion. The promise matches the diff.

## Inventory

- detect_obj_traps — detect.js:2353 (C detect.c `:904–953`). Changed.
- Callees: flash_glyph_at (display.js:6141, async, LIVE), foundone
  (detect.js:564, the single JS port of static C foundone `:1607–1634`,
  LIVE), trap_to_glyph (display.js:2489, sync, LIVE), sense_trap
  (unchanged), get_obj_location / observe_object (unchanged).
- No symbol deleted or re-pointed. sym.mjs on the touched names:

```text
foundone         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/detect.js:564
flash_glyph_at   js/display.js:6141   ASYNC — await required
detect_obj_traps NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/detect.js:2353
trap_to_glyph    js/display.js:2489   sync
```

The "clone" lines are the only definitions, ports of C `staticfn`s in
the same file. They are not duplicates.

## C ↔ JS fidelity

C `:922–947`:

```c
dummytrap.ttyp = TRAPPED_CHEST;
trapglyph = ft ? trap_to_glyph(&dummytrap) : GLYPH_NOTHING;
...
if (Is_box(otmp) && otmp->otrapped) {
    otmp->tknown = 1; observe_object(otmp);
    result |= u_at(x, y) ? OTRAP_HERE : OTRAP_THERE;
    if (ft) flash_glyph_at(x, y, trapglyph, FOUND_FLASH_COUNT);
    if (show_them) { dummytrap.tx = x, dummytrap.ty = y; sense_trap(...); }
    if (ft) { foundone(x, y, trapglyph); ft->num_traps++; }
}
if (Has_contents(otmp)) result |= detect_obj_traps(otmp->cobj, ...);
```

Branch-by-branch:

- trapglyph: computed once, after `dummytrap.ttyp = TRAPPED_CHEST`, only
  when ft is set. JS uses null where C uses GLYPH_NOTHING; neither value
  is read when ft is null. Same.
- Location filter `:926–932`: unchanged. get_obj_location with
  BURIED_TOO|CONTAINED_TOO, isok, and the ft_cc square match. findone
  sets `found.ft_cc` at detect.js:598, as C does at `:1648`.
- Arm order: tknown, observe_object, result bit, flash, sense_trap,
  foundone, num_traps. Same order as C. foundone runs after sense_trap,
  so its newsym overwrites the sensed «^» with what the square really
  shows («(»). That is the measured fix.
- FOUND_FLASH_COUNT is 6 in both (C detect.c:19, JS detect.js:552), so
  foundone's `== 0` tmp_at arm stays dead in both.
- Recursion into cobj: same, now awaited.
- RNG: neither flash_glyph_at nor foundone draws. No RNG change.

Async conversion: the function is file-local (sym.mjs: not exported) and
`grep -n "detect_obj_traps(" js/detect.js | grep -v await` returns only
the definition and a comment, so no caller is left unawaited. Every
caller (findone, display_trap_map, trap_detect) was already async, so
no sync→async ripple.

## Hallucinations / overclaim

None in the code. The ledger row keeps the old note «audit 2026-10-03:
ft-arm flash_glyph_at/foundone visual-only calls omitted; counts live»
after this commit; the commit only added `"d":["D-4213"]`. That note is
now false: both calls are live. It is also a record of the original
miss: a 2026-10-03 audit marked the function `ported` while it left out
two visible C calls and called them "visual-only". That is the "visual
side effect dropped, then a screen diff" pattern the scorer punishes.

## Density

One cliffs-head owner (`findit`, reached via findone →
detect_obj_traps), one whole C function restored, all callers wired.
Right-sized.

## Verification

```text
verify findit,detect_obj_traps --base 138aeaed4~1 --no-reach
  verify findit: 1 session(s) blocked (1 at baseline)
    scen-extcmd-Archeologist-52650042: PASS
  verify findit: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  verify detect_obj_traps: 0 blocked (vacuous: the board names findit)
imports.mjs --rulecheck: Rule #2 clean
```

The diff has no FORCE/DIAG/getRngLog, seed or coordinate reads. The
D-log lists green 2/2, strict ×2, cohort 7/7, full 44/44 and sweep
moveloop_core 676/676 REACH-OK. My re-measure matches the claimed
movement.

## Actionable C-wrongs

None in `js/`.

Debt (ledger text, not a Must-fix): detect.c.jsonl detect_obj_traps
`note` still says the ft-arm calls are omitted; it should say they are
live since D-4213.

Verdict: **ACCEPT-WITH-DEBT**
