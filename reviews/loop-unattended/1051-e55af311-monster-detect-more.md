# Review 1051 — e55af311 — monster_detect spurious --More-- deletion (D-2081)

## Metadata

- SHA: `e55af311` — `detect.c monster_detect flushed a spurious --More-- between the sense pline and getpos's verbose tip (queue owner monster_detect) (D-2081).`
- JS diff: `js/detect.js` 8 lines (one call + import name deleted, comment replaced).
- Docs: D-2081 D-log/D-index/CURRENT/NOTES/queue/data.md map.
- Next index: 1051.

## Intent vs deliverable

Subject promises removal of a spurious `--More--` between the sense
pline and getpos's verbose tip. Diff actually does exactly that:
deletes `await flush_topl_more()` and its destructure, replaces the
stale comment with a C cite. Promise == diff; no scope creep.

## Inventory

- Changed: `monster_detect` (detect.js) — deletion only, no new
  helpers.
- Deleted symbol per method step 3: `sym.mjs flush_topl_more` →
  still a live async export at `js/display.js:7096`; other
  `detect.js` users remain (:1378/1383, :1963, :2178, :2297/2340)
  plus the module-level static import (:59) — only this function's
  use was removed, no dangling import. Output pasted in-session.
- Diff grep: no `FORCE`/`DIAG`/seed reads, no RNG/mutation change.

## C ↔ JS fidelity

`csym.mjs monster_detect` range: `detect.c:797–862`. C order
(read directly) is `display_self()` → `You("sense the presence of
monsters.")` → optional woken pline → blessed?`display_nhwindow` :
(`EDetect_monsters |= I_SPECIAL; browse_map(...)`). There is no
flush/more between the sense pline and `browse_map` in C — the
deletion is verbatim-faithful.

The «(For instructions type a '?')» tail is C `getpos.c:843–846`:

```c
if (flags.verbose) {
    pline("(For instructions type a '%s')",
          visctrl(gc.Cmd.spkeys[NHKF_GETPOS_HELP]));
    msg_given = TRUE;
}
```

which lands on the same topline via NEED_MORE+room join, as the new
comment states (two-space join at display.js:7387–96). Named omits
(cursed-otmp wake, blessed persistent map, unconstrain
underwater/buried/swallow) untouched and still named.

## Hallucinations / overclaim

None — subject claims a display-only correction and ships exactly
that; «retires nothing» stated honestly.

## Density

8-line deletion in one function — below the §2b floor, but a
corpus-driven queue row with a recorded screen expectation, the
standard accepted exception.

## Verification

D-log Verify bullet: `verify --fn monster_detect` → `0 PASS,
3 moved past, 0 unchanged, 0 worse → PROGRESS` (all to strictly
later steps/owners). Re-measured myself:
`hidden-proxy.mjs verify monster_detect --base e55af311~1` →
`0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`
(91108 →js-throw@54, 92020 →erode_obj@86 — both destinations match
the D-log exactly, both strictly later). The third session
(kit-Priest-92122 → js-throw@131) is absent from the pinned
84dc0e34 baseline set — stale-baseline delta, the same pattern
audit 1049 documented and accepted. Corroboration, not a gap:
`verify monster_detect` at HEAD → 0 sessions blocked, so 92122
also moved off this owner; nothing regressed onto it. Not a
vacuous check: the claim is forward movement, and every
re-runnable session confirms it with 0 worse. Rule #2 clean
(prior step).

## Actionable C-wrongs

None. (Note for the next port iter, not this review: two of the
moved-to owners are `js-throw` at later steps — those throws will
surface as their own Must-fix rows via the normal queue, not as
debt of this deletion, which cannot introduce a throw.)

## Verdict

Verdict: **ACCEPT**
