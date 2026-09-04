# Continuation postmortem — #2238 → #2240, D-1831 (2026-09-05)

**Addressed:** D-1832

Human investigation (loop stopped). **Read this before relaunching.**
It explains why one D-entry cost 533 tool calls and 62 minutes, why the
commit's corpus claim is wrong, what was changed so it does not repeat,
and the Must-fix that now sits first in `LOOP-QUEUE.md`.

## 1. What happened

| Iter | Mode | Wall | Calls | Tokens | Outcome |
|---|---|---:|---:|---:|---|
| #2237 | port (D-1830) | 12 min | 161 | 4.8 M | normal |
| #2238 | port `process_menu_window` (21 corpus blocks) | 19 min | 174 | none recorded | **provider quota** (`ActionRequiredError: You're out of usage`) one call after a complete `verify.mjs --fn` run; leftover 7 files / +242 |
| #2239 | auto continue-unfinished | 1 s | 0 | — | operator Ctrl-C (retrying into an exhausted plan) |
| #2240 | manual `--continue-unfinished` | **43 min** | **359** | **17.2 M** (16.2 M cache reads) | D-1831 `55c6736d`; public 44/44 |

Median port iteration (measured in `docs/proposals/2026-08-25-…`): 176
calls, 6.2 M tokens, 14 min. This cluster cost ~3× the calls, ~4× the
tokens and ~4.4× the wall clock of a median port. #2238 itself was a
median iteration that got killed at its last step; the excess is all in
the continuation.

## 2. Where #2240's 43 minutes went

Timeline reconstructed from `iter-2240-*.raw` (tool execution 3 min 15 s
of 42 min 30 s — 94 % of wall clock is model turns, 131 of them):

| Phase | Minutes | Calls | What |
|---|---:|---:|---|
| Hunting for the extract/raw whose exact paths were in the prompt | 1 | 25 | globbed `**/*.{log,raw}` over the repo, `~/.cursor`, then `$HOME` (25 s); read the supervisor source for `LOG_DIR` |
| Re-deriving #2238 from scratch | 13 | ~125 | C at 30 offsets, JS at 40, playbook twice, whole `DIVERGENCE-LOG.md`, `DIVERGENCE-INDEX.md` twice, harness source (`verify.mjs` ×3, `finish-iteration.mjs` ×4, `hidden-proxy.mjs` ×3, `hidden-worker.mjs` ×3), `scoreboard.json` and `.cache/hidden/scores.json` paged by offsets |
| New work (look-at MENU_SEARCH, overlay wrap) | 5 | ~30 | first edit at 17:37; first `verify.mjs --fn` at **23:03** |
| Regression round 1 — row-1 `cl_end` scope | 2 | ~8 | |
| Regression round 2 — `maxrow` leftover geometry (incl. a 5-min file-by-file bisect) | 6 | ~45 | the first-diff row (map row 7 under the tutorial prompt) pointed at the only leftover hunk that paints below row 1 |
| Regression round 3 — status cache repaint (`_snapshotStatusGrid`) | 4 | ~25 | **this edit is the corpus regression in §4** |
| Regression round 4 — look-at dismiss via `docrt` | 4 | ~25 | |
| Handoff | 3 | ~30 | |

The first verify at 23:03 listed **all eleven** failing public sessions.
They were fixed one session per round, each round re-running the 15 s
suite and starting a fresh investigation. The same eleven sessions were
already listed in #2238's final verify output — which never reached #2240
because the `.log` extract contains only `[tool] started/completed` lines.

Three probes were hand-written inline scripts decoding C screens at given
steps (`node --input-type=module <<EOF … decodeScreen …`): each cost a
1–2 minute model turn. `scripts/lib/hidden-worker.mjs <session>` already
prints the first differing row on both sides.

## 3. Root causes and what changed

