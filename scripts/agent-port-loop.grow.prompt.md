You are a **growth** iteration of the unattended NetHack C→JS port loop
(Constitution §10.19). The supervisor chose this mode because the
generated **Open — cliffs** block holds fewer than 6 owners and no
Must-fix is open: the corpus stopped finding divergences, so the next
useful work is new C-recorded sessions, not new rows. **No `js/` edits,
no D-entry, no ledger rows.**

Why this exists: from 2026-10-01 to 2026-10-09 the corpus read up to
939/953 (positional RNG 100 %) while held-out sat at 18/44, RNG 41.7 %
against rngSteps 92.4 %, and port iterations hunted idiom sites no
session reached. Half the public RNG sits in four long sessions
(833–1953 steps); the scenario corpus stopped at 344. The marathon
families (`worldtour`, `sweep`, `chain`, `trek`) restored the signal on
2026-10-09: 50/160 PASS, cohort RNG 74.7 %.

## Steps (≈8 calls)

1. `git status --short` — never reset or discard others' work.
2. `node scripts/hidden-proxy.mjs families` — per-family PASS / RNG % /
   first-divergence median on the committed board, worst first.
3. Author **≥ 80 sessions** with the seed base the supervisor gives
   below (each command takes its own range: base, base+100, …):
   - at least half `--family marathon` (rotates the four long families),
     weighted toward the long family with the **lowest** RNG % only if
     it still has failing sessions; a long family at 100 % gets none;
   - the rest in the shape the judge walks and the corpus lacks, chosen
     from the families table: a long family's sibling (more `worldtour`
     depth, longer `chain`), or a second-wave family (`--family broad`)
     only when every long family is ≥ 90 % PASS.
   `node scripts/scenario-gen.mjs --family <f> --n <N> --seed <S> --jobs 8`
4. `node scripts/hidden-proxy.mjs record --jobs 8` (exit 3 = no C
   recorder: journal it, commit nothing, stop).
5. `node scripts/hidden-proxy.mjs score --jobs 8` — **full**, no
   `--ids`/`--owner`; it must be the last hidden-proxy command.
6. Compare with the committed board (`git show
   HEAD:hidden-corpus/scoreboard.json`): an old row that was PASS and is
   not now is a **Must-fix** row (same `js/`, so it is flakiness or a
   recorder change — name the session; `hidden-proxy show <id>`).
7. Commit recipes + board: `git add hidden-corpus/recipes
   hidden-corpus/scoreboard.json && git commit -m "Grow #N: …"`. Then
   `node scripts/check-hot-docs.mjs --fix` (regenerates the cliffs block
   from the board you just committed), update `docs/CURRENT.md` Corpus
   line (PASS / scored, RNG %, screens %, worst families from step 2 re-run
   on the new board) and prepend a journal crumb (families, counts, new
   cliff owners). Second commit, then `git push origin HEAD`.

If the new cohort still leaves fewer than 6 cliff owners, the next
iteration grows again; vary the family and lengthen sessions rather than
repeat the same mix. When every family including the long ones passes
≥ 90 %, a new family is the deliverable: add it to
`scripts/scenario-gen.mjs` (third-wave block — a **policy that only
chooses keys** from the screen; it never reads `js/`, and C decides
what happens), name the public session whose shape it copies, document it
in `docs/HIDDEN-PROXY.md`, then author with it.

## Prohibitions

No `js/` edits. No hand-written Open rows (the blocks are generated);
Must-fix only for a PASS→FAIL. Do not edit or delete existing recipes
or sessions to make the board look better. Do not edit Constitution,
playbook, runbook, Cursor rules, loop scripts/prompts, `frozen/**`,
`sessions/**`, upstream C. No `git reset --hard`, force-push or amend.
