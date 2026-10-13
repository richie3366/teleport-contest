# Review 2773 — b0a771ec2 — Val goal_next quest datum

- **SHA:** `b0a771ec2` (Tue 2026-10-13) — cliffs-head `hack.c` u_maybe_impaired writer (D-3920).
- **D-entry:** D-3920. **Ledger:** `com_pager_core` ported (re-stamp only).
- **Diff size:** `js/questpgr.js` +3/−1 (1 datum + 1 comment + 1 doc line); new test `scripts/quest-arrival-val-goal-next.test.mjs` (50 lines).
- **Method:** cliff commit, ≤10 functions — whole Method on the one changed datum + its consuming arm.

## Intent vs deliverable (promise vs diff)

The subject promises: Val `goal_next` quest text was missing, causing a
pager retry double-shuffle at step 463 (JS two shuffles where C draws one);
C hides the paint via ESC-at-More WIN_STOP, so only the datum was missing;
Valkyrie-587104 moves 464→634.

The diff actually adds: one `Val:` entry to `QUEST_GOAL_NEXT`
(js/questpgr.js:600-601), one comment citing quest.lua:2732-2734, one doc
role-list touch, plus a focused prefix test. The C-locus story (on_goal
revisit, WIN_STOP swallow) is attributed to pre-existing JS, not new code.
Promise and diff agree: a data-only writer port.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `QUEST_GOAL_NEXT.Val` (questpgr.js:601) | dat/quest.lua Val `goal_next` text | verbatim datum |
| 2 | test `quest-arrival-val-goal-next.test.mjs` | scen-worldtour-Valkyrie-587104 step 463 | new, in scripts/ (unscored) |

No JS function added, changed, deleted, or re-pointed; no `sym.mjs`
re-point output is required (nothing to resolve — pure data row).

## C ↔ JS fidelity

C locus (pinned, read directly — `sed -n '2725,2745p'
nethack-c/upstream/dat/quest.lua`):

```
      goal_next = {
         text = "Once again, you stand in sight of %ns lair.",
      },
```

JS (questpgr.js:600-601):

```js
    // C ref: dat/quest.lua Val goal_next (no output/synopsis keys: pline) — quest.lua:2732-2734
    Val: `Once again, you stand in sight of %ns lair.`,
```

Branch-by-branch confirm:

- **Text bytes:** exact match — `Once again, you stand in sight of %ns
  lair.` including the `%ns` conversion and trailing period. The D-log's
  "TEXT EQUAL" byte-compare claim is consistent with what I read in both files.
- **Meta arm:** the lua stanza carries neither `output` nor `synopsis`
  keys, so the default pline arm runs — the JS comment states exactly this,
  matching the shipped Ran precedent (same shape, D-3913-era line 599).
- **Swallow arm (pre-existing, claimed not new):** `_win_stop` exists in
  js/display.js (`:2743` decl, `:8522` set on ESC-at-More, `:8346`/`:8703`
  skip guards). The D-log's claim that the swallow was already ported is
  true as far as the flag machinery exists; the new test pins the no-paint
  behavior end-to-end (see Verification).
- **No RNG in the datum:** quest text selection draws no RNG itself; the
  RNG effect is removing the second (retry) `nhl_init` shuffle. No
  `rn2`/`rnd` walk applies.

## Hallucinations / overclaim

- The D-log says "C hides the text via ESC-at-More WIN_STOP" and attributes
  the C dump to a TEMP-C re-record (recorder tree, reverted + rebuilt).
  I cannot re-run their TEMP-C dump, but the conclusion is checkable from
  the permanent record: C screens 460–804 show no goal_next text while C
  drew a single pager shuffle — consistent with hit-plus-swallow, and the
  movement re-measure below independently confirms the writer diagnosis
  (one shuffle now, session advances past the divergence).
- "Val goal_alt absent in lua too" — confirmed: no `goal_alt` key appears
  under the Val stanza region I read (goal_first/goal_next/gotit only).
- No "Match C" claim is made for any stubbed callee; the only callee named
  (`com_pager_core` retry arm) is proven live by the pre-fix double shuffle
  itself. No hallucination found.

## Density

Cliff phase (§10.18): the parent commit's generated cliffs head was
`hack.c` u_maybe_impaired blocking scen-worldtour-Valkyrie-587104 at step
464 (verified in `b0a771ec2~1:docs/LOOP-QUEUE.md`, RNG lost 25073, top row).
The owner stands whole per D-3772 (3-line body, read once per the row tag);
the divergence named the pager-retry writer, and this commit ports exactly
that writer — one datum, same-C-file family, no bundled work. Ledger entry
is the function's own row (re-stamp with the D-id appended). Density is
right: one cliff, code + ledger + verify in one handoff.

Anti-pattern grep on the `js/` hunks: the single `FORCE` hit is the commit
message's own "no DIAG/FORCE/seed gates" sentence, not code. Rule #2:
`node scripts/imports.mjs --rulecheck` → "Rule #2 clean" across scored
`js/` (run this iteration, cited for all 9 SHAs).

## Verification

Re-measured myself (not trusting the D-log):

```
verify u_maybe_impaired: baseline b0a771ec2~1 — 1 session(s) blocked on it
  scen-worldtour-Valkyrie-587104: moved → zhitu at step 634 (was 464)
verify u_maybe_impaired: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
reach u_maybe_impaired: 71 baseline-PASS session(s) reach it: 71 PASS, 0 regressed → REACH-OK
```

Both summary lines cite per fn: `0 PASS, 1 moved past, 0 unchanged,
0 worse` and `71 PASS, 0 regressed → REACH-OK`. The D-log's "moved →
zhitu at step 634" is exactly reproduced; no REGRESSED session. The new
test pins the mechanism (single shuffle pair at slice 463 + WIN_STOP
no-paint). Movement + REACH-OK: satisfied.

## Actionable C-wrongs

None. The datum is byte-exact, the meta arm matches the lua stanza shape,
and the corpus claim re-measures clean.

Verdict: **ACCEPT**
