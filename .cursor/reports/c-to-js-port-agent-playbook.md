# NetHack C→JS port — **agent playbook**

Short reference for **how to work** in this repo. **Session state** (next batch, RNG anchors) lives in [`c-to-js-port-current.md`](c-to-js-port-current.md) — update that every batch, not this file.

---

## Where to write notes

| Write here | Not here |
|------------|----------|
| [`c-to-js-port-current.md`](c-to-js-port-current.md) — last slice, next step, first fail index | `AGENTS.md` (stable router only) |
| [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) — row status + **peel debt** in Notes | Long debug narrative in rules |
| [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) — one row per batch | Duplicating `c-to-js-port-progress.md` |
| Killed wrong hypotheses — one phrase in changelog or current | Agent transcript (ephemeral) |
| Strategy / peel-vs-general-C — [`batch-workflow.md`](c-to-js-port-batch-workflow.md) § Strategy | New `notes-*.md` or per-session agent files |

---

## Tool picker

| Question | Tool | Example |
|----------|------|---------|
| **Which batch / where is X ported?** | **graphify** `query` / `path` | `graphify path "movemon" "movemon" --graph graphify-out/graph.json` |
| **RNG diverged at index N?** | **`diag_rng_window.mjs`** | `node tools/diag_rng_window.mjs sessions/seed0102-ranger-name-cancel.session.json 4440 4485` |
| **Which keystroke owns index N?** | **`diag_rng_step_map.mjs`** (C steps) | `node tools/diag_rng_step_map.mjs sessions/seed0102….json 4440` |
| **When did JS first draw after key K?** | **`diag_prefix_rng.mjs`** | `node tools/diag_prefix_rng.mjs sessions/seed0102….json 22` |
| **Regression from last batch?** | **`git stash`** isolate + `seed8000` window | stash `js/monmove.js`, diag 2900–3129 |
| **C call order / flags** | **Read C** in `nethack-c/upstream/` | `rg` with explicit path (IDE search may skip submodule) |

**Graphify:** best at **batch pick** and C↔JS symbol mapping. **`npm run graphify:js`** after `js/` edits is cache hygiene; value is **`query` / `path` / `explain`**, not the rebuild alone.

**Not graphify:** moveloop peel order, harness flags (`_*LikeC`), “why `rn2(7)` before `rn2(5)`” — use **C source + diag_rng_window + prefix replay**.

---

## Moveloop / RNG debug loop

1. **Locate** — failing session + first mismatch index (`diag_rng_window` or milestone score).
2. **Map key → RNG** — `diag_rng_step_map.mjs` or binary search with `diag_prefix_rng.mjs` on `moves.slice(0, n)`.
3. **Read C** — same hero command in `cmd.c` / `allmain.c` / `mon.c` / subsystem (e.g. `dothrow.c`, `dogmove.c`).
4. **Port call order** — flags and deferrals, not extra harness draws.
5. **Fast-verify** — narrow window + canary `seed8000` 2900–3129 when touching `monmove` / moveloop.
6. **Document** — update `current.md` with index + wrong hypothesis if any.

---

## Known pitfalls (institutional)

| Trap | Fix |
|------|-----|
| **`urole.mnum === 8` for “rogueLike”** | Rogue is **7**, Ranger is **8** (`js/roles.js`) — wrong check routes Ranger through rogue `#search` peel |
| **`dofire` moveloop timing** | C runs post on invent **ESC** after `getdir`, not on first `f`/`l` key |
| **First `#search` on high `moves`** | `effectiveMovemonStepNumLikeC` — first pass still peel at step **11** |
| **Ranger first `#search`** | Pet-only `fmon`, twin `dog_move` before `mcalcmove` — not tourist distant→east peel |
| **Submodule invisible to IDE** | `read_file` or `rg path nethack-c/upstream/…` |

---

## Canary commands (copy-paste)

```bash
# Regression after moveloop / monmove batch
node tools/diag_rng_window.mjs sessions/seed8000-tourist-starter.session.json 2900 3129

# Prefix replay (n = char count through keystroke under test)
node tools/diag_prefix_rng.mjs sessions/seed0102-ranger-name-cancel.session.json 22

# Isolate which files broke tourist
git stash push -m 'isolate' -- js/monmove.js js/m_move_mon.js && \
  node tools/diag_rng_window.mjs sessions/seed8000-tourist-starter.session.json 2900 3129; \
  git stash pop
```

---

## Related

- [Batch workflow](c-to-js-port-batch-workflow.md)
- [Graphify](../docs/graphify.md)
- [Continue-port prompt](../prompts/continue-nethack-port.md)
