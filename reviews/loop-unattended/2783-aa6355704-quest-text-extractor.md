# Review 2783 — aa6355704 — quest.lua role-message extractor

- **SHA:** `aa6355704` (Tue 2026-10-13) — D-3930 data completeness (human-directed §10.20 item 1, not a cliffs pop).
- **D-entry:** D-3930. **Ledger:** `com_pager_core` ported.
- **Diff size:** `js/generated/quest_text.js` +1877 (new), `js/questpgr.js` +44/−760 (hand tables deleted, import + alias added), `scripts/extract-quest-text.py` +112 (new).
- **Method:** data commit — whole Method on the extractor, the generated table, and the changed lookup arms.

## Intent vs deliverable (promise vs diff)

The subject promises: every quest.lua role message extracted (192 of
368 missing, 5 msgids absent for all 13 roles); the 176 shipped
entries byte-equal before deletion; fresh Monk/Wizard gotit failures
fixed; full rescore with 0 flips.

The diff actually adds: the extractor, the 368-entry generated table,
one import + `QUEST_ROLE_TEXT = QUEST_ROLE_MSGS` alias, and a trimmed
`lookup_quest_entry` (array + table arms; the flattened-string + META
arm deleted with its data). No caller changes. Promise and diff agree.

## Inventory

| # | JS change | C/data source | Status |
|---|-----------|---------------|--------|
| 1 | `QUEST_ROLE_MSGS` (generated, 29 msgids × roles = 368 entries) | dat/quest.lua role tables | new, structural |
| 2 | `QUEST_ROLE_TEXT` alias + import (questpgr.js:241) | — | wiring |
| 3 | `lookup_quest_entry` role arm (questpgr.js:618–643) | questpgr.c:543/549/552–568 | arm preserved, META arm removed |
| 4 | −760 lines hand tables + `QUEST_MSG_META` | — | deleted after byte-compare |

No export deleted or re-pointed (alias keeps the name); no `sym.mjs`
re-point output required. Stale-ref grep for
`QUEST_FIRSTTIME|QUEST_MSG_META|QUEST_GOTIT|QUEST_LEADER` in `js/`: zero
hits outside generated. ✓

## C ↔ JS fidelity

**Counts (all independently re-measured):** generated file holds 29
msgids / 368 entries; 28 msgids have all 13 roles; `goal_alt` has 4
(Arc,Sam,Tou,Wiz); the 5 claimed-absent msgids (`leader_other`,
`leader_last`, `offeredit`, `offeredit2`, `hasamulet`) now have 13/13.
Old file: composed `QUEST_ROLE_TEXT` lists exactly 24 msgids
(17 per-msgid + 5 nemesis + 2 guardtalk) — 24 + the 5 absent = 29 ✓;
per-msgid tables hold 85 role entries, + 91 full speech/guardtalk =
176 ✓ ("192 missing" = 368−176 ✓). Old file has 0 refs to
`leader_other`/`hasamulet` ✓.

**Extraction fidelity:** new Monk `gotit.text` matches lua :1411–1414
verbatim (modulo newline joins); `discourage.Arc` is an array (len 10),
the C :552–568 rn2 arm shape ✓. Completeness is structural, not
enumerated: the extractor walks every top-level key of every role span,
so JS covers the key space of the same lua file C reads at runtime;
`assert len(full) == 28` guards regressions. **Extractor re-run is
byte-identical** (tree stayed clean). ✓

**Migration fidelity:** my own old→new byte-compare
(`/tmp/compare_quest.py`): Cav `firsttime` and Bar `gotit` — text,
synopsis, and output all EQUAL. ✓ The deleted META arm is unreachable
now: `normalize()` SystemExits on anything that is not an array or a
`text` table, so no bare-string entry can reach the removed path; the
`goal_alt = "goal_next"` string at lua :32 lives in `msg_fallbacks`,
mirrored by the preserved `QUEST_MSG_FALLBACKS` read. ✓

**Lookup semantics:** role arm keeps the C-cited order (miss →
fallback retry → array arm → table arm); common/cuss arms untouched.
C `com_pager_core` is :467–621 per csym (D-log cites :468 — off-by-one
start, trivial). No RNG in the lookup path on either side. ✓

Nits (docs only, not C-wrongs): (a) "goal_alt on five roles" is wrong
in three places (D-log, extractor docstring, js comment) — lua has
exactly four `goal_alt = {` tables (the fifth `goal_alt` line is the
`msg_fallbacks` string); 368 = 28×13+4 reconciles. (b) Extractor line
92 asserts a list against itself (tautology); it should assert the
expected role set. Neither affects behavior.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (this iteration, cited for all 8 SHAs); generated data is
in-process, no runtime fs.

## Hallucinations / overclaim

- The D-log correctly does NOT claim a `verify com_pager_core` movement
  line (no queue row cited blocks for it) — it evidences the fresh
  cohort (3 → PASS, 3 moved later, sessions named with steps) and a
  full 1769-session rescore with 0 flips instead. No vacuous "PASS
  hidden" bullet. None found.

## Density

Not a cliffs pop and not Must-fix — human-directed §10.20
completeness item 1, documented as such in the D-log Status and now
recorded in CURRENT.md ("done (D-3930, generated)"). The §10.19
unreached-work clause does not fire: the work reached named sessions
(Monk-610013 s973, Wizard-610000 s644 shapes quoted C-vs-JS) rather
than a path no session executes. Parent Must-fix was empty (0 rows)
and the parent head was the same parked-terminal nhl_gamestate row, so
no Must-fix or live head was skipped. One deliverable (whole table +
consumer + extractor), own Ledger entry, code + verify in one handoff. ✓

## Verification

Re-measured myself (`--base aa6355704~1 --reach-all`, current code):

```
verify com_pager_core: baseline aa6355704~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify com_pager_core: no corpus session is blocked on it at aa6355704~1 — a vacuous verify is NOT a corpus PASS...
reach com_pager_core: 34 baseline-PASS session(s) reach it (34 run, 36.2s): 34 PASS, 0 regressed → REACH-OK
```

Zero blocked is correct here (no row claimed any); reach 34/34 with
zero regressions. No REGRESSED session. Quest pager tests at HEAD:
9/9 pass (4 files sampled, incl. the Cav-firsttime and Barb-gotit
regression tests). The D-log's 1769-session 0-flip rescore is further
covered by this audit's final full rescore.

## Actionable C-wrongs

None. Counts reconcile three independent ways, migration samples are
byte-equal, the extractor is deterministic, and reach is clean.

Verdict: **ACCEPT**
