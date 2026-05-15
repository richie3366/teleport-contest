# Satellite plan: QA, sessions, recorder, Phase 1 freeze

Parent: global plan **NetHack JS port roadmap** (Workstream L).

## Goals

- Tight feedback loop: **measure → smallest fix → re-measure** without overfitting public JSON ([.cursor/rules/teleport-contest.mdc](../../rules/teleport-contest.mdc)).
- Repo ready for **Phase 1 freeze** tag quality: readable modules for Phase 2 diff score ([docs/PHASES.md](../../docs/PHASES.md)).

## Commands

```bash
bash frozen/score.sh
node frozen/ps_test_runner.mjs sessions/<name>.session.json
```

Optional C recorder: [nethack-c/build-recorder.sh](../../nethack-c/build-recorder.sh) (clang, see [nethack-c/README.md](../../nethack-c/README.md)).

## Checklist

### Triage

- [ ] Table of 44 public sessions: first divergence **step index**, P% vs S%, sorted by easiest wins
- [ ] Keep a “focus session” per sprint; only widen after it passes or is blocked on dependency

### Debugging discipline

- [ ] On failure: extract **first RNG mismatch index** from harness output; binary-search in `js` if needed
- [ ] If RNG matches at step but screen fails: diff canonicalized frames (tools/session-viewer)

### Regression

- [ ] After fixing session A, re-run full `score.sh` to detect collateral damage
- [ ] Add minimal automated check (single session) in CI only if contest repo allows — optional

### Held-out mindset

- [ ] No literals from `sessions/*.session.json` in implementation
- [ ] Prefer general algorithms copied from C, not table lookups from traces

### Phase 1 freeze (Nov 29, 2026)

- [ ] Module boundaries documented in short `README` snippets or file headers at seams
- [ ] Dead code and experimental flags removed
- [ ] `js/` naming consistent for future 5.1 retarget

---

## Baseline: `seed8000-tourist-starter`

*Filled by `sprint-first` todo — run `node frozen/ps_test_runner.mjs sessions/seed8000-tourist-starter.session.json` and paste summary below.*

### Scorer output (captured)

Command (repo root):

`node frozen/ps_test_runner.mjs sessions/seed8000-tourist-starter.session.json`

Example result line (after syncing `js/terminal.js` from `frozen/` and routing replay keys through `input.js`):

`FAIL: seed8000-tourist-starter.session.json (RNG 3126/3130, Screen 15/23 (cursors 18/23))`

Example `__RESULTS_JSON__` metrics (post-harness fix):

```json
{
  "rngCalls": { "matched": 3126, "total": 3130 },
  "screens": { "matched": 15, "total": 23 },
  "cellsOnly": { "matched": 15, "total": 23 },
  "cursors": { "matched": 18, "total": 23 },
  "animFrames": { "matched": 0, "total": 0 }
}
```

### First RNG divergence

Harness compares flattened PRNG lines positionally ([`frozen/ps_test_runner.mjs`](../../frozen/ps_test_runner.mjs)). With **3126 / 3130** matches, the first mismatch is at **0-based index 3126** (the **3127th** call): calls `0 … 3125` agree with C; call at index **3126** differs (and any later calls are not counted as matches).

Re-run after porting changes; update this section when the failing line is identified from a diff tool.

### First screen divergence

With **Screen 0/23** and **cellsOnly 0/23**, every recorded boundary fails the **cell grid** comparator (not only cursor). **Cursors 19/23** still disagree on four boundaries — cursor-only fixes are insufficient until cells match.

Treat **step index 0** (initial frame before first key) as the first place to bring `docrt` / map / botl output in line with C for this session.
