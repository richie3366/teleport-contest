# Review 1208 — 15a3a8df — object_detect spurious More before browse_map

Metadata: SHA `15a3a8df` (D-2242). Queue row `getpos.c` getpos,
scen-normal-Wizard-92127 step 72/114 (1 blocked). js/ detect.js +4/−1
(comment replaces one call).

## Intent vs deliverable

Subject promises removal of a spurious `--More--` between the detect
pline and the `browse_map` branch: C prints «You detect the presence of
objects.» then goes straight into `browse_map` (whose verbose pline
appends «(For instructions type a '?')» on the same topline via a
two-space join), while JS flushed topline-more first. Diff deletes
exactly the `await flush_topl_more()` call and cites the C chain.
Promise kept.

## Inventory

Changed: `object_detect` tail only. No new functions, no import change
(`flush_topl_more` still used at :1400/:1980/:2357 — shared edge
untouched, so no `--can` owed; accepted). Sibling `gold_detect`/:1980
and `display_trap_map`/:2357 keep the same pattern deliberately, named
as future rows rather than silently fixed — correct scoping.

## C ↔ JS fidelity

C tail (`detect.c:780–785`, within the `csym.mjs` `:602–789` range,
tail pasted during audit):

```c
You("detect the %s of %s.", ct ? "presence" : "absence", stuff);
if (!ct)
    display_nhwindow(WIN_MAP, TRUE);
else
    browse_map(ter_typ, "object");
map_redisplay();
```

No `more()` / flush between the `You()` and the branch — the deleted
call contradicts C on its face. Draw-free by construction (a display
flush draws nothing), so no fortress RNG movement is possible.

## Hallucinations / overclaim

None. D-log reports PROGRESS (moved past, not PASS) with the later
owner named (`distfleeck@101`), and names the tie-break across the 3
cMsgOwners plus empty stepFns / 0 blocked RNG. Sibling-pattern debt
named, not hidden.

## Density

One-line behavior fix + cite for a 1-session corpus block. In-band
(C locus is a 6-line tail; the surrounding body was already ported).

## Verification

Audit re-ran the corpus claim itself (`--base 15a3a8df~1`):

```text
verify getpos: baseline 15a3a8df~1 — 1 session(s) blocked on it
(1 at baseline, 0 in the working scoreboard)
  scen-normal-Wizard-92127: moved → distfleeck at step 101 (was 72)
verify getpos: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

Matches the D-log exactly (RNG 3042→3282, scr 72→104 per D-log).
Green 2/2 + strict ×2 + cohort 7/7 pasted. Diff grep: no FORCE/DIAG/
seed/coordinate reads. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
