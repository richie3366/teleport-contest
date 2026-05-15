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

*(pending)*

### First RNG divergence

*(pending — index and expected vs actual line)*

### First screen divergence

*(pending — step index and brief description)*
