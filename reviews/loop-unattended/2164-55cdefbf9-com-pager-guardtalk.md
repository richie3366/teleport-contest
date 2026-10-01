# Review 2164 — 55cdefbf9 — com_pager_core guardtalk arrays

SHA `55cdefbf9`, D-3204; 2026-10-01; new `js/generated/quest_guardtalk.js`
(193 lines) + 2-line registration/import in `js/questpgr.js` + comment
correction in `js/quest.js` + extractor generalization (scripts/, not
scored). Single-function data-completion cluster. Closes no prior
review.

## Metadata

- Subject: "`questpgr.c` com_pager_core guardtalk role arrays (blocked
  quest session unblocked)".
- Promises: extract the guardtalk pair (13 roles × 2), register both
  keys so the filecode lookup hits (one shuffle + pick, C order),
  unblocking scen-quest-Archeologist-94096 step 72.

## Intent vs deliverable

Kept. Diff adds the generated tables, the import, both
QUEST_ROLE_TEXT keys, the corrected quest.js comment, and the doc omit
update. The extractor generalizes ARRAY_KEYS/GUARD_KEYS with anchor
asserts. The recorded session moves past com_pager_core (PROGRESS with
same-step re-attribution, honestly reported).

## Inventory — com_pager_core

Changed: `QUEST_ROLE_TEXT` gains `guardtalk_after`/`guardtalk_before`
(js/questpgr.js:624–629); new import of `QUEST_GUARDTALK`; new
generated module (26 arrays); comment-only changes in js/quest.js +
the com_pager_core doc block. No function body changed; no symbol
deleted or re-pointed (pure data addition served through the existing
`lookup_quest_entry` array arm).

## C ↔ JS fidelity — com_pager_core

C `questpgr.c:467–621` (csym range) + `qt_pager` `:629–634` + quest.c
`chat_with_guardian` `:440–448`. Diagnosis verified end to end: C
qt_pager runs core(filecode) then core(common) only on miss; each core
burns one nhl_init shuffle (`:487`, = JS `nhl_nhlib_align_shuffle`)
before the lookup; C questtext has per-role guardtalk arrays so the
first core hits and draws `rn2(nelems)` (`:566`). JS before: both keys
absent → role miss (shuffle #1) + common miss (shuffle #2), no pick —
exactly the recorded `rn2(5)=0 @com_pager_core` vs `rn2(3)=1
@nhl_nhlib_align_shuffle` divergence. JS after: `QUEST_ROLE_TEXT
[msgid][section]` (transposed vs C's questtext[section][msgid, but an
equivalent keyed lookup) hits the array arm → one shuffle +
`arr[rn2(5)]` — C's lua-1-based `rn2(nelems)+1` picks the same element
as JS 0-based `rn2(nelems)` ✓; `nelems < 2` impossible+miss both sides
✓ (all 26 arrays verified length 5 by execution, matching the recorded
rn2(5)). Data fidelity: extractor re-ran in-audit → both outputs
regenerate byte-identical (the "nemesis byte-identical" claim
corroborated); Arc guardtalk_before matches quest.lua:298–302 all 5
lines verbatim incl. `%ls`; Lash LaRue anchors at :291/:298 ✓.
Converter coverage: distinct codes enumerated by execution —
%c %cP %d %i %l %lC %ls %n %nC %nj %o %oC %p %pC %r %s — every base
letter is a convert_arg case and every modifier (C/P/s/j) a
convert_line arm (`%nj`: 'n' ∈ dlno → qtext_pronoun 'his' ✓), so "no
converter change" holds ✓. Callers: C :163/:172 rawtext
(stinky_nemesis) + :626 com_pager + :632/:633 qt_pager — the data
addition serves all three uniformly; no caller touched. The removed
quest.js "miss still burns the shuffle, RNG matches either way
(D-2623)" comment was indeed wrong (a miss burns the SECOND shuffle
where C draws the pick) — the correction is accurate. Verdict: ACCEPT.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates
(the generated file is string data; the extractor is scripts/, not
scored). Rule #2 clean (iteration-wide rulecheck; generated data is
the sanctioned embed path).

## Hallucinations / overclaim

None material. The subject's "unblocked" means "no longer blocked on
com_pager_core" — the session re-attributes to dog_goal at the same
step and stays non-PASS; the D-log Status ("moved past") and Verify
tail ("1 re-attributed at the same step") state this precisely, so the
shorthand does not mislead. No vacuous-PASS shape (PROGRESS, not PASS,
with the owner named).

## Density

One function whose C body was already whole; this iteration completes
its data closure for the recorded divergence (~10 hand-written js +
193 generated lines). Same-file closure exhausted with an enumerated
callee-closure justification (only com_pager_core was queue-eligible).
Ledger (partial) and Verify lines present.

- Ledger: com_pager_core partial — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify com_pager_core: baseline 55cdefbf9~1 (scoreboard at a5f89dd93) — 1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard)
  scen-quest-Archeologist-94096: moved → dog_goal at step 72 (was 72; same step: re-attributed, read the row diff)
verify com_pager_core: 0 PASS, 1 moved past (1 re-attributed at the same step), 0 unchanged, 0 worse → PROGRESS
smoke com_pager_core: no RNG-tagged reach; fixed smoke spread (24 run, 11.0s): 24 PASS, 0 regressed → REACH-OK
```

Reproduces the D-log tail exactly (1 blocked → PROGRESS, smoke 24/24).
The com_pager_core RNG divergence is genuinely gone (a lingering one
would still name com_pager_core); the new owner at the same step is
out of this SHA's scope and honestly disclosed. No REGRESSED session.

## Actionable C-wrongs

None. (The 7 named unextracted role bodies are future extraction rows
per the D-log, not this SHA's miss — each needs its own corpus
evidence to prioritize.)

Verdict: **ACCEPT**
