# Audit synthesis — faithful porting roadmap

Consolidates four 2026-07-12 reviews. Use this to decide **what to build next**
in process/tooling; agents execute via `GROK-PLAYBOOK.md` + `PORTING-RUNBOOK.md`.

| Review | Focus |
|--------|--------|
| [Long-term port method](df43511c-c44d-4d4c-9553-cc9a1bf4d927) | Vertical cones, machine ledger, transactional supervisor, multi-channel diagnosis |
| [Unattended loop safety](c217ae46-448a-460c-b714-50ef6c8c5520) | Worktree isolation, fail-closed gates, circuit breakers, structured logs |
| [Documentation fidelity](eb0dfb92-a219-4ff0-956f-b270b4384622) | Authority order, contract drift, enforcement vs advice |
| [Verification coverage](87047202-0edc-473a-8673-4399a714b715) | False-green scorer, missing static/unit/oracle gates, generator debt |

## Consensus verdict

**Principles are sound; enforcement is not.** The port should proceed by:

1. **Foundation first** — shared startup (role/race init) before parked deep
   Tourist traces (`CURRENT.md`, `GROK-PLAYBOOK.md`).
2. **C as specification** — sessions locate bugs; never justify production logic.
3. **Fresh-context memory in docs** — NOTES / journal / divergence log, not chat.
4. **Supervised loop only** — current shell script is a helper, not a trusted
   supervisor. Do not run `AGENT_FORCE=1` on an uncheckpointed primary checkout.

## P0 — do before trusting automation

| Item | Why | Owner |
|------|-----|-------|
| Checkpoint dirty worktree on a loop branch | 40+ untracked files; one `git clean` erases the port | Human |
| Dedicated agent worktree (not primary checkout) | Force-enabled CLI on shared dirty tree | Human + script |
| Parse `__RESULTS_JSON__`; reject failed sessions | `ps_test_runner` exits 0 on 0/44 | `frozen/` or wrapper script |
| Require `strict-output-check` for green | Runner ignores trailing RNG/screens | Already in prompt; enforce in shell |
| Fix monster extractor (`G_NOCORPSE`, fail-closed) | Silent wrong flags → false AI bugs | `scripts/extract-monsters.py` |
| Align CI frozen overlay (3 files, submodule init) | Local vs GitHub score drift | `.github/workflows/score.yml` |

## P1 — process/docs (mostly done or in progress)

| Item | Status |
|------|--------|
| `GROK-PLAYBOOK.md` priority + anti-patterns | Done |
| Runbook ownership + verification caveats | Done |
| API per-segment + `input.storage` (no `prevGame`) | Done in `docs/API.md` |
| Parked D-0006 / foundation objective in PROGRESS | Done |
| Constitution progress metric (not fastforward-only) | Updated below |
| Runbook domain-specific authority | Updated below |
| Diverse regression cohort command | Add to PROGRESS when cohort is stable |
| `record-session.mjs` / oracle docs in runbook | TODO |
| Session viewer cumulative bug | TODO (`tools/session-viewer/`) |

## P2 — longer-term architecture ([port method](df43511c-c44d-4d4c-9553-cc9a1bf4d927))

Build in this order:

1. **Transactional supervisor** — isolated worktree, pre/post diff, accept/reject,
   circuit breakers, `LOOP_RESULT_JSON` parsing.
2. **Multi-channel divergence packet** — boundary, RNG, state, cells, cursor;
   not RNG-only diagnosis.
3. **Machine-readable ledger** — `porting/ledger.json` + generated `CURRENT`
   task packet (replaces hand-maintained duplication).
4. **Fail-closed generators** — `--check`, source hash, no silent `0` fallbacks.
5. **Local sealed oracle cohort** — C-recorded holdouts via `record-session.mjs`;
   agents never see traces during development.
6. **Static/unit gates** — import-cycle ban, `node --test`, frozen checksum preflight.

## What agents should do *now*

Until P0 tooling lands:

- Follow **primary foundation** in `CURRENT.md`.
- Run green gate + `strict-output-check` manually; inspect PASS lines, not only `$?`.
- End iterations with journal + tiny NOTES; do not edit playbook/constitution.
- Propose loop/supervisor changes in the journal; humans implement P0/P1.

## Metrics that matter

Replace vanity session-pass chasing with:

- C semantic units advanced (`C-JS-MAP.md` status + omissions retired).
- Sessions reaching real code (not immediate `role not ported` throw).
- First-divergence advancement on focus **and** no green/cohort regression.
- Temporary scaffolds removed (including empty `fastforward` callers).
- Private/local oracle evidence when available.

Positional RNG totals and “prefix moved” alone are insufficient.
