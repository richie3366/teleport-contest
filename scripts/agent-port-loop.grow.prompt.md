You are a **growth** iteration of the unattended NetHack C→JS port loop
(Constitution §10.19–21). The supervisor chose this mode either on the
periodic slot (iteration n with n % 10 == 5) or because the generated
**Open — cliffs** block holds fewer than 6 owners, with no Must-fix open.
Your output is **the fresh-cohort line** — the only local number that
estimates the judge — and the cohort's failing sessions folded into the
corpus. **No `js/` edits, no D-entry, no ledger rows, no full rescore.**

Why this exists: the worked corpus rises by construction (every session in
it is fixed until it passes), so only a cohort on unseen seeds scored *on
arrival* measures generalization. Why it is small (§10.21, 2026-10-15): the
corpus held 644 failing sessions under 169 owners while a port iteration
moves one or two; grows of +450 sessions every 10 iterations only added
replay cost (two full rescores per 10 iterations, symset alone 470 recipes)
without changing what the picker pops next.

## Steps (≈8 calls)

1. `git status --short` — never reset or discard others' work.
2. `node scripts/leaderboard.mjs` and `node scripts/hidden-proxy.mjs
   families` — held-out line; per-family PASS / RNG % on the board.
3. **Fresh cohort:** `node scripts/fresh-cohort.mjs --seed <base> --n 160
   --jobs 8 --fold` with the seed base the supervisor gives below. It scores
   on arrival, folds the **failing** recipes into `hidden-corpus/recipes/`
   and the PASS-on-arrival ones into `recipes-archive/`, then runs
   `hidden-proxy score --new` and `hidden-proxy tier` itself (owner quota:
   sessions beyond 3 per owner go to `recipes-reserve/`, rows kept). Copy
   its summary line and worst families verbatim into `docs/CURRENT.md`
   Score (the **Fresh cohort** row; keep the previous value in the "Fresh
   history" sentence). Exit 3 = no C recorder: journal it, commit nothing,
   stop.
4. **Only when the supervisor said the cliffs block holds fewer than 6
   owners:** author ≤ 160 more sessions (seed bases base+5000, base+6000,
   …) with `node scripts/scenario-gen.mjs --family <f> --n <N> --seed <S>
   --jobs 8`, in families whose fresh line shows failures **and** whose
   failing owners are not already in the cliffs block; then
   `node scripts/hidden-proxy.mjs score --new --jobs 8` and
   `node scripts/hidden-proxy.mjs tier`. A periodic grow skips this step.
5. **Calibration** (§10.20): if fresh PASS % − held-out PASS % > 20 points
   and the previous grow did not already do it, this grow also adds or
   reshapes one family in `scripts/scenario-gen.mjs` (wave-3 block — a key
   policy that reads only the screen, never `js/`; C decides what happens),
   copying a public shape from `docs/HIDDEN-PROXY.md` §5c. First probe the
   shape with ~20 sessions (`--probe` / a temp `--out` dir + the frozen
   runner): ≤ 60 % PASS on arrival means it is a held-out shape — author
   ≤ 80 with it (then `score --new` + `tier`); ≥ 85 % means it is not —
   record that in §5c and pick another. Document the family in
   `HIDDEN-PROXY.md` §5c.
6. Commit: `git add -A hidden-corpus && git commit -m "Grow #N: fresh … ;
   +K failing folded, R reserved …"`. Then `node
   scripts/check-hot-docs.mjs --fix` (regenerates the cliffs block from the
   board you just committed), update `docs/CURRENT.md` (Fresh row, Corpus
   line: active / reserve / archive counts) and prepend a journal crumb
   (fresh line, worst families, new multi-session owners). Second commit,
   then `git push origin HEAD`.

Do **not** run a full `hidden-proxy score` or `archive`: the audit does
both once per 10 iterations. A PASS→FAIL can only come from `js/`, which a
grow does not touch.

## Prohibitions

No `js/` edits. No hand-written Open rows (the blocks are generated);
Must-fix only for a JS throw in a folded session (§10.14). Do not edit or
delete existing recipes or sessions to make the board look better; never
drop a fresh-cohort session because it fails. Do not edit Constitution,
playbook, runbook, Cursor rules, loop scripts/prompts, `frozen/**`,
`sessions/**`, upstream C. No `git reset --hard`, force-push or amend.