| # | Cause | Change |
|---|---|---|
| 3.1 | **The handoff carried nothing.** The extract is `[tool]` markers; the raw is 12 MB of stream-json. #2238's complete verify output (16 corpus PASS, 11 public FAILs) was invisible. | `scripts/loop-resume-brief.mjs <raw>`: narrative, every range read, every edit hunk, output tails of verify/runner/worker commands, how it died — ~75 lines. The supervisor embeds it in `next-iter.context.md` when it arms the latch (`write_continue_context`). |
| 3.2 | **Continuation protocol was read-first, verify-last.** The prompt said "read the extract, then the raw, then the docs, then re-read C, then verify". Verify came at call ~205. | `scripts/agent-port-loop.continue.prompt.md` rewritten: first three calls fixed (brief → `git diff HEAD -- js/` → `verify.mjs --fn`), budget stated (verify by call ≤5, done <120), harness source and whole-log reads named as the failure mode. |
| 3.3 | **Serial regression rounds.** verify printed the FAIL list but not where each session diverged, so each round started from one session's `hidden-worker` run. | `verify.mjs` now prints every failing session's first divergence (step, row, owner, C vs JS row) on a cohort/full FAIL. Playbook §5/§9, port prompt and runbook §5.E: triage all, fix causes once, re-run once. |
| 3.4 | **`hidden-proxy verify` rewrote its own baseline.** After #2238's verify, the 16 PASS rows were no longer "blocked on `process_menu_window`"; #2240's three later verifies printed `no corpus session is blocked on it` — rendered as `PASS hidden` — and the last four edit rounds were never re-run on those sessions. | `hidden-proxy.mjs verify --base <rev>` (default HEAD): the blocked set comes from the **committed** scoreboard, unioned with the working one; PASS-at-baseline → fail is WORSE; same-step re-attribution and same-owner-later-step are labelled. `verify.mjs` prints `note` (never PASS) for a vacuous check. Review prompt §6: re-measure with `--base HASH~1`. |
| 3.5 | **Quota death handled as a crash.** The supervisor retried at once (the plan was still exhausted), and the 3×-short-run halt in that branch would have `git reset --hard` the leftover. | `agent_exit_hint` recognises `out of usage` / `ActionRequiredError` → halt immediately, latch armed, tree kept, reason in `last-halt-reason.txt`; the short-run halt in the crash branch no longer resets. |
| 3.6 | **A tty side effect emulated with a grid snapshot.** C `process_menu_window` loops on `tty_nhgetch` without redrawing; JS `itemactions` calls `docrt()` on every key and re-paints the corner menu, so "keep WIN_STATUS" was implemented as snapshot-before-`clearScreen`/restore-after. The snapshot copies rows that `docrt()`→`cls()` already blanked. | Playbook §3 anti-pattern row, port + continue prompts, CURRENT "Do not". Must-fix row (§5). |

## 4. Was code committed that games a cohort or the corpus?

**No seed, step, coordinate or RNG-index gate exists in the diff**, and
every change cites a C locus that I re-read: `windows.c` `select_menu` /
`getlin` set `gb.bot_disabled` (:1856–1901), `botl.c` `bot` / `timebot`
return early on it (:255, :277), `wintty.c` `:1501–1505` clears extra
rows from `offx`, `:1698–1731` is MENU_SEARCH. `_paintToplineOnlyOverOverlay`,
per-window `maxrow` and `dismiss_nhw_menu` for the look-at menu are
defensible ports.

What **is** wrong is the verification claim, and it is a tooling hole
rather than agent intent:

- The D-log Verify bullet says `PASS hidden (no corpus session blocked on
  process_menu_window)` for a queue row that existed *because* 21
  sessions were blocked on it. The check was vacuous (§3.4).
- The committed `hidden-corpus/scoreboard.json` (`commit: ab55b818`,
  `at: 21:36Z`) claims **176/278**; its 21 target rows were measured by
  #2238's verify (16) and #2240's first verify (3) on code that was then
  edited four more times. Re-scored at `55c6736d` (2026-09-05): **164/278**
  (61.9 % excluding env rows), `process_menu_window` back to **12 blocks**.

The 21 sessions, at the commit the row was queued on → claimed → actual at HEAD:

| Sessions | At `ab55b818` | Claimed in `55c6736d` | Actual at `55c6736d` |
|---|---|---|---|
| 12 (`explore-seed0200`, six `explore-seed0367`, `ind-Archeologist-128577603`, `ind-Caveman-180644580`, `ind-Caveman-189957596`, `ind-Healer-264813587`, `ind-Monk-113083097`, `ind-Ranger-60901468`) | screen diff at step *n*, JS blank WIN_STATUS | PASS | screen diff at step *n+1*, **JS blank WIN_STATUS** (same symptom one frame later) |
| 7 (`explore-seed0700`, `explore-seed1150`, `explore-seed0367-5e01ea1d`, `ind-Barbarian-300765413`, `ind-Healer-398967841`, `ind-Monk-189066244`, `ind-Monk-356838357`) | same | PASS | PASS |
| 2 (`explore-seed0116` ×2) | same | `do_statusline1`, same step | `do_statusline1`, same step |

