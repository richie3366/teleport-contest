# Review 1249 — 7942532c — potion.c make_sick #wizintrinsic KILLED_BY

- SHA: `7942532c` — "`potion.c` make_sick: '#wizintrinsic' SICK killer
  takes KILLED_BY (D-2283)"
- D-log: D-2283. Queue row: `end.c` really_done death-disclosure tail
  (TOP30-adjacent envelope). The only commit in this batch with corpus
  movement.
- Character: 5-line C-arm fix + doc retire + committed scoreboard update.

## Intent vs deliverable

Subject promises: the C killer-prefix arm verbatim in C position, moving
scen-death-Archeologist-92015 from 57/58 to full PASS. Diff actually does
that: `kpfx` ternary + `delayed_killer` call in `js/potion.js`, one omit
line retired in `potion.js` docs and one in `wizcmds.js` docs, plus the
16-line scoreboard row flip (passed false→true, scrM 57→58, owner
cleared). Promise matches diff exactly.

## Inventory

- Changed JS: `make_sick` (`js/potion.js`, `:947` per `sym.mjs`, async) —
  one call line becomes a 5-line commented ternary + call. Guard
  (`if (u.Sick)` + `if (xtime || !old || !kptr)`) and `cause || ''`
  convention both predate the commit; untouched.
- `js/wizcmds.js`: doc comment only (drops the stale omit line). Zero
  code change — the `#wizintrinsic` grant path itself needed no edit,
  which is consistent with the diagnosis (the writer was the killer
  format, not the grant).
- No deleted/re-pointed symbols (`sym.mjs` on `make_sick` /
  `delayed_killer` confirms both live; nothing retires to an import).

## C ↔ JS fidelity

C locus `potion.c:134–192`, arm at `:178–188` (via `csym.mjs make_sick`):

```c
if (xtime || !old || !kptr) {
    int kpfx = ((cause && !strcmp(cause, "#wizintrinsic"))
                ? KILLED_BY : KILLED_BY_AN);
    delayed_killer(SICK, kpfx, cause);
}
```

JS: `const kpfx = (cause && cause === '#wizintrinsic') ? KILLED_BY :
KILLED_BY_AN; delayed_killer(SICK, kpfx, cause || '');` inside the same
pre-existing guard. `cause &&` + exact-literal `===` ≡ C `cause &&
!strcmp` precisely, including falsy-cause → AN. `KILLED_BY` /
`KILLED_BY_AN` / `delayed_killer` were already imported (`:131`/`:183`
per D-log; no new edge). No RNG in the arm; draw-free format selection.

Mechanism check: tombstone row 9 C `poisoned by` vs pre-fix JS
`poisoned by a` with identical killer name on row 10 — exactly the
`killer.format` KILLED_BY-vs-AN article split that `formatkiller`
(`topten.c:98`) renders. The recorded owner, the C arm, and the one-line
symptom triangulate with nothing left over.

## Hallucinations / overclaim

None — and the D-log resists the easy overclaim: `verify --fn make_sick`
is reported as *vacuous* (0 sessions blocked on `make_sick` itself; the
recorded owner is `formatkiller`), with movement claimed only through
`verify formatkiller` + the focused replay. Owner-vs-writer discipline
held: the fix names the writer (`make_sick` killer arm), not the symptom
owner.

## Density

§2b ok. One C arm, one queue row, +10/−3 across 2 files plus the
scoreboard flip. Small-C case, fully moved a session — density ideal.

## Verification

- Added-line banned-pattern scan: 0 hits. Rule #2 clean (re-checked this
  iteration). No seed/step/coordinate read — the `'#wizintrinsic'`
  literal is C's own cause string (`strcmp` target), not a seed gate.
- **Re-measured the corpus claim myself** (the one commit here where it
  matters): `hidden-proxy.mjs verify formatkiller --base 7942532c~1` →
  "1 session(s) blocked on it (1 at baseline, 0 in the working
  scoreboard) / scen-death-Archeologist-92015: PASS / 1 PASS, 0 moved
  past, 0 unchanged, 0 worse → PROGRESS" — matches the D-log's claim
  verbatim. No WORSE, no later-step re-report. Genuine PROGRESS, not a
  vacuous PASS.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log Verify bullet; focused
  replay RNG 2979/2979 + Screen 58/58 cited. Committed scoreboard flip is
  the matching row, not an unrelated rescore.

## Actionable C-wrongs

None. The arm is verbatim; remaining `make_sick` omits (Unaware talk
suppress, SICK-expiry death arm in Open D-2160 row) stay named.

Verdict: **ACCEPT**
