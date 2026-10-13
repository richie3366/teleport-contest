You are a **growth** iteration of the unattended NetHack C→JS port loop
(Constitution §10.19–20). The supervisor chose this mode either on the
periodic slot (iteration n with n % 10 == 5) or because the generated
**Open — cliffs** block holds fewer than 6 owners, with no Must-fix open.
Your output is new C-recorded sessions **and the fresh-cohort line** — the
only local number that estimates the judge. **No `js/` edits, no D-entry,
no ledger rows.**

Why this exists: the worked corpus rises by construction (every session in
it is fixed until it passes: 1680/1769 on 2026-10-13) while held-out sat at
22/44, RNG 51.8 %. A cohort on unseen seeds scored *on arrival* measures
generalization: 2026-10-13 it read 79 % (marathon) and 88 % (mixed)
against the judge's 50 %. That gap is the generator's calibration error;
growth both measures it and feeds the picker with owners that block
several independent seeds.

## Steps (≈10 calls)

1. `git status --short` — never reset or discard others' work.
2. `node scripts/leaderboard.mjs` and `node scripts/hidden-proxy.mjs
   families` — held-out line; per-family PASS / RNG % on the board.
3. **Fresh cohort first:** `node scripts/fresh-cohort.mjs --seed <base>
   --n 160 --jobs 8 --fold` with the seed base the supervisor gives below.
   Copy its summary line and worst families verbatim into `docs/CURRENT.md`
   Score (the **Fresh cohort** row; keep the previous value in the "Fresh
   history" sentence). Exit 3 = no C recorder: journal it, commit nothing,
   stop.
4. Author **≥ 240 more** sessions (seed bases base+5000, base+6000, …):
   `node scripts/scenario-gen.mjs --family <f> --n <N> --seed <S> --jobs 8`,
   weighted to the families the fresh cohort failed most (it prints them);
   a family at 100 % on arrival gets none.
5. **Calibration** (§10.20): if fresh PASS % − held-out PASS % > 20 points
   and the previous grow did not already do it, this grow also adds or
   reshapes one family in `scripts/scenario-gen.mjs` (wave-3 block — a key
   policy that reads only the screen, never `js/`; C decides what happens),
   copying a public shape from `docs/HIDDEN-PROXY.md` §5c. First probe the
   shape with ~20 sessions (`--probe` / a temp `--out` dir + the frozen
   runner): ≤ 60 % PASS on arrival means it is a held-out shape — author
   ≥ 80 with it; ≥ 85 % means it is not — record that in §5c and pick
   another. Document the family in `HIDDEN-PROXY.md` §5c.
6. `node scripts/hidden-proxy.mjs record --jobs 8`, then
   `node scripts/hidden-proxy.mjs score --jobs 8` — **full**, no
   `--ids`/`--owner`; it must be the last hidden-proxy command.
7. Compare with the committed board (`git show
   HEAD:hidden-corpus/scoreboard.json`): an old row that was PASS and is
   not now is a **Must-fix** row (same `js/`, so it is flakiness or a
   recorder change — name the session; `hidden-proxy show <id>`).
8. Commit recipes + board (+ scenario-gen if step 5 ran):
   `git add hidden-corpus/recipes hidden-corpus/scoreboard.json && git
   commit -m "Grow #N: fresh … ; +K sessions …"`. Then `node
   scripts/check-hot-docs.mjs --fix` (regenerates the cliffs block from
   the board you just committed), update `docs/CURRENT.md` (Fresh row,
   Corpus line, worst families) and prepend a journal crumb (fresh line,
   families, counts, new multi-session owners). Second commit, then
   `git push origin HEAD`.

## Prohibitions

No `js/` edits. No hand-written Open rows (the blocks are generated);
Must-fix only for a PASS→FAIL. Do not edit or delete existing recipes
or sessions to make the board look better; never drop a fresh-cohort
session because it fails. Do not edit Constitution, playbook, runbook,
Cursor rules, loop scripts/prompts, `frozen/**`, `sessions/**`, upstream
C. No `git reset --hard`, force-push or amend.
