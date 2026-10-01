# Review 2185 — e45cb9654 — save_light_sources bad-type peel fix

SHA `e45cb9654`, D-3225; 2026-10-01; js/mkobj.js (+6/−5) +
scripts/save-light-sources.test.mjs (new, 44 lines, unscored).
Single-function Must-fix. Closes review 2184's Must-fix
(**Addressed:** D-3225 stamped on 2184 in this SHA; hash filled by
cf2801fa2 per the next-commit rule ✓).

## Metadata

- Subject: "save_light_sources peel bad-type classification (review
  2184 Must-fix) (D-3225)."
- Promises: review 2184's one-line fix (`badType` force-local) +
  comment correction + the review falsifier as a node:test.

## Intent vs deliverable

Kept exactly. The diff does the one-line fix, corrects the false
comment, and adds the 2-case regression test. No scope creep, no
second function, no caller changes.

## Inventory — save_light_sources

Changed: `save_light_sources` (js/mkobj.js:1306) — peel
classification only. No new functions, no new imports, no
deleted/re-pointed symbols (no clone→import; `sym.mjs` re-point
check vacuous):

```text
save_light_sources js/mkobj.js:1306   sync
```

Added (unscored): `scripts/save-light-sources.test.mjs` — review
falsifier, `{ type: 99, id: {} }` at both ranges.

## C ↔ JS fidelity — save_light_sources

C `light.c:420–471` (csym range); bad-type arm `:454–459`
(`default: is_global = 0; impossible("…bad type…")`), free rule
`:462` (`is_global ^ (range == RANGE_LEVEL)`).

Branch-by-branch confirm: `t = ls.type | 0` mirrors the switch
subject ✓; the no-id impossible (`:444–446`) and bad-type
impossible (`:454–459`) fire in C order before classification ✓;
`const badType = t !== LS_OBJECT && t !== LS_MONSTER` matches the
`default:` arm exactly (only two valid cases) ✓; `(!ls.id ||
badType) ? true : light_is_local(ls)` forces local for both C
`is_global = 0` arms and delegates only the two valid typed cases
to `light_is_local` ✓; `is_local === wantLocal → saved` ≡ C `:462`
(peel iff local matches RANGE_LEVEL) ✓. The corrected comment now
states the fallthrough truthfully (`return false` = global).
`discard_flashes` + `vision_full_recalc = 0` head untouched ✓.
No RNG in C; none added ✓. Test asserts both directions
(RANGE_LEVEL peels, RANGE_GLOBAL keeps) — passes 2/2 here.

Diff grep: 3 hits, all in CURRENT.md "Do not" boilerplate, 0 in
`js/`. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "Fails 0/2 pre-fix, passes 2/2 post-fix" is consistent with
the inversion (both directions wrong before). D-log Verify claims
match the re-measure below.

## Density

Must-fix ships alone ✓ (Constitution §10.17). One function, one
arm, one test. Below the ~80-insertion guideline by design — a
Must-fix is not a cluster.

- Ledger: save_light_sources ported — ACCEPT (bad-type arm fixed).

## Verification

Re-measured (current tree):

```text
verify save_light_sources: baseline e45cb9654~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke save_light_sources: no RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note + REACH-OK, green/strict/cohort).
No REGRESSED session. The arm is impossible-class (corrupt type no
session produces), so vacuous + test falsifier is the right
evidence, and the D-log says so explicitly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
