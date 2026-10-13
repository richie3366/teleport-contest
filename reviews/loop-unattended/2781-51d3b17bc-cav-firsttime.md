# Review 2781 — 51d3b17bc — Cav firsttime quest datum

- **SHA:** `51d3b17bc` (Tue 2026-10-13) — cliffs-head `teleport.c` level_tele writer (D-3928).
- **D-entry:** D-3928. **Ledger:** `on_start` ported (quest first-visit pager path).
- **Diff size:** `js/questpgr.js` +9/−2 (1 body + 1 meta row + doc); new test `scripts/quest-arrival-caveman-firsttime.test.mjs`.
- **Method:** cliff commit, data-only — whole Method on the new body + meta row.

## Intent vs deliverable (promise vs diff)

The subject promises: behind the level-tele arrival More, C shows the Cav
`firsttime` text window while JS showed the bare materialize
(Caveman-587113 s614, screen-first, RNG fully matched); the fix adds the
Cav firsttime body verbatim + meta; probe moves 614→775 (now m_move).

The diff actually adds: `QUEST_FIRSTTIME.Cav`, one `QUEST_MSG_META`
row, and a doc touch (role list + removal of the "Cav burns nhl_init
shuffle only until ported" line). No code, no imports. Promise and diff
agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `QUEST_FIRSTTIME.Cav` (questpgr.js:335-340) | quest.lua Cav firsttime text :723-728 | verbatim datum |
| 2 | `QUEST_MSG_META.firsttime` Cav (questpgr.js:782-785) | same stanza's synopsis/output :720-722 | verbatim meta |
| 3 | test `quest-arrival-caveman-firsttime.test.mjs` | Caveman-587113 s614 | new, in scripts/ |

No JS function added, changed, deleted, or re-pointed; no `sym.mjs`
re-point output is required.

## C ↔ JS fidelity

Pinned lua read directly with line numbers (`awk NR 718-735`):

- **Text** (`:723-728`): `You descend through a barely familiar stairwell
  that you remember / %l showing you when you embarked upon your vision
  quest. / <blank> / You arrive back at %H, but something seems / wrong
  here.  The usual smoke ... / outer caves are absent, ...` — JS
  byte-identical, including the blank line after `quest.` and the double
  space after `here.`. The "TEXT EQUAL" byte-compare claim is consistent
  with my independent read.
- **Meta** (`:720-722`): `synopsis = "[You arrive back at %H, but
  something is wrong here.]"`, `output = "text"` — JS meta identical on
  both keys.
- **Cite:** the JS comment's `:723-728` covers exactly the text lines
  (full stanza :720-729). Accurate.
- **`%l`/`%H` conversions:** previously shipped paths (exercised by the 12
  earlier firsttime bodies); the probe's 161-step advance through the
  painted window proves the render.
- **"All 13 role filecodes":** counted in the file — `QUEST_FIRSTTIME`
  now holds Arc/Bar/Pri/Wiz/Hea/Kni/Ran/Rog/Sam/Tou/Val/Mon/Cav (13).
  True, and the stale "Cav burns shuffle only until ported" doc line was
  removed in the same hunk — no dangling comment.
- **No RNG / branch order:** data row; the session's RNG was already fully
  matched through the divergence (screen-first kind), so no draw walk
  applies.

## Hallucinations / overclaim

- The D-log correctly refuses a second attribution: rec#617's empty
  topline means the `Sting_effects` cMsgOwners entry is heuristic, not a
  second message — and it verifies Sting_effects whole by brief read
  rather than porting it. Disciplined, no overclaim.
- No "Match C" is claimed for any stubbed callee; the consuming pager path
  is exercised live by the 161-step movement. None found.

## Density

Cliff phase (§10.18): the parent's generated cliffs head was `teleport.c`
level_tele blocking scen-sweep-Caveman-587113 at step 614 (verified in
`51d3b17bc~1:docs/LOOP-QUEUE.md`, top row, RNG lost 15332). Owner-vs-writer
correctly resolved to the quest-text writer (screen-first divergence with
RNG fully matched); this commit ports exactly that writer with its own
Ledger row. The D-log forced a full public `sessions` (44/44) even though
the checker said "not shared" — above the gate. One cliff, code + ledger
+ verify in one handoff. Rule #2: `imports.mjs --rulecheck` → clean (run
this iteration, cited for all 9 SHAs).

## Verification

Re-measured myself:

```
verify level_tele: baseline 51d3b17bc~1 — 1 session(s) blocked on it
  scen-sweep-Caveman-587113: moved → m_move at step 775 (was 614)
verify level_tele: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
reach level_tele: 31 baseline-PASS session(s) reach it: 31 PASS, 0 regressed → REACH-OK
```

D-log's "614→775 now m_move, 161 steps later" reproduced exactly; reach
31/31 with zero regressions. No REGRESSED session. Movement + REACH-OK:
satisfied. New test 0/1 pre → 1/1 post per the D-log (authentic red on
the stairwell line).

## Actionable C-wrongs

None. The body and meta are byte-exact vs pinned lua, the 13-role closure
claim counts out, and the corpus claim re-measures clean.

Verdict: **ACCEPT**