Bisect on a scratch copy of `js/` (each variant = HEAD minus one late
edit; 17 corpus sessions + 5 public):

| Variant | Corpus PASS | seed0002 / seed5002 |
|---|---:|---|
| HEAD | 3 / 17 | PASS |
| **A**: no `_snapshotStatusGrid` restore (paint the botl cache, as the #2238 leftover did) | **15 / 17** | **FAIL** (post-fullscreen-inventory status must stay blank, D-0467) |
| B: `maxrow` reuse not gated on the overlay | 3 / 17 | — |
| C: look-at dismiss via `docrt` | 2 / 17 | — |

Mechanism (`ind-Healer-264813587-946e8e73`, steps 21–22): the corner
`Do what with the spellbook…?` menu opens at 21 and both sides match; an
unhandled key at 22 makes JS run `docrt()` → `cls()` → `clearScreen()`,
then re-paint the menu, then `_buildScreenOutput` snapshots rows 22–23
(already blank) and "restores" them. C shows the same screen twice. The
correct port is the C loop — no redraw on an unhandled key — with the
D-0467 `_statusSuppressed` blank kept for the post-fullscreen case, after
which the snapshot pair can be deleted. That is the Must-fix row.

## 5. Files changed by this postmortem

Tools (one-call helpers, no `js/`):

- `scripts/loop-resume-brief.mjs` — new.
- `scripts/hidden-proxy.mjs` — `verify --base`, committed baseline, WORSE on PASS→fail, labelled movement.
- `scripts/verify.mjs` — `--base` passthrough, `note` for vacuous corpus checks, per-session hidden verdicts, FAIL triage lines.
- `scripts/agent-port-loop.sh` — quota hint + halt without reset; short-run halt in the crash branch no longer resets; resume brief embedded in the continue context.

Prompts and authority docs:

- `scripts/agent-port-loop.continue.prompt.md` — rewritten (§3.2).
- `scripts/agent-port-loop.prompt.md` — triage rule, vacuous-verify rule, ship-the-core rule.
- `scripts/agent-port-loop.review.prompt.md` — §6 re-measure with `--base HASH~1`.
- `docs/GROK-PLAYBOOK.md` — §3 anti-pattern, §5 triage/vacuous/resume rules, §9 pitfall; §10 compressed to stay under its 14 kB cap.
- `docs/PORTING-RUNBOOK.md` — §5.E step 0 baseline semantics; new §5.H "Resuming a crashed iteration".
- `docs/HIDDEN-PROXY.md` — §3 verify baseline semantics.
- `docs/AGENT-PORT-LOOP.md` — continue section, logs, failure modes.

Hot pack and records:

- `docs/LOOP-QUEUE.md` — Must-fix row (first).
- `docs/CURRENT.md` — hidden-proxy numbers re-scored; Next cluster = Must-fix; "Do not" row.
- `docs/NOTES.md` — the false "do not reopen process_menu_window leftover" replaced by the regression fact.
- `docs/DIVERGENCE-LOG.md` / `DIVERGENCE-INDEX.md` — D-1831 status `partial`.
- `docs/AGENT-LOOP-JOURNAL.md` — crumb.
- `hidden-corpus/scoreboard.json` — re-scored at `55c6736d` (`node scripts/hidden-proxy.mjs score --jobs 8`, 33 s).

## 6. What the continuation should have cost

With the brief and the rewritten prompt, the same leftover resolves as:
brief (0 calls, in the overlay) → `git diff HEAD -- js/` → `verify.mjs
--fn` (11 FAILs with first diffs) → two causes (`maxrow` geometry leak;
post-fullscreen blank vs corner leftover) → fix both → verify → ship the
core; queue MENU_SEARCH look-at as its own Open row. Roughly 40–60 calls,
8–10 minutes, 2–3 M tokens — against 359 / 43 / 17.2.

## 7. Reproduce

```bash
node scripts/loop-resume-brief.mjs .agent-port-loop-logs/iter-2238-20260904-225212.raw --max-lines 600
node scripts/hidden-proxy.mjs verify process_menu_window --base ab55b818   # 7 PASS, 12 still fn one step later, 2 re-attributed
node scripts/lib/hidden-worker.mjs .cache/hidden/sessions/ind-Healer-264813587-946e8e73.session.json
# bisect: copy js/ scripts/ frozen/ to a scratch dir (symlink nethack-c, .cache, sessions),
# flip `if (_bot_disabled) {` → `if (false && _bot_disabled) {` in _buildScreenOutput, re-run the worker.
```
